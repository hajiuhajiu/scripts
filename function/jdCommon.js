const iilli = require("crypto-js/sha1");
class IlllIl {
  ["getUrlParameter"](II11lI, lI1IIi) {
    try {
      const IlllIi = new URL(II11lI),
        iIIiil = IlllIi.searchParams.get(lI1IIi);
      return iIIiil || "";
    } catch {
      return "";
    }
  }
  ["parseUrl"](I1iIIi) {
    try {
      const liiI11 = new URL(I1iIIi);
      return liiI11;
    } catch (ililI1) {
      return console.error("Invalid URL:", ililI1), null;
    }
  }
  ["getResponseCookie"](i1ilII, iIIii1) {
    let lilIII = "";
    if (i1ilII.headers["set-cookie"]) for (let iIIill of i1ilII.headers["set-cookie"]) {
      lilIII += iIIill.split(";")[0].split("=")[0] + "=" + iIIill.split(";")[0].split("=")[1] + ";";
    } else iIIii1 && (lilIII = iIIii1);
    return lilIII;
  }
  ["getCookieValue"](iilii, Ill11i) {
    if (!iilii || !Ill11i) {
      return "";
    }
    var Ill11l = new RegExp(Ill11i + "=" + "([^;]*)" + ";"),
      il1ll = Ill11l.exec(iilii);
    return il1ll && il1ll[1] || "";
  }
  ["parseCookie"](I1il1l) {
    const IIliII = {},
      iiliI = I1il1l.split(";");
    for (const IliIIi of iiliI) {
      const [lI1l1i, i1iil] = IliIIi.trim().split("=");
      IIliII[lI1l1i] = i1iil;
    }
    return IIliII;
  }
  ["genUuid"](i1iii = "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx", I1llIi = "0123456789abcdef") {
    let llI11i = "";
    for (let Ii1iii of i1iii) {
      if (Ii1iii == "x") llI11i += I1llIi.charAt(Math.floor(Math.random() * I1llIi.length));else Ii1iii == "X" ? llI11i += I1llIi.charAt(Math.floor(Math.random() * I1llIi.length)).toUpperCase() : llI11i += Ii1iii;
    }
    return llI11i;
  }
  ["genEp"](iIIilI, il1l1 = "15.1.1") {
    let Ilil1i = {
      "ciphertype": 5,
      "cipher": {
        "ud": this._base64Encode(iilli(iIIilI).toString()),
        "sv": this._base64Encode(il1l1),
        "iad": ""
      },
      "ts": Date.now(),
      "hdid": "JM9F1ywUPwflvMIpYPok0tt5k9kW4ArJEU3lfLhxBqw=",
      "version": "1.0.3",
      "appname": "com.360buy.jdmobile",
      "ridx": -1
    };
    return JSON.stringify(Ilil1i);
  }
  ["genUA"](Iil1iI, II11il = "jd", iIIil1 = {}) {
    const I1il1I = {
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
      II111 = iIIil1?.["ep"] ? iIIil1?.["ep"] : true,
      lI1l1I = iIIil1?.["client"] ? iIIil1?.["client"] : I1il1I[II11il].client,
      lill11 = iIIil1?.["clientVersion"] ? iIIil1?.["clientVersion"] : I1il1I[II11il].clientVersion,
      liI1i1 = ["15.1.1", "14.5.1", "14.4", "14.3", "14.2", "14.1", "14.0.1", "13.2"],
      I11i11 = liI1i1[Math.floor(Math.random() * liI1i1.length)],
      I1llII = "iPhone; CPU iPhone OS " + I11i11.replace(".", "_") + " like Mac OS X",
      Iil1il = lI1l1I == "apple" ? "iPhone" : "android",
      I11i1i = this.genEp(Iil1iI, I11i11),
      l1l1iI = this.genUuid();
    let I1llI1 = [I1il1I[II11il].app, Iil1il, lill11, "", "rn/" + l1l1iI, "M/5.0", "hasUPPay/0", "pushNoticeIsOpen/0", "lang/zh_CN", "hasOCPay/0", "appBuild/" + I1il1I[II11il].appBuild, "supportBestPay/0", "jdSupportDarkMode/0", "ef/1", II111 ? "ep/" + encodeURIComponent(I11i1i) : "", "Mozilla/5.0 (" + I1llII + ") AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148", "supportJDSHWK/1", ""];
    return I1llI1.join(";");
  }
  ["_utf8Encode"](iliIiI) {
    iliIiI = iliIiI.replace(/rn/g, "n");
    for (var Il1i1l = 0; Il1i1l < iliIiI.length; Il1i1l++) {
      var Iil1ii = "",
        lill1I = iliIiI.charCodeAt(Il1i1l);
      if (lill1I < 128) {
        Iil1ii += String.fromCharCode(lill1I);
      } else {
        if (lill1I > 127 && lill1I < 2048) {
          Iil1ii += String.fromCharCode(lill1I >> 6 | 192);
          Iil1ii += String.fromCharCode(lill1I & 63 | 128);
        } else {
          Iil1ii += String.fromCharCode(lill1I >> 12 | 224);
          Iil1ii += String.fromCharCode(lill1I >> 6 & 63 | 128);
          Iil1ii += String.fromCharCode(lill1I & 63 | 128);
        }
      }
    }
    return Iil1ii;
  }
  ["_base64Encode"](i1lli1, llIlII) {
    llIlII = llIlII || "KLMNOPQRSTABCDEFGHIJUVWXYZabcdopqrstuvwxefghijklmnyz0123456789+/";
    var lIIiII = "",
      i1iIlI,
      li111,
      liI1lI,
      lIIiI1,
      ll1I1,
      Ii1ili,
      iI1Ii1,
      Ii1ill = 0;
    i1lli1 = this._utf8Encode(i1lli1);
    while (Ii1ill < i1lli1.length) {
      i1iIlI = i1lli1.charCodeAt(Ii1ill++);
      li111 = i1lli1.charCodeAt(Ii1ill++);
      liI1lI = i1lli1.charCodeAt(Ii1ill++);
      lIIiI1 = i1iIlI >> 2;
      ll1I1 = (i1iIlI & 3) << 4 | li111 >> 4;
      Ii1ili = (li111 & 15) << 2 | liI1lI >> 6;
      iI1Ii1 = liI1lI & 63;
      if (isNaN(li111)) {
        Ii1ili = iI1Ii1 = 64;
      } else isNaN(liI1lI) && (iI1Ii1 = 64);
      lIIiII = lIIiII + llIlII.charAt(lIIiI1) + llIlII.charAt(ll1I1) + llIlII.charAt(Ii1ili) + llIlII.charAt(iI1Ii1);
    }
    while (lIIiII.length % 4 > 1) lIIiII += "=";
    return lIIiII;
  }
}
module.exports = new IlllIl();