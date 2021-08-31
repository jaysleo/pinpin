<template>
	<view class="container">
		<u-cell-group>
			<u-cell-item title="个人信息" @click="jump('pages/library/user/info/index')" v-if="isLogin"></u-cell-item>
			<u-cell-item title="账号管理" @click="jump('pages/library/user/set/account')" v-if="isLogin"></u-cell-item>
			<u-cell-item title="清除缓存" :value="storageSize" @click="clearStorage"></u-cell-item>
			<u-cell-item title="关于我们" :value="'V'+shop.version" @click="jump('pages/library/user/set/about')"></u-cell-item>
		</u-cell-group>
		<u-modal v-model="show" content="缓存清除成功" @confirm="confirm"></u-modal>
	</view>
</template>

<script>
	import { mapGetters } from 'vuex';
	export default{
		computed: {
			...mapGetters(["isLogin"])
		},
		data(){
			return{
				storageSize: uni.getStorageInfoSync().currentSize + 'Kb',
				shop:{
					zfb:"",
					version:"1.0.0"
				},
				show:false
			}
		},
		methods:{
			// 路由跳转
			jump(path,parmas){
				this.$u.route({
					url: path,
					params: parmas
				});
			},
			clearStorage(){
				uni.clearStorageSync();
				this.storageSize = "0Kb";
				this.show = true;
			},
			confirm(){
				this.jump("pages/login/login");
			}
		},
		onLoad(){
			let version = uni.getAccountInfoSync().miniProgram.version;
			this.shop.version = version==""?"1.0.0":version;
		}
	}
</script>

<style lang="scss" scoped>
</style>
