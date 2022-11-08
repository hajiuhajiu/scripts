/*
超市盲盒
入口：京东APP-更多-超市盲盒
39 12,21 * * *  jd_marketmh.js
updatetime：2022-10-28
jdpro
 */

const $ = new Env('超市盲盒');
//Node.js用户请在jdCookie.js处填写京东ck;
const jdCookieNode = $.isNode() ? require('./jdCookie.js') : '';
//IOS等用户直接用NobyDa的jd cookie
let cookiesArr = [], cookie = '', secretp = '', joyToken = "";
let linkId = 'qHqXOx2bvqgFOzTH_-iJoQ';
$.shareCoseList = [];
if ($.isNode()) {
    Object.keys(jdCookieNode).forEach((item) => {
        cookiesArr.push(jdCookieNode[item])
    })
    if (process.env.JD_DEBUG && process.env.JD_DEBUG === 'false') console.log = () => { };
} else {
    cookiesArr = [$.getdata('CookieJD'), $.getdata('CookieJD2'), ...jsonParse($.getdata('CookiesJD') || "[]").map(item => item.cookie)].filter(item => !!item);
}

const JD_API_HOST = `https://api.m.jd.com/client.action`;
!(async () => {
    console.log('活动入口：京东APP-更多-超市盲盒')
    if (!cookiesArr[0]) {
        $.msg($.name, '【提示】请先获取cookie\n直接使用NobyDa的京东签到获取', 'https://bean.m.jd.com/bean/signIndex.action', { "open-url": "https://bean.m.jd.com/bean/signIndex.action" });
        return;
    }
    //await getToken();
    //cookiesArr = cookiesArr.map(ck => ck  + `joyytoken=50084${joyToken};`)
    for (let i = 0; i < cookiesArr.length; i++) {
        cookie = cookiesArr[i];
        if (cookie) {
            $.UserName = decodeURIComponent(cookie.match(/pt_pin=([^; ]+)(?=;?)/) && cookie.match(/pt_pin=([^; ]+)(?=;?)/)[1])
            $.index = i + 1;
            $.isLogin = true;
            $.nickName = '';
            $.flag = true;
            UA = getUA();
            if (!$.isLogin) {
                $.msg($.name, `【提示】cookie已失效`, `京东账号${$.index} ${$.nickName || $.UserName}\n请重新登录获取\nhttps://bean.m.jd.com/bean/signIndex.action`, { "open-url": "https://bean.m.jd.com/bean/signIndex.action" });
                continue
            }
            console.log(`\n******开始【京东账号${$.index}】${$.nickName || $.UserName}*********\n`);
            await main();
            await $.wait(2000);
        }
    };
})()
    .catch((e) => $.logErr(e))
    .finally(() => $.done())

async function main() {
    await starShopPageInfo({ "taskId": "", "linkId": linkId, "encryptPin": "" })
    //if (!$.flag) await starShopDraw({"linkId":linkId,"isDailyRaffle":true});
    if (Date.now() > $.drawts) {
        console.log('开礼盒时间到，去开...')
        for (let i = 0; i < $.drawtimes; i++) {
            await starShopDraw();
            await $.wait(500);
        }
    }
    await $.wait(1000);
    await apTaskList({ "linkId": linkId });
    if ($.allList) {
        for (let i = 0; i < $.allList.length; i++) {
            $.oneTask = $.allList[i];
            if (["SIGN"].includes($.oneTask.taskType) && $.oneTask.taskFinished === false) {
                await apDoTask({ "taskId": $.allList[i].id, "taskType": $.allList[i].taskType, "linkId": linkId })
            };
            if (["BROWSE_CHANNEL"].includes($.oneTask.taskType) && $.oneTask.taskFinished === false) {
                await apTaskDetail({ "taskId": $.oneTask.id, "taskType": $.oneTask.taskType, "channel": 4, "linkId": linkId });
                await $.wait(1000)
                for (let y = 0; y < ($.doList.status.finishNeed - $.doList.status.userFinishedTimes); y++) {
                    $.startList = $.doList.taskItemList[y];
                    $.itemName = $.doList.taskItemList[y].itemName;
                    console.log(`去浏览${$.itemName}`)
                    await apDoTask({ "taskId": $.allList[i].id, "taskType": $.allList[i].taskType, "channel": 4, "itemId": $.startList.itemId, "linkId": linkId })
                    await $.wait(1000)
                }
            }
        }
    } else {
        console.log(`无任务数据！`)
    }
}

//活动主页
function starShopPageInfo(body) {
    return new Promise((resolve) => {
        $.get(taskGetUrl('starShopPageInfo', body), (err, resp, data) => {
            try {
                if (err) {
                    console.log(`${JSON.stringify(err)}`)
                    console.log(`starShopPageInfo 请求失败，请检查网路重试`)
                } else {
                    data = JSON.parse(data);
                    if (data.code === 0) {
                        $.flag = data.data.isDailyRaffle;
                        $.drawtimes = data.data.avaiableTimes;
                        $.drawts = data.data.planDrawTime;
                        console.log('当前积分：' + data.data.currentGoodRoleValue);
                    } else {
                        console.log(`starShopPageInfo：${JSON.stringify(data)}\n`);
                    }
                }
            } catch (e) {
                $.logErr(e, resp);
            } finally {
                resolve();
            }
        })
    })
}
//惊喜礼盒
function starShopDraw(body) {
    let opt =
    {
        url: 'https://api.m.jd.com/?functionId=starShopDraw&body={%22linkId%22:%22qHqXOx2bvqgFOzTH_-iJoQ%22}&appid=activities_platform&t=1667822944208&client=android&clientVersion=11.3.0&h5st=20221107200904210%3B6499624445078456%3B568c6%3Btk02w69911b1718n4BJd1F3S7xUk5Lw%2Bnu3d2ZLLORy0io21aJoCapEcA8gbK9tvLzON1FQ1iLeder0OAU4Th%2F7yWwZn%3Beb5ae376b553da072432e7749e8b852745ad3ea35e554ce04d1eb2b0ab1c3bfa%3B3.1%3B1667822944210%3B62f4d401ae05799f14989d31956d3c5f0a269d1342e4ecb6ab00268fc69555cdc3295f00e681fd72cd76a48b9fb3faf3579d80b37c85b023e9e8ba94d8d2b852b9cbef42726bbe41ffd8c74540f4a1ced584468ba9e46bfbef62144b678f5532e02456edc95e6131cb12c2dd5fa5c6c0ca7e28a3c717e0dd9ae889f2eaf9441c5254165d7b1aa2509f8e74f626a4f631',
        //body: `functionId=${functionId}&body=${JSON.stringify(body)}&client=wh5&clientVersion=1.0.0&uuid=ef746bc0663f7ca06cdd1fa724c15451900039cf`,
        headers: {
            'User-Agent': UA,
            'Cookie': cookie,
            'Origin': 'https://prodev.m.jd.com',
            'Referer': 'https://prodev.m.jd.com/',
        }
    }
    return new Promise((resolve) => {
        $.get(opt, (err, resp, data) => {
            try {
                if (err) {
                    console.log(`${JSON.stringify(err)}`)
                    console.log(`starShopDraw 请求失败，请检查网路重试`)
                } else {
                    data = JSON.parse(data);
                    if (data.success) {
                        if (data.data.prizeType === 2) {
                            console.log('开启惊喜礼盒，获得红包：' + data.data.prizeValue);
                        }
                    } else {
                        console.log(`starShopDraw：${(data.errMsg)}\n`);
                    }
                }
            } catch (e) {
                $.logErr(e, resp);
            } finally {
                resolve();
            }
        })
    })
}
//获取任务列表
function apTaskList(body) {
    return new Promise((resolve) => {
        $.get(taskGetUrl('apTaskList', body), (err, resp, data) => {
            try {
                if (err) {
                    console.log(`${JSON.stringify(err)}`)
                    console.log(`${$.name} apTaskList API请求失败，请检查网路重试`)
                } else {
                    data = JSON.parse(data);
                    if (data.code === 0) {
                        $.allList = data.data
                    } else {
                        console.log(`apTaskList错误：${JSON.stringify(data)}\n`);
                    }
                }
            } catch (e) {
                $.logErr(e, resp);
            } finally {
                resolve();
            }
        })
    })
}

//获取任务分表
function apTaskDetail(body) {
    return new Promise((resolve) => {
        $.get(taskGetUrl('apTaskDetail', body), (err, resp, data) => {
            try {
                if (err) {
                    console.log(`${JSON.stringify(err)}`)
                    console.log(`${$.name} apTaskDetail API请求失败，请检查网路重试`)
                } else {
                    data = JSON.parse(data);
                    if (data.code === 0) {
                        $.doList = data.data
                        //console.log(JSON.stringify($.doList));
                    } else {
                        console.log(`apTaskDetail错误：${JSON.stringify(data)}\n`);
                    }
                }
            } catch (e) {
                $.logErr(e, resp);
            } finally {
                resolve();
            }
        })
    })
}

//做任务
function apDoTask(body) {
    return new Promise((resolve) => {
        $.post(taskPostUrl('apDoTask', body), (err, resp, data) => {
            try {
                if (err) {
                    console.log(`${JSON.stringify(err)}`)
                    console.log(`${$.name} apDoTask API请求失败，请检查网路重试`)
                } else {
                    data = JSON.parse(data);
                    //console.log(JSON.stringify(data));
                    if (data.success === true && data.code === 0) {
                        console.log(`任务完成！`)
                    } else if (data.success === false && data.code === 2005) {
                        console.log(`${data.data.errMsg}${data.data.userFinishedTimes}次`)
                    }
                }
            } catch (e) {
                $.logErr(e, resp);
            } finally {
                resolve();
            }
        })
    })
}

//助力
function helpShare(body) {
    return new Promise((resolve) => {
        $.get(taskGetUrl('superboxSupBoxHomePage', body), (err, resp, data) => {
            try {
                if (err) {
                    console.log(`${JSON.stringify(err)}`)
                    console.log(`${$.name} superboxSupBoxHomePage API请求失败，请检查网路重试`)
                } else {
                    data = JSON.parse(data);
                    //console.log(JSON.stringify(data));
                    if (data.success === true && data.code === 0) {
                        console.log(`助力成功\n\n`)
                    } else {
                        console.log(`助力失败：${JSON.stringify(data)}\n\n`)
                    }
                }
            } catch (e) {
                $.logErr(e, resp);
            } finally {
                resolve();
            }
        })
    })
}

//开盲盒
function openBox(body) {
    return new Promise((resolve) => {
        $.get(taskGetUrl('superboxOrdinaryLottery', body), (err, resp, data) => {
            try {
                if (err) {
                    console.log(`${JSON.stringify(err)}`)
                    console.log(`${$.name} superboxOrdinaryLottery API请求失败，请检查网路重试`)
                } else {
                    data = JSON.parse(data);
                    //console.log(JSON.stringify(data));
                    if (data.success === true && data.code === 0 && data.data.rewardType === 2) {
                        console.log(`开箱成功获得${data.data.discount}元红包\n\n`)
                    } else if (data.success === true && data.code === 0 && data.data.rewardType !== 2) {
                        console.log(`开箱成功应该获得了空气${JSON.stringify(data.data)}\n\n`)
                    } else {
                        console.log(`失败：${JSON.stringify(data)}\n\n`)
                    }
                }
            } catch (e) {
                $.logErr(e, resp);
            } finally {
                resolve();
            }
        })
    })
}
function getUA() {
	getstr = function (x) {
		let e = '', t = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
		for (let i = 0; i < x; i++) {
			let n = Math.round(Math.random() * (t.length - 1));
			e += t.substring(n, n + 1);
		}
		return e;
	}
	let adod = Buffer.from(getstr(16), 'utf8').toString('base64');
	let od = getstr(48);
	ep = encodeURIComponent(JSON.stringify({ 'hdid': 'JM9F1ywUPwflvMIpYPok0tt5k9kW4ArJEU3lfLhxBqw=', 'ts': Date.now(), 'ridx': -1, 'cipher': { 'sv': 'EG==', 'ad': adod, 'od': od, 'ov': 'Ctq=', 'ud': adod }, 'ciphertype': 5, 'version': '1.2.0', 'appname': 'com.jingdong.app.mall' }));
	return `jdapp;android;11.2.0;;;appBuild/98413;ef/1;ep/${ep};Mozilla/5.0 (Linux; Android 9; LYA-AL00 Build/HUAWEILYA-AL00L; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/89.0.4389.72 MQQBrowser/6.2 TBS/046033 Mobile Safari/537.36`;
}
function getToken(timeout = 0) {
    return new Promise((resolve) => {
        setTimeout(() => {
            let url = {
                url: `https://bh.m.jd.com/gettoken`,
                headers: {
                    'Content-Type': `text/plain;charset=UTF-8`
                },
                body: `content={"appname":"50084","whwswswws":"","jdkey":"","body":{"platform":"1"}}`
            }
            $.post(url, async (err, resp, data) => {
                try {
                    data = JSON.parse(data);
                    joyToken = data.joyytoken;
                    console.log(`joyToken = ${data.joyytoken}`)
                } catch (e) {
                    $.logErr(e, resp);
                } finally {
                    resolve()
                }
            })
        }, timeout)
    })
}

function taskGetUrl(functionId, body = {}) {
    return {
        url: `${JD_API_HOST}?functionId=${functionId}&body=${JSON.stringify(body)}&_t=${Date.now()}&appid=activities_platform&client=wh5&clientVersion=1.0.0`,
        //body: `functionId=${functionId}&body=${JSON.stringify(body)}&client=wh5&clientVersion=1.0.0&uuid=ef746bc0663f7ca06cdd1fa724c15451900039cf`,
        headers: {
            'User-Agent': UA,
            'Content-Type': 'application/x-www-form-urlencoded',
            'Host': 'api.m.jd.com',
            'Cookie': cookie,
            'Origin': 'https://prodev.m.jd.com',
            'Referer': 'https://prodev.m.jd.com/mall/active/3z9BVbnAa1sVy88yEyKdp9wcWZ7Z/index.html?',
        }
    }
}

function taskPostUrl(functionId, body = {}) {
    return {
        url: `${JD_API_HOST}?functionId=${functionId}`,
        body: `functionId=${functionId}&body=${JSON.stringify(body)}&_t=${Date.now()}&appid=activities_platform&client=wh5&clientVersion=1.0.0`,
        headers: {
            'User-Agent': UA,
            'Content-Type': 'application/x-www-form-urlencoded',
            'Host': 'api.m.jd.com',
            'Cookie': cookie,
            'Origin': 'https://prodev.m.jd.com',
            'Referer': 'https://prodev.m.jd.com/mall/active/3z9BVbnAa1sVy88yEyKdp9wcWZ7Z/index.html?',
        }
    }
}

function jsonParse(str) {
    if (typeof str == "string") {
        try {
            return JSON.parse(str);
        } catch (e) {
            console.log(e);
            $.msg($.name, '', '请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie')
            return [];
        }
    }
}
// prettier-ignore
