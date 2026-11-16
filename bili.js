
// src/lib/host.ts
function hash(alg, text2) {
  const native = globalThis.nativeCrypto;
  if (typeof native === "function") return native({ op: "hash", alg, dataText: String(text2) }).hex || "";
  return globalThis.CryptoJS[alg.toUpperCase()](String(text2)).toString();
}
var md5 = (text2) => hash("md5", text2);
function store(site) {
  return {
    get: (key) => globalThis.local.get("lite_" + site, key),
    set: (key, value) => globalThis.local.set("lite_" + site, key, value == null ? "" : String(value)),
    json(key) {
      try {
        return JSON.parse(this.get(key) || "null");
      } catch {
        return null;
      }
    },
    setJSON(key, value) {
      this.set(key, JSON.stringify(value));
    }
  };
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
function text(lang2, key, ...args) {
  const template = (lang2 === "en" ? void 0 : tables[lang2][key]) ?? key;
  let next = 0;
  return template.replace(/%@/g, () => String(args[next++] ?? ""));
}

// src/sites/bili.ts
var UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36";
var MIXIN = [46, 47, 18, 2, 53, 8, 23, 32, 15, 50, 10, 31, 58, 3, 45, 35, 27, 43, 5, 49, 33, 9, 42, 19, 29, 28, 14, 39, 12, 38, 41, 13, 37, 48, 7, 16, 24, 55, 40, 61, 26, 17, 0, 1, 60, 51, 30, 4, 22, 25, 54, 21, 56, 59, 6, 63, 57, 62, 11, 36, 20, 34, 44, 52];
var PGC = [["pgc_1", "番剧", 1], ["pgc_4", "国创", 4], ["pgc_2", "电影", 2], ["pgc_5", "电视剧", 5], ["pgc_3", "纪录片", 3], ["pgc_7", "综艺", 7]];
var PGC_FILTER = [
  { key: "order", name: "排序", value: [["播放数量", "2"], ["更新时间", "0"], ["最高评分", "4"], ["弹幕数量", "1"], ["追看人数", "3"], ["开播时间", "5"], ["上映时间", "6"]].map(([n, v]) => ({ n, v })) },
  { key: "season_status", name: "付费", value: [["全部", "-1"], ["免费", "1"], ["付费", "2,6"], ["大会员", "4,6"]].map(([n, v]) => ({ n, v })) }
];
var FEEDS = [["popular", "热门"], ["rank_0", "排行榜"], ["precious", "入站必刷"]];
var ZONES = [
  [1, "动画"],
  [3, "音乐"],
  [129, "舞蹈"],
  [4, "游戏"],
  [36, "知识"],
  [188, "科技"],
  [234, "运动"],
  [223, "汽车"],
  [160, "生活"],
  [211, "美食"],
  [217, "动物圈"],
  [119, "鬼畜"],
  [155, "时尚"],
  [5, "娱乐"],
  [181, "影视"]
];
var MINE = [["my_dynamic", "关注动态"], ["my_follow", "我的关注"], ["my_later", "稍后再看"], ["my_history", "历史记录"], ["my_bangumi", "我的追番"]];
var saved = store("bili");
var cookie = "";
var builtin = false;
var lang = "en";
var account = "";
var config = null;
var mixinKey = "";
var mixinAt = 0;
var mid = 0;
var cursors = {};
var headers = () => ({ "User-Agent": UA, Referer: "https://www.bilibili.com/", Cookie: cookie });
var api = (url, extra = {}) => JSON.parse(globalThis.req(url, { headers: { ...headers(), ...extra }, timeout: waitLimit() }).content || "{}");
var clean = (text2) => String(text2 || "").replace(/<[^>]+>/g, "").replace(/&quot;/g, '"').replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">");
var pic = (url) => {
  const u = String(url || "");
  return u.startsWith("//") ? "https:" + u : u.replace(/^http:/, "https:");
};
var two = (n) => String(n).padStart(2, "0");
var clock = (value) => {
  const s = typeof value === "string" && value.includes(":") ? value.split(":").reduce((sum, n) => sum * 60 + (Number(n) || 0), 0) : Number(value) || 0;
  if (!s) return "";
  const h = Math.floor(s / 3600), m = Math.floor(s % 3600 / 60);
  return (h ? `${h}:${two(m)}` : String(m)) + ":" + two(s % 60);
};
function ensureCookie() {
  if (/buvid3=/.test(cookie)) return;
  const known = builtin ? saved.get("buvid") : "";
  if (known) {
    cookie = [account, known].filter(Boolean).join("; ");
    return;
  }
  try {
    const data = JSON.parse(globalThis.req("https://api.bilibili.com/x/frontend/finger/spi", { headers: { "User-Agent": UA }, timeout: waitLimit() }).content).data || {};
    if (!data.b_3) return;
    const buvid = [`buvid3=${data.b_3}`, data.b_4 ? `buvid4=${encodeURIComponent(data.b_4)}` : ""].filter(Boolean).join("; ");
    cookie = [cookie, buvid].filter(Boolean).join("; ");
    if (builtin) saved.set("buvid", buvid);
    else saved.set("cookie", cookie);
  } catch {
  }
}
function dropBuvid() {
  cookie = cookie.replace(/;?\s*buvid[34]=[^;]*/g, "").replace(/^;\s*/, "");
  if (builtin) saved.set("buvid", "");
  else saved.set("cookie", cookie);
}
function wbi(params) {
  if (!mixinKey || Date.now() - mixinAt > 36e5) {
    const nav = api("https://api.bilibili.com/x/web-interface/nav").data || {};
    const name = (url) => String(url || "").split("/").pop().split(".")[0];
    const raw = name((nav.wbi_img || {}).img_url) + name((nav.wbi_img || {}).sub_url);
    mixinKey = MIXIN.map((i) => raw[i] || "").join("").slice(0, 32);
    mixinAt = Date.now();
  }
  const all = { ...params, wts: Math.floor(Date.now() / 1e3) };
  const query = Object.keys(all).sort().map((k) => `${encodeURIComponent(k)}=${encodeURIComponent(String(all[k]).replace(/[!'()*]/g, ""))}`).join("&");
  return query + "&w_rid=" + md5(query + mixinKey);
}
var BUDGET = 45e3;
var REQUEST_LIMIT = 2e4;
var RETRY_ROOM = 5e3;
var callStarted = 0;
var timeLeft = () => (callStarted || Date.now()) + BUDGET - Date.now();
var waitLimit = () => Math.max(1e3, Math.min(REQUEST_LIMIT, timeLeft()));
var LIMITED = /* @__PURE__ */ new Set([-412, -352, -799]);
function pause(ms) {
  const end = Date.now() + ms;
  while (Date.now() < end) {
  }
}
function retrying(request) {
  let reply = {};
  for (let attempt = 0; attempt < 3; attempt++) {
    if (attempt) {
      if (timeLeft() < 1200 * attempt + RETRY_ROOM) break;
      pause(1200 * attempt);
    }
    try {
      reply = request();
    } catch {
      reply = {};
    }
    const vouched = !!(reply.data && reply.data.v_voucher && !reply.data.result);
    const code = vouched ? -352 : Number(reply.code);
    if (code === 0 && (reply.data || reply.result)) return reply;
    if (code === -352) {
      dropBuvid();
      ensureCookie();
    }
    if (!LIMITED.has(code) && !isNaN(code) && reply.code !== void 0) return reply;
  }
  return reply;
}
var searchApi = (params) => retrying(() => api("https://api.bilibili.com/x/web-interface/wbi/search/type?" + wbi(params)));
var ugcItem = (v) => ({
  vod_id: v.bvid,
  vod_name: clean(v.title),
  vod_pic: pic(v.pic || v.cover),
  vod_remarks: [clock(v.duration), clean((v.owner || {}).name || v.author || "")].filter(Boolean).join(" · ")
});
function searchVideos(keyword, page, extra = {}) {
  ensureCookie();
  const data = searchApi({ search_type: "video", keyword, page, ...extra }).data || {};
  return {
    list: (data.result || []).filter((v) => v.bvid).map((v) => builtin ? ugcItem(v) : { vod_id: v.bvid, vod_name: clean(v.title), vod_pic: pic(v.pic), vod_remarks: String(v.duration || "") }),
    pagecount: Number(data.numPages) || 1
  };
}
var count = (value) => {
  const n = Number(value) || 0;
  const short = (d, unit) => (n / d).toFixed(1).replace(/\.0$/, "") + unit;
  return n >= 1e8 ? short(1e8, "亿") : n >= 1e4 ? short(1e4, "万") : String(n);
};
var upItem = (id, name, face, remarks) => ({ vod_id: "up_" + id, vod_name: clean(name), vod_pic: pic(face), vod_remarks: remarks, vod_tag: "folder" });
var creditLink = (id, name) => `[a=cr:${JSON.stringify({ id, name })}/]${name}[/a]`;
var squash = (text2) => String(text2 || "").toLowerCase().replace(/\s+/g, "");
function searchUsers(keyword) {
  ensureCookie();
  const wanted = squash(keyword);
  if (!wanted) return [];
  const data = searchApi({ search_type: "bili_user", keyword, page: 1 }).data || {};
  return (data.result || []).filter((u) => u.mid && u.uname).filter((u) => {
    const name = squash(clean(u.uname));
    return name.includes(wanted) || wanted.includes(name);
  }).slice(0, 3).map((u) => upItem(u.mid, u.uname, u.upic, [`${count(u.fans)}粉丝`, `${count(u.videos)}个视频`].join(" · ")));
}
function searchSeasons(keyword) {
  ensureCookie();
  const list = [];
  for (const type of ["media_bangumi", "media_ft"]) {
    const data = searchApi({ search_type: type, keyword, page: 1, web_location: 1430654 }).data || {};
    for (const s of data.result || []) {
      if (!s.season_id) continue;
      const score = s.media_score && s.media_score.score ? ` ${s.media_score.score}分` : "";
      list.push({ vod_id: "season_" + s.season_id, vod_name: clean(s.title), vod_pic: pic(s.cover), vod_remarks: String(s.index_show || "") + score });
    }
  }
  return list;
}
function feed(tid, page) {
  ensureCookie();
  if (tid === "rcmd") {
    const params = { fresh_type: 4, ps: 20, fresh_idx: page, fresh_idx_1h: page, brush: page, feed_version: "V8", homepage_ver: 1, y_num: 4, web_location: 1430650 };
    const data = retrying(() => api("https://api.bilibili.com/x/web-interface/wbi/index/top/feed/rcmd?" + wbi(params))).data || {};
    return { list: (data.item || []).filter((v) => v.bvid && (!v.goto || v.goto === "av")).map(ugcItem), more: true };
  }
  if (tid === "popular") {
    const data = retrying(() => api(`https://api.bilibili.com/x/web-interface/popular?ps=20&pn=${page}`)).data || {};
    return { list: (data.list || []).filter((v) => v.bvid).map(ugcItem), more: !data.no_more };
  }
  if (tid === "precious") {
    if (page > 1) return { list: [], more: false };
    const data = retrying(() => api("https://api.bilibili.com/x/web-interface/popular/precious?page_size=100&page=1")).data || {};
    return { list: (data.list || []).filter((v) => v.bvid).map(ugcItem), more: false };
  }
  if (tid.startsWith("rank_")) {
    if (page > 1) return { list: [], more: false };
    const data = retrying(() => api(
      "https://api.bilibili.com/x/web-interface/ranking/v2?" + wbi({ rid: tid.slice(5), type: "all", web_location: 333.934 }),
      { Referer: "https://www.bilibili.com/v/popular/rank/all" }
    )).data || {};
    return { list: (data.list || []).filter((v) => v.bvid).map(ugcItem), more: false };
  }
  return null;
}
var signedIn = () => builtin && /SESSDATA=/.test(account);
function me() {
  if (!mid) {
    const nav = api("https://api.bilibili.com/x/web-interface/nav").data || {};
    mid = nav.isLogin ? Number(nav.mid) : -1;
  }
  return mid > 0 ? mid : 0;
}
var seasonItem = (s) => ({ vod_id: "season_" + s.season_id, vod_name: clean(s.title), vod_pic: pic(s.cover), vod_remarks: String(s.new_ep && s.new_ep.index_show || s.index_show || "") });
function mine(tid, page) {
  if (!signedIn()) return tid.startsWith("my_") || tid.startsWith("fav_") ? { list: [], more: false } : null;
  const mark = (start) => {
    (cursors[tid] = cursors[tid] || {})[page + 1] = start;
  };
  const startOf = () => page > 1 ? (cursors[tid] || {})[page] : null;
  if (tid === "my_dynamic") {
    const offset = startOf();
    if (page > 1 && offset == null) return { list: [], more: false };
    const data = retrying(() => api(`https://api.bilibili.com/x/polymer/web-dynamic/v1/feed/all?type=video&page=${page}&offset=${offset || ""}&timezone_offset=-480`)).data || {};
    mark(data.offset);
    const list = (data.items || []).map((item) => {
      const modules = item.modules || {};
      const video = ((modules.module_dynamic || {}).major || {}).archive;
      return video && video.bvid ? {
        vod_id: video.bvid,
        vod_name: clean(video.title),
        vod_pic: pic(video.cover),
        vod_remarks: [video.duration_text, clean((modules.module_author || {}).name)].filter(Boolean).join(" · ")
      } : null;
    }).filter(Boolean);
    return { list, more: !!data.has_more };
  }
  if (tid === "my_follow") {
    const id = me();
    if (!id) return { list: [], more: false };
    const data = retrying(() => api(`https://api.bilibili.com/x/relation/followings?vmid=${id}&pn=${page}&ps=30&order=desc&order_type=attention`)).data || {};
    const list = (data.list || []).filter((u) => u.mid).map((u) => upItem(u.mid, u.uname, u.face, clean(u.sign).replace(/\s+/g, " ").trim().slice(0, 40)));
    return { list, more: page * 30 < Number(data.total || 0) };
  }
  if (tid === "my_later") {
    if (page > 1) return { list: [], more: false };
    const data = retrying(() => api("https://api.bilibili.com/x/v2/history/toview")).data || {};
    return { list: (data.list || []).filter((v) => v.bvid).map(ugcItem), more: false };
  }
  if (tid === "my_history") {
    const start = startOf();
    if (page > 1 && !start) return { list: [], more: false };
    const query = start ? `&max=${start.max}&view_at=${start.view_at}&business=${start.business || ""}` : "";
    const data = retrying(() => api("https://api.bilibili.com/x/web-interface/history/cursor?ps=20" + query)).data || {};
    const cursor = data.cursor || {};
    mark(cursor.max ? cursor : null);
    const list = (data.list || []).map((item) => {
      const history = item.history || {};
      if (history.business === "pgc" && item.kid) return { vod_id: "season_" + item.kid, vod_name: clean(item.title), vod_pic: pic(item.cover), vod_remarks: clean(item.show_title || item.new_desc || "") };
      if (history.business === "archive" && history.bvid) return { vod_id: history.bvid, vod_name: clean(item.title), vod_pic: pic(item.cover), vod_remarks: clean(item.author_name || "") };
      return null;
    }).filter(Boolean);
    return { list, more: (data.list || []).length > 0 && !!cursor.max };
  }
  if (tid === "my_bangumi") {
    const id = me();
    if (!id) return { list: [], more: false };
    const data = retrying(() => api(`https://api.bilibili.com/x/space/bangumi/follow/list?type=1&follow_status=0&pn=${page}&ps=20&vmid=${id}`)).data || {};
    return { list: (data.list || []).map(seasonItem), more: page * 20 < Number(data.total || 0) };
  }
  if (tid.startsWith("fav_")) {
    const data = retrying(() => api(`https://api.bilibili.com/x/v3/fav/resource/list?media_id=${tid.slice(4)}&pn=${page}&ps=20&platform=web`)).data || {};
    const list = (data.medias || []).filter((v) => v.bvid && (v.type === 2 || v.type == null)).map((v) => ({ ...ugcItem({ ...v, pic: v.cover, owner: v.upper }) }));
    return { list, more: !!data.has_more };
  }
  return null;
}
var SPACE = /^up_(\d+)(?:_(click|stow|lists|season|series)(?:_(\d+))?)?$/;
var archiveItem = (v) => ({
  vod_id: v.bvid,
  vod_name: clean(v.title),
  vod_pic: pic(v.pic || v.cover),
  vod_remarks: [clock(v.length || v.duration), (v.play ?? (v.stat || {}).view) != null ? `${count(v.play ?? v.stat.view)}播放` : ""].filter(Boolean).join(" · ")
});
var SPACE_FIELDS = { platform: "web", web_location: 1550101, dm_img_list: "[]", dm_img_inter: '{"ds":[],"wh":[0,0,0],"of":[0,0,0]}' };
function space(tid, page) {
  const match = SPACE.exec(String(tid));
  if (!match) return null;
  ensureCookie();
  const [, owner, kind, id] = match;
  const referer = { Referer: `https://space.bilibili.com/${owner}/` };
  if (kind === "lists") {
    const data2 = retrying(() => api(`https://api.bilibili.com/x/polymer/web-space/seasons_series_list?mid=${owner}&page_num=${page}&page_size=20`, referer)).data || {};
    const lists = data2.items_lists || {};
    const list = [
      ...(lists.seasons_list || []).map((s) => s.meta || {}).filter((m) => m.season_id).map((m) => upItem(`${owner}_season_${m.season_id}`, m.name || m.title, m.cover, `${m.total || 0}个视频`)),
      ...(lists.series_list || []).map((s) => s.meta || {}).filter((m) => m.series_id).map((m) => upItem(`${owner}_series_${m.series_id}`, "系列·" + clean(m.name), m.cover, `${m.total || 0}个视频`))
    ];
    return { list, more: page * 20 < Number((lists.page || {}).total || 0) };
  }
  if (kind === "season") {
    const data2 = retrying(() => api(`https://api.bilibili.com/x/polymer/web-space/seasons_archives_list?mid=${owner}&season_id=${id}&page_num=${page}&page_size=30&sort_reverse=false`, referer)).data || {};
    return { list: (data2.archives || []).filter((v) => v.bvid).map(archiveItem), more: page * 30 < Number((data2.page || {}).total || 0) };
  }
  if (kind === "series") {
    const data2 = retrying(() => api(`https://api.bilibili.com/x/series/archives?mid=${owner}&series_id=${id}&pn=${page}&ps=30&sort=desc`, referer)).data || {};
    return { list: (data2.archives || []).filter((v) => v.bvid).map(archiveItem), more: page * 30 < Number((data2.page || {}).total || 0) };
  }
  const order = kind || "pubdate";
  const reply = retrying(() => api("https://api.bilibili.com/x/space/wbi/arc/search?" + wbi({
    ...SPACE_FIELDS,
    mid: owner,
    ps: 30,
    pn: page,
    order,
    dm_img_str: noise(16, 64),
    dm_cover_img_str: noise(32, 128)
  }), referer));
  const data = reply.data || {};
  if (Number(reply.code) === 0 && data.list) {
    return { list: (data.list.vlist || []).filter((v) => v.bvid).map(archiveItem), more: page * 30 < Number((data.page || {}).count || 0) };
  }
  if (order !== "pubdate") return { list: [], more: false };
  const plain = retrying(() => api(`https://api.bilibili.com/x/series/recArchivesByKeywords?mid=${owner}&keywords=&ps=30&pn=${page}`, referer)).data || {};
  return { list: (plain.archives || []).filter((v) => v.bvid).map(archiveItem), more: page * 30 < Number((plain.page || {}).total || 0) };
}
function hotComments(aid) {
  try {
    const data = api(`https://api.bilibili.com/x/v2/reply/main?type=1&oid=${aid}&mode=3&ps=12`).data || {};
    const lines = (data.replies || []).slice(0, 12).map((r) => `${clean((r.member || {}).uname)}：${clean((r.content || {}).message).replace(/\s+/g, " ")}${r.like ? `  👍${r.like}` : ""}`);
    return lines.length ? "\n\n—— 热门评论 ——\n" + lines.join("\n") : "";
  } catch {
    return "";
  }
}
var QUALITY = { 127: "8K", 126: "Dolby Vision", 125: "HDR", 120: "4K", 116: "1080P60", 112: "1080P+", 80: "1080P", 74: "720P60", 64: "720P", 32: "480P", 16: "360P" };
var MEDIA_UA = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.2 Safari/605.1.15";
var MEDIA_HEADERS = { Referer: "https://www.bilibili.com/", "User-Agent": MEDIA_UA };
function noise(min, max) {
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let out = "";
  const length = min + Math.floor(Math.random() * (max - min + 1));
  for (let i = 0; i < length; i++) out += letters[Math.floor(Math.random() * letters.length)];
  const bytes = Array.from(out, (c) => c.charCodeAt(0));
  const table = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
  let b64 = "";
  for (let i = 0; i < bytes.length; i += 3) {
    const n = bytes[i] << 16 | (bytes[i + 1] || 0) << 8 | (bytes[i + 2] || 0);
    b64 += table[n >> 18 & 63] + table[n >> 12 & 63] + (i + 1 < bytes.length ? table[n >> 6 & 63] : "=") + (i + 2 < bytes.length ? table[n & 63] : "=");
  }
  return b64.slice(0, -2);
}
function playInfo(aid, cid, ep) {
  ensureCookie();
  let reply;
  if (ep) {
    const params = { cid, ep_id: ep, fnval: 4048, fnver: 0, fourk: 1, qn: 127 };
    reply = retrying(() => api("https://api.bilibili.com/pgc/player/web/v2/playurl?" + Object.keys(params).sort().map((k) => `${k}=${params[k]}`).join("&")));
  } else {
    const params = {
      avid: aid,
      cid,
      qn: signedIn() ? 127 : 80,
      fnval: 4048,
      fnver: 0,
      fourk: 1,
      web_location: 1315873,
      gaia_source: "pre-load",
      isGaiaAvoided: "true",
      dm_img_list: "[]",
      dm_img_str: noise(16, 64),
      dm_cover_img_str: noise(32, 128),
      dm_img_inter: '{"ds":[],"wh":[0,0,0],"of":[0,0,0]}'
    };
    if (!signedIn()) params.try_look = 1;
    reply = retrying(() => api("https://api.bilibili.com/x/player/wbi/playurl?" + wbi(params)));
  }
  if (Number(reply.code) !== 0) throw new Error(String(reply.message || "") || text(lang, "Bilibili refused the request. Try again later."));
  return (ep ? (reply.result || {}).video_info : reply.data) || {};
}
function peer(address) {
  const match = /^https?:\/\/([^/:]+)(?::(\d+))?/.exec(address);
  if (!match) return true;
  const host = match[1], port = match[2];
  return /mcdn\.bilivideo|szbdyd\.com|mountaintoys/.test(host) || !!port && port !== "443";
}
function representation(item, labels) {
  const quality = Number(item.id) || 0;
  const urls = [item.base_url || item.baseUrl, ...item.backup_url || item.backupUrl || []].filter((u) => typeof u === "string" && /^https?:/.test(u));
  return {
    id: quality,
    label: labels[quality] || QUALITY[quality] || (item.height ? `${item.height}P` : String(quality)),
    codecs: String(item.codecs || ""),
    width: Number(item.width) || 0,
    height: Number(item.height) || 0,
    bandwidth: Number(item.bandwidth) || 0,
    frameRate: String(item.frame_rate || item.frameRate || ""),
    range: quality === 125 ? "PQ" : "SDR",
    urls: [...urls.filter((u) => !peer(u)), ...urls.filter(peer)],
    initialization: String((item.segment_base || item.SegmentBase || {}).initialization || (item.SegmentBase || {}).Initialization || ""),
    indexRange: String((item.segment_base || {}).index_range || (item.SegmentBase || {}).indexRange || "")
  };
}
function playback(aid, cid, ep) {
  const danmaku = `https://api.bilibili.com/x/v2/dm/web/seg.so?type=1&oid=${cid}`;
  let info = null;
  try {
    info = playInfo(aid, cid, ep);
  } catch (error) {
    if (ep) throw error;
  }
  if (info && Number(info.is_preview) === 1) throw new Error(text(lang, "This episode needs a Bilibili premium membership. Only a short preview is available."));
  const duration = info && info.timelength ? Number(info.timelength) / 1e3 : info && info.dash && Number(info.dash.duration) || 0;
  const skips = (info && info.clip_info_list || []).map((clip) => ({
    start: Number(clip.start) || 0,
    end: Number(clip.end) || 0,
    type: clip.clipType === "CLIP_TYPE_OP" ? "intro" : clip.clipType === "CLIP_TYPE_ED" ? "outro" : ""
  })).filter((clip) => clip.type && clip.end > clip.start);
  if (info && info.dash) {
    const labels = {};
    for (const format of info.support_formats || []) labels[Number(format.quality)] = String(format.new_description || format.display_desc || "");
    const video = (info.dash.video || []).filter((v) => Number(v.id) !== 126).map((v) => representation(v, labels)).filter((v) => v.urls.length && v.initialization && v.indexRange);
    const audio = (info.dash.audio || []).map((a) => representation(a, {})).filter((a) => a.urls.length && a.initialization && a.indexRange);
    if (video.length) {
      return { parse: 0, url: video[0].urls[0], header: MEDIA_HEADERS, dash: { video, audio, duration }, danmaku, duration, skips };
    }
  }
  const files = info && info.durl || [];
  if (ep && files.length === 1 && files[0].url) return { parse: 0, url: files[0].url, header: MEDIA_HEADERS, danmaku, duration, skips };
  if (ep) throw new Error(text(lang, "Bilibili's video servers could not be reached. Try again later."));
  const reply = api(`https://api.bilibili.com/x/player/playurl?avid=${aid}&cid=${cid}&qn=16&fnval=0&fnver=0`);
  if (Number(reply.code) !== 0) throw new Error(String(reply.message || "") || text(lang, "Bilibili refused the request. Try again later."));
  const media = reply.data || {};
  const single = media.durl || [];
  if (single.length !== 1 || !single[0].url || !String(media.format || "").toLowerCase().includes("mp4")) {
    throw new Error(text(lang, "Bilibili's video servers could not be reached. Try again later."));
  }
  return { parse: 0, url: single[0].url, header: MEDIA_HEADERS, danmaku, duration: media.timelength ? Number(media.timelength) / 1e3 : 0 };
}
var play = (aid, cid, ep = "") => `${aid}_${cid}${ep ? "_" + ep : ""}`;
var part = (text2) => String(text2 || "").replace(/[#$]/g, " ").trim();
var spider = {
  init(ext) {
    const options = extension(ext);
    lang = language(options.lang);
    builtin = options.builtin === true;
    account = builtin ? String(options.cookie || "") : "";
    cookie = builtin ? account : String(options.cookie || saved.get("cookie") || "");
    config = null;
    if (options.json) {
      try {
        config = JSON.parse(globalThis.req(options.json, { headers: { "User-Agent": UA } }).content);
      } catch {
        config = { class: [] };
      }
    }
  },
  home() {
    if (config) {
      const classes2 = (config.class || []).filter((c) => c.type_id !== "peizhi");
      return { class: classes2, filters: config.filters || {} };
    }
    const filters = {};
    for (const [id] of PGC) filters[id] = PGC_FILTER;
    const classes = PGC.map(([type_id, type_name]) => ({ type_id, type_name }));
    if (!builtin) return { class: classes, filters };
    const feeds = FEEDS.map(([type_id, type_name]) => ({ type_id, type_name }));
    let own = [];
    if (signedIn() && me()) {
      const folders = (api(`https://api.bilibili.com/x/v3/fav/folder/created/list-all?up_mid=${me()}`).data || {}).list || [];
      own = [...MINE.map(([type_id, type_name]) => ({ type_id, type_name })), ...folders.map((f) => ({ type_id: "fav_" + f.id, type_name: "收藏·" + clean(f.title) }))];
    }
    return {
      class: [feeds[0], ...own, ...feeds.slice(1), ...classes, ...ZONES.map(([rid, type_name]) => ({ type_id: "rank_" + rid, type_name }))],
      filters
    };
  },
  homeVod() {
    if (config) return { list: [] };
    if (builtin) return { list: feed("rcmd", 1).list };
    return this.category("pgc_1", "1", false, {});
  },
  category(tid, pg, filter, extend = {}) {
    const page = parseInt(pg, 10) || 1;
    const pgc = PGC.find(([id]) => id === tid);
    if (pgc) {
      const data = api(`https://api.bilibili.com/pgc/season/index/result?type=1&season_type=${pgc[2]}&order=${extend.order || 2}&season_status=${extend.season_status || -1}&page=${page}&pagesize=20`).data || {};
      const list = (data.list || []).map((s) => ({ vod_id: "season_" + s.season_id, vod_name: String(s.title || ""), vod_pic: pic(s.cover), vod_remarks: String(s.index_show || "") }));
      return { page, pagecount: data.has_next ? page + 1 : page, limit: 20, total: Number(data.total) || list.length, list };
    }
    const fed = (builtin ? feed(tid, page) || mine(tid, page) : null) || space(tid, page);
    if (fed) {
      const more = fed.more && fed.list.length > 0;
      return { page, pagecount: more ? page + 1 : page, limit: fed.list.length, total: (page - 1) * 20 + fed.list.length + (more ? 1 : 0), list: fed.list };
    }
    const found = searchVideos(tid, page, extend.duration ? { duration: extend.duration } : {});
    return { page, pagecount: found.pagecount, limit: found.list.length, total: found.list.length * found.pagecount, list: found.list };
  },
  detail(id) {
    if (String(id).startsWith("season_")) {
      const result = api("https://api.bilibili.com/pgc/view/web/season?season_id=" + id.slice(7)).result || {};
      let source = result.episodes || [];
      if (!source.length) source = (result.section || []).flatMap((s) => s.episodes || []);
      const episodes = source.map((e) => `${part([e.title, e.long_title].filter(Boolean).join(" ")) || e.id}$${play(e.aid, e.cid, e.id)}`);
      return { list: [{
        vod_id: id,
        vod_name: String(result.title || ""),
        vod_pic: pic(result.cover),
        type_name: (result.styles || []).join(","),
        vod_year: String(result.publish && result.publish.pub_time || "").slice(0, 4),
        vod_area: (result.areas || []).map((a) => a.name).join(","),
        vod_remarks: String(result.new_ep && result.new_ep.desc || ""),
        vod_actor: String(result.actors || "").replace(/\n/g, " "),
        vod_content: String(result.evaluate || ""),
        vod_play_from: "B站",
        vod_play_url: episodes.join("#")
      }] };
    }
    ensureCookie();
    const data = api("https://api.bilibili.com/x/web-interface/view?bvid=" + encodeURIComponent(id)).data || {};
    const groups = [["B站", (data.pages || []).map((p) => `${part(p.part) || p.page}$${play(data.aid, p.cid)}`)]];
    const season = builtin ? data.ugc_season : null;
    if (season && season.sections) {
      const items = season.sections.flatMap((s) => s.episodes || []).filter((e) => e.aid && e.cid).slice(0, 500);
      if (items.length > 1) groups.push([part(season.title) || "合集", items.map((e) => `${part(e.title) || e.aid}$${play(e.aid, e.cid)}`)]);
    }
    const stat = data.stat || {};
    return { list: [{
      vod_id: id,
      vod_name: String(data.title || ""),
      vod_pic: pic(data.pic),
      type_name: String(data.tname || ""),
      vod_year: data.pubdate ? String(new Date(data.pubdate * 1e3).getFullYear()) : "",
      vod_remarks: builtin ? [clock(data.duration), stat.view ? `${stat.view} 播放` : ""].filter(Boolean).join(" · ") : `${(data.pages || []).length}P`,
      // The UP主, linked to their space (`up_<mid>`).
      vod_director: data.owner && data.owner.mid ? creditLink("up_" + data.owner.mid, String(data.owner.name || data.owner.mid)) : "",
      vod_content: String(data.desc || "") + (builtin && data.aid ? hotComments(data.aid) : ""),
      vod_play_from: groups.map((g) => g[0]).join("$$$"),
      vod_play_url: groups.map((g) => g[1].join("#")).join("$$$")
    }] };
  },
  search(wd, quick, pg) {
    if (config) return { list: searchVideos(wd, 1).list };
    if (!builtin) return { list: searchSeasons(wd) };
    const page = parseInt(pg, 10) || 1;
    const videos = searchVideos(wd, page);
    const first = page === 1 ? [...searchUsers(wd), ...searchSeasons(wd)] : [];
    return { list: [...first, ...videos.list], page, pagecount: videos.pagecount };
  },
  play(flag, id) {
    const [aid, cid, ep] = String(id).split("_");
    if (!/^\d+$/.test(aid || "") || !/^\d+$/.test(cid || "")) throw new Error(text(lang, "Bilibili refused the request. Try again later."));
    return playback(aid, cid, /^\d+$/.test(ep || "") ? ep : "");
  }
};
for (const [name, method] of Object.entries(spider)) {
  spider[name] = function(...args) {
    callStarted = Date.now();
    return method.apply(this, args);
  };
}
var bili_default = spider;
export {
  bili_default as default
};