<template>
	<view class="content">
		<canvas canvas-id="thumsCanvas" id="thumsCanvas" style="width:100px;height:300px"></canvas>
		<button class="button" type="default" @click="thumbsUp">连续点击按钮查看效果</button>
		<soure :url="url"></soure>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				url: 'https://ext.dcloud.net.cn/plugin?id=2906',
				thumbsUpContext: null,
				thumbsUpTimer: 0,
				thumbsUpQueue: {},
				thumbsUpWidth: 100,
				thumbsUpHeight: 300,
			}
		},
		onLoad() {

		},
		onReady() {
			this.thumbsUpContext = uni.createCanvasContext('thumsCanvas');
			var that = this;
		},
		methods: {
			//点赞动画 start
			thumbsUp() {
				const image = "/static/other/" + this.getRandomInt(1, 10) + ".png";
				const anmationData = {
					id: new Date().getTime(),
					timer: 0,
					opacity: 0.5,
					pathData: this.generatePathData(),
					image: image,
					factor: {
						speed: 0.004,
						t: 0
					}
				};
				if (Object.keys(this.thumbsUpQueue).length > 0) {
					this.thumbsUpQueue[anmationData.id] = anmationData;
				} else {
					this.thumbsUpQueue[anmationData.id] = anmationData;
					this.createThumbsAnimate();
				}
			},

			getRandom(min, max) {
				return Math.random() * (max - min) + min;
			},

			getRandomInt(min, max) {
				return Math.floor(Math.random() * (max - min + 1)) + min;
			},

			generatePathData() {
				let width = this.thumbsUpWidth,
					height = this.thumbsUpHeight;
				const p0 = {
					x: 0.65 * width,
					y: height
				};
				const p1 = {
					x: this.getRandom(0.22 * width, 0.33 * width),
					y: this.getRandom(0.5 * height, 0.75 * height)
				};
				const p2 = {
					x: this.getRandom(0, 0.88 * width),
					y: this.getRandom(0.25 * height, 0.5 * height)
				};
				const p3 = {
					x: this.getRandom(0, 0.88 * width),
					y: this.getRandom(0, 0.125 * height)
				};
				return [p0, p1, p2, p3];
			},

			updatePoint(data, factor) {
				const p0 = data[0];
				const p1 = data[1];
				const p2 = data[2];
				const p3 = data[3];
				const t = factor.t;
				const cx1 = 3 * (p1.x - p0.x);
				const bx1 = 3 * (p2.x - p1.x) - cx1;
				const ax1 = p3.x - p0.x - cx1 - bx1;
				const cy1 = 3 * (p1.y - p0.y);
				const by1 = 3 * (p2.y - p1.y) - cy1;
				const ay1 = p3.y - p0.y - cy1 - by1;
				const x = ax1 * (t * t * t) + bx1 * (t * t) + cx1 * t + p0.x;
				const y = ay1 * (t * t * t) + by1 * (t * t) + cy1 * t + p0.y;
				return {
					x,
					y
				};
			},

			createThumbsAnimate() {
				let width = this.thumbsUpWidth,
					height = this.thumbsUpHeight;
				var that = this;
				Object.keys(that.thumbsUpQueue).forEach(key => {
					const anmationData = that.thumbsUpQueue[+key];
					const {
						x,
						y
					} = this.updatePoint(
						anmationData.pathData,
						anmationData.factor
					);
					const speed = anmationData.factor.speed;
					anmationData.factor.t += speed;
					var curWidth = 40;
					curWidth = (height - y) / 1.5;
					curWidth = Math.min(40, curWidth);
					var curAlpha = anmationData.opacity;
					curAlpha = y / height;
					curAlpha = Math.min(1, curAlpha);
					that.thumbsUpContext.globalAlpha = curAlpha;
					that.thumbsUpContext.drawImage(anmationData.image, x - curWidth / 2, y, curWidth, curWidth);
					if (anmationData.factor.t > 1) {
						delete that.thumbsUpQueue[anmationData.id];
					}
					if (y > height) {
						delete that.thumbsUpQueue[anmationData.id];
					}
				});
				that.thumbsUpContext.draw();
				if (Object.keys(that.thumbsUpQueue).length > 0) {
					that.thumbsUpTimer = setTimeout(() => {
						that.createThumbsAnimate();
					}, 5);
				} else {
					clearTimeout(that.thumbsUpTimer);
					that.thumbsUpContext.draw();
				}
			},
			//点赞动画 end
		}
	}
</script>

<style lang="scss">
	page{
		background-color: $uni-bg-color;
	}
	
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.button {
		font-size: 30rpx;
		width: 400rpx;
		line-height: 70rpx;
	}
</style>
