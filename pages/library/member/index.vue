<template>
	<view class="container membg">
		<u-navbar back-icon-color="#ffffff" background="#000000" back-text="优享会员" :back-text-style="{'color':'#ffffff'}">
			<view class="slotwrap" @click="jump('pages/library/member/list')">开通记录</view>
		</u-navbar>
		<view class="member_wrap">
			<u-gap height="80"></u-gap>
			<view class="memberbox">
				<view class="hd u-flex">
					<view class="u-flex-col u-flex-1">
						<text class="name">YOUXIANG VIP</text>
						<text class="small" v-if="!isVip">您暂时还未开通优享会员～</text>
						<text class="small" v-else>您的会员将于{{userInfo.overdue_vip_time}}到期</text>
					</view>
					<view class="right u-flex-col u-col-center" @click="jump('pages/library/member/code')">
						<image src="/static/images/user/ewm.png" mode="aspectFit" style="width: 42rpx;height: 41rpx;margin-bottom:12rpx;"></image>
						<text class="small">兑换码</text>
					</view>
				</view>
				<view class="foot u-flex">
					<view class="u-flex-col u-flex-1">
						<text class="name">开启自动领红包</text>
						<text class="small">开启后可以自动领取所有拼团红包奖励</text>
					</view>
					<view @click="onCheck">
						<block v-if="isVip">
							<view class="switchbox on u-flex u-row-center" v-if="isCheck">
								<text>开</text>
								<view class="icon"></view>
							</view>
							<view class="switchbox u-flex u-row-center" v-else>
								<view class="icon"></view>
								<text>关</text>
							</view>
						</block>
						<block v-else>
							<view class="switchbox u-flex u-row-center" v-if="isCheck">
								<view class="icon"></view>
								<text>关</text>
							</view>
							<view class="switchbox on u-flex u-row-center" v-else>
								<text>开</text>
								<view class="icon"></view>
							</view>
						</block>
					</view>
				</view>
			</view>
		</view>
		<view class="member_menus">
			<view class="membg"></view>
			<view class="member_menu u-flex-col u-col-center">
				<button class="u-reset-button membtn">VIP会员特权</button>
				<view class="mbox u-flex">
					<view class="item u-flex-col u-col-center" v-for="(item,index) in menulist" :key="index">
						<u-icon :name="item.icon" size="51" class="icon"></u-icon>
						<text>{{item.title}}</text>
						<text class="subtitle">{{item.subtitle}}</text>
					</view>
				</view>
			</view>
		</view>
		<view class="member_meal">
			<view class="title u-flex u-row-center">会员套餐</view>
			<view class="list u-flex">
				<view class="item u-flex-col u-col-center u-row-center" :class="{'active':cur==index}" v-for="(item,index) in cardlist" :key="index" @click="tabChange(index)">
					<view class="dprice u-flex">
						<view class="circle"></view>
						<text>每天{{dprice(item.vip_day,item.price)}}元</text>
					</view>
					<view class="desc">{{item.title}}</view>
					<view class="price">¥{{item.price}}</view>
					<view class="line">{{item.history_price}}</view>
				</view>
			</view>
		</view>
		<view class="tip u-flex u-row-center">开通前请阅读<view class="light" @click="jump('pages/library/user/privacy',{type:3})">《拼拼有礼会员服务协议》</view></view>
		<u-gap height="140"></u-gap>
		<view class="ftbtn safe-area-inset-bottom">
			<button class="u-reset-button btn_primary" v-if="!isVip" @click="onSubmit">立即开通</button>
			<button class="u-reset-button btn_primary on" v-else @click="onSubmit">立即续费</button>
		</view>
		<alert-modal :showModal="tShow" content="亲，您没有开通会员，暂时不能开启自动领红包，快去开通吧！" :btnClose="true" @close="aclose" @confirm="aclose"></alert-modal>
	</view>
</template>

<script>
	import {mapGetters} from 'vuex';
	import {toLogin} from '@/utils/login';
	import alertModal from "../components/alert-modal/alert-modal.vue";
	export default{
		components:{
			alertModal
		},
		computed: {
			...mapGetters(["userInfo"])
		},
		data(){
			return{
				isVip:false,
				tShow:false,
				isCheck:true,
				cur:0,
				menulist:[
					{
						icon:"/static/images/user/mem_1.png",
						title:"免除广告",
						subtitle:"会员畅快拼团"
					},
					{
						icon:"/static/images/user/mem_2.png",
						title:"自动拼团",
						subtitle:"智能自动拼团"
					},
					{
						icon:"/static/images/user/mem_3.png",
						title:"开团权益",
						subtitle:"优享会员独享"
					},
					{
						icon:"/static/images/user/mem_4.png",
						title:"一键领红包",
						subtitle:"一键领红包奖励"
					}
				],
				cardlist:[]
			}
		},
		computed:{
			dprice(){
				return function(day,price){
					return (Math.round(price / day).toFixed(2));
				}
			}
		},
		methods:{
			loadData(){
				this.$http.getVip().then((res)=>{
					if(res.data){
						this.cardlist = res.data;
					}
				})
			},
			tabChange(index){
				this.cur = index;
			},
			onCheck(){
				if(this.isVip==false){
					this.tShow = true;
					return false;
				}
				this.isCheck = !this.isCheck;
			},
			aclose(){
				this.tShow = false;
			},
			onSubmit(){
				this.$u.route("pages/library/payment/pay",{type:"member",price:this.cardlist[this.cur].price,mtype:this.cardlist[this.cur].type});
			},
			jump(path,parmas){
				this.$u.route({
					url: path,
					params: parmas
				});
			}
		},
		onLoad(){
			this.loadData();
			if(this.isLogin){
				this.isVip = this.userInfo.is_vip==0?false:true;
			}
		}
	}
</script>

<style lang="scss" scoped>
	.slotwrap{
		flex:1;
		display: flex;
		justify-content: flex-end;
		align-items: center;
		width: 100%;
		font-size: 24rpx;
		color: #ffffff;
		margin-right: 30rpx;
	}
	.membg{
		background:url(/static/images/user/membgs.png) no-repeat top;
		background-size: 100%;
	}
	.member_wrap{
		.memberbox{
			width: 610rpx;
			height: 428rpx;
			margin:0 auto;
			background: linear-gradient(226deg,#e3c993 6%, #faeac8 22%, #e8cd92 65%, #e3c993 98%);
			border-radius: 40rpx 40rpx 0rpx 0rpx;
			padding:60rpx 56rpx 0;
			color:#000000;
			.small{
				font-size: 20rpx;
			}
			.hd{
				margin-bottom: 50rpx;
				.name{
					font-size: 40rpx;
				}
			}
			.foot{
				.name{
					font-size: 28rpx;
				}
			}
			.switchbox{
				width: 86rpx;
				height: 42rpx;
				background: #ffffff;
				border-radius: 21rpx;
				box-shadow: 0rpx 0rpx 10rpx 0rpx rgba(0,0,0,0.16);
				font-size: 24rpx;
				color: #000000;
				.icon{
					width: 30rpx;
					height: 30rpx;
					border-radius: 30rpx;
					margin-right: 8rpx;
					background: #cccccc;
				}
				&.on{
					.icon{
						background: #e3c993;
						margin-left:8rpx;
						margin-right: 0;
					}
				}
			}
		}
	}
	.member_menus{
		position: relative;
		margin-bottom: 20rpx;
		.membg{
			position: absolute;
			top:0;
			left: 0;
			z-index: 20;
			width: 100%;
			&::before{
				content:"";
				position: absolute;
				top:-112rpx;
				left:0;
				z-index: 20;
				width: 100%;
				height: 93rpx;
				background:url(/static/images/user/membg3.png) no-repeat;
				background-size: 100% 100%;
			}
			height: 200rpx;
			background: #ffffff;
		}
	}
	.member_menu{
		position: relative;
		z-index: 50;
		width: 100%;
		height: 200rpx;
		background-color: #ffffff;
		.membtn{
			width: 328rpx;
			height: 70rpx;
			line-height: 70rpx;
			margin-top:-120rpx;
			margin-bottom: 56rpx;
			text-align: center;
			font-size: 32rpx;
			color:#FFFFFF;
			background: linear-gradient(275deg,#2b2f32 4%, #505050 96%);
			border-radius: 36rpx;
			box-shadow: 0rpx 10rpx 10rpx 0rpx rgba(0,0,0,0.16);
			position: relative;
			&::before{
				content:"";
				position: absolute;
				top:4rpx;
				left:4rpx;
				width: 320rpx;
				height: 62rpx;
				border: 1rpx solid rgba(227,201,147,0.5);
				border-radius: 32rpx;
			}
		}
		.mbox{
			width: 100%;
			background-color: #ffffff;
			margin-top:-28rpx;
			padding-top:28rpx;
		}
		.item{
			width: 25%;
			text-align: center;
			font-size: 24rpx;
			color:#000000;
			.icon{
				margin-bottom: 42rpx;
			}
			.subtitle{
				font-size: 20rpx;
				color:#E3C993;
				margin-top:4rpx;
			}
		}
	}
	.member_meal{
		padding:0 33rpx 0 41rpx;
		background-color: #FFFFFF;
		.title{
			width: 100%;
			height: 107rpx;
			font-size: 28rpx;
			color:#000000;
			font-weight: bold;
			border-bottom: 2rpx solid #f5f5f5;
		}
		.list{
			padding:53rpx 32rpx 40rpx;
			.item{
				position: relative;
				width: 212rpx;
				height: 270rpx;
				margin-right: 15rpx;
				background: #ffffff;
				border:2rpx #efefef solid;
				border-radius: 10rpx;
				box-shadow: 0rpx 0rpx 4rpx 0rpx rgba(0,0,0,0.16); 
				.dprice{
					width: 148rpx;
					height: 42rpx;
					line-height: 42rpx;
					background: #cccccc;
					border-radius: 21rpx;
					text-align: center;
					font-size: 20rpx;
					color:#FFFFFF;
					font-weight: bold;
					position: absolute;
					top:-18rpx;
					right: 0;
					.circle{
						width: 6rpx;
						height: 6rpx;
						background: #ffffff;
						border-radius: 3rpx;
						margin-left: 9rpx;
						margin-right: 16rpx;
					}
				}
				.desc{
					font-size: 24rpx;
					color:#000000;
					font-weight: bold;
					margin-bottom: 14rpx;
				}
				.price{
					font-size: 40rpx;
					color:#E3C993;
				}
				.line{
					font-size: 24rpx;
					color:#CCCCCC;
					text-decoration: line-through;
					&::before{
						content:"￥";
					}
				}
				&:last-child{
					margin-right: 0;
				}
				&.active{
					border-color:#e3c993;
					.dprice{
						background-color:#e3c993;
					}
				}
			}
		}
	}
	.tip{
		text-align: center;
		padding:36rpx 0 46rpx;
		font-size: 24rpx;
		color:#999999;
		.light{
			color:#000000;
		}
	}
	.btn_primary{
		background: linear-gradient(360deg,#ffffff 0%, #000000 100%);
		border-radius: 42rpx;
		box-shadow: 0rpx 6rpx 12rpx 0rpx rgba(112,112,113,0.20); 
		&.on{
			color:#966900;
			background: linear-gradient(top,#e3c994, #fee7b8);
		}
	}
</style>
