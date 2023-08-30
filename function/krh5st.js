const jsdom = require("jsdom");
let domWindow = null;
async function sleep(_0x4de9x2d) {
    return new Promise((_0x4de9x2e, _0x4de9x2f) => {
        setTimeout(() => {
            _0x4de9x2e(_0x4de9x2d);
        }, _0x4de9x2d);
    });
}
async function loadH5Sdk() {
    const {
        JSDOM
    } = jsdom;
    let _0x4de9x34 = new jsdom.ResourceLoader({
        "userAgent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:91.0) Gecko/20100101 Firefox/91.0",
        "referrer": "https://msitepp-fm.jd.com/rest/priceprophone/priceProPhoneMenu"
    });
    let _0x4de9x35 = new jsdom.VirtualConsole();
    let _0x4de9x36 = {
        "url": "https://msitepp-fm.jd.com/rest/priceprophone/priceProPhoneMenu",
        "referrer": "https://msitepp-fm.jd.com/rest/priceprophone/priceProPhoneMenu",
        "userAgent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:91.0) Gecko/20100101 Firefox/91.0",
        "runScripts": "dangerously",
        "resources": _0x4de9x34,
        "includeNodeLocations": true,
        "storageQuota": 10000000,
        "pretendToBeVisual": true,
        "virtualConsole": _0x4de9x35
    };
    const _0x4de9x37 = new JSDOM("<body>\n    <script src=\"https://static.360buyimg.com/siteppStatic/script/mescroll/map.js\"></script>\n    <script src=\"https://storage.360buyimg.com/webcontainer/js_security_v3_0.1.0.js\"></script>\n    <script src=\"https://static.360buyimg.com/siteppStatic/script/utils.js\"></script>\n    </body>", _0x4de9x36);
    await sleep(500);
    domWindow = _0x4de9x37.window;
}
async function getH5st(_0x4de9x39, _0x4de9x3a) {
    let _0x4de9x46 = null;
    if (!domWindow) {
        await loadH5Sdk();
    }
    return new Promise(async _0x4de9x47 => {
        if (typeof domWindow.signWaap === "function") {
            const _0x4de9x48 = await domWindow.signWaap(_0x4de9x39, _0x4de9x3a);
            _0x4de9x47(_0x4de9x48);
        } else {
            _0x4de9x46 = setInterval(async () => {
                if (typeof domWindow.signWaap === "function") {
                    clearInterval(_0x4de9x46);
                    _0x4de9x46 = null;
                    const _0x4de9x49 = await domWindow.signWaap(_0x4de9x39, _0x4de9x3a);
                    _0x4de9x47(_0x4de9x49);
                }
            }, 100);
        }
    });
}
module.exports = getH5st;