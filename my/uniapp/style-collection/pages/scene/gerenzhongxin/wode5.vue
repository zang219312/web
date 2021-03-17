<template>
	<view class="center">
		<view class="center_top"></view>
		<!--头部用户信息-->
		<view class="avatar_box">
			<open-data class="avatar" type="userAvatarUrl" default-avatar="https://dev.stall.lkxlkf.com/ca/icons/default/default-icon.png"></open-data>
			<open-data class="nickname" type="userNickName"></open-data>
		</view>
		<view class="center_box_bg">
			<!--主菜单-->
			<view class="profily">
				<view class="home_menu">
					<view class="cell" v-for="(item,index) in homeMenu" :key="index">
						<image class="img" :src="item.img" mode="aspectFill"></image>
						<text :class="index==1?'special':''">{{item.name}}</text>
					</view>
				</view>
			</view>
			<!--列表菜单-->
			<view class="list_menu">
				<view class="row" v-for="(item,index) in listMenu" :key="index">
					<image :src="item.icon" mode="aspectFill"></image>
					<text>{{item.name}}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				homeMenu: [{
					name: '主菜单1',
					img: '/static/other/10.png'
				}, {
					name: '主菜单2',
					img: '/static/other/10.png'
				}, {
					name: '主菜单3',
					img: '/static/other/10.png'
				}],

				listMenu: [{
					name: '列表菜单一',
					icon: '/static/other/1.png'
				}, {
					name: '列表菜单二',
					icon: '/static/other/2.png'
				}, {
					name: '列表菜单三 ',
					icon: '/static/other/3.png'
				}, {
					name: '列表菜单四',
					icon: '/static/other/4.png'
				}, {
					name: '列表菜单五',
					icon: '/static/other/5.png'
				}, {
					name: '列表菜单六',
					icon: '/static/other/6.png'
				}, {
					name: '列表菜单七',
					icon: '/static/other/7.png'
				}, {
					name: '列表菜单八',
					icon: '/static/other/8.png'
				}, {
					name: '列表菜单九',
					icon: '/static/other/9.png'
				}]
			};
		},
		methods: {

		},
	}
</script>

<style lang="scss">
	page {
		height: 100%;
		background-color: #f9f9f9;
	}

	.profily,
	.profily_header {
		border-radius: 20rpx;
	}

	.center {
		height: 100%;

		&_top {
			height: 400rpx;
			background-color: #a9c6b6;
			background-size: cover;
		}

		&_box_bg {
			background: #F9F9F9;
			position: relative;

			.profily {
				position: absolute;
				width: 90%;
				margin: 0 auto;
				top: -100rpx;
				left: 5%;
				background: #FEFEFE;
				padding: 35rpx;
				box-sizing: border-box;
				box-shadow: 1rpx 2rpx 16rpx 1rpx rgba(107, 107, 107, 0.1);
			}
		}
	}

	.avatar_box {
		position: fixed;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		top: 50rpx;
		left: 275rpx;
		width: 200rpx;
		height: 200rpx;

		.avatar {
			height: 120rpx;
			width: 120rpx;
			background-size: 100%;
			border: 5rpx solid #FFFFFF;
			border-radius: 50%;
			overflow: hidden;
		}

		.nickname {
			color: #FFFFFF;
			padding-top: 10rpx;
			font-size: 34rpx;
			font-family: KaiTi;
		}

	}

	.center_box_bg {
		padding-top: 100rpx;
	}

	.home_menu {
		position: relative;
		display: flex;
		justify-content: space-around;

		.cell {
			width: 250rpx;
			font-size: 24rpx;
			text-align: center;
			display: flex;
			flex-direction: column;

			.img {
				width: 80rpx;
				height: 80rpx;
				margin: 0 auto;
				margin-bottom: 5rpx;
			}

			text {
				line-height: 20rpx;
				margin-top: 20rpx;
			}

			.special {
				border-left: 3rpx solid #CCCCCC;
				border-right: 3rpx solid #CCCCCC;
			}
		}
	}

	.list_menu {
		padding: 50rpx 30rpx;
		display: flex;
		align-items: center;
		flex-wrap: wrap;

		.row {
			display: flex;
			justify-content: center;
			align-items: center;
			flex-direction: column;
			width: 230rpx;
			height: 200rpx;
			background-color: #FFFFFF;
			box-shadow: 1rpx 2rpx 16rpx 1rpx rgba(107, 107, 107, 0.1);

			image {
				width: 60rpx;
				height: 60rpx;
			}

			text {
				padding-top: 20rpx;
				font-size: 24rpx;
			}
		}
	}
</style>
