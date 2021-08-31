<template>
	<view class="success_page">
		<u-navbar back-icon-size="34" back-icon-color="#2E2E2E" title="支付结果" title-color="#000000" font-size="34" :custom-back="onBack"></u-navbar>
		<block v-if="type==''">
			<view class="tips u-flex-col u-col-center u-row-center">
				<u-image src="/static/images/common/success.png" width="278" height="211"></u-image>
				<text class="notice">{{payText[payState]}}</text>
			</view>
		</block>
		<block v-if="type=='other'">
			<view class="tips u-flex-col u-col-center u-row-center">
				<u-image src="/static/images/common/success.png" width="278" height="211"></u-image>
				<text class="notice">{{payText[payState]}}</text>
				<button class="u-reset-button backbtn rescubtn combtn" @click="onBack">返回</button>
			</view>
		</block>
		<block v-if="type=='pink'">
			<view class="groupwrap">
				<view class="counbg"></view>
				<view class="groupcoun">
					<view class="result u-flex-col u-col-center">
						<u-image src="/static/images/common/success.png" width="278" height="211" class="img"></u-image>
						<view class="notice u-flex-col u-col-center">
							<text>{{payText[payState]}}</text>
							<text class="gray">未拼中将自动退款至您的账户</text>
						</view>
						<button class="u-reset-button rescubtn combtn" v-if="user_num==people_num">拼团成功</button>
						<button class="u-reset-button rescubtn combtn" open-type="share" v-else>还差{{people_num-user_num}}人成团，邀请好友一起拼</button>
					</view>
					<view class="goodslist">
						<view class="item u-flex-col">
							<view class="bd u-flex u-col-top">
								<view class="picwrap">
									<u-image v-if="orderPre.proSelect.image" :src="orderPre.proSelect.image" width="170" height="170" border-radius="12"></u-image>
									<view class="sale" v-if="orderPre.pick_people>0">本团抽{{orderPre.pick_people||0}}人</view>
								</view>
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
										<view class="tnum">{{orderPre.people}}人团</view>
									</view>
								</view>
							</view>
						</view>
					</view>
					<view class="ptinfos">
						<view class="ptinfo">
							<view class="titbox">
								<text class="title">拼团信息</text>
								<text class="small">（{{user_num}}/{{people_num}}）</text>
							</view>
							<view class="list">
								<view class="item u-flex" v-for="(item,index) in list" :key="index">
									<view class="tag">团主</view>
									<view class="avatar_group u-flex">
										<u-avatar :src="item.avatar" size="40" class="cu_avatar"></u-avatar>
									</view>
									<view class="num u-flex u-flex-1 u-row-center">还差<text class="light">{{item.total_people-item.total_num}}</text>人即可成团</view>
									<!-- <view class="ptbtns" @click="onPink(item.k_id)">邀请好友参团</view> -->
									<button class="u-reset-button ptbtns" open-type="share">邀请好友参团</button>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
			<shop-recommend :list="recomend"></shop-recommend>
		</block>
	</view>
</template>

<script>
	import {mapGetters,mapState} from 'vuex';
	import shopRecommend from '../components/shop-recommend/shop-recommend.vue';
	export default{
		components:{
			shopRecommend
		},
		computed: {
			...mapGetters(["isLogin","userInfo"]),
			...mapState({
				orderPre: (state) => state.pink
			})
		},
		data(){
			return{
				type:"", //页面类型
				payText: {
					fail: "支付失败",
					success: "支付成功",
					paying: "查询中..."
				},
				payState: "success",
				recomend:[], //商品推荐
				list:[],
				people_num:"",
				user_num:"",
				show:false,
				pid:0
			}
		},
		methods:{
			onBack(){
				uni.navigateBack();
			}
		},
		onLoad(option){
			if(option.type){
				this.type = option.type;
			}
			if(option.id){
				this.pid = option.id;
				this.$http.getPinkuser(this.pid).then((res)=>{
					let data = res.data;
					this.list = data.user;
					this.people_num = data.people_num;
					this.user_num = data.user_num;
				})
				this.$http.getProlist(3,1,10).then((res)=>{
					this.recomend = res.data.data;
				})
			}
			if(this.orderPre.proSelect!=undefined){
				this.$u.mpShare = {
					title: '您的好友' + this.userInfo.nickname + '邀请您参团' + this.orderPre.name,
					path: '/pages/library/goods/detail?id=' + this.orderPre.id + '&pid=' + this.pid + '&uid=' + this.userInfo.uniqid + '&type=' + this.orderPre.type,
					imageUrl: this.orderPre.proSelect.image
				}
			}else{
				this.$u.mpShare = {
					title: '团小团商城',
					path: '/pages/index/index',
					imageUrl:"/static/images/index/iban.png"
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.success_page{
		margin-top:2rpx;
		.notice{
			font-size: 34rpx;
			color:#2E2E2E;
			font-weight: bold;
			margin-top: 60rpx;
		}
		.tips{
			width:100%;
			height: 635rpx;
			background-color: #ffffff;
		}
		.rescubtn{
			width:690rpx;
			height: 84rpx;
			line-height: 84rpx;
			border-radius: 42rpx;
			margin-top: 42rpx;
			margin-bottom: 22rpx;
			font-size: 28rpx;
			color:#FFFFFF;
			font-weight: bold;
			text-align: center;
		}
		.backbtn{
			margin-top:80rpx;
		}
		.groupwrap{
			width:100%;
			position: relative;
			.counbg{
				width:100%;
				height: 647rpx;
				background-color: #ffffff;
				position: absolute;
				top:0;
				left: 0;
				z-index: 20;
			}
		}
		.groupcoun{
			width:100%;
			position: relative;
			z-index: 50;
			.result{
				.img{
					margin-top:30rpx;
				}
				.notice{
					margin-top:40rpx;
					.gray{
						font-size: 24rpx;
						color:#707071;
						margin-top:16rpx;
					}
				}
			}
			.ptbtn{
				margin:42rpx 30rpx 22rpx;
			}
			.goodslist{
				background-color: #ffffff;
				border-radius: 16rpx;
				padding:34rpx 30rpx;
				margin:0 34rpx;
				.item{
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
			.ptinfos{
				width: 100%;
				padding:0 38rpx;
				margin-top: 24rpx;
				position: relative;
				overflow: hidden;
				&::before{
					content:"";
					position: absolute;
					top:0;
					left:0;
					z-index: 20;
					width: 100%;
					height: 57rpx;
					background:url(/static/images/index/tbg.png) no-repeat;
					background-size: 100% 100%;
				}
				&::after{
					content:"";
					position: absolute;
					top:50rpx;
					left:0;
					z-index: 20;
					width: 100%;
					height: 100%;
					background-color: #ffffff;
				}
			}
			.ptinfo{
				position: relative;
				z-index: 50;
				.titbox{
					padding:34rpx 0 40rpx 0;
					text-align: center;
					border-bottom: 2rpx solid #fafbff;
					display: flex;
					flex-direction: column;
					.title{
						font-size: 34rpx;
						color:#2E2E2E;
						font-weight: bold;
					}
					.small{
						font-size: 24rpx;
						color:#000000;
						margin-top:6rpx;
					}
				}
				.list{
					width: 100%;
					.item{
						padding-bottom: 20rpx;
						position: relative;
						.tag{
							font-size: 20rpx;
							color:#FFFFFF;
							width: 52rpx;
							height: 31rpx;
							line-height: 31rpx;
							text-align: center;
							background:url(/static/images/index/tz.png) no-repeat;
							background-size: 100% 100%;
							position: absolute;
							top:-22rpx;
							left: 0;
							z-index: 20;
						}
						.avatar_group{
							.cu_avatar{
							    margin-left: -22rpx;
							    border: 4rpx solid #ffffff;
								&:first-child{
									margin-left: 0;
								}
							}
						}
						.num{
							font-size: 24rpx;
							color:#999999;
							.light{
								color:#C90404;
							}
						}
						.ptbtns{
							width:200rpx;
							height: 68rpx;
							line-height: 68rpx;
							text-align: center;
							font-size: 24rpx;
							color: #FFFFFF;
							background: linear-gradient(90deg,#ffb405, #ff6929);
							border-radius: 34rpx;
						}
					}
				}
			}
		}
	}
</style>
