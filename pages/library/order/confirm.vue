<template>
	<view class="container">
		<u-navbar back-icon-size="34" back-icon-color="#2E2E2E" title="确认订单" title-color="#000000" font-size="34" :custom-back="onBack"></u-navbar>
		<view class="order_wrap">
			<view @click="jump('pages/library/user/address/index?from=order')">
				<view class="u-flex" v-if="!addressId">
					<button class="u-reset-button select_notice">新建收货地址</button>
				</view>
				<view class="address_box u-flex" v-else>
					<view class="left u-flex-1">
						<view class="top">
							<text>{{addressData.real_name}}</text>
							<text class="phone">{{addressData.phone}}</text>
						</view>
						<view class="u-flex">
							<view class="tag" v-if="addressData.is_default == 1">默认</view>
							<view class="address">{{addressData.province}}{{addressData.city}}{{addressData.area}}{{addressData.detail}}</view>
						</view>
					</view>
					<u-icon name="arrow-right" size="18" color="#999999"></u-icon>
				</view>
			</view>
			<block v-if="type=='order'">
			<view class="goodslist">
				<view class="item u-flex-col">
					<view class="hd u-flex">
						<view class="tag">团</view>
						<text>团小团商城</text>
					</view>
					<view class="bd u-flex">
						<u-image v-if="orderPre.proSelect.image" :src="orderPre.proSelect.image" width="170" height="170" border-radius="12"></u-image>
						<view class="info u-flex-col u-flex-1">
							<view class="u-flex u-col-top">
								<text class="txt u-line-2">{{orderPre.name}}</text>
								<text class="num">X{{orderPre.proSelect.cart_num||1}}</text>
							</view>
							<text class="desc">{{orderPre.proSelect.suk}}</text>
							<view class="u-flex u-row-between">
								<view class="u-flex">
									<text class="price">{{orderPre.proSelect.price||0}}</text>
									<text class="sprice">¥{{orderPre.proSelect.ot_price||0}}</text>
								</view>
								<view class="numberbox" v-if="orderPre.type==0">
									<number-box v-model="goodsNum" :min="1" :step="1" :max="maxNum" size="28" @minus="ChangeCartNum(false)" @plus="ChangeCartNum(true)"></number-box>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="item_list u-flex u-row-between">
				<view class="item_title">配送方式</view>
				<text v-if="orderPre.is_postage==1">包邮¥0</text>
				<text v-if="orderPre.is_postage==0">¥{{orderPre.postage||0}}</text>
			</view>
			<view class="item_list remark_box u-flex">
				<view class="item_title">备注</view>
				<input class="item_input u-flex-1" placeholder-class="input_pl" type="text" v-model="remark" placeholder="建议留言前先于卖家沟通确认" />
			</view>
			</block>
			<block v-if="type=='pink'">
				<view class="goodslist">
					<view class="item u-flex-col">
						<view class="hd u-flex">
							<view class="tag">团</view>
							<text>团小团商城</text>
							<view class="tnum" v-if="orderPre.people>0">{{orderPre.people}}人团</view>
						</view>
						<view class="bd u-flex u-col-top">
							<view class="picwrap">
								<u-image v-if="orderPre.proSelect.image" :src="orderPre.proSelect.image" width="170" height="170" border-radius="12"></u-image>
								<view class="sale" v-if="orderPre.pick_people>0">本团抽{{orderPre.pick_people||0}}人</view>
							</view>
							<view class="info u-flex-col u-flex-1">
								<view class="u-flex u-col-top">
									<view class="txt u-line-2">{{orderPre.name}}</view>
									<text class="num">X{{orderPre.proSelect.cart_num||1}}</text>
								</view>
								<text class="desc">{{orderPre.proSelect.suk}}</text>
								<view class="u-flex u-row-between">
									<view class="u-flex">
										<text class="price">{{orderPre.proSelect.price||0}}</text>
										<text class="sprice">¥{{orderPre.proSelect.ot_price||0}}</text>
									</view>
								</view>
							</view>
						</view>
					</view>
				</view>
				<view class="item_list u-flex-col">
					<view class="pitem u-flex u-row-between">
						<view class="item_title">拼团价格</view>
						<text>¥{{orderPre.proSelect.price||0}}</text>
					</view>
					<view class="pitem u-flex u-row-between">
						<view class="item_title">配送方式</view>
						<text v-if="orderPre.is_postage==1">包邮¥0</text>
						<text v-if="orderPre.is_postage==0">¥{{orderPre.postage||0}}</text>
					</view>
				</view>
				<view class="item_list remark_box u-flex">
					<view class="item_title">备注</view>
					<input class="item_input u-flex-1" placeholder-class="input_pl" type="text" v-model="remark" placeholder="建议留言前先于卖家沟通确认" />
				</view>
				<view class="coupbox u-flex-col">
					<view class="coutit u-flex u-row-center">
						<u-icon name="/static/images/index/pticon.png" size="26"></u-icon>
						<text class="title">拼团玩法</text>
					</view>
					<u-image src="/static/images/index/ptcon.png" width="670" height="216"></u-image>
				</view>
			</block>
		</view>
		<u-gap height="104"></u-gap>
		<view class="footbox u-flex u-row-between safe-area-inset-bottom">
			<view class="all-money u-flex">
				<text>(共{{orderPre.proSelect.cart_num||0}}件)合计：</text>
				<text class="price">¥{{totalNum || '0.00'}}</text>
			</view>
			<button class="u-reset-button combtn subbtn" :disabled="isDisabled" :loading="isDisabled" @click="subOrder">立即支付</button>
		</view>
		<u-modal v-model="mshow" title="温馨提示" content="库存有限，请尽快完成支付哦～" :show-cancel-button="true" confirmText="继续支付" cancelText="残忍离开" @confirm="onConfirm" @cancel="onCancle"></u-modal>
	</view>
</template>

<script>
	import {mapGetters,mapState} from 'vuex';
	import numberBox from '../components/numberbox/numberbox.vue';
	export default {
		components:{
			"number-box":numberBox
		},
		computed: {
			...mapGetters(["isLogin"]),
			...mapState({
				orderPre: (state) => state.pink
			})
		},
		data() {
			return {
				totalNum: 0,
				addressData: {}, //收货地址
				addressId: 0, //收货地址ID
				isDisabled: false, //提交
				remark:"",
				goodsNum: 1,
				maxNum: 999999,
				stock:99,
				type:"",
				way:0,
				comuser_id:0,
				from:"",
				mshow:false,
				tbradge:0
			}
		},
		onShow() {
			// 监听地址
			let saddress = uni.getStorageSync("Select_Address");
			if(saddress){
				this.addressData = JSON.parse(saddress.addressData);
				this.addressId = this.addressData.id;
			}else{
				this.addressId = 0;
			}
			uni.removeStorageSync("Select_Address");
		},
		methods: {
			onBack(){
				if(this.type=="pink"){
					if(this.tbradge==0){
						this.mshow = true;
					}else{
						uni.navigateBack();
					}
				}else{
					uni.navigateBack();
				}
			},
			// 数量
			ChangeCartNum(changeValue) {
				//changeValue:是否 加|减
				//获取当前变动属性
				let productSelect = "";
				this.maxNum = this.orderPre.once_num == 0?this.orderPre.proSelect.stock:this.orderPre.once_num;
				//如果没有属性,赋值给商品默认库存
				if (productSelect === undefined && !this.orderPre.value.length) productSelect = this.orderPre.proSelect;
				//无属性值即库存为0；不存在加减；
				if (productSelect === undefined) return;
				let stock = this.orderPre.proSelect.stock || 0;
				let num = this.goodsNum;
				if (changeValue) {
					num++;
					if(num>this.maxNum){
						this.$u.toast("已超出最大购买量"+this.orderPre.once_num+this.orderPre.unit_name);
						num--;
					}
					if (num > stock) {
						this.$set(this.orderPre.proSelect,"cart_num",stock ? stock : 1);
						this.goodsNum = stock ? stock : 1;
					}
					this.goodsNum = num;
					this.$set(this.orderPre.proSelect,"cart_num",this.goodsNum);
				} else {
					num--;
					if (num < 1) {
						this.goodsNum = 1;
						num++;
						this.$set(this.orderPre.proSelect,"cart_num",1);
					}
					this.goodsNum = num;
					this.$set(this.orderPre.proSelect,"cart_num",this.goodsNum);
				}
				this.getPre();
			},
			//确认
			onConfirm(){
				this.mshow = false;
				this.tbradge = 1;
			},
			//取消
			onCancle(){
				uni.navigateBack();
			},
			async loadData(){
				await this.init();
			},
			init() {
				uni.showLoading({
					title: '加载中...',
					mask: true
				});
				return Promise.all([this.getDefaultAddress()]).then(() => {
					uni.hideLoading();
				}).catch((res)=>{
					console.log(res)
				});
			},
			jump(path, parmas) {
				this.$u.route({
					url: path,
					parmas: parmas
				});
			},
			// 订单信息
			getPre() {
				let sprice = parseFloat(this.orderPre.proSelect.price*this.orderPre.proSelect.cart_num)+parseFloat(this.orderPre.postage);
				this.totalNum = (Math.round(parseFloat(sprice*100))/100).toFixed(2);
				if(this.orderPre.type=="1"){
					this.from = uni.getStorageSync("tag");
				}
			},
			// 提交订单
			subOrder() {
				this.isDisabled = true;
				let prams = {
					id:this.orderPre.id,
					user_address_id:this.addressId,
					unique:this.orderPre.proSelect.unique,
					buy_num:this.orderPre.proSelect.cart_num,
					buy_way:Number(this.way),
					combination_user_id:Number(this.comuser_id),
					mark:this.remark,
					from:this.from
				};
				// console.log(prams)
				this.$http.createOrder(prams).then((res)=>{
					this.isDisabled = false;
					if(res.code==200){
						let orderno = res.data.order_no;
						uni.removeStorageSync("tag");
						if(this.type=="order"){
							uni.redirectTo({
								url:"/pages/library/payment/pay?no="+orderno+"&price="+this.orderPre.proSelect.price+"&mtype=1&type=order"
							})
						}else{
							uni.redirectTo({
								url:"/pages/library/payment/pay?no="+orderno+"&price="+this.orderPre.proSelect.price+"&type=order"
							})
						}
					}else{
						this.$u.toast(res.msg);
					}
				})
			},
			// 初始地址
			getDefaultAddress() {
				this.$http.getAddress().then(res => {
					if (res.code === 200 && res.data) {
						let data = res.data.data;
						let newData = data.filter(item => item.is_default == 1);
						if(newData.length){
							this.addressData = newData[0];
							this.addressId = newData[0].id;
						}
					}
				});
			}
		},
		onLoad(option) {
			this.type = option.type;
			this.way = option.way;
			this.comuser_id = option.uid;
			this.getPre();
		},
		onShow(){
			this.loadData();
		}
	};
</script>

<style lang="scss" scoped>
	.order_wrap{
		padding:20rpx 40rpx;
		.address_box{
			background-color: #ffffff;
			border-radius: 16rpx;
			padding:30rpx;
			font-size: 24rpx;
			color:#000000;
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
		.select_notice{
			width:100%;
			height: 84rpx;
			line-height: 84rpx;
			text-align: center;
			font-size: 28rpx;
			color:#FF6929;
			font-weight: bold;
			background: #fbede9;
			border-radius: 42rpx;
		}
		.goodslist{
			background-color: #ffffff;
			border-radius: 16rpx;
			padding:28rpx 24rpx;
			margin-top:20rpx;
			.item{
				.hd{
					font-size: 28rpx;
					color:#000000;
					font-weight: bold;
					margin-bottom: 28rpx;
					.tag{
						width:36rpx;
						height: 36rpx;
						line-height: 36rpx;
						text-align: center;
						font-size: 20rpx;
						color:#FFFFFF;
						background-color: #000000;
						border-radius: 6rpx;
						margin-right: 16rpx;
					}
				}
				.tnum{
					font-size: 20rpx;
					color: #FF6929;
					padding: 0 12rpx;
					height: 40rpx;
					line-height: 40rpx;
					text-align: center;
					border:2rpx #FF6929 solid;
					border-radius: 20rpx;
					margin-left: 14rpx;
				}
				.picwrap{
					position: relative;
					.sale{
						width: 120rpx;
						padding:0 12rpx;
						height: 28rpx;
						line-height: 28rpx;
						text-align: center;
						font-size: 20rpx;
						color: #FFFFFF;
						background: linear-gradient(0deg,#ffb405, #ff6929 95%);
						border-radius: 14rpx;
						position: absolute;
						top:-10rpx;
						left:50%;
						transform: translateX(-50%);
						z-index: 20;
					}
				}
				.info{
					margin-left: 40rpx;
					font-size: 24rpx;
					.txt{
						color:#000000;
						width: 334rpx;
						height: 68rpx;
					}
					.num{
						color:#999999;
						margin-left: 40rpx;
					}
					.desc{
						color:#707071;
						margin:20rpx 0;
					}
					.price{
						font-size: 28rpx;
						color:#333333;
						font-weight: bold;
						&::before{
							content:"¥";
							font-size: 28rpx;
						}
					}
					.sprice{
						font-size: 24rpx;
						color:#999999;
						text-decoration: line-through;
						margin-left: 8rpx;
					}
				}
			}
		}
		.item_list{
			background-color: #ffffff;
			border-radius: 16rpx;
			font-size: 24rpx;
			color:#000000;
			padding:26rpx 28rpx;
			margin-top:20rpx;
			.pitem{
				padding-bottom:30rpx;
				&:last-child{
					padding-bottom: 0;
				}
			}
		}
		.remark_box{
			.item_input{
				padding-left: 24rpx;
				text-align: left;
				font-size: 24rpx;
				color:#000000;
			}
			.input_pl{
				color: #cccccc;
			}
		}
		.coupbox{
			.coutit{
				font-size: 24rpx;
				color:#000000;
				padding:44rpx 0 24rpx 0;
				.title{
					margin-left: 20rpx;
				}
			}
		}
	}
	.footbox {
		position: fixed;
		left:0;
		bottom: 0;
		z-index: 998;
		width: 100%;
		height: 104rpx;
		background-color: #fff;
		box-shadow: 0rpx 8rpx 28rpx 0rpx rgba(166,179,194,0.30);
		.all-money{
			margin-left: 30rpx;
			font-size: 28rpx;
			color: #000000;
			font-weight: bold;
			.price {
				color:#C90404;
			}
		}
		.subbtn{
			width: 270rpx;
			line-height: 84rpx;
			border-radius: 42rpx;
			font-size: 28rpx;
			color: #ffffff;
			font-weight: bold;
			margin-right: 30rpx;
		}
	}
</style>
