<template>
	<view>
		<view class="box">
			<view class="qiang">
				<!-- 可以设置距离顶部的高 -->
			</view>
			<view class="conter">
				<view v-for="(i,index) in str" class="someBox">
					<image src="/static/other/10.png"
					 :class="{nainai:i.state}" id="yeye" @click="add(index)"></image>
					<view class="text">{{i.zhi}}</view>
				</view>
			</view>
		</view>
		<soure :url="url"></soure>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				url: 'https://ext.dcloud.net.cn/plugin?id=1890',
				str: [{
						zhi: '抽纸',
						state: false
					},
					{
						zhi: '鼠标',
						state: false
					},
					{
						zhi: '茶具',
						state: false
					},
					{
						zhi: '牛肉干',
						state: false
					},
					{
						zhi: '电脑',
						state: false
					},
					{
						zhi: '手机',
						state: false
					},
					{
						zhi: '洗衣机',
						state: false
					},
					{
						zhi: '水杯',
						state: false
					},
					{
						zhi: '手环',
						state: false
					},
					{
						zhi: '帽子',
						state: false
					},
					{
						zhi: '热水壶',
						state: false
					},
					{
						zhi: '辣条',
						state: false
					},
				]
			}
		},
		onLoad() {

		},
		methods: {
			add(index) {
				this.str[index].state = true;
			}
		}
	}
</script>

<style>
	.qiang {
		width: 100%;
		height: 275rpx;
	}

	.box {
		width: 100vw;
		margin: 0 auto;
		height: 1300rpx;
		background-color: pink;
		background: url('https://6e69-niew6-1302638010.tcb.qcloud.la/%E8%83%8C%E6%99%AF/%E5%94%AE%E5%8D%96%E6%9C%BA.jpg?sign=92e33f978e8bc7f5cd192b98a953620d&t=1611471153') no-repeat;
		background-size: 100% 100%;
	}

	.conter {
		width: 475rpx;
		height: 825rpx;
		margin-left: 80rpx;
		overflow: hidden;
	}

	.someBox {
		width: 157rpx;
		height: 206rpx;
		float: left;
		text-align: center;
		position: relative;
	}

	.someBox .text {
		width: 100rpx;
		height: 30rpx;
		color: #160000;
		font-weight: bold;
		margin: 0 auto;
		font-size: 22rpx;
		line-height: 30rpx;
		text-align: center;
		z-index: 666;
		position: absolute;
		left: 20rpx;
		bottom: 50rpx;
		z-index: 9;
	}

	.nainai {
		animation: ol 2s ease-in 0s;
		animation-fill-mode: forwards;
	}

	#yeye {
		width: 105rpx;
		height: 120rpx;
		position: absolute;
		top: 70rpx;
		left: 26rpx;
		z-index: 10;
	}

	@keyframes ol {
		0% {
			transform: scale(1) rotate(0deg);

		}

		5% {
			transform: scale(1.4) rotate(30deg);
		}

		10% {
			transform: scale(1.4) rotate(-30deg);
		}

		15% {
			transform: scale(1.4) rotate(30deg);
		}

		20% {
			transform: scale(1.4) rotate(-30deg);
		}

		25% {
			transform: scale(1.4) rotate(-45deg);
		}

		50% {
			transform: scale(1) rotate(-45deg);
			top: 70rpx;
		}

		100% {
			transform: scale(1) rotate(-45deg);
			top: 900rpx;
		}
	}
</style>
