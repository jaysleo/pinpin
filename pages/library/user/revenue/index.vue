<template>
	<view class="revenue_wrap">
		<view class="balancebox">
			<view class="hd u-flex">
				<view class="u-flex-1">
					<view class="u-flex" @click="jump('pages/library/user/revenue/balance')">
						<text class="small">账户余额</text>
						<u-icon name="arrow-right" size="21" color="#959595" class="icon"></u-icon>
					</view>
					<text class="balance">{{info.now_money||0}}</text>
				</view>
				<button class="u-reset-button txbtn" @click="withdrawal">提现</button>
			</view>
			<view class="ft u-flex">
				<view class="item u-flex-col u-flex-1">
					<text class="small">已到账</text>
					<text class="txt">{{info.had_income||0}}</text>
				</view>
				<view class="item u-flex-col u-flex-1">
					<text class="small">待到账</text>
					<text class="txt">{{info.wait_income||0}}</text>
				</view>
				<view class="item u-flex-col u-flex-1">
					<text class="small">累计收益</text>
					<text class="txt">{{info.brokerage_price||0}}</text>
				</view>
			</view>
		</view>
		<view class="numbox u-flex u-flex-wrap">
			<view class="item">
				<text class="small">今日预估</text>
				<text>{{info.today_brokerage||0}}</text>
			</view>
			<view class="item">
				<text class="small">昨日预估</text>
				<text>{{info.yesterday_brokerage||0}}</text>
			</view>
			<view class="item none">
				<text class="small">本月预估</text>
				<text>{{info.month_brokerage||0}}</text>
			</view>
			<view class="item none">
				<text class="small">上月预估</text>
				<text>{{info.last_month_brokerage||0}}</text>
			</view>
		</view>
		<view class="ptbox u-flex-col u-row-center" @click="goPink">
			<view class="tit u-flex">
				<text>查看拼团数据</text>
				<u-icon name="arrow-right" size="21" color="#ffffff" class="icon"></u-icon>
			</view>
			<text>拼团数据尽在掌握</text>
		</view>
		<view class="balan_listbox">
			<view class="balantit">收益记录</view>
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
							<text class="name">+{{item.number}}</text>
							<text class="status">待结算</text>
						</view>
					</view>
				</block>
				<view class="emptybox u-flex-col u-col-center u-row-center" v-else>
					<u-image src="/static/images/common/nodata.png" width="110" height="122"></u-image>
					<text class="txt">暂无记录</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				info:{},
				cur:0,
				list:[],
				tablist:[
					{
						type:"today",
						name:"今日"
					},
					{
						type:"yesterday",
						name:"昨日"
					},
					{
						type:"-7",
						name:"近7日"
					},
					{
						type:"month",
						name:"本月"
					},
					{
						type:"year",
						name:"今年"
					}
				],
				type:"today"
			}
		},
		methods:{
			//拼团数据
			goPink(){
				this.$u.route("pages/library/user/revenue/list");
			},
			//切换
			tab(index,type){
				this.cur = index;
				this.list = [];
				this.type = type;
				this.getEarlist();
			},
			init(){
				uni.showLoading({
					title: '加载中...',
					mask: true
				});
				return Promise.all([this.getEars(),this.getEarlist()]).then(() => {
					uni.hideLoading();
				}).catch((res)=>{
					console.log(res)
				});
			},
			getEars(){
				this.$http.getEaring().then((res)=>{
					this.info = res.data;
				})
			},
			getEarlist(){
				this.$http.getEarlist(this.type).then((res)=>{
					this.list = res.data.data;
				})
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
			this.init();
		}
	}
</script>

<style lang="scss" scoped>
	@import "common/css/list.scss";
	.revenue_wrap{
		padding:26rpx 20rpx;
		.balancebox{
			background-color: #2a2a2a;
			border-radius: 10rpx;
			width: 100%;
			height: 292rpx;
			.small{
				font-size: 24rpx;
				color:rgba(255,255,255,0.8);
			}
			.hd{
				padding:44rpx 26rpx 36rpx 40rpx;
				.balance{
					font-size: 42rpx;
					color:#FFFFFF;
					font-weight: bold;
				}
				.icon{
					margin-left: 10rpx;
				}
				.txbtn{
					width: 170rpx;
					height: 70rpx;
					line-height: 70rpx;
					text-align: center;
					font-size: 24rpx;
					color: #FFFFFF;
					font-weight: bold;
					background-color: #737373;
					border-radius: 35rpx;
				}
			}
			.ft{
				width: 100%;
				height: 120rpx;
				padding-top:20rpx;
				background-color: #353535;
				.item{
					position: relative;
					padding-left: 40rpx;
					&::before{
						content: "";
						width: 2rpx;
						height: 30rpx;
						background-color: #5d5d5d;
						position: absolute;
						top:35rpx;
						right: 0;
					}
					&:last-child{
						&::before{
							content: none;
						}
					}
				}
				.small{
					margin-bottom: 14rpx;
				}
				.txt{
					font-size: 32rpx;
					color:#ffffff;
					font-weight: bold;
				}
			}
		}
		.numbox{
			margin-top: 20rpx;
			padding:20rpx 40rpx;
			background-color: #ffffff;
			border-radius: 10rpx;
			box-shadow: 0rpx 6rpx 20rpx 0rpx rgba(0,0,0,0.05);
			position: relative;
			&::before{
				content:"";
				width:636rpx;
				height: 1rpx;
				background:#f6f6f6;
				position: absolute;
				top:50%;
				left:40rpx;
				z-index: 19;
				transform: translateY(-50%);
			}
			&::after{
				content:"";
				width: 1rpx;
				height: 230rpx;
				background:#f6f6f6;
				position: absolute;
				top:20rpx;
				left: 50%;
				z-index: 20;
				transform: translateX(-50%);
			}
			.item{
				display: flex;
				flex-direction: column;
				width: 50%;
				padding:10rpx 0 20rpx 0;
				font-size: 28rpx;
				color:#333333;
				.small{
					font-size: 20rpx;
					color:#999999;
					margin-bottom: 20rpx;
				}
				&.none{
					padding-top:35rpx;
				}
				&:nth-child(2n){
					padding-left: 40rpx;
				}
			}
		}
		.ptbox{
			width: 710rpx;
			height: 132rpx;
			margin-top: 20rpx;
			padding-left: 58rpx;
			background: url(/static/images/activity/ptsjubg.png) no-repeat;
			background-size: 100% 100%;
			background-color: #135ae4;
			border-radius: 66rpx;
			font-size: 24rpx;
			color:rgba(255,255,255,0.8);
			.tit{
				font-size: 28rpx;
				color:#ffffff;
				font-weight: bold;
			}
		}
	}
</style>
