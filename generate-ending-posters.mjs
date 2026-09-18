// 生成六个结局的彩铅海报，并转成游戏用的 WebP。
//
// 为什么直接打接口而不是走 MCP 工具：本机的 gpt-image MCP 服务在这个会话里
// 收不到参数（prompt 永远是空的），而它本身只是对一个 OpenAI 兼容接口的封装，
// 所以这里复用同一套凭据和同一个 endpoint 规则，绕过那一层。
//
// 密钥只在运行时读取，不写进仓库、不打印。优先读环境变量，其次读 Cursor 的
// MCP 配置（和 gpt-image-mcp/server.py 的查找顺序保持一致）。
//
// 六张海报刻意不使用任何角色参考图：结局讲的是一整个学期留下的生活方式，
// 不是某一个场景里的某一个人，所以画面走物件与线条的象征，不画脸。
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import sharp from 'sharp';

const IMAGE_MODEL = 'gpt-image-2';
const IMAGE_SIZE = '1536x1024';
const IMAGE_QUALITY = 'high';
const REQUEST_TIMEOUT_MILLISECONDS = 300_000;

// 与 compress-scenes.mjs 保持一致，避免结局图比场景图重一个量级
const WEBP_TARGET_WIDTH = 1280;
const WEBP_QUALITY = 82;

const projectRoot = process.cwd();
const RAW_POSTER_DIRECTORY = path.join(projectRoot, '_refpng');
const WEBP_POSTER_DIRECTORY = path.join(projectRoot, 'assets', 'endings');

// 统一画风：彩铅、纸纹、克制的配色，和 styles/paper.css 的色板对齐。
// 明确排除文字和写实人脸 —— 文字会糊，写实脸会和游戏里的立绘打架。
const SHARED_STYLE_PROMPT = [
  'Colored pencil illustration on textured cream paper.',
  'Visible pencil strokes, layered hatching, slightly grainy paper tooth showing through.',
  'Muted restrained palette: warm cream #f4efe2, deep ink brown #26221d,',
  'terracotta #a24b38, slate blue #4a6572, soft ochre #b58a3c.',
  'Poster composition with generous negative space, poetic and contemplative,',
  'quiet literary book-cover feeling.',
  'Absolutely no text, no letters, no numbers, no captions, no watermark, no signature.',
  'No human faces, no anime character art, no photorealism, no 3D render.'
].join(' ');

// 每张海报对应一个结局的核心意象，不是对应一个地点。
const ENDING_POSTERS = [
  {
    endingId: 'borrowed',
    intent: '借来的未来：路是所有人都点头的那条，唯独没有她自己的脚印',
    subject: [
      'An empty wooden school desk facing a large presentation board covered in neat tidy diagrams.',
      'Many faint overlapping footprints of other people converge toward the board across the floor,',
      'but one set of footprints is conspicuously missing, leaving a clean untouched gap.',
      'A single thin thread leads away from the desk and disappears off the edge of the paper.',
      'Late afternoon light, long quiet shadows, nobody present.'
    ].join(' ')
  },
  {
    endingId: 'burden',
    intent: '替所有人负责：把别人的课题全背在身上，用「被需要」换「被留下」',
    subject: [
      'A small faceless figure drawn only as a soft contour outline, seen from behind,',
      'carrying an impossibly tall swaying stack of books, folders and school bags on their back.',
      'Dozens of thin threads run from the stack down to empty pairs of shoes standing around on the floor,',
      'each pair facing a different direction.',
      'Warm lamplight from above, the figure small and off-center in a large frame.'
    ].join(' ')
  },
  {
    endingId: 'island',
    intent: '孤岛上的自由：绳子拆掉了，却被重新砌成了墙',
    subject: [
      'A single empty wooden chair standing on a tiny island of pale paper,',
      'surrounded by vast empty space.',
      'Cut threads lie loose on the ground with frayed ends,',
      'and those same cut threads have been re-stacked into a low circular wall enclosing the chair.',
      'A phone lies face-up nearby showing two small unread glowing dots.',
      'Cool slate blue shadows, completely still air, clean and lonely.'
    ].join(' ')
  },
  {
    endingId: 'applause',
    intent: '掌声之后：越来越会揣摩别人喜欢什么，「我喜欢什么」一直空着',
    subject: [
      'An empty classroom after an event has ended.',
      'Rows of chairs pushed askew at odd angles, a lone presentation board left standing on a desk.',
      'Pale paper confetti caught mid-fall, still settling through the air.',
      'On the desk lies a printed form with every row filled in except one line left completely blank.',
      'Warm terracotta dusk light through tall windows, drifting dust motes.'
    ].join(' ')
  },
  {
    endingId: 'departure',
    intent: '带着不确定出发：窗外的线还没有画完，但接下来三件小事是自己决定的',
    subject: [
      'A window at early dawn with one pane pushed open.',
      'A single thread runs from inside the room, out across the windowsill,',
      'and stops unfinished in mid-air outside, the line visibly not yet drawn to its end.',
      'On the desk a small handwritten plan with three modest tick marks.',
      'Soft cool morning light warming at the edges, hopeful but unresolved, air feels like it is moving.'
    ].join(' ')
  },
  {
    endingId: 'repair',
    intent: '关系可以修复：修复不是回到讨好，线可以分开两个人也可以让两人同行',
    subject: [
      'Two threads that were once tangled into a hard knot, now clearly separated,',
      'running parallel for a stretch and then curving toward the same distant point.',
      'Between them lies a torn sheet of paper mended with visible careful stitches,',
      'the crack still plainly shown rather than hidden or erased.',
      'Warm ochre and terracotta light, quiet reconciliation, the mend drawn as something beautiful.'
    ].join(' ')
  }
];

// 密钥和接口地址必须成对来自同一处配置。
// 混用两处会得到一个非常误导人的 401 "Invalid token"：本机恰好设了别的服务商的
// OPENAI_API_KEY，把它配上这个网关的地址，看起来像密钥失效，其实是配错了对。
function readImageApiCredentials() {
  const environmentApiKey =
    process.env.GPT_IMAGE_API_KEY?.trim() || process.env.OPENAI_API_KEY?.trim();
  const environmentBaseUrl =
    process.env.GPT_IMAGE_BASE_URL?.trim() || process.env.OPENAI_BASE_URL?.trim();

  if (environmentApiKey && environmentBaseUrl) {
    return { apiKey: environmentApiKey, baseUrl: environmentBaseUrl, source: '环境变量' };
  }

  const cursorConfigPath = path.join(os.homedir(), '.cursor', 'mcp.json');
  if (!fs.existsSync(cursorConfigPath)) {
    throw new Error(
      '找不到成对的图片接口凭据。请同时设置 GPT_IMAGE_API_KEY 和 GPT_IMAGE_BASE_URL。'
    );
  }

  const cursorConfig = JSON.parse(fs.readFileSync(cursorConfigPath, 'utf8'));
  const imageServerEnvironment = Object.values(cursorConfig.mcpServers ?? {})
    .map((serverConfig) => serverConfig?.env ?? {})
    .find((serverEnvironment) => serverEnvironment.GPT_IMAGE_API_KEY && serverEnvironment.GPT_IMAGE_BASE_URL);

  if (!imageServerEnvironment) {
    throw new Error('Cursor MCP 配置里没有同时带 GPT_IMAGE_API_KEY 和 GPT_IMAGE_BASE_URL 的服务。');
  }

  return {
    apiKey: imageServerEnvironment.GPT_IMAGE_API_KEY,
    baseUrl: imageServerEnvironment.GPT_IMAGE_BASE_URL,
    source: 'Cursor MCP 配置'
  };
}

// 和 server.py 的 build_images_endpoint 同样的规则：允许 base 里已经写死接口路径
function buildGenerationsEndpoint(baseUrl) {
  const normalizedBaseUrl = baseUrl.trim().replace(/\/+$/, '');

  for (const knownOperation of ['generations', 'edits']) {
    const knownPath = `/images/${knownOperation}`;
    if (normalizedBaseUrl.endsWith(knownPath)) {
      return `${normalizedBaseUrl.slice(0, -knownPath.length)}/images/generations`;
    }
  }

  if (normalizedBaseUrl.endsWith('/v1')) {
    return `${normalizedBaseUrl}/images/generations`;
  }

  return `${normalizedBaseUrl}/v1/images/generations`;
}

async function extractImageBytes(response) {
  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(`图片接口返回 HTTP ${response.status}：${errorBody.slice(0, 500)}`);
  }

  const responsePayload = await response.json();
  const firstImage = responsePayload?.data?.[0];
  if (!firstImage) {
    throw new Error('图片接口响应里没有 data[0]。');
  }

  if (firstImage.b64_json) {
    return Buffer.from(firstImage.b64_json, 'base64');
  }

  if (firstImage.url) {
    const imageResponse = await fetch(firstImage.url);
    if (!imageResponse.ok) {
      throw new Error(`下载生成的图片失败：HTTP ${imageResponse.status}`);
    }
    return Buffer.from(await imageResponse.arrayBuffer());
  }

  throw new Error('图片接口既没有返回 b64_json 也没有返回 url。');
}

async function generatePosterImage(poster, endpoint, apiKey) {
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      model: IMAGE_MODEL,
      prompt: `${poster.subject}\n\n${SHARED_STYLE_PROMPT}`,
      size: IMAGE_SIZE,
      quality: IMAGE_QUALITY,
      output_format: 'png',
      n: 1
    }),
    signal: AbortSignal.timeout(REQUEST_TIMEOUT_MILLISECONDS)
  });

  return extractImageBytes(response);
}

async function convertPosterToWebp(rawPngPath, webpPath) {
  await sharp(rawPngPath)
    .resize({ width: WEBP_TARGET_WIDTH, withoutEnlargement: true })
    .webp({ quality: WEBP_QUALITY, effort: 6 })
    .toFile(webpPath);

  return fs.statSync(webpPath).size;
}

const { apiKey, baseUrl } = readImageApiCredentials();
const generationsEndpoint = buildGenerationsEndpoint(baseUrl);

fs.mkdirSync(RAW_POSTER_DIRECTORY, { recursive: true });
fs.mkdirSync(WEBP_POSTER_DIRECTORY, { recursive: true });

const shouldForceRegenerate = process.argv.includes('--force');
const failures = [];

console.log(`开始生成 ${ENDING_POSTERS.length} 张结局海报（${IMAGE_SIZE}，彩铅风格）\n`);

for (const poster of ENDING_POSTERS) {
  const rawPngPath = path.join(RAW_POSTER_DIRECTORY, `ending-${poster.endingId}.png`);
  const webpPath = path.join(WEBP_POSTER_DIRECTORY, `${poster.endingId}.webp`);

  if (fs.existsSync(rawPngPath) && !shouldForceRegenerate) {
    console.log(`${poster.endingId.padEnd(10)} 已有原图，跳过生成（--force 可重生成）`);
  } else {
    try {
      console.log(`${poster.endingId.padEnd(10)} 生成中… ${poster.intent}`);
      const imageBytes = await generatePosterImage(poster, generationsEndpoint, apiKey);
      fs.writeFileSync(rawPngPath, imageBytes);
    } catch (error) {
      console.log(`${poster.endingId.padEnd(10)} x 生成失败：${error.message}`);
      failures.push(poster.endingId);
      continue;
    }
  }

  const webpBytes = await convertPosterToWebp(rawPngPath, webpPath);
  console.log(`${poster.endingId.padEnd(10)} -> assets/endings/${poster.endingId}.webp  ${Math.round(webpBytes / 1024)} KB`);
}

console.log('');
if (failures.length > 0) {
  console.log(`${failures.length} 张失败：${failures.join(', ')}`);
  process.exit(1);
}

console.log('六张结局海报已全部就位。');
