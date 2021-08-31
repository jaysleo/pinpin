<template>
	<view class="express_wrap">
		<view class="hd u-flex">
			<view class="u-flex u-flex-1">
				<text>中通快递</text>
				<text class="number">202391729390123</text>
			</view>
			<view class="icopy">复制</view>
		</view>
		<view class="content u-flex-col">
			<view class="item finish">
				<view class="dot"></view>
				<view class="right u-flex-col">
					<view class="text">[已签收]丰巢自提柜已取件</view>
					<text class="time">2021-5-26 12:45:20</text>
				</view>
			</view>
			<view class="item">
				<view class="dot"></view>
				<view class="right u-flex-col">
					<view class="text">快件已被揽收</view>
					<text class="time">2021-5-26 12:45:20</text>
				</view>
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
	.express_wrap{
		padding:20rpx 40rpx;
		.hd{
			height: 82rpx;
			background: #ff6929;
			border-radius: 20rpx 20rpx 0 0;
			padding: 0 24rpx;
			font-size: 24rpx;
			color:#ffffff;
			font-weight: bold;
			.number{
				margin-left: 12rpx;
			}
		}
		.content{
			background: #ffffff;
			border-radius: 0 0 20rpx 20rpx;
			padding: 28rpx 24rpx;
			.item{
				display: flex;
				padding-bottom: 50rpx;
				position: relative;
				&::before {
					content: '';
				    position: absolute;
				    left: 4rpx;
				    top: 22rpx;
					width: 2rpx;
					height: 100%;
					background:#ebebeb;
				}
				.dot{
					width: 10rpx;
					height: 10rpx;
					background: #cccccc;
					border-radius: 6rpx;
					margin-top: 12rpx;
				}
				.text{
					font-size: 24rpx;
					color:#333333;
					margin-bottom: 8rpx;
				}
				.time{
					font-size: 20rpx;
					color: #cccccc;
				}
				.right{
					padding-left: 32rpx;
				}
				&.finish{
					.dot{
						background: #ff6929;
					}
					.text{
						color: #ff6929;
					}
				}
				&:last-child{
					padding-bottom: 0;
					&::before{
						content:none;
					}
				}
			}
		}
	}
</style>
