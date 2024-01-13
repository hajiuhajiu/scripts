/*
东东水果:脚本更新地址 jd_fruit_task.js
更新时间：2021-5-18
活动入口：京东APP我的-更多工具-东东农场
==========================Quantumultx=========================
[task_local]
#东东农场日常任务
5 6-18/6 * * * jd_fruit_task.js, tag=东东农场日常任务, img-url=https://raw.githubusercontent.com/58xinian/icon/master/jdnc.png, enabled=true
=========================Loon=============================
[Script]
cron "5 6-18/6 * * *" script-path=jd_fruit_task.js,tag=东东农场日常任务

=========================Surge============================
东东农场日常任务 = type=cron,cronexp="5 6-18/6 * * *",wake-system=1,timeout=3600,script-path=jd_fruit_task.js

=========================小火箭===========================
东东农场日常任务 = type=cron,script-path=jd_fruit_task.js, cronexpr="5 6-18/6 * * *", timeout=3600, enable=true

默认浇水,不浇水设置变量 export jd_fruit_Water="true"
默认在完成每日任务后再次浇水，若保留水滴请设置变量 export DO_TEN_WATER_AGAIN="false"

*/
let lnrun = 0;

const $ = new Env('东东农场日常任务')
let cookiesArr = [],
    cookie = '',
    jdFruitShareArr = [],
    isBox = false,
    notify,
    newShareCodes,
    allMessage = ''
let shareCodes = []
let message = '',
    subTitle = '',
    option = {},
    isFruitFinished = false
const retainWater = $.isNode() ? (process.env.retainWater ? process.env.retainWater : 100) : $.getdata('retainWater') ? $.getdata('retainWater') : 100 //保留水滴大于多少g,默认100g;
let jdNotify = true //是否关闭通知，false打开通知推送，true关闭通知推送
let jdFruitBeanCard = false //农场使用水滴换豆卡(如果出现限时活动时100g水换20豆,此时比浇水划算,推荐换豆),true表示换豆(不浇水),false表示不换豆(继续浇水),脚本默认是浇水
let randomCount = $.isNode() ? 20 : 5

let l1II1 = process.env.jd_fruit_Water === "true" ? true : false;
const IlI1 = "openjd://virtual?params=%7B%20%22category%22:%20%22jump%22,%20%22des%22:%20%22m%22,%20%22url%22:%20%22https://h5.m.jd.com/babelDiy/Zeus/3KSjXqQabiTuD1cJ28QskrpWoBKT/index.html%22%20%7D",
  I1IlIl = require("./function/jdCommon"),
  l1I1i1 = require("./function/krgetH5st");
let lIiIlI = iiIi(2, "1234567890") + "-" + iiIi(4, "1234567890") + "-" + iiIi(4, "1234567890") + "-" + iiIi(5, "1234567890"),
  iilIlI = "106.475" + Math.floor(Math.random() * 899 + 100),
  i111i = "29.503" + Math.floor(Math.random() * 899 + 100),
  llIii1 = 0;
!(async () => {
  await l1iill();
  if (!cookiesArr[0]) {
    $.msg($.name, "【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取", "https://bean.m.jd.com/bean/signIndex.action", {
      "open-url": "https://bean.m.jd.com/bean/signIndex.action"
    });
    return;
  }
  console.log("该活动检测运行环境较为严格，若多次提示403则建议更换IP运行...");
  for (let IIil = 0; IIil < cookiesArr.length; IIil++) {
    if (cookiesArr[IIil]) {
      cookie = cookiesArr[IIil];
      $.UserName = decodeURIComponent(cookie.match(/pt_pin=([^; ]+)(?=;?)/) && cookie.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
      $.index = IIil + 1;
      $.isLogin = true;
      $.nickName = "";
      console.log("\n开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "\n");
      let Interval = process.env.jd_task_interval || 60 * 1000;console.log("环境变量jd_task_interval已设置为"+Interval/1000+"秒");lnrun++;if(lnrun == 3){console.log(`\n【访问接口次数达到2次，休息一分钟.....】\n`);await $.wait(Interval);lnrun = 0}
      if (!$.isLogin) {
        $.msg($.name, "【提示】cookie已失效", "京东账号" + $.index + " " + ($.nickName || $.UserName) + "\n请重新登录获取\nhttps://bean.m.jd.com/bean/signIndex.action", {
          "open-url": "https://bean.m.jd.com/bean/signIndex.action"
        });
        $.isNode() && (await notify.sendNotify($.name + "cookie已失效 - " + $.UserName, "京东账号" + $.index + " " + $.UserName + "\n请重新登录获取cookie"));
        continue;
      }
      message = "";
      subTitle = "";
      option = {};
      $.UA = I1IlIl.genUA($.UserName);
      $.retry = 0;
      llIii1++;
      await I1IlII();
      llIii1 == 5 && (console.log("\n【访问接口次数达到5次，休息30秒.....】\n"), await $.wait(30000), llIii1 = 0);
      await $.wait(10000);
    }
  }
  $.isNode() && allMessage && $.ctrTemp && (await notify.sendNotify("" + $.name, "" + allMessage));
})().catch(llIiIl => {
  $.log("", "❌ " + $.name + ", 失败! 原因: " + llIiIl + "!", "");
}).finally(() => {
  $.done();
});
async function I1IlII() {
  subTitle = "【京东账号" + $.index + "】" + ($.nickName || $.UserName);
  try {
    await IiIIi();
    if ($.farmInfo?.["farmUserPro"]) {
      message = "【水果名称】" + $.farmInfo?.["farmUserPro"]?.["name"] + "\n";
      if ($.farmInfo?.["treeState"] === 2 || $.farmInfo?.["treeState"] === 3) {
        option["open-url"] = IlI1;
        $.msg($.name, "", "【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "\n【提醒⏰】" + $.farmInfo?.["farmUserPro"]?.["name"] + "已可领取\n请去京东APP或微信小程序查看\n点击弹窗即达", option);
        $.isNode() && (await notify.sendNotify($.name + " - 账号" + $.index + " - " + ($.nickName || $.UserName) + "水果已可领取", "【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "\n【提醒⏰】" + $.farmInfo?.["farmUserPro"]?.["name"] + "已可领取\n请去京东APP或微信小程序查看"));
        return;
      } else {
        if ($.farmInfo?.["treeState"] === 1) {
          console.log("🌳 " + $.farmInfo?.["farmUserPro"]?.["name"] + "（等级" + $.farmInfo?.["farmUserPro"]?.["prizeLevel"] + "）\n");
        } else {
          if ($.farmInfo?.["treeState"] === 0) {
            option["open-url"] = IlI1;
            $.msg($.name, "", "【京东账号" + $.index + "】 " + ($.nickName || $.UserName) + "\n【提醒⏰】您忘了种植新的水果\n请去京东APP或微信小程序选购并种植新的水果\n点击弹窗即达", option);
            $.isNode() && (await notify.sendNotify($.name + " - 您忘了种植新的水果", "京东账号" + $.index + " " + ($.nickName || $.UserName) + "\n【提醒⏰】您忘了种植新的水果\n请去京东APP或微信小程序选购并种植新的水果"));
            return;
          }
        }
      }
      await l1III();
      !l1II1 ? await lIiIli() : console.log("默认浇水，不浇水设置变量export jd_fruit_Water='true'");
      await IiIII();
      await IiIiii();
      await l1IIi();
      await III1l1();
      await l1IIl();
      !process.env.DO_TEN_WATER_AGAIN ? await lIiIll() : console.log("不执行再次浇水，攒水滴");
      //await Il111();
    } else {
      if ($.farmInfo?.["code"] == 3) {
        console.log("农场初始化异常：" + $.farmInfo?.["code"] + "，未登录");
        return;
      } else {
        if ($.farmInfo?.["code"] == 6) {
          console.log("农场初始化异常：" + $.farmInfo?.["code"] + "，活动太火爆");
        } else {
          $.farmInfo?.["code"] == 2 ? console.log("农场初始化异常：" + $.farmInfo?.["code"] + "，" + $.farmInfo?.["echo"]) : console.log("农场初始化异常：" + $.farmInfo?.["code"] + "，" + $.farmInfo?.["message"]);
        }
      }
      ($.farmInfo?.["code"] == 402 || $.farmInfo?.["code"] == 403) && (await $.wait(parseInt(Math.random() * 2000 + 5000, 10)));
      $.retry < 1 && ($.retry++, console.log("等待3秒后重试，第" + $.retry + "次"), await $.wait(3000), await I1IlII());
    }
  } catch (l1I1l) {
    $.logErr(l1I1l);
  }
  await l1ili();
}
async function l1III() {
  await li1lli();
  $.farmInfo?.["todayGotWaterGoalTask"]?.["canPop"] && (await li1lll(), $.goalResult?.["code"] === "0" && console.log("【被水滴砸中】获得" + $.goalResult?.["addEnergy"] + "g💧\n"));
  if (!$.farmTask?.["gotBrowseTaskAdInit"]["f"]) {
    let IlIii = $.farmTask?.["gotBrowseTaskAdInit"]?.["userBrowseTaskAds"],
      iI11lI = 0,
      II1i11 = 0,
      IlillI = 0;
    for (let I111l1 of IlIii) {
      if (I111l1.limit <= I111l1?.["hadFinishedTimes"]) {
        console.log(I111l1?.["mainTitle"] + "+ ' 已完成");
        continue;
      }
      console.log("去做 “" + I111l1?.["mainTitle"] + "” 浏览任务");
      await illl1l(I111l1?.["advertId"], 0);
      if ($.browseResult?.["code"] === "0") {
        await illl1l(I111l1?.["advertId"], 1);
        $.browseRwardResult?.["code"] === "0" ? (console.log("任务完成，获得" + $.browseRwardResult?.["amount"] + "g💧"), iI11lI += $.browseRwardResult?.["amount"], II1i11++) : (IlillI++, console.log("领取浏览广告奖励结果：" + JSON.stringify($.browseRwardResult)));
      } else {
        IlillI++;
        console.log("浏览任务失败：" + JSON.stringify($.browseResult));
      }
    }
    IlillI > 0 ? console.log("【浏览任务】总计完成" + II1i11 + "个任务，失败" + IlillI + "个，累计获得" + iI11lI + "g💧\n") : console.log("【浏览任务】总计完成" + II1i11 + "个任务，累计获得" + iI11lI + "g💧\n");
  } else {
    console.log("【浏览任务】今天已经做过浏览广告任务\n");
  }
  !$.farmTask?.["gotThreeMealInit"]?.["f"] ? (await iiiIi1(), $.threeMeal?.["code"] === "0" ? console.log("【定时领水】获得" + $.threeMeal?.["amount"] + "g💧") : console.log("定时领水成功结果:  " + JSON.stringify($.threeMeal))) : console.log("当前不在定时领水时间断或者已经领过");
  !$.farmTask?.["waterFriendTaskInit"]["f"] ? $.farmTask?.["waterFriendTaskInit"]?.["waterFriendCountKey"] < $.farmTask?.["waterFriendTaskInit"]?.["waterFriendMax"] && (await IiII1()) : console.log("给" + $.farmTask?.["waterFriendTaskInit"]?.["waterFriendMax"] + "个好友浇水任务已完成");
  await l1I1iI();
  await IlIl();
  await IlIi();
  await IiIiil();
  await iIIlI1();
}
async function l1I1iI() {
  await li1lli();
  const l1Ilii = $.farmTask["treasureBoxInit-getBean"];
  if (!l1Ilii) {
    return;
  }
  if (!l1Ilii.f) {
    console.log("正在进行任务：" + l1Ilii?.["taskMainTitle"]);
    await Il11I(1);
    $.treasureResult?.["code"] == "0" && (await III1ii(), await $.wait(1000), await Il11I(2), $.treasureRwardResult?.["code"] == "0" ? console.log("领取" + l1Ilii?.["taskMainTitle"] + "奖励：" + $.treasureRwardResult?.["waterGram"] + "g水滴") : console.log("领取" + l1Ilii?.["taskMainTitle"] + "奖励失败"));
  } else {
    console.log(l1Ilii?.["taskMainTitle"] + " 已完成");
  }
}
async function III1l1() {
  await IiIIl();
  if ($.gotNewUserTaskForFarmResult?.["code"] === "0") {
    console.log("领取回归礼包成功，" + $.gotNewUserTaskForFarmResult?.["addEnergy"] + "g");
  } else {
    console.log("领取回归礼包失败：" + JSON.stringify($.gotNewUserTaskForFarmResult));
  }
}
async function Il111() {
  console.log("");
  await IiIIi();
  await li1lli();
  let IIil11 = $.farmTask?.["firstWaterInit"]?.["totalWaterTimes"];
  message += "【今日浇水】" + IIil11 + "次\n";
  message += "【剩余水滴】" + $.farmInfo?.["farmUserPro"]?.["totalEnergy"] + "g💧\n";
  message += "【水果进度】" + ($.farmInfo?.["farmUserPro"]?.["treeEnergy"] / $.farmInfo?.["farmUserPro"]?.["treeTotalEnergy"] * 100).toFixed(2) + "%，已浇水" + $.farmInfo?.["farmUserPro"]?.["treeEnergy"] / 10 + "次还需" + ($.farmInfo?.["farmUserPro"]?.["treeTotalEnergy"] - $.farmInfo?.["farmUserPro"]?.["treeEnergy"]) / 10 + "次\n";
  if ($.farmInfo?.["toFlowTimes"] > $.farmInfo?.["farmUserPro"]?.["treeEnergy"] / 10) {
    message += "【开花进度】再浇水" + ($.farmInfo?.["toFlowTimes"] - $.farmInfo?.["farmUserPro"]?.["treeEnergy"] / 10) + "次开花\n";
  } else {
    $.farmInfo?.["toFruitTimes"] > $.farmInfo?.["farmUserPro"]?.["treeEnergy"] / 10 && (message += "【结果进度】再浇水" + ($.farmInfo?.["toFruitTimes"] - $.farmInfo?.["farmUserPro"]?.["treeEnergy"] / 10) + "次结果\n");
  }
  let iI11iI = ($.farmInfo?.["farmUserPro"]?.["treeTotalEnergy"] - $.farmInfo?.["farmUserPro"]?.["treeEnergy"] - $.farmInfo?.["farmUserPro"]?.["totalEnergy"]) / 10,
    l1IliI = Math.ceil(iI11iI / IIil11);
  message += "【成熟预测】" + (l1IliI === 1 ? "明天" : l1IliI === 2 ? "后天" : l1IliI + "天之后") + "(" + i1Ii11(86400000 * l1IliI + Date.now()) + "日)可兑换水果🍉";
}
async function lIiIli() {
  jdFruitBeanCard = $.getdata("jdFruitBeanCard") ? $.getdata("jdFruitBeanCard") : jdFruitBeanCard;
  $.isNode() && process.env.FRUIT_BEAN_CARD && (jdFruitBeanCard = process.env.FRUIT_BEAN_CARD);
  await iIIlII();
  const {
    fastCard: liIl11,
    doubleCard: i11IIl,
    beanCard: IIl11I,
    signCard: i11IIi
  } = $.myCardInfoRes;
  if ("" + jdFruitBeanCard === "true" && JSON.stringify($.myCardInfoRes).match("限时翻倍") && IIl11I > 0) {
    console.log("您设置的是使用水滴换豆卡，且背包有水滴换豆卡" + IIl11I + "张, 跳过10次浇水任务");
    return;
  }
  if ($.farmTask?.["totalWaterTaskInit"]?.["totalWaterTaskTimes"] < $.farmTask?.["totalWaterTaskInit"]?.["totalWaterTaskLimit"]) {
    console.log("\n开始做浇水十次任务");
    let iliI1l = 0;
    isFruitFinished = false;
    for (; iliI1l < $.farmTask?.["totalWaterTaskInit"]?.["totalWaterTaskLimit"] - $.farmTask?.["totalWaterTaskInit"]?.["totalWaterTaskTimes"]; iliI1l++) {
      console.log("进行第" + (iliI1l + 1) + "次浇水");
      await IlIi1i();
      await $.wait(2000);
      if ($.waterResult?.["code"] === "0") {
        console.log("浇水成功，剩余水滴" + $.waterResult?.["totalEnergy"] + "g");
        if ($.waterResult?.["finished"]) {
          isFruitFinished = true;
          break;
        } else {
          if ($.waterResult?.["totalEnergy"] < 10) {
            console.log("水滴不够，结束浇水");
            break;
          }
          await lIlliI();
        }
      } else {
        console.log("浇水出现异常，不再继续浇水 " + JSON.stringify($.waterResult));
        break;
      }
    }
    isFruitFinished && (option["open-url"] = IlI1, $.msg($.name, "", "【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "\n【提醒⏰】" + $.farmInfo?.["farmUserPro"]?.["name"] + "已可领取\n请去京东APP或微信小程序查看\n点击弹窗即达", option), $.done(), $.isNode() && (await notify.sendNotify($.name + " - 账号" + $.index + " - " + ($.nickName || $.UserName) + "水果已可领取", "京东账号" + $.index + " " + ($.nickName || $.UserName) + "\n" + $.farmInfo?.["farmUserPro"]?.["name"] + "已可领取")));
  } else {
    console.log("今日已完成10次浇水任务");
  }
}
async function IiIII() {
  await li1lli();
  !$.farmTask?.["firstWaterInit"]["f"] && $.farmTask?.["firstWaterInit"]?.["totalWaterTimes"] > 0 ? (await I1IlI1(), $.firstWaterReward?.["code"] === "0" ? console.log("获得首次浇水奖励" + $.firstWaterReward?.["amount"] + "g💧") : console.log("领取首次浇水奖励结果:  " + JSON.stringify($.firstWaterReward))) : console.log("首次浇水奖励已领取");
}
async function IiIiii() {
  if (!$.farmTask?.["totalWaterTaskInit"]?.["f"] && $.farmTask?.["totalWaterTaskInit"]?.["totalWaterTaskTimes"] >= $.farmTask?.["totalWaterTaskInit"]?.["totalWaterTaskLimit"]) {
    await III1il();
    if ($.totalWaterReward?.["code"] === "0") {
      console.log("获得十次浇水奖励" + $.totalWaterReward?.["totalWaterTaskEnergy"] + "g💧");
    } else {
      console.log("领取10次浇水奖励结果:  " + JSON.stringify($.totalWaterReward));
    }
  } else {
    $.farmTask?.["totalWaterTaskInit"]?.["totalWaterTaskTimes"] < $.farmTask?.["totalWaterTaskInit"]?.["totalWaterTaskLimit"] && console.log("【十次浇水奖励】任务未完成，今日浇水" + $.farmTask?.["totalWaterTaskInit"]?.["totalWaterTaskTimes"] + "次\n");
  }
}
async function lIiIll() {
  await IiIIi();
  let I111li = $.farmInfo?.["farmUserPro"]?.["totalEnergy"];
  console.log("当前水滴" + I111li + "g💧");
  await iIIlII();
  const {
    fastCard: l11li,
    doubleCard: iIlli,
    beanCard: l11ll,
    signCard: Ii1ll
  } = $.myCardInfoRes;
  console.log("当前背包道具：\n快速浇水卡 " + (l11li === -1 ? "未解锁" : l11li + "张") + "\n水滴翻倍卡 " + (iIlli === -1 ? "未解锁" : iIlli + "张") + "\n水滴换京豆卡 " + (l11ll === -1 ? "未解锁" : l11ll + "张") + "\n加签卡 " + (Ii1ll === -1 ? "未解锁" : Ii1ll + "张") + "\n");
  if (I111li >= 100 && iIlli > 0) {
    for (let I1Ii = 0; I1Ii < new Array(iIlli).fill("").length; I1Ii++) {
      await IlIi1l("doubleCard");
      console.log("使用翻倍水滴卡结果：" + JSON.stringify($.userMyCardRes));
    }
    await IiIIi();
    I111li = $.farmInfo?.["farmUserPro"]?.["totalEnergy"];
  }
  if (Ii1ll > 0) {
    for (let l1li1i = 0; l1li1i < new Array(Ii1ll).fill("").length; l1li1i++) {
      await IlIi1l("signCard");
      if ($.userMyCardRes?.["code"] === "20") {
        console.log("使用加签卡结果：使用已达上限");
        break;
      } else {
        console.log("使用加签卡结果：" + JSON.stringify($.userMyCardRes));
      }
    }
    console.log("");
    await IiIIi();
    I111li = $.farmInfo?.["farmUserPro"]?.["totalEnergy"];
  }
  jdFruitBeanCard = $.getdata("jdFruitBeanCard") ? $.getdata("jdFruitBeanCard") : jdFruitBeanCard;
  $.isNode() && process.env.FRUIT_BEAN_CARD && (jdFruitBeanCard = process.env.FRUIT_BEAN_CARD);
  if ("" + jdFruitBeanCard === "true" && JSON.stringify($.myCardInfoRes).match("限时翻倍")) {
    console.log("\n您设置的是水滴换豆功能，现在为您换豆");
    if (I111li >= 100 && $.myCardInfoRes?.["beanCard"] > 0) {
      await IlIi1l("beanCard");
      console.log("使用水滴换豆卡结果：" + JSON.stringify($.userMyCardRes));
      if ($.userMyCardRes.code === "0") {
        message += "【水滴换豆卡】获得" + $.userMyCardRes?.["beanCount"] + "个京豆\n";
        return;
      }
    } else {
      console.log("您目前水滴：" + I111li + "g,水滴换豆卡" + $.myCardInfoRes?.["beanCard"] + "张,暂不满足水滴换豆的条件,为您继续浇水");
    }
  }
  if (I111li < retainWater) {
    console.log("保留水滴不足,停止继续浇水");
    return;
  }
  let iIlll = I111li - retainWater;
  if (iIlll >= $.farmInfo?.["farmUserPro"]?.["treeTotalEnergy"] - $.farmInfo?.["farmUserPro"]?.["treeEnergy"]) {
    isFruitFinished = false;
    for (let lIiIII = 0; lIiIII < ($.farmInfo?.["farmUserPro"]?.["treeTotalEnergy"] - $.farmInfo?.["farmUserPro"]?.["treeEnergy"]) / 10; lIiIII++) {
      await IlIi1i();
      if ($.waterResult?.["code"] === "0") {
        console.log("浇水10g成功，剩余" + $.waterResult?.["totalEnergy"] + "g");
        if ($.waterResult?.["finished"]) {
          isFruitFinished = true;
          break;
        }
      } else {
        console.log("浇水出现失败异常,跳出不在继续浇水");
        break;
      }
    }
    isFruitFinished && (option["open-url"] = IlI1, $.msg($.name, "", "【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "\n【提醒⏰】" + $.farmInfo?.["farmUserPro"]?.["name"] + "已可领取\n请去京东APP或微信小程序查看\n点击弹窗即达", option), $.done(), $.isNode() && (await notify.sendNotify($.name + " - 账号" + $.index + " - " + ($.nickName || $.UserName) + "水果已可领取", "京东账号" + $.index + " " + ($.nickName || $.UserName) + "\n" + $.farmInfo?.["farmUserPro"]?.["name"] + "已可领取")));
  } else {
    if (iIlll >= 10) {
      console.log("目前剩余水滴" + I111li + "g，可继续浇水");
      isFruitFinished = false;
      for (let I1Il1i = 0; I1Il1i < parseInt(iIlll / 10); I1Il1i++) {
        await IlIi1i();
        if ($.waterResult?.["code"] === "0") {
          console.log("浇水10g成功，剩余" + $.waterResult?.["totalEnergy"] + "g");
          if ($.waterResult?.["finished"]) {
            isFruitFinished = true;
            break;
          } else {
            await lIlliI();
          }
        } else {
          console.log("浇水异常：" + JSON.stringify($.waterResult));
          break;
        }
      }
      isFruitFinished && (option["open-url"] = IlI1, $.msg($.name, "", "【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "\n【提醒⏰】" + $.farmInfo?.["farmUserPro"]?.["name"] + "已可领取\n请去京东APP或微信小程序查看\n点击弹窗即达", option), $.done(), $.isNode() && (await notify.sendNotify($.name + " - 账号" + $.index + " - " + ($.nickName || $.UserName) + "水果已可领取", "京东账号" + $.index + " " + ($.nickName || $.UserName) + "\n" + $.farmInfo?.["farmUserPro"]?.["name"] + "已可领取")));
    } else {
      console.log("目前剩余水滴" + I111li + "g，不再继续浇水以满足次日完成“十次浇水得水滴”任务");
    }
  }
}
function lIlliI() {
  return new Promise(async IIlIil => {
    if ($.waterResult?.["waterStatus"] === 0 && $.waterResult?.["treeEnergy"] === 10) {
      await IiIiiI("1");
      $.gotStageAwardForFarmRes?.["code"] === "0" ? console.log("【果树发芽了】奖励" + $.gotStageAwardForFarmRes?.["addEnergy"]) : console.log("浇水阶段奖励1领取结果 " + JSON.stringify($.gotStageAwardForFarmRes));
    } else {
      if ($.waterResult?.["waterStatus"] === 1) {
        await IiIiiI("2");
        $.gotStageAwardForFarmRes?.["code"] === "0" ? console.log("【果树开花了】奖励" + $.gotStageAwardForFarmRes?.["addEnergy"] + "g💧") : console.log("浇水阶段奖励2领取结果 " + JSON.stringify($.gotStageAwardForFarmRes));
      } else {
        $.waterResult?.["waterStatus"] === 2 && (await IiIiiI("3"), $.gotStageAwardForFarmRes?.["code"] === "0" ? console.log("【果树结果了】奖励" + $.gotStageAwardForFarmRes?.["addEnergy"] + "g💧") : console.log("浇水阶段奖励3领取结果 " + JSON.stringify($.gotStageAwardForFarmRes)));
      }
    }
    IIlIil();
  });
}
async function iIIlI1() {
  await lIllii();
  if ($.initForTurntableFarmRes?.["code"] === "0") {
    let {
      timingIntervalHours: il111l,
      timingLastSysTime: iIl1Il,
      sysTime: il111i,
      timingGotStatus: iI1iII,
      remainLotteryTimes: l111Ii,
      turntableInfos: lI1i11
    } = $.initForTurntableFarmRes;
    console.log("\n开始进行天天抽奖任务：");
    if (!iI1iII) {
      if (il111i > iIl1Il + 3600 * il111l * 1000) {
        await IIiI();
        if ($.timingAwardRes?.["code"] === "0") {
          console.log("领取定时奖励成功");
        } else {
          console.log("领取定时奖励结果：" + JSON.stringify($.timingAwardRes));
        }
        await lIllii();
        l111Ii = $.initForTurntableFarmRes?.["remainLotteryTimes"];
      }
    }
    if ($.initForTurntableFarmRes?.["turntableBrowserAds"] && $.initForTurntableFarmRes?.["turntableBrowserAds"]["length"] > 0) {
      for (let i1iiII = 0; i1iiII < $.initForTurntableFarmRes?.["turntableBrowserAds"]["length"]; i1iiII++) {
        !$.initForTurntableFarmRes?.["turntableBrowserAds"][i1iiII]["status"] ? (await l1iil1(1, $.initForTurntableFarmRes?.["turntableBrowserAds"][i1iiII]["adId"]), $.browserForTurntableFarmRes?.["code"] === "0" && $.browserForTurntableFarmRes?.["status"] && (console.log("第" + (i1iiII + 1) + "个逛会场任务完成"), await l1iil1(2, $.initForTurntableFarmRes?.["turntableBrowserAds"][i1iiII]["adId"]), $.browserForTurntableFarmRes?.["code"] === "0" && (console.log("领取水滴奖励成功"), await lIllii(), l111Ii = $.initForTurntableFarmRes?.["remainLotteryTimes"]))) : console.log("已完成第" + (i1iiII + 1) + "个浏览会场任务");
      }
    }
    if (l111Ii > 0) {
      let I1III = "";
      for (let l1II1I = 0; l1II1I < new Array(l111Ii).fill("").length; l1II1I++) {
        await l1il1();
        if ($.lotteryRes?.["code"] === "0") {
          if ($.lotteryRes.type !== "thanks") {
            lI1i11.map(iiliI1 => {
              if (iiliI1.type === $.lotteryRes?.["type"]) {
                if ($.lotteryRes.type.match(/bean/g) && $.lotteryRes.type.match(/bean/g)[0] === "bean") {
                  I1III += iiliI1.name + "个，";
                } else {
                  $.lotteryRes.type.match(/water/g) && $.lotteryRes.type.match(/water/g)[0] === "water" ? I1III += iiliI1.name + "，" : I1III += iiliI1.name + "，";
                }
              }
            });
            if ($.lotteryRes?.["remainLotteryTimes"] === 0) {
              break;
            }
          }
        } else {
          console.log("第" + (l1II1I + 1) + "次抽奖结果 " + JSON.stringify($.lotteryRes));
        }
      }
      I1III && console.log("抽奖获得：" + I1III.substr(0, I1III.length - 1));
    } else {
      console.log("天天抽奖：抽奖机会为0次");
    }
  } else {
    console.log("初始化天天抽奖得好礼失败");
  }
}
async function IiIiil() {
  await Il11i();
  if ($.farmAssistResult?.["code"] === "0") {
    if ($.farmAssistResult?.["assistFriendList"] && $.farmAssistResult?.["assistFriendList"]?.["length"] >= 2) {
      if ($.farmAssistResult?.["status"] === 2) {
        let iIilIi = 0;
        for (let IllI of Object.keys($.farmAssistResult.assistStageList)) {
          let iIilIl = $.farmAssistResult?.["assistStageList"][IllI];
          iIilIl.stageStaus === 2 && (await illl11(), $.receiveStageEnergy.code === "0" && (console.log("已成功领取第" + (IllI + 1) + "阶段好友助力奖励：" + $.receiveStageEnergy?.["amount"] + "g💧"), iIilIi += $.receiveStageEnergy?.["amount"]));
        }
        message += "【额外奖励】领取成功，获得" + iIilIi + "g💧\n";
      } else {
        $.farmAssistResult?.["status"] === 3 && (console.log("已经领取过8好友助力额外奖励"), message += "【额外奖励】领取失败，原因：已被领取过\n");
      }
    } else {
      console.log("助力好友未达到2个");
      message += "【额外奖励】领取失败，原因：给您助力的人未达2个\n";
    }
    if ($.farmAssistResult?.["assistFriendList"] && $.farmAssistResult?.["assistFriendList"]["length"] > 0) {
      let il1Iil = "";
      $.farmAssistResult?.["assistFriendList"]["map"]((ii11ll, il1Iii) => {
        il1Iii === $.farmAssistResult?.["assistFriendList"]["length"] - 1 ? il1Iil += ii11ll.nickName || "匿名用户" : il1Iil += (ii11ll.nickName || "匿名用户") + ",";
        let iI1iIi = new Date(ii11ll.time),
          iI1iIl = iI1iIi.getFullYear() + "-" + (iI1iIi.getMonth() + 1) + "-" + iI1iIi.getDate() + " " + iI1iIi.getHours() + ":" + iI1iIi.getMinutes() + ":" + iI1iIi.getMinutes();
        console.log("京东昵称【" + (ii11ll.nickName || "匿名用户") + "】 在 " + iI1iIl + " 给您助过力");
      });
      message += "【助力您的好友】" + il1Iil + "\n";
    }
  } else {
    await lillI();
    if ($.masterHelpResult?.["code"] === "0") {
      $.masterHelpResult?.["masterHelpPeoples"] && $.masterHelpResult?.["masterHelpPeoples"]["length"] >= 5 ? !$.masterHelpResult?.["masterGotFinal"] ? (await illl1I(), $.masterGotFinished?.["code"] === "0" && (console.log("已成功领取好友助力奖励：【" + $.masterGotFinished?.["amount"] + "】g水"), message += "【额外奖励】" + $.masterGotFinished?.["amount"] + "g水领取成功\n")) : (console.log("已经领取过5好友助力额外奖励"), message += "【额外奖励】已被领取过\n") : (console.log("助力好友未达到5个"), message += "【额外奖励】领取失败,原因：给您助力的人未达5个\n");
      if ($.masterHelpResult?.["masterHelpPeoples"] && $.masterHelpResult?.["masterHelpPeoples"]["length"] > 0) {
        let iI1Ii = "";
        $.masterHelpResult?.["masterHelpPeoples"]["map"]((IiIIIl, IiIIIi) => {
          if (IiIIIi === $.masterHelpResult?.["masterHelpPeoples"]["length"] - 1) {
            iI1Ii += IiIIIl.nickName || "匿名用户";
          } else {
            iI1Ii += (IiIIIl.nickName || "匿名用户") + ",";
          }
          let i111ii = new Date(IiIIIl.time),
            lI11i = i111ii.getFullYear() + "-" + (i111ii.getMonth() + 1) + "-" + i111ii.getDate() + " " + i111ii.getHours() + ":" + i111ii.getMinutes() + ":" + i111ii.getMinutes();
          console.log("\n京东昵称【" + (IiIIIl.nickName || "匿名用户") + "】 在 " + lI11i + " 给您助过力\n");
        });
        message += "【助力您的好友】" + iI1Ii + "\n";
      }
      console.log("领取额外奖励水滴结束\n");
    }
  }
}
async function IlIi() {
  let Ill1 = !$.farmTask?.["waterRainInit"]?.["f"];
  if (Ill1) {
    $.farmTask?.["waterRainInit"]?.["lastTime"] && Date.now() < $.farmTask?.["waterRainInit"]?.["lastTime"] + 10800000 && (Ill1 = false, console.log("第" + ($.farmTask?.["waterRainInit"]?.["winTimes"] + 1) + "次水滴雨未到时间，请" + new Date($.farmTask?.["waterRainInit"]?.["lastTime"] + 10800000).toLocaleTimeString() + "再试\n"));
    Ill1 && (await l1iiil(), $.waterRain.code === "0" && console.log("完成水滴雨任务，获得" + $.waterRain?.["addEnergy"] + "g💧"));
  }
}
async function IlIl() {
  await l1ilI();
  if ($.clockInInit.code === "0") {
    !$.clockInInit.todaySigned && (await IIi1(), $.clockInForFarmRes?.["code"] === "0" ? (console.log("每日签到任务完成，获得" + $.clockInForFarmRes?.["amount"] + "g💧"), $.clockInForFarmRes?.["signDay"] === 7 && (await l1iiii(), $.gotClockInGiftRes?.["code"] === "0" && console.log("领取惊喜礼包成功，获得" + $.gotClockInGiftRes?.["amount"] + "g💧\n"))) : console.log("签到结果 " + JSON.stringify($.clockInForFarmRes)));
    $.clockInInit?.["todaySigned"] && $.clockInInit?.["totalSigned"] === 7 && (await l1iiii(), $.gotClockInGiftRes?.["code"] === "0" && console.log("领取惊喜礼包成功，获得" + $.gotClockInGiftRes?.["amount"] + "g💧\n"));
    if ($.clockInInit?.["themes"] && $.clockInInit?.["themes"]["length"] > 0) {
      for (let i1liII of $.clockInInit?.["themes"]) {
        !i1liII?.["hadGot"] && (await illl1i(i1liII?.["id"], "theme", "1"), $.themeStep1?.["code"] === "0" && (await illl1i(i1liII.id, "theme", "2"), $.themeStep2.code === "0" && console.log("限时关注任务完成，获得" + $.themeStep2?.["amount"] + "g💧")));
      }
    }
    if ($.clockInInit?.["venderCoupons"] && $.clockInInit?.["venderCoupons"]["length"] > 0) {
      for (let ilII1l of $.clockInInit?.["venderCoupons"]) {
        !ilII1l.hadGot && (await illl1i(ilII1l.id, "venderCoupon", "1"), $.venderCouponStep1?.["code"] === "0" && (await illl1i(ilII1l.id, "venderCoupon", "2"), $.venderCouponStep2?.["code"] === "0" && console.log("完成限时领券任务，获得" + $.venderCouponStep2?.["amount"] + "g💧")));
      }
    }
  }
}
async function IiII1() {
  await iiiIl1();
  await li1lli();
  const {
    waterFriendCountKey: IIiIl,
    waterFriendMax: iiiiI1
  } = $.farmTask?.["waterFriendTaskInit"];
  IIiIl > 0 && console.log("今日已给" + IIiIl + "个好友浇水");
  if (IIiIl < iiiiI1) {
    let I11lil = [];
    if ($.friendList?.["friends"] && $.friendList?.["friends"]["length"] > 0) {
      $.friendList.friends.map((I11lii, li1Ill) => {
        I11lii.friendState === 1 && I11lil.length < iiiiI1 - IIiIl && I11lil.push(I11lii.shareCode);
      });
      let Ili1li = 0,
        lIlIil = "";
      for (let Ili1ll = 0; Ili1ll < I11lil.length; Ili1ll++) {
        await IIl1(I11lil[Ili1ll]);
        if ($.waterFriendForFarmRes?.["code"] === "0") {
          Ili1li++;
          if ($.waterFriendForFarmRes?.["cardInfo"]) {
            if ($.waterFriendForFarmRes?.["cardInfo"]?.["type"] === "beanCard") {
              lIlIil += "水滴换豆卡,";
            } else {
              if ($.waterFriendForFarmRes?.["cardInfo"]?.["type"] === "fastCard") {
                lIlIil += "快速浇水卡,";
              } else {
                if ($.waterFriendForFarmRes?.["cardInfo"]?.["type"] === "doubleCard") {
                  lIlIil += "水滴翻倍卡,";
                } else {
                  $.waterFriendForFarmRes?.["cardInfo"]?.["type"] === "signCard" && (lIlIil += "加签卡,");
                }
              }
            }
          }
        } else {
          $.waterFriendForFarmRes?.["code"] === "11" && console.log("水滴不够,跳出浇水");
        }
      }
      lIlIil && lIlIil.length > 0 ? console.log("【给好友浇水】已为" + Ili1li + "个朋友浇水，获得奖励：" + lIlIil.substr(0, lIlIil.length - 1) + "\n") : console.log("【给好友浇水】已为" + Ili1li + "个朋友浇水\n");
    } else {
      console.log("您的好友列表暂无好友,快去邀请您的好友吧!");
    }
  } else {
    console.log("今日已为好友浇水量已达" + iiiiI1 + "个");
  }
}
async function l1IIi() {
  await li1lli();
  const {
    waterFriendCountKey: iili,
    waterFriendMax: IIl1Ii,
    waterFriendSendWater: ilIIl,
    waterFriendGotAward: I11ll1
  } = $.farmTask.waterFriendTaskInit;
  iili >= IIl1Ii ? !I11ll1 ? (await i1111(), $.waterFriendGotAwardRes?.["code"] === "0" ? console.log("获得给好友浇水奖励" + $.waterFriendGotAwardRes?.["addWater"] + "g💧\n") : console.log("领取给" + IIl1Ii + "个好友浇水后的奖励水滴：" + JSON.stringify($.waterFriendGotAwardRes))) : console.log("给好友浇水的" + ilIIl + "g水滴奖励已领取\n") : console.log("暂未给" + IIl1Ii + "个好友浇水\n");
}
async function l1IIl() {
  for (let Ii11II = 0; Ii11II < 10; Ii11II++) {
    await l1I1ii();
    if ($.duckRes?.["code"] === "0") {
      if (!$.duckRes?.["hasLimit"]) {
        console.log("小鸭子游戏:" + $.duckRes?.["title"]);
      } else {
        console.log("" + $.duckRes?.["title"]);
        break;
      }
    } else {
      if ($.duckRes?.["code"] === "10") {
        console.log("小鸭子游戏达到上限");
        break;
      }
    }
  }
}
async function l1I1il() {
  try {
    await IiIIi();
    if ($.farmInfo.farmUserPro) {
      console.log("\n【京东账号" + $.index + "（" + $.UserName + "）的" + $.name + "好友互助码】" + $.farmInfo?.["farmUserPro"]?.["shareCode"] + "\n");
      jdFruitShareArr.push($.farmInfo.farmUserPro.shareCode);
    }
  } catch (lIlIll) {
    $.logErr(lIlIll);
  }
}
function III1ii() {
  return new Promise(I1II1I => {
    const liIiiI = {
      url: "https://api.m.jd.com/client.action?functionId=beanTaskList",
      body: "body=%7B%22viewChannel%22%3A%22AppHome%22%7D&build=167853&client=apple&clientVersion=10.2.0&d_brand=apple&d_model=iPhone11%2C8&ef=1&eid=eidIf12a8121eas2urxgGc%2BzS5%2BUYGu1Nbed7bq8YY%2BgPd0Q0t%2BiviZdQsxnK/HTA7AxZzZBrtu1ulwEviYSV3QUuw2XHHC%2BPFHdNYx1A/3Zt8xYR%2Bd3&ep=%7B%22ciphertype%22%3A5%2C%22cipher%22%3A%7B%22screen%22%3A%22ENS4AtO3EJS%3D%22%2C%22osVersion%22%3A%22CJGkDy4n%22%2C%22openudid%22%3A%22ENq3CzTwENGmYtc3ENSnYtC0DWTwCNdwZNcnZtYmEWU2ZwYnCwY0Cm%3D%3D%22%2C%22area%22%3A%22CJvpCJYmCV81CNS1EP82Ctq1EK%3D%3D%22%2C%22uuid%22%3A%22aQf1ZRdxb2r4ovZ1EJZhcxYlVNZSZz09%22%7D%2C%22ts%22%3A1637625634%2C%22hdid%22%3A%22JM9F1ywUPwflvMIpYPok0tt5k9kW4ArJEU3lfLhxBqw%3D%22%2C%22version%22%3A%221.0.3%22%2C%22appname%22%3A%22com.360buy.jdmobile%22%2C%22ridx%22%3A-1%7D&ext=%7B%22prstate%22%3A%220%22%7D&isBackground=N&joycious=117&lang=zh_CN&networkType=4g&networklibtype=JDNetworkBaseAF&partner=apple&rfs=0000&scope=11&sign=778b3d3d83e0d3f45508a958f306abda&st=1637627411874&sv=101&uemps=0-0&uts=0f31TVRjBSsqndu4/jgUPz6uymy50MQJ1DpIH6AlcMry0eQsMwEN/GgP2FpcEJvoNVODK8ho6G6xfFEYSmOOdwauVOUqIQFPdxhcdWdM05U%2BMN5h6umteQ78SpJGXOymjKiTiGjvSOiTpoqO8k%2BT6stsfe0WS9QQ41HfWeVF6cdpDTzsmufz0XDdJ6CcltPUazK5UqRSuo0UyDMBmw/oWg%3D%3D",
      headers: {
        Cookie: cookie,
        Host: "api.m.jd.com",
        Accept: "*/*",
        Connection: "keep-alive",
        "User-Agent": $.isNode() ? process.env.JD_USER_AGENT ? process.env.JD_USER_AGENT : require("./USER_AGENTS").USER_AGENT : $.getdata("JDUA") ? $.getdata("JDUA") : "jdapp;iPhone;9.4.4;14.3;network/4g;Mozilla/5.0 (iPhone; CPU iPhone OS 14_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1",
        "Accept-Language": "zh-Hans-CN;q=1,en-CN;q=0.9",
        "Accept-Encoding": "gzip,deflate,br",
        "Content-Type": "application/x-www-form-urlencoded"
      }
    };
    $.post(liIiiI, (Il1l1I, lIII, iI11) => {
      try {
        Il1l1I ? (console.log("" + JSON.stringify(Il1l1I)), console.log($.name + " beanTaskList API请求失败，请检查网路重试")) : iI11 = $.toObj(iI11);
      } catch (Iili11) {
        $.logErr(Iili11, lIII);
      } finally {
        I1II1I();
      }
    });
  });
}
async function l1I1ii() {
  $.duckRes = await l1ill("totalWaterTaskForFarm", {
    type: 2,
    version: 6,
    channel: 2
  });
}
async function III1il() {
  $.totalWaterReward = await l1ill("totalWaterTaskForFarm");
}
async function I1IlI1() {
  $.firstWaterReward = await l1ill("firstWaterTaskForFarm");
}
async function i1111() {
  $.waterFriendGotAwardRes = await l1ill("waterFriendGotAwardForFarm", {
    version: 4,
    channel: 1
  });
}
async function iIIlII() {
  $.myCardInfoRes = await l1ill("myCardInfoForFarm", {
    version: 5,
    channel: 1
  });
}
async function IlIi1l(l11Iil) {
  $.userMyCardRes = await l1ill("userMyCardForFarm", {
    cardType: l11Iil
  });
}
async function IiIiiI(iII) {
  $.gotStageAwardForFarmRes = await l1ill("gotStageAwardForFarm", {
    type: iII
  });
}
async function IlIi1i() {
  await $.wait(1000);
  $.waterResult = await l1ill("waterGoodForFarm", {
    type: "",
    version: 25,
    channel: 1,
    babelChannel: 0,
    lat: i111i,
    lng: iilIlI
  });
}
async function lIllii() {
  $.initForTurntableFarmRes = await l1ill("initForTurntableFarm", {
    version: 4,
    channel: 1
  });
}
async function l1il1() {
  await $.wait(2000);
  $.lotteryRes = await l1ill("lotteryForTurntableFarm", {
    type: 1,
    version: 4,
    channel: 1
  });
}
async function IIiI() {
  $.timingAwardRes = await l1ill("timingAwardForTurntableFarm", {
    version: 4,
    channel: 1
  });
}
async function l1iil1(liIiii, l11Ill) {
  liIiii === 1;
  liIiii === 2;
  const ilIil1 = {
    type: liIiii,
    adId: l11Ill,
    version: 4,
    channel: 1
  };
  $.browserForTurntableFarmRes = await l1ill("browserForTurntableFarm", ilIil1);
}
async function iiiIiI(l11Ili) {
  const iiI11I = {
    type: 2,
    adId: l11Ili,
    version: 4,
    channel: 1
  };
  $.browserForTurntableFarm2Res = await l1ill("browserForTurntableFarm", iiI11I);
}
async function Ill1i1() {
  $.lotteryMasterHelpRes = await l1ill("initForFarm", {
    imageUrl: "",
    nickName: "",
    shareCode: arguments[0] + "-3",
    babelChannel: "3",
    version: 4,
    channel: 1
  });
}
async function illl1I() {
  $.masterGotFinished = await l1ill("masterGotFinishedTaskForFarm");
}
async function lillI() {
  $.masterHelpResult = await l1ill("masterHelpTaskInitForFarm");
}
async function Il11i() {
  $.farmAssistResult = await l1ill("farmAssistInit", {
    version: 14,
    channel: 1,
    babelChannel: "120"
  });
}
async function illl11() {
  $.receiveStageEnergy = await l1ill("receiveStageEnergy", {
    version: 14,
    channel: 1,
    babelChannel: "120"
  });
}
async function iiI1() {
  $.inviteFriendRes = await l1ill("initForFarm", {
    imageUrl: "",
    nickName: "",
    shareCode: arguments[0] + "-inviteFriend",
    version: 4,
    channel: 2
  });
}
async function Il11l() {
  $.helpResult = await l1ill("initForFarm", {
    imageUrl: "",
    nickName: "",
    shareCode: arguments[0],
    babelChannel: "3",
    version: 2,
    channel: 1
  });
}
async function l1iiil() {
  const Ii1liI = {
    type: 1,
    hongBaoTimes: 100,
    version: 3
  };
  $.waterRain = await l1ill("waterRainForFarm", Ii1liI);
}
async function l1ilI() {
  $.clockInInit = await l1ill("clockInInitForFarm");
}
async function IIi1() {
  $.clockInForFarmRes = await l1ill("clockInForFarm", {
    type: 1
  });
}
async function illl1i(lliIl, lliIi, l1Iii1) {
  let I1i1 = {
    id: lliIl,
    type: lliIi,
    step: l1Iii1
  };
  if (lliIi === "theme") {
    if (l1Iii1 === "1") {
      $.themeStep1 = await l1ill("clockInFollowForFarm", I1i1);
    } else {
      l1Iii1 === "2" && ($.themeStep2 = await l1ill("clockInFollowForFarm", I1i1));
    }
  } else {
    if (lliIi === "venderCoupon") {
      if (l1Iii1 === "1") {
        $.venderCouponStep1 = await l1ill("clockInFollowForFarm", I1i1);
      } else {
        l1Iii1 === "2" && ($.venderCouponStep2 = await l1ill("clockInFollowForFarm", I1i1));
      }
    }
  }
}
async function l1iiii() {
  $.gotClockInGiftRes = await l1ill("gotClockInGift", {
    type: 2
  });
}
async function iiiIi1() {
  $.threeMeal = await l1ill("gotThreeMealForFarm");
}
async function illl1l(I1il, I1Iiil) {
  if (I1Iiil === 0) {
    $.browseResult = await l1ill("browseAdTaskForFarm", {
      advertId: I1il,
      type: I1Iiil
    });
  } else {
    I1Iiil === 1 && ($.browseRwardResult = await l1ill("browseAdTaskForFarm", {
      advertId: I1il,
      type: I1Iiil
    }));
  }
}
async function Il11I(I1iI) {
  const iI1i11 = {
    type: I1iI,
    babelChannel: "45",
    line: "getBean",
    version: 18,
    channel: 1
  };
  if (I1iI === 1) {
    $.treasureResult = await l1ill("ddnc_getTreasureBoxAward", iI1i11);
  } else {
    I1iI === 2 && ($.treasureRwardResult = await l1ill("ddnc_getTreasureBoxAward", iI1i11));
  }
}
async function li1lll() {
  $.goalResult = await l1ill("gotWaterGoalTaskForFarm", {
    type: 3
  });
}
async function lill1() {
  $.signResult = await l1ill("signForFarm");
}
async function IiIIl() {
  const I1l1 = {
    babelChannel: "10",
    version: 24,
    lat: i111i,
    lng: iilIlI
  };
  $.gotNewUserTaskForFarmResult = await l1ill("gotNewUserTaskForFarm", I1l1);
}
async function IiIIi() {
  $.farmInfo = await l1ill("initForFarm", {
    babelChannel: "522",
    sid: "",
    un_area: lIiIlI,
    version: 25,
    channel: 1,
    lat: i111i,
    lng: iilIlI
  });
}
async function li1lli() {
  $.farmTask = await l1ill("taskInitForFarm", {
    version: 18,
    channel: 1,
    babelChannel: "121"
  });
}
async function iiiIl1() {
  $.friendList = await l1ill("friendListInitForFarm", {
    version: 18,
    channel: 1,
    babelChannel: "45"
  });
}
async function I1i1I() {
  $.awardInviteFriendRes = await l1ill("awardInviteFriendForFarm");
}
async function IIl1(iI11i) {
  const ilIIII = {
    shareCode: iI11i,
    version: 18,
    channel: 1,
    babelChannel: "121"
  };
  $.waterFriendForFarmRes = await l1ill("waterFriendForFarm", ilIIII);
}
async function l1ili() {
  if ($.isNode() && process.env.FRUIT_NOTIFY_CONTROL) {
    $.ctrTemp = "" + process.env.FRUIT_NOTIFY_CONTROL === "false";
  } else {
    $.getdata("jdFruitNotify") ? $.ctrTemp = $.getdata("jdFruitNotify") === "false" : $.ctrTemp = "" + jdNotify === "false";
  }
  $.ctrTemp ? ($.msg($.name, subTitle, message, option), $.isNode() && (allMessage += subTitle + "\n" + message + ($.index !== cookiesArr.length ? "\n" : ""))) : $.log("" + message);
}
function i1Ii11(IiIlI1) {
  let iI11I;
  IiIlI1 ? iI11I = new Date(IiIlI1) : iI11I = new Date();
  return iI11I.getFullYear() + "-" + (iI11I.getMonth() + 1 >= 10 ? iI11I.getMonth() + 1 : "0" + (iI11I.getMonth() + 1)) + "-" + (iI11I.getDate() >= 10 ? iI11I.getDate() : "0" + iI11I.getDate());
}
function l1iill() {
  return new Promise(iI1i1I => {
    console.log("开始获取配置文件\n");
    notify = $.isNode() ? require("./sendNotify") : "";
    const iIil1i = $.isNode() ? require("./jdCookie.js") : "";
    if ($.isNode()) {
      Object.keys(iIil1i).forEach(IiI11i => {
        iIil1i[IiI11i] && cookiesArr.push(iIil1i[IiI11i]);
      });
      if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") {
        console.log = () => {};
      }
    } else {
      cookiesArr = [$.getdata("CookieJD"), $.getdata("CookieJD2"), ...iiIl($.getdata("CookiesJD") || "[]").map(iIil1l => iIil1l.cookie)].filter(iIil11 => !!iIil11);
    }
    console.log("共" + cookiesArr.length + "个京东账号\n");
    $.shareCodesArr = [];
    iI1i1I();
  });
}
function l1ill(l1li1, IIllll = {}, I1Iil1 = 1000) {
  return new Promise(IiI11I => {
    setTimeout(async () => {
      $.post(await illIIi(l1li1, IIllll), (il1li1, l111ii, i1III1) => {
        try {
          if (il1li1) {
            console.log("\n东东农场: API查询请求失败 ‼️‼️");
            console.log(JSON.stringify(il1li1));
            console.log("functionId:" + l1li1);
            $.logErr(il1li1);
          } else {
            lIi1I1(i1III1) && (i1III1 = JSON.parse(i1III1));
          }
        } catch (I1ii1) {
          $.logErr(I1ii1, l111ii);
        } finally {
          IiI11I(i1III1);
        }
      });
    }, I1Iil1);
  });
}
function lIi1I1(IiliI) {
  if (!IiliI) {
    console.log("京东服务器返回数据为空");
    return false;
  }
  try {
    if (typeof JSON.parse(IiliI) == "object") {
      return true;
    }
  } catch (Il1lI) {
    console.log(Il1lI);
    return false;
  }
}
const l1iili = {
  initForFarm: "8a2af",
  taskInitForFarm: "fcb5a",
  browseAdTaskForFarm: "53f09",
  firstWaterTaskForFarm: "0cf1e",
  waterFriendGotAwardForFarm: "d08ff",
  ddnc_getTreasureBoxAward: "67dfc",
  totalWaterTaskForFarm: "102f5",
  gotThreeMealForFarm: "57b30",
  waterGoodForFarm: "0c010",
  choiceGoodsForFarm: "5f4ca",
  gotCouponForFarm: "b1515",
  gotStageAwardForFarm: "81591",
  followVenderForBrand: "71547",
  gotWaterGoalTaskForFarm: "c901b",
  gotNewUserTaskForFarm: "de8f8",
  orderTaskGotWaterForFarm: "eed5c",
  clockInForFarm: "32b94",
  clockInFollowForFarm: "4a0b4",
  waterFriendForFarm: "673a0",
  awardFirstFriendForFarm: "9b655",
  awardInviteFriendForFarm: "2b5ca",
  awardCallOrInviteFriendForFarm: "b0b03",
  userMyCardForFarm: "86ba5",
  getCallUserCardForFarm: "2ca57",
  deleteFriendForFarm: "eaf91",
  gotLowFreqWaterForFarm: "8172b",
  getFullCollectionReward: "5c767",
  getOrderPayLotteryWater: "ef089",
  receiveStageEnergy: "15507",
  exchangeGood: "52963",
  farmAssistInit: "92354",
  myCardInfoForFarm: "157b6",
  gotPopFirstPurchaseTaskForFarm: "d432f",
  limitWaterInitForFarm: "6bdc2",
  ddnc_surpriseModal: "e81c1",
  friendInitForFarm: "a5a9c",
  clockInInitForFarm: "08dc3",
  guideTaskAward: "59bc4",
  signForFarm: "32b94",
  gotNewUserTaskForFarm: "de8f8"
};
async function illIIi(lli1l, Iili1 = {}) {
  let lli1i = "";
  const Il1l1 = l1iili[lli1l];
  if (!Il1l1) {
    lli1i = "https://api.m.jd.com/client.action?functionId=" + lli1l + "&body=" + encodeURIComponent(JSON.stringify(Iili1)) + "&appid=wh5";
  } else {
    const l1ii11 = await l1I1i1.getH5st({
      appId: Il1l1,
      appid: "signed_wh5",
      body: Iili1,
      client: "iOS",
      clientVersion: "12.2.0",
      functionId: lli1l,
      cookie: cookie,
      ua: $.UA,
      version: "4.2",
      t: true
    });
    lli1i = "https://api.m.jd.com/client.action?" + l1ii11.params;
  }
  return {
    url: lli1i,
    headers: {
      Host: "api.m.jd.com",
      Accept: "*/*",
      Origin: "https://carry.m.jd.com",
      "Accept-Encoding": "gzip,deflate,br",
      "User-Agent": $.UA,
      "Accept-Language": "zh-CN,zh-Hans;q=0.9",
      Referer: "https://carry.m.jd.com/",
      "x-requested-with": "com.jingdong.app.mall",
      Cookie: cookie
    },
    timeout: 20000
  };
}
function iiIi(IiiiIi, l1lii = "qwertyuiopasdfghjklzxcvbnm") {
  let l1ii1I = "";
  for (let l1ll1 = 0; l1ll1 < IiiiIi; l1ll1++) {
    l1ii1I += l1lii[Math.floor(Math.random() * l1lii.length)];
  }
  return l1ii1I;
}
function iiIl(Iill1) {
  if (typeof Iill1 == "string") {
    try {
      return JSON.parse(Iill1);
    } catch (i1IIIi) {
      console.log(i1IIIi);
      $.msg($.name, "", "请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie");
      return [];
    }
  }
}

function Env(t, e) { "undefined" != typeof process && JSON.stringify(process.env).indexOf("GITHUB") > -1 && process.exit(0); class s { constructor(t) { this.env = t } send(t, e = "GET") { t = "string" == typeof t ? { url: t } : t; let s = this.get; return "POST" === e && (s = this.post), new Promise((e, i) => { s.call(this, t, (t, s, r) => { t ? i(t) : e(s) }) }) } get(t) { return this.send.call(this.env, t) } post(t) { return this.send.call(this.env, t, "POST") } } return new class { constructor(t, e) { this.name = t, this.http = new s(this), this.data = null, this.dataFile = "box.dat", this.logs = [], this.isMute = !1, this.isNeedRewrite = !1, this.logSeparator = "\n", this.startTime = (new Date).getTime(), Object.assign(this, e), this.log("", `🔔${this.name}, 开始!`) } isNode() { return "undefined" != typeof module && !!module.exports } isQuanX() { return "undefined" != typeof $task } isSurge() { return "undefined" != typeof $httpClient && "undefined" == typeof $loon } isLoon() { return "undefined" != typeof $loon } toObj(t, e = null) { try { return JSON.parse(t) } catch { return e } } toStr(t, e = null) { try { return JSON.stringify(t) } catch { return e } } getjson(t, e) { let s = e; const i = this.getdata(t); if (i) try { s = JSON.parse(this.getdata(t)) } catch { } return s } setjson(t, e) { try { return this.setdata(JSON.stringify(t), e) } catch { return !1 } } getScript(t) { return new Promise(e => { this.get({ url: t }, (t, s, i) => e(i)) }) } runScript(t, e) { return new Promise(s => { let i = this.getdata("@chavy_boxjs_userCfgs.httpapi"); i = i ? i.replace(/\n/g, "").trim() : i; let r = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout"); r = r ? 1 * r : 20, r = e && e.timeout ? e.timeout : r; const [o, h] = i.split("@"), n = { url: `http://${h}/v1/scripting/evaluate`, body: { script_text: t, mock_type: "cron", timeout: r }, headers: { "X-Key": o, Accept: "*/*" } }; this.post(n, (t, e, i) => s(i)) }).catch(t => this.logErr(t)) } loaddata() { if (!this.isNode()) return {}; { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e); if (!s && !i) return {}; { const i = s ? t : e; try { return JSON.parse(this.fs.readFileSync(i)) } catch (t) { return {} } } } } writedata() { if (this.isNode()) { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e), r = JSON.stringify(this.data); s ? this.fs.writeFileSync(t, r) : i ? this.fs.writeFileSync(e, r) : this.fs.writeFileSync(t, r) } } lodash_get(t, e, s) { const i = e.replace(/\[(\d+)\]/g, ".$1").split("."); let r = t; for (const t of i) if (r = Object(r)[t], void 0 === r) return s; return r } lodash_set(t, e, s) { return Object(t) !== t ? t : (Array.isArray(e) || (e = e.toString().match(/[^.[\]]+/g) || []), e.slice(0, -1).reduce((t, s, i) => Object(t[s]) === t[s] ? t[s] : t[s] = Math.abs(e[i + 1]) >> 0 == +e[i + 1] ? [] : {}, t)[e[e.length - 1]] = s, t) } getdata(t) { let e = this.getval(t); if (/^@/.test(t)) { const [, s, i] = /^@(.*?)\.(.*?)$/.exec(t), r = s ? this.getval(s) : ""; if (r) try { const t = JSON.parse(r); e = t ? this.lodash_get(t, i, "") : e } catch (t) { e = "" } } return e } setdata(t, e) { let s = !1; if (/^@/.test(e)) { const [, i, r] = /^@(.*?)\.(.*?)$/.exec(e), o = this.getval(i), h = i ? "null" === o ? null : o || "{}" : "{}"; try { const e = JSON.parse(h); this.lodash_set(e, r, t), s = this.setval(JSON.stringify(e), i) } catch (e) { const o = {}; this.lodash_set(o, r, t), s = this.setval(JSON.stringify(o), i) } } else s = this.setval(t, e); return s } getval(t) { return this.isSurge() || this.isLoon() ? $persistentStore.read(t) : this.isQuanX() ? $prefs.valueForKey(t) : this.isNode() ? (this.data = this.loaddata(), this.data[t]) : this.data && this.data[t] || null } setval(t, e) { return this.isSurge() || this.isLoon() ? $persistentStore.write(t, e) : this.isQuanX() ? $prefs.setValueForKey(t, e) : this.isNode() ? (this.data = this.loaddata(), this.data[e] = t, this.writedata(), !0) : this.data && this.data[e] || null } initGotEnv(t) { this.got = this.got ? this.got : require("got"), this.cktough = this.cktough ? this.cktough : require("tough-cookie"), this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar, t && (t.headers = t.headers ? t.headers : {}, void 0 === t.headers.Cookie && void 0 === t.cookieJar && (t.cookieJar = this.ckjar)) } get(t, e = (() => { })) { t.headers && (delete t.headers["Content-Type"], delete t.headers["Content-Length"]), this.isSurge() || this.isLoon() ? (this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.get(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) })) : this.isQuanX() ? (this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t))) : this.isNode() && (this.initGotEnv(t), this.got(t).on("redirect", (t, e) => { try { if (t.headers["set-cookie"]) { const s = t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString(); s && this.ckjar.setCookieSync(s, null), e.cookieJar = this.ckjar } } catch (t) { this.logErr(t) } }).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) })) } post(t, e = (() => { })) { if (t.body && t.headers && !t.headers["Content-Type"] && (t.headers["Content-Type"] = "application/x-www-form-urlencoded"), t.headers && delete t.headers["Content-Length"], this.isSurge() || this.isLoon()) this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.post(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) }); else if (this.isQuanX()) t.method = "POST", this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t)); else if (this.isNode()) { this.initGotEnv(t); const { url: s, ...i } = t; this.got.post(s, i).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) }) } } time(t, e = null) { const s = e ? new Date(e) : new Date; let i = { "M+": s.getMonth() + 1, "d+": s.getDate(), "H+": s.getHours(),"h+": s.getHours(), "m+": s.getMinutes(), "s+": s.getSeconds(), "q+": Math.floor((s.getMonth() + 3) / 3), "S+": s.getMilliseconds() }; /(y+)/.test(t) && (t = t.replace(RegExp.$1, (s.getFullYear() + "").substr(4 - RegExp.$1.length))); for (let e in i) new RegExp("(" + e + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? i[e] : ("00" + i[e]).substr(("" + i[e]).length))); return t } msg(e = t, s = "", i = "", r) { const o = t => { if (!t) return t; if ("string" == typeof t) return this.isLoon() ? t : this.isQuanX() ? { "open-url": t } : this.isSurge() ? { url: t } : void 0; if ("object" == typeof t) { if (this.isLoon()) { let e = t.openUrl || t.url || t["open-url"], s = t.mediaUrl || t["media-url"]; return { openUrl: e, mediaUrl: s } } if (this.isQuanX()) { let e = t["open-url"] || t.url || t.openUrl, s = t["media-url"] || t.mediaUrl; return { "open-url": e, "media-url": s } } if (this.isSurge()) { let e = t.url || t.openUrl || t["open-url"]; return { url: e } } } }; if (this.isMute || (this.isSurge() || this.isLoon() ? $notification.post(e, s, i, o(r)) : this.isQuanX() && $notify(e, s, i, o(r))), !this.isMuteLog) { let t = ["", "==============📣系统通知📣=============="]; t.push(e), s && t.push(s), i && t.push(i), console.log(t.join("\n")), this.logs = this.logs.concat(t) } } log(...t) { t.length > 0 && (this.logs = [...this.logs, ...t]), console.log(t.join(this.logSeparator)) } logErr(t, e) { const s = !this.isSurge() && !this.isQuanX() && !this.isLoon(); s ? this.log("", `❗️${this.name}, 错误!`, t.stack) : this.log("", `❗️${this.name}, 错误!`, t) } wait(t) { return new Promise(e => setTimeout(e, t)) } done(t = {}) { const e = (new Date).getTime(), s = (e - this.startTime) / 1e3; this.log("", `🔔${this.name}, 结束! 🕛 ${s} 秒`), this.log(), (this.isSurge() || this.isQuanX() || this.isLoon()) && $done(t) } }(t, e) }
