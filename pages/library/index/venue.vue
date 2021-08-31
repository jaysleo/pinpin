<template>
	<view class="container">
		<u-navbar v-if="tshow" title="特卖会场" title-color="#ffffff" back-icon-color="#ffffff" :background="{'backgroundColor':'#FF6929'}" :border-bottom="false"></u-navbar>
		<u-navbar v-if="bshow" title="特卖会场" title-color="#000000" back-icon-color="#000000" :background="{'backgroundColor':'#FFFFFF'}" :border-bottom="false"></u-navbar>
		<view class="vbg">
			<image src="/static/images/index/sbg.png" style="width: 100%;height: 315rpx;"></image>
		</view>
		<u-gap height="126"></u-gap>
		<view class="venue_wrap">
			<view class="infobox">
				<view class="contbox">
					<view class="avatar">
						<u-image :src="gdata.pic" width="100" height="100" border-radius="10"></u-image>
					</view>
					<view class="title">{{gdata.name}}</view>
					<view class="timebox">
						<text class="txt">{{timeRtitle}}</text>
						<u-count-down :timestamp="timer" separator-size="20" font-size="20" bg-color="#FF6929" color="#FFFFFF" height="36"></u-count-down>
					</view>
					<view class="desc" :class="{'show':isShow}">{{gdata.desc}}</view>
					<block v-if="desc.length>60">
						<view class="arrow" @click="isMore" v-if="isShow">
							<u-icon name="arrow-down-fill" size="12" color="#707071" class="icon"></u-icon>
							<text>展开</text>
						</view>
						<view class="arrow" @click="isMore" v-else>
							<u-icon name="arrow-up-fill" size="12" color="#707071" class="icon"></u-icon>
							<text>收起</text>
						</view>
					</block>
				</view>
			</view>
		</view>
		<u-sticky offset-top="120" bg-color="#fafbff" h5-nav-height="0">
			<view class="filter" :class="{'on':scrolltop>120}">
				<view class="txt" :class="{'on':cur==index}" v-for="(item,index) in filterlist" :key="index" @click="tabfilter(index,item)">
					<text>{{item.name}}</text>
					<u-icon name="/static/images/index/filetype.png" size="14" class="icon" v-if="index>0"></u-icon>
				</view>
			</view>
		</u-sticky>
		<view class="plist">
			<view class="item" v-for="pitem in list" :key="pitem.id" @click="goDetail(pitem.product_id)">
				<view class="picwrap">
					<u-image :src="pitem.image" width="100%" height="328"></u-image>
					<view class="sale" v-if="pitem.discount>0"></view>
				</view>
				<view class="titbox">
					<view class="title u-line-2">{{pitem.name}}</view>
					<view class="numberbox">
						<view class="salebox" v-if="pitem.discount>0">
							<text>{{pitem.discount}}折</text>
						</view>
						<view class="number">
							<u-icon name="/static/images/index/ico_huo2.png" size="16" class="icon"></u-icon>
							<text>{{pitem.browse}}</text>
						</view>
					</view>
					<view class="price">
						<text>¥{{pitem.price}}</text>
						<text class="old">¥{{pitem.ot_price}}</text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import { mapGetters } from 'vuex';
	export default{
		data(){
			return {
				//导航
				tshow:true,
				bshow:false,
				//展开收缩
				isShow:true,
				//倒计时
				timeRtitle: '',
				timer:0,
				scrolltop:0,
				gdata:{},
				list:[],
				currentPage: 1,
				lastPage: 1,
				field:"price",
				sort:"asc",
				fshow:false,
				cur:0, //选中
				filterlist:[
					{
						name:"综合",
						show:true
					},
					{
						name:"价格",
						show:true
					},
					{
						name:"折扣",
						show:true
					}
				]
			}
		},
		computed: {
			...mapGetters(["activity"])
		},
		methods:{
			// 计算倒计时
			getTimes() {
				let nowTime = parseInt(new Date().getTime()/1000);
				let starttime = this.activity.start_time;
				let endtime = this.activity.stop_time;
				// 当前时间小于开始时间，未开始
				if (nowTime < starttime) {
					this.timeRtitle = '距开始';
					this.timer = starttime - nowTime;
					return false;
				}
				// 当前时间大于开始时间，小于结束时间，进行中
				if (nowTime > starttime && nowTime < endtime) {
					this.timeRtitle = '距结束';
					this.timer = endtime - nowTime;
					return false;
				}
				// 当前时间大于结束时间，已结束
				if (nowTime > endtime) {
					this.timeRtitle = '已结束';
					this.timer = 0;
				}
			},
			isMore(){
				this.isShow = !this.isShow;
			},
			tabfilter(index,item){
				this.cur = index;
				if(index==1){
					item.show = !item.show;
					this.field = item.show?"discount":"price";
				}
				if(index==2){
					item.show = !item.show;
					this.sort = item.show?"desc":"asc";
				}
				this.list = [];
				this.currentPage = 1;
				this.lastPage = 1;
				this.getProlist();
			},
			getProlist(){
				this.$http.getActivityProlist(this.activity.id,this.field,this.sort,this.currentPage,10).then((res)=>{
					this.list = [...this.list, ...res.data.data];
					this.lastPage = res.data.last_page;
				})
			},
			goDetail(id){
				this.$u.route('pages/library/goods/detail',{id:id,type:0});
			},
			//加载更多
			loadMore() {
				if (this.currentPage < this.lastPage) {
					this.currentPage += 1;
					this.getProlist();
				}
			}
		},
		onLoad(){
			this.gdata = this.activity;
			this.getTimes();
			this.getProlist();
		},
		onPageScroll(e){
			this.scrolltop = e.scrollTop;
			if(this.scrolltop>240){
				this.bshow = true;
				this.tshow = false;
			}else{
				this.bshow = false;
				this.tshow = true;
			}
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
	.container{position: relative;}
	.vbg{
		width:100%;
		height: 315rpx;
		position: absolute;
		top:0;
		left:0;
		z-index: 20;
	}
	.venue_wrap{
		margin:-20rpx 30rpx 0;
		position: relative;
		z-index: 50;
		.infobox{
			width: 100%;
			height: 382rpx;
			background:#ffffff;
			border-radius: 20rpx;
			.contbox{
				margin:0 57rpx;
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				.avatar{
					width:90rpx;
					height: 90rpx;
					border-radius: 50%;
					background:#eeeeee;
					margin-top:-45rpx;
				}
				.title{
					font-size: 28rpx;
					color:#000000;
					font-weight: bold;
					margin:23rpx 0 16rpx 0;
				}
				.timebox{
					font-size: 20rpx;
					color:#000000;
					margin-bottom: 26rpx;
					.txt{
						margin-right: 10rpx;
					}
				}
				.desc{
					width: 100%;
					text-align: left;
					font-size: 20rpx;
					color:#707071;
					padding-top:20rpx;
					margin-bottom: 20rpx;
					border-top: 4rpx solid #fafbff;
					&.show{
						height: 77rpx;
						overflow: hidden;
					}
				}
				.arrow{
					width: 88rpx;
					height: 36rpx;
					background:#F7F8FF;
					border-radius: 36rpx;
					font-size: 20rpx;
					color:#707071;
					display: flex;
					align-items: center;
					justify-content: center;
					.icon{
						display: flex;
						margin-right: 8rpx;
					}
				}
			}
		}
	}
	.filter{
		margin:24rpx 30rpx 50rpx;
		display: flex;
		align-items: center;
		justify-content: flex-end;
		position: relative;
		z-index: 50;
		.txt{
			font-size: 24rpx;
			color:#999999;
			margin-right: 32rpx;
			display: flex;
			align-items: center;
			.icon{
				display: flex;
				margin-left: 10rpx;
			}
			&.on{
				color:#FF6929;
			}
		}
		&.on{
			width: 100%;
			height: 90rpx;
			background:#ffffff;
			margin:0;
		}
	}
	.plist{
		display: flex;
		flex-wrap: wrap;
		margin:0 30rpx;
		.item{
			width: 328rpx;
			display: flex;
			flex-direction: column;
			margin-bottom: 50rpx;
			margin-right: 22rpx;
			background: #ffffff;
			border-radius: 10rpx;
			box-shadow: 0rpx 0rpx 4rpx 0rpx rgba(0,0,0,0.16); 
			.picwrap{
				width:328rpx;
				height: 328rpx;
				position: relative;
				.sale{
					width: 84rpx;
					height: 74rpx;
					background:url(/static/images/index/sale.png) no-repeat;
					background-size: cover;
					position: absolute;
					right:18rpx;
					top:-32rpx;
					z-index: 20;
				}
			}
			.titbox{
				margin:16rpx 11rpx 14rpx 15rpx;
			}
			.title{
				margin-bottom:10rpx;
				height: 60rpx;
				font-size: 22rpx;
				color:#000000;
			}
			.numberbox{
				display: flex;
				align-items: center;
				margin-bottom:10rpx;
				.salebox{
					font-size: 20rpx;
					color:#FF6929;
					padding:0 14rpx;
					height: 36rpx;
					line-height: 36rpx;
					background: #FFEFE8;
					border-radius: 18rpx;
					box-shadow: 0rpx 0rpx 4rpx 0rpx rgba(0,0,0,0.16); 
					margin-right: 20rpx;
				}
				.number{
					display: flex;
					align-items: center;
					height: 36rpx;
					padding:0 10rpx;
					background: #fff7e4;
					border-radius: 18rpx;
					box-shadow: 0rpx 0rpx 4rpx 0rpx rgba(0,0,0,0.16);
					font-size: 20rpx;
					color:#FFB405;
					.icon{
						display: flex;
						margin-right:8rpx;
					}
				}
			}
			.price{
				display: flex;
				align-items: center;
				font-size: 28rpx;
				color:#000000;
				.old{
					font-size: 20rpx;
					color:#999999;
					margin-left: 20rpx;
					text-decoration:line-through;
				}
			}
			&:nth-child(2n){
				margin-right: 0;
			}
		}
	}
</style>
