<template>
	<view class="listwrap">
		<view class="item" v-for="(item,index) in list" :key="index">
			<view class="hd u-flex">
				<text class="u-flex-1">订单编号：798765674635546788905</text>
				<text class="status">交易成功</text>
			</view>
			<view class="bd u-flex u-col-top">
				<text class="u-flex-1">靓码：686868</text>
				<view class="price u-flex-col">
					<text>¥66.66</text>
					<text class="small">¥199.99</text>
				</view>
			</view>
			<view class="ft u-flex u-row-right">
				<text>2021-07-09 15:34:03</text>
			</view>
		</view>
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
	.listwrap{
		margin:15rpx;
		.item{
			background:#ffffff;
			border-radius: 22rpx;
			box-shadow: 0rpx 6rpx 20rpx 0rpx rgba(0,0,0,0.05);
			padding:0 40rpx;
			margin-bottom: 15rpx;
			font-size: 24rpx;
			color:#999999;
			.hd{
				padding:20rpx 0;
				border-bottom: 2rpx solid #f5f5f5;
				.status{
					color:#966900;
				}
			}
			.bd{
				padding:26rpx 0;
				font-size: 28rpx;
				color:#000000;
				.price{
					font-weight: bold;
					.small{
						font-size: 24rpx;
						color:#999999;
						font-weight: normal;
						text-decoration: line-through;
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
