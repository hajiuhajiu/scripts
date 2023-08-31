/*
1，5，10豆，黑子擦肩
23 2 * * * jd_dygetbeans.js
 */

const $ = new Env('每日抽豆');
const _0x37324f = $.isNode() ? require("./sendNotify") : "";
const _0xe8f843 = $.isNode() ? require("./jdCookie.js") : "";
const _0x472276 = require("./function/dylanx.js");
let _0x30dc1d = true;
let _0x157160 = [];
let _0x41a461 = "";
let _0x46f762 = "";
if ($.isNode()) {
    Object.keys(_0xe8f843).forEach(_0x36542d => {
        _0x157160.push(_0xe8f843[_0x36542d]);
    });
    if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") {
        console.log = () => { };
    }
} else {
    _0x157160 = [$.getdata("CookieJD"), $.getdata("CookieJD2"), ..._0x57b3a3($.getdata("CookiesJD") || "[]").map(_0x44d7d5 => _0x44d7d5.cookie)].filter(_0x1c6e02 => !!_0x1c6e02);
}
!(async () => {
    if (!_0x157160[0]) {
        $.msg($.name, "【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取", "https://bean.m.jd.com/bean/signIndex.action", {
            ["open-url"]: "https://bean.m.jd.com/bean/signIndex.action"
        });
        return;
    }
    for (let _0xf7abae = 0; _0xf7abae < _0x157160.length; _0xf7abae++) {
        if (_0x157160[_0xf7abae]) {
            _0x41a461 = _0x157160[_0xf7abae];
            $.UserName = decodeURIComponent(_0x41a461.match(/pt_pin=([^; ]+)(?=;?)/) && _0x41a461.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
            $.index = _0xf7abae + 1;
            $.isLogin = true;
            $.nickName = "";
            $.black = false;
            $.UA = require("./USER_AGENTS").UARAM();
            await _0x1c5549();
            console.log("\n******开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "*********\n");
            if (!$.isLogin) {
                $.msg($.name, "【提示】cookie已失效", "京东账号" + $.index + " " + ($.nickName || $.UserName) + "\n请重新登录获取\nhttps://bean.m.jd.com/bean/signIndex.action", {
                    ["open-url"]: "https://bean.m.jd.com/bean/signIndex.action"
                });
                if ($.isNode()) {
                    await _0x37324f.sendNotify($.name + "cookie已失效 - " + $.UserName, "京东账号" + $.index + " " + $.UserName + "\n请重新登录获取cookie");
                }
                continue;
            }
            await _0x4e2287();
            await $.wait(2000);
            await _0x567d49({
                authType: "2",
                awardSource: "1",
                enAwardK: "ltvTJ/WYFPZcuWIWHCAjR/lUVVYszUqGN+JzEE06dPu7DDzXHNt5Br7i6hYH2826ssuKfHev2yv2\n8HWSugMPNJj0hO0oRf9K9vB1kroDDzT5uSUPG/Z35YJDHw8AyYmqk4Q1u2vSGKS/M+5ruJeepDDb\nGjIC3nIIbIE2I7/kWfG6LEOpCsfjzQD+tTlmq6znidq4bRZoUJ3MOg0BXga8nip79XSe0g5kHG/A\na2pjcqcS+Z0MdH5AoT28E84LptqHeCE6mkMJ/dL3sjRs44o9OuXOZklgdKme+XUAsi2or52idiaj\nejivdFQcDHA7HH3gaHvanKkkE8TU7ESujM2a18EuQglPvG63XuhsjEuTur7Q0q+RCbbzCUJO1qM0\nhM1uGj8RZGTjNPmgGqqkikOxgpl2et5AeQ0y_babel",
                encryptAssignmentId: "tb5nbUQ7kk45XoAexByamhEHeHy",
                encryptProjectId: "TmxyMFsNSsUTi1UoGoYd6WM2Bks",
                lotteryCode: "1271763",
                riskParam: {
                    childActivityUrl: "https://pro.m.jd.com/mall/active/3kmVmayf36Kmoyfq9pLuCSYUfU9t/index.html?babelChannel=ttt1",
                    eid: "",
                    pageClickKey: "Babel_WheelSurf",
                    shshshfpb: ""
                },
                srv: "{\"bord\":\"0\",\"fno\":\"0-0-2\",\"mid\":\"70764372\",\"bi2\":\"2\",\"bid\":\"0\",\"aid\":\"01150161\"}"
            });
            await $.wait(2000);
            await _0x5d831c();
            await $.wait(10000);
        }
    }
})().catch(_0xd672d8 => {
    $.log("", "❌ " + $.name + ", 失败! 原因: " + _0xd672d8 + "!", "");
}).finally(() => {
    $.done();
});
async function _0x567d49(_0x55504c) {
    let _0x5e7ce3 = _0x472276.getbody("babelGetLottery", _0x55504c);
    return new Promise(async _0x278704 => {
        $.post(_0x23e0b3("babelGetLottery", _0x5e7ce3), async (_0x1f922d, _0x402ed4, _0x5ba3ca) => {
            try {
                if (_0x1f922d) {
                    console.log("" + JSON.stringify(_0x1f922d));
                    console.log(" API请求失败，请检查网路重试");
                } else {
                    _0x5ba3ca = JSON.parse(_0x5ba3ca);
                    if (_0x5ba3ca.prizeName) {
                        console.log("恭喜获得：" + _0x5ba3ca.prizeName);
                    } else if (_0x5ba3ca.responseMessage.includes("未通过")) {
                        $.log("风险等级未通过！");
                        $.black = true;
                    } else if (_0x5ba3ca.responseMessage.includes("已完成")) {
                        $.log("103-任务已完成");
                    } else {
                        $.log(JSON.stringify(_0x5ba3ca));
                    }
                }
            } catch (_0x7436ed) {
                $.logErr(_0x7436ed, _0x402ed4);
            } finally {
                _0x278704(_0x5ba3ca);
            }
        });
    });
}
async function _0x4e2287() {
    let _0x195acc = _0x472276.getbody("signInWithPrize", {
        floorId: "83596202"
    });
    return new Promise(async _0x438a58 => {
        $.post(_0x23e0b3("signInWithPrize", _0x195acc), async (_0x519e78, _0x24bbb8, _0x5d898b) => {
            try {
                if (_0x519e78) {
                    console.log("" + JSON.stringify(_0x519e78));
                    console.log(" API请求失败，请检查网路重试");
                } else {
                    _0x5d898b = JSON.parse(_0x5d898b);
                    if (_0x5d898b.code == 0) {
                        if (_0x5d898b.result.signInText.includes("已经")) {
                            $.log("103-任务已完成");
                        } else if (_0x5d898b.result.signInText.includes("恭喜")) {
                            $.log("恭喜获得：" + _0x5d898b.result.beanCount + "京豆");
                        } else { }
                    } else {
                        console.log(_0x5d898b.message);
                    }
                }
            } catch (_0xa1da2f) {
                $.logErr(_0xa1da2f, _0x24bbb8);
            } finally {
                _0x438a58(_0x5d898b);
            }
        });
    });
}
async function _0x5d831c() {
    const _0x11da0d = {
        Host: "api.m.jd.com",
        Origin: "https://h5.m.jd.com",
        ["Content-Type"]: "application/x-www-form-urlencoded",
        ["User-Agent"]: $.UA,
        Cookie: _0x41a461
    };
    const _0x5cba39 = {
        url: "https://api.m.jd.com/api?appid=NewDepartmentStore&functionId=doInteractiveAssignment&body=%7B%22sourceCode%22%3A%22ace20230504MZPD%22%2C%22clientInfo%22%3A%7B%22ip%22%3A%22%22%7D%2C%22encryptProjectId%22%3A%22oRnJWzu84htA5EMrgQohdtjUp8b%22%2C%22encryptAssignmentId%22%3A%22gm9yNeFrcD9KLtZAV1gZQfNX3ux%22%2C%22itemId%22%3A%221%22%2C%22completionFlag%22%3Atrue%2C%22actionType%22%3A0%7D",
        headers: _0x11da0d
    };
    let _0x199c8f = _0x5cba39;
    return new Promise(async _0xc0d62b => {
        $.post(_0x199c8f, async (_0x45c2c9, _0x3299d7, _0x1ffe62) => {
            try {
                if (_0x45c2c9) {
                    console.log("" + JSON.stringify(_0x45c2c9));
                    console.log(" API请求失败，请检查网路重试");
                } else {
                    let _0x27ccc0 = JSON.parse(_0x1ffe62);
                    if (_0x27ccc0.subCode == 0) {
                        let _0x8e6699 = _0x1ffe62.match(/"quantity":(\d+?),/i) ? _0x1ffe62.match(/"quantity":(\d+?),/i)[1] : 0;
                        $.log("恭喜获得：" + _0x8e6699 + "京豆");
                    } else if (_0x27ccc0.msg.includes("已完成")) {
                        $.log("103-任务已完成");
                    } else if (_0x27ccc0.msg.includes("未通过")) {
                        $.log("风险等级未通过");
                    } else { }
                }
            } catch (_0x38dc02) {
                $.logErr(_0x38dc02, _0x3299d7);
            } finally {
                _0xc0d62b(_0x1ffe62);
            }
        });
    });
}
function _0x23e0b3(_0x4e198f, _0xd6dc94) {
    const _0x13b48e = {
        Host: "api.m.jd.com",
        ["Content-Type"]: "application/x-www-form-urlencoded",
        ["User-Agent"]: $.UA,
        Cookie: _0x41a461
    };
    const _0x15726 = {
        url: "https://api.m.jd.com/client.action",
        body: "functionId=" + _0x4e198f + "&" + _0xd6dc94,
        headers: _0x13b48e
    };
    return _0x15726;
}
function _0x1c5549() {
    return new Promise(_0x53b71b => {
        const _0x190eac = {
            url: "https://plogin.m.jd.com/cgi-bin/ml/islogin",
            headers: {},
            timeout: 10000
        };
        _0x190eac.headers.Cookie = _0x41a461;
        _0x190eac.headers.referer = "https://h5.m.jd.com/";
        _0x190eac.headers["User-Agent"] = $.UA;
        const _0x304cf0 = _0x190eac;
        $.get(_0x304cf0, (_0xf22b27, _0x1fd3ef, _0x3694ef) => {
            try {
                if (_0x3694ef) {
                    _0x3694ef = JSON.parse(_0x3694ef);
                    if (_0x3694ef.islogin === "1") { } else if (_0x3694ef.islogin === "0") {
                        $.isLogin = false;
                    }
                }
            } catch (_0x5cdc7b) {
                console.log(_0x5cdc7b);
            } finally {
                _0x53b71b();
            }
        });
    });
}
function _0x29784d() {
    return new Promise(_0x5c3f3b => {
        const _0x351972 = {
            ["User-Agent"]: $.UA
        };
        const _0x302e5f = {
            url: "https://lite-msg.m.jd.com/client.action?functionId=msgEntranceV1",
            headers: _0x351972,
            timeout: 10000
        };
        const _0x5ae9b9 = _0x302e5f;
        $.get(_0x5ae9b9, (_0x417cfe, _0x3b74c7, _0x791167) => {
            try {
                if (_0x791167) {
                    _0x791167 = JSON.parse(_0x791167);
                    $.difftime = Date.now() - _0x791167.timestamp;
                }
            } catch (_0x42a284) {
                console.log(_0x42a284);
            } finally {
                _0x5c3f3b();
            }
        });
    });
}
function _0xeaa6db() {
    return new Promise(_0x47feb5 => {
        if (!_0x30dc1d) {
            $.msg($.name, "", "" + _0x46f762);
        } else {
            $.log("京东账号" + $.index + $.nickName + "\n" + _0x46f762);
        }
        _0x47feb5();
    });
}
function _0x190fe0(_0x2d2f1f) {
    try {
        if (typeof JSON.parse(_0x2d2f1f) == "object") {
            return true;
        }
    } catch (_0x182828) {
        console.log(_0x182828);
        console.log("京东服务器访问数据为空，请检查自身设备网络情况");
        return false;
    }
}
function _0x57b3a3(_0x5ae79b) {
    if (typeof _0x5ae79b == "string") {
        try {
            return JSON.parse(_0x5ae79b);
        } catch (_0x194783) {
            console.log(_0x194783);
            $.msg($.name, "", "请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie");
            return [];
        }
    }
}
function Env(t, e) { "undefined" != typeof process && JSON.stringify(process.env).indexOf("GITHUB") > -1 && process.exit(0); class s { constructor(t) { this.env = t } send(t, e = "GET") { t = "string" == typeof t ? { url: t } : t; let s = this.get; return "POST" === e && (s = this.post), new Promise((e, i) => { s.call(this, t, (t, s, r) => { t ? i(t) : e(s) }) }) } get(t) { return this.send.call(this.env, t) } post(t) { return this.send.call(this.env, t, "POST") } } return new class { constructor(t, e) { this.name = t, this.http = new s(this), this.data = null, this.dataFile = "box.dat", this.logs = [], this.isMute = !1, this.isNeedRewrite = !1, this.logSeparator = "\n", this.startTime = (new Date).getTime(), Object.assign(this, e), this.log("", `🔔${this.name}, 开始!`) } isNode() { return "undefined" != typeof module && !!module.exports } isQuanX() { return "undefined" != typeof $task } isSurge() { return "undefined" != typeof $httpClient && "undefined" == typeof $loon } isLoon() { return "undefined" != typeof $loon } toObj(t, e = null) { try { return JSON.parse(t) } catch { return e } } toStr(t, e = null) { try { return JSON.stringify(t) } catch { return e } } getjson(t, e) { let s = e; const i = this.getdata(t); if (i) try { s = JSON.parse(this.getdata(t)) } catch { } return s } setjson(t, e) { try { return this.setdata(JSON.stringify(t), e) } catch { return !1 } } getScript(t) { return new Promise(e => { this.get({ url: t }, (t, s, i) => e(i)) }) } runScript(t, e) { return new Promise(s => { let i = this.getdata("@chavy_boxjs_userCfgs.httpapi"); i = i ? i.replace(/\n/g, "").trim() : i; let r = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout"); r = r ? 1 * r : 20, r = e && e.timeout ? e.timeout : r; const [o, h] = i.split("@"), n = { url: `http://${h}/v1/scripting/evaluate`, body: { script_text: t, mock_type: "cron", timeout: r }, headers: { "X-Key": o, Accept: "*/*" } }; this.post(n, (t, e, i) => s(i)) }).catch(t => this.logErr(t)) } loaddata() { if (!this.isNode()) return {}; { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e); if (!s && !i) return {}; { const i = s ? t : e; try { return JSON.parse(this.fs.readFileSync(i)) } catch (t) { return {} } } } } writedata() { if (this.isNode()) { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e), r = JSON.stringify(this.data); s ? this.fs.writeFileSync(t, r) : i ? this.fs.writeFileSync(e, r) : this.fs.writeFileSync(t, r) } } lodash_get(t, e, s) { const i = e.replace(/\[(\d+)\]/g, ".$1").split("."); let r = t; for (const t of i) if (r = Object(r)[t], void 0 === r) return s; return r } lodash_set(t, e, s) { return Object(t) !== t ? t : (Array.isArray(e) || (e = e.toString().match(/[^.[\]]+/g) || []), e.slice(0, -1).reduce((t, s, i) => Object(t[s]) === t[s] ? t[s] : t[s] = Math.abs(e[i + 1]) >> 0 == +e[i + 1] ? [] : {}, t)[e[e.length - 1]] = s, t) } getdata(t) { let e = this.getval(t); if (/^@/.test(t)) { const [, s, i] = /^@(.*?)\.(.*?)$/.exec(t), r = s ? this.getval(s) : ""; if (r) try { const t = JSON.parse(r); e = t ? this.lodash_get(t, i, "") : e } catch (t) { e = "" } } return e } setdata(t, e) { let s = !1; if (/^@/.test(e)) { const [, i, r] = /^@(.*?)\.(.*?)$/.exec(e), o = this.getval(i), h = i ? "null" === o ? null : o || "{}" : "{}"; try { const e = JSON.parse(h); this.lodash_set(e, r, t), s = this.setval(JSON.stringify(e), i) } catch (e) { const o = {}; this.lodash_set(o, r, t), s = this.setval(JSON.stringify(o), i) } } else s = this.setval(t, e); return s } getval(t) { return this.isSurge() || this.isLoon() ? $persistentStore.read(t) : this.isQuanX() ? $prefs.valueForKey(t) : this.isNode() ? (this.data = this.loaddata(), this.data[t]) : this.data && this.data[t] || null } setval(t, e) { return this.isSurge() || this.isLoon() ? $persistentStore.write(t, e) : this.isQuanX() ? $prefs.setValueForKey(t, e) : this.isNode() ? (this.data = this.loaddata(), this.data[e] = t, this.writedata(), !0) : this.data && this.data[e] || null } initGotEnv(t) { this.got = this.got ? this.got : require("got"), this.cktough = this.cktough ? this.cktough : require("tough-cookie"), this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar, t && (t.headers = t.headers ? t.headers : {}, void 0 === t.headers.Cookie && void 0 === t.cookieJar && (t.cookieJar = this.ckjar)) } get(t, e = (() => { })) { t.headers && (delete t.headers["Content-Type"], delete t.headers["Content-Length"]), this.isSurge() || this.isLoon() ? (this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.get(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) })) : this.isQuanX() ? (this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t))) : this.isNode() && (this.initGotEnv(t), this.got(t).on("redirect", (t, e) => { try { if (t.headers["set-cookie"]) { const s = t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString(); s && this.ckjar.setCookieSync(s, null), e.cookieJar = this.ckjar } } catch (t) { this.logErr(t) } }).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) })) } post(t, e = (() => { })) { if (t.body && t.headers && !t.headers["Content-Type"] && (t.headers["Content-Type"] = "application/x-www-form-urlencoded"), t.headers && delete t.headers["Content-Length"], this.isSurge() || this.isLoon()) this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.post(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) }); else if (this.isQuanX()) t.method = "POST", this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t)); else if (this.isNode()) { this.initGotEnv(t); const { url: s, ...i } = t; this.got.post(s, i).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) }) } } time(t, e = null) { const s = e ? new Date(e) : new Date; let i = { "M+": s.getMonth() + 1, "d+": s.getDate(), "H+": s.getHours(), "m+": s.getMinutes(), "s+": s.getSeconds(), "q+": Math.floor((s.getMonth() + 3) / 3), S: s.getMilliseconds() }; /(y+)/.test(t) && (t = t.replace(RegExp.$1, (s.getFullYear() + "").substr(4 - RegExp.$1.length))); for (let e in i) new RegExp("(" + e + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? i[e] : ("00" + i[e]).substr(("" + i[e]).length))); return t } msg(e = t, s = "", i = "", r) { const o = t => { if (!t) return t; if ("string" == typeof t) return this.isLoon() ? t : this.isQuanX() ? { "open-url": t } : this.isSurge() ? { url: t } : void 0; if ("object" == typeof t) { if (this.isLoon()) { let e = t.openUrl || t.url || t["open-url"], s = t.mediaUrl || t["media-url"]; return { openUrl: e, mediaUrl: s } } if (this.isQuanX()) { let e = t["open-url"] || t.url || t.openUrl, s = t["media-url"] || t.mediaUrl; return { "open-url": e, "media-url": s } } if (this.isSurge()) { let e = t.url || t.openUrl || t["open-url"]; return { url: e } } } }; if (this.isMute || (this.isSurge() || this.isLoon() ? $notification.post(e, s, i, o(r)) : this.isQuanX() && $notify(e, s, i, o(r))), !this.isMuteLog) { let t = ["", "==============📣系统通知📣=============="]; t.push(e), s && t.push(s), i && t.push(i), console.log(t.join("\n")), this.logs = this.logs.concat(t) } } log(...t) { t.length > 0 && (this.logs = [...this.logs, ...t]), console.log(t.join(this.logSeparator)) } logErr(t, e) { const s = !this.isSurge() && !this.isQuanX() && !this.isLoon(); s ? this.log("", `❗️${this.name}, 错误!`, t.stack) : this.log("", `❗️${this.name}, 错误!`, t) } wait(t) { return new Promise(e => setTimeout(e, t)) } done(t = {}) { const e = (new Date).getTime(), s = (e - this.startTime) / 1e3; this.log("", `🔔${this.name}, 结束! 🕛 ${s} 秒`), this.log(), (this.isSurge() || this.isQuanX() || this.isLoon()) && $done(t) } }(t, e) }
