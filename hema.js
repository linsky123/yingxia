
// src/lib/host.ts
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

// src/lib/labels.ts
function dramaLabels(lang, nameKey) {
  const name = text(lang, nameKey);
  return {
    name,
    // Each `%@` is kept for the source to fill in (text() would otherwise blank it).
    episode: text(lang, "Episode %@", "%@"),
    episodes: text(lang, "%@ Episodes", "%@"),
    // Two `%@` (free, total) filled in order by the source.
    free: text(lang, "%@ of %@ episodes free", "%@", "%@"),
    all: text(lang, "All"),
    unavailable: text(lang, "%@ could not be reached. Try again later.", name),
    changed: text(lang, "%@ returned incomplete data. Please refresh and try again.", name),
    locked: text(lang, "This episode isn't free on %@.", name)
  };
}

// src/sites/hema.ts
var ORIGIN = "https://www.kuaikaw.cn";
var ID = /^\d{1,30}$/;
var GENRE = /^\d{1,30}(?:-\d{1,30}){0,15}$/;
var headers = { "User-Agent": "Mozilla/5.0", pname: "www.kuaikaw.cn", Origin: ORIGIN, Referer: `${ORIGIN}/` };
var labels = {};
var genreCache = null;
var fail = (key) => {
  throw new Error(labels[key] || "Hema is temporarily unavailable. Please try again.");
};
var text2 = (value) => String(value ?? "").replace(/<[^>]*>/g, "").trim();
var https = (value) => {
  try {
    const url = new URL(value);
    return url.protocol === "https:" && !url.username && !url.password ? url.href : "";
  } catch {
    return "";
  }
};
function fetchText(path, body) {
  const reply = globalThis.req(ORIGIN + path, body ? { method: "POST", headers: { ...headers, Accept: "application/json", "Content-Type": "application/json" }, body: JSON.stringify(body), timeout: 1e4, redirect: false } : { headers: { ...headers, Accept: "text/html" }, timeout: 1e4, redirect: false });
  if (reply.code !== 200 || !reply.content || reply.content.length > 8 * 1024 * 1024) fail("unavailable");
  return reply.content;
}
function pageData(html) {
  const match = html.match(/<script\b[^>]*\bid=["']__NEXT_DATA__["'][^>]*>([\s\S]*?)<\/script>/i);
  let data;
  try {
    data = JSON.parse(match?.[1]).props.pageProps;
  } catch {
    fail("changed");
  }
  if (!data || typeof data !== "object") fail("changed");
  return data;
}
var cover = (value) => https(String(value ?? "").replace(/[?&]?imageView2\/[^&]*/, ""));
function card(book) {
  return {
    vod_id: String(book.bookId),
    vod_name: text2(book.bookName),
    vod_pic: cover(book.coverWap),
    vod_remarks: Number(book.totalChapterNum) > 0 ? (labels.episodes || "%@ Episodes").replace("%@", String(Number(book.totalChapterNum))) : ""
  };
}
function cards(books) {
  const seen = /* @__PURE__ */ new Set();
  return (Array.isArray(books) ? books : []).filter((book) => book && ID.test(String(book.bookId ?? "")) && text2(book.bookName)).map(card).filter((item) => !seen.has(item.vod_id) && seen.add(item.vod_id));
}
function genres(data) {
  const seen = /* @__PURE__ */ new Set(["0"]);
  const items = (Array.isArray(data.typeThreeList) ? data.typeThreeList : []).filter((item) => Array.isArray(item?.typeThreeIds) && item.typeThreeIds.length > 0 && item.typeThreeIds.length <= 16 && item.typeThreeIds.every((id) => ID.test(String(id))) && text2(item.name)).map((item) => ({ type_id: item.typeThreeIds.join("-"), type_name: text2(item.name) })).filter((item) => !seen.has(item.type_id) && seen.add(item.type_id));
  return [{ type_id: "0", type_name: labels.all || "All" }, ...items];
}
function loadGenres() {
  if (!genreCache || genreCache.expires < Date.now()) genreCache = { items: genres(pageData(fetchText("/browse"))), expires: Date.now() + 3e5 };
  return genreCache.items;
}
function browse(html, genre, page) {
  const data = pageData(html);
  if (!Array.isArray(data.bookList) || Number(data.page) !== page || String(data.typeThreeId || "0") !== genre) fail("changed");
  const list = cards(data.bookList);
  const more = list.length > 0 && new RegExp(`<a\\b[^>]*\\shref=["']/browse/${genre}/${page + 1}["']`).test(html);
  return { list, page, pagecount: more ? page + 1 : page };
}
function detail(data, id) {
  const book = data.bookInfoVo;
  if (String(book?.bookId) !== id || !Array.isArray(data.chapterList)) fail("changed");
  const chapters = data.chapterList.filter((chapter) => ID.test(String(chapter?.chapterId ?? "")) && (chapter.bookId == null || String(chapter.bookId) === id)).sort((a, b) => (Number(a.chapterIndex) || 0) - (Number(b.chapterIndex) || 0));
  const free = chapters.filter((chapter) => chapter.isCharge === "0" && mediaURL(chapter));
  const video = {
    ...card(book),
    vod_content: text2(book.introduction),
    vod_actor: [book.actor, book.actress].map(text2).filter(Boolean).join(","),
    type_name: (Array.isArray(book.bookTypeThree) ? book.bookTypeThree : []).map((tag) => text2(tag?.name)).filter(Boolean).slice(0, 4).join(",")
  };
  if (free.length < chapters.length) video.vod_remarks = (labels.free || "%@ of %@ episodes free").replace("%@", String(free.length)).replace("%@", String(chapters.length));
  if (free.length) {
    video.vod_play_from = labels.name || "Hema";
    video.vod_play_url = free.map((chapter) => `${(labels.episode || "Episode %@").replace("%@", String(Number(chapter.chapterIndex) || 0))}$${id}/${chapter.chapterId}`).join("#");
  }
  return { list: [video] };
}
var mediaURL = (chapter) => https(chapter?.chapterVideoVo?.mp4720p) || https(chapter?.chapterVideoVo?.mp4);
var hema_default = {
  init(ext) {
    labels = dramaLabels(language(extension(ext).lang), "Hema");
  },
  home() {
    return { class: loadGenres() };
  },
  homeVod() {
    return this.category("0", 1);
  },
  category(tid, pg) {
    const genre = String(tid || "0"), page = Math.max(1, parseInt(pg, 10) || 1);
    if (!GENRE.test(genre)) fail("changed");
    return browse(fetchText(genre === "0" && page === 1 ? "/browse" : `/browse/${genre}${page > 1 ? `/${page}` : ""}`), genre, page);
  },
  search(query, quick, pg) {
    const page = Math.max(1, parseInt(pg, 10) || 1);
    const reply = fetchText("/seo/video/6007", { sourceType: 1, keyword: String(query).trim(), index: page });
    let data;
    try {
      data = JSON.parse(reply);
    } catch {
      fail("changed");
    }
    if (data?.retCode !== 0 || !Array.isArray(data.data?.bookList)) fail("changed");
    const list = cards(data.data.bookList);
    return { list, page, pagecount: data.data.isMore === 1 && list.length ? page + 1 : page };
  },
  detail(id) {
    if (!ID.test(String(id))) fail("changed");
    return detail(pageData(fetchText(`/drama/${id}`)), String(id));
  },
  play(flag, address) {
    const [id, chapterId, extra] = String(address).split("/");
    if (!ID.test(id || "") || !ID.test(chapterId || "") || extra !== void 0) fail("changed");
    const data = pageData(fetchText(`/drama/${id}`));
    if (String(data.bookInfoVo?.bookId) !== id || !Array.isArray(data.chapterList)) fail("changed");
    const chapter = data.chapterList.find((item) => String(item?.chapterId) === chapterId);
    const url = chapter?.isCharge === "0" ? mediaURL(chapter) : "";
    if (!url) fail(chapter ? "locked" : "changed");
    return { parse: 0, url, header: { "User-Agent": "Mozilla/5.0" } };
  }
};
export {
  browse,
  cards,
  hema_default as default,
  detail,
  genres,
  pageData
};