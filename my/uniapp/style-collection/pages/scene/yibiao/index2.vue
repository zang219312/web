<template>
	<view class="content">
		<view class="dash-board">单仪表盘</view>
		<view class="text-area">
			<canvas canvas-id="canvasGauge" id="canvasGauge" class="charts"></canvas>
		</view>
		<view class="dash-board">双仪表盘</view>
		<view class="text-area">
			<canvas canvas-id="canvasGauge2" id="canvasGauge2" class="charts"></canvas>
		</view>
		<soure :url="url"></soure>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				url: 'https://ext.dcloud.net.cn/plugin?id=3466',
				yuanArg: { //设置仪表盘的样式尺寸
					arcTextVal: "202.6V", //显示的刻度
					arcTextTitle: "电压仪表", //显示的title
					arcTextValRight: "20.7A", //显示的刻度 右侧电流
					arcTextTitleRight: "电流仪表", //显示的title-右侧电流表
					totalVal: 365, //整个圆弧代表260
					dataVal: (202.6 / 365).toFixed(2), //圆弧270总弧度（0-270），val/270*100%数据占圆弧的百分比
					totalValRight: 30, //整个圆弧代表30
					dataValRight: (20.7 / 30).toFixed(2), //圆弧270总弧度（0-270），val/270*100%数据占圆弧的百分比【0~1】		
					arcOutLineWidth: 4, //外圆弧的线条宽
					arcOutRadius: 0.45, //设置仪表盘最外层圆弧的R半径
					arcUpColor: "#ff3355", //设置数据 上层 圆弧颜色
					arcDownColor: "#c0c0c0", //设置 最下层圆弧的底色 灰色默认
					arcUpColorRight: "#00bcd4", //设置数据 上层 圆弧颜色-右侧
					arcDownColorRight: "#c0c0c0", //设置 最下层圆弧的底色-右侧 灰色默认
					titleColor: {
						left: "#5a4467",
						right: "#212121"
					}, //底下标题字体颜色
					valColor: {
						left: "#ffaa00",
						right: "#00aa00"
					}, //中间仪表值val颜色
					splitRadiusMax: [0.45, 0.38], //长刻度线条的在圆弧的半径R区间
					splitRadiusMin: [0.38, 0.35], //短刻度线条的在圆弧的半径R区间	
				}
			}
		},
		onLoad() {

		},
		onReady() {
			let view = uni.createSelectorQuery().in(this).select("#canvasGauge");
			let context = uni.createCanvasContext('canvasGauge');
			const res = uni.getSystemInfoSync();
			view.fields({
				size: true,
				scrollOffset: true
			}, data => {
				//绘制单独一个仪表盘
				this.drawPanel(context, data);
			}).exec();
			let view2 = uni.createSelectorQuery().in(this).select("#canvasGauge2");
			let context2 = uni.createCanvasContext('canvasGauge2');
			const res2 = uni.getSystemInfoSync();
			view2.fields({
				size: true,
				scrollOffset: true
			}, data => {
				//绘制双仪表 左侧 右侧
				this.drawPanel2(context2, data);
			}).exec();
		},
		methods: {
			//绘制单独一个仪表盘
			drawPanel(context, data) {
				context.setStrokeStyle(this.yuanArg.arcDownColor); //地下灰色背景圆弧
				context.setLineWidth(this.yuanArg.arcOutLineWidth); //设置线条宽度
				context.setLineCap('round');
				context.beginPath();
				//在canvas中间建立圆心 w/2,h/2 圆arc的半径R = h*0.4(圆的直径占整个canvas的高80%,
				//默认顺时针方向3点钟为0°起始绘制弧形角度135，-45完整圆弧区间 共270deg)
				context.arc(data.width / 2, data.height / 2, data.height * this.yuanArg.arcOutRadius, 135 * Math.PI / 180, 405 *
					Math.PI / 180);
				context.stroke();
				context.setStrokeStyle(this.yuanArg.arcUpColor); //数据  值占整个圆弧的百分比
				context.beginPath();
				//在canvas中间建立圆心 w/2,h/2
				context.arc(data.width / 2, data.height / 2, data.height * this.yuanArg.arcOutRadius, 135 * Math.PI / 180, (135 +
					this.yuanArg.dataVal * 270) * Math.PI / 180);
				context.stroke();
				context.setStrokeStyle("rgba(33,44,103,0.5)");
				context.setLineWidth(2);
				var R = data.height * this.yuanArg.splitRadiusMax[0] - this.yuanArg.arcOutLineWidth / 2 - 1,
					R2 = data.height * this.yuanArg.splitRadiusMax[1],
					parent = 12,
					O = {
						x: data.width / 2,
						y: data.height / 2
					};
				for (var ix = 0; ix < parent; ix++) {
					var x = O.x + Math.cos(Math.PI / 180 * ix * 360 / parent) * R,
						y = O.y + Math.sin(Math.PI / 180 * ix * 360 / parent) * R,
						x2 = O.x + Math.cos(Math.PI / 180 * ix * 360 / parent) * R2,
						y2 = O.y + Math.sin(Math.PI / 180 * ix * 360 / parent) * R2;
					context.beginPath();
					if (135 < ix * 360 / parent) {
						context.moveTo(x, y, 1, 0, 2 * Math.PI);
						context.lineTo(x2, y2, 1, 0, 2 * Math.PI);
					} else if (45 > ix * 360 / parent) {
						context.moveTo(x, y, 1, 0, 2 * Math.PI);
						context.lineTo(x2, y2, 1, 0, 2 * Math.PI);
					}
					context.stroke();
				}
				var R = data.height * this.yuanArg.splitRadiusMin[0],
					R2 = data.height * this.yuanArg.splitRadiusMin[1],
					parent = 72,
					O = {
						x: data.width / 2,
						y: data.height / 2
					};
				context.setStrokeStyle("#999");
				context.setLineWidth(1);
				for (var ix = 0; ix < parent; ix++) {
					var x = O.x + Math.cos(Math.PI / 180 * ix * 360 / parent) * R,
						y = O.y + Math.sin(Math.PI / 180 * ix * 360 / parent) * R,
						x2 = O.x + Math.cos(Math.PI / 180 * ix * 360 / parent) * R2,
						y2 = O.y + Math.sin(Math.PI / 180 * ix * 360 / parent) * R2;
					context.beginPath();
					if (135 < ix * 360 / parent && ix % 6 != 0) {
						context.moveTo(x, y, 1, 0, 2 * Math.PI);
						context.lineTo(x2, y2, 1, 0, 2 * Math.PI);
					} else if (45 > ix * 360 / parent && ix % 6 != 0) {
						context.moveTo(x, y, 1, 0, 2 * Math.PI);
						context.lineTo(x2, y2, 1, 0, 2 * Math.PI);
					}
					context.stroke();
				}
				context.setTextAlign("center");
				context.setTextBaseline("middle");
				context.setFillStyle("#FF3355");
				context.fillText(this.yuanArg.arcTextVal, data.width / 2, data.height / 2); //电压值在圆心中间位置
				context.setFillStyle("#212C67");
				context.setFontSize(15);
				context.fillText(this.yuanArg.arcTextTitle, data.width / 2, data.height / 2 + data.height * 0.3); //圆的下方位置30%
				context.draw();
			},
			//双仪表盘
			drawPanel2(context, data) {
				let leftSizeX = data.width / 4,
					rightSizeX = data.width / 4 * 3;
				context.setStrokeStyle(this.yuanArg.arcDownColor); //地下灰色背景圆弧
				context.setLineWidth(this.yuanArg.arcOutLineWidth); //设置线条宽度
				context.setLineCap('round');

				context.beginPath();
				//在canvas中间建立圆心 w/2,h/2 圆arc的半径R = h*0.4(圆的直径占整个canvas的高80%,
				//默认顺时针方向3点钟为0°起始绘制弧形角度135，-45完整圆弧区间 共270deg)
				context.arc(leftSizeX, data.height / 2, data.height * this.yuanArg.arcOutRadius, 135 * Math.PI / 180, 405 * Math.PI /
					180);
				context.stroke();
				context.setStrokeStyle(this.yuanArg.arcDownColorRight); //数据  值占整个圆弧的百分比

				context.beginPath();
				context.arc(rightSizeX, data.height / 2, data.height * this.yuanArg.arcOutRadius, 135 * Math.PI / 180, 405 * Math.PI /
					180);
				context.stroke();
				context.setStrokeStyle(this.yuanArg.arcUpColor); //数据  值占整个圆弧的百分比

				context.beginPath();
				//在canvas中间建立圆心 w/2,h/2
				context.arc(leftSizeX, data.height / 2, data.height * this.yuanArg.arcOutRadius, 135 * Math.PI / 180, (135 + this.yuanArg
					.dataVal * 270) * Math.PI / 180);
				context.stroke();

				context.setStrokeStyle(this.yuanArg.arcUpColorRight); //数据  值占整个圆弧的百分比
				context.beginPath();
				context.arc(rightSizeX, data.height / 2, data.height * this.yuanArg.arcOutRadius, 135 * Math.PI / 180, (135 + this.yuanArg
					.dataValRight * 270) * Math.PI / 180);
				context.stroke();
				//左侧刻度尺 也是默认刻度尺
				this.drawSplitLine(context, leftSizeX, data, this.yuanArg.arcTextVal, this.yuanArg.arcTextTitle,
					this.yuanArg.valColor.left, this.yuanArg.titleColor.left);
				//右侧刻度尺 电流
				this.drawSplitLine(context, rightSizeX, data, this.yuanArg.arcTextValRight, this.yuanArg.arcTextTitleRight,
					this.yuanArg.valColor.right, this.yuanArg.titleColor.right);
				context.draw();
			},
			//刻度分离函数
			drawSplitLine(context, leftSizeX, data, val, title, valColor, titleColor) {
				context.setStrokeStyle("rgba(33,44,103,0.5)");
				context.setLineWidth(2);
				var R = data.height * this.yuanArg.splitRadiusMax[0] - this.yuanArg.arcOutLineWidth / 2 - 1,
					R2 = data.height * this.yuanArg.splitRadiusMax[1],
					parent = 12,
					O = {
						x: leftSizeX,
						y: data.height / 2
					};
				for (var ix = 0; ix < parent; ix++) {
					var x = O.x + Math.cos(Math.PI / 180 * ix * 360 / parent) * R,
						y = O.y + Math.sin(Math.PI / 180 * ix * 360 / parent) * R,
						x2 = O.x + Math.cos(Math.PI / 180 * ix * 360 / parent) * R2,
						y2 = O.y + Math.sin(Math.PI / 180 * ix * 360 / parent) * R2;
					context.beginPath();
					if (135 < ix * 360 / parent) {
						context.moveTo(x, y, 1, 0, 2 * Math.PI);
						context.lineTo(x2, y2, 1, 0, 2 * Math.PI);
					} else if (45 > ix * 360 / parent) {
						context.moveTo(x, y, 1, 0, 2 * Math.PI);
						context.lineTo(x2, y2, 1, 0, 2 * Math.PI);
					}
					context.stroke();
				}
				var R = data.height * this.yuanArg.splitRadiusMin[0],
					R2 = data.height * this.yuanArg.splitRadiusMin[1],
					parent = 72,
					O = {
						x: leftSizeX,
						y: data.height / 2
					};
				context.setStrokeStyle("#999");
				context.setLineWidth(1);
				for (var ix = 0; ix < parent; ix++) {
					var x = O.x + Math.cos(Math.PI / 180 * ix * 360 / parent) * R,
						y = O.y + Math.sin(Math.PI / 180 * ix * 360 / parent) * R,
						x2 = O.x + Math.cos(Math.PI / 180 * ix * 360 / parent) * R2,
						y2 = O.y + Math.sin(Math.PI / 180 * ix * 360 / parent) * R2;
					context.beginPath();
					if (135 < ix * 360 / parent && ix % 6 != 0) {
						context.moveTo(x, y, 1, 0, 2 * Math.PI);
						context.lineTo(x2, y2, 1, 0, 2 * Math.PI);
					} else if (45 > ix * 360 / parent && ix % 6 != 0) {
						context.moveTo(x, y, 1, 0, 2 * Math.PI);
						context.lineTo(x2, y2, 1, 0, 2 * Math.PI);
					}
					context.stroke();
				}
				context.setFontSize(12);
				context.setTextAlign("center");
				context.setTextBaseline("middle");
				context.setFillStyle(valColor);
				context.fillText(val, leftSizeX, data.height / 2); //电压值在圆心中间位置
				context.setFillStyle(titleColor);
				context.fillText(title, leftSizeX, data.height / 2 + data.height * 0.3); //圆的下方位置30%
			}
		}
	}
</script>
<style scoped>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.dash-board {
		height: 90rpx;
		line-height: 90rpx;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}
</style>
