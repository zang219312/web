<template>
	<view>

		<view class="content">

			<!-- <view class="box">
			<switch @change="ChangeLoading" />
		</view> -->
			<view class="box">
				<Loading1></Loading1>
			</view>
			<view class="box">
				<Loading2></Loading2>
			</view>
			<view class="box">
				<Loading3></Loading3>
			</view>
			<view class="box">
				<Loading4></Loading4>
			</view>
			<view class="box">
				<Loading5></Loading5>
			</view>
			<view class="box">
				<Loading6></Loading6>
			</view>
			<view class="box">
				<Loading7></Loading7>
			</view>
			<view class="box">
				<Loading8></Loading8>
			</view>
			<view class="box">
				<Loading9></Loading9>
			</view>
			<view class="box">
				<Loading10></Loading10>
			</view>
			<view class="box">
				<Loading11></Loading11>
			</view>
			<view class="box">
				<Loading12></Loading12>
			</view>
			<view class="box">
				<Loading13></Loading13>
			</view>
			<view class="box">
				<Loading14></Loading14>
			</view>
			<view class="box">
				<Loading15></Loading15>
			</view>
			<view class="box">
				<Loading16></Loading16>
			</view>
			<view class="box">
				<Loading17></Loading17>
			</view>
			<view class="box">
				<Loading18></Loading18>
			</view>
			<view class="box">
				<Loading19></Loading19>
			</view>
			<view class="box">
				<Loading20></Loading20>
			</view>
			<view class="box">
				<Loading21></Loading21>
			</view>
			<view class="box">
				<Loading22></Loading22>
			</view>
			<view class="box">
				<Loading23></Loading23>
			</view>
			<view class="box">
				<Loading24></Loading24>
			</view>
			<view class="box">
				<Loading25></Loading25>
			</view>
			<view class="box">
				<Loading26></Loading26>
			</view>
			<view class="box">
				<Loading27></Loading27>
			</view>
			<view class="box">
				<Loading28></Loading28>
			</view>
			<view class="box">
				<Loading29></Loading29>
			</view>
			<view class="box">
				<Loading30></Loading30>
			</view>
			<!-- <w-loading text="加载中.." mask="true" click="false" ref="loading"></w-loading> -->
			<!-- mask:  	true 无遮罩层              		|     false 有遮罩层 						 -->
			<!-- click:  	true 点击空白无法关闭加载状态   |     false 点击空白可关闭加载状态 -->
		</view>
		<view style="margin: 0 10rpx;">
			<soure :url="url"></soure>
		</view>
	</view>
</template>

<script>
	import Loading1 from "@/components/w-loading/loading1.vue";
	import Loading2 from "@/components/w-loading/loading2.vue";
	import Loading3 from "@/components/w-loading/loading3.vue";
	import Loading4 from "@/components/w-loading/loading4.vue";
	import Loading5 from "@/components/w-loading/loading5.vue";
	import Loading6 from "@/components/w-loading/loading6.vue";
	import Loading7 from "@/components/w-loading/loading7.vue";
	import Loading8 from "@/components/w-loading/loading8.vue";
	import Loading9 from "@/components/w-loading/loading9.vue";
	import Loading10 from "@/components/w-loading/loading10.vue";
	import Loading11 from "@/components/w-loading/loading11.vue";
	import Loading12 from "@/components/w-loading/loading12.vue";
	import Loading13 from "@/components/w-loading/loading13.vue";
	import Loading14 from "@/components/w-loading/loading14.vue";
	import Loading15 from "@/components/w-loading/loading15.vue";
	import Loading16 from "@/components/w-loading/loading16.vue";
	import Loading17 from "@/components/w-loading/loading17.vue";
	import Loading18 from "@/components/w-loading/loading18.vue";
	import Loading19 from "@/components/w-loading/loading19.vue";
	import Loading20 from "@/components/w-loading/loading20.vue";
	import Loading21 from "@/components/w-loading/loading21.vue";
	import Loading22 from "@/components/w-loading/loading22.vue";
	import Loading23 from "@/components/w-loading/loading23.vue";
	import Loading24 from "@/components/w-loading/loading24.vue";
	import Loading25 from "@/components/w-loading/loading25.vue";
	import Loading26 from "@/components/w-loading/loading26.vue";
	import Loading27 from "@/components/w-loading/loading27.vue";
	import Loading28 from "@/components/w-loading/loading28.vue";
	import Loading29 from "@/components/w-loading/loading29.vue";
	import Loading30 from "@/components/w-loading/loading30.vue";
	export default {
		components: {
			Loading1,
			Loading2,
			Loading3,
			Loading4,
			Loading5,
			Loading6,
			Loading7,
			Loading8,
			Loading9,
			Loading10,
			Loading11,
			Loading12,
			Loading13,
			Loading14,
			Loading15,
			Loading16,
			Loading17,
			Loading18,
			Loading19,
			Loading20,
			Loading21,
			Loading22,
			Loading23,
			Loading24,
			Loading25,
			Loading26,
			Loading27,
			Loading28,
			Loading29,
			Loading30,
		},
		data() {
			return {
				title: "loading",
				url: 'https://ext.dcloud.net.cn/plugin?id=504'
			};
		},
		onReady() {

		},
		methods: {
			ChangeLoading() {
				this.$refs.loading.open()
				//this.$refs.loading.close()
			}
		}
	};
</script>

<style>
	.content {
		width: 100%;
		display: flex;
		flex-wrap: wrap;
		flex-direction: row;
		justify-content: space-around;
		align-content: flex-start;
	}

	.box {
		position: relative;
		display: flex;
		height: 350upx;
		border: 1px solid rgba(255, 255, 255, 0.1);
		border-radius: 10upx;
		margin-top: 30upx;
		flex: 0 0 350upx;
		background: #040038;
		justify-content: center;
		align-items: center;
		overflow: hidden;
	}
</style>
