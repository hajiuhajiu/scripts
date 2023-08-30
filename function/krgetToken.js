const i1ilIIIl = require("got"),
    II1l1iII = require("./cache/index"),
    il1l1IlI = require("./krgetSign");
let iilIi11I = 900000;
const iilIII = new II1l1iII(iilIi11I, __dirname + "/cache/token.json"),
    IliIIlll = ["http://api.nolanstore.cc/sign", "http://kr.kingran.cf/sign"],
    lliIiiII = IliIIlll[iIllii11(0, IliIIlll.length)],
    l1l1iIli = process.env.JD_SIGN_KRAPI || "";
function IllI1iii(llIIill = "", lI11l1i) {
    let iiii1ll = lI11l1i.exec(llIIill);
    if (iiii1ll && iiii1ll.length > 0) return iiii1ll[0].trim();
    return "";
}
function I11I1i1l(liliiIIi, I1I1ii1l) {
    let ilII1lll = new Date().getHours();
    if (ilII1lll >= 0 && ilII1lll <= 3) {
        return liliiIIi;
    }
    return liliiIIi + "_" + I1I1ii1l;
}
function iIllii11(lliliIiI, lIliIiII) {
    return Math.floor(Math.random() * (lIliIiII - lliliIiI)) + lliliIiI;
}
async function llI1l(lIili1il, ililIllI) {
    async function IlIlii1(ll1i1Ili) {
        return new Promise(ii1I1lIi => setTimeout(ii1I1lIi, ll1i1Ili));
    }
    let iIII1I1i = "",
        Ii111l11 = IllI1iii(lIili1il, /(?<=pt_pin=)([^;]+)/);
    if (Ii111l11) {
        let Il11lII = I11I1i1l(Ii111l11, ililIllI);
        iIII1I1i = iilIII.get(Il11lII) || "";
        if (iIII1I1i === "") {
            let l1Ilil1I = await il1l1IlI("isvObfuscator", {
                "url": ililIllI,
                "id": ""
            });
            if (l1Ilil1I) {
                try {
                    l1l1iIli ? body = l1Ilil1I.data.convertUrl : body = l1Ilil1I.body;
                    const l1iiiIIl = await i1ilIIIl.post("https://api.m.jd.com/client.action?functionId=isvObfuscator", {
                        "headers": {
                            "Host": "api.m.jd.com",
                            "Content-Type": "application/x-www-form-urlencoded",
                            "Cookie": lIili1il,
                            "User-Agent": "JD4iPhone/167650 (iPhone; iOS 13.7; Scale/3.00)",
                            "Accept-Language": "zh-Hans-CN;q=1",
                            "Accept-Encoding": "gzip, deflate, br"
                        },
                        "body": body,
                        "timeout": 30000
                    }).catch(async llIil1ll => {
                        if (llIil1ll.response) {
                            console.log("🚫 getToken API请求失败 ➜ Response code " + (llIil1ll.response.statusCode || "") + " (" + (llIil1ll.response.statusMessage || "") + ")");
                            if (llIil1ll.response.statusCode == 403) {
                                let IlIlIlli = Math.floor(Math.random() * (1000 - 2000)) + 30000;
                                console.log("🚫 随机等待 " + IlIlIlli + " ms");
                                await IlIlii1(IlIlIlli);
                            }
                        } else llIil1ll.response.body ? console.log("🚫 getToken API请求失败\n" + (llIil1ll.response.body || "") + "\n") : console.log("🚫 getToken API请求失败\n" + (llIil1ll || "") + "\n");
                    });
                    if (l1iiiIIl && typeof l1iiiIIl === "object") {
                        if (l1iiiIIl.body) {
                            let i1IllI11 = JSON.parse(l1iiiIIl.body);
                            if (i1IllI11.code === "0") {
                                iIII1I1i = i1IllI11.token;
                                iilIII.put(Il11lII, iIII1I1i, iilIi11I);
                            } else i1IllI11.code === "3" && i1IllI11.errcode === 264 ? console.log("🚫 getToken API请求失败 ➜ 账号无效") : console.log("🚫 getToken API接口返回异常 ➜ " + JSON.stringify(i1IllI11));
                        } else console.log("🚫 getToken API请求失败 ➜ 接口返回为空");
                    }
                } catch (lIi1IilI) {
                    console.log("🚫 getToken API在处理请求时遇到了错误");
                    console.log(lIi1IilI);
                }
            } else console.log("🚫 getToken API请求错误 ➜ 签名获取失败");
        } else {
            console.log("已读取本地缓存token\n");
        }
    }
    return iIII1I1i;
}
module.exports = llI1l;