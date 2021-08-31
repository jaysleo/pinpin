<template>
	<view class="container">
		<view class="timebox u-flex u-col-top">
			<block v-if="status==1">
				<view class="u-flex u-flex-1">
					<u-icon name="clock" size="40" color="#ffffff" class="icon"></u-icon>
					<text>待支付</text>
				</view>
				<view class="time">{{timeText}}</view>
			</block>
			<block v-if="status==2">
				<view class="u-flex u-flex-1">
					<u-icon name="clock" size="40" color="#ffffff" class="icon"></u-icon>
					<text>待发货</text>
				</view>
			</block>
			<block v-if="status==3">
				<view class="u-flex u-flex-1">
					<u-icon name="clock" size="40" color="#ffffff" class="icon"></u-icon>
					<text>待收货</text>
				</view>
				<!-- <view class="time">2天4小时后将自动确认收货</view> -->
			</block>
			<block v-if="status==4">
				<view class="u-flex u-flex-1">
					<u-icon name="checkmark-circle" size="40" color="#ffffff" class="icon"></u-icon>
					<text>交易成功</text>
				</view>
			</block>
			<block v-if="status==5">
				<view class="u-flex u-flex-1">
					<u-icon name="close-circle" size="40" color="#ffffff" class="icon"></u-icon>
					<text>交易关闭</text>
				</view>
			</block>
		</view>
		<view class="address_box u-flex">
			<view class="left u-flex-1">
				<view class="top">
					<text>{{orderInfo.real_name}}</text>
					<text class="phone">{{orderInfo.user_phone}}</text>
				</view>
				<view class="u-flex">
					<view class="tag" v-if="orderInfo.is_default_address == 1">默认</view>
					<view class="address">{{orderInfo.user_address}}</view>
				</view>
			</view>
			<u-icon name="arrow-right" size="18" color="#999999"></u-icon>
		</view>
		<view class="infowrap">
			<view class="exress_box u-flex" v-if="status==3||status==4">
				<view class="u-flex-1">
					<view class="top">
						<text>{{orderInfo.delivery_name}}</text>
						<text class="phone">{{orderInfo.delivery_code}}</text>
					</view>
					<view class="desc">[{{expressData.status}}]{{expressData.desc}}</view>
				</view>
				<u-icon name="arrow-right" size="18" color="#999999"></u-icon>
			</view>
			<view class="oinfo">
				<view class="hd u-flex">
					<u-icon name="/static/images/common/slogo.png" size="28"></u-icon>
					<text class="name small">拼拼商城</text>
				</view>
				<view class="bd u-flex u-col-top">
					<u-image :src="orderInfo.info.product_detail.image" width="130" height="130" border-radius="10"></u-image>
					<view class="info u-flex-1">
						<view class="title u-line-1">{{orderInfo.info.product_detail.name}}</view>
						<view class="desc">{{orderInfo.info.product_detail.attr_info.suk}}</view>
						<view class="ft u-flex">
							<view class="u-flex u-flex-1">
								<text class="price">¥{{orderInfo.info.product_detail.price}}</text>
								<text class="sprice">¥{{orderInfo.info.product_detail.ot_price}}</text>
							</view>
							<text>x{{orderInfo.info.buy_num}}</text>
						</view>
					</view>
				</view>
				<view class="item u-flex">
					<view class="small u-flex-1">商品总价</view>
					<text>¥{{orderInfo.info.price}}</text>
				</view>
				<view class="item u-flex">
					<view class="small u-flex-1">配送方式</view>
					<text class="small">快递</text>
					<text>¥{{orderInfo.total_postage}}</text>
				</view>
				<view class="total u-flex u-row-right">
					<text>共{{orderInfo.total_num}}件</text>
					<text class="small">合计</text>
					<text class="bold">¥{{orderInfo.total_price}}</text>
				</view>
			</view>
			<view class="orderno u-flex-col">
				<view class="u-flex">
					<text class="small">订单编号：{{orderInfo.trade_no}}</text>
					<view class="icopy" @click="copyCode(orderInfo.trade_no)">复制</view>
				</view>
				<view class="time small">创建时间：{{orderInfo.add_time}}</view>
				<view class="time small" v-if="status==2 || status==3 || status==4">付款时间：{{orderInfo.pay_time}}</view>
				<view class="time small" v-if="status==3 || status==4">发货时间：{{orderInfo.delivery_time}}</view>
				<view class="time small" v-if="status==4">确认时间：{{orderInfo.confirm_time}}</view>
				<view class="time small" v-if="status==5">关闭时间：{{orderInfo.close_time}}</view>
			</view>
			<view class="servbox u-flex u-row-center" @click="contact">
				<u-icon name="server-fill" size="34" color="#666666" class="icon"></u-icon>
				<text>联系客服</text>
			</view>
		</view>
		<u-gap height="80"></u-gap>
		<view class="footbtn u-flex safe-area-inset-bottom">
			<view class="u-flex-1"></view>
			<view class="u-flex" v-if="status==1">
				<button class="u-reset-button toolbtn detail_btn" @click="cancelOrder">取消订单</button>
				<button class="u-reset-button toolbtn save_btn" :class="{'disabled':disabled}" :disabled="disabled" @click="goPay">去支付</button>
			</view>
			<view class="u-flex" v-if="status==2">
				<button class="u-reset-button toolbtn detail_btn" @click="refund">申请退款</button>
				<button class="u-reset-button toolbtn detail_btn">催发货</button>
				<button class="u-reset-button toolbtn save_btn" @click="againbuy">再次购买</button>
			</view>
			<view class="u-flex" v-if="status==3">
				<button class="u-reset-button toolbtn detail_btn" @click="goExpress">查看物流</button>
				<button class="u-reset-button toolbtn save_btn" @click="receipt">确认收货</button>
				<button class="u-reset-button toolbtn save_btn" @click="againbuy">再次购买</button>
			</view>
			<view class="u-flex" v-if="status==4">
				<button class="u-reset-button toolbtn detail_btn" @click="goExpress">查看物流</button>
				<button class="u-reset-button toolbtn save_btn" @click="againbuy">再次购买</button>
			</view>
			<view class="u-flex" v-if="status==5">
				<button class="u-reset-button toolbtn detail_btn" @click="delOrder">删除订单</button>
				<button class="u-reset-button toolbtn save_btn" @click="againbuy">再次购买</button>
			</view>
		</view>
		<u-modal v-model="show" :title="modtitle" :content="modcon" @confirm="confirm"></u-modal>
		<select-modal v-model="selshow" @cancel="onCancel"></select-modal>
	</view>
</template>

<script>
	import {mapGetters,mapState} from 'vuex';
	import selectModal from "../components/select-modal/select-modal.vue";
	export default{
		components:{
			selectModal
		},
		computed: {
			...mapGetters(["isLogin","orderInfo"])
		},
		data(){
			return{
				expressData:{
					name:"中通快递",
					number:"202391729390123",
					status:"运输中",
					desc:"快件离开深圳中转部已发往温州中转部"
				},
				status:1, //订单状态
				show:false, //收货弹框
				modtitle:"提示",
				modcon:"",
				cshow:false, //原因弹框
				timer:null,
				timeText:"",
				disabled:false, //是否支付
				bradge:0 //收货标记
			}
		},
		methods:{
			// 倒计时
			countDown() {
				let t = 300000 / 1000;
				this.timer = setInterval(() => {
					if (t > 0) {
						let time = this.$tools.format(t);
						this.timeText = `${time.m}:${time.s}`+"后未付款将关闭";
						t--;
					} else {
						clearInterval(this.timer);
						this.timeText = '订单已过期!';
						this.disabled = true;
					}
				}, 1000);
			},
			loadData(){
				this.status = this.orderInfo.status;
			},
			//复制
			copyCode(num){
				this.$tools.copyCode(num);
			},
			//退货
			refund(){
				if(this.orderInfo.info.buy_way==1){
					this.modcon = "该订单为拼团活动订单，如需售后服务，请咨询在线客服，谢谢！";
					this.show = true;
				}else{
					this.$store.commit("setrGoods",this.orderInfo);
					this.$u.route("pages/library/order/refund",{id:this.orderInfo.id});
				}
			},
			//收货
			receipt(){
				this.modtitle="确认收货";
				this.modcon = "是否已收到商品并确认收货？";
				this.show = true;
				this.bradge = 1;
			},
			confirm(){
				setTimeout(() => {
					this.show = false;
					if(this.bradge==1){
						this.$http.orderTake(this.orderInfo.id).then((res)=>{
							this.loadData();
						})
					}
				}, 1000)
			},
			//取消订单
			cancelOrder(){
				this.selshow = true;
			},
			onCancel(val){
				this.selshow = false;
				this.$http.cancelOrder(this.orderInfo.id,val).then((res)=>{
					this.$u.toast(res.msg)
				})
			},
			goPay(){
				uni.redirectTo({
					url:"/pages/library/payment/pay?no="+this.orderInfo.trade_no+"&price="+this.orderInfo.pay_price+"&mtype=1&type=order"
				})
			},
			//删除订单
			delOrder(){},
			//查看物流
			goExpress(){},
			//is_hot热门推荐 is_cheap一分拼团
			againbuy(){
				let id = this.orderInfo.id;
				let info = this.orderInfo.info.product_detail;
				if(info.is_cheap==1){
					this.$u.route("pages/library/goods/detail",{id:id,type:2});
					return;
				}
				if(info.is_hot==1){
					this.$u.route("pages/library/goods/detail",{id:id,type:3});
					return;
				}
				if(info.is_new_user==1){
					this.$u.route("pages/library/goods/detail",{id:id,type:4});
					return;
				}
				if(this.orderInfo.info.from!=""){
					this.$u.route("pages/library/goods/detail",{id:id,type:0});
				}else{
					this.$u.route("pages/library/goods/detail",{id:id,type:1});
				}
			},
			//联系客服
			contact(){
				this.$u.route("pages/library/service/index");
			}
		},
		onLoad(){
			this.loadData();
		},
		onShow(){
			this.countDown();
		},
		onHide(){
			clearInterval(this.timer);
			this.timer = null;
		}
	}
</script>

<style lang="scss" scoped>
	.timebox{
		width: 100%;
		height: 176rpx;
		padding: 40rpx 20rpx 0;
		background-color: #ff6929;
		font-size: 28rpx;
		color:#FFFFFF;
		.icon{
			margin-right: 16rpx;
		}
		.time{
			font-size: 24rpx;
		}
	}
	.address_box{
		background-color: #ffffff;
		border-radius: 10rpx;
		padding:30rpx;
		font-size: 24rpx;
		color:#000000;
		margin:-76rpx 20rpx 0;
		.top{
			font-weight: bold;
			margin-bottom: 12rpx;
			.phone{
				margin-left: 19rpx;
			}
		}
		.tag{
			width:48rpx;
			height: 24rpx;
			line-height: 24rpx;
			text-align: center;
			color:#ffffff;
			font-size: 16rpx;
			background:url(/static/images/common/tag.png) no-repeat;
			background-size: 100% 100%;
			margin-right: 6rpx;
		}
	}
	.exress_box{
		background-color: #ffffff;
		border-radius: 10rpx;
		padding:30rpx 22rpx;
		font-size: 28rpx;
		color:#333333;
		margin-top:20rpx;
		.top{
			font-weight: bold;
			margin-bottom: 16rpx;
			.phone{
				font-size: 24rpx;
				color:#999999;
				font-weight: normal;
				margin-left: 10rpx;
			}
		}
		.desc{
			color:#F27534;
		}
	}
	.infowrap{
		padding: 0 20rpx;
		.small{
			font-size: 20rpx;
			color:#333333;
		}
	}
	.oinfo{
		padding: 20rpx;
		background-color: #ffffff;
		border-radius: 10rpx;
		margin: 20rpx 0;
		.hd{
			.name{
				margin-left: 10rpx;
			}
		}
		.bd{
			padding-top: 20rpx;
			padding-bottom: 30rpx;
			.info{
				padding-left: 16rpx;
				overflow: hidden;
				.title{
					margin-bottom: 10rpx;
					font-size: 24rpx;
					color: #333333;
				}
				.desc{
					font-size: 20rpx;
					color:#999999;
				}
				.ft{
					margin-top: 30rpx;
					font-size: 20rpx;
					color:#999999;
					.price{
						font-size: 24rpx;
						color:#333333;
						margin-right: 18rpx;
					}
					.sprice{
						text-decoration: line-through;
					}
				}
			}
		}
		.item{
			margin-bottom: 22rpx;
			font-size: 24rpx;
			color:#333333;
		}
		.total{
			padding-top: 8rpx;
			font-size: 20rpx;
			color:#333333;
			.small{
				margin-left: 16rpx;
			}
			.bold{
				font-size: 24rpx;
				font-weight: bold;
			}
		}
	}
	.orderno{
		padding:20rpx;
		margin-bottom: 20rpx;
		background-color: #ffffff;
		border-radius: 10rpx;
		font-size: 20rpx;
		.time{
			margin-top: 20rpx;
		}
		.icopy{
			margin-left: 12rpx;
			color:#F27534;
		}
	}
	.servbox{
		font-size: 24rpx;
		color:#333333;
		height: 82rpx;
		background-color: #ffffff;
		border-radius: 10rpx;
		.icon{
			margin-right: 17rpx;
		}
	}
	.footbtn{
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		z-index: 50;
		width: 100%;
		padding: 0 20rpx;
		height: 80rpx;
		background: #ffffff;
		.toolbtn{
			width: 128rpx;
			height: 48rpx;
			line-height: 48rpx;
			text-align: center;
			font-size: 22rpx;
			margin-left: 12rpx;
			&.detail_btn{
				border: 1rpx solid #b2b2b2;
				color: #666666;
				border-radius: 25rpx;
			}
			&.save_btn{
				background: #ff6929;
				border-radius: 24rpx;
				color: #ffffff;
			}
			&.disabled{
				background: #cccccc;
				border-radius: 24rpx;
				color: #eeeeee;
			}
		}
	}
</style>
