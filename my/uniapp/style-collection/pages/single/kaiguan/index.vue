<template>
	<view>
		<!--别忘记了 components下面的 v-switch组件-->
		<soure :url="url"></soure>
		<view class="switch-row">
			<view class="left">效果1</view>
			<v-switch v-model="on" size="0.9" :activeValue="1" :inactive-value="0" @change="toggleMode"></v-switch>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				url: 'https://ext.dcloud.net.cn/plugin?id=3469',
				on: true
			};
		},
		onLoad() {

		},
		methods: {
			toggleMode() {
				console.log("事件")
			}
		}
	};
</script>

<style lang="scss">
	.switch-row {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0 30rpx;
		height: 100rpx;
		border-bottom: 10rpx solid #EEEEEE;

		.left {
			display: flex;
			justify-content: center;
			align-items: center;
			font-size: 30rpx;
			font-weight: bold;
			width: 150rpx;
		}
	}
</style>
