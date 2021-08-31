<template>
	<view class="detail_wrap">
		<view class="navbox">
			<view class="state-hack"></view>
			<view :style="{ height: navbarHeight + 'px' }">
				<view class="backbox u-flex u-row-center u-col-center" @click="goBack">
					<u-icon name="arrow-left" size="34" color="#000000"></u-icon>
				</view>
			</view>
		</view>
		<view class="detail_box">
			<view class="sliderbox">
				<u-swiper class="swiperbox" :height="750" borderRadius="0" :list="goodsInfo.slider_image" mode="dot" :autoplay="false"></u-swiper>
				<price-card v-if="goodsInfo.id" :detail="goodsInfo" :type="detailType" @actRule="actRule"></price-card>
			</view>
			<block v-if="detailType==0">
				<view class="title_box">
					<view class="goods_title">{{goodsInfo.name}}</view>
					<view class="u-flex">
						<view class="number">
							<u-icon name="/static/images/index/ico_huos.png" size="16" class="icon"></u-icon>
							<text>{{goodsInfo.browse}}</text>
						</view>
					</view>
					<Serve v-model="showServe"></Serve>
				</view>
				<shop-list :list="actlist" @goDetail="goDetail" @goShop="goShop"></shop-list>
			</block>
			<block v-if="detailType==2||detailType==3||detailType==4">
				<view class="coutitle_box">
					<view class="goods_title">{{goodsInfo.name}}</view>
					<view class="u-flex">
						<block v-if="detailType==2">
							<view class="numbers" v-if="goodsInfo.pick_people>0">每团抽{{goodsInfo.pick_people||0}}人</view>
						</block>
						<block v-else>
							<view class="numbers">本类目商品已累计拼中{{goodsInfo.sales||0}}次</view>
							<view class="numbers" v-if="goodsInfo.pick_people>0">每团抽{{goodsInfo.pick_people||0}}人</view>
						</block>
					</view>
					<view class="numbox u-flex">
						<view class="avatar_group u-flex u-flex-1" v-if="goodsInfo.user_avatar.length">
							<u-avatar :src="item" size="42" class="cu_avatar" v-for="(item,index) in goodsInfo.user_avatar" :key="index"></u-avatar>
						</view>
						<text class="pnum">已拼成{{goodsInfo.sales||0}}件</text>
					</view>
					<view class="coudesc u-flex-col">
						<block v-if="detailType==2">
						<u-image src="/static/images/index/tip.png" width="679" height="86"></u-image>
						</block>
						<view class="coudesc_con u-flex">
							<text class="name">拼团玩法：</text>
							<text>参加拼团 > 邀请好友 > 满员开团 > 拼中发货</text>
						</view>
					</view>
				</view>
			</block>
			<block v-if="detailType==1">
				<view class="coutitle_box jhs">
					<view class="goods_title">{{goodsInfo.name}}</view>
					<view class="u-flex">
						<view class="numbers">本类目商品已累计拼中{{goodsInfo.sales||0}}次</view>
						<view class="numbers" v-if="goodsInfo.pick_people>0">每团抽{{goodsInfo.pick_people||0}}人</view>
					</view>
					<view class="numbox u-flex">
						<view class="avatar_group u-flex u-flex-1" v-if="goodsInfo.user_avatar.length">
							<u-avatar :src="item" size="42" class="cu_avatar" v-for="(item,index) in goodsInfo.user_avatar" :key="index"></u-avatar>
						</view>
						<text class="pnum">已拼成{{goodsInfo.sales||0}}件</text>
					</view>
					<view class="coudesc u-flex-col">
						<view class="coudesc_con u-flex">
							<text class="name u-flex-1">服务</text>
							<text>活动商品仅支持退换服务</text>
						</view>
						<view class="coudesc_con u-flex">
							<text class="name u-flex-1">拼团玩法：</text>
							<text>参加拼团 > 邀请好友 > 满员开团 > 拼中发货</text>
						</view>
					</view>
				</view>
			</block>
			<view class="couptwrap" v-if="detailType!=0">
				<block v-if="pinklist.length">
					<view class="title">{{pinklist.length}}人正在拼团，快来一起拼</view>
					<view class="ptlist">
						<view class="ptitem u-flex" v-for="(item,index) in pinklist" :key="index">
							<view class="name u-flex">
								<u-avatar :src="item.avatar" size="48"></u-avatar>
								<text class="txt">{{item.nickname.substr(0,3) + '***'}}</text>
							</view>
							<view class="num u-flex u-flex-1 u-row-center">仅剩<text class="light">{{item.total_people-item.total_num}}</text>人即可开团</view>
							<view class="ptbtn" :class="{'couple':detailType==3||detailType==4}" @click="onPink(3,item.id)">去拼团</view>
						</view>
					</view>
					<view class="refresh u-flex u-row-center" @click="onRefresh">
						<u-icon name="reload" size="24" color="#000000" style="display: flex;"></u-icon>
						<text class="txt">换一批</text>
					</view>
				</block>
			</view>
			<view class="detail_content">
				<view class="hd u-flex u-row-between">
					<view class="tit">商品详情</view>
					<view class="arrow u-flex u-row-center u-col-center" @click="isDetail" v-if="infoShow">
						<u-icon name="arrow-down-fill" size="12" color="#707071" class="icon"></u-icon>
						<text>展开</text>
					</view>
					<view class="arrow u-flex u-row-center u-col-center" @click="isDetail" v-else>
						<u-icon name="arrow-up-fill" size="12" color="#707071" class="icon"></u-icon>
						<text>收起</text>
					</view>
				</view>
				<view class="rich-box" v-if="!infoShow">
					<u-parse :html="goodsInfo.description"></u-parse>
				</view>
			</view>
			<block v-if="detailType!=0">
				<shop-recommend :list="recomend"></shop-recommend>
			</block>
		</view>
		<u-back-top :scroll-top="scrollTop" top="0" bottom="400" icon="/static/images/index/backtop.png" zIndex="800"></u-back-top>
		<view class="wxshare" v-if="detailType!=0">
			<button class="u-reset-button sharebtn" open-type="share">
				<u-image src="/static/images/index/wxshare.png" width="102" height="102"></u-image>
			</button>
		</view>
		<u-gap height="60"></u-gap>
		<view class="tabbar_foot safe-area-inset-bottom">
			<view class="detail_foot_box safe-area-inset-bottom u-flex">
				<view class="left u-flex">
					<view class="tools_item u-flex-col u-row-center u-col-center" @click="goHome">
						<image class="tool_img" src="/static/images/common/tab_home.png" mode="aspectFit"></image>
						<text class="tool_title">首页</text>
					</view>
				</view>
				<view class="right u-flex" v-if="isLogin">
					<block v-if="detailType==0">
						<button type="default" class="btn_buy" @click="addCart">
							<text>购买</text>
							<text v-if="goodsInfo.ot_price">立省¥{{(goodsInfo.ot_price-goodsInfo.price).toFixed(2)}}</text>
						</button>
					</block>
					<block v-if="detailType==2">
						<view class="groupon_btnbox u-flex">
							<view class="coutipbox u-flex u-row-center">
								<u-image src="/static/images/index/hb.png" width="28" height="35"></u-image>
								<text class="txt">未拼中全额退 ¥{{goodsInfo.price||0}}</text>
							</view>
							<button class="u-reset-button tool_btn ptbtn" @click="onPink(1)">一键拼团</button>
							<button class="u-reset-button tool_btn ktbtn" @click="onPink(2)">我要开团</button>
						</view>
						<!-- <view class="groupon_btnbox u-flex">
							<view class="coutipbox couple u-flex u-row-center">
								<u-image src="/static/images/index/hb.png" width="28" height="35"></u-image>
								<text class="txt">邀请新人下单您可获得奖励哦～</text>
							</view>
							<button class="u-reset-button tool_btn xrbtn" open-type="share">邀请新人</button>
						</view> -->
					</block>
					<block v-if="detailType==1||detailType==3||detailType==4">
						<view class="groupon_btnbox u-flex">
							<view class="coutipbox u-flex u-row-center">
								<u-image src="/static/images/index/hb.png" width="28" height="35"></u-image>
								<text class="txt">未拼中全额退 ¥{{goodsInfo.price||0}}</text>
							</view>
							<block v-if="btnshow">
								<button class="u-reset-button tool_btn disable">活动已结束</button>
							</block>
							<block v-else>
								<button class="u-reset-button tool_btn ptbtn" @click="onPink(1)">一键拼团</button>
								<button class="u-reset-button tool_btn ktjbtn" @click="onPink(2)">我要开团</button>
							</block>
						</view>
					</block>
				</view>
				<view class="right u-flex" v-else>
					<button class="u-reset-button btn_buy" @click="goLogin">立即登录</button>
				</view>
			</view>
		</view>
		<shopSku v-if="showSku && goodsInfo.id" v-model="showSku" :goodsType="detailType" :grouponBuyType="grouponBuyType" :uid="puid" :goodsInfo="goodsInfo" @ChangeAttr="ChangeAttr" @attrVal="attrVal"></shopSku>
		<alert-modal :showModal="alertShow" content="亲，您没有开通会员，暂无开团的权限，快去开通吧！" :btnClose="true" @close="aclose" @confirm="confirm"></alert-modal>
	</view>
</template>

<script>
	import priceCard from './components/price-card.vue';
	import shopRecommend from '../components/shop-recommend/shop-recommend.vue';
	import Serve from './components/serve.vue';
	import shopSku from "../components/shop-sku/shop-sku.vue";
	import shopList from '../components/shoplist/shop.vue';
	import alertModal from '../components/alert-modal/alert-modal.vue';
	import {mapMutations,mapActions,mapGetters} from 'vuex';
	import {toLogin} from '@/utils/login';
	export default{
		components:{
			priceCard,
			shopRecommend,
			Serve,
			shopSku,
			shopList,
			alertModal
		},
		computed: {
			navbarHeight() {
				let height = uni.getSystemInfoSync().platform == 'ios' ? 44 : 48;
				return height;
			}
		},
		data(){
			return {
				actlist:{}, //会场
				recomend:[], //推荐
				pinklist:[], //拼团
				goodsInfo: {}, //详情
				detailType: 0, //0会场1拼团有礼2一分3热门拼4新人专享
				showSku: false, //是否显示规格弹窗
				proSelect: {}, //系统属性
				showServe: true, //服务
				infoShow:false, //详情
				grouponBuyType:"ing", //拼团购买方式 ing拼 alone开
				alertShow:false, //弹窗
				btnshow:false,
				is_vip:0,
				puid:"", //拼id
				isbacktop:true, //返回顶部
				scrollTop: 0
			}
		},
		computed: {
			...mapGetters(["isLogin","userInfo","proInfo"])
		},
		methods:{
			goBack() {
				let pageList = getCurrentPages();
				if(pageList.length<=2){
					uni.navigateBack();
				}else{
					uni.navigateBack({delta:2});
				}
			},
			goHome(){
				uni.switchTab({
					url:"/pages/index/index"
				})
			},
			goLogin(){
				return toLogin();
			},
			//正在拼团
			getPinklist(id){
				this.$http.getPink(id).then((res)=>{
					this.pinklist = res.data.data;
				})
			},
			//换一批
			onRefresh(){
				uni.showLoading({
					mask:true
				})
				setTimeout(()=>{
					if(this.pinklist.length){
						this.pinklist = this.$u.randomArray(this.pinklist);
					}
					uni.hideLoading();
				},1000);
			},
			//进入会场
			goShop(id){
				this.$u.route('pages/library/index/venue',{id:id,type:1});
			},
			actRule(val){
				if(this.detailType==0){
					this.btnshow = val;
				}
			},
			//会场产品详情
			goDetail(id){
				this.$u.route('pages/library/goods/detail',{id:id,type:0});
			},
			//展开收起
			isDetail(){
				this.infoShow = !this.infoShow;
			},
			//单购买
			addCart(){
				this.showSku = true;
			},
			//属性
			attrVal(val) {
				this.$set(this.goodsInfo.attr[val.indexw], 'index', this.goodsInfo.attr[val.indexw].attr_values[val.indexn]);
			},
			//选中属性
			ChangeAttr(res) {
				let value = res;
				this.goodsInfo.value.forEach(item => {
					if(item.suk==value){
						this.proSelect = item;
						this.$set(this.goodsInfo, 'proSelect', this.proSelect);
					}
				});
			},
			//默认选中
			DefaultSelect() {
				let productAttr = this.goodsInfo.attr;
				let value = [];
				for (var key in this.goodsInfo.value) {
					if (this.goodsInfo.value[key].stock > 0) {
						value = productAttr.length ? this.goodsInfo.value[key].suk.split(',') : [];
						break;
					}
				}
				for (let i = 0; i < productAttr.length; i++) {
					productAttr[i].index = value[i];
				}
				this.goodsInfo.value.forEach(item => {
					if(item.suk==value.join(',')){
						this.proSelect = item;
					}
				});
				if (this.proSelect && productAttr.length) {
					this.$set(this.goodsInfo, 'proSelect', this.proSelect);
				}
			},
			onPink(index,uid){
				if(index==2){
					if(this.goodsInfo.is_cheap==1){
						if(this.userInfo.is_vip==0){
							this.alertShow = true;
						}
						return;
					}
					this.grouponBuyType = "alone";
					this.showSku = !this.showSku;
					return;
				}
				if(index==3){
					this.showSku = !this.showSku;
					this.grouponBuyType = "ings";
					this.puid = uid;
					return;
				}
				this.showSku = !this.showSku;
				this.grouponBuyType = "ing";
				if(this.puid==""){
					this.puid = this.pinklist.length?this.pinklist[0].id:"";
				}
			},
			//弹框
			aclose(){
				this.alertShow = false;
			},
			confirm(){
				this.alertShow = false;
				this.$u.route("pages/library/member/index");
			}
		},
		onLoad(option){
			if(option.uid!=""&&option.uid!=undefined){
				uni.setStorageSync("spread",option.uid);
			}
			if(option.pid!=""&&option.pid!=undefined){
				this.puid = option.pid;
			}
			if(option.type){
				this.detailType = option.type;
				if(option.type==0){
					this.$http.belongActivity(option.id).then((res)=>{
						this.actlist = res.data;
					})
				}else if(option.type!=0){
					this.getPinklist(option.id);
					this.$http.getProlist(3,1,10).then((res)=>{
						this.recomend = res.data.data;
					})
				}
			}
			this.$http.getProdetail(option.id).then((res)=>{
				this.goodsInfo = res.data;
				this.goodsInfo.slider_image = res.data.slider_image.filter(function (s) {
				   return s && s.trim();
				});
				this.goodsInfo.user_avatar = res.data.user_avatar.filter(function (s) {
				   return s && s.trim();
				});
				this.DefaultSelect();
				this.$u.mpShare = {
					title: this.goodsInfo.name || '团小团',
					path: '/pages/library/goods/detail?id=' + option.id + '&uid=' + this.userInfo.uniqid + '&type=' + option.type,
					imageUrl:this.goodsInfo.image
				}
			})
		},
		onPageScroll(e) {
			this.scrollTop = e.scrollTop;
		}
	}
</script>

<style lang="scss" scoped>
.navbox {
	position: fixed;
	width: 100%;
	min-height: 140rpx;
	z-index: 888;
	top: 0;
	.backbox{
		width: 60rpx;
		height: 60rpx;
		margin-top: 14rpx;
	}
	.back_hover {
		background-color:rgba(255,255,255,0.18);
	}
}
.sliderbox{
	position: relative;
	.swiperbox{
		/deep/.u-swiper-indicator{
			bottom:150rpx!important;
			.u-indicator-item-dot{
				background-color:#ffffff;
			}
			.u-indicator-item-dot-active{
				background-color:#FF6929;
			}
		}
	}
}
.title_box{
	padding:38rpx 40rpx 0 38rpx;
	background-color: #ffffff;
	margin-bottom: 20rpx;
	position: relative;
	overflow: hidden;
	&::before{
		content:"";
		position: absolute;
		bottom:66rpx;
		right: -40rpx;
		width: 100%;
		height: 2rpx;
		background-color: #f5f5f5;
	}
	.goods_title{
		font-size: 28rpx;
		color:#000000;
		margin-bottom: 12rpx;
	}
	.number{
		padding:0 12rpx 0 7rpx;
		height: 30rpx;
		background: #fff0e9;
		border-radius: 30rpx;
		font-size: 24rpx;
		color:#FF6929;
		display: flex;
		align-items: center;
		margin-bottom: 28rpx;
		.icon{
			display: flex;
			margin:0 8rpx;
		}
	}
}
.coutitle_box{
	padding:38rpx 40rpx 0 38rpx;
	background-color: #ffffff;
	position: relative;
	overflow: hidden;
	&.jhs{
		&::before{
			bottom:130rpx;
		}
		.coudesc{
			padding:21rpx 0 16rpx 0;
			.coudesc_con:last-child{
				padding-top: 24rpx;
			}
		}
	}
	.goods_title{
		font-size: 28rpx;
		color:#000000;
		margin-bottom: 20rpx;
	}
	.numbers{
		display: inline-block;
		font-size: 20rpx;
		color:#FE4444;
		padding:0 12rpx;
		background-color:#feebeb;
		border-radius: 8rpx;
		margin:0 10rpx 16rpx 0;
	}
	.numbox{
		padding-bottom: 15rpx;
		.pnum{
			font-size: 24rpx;
			color:#999999;
		}
	}
	.avatar_group{
		.cu_avatar{
		    margin-left: -16rpx;
		    border: 4rpx solid #ffffff;
			&:first-child{
				margin-left: 0;
			}
		}
	}
	.coudesc{
		padding:17rpx 0;
		position: relative;
		&::before{
			content:"";
			position: absolute;
			top:0rpx;
			right: -40rpx;
			width: 710rpx;
			height: 2rpx;
			background-color: #f5f5f5;
		}
		.coudesc_con{
			padding-top:14rpx;
			font-size: 24rpx;
			color:#999999;
			.name{
				color:#000000;
				margin-right: 20rpx;
			}
		}
	}
}
.couptwrap{
	margin-top:20rpx;
	background: #ffffff;
	padding:0 40rpx;
	.title{
		font-size: 28rpx;
		color:#000000;
		padding:24rpx 0;
	}
	.ptlist{
		padding:24rpx 0;
		.ptitem{
			margin-bottom: 20rpx;
			.name{
				font-size: 24rpx;
				color:#000000;
				.txt{
					margin-left: 12rpx;
				}
			}
			.num{
				font-size: 24rpx;
				color:#999999;
				.light{
					color:#C90404;
				}
			}
			.ptbtn{
				width: 102rpx;
				height: 40rpx;
				line-height: 40rpx;
				text-align: center;
				background: linear-gradient(180deg,#c90404, #ff7676);
				border-radius: 20rpx;
				font-size: 24rpx;
				color:#FFFFFF;
				&.couple{
					background: linear-gradient(180deg,#ff6929, #ffb405);
				}
			}
			&:last-child{
				margin-bottom: 0;
			}
		}
	}
	.refresh{
		padding:24rpx 0;
		.txt{
			margin-left: 20rpx;
			font-size: 24rpx;
			color:#000000;
		}
	}
}
.detail_content{
	background:#ffffff;
	margin-top:20rpx;
	padding:0 40rpx;
	.hd{
		height: 92rpx;
		.arrow{
			width: 100rpx;
			height: 36rpx;
			background:#F7F8FF;
			border-radius: 36rpx;
			font-size: 20rpx;
			color:#707071;
			.icon{
				display: flex;
				margin-right: 8rpx;
			}
		}
	}
	.rich-box{
		padding:20rpx 0;
		/deep/ img {
			display: block;
		}
	}
}
.wxshare{
	position: fixed;
	bottom:260rpx;
	right:38rpx;
	z-index: 50;
}
.tabbar_foot{
	width: 100%;
	min-height: 104rpx;
	.detail_foot_box{
		min-height: 104rpx;
		border-top: 1rpx solid rgba(238, 238, 238, 1);
		background-color: #fff;
		width: 100%;
		position: fixed;
		bottom: 0;
		z-index: 99;
		.left,.right{
			flex: 1;
		}
		.tools_item{
			flex: 1;
			height: 100%;
			.tool_img{
				width: 48rpx;
				height: 50rpx;
			}
			.tool_title{
				font-size: 20rpx;
				line-height: 28rpx;
				padding-top: 8rpx;
				color:#999999;
			}
		}
		.right{
			margin-right: 30rpx;
			.btn_buy{
				width: 498rpx;
				height: 80rpx;
				line-height: 80rpx;
				font-size: 24rpx;
				color:#FFFFFF;
				background: linear-gradient(0deg,#ffb405, #ff6929 95%);
				border-radius: 40rpx;
			}
		}
		.groupon_btnbox{
			width: 498rpx;
			height: 80rpx;
			position: relative;
			.coutipbox{
				font-size: 20rpx;
				color:#000000;
				background-image: url(/static/images/index/alert2.png);
				background-repeat: no-repeat;
				background-size: 100% 100%;
				width: 292rpx;
				height: 89rpx;
				position: absolute;
				bottom: 67rpx;
				left: 0;
				z-index: 50;
				.txt{
					margin-left: 12rpx;
				}
				&.couple{
					width: 372rpx;
					left:60rpx;
					background-image: url(/static/images/index/alert3.png);
				}
			}
			.tool_btn{
				font-size: 24rpx;
				color:#FFFFFF;
				font-weight: bold;
				flex:1;
				height: 100%;
				display: flex;
				align-items: center;
				justify-content: center;
				&.disable{
					background: #cccccc;
					color: #eeeeee;
					border-radius: 40rpx;
				}
			}
			.ptbtn{
				background: linear-gradient(180deg,#000000, #545454);
				border-radius: 40rpx 0rpx 0rpx 40rpx;
			}
			.ktbtn{
				background: linear-gradient(0deg,#fd7272, #c90404 95%);
				border-radius: 0rpx 40rpx 40rpx 0rpx;
			}
			.ktjbtn{
				background: linear-gradient(0deg,#ffac08, #ff6c27 95%);
				border-radius: 0rpx 40rpx 40rpx 0rpx;
			}
			.xrbtn{
				background: linear-gradient(180deg,#c90404, #ff7676);
				border-radius: 40rpx;
			}
		}
	}
}
</style>
