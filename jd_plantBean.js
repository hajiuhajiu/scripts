/*
种豆得豆 脚本更新地址：jd_plantBean.js
更新时间：2021-08-20
活动入口：京东APP我的-更多工具-种豆得豆
已支持IOS京东多账号,云端多京东账号
脚本兼容: QuantumultX, Surge, Loon, JSBox, Node.js
注：会自动关注任务中的店铺跟商品，介意者勿使用。
互助码shareCode请先手动运行脚本查看打印可看到
每个京东账号每天只能帮助3个人。多出的助力码将会助力失败。

=====================================Quantumult X=================================
[task_local]
1 7-21/2 * * * https://raw.githubusercontent.com/KingRan/JDJB/main/jd_plantBean.js, tag=种豆得豆, img-url=https://raw.githubusercontent.com/58xinian/icon/master/jdzd.png, enabled=true

=====================================Loon================================
[Script]
cron "1 7-21/2 * * *" script-path=https://raw.githubusercontent.com/KingRan/JDJB/main/jd_plantBean.js,tag=京东种豆得豆

======================================Surge==========================
京东种豆得豆 = type=cron,cronexp="1 7-21/2 * * *",wake-system=1,timeout=3600,script-path=https://raw.githubusercontent.com/KingRan/JDJB/main/jd_plantBean.js

====================================小火箭=============================
京东种豆得豆 = type=cron,script-path=https://raw.githubusercontent.com/KingRan/JDJB/main/jd_plantBean.js, cronexpr="1 7-21/2 * * *", timeout=3600, enable=true

*/
const $ = new Env('种豆得豆');
let ii1lIIIl = true,
    IIlllIli = [],
    IlllliI = "",
    iiliI1l1,
    ll1IIiii,
    Ii1iIi1I,
    Illlill;

const li111l1I = require("./function/jdCommon"),
      l1ilIiII = require("./function/h5st41.js"),
      lIlIl1ll = "https://api.m.jd.com/client.action";

let ll1llIlI = "",
    li111l1l = null,
    IlII11II = null,
    liiiiI1l = [],
    I1iiI1ll = "",
    iiilIiIl;
$.newShareCode = [];
let IllIilll = 0;
!(async () => {
  await l1Ii1Il();

  if (!IIlllIli[0]) {
    $.msg($.name, "【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取", "https://bean.m.jd.com/bean/signIndex.action", {
      "open-url": "https://bean.m.jd.com/bean/signIndex.action"
    });
    return;
  }

  for (let l1IillII = 0; l1IillII < IIlllIli.length; l1IillII++) {
    if (IIlllIli[l1IillII]) {
      IlllliI = IIlllIli[l1IillII];
      $.UserName = decodeURIComponent(IlllliI.match(/pt_pin=([^; ]+)(?=;?)/) && IlllliI.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
      $.index = l1IillII + 1;
      $.isLogin = true;
      $.nickName = "";
      console.log("\n开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "\n");

      if (!$.isLogin) {
        $.msg($.name, "【提示】cookie已失效", "京东账号" + $.index + " " + ($.nickName || $.UserName) + "\n请重新登录获取\nhttps://bean.m.jd.com/bean/signIndex.action", {
          "open-url": "https://bean.m.jd.com/bean/signIndex.action"
        });

        if ($.isNode()) {
          await iiliI1l1.sendNotify($.name + "cookie已失效 - " + $.UserName, "京东账号" + $.index + " " + $.UserName + "\n请重新登录获取cookie");
        }

        continue;
      }

      Ii1iIi1I = "";
      Illlill = "";
      ll1IIiii = {};
      IllIilll++;
      $.UA = li111l1I.genUA($.UserName);
      await IlI1Il();
      IllIilll == 3 && (console.log("\n【访问接口次数达到3次，休息一分钟.....】\n"), await $.wait(60 * 1000), IllIilll = 0);
    }
  }

  $.isNode() && ll1llIlI && (await iiliI1l1.sendNotify("" + $.name, "" + ll1llIlI));
})().catch(lIiiiiI1 => {
  $.log("", "❌ " + $.name + ", 失败! 原因: " + lIiiiiI1 + "!", "");
}).finally(() => {
  $.done();
});

async function IlI1Il() {
  try {
    console.log("获取任务及基本信息");
    await iiilIl1l();

    if ($.plantBeanIndexResult.errorCode === "PB101") {
      console.log("\n活动太火爆了，还是去买买买吧！\n");
      return;
    }

    if ($.plantBeanIndexResult && $.plantBeanIndexResult.code === "0" && $.plantBeanIndexResult.data) {
      for (let il1liII1 = 0; il1liII1 < $.plantBeanIndexResult.data.roundList.length; il1liII1++) {
        if ($.plantBeanIndexResult.data.roundList[il1liII1].roundState === "2") {
          iiilIiIl = il1liII1;
          break;
        }
      }

      const i11II = $.plantBeanIndexResult.data.jwordShareInfo.shareUrl;
      $.myPlantUuid = llll11I(i11II, "plantUuid");
      console.log("\n【京东账号" + $.index + "（" + $.UserName + "）的" + $.name + "好友互助码】" + $.myPlantUuid + "\n");
      liiiiI1l = $.plantBeanIndexResult.data.roundList;
      li111l1l = liiiiI1l[iiilIiIl].roundId;
      IlII11II = liiiiI1l[iiilIiIl - 1].roundId;
      I1iiI1ll = liiiiI1l[iiilIiIl - 1].awardState;
      $.taskList = $.plantBeanIndexResult.data.taskList;
      Illlill = "【京东昵称】" + $.plantBeanIndexResult.data.plantUserInfo.plantNickName;
      Ii1iIi1I += "【上期时间】" + liiiiI1l[iiilIiIl - 1].dateDesc.replace("上期 ", "") + "\n";
      Ii1iIi1I += "【上期成长值】" + liiiiI1l[iiilIiIl - 1].growth + "\n";
      await $.wait(1000);
      await lIllIli();
      await $.wait(2000);
      await l1I1llI1();
      await $.wait(5000);
      await IIllIili();
      await $.wait(2000);
      await IiIi1I11();
      await $.wait(1000);
      await lI11illI();
      await $.wait(1000);
      await I1l111li();
      await $.wait(1000);
      await IIliIil1();
      await $.wait(1000);
    } else console.log("种豆得豆-初始失败:  " + JSON.stringify($.plantBeanIndexResult));
  } catch (Ililll1I) {
    $.logErr(Ililll1I);
    const iI1II1 = "京东账号" + $.index + " " + ($.nickName || $.UserName) + "\n任务执行异常，请检查执行日志 ‼️‼️";
    $.msg($.name, "", "" + iI1II1);
  }
}

async function lI11illI() {
  console.log("【上轮京豆】" + (I1iiI1ll === "4" ? "采摘中" : I1iiI1ll === "5" ? "可收获了" : "已领取"));
  if (I1iiI1ll === "4") Ii1iIi1I += "【上期状态】" + liiiiI1l[iiilIiIl - 1].tipBeanEndTitle + "\n";else {
    if (I1iiI1ll === "5") {
      await li1iIl1I();
      console.log("开始领取京豆");

      if ($.getReward && $.getReward.code === "0") {
        console.log("京豆领取成功");
        Ii1iIi1I += "【上期兑换京豆】" + $.getReward.data.awardBean + "个\n";
        $.msg($.name, Illlill, Ii1iIi1I);
        ll1llIlI += "京东账号" + $.index + " " + $.nickName + "\n" + Ii1iIi1I + ($.index !== IIlllIli.length ? "\n\n" : "");
      } else console.log("$.getReward 异常：" + JSON.stringify($.getReward));
    } else I1iiI1ll === "6" && (Ii1iIi1I += "【上期兑换京豆】" + liiiiI1l[iiilIiIl - 1].awardBeans + "个\n");
  }

  if (liiiiI1l[iiilIiIl].dateDesc.indexOf("本期 ") > -1) {
    liiiiI1l[iiilIiIl].dateDesc = liiiiI1l[iiilIiIl].dateDesc.substr(liiiiI1l[iiilIiIl].dateDesc.indexOf("本期 ") + 3, liiiiI1l[iiilIiIl].dateDesc.length);
  }

  Ii1iIi1I += "【本期时间】" + liiiiI1l[iiilIiIl].dateDesc + "\n";
  Ii1iIi1I += "【本期成长值】" + liiiiI1l[iiilIiIl].growth + "\n";
}

async function IiIi1I11() {
  await iiilIl1l();

  if ($.plantBeanIndexResult && $.plantBeanIndexResult.code === "0" && $.plantBeanIndexResult.data) {
    const l1llIl1i = $.plantBeanIndexResult.data.roundList[iiilIiIl];

    if (l1llIl1i.roundState === "2") {
      if (l1llIl1i.bubbleInfos && l1llIl1i.bubbleInfos.length) console.log("开始收取营养液");

      for (let l11iIIii of l1llIl1i.bubbleInfos) {
        console.log("收取-" + l11iIIii.name + "-的营养液");
        await iiI11I(l1llIl1i.roundId, l11iIIii.nutrientsType);
        console.log("收取营养液结果:" + JSON.stringify($.cultureBeanRes));
      }
    }
  } else console.log("plantBeanIndexResult:" + JSON.stringify($.plantBeanIndexResult));
}

async function IIllIili() {
  await llIiilI();

  if ($.stealFriendList && $.stealFriendList.code === "0") {
    if ($.stealFriendList.data && $.stealFriendList.data.tips) {
      console.log("\n\n今日偷取好友营养液已达上限\n\n");
      return;
    }

    if ($.stealFriendList.data && $.stealFriendList.data.friendInfoList && $.stealFriendList.data.friendInfoList.length > 0) {
      let il1liilI = new Date(new Date().getTime() + new Date().getTimezoneOffset() * 60 * 1000 + 8 * 60 * 60 * 1000);

      for (let IIII1l1i of $.stealFriendList.data.friendInfoList) {
        if (new Date(il1liilI).getHours() === 20) {
          IIII1l1i.nutrCount >= 2 && (console.log("可以偷的好友的信息paradiseUuid::" + JSON.stringify(IIII1l1i.paradiseUuid)), await iili111(IIII1l1i.paradiseUuid), console.log("偷取好友营养液情况:" + JSON.stringify($.stealFriendRes)), $.stealFriendRes && $.stealFriendRes.code === "0" && console.log("偷取好友营养液成功"));
        } else IIII1l1i.nutrCount >= 3 && (console.log("可以偷的好友的信息paradiseUuid::" + JSON.stringify(IIII1l1i.paradiseUuid)), await iili111(IIII1l1i.paradiseUuid), console.log("偷取好友营养液情况:" + JSON.stringify($.stealFriendRes)), $.stealFriendRes && $.stealFriendRes.code === "0" && console.log("偷取好友营养液成功"));

        await $.wait(1000);
      }
    }
  } else console.log("$.stealFriendList 异常： " + JSON.stringify($.stealFriendList));
}

async function I1i11lIi() {
  await IIl1l1ii();

  if ($.plantEggLotteryRes && $.plantEggLotteryRes.code === "0") {
    if ($.plantEggLotteryRes.data.restLotteryNum > 0) {
      const i11lIlil = new Array($.plantEggLotteryRes.data.restLotteryNum).fill("");
      console.log("目前共有" + i11lIlil.length + "次扭蛋的机会");

      for (let lI1lilil = 0; lI1lilil < i11lIlil.length; lI1lilil++) {
        console.log("开始第" + (lI1lilil + 1) + "次扭蛋");
        await iIlI1liI();
        console.log("天天扭蛋成功：" + JSON.stringify($.plantEggDoLotteryResult));
      }
    } else console.log("暂无扭蛋机会");
  } else console.log("查询天天扭蛋的机会失败" + JSON.stringify($.plantEggLotteryRes));
}

async function l1I1llI1() {
  if ($.taskList && $.taskList.length > 0) for (let lI1lIii of $.taskList) {
    if (lI1lIii.isFinished === 1) {
      console.log(lI1lIii.taskName + " 任务已完成\n");
      continue;
    } else {
      switch (lI1lIii.taskType) {
        case 92:
          await I1l1iI1();
          continue;

        case 57:
          await ilIill1l("https://m.jingxi.com/jxbfd/user/DoubleSignDeal?g_ty=h5&g_tk=&appCode=msd1188198&__t=1657108409440&dwEnv=7&strDeviceId=a3b4e844090b28d5c38e7529af8115172079be4d&strZone=jxbfd&bizCode=jxbfd&source=jxbfd&_cfd_t=1657108409190&_stk=__t%2C_cfd_t%2CbizCode%2CdwEnv%2Csource%2CstrDeviceId%2CstrZone&_ste=1&h5st=20220706195330228%3B1980457211661562%3B10032%3Btk02w78551ad830nuMcGB4Qsv9QxapLP7gZdOCYE5PVV%2Bna%2Bb4KU21drJq64oP82965Vdc1tGqVU%2Flp7ydcZ5XgH0Feh%3B241b6f1d21bf8e41f380a5dd29a7bac2a6f1f65a0c7ef1b1f751eaea4c40dd9c%3B3.0%3B1657108410228&sceneval=2"), await $.wait(2000), await ilIill1l("https://wq.jd.com/jxjdsignin/SignedInfo?channel=jx_zdddsq&_t=1658021925021&h5st=20220717093845024%3B5548444396555217%3B0f6ed%3Btk02w9b851b9c18nin7CZjR7vNSlwRexAOGWbYAbl85d9DiQJ1SufW8ZQEQ%2FSygreq626CVRO2gT8DwUUTLBXGyK6wam%3B7eb86560860f8f60ad3b679c34f89aacf891b5a85580efd0a30c355537bfec54%3B3.0%3B1658021925024&_stk=_t%2Cchannel&_=1658021925027&sceneval=2&g_login_type=1&g_ty=ajax&appCode=msc588d6d5"), await $.wait(1000), await ilIill1l("https://wq.jd.com/jxjdsignin/IssueReward?channel=jx_zdddsq&_t=1658021926276&h5st=20220717093846279%3B5548444396555217%3B0f6ed%3Btk02w9b851b9c18nin7CZjR7vNSlwRexAOGWbYAbl85d9DiQJ1SufW8ZQEQ%2FSygreq626CVRO2gT8DwUUTLBXGyK6wam%3Be2d7b6810b3bd1b9d9692d354ecbb582e69afc64df19bd8d6c14632b1a65660c%3B3.0%3B1658021926279&_stk=_t%2Cchannel&sceneval=2&g_login_type=1&g_ty=ajax&appCode=msc588d6d5"), await $.wait(1000);
          continue;

        case 96:
          continue;

        case 94:
          continue;

        case 3:
          console.log("开始做 " + lI1lIii.taskName + "任务");
          let iI11i1i1 = lI1lIii.totalNum - lI1lIii.gainedNum;
          if (iI11i1i1 === 0) continue;
          await il1lliII();
          const {
            data: ll11Ili1
          } = $.shopTaskListRes;
          let I1iii1I = [],
              lllIlIIl = [],
              lilil1li = [];
          const {
            goodShopList: IiilIli1,
            moreShopList: lllIiIIi
          } = ll11Ili1;

          if (IiilIli1) {
            for (let I1II1i1 of IiilIli1) {
              I1II1i1.taskState === "2" && I1iii1I.push(I1II1i1);
            }
          }

          if (lllIiIIi) {
            for (let lil1lli1 of lllIiIIi) {
              lil1lli1.taskState === "2" && lllIlIIl.push(lil1lli1);
            }
          }

          lilil1li = I1iii1I.concat(lllIlIIl);

          for (let iilill11 of lilil1li) {
            const {
              shopId: iI1ilii,
              shopTaskId: iIIIi1I1
            } = iilill11,
                  iIiiliIi = {
              "monitor_refer": "plant_shopNutrientsTask",
              "shopId": iI1ilii,
              "shopTaskId": iIIIi1I1
            },
                  lI1I1ii = await IIIi1Il("shopNutrientsTask", iIiiliIi);
            console.log("shopRes结果:" + JSON.stringify(lI1I1ii));
            lI1I1ii && lI1I1ii.code === "0" && lI1I1ii.data && lI1I1ii.data.nutrState && lI1I1ii.data.nutrState === "1" && iI11i1i1--;

            if (iI11i1i1 <= 0) {
              console.log(lI1lIii.taskName + "任务已做完\n");
              break;
            }
          }

          continue;

        case 5:
          console.log("开始做 " + lI1lIii.taskName + "任务");
          let Il1ll1iI = lI1lIii.totalNum - lI1lIii.gainedNum;
          if (Il1ll1iI === 0) continue;
          await ll1IiI1i();
          let il1iI111 = [],
              llIIli = [];
          const {
            productInfoList: iiIlllIl
          } = $.productTaskList.data;

          for (let i1Il1I1l = 0; i1Il1I1l < iiIlllIl.length; i1Il1I1l++) {
            for (let iIllIlI1 = 0; iIllIlI1 < iiIlllIl[i1Il1I1l].length; iIllIlI1++) {
              il1iI111.push(iiIlllIl[i1Il1I1l][iIllIlI1]);
            }
          }

          for (let ilII11lI of il1iI111) {
            ilII11lI.taskState === "2" && llIIli.push(ilII11lI);
          }

          for (let l111ili1 of llIIli) {
            const {
              skuId: ii1liiIi,
              productTaskId: lillI1Il
            } = l111ili1,
                  IilIlI1l = {
              "monitor_refer": "plant_productNutrientsTask",
              "productTaskId": lillI1Il,
              "skuId": ii1liiIi
            },
                  i1IIliI = await IIIi1Il("productNutrientsTask", IilIlI1l);
            i1IIliI && i1IIliI.code === "0" && i1IIliI.data && i1IIliI.data.nutrState && i1IIliI.data.nutrState === "1" && Il1ll1iI--;

            if (Il1ll1iI <= 0) {
              console.log(lI1lIii.taskName + "任务已做完\n");
              break;
            }
          }

          continue;

        case 10:
          console.log("开始做 " + lI1lIii.taskName + "任务");
          let IiI1llii = lI1lIii.totalNum - lI1lIii.gainedNum;

          if (IiI1llii === 0) {
            continue;
          }

          await Illi1III();
          let iIIli1ii = [],
              IlIllill = [],
              I11l1Ii1 = [];
          const {
            goodChannelList: lllIi1l1,
            normalChannelList: IIIl1liI
          } = $.plantChannelTaskList.data;

          for (let iIiill11 of lllIi1l1) {
            iIiill11.taskState === "2" && iIIli1ii.push(iIiill11);
          }

          for (let lI111lil of IIIl1liI) {
            lI111lil.taskState === "2" && IlIllill.push(lI111lil);
          }

          I11l1Ii1 = iIIli1ii.concat(IlIllill);

          for (let I1IIiliI of I11l1Ii1) {
            const {
              channelId: i1lilIl1,
              channelTaskId: Ii1II11I
            } = I1IIiliI,
                  ili1il1I = {
              "channelId": i1lilIl1,
              "channelTaskId": Ii1II11I
            },
                  ilIiili1 = await IIIi1Il("plantChannelNutrientsTask", ili1il1I);
            console.log("channelRes结果:" + JSON.stringify(ilIiili1));

            if (ilIiili1 && ilIiili1.code === "0") {
              ilIiili1.data && ilIiili1.data.nutrState && ilIiili1.data.nutrState === "1" && IiI1llii--;
            }

            if (IiI1llii <= 0) {
              console.log(lI1lIii.taskName + "任务已做完\n");
              break;
            }
          }

          continue;

        default:
          console.log("\n开始做 " + lI1lIii.taskName + "任务"), await iIillllI(lI1lIii.taskType), console.log("做 " + lI1lIii.taskName + "任务结果:" + JSON.stringify($.receiveNutrientsTaskRes) + "\n");
          continue;
      }
    }
  }
}

function I1l111li() {
  return new Promise(async iI1liIIl => {
    await iiilIl1l();

    if ($.plantBeanIndexResult && $.plantBeanIndexResult.code === "0" && $.plantBeanIndexResult.data) {
      $.taskList = $.plantBeanIndexResult.data.taskList;

      if ($.taskList && $.taskList.length > 0) {
        console.log("     任务   进度");

        for (let iIIIIl11 of $.taskList) {
          console.log("[" + iIIIIl11.taskName + "]  " + iIIIIl11.gainedNum + "/" + iIIIIl11.totalNum + "   " + iIIIIl11.isFinished);
        }
      }
    } else console.log("plantBeanIndexResult:" + JSON.stringify($.plantBeanIndexResult));

    iI1liIIl();
  });
}

function Iiil1iI() {
  $.log("\n" + Ii1iIi1I + "\n");
  ii1lIIIl = $.getdata("jdPlantBeanNotify") ? $.getdata("jdPlantBeanNotify") : ii1lIIIl;
  (!ii1lIIIl || ii1lIIIl === "false") && $.msg($.name, Illlill, Ii1iIi1I);
}

async function I1l1iI1() {
  await illll1I();
  await $.wait(500);
  await Ilili1I("gotConfigDataForBrand");
  await $.wait(500);
  await Ilili1I("initForFarm");
  await $.wait(500);
  await Ilili1I("taskInitForFarm");
  await $.wait(500);
  await Ilili1I("farmMarkStatus");
  await $.wait(500);
  await Ilili1I("initForFarm");
  await $.wait(500);
}

async function illll1I() {
  const i1IIii1l = {
    "monitor_refer": "plant_receiveNutrientsTask",
    "monitor_source": "plant_app_plant_index",
    "awardType": "92",
    "version": "9.2.4.3"
  };
  await iII11i1("receiveNutrientsTask", i1IIii1l);
}

async function Ilili1I(I1Ii1IIi) {
  let i1liI1Ii = {
    "version": 17,
    "channel": 1,
    "babelChannel": "45"
  };
  return I1Ii1IIi == "gotConfigDataForBrand" && (i1liI1Ii.type = "json", i1liI1Ii.k = "farmShareConfig"), new Promise(async ilii11II => {
    const IliIiiII = {
      "url": lIlIl1ll + "?functionId=" + I1Ii1IIi + "&body=" + encodeURIComponent(JSON.stringify(i1liI1Ii)) + "&appid=wh5",
      "headers": {
        "Cookie": IlllliI,
        "Host": "api.m.jd.com",
        "Accept": "*/*",
        "Connection": "keep-alive",
        "User-Agent": $.UA,
        "Accept-Encoding": "gzip, deflate, br",
        "Referer": "https://h5.m.jd.com"
      },
      "timeout": 20000
    };
    $.get(IliIiiII, (II11lI, IIliIiIi, liillIii) => {
      try {
        II11lI && (console.log("\n API查询请求失败 ‼️‼️"), $.logErr(II11lI));
      } catch (iiliiil) {
        $.logErr(iiliiil, IIliIiIi);
      } finally {
        ilii11II();
      }
    });
  });
}

function ilIill1l(iiIli1II) {
  let IlIii1I1 = {
    "url": iiIli1II,
    "headers": {
      "accept": "application/json",
      "referer": "https://st.jingxi.com/",
      "User-Agent": "jdpingou;iPhone;4.13.0;14.4.2;${randomString(40)};network/wifi;model/iPhone10,2;appBuild/100609;supportApplePay/1;hasUPPay/0;pushNoticeIsOpen/1;hasOCPay/0;supportBestPay/0;session/${Math.random * 98 + 1};pap/JA2019_3111789;brand/apple;supportJDSHWK/1;Mozilla/5.0 (iPhone; CPU iPhone OS 14_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148",
      "Cookie": "cid=4;" + IlllliI
    }
  };
  return new Promise(async iII1iiIl => {
    $.get(IlIii1I1, (IilII11I, iIii1il1, IIli1i) => {
      try {
        if (IilII11I) console.log("" + JSON.stringify(IilII11I)), console.log($.name + " API请求失败，请检查网路重试");else {
          if (IIli1i) {}
        }
      } catch (Il1l1ii) {
        $.logErr(Il1l1ii, iIii1il1);
      } finally {
        iII1iiIl(IIli1i);
      }
    });
    iII1iiIl();
  });
}

function I1lI1IiI(Ii1IllIl) {
  let Il1lIlI1 = {
    "url": Ii1IllIl,
    "headers": {
      "Accept": "application/json",
      "Referer": "https://wqs.jd.com/",
      "User-Agent": $.isNode() ? process.env.JD_USER_AGENT ? process.env.JD_USER_AGENT : require("./USER_AGENTS").USER_AGENT : $.getdata("JDUA") ? $.getdata("JDUA") : "jdapp;iPhone;9.4.4;14.3;network/4g;Mozilla/5.0 (iPhone; CPU iPhone OS 14_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1",
      "Cookie": IlllliI
    }
  };
  return new Promise(async l11llli => {
    $.get(Il1lIlI1, (Il1IIiII, I1l1li1, lill1iii) => {
      try {
        if (Il1IIiII) console.log("" + JSON.stringify(Il1IIiII)), console.log("tjdoublesign 请求失败，请检查网路重试");else {
          if (lill1iii) {}
        }
      } catch (I1Iiiil) {
        $.logErr(I1Iiiil, I1l1li1);
      } finally {
        l11llli(lill1iii);
      }
    });
  });
}

async function li1iIl1I() {
  const IIIl1 = {
    "roundId": IlII11II
  };
  $.getReward = await iII11i1("receivedBean", IIIl1);
}

async function iiI11I(I1l1ll1I, li1iIll1) {
  let l11li1l1 = {
    "roundId": I1l1ll1I,
    "nutrientsType": li1iIll1
  };
  $.cultureBeanRes = await iII11i1("cultureBean", l11li1l1);
}

async function llIiilI() {
  const i1lIIII = {
    "pageNum": "1"
  };
  $.stealFriendList = await i1lIllI("plantFriendList", i1lIIII);
}

async function iili111(Iil1Ii11) {
  console.log("开始偷好友");
  const Il1l1IlI = {
    "paradiseUuid": Iil1Ii11,
    "roundId": li111l1l
  };
  $.stealFriendRes = await iII11i1("collectUserNutr", Il1l1IlI);
}

async function lIllIli() {
  $.receiveNutrientsRes = await iII11i1("receiveNutrients", {
    "roundId": li111l1l,
    "monitor_refer": "plant_receiveNutrients"
  });
}

async function iIlI1liI() {
  $.plantEggDoLotteryResult = await IIIi1Il("plantEggDoLottery");
}

async function IIl1l1ii() {
  $.plantEggLotteryRes = await IIIi1Il("plantEggLotteryIndex");
}

async function ll1IiI1i() {
  $.productTaskList = await IIIi1Il("productTaskList", {
    "monitor_refer": "plant_productTaskList"
  });
}

async function Illi1III() {
  $.plantChannelTaskList = await i1lIllI("plantChannelTaskList");
}

async function il1lliII() {
  $.shopTaskListRes = await i1lIllI("shopTaskList", {
    "monitor_refer": "plant_receiveNutrients"
  });
}

async function iIillllI(lllllill) {
  const lIl1liIl = {
    "monitor_refer": "plant_receiveNutrientsTask",
    "awardType": "" + lllllill
  };
  $.receiveNutrientsTaskRes = await IIIi1Il("receiveNutrientsTask", lIl1liIl);
}

async function IIliIil1() {
  $.shareSupportList = await IIIi1Il("plantShareSupportList", {
    "roundId": ""
  });

  if ($.shareSupportList && $.shareSupportList.code === "0") {
    const {
      data: i1i1liiI
    } = $.shareSupportList,
          iIIIlIii = parseInt((Date.now() + 28800000) / 86400000) * 86400000 - 28800000,
          ilI1I1II = parseInt((Date.now() + 28800000) / 86400000) * 86400000 - 28800000 + 24 * 60 * 60 * 1000;
    let IiI11iiI = [];
    i1i1liiI.map(l1iIIi1l => {
      iIIIlIii <= l1iIIi1l.createTime && l1iIIi1l.createTime < ilI1I1II && IiI11iiI.push(l1iIIi1l);
    });
    Ii1iIi1I += "【助力您的好友】共" + IiI11iiI.length + "人";
  } else console.log("异常情况：" + JSON.stringify($.shareSupportList));
}

async function II1l11II(I1iI1iI) {
  console.log("\n开始助力好友: " + I1iI1iI);
  const lIiI1I1 = {
    "plantUuid": I1iI1iI,
    "wxHeadImgUrl": "",
    "shareUuid": "",
    "followType": "1"
  };
  $.helpResult = await iII11i1("plantBeanIndex", lIiI1I1);
  console.log("助力结果的code:" + ($.helpResult && $.helpResult.code));
}

async function iiilIl1l() {
  $.plantBeanIndexResult = await iII11i1("plantBeanIndex");
}

function l1Ii1Il() {
  return new Promise(i1iIill => {
    iiliI1l1 = $.isNode() ? require("./sendNotify") : "";
    const IIiil1iI = $.isNode() ? require("./jdCookie.js") : "",
          iilIil = "";

    if ($.isNode()) {
      Object.keys(IIiil1iI).forEach(i1iIiiI => {
        IIiil1iI[i1iIiiI] && IIlllIli.push(IIiil1iI[i1iIiiI]);
      });
      if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") console.log = () => {};
    } else IIlllIli = [$.getdata("CookieJD"), $.getdata("CookieJD2"), ...i1iIilII($.getdata("CookiesJD") || "[]").map(iIllIiiI => iIllIiiI.cookie)].filter(iIIi1li1 => !!iIIi1li1);

    console.log("共" + IIlllIli.length + "个京东账号\n");
    $.shareCodesArr = [];

    if ($.isNode()) {
      Object.keys(iilIil).forEach(lI1Ii1lI => {
        iilIil[lI1Ii1lI] && $.shareCodesArr.push(iilIil[lI1Ii1lI]);
      });
    } else {
      if ($.getdata("jd_plantbean_inviter")) $.shareCodesArr = $.getdata("jd_plantbean_inviter").split("\n").filter(li1III11 => !!li1III11);
    }

    i1iIill();
  });
}

function i1lIllI(iiIIiiII, i1iiI1 = {}) {
  return new Promise(async iiiilI1i => {
    const i1llIIll = {
      "url": lIlIl1ll + "?functionId=" + iiIIiiII + "&body=" + encodeURIComponent(JSON.stringify(i1iiI1)) + "&appid=signed_wh5&client=apple&area=19_1601_50258_51885&build=167490&clientVersion=9.3.2",
      "headers": {
        "Accept": "*/*",
        "Origin": "https://h5.m.jd.com",
        "Accept-Encoding": "gzip,deflate,br",
        "User-Agent": $.UA,
        "Accept-Language": "zh-CN,zh-Hans;q=0.9",
        "Referer": "https://h5.m.jd.com",
        "x-requested-with": "com.jingdong.app.mall",
        "Cookie": IlllliI
      },
      "timeout": 10000
    };
    $.get(i1llIIll, (I1Ii1I1, Ilill1iI, IlI1Ii1) => {
      try {
        I1Ii1I1 ? (console.log("\n种豆得豆: API查询请求失败 ‼️‼️"), $.logErr(I1Ii1I1)) : IlI1Ii1 = JSON.parse(IlI1Ii1);
      } catch (lIil1lIi) {
        $.logErr(lIil1lIi, Ilill1iI);
      } finally {
        iiiilI1i(IlI1Ii1);
      }
    });
  });
}

function IIIi1Il(iI1I1l1, Il1llli1 = {}) {
  return new Promise(async iIli1i1i => {
    let l11I1i1i = "";
    if (!lI1lli1i[iI1I1l1]) l11I1i1i = lIlIl1ll + "?functionId=" + iI1I1l1 + "&body=" + encodeURIComponent(JSON.stringify(Il1llli1)) + "&appid=ld&client=apple&area=19_1601_50258_51885&build=167490&clientVersion=9.3.2";else {
      !Il1llli1.version && (Il1llli1.version = "9.2.4.3");
      Il1llli1.monitor_source = "plant_app_plant_index";
      lI1lli1i[iI1I1l1] == "shopNutrientsTask" && (headers.referer = "https://plantearth.m.jd.com/", headers["x-requested-with"] = "https://plantearth.m.jd.com/");
      await $.wait(5000);
      const IIlI1Ili = {
        "appid": "signed_wh5",
        "client": "android",
        "clientVersion": "10.1.0",
        "functionId": iI1I1l1,
        "body": Il1llli1
      };
      let iiiiIiII = await i1I11il1(lI1lli1i[iI1I1l1], IIlI1Ili);
      l11I1i1i = lIlIl1ll + "?" + iiiiIiII;
    }
    const l1IIIll = {
      "url": l11I1i1i,
      "headers": {
        "Accept": "*/*",
        "Accept-Encoding": "gzip,deflate,br",
        "User-Agent": $.UA,
        "Accept-Language": "zh-CN,zh-Hans;q=0.9",
        "Referer": "https://plantearth.m.jd.com/plantBean/index?source=lingjingdouqiandaorili&sid=4638f2f389065566747fbdb06702d79w&un_area=4_133_58530_0",
        "Cookie": IlllliI
      },
      "timeout": 20000
    };
    $.get(l1IIIll, (lil1IIi1, ilIl11l, iIlIl1l1) => {
      try {
        lil1IIi1 ? (console.log("\n种豆得豆: API查询请求失败 ‼️‼️"), console.log(lil1IIi1), $.logErr(lil1IIi1)) : iIlIl1l1 = JSON.parse(iIlIl1l1);
      } catch (IIliiiII) {
        $.logErr(IIliiiII, ilIl11l);
      } finally {
        iIli1i1i(iIlIl1l1);
      }
    });
  });
}

function iII11i1(IiIIi1li, llIli1il = {}) {
  return new Promise(async IiiIli1i => {
    let ii1iii1I = "";
    if (!lI1lli1i[IiIIi1li]) ii1iii1I = lIlIl1ll + "?functionId=" + IiIIi1li + "&body=" + encodeURIComponent(JSON.stringify(llIli1il)) + "&appid=ld&client=apple&area=19_1601_50258_51885&build=167490&clientVersion=9.3.2";else {
      llIli1il.version = "9.2.4.3";
      llIli1il.monitor_source = "plant_app_plant_index";
      !llIli1il.monitor_refer && (llIli1il.monitor_refer = "");
      const IiiIilil = {
        "appid": "signed_wh5",
        "client": "android",
        "clientVersion": "10.1.0",
        "functionId": IiIIi1li,
        "body": llIli1il
      };
      let iIIlilil = await i1I11il1(lI1lli1i[IiIIi1li], IiiIilil);
      ii1iii1I = lIlIl1ll + "?" + iIIlilil;
    }
    await $.wait(5000);
    let IIIilIIi = {
      "url": ii1iii1I,
      "headers": {
        "Accept": "*/*",
        "Accept-Encoding": "gzip,deflate,br",
        "User-Agent": $.UA,
        "Accept-Language": "zh-CN,zh-Hans;q=0.9",
        "Referer": "https://plantearth.m.jd.com/plantBean/index?source=lingjingdouqiandaorili&sid=4638f2f389065566747fbdb06702d79w&un_area=4_133_58530_0",
        "Cookie": IlllliI
      },
      "timeout": 10000
    };
    $.get(IIIilIIi, async (IiIII1II, i1li1I1i, ll11ll1I) => {
      try {
        if (IiIII1II) console.log("\n种豆得豆: API查询请求失败 ‼️‼️"), console.log("function_id:" + IiIIi1li), $.logErr(IiIII1II);else {
          if (ll11ll1I.indexOf("data") > -1) ll11ll1I = JSON.parse(ll11ll1I);else {
            ll11ll1I = JSON.parse(ll11ll1I);
            console.log(ll11ll1I.errorMessage);
          }
        }
      } catch (Illlli1i) {
        $.logErr(Illlli1i, i1li1I1i);
      } finally {
        IiiIli1i(ll11ll1I);
      }
    });
  });
}

const lI1lli1i = {
  "plantBeanIndex": "d246a",
  "receiveNutrients": "b56b8",
  "cultureBean": "6a216",
  "receiveNutrientsTask": "d22ac",
  "plantChannelNutrientsTask": "2424e",
  "shopNutrientsTask": "19c88",
  "productTaskList": "7351b",
  "productNutrientsTask": "a4e2d",
  "receivedBean": "d4a66",
  "collectUserNutr": "14357"
};

async function l1l111l(ilI11I, IIlIIlll) {
  IIlIIlll.version = "9.2.4.3";
  IIlIIlll.monitor_source = "plant_app_plant_index";
  !IIlIIlll.monitor_refer && (IIlIIlll.monitor_refer = "");

  if (!lI1lli1i[ilI11I]) {} else {
    const lII1liI1 = {
      "appid": "signed_wh5",
      "client": "android",
      "clientVersion": "10.1.0",
      "functionId": ilI11I,
      "body": IIlIIlll
    };
  }

  return {
    "url": lIlIl1ll + "?" + h5st,
    "headers": {
      "Accept": "*/*",
      "Accept-Encoding": "gzip,deflate,br",
      "User-Agent": $.UA,
      "Accept-Language": "zh-CN,zh-Hans;q=0.9",
      "Referer": "https://plantearth.m.jd.com/plantBean/index?source=lingjingdouqiandaorili&sid=4638f2f389065566747fbdb06702d79w&un_area=4_133_58530_0",
      "Cookie": IlllliI
    },
    "timeout": 10000
  };
}

async function i1I11il1(i11i1iI, I11ilII1) {
  try {
    let l1i1I1i = new l1ilIiII({
      "appId": i11i1iI,
      "appid": "signed_wh5",
      "clientVersion": I11ilII1?.["clientVersion"],
      "client": I11ilII1?.["client"],
      "pin": $.UserName,
      "ua": $.UA,
      "version": "4.1"
    });
    return await l1i1I1i.genAlgo(), body = await l1i1I1i.genUrlParams(I11ilII1.functionId, I11ilII1.body), body;
  } catch (lI1i11ii) {}
}

async function lilIiiIl(IIll111, I11lI1) {
  let lIIIIiII = {
    "searchParams": { ...I11lI1,
      "appId": IIll111
    },
    "pt_pin": $.UserName,
    "client": I11lI1?.["client"],
    "clientVersion": I11lI1?.["clientVersion"]
  },
      IilIiI1i = {
    "Content-Type": "application/json",
    "User-Agent": $.UA
  },
      ilI1l11I = {
    "url": "http://h5st.kingran.cf/api/h5st",
    "body": JSON.stringify(lIIIIiII),
    "headers": IilIiI1i,
    "timeout": 30000
  };
  return new Promise(async il1IilIl => {
    $.post(ilI1l11I, (ll1lili1, iliiI11, il11Ii) => {
      let iiiIllI1 = "";

      try {
        if (ll1lili1) console.log($.name + " getH5st API请求失败，请检查网路重试");else {
          il11Ii = JSON.parse(il11Ii);
          console.log(JSON.stringify(il11Ii));

          if (typeof il11Ii === "object" && il11Ii && il11Ii.body) {
            if (il11Ii.body) iiiIllI1 = il11Ii || "";
          } else il11Ii.code == 400 ? console.log("\n" + il11Ii.msg) : console.log("\n可能连接不上接口，请检查网络");
        }
      } catch (li1i1Ill) {
        $.logErr(li1i1Ill, iliiI11);
      } finally {
        il1IilIl(iilliii1(iiiIllI1));
      }
    });
  });
}

function iilliii1(I1lIlIii, Ii111ilI = {}) {
  let iIilI1Il = [],
      IIi1lii1 = Ii111ilI.connector || "&",
      ll1IIii = Object.keys(I1lIlIii);
  if (Ii111ilI.sort) ll1IIii = ll1IIii.sort();

  for (let IIIl1i of ll1IIii) {
    let iIl1l = I1lIlIii[IIIl1i];
    if (iIl1l && typeof iIl1l === "object") iIl1l = JSON.stringify(iIl1l);
    if (iIl1l && Ii111ilI.encode) iIl1l = encodeURIComponent(iIl1l);
    iIilI1Il.push(IIIl1i + "=" + iIl1l);
  }

  return iIilI1Il.join(IIi1lii1);
}

function llll11I(lil1I, l1il11l) {
  const IIiIIiil = new RegExp("(^|&)" + l1il11l + "=([^&]*)(&|$)", "i"),
        illIl11I = lil1I.match(IIiIIiil);
  if (illIl11I != null) return unescape(illIl11I[2]);
  return null;
}

function i1iIilII(iil1lll1) {
  if (typeof iil1lll1 == "string") {
    try {
      return JSON.parse(iil1lll1);
    } catch (liill1ll) {
      return console.log(liill1ll), $.msg($.name, "", "请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie"), [];
    }
  }
}
// prettier-ignore
function Env(t, e) { "undefined" != typeof process && JSON.stringify(process.env).indexOf("GITHUB") > -1 && process.exit(0); class s { constructor(t) { this.env = t } send(t, e = "GET") { t = "string" == typeof t ? { url: t } : t; let s = this.get; return "POST" === e && (s = this.post), new Promise((e, i) => { s.call(this, t, (t, s, r) => { t ? i(t) : e(s) }) }) } get(t) { return this.send.call(this.env, t) } post(t) { return this.send.call(this.env, t, "POST") } } return new class { constructor(t, e) { this.name = t, this.http = new s(this), this.data = null, this.dataFile = "box.dat", this.logs = [], this.isMute = !1, this.isNeedRewrite = !1, this.logSeparator = "\n", this.startTime = (new Date).getTime(), Object.assign(this, e), this.log("", `🔔${this.name}, 开始!`) } isNode() { return "undefined" != typeof module && !!module.exports } isQuanX() { return "undefined" != typeof $task } isSurge() { return "undefined" != typeof $httpClient && "undefined" == typeof $loon } isLoon() { return "undefined" != typeof $loon } toObj(t, e = null) { try { return JSON.parse(t) } catch { return e } } toStr(t, e = null) { try { return JSON.stringify(t) } catch { return e } } getjson(t, e) { let s = e; const i = this.getdata(t); if (i) try { s = JSON.parse(this.getdata(t)) } catch { } return s } setjson(t, e) { try { return this.setdata(JSON.stringify(t), e) } catch { return !1 } } getScript(t) { return new Promise(e => { this.get({ url: t }, (t, s, i) => e(i)) }) } runScript(t, e) { return new Promise(s => { let i = this.getdata("@chavy_boxjs_userCfgs.httpapi"); i = i ? i.replace(/\n/g, "").trim() : i; let r = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout"); r = r ? 1 * r : 20, r = e && e.timeout ? e.timeout : r; const [o, h] = i.split("@"), n = { url: `http://${h}/v1/scripting/evaluate`, body: { script_text: t, mock_type: "cron", timeout: r }, headers: { "X-Key": o, Accept: "*/*" } }; this.post(n, (t, e, i) => s(i)) }).catch(t => this.logErr(t)) } loaddata() { if (!this.isNode()) return {}; { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e); if (!s && !i) return {}; { const i = s ? t : e; try { return JSON.parse(this.fs.readFileSync(i)) } catch (t) { return {} } } } } writedata() { if (this.isNode()) { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e), r = JSON.stringify(this.data); s ? this.fs.writeFileSync(t, r) : i ? this.fs.writeFileSync(e, r) : this.fs.writeFileSync(t, r) } } lodash_get(t, e, s) { const i = e.replace(/\[(\d+)\]/g, ".$1").split("."); let r = t; for (const t of i) if (r = Object(r)[t], void 0 === r) return s; return r } lodash_set(t, e, s) { return Object(t) !== t ? t : (Array.isArray(e) || (e = e.toString().match(/[^.[\]]+/g) || []), e.slice(0, -1).reduce((t, s, i) => Object(t[s]) === t[s] ? t[s] : t[s] = Math.abs(e[i + 1]) >> 0 == +e[i + 1] ? [] : {}, t)[e[e.length - 1]] = s, t) } getdata(t) { let e = this.getval(t); if (/^@/.test(t)) { const [, s, i] = /^@(.*?)\.(.*?)$/.exec(t), r = s ? this.getval(s) : ""; if (r) try { const t = JSON.parse(r); e = t ? this.lodash_get(t, i, "") : e } catch (t) { e = "" } } return e } setdata(t, e) { let s = !1; if (/^@/.test(e)) { const [, i, r] = /^@(.*?)\.(.*?)$/.exec(e), o = this.getval(i), h = i ? "null" === o ? null : o || "{}" : "{}"; try { const e = JSON.parse(h); this.lodash_set(e, r, t), s = this.setval(JSON.stringify(e), i) } catch (e) { const o = {}; this.lodash_set(o, r, t), s = this.setval(JSON.stringify(o), i) } } else s = this.setval(t, e); return s } getval(t) { return this.isSurge() || this.isLoon() ? $persistentStore.read(t) : this.isQuanX() ? $prefs.valueForKey(t) : this.isNode() ? (this.data = this.loaddata(), this.data[t]) : this.data && this.data[t] || null } setval(t, e) { return this.isSurge() || this.isLoon() ? $persistentStore.write(t, e) : this.isQuanX() ? $prefs.setValueForKey(t, e) : this.isNode() ? (this.data = this.loaddata(), this.data[e] = t, this.writedata(), !0) : this.data && this.data[e] || null } initGotEnv(t) { this.got = this.got ? this.got : require("got"), this.cktough = this.cktough ? this.cktough : require("tough-cookie"), this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar, t && (t.headers = t.headers ? t.headers : {}, void 0 === t.headers.Cookie && void 0 === t.cookieJar && (t.cookieJar = this.ckjar)) } get(t, e = (() => { })) { t.headers && (delete t.headers["Content-Type"], delete t.headers["Content-Length"]), this.isSurge() || this.isLoon() ? (this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.get(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) })) : this.isQuanX() ? (this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t))) : this.isNode() && (this.initGotEnv(t), this.got(t).on("redirect", (t, e) => { try { if (t.headers["set-cookie"]) { const s = t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString(); s && this.ckjar.setCookieSync(s, null), e.cookieJar = this.ckjar } } catch (t) { this.logErr(t) } }).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) })) } post(t, e = (() => { })) { if (t.body && t.headers && !t.headers["Content-Type"] && (t.headers["Content-Type"] = "application/x-www-form-urlencoded"), t.headers && delete t.headers["Content-Length"], this.isSurge() || this.isLoon()) this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.post(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) }); else if (this.isQuanX()) t.method = "POST", this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t)); else if (this.isNode()) { this.initGotEnv(t); const { url: s, ...i } = t; this.got.post(s, i).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) }) } } time(t, e = null) { const s = e ? new Date(e) : new Date; let i = { "M+": s.getMonth() + 1, "d+": s.getDate(), "H+": s.getHours(), "m+": s.getMinutes(), "s+": s.getSeconds(), "q+": Math.floor((s.getMonth() + 3) / 3), S: s.getMilliseconds() }; /(y+)/.test(t) && (t = t.replace(RegExp.$1, (s.getFullYear() + "").substr(4 - RegExp.$1.length))); for (let e in i) new RegExp("(" + e + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? i[e] : ("00" + i[e]).substr(("" + i[e]).length))); return t } msg(e = t, s = "", i = "", r) { const o = t => { if (!t) return t; if ("string" == typeof t) return this.isLoon() ? t : this.isQuanX() ? { "open-url": t } : this.isSurge() ? { url: t } : void 0; if ("object" == typeof t) { if (this.isLoon()) { let e = t.openUrl || t.url || t["open-url"], s = t.mediaUrl || t["media-url"]; return { openUrl: e, mediaUrl: s } } if (this.isQuanX()) { let e = t["open-url"] || t.url || t.openUrl, s = t["media-url"] || t.mediaUrl; return { "open-url": e, "media-url": s } } if (this.isSurge()) { let e = t.url || t.openUrl || t["open-url"]; return { url: e } } } }; if (this.isMute || (this.isSurge() || this.isLoon() ? $notification.post(e, s, i, o(r)) : this.isQuanX() && $notify(e, s, i, o(r))), !this.isMuteLog) { let t = ["", "==============📣系统通知📣=============="]; t.push(e), s && t.push(s), i && t.push(i), console.log(t.join("\n")), this.logs = this.logs.concat(t) } } log(...t) { t.length > 0 && (this.logs = [...this.logs, ...t]), console.log(t.join(this.logSeparator)) } logErr(t, e) { const s = !this.isSurge() && !this.isQuanX() && !this.isLoon(); s ? this.log("", `❗️${this.name}, 错误!`, t.stack) : this.log("", `❗️${this.name}, 错误!`, t) } wait(t) { return new Promise(e => setTimeout(e, t)) } done(t = {}) { const e = (new Date).getTime(), s = (e - this.startTime) / 1e3; this.log("", `🔔${this.name}, 结束! 🕛 ${s} 秒`), this.log(), (this.isSurge() || this.isQuanX() || this.isLoon()) && $done(t) } }(t, e) }
