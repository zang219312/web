<template>
	<view class="perspective">
		<view class="book-wrap">
			<view class="page book-content">底部</view>
			<view class="page book-content book-content1">第三页</view>
			<view class="page book-content book-content2">第二页</view>
			<view class="page book-content book-content3">第一页</view>
			<view class="page book-cover">封面</view>
		</view>
		<soure :url="url"></soure>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				url: 'https://github.com/heavenYJJ/css3/blob/master/translate-book.html'
			};
		},
	}
</script>

<style lang="scss">
	page {
		background-color: $uni-bg-color;
	}

	.perspective {
		margin-top: 300rpx;
		margin-left: 200rpx;
		transform-style: preserve-3d;
	}

	.book-wrap {
		width: 300rpx;
		height: 400rpx;
		position: relative;
		margin: 0 auto;
		transform: rotateX(30deg);
		transform-style: preserve-3d;
	}

	.page {
		width: 100%;
		height: 100%;
		position: absolute;
		left: 0;
		top: 0;
		font-size: 30px;
		display: flex;
		justify-content: center;
		align-items: center;
		transform-origin: left;
		border: 1px solid #1976D2;
	}

	.book-cover {
		background-color: #1976D2;
		color: #ffffff;
		animation: roll 6s ease 0s 2 alternate;
	}

	.book-content {
		background-color: #fff;
		color: #33363C;
	}

	.book-content1 {
		animation: roll 3s ease 3s 2 alternate;
	}

	.book-content2 {
		animation: roll 4s ease 2s 2 alternate;
	}

	.book-content3 {
		animation: roll 5s ease 1s 2 alternate;
	}

	@keyframes roll {
		from {
			transform: rotateY(0)
		}

		to {
			transform: rotateY(-180deg)
		}
	}
</style>
