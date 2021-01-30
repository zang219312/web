<template>
	<view>
		<ySteps :infoList="infoList"></ySteps>
		<steps :options="options"></steps>
	</view>
</template>

<script>
	import ySteps from "../../components/Y-Steps/Y-Steps.vue";
	import steps from '../../components/wangxiaohua--steps/index.vue'
	export default {
		components:{ySteps,steps},
		data() {
			return {
				infoList:[{date:'2020-01',info:' 内容 '},{date:'2020-01',info:' 内容 '},{date:'2020-01',info:' 内容 '},{date:'2020-01',info:' 内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容 '}],
				lineNum:12,
				options:[
					{ text1: "2020-10-10 12:00", text2: "工单产生 1" }, { text1: "2020-10-10 12:00", text2: "工单产生 2" },{ text1: "2020-10-10 12:00", text2: "工单产生 2" }
				]
			}
		},
		methods: {
			
		}
	}
</script>

<style>

</style>
