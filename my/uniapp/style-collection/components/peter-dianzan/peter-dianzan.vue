<template>
	<view class="like-effect-wrap" >
		<canvas type="2d" id="heartsCanvas" class="like-canvas" :style="'width:'+heartWidth+'px;height:'+heartHeight+'px;'"></canvas>
		<view v-show="showCanvas">
			<view class="like-gif" :style="'background-image: url('+ bg +');'"></view>
			<view class="like-num">+{{count}}{{text}}</view>
		</view>
	</view>
</template>

<script>
	import Dianzan from '@/components/peter-dianzan/dianzan';
	export default {
		props: {
			count: {
				type: Number,
				required: true,
				default: 0
			},
			longPress: {
				type: Boolean,
				require: false,
				default: false
			}
		},
		/**
		 * 为了演示写的，点赞按钮可以全部写到组件内，图片点赞，文章点赞等。
		 */
		watch: {
			count: {
				handler:function(newVal, oldVal) {
					this.change();
				},
				deep:true
			}
		},
		data() {
			return {
				showCanvas: false,
				heartWidth: 0,
				heartHeight: 0,
				zanObj: {},
				text: '鼓励',
				nowtime: 0,
				bg: 'https://6e69-niew6-1302638010.tcb.qcloud.la/%E5%85%B6%E4%BB%96%E6%96%87%E4%BB%B6/like.gif?sign=7197ce00df68090ddb4f3af9a86adec9&t=1608385025',
			};
		},

		onReady() {
			let self = this;
			uni.getSystemInfo({
				success(res) {
					let screenHeight = res.screenHeight;
					let screenWidth = res.screenWidth;
					self.heartWidth = screenWidth;
					self.heartHeight = screenHeight;
					self.$nextTick(function(){
						let init = {
							canvasEl: '#heartsCanvas',
							amount: 10,
							that: self
						};
						self.zanObj = new Dianzan(init);
					})
					// 转换背景图片格式
					let base641 = uni.getFileSystemManager().readFileSync(self.bg, 'base64');
					self.bg = 'data:image/jpg;base64,' + base641;
				},
				fail(err) {
					console.log(err);
				}
			})
		},
		
		methods: {
			/**
			 * 监听count变化
			 */
			change() {
				if(this.longPress) {
					this.showText(this.count);
				} else {
					this.text = '个赞';
				}
				this.showCanvas = true;
				this.zanObj.startAnimation();
			},
			
			/**
			 * 根据count数量变化，显示的文本跟着变化
			 */
			showText(count) {
				if(count > 0 && count < 20){
					this.text = '鼓励';
				}else if(count >= 20 && count < 50) {
					this.text = '加油!!';
				} else if(count >= 50 && count < 100) {
					this.text = '太棒了!!!';
				} else {
					this.text = '膜拜!!!!';
				}
			}
		}
	}
</script>

<style>
.like-effect-wrap {
		/* z-index: -1; */
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
	}
	.like-effect-wrap .like-canvas {
		position: fixed;
		left: 0;
		right: 0;
		bottom: 96rpx;
		margin: 0 auto;
		z-index: 99999;
	}
	.like-effect-wrap .like-gif {
		position: absolute;
		right: 0;
		margin: auto;
		bottom: 96rpx;
		width: 140rpx;
		height: 140rpx;
		background-position: 50%;
		background-size: cover;
	}
	.like-effect-wrap .like-num {
		position: absolute;
		bottom: 110rpx;
		right: 100rpx;
		text-align: right;
		font-size: 60rpx;
		line-height: 120rpx;
		padding-right: 40rpx;
		font-style: italic;
		font-weight: 700;
		background: linear-gradient(180deg,#f4d909,#f9595c 80%);
		color: transparent;
		-webkit-background-clip: text;
	}
</style>
