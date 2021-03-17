<template>
	<view>
		<view class="comm-content">
			<soure :url="url"></soure>
		</view>
		<!--记得引入components下面的like-button组件-->
		<like-button></like-button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				url: 'https://ext.dcloud.net.cn/plugin?id=1851'
			}
		},
	}
</script>

<style>
</style>
