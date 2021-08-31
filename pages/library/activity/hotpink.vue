<template>
	<view class="container">
		<view class="bannerbox">
			<view class="bg">
				<u-image :lazy-load="false" :fade="false" src="/static/images/activity/hbg.png" width="100%" height="380"></u-image>
			</view>
			<view class="tit u-flex u-row-center">
				<u-image :lazy-load="false" :fade="false" src="/static/images/activity/htit.png" width="544" height="70"></u-image>
			</view>
		</view>
		<pro-list :list="list" @eventClick="goDetail"></pro-list>
	</view>
</template>

<script>
	import proList from '../components/shoplist/prolist.vue';
	export default{
		components:{
			proList
		},
		data(){
			return{
				list:[],
				currentPage: 1,
				lastPage: 1
			}
		},
		methods:{
			loadData(){
				this.$http.getProlist(3,this.currentPage,10).then((res)=>{
					this.list = [...this.list, ...res.data.data];
					this.lastPage = res.data.last_page;
				})
			},
			//产品详情
			goDetail(id){
				this.$u.route('pages/library/goods/detail',{id:id,type:3});
			},
			//加载更多
			loadMore() {
				if (this.currentPage < this.lastPage) {
					this.currentPage += 1;
					this.loadData();
				}
			}
		},
		onLoad(){
			this.loadData();
		},
		// 下拉刷新
		onPullDownRefresh() {
			this.list = [];
			this.currentPage = 1;
			this.lastPage = 1;
			this.loadData();
			uni.stopPullDownRefresh();
		},
		// 上拉加载
		onReachBottom(){
			this.loadMore();
		}
	}
</script>
<style lang="scss">
	page{
		background: #ff6929;
	}
</style>
<style lang="scss" scoped>
	.bannerbox{
		width: 100%;
		height: 380rpx;
		position: relative;
		margin-bottom: 20rpx;
		.bg{
			position: absolute;
			top:0;
			left: 0;
			right: 0;
			z-index: 20;
		}
		.tit{
			padding-top: 66rpx;
			position: relative;
			z-index: 50;
		}
	}
</style>
