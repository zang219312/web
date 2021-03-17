<template>
	<view class="comm-content">
		<view @click="drop($event)">
			<darke-cartsBall ref="cartsBall" :ballColor="'#fff'" :zIndex="6" :endPos="{
	                x: 150, y: 650
	            }"
			 :ballImage="'url(/static/other/4.png)'"></darke-cartsBall>
		</view>
		<view class="btn">
			<soure :url="url" />
			<view class="cell" @click="drop($event)">
				<text>点击按钮展示效果</text>
			</view>
		</view>
	</view>
</template>

<script>
	// ******************记住别忘记了引用组件********************
	import darkeCartsBall from 'components/darke-cartsBall/darke-cartsBall.vue'
	export default {
		components: {
			darkeCartsBall
		},
		data() {
			return {
				url: 'https://ext.dcloud.net.cn/plugin?id=2281'
			}
		},
		methods: {
			drop() {
				this.$refs.cartsBall.drop({
					x: 5,
					y: 200
				})
			},

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

	.btn {
		display: flex;
		justify-content: space-between;
		align-items: center;
		position: fixed;
		padding: 0 30rpx;
		bottom: 0;
		height: 100rpx;
		z-index: 999;

		.cell {
			margin-left: 20rpx;
			z-index: 999;
			border-radius: 50rpx;
			font-size: 28rpx;
			width: 400rpx;
			height: 60rpx;
			display: flex;
			justify-content: center;
			align-items: center;
			background-color: #ffaa00;
		}
	}
</style>
