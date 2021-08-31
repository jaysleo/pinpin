<template>
	<view class="container">
		<view class="invte_wrap">
			<view class="hd u-flex u-row-between">
				<text>密友：{{mfriend}}</text>
				<text>好友：{{hfriend}}</text>
			</view>
			<view class="swiperbox">
				<u-swiper :list="list" mode="dot" bg-color="#ffffff" height="830" border-radius="20" :autoplay="false"></u-swiper>
				<canvas-drawer :painting="painting" class="canvasdrawer" @getImage="eventGetImage"/>
				<view class="uinfo u-flex">
					<view class="u-flex-1 u-flex-col">
						<view class="infobox u-flex">
							<u-avatar :src="userInfo.avatar==''?'/static/images/user/avatar.png':userInfo.avatar" size="58" class="avatar"></u-avatar>
							<view class="u-flex-1 u-flex-col">
								<text class="name">{{userInfo.nickname}}</text>
								<text>{{subtit}}</text>
							</view>
						</view>
						<view class="title">{{title}}</view>
						<view class="desc">{{desc}}</view>
					</view>
					<u-image :src="ewmurl" width="122" height="122"></u-image>
				</view>
			</view>
		</view>
		<u-gap height="160"></u-gap>
		<view class="btnbox safe-area-inset-bottom u-flex">
			<view class="tools_item u-flex-1">
				<button class="u-reset-button u-flex-col u-col-center" open-type="share">
					<u-icon name="/static/images/common/icon_wechat.png" size="80"></u-icon>
					<text class="text">微信好友分享</text>
				</button>
			</view>
			<view class="tools_item u-flex-1 u-flex-col u-col-center" @click="eventDraw">
				<u-icon name="/static/images/common/icon_timeline.png" size="80"></u-icon>
				<text class="text">朋友圈分享</text>
			</view>
			<view class="tools_item u-flex-1 u-flex-col u-col-center" @click="eventDraw">
				<u-icon name="/static/images/common/icon_sphone.png" size="80"></u-icon>
				<text class="text">保存到手机</text>
			</view>
		</view>
	</view>
</template>

<script>
	import {mapGetters} from 'vuex';
	import Auth from '@/common/permission/index.js';
	import canvasDrawer from "../components/canvas-drawer/canvas-drawer.vue";
	export default{
		components:{
			canvasDrawer
		},
		computed: {
			...mapGetters(["isLogin","userInfo"])
		},
		data(){
			return{
				mfriend:0,
				hfriend:0,
				subtit:"邀请您加入拼拼有礼",
				title:"拼拼有礼-拼出美好未来",
				desc:"邀请好友拼团，领取大额红包~",
				list:["/static/images/index/iban.png"],
				ewmurl:"/static/images/early/ewm.png",
				shareImage:"",
				painting:{}
			}
		},
		methods:{
			eventDraw(){
				uni.showLoading({
					title: '绘制分享图片中',
					mask: true
				})
				this.painting = {
					width: 670,
					height: 1020,
					views: [
						{
							type: 'image',
							url: this.list[0],
							top: 0,
							left: 0,
							width: 670,
							height: 964
						},
						{
							type: 'image',
							url: '/static/images/early/urect.png',
							top: 830,
							left: 0,
							width: 670,
							height: 190
						},
						{
							type: 'image',
							url: this.userInfo.avatar==''?'/static/images/user/avatar.png':this.userInfo.avatar,
							top: 858,
							left: 30,
							width: 58,
							height: 58
						},
						{
							type: 'text',
							content: this.userInfo.nickname,
							fontSize: 16,
							color: '#666666',
							textAlign: 'left',
							top: 868,
							left: 98,
							width:300
						},
						{
							type: 'text',
							content: this.subtit,
							fontSize: 16,
							color: '#666666',
							textAlign: 'left',
							top: 890,
							left: 98,
							width: 362
						},
						{
							type: 'text',
							content: this.title,
							fontSize: 24,
							color: '#333333',
							textAlign: 'left',
							top: 922,
							left: 30,
							width: 290,
							bolder:true
						},
						{
							type: 'text',
							content: this.desc,
							fontSize: 20,
							color: '#999999',
							textAlign: 'left',
							top: 956,
							left: 30,
							width: 290
						},
						{
							type: 'image',
							url: "/static/images/early/ewm.png",
							top: 858,
							left: 516,
							width: 122,
							height: 122
						}
					]
				}
			},
			async saveImg(){
				let authState = await new Auth('writePhotosAlbum').check();
				if (authState) {
					if(this.shareImage!=""){
						uni.saveImageToPhotosAlbum({
							filePath: this.shareImage,
							success: (res)=> {
								this.$u.toast("保存成功");
							}
						})
					}
				}else{
					this.$u.toast("已取消");
				}
			},
			eventGetImage(event) {
				uni.hideLoading();
				const tempFilePath = event.tempFilePath;
				const errMsg = event.errMsg;
				if (errMsg === 'canvasdrawer:ok') {
					this.shareImage = tempFilePath;
					this.painting = {};
					this.saveImg();
				}else{
					this.$u.toast("绘制失败");
				}
			}
		},
		onLoad(){
			this.$u.mpShare = {
				title: this.title || '团小团',
				path: '/pages/index/index?uid=' + this.userInfo.uniqid,
				imageUrl:this.list[0]
			}
		}
	}
</script>

<style lang="scss" scoped>
	.invte_wrap{
		margin-top: 1rpx;
		.hd{
			padding:20rpx 40rpx;
			background: #ffffff;
			font-size: 24rpx;
			color: #000000;
		}
		.swiperbox{
			margin:30rpx 40rpx;
			position: relative;
			/deep/.u-swiper-wrap{
				padding-bottom: 42rpx;
			}
			/deep/.u-indicator-item-dot{
				background-color: #d2d2d2;
			}
			/deep/.u-indicator-item-dot-active{
			    background-color: #f27534;
			}
		}
		.uinfo{
			width: 100%;
			height: 190rpx;
			padding:0 30rpx;
			background: #ffffff;
			border-radius: 20rpx 20rpx 0 0;
			position: absolute;
			bottom: 42rpx;
			left: 0;
			z-index: 50;
			.infobox{
				font-size: 16rpx;
				color: #999999;
				.avatar{
					margin-right: 10rpx;
				}
				.name{
					color:#666666;
				}
			}
			.title{
				margin-top: 6rpx;
				font-size: 24rpx;
				color:#333333;
				font-weight: bold;
			}
			.desc{
				margin-top: 6rpx;
				font-size: 20rpx;
				color: #999999;
			}
		}
	}
	.btnbox{
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		z-index: 999;
		width: 100%;
		height: 160rpx;
		background: #ffffff;
		box-shadow: 0rpx 8rpx 28rpx 0rpx rgba(166,179,194,0.30);
		.tools_item{
			font-size: 20rpx;
			color:#000000;
			.text{
				margin-top: 20rpx;
			}
		}
	}
</style>
