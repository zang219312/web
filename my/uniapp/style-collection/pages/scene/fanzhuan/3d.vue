<template>
	<view>
		<view class="content">
			<view class="box">
				<image mode="aspectFit" src="https://6e69-niew6-1302638010.tcb.qcloud.la/%E4%BA%BA%E7%89%A9/1.png?sign=ecd0dc4b5f398cbf92e63c6e04066e5d&t=1608380857" />
				<image mode="aspectFit" src="https://6e69-niew6-1302638010.tcb.qcloud.la/%E4%BA%BA%E7%89%A9/2.png?sign=014b51e50b9169b7ac9b3ae9401f7c56&t=1608380876" />
				<image mode="aspectFit" src="https://6e69-niew6-1302638010.tcb.qcloud.la/%E4%BA%BA%E7%89%A9/3.png?sign=108d662351f0906fc218b8d7715ec69e&t=1608380885" />
				<image mode="aspectFit" src="https://6e69-niew6-1302638010.tcb.qcloud.la/%E4%BA%BA%E7%89%A9/4.png?sign=c30f5b29b7cd650aaefe09d3bda58f1a&t=1608380896" />
				<image mode="aspectFit" src="https://6e69-niew6-1302638010.tcb.qcloud.la/%E4%BA%BA%E7%89%A9/5.jpg?sign=9a11e835890e87e3e325506300ba5537&t=1608380906" />
				<image mode="aspectFit" src="https://6e69-niew6-1302638010.tcb.qcloud.la/%E4%BA%BA%E7%89%A9/6.png?sign=432efa2a073ea9e76930d009db86cc11&t=1608380919" />
				<image mode="aspectFit" src="https://6e69-niew6-1302638010.tcb.qcloud.la/%E4%BA%BA%E7%89%A9/7.png?sign=52641d349e3a241ee40741f4a09ae462&t=1608380953" />
				<image mode="aspectFit" src="https://6e69-niew6-1302638010.tcb.qcloud.la/%E4%BA%BA%E7%89%A9/8.png?sign=9fc7552b95907277cec4b355ea1ba9bf&t=1608380962" />
				<image mode="aspectFit" src="https://6e69-niew6-1302638010.tcb.qcloud.la/%E4%BA%BA%E7%89%A9/9.png?sign=9a4384d9ffc3681f04533966391cb009&t=1608380971" />
			</view>
		</view>
		<view class="comm-center" style="padding-top: 300rpx;">点击图片可暂停，点击其他区域可继续动画</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				url: 'https://www.cnblogs.com/zyrblog/p/11142624.html' //作者出处
			};
		},
	}
</script>

<style lang="scss">
	page {
		background-color: $uni-bg-color;
	}

	.content {
		width: 200rpx;
		height: 150rpx;
		position: relative;
		margin: 200rpx auto 0;
	}

	.box {
		width: 200rpx;
		height: 150rpx;
		transform-style: preserve-3d;
		transform: rotateX(-30deg);
		animation: photo 15s linear infinite;
	}

	.box:hover {
		animation: photo 15s linear infinite paused;
	}

	.box image {
		width: 200rpx;
		height: 150rpx;
		position: absolute;
		left: 0;
		top: 0;
		transform-style: preserve-3d;
		transition: all 1s;
	}

	.box image:nth-child(1) {
		transform: translateZ(280rpx);
	}

	.box image:nth-child(2) {
		transform: rotateY(40deg) translateZ(280rpx);
	}

	.box image:nth-child(3) {
		transform: rotateY(80deg) translateZ(280rpx);
	}

	.box image:nth-child(4) {
		transform: rotateY(120deg) translateZ(280rpx);
	}

	.box image:nth-child(5) {
		transform: rotateY(160deg) translateZ(280rpx);
	}

	.box image:nth-child(6) {
		transform: rotateY(200deg) translateZ(280rpx);
	}

	.box image:nth-child(7) {
		transform: rotateY(240deg) translateZ(280rpx);
	}

	.box image:nth-child(8) {
		transform: rotateY(280deg) translateZ(280rpx);
	}

	.box image:nth-child(9) {
		transform: rotateY(320deg) translateZ(280rpx);
	}

	.box image:nth-child(1):hover {
		transform: translateZ(280rpx) scale(1.2);
	}

	.box image:nth-child(2):hover {
		transform: rotateY(40deg) translateZ(280rpx) scale(1.2);
	}

	.box image:nth-child(3):hover {
		transform: rotateY(80deg) translateZ(280rpx) scale(1.2);
	}

	.box image:nth-child(4):hover {
		transform: rotateY(120deg) translateZ(280rpx) scale(1.2);
	}

	.box image:nth-child(5):hover {
		transform: rotateY(160deg) translateZ(280rpx) scale(1.2);
	}

	.box image:nth-child(6):hover {
		transform: rotateY(200deg) translateZ(280rpx) scale(1.2);
	}

	.box image:nth-child(7):hover {
		transform: rotateY(240deg) translateZ(280rpx) scale(1.2);
	}

	.box image:nth-child(8):hover {
		transform: rotateY(280deg) translateZ(280rpx) scale(1.2);
	}

	.box image:nth-child(9):hover {
		transform: rotateY(320deg) translateZ(280rpx) scale(1.2);
	}

	@keyframes photo {
		0% {
			transform: rotateX(-30deg) rotateY(0deg);
		}

		100% {
			transform: rotateX(-30deg) rotateY(360deg);
		}
	}
</style>
