<template>
	<view class="locker_box animated" :class="classname" v-if="isshow">
		<view class="content_box">
			<view class="title">
				<text>{{ title }}</text>
				<text class="iconfont icon-guanbi close" @click="close"></text>
			</view>
			<view class="menu_box">
				<template v-for="item in lockermenu">
					<view class="menu_item" :key="item.id" @click="menuClick(item.id)">
						<text class="iconfont icon" :class="item.icon"></text>
						<text>{{ item.title }}</text>
					</view>
				</template>
			</view>
		</view>
	</view>
</template>

<script>
/**
 * 抽屉的弹出方向
 * classname
 * 从左到右  bounceInLeft
 * 从右到左  bounceInRight
 * 从上到下  bounceInDown
 * 从下到上  bounceInUp
 */
export default {
	props: {
		isshow: { type: Boolean, default: false, required: true },
		classname: { type: String, default: 'bounceInLeft' },
		title: {
			type: String,
			default: '功能列表'
		},
		lockermenu: {
			type: Array,
			default: []
		}
	},
	data() {
		return {};
	},
	methods: {
		close() {
			this.$emit('close');
		},
		menuClick(e){
			this.$emit('menuclick',e);
		}
		
	}
};
</script>
<style scoped>
@import './animate.css';
@import './iconfont.css';
</style>
<style lang="scss" scoped>
.locker_box {
	width: 100%;
	height: 100%;
	position: fixed;
	top: 116rpx;
	left: 0;
	background-color: rgba($color: #000000, $alpha: 0.3);
	z-index: 9999;
}
.content_box {
	width: 50%;
	height: 100%;
	background-color: white;
	box-sizing: border-box;
}
.title {
	display: flex;
	align-items: center;
	padding: 10rpx;
	margin-bottom: 20rpx;
	text {
		display: block;
		flex: 1;
	}
	.close {
		color: #c8c7cc;
		text-align: right;
		font-size: 40rpx;
	}
}
.menu_box {
	padding: 20rpx;
	.menu_item{
		display: flex;
		align-items: center;
		margin: 0 0 30rpx 0;
	}
}
.icon{
	color: rgb(191, 232, 254);
	font-size: 53rpx;
	margin-right: 20rpx;
}
</style>
