<template>
	<view>
		<view class="comm-content">
			<soure :url="url"></soure>
		</view>
		<canvas canvas-id="mycanvas" class="canvas" />
		<image class="heart" :style="style_img" src="/static/qipao/dianzan-1.png" @click="onClickImage"></image>
	</view>
</template>

<script>
	var lastFrameTime = 0;
	var count = 0;
	var ctx = null;
	var factor = {
		speed: 0.006, // 运动速度，值越小越慢
		t: 0 //  贝塞尔函数系数
	};
	var that;
	var timer = null; // 循环定时器
	export default {
		data() {
			return {
				url: 'https://blog.csdn.net/abs625/article/details/101542771?utm_medium=distribute.pc_relevant.none-task-blog-BlogCommendFromMachineLearnPai2-10.channel_param',
				style_img: '',
				img_path: [
					[{
						x: 30,
						y: 400
					}, {
						x: 70,
						y: 300
					}, {
						x: -50,
						y: 150
					}, {
						x: 30,
						y: 0
					}],
					[{
						x: 30,
						y: 400
					}, {
						x: 30,
						y: 300
					}, {
						x: 80,
						y: 150
					}, {
						x: 30,
						y: 0
					}],
					[{
						x: 30,
						y: 400
					}, {
						x: 0,
						y: 90
					}, {
						x: 80,
						y: 100
					}, {
						x: 30,
						y: 0
					}]
				]
			}
		},
		onLoad() {
			that = this
			//获取canvas实例
			ctx = uni.createCanvasContext('mycanvas')
		},
		onUnload() {
			if (timer != null) {
				clearTimeout(timer)
			}
		},
		onReady() {

		},
		methods: {
			//不断绘制图片到cavans
			requestAnimationFrame(callback) {
				var currTime = new Date().getTime();
				//手机屏幕刷新率一般为60Hz，大概16ms刷新一次，这里为了使页面看上去更流畅自然,通过改变timedis的值可以控制动画的快慢
				var timedis = 16 - (currTime - lastFrameTime)
				var timeToCall = Math.max(0, timedis);
				var id = setTimeout(callback, timeToCall);
				lastFrameTime = currTime + timeToCall;
				return id;
			},
			drawImage: function(data, repeatcount) {
				if (repeatcount == 0) {
					return
				}
				var p10 = data[0][0]; // 三阶贝塞尔曲线起点坐标值
				var p11 = data[0][1]; // 三阶贝塞尔曲线第一个控制点坐标值
				var p12 = data[0][2]; // 三阶贝塞尔曲线第二个控制点坐标值
				var p13 = data[0][3]; // 三阶贝塞尔曲线终点坐标值

				var p20 = data[1][0];
				var p21 = data[1][1];
				var p22 = data[1][2];
				var p23 = data[1][3];

				var p30 = data[2][0];
				var p31 = data[2][1];
				var p32 = data[2][2];
				var p33 = data[2][3];

				var t = factor.t;

				/*计算多项式系数*/
				var cx1 = 3 * (p11.x - p10.x);
				var bx1 = 3 * (p12.x - p11.x) - cx1;
				var ax1 = p13.x - p10.x - cx1 - bx1;

				var cy1 = 3 * (p11.y - p10.y);
				var by1 = 3 * (p12.y - p11.y) - cy1;
				var ay1 = p13.y - p10.y - cy1 - by1;

				/*计算xt yt坐标值 */
				var xt1 = ax1 * (t * t * t) + bx1 * (t * t) + cx1 * t + p10.x;
				var yt1 = ay1 * (t * t * t) + by1 * (t * t) + cy1 * t + p10.y;

				/** 计算多项式系数*/
				var cx2 = 3 * (p21.x - p20.x);
				var bx2 = 3 * (p22.x - p21.x) - cx2;
				var ax2 = p23.x - p20.x - cx2 - bx2;

				var cy2 = 3 * (p21.y - p20.y);
				var by2 = 3 * (p22.y - p21.y) - cy2;
				var ay2 = p23.y - p20.y - cy2 - by2;

				/*计算xt yt坐标值*/
				var xt2 = ax2 * (t * t * t) + bx2 * (t * t) + cx2 * t + p20.x;
				var yt2 = ay2 * (t * t * t) + by2 * (t * t) + cy2 * t + p20.y;


				/** 计算多项式系数*/
				var cx3 = 3 * (p31.x - p30.x);
				var bx3 = 3 * (p32.x - p31.x) - cx3;
				var ax3 = p33.x - p30.x - cx3 - bx3;

				var cy3 = 3 * (p31.y - p30.y);
				var by3 = 3 * (p32.y - p31.y) - cy3;
				var ay3 = p33.y - p30.y - cy3 - by3;

				/*计算xt yt坐标值*/
				var xt3 = ax3 * (t * t * t) + bx3 * (t * t) + cx3 * t + p30.x;
				var yt3 = ay3 * (t * t * t) + by3 * (t * t) + cy3 * t + p30.y;
				factor.t += factor.speed;
				ctx.drawImage("/static/qipao/dianzan-2.png", xt1, yt1, 30, 30);
				ctx.drawImage("/static/qipao/dianzan-4.png", xt2, yt2, 30, 30);
				ctx.drawImage("/static/qipao/dianzan-3.png", xt3, yt3, 30, 30);
				ctx.draw();
				if (factor.t > 1) {
					factor.t = 0;
					clearTimeout(timer)
					if (repeatcount <= -1) {
						that.startTimer(repeatcount)
					} else {
						if (count < repeatcount) {
							that.startTimer(repeatcount)
							count++
						} else {
							that.draworiginal()
							count = 0;
						}
					}
				} else {
					timer = that.requestAnimationFrame(function() {
						that.drawImage(that.img_path, repeatcount)
					})
				}
			},
			onClickImage: function(e) {
				//点击心形的时候动画效果
				that.style_img = 'transform: scale(1.3);'
				setTimeout(function() {
					that.style_img = 'transform:scale(1);'
				}, 500)
				factor.t = 2
				count = 0
				that.startTimer(1)
			},
			//repeatcount -1就是循环，其他大于零的整数就是动画循环次数
			startTimer: function(repeatcount) {
				that.drawImage(that.img_path, repeatcount)
			},
			draworiginal() {
				ctx.drawImage("/static/qipao/dianzan-2.png", 30, 400, 30, 30);
				ctx.drawImage("/static/qipao/dianzan-4.png", 30, 400, 30, 30);
				ctx.drawImage("/static/qipao/dianzan-3.png", 30, 400, 30, 30);
				ctx.draw();
			}
		},
	}
</script>

<style lang="scss">
	.canvas {
		background: transparent;
		width: 90px;
		height: 400px;
		position: fixed;
		right: 20px;
		bottom: 60px;
	}

	/* transform下面的属性是为了让动画看上去更自然 */
	.heart {
		position: fixed;
		right: 45px;
		bottom: 30px;
		width: 40px;
		height: 40px;
		transform: scale(1);
		-webkit-transform: scale(1);
		-webkit-transition: ease all;
		-moz-transition: ease all;
		transition: ease all;
		-webkit-transition-duration: 700ms;
		-moz-transition-duration: 700ms;
		transition-duration: 700ms;
	}
</style>
