<!--首页每日推荐-->
<template>
	<view id="bbb" class="index-pb">
		<div id="vm" class="pubu" v-cloak>
			<!-- 左边的瀑布 -->
			<ul class="yg yg_l">
				<li v-for="(item,index) in recomendList" :key="index" v-if="index%2==0">
					<view class="" @tap="toDetail(item.goods_id,item.store_id)">
						<div>
							<image :src="item.goods_image_url" mode="scaleToFill"></image>
						</div>
						<p class="tit">{{ item.goods_name }}</p>
						<p class="subtit">{{ item.goods_advword }}</p>
					</view>
					<p class="price">
						<text class="price-l fw700 fs26">￥{{ item.goods_price }}</text>
						<view class="pb-car iconfont" :id="item.goods_id" :data-img="item.goods_image_url" @tap="addShopCar">
							<image src="../../static/shopcar.png"></image>
						</view>
					</p>
				</li>
			</ul>
			<!-- 右边的瀑布 -->
			<ul class="yg yg_r">
				<li v-for="(item,index) in recomendList" :key="index" v-if="index%2==1">
					<view class="" @tap="toDetail(item.goods_id,item.store_id)">
						<div>
							<image :src="item.goods_image_url" mode="scaleToFill"></image>
						</div>
						<p class="tit">{{ item.goods_name }}</p>
						<p class="subtit">{{ item.goods_advword }}</p>
					</view>
					<p class="price">
						<text class="price-l fw700 fs26">￥{{ item.goods_price }}</text>
						<view class="pb-car iconfont" :id="item.goods_id" :data-img="item.goods_image_url" @tap="addShopCar">
							<image src="../../static/shopcar.png"></image>
						</view>
					</p>
				</li>
			</ul>
			<div style="clear: both;"></div>
		</div>
		<!-- 加入购物车动画 cartx 和 carty 是购物车位置在屏幕位置的比例 例如左上角x0.1 y0.1 右下角 x0.9 y0.9-->
		<shopCarAnimation ref="carAnmation" cartx="0.58" carty="1.1"></shopCarAnimation>
	</view>
</template>


<!--JS-->
<script>
	//  加入购物车动画组件
	import shopCarAnimation from '@/components/fly-in-cart/fly-in-cart.vue'
	export default {
		data() {
			return {
				recomendList: [{
						goods_image_url: '../../static/grid1.jpg',
						goods_name: '2019春装新款韩版时尚针织衫女开衫宽松百搭留苏时尚厚毛衣外套女2019春装新款韩版时尚针织衫女开衫宽松百搭留苏时尚厚毛衣外套女',
						goods_advword: '2019春装新款韩版时尚针织衫女开衫宽松百搭留苏时尚厚毛衣外套女2019春装新款韩版时尚针织衫女开衫宽松百搭留苏时尚厚毛衣外套女',
						goods_id: 1,
						goods_price: 100
					}, {
						goods_image_url: '../../static/grid2.jpg',
						goods_name: '2019春装新款韩版时尚针织衫女开衫宽松百搭留苏时尚厚毛衣外套女2019春装新款韩版时尚针织衫女开衫宽松百搭留苏时尚厚毛衣外套女',
						goods_advword: '2019尚针织衫女开衫宽松百搭留苏时尚厚毛衣外套女',
						goods_id: 1,
						goods_price: 100
					},
					{
						goods_image_url: '../../static/grid3.jpg',
						goods_name: '版时尚针织衫女开衫宽松百搭留苏时尚厚毛衣外套女',
						goods_advword: '2019春装新款韩版时尚针织衫女开衫宽松百搭留苏时尚厚毛衣外套女2019春装新款韩版时尚针织衫女开衫宽松百搭留苏时尚厚毛衣外套女',
						goods_id: 1,
						goods_price: 100
					},
					{
						goods_image_url: '../../static/grid1.jpg',
						goods_name: '2019春装新款韩版时尚针织衫女开衫宽松百搭留苏时尚厚毛衣外套女2019春装新款韩版时尚针织衫女开衫宽松百搭留苏时尚厚毛衣外套女',
						goods_advword: '春装新款韩版时尚针织衫女开衫宽松百搭留苏时尚厚毛衣外套女',
						goods_id: 1,
						goods_price: 100
					},
					{
						goods_image_url: '../../static/grid2.jpg',
						goods_name: '2019春装新款韩版时尚针织衫女开衫宽松百搭留苏时尚厚毛衣外套女2019春装新款韩版时尚针织衫女开衫宽松百搭留苏时尚厚毛衣外套女',
						goods_advword: '春装新款韩版时尚针织衫女开衫宽松百搭留苏时尚厚毛衣外套女',
						goods_id: 1,
						goods_price: 100
					},
					{
						goods_image_url: '../../static/grid3.jpg',
						goods_name: '2019春装新款韩版时尚针织衫女开衫宽松百搭留苏时尚厚毛衣外套女2019春装新款韩版时尚针织衫女开衫宽松百搭留苏时尚厚毛衣外套女',
						goods_advword: '春装新款韩版时尚针织衫女开衫宽松百搭留苏时尚厚毛衣外套女',
						goods_id: 1,
						goods_price: 100
					},
					{
						goods_image_url: '../../static/grid3.jpg',
						goods_name: '2019春装新款韩版时尚针织衫女开衫宽松百搭留苏时尚厚毛衣外套女2019春装新款韩版时尚针织衫女开衫宽松百搭留苏时尚厚毛衣外套女',
						goods_advword: '春装新款韩版时尚针织衫女开衫宽松百搭留苏时尚厚毛衣外套女',
						goods_id: 1,
						goods_price: 100
					},
					{
						goods_image_url: '../../static/grid1.jpg',
						goods_name: '2019春装新款韩版时尚针织衫女开衫宽松百搭留苏时尚厚毛衣外套女2019春装新款韩版时尚针织衫女开衫宽松百搭留苏时尚厚毛衣外套女',
						goods_advword: '春装新款韩版时尚针织衫女开衫宽松百搭留苏时尚厚毛衣外套女',
						goods_id: 1,
						goods_price: 100
					},
					{
						goods_image_url: '../../static/grid1.jpg',
						goods_name: '2019春装新款韩版时尚针织衫女开衫宽松百搭留苏时尚厚毛衣外套女2019春装新款韩版时尚针织衫女开衫宽松百搭留苏时尚厚毛衣外套女',
						goods_advword: '春装新款韩版时尚针织衫女开衫宽松百搭留苏时尚厚毛衣外套女',
						goods_id: 1,
						goods_price: 100
					},
					{
						goods_image_url: '../../static/grid1.jpg',
						goods_name: '2019春装新款韩版时尚针织衫女开衫宽松百搭留苏时尚厚毛衣外套女2019春装新款韩版时尚针织衫女开衫宽松百搭留苏时尚厚毛衣外套女',
						goods_advword: '春装新款韩版时尚针织衫女开衫宽松百搭留苏时尚厚毛衣外套女',
						goods_id: 1,
						goods_price: 100
					},
					{
						goods_image_url: '../../static/grid1.jpg',
						goods_name: '2019春装新款韩版时尚针织衫女开衫宽松百搭留苏时尚厚毛衣外套女2019春装新款韩版时尚针织衫女开衫宽松百搭留苏时尚厚毛衣外套女',
						goods_advword: '春装新款韩版时尚针织衫女开衫宽松百搭留苏时尚厚毛衣外套女',
						goods_id: 1,
						goods_price: 100
					},
					{
						goods_image_url: '../../static/grid1.jpg',
						goods_name: '2019春装新款韩版时尚针织衫女开衫宽松百搭留苏时尚厚毛衣外套女2019春装新款韩版时尚针织衫女开衫宽松百搭留苏时尚厚毛衣外套女',
						goods_advword: '春装新款韩版时尚针织衫女开衫宽松百搭留苏时尚厚毛衣外套女',
						goods_id: 1,
						goods_price: 100
					},
					{
						goods_image_url: '../../static/grid1.jpg',
						goods_name: '2019春装新款韩版时尚针织衫女开衫宽松百搭留苏时尚厚毛衣外套女2019春装新款韩版时尚针织衫女开衫宽松百搭留苏时尚厚毛衣外套女',
						goods_advword: '春装新款韩版时尚针织衫女开衫宽松百搭留苏时尚厚毛衣外套女',
						goods_id: 1,
						goods_price: 100
					},
					{
						goods_image_url: '../../static/grid1.jpg',
						goods_name: '2019春装新款韩版时尚针织衫女开衫宽松百搭留苏时尚厚毛衣外套女2019春装新款韩版时尚针织衫女开衫宽松百搭留苏时尚厚毛衣外套女',
						goods_advword: '春装新款韩版时尚针织衫女开衫宽松百搭留苏时尚厚毛衣外套女',
						goods_id: 1,
						goods_price: 100
					}
				]
			};
		},
		components: {
			shopCarAnimation
		},
		methods: {
			// 跳转到详情页
			toDetail(goods_id, store_id) {

			},
			// 加入购物车
			addShopCar(e) {
				console.log('加入购物车');
				// 成功的话，调用加入购物车动画
				this.$refs.carAnmation.touchOnGoods(e);
			}
		}
	};
</script>


<!--css样式-->
<style lang="scss" scoped>
	@import '../../common/css/pubu.css';

	.pb-car {
		float: right;
		color: #FD395B;
		width: 50upx;
		height: 50upx;
		border-radius: 50%;
		text-align: center;
		margin-right: 8upx;

		image {
			width: 100%;
			height: 100%;
		}
	}
</style>
