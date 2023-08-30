/*
new Env('getSign');
*/

const got = require("got");
const API = process.env.JD_SIGN_API || "http://api.nolanstore.cc/sign"; // 默认为 Nolan 杂货铺公益接口

/**
 * @describe 获取JD签名（杂货铺接口基准格式）
 * @param functionId functionId
 * @param params body
*/
async function getSign(functionId, params) {
    let sign = "";
    let body = JSON.stringify({
        fn: functionId,
        body: JSON.stringify(params),
    });
    try {
        const res = await got
            .post(API, {
                headers: {
                    "Content-Type": "application/json",
                },
                body: body,
                retry: 1,
                timeout: 10000,
            })
            .catch((err) => {
                console.error(`🚫 getSign API请求失败 ➜ ${err || ""}`);
            });

        if (res && typeof res === "object") {
            if (res.body) {
                data = JSON.parse(res.body);
                sign = data.body;
            } else {
                console.log(`🚫 getSign API接口返回异常`);
            }
        }
    } catch (err) {
        console.log(`🚫 getSign API在处理请求时遇到了错误`);
        console.log(err);
    }
    return sign;
}

module.exports = getSign;
