import keys from '../key.config';
const https = require('https');
const fs = require('fs');
const qs = require('querystring');
const cuid = require('cuid');
const request = require('request');

const param = qs.stringify({
  grant_type: 'client_credentials',
  client_id: keys.text_client_id,
  client_secret: keys.text_client_secret,
});

// 获取秘钥
const getSecret = (params = param) => new Promise((resolve) => {
  https.get({
    hostname: 'aip.baidubce.com',
    path: `/oauth/2.0/token?${params}`,
    agent: false,
  }, (res) => {
    let data = '';
    res.on('data', (d) => {
      data += d;
    });
    res.on('end', () => {
      resolve(JSON.parse(data).access_token);
    });
  });
});

const generalBasic = (token, image, type = 'general_basic') => { // 调用API识别图片
  const options = {
    url: `https://aip.baidubce.com/rest/2.0/ocr/v1/${type}?access_token=${token}`,
    header: {
      'content-type': 'application/x-www-form-urlencoded',
    },
    form: {
      image,
    },
  };
  return new Promise((resolve) => {
    request.post(options, (error, response) => {
      if (error) {
        console.log(`error ==>${error}`);
      } else {
        resolve(response.body);
      }
    });
  });
};

const fileTobase = file => //  图片转base64
  new Promise((resolve) => {
    const base = fs.readFileSync(file.path).toString('base64');
    resolve(base);
  });

// 文字识别
export const imgOCR = async (file) => {
  const base = await fileTobase(file);
  const token = await getSecret();
  const basic = await generalBasic(token, base);
  const arr = JSON.parse(basic).words_result.map(item => item.words);
  return arr.join(' ');
};

// 语音合成

export const getRadio = async (message) => {
  const param = qs.stringify({
    grant_type: 'client_credentials',
    client_id: keys.radio_client_id,
    client_secret: keys.radio_client_secret,
  });
  const token = await getSecret(param);
  return new Promise((resolve) => {
    const payload = qs.stringify({
      tex: encodeURIComponent(message),
      tok: token,
      cuid: cuid(),
      ctp: 1,
      lan: 'zh',
      spd: 3,
      per: 4,
    });
    request.get(`http://tsn.baidu.com/text2audio?${payload}`, (error, response) => {
      if (error) {
        console.log(`error ==>${error}`);
      } else {
        resolve(response.request.href);
      }
    });
  });
};
