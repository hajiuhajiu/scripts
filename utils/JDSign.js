/*
by、TY
根据Python版本修改而来
调用方法：
const {get_sign} = require('./utils/JDSign.js');
console.log(get_sign("getCommentList",{"bizType":"1","content":"2","evaAuraVersion":22},"android","11.2.8"));
*/
const CryptoJS = require("crypto-js");

function md5(encryptString) {
    return CryptoJS.MD5(encryptString).toString()
}

function getUUID(x = "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx", t = 0) {
    if (typeof x == "number") x = new Array(x).join('x')
    return x.replace(/[xy]/g, function (x) {
        var r = (16 * Math.random()) | 0,
            n = "x" == x ? r : (3 & r) | 8;
        return (uuid = t ? n.toString(36).toUpperCase() : n.toString(36)), uuid;
    });
}

function mt_rand(min, max) {
    return Math.min(Math.floor(min + Math.random() * (max - min)), max);
}

function isset(e) {
    return typeof e != "undefined";
}

function array_rand(e) {
    return mt_rand(0, e.length - 1);
}

function base64_decode(string) {
    return Buffer.from(string, 'base64').toString();
}

function base64_encode(string) {
    return Buffer.from(string).toString('base64');
}

const $maketrans = { 'K': 'A', 'L': 'B', 'M': 'C', 'N': 'D', 'O': 'E', 'P': 'F', 'Q': 'G', 'R': 'H', 'S': 'I', 'T': 'J', 'A': 'K', 'B': 'L', 'C': 'M', 'D': 'N', 'E': 'O', 'F': 'P', 'G': 'Q', 'H': 'R', 'I': 'S', 'J': 'T', 'o': 'e', 'p': 'f', 'q': 'g', 'r': 'h', 's': 'i', 't': 'j', 'u': 'k', 'v': 'l', 'w': 'm', 'x': 'n', 'e': 'o', 'f': 'p', 'g': 'q', 'h': 'r', 'i': 's', 'j': 't', 'k': 'u', 'l': 'v', 'm': 'w', 'n': 'x' };

function translate(str) {
    let $newStr = "";
    for (let i = 0, l = str.length, c; i < l; i++) {
        c = str.substr(i, 1);
        if (isset($maketrans[c])) {
            $newStr += $maketrans[c];
        } else $newStr += c;
    }
    return $newStr;
}

function base64Encode(string) {
    return translate(base64_encode(string));
}

function base64Decode(string) {
    return base64_decode(translate(string));
}

function randomstr(e) {
    e = e || 32;
    let t = "abcdefghijklmnopqrstuvwxyz0123456789", a = t.length, n = "";
    for (let i = 0; i < e; i++)
        n += t.charAt(Math.floor(Math.random() * a));
    return n
}

function sign_core(inarg) {
    let $key = "80306f4370b39fd5630ad0529f77adb6".split(""),
        $mask = [0x37, 0x92, 0x44, 0x68, 0xA5, 0x3D, 0xCC, 0x7F, 0xBB, 0xF, 0xD9, 0x88, 0xEE, 0x9A, 0xE9, 0x5A],
        $array = [];
    let str = "";
    for (let i = 0, l = inarg.length, r0, r1, r2; i < l; i++) {
        r0 = inarg.substr(i, 1).charCodeAt();
        r1 = $mask[i & 0xf];
        r2 = $key[i & 7].charCodeAt();
        r0 = r1 ^ r0;
        r0 = r0 ^ r2;
        r0 = r0 + r1;
        r1 = r1 ^ r0;
        r1 = r1 ^ r2;
        $array[i] = r1 & 0xff
        str += String.fromCharCode($array[i]);
    }
    return str;
}

function randomeid() {
    return "eidAaf8081218as20a2GM" + randomstr(20) + "7FnfQYOecyDYLcd0rfzm3Fy2ePY4UJJOeV0Ub840kG8C7lmIqt3DTlc11fB/s4qsAP8gtPTSoxu";
}

function get_ep($jduuid = "", $area = "") {//uiid和地区代码
    if (!$jduuid) $jduuid = getUUID(16);
    let $ts = new Date().getTime(),
        $bsjduuid = base64Encode($jduuid);
    //$ts=1643792319938
    if (!$area) $area = base64Encode([mt_rand(1, 10000), mt_rand(1, 10000), mt_rand(1, 10000), mt_rand(1, 10000)].join('_'));
    let $array = ['Mi11Ultra', 'Mi11', 'Mi10'],
        $d_model = base64Encode($array[array_rand($array)]);
    return [`{"hdid":"JM9F1ywUPwflvMIpYPok0tt5k9kW4ArJEU3lfLhxBqw=","ts":${$ts - mt_rand(100, 1000)},"ridx":-1,"cipher":{"area":"${$area}","d_model":"${$d_model}","wifiBssid":"dW5hbw93bq==","osVersion":"CJS=","d_brand":"WQvrb21f","screen":"CtS1DIenCNqm","uuid":"${$bsjduuid}","aid":"${$bsjduuid}","openudid":"${$bsjduuid}"},"ciphertype":5,"version":"1.2.0","appname":"com.jingdong.app.mall"}`, $jduuid, $ts];
}

function get_sign($functionId, $body, $client = "android", $clientVersion = '11.2.8', $jduuid = '') {
    let $d;
    if (typeof $body == 'string') {
        $d = JSON.parse($body);
    } else {
        $body = JSON.stringify($body);
        $d = $body;
    }
    let $eid = isset($d["eid"]) ? $d["eid"] : randomeid();
    let [$ep, $suid, $st] = get_ep($jduuid);
    //console.log($ep, $suid, $st)
    let $svs = ["102", "111", "120"],
        $sv = $svs[array_rand($svs)],
        $all_arg = `functionId=${$functionId}&body=${$body}&uuid=${$suid}&client=${$client}&clientVersion=${$clientVersion}&st=${$st}&sv=${$sv}`,
        $back_bytes = sign_core($all_arg),
        $sign = md5(Buffer.from($back_bytes, 'binary').toString('base64'));
    //console.log(all_arg)
    //console.log(sign)
    let $data = { "functionId": $functionId, "body": $body, "clientVersion": $clientVersion, "client": $client, "uuid": $suid, "eid": $eid, "ep": $ep, "st": $st, "sign": $sign, "sv": $sv };
    $data["convertUrl"]=`functionId=${$functionId}&body=${escape($body)}&clientVersion=${$clientVersion}&client=${$client}&sdkVersion=31&lang=zh_CN&harmonyOs=0&networkType=wifi&oaid=${$suid}&eid=${$eid}&ef=1&ep=${escape($ep)}&st=${$st}&sign=${$sign}&sv=${$sv}`
    $data["url"] = `https://api.m.jd.com?`+$data["convertUrl"]
    return $data;
}

module.exports = {get_sign};