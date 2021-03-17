<template>
	<view>
		<view class="test1"></view>
		<view class="test2"></view>
		<view class="test3"></view>
		<view  style="border: 5rpx solid #EEEEEE;"></view>
		<view class="test4"></view>
		<view class="test5"></view>
		<view class="test6"></view>
	</view>
</template>

<script>
	export default {
		data() {
			return {}
		},
	}
</script>

<style lang="scss">
	@keyframes test1 {
		from {
			box-shadow: 0rpx 0rpx 4rpx #f00;
		}

		to {
			box-shadow: 0rpx 0rpx 30rpx #f00;
		}
	}

	.test1 {
		margin: 100rpx auto;
		width: 100rpx;
		height: 100rpx;
		border-radius: 50%;
		animation: test1 1s ease-in-out infinite alternate;
	}

	@keyframes test2 {
		from {
			box-shadow: 0rpx 0rpx 5rpx #8688ff;
		}

		to {
			box-shadow: 0rpx 0rpx 30rpx #8688ff;
		}
	}

	.test2 {
		margin: 100rpx auto;
		width: 100rpx;
		height: 100rpx;
		border-radius: 50%;
		animation: test2 2s ease-in-out infinite alternate;
	}

	@keyframes test3 {
		from {
			box-shadow: 0rpx 0rpx 5rpx #1d96ff;
		}

		to {
			box-shadow: 0rpx 0rpx 30rpx #1d96ff;
		}
	}

	.test3 {
		margin: 100rpx auto;
		width: 100rpx;
		height: 100rpx;
		border-radius: 50%;
		animation: test3 3s ease-in-out infinite alternate;
	}

	@keyframes test4 {
		from {
			box-shadow: 0rpx 0rpx 5rpx #0dbe19;
		}

		to {
			box-shadow: 0rpx 0rpx 30rpx #0dbe19;
		}
	}

	.test4 {
		margin: 100rpx auto;
		width: 100rpx;
		height: 100rpx;
		border-radius: 50%;
		animation: test4 1s ease-out infinite;
	}

	@keyframes test5 {
		from {
			box-shadow: 0rpx 0rpx 5rpx #02e1e1;
		}

		to {
			box-shadow: 0rpx 0rpx 30rpx #02e1e1;
		}
	}

	.test5 {
		margin: 100rpx auto;
		width: 100rpx;
		height: 100rpx;
		border-radius: 50%;
		animation: test5 2s ease infinite;
	}

	@keyframes test6 {
		from {
			box-shadow: 0rpx 0rpx 5rpx #aa00ff;
		}

		to {
			box-shadow: 0rpx 0rpx 30rpx #aa00ff;
		}
	}

	.test6 {
		margin: 100rpx auto;
		width: 100rpx;
		height: 100rpx;
		border-radius: 50%;
		animation: test6 3s linear infinite;
	}
</style>
