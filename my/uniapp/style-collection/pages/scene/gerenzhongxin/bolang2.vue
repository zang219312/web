<template>
	<view class="top">
		<image class='img' src='https://6e69-niew6-1302638010.tcb.qcloud.la/%E5%85%B6%E4%BB%96%E6%96%87%E4%BB%B6/bolangbeijing.gif?sign=9940c77963b09fcbb9048c1083d515e0&t=1605080423'
		 mode='scaleToFill'></image>
	</view>
</template>

<script>
	export default {
		data() {
			return {
			}
		},
		onLoad() {

		},
		methods: {

		}
	}
</script>

<style lang="scss">
	.top {
		position: relative;
		width: 100%;
		height: 150px;
		background: #aaaa7f;
	}

	.img {
		position: absolute;
		width: 100%;
		bottom: 0;
		left: 0;
		z-index: 99;
		mix-blend-mode: screen;
		height: 150rpx; //需要波浪高的话，调整该值
	}
</style>
