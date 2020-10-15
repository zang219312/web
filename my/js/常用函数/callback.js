// 回调函数测试
invoice()

function invoice() {
  checkLogin(res => {
    console.log(res);
  }, true)
}

function checkLogin(callback, showDialog) {
  console.log(callback);
  if (showDialog) {
    return
  }
  callback(true)
}