/*
东东农场助力
20 2,6,11 * * * jd_farm_help.js
updatetime:2023/8/29
变量
epxort FRUIT_DELAY = '1000',设置等待时间(毫秒)，默认请求5次接口等待5秒（5000）
export FRUITCODES = 'xxx&xxx' 指定助力码助力，多个用&分割，不指定则自动搜集任务助力码
*/

let shareCodes = [ // 这个列表填入你要助力的好友的shareCode
    //     //账号一的好友shareCode,不同好友的shareCode中间用@符号隔开
    '47185c0af3b04054a6eba856fa5f974d@9e195230d84e405cb0b5d449555b2b6b@f418bcd262c14b8fb221afe628bcc2a6@3aada576c8e749a988b483c560e5d4ab@46f8cdd7d0894ccaa3a387858b9c8eb2@e508c2ca55df409081d85c91dd7f6865@c6952a52386c4c538bb4bbd69d14e085@c13f2881124147b0bad0f091bb7251e8@ed9ca6042879426a8960f69d1dcfa089@b4fbe5bd8e084623a6db55868446d454@74c481e14b7b49aabc114fbb5962b9e1@b2969919ef9a4eb080791cd2d618367b@fd754ccbbc2c4164886499428af3f74f@76493dd9bfff40feaec780845e53164d@b1bcdbac8745452e8eddd1c561592d38@934ebb1a50c744f690e140d223d916bd@6580ebacf440487b8ef1d30b3fffb440@c9237c0d6903480090d8007342fafb92@1e181ac6c2144cbfb5a528950d7a6830@48827603cc774e45b56829a278ee4153 @53261f1b5bff40cc999615c395c003ed @8f877af213824ab9b4b6a7b3f6828849@48b22af8b4eb47ebb5dabb2df26bd80a@84c64905fdc741c9a568a3c751a7b039@ad3a83b8e88c448abfd3d7296ca45ede@7b7e147cc40a42eea3435b5904dc5e33@lNQiuJmGisgIjiQFolfnLw==@63bf1fbcbaf2431c99b9e668df6a09b8@ccba7c5b9ab640c891a70b4d15f2cf02@76493dd9bfff40feaec780845e53164d@fd62dcddf0f74872b3506eb1e4151e9c@372105e99b2c4664a02e37618610db07@5a2dc86d4c5a4c0fb882ddb9384312aa@8f9670a3958244e3b363080cdca4a517@59f63315cd0a444f93a3d81c9d3b6784@d2487f8bc9a14f53a78af1c734a11391@efab9f1398d14197b5960a377af7a0a0@8efdacaef57d4d1991f4937769b7e629@6a4db36dfe0140db90cb4309d9d59cd1@8bf296436105415ab1f15a8c9cb654dd@@d63922e3626d4d4d9fce5dcad980a3e6@1e181ac6c2144cbfb5a528950d7a6830',
    //     //账号二的好友shareCode,不同好友的shareCode中间用@符号隔开
     '47185c0af3b04054a6eba856fa5f974d@9e195230d84e405cb0b5d449555b2b6b@f418bcd262c14b8fb221afe628bcc2a6@3aada576c8e749a988b483c560e5d4ab@46f8cdd7d0894ccaa3a387858b9c8eb2@e508c2ca55df409081d85c91dd7f6865@c6952a52386c4c538bb4bbd69d14e085@c13f2881124147b0bad0f091bb7251e8@ed9ca6042879426a8960f69d1dcfa089@b4fbe5bd8e084623a6db55868446d454@74c481e14b7b49aabc114fbb5962b9e1@b2969919ef9a4eb080791cd2d618367b@fd754ccbbc2c4164886499428af3f74f@76493dd9bfff40feaec780845e53164d@b1bcdbac8745452e8eddd1c561592d38@934ebb1a50c744f690e140d223d916bd@6580ebacf440487b8ef1d30b3fffb440@c9237c0d6903480090d8007342fafb92@1e181ac6c2144cbfb5a528950d7a6830@48827603cc774e45b56829a278ee4153 @53261f1b5bff40cc999615c395c003ed @8f877af213824ab9b4b6a7b3f6828849@48b22af8b4eb47ebb5dabb2df26bd80a@84c64905fdc741c9a568a3c751a7b039@ad3a83b8e88c448abfd3d7296ca45ede@7b7e147cc40a42eea3435b5904dc5e33@lNQiuJmGisgIjiQFolfnLw==@63bf1fbcbaf2431c99b9e668df6a09b8@ccba7c5b9ab640c891a70b4d15f2cf02@76493dd9bfff40feaec780845e53164d@fd62dcddf0f74872b3506eb1e4151e9c@372105e99b2c4664a02e37618610db07@5a2dc86d4c5a4c0fb882ddb9384312aa@8f9670a3958244e3b363080cdca4a517@59f63315cd0a444f93a3d81c9d3b6784@d2487f8bc9a14f53a78af1c734a11391@efab9f1398d14197b5960a377af7a0a0@8efdacaef57d4d1991f4937769b7e629@6a4db36dfe0140db90cb4309d9d59cd1@8bf296436105415ab1f15a8c9cb654dd@@d63922e3626d4d4d9fce5dcad980a3e6@1e181ac6c2144cbfb5a528950d7a6830',	'47185c0af3b04054a6eba856fa5f974d@9e195230d84e405cb0b5d449555b2b6b@f418bcd262c14b8fb221afe628bcc2a6@3aada576c8e749a988b483c560e5d4ab@46f8cdd7d0894ccaa3a387858b9c8eb2@e508c2ca55df409081d85c91dd7f6865@c6952a52386c4c538bb4bbd69d14e085@c13f2881124147b0bad0f091bb7251e8@ed9ca6042879426a8960f69d1dcfa089@b4fbe5bd8e084623a6db55868446d454@74c481e14b7b49aabc114fbb5962b9e1@b2969919ef9a4eb080791cd2d618367b@fd754ccbbc2c4164886499428af3f74f@76493dd9bfff40feaec780845e53164d@b1bcdbac8745452e8eddd1c561592d38@934ebb1a50c744f690e140d223d916bd@6580ebacf440487b8ef1d30b3fffb440@c9237c0d6903480090d8007342fafb92@1e181ac6c2144cbfb5a528950d7a6830@48827603cc774e45b56829a278ee4153 @53261f1b5bff40cc999615c395c003ed @8f877af213824ab9b4b6a7b3f6828849@48b22af8b4eb47ebb5dabb2df26bd80a@84c64905fdc741c9a568a3c751a7b039@ad3a83b8e88c448abfd3d7296ca45ede@7b7e147cc40a42eea3435b5904dc5e33@lNQiuJmGisgIjiQFolfnLw==@63bf1fbcbaf2431c99b9e668df6a09b8@ccba7c5b9ab640c891a70b4d15f2cf02@76493dd9bfff40feaec780845e53164d@fd62dcddf0f74872b3506eb1e4151e9c@372105e99b2c4664a02e37618610db07@5a2dc86d4c5a4c0fb882ddb9384312aa@8f9670a3958244e3b363080cdca4a517@59f63315cd0a444f93a3d81c9d3b6784@d2487f8bc9a14f53a78af1c734a11391@efab9f1398d14197b5960a377af7a0a0@8efdacaef57d4d1991f4937769b7e629@6a4db36dfe0140db90cb4309d9d59cd1@8bf296436105415ab1f15a8c9cb654dd@@d63922e3626d4d4d9fce5dcad980a3e6@1e181ac6c2144cbfb5a528950d7a6830'
]
const $ = new Env('东东农场-助力');
const _0x5f06ba = require("fs"),
    _0x326e10 = "https://api.m.jd.com/client.action",
    _0x3b79fe = process.env.FRUIT_DELAY ? process.env.FRUIT_DELAY * 1 : 5000,
    _0x3e362f = require("./function/dylany");

$.reqnum = 1;
!(async () => {
    await _0x2663f9();

    if (newShareCodes.length == 0) {
        $.log("没有助力码,请变量FRUITCODES指定或执行农场任务自动收集助力码");
        return;
    }

    if (!cookiesArr[0]) {
        $.msg($.name, "【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取", "https://bean.m.jd.com/bean/signIndex.action", {
            "open-url": "https://bean.m.jd.com/bean/signIndex.action"
        });
        return;
    }

    for (let _0x52c62a = 0; _0x52c62a < cookiesArr.length; _0x52c62a++) {
        if (cookiesArr[_0x52c62a]) {
            cookie = cookiesArr[_0x52c62a];
            $.UserName = decodeURIComponent(cookie.match(/pt_pin=([^; ]+)(?=;?)/) && cookie.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
            $.index = _0x52c62a + 1;
            $.isLogin = true;
            $.nickName = "";
            await _0x3aea37();
            console.log("\n开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "\n");

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
            $.UA = require("./USER_AGENTS").UARAM();
            await _0x1c59da();
            await _0x2203a3();
            await $.wait(2000);
        }
    }
})().catch(_0x23c51d => {
    $.log("", "❌ " + $.name + ", 失败! 原因: " + _0x23c51d + "!", "");
}).finally(() => {
    $.done();
});

async function _0x2203a3() {
    subTitle = "【京东账号" + $.index + "🆔】" + ($.nickName || $.UserName);

    try {
        await _0x13df3d("", 1);
        if ($.farmInfo.farmUserPro) await _0x192cd5(), await _0x1c2d15(); else JSON.stringify($.farmInfo).includes("winTexts") ? (console.log("初始化农场数据异常, 请确认此账号是否开通农场"), message = "【数据异常】请确认此账号是否开通农场\n") : (console.log("初始化农场数据异常, 请登录京东 app查看农场0元水果功能是否正常,农场初始化数据: " + JSON.stringify($.farmInfo)), message = "【数据异常】请手动登录京东app查看此账号" + $.name + "是否正常");
    } catch (_0x4ce8eb) {
        console.log("任务执行异常，请检查执行日志 ‼️‼️");
        $.logErr(_0x4ce8eb);
    }

    await _0x27fa89();
}

async function _0x1c2d15() {
    await _0x1865e7();
    await _0xd97c3f();
}

async function _0xd97c3f() {
    console.log("\n开始天天抽奖助力...");

    for (let _0x124f1c of newShareCodes) {
        if (_0x124f1c === $.farmInfo.farmUserPro.shareCode) {
            console.log("跳过自己\n");
            continue;
        }

        await _0x974ff2(_0x124f1c);
        await $.wait(1000);
        if ($.lotteryMasterHelpRes.helpResult === undefined) break;

        if ($.lotteryMasterHelpRes.helpResult.code === "0") {
            console.log("助力" + $.lotteryMasterHelpRes.helpResult.masterUserInfo.nickName + "成功\n");
        } else {
            if ($.lotteryMasterHelpRes.helpResult.code === "11") {
                console.log("不要重复助力" + $.lotteryMasterHelpRes.helpResult.masterUserInfo.nickName + "\n");
            } else {
                if ($.lotteryMasterHelpRes.helpResult.code === "13") {
                    console.log("助力" + $.lotteryMasterHelpRes.helpResult.masterUserInfo.nickName + "失败,助力次数耗尽\n");
                    break;
                }
            }
        }
    }
}

async function _0x192cd5() {
    console.log("\n开始助力好友...");
    let _0x19414f = 0,
        _0x4896e4 = 3,
        _0xabd229 = "";

    for (let _0x3226d5 of newShareCodes) {
        console.log("去助力: " + _0x3226d5);
        if (!_0x3226d5) continue;

        if (_0x3226d5 === $.farmInfo.farmUserPro.shareCode) {
            console.log("不能为自己助力哦，跳过\n");
            continue;
        }

        await _0x3028cb(_0x3226d5);
        await $.wait(2000);

        if ($.helpResult.code === "0") {
            if ($.helpResult.helpResult.code === "0") _0x19414f += $.helpResult.helpResult.salveHelpAddWater, console.log("【助力结果】: 助力成功"), console.log("助力获得" + $.helpResult.helpResult.salveHelpAddWater + "g水滴"), _0xabd229 += ($.helpResult.helpResult.masterUserInfo.nickName || "匿名用户") + ","; else {
                if ($.helpResult.helpResult.code === "8") console.log("【助力结果】: 助力失败，今天助力次数已耗尽"); else {
                    if ($.helpResult.helpResult.code === "9") console.log("【助力结果】: 已经助力过TA了"); else $.helpResult.helpResult.code === "10" ? (console.log("【助力结果】: 对方已满助力"), fulled.push(_0x3226d5)) : console.log("助力其他情况：" + JSON.stringify($.helpResult.helpResult));
                }
            }
            console.log("【助力次数还剩】" + $.helpResult.helpResult.remainTimes + "次\n");
            _0x4896e4 = $.helpResult.helpResult.remainTimes;

            if ($.helpResult.helpResult.remainTimes === 0) {
                console.log("您当前助力次数已耗尽，跳出助力");
                break;
            }
        } else {
            console.log("助力失败::" + JSON.stringify($.helpResult));
        }
    }

    if ($.isLoon() || $.isQuanX() || $.isSurge()) {
        let _0x37c1c1 = _0x4bd5dd() + $.farmInfo.farmUserPro.shareCode;

        !$.getdata(_0x37c1c1) && ($.setdata("", _0x4bd5dd(Date.now() - 24 * 60 * 60 * 1000) + $.farmInfo.farmUserPro.shareCode), $.setdata("", _0x37c1c1));
        _0xabd229 && ($.getdata(_0x37c1c1) ? $.setdata($.getdata(_0x37c1c1) + "," + _0xabd229, _0x37c1c1) : $.setdata(_0xabd229, _0x37c1c1));
        _0xabd229 = $.getdata(_0x37c1c1);
    }

    _0x19414f > 0 && console.log("【助力好友👬】获得" + _0x19414f + "g💧\n");
    message += "【今日剩余助力👬】" + _0x4896e4 + "次\n";
    console.log("助力好友结束，即将开始领取额外水滴奖励\n");
}

async function _0x1865e7() {
    await _0x3c2662();
    $.friendList ? (console.log("\n今日已邀请好友" + $.friendList.inviteFriendCount + "个 / 每日邀请上限" + $.friendList.inviteFriendMax + "个"), await _0x42cbc0(), $.friendList.inviteFriendCount > 0 ? $.friendList.inviteFriendCount > $.friendList.inviteFriendGotAwardCount && (console.log("开始领取邀请好友的奖励"), await _0x2d395d(), console.log("领取邀请好友的奖励结果：：" + JSON.stringify($.awardInviteFriendRes))) : console.log("今日未邀请过好友")) : console.log("查询好友列表失败\n");
}

async function _0x42cbc0() {
    for (let _0x47bc07 of newShareCodes) {
        if (_0x47bc07 === $.farmInfo.farmUserPro.shareCode) {
            console.log("自己不能邀请自己成为好友噢\n");
            continue;
        }

        if (newShareCodes.findIndex(_0x124ac4 => _0x124ac4 === _0x47bc07) >= 5) break;
        await _0x378b39(_0x47bc07);
        if ($.inviteFriendRes && $.inviteFriendRes.helpResult && $.inviteFriendRes.helpResult.code === "0") console.log("接收邀请成为好友结果成功,您已成为" + $.inviteFriendRes.helpResult.masterUserInfo.nickName + "的好友"); else $.inviteFriendRes && $.inviteFriendRes.helpResult && $.inviteFriendRes.helpResult.code === "17" && console.log("接收邀请成为好友结果失败,对方已是您的好友");
    }
}

async function _0x974ff2() {
    $.lotteryMasterHelpRes = await _0x13df3d({
        "imageUrl": "",
        "nickName": "",
        "shareCode": arguments[0] + "-3",
        "babelChannel": "3",
        "version": 24,
        "channel": 1
    });
}

async function _0x378b39() {
    $.inviteFriendRes = await _0x13df3d({
        "imageUrl": "",
        "nickName": "",
        "shareCode": arguments[0] + "-inviteFriend",
        "version": 24,
        "channel": 2
    });
}

async function _0x3028cb() {
    for (let _0x4c7751 of Array(3)) {
        $.helpResult = await _0x13df3d({
            "sid": "",
            "mpin": "",
            "shareCode": arguments[0],
            "babelChannel": "121",
            "version": 24,
            "channel": 1,
            "lat": "0",
            "lng": "0"
        });
        if ($.helpResult.code == "0") break;
        await $.wait(2000);
    }
}

async function _0x13df3d(_0x363d04, _0x260f87, _0x4f0963 = 1000) {
    $.reqnum % 5 == 0 && (console.log("\n等待" + _0x3b79fe / 1000 + "秒......\n"), _0x4f0963 = _0x3b79fe);
    $.reqnum++;
    if (ct > "1") return;
    if (!_0x363d04) _0x363d04 = {
        "babelChannel": "121",
        "sid": "",
        "un_area": "",
        "version": 24,
        "channel": 1,
        "lat": "",
        "lng": ""
    };

    let _0x557746 = {
        "appId": "8a2af",
        "fn": "initForFarm",
        "body": _0x363d04,
        "apid": "signed_wh5",
        "ver": $.UA.split(";")[2],
        "cl": "ios",
        "user": $.UserName,
        "code": 1,
        "ua": $.UA
    },
        _0x2ed255 = await _0x3e362f.getbody(_0x557746);

    return new Promise(_0xcfc7a7 => {
        const _0x35a50d = {
            "url": "https://api.m.jd.com/client.action?functionId=initForFarm&" + _0x2ed255,
            "headers": {
                "cookie": cookie,
                "origin": "https://carry.m.jd.com",
                "referer": "https://carry.m.jd.com/",
                "User-Agent": $.UA
            },
            "timeout": 10000
        };
        setTimeout(() => {
            $.get(_0x35a50d, async (_0x56f7d1, _0x2fbcfa, _0x5575ff) => {
                try {
                    if (_0x56f7d1) console.log("initForFarm: 请求失败 ‼️‼️"), console.log(JSON.stringify(_0x56f7d1)); else {
                        if (_0x5406e1(_0x5575ff)) {
                            _0x5575ff = JSON.parse(_0x5575ff);

                            if (_0x5575ff.code != "0") { }

                            _0x260f87 && ($.farmInfo = _0x5575ff);
                        }
                    }
                } catch (_0x4c3c81) {
                    $.logErr(_0x4c3c81, _0x2fbcfa);
                } finally {
                    _0xcfc7a7(_0x5575ff);
                }
            });
        }, _0x4f0963);
    });
}

async function _0x3c2662() {
    $.friendList = await _0x1bae39("friendListInitForFarm", {
        "version": 4,
        "channel": 1
    });
}

async function _0x2d395d() {
    $.awardInviteFriendRes = await _0x1bae39("awardInviteFriendForFarm");
}

async function _0x27fa89() {
    if ($.isNode() && process.env.FRUIT_NOTIFY_CONTROL) {
        $.ctrTemp = "" + process.env.FRUIT_NOTIFY_CONTROL === "false";
    } else $.getdata("jdFruitNotify") ? $.ctrTemp = $.getdata("jdFruitNotify") === "false" : $.ctrTemp = "" + jdNotify === "false";

    if ($.ctrTemp) {
        $.msg($.name, subTitle, message, option);
        $.isNode() && (allMessage += subTitle + "\n" + message + ($.index !== cookiesArr.length ? "\n\n" : ""));
    } else $.log("\n" + message + "\n");
}

function _0x4bd5dd(_0x2239b9) {
    let _0x745550;

    return _0x2239b9 ? _0x745550 = new Date(_0x2239b9) : _0x745550 = new Date(), _0x745550.getFullYear() + "-" + (_0x745550.getMonth() + 1 >= 10 ? _0x745550.getMonth() + 1 : "0" + (_0x745550.getMonth() + 1)) + "-" + (_0x745550.getDate() >= 10 ? _0x745550.getDate() : "0" + _0x745550.getDate());
}

function _0x1c59da() {
    return new Promise(async _0x58a8ee => {
        newShareCodes = newShareCodes.filter(_0x8fcff7 => fulled.indexOf(_0x8fcff7) == -1 && !!_0x8fcff7);
        console.log("您提供了" + newShareCodes.length + "个农场助力码\n");
        console.log("将要助力的好友" + JSON.stringify(newShareCodes));

        _0x58a8ee();
    });
}

function _0x2663f9() {
    return new Promise(_0x4b48c3 => {
        console.log("开始获取配置文件...\n");
        notify = $.isNode() ? require("./sendNotify") : "";

        const _0x507081 = $.isNode() ? require("./jdCookie.js") : "";

        newShareCodes = [];
        $.isNode() && process.env.FRUITCODES && (shareCodes = process.env.FRUITCODES.split("&"));

        if ($.isNode()) {
            Object.keys(_0x507081).forEach(_0x38c8ea => {
                _0x507081[_0x38c8ea] && cookiesArr.push(_0x507081[_0x38c8ea]);
            });
            if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") console.log = () => { };
        } else cookiesArr = [$.getdata("CookieJD"), $.getdata("CookieJD2"), ..._0x372f81($.getdata("CookiesJD") || "[]").map(_0x255f69 => _0x255f69.cookie)].filter(_0x3ab874 => !!_0x3ab874);

        if ($.isNode()) Object.keys(shareCodes).forEach(_0x11456e => {
            shareCodes[_0x11456e] && newShareCodes.push(shareCodes[_0x11456e]);
        }); else {
            if ($.getdata("jd_fruit_inviter")) $.shareCodesArr = $.getdata("jd_fruit_inviter").split("\n").filter(_0x41c5aa => !!_0x41c5aa);
            console.log("\nBoxJs设置的" + $.name + "好友邀请码:" + ($.getdata("jd_fruit_inviter") ? $.getdata("jd_fruit_inviter") : "暂无") + "\n");
        }

        let _0x29a917 = _0x5f06ba.existsSync("./fruit_helpcode");

        shareCodes.length == 0 && _0x29a917 ? ($.log("使用本地缓存的助力码\n"), newShareCodes = _0x5f06ba.readFileSync("./fruit_helpcode", "utf-8"), newShareCodes = JSON.parse(newShareCodes)) : $.log("使用指定的助力码\n");

        _0x4b48c3();
    });
}

function _0x3aea37() {
    return new Promise(_0x27e28d => {
        const _0x10e7d2 = {
            "url": "https://plogin.m.jd.com/cgi-bin/ml/islogin",
            "headers": {
                "Cookie": cookie,
                "referer": "https://h5.m.jd.com/",
                "User-Agent": $.UA
            },
            "timeout": 10000
        };
        $.get(_0x10e7d2, (_0x10b0ad, _0x19f349, _0x2fa571) => {
            try {
                if (_0x2fa571) {
                    _0x2fa571 = JSON.parse(_0x2fa571);

                    if (_0x2fa571.islogin === "1") { } else _0x2fa571.islogin === "0" && ($.isLogin = false);
                }
            } catch (_0x144a57) {
                console.log(_0x144a57);
            } finally {
                _0x27e28d();
            }
        });
    });
}

function _0x1bae39(_0x2a02ab, _0x532341 = {}, _0x2bcaa8 = 1500) {
    $.reqnum % 5 == 0 && (console.log("\n等待" + _0x3b79fe / 1000 + "秒......\n"), _0x2bcaa8 = _0x3b79fe);
    return $.reqnum++, new Promise(_0x1a7751 => {
        setTimeout(() => {
            $.get(_0x577d5e(_0x2a02ab, _0x532341), (_0x25e812, _0x2d2762, _0x1cb14a) => {
                try {
                    _0x25e812 ? (console.log("\n东东农场: API查询请求失败 ‼️‼️"), console.log(JSON.stringify(_0x25e812)), console.log("function_id:" + _0x2a02ab), $.logErr(_0x25e812)) : _0x5406e1(_0x1cb14a) && (_0x1cb14a = JSON.parse(_0x1cb14a));
                } catch (_0x12de26) {
                    $.logErr(_0x12de26, _0x2d2762);
                } finally {
                    _0x1a7751(_0x1cb14a);
                }
            });
        }, _0x2bcaa8);
    });
}

function _0x5406e1(_0x1315ec) {
    try {
        if (typeof JSON.parse(_0x1315ec) == "object") return true;
    } catch (_0x2e16ff) {
        return console.log(_0x2e16ff), console.log("京东服务器访问数据为空，请检查自身设备网络情况"), false;
    }
}

function _0x577d5e(_0x3824a9, _0x3eef85 = {}) {
    return {
        "url": _0x326e10 + "?functionId=" + _0x3824a9 + "&body=" + encodeURIComponent(JSON.stringify(_0x3eef85)) + "&appid=wh5",
        "headers": {
            "Host": "api.m.jd.com",
            "Accept": "*/*",
            "Origin": "https://carry.m.jd.com",
            "Accept-Encoding": "gzip, deflate, br",
            "User-Agent": $.UA,
            "Accept-Language": "zh-CN,zh-Hans;q=0.9",
            "Referer": "https://carry.m.jd.com/",
            "Cookie": cookie
        },
        "timeout": 10000
    };
}

function _0x372f81(_0x16181b) {
    if (typeof _0x16181b == "string") try {
        return JSON.parse(_0x16181b);
    } catch (_0x4e1657) {
        return console.log(_0x4e1657), $.msg($.name, "", "请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie"), [];
    }
}
function Env(t, e) { "undefined" != typeof process && JSON.stringify(process.env).indexOf("GITHUB") > -1 && process.exit(0); class s { constructor(t) { this.env = t } send(t, e = "GET") { t = "string" == typeof t ? { url: t } : t; let s = this.get; return "POST" === e && (s = this.post), new Promise((e, i) => { s.call(this, t, (t, s, r) => { t ? i(t) : e(s) }) }) } get(t) { return this.send.call(this.env, t) } post(t) { return this.send.call(this.env, t, "POST") } } return new class { constructor(t, e) { this.name = t, this.http = new s(this), this.data = null, this.dataFile = "box.dat", this.logs = [], this.isMute = !1, this.isNeedRewrite = !1, this.logSeparator = "\n", this.startTime = (new Date).getTime(), Object.assign(this, e), this.log("", `🔔${this.name}, 开始!`) } isNode() { return "undefined" != typeof module && !!module.exports } isQuanX() { return "undefined" != typeof $task } isSurge() { return "undefined" != typeof $httpClient && "undefined" == typeof $loon } isLoon() { return "undefined" != typeof $loon } toObj(t, e = null) { try { return JSON.parse(t) } catch { return e } } toStr(t, e = null) { try { return JSON.stringify(t) } catch { return e } } getjson(t, e) { let s = e; const i = this.getdata(t); if (i) try { s = JSON.parse(this.getdata(t)) } catch { } return s } setjson(t, e) { try { return this.setdata(JSON.stringify(t), e) } catch { return !1 } } getScript(t) { return new Promise(e => { this.get({ url: t }, (t, s, i) => e(i)) }) } runScript(t, e) { return new Promise(s => { let i = this.getdata("@chavy_boxjs_userCfgs.httpapi"); i = i ? i.replace(/\n/g, "").trim() : i; let r = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout"); r = r ? 1 * r : 20, r = e && e.timeout ? e.timeout : r; const [o, h] = i.split("@"), n = { url: `http://${h}/v1/scripting/evaluate`, body: { script_text: t, mock_type: "cron", timeout: r }, headers: { "X-Key": o, Accept: "*/*" } }; this.post(n, (t, e, i) => s(i)) }).catch(t => this.logErr(t)) } loaddata() { if (!this.isNode()) return {}; { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e); if (!s && !i) return {}; { const i = s ? t : e; try { return JSON.parse(this.fs.readFileSync(i)) } catch (t) { return {} } } } } writedata() { if (this.isNode()) { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e), r = JSON.stringify(this.data); s ? this.fs.writeFileSync(t, r) : i ? this.fs.writeFileSync(e, r) : this.fs.writeFileSync(t, r) } } lodash_get(t, e, s) { const i = e.replace(/\[(\d+)\]/g, ".$1").split("."); let r = t; for (const t of i) if (r = Object(r)[t], void 0 === r) return s; return r } lodash_set(t, e, s) { return Object(t) !== t ? t : (Array.isArray(e) || (e = e.toString().match(/[^.[\]]+/g) || []), e.slice(0, -1).reduce((t, s, i) => Object(t[s]) === t[s] ? t[s] : t[s] = Math.abs(e[i + 1]) >> 0 == +e[i + 1] ? [] : {}, t)[e[e.length - 1]] = s, t) } getdata(t) { let e = this.getval(t); if (/^@/.test(t)) { const [, s, i] = /^@(.*?)\.(.*?)$/.exec(t), r = s ? this.getval(s) : ""; if (r) try { const t = JSON.parse(r); e = t ? this.lodash_get(t, i, "") : e } catch (t) { e = "" } } return e } setdata(t, e) { let s = !1; if (/^@/.test(e)) { const [, i, r] = /^@(.*?)\.(.*?)$/.exec(e), o = this.getval(i), h = i ? "null" === o ? null : o || "{}" : "{}"; try { const e = JSON.parse(h); this.lodash_set(e, r, t), s = this.setval(JSON.stringify(e), i) } catch (e) { const o = {}; this.lodash_set(o, r, t), s = this.setval(JSON.stringify(o), i) } } else s = this.setval(t, e); return s } getval(t) { return this.isSurge() || this.isLoon() ? $persistentStore.read(t) : this.isQuanX() ? $prefs.valueForKey(t) : this.isNode() ? (this.data = this.loaddata(), this.data[t]) : this.data && this.data[t] || null } setval(t, e) { return this.isSurge() || this.isLoon() ? $persistentStore.write(t, e) : this.isQuanX() ? $prefs.setValueForKey(t, e) : this.isNode() ? (this.data = this.loaddata(), this.data[e] = t, this.writedata(), !0) : this.data && this.data[e] || null } initGotEnv(t) { this.got = this.got ? this.got : require("got"), this.cktough = this.cktough ? this.cktough : require("tough-cookie"), this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar, t && (t.headers = t.headers ? t.headers : {}, void 0 === t.headers.Cookie && void 0 === t.cookieJar && (t.cookieJar = this.ckjar)) } get(t, e = (() => { })) { t.headers && (delete t.headers["Content-Type"], delete t.headers["Content-Length"]), this.isSurge() || this.isLoon() ? (this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.get(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) })) : this.isQuanX() ? (this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t))) : this.isNode() && (this.initGotEnv(t), this.got(t).on("redirect", (t, e) => { try { if (t.headers["set-cookie"]) { const s = t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString(); s && this.ckjar.setCookieSync(s, null), e.cookieJar = this.ckjar } } catch (t) { this.logErr(t) } }).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) })) } post(t, e = (() => { })) { if (t.body && t.headers && !t.headers["Content-Type"] && (t.headers["Content-Type"] = "application/x-www-form-urlencoded"), t.headers && delete t.headers["Content-Length"], this.isSurge() || this.isLoon()) this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.post(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) }); else if (this.isQuanX()) t.method = "POST", this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t)); else if (this.isNode()) { this.initGotEnv(t); const { url: s, ...i } = t; this.got.post(s, i).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) }) } } time(t, e = null) { const s = e ? new Date(e) : new Date; let i = { "M+": s.getMonth() + 1, "d+": s.getDate(), "H+": s.getHours(), "m+": s.getMinutes(), "s+": s.getSeconds(), "q+": Math.floor((s.getMonth() + 3) / 3), S: s.getMilliseconds() }; /(y+)/.test(t) && (t = t.replace(RegExp.$1, (s.getFullYear() + "").substr(4 - RegExp.$1.length))); for (let e in i) new RegExp("(" + e + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? i[e] : ("00" + i[e]).substr(("" + i[e]).length))); return t } msg(e = t, s = "", i = "", r) { const o = t => { if (!t) return t; if ("string" == typeof t) return this.isLoon() ? t : this.isQuanX() ? { "open-url": t } : this.isSurge() ? { url: t } : void 0; if ("object" == typeof t) { if (this.isLoon()) { let e = t.openUrl || t.url || t["open-url"], s = t.mediaUrl || t["media-url"]; return { openUrl: e, mediaUrl: s } } if (this.isQuanX()) { let e = t["open-url"] || t.url || t.openUrl, s = t["media-url"] || t.mediaUrl; return { "open-url": e, "media-url": s } } if (this.isSurge()) { let e = t.url || t.openUrl || t["open-url"]; return { url: e } } } }; if (this.isMute || (this.isSurge() || this.isLoon() ? $notification.post(e, s, i, o(r)) : this.isQuanX() && $notify(e, s, i, o(r))), !this.isMuteLog) { let t = ["", "==============📣系统通知📣=============="]; t.push(e), s && t.push(s), i && t.push(i), console.log(t.join("\n")), this.logs = this.logs.concat(t) } } log(...t) { t.length > 0 && (this.logs = [...this.logs, ...t]), console.log(t.join(this.logSeparator)) } logErr(t, e) { const s = !this.isSurge() && !this.isQuanX() && !this.isLoon(); s ? this.log("", `❗️${this.name}, 错误!`, t.stack) : this.log("", `❗️${this.name}, 错误!`, t) } wait(t) { return new Promise(e => setTimeout(e, t)) } done(t = {}) { const e = (new Date).getTime(), s = (e - this.startTime) / 1e3; this.log("", `🔔${this.name}, 结束! 🕛 ${s} 秒`), this.log(), (this.isSurge() || this.isQuanX() || this.isLoon()) && $done(t) } }(t, e) }
