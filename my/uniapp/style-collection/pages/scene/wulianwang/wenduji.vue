<template>
	<view>
		<view class="temp">
			<view id="therm-numbers">
				<view class="therm-number pos0">75℃</view>
				<view class="therm-number pos1">50℃</view>
				<view class="therm-number pos2">25℃</view>
				<view class="therm-number pos3">0℃</view>
				<view class="therm-number pos4">-25℃</view>
			</view>
			<view id="therm-graphics">
				<image id="therm-top" src="https://6e69-niew6-1302638010.tcb.qcloud.la/wulianwang/wenduji/glassTop2x.png?sign=c7f43bc2b9df9063616b3401afbf415c&t=1597888786"></image>
				<image id="therm-body-bg" src="https://6e69-niew6-1302638010.tcb.qcloud.la/wulianwang/wenduji/glassBody2x.png?sign=a7e88c1aba4721d431e60d4cf71bf0be&t=1597888797"></image>
				<image id="therm-body-mercury" src="https://6e69-niew6-1302638010.tcb.qcloud.la/wulianwang/wenduji/coldVertical2x.png?sign=7f1dc2ff71d1c864e5a7aac7b78093e9&t=1597888821"></image>
				<image id="therm-bottom" src="https://6e69-niew6-1302638010.tcb.qcloud.la/wulianwang/wenduji/coldBottom2x.png?sign=47a9472de859d6fb4148b33f658aca77&t=1597888810"></image>
				<view id="therm-body-fore">
					<image src="https://6e69-niew6-1302638010.tcb.qcloud.la/wulianwang/wenduji/tickShine.png?sign=859c6646e019f23430da6425601a26c2&t=1597888832"></image>
					<image src="https://6e69-niew6-1302638010.tcb.qcloud.la/wulianwang/wenduji/tickShine.png?sign=859c6646e019f23430da6425601a26c2&t=1597888832"></image>
					<image src="https://6e69-niew6-1302638010.tcb.qcloud.la/wulianwang/wenduji/tickShine.png?sign=859c6646e019f23430da6425601a26c2&t=1597888832"></image>
					<image src="https://6e69-niew6-1302638010.tcb.qcloud.la/wulianwang/wenduji/tickShine.png?sign=859c6646e019f23430da6425601a26c2&t=1597888832"></image>
				</view>
			</view>
			<view id="therm-tooltip">
				<image class="tip-left" src="https://6e69-niew6-1302638010.tcb.qcloud.la/wulianwang/wenduji/tooltipPoint2x.png?sign=6c3bef24dd9aabe746fdbcaef16140fd&t=1597888860"></image>
				<image class="tip-right" src="https://6e69-niew6-1302638010.tcb.qcloud.la/wulianwang/wenduji/tooltipButt2x.png?sign=2273b1dd3e0b6421444bf8fd86cd8089&t=1597888852"></image>
				<view class="tip-middle">
					<p>30℃</p>
				</view>
			</view>
		</view>
		<view class="comm-content">
			<soure :url="url" />
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				url: 'https://www.baidu.com/link?url=kYoQpXQzuh-z40peVlTXDe3jDmaMEiNv1B1nQmmlw0sv6foZumBMnAiw3ABMcPG6Z-VwgqZT-KjmGcH2TY-rT41ZLAe6pin6QXL3BxKXQeW&wd=&eqid=dde77f100004088a000000065f3dce55'
			}
		},
		methods: {
			copy() {
				uni.setClipboardData({
					data: this.source
				});
			}
		}
	}
</script>

<style lang="scss">
	page {
		background-color: $uni-bg-color;
	}

	.temp {
		width: 100%;
		height: 500rpx;
		padding-left: 250rpx;
		position: relative;
	}

	/* 左侧温度刻度 */
	#therm-numbers {
		width: 100rpx;
		float: left;
		opacity: 0.4;
	}

	.therm-number {
		color: #FFFFFF;
		width: 100rpx;
		position: absolute;
		text-align: right;
		font-size: 26rpx;
	}

	.pos0 {
		position: absolute;
		top: 30rpx;
	}

	.pos1 {
		position: absolute;
		top: 110rpx;
	}

	.pos2 {
		position: absolute;
		top: 190rpx;
	}

	.pos3 {
		position: absolute;
		top: 270rpx;
	}

	.pos4 {
		position: absolute;
		top: 350rpx;
	}

	/* 温度计 */
	#therm-graphics {
		float: left;
		left: 100rpx;
		width: 92rpx;
		height: 448rpx;
		margin-top: 20rpx;
		position: relative;
		display: flex;
		flex-direction: column;
	}

	/* 图片顶部 */
	#therm-top {
		position: absolute;
		top: 0;
		left: 15rpx;
		width: 64rpx;
		height: 26rpx;
	}

	/* 图片中间 */
	#therm-body-bg {
		position: absolute;
		top: 26rpx;
		left: 15rpx;
		width: 64rpx;
		height: 320rpx;
	}

	/* 水银 */
	#therm-body-mercury {
		position: absolute;
		left: 28rpx;
		width: 36rpx;
		top: 346rpx;
		height: 0rpx;
	}

	/* 温度计底部 */
	#therm-bottom {
		position: absolute;
		top: 345rpx;
		left: 0;
		width: 100%;
		height: 102rpx;
	}

	/* 温度计刻度 */
	#therm-body-fore {
		position: relative;
		display: flex;
		flex-direction: column;
		/* 清除图片缝隙 */
		top: 30rpx;
		left: 22rpx;
		height: 320rpx;
		width: 40rpx;
	}

	#therm-body-fore image {
		width: 100%;
	}

	/*右侧温度显示 */

	#therm-tooltip {
		position: relative;
		float: left;
		left: 76rpx;
		width: 200rpx;
	}

	#therm-tooltip .tip-left {
		float: left;
		width: 38rpx;
		height: 64rpx;
	}

	#therm-tooltip .tip-middle {
		float: left;
		height: 64rpx;
		font-size: 30rpx;
		color: #FFFFFF;
	}

	#therm-tooltip .tip-middle p {
		position: relative;
		margin: 0;
		padding-right: 8rpx;
		padding-left: 6rpx;
		top: 12rpx;
		height: 64rpx;
		opacity: 0.7;
		background-size: 128rpx 128rpx;
	}

	#therm-tooltip .tip-right {
		float: left;
		width: 18rpx;
		height: 64rpx;
	}

	/* 清除浮动流 */

	.clear {
		clear: both;
	}

	/* 温度动态填充显示 */

	#therm-body-mercury {
		height: 0;
		animation: myHeight 2s;
		animation-fill-mode: forwards;
	}

	/* 温度计刻度动态展示 */

	#therm-tooltip {
		top: 350rpx;
		animation: myTop 2s;
		animation-fill-mode: forwards;
	}


	/*温度计刻度的动画*/
	@keyframes myHeight {
		from {
			height: 0px;
			top: 346rpx;
			/* 离顶：26+320=346rpx; */
		}

		to {
			height: 171.8rpx;
			/*一大格25度80rpx，一度3.2rpx，30度96rpx，-24到0度76.8rpx，显示30度即高为171.8rpx*/
			top: 174.2rpx;
			/* 346-171.8=174.2rpx*/
		}
	}

	/*温度计刻度指针的动画*/
	@keyframes myTop {
		from {
			/*刻度指针起点动画的位置 越低距离越近 动画距离也越短 346是最大值底部到顶部的距离 */
			top: 346rpx;
		}

		to {
			/*刻度指针的高低 越低越上 1度3.2rpx 自行计算需要的高度*/
			top: 164rpx;
		}
	}
</style>
