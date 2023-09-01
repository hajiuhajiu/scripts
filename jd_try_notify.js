/*
东东水果:脚本更新地址 jd_fruit_help.js
更新时间：2023-8-31
活动入口：京东APP我的-更多工具-东东农场
==========================Quantumultx=========================
[task_local]
#东东农场内部互助
20 4,16 * * * jd_fruit_help.js, tag=东东农场内部互助, img-url=https://raw.githubusercontent.com/58xinian/icon/master/jdnc.png, enabled=true
=========================Loon=============================
[Script]
cron "20 4,16 * * *" script-path=jd_fruit_help.js,tag=东东农场内部互助

=========================Surge============================
东东农场内部互助 = type=cron,cronexp="20 4,16 * * *",wake-system=1,timeout=3600,script-path=jd_fruit_help.js

=========================小火箭===========================
东东农场内部互助 = type=cron,script-path=jd_fruit_help.js, cronexpr="20 4,16 * * *", timeout=3600, enable=true

*/
const $ = new Env('东东农场内部水滴互助');
let cookiesArr = [],
    cookie = '',
    jdFruitShareArr = [],
    isBox = false,
    notify,
    allMessage = '';
let shareCodes = [ // 这个列表填入你要助力的好友的shareCode
    //     //账号一的好友shareCode,不同好友的shareCode中间用@符号隔开
    '47185c0af3b04054a6eba856fa5f974d','9e195230d84e405cb0b5d449555b2b6b','f418bcd262c14b8fb221afe628bcc2a6@3aada576c8e749a988b483c560e5d4ab@46f8cdd7d0894ccaa3a387858b9c8eb2@e508c2ca55df409081d85c91dd7f6865@c6952a52386c4c538bb4bbd69d14e085@c13f2881124147b0bad0f091bb7251e8@ed9ca6042879426a8960f69d1dcfa089@b4fbe5bd8e084623a6db55868446d454@74c481e14b7b49aabc114fbb5962b9e1@b2969919ef9a4eb080791cd2d618367b@fd754ccbbc2c4164886499428af3f74f@76493dd9bfff40feaec780845e53164d@b1bcdbac8745452e8eddd1c561592d38@934ebb1a50c744f690e140d223d916bd@6580ebacf440487b8ef1d30b3fffb440@c9237c0d6903480090d8007342fafb92@1e181ac6c2144cbfb5a528950d7a6830@48827603cc774e45b56829a278ee4153 @53261f1b5bff40cc999615c395c003ed @8f877af213824ab9b4b6a7b3f6828849@48b22af8b4eb47ebb5dabb2df26bd80a@84c64905fdc741c9a568a3c751a7b039@ad3a83b8e88c448abfd3d7296ca45ede@7b7e147cc40a42eea3435b5904dc5e33@lNQiuJmGisgIjiQFolfnLw==@63bf1fbcbaf2431c99b9e668df6a09b8@ccba7c5b9ab640c891a70b4d15f2cf02@76493dd9bfff40feaec780845e53164d@fd62dcddf0f74872b3506eb1e4151e9c@372105e99b2c4664a02e37618610db07@5a2dc86d4c5a4c0fb882ddb9384312aa@8f9670a3958244e3b363080cdca4a517@59f63315cd0a444f93a3d81c9d3b6784@d2487f8bc9a14f53a78af1c734a11391@efab9f1398d14197b5960a377af7a0a0@8efdacaef57d4d1991f4937769b7e629@6a4db36dfe0140db90cb4309d9d59cd1@8bf296436105415ab1f15a8c9cb654dd@@d63922e3626d4d4d9fce5dcad980a3e6@1e181ac6c2144cbfb5a528950d7a6830',
    //     //账号二的好友shareCode,不同好友的shareCode中间用@符号隔开
     '47185c0af3b04054a6eba856fa5f974d@9e195230d84e405cb0b5d449555b2b6b@f418bcd262c14b8fb221afe628bcc2a6@3aada576c8e749a988b483c560e5d4ab@46f8cdd7d0894ccaa3a387858b9c8eb2@e508c2ca55df409081d85c91dd7f6865@c6952a52386c4c538bb4bbd69d14e085@c13f2881124147b0bad0f091bb7251e8@ed9ca6042879426a8960f69d1dcfa089@b4fbe5bd8e084623a6db55868446d454@74c481e14b7b49aabc114fbb5962b9e1@b2969919ef9a4eb080791cd2d618367b@fd754ccbbc2c4164886499428af3f74f@76493dd9bfff40feaec780845e53164d@b1bcdbac8745452e8eddd1c561592d38@934ebb1a50c744f690e140d223d916bd@6580ebacf440487b8ef1d30b3fffb440@c9237c0d6903480090d8007342fafb92@1e181ac6c2144cbfb5a528950d7a6830@48827603cc774e45b56829a278ee4153 @53261f1b5bff40cc999615c395c003ed @8f877af213824ab9b4b6a7b3f6828849@48b22af8b4eb47ebb5dabb2df26bd80a@84c64905fdc741c9a568a3c751a7b039@ad3a83b8e88c448abfd3d7296ca45ede@7b7e147cc40a42eea3435b5904dc5e33@lNQiuJmGisgIjiQFolfnLw==@63bf1fbcbaf2431c99b9e668df6a09b8@ccba7c5b9ab640c891a70b4d15f2cf02@76493dd9bfff40feaec780845e53164d@fd62dcddf0f74872b3506eb1e4151e9c@372105e99b2c4664a02e37618610db07@5a2dc86d4c5a4c0fb882ddb9384312aa@8f9670a3958244e3b363080cdca4a517@59f63315cd0a444f93a3d81c9d3b6784@d2487f8bc9a14f53a78af1c734a11391@efab9f1398d14197b5960a377af7a0a0@8efdacaef57d4d1991f4937769b7e629@6a4db36dfe0140db90cb4309d9d59cd1@8bf296436105415ab1f15a8c9cb654dd@@d63922e3626d4d4d9fce5dcad980a3e6@1e181ac6c2144cbfb5a528950d7a6830',	'47185c0af3b04054a6eba856fa5f974d@9e195230d84e405cb0b5d449555b2b6b@f418bcd262c14b8fb221afe628bcc2a6@3aada576c8e749a988b483c560e5d4ab@46f8cdd7d0894ccaa3a387858b9c8eb2@e508c2ca55df409081d85c91dd7f6865@c6952a52386c4c538bb4bbd69d14e085@c13f2881124147b0bad0f091bb7251e8@ed9ca6042879426a8960f69d1dcfa089@b4fbe5bd8e084623a6db55868446d454@74c481e14b7b49aabc114fbb5962b9e1@b2969919ef9a4eb080791cd2d618367b@fd754ccbbc2c4164886499428af3f74f@76493dd9bfff40feaec780845e53164d@b1bcdbac8745452e8eddd1c561592d38@934ebb1a50c744f690e140d223d916bd@6580ebacf440487b8ef1d30b3fffb440@c9237c0d6903480090d8007342fafb92@1e181ac6c2144cbfb5a528950d7a6830@48827603cc774e45b56829a278ee4153 @53261f1b5bff40cc999615c395c003ed @8f877af213824ab9b4b6a7b3f6828849@48b22af8b4eb47ebb5dabb2df26bd80a@84c64905fdc741c9a568a3c751a7b039@ad3a83b8e88c448abfd3d7296ca45ede@7b7e147cc40a42eea3435b5904dc5e33@lNQiuJmGisgIjiQFolfnLw==@63bf1fbcbaf2431c99b9e668df6a09b8@ccba7c5b9ab640c891a70b4d15f2cf02@76493dd9bfff40feaec780845e53164d@fd62dcddf0f74872b3506eb1e4151e9c@372105e99b2c4664a02e37618610db07@5a2dc86d4c5a4c0fb882ddb9384312aa@8f9670a3958244e3b363080cdca4a517@59f63315cd0a444f93a3d81c9d3b6784@d2487f8bc9a14f53a78af1c734a11391@efab9f1398d14197b5960a377af7a0a0@8efdacaef57d4d1991f4937769b7e629@6a4db36dfe0140db90cb4309d9d59cd1@8bf296436105415ab1f15a8c9cb654dd@@d63922e3626d4d4d9fce5dcad980a3e6@1e181ac6c2144cbfb5a528950d7a6830'
]
let newShareCodes = [ // 这个列表填入你要助力的好友的shareCode
    //     //账号一的好友shareCode,不同好友的shareCode中间用@符号隔开
    '47185c0af3b04054a6eba856fa5f974d','9e195230d84e405cb0b5d449555b2b6b','f418bcd262c14b8fb221afe628bcc2a6','3aada576c8e749a988b483c560e5d4ab','46f8cdd7d0894ccaa3a387858b9c8eb2@e508c2ca55df409081d85c91dd7f6865@c6952a52386c4c538bb4bbd69d14e085@c13f2881124147b0bad0f091bb7251e8@ed9ca6042879426a8960f69d1dcfa089@b4fbe5bd8e084623a6db55868446d454@74c481e14b7b49aabc114fbb5962b9e1@b2969919ef9a4eb080791cd2d618367b@fd754ccbbc2c4164886499428af3f74f@76493dd9bfff40feaec780845e53164d@b1bcdbac8745452e8eddd1c561592d38@934ebb1a50c744f690e140d223d916bd@6580ebacf440487b8ef1d30b3fffb440@c9237c0d6903480090d8007342fafb92@1e181ac6c2144cbfb5a528950d7a6830@48827603cc774e45b56829a278ee4153 @53261f1b5bff40cc999615c395c003ed @8f877af213824ab9b4b6a7b3f6828849@48b22af8b4eb47ebb5dabb2df26bd80a@84c64905fdc741c9a568a3c751a7b039@ad3a83b8e88c448abfd3d7296ca45ede@7b7e147cc40a42eea3435b5904dc5e33@lNQiuJmGisgIjiQFolfnLw==@63bf1fbcbaf2431c99b9e668df6a09b8@ccba7c5b9ab640c891a70b4d15f2cf02@76493dd9bfff40feaec780845e53164d@fd62dcddf0f74872b3506eb1e4151e9c@372105e99b2c4664a02e37618610db07@5a2dc86d4c5a4c0fb882ddb9384312aa@8f9670a3958244e3b363080cdca4a517@59f63315cd0a444f93a3d81c9d3b6784@d2487f8bc9a14f53a78af1c734a11391@efab9f1398d14197b5960a377af7a0a0@8efdacaef57d4d1991f4937769b7e629@6a4db36dfe0140db90cb4309d9d59cd1@8bf296436105415ab1f15a8c9cb654dd@@d63922e3626d4d4d9fce5dcad980a3e6@1e181ac6c2144cbfb5a528950d7a6830',
    //     //账号二的好友shareCode,不同好友的shareCode中间用@符号隔开
     '47185c0af3b04054a6eba856fa5f974d@9e195230d84e405cb0b5d449555b2b6b@f418bcd262c14b8fb221afe628bcc2a6@3aada576c8e749a988b483c560e5d4ab@46f8cdd7d0894ccaa3a387858b9c8eb2@e508c2ca55df409081d85c91dd7f6865@c6952a52386c4c538bb4bbd69d14e085@c13f2881124147b0bad0f091bb7251e8@ed9ca6042879426a8960f69d1dcfa089@b4fbe5bd8e084623a6db55868446d454@74c481e14b7b49aabc114fbb5962b9e1@b2969919ef9a4eb080791cd2d618367b@fd754ccbbc2c4164886499428af3f74f@76493dd9bfff40feaec780845e53164d@b1bcdbac8745452e8eddd1c561592d38@934ebb1a50c744f690e140d223d916bd@6580ebacf440487b8ef1d30b3fffb440@c9237c0d6903480090d8007342fafb92@1e181ac6c2144cbfb5a528950d7a6830@48827603cc774e45b56829a278ee4153 @53261f1b5bff40cc999615c395c003ed @8f877af213824ab9b4b6a7b3f6828849@48b22af8b4eb47ebb5dabb2df26bd80a@84c64905fdc741c9a568a3c751a7b039@ad3a83b8e88c448abfd3d7296ca45ede@7b7e147cc40a42eea3435b5904dc5e33@lNQiuJmGisgIjiQFolfnLw==@63bf1fbcbaf2431c99b9e668df6a09b8@ccba7c5b9ab640c891a70b4d15f2cf02@76493dd9bfff40feaec780845e53164d@fd62dcddf0f74872b3506eb1e4151e9c@372105e99b2c4664a02e37618610db07@5a2dc86d4c5a4c0fb882ddb9384312aa@8f9670a3958244e3b363080cdca4a517@59f63315cd0a444f93a3d81c9d3b6784@d2487f8bc9a14f53a78af1c734a11391@efab9f1398d14197b5960a377af7a0a0@8efdacaef57d4d1991f4937769b7e629@6a4db36dfe0140db90cb4309d9d59cd1@8bf296436105415ab1f15a8c9cb654dd@@d63922e3626d4d4d9fce5dcad980a3e6@1e181ac6c2144cbfb5a528950d7a6830',	'47185c0af3b04054a6eba856fa5f974d@9e195230d84e405cb0b5d449555b2b6b@f418bcd262c14b8fb221afe628bcc2a6@3aada576c8e749a988b483c560e5d4ab@46f8cdd7d0894ccaa3a387858b9c8eb2@e508c2ca55df409081d85c91dd7f6865@c6952a52386c4c538bb4bbd69d14e085@c13f2881124147b0bad0f091bb7251e8@ed9ca6042879426a8960f69d1dcfa089@b4fbe5bd8e084623a6db55868446d454@74c481e14b7b49aabc114fbb5962b9e1@b2969919ef9a4eb080791cd2d618367b@fd754ccbbc2c4164886499428af3f74f@76493dd9bfff40feaec780845e53164d@b1bcdbac8745452e8eddd1c561592d38@934ebb1a50c744f690e140d223d916bd@6580ebacf440487b8ef1d30b3fffb440@c9237c0d6903480090d8007342fafb92@1e181ac6c2144cbfb5a528950d7a6830@48827603cc774e45b56829a278ee4153 @53261f1b5bff40cc999615c395c003ed @8f877af213824ab9b4b6a7b3f6828849@48b22af8b4eb47ebb5dabb2df26bd80a@84c64905fdc741c9a568a3c751a7b039@ad3a83b8e88c448abfd3d7296ca45ede@7b7e147cc40a42eea3435b5904dc5e33@lNQiuJmGisgIjiQFolfnLw==@63bf1fbcbaf2431c99b9e668df6a09b8@ccba7c5b9ab640c891a70b4d15f2cf02@76493dd9bfff40feaec780845e53164d@fd62dcddf0f74872b3506eb1e4151e9c@372105e99b2c4664a02e37618610db07@5a2dc86d4c5a4c0fb882ddb9384312aa@8f9670a3958244e3b363080cdca4a517@59f63315cd0a444f93a3d81c9d3b6784@d2487f8bc9a14f53a78af1c734a11391@efab9f1398d14197b5960a377af7a0a0@8efdacaef57d4d1991f4937769b7e629@6a4db36dfe0140db90cb4309d9d59cd1@8bf296436105415ab1f15a8c9cb654dd@@d63922e3626d4d4d9fce5dcad980a3e6@1e181ac6c2144cbfb5a528950d7a6830'
];
let iliIIil1 = "",
    i1iIlili = "",
    ii11lIi1 = {};
let Iiil1ii = true;

const iIIIlIiI = "openjd://virtual?params=%7B%20%22category%22:%20%22jump%22,%20%22des%22:%20%22m%22,%20%22url%22:%20%22https://h5.m.jd.com/babelDiy/Zeus/3KSjXqQabiTuD1cJ28QskrpWoBKT/index.html%22%20%7D",
    III1i1ll = require("./function/jdCommon"),
    I1l1ilii = require("./function/h5st41.js");

let I11Ii1ll = i111l11(32, "1234567890qwertyuiopasdfghjklzxcvbnm"),
    Il1ll11i = i111l11(2, "1234567890") + "-" + i111l11(4, "1234567890") + "-" + i111l11(4, "1234567890") + "-" + i111l11(5, "1234567890"),
    ll1Ii1Ii = "106.475" + Math.floor(Math.random() * 899 + 100),
    l1lIiiIl = "29.503" + Math.floor(Math.random() * 899 + 100),
    lllil1iI = true;

const II1iIl11 = require("fs");

let IiiillI = false,
    iiiIIili = "./Fruit_ShareCache.json",
    i1illI1I = II1iIl11.existsSync(iiiIIili),
    Iil1lIii = [];
i1illI1I && (console.log("检测到东东农场缓存文件Fruit_ShareCache.json，载入..."), Iil1lIii = II1iIl11.readFileSync(iiiIIili, "utf-8"), Iil1lIii && (Iil1lIii = Iil1lIii.toString(), Iil1lIii = JSON.parse(Iil1lIii)));
let iiIi1lIi = 0,
    l1IIl1I = false,
    ll1l11II = [];
!(async () => {
    await lII111il();

    if (!cookiesArr[0]) {
        $.msg($.name, "【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取", "https://bean.m.jd.com/bean/signIndex.action", {
            "open-url": "https://bean.m.jd.com/bean/signIndex.action"
        });
        return;
    }

    console.log("\n【若多次提示403，务必更换IP运行.....】\n");

    if (lllil1iI) {
        console.log("\n【开始收集您的互助码，用于账号内部互助，请稍等...】\n");

        for (let iillIIi = 0; iillIIi < cookiesArr.length; iillIIi++) {
            if (cookiesArr[iillIIi]) {
                cookie = cookiesArr[iillIIi];
                $.UserName = decodeURIComponent(cookie.match(/pt_pin=([^; ]+)(?=;?)/) && cookie.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
                $.index = iillIIi + 1;
                $.isLogin = true;
                $.nickName = "";

                if (!$.isLogin) {
                    $.msg($.name, "【提示】cookie已失效", "京东账号" + $.index + " " + ($.nickName || $.UserName) + "\n请重新登录获取\nhttps://bean.m.jd.com/bean/signIndex.action", {
                        "open-url": "https://bean.m.jd.com/bean/signIndex.action"
                    });
                    $.isNode() && (await notify.sendNotify($.name + "cookie已失效 - " + $.UserName, "京东账号" + $.index + " " + $.UserName + "\n请重新登录获取cookie"));
                    continue;
                }

                iliIIil1 = "";
                i1iIlili = "";
                ii11lIi1 = {};
                $.UA = III1i1ll.genUA($.UserName);
                $.retry = 0;
                l1IIl1I = false;
                await iIIlll1I();
                l1IIl1I && (await $.wait(5000), iiIi1lIi++);
                iiIi1lIi == 10 && (console.log("\n【访问接口次数达到10次，休息一分钟.....】\n"), await $.wait(60 * 1000), iiIi1lIi = 0);
            }
        }

        if (IiiillI) {
            var lIiliil1 = JSON.stringify(Iil1lIii, null, 2);
            II1iIl11.writeFile(iiiIIili, lIiliil1, function (I111I1Ii) {
                I111I1Ii ? (console.log(I111I1Ii), console.log("\n【缓存文件Fruit_ShareCache.json更新失败!】\n")) : console.log("\n【缓存文件Fruit_ShareCache.json更新成功!】\n");
            });
        }
    }

    console.log("\n【互助码已经收集完毕，现在开始账号内部互助，请稍等...】\n");

    for (let l11I11ll = 0; l11I11ll < cookiesArr.length; l11I11ll++) {
        if (cookiesArr[l11I11ll]) {
            cookie = cookiesArr[l11I11ll];
            $.UserName = decodeURIComponent(cookie.match(/pt_pin=([^; ]+)(?=;?)/) && cookie.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
            $.index = l11I11ll + 1;
            $.isLogin = true;
            $.nickName = "";
            console.log("\n开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "\n");

            if (!$.isLogin) {
                $.msg($.name, "【提示】cookie已失效", "京东账号" + $.index + " " + ($.nickName || $.UserName) + "\n请重新登录获取\nhttps://bean.m.jd.com/bean/signIndex.action", {
                    "open-url": "https://bean.m.jd.com/bean/signIndex.action"
                });

                if ($.isNode()) {
                    await notify.sendNotify($.name + "cookie已失效 - " + $.UserName, "京东账号" + $.index + " " + $.UserName + "\n请重新登录获取cookie");
                }

                continue;
            }

            iliIIil1 = "";
            i1iIlili = "";
            ii11lIi1 = {};
            $.UA = III1i1ll.genUA($.UserName);
            $.retry = 0;
            iiIi1lIi++;
            await i1llliI1();
            iiIi1lIi == 3 && (console.log("\n【访问接口次数达到3次，休息一分钟.....】\n"), await $.wait(60 * 1000), iiIi1lIi = 0);
        }
    }

    if ($.isNode() && allMessage && $.ctrTemp) {
        await notify.sendNotify("" + $.name, "" + allMessage);
    }
})().catch(iIi1lI1 => {
    $.log("", "❌ " + $.name + ", 失败! 原因: " + iIi1lI1 + "!", "");
}).finally(() => {
    $.done();
});

async function i1llliI1() {
    i1iIlili = "【京东账号" + $.index + "】" + ($.nickName || $.UserName);

    try {
        await l1ili1();

        if ($.farmInfo?.["farmUserPro"]) {
            console.log("\n【已成功兑换水果】" + $.farmInfo?.["farmUserPro"]?.["winTimes"] + "次\n");
            await I1IiliI1();
            await ii1ilI1I();

            if ($.farmInfo?.["treeState"] === 2 || $.farmInfo?.["treeState"] === 3) {
                ii11lIi1["open-url"] = iIIIlIiI;
                return;
            } else {
                if ($.farmInfo?.["treeState"] === 1) console.log("\n当前种植：" + $.farmInfo?.["farmUserPro"]?.["name"] + "（等级" + $.farmInfo?.["farmUserPro"]?.["prizeLevel"] + "）\n"); else {
                    if ($.farmInfo?.["treeState"] === 0) {
                        ii11lIi1["open-url"] = iIIIlIiI;
                        return;
                    }
                }
            }
        } else {
            if ($.farmInfo?.["code"] == 3) console.log("农场异常: " + $.farmInfo?.["code"] + ",未登录"); else {
                if ($.farmInfo?.["code"] == 6) console.log("农场异常: " + $.farmInfo?.["code"] + ",活动太火爆"); else $.farmInfo?.["code"] == 2 ? console.log("农场异常: " + $.farmInfo?.["code"] + "," + $.farmInfo?.["echo"]) : console.log("农场异常: " + $.farmInfo?.["code"] + "," + $.farmInfo?.["message"]);
            }
            ($.farmInfo?.["code"] == 402 || $.farmInfo?.["code"] == 403) && (await $.wait(parseInt(Math.random() * 2000 + 30000, 10)));
            await $.wait(parseInt(Math.random() * 2000 + 2000, 10));
            $.retry < 2 && ($.retry++, console.log("等待3秒后重试,第:" + $.retry + "次"), await $.wait(3000), await i1llliI1());
        }
    } catch (II1ill11) {
        $.logErr(II1ill11);
    }
}

async function ii1ilI1I() {
    await lIIIIlI();

    if ($.initForTurntableFarmRes?.["code"] === "0") {
        let {
            timingIntervalHours: I111iIii,
            timingLastSysTime: lI1lIIl,
            sysTime: llI1lII1,
            remainLotteryTimes: lIll1iil,
            turntableInfos: i1IIIlli
        } = $.initForTurntableFarmRes;
        console.log("开始天天抽奖--好友助力--每人每天只有三次助力机会.");

        for (let iiil111 of newShareCodes) {
            if (iiil111 === $.farmInfo?.["farmUserPro"]?.["shareCode"]) {
                console.log("天天抽奖-不能自己给自己助力\n");
                continue;
            }

            await il1lliiI(iiil111);

            if ($.lotteryMasterHelpRes?.["helpResult"]) {
                if ($.lotteryMasterHelpRes?.["helpResult"]?.["code"] === "0") console.log("天天抽奖-助力" + $.lotteryMasterHelpRes?.["helpResult"]?.["masterUserInfo"]?.["nickName"] + "成功\n"); else {
                    if ($.lotteryMasterHelpRes?.["helpResult"]?.["code"] === "11") console.log("天天抽奖-不要重复助力" + $.lotteryMasterHelpRes?.["helpResult"]?.["masterUserInfo"]?.["nickName"] + "\n"); else {
                        if ($.lotteryMasterHelpRes.helpResult.code === "13") {
                            console.log("天天抽奖-助力" + $.lotteryMasterHelpRes?.["helpResult"]?.["masterUserInfo"]?.["nickName"] + "失败,助力次数耗尽\n");
                            break;
                        }
                    }
                }
            }
        }

        console.log("天天抽奖次数共-" + lIll1iil + "次");

        if (lIll1iil > 0) {
            console.log("开始抽奖");
            let ilIiIl11 = "";

            for (let iliii11I = 0; iliii11I < new Array(lIll1iil).fill("").length; iliii11I++) {
                await l1illii();
                console.log("第" + (iliii11I + 1) + "次抽奖结果" + JSON.stringify($.lotteryRes));

                if ($.lotteryRes.code === "0") {
                    i1IIIlli.map(IllI1iii => {
                        if (IllI1iii.type === $.lotteryRes.type) {
                            console.log("lotteryRes.type" + $.lotteryRes?.["type"]);

                            if ($.lotteryRes.type.match(/bean/g) && $.lotteryRes.type.match(/bean/g)[0] === "bean") {
                                ilIiIl11 += IllI1iii.name + "个，";
                            } else $.lotteryRes.type.match(/water/g) && $.lotteryRes.type.match(/water/g)[0] === "water" ? ilIiIl11 += IllI1iii.name + "，" : ilIiIl11 += IllI1iii.name + "，";
                        }
                    });

                    if ($.lotteryRes?.["remainLotteryTimes"] === 0) {
                        break;
                    }
                }
            }

            ilIiIl11 && console.log("【天天抽奖】" + ilIiIl11.substr(0, ilIiIl11.length - 1) + "\n");
        } else console.log("抽奖完成没有次数啦~");
    } else console.log("初始化天天抽奖得好礼失败");
}

async function I1IiliI1() {
    await $.wait(2000);
    await l1ili1();
    let I11llli1 = 0,
        liilii1l = 3,
        i1I1iIii = "";

    if (lllil1iI) {
        console.log("开始助力好友");

        for (let iiIi1li1 of newShareCodes) {
            if (ll1l11II) {
                var il1ii1ii = false;

                for (let lIIIllI of ll1l11II) {
                    if (iiIi1li1 == lIIIllI) {
                        il1ii1ii = true;
                        break;
                    }
                }

                if (il1ii1ii) {
                    console.log(iiIi1li1 + "助力已满，跳过...");
                    continue;
                }
            }

            console.log($.UserName + "开始助力: " + iiIi1li1);
            if (!iiIi1li1) continue;

            if (!$.farmInfo?.["farmUserPro"]) {
                console.log("未种植,跳过助力\n");
                continue;
            }

            if (iiIi1li1 === $.farmInfo?.["farmUserPro"]?.["shareCode"]) {
                console.log("不能为自己助力哦，跳过自己的shareCode\n");
                continue;
            }

            await I11Il1iI(iiIi1li1);

            if ($.helpResult?.["code"] === "0") {
                if ($.helpResult?.["helpResult"]?.["code"] === "0") {
                    I11llli1 += $.helpResult?.["helpResult"]?.["salveHelpAddWater"];
                    console.log("【助力好友结果】: 已成功给【" + $.helpResult?.["helpResult"]?.["masterUserInfo"]?.["nickName"] + "】助力");
                    console.log("给好友【" + $.helpResult?.["helpResult"]?.["masterUserInfo"]?.["nickName"] + "】助力获得" + $.helpResult?.["helpResult"]?.["salveHelpAddWater"] + "g水滴");
                    i1I1iIii += ($.helpResult?.["helpResult"]?.["masterUserInfo"]?.["nickName"] || "匿名用户") + ",";
                } else {
                    if ($.helpResult?.["helpResult"]?.["code"] === "8") console.log("【助力好友结果】: 助力【" + $.helpResult?.["helpResult"]?.["masterUserInfo"]?.["nickName"] + "】失败，您今天助力次数已耗尽"); else {
                        if ($.helpResult?.["helpResult"]?.["code"] === "9") console.log("【助力好友结果】: 之前给【" + $.helpResult?.["helpResult"]?.["masterUserInfo"]?.["nickName"] + "】助力过了"); else $.helpResult?.["helpResult"]?.["code"] === "10" ? (ll1l11II.push(iiIi1li1), console.log("【助力好友结果】: 好友【" + $.helpResult?.["helpResult"]?.["masterUserInfo"]?.["nickName"] + "】助力已满")) : console.log("助力其他情况：" + JSON.stringify($.helpResult?.["helpResult"]));
                    }
                }

                console.log("【今日助力次数还剩】" + $.helpResult?.["helpResult"]?.["remainTimes"] + "次\n");
                liilii1l = $.helpResult?.["helpResult"]?.["remainTimes"];

                if ($.helpResult?.["helpResult"]?.["remainTimes"] === 0) {
                    console.log("您当前助力次数已耗尽，跳出助力");
                    break;
                }
            } else {
                if ($.helpResult?.["code"] == 3) console.log("助力失败: " + $.helpResult?.["code"] + ",未登录"); else {
                    if ($.helpResult?.["code"] == 6) console.log("助力失败: " + $.helpResult?.["code"] + ",活动太火爆"); else $.helpResult?.["code"] == 2 ? console.log("助力失败: " + $.helpResult?.["code"] + "," + $.helpResult?.["echo"]) : console.log("助力失败: " + $.helpResult?.["code"] + "," + $.helpResult?.["message"]);
                }
                ($.helpResult?.["code"] == 402 || $.helpResult?.["code"] == 403) && (await $.wait(parseInt(Math.random() * 2000 + 30000, 10)));
            }
        }
    }

    if ($.isLoon() || $.isQuanX() || $.isSurge()) {
        let lIIiIliI = ii1iliIl() + $.farmInfo?.["farmUserPro"]?.["shareCode"];
        !$.getdata(lIIiIliI) && ($.setdata("", ii1iliIl(Date.now() - 24 * 60 * 60 * 1000) + $.farmInfo?.["farmUserPro"]?.["shareCode"]), $.setdata("", lIIiIliI));

        if (i1I1iIii) {
            if ($.getdata(lIIiIliI)) {
                $.setdata($.getdata(lIIiIliI) + "," + i1I1iIii, lIIiIliI);
            } else $.setdata(i1I1iIii, lIIiIliI);
        }

        i1I1iIii = $.getdata(lIIiIliI);
    }

    if (i1I1iIii && i1I1iIii.length > 0) { }

    I11llli1 > 0 && console.log("【助力好友👬】获得" + I11llli1 + "g💧\n");
    console.log("助力好友结束，即将开始领取额外水滴奖励\n");
}

async function iIIlll1I() {
    try {
        console.log("\n【京东账号" + $.index + "（" + $.UserName + "）的" + $.name + "好友互助码】");
        var lili1Il = false,
            IIiIlill = "";
        if (Iil1lIii) for (let Iili1IIi = 0; Iili1IIi < Iil1lIii.length; Iili1IIi++) {
            Iil1lIii[Iili1IIi].pt_pin == $.UserName && (lili1Il = true, IIiIlill = Iil1lIii[Iili1IIi].ShareCode);
        }

        if (!lili1Il) {
            console.log($.UserName + "该账号无缓存，尝试联网获取互助码.....");
            l1IIl1I = true;
            await l1ili1();

            if ($.farmInfo?.["farmUserPro"]) {
                var i1liIIl1 = {};
                IIiIlill = $.farmInfo?.["farmUserPro"]?.["shareCode"];
                i1liIIl1 = {
                    "pt_pin": $.UserName,
                    "ShareCode": IIiIlill
                };
                Iil1lIii.push(i1liIIl1);
                IiiillI = true;
            }
        }

        IIiIlill ? (console.log("\n" + IIiIlill), newShareCodes.push(IIiIlill)) : console.log("\n数据异常");
    } catch (l1ii111) {
        $.logErr(l1ii111);
    }
}

async function Iiiill1() {
    return new Promise(Ilii1l1l => {
        const l1lIii1 = {
            "type": 2,
            "version": 6,
            "channel": 2
        };
        $.post(i1I1I1Il("getFullCollectionReward", l1lIii1), (IIliIIil, iiiII1II, i11iili1) => {
            try {
                IIliIIil ? (console.log("\n东东农场: API查询请求失败 ‼️‼️"), console.log(JSON.stringify(IIliIIil)), $.logErr(IIliIIil)) : iiIIi11(i11iili1) && ($.duckRes = JSON.parse(i11iili1));
            } catch (iliI1il) {
                $.logErr(iliI1il, iiiII1II);
            } finally {
                Ilii1l1l();
            }
        });
    });
}

async function li1llI1l() {
    $.totalWaterReward = await Ii11iIi1("totalWaterTaskForFarm");
}

async function lIilllII() {
    $.firstWaterReward = await Ii11iIi1("firstWaterTaskForFarm");
}

async function lilli1Il() {
    $.waterFriendGotAwardRes = await Ii11iIi1("waterFriendGotAwardForFarm", {
        "version": 4,
        "channel": 1
    });
}

async function IIii11i1() {
    $.myCardInfoRes = await Ii11iIi1("myCardInfoForFarm", {
        "version": 5,
        "channel": 1
    });
}

async function iI11I1ll(l1iiill1) {
    $.userMyCardRes = await Ii11iIi1("userMyCardForFarm", {
        "cardType": l1iiill1
    });
}

async function I1IIIlI(iIil1I1) {
    $.gotStageAwardForFarmRes = await Ii11iIi1("gotStageAwardForFarm", {
        "type": iIil1I1
    });
}

async function Iiill1li() {
    await $.wait(1000);
    console.log("等待了1秒");
    $.waterResult = await Ii11iIi1("waterGoodForFarm");
}

async function lIIIIlI() {
    $.initForTurntableFarmRes = await Ii11iIi1("initForTurntableFarm", {
        "version": 4,
        "channel": 1
    });
}

async function l1illii() {
    await $.wait(2000);
    console.log("等待了2秒");
    $.lotteryRes = await Ii11iIi1("lotteryForTurntableFarm", {
        "type": 1,
        "version": 4,
        "channel": 1
    });
}

async function iiIIIlii() {
    $.timingAwardRes = await Ii11iIi1("timingAwardForTurntableFarm", {
        "version": 4,
        "channel": 1
    });
}

async function i1llllli(IiIIiIl, iIiillil) {
    IiIIiIl === 1 && console.log("浏览爆品会场");
    IiIIiIl === 2 && console.log("天天抽奖浏览任务领取水滴");
    const Ill1lii = {
        "type": IiIIiIl,
        "adId": iIiillil,
        "version": 4,
        "channel": 1
    };
    $.browserForTurntableFarmRes = await Ii11iIi1("browserForTurntableFarm", Ill1lii);
}

async function il1I1lI(lli1il1) {
    const li11iIii = {
        "type": 2,
        "adId": lli1il1,
        "version": 4,
        "channel": 1
    };
    $.browserForTurntableFarm2Res = await Ii11iIi1("browserForTurntableFarm", li11iIii);
}

async function il1lliiI() {
    $.lotteryMasterHelpRes = await Ii11iIi1("initForFarm", {
        "imageUrl": "",
        "nickName": "",
        "shareCode": arguments[0] + "-3",
        "babelChannel": "3",
        "version": 4,
        "channel": 1
    });
}

async function liiiil() {
    $.masterGotFinished = await Ii11iIi1("masterGotFinishedTaskForFarm");
}

async function Iillllii() {
    $.masterHelpResult = await Ii11iIi1("masterHelpTaskInitForFarm");
}

async function i1iii1i() {
    $.farmAssistResult = await Ii11iIi1("farmAssistInit", {
        "version": 14,
        "channel": 1,
        "babelChannel": "120"
    });
}

async function i1liIlii() {
    $.receiveStageEnergy = await Ii11iIi1("receiveStageEnergy", {
        "version": 14,
        "channel": 1,
        "babelChannel": "120"
    });
}

async function IlIlilIi() {
    $.inviteFriendRes = await Ii11iIi1("initForFarm", {
        "imageUrl": "",
        "nickName": "",
        "shareCode": arguments[0] + "-inviteFriend",
        "version": 4,
        "channel": 2
    });
}

async function I11Il1iI() {
    $.helpResult = await Ii11iIi1("initForFarm", {
        "imageUrl": "",
        "nickName": "",
        "shareCode": arguments[0],
        "babelChannel": "3",
        "version": 2,
        "channel": 1
    });
}

async function Il1IlIIl() {
    const Illi1lii = {
        "type": 1,
        "hongBaoTimes": 100,
        "version": 3
    };
    $.waterRain = await Ii11iIi1("waterRainForFarm", Illi1lii);
}

async function i1l1IlIl() {
    $.clockInInit = await Ii11iIi1("clockInInitForFarm");
}

async function I11l1ll1() {
    $.clockInForFarmRes = await Ii11iIi1("clockInForFarm", {
        "type": 1
    });
}

async function IiIii1li(i1lI1ii1, l11llIII, ilIilll1) {
    let Illl11il = {
        "id": i1lI1ii1,
        "type": l11llIII,
        "step": ilIilll1
    };

    if (l11llIII === "theme") {
        if (ilIilll1 === "1") $.themeStep1 = await Ii11iIi1("clockInFollowForFarm", Illl11il); else ilIilll1 === "2" && ($.themeStep2 = await Ii11iIi1("clockInFollowForFarm", Illl11il));
    } else {
        if (l11llIII === "venderCoupon") {
            if (ilIilll1 === "1") $.venderCouponStep1 = await Ii11iIi1("clockInFollowForFarm", Illl11il); else ilIilll1 === "2" && ($.venderCouponStep2 = await Ii11iIi1("clockInFollowForFarm", Illl11il));
        }
    }
}

async function IIlII1Ii() {
    $.gotClockInGiftRes = await Ii11iIi1("gotClockInGift", {
        "type": 2
    });
}

async function I1Illii1() {
    $.threeMeal = await Ii11iIi1("gotThreeMealForFarm");
}

async function Il1iiI1(lI1III11, i1iI11il) {
    if (i1iI11il === 0) $.browseResult = await Ii11iIi1("browseAdTaskForFarm", {
        "advertId": lI1III11,
        "type": i1iI11il
    }); else i1iI11il === 1 && ($.browseRwardResult = await Ii11iIi1("browseAdTaskForFarm", {
        "advertId": lI1III11,
        "type": i1iI11il
    }));
}

async function ll1li11i() {
    $.goalResult = await Ii11iIi1("gotWaterGoalTaskForFarm", {
        "type": 3
    });
}

async function IIlIiIII() {
    $.signResult = await Ii11iIi1("signForFarm");
}

async function l1ili1() {
    $.farmInfo = await Ii11iIi1("initForFarm", {
        "mpin": "",
        "utm_campaign": "",
        "utm_medium": "appshare",
        "shareCode": "",
        "utm_term": "Wxfriends",
        "utm_source": "iosapp",
        "imageUrl": "",
        "nickName": "",
        "babelChannel": "10",
        "sid": I11Ii1ll,
        "un_area": Il1ll11i,
        "version": 22,
        "lat": l1lIiiIl,
        "lng": ll1Ii1Ii,
        "channel": 1
    });
}

async function iII1l1i() {
    console.log("\n初始化任务列表");
    $.farmTask = await Ii11iIi1("taskInitForFarm", {
        "version": 18,
        "channel": 1,
        "babelChannel": "121"
    });
}

async function lllIlI1i() {
    $.friendList = await Ii11iIi1("friendListInitForFarm", {
        "version": 18,
        "channel": 1,
        "babelChannel": "45"
    });
}

async function III1Ii1I() {
    $.awardInviteFriendRes = await Ii11iIi1("awardInviteFriendForFarm");
}

async function ilIIllI(Ii1l1Ili) {
    const IIIl1iiI = {
        "shareCode": Ii1l1Ili,
        "version": 18,
        "channel": 1,
        "babelChannel": "121"
    };
    $.waterFriendForFarmRes = await Ii11iIi1("waterFriendForFarm", IIIl1iiI);
}

async function ii1iI1l() {
    if ($.isNode() && process.env.FRUIT_NOTIFY_CONTROL) {
        $.ctrTemp = "" + process.env.FRUIT_NOTIFY_CONTROL === "false";
    } else $.getdata("jdFruitNotify") ? $.ctrTemp = $.getdata("jdFruitNotify") === "false" : $.ctrTemp = "" + Iiil1ii === "false";

    $.ctrTemp ? ($.msg($.name, i1iIlili, iliIIil1, ii11lIi1), $.isNode() && (allMessage += i1iIlili + "\n" + iliIIil1 + ($.index !== cookiesArr.length ? "\n\n" : ""))) : $.log("\n" + iliIIil1 + "\n");
}

function ii1iliIl(iIIi1IiI) {
    let iIIli1;
    if (iIIi1IiI) iIIli1 = new Date(iIIi1IiI); else {
        iIIli1 = new Date();
    }
    return iIIli1.getFullYear() + "-" + (iIIli1.getMonth() + 1 >= 10 ? iIIli1.getMonth() + 1 : "0" + (iIIli1.getMonth() + 1)) + "-" + (iIIli1.getDate() >= 10 ? iIIli1.getDate() : "0" + iIIli1.getDate());
}

function lII111il() {
    return new Promise(ll1I1i1I => {
        console.log("开始获取配置文件\n");
        notify = $.isNode() ? require("./sendNotify") : "";
        const lilliill = $.isNode() ? require("./jdCookie.js") : "";

        if ($.isNode()) {
            Object.keys(lilliill).forEach(lIIiliIl => {
                lilliill[lIIiliIl] && cookiesArr.push(lilliill[lIIiliIl]);
            });
            if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") console.log = () => { };
        } else cookiesArr = [$.getdata("CookieJD"), $.getdata("CookieJD2"), ...IIi1I1iI($.getdata("CookiesJD") || "[]").map(I1liIiI => I1liIiI.cookie)].filter(il1IIi11 => !!il1IIi11);

        console.log("共" + cookiesArr.length + "个京东账号\n");
        $.shareCodesArr = [];
        ll1I1i1I();
    });
}

function Ii11iIi1(IiliiI11, IlI11lll = {}, lliI1iil = 10000) {
    return new Promise(il1i1ilI => {
        setTimeout(async () => {
            $.post(await i1I1I1Il(IiliiI11, IlI11lll), (liIlI1l1, IIi1IiIi, i11ilIli) => {
                try {
                    if (liIlI1l1) console.log("\n东东农场: API查询请求失败 ‼️‼️"), console.log(JSON.stringify(liIlI1l1)), console.log("function_id:" + IiliiI11), $.logErr(liIlI1l1); else {
                        iiIIi11(i11ilIli) && (i11ilIli = JSON.parse(i11ilIli));
                    }
                } catch (illlIl1I) {
                    $.logErr(illlIl1I, IIi1IiIi);
                } finally {
                    il1i1ilI(i11ilIli);
                }
            });
        }, lliI1iil);
    });
}

function iiIIi11(i1I1llI1) {
    if (!i1I1llI1) return console.log("京东服务器返回数据为空"), false;

    try {
        if (typeof JSON.parse(i1I1llI1) == "object") {
            return true;
        }
    } catch (llIl11il) {
        return console.log(llIl11il), false;
    }
}

const l1Iii = {
    "initForFarm": "8a2af",
    "taskInitForFarm": "fcb5a",
    "browseAdTaskForFarm": "53f09",
    "firstWaterTaskForFarm": "0cf1e",
    "waterFriendGotAwardForFarm": "d08ff",
    "ddnc_getTreasureBoxAward": "67dfc",
    "totalWaterTaskForFarm": "102f5",
    "gotThreeMealForFarm": "57b30",
    "waterGoodForFarm": "0c010",
    "choiceGoodsForFarm": "5f4ca",
    "gotCouponForFarm": "b1515",
    "gotStageAwardForFarm": "81591",
    "followVenderForBrand": "71547",
    "gotWaterGoalTaskForFarm": "c901b",
    "gotNewUserTaskForFarm": "de8f8",
    "orderTaskGotWaterForFarm": "eed5c",
    "clockInForFarm": "32b94",
    "clockInFollowForFarm": "4a0b4",
    "waterFriendForFarm": "673a0",
    "awardFirstFriendForFarm": "9b655",
    "awardInviteFriendForFarm": "2b5ca",
    "awardCallOrInviteFriendForFarm": "b0b03",
    "userMyCardForFarm": "86ba5",
    "getCallUserCardForFarm": "2ca57",
    "deleteFriendForFarm": "eaf91",
    "gotLowFreqWaterForFarm": "8172b",
    "getFullCollectionReward": "5c767",
    "getOrderPayLotteryWater": "ef089",
    "receiveStageEnergy": "15507",
    "exchangeGood": "52963",
    "farmAssistInit": "92354",
    "myCardInfoForFarm": "157b6",
    "gotPopFirstPurchaseTaskForFarm": "d432f",
    "limitWaterInitForFarm": "6bdc2",
    "ddnc_surpriseModal": "e81c1",
    "friendInitForFarm": "a5a9c",
    "clockInInitForFarm": "08dc3",
    "guideTaskAward": "59bc4"
};

async function i1I1I1Il(l111lIIl, i1l111l = {}) {
    let ll1iiIl1 = "";
    if (!l1Iii[l111lIIl]) ll1iiIl1 = "https://api.m.jd.com/client.action?functionId=" + l111lIIl + "&body=" + encodeURIComponent(JSON.stringify(i1l111l)) + "&appid=wh5", console.log(ll1iiIl1); else {
        const IIl1I1i1 = {
            "appid": "signed_wh5",
            "client": "iOS",
            "clientVersion": "10.1.0",
            "functionId": l111lIIl,
            "body": i1l111l
        },
            i1lIIlI1 = await Ii1ili1I(l1Iii[l111lIIl], IIl1I1i1);
        ll1iiIl1 = "https://api.m.jd.com/client.action?" + i1lIIlI1;
    }
    return {
        "url": ll1iiIl1,
        "headers": {
            "Host": "api.m.jd.com",
            "Accept": "*/*",
            "Origin": "https://carry.m.jd.com",
            "Accept-Encoding": "gzip,deflate,br",
            "User-Agent": $.UA,
            "Accept-Language": "zh-CN,zh-Hans;q=0.9",
            "Referer": "https://carry.m.jd.com/",
            "x-requested-with": "com.jingdong.app.mall",
            "Cookie": cookie
        },
        "timeout": 30000
    };
}

async function Ii1ili1I(liill111, i1IIii11) {
    try {
        let ll111Il = new I1l1ilii({
            "appId": liill111,
            "appid": "signed_wh5",
            "clientVersion": i1IIii11?.["clientVersion"],
            "client": i1IIii11?.["client"],
            "pin": $.UserName,
            "ua": $.UA,
            "version": "4.1"
        });
        return await ll111Il.genAlgo(), body = await ll111Il.genUrlParams(i1IIii11.functionId, i1IIii11.body), body;
    } catch (lII1i1II) { }
}

async function i1il1ii(lIli1l1I, IilllllI) {
    let IiIi1iIl = {
        "searchParams": {
            ...IilllllI,
            "appId": lIli1l1I
        },
        "pt_pin": $.UserName,
        "client": IilllllI?.["client"],
        "clientVersion": IilllllI?.["clientVersion"]
    },
        ii1111l1 = {
            "Content-Type": "application/json",
            "User-Agent": $.UA
        },
        illlilii = {
            "url": "http://h5st.kingran.cf/api/h5st",
            "body": JSON.stringify(IiIi1iIl),
            "headers": ii1111l1,
            "timeout": 30000
        };
    return new Promise(async lII1ilii => {
        $.post(illlilii, (IillllIi, Ill11lil, Ii1lIIII) => {
            let i11I11li = "";

            try {
                if (IillllIi) console.log($.name + " getH5st API请求失败，请检查网路重试"); else {
                    Ii1lIIII = JSON.parse(Ii1lIIII);
                    console.log(JSON.stringify(Ii1lIIII));

                    if (typeof Ii1lIIII === "object" && Ii1lIIII && Ii1lIIII.body) {
                        if (Ii1lIIII.body) i11I11li = Ii1lIIII || "";
                    } else Ii1lIIII.code == 400 ? console.log("\n" + Ii1lIIII.msg) : console.log("\n可能连接不上接口，请检查网络");
                }
            } catch (IlIIIIii) {
                $.logErr(IlIIIIii, Ill11lil);
            } finally {
                lII1ilii(lI1I1iil(i11I11li));
            }
        });
    });
}

function lI1I1iil(lIIi1II1, IIIiIlli = {}) {
    let i1i11li = [],
        IIiIiI1i = IIIiIlli.connector || "&",
        ll1llIil = Object.keys(lIIi1II1);
    if (IIIiIlli.sort) ll1llIil = ll1llIil.sort();

    for (let Ii1lIilI of ll1llIil) {
        let Ii1i1i1I = lIIi1II1[Ii1lIilI];
        if (Ii1i1i1I && typeof Ii1i1i1I === "object") Ii1i1i1I = JSON.stringify(Ii1i1i1I);
        if (Ii1i1i1I && IIIiIlli.encode) Ii1i1i1I = encodeURIComponent(Ii1i1i1I);
        i1i11li.push(Ii1lIilI + "=" + Ii1i1i1I);
    }

    return i1i11li.join(IIiIiI1i);
}

function i111l11(l1I1iIl, iiI1Iiil = "qwertyuiopasdfghjklzxcvbnm") {
    let lli11iI = "";

    for (let ilIii11 = 0; ilIii11 < l1I1iIl; ilIii11++) {
        lli11iI += iiI1Iiil[Math.floor(Math.random() * iiI1Iiil.length)];
    }

    return lli11iI;
}

function IIi1I1iI(lIi1i1I1) {
    if (typeof lIi1i1I1 == "string") try {
        return JSON.parse(lIi1i1I1);
    } catch (IIIIili) {
        return console.log(IIIIili), $.msg($.name, "", "请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie"), [];
    }
}
// prettier-ignore
function Env(t, e) { "undefined" != typeof process && JSON.stringify(process.env).indexOf("GITHUB") > -1 && process.exit(0); class s { constructor(t) { this.env = t } send(t, e = "GET") { t = "string" == typeof t ? { url: t } : t; let s = this.get; return "POST" === e && (s = this.post), new Promise((e, i) => { s.call(this, t, (t, s, r) => { t ? i(t) : e(s) }) }) } get(t) { return this.send.call(this.env, t) } post(t) { return this.send.call(this.env, t, "POST") } } return new class { constructor(t, e) { this.name = t, this.http = new s(this), this.data = null, this.dataFile = "box.dat", this.logs = [], this.isMute = !1, this.isNeedRewrite = !1, this.logSeparator = "\n", this.startTime = (new Date).getTime(), Object.assign(this, e), this.log("", `🔔${this.name}, 开始!`) } isNode() { return "undefined" != typeof module && !!module.exports } isQuanX() { return "undefined" != typeof $task } isSurge() { return "undefined" != typeof $httpClient && "undefined" == typeof $loon } isLoon() { return "undefined" != typeof $loon } toObj(t, e = null) { try { return JSON.parse(t) } catch { return e } } toStr(t, e = null) { try { return JSON.stringify(t) } catch { return e } } getjson(t, e) { let s = e; const i = this.getdata(t); if (i) try { s = JSON.parse(this.getdata(t)) } catch { } return s } setjson(t, e) { try { return this.setdata(JSON.stringify(t), e) } catch { return !1 } } getScript(t) { return new Promise(e => { this.get({ url: t }, (t, s, i) => e(i)) }) } runScript(t, e) { return new Promise(s => { let i = this.getdata("@chavy_boxjs_userCfgs.httpapi"); i = i ? i.replace(/\n/g, "").trim() : i; let r = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout"); r = r ? 1 * r : 20, r = e && e.timeout ? e.timeout : r; const [o, h] = i.split("@"), n = { url: `http://${h}/v1/scripting/evaluate`, body: { script_text: t, mock_type: "cron", timeout: r }, headers: { "X-Key": o, Accept: "*/*" } }; this.post(n, (t, e, i) => s(i)) }).catch(t => this.logErr(t)) } loaddata() { if (!this.isNode()) return {}; { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e); if (!s && !i) return {}; { const i = s ? t : e; try { return JSON.parse(this.fs.readFileSync(i)) } catch (t) { return {} } } } } writedata() { if (this.isNode()) { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e), r = JSON.stringify(this.data); s ? this.fs.writeFileSync(t, r) : i ? this.fs.writeFileSync(e, r) : this.fs.writeFileSync(t, r) } } lodash_get(t, e, s) { const i = e.replace(/\[(\d+)\]/g, ".$1").split("."); let r = t; for (const t of i) if (r = Object(r)[t], void 0 === r) return s; return r } lodash_set(t, e, s) { return Object(t) !== t ? t : (Array.isArray(e) || (e = e.toString().match(/[^.[\]]+/g) || []), e.slice(0, -1).reduce((t, s, i) => Object(t[s]) === t[s] ? t[s] : t[s] = Math.abs(e[i + 1]) >> 0 == +e[i + 1] ? [] : {}, t)[e[e.length - 1]] = s, t) } getdata(t) { let e = this.getval(t); if (/^@/.test(t)) { const [, s, i] = /^@(.*?)\.(.*?)$/.exec(t), r = s ? this.getval(s) : ""; if (r) try { const t = JSON.parse(r); e = t ? this.lodash_get(t, i, "") : e } catch (t) { e = "" } } return e } setdata(t, e) { let s = !1; if (/^@/.test(e)) { const [, i, r] = /^@(.*?)\.(.*?)$/.exec(e), o = this.getval(i), h = i ? "null" === o ? null : o || "{}" : "{}"; try { const e = JSON.parse(h); this.lodash_set(e, r, t), s = this.setval(JSON.stringify(e), i) } catch (e) { const o = {}; this.lodash_set(o, r, t), s = this.setval(JSON.stringify(o), i) } } else s = this.setval(t, e); return s } getval(t) { return this.isSurge() || this.isLoon() ? $persistentStore.read(t) : this.isQuanX() ? $prefs.valueForKey(t) : this.isNode() ? (this.data = this.loaddata(), this.data[t]) : this.data && this.data[t] || null } setval(t, e) { return this.isSurge() || this.isLoon() ? $persistentStore.write(t, e) : this.isQuanX() ? $prefs.setValueForKey(t, e) : this.isNode() ? (this.data = this.loaddata(), this.data[e] = t, this.writedata(), !0) : this.data && this.data[e] || null } initGotEnv(t) { this.got = this.got ? this.got : require("got"), this.cktough = this.cktough ? this.cktough : require("tough-cookie"), this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar, t && (t.headers = t.headers ? t.headers : {}, void 0 === t.headers.Cookie && void 0 === t.cookieJar && (t.cookieJar = this.ckjar)) } get(t, e = (() => { })) { t.headers && (delete t.headers["Content-Type"], delete t.headers["Content-Length"]), this.isSurge() || this.isLoon() ? (this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.get(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) })) : this.isQuanX() ? (this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t))) : this.isNode() && (this.initGotEnv(t), this.got(t).on("redirect", (t, e) => { try { if (t.headers["set-cookie"]) { const s = t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString(); s && this.ckjar.setCookieSync(s, null), e.cookieJar = this.ckjar } } catch (t) { this.logErr(t) } }).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) })) } post(t, e = (() => { })) { if (t.body && t.headers && !t.headers["Content-Type"] && (t.headers["Content-Type"] = "application/x-www-form-urlencoded"), t.headers && delete t.headers["Content-Length"], this.isSurge() || this.isLoon()) this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.post(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) }); else if (this.isQuanX()) t.method = "POST", this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t)); else if (this.isNode()) { this.initGotEnv(t); const { url: s, ...i } = t; this.got.post(s, i).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) }) } } time(t, e = null) { const s = e ? new Date(e) : new Date; let i = { "M+": s.getMonth() + 1, "d+": s.getDate(), "H+": s.getHours(), "m+": s.getMinutes(), "s+": s.getSeconds(), "q+": Math.floor((s.getMonth() + 3) / 3), S: s.getMilliseconds() }; /(y+)/.test(t) && (t = t.replace(RegExp.$1, (s.getFullYear() + "").substr(4 - RegExp.$1.length))); for (let e in i) new RegExp("(" + e + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? i[e] : ("00" + i[e]).substr(("" + i[e]).length))); return t } msg(e = t, s = "", i = "", r) { const o = t => { if (!t) return t; if ("string" == typeof t) return this.isLoon() ? t : this.isQuanX() ? { "open-url": t } : this.isSurge() ? { url: t } : void 0; if ("object" == typeof t) { if (this.isLoon()) { let e = t.openUrl || t.url || t["open-url"], s = t.mediaUrl || t["media-url"]; return { openUrl: e, mediaUrl: s } } if (this.isQuanX()) { let e = t["open-url"] || t.url || t.openUrl, s = t["media-url"] || t.mediaUrl; return { "open-url": e, "media-url": s } } if (this.isSurge()) { let e = t.url || t.openUrl || t["open-url"]; return { url: e } } } }; if (this.isMute || (this.isSurge() || this.isLoon() ? $notification.post(e, s, i, o(r)) : this.isQuanX() && $notify(e, s, i, o(r))), !this.isMuteLog) { let t = ["", "==============📣系统通知📣=============="]; t.push(e), s && t.push(s), i && t.push(i), console.log(t.join("\n")), this.logs = this.logs.concat(t) } } log(...t) { t.length > 0 && (this.logs = [...this.logs, ...t]), console.log(t.join(this.logSeparator)) } logErr(t, e) { const s = !this.isSurge() && !this.isQuanX() && !this.isLoon(); s ? this.log("", `❗️${this.name}, 错误!`, t.stack) : this.log("", `❗️${this.name}, 错误!`, t) } wait(t) { return new Promise(e => setTimeout(e, t)) } done(t = {}) { const e = (new Date).getTime(), s = (e - this.startTime) / 1e3; this.log("", `🔔${this.name}, 结束! 🕛 ${s} 秒`), this.log(), (this.isSurge() || this.isQuanX() || this.isLoon()) && $done(t) } }(t, e) }
