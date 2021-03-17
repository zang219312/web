<template>
	<view>
		<view class="content-box">
			<image class="img" src="https://6e69-niew6-1302638010.tcb.qcloud.la/wulianwang/%E5%8F%B0%E6%89%87.png?sign=01faafa2b51bae4bdbfa05a39dd1d985&t=1605967885" />
			<image class="img2 rotation" :class="level" src="https://6e69-niew6-1302638010.tcb.qcloud.la/wulianwang/%E6%89%87%E5%8F%B64.png?sign=56f511d4a265a0f9ddf45ca872d1d1f0&t=1609518930" />
		</view>
		<view class="comm-content" style="padding-top: 300rpx;">
			<button class="btn" @click="one" size="mini">一档</button>
			<button class="btn" @click="two" size="mini">二档</button>
			<button class="btn" @click="three" size="mini">三档</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				playing: true, //可自行控制是否需要转动
				level: 'one'
			};
		},
		methods: {
			one() {
				this.level = "one"
			},

			two() {
				this.level = "two"
			},

			three() {
				this.level = "three"
			}
		}
	}
</script>

<style lang="scss">
	page {
		background-color: $uni-bg-color;
	}

	.content-box {
		position: relative;
		top: 200rpx;
		display: flex;
		justify-content: center;

		.img {
			width: 350rpx;
			height: 350rpx;
		}

		.img2 {
			position: absolute;
			top: 70rpx;
			left: 285rpx;
			width: 170rpx;
			height: 170rpx;
		}
	}

	.btn {
		width: 300rpx;
		line-height: 70rpx;
		font-size: 30rpx;
		margin-top: 10rpx;
	}

	.one {
		-webkit-transform: rotate(360deg);
		animation: rotation 2s linear infinite;
	}

	.two {
		-webkit-transform: rotate(360deg);
		animation: rotation 1s linear infinite;
	}

	.three {
		-webkit-transform: rotate(360deg);
		animation: rotation 0.5s linear infinite;
	}


	@-webkit-keyframes rotation {
		from {
			-webkit-transform: rotate(0deg);
		}

		to {
			-webkit-transform: rotate(360deg);
		}
	}

	.suspended {
		animation-play-state: paused;
	}
</style>
