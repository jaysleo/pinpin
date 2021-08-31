<template>
	<view class="shopcon">
		<view class="shopinfo">
			<u-image :src="list.pic" width="90" height="90"></u-image>
			<view class="shopinfo_name">
				<view class="txt">{{list.name}}</view>
				<view class="tag">
					<text class="itag orange" v-if="list.min_discount>0">低至{{list.min_discount||0}}折</text>
					<text class="itag yellow" v-if="list.total_num>0">{{list.total_num||0}}个单品</text>
				</view>
			</view>
			<view class="action" @click="goShop(list)">
				<text>进入会场</text>
				<u-icon name="arrow-right" size="20" color="#ff6929"></u-icon>
			</view>
		</view>
		<view class="prolist">
			<view class="items" v-for="pitem in list.product" :key="pitem.id" @click="goDetail(pitem)">
				<view class="picwrap">
					<u-image :src="pitem.image" width="210" height="210"></u-image>
					<view class="number">
						<u-icon name="/static/images/index/ico_huos.png" size="16" class="icon"></u-icon>
						<text>{{pitem.browse}}</text>
					</view>
				</view>
				<view class="text u-line-1">{{pitem.name}}</view>
				<view class="price">
					<text>¥{{pitem.price}}</text>
					<text class="old">¥{{pitem.ot_price}}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		props:{
			list:{
				type:Object,
				default: () => {}
			}
		},
		methods:{
			goShop(data){
				this.$emit("goShop",data.id);
				this.$store.commit("sethclist",data);
			},
			goDetail(data){
				this.$emit("goDetail",data.product_id);
				this.$store.commit("setDetail",data);
			}
		}
	}
</script>

<style lang="scss" scoped>
	.shopcon{
		padding:0 30rpx 38rpx;
		display: flex;
		flex-direction: column;
		background:#ffffff;
		.shopinfo{
			margin:30rpx 0;
			display: flex;
			align-items: center;
			margin-bottom: 20rpx;
			.shopinfo_name{
				margin-left: 20rpx;
				flex:1;
				.txt{
					font-size: 28rpx;
					color:#000000;
					font-weight: bold;
					margin-bottom: 20rpx;
				}
				.tag{
					display: flex;
					align-items: center;
					.itag{
						padding:0 12rpx;
						height: 28rpx;
						border-radius: 4rpx;
						font-size: 20rpx;
						margin-right: 10rpx;
					}
					.orange{
						background: rgba(255,105,41,0.10);
						color:#FF6929;
					}
					.yellow{
						background: rgba(255,180,5,0.10);
						color:#FFB405;
					}
				}
			}
			.action{
				font-size: 24rpx;
				color:#FF6929;
			}
		}
		.prolist{
			display: flex;
			.items{
				width:210rpx;
				display: flex;
				align-items: center;
				flex-direction: column;
				margin-right:16rpx;
				.picwrap{
					position: relative;
					width:210rpx;
					height: 210rpx;
					.number{
						padding:0 12rpx;
						height: 30rpx;
						background: #ff6929;
						border-radius: 0rpx 16rpx 16rpx 0rpx;
						font-size: 24rpx;
						color:#FFFFFF;
						display: flex;
						align-items: center;
						position: absolute;
						bottom:24rpx;
						left:0;
						z-index: 20;
						.icon{
							display: flex;
							margin-right:8rpx;
						}
					}
				}
				.text{
					margin:8rpx 0 20rpx 0;
					font-size: 24rpx;
					color: #000000;
					width: 100%;
					height: 34rpx;
				}
				.price{
					width: 100%;
					display: flex;
					align-items: center;
					font-size: 24rpx;
					color:#C90404;
					font-weight: bold;
					.old{
						color:#CCCCCC;
						margin-left: 10rpx;
					}
				}
				&:last-child{
					margin-right: 0;
				}
			}
		}
	}
</style>
