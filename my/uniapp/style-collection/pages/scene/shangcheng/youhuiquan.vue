<template>
	<view>
		<view class="coupon">
			<!-- 1、优惠券金额和过期时间 -->
			<view class="price">
				100元
				<span>优惠券</span>
				<p class="timeout">2020-12-31 18:18:18过期</p>
			</view>
			<!-- 2、优惠券描述 -->
			<view class="describe">
				<p>1、商城、美食可用</p>
				<p>2、过期作废</p>
			</view>
			<!-- 3、按钮 -->
			<view class="btns">
				<button>立即使用</button>
			</view>
		</view>
		<view class="coupon theme1">
			<!-- 1、优惠券金额和过期时间 -->
			<view class="price">
				10元
				<span>优惠券</span>
				<p class="timeout">2022-12-31 23:59:59过期</p>
			</view>
			<!-- 2、优惠券描述 -->
			<view class="describe">
				<p>1、满10.01可使用</p>
			</view>
			<!-- 3、按钮 -->
			<view class="btns">
				<button>立即使用</button>
			</view>
		</view>
		<view class="coupon theme2">
			<!-- 1、优惠券金额和过期时间 -->
			<view class="price">
				100元
				<span>优惠券</span>
				<p class="timeout">2020-12-31 18:18:18过期</p>
			</view>
			<!-- 2、优惠券描述 -->
			<view class="describe">
				<p>1、商城、美食可用</p>
				<p>2、过期作废</p>
			</view>
			<!-- 3、按钮 -->
			<view class="btns">
				<button>立即使用</button>
			</view>
		</view>
		<view class="coupon theme3">
			<!-- 1、优惠券金额和过期时间 -->
			<view class="price">
				100元
				<span>优惠券</span>
				<p class="timeout">2020-12-31 18:18:18过期</p>
			</view>
			<!-- 2、优惠券描述 -->
			<view class="describe">
				<p>1、商城、美食可用</p>
				<p>2、过期作废</p>
			</view>
			<!-- 3、按钮 -->
			<view class="btns">
				<button>立即使用</button>
			</view>
		</view>
		<soure :url="url"></soure>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				url: 'https://www.toutiao.com/i6911515741971989006/?tt_from=weixin&utm_campaign=client_share&wxshare_count=1&timestamp=1609215453&app=news_article&utm_source=weixin&utm_medium=toutiao_android&use_new_style=1&req_id=2020122912173301014708304820C2CE65&share_token=89e04c33-7a72-4a61-a4ad-d42bd7550dad&group_id=6911515741971989006'
			}
		},
		methods: {

		}
	}
</script>

<style lang="scss">
	.coupon {
		background-color: #E0E0E0;
		margin-left: 90px;
		margin-top: 30px;
		margin-bottom: 30px;
		width: 200px;
		/* css变量 */
		--main-color: #EC407A;
		--f-color: #444;
	}

	.price {
		position: relative;
		height: 120px;
		background-image: radial-gradient(circle at 100px -8px, #fff 20px, var(--main-color) 21px);
		color: #fff;
		font-size: 20px;
		text-align: center;
		padding-top: 40px;
	}

	.price .timeout {
		color: var(--f-color);
		font-size: 14px;
		margin-top: 25px;
	}

	.price span {
		font-size: 14px;
	}

	.price::after {
		position: absolute;
		content: '';
		display: block;
		bottom: -5px;
		width: 100%;
		border-bottom: 10px dotted #E0E0E0;
	}

	.describe {
		color: #333;
		padding: 10px;
		font-size: 14px;
	}

	.btns {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 50px;
	}

	.btns button {
		/* 重置按钮样式 */
		border: none;
		box-shadow: none;
		outline: none;

		background-color: var(--main-color);
		color: #fff;
		width: 50%;
		border-radius: 20px;
		line-height: 30px;
		font-size: 15px;
		cursor: pointer;
	}

	.coupon.theme1 {
		--main-color: #8E24AA;
		--f-color: #fff;
	}

	.coupon.theme2 {
		--main-color: #039BE5;
		--f-color: #fff;
	}

	.coupon.theme3 {
		--main-color: #26A69A;
		--f-color: #fff;
	}
</style>
