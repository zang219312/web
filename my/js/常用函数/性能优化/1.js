// * 检查加载性能
/**
 * 白屏时间：指从输入网址，到页面开始显示内容的时间。
 * 首屏时间：指从输入网址，到页面完全渲染的时间。
 */
// 白屏时间
new Date() - performance.timing.navigationStart ;

// 首屏时间
// 没有图片  
new Date() - performance.timing.navigationStart

// 如果有图片，则要在最后一个在首屏渲染的图片的 onload 事件里执行 new Date() - performance.timing.navigationStart 获取首屏时间
