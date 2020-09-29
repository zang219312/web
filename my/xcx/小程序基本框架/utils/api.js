const httpusr = "https://www.tvgain.com/Debug/";
// const httpusr = "https://www.tvgain.com/";
const ApiRootUrl = httpusr + "api/Mobile/";
const GetUrl = httpusr + "WebForm/AdImage.aspx?";
const UpImg = httpusr + '/api/Mobile/UploadOrderFile?'        //上传图片
module.exports = {
  httpusr,
  GetUrl,
  login: ApiRootUrl + "UserLogin", //登录
  getDeviceInfo: ApiRootUrl + "GetDeviceInfo", //获取广告机的信息
  getDeviceList: ApiRootUrl + 'GetDeviceList', //获取广告机列表
  createAdOrder: ApiRootUrl + "CreateAdOrder", //创建订单（播放广告）
  uploadOrderFile: ApiRootUrl + "UploadOrderFile", //上传订单文件
  submitADOrder: ApiRootUrl + "SubmitADOrder", //提交订单
  getOrderList: ApiRootUrl + "GetOrderList", //获取用户的所有订单
  getAdOrder: ApiRootUrl + "GetAdOrder", //获取单个订单信息
  downloadDeviceView: ApiRootUrl + 'DownloadDeviceView', //获取设备的街景图片
  downloadOrderFile: ApiRootUrl + "DownloadOrderFile", //下载订单里的文件    暂时没用到
  getSimpleAD: ApiRootUrl + "GetSimpleAD", //获取轮播广告
  getMessageList: ApiRootUrl + "GetMessageList", //获取信息列表   
  getFileAction: ApiRootUrl + "GetFileAction", //获取文件操作记录   点赞等数据的显示
  setFileAction: ApiRootUrl + "SetFileAction", //获取文件操作记录   点赞等数据的点击事件

  upImg: UpImg + 'OrderID=',     //上传图片
  fileID: GetUrl + "FileID=", //下载订单里的文件   文件的ID
  simpleADID: GetUrl + "SimpleADID=", //轮播广告ID
  deviceID: GetUrl + 'DeviceID=', //设备ID（街景）
  getNewsID: GetUrl + 'NewsID=',   //商学院/合作共赢图片前缀
  getNewsDetail: ApiRootUrl + 'GetNewsDetail',   //获取新闻明细
  deleteOrderFile: ApiRootUrl + "DeleteOrderFile", //删除订单文件
  getUserAccount: ApiRootUrl + "GetUserAccount", //获取商户的代金券和收益
  getUserAccountList: ApiRootUrl + "GetUserAccountList", //账户交易记录
  getUserTicketList: ApiRootUrl + "GetUserTicketList", //获取代金券列表
  getCash: ApiRootUrl + "GetCash", //提现
  getSummary: ApiRootUrl + "GetSummary", //首页汇总信息
  getUserInfo: ApiRootUrl + "GetUserInfo", //获取用户信息
  updateUserInfo: ApiRootUrl + "UpdateUserInfo", //更新用户信息
  setPayResult: ApiRootUrl + "SetPayResult", //请求支付成功给后台
  getIndustryList: ApiRootUrl + "GetIndustryList", //获取行业
  calculateOrder: ApiRootUrl + "CalculateOrder", //获取行业
  getOrderSummary: ApiRootUrl + "GetOrderSummary", //获取订单数量
  payOrder: ApiRootUrl + "PayOrder",                //支付订单
  getNewsType: ApiRootUrl + "GetNewsType",           //合作共赢和商学院，获取分类接口
  getNewsList: ApiRootUrl + "GetNewsList",           //合作共赢和商学院，获取列表接口
  getAboutInfo: ApiRootUrl + "GetAboutInfo",           //关于我们
  deleteOrderAllFile: ApiRootUrl + "DeleteOrderAllFile",           //删除订单的所有文件
  getOrderFile: ApiRootUrl + "GetOrderFile",           //删除订单的所有文件
  setOrderFileIndex: ApiRootUrl + "SetOrderFileIndex",     //设置订单的索引
  getFileList: ApiRootUrl + "GetFileList",                 //获取文件列表
  getFavoriteList: ApiRootUrl + "GetFavoriteList",         //获取收藏列表
  deleteFavorite: ApiRootUrl + "DeleteFavorite",           //删除收藏
  addFavorite: ApiRootUrl + "AddFavorite",                 //添加收藏
}