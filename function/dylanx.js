const _0x45d0c8 = require("crypto-js");
function _0x2fc1f5(_0x2982c0 = "") {
    return _0x2982c0;
}
function _0x44f129(_0xe4b106) {
    let _0x132d16 = [];
    for (let _0x17def4 of _0xe4b106.split("")) {
        let _0x10ebdc = _0x17def4.charCodeAt();
        _0x132d16 = _0x132d16.concat([(_0x10ebdc & 128) >> 7, (_0x10ebdc & 64) >> 6, (_0x10ebdc & 32) >> 5, (_0x10ebdc & 16) >> 4, (_0x10ebdc & 8) >> 3, (_0x10ebdc & 4) >> 2, (_0x10ebdc & 2) >> 1, _0x10ebdc & 1]);
    }
    return _0x132d16;
}
function _0x265eaa(_0x4b4834) {
    let _0x19e7cb = Array.from({
        "length": parseInt(_0x4b4834.length / 8)
    }).map(_0x2bcc5f => 0);
    for (let _0x2d9557 in _0x19e7cb) {
        _0x19e7cb[_0x2d9557] = _0x4b4834[_0x2d9557 * 8] << 7 | _0x4b4834[_0x2d9557 * 8 + 1] << 6 | _0x4b4834[_0x2d9557 * 8 + 2] << 5 | _0x4b4834[_0x2d9557 * 8 + 3] << 4 | _0x4b4834[_0x2d9557 * 8 + 4] << 3 | _0x4b4834[_0x2d9557 * 8 + 5] << 2 | _0x4b4834[_0x2d9557 * 8 + 6] << 1 | _0x4b4834[_0x2d9557 * 8 + 7];
    }
    return _0x2fc1f5(_0x19e7cb);
}
function _0x515c33(_0x5c43c2) {
    let _0x8ce7ff = [55, 146, 68, 104, 165, 61, 204, 127, 187, 15, 217, 136, 238, 154, 233, 90];
    let _0x308861 = "80306f4370b39fd5630ad0529f77adb6";
    const _0x189e34 = {
        "length": _0x5c43c2.length
    };
    let _0x204dfd = Array.from(_0x189e34).map(_0x326561 => 0),
        _0x548cba,
        _0x537923,
        _0x5a7a70,
        _0x715ab1;
    for (i in _0x204dfd) {
        _0x548cba = _0x5c43c2[i].charCodeAt();
        _0x5a7a70 = _0x8ce7ff[i & 15];
        _0x715ab1 = _0x308861[i & 7].charCodeAt();
        _0x548cba = _0x5a7a70 ^ _0x548cba;
        _0x548cba = _0x548cba ^ _0x715ab1;
        _0x548cba = _0x548cba + _0x5a7a70;
        _0x5a7a70 = _0x5a7a70 ^ _0x548cba;
        _0x537923 = _0x308861[i & 7].charCodeAt();
        _0x5a7a70 = _0x5a7a70 ^ _0x537923;
        _0x204dfd[i] = _0x5a7a70 & 255;
    }
    return _0x2fc1f5(_0x204dfd);
}
function _0x44488d(_0x3ec985) {
    let _0x45e279 = [[0, 0], [1, 4], [2, 61], [3, 15], [4, 56], [5, 40], [6, 6], [7, 59], [8, 62], [9, 58], [10, 17], [11, 2], [12, 12], [13, 8], [14, 32], [15, 60], [16, 13], [17, 45], [18, 34], [19, 14], [20, 36], [21, 21], [22, 22], [23, 39], [24, 23], [25, 25], [26, 26], [27, 20], [28, 1], [29, 33], [30, 46], [31, 55], [32, 35], [33, 24], [34, 57], [35, 19], [36, 53], [37, 37], [38, 38], [39, 5], [40, 30], [41, 41], [42, 42], [43, 18], [44, 47], [45, 27], [46, 9], [47, 44], [48, 51], [49, 7], [50, 49], [51, 63], [52, 28], [53, 43], [54, 54], [55, 52], [56, 31], [57, 10], [58, 29], [59, 11], [60, 3], [61, 16], [62, 50], [63, 48]],
        _0x24fcb8 = _0x44f129(_0x3ec985),
        _0x17fedf = Array.from({
            "length": _0x24fcb8.length
        }).map(_0x14c4fb => 0);
    for (let _0x217a7c in _0x17fedf) {
        _0x17fedf[_0x45e279[_0x217a7c][1]] = _0x24fcb8[_0x45e279[_0x217a7c][0]];
    }
    return _0x265eaa(_0x17fedf);
}
function _0x291d75(_0x12ae6d) {
    let _0x9f9424 = [[0, 6, 0, 1], [1, 4, 1, 0], [2, 5, 0, 1], [3, 0, 0, 1], [4, 2, 0, 1], [5, 3, 0, 1], [6, 1, 1, 0], [7, 7, 0, 1]],
        _0x46a522 = _0x44f129(_0x12ae6d),
        _0x1f60ed = [0, 0, 0, 0, 0, 0, 0, 0];
    for (var _0x4964fd in _0x1f60ed) {
        _0x46a522[_0x4964fd] == 0 ? _0x1f60ed[_0x9f9424[_0x4964fd][1]] = _0x9f9424[_0x4964fd][2] : _0x1f60ed[_0x9f9424[_0x4964fd][1]] = _0x9f9424[_0x4964fd][3];
    }
    return _0x265eaa(_0x1f60ed);
}
function _0x233e39(_0x5de7f1) {
    let _0x195eb7 = [];
    for (let _0x56bb1f = 0; _0x56bb1f < _0x5de7f1.length; _0x56bb1f += 8) {
        let _0x57e354 = _0x5de7f1.slice(_0x56bb1f, _0x56bb1f + 8);
        _0x57e354.length == 1 ? _0x195eb7 = _0x195eb7.concat(_0x291d75(_0x57e354)) : _0x195eb7 = _0x195eb7.concat(_0x44488d(_0x57e354));
    }
    return _0x195eb7;
}
function _0x34012b(_0x2d3c4f, _0x29d1af, _0x1cc8d6) {
    let _0x2a88fe = [0, 1, 2];
    _0x1cc8d6 == 1 && (_0x2a88fe = [1, 2, 0]);
    _0x1cc8d6 == 2 && (_0x2a88fe = [2, 0, 1]);
    let _0x1aab6d = _0x2a88fe[_0x29d1af];
    if (_0x1aab6d == 0) {
        return _0x233e39(_0x2d3c4f);
    }
    if (_0x1aab6d == 2) {
        return _0x515c33(_0x2d3c4f);
    }
}
function _0x637bce(_0x40a230, _0x429a5d, _0x462591) {
    let _0x571046 = __filename.split(/[\\/]/).pop(),
        _0x319f75 = __dirname.split(/[\\/]/).pop();
    let _0x2e7902 = "android",
        _0x1b6cc6 = "11.2.2",
        _0x27006c = [[0, 0], [0, 2], [1, 1], [1, 2], [2, 0], [2, 1]],
        _0x1dc3b2,
        _0x230e6d;
    [_0x1dc3b2, _0x230e6d] = _0x27006c[Math.floor(Math.random() * _0x27006c.length)];
    let _0x237d67 = "1" + _0x1dc3b2 + _0x230e6d,
        _0x58b277 = new Date().getTime();
    _0x429a5d = typeof _0x429a5d == "string" ? _0x429a5d : JSON.stringify(_0x429a5d);
    let _0x252ed1 = new Buffer.from(_0x429a5d).toString("latin1"),
        _0xf7377c = _0x45d0c8.MD5(_0x462591 ? String(_0x462591) : String(Date.now())).toString().substring(0, 30 - (_0x40a230 + _0x252ed1).length % 8),
        _0x90f593 = "functionId=" + _0x40a230 + "&body=" + _0x252ed1 + "&uuid=" + _0xf7377c + "&client=" + _0x2e7902 + "&clientVersion=" + _0x1b6cc6 + "&st=" + _0x58b277 + "&sv=" + _0x237d67,
        _0x2937af = _0x34012b(_0x90f593, _0x1dc3b2, _0x230e6d),
        _0x3399c9 = new Buffer.from(_0x2937af).toString("base64");
    if (_0x571046 !== "dylanx.js" || _0x319f75 !== "function") {
        _0x3399c9 = _0x3399c9 + "BAGA";
    }
    let _0x1e0d0c = _0x45d0c8.MD5(_0x3399c9).toString();
    return "body=" + encodeURIComponent(_0x429a5d) + "&client=" + _0x2e7902 + "&clientVersion=" + _0x1b6cc6 + "&uuid=" + _0xf7377c + "&st=" + _0x58b277 + "&sign=" + _0x1e0d0c + "&sv=" + _0x237d67;
}
const _0x553326 = {
    "getbody": _0x637bce
};
module.exports = _0x553326;