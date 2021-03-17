<template>
	<view>
		<view class="head comm-center">
			<image src="/static/other/4.png"></image>
			<view class="name">niew</view>
			<view class="remarks">写点什么介绍下自己把！</view>
		</view>
		<view class="home-menu">
			<view class="row comm-center">
				<view>￥0</view>
				<view>余额</view>
			</view>
			<view class="row edge comm-center">
				<view>0</view>
				<view>积分</view>
			</view>
			<view class="row comm-center">
				<view>Lv.1</view>
				<view>等级</view>
			</view>
		</view> 
		<view class="list-menu">
			<view class="cell">
				<view class="left-icon comm-center">
					<image src="/static/other/2.png"></image>
				</view>
				<view class="txt">我的鼻血</view>
				<view class="right-icon comm-center">
					<image src="/static/other/youjiantou.png"></image>
				</view>
			</view>
			<view class="cell">
				<view class="left-icon comm-center">
					<image src="/static/other/7.png"></image>
				</view>
				<view class="txt">我的眼泪</view>
				<view class="right-icon comm-center">
					<image src="/static/other/youjiantou.png"></image>
				</view>
			</view>
			<view class="cell">
				<view class="left-icon comm-center">
					<image src="/static/other/10.png"></image>
				</view>
				<view class="txt">我的便便</view>
				<view class="right-icon comm-center">
					<image src="/static/other/youjiantou.png"></image>
				</view>
			</view>
			<view class="cell">
				<view class="left-icon comm-center">
					<image src="/static/other/1.png"></image>
				</view>
				<view class="txt">我的帅气</view>
				<view class="right-icon comm-center">
					<image src="/static/other/youjiantou.png"></image>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				url: 'http://www.javanx.cn/20190222/css3-radial-gradient/'
			}
		},
		methods: {

		}
	}
</script>

<style lang="scss">
	page {
		background-color: #f8f8f8;
	}

	.head {
		height: 400rpx;
		flex-direction: column;
		background-color: #d24839;
		color: #fbf1ef;

		image {
			width: 120rpx;
			height: 120rpx;
			border: 5rpx solid #FFFFFF;
			border-radius: 100%;
		}

		.name {
			padding-top: 30rpx;
			font-size: 35rpx;
		}

		.remarks {
			padding-top: 10rpx;
			font-size: 24rpx;
		}
	}

	.home-menu {
		display: flex;
		justify-content: space-around;
		align-items: center;
		margin: 20rpx 0;
		height: 180rpx;
		border-radius: 5rpx;
		background-color: #FFFFFF;

		.row {
			width: 30%;
			font-size: 28rpx;
			font-weight: bold;
			flex-direction: column;

			view {
				line-height: 50rpx;
			}
		}

		.edge {
			border-left: 5rpx solid #f1f1f1;
			border-right: 5rpx solid #f1f1f1;
		}
	}

	.list-menu {
		background-color: #FFFFFF;

		.cell {
			display: flex;
			justify-content: space-between;
			align-items: center;
			height: 100rpx;
			border-top: 5rpx solid #f8f8f8;
 
			.left-icon {
				width: 15%;

				image {
					width: 50rpx;
					height: 50rpx;
				}
			}

			.txt {
				width: 75%;
				font-size: 26rpx;
			}

			.right-icon {
				width: 10%;

				image {
					width: 30rpx;
					height: 30rpx;
				}
			}
		}
	}
</style>
