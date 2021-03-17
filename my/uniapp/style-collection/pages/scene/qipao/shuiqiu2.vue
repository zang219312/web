<template>
	<view class="comm-content" style="padding-top: 100rpx;">
		<circle-percent titleOne="" bg="#87d7a5" percent="50"></circle-percent>
		<circle-percent titleOne="" bg="#00adc7" percent="10"></circle-percent>
		<circle-percent titleOne="" bg="#FF6A6A" percent="70"></circle-percent>
		<soure :url="url"></soure>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				url: 'https://ext.dcloud.net.cn/plugin?id=214#detail'
			}
		},
		onLoad() {},
		computed: {},
		methods: {

		}
	}
</script>

<style lang="scss">
</style>
