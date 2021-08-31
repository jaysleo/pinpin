<template>
	<view class="apply-return">
		<view class="goods u-flex row-between">
			<view class="pictrue">
				<u-image :src="orderInfo.info.product_detail.image" width="160" height="160" border-radius="10"></u-image>
			</view>
			<view class="text u-flex-col">
				<view class="name u-line-2">{{orderInfo.info.product_detail.name||"商品名称"}}</view>
				<view class="money" v-if="orderInfo.info.product_detail.attr_info">
					<view class="num">x {{orderInfo.info.buy_num||0}}</view>
					<view>￥{{orderInfo.info.product_detail.attr_info.price||'0.00'}}</view>
				</view>
				<view class="money" v-else>
					<view class="num">x {{orderInfo.info.buy_num||0}}</view>
					<view>￥{{orderInfo.info.product_detail.price||'0.00'}}</view>
				</view>
			</view>
		</view>
		<view class="list">
			<view class="item u-flex row-between">
				<view>退货件数</view>
				<view class="num">{{orderInfo.total_num||0}}</view>
			</view>
			<view class="item u-flex row-between">
				<view>退款金额</view>
				<view class="num red">￥{{orderInfo.pay_price||'0.00'}}</view>
			</view>
			<view class="item u-flex row-between">
				<view>快递单号</view>
				<input type="text" v-model="num" class="num" placeholder="请填写快递单号" />
			</view>
			<view class="item textarea u-flex u-col-top row-between">
				<view>退款理由</view>
				<textarea v-model="mark" class="num" placeholder="填写退款理由，100字以内"></textarea>
			</view>
		</view>
		<u-gap height="140"></u-gap>
		<view class="ftbtn safe-area-inset-bottom">
			<button class="u-reset-button btn_primary" :class="{'disabled':disabled}" :disabled="disabled" @click="subRefund">申请退款</button>
		</view>
	</view>
</template>

<script>
	import {mapGetters,mapState} from 'vuex';
	export default {
		computed: {
			...mapGetters(["isLogin", "orderInfo", "refundGoods"])
		},
		data() {
			return {
				id: 0,
				mark:"",
				num:""
			}
		},
		watch: {
			mark(txt) {
				if(txt.indexOf('\n') != -1){ //敲了回车键了
				   uni.hideKeyboard() //收起软键盘
				}
			}
		},
		computed:{
			disabled(){
				if(this.num!=""&&this.mark!=""){
					return true;
				}else{
					return false;
				}
			}
		},
		methods: {
			subRefund(){
				this.$http.applyRefund(this.id,this.mark,this.num).then((res)=>{
					if(res.code==200){
						this.$u.toast("申请成功");
						setTimeout(()=>{
							uni.navigateBack();
						},800);
					}else{
						this.$u.toast(res.msg);
					}
				})
			}
		},
		onLoad(option) {
			this.id = option.id
		}
	}
</script>

<style scoped lang="scss">
	.apply-return {
		padding:40rpx;
		.goods{
			background-color: #ffffff;
			border-radius: 20rpx;
			padding: 30rpx;
			font-size: 28rpx;
			color: #333333;
			.pictrue{
				flex-shrink: 0;
				margin-right: 30rpx;
			}
			.text{
				flex:1;
			}
			.name {
				align-self: flex-start;
				width: 100%;
				height: 70rpx;
			}
			.money{
				color: #fc6929;
				.num{
					color:#999999;
					margin-bottom: 20rpx;
				}
			}
		}
		.list {
			background-color: #ffffff;
			border-radius: 20rpx;
			margin-top: 18rpx;
			.item {
				padding:0 30rpx;
				min-height: 90rpx;
				border-bottom: 1rpx solid #eee;
				font-size: 28rpx;
				color: #333333;
				.num {
					flex:1;
					color: #282828;
					text-align: right;
					&.red{
						color:#ff6929;
					}
				}
				&.textarea {
					padding:30rpx;
					height: 200rpx;
				}
				textarea{
					font-size: 24rpx;
				}
				&:last-child{
					border-bottom: 0;
				}
			}
		}
	}
</style>
