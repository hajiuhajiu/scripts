const Template = require('../../template');

class Main extends Template {
    constructor() {
        super()
        this.title = "京东新农场"
        this.cron = `${this.rand(0, 59)} ${this.rand(0, 9)},${this.rand(14, 21)} * * *`
        this.help = 'main'
        this.task = 'local'
        this.import = ['fs', 'jdAlgo']
        this.hint = {
            'tenWater': '1 #每天只做10次浇水任务',
            'stock': "100 #保留水滴数",
            'cache': "1 #缓存助力code,设置后不会每次运行后都把助力码都写入json"
        }
        this.turn = 2
    }

    async prepare() {
        this.algo = new this.modules.jdAlgo({
            appId: "c57f6",
            type: 'main',
            version: "4.2"
        })
        this._cc = 0
        try {
            let txt = this.modules.fs.readFileSync(`${this.dirname}/invite/jd_task_farmNew.json`).toString()
            this.dict = this.loads(txt)
            this._cc = 1
        } catch (e) {
        }
    }

    async main(p) {
        let cookie = p.cookie;
        let farmHome = await this.wget({
            fn: 'farm_home',
            body: {"version": 1},
            algo: {appId: 'c57f6'},
            cookie,
        })
        if (this.turnCount == 1) {
            if (!this.cookies.help.includes(cookie)) {
                console.log("本轮运行助力水滴获取,当前账号不是被助力账号,此次将跳过运行")
                return
            }
        }
        if (this.haskey(farmHome, 'data.bizCode', -1001)) {
            console.log("活动火爆...")
            return
        }
        let home = this.haskey(farmHome, 'data.result') || {}
        if (this.haskey(farmHome, 'code', -30001)) {
            console.log("cookie失效,登陆失败")
            return
        }
        if (!home.skuName) {
            console.log("没有种树")
            let board = await this.wget({
                fn: 'farm_tree_board',
                body: {"version": 1},
                algo: {},
                cookie
            })
            try {
                let skus = board.data.result.farmTreeLevels[0].farmLevelTrees[0]
                console.log(skus)
                console.log("正在种树,选择商品:", skus.skuName)
                let tree = await this.wget({
                    fn: 'farm_plant_tree',
                    body: {"version": 1, "uid": skus.uid},
                    algo: {},
                    cookie
                })
                if (this.haskey(tree, 'data.success')) {
                    farmHome = await this.wget({
                        'fn': 'farm_home',
                        'body': {"version": 1},
                        algo: {appId: 'c57f6'},
                        cookie,
                    })
                    home = this.haskey(farmHome, 'data.result') || {}
                }
                else {
                    console.log("种树失败")
                    return
                }
            } catch (e) {
                console.log("种树失败")
                return
            }
        }
        let inviteCode = home.farmHomeShare.inviteCode
        let bottleWater = home.bottleWater
        console.log("当前进度:", home.waterTips)
        if (!this.dict[p.user]) {
            this.dict[p.user] = {inviteCode}
        }
        for (let i in this.dict) {
            console.log("正在助力:", i)
            if (p.finish) {
                console.log("没有助力次数了")
                break
            }
            if (i == p.user) {
                console.log("不能助力自己")
            }
            else if (this.dict[i].finish) {
                console.log("助力已满,", i)
            }
            else {
                let help = await this.wget({
                    fn: 'farm_assist',
                    body: {
                        "version": 1,
                        "inviteCode": this.dict[i].inviteCode,
                        "shareChannel": "ttt7",
                        "assistChannel": ""
                    },
                    algo: {'appId': '28981'},
                    cookie
                })
                if (this.haskey(help, 'data.success')) {
                    console.log("助力成功")
                    let amount = help.data.result.amount
                    if (amount == 0) {
                        p.finish = 1
                    }
                }
                else {
                    console.log("助力失败:", this.haskey(help, 'data.bizMsg'))
                    if (this.haskey(help, 'data.bizCode', 5004)) {
                        p.finish = 1
                    }
                    else if (this.haskey(help, 'data.bizCode', 5005)) {
                        this.dict[i].finish = 1
                    }
                }
                await this.wait(4000)
            }
        }
        let helpInfo = await this.wget({
            fn: 'farm_assist_init_info',
            body: {"version": 1},
            algo: {},
            cookie
        })
        for (let i of this.haskey(helpInfo, 'data.result.assistStageList')) {
            if (i.stageStaus == 2) {
                let award = await this.wget({
                    fn: 'farm_assist_receive_award',
                    body: {"version": 1},
                    algo: {'appId': 'c4332'},
                    cookie
                })
                if (this.haskey(award, 'data.success')) {
                    console.log("获取助力奖励成功:", award.data.result.amount)
                    bottleWater += award.data.result.amount
                }
                else {
                    console.log("获取助力奖励失败")
                }
                await this.wait(4000)
            }
        }
        let wheelsLottery = await this.algo.curl({
                'url': `https://api.m.jd.com/api`,
                'form': `functionId=wheelsLottery&body={"linkId":"VssYBUKJOen7HZXpC8dRFA"}&t=1698555438657&appid=activities_platform&client=ios&clientVersion=12.1.6&cthr=1&loginType=&build=168909&screen=390*844&networkType=wifi&d_brand=iPhone&d_model=iPhone13,3&lang=zh_CN&osVersion=15.1.1&partner=-1`,
                cookie, algo: {'appId': 'bd6c8'},
            }
        )
        if (this.haskey(wheelsLottery, 'data.prizeCode')) {
            console.log("抽奖获得:", wheelsLottery.data.prizeCode)
        }
        else {
            console.log('啥都没有抽到')
        }
        let signIn = await this.algo.curl({
                'url': `https://api.m.jd.com/api`,
                'form': `functionId=dongDongFarmSignIn&body={"linkId":"LCH-fV7hSnChB-6i5f4ayw"}&t=1698562800159&appid=activities_platform&client=ios&clientVersion=12.2.0`,
                cookie, algo: {'appId': '65f9d'},
            }
        )
        if (this.haskey(signIn, 'success')) {
            console.log('签到成功')
        }
        else {
            console.log(this.haskey(signIn, 'errMsg') || '签到失败')
        }
        let taskList = await this.wget({
            fn: 'farm_task_list',
            body: {"version": 1, "channel": 0},
            algo: {},
            cookie
        })
        let waterConut = 0
        for (let i of this.haskey(taskList, 'data.result.taskList')) {
            if (i.mainTitle.includes("浇水10次")) {
            }
            else if (i.mainTitle.includes("下单")) {
            }
            else if (i.taskDoTimes != i.taskLimitTimes) {
                console.log("正在运行:", i.mainTitle)
                let itemId = i.taskSourceUrl
                let taskDetaiList = []
                if (itemId) {
                    taskDetaiList.push({'itemId': itemId})
                }
                else {
                    let detail = await this.wget({
                        fn: 'farm_task_detail',
                        body: {"version": 1, "taskType": i.taskType, "taskId": i.taskId, "channel": 0},
                        algo: {},
                        cookie
                    })
                    if (this.haskey(detail, 'data.result.taskDetaiList')) {
                        taskDetaiList = detail.data.result.taskDetaiList
                    }
                }
                for (let kk of taskDetaiList.reverse()) {
                    await this.wait(4000)
                    let doWork = await this.wget({
                        fn: 'farm_do_task',
                        body: {
                            "version": 1,
                            "taskType": i.taskType,
                            "taskId": i.taskId,
                            "taskInsert": kk.taskInsert || false,
                            "itemId": new Buffer.from(kk.itemId).toString('base64'),
                            "channel": 0
                        },
                        algo: {'appId': '28981'},
                        cookie
                    })
                    if (this.haskey(doWork, 'data.success')) {
                        let award = await this.wget({
                            fn: 'farm_task_receive_award',
                            body: {"version": 1, "taskType": i.taskType, "taskId": i.taskId, "channel": 0},
                            algo: {'appId': '33e0f'},
                            cookie
                        })
                        if (this.haskey(award, 'data.result.taskAward')) {
                            console.log("获得奖励:", award.data.result.taskAward)
                            for (let kk of award.data.result.taskAward) {
                                if (this.haskey(kk, 'awardType', 1)) {
                                    bottleWater += kk.awardValue
                                }
                            }
                        }
                        else {
                            console.log("获取失败:", this.haskey(award, 'data.bizMsg'))
                        }
                    }
                    else {
                        console.log("任务失败:", this.haskey(doWork, 'data.bizMsg'))
                    }
                }
            }
            else if (i.taskStatus == 2) {
                await this.wait(4000)
                console.log("获取任务奖励:", i.mainTitle)
                let award = await this.wget({
                    fn: 'farm_task_receive_award',
                    body: {"version": 1, "taskType": i.taskType, "taskId": i.taskId, "channel": 0},
                    algo: {'appId': '33e0f'},
                    cookie
                })
                if (this.haskey(award, 'data.result.taskAward')) {
                    console.log("获得奖励:", award.data.result.taskAward)
                    for (let kk of award.data.result.taskAward) {
                        if (this.haskey(kk, 'awardType', 1)) {
                            bottleWater += kk.awardValue
                        }
                    }
                }
                else {
                    console.log("获取失败:", this.haskey(award, 'data.bizMsg'))
                }
            }
            else {
                console.log("任务已完成:", i.mainTitle)
            }
        }
        // 等运行完其他任务再浇水10次,获取的水滴数才是正确的
        for (let i of this.haskey(taskList, 'data.result.taskList')) {
            if (i.mainTitle.includes("浇水10次")) {
                if (i.taskDoTimes != i.taskLimitTimes) {
                    console.log("正在运行:", i.mainTitle)
                    for (let _ of Array(i.taskLimitTimes - i.taskDoTimes)) {
                        let water = await this.wget({
                            fn: 'farm_water',
                            body: {"version": 1, "waterType": 1},
                            algo: {'appId': '28981'},
                            cookie
                        })
                        let bottleWater2 = this.haskey(water, 'data.result.bottleWater')
                        if (bottleWater2) {
                            bottleWater = bottleWater2
                            console.log("浇水中,剩余水滴:", bottleWater)
                            waterConut++
                            if (bottleWater<10) {
                                break
                            }
                        }
                        else {
                            console.log('浇水失败:', this.haskey(water, 'data.bizMsg'))
                            break
                        }
                        await this.wait(4000)
                    }
                    let award = await this.wget({
                        fn: 'farm_task_receive_award',
                        body: {"version": 1, "taskType": i.taskType, "taskId": i.taskId, "channel": 0},
                        algo: {'appId': '33e0f'},
                        cookie
                    })
                    if (this.haskey(award, 'data.result.taskAward')) {
                        console.log("获得奖励:", award.data.result.taskAward)
                        for (let kk of award.data.result.taskAward) {
                            if (this.haskey(kk, 'awardType', 1)) {
                                bottleWater += kk.awardValue
                            }
                        }
                    }
                    else {
                        console.log("获取失败:", this.haskey(award, 'data.bizMsg'))
                    }
                }
            }
        }
        if (this.profile.tenWater) {
            console.log("跳过浇水: 检测到配置了tenWater参数,跳过浇水")
        }
        else {
            let stock = parseInt(this.profile.stock || 0)
            if (stock && stock>=bottleWater) {
                console.log("跳过浇水: 检测到配置了stock参数,剩余水滴小于保留水滴数")
            }
            else {
                console.log("剩余水滴:", bottleWater, '保留水滴数:', stock)
                let count = parseInt((bottleWater - stock) / 10)
                console.log("剩余可浇水次数:", count)
                for (let _ of Array(count)) {
                    let water = await this.wget({
                        fn: 'farm_water',
                        body: {"version": 1, "waterType": 1},
                        algo: {'appId': '28981'},
                        cookie
                    })
                    if (this.haskey(water, 'data.result.bottleWater')) {
                        bottleWater = this.haskey(water, 'data.result.bottleWater')
                        console.log("浇水中,剩余水滴:", bottleWater)
                        if (bottleWater<10) {
                            break
                        }
                    }
                    else {
                        console.log('浇水失败:', this.haskey(water, 'data.bizMsg'))
                        break
                    }
                    await this.wait(4000)
                }
            }
        }
    }

    async wget(p) {
        let headers = p.headers
        return await this.algo.curl({
                'url': `https://api.m.jd.com/client.action`,
                'form': `appid=signed_wh5&client=&clientVersion=1.0.0&screen=375*0&wqDefault=false&t=1698502026732&body=${typeof (p.body) == 'object' ? this.dumps(p.body) : p.body}&functionId=${p.fn}`,
                cookie: p.cookie,
                algo: p.algo || {},
            }
        )
    }

    async extra() {
        console.log(`此次运行助力码:`)
        console.log(this.dumps((this.dict)))
        if (!this.profile.cache || !this._cc) {
            let dict = {}
            for (let cookie of this.cookies.help) {
                let user = this.userName(cookie)
                if (this.dict[user]) {
                    delete this.dict[user].finish
                    dict[user] = this.dict[user]
                }
            }
            for (let pin in this.dict) {
                if (!dict[pin]) {
                    delete this.dict[pin].finish
                    dict[pin] = this.dict[pin]
                }
            }
            await this.modules.fs.writeFile(`${this.dirname}/invite/jd_task_farmNew.json`, this.dumps(dict), (error) => {
                if (error) return console.log("写入化失败" + error.message);
                console.log("新东东农场助力列表写入成功");
            })
        }
        else {
            console.log("跳过写入: 检测到配置了cache参数,已有缓存:/invite/jd_task_farmNew.json")
        }
    }
}

module.exports = Main;
