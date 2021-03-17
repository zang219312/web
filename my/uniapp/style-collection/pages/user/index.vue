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
					<view class="cell" v-for="(item,index) in homeMenu" :key="index" @click="homeMenuClick(index)">
						<image class="img" :src="item.img" mode="aspectFill"></image>
						<text :class="index==1?'special':''">{{item.name}}</text>
					</view>
				</view>
			</view>
			<!--两边圆弧-->
			<view class="arc">
				<view class="within_arc"></view>
			</view>
			<!--广告-->
			<view style="padding:0 20rpx;background-color: #FFFFFF;">
				<ad unit-id="adunit-4ec9e1fb52b81edb" ad-intervals="30"></ad>
			</view>
			<!--列表菜单-->
			<view class="list_menu">
				<view class="row" v-for="(item,index) in listMenu" :key="index" @click="listMenuClick(index)">
					<image :src="item.icon" mode="aspectFill"></image>
					<text>{{item.name}}</text>
					<u-icon name="arrow-right" color="#B6B6B6"></u-icon>
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
					name: '签到福利',
					img: 'https://6e69-niew6-1302638010.tcb.qcloud.la/%E8%8F%9C%E5%8D%95%E5%9B%BE%E6%A0%87/%E7%A6%8F%E5%88%A9.png?sign=c12f64237eda435aaa5d63f1ed71d281&t=1610798908',
					url: '/pages/user/sign-in'
				}, {
					name: '收集不易',
					img: 'https://6e69-niew6-1302638010.tcb.qcloud.la/%E8%8F%9C%E5%8D%95%E5%9B%BE%E6%A0%87/%E5%92%96%E5%95%A1.png?sign=74e6f126310200ea1fa521afe89f5d04&t=1603438957',
					url: ''
				}, {
					name: '使用说明',
					img: 'https://6e69-niew6-1302638010.tcb.qcloud.la/%E8%8F%9C%E5%8D%95%E5%9B%BE%E6%A0%87/%E8%AF%B4%E6%98%8E.png?sign=b5036f0a0cda014268a12e2ccb30209f&t=1603548540',
					url: '/pages/user/explain'
				}],

				listMenu: [{
						name: '项目源码',
						icon: 'https://6e69-niew6-1302638010.tcb.qcloud.la/%E8%8F%9C%E5%8D%95%E5%9B%BE%E6%A0%87/%E4%BB%A3%E7%A0%81%E5%BC%80%E5%8F%91.png?sign=d8c3e57c0ea09725d57faff43346450e&t=1606578498',
						url: '/pages/user/source-code'
					},
					// {
					// 	name: '快速预览所有样式',
					// 	icon: 'https://6e69-niew6-1302638010.tcb.qcloud.la/%E8%8F%9C%E5%8D%95%E5%9B%BE%E6%A0%87/%E6%9F%A5%E7%9C%8B.png?sign=880abac1eb5c746085e81479460b0eb9&t=1603439025',
					// },
					{
						name: '关于收集',
						icon: 'https://6e69-niew6-1302638010.tcb.qcloud.la/%E8%8F%9C%E5%8D%95%E5%9B%BE%E6%A0%87/%E5%85%B3%E4%BA%8E.png?sign=abe1d46b76d79bc2eab187c402945892&t=1606577988',
						url: '/pages/user/about'
					}, {
						name: '联系作者',
						icon: 'https://6e69-niew6-1302638010.tcb.qcloud.la/%E8%8F%9C%E5%8D%95%E5%9B%BE%E6%A0%87/%E4%BD%9C%E8%80%85.png?sign=5e61cfb353f3f42a118fdf9b1824564d&t=1603439041',
						url: '/pages/user/contact'
					}, {
						name: '版本记录',
						icon: 'https://6e69-niew6-1302638010.tcb.qcloud.la/%E8%8F%9C%E5%8D%95%E5%9B%BE%E6%A0%87/%E7%89%88%E6%9C%AC%E8%BF%AD%E4%BB%A3.png?sign=52930695cc5d4af714b9766c94fa8ba7&t=1606578193',
						url: '/pages/user/edition'
					}
				]
			};
		},
		methods: {
			//主菜单点击
			homeMenuClick(index) {
				if (index == 1) {
					uni.previewImage({
						current: 'https://6e69-niew6-1302638010.tcb.qcloud.la/%E4%BA%8C%E7%BB%B4%E7%A0%81/weixin.jpg?sign=c856b5109a2ee003b2c6081c7f07862e&t=1603439924', // 当前显示图片的 http 链接
						urls: [
							'https://6e69-niew6-1302638010.tcb.qcloud.la/%E4%BA%8C%E7%BB%B4%E7%A0%81/weixin.jpg?sign=c856b5109a2ee003b2c6081c7f07862e&t=1603439924',
							'https://6e69-niew6-1302638010.tcb.qcloud.la/%E4%BA%8C%E7%BB%B4%E7%A0%81/zhifubao.jpg?sign=31a8b643d70c6b0358fd693fb9ed1719&t=1603439936'
						] // 需要预览的图片 http 链接列表[]
					});
				} else {
					uni.navigateTo({
						url: this.homeMenu[index].url
					})
				}
			},

			//列表菜单点击
			listMenuClick(index) {
				uni.navigateTo({
					url: this.listMenu[index].url
				})
			}
		},
	}
</script>

<style lang="scss">
	page {
		height: 100%;
	}

	.profily,
	.profily_header {
		border-radius: 20rpx;
	}

	.center {
		height: 100%;

		&_top {
			height: 350rpx;
			background-color: $uni-bg-color;
			background-size: cover;
		}

		&_box_bg {
			background: #F9F9F9;
			position: relative;

			.profily {
				position: absolute;
				width: 90%;
				margin: 0 auto;
				top: -110rpx;
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
		top: 30rpx;
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

	.arc {
		background-color: $uni-bg-color;
		height: 100rpx;
	}

	.within_arc {
		background-color: #FFFFFF;
		border-top-left-radius: 20%;
		border-top-right-radius: 20%;
		height: 100rpx;
	}

	.list_menu {
		width: 100%;
		display: inline-block;

		.row {
			font-size: 28rpx;
			letter-spacing: 1rpx;
			padding: 30rpx 5%;
			background: #FEFEFE;
			border-bottom: 1rpx solid #EEEEEE;
			overflow: hidden;
			box-sizing: border-box;
			display: flex;
			align-items: center;
			position: relative;

			&:hover {
				background: #F6F6F6 !important;
			}

			text:nth-of-type(1) {
				margin-left: 20rpx;
				width: 80%;
			}

			image {
				width: 40rpx;
				height: 40rpx;
			}

			&:nth-of-type(4) {
				margin-top: 10rpx;
			}
		}
	}
</style>
