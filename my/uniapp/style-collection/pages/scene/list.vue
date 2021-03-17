<template>
	<view>
		<view class="ad">
			<ad unit-id="adunit-69e88a9f327ecc00" ad-type="grid" grid-opacity="0.8" grid-count="5" ad-theme="white"></ad>
		</view>
		<view class="region">
			<block v-for="(item,index) in scene" :key="index">
				<view class="call" @click="click(item.url)">
					<image :src="item.img"></image>
					<view>{{item.name}}</view>
				</view>
			</block>
		</view>
	</view>
</template>

<script>
	import sceneMenu from '@/common/scene-menu.js';
	export default {
		data() {
			return {
				scene: [],
			}
		},
		onLoad(options) {
			uni.setNavigationBarTitle({
				title: sceneMenu[options.index].name
			})
			this.scene = sceneMenu[options.index].list
		},
		onShareAppMessage() {

		},
		methods: {
			click(url) {
				console.log("页面路径", url)
				uni.navigateTo({
					url: url
				})
			}
		}
	}
</script>

<style lang="scss">
	page {
		background-color: $uni-bg-color;
	}

	.banner {
		display: flex;
		justify-content: space-between;
		align-items: center;
		width: 100%;
		height: 100rpx;

		.img {
			display: flex;
			justify-content: center;
			align-items: center;
			width: 15%;

			image {
				width: 80rpx;
				height: 80rpx;
			}
		}

		.txt {
			display: flex;
			justify-content: center;
			align-items: center;
			width: 70%;
			color: #ffffff;
			font-size: 30rpx;
			font-family: KaiTi;
		}
	}

	.region {
		flex-wrap: wrap;
		display: flex;
		justify-content: flex-start;

		.call {
			padding: 20rpx 0;
			width: 230rpx;
			height: 150rpx;
			margin: 10rpx;
			display: flex;
			justify-content: center;
			align-items: center;
			flex-direction: column;
			background-color: #91b0b3;
			box-shadow: 1rpx 2rpx 16rpx 1rpx rgba(89, 89, 89, 0.1);
			border-radius: 10rpx;

			image {
				width: 70rpx;
				height: 70rpx;
			}

			view {
				padding: 20rpx 0;
				font-size: 24rpx;
			}
		}
	}

	.ad {
		padding: 10rpx;
	}
</style>
