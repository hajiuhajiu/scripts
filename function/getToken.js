/*
new Env('getToken');
*/

const got = require("got");
const getSign = require("./getSign");
const Cache = require("./cache/index");

// 定义缓存 token 有效时间
let cacheDefaultTTL = 15 * 60 * 1000;

const cacheFile = new Cache(cacheDefaultTTL, __dirname + "/cache/token.json");

function regExecFirst(str = "", reg) {
    let exec = reg.exec(str);
    if (exec && exec.length > 0) {
        return exec[0].trim();
    }
    return "";
}

function getCacheKey(ptPin, domain) {
    let hour = new Date().getHours();
    // 0-3 点不判断域名
    if (hour >= 0 && hour <= 3) {
        return ptPin;
    }
    return `${ptPin}_${domain}`;
}

async function getToken(cookie, domain) {
    async function timeWait(t) {
        return new Promise((e) => setTimeout(e, t));
    }

    let token = "";
    let ptPin = regExecFirst(cookie, /(?<=pt_pin=)([^;]+)/);
    if (ptPin) {
        let cacheKey = getCacheKey(ptPin, domain);
        // 读取本地缓存并判断是否过期
        token = cacheFile.get(cacheKey) || "";
        if (token === "") {
            // console.log('请求新TOKEN');
            let sign = await getSign("isvObfuscator", {
                url: domain,
                id: "",
            });
            if (sign) {
                try {
                    const res = await got
                        .post("https://api.m.jd.com/client.action?functionId=isvObfuscator", {
                            headers: {
                                Host: "api.m.jd.com",
                                "Content-Type": "application/x-www-form-urlencoded",
                                Cookie: cookie,
                                "User-Agent": "JD4iPhone/167650 (iPhone; iOS 13.7; Scale/3.00)",
                                "Accept-Language": "zh-Hans-CN;q=1",
                                "Accept-Encoding": "gzip, deflate, br",
                            },
                            body: sign,
                            timeout: 30000,
                        })
                        .catch(async (err) => {
                            if (err.response) {
                                console.log(`🚫 getToken API请求失败 ➜ Response code ${err.response.statusCode || ""} (${err.response.statusMessage || ""})`);
                                if (err.response.statusCode == 403) {
                                    let waitTimes = Math.floor(Math.random() * (1000 - 2000)) + 2000;
                                    await timeWait(waitTimes); // 随机延迟 2~10 秒
                                }
                            } else if (err.response.body) {
                                console.log(`🚫 getToken API请求失败\n${err.response.body || ""}\n`);
                            } else {
                                console.log(`🚫 getToken API请求失败\n${err || ""}\n`);
                            }
                        });
                    if (res && typeof res === "object") {
                        if (res.body) {
                            let data = JSON.parse(res.body);
                            if (data.code === "0") {
                                token = data.token;
                                // 缓存
                                cacheFile.put(cacheKey, token, cacheDefaultTTL);
                            } else if (data.code === "3" && data.errcode === 264) {
                                console.log(`🚫 getToken API请求失败 ➜ 账号无效`);
                            } else {
                                console.log(`🚫 getToken API接口返回异常 ➜ ${JSON.stringify(data)}`);
                            }
                        } else {
                            console.log(`🚫 getToken API请求失败 ➜ 接口返回为空`);
                        }
                    }
                } catch (err) {
                    console.log(`🚫 getToken API在处理请求时遇到了错误`);
                    console.log(err);
                }
            } else {
                console.log(`🚫 getToken API请求错误 ➜ 签名获取失败`);
            }
        } else {
            // console.log(`本地缓存token ➜ ${token}`);
            // console.log(`已读取本地缓存token\n`);
        }
    }
    return token;
}

module.exports = getToken;
