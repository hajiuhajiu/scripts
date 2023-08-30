const IiI1I = require("crypto-js");
function illlIl(i11ill, IIIIIi, IIIIIl = {}) {
  function IIIl1i(il1iIl) {
    il1iIl = il1iIl.replace(/rn/g, "n");
    var il1iIi = "";
    for (var iii1il = 0; iii1il < il1iIl.length; iii1il++) {
      var II11li = il1iIl.charCodeAt(iii1il);
      if (II11li < 128) il1iIi += String.fromCharCode(II11li);else {
        if (II11li > 127 && II11li < 2048) {
          il1iIi += String.fromCharCode(II11li >> 6 | 192);
          il1iIi += String.fromCharCode(II11li & 63 | 128);
        } else {
          il1iIi += String.fromCharCode(II11li >> 12 | 224);
          il1iIi += String.fromCharCode(II11li >> 6 & 63 | 128);
          il1iIi += String.fromCharCode(II11li & 63 | 128);
        }
      }
    }
    return il1iIi;
  }
  function liiII1(ililIl, liiI1l) {
    liiI1l = liiI1l || "KLMNOPQRSTABCDEFGHIJUVWXYZabcdopqrstuvwxefghijklmnyz0123456789+/";
    var lilIIi = "";
    var i1l1Il, llIli, i1i11l, i1i11i, II11l1, Iil1lI, IiiliI;
    var I1l11l = 0;
    ililIl = IIIl1i(ililIl);
    while (I1l11l < ililIl.length) {
      i1l1Il = ililIl.charCodeAt(I1l11l++);
      llIli = ililIl.charCodeAt(I1l11l++);
      i1i11l = ililIl.charCodeAt(I1l11l++);
      i1i11i = i1l1Il >> 2;
      II11l1 = (i1l1Il & 3) << 4 | llIli >> 4;
      Iil1lI = (llIli & 15) << 2 | i1i11l >> 6;
      IiiliI = i1i11l & 63;
      if (isNaN(llIli)) Iil1lI = IiiliI = 64;else {
        if (isNaN(i1i11l)) {
          IiiliI = 64;
        }
      }
      lilIIi = lilIIi + liiI1l.charAt(i1i11i) + liiI1l.charAt(II11l1) + liiI1l.charAt(Iil1lI) + liiI1l.charAt(IiiliI);
    }
    while (lilIIi.length % 4 > 1) lilIIi += "=";
    return lilIIi;
  }
  const IIIl1l = IIIIIi || "jd",
    lllll = {
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
    };
  if (!lllll[IIIl1l]) {
    console.log("获取[" + IIIl1l + "]UA失败");
    return;
  }
  const i11ili = IIIIIl?.["ep"] ? IIIIIl?.["ep"] : true,
    iil1l1 = IIIIIl?.["client"] ? IIIIIl?.["client"] : lllll[IIIl1l].client,
    lllli = IIIIIl?.["clientVersion"] ? IIIIIl?.["clientVersion"] : lllll[IIIl1l].clientVersion,
    iiili1 = ["15.1.1", "14.5.1", "14.4", "14.3", "14.2", "14.1", "14.0.1", "13.2"],
    ill11i = iiili1[Math.floor(Math.random() * iiili1.length)],
    lllill = "iPhone; CPU iPhone OS " + ill11i.replace(".", "_") + " like Mac OS X",
    ill11l = iil1l1 == "apple" ? "iPhone" : "android",
    I1lIiI = JSON.stringify({
      "ciphertype": 5,
      "cipher": {
        "ud": liiII1(IiI1I.SHA1(i11ill).toString()),
        "sv": liiII1(ill11i),
        "iad": ""
      },
      "ts": Date.now(),
      "hdid": "JM9F1ywUPwflvMIpYPok0tt5k9kW4ArJEU3lfLhxBqw=",
      "version": "1.0.3",
      "appname": "com.360buy.jdmobile",
      "ridx": -1
    });
  let lllili = "";
  for (let II11lI of "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx") {
    if (II11lI == "x") lllili += "0123456789abcdef".charAt(Math.floor(Math.random() * "0123456789abcdef".length));else {
      if (II11lI == "X") lllili += "0123456789abcdef".charAt(Math.floor(Math.random() * "0123456789abcdef".length)).toUpperCase();else {
        lllili += II11lI;
      }
    }
  }
  let IliiiI = [lllll[IIIl1l].app, ill11l, lllli, "", "rn/" + lllili, "M/5.0", "hasUPPay/0", "pushNoticeIsOpen/0", "lang/zh_CN", "hasOCPay/0", "appBuild/" + lllll[IIIl1l].appBuild, "supportBestPay/0", "jdSupportDarkMode/0", "ef/1", i11ili ? "ep/" + encodeURIComponent(I1lIiI) : "", "Mozilla/5.0 (" + lllill + ") AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148", "supportJDSHWK/1", ""];
  return IliiiI.join(";");
}
module.exports = illlIl;