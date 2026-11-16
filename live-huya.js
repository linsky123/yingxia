
// src/lib/host.ts
var request = (url, options = {}) => globalThis.req(url, options);
function hash(alg, text2) {
  const native = globalThis.nativeCrypto;
  if (typeof native === "function") return native({ op: "hash", alg, dataText: String(text2) }).hex || "";
  return globalThis.CryptoJS[alg.toUpperCase()](String(text2)).toString();
}
var md5 = (text2) => hash("md5", text2);
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
var mobileAgent = "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1";
var settings = { lang: "en", cookie: "" };
function configure(ext) {
  const options = extension(ext);
  settings.lang = language(options.lang);
  settings.cookie = String(options.cookie || "");
}
var t = (key, ...args) => text(settings.lang, key, ...args);
var recommended = () => ({ id: "", name: t("Recommended") });
function fetchText(url, options = {}) {
  const headers = { "User-Agent": desktopAgent, ...options.headers || {} };
  const reply = request(url, { timeout: 15e3, ...options, headers });
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
var room = (id, title, host, cover, online, area) => ({ id: String(id), title: plain(title), host: plain(host), cover: image(cover), online: count(online), area: plain(area) });
var page = (pg) => Math.max(1, parseInt(String(pg), 10) || 1);
var quality = (flag) => {
  const n = parseInt(String(flag ?? ""), 10);
  return Number.isFinite(n) ? n : null;
};

// src/live/huya.ts
function listing(game, pg) {
  const query = [["m", "LiveList"], ["do", "getLiveListByPage"], ["tagAll", 0], ["page", pg]];
  if (game) query.push(["gameId", game]);
  const data = fetchJSON(address("https://www.huya.com/cache.php", query)).data || {};
  if (data.totalPage != null && pg > Number(data.totalPage)) return [];
  return data.datas || [];
}
function areas() {
  const seen = /* @__PURE__ */ new Set();
  const games = listing("", 1).filter((r) => r.gid && r.gameFullName && !seen.has(String(r.gid)) && seen.add(String(r.gid))).map((r) => ({ id: String(r.gid), name: String(r.gameFullName) }));
  return [recommended(), ...games.slice(0, 14)];
}
var rooms = (game, pg) => listing(game, pg).filter((r) => r.profileRoom).map((r) => room(r.profileRoom, r.introduction || r.roomName, r.nick, r.screenshot, r.totalCount, r.gameFullName || ""));
function search(keyword, pg) {
  const reply = fetchJSON(address("https://search.cdn.huya.com/", [
    ["m", "Search"],
    ["do", "getSearchContent"],
    ["q", keyword],
    ["uid", 0],
    ["v", 4],
    ["typ", -5],
    ["livestate", 0],
    ["rows", 20],
    ["start", (pg - 1) * 20]
  ]));
  const docs = ((reply.response || {})["3"] || {}).docs || [];
  return docs.filter((r) => r.room_id).map((r) => room(r.room_id, r.game_introduction || r.game_roomName, r.game_nick, r.game_screenshot, r.game_total_count, r.gameName || t("Huya Live")));
}
function initialState(html) {
  const start = /window\.HNF_GLOBAL_INIT\s*=\s*/.exec(html);
  if (!start) return null;
  const from = start.index + start[0].length;
  const end = html.indexOf("</script>", from);
  if (end < 0) return null;
  const body = html.slice(from, end).replace(/function\s*\w*\s*\([^)]*\)\s*\{[^{}]*\}/g, '""').trim().replace(/;+$/, "");
  try {
    return JSON.parse(body);
  } catch {
    return null;
  }
}
function base64Text(value) {
  const table = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
  let bits = 0, length = 0, out = "";
  for (const char of value.replace(/[^A-Za-z0-9+/]/g, "")) {
    bits = bits << 6 | table.indexOf(char);
    length += 6;
    if (length >= 8) {
      length -= 8;
      out += String.fromCharCode(bits >> length & 255);
    }
  }
  return out;
}
function antiCode(token, streamName) {
  const fields = {};
  for (const pair of token.split("&")) {
    const at = pair.indexOf("=");
    if (at > 0 && !(pair.slice(0, at) in fields)) {
      try {
        fields[pair.slice(0, at)] = decodeURIComponent(pair.slice(at + 1));
      } catch {
        fields[pair.slice(0, at)] = pair.slice(at + 1);
      }
    }
  }
  const time = fields.wsTime, fm = fields.fm;
  if (!time || !fm) return null;
  const prefix = base64Text(fm).split("_")[0];
  if (!prefix) return null;
  const viewer = 14e11 + Math.floor(Math.random() * 1e11);
  const now = Date.now();
  const sequence = now + viewer, type = "tars_mobile", platform = "103";
  const hash2 = md5(`${sequence}|${type}|${platform}`);
  const secret = md5(`${prefix}_${viewer}_${streamName}_${hash2}_${time}`);
  const session = now % 1e10 * 1e3 % 4294967295;
  return [
    ["wsSecret", secret],
    ["wsTime", time],
    ["seqid", sequence],
    ["ctype", type],
    ["ver", "1"],
    ["fs", fields.fs || "bgct"],
    ["uid", viewer],
    ["uuid", session],
    ["t", platform],
    ["sv", "2110211124"]
  ].map(([k, v]) => `${k}=${v}`).join("&");
}
function serves(url) {
  try {
    const code = request(url, { headers: { "User-Agent": mobileAgent }, timeout: 2500 }).code;
    return code >= 200 && code < 300;
  } catch {
    return false;
  }
}
function lineAddress(line, rate) {
  const signed = line && line.sHlsUrl && line.sHlsAntiCode && line.sStreamName ? antiCode(String(line.sHlsAntiCode), String(line.sStreamName)) : null;
  if (!signed) return null;
  return `${String(line.sHlsUrl).replace(/^http:\/\//, "https://")}/${line.sStreamName}.${line.sHlsUrlSuffix || "m3u8"}?${signed}${rate > 0 ? `&ratio=${rate}` : ""}`;
}
function chooseLine(lines, rate, serves2, checked = false, budget = 6e3) {
  const addresses = (at) => lines.map((line) => lineAddress(line, at)).filter((url) => !!url);
  const started = Date.now();
  const served = (at) => addresses(at).find((url) => Date.now() - started < budget && serves2(url));
  const original = addresses(0)[0];
  if (!original) return null;
  if (rate > 0) {
    const url = served(rate);
    if (url) return { url, rate };
  }
  return { url: (checked ? served(0) : null) || original, rate: 0 };
}
var asked = null;
function stream(id, bitRate) {
  const state = initialState(fetchText(`https://m.huya.com/${id}`, { headers: { "User-Agent": mobileAgent } }).content);
  const info = state && state.roomInfo;
  if (!info) throw new Error(t("%@ could not be reached. Try again later.", t("Huya Live")));
  const live = info.tLiveInfo;
  if (info.eLiveStatus !== 2 || !live) throw new Error(t("This live room is not broadcasting right now."));
  const streams = ((live.tLiveStreamInfo || {}).vStreamInfo || {}).value || [];
  const rate = bitRate ?? 0, now = Date.now();
  const again = !!asked && asked.id === id && asked.rate === rate && now - asked.at < 2e4;
  asked = { id, rate, at: now };
  const chosen = chooseLine(streams, rate, serves, again);
  if (!chosen) throw new Error(t("This live room has no stream this device can play."));
  const rates = (((live.tLiveStreamInfo || {}).vBitRateInfo || {}).value || []).filter((r) => r.iBitRate != null && r.sDisplayName).map((r) => ({ id: Number(r.iBitRate), label: String(r.sDisplayName) }));
  return { url: chosen.url, header: { "User-Agent": mobileAgent }, title: String(live.sIntroduction || live.sRoomName || ""), qualities: rates, current: chosen.rate };
}
function hlsAddress(flv) {
  try {
    const url = new URL(flv);
    const suffix = ".flv.huya.com";
    const host = url.host.toLowerCase();
    if (!url.pathname.toLowerCase().endsWith(".flv") || !host.endsWith(suffix)) return null;
    return `https://${host.slice(0, -suffix.length)}.hls.huya.com${url.pathname.slice(0, -3)}m3u8${url.search}`;
  } catch {
    return null;
  }
}
var huya_default = {
  init: configure,
  home: () => ({ areas: areas() }),
  category: (area, pg) => ({ rooms: rooms(String(area || ""), page(pg)) }),
  search: (keyword, _quick, pg) => ({ rooms: search(String(keyword), page(pg)) }),
  // `flag` "relay": `id` is an FLV address from a playlist (directly Huya's, or a relay's redirect target).
  play(flag, id) {
    if (flag === "relay") {
      const url = hlsAddress(String(id));
      if (!url) throw new Error(t("This live room has no stream this device can play."));
      return { url };
    }
    return stream(String(id).replace(/[^\w-]/g, ""), quality(flag));
  }
};
export {
  antiCode,
  chooseLine,
  huya_default as default,
  hlsAddress,
  initialState,
  lineAddress
};