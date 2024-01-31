/*
45 7,20 * * * jd_jlychl.js
 */
let lnrun = 0;

const $ = new Env('集龙运抽好礼');
const _0x2b4ac1 = $.isNode() ? require("./sendNotify") : "",
    _0x2259ff = $.isNode() ? require("./jdCookie.js") : "",
    _0x4e6644 = require("./USER_AGENTS"),
    _0x421246 = require("./function/dylany");

let _0x5f00bf = true,
    _0x58ae04 = [],
    _0xbf3355 = "",
    _0x4b5060 = "";

if ($.isNode()) {
    Object.keys(_0x2259ff).forEach(_0x16370f => {
        _0x58ae04.push(_0x2259ff[_0x16370f]);
    });
    if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") console.log = () => { };
} else _0x58ae04 = [$.getdata("CookieJD"), $.getdata("CookieJD2"), ..._0x4a7eb0($.getdata("CookiesJD") || "[]").map(_0x19dd1d => _0x19dd1d.cookie)].filter(_0x46cca3 => !!_0x46cca3);

!(async () => {
    if (!_0x58ae04[0]) {
        $.msg($.name, "【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取", "https://bean.m.jd.com/bean/signIndex.action", {
            "open-url": "https://bean.m.jd.com/bean/signIndex.action"
        });
        return;
    }

    console.log("TG频道：https://t.me/dylan_jdpro\n");

    for (let _0x203199 = 0; _0x203199 < _0x58ae04.length; _0x203199++) {
        if (_0x58ae04[_0x203199]) {
            _0xbf3355 = _0x58ae04[_0x203199];
            $.UserName = decodeURIComponent(_0xbf3355.match(/pt_pin=([^; ]+)(?=;?)/) && _0xbf3355.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
            $.index = _0x203199 + 1;
            $.isLogin = true;
            $.nickName = "";
            $.UA = _0x4e6644.UARAM ? _0x4e6644.UARAM() : _0x4e6644.USER_AGENT;
            await _0x5a9486();
            console.log("\n******开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "*********\n");
      let Interval = process.env.jd_task_interval || 60 * 1000;console.log("环境变量jd_task_interval已设置为"+Interval/1000+"秒");lnrun++;if(lnrun == 3){console.log(`\n【访问接口次数达到2次，休息一分钟.....】\n`);await $.wait(Interval);lnrun = 0}

            if (!$.isLogin) {
                $.msg($.name, "【提示】cookie已失效", "京东账号" + $.index + " " + ($.nickName || $.UserName) + "\n请重新登录获取\nhttps://bean.m.jd.com/bean/signIndex.action", {
                    "open-url": "https://bean.m.jd.com/bean/signIndex.action"
                });
                $.isNode() && (await _0x2b4ac1.sendNotify($.name + "cookie已失效 - " + $.UserName, "京东账号" + $.index + " " + $.UserName + "\n请重新登录获取cookie"));
                continue;
            }

            let _0xf775a0 = await _0x33f6ef();

            if (_0xf775a0.length != 0) {
                console.log("\n去做任务...");

                for (let _0x397b60 of _0xf775a0) {
                    if (_0x397b60.taskTitle === "邀请好友助力") continue;

                    if (_0x397b60.taskFinished) {
                        console.log(_0x397b60.taskShowTitle + " ---- 已完成");
                        continue;
                    }

                    console.log("去做任务 " + _0x397b60.taskShowTitle);
                    await _0x17b881(_0x397b60.taskSourceUrl, _0x397b60.taskType, _0x397b60.id);
                    await $.wait(2000);
                }
            }

            await _0x49ed41();

            if ($.remainchance > 0) {
                $.log("\n开始抽奖开红包...");

                for (let _0x1cbd38 = 0; _0x1cbd38 < $.remainchance; _0x1cbd38++) {
                    $.log("第" + (_0x1cbd38 + 1) + "次抽奖：");
                    await _0x175bc1();
                    await $.wait(2000);
                }
            }

            await $.wait(3000);
        }
    }
})().catch(_0x2d7c9f => {
    $.log("", "❌ " + $.name + ", 失败! 原因: " + _0x2d7c9f + "!", "");
}).finally(() => {
    $.done();
});

async function _0x49ed41() {
    let _0x263d31 = {
        "linkId": "bqka8E-8Z7aj0jPm8aXbkA",
        "taskId": "",
        "inviter": "",
        "inJdApp": true
    },
        _0x5c27c1 = {
            "appId": "b7d17",
            "fn": "superLeagueHome",
            "body": _0x263d31,
            "apid": "activities_platform",
            "ver": $.UA.split(";")[2],
            "cl": "ios",
            "user": $.UserName,
            "code": 1,
            "ua": $.UA
        };
    _0x263d31 = await _0x421246.getbody(_0x5c27c1);
    if (!_0x263d31) return;
    return new Promise(async _0x290b09 => {
        $.post(_0x5174e3(_0x263d31), async (_0x3e2ce1, _0x48af00, _0x301d1b) => {
            try {
                if (_0x3e2ce1) {
                    console.log("" + JSON.stringify(_0x3e2ce1));
                    console.log(" API请求失败，请检查网路重试");
                } else _0x301d1b = JSON.parse(_0x301d1b), _0x301d1b.code == 0 ? $.remainchance = _0x301d1b.data.remainTimes || 0 : console.log(_0x301d1b.errMsg);
            } catch (_0x4aaa20) {
                $.logErr(_0x4aaa20, _0x48af00);
            } finally {
                _0x290b09(_0x301d1b);
            }
        });
    });
}

async function _0x33f6ef() {
    let _0x5cd58d = "";
    return new Promise(async _0x5429c8 => {
        $.post(_0x5174e3("functionId=apTaskList&body=%7B%22linkId%22%3A%22bqka8E-8Z7aj0jPm8aXbkA%22%7D&t=" + Date.now() + "&appid=activities_platform&client=android&clientVersion=12.1.0"), async (_0x4bda99, _0x1cab63, _0x43145a) => {
            try {
                if (_0x4bda99) console.log("" + JSON.stringify(_0x4bda99)), console.log(" API请求失败，请检查网路重试"); else {
                    _0x43145a = JSON.parse(_0x43145a);
                    if (_0x43145a.code == 0) _0x5cd58d = _0x43145a.data; else {
                        console.log(_0x43145a.msg);
                    }
                }
            } catch (_0xdcb1af) {
                $.logErr(_0xdcb1af, _0x1cab63);
            } finally {
                _0x5429c8(_0x5cd58d);
            }
        });
    });
}

async function _0x175bc1() {
    let _0x40db91 = {
        "linkId": "bqka8E-8Z7aj0jPm8aXbkA"
    },
        _0x41d595 = {
            "appId": "60dc4",
            "fn": "superLeagueLottery",
            "body": _0x40db91,
            "apid": "activities_platform",
            "ver": $.UA.split(";")[2],
            "cl": "ios",
            "user": $.UserName,
            "code": 1,
            "ua": $.UA
        };
    _0x40db91 = await _0x421246.getbody(_0x41d595);
    if (!_0x40db91) return;
    return new Promise(async _0x51cc21 => {
        $.post(_0x5174e3(_0x40db91), async (_0x16a3e9, _0x1822b5, _0x445b3c) => {
            try {
                _0x16a3e9 ? (console.log("" + JSON.stringify(_0x16a3e9)), console.log(" API请求失败，请检查网路重试")) : (_0x445b3c = JSON.parse(_0x445b3c), _0x445b3c.success ? console.log(_0x445b3c.data.amount + " " + _0x445b3c.data.prizeConfigName) : console.log(_0x445b3c.msg));
            } catch (_0x2fbb4e) {
                $.logErr(_0x2fbb4e, _0x1822b5);
            } finally {
                _0x51cc21();
            }
        });
    });
}

async function _0x17b881(_0x1e7464, _0x5e1bf4, _0x5400af) {
    let _0x1f54cd = {
        "taskType": "" + _0x5e1bf4,
        "taskId": _0x5400af,
        "channel": 4,
        "checkVersion": true,
        "cityId": 0,
        "provinceId": 0,
        "countyId": 0,
        "linkId": "bqka8E-8Z7aj0jPm8aXbkA",
        "taskInsert": false,
        "resourceType": null,
        "itemId": "" + _0x1e7464
    },
        _0x2cf174 = {
            "appId": "54ed7",
            "fn": "apsDoTask",
            "body": _0x1f54cd,
            "apid": "activities_platform",
            "ver": $.UA.split(";")[2],
            "cl": "ios",
            "user": $.UserName,
            "code": 1,
            "ua": $.UA
        };
    _0x1f54cd = await _0x421246.getbody(_0x2cf174);
    if (!_0x1f54cd) return;
    return new Promise(async _0x440690 => {
        $.post(_0x5174e3(_0x1f54cd), async (_0x142626, _0x14748e, _0x2b30b4) => {
            try {
                _0x142626 ? (console.log("" + JSON.stringify(_0x142626)), console.log(" API请求失败，请检查网路重试")) : (_0x2b30b4 = JSON.parse(_0x2b30b4), _0x2b30b4.code == 0 ? $.log("任务成功，抽奖次数 +" + _0x2b30b4.data.awardInfo[0].factAwardNum) : console.log(_0x2b30b4.msg));
            } catch (_0x39495d) {
                $.logErr(_0x39495d, _0x14748e);
            } finally {
                _0x440690();
            }
        });
    });
}

async function _0x26ca21(_0x597e9a, _0x11ddae) {
    let _0x543696 = "functionId=apTaskDetail&body={\"taskType\":\"" + _0x597e9a + "\",\"taskId\":" + _0x11ddae + ",\"channel\":4,\"checkVersion\":true,\"cityId\":0,\"provinceId\":0,\"countyId\":0,\"linkId\":\"bqka8E-8Z7aj0jPm8aXbkA\"}&t=1705983706332&appid=activities_platform&client=android&clientVersion=12.3.2&loginType=2&loginWQBiz=wegame&h5st=null";

    return new Promise(async _0x531718 => {
        $.post(_0x5174e3(_0x543696), async (_0x5985e7, _0x5a6a88, _0x290f2b) => {
            try {
                if (_0x5985e7) console.log("" + JSON.stringify(_0x5985e7)), console.log(" API请求失败，请检查网路重试"); else {
                    _0x290f2b = JSON.parse(_0x290f2b);

                    if (_0x290f2b.code == 0) {
                        _0x290f2b = _0x290f2b.data.taskItemList;
                    } else console.log(_0x290f2b.errMsg);
                }
            } catch (_0x5888b1) {
                $.logErr(_0x5888b1, _0x5a6a88);
            } finally {
                _0x531718(_0x290f2b);
            }
        });
    });
}

async function _0x3c6db3(_0x5854d7, _0x12bab5) {
    let _0x11d86e = {
        "linkId": "l-yLvQMhLwCqYy6_nXUBgg",
        "taskId": _0x5854d7,
        "itemId": encodeURIComponent(_0x12bab5),
        "channel": 4
    };
    return _0x11d86e = "functionId=apStartTaskTime&body=" + JSON.stringify(_0x11d86e) + "&t=" + Date.now() + "&appid=activities_platform&client=android&clientVersion=12.1.0", new Promise(async _0x44cb1e => {
        $.post(_0x5174e3(_0x11d86e), async (_0x25c00a, _0x5b7f2e, _0x2374a6) => {
            try {
                if (_0x25c00a) console.log("" + JSON.stringify(_0x25c00a)), console.log(" API请求失败，请检查网路重试"); else {
                    _0x2374a6 = JSON.parse(_0x2374a6);

                    if (_0x2374a6.code == 0) { } else console.log(_0x2374a6.errMsg);
                }
            } catch (_0x2d973f) {
                $.logErr(_0x2d973f, _0x5b7f2e);
            } finally {
                _0x44cb1e(_0x2374a6);
            }
        });
    });
}

async function _0x301d5f(_0x23b57d) {
    let _0x331df4 = {
        "linkId": "l-yLvQMhLwCqYy6_nXUBgg",
        "taskId": _0x23b57d
    };
    return _0x331df4 = "functionId=apCheckAndResetTaskTime&body=" + JSON.stringify(_0x331df4) + "&t=" + Date.now() + "&appid=activities_platform&client=android&clientVersion=12.1.0", new Promise(async _0x1f351f => {
        $.post(_0x5174e3(_0x331df4), async (_0x55c866, _0x33af81, _0x18ca7b) => {
            try {
                if (_0x55c866) console.log("" + JSON.stringify(_0x55c866)), console.log(" API请求失败，请检查网路重试"); else {
                    _0x18ca7b = JSON.parse(_0x18ca7b);

                    if (_0x18ca7b.code == 0) { } else console.log(_0x18ca7b.errMsg);
                }
            } catch (_0x3cf9a5) {
                $.logErr(_0x3cf9a5, _0x33af81);
            } finally {
                _0x1f351f(_0x18ca7b);
            }
        });
    });
}

async function _0x28e82a() {
    let _0x49186d = {
        "linkId": "bqka8E-8Z7aj0jPm8aXbkA"
    },
        _0x5db65b = {
            "appId": "ebecc",
            "fn": "apDoLimitTimeTask",
            "body": _0x49186d,
            "apid": "activities_platform",
            "ver": $.UA.split(";")[2],
            "cl": "ios",
            "user": $.UserName,
            "code": 1,
            "xcr": 1,
            "ua": $.UA
        };
    _0x49186d = await _0x421246.getbody(_0x5db65b);
    if (!_0x49186d) return;
    return new Promise(async _0x2fe156 => {
        $.post(_0x5174e3(_0x49186d), async (_0x31c96e, _0x3b9c2d, _0x27ea89) => {
            try {
                if (_0x31c96e) console.log("" + JSON.stringify(_0x31c96e)), console.log(" API请求失败，请检查网路重试"); else {
                    _0x27ea89 = JSON.parse(_0x27ea89);

                    if (_0x27ea89.code == 0) { } else console.log(_0x27ea89.errMsg);
                }
            } catch (_0x596cbc) {
                $.logErr(_0x596cbc, _0x3b9c2d);
            } finally {
                _0x2fe156(_0x27ea89);
            }
        });
    });
}

async function _0x299262(_0x410665) {
    let _0xf21e34 = {
        "linkId": "l-yLvQMhLwCqYy6_nXUBgg",
        "taskId": String(_0x410665)
    };
    return _0xf21e34 = "functionId=apCheckTaskTimeEnd&body=" + JSON.stringify(_0xf21e34) + "&t=" + Date.now() + "&appid=activities_platform&client=android&clientVersion=12.1.0", new Promise(async _0x37c436 => {
        $.post(_0x5174e3(_0xf21e34), async (_0x5e6dec, _0xf2c304, _0x2aa7a1) => {
            try {
                if (_0x5e6dec) console.log("" + JSON.stringify(_0x5e6dec)), console.log(" API请求失败，请检查网路重试"); else {
                    _0x2aa7a1 = JSON.parse(_0x2aa7a1);

                    if (_0x2aa7a1.code == 0) { } else console.log(_0x2aa7a1.errMsg);
                }
            } catch (_0x6acc3e) {
                $.logErr(_0x6acc3e, _0xf2c304);
            } finally {
                _0x37c436(_0x2aa7a1);
            }
        });
    });
}

function _0x5174e3(_0x933b11) {
    return {
        "url": "https://api.m.jd.com/api",
        "body": _0x933b11,
        "headers": {
            "Host": "api.m.jd.com",
            "Origin": "https://prodev.m.jd.com",
            "Content-Type": "application/x-www-form-urlencoded",
            "User-Agent": $.UA,
            "Cookie": _0xbf3355
        }
    };
}

function _0x5a9486() {
    return new Promise(_0x5d1c4b => {
        const _0x4f24a6 = {
            "url": "https://plogin.m.jd.com/cgi-bin/ml/islogin",
            "headers": {
                "Cookie": _0xbf3355,
                "referer": "https://h5.m.jd.com/",
                "User-Agent": $.UA
            },
            "timeout": 10000
        };
        $.get(_0x4f24a6, (_0x3323a0, _0x182d2b, _0x556c45) => {
            try {
                if (_0x556c45) {
                    _0x556c45 = JSON.parse(_0x556c45);

                    if (_0x556c45.islogin === "1") { } else {
                        if (_0x556c45.islogin === "0") {
                            $.isLogin = false;
                        }
                    }
                }
            } catch (_0x11a703) {
                console.log(_0x11a703);
            } finally {
                _0x5d1c4b();
            }
        });
    });
}

function _0x460a98() {
    return new Promise(_0x192187 => {
        !_0x5f00bf ? $.msg($.name, "", "" + _0x4b5060) : $.log("京东账号" + $.index + $.nickName + "\n" + _0x4b5060);

        _0x192187();
    });
}

function _0x2d54a9(_0x489fdc) {
    try {
        if (typeof JSON.parse(_0x489fdc) == "object") return true;
    } catch (_0x2ab6f0) {
        return console.log(_0x2ab6f0), console.log("京东服务器访问数据为空，请检查自身设备网络情况"), false;
    }
}

function _0x4a7eb0(_0xcb6148) {
    if (typeof _0xcb6148 == "string") {
        try {
            return JSON.parse(_0xcb6148);
        } catch (_0xc645b0) {
            return console.log(_0xc645b0), $.msg($.name, "", "请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie"), [];
        }
    }
}

// prettier-ignore
function Env(t, e) { "undefined" != typeof process && JSON.stringify(process.env).indexOf("GITHUB") > -1 && process.exit(0); class s { constructor(t) { this.env = t } send(t, e = "GET") { t = "string" == typeof t ? { url: t } : t; let s = this.get; return "POST" === e && (s = this.post), new Promise((e, i) => { s.call(this, t, (t, s, r) => { t ? i(t) : e(s) }) }) } get(t) { return this.send.call(this.env, t) } post(t) { return this.send.call(this.env, t, "POST") } } return new class { constructor(t, e) { this.name = t, this.http = new s(this), this.data = null, this.dataFile = "box.dat", this.logs = [], this.isMute = !1, this.isNeedRewrite = !1, this.logSeparator = "\n", this.startTime = (new Date).getTime(), Object.assign(this, e), this.log("", `🔔${this.name}, 开始!`) } isNode() { return "undefined" != typeof module && !!module.exports } isQuanX() { return "undefined" != typeof $task } isSurge() { return "undefined" != typeof $httpClient && "undefined" == typeof $loon } isLoon() { return "undefined" != typeof $loon } toObj(t, e = null) { try { return JSON.parse(t) } catch { return e } } toStr(t, e = null) { try { return JSON.stringify(t) } catch { return e } } getjson(t, e) { let s = e; const i = this.getdata(t); if (i) try { s = JSON.parse(this.getdata(t)) } catch { } return s } setjson(t, e) { try { return this.setdata(JSON.stringify(t), e) } catch { return !1 } } getScript(t) { return new Promise(e => { this.get({ url: t }, (t, s, i) => e(i)) }) } runScript(t, e) { return new Promise(s => { let i = this.getdata("@chavy_boxjs_userCfgs.httpapi"); i = i ? i.replace(/\n/g, "").trim() : i; let r = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout"); r = r ? 1 * r : 20, r = e && e.timeout ? e.timeout : r; const [o, h] = i.split("@"), n = { url: `http://${h}/v1/scripting/evaluate`, body: { script_text: t, mock_type: "cron", timeout: r }, headers: { "X-Key": o, Accept: "*/*" } }; this.post(n, (t, e, i) => s(i)) }).catch(t => this.logErr(t)) } loaddata() { if (!this.isNode()) return {}; { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e); if (!s && !i) return {}; { const i = s ? t : e; try { return JSON.parse(this.fs.readFileSync(i)) } catch (t) { return {} } } } } writedata() { if (this.isNode()) { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e), r = JSON.stringify(this.data); s ? this.fs.writeFileSync(t, r) : i ? this.fs.writeFileSync(e, r) : this.fs.writeFileSync(t, r) } } lodash_get(t, e, s) { const i = e.replace(/\[(\d+)\]/g, ".$1").split("."); let r = t; for (const t of i) if (r = Object(r)[t], void 0 === r) return s; return r } lodash_set(t, e, s) { return Object(t) !== t ? t : (Array.isArray(e) || (e = e.toString().match(/[^.[\]]+/g) || []), e.slice(0, -1).reduce((t, s, i) => Object(t[s]) === t[s] ? t[s] : t[s] = Math.abs(e[i + 1]) >> 0 == +e[i + 1] ? [] : {}, t)[e[e.length - 1]] = s, t) } getdata(t) { let e = this.getval(t); if (/^@/.test(t)) { const [, s, i] = /^@(.*?)\.(.*?)$/.exec(t), r = s ? this.getval(s) : ""; if (r) try { const t = JSON.parse(r); e = t ? this.lodash_get(t, i, "") : e } catch (t) { e = "" } } return e } setdata(t, e) { let s = !1; if (/^@/.test(e)) { const [, i, r] = /^@(.*?)\.(.*?)$/.exec(e), o = this.getval(i), h = i ? "null" === o ? null : o || "{}" : "{}"; try { const e = JSON.parse(h); this.lodash_set(e, r, t), s = this.setval(JSON.stringify(e), i) } catch (e) { const o = {}; this.lodash_set(o, r, t), s = this.setval(JSON.stringify(o), i) } } else s = this.setval(t, e); return s } getval(t) { return this.isSurge() || this.isLoon() ? $persistentStore.read(t) : this.isQuanX() ? $prefs.valueForKey(t) : this.isNode() ? (this.data = this.loaddata(), this.data[t]) : this.data && this.data[t] || null } setval(t, e) { return this.isSurge() || this.isLoon() ? $persistentStore.write(t, e) : this.isQuanX() ? $prefs.setValueForKey(t, e) : this.isNode() ? (this.data = this.loaddata(), this.data[e] = t, this.writedata(), !0) : this.data && this.data[e] || null } initGotEnv(t) { this.got = this.got ? this.got : require("got"), this.cktough = this.cktough ? this.cktough : require("tough-cookie"), this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar, t && (t.headers = t.headers ? t.headers : {}, void 0 === t.headers.Cookie && void 0 === t.cookieJar && (t.cookieJar = this.ckjar)) } get(t, e = (() => { })) { t.headers && (delete t.headers["Content-Type"], delete t.headers["Content-Length"]), this.isSurge() || this.isLoon() ? (this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.get(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) })) : this.isQuanX() ? (this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t))) : this.isNode() && (this.initGotEnv(t), this.got(t).on("redirect", (t, e) => { try { if (t.headers["set-cookie"]) { const s = t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString(); s && this.ckjar.setCookieSync(s, null), e.cookieJar = this.ckjar } } catch (t) { this.logErr(t) } }).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) })) } post(t, e = (() => { })) { if (t.body && t.headers && !t.headers["Content-Type"] && (t.headers["Content-Type"] = "application/x-www-form-urlencoded"), t.headers && delete t.headers["Content-Length"], this.isSurge() || this.isLoon()) this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.post(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) }); else if (this.isQuanX()) t.method = "POST", this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t)); else if (this.isNode()) { this.initGotEnv(t); const { url: s, ...i } = t; this.got.post(s, i).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) }) } } time(t, e = null) { const s = e ? new Date(e) : new Date; let i = { "M+": s.getMonth() + 1, "d+": s.getDate(), "H+": s.getHours(), "m+": s.getMinutes(), "s+": s.getSeconds(), "q+": Math.floor((s.getMonth() + 3) / 3), S: s.getMilliseconds() }; /(y+)/.test(t) && (t = t.replace(RegExp.$1, (s.getFullYear() + "").substr(4 - RegExp.$1.length))); for (let e in i) new RegExp("(" + e + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? i[e] : ("00" + i[e]).substr(("" + i[e]).length))); return t } msg(e = t, s = "", i = "", r) { const o = t => { if (!t) return t; if ("string" == typeof t) return this.isLoon() ? t : this.isQuanX() ? { "open-url": t } : this.isSurge() ? { url: t } : void 0; if ("object" == typeof t) { if (this.isLoon()) { let e = t.openUrl || t.url || t["open-url"], s = t.mediaUrl || t["media-url"]; return { openUrl: e, mediaUrl: s } } if (this.isQuanX()) { let e = t["open-url"] || t.url || t.openUrl, s = t["media-url"] || t.mediaUrl; return { "open-url": e, "media-url": s } } if (this.isSurge()) { let e = t.url || t.openUrl || t["open-url"]; return { url: e } } } }; if (this.isMute || (this.isSurge() || this.isLoon() ? $notification.post(e, s, i, o(r)) : this.isQuanX() && $notify(e, s, i, o(r))), !this.isMuteLog) { let t = ["", "==============📣系统通知📣=============="]; t.push(e), s && t.push(s), i && t.push(i), console.log(t.join("\n")), this.logs = this.logs.concat(t) } } log(...t) { t.length > 0 && (this.logs = [...this.logs, ...t]), console.log(t.join(this.logSeparator)) } logErr(t, e) { const s = !this.isSurge() && !this.isQuanX() && !this.isLoon(); s ? this.log("", `❗️${this.name}, 错误!`, t.stack) : this.log("", `❗️${this.name}, 错误!`, t) } wait(t) { return new Promise(e => setTimeout(e, t)) } done(t = {}) { const e = (new Date).getTime(), s = (e - this.startTime) / 1e3; this.log("", `🔔${this.name}, 结束! 🕛 ${s} 秒`), this.log(), (this.isSurge() || this.isQuanX() || this.isLoon()) && $done(t) } }(t, e) }
