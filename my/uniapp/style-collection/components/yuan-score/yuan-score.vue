<template>
	<view class="canvas_box">
		<canvas canvas-id="circle" style="width:700rpx;height:480rpx;" @click='show'></canvas>
		<view class="divInput">
			<input placeholder-style="color:#fff;" placeholder="请输入分数" v-model.number="score" :max="max" :min="min" @blur="validate">
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			max: { // 最大值
				type: Number,
				default: 6
			},
			min: { // 最小值
				type: Number,
				default: 0
			},
			defaultScore: { // 默认值
				type: Number,
				default: 3
			},
			section: { // 分值间隔
				type: Number,
				default: 1
			},
		},
		data() {
			return {
				proWidth: 0,
				ctx: '',
				gradient: "",
				score: this.defaultScore
			}
		},
		computed: {
			several() { //  份数
				return (this.max - this.min) / this.section
			},
			interval() { // 间隔
				return (2 * 115 * 0.75 * Math.PI - 2 * (this.several + 1)) / this.several
			},
			NumList() {
				let Ary = []
				for (let i = this.min; i <= this.max; i += this.section) {
					Ary.push(i)
				}
				return Ary
			},
			isparseInt() { //判断分值间隔是否为整数
				return parseInt(this.section) == this.section
			}
		},
		onReady() {
			this.ctx = uni.createCanvasContext('circle', this)
			this.gradient = this.ctx.createLinearGradient(60, 0, 200, 0);
			this.gradient.addColorStop(0, '#cc0037');
			this.gradient.addColorStop(0.5, '#3c02e7');
			this.gradient.addColorStop(1, '#67c23a');
			const percent = (this.defaultScore-this.min) / (this.max - this.min) * 1.5 * Math.PI + 0.75 * Math.PI
			this.drawArc(this.ctx, percent, this.defaultScore)
		},
		mounted() {},
		methods: {
			toJSON() {},
			render(ctx, PI) {
				//绘制背景底盘
				ctx.beginPath();
				ctx.arc(175, 140, 100, 0.75 * Math.PI, 0.25 * Math.PI)
				ctx.strokeStyle = '#f8f8f8';
				ctx.lineWidth = 15;
				ctx.stroke();
				ctx.restore()
				//分数进度条
				ctx.beginPath();
				ctx.arc(175, 140, 100, 0.75 * Math.PI, PI)
				ctx.strokeStyle = this.gradient;
				ctx.lineWidth = 15;
				ctx.stroke();
				ctx.restore()
			},
			drawOutLine(ctx) { // 外出边框线
				ctx.beginPath();
				ctx.lineWidth = 2;
				ctx.strokeStyle = this.gradient;
				ctx.arc(175, 140, 110, 0.75 * Math.PI, 0.25 * Math.PI);
				// ctx.strokeStyle = '#4e6a68';
				ctx.stroke();
			},
			drawNum(ctx) { //外部分值数字
				const a = 270 / this.several
				for (let i = 45; i <= 325; i += a) {
					const x1 = 175 - Math.sin(i * Math.PI / 180) * 124
					const x2 = 175 - Math.sin(i * Math.PI / 180) * 110
					const x3 = 175 - Math.sin(i * Math.PI / 180) * 126
					const y1 = 140 + Math.cos(i * Math.PI / 180) * 124
					const y2 = 140 + Math.cos(i * Math.PI / 180) * 110
					const y3 = 140 + Math.cos(i * Math.PI / 180) * 126
					ctx.moveTo(x1, y1)
					ctx.lineTo(x2, y2)
					ctx.stroke()
					ctx.fillStyle = '#000000'
					ctx.setFontSize(14)
					ctx.setTextAlign('center')
					ctx.fillText((i - 45) / a * this.section + this.min, x3, y3)
					ctx.restore()
				}
				ctx.restore()
			},
			drawInCircle(ctx) {
				ctx.beginPath();
				ctx.arc(175, 140, 100, 0, 2 * Math.PI)
				ctx.setFillStyle('#fafbfb')
				ctx.fill()
				ctx.restore()
				ctx.beginPath();
				ctx.arc(175, 140, 85, 0, 2 * Math.PI)
				ctx.setFillStyle('#fdf1e5')
				ctx.fill()
				ctx.restore()
				ctx.beginPath();
				ctx.arc(175, 140, 70, 0, 2 * Math.PI)
				ctx.setFillStyle('#f9d5b3')
				ctx.fill()
				ctx.restore()
				ctx.beginPath();
				ctx.arc(175, 140, 55, 0, 2 * Math.PI)
				ctx.setFillStyle('#fe9b40')
				ctx.fill()
				ctx.restore()
				ctx.beginPath();
				ctx.arc(175, 140, 40, 0, 2 * Math.PI)
				ctx.setFillStyle('#fe7f0e')
				ctx.fill()
			},
			drawOutNum(ctx, process) {
				// console.log(process)
				ctx.fillStyle = '#FFFFFF';
				ctx.font = '40px Microsoft yahei';
				ctx.textAlign = 'center';
				ctx.textBaseLine = 'top';
				ctx.fillText(process, 175, 155);
				ctx.restore();
			},
			drawArc(ctx, PI, process) {
				this.render(ctx, PI)
				this.drawOutLine(ctx)
				this.drawNum(ctx)
				this.drawInCircle(ctx)
				this.drawOutNum(ctx, process)
				ctx.draw()
			},
			drawLine(ctx) {
				// ctx.beginPath();
				ctx.arc(175, 140, 115, 0.75 * Math.PI, 0.25 * Math.PI);
				ctx.strokeStyle = '#4e6a68';
				ctx.lineWidth = 10;
				ctx.setLineDash([2, this.interval]);
				ctx.stroke();
				ctx.restore()
			},
			changePro(checkNum) {
				const int = Math.round(checkNum)
				if (Math.abs(int - checkNum) <= 0.2 && this.NumList.indexOf(int) !== -1) {
					const percent = (int-this.min) / (this.max - this.min) * 1.5 * Math.PI + 0.75 * Math.PI
					this.ctx.clearRect(0, 0, 350, 240)
					// this.ctx.fillRect(0, 0, 350, 240);
					this.ctx.draw()
					this.drawArc(this.ctx, percent, int)
					this.score = int
					this.$emit('change', int)
				}
			},
			changepro(checkNum) {
				const int = Math.round(checkNum)
				let result = null
				if (int >= checkNum) { //判断在上分段还是下分段
					if (int - checkNum <= 0.1) {
						result = int
					} else if (checkNum - (int - this.section) <= 0.1) {
						result = int - this.section
					}
				} else if (int < checkNum) {
					if ((int + this.section) - checkNum <= 0.1) {
						result = int + this.section
					} else if (checkNum - (int) <= 0.1) {
						result = int
					}
				}
				if (result) {
					const percent = (result - this.min) / (this.max - this.min) * 1.5 * Math.PI + 0.75 * Math.PI
					// console.log(percent)
					this.ctx.clearRect(0, 0, 350, 240)
					// this.ctx.fillRect(0, 0, 350, 240);
					this.ctx.draw()
					this.drawArc(this.ctx, percent, result)
					this.score = result
					this.$emit('change', result)
				}
			},
			show(e) {
				let offsetLeft = e.target.offsetLeft
				let offsetTop = e.target.offsetTop
				let x = e.target.x - offsetLeft
				let y = e.target.y - offsetTop
				let x1 = x - 175
				let x2 = 175 - x
				let y1 = 140 - y
				let y2 = y - 140
				let a = 270 / this.several
				if (x2 > 0 && y1 > 0 && x2 * x2 + y1 * y1 >= 115 * 115) { // 判断点击方位
					const checkNum = (this.angle(x2, y1) + 45) / a * this.section+this.min // 将点击的点转为数值
					if (this.isparseInt) {
						this.changePro(checkNum)
					} else {
						this.changepro(checkNum)
					}
				} else if (x2 > 0 && y2 > 0 && x2 * x2 + y2 * y2 >= 115 * 115) {
					const checkNum = (45 - this.angle(x2, y2)) / a * this.section+this.min // 将点击的点转为数值
					if (this.isparseInt) {
						this.changePro(checkNum)
					} else {
						this.changepro(checkNum)
					}
				} else if (x1 > 0 && y1 > 0 && x1 * x1 + y1 * y1 >= 115 * 115) {
					const checkNum = (225 - this.angle(x1, y1)) / a * this.section+this.min // 将点击的点转为数值
					if (this.isparseInt) {
						this.changePro(checkNum)
					} else {
						this.changepro(checkNum)
					}
				} else if (x1 > 0 && y2 > 0 && x1 * x1 + y2 * y2 >= 115 * 115) {
					const checkNum = (this.angle(x1, y2) + 225) / a * this.section+this.min // 将点击的点转为数值
					if (this.isparseInt) {
						this.changePro(checkNum)
					} else {
						this.changepro(checkNum)
					}
				}
			},
			angle(x, y) { // 计算角度
				const radian = Math.atan(y / x) //弧度
				const angle = Math.floor(180 / (Math.PI / radian)) //弧度转角度
				return angle
			},
			validate() { // 输入框验证
				const isInt = (this.max - this.score) / this.section
				if (this.score >= this.max) {
					this.score = this.max
				} else if (this.score <= this.min) {
					this.score = this.min
				} else if (!(/(^[1-9]\d*$)/.test(isInt))) { // 判断是否是正确的分值间隔
					this.score = this.max - Math.floor(isInt) * this.section
				}
				if (this.isparseInt) {
					this.changePro(this.score)
				} else {
					this.changepro(this.score)
				}
			},
		},
	}
</script>


<style scoped>
	.canvas_box {
		width: 100%;
		height: 500rpx;
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		align-content: center;
		/* position: relative; */
	}

	.divInput {
		/* 		position: absolute;
		left: 50%;
		bottom: 0;
		transform: translate(-50%, 0); */
		/* float: left; */
		width: 90px;
		height: 30px;
		background-color: #fc7f0e;
		display: flex;
		justify-content: center;
		align-items: center;
		border-radius: 10px;
	}

	input {
		width: 100%;
		border: none;
		background-color: #fc7f0e;
		outline: none;
		color: #ffffff;
		text-align: center;
		border-radius: 10px;
	}
</style>
