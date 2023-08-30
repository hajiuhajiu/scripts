/*
new Env('wxSavePrize');
*/
const got = require("got");
async function wxSavePrize(_0x34629f, _0x30e7e4, _0x39b7d1, _0xeda165, _0x3bc48c, _0x40eb85, _0x282008, _0x423757, _0x4d7299) {
  const _0x1831ec = process.env.WX_ADDRESS ? process.env.WX_ADDRESS : "",
    _0x2f5073 = process.env.WX_ADDRESS_BLOCK ? process.env.WX_ADDRESS_BLOCK : "";
  let _0x19ca44 = [];
  if (_0x1831ec != "") _0x19ca44 = _0x1831ec.split("|");else return false;
  var _0xc2cc91 = Math.floor(Math.random() * _0x19ca44.length);
  if (_0x19ca44[_0xc2cc91] == "") return console.log("❌ 随机抽取到的收货地址信息为空，请正确使用 \"|\" 管道符以用于分割多个收货地址！\n"), false;else _0x19ca44 = _0x19ca44[_0xc2cc91];
  _0x19ca44 = _0x19ca44.split("@");
  if (_0x19ca44.length != 8) return console.log("❌ 随机抽取到的收货地址信息格式存在错误（参数不足或过多）\n"), false;
  for (let _0x4ec723 = 0; _0x4ec723 < 7; _0x4ec723++) {
    if (_0x19ca44[_0x4ec723] == "") {
      return console.log("❌ 随机抽取到的收货地址信息格式存在错误（参数不能为空）\n"), false;
    }
  }
  const _0x305856 = _0x19ca44[0],
    _0x142e4b = _0x19ca44[1],
    _0x150678 = _0x19ca44[2],
    _0x557892 = _0x19ca44[3],
    _0x56ea95 = _0x19ca44[4],
    _0x580f1f = _0x19ca44[5],
    _0x1876c3 = _0x19ca44[6],
    _0x27c5a8 = _0x19ca44[7];
  if (_0x2f5073 != "") {
    let _0x26cfa2 = _0x2f5073.split("@"),
      _0x76be9b = false;
    for (let _0x286e4b of _0x26cfa2) {
      if (_0x423757.includes(_0x286e4b)) {
        console.log("\n🚫 触发（" + _0x286e4b + "）实物奖品自动登记收货地址屏蔽关键词，跳过~\n");
        _0x76be9b = true;
        break;
      }
    }
    if (_0x76be9b) return false;
  }
  const _0x21d651 = _0x34629f.includes("cjhy") ? encodeURIComponent(encodeURIComponent(_0x282008)) : encodeURIComponent(_0x282008),
    _0x2960e8 = _0x34629f.match(/https?:\/\/([^/]+)/)[1],
    _0x40e961 = "venderId=" + _0x40eb85 + "&pin=" + _0x21d651 + "&activityId=" + _0xeda165 + "&actType=" + _0x3bc48c + "&prizeName=" + encodeURIComponent(_0x423757) + "&receiver=" + encodeURIComponent(_0x305856) + "&phone=" + _0x142e4b + "&province=" + encodeURIComponent(_0x150678) + "&city=" + encodeURIComponent(_0x557892) + "&county=" + encodeURIComponent(_0x56ea95) + "&areaCode=" + _0x1876c3 + "&address=" + encodeURIComponent(_0x580f1f) + "&generateId=" + _0x4d7299 + "&postalCode=" + _0x27c5a8;
  let _0x125eef = false;
  try {
    let _0x1213aa = await got.post(_0x34629f + "/wxAddress/save", {
      "headers": {
        "Accept": "application/json",
        "Accept-Encoding": "gzip, deflate, br",
        "Accept-Language": "zh-cn",
        "Connection": "keep-alive",
        "Host": _0x2960e8,
        "Origin": _0x34629f,
        "Content-Type": "application/x-www-form-urlencoded",
        "Referer": _0x34629f + "/wxAddress/save",
        "Cookie": _0x30e7e4,
        "User-Agent": _0x39b7d1
      },
      "body": _0x40e961
    }).json().catch(_0x2f5803 => {
      console.error("🚫 wxSavePrize API请求失败 ➜ (" + _0x2f5803.response.statusCode + " " + _0x2f5803.response.statusMessage + ")\n");
    });
    if (_0x1213aa && _0x1213aa.result) {
      console.log("\n已自动提交收货地址 ✅\n");
      console.log("登记模板：采用第" + (_0xc2cc91 + 1) + "套收货地址信息（随机抽取）");
      console.log("联系信息：" + _0x305856 + " (" + _0x142e4b.replace(/^(\d{3})\d{4}(\d{4})$/, "$1****$2") + "）");
      console.log("");
      _0x125eef = true;
    } else {
      if (_0x1213aa.errorMessage) console.log("🚫 保存收货地址失败 ➜  " + _0x1213aa.errorMessage);else {
        console.log("🚫 保存收货地址失败 ➜  " + JSON.stringify(_0x1213aa));
      }
      console.log("");
    }
  } catch (_0x814ee4) {
    console.log("🚫 保存收货地址异常 ➜  " + _0x814ee4);
  }
  return _0x125eef;
}
module.exports = wxSavePrize;