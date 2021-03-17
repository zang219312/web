<template>
	<view>
		<!--别忘记了 components 下面的 Yumcc-DiDiProgress 组件-->
		<didi-progress ref='progress' :configureData='configureData' :currentPercent='currentPercent' :canvasStyle='canvasStyle'>
			<view class='content'>
				<view class="a1">本期2020.7-2020.9</view>
				<view class="a2">186</view>
				<view class="a3">超过99.99%的用户</view>
				<view class="a4">还差114分升级白金</view>
			</view>
		</didi-progress>
		<soure :url="url"></soure>
	</view>
</template>

<script>
	import didiProgress from '@/components/Yumcc-DiDiProgress/index.vue'

	export default {
		components: {
			didiProgress,
		},
		mounted() {
			this.$refs.progress.init()
		},
		data() {
			return {
				url: 'https://ext.dcloud.net.cn/plugin?id=2823',
				// 进度条配置参数
				configureData: [{
						percent: 5, // 百分比
						label: '白银', // 文字(等级用)
						num: 100 // 数值(显示用)
					},
					{
						percent: 23, // 百分比
						label: '黄金', // 文字(等级用)
						num: 150 // 数值(显示用)
					},
					{
						percent: 41, // 百分比
						label: '白金', // 文字(等级用)
						num: 300 // 数值(显示用)
					},
					{
						percent: 59, // 百分比
						label: '钻石', // 文字(等级用)
						num: 800 // 数值(显示用)
					},
					{
						percent: 77, // 百分比
						label: '黄金', // 文字(等级用)
						num: 1800 // 数值(显示用)
					},
					{
						percent: 95, // 百分比
						label: '黑金', // 文字(等级用)
						num: 3800 // 数值(显示用)
					}
				],
				// 当前百分比
				currentPercent: 28,
				// 绘制配置
				canvasStyle: {
					canvasBgColor: '#a9c6b6', // canvas背景颜色
					percentText: { // 百分比文字样式
						color: '#FFF',
						fontSize: 11
					},
					configure: {
						color: '#3a384d', // 配置背景颜色
						circleWidth: 5, // 配置背景圆圈半径
						lineWidth: 3, // 配置背景圆线条的宽度
					},
					current: {
						color: '#f19756', // 最终背景颜色
						circleWidth: 5, // 最终背景圆圈半径
						lineWidth: 3, // 最终背景圆线条的宽度
					}
				}
			};
		}
	}
</script>

<style lang="scss">
	page {
		background-color: $uni-bg-color;
	}

	.content {

		color: #FFFFFF;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;

		.a1 {
			margin-top: 10rpx;
			font-size: 24rpx;
		}

		.a2 {
			margin: 10rpx 0;
			font-size: 60rpx;
		}

		.a3 {
			font-size: 30rpx;
		}

		.a4 {
			margin-top: 10rpx;
			padding: 5rpx 20rpx;
			border-radius: 20rpx;
			background-color: #363545;
			font-size: 22rpx;
		}
	}
</style>
