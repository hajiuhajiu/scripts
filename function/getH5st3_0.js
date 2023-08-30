/*
new Env('getH5st3_0');
*/

const jsdom = require("jsdom");
let domWindow = null;

async function sleep(t) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(t);
        }, t);
    });
}

async function loadH5Sdk() {
    const { JSDOM } = jsdom;
    let resourceLoader = new jsdom.ResourceLoader({
        userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:91.0) Gecko/20100101 Firefox/91.0",
        referrer: "https://msitepp-fm.jd.com/rest/priceprophone/priceProPhoneMenu",
    });
    let virtualConsole = new jsdom.VirtualConsole();
    let options = {
        url: "https://msitepp-fm.jd.com/rest/priceprophone/priceProPhoneMenu",
        referrer: "https://msitepp-fm.jd.com/rest/priceprophone/priceProPhoneMenu",
        userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:91.0) Gecko/20100101 Firefox/91.0",
        runScripts: "dangerously",
        resources: resourceLoader,
        includeNodeLocations: true,
        storageQuota: 10000000,
        pretendToBeVisual: true,
        virtualConsole,
    };
    const dom = new JSDOM(
        `<body>
    <script src="https://static.360buyimg.com/siteppStatic/script/mescroll/map.js"></script>
    <script src="https://storage.360buyimg.com/webcontainer/js_security_v3_0.1.0.js"></script>
    <script src="https://static.360buyimg.com/siteppStatic/script/utils.js"></script>
    </body>`,
        options
    );
    await sleep(500);
    domWindow = dom.window;
}

/**
 * @describe 获取JD H5st 3.0版本验参
 * @param businessId appId
 * @param req body
 */
async function getH5st(businessId, req) {
    let timer = null;
    if (!domWindow) {
        await loadH5Sdk();
    }
    return new Promise(async (resolve) => {
        if (typeof domWindow.signWaap === "function") {
            const h5st = await domWindow.signWaap(businessId, req);
            resolve(h5st);
        } else {
            timer = setInterval(async () => {
                if (typeof domWindow.signWaap === "function") {
                    clearInterval(timer);
                    timer = null;
                    const h5st = await domWindow.signWaap(businessId, req);
                    resolve(h5st);
                }
            }, 100);
        }
    });
}

module.exports = getH5st;
