<template>
	<view>
		<view class="row bg1">
			<view class="cell">
				<view class="btn1">
					<image src="/static/other/wx.png"></image>
				</view>
			</view>
			<view class="cell">
				<view class="btn1">
					<image src="/static/other/wb.png"></image>
				</view>
			</view>
			<view class="cell">
				<view class="btn1">
					<image src="/static/other/zfb.png"></image>
				</view>
			</view>
			<view class="cell">
				<view class="btn1">
					<image src="/static/other/3.png"></image>
				</view>
			</view>
		</view>

		<view class="row bg2">
			<view class="cell">
				<view class="btn2">
					<image src="/static/other/1.png"></image>
				</view>
			</view>
			<view class="cell">
				<view class="btn2">
					<image src="/static/other/2.png"></image>
				</view>
			</view>
			<view class="cell">
				<view class="btn2">
					<image src="/static/other/7.png"></image>
				</view>
			</view>
			<view class="cell">
				<view class="btn2">
					<image src="/static/other/4.png"></image>
				</view>
			</view>
		</view>

		<view class="row bg3">
			<view class="cell3">
				<view class="alternative1 btn3">
					<text>按钮凸出</text>
				</view>
			</view>
			<view class="cell3">
				<view class="alternative2 btn3">
					<text>按钮凹陷</text>
				</view>
			</view>
		</view>

		<view class="row bg4">
			<view class="btn4 cell4"></view>
			<view class="btn5 cell5"></view>
			<view class="btn6 cell6"></view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		}
	}
</script>

<style lang="scss">
	page {
		background-color: $uni-bg-color;
	}

	.row {
		margin: 10rpx;
		border-radius: 10rpx;
		display: flex;
		justify-content: flex-start;
		flex-wrap: wrap;

		.cell {
			position: relative;
			display: flex;
			justify-content: center;
			align-items: center;
			width: 25%;
			height: 200rpx;

			.btn1 {
				display: flex;
				justify-content: center;
				align-items: center;
				width: 120rpx;
				height: 120rpx;
				border-radius: 50%;
				background: #d9d8f1;
				box-shadow: -3px 3px 6px #575660,
					3px -3px 6px #ffffff;

				image {
					width: 60rpx;
					height: 60rpx;
				}
			}

			.btn2 {
				display: flex;
				justify-content: center;
				align-items: center;
				width: 120rpx;
				height: 120rpx;
				border-radius: 20rpx;
				background: #f2f3f7;
				box-shadow: 3px 3px 5px #616163,
					-3px -3px 5px #ffffff;

				image {
					width: 60rpx;
					height: 60rpx;
				}
			}
		}

		.cell3 {
			position: relative;
			display: flex;
			justify-content: center;
			align-items: center;
			width: 50%;
			height: 200rpx;

			.alternative1 {
				border-radius: 30px;
				background: linear-gradient(145deg, #ffffff, #dadbde);
				box-shadow: 3px 3px 2px #616163,
					-3px -3px 2px #ffffff;
			}

			.alternative2 {
				border-radius: 30px;
				background: #f2f3f7;
				box-shadow: inset 3px 3px 2px #d3d3d7,
					inset -3px -3px 2px #ffffff;
			}

			.btn3 {
				width: 250rpx;
				height: 70rpx;

				text {
					height: 100%;
					display: flex;
					justify-content: center;
					align-items: center;
					font-size: 26rpx;
					color: #757575;
				}
			}
		}
	}

	.cell4 {
		position: relative;
		float: left;
		width: 80px;
		height: 80px;
		margin: 20rpx;
		background: #ecf0f3;
	}

	.btn4 {
		border-radius: 100%;
		box-shadow: inset 9px 9px 15px #d1d9e6, inset -9px -9px 15px #fff;
	}

	.btn4:before {
		content: "";
		position: absolute;
		left: 20%;
		top: 20%;
		width: 60%;
		height: 60%;
		border-radius: 100%;
		background: #ecf0f3;
		box-shadow: 9px 9px 15px #d1d9e6, -9px -9px 15px #fff;
	}

	.cell5 {
		position: relative;
		float: left;
		width: 60px;
		height: 60px;
		margin: 40rpx;
		background: #ecf0f3;
	}

	.btn5 {
		border-radius: 100%;
		box-shadow: inset 9px 9px 15px #d1d9e6, inset -9px -9px 15px #fff;
	}

	.btn5:before {
		content: "";
		position: absolute;
		left: 35%;
		top: 35%;
		width: 35%;
		height: 35%;
		border-radius: 100%;
		background: #fd7b60;
		box-shadow: 9px 9px 15px #d1d9e6, -9px -9px 15px #fff;
	}

	.cell6 {
		position: relative;
		float: left;
		width: 60px;
		height: 60px;
		margin: 40rpx;
		background: #fd7b60;
	}

	.btn6 {
		border-radius: 100%;
	}

	.btn6:before {
		content: "";
		position: absolute;
		left: 15%;
		top: 15%;
		width: 70%;
		height: 70%;
		border-radius: 100%;
		background: #ecf0f3;
		box-shadow: 5px 5px 8px #fd7b60, -5px -5px 8px #fd7b60;
	}

	.bg1 {
		background-color: #e0e4f0;
	}

	.bg2 {
		background-color: #f2f3f7;
	}

	.bg3 {
		background-color: #f2f3f7;
	}

	.bg4 {
		background-color: #ecf0f3;
	}
</style>
