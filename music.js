var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);

// src/lib/host.ts
var request = (url, options = {}) => globalThis.req(url, options);

// src/music/resolve.ts
var ChannelError = class extends Error {
  constructor(code, detail = "") {
    super(detail || code);
    __publicField(this, "code", code);
    __publicField(this, "detail", detail);
  }
};
var budget = 8e3;
var agent = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0 Safari/537.36";
function send(url, ask, options = {}, limit = budget) {
  const left = Math.min(limit, ask.deadline - Date.now());
  if (left < 250) throw new ChannelError("timeout");
  const started = Date.now();
  const reply = request(url, { ...options, timeout: left, headers: { "User-Agent": agent, ...options.headers || {} } });
  if (!reply.code) throw new ChannelError(Date.now() - started >= left - 100 ? "timeout" : "network");
  return reply;
}
function json(url, ask, headers = {}) {
  const reply = send(url, ask, { headers });
  if (reply.code === 429) throw new ChannelError("rateLimited");
  if (reply.code === 401 || reply.code === 403) throw new ChannelError("authRequired");
  if (!(reply.code >= 200 && reply.code < 300)) throw new ChannelError("invalidResponse", `HTTP ${reply.code}`);
  try {
    return JSON.parse(reply.content || "");
  } catch {
    throw new ChannelError("invalidResponse", "not JSON");
  }
}
var address = (base, query) => base + "?" + query.map(([name, value]) => `${encodeURIComponent(name)}=${encodeURIComponent(value)}`).join("&");
function playable(value) {
  const text = typeof value === "string" ? value : "";
  return /^https?:\/\/[^/\s]+/i.test(text) ? text : null;
}
var vkeys = {
  code: (quality) => ({ lossless: "10", high: "8", standard: "6" })[quality],
  parse(body) {
    const message = String(body?.message ?? "");
    if (body?.code !== 0) {
      if (/风控|風控/.test(message)) throw new ChannelError("upstreamRisk");
      if (/频繁|限流/.test(message)) throw new ChannelError("rateLimited");
      throw new ChannelError("noResource");
    }
    const url = playable(body?.data?.url);
    if (!url) throw new ChannelError("noResource");
    return { url, claimed: body.data.kbps == null ? void 0 : String(body.data.kbps), upstream: "vkeys" };
  },
  resolve: (ask) => vkeys.parse(json(address("https://api.vkeys.cn/music/tencent/song/link", [["mid", ask.id], ["quality", vkeys.code(ask.quality)]]), ask))
};
var gdstudio = {
  bitrate: (quality) => ({ lossless: "999", high: "320", standard: "128" })[quality],
  parse(body) {
    const url = playable(body?.url);
    if (!url) {
      if (body?.error != null || body?.msg != null) throw new ChannelError("invalidResponse", `GD: ${String(body.error ?? body.msg ?? "").slice(0, 80)}`);
      throw new ChannelError("noResource");
    }
    return { url, claimed: body.br == null ? void 0 : `br ${body.br}`, upstream: "gdstudio" };
  },
  resolve: (ask) => gdstudio.parse(json(address(
    "https://music-api.gdstudio.xyz/api.php",
    [["types", "url"], ["source", "netease"], ["id", ask.id], ["br", gdstudio.bitrate(ask.quality)]]
  ), ask))
};
var hyw = {
  quality: (quality) => ({ lossless: "flac", high: "320k", standard: "128k" })[quality],
  parse(body) {
    const code = body?.code;
    if (code === 401 || code === 403) throw new ChannelError("authRequired");
    if (code === 429) throw new ChannelError("rateLimited");
    if (code === 404) throw new ChannelError("noResource");
    if (code !== 200) throw new ChannelError("invalidResponse", `HYW code ${code ?? "-"}`);
    const url = playable(body.url) ?? playable(body.data?.url) ?? playable(body.data);
    if (!url) throw new ChannelError("noResource");
    const claimed = body.actualQuality ?? body.quality;
    return { url, claimed: claimed == null ? void 0 : String(claimed), upstream: typeof body.source === "string" ? `hyw:${body.source}` : "hyw" };
  },
  resolve(ask) {
    const key = ask.key.trim();
    if (!key) throw new ChannelError("authRequired");
    const url = address("https://103.79.184.97/api/music/url", [["platform", "tx"], ["source", "tx"], ["songId", ask.id], ["quality", hyw.quality(ask.quality)], ["key", key]]);
    return hyw.parse(json(url, ask, /^[\x00-\x7f]*$/.test(key) ? { "X-Card-Key": key } : {}));
  }
};
var nianxin = {
  levels: (quality) => ({ lossless: ["lossless", "exhigh"], high: ["exhigh", "standard"], standard: ["standard"] })[quality],
  parse(body, level) {
    if (body?.code !== 200) throw new ChannelError("invalidResponse", `Nianxin code ${body?.code ?? "-"}`);
    const url = playable(body.data?.url) ?? playable(body.url);
    if (!url) throw new ChannelError("noResource");
    return { url, claimed: level, upstream: "nianxin" };
  },
  resolve(ask) {
    const base = "https://mcp.nianxinxz.com/share/ceshi/" + (ask.platform === "kuwo" ? "kw.php" : "wy.php");
    let last = new ChannelError("noResource");
    for (const level of nianxin.levels(ask.quality)) {
      try {
        return nianxin.parse(json(address(base, [["id", ask.id], ["level", level]]), ask), level);
      } catch (error) {
        if (error instanceof ChannelError && error.code === "noResource") last = error;
        else throw error;
      }
    }
    throw last;
  }
};
var xinghai = {
  quality: (quality, platform) => platform === "kuwo" ? { lossless: "flac", high: "320k", standard: "128k" }[quality] : { lossless: "lossless", high: "exhigh", standard: "standard" }[quality],
  parse(body) {
    if (body?.code !== 200) throw new ChannelError(body?.code === 429 ? "rateLimited" : "noResource");
    const url = playable(body.url) ?? playable(body.data?.url);
    if (!url) throw new ChannelError("noResource");
    return { url, claimed: body.quality == null ? void 0 : String(body.quality), upstream: "xinghai" };
  },
  resolve: (ask) => xinghai.parse(json(address(
    "https://yy.zddyr.top/lx/api/",
    [["source", ask.platform === "kuwo" ? "kw" : "netease"], ["name", ""], ["songmid", ask.id], ["quality", xinghai.quality(ask.quality, ask.platform)]]
  ), ask))
};
var migu = {
  /** The key the web player's answers are scrambled with. */
  key: "Jk8qzuePiJ1qE3mDYhLQ3T73DtDoAhLP",
  /** Folder and extension of each tier, best first; the answer is always the last. */
  tiers: [
    { name: "SQ", path: "歌曲下载/flac", ext: ".flac" },
    { name: "HQ", path: "标清高清/MP3_320_16_Stero", ext: ".mp3" },
    { name: "PQ", path: "标清高清/MP3_128_16_Stero", ext: ".mp3" }
  ],
  /** The tiers above PQ to try. */
  wanted: (quality) => ({ lossless: ["SQ", "HQ"], high: ["HQ"], standard: [] })[quality],
  ids(id) {
    const at = id.indexOf("_");
    return at > 0 && at < id.length - 1 ? { content: id.slice(0, at), copyright: id.slice(at + 1) } : null;
  },
  /** The answer: "AB CD 01", an offset byte, then JSON with each byte shifted by the offset less a key byte. */
  unscramble(bytes) {
    if (!(bytes.length > 4 && bytes[0] === 171 && bytes[1] === 205 && bytes[2] === 1)) throw new ChannelError("invalidResponse", "Migu answer format");
    const offset = bytes[3];
    const plain = new Uint8Array(bytes.length - 4);
    for (let i = 0; i < plain.length; i++) plain[i] = (bytes[i + 4] + offset - migu.key.charCodeAt(i % migu.key.length) + 512) % 256;
    try {
      return JSON.parse(utf8(plain));
    } catch {
      throw new ChannelError("invalidResponse", "Migu answer not JSON");
    }
  },
  address(body) {
    if (body?.code !== "000000") throw new ChannelError("noResource");
    let text = String(body.data?.url || body.data?.playUrl || "");
    if (text.startsWith("//")) text = "https:" + text;
    const url = playable(text.replace(/\+/g, "%2B"));
    if (!url) throw new ChannelError("noResource");
    return url;
  },
  /** Another tier of the same file: the tier's folder and extension, without the 128 kbps answer's signature. */
  retone(url, name) {
    const source = migu.tiers[migu.tiers.length - 1], target = migu.tiers.find((tier) => tier.name === name);
    if (!target) return null;
    const from = encodeURI(source.path), to = encodeURI(target.path), bare = url.split("?")[0];
    if (!bare.includes(from) || !bare.endsWith(source.ext)) return null;
    return bare.split(from).join(to).slice(0, -source.ext.length) + target.ext;
  },
  resolve(ask) {
    const ids = migu.ids(ask.id);
    if (!ids) throw new ChannelError("noResource");
    const url = address("https://c.musicapp.migu.cn/strategy/listen-url/h5/v2.4", [
      ["contentId", ids.content],
      ["copyrightId", ids.copyright],
      ["resourceType", "2"],
      ["netType", "01"],
      ["toneFlag", "PQ"],
      ["scene", ""],
      ["lowerQualityContentId", ids.content]
    ]);
    const reply = send(url, ask, { buffer: 2, headers: { birth: "h5page", channel: "014X031", Referer: "https://y.migu.cn/", "location-data": "30.6698676660,104.1229614820" } });
    if (!(reply.code >= 200 && reply.code < 300)) throw new ChannelError("invalidResponse", `Migu HTTP ${reply.code}`);
    const base = migu.address(migu.unscramble(decode(reply.content || "")));
    for (const name of migu.wanted(ask.quality)) {
      const better = migu.retone(base, name);
      if (better && exists(better, ask)) return { url: better, claimed: name, upstream: "migu" };
    }
    return { url: base, claimed: "PQ", upstream: "migu" };
  }
};
function exists(url, ask) {
  try {
    const code = send(url, ask, { method: "HEAD" }, 4e3).code;
    return code >= 200 && code < 400;
  } catch {
    return false;
  }
}
var alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
function decode(base64) {
  const text = base64.replace(/[^A-Za-z0-9+/]/g, "");
  const out = new Uint8Array(Math.floor(text.length * 3 / 4));
  let bits = 0, count = 0, at = 0;
  for (let i = 0; i < text.length; i++) {
    bits = bits << 6 | alphabet.indexOf(text[i]);
    count += 6;
    if (count >= 8) {
      count -= 8;
      out[at++] = bits >> count & 255;
    }
  }
  return out.subarray(0, at);
}
function utf8(bytes) {
  let binary = "";
  for (let i = 0; i < bytes.length; i++) binary += "%" + (bytes[i] < 16 ? "0" : "") + bytes[i].toString(16);
  return decodeURIComponent(binary);
}
var channels = {
  migu: { platforms: ["migu"], resolve: migu.resolve },
  nianxin: { platforms: ["kuwo", "netease"], resolve: nianxin.resolve },
  vkeys: { platforms: ["qq"], resolve: vkeys.resolve },
  gdstudio: { platforms: ["netease"], resolve: gdstudio.resolve },
  xinghai: { platforms: ["kuwo", "netease"], resolve: xinghai.resolve },
  hyw: { platforms: ["qq"], resolve: hyw.resolve }
};
function play(flag, id) {
  try {
    const asked = JSON.parse(String(flag || "{}"));
    const channel = channels[String(asked.channel)];
    const platform = String(asked.platform || "");
    if (!channel || !channel.platforms.includes(platform) || !id) throw new ChannelError("noResource");
    const quality = asked.quality === "high" || asked.quality === "standard" ? asked.quality : "lossless";
    return channel.resolve({ platform, id: String(id), quality, key: String(asked.key || ""), deadline: Date.now() + budget });
  } catch (error) {
    if (error instanceof ChannelError) return error.detail ? { error: error.code, detail: error.detail } : { error: error.code };
    return { error: "invalidResponse", detail: error instanceof SyntaxError ? "request" : "script" };
  }
}
var resolve_default = { init: (_ext) => {
}, play };
export {
  ChannelError,
  address,
  channels,
  decode,
  resolve_default as default,
  gdstudio,
  hyw,
  migu,
  nianxin,
  play,
  playable,
  vkeys,
  xinghai
};