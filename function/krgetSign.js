const Ili1IIi1 = require("got"),
    iI1lIl1 = process.env.JD_SIGN_KRAPI || "";
iI1lIl1 ? (console.log("\n⚠ 您当前使用自定义Sign服务 ⚠"), console.log("\n✅ : " + iI1lIl1 + "\n")) : console.log("\n ⚠ 您当前使用内置Sign服务\n");
function Il1IliI1(IIll1lil, liIIIil) {
    return Math.floor(Math.random() * (liIIIil - IIll1lil)) + IIll1lil;
}
async function l1Ii1lll(Il1IIiIl, llIllI1i) {
    let llII1iil = "";
    if (iI1lIl1) {
        let Illll1lI = "body=" + JSON.stringify(llIllI1i) + "&functionId=" + Il1IIiIl;
        llII1iil = Ili1IIi1.post(iI1lIl1, {
            "headers": {
                "Content-Type": "application/x-www-form-urlencoded;charset=utf-8"
            },
            "body": Illll1lI,
            "retry": 1,
            "timeout": 10000
        }).json().catch(ii11llIi => {
            console.log(ii11llIi.message);
            console.error("🚫 getSign API请求失败");
        });
    } else {
        const I1lliIIl = ["http://api.nolanstore.cc/sign", "http://kr.kingran.cf/sign"],
            l1Il1Ii = I1lliIIl[Il1IliI1(0, I1lliIIl.length)],
            Ill1IlI1 = l1Il1Ii;
        let IIiII1il = {
            "fn": Il1IIiIl,
            "body": JSON.stringify(llIllI1i)
        };
        llII1iil = Ili1IIi1.post(Ill1IlI1, {
            "headers": {
                "Content-Type": "application/json"
            },
            "body": JSON.stringify(IIiII1il),
            "retry": 1,
            "timeout": 10000
        }).json().catch(ill1Ilii => {
            console.log(ill1Ilii.message);
            console.error("🚫 getSign API请求失败");
        });
    }
    return llII1iil;
}
module.exports = l1Ii1lll;