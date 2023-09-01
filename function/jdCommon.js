/*
通用代码库
new Env('jdCommon');
*/
const Il1111II = require("crypto-js/sha1");

class ii1lllii {
    ["getUrlParameter"](illill11, liI1i1i1) {
        try {
            const liIIi1il = new URL(illill11),
                lill11Il = liIIi1il.searchParams.get(liI1i1i1);
            return lill11Il || "";
        } catch {
            return "";
        }
    }

    ["parseUrl"](lil1I1l) {
        try {
            const iliI1Iil = new URL(lil1I1l);
            return iliI1Iil;
        } catch (I111iIi) {
            return {};
        }
    }

    ["getResponseCookie"](iIiIl1Ii, IiIlil1i) {
        let IiIlliii = "";

        if (iIiIl1Ii.headers["set-cookie"]) {
            for (let iIl1liiI of iIiIl1Ii.headers["set-cookie"]) {
                IiIlliii += iIl1liiI.split(";")[0].split("=")[0] + "=" + iIl1liiI.split(";")[0].split("=")[1] + ";";
            }
        } else IiIlil1i && (IiIlliii = IiIlil1i);

        return IiIlliii;
    }

    ["getCookieValue"](iIiIlIll, Ii111i1I) {
        if (!iIiIlIll || !Ii111i1I) {
            return "";
        }

        var llIlIIl1 = new RegExp(Ii111i1I + "=" + "([^;]*)" + ";"),
            iIIlii1l = llIlIIl1.exec(iIiIlIll);
        return iIIlii1l && iIIlii1l[1] || "";
    }

    ["parseCookie"](iiII1Iil) {
        const lIl1lili = {},
            lli1IIiI = iiII1Iil.split(";");

        for (const l1li1I1I of lli1IIiI) {
            const [iI1lli11, lIIIi1Il] = l1li1I1I.trim().split("=");
            lIl1lili[iI1lli11] = lIIIi1Il;
        }

        return lIl1lili;
    }

    ["genUuid"](liiilII = "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx", IIli11Ii = "0123456789abcdef") {
        let i1ll1iii = "";

        for (let ii11IIi of liiilII) {
            if (ii11IIi == "x") i1ll1iii += IIli11Ii.charAt(Math.floor(Math.random() * IIli11Ii.length)); else ii11IIi == "X" ? i1ll1iii += IIli11Ii.charAt(Math.floor(Math.random() * IIli11Ii.length)).toUpperCase() : i1ll1iii += ii11IIi;
        }

        return i1ll1iii;
    }

    ["genEp"](IIlI1ill, li1ii1Ii = "15.1.1") {
        let l1l1Ilil = {
            "ciphertype": 5,
            "cipher": {
                "ud": this._base64Encode(Il1111II(IIlI1ill).toString()),
                "sv": this._base64Encode(li1ii1Ii),
                "iad": ""
            },
            "ts": Math.floor(Date.now() / 1000),
            "hdid": "JM9F1ywUPwflvMIpYPok0tt5k9kW4ArJEU3lfLhxBqw=",
            "version": "1.0.3",
            "appname": "com.360buy.jdmobile",
            "ridx": -1
        };
        return JSON.stringify(l1l1Ilil);
    }

    ["genUA"](l1l111I, iIIliliI = "jd", lIIlIli1 = {}) {
        const liiII1l1 = {
            "jd": {
                "app": "jdapp",
                "appBuild": "168858",
                "client": "iPhone",
                "clientVersion": "12.1.0"
            },
            "lite": {
                "app": "jdltapp",
                "appBuild": "1247",
                "client": "ios",
                "clientVersion": "6.0.0"
            }
        },
            iI11lIlI = lIIlIli1?.["ep"] ? lIIlIli1?.["ep"] : true,
            i1il11l1 = lIIlIli1?.["client"] ? lIIlIli1?.["client"] : liiII1l1[iIIliliI].client,
            iliIiIIl = lIIlIli1?.["clientVersion"] ? lIIlIli1?.["clientVersion"] : liiII1l1[iIIliliI].clientVersion,
            il1lIIi1 = ["16.6", "16.5", "16.4", "16.3", "16.2", "16.1", "16.0", "15.6", "15.1", "14.5"],
            Iiliiill = il1lIIi1[Math.floor(Math.random() * il1lIIi1.length)],
            IIiiIIil = "iPhone; CPU iPhone OS " + Iiliiill.replace(".", "_") + " like Mac OS X",
            IlIlIlII = i1il11l1 === "apple" || i1il11l1 === "iPhone" ? "iPhone" : "android",
            il1Il1Il = this.genEp(l1l111I, Iiliiill),
            lI1I11l1 = this.genUuid();
        let Ii1lIl1l = [liiII1l1[iIIliliI].app, IlIlIlII, iliIiIIl, "", "rn/" + lI1I11l1, "M/5.0", "appBuild/" + liiII1l1[iIIliliI].appBuild, "jdSupportDarkMode/0", "ef/1", iI11lIlI ? "ep/" + encodeURIComponent(il1Il1Il) : "", "Mozilla/5.0 (" + IIiiIIil + ") AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148", "supportJDSHWK/1", ""];
        return Ii1lIl1l.join(";");
    }

    ["_utf8Encode"](llillII1) {
        llillII1 = llillII1.replace(/rn/g, "n");

        for (var Il1liII1 = 0; Il1liII1 < llillII1.length; Il1liII1++) {
            var iIlil11i = "",
                l1II1lil = llillII1.charCodeAt(Il1liII1);

            if (l1II1lil < 128) {
                iIlil11i += String.fromCharCode(l1II1lil);
            } else {
                if (l1II1lil > 127 && l1II1lil < 2048) iIlil11i += String.fromCharCode(l1II1lil >> 6 | 192), iIlil11i += String.fromCharCode(l1II1lil & 63 | 128); else {
                    iIlil11i += String.fromCharCode(l1II1lil >> 12 | 224);
                    iIlil11i += String.fromCharCode(l1II1lil >> 6 & 63 | 128);
                    iIlil11i += String.fromCharCode(l1II1lil & 63 | 128);
                }
            }
        }

        return iIlil11i;
    }

    ["_base64Encode"](Ii1IilII, IiIIlllI = "KLMNOPQRSTABCDEFGHIJUVWXYZabcdopqrstuvwxefghijklmnyz0123456789+/") {
        var li11IlI1 = "",
            iIlilIi1,
            i111l1Il,
            ilIl1IiI,
            i11I1IiI,
            liliIIii,
            Ii11II1I,
            II1llI1,
            lilIIIII = 0;
        Ii1IilII = this._utf8Encode(Ii1IilII);

        while (lilIIIII < Ii1IilII.length) {
            iIlilIi1 = Ii1IilII.charCodeAt(lilIIIII++);
            i111l1Il = Ii1IilII.charCodeAt(lilIIIII++);
            ilIl1IiI = Ii1IilII.charCodeAt(lilIIIII++);
            i11I1IiI = iIlilIi1 >> 2;
            liliIIii = (iIlilIi1 & 3) << 4 | i111l1Il >> 4;
            Ii11II1I = (i111l1Il & 15) << 2 | ilIl1IiI >> 6;
            II1llI1 = ilIl1IiI & 63;
            if (isNaN(i111l1Il)) Ii11II1I = II1llI1 = 64; else isNaN(ilIl1IiI) && (II1llI1 = 64);
            li11IlI1 = li11IlI1 + IiIIlllI.charAt(i11I1IiI) + IiIIlllI.charAt(liliIIii) + IiIIlllI.charAt(Ii11II1I) + IiIIlllI.charAt(II1llI1);
        }

        while (li11IlI1.length % 4 > 1) li11IlI1 += "=";

        return li11IlI1;
    }

}

module.exports = new ii1lllii();
