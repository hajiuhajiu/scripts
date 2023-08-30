const _0x8da1c6 = require("ds").DS,
  _0x269d6c = require("got");
const _0x135f1b = require("./dylanx");
class _0x392694 {
  constructor(_0x546231 = 0, _0x4e2f43 = null) {
    this.ttl = _0x546231 || 0;
    this.file = _0x4e2f43;
    _0x4e2f43 ? this.data = new _0x8da1c6(_0x4e2f43) : this.data = new _0x8da1c6();
  }
  ["now"]() {
    return new Date().getTime();
  }
  ["_0x5c09x3e"]() {
    if (this.file) {
      this.data.save(this.file);
    }
    return this;
  }
  ["_0x5c09x3f"](_0x5417ed) {
    delete this.data[_0x5417ed];
    this._0x5c09x3e();
    return this;
  }
  ["get"](_0x2420ed, _0x136bf3) {
    let _0xf58704 = null,
      _0x157cb0 = this.data[_0x2420ed];
    if (_0x157cb0) {
      if (_0x157cb0.expires == 0 || this.now() < _0x157cb0.expires) {
        _0xf58704 = _0x157cb0.val;
      } else {
        _0xf58704 = null;
        this._0x5c09x3f(_0x2420ed);
      }
    }
    if (_0x136bf3) {
      _0x136bf3(_0xf58704);
    }
    return _0xf58704;
  }
  ["del"](_0x406631, _0x5b8082) {
    let _0x596e78 = this.get(_0x406631);
    this._0x5c09x3f(_0x406631);
    _0x5b8082 && _0x5b8082(_0x596e78);
    return _0x596e78;
  }
  ["put"](_0x208090, _0x224d4d = null, _0x497e3e = 0, _0x516146) {
    if (_0x497e3e == 0) {
      _0x497e3e = this.ttl;
    }
    let _0x33557b = _0x497e3e == 0 ? 0 : this.now() + _0x497e3e;
    var _0x5afbe5 = this.del(_0x208090);
    if (_0x224d4d !== null) {
      const _0x24ccdd = {
        "expires": _0x33557b,
        "val": _0x224d4d
      };
      this.data[_0x208090] = _0x24ccdd;
      this._0x5c09x3e();
    }
    _0x516146 && _0x516146(_0x5afbe5);
    return _0x5afbe5;
  }
}
let _0x3093cd = 900000;
let _0xa9835e = new _0x392694(_0x3093cd, __dirname + "/cache/token.json");
function _0x444e77(_0x2880da = "", _0xffc8ed) {
  let _0x5a261a = _0xffc8ed.exec(_0x2880da);
  if (_0x5a261a && _0x5a261a.length > 0) {
    return _0x5a261a[0].trim();
  }
  return "";
}
function _0x5c9c65(_0x3beda2, _0x13f811) {
  let _0x43b85d = new Date().getHours();
  if (_0x43b85d >= 0 && _0x43b85d <= 3) {
    return _0x3beda2;
  }
  return _0x3beda2 + "_" + _0x13f811;
}
function _0x424449(_0x39b03e) {
  return new Promise(_0x5b8759 => setTimeout(_0x5b8759, _0x39b03e));
}
async function _0xbb5e87(_0x45f1bf, _0x205c87) {
  let _0x162c92 = "";
  try {
    let _0x263cb4 = _0x444e77(_0x45f1bf, /(?<=pt_pin=)([^;]+)/);
    if (_0x263cb4) {
      let _0x3afed7 = _0x5c9c65(_0x263cb4, _0x205c87);
      _0x162c92 = _0xa9835e.get(_0x3afed7) || "";
      if (_0x162c92 === "") {
        const _0x4da6c0 = {
          "url": _0x205c87,
          "id": ""
        };
        let _0x30e012 = _0x135f1b.getbody("isvObfuscator", _0x4da6c0),
          _0x26b938 = await _0x269d6c.post("https://api.m.jd.com/client.action?functionId=isvObfuscator", {
            "headers": {
              "Host": "api.m.jd.com",
              "Content-Type": "application/x-www-form-urlencoded",
              "Cookie": _0x45f1bf,
              "User-Agent": "JD4iPhone/167650 (iPhone; iOS 13.7; Scale/3.00)",
              "Accept-Language": "zh-Hans-CN;q=1",
              "Accept-Encoding": "gzip, deflate, br"
            },
            "body": _0x30e012
          }).json().catch(async _0x1890dc => {
            if (_0x1890dc.response) {
              console.log("🚫 getToken API请求失败 ➜ Response code " + (_0x1890dc.response.statusCode || "") + " (" + (_0x1890dc.response.statusMessage || "") + ")");
            } else {
              console.log("🚫 getToken API请求失败\n" + (_0x1890dc.message || "") + "\n");
            }
          });
        if (_0x26b938) {
          if (_0x26b938.code === "0") {
            _0x162c92 = _0x26b938.token;
            _0xa9835e.put(_0x3afed7, _0x162c92, _0x3093cd);
            console.log("获取token成功\n");
          } else {
            _0x26b938.code === "3" && _0x26b938.errcode === 264 ? console.log("🚫 getToken API请求失败 ➜ 账号无效") : console.log("🚫 getToken API接口返回异常 ➜ " + JSON.stringify(_0x26b938));
          }
        }
      } else {
        console.log("已读取本地缓存token\n");
      }
    }
  } catch (_0x2c0d3f) {
    console.log(_0x2c0d3f);
    console.log("getToken API请求失败");
  }
  return _0x162c92;
}
module.exports = _0xbb5e87;