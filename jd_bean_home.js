/*
领京豆升级任务
活动入口：京东APP首页-领京豆任务
cron "25 2,14 * * *" script-path=jd_bean_home.js, tag=领京豆升级任务

请使用本地IP环境 请使用本地IP环境 请使用本地IP环境

 */
let lnrun = 0;

const $ = new Env('领京豆升级任务')
const I11liI1i = $.isNode() ? require("./sendNotify") : "",
  iIiI1I1i = $.isNode() ? require("./jdCookie.js") : "",
  ii1ill1 = require("./function/h5st41.js");
let llI1i1Il = [],
  lIlllIIl = "",
  i111iII1;
if ($.isNode()) {
  Object.keys(iIiI1I1i).forEach(iiIlI1Ii => {
    llI1i1Il.push(iIiI1I1i[iiIlI1Ii]);
  });
  if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") console.log = () => {};
} else llI1i1Il = [$.getdata("CookieJD"), $.getdata("CookieJD2"), ...liIiilII($.getdata("CookiesJD") || "[]").map(IllI1IIi => IllI1IIi.cookie)].filter(lIil1lil => !!lIil1lil);
!(async () => {
  if (!llI1i1Il[0]) {
    $.msg($.name, "【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取", "https://bean.m.jd.com/bean/signIndex.action", {
      "open-url": "https://bean.m.jd.com/bean/signIndex.action"
    });
    return;
  }
  console.log("❖ kr提醒您...\n❖ 请使用本地IP环境...\n❖ 否则不会完成任务...\n");
  for (let IlI1Iill = 0; IlI1Iill < llI1i1Il.length; IlI1Iill++) {
    if (llI1i1Il[IlI1Iill]) {
      lIlllIIl = llI1i1Il[IlI1Iill];
      $.UserName = decodeURIComponent(lIlllIIl.match(/pt_pin=([^; ]+)(?=;?)/) && lIlllIIl.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
      $.index = IlI1Iill + 1;
      $.isLogin = true;
      $.nickName = "";
      i111iII1 = "";
      console.log("\n******开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "*********\n");
      lnrun++;if(lnrun == 4){console.log(`\n【访问接口次数达到3次，休息一分钟.....】\n`);await $.wait(60 * 1000);lnrun = 0}
      if (!$.isLogin) {
        $.msg($.name, "【提示】cookie已失效", "京东账号" + $.index + " " + ($.nickName || $.UserName) + "\n请重新登录获取\nhttps://bean.m.jd.com/bean/signIndex.action", {
          "open-url": "https://bean.m.jd.com/bean/signIndex.action"
        });
        $.isNode() && (await I11liI1i.sendNotify($.name + "cookie已失效 - " + $.UserName, "京东账号" + $.index + " " + $.UserName + "\n请重新登录获取cookie"));
        continue;
      }
      $.jda = "__jda=" + I1111ili("1xxxxxxxx.164xxxxxxxxxxxxxxxxxxx.164xxxxxxx.165xxxxxx.165xxxxxx.1xx");
      $.UA = await I1iI1iIl();
      await lll1i11l();
      await $.wait(parseInt(Math.random() * 1000 + 1000, 10));
    }
  }
})().catch(li1IiIi => {
  $.log("", "❌ " + $.name + ", 失败! 原因: " + li1IiIi + "!", "");
}).finally(() => {
  $.done();
});
async function lll1i11l() {
  $.valid = false;
  await IIiliI1();
  await $.wait(parseInt(Math.random() * 1000 + 1000, 10));
  !$.valid && (await III1li1());
}
function Ili11lll(illi1Ii1) {
  try {
    if (typeof JSON.parse(illi1Ii1) == "object") return true;
  } catch (l1l11ll) {
    return console.log(l1l11ll), console.log("京东服务器访问数据为空，请检查自身设备网络情况"), false;
  }
}
function liIiilII(lI1iiiI) {
  if (typeof lI1iiiI == "string") {
    try {
      return JSON.parse(lI1iiiI);
    } catch (li1illl) {
      return console.log(li1illl), $.msg($.name, "", "请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie"), [];
    }
  }
}
async function III1li1() {
  return new Promise(async IlIlll1I => {
    const II1I1i11 = {
      "functionId": "findBeanScene",
      "appid": "signed_wh5",
      "clientVersion": "12.0.1",
      "client": "apple",
      "body": {
        "source": "AppHome",
        "viewChannel": "AppHome",
        "rnVersion": "3.9",
        "rnClient": "1",
        "appid": "ea6f2",
        "needSecurity": true,
        "bizId": "active"
      }
    };
    $.h5st = await ii11Ilil("ea6f2", II1I1i11);
    let lIIIi = {
      "url": "https://api.m.jd.com/client.action?" + $.h5st,
      "headers": {
        "Referer": "https://h5.m.jd.com/rn/42yjy8na6pFsq1cx9MJQ5aTgu3kX/index.html",
        "User-Agent": $.UA,
        "Cookie": lIlllIIl,
        "content-type": "application/x-www-form-urlencoded",
        "accept": "application/json, text/plain, */*"
      },
      "timeout": 10 * 1000
    };
    $.get(lIIIi, async (iii1iIl1, lI1iIii1, iil11ll1) => {
      try {
        if (iii1iIl1) console.log("" + JSON.stringify(iii1iIl1));else {
          iil11ll1 = JSON.parse(iil11ll1);
          if (iil11ll1.code == 0) {
            let I1li1l1I = iil11ll1?.["data"]?.["totalUserBean"] || 0,
              iiIiIlll = iil11ll1?.["data"]?.["continuousDays"] || 0,
              lIiliIll = iil11ll1?.["data"]?.["tomorrowSendBeans"] || 0;
            console.log("当前京豆：" + I1li1l1I + "，已连续签到：" + iiIiIlll + " 天，明日签到可获得：" + lIiliIll + " 豆子");
            let li1ilIl = iil11ll1?.["data"]?.["curScene"]?.["growth"] || 0,
              IllIIi11 = iil11ll1?.["data"]?.["curScene"]?.["level"] || 0,
              IiIlI11 = iil11ll1?.["data"]?.["curScene"]?.["sceneLevelConfig"]?.["growthEnd"] || 0,
              li11iiII = IiIlI11 - li1ilIl;
            console.log("当前等级：" + IllIIi11 + "，经验值：" + li1ilIl + "，升级还需：" + li11iiII);
          } else iil11ll1.code == 402 ? console.log("进入首页失败," + iil11ll1?.["message"]) : console.log("进入首页失败," + iil11ll1?.["message"]);
        }
      } catch (lIiIliIl) {
        $.logErr(lIiIliIl, lI1iIii1);
      } finally {
        IlIlll1I();
      }
    });
  });
}
async function IIiliI1() {
  const lilliiII = "{\"viewChannel\":\"AppHome\",\"beanVersion\":1,\"imei\":\"" + l11Il1l1(40) + "\",\"prstate\":\"0\",\"aid\":\"\",\"idfa\":\"\",\"op_type\":1,\"app_info\":\"\",\"location_info\":\"\"}";
  let ll11lIlI = {
    "url": "https://api.m.jd.com/client.action?functionId=beanTaskList&body=" + encodeURIComponent(lilliiII) + "&clientVersion=12.0.1&appid=ld&loginType=2&area=0_0_0_0",
    "headers": {
      "Cookie": lIlllIIl + $.jda + ";__jd_ref_cls=JingDou_SceneHome_FloatButton_expo",
      "Accept": "*/*",
      "User-Agent": $.UA,
      "Accept-Language": "zh-cn",
      "Accept-Encoding": "gzip, deflate, br",
      "Referer": "https://h5.m.jd.com/"
    },
    "timeout": 10 * 1000
  };
  return new Promise(l1IlI11 => {
    $.get(ll11lIlI, async (iiIiI11i, lliilIl, I11iliii) => {
      try {
        if (iiIiI11i) $.log(iiIiI11i);else {
          I11iliii = JSON.parse(I11iliii);
          if (I11iliii?.["code"] == 0) {
            $.taskInfos = I11iliii?.["data"]?.["taskInfos"] || [];
            for (let iliIliil = 0; iliIliil < $.taskInfos.length; iliIliil++) {
              let iIIIil = $.taskInfos[iliIliil].subTaskVOS || [];
              for (let i1il1I1 = 0; i1il1I1 < iIIIil.length; i1il1I1++) {
                if ($.taskInfos[iliIliil].status != 2) {
                  if ($.taskInfos[iliIliil].waitDuration == 0) {
                    console.log("去做任务：" + $.taskInfos[iliIliil].taskName + "，增加经验值：" + $.taskInfos[iliIliil].score + "，完成情况：" + $.taskInfos[iliIliil].process);
                    let iilIli1i = iIIIil[i1il1I1].taskToken || "";
                    await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
                    await IiliIl1i(0, iilIli1i);
                    await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
                    await IIiliI1();
                  } else {
                    console.log("去做任务：" + $.taskInfos[iliIliil].taskName + "，增加经验值：" + $.taskInfos[iliIliil].score + "，完成情况：" + $.taskInfos[iliIliil].process);
                    let llIlIII1 = iIIIil[i1il1I1].taskToken || "";
                    await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
                    await IiliIl1i(1, llIlIII1);
                    await $.wait(parseInt(Math.random() * 1500 + 5000, 10));
                    await IiliIl1i(0, llIlIII1);
                    await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
                    await IIiliI1();
                  }
                }
              }
            }
          } else console.log("失败," + I11iliii.errorMessage), $.valid = true;
        }
      } catch (IlilIliI) {
        $.log(IlilIliI);
      } finally {
        l1IlI11();
      }
    });
  });
}
async function IiliIl1i(liiiI11l, lI1iIl) {
  const lll1lII1 = "{\"actionType\":" + liiiI11l + ",\"taskToken\":\"" + lI1iIl + "\"}";
  let illl1lll = {
    "url": "https://api.m.jd.com/client.action?functionId=beanDoTask&body=" + encodeURIComponent(lll1lII1) + "&clientVersion=12.0.1&appid=ld&loginType=2&area=0_0_0_0",
    "headers": {
      "Cookie": lIlllIIl + $.jda + ";__jd_ref_cls=JingDou_SceneHome_FloatButton_expo",
      "Accept": "*/*",
      "User-Agent": $.UA,
      "Accept-Language": "zh-cn",
      "Accept-Encoding": "gzip, deflate, br",
      "Referer": "https://h5.m.jd.com/"
    },
    "timeout": 10 * 1000
  };
  return new Promise(I1111i11 => {
    $.get(illl1lll, async (l1iiIill, i1liIl1i, ii111Iil) => {
      try {
        l1iiIill ? $.log(l1iiIill) : (ii111Iil = JSON.parse(ii111Iil), ii111Iil?.["code"] == 0 && ii111Iil?.["data"]?.["bizCode"] == 0 ? liiiI11l == 1 ? console.log("等待任务时长中...") : console.log("" + (ii111Iil?.["data"]?.["bizMsg"] || "等待任务时长中...")) : (console.log("失败," + ii111Iil.errorMessage), $.valid = true));
      } catch (ll1i1li1) {
        $.log(ll1i1li1);
      } finally {
        I1111i11();
      }
    });
  });
}
function l11Il1l1(llllII1I) {
  llllII1I = llllII1I || 32;
  let Iil1II1l = "abcdef0123456789",
    lliIliii = Iil1II1l.length,
    llIl1iii = "";
  for (i = 0; i < llllII1I; i++) llIl1iii += Iil1II1l.charAt(Math.floor(Math.random() * lliIliii));
  return llIl1iii;
}
async function ii11Ilil(iI1IiiII, lI1lI1) {
  try {
    let iilIlIi1 = new ii1ill1({
      "appId": iI1IiiII,
      "appid": "signed_wh5",
      "clientVersion": lI1lI1?.["clientVersion"],
      "client": lI1lI1?.["client"],
      "pin": $.UserName,
      "ua": $.UA,
      "version": "4.1"
    });
    return await iilIlIi1.genAlgo(), body = await iilIlIi1.genUrlParams(lI1lI1.functionId, lI1lI1.body), body;
  } catch (ilII1III) {}
}
async function lIii11I(iI1i1I1, iI1IlIII) {
  let lIIilIii = {
      "searchParams": {
        ...iI1IlIII,
        "appId": iI1i1I1
      },
      "pt_pin": $.UserName,
      "client": iI1IlIII?.["client"],
      "clientVersion": iI1IlIII?.["clientVersion"]
    },
    iIliIlIi = {
      "Content-Type": "application/json",
      "User-Agent": $.UA
    },
    iIl1lill = {
      "url": "http://h5st.kingran.cf/api/h5st",
      "body": JSON.stringify(lIIilIii),
      "headers": iIliIlIi,
      "timeout": 30000
    };
  return new Promise(async iiIiill1 => {
    $.post(iIl1lill, (illIilli, iill11lI, iiii1ll1) => {
      let Iili1I11 = "";
      try {
        if (illIilli) console.log($.name + " getH5st API请求失败，请检查网路重试");else {
          iiii1ll1 = JSON.parse(iiii1ll1);
          console.log(JSON.stringify(iiii1ll1));
          if (typeof iiii1ll1 === "object" && iiii1ll1 && iiii1ll1.body) {
            if (iiii1ll1.body) Iili1I11 = iiii1ll1 || "";
          } else {
            if (iiii1ll1.code == 400) console.log("\n" + iiii1ll1.msg);else {
              console.log("\n可能连接不上接口，请检查网络");
            }
          }
        }
      } catch (I11i1I1l) {
        $.logErr(I11i1I1l, iill11lI);
      } finally {
        iiIiill1(lililIil(Iili1I11));
      }
    });
  });
}
function lililIil(l1iI1I1, II1I1iII = {}) {
  let i1I1Ilil = [],
    il11l1Il = II1I1iII.connector || "&",
    IiiiiIll = Object.keys(l1iI1I1);
  if (II1I1iII.sort) IiiiiIll = IiiiiIll.sort();
  for (let lIl1iiiI of IiiiiIll) {
    let IIliIIIi = l1iI1I1[lIl1iiiI];
    if (IIliIIIi && typeof IIliIIIi === "object") IIliIIIi = JSON.stringify(IIliIIIi);
    if (IIliIIIi && II1I1iII.encode) IIliIIIi = encodeURIComponent(IIliIIIi);
    i1I1Ilil.push(lIl1iiiI + "=" + IIliIIIi);
  }
  return i1I1Ilil.join(il11l1Il);
}
async function I1iI1iIl() {
  for (var lIi11Ili = "", ilI1Iii = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ", IIl1IIIl = 0; IIl1IIIl < 16; IIl1IIIl++) {
    var li1111Il = Math.round(Math.random() * (ilI1Iii.length - 1));
    lIi11Ili += ilI1Iii.substring(li1111Il, li1111Il + 1);
  }
  return uuid = Buffer.from(lIi11Ili, "utf8").toString("base64"), ep = encodeURIComponent(JSON.stringify({
    "hdid": "JM9F1ywUPwflvMIpYPok0tt5k9kW4ArJEU3lfLhxBqw=",
    "ts": new Date().getTime(),
    "ridx": -1,
    "cipher": {
      "sv": "CJGkEK==",
      "ud": uuid,
      "iad": ""
    },
    "ciphertype": 5,
    "version": "1.0.3",
    "appname": "com.360buy.jdmobile"
  })), "jdapp;iPhone;12.0.1;;;M/5.0;appBuild/168684;jdSupportDarkMode/0;ef/1;ep/" + ep + ";Mozilla/5.0 (iPhone; CPU iPhone OS 14_8 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1;";
}
function I1111ili(Ii1lI11 = "xxxxxxxxxxxxxxxxxxxx") {
  return Ii1lI11.replace(/[xy]/g, function (I1I1ilII) {
    var IIiIiIII = Math.random() * 10 | 0,
      iiIIIl1I = I1I1ilII == "x" ? IIiIiIII : IIiIiIII & 3 | 8;
    return jdaid = iiIIIl1I.toString(), jdaid;
  });
}
function IlI1iii1(IiilillI) {
  return new Promise(I1IlI11 => {
    const liiI1ii = {
      "url": "" + IiilillI,
      "timeout": 10000,
      "headers": {
        "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1 Edg/87.0.4280.88"
      }
    };
    $.get(liiI1ii, async (lllll11i, lIiliIIl, I1iIlIli) => {
      try {
        if (lllll11i) {} else I1iIlIli ? I1iIlIli = JSON.parse(I1iIlIli) : console.log("未获取到数据,请重新运行");
      } catch (III11I1l) {
        $.logErr(III11I1l, lIiliIIl);
        I1iIlIli = null;
      } finally {
        I1IlI11(I1iIlIli);
      }
    });
  });
}
function Env(t, e) { "undefined" != typeof process && JSON.stringify(process.env).indexOf("GITHUB") > -1 && process.exit(0); class s { constructor(t) { this.env = t } send(t, e = "GET") { t = "string" == typeof t ? { url: t } : t; let s = this.get; return "POST" === e && (s = this.post), new Promise((e, i) => { s.call(this, t, (t, s, r) => { t ? i(t) : e(s) }) }) } get(t) { return this.send.call(this.env, t) } post(t) { return this.send.call(this.env, t, "POST") } } return new class { constructor(t, e) { this.name = t, this.http = new s(this), this.data = null, this.dataFile = "box.dat", this.logs = [], this.isMute = !1, this.isNeedRewrite = !1, this.logSeparator = "\n", this.startTime = (new Date).getTime(), Object.assign(this, e), this.log("", `🔔${this.name}, 开始!`) } isNode() { return "undefined" != typeof module && !!module.exports } isQuanX() { return "undefined" != typeof $task } isSurge() { return "undefined" != typeof $httpClient && "undefined" == typeof $loon } isLoon() { return "undefined" != typeof $loon } toObj(t, e = null) { try { return JSON.parse(t) } catch { return e } } toStr(t, e = null) { try { return JSON.stringify(t) } catch { return e } } getjson(t, e) { let s = e; const i = this.getdata(t); if (i) try { s = JSON.parse(this.getdata(t)) } catch { } return s } setjson(t, e) { try { return this.setdata(JSON.stringify(t), e) } catch { return !1 } } getScript(t) { return new Promise(e => { this.get({ url: t }, (t, s, i) => e(i)) }) } runScript(t, e) { return new Promise(s => { let i = this.getdata("@chavy_boxjs_userCfgs.httpapi"); i = i ? i.replace(/\n/g, "").trim() : i; let r = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout"); r = r ? 1 * r : 20, r = e && e.timeout ? e.timeout : r; const [o, h] = i.split("@"), n = { url: `http://${h}/v1/scripting/evaluate`, body: { script_text: t, mock_type: "cron", timeout: r }, headers: { "X-Key": o, Accept: "*/*" } }; this.post(n, (t, e, i) => s(i)) }).catch(t => this.logErr(t)) } loaddata() { if (!this.isNode()) return {}; { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e); if (!s && !i) return {}; { const i = s ? t : e; try { return JSON.parse(this.fs.readFileSync(i)) } catch (t) { return {} } } } } writedata() { if (this.isNode()) { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e), r = JSON.stringify(this.data); s ? this.fs.writeFileSync(t, r) : i ? this.fs.writeFileSync(e, r) : this.fs.writeFileSync(t, r) } } lodash_get(t, e, s) { const i = e.replace(/\[(\d+)\]/g, ".$1").split("."); let r = t; for (const t of i) if (r = Object(r)[t], void 0 === r) return s; return r } lodash_set(t, e, s) { return Object(t) !== t ? t : (Array.isArray(e) || (e = e.toString().match(/[^.[\]]+/g) || []), e.slice(0, -1).reduce((t, s, i) => Object(t[s]) === t[s] ? t[s] : t[s] = Math.abs(e[i + 1]) >> 0 == +e[i + 1] ? [] : {}, t)[e[e.length - 1]] = s, t) } getdata(t) { let e = this.getval(t); if (/^@/.test(t)) { const [, s, i] = /^@(.*?)\.(.*?)$/.exec(t), r = s ? this.getval(s) : ""; if (r) try { const t = JSON.parse(r); e = t ? this.lodash_get(t, i, "") : e } catch (t) { e = "" } } return e } setdata(t, e) { let s = !1; if (/^@/.test(e)) { const [, i, r] = /^@(.*?)\.(.*?)$/.exec(e), o = this.getval(i), h = i ? "null" === o ? null : o || "{}" : "{}"; try { const e = JSON.parse(h); this.lodash_set(e, r, t), s = this.setval(JSON.stringify(e), i) } catch (e) { const o = {}; this.lodash_set(o, r, t), s = this.setval(JSON.stringify(o), i) } } else s = this.setval(t, e); return s } getval(t) { return this.isSurge() || this.isLoon() ? $persistentStore.read(t) : this.isQuanX() ? $prefs.valueForKey(t) : this.isNode() ? (this.data = this.loaddata(), this.data[t]) : this.data && this.data[t] || null } setval(t, e) { return this.isSurge() || this.isLoon() ? $persistentStore.write(t, e) : this.isQuanX() ? $prefs.setValueForKey(t, e) : this.isNode() ? (this.data = this.loaddata(), this.data[e] = t, this.writedata(), !0) : this.data && this.data[e] || null } initGotEnv(t) { this.got = this.got ? this.got : require("got"), this.cktough = this.cktough ? this.cktough : require("tough-cookie"), this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar, t && (t.headers = t.headers ? t.headers : {}, void 0 === t.headers.Cookie && void 0 === t.cookieJar && (t.cookieJar = this.ckjar)) } get(t, e = (() => { })) { t.headers && (delete t.headers["Content-Type"], delete t.headers["Content-Length"]), this.isSurge() || this.isLoon() ? (this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.get(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) })) : this.isQuanX() ? (this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t))) : this.isNode() && (this.initGotEnv(t), this.got(t).on("redirect", (t, e) => { try { if (t.headers["set-cookie"]) { const s = t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString(); s && this.ckjar.setCookieSync(s, null), e.cookieJar = this.ckjar } } catch (t) { this.logErr(t) } }).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) })) } post(t, e = (() => { })) { if (t.body && t.headers && !t.headers["Content-Type"] && (t.headers["Content-Type"] = "application/x-www-form-urlencoded"), t.headers && delete t.headers["Content-Length"], this.isSurge() || this.isLoon()) this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.post(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) }); else if (this.isQuanX()) t.method = "POST", this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t)); else if (this.isNode()) { this.initGotEnv(t); const { url: s, ...i } = t; this.got.post(s, i).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) }) } } time(t, e = null) { const s = e ? new Date(e) : new Date; let i = { "M+": s.getMonth() + 1, "d+": s.getDate(), "H+": s.getHours(),"h+": s.getHours(), "m+": s.getMinutes(), "s+": s.getSeconds(), "q+": Math.floor((s.getMonth() + 3) / 3), "S+": s.getMilliseconds() }; /(y+)/.test(t) && (t = t.replace(RegExp.$1, (s.getFullYear() + "").substr(4 - RegExp.$1.length))); for (let e in i) new RegExp("(" + e + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? i[e] : ("00" + i[e]).substr(("" + i[e]).length))); return t } msg(e = t, s = "", i = "", r) { const o = t => { if (!t) return t; if ("string" == typeof t) return this.isLoon() ? t : this.isQuanX() ? { "open-url": t } : this.isSurge() ? { url: t } : void 0; if ("object" == typeof t) { if (this.isLoon()) { let e = t.openUrl || t.url || t["open-url"], s = t.mediaUrl || t["media-url"]; return { openUrl: e, mediaUrl: s } } if (this.isQuanX()) { let e = t["open-url"] || t.url || t.openUrl, s = t["media-url"] || t.mediaUrl; return { "open-url": e, "media-url": s } } if (this.isSurge()) { let e = t.url || t.openUrl || t["open-url"]; return { url: e } } } }; if (this.isMute || (this.isSurge() || this.isLoon() ? $notification.post(e, s, i, o(r)) : this.isQuanX() && $notify(e, s, i, o(r))), !this.isMuteLog) { let t = ["", "==============📣系统通知📣=============="]; t.push(e), s && t.push(s), i && t.push(i), console.log(t.join("\n")), this.logs = this.logs.concat(t) } } log(...t) { t.length > 0 && (this.logs = [...this.logs, ...t]), console.log(t.join(this.logSeparator)) } logErr(t, e) { const s = !this.isSurge() && !this.isQuanX() && !this.isLoon(); s ? this.log("", `❗️${this.name}, 错误!`, t.stack) : this.log("", `❗️${this.name}, 错误!`, t) } wait(t) { return new Promise(e => setTimeout(e, t)) } done(t = {}) { const e = (new Date).getTime(), s = (e - this.startTime) / 1e3; this.log("", `🔔${this.name}, 结束! 🕛 ${s} 秒`), this.log(), (this.isSurge() || this.isQuanX() || this.isLoon()) && $done(t) } }(t, e) }
