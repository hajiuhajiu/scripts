jd 618  auto.js  移步 https://github.com/hajiuhajiu/618autojs



自用！
# docker 一键安装：
下载putty，进入终端，复制下面命令，按提示操作，默认回车：

```
wget https://cdn.jsdelivr.net/gh/hajiuhajiu/jd-base@main/install_scripts/docker_install_jd.sh -O docker_install_jd.sh && chmod +x docker_install_jd.sh && bash docker_install_jd.sh
```
安装完成后输入docker设备地址192.168.1.1:5678 用户名admin密码admin5678 添加cookie

完成后等自动同步2-3次就能更新到最新版本，


# 青龙拉库命令:
包含开卡脚本:

```
ql repo https://github.com/hajiuhajiu/scripts.git "jd_|jx_|kk_" "activity|backUp" "^jd[^_]|USER|sendNotify|JD_DailyBonus|utils|function|ql"
```
