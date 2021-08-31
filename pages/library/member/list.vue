<template>
	<view class="mlistwrap">
		<block v-if="list.length">
		<view class="mitem" v-for="(item,index) in list" :key="index">
			<view class="hd u-flex">
				<text class="u-flex-1">订单编号：798765674635546788905</text>
				<text class="status">交易成功</text>
			</view>
			<view class="bd u-flex-col">
				<view class="u-flex u-col-top">
					<view class="u-flex u-flex-1">
						<u-icon name="/static/images/user/jpmem.png" size="48"></u-icon>
						<text class="txt">优享会员-月卡</text>
					</view>
					<view class="price u-flex-col u-text-right">
						<text>¥59.9</text>
						<text class="small">¥99.9</text>
					</view>
				</view>
				<view class="timebox u-flex-col">
					<text class="num">有效期至：2021-08-09 15:35:03</text>
					<text>开通时间：2021-07-09 15:35:03</text>
				</view>
			</view>
			<view class="ft u-flex u-row-right">
				<text>2021-07-09 15:34:03</text>
			</view>
		</view>
		<view class="mitem">
			<view class="hd u-flex">
				<text class="u-flex-1">订单编号：798765674635546788905</text>
				<text>交易关闭</text>
			</view>
			<view class="bd u-flex-col">
				<view class="u-flex u-col-top">
					<view class="u-flex u-flex-1">
						<u-icon name="/static/images/user/ypmem.png" size="48"></u-icon>
						<text class="txt">优享会员-月卡</text>
					</view>
					<view class="price u-flex-col u-text-right">
						<text>¥59.9</text>
						<text class="small">¥99.9</text>
					</view>
				</view>
				<view class="timebox u-flex-col">
					<text class="num">有效期至：2021-08-09 15:35:03</text>
					<text>开通时间：2021-07-09 15:35:03</text>
				</view>
			</view>
			<view class="ft u-flex u-row-right">
				<text>2021-07-09 15:34:03</text>
			</view>
		</view>
		</block>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				list:[]
			}
		}
	}
</script>

<style lang="scss" scoped>
	.mlistwrap{
		padding:10rpx 15rpx;
		.mitem{
			background:#ffffff;
			border-radius: 22rpx;
			box-shadow: 0rpx 6rpx 20rpx 0rpx rgba(0,0,0,0.05);
			padding:0 40rpx;
			font-size: 24rpx;
			color:#999999;
			margin-bottom: 10rpx;
			.hd{
				padding:20rpx 0;
				border-bottom: 2rpx solid #f5f5f5;
				.status{
					color:#966900;
				}
			}
			.bd{
				padding:26rpx 0;
				.txt{
					font-size: 28rpx;
					color:#000000;
					margin-left: 20rpx;
				}
				.price{
					font-size: 28rpx;
					color:#000000;
					font-weight: bold;
					.small{
						font-size: 24rpx;
						color:#999999;
						font-weight: normal;
						text-decoration: line-through;
					}
				}
				.timebox{
					margin-top:47rpx;
					.num{
						margin-bottom: 10rpx;
					}
				}
			}
			.ft{
				border-top: 2rpx solid #f5f5f5;
				padding:25rpx 0;
			}
		}
	}
</style>
