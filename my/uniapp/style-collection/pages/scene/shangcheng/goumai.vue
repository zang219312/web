<template>
	<view class="comm-content">
		<PengpaiFadeInOut :list="list" />
		<soure :url="url" />
	</view>
</template>

<script>
	// ******************记住别忘记了引用组件********************
	import PengpaiFadeInOut from 'components/Pengpai-FadeInOut/Pengpai-FadeInOut.vue'
	export default {
		components: {
			PengpaiFadeInOut
		},
		data() {
			return {
				list: [{
						title: '舌尖上的小叁 刚刚购买了商品',
						img: '/static/other/1.png'
					},
					{
						title: '阿狸粑粑  刚刚购买了商品',
						img: '/static/other/2.png'
					},
					{
						title: '小丽  刚刚购买了商品',
						img: '/static/other/3.png'
					},
					{
						title: '华人街的爱豆  刚刚购买了商品',
						img: '/static/other/4.png'
					}
				],
				url: 'https://ext.dcloud.net.cn/plugin?id=2293'
			}
		},
		methods: {}
	}
</script>

<style lang="scss">
	page {
		background-color: $uni-bg-color;
	}
</style>
