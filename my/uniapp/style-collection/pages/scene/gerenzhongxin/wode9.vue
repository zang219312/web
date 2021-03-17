<template>
	<view>
		<!--头部-->
		<view class="head">
			<view class="info">
				<view class="user">
					<image src="/static/other/3.png"></image>
					<view class="name">
						<text>niew</text>
						<text>ID: 9527</text>
					</view>
				</view>
				<view class="btn">分享店铺</view>
			</view>
		</view>
		<!--菜单-->
		<view class="menu-box">
			<view class="region">
				<view class="title">待处理</view>
				<view class="menu-row">
					<view class="cell">
						<view class="count">33</view>
						<view class="name">待付款</view>
					</view>
					<view class="cell">
						<view class="count">12</view>
						<view class="name">待发货</view>
					</view>
					<view class="cell">
						<view class="count">53</view>
						<view class="name">待提货</view>
					</view>
				</view>
			</view>

			<view class="region">
				<view class="title">店铺数据</view>
				<view class="menu-row">
					<view class="cell">
						<view class="count">122</view>
						<view class="name">今日访客</view>
					</view>
					<view class="cell">
						<view class="count">23</view>
						<view class="name">今日订单</view>
					</view>
					<view class="cell">
						<view class="count">888</view>
						<view class="name">今日收入</view>
					</view>
				</view>
			</view>

			<view class="region">
				<view class="title">我的商品</view>
				<view class="menu-row">
					<view class="cell">
						<view class="count">54</view>
						<view class="name">销售中</view>
					</view>
					<view class="cell">
						<view class="count">2</view>
						<view class="name">待上架</view>
					</view>
					<view class="cell">
						<view class="count" style="color: #ff7962;font-weight: 1000;">＋</view>
						<view class="name">新增商品</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
</script>

<style lang="scss">
	page {
		background-color: #f8f8f8;
	}

	.head {
		position: relative;
		width: 100%;
		height: 400rpx;
		background-color: #ff7962;

		.info {
			padding-top: 150rpx;
			width: 100%;
			display: flex;
			justify-content: space-between;
			align-items: center;

			.user {
				padding-left: 50rpx;
				display: flex;
				justify-content: center;
				align-items: center;

				image {
					width: 120rpx;
					height: 120rpx;
				}

				.name {
					padding-left: 20rpx;
					font-size: 28rpx;
					font-weight: 600;
					color: #FFFFFF;
					display: flex;
					justify-content: center;
					align-items: flex-start;
					flex-direction: column;

					text {
						line-height: 40rpx;
					}
				}
			}

			.btn {
				text-align: center;
				background-color: #ff907c;
				color: #FFFFFF;
				font-size: 30rpx;
				width: 200rpx;
				height: 80rpx;
				line-height: 80rpx;
				border-top-left-radius: 10rpx;
				border-bottom-left-radius: 10rpx;
			}
		}
	}

	.menu-box {
		position: absolute;
		top: 300rpx;
		width: 100%;
	}

	.region {
		background-color: #FFFFFF;
		margin: 30rpx;
		border-radius: 10rpx;

		.title {
			font-size: 32rpx;
			font-weight: bold;
			padding: 30rpx;
		}

		.menu-row {
			display: flex;
			justify-content: center;
			align-items: center;

			.cell {
				width: 30%;
				height: 200rpx;
				display: flex;
				justify-content: center;
				align-items: center;
				flex-direction: column;

				.count {
					font-size: 40rpx;
				}

				.name {
					font-size: 30rpx;
					line-height: 100rpx;
					color: #8a8a8a;
				}
			}
		}
	}
</style>
