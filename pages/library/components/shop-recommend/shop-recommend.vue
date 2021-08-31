<template>
	<view class="shop_recommend">
		<view class="title u-flex u-row-center" v-if="list.length">
			<u-icon name="/static/images/activity/love.png" size="34"></u-icon>
			<text class="txt">推荐商品</text>
		</view>
		<view class="plist u-flex u-flex-wrap">
			<view class="pitem u-flex-col" v-for="(item,index) in list" :key="index" @click="eventClick(item.id)">
				<view class="picwrap">
					<u-image :src="item.image" width="100%" height="100%"></u-image>
					<view class="sale">立省{{item.ot_price-item.price}}元</view>
				</view>
				<view class="titbox u-flex-col">
					<view class="titles u-line-2">{{item.name}}</view>
					<view class="u-flex">
						<view class="sale">{{item.people}}人成团</view>
					</view>
					<view class="pricebox u-flex">
						<text>¥{{item.price}}</text>
						<text class="sprice">¥{{item.ot_price}}</text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		props:{
			list:{
				type: Array,
				default: () => []
			}
		},
		data(){
			return{}
		},
		methods:{
			eventClick(id){
				this.$u.route('pages/library/goods/detail',{id:id,type:3});
			}
		}
	}
</script>

<style lang="scss" scoped>
	.shop_recommend{
		.title{
			padding:40rpx 0;
			.txt{
				font-size: 28rpx;
				color:#000000;
				margin-left: 20rpx;
			}
		}
		.plist{
			padding:0 36rpx;
			.pitem{
				background-color: #ffffff;
				border-radius: 12rpx;
				width: 324rpx;
				margin-right: 28rpx;
				margin-bottom: 28rpx;
				.picwrap{
					width: 324rpx;
					height: 324rpx;
					position: relative;
					.sale{
						background: url(/static/images/index/sales.png) no-repeat;
						background-size: 100% 100%;
						padding:0 20rpx;
						height: 47rpx;
						line-height: 40rpx;
						text-align: center;
						font-size: 20rpx;
						color:#FFFFFF;
						position: absolute;
						top:22rpx;
						right:22rpx;
						z-index: 20;
					}
				}
				.titbox{
					padding:16rpx 20rpx;
					font-size: 20rpx;
					.titles{
						color:#000000;
						margin-bottom: 16rpx;
					}
					.sale{
						display: inline-block;
						color:#FFFFFF;
						padding:0 12rpx;
						height: 28rpx;
						line-height: 28rpx;
						text-align: center;
						background: linear-gradient(to right, #ff7224,#ffa80a);
						border-radius: 4rpx;
					}
					.pricebox{
						font-size: 24rpx;
						color: #000000;
						margin-top: 20rpx;
						.sprice{
							font-size: 20rpx;
							color:#CCCCCC;
							margin-left: 20rpx;
							text-decoration: line-through;
						}
					}
				}
				&:nth-child(2n){
					margin-right: 0;
				}
			}
		}
	}
</style>
