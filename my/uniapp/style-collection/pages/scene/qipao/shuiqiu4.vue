<template>
	<view>
		<!-- <load-line loadType="line" :loadText="loadText" :lineInfo="lineInfo" :loadPercent="loadPercent"></load-line>
		<load-line loadType="circle" :circleInfo="circleInfo" :loadPercent="loadPercent"></load-line> -->
		<load-line loadType="ball" :ballInfo="ballInfo" :loadPercent="loadPercent"></load-line>
	</view>
</template>

<script>
	import LoadLine from '../../../components/load-line/load-line.vue'
	export default {
		components:{
			LoadLine
		},
		onLoad() {
			//此组件可配合上传下载使用
			var i=0;//需要变量来转换给this.loadPercent，否则满足条件无法clearInterval。
			var timer=setInterval(()=>{
				if(i>=100){
					clearInterval(timer);
				}else{
					i++;
					this.loadPercent=i;
				}
			},100)
		},
		data() {
			return {
				lineInfo:{
					colorChange:true,
					loadColor:'#6ee2e1,#2ba98c,#a07e1e'
				},
				circleInfo:{
					foreground:'#FFFFFF',
					background:'#6ED4BF',
					circleColor:'#cec4c4'
				},
				ballInfo:{
					ballType:'all',
					ballSize:150,
					waveColor:'#FFFFFF',
					ballPadding:'5px',
				},
				loadPercent:0,
				loadText:'已下载'
			}
		},
		methods: {
			
		}
	}
</script>

<style>
  
</style>
