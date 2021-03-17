<template>
	<view class="progress_box" :style="{'background-color': pageBg}">
		<canvas :canvas-id="id" :style="{'width':width+'px','height':height+'px',backgroundColor:'#a9c6b6'}" disable-scroll
		 @touchstart="touchStart" @touchmove="touchMove" @touchend="touchEnd"></canvas>
		<view class="progress_txt" :style="{'width':centerRadius+'px','height':centerRadius+'px','background-color': circleBg}">
			<view class="progress_info_top" v-if="title">{{title}}</view>
			<view class="progress_info_center">
				<view class="progress_info_center_a">
					{{ integer }}
				</view>
				<view class="progress_info_center_c">
					<view class="progress_info_center_c1"><text class="c1_text" v-if="showUnit">{{unit}}</text></view>
					<view class="progress_info_center_c2"><text class="c1_text" v-if="showDecimal">.{{ decimal }}</text></view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	function isInAngleRange(angle, startAngle, endAngle) {
		function adjust(angle) {
			while (angle < 0) {
				angle += 2 * Math.PI;
			}
			while (angle > 2 * Math.PI) {
				angle -= 2 * Math.PI;
			}
			return angle;
		}
		angle = adjust(angle);
		startAngle = adjust(startAngle);
		endAngle = adjust(endAngle);
		if (startAngle > endAngle) {
			endAngle += 2 * Math.PI;
			if (angle < startAngle) {
				angle += 2 * Math.PI;
			}
		}
		return angle >= startAngle && angle <= endAngle;
	}

	function isInArea(e, r) {
		return Math.pow(e.x - r.x, 2) + Math.pow(e.y - r.y, 2) <= Math.pow(r.r, 2);
	}

	function isInUp(e, r) {
		if (isInArea(e, r)) {
			let angle = Math.atan2(r.y - e.y, e.x - r.x);
			angle = -angle;
			if (isInAngleRange(angle, 0.5 * Math.PI, 0.75 * Math.PI)) {
				return true;
			} else {
				return false;
			}
		} else {
			return false;
		}
	}

	function isInDown(e, r) {
		if (isInArea(e, r)) {
			let angle = Math.atan2(r.y - e.y, e.x - r.x);
			angle = -angle;
			if (isInAngleRange(angle, 0.25 * Math.PI, 0.5 * Math.PI)) {
				return true;
			} else {
				return false;
			}
		} else {
			return false;
		}
	}

	function isInCtrl(e, r) {
		if (isInArea(e, r)) {
			return true;
		} else {
			return false;
		}
	}
	export default {
		props: {
			id: {
				default: 'temperature'
			},
			val: {
				default: 0
			},
			min: {
				default: -10
			},
			max: {
				default: 30
			},
			step: {
				default: 1
			},
			width: {
				default: 220
			},
			height: {
				default: 220
			},
			border: {
				default: 35
			},
			title: {
				default: null
			},
			unit: {
				default: '℃'
			},
			showUnit: {
				default: 'true'
			},
			showDecimal: {
				default: 'true'
			},
			colorSatrt: {
				default: '#FFC2B3'
			},
			colorEnd: {
				default: '#FF3B1D'
			},
			colorButton: {
				default: '#565656'
			},
			pageBg: {
				default: '#F4F5F6'
			},
			circleBg: {
				default: '#FFFFFF'
			},
			pointBg: {
				default: '#FFFFFF'
			}
		},
		data() {
			return {
				valData: 0,
				valPoint: {},
				centerPoint: {},
				insideRadius: {},
				startPoint: {},
				endPoint: {},
				isMove: false
			}
		},
		computed: {
			integer: function() {
				if (this.valData < this.min) {
					return this.min
				};
				if (this.valData > this.max) {
					return this.max
				};
				return parseInt(this.valData);
			},
			decimal: function() {
				if (this.valData < this.min) {
					return 0
				};
				if (this.valData > this.max) {
					return 0
				};
				return Math.abs(parseInt(this.valData * 10) - parseInt(this.valData) * 10);
			},
			centerRadius: function() {
				return Math.min(this.width / 2 - this.border, this.height / 2 - this.border) * 2 * 0.9;
			}
		},
		mounted: function() {
			this.valData = this.val;
			this.drawCircle(this.val, this.min, this.max, this.width, this.height, this.border, this.colorSatrt, this.colorEnd,
				this.colorButton, this.pointBg);
		},
		methods: {
			drawCircle: function(val, min, max, width, height, border, colorSatrt, colorEnd, colorButton, pointBg) {
				let radius = Math.min(width / 2 - border / 2, height / 2 - border / 2);
				let centerPoint = {
					x: width / 2,
					y: height / 2,
					r: radius + border / 2
				};
				this.centerPoint = centerPoint;
				this.insideRadius = {
					x: width / 2,
					y: height / 2,
					r: radius - border / 2
				}
				let ctx = uni.createCanvasContext(this.id, this);
				ctx.setLineWidth(border);
				ctx.setStrokeStyle(colorButton);
				ctx.setLineCap('butt');
				//画按钮背景
				ctx.beginPath();
				ctx.arc(centerPoint.x, centerPoint.y, radius, 0.25 * Math.PI, 0.75 * Math.PI, false);
				ctx.stroke();
				//画按钮
				ctx.setLineWidth(1);
				ctx.setStrokeStyle("#FFFFFF");
				ctx.beginPath();
				ctx.moveTo(centerPoint.x, height);
				ctx.lineTo(centerPoint.x, height - border);
				ctx.stroke();
				ctx.setLineWidth(3);
				ctx.beginPath();
				let upPoint = {
					x: centerPoint.x + (radius) * Math.cos(0.625 * Math.PI),
					y: centerPoint.x + (radius) * Math.sin(0.625 * Math.PI)
				};
				let downPoint = {
					x: centerPoint.x + (radius) * Math.cos(0.375 * Math.PI),
					y: centerPoint.x + (radius) * Math.sin(0.375 * Math.PI)
				};
				let xLength = border * 0.6 / 2;
				ctx.moveTo(upPoint.x - xLength, upPoint.y);
				ctx.lineTo(upPoint.x + xLength, upPoint.y);
				ctx.moveTo(upPoint.x, upPoint.y - xLength);
				ctx.lineTo(upPoint.x, upPoint.y + xLength);
				ctx.moveTo(downPoint.x - xLength, downPoint.y);
				ctx.lineTo(downPoint.x + xLength, downPoint.y);
				ctx.stroke();
				//变色背景条
				ctx.setLineWidth(border);
				let gradient = ctx.createLinearGradient(centerPoint.x - radius - border, centerPoint.y, centerPoint.x + radius +
					border, centerPoint.y);
				gradient.addColorStop('0', colorSatrt);
				gradient.addColorStop('1.0', colorEnd);
				ctx.setStrokeStyle(gradient);
				ctx.beginPath();
				ctx.arc(centerPoint.x, centerPoint.y, radius, 0.75 * Math.PI, 0.25 * Math.PI, false);
				ctx.stroke();
				//画控制点
				ctx.beginPath();
				ctx.setFillStyle(pointBg);
				//控制点阴影效果，不需要可以删掉
				ctx.setShadow(2, 2, 2, '#888888')
				if (val < min) val = min;
				if (val > max) val = max;
				let progress = (val - min) / (max - min);
				//控制点半径
				let valRadius = border * 0.45;
				//控制点弧度
				let valRadian = valRadius / (Math.PI * radius);
				progress = (1.5 - 2 * valRadian) * progress + 0.75 + valRadian;
				if (progress >= 2) {
					progress = progress % 2;
				}
				let valPoint = {
					x: centerPoint.x + (radius) * Math.cos(progress * Math.PI),
					y: centerPoint.x + (radius) * Math.sin(progress * Math.PI),
					r: valRadius,
					v: val,
					s: 0.75 + valRadian,
					e: 2.25 - valRadian,
					t: 1.5 - 2 * valRadian,
					n: progress,
				};
				this.valPoint = valPoint;
				ctx.arc(valPoint.x, valPoint.y, valPoint.r, 0, 2 * Math.PI, false);
				ctx.closePath();
				ctx.fill();
				ctx.draw();
			},
			touchStart: function(e) {
				let touches = e.mp.changedTouches[0] || e.changedTouches[0];
				if (isInCtrl(touches, this.valPoint)) {
					this.isMove = true;
					touches.val = this.valPoint;
					this.startPoint = touches;
				} else {
					this.isMove = false;
				}
			},
			touchMove: function(e) {
				let touches = e.mp.changedTouches[0] || e.changedTouches[0];
				if (this.isMove === true) {
					//这两句是判断是否在进度条内，加上体验不好，你可以试一下&& isInArea(touches,this.insideRadius) === false && isInArea(touches,this.centerPoint) === true
					let angle = Math.atan2(this.centerPoint.y - touches.y, touches.x - this.centerPoint.x);
					angle = -angle;
					let newRadian = angle / Math.PI;
					if (newRadian < 0) {
						newRadian = 2 + newRadian;
					}
					if (newRadian < this.startPoint.val.e - 1.7) {
						newRadian += 2;
					}
					let progress = (newRadian - this.startPoint.val.s) / this.startPoint.val.t;
					progress = (this.max - this.min) * progress;
					let nweVal = this.min + progress;
					if (nweVal > this.max) nweVal = this.max;
					if (nweVal < this.min) nweVal = this.min;
					nweVal = (parseInt(nweVal * 10) * 0.1).toFixed(1);
					this.valData = nweVal;
					this.drawCircle(nweVal, this.min, this.max, this.width, this.height, this.border, this.colorSatrt, this.colorEnd,
						this.colorButton, this.pointBg);
				}
			},
			touchEnd: function(e) {
				let touches = e.mp.changedTouches[0] || e.changedTouches[0];
				if (isInUp(touches, this.centerPoint) === true && this.isMove === false) {
					this.valData += this.step;
					if (this.valData > this.max) this.valData = this.max;
					this.drawCircle(this.valData, this.min, this.max, this.width, this.height, this.border, this.colorSatrt, this.colorEnd,
						this.colorButton, this.pointBg);
				}
				if (isInDown(touches, this.centerPoint) === true && this.isMove === false) {
					this.valData -= this.step;
					if (this.valData < this.min) this.valData = this.min;
					this.drawCircle(this.valData, this.min, this.max, this.width, this.height, this.border, this.colorSatrt, this.colorEnd,
						this.colorButton, this.pointBg);
				}
				this.$emit('change', this.valData)
			},
			changeData: function(val) {
				this.valData = val;
				this.drawCircle(val, this.min, this.max, this.width, this.height, this.border, this.colorSatrt, this.colorEnd,
					this.colorButton, this.pointBg);
			},
		}
	};
</script>

<style>
	.progress_box {
		position: relative;
		width: 100%;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		text-align: center;
	}

	.progress_txt {
		position: absolute;
		font-size: 28upx;
		border-radius: 50%;
		flex-direction: column !important;
		display: flex;
		align-items: center;
		justify-content: center;
		text-align: center;
		box-shadow: 0 0 6upx 4upx #DEDEDE;
	}

	.progress_info_top {
		font-size: 32upx;
		letter-spacing: 2upx;
		color: #000000;
	}

	.progress_info_center {
		display: flex;
		flex-direction: row !important;
		color: #000000;
	}

	.progress_info_center_a {
		font-size: 80upx;
		height: 100upx;
		line-height: 100upx;
		font-weight: bold;
		letter-spacing: 2upx;
	}

	.progress_info_center_c {
		position: relative;
		height: 100upx;
		display: flex;
		flex-direction: column !important;
		align-items: center;
		justify-content: center;
	}

	.progress_info_center_c1 {
		display: flex;
		height: 50upx;
		align-items: center;
	}

	.c1_text {
		height: 28upx;
		font-size: 28upx;
		letter-spacing: 2upx;
	}

	.progress_info_center_c2 {
		display: flex;
		height: 50upx;
		align-items: flex-start;
	}

	.c2_text {
		height: 50upx;
		font-size: 28upx;
		letter-spacing: 2upx;
	}
</style>
