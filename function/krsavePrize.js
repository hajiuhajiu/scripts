/*
new Env('savePrize');
全品类填地址通用依赖
*/
const IllI1I = require("got");
async function liIii(i11I1I) {
  const {
      baseUrl: ll1,
      cookie: iI1llI,
      ua: llliii,
      activityId: IllI11,
      activityType: l1llIi,
      venderId: II1llI,
      secretPin: i11I11,
      prizeName: l1llIl,
      generateId: ii1I1l
    } = i11I1I,
    ii1I1i = process.env.WX_ADDRESS || "",
    llI = process.env.WX_ADDRESS_BLOCK || "";
  if (ii1I1i === "") return false;
  const llliI = ii1I1i.split("|"),
    iI1li1 = Math.floor(Math.random() * llliI.length);
  if (llliI[iI1li1] === "") return console.log("❌ 随机抽取到的收货地址信息为空，请正确使用 \"|\" 管道符以用于分割多个收货地址！\n"), false;
  const [lllii1, liIli, liIll, IilIi1, iI1liI, l1lIiI, llliiI, IilIiI] = llliI[iI1li1].split("@");
  if (IilIiI === undefined) return console.log("❌ 随机抽取到的收货地址信息格式存在错误（参数不足或过多）\n"), false;
  for (let I1lIl1 = 0; I1lIl1 < 7; I1lIl1++) {
    if (llliI[I1lIl1] === "") return console.log("❌ 随机抽取到的收货地址信息格式存在错误（参数不能为空）\n"), false;
  }
  if (llI !== "") {
    const IlIIl = llI.split("@");
    if (IlIIl.some(lI1liI => l1llIl.includes(lI1liI))) return console.log("\n🚫 触发实物奖品自动登记收货地址屏蔽关键词，跳过~\n"), false;
  }
  const i1i1I1 = ll1.includes("cjhy") ? encodeURIComponent(encodeURIComponent(i11I11)) : encodeURIComponent(i11I11),
    IlII1 = ll1.match(/https?:\/\/([^/]+)/)[1],
    IiI11 = "venderId=" + II1llI + "&pin=" + i1i1I1 + "&activityId=" + IllI11 + "&actType=" + l1llIi + "&prizeName=" + encodeURIComponent(l1llIl) + "&receiver=" + encodeURIComponent(lllii1) + "&phone=" + liIli + "&province=" + encodeURIComponent(liIll) + "&city=" + encodeURIComponent(IilIi1) + "&county=" + encodeURIComponent(iI1liI) + "&areaCode=" + llliiI + "&address=" + encodeURIComponent(l1lIiI) + "&generateId=" + ii1I1l + "&postalCode=" + IilIiI;
  try {
    const lllii = await IllI1I.post(ll1 + "/wxAddress/save", {
      "headers": {
        "Accept": "application/json",
        "Accept-Encoding": "gzip, deflate, br",
        "Accept-Language": "zh-cn",
        "Connection": "keep-alive",
        "Host": IlII1,
        "Origin": ll1,
        "Content-Type": "application/x-www-form-urlencoded",
        "Referer": ll1 + "/wxAddress/save",
        "Cookie": iI1llI,
        "User-Agent": llliii
      },
      "body": IiI11
    }).json();
    if (lllii && lllii.result) {
      console.log("\n已自动提交收货地址 ✅\n");
      console.log("登记模板：采用第" + (iI1li1 + 1) + "套收货地址信息（随机抽取）");
      console.log("联系信息：" + lllii1 + " (" + liIli.replace(/^(\d{3})\d{4}(\d{4})$/, "$1****$2") + "）");
      console.log("");
      return true;
    } else {
      console.log("🚫 保存收货地址失败 ➜  " + (lllii.errorMessage || JSON.stringify(lllii)));
    }
  } catch (iI11Il) {
    console.log("🚫 保存收货地址异常 ➜  " + iI11Il);
  }
  return false;
}
async function II1ll1(iIII1i) {
  const {
      baseUrl: il1i11,
      cookie: IlIll1,
      ua: IlIII,
      token: ilil1l,
      prizeName: illlIi,
      orderCode: I1lIii
    } = iIII1i,
    IiI1I = process.env.WX_LOREAL_ADDRESS ? process.env.WX_LOREAL_ADDRESS : "",
    illlIl = process.env.WX_ADDRESS_BLOCK ? process.env.WX_ADDRESS_BLOCK : process.env.WX_LOREAL_ADDRESS_BLOCK ? process.env.WX_LOREAL_ADDRESS_BLOCK : "";
  if (IiI1I === "") return false;
  const i11ill = IiI1I.split("|"),
    IIIIIi = Math.floor(Math.random() * i11ill.length);
  if (i11ill[IIIIIi] === "") return console.log("❌ 随机抽取到的收货地址信息为空，请正确使用 \"|\" 管道符以用于分割多个收货地址！\n"), false;
  const [IIIIIl, I1lIil, IIIl1i, liiII1, IIIl1l, lllll] = i11ill[IIIIIi].split("@");
  for (let llllI = 0; llllI < 6; llllI++) {
    if (i11ill[llllI] === "") {
      return console.log("❌ 随机抽取到的收货地址信息格式存在错误（参数不能为空）\n"), false;
    }
  }
  if (illlIl !== "") {
    const ii1iiI = illlIl.split("@");
    if (ii1iiI.some(lllilI => illlIi.includes(lllilI))) return console.log("\n🚫 触发实物奖品自动登记收货地址屏蔽关键词，跳过~\n"), false;
  }
  const i11ili = il1i11.match(/https?:\/\/([^/]+)/)[1],
    iil1l1 = {
      "realName": IIIIIl,
      "mobile": I1lIil,
      "address": lllll,
      "orderCode": I1lIii,
      "province": IIIl1i,
      "city": liiII1,
      "county": IIIl1l
    };
  let lllli = false;
  try {
    const I1lIi1 = await IllI1I.post(il1i11 + "/prod/cc/interactsaas/api/my/prize/update", {
      "headers": {
        "Accept": "application/json",
        "Accept-Encoding": "gzip, deflate, br",
        "Accept-Language": "zh-cn",
        "Connection": "keep-alive",
        "Host": i11ili,
        "Origin": il1i11,
        "Content-Type": "application/json;charset=UTF-8",
        "Referer": il1i11 + "/prod/cc/interactsaas/api/my/prize/update",
        "token": ilil1l,
        "Cookie": IlIll1,
        "User-Agent": IlIII
      },
      "json": iil1l1
    });
    I1lIi1 && I1lIi1.resp_code === 0 ? (console.log("\n已自动提交收货地址 ✅\n"), console.log("登记模板：采用第" + (IIIIIi + 1) + "套收货地址信息（随机抽取）"), console.log("联系信息：" + IIIIIl + " (" + I1lIil.replace(/^(\d{3})\d{4}(\d{4})$/, "$1****$2") + "）"), console.log(""), lllli = true) : console.log("🚫 保存收货地址失败 ➜  " + (I1lIi1.resp_msg || JSON.stringify(I1lIi1)));
  } catch (lil11I) {
    console.log("🚫 保存收货地址异常 ➜  " + lil11I);
  }
  return lllli;
}
async function IlI1Ii(Iliii1, iIiIi, iil1ll, iiilil, iil1li, lillIl, iIiIl, iiilii, li1i1i) {
  const illIiI = process.env.WX_ADDRESS || "",
    lI1lli = process.env.WX_ADDRESS_BLOCK ? process.env.WX_ADDRESS_BLOCK : "";
  let Ill1l = [];
  if (illIiI != "") Ill1l = illIiI.split("|");else return false;
  var llI1Il = Math.floor(Math.random() * Ill1l.length);
  if (Ill1l[llI1Il] == "") {
    return console.log("❌ 随机抽取到的收货地址信息为空，请正确使用 \"|\" 管道符以用于分割多个收货地址！\n"), false;
  } else Ill1l = Ill1l[llI1Il];
  Ill1l = Ill1l.split("@");
  if (Ill1l.length != 8) return console.log("❌ 随机抽取到的收货地址信息格式存在错误（参数不足或过多）\n"), false;
  for (let I1lIlI = 0; I1lIlI < 7; I1lIlI++) {
    if (Ill1l[I1lIlI] == "") {
      return console.log("❌ 随机抽取到的收货地址信息格式存在错误（参数不能为空）\n"), false;
    }
  }
  const ii1iii = Ill1l[0],
    i11iil = Ill1l[1],
    Ill1i = Ill1l[2],
    ii1iil = Ill1l[3],
    lllI1l = Ill1l[4],
    i11iii = Ill1l[5],
    llI1Ii = Ill1l[6],
    lllI1i = Ill1l[7];
  if (lI1lli != "") {
    let lIli1l = lI1lli.split("@"),
      lillIi = false;
    for (let illIi1 of lIli1l) {
      if (iiilii.includes(illIi1)) {
        console.log("\n🚫 触发（" + illIi1 + "）实物奖品自动登记收货地址屏蔽关键词，跳过~\n");
        lillIi = true;
        break;
      }
    }
    if (lillIi) return false;
  }
  const li1i1l = Iliii1.includes("cjhy") ? encodeURIComponent(encodeURIComponent(iIiIl)) : encodeURIComponent(iIiIl),
    II1i1 = Iliii1.match(/https?:\/\/([^/]+)/)[1],
    lI1lll = "venderId=" + lillIl + "&pin=" + li1i1l + "&activityId=" + iiilil + "&actType=" + iil1li + "&prizeName=" + encodeURIComponent(iiilii) + "&receiver=" + encodeURIComponent(ii1iii) + "&phone=" + i11iil + "&province=" + encodeURIComponent(Ill1i) + "&city=" + encodeURIComponent(ii1iil) + "&county=" + encodeURIComponent(lllI1l) + "&areaCode=" + llI1Ii + "&address=" + encodeURIComponent(i11iii) + "&generateId=" + li1i1i + "&postalCode=" + lllI1i;
  let iIiII = false;
  try {
    let ii1ili = await IllI1I.post(Iliii1 + "/wxAddress/save", {
      "headers": {
        "Accept": "application/json",
        "Accept-Encoding": "gzip, deflate, br",
        "Accept-Language": "zh-cn",
        "Connection": "keep-alive",
        "Host": II1i1,
        "Origin": Iliii1,
        "Content-Type": "application/x-www-form-urlencoded",
        "Referer": Iliii1 + "/wxAddress/save",
        "Cookie": iIiIi,
        "User-Agent": iil1ll
      },
      "body": lI1lll
    }).json().catch(liil1i => {
      console.error("🚫 wxSavePrize API请求失败 ➜ (" + liil1i.response.statusCode + " " + liil1i.response.statusMessage + ")\n");
    });
    ii1ili && ii1ili.result ? (console.log("\n已自动提交收货地址 ✅\n"), console.log("登记模板：采用第" + (llI1Il + 1) + "套收货地址信息（随机抽取）"), console.log("联系信息：" + ii1iii + " (" + i11iil.replace(/^(\d{3})\d{4}(\d{4})$/, "$1****$2") + "）"), console.log(""), iIiII = true) : (ii1ili.errorMessage ? console.log("🚫 保存收货地址失败 ➜  " + ii1ili.errorMessage) : console.log("🚫 保存收货地址失败 ➜  " + JSON.stringify(ii1ili)), console.log(""));
  } catch (liil1l) {
    console.log("🚫 保存收货地址异常 ➜  " + liil1l);
  }
  return iIiII;
}
module.exports = {
  "wxSavePrize": IlI1Ii,
  "wuxian_savePrize": liIii,
  "loreal_savePrize": II1ll1
};