<template>
	<view class="loading">
		<view class="circle">
			<view class="wave"></view>
		</view>
		<soure :url="url"></soure>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				url: 'https://zhuanlan.zhihu.com/p/266588341'
			};
		}
	}
</script>

<style lang="scss">
	.loading {
		width: 100vw;
		height: 100vh;
		background-color: $uni-bg-color;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	.circle {
		width: 150px;
		height: 150px;
		background-color: #7591AD;

		box-shadow: 0 0 0 5px #F97F51;
		border-radius: 50%;
	}

	.wave {
		position: relative;
		width: 100%;
		height: 100%;
		background-color: #F97F51;
		border-radius: 50%;
		box-shadow: inset 0 0 50px #EC3E27;
		overflow: hidden;
		z-index: 0;
	}

	.wave::before,
	.wave::after {
		position: absolute;
		content: "";
		width: 200%;
		height: 200%;
		top: 0;
		left: 50%;
		transform: translate(-50%, -50%);
	}

	.wave::before {
		border-radius: 30%;
		background-color: #f0932b;
		animation: animate 5s linear infinite;
	}

	.wave::after {
		border-radius: 40%;
		background-color: #ffbe76;
		animation: animate 5s linear infinite;
	}

	@keyframes animate {
		0% {
			top: 0;
			transform: translate(-50%, -50%) rotate(0deg);
		}

		100% {
			top: -100px;
			transform: translate(-50%, -50%) rotate(360deg);
		}
	}
</style>
