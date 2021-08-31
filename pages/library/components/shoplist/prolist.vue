<template>
	<view class="prolist hot">
		<view class="proitem u-flex u-col-top" v-for="(item,index) in list" :key="index" @click="eventClick(item.id)">
			<view class="picwrap">
				<u-image :src="item.image" width="100%" height="100%" border-radius="12"></u-image>
			</view>
			<view class="info u-flex-1">
				<view class="tits">
					<view class="tag">{{item.people}}人团</view>
					<text class="title">{{item.name}}</text>
				</view>
				<view class="sale_price u-flex u-col-top u-row-between">
					<text class="small">¥{{item.ot_price}}</text>
					<view class="txt u-flex-col u-col-center u-row-center">
						<text>直降</text>
						<text>¥{{Sprice(item.ot_price,item.price)}}</text>
					</view>
					<text class="small">¥{{item.ot_price}}</text>
				</view>
				<view class="pricebox u-flex u-row-center">
					<text>拼团价</text>
					<text class="price">¥{{item.price}}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		props:{
			list:{
				type:Array,
				default: () => []
			}
		},
		computed:{
			Sprice(){
				return function(oprice,price){
					return parseFloat(oprice) - parseFloat(price);
				}
			}
		},
		methods:{
			eventClick(id){
				this.$emit("eventClick",id);
			}
		}
	}
</script>

<style lang="scss" scoped>
	.prolist{
		padding:30rpx 34rpx;
		position: relative;
		.proitem{
			background-color: #ffffff;
			border-radius: 20rpx;
			box-shadow: 0rpx 6rpx 20rpx 0rpx rgba(0,0,0,0.05);
			padding:26rpx 36rpx 26rpx 28rpx;
			margin-bottom: 20rpx;
			position: relative;
			z-index: 50;
			.picwrap{
				width: 222rpx;
				height: 222rpx;
			}
			.info{
				margin-left: 26rpx;
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
					clor:#000000;
				}
				.sale_price{
					padding-top: 20rpx;
					margin-left: 20rpx;
					font-size: 20rpx;
					color:#999999;
					background:url(/static/images/activity/pbg.png) no-repeat center bottom;
					background-size: 100%;
					.small{
						line-height: 38rpx;
					}
					.txt{
						font-size: 20rpx;
						color: #000000;
						margin-bottom: 8rpx;
						width: 100rpx;
						height: 71rpx;
						background:url(/static/images/activity/down.png) no-repeat;
						background-size: 100%;
					}
				}
				.pricebox{
					font-size: 20rpx;
					color:#999999;
					margin-top: 17rpx;
					.price{
						margin-left: 10rpx;
						font-size: 24rpx;
						color:#000000;
						font-weight: bold;
					}
				}
			}
		}
		&.hot{
			.proitem{
				.picwrap{
					width: 258rpx;
					height: 258rpx;
				}
				.sale_price{
					padding-top: 30rpx;
				}
				.pricebox{
					font-size: 24rpx;
					margin-top: 32rpx;
					.price{
						font-size: 32rpx;
					}
				}
			}
		}
	}
</style>
