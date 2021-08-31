<template>
	<view class="container">
		<u-navbar back-icon-size="34" back-icon-color="#2E2E2E" :title="backtext" title-color="#000000" font-size="34" :custom-back="onBack"></u-navbar>
		<view class="u-rela">
			<view class="bg">
				<image src="/static/images/activity/couplebg.jpeg" mode="aspectFill"></image>
			</view>
			<view class="couple_wrap">
				<view class="hd u-flex-col u-col-center">
					<u-image :lazy-load="false" :fade="false" src="/static/images/activity/coutit.png" width="660" height="72"></u-image>
					<view class="tipbg u-flex u-row-center">全场1分/包邮到家/参团领钱</view>
					<u-gap height="152"></u-gap>
					<view class="noticebox">
						<view class="icon">
							<image src="/static/images/activity/notice.png" mode="aspectFit" style="width: 24rpx;height: 22rpx;"></image>
						</view>
						<swiper class="swiperbox" :vertical="true" :circular="true" :autoplay="true">
							<swiper-item class="swiper_item" v-for="(item, index) in newsData" :key="index">
								{{item.title}}
							</swiper-item>
						</swiper>
						<u-icon name="/static/images/activity/icon_arrow.png" size="9" class="arrow"></u-icon>
					</view>
					<view class="hdlc">
						<u-image src="/static/images/activity/coulcbg.png" width="717" height="289"></u-image>
					</view>
				</view>
				<view class="titbox" v-if="list.length">
					<text class="title">新人福利购</text>
					<text class="small">参团可领现金红包</text>
				</view>
				<view class="coulist">
					<view class="couple_item u-flex u-col-top" v-for="(item,index) in list" :key="index">
						<view class="picwrap">
							<u-image :src="item.image" width="100%" height="100%" border-radius="12"></u-image>
							<u-icon name="/static/images/activity/hot.png" size="45" class="icon"></u-icon>
						</view>
						<view class="info u-flex-1">
							<view class="tits">
								<view class="tag">{{item.people}}人团</view>
								<text class="title">{{item.name}}</text>
							</view>
							<view class="foot u-flex">
								<view class="left u-flex-col u-flex-1">
									<u-icon name="/static/images/activity/msha.png" size="86"></u-icon>
									<text class="price">¥{{item.price}}</text>
								</view>
								<view class="right u-flex-col">
									<view class="num">已拼成{{item.sales}}人</view>
									<button class="u-reset-button btnbuy" @click="goDetail(item.id)">马上抢</button>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="newkt">
				<u-image src="/static/images/activity/kt.png" width="136" height="105"></u-image>
			</view>
			<u-modal v-model="mshow" title="温馨提示" :show-cancel-button="true" confirmText="继续拼团" cancelText="放弃" @confirm="onConfirm" @cancel="onConfirm">
				<view class="otips u-flex-col u-col-center">
					<view class="txt u-flex-col">
						<text class="light">新人首单仅需0.01元哦～</text>
						<text>确定放弃福利离开吗？</text>
					</view>
				</view>
			</u-modal>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				people:"25343",
				mshow:false,
				backtext:"",
				tbradge:0,
				type:2,
				newsData:[
					{
						id:1,
						title:"连**已领1.49现金红包，推荐你一起来哦～"
					},
					{
						id:2,
						title:"京**已领1.49现金红包，推荐你一起来哦～"
					}
				],
				list:[],
				currentPage: 1,
				lastPage: 1
			}
		},
		methods:{
			getpeople(index){
				return this.$u.random(21000, 353430*(index+1));
			},
			loadData(){
				this.$http.getProlist(this.type,this.currentPage,10).then((res)=>{
					this.list = [...this.list, ...res.data.data];
					this.lastPage = res.data.last_page;
				})
			},
			//产品详情
			goDetail(id){
				this.$u.route('pages/library/goods/detail',{id:id,type:2});
			},
			//加载更多
			loadMore() {
				if (this.currentPage < this.lastPage) {
					this.currentPage += 1;
					this.loadData();
				}
			},
			onConfirm(){
				this.mshow = false;
				this.tbradge = 1;
			},
			onBack(){
				if(this.type!=2){
					if(this.tbradge==0){
						this.mshow = true;
					}else{
						uni.navigateBack();
					}
				}else{
					uni.navigateBack();
				}
			}
		},
		onLoad(option){
			if(option.type){
				this.type = option.type;
			}
			this.backtext = option.type ? "新人专享" : "一分拼团";
			this.loadData();
			this.$u.mpShare = {
				title: this.backtext||'团小团',
				path: "/pages/library/activity/couple",
				imageUrl:"/static/images/index/iban.png"
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
	page{background: #852e2e;}
</style>
<style lang="scss" scoped>
	.bg{
		position: absolute;
		top:0;
		left:0;
		z-index: 20;
		width: 100%;
		image{
			width: 100%;
			height: 528rpx;
		}
	}
	.newkt{
		position: fixed;
		top:60%;
		right:0;
		z-index: 50;
	}
	.couple_wrap{
		position: relative;
		z-index: 50;
		.hd{
			padding-top: 66rpx;
			.tipbg{
				background:url(/static/images/activity/btnbg.png) no-repeat;
				background-size: cover;
				width: 544rpx;
				height: 82rpx;
				font-size: 32rpx;
				color:#C11415;
				margin-top:18rpx;
			}
			.noticebox{
				width: 680rpx;
				height: 54rpx;
				padding:0 30rpx;
				margin:0 36rpx 12rpx;
				background:rgba(0,0,0,0.4);
				border-radius: 27rpx;
				font-size: 24rpx;
				color:#FFFFFF;
				position: relative;
				display: flex;
				align-items: center;
				overflow: hidden;
				.icon{
					display: flex;
					margin-right: 28rpx;
				}
				.swiperbox{
					width: 100%;
					height: 54rpx;
					flex:1;
					overflow: hidden;
					.swiper_item{
						display: flex;
						align-items: center;
						width: 100%;
						height: 100%;
						text-overflow: ellipsis;
						overflow: hidden;
						white-space: nowrap;
					}
				}
				.arrow{
					display: flex;
				}
			}
		}
		.titbox{
			color:#ffffff;
			text-align: center;
			display: flex;
			flex-direction: column;
			width: 160rpx;
			margin:28rpx auto;
			position: relative;
			.title{
				font-size: 28rpx;
				border-bottom: 2rpx rgba(255,255,255,0.5) solid;
			}
			.small{
				font-size: 20rpx;
			}
			&::before,&::after{
				content: "";
				position: absolute;
				top:50%;
				transform: translateY(-50%);
				width: 21rpx;
				height: 19rpx;
				background: url(/static/images/activity/gift.png) no-repeat center;
				background-size: cover;
			}
			&::before{
				left:-50rpx;
			}
			&::after{
				right:-50rpx;
			}
		}
		.coulist{
			margin:0 35rpx;
			.couple_item{
				padding:22rpx 27rpx 22rpx;
				margin-bottom: 20rpx;
				border:2rpx #ffb405 solid;
				background-color: #ffffff;
				border-radius: 12rpx;
				.picwrap{
					width: 206rpx;
					height: 206rpx;
					position: relative;
					flex-shrink: 0;
					.icon{
						position: absolute;
						top:12rpx;
						left: 15rpx;
					}
				}
				.info{
					margin-left: 20rpx;
					.tits{
						height: 70rpx;
						overflow: hidden;
					}
					.tag{
						display: inline-block;
						margin-right: 10rpx;
						padding:0 12rpx;
						height: 28rpx;
						line-height: 28rpx;
						font-size: 20rpx;
						color:#FF5027;
						background-color: #ffede9;
						border-radius: 14rpx;
					}
					.title{
						font-size: 24rpx;
						color:#000000;
					}
					.foot{
						margin-top:20rpx;
						padding-top: 20rpx;
						border-top: 2rpx solid #f3e9e9;
						.price{
							font-size: 28rpx;
							color:#FF5027;
							font-weight: bold;
						}
						.num{
							font-size: 20rpx;
							color:#FF5027;
							margin-bottom: 10rpx;
							text-align: center;
						}
						.btnbuy{
							width: 140rpx;
							height: 44rpx;
							line-height: 44rpx;
							text-align: center;
							font-size: 22rpx;
							color:#852E2E;
							background: url(/static/images/activity/sbtnbg.png) no-repeat center;
							background-size: cover;
						}
					}
				}
			}
		}
	}
	.otips{
		font-size: 28rpx;
		color:#999999;
		padding:36rpx 0;
		.light{
			color:#C90404;
			margin-bottom: 14rpx;
		}
	}
</style>
