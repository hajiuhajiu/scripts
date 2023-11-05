/*
1111red
加密
脚本锁佣建议用新的京粉号
https://u.jd.com/xxxxxxx

返利变量：JD_231111_RedRebateCode，若需要返利给自己，请自己修改环境变量[JD_231111_RedRebateCode]
xxxxxxx换成自己的返利 就是链接后面那7位字母
export JD_231111_RedRebateCode="xxxxxxx"

每次脚本领取红包次数
export JD_231111_RedCount="0"
0=不限制 1=领取1次
每个账号之间等待时间单位毫秒 默认15秒
1000=1秒
export JD_231111_RedTimes="15000"
export JD_231111_Red_proxy='' 代理池URL多个请用|隔开
返回的格式为：ip:port
如果有账号密码的话格式为：ip:port:username:password
export JD_231111_proxyReceiveCount='10' 使用代理领取账号大于 10 切换ip 填数字
export JD_231111_Red_taskFlag='true' 执行打卡任务 true=执行 false=不执行 默认执行

30 0,10,20 * * * https://raw.githubusercontent.com/smiek2121/scripts/master/gua_231111_Red.js 1111red

*/

let rebateCodes = ''; // 返利变量
let redTimes = 10000 // 等待时间单位毫秒
let redCount = 0 // 领取次数
let shareHelpCount = 0 // 助力次数 0=默认 1=1次满 2=2次满
let proxyGetIpUrl = '' // // 代理池URL多个请用|隔开
let proxyReceiveCount = 10 // 使用代理领取账号大于 10 切换ip
let taskFlag = true // 执行打卡任务 true=执行 false=不执行



const Env=require('./Env.js');
const $ = new Env('1111red');

const jdCookieNode = $.isNode() ? require('./jdCookie.js') : '';
const notify = $.isNode() ? require('./sendNotify') : ''
$.CryptoJS = require('crypto-js')
//IOS等用户直接用NobyDa的jd cookie
let cookiesArr = [],
    cookie = '';
if ($.isNode()) {
    Object.keys(jdCookieNode).forEach((item) => {
        cookiesArr.push(jdCookieNode[item])
    })
    if (process.env.JD_DEBUG && process.env.JD_DEBUG === 'false') console.log = () => { };
} else {
    cookiesArr = [$.getdata('CookieJD'), $.getdata('CookieJD2'), ...jsonParse($.getdata('CookiesJD') || "[]").map(item => item.cookie)].filter(item => !!item);
}

let liIi111l = "";
if (!rebateCodes) {
  rebateCodes = "https://u.jd.com/08NuJAS";
}
if (!liIi111l) {
  liIi111l = "";
}
rebateCodes = $.isNode() ? process.env.JD_231111_RedRebateCode ? process.env.JD_231111_RedRebateCode : "" + rebateCodes : $.getdata("JD_231111_RedRebateCode") ? $.getdata("JD_231111_RedRebateCode") : "" + rebateCodes;
liIi111l = $.isNode() ? process.env.JD_nhj_rebatePin ? process.env.JD_nhj_rebatePin : "" + liIi111l : $.getdata("JD_nhj_rebatePin") ? $.getdata("JD_nhj_rebatePin") : "" + liIi111l;
redCount = $.isNode() ? process.env.JD_231111_RedCount ? process.env.JD_231111_RedCount : "" + redCount : $.getdata("JD_231111_RedCount") ? $.getdata("JD_231111_RedCount") : "" + redCount;
redTimes = $.isNode() ? process.env.JD_231111_RedTimes ? process.env.JD_231111_RedTimes : "" + redTimes : $.getdata("JD_231111_RedTimes") ? $.getdata("JD_231111_RedTimes") : "" + redTimes;
$.shareCount = $.isNode() ? process.env.JD_nhj_shareHelpCount ? process.env.JD_nhj_shareHelpCount : "" + shareHelpCount : $.getdata("JD_nhj_shareHelpCount") ? $.getdata("JD_nhj_shareHelpCount") : "" + shareHelpCount;
proxyReceiveCount = $.isNode() ? process.env.JD_231111_proxyReceiveCount ? process.env.JD_231111_proxyReceiveCount : "" + proxyReceiveCount : $.getdata("JD_231111_proxyReceiveCount") ? $.getdata("JD_231111_proxyReceiveCount") : "" + proxyReceiveCount;
proxyGetIpUrl = $.isNode() ? process.env.JD_231111_Red_proxy ? process.env.JD_231111_Red_proxy : proxyGetIpUrl : $.getdata("JD_231111_Red_proxy") ? $.getdata("JD_231111_Red_proxy") : proxyGetIpUrl;
taskFlag = $.isNode() ? process.env.JD_231111_Red_taskFlag ? process.env.JD_231111_Red_taskFlag : taskFlag : $.getdata("JD_231111_Red_taskFlag") ? $.getdata("JD_231111_Red_taskFlag") : taskFlag;
$.shareCount = parseInt($.shareCount, 10) || 0;
let i1il1li = liIi111l && liIi111l.split(",") || [],
  lI11l11 = rebateCodes + "";
$.time("yyyy-MM-dd HH:mm:ss");
message = "";
let iiiI1Ili = "";
resMsg = "";
$.uiUpdateTime = "";
$.endFlag = false;
$.runEnd = false;
let i1liIII = {};
$.getH5st_WQ_Arr = {};
$.runArr = {};
let l1l1i1I1 = {};
const ililI1i1 = "2023/11/12 00:00:00+08:00";
let ii11I1ll = new Date().getTime() + new Date().getTimezoneOffset() * 60 * 1000 + 28800000;
$.UVCookieArr = {};
lr = {};
$.UVCookie = "";
let i1IilIIl = "",
  liIIil1 = 4;
redTimes = Number(redTimes);
proxyReceiveCount = Number(proxyReceiveCount);
$.time("yyyy-MM-dd");
const l111iI1I = require("request");
var liii1ili = "";
try {
  liii1ili = require("tunnel");
} catch (ilI111i1) {
  console.log("请安装模块\"tunnel\"\n");
}
var ili11l1 = "";
try {
  var {
    SocksProxyAgent: ili11l1
  } = require("socks-proxy-agent");
} catch (llII11II) {
  console.log("如果有用socks代理请安装模块\"socks-proxy-agent\"\n没有的话请忽略！\n");
}
let iii1i1II = false;
$.proxyArrCount = 20;
$.proxyArrOrder = 0;
$.proxyArrIndex = -1;
if (proxyGetIpUrl) {
  proxyGetIpUrl = proxyGetIpUrl.split("|").map(function (Il1iiii, li1IIIII, Ill1lI11) {
    return {
      url: Il1iiii,
      index: li1IIIII + 1,
      status: true,
      count: 0,
      errorCount: 0
    };
  });
}
$.proxyArrAll = {};
$.proxyArr = {};
proxyGetIpUrl.length > 0 && (iii1i1II = true);
iii1i1II && console.log("开启代理");
$.switchProxies = false;
lllll();
!(async () => {
  if (/https:\/\/u\.jd\.com\/.+/.test(lI11l11)) {
    if (lI11l11.split("/").pop()) {
      lI11l11 = lI11l11.split("/").pop().split("?").shift();
    } else {
      console.log("请填写正确的rebateCode");
      return;
    }
  }
  if (!cookiesArr[0]) {
    $.msg($.name, "【提示】请先获取cookie\n直接使用NobyDa的京东签到获取", "https://bean.m.jd.com/", {
      "open-url": "https://bean.m.jd.com/"
    });
    return;
  }
  if (ii11I1ll > new Date(ililI1i1).getTime()) {
    $.msg($.name, "活动已结束", "请删除此脚本");
    $.setdata("", "JD_231111_Red");
    $.setdata("", "JD_231111_Red_pin");
    return;
  }
  console.log("当前版本：2023年10月25日 V3");
  console.log("返利码：" + lI11l11.replace(/.+(.{3})/, "***$1") + "\n");
  $.shareCodeArr = {};
  $.shareCodePinArr = $.getdata("JD_231111_Red_pin") || {};
  $.shareCode = "";
  $.again = false;
  $.taskPinArr = {};
  if ($.end) {
    return;
  }
  for (let l1Ii11l1 = 0; l1Ii11l1 < cookiesArr.length && !$.runEnd; l1Ii11l1++) {
    if ($.endFlag) {
      break;
    }
    cookie = cookiesArr[l1Ii11l1];
    if (cookie) {
      $.UserName = decodeURIComponent(cookie.match(/pt_pin=([^; ]+)(?=;?)/) && cookie.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
      $.index = l1Ii11l1 + 1;
      if ($.runArr[$.UserName]) {
        continue;
      }
      console.log("\n\n******开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "*********\n");
      let liil11I = 1;
      liIIil1 = 4;
      !cookie.includes("app_open") && (liil11I = 2, liIIil1 = 2);
      typeof $.proxyArr.pin == "object" && $.proxyArr.pin.length >= proxyReceiveCount && ($.switchProxies = true);
      $.eid_token = "";
      await ilI1i1II(true, liil11I);
      await Iiiilil1();
      await I1lliI1();
      if ($.endFlag) {
        break;
      }
    }
    $.setdata($.shareCodePinArr, "JD_231111_Red_pin");
  }
  $.setdata($.shareCodePinArr, "JD_231111_Red_pin");
  if (message) {
    $.msg($.name, "", "红包详情：\n" + message + "\nhttps://u.jd.com/" + lI11l11 + "\n\n跳转到app 可查看助力情况");
    $.isNode();
  }
  message = "";
  if (Object.getOwnPropertyNames($.taskPinArr).length > 0) {
    console.log("\n\n开始做任务");
    iii1i1II = false;
    $.proxyArr = {};
    for (let IiiI111l = 0; IiiI111l < cookiesArr.length; IiiI111l++) {
      cookie = cookiesArr[IiiI111l];
      if (cookie) {
        $.UserName = decodeURIComponent(cookie.match(/pt_pin=([^; ]+)(?=;?)/) && cookie.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
        $.index = IiiI111l + 1;
        if (!$.taskPinArr[$.UserName]) {
          continue;
        }
        console.log("\n\n******开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "*********\n");
        let iIliIIll = 1;
        !cookie.includes("app_open") && (iIliIIll = 2);
        await ilI1i1II(true, iIliIIll);
        await Iiiilil1();
        await llIi11l1();
      }
    }
    if (message) {
      $.msg($.name, "", "任务详情：\n" + message);
      $.isNode();
    }
  }
})().catch(iIl1ill1 => $.logErr(iIl1ill1)).finally(() => {
  $.done();
});
async function I1lliI1(lIilIIl = 0) {
  try {
    lIilIIl == 0 && (l1l1i1I1.c822a = IiIII1ii("c822a", $.UA), await l1l1i1I1.c822a.__genAlgo());
    $.UVCookie = $.UVCookieArr[$.UserName] || "";
    !$.UVCookie && lllll();
    resMsg = "";
    let IIii11II = false,
      ii1i1lll = 0,
      l11IlII = 0,
      i1IIliii = 0;
    $.shareFlag = true;
    do {
      if (l11IlII > 2) {
        ii1i1lll = 0;
      }
      $.flag = 0;
      iiiI1Ili = "";
      $.url1 = "";
      await llliII1();
      if (!$.url1) {
        console.log("获取url1失败");
        $.end = true;
        break;
      }
      $.url2 = "";
      $.UVCookie = i1IilIIl.getUVCookie("", "", $.url1, $.UVCookie);
      $.UVCookieArr[$.UserName] = $.UVCookie + "";
      await IIiiIIil();
      if (!$.url2) {
        console.log("获取不到红包页面");
        break;
      }
      if (!/unionActId=\d+/.test($.url2) && !new RegExp("&d=" + lI11l11).test($.url2)) {
        console.log("改返利url：https://u.jd.com/" + lI11l11 + " 可能不是红包页面");
        $.runEnd = true;
        return;
      }
      if (!$.url2) {
        $.url2 = "https://pro.m.jd.com/mall/active/2ZqeDAGGJtUdE4C38i2EXkXBLLNu/index.html?unionActId=31165&d=" + lI11l11 + "&cu=true&utm_source=kong&utm_medium=jingfen";
      }
      $.actId = $.url2.match(/(https:\/\/\S{3,7}[\.m]{0,}\.jd\.com)/) && $.url2.match(/mall\/active\/([^/]+)\/index\.html/)[1] || "2ZqeDAGGJtUdE4C38i2EXkXBLLNu";
      $.UVCookie = i1IilIIl.getUVCookie("", "", $.url2, $.UVCookie);
      $.origin = $.url2.match(/(https:\/\/\S{3,7}[\.m]{0,}\.jd\.com)/) && $.url2.match(/(https:\/\/\S{3,7}[\.m]{0,}\.jd\.com)/)[1] || "https://pro.m.jd.com";
      $.UVCookieArr[$.UserName] = $.UVCookie + "";
      $.eid = "";
      !$.eid && ($.eid = -1);
      if (lIilIIl == 0) {
        let iiliIIiI = 0,
          IIilIili = true,
          ll11lliI = 0;
        if (Object.getOwnPropertyNames(i1liIII).length > ii1i1lll && $.shareFlag) {
          for (let I1IIIili in i1liIII || {}) {
            if (I1IIIili == $.UserName) {
              $.flag = 1;
              continue;
            }
            if (iiliIIiI == ii1i1lll) {
              $.flag = 0;
              $.shareCode = i1liIII[I1IIIili] || "";
              if ($.shareCodePinArr[I1IIIili] && $.shareCodePinArr[I1IIIili].includes($.UserName)) {
                ll11lliI++;
                continue;
              }
              if ($.shareCode.count >= $.shareCodeArr.shareCount) {
                ll11lliI++;
                continue;
              }
              $.getlj = false;
              if ($.shareCode) {
                console.log("助力[" + I1IIIili + "]");
              }
              let iI1l11l = await llli1111($.shareCode.code, 1);
              if (/重复助力/.test(iI1l11l)) {
                if (!$.shareCodePinArr[I1IIIili]) {
                  $.shareCodePinArr[I1IIIili] = [];
                }
                $.shareCodePinArr[I1IIIili].push($.UserName);
                ii1i1lll--;
                i1IIliii--;
              } else {
                if (/助力/.test(iI1l11l) && /上限/.test(iI1l11l)) {
                  $.shareFlag = false;
                } else {
                  if (!/领取上限/.test(iI1l11l) && $.getlj == true) {
                    if (!$.shareCodePinArr[I1IIIili]) {
                      $.shareCodePinArr[I1IIIili] = [];
                    }
                    !$.shareCodePinArr[I1IIIili].includes($.UserName) && $.shareCodePinArr[I1IIIili].push($.UserName);
                    ii1i1lll--;
                  } else {
                    IIilIili = false;
                  }
                }
              }
            }
            iiliIIiI++;
          }
        }
        IIilIili && ll11lliI == Object.getOwnPropertyNames(i1liIII).length && (IIii11II = true);
        if (iiliIIiI == 0) {
          $.getlj = false;
          let I1iiiI1i = await llli1111("", 1);
          !/领取上限/.test(I1iiiI1i) && $.getlj == true && ii1i1lll--;
        }
        if ($.endFlag) {
          break;
        }
      } else {
        let IlliIIil = await Iiii1lIl();
        if (!$.endFlag && IlliIIil && $.again == false) {
          await iiii1III();
        }
        if ($.again == false) {
          break;
        }
      }
      $.again == true && l11IlII < 1 && (l11IlII++, $.again = false);
      ii1i1lll++;
      i1IIliii++;
      $.flag == 1 && (await $.wait(parseInt(Math.random() * 500 + 100, 10)));
      if (redCount > 0 && redCount <= i1IIliii) {
        break;
      }
    } while ($.flag == 1 && ii1i1lll < 4);
    if ($.endFlag) {
      return;
    }
    resMsg && (message += "【京东账号" + $.index + "】\n" + resMsg);
    IIii11II;
    if (!$.proxyArr.host) {
      let il1I1lII = parseInt(Math.random() * 1000 + redTimes, 10);
      console.log("等待 " + il1I1lII / 1000 + " 秒");
      await $.wait(il1I1lII);
    }
  } catch (Ii1l1II) {
    console.log(Ii1l1II);
  }
}
async function III1Il11(il1IiIi = 0) {
  try {
    let IiIllllI = 2;
    if (il1IiIi == 1) {
      IiIllllI = 1;
    }
    let i1iii1lI = 0;
    for (let liIi11l1 in $.shareCodeArr || {}) {
      if (liIi11l1 === "flag" || liIi11l1 === "updateTime" || liIi11l1 === "shareCount") {
        continue;
      }
      if ($.shareCodeArr[liIi11l1] && $.shareCodeArr.shareCount && $.shareCodeArr[liIi11l1].count < $.shareCodeArr.shareCount) {
        i1iii1lI++;
      }
    }
    for (let ll1iII1l = 0; ll1iII1l < cookiesArr.length && !$.runEnd; ll1iII1l++) {
      cookie = cookiesArr[ll1iII1l];
      if (cookie) {
        $.UserName = decodeURIComponent(cookie.match(/pt_pin=([^; ]+)(?=;?)/) && cookie.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
        if (i1il1li.length > 0 && i1il1li.indexOf($.UserName) == -1 || $.shareCodeArr[$.UserName]) {
          continue;
        }
        $.index = ll1iII1l + 1;
        $.eid_token = "";
        await ilI1i1II();
        await Iiiilil1();
        await I1lliI1(1);
        let lIlII1 = 0;
        for (let Iil11ii1 in $.shareCodeArr || {}) {
          if (Iil11ii1 === "flag" || Iil11ii1 === "updateTime" || Iil11ii1 === "shareCount") {
            continue;
          }
          if ($.shareCodeArr[Iil11ii1] && $.shareCodeArr.shareCount && $.shareCodeArr[Iil11ii1].count < $.shareCodeArr.shareCount) {
            lIlII1++;
          }
        }
        if ($.endFlag || lIlII1 - i1iii1lI >= IiIllllI || $.end) {
          break;
        }
      }
    }
  } catch (IIiIIilI) {
    console.log(IIiIIilI);
  }
  if (Object.getOwnPropertyNames($.shareCodeArr).length > 0) {
    for (let i1ilIIl1 in $.shareCodeArr || {}) {
      if (i1ilIIl1 === "flag" || i1ilIIl1 === "updateTime" || i1ilIIl1 === "shareCount") {
        continue;
      }
      if ($.shareCodeArr[i1ilIIl1]) {
        i1liIII[i1ilIIl1] = $.shareCodeArr[i1ilIIl1];
      }
    }
  }
}
function llli1111(ilII1li = "", II11lII = 1) {
  return new Promise(async lIiIIi11 => {
    $.UVCookie = i1IilIIl.getUVCookie("", "", $.url2, $.UVCookie);
    $.UVCookieArr[$.UserName] = $.UVCookie + "";
    let Ili11l11 = "",
      I11i11il = new Date().getTime() + new Date().getTimezoneOffset() * 60 * 1000 + 28800000;
    const lIIilIi = {
        platform: liIIil1,
        unionActId: "31165",
        actId: $.actId,
        d: lI11l11,
        unionShareId: ilII1li,
        type: II11lII,
        qdPageId: "MO-J2011-1",
        mdClickId: "jxhongbao_ck"
      },
      Ii11i1I1 = {
        appid: "u_hongbao",
        body: JSON.stringify(lIIilIi),
        client: "apple",
        clientVersion: $.UA.split(";")[2] || "1.1.0",
        functionId: "getCoupons"
      };
    let lII11iiI = l1l1i1I1.c822a.__genH5st(Ii11i1I1, $.UserName);
    Ili11l11 = lII11iiI.h5st || "";
    let l11I1l11 = "",
      Iililll = {
        url: "https://api.m.jd.com/api",
        body: "functionId=getCoupons&appid=" + Ii11i1I1.appid + "&_=" + I11i11il + "&loginType=2&body=" + $.toStr(lIIilIi) + "&client=" + Ii11i1I1.client + "&clientVersion=" + Ii11i1I1.clientVersion + "&h5st=" + Ili11l11 + ($.eid_token ? "&x-api-eid-token=" + $.eid_token : ""),
        headers: {
          accept: "*/*",
          "Accept-Language": "zh-cn",
          "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
          Cookie: "__jd_ref_cls=Babel_H5FirstClick; " + $.UVCookie + iiiI1Ili + " " + cookie,
          origin: $.origin,
          Referer: $.origin + "/",
          "User-Agent": $.UA
        },
        timeout: 10000
      };
    Iililll.headers.Cookie = Iililll.headers.Cookie.replace(/;\s*$/, "");
    Iililll.headers.Cookie = Iililll.headers.Cookie.replace(/;([^\s])/g, "; $1");
    if ($.url2) {
      Iililll.headers.Referer = $.url2;
    }
    Iililll = lll111I(Iililll);
    var lI1ll11i = $;
    if (l111iI1I && $.proxyArr.type && $.proxyArr.type == "socks") {
      lI1ll11i = l111iI1I;
    }
    lI1ll11i.post(Iililll, async (i1i1li11, i1ll11iI, l11iii) => {
      try {
        if (i1i1li11) {
          var IiIIlIi1 = lIlIIi1I(i1i1li11, i1ll11iI);
          console.log("" + $.toStr(i1i1li11));
          console.log($.name + " getCoupons API请求失败，请检查网路重试");
          if (IiIIlIi1) {
            await ilI1i1II(false);
            if (!$.switchProxies) {
              await llli1111(...arguments);
            }
          }
        } else {
          let l1ii1i = $.toObj(l11iii, l11iii);
          if (typeof l1ii1i == "object") {
            l1ii1i.msg && (l11I1l11 = l1ii1i.msg, console.log(l1ii1i.msg));
            if (l1ii1i.msg.indexOf("不展示弹层") > -1 && II11lII == 1) {
              $.again = true;
            }
            if (l1ii1i.msg.indexOf("领取上限") === -1 && l1ii1i.msg.indexOf("登录") === -1) {
              if (II11lII == 1) {
                $.flag = 1;
              }
            }
            if (l1ii1i.msg.indexOf("活动已结束") > -1 || l1ii1i.msg.indexOf("活动未开始") > -1) {
              $.endFlag = true;
              return;
            }
            ilII1li && typeof l1ii1i.data !== "undefined" && typeof l1ii1i.data.joinNum !== "undefined" && console.log("当前" + l1ii1i.data.joinSuffix + ":" + l1ii1i.data.joinNum);
            if (l1ii1i.code == 0 && l1ii1i.data) {
              II11lII == 1 && (typeof $.proxyArr.pin == "object" && !$.proxyArr.pin.includes($.UserName) && $.proxyArr.pin.push($.UserName), $.shareCode.count++);
              let llIIil1 = "";
              for (let Iil1llii of l1ii1i.data.couponList) {
                llIIil1 += "" + (llIIil1 ? "\n" : "");
                $.getlj = true;
                if (Iil1llii.type == 1) {
                  llIIil1 += "获得[红包]🧧" + Iil1llii.discount + "元 使用时间:" + $.time("yyyy-MM-dd", Iil1llii.beginTime) + " " + $.time("yyyy-MM-dd", Iil1llii.endTime);
                } else {
                  if (Iil1llii.type == 3) {
                    llIIil1 += "获得[优惠券]🎟️满" + Iil1llii.quota + "减" + Iil1llii.discount + " 使用时间:" + $.time("yyyy-MM-dd", Iil1llii.beginTime) + " " + $.time("yyyy-MM-dd", Iil1llii.endTime);
                  } else {
                    if (Iil1llii.type == 6) {
                      llIIil1 += "获得[打折券]🎫满" + Iil1llii.quota + "打" + Iil1llii.discount * 10 + "折 使用时间:" + $.time("yyyy-MM-dd", Iil1llii.beginTime) + " " + $.time("yyyy-MM-dd", Iil1llii.endTime);
                    } else {
                      if (Iil1llii.type == 17) {
                        llIIil1 += "获得[" + (Iil1llii.shopName || "京东支付立减") + "] " + (Iil1llii.limitStr && Iil1llii.limitStr + " " || "") + "领取之日起" + Iil1llii.limitTime + "天有效";
                      } else {
                        var lliIii1i = "未知";
                        llIIil1 += "获得[" + (Iil1llii.shopName || lliIii1i) + "] " + $.toStr(Iil1llii, Iil1llii);
                      }
                    }
                  }
                }
              }
              llIIil1 && (resMsg += llIIil1 + "\n", console.log(llIIil1));
            }
            if (II11lII == 1 && typeof l1ii1i.data !== "undefined" && typeof l1ii1i.data.groupData !== "undefined" && typeof l1ii1i.data.groupData.groupInfo !== "undefined") {
              var i1ililii = $.time("d", new Date().getTime() + new Date().getTimezoneOffset() * 60 * 1000 + 28800000);
              for (let l1liIIi1 of l1ii1i.data.groupData.groupInfo || []) {
                if (l1liIIi1.status == 2) {
                  console.log("打卡满可以领取" + l1liIIi1.hbPrize + "元红包🧧");
                  await $.wait(parseInt(Math.random() * 2000 + 2000, 10));
                  await llli1111("", 3);
                } else {
                  taskFlag + "" === "true" && l1liIIi1.status == 1 && i1ililii == $.time("d", l1liIIi1.dayTaskStartTime) && !$.taskPinArr[$.UserName] && ($.taskPinArr[$.UserName] = {
                    actId: $.actId,
                    unionActId: "31165",
                    platform: liIIil1,
                    d: lI11l11,
                    origin: $.origin,
                    cookie: "" + $.UVCookie + iiiI1Ili + " " + cookie
                  });
                }
              }
            }
          } else {
            console.log(l11iii);
          }
        }
      } catch (i11lIIIi) {
        $.logErr(i11lIIIi, i1ll11iI);
      } finally {
        lIiIIi11(l11I1l11);
      }
    });
  });
}
function Iiii1lIl(lI1Il1ii = "") {
  let liII1ii = true;
  return new Promise(lIIiIIll => {
    $.UVCookie = i1IilIIl.getUVCookie("", "", $.url2, $.UVCookie);
    $.UVCookieArr[$.UserName] = $.UVCookie + "";
    let lIIliiIl = new Date().getTime() + new Date().getTimezoneOffset() * 60 * 1000 + 28800000;
    var ll1lI1I = {
      actId: $.actId,
      unionActId: "31165",
      platform: liIIil1,
      unionShareId: lI1Il1ii,
      uiUpdateTime: $.uiUpdateTime,
      d: lI11l11,
      callType: 2
    };
    let i111iili = {
      url: "https://api.m.jd.com/api?functionId=showCoupon&appid=u_hongbao&_=" + lIIliiIl + "&loginType=2&body=" + $.toStr(ll1lI1I) + "&client=apple&clientVersion=" + ($.UA.split(";")[2] || "1.1.0") + ($.eid_token ? "&x-api-eid-token=" + $.eid_token : ""),
      headers: {
        accept: "*/*",
        "Accept-Language": "zh-cn",
        Cookie: "" + $.UVCookie + iiiI1Ili + " " + cookie,
        origin: $.origin,
        Referer: $.origin + "/",
        "User-Agent": $.UA
      },
      timeout: 10000
    };
    i111iili.headers.Cookie = i111iili.headers.Cookie.replace(/;\s*$/, "");
    i111iili.headers.Cookie = i111iili.headers.Cookie.replace(/;([^\s])/g, "; $1");
    if ($.url2) {
      i111iili.headers.Referer = $.url2;
    }
    i111iili = lll111I(i111iili);
    var IIIIl1lI = $;
    if (l111iI1I && $.proxyArr.type && $.proxyArr.type == "socks") {
      IIIIl1lI = l111iI1I;
    }
    IIIIl1lI.get(i111iili, async (Iill1I1i, l1i1i11, ilIi1ili) => {
      try {
        if (Iill1I1i) {
          var l1iliIi = lIlIIi1I(Iill1I1i, l1i1i11);
          console.log("" + $.toStr(Iill1I1i));
          console.log($.name + " showCoupon API请求失败，请检查网路重试");
          if (l1iliIi) {
            await ilI1i1II(false);
            if (!$.switchProxies) {
              await Iiii1lIl(...arguments);
            }
          }
        } else {
          let i1il1II = $.toObj(ilIi1ili, ilIi1ili);
          if (typeof i1il1II == "object") {
            if (i1il1II.msg) {
              console.log(i1il1II.msg);
            }
            if (i1il1II.msg.indexOf("不展示弹层") > -1) {
              $.again = true;
            }
            if (i1il1II.msg.indexOf("领取上限") > -1) {
              $.runArr[$.UserName] = true;
            }
            i1il1II.msg.indexOf("上限") === -1 && i1il1II.msg.indexOf("登录") === -1 && ($.flag = 1);
            if (i1il1II.msg.indexOf("活动已结束") > -1 || i1il1II.msg.indexOf("活动未开始") > -1) {
              $.endFlag = true;
              return;
            }
            if (i1il1II.data.uiUpdateTime) {
              $.uiUpdateTime = i1il1II.data.uiUpdateTime;
            }
            if (typeof i1il1II.data !== "undefined" && typeof i1il1II.data.groupData !== "undefined" && typeof i1il1II.data.groupData.joinNum !== "undefined") {
              $.joinNum = i1il1II.data.groupData.joinNum;
              let l1I1Ilil = 0;
              for (let ii11ili1 of i1il1II.data.groupData.groupInfo) {
                if (l1I1Ilil < ii11ili1.num) {
                  l1I1Ilil = ii11ili1.num;
                }
              }
              if ($.shareCount > 0 && l1I1Ilil > $.shareCount) {
                l1I1Ilil = $.shareCount;
              }
              $.shareCodeArr[$.UserName] && ($.shareCodeArr[$.UserName].count = l1I1Ilil);
              $.shareCodeArr.shareCount = l1I1Ilil;
              if (l1I1Ilil <= $.joinNum) {
                if (!$.shareCodeArr[$.UserName]) {
                  $.shareCodeArr[$.UserName] = {};
                }
                $.shareCodeArr[$.UserName].count = $.joinNum;
                liII1ii = false;
              }
              console.log("【账号" + $.index + "】" + ($.nickName || $.UserName) + " " + $.joinNum + "/" + l1I1Ilil + "人");
            }
            i1il1II.msg.indexOf("活动已结束") > -1 && (liII1ii = false);
            if (typeof i1il1II.data !== "undefined" && typeof i1il1II.data.groupData !== "undefined" && typeof i1il1II.data.groupData.groupInfo !== "undefined") {
              var illIIIi1 = $.time("d", new Date().getTime() + new Date().getTimezoneOffset() * 60 * 1000 + 28800000);
              for (let IlIi11ll of i1il1II.data.groupData.groupInfo || []) {
                if (IlIi11ll.status == 2) {
                  console.log("打卡满可以领取" + IlIi11ll.hbPrize + "元红包🧧");
                  await $.wait(parseInt(Math.random() * 2000 + 2000, 10));
                  await llli1111("", 3);
                } else {
                  taskFlag + "" === "true" && IlIi11ll.status == 1 && illIIIi1 == $.time("d", IlIi11ll.dayTaskStartTime) && !$.taskPinArr[$.UserName] && ($.taskPinArr[$.UserName] = {
                    actId: $.actId,
                    unionActId: "31165",
                    platform: liIIil1,
                    d: lI11l11,
                    origin: $.origin,
                    cookie: "" + $.UVCookie + iiiI1Ili + " " + cookie
                  });
                }
              }
            }
          } else {
            console.log(ilIi1ili);
          }
        }
      } catch (IIilIIlI) {
        $.logErr(IIilIIlI, l1i1i11);
      } finally {
        lIIiIIll(liII1ii);
      }
    });
  });
}
function iiii1III() {
  if ($.shareCodeArr[$.UserName]) {
    console.log("【账号" + $.index + "】缓存分享码:" + $.shareCodeArr[$.UserName].code.replace(/.+(.{3})/, "***$1"));
    return;
  }
  return new Promise(async I1IiIIII => {
    let iiilIi11 = "",
      i1liIll1 = new Date().getTime() + new Date().getTimezoneOffset() * 60 * 1000 + 28800000;
    const lilll = {
        unionActId: "31165",
        actId: $.actId,
        platform: liIIil1,
        unionShareId: "",
        d: lI11l11,
        supportPic: 2
      },
      lII1lI1I = {
        appid: "u_hongbao",
        body: JSON.stringify(lilll),
        client: "apple",
        clientVersion: $.UA.split(";")[2] || "1.1.0",
        functionId: "shareUnionCoupon"
      };
    l1l1i1I1.c10dc = IiIII1ii("c10dc", $.UA);
    await l1l1i1I1.c10dc.__genAlgo();
    let i11l1i1I = l1l1i1I1.c10dc.__genH5st(lII1lI1I, $.UserName);
    iiilIi11 = i11l1i1I.h5st || "";
    let IiIlll1 = {
      url: "https://api.m.jd.com/api?functionId=shareUnionCoupon&appid=" + lII1lI1I.appid + "&_=" + i1liIll1 + "&loginType=2&body=" + $.toStr(lilll) + "&client=" + lII1lI1I.client + "&clientVersion=" + lII1lI1I.clientVersion + "&h5st=" + iiilIi11 + ($.eid_token ? "&x-api-eid-token=" + $.eid_token : ""),
      headers: {
        accept: "*/*",
        "Accept-Language": "zh-cn",
        Cookie: "" + $.UVCookie + iiiI1Ili + " " + cookie,
        origin: $.origin,
        Referer: $.origin + "/",
        "User-Agent": $.UA
      },
      timeout: 10000
    };
    IiIlll1.headers.Cookie = IiIlll1.headers.Cookie.replace(/;\s*$/, "");
    IiIlll1.headers.Cookie = IiIlll1.headers.Cookie.replace(/;([^\s])/g, "; $1");
    IiIlll1 = lll111I(IiIlll1);
    var IlIli1i1 = $;
    if (l111iI1I && $.proxyArr.type && $.proxyArr.type == "socks") {
      IlIli1i1 = l111iI1I;
    }
    IlIli1i1.get(IiIlll1, async (I11111li, llliIl, liiIl11l) => {
      try {
        if (I11111li) {
          var i1ili11l = lIlIIi1I(I11111li, llliIl);
          console.log("" + $.toStr(I11111li));
          console.log($.name + " shareUnionCoupon API请求失败，请检查网路重试");
          if (i1ili11l) {
            await ilI1i1II(false);
            if (!$.switchProxies) {
              await iiii1III();
            }
          }
        } else {
          let l1lIIii1 = $.toObj(liiIl11l, liiIl11l);
          if (typeof l1lIIii1 == "object") {
            if (l1lIIii1.code == 0 && l1lIIii1.data && l1lIIii1.data.shareUrl) {
              let IIliliI = l1lIIii1.data.shareUrl.match(/\?s=([^&]+)/) && l1lIIii1.data.shareUrl.match(/\?s=([^&]+)/)[1] || "";
              IIliliI && (console.log("【账号" + $.index + "】分享码：" + IIliliI.replace(/.+(.{3})/, "***$1")), $.shareCodeArr[$.UserName] = {
                code: IIliliI,
                count: $.joinNum
              });
            }
          } else {
            console.log(liiIl11l);
          }
        }
      } catch (lIIiIl1i) {
        $.logErr(lIIiIl1i, llliIl);
      } finally {
        I1IiIIII();
      }
    });
  });
}
function IIiiIIil() {
  return new Promise(iIll1Ii => {
    let il1llII1 = {
      url: $.url1,
      followRedirect: false,
      headers: {
        Cookie: "" + $.UVCookie + iiiI1Ili + " " + cookie,
        "User-Agent": $.UA
      },
      timeout: 10000
    };
    var illIIi1 = $;
    illIIi1.get(il1llII1, async (IIIIIl11, ilI1l1Il, I111IIli) => {
      try {
        if (IIIIIl11) {
          var i1ilIil1 = lIlIIi1I(IIIIIl11, ilI1l1Il);
          console.log("" + $.toStr(IIIIIl11));
          console.log($.name + " getUrl1 API请求失败，请检查网路重试");
          if (i1ilIil1) {
            await ilI1i1II(false);
            if (!$.switchProxies) {
              await IIiiIIil();
            }
          }
        } else {
          i11l1lII(ilI1l1Il);
          $.url2 = ilI1l1Il && ilI1l1Il.headers && (ilI1l1Il.headers.location || ilI1l1Il.headers.Location || "") || "";
          $.url2 = decodeURIComponent($.url2);
          $.url2 = $.url2.match(/(https:\/\/\S{3,7}[\.m]{0,}\.jd\.com\/mall[^'"]+)/) && $.url2.match(/(https:\/\/\S{3,7}[\.m]{0,}\.jd\.com\/mall[^'"]+)/)[1] || "";
        }
      } catch (lIilIi1l) {
        $.logErr(lIilIi1l, ilI1l1Il);
      } finally {
        iIll1Ii(I111IIli);
      }
    });
  });
}
function llliII1() {
  return new Promise(iiill111 => {
    let I1liIiil = {
      url: "https://u.jd.com/" + lI11l11 + ($.shareCode && "?s=" + $.shareCode || ""),
      followRedirect: false,
      headers: {
        Cookie: "" + $.UVCookie + iiiI1Ili + " " + cookie,
        "User-Agent": $.UA
      },
      timeout: 10000
    };
    var IIi11Ii = $;
    IIi11Ii.get(I1liIiil, async (il1iII, l1I1iil1, Ii11i11) => {
      try {
        if (il1iII) {
          var I1iiIIi1 = lIlIIi1I(il1iII, l1I1iil1);
          console.log("" + $.toStr(il1iII));
          console.log($.name + " getUrl API请求失败，请检查网路重试");
          if (I1iiIIi1) {
            await ilI1i1II(false);
            if (!$.switchProxies) {
              await llliII1();
            }
          }
        } else {
          i11l1lII(l1I1iil1);
          $.url1 = Ii11i11 && Ii11i11.match(/(https:\/\/u\.jd\.com\/jda[^']+)/) && Ii11i11.match(/(https:\/\/u\.jd\.com\/jda[^']+)/)[1] || "";
        }
      } catch (II1lil1i) {
        $.logErr(II1lil1i, l1I1iil1);
      } finally {
        iiill111(Ii11i11);
      }
    });
  });
}
async function llIi11l1() {
  l1l1i1I1["7b74b"] = IiIII1ii("7b74b", $.UA);
  await l1l1i1I1["7b74b"].__genAlgo();
  resMsg = "";
  await liii1iIi();
  resMsg && (message += "【京东账号" + $.index + "】\n" + resMsg);
}
function liii1iIi() {
  return new Promise(iliil1il => {
    var II11lIii = {
      actId: $.taskPinArr[$.UserName].actId,
      unionActId: $.taskPinArr[$.UserName].unionActId,
      platform: $.taskPinArr[$.UserName].platform,
      d: $.taskPinArr[$.UserName].d,
      taskType: 1,
      prstate: 0
    };
    let il1i1I = "",
      iil1l1l1 = new Date().getTime() + new Date().getTimezoneOffset() * 60 * 1000 + 28800000;
    const i1ll1i11 = {
      appid: "u_hongbao",
      body: JSON.stringify(II11lIii),
      client: "apple",
      clientVersion: $.UA.split(";")[2] || "1.1.0",
      functionId: "queryFullGroupInfoMap"
    };
    let lll1i11 = l1l1i1I1["7b74b"].__genH5st(i1ll1i11, $.UserName);
    il1i1I = lll1i11.h5st || "";
    let i1iI1IIi = "https://api.m.jd.com/api?functionId=queryFullGroupInfoMap&appid=" + i1ll1i11.appid + "&_=" + iil1l1l1 + "&loginType=2&body=" + $.toStr(II11lIii) + "&client=" + i1ll1i11.client + "&clientVersion=" + i1ll1i11.clientVersion + "&h5st=" + il1i1I + ($.eid_token ? "&x-api-eid-token=" + $.eid_token : ""),
      lIillI11 = {
        url: i1iI1IIi,
        headers: {
          accept: "*/*",
          "Accept-Language": "zh-cn",
          Cookie: $.taskPinArr[$.UserName].cookie,
          origin: $.taskPinArr[$.UserName].origin,
          Referer: $.taskPinArr[$.UserName].origin + "/",
          "User-Agent": $.UA
        },
        timeout: 10000
      };
    var iI1i1i1l = $;
    iI1i1i1l.get(lIillI11, async (iillilI, I11Il1Ii, IIiilIIl) => {
      try {
        if (iillilI) {
          console.log("" + $.toStr(iillilI));
          console.log($.name + " dotask API请求失败，请检查网路重试");
        } else {
          var l1l111l1 = $.toObj(IIiilIIl, IIiilIIl);
          if (l1l111l1.code == 200 && l1l111l1.data) {
            if (l1l111l1.data.dayGroupData && l1l111l1.data.dayGroupData.groupInfo.length > 0) {
              var II1IiiI1 = l1l111l1.data.dayGroupData.groupInfo,
                llil11 = 0;
              for (let Iii1llll of II1IiiI1) {
                if (Iii1llll.taskType == 2 && Iii1llll.status == 2) {
                  llil11++;
                  console.log("领取邀请 " + Number(Iii1llll.joinNum) + " 人奖励");
                  await lI1iIIIl("", 2);
                  await $.wait(2000);
                } else {
                  if (Iii1llll.taskType == 100 && (Iii1llll.status == 1 || Iii1llll.status == 2)) {
                    Iii1llll.status == 1 && (console.log("做任务", Iii1llll.showInfo), await li1ilII("", Iii1llll.taskId), await $.wait(2000));
                    console.log("抽奖", Iii1llll.showInfo);
                    await lI1iIIIl("", 8, Iii1llll.taskId);
                    await $.wait(2000);
                  } else {
                    if (Iii1llll.adId && Iii1llll.status == 1) {
                      console.log("做任务", Iii1llll.showInfo, Iii1llll.taskId);
                      await lIIliI1I(Iii1llll.projectId, Iii1llll.taskId);
                      await $.wait(6000);
                      await ll11lll(Iii1llll.projectId, Iii1llll.taskId, Iii1llll.adInfo.target_url);
                      await $.wait(2000);
                    } else {
                      llil11++;
                    }
                  }
                }
              }
              llil11 >= II1IiiI1.length && console.log("任务已经做完了");
            } else {
              console.log("获取不到任务");
            }
          } else {
            console.log(l1l111l1);
          }
        }
      } catch (IiiI1iII) {
        $.logErr(IiiI1iII, I11Il1Ii);
      } finally {
        iliil1il(IIiilIIl);
      }
    });
  });
}
function li1ilII(lIi1lili, lliIlIi) {
  return new Promise(async liliII1I => {
    let lIIIi11I = "",
      I1Il111i = new Date().getTime() + new Date().getTimezoneOffset() * 60 * 1000 + 28800000;
    const lil1ll1 = {
        unionActId: "31165",
        actId: $.taskPinArr[$.UserName].actId,
        platform: $.taskPinArr[$.UserName].platform,
        unionShareId: lIi1lili,
        d: lI11l11,
        supportPic: 2,
        taskId: lliIlIi
      },
      iIl1Il1i = {
        appid: "u_hongbao",
        body: JSON.stringify(lil1ll1),
        client: "apple",
        clientVersion: $.UA.split(";")[2] || "1.1.0",
        functionId: "shareUnionCoupon"
      };
    l1l1i1I1.c10dc = IiIII1ii("c10dc", $.UA);
    await l1l1i1I1.c10dc.__genAlgo();
    let lI1Ili1 = l1l1i1I1.c10dc.__genH5st(iIl1Il1i, $.UserName);
    lIIIi11I = lI1Ili1.h5st || "";
    let lI11lilI = {
      url: "https://api.m.jd.com/api?functionId=shareUnionCoupon&appid=" + iIl1Il1i.appid + "&_=" + I1Il111i + "&loginType=2&body=" + $.toStr(lil1ll1) + "&client=" + iIl1Il1i.client + "&clientVersion=" + iIl1Il1i.clientVersion + "&h5st=" + lIIIi11I + ($.eid_token ? "&x-api-eid-token=" + $.eid_token : ""),
      headers: {
        accept: "*/*",
        "Accept-Language": "zh-cn",
        Cookie: "__jd_ref_cls=hongbao_quyaoqing_ck; " + $.taskPinArr[$.UserName].cookie,
        origin: $.taskPinArr[$.UserName].origin,
        Referer: $.taskPinArr[$.UserName].origin + "/",
        "User-Agent": $.UA
      },
      timeout: 10000
    };
    lI11lilI.headers.Cookie = lI11lilI.headers.Cookie.replace(/;\s*$/, "");
    lI11lilI.headers.Cookie = lI11lilI.headers.Cookie.replace(/;([^\s])/g, "; $1");
    var iI1l1Iii = $;
    iI1l1Iii.get(lI11lilI, async (lll1Ii1, li1li1Ii, iIi11i1I) => {
      try {
        if (lll1Ii1) {
          console.log("" + $.toStr(lll1Ii1));
          console.log($.name + " doTaskUnionShare API请求失败，请检查网路重试");
        } else {
          let Il11ilIl = $.toObj(iIi11i1I, iIi11i1I);
          if (!(typeof Il11ilIl == "object")) {
            console.log(iIi11i1I);
          }
        }
      } catch (ii11i11i) {
        $.logErr(ii11i11i, li1li1Ii);
      } finally {
        liliII1I();
      }
    });
  });
}
function lI1iIIIl(iiii1Ii1 = "", lI11ii1 = 8, ii11ii1 = "") {
  return new Promise(async iIlli1I1 => {
    let l1llii1l = "",
      ilillliI = new Date().getTime() + new Date().getTimezoneOffset() * 60 * 1000 + 28800000;
    var li1ll1Il = {
      platform: $.taskPinArr[$.UserName].platform,
      unionActId: "31165",
      actId: $.taskPinArr[$.UserName].actId,
      d: lI11l11,
      unionShareId: iiii1Ii1,
      type: lI11ii1,
      qdPageId: "MO-J2011-1",
      mdClickId: "jxhongbao_ck"
    };
    ii11ii1 && (li1ll1Il.taskId = ii11ii1, li1ll1Il.agreeState = 1);
    const iilIIIli = {
      appid: "u_hongbao",
      body: JSON.stringify(li1ll1Il),
      client: "apple",
      clientVersion: $.UA.split(";")[2] || "1.1.0",
      functionId: "getCoupons"
    };
    l1l1i1I1.c822a = IiIII1ii("c822a", $.UA);
    await l1l1i1I1.c822a.__genAlgo();
    let liIiI = l1l1i1I1.c822a.__genH5st(iilIIIli, $.UserName);
    l1llii1l = liIiI.h5st || "";
    let ll11I1l = "",
      lIlII1i1 = {
        url: "https://api.m.jd.com/api",
        body: "functionId=getCoupons&appid=" + iilIIIli.appid + "&_=" + ilillliI + "&loginType=2&body=" + $.toStr(li1ll1Il) + "&client=" + iilIIIli.client + "&clientVersion=" + iilIIIli.clientVersion + "&h5st=" + l1llii1l + ($.eid_token ? "&x-api-eid-token=" + $.eid_token : ""),
        headers: {
          accept: "*/*",
          "Accept-Language": "zh-cn",
          "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
          Cookie: "__jd_ref_cls=hongbao_shiyongpinquchoujiang_ck; " + $.taskPinArr[$.UserName].cookie,
          origin: $.taskPinArr[$.UserName].origin,
          Referer: $.taskPinArr[$.UserName].origin + "/",
          "User-Agent": $.UA
        },
        timeout: 10000
      };
    lIlII1i1.headers.Cookie = lIlII1i1.headers.Cookie.replace(/;\s*$/, "");
    lIlII1i1.headers.Cookie = lIlII1i1.headers.Cookie.replace(/;([^\s])/g, "; $1");
    var III1li = $;
    III1li.post(lIlII1i1, async (l1i1Iii, iiiIi1lI, il11liI1) => {
      try {
        if (l1i1Iii) {
          console.log("" + $.toStr(l1i1Iii));
          console.log($.name + " doTaskGetCoupons API请求失败，请检查网路重试");
        } else {
          let il1ili1i = $.toObj(il11liI1, il11liI1);
          if (typeof il1ili1i == "object") {
            il1ili1i.msg && (ll11I1l = il1ili1i.msg, console.log(il1ili1i.msg));
            if (il1ili1i.code == 0 && il1ili1i.data) {
              let I1lIllI1 = "";
              for (let i1i11II1 of il1ili1i.data.couponList) {
                I1lIllI1 += "" + (I1lIllI1 ? "\n" : "");
                $.getlj = true;
                if (i1i11II1.type == 1) {
                  I1lIllI1 += "获得[红包]🧧" + i1i11II1.discount + "元 使用时间:" + $.time("yyyy-MM-dd", i1i11II1.beginTime) + " " + $.time("yyyy-MM-dd", i1i11II1.endTime);
                } else {
                  if (i1i11II1.type == 3) {
                    I1lIllI1 += "获得[优惠券]🎟️满" + i1i11II1.quota + "减" + i1i11II1.discount + " 使用时间:" + $.time("yyyy-MM-dd", i1i11II1.beginTime) + " " + $.time("yyyy-MM-dd", i1i11II1.endTime);
                  } else {
                    if (i1i11II1.type == 6) {
                      I1lIllI1 += "获得[打折券]🎫满" + i1i11II1.quota + "打" + i1i11II1.discount * 10 + "折 使用时间:" + $.time("yyyy-MM-dd", i1i11II1.beginTime) + " " + $.time("yyyy-MM-dd", i1i11II1.endTime);
                    } else {
                      if (i1i11II1.type == 17) {
                        I1lIllI1 += "获得[" + (i1i11II1.shopName || "京东支付立减") + "] " + (i1i11II1.limitStr && i1i11II1.limitStr + " " || "") + "领取之日起" + i1i11II1.limitTime + "天有效";
                      } else {
                        var IiI1i = "未知";
                        I1lIllI1 += "获得[" + (i1i11II1.shopName || IiI1i) + "] " + $.toStr(i1i11II1, i1i11II1);
                      }
                    }
                  }
                }
              }
              I1lIllI1 && (resMsg += I1lIllI1 + "\n", console.log(I1lIllI1));
            }
          } else {
            console.log(il11liI1);
          }
        }
      } catch (ii1Iii1l) {
        $.logErr(ii1Iii1l, iiiIi1lI);
      } finally {
        iIlli1I1(ll11I1l);
      }
    });
  });
}
function lIIliI1I(iIili1il, lII1lIIl) {
  return new Promise(IlIli1l1 => {
    var Ii1l1Il = {
      encryptProjectId: iIili1il,
      encryptAssignmentId: lII1lIIl,
      sourceCode: "ace36658",
      actionType: 1,
      itemId: "1"
    };
    let lIIl1I = "",
      Ililllll = new Date().getTime() + new Date().getTimezoneOffset() * 60 * 1000 + 28800000;
    const l1iilii = {
      appid: "u_hongbao",
      body: JSON.stringify(Ii1l1Il),
      client: "apple",
      clientVersion: $.UA.split(";")[2] || "1.1.0",
      functionId: "doInteractiveAssignment"
    };
    let l1iii11 = l1l1i1I1["7b74b"].__genH5st(l1iilii, $.UserName);
    lIIl1I = l1iii11.h5st || "";
    let iIIil1 = "https://api.m.jd.com/api?functionId=doInteractiveAssignment&appid=" + l1iilii.appid + "&_=" + Ililllll + "&loginType=2&body=" + $.toStr(Ii1l1Il) + "&client=" + l1iilii.client + "&clientVersion=" + l1iilii.clientVersion + "&h5st=" + lIIl1I + ($.eid_token ? "&x-api-eid-token=" + $.eid_token : ""),
      I11ii1il = {
        url: iIIil1,
        headers: {
          accept: "*/*",
          "Accept-Language": "zh-cn",
          Cookie: $.taskPinArr[$.UserName].cookie,
          origin: $.taskPinArr[$.UserName].origin,
          Referer: $.taskPinArr[$.UserName].origin + "/",
          "User-Agent": $.UA
        },
        timeout: 10000
      };
    var ii1iiii1 = $;
    ii1iiii1.get(I11ii1il, async (I1ill1, llili111, iIlIl) => {
      try {
        if (I1ill1) {
          console.log("" + $.toStr(I1ill1));
          console.log($.name + " dotask API请求失败，请检查网路重试");
        } else {
          var IiliIIi = $.toObj(iIlIl, iIlIl);
          IiliIIi.code == 0 ? console.log(IiliIIi.msg) : console.log(IiliIIi);
        }
      } catch (il111liI) {
        $.logErr(il111liI, llili111);
      } finally {
        IlIli1l1(iIlIl);
      }
    });
  });
}
function ll11lll(IlIilliI, ill1liIi, lllli1I) {
  return new Promise(lI11l11i => {
    var i1111l11 = "{\"dataSource\":\"babelInteractive\",\"method\":\"customDoInteractiveAssignmentForBabel\",\"reqParams\":\"{\\\"itemId\\\":\\\"1\\\",\\\"encryptProjectId\\\":\\\"" + IlIilliI + "\\\",\\\"encryptAssignmentId\\\":\\\"" + ill1liIi + "\\\"}\",\"sdkVersion\":\"1.0.0\",\"clientLanguage\":\"zh\"}";
    let II1I1Iil = new Date().getTime() + new Date().getTimezoneOffset() * 60 * 1000 + 28800000,
      Ill1lili = "https://api.m.jd.com/?client=wh5&clientVersion=1.0.0&functionId=qryViewkitCallbackResult&body=" + i1111l11 + "&_timestamp=" + II1I1Iil;
    origin = lllli1I.match(/(https:\/\/\S{3,7}[\.m]{0,}\.jd\.com)/) && lllli1I.match(/(https:\/\/\S{3,7}[\.m]{0,}\.jd\.com)/)[1] || "";
    let I1Ii1iil = {
      url: Ill1lili,
      headers: {
        accept: "*/*",
        "Accept-Language": "zh-cn",
        Cookie: $.taskPinArr[$.UserName].cookie,
        origin: origin,
        Referer: lllli1I,
        "User-Agent": $.UA
      },
      timeout: 10000
    };
    var ilil1l1 = $;
    ilil1l1.get(I1Ii1iil, async (l1l1IiIl, lIi1l11I, liIiliIi) => {
      try {
        if (l1l1IiIl) {
          console.log("" + $.toStr(l1l1IiIl));
          console.log($.name + " callbackResult API请求失败，请检查网路重试");
        } else {
          var I111lIII = $.toObj(liIiliIi, liIiliIi);
          I111lIII.code == 0 ? console.log(I111lIII.msg) : console.log(I111lIII);
        }
      } catch (iii1liil) {
        $.logErr(iii1liil, lIi1l11I);
      } finally {
        lI11l11i(liIiliIi);
      }
    });
  });
}
function i11l1lII(IiiIiIii) {
  let il1I111I = IiiIiIii && IiiIiIii.headers && (IiiIiIii.headers["set-cookie"] || IiiIiIii.headers["Set-Cookie"] || "") || "",
    Ii1lI1i = "";
  if (il1I111I) {
    if (typeof il1I111I != "object") {
      Ii1lI1i = il1I111I.split(",");
    } else {
      Ii1lI1i = il1I111I;
    }
    for (let ii111lII of Ii1lI1i) {
      let liliI11I = ii111lII.split(";")[0].trim();
      if (liliI11I.split("=")[1]) {
        liliI11I.split("=")[0] == "unpl" && liliI11I.split("=")[1] && ($.unpl = liliI11I.split("=")[1]);
        if (iiiI1Ili.indexOf(liliI11I.split("=")[1]) == -1) {
          iiiI1Ili += liliI11I.replace(/ /g, "") + "; ";
        }
      }
    }
  }
}
function lIlIIi1I(IlIIiIIl, ilIl1lIi) {
  var i1IIilI1 = false;
  if (iii1i1II) {
    if (/statusCode=407/.test(IlIIiIIl)) {
      console.log("代理连接失败");
      i1IIilI1 = true;
      if ($.getProxyIp) {
        for (let i11l11I1 of proxyGetIpUrl) {
          if (!i11l11I1 || i11l11I1.status == false) {
            continue;
          }
          if (i11l11I1.proxyArr && i11l11I1.proxyArr.host == $.proxyArr.host && i11l11I1.proxyArr.port == $.proxyArr.port) {
            i11l11I1.errorCount++;
            i11l11I1.errorCount >= 3 && (console.log("代理池(" + i11l11I1.index + ")请求多次失败，禁用"), i11l11I1.status = false);
            break;
          }
        }
      }
    } else {
      if (/ESOCKETTIMEDOUT|Timeout awaiting|ETIMEDOUT/.test(IlIIiIIl)) {
        console.log("请求超时");
        i1IIilI1 = true;
      } else {
        /socket|connect ECONNREFUSED/.test(IlIIiIIl) && (console.log("代理连接失败"), i1IIilI1 = true);
      }
    }
  }
  i1IIilI1 && ($.switchProxies = true);
  return i1IIilI1;
}
function lll111I(IiIillil) {
  if ($.proxyArr.host && $.proxyArr.port) {
    if ($.proxyArr.type == "socks") {
      var iIliIII1 = $.proxyArr.type == "socks" ? "socks5" : "http";
      let ll11iliI = iIliIII1 + "://" + ($.proxyArr.auth && $.proxyArr.auth.username ? $.proxyArr.auth.username + ":" + $.proxyArr.auth.password + "@" : "") + $.proxyArr.host + ":" + $.proxyArr.port;
      if (iIliIII1 == "http") {
        Object.assign(IiIillil, {
          proxy: ll11iliI
        });
      } else {
        if (ili11l1) {
          const II1iliii = new ili11l1(ll11iliI);
          Object.assign(IiIillil, {
            agent: II1iliii
          });
        }
      }
      delete IiIillil.headers["Accept-Encoding"];
    } else {
      const IIilillI = {
        http: liii1ili.httpsOverHttp({
          proxy: {
            host: $.proxyArr.host,
            port: $.proxyArr.port * 1,
            proxyAuth: $.proxyArr.auth && $.proxyArr.auth.username ? $.proxyArr.auth.username + ":" + $.proxyArr.auth.password : ""
          }
        }),
        https: liii1ili.httpsOverHttp({
          proxy: {
            host: $.proxyArr.host,
            port: $.proxyArr.port * 1,
            proxyAuth: $.proxyArr.auth && $.proxyArr.auth.username ? $.proxyArr.auth.username + ":" + $.proxyArr.auth.password : ""
          }
        })
      };
      Object.assign(IiIillil, {
        agent: IIilillI
      });
    }
    Object.assign(IiIillil, {
      retry: {
        limit: 0
      }
    });
  }
  return IiIillil;
}
function I11i1lIi(lIiiIiI) {
  if (lIiiIiI.status == false) {
    return true;
  }
  lIiiIiI.count++;
  return new Promise(IIiliil1 => {
    let ii1lii1I = true;
    $.get({
      url: lIiiIiI.url,
      timeout: 10000
    }, async (iililIli, illIilII, l1l1il11) => {
      try {
        if (iililIli) {
          console.log("" + $.toStr(iililIli));
          console.log($.name + " 获取ip代理池(" + lIiiIiI.index + ") API请求失败，请检查网路重试");
        } else {
          let ilIIlii = $.toStr(l1l1il11, l1l1il11),
            I1l11lIi = ilIIlii.match(/((\d{0,3}\.){3}\d{0,3}):(\d{0,5})/);
          if (I1l11lIi && I1l11lIi.length == 4) {
            $.switchProxies && ($.proxyArr.host != I1l11lIi[1] || $.proxyArr.port != I1l11lIi[3] ? console.log("切换成功！") : console.log("切换失败，IP不变！"));
            ii1lii1I = false;
            $.proxyArr.host = I1l11lIi[1];
            $.proxyArr.port = I1l11lIi[3];
            $.proxyArr.pin = [];
            $.proxyArr.auth = "";
            var I11Ill11 = new RegExp(I1l11lIi[1] + ":" + I1l11lIi[3] + ":(\\S+):([^\\s\"]+)");
            if (I11Ill11.test(ilIIlii)) {
              var i11lIIll = ilIIlii.match(I11Ill11);
              i11lIIll.length == 3 && ($.proxyArr.auth = {
                username: i11lIIll[1],
                password: i11lIIll[2]
              });
            }
            $.getProxyIp = true;
            lIiiIiI.count = 0;
            lIiiIiI.proxyArr = $.proxyArr;
          } else {
            console.log("获取ip代理池(" + lIiiIiI.index + ")失败\n" + l1l1il11);
            /订单不存在|key无效|无可用余量|过期|充值|续费|登陆|为空|添加|联系|未检索|Error/.test(l1l1il11) && (lIiiIiI.count = 999);
          }
        }
      } catch (Iii1llli) {
        $.logErr(Iii1llli, illIilII);
        console.log(l1l1il11);
      } finally {
        IIiliil1(ii1lii1I);
      }
    });
  });
}
async function ilI1i1II(I1I1l1II = true, I1Iilli1 = 1) {
  if (I1I1l1II) {
    $.UA = "jdapp;iPhone;12.2.0;;;M/5.0;appBuild/168919;jdSupportDarkMode/0;ef/1;ep/" + encodeURIComponent(JSON.stringify({
      ciphertype: 5,
      cipher: {
        ud: "",
        sv: "CJGkCm==",
        iad: ""
      },
      ts: Math.floor(new Date().getTime() / 1000),
      hdid: "JM9F1ywUPwflvMIpYPok0tt5k9kW4ArJEU3lfLhxBqw=",
      version: "1.0.3",
      appname: "com.360buy.jdmobile",
      ridx: -1
    })) + ";Mozilla/5.0 (iPhone; CPU iPhone OS 14_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1;";
    I1Iilli1 != 1 && ($.UA = "Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1");
  }
  try {
    if (iii1i1II) {
      let iI11i1Ii = true;
      if (proxyGetIpUrl && ($.switchProxies || !$.proxyArr.host || !$.getProxyIp)) {
        let ilil1l11 = 1;
        do {
          $.getProxyIp = false;
          for (let Iiil111i of proxyGetIpUrl) {
            if (!Iiil111i || Iiil111i.status == false) {
              continue;
            }
            iI11i1Ii = await I11i1lIi(Iiil111i);
            if (!iI11i1Ii) {
              break;
            }
            Iiil111i.count >= 3 && (console.log("代理池(" + Iiil111i.index + ")获取多次失败，禁用"), Iiil111i.status = false);
          }
          ilil1l11++;
        } while (iI11i1Ii && ilil1l11 <= 4);
      } else {
        proxyGetIpUrl && $.proxyArr.host && (iI11i1Ii = false);
      }
      iI11i1Ii && ($.proxyArr = {}, console.log("无可用代理地址，使用本地IP\n"));
      if ($.proxyArr.host && $.proxyArr.port) {
        console.log("代理" + ($.getProxyIp ? "池" : "") + "地址:" + $.proxyArr.host + ":" + $.proxyArr.port + "\n");
      }
      $.switchProxies = false;
    }
  } catch (iiIiIIii) {
    console.log(iiIiIIii);
  }
}
function i1IIiilI(i1ilI1li) {
  if (typeof i1ilI1li == "string") {
    try {
      return JSON.parse(i1ilI1li);
    } catch (IIi1i11i) {
      console.log(IIi1i11i);
      $.msg($.name, "", "请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie");
      return [];
    }
  }
}
async function Iiiilil1() {
  var liii1 = function () {
    function Iii1I1I1(lIliill1, IIliI) {
      lIliill1 = [lIliill1[0] >>> 16, 65535 & lIliill1[0], lIliill1[1] >>> 16, 65535 & lIliill1[1]];
      IIliI = [IIliI[0] >>> 16, 65535 & IIliI[0], IIliI[1] >>> 16, 65535 & IIliI[1]];
      var IIIIi1Il = [0, 0, 0, 0];
      IIIIi1Il[3] += lIliill1[3] + IIliI[3];
      IIIIi1Il[2] += IIIIi1Il[3] >>> 16;
      IIIIi1Il[3] &= 65535;
      IIIIi1Il[2] += lIliill1[2] + IIliI[2];
      IIIIi1Il[1] += IIIIi1Il[2] >>> 16;
      IIIIi1Il[2] &= 65535;
      IIIIi1Il[1] += lIliill1[1] + IIliI[1];
      IIIIi1Il[0] += IIIIi1Il[1] >>> 16;
      IIIIi1Il[1] &= 65535;
      IIIIi1Il[0] += lIliill1[0] + IIliI[0];
      IIIIi1Il[0] &= 65535;
      return [IIIIi1Il[0] << 16 | IIIIi1Il[1], IIIIi1Il[2] << 16 | IIIIi1Il[3]];
    }
    function liii1liI(I1lIll1, ll1iIlIi) {
      I1lIll1 = [I1lIll1[0] >>> 16, 65535 & I1lIll1[0], I1lIll1[1] >>> 16, 65535 & I1lIll1[1]];
      ll1iIlIi = [ll1iIlIi[0] >>> 16, 65535 & ll1iIlIi[0], ll1iIlIi[1] >>> 16, 65535 & ll1iIlIi[1]];
      var IiIiIi = [0, 0, 0, 0];
      IiIiIi[3] += I1lIll1[3] * ll1iIlIi[3];
      IiIiIi[2] += IiIiIi[3] >>> 16;
      IiIiIi[3] &= 65535;
      IiIiIi[2] += I1lIll1[2] * ll1iIlIi[3];
      IiIiIi[1] += IiIiIi[2] >>> 16;
      IiIiIi[2] &= 65535;
      IiIiIi[2] += I1lIll1[3] * ll1iIlIi[2];
      IiIiIi[1] += IiIiIi[2] >>> 16;
      IiIiIi[2] &= 65535;
      IiIiIi[1] += I1lIll1[1] * ll1iIlIi[3];
      IiIiIi[0] += IiIiIi[1] >>> 16;
      IiIiIi[1] &= 65535;
      IiIiIi[1] += I1lIll1[2] * ll1iIlIi[2];
      IiIiIi[0] += IiIiIi[1] >>> 16;
      IiIiIi[1] &= 65535;
      IiIiIi[1] += I1lIll1[3] * ll1iIlIi[1];
      IiIiIi[0] += IiIiIi[1] >>> 16;
      IiIiIi[1] &= 65535;
      IiIiIi[0] += I1lIll1[0] * ll1iIlIi[3] + I1lIll1[1] * ll1iIlIi[2] + I1lIll1[2] * ll1iIlIi[1] + I1lIll1[3] * ll1iIlIi[0];
      IiIiIi[0] &= 65535;
      return [IiIiIi[0] << 16 | IiIiIi[1], IiIiIi[2] << 16 | IiIiIi[3]];
    }
    function i1iI1ili(IIi11iI1, ilIl1ilI) {
      return 32 === (ilIl1ilI %= 64) ? [IIi11iI1[1], IIi11iI1[0]] : 32 > ilIl1ilI ? [IIi11iI1[0] << ilIl1ilI | IIi11iI1[1] >>> 32 - ilIl1ilI, IIi11iI1[1] << ilIl1ilI | IIi11iI1[0] >>> 32 - ilIl1ilI] : (ilIl1ilI -= 32, [IIi11iI1[1] << ilIl1ilI | IIi11iI1[0] >>> 32 - ilIl1ilI, IIi11iI1[0] << ilIl1ilI | IIi11iI1[1] >>> 32 - ilIl1ilI]);
    }
    function i1lII1l(l1lllii1, i1III1Il) {
      return 0 === (i1III1Il %= 64) ? l1lllii1 : 32 > i1III1Il ? [l1lllii1[0] << i1III1Il | l1lllii1[1] >>> 32 - i1III1Il, l1lllii1[1] << i1III1Il] : [l1lllii1[1] << i1III1Il - 32, 0];
    }
    function i1liIl1(lIiiill, Il1II1ll) {
      return [lIiiill[0] ^ Il1II1ll[0], lIiiill[1] ^ Il1II1ll[1]];
    }
    function liI1lili(lI1Ili1i) {
      return i1liIl1(lI1Ili1i = liii1liI(lI1Ili1i = i1liIl1(lI1Ili1i = liii1liI(lI1Ili1i = i1liIl1(lI1Ili1i, [0, lI1Ili1i[0] >>> 1]), [4283543511, 3981806797]), [0, lI1Ili1i[0] >>> 1]), [3301882366, 444984403]), [0, lI1Ili1i[0] >>> 1]);
    }
    return {
      hash128: function (lI11Il1I, iIii1Iii) {
        var II11IiI1 = iIii1Iii || 0;
        iIii1Iii = (lI11Il1I = lI11Il1I || "").length % 16;
        var l1li1iIi = lI11Il1I.length - iIii1Iii,
          lillill = [0, II11IiI1];
        II11IiI1 = [0, II11IiI1];
        for (var lilIl1Il, i1iiii1, I11i1ii = [2277735313, 289559509], i1iIlIll = [1291169091, 658871167], lIIIliII = 0; lIIIliII < l1li1iIi; lIIIliII += 16) {
          lilIl1Il = [255 & lI11Il1I.charCodeAt(lIIIliII + 4) | (255 & lI11Il1I.charCodeAt(lIIIliII + 5)) << 8 | (255 & lI11Il1I.charCodeAt(lIIIliII + 6)) << 16 | (255 & lI11Il1I.charCodeAt(lIIIliII + 7)) << 24, 255 & lI11Il1I.charCodeAt(lIIIliII) | (255 & lI11Il1I.charCodeAt(lIIIliII + 1)) << 8 | (255 & lI11Il1I.charCodeAt(lIIIliII + 2)) << 16 | (255 & lI11Il1I.charCodeAt(lIIIliII + 3)) << 24];
          i1iiii1 = [255 & lI11Il1I.charCodeAt(lIIIliII + 12) | (255 & lI11Il1I.charCodeAt(lIIIliII + 13)) << 8 | (255 & lI11Il1I.charCodeAt(lIIIliII + 14)) << 16 | (255 & lI11Il1I.charCodeAt(lIIIliII + 15)) << 24, 255 & lI11Il1I.charCodeAt(lIIIliII + 8) | (255 & lI11Il1I.charCodeAt(lIIIliII + 9)) << 8 | (255 & lI11Il1I.charCodeAt(lIIIliII + 10)) << 16 | (255 & lI11Il1I.charCodeAt(lIIIliII + 11)) << 24];
          lillill = Iii1I1I1(liii1liI(lillill = Iii1I1I1(lillill = i1iI1ili(lillill = i1liIl1(lillill, lilIl1Il = liii1liI(lilIl1Il = i1iI1ili(lilIl1Il = liii1liI(lilIl1Il, I11i1ii), 31), i1iIlIll)), 27), II11IiI1), [0, 5]), [0, 1390208809]);
          II11IiI1 = Iii1I1I1(liii1liI(II11IiI1 = Iii1I1I1(II11IiI1 = i1iI1ili(II11IiI1 = i1liIl1(II11IiI1, i1iiii1 = liii1liI(i1iiii1 = i1iI1ili(i1iiii1 = liii1liI(i1iiii1, i1iIlIll), 33), I11i1ii)), 31), lillill), [0, 5]), [0, 944331445]);
        }
        switch (lilIl1Il = [0, 0], i1iiii1 = [0, 0], iIii1Iii) {
          case 15:
            i1iiii1 = i1liIl1(i1iiii1, i1lII1l([0, lI11Il1I.charCodeAt(lIIIliII + 14)], 48));
          case 14:
            i1iiii1 = i1liIl1(i1iiii1, i1lII1l([0, lI11Il1I.charCodeAt(lIIIliII + 13)], 40));
          case 13:
            i1iiii1 = i1liIl1(i1iiii1, i1lII1l([0, lI11Il1I.charCodeAt(lIIIliII + 12)], 32));
          case 12:
            i1iiii1 = i1liIl1(i1iiii1, i1lII1l([0, lI11Il1I.charCodeAt(lIIIliII + 11)], 24));
          case 11:
            i1iiii1 = i1liIl1(i1iiii1, i1lII1l([0, lI11Il1I.charCodeAt(lIIIliII + 10)], 16));
          case 10:
            i1iiii1 = i1liIl1(i1iiii1, i1lII1l([0, lI11Il1I.charCodeAt(lIIIliII + 9)], 8));
          case 9:
            II11IiI1 = i1liIl1(II11IiI1, i1iiii1 = liii1liI(i1iiii1 = i1iI1ili(i1iiii1 = liii1liI(i1iiii1 = i1liIl1(i1iiii1, [0, lI11Il1I.charCodeAt(lIIIliII + 8)]), i1iIlIll), 33), I11i1ii));
          case 8:
            lilIl1Il = i1liIl1(lilIl1Il, i1lII1l([0, lI11Il1I.charCodeAt(lIIIliII + 7)], 56));
          case 7:
            lilIl1Il = i1liIl1(lilIl1Il, i1lII1l([0, lI11Il1I.charCodeAt(lIIIliII + 6)], 48));
          case 6:
            lilIl1Il = i1liIl1(lilIl1Il, i1lII1l([0, lI11Il1I.charCodeAt(lIIIliII + 5)], 40));
          case 5:
            lilIl1Il = i1liIl1(lilIl1Il, i1lII1l([0, lI11Il1I.charCodeAt(lIIIliII + 4)], 32));
          case 4:
            lilIl1Il = i1liIl1(lilIl1Il, i1lII1l([0, lI11Il1I.charCodeAt(lIIIliII + 3)], 24));
          case 3:
            lilIl1Il = i1liIl1(lilIl1Il, i1lII1l([0, lI11Il1I.charCodeAt(lIIIliII + 2)], 16));
          case 2:
            lilIl1Il = i1liIl1(lilIl1Il, i1lII1l([0, lI11Il1I.charCodeAt(lIIIliII + 1)], 8));
          case 1:
            lillill = i1liIl1(lillill, lilIl1Il = liii1liI(lilIl1Il = i1iI1ili(lilIl1Il = liii1liI(lilIl1Il = i1liIl1(lilIl1Il, [0, lI11Il1I.charCodeAt(lIIIliII)]), I11i1ii), 31), i1iIlIll));
        }
        lillill = i1liIl1(lillill, [0, lI11Il1I.length]);
        II11IiI1 = Iii1I1I1(II11IiI1 = i1liIl1(II11IiI1, [0, lI11Il1I.length]), lillill = Iii1I1I1(lillill, II11IiI1));
        lillill = liI1lili(lillill);
        II11IiI1 = Iii1I1I1(II11IiI1 = liI1lili(II11IiI1), lillill = Iii1I1I1(lillill, II11IiI1));
        return ("00000000" + (lillill[0] >>> 0).toString(16)).slice(-8) + ("00000000" + (lillill[1] >>> 0).toString(16)).slice(-8) + ("00000000" + (II11IiI1[0] >>> 0).toString(16)).slice(-8) + ("00000000" + (II11IiI1[1] >>> 0).toString(16)).slice(-8);
      }
    };
  }();
  function IIl1l1I1(l11iIilI) {
    l11iIilI = JSON.stringify(l11iIilI);
    l11iIilI = encodeURIComponent(l11iIilI);
    var III1IIil = "",
      liiiill1 = 0;
    do {
      var liliIl1l = l11iIilI.charCodeAt(liiiill1++),
        l1Ill1Ii = l11iIilI.charCodeAt(liiiill1++),
        lI1il1l1 = l11iIilI.charCodeAt(liiiill1++),
        II1Ili1i = liliIl1l >> 2;
      liliIl1l = (3 & liliIl1l) << 4 | l1Ill1Ii >> 4;
      var lllI11il = (15 & l1Ill1Ii) << 2 | lI1il1l1 >> 6,
        iI111l1l = 63 & lI1il1l1;
      isNaN(l1Ill1Ii) ? lllI11il = iI111l1l = 64 : isNaN(lI1il1l1) && (iI111l1l = 64);
      III1IIil = III1IIil + "23IL<N01c7KvwZO56RSTAfghiFyzWJqVabGH4PQdopUrsCuX*xeBjkltDEmn89.-".charAt(II1Ili1i) + "23IL<N01c7KvwZO56RSTAfghiFyzWJqVabGH4PQdopUrsCuX*xeBjkltDEmn89.-".charAt(liliIl1l) + "23IL<N01c7KvwZO56RSTAfghiFyzWJqVabGH4PQdopUrsCuX*xeBjkltDEmn89.-".charAt(lllI11il) + "23IL<N01c7KvwZO56RSTAfghiFyzWJqVabGH4PQdopUrsCuX*xeBjkltDEmn89.-".charAt(iI111l1l);
    } while (liiiill1 < l11iIilI.length);
    return III1IIil + "/";
  }
  var l11IiIiI = [$.UA.substring(0, 90), "zh-CN", "applewebkit_chrome", "605.1.15", "NA", "NA", 32, "896x414", -480, "sessionStorageKey", "localStorageKey", "indexedDbKey", "openDatabase", "NA", "iPhone", 10, "NA", "", null, null],
    Ilill1II = liii1.hash128(l11IiIiI.join("~~~"), 31),
    IIlii1ll = {
      pin: "",
      oid: "",
      bizId: "jd-babelh5",
      fc: "",
      mode: "strict",
      p: "s",
      fp: Ilill1II,
      ctype: 1,
      v: "3.1.1.0",
      f: "3",
      o: "prodev.m.jd.com/mall/active/2ZqeDAGGJtUdE4C38i2EXkXBLLNu/index.html",
      qs: "",
      jsTk: "",
      qi: ""
    },
    IIillilI = IIl1l1I1(IIlii1ll),
    iI1iiIIl = {},
    l11IiIiI = new Date();
  iI1iiIIl.ts = {};
  iI1iiIIl.ts.deviceTime = l11IiIiI.getTime();
  iI1iiIIl.ca = {
    tdHash: null
  };
  iI1iiIIl.m = {
    compatMode: "CSS1Compat"
  };
  iI1iiIIl.fo = ["Arial Black", "Bauhaus 93", "Chalkduster", "GungSeo", "Hiragino Sans GB", "Impact", "Menlo", "Papyrus", "Rockwell"];
  iI1iiIIl.n = {
    vendorSub: "",
    productSub: "20030107",
    vendor: "Apple Computer, Inc.",
    maxTouchPoints: 1,
    pdfViewerEnabled: !1,
    hardwareConcurrency: 10,
    cookieEnabled: !0,
    appCodeName: "Mozilla",
    appName: "Netscape",
    appVersion: /\/(.+)/g.exec($.UA) && /\/(.+)/g.exec($.UA)[1] || $.UA,
    platform: "iPhone",
    product: "Gecko",
    userAgent: $.UA,
    language: "zh-CN",
    onLine: !0,
    webdriver: !1,
    javaEnabled: !1,
    deviceMemory: 8,
    enumerationOrder: ["vendorSub", "productSub", "vendor", "maxTouchPoints", "scheduling", "userActivation", "doNotTrack", "geolocation", "connection", "plugins", "mimeTypes", "pdfViewerEnabled", "webkitTemporaryStorage", "webkitPersistentStorage", "hardwareConcurrency", "cookieEnabled", "appCodeName", "appName", "appVersion", "platform", "product", "userAgent", "language", "languages", "onLine", "webdriver", "getGamepads", "javaEnabled", "sendBeacon", "vibrate", "bluetooth", "clipboard", "credentials", "keyboard", "managed", "mediaDevices", "storage", "serviceWorker", "virtualKeyboard", "wakeLock", "deviceMemory", "ink", "hid", "locks", "mediaCapabilities", "mediaSession", "permissions", "presentation", "serial", "gpu", "usb", "windowControlsOverlay", "xr", "userAgentData", "clearAppBadge", "getBattery", "getUserMedia", "requestMIDIAccess", "requestMediaKeySystemAccess", "setAppBadge", "webkitGetUserMedia", "getInstalledRelatedApps", "registerProtocolHandler", "unregisterProtocolHandler"]
  };
  iI1iiIIl.p = [];
  iI1iiIIl.w = {
    devicePixelRatio: 1,
    screenTop: 0,
    screenLeft: 0
  };
  iI1iiIIl.s = {
    availHeight: 896,
    availWidth: 414,
    colorDepth: 24,
    height: 896,
    width: 414,
    pixelDepth: 24
  };
  iI1iiIIl.sc = {
    ActiveBorder: "rgb(118, 118, 118)",
    ActiveCaption: "rgb(0, 0, 0)",
    AppWorkspace: "rgb(255, 255, 255)",
    Background: "rgb(255, 255, 255)",
    ButtonFace: "rgb(239, 239, 239)",
    ButtonHighlight: "rgb(239, 239, 239)",
    ButtonShadow: "rgb(239, 239, 239)",
    ButtonText: "rgb(0, 0, 0)",
    CaptionText: "rgb(0, 0, 0)",
    GrayText: "rgb(128, 128, 128)",
    Highlight: "rgb(181, 213, 255)",
    HighlightText: "rgb(0, 0, 0)",
    InactiveBorder: "rgb(118, 118, 118)",
    InactiveCaption: "rgb(255, 255, 255)",
    InactiveCaptionText: "rgb(128, 128, 128)",
    InfoBackground: "rgb(255, 255, 255)",
    InfoText: "rgb(0, 0, 0)",
    Menu: "rgb(255, 255, 255)",
    MenuText: "rgb(0, 0, 0)",
    Scrollbar: "rgb(255, 255, 255)",
    ThreeDDarkShadow: "rgb(118, 118, 118)",
    ThreeDFace: "rgb(239, 239, 239)",
    ThreeDHighlight: "rgb(118, 118, 118)",
    ThreeDLightShadow: "rgb(118, 118, 118)",
    ThreeDShadow: "rgb(118, 118, 118)",
    Window: "rgb(255, 255, 255)",
    WindowFrame: "rgb(118, 118, 118)",
    WindowText: "rgb(0, 0, 0)"
  };
  iI1iiIIl.ss = {
    cookie: !0,
    localStorage: !0,
    sessionStorage: !0,
    globalStorage: !1,
    indexedDB: !0
  };
  iI1iiIIl.tz = -480;
  iI1iiIIl.lil = "";
  iI1iiIIl.wil = "";
  iI1iiIIl.ts.deviceEndTime = new Date().getTime();
  var i1I11I1i = IIl1l1I1(iI1iiIIl);
  let IiliiI1l = {
    url: "https://gia.jd.com/jsTk.do?a=" + IIillilI,
    body: "d=" + i1I11I1i,
    headers: {
      Accept: "*/*",
      "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
      Origin: "https://pro.m.jd.com",
      Referer: "https://pro.m.jd.com/",
      "User-Agent": $.UA
    },
    timeout: 10000
  };
  IiliiI1l = lll111I(IiliiI1l);
  return new Promise(II1liiII => {
    var Ill1IlIl = $;
    if (l111iI1I && $.proxyArr.type && $.proxyArr.type == "socks") {
      Ill1IlIl = l111iI1I;
    }
    Ill1IlIl.post(IiliiI1l, async (Ii1iIiIl, Il11l11I, i11lilIi) => {
      try {
        if (Ii1iIiIl) {
          console.log(Ii1iIiIl);
        } else {
          let i11ilI1I = $.toObj(i11lilIi, i11lilIi);
          i11ilI1I && typeof i11ilI1I === "object" && i11ilI1I.code == 0 && i11ilI1I.data && i11ilI1I.data.token ? $.eid_token = i11ilI1I.data.token : console.log(i11lilIi);
        }
      } catch (lIiiiIIi) {
        $.logErr(lIiiiIIi, Il11l11I);
      } finally {
        II1liiII();
      }
    });
  });
}
function IiIII1ii(iII1llll, ll1l1l1l, I1I1i11 = "") {
  class I11l111 {
    constructor(iIli1i1l = "", liilI = "", iI11li1i = "") {
      this.appId = iIli1i1l;
      this.v = "3.1";
      ["c10dc"].includes(this.appId) && (this.v = "4.1");
      liilI ? this.ua = liilI : this.ua = this.__genUA();
      this.fp = iI11li1i ? iI11li1i : this.__genFp();
    }
    __format(lll1l1li, IIliI1ii) {
      if (!lll1l1li) {
        lll1l1li = "yyyy-MM-dd";
      }
      var illIlI;
      !IIliI1ii ? illIlI = Date.now() : illIlI = new Date(IIliI1ii);
      var II1Ilil1 = new Date(illIlI),
        IillilI = lll1l1li,
        IllIIiii = {
          "M+": II1Ilil1.getMonth() + 1,
          "d+": II1Ilil1.getDate(),
          "D+": II1Ilil1.getDate(),
          "h+": II1Ilil1.getHours(),
          "H+": II1Ilil1.getHours(),
          "m+": II1Ilil1.getMinutes(),
          "s+": II1Ilil1.getSeconds(),
          "w+": II1Ilil1.getDay(),
          "q+": Math.floor((II1Ilil1.getMonth() + 3) / 3),
          "S+": II1Ilil1.getMilliseconds()
        };
      /(y+)/i.test(IillilI) && (IillilI = IillilI.replace(RegExp.$1, "".concat(II1Ilil1.getFullYear()).substr(4 - RegExp.$1.length)));
      Object.keys(IllIIiii).forEach(IilIliil => {
        if (new RegExp("(".concat(IilIliil, ")")).test(IillilI)) {
          var l11lIIi1 = "S+" === IilIliil ? "000" : "00";
          IillilI = IillilI.replace(RegExp.$1, 1 == RegExp.$1.length ? IllIIiii[IilIliil] : "".concat(l11lIIi1).concat(IllIIiii[IilIliil]).substr("".concat(IllIIiii[IilIliil]).length));
        }
      });
      return IillilI;
    }
    __genUA() {
      this.uid = $.CryptoJS.SHA1($.UserName + "red").toString();
      let lIiI1II = this.uid,
        iiii1I = ["14.3"],
        IlI11II = iiii1I[Math.floor(Math.random() * iiii1I.length)],
        i1lIliI1 = ["12,1"],
        iliIllII = i1lIliI1[Math.floor(Math.random() * i1lIliI1.length)],
        lIi1ii1 = ["wifi"],
        lI1il1 = lIi1ii1[Math.floor(Math.random() * lIi1ii1.length)],
        l1li11ii = IlI11II.replace(/\./g, "_"),
        IIli1II = [];
      IIli1II = [["10.1.4", "167814"]];
      let I1iIil1i = Math.floor(Math.random() * IIli1II.length),
        iIIiilll = IIli1II[I1iIil1i] ? IIli1II[I1iIil1i] : IIli1II[0];
      iliIllII = "iPhone" + iliIllII;
      let IIllI1II = "";
      IIllI1II = "jdapp;iPhone;" + iIIiilll[0] + ";" + IlI11II + ";" + lIiI1II + ";network/" + lI1il1 + ";model/" + iliIllII + ";addressid/;appBuild/" + iIIiilll[1] + ";jdSupportDarkMode/0;Mozilla/5.0 (iPhone; CPU iPhone OS " + l1li11ii + " like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1";
      return IIllI1II;
    }
    __genFp() {
      function IlI11iil(l1ii111I, lliiIiil) {
        var II1ilIi1 = [],
          lii1lI = l1ii111I.length,
          ll1l11iI = l1ii111I.split(""),
          I1iii11i = "";
        for (; I1iii11i = ll1l11iI.shift();) {
          if (Math.random() * lii1lI < lliiIiil) {
            II1ilIi1.push(I1iii11i);
            if (--lliiIiil == 0) {
              break;
            }
          }
          lii1lI--;
        }
        for (var IlIlIii1 = "", iil1llil = 0; iil1llil < II1ilIi1.length; iil1llil++) {
          var II1l1ll = Math.random() * (II1ilIi1.length - iil1llil) | 0;
          IlIlIii1 += II1ilIi1[II1l1ll];
          II1ilIi1[II1l1ll] = II1ilIi1[II1ilIi1.length - iil1llil - 1];
        }
        return IlIlIii1;
      }
      function liliii11(Ii1iI11l, iIllII1l) {
        for (let iIl11i1I of iIllII1l.slice()) Ii1iI11l = Ii1iI11l.replace(iIl11i1I, "");
        return Ii1iI11l;
      }
      if (this.v == "4.1") {
        var IlIIl1li = "uct6d0jhqw";
        var i1lIl1II = IlI11iil(IlIIl1li, 6);
        var iilIIllI = Math.random() * 10 | 0;
        var ilIilIi = liliii11(IlIIl1li, i1lIl1II);
        var ii11IIii = {};
        ii11IIii.size = iilIIllI;
        ii11IIii.customDict = ilIilIi;
        var llliI111 = this.getRandomIDPro(ii11IIii) + i1lIl1II + this.getRandomIDPro({
          size: 10 - iilIIllI - 1,
          customDict: ilIilIi
        }) + iilIIllI;
        var llliiI1i = llliI111.split("");
        var l1lII1I = llliiI1i;
        var iIIiiiI;
        l1lII1I = llliiI1i.slice(0, 14);
        iIIiiiI = llliiI1i.slice(14);
        var lIilI1II = [];
        for (; l1lII1I.length > 0;) {
          lIilI1II.push((35 - parseInt(l1lII1I.pop(), 36)).toString(36));
        }
        lIilI1II = lIilI1II.concat(iIIiiiI);
        var i1IlIIll = lIilI1II.join("");
        return i1IlIIll;
      } else {
        var i1IIIli = "0123456789";
        var ll1I1iI1 = IlI11iil(i1IIIli, 3);
        var iIIl1I1 = Math.random() * 10 | 0;
        var I11iill1 = liliii11(i1IIIli, ll1I1iI1);
        var l1lllllI = {};
        l1lllllI.size = iIIl1I1;
        l1lllllI.customDict = I11iill1;
        var l1l1ili1 = this.getRandomIDPro(l1lllllI) + ll1I1iI1 + this.getRandomIDPro({
          size: 14 - (iIIl1I1 + 3) + 1,
          customDict: I11iill1
        }) + iIIl1I1;
        var IIlIIi11 = l1l1ili1.split("");
        var I1lIlli1 = [];
        for (; IIlIIi11.length > 0;) {
          I1lIlli1.push(9 - parseInt(IIlIIi11.pop()));
        }
        var Ii1illIi = I1lIlli1.join("");
        return Ii1illIi;
      }
    }
    getRandomIDPro() {
      var ilI111lI,
        li1l1i,
        iIl11Ii = void 0 === (l1l1Iii = (li1l1i = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : {}).size) ? 10 : l1l1Iii,
        l1l1Iii = void 0 === (l1l1Iii = li1l1i.dictType) ? "number" : l1l1Iii,
        lIl1I11i = "";
      if ((li1l1i = li1l1i.customDict) && "string" == typeof li1l1i) {
        ilI111lI = li1l1i;
      } else {
        switch (l1l1Iii) {
          case "alphabet":
            ilI111lI = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
            break;
          case "max":
            ilI111lI = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_-";
            break;
          case "number":
          default:
            ilI111lI = "0123456789";
        }
      }
      for (; iIl11Ii--;) {
        lIl1I11i += ilI111lI[Math.random() * ilI111lI.length | 0];
      }
      return lIl1I11i;
    }
    Encrypt(IIIiIlli, iI11iill) {
      let iI1I11I1 = $.CryptoJS.AES.encrypt(IIIiIlli, $.CryptoJS.enc.Utf8.parse(iI11iill.key), {
        iv: $.CryptoJS.enc.Utf8.parse(iI11iill.iv),
        mode: $.CryptoJS.mode.CBC,
        padding: $.CryptoJS.pad.Pkcs7
      });
      return iI1I11I1.ciphertext.toString();
    }
    async __genAlgo() {
      let iiIIII11 = {
          wc: 0,
          wd: 0,
          l: "zh-cn",
          ls: "zh-cn",
          ml: 0,
          pl: 0,
          av: /\/(.+)/g.exec(this.ua) && /\/(.+)/g.exec(this.ua)[1] || this.ua,
          ua: this.ua,
          sua: /\((i[^;]+;( U;)? CPU.+Mac OS X)/g.exec(this.ua) && /\((i[^;]+;( U;)? CPU.+Mac OS X)/g.exec(this.ua)[1] || /\((M[^;]+;( U;)? Intel.+Mac OS X [0-9_]+)/g.exec(this.ua) && /\((M[^;]+;( U;)? Intel.+Mac OS X [0-9_]+)/g.exec(this.ua)[1] || "",
          pp: {},
          pp1: "",
          pm: {
            ps: "prompt",
            np: "default"
          },
          w: 414,
          h: 896,
          ow: 414,
          oh: 896,
          url: "https://pro.m.jd.com/mall/active/2ZqeDAGGJtUdE4C38i2EXkXBLLNu/index.html?unionActId=31165&d=&s=&cu=true&utm_source=kong&utm_medium=jingfen",
          og: "https://pro.m.jd.com",
          pr: 3,
          re: "https://u.jd.com/",
          ai: this.appId,
          fp: this.fp
        },
        i1I1i1I1 = JSON.stringify(iiIIII11, null, 2),
        lii11i1 = this.Encrypt(i1I1i1I1, {
          key: "wm0!@w-s#ll1flo(",
          iv: "0102030405060708"
        });
      var i11l1iIl = {};
      this.v == "4.1" ? i11l1iIl = {
        appId: this.appId.toString(),
        expandParams: lii11i1 || "",
        fp: this.fp,
        fv: "v1.6.1",
        platform: "web",
        timestamp: Date.now(),
        version: this.v
      } : i11l1iIl = {
        version: this.v,
        fp: this.fp,
        appId: this.appId.toString(),
        timestamp: Date.now(),
        platform: "web",
        expandParams: lii11i1 || ""
      };
      return new Promise(I1llIlil => {
        let iiil1Iii = {
          url: "https://cactus.jd.com/request_algo?g_ty=ajax",
          body: JSON.stringify(i11l1iIl),
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "Accept-Language": "zh-cn",
            Origin: "https://passport.jd.com",
            Referer: "https://passport.jd.com/",
            "user-agent": this.ua
          },
          timeout: 30000
        };
        $.post(iiil1Iii, async (I1i1Illl, i1I1li1l, l1i1ii1I) => {
          try {
            if (I1i1Illl) {
              console.log(I1i1Illl);
            } else {
              let l1lIIIl = $.toObj(l1i1ii1I, l1i1ii1I);
              l1lIIIl && typeof l1lIIIl === "object" && l1lIIIl.data && l1lIIIl.data.result && l1lIIIl.data.result.tk && (this.tk = l1lIIIl.data.result.tk, this.genKey = new Function("return " + l1lIIIl.data.result.algo)());
            }
          } catch (IIlI1IIi) {
            $.logErr(IIlI1IIi, i1I1li1l);
          } finally {
            I1llIlil();
          }
        });
      });
    }
    __genH5st(l1iIIII1 = {}, I1l11lIl = "") {
      let Iili11i = undefined,
        lIIii = {
          ua: this.ua,
          uid: this.uid
        };
      if (this.tk && this.genKey) {
        this.time = Date.now();
        this.timestamp = this.__format("yyyyMMddhhmmssSSS", this.time);
        let l1iIliI = this.genKey(this.tk, this.fp.toString(), this.timestamp.toString(), this.appId.toString(), $.CryptoJS).toString();
        var ll1I = {},
          IIlI111i = null;
        IIlI111i = Object.keys(l1iIIII1).sort().map(function (lI1l1iiI) {
          var llii11iI = {};
          llii11iI.key = lI1l1iiI;
          llii11iI.value = l1iIIII1[lI1l1iiI];
          return llii11iI;
        }).filter(function (lliiII1i) {
          var lililIIi = lliiII1i.value,
            i1li1lii = "number" == typeof lililIIi && !isNaN(lililIIi) || "string" == typeof lililIIi || "boolean" == typeof lililIIi || "body" == lliiII1i.key;
          if (i1li1lii) {
            if ("body" == lliiII1i.key && typeof lliiII1i.value == "object") {
              lliiII1i.value = JSON.stringify(lliiII1i.value);
            }
            ll1I[lliiII1i.key] = lliiII1i.value;
          }
          return i1li1lii;
        });
        l1iIIII1 = ll1I;
        let II1i1l1 = "";
        II1i1l1 = Object.keys(l1iIIII1).map(function (IilI1I1) {
          return IilI1I1 + ":" + (IilI1I1 == "body" && l1iIIII1[IilI1I1].length !== 64 && l1iIIII1[IilI1I1].slice(0, 1) == "{" ? $.CryptoJS.SHA256(l1iIIII1[IilI1I1]).toString($.CryptoJS.enc.Hex) : l1iIIII1[IilI1I1]);
        }).join("&");
        this.v == "4.1" ? II1i1l1 = $.CryptoJS.MD5(l1iIliI + II1i1l1 + l1iIliI).toString($.CryptoJS.enc.Hex) : II1i1l1 = $.CryptoJS.HmacSHA256(II1i1l1, l1iIliI).toString($.CryptoJS.enc.Hex);
        let iI11iIlI = {
          sua: /\((i[^;]+;( U;)? CPU.+Mac OS X)/g.exec(this.ua) && /\((i[^;]+;( U;)? CPU.+Mac OS X)/g.exec(this.ua)[1] || /\((M[^;]+;( U;)? Intel.+Mac OS X [0-9_]+)/g.exec(this.ua) && /\((M[^;]+;( U;)? Intel.+Mac OS X [0-9_]+)/g.exec(this.ua)[1] || "",
          pp: {},
          extend: {
            wd: 0,
            l: 0,
            ls: 0,
            wk: 0
          },
          random: this.getRandomIDPro({
            size: 10,
            dictType: "max",
            customDict: null
          }),
          referer: "",
          v: "v_lite_f_0.1.6",
          fp: this.fp
        };
        I1l11lIl;
        let iliii1I = JSON.stringify(iI11iIlI, null, 2);
        var lII1I1l = {
          key: "wm0!@w_s#ll1flo(",
          iv: "0102030405060708"
        };
        this.v == "4.1" && (iI11iIlI.v = "v1.6.1", lII1I1l.key = "HL4|FW#Chc3#q?0)");
        let iIIIllI1 = this.Encrypt(iliii1I, lII1I1l);
        Iili11i = [this.timestamp, this.fp, this.appId.toString(), this.tk, II1i1l1, this.v, this.time.toString(), iIIIllI1].join(";");
        lIIii.t = l1iIIII1.t;
      }
      lIIii.h5st = Iili11i;
      return lIIii;
    }
  }
  return new I11l111(iII1llll, ll1l1l1l, I1I1i11);
}
function lllll() {
  class l1I1I1I1 {
    constructor() {
      this.UVCookie = "";
      this.ltr = 0;
      this.mr = [1, 0];
      this.mbaFlag = true;
      this.document = {
        cookie: "",
        cookies: "__jdc=123;",
        domain: "prodev.m.jd.com",
        referrer: "https://u.jd.com/",
        location: {
          href: "https://pro.m.jd.com/mall/active/2ZqeDAGGJtUdE4C38i2EXkXBLLNu/index.html",
          hrefs: "https://pro.m.jd.com/mall/active/2ZqeDAGGJtUdE4C38i2EXkXBLLNu/index.html"
        }
      };
      this.navigator = {
        userAgent: "Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1",
        userAgents: "Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1"
      };
      this.window = {};
    }
    getUVCookie(IlllI1II = "", iIllli1l = "", lllIlIiI = "", liiI1l11 = "") {
      try {
        this.document.location.href = this.document.location.hrefs + "";
        this.document.cookie = this.document.cookies + "";
        if (lllIlIiI) {
          this.document.location.href = lllIlIiI;
        }
        if (liiI1l11) {
          this.document.cookie = liiI1l11;
        }
        this.UVCookie = "";
        this.navigator.userAgent = this.navigator.userAgents + "";
        this.ltr = 1011 + Math.round(31 * Math.random());
        if (this.mbaFlag) {
          this.mr[1]++;
          this.mr[1] >= 314 && (this.mr[1] = Math.round(31 * Math.random()));
          !iIllli1l && (iIllli1l = $.CryptoJS.SHA1("").toString());
          let ili1l1Il = 0;
          while (true) {
            this.mr[0] = parseInt(iIllli1l.match(/\d/g)[ili1l1Il]);
            ili1l1Il++;
            if (this.mr[0] > 0 || ili1l1Il >= iIllli1l.match(/\d/g).length) {
              break;
            }
          }
          this.mr[0] += Math.round((new Date().getTime() - new Date("2023-06-02").getTime()) / 86400000);
        }
        if (IlllI1II) {
          this.navigator.userAgent = IlllI1II;
        }
        this.lr = {
          ckJda: "__jda",
          ckJdb: "__jdb",
          ckJdv: "__jdv",
          ckJdc: "__jdc",
          refUrl: "https://u.jd.com/"
        };
        this.q();
        this.s(iIllli1l);
        return this.UVCookie;
      } catch (Iiil1l11) {
        console.log(Iiil1l11);
      }
    }
    s(I1iIilII = "") {
      var lIi1lIl,
        IiI1l11i,
        llI11II1,
        IiliiI11,
        Ii1I1I1l = (this.getCookie(this.lr.ckJda) || "").split("."),
        ilill1Ii = (this.getCookie(this.lr.ckJdb) || "").split("."),
        IlllIl1l = (this.getCookie(this.lr.ckJdv) || "").split("|"),
        iIIl11i = this.getCookie(this.lr.ckJdc) || "",
        Ii11Illl = parseInt((new Date().getTime() - this.ltr) / 1000),
        iil1IIli = 0,
        l1l1Ilii = 1,
        illilIl = "direct",
        i1I1l1ll = "-",
        IIlIII1 = "none",
        IlliiiiI = "-";
      if (Ii1I1I1l.length > 3) {
        for (var ilI1lIl = 2; ilI1lIl < 5 && ilI1lIl < Ii1I1I1l.length; ilI1lIl++) {
          var lIllilli = Ii1I1I1l[ilI1lIl];
          lIllilli.length > 10 && (Ii1I1I1l[ilI1lIl] = lIllilli.substr(0, 10));
        }
      }
      Ii1I1I1l.length > 5 ? (llI11II1 = Ii1I1I1l[0], IiliiI11 = Ii1I1I1l[1], lIi1lIl = parseInt(Ii1I1I1l[2], 10), IiI1l11i = parseInt(Ii1I1I1l[3], 10), Ii11Illl = parseInt(Ii1I1I1l[4], 10), l1l1Ilii = parseInt(Ii1I1I1l[5], 10) || l1l1Ilii) : (IiliiI11 = this.genUuid(), lIi1lIl = Ii11Illl, IiI1l11i = Ii11Illl);
      this.lr.uuid = IiliiI11;
      ilill1Ii.length > 3 && (llI11II1 || (llI11II1 = ilill1Ii[0]), iil1IIli = parseInt(ilill1Ii[1], 10) || 0);
      IlllIl1l.length > 4 && (llI11II1 || (llI11II1 = IlllIl1l[0]), illilIl = IlllIl1l[1], i1I1l1ll = IlllIl1l[2], IIlIII1 = IlllIl1l[3], IlliiiiI = IlllIl1l[4]);
      iIIl11i && "" !== iIIl11i && (llI11II1 || (llI11II1 = iIIl11i));
      var iiiiIi11,
        liiIi1lI = [],
        l1l1iIi1 = ilill1Ii.length < 4,
        Il1IIII = this.getParameter("utm_source"),
        iI1iIlll = !1;
      if (Il1IIII) {
        var IIlIl1I = this.getParameter("utm_campaign"),
          l1IiiIII = this.getParameter("utm_medium"),
          lI11llI = this.getParameter("utm_term");
        liiIi1lI.push(Il1IIII || illilIl);
        liiIi1lI.push(IIlIl1I || i1I1l1ll);
        liiIi1lI.push(l1IiiIII || IIlIII1);
        liiIi1lI.push(lI11llI || IlliiiiI);
        IlliiiiI = liiIi1lI[3];
        iI1iIlll = !0;
      } else {
        var i1iil1Il,
          Iil1illI = this.lr.refUrl && this.lr.refUrl.split("/")[2],
          IlI1liI = !1;
        if (Iil1illI && Iil1illI.indexOf(this.lr.ckDomain) < 0) {
          for (i1iil1Il = this.lr.seo, ilI1lIl = 0; ilI1lIl < i1iil1Il.length; ilI1lIl++) {
            var l11iI1lI = i1iil1Il[ilI1lIl].split(":");
            if (Iil1illI.indexOf(l11iI1lI[0].toLowerCase()) > -1 && this.lr.refUrl.indexOf((l11iI1lI[1] + "=").toLowerCase()) > -1) {
              var lI1IIl1l = this.getParameter(l11iI1lI[1], this.lr.refUrl);
              /[^\x00-\xff]/.test(lI1IIl1l) && (lI1IIl1l = encodeURIComponent(lI1IIl1l));
              liiIi1lI.push(l11iI1lI[0]);
              liiIi1lI.push("-");
              liiIi1lI.push("organic");
              liiIi1lI.push(lI1IIl1l || "not set");
              IlliiiiI = liiIi1lI[3];
              IlI1liI = !0;
              break;
            }
          }
          IlI1liI || (Iil1illI.indexOf("zol.com.cn") > -1 ? (liiIi1lI.push("zol.com.cn"), liiIi1lI.push("-"), liiIi1lI.push("cpc"), liiIi1lI.push("not set")) : (liiIi1lI.push(Iil1illI), liiIi1lI.push("-"), liiIi1lI.push("referral"), liiIi1lI.push("-")));
        }
      }
      iiiiIi11 = liiIi1lI.length > 0 && (liiIi1lI[0] !== illilIl || liiIi1lI[1] !== i1I1l1ll || liiIi1lI[2] !== IIlIII1) && "referral" !== liiIi1lI[2];
      l1l1iIi1 || !l1l1iIi1 && iiiiIi11 ? (illilIl = liiIi1lI[0] || illilIl, i1I1l1ll = liiIi1lI[1] || i1I1l1ll, IIlIII1 = liiIi1lI[2] || IIlIII1, IlliiiiI = liiIi1lI[3] || IlliiiiI, Ii1I1I1l.length > 5 ? (lIi1lIl = parseInt(Ii1I1I1l[2], 10), IiI1l11i = parseInt(Ii1I1I1l[4], 10), Ii11Illl = parseInt((new Date().getTime() - this.ltr) / 1000), l1l1Ilii++, iil1IIli = 1) : (l1l1Ilii = 1, iil1IIli = 1)) : iil1IIli++;
      var l1il111l = this.getPageParamFromSdk();
      if (l1il111l && l1il111l.vts) {
        var I1111II = 1 * l1il111l.vts,
          I1iii1I1 = 1 * l1il111l.seq;
        (I1111II > l1l1Ilii || I1111II === l1l1Ilii && I1iii1I1 >= iil1IIli) && (l1l1Ilii = I1111II, iil1IIli = I1iii1I1 + 1);
      }
      if (llI11II1 || (llI11II1 = this.genHash(this.lr.ckDomain)), this.setCookie(this.lr.ckJda, [llI11II1, IiliiI11, lIi1lIl, IiI1l11i, Ii11Illl, l1l1Ilii || 1].join("."), this.lr.ckDomain, this.lr.ckJdaExp), this.setCookie(this.lr.ckJdb, [llI11II1, iil1IIli, IiliiI11 + "|" + l1l1Ilii, Ii11Illl].join("."), this.lr.ckDomain, this.lr.ckJdbExp), iI1iIlll || iiiiIi11 || IlllIl1l.length < 5) {
        var Iil11Ili = [llI11II1, illilIl || "direct", i1I1l1ll || "-", IIlIII1 || "none", IlliiiiI || "-", new Date().getTime() - this.ltr].join("|");
        this.setJdv(Iil11Ili = encodeURIComponent(Iil11Ili), llI11II1);
      }
      this.setCookie(this.lr.ckJdc, llI11II1, this.lr.ckDomain);
      if (this.mbaFlag) {
        this.setCookie("shshshfpa", this.shshshfpa(), this.lr.ckDomain);
        this.setCookie("mba_sid", this.mr.join("."), this.lr.ckDomain);
        this.setCookie("mba_muid", [IiliiI11, this.mr[0], new Date().getTime()].join("."), this.lr.ckDomain);
        this.setCookie("pre_seq", Math.round(5 * Math.random()) * 2 + 1, this.lr.ckDomain);
        var iil1IIli = 0;
        var lIIIIii1 = "";
        if (I1iIilII) {
          while (true) {
            lIIIIii1 += I1iIilII.match(/\d/g)[iil1IIli];
            iil1IIli++;
            if (lIIIIii1.split("").length >= 2 || iil1IIli >= I1iIilII.match(/\d/g).length) {
              break;
            }
          }
          this.setCookie("pre_session", I1iIilII + "|" + (parseInt(this.mr[0]) + parseInt(lIIIIii1)), this.lr.ckDomain);
        }
      }
    }
    shshshfpa() {
      var ilIiIlI = "";
      for (var llIIiII1 = 1; llIIiII1 <= 32; llIIiII1++) {
        var i1iIiI1l = Math.floor(Math.random() * 16).toString(16);
        ilIiIlI += i1iIiI1l;
        if (llIIiII1 == 8 || llIIiII1 == 12 || llIIiII1 == 16 || llIIiII1 == 20) {
          ilIiIlI += "-";
        }
      }
      var iIliI1l = Date.parse(new Date());
      iIliI1l = iIliI1l / 1000;
      ilIiIlI += "-" + iIliI1l;
      return ilIiIlI;
    }
    q() {
      this.lr.rpDomain = this.lr.rpDomain || "uranus.jd.com";
      this.lr.logUrl = "//" + this.lr.rpDomain + "/log/m";
      this.lr.logType = {
        pv: "1",
        pf: "2",
        cl: "3",
        od: "4",
        pd: "5",
        hm: "6",
        magic: "000001"
      };
      this.lr.useTmpCookie ? (this.lr.ckJda = "__tra", this.lr.ckJdb = "__trb", this.lr.ckJdc = "__trc", this.lr.ckJdu = "__tru") : (this.lr.ckJda = "__jda", this.lr.ckJdb = "__jdb", this.lr.ckJdc = "__jdc", this.lr.ckJdu = "__jdu");
      this.lr.ckJdv = "__jdv";
      this.lr.ckWxAppCk = "__jdwxapp";
      this.lr.ckRefCls = "__jd_ref_cls";
      this.lr.ckJdaExp = 15552000000;
      this.lr.ckJdbExp = 1800000;
      this.lr.ckJduExp = 15552000000;
      this.lr.ckJdvExp = 1296000000;
      this.lr.ckJdvEmbeddedExp = 86400000;
      this.lr.ckWxAppCkExp = 15552000000;
      this.lr.mtSubsiteExp = 31536000000;
      this.lr.ckDomain = (this.document.domain.match(/[^.]+\.(com.cn|net.cn|org.cn|gov.cn|edu.cn)$/) || [""])[0] || this.document.domain.replace(/.*?([^.]+\.[^.]+)$/, "$1");
      this.lr.title = this.document.title;
      this.lr.refUrl = this.document.referrer;
      this.lr.seo = ["i.easou.com:q", "m.baidu.com:word", "m.sm.cn:q", "m.so.com:q", "wap.sogou.com:keyword", "m.sogou.com:keyword", "wap.sogo.com:keyword", "m.sogo.com:keyword", "page.roboo.com:q", "ask.com:q", "baidu:word", "baidu:wd", "bing:q", "easou:q", "google:q", "roboo:word", "roboo:q", "sm.cn:q", "so.com:q", "sogou:keyword", "sogou:query", "sogo.com:keyword", "sogo.com:query", "yahoo:p", "yandex:text", "yicha:key"];
    }
    setCookie(iIlil1l, li1lI1l, iIiliIIi, ll1lIIiI) {
      if (iIlil1l) {
        var lIIlliIl = "";
        if (ll1lIIiI) {
          var i1i1liIl = new Date();
          i1i1liIl.setTime(i1i1liIl.getTime() - this.ltr + ll1lIIiI);
          lIIlliIl = ";expires=" + i1i1liIl.toGMTString();
        }
        this.UVCookie += iIlil1l + "=" + li1lI1l + "; ";
      }
    }
    setJdv(Ii1lii1l, l1I1lIl, ll1il1i1) {
      var lIii1Ii1 = "";
      lIii1Ii1 = this.isPrey(10) && (!Ii1lii1l || Ii1lii1l.length > 400) ? l1I1lIl + "|direct|-|none|-|" + (new Date().getTime() - this.ltr) : Ii1lii1l;
      var IiiIlIII = ll1il1i1 || this.isEmbedded() ? this.lr.ckJdvEmbeddedExp : this.lr.ckJdvExp;
      this.setCookie(this.lr.ckJdv || "__jdv", lIii1Ii1, this.lr.ckDomain, IiiIlIII);
    }
    getCookie(Ilil, II1I1iii) {
      var i1llili = this.document.cookie.match(new RegExp("(^| )" + Ilil + "=([^;]*)(;|$)"));
      return null !== i1llili ? II1I1iii ? i1llili[2] : this.urlDecode(i1llili[2]) : "";
    }
    genUuid() {
      return new Date().getTime() - this.ltr + "" + parseInt(2147483647 * Math.random());
    }
    getParameter(l1IlIil, lilIIII1) {
      var l11iI1il = lilIIII1 || this.document.location.href,
        iil1lIii = new RegExp("(?:^|&|[?]|[/])" + l1IlIil + "=([^&]*)").exec(l11iI1il);
      return iil1lIii ? this.urlDecode(iil1lIii[1]) : null;
    }
    urlDecode(l111iIli) {
      try {
        return decodeURIComponent(l111iIli);
      } catch (illII1l) {
        return l111iIli;
      }
    }
    genHash(I1iI1lli) {
      var I11liIl1,
        i1IiiIl1 = 1,
        i1iIii11 = 0;
      if (I1iI1lli) {
        for (i1IiiIl1 = 0, I11liIl1 = I1iI1lli.length - 1; I11liIl1 >= 0; I11liIl1--) {
          i1IiiIl1 = 0 !== (i1iIii11 = 266338304 & (i1IiiIl1 = (i1IiiIl1 << 6 & 268435455) + (i1iIii11 = I1iI1lli.charCodeAt(I11liIl1)) + (i1iIii11 << 14))) ? i1IiiIl1 ^ i1iIii11 >> 21 : i1IiiIl1;
        }
      }
      return i1IiiIl1;
    }
    isPrey(lllili1) {
      if (lllili1 >= 100) {
        return !0;
      }
      var lllI1I11 = this.lr.uuid,
        I111iIi = lllI1I11.substr(lllI1I11.length - 2);
      return !!I111iIi && 1 * I111iIi < lllili1;
    }
    isEmbedded() {
      var I11ll1I = this.navigator.userAgent || "";
      return /^(jdapp|jdltapp|jdpingou);/.test(I11ll1I) || this.isJdLog();
    }
    isJdLog() {
      return (this.navigator.userAgent || "").indexOf(";jdlog;") > -1;
    }
    getPageParamFromSdk() {
      var l1Il1l, IIIii1I1;
      try {
        this.window.JDMAUnifyBridge && this.window.JDMAUnifyBridge.JDMAGetMPageParam ? IIIii1I1 = JDMAUnifyBridge.JDMAGetMPageParam() : this.window.JDMAGetMPageParam ? IIIii1I1 = JDMAGetMPageParam() : this.window.webkit && this.window.webkit.messageHandlers && this.window.webkit.messageHandlers.JDMASetMPageParam && (IIIii1I1 = this.window.prompt("JDMAGetMPageParam", ""));
        IIIii1I1 && (l1Il1l = JSON.parse(IIIii1I1));
      } catch (I1iI1IiI) {}
      return l1Il1l;
    }
    time(l11l111l, l1llli1I = null) {
      const liiiI1 = l1llli1I ? new Date(l1llli1I) : new Date();
      let I1I11ii = {
        "M+": liiiI1.getMonth() + 1,
        "d+": liiiI1.getDate(),
        "H+": liiiI1.getHours(),
        "m+": liiiI1.getMinutes(),
        "s+": liiiI1.getSeconds(),
        "q+": Math.floor((liiiI1.getMonth() + 3) / 3),
        S: liiiI1.getMilliseconds()
      };
      /(y+)/.test(l11l111l) && (l11l111l = l11l111l.replace(RegExp.$1, (liiiI1.getFullYear() + "").substr(4 - RegExp.$1.length)));
      for (let iIIl1lI in I1I11ii) new RegExp("(" + iIIl1lI + ")").test(l11l111l) && (l11l111l = l11l111l.replace(RegExp.$1, 1 == RegExp.$1.length ? I1I11ii[iIIl1lI] : ("00" + I1I11ii[iIIl1lI]).substr(("" + I1I11ii[iIIl1lI]).length)));
      return l11l111l;
    }
  }
  i1IilIIl = new l1I1I1I1();
}
function I1i1IlI(i1i1I1l1) {
  i1i1I1l1 = i1i1I1l1 || 32;
  let lIlIII11 = "abcdef0123456789",
    I11ilI11 = lIlIII11.length,
    II1ili1l = "";
  for (i = 0; i < i1i1I1l1; i++) {
    II1ili1l += lIlIII11.charAt(Math.floor(Math.random() * I11ilI11));
  }
  return II1ili1l;
}
