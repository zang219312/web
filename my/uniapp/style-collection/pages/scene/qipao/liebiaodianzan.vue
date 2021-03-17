<template>
	<view class="content">
		<view class="item" v-for="(item,index) in list" :key="item.id">
			<view class="left"> {{item.memo}} </view>
			<view class="right" @click="praiseMe(index)">
				<image :src="item.status?'../../../static/qipao/dianzan-1.png':'../../../static/qipao/dianzan-2.png'"></image>
				<view>点击爱心看效果</view>
				<view :animation="animationDataArr[index]" class="praise-me animation-opacity"> +1 </view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// ../../static/qipao/dianzan-2.png
				list: [{
						memo: "数据1",
						status: false,
					},
					{
						memo: "数据2",
						status: false,
					},
					{
						memo: "数据3",
						status: false,
					},
					{
						memo: "数据4",
						status: false,
					},
					{
						memo: "数据5",
						status: false,
					},
					{
						memo: "数据6",
						status: false,
					}
				],
				animationData: {},
				animationDataArr: []
			};
		},
		onLoad() {
			// 1 在页面创建的时候，创建一个临时动画对象
			this.animation = uni.createAnimation();
			this.animationDataArr = Array(this.list.length).fill({});
		},
		onUnload() {
			// 5 页面卸载的时候，清除动画数据
			this.animationData = {};
			this.animationDataArr = Array(this.list.length).fill({});
		},
		methods: {
			// 点赞动画效果
			praiseMe(index) {
				this.list[index].status = !this.list[index].status
				if (this.list[index].status) {
					// 执行动画
					this.animation.translateY(-30).opacity(1).step({
						duration: 500
					});

					// 通过动画实例的export方法导出动画数据给animation属性
					this.animationData = this.animation;
					this.animationDataArr[index] = this.animationData.export();

					// 还原动画
					setTimeout(() => {
						this.animation.translateY(0).opacity(0).step({
							duration: 0
						});
						this.animationData = this.animation;
						this.animationDataArr[index] = this.animationData.export();
					}, 600)
				}
			},
		}
	};
</script>

<style lang="scss">
	page {
		background-color: $uni-bg-color;
	}

	.item {
		display: flex;
		align-items: center;
		text-align: center;
		margin-top: 20rpx;
		padding: 20rpx 0;
		border-bottom: 1rpx solid #FFFFFF;
	}

	.item image {
		width: 80rpx;
		height: 80rpx;
		z-index: 10;
	}

	.item .left {
		flex: 1;
	}

	.item .right {
		font-size: 24rpx;
		position: relative;
		width: 300rpx;
	}

	.praise-me {
		font-size: 35rpx;
		font-weight: bold;
		color: #ff0000;
		z-index: 2;
	}

	.animation-opacity {
		position: absolute;
		left: 125rpx;
		bottom: 70rpx;
		font-weight: bold;
		opacity: 0;
	}
</style>
