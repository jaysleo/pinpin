<template>
	<view class="paywrap">
		<view class="u-flex-col u-col-center moneybox" v-if="orderDetail.total_fee">
			<text class="time" v-if="isCountDown">{{timeText}}</text>
			<view class="money">{{orderDetail.total_fee}}</view>
			<text class="gray">{{orderDetail.desc}}</text>
		</view>
		<view class="paybox">
			<view class="pay_item u-flex u-row-between" :class="{'on':cur==index}" v-for="(item,index) in payment" :key="index" @click="tabpay(index,item.type)">
				<view class="u-flex">
					<image class="icon" :src="item.icon" mode="aspectFit"></image>
					<text>{{item.name}}</text>
					<text class="tip" v-if="item.type=='yue' && money!=''">（当前余额：￥{{money}}）</text>
				</view>
				<u-icon name="/static/images/common/checked.png" size="40" v-if="cur==index"></u-icon>
			</view>
		</view>
		<u-gap height="100"></u-gap>
		<button class="u-reset-button combtn paybtn" :class="{'disabled':disabled}" :disabled="disabled" @click="confirmPay">立即支付</button>
	</view>
</template>

<script>
	import {mapGetters} from 'vuex';
	export default{
		data(){
			return{
				timer:null,
				payType: "weixin", //支付方式
				isCountDown: true, //是否显示订单倒计时
				orderDetail: {
					id:0,
					total_fee:"",
					desc:"",
					type:"",
					mtype:"",
					order_no:"",
					express_time:300000
				},
				cur:0,
				money:"", //余额
				timeText: "", //倒计时文本
				disabled:false,
				payment:[
					{
						icon:"/static/images/common/wechat.png",
						name:"微信支付",
						type:"weixin"
					},
					{
						icon:"/static/images/common/wallet.png",
						name:"余额支付",
						type:"yue"
					}
				]
			}
		},
		computed: {
			...mapGetters(["isLogin","userInfo"])
		},
		methods: {
			// 倒计时
			countDown() {
				let t = this.orderDetail.express_time / 1000;
				this.timer = setInterval(() => {
					if (t > 0) {
						let time = this.$tools.format(t);
						this.timeText = `支付剩余时间 ${time.m}:${time.s}`;
						t--;
					} else {
						clearInterval(this.timer);
						this.timeText = '时间已过期!';
						this.disabled = true;
					}
				}, 1000);
			},
			//支付方式
			tabpay(index,type){
				this.cur = index;
				this.payType = type;
			},
			// 发起支付
			confirmPay() {
				if (!this.payType) {
					this.$u.toast('请选择支付方式');
					return;
				}
				if(this.orderDetail.type=="member"){
					this.$http.buyVip(this.payType,this.orderDetail.mtype).then((res)=>{
						if(res.code==0){
							this.$u.toast(res.msg);
						}else{
							this.$u.toast("支付成功");
							setTimeout(()=>{
								uni.redirectTo({
									url:"/pages/library/payment/result"
								})
							},800)
						}
					})
				}
				if(this.orderDetail.type=="uniqid"){
					this.$http.buyUniqid(this.orderDetail.id,this.payType).then((res)=>{
						if(res.code==0){
							this.$u.toast(res.msg);
						}else{
							this.$u.toast("支付成功");
							setTimeout(()=>{
								uni.redirectTo({
									url:"/pages/library/payment/result"
								})
							},800)
						}
					})
				}
				if(this.orderDetail.type=="bming"){
					this.$http.early(this.payType).then((res)=>{
						if(res.code==0){
							this.$u.toast(res.msg);
						}else{
							this.$u.toast("支付成功");
							setTimeout(()=>{
								uni.redirectTo({
									url:"/pages/library/payment/result"
								})
							},800)
						}
					})
				}
				if(this.orderDetail.type=="order"){
					this.$http.pay(this.orderDetail.order_no,this.payType).then((res)=>{
						if(res.code==0){
							this.$u.toast(res.msg);
						}else{
							this.$u.toast("支付成功");
							setTimeout(()=>{
								if(this.orderDetail.mtype=="1"){
									uni.redirectTo({
										url:"/pages/library/payment/result?id="+res.data.k_id+"&type=other"
									})
								}else{
									uni.redirectTo({
										url:"/pages/library/payment/result?id="+res.data.k_id+"&type=pink"
									})
								}
							},800)
						}
					})
				}
			}
		},
		onLoad(option){
			if(option.type){
				this.orderDetail.type = option.type;
				this.orderDetail.total_fee = parseFloat(option.price).toFixed(2);
				if(option.type=="member"){
					this.orderDetail.mtype = option.mtype;
					this.orderDetail.desc = "开通会员费用";
				}
				if(option.type=="uniqid"){
					this.orderDetail.id = option.id;
					this.orderDetail.desc = "购买靓码费用";
				}
				if(option.type=="bming"){
					this.orderDetail.desc = "瓜分奖金报名费用";
				}
				if(option.type=="order"){
					this.orderDetail.order_no = option.no;
					if(option.mtype=="1"){
						this.orderDetail.desc = "";
						this.orderDetail.mtype = option.mtype;
					}else{
						this.orderDetail.desc = "拼团费用";
					}
				}
				this.money = this.userInfo.now_money;
			}
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
	.moneybox{
		height: 270rpx;
		padding-top: 40rpx;
		font-size: 24rpx;
		.time {
			font-size: 28rpx;
			color: #2E2E2E;
		}
		.money{
			margin-top: 28rpx;
			font-size: 52rpx;
			color: #2E2E2E;
			font-weight: bold;
			&::before {
				content: '￥';
				font-size: 36rpx;
			}
		}
		.gray{
			color:#9C9C9C;
		}
	}
	.paybox{
		margin:0 30rpx;
		.pay_item{
			height: 104rpx;
			padding:0 45rpx;
			font-size: 28rpx;
			color:#2E2E2E;
			font-weight: bold;
			.icon{
				margin-right:20rpx;
				width: 46rpx;
				height: 46rpx;
			}
			.tip{
				font-size: 24rpx;
				color:#FF6929;
				font-weight: normal;
			}
			&.on{
				background-color: #ffffff;
			}
		}
	}
	.paybtn{
		height: 80rpx;
		line-height: 80rpx;
		border-radius: 40rpx;
		margin:0 40rpx;
		font-size: 28rpx;
		color:#FFFFFF;
		font-weight: bold;
		&.disabled{
			background: #f5f5f5;
			color:#CCCCCC;
			box-shadow: none;
		}
	}
</style>
