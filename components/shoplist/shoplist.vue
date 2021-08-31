<template>
	<view class="qglist">
		<view class="item" v-for="(item,index) in list" :key="index">
			<view class="hd">
				<view class="u-flex-1">
					<count-down :start="item.start_time" :end="item.stop_time"></count-down>
				</view>
				<view class="right" @click="goShop(item)">进入会场</view>
			</view>
			<view class="bd">
				<view class="shopinfo">
					<u-image :src="item.pic" width="90" height="90" border-radius="45"></u-image>
					<view class="shopinfo_name">
						<view class="txt">{{item.name}}</view>
						<view class="tag">
							<text class="itag orange" v-if="item.min_discount>0">低至{{item.min_discount}}折</text>
							<text class="itag orange" v-if="item.total_num>0">{{item.total_num||0}}个单品</text>
						</view>
					</view>
				</view>
				<view class="prolist">
					<view class="items" v-for="(pitem,dindex) in item.product" :key="pitem.id" @click="goDetail(item,dindex)">
						<view class="picwrap">
							<u-image :src="pitem.image" width="196" height="196"></u-image>
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
		</view>
	</view>
</template>

<script>
	import countDown from "../count-down/count-down.vue";
	export default{
		props:{
			list:{
				type: Array,
				default: () => []
			}
		},
		components:{
			countDown
		},
		data(){
			return{
				timeRtitle: '',
				timer:0
			}
		},
		methods:{
			// 计算倒计时
			getTime() {
				let nowTime = parseInt(new Date().getTime()/1000);
				this.list.forEach((item,index)=>{
					let starttime = item.start_time;
					let endtime = item.stop_time;
					// 当前时间小于开始时间，未开始
					if (nowTime < starttime) {
						this.timeRtitle = '距本场开始';
						this.timer = starttime - nowTime;
					}
					// 当前时间大于开始时间，小于结束时间，进行中
					if (nowTime > starttime && nowTime < endtime) {
						this.timeRtitle = '距本场结束';
						this.timer = endtime - nowTime;
					}
					// 当前时间大于结束时间，已结束
					if (nowTime > endtime) {
						this.timeRtitle = '已结束';
						this.timer = 0;
					}
					this.$set(this.list[index], 'time', this.timer);
				})
			},
			goDetail(data,index){
				this.$emit("goDetail",data.product[index].id);
				this.$store.commit("setDetail",data.product[index]);
			},
			goShop(data){
				this.$emit("goShop",data.id);
				this.$store.commit("sethclist",data);
			}
		}
	}
</script>

<style lang="scss" scoped>
	.qglist{
		margin:0 32rpx;
		.item{
			background:#FFFFFF;
			border-radius: 24rpx;
			box-shadow: 0rpx 6rpx 20rpx 0rpx rgba(0,0,0,0.05);
			margin-bottom: 20rpx;
			.hd{
				border-bottom: 4rpx #FAFBFF solid;
				display: flex;
				align-items: center;
				height: 122rpx;
				.right{
					width:158rpx;
					height: 58rpx;
					line-height: 58rpx;
					text-align: center;
					font-size: 24rpx;
					color:#FFFFFF;
					background-image: linear-gradient(to right,#ffb106,#ff7522);
					border-radius:29rpx 0 0 29rpx;
				}
			}
			.bd{
				padding:0 30rpx 34rpx;
				display: flex;
				flex-direction: column;
				.shopinfo{
					margin:30rpx 0;
					display: flex;
					align-items: center;
					.shopinfo_name{
						margin-left: 20rpx;
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
								&:nth-child(2n){
									background: rgba(255,180,5,0.10);
									color:#FFB405;
								}
							}
							.orange{
								background: rgba(255,105,41,0.10);
								color:#FF6929;
							}
						}
					}
				}
				.prolist{
					display: flex;
					overflow: hidden;
					.items{
						width:196rpx;
						display: flex;
						align-items: center;
						flex-direction: column;
						margin-right:16rpx;
						.picwrap{
							position: relative;
							width:196rpx;
							height: 196rpx;
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
								bottom:22rpx;
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
								font-weight: normal;
								text-decoration: line-through;
							}
						}
						&:last-child{
							margin-right: 0;
						}
					}
				}
			}
		}
	}
</style>
