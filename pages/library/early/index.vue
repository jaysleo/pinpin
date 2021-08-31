<template>
	<view class="container">
		<u-navbar back-icon-size="34" back-icon-color="#2E2E2E" back-text="早起打卡" :back-text-style="'color:#000000'" :border-bottom="false" :custom-back="onBack">
			<view class="slotwrap" @click="jump('pages/library/early/list')">
				<text>我的打卡</text>
			</view>
		</u-navbar>
		<u-notice-bar mode="horizontal" :list="noticelist" bg-color="#FBE5DF" color="#FF6929" font-size="22" padding="8rpx 40rpx" volume-size="20"></u-notice-bar>
		<view class="u-rela">
			<view class="bgbox">
				<image src="/static/images/early/tbbg.png" mode="aspectFit" style="width: 750rpx;height: 1080rpx;"></image>
			</view>
		</view>
		<view class="early_wrap">
			<view class="rulebtn" @click="jump('pages/library/early/rule')">
				<u-image :lazy-load="false" :fade="false" src="/static/images/early/rulebtn.png" width="106" height="106"></u-image>
			</view>
			<view class="award u-flex-col u-col-center">
				<u-gap height="120"></u-gap>
				<u-image :lazy-load="false" :fade="false" src="/static/images/early/titbg.png" width="328" height="184" class="tbg"></u-image>
				<view class="slider">
					<view class="circle"></view>
				</view>
				<view class="date">{{ginfo.date_time||0}}期奖池</view>
				<view class="price">
					<text>{{ginfo.money||0}}</text>
					<text class="unit">元</text>
				</view>
				<view class="avatarbox u-flex">
					<view class="avatar_group u-flex u-flex-1" v-if="ginfo.people>0">
						<u-avatar :src="item" size="44" class="cu_avatar" v-for="(item,index) in ginfo.user_avatar_list" :key="index"></u-avatar>
					</view>
					<view class="dot" v-if="ginfo.people>5">…</view>
					<view class="numbox u-flex">
						<text class="num">{{ginfo.people||0}}</text>
						<text>人参与打卡</text>
					</view>
				</view>
				<view class="bomdk ing" v-if="type=='ing'" @click="bming">报名打卡瓜分现金</view>
				<view class="bomdk other" v-if="type=='other'">报名成功，明天记得来打卡哦～</view>
				<view class="bomdk ing" v-if="type=='day'" @click="daydk">早起打卡</view>
				<view class="bomdk suc" v-if="type=='suc'">打卡成功，等待瓜分奖金</view>
				<view class="bomdk fail" v-if="type=='fail'">打卡失败啦，下次记得早起哦～</view>
			</view>
			<view class="awardbox">
				<view class="tit">参与早起打卡，瓜分现金奖励啦</view>
				<view class="awardlist u-flex-col u-col-center">
					<view class="hd">
						<u-image :lazy-load="false" :fade="false" src="/static/images/early/icos.png" width="551" height="70"></u-image>
					</view>
					<view class="ft u-flex">
						<view class="item u-flex-col">
							<view class="btn">参与报名</view>
							<text>支付10元报名</text>
						</view>
						<view class="item u-flex-col u-flex-1">
							<view class="btn">次日打卡</view>
							<text>次日5:00～8:00打卡</text>
						</view>
						<view class="item u-flex-col">
							<view class="btn">瓜分奖金</view>
							<text>次日12:00瓜分奖金</text>
						</view>
					</view>
				</view>
				<view class="awardbtn u-flex">
					<button class="u-reset-button toolbtn yqbtn" @click="eventDraw">
						<text class="name">邀请好友</text>
						<text>邀请好友一起早起打卡</text>
					</button>
					<button class="u-reset-button toolbtn btn" @click="jump('pages/library/early/list')">
						<text class="name">我的打卡</text>
						<text>已参与{{ginfo.user_success_count||0}}期,获得奖励金{{jlprice}}元</text>
					</button>
				</view>
			</view>
			<view class="rankwrap">
				<view class="tit">{{ginfo.date_time||0}}期排行榜</view>
				<view class="subtit u-flex">
					<text class="txt">{{ginfo.success_people||0}}人瓜分奖金</text>
					<text class="txt">{{ginfo.fail_people||0}}人挑战失败</text>
				</view>
				<view class="rankuser u-flex u-row-center" :class="{'suc':rankhotlist.length==3}" v-if="rankhotlist.length">
					<view class="item u-flex u-flex-col" :class="[{'j':dindex==0,'y':dindex==1,'t':dindex==2}]" v-for="(item,dindex) in rankhotlist" :key="dindex">
						<view class="picwrap" v-if="dindex==1">
							<u-image :src="item.user_avatar" width="112" height="112" border-radius="50%"></u-image>
							<u-icon name="/static/images/early/ico_y.png" size="36" class="icon"></u-icon>
						</view>
						<view class="picwrap" v-if="dindex==0">
							<u-image :src="item.user_avatar" width="140" height="140" border-radius="50%"></u-image>
							<u-icon name="/static/images/early/ico_j.png" size="36" class="icon"></u-icon>
						</view>
						<view class="picwrap" v-if="dindex==2">
							<u-image :src="item.user_avatar" width="112" height="112" border-radius="50%"></u-image>
							<u-icon name="/static/images/early/ico_t.png" size="36" class="icon"></u-icon>
						</view>
						<view class="name">{{item.user_nickname}}</view>
						<view class="price">¥{{item.money}}</view>
					</view>
				</view>
				<view class="ranklist u-flex-col" v-for="(item,cindex) in ranklist" :key="cindex">
					<view class="item u-flex">
						<view class="xh">{{cindex+4}}</view>
						<view class="avatar u-flex u-flex-1">
							<u-image :src="item.user_avatar" width="56" height="56" class="icon" border-radius="50%"></u-image>
							<text>{{item.user_nickname}}</text>
						</view>
						<view class="price">¥ {{item.money}}</view>
					</view>
				</view>
			</view>
		</view>
		<canvas-drawer :painting="painting" class="canvasdrawer" @getImage="eventGetImage"/>
		<view class="sharewrap" v-if="shareShow">
			<u-image :src="shareImage" width="623" height="857" class="sharimg"></u-image>
			<view class="overlay" @click="shareShow=false"></view>
			<view class="sharebox">
				<u-image :lazy-load="false" :fade="false" src="/static/images/early/sharebg.png" width="622" height="857" class="bgs"></u-image>
				<view class="ishare">
					<u-gap height="352"></u-gap>
					<view class="txt">我已获得{{curjlprice}}元奖金</view>
					<u-gap height="115"></u-gap>
					<view class="btn">累计参与{{ginfo.user_success_count||0}}期早起打卡</view>
					<u-gap height="54"></u-gap>
					<view class="uinfo u-flex">
						<view class="u-flex-col u-flex-1">
							<image :src="userInfo.avatar==''?'/static/images/user/avatar.png':userInfo.avatar" mode="aspectFit" class="avatar"></image>
							<text class="name">{{userInfo.nickname}}</text>
							<text class="name">累计参与{{ginfo.user_success_count||0}}期早起打卡</text>
						</view>
						<view class="ewm u-flex-col">
							<u-image :lazy-load="false" :fade="false" :src="ewmurl" width="174" height="174"></u-image>
							<!-- <u-image src="/static/images/early/slogo.png" width="42" height="42" class="icon"></u-image> -->
						</view>
					</view>
					<view class="btnbox u-flex">
						<view class="ibtn wxin u-flex u-col-center u-row-center u-flex-1">
							<button class="u-reset-button u-flex-col u-col-center u-row-center" open-type="share">
								<u-icon name="/static/images/early/wechat.png" size="68" class="icon"></u-icon>
								<text>微信</text>
							</button>
						</view>
						<view class="ibtn wphone u-flex-col u-col-center u-row-center u-flex-1" @click="saveImg">
							<u-icon name="/static/images/early/wphone.png" size="68" class="icon"></u-icon>
							<text>保存至手机</text>
						</view>
					</view>
				</view>
			</view>
		</view>
		<alert-modal :showModal="tshow" :btntext="btntext">
			<view class="tips u-flex-col u-col-center" v-if="show">
				<text>恭喜你打卡成功～</text>
				<text class="small">可瓜分12:00的奖池奖金</text>
			</view>
			<view class="otips u-flex-col u-col-center" v-else>
				<view class="txt">恭喜你已成功瓜分奖励金<text class="price">{{jlprice}}</text>元</view>
				<text>（已累计连续打卡{{ginfo.user_success_count||0}}期）</text>
			</view>
		</alert-modal>
		<u-modal v-model="mshow" content="已成功保存至手机相册" title="温馨提示" :show-cancel-button="true"></u-modal>
		<view class="advwrap" v-if="videoShow">
			<video-modal :vshow="videoShow" @end="videoChange"></video-modal>
		</view>
	</view>
</template>

<script>
	import {mapGetters} from 'vuex';
	import Auth from '@/common/permission/index.js';
	import navBar from "../components/navbar/navbar.vue";
	import alertModal from "../components/alert-modal/alert-modal.vue";
	import canvasDrawer from "../components/canvas-drawer/canvas-drawer.vue";
	import videoModal from "../components/video-modal/video-modal.vue";
	export default{
		components:{
			navBar,
			alertModal,
			canvasDrawer,
			videoModal
		},
		computed: {
			...mapGetters(["isLogin","userInfo"])
		},
		data(){
			return{
				noticelist:[],
				type:"ing",
				tshow:false,
				btntext:"等待瓜分",
				shareShow:false,
				mshow:false,
				show:false,
				rankhotlist:[],
				ranklist:[],
				ginfo:{},
				start:0,
				end:0,
				nend:0,
				now:0,
				curjlprice:0,
				jlprice:0,
				ewmurl:"/static/images/early/ewm.png",
				shareImage:"",
				painting:{},
				videoShow:false,
				isvideo:0
			}
		},
		methods:{
			onBack(){
				uni.navigateBack({delta:2});
			},
			jump(path,parmas){
				this.$u.route({
					url: path,
					params: parmas
				});
			},
			getEarlysort(){
				this.$http.earlySort().then((res)=>{
					let data = res.data.data;
					this.rankhotlist = data.splice(0,3);
					this.ranklist = data.slice(0,3);
					let list = data;
					list.forEach((item)=>{
						if(item.user_nickname==this.userInfo.nickname){
							this.curjlprice = item.money;
						}
					})
				})
			},
			getEarIndex(){
				this.$http.earlyIndex().then((res)=>{
					this.ginfo = res.data;
					this.jlprice = parseFloat(this.ginfo.success_people/this.ginfo.money).toFixed(2);
					console.log(this.jlprice)
					this.start = this.$u.timeFormat(this.ginfo.start_time, 'hh:MM');
					this.end = this.$u.timeFormat(this.ginfo.stop_time, 'hh:MM');
					this.nend = this.$u.timeFormat(this.ginfo.start_time+82800, 'hh:MM');
					this.noticelist = [`每日${this.start}~${this.end}早起打卡，每日早晨${this.nend}截止当前的早起报名`];
					this.type = this.ginfo.ispaid==0?"ing":"other";
					//判断昨天有没有打卡
					if(this.ginfo.yester_day_paid_status==1&&this.ginfo.yester_day_sign_status==1){
						if(this.ginfo.yester_day_start_time<this.now && this.now<this.ginfo.yester_day_stop_time){
							this.type = "day";
						}
					}
				})
			},
			bming(){
				if(this.now<this.start){
					this.$u.toast("早于报名时间");
					return false;
				}
				this.$u.route("pages/library/payment/pay",{type:"bming",price:10});
			},
			videoChange(val){
				this.isvideo = val;
			},
			daydk(){
				if(this.isvideo==0){
					this.videoShow = true;
				}else{
					this.$http.earlySign().then((res)=>{
						if(res.code==1){
							this.type = "fail";
						}else{
							this.type = "suc";
							this.tshow = true;
							this.show = true;
						}
					})
				}
			},
			eventDraw(){
				uni.showLoading({
					title: '绘制分享图片中',
					mask: true
				})
				this.painting = {
					width: 623,
					height: 857,
					views: [
						{
							type: 'image',
							url: '/static/images/early/sharebg.png',
							top: 0,
							left: 0,
							width: 623,
							height: 857
						},
						{
							type: 'image',
							url: '/static/images/early/rect.png',
							top: 502,
							left: 133,
							width: 362,
							height: 78
						},
						{
							type: 'text',
							content: '我已获得'+this.jlprice+'元奖金',
							fontSize: 24,
							color: '#FF6929',
							textAlign: 'left',
							top: 360,
							left: 220
						},
						{
							type: 'text',
							content: '累计参与'+this.ginfo.user_success_count+'期早起打卡',
							fontSize: 24,
							color: '#FF7600',
							textAlign: 'left',
							top: 530,
							left: 194,
							width: 362
						},
						{
							type: 'image',
							url: this.userInfo.avatar==''?'/static/images/user/avatar.png':this.userInfo.avatar,
							top: 630,
							left: 57,
							width: 100,
							height: 100
						},
						{
							type: 'image',
							url: "/static/images/early/ewm.png",
							top: 630,
							left: 397,
							width: 174,
							height: 174
						},
						{
							type: 'text',
							content: this.userInfo.nickname,
							fontSize: 24,
							color: '#FFFFFF',
							textAlign: 'left',
							top: 744,
							left: 57,
							width: 250,
							height: 35
						},
						{
							type: 'text',
							content: '累计参与'+this.ginfo.user_success_count+'期早起打卡',
							fontSize: 24,
							color: '#FFFFFF',
							textAlign: 'left',
							top: 780,
							left: 57,
							width: 250,
							height: 35
						}
					]
				}
			},
			async saveImg(){
				let authState = await new Auth('writePhotosAlbum').check();
				if (authState) {
					uni.saveImageToPhotosAlbum({
						filePath: this.shareImage,
						success: (res)=> {
							this.mshow = true;
						}
					})
				}
			},
			eventGetImage(event) {
				uni.hideLoading();
				this.shareShow = true;
				const tempFilePath = event.tempFilePath;
				const errMsg = event.errMsg;
				if (errMsg === 'canvasdrawer:ok') {
					this.shareImage = tempFilePath;
					this.painting = {};
				}
			}
		},
		onLoad(option){
			this.getEarIndex();
			this.getEarlysort();
			this.now = parseInt(new Date().getTime()/1000);
			if(option.uid){
				uni.setStorageSync("spread",option.uid);
			}
			this.$u.mpShare = {
				title: '您的好友' + this.userInfo.nickname + '邀请您打卡',
				path: '/pages/library/early/index?uid='+ this.userInfo.uniqid,
				imageUrl:this.shareImage
			}
		}
	}
</script>
<style lang="scss">
	page{background: #ffd574;}
</style>
<style lang="scss" scoped>
	.advwrap{
		position: fixed;
		top:0;
		left:0;
		z-index:9999;
		width: 100%;
		height: 100vh;
	}
	.sharimg{display: none;}
	.slotwrap{
		display: flex;
		flex:1;
		justify-content: flex-end;
		align-items: center;
		font-size: 24rpx;
		color:#2E2E2E;
		margin-right: 20rpx;
	}
	.bgbox{
		width: 100%;
		position: absolute;
		top:0;
		left: 0;
		right: 0;
		z-index: 20;
	}
	.early_wrap{
		position: relative;
		z-index: 50;
		padding: 0 46rpx;
		.rulebtn{
			position: absolute;
			top:23rpx;
			right:16rpx;
			z-index: 50;
		}
		.award{
			.tbg{
				margin-bottom: 30rpx;
			}
			.slider{
				width: 474rpx;
				height: 2rpx;
				background-color: #ffffff;
				border-radius: 1rpx;
				position: relative;
				.circle{
					width: 24rpx;
					height: 24rpx;
					background-color: #ffffff;
					border-radius: 50%;
					position: absolute;
					top:-12rpx;
					left:50%;
					transform: translateX(-50%);
				}
			}
			.date{
				margin:30rpx 0 20rpx;
				font-size: 28rpx;
				color:#FFFFFF;
				font-weight: bold;
			}
			.price{
				width: 486rpx;
				height: 98rpx;
				line-height: 98rpx;
				text-align: center;
				background: #ffffff;
				border-radius: 49rpx;
				color:#FFB405;
				font-size: 70rpx;
				.unit{
					font-size: 36rpx;
				}
			}
			.avatarbox{
				margin:40rpx 0;
				.avatar_group{
					.cu_avatar{
						margin-left: -26rpx;
					}
				}
				.dot{
					font-size: 28rpx;
					color:#ffffff;
					height: 40rpx;
					line-height: 40rpx;
					margin-top:-10rpx;
				}
				.numbox{
					font-size: 24rpx;
					color:#ffffff;
					.num{
						font-size: 28rpx;
						color:#C90404;
					}
				}
			}
			.bomdk{
				width: 488rpx;
				height: 94rpx;
				line-height: 94rpx;
				text-align: center;
				font-size: 32rpx;
				color:#ffffff;
				&.ing{
					background: url(/static/images/early/btnbgs.png) no-repeat;
					background-size: 100% 100%;
				}
				&.suc{
					width: 586rpx;
					height: 80rpx;
					line-height: 80rpx;
					background: linear-gradient(180deg,#8c9eff, #ff6929);
					border-radius: 40rpx;
					box-shadow: 0rpx 0rpx 4rpx 0rpx rgba(0,0,0,0.16);
				}
				&.other{
					width: 574rpx;
					height: 80rpx;
					background: linear-gradient(180deg,#8c9eff, #b9c4ff);
					border-radius: 40rpx;
					box-shadow: 0rpx 0rpx 4rpx 0rpx rgba(0,0,0,0.16); 
				}
				&.fail{
					width: 586rpx;
					height: 92rpx;
					line-height: 92rpx;
					font-size: 32rpx;
					font-weight: 800;
					text-align: center;
					color: #ffffff;
					background: #cccccc;
					border-radius: 46rpx;
				}
			}
		}
		.awardbox{
			.tit{
				position: relative;
				font-size: 20rpx;
				color:#F6CD70;
				font-weight: bold;
				text-align: center;
				width: 296rpx;
				padding:20rpx 0 30rpx;
				border-bottom: 2rpx #ffd574 solid;
				margin:0 auto;
				&::before,&::after{
					content:"";
					position: absolute;
					top:30rpx;
					width: 8rpx;
					height: 8rpx;
					background: #ffd574;
					border-radius: 50%;
				}
				&::before{
					left:-30rpx;
				}
				&::after{
					right:-30rpx;
				}
			}
			.awardlist{
				.hd{
					margin-top: 30rpx;
					margin-bottom: 20rpx;
				}
				.ft{
					margin-bottom: 20rpx;
				}
				.item{
					font-size: 20rpx;
					color:#FFD574;
					line-height: 30rpx;
					display: flex;
					align-items: center;
					justify-content: center;
					position: relative;
					&:nth-child(2){
						margin:0 80rpx;
					}
					.btn{
						width: 150rpx;
						height: 50rpx;
						line-height: 50rpx;
						text-align: center;
						font-size: 24rpx;
						color:#ffffff;
						background: #ffd574;
						border-radius: 25rpx;
					}
				}
			}
			.awardbtn{
				.toolbtn{
					width: 330rpx;
					height: 132rpx;
					padding-left: 49rpx;
					font-size: 20rpx;
					color:#966900;
					display: flex;
					flex-direction: column;
					align-items: flex-start;
					justify-content: center;
					.name{
						font-size: 28rpx;
						font-weight: bold;
					}
				}
				.yqbtn{
					background: url(/static/images/early/btnbg.png) no-repeat;
					background-size: 100% 100%;
				}
				.btn{
					background: url(/static/images/early/btnbg2.png) no-repeat;
					background-size: 100% 100%;
				}
			}
		}
		.rankwrap{
			margin-top:35rpx;
			.tit{
				width: 652rpx;
				height: 80rpx;
				line-height: 80rpx;
				text-align: center;
				font-size: 32rpx;
				color:#FFB405;
				background: #ffffff;
				border-radius: 40rpx;
				box-shadow: 0rpx 0rpx 4rpx 0rpx rgba(0,0,0,0.16);
				position: relative;
				&::before{
					content:"";
					position: absolute;
					top:6rpx;
					left:6rpx;
					width: 640rpx;
					height: 68rpx;
					border: 2rpx solid #ffd574;
					border-radius: 36rpx;
				}
			}
			.subtit{
				padding:22rpx 0 40rpx;
				font-size: 24rpx;
				color:#ffffff;
				.txt{
					text-align: center;
					flex:1;
					&:first-child{
						border-right: 1rpx #ffffff solid;
					}
				}
			}
			.rankuser{
				position: relative;
				height: 232rpx;
				&.suc{
					&::before{
						content:"";
						width: 371rpx;
						height: 17rpx;
						background: url(/static/images/user/rankbg.png) no-repeat;
						background-size: 100% 100%;
						position: absolute;
						top:82rpx;
						left:140rpx;
					}
				}
				.item{
					font-size: 24rpx;
					color:#ffffff;
					text-align: center;
					margin-top:10rpx;
					position: absolute;
					top:0;
					.picwrap{
						position: relative;
						.icon{
							position: absolute;
							bottom: 0;
							left:50%;
							transform: translateX(-50%);
						}
					}
					.name{
						margin-top:34rpx;
					}
					.price{
						color:#FFD574;
						height: 46rpx;
						line-height: 46rpx;
						padding:0 20rpx;
						background-color: #ffffff;
						border-radius: 23rpx;
					}
					&.j{
						margin-top:0;
						.name{
							margin-top:20rpx;
						}
					}
					&.y{
						left:50rpx;
					}
					&.t{
						right:50rpx;
					}
				}
			}
			.ranklist{
				margin:32rpx 0;
				background-color: #ffffff;
				border-radius: 20rpx;
				padding:25rpx 0;
				.item{
					padding:15rpx 0;
					font-size: 20rpx;
					color:#966900;
					position: relative;
					&::before{
						content:"";
						width: 554rpx;
						height: 2rpx;
						background-color: #fafafa;
						position: absolute;
						bottom:0;
						right: 0;
					}
					&:last-child{
						&::before{
							content: none;
						}
					}
					.xh{
						margin:0 40rpx;
						color:#966900;
						font-weight: bold;
					}
					.avatar{
						.icon{
							margin-right: 20rpx;
						}
					}
					.price{
						font-size: 24rpx;
						color:#FFB405;
						font-weight: bold;
						margin-right: 40rpx;
					}
				}
			}
		}
	}
	.tips{
		font-size: 28rpx;
		color: #000000;
		.small{
			color:#FF6929;
			font-weight: bold;
		}
	}
	.otips{
		font-size: 28rpx;
		color:#999999;
		.txt{
			color: #000000;
			padding-bottom: 20rpx;
			margin-bottom: 10rpx;
			border-bottom: 2rpx solid #f5f5f5;
			.price{
				color:#FF6929;
			}
		}
	}
	.sharewrap{
		position: fixed;
		top:0;
		left: 0;
		right: 0;
		width: 100%;
		height: 100%;
		z-index: 100;
		.overlay{
			position: fixed;
			top:0;
			left: 0;
			right: 0;
			z-index: 100;
			width: 100%;
			height: 100%;
			background: rgba(0,0,0,0.5);
		}
		.sharebox{
			position: fixed;
			top:55%;
			left:50%;
			transform: translate(-50%,-50%);
			width: 622rpx;
			z-index: 200;
			.bgs{
				position: absolute;
				top:0;
				left:0;
				z-index: 20;
			}
			.ishare{
				position: relative;
				z-index: 50;
				.txt{
					font-size: 24rpx;
					color:#FF6929;
					text-align: center;
				}
				.btn{
					width: 360rpx;
					height: 74rpx;
					margin: 0 auto;
					line-height: 74rpx;
					background-color: #ffffff;
					border-radius: 37rpx;
					font-size: 24rpx;
					color:#FF7600;
					text-align: center;
				}
				.uinfo{
					margin:0 57rpx 50rpx;
					.avatar{
						width: 96rpx;
						height: 96rpx;
						border:2rpx #ffffff solid;
						border-radius: 50%;
					}
					.name{
						font-size: 24rpx;
						color:#FFFFFF;
						margin-top:14rpx;
					}
					.ewm{
						position: relative;
						.icon{
							position: absolute;
							top:50%;
							left:50%;
							transform: translate(-50%,-50%);
							z-index: 20;
						}
					}
				}
				.btnbox{
					width: 100%;
					height: 190rpx;
					background: #ffffff;
					border-radius:0 0 10rpx 10rpx;
					.ibtn{
						font-size: 24rpx;
						color:#000000;
						height: 100%;
						.icon{
							margin-bottom: 18rpx;
						}
						&.wxin{
							border-top: 4rpx solid #46bb36;
							position: relative;
							&::before{
								content:"";
								width: 2rpx;
								height: 70rpx;
								background:#f5f5f5;
								position: absolute;
								top:48rpx;
								right: 0;
							}
						}
						&.wphone{
							border-top: 4rpx solid #ffb405;
						}
					}
				}
			}
		}
	}
</style>
