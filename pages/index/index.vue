<template>
	<view class="container">
		<view class="topwrap" :class="{'on':scrolltop>20}">
			<u-gap :height="stausht"></u-gap>
			<view class="topbox">
				<searchBox class="search_wrap" @eventClick="goSearch"></searchBox>
				<view class="innotice" @click="jump('/pages/library/notice/index',{},true)">
					<u-icon name="/static/images/index/icon_notice.png" size="37"></u-icon>
					<i class="badge"></i>
				</view>
			</view>
		</view>
		<view class="slider_wrap">
			<u-gap :height="gapht"></u-gap>
			<view class="tbg">
				<u-image :lazy-load="false" :fade="false" src="/static/images/index/bg.png" width="750" height="380"></u-image>
			</view>
			<view class="sliderbox">
				<u-swiper :list="list" height="320" border-radius="24" indicator-pos="bottomRight"></u-swiper>
			</view>
			<view class="menu">
				<view class="item" @click="jump('pages/library/activity/couple')">
					<view class="imgwrap">
						<u-icon name="/static/images/menu/icon_pt.png" size="64"></u-icon>
					</view>
					<text class="txt">一分拼团</text>
				</view>
				<view class="item" @click="jump('/pages/library/activity/spell')">
					<view class="imgwrap">
						<u-icon name="/static/images/menu/icon_ptyl.png" size="56"></u-icon>
					</view>
					<text class="txt">拼团有礼</text>
				</view>
				<view class="item member" @click="jump('pages/library/member/index',{},true)">
					<view class="u-flex">
						<u-icon name="/static/images/menu/icon_member.png" size="180"></u-icon>
					</view>
					<text class="txt">优享会员</text>
				</view>
				<view class="item" @click="jump('pages/library/early/index',{},true)">
					<view class="imgwrap">
						<u-icon name="/static/images/menu/icon_zqdk.png" size="51"></u-icon>
					</view>
					<text class="txt">早起打卡</text>
				</view>
				<view class="item" @click="jump('pages/library/activity/hotpink')">
					<view class="imgwrap">
						<u-icon name="/static/images/menu/icon_rmpt.png" size="53"></u-icon>
					</view>
					<text class="txt">热门拼团</text>
				</view>
			</view>
		</view>
		<view class="couple">
			<view class="bg">
				<u-image :lazy-load="false" :fade="false" src="/static/images/index/coubgs.png" height="264"></u-image>
			</view>
			<view class="tit">
				<u-icon name="/static/images/index/ico_huo.png" size="42"></u-icon>
				<view class="txt">
					<view class="big">
						<u-icon name="/static/images/index/xrtit.png" size="134"></u-icon>
					</view>
					<text class="small">0.01元超值秒杀</text>
				</view>
				<view class="more" @click="jump('pages/library/activity/couple',{type:4})">
					<text>更多福利</text>
					<u-icon name="arrow-right" size="16" color="#FFFFFF" class="icon"></u-icon>
				</view>
			</view>
			<view class="list">
				<view class="item" v-for="(item,index) in nlist" :key="index" @click="goNewpro(item)">
					<u-image :src="item.image" width="142" height="172"></u-image>
					<text class="price">¥{{item.price}}</text>
					<u-icon name="/static/images/index/new.png" size="34" class="icon"></u-icon>
				</view>
			</view>
		</view>
		<view class="hr"></view>
		<view class="newzx" v-for="item in xlist" :key="item.id" @click="goNewpro(item)">
			<view class="left">
				<view class="tit" v-if="!isNews">新人专享</view>
				<view class="tit" v-else>最新上架</view>
				<view class="protit u-line-1">{{item.name}}</view>
				<view class="price">
					<text>¥ {{item.price}}</text>
					<text class="status">{{getTimes(item.start_time,item.stop_time)}}</text>
				</view>
			</view>
			<view class="right">
				<u-image :src="item.image" width="186" height="202"></u-image>
			</view>
		</view>
		<view class="tabbox">
			<view class="item" :class="{'on':cur==index}" v-for="(item,index) in tablist" :key="index" @click="tab(index,item.id)">
				<view class="tit">
					<text>{{item.name}}</text>
					<text class="small">{{item.sname}}</text>
				</view>
			</view>
		</view>
		<block v-if="actlist.length">
			<shop-list :list="actlist" @goDetail="goDetail" @goShop="goShop"></shop-list>
		</block>
		<block v-else>
			<view class="emptybox u-flex u-row-center">暂无数据</view>
		</block>
		<u-gap height="110"></u-gap>
		<ntab-bar></ntab-bar>
	</view>
</template>

<script>
	import ntabBar from "@/components/tabbar/ntabbar.vue";
	import searchBox from '@/components/search-box/search-box.vue';
	import shopList from '@/components/shoplist/shoplist.vue';
	import {mapMutations,mapActions,mapGetters} from 'vuex';
	import {toLogin} from '@/utils/login';
	export default{
		components:{
			searchBox,
			shopList,
			ntabBar
		},
		computed: {
			...mapGetters(["isLogin","userInfo"])
		},
		data(){
			return{
				stausht:80,
				gapht:"",
				scrolltop:0,
				list: [],
				nlist:[], //新人
				xlist:[],
				cur:0,
				tablist:[
					{
						id:1,
						name:"最后疯抢",
						sname:"即将下架"
					},
					{
						id:2,
						name:"今日特卖",
						sname:"低价抢购"
					}
				],
				actlist:[],
				actid:1,
				currentPage: 1,
				lastPage: 1,
				isRefresh: true,
				isNews:true
			}
		},
		methods:{
			loadData(){
				this.isRefresh = false;
				return Promise.all([this.getBanner(),this.getActlist(),this.getProlist()]).then(() => {
					this.isNews = this.userInfo.is_new==0?true:false;
					this.isRefresh = true;
				}).catch((res)=>{
					console.log(res);
				});
			},
			getBanner(){
				this.$http.getBanner().then((res)=>{
					let lists = res.data;
					let nlist = [];
					lists.map((item)=>{
						nlist.push(item.url);
					})
					this.list = nlist;
				})
			},
			//获取产品
			getProlist(){
				// if(this.isNews==false){
				// 	this.$http.getProlist(5,1,4).then((res)=>{
				// 		this.nlist = res.data.data;
				// 		this.xlist = this.nlist.splice(0,1);
				// 	})
				// }
				//最新
				this.$http.getProlist(5,1,4).then((res)=>{
					this.xlist = res.data.data.splice(0,1);
				})
				//新人
				this.$http.getProlist(4,1,1).then((res)=>{
					this.nlist = res.data.data;
				})
			},
			// 计算倒计时
			getTimes(starttime,endtime) {
				let nowTime = parseInt(new Date().getTime()/1000);
				// 当前时间小于开始时间，未开始
				if (nowTime < starttime) {
					return "未开始";
				}
				// 当前时间大于开始时间，小于结束时间，进行中
				if (nowTime > starttime && nowTime < endtime) {
					return "拼团中";
				}
				// 当前时间大于结束时间，已结束
				if (nowTime > endtime) {
					return "已结束";
				}
			},
			//特卖切换
			tab(index,id){
				this.cur = index;
				this.actid = id;
				this.actlist = [];
				this.currentPage = 1;
				this.lastPage = 1;
				this.getActlist();
			},
			//会场
			getActlist(){
				this.$http.getActivity(this.actid,this.currentPage,10).then((res)=>{
					this.actlist = [...this.actlist, ...res.data.data];
					this.lastPage = res.data.last_page;
				})
			},
			//进入会场
			goShop(id){
				this.$u.route('pages/library/index/venue');
			},
			//产品详情
			goDetail(id){
				this.$u.route('pages/library/goods/detail',{id:id,type:0});
			},
			//最新上架
			goNewpro(data){
				this.$u.route('pages/library/goods/detail',{id:data.id,type:4});
				this.$store.commit("setDetail",data);
			},
			goSearch(){
				this.$u.route('pages/library/search/index');
			},
			//加载更多
			loadMore() {
				if (this.currentPage < this.lastPage) {
					this.currentPage += 1;
					this.getActlist();
				}
			},
			//路由跳转
			jump(path,parmas,loginCheck = false){
				if (loginCheck && !this.isLogin){
					uni.setStorageSync("backurl","/pages/index/index");
					toLogin();
					return false;
				}
				this.$u.route({
					url: path,
					params: parmas
				});
			}
		},
		onLoad(){
			let statusBarHeight = uni.getSystemInfoSync().statusBarHeight+44;
			this.stausht = statusBarHeight*2;
			this.gapht = this.stausht+98;
			this.loadData();
			this.$u.mpShare = {
				title: '团小团商城',
				path: '/pages/index/index',
				imageUrl:"/static/images/index/iban.png"
			}
		},
		onPageScroll(res){
			this.scrolltop = res.scrollTop;
		},
		// 下拉刷新
		onPullDownRefresh() {
			this.actlist = [];
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

<style lang="scss" scoped>
	.topwrap{
		position: fixed;
		top:0;
		left:0;
		width: 100%;
		z-index: 50;
		&.on{
			background:#FFB405;
		}
		.topbox{
			margin:8rpx 40rpx;
			display: flex;
			align-items: center;
			.search_wrap{
				flex:1;
			}
			.innotice{
				margin-left: 26rpx;
				position: relative;
				.badge{
					position: absolute;
					top:0;
					right: 0;
					width: 10rpx;
					height: 10rpx;
					background: #fe4444;
					border-radius: 4rpx;
				}
			}
		}
	}
	.slider_wrap{
		margin-bottom: 33rpx;
		position: relative;
		.tbg{
			position: absolute;
			top:0;
			left:0;
			width:100%;
		}
		.sliderbox{
			margin:0 40rpx;
			height: 320rpx;
		}
		.menu{
			width: 100%;
			display: flex;
			position: relative;
			z-index: 20;
			.item{
				width: 20%;
				display: flex;
				align-items: center;
				flex-direction: column;
				font-size: 24rpx;
				color:#707071;
				.imgwrap{
					width:64rpx;
					height: 64rpx;
					margin-top:29rpx;
					margin-bottom: 22rpx;
					display: flex;
					align-items: center;
				}
				&.member{
					margin-top:-70rpx;
				}
			}
		}
	}
	.couple{
		margin:0 24rpx;
		position: relative;
		.bg{
			position: absolute;
			top:0;
			left:0;
			width: 702rpx;
		}
		.tit{
			padding:35rpx 45rpx 26rpx 58rpx;
			display: flex;
			align-items: center;
			color:#ffffff;
			font-size: 22rpx;
			position: relative;
			.txt{
				flex:1;
				margin-left: 30rpx;
				display: flex;
				align-items: flex-end;
				.big{
					font-size: 36rpx;
					font-weight: bold;
					font-style: italic;
					display: flex;
					align-items: center;
				}
				.small{
					margin-left: 6rpx;
				}
			}
			.more{
				display: flex;
				align-items: center;
				.icon{
					margin-left: 9rpx;
				}
			}
		}
		.list{
			display: flex;
			margin:0 45rpx 22rpx;
			height: 230rpx;
			.item{
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;
				margin-right: 14rpx;
				position: relative;
				.price{
					font-size: 24rpx;
					color:#C90404;
					margin:14rpx 0 22rpx 0;
				}
				.icon{
					position: absolute;
					top:-5rpx;
					right: -10rpx;
					z-index: 20;
				}
			}
		}
	}
	.hr{
		margin:0 38rpx;
		height: 2rpx;
		background:#F4F4F4;
	}
	.newzx{
		margin:34rpx 33rpx 0;
		background: #ffffff;
		border-radius: 24rpx;
		box-shadow: 0rpx 6rpx 20rpx 0rpx rgba(0,0,0,0.05);
		display: flex;
		align-items: center;
		.left{
			width:420rpx;
			margin-left: 34rpx;
			.tit{
				font-size: 32rpx;
				color:#000000;
				font-weight: bold;
				margin-bottom: 20rpx;
			}
			.protit{
				font-size: 20rpx;
				color:#707071;
				height: 28rpx;
			}
			.price{
				font-size: 28rpx;
				color:#000000;
				font-weight: bold;
				.status{
					font-size: 24rpx;
					color:#C90404;
					margin-left: 10rpx;
					font-weight: normal;
				}
			}
		}
		.right{
			margin-top:-8rpx;
			margin-left: 38rpx;
		}
	}
	.tabbox{
		margin:0 60rpx;
		display: flex;
		justify-content: space-between;
		.item{
			width:307rpx;
			height: 152rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			.tit{
				margin-top:-16rpx;
				margin-left: 50rpx;
				display: flex;
				align-items: center;
				justify-content: center;
				flex-direction: column;
				width: 240rpx;
				height: 98rpx;
				font-size: 32rpx;
				color:#000000;
				font-weight: bold;
				.small{
					font-size: 20rpx;
					color:#707071;
					font-weight: normal;
				}
			}
			&.on{
				background: url(/static/images/index/tabsel.png) no-repeat;
				background-size: 100% 100%;
			}
		}
	}
	.emptybox{
		height: 300rpx;
		font-size: 24rpx;
	}
</style>
