<template>
	<view>
		<view class="effect-windmill">
			<view class="blade-container">
				<view class="blade-item"></view>
				<view class="blade-item"></view>
				<view class="blade-item"></view>
				<view class="blade-item"></view>
			</view>
			<view class="pole"></view>
		</view>
		<soure :url="url"></soure>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				url: 'https://blog.csdn.net/weixin_45761317/article/details/103543262?utm_medium=distribute.pc_relevant.none-task-blog-BlogCommendFromMachineLearnPai2-7.control&depth_1-utm_source=distribute.pc_relevant.none-task-blog-BlogCommendFromMachineLearnPai2-7.control'
			};
		}
	}
</script>

<style lang="scss">
	page {
		background-color: $uni-bg-color;
	}

	.effect-windmill {
		position: relative;
		margin: auto;
		margin-top: 80px;
		width: 300px;
		height: 450px;
	}

	.effect-windmill .blade-container {
		position: absolute;
		display: flex;
		flex-flow: column wrap;
		width: 300px;
		height: 300px;
		overflow: hidden;
		z-index: 20;
		animation: wind 15s linear 0s infinite;
		-webkit-animation: wind 15s linear 0s infinite;
	}

	.effect-windmill .blade-container .blade-item {
		width: 0;
		height: 0;
	}

	.effect-windmill .blade-container .blade-item:nth-child(1) {
		border-right: 150px solid transparent;
		border-bottom: 150px solid #e74c3c;
	}

	.effect-windmill .blade-container .blade-item:nth-child(2) {
		border-left: 150px solid transparent;
		border-bottom: 150px solid #e67e22;
	}

	.effect-windmill .blade-container .blade-item:nth-child(3) {
		border-right: 150px solid transparent;
		border-top: 150px solid #f1c40f;
	}

	.effect-windmill .blade-container .blade-item:nth-child(4) {
		border-left: 150px solid transparent;
		border-top: 150px solid #2ecc71;
	}

	.effect-windmill .pole {
		position: absolute;
		margin: auto;
		left: 0;
		right: 0;
		bottom: 0;
		width: 5px;
		height: 300px;
		background-color: #3498db;
		z-index: 10;
	}

	@keyframes wind {
		from {
			transform: rotate(0deg);
			-webkit-transform: rotate(0deg);
			-moz-transform: rotate(0deg);
			-ms-transform: rotate(0deg);
			-o-transform: rotate(0deg);
		}

		to {
			transform: rotate(-3600deg);
			-webkit-transform: rotate(-3600deg);
			-moz-transform: rotate(-3600deg);
			-ms-transform: rotate(-3600deg);
			-o-transform: rotate(-3600deg);
		}
	}
</style>
