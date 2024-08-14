/*
常规店铺签到
环境变量: export DPQDTK="token1&token2" 或 export DPQDTK="token1\ntoken2"

定时建议自行修改
cron:1 1 1 1 *
============Quantumultx===============
[task_local]
#常规店铺签到
1 1 1 1 * jd_dpqd.js, tag=常规店铺签到, enabled=true
*/
let lnrun = 0;

const $ = new Env('常规店铺签到');
const sendNotify = $.isNode() ? require("./sendNotify") : "",
    jdCookie = $.isNode() ? require("./jdCookie") : "",
    h5st = require("./function/h5st41.js"),
    crypto = require("crypto-js"),
    _0x4f7e32 = "KLMNOPQRSTABCDEFGHIJUVWXYZabcdopqrstuvwxefghijklmnyz0123456789+/";

let token = [
    "D00EA46256768FBE9047846685E6C87F",
    "7897121799F9771395DB494DBDB7214B",
    "CF77897CD93FFDDDB993704DCD150C99",
    "3A0FC3CED6D46B2DEFC265E000E1482C" ,
    "41DD3A16CDB9468977C87C410C65CE7E",
    "6D0F0F1D54CF19C96CB9146C2CF1AFCE",
    "5DEF5020ADC96AC076C86F6E55F85D9C",
    "50D5ACFD1F4DD2FA05D97B1DB5BDB0AD",
    "1B27B8885C333727C26E5F3F0530C57E",
    "A2397809C9D1A5F368241E73402E1EC6",
    "EAD352F1A6290101928800D7E99C48A1",
    "A36126E607C97A6BAFB13E1E8ECEC369",
];
process.env.DPQDTK && (process.env.DPQDTK.includes("\n") ? token = [...process.env.DPQDTK.split("\n"), ...token] : token = [...process.env.DPQDTK.split("&"), ...token]);

let cookiesArr = [],
    cookie = "",
    allMessage = "",
    message;

$.activityId = "";
$.venderId = "";
$.activityEnd = false;

if ($.isNode()) {
    Object.keys(jdCookie).forEach(_0x3d3372 => {
        cookiesArr.push(jdCookie[_0x3d3372]);
    });
    if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") console.log = () => { };
} else {
    let cookiesData = $.getdata("CookiesJD") || "[]";
    cookiesData = _0x4ad446(cookiesData);
    cookiesArr = cookiesData.map(_0x50c055 => _0x50c055.cookie);
    cookiesArr.reverse();
    cookiesArr.push(...[$.getdata("CookieJD2"), $.getdata("CookieJD")]);
    cookiesArr.reverse();
    cookiesArr = cookiesArr.filter(item => item !== "" && item !== null && item !== undefined);
}

!(async () => {
    if (!cookiesArr[0]) {
        $.msg($.name, "【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取", "https://bean.m.jd.com/bean/signIndex.action", {
            "open-url": "https://bean.m.jd.com/bean/signIndex.action"
        });
        return;
    }

    for (let i = 0; i < cookiesArr.length; i++) {
        if (cookiesArr[i]) {
            cookie = cookiesArr[i];
            $.UserName = decodeURIComponent(cookie.match(/pt_pin=([^; ]+)(?=;?)/) && cookie.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
            $.index = i + 1;
            $.isLogin = true;
            $.nickName = "";
            message = "";
            console.log("\n******开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "******\n");
      let Interval = process.env.jd_task_interval || 60 * 1000;console.log("环境变量jd_task_interval已设置为"+Interval/1000+"秒");lnrun++;if(lnrun == 3){console.log(`\n【访问接口次数达到2次，休息一分钟.....】\n`);await $.wait(Interval);lnrun = 0}

            if (!$.isLogin) {
                $.msg($.name, "【提示】cookie已失效", "京东账号" + $.index + " " + ($.nickName || $.UserName) + "\n请重新登录获取\nhttps://bean.m.jd.com/bean/signIndex.action", {
                    "open-url": "https://bean.m.jd.com/bean/signIndex.action"
                });
                $.isNode() && (await sendNotify.sendNotify($.name + "cookie已失效 - " + $.UserName, "京东账号" + $.index + " " + $.UserName + "\n请重新登录获取cookie"));
                continue;
            }

            getUA();

            await dpqd();
            await $.wait(parseInt(Math.random() * 1500 + 1500, 10));
        }
    }
})().catch(_0x111206 => {
    $.log("", "❌ " + $.name + ", 失败! 原因: " + _0x111206 + "!", "");
}).finally(() => {
    $.done();
});

async function dpqd() {
    for (var j = 0; j < token.length; j++) {
        if (token[j] == "") continue;
        await $.wait(parseInt(Math.random() * 500 + 500, 10));
        await getActivityInfo(token[j]);
        await $.wait(parseInt(Math.random() * 500 + 500, 10));

        if ($.venderId == "") {
            continue;
        }

        $.index == 1 && (await _0x3c01e7($.venderId), await $.wait(parseInt(Math.random() * 500 + 500, 10)));
        await _0x436d32(token[j], $.venderId);
        await $.wait(parseInt(Math.random() * 500 + 500, 10));
        await _0x231761(token[j], $.venderId, $.activityId);
    }
}

async function getActivityInfo(token) {
    return new Promise(async resolve => {
        const body = {
            "functionId": "interact_center_shopSign_getActivityInfo",
            "appid": "interCenter_shopSign",
            "body": {
                "token": token,
                "venderId": ""
            }
        },
            h5st = await getH5st("4da33", body),
            options = {
                "url": "https://api.m.jd.com/api?" + h5st + "&loginType=2&jsonp=jsonp1000",
                "headers": {
                    "accept": "*/*",
                    "accept-encoding": "gzip, deflate, br",
                    "accept-language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
                    "cookie": cookie,
                    "referer": "https://h5.m.jd.com/",
                    "User-Agent": $.UA
                },
                "timeout": 15 * 1000
            };

        $.get(options, (_0x1780bf, _0x3ecf5a, _0x4ebbef) => {
            try {
                if (_0x1780bf) {
                    console.log("查询店铺GetvenderId API请求失败‼️");
                    console.log(_0x1780bf);
                } else {
                    _0x4ebbef = JSON.parse(/{(.*)}/g.exec(_0x4ebbef)[0]);

                    if (_0x4ebbef.code == 402) {
                        $.venderId = "";
                        console.log("活动已失效");
                        $.activityEnd = true;
                    } else $.venderId = _0x4ebbef?.["data"]?.["venderId"];
                }
            } catch (_0x5a7f54) {
                $.logErr(_0x5a7f54, _0x3ecf5a);
            } finally {
                resolve(_0x4ebbef);
            }
        });
    });
}

async function _0x3c01e7(_0x3461e0) {
    return new Promise(_0x22a845 => {
        const _0x531be0 = {
            "url": "https://api.m.jd.com/client.action?functionId=whx_getMShopDetail&body=%7B%22venderId%22%3A%22" + _0x3461e0 + "%22%2C%22stamp%22%3A%221%22%2C%22%24taroTimestamp%22%3A" + new Date().valueOf() + "%2C%22source%22%3A%22m-shop%22%7D&t=" + new Date().valueOf() + "&appid=shop_view&clientVersion=11.0.0&client=wh5&area=1_72_2799_0&uuid=16630119447091257705224",
            "headers": {
                "accept": "*/*",
                "accept-language": "zh-CN,zh;q=0.9",
                "sec-fetch-dest": "empty",
                "sec-fetch-mode": "cors",
                "sec-fetch-site": "same-site",
                "Referer": "https://shop.m.jd.com/",
                "User-Agent": $.UA
            },
            "timeout": 15 * 1000
        };
        $.get(_0x531be0, (_0x50a023, _0x5eed94, _0x245dbd) => {
            try {
                if (_0x50a023) {
                    console.log("查询店铺名称GetShopName API请求失败‼️");
                    console.log(_0x50a023);
                } else {
                    _0x245dbd = JSON.parse(_0x245dbd);

                    if ($.index == 1) {
                        let _0x2166f7 = _0x245dbd?.["data"]?.["shopBaseInfo"]?.["shopName"];

                        console.log("店铺名称：" + _0x2166f7 + "\n店铺链接：https://shop.m.jd.com/?venderId=" + _0x3461e0);
                        message += "【" + _0x2166f7 + "】";
                    }
                }
            } catch (_0x537359) {
                $.logErr(_0x537359, _0x5eed94);
            } finally {
                _0x22a845(_0x245dbd);
            }
        });
    });
}

async function _0x436d32(_0x171b18, _0x5c1cb2) {
    return new Promise(async _0x3fbac3 => {
        const _0xf486ae = {
            "functionId": "interact_center_shopSign_getActivityInfo",
            "appid": "interCenter_shopSign",
            "body": {
                "token": _0x171b18,
                "venderId": _0x5c1cb2
            }
        },
            _0xf8b37e = await getH5st("4da33", _0xf486ae),
            _0xd1d791 = {
                "url": "https://api.m.jd.com/api?" + _0xf8b37e + "&loginType=2&jsonp=jsonp1005",
                "headers": {
                    "accept": "accept",
                    "accept-encoding": "gzip, deflate",
                    "accept-language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
                    "cookie": cookie,
                    "referer": "https://h5.m.jd.com/babelDiy/Zeus/2PAAf74aG3D61qvfKUM5dxUssJQ9/index.html?token=" + _0x171b18 + "&sceneval=2",
                    "User-Agent": $.UA
                },
                "timeout": 15 * 1000
            };

        $.get(_0xd1d791, (_0x1306f4, _0x2062ed, _0x311f58) => {
            try {
                if (_0x1306f4) {
                    console.log("查询活动信息GetActivityInfo API请求失败‼️");
                    console.log(_0x1306f4);
                } else {
                    _0x311f58 = JSON.parse(/{(.*)}/g.exec(_0x311f58)[0]);
                    $.activityId = _0x311f58.data.id;
                    let _0x1b7b56 = _0x311f58.data.startTime,
                        _0x43df54 = _0x311f58.data.endTime;

                    if ($.index == 1) {
                        console.log("开始时间：" + new Date(parseInt(_0x1b7b56)).toLocaleString() + "\n结束时间：" + new Date(parseInt(_0x43df54)).toLocaleString());
                        let _0xfe813c = "";

                        for (let _0x1d1433 = 0; _0x1d1433 < _0x311f58.data.continuePrizeRuleList.length; _0x1d1433++) {
                            const _0x1b08a7 = _0x311f58.data.continuePrizeRuleList[_0x1d1433].level,
                                _0x59e985 = _0x311f58.data.continuePrizeRuleList[_0x1d1433].prizeList[0].discount;
                            _0x1d1433 != _0x311f58.data.continuePrizeRuleList.length - 1 ? _0xfe813c += _0x1b08a7 + "天" + _0x59e985 + "豆，" : _0xfe813c += _0x1b08a7 + "天" + _0x59e985 + "豆";
                        }

                        console.log("签到奖励：" + _0xfe813c + "\n");
                    }
                }
            } catch (_0x5be2ee) {
                $.logErr(_0x5be2ee, _0x2062ed);
            } finally {
                _0x3fbac3(_0x311f58);
            }
        });
    });
}

async function _0x231761(_0x57bb15, _0x665abf, _0x3343d2) {
    return new Promise(async _0x570b8f => {
        const _0x272dd1 = {
            "functionId": "interact_center_shopSign_signCollectGift",
            "appid": "interCenter_shopSign",
            "body": {
                "token": _0x57bb15,
                "venderId": _0x665abf,
                "activityId": _0x3343d2,
                "type": 56,
                "actionType": 7
            }
        },
            _0x55faa4 = await getH5st("4da33", _0x272dd1),
            _0x209e1c = {
                "url": "https://api.m.jd.com/api?" + _0x55faa4 + "&loginType=2jsonp=jsonp1004",
                "headers": {
                    "accept": "accept",
                    "accept-encoding": "gzip, deflate",
                    "accept-language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
                    "cookie": cookie,
                    "referer": "https://h5.m.jd.com/babelDiy/Zeus/2PAAf74aG3D61qvfKUM5dxUssJQ9/index.html?token=" + _0x57bb15 + "&sceneval=2",
                    "User-Agent": $.UA
                },
                "timeout": 15 * 1000
            };

        $.get(_0x209e1c, (_0x49399d, _0x594d1a, _0xa11ef5) => {
            try {
                if (_0x49399d) {
                    console.log("签到SignCollectGift API请求失败‼️");
                    console.log(_0x49399d);
                } else {
                    _0xa11ef5 = JSON.parse(/{(.*)}/g.exec(_0xa11ef5)[0]);
                    if (_0xa11ef5.success && _0xa11ef5.success === true) console.log("签到成功"); else {
                        if (_0xa11ef5.msg) console.log("签到失败：" + _0xa11ef5?.["msg"]); else {
                            console.log("签到失败");
                            console.log(JSON.stringify(_0xa11ef5));
                        }
                    }
                }
            } catch (_0x3cf960) {
                $.logErr(_0x3cf960, _0x594d1a);
            } finally {
                _0x570b8f(_0xa11ef5);
            }
        });
    });
}

async function _0x572155(_0x16dd45, _0x39813d) {
    return new Promise(_0x35d67c => {
        const _0x3e13f8 = {
            "url": "https://api.m.jd.com/api?appid=interCenter_shopSign&loginType=2&functionId=interact_center_shopSign_getSignRecord&body={%22token%22:%22" + _0x16dd45 + "%22,%22venderId%22:" + _0x39813d + ",%22activityId%22:" + $.activityId + ",%22type%22:56}&jsonp=jsonp1006",
            "headers": {
                "accept": "application/json",
                "accept-encoding": "gzip, deflate, br",
                "accept-language": "zh-CN,zh;q=0.9",
                "cookie": cookie,
                "referer": "https://h5.m.jd.com/",
                "User-Agent": $.UA
            },
            "timeout": 15 * 1000
        };
        $.get(_0x3e13f8, (_0x16350f, _0x2e42a8, _0x11e767) => {
            try {
                _0x16350f ? (console.log("taskUrl API请求失败‼️"), console.log(_0x16350f)) : (_0x11e767 = JSON.parse(/{(.*)}/g.exec(_0x11e767)[0]), console.log("当前已签到 " + _0x11e767?.["data"]?.["days"] + " 天"), message += "已签到：" + _0x11e767?.["data"]?.["days"] + "天\n");
            } catch (_0x3cddbe) {
                $.logErr(_0x3cddbe, _0x2e42a8);
            } finally {
                _0x35d67c(_0x11e767);
            }
        });
    });
}

async function showMsg() {
    if ($.isNode()) {
        $.msg($.name, '', `【京东账号${$.index}】${$.nickName}\n${message}`);
        allMessage += `【京东账号${$.index}】${$.nickName}\n${message}${$.index !== cookiesArr.length ? '\n\n' : ''}`;
    }
}

function _0x37232c() {
    return new Promise(async _0x446818 => {
        const _0x2485b3 = {
            "url": "https://wq.jd.com/user/info/QueryJDUserInfo?sceneval=2",
            "headers": {
                "Accept": "application/json,text/plain, */*",
                "Content-Type": "application/x-www-form-urlencoded",
                "Accept-Encoding": "gzip, deflate, br",
                "Accept-Language": "zh-cn",
                "Connection": "keep-alive",
                "Cookie": cookie,
                "Referer": "https://wqs.jd.com/my/jingdou/my.shtml?sceneval=2",
                "User-Agent": "jdapp;android;9.3.5;10;3353234393134326-3673735303632613;network/wifi;model/MI 8;addressid/138719729;aid/3524914bc77506b1;oaid/274aeb3d01b03a22;osVer/29;appBuild/86390;psn/Mp0dlaZf4czQtfPNMEfpcYU9S/f2Vv4y|2255;psq/1;adk/;ads/;pap/JA2015_311210|9.3.5|ANDROID 10;osv/10;pv/2039.1;jdv/0|androidapp|t_335139774|appshare|QQfriends|1611211482018|1611211495;ref/com.jingdong.app.mall.home.JDHomeFragment;partner/jingdong;apprpd/Home_Main;eufv/1;jdSupportDarkMode/0;Mozilla/5.0 (Linux; Android 10; MI 8 Build/QKQ1.190828.002; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/77.0.3865.120 MQQBrowser/6.2 TBS/045230 Mobile Safari/537.36"
            },
            "timeout": 15 * 1000
        };
        $.post(_0x2485b3, (_0x3bf6af, _0x58bfd7, _0xe48240) => {
            try {
                if (_0x3bf6af) {
                    console.log("" + JSON.stringify(_0x3bf6af));
                    console.log($.name + " API请求失败，请检查网路重试");
                } else {
                    if (_0xe48240) {
                        _0xe48240 = JSON.parse(_0xe48240);

                        if (_0xe48240.retcode === 13) {
                            $.isLogin = false;
                            return;
                        }

                        _0xe48240.retcode === 0 ? $.nickName = _0xe48240.base.nickname : $.nickName = $.UserName;
                    } else console.log("京东服务器返回空数据");
                }
            } catch (_0x5c898d) {
                $.logErr(_0x5c898d, _0x58bfd7);
            } finally {
                _0x446818();
            }
        });
    });
}

function _0x4ad446(_0x3e318b) {
    if (typeof _0x3e318b == "string") {
        try {
            return JSON.parse(_0x3e318b);
        } catch (_0x51c94e) {
            return console.log(_0x51c94e), $.msg($.name, "", "请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie"), [];
        }
    }
}

async function getH5st(appId, body) {
    try {
        let bodys = new h5st({
            "appId": appId,
            "appid": "interCenter_shopSign",
            "pin": $.UserName,
            "ua": $.UA,
            "version": "3.1"
        });

        return await bodys.genAlgo(), body = await bodys.genUrlParams(body.functionId, body.body), body;
    } catch (e) { }
}

function randomChoice(e) {
    return e[Math.floor(Math.random() * e.length)];
}

function getUUID(_0x573c65 = "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx", _0x1cd9e2 = "0123456789abcdef") {
    let x = "";

    for (let _0xc9e97b of _0x573c65) {
        if (_0xc9e97b == "x") {
            x += _0x1cd9e2.charAt(Math.floor(Math.random() * _0x1cd9e2.length));
        } else _0xc9e97b == "X" ? x += _0x1cd9e2.charAt(Math.floor(Math.random() * _0x1cd9e2.length)).toUpperCase() : x += _0xc9e97b;
    }

    return x;
}

function _0x5cfd6e(_0x2bae7f) {
    _0x2bae7f = _0x2bae7f.replace(/rn/g, "n");
    var _0x45102a = "";

    for (var _0x23d747 = 0; _0x23d747 < _0x2bae7f.length; _0x23d747++) {
        var _0x3357fd = _0x2bae7f.charCodeAt(_0x23d747);

        if (_0x3357fd < 128) _0x45102a += String.fromCharCode(_0x3357fd); else _0x3357fd > 127 && _0x3357fd < 2048 ? (_0x45102a += String.fromCharCode(_0x3357fd >> 6 | 192), _0x45102a += String.fromCharCode(_0x3357fd & 63 | 128)) : (_0x45102a += String.fromCharCode(_0x3357fd >> 12 | 224), _0x45102a += String.fromCharCode(_0x3357fd >> 6 & 63 | 128), _0x45102a += String.fromCharCode(_0x3357fd & 63 | 128));
    }

    return _0x45102a;
}

function _0x50eb35(_0x25dc6c, _0x2910c4) {
    _0x2910c4 = _0x2910c4 || _0x4f7e32;
    var _0xd16eae = "";

    var _0x59ff3b, _0x305e73, _0xf7bcfc, _0x50e0f8, _0x26a99b, _0xd33a3e, _0x2f9d95;

    var _0x1e7c8f = 0;
    _0x25dc6c = _0x5cfd6e(_0x25dc6c);

    while (_0x1e7c8f < _0x25dc6c.length) {
        _0x59ff3b = _0x25dc6c.charCodeAt(_0x1e7c8f++);
        _0x305e73 = _0x25dc6c.charCodeAt(_0x1e7c8f++);
        _0xf7bcfc = _0x25dc6c.charCodeAt(_0x1e7c8f++);
        _0x50e0f8 = _0x59ff3b >> 2;
        _0x26a99b = (_0x59ff3b & 3) << 4 | _0x305e73 >> 4;
        _0xd33a3e = (_0x305e73 & 15) << 2 | _0xf7bcfc >> 6;
        _0x2f9d95 = _0xf7bcfc & 63;
        if (isNaN(_0x305e73)) _0xd33a3e = _0x2f9d95 = 64; else isNaN(_0xf7bcfc) && (_0x2f9d95 = 64);
        _0xd16eae = _0xd16eae + _0x2910c4.charAt(_0x50e0f8) + _0x2910c4.charAt(_0x26a99b) + _0x2910c4.charAt(_0xd33a3e) + _0x2910c4.charAt(_0x2f9d95);
    }

    while (_0xd16eae.length % 4 > 1) _0xd16eae += "=";

    return _0xd16eae;
}

function _0x30dee7(_0x365a0a = {}) {
    let _0x514372 = {
        "ciphertype": 5,
        "cipher": {
            "ud": _0x50eb35(crypto.SHA1($.UserName).toString()),
            "sv": _0x50eb35($.os_ver),
            "iad": ""
        },
        "ts": Date.now(),
        "hdid": "JM9F1ywUPwflvMIpYPok0tt5k9kW4ArJEU3lfLhxBqw=",
        "version": "1.0.3",
        "appname": "com.360buy.jdmobile",
        "ridx": -1
    };
    $.ep = JSON.stringify(_0x514372);
}

function getUA(Type, params = {}) {
    const Types = {
        "jd": {
            "app": "jdapp",
            "appBuild": "168392",
            "client": "android",
            "clientVersion": "10.1.0"
        },
        "lite": {
            "app": "jdltapp",
            "appBuild": "1247",
            "client": "ios",
            "clientVersion": "6.0.0"
        }
    },
        version = ["15.1.1", "14.5.1", "14.4", "14.3", "14.2", "14.1", "14.0.1", "13.2"];
    $.os_ver = randomChoice(version);

    let type = Type || "jd",
        ep = params?.["ep"] ? params?.["ep"] : true;

    if (!Types[type]) {
        console.log("获取[" + type + "]UA失败");
        return;
    }

    $.client = params?.["client"] ? params?.["client"] : Types[type].client;
    $.clientVersion = params?.["clientVersion"] ? params?.["clientVersion"] : Types[type].clientVersion;
    $.sua = "iPhone; CPU iPhone OS " + $.os_ver.replace(".", "_") + " like Mac OS X";
    let device = "android";
    $.client == "apple" && (device = "iPhone");

    _0x30dee7();

    let ua = [Types[type].app, device, $.clientVersion, "", "rn/" + getUUID(), "M/5.0", "hasUPPay/0", "pushNoticeIsOpen/0", "lang/zh_CN", "hasOCPay/0", "appBuild/" + Types[type].appBuild, "supportBestPay/0", "jdSupportDarkMode/0", "ef/1", ep ? "ep/" + encodeURIComponent($.ep) : "", "Mozilla/5.0 (" + $.sua + ") AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148", "supportJDSHWK/1", ""];
    $.UA = ua.join(";");
}

// prettier-ignore
function Env(t, e) { class s { constructor(t) { this.env = t } send(t, e = "GET") { t = "string" == typeof t ? { url: t } : t; let s = this.get; return "POST" === e && (s = this.post), new Promise((e, i) => { s.call(this, t, (t, s, r) => { t ? i(t) : e(s) }) }) } get(t) { return this.send.call(this.env, t) } post(t) { return this.send.call(this.env, t, "POST") } } return new class { constructor(t, e) { this.name = t, this.http = new s(this), this.data = null, this.dataFile = "box.dat", this.logs = [], this.isMute = !1, this.isNeedRewrite = !1, this.logSeparator = "\n", this.startTime = (new Date).getTime(), Object.assign(this, e), this.log("", `\ud83d\udd14${this.name}, \u5f00\u59cb!`) } isNode() { return "undefined" != typeof module && !!module.exports } isQuanX() { return "undefined" != typeof $task } isSurge() { return "undefined" != typeof $httpClient && "undefined" == typeof $loon } isLoon() { return "undefined" != typeof $loon } toObj(t, e = null) { try { return JSON.parse(t) } catch { return e } } toStr(t, e = null) { try { return JSON.stringify(t) } catch { return e } } getjson(t, e) { let s = e; const i = this.getdata(t); if (i) try { s = JSON.parse(this.getdata(t)) } catch { } return s } setjson(t, e) { try { return this.setdata(JSON.stringify(t), e) } catch { return !1 } } getScript(t) { return new Promise(e => { this.get({ url: t }, (t, s, i) => e(i)) }) } runScript(t, e) { return new Promise(s => { let i = this.getdata("@chavy_boxjs_userCfgs.httpapi"); i = i ? i.replace(/\n/g, "").trim() : i; let r = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout"); r = r ? 1 * r : 20, r = e && e.timeout ? e.timeout : r; const [o, h] = i.split("@"), a = { url: `http://${h}/v1/scripting/evaluate`, body: { script_text: t, mock_type: "cron", timeout: r }, headers: { "X-Key": o, Accept: "*/*" } }; this.post(a, (t, e, i) => s(i)) }).catch(t => this.logErr(t)) } loaddata() { if (!this.isNode()) return {}; { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e); if (!s && !i) return {}; { const i = s ? t : e; try { return JSON.parse(this.fs.readFileSync(i)) } catch (t) { return {} } } } } writedata() { if (this.isNode()) { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e), r = JSON.stringify(this.data); s ? this.fs.writeFileSync(t, r) : i ? this.fs.writeFileSync(e, r) : this.fs.writeFileSync(t, r) } } lodash_get(t, e, s) { const i = e.replace(/\[(\d+)\]/g, ".$1").split("."); let r = t; for (const t of i) if (r = Object(r)[t], void 0 === r) return s; return r } lodash_set(t, e, s) { return Object(t) !== t ? t : (Array.isArray(e) || (e = e.toString().match(/[^.[\]]+/g) || []), e.slice(0, -1).reduce((t, s, i) => Object(t[s]) === t[s] ? t[s] : t[s] = Math.abs(e[i + 1]) >> 0 == +e[i + 1] ? [] : {}, t)[e[e.length - 1]] = s, t) } getdata(t) { let e = this.getval(t); if (/^@/.test(t)) { const [, s, i] = /^@(.*?)\.(.*?)$/.exec(t), r = s ? this.getval(s) : ""; if (r) try { const t = JSON.parse(r); e = t ? this.lodash_get(t, i, "") : e } catch (t) { e = "" } } return e } setdata(t, e) { let s = !1; if (/^@/.test(e)) { const [, i, r] = /^@(.*?)\.(.*?)$/.exec(e), o = this.getval(i), h = i ? "null" === o ? null : o || "{}" : "{}"; try { const e = JSON.parse(h); this.lodash_set(e, r, t), s = this.setval(JSON.stringify(e), i) } catch (e) { const o = {}; this.lodash_set(o, r, t), s = this.setval(JSON.stringify(o), i) } } else s = this.setval(t, e); return s } getval(t) { return this.isSurge() || this.isLoon() ? $persistentStore.read(t) : this.isQuanX() ? $prefs.valueForKey(t) : this.isNode() ? (this.data = this.loaddata(), this.data[t]) : this.data && this.data[t] || null } setval(t, e) { return this.isSurge() || this.isLoon() ? $persistentStore.write(t, e) : this.isQuanX() ? $prefs.setValueForKey(t, e) : this.isNode() ? (this.data = this.loaddata(), this.data[e] = t, this.writedata(), !0) : this.data && this.data[e] || null } initGotEnv(t) { this.got = this.got ? this.got : require("got"), this.cktough = this.cktough ? this.cktough : require("tough-cookie"), this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar, t && (t.headers = t.headers ? t.headers : {}, void 0 === t.headers.Cookie && void 0 === t.cookieJar && (t.cookieJar = this.ckjar)) } get(t, e = (() => { })) { t.headers && (delete t.headers["Content-Type"], delete t.headers["Content-Length"]), this.isSurge() || this.isLoon() ? (this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.get(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) })) : this.isQuanX() ? (this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t))) : this.isNode() && (this.initGotEnv(t), this.got(t).on("redirect", (t, e) => { try { if (t.headers["set-cookie"]) { const s = t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString(); this.ckjar.setCookieSync(s, null), e.cookieJar = this.ckjar } } catch (t) { this.logErr(t) } }).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) })) } post(t, e = (() => { })) { if (t.body && t.headers && !t.headers["Content-Type"] && (t.headers["Content-Type"] = "application/x-www-form-urlencoded"), t.headers && delete t.headers["Content-Length"], this.isSurge() || this.isLoon()) this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.post(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) }); else if (this.isQuanX()) t.method = "POST", this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t)); else if (this.isNode()) { this.initGotEnv(t); const { url: s, ...i } = t; this.got.post(s, i).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) }) } } time(t) { let e = { "M+": (new Date).getMonth() + 1, "d+": (new Date).getDate(), "H+": (new Date).getHours(), "m+": (new Date).getMinutes(), "s+": (new Date).getSeconds(), "q+": Math.floor(((new Date).getMonth() + 3) / 3), S: (new Date).getMilliseconds() }; /(y+)/.test(t) && (t = t.replace(RegExp.$1, ((new Date).getFullYear() + "").substr(4 - RegExp.$1.length))); for (let s in e) new RegExp("(" + s + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? e[s] : ("00" + e[s]).substr(("" + e[s]).length))); return t } msg(e = t, s = "", i = "", r) { const o = t => { if (!t) return t; if ("string" == typeof t) return this.isLoon() ? t : this.isQuanX() ? { "open-url": t } : this.isSurge() ? { url: t } : void 0; if ("object" == typeof t) { if (this.isLoon()) { let e = t.openUrl || t.url || t["open-url"], s = t.mediaUrl || t["media-url"]; return { openUrl: e, mediaUrl: s } } if (this.isQuanX()) { let e = t["open-url"] || t.url || t.openUrl, s = t["media-url"] || t.mediaUrl; return { "open-url": e, "media-url": s } } if (this.isSurge()) { let e = t.url || t.openUrl || t["open-url"]; return { url: e } } } }; this.isMute || (this.isSurge() || this.isLoon() ? $notification.post(e, s, i, o(r)) : this.isQuanX() && $notify(e, s, i, o(r))); let h = ["", "==============\ud83d\udce3\u7cfb\u7edf\u901a\u77e5\ud83d\udce3=============="]; h.push(e), s && h.push(s), i && h.push(i), console.log(h.join("\n")), this.logs = this.logs.concat(h) } log(...t) { t.length > 0 && (this.logs = [...this.logs, ...t]), console.log(t.join(this.logSeparator)) } logErr(t, e) { const s = !this.isSurge() && !this.isQuanX() && !this.isLoon(); s ? this.log("", `\u2757\ufe0f${this.name}, \u9519\u8bef!`, t.stack) : this.log("", `\u2757\ufe0f${this.name}, \u9519\u8bef!`, t) } wait(t) { return new Promise(e => setTimeout(e, t)) } done(t = {}) { const e = (new Date).getTime(), s = (e - this.startTime) / 1e3; this.log("", `\ud83d\udd14${this.name}, \u7ed3\u675f! \ud83d\udd5b ${s} \u79d2`), this.log(), (this.isSurge() || this.isQuanX() || this.isLoon()) && $done(t) } }(t, e) }
