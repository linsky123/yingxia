
// src/lib/host.ts
var request = (url, options = {}) => globalThis.req(url, options);
function randomHex(count) {
  let out = "";
  for (let i = 0; i < count; i++) out += "0123456789abcdef"[Math.floor(Math.random() * 16)];
  return out;
}
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
  let next2 = 0;
  return template.replace(/%@/g, () => String(args[next2++] ?? ""));
}

// src/lib/labels.ts
function hongguoLabels(lang) {
  return {
    name: text(lang, "Hongguo"),
    // `%@` is kept for the episode number (text() would otherwise blank it).
    episode: text(lang, "Episode %@", "%@"),
    categories: ["Live-action Drama", "Animated Drama", "AI Drama", "Trending Dramas", "Trending Live-action", "Trending Animation", "Trending AI Drama"].map((key) => text(lang, key)),
    unavailable: text(lang, "Hongguo could not be reached. Try again later."),
    changed: text(lang, "Hongguo returned incomplete data. Please refresh and try again."),
    playback: text(lang, "Hongguo did not provide a playable source for this episode. Try again later."),
    refused: text(lang, "Hongguo is turning away playback requests right now. Try again later, or on another network if this keeps happening."),
    bytevc2: text(lang, "Hongguo only offers this episode in ByteVC2, which this device can't play. Watch it in the Hongguo app.")
  };
}

// src/sites/hongguo/crypto.js
var Buffer = class _Buffer extends globalThis.Buffer {
  static from(value, encoding) {
    const bytes = globalThis.Buffer.from(value, encoding);
    return new _Buffer(bytes);
  }
  static alloc(size, fill = 0) {
    return new _Buffer(size).fill(fill);
  }
  static concat(list) {
    const out = _Buffer.alloc(list.reduce((n, b) => n + b.length, 0));
    let at = 0;
    for (const b of list) {
      out.set(b, at);
      at += b.length;
    }
    return out;
  }
  static isBuffer(value) {
    return value instanceof Uint8Array;
  }
  copy(target, offset = 0, start2 = 0, end = this.length) {
    const bytes = this.subarray(start2, Math.min(end, start2 + target.length - offset));
    target.set(bytes, offset);
    return bytes.length;
  }
  view() {
    return new DataView(this.buffer, this.byteOffset, this.byteLength);
  }
  readUInt32BE(offset = 0) {
    return this.view().getUint32(offset, false);
  }
  readUInt32LE(offset = 0) {
    return this.view().getUint32(offset, true);
  }
  writeUInt32BE(value, offset = 0) {
    this.view().setUint32(offset, value, false);
    return offset + 4;
  }
  writeUInt32LE(value, offset = 0) {
    this.view().setUint32(offset, value, true);
    return offset + 4;
  }
  writeFloatLE(value, offset = 0) {
    this.view().setFloat32(offset, value, true);
    return offset + 4;
  }
  readBigUInt64LE(offset = 0) {
    return this.view().getBigUint64(offset, true);
  }
  writeBigUInt64LE(value, offset = 0) {
    this.view().setBigUint64(offset, value, true);
    return offset + 8;
  }
  writeBigUInt64BE(value, offset = 0) {
    this.view().setBigUint64(offset, value, false);
    return offset + 8;
  }
};
function aesCBC(encrypt, algorithm, key, iv) {
  if (algorithm !== "aes-128-cbc") throw new Error("Unsupported Hongguo cipher");
  let padding = true;
  const parts = [];
  return {
    setAutoPadding(value) {
      padding = value;
    },
    update(data) {
      parts.push(Buffer.from(data));
      return Buffer.alloc(0);
    },
    final() {
      return Buffer.from(nativeCrypto({
        op: "aes",
        encrypt,
        mode: "CBC",
        padding,
        key: key.toString("base64"),
        iv: iv.toString("base64"),
        data: Buffer.concat(parts).toString("base64")
      }).data, "base64");
    }
  };
}
var crypto = {
  randomBytes(count) {
    return Buffer.from(nativeCrypto({ op: "random", count }).data, "base64");
  },
  randomUUID() {
    const bytes = crypto.randomBytes(16);
    bytes[6] = bytes[6] & 15 | 64;
    bytes[8] = bytes[8] & 63 | 128;
    const hex = bytes.toString("hex");
    return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20)}`;
  },
  createHash(alg) {
    const parts = [];
    return {
      update(data) {
        parts.push(Buffer.from(data));
        return this;
      },
      digest(encoding) {
        const bytes = Buffer.from(nativeCrypto({ op: "hash", alg, data: Buffer.concat(parts).toString("base64") }).hex, "hex");
        return encoding ? bytes.toString(encoding) : bytes;
      }
    };
  },
  createCipheriv(algorithm, key, iv) {
    return aesCBC(true, algorithm, key, iv);
  },
  createDecipheriv(algorithm, key, iv) {
    return aesCBC(false, algorithm, key, iv);
  }
};

// src/sites/hongguo/sm3.js
function sm3(input) {
  const source = Buffer.isBuffer(input) ? input : Buffer.from(input);
  const data = Buffer.alloc(Math.ceil((source.length + 9) / 64) * 64);
  source.copy(data);
  data[source.length] = 128;
  data.writeBigUInt64BE(BigInt(source.length) * 8n, data.length - 8);
  const state = new Uint32Array([1937774191, 1226093241, 388252375, 3666478592, 2842636476, 372324522, 3817729613, 2969243214]);
  const words = new Uint32Array(68);
  const rotate = (x, n) => (x << (n & 31) | x >>> (32 - n & 31)) >>> 0;
  for (let offset = 0; offset < data.length; offset += 64) {
    for (let i = 0; i < 16; i++) words[i] = data.readUInt32BE(offset + i * 4);
    for (let i = 16; i < 68; i++) {
      const x = words[i - 16] ^ words[i - 9] ^ rotate(words[i - 3], 15);
      words[i] = x ^ rotate(x, 15) ^ rotate(x, 23) ^ rotate(words[i - 13], 7) ^ words[i - 6];
    }
    let [a, b, c, d, e, f, g, h] = state;
    for (let i = 0; i < 64; i++) {
      const a12 = rotate(a, 12);
      const s1 = rotate(a12 + e + rotate(i < 16 ? 2043430169 : 2055708042, i) >>> 0, 7);
      const s2 = s1 ^ a12;
      const ff = i < 16 ? a ^ b ^ c : a & b | a & c | b & c;
      const gg = i < 16 ? e ^ f ^ g : e & f | ~e & g;
      const t1 = ff + d + s2 + (words[i] ^ words[i + 4]) >>> 0;
      const t2 = gg + h + s1 + words[i] >>> 0;
      d = c;
      c = rotate(b, 9);
      b = a;
      a = t1;
      h = g;
      g = rotate(f, 19);
      f = e;
      e = (t2 ^ rotate(t2, 9) ^ rotate(t2, 17)) >>> 0;
    }
    const next2 = [a, b, c, d, e, f, g, h];
    for (let i = 0; i < 8; i++) state[i] ^= next2[i];
  }
  const digest = Buffer.alloc(32);
  for (let i = 0; i < 8; i++) digest.writeUInt32BE(state[i], i * 4);
  return digest;
}

// src/sites/hongguo/playback-device.js
var REGISTER_URL = "https://log5-applog-lf.fqnovel.com/service/2/device_register/?tt_data=a&cronet_version=8d40f833_2026-03-03&ttnet_version=4.2.243.31-douyin&use_store_region_cookie=1";
var KDF_SALT = Buffer.from("4dd4c2e6b83162090e52b3c7a6733ba41cb2462b829ab58a196b39db57177524f49baf7f08e8d68d26a72e37c1a95a2f1f05a51892aef2949732b62a38aadd58", "hex");
var retryAfter = 0;
function responseId(response, name) {
  const preferred = response?.[`${name}_str`];
  const value = preferred === void 0 || preferred === null || preferred === "" ? response?.[name] : preferred;
  if (typeof value === "number") return Number.isSafeInteger(value) && value > 0 ? String(value) : "";
  return typeof value === "string" && /^\d{1,30}$/.test(value) && /[1-9]/.test(value) ? value : "";
}
async function registerPlaybackDevice(requestJson2) {
  if (Date.now() < retryAfter) throw Object.assign(new Error("红果匿名播放设备注册失败，10 秒后重试"), { code: "DEVICE_REGISTRATION_FAILED" });
  try {
    const device = await register(requestJson2);
    retryAfter = 0;
    return device;
  } catch (error) {
    retryAfter = Date.now() + 1e4;
    throw Object.assign(new Error("红果匿名播放设备注册失败，10 秒后重试"), { code: "DEVICE_REGISTRATION_FAILED", cause: error });
  }
}
async function register(requestJson2) {
  const now = Date.now();
  const cdid = crypto.randomUUID();
  const header = {
    display_name: "红果免费短剧",
    update_version_code: 73932,
    manifest_version_code: 73932,
    app_version_minor: "7.3.9.32",
    aid: 8662,
    channel: "update_64",
    package: "com.phoenix.read",
    app_version: "7.3.9.32",
    version_code: 73932,
    sdk_version: "3.7.0-rc.34-fanqie-xiaoshuo",
    sdk_target_version: 29,
    git_hash: "3a88f4e",
    os: "Android",
    os_version: "16",
    os_api: 36,
    device_model: "25053RT47C",
    device_brand: "Redmi",
    device_manufacturer: "Redmi",
    cpu_abi: "arm64-v8a",
    release_build: "b5e187f",
    density_dpi: 520,
    display_density: "mdpi",
    resolution: "1280x2772",
    language: "zh",
    timezone: 8,
    access: "wifi",
    not_request_sender: 0,
    carrier: "CHINA MOBILE",
    mcc_mnc: "46000",
    rom: "eng.root.20231116.160340",
    rom_version: "W528JS release-keys",
    cdid,
    sig_hash: "56a962410c494bbaf0b58dba20cae56f",
    openudid: crypto.randomBytes(8).toString("hex"),
    clientudid: crypto.randomUUID(),
    ipv6_list: [],
    region: "CN",
    tz_name: "Asia/Shanghai",
    tz_offset: 28800,
    sim_region: "cn",
    sim_serial_number: [],
    oaid_may_support: false,
    req_id: crypto.randomUUID(),
    device_platform: "android",
    custom: { account_region_src: "fallback", account_region: "cn", host_bit: 64, dragon_device_type: "phone" },
    pre_installed_channel: "",
    apk_first_install_time: now,
    is_system_app: 0,
    sdk_flavor: "china",
    guest_mode: 0
  };
  const compressed = Buffer.from(globalThis.pako.gzip(Buffer.from(JSON.stringify({ magic_tag: "ss_app_log", header, _gen_time: now }))));
  const random = crypto.randomBytes(32);
  const derived = crypto.createHash("sha512").update(Buffer.concat([crypto.createHash("sha512").update(random).digest(), KDF_SALT])).digest();
  const cipher = crypto.createCipheriv("aes-128-cbc", derived.subarray(0, 16), derived.subarray(16, 32));
  const plaintext = Buffer.concat([crypto.createHash("sha512").update(compressed).digest(), compressed]);
  const data = Buffer.concat([Buffer.from("746305100000", "hex"), random, cipher.update(plaintext), cipher.final()]);
  const response = await requestJson2(REGISTER_URL, {
    method: "POST",
    headers: {
      "User-Agent": "com.phoenix.read/72232 (Linux; U; Android 16; zh_CN; 25053RT47C; Build/BP2A.250605.031.A3)",
      Accept: "application/json",
      "Content-Type": "application/octet-stream;tt-data=a",
      "log-encode-type": "gzip",
      "x-ss-dp": "8662",
      "x-ss-req-ticket": String(now),
      "x-vc-bdturing-sdk-version": "4.0.3.cn",
      lc: "101",
      "sdk-version": "2",
      "passport-sdk-version": "5051452",
      "x-neptune": "-8|50:51:59:30:40:47:49:39",
      "x-ss-stub": crypto.createHash("md5").update(data).digest("hex").toUpperCase()
    },
    data
  }, Date.now() + 8e3, { aborted: false });
  const device_id = responseId(response, "device_id");
  const iid = responseId(response, "install_id");
  const code = Number(response?.code ?? response?.Code ?? 0);
  if (code !== 0) throw new Error(`红果匿名播放设备注册失败（code ${code}）`);
  if (!device_id || !iid) throw new Error("红果匿名播放设备注册失败（未返回设备编号）");
  return Object.freeze({ device_id, iid, cdid });
}

// src/sites/hongguo/playback-signature.js
var LICENSE_ID = 1611921764n;
var SIGN_KEY = Buffer.from("fc78e0a9657a0c748ce51559903ccf03510e51d3cff232d71343e88a321c5304", "hex");
var AES_KEY = Buffer.from("d31e3718288a1027baab59f146a09a9c", "hex");
var AES_IV = Buffer.from("ea180a0336ed352fcd24e4d50018ae54", "hex");
var MAGIC8 = Buffer.from("f2f7fcfff2f7fcff", "hex");
var TAIL9 = Buffer.from("eafb2cfe8568519154", "hex");
var u64 = (value) => BigInt.asUintN(64, value);
var rol64 = (value, bits) => u64(u64(value) << BigInt(bits) | u64(value) >> BigInt(64 - bits));
var ror64 = (value, bits) => rol64(value, 64 - bits);
var integer = (value) => {
  if (typeof value === "bigint") return value;
  if (!Number.isSafeInteger(value)) throw new TypeError("Safe integer or BigInt required");
  return BigInt(value);
};
var le64 = (value) => {
  const out = Buffer.alloc(8);
  out.writeBigUInt64LE(u64(value));
  return out;
};
function varint(value) {
  let n = BigInt.asUintN(32, integer(value));
  const out = [];
  while (n >= 128n) {
    out.push(Number(n & 127n) | 128);
    n >>= 7n;
  }
  out.push(Number(n));
  return Buffer.from(out);
}
var ProtoBuf = class {
  constructor() {
    this.parts = [];
  }
  putVarint(tag, value) {
    this.parts.push(varint(BigInt(tag) << 3n), varint(value));
    return this;
  }
  putBytes(tag, bytes) {
    const value = Buffer.from(bytes);
    this.parts.push(varint(BigInt(tag) << 3n | 2n), varint(value.length), value);
    return this;
  }
  putUtf8(tag, value) {
    return this.putBytes(tag, Buffer.from(value, "utf8"));
  }
  putProtobuf(tag, value) {
    return this.putBytes(tag, value.toBuf());
  }
  toBuf() {
    return Buffer.concat(this.parts);
  }
};
var Simon = {
  keyExpansion(key) {
    if (!Array.isArray(key) || key.length !== 4) throw new TypeError("Four Simon key words required");
    const expanded = key.map((value) => u64(integer(value)));
    for (let i = 4; i < 72; i++) {
      let tmp = ror64(expanded[i - 1], 3) ^ expanded[i - 3];
      tmp ^= ror64(tmp, 1);
      const bit = 0x3dc94c3a046d678bn >> BigInt((i - 4) % 62) & 1n;
      expanded.push(u64(~expanded[i - 4] ^ tmp ^ bit ^ 3n));
    }
    return expanded;
  },
  encrypt(left, right, key) {
    let x = u64(integer(left)), y = u64(integer(right));
    for (const roundKey of Simon.keyExpansion(key)) {
      const previous = y;
      y = u64(x ^ rol64(y, 1) & rol64(y, 8) ^ rol64(y, 2) ^ roundKey);
      x = previous;
    }
    return [x, y];
  }
};
var pad16 = (data) => Buffer.concat([data, Buffer.alloc(16 - data.length % 16, 16 - data.length % 16)]);
function queryParam(query, name) {
  const decode = (value) => {
    try {
      return decodeURIComponent(value.replace(/\+/g, " "));
    } catch {
      return value;
    }
  };
  for (const part of query.split("&")) {
    const at = part.indexOf("="), key = at < 0 ? part : part.slice(0, at);
    if (decode(key) === name) return decode(at < 0 ? "" : part.slice(at + 1));
  }
  return null;
}
var Argus = {
  bodyHash(stubHex) {
    if (!stubHex) return sm3(Buffer.alloc(16)).subarray(0, 6);
    const bytes = /^(?:[a-f\d]{2})+$/i.test(stubHex) ? Buffer.from(stubHex, "hex") : Buffer.alloc(0);
    return sm3(bytes).subarray(0, 6);
  },
  queryHash(query) {
    return sm3(query ? Buffer.from(query, "utf8") : Buffer.alloc(16)).subarray(0, 6);
  },
  sign(query, stubHex, ts, aid, licenseId, deviceId, installId, randField) {
    if (typeof query !== "string" || typeof stubHex !== "string" || typeof deviceId !== "string" || typeof installId !== "string") throw new TypeError("String protocol fields required");
    const bean = new ProtoBuf().putVarint(1, 1077940818).putVarint(2, 2).putVarint(3, randField).putUtf8(4, String(integer(aid) === 0n ? 1967n : integer(aid))).putUtf8(5, deviceId).putUtf8(6, String(integer(licenseId) === 0n ? LICENSE_ID : integer(licenseId))).putUtf8(7, queryParam(query, "version_name") || "").putUtf8(8, "v04.04.05-ov-android").putVarint(9, 134744640).putBytes(10, Buffer.alloc(8)).putVarint(11, 0).putVarint(12, integer(ts) << 1n).putBytes(13, Argus.bodyHash(stubHex)).putBytes(14, Argus.queryHash(query)).putProtobuf(15, new ProtoBuf().putVarint(1, 1).putVarint(2, 1).putVarint(3, 1).putVarint(7, 3348294860)).putUtf8(16, installId).putUtf8(20, "none").putVarint(21, 738).putProtobuf(23, new ProtoBuf().putUtf8(1, "NX551J").putVarint(2, 8196).putVarint(4, 2162219008)).putVarint(25, 2);
    const protobuf = pad16(bean.toBuf()), key = Array.from({ length: 4 }, (_, i) => SIGN_KEY.readBigUInt64LE(i * 8));
    const blocks = [];
    for (let at = 0; at < protobuf.length; at += 16) {
      const encrypted = Simon.encrypt(protobuf.readBigUInt64LE(at), protobuf.readBigUInt64LE(at + 8), key);
      blocks.push(le64(encrypted[0]), le64(encrypted[1]));
    }
    const framed = Buffer.concat([MAGIC8, ...blocks, TAIL9]);
    for (let i = 8; i < framed.length; i++) framed[i] ^= MAGIC8[i % 8];
    const padded = pad16(Buffer.concat([framed.reverse(), Buffer.from("ao", "ascii")]));
    const cipher = crypto.createCipheriv("aes-128-cbc", AES_KEY, AES_IV);
    cipher.setAutoPadding(false);
    return Buffer.concat([Buffer.from("f281", "hex"), cipher.update(padded), cipher.final()]).toString("base64");
  }
};
var Ladon = {
  encrypt(ts, licenseId, aid, randomBytes) {
    if (!Buffer.isBuffer(randomBytes) || randomBytes.length !== 4) throw new TypeError("Four Ladon random bytes required");
    const aidText = integer(aid).toString();
    const digest = crypto.createHash("md5").update(Buffer.concat([randomBytes, Buffer.from(aidText)])).digest("hex");
    const ascii = Buffer.from(digest, "ascii"), words = Array.from({ length: 4 }, (_, i) => ascii.readBigUInt64LE(i * 8));
    const table = [words[0]], queue = words.slice(2);
    let b0 = words[0], b8 = words[1];
    for (let i = 0; i < 34; i++) {
      let x8 = u64(ror64(b8, 8) + b0) ^ BigInt(i);
      queue.push(x8);
      x8 ^= rol64(b0, 3);
      table.push(u64(x8));
      b0 = u64(x8);
      b8 = queue.shift();
    }
    const input = pad16(Buffer.from(`${integer(ts)}-${integer(licenseId)}-${aidText}`, "ascii")), out = Buffer.alloc(input.length);
    for (let at = 0; at < input.length; at += 16) {
      let a = input.readBigUInt64LE(at), b = input.readBigUInt64LE(at + 8);
      for (let i = 0; i < 34; i++) {
        b = table[i] ^ u64(a + ror64(b, 8));
        a = b ^ rol64(a, 3);
      }
      out.writeBigUInt64LE(u64(a), at);
      out.writeBigUInt64LE(u64(b), at + 8);
    }
    return Buffer.concat([randomBytes, out]).toString("base64");
  }
};
function signPlayer({ query, body = null, ts, randField, ladonRandom }) {
  if (typeof query !== "string" || body !== null && !Buffer.isBuffer(body)) throw new TypeError("Final query string and raw Buffer body required");
  const aidValue = queryParam(query, "aid");
  let aid = 1967n;
  if (/^[+-]?\d+$/.test(aidValue || "")) {
    const candidate = BigInt(aidValue);
    if (candidate >= -(1n << 63n) && candidate < 1n << 63n) aid = candidate;
  }
  const timestamp = integer(ts), stub = body?.length ? crypto.createHash("md5").update(body).digest("hex") : "";
  if (randField === void 0) randField = crypto.randomBytes(4).readUInt32LE();
  if (ladonRandom === void 0) ladonRandom = crypto.randomBytes(4);
  const headers2 = {
    "x-ss-req-ticket": String(timestamp * 1000n),
    "x-khronos": String(timestamp),
    "x-ladon": Ladon.encrypt(timestamp, LICENSE_ID, aid, ladonRandom),
    "x-argus": Argus.sign(query, stub, timestamp, aid, LICENSE_ID, queryParam(query, "device_id") || "", "", randField)
  };
  if (stub) headers2["x-ss-stub"] = stub;
  return headers2;
}

// src/sites/hongguo/app-source.js
var PROCESS_NONCE = crypto.randomBytes(18).toString("base64url");
var PROCESS_STARTED = Date.now();
var VIDEO_API = "https://api5-normal-sinfonlineb.fqnovel.com/novel/player/multi_video_model/v1/";
var VIDEO_TAB_API = "https://api5-normal-sinfonlineb.fqnovel.com/reading/bookapi/video_tab/multi_video_model/v1/";
var VIDEO_UA = "com.phoenix.read/71332 (Linux; U; Android 16; zh_CN; 25053RT47C; Build/BP2A.250605.031.A3; Cronet/TTNetVersion:04657795 2026-01-23 QuicVersion:c67e9834 2025-09-08)";
var DEVICE = {
  ac: "wifi",
  channel: "update_64",
  aid: "8662",
  app_name: "novelread",
  version_code: "71332",
  version_name: "7.1.3.32",
  device_platform: "android",
  os: "android",
  ssmix: "a",
  device_type: "25053RT47C",
  device_brand: "Redmi",
  language: "zh",
  os_api: "36",
  os_version: "16",
  manifest_version_code: "71332",
  resolution: "1280*2772",
  dpi: "520",
  update_version_code: "71332",
  host_abi: "arm64-v8a",
  dragon_device_type: "phone",
  pv_player: "71332",
  compliance_status: "0",
  need_personal_recommend: "1",
  player_so_load: "1",
  is_android_pad_screen: "0"
};
var PLAYBACK_DEVICE = {
  ...DEVICE,
  version_code: "74332",
  version_name: "7.4.3.32",
  manifest_version_code: "74332",
  update_version_code: "74332",
  pv_player: "74332"
};
var VIDEO_TAB_DEVICE = {
  ...DEVICE,
  version_code: "73932",
  version_name: "7.3.9.32",
  manifest_version_code: "73932",
  update_version_code: "73932",
  pv_player: "73932"
};
var PLAYBACK_UA = VIDEO_UA.replace(DEVICE.version_code, PLAYBACK_DEVICE.version_code);
function str(value, fallback = "") {
  return String(value == null ? fallback : value).trim();
}
function cleanUrl(value) {
  return str(value).replace(/\\\//g, "/").replace(/\\u0026/g, "&").replace(/&amp;/g, "&");
}
function jsonBody(value) {
  try {
    return JSON.parse(value);
  } catch {
    return null;
  }
}
function pythonUrlEncode(values) {
  return Object.entries(values).map(([key, value]) => {
    const encode = (item) => encodeURIComponent(String(item == null ? "" : item)).replace(/[!'()]/g, (ch) => `%${ch.charCodeAt(0).toString(16).toUpperCase()}`);
    return `${encode(key)}=${encode(value)}`;
  }).join("&");
}
var BRANCH2_ORDERS = Buffer.from("0f0704000908030a060b050d0e010c020f05080c0009020103070e060b0a0d04060500070c000a04080f010b0d09020e060b02050403080101070a000d0c090e0d070e0f0b0208030c0509010004060a0d0902060f0b0a040807000c0503010e0c090f07060f030e020d0405010b0a000c050a090e0802040407030f01060b000b0f0408020a0700090d06010e03050c0b060a0508020c03070f0e090d0001040906080f050800040a0b030d01020c0e090d0c0604070a03030f00080105020e01000d0f090a0b0e0402080703060c0501080a0c0f0905060b000304020e070d04080f000c0f0e0d0a01060207090503040205080d0b0a0606000e0f070c09030a08040f000b01060d0c0709030e05020a070b050f00020e0108030d0c0609040d070f08050f06040b0a0e0c090002030d0c020704010b0e0e08060f09050003", "hex");
var SBOX = Buffer.from("+n0Ia5xZs0sEXznQOEqRmQBnpiCf9U2Ccybu3xhmgzOAAxn72f6uqqmwUsYL83klTni0NqxdGieeiNu9PGPsSRXBMB/cuFbUbM3KCUPINaPvHvSW0vwOcnuUhNHqRVpiAj/TEoE0K91+5ijypUYTATsh9mE3KSoN7Yyvv51cuyR2D3XkU4nhmI2xmmVwT1RMWKtub4sjxAcRDLrPoKSO2AU9FLLadMPX577Wf95IFj6FkKFVt3dCIsmGUC4X+WQxLJvxbRxEaOPpqJOXyzJX6+Vxaq3AzMfF/WAdoi1Hp+JRaV56zgpBtpWP97mH4DoGEIq1+FvV8LyS/3wvwugbQOwb2r26mJEMsiuDQTRn+wrYdrVGBVlhI3WQhyrjUBVMrLF5667llUcEaPCGPVGLD8qO5LlO8hKCvA7V9+8oJc9bXelqVQLhM76T5/WtnT45JKji+hdX0HoNCDDWuKON/QeaxB5uImSX0h2wv0VmP2zd2yeApxHcpsVS+MC2yFwAc2B7oBkTqsk1SEvTpM2fmfMQREBUfin0Bh+iq6EvPPavhWI2IX9e3yAas7Tm/3KEj2UmlFp36kN4x0rMLBRrxuh0U/zUHM4xcAMYjJY4MonxOl/X+alpt2M3WMI7w3HLnpIBigtNiJu7T21v4P6lSd5WFgntnMEt7oF92XzRLkJbTcGmXepE/UVOG6E/0YnhfS+q26utWcuxzpooyeD2cDlK1/8w9d28VzsRjbLuALbmGlp8+d7EzS6Au7lMpZ+ECMZvQmzwJ+eLOpxR+2chdUExp8ogQyq3v9l68rX4jCwjg0+PYKAEEzcU4wHFY2ZcdIHfWL1okD3SszT0GZMyKdZJrg1L2AeerB4tC0C4crp2EHGo5FYdSP7lwkeR2ocmnR+Ia8CYviUJlzOjhRZef9xuVOn3qcjow3fQgivsAmKKkg4+sA8F8/GWeDiGNhg8JM8KtFPMYWWkx5TVFX5t73kiNRJqjlIGVXtGZFCV4gzt0xcDopuZ6xz8r9Rzafpf9ywev8jh8592gHFIqpStZPuJxmDDMrNN0uBE3V+oscdoIzTJbRJ/t+sVvqnReJOgDJKk10fjisJwqyZBmnmn2BSFj8BvVtCMEbkuPOKdzw7eA11GPs04Qw8zWtkaZWwiO/wwpojqN6K0jY5RnNZA7vn4hPSul+nKCkVnVwQvg1zVxcSCtqORmB9KrJaBbssbCQivGJVJfVTt+hYxOtq4ZvWl8f4QAQZ0zGPffCgl9s6yT4vlvIdpu4YhBwA25wtQWZsc6GJYGWHyvSdeuh3mmUI9DSq13Fsp8C1MU3tqc04/df9LoTUXVXI5INOw/e8C7Hd+5CvbkMEFnnrUUmskEw==", "base64");
function playbackRequest(payload, identity, videoId = "", cookie = "") {
  const body = videoId ? null : Buffer.from(globalThis.pako.gzip(Buffer.from(payload)));
  const requestTicket = Date.now(), khronos = Math.floor(requestTicket / 1e3);
  const device = { ...videoId ? VIDEO_TAB_DEVICE : PLAYBACK_DEVICE, ...identity };
  const values = videoId ? {
    video_id: videoId,
    video_id_type: "0",
    device_level: "1",
    need_all_video_definition: "1",
    need_mp4_align: "0",
    use_os_player: "0",
    video_platform: "1024",
    source: "0",
    from_video_id: ""
  } : {};
  const query = pythonUrlEncode({ ...device, ...values, ts: String(khronos), _rticket: String(requestTicket) });
  const url = `${videoId ? VIDEO_TAB_API : VIDEO_API}?${query}`;
  const signature = signPlayer({ query, body, ts: khronos });
  return { url, body, method: videoId ? "GET" : "POST", headers: {
    "User-Agent": VIDEO_UA.replace(DEVICE.version_code, device.version_code),
    Accept: "application/json; charset=utf-8,application/x-protobuf",
    ...body ? { "Content-Type": "application/json; charset=UTF-8", "Content-Encoding": "gzip", "x-ss-stub": signature["x-ss-stub"] } : { "x-tt-request-tag": "t=0;n=0" },
    "x-ss-req-ticket": signature["x-ss-req-ticket"],
    "sdk-version": "2",
    "x-xs-from-web": "0",
    "passport-sdk-version": videoId ? "50561" : "5051452",
    "x-ss-dp": String(device.aid),
    "x-khronos": signature["x-khronos"],
    "x-ladon": signature["x-ladon"],
    "x-argus": signature["x-argus"],
    "x-tt-dt": "",
    "x-tt-store-region": "cn",
    "x-tt-store-region-src": "did",
    // The viewer's Hongguo sign-in, when the app has one (hongguoduanju.com cookies).
    ...cookie ? { Cookie: cookie } : {}
  } };
}
function parseFallback(value) {
  if (typeof value === "string") {
    const parsed = jsonBody(value);
    return parsed?.fallback_api || value;
  }
  if (Array.isArray(value)) return str(value[0]);
  return str(value?.fallback_api);
}
function deriveContentKey(value) {
  const raw = Buffer.from(str(value).replace(/-/g, "+").replace(/_/g, "/"), "base64");
  if (raw.length < 3) throw new Error("spade_a too short");
  let v8 = raw.length - (raw[0] ^ raw[1] ^ raw[2]) + 47;
  v8 = Math.min(v8, raw.length - 1);
  if (v8 < 33) throw new Error("spade_a key length invalid");
  const work = Buffer.from(raw.subarray(1, 1 + v8));
  let a = 85;
  let b = 246;
  for (let i = 0; i < v8; i += 1) {
    const old = work[i];
    const previous = i & 1 ? a : b;
    if (i & 1) a = old;
    else b = old;
    const pop = i.toString(2).split("1").length - 1;
    work[i] = -21 - pop + (previous ^ old) & 255;
  }
  const hex = work.subarray(1, 33).toString("ascii");
  if (!/^[0-9a-f]{32}$/i.test(hex)) throw new Error("App 视频密钥格式无效");
  return Buffer.from(hex, "hex");
}
function decryptSpadeUrl(value, seed) {
  const encoded = str(value);
  if (!encoded) return "";
  const raw = Buffer.from(encoded, "base64");
  if (raw.length < 5) throw new Error("spade URL ciphertext too short");
  if (raw[0] !== 168 || raw[2] !== 1 || raw[3] !== 0) throw new Error("spade URL header format error");
  const cipherLength = Math.floor((raw.length - 4) / 16) * 16;
  if (!cipherLength) throw new Error("spade URL ciphertext has no complete block");
  const constants = Buffer.from("4dd4c2e6b83162090e52b3c7a6733ba41cb2462b829ab58a196b39db57177524f49baf7f08e8d68d26a72e37c1a95a2f1f05a51892aef2949732b62a38aadd58", "hex");
  const h1 = crypto.createHash("sha512").update(seed).digest();
  const h2 = crypto.createHash("sha512").update(Buffer.concat([h1, constants])).digest();
  const decipher = crypto.createDecipheriv("aes-128-cbc", h2.subarray(0, 16), h2.subarray(16, 32));
  decipher.setAutoPadding(false);
  let plaintext = Buffer.concat([decipher.update(raw.subarray(4, 4 + cipherLength)), decipher.final()]);
  if (plaintext.length) {
    const padding = plaintext[plaintext.length - 1];
    if (padding >= 1 && padding <= 16 && padding <= plaintext.length) plaintext = plaintext.subarray(0, plaintext.length - padding);
  }
  while (plaintext.length && plaintext[plaintext.length - 1] === 0) plaintext = plaintext.subarray(0, plaintext.length - 1);
  return plaintext.toString("utf8");
}
function checkedUrl(value, domains) {
  let url;
  try {
    url = new URL(value);
  } catch (_) {
    throw new Error("App 片源地址格式无效");
  }
  if (url.protocol !== "https:" || url.username || url.password || url.port && url.port !== "443" || !domains.some((domain) => url.hostname === domain || url.hostname.endsWith(`.${domain}`))) {
    throw new Error("App 片源返回了不受支持的服务地址");
  }
  return url.href;
}
async function requestJson(url, options, deadline, signal) {
  for (let redirects = 0; redirects < 4; redirects++) {
    url = checkedUrl(url, ["fqnovel.com", "snssdk.com"]);
    const timeout = deadline - Date.now();
    if (timeout <= 0) throw new Error("App 片源请求超时");
    let response;
    try {
      const reply = globalThis.req(url, {
        method: options.method || "GET",
        headers: options.headers,
        bodyBase64: options.data ? Buffer.from(options.data).toString("base64") : void 0,
        timeout,
        redirect: false,
        // The app keeps one cookie store for all of a script's plain requests, so the cookies the first
        // device was given went out with the next device's requests, which were then refused (no
        // device number, empty answers: only the first episode after launch played from the App).
        // A raced request gets a connection and cookie store of its own; the second try starts only
        // when the first one fails.
        racers: 2,
        hedge: Math.max(1e3, Math.ceil(timeout))
      });
      if (String(reply.content || "").length > 2 * 1024 * 1024) throw new Error("Response too large");
      response = { status: reply.code, headers: reply.headers || {}, data: reply.content };
    } catch (_) {
      throw new Error(signal.aborted ? "App 片源请求超时" : "App 片源请求失败，请稍后重试");
    }
    if ([301, 302, 303, 307, 308].includes(response.status)) {
      if (options.method === "POST" || !response.headers.location) throw new Error("App 接口发生不支持的跳转");
      url = checkedUrl(new URL(response.headers.location, url).href, ["fqnovel.com", "snssdk.com"]);
      continue;
    }
    if (response.status !== 200) throw new Error(`App 片源请求失败（HTTP ${response.status}）`);
    if (typeof response.data === "string" && !response.data.trim()) throw Object.assign(new Error("App 接口未返回有效数据"), { code: "EMPTY_RESPONSE" });
    const parsed = typeof response.data === "string" ? jsonBody(response.data) : response.data;
    if (!parsed || typeof parsed !== "object") throw new Error("App 接口未返回有效数据");
    return parsed;
  }
  throw new Error("App 片源跳转次数过多");
}
var stepNote = (error) => error?.code === "EMPTY_RESPONSE" ? "empty answer" : String(error?.message || error).slice(0, 80);
function isRefusal(error) {
  return error?.code === "DEVICE_REGISTRATION_FAILED" || error?.code === "EMPTY_RESPONSE" || /HTTP (403|429)/.test(String(error?.message || ""));
}
async function fetchAppPlayUrl(vid, { cookie = "", bytevc2 = false } = {}) {
  const steps = [];
  try {
    return await resolveAppPlayUrl(vid, steps, cookie, bytevc2);
  } catch (error) {
    if (error && typeof error === "object") error.steps = steps;
    throw error;
  }
}
async function resolveAppPlayUrl(vid, steps, cookie, bytevc2) {
  const register2 = async () => {
    try {
      const device = await registerPlaybackDevice(requestJson);
      steps.push("register: ok");
      return device;
    } catch (error) {
      steps.push(`register: ${stepNote(error.cause || error)}`);
      throw error;
    }
  };
  vid = String(vid || "");
  if (!/^\d{1,30}$/.test(vid)) throw new Error("分集编号无效");
  const payload = JSON.stringify({
    biz_param: { detail_page_version: 0, device_level: 3, disable_digg_stat: false, need_all_video_definition: true, need_mp4_align: false, use_os_player: false, use_server_dns: false, video_platform: 1024 },
    mixed_video_id_map: { "1004": [vid] }
  });
  let identity = await register2();
  const deadline = Date.now() + 12e3;
  const signal = { aborted: false };
  let response;
  const routes = ["video_tab", "video_tab", "legacy"];
  for (const [index, route] of routes.entries()) {
    const signed = playbackRequest(payload, identity, route === "video_tab" ? vid : "", cookie);
    try {
      response = await requestJson(signed.url, { method: signed.method, headers: signed.headers, data: signed.body }, deadline, signal);
      steps.push(`${route}: ok`);
      break;
    } catch (error) {
      steps.push(`${route}: ${stepNote(error)}`);
      if (index === routes.length - 1 || error.code !== "EMPTY_RESPONSE" || deadline - Date.now() < 1e3) throw error;
      if (deadline - Date.now() >= 8e3) {
        try {
          identity = await register2();
        } catch {
        }
      }
      if (deadline - Date.now() < 500) throw error;
    }
  }
  if (Number(response.Code || response.code || 0) !== 0) throw new Error("App 接口暂未提供本集播放信息");
  const entry = (response.data?.video_model_data ?? response.data)?.[vid];
  const model = typeof entry?.video_model === "string" ? jsonBody(entry.video_model) : entry?.video_model;
  if (!model || typeof model !== "object" || Array.isArray(model)) throw new Error("App 接口未返回所选分集，已停止取址");
  const inline = !!model.video_list && typeof model.video_list === "object" && Object.keys(model.video_list).length > 0;
  const readFallback = async () => {
    const fallback = parseFallback(model.fallback_api);
    if (!fallback) throw new Error("App 接口未返回本集片源地址");
    const outer = await requestJson(fallback, { headers: { "User-Agent": VIDEO_UA } }, deadline, signal);
    if ([outer, outer?.video_info].some((value) => Number(value?.Code || value?.code || 0) !== 0)) throw new Error("App 接口暂未提供本集播放信息");
    return outer?.video_info?.data;
  };
  if (!inline) return parseAppPlayModel(await readFallback(), false, false, 0, bytevc2);
  try {
    return parseAppPlayModel(model, true, true, 0, bytevc2);
  } catch (error) {
    const duration = Number(model.video_duration);
    if (!error.incompleteEncryptionMetadata || typeof model.video_id !== "string" || !model.video_id.trim() || !(duration > 0) || !error.minimumPixels || !model.fallback_api) throw error;
    const info = await readFallback();
    const fallbackDuration = Number(info?.video_duration);
    if (info?.video_id !== model.video_id || !(fallbackDuration > 0) || Math.abs(fallbackDuration - duration) > 0.5) {
      throw new Error("备用片源编号或完整时长无法确认，已停止取址");
    }
    return parseAppPlayModel(info, false, true, error.minimumPixels, bytevc2);
  }
}
function parseAppPlayModel(info, inline, requireEncryptionMetadata, minimumPixels = 0, bytevc2 = false) {
  if (!info) throw new Error("App 接口未返回本集片源模型");
  const links = (item) => [item.main_url, item.backup_url, item.backup_url_1, ...Array.isArray(item.backup_url_list) ? item.backup_url_list : []].filter((value) => typeof value === "string" && value);
  const all = Object.values(info.video_list || {}).filter((item) => item && links(item).length).map((item) => {
    const codec = str(item.codec_type || item.video_meta?.codec_type).toLowerCase();
    const codecRank = ["h264", "avc", "avc1"].includes(codec) ? 0 : ["hevc", "h265", "hvc1", "hev1", "bytevc1"].includes(codec) ? 1 : 2;
    const quality = str(item.quality_desc || item.definition || item.height || item.vheight || item.video_meta?.definition);
    const meta = item.video_meta || {};
    const [width, height] = [[item.vwidth, item.vheight], [item.width, item.height], [meta.vwidth, meta.vheight], [meta.width, meta.height]].map((pair) => pair.map(Number)).find((pair) => pair.every((value) => Number.isFinite(value) && value > 0)) || [0, 0];
    const pixels = width && height ? Math.min(width, height) : Number(quality.match(/\d+/)?.[0] || 0);
    return { item, codec, codecRank, quality, pixels };
  });
  const sharp = (row) => !minimumPixels || row.pixels >= minimumPixels;
  let rows = all.filter((row) => row.codecRank < 2 && sharp(row)).sort((a, b) => b.pixels - a.pixels || a.codecRank - b.codecRank);
  if (!rows.length && bytevc2) rows = all.filter((row) => row.codec === "bytevc2" && sharp(row)).sort((a, b) => b.pixels - a.pixels);
  if (!rows.length) {
    if (all.some((row) => row.codec === "bytevc2")) throw Object.assign(new Error("本集仅提供 ByteVC2 编码"), { code: "BYTEVC2" });
    throw new Error("本集暂未提供兼容的 H.264/HEVC 片源");
  }
  let lastError, incompleteEncryptionMetadata = false;
  for (const selected of rows) {
    try {
      const spade = selected.item.spade_a || selected.item.encrypt_info?.spade_a;
      const encrypt = selected.item.encrypt_info?.encrypt ?? selected.item.encrypt;
      if (requireEncryptionMetadata && !spade && ![false, 0, "0", "false"].includes(encrypt)) {
        if (encrypt == null) incompleteEncryptionMetadata = true;
        throw new Error("本集片源缺少有效解密信息");
      }
      const key = spade ? deriveContentKey(spade) : null;
      const urls = [...new Set(links(selected.item).flatMap((value) => {
        try {
          const media = info.key_seed ? decryptSpadeUrl(value, Buffer.from(info.key_seed, "base64")) : cleanUrl(value);
          return [checkedUrl(media, ["qznovelvod.com", "fqnovelvod.com", "douyinvod.com"])];
        } catch (error) {
          lastError = error;
          return [];
        }
      }))];
      if (!urls.length) continue;
      return {
        url: urls[0],
        backups: urls.slice(1),
        contentKey: key ? key.toString("hex") : null,
        codec: selected.codec === "bytevc1" ? "hevc" : selected.codec,
        source: "app",
        quality: selected.quality,
        headers: { "User-Agent": inline ? PLAYBACK_UA : VIDEO_UA }
      };
    } catch (error) {
      lastError = error;
    }
  }
  if (incompleteEncryptionMetadata) throw Object.assign(new Error("本集片源地址或密钥无法解析"), { incompleteEncryptionMetadata, minimumPixels: rows[0].pixels });
  throw lastError || new Error("本集片源地址或密钥无法解析");
}

// src/sites/hongguo/web-copy.ts
var SITE = "https://hongguoduanju.com";
function webCopy(vid, headers2, request2 = globalThis.req) {
  if (!/^[0-9]{1,30}$/.test(vid)) return null;
  const reply = request2(`${SITE}/api/video/protected/fallback-play-info`, {
    method: "POST",
    headers: { ...headers2, Accept: "application/json", "Content-Type": "application/json" },
    body: JSON.stringify({ item_id: vid }),
    timeout: 8e3,
    racers: 2,
    hedge: 2e3
  });
  if (reply.code !== 200 || !reply.content) return null;
  let answer;
  try {
    answer = JSON.parse(reply.content);
  } catch {
    return null;
  }
  if (Number(answer?.base_resp?.StatusCode ?? 0) !== 0 || typeof answer?.main_url !== "string") return null;
  let url;
  try {
    url = new URL(answer.main_url);
  } catch {
    return null;
  }
  const expires = Number(answer.url_expire);
  if (url.protocol !== "https:" || expires > 0 && expires * 1e3 < Date.now() + 6e4) return null;
  return url.href;
}

// src/sites/hongguo/account.ts
var SITE2 = "https://hongguoduanju.com";
var agent = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36";
var common = [
  ["aid", "513755"],
  ["passport_jssdk_version", "3.4.10"],
  ["passport_jssdk_type", "normal"],
  ["account_sdk_source", "web"],
  ["is_from_ttaccountsdk", "1"],
  ["language", "zh"]
];
var next = ["next", SITE2 + "/"];
var settings = { lang: "en" };
var t = (key) => text(settings.lang, key);
function passport(path, items, options) {
  const query = [...common, ...items].map(([name, value]) => `${encodeURIComponent(name)}=${encodeURIComponent(value)}`).join("&");
  const headers2 = { "User-Agent": agent, Referer: SITE2 + "/", Origin: SITE2, Accept: "application/json, text/javascript" };
  if (options.cookie) headers2.Cookie = options.cookie;
  const reply = request(`${SITE2}${path}?${query}`, { headers: headers2, timeout: 15e3, jar: options.jar, cookies: !options.cookie });
  if (reply.code !== 200) throw new Error(t("Hongguo didn't answer. Try again."));
  try {
    return { body: JSON.parse(reply.content || ""), reply };
  } catch {
    throw new Error(t("Hongguo didn't answer. Try again."));
  }
}
function check(cookie) {
  if (!signedIn(cookie)) return { valid: false, name: "" };
  let body;
  try {
    body = passport("/passport/account/info/v2/", [], { cookie }).body;
  } catch {
    return { valid: true, name: "" };
  }
  const data = body?.data || {};
  if (body?.message === "success") return { valid: true, name: String(data.name || data.screen_name || "") };
  return { valid: !String(data.description || "").includes("会话过期"), name: "" };
}
var signedIn = (cookie) => typeof cookie === "string" && cookie.includes("sessionid=");
function start() {
  const jar = "hongguo-" + randomHex(16);
  const { body } = passport("/passport/web/get_qrcode/", [next], { jar });
  const data = body?.data || {};
  if (body?.message !== "success" || !data.qrcode_index_url || !data.token) throw new Error(t("Couldn't get a sign-in code. Try again."));
  return { code: String(data.qrcode_index_url), token: `${jar}|${data.token}` };
}
function poll(token) {
  const [jar, code] = String(token || "").split("|");
  if (!/^hongguo-[0-9a-f]{16}$/.test(jar) || !code) return { status: "expired" };
  const { body, reply } = passport("/passport/web/check_qrconnect/", [next, ["token", code]], { jar });
  const data = body?.data || {};
  if (body?.message !== "success") {
    if (data.description) throw new Error(String(data.description));
    return { status: "expired" };
  }
  switch (String(data.status ?? "")) {
    case "new":
    case "1":
      return { status: "waiting" };
    case "scanned":
    case "2":
      return { status: "scanned" };
    case "confirmed":
    case "3":
      break;
    default:
      return { status: "expired" };
  }
  let cookies = reply.cookies || {};
  const address = redirect(data.redirect_url);
  if (address) {
    try {
      cookies = request(address, { headers: { "User-Agent": agent, Referer: SITE2 + "/" }, timeout: 15e3, jar, cookiesFor: SITE2 + "/" }).cookies || cookies;
    } catch {
    }
  }
  if (!cookies.sessionid) throw new Error(t("Sign-in was approved, but Hongguo didn't return a login. Try again."));
  const cookie = Object.keys(cookies).sort().filter((name) => cookies[name]).map((name) => `${name}=${cookies[name]}`).join("; ");
  return { status: "signedIn", cookie, name: check(cookie).name };
}
function redirect(value) {
  if (typeof value !== "string" || !value) return null;
  let url;
  try {
    url = new URL(value, SITE2 + "/");
  } catch {
    return null;
  }
  return url.protocol === "https:" && (url.hostname === "hongguoduanju.com" || url.hostname.endsWith(".hongguoduanju.com")) ? url.href : null;
}
function account(op, input = {}) {
  if (op === "start") return start();
  if (op === "poll") return poll(input?.token);
  if (op === "check") return check(String(input?.cookie || ""));
  throw new Error("unknown account request");
}

// src/sites/hongguo.ts
import * as cheerio from "assets://js/lib/cheerio.min.js";
var SITE3 = "https://hongguoduanju.com";
var UA = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.2 Safari/605.1.15";
var headers = { "User-Agent": UA, Referer: SITE3 + "/" };
var categories = ["real-drama", "comic-drama", "ai-drama", "hot-drama", "hot-real-drama", "hot-comic-drama", "hot-ai-drama"];
var labels = {};
var fail = (key) => {
  throw new Error(labels[key] || "Hongguo is temporarily unavailable. Please try again.");
};
var validID = (value) => typeof value === "string" && /^[0-9]{1,30}$/.test(value);
function html(url) {
  const result = globalThis.req(url, { headers, timeout: 8e3, racers: 4, hedge: 2e3 });
  if (result.code !== 200 || !result.content || result.content.length > 8 * 1024 * 1024) fail("unavailable");
  return result.content;
}
function routerData(text2) {
  const match = /(?:window\.)?_ROUTER_DATA\s*=\s*(\{)/.exec(text2);
  if (!match) fail("changed");
  const start2 = match.index + match[0].length - 1;
  let depth = 0, quoted = false, escaped = false;
  for (let i = start2; i < text2.length; i++) {
    const c = text2[i];
    if (quoted) {
      if (escaped) escaped = false;
      else if (c === "\\") escaped = true;
      else if (c === '"') quoted = false;
    } else if (c === '"') quoted = true;
    else if (c === "{") depth++;
    else if (c === "}" && --depth === 0) return JSON.parse(text2.slice(start2, i + 1));
  }
  fail("changed");
}
function loader(text2, predicate) {
  const data = Object.values(routerData(text2).loaderData || {}).find((value) => value && predicate(value));
  if (!data || data.isSuccess === false) fail("changed");
  return data;
}
function decodeHTML(value) {
  return value.replace(/&(#x[0-9a-f]+|#\d+|quot|apos|amp|lt|gt);/gi, (entity, key) => {
    if (key[0] !== "#") return { quot: '"', apos: "'", amp: "&", lt: "<", gt: ">" }[key.toLowerCase()];
    const code = key[1].toLowerCase() === "x" ? parseInt(key.slice(2), 16) : Number(key.slice(1));
    return code > 0 && code <= 1114111 ? String.fromCodePoint(code) : entity;
  });
}
function cards(items) {
  const seen = /* @__PURE__ */ new Set();
  return items.map((row) => row.video_data || row).flatMap((row) => {
    const id = row.series_id || row.seriesId;
    const title = row.series_name || row.series_title || row.title;
    if (!validID(id) || typeof title !== "string" || !title.trim() || seen.has(id)) return [];
    seen.add(id);
    return [{
      vod_id: id,
      vod_name: title.trim(),
      vod_pic: row.series_cover || row.cover || "",
      vod_remarks: [row.rank ? `#${row.rank}` : "", row.episode_right_text || "", row.heatText || ""].filter(Boolean).join(" · "),
      vod_content: row.series_intro || row.description || ""
    }];
  });
}
function catalog(text2, category, page) {
  let data;
  if (category.startsWith("hot-")) {
    for (const match of text2.matchAll(/<script\b([^>]*)>/gi)) {
      if (!/data-fn-name=["']mergeLoaderData["']/.test(match[1])) continue;
      const attribute = match[1].match(/data-fn-args=(?:"([^"]*)"|'([^']*)')/);
      if (!attribute) continue;
      try {
        const args = JSON.parse(decodeHTML(attribute[1] ?? attribute[2]));
        if (args[0] !== `rank_${category}/page` || !Array.isArray(args[1])) continue;
        const content = args[1].find((item) => item.key === "content" && item.routerDataFnName === "p");
        if (content?.routerDataFnArgs?.[0]) data = JSON.parse(content.routerDataFnArgs[0]);
      } catch {
      }
    }
    if (!data || data.isSuccess === false || !Array.isArray(data.rankList)) {
      const $ = cheerio.load(text2), rankList = [];
      $("article").each((_, article) => {
        const node = $(article), heading = node.find('h2[id^="rank-title-"]').first();
        const id = String(heading.attr("id") || "").replace("rank-title-", "");
        if (!validID(id) || !node.find(`a[href*="series_id=${id}"]`).length) return;
        const rank = Number(node.find("span").first().text());
        if (!Number.isSafeInteger(rank) || rank < 1) return;
        rankList.push({ seriesId: id, title: heading.text().trim(), cover: node.find("img").first().attr("src") || "", rank });
      });
      if (!rankList.length) fail("changed");
      let totalPages = page;
      $('nav[aria-label="榜单分页"] a[href]').each((_, link) => {
        try {
          const url = new URL($(link).attr("href"), SITE3);
          if (url.origin === SITE3 && url.pathname === `/rank/${category}`) totalPages = Math.max(totalPages, Number(url.searchParams.get("page")) || 1);
        } catch {
        }
      });
      data = { rankList, pagination: { totalPages } };
    }
  } else {
    data = loader(text2, (item) => item.categoryRoute?.contentType === category);
    if (!Array.isArray(data.recommendList)) fail("changed");
  }
  return {
    list: cards(data.rankList || data.recommendList),
    page,
    pagecount: Math.max(1, Number(data.pagination?.totalPages) || 1)
  };
}
function detail(text2, id) {
  const data = loader(text2, (item) => item.seriesDetail?.series_id === id);
  const series = data.seriesDetail;
  const video = cards([series])[0];
  if (!video || !Array.isArray(series.vid_list) || !series.vid_list.length || !series.vid_list.every(validID)) fail("changed");
  video.vod_play_from = labels.name || "Hongguo";
  video.vod_play_url = series.vid_list.map((vid, index) => `${(labels.episode || "Episode %@").replace("%@", String(index + 1))}$${id}/${vid}`).join("#");
  return { list: [video] };
}
function search(text2, page) {
  let data;
  try {
    data = JSON.parse(text2);
  } catch {
    fail("changed");
  }
  if (!data || !Array.isArray(data.searchList)) fail("changed");
  const pagecount = data.hasMore === true ? Math.max(page + 1, Number(data.totalPages) || 0) : page;
  return { list: cards(data.searchList), page, pagecount };
}
function webMedia(text2, id, vid) {
  const data = loader(text2, (item) => item.seriesDetail?.series_id === id);
  if (String(data.vid) !== vid) return null;
  if (data.protectedPlayback === true || data.publicVideoSeo?.available === false) return null;
  for (const match of text2.matchAll(/<script\b[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)) {
    let root;
    try {
      root = JSON.parse(match[1]);
    } catch {
      continue;
    }
    const visit = (value) => {
      if (!value || typeof value !== "object") return null;
      if (value["@type"] === "VideoObject" && typeof value.contentUrl === "string") {
        const url2 = new URL(value.contentUrl, SITE3);
        const episodePath = `/player/${id}/${vid}`;
        const identity = String(value["@id"] || "") + String(value.about?.["@id"] || "");
        if (url2.protocol === "https:" && (identity.includes(episodePath) || url2.pathname.includes(`/${vid}/`))) return url2.href;
      }
      for (const child of Object.values(value)) {
        const url2 = visit(child);
        if (url2) return url2;
      }
      return null;
    };
    const url = visit(root);
    if (url) return url;
  }
  return null;
}
var account2 = "";
var decodes = [];
var hongguo_default = {
  init(ext) {
    const options = extension(ext);
    labels = hongguoLabels(language(options.lang));
    account2 = signedIn(options.cookie) ? options.cookie : "";
    decodes = Array.isArray(options.decodes) ? options.decodes.map(String) : [];
    settings.lang = language(options.lang);
  },
  account(op, input) {
    return account(op, input);
  },
  home() {
    return { class: categories.map((id, index) => ({ type_id: id, type_name: labels.categories?.[index] || id })) };
  },
  homeVod() {
    return this.category("real-drama", 1);
  },
  category(id, pg) {
    if (!categories.includes(id)) fail("changed");
    const page = Math.max(1, parseInt(pg, 10) || 1);
    return catalog(html(`${SITE3}/${id.startsWith("hot-") ? "rank" : "category"}/${id}${page > 1 ? `?page=${page}` : ""}`), id, page);
  },
  search(query, quick, pg) {
    const page = Math.max(1, parseInt(pg, 10) || 1);
    const params = `query=${encodeURIComponent(String(query).trim())}${page > 1 ? `&page=${page}` : ""}`;
    return search(html(`${SITE3}/api/search/result?${params}`), page);
  },
  detail(id) {
    if (!validID(id)) fail("changed");
    return detail(html(`${SITE3}/player/${id}`), id);
  },
  async play(flag, address) {
    const parts = String(address).split("/");
    if (parts.length !== 2 || !parts.every(validID)) fail("changed");
    const [id, vid] = parts;
    let appError;
    try {
      const result = await fetchAppPlayUrl(vid, { cookie: account2, bytevc2: decodes.includes("bvc2") });
      return {
        parse: 0,
        url: result.url,
        decryptKey: result.contentKey,
        backupUrls: result.backups,
        header: result.headers,
        retryHeader: { Referer: "https://novelquickapp.com/" }
      };
    } catch (error) {
      appError = error;
    }
    let web = "no full episode";
    try {
      const url = webMedia(html(`${SITE3}/player/${id}/${vid}`), id, vid);
      if (url) return { parse: 0, url, header: headers };
    } catch {
      web = "unavailable";
    }
    try {
      const url = webCopy(vid, headers);
      if (url) {
        console.log(`Hongguo plays the site's plain copy of ${vid}. App: ${[...appError?.steps || [], String(appError?.message || appError).slice(0, 120)].join(" > ")}.`);
        return { parse: 0, url, header: headers };
      }
      web += ", no plain copy";
    } catch {
      web += ", plain copy unavailable";
    }
    console.log(`Hongguo playback failed for ${vid}. App: ${[...appError?.steps || [], String(appError?.message || appError).slice(0, 120)].join(" > ")}. Web: ${web}.`);
    fail(appError?.code === "BYTEVC2" ? "bytevc2" : isRefusal(appError) ? "refused" : "playback");
  }
};
export {
  catalog,
  hongguo_default as default,
  detail,
  routerData,
  search,
  webMedia
};