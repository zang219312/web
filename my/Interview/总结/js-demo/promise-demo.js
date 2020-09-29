function loadImg(src) {
  return new Promise((resolve, reject) => {
    let img = document.createElement('img');
    img.onload = function () {
      resolve(img);
    };
    img.onerror = function () {
      let er = new Error(`图片${src}不存在`);
      reject(er);
    };
    img.src = src;
    document.body.appendChild(img);
  });
}

let url =
  'https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/14d0403664724b5eb36e235bc69d2d87~tplv-k3u1fbpfcp-zoom-1.image';

loadImg(url)
  .then((img1) => {
    console.log(img1.height);
    return img1;
  })
  .then((img1) => {
    console.log(img1.width);
  })
  .catch((ex) => {
    console.log(ex);
  });
