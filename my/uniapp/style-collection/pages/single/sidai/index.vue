<template>
	<view>
		<view style="display: flex;justify-content: center;align-items: center;padding-bottom: 20rpx;">
			<soure :url="url"></soure>
		</view>
		<view class="silk-ribbon"><span class="silk-ribbon1"><span>优惠</span></span></view>
		<view class="silk-ribbon"><span class="silk-ribbon2">丝<br>带<br>效<br>果<br>2</span></view>
		<view class="silk-ribbon"><span class="silk-ribbon3">丝带效果3</span></view>
		<view class="silk-ribbon"><span class="silk-ribbon4">丝带效果4</span></view>
		<view class="silk-ribbon"><span class="silk-ribbon5">丝带效果5</span></view>
		<view class="silk-ribbon">
			<view class="wrap"><span class="silk-ribbon6">丝带效果6</span></view>
		</view>
		<view class="comm-content" style="background-color: #EEEEEE;">
			<soure :url="url2"></soure>
			<view class="a">
				<view class="b"><text>点我</text></view>
				<view class="b"><text>查看</text></view>
				<view class="b"><text>效果</text></view>
				<view class="b"><text>哈哈</text></view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				url: 'https://www.jq22.com/webqd3850',
				url2: 'https://blog.csdn.net/weixin_33825683/article/details/89171163?utm_medium=distribute.pc_relevant.none-task-blog-BlogCommendFromBaidu-2.not_use_machine_learn_pai&depth_1-utm_source=distribute.pc_relevant.none-task-blog-BlogCommendFromBaidu-2.not_use_machine_learn_pai'
			};
		},
		onLoad() {

		},
		methods: {

		}
	};
</script>

<style lang="scss">
	page {
		background-color: $uni-bg-color;
	}

	.silk-ribbon {
		display: flex;
		justify-content: center;
		margin-left: 10px;
		width: 94%;
		height: 150px;
		position: relative;
		margin-bottom: 30px;
		background-color: #EEEEEE;
		color: #FFFFFF;
	}

	.silk-ribbon:nth-child(even) {
		margin-right: 4%;
	}

	@media (max-width:500px) {
		.ribbon {
			width: 100%
		}

		.silk-ribbon:nth-child(even) {
			margin-right: 0%;
		}
	}

	.silk-ribbon1 {
		position: absolute;
		top: -6px;
		right: 10px;
	}

	.silk-ribbon1:after {
		position: absolute;
		content: "";
		display: block;
		width: 0;
		height: 0;
		border-left: 53px solid transparent;
		border-right: 53px solid transparent;
		border-top: 10px solid #F8463F;
	}

	.silk-ribbon1 span {
		position: relative;
		display: inline-block;
		text-align: center;
		background: #F8463F;
		font-size: 14px;
		line-height: 1;
		padding: 12px 8px 10px;
		border-top-right-radius: 8px;
		width: 90px;
	}

	.silk-ribbon1 span:before,
	.silk-ribbon1 span:after {
		position: absolute;
		content: "";
		display: block;
	}

	.silk-ribbon1 span:before {
		background: #F8463F;
		height: 6px;
		width: 6px;
		left: -6px;
		top: 0;
	}

	.silk-ribbon1 span:after {
		background: #C02031;
		height: 6px;
		width: 8px;
		border-radius: 8px 8px 0 0;
		left: -8px;
		top: 0;
	}

	.silk-ribbon2 {
		display: inline-block;
		width: 60px;
		padding: 10px 0;
		background: #F47530;
		top: -6px;
		left: 25px;
		position: absolute;
		text-align: center;
		border-top-left-radius: 3px;
	}

	.silk-ribbon2:before {
		height: 0;
		width: 0;
		border-bottom: 6px solid #8D5A20;
		border-right: 6px solid transparent;
		right: -6px;
		top: 0;
	}

	.silk-ribbon2:before,
	.silk-ribbon2:after {
		content: "";
		position: absolute;
	}

	.silk-ribbon2:after {
		height: 0;
		width: 0;
		border-left: 30px solid #F47530;
		border-right: 30px solid #F47530;
		border-bottom: 30px solid transparent;
		bottom: -30px;
		left: 0;
	}

	.silk-ribbon3 {
		display: inline-block;
		position: absolute;
		width: 150px;
		height: 50px;
		line-height: 50px;
		padding-left: 15px;
		background: #59324C;
		left: -8px;
		top: 20px
	}

	.silk-ribbon3:before,
	.silk-ribbon3:after {
		content: "";
		position: absolute;
	}

	.silk-ribbon3:before {
		height: 0;
		width: 0;
		border-bottom: 8px solid black;
		border-left: 8px solid transparent;
		top: -8px;
		left: 0;
	}

	.silk-ribbon3:after {
		height: 0;
		width: 0;
		border-top: 25px solid transparent;
		border-bottom: 25px solid transparent;
		border-left: 15px solid #59324C;
		right: -15px;
	}

	.silk-ribbon4 {
		position: absolute;
		left: 0;
		top: 15px;
		padding: 8px 10px;
		background: #00B3ED;
		box-shadow: -1px 2px 4px rgba(0, 0, 0, 0.5);
	}

	.silk-ribbon4:before,
	.silk-ribbon4:after {
		position: absolute;
		content: "";
		display: block;
	}

	.silk-ribbon4:before {
		width: 7px;
		height: 100%;
		padding: 0 0 7px;
		top: 0;
		left: -7px;
		background: inherit;
		border-radius: 5px 0 0 5px;
	}

	.silk-ribbon4:after {
		width: 5px;
		height: 5px;
		background: rgba(0, 0, 0, 0.35);
		bottom: -5px;
		left: -5px;
		border-radius: 5px 0 0 5px;
	}

	.silk-ribbon5 {
		display: inline-block;
		width: calc(100% + 20px);
		height: 50px;
		line-height: 50px;
		text-align: center;
		margin-left: -10px;
		margin-right: -10px;
		background: #EDBA19;
		position: relative;
		top: 20px;
	}

	.silk-ribbon5:before {
		content: "";
		position: absolute;
		height: 0;
		width: 0;
		border-top: 10px solid #cd8d11;
		border-left: 10px solid transparent;
		bottom: -10px;
		left: 0;
	}

	.silk-ribbon5:after {
		content: "";
		position: absolute;
		height: 0;
		width: 0;
		border-top: 10px solid #cd8d11;
		border-right: 10px solid transparent;
		right: 0;
		bottom: -10px;
	}

	.wrap {
		width: 100%;
		height: 188px;
		position: absolute;
		top: -8px;
		left: 8px;
		overflow: hidden;
	}

	.wrap:before {
		content: "";
		display: block;
		border-radius: 8px 8px 0px 0px;
		width: 40px;
		height: 8px;
		position: absolute;
		right: 100px;
		background: #4D6530;
	}

	.wrap:after {
		content: "";
		display: block;
		border-radius: 0px 8px 8px 0px;
		width: 8px;
		height: 40px;
		position: absolute;
		right: 0px;
		top: 100px;
		background: #4D6530;
	}

	.silk-ribbon6 {
		display: inline-block;
		text-align: center;
		width: 200px;
		height: 40px;
		line-height: 40px;
		position: absolute;
		top: 30px;
		right: -50px;
		z-index: 2;
		overflow: hidden;
		transform: rotate(45deg);
		-ms-transform: rotate(45deg);
		-moz-transform: rotate(45deg);
		-webkit-transform: rotate(45deg);
		-o-transform: rotate(45deg);
		border: 1px dashed;
		box-shadow: 0 0 0 3px #57DD43, 0px 21px 5px -18px rgba(0, 0, 0, 0.6);
		background: #57DD43;
	}




	.a {
		display: flex;
		justify-content: center;
		padding: 30rpx 0;
		width: 750rpx;
	}

	.a:before {
		content: "";
		border: 25px solid;
		border-color: #ccc #ccc #ccc transparent;
		margin-top: 10px;
		float: left;
	}

	.a:after {
		content: "";
		border: 25px solid;
		border-color: #ccc transparent #ccc #ccc;
		margin-top: 10px;
		float: left;
	}

	.a text {
		display: inline-block;
		width: 50px;
		line-height: 50px;
		margin-top: 10px;
		text-align: center;
		background: #ccc;
		position: relative;
		transition: background-color 0.5s, margin-top 0.3s;
	}

	.a .b {
		color: #000;
		text-decoration: none;
		height: 60px;
		font-size: 30rpx;
		overflow: hidden;
		float: left;
	}

	.a text:before {
		content: "";
		border-right: 10px solid #000;
		border-bottom: 10px solid #ccc;
		position: absolute;
		top: 50px;
		left: 0px;
	}

	.a text:after {
		content: "";
		border-left: 10px solid #000;
		border-bottom: 10px solid #ccc;
		position: absolute;
		top: 50px;
		right: 0px;
	}

	.a .b:hover text {
		margin-top: 0px;
		background: #a2dee7;
	}
</style>
