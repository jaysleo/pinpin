<template>
	<view class="balance_wrap">
		<view class="balancebox u-flex">
			<view class="u-flex-col u-flex-1">
				<text class="small">账户余额</text>
				<text class="num">{{userInfo.now_money||0}}</text>
			</view>
			<button class="u-reset-button txbtn" @click="withdrawal">提现</button>
		</view>
		<view class="balan_listbox">
			<view class="balantit">余额明细</view>
			<view class="datebox u-flex">
				<view class="date_item" :class="{'cur':cur==index}" v-for="(item,index) in tablist" :key="index" @click="tab(index,item.type)">{{item.name}}</view>
			</view>
			<view class="balan_list">
				<block v-if="list.length">
					<view class="balan_item u-flex" v-for="(item,index) in list" :key="index">
						<view class="u-flex-col u-flex-1">
							<text class="name">{{item.title}}</text>
							<text>{{item.add_time}}</text>
						</view>
						<view class="u-flex-col">
							<text class="name" v-if="item.pm!=0">+{{item.number}}</text>
							<text class="name" v-else>-{{item.number}}</text>
						</view>
					</view>
				</block>
				<view class="emptybox u-flex-col u-col-center u-row-center" v-else>
					<u-image src="/static/images/common/nodata.png" width="110" height="122"></u-image>
					<text class="txt">暂无记录</text>
				</view>
				<u-loadmore v-if="list.length" height="80rpx" :status="loadStatus" icon-type="flower" color="#ccc" />
			</view>
		</view>
	</view>
</template>

<script>
	import {mapGetters} from 'vuex';
	export default{
		data(){
			return{
				cur:0,
				type:"",
				tablist:[
					{
						type:"",
						name:"全部"
					},
					{
						type:1,
						name:"收入"
					},
					{
						type:0,
						name:"支出"
					}
				],
				list:[],
				loadStatus:'loadmore',
				currentPage: 1,
				lastPage: 1
			}
		},
		computed: {
			...mapGetters(["isLogin","userInfo"])
		},
		methods:{
			tab(index,type){
				this.cur = index;
				this.type = type;
				this.currentPage = 1;
				this.lastPage = 1;
				this.getlist();
			},
			getlist(){
				this.loadStatus = 'loading';
				this.$http.billList(this.type,this.currentPage,10).then((res)=>{
					this.list = [...this.list, ...res.data.data];
					this.lastPage = res.data.last_page;
					this.loadStatus = this.currentPage < res.data.last_page ? 'loadmore' : 'nomore';
				})
			},
			//加载更多
			loadMore() {
				if (this.currentPage < this.lastPage) {
					this.currentPage += 1;
					this.getlist();
				}
			},
			// 路由跳转
			jump(path,parmas){
				this.$u.route({
					url: path,
					params: parmas
				});
			},
			//提现
			withdrawal(){
				if(this.userInfo.now_money==0){
					this.$u.toast("没有余额，暂时无法提现");
					return false;
				}
				this.$u.route("pages/library/user/revenue/withdrawal");
			}
		},
		onLoad(){
			this.getlist();
		},
		// 下拉刷新
		onPullDownRefresh() {
			this.type = "";
			this.list = [];
			this.currentPage = 1;
			this.lastPage = 1;
			this.getlist();
			uni.stopPullDownRefresh();
		},
		// 上拉加载
		onReachBottom(){
			this.loadMore();
		}
	}
</script>

<style lang="scss" scoped>
	@import "common/css/list.scss";
	.balance_wrap{
		padding:26rpx 20rpx;
		.balancebox{
			height: 174rpx;
			padding:0 26rpx 0 40rpx;
			background-color: #ff6929;
			border-radius: 10rpx;
			.small{
				font-size: 24rpx;
				color:rgba(255,255,255,0.8);
				margin-bottom: 16rpx;
			}
			.num{
				font-size: 42rpx;
				color: #ffffff;
				font-weight: bold;
			}
			.txbtn{
				width: 170rpx;
				height: 70rpx;
				line-height: 70rpx;
				text-align: center;
				font-size: 24rpx;
				color: #333333;
				font-weight: bold;
				background: #ffffff;
				border-radius: 35rpx;
			}
		}
	}
</style>
