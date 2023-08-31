/*
JOY_COIN_MAXIMIZE =      最大化硬币收益，如果合成后全部挖土后还有空位，则开启此模式（默认开启） 0关闭 1开启

请确保新用户助力过开工位，否则开启游戏了就不算新用户，后面就不能助力开工位了！！！！！！！！！！

如需关闭请添加变量，变量名：HELP_JOYPARK，变量值：false

此游戏黑号严重，所以请自行定时，火爆后停止放置一段时间恢复

地址：https://joypark.jd.com/?activityId=jBNXcoiASxGof0f2RFI2Sw

做合成 购买等，无助力，无任务

============Quantumultx===============

[task_local]
#京东极简版-汪汪乐园
1 1 1 1 * jd_jj_wwly.js, tag=京东极简版-汪汪乐园, enabled=true
*/
const $ = new Env('京东极简版-汪汪乐园');
const iliIl = $.isNode() ? require("./jdCookie.js") : "",
    ii1i11 = $.isNode() ? require("./sendNotify") : "",
    liIlII = require("./function/jdCommon"),
    Il1I = require("./function/h5st41.js");

let iii1i = [],
    iii1l = "",
    iliIi = false,
    iiil1I = 0;

if ($.isNode()) {
    Object.keys(iliIl).forEach(l1lii1 => {
        iii1i.push(iliIl[l1lii1]);
    });
    if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") console.log = () => { };
} else iii1i = [$.getdata("CookieJD"), $.getdata("CookieJD2"), ...lIiII($.getdata("CookiesJD") || "[]").map(ii1i1i => ii1i1i.cookie)].filter(IiIi11 => !!IiIi11);

$.JOY_COIN_MAXIMIZE = process.env.JOY_COIN_MAXIMIZE === "1";
$.log("最大化收益模式: 已" + ($.JOY_COIN_MAXIMIZE ? "默认开启" : "关闭") + "  ");
let lIiI1 = Date.now();
message = "";
!(async () => {
    if (!iii1i[0]) {
        $.msg($.name, "【提示】请先获取cookie\n直接使用NobyDa的京东签到获取", "https://bean.m.jd.com/", {
            "open-url": "https://bean.m.jd.com/"
        });
        return;
    }

    if (process.env.JD_JOY_PARK && process.env.JD_JOY_PARK === "false") {
        console.log("\n******检测到您设置了不运行，停止运行此脚本******\n");
        return;
    }

    for (let ilIIl1 = 0; ilIIl1 < iii1i.length; ilIIl1++) {
        iliIi = false;
        iiil1I = 0;
        iii1l = iii1i[ilIIl1];

        if (iii1l) {
            $.UserName = decodeURIComponent(iii1l.match(/pt_pin=([^; ]+)(?=;?)/) && iii1l.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
            $.index = ilIIl1 + 1;
            $.isLogin = true;
            $.nickName = "";
            $.maxJoyCount = 10;
            $.UA = liIlII.genUA($.UserName);

            if (!$.isLogin) {
                $.msg($.name, "【提示】cookie已失效", "京东账号" + $.index + " " + ($.nickName || $.UserName) + "\n请重新登录获取\nhttps://bean.m.jd.com/bean/signIndex.action", {
                    "open-url": "https://bean.m.jd.com/bean/signIndex.action"
                });
                $.isNode() && (await ii1i11.sendNotify($.name + "cookie已失效 - " + $.UserName, "京东账号" + $.index + " " + $.UserName + "\n请重新登录获取cookie"));
                continue;
            }

            console.log("\n******开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "******\n");
            $.krbreak = false;

            if ($.isNode()) {
                if (process.env.HELP_JOYPARK && process.env.HELP_JOYPARK == "false") { } else {
                    $.kgw_invitePin = ["EDPUVDhR7nUPh3jUGDJ_GyiLt77-wROqWVP2aesRUt8", "QLCSd3I8GUplWsqAeZgqj5cmfo7gRSGyIsykew6KYP0", "BAOqoW7t-bamG2ZDWN_J26cFJ_A0SVf5Vy3lH5czbXI", "1S5w5yU9UZYDq76-t7SPlQ", "7m1cAPHveE9Di9IDPS3EfA", "Zi6CMKqNUANQa1m3j3NulA", "DYnxFupX6XXdfmBd02SWdg", "44woUzTfOdg9yFCt7D69MZf_Z_eaGdDs73z1eAfGDZo", "s1HgT4EXmMeUQzWIrsk4Ag"];

                    if ($.kgw_invitePin && $.kgw_invitePin.length) {
                        $.kgw_invitePin = [...($.kgw_invitePin || [])][Math.floor(Math.random() * $.kgw_invitePin.length)];
                        await $.wait(parseInt(Math.random() * 2000 + 3000, 10));
                        let iIl1I = await llII1l("", 2, $.kgw_invitePin);

                        if (iIl1I) {
                            if (iIl1I.helpState && iIl1I.helpState === 1) { } else {
                                if (iIl1I.helpState && iIl1I.helpState === 3) { } else {
                                    if (iIl1I.helpState && iIl1I.helpState === 2) { } else { }
                                }
                            }
                        }

                        await $.wait(parseInt(Math.random() * 2000 + 3000, 10));
                    }
                }
            }

            await $.wait(parseInt(Math.random() * 2000 + 3000, 10));
            $.hasJoyCoin = true;
            await llII1l("", "", "", true);
            await $.wait(parseInt(Math.random() * 2000 + 3000, 10));

            if (!$.krbreak) {
                $.activityJoyList = [];
                $.workJoyInfoList = [];
                await iil11l(true);
                await IiIi1l();
                await ilI1Ii($.workJoyInfoList);
            } else console.log("活动太火爆，跳过");

            try {
                !$.krbreak && (await ilI1Il($.activityJoyList), await $.wait(parseInt(Math.random() * 2000 + 1000, 10)), await iii1I());
            } catch (liIIl1) {
                $.logErr(liIIl1);
            }

            await $.wait(parseInt(Math.random() * 2000 + 1000, 10));
        }
    }
})().catch(iIliiI => $.logErr(iIliiI)).finally(() => $.done());

async function llII1l(IIiilI = "", I1lii1 = "", ilIIlI = "", liiiI1 = false) {
    const ii1I = {
        "functionId": "joyBaseInfo",
        "clientVersion": "10.1.0",
        "client": "ios",
        "t": lIiI1,
        "appid": "activities_platform",
        "body": "{\"taskId\":\"" + IIiilI + "\",\"inviteType\":\"" + I1lii1 + "\",\"inviterPin\":\"" + ilIIlI + "\",\"linkId\":\"jBNXcoiASxGof0f2RFI2Sw\"}"
    },
        i11Ili = await iillIi("4abce", ii1I);
    return new Promise(illii1 => {
        $.post(IiIi1I(i11Ili), async (IIIlll, llli1I, IlilI1) => {
            try {
                IIIlll ? (console.log("" + JSON.stringify(IIIlll)), console.log($.name + " getJoyBaseInfo API请求失败，请检查网路重试")) : (IlilI1 = JSON.parse(IlilI1), IlilI1 && (IlilI1.success ? (liiiI1 && ($.log("等级: " + IlilI1.data.level + "|金币: " + IlilI1.data.joyCoin), IlilI1.data.level >= 30 && $.isNode() && (await ii1i11.sendNotify($.name + " - 账号" + $.index + " - " + $.nickName, "【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "\n当前等级: " + IlilI1.data.level + "\n已达到单次最高等级奖励\n请前往京东APP查看使用优惠券\n活动入口：京东极简版-汪汪乐园"), $.log("\n开始解锁新场景...\n"), await Illl1())), $.joyBaseInfo = IlilI1.data) : $.krbreak = true));
            } catch (iIIIl) {
                $.logErr(iIIIl, llli1I);
            } finally {
                illii1($.joyBaseInfo);
            }
        });
    });
}

async function iil11l(l1IlIl = false) {
    const illiiI = {
        "functionId": "joyList",
        "clientVersion": "10.1.0",
        "client": "ios",
        "t": lIiI1,
        "appid": "activities_platform",
        "body": "{\"linkId\":\"jBNXcoiASxGof0f2RFI2Sw\"}"
    },
        liIl = await iillIi("e18ed", illiiI);

    if (!liIl) {
        console.log("接口获取失败，跳过");
        return;
    }

    return new Promise(lIi1li => {
        $.get(IiIi1I(liIl), async (Il1iIl, lIi1ll, l1IIiI) => {
            try {
                if (Il1iIl) console.log("" + JSON.stringify(Il1iIl)), console.log($.name + " getJoyList API请求失败，请检查网路重试"); else {
                    l1IIiI = JSON.parse(l1IIiI);

                    if (l1IlIl) {
                        $.log("===== 【京东账号" + $.index + "】" + ($.nickName || $.UserName) + " joy 状态 start =====");
                        $.log("在逛街的joy⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️");

                        for (let I1lilI = 0; I1lilI < l1IIiI.data.activityJoyList.length; I1lilI++) {
                            $.log("id:" + l1IIiI.data.activityJoyList[I1lilI].id + "|name: " + l1IIiI.data.activityJoyList[I1lilI].name + "|level: " + l1IIiI.data.activityJoyList[I1lilI].level);
                            l1IIiI.data.activityJoyList[I1lilI].level >= 30 && $.isNode() && (await ii1i11.sendNotify($.name + " - 账号" + $.index + " - " + $.nickName, "【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "\n当前等级: " + l1IIiI.data.level + "\n已达到单次最高等级奖励\n请前往京东APP查看使用优惠券\n活动入口：京东极简版-汪汪乐园\n"), $.log("\n开始解锁新场景...\n"), await Illl1());
                        }

                        $.log("\n在铲土的joy⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️");

                        for (let iIlill = 0; iIlill < l1IIiI.data.workJoyInfoList.length; iIlill++) {
                            $.log("工位: " + l1IIiI.data.workJoyInfoList[iIlill].location + " [" + (l1IIiI.data.workJoyInfoList[iIlill].unlock ? "已开" : "未开") + "]|joy= " + (l1IIiI.data.workJoyInfoList[iIlill].joyDTO ? "id:" + l1IIiI.data.workJoyInfoList[iIlill].joyDTO.id + "|name: " + l1IIiI.data.workJoyInfoList[iIlill].joyDTO.name + "|level: " + l1IIiI.data.workJoyInfoList[iIlill].joyDTO.level : "毛都没有"));
                        }

                        $.log("===== 【京东账号" + $.index + "】" + ($.nickName || $.UserName) + " joy 状态  end  =====");
                    }

                    $.activityJoyList = l1IIiI?.["data"]?.["activityJoyList"];
                    $.workJoyInfoList = l1IIiI?.["data"]?.["workJoyInfoList"];
                }
            } catch (iIlili) {
                $.logErr(iIlili, lIi1ll);
            } finally {
                lIi1li(l1IIiI.data);
            }
        });
    });
}

async function IiIi1l() {
    const iIII1 = {
        "functionId": "gameShopList",
        "clientVersion": "10.1.0",
        "client": "ios",
        "t": lIiI1,
        "appid": "activities_platform",
        "body": "{\"linkId\":\"jBNXcoiASxGof0f2RFI2Sw\"}"
    },
        I1lil1 = await iillIi("e18ed", iIII1);
    return new Promise(ilIlii => {
        $.post(IiIi1I(I1lil1), async (l1I1l1, ll1lIi, lIi1i) => {
            try {
                l1I1l1 ? (console.log("" + JSON.stringify(l1I1l1)), console.log($.name + " API请求失败，请检查网路重试")) : lIi1i = JSON.parse(lIi1i).data.filter(lI1iIi => lI1iIi.shopStatus === 1);
            } catch (lIi1l) {
                $.logErr(lIi1l, ll1lIi);
            } finally {
                ilIlii(lIi1i);
            }
        });
    });
}

async function llII1i(li11ii, I1iiIi) {
    let I1iiIl = I1iiIi.filter(li11l1 => li11l1.unlock && li11l1.joyDTO === null);

    if (li11ii.length !== 0 && I1iiIl.length !== 0) {
        let IIlIIl = Math.max.apply(Math, li11ii.map(I1IIiI => I1IIiI.level)),
            iIiiI1 = li11ii.filter(ilIli1 => ilIli1.level === IIlIIl);
        $.log("下地干活！ joyId= " + iIiiI1[0].id + " location= " + I1iiIl[0].location);
        await illI11(iIiiI1[0].id, I1iiIl[0].location);
        await iil11l();
        await $.wait(parseInt(Math.random() * 2000 + 1000, 10));
        await llII1i($.activityJoyList, $.workJoyInfoList);
        await $.wait(parseInt(Math.random() * 2000 + 1000, 10));
    } else $.JOY_COIN_MAXIMIZE && (await illI1I(I1iiIl), await $.wait(parseInt(Math.random() * 2000 + 1000, 10)));
}

async function illI1I(li1il) {
    if (li1il.length !== 0 && $.hasJoyCoin) {
        $.log("竟然还有工位挖土？开启瞎买瞎下地模式！");
        await $.wait(parseInt(Math.random() * 2000 + 3000, 10));
        let IIlII1 = await llII1l();
        await $.wait(parseInt(Math.random() * 2000 + 3000, 10));
        let ll1Iil = IIlII1.joyCoin;
        $.log("还有" + ll1Iil + "金币,看看还能买啥下地");
        let li1lI = await IiIi1l();
        await $.wait(parseInt(Math.random() * 2000 + 1000, 10));
        let iliiiI = false;

        for (let IIlIII = li1lI.length - 1; IIlIII >= 0 && IIlIII - 3 >= 0; IIlIII--) {
            if (ll1Iil > li1lI[IIlIII].consume) {
                $.log("买一只 " + li1lI[IIlIII].userLevel + "级的！");
                ll1Iil = ll1Iil - li1lI[IIlIII].consume;
                let lIi11i = await ll11Il(li1lI[IIlIII].userLevel);
                if (!lIi11i.success) break; else iliiiI = true, $.hasJoyCoin = false, IIlIII++;
            }
        }

        $.hasJoyCoin = false;

        if (iliiiI) {
            await iil11l();
            await $.wait(parseInt(Math.random() * 2000 + 1000, 10));
            await llII1i($.activityJoyList, $.workJoyInfoList);
            await $.wait(parseInt(Math.random() * 2000 + 3000, 10));
            await llII1l();
            await $.wait(parseInt(Math.random() * 2000 + 3000, 10));
        }
    }
}

async function ilI1Ii(lIl1Ii) {
    if (lIl1Ii.filter(I1IIll => I1IIll.joyDTO).length === 0) return $.log("工位清理完成！"), true;

    for (let i1Ii1 = 0; i1Ii1 < lIl1Ii.length; i1Ii1++) {
        lIl1Ii[i1Ii1].unlock && lIl1Ii[i1Ii1].joyDTO && (await $.wait(parseInt(Math.random() * 2000 + 1000, 10)), $.log("从工位移除 => id:" + lIl1Ii[i1Ii1].joyDTO.id + "|name: " + lIl1Ii[i1Ii1].joyDTO.name + "|level: " + lIl1Ii[i1Ii1].joyDTO.level), await illI11(lIl1Ii[i1Ii1].joyDTO.id, 0), await $.wait(parseInt(Math.random() * 2000 + 1000, 10)));
    }

    await $.wait(parseInt(Math.random() * 2000 + 1000, 10));
    await iil11l();
    await $.wait(parseInt(Math.random() * 2000 + 1000, 10));
    await ilI1Ii($.workJoyInfoList);
}

async function ilI1Il(lIilII) {
    let I1IIlI = Math.min.apply(Math, lIilII.map(I1IlIl => I1IlIl.level)),
        ilIlll = lIilII.filter(l1I1i1 => l1I1i1.level === I1IIlI);
    await $.wait(parseInt(Math.random() * 2000 + 3000, 10));
    let Ii1Iii = await llII1l();
    await $.wait(parseInt(Math.random() * 2000 + 3000, 10));
    !Ii1Iii.fastBuyLevel && (await $.wait(parseInt(Math.random() * 2000 + 3000, 10)), Ii1Iii = await llII1l(), await $.wait(parseInt(Math.random() * 2000 + 3000, 10)));
    if (!Ii1Iii.fastBuyLevel) return $.log("出错，下地后跳出......"), await llII1i($.activityJoyList, $.workJoyInfoList), await $.wait(parseInt(Math.random() * 2000 + 1000, 10)), false;
    let Ii1Iil = Ii1Iii.fastBuyLevel;

    if (ilIlll.length >= 2) {
        $.log("开始合成 " + I1IIlI + " " + ilIlll[0].id + " <=> " + ilIlll[1].id + " 【限流严重，5秒后合成！如失败会重试】");
        await $.wait(parseInt(Math.random() * 2000 + 5000, 10));
        await ll11Ii(ilIlll[0].id, ilIlll[1].id);
        await $.wait(parseInt(Math.random() * 2000 + 1000, 10));

        if (iliIi) {
            await $.wait(parseInt(Math.random() * 2000 + 3000, 10));
            Ii1Iii = await llII1l();
            await $.wait(parseInt(Math.random() * 2000 + 3000, 10));
            await llII1i($.activityJoyList, $.workJoyInfoList);
            await $.wait(parseInt(Math.random() * 2000 + 1000, 10));
            return false;
        }

        await $.wait(parseInt(Math.random() * 2000 + 1000, 10));
        await iil11l();
        await $.wait(parseInt(Math.random() * 2000 + 1000, 10));
        await ilI1Il($.activityJoyList);
    } else {
        if (ilIlll.length === 1 && ilIlll[0].level < Ii1Iil) {
            let lIiIlI = await ll11Il(ilIlll[0].level, $.activityJoyList);
            lIiIlI.success ? (await iil11l(), await $.wait(parseInt(Math.random() * 2000 + 1000, 10)), await ilI1Il($.activityJoyList), await $.wait(parseInt(Math.random() * 2000 + 1000, 10))) : ($.log("完成！"), await llII1i($.activityJoyList, $.workJoyInfoList), await $.wait(parseInt(Math.random() * 2000 + 1000, 10)));
        } else {
            $.log("没有需要合成的joy 开始买买买🛒🛒🛒🛒🛒🛒🛒🛒");
            $.log("现在最高可以购买: " + Ii1Iil + "  购买 " + Ii1Iil + " 的joy   你还有" + Ii1Iii.joyCoin + "金币");
            let llIii1 = await ll11Il(Ii1Iil, $.activityJoyList);
            llIii1.success ? (await iil11l(), await $.wait(parseInt(Math.random() * 2000 + 1000, 10)), await ilI1Il($.activityJoyList), await $.wait(parseInt(Math.random() * 2000 + 1000, 10))) : ($.log("完成！"), await llII1i($.activityJoyList, $.workJoyInfoList), await $.wait(parseInt(Math.random() * 2000 + 1000, 10)));
        }
    }
}

async function illI11(l1III, l1I1iI) {
    const Il111 = {
        "functionId": "joyMove",
        "clientVersion": "10.1.0",
        "client": "ios",
        "t": lIiI1,
        "appid": "activities_platform",
        "body": "{\"joyId\":" + l1III + ",\"location\":" + l1I1iI + ",\"linkId\":\"jBNXcoiASxGof0f2RFI2Sw\"}"
    },
        lIiIli = await iillIi("50788", Il111);
    return new Promise(l1I1ii => {
        $.post(IiIi1I(lIiIli), async (IIiI, l1iil1, iiiIiI) => {
            try {
                IIiI ? (console.log("" + JSON.stringify(IIiI)), console.log($.name + "  doJoyMove API请求失败，请检查网路重试")) : (l1I1iI !== 0 && $.log("下地完成了！"), iiiIiI = JSON.parse(iiiIiI));
            } catch (illl1I) {
                $.logErr(illl1I, l1iil1);
            } finally {
                l1I1ii(iiiIiI.data);
            }
        });
    });
}

async function ll11Ii(lillI, Il11i) {
    const iiI1 = {
        "functionId": "joyMergeGet",
        "clientVersion": "10.1.0",
        "client": "ios",
        "t": lIiI1,
        "appid": "activities_platform",
        "body": "{\"joyOneId\":" + lillI + ",\"joyTwoId\":" + Il11i + ",\"linkId\":\"jBNXcoiASxGof0f2RFI2Sw\"}"
    },
        Il11l = await iillIi("b08cf", iiI1);
    return new Promise(iiiIl1 => {
        $.get(IiIi1I(Il11l), async (Iil1I, illIIl, iiiIlI) => {
            try {
                Iil1I ? (console.log("" + JSON.stringify(Iil1I)), console.log($.name + " doJoyMerge API请求失败，请检查网路重试"), iiiIlI = {}, iliIi = true) : (iiiIlI = JSON.parse(iiiIlI), $.log("合成 " + lillI + " <=> " + Il11i + " " + (iiiIlI.success ? "成功！" : "失败！【" + iiiIlI.errMsg + "】 code=" + iiiIlI.code)), iiiIlI.code == "1006" && (iiil1I += 1), iiil1I == 5 && (console.log("失败次数多，避免死循环，跳出！"), iliIi = true));
            } catch (Ill1il) {
                $.logErr(Ill1il, illIIl);
                iliIi = true;
            } finally {
                iiiIl1(iiiIlI.data);
            }
        });
    });
}

async function ll11Il(IIil, IIii) {
    const llIiIl = {
        "functionId": "joyBuy",
        "clientVersion": "10.1.0",
        "client": "ios",
        "t": lIiI1,
        "appid": "activities_platform",
        "body": "{\"level\":" + IIil + ",\"linkId\":\"jBNXcoiASxGof0f2RFI2Sw\"}"
    },
        I1i1i = await iillIi("ffb36", llIiIl);
    return new Promise(IIll => {
        $.post(IiIi1I(I1i1i), async (iiiIll, iilliI, iII1i) => {
            try {
                if (iiiIll) console.log("" + JSON.stringify(iiiIll)), console.log($.name + " doJoyBuy API请求失败，请检查网路重试"); else {
                    iII1i = JSON.parse(iII1i);
                    let ilI1ii = "【不知道啥意思】";

                    switch (iII1i.code) {
                        case 519:
                            ilI1ii = "【没钱了】";
                            break;

                        case 518:
                            ilI1ii = "【没空位】";

                            if (IIii) {
                                $.log("因为购买 " + IIil + "级🐶 没空位 所以我要删掉比低级的狗了");
                                let iII1l = Math.min.apply(Math, IIii.map(ilI1il => ilI1il.level));
                                await i11lI(IIii.filter(i11Il => i11Il.level === iII1l)[0].id);
                                await $.wait(parseInt(Math.random() * 2000 + 1000, 10));
                            }

                            break;

                        case 0:
                            ilI1ii = "【OK】";
                            break;
                    }

                    $.log("购买joy level: " + IIil + " " + (iII1i.success ? "成功！" : "失败！" + iII1i.errMsg + " code=" + iII1i.code) + "  code的意思是=" + ilI1ii);
                }
            } catch (iII1I) {
                $.logErr(iII1I, iilliI);
            } finally {
                IIll(iII1i);
            }
        });
    });
}

async function i11lI(iilli1) {
    const Iil1l = {
        "functionId": "joyRecovery",
        "clientVersion": "10.1.0",
        "client": "ios",
        "t": lIiI1,
        "appid": "activities_platform",
        "body": "{\"level\":" + level + ",\"linkId\":\"jBNXcoiASxGof0f2RFI2Sw\"}"
    },
        Iil1i = await iillIi("ffb36", Iil1l);
    return new Promise(i11I1 => {
        $.post(IiIi1I(Iil1i), async (l1lII1, iilllI, i1i1iI) => {
            try {
                if (l1lII1) {
                    console.log("" + JSON.stringify(l1lII1));
                    console.log($.name + " doJoyRecovery API请求失败，请检查网路重试");
                    i1i1iI = {};
                } else i1i1iI = JSON.parse(i1i1iI), $.log("回收🐶 " + (i1i1iI.success ? "成功！" : "失败！【" + i1i1iI.errMsg + "】 code=" + i1i1iI.code));
            } catch (l1I1i) {
                $.logErr(l1I1i, iilllI);
            } finally {
                i11I1(i1i1iI);
            }
        });
    });
}

async function Illl1() {
    const IlIi1 = {
        "functionId": "joyRestart",
        "clientVersion": "10.1.0",
        "client": "ios",
        "t": lIiI1,
        "appid": "activities_platform",
        "body": "{\"linkId\":\"jBNXcoiASxGof0f2RFI2Sw\"}"
    },
        i1i1il = await iillIi("ffb36", IlIi1);
    return new Promise(I111il => {
        $.post(IiIi1I(i1i1il), async (l1Ili1, iliili, iliill) => {
            try {
                l1Ili1 ? (console.log("" + JSON.stringify(l1Ili1)), console.log($.name + " doJoyRestart API请求失败，请检查网路重试")) : (iliill = JSON.parse(iliill), $.log("新场景解锁 " + (iliill.success ? "成功！" : "失败！【" + iliill.errMsg + "】 code=" + iliill.code)));
            } catch (I111ii) {
                $.logErr(I111ii, iliili);
            } finally {
                I111il(iliill);
            }
        });
    });
}

async function iii1I() {
    return new Promise(async IlIii => {
        const II1i11 = {
            "linkId": "jBNXcoiASxGof0f2RFI2Sw"
        },
            IlillI = {
                "url": "https://api.m.jd.com",
                "body": "functionId=gameMyPrize&body=" + escape(JSON.stringify(II1i11)) + "&_t=" + +new Date() + "&appid=activities_platform",
                "headers": {
                    "User-Agent": $.UA,
                    "Content-Type": "application/x-www-form-urlencoded",
                    "Host": "api.m.jd.com",
                    "Origin": "https://joypark.jd.com",
                    "Referer": "https://joypark.jd.com/?activityId=jBNXcoiASxGof0f2RFI2Sw&lng=113.387899&lat=22.512678&sid=4d76080a9da10fbb31f5cd43396ed6cw&un_area=19_1657_52093_0",
                    "Cookie": iii1l
                },
                "timeout": 30 * 1000
            };
        $.post(IlillI, async (I111l1, iIliII, iIii1I) => {
            try {
                if (I111l1) console.log("" + JSON.stringify(I111l1)), console.log($.name + " API请求失败，请检查网路重试"); else {
                    iIii1I = JSON.parse(iIii1I);

                    if (iIii1I.success && iIii1I.data) {
                        $.Vos = iIii1I.data.gamePrizeItemVos;

                        for (let iIill = 0; iIill < $.Vos.length; iIill++) {
                            if ($.Vos[iIill].prizeType == 4 && $.Vos[iIill].status == 1 && $.Vos[iIill].prizeTypeVO.prizeUsed == 0) {
                                $.log("当前账号有【" + $.Vos[iIill].prizeName + "】可提现");
                                $.id = $.Vos[iIill].prizeTypeVO.id;
                                $.poolBaseId = $.Vos[iIill].prizeTypeVO.poolBaseId;
                                $.prizeGroupId = $.Vos[iIill].prizeTypeVO.prizeGroupId;
                                $.prizeBaseId = $.Vos[iIill].prizeTypeVO.prizeBaseId;
                                await iliII($.id, $.poolBaseId, $.prizeGroupId, $.prizeBaseId);
                            }
                        }
                    }
                }
            } catch (IIl11l) {
                $.logErr(IIl11l, iIliII);
            } finally {
                IlIii(iIii1I);
            }
        });
    });
}

function iliII(I111i1, lIl1i1, l1Ilil, iIili) {
    return new Promise(IIil11 => {
        const l1IliI = {
            "linkId": "jBNXcoiASxGof0f2RFI2Sw",
            "businessSource": "JOY_PARK",
            "base": {
                "prizeType": 4,
                "business": "fission",
                "id": I111i1,
                "poolBaseId": lIl1i1,
                "prizeGroupId": l1Ilil,
                "prizeBaseId": iIili
            }
        },
            liIIIi = {
                "url": "https://api.m.jd.com",
                "body": "functionId=apCashWithDraw&body=" + escape(JSON.stringify(l1IliI)) + "&_t=" + +new Date() + "&appid=activities_platform",
                "headers": {
                    "User-Agent": $.UA,
                    "Content-Type": "application/x-www-form-urlencoded",
                    "Host": "api.m.jd.com",
                    "Origin": "https://joypark.jd.com",
                    "Referer": "https://joypark.jd.com/?activityId=jBNXcoiASxGof0f2RFI2Sw&lng=113.387899&lat=22.512678&sid=4d76080a9da10fbb31f5cd43396ed6cw&un_area=19_1657_52093_0",
                    "Cookie": iii1l
                },
                "timeout": 30 * 1000
            };
        $.post(liIIIi, async (l1IllI, lIi1Ii, iiilII) => {
            try {
                if (l1IllI) console.log("" + JSON.stringify(l1IllI)), console.log($.name + " API请求失败，请检查网路重试"); else {
                    if (safeGet(iiilII)) {
                        iiilII = $.toObj(iiilII);

                        if (iiilII.code === 0) {
                            iiilII.data.status === "310" ? console.log("提现现金成功！") : console.log("提现现金：失败:" + JSON.stringify(iiilII.data.message));
                        } else console.log("提现现金：异常:" + JSON.stringify(iiilII));
                    }
                }
            } catch (ii1iI1) {
                $.logErr(ii1iI1, lIi1Ii);
            } finally {
                IIil11(iiilII);
            }
        });
    });
}


function liIlI1(lilI) {
    return {
        "url": "https://api.m.jd.com/",
        "body": lilI,
        "headers": {
            "User-Agent": $.UA,
            "Content-Type": "application/x-www-form-urlencoded",
            "Host": "api.m.jd.com",
            "Origin": "https://joypark.jd.com",
            "Referer": "https://joypark.jd.com/?activityId=jBNXcoiASxGof0f2RFI2Sw&lng=113.387899&lat=22.512678&sid=4d76080a9da10fbb31f5cd43396ed6cw&un_area=19_1657_52093_0",
            "Cookie": iii1l
        },
        "timeout": 30 * 1000
    };
}

function iillIl(l1Ill1, iiilI1) {
    return {
        "url": "https://api.m.jd.com/client.action?functionId=" + iiilI1 + (l1Ill1 ? "&" + l1Ill1 : ""),
        "headers": {
            "User-Agent": $.UA,
            "Content-Type": "application/x-www-form-urlencoded",
            "Host": "api.m.jd.com",
            "Origin": "https://joypark.jd.com",
            "Referer": "https://joypark.jd.com/?activityId=jBNXcoiASxGof0f2RFI2Sw&lng=113.388006&lat=22.512549&sid=4d76080a9da10fbb31f5cd43396ed6cw&un_area=19_1657_52093_0",
            "Cookie": iii1l
        },
        "timeout": 30 * 1000
    };
}

function IiIi1I(iliI1l) {
    return {
        "url": "https://api.m.jd.com/?" + iliI1l,
        "headers": {
            "User-Agent": $.UA,
            "Content-Type": "application/x-www-form-urlencoded",
            "Host": "api.m.jd.com",
            "Origin": "https://joypark.jd.com",
            "Referer": "https://joypark.jd.com/?activityId=jBNXcoiASxGof0f2RFI2Sw&lng=113.387899&lat=22.512678&sid=4d76080a9da10fbb31f5cd43396ed6cw&un_area=19_1657_52093_0",
            "Cookie": iii1l
        },
        "timeout": 30 * 1000
    };
}

async function iillIi(i11III, ii1iIl) {
    try {
        let l1iii1 = new Il1I({
            "appId": i11III,
            "appid": "activities_platform",
            "clientVersion": ii1iIl?.["clientVersion"],
            "client": ii1iIl?.["client"],
            "pin": $.UserName,
            "ua": $.UA,
            "version": "4.1"
        });
        return await l1iii1.genAlgo(), body = await l1iii1.genUrlParams(ii1iIl.functionId, ii1iIl.body), body;
    } catch (Ii111I) { }
}

async function iii11(iI11ll, liIl1i) {
    let IIiII1 = {
        "searchParams": {
            ...liIl1i,
            "appId": iI11ll
        },
        "pt_pin": $.UserName,
        "client": liIl1i?.["client"],
        "clientVersion": liIl1i?.["clientVersion"]
    },
        lIi1I = {
            "Content-Type": "application/json",
            "User-Agent": $.UA
        },
        Ii1111 = {
            "url": "http://h5st.kingran.cf/api/h5st",
            "body": JSON.stringify(IIiII1),
            "headers": lIi1I,
            "timeout": 30000
        };
    return new Promise(async I1liIl => {
        $.post(Ii1111, (li11I1, i1I111, l1li11) => {
            let il1Il1 = "";

            try {
                if (li11I1) {
                    console.log($.name + " getH5st API请求失败，请检查网路重试");
                } else {
                    l1li11 = JSON.parse(l1li11);
                    console.log(JSON.stringify(l1li11));

                    if (typeof l1li11 === "object" && l1li11 && l1li11.body) {
                        if (l1li11.body) il1Il1 = l1li11 || "";
                    } else l1li11.code == 400 ? console.log("\n" + l1li11.msg) : console.log("\n可能连接不上接口，请检查网络");
                }
            } catch (iIiIli) {
                $.logErr(iIiIli, i1I111);
            } finally {
                I1liIl(iliI1(il1Il1));
            }
        });
    });
}

function iliI1(i1I11I, Ii1lli = {}) {
    let I1IIII = [],
        I1I1 = Ii1lli.connector || "&",
        Ii1lI = Object.keys(i1I11I);
    if (Ii1lli.sort) Ii1lI = Ii1lI.sort();

    for (let Ii1llI of Ii1lI) {
        let i1I11i = i1I11I[Ii1llI];
        if (i1I11i && typeof i1I11i === "object") i1I11i = JSON.stringify(i1I11i);
        if (i1I11i && Ii1lli.encode) i1I11i = encodeURIComponent(i1I11i);
        I1IIII.push(Ii1llI + "=" + i1I11i);
    }

    return I1IIII.join(I1I1);
}

function i11iI(li11Il) {
    li11Il = li11Il || 32;
    let IIlIl1 = "abcdef0123456789",
        liII1l = IIlIl1.length,
        Ii1ll1 = "";

    for (i = 0; i < li11Il; i++) Ii1ll1 += IIlIl1.charAt(Math.floor(Math.random() * liII1l));

    return Ii1ll1;
}

function lIiII(iIll1) {
    if (typeof iIll1 == "string") try {
        return JSON.parse(iIll1);
    } catch (I1Ii) {
        return console.log(I1Ii), $.msg($.name, "", "请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie"), [];
    }
}
// prettier-ignore
function Env(t, e) { "undefined" != typeof process && JSON.stringify(process.env).indexOf("GITHUB") > -1 && process.exit(0); class s { constructor(t) { this.env = t } send(t, e = "GET") { t = "string" == typeof t ? { url: t } : t; let s = this.get; return "POST" === e && (s = this.post), new Promise((e, i) => { s.call(this, t, (t, s, r) => { t ? i(t) : e(s) }) }) } get(t) { return this.send.call(this.env, t) } post(t) { return this.send.call(this.env, t, "POST") } } return new class { constructor(t, e) { this.name = t, this.http = new s(this), this.data = null, this.dataFile = "box.dat", this.logs = [], this.isMute = !1, this.isNeedRewrite = !1, this.logSeparator = "\n", this.startTime = (new Date).getTime(), Object.assign(this, e), this.log("", `🔔${this.name}, 开始!`) } isNode() { return "undefined" != typeof module && !!module.exports } isQuanX() { return "undefined" != typeof $task } isSurge() { return "undefined" != typeof $httpClient && "undefined" == typeof $loon } isLoon() { return "undefined" != typeof $loon } toObj(t, e = null) { try { return JSON.parse(t) } catch { return e } } toStr(t, e = null) { try { return JSON.stringify(t) } catch { return e } } getjson(t, e) { let s = e; const i = this.getdata(t); if (i) try { s = JSON.parse(this.getdata(t)) } catch { } return s } setjson(t, e) { try { return this.setdata(JSON.stringify(t), e) } catch { return !1 } } getScript(t) { return new Promise(e => { this.get({ url: t }, (t, s, i) => e(i)) }) } runScript(t, e) { return new Promise(s => { let i = this.getdata("@chavy_boxjs_userCfgs.httpapi"); i = i ? i.replace(/\n/g, "").trim() : i; let r = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout"); r = r ? 1 * r : 20, r = e && e.timeout ? e.timeout : r; const [o, h] = i.split("@"), n = { url: `http://${h}/v1/scripting/evaluate`, body: { script_text: t, mock_type: "cron", timeout: r }, headers: { "X-Key": o, Accept: "*/*" } }; this.post(n, (t, e, i) => s(i)) }).catch(t => this.logErr(t)) } loaddata() { if (!this.isNode()) return {}; { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e); if (!s && !i) return {}; { const i = s ? t : e; try { return JSON.parse(this.fs.readFileSync(i)) } catch (t) { return {} } } } } writedata() { if (this.isNode()) { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e), r = JSON.stringify(this.data); s ? this.fs.writeFileSync(t, r) : i ? this.fs.writeFileSync(e, r) : this.fs.writeFileSync(t, r) } } lodash_get(t, e, s) { const i = e.replace(/\[(\d+)\]/g, ".$1").split("."); let r = t; for (const t of i) if (r = Object(r)[t], void 0 === r) return s; return r } lodash_set(t, e, s) { return Object(t) !== t ? t : (Array.isArray(e) || (e = e.toString().match(/[^.[\]]+/g) || []), e.slice(0, -1).reduce((t, s, i) => Object(t[s]) === t[s] ? t[s] : t[s] = Math.abs(e[i + 1]) >> 0 == +e[i + 1] ? [] : {}, t)[e[e.length - 1]] = s, t) } getdata(t) { let e = this.getval(t); if (/^@/.test(t)) { const [, s, i] = /^@(.*?)\.(.*?)$/.exec(t), r = s ? this.getval(s) : ""; if (r) try { const t = JSON.parse(r); e = t ? this.lodash_get(t, i, "") : e } catch (t) { e = "" } } return e } setdata(t, e) { let s = !1; if (/^@/.test(e)) { const [, i, r] = /^@(.*?)\.(.*?)$/.exec(e), o = this.getval(i), h = i ? "null" === o ? null : o || "{}" : "{}"; try { const e = JSON.parse(h); this.lodash_set(e, r, t), s = this.setval(JSON.stringify(e), i) } catch (e) { const o = {}; this.lodash_set(o, r, t), s = this.setval(JSON.stringify(o), i) } } else s = this.setval(t, e); return s } getval(t) { return this.isSurge() || this.isLoon() ? $persistentStore.read(t) : this.isQuanX() ? $prefs.valueForKey(t) : this.isNode() ? (this.data = this.loaddata(), this.data[t]) : this.data && this.data[t] || null } setval(t, e) { return this.isSurge() || this.isLoon() ? $persistentStore.write(t, e) : this.isQuanX() ? $prefs.setValueForKey(t, e) : this.isNode() ? (this.data = this.loaddata(), this.data[e] = t, this.writedata(), !0) : this.data && this.data[e] || null } initGotEnv(t) { this.got = this.got ? this.got : require("got"), this.cktough = this.cktough ? this.cktough : require("tough-cookie"), this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar, t && (t.headers = t.headers ? t.headers : {}, void 0 === t.headers.Cookie && void 0 === t.cookieJar && (t.cookieJar = this.ckjar)) } get(t, e = (() => { })) { t.headers && (delete t.headers["Content-Type"], delete t.headers["Content-Length"]), this.isSurge() || this.isLoon() ? (this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.get(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) })) : this.isQuanX() ? (this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t))) : this.isNode() && (this.initGotEnv(t), this.got(t).on("redirect", (t, e) => { try { if (t.headers["set-cookie"]) { const s = t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString(); s && this.ckjar.setCookieSync(s, null), e.cookieJar = this.ckjar } } catch (t) { this.logErr(t) } }).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) })) } post(t, e = (() => { })) { if (t.body && t.headers && !t.headers["Content-Type"] && (t.headers["Content-Type"] = "application/x-www-form-urlencoded"), t.headers && delete t.headers["Content-Length"], this.isSurge() || this.isLoon()) this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.post(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) }); else if (this.isQuanX()) t.method = "POST", this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t)); else if (this.isNode()) { this.initGotEnv(t); const { url: s, ...i } = t; this.got.post(s, i).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) }) } } time(t, e = null) { const s = e ? new Date(e) : new Date; let i = { "M+": s.getMonth() + 1, "d+": s.getDate(), "H+": s.getHours(), "m+": s.getMinutes(), "s+": s.getSeconds(), "q+": Math.floor((s.getMonth() + 3) / 3), S: s.getMilliseconds() }; /(y+)/.test(t) && (t = t.replace(RegExp.$1, (s.getFullYear() + "").substr(4 - RegExp.$1.length))); for (let e in i) new RegExp("(" + e + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? i[e] : ("00" + i[e]).substr(("" + i[e]).length))); return t } msg(e = t, s = "", i = "", r) { const o = t => { if (!t) return t; if ("string" == typeof t) return this.isLoon() ? t : this.isQuanX() ? { "open-url": t } : this.isSurge() ? { url: t } : void 0; if ("object" == typeof t) { if (this.isLoon()) { let e = t.openUrl || t.url || t["open-url"], s = t.mediaUrl || t["media-url"]; return { openUrl: e, mediaUrl: s } } if (this.isQuanX()) { let e = t["open-url"] || t.url || t.openUrl, s = t["media-url"] || t.mediaUrl; return { "open-url": e, "media-url": s } } if (this.isSurge()) { let e = t.url || t.openUrl || t["open-url"]; return { url: e } } } }; if (this.isMute || (this.isSurge() || this.isLoon() ? $notification.post(e, s, i, o(r)) : this.isQuanX() && $notify(e, s, i, o(r))), !this.isMuteLog) { let t = ["", "==============📣系统通知📣=============="]; t.push(e), s && t.push(s), i && t.push(i), console.log(t.join("\n")), this.logs = this.logs.concat(t) } } log(...t) { t.length > 0 && (this.logs = [...this.logs, ...t]), console.log(t.join(this.logSeparator)) } logErr(t, e) { const s = !this.isSurge() && !this.isQuanX() && !this.isLoon(); s ? this.log("", `❗️${this.name}, 错误!`, t.stack) : this.log("", `❗️${this.name}, 错误!`, t) } wait(t) { return new Promise(e => setTimeout(e, t)) } done(t = {}) { const e = (new Date).getTime(), s = (e - this.startTime) / 1e3; this.log("", `🔔${this.name}, 结束! 🕛 ${s} 秒`), this.log(), (this.isSurge() || this.isQuanX() || this.isLoon()) && $done(t) } }(t, e) }
