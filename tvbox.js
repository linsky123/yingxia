{
 "yingxia": {
  "version": 1,
  "kind": "built-in sources"
 },
 "sites": [
  {
   "key": "builtin.bilibili",
   "name": "Bilibili",
   "type": 3,
   "api": "https://bright-harbor.pages.dev/v1/js/bili.b6b480fcd1126af7.js",
   "searchable": 1,
   "quickSearch": 1,
   "filterable": 1,
   "ext": {
    "builtin": true
   },
   "yingxia": {
    "builtin": true,
    "names": {
     "en": "Bilibili",
     "zh-Hans": "哔哩哔哩",
     "zh-Hant": "嗶哩嗶哩",
     "ja": "ビリビリ"
    },
    "account": "bilibili",
    "mark": "bilibili",
    "danmaku": true,
    "tmdb": false
   }
  },
  {
   "key": "builtin.hongguo",
   "name": "Hongguo",
   "type": 3,
   "api": "https://bright-harbor.pages.dev/v1/js/hongguo.e03eb4555255f804.js",
   "searchable": 1,
   "quickSearch": 1,
   "yingxia": {
    "builtin": true,
    "names": {
     "en": "Hongguo",
     "zh-Hans": "红果短剧",
     "zh-Hant": "紅果短劇",
     "ja": "Hongguo"
    },
    "symbol": "play.rectangle.fill",
    "account": "hongguo",
    "tmdb": false,
    "signIn": {
     "kind": "qr",
     "note": {
      "en": "Hongguo often won't play for devices that aren't signed in. Open the Hongguo app on your phone, scan this code, and confirm the sign-in.",
      "zh-Hans": "红果常常不为未登录的设备播放。请在手机上打开红果短剧 App，扫描此码并确认登录。",
      "zh-Hant": "紅果常常不為未登入的裝置播放。請在手機上打開紅果短劇 App，掃描此碼並確認登入。",
      "ja": "Hongguo はサインインしていないデバイスでは再生しないことがよくあります。スマートフォンで Hongguo アプリを開き、このコードをスキャンしてサインインを確認してください。"
     },
     "signedIn": {
      "en": "Hongguo episodes play as this account. Sign-in details stay on this device.",
      "zh-Hans": "红果短剧以此账号播放。登录信息只保存在本机。",
      "zh-Hant": "紅果短劇以此帳號播放。登入資訊只保存在本機。",
      "ja": "Hongguo のエピソードはこのアカウントで再生します。サインイン情報はこのデバイスにのみ保存されます。"
     }
    }
   }
  },
  {
   "key": "builtin.xifan",
   "name": "Xifan",
   "type": 3,
   "api": "https://bright-harbor.pages.dev/v1/js/xifan.f98be101cbf9ce1b.js",
   "searchable": 1,
   "quickSearch": 1,
   "yingxia": {
    "builtin": true,
    "names": {
     "en": "Xifan",
     "zh-Hans": "西饭短剧",
     "zh-Hant": "西飯短劇",
     "ja": "Xifan"
    },
    "tmdb": false
   }
  },
  {
   "key": "builtin.hema",
   "name": "Hema",
   "type": 3,
   "api": "https://bright-harbor.pages.dev/v1/js/hema.44eac5d9843fd55c.js",
   "searchable": 1,
   "quickSearch": 1,
   "yingxia": {
    "builtin": true,
    "names": {
     "en": "Hema",
     "zh-Hans": "河马短剧",
     "zh-Hant": "河馬短劇",
     "ja": "Hema"
    },
    "tmdb": false
   }
  }
 ],
 "lives": [
  {
   "name": "Bilibili Live",
   "names": {
    "en": "Bilibili Live",
    "zh-Hans": "哔哩哔哩直播",
    "zh-Hant": "嗶哩嗶哩直播",
    "ja": "ビリビリ生配信"
   },
   "url": "bilibili-live://rooms"
  },
  {
   "name": "Douyu Live",
   "names": {
    "en": "Douyu Live",
    "zh-Hans": "斗鱼直播",
    "zh-Hant": "鬥魚直播",
    "ja": "斗魚ライブ"
   },
   "url": "douyu-live://rooms"
  },
  {
   "name": "Huya Live",
   "names": {
    "en": "Huya Live",
    "zh-Hans": "虎牙直播",
    "zh-Hant": "虎牙直播",
    "ja": "虎牙ライブ"
   },
   "url": "huya-live://rooms"
  },
  {
   "name": "Douyin Live",
   "names": {
    "en": "Douyin Live",
    "zh-Hans": "抖音直播",
    "zh-Hant": "抖音直播",
    "ja": "Douyinライブ"
   },
   "url": "douyin-live://rooms"
  }
 ],
 "yingxiaLive": [
  {
   "id": "bilibili",
   "scheme": "bilibili-live",
   "api": "https://bright-harbor.pages.dev/v1/js/live-bilibili.8fb2a40f9d6f99fc.js",
   "name": "Bilibili Live",
   "names": {
    "en": "Bilibili Live",
    "zh-Hans": "哔哩哔哩直播",
    "zh-Hant": "嗶哩嗶哩直播",
    "ja": "ビリビリ生配信"
   },
   "tint": "#FA7399",
   "mark": "bilibili",
   "account": "bilibili",
   "chat": "bilibili"
  },
  {
   "id": "douyu",
   "scheme": "douyu-live",
   "api": "https://bright-harbor.pages.dev/v1/js/live-douyu.9d76559818e5bc09.js",
   "name": "Douyu Live",
   "names": {
    "en": "Douyu Live",
    "zh-Hans": "斗鱼直播",
    "zh-Hant": "鬥魚直播",
    "ja": "斗魚ライブ"
   },
   "tint": "#FF6B1A",
   "glyph": "斗",
   "chat": "douyu"
  },
  {
   "id": "huya",
   "scheme": "huya-live",
   "api": "https://bright-harbor.pages.dev/v1/js/live-huya.7c4d15a680e150ec.js",
   "name": "Huya Live",
   "names": {
    "en": "Huya Live",
    "zh-Hans": "虎牙直播",
    "zh-Hant": "虎牙直播",
    "ja": "虎牙ライブ"
   },
   "tint": "#FF9E00",
   "glyph": "虎",
   "relayHosts": [
    ".flv.huya.com"
   ],
   "chat": "huya"
  },
  {
   "id": "douyin",
   "scheme": "douyin-live",
   "api": "https://bright-harbor.pages.dev/v1/js/live-douyin.b584b1bce54429fc.js",
   "name": "Douyin Live",
   "names": {
    "en": "Douyin Live",
    "zh-Hans": "抖音直播",
    "zh-Hant": "抖音直播",
    "ja": "Douyinライブ"
   },
   "tint": "#121217",
   "glyph": "抖",
   "split": true,
   "account": "douyin",
   "searchNeedsAccount": true
  }
 ],
 "yingxiaMusic": {
  "api": "https://bright-harbor.pages.dev/v1/js/music.3ff1ea8db53c6223.js",
  "channels": [
   {
    "id": "migu",
    "name": "Migu",
    "names": {
     "en": "Migu",
     "zh-Hans": "咪咕",
     "zh-Hant": "咪咕",
     "ja": "咪咕"
    },
    "details": {
     "en": "Migu Music",
     "zh-Hans": "咪咕音乐",
     "zh-Hant": "咪咕音樂",
     "ja": "咪咕音楽"
    },
    "platforms": [
     "migu"
    ]
   },
   {
    "id": "nianxin",
    "name": "Nianxin",
    "names": {
     "en": "Nianxin",
     "zh-Hans": "念心",
     "zh-Hant": "念心",
     "ja": "念心"
    },
    "details": {
     "en": "Kuwo Music and NetEase Cloud Music",
     "zh-Hans": "酷我音乐和网易云音乐",
     "zh-Hant": "酷我音樂和網易雲音樂",
     "ja": "酷我音楽と NetEase Cloud Music"
    },
    "platforms": [
     "kuwo",
     "netease"
    ]
   },
   {
    "id": "vkeys",
    "name": "VKeys",
    "names": {
     "en": "VKeys",
     "zh-Hans": "VKeys",
     "zh-Hant": "VKeys",
     "ja": "VKeys"
    },
    "details": {
     "en": "QQ Music",
     "zh-Hans": "QQ 音乐",
     "zh-Hant": "QQ 音樂",
     "ja": "QQ Music"
    },
    "platforms": [
     "qq"
    ]
   },
   {
    "id": "gdstudio",
    "name": "GD Music",
    "names": {
     "en": "GD Music",
     "zh-Hans": "GD音乐台",
     "zh-Hant": "GD音樂台",
     "ja": "GD音乐台"
    },
    "details": {
     "en": "NetEase Cloud Music",
     "zh-Hans": "网易云音乐",
     "zh-Hant": "網易雲音樂",
     "ja": "NetEase Cloud Music"
    },
    "platforms": [
     "netease"
    ],
    "budget": 50,
    "credit": {
     "en": "Source: GD Music (music.gdstudio.xyz)",
     "zh-Hans": "音源：GD音乐台(music.gdstudio.xyz)",
     "zh-Hant": "音源：GD音樂台(music.gdstudio.xyz)",
     "ja": "音源：GD音乐台 (music.gdstudio.xyz)"
    }
   },
   {
    "id": "xinghai",
    "name": "Xinghai",
    "names": {
     "en": "Xinghai",
     "zh-Hans": "星海",
     "zh-Hant": "星海",
     "ja": "星海"
    },
    "details": {
     "en": "Kuwo Music and NetEase Cloud Music, when the others fail",
     "zh-Hans": "酷我音乐和网易云音乐，其他通道失败时使用",
     "zh-Hant": "酷我音樂和網易雲音樂，其他通道失敗時使用",
     "ja": "酷我音楽と NetEase Cloud Music（ほかが失敗したとき）"
    },
    "platforms": [
     "kuwo",
     "netease"
    ],
    "budget": 30,
    "credit": {
     "en": "Source: Xinghai (yy.zddyr.top)",
     "zh-Hans": "音源：星海（yy.zddyr.top）",
     "zh-Hant": "音源：星海（yy.zddyr.top）",
     "ja": "音源：星海（yy.zddyr.top）"
    }
   },
   {
    "id": "hyw",
    "name": "HYW",
    "names": {
     "en": "HYW",
     "zh-Hans": "HYW",
     "zh-Hant": "HYW",
     "ja": "HYW"
    },
    "details": {
     "en": "QQ Music, when VKeys fails",
     "zh-Hans": "QQ 音乐，VKeys 失败时使用",
     "zh-Hant": "QQ 音樂，VKeys 失敗時使用",
     "ja": "QQ Music（VKeys が失敗したとき）"
    },
    "platforms": [
     "qq"
    ],
    "key": {
     "en": "HYW key",
     "zh-Hans": "HYW 密钥",
     "zh-Hant": "HYW 金鑰",
     "ja": "HYW キー"
    }
   }
  ],
  "order": [
   [
    "migu",
    "migu"
   ],
   [
    "kuwo",
    "nianxin"
   ],
   [
    "qq",
    "vkeys"
   ],
   [
    "netease",
    "gdstudio"
   ],
   [
    "kuwo",
    "xinghai"
   ],
   [
    "netease",
    "nianxin"
   ],
   [
    "qq",
    "hyw"
   ],
   [
    "netease",
    "xinghai"
   ]
  ],
  "primaries": 4,
  "notes": [
   {
    "en": "HYW stays off until you enter the key from its published script. GD Music (music.gdstudio.xyz) is for personal, non-commercial use and allows 50 requests every 5 minutes.",
    "zh-Hans": "填入 HYW 公开脚本中的密钥后才会启用。GD音乐台(music.gdstudio.xyz)仅限个人非商业使用，每 5 分钟最多 50 次请求。",
    "zh-Hant": "填入 HYW 公開腳本中的金鑰後才會啟用。GD音樂台(music.gdstudio.xyz)僅限個人非商業使用，每 5 分鐘最多 50 次請求。",
    "ja": "HYW は、公開スクリプトのキーを入力するまでオフのままです。GD音乐台 (music.gdstudio.xyz) は個人の非商用利用に限られ、5 分ごとに 50 リクエストまでです。"
   },
   {
    "en": "Xinghai (yy.zddyr.top) asks to be credited and not overused, so it is only asked when the other channels fail.",
    "zh-Hans": "星海（yy.zddyr.top）要求注明来源且勿滥用，因此只在其他通道失败时使用。",
    "zh-Hant": "星海（yy.zddyr.top）要求註明來源且勿濫用，因此只在其他通道失敗時使用。",
    "ja": "星海（yy.zddyr.top）は出典の明記と使いすぎないよう求めているため、ほかのチャンネルが失敗したときだけ使います。"
   }
  ]
 }
}