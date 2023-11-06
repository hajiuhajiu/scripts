/*
新东东农场助力

助力，领取助力奖励

环境变量：
jd_dongDongFarm_Notify // 是否推送通知（true/false），默认不推送
代理变量：
JD_Farm_PROXY_OPEN      // 代理启用变量，默认不开启（true/false）
JD_Farm_PROXY_TUNNRL      // 代理池代理地址变量，默认不开启，仅支持代理池模式(auto-proxy-pool)，格式为：http://ip:port
JD_Farm_PROXY_URL      // API代理地址变量，默认不开启，仅支持 数据格式:txt;提取数量:每次一个，格式为：http://api.xxx.xxx
JD_Farm_NO_PROXY      // 禁止走代理，默认 127.0.0.1,*.baidu.com 需要自行修改

cron:45 6,16 * * *
============Quantumultx===============
[task_local]
#新东东农场助力
45 6,16 * * * jd_dongDongFarm_help.js, tag=新东东农场助力, enabled=true

*/

const Env=require('./Env.js');
const $ = new Env('新东东农场助力')

const l11iI1 = require("./jdCookie"),
  IliiI = require("./function/sendJDNotify"),
  lI111i = require("./function/jdCommon"),
  I1lIII = require("./function/krgetH5st"),
  liIlll = process.env.jd_dongDongFarm_Notify === "true",
  IIIIl1 = process.env.JD_Farm_PROXY_OPEN === "true",
  liiilI = process.env.JD_Farm_PROXY_TUNNRL,
  lI111l = process.env.JD_Farm_PROXY_URL,
  liiii1 = process.env.JD_Farm_NO_PROXY || "*.kingran.cf,127.0.0.1,*.baidu.com";
let IIiiIl = "",
  l1ilIl = 0;
const IIiiIi = require("fs");
let l1ilIi = false,
  l11iIi = "./function/ddfn.json",
  ll11li = IIiiIi.existsSync(l11iIi),
  iliIlI = [],
  lI111I = [],
  IlilI = [];
ll11li && (console.log("检测到东东农场缓存文件dongDongFarm_ShareCache.json，载入..."), iliIlI = IIiiIi.readFileSync(l11iIi, "utf-8"), iliIlI && (iliIlI = iliIlI.toString(), iliIlI = JSON.parse(iliIlI)));
let llIi1 = false;
if (IIIIl1) {
  llIi1 = true;
  try {
    require("global-agent/bootstrap");
    if (lI111l) {
      console.log("\n☑️ API地址代理已开启：");
      console.log("☑️ 代理地址为：" + lI111l + "\n");
      let ii1II1 = /[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+\.?/g;
      global.GLOBAL_AGENT.NO_PROXY = ii1II1.exec(lI111l)[0] + "," + liiii1;
    } else {
      liiilI ? (global.GLOBAL_AGENT.HTTP_PROXY = liiilI, global.GLOBAL_AGENT.NO_PROXY = "" + liiii1, console.log("\n☑️ 代理池代理已开启："), console.log("☑️ 代理地址为：" + global.GLOBAL_AGENT.HTTP_PROXY + "\n")) : (console.log("\n⚠️ 当前检测到已开启代理，但未填写代理地址变量"), console.log("⚠ 代理池变量：export JD_JF_PROXY_TUNNRL='http://ip:port'"), console.log("⚠ API地址变量：export JD_JF_PROXY_URL='http://api.xxx.xxx'\n"));
    }
  } catch (iliIll) {
    console.log("\n请安装global-agent依赖，才能启用代理！");
    console.log("\n安装命令：npm install global-agent\n");
    llIi1 = false;
  }
} else {
  console.log("\n⚠ 检测当前模式未开启代理：");
  console.log("⚠ 开启代理变量：export JD_Farm_PROXY_OPEN='true' \n");
}
let IliIII = "";
const II1l = Object.keys(l11iI1).map(llliIl => l11iI1[llliIl]).filter(iliIli => iliIli);
!II1l[0] && ($.msg($.name, "【提示】请先获取Cookie"), process.exit(1));
!(async () => {
  IliiI.config({
    title: $.name
  });
  console.log("\n【开始收集您的互助码，用于账号内部互助，请稍等...】\n");
  for (let i1I11 = 0; i1I11 < II1l.length; i1I11++) {
    $.index = i1I11 + 1;
    IliIII = II1l[i1I11];
    lI111i.setCookie(IliIII);
    $.UserName = decodeURIComponent(lI111i.getCookieValue(IliIII, "pt_pin"));
    $.UA = lI111i.genUA($.UserName);
    $.message = IliiI.create($.index, $.UserName);
    $.nickName = "";
    $.retry = 0;
    console.log("\n******开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "******\n");
    IIIIl1 && llIi1 && lI111l && (l1ilIl % 10 == 0 && (await l1ilII(), global.GLOBAL_AGENT.HTTP_PROXY = "http://" + IIiiIl), console.log("📶 " + IIiiIl), l1ilIl++);
    await liiiiI();
    lI111i.unsetCookie();
    if ($.runEnd) {
      break;
    }
    await $.wait(3000);
  }
  if (l1ilIi) {
    var ii1III = JSON.stringify(iliIlI, null, 2);
    IIiiIi.writeFile(l11iIi, ii1III, function (l1iIii) {
      if (l1iIii) {
        console.log(l1iIii);
        console.log("\n【缓存文件dongDongFarm_ShareCache.json更新失败!】\n");
      } else {
        console.log("\n【缓存文件dongDongFarm_ShareCache.json更新成功!】\n");
      }
    });
  }
  console.log("\n【互助码已经收集完毕，现在开始账号内部互助，请稍等...】\n");
  for (let ii1l11 = 0; ii1l11 < II1l.length; ii1l11++) {
    $.index = ii1l11 + 1;
    IliIII = II1l[ii1l11];
    lI111i.setCookie(IliIII);
    $.UserName = decodeURIComponent(lI111i.getCookieValue(IliIII, "pt_pin"));
    $.UA = lI111i.genUA($.UserName);
    $.message = IliiI.create($.index, $.UserName);
    $.nickName = "";
    $.retry = 0;
    console.log("\n******开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "******\n");
    IIIIl1 && llIi1 && lI111l && (l1ilIl % 10 == 0 && (await l1ilII(), global.GLOBAL_AGENT.HTTP_PROXY = "http://" + IIiiIl), console.log("📶 " + IIiiIl), l1ilIl++);
    await II1i();
    lI111i.unsetCookie();
    if ($.runEnd) {
      break;
    }
    await $.wait(3000);
  }
  liIlll && IliiI.getMessage() && (IliiI.updateContent(IliiI.content + "\n"), await IliiI.push());
})().catch(lI1lIl => $.logErr(lI1lIl)).finally(() => $.done());
async function liiiiI() {
  try {
    console.log("【京东账号" + $.index + "（" + $.UserName + "）的" + $.name + "好友互助码】");
    var I1ll11 = false,
      lI1lIi = "";
    if (iliIlI) {
      for (let II1I1 = 0; II1I1 < iliIlI.length; II1I1++) {
        iliIlI[II1I1].pt_pin == $.UserName && (I1ll11 = true, lI1lIi = iliIlI[II1I1].ShareCode);
      }
    }
    if (!I1ll11) {
      console.log("\n> 该账号无缓存，尝试联网获取互助码.....");
      await I1iI11("farm_home");
      if ($.farm_home?.["result"]?.["farmHomeShare"]?.["inviteCode"]) {
        var Iii1Ii = {};
        lI1lIi = $.farm_home?.["result"]?.["farmHomeShare"]?.["inviteCode"];
        Iii1Ii = {
          pt_pin: $.UserName,
          ShareCode: lI1lIi
        };
        iliIlI.push(Iii1Ii);
        l1ilIi = true;
      }
    }
    lI1lIi ? (console.log("\n> " + lI1lIi), lI111I.push(lI1lIi)) : console.log("\n> 未能成功从联网获取到互助码.....");
  } catch (lI1lII) {
    $.logErr(lI1lII);
  }
}
async function II1i() {
  $.canWatering = true;
  $.hotproxy = false;
  try {
    const liliii = await lI111i.getLoginStatus(IliIII);
    if (!liliii && typeof liliii !== undefined) {
      console.log("账号无效");
      $.message.fix("账号无效");
      return;
    }
    await I1iI11("farm_home");
    if ($.farm_home) {
      await I1lII1();
      await illli1();
    } else {
      switch ($.dongDongFarm?.["bizCode"]) {
        case -1001:
          console.log($.dongDongFarm?.["bizMsg"] + " - " + $.dongDongFarm?.["bizCode"]);
          $.hotproxy = true;
          break;
        default:
          {
            console.log($.dongDongFarm?.["bizMsg"] + " - " + $.dongDongFarm?.["bizCode"]);
            break;
          }
      }
      $.retry < 1 && ($.retry++, console.log("等待5秒后重试,第:" + $.retry + "次"), await $.wait(5000), await II1i());
    }
  } catch (lIilli) {
    console.log(lIilli.message);
  }
}
async function illli1() {
  $.farm_assist_init_info_hot = true;
  await I1iI11("farm_assist_init_info");
  if ($.farm_assist_init_info_hot) {
    const Illll1 = $.farm_assist_init_info?.["result"]?.["assistStageList"] || [];
    for (let lIilll of Illll1) {
      $.assistNum = lIilll?.["assistNum"];
      $.stage = lIilll?.["stage"];
      $.waterEnergy = lIilll?.["waterEnergy"];
      switch (lIilll?.["stageStaus"]) {
        case 1:
          console.log("助力人数未满 [" + $.assistNum + "人助力],请继续邀请吧！\n");
          break;
        case 2:
          console.log("助力人数已满 [" + $.assistNum + "人助力],现在去领取 [" + $.waterEnergy + "水滴] 奖励！\n");
          await $.wait(1500);
          await I1iI11("farm_assist_receive_award");
          await $.wait(1500);
          break;
        case 3:
          console.log("助力人数已满 [" + $.assistNum + "人助力],奖励 [" + $.waterEnergy + "水滴] 已经领取！\n");
          $.message.fix("助力人数已满 [" + $.assistNum + "人助力],奖励 [" + $.waterEnergy + "水滴] 已经领取！");
          break;
        default:
          {
            console.log("[未知状态]:" + lIilll?.["stageStaus"]);
            $.hotproxy = true;
            break;
          }
      }
    }
  }
}
async function I1lII1() {
  await $.wait(2000);
  await I1iI11("farm_home");
  for (let iiI1il of lI111I) {
    var li1I = false;
    for (let iiI1ii of IlilI) {
      if (iiI1il == iiI1ii) {
        li1I = true;
        break;
      }
    }
    if (li1I) {
      console.log(iiI1il + "助力已满，跳过...");
      continue;
    }
    console.log("【" + $.UserName + "】开始助力: " + iiI1il + "\n");
    if (!iiI1il) {
      continue;
    }
    if ($.farm_home?.["result"]?.["treeFullStage"] === 0) {
      console.log("[助力结果]:未种植,跳过助力\n");
      return;
    }
    if (iiI1il === $.farm_home?.["result"]?.["farmHomeShare"]?.["inviteCode"]) {
      console.log("[助力结果]:不能为自己助力\n");
      continue;
    }
    $.code = iiI1il;
    await I1iI11("farm_assist");
    await $.wait(2000);
    switch ($.farm_assist?.["bizCode"]) {
      case 0:
        console.log("[助力结果]:已成功给[" + $.farm_assist?.["result"]?.["masterInfo"]?.["nickname"] + "]助力,助力获得[" + $.farm_assist?.["result"]?.["amount"] + "g]水滴\n");
        break;
      case -4001:
        console.log("[助力结果]:" + $.farm_assist?.["bizMsg"] + "，尝试重新助力\n");
        await $.wait(3000);
        await I1iI11("farm_assist");
        break;
      case -1001:
        console.log("[助力结果]:" + $.farm_assist?.["bizMsg"] + "\n");
        return;
      case 5002:
        console.log("[助力结果]:不能助力自己\n");
        break;
      case 5003:
        console.log("[助力结果]:之前给[" + $.farm_assist?.["result"]?.["masterInfo"]?.["nickname"] + "]助力过了\n");
        break;
      case 5004:
        console.log("[助力结果]:助力[" + $.farm_assist?.["result"]?.["masterInfo"]?.["nickname"] + "]失败，您今天助力次数已耗尽\n");
        return;
      case 5005:
        console.log("[助力结果]:好友[" + $.farm_assist?.["result"]?.["masterInfo"]?.["nickname"] + "]助力已满\n");
        IlilI.push(iiI1il);
        break;
      default:
        {
          console.log("[助力结果]:" + $.farm_assist?.["bizCode"] + " - " + $.farm_assist?.["bizMsg"]);
          break;
        }
    }
  }
}
async function Ill111(I1Illl, ll1lii) {
  try {
    switch (I1Illl) {
      case "farm_home":
        if (ll1lii.code === 0 && ll1lii.data?.["bizCode"] === 0) {
          $.farm_home = ll1lii.data;
        } else {
          if (ll1lii.data?.["bizMsg"]) {
            $.farm_home = ll1lii.data;
          } else {
            if (ll1lii.errMsg) {
              $.hotproxy = true;
              console.log(ll1lii.code + "-" + ll1lii.errMsg);
            } else {
              if (ll1lii.msg) {
                $.hotproxy = true;
                console.log(ll1lii.code + "-" + ll1lii.msg);
              } else {
                console.log("❓" + I1Illl + " " + JSON.stringify(ll1lii));
              }
            }
          }
        }
        break;
      case "farm_assist_init_info":
        if (ll1lii.code === 0 && ll1lii.data?.["bizCode"] === 0) {
          $.farm_assist_init_info = ll1lii.data;
        } else {
          if (ll1lii.data?.["bizMsg"]) {
            $.hotproxy = true;
            $.farm_assist_init_info_hot = false;
          } else {
            if (ll1lii.errMsg) {
              $.hotproxy = true;
              console.log(ll1lii.code + "-" + ll1lii.errMsg);
            } else {
              ll1lii.msg ? ($.hotproxy = true, console.log(ll1lii.code + "-" + ll1lii.msg)) : console.log("❓" + I1Illl + " " + JSON.stringify(ll1lii));
            }
          }
        }
        break;
      case "farm_assist":
        ll1lii.code === 0 ? $.farm_assist = ll1lii.data : console.log("❓" + I1Illl + " " + JSON.stringify(ll1lii));
        break;
      case "farm_assist_receive_award":
        if (ll1lii.code === 0 && ll1lii.data?.["bizCode"] === 0) {
          console.log("领取[" + $.assistNum + "人助力]奖励: " + (ll1lii.data?.["result"]?.["amount"] || 0) + "水滴\n");
        } else {
          if (ll1lii.data?.["bizMsg"]) {
            $.hotproxy = true;
            console.log(ll1lii.code + "-" + ll1lii.data?.["bizMsg"]);
          } else {
            if (ll1lii.errMsg) {
              $.hotproxy = true;
              console.log(ll1lii.code + "-" + ll1lii.errMsg);
            } else {
              ll1lii.msg ? ($.hotproxy = true, console.log(ll1lii.code + "-" + ll1lii.msg)) : console.log("❓" + I1Illl + " " + JSON.stringify(ll1lii));
            }
          }
        }
        break;
    }
  } catch (li1l) {
    console.log("❌ 未能正确处理 " + I1Illl + " 请求响应 " + (li1l.message || li1l));
  }
}
async function I1iI11(iiI1li) {
  if ($.runEnd || $.outFlag) {
    return;
  }
  let i1111I = "",
    IliIl1 = "",
    lIl1lI = "POST",
    iiI1ll = "",
    lIiliI = {};
  switch (iiI1li) {
    case "farm_home":
      lIiliI = {
        appId: "c57f6",
        functionId: "farm_home",
        appid: "signed_wh5",
        clientVersion: "12.2.0",
        client: "ios",
        body: {
          version: 1
        },
        version: "4.2",
        ua: $.UA,
        t: true
      };
      iiI1ll = await I1lIII.getH5st(lIiliI);
      i1111I = "https://api.m.jd.com/client.action";
      IliIl1 = "" + iiI1ll.params;
      break;
    case "farm_assist_init_info":
      lIiliI = {
        appId: "c57f6",
        functionId: "farm_assist_init_info",
        appid: "signed_wh5",
        clientVersion: "12.2.0",
        client: "ios",
        body: {
          version: 1,
          channel: 0
        },
        version: "4.2",
        ua: $.UA,
        t: true
      };
      iiI1ll = await I1lIII.getH5st(lIiliI);
      i1111I = "https://api.m.jd.com/client.action";
      IliIl1 = "" + iiI1ll.params;
      break;
    case "farm_assist_receive_award":
      lIiliI = {
        appId: "c4332",
        functionId: "farm_assist_receive_award",
        appid: "signed_wh5",
        clientVersion: "12.2.0",
        client: "ios",
        body: {
          version: 1
        },
        version: "4.2",
        ua: $.UA,
        t: true
      };
      iiI1ll = await I1lIII.getH5st(lIiliI);
      i1111I = "https://api.m.jd.com/client.action";
      IliIl1 = "" + iiI1ll.params;
      break;
    case "farm_assist":
      lIiliI = {
        appId: "28981",
        functionId: "farm_assist",
        appid: "signed_wh5",
        clientVersion: "12.2.0",
        client: "ios",
        body: {
          version: 1,
          inviteCode: $.code,
          shareChannel: "ttt3",
          assistChannel: ""
        },
        version: "4.2",
        ua: $.UA,
        t: true
      };
      iiI1ll = await I1lIII.getH5st(lIiliI);
      i1111I = "https://api.m.jd.com/client.action";
      IliIl1 = "" + iiI1ll.params;
      break;
    default:
      console.log("❌ 未知请求 " + iiI1li);
      return;
  }
  IliIl1 += "&screen=428*0&wqDefault=false";
  const iIiill = {
    url: i1111I,
    headers: {
      Accept: "application/json, text/plain, */*",
      "Accept-Encoding": "gzip, deflate, br",
      "Accept-Language": "zh-cn",
      Connection: "keep-alive",
      "Content-Type": "application/x-www-form-urlencoded",
      Cookie: IliIII,
      Host: "api.m.jd.com",
      Referer: "https://h5.m.jd.com/",
      "X-Referer-Page": "https://h5.m.jd.com/pb/015686010/Bc9WX7MpCW7nW9QjZ5N3fFeJXMH/index.html",
      Origin: "https://h5.m.jd.com",
      "x-rp-client": "h5_1.0.0",
      "User-Agent": $.UA
    },
    body: IliIl1,
    timeout: 30000
  };
  lIl1lI === "GET" && (delete iIiill.body, delete iIiill.headers["Content-Type"]);
  if (IIIIl1 && llIi1) {
    if (lI111l) {
      if ($.hotproxy) {
        await l1ilII();
        global.GLOBAL_AGENT.HTTP_PROXY = "http://" + IIiiIl;
        l1ilIl = 0;
        $.hotproxy = false;
        console.log("📶 " + IIiiIl);
      }
      l1ilIl++;
    }
  }
  const Ii1IIi = 1;
  let Ii1IIl = 0,
    l111I = null,
    ll1lli = false;
  while (Ii1IIl < Ii1IIi) {
    Ii1IIl > 0 && (await $.wait(1000));
    const {
      err: lilili,
      res: IliIli,
      data: lI1ilI
    } = await II11(iIiill, lIl1lI);
    if (lilili) {
      if (typeof lilili === "string" && lilili.includes("Timeout awaiting 'request'")) {
        l111I = iiI1li + " 请求超时，请检查网络重试";
      } else {
        const iIiili = IliIli?.["statusCode"];
        if (iIiili) {
          if ([403, 493].includes(iIiili)) {
            l111I = iiI1li + " 请求失败，IP被限制（Response code " + iIiili + "）";
            $.hotproxy = true;
            ll1lli = true;
          } else {
            [400, 404].includes(iIiili) ? ($.hotproxy = true, l111I = iiI1li + " 请求配置参数错误，请联系开发者进行反馈（Response code " + iIiili + "）") : ($.hotproxy = true, l111I = iiI1li + " 请求失败（Response code " + iIiili + "）");
          }
        } else {
          $.hotproxy = true;
          l111I = iiI1li + " 请求失败 => " + (lilili.message || lilili);
        }
      }
      Ii1IIl++;
    } else {
      const Ili1I1 = lI111i.getResponseCookie(IliIli),
        lI1I1i = false;
      lI1I1i && (console.log("\n---------------------------------------------------\n"), console.log("🔧 " + iiI1li + " 响应Body => " + (lI1ilI || "无") + "\n"), console.log("🔧 " + iiI1li + " 响应Cookie => " + (Ili1I1 || "无") + "\n"), console.log("🔧 " + iiI1li + " 请求参数"), console.log(iIiill), console.log("\n---------------------------------------------------\n"));
      try {
        const liI1II = JSON.parse(lI1ilI);
        Ill111(iiI1li, liI1II);
        break;
      } catch (l1liii) {
        l111I = "❌ " + iiI1li + " 接口响应数据解析失败: " + l1liii.message;
        console.log("🚫 " + iiI1li + " => " + String(lI1ilI || "无响应数据"));
        lI1I1i && (console.log("\n---------------------------------------------------\n"), console.log(activityCookie), console.log("\n---------------------------------------------------\n"));
        Ii1IIl++;
      }
      ll1lli = false;
    }
  }
  Ii1IIl >= Ii1IIi && (console.log(l111I), ll1lli && ($.outFlag = true, $.message && $.message.fix(l111I)));
}
async function II11(i1ll1, lilI1I = "POST") {
  if (lilI1I === "POST") {
    return new Promise(async I1iI1 => {
      $.post(i1ll1, (i1llI, iIIli1, Ii1l1i) => {
        I1iI1({
          err: i1llI,
          res: iIIli1,
          data: Ii1l1i
        });
      });
    });
  } else {
    if (lilI1I === "GET") {
      return new Promise(async IIlI1l => {
        $.get(i1ll1, (lI1I11, IilIl, IilIi) => {
          IIlI1l({
            err: lI1I11,
            res: IilIl,
            data: IilIi
          });
        });
      });
    } else {
      const iilIIi = "不支持的请求方法";
      return {
        err: iilIIi,
        res: null,
        data: null
      };
    }
  }
}
function l1ilII() {
  return new Promise(async iiiI1i => {
    $.get({
      url: lI111l,
      timeout: {
        request: 5000
      }
    }, (iiiI1l, Ili1Ii) => {
      if (Ili1Ii) {
        try {
          let Ii1l1I = /((2(5[0-5]|[0-4]\d))|[0-1]?\d{1,2})(\.((2(5[0-5]|[0-4]\d))|[0-1]?\d{1,2})){3}:[1-9]\d*/g,
            iilII1 = Ii1l1I.exec(Ili1Ii.body);
          IIiiIl = iilII1[0];
          global.GLOBAL_AGENT.HTTP_PROXY = "http://" + IIiiIl;
        } catch (iiiI11) {} finally {
          iiiI1i();
        }
      }
    });
  });
}
