<template>
	<view class="container">
		<view class="userwrap">
			<u-gap :height="stausht"></u-gap>
			<view class="bg">
				<image src="/static/images/user/userbg.png" mode="aspectFit"></image>
			</view>
			<view class="userbox">
				<view class="avatar">
					<u-avatar :src="userInfo.avatar" size="78"></u-avatar>
					<view class="ilevel" v-if="userInfo.is_vip==1">
						<u-icon name="/static/images/user/levels.png" size="24"></u-icon>
					</view>
				</view>
				<view class="info">
					<block v-if="isLogin">
						<view class="u-flex">
							<text class="name">{{userInfo.nickname}}</text>
							<view class="level" v-if="userInfo.is_vip==1">
								<text class="num">Lv.{{userInfo.level}}</text>
							</view>
						</view>
						<view class="ft">
							<text>专属邀请码:{{userInfo.uniqid}}</text>
							<text>｜</text>
							<view class="icopy" @click="copyCode(userInfo.uniqid)">复制</view>
						</view>
					</block>
					<block v-else>
						<view class="u-flex" @click="goLogin" style="height: 100%;">请登录/注册</view>
					</block>
				</view>
				<view class="notice" @click="jump('pages/library/notice/index',{},true)">
					<u-icon name="/static/images/index/icon_notice.png" size="37"></u-icon>
					<i class="badge"></i>
				</view>
			</view>
			<view class="levelbox" :class="{'other':userInfo.is_vip==1}">
				<view class="hd">
					<view class="item">
						<text class="num">{{userInfo.gold||0}}</text>
						<text class="small">礼金</text>
					</view>
					<view class="item">
						<text class="num">{{userInfo.spread_count||0}}</text>
						<text class="small">粉丝</text>
					</view>
				</view>
				<view class="slider" v-if="userInfo.is_vip==1">
					<view class="danger">
						<u-line-progress height="4" active-color="#ffcc3a" inactive-color="#FAFBFF" :percent="rate" :striped="true" :striped-active="true" :show-percent="false"></u-line-progress>
					</view>
					<view class="ft">
						<view class="levname">Lv.{{userInfo.level||0}}</view>
						<text>{{userInfo.next_need_exp}}/{{userInfo.next_level_exp}}升级成lv.{{userInfo.level+1||1}}</text>
					</view>
				</view>
			</view>
		</view>
		<view class="memwrap">
			<view class="memad" v-if="userInfo.is_vip==0">
				<image src="/static/images/user/yxang.png" mode="aspectFit" style="width: 132rpx;height: 32rpx;"></image>
				<text class="txt">去广告/一键领取/自动拼团等权益</text>
				<view class="kt" @click="jump('pages/library/member/index',{},true)">立即开通</view>
			</view>
			<view class="memads" v-if="userInfo.is_vip==1">
				<view class="left">
					<view class="hd">
						<image src="/static/images/user/yxang.png" mode="aspectFit" style="width: 132rpx;height: 32rpx;"></image>
						<text class="txt">去广告/一键领取/自动拼团等权益</text>
					</view>
					<text>有效期至 {{userInfo.overdue_vip_time}}</text>
				</view>
				<view class="btns" @click="jump('pages/library/member/index',{},true)">续费会员</view>
			</view>
			<view class="mempt">
				<view class="tit">我的拼团</view>
				<view class="bd">
					<view class="item" @click="jump('pages/library/order/spell',{type:1},true)">
						<text class="num">{{userInfo.doing_count||0}}</text>
						<text>拼团中</text>
					</view>
					<view class="item" @click="jump('pages/library/order/spell',{type:2},true)">
						<text class="num">{{userInfo.success_count||0}}</text>
						<text>拼团成功</text>
					</view>
					<view class="item" @click="jump('pages/library/order/spell',{type:4},true)">
						<text class="num">{{userInfo.fail_count||0}}</text>
						<text>拼团失败</text>
					</view>
				</view>
			</view>
			<view class="memorder">
				<view class="tit">
					<text>我的订单</text>
					<view class="more" @click="jump('pages/library/order/list',{type:0},true)">
						<text>全部</text>
						<u-icon name="arrow-right" size="20" color="#999999" class="icon"></u-icon>
					</view>
				</view>
				<view class="ft">
					<view class="mitem" @click="jump('pages/library/order/list',{type:1},true)">
						<view class="picwrap">
							<image src="/static/images/user/order_1.png" style="width: 52rpx;height: 46rpx;"></image>
						</view>
						<text>待支付</text>
					</view>
					<view class="mitem" @click="jump('pages/library/order/list',{type:2},true)">
						<view class="picwrap">
							<image src="/static/images/user/order_2.png" style="width: 48rpx;height: 42rpx;"></image>
						</view>
						<text>待发货</text>
					</view>
					<view class="mitem" @click="jump('pages/library/order/list',{type:3},true)">
						<view class="picwrap">
							<image src="/static/images/user/order_3.png" style="width: 45rpx;height: 46rpx;"></image>
						</view>
						<text>待收货</text>
					</view>
					<view class="mitem" @click="jump('pages/library/order/list',{type:4},true)">
						<view class="picwrap">
							<image src="/static/images/user/order_4.png" style="width: 46rpx;height: 46rpx;"></image>
						</view>
						<text>交易成功</text>
					</view>
					<view class="mitem" @click="jump('pages/library/order/list',{type:7},true)">
						<view class="picwrap">
							<image src="/static/images/user/order_5.png" style="width: 47rpx;height: 46rpx;"></image>
						</view>
						<text>售后</text>
					</view>
				</view>
			</view>
			<view class="memshare">
				<view class="item fxhy">
					<button class="u-reset-button shabtn" style="height: 100%;" @click="jump('pages/library/user/invite',{},true)">分享好友</button>
				</view>
				<view class="item syzx" @click="jump('pages/library/user/revenue/index',{},true)">
					<text class="txt">收益中心</text>
				</view>
			</view>
			<view class="memcell">
				<view class="tit">我的服务</view>
				<view class="bd">
					<view class="item">
						<image src="/static/images/user/ser_sc.png" mode="aspectFit"></image>
						<text>素材发圈</text>
					</view>
					<view class="item" @click="jump('pages/library/user/coupons',{},true)">
						<image src="/static/images/user/ser_yhq.png" mode="aspectFit"></image>
						<text>优惠劵</text>
					</view>
					<view class="item" @click="jump('pages/library/code/index')">
						<image src="/static/images/user/ser_yqm.png" mode="aspectFit"></image>
						<text>邀请码</text>
					</view>
					<view class="item" @click="jump('pages/library/enroll/index')">
						<image src="/static/images/user/ser_hd.png" mode="aspectFit"></image>
						<text>活动报名</text>
					</view>
				</view>
			</view>
			<view class="memcell">
				<view class="tit">我的工具</view>
				<view class="bd">
					<view class="item" @click="jump('pages/library/user/set/index')">
						<image src="/static/images/user/ser_xtsz.png" mode="aspectFit"></image>
						<text>系统设置</text>
					</view>
					<view class="item" @click="jump('pages/library/user/address/index',{},true)">
						<image src="/static/images/user/ser_address.png" mode="aspectFit"></image>
						<text>收货地址</text>
					</view>
					<view class="item" @click="jump('pages/library/service/index')">
						<image src="/static/images/user/ser_help.png" mode="aspectFit"></image>
						<text>获取帮助</text>
					</view>
				</view>
			</view>
		</view>
		<u-gap height="110"></u-gap>
		<ntab-bar current="2"></ntab-bar>
	</view>
</template>

<script>
	import { mapMutations, mapActions, mapGetters } from 'vuex';
	import ntabBar from "@/components/tabbar/ntabbar.vue";
	export default{
		components:{
			ntabBar
		},
		computed: {
			...mapGetters(["isLogin","userInfo"])
		},
		data(){
			return {
				stausht:uni.getSystemInfoSync().platform == 'ios' ? 44 : 48,
				scrollTop: 0,
				rate:0 //会员进度条
			}
		},
		methods:{
			...mapMutations(["updateUserinfo"]),
			goLogin(){
				this.$u.route("pages/login/login");
			},
			//导航跳转
			jump(path,parmas,loginCheck = false){
				if(loginCheck && !this.isLogin){
					this.$u.toast("您还未登录，请先登录");
					return false;
				}
				this.$u.route({
					url: path,
					params: parmas
				});
			},
			//复制
			copyCode(code) {
				this.$tools.copyCode(code);
			},
			// 初始化
			init() {
				this.$http.getUserInfo().then(res => {
					this.updateUserinfo(res.data);
					this.rate = Math.floor(this.userInfo.exp / this.userInfo.next_need_exp * 100);
					uni.stopPullDownRefresh();
				}).catch(e => {
					uni.stopPullDownRefresh();
				});
			}
		},
		// 下拉刷新
		onPullDownRefresh() {
			this.init();
		},
		onPageScroll(e) {
			this.scrollTop = e.scrollTop;
		},
		onShow(){
			if (this.isLogin) {
				this.init();
			}
		},
		onLoad(option){
			let statusBarHeight = uni.getSystemInfoSync().statusBarHeight+90;
			this.stausht = statusBarHeight;
			this.$u.mpShare = {
				title: '团小团商城',
				path: '/pages/login/login?uid='+ this.userInfo.uniqid,
				imageUrl:"/static/images/index/iban.png"
			}
		}
	}
</script>

<style lang="scss" scoped>
	.userwrap{
		position: relative;
		.bg{
			position: absolute;
			top:0;
			left:0;
			width: 100%;
			image{
				width:100%;
				height: 292rpx;
			}
		}
		.userbox{
			padding:20rpx 22rpx;
			display: flex;
			position: relative;
			.avatar{
				flex-shrink: 0;
				width: 78rpx;
				height: 78rpx;
				background:#eeeeee;
				border-radius: 50%;
				position: relative;
				.ilevel{
					position: absolute;
					bottom: 0;
					right: 0;
					z-index: 20;
				}
			}
			.info{
				flex:1;
				margin-left: 12rpx;
				font-size: 28rpx;
				color:#FFFFFF;
				display: flex;
				flex-direction: column;
				.level{
					margin-left: 16rpx;
					width:72rpx;
					height: 29rpx;
					background:url(../../static/images/user/level.png) no-repeat;
					background-size: 100% 100%;
					font-size: 20rpx;
					color:#ffffff;
					font-weight: bold;
					text-align: center;
					display: flex;
					align-items: flex-end;
					.num{
						padding-left: 36rpx;
					}
				}
				.name{
					height: 40rpx;
					line-height: 40rpx;
				}
				.ft{
					font-size: 20rpx;
					display: flex;
					align-items: center;
					.icopy{
						padding-left: 14rpx;
					}
				}
			}
			.notice{
				margin-right: 35rpx;
				position: relative;
				.badge{
					position: absolute;
					top:0;
					right: 0;
					z-index: 20;
					width: 10rpx;
					height: 10rpx;
					background: #fe4444;
					border-radius: 4rpx;
				}
			}
		}
		.levelbox{
			padding:0 67rpx;
			margin:0 22rpx;
			background-color:#FFFFFF;
			border-radius: 22rpx;
			box-shadow: 0rpx 6rpx 20rpx 0rpx rgba(0,0,0,0.05);
			height:150rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			flex-direction: column;
			position: relative;
			z-index: 20;
			&.other{
				height: 260rpx;
			}
			.hd{
				width:100%;
				display: flex;
				.item{
					width: 50%;
					display: flex;
					flex-direction: column;
					align-items: center;
					justify-content: center;
					position: relative;
					color:#000000;
					.num{
						font-size: 32rpx;
					}
					.small{
						font-size: 24rpx;
						margin-top:10rpx;
					}
					&::after{
						content:"";
						width:2rpx;
						height: 38rpx;
						background:#EDF1FF;
						position: absolute;
						top:50%;
						right:0;
						margin-top:-19rpx;
					}
					&:last-child{
						&::after{
							content:none;
						}
					}
				}
			}
			.slider{
				margin-top:28rpx;
				width:100%;
				.danger{
					width:100%;
				}
				.ft{
					margin-top:8rpx;
					display: flex;
					align-items: center;
					justify-content: space-between;
					font-size: 20rpx;
					color:#707071;
					.levname{
						height: 32rpx;
						padding:0 14rpx;
						font-size: 24rpx;
						color:#FFFFFF;
						background-image: linear-gradient(to right, #FFB405, #FF7D20);
						border-radius: 32rpx;
						display: flex;
						align-items: center;
					}
				}
			}
		}
	}
	.memwrap{
		margin:0 22rpx;
		.memad{
			background: url(../../static/images/user/membg.png) no-repeat;
			background-size: cover;
			margin:14rpx 0;
			padding:0 42rpx;
			height: 90rpx;
			display: flex;
			align-items: center;
			.utxt{
				font-size: 28rpx;
				color: #e3c993;
				margin-right: 10rpx;
			}
			.txt{
				flex:1;
				font-size: 20rpx;
				color:#CCCCCC;
			}
			.kt{
				width:110rpx;
				height: 50rpx;
				background-color:#EAD6A8;
				border-radius: 50rpx;
				line-height: 50rpx;
				text-align: center;
				font-size: 20rpx;
				color:#2D3133;
			}
		}
		.memads{
			background: url(../../static/images/user/membg2.png) no-repeat;
			background-size: cover;
			height: 130rpx;
			padding:0 32rpx 0 40rpx;
			margin:20rpx 0;
			display: flex;
			align-items: center;
			font-size: 20rpx;
			color:#CCCCCC;
			.left{
				flex:1;
				.hd{
					margin-bottom: 13rpx;
					padding-bottom: 13rpx;
					border-bottom: 2rpx solid #707070;
					display: flex;
					align-items: center;
					.txt{
						margin-left: 18rpx;
					}
				}
			}
			.btns{
				background: url(../../static/images/user/btnbg.png) no-repeat;
				background-size: cover;
				width:122rpx;
				height: 64rpx;
				line-height: 64rpx;
				text-align: center;
				font-size: 20rpx;
				color:#2D3133;
				margin-left: 50rpx;
				position: relative;
				&::before{
					content:"";
					position: absolute;
					top:-10rpx;
					left:50%;
					transform: translateX(-50%);
					z-index: 20;
					width: 20rpx;
					height: 20rpx;
					background: #ffffff;
					border: 4rpx solid #ead7a8;
					border-radius: 50%;
				}
			}
		}
		.mempt{
			width:100%;
			height: 218rpx;
			background:#FFFFFF;
			border-radius: 22rpx;
			box-shadow: 0rpx 6rpx 20rpx 0rpx rgba(0,0,0,0.05);
			.tit{
				padding:34rpx 0 20rpx 48rpx;
				font-size: 28rpx;
				color:#000000;
			}
			.bd{
				display: flex;
				width: 100%;
				.item{
					width:33.33%;
					display: flex;
					flex-direction: column;
					align-items: center;
					justify-content: center;
					position: relative;
					font-size: 24rpx;
					color:#000000;
					.num{
						font-size: 32rpx;
						color:#FF6929;
						margin-bottom: 10rpx;
					}
					&::after{
						content:"";
						width:2rpx;
						height: 38rpx;
						background:#EDF1FF;
						position: absolute;
						top:50%;
						right:0;
						margin-top:-19rpx;
					}
					&:last-child{
						&::after{
							content:none;
						}
					}
				}
			}
		}
		.memorder{
			margin:30rpx 48rpx 40rpx;
			.tit{
				display: flex;
				align-items: center;
				justify-content: space-between;
				font-size: 28rpx;
				color:#000000;
				.more{
					font-size: 24rpx;
					color:#999999;
					display: flex;
					align-items: center;
					.icon{
						display: flex;
						margin-left: 14rpx;
					}
				}
			}
			.ft{
				display: flex;
				.mitem{
					width:20%;
					font-size: 24rpx;
					color:#000000;
					display: flex;
					align-items: center;
					justify-content: center;
					flex-direction: column;
					.picwrap{
						width:52rpx;
						height: 52rpx;
						margin-top:32rpx;
						margin-bottom: 20rpx;
						display: flex;
						align-items: center;
						justify-content: center;
					}
				}
			}
		}
		.memshare{
			display: flex;
			justify-content: space-between;
			margin-bottom: 34rpx;
			.item{
				flex:1;
				height: 109rpx;
				background-repeat: no-repeat;
				background-size: cover;
				position: relative;
				.txt{
					position: absolute;
					top:45rpx;
					right:48rpx;
					font-size: 28rpx;
					color:#000000;
				}
				&.fxhy{
					background-image:url(../../static/images/user/share.png);
					margin-right: 20rpx;
					.shabtn{
						padding-top: 45rpx;
						padding-left: 140rpx;
						font-size: 28rpx;
						color:#000000;
					}
				}
				&.syzx{
					background-image:url(../../static/images/user/syzx.png);
				}
			}
		}
		.memcell{
			background:#FFFFFF;
			border-radius: 22rpx;
			box-shadow: 0rpx 6rpx 20rpx 0rpx rgba(0,0,0,0.05);
			padding-bottom: 38rpx;
			margin-bottom: 20rpx;
			.tit{
				padding:34rpx 0 26rpx 48rpx;
				font-size: 28rpx;
				color:#000000;
			}
			.bd{
				display: flex;
				width: 100%;
				.item{
					width:25%;
					display: flex;
					align-items: center;
					justify-content: center;
					flex-direction: column;
					font-size: 24rpx;
					color:#000000;
					position: relative;
					image{
						width:48rpx;
						height: 48rpx;
						background: #eeeeee;
						border-radius: 50%;
						margin:20rpx 0;
					}
					&::after{
						content:"";
						width:2rpx;
						height: 38rpx;
						background:#EDF1FF;
						position: absolute;
						top:50%;
						right:0;
						margin-top:-19rpx;
					}
					&:last-child{
						&::after{
							content:none;
						}
					}
				}
			}
		}
	}
</style>