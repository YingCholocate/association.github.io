const superagent = require('superagent');
const fs = require('fs');
const axios = require('axios');

let sxau;
axios.get('https://jxfw.gdut.edu.cn/yzm?d=1648343940437').then((res) => {
  const axyc = res.data;
  console.log('axyc', axyc);
  // 需要登录的信息
  sxau = {
    account: '3219003999',
    pwd: '8de53f4385b8fdf118eb364403ad23d2',
    verifycode: axyc,
  };
});

const url = 'https://jxfw.gdut.edu.cn/login!welcome.action';
// 请求头
const headers = {
  Accept:
    'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
  'Accept-Encoding': 'gzip, deflate, br',
  'Accept-Language': 'zh-CN,zh;q=0.9',
  Connection: 'keep-alive',
  Host: 'jxfw.gdut.edu.cn',
  Referer: 'https://jxfw.gdut.edu.cn/',
  'sec-ch-ua': '" Not A;Brand";v="99", "Chromium";v="99", "Google Chrome";v="99"',
  'sec-ch-ua-mobile': '?0',
  'sec-ch-ua-platform': 'Windows',
  'Sec-Fetch-Dest': 'document',
  'Sec-Fetch-Mode': 'navigate',
  'Sec-Fetch-Site': 'same-origin',
  'Sec-Fetch-User': '?1',
  'Upgrade-Insecure-Requests': '1',
  'User-Agent':
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.82 Safari/537.36',
};
let cookie;
superagent
  .get(url) // 设置请求
  .set(headers) // 设置请求头
  .end(function (err, res) {
    if (err) {
      return console.log('获取cookie发生错误');
    }
    cookie = res.headers['set-cookie'];
    console.log(`获得到的cookie为：${cookie}`);
    // 模拟登陆
    login();
  });

function login() {
  superagent
    .post('https://jxfw.gdut.edu.cn/new/login')
    .set(headers)
    .set('Cookie', cookie)
    .send(sxau)
    .end(function (err, res) {
      if (err) {
        return console.log('模拟登陆出错');
      }

      getClass();
      // getTime()
    });
}
const headers1 = {
  Accept: 'application/json, text/javascript, */*; q=0.01',
  'Accept-Encoding': 'gzip, deflate, br',
  'Accept-Language': 'zh-CN,zh;q=0.9',
  Connection: 'keep-alive',
  Host: 'jxfw.gdut.edu.cn',
  Referer: 'https://jxfw.gdut.edu.cn/xsbjkbcx!xskbList.action?xnxqdm=202102&bjdm=105372094&zc=5',
  'sec-ch-ua': '" Not A;Brand";v="99", "Chromium";v="99", "Google Chrome";v="99"',
  'sec-ch-ua-mobile': '?0',
  'sec-ch-ua-platform': 'Windows',
  'Sec-Fetch-Dest': 'empty',
  'Sec-Fetch-Mode': 'cors',
  'Sec-Fetch-Site': 'same-origin',
  'User-Agent':
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.82 Safari/537.36',
  'X-Requested-With': 'XMLHttpRequest',
};
function getClass() {
  superagent
    .get('https://jxfw.gdut.edu.cn/xsbjkbcx!getKbRq.action?xnxqdm=202102&zc=5')
    .set(headers1)
    .set('Accept', '*/*')
    .set('Cookie', cookie)
    .end(function (err, res) {
      if (err) {
        return console.log(`获取课表文件失败${err}`);
      }
      fs.writeFile('result.json', res.text, function (err) {
        if (err) {
          return console.log(`课表文件写入失败${err}`);
        }
        console.log('课表文件写入成功');
      });
    });
}
