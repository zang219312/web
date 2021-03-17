<template>
	<view>
		<view class="row" @click="copy(index)" v-for="(item,index) in project" :key="index">
			<text>项目名称：{{project[index].name}}</text>
			<text>项目地址：{{project[index].url}}</text>
			<text>提取码：{{project[index].code}}</text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				project: []
			}
		},
		onLoad() {
			//查询项目地址
			this.$request.whereQuery('project', {}, 20, 0, [], false).then(res => {
				this.project = res
			})
		},
		methods: {
			copy(index) {
				uni.setClipboardData({
					data: this.project[index].url
				})
			}
		}
	}
</script>

<style lang="scss">
	.row {
		margin: 20rpx;
		padding: 20rpx;
		border-radius: 10rpx;
		overflow: hidden;
		background-color: #EEEEEE;

		text {
			display: block;
			font-size: 28rpx;
			line-height: 60rpx;
		}
	}
</style>
