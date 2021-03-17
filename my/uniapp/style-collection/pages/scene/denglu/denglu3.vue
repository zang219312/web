<template>
	<view class="login">
		<view class="content">
			<view class="logo">
				<image src="https://6e69-niew6-1302638010.tcb.qcloud.la/denglu/%E6%96%87%E5%AD%97.png?sign=e21111223f49a522cedaee0ec7fb32e3&t=1607866600"
				 mode="widthFix"></image>
			</view>
			<view class="login-form">
				<view class="item">
					<view class="icon left">
						<image src="https://6e69-niew6-1302638010.tcb.qcloud.la/denglu/account.png?sign=f21501c858525ade84a4a93a8edcabc1&t=1597715417"
						 mode="widthFix"></image>
					</view>
					<input type="text" v-model="account" focus placeholder="请输入账号" maxlength="20" placeholder-class="input-placeholder" />
				</view>
				<view class="item">
					<view class="icon left">
						<image src="https://6e69-niew6-1302638010.tcb.qcloud.la/denglu/password.png?sign=75c81d1e4948d454b7bdac0a49e387f5&t=1597715443"
						 mode="widthFix"></image>
					</view>
					<input type="text" v-model="password" placeholder="请输入密码" maxlength="20" placeholder-class="input-placeholder"
					 :password="passwordShow" />
					<view class="icon right">
						<image v-if="passwordShow" src="https://6e69-niew6-1302638010.tcb.qcloud.la/denglu/hide-password.png?sign=6ca6b422427dfa98097ff9009e0121d3&t=1597715458"
						 mode="widthFix" @click="passwordStatus"></image>
						<image v-else src="https://6e69-niew6-1302638010.tcb.qcloud.la/denglu/show-password.png?sign=57e79fa5ecc90b1a2dab421361361b9f&t=1597715470"
						 mode="widthFix" @click="passwordStatus"></image>
					</view>
				</view>
				<view class="btn" @click="loginClick">
					<text>登 录</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				account: '',
				password: '',
				passwordShow: true,
			}
		},
		onLoad() {

		},

		methods: {
			//登录点击
			loginClick() {
				console.log("登录点击")
			},

			//密码状态 隐藏/显示
			passwordStatus() {
				this.isPassword = !this.isPassword
				this.passwordShow = !this.passwordShow
			}
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #8da4cd;
	}

	.content {
		position: absolute;
		top: 0;
		width: 100%;
	}

	.logo {
		text-align: center;
		margin: 250rpx auto 150rpx auto;

		image {
			width: 300rpx;
			height: 200rpx;
		}
	}

	.login-form {
		width: 550rpx;
		margin: auto;

		.item {
			width: 550rpx;
			height: 80rpx;
			border-radius: 50rpx;
			margin-bottom: 30rpx;
			display: flex;
			justify-content: flex-start;
			align-items: center;
			background-color: #849bc4;
			border: 1rpx solid #efefef;
		}

		input {
			color: #fff;
			width: 350rpx;
			height: 80rpx;
			line-height: 80rpx;
			font-size: 28rpx;
		}

		text {
			height: 30rpx;
			font-family: PingFang-SC-Regular;
			font-size: 30rpx;
			font-weight: bold;
			font-stretch: normal;
			line-height: 40rpx;
			letter-spacing: 3rpx;
			color: #ffffff;
		}

		.icon {
			display: flex;
			justify-content: center;
			align-items: center;
			width: 100rpx;

			image {
				width: 40rpx;
				height: 40rpx;
			}

		}

		.btn {
			margin: 43rpx auto 22rpx auto;
			text-align: center;
			height: 80rpx;
			line-height: 84rpx;
			border-radius: 50rpx;
			background-color: #667eac;
			color: #FFFFFF;
		}
	}

	.input-placeholder {
		color: #fff;
		line-height: 80rpx;
		height: 80rpx;
		font-size: 28rpx;
		margin: auto;
	}
</style>
