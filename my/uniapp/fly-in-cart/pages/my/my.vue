<template>
	<view>
		<uniLocker :isshow="isShow" classname="bounceInLeft" title="菜单" :lockermenu="lockermenu" @close="close">
		</uniLocker>
		<button type="default" @click="open">click</button>
	</view>
</template>

<script>
	import uniLocker from '@/components/xiaolangtou-locker/uni-locker.vue';
	export default {
		components: {
			uniLocker
		},
		data() {
			return {
				isShow: false,
				lockermenu: [{
					id: 1,
					title: 'fas',
					icon:'guanbi'
				}, {
					id: 2,
					title: 'fsd',
					icon:'guanbi'
				}]
			}
		},
		methods: {
			open() {
				this.isShow = true
			},
			close() {
				this.isShow = false
			}
		}
	}
</script>

<style>

</style>
