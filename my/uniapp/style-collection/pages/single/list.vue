
<template>
	<view class="page-box">
		<view class="ad">
			<ad unit-id="adunit-d1016ea53e0855b2" ad-intervals="30"></ad>
		</view>
		<view class="row" v-for="(item,index) in scene" :key="index" @click="sceneClick(index)">
			<image class="cover" :src="item.img"></image>
			<view class="name">{{item.name}}</view>
		</view>
	</view>
</template>

<script>
	let interstitialAd = null
	import sceneMenu from '@/common/single-menu.js';
	export default {
		data() {
			return {
				scene: sceneMenu
			}
		},
		onLoad() {
		},
		onShareAppMessage() {
			return {
				title: '各种各样的炫酷样式、动画效果',
				imageUrl: 'https://6e69-niew6-1302638010.tcb.qcloud.la/%E8%83%8C%E6%99%AF/%E5%88%86%E4%BA%AB1.png?sign=c30e9d037a477cc31fe710d5bd618908&t=1607140513',
				path: '/pages/scene/index'
			}

		},
		methods: {
			sceneClick(index) {
				if (sceneMenu[index].isMenu) {
					uni.navigateTo({
						url: '/pages/scene/list?index=' + index
					})
				} else {
					uni.navigateTo({
						url: sceneMenu[index].url
					})
				}
			}
		}
	}
</script>

<style lang="scss">
	page {
		background-color: $uni-bg-color;
	}

	.page-box {
		display: flex;
		justify-content: space-between;
		align-items: center;
		align-content: flex-start;
		flex-wrap: wrap;
		padding: 20rpx;

		.row {
			position: relative;
			display: flex;
			justify-content: center;
			flex-direction: column;
			align-items: center;
			width: 300rpx;
			height: 180rpx;
			padding: 20rpx;
			margin-bottom: 20rpx;
			background-color: #91b0b3;
			border-radius: 15rpx;

			.cover {
				width: 80rpx;
				height: 80rpx;
				border-radius: 100%;
				background-color: #FFFFFF;
			}

			.name {
				padding-top: 30rpx;
				font-size: 28rpx;
				font-weight: bold;
				color: #FFFFFF;
			}
		}
	}

	.ad {
		width: 100%;
		padding-bottom: 20rpx;
	}
</style>
