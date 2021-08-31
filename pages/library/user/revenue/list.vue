<template>
	<view class="container">
		<view class="balancebox u-flex-col">
			<text class="small">个人拼团收益</text>
			<text class="num">{{info.brokerage_price}}</text>
		</view>
		<view class="dinfo">
			<view class="baprice u-flex">
				<view class="item u-flex-col u-flex-1">
					<text class="small">累计支付金额</text>
					<text>{{info.total_pay_price}}</text>
				</view>
				<view class="item u-flex-col u-flex-1">
					<text class="small">累计奖励金额</text>
					<text>{{info.total_income_price}}</text>
				</view>
			</view>
			<u-gap height="40"></u-gap>
			<view class="infobox" v-for="(item,index) in info.list" :key="index">
				<view class="tit">{{item.title}}</view>
				<view class="hd u-flex">
					<view class="item u-flex-col u-flex-1">
						<text class="small">拼团次数</text>
						<text>{{item.count}}</text>
					</view>
					<view class="item u-flex-col u-flex-1">
						<text class="small">拼中次数</text>
						<text>{{item.reward_count}}</text>
					</view>
					<view class="item u-flex-col u-flex-1">
						<text class="small">支付金额</text>
						<text>¥{{item.pay_price}}</text>
					</view>
				</view>
				<view class="hd u-flex">
					<view class="item u-flex-col u-flex-1">
						<text class="small">红包金额</text>
						<text>¥{{item.red_bag_price}}</text>
					</view>
					<view class="item u-flex-col u-flex-1">
						<text class="small">开团奖励</text>
						<text>¥{{item.pintuan_open}}</text>
					</view>
					<view class="item u-flex-col u-flex-1">
						<text class="small">寄售收益</text>
						<text>¥{{item.sell_price}}</text>
					</view>
				</view>
			</view>
			<!-- <view class="infobox">
				<view class="tit">新人专享</view>
				<view class="hd u-flex">
					<view class="item u-flex-col u-flex-1">
						<text class="small">拼团次数</text>
						<text>23</text>
					</view>
					<view class="item u-flex-col u-flex-1">
						<text class="small">拼中次数</text>
						<text>5</text>
					</view>
					<view class="item u-flex-col u-flex-1">
						<text class="small">支付金额</text>
						<text>¥391.23</text>
					</view>
				</view>
				<view class="hd u-flex">
					<view class="item u-flex-col u-flex-1">
						<text class="small">红包金额</text>
						<text>¥12.21</text>
					</view>
					<view class="item u-flex-col u-flex-1">
						<text class="small">开团奖励</text>
						<text>¥1.23</text>
					</view>
					<view class="item u-flex-col u-flex-1">
						<text class="small">寄售收益</text>
						<text>¥302.27</text>
					</view>
				</view>
			</view>
			<view class="infobox">
				<view class="tit">超值好物</view>
				<view class="hd u-flex">
					<view class="item u-flex-col u-flex-1">
						<text class="small">拼团次数</text>
						<text>23</text>
					</view>
					<view class="item u-flex-col u-flex-1">
						<text class="small">拼中次数</text>
						<text>5</text>
					</view>
					<view class="item u-flex-col u-flex-1">
						<text class="small">支付金额</text>
						<text>¥391.23</text>
					</view>
				</view>
				<view class="hd u-flex">
					<view class="item u-flex-col u-flex-1">
						<text class="small">红包金额</text>
						<text>¥12.21</text>
					</view>
					<view class="item u-flex-col u-flex-1">
						<text class="small">开团奖励</text>
						<text>¥1.23</text>
					</view>
					<view class="item u-flex-col u-flex-1">
						<text class="small">寄售收益</text>
						<text>¥302.27</text>
					</view>
				</view>
			</view> -->
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				info:{}
			}
		},
		methods:{
			loadData(){
				this.$http.getEardata().then((res)=>{
					this.info = res.data;
				})
			}
		},
		onLoad(){
			this.loadData();
		}
	}
</script>

<style lang="scss" scoped>
	@import "common/css/list.scss";
	.balancebox{
		height: 235rpx;
		padding:42rpx 0 0 60rpx;
		background-color: #ff6929;
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
	}
	.dinfo{
		padding:20rpx;
		.baprice{
			height: 136rpx;
			padding:24rpx 40rpx;
			margin-top:-68rpx;
			background-color: #ffffff;
			border-radius: 10rpx;
			font-size: 28rpx;
			color:#333333;
			.small{
				font-size: 20rpx;
				color: #999999;
				margin-bottom: 20rpx;
			}
			.item{
				border-right:2rpx #f5f5f5 dashed;
				&:last-child{
					padding-left: 40rpx;
					border-right: 0;
				}
			}
		}
		.infobox{
			margin-top: 20rpx;
			padding: 0 30rpx;
			background-color: #ffffff;
			border-radius: 10rpx;
			.tit{
				font-size: 28rpx;
				color:#000000;
				font-weight: bold;
				padding-top:30rpx;
				margin-bottom: 20rpx;
			}
			.hd{
				padding:30rpx 0;
				font-size: 28rpx;
				color: #333333;
				border-bottom:2rpx #f5f5f5 dashed;
				.small{
					font-size: 20rpx;
					color:#999999;
					margin-bottom: 20rpx;
				}
				.item{
					padding-left: 40rpx;
				}
				&:last-child{
					border-bottom: 0;
				}
			}
		}
	}
</style>
