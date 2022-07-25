ENV_PATH=
#2021/12/16 更新scripts目录wyw
# 每3天的23:50分清理一次日志(互助码不清理，proc_file.sh对该文件进行了去重)
50 23 */3 * * find /log -name '*.log' | grep -v 'sharecodeCollection' | xargs rm -rf
35 23 */3 * * find /root/jd/log -name '*.log' | grep -v 'sharecodeCollection' | xargs rm -rf
#收集助力码
30 * * * * sh +x /scripts/docker/auto_help.sh collect >> /log/auto_help_collect.log 2>&1

# 更新js脚本和shell脚本，并替换相关参数：
12 12 * * * bash MY_PATH/git_pull.sh >> MY_PATH/log/git_pull.log 2>&1
12 10 * * * bash MY_PATH/pull.sh
# 删除 RmLogDaysAgo 指定天数以前的旧日志，本行为不记录日志：
57 13 * * * bash MY_PATH/rm_log.sh >/dev/null 2>&1

# 导出所有互助码清单，日志在log/export_sharecodes下(可通过面板或者日记查看)：
48 * * * * bash MY_PATH/export_sharecodes.sh
40 * * * *

# 重启挂机脚本：
# 33 13 * * * node /scripts/hangup
  
# 自定义定时区，添加自己其他想加的定时任务:


# 运行lxk0301大佬的js脚本，仅列出长期任务作初始化用，AutoAddCron=true时，将自动添加短期任务。
# 请保留任务名称中的前缀"jd_"，去掉后缀".js"，如果有些任务你不想运行，注释掉就好了，不要删除。否则会重新添加上。
# 非lxk0301/jd_scripts仓库中的脚本不能以“jd_”、“jr_”、“jx_”开头。请在最后保留一个空行。
0 10 * * * node /scripts/jd_bean_change.js >> /log/jd_bean_change.log 2>&1
0 19 * * * node /scripts/jd_bean_changes.js >> /log/jd_bean_changes.log 2>&1
08 01,8 * * * node /scripts/jd_618jk.js >> /log/jd_618jk.log 2>&1
#01 01  * * * node /scripts/jd_hyj.js >> /log/jd_hyj.log 2>&1
#01 01,8  * * * node /scripts/jd_cleancart.js >> /log/jd_cleancart.log 2>&1
13 0-23/2 * * * node /scripts/jd_19e.js >> /log/jd_19e.log 2>&1
33 0-23/4 * * * node /scripts/jd_bean_home.js >> /log/jd_bean_home.log 2>&1
0 0 * * * node /scripts/jd_bean_sign.js >> /log/jd_bean_sign.log 2>&1
04 0,8,16 * * * node /scripts/jd_618cj.js >> /log/jd_618cj.log 2>&1
1 7,12,19 * * * node /scripts/jd_beauty.js >> /log/jd_beauty.log 2>&1
1 00,8 * * * node /scripts/jd_tanwei.js >> /log/jd_tanwei.log 2>&1
7 8,12,18 * * * node /scripts/jd_bookshop.js >> /log/jd_bookshop.log 2>&1
12 */6 * * * node /scripts/jd_cfd_loop.js >> /log/jd_cfd_loop.log 2>&1
33 */8 * * * node /scripts/jd_cfd_help.js >> /log/jd_cfd_help.log 2>&1
50 05 * * * node /scripts/jd_car.js >> /log/jd_car.log 2>&1
27 6,18,15 * * * node /scripts/jd_cash.js >> /log/jd_cash.log 2>&1
0 0 * * * node /scripts/jd_cash_exchange.js >> /log/jd_cash_exchange.log 2>&1
22 0,9 * * * node /scripts/jd_ccSign.js >> /log/jd_ccSign.log 2>&1
30 * * * * node /scripts/jd_cfd.js >> /log/jd_cfd.log 2>&1
18 * * * * node /scripts/jd_cfd_mooncake.js >> /log/jd_cfd_mooncake.log 2>&1
05 0,8 * * * node /scripts/jd_club_lottery.js >> /log/jd_club_lottery.log 2>&1
05 03,14 * * * node /scripts/jd_cjhz.js >> /log/jd_cjhz.log 2>&1
27 01,12,18 * * * node /scripts/jd_connoisseur.js >> /log/jd_connoisseur.log 2>&1
18 * * * * node /scripts/jd_daily_egg.js >> /log/jd_daily_egg.log 2>&1
13 1,22,23 * * * node /scripts/jd_daily_lottery.js >> /log/jd_daily_lottery.log 2>&1
35 2 * * * node /scripts/jd_daydlt.js >> /log/jd_daydlt.log 2>&1
18 1,10 * * * node /scripts/jd_djjl.js >> /log/jd_djjl.log 2>&1
28 3,13 * * * node /scripts/jd_jddt.js >> /log/jd_jddt.log 2>&1
13 10 * * * node /scripts/jd_dpqd.js >> /log/jd_dpqd.log 2>&1
3 0 * * * node /scripts/jd_dadoudou.js >> /log/jd_dadoudou.log 2>&1
13 1 * * * node /scripts/jd_dfw.js >> /log/jd_dfw.log 2>&1
8 9 * * * node /scripts/jd_desire.js >> /log/jd_desire.log 2>&1
33 9,13 * * * node /scripts/jd_dqmh.js >> /log/jd_dqmh.log 2>&1
3 0,10,13 * * * node /scripts/jd_mnyyn.js >> /log/jd_mnyyn.log 2>&1
6 0,20 * * * node /scripts/jd_mhtask.js >> /log/jd_mhtask.log 2>&1
12 0,6 * * * node /scripts/jd_lottery.js >> /log/jd_lottery.log 2>&1
20 * * * * node /scripts/jd_dreamFactory.js >> /log/jd_dreamFactory.log 2>&1
12 12,18 * * * node /scripts/jd_desire.js >> /log/jjd_desire.log 2>&1
29 0-23/4 * * * node /scripts/jd_ddnc_farmpark.js >> /log/jd_ddnc_farmpark.log 2>&1
39 10,14 * * * node /scripts/jd_ddworld_exchange.js >> /log/jd_ddworld_exchange.log 2>&1
33 0-23/4 * * * node /scripts/jd_ddly.js >> /log/jd_ddly.log 2>&1
22 6,12,18 * * * node /scripts/jd_ddworld.js >> /log/jd_ddworld.log 2>&1
3 3,6,18 * * * node /scripts/jd_genz.js >> /log/jd_genz.log 2>&1
22 6,12,18 * * * node /scripts/jd_ddworld.js >> /log/jd_ddworld.log 2>&1
32 9,18 * * * node /scripts/jd_ddq.js >> /log/jd_ddq.log 2>&1
32 8,18 * * * node /scripts/jd_dwapp.js >> /log/jd_dwapp.log 2>&1
32 21 * * * node /scripts/jd_exchangejxbeans.js >> /log/jd_exchangejxbeans.log 2>&1
3 3,6,18 * * * node /scripts/jd_genz.js >> /log/jd_genz.log 2>&1
28 3,13 * * * node /scripts/jd_jddt.js >> /log/jd_jddt.log 2>&1
52 01,9 * * * node /scripts/jd_jxg.js >> /log/jd_jxg.log 2>&1
32 */6 * * * node /scripts/jd_fcdyj.js >> /log/jd_fcdyj.log 2>&1
40 3 * * * node /scripts/jd_factory.js >> /log/jd_factory.log 2>&1
51 10 * * * node /scripts/jd_family.js >> /log/jd_family.log 2>&1
5 6-18/6 * * * node /scripts/jd_fruit.js >> /log/jd_fruit.log 2>&1
15 8,14 * * * node /scripts/jd_fanli.js >> /log/jd_fanli.js 2>&1
05 0,1 * * * node /scripts/jd_fan.js >> /log/jd_fan.js 2>&1
38 2 * * * node /scripts/jd_getFanslove.js >> /log/jd_getFanslove.log 2>&1
46 0,9,18,23 * * * node /scripts/jd_global.js >> /log/jd_global.js 2>&1
13 1,7,22 * * * node /scripts/jd_health.js >> /log/jd_health.log 2>&1
5-45/20 * * * * node /scripts/jd_health_collect.js >> /log/jd_health_collect.log 2>&1
0 3,9,18 * * * node /scripts/jd_jxsign.js >> /log/jd_jxsign.log 2>&1
28 12 * * * node /scripts/jd_jrdraw.js >> /log/jd_jrdraw.log 2>&1
25 12 * * * node /scripts/jd_jintie_wx.js >> /log/jd_jintie_wx.log 2>&1
30 * * * * node /scripts/jd_half_redrain.js >> /log/jd_half_redrain.log 2>&1
47 7 * * * node /scripts/jd_get_share_code.js >> /log/jd_get_share_code.log 2>&1
33 0,12,18 * * * node /scripts/jd_gold_creator.js >> /log/jd_gold_creator.log 2>&1
47 7,12 * * * node /scripts/jd_gold_sign.js >> /log/jd_gold_sign.log 2>&1
27 7,12 * * * node /scripts/jd_global.js >> /log/jd_global.log 2>&1
15 0-23/4 * * * node /scripts/jd_jxmc.js >> /log/jd_jxmc.log 2>&1
35 1,7,11,18 * * * node /scripts/jd_joy_park_newtask.js >> /log/jd_joy_park_newtask.log 2>&1
55 2,8,13,19 * * * node /scripts/jd_joy_park_task.js >> /log/jd_joy_park_task.log 2>&1
26 */2 * * * node /scripts/jd_jdtj_winner.js >> /log/jd_jdtj_winner.log 2>&1
45 8,13,19 * * * node /scripts/jd_jmf.js >> /log/jd_jmf.log 2>&1
38 0,12,18 * * * node /scripts/jd_jxdzz.js >> /log/jd_jxdzz.log 2>&1
22 02,15 * * * node /scripts/jd_jxmc_help.js >> /log/jd_jxmc_help.log 2>&1
28 2 * * * node /scripts/jd_jbczy.js >> /log/jd_jbczy.log 2>&1
30 0,1,2 * * * node /scripts/jd_jdzz.js >> /log/jd_jdzz.log 2>&1
15 6 * * * node /scripts/jd_jintie.js >> /log/jd_jintie.log 2>&1
15 */2 * * * node /scripts/jd_joy.js >> /log/jd_joy.log 2>&1
15 */1 * * * node /scripts/jd_joy_feedPets.js >> /log/jd_joy_feedPets.log 2>&1
59 23,7,11,15 * * * node /scripts/jd_joy_reward.js >> /log/jd_joy_reward.log 2>&1
10 10-20/2 * * * node /scripts/jd_joy_run.js >> /log/jd_joy_run.log 2>&1
11 2 * * * node /scripts/jd_joy_steal.js >> /log/jd_joy_steal.log 2>&1
59 23,7 * * * node /scripts/jd_joy500.js >> /log/jd_joy500.log 2>&1
1 0,11,21 * * * node /scripts/jd_jump.js >> /log/jd_jump.log 2>&1
38 5 * * * node /scripts/jd_jxd.js >> /log/jd_jxd.log 2>&1
8 7 * * * node /scripts/jd_jxfactory.js >> /log/jd_jxfactory.log 2>&1
0 6,9,12,18 * * * node /scripts/jd_jxnc.js >> /log/jd_jxnc.log 2>&1
3 4,6,11 * * * node /scripts/jd_joy_park.js >> /log/jd_joy_park.log 2>&1
02 6,9,12,18,20 * * * node /scripts/jd_jxlhb.js >> /log/jd_jxlhb.log 2>&1
15 4,13,20 * * * node /scripts/jd_industrial_task.js >> /log/jd_industrial_task.log 2>&1
20 02,10 * * * node /scripts/jd_lsj.js >> /log/jd_lsj.log 2>&1
25 5,8,13,17 * * * node /scripts/jd_jddj_bean.js >> /log/jd_jddj_bean.log 2>&1
45 6,8,13,15 * * * node /scripts/jd_jddj_fruit.js >> /log/jd_jddj_fruit.log 2>&1
55 7,10,13,16 * * * node /scripts/jd_jddj_fruit_collectWater.js >> /log/jd_jddj_fruit_collectWater.log 2>&1
05 1,8,13,20 * * * node /scripts/jd_jddj_getPoints.js >> /log/jd_jddj_getPoints.log 2>&1
18 3,8,13,17 * * * node /scripts/jd_jddj_plantBeans.js >> /log/jd_jddj_plantBeans.log 2>&1
23 1 * * * node /scripts/jd_kd.js >> /log/jd_kd.log 2>&1
10-20/5 12 * * * node /scripts/jd_live.js >> /log/jd_live.log 2>&1
28 14 * * * node /scripts/jd_live_lottery_social.js >> /log/jd_live_lottery_social.log 2>&1
0,30 0-23/1 * * * node /scripts/jd_live_redrain.js >> /log/jd_live_redrain.log 2>&1
22 0,12,18 * * * node /scripts/jd_lotteryMachine.js >> /log/jd_lotteryMachine.log 2>&1
25 1,18 * * * node /scripts/jd_lucky_egg.js >> /log/jd_lucky_egg.log 2>&1
38 13 * * * node /scripts/jd_market_lottery.js >> /log/jd_market_lottery.log 2>&1
22 09,18 * * * node /scripts/jd_mall_active.js >> /log/jd_mall_active.log 2>&1
28 15 * * * node /scripts/jd_mgold.js >> /log/jd_mgold.log 2>&1
50 */4 * * * node /scripts/jd_mohe.js >> /log/jd_mohe.log 2>&1
22 */6 * * * node /scripts/jd_plusreward.js >> /log/jd_plusreward.log 2>&1
40 */2 * * * node /scripts/jd_moneyTree.js >> /log/jd_moneyTree.log 2>&1
12 15 * * * node /scripts/jd_mofang_ex.js >> /log/jd_mofang_ex.log 2>&1
2 15 * * * node /scripts/jd_msign.js >> /log/jd_msign.log 2>&1
10 7 * * * node /scripts/jd_ms.js >> /log/jd_ms.log 2>&1
28 04,13 * * * node /scripts/jd_mohe.js >> /log/jd_mohe.log 2>&1
26 02,8 * * * node /scripts/jd_nzmh.js >> /log/jd_nzmh.log 2>&1
36 02,8 * * * node /scripts/jd_nh_sign.js >> /log/jd_nh_sign.log 2>&1
26 0,9,18,23 * * * node /scripts/jd_nnfls.js >> /log/jd_nnfls.js 2>&1
5 1,10 * * * node /scripts/jd_necklace.js >> /log/jd_necklace.log 2>&1
02 1,12 * * * node /scripts/jd_opencard.js >> /log/jd_opencard.log 2>&1
12 2,13 * * * node /scripts/jd_orderlist.js >> /log/jd_orderlist.log 2>&1
22 3,15 * * * node /scripts/jd_opencard1.js >> /log/jd_opencard1.log 2>&1
12 4,16 * * * node /scripts/jd_opencard2.js >> /log/jd_opencard2.log 2>&1
42 6,17 * * * node /scripts/jd_opencard3.js >> /log/jd_opencard3.log 2>&1
48 10,18 * * * node /scripts/jd_opencard4.js >> /log/jd_opencard4.log 2>&1
5 6-18/6 * * * node /scripts/jd_pet.js >> /log/jd_pet.log 2>&1
8 9 * * * node /scripts/jd_petTreasureBox.js >> /log/jd_petTreasureBox.log 2>&1
12 * * * * node /scripts/jd_pigPet.js >> /log/jd_pigPet.log 2>&1
0 */6 * * * node /scripts/jd_plantBean.js >> /log/jd_plantBean.log 2>&1
33 10 * * * node /scripts/jd_plantBeann.js >> /log/jd_plantBeann.log 2>&1
8 9 * * * node /scripts/jd_plus_bean.js >> /log/jd_plus_bean.log 2>&1
35 13,17,19 * * * node /scripts/jd_redPacket.js >> /log/jd_redPacket.log 2>&1
27 8 * * * node /scripts/jd_sgmh.js >> /log/jd_sgmh.log 2>&1
43 8,12 * * * node /scripts/jd_sddd.js >> /log/jd_split.log 2>&1
30 8,12 * * * node /scripts/jd_split.js >> /log/jd_split.log 2>&1
26 5 * * * node /scripts/jd_shake.js >> /log/jd_shake.log 2>&1
10 04 * * * node /scripts/jd_shop.js >> /log/jd_shop.log 2>&1
10 01,3 * * * node /scripts/jd_speed.js >> /log/jd_speed.log 2>&1
40 0,8 * * * node /scripts/jd_speed_redpocke.js >> /log/jd_speed_redpocke.log 2>&1
0 0-23 * * * node /scripts/jd_super_redrain.js >> /log/jd_super_redrain.log 2>&1
36 0-23/4 * * * node /scripts/jd_syj.js >> /log/jd_syj.log 2>&1
33 03,14 * * * node /scripts/jd_qqxing.js >> /log/jd_qqxingp.log 2>&1
30 7,20 12-20 8 * node /scripts/jd_qcshj.js >> /log/jd_qcshj.log 2>&1
48 0,12,18 * * * node /scripts/jd_speed_sign.js >> /log/jd_speed_sign.log 2>&1
33 0,8 * * * node /scripts/jd_superBrand.js >> /log/jd_superBrand.log 2>&1
13 0,9,19 * * * node /scripts/jd_superBrandJK.js >> /log/jd_superBrandJK.log 2>&1
01 01,8 * * * node /scripts/jd_sgmh.js >> /log/jd_sgmh.log 2>&1
06 01,8 * * * node /scripts/jd_shangou.js >> /log/jd_shangou.log 2>&1
36 5,8,16,22 * * * nod01 01,8 * * * node /scripts/jd_sgmh.js >> /log/jd_sgmh.log 2>&1e /scripts/jd_star.js >> /log/jd_star.js 2>&1
22 01,9 * * * node /scripts/jd_star_shop.js >> /log/jd_star_shop.log 2>&1
18 6,9,15,17 * * * node /scripts/jd_superBrand1.js >> log/jd_superBrand1.log 2>&1
11 */3 * * * node /scripts/jd_superMarket.js >> /log/jd_superMarket.log 2>&1
48 04,13 * * * node /scripts/jd_sevenDay.js >> /log/jd_sevenDay.log 2>&1
32 09,16 * * * node /scripts/jd_txstock.js >> /log/jd_txstock.log 2>&1
18 1,8,13 * * * node /scripts/jd_try.js >> /log/jd_try.log 2>&1
38 17 * * * node /scripts/jd_try_notify.js >> /log/jd_try_notify.log 2>&1
23 1,3,7,11,15,17,19 * * * node /scripts/jd_tyt.js >> /log/jd_tyt.log 2>&1
10 0,10 * * * node /scripts/jd_twz-star.js >> /log/jd_twz-star.log 2>&1
38 17 * * * node /scripts/jd_unbind.js >> /log/jd_unbind.log 2>&1
15 0-23/4 * * * node /scripts/jd_unsubscribe.js >> /log/jd_unsubscribe.log 2>&1
42 9,15 * * * node /scripts/jd_wishingPool.js >> /log/jd_wishingPool.log 2>&1
22 2,8 * * * node /scripts/jd_wxFans.js >> /log/jd_wxFans.log 2>&1
42 2,8 * * * node /scripts/jd_wxgame.js >> /log/jd_wxgame.log 2>&1
25 2,8 * * * node /scripts/jd_wish.js >> /log/jd_wish.log 2>&1
1 0,9 * * * node /scripts/jd_xiaomi.js >> /log/jd_xiaomi.log 2>&1
18 6,11,17 * * * node /scripts/jd_xinruimz.js >> /log/jd_xinruimz.log 2>&1
15 3,18 * * * node /scripts/jd_zsign.js >> /log/jd_zsign.log 2>&1
2 01,7 * * * node /scripts/jd_zjb.js >> /log/jd_zjb.log 2>&1
12 01,7 * * * node /scripts/jd_zjd.js >> /log/jd_zjd.log 2>&1
18 3,9 * * * node /scripts/jx_sign.js >> /log/jx_sign.log 2>&1
18 4,11 * * * node /scripts/jx_sign_xd.js >> /log/jx_sign_xd.log 2>&1









