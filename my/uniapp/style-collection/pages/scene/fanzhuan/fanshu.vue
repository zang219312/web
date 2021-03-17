<template>
	<view class='container'>
		<view class='card_wrap'>
			<view class='card_item' v-for="(item,index) in cardInfoList" :key="index" @touchstart='touchstart' @touchend="touchend"
			 :animation="index === 0 ? animationData : ''">
				<view class='card_container'>{{item.name}}</view>
			</view>
		</view>
		<soure :url="url"></soure>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				url: 'https://www.jianshu.com/p/f2b324c1081d',
				nowPgae: 1,
				startX: 0,
				slider: false,
				animationData: {},
				cardInfoList: [{
					name: 1
				}, {
					name: 2
				}, {
					name: 3
				}, {
					name: 4
				}]
			}
		},
		methods: {
			touchstart(e) {
				this.startX = e.changedTouches[0].clientX
			},
			touchend(e) {
				let that = this;
				let startX = this.startX;
				let endX = e.changedTouches[0].clientX;
				if (this.slider) return;
				// 下一页(左滑距离大于30)
				if (startX - endX > 30) {
					this.slider = true
					//尾页(当前页 等于 总页数)
					if (this.nowPgae == this.cardInfoList.length) {
						this.slider = false
						wx.showToast({
							title: '已经是最后一张了',
							icon: 'none'
						});
						return;
					};
					//创建动画   5s将位置移动到-150%,-150%
					let animation = wx.createAnimation({
						duration: 500,
					});
					animation.translateX('-150%').translateY('-150%').rotate(60).step();
					this.animationData = animation.export()
					// 移动完成后
					setTimeout(function() {
						var cardInfoList = that.cardInfoList;
						var slidethis = that.cardInfoList.shift(); //删除数组第一项
						that.cardInfoList.push(slidethis); //将第一项放到末尾
						//创建动画   将位置归位
						let animation = wx.createAnimation({
							duration: 0,
						});
						animation.translateX('-53%').translateY('-50%').rotate(0).step();
						that.cardInfoList = that.cardInfoList,
							that.animationData = animation.export(),
							that.slider = false,
							that.nowPgae = that.nowPgae + 1
					}, 500)
				}
				// 上一页
				if (endX - startX > 30) {
					this.slider = true
					//首页
					if (this.nowPgae == 1) {
						this.slider = false
						wx.showToast({
							title: '已经到第一张了',
							icon: 'none'
						})
						return;
					};
					//创建动画  移动到-150%,-150%
					let animation = wx.createAnimation({
						duration: 0,
					});
					animation.translateX('-150%').translateY('-150%').rotate(100).step();
					var cardInfoList = that.cardInfoList;
					var slidethis = that.cardInfoList.pop(); //删除数组末尾项
					that.cardInfoList.unshift(slidethis); //将删除的末尾项放到第一项
					that.animationData = animation.export()
					that.cardInfoList = that.cardInfoList
					setTimeout(function() {
						//创建动画   5s将位置移动到原位
						let animation2 = wx.createAnimation({
							duration: 500,
							// timingFunction: 'cubic-bezier(.8,.1,.2,0.8)',
						});
						animation2.translateX('-53%').translateY('-50%').rotate(0).step();
						that.animationData = animation2.export()
						that.slider = false
						that.nowPgae = that.nowPgae - 1
					}, 50)
				}
			},
		}
	}
</script>
<style lang="scss">
	page {
		background-color: $uni-bg-color;
		height: 100%;
	}

	.container {
		height: 100%;
	}

	.card_wrap {
		position: relative;
		width: 100%;
		height: 80%;
	}

	.card_wrap .card_item {
		position: absolute;
		width: 70%;
		height: 60%;
		top: 50%;
		left: 50%;
		transform: translateX(-50%) translateY(-50%);
		padding: 30rpx;
		background: #fff;
		border: 1rpx solid #eee;
		border-radius: 20rpx;
		box-shadow: 1px 1px 0px 0px rgba(0, 0, 5, 1);
	}

	.card_item:nth-child(1) {
		z-index: 4;
		transform: translateX(-53%) translateY(-50%);
	}

	.card_item:nth-child(2) {
		z-index: 3;
		transform: translateX(-53%) translateY(-50%);
	}

	.card_item:nth-child(3) {
		z-index: 2;
		transform: translateX(-50%) translateY(-51%);
	}

	.card_item:nth-child(4) {
		z-index: 1;
		transform: translateX(-47%) translateY(-52%);
	}

	.card_container {
		font-size: 100rpx;
		width: 100%;
		height: 100%;
	}
</style>
