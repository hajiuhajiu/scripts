'''
by、TY
根据JS版本修改而来
要安装 
pip install pycryptodome
调用方法：
from utils.h5st31 import h5st31
new_h5st31=h5st31({
    'appId':'af89e',#h5st里面的appId
    "appid": "jxh5",
    "clientVersion": "1.2.5",
    "client": "android",
    "pin": "pin",
    "ua":"UA"
})
new_h5st31.genAlgo()
get=new_h5st31.getbody(functionId,body,code)
code=True 就是需要拼接t的时间戳
print(get)
'''
import requests
import json
import random
import re
import codecs
import base64
import logging
from urllib.parse import quote
import time, datetime
from hashlib import sha256, sha512, md5
import hmac
from Crypto.Util.Padding import pad
from Crypto.Cipher import AES

activity_name = "H5ST3.1"
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s.%(msecs)03d %(message)s",#%(levelname)s %(lineno)d 
    datefmt="%M:%S"
)
logger = logging.getLogger(activity_name)

def getTimestamp():
    return int(round(time.time() * 1000))

def randomString(num,charset="abcdefghijklmnopqrstuvwxyz0123456789"):
    randomstr = ""
    for i in range(num):
        randomstr += random.choice(charset)
    return randomstr


#async

def aes_cipher(key, aes_str):
    aes = AES.new(key.encode('utf-8'), AES.MODE_CBC,b"0102030405060708")
    pad_pkcs7 = pad(aes_str.encode('utf-8'), AES.block_size, style='pkcs7')  # 选择pkcs7补全
    encrypt_aes = aes.encrypt(pad_pkcs7)
    encrypt_data=codecs.encode(encrypt_aes,'hex').decode('utf-8')
    return encrypt_data
    #den_text = aes.decrypt(ciphertext) # 解密密文


def get_sign(algo, data, key):
    message = data.encode('utf-8')
    if algo == 'HmacSHA256':
        algo = sha256
    elif algo == 'HmacSHA512':
        algo = sha512
    elif algo == 'HmacMD5':
        algo = md5
    elif algo == 'SHA256':
        data_sha = sha256(message).hexdigest()
        return data_sha
    elif algo == 'SHA512':
        data_sha = sha512(message).hexdigest()
        return data_sha
    elif algo == 'MD5':
        data_sha = md5(message).hexdigest()
        return data_sha
    else:
        print("加密方式有误！")
        return None
    key = key.encode('utf-8')
    sign = hmac.new(key, message, digestmod=algo).hexdigest()
    return sign


class h5st31:
    def __init__(self,opt):
        #{body,ua,pin,clientVersion,client,fn,appId,appid,code,flag} = opt
        self.valid=True
        list1="ua,pin,clientVersion,client,appId,appid".split(",")
        for k in list1:
            if k in opt:
                1
                #self[k]=opt[k]
            else:
                print(k+"未定义！")
                self.valid=False
                return False
            
        self.appid=opt["appid"]
        self.appId=opt["appId"]#h5st里面的appId
        self.client=opt["client"]
        self.clientVersion=opt["clientVersion"]
        self.pin=opt["pin"]
        self.ua=opt["ua"]
        self.version="3.1"
        self.tk=""
        if "fp" in opt:
            self.fp=opt["fp"]
        else:
            self.fp=self.generateFp()

        digestmod = re.findall(r'\(([^)]+)\)', self.ua)
        #print(digestmod)
        if len(digestmod) > 0:
            self.sua=digestmod[0]
            
    def generateFp(self):
        remove = ""
        charset = "0123456789"
        rd = random.randint(0,9)
        while len(remove)<3:
            s = randomString(1,charset)
            if remove.find(s) == -1:
                remove += s
        for ch in remove:
            charset = charset.replace(ch, "")
        s2 = randomString(rd,charset) + remove + randomString(12 - rd,charset) + str(rd)
        if self.version == "3.1":
            s2s = list(s2)
            s2=""
            while len(s2s):s2+=str(9 - int(s2s.pop()))
        return s2

    def genAlgo(self):
        headers = {
            "Host": "cactus.jd.com",
            "Content-Type": "application/json",
            "User-agent": self.ua
        }
        if self.version=="3.1":
            aes_str=json.dumps({
                "wc":1,"wd":0,"l":"zh-CN","ls":"zh-CN","ml":0,"pl":0,"av":"","ua":self.ua,
                "sua":self.sua,"pp":{"p1":self.pin},"pp1":"","w":393,"h":873,
                "ow":393,"oh":779,"url":"","og":"","pr":2.75,"re":"","ai":self.appId,"fp":self.fp
            },indent=2,ensure_ascii=False)
            expandParams = aes_cipher("wm0!@w-s#ll1flo(", aes_str)
        else:expandParams=""
        data = json.dumps({
            "version": self.version,
            "fp": self.fp,
            "appId": self.appId,
            "timestamp": getTimestamp(),
            "platform": "web",
            "expandParams": expandParams
        })
        try:
            res = res = requests.post("https://cactus.jd.com/request_algo?g_ty=ajax", headers=headers, data=data, timeout=5).text
            try:
                res = json.loads(res)
                if res['status'] == 200:
                    #print(res)
                    result=res["data"]["result"]
                    self.tk = result["tk"]
                    algo = result['algo']
                    self.algo = algo
                    digestmod = re.findall(r'algo\.(\w+)\(', algo)
                    rds = re.findall(r'rd=\'(.*?)\';', algo)
                    if len(digestmod) > 0 and len(rds) > 0:
                        #return algo.HmacMD5(str,tk)}"}}}
                        self.rd = rds[0]
                        self.ac=digestmod[0]
                        return True
                else:
                    print(res)
            except Exception as e:
                logger.info(f"genAlgo api解析异常：{str(e)}")
        except Exception as e:
            logger.info(f"genAlgo api超过2s请求超时...")
        self.valid=False
        return False
    
    def geth5st(self,functionId,body,code=True):
        t = getTimestamp()
        if len(self.tk)>1:
            #print("获取Algo")
            hq=self.genAlgo()
            if hq==False:
                return [False,"获取Algo失败"]
        
        if isinstance(body,dict):body=json.dumps(body)#判断body数据类型是否为dict 是就转化为json
        Data = {
            "appid":self.appid,
            "functionId": functionId,
            "body": body,
            "clientVersion": self.clientVersion,
            "client": self.client
        }
        list2=["appid", "body", "client", "clientVersion", "functionId"]
        if code:
            Data["t"] = t
            list2.append("t")
        #Data["functionId"] = ""
        tmp=[]
        for k in list2:
            if k =="body":
                tt=get_sign("SHA256", Data[k],"")
            else:
                tt=Data[k]
            tmp.append('{}:{}'.format(k, tt))
        st='&'.join(tmp)
        t2 = getTimestamp()
        dt_object = datetime.datetime.fromtimestamp(t2 / 1000, None)  # 时间戳转换成字符串日期时间
        timeDate = dt_object.strftime("%Y%m%d%H%M%S%f")[0:17]

        str1 = self.tk + self.fp + timeDate + str(self.appId) + self.rd
        #'algo': "function test(tk,fp,ts,ai,algo){var rd='e5vwEDVPOK0d';var str=`${tk}${fp}${ts}${ai}${rd}`;return algo.HmacMD5(str,tk)}"}}}
        sign_1=get_sign(self.ac, str1, self.tk)
        hash2 = get_sign("HmacSHA256",st,sign_1)
        aes_str=json.dumps({
            "sua": self.sua,
            "pp": {"p1":self.pin},
            "fp": self.fp
        },indent=2,ensure_ascii=False)
        enStr = aes_cipher("wm0!@w_s#ll1flo(", aes_str)
        #__dirname.split(/[\\/]/).pop() !== "function" && (timeDate = timeDate - 1);
        h5st = ';'.join([timeDate, self.fp, self.appId, self.tk, hash2, self.version, str(t2), enStr])
        return [True,h5st,t,body]
        
    def getbody(self,functionId,body,code=True):
        ok,h5st,t,body=self.geth5st(functionId,body,code)
        if ok:
            url="functionId=" + functionId + "&body=" + quote(body)
            if code:url+="&t=" + str(t)
            url+="&appid=" + self.appid + "&client=" + self.client + "&clientVersion=" + self.clientVersion + "&h5st=" + quote(h5st)
            return url
        else:
            return False