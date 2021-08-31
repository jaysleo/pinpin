<template>
	<view class="container">
		<view class="balancebox u-flex-col">
			<text class="small">账户余额</text>
			<text class="num">{{userInfo.now_money||0}}</text>
		</view>
		<view class="grids">
			<view class="gridswrap">
				<view class="tit">提现金额</view>
				<view class="gridsbox u-flex u-flex-wrap">
					<view class="grids_item u-flex u-row-center" :class="{'on':cur==index}" v-for="(item,index) in list" :key="index" @click="tab(index,item)">{{item}}元</view>
					<view class="grids_item u-flex u-row-center">
						<input type="number" v-model="money" class="ipt" placeholder="输入10的整数倍" placeholder-style="color:#c2c2c2" />
					</view>
				</view>
			</view>
			<view class="account u-flex">
				<view class="tit u-flex-1">
					<text>提现银行卡账号</text>
				</view>
				<view class="u-flex" @click="jump">
					<view class="num" v-if="account">{{account}}</view>
					<view class="num" v-else>去绑定</view>
					<u-icon name="arrow-right" size="21" color="#999999"></u-icon>
				</view>
			</view>
			<view class="info">
				<u-parse :html="content"></u-parse>
			</view>
		</view>
		<u-gap height="140"></u-gap>
		<view class="ftbtn safe-area-inset-bottom">
			<button class="u-reset-button btn_primary" @click="onSubmit">立即申请</button>
		</view>
	</view>
</template>

<script>
	import {mapGetters} from 'vuex';
	export default{
		data(){
			return{
				list:[10,30,50,100,500],
				cur:-1,
				account:"",
				money:"",
				curmoney:"",
				content:"<p>1、提现后预计2个小时到账，以实际到账时间为准。<br/>2、若提现未到账，请在“余额明细”中查看原因。<br/>3、提现金额为10的正整数倍方可进行提现。<br/>4、每一笔提现，将由银行卡收取2元的手续费。</p>"
			}
		},
		computed: {
			...mapGetters(["isLogin","userInfo"])
		},
		watch:{
			money(val){
				this.curmoney = Number(val);
			}
		},
		methods:{
			tab(index,value){
				this.cur = index;
				this.curmoney = value;
			},
			jump(){
				this.$u.route("pages/library/user/revenue/bind");
			},
			onSubmit(){
				if(this.curmoney==""){
					this.$u.toast("请选择或者输入需要提现的金额");
					return false;
				}
				if(Number(this.curmoney) % 10 > 0){
					this.$u.toast("请输入10的整数倍");
					return false;
				}
				if(this.account==""){
					this.$u.toast("请绑定银行卡");
					return false;
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.balancebox{
		height: 234rpx;
		padding:42rpx 26rpx 0 40rpx;
		background-color: #ff6929;
		.small{
			font-size: 24rpx;
			color:rgba(255,255,255,0.8);
			margin-bottom: 16rpx;
		}
		.num{
			font-size: 42rpx;
			color: #ffffff;
			font-weight: bold;
		}
	}
	.grids{
		padding:0 20rpx;
	}
	.gridswrap{
		background: #ffffff;
		border-radius: 10rpx;
		padding: 0 40rpx;
		margin-top: -76rpx;
		.tit{
			padding:30rpx 0;
			font-size: 24rpx;
			color:#2E2E2E;
			font-weight: bold;
		}
		.gridsbox{
			padding-bottom: 10rpx;
			.grids_item{
				margin-bottom: 20rpx;
				width: 198rpx;
				height: 96rpx;
				background-color: #fbfbfb;
				border:2rpx #fbfbfb solid;
				border-radius: 10rpx;
				font-size: 28rpx;
				color:#999999;
				text-align: center;
				margin-right: 17rpx;
				margin-bottom: 19rpx;
				.ipt{
					font-size: 24rpx;
					color: #999999;
				}
				&.on{
					background-color: #fff7f4;
					color: #FF6929;
					border-color: #FF6929;
				}
				&:nth-child(3n){
					margin-right: 0;
				}
			}
		}
	}
	.account{
		margin-top: 16rpx;
		background: #ffffff;
		border-radius: 10rpx;
		width: 100%;
		padding:0 38rpx 0 40rpx;
		height: 94rpx;
		font-size: 24rpx;
		color: #2e2e2e;
		.tit{
			font-weight: bold;
		}
		.num{
			margin-right: 15rpx;
			text-align: right;
		}
	}
	.info{
		margin-top: 16rpx;
		padding: 30rpx 40rpx;
		background: #ffffff;
		border-radius: 10rpx;
		font-size: 24rpx;
		color: #999999;
		line-height: 42rpx;
	}
</style>
