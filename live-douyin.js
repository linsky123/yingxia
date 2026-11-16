
// src/live/douyin-sign.ts
var userAgent = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36";
var resultAlphabet = "Dkdpgh2ZmsQB80/MfvV36XI1R45-WUAlEixNLwoqYTOPuzKFjJnry79HbGcaStCe";
var agentAlphabet = "ckdp1h4ZKsUB80/Mfvw36XIgR25+WQAlEi7NLboqYTOPuzmFjJnryx9HVGDaStCe";
var salt = "dhzx";
var headerMagic = [3, 82];
var sdkVersion = [1, 0, 1, 0];
var payloadKey = 211;
var fortnightEpoch = 17218368e5;
var pageID = 6241;
var aid = 6383;
var noiseMasks = [145, 66, 44];
var dataMasks = [110, 189, 211];
var fieldOrder = [
  34,
  44,
  56,
  61,
  73,
  29,
  70,
  45,
  35,
  49,
  38,
  66,
  51,
  68,
  28,
  48,
  64,
  47,
  30,
  71,
  26,
  55,
  31,
  69,
  59,
  40,
  62,
  63,
  27,
  72,
  41,
  74,
  57,
  52,
  42,
  39,
  33,
  67,
  53,
  43,
  65,
  46,
  36,
  24,
  60,
  32,
  79,
  80,
  84,
  85
];
var queryChain = { slots: [48, 49, 51], indices: [9, 18], canary: [3, 11, 12] };
var bodyChain = { slots: [52, 53, 55], indices: [10, 19], canary: [4, 8, 9] };
var agentChain = { slots: [56, 57, 59], indices: [11, 21], canary: [5, 12, 13] };
var environmentFlags = 1;
var detectionFlags = 14;
var nrFlags = 33;
var tripwireLocked = 3;
var callBucket = 6;
var browserInfo = "1920|947|1920|1032|1920|1032|1920|1080|Win32";
function aBogus(query, body = "", agent = userAgent, now = Date.now(), random = Math.random) {
  const fields = {
    24: 41,
    26: Math.floor((now - fortnightEpoch) / (1e3 * 60 * 60 * 24 * 14)) & 255,
    27: callBucket,
    // Milliseconds since the SDK started, plus three: a page that signs promptly.
    28: 3,
    35: environmentFlags & 255,
    36: Math.floor(environmentFlags / 256) & 255,
    38: nrFlags & 255,
    39: nrFlags >> 8 & 255,
    66: tripwireLocked
  };
  const info = jsBytes(browserInfo);
  const tail = jsBytes(`${(now + 3) % 256},`);
  fields[79] = info.length & 255;
  fields[80] = info.length >> 8 & 255;
  fields[84] = tail.length & 255;
  fields[85] = tail.length >> 8 & 255;
  littleEndian(now, 6).forEach((byte, index) => {
    fields[29 + index] = byte;
  });
  littleEndian(detectionFlags, 4).forEach((byte, index) => {
    fields[44 + index] = byte;
  });
  for (let index = 0; index < 4; index++) fields[40 + index] = 0;
  littleEndian(now - 1, 6).forEach((byte, index) => {
    fields[60 + index] = byte;
  });
  littleEndian(pageID, 4).forEach((byte, index) => {
    fields[67 + index] = byte;
  });
  littleEndian(aid, 4).forEach((byte, index) => {
    fields[71 + index] = byte;
  });
  for (const [chain, hashed] of [[queryChain, digest(query)], [bodyChain, digest(body)], [agentChain, agentDigest(agent)]]) {
    fields[chain.slots[0]] = hashed[chain.indices[0]];
    fields[chain.slots[1]] = hashed[chain.indices[1]];
    fields[chain.slots[2]] = hashed.slice(chain.canary[0]).find((byte) => byte !== chain.canary[1]) ?? chain.canary[2];
  }
  const version = [...mask([sdkVersion[0], sdkVersion[1]], random), ...mask([sdkVersion[2], sdkVersion[3]], random, probeNoise(random), tripwireNoise(random))];
  let checksum = 0;
  for (const byte of version) checksum ^= byte;
  for (const slot of fieldOrder) checksum ^= fields[slot];
  const packed = [...fieldOrder.map((slot) => fields[slot]), ...info, ...tail, checksum];
  const header = mask(headerMagic, random, void 0, headerNoise(agent, random));
  const sealed = rc4([payloadKey], [...version, ...expand(packed, random)]);
  return base64([...header, ...sealed], resultAlphabet);
}
var utf8 = (text2) => Array.from(new TextEncoder().encode(text2));
var digest = (text2) => sm3(sm3(utf8(text2 + salt)));
function agentDigest(agent) {
  const key = [Math.floor(environmentFlags / 256), environmentFlags % 256, detectionFlags % 256];
  const sealed = rc4(key, jsBytes(agent.trim()));
  return sm3(utf8(base64(sealed, agentAlphabet)));
}
function jsBytes(text2) {
  const out = [];
  for (let i = 0; i < text2.length; i++) {
    const unit = text2.charCodeAt(i);
    if (unit & 65280) out.push(unit >> 8, unit & 255);
    else out.push(unit & 255);
  }
  return out;
}
function littleEndian(value, count2) {
  const out = [];
  for (let i = 0; i < count2; i++) out.push(Math.floor(value / 2 ** (8 * i)) % 256);
  return out;
}
function rc4(key, data) {
  const box = new Array(256);
  for (let i2 = 0; i2 < 256; i2++) box[255 - i2] = i2;
  let j = 0;
  for (let i2 = 0; i2 < 256; i2++) {
    j = (j * box[i2] + j + key[i2 % key.length]) % 256;
    [box[i2], box[j]] = [box[j], box[i2]];
  }
  let i = 0;
  j = 0;
  return data.map((byte) => {
    i = (i + 1) % 256;
    j = (j + box[i]) % 256;
    [box[i], box[j]] = [box[j], box[i]];
    return byte ^ box[(box[i] + box[j]) % 256];
  });
}
function base64(data, alphabet) {
  let out = "";
  for (let offset = 0; offset < data.length; offset += 3) {
    const chunk = data.slice(offset, offset + 3);
    let block = 0;
    for (let index = 0; index < 3; index++) block = block << 8 | (index < chunk.length ? chunk[index] : 0);
    [18, 12, 6, 0].forEach((shift, index) => {
      if (index <= chunk.length) out += alphabet[block >> shift & 63];
    });
  }
  return out + "=".repeat((4 - out.length % 4) % 4);
}
function mask(pair, random, low, high) {
  const noise = Math.floor(random() * 65535);
  const l = (low ?? noise) & 255, h = (high ?? noise >> 8) & 255;
  return [l & 170 | pair[0] & 85, l & 85 | pair[0] & 170, h & 170 | pair[1] & 85, h & 85 | pair[1] & 170];
}
function expand(body, random) {
  const out = [];
  for (let offset = 0; offset < body.length; offset += 3) {
    const group = body.slice(offset, offset + 3);
    if (group.length !== 3) {
      out.push(group[0]);
      if (group.length > 1 && group[1] !== 0) out.push(group[1]);
      continue;
    }
    const noise = Math.floor(random() * 1e3) & 255;
    for (let index = 0; index < 3; index++) out.push(noise & noiseMasks[index] | group[index] & dataMasks[index]);
    out.push(group[0] & noiseMasks[0] | group[1] & noiseMasks[1] | group[2] & noiseMasks[2]);
  }
  return out;
}
function headerNoise(agent, random) {
  const lower = agent.toLowerCase();
  const bands = [["edg", 125], ["huawei", 170], ["firefox", 40], ["chrome", 0], ["safari", 81]];
  const base = bands.find(([name]) => lower.includes(name))?.[1] ?? 210;
  return base + Math.floor(random() * 40) & 255;
}
function probeNoise(random) {
  const value = Math.floor(random() * 240);
  return value > 109 ? value + value % 2 + 1 : value;
}
var tripwireNoise = (random) => Math.floor(random() * 255) & 77 | 178;
var rotl = (value, bits) => {
  const n = bits % 32;
  return n === 0 ? value >>> 0 : (value << n | value >>> 32 - n) >>> 0;
};
function sm3(message) {
  let state = [1937774191, 1226093241, 388252375, 3666478592, 2842636476, 372324522, 3817729613, 2969243214];
  const padded = [...message, 128];
  while (padded.length % 64 !== 56) padded.push(0);
  const bits = message.length * 8;
  for (let shift = 56; shift >= 0; shift -= 8) padded.push(Math.floor(bits / 2 ** shift) % 256);
  for (let offset = 0; offset < padded.length; offset += 64) {
    const w = new Array(68).fill(0);
    for (let i = 0; i < 16; i++) {
      const at = offset + i * 4;
      w[i] = (padded[at] << 24 | padded[at + 1] << 16 | padded[at + 2] << 8 | padded[at + 3]) >>> 0;
    }
    for (let i = 16; i < 68; i++) {
      let x = (w[i - 16] ^ w[i - 9] ^ rotl(w[i - 3], 15)) >>> 0;
      x = (x ^ rotl(x, 15) ^ rotl(x, 23)) >>> 0;
      w[i] = (x ^ rotl(w[i - 13], 7) ^ w[i - 6]) >>> 0;
    }
    let [a, b, c, d, e, f, g, h] = state;
    for (let j = 0; j < 64; j++) {
      const t2 = j < 16 ? 2043430169 : 2055708042;
      const ss1 = rotl(rotl(a, 12) + e + rotl(t2, j) >>> 0, 7);
      const ss2 = (ss1 ^ rotl(a, 12)) >>> 0;
      const ff = j < 16 ? (a ^ b ^ c) >>> 0 : (a & b | a & c | b & c) >>> 0;
      const gg = j < 16 ? (e ^ f ^ g) >>> 0 : (e & f | ~e & g) >>> 0;
      const tt1 = ff + d + ss2 + ((w[j] ^ w[j + 4]) >>> 0) >>> 0;
      const tt2 = gg + h + ss1 + w[j] >>> 0;
      d = c;
      c = rotl(b, 9);
      b = a;
      a = tt1;
      h = g;
      g = rotl(f, 19);
      f = e;
      e = (tt2 ^ rotl(tt2, 9) ^ rotl(tt2, 17)) >>> 0;
    }
    state = state.map((word, index) => (word ^ [a, b, c, d, e, f, g, h][index]) >>> 0);
  }
  return state.flatMap((word) => [word >>> 24, word >>> 16 & 255, word >>> 8 & 255, word & 255]);
}

// src/lib/host.ts
var request = (url, options = {}) => globalThis.req(url, options);
function extension(ext) {
  if (ext && typeof ext === "object") return ext;
  try {
    const value = JSON.parse(String(ext || "{}"));
    return value && typeof value === "object" ? value : {};
  } catch {
    return {};
  }
}

// src/lib/i18n.ts
var tables = {
  "zh-Hans": {
    // Signing in to Hongguo (src/sites/hongguo/account.ts), as the app worded it before it moved here.
    "Hongguo didn't answer. Try again.": "红果没有响应，请重试。",
    "Couldn't get a sign-in code. Try again.": "无法获取登录二维码，请重试。",
    "Sign-in was approved, but Hongguo didn't return a login. Try again.": "已确认登录，但红果没有返回登录信息，请重试。",
    "Hongguo often won't play for devices that aren't signed in. Open the Hongguo app on your phone, scan this code, and confirm the sign-in.": "红果常常不为未登录的设备播放。请在手机上打开红果短剧 App，扫描此码并确认登录。",
    "Hongguo episodes play as this account. Sign-in details stay on this device.": "红果短剧以此账号播放。登录信息只保存在本机。",
    // Music channels (src/music/resolve.ts), as the app worded them before they moved here.
    "GD Music": "GD音乐台",
    "Migu": "咪咕",
    "Nianxin": "念心",
    "Xinghai": "星海",
    "Migu Music": "咪咕音乐",
    "Kuwo Music and NetEase Cloud Music": "酷我音乐和网易云音乐",
    "QQ Music": "QQ 音乐",
    "NetEase Cloud Music": "网易云音乐",
    "Kuwo Music and NetEase Cloud Music, when the others fail": "酷我音乐和网易云音乐，其他通道失败时使用",
    "QQ Music, when VKeys fails": "QQ 音乐，VKeys 失败时使用",
    "HYW key": "HYW 密钥",
    "Source: GD Music (music.gdstudio.xyz)": "音源：GD音乐台(music.gdstudio.xyz)",
    "Source: Xinghai (yy.zddyr.top)": "音源：星海（yy.zddyr.top）",
    "HYW stays off until you enter the key from its published script. GD Music (music.gdstudio.xyz) is for personal, non-commercial use and allows 50 requests every 5 minutes.": "填入 HYW 公开脚本中的密钥后才会启用。GD音乐台(music.gdstudio.xyz)仅限个人非商业使用，每 5 分钟最多 50 次请求。",
    "Xinghai (yy.zddyr.top) asks to be credited and not overused, so it is only asked when the other channels fail.": "星海（yy.zddyr.top）要求注明来源且勿滥用，因此只在其他通道失败时使用。",
    "Following": "关注",
    "Original": "原画",
    "Super HD": "超清",
    "HD": "高清",
    "SD": "标清",
    "Sign in to Douyin to search its live rooms.": "登录抖音后即可搜索直播间。",
    "Douyin no longer accepts this sign-in. Sign in again in Settings.": "抖音登录已失效，请在设置中重新登录。",
    "All": "全部",
    "Bilibili": "哔哩哔哩",
    "Bilibili Live": "哔哩哔哩直播",
    "Douyu Live": "斗鱼直播",
    "Huya Live": "虎牙直播",
    "Douyin Live": "抖音直播",
    "Hongguo": "红果短剧",
    "Xifan": "西饭短剧",
    "Hema": "河马短剧",
    "Recommended": "推荐",
    "Episode %@": "第 %@ 集",
    "%@ Episodes": "共 %@ 集",
    "%@ of %@ episodes free": "免费 %@/%@ 集",
    "Live-action Drama": "真人剧",
    "Animated Drama": "漫剧",
    "AI Drama": "AI 剧",
    "Trending Dramas": "综合热播榜",
    "Trending Live-action": "真人热播榜",
    "Trending Animation": "漫剧热播榜",
    "Trending AI Drama": "AI 热播榜",
    "%@ could not be reached. Try again later.": "无法连接%@，请稍后再试。",
    "%@ returned incomplete data. Please refresh and try again.": "%@返回的数据不完整，请刷新后重试。",
    "This episode isn't free on %@.": "%@的这一集需要付费。",
    "Hongguo could not be reached. Try again later.": "暂时无法连接红果，请稍后重试。",
    "Hongguo returned incomplete data. Please refresh and try again.": "红果返回的数据不完整，请刷新后重试。",
    "Hongguo did not provide a playable source for this episode. Try again later.": "红果暂未提供本集的可用片源，请稍后重试。",
    "Hongguo is turning away playback requests right now. Try again later, or on another network if this keeps happening.": "红果暂时拒绝了播放请求，请稍后重试；如果一直这样，可以换个网络试试。",
    "Hongguo only offers this episode in ByteVC2, which this device can't play. Watch it in the Hongguo app.": "红果只提供了本集的 ByteVC2 编码版本，本设备无法播放，请在红果 App 中观看。",
    "Bilibili refused the request. Try again later.": "哔哩哔哩拒绝了请求，请稍后再试。",
    "Bilibili's video servers could not be reached. Try again later.": "无法连接哔哩哔哩的视频服务器，请稍后再试。",
    "This episode needs a Bilibili premium membership. Only a short preview is available.": "本集需要哔哩哔哩大会员，目前只能看到试看片段。",
    "This live room is not broadcasting right now.": "该直播间当前未开播。",
    "This live room has no stream this device can play.": "该直播间没有本设备可播放的视频流。"
  },
  "zh-Hant": {
    // Signing in to Hongguo (src/sites/hongguo/account.ts), as the app worded it before it moved here.
    "Hongguo didn't answer. Try again.": "紅果沒有回應，請重試。",
    "Couldn't get a sign-in code. Try again.": "無法取得登入 QR 碼，請重試。",
    "Sign-in was approved, but Hongguo didn't return a login. Try again.": "已確認登入，但紅果沒有回傳登入資訊，請重試。",
    "Hongguo often won't play for devices that aren't signed in. Open the Hongguo app on your phone, scan this code, and confirm the sign-in.": "紅果常常不為未登入的裝置播放。請在手機上打開紅果短劇 App，掃描此碼並確認登入。",
    "Hongguo episodes play as this account. Sign-in details stay on this device.": "紅果短劇以此帳號播放。登入資訊只保存在本機。",
    // Music channels (src/music/resolve.ts), as the app worded them before they moved here.
    "GD Music": "GD音樂台",
    "Migu": "咪咕",
    "Nianxin": "念心",
    "Xinghai": "星海",
    "Migu Music": "咪咕音樂",
    "Kuwo Music and NetEase Cloud Music": "酷我音樂和網易雲音樂",
    "QQ Music": "QQ 音樂",
    "NetEase Cloud Music": "網易雲音樂",
    "Kuwo Music and NetEase Cloud Music, when the others fail": "酷我音樂和網易雲音樂，其他通道失敗時使用",
    "QQ Music, when VKeys fails": "QQ 音樂，VKeys 失敗時使用",
    "HYW key": "HYW 金鑰",
    "Source: GD Music (music.gdstudio.xyz)": "音源：GD音樂台(music.gdstudio.xyz)",
    "Source: Xinghai (yy.zddyr.top)": "音源：星海（yy.zddyr.top）",
    "HYW stays off until you enter the key from its published script. GD Music (music.gdstudio.xyz) is for personal, non-commercial use and allows 50 requests every 5 minutes.": "填入 HYW 公開腳本中的金鑰後才會啟用。GD音樂台(music.gdstudio.xyz)僅限個人非商業使用，每 5 分鐘最多 50 次請求。",
    "Xinghai (yy.zddyr.top) asks to be credited and not overused, so it is only asked when the other channels fail.": "星海（yy.zddyr.top）要求註明來源且勿濫用，因此只在其他通道失敗時使用。",
    "Following": "關注",
    "Original": "原畫",
    "Super HD": "超清",
    "HD": "高清",
    "SD": "標清",
    "Sign in to Douyin to search its live rooms.": "登入抖音後即可搜尋直播間。",
    "Douyin no longer accepts this sign-in. Sign in again in Settings.": "抖音登入已失效，請在設定中重新登入。",
    "All": "全部",
    "Bilibili": "嗶哩嗶哩",
    "Bilibili Live": "嗶哩嗶哩直播",
    "Douyu Live": "鬥魚直播",
    "Huya Live": "虎牙直播",
    "Douyin Live": "抖音直播",
    "Hongguo": "紅果短劇",
    "Xifan": "西飯短劇",
    "Hema": "河馬短劇",
    "Recommended": "推薦",
    "Episode %@": "第 %@ 集",
    "%@ Episodes": "共 %@ 集",
    "%@ of %@ episodes free": "免費 %@/%@ 集",
    "Live-action Drama": "真人劇",
    "Animated Drama": "漫劇",
    "AI Drama": "AI 劇",
    "Trending Dramas": "綜合熱播榜",
    "Trending Live-action": "真人熱播榜",
    "Trending Animation": "漫劇熱播榜",
    "Trending AI Drama": "AI 熱播榜",
    "%@ could not be reached. Try again later.": "無法連線%@，請稍後再試。",
    "%@ returned incomplete data. Please refresh and try again.": "%@傳回的資料不完整，請重新整理後重試。",
    "This episode isn't free on %@.": "%@的這一集需要付費。",
    "Hongguo could not be reached. Try again later.": "暫時無法連接紅果，請稍後重試。",
    "Hongguo returned incomplete data. Please refresh and try again.": "紅果傳回的資料不完整，請重新整理後再試。",
    "Hongguo did not provide a playable source for this episode. Try again later.": "紅果暫未提供本集的可用片源，請稍後重試。",
    "Hongguo is turning away playback requests right now. Try again later, or on another network if this keeps happening.": "紅果暫時拒絕了播放請求，請稍後重試；如果一直這樣，可以換個網路試試。",
    "Hongguo only offers this episode in ByteVC2, which this device can't play. Watch it in the Hongguo app.": "紅果只提供本集的 ByteVC2 編碼版本，本裝置無法播放，請在紅果 App 中觀看。",
    "Bilibili refused the request. Try again later.": "嗶哩嗶哩拒絕了請求，請稍後再試。",
    "Bilibili's video servers could not be reached. Try again later.": "無法連線至嗶哩嗶哩的影片伺服器，請稍後再試。",
    "This episode needs a Bilibili premium membership. Only a short preview is available.": "本集需要嗶哩嗶哩大會員，目前只能觀看試看片段。",
    "This live room is not broadcasting right now.": "該直播間目前未開播。",
    "This live room has no stream this device can play.": "該直播間沒有本裝置可播放的影音串流。"
  },
  "ja": {
    // Signing in to Hongguo (src/sites/hongguo/account.ts), as the app worded it before it moved here.
    "Hongguo didn't answer. Try again.": "Hongguo から応答がありません。もう一度お試しください。",
    "Couldn't get a sign-in code. Try again.": "ログイン用コードを取得できませんでした。もう一度お試しください。",
    "Sign-in was approved, but Hongguo didn't return a login. Try again.": "サインインは承認されましたが、Hongguo からログイン情報が返ってきませんでした。もう一度お試しください。",
    "Hongguo often won't play for devices that aren't signed in. Open the Hongguo app on your phone, scan this code, and confirm the sign-in.": "Hongguo はサインインしていないデバイスでは再生しないことがよくあります。スマートフォンで Hongguo アプリを開き、このコードをスキャンしてサインインを確認してください。",
    "Hongguo episodes play as this account. Sign-in details stay on this device.": "Hongguo のエピソードはこのアカウントで再生します。サインイン情報はこのデバイスにのみ保存されます。",
    // Music channels (src/music/resolve.ts), as the app worded them before they moved here.
    "GD Music": "GD音乐台",
    "Migu": "咪咕",
    "Nianxin": "念心",
    "Xinghai": "星海",
    "Migu Music": "咪咕音楽",
    "Kuwo Music and NetEase Cloud Music": "酷我音楽と NetEase Cloud Music",
    "QQ Music": "QQ Music",
    "NetEase Cloud Music": "NetEase Cloud Music",
    "Kuwo Music and NetEase Cloud Music, when the others fail": "酷我音楽と NetEase Cloud Music（ほかが失敗したとき）",
    "QQ Music, when VKeys fails": "QQ Music（VKeys が失敗したとき）",
    "HYW key": "HYW キー",
    "Source: GD Music (music.gdstudio.xyz)": "音源：GD音乐台 (music.gdstudio.xyz)",
    "Source: Xinghai (yy.zddyr.top)": "音源：星海（yy.zddyr.top）",
    "HYW stays off until you enter the key from its published script. GD Music (music.gdstudio.xyz) is for personal, non-commercial use and allows 50 requests every 5 minutes.": "HYW は、公開スクリプトのキーを入力するまでオフのままです。GD音乐台 (music.gdstudio.xyz) は個人の非商用利用に限られ、5 分ごとに 50 リクエストまでです。",
    "Xinghai (yy.zddyr.top) asks to be credited and not overused, so it is only asked when the other channels fail.": "星海（yy.zddyr.top）は出典の明記と使いすぎないよう求めているため、ほかのチャンネルが失敗したときだけ使います。",
    "Following": "フォロー中",
    "Original": "オリジナル",
    "Super HD": "超高画質",
    "HD": "高画質",
    "SD": "標準画質",
    "Sign in to Douyin to search its live rooms.": "ライブルームを検索するにはDouyinにサインインしてください。",
    "Douyin no longer accepts this sign-in. Sign in again in Settings.": "Douyinがこのサインインを受け付けなくなりました。設定でもう一度サインインしてください。",
    "All": "すべて",
    "Bilibili": "ビリビリ",
    "Bilibili Live": "ビリビリ生配信",
    "Douyu Live": "斗魚ライブ",
    "Huya Live": "虎牙ライブ",
    "Douyin Live": "Douyinライブ",
    "Hongguo": "Hongguo",
    "Xifan": "Xifan",
    "Hema": "Hema",
    "Recommended": "おすすめ",
    "Episode %@": "エピソード %@",
    "%@ Episodes": "全 %@ 話",
    "%@ of %@ episodes free": "無料 %@/%@ 話",
    "Live-action Drama": "実写ドラマ",
    "Animated Drama": "アニメドラマ",
    "AI Drama": "AI ドラマ",
    "Trending Dramas": "総合人気ランキング",
    "Trending Live-action": "実写人気ランキング",
    "Trending Animation": "アニメ人気ランキング",
    "Trending AI Drama": "AI 人気ランキング",
    "%@ could not be reached. Try again later.": "%@に接続できませんでした。しばらくしてからもう一度お試しください。",
    "%@ returned incomplete data. Please refresh and try again.": "%@ から届いたデータが不完全です。更新してお試しください。",
    "This episode isn't free on %@.": "このエピソードは %@ では有料です。",
    "Hongguo could not be reached. Try again later.": "Hongguo に接続できません。しばらくしてから再試行してください。",
    "Hongguo returned incomplete data. Please refresh and try again.": "Hongguo のデータが不完全です。更新して再試行してください。",
    "Hongguo did not provide a playable source for this episode. Try again later.": "このエピソードの再生ソースがありません。しばらくしてから再試行してください。",
    "Hongguo is turning away playback requests right now. Try again later, or on another network if this keeps happening.": "Hongguo が現在再生リクエストを受け付けていません。しばらくしてから、それでも続く場合は別のネットワークで再試行してください。",
    "Hongguo only offers this episode in ByteVC2, which this device can't play. Watch it in the Hongguo app.": "このエピソードは本機で再生できない ByteVC2 形式でのみ提供されています。Hongguo アプリでご覧ください。",
    "Bilibili refused the request. Try again later.": "ビリビリがリクエストを拒否しました。しばらくしてからもう一度お試しください。",
    "Bilibili's video servers could not be reached. Try again later.": "ビリビリの動画サーバーに接続できません。しばらくしてからもう一度お試しください。",
    "This episode needs a Bilibili premium membership. Only a short preview is available.": "このエピソードはビリビリの大会員限定です。視聴できるのは短いプレビューのみです。",
    "This live room is not broadcasting right now.": "この配信ルームは現在配信していません。",
    "This live room has no stream this device can play.": "この配信ルームにはこのデバイスで再生できるストリームがありません。"
  }
};
function language(tag) {
  const value = String(tag || "").toLowerCase();
  if (value.startsWith("zh")) return /hant|tw|hk|mo/.test(value) ? "zh-Hant" : "zh-Hans";
  if (value.startsWith("ja")) return "ja";
  return "en";
}
function text(lang, key, ...args) {
  const template = (lang === "en" ? void 0 : tables[lang][key]) ?? key;
  let next = 0;
  return template.replace(/%@/g, () => String(args[next++] ?? ""));
}

// src/live/common.ts
var desktopAgent = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36";
var settings = { lang: "en", cookie: "" };
function configure(ext) {
  const options = extension(ext);
  settings.lang = language(options.lang);
  settings.cookie = String(options.cookie || "");
}
var t = (key, ...args) => text(settings.lang, key, ...args);
var recommended = () => ({ id: "", name: t("Recommended") });
function fetchText(url, options = {}) {
  const headers2 = { "User-Agent": desktopAgent, ...options.headers || {} };
  const reply = request(url, { timeout: 15e3, ...options, headers: headers2 });
  if (!(reply.code >= 200 && reply.code < 300)) throw new Error(`HTTP ${reply.code || 0} from ${hostOf(url)}`);
  return { content: reply.content || "", headers: reply.headers || {} };
}
var fetchJSON = (url, options = {}) => JSON.parse(fetchText(url, options).content || "{}");
var hostOf = (url) => {
  try {
    return new URL(url).host;
  } catch {
    return url;
  }
};
function address(base, query) {
  const encoded = query.map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(String(v))}`).join("&");
  return encoded ? `${base}?${encoded}` : base;
}
var plain = (value) => String(value ?? "").replace(/<[^>]+>/g, "").replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"').replace(/&#39;/g, "'").trim();
function image(value) {
  const textValue = String(value ?? "");
  if (!textValue) return "";
  return textValue.startsWith("//") ? "https:" + textValue : textValue.replace(/^http:\/\//, "https://");
}
function count(value) {
  if (typeof value === "number") return value;
  let textValue = String(value ?? "").trim();
  if (!textValue) return 0;
  let scale = 1;
  if (textValue.endsWith("万")) {
    scale = 1e4;
    textValue = textValue.slice(0, -1);
  } else if (textValue.endsWith("亿")) {
    scale = 1e8;
    textValue = textValue.slice(0, -1);
  }
  return Math.round((Number(textValue) || 0) * scale);
}
var room = (id, title, host, cover2, online, area) => ({ id: String(id), title: plain(title), host: plain(host), cover: image(cover2), online: count(online), area: plain(area) });
var page = (pg) => Math.max(1, parseInt(String(pg), 10) || 1);
var quality = (flag) => {
  const n = parseInt(String(flag ?? ""), 10);
  return Number.isFinite(n) ? n : null;
};

// src/live/douyin.ts
var parameters = [
  ["aid", "6383"],
  ["app_name", "douyin_web"],
  ["live_id", "1"],
  ["device_platform", "web"],
  ["language", "zh-CN"],
  ["browser_language", "zh-CN"],
  ["browser_platform", "Win32"],
  ["browser_name", "Chrome"],
  ["browser_version", "126.0.0.0"],
  ["cookie_enabled", "true"],
  ["screen_width", "1920"],
  ["screen_height", "1080"]
];
var fallbackAreas = [["101", "聊天"], ["102", "音乐"], ["103", "游戏"], ["104", "二次元"], ["105", "舞蹈"], ["106", "文化"], ["107", "生活"], ["108", "运动"]];
var visitor = "";
function headers() {
  if (!visitor) {
    const reply = fetchText("https://live.douyin.com/", { headers: { Accept: "text/html", "User-Agent": userAgent } });
    const cookies = [].concat(reply.headers["set-cookie"] || []).join(", ");
    const found = /ttwid=([^;,\s]+)/.exec(cookies);
    if (!found) throw new Error(t("%@ could not be reached. Try again later.", t("Douyin Live")));
    visitor = `ttwid=${found[1]}`;
  }
  return { Referer: "https://live.douyin.com/", Cookie: visitor, "User-Agent": userAgent };
}
function signed(base, query) {
  const url = address(base, query);
  const sent = url.slice(url.indexOf("?") + 1);
  return `${url}&a_bogus=${encodeURIComponent(aBogus(sent))}`;
}
function firstJSONValue(text2) {
  let depth = 0, inString = false, escaped = false;
  for (let index = 0; index < text2.length; index++) {
    const char = text2[index];
    if (inString) {
      if (escaped) escaped = false;
      else if (char === "\\") escaped = true;
      else if (char === '"') inString = false;
      continue;
    }
    if (char === '"') inString = true;
    else if (char === "[" || char === "{") depth++;
    else if (char === "]" || char === "}") {
      depth--;
      if (depth === 0) return text2.slice(0, index + 1);
    }
  }
  return null;
}
function categories() {
  const html = fetchText("https://live.douyin.com/", { headers: headers() }).content;
  const marker = '\\"categoryData\\":[';
  const start = html.indexOf(marker);
  if (start < 0) return [];
  const escaped = html.slice(start + marker.length - 1, start + marker.length - 1 + 3e5);
  const json = firstJSONValue(escaped.replace(/\\"/g, '"').replace(/\\\\/g, "\\"));
  let list = [];
  try {
    list = JSON.parse(json || "[]");
  } catch {
    return [];
  }
  const area = (item) => {
    const partition = item && item.partition;
    return partition && partition.id_str && partition.type != null && partition.title ? { id: `${partition.id_str},${partition.type}`, name: String(partition.title) } : null;
  };
  return list.flatMap((item) => [area(item), ...(item.sub_partition || []).map(area)].filter(Boolean));
}
function areas() {
  let found = [];
  try {
    found = categories();
  } catch {
    found = [];
  }
  return [recommended(), ...found.length ? found : fallbackAreas.map(([id, name]) => ({ id: `${id},4`, name }))];
}
var cover = (value) => ((value || {}).url_list || [])[0] || "";
function recommendedRooms(pg) {
  if (pg > 6) return [];
  const reply = fetchJSON(address("https://live.douyin.com/webcast/feed/", [
    ...parameters,
    ["need_map", "1"],
    ["is_draw", "1"],
    ["inner_from_drawer", "0"],
    ["count", "20"],
    ["enter_source", "web_homepage_hot_web_live_card"],
    ["source_key", "web_homepage_hot_web_live_card"]
  ]), { headers: headers() });
  return (reply.data || []).map((item) => item && item.data).filter(Boolean).map((r) => {
    const owner = r.owner || {};
    const id = r.web_rid || owner.web_rid;
    return id ? room(id, r.title, owner.nickname, cover(r.cover), r.user_count, t("Recommended")) : null;
  }).filter(Boolean);
}
function rooms(area, areaName, pg) {
  if (!area) return recommendedRooms(pg);
  const parts = area.split(",");
  if (parts.length !== 2) return [];
  const reply = fetchJSON(signed("https://live.douyin.com/webcast/web/partition/detail/room/v2/", [
    ...parameters,
    ["enter_from", "link_share"],
    ["browser_online", "true"],
    ["count", "15"],
    ["offset", String((pg - 1) * 15)],
    ["partition", parts[0]],
    ["partition_type", parts[1]],
    ["req_from", "2"]
  ]), { headers: headers() });
  return ((reply.data || {}).data || []).filter((item) => item && item.web_rid && item.room).map((item) => {
    const stats = (item.room.room_view_stats || {}).display_value;
    return room(item.web_rid, item.room.title, (item.room.owner || {}).nickname, cover(item.room.cover), stats, item.tag_name || areaName);
  });
}
function search(keyword, pg) {
  if (!/sessionid/.test(settings.cookie)) throw new Error(t("Sign in to Douyin to search its live rooms."));
  const url = signed("https://www.douyin.com/aweme/v1/web/live/search/", [
    ["device_platform", "webapp"],
    ["aid", "6383"],
    ["channel", "channel_pc_web"],
    ["search_channel", "aweme_live"],
    ["keyword", keyword],
    ["search_source", "switch_tab"],
    ["query_correct_type", "1"],
    ["is_filter_search", "0"],
    ["from_group_id", ""],
    ["offset", String((pg - 1) * 10)],
    ["count", "10"],
    ["pc_client_type", "1"],
    ["version_code", "170400"],
    ["version_name", "17.4.0"],
    ["cookie_enabled", "true"],
    ["screen_width", "1920"],
    ["screen_height", "1080"],
    ["browser_language", "zh-CN"],
    ["browser_platform", "Win32"],
    ["browser_name", "Chrome"],
    ["browser_version", "126.0.0.0"],
    ["browser_online", "true"],
    ["engine_name", "Blink"],
    ["engine_version", "126.0.0.0"],
    ["os_name", "Windows"],
    ["os_version", "10"],
    ["platform", "PC"]
  ]);
  const reply = fetchJSON(url, { headers: {
    Cookie: settings.cookie,
    Referer: `https://www.douyin.com/search/${encodeURIComponent(keyword)}?type=live`,
    "User-Agent": userAgent,
    Accept: "application/json, text/plain, */*"
  } });
  if (reply.status_code != null && reply.status_code !== 0) {
    throw new Error(reply.status_code === 2483 ? t("Douyin no longer accepts this sign-in. Sign in again in Settings.") : String(reply.status_msg || "") || t("%@ could not be reached. Try again later.", t("Douyin Live")));
  }
  return (reply.data || []).map((item) => {
    let r;
    try {
      r = JSON.parse(((item || {}).lives || {}).rawdata || "");
    } catch {
      return null;
    }
    const owner = r && r.owner || {};
    if (!owner.web_rid || (r.status ?? 2) !== 2) return null;
    return room(owner.web_rid, r.title, owner.nickname, cover(r.cover), (r.stats || {}).total_user ?? r.user_count, t("Douyin Live"));
  }).filter(Boolean);
}
var levels = [["FULL_HD1", 4, "Original"], ["HD1", 3, "Super HD"], ["SD1", 2, "HD"], ["SD2", 1, "SD"]];
function stream(id, wanted) {
  const reply = fetchJSON(
    address("https://live.douyin.com/webcast/room/web/enter/", [...parameters, ["web_rid", id], ["enter_from", "web_live"], ["is_need_double_stream", "false"]]),
    { headers: { ...headers(), Referer: `https://live.douyin.com/${id}` } }
  );
  const info = ((reply.data || {}).data || [])[0] || null;
  const map = info && info.status === 2 ? (info.stream_url || {}).hls_pull_url_map : null;
  if (!map) throw new Error(t("This live room is not broadcasting right now."));
  const offered = levels.filter(([key]) => map[key]);
  const chosen = offered.find(([, level]) => level === wanted) || offered[0];
  if (!chosen) throw new Error(t("This live room has no stream this device can play."));
  return { url: String(map[chosen[0]]), title: String(info.title || ""), qualities: offered.map(([, level, label]) => ({ id: level, label: t(label) })), current: chosen[1] };
}
var areaNames = {};
var douyin_default = {
  init: configure,
  home() {
    const list = areas();
    for (const a of list) areaNames[a.id] = a.name;
    return { areas: list };
  },
  category: (area, pg) => ({ rooms: rooms(String(area || ""), areaNames[area] || "", page(pg)) }),
  search: (keyword, _quick, pg) => ({ rooms: search(String(keyword), page(pg)) }),
  play: (flag, id) => stream(String(id).replace(/[^\w-]/g, ""), quality(flag))
};
export {
  douyin_default as default
};