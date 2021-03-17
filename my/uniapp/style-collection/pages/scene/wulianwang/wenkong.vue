<template>
	<view class="comm-content">
		<view class="qiun-columns">
			<temperature id="temperature" :val="opts.val" :min="opts.min" :max="opts.max" :step="opts.step" :width="opts.width"
			 :height="opts.height" :border="opts.border" :title="opts.title" :showUnit="opts.showUnit" :unit="opts.unit"
			 :showDecimal="opts.showDecimal" :colorSatrt="opts.colorSatrt" :colorEnd="opts.colorEnd" :colorButton="opts.colorButton"
			 :pageBg="opts.pageBg" :circleBg="opts.circleBg" :pointBg="opts.pointBg" :setUpUrl="opts.setUpUrl" @change="change"
			 ref="temperature" />
		</view>
		<!-- 下面是简单调用的例子，除了id和val其他的都可以不给 -->
		<view class="qiun-columns">
			<temperature id="temperature2" :val="simple" title="PM2.5" colorSatrt="#e1f2fe" :showUnit="showUnit" colorEnd="#b4e7fe" />
		</view>
		<soure :url="url" />
	</view>
</template>

<script>
	// ******************记住别忘记了引用组件********************
	import temperature from '@/components/temperature/index.vue';
	var _self;
	export default {
		data() {
			return {
				url: 'https://ext.dcloud.net.cn/plugin?id=570',
				simple: 18,
				showUnit: false,
				opts: {
					val: 15.8,
					min: 10,
					max: 40,
					step: 1,
					width: 220,
					height: 220,
					border: 35,
					title: '设备温度', //传null为不显示最上面标题
					showUnit: true, //是否显示单位
					unit: '℃',
					showDecimal: true, //是否小数
					colorSatrt: '#eb938d',
					colorEnd: '#ff0000',
					colorButton: '#565656', //底部按钮颜色
					pageBg: '#F4F5F6', //组件页面背景色，如果父组件像本示例设置了padding,你懂的哈
					circleBg: '#FFFFFF', //中间圆心文字块的背景色
					pointBg: '#FFFFFF' //控制点背景色
				}
			};
		},
		components: {
			temperature
		},
		onLoad() {
		},
		methods: {
			change(value) {
				console.log("温度值: ", value)
			},
			copy() {
				uni.setClipboardData({
					data: this.source
				});
			}
		}
	};
</script>

<style lang="scss">
	page {
		width: 750rpx;
		overflow-x: hidden;
		background-color: $uni-bg-color;
	}

	.qiun-columns {
		display: flex;
		flex-direction: column !important;
		padding: 40rpx;
	}

	.qiun-padding {
		padding: 2%;
		width: 96%;
	}

	.qiun-wrap {
		display: flex;
		flex-wrap: wrap;
	}

	.qiun-rows {
		display: flex;
		flex-direction: row !important;
	}

	.qiun-columns {
		display: flex;
		flex-direction: column !important;
	}

	.qiun-common-mt {
		margin-top: 10rpx;
	}

	.qiun-common-border-bottom {
		border-bottom: 1px solid #E9E9E9;
	}

	.qiun-bg-white {}

	.qiun-title-bar {
		width: 96%;
		padding: 10rpx 2%;
		flex-wrap: nowrap;
	}

	.qiun-title-dot-light {
		border-left: 10rpx solid #0ea391;
		padding-left: 10rpx;
		font-size: 30rpx;
	}

	.qiun-textarea {
		height: 400rpx;
		font-size: 34rpx;
		box-sizing: border-box;
		line-height: 50rpx;
		width: 100%;
	}

	.qiun-text-tips {
		font-size: 28rpx;
		color: #dc2626;
		line-height: 40rpx;
		padding: 6rpx;
	}


	/* 通用样式 */
	.qiun-charts {
		width: 750rpx;
		height: 500rpx;
	}

	.charts {
		width: 750rpx;
		height: 500rpx;
	}

	/* 横屏样式 */
	.qiun-charts-rotate {
		width: 700rpx;
		height: 1100rpx;
		padding: 25rpx;
	}

	.charts-rotate {
		width: 700rpx;
		height: 1100rpx;
	}

	/* 圆弧进度样式 */
	.qiun-charts3 {
		width: 750rpx;
		height: 250rpx;
		position: relative;
	}

	.charts3 {
		position: absolute;
		width: 250rpx;
		height: 250rpx;
	}
</style>
