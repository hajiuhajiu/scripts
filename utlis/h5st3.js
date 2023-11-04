const axios = require('axios');
const CryptoJS = require('crypto-js')
const {format} = require("date-fns");

class H5ST{
    /*
    tk: string;
    timestamp: string;
    rd: string;
    appId: string;
    fp: string;
    time: number;
    ua: string
    enc: string;*/

    constructor(appId, ua, fp) {
        this.appId = appId
        this.ua = ua
        this.fp = fp || this.genFp()
    }

    genFp() {
        let e = "0123456789";
        let a = 13;
        let i = '';
        for (; a--;)
            i += e[Math.random() * e.length | 0];
        return (i + Date.now()).slice(0, 16)
    }

    async genAlgo() {
        this.time = Date.now()
        /*
        return new Promise(resolve=>{
            axios.post().then(d=>{
                let result
                tk=d['data']['data']["result"]['tk'];
                genKey=new Function('return '+d.data["data"]["result"]["algo"])();
                let result=d['data']['data']["result"];
                this.tk = result.tk
                this.rd = result.algo.match(/rd='(.*)'/)[1]
                this.enc = result.algo.match(/algo\.(.*)\(/)[1]
                resolve(result)
            });
        });*/
        let { data } = await axios.post(`https://cactus.jd.com/request_algo?g_ty=ajax`, {
            'version': '3.0',
            'fp': this.fp,
            'appId': this.appId.toString(),
            'timestamp': this.time,
            'platform': 'web',
            'expandParams': ''
        }, {
            headers: {
                'Host': 'cactus.jd.com',
                'accept': 'application/json',
                'content-type': 'application/json',
                'user-agent': this.ua,
            }
        })
        let result = data.data.result
        this.tk = result.tk
        /*
        this.rd = result.algo.match(/rd='(.*)'/)[1]
        this.enc = result.algo.match(/algo\.(.*)\(/)[1]
        */
        this.genKey = new Function('return ' + result.algo)();
        return result
    }
    /*
    genKey(tk, fp, ts, ai, algo) {
        let str = `${tk}${fp}${ts}${ai}${this.rd}`;
        return algo[this.enc](str, tk)
    }*/

    genH5st(body) {
        this.time = Date.now()
        this.timestamp = format(this.time, "yyyyMMddHHmmssSSS")
        let y = this.genKey(this.tk, this.fp, this.timestamp, this.appId, CryptoJS).toString(CryptoJS.enc.Hex)
        let s = ''
        for (let key of Object.keys(body)) {
            key === 'body' ? s += `${key}:${CryptoJS.SHA256(body[key]).toString(CryptoJS.enc.Hex)}&` : s += `${key}:${body[key]}&`
        }
        s = s.slice(0, -1)
        s = CryptoJS.HmacSHA256(s, y).toString(CryptoJS.enc.Hex)
        return encodeURIComponent(`${this.timestamp};${this.fp};${this.appId.toString()};${this.tk};${s};3.0;${this.time.toString()}`)
    }
}

module.exports = H5ST