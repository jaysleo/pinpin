<template>
	<view class="container">
		<view class="mlistwrap" v-if="list.length">
			<view class="mitem">
				<view class="hd u-flex">
					<text class="u-flex-1">打卡时间：2021-07-09 06:34:03</text>
					<text class="status">打卡成功</text>
				</view>
				<view class="bd u-flex">
					<view class="txt u-flex-1">获得2021-07-11期奖池</view>
					<view class="price">32元</view>
				</view>
				<view class="ft u-flex u-row-right">
					<text>累计打卡1期</text>
				</view>
			</view>
		</view>
		<view class="emptybox u-flex-col u-col-center u-row-center" v-else>
			<u-image src="/static/images/early/nodata.png" width="316" height="204"></u-image>
			<text class="tit">暂无记录</text>
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
				padding:30rpx 0;
				font-size: 28rpx;
				.txt{
					color:#000000;
				}
				.price{
					color:#FF6929;
					font-weight: bold;
				}
			}
			.ft{
				border-top: 2rpx solid #f5f5f5;
				padding:25rpx 0;
			}
		}
	}
	.emptybox{
		width: 100%;
		height: 624rpx;
		background-color: #ffffff;
		.tit{
			font-size: 28rpx;
			color: #999999;
			margin-top: 46rpx;
		}
	}
</style>
