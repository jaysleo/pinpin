<template>
	<view class="codebuy_wrap">
		<view class="hd">
			<view class="tip u-flex">提示：您正在购买绝版靓码，购买后可永久使用。</view>
			<view class="info">
				<view class="top u-flex">
					<text class="u-flex-1">购买靓码</text>
					<text>原价¥{{sprice}}</text>
				</view>
				<view class="u-flex">
					<view class="number u-flex u-flex-1">
						<u-icon name="/static/images/user/pretty.png" size="28" class="icon"></u-icon>
						<text>{{number}}</text>
					</view>
					<view class="sale">限时优惠-¥{{sale}}</view>
				</view>
				<view class="pricebox u-flex u-row-right">
					<text>支付金额</text>
					<view class="price">¥<text class="bold">{{price}}</text></view>
				</view>
			</view>
		</view>
		<view class="desc">
			<view class="tit bold">邀请码说明</view>
			<view class="con u-flex-col">
				<view class="bold">1.何为邀请码?</view>
				<view>拼拼有礼邀请码为一段5-6位的数字+字母组合的编码,可用于拉新推广。</view>
				<view class="bold">2.何时生效?</view>
				<view>邀请码自购买成功后,即时生效,原邀请码被收回。</view>
				<view class="bold">3.会影响我之前邀请到的好友关系绑定吗?</view>
				<view>原邀请关系好友不会被影响!</view>
				<view class="bold">4.有几次购买机会呢?</view>
				<view>不限次，只要您想买随时随地都可!</view>
				<view class="bold">5.注意事项</view>
				<view>请不要违规推广邀请码,否则官方有权禁用您的邀请码。</view>
			</view>
		</view>
		<u-gap height="140"></u-gap>
		<view class="ftbtn safe-area-inset-bottom">
			<button class="u-reset-button btn_primary" @click="goPay">立即抢购</button>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				id:0,
				number:"",
				sprice:"199.99",
				sale:"133.24",
				price:"66.6"
			}
		},
		methods:{
			goPay(){
				uni.redirectTo({
					url:"/pages/library/payment/pay?id="+this.id+"&price="+this.price+"&type=uniqid"
				})
			}
		},
		onLoad(option){
			this.id = option.id;
			this.number = option.number;
		}
	}
</script>

<style lang="scss" scoped>
	.codebuy_wrap{
		margin:16rpx 20rpx;
		.hd{
			height: 292rpx;
			background-color: #ffffff;
			.tip{
				padding:0 20rpx;
				height: 56rpx;
				background-color:#fef1ea;
				font-size: 20rpx;
				color:#F27534;
			}
			.info{
				padding:36rpx 32rpx 35rpx 42rpx;
				font-size: 20rpx;
				color:#666666;
				.top{
					margin-bottom: 14rpx;
				}
				.number{
					font-size: 40rpx;
					color:#F27534;
					.icon{
						display: flex;
						margin-right: 6rpx;
					}
				}
				.sale{
					padding:0 12rpx;
					height: 26rpx;
					line-height: 26rpx;
					background-color: #ffcc3a;
					border-radius: 26rpx;
					text-align: center;
					font-size: 16rpx;
					color:#333333;
				}
				.pricebox{
					border-top: 2rpx solid #f6f6f6;
					margin-top:27rpx;
					padding-top:25rpx;
					font-size: 24rpx;
					color:#999999;
					line-height: 34rpx;
					.price{
						margin-left: 10rpx;
						font-size: 30rpx;
						color:#333333;
						.bold{
							font-weight: bold;
						}
					}
				}
			}
		}
		.desc{
			background-color: #ffffff;
			font-size: 24rpx;
			color:#999999;
			margin-top:18rpx;
			padding:30rpx 40rpx;
			.tit{
				margin-bottom: 20rpx;
				font-size: 28rpx;
			}
			.bold{
				color:#333333;
				font-weight: bold;
			}
			.con{
				.bold{
					padding:10rpx 0;
				}
			}
		}
	}
</style>
