<template>
	<view class="content">
		<!--别忘记了 components 下面的 best-gauge组件-->
		<best-gauge :config="gaugeOption"></best-gauge>
		<view class="comm-content">
			<soure :url="url"></soure>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				url:'https://ext.dcloud.net.cn/plugin?id=629#detail',
				gaugeOption: { //定义参数
					id: 'gaugeId0',
					status: 0, 
					name: '标题',
					value: 66.6,
					axisTickLength: 2 //该属性与axisTick互斥，存在axisTickLength并大于0，axisTick就无效
				}
			}
		},
		methods: {}
	}
</script>
<style lang="scss">
	.content {
		padding-top: 30%;
	}
</style>
