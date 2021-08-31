<template>
	<view class="container">
		<u-navbar back-icon-size="34" back-text="拼团有礼" back-icon-color="#2e2e2e" :back-text-style="{'color':'#000000'}" :custom-back="onBack">
			<view class="slotwrap" slot="right">
				<searchBox bgcolor="#FAFBFF" placehoder="搜素拼团商品" @eventClick="goSearch"></searchBox>
			</view>
		</u-navbar>
		<view class="bannerbox">
			<image class="img" src="/static/images/index/mad.png" mode="aspectFit"></image>
			<view class="txt u-flex u-row-center">
				<view class="circle"></view>
				<text>拼团进行中</text>
				<text class="small">{{people}}人正在疯抢</text>
			</view>
		</view>
		<view class="sban">
			<u-image src="/static/images/index/tip.png" width="679" height="86"></u-image>
		</view>
		<view class="menu u-flex-col" v-if="category.length > 0">
			<view class="category u-flex u-row-left">
				<scroll-view class="scrollbox" :scroll-x="true" :scroll-with-animation="true" :scroll-into-view="scroll_category_index">
					<view
						class="item"
						v-for="(item, index) in category"
						:key="index"
						:class="category_index == index ? 'current' : ''"
						:id="'category_index-' + index"
						@click="categoryChange(item,index)"
					>
						<view class="text">
							<text>{{ item.title }}</text>
						</view>
					</view>
				</scroll-view>
			</view>
			<view class="submenu u-flex u-row-left">
				<scroll-view class="scrollbox" :scroll-x="true" :scroll-with-animation="true" :scroll-into-view="scroll_categorys_index">
					<view class="item" v-for="(item,index) in subnav" :key="index" :class="categorys_index == index ? 'current' : ''" :id="'categorys_index-' + index" @click="categorysChange(item.id,index)">
						<text>{{item.category_name}}</text>
					</view>
				</scroll-view>
			</view>
		</view>
		<view class="u-rela">
			<block v-if="list.length">
				<view class="pbg">
					<u-image :lazy-load="false" :fade="false" src="/static/images/activity/listbg.png" width="100%" height="427"></u-image>
				</view>
				<u-gap height="30"></u-gap>
				<view class="prolist default">
					<view class="proitem u-flex u-col-top" v-for="(item,index) in list" :key="index" v-if="item.product_arr" @click="goDetail(item.product_id)">
						<view class="picwrap">
							<u-image :src="item.product_arr.image" width="100%" height="100%" border-radius="12"></u-image>
						</view>
						<view class="info u-flex-1">
							<view class="tits">
								<view class="tag">{{item.product_arr.people}}人团</view>
								<text class="title">{{item.product_arr.name}}</text>
							</view>
							<view class="sale_price u-flex u-col-top u-row-between">
								<text class="small">¥{{item.product_arr.ot_price}}</text>
								<view class="txt u-flex-col u-col-center u-row-center">
									<text>直降</text>
									<text>¥{{Sprice(item.product_arr.ot_price,item.product_arr.price)}}</text>
								</view>
								<text class="small">¥{{item.product_arr.ot_price}}</text>
							</view>
							<view class="pricebox u-flex u-row-center">
								<text>拼团价</text>
								<text class="price">¥{{item.product_arr.price}}</text>
							</view>
						</view>
					</view>
				</view>
			</block>
			<view class="emptybox u-flex u-row-center" v-else>暂无数据</view>
		</view>
		<view class="alert_modal" v-if="show">
			<view class="modalbox u-flex u-row-center">
				<view class="alertbox">
					<u-gap height="195"></u-gap>
					<view class="titbox">
						<view class="u-flex u-row-center">离开当前页面就领不到<image src="/static/images/activity/hb.png" mode="aspectFit" style="width: 93rpx;height: 93rpx;"></image>了哦～</view>
					</view>
					<view class="list">
						<scroll-view class="scrollbox" enable-back-to-top scroll-y>
							<view class="item u-flex" v-for="(item,index) in list" :key="index" v-if="item.product_arr">
								<u-image :src="item.product_arr.image" width="111" height="111" border-radius="12"></u-image>
								<view class="info">
									<view class="title u-line-1">{{item.product_arr.name}}</view>
									<view class="tag">{{item.product_arr.people}}人团</view>
									<view class="u-flex">
										<text class="price u-flex-1">{{item.product_arr.price}}</text>
										<button class="u-reset-button qbtn" @click="goDetail(item.product_id)">抢</button>
									</view>
								</view>
							</view>
						</scroll-view>
					</view>
					<view class="ftbtnbox u-flex u-row-center">
						<button class="u-reset-button cancelbtn" @click="onCancel">放弃</button>
						<button class="u-reset-button confirmbtn" @click="show=false">继续拼团</button>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import searchBox from '@/components/search-box/search-box.vue';
	import proList from '../components/shoplist/prolist.vue';
	export default{
		components:{
			searchBox,
			proList
		},
		computed:{
			Sprice(){
				return function(oprice,price){
					return parseFloat(oprice) - parseFloat(price);
				}
			}
		},
		data(){
			return{
				people:"13545345",
				category_index: 0,
				scroll_category_index: 'scroll_category_index_0',
				categorys_index: 0,
				scroll_categorys_index: 'scroll_categorys_index_0',
				category:[], //分类
				subnav:[], //子类
				show:false,
				list:[],
				page:1
			}
		},
		methods:{
			goSearch(){
				this.$u.route('pages/library/search/index');
			},
			loadData(){
				this.$http.getPink_peopleCount().then((res)=>{
					if(res.code==200){
						this.people = res.data.people;
					}else{
						this.people = this.$u.random(100000, 13545345);
					}
				})
				this.$http.getGift().then((res)=>{
					if(res.data.length){
						this.category = res.data;
						uni.setStorageSync("tag",res.data[0].tag);
						if(res.data[0].category){
							this.subnav = res.data[0].category;
							this.getPlist(res.data[0].category[0].category_id);
						}else{
							this.getPlist(res.data[0].id);
						}
					}
				})
			},
			/*切换导航*/
			categoryChange(data,index) {
				uni.setStorageSync("tag",data.tag);
				this.subnav = [];
				if(data.category){
					this.subnav = data.category;
					this.getPlist(data.category[0].category_id);
				}else{
					this.getPlist(data.id);
				}
				this.category_index = index;
				var nextIndex = index - 1;
				nextIndex = nextIndex <= 0 ? 0 : nextIndex;
				this.scroll_category_index = `category_index-${nextIndex}`; //动画滚动,滚动至中心位置
			},
			categorysChange(id,index) {
				this.categorys_index = index;
				var nextIndex = index - 1;
				nextIndex = nextIndex <= 0 ? 0 : nextIndex;
				this.scroll_categorys_index = `categorys_index-${nextIndex}`;
				this.getPlist(id);
			},
			getPlist(id){
				this.list = [];
				this.$http.giftProduct(id).then((res)=>{
					let data = res.data.data;
					this.list = data;
				})
			},
			//产品详情
			goDetail(id){
				this.$u.route('pages/library/goods/detail',{id:id,type:1});
			},
			//返回
			onBack(){
				if(this.list.length){
					this.show = true;
				}else{
					uni.navigateBack();
				}
			},
			onCancel(){
				this.show = false;
				uni.navigateBack();
			}
		},
		onLoad(){
			this.loadData();
		}
	}
</script>
<style lang="scss" scoped>
	.slotwrap{
		width: 320rpx;
		margin-right: 30rpx;
	}
	.bannerbox{
		width: 670rpx;
		height: 216rpx;
		margin:65rpx 40rpx 20rpx;
		background: #ffb405;
		border-radius: 10rpx;
		box-shadow: 0rpx 0rpx 12rpx 0rpx rgba(0,0,0,0.16);
		position: relative;
		.img{
			width: 100%;
			height: 216rpx;
		}
		.txt{
			width: 462rpx;
			height: 56rpx;
			line-height: 56rpx;
			font-size: 28rpx;
			color:#FFFFFF;
			font-weight: bold;
			text-align: center;
			background-image:linear-gradient(top,#ff753a,#ffaa87);
			border-radius: 28rpx;
			position: absolute;
			top:-27rpx;
			left:50%;
			transform: translateX(-50%);
			z-index: 20;
			.circle{
				width: 10rpx;
				height: 10rpx;
				background-color: #ffffff;
				border-radius: 50%;
				margin-right: 20rpx;
			}
			.small{
				font-size: 20rpx;
				font-weight: normal;
				margin-left: 28rpx;
			}
		}
	}
	.sban{
		margin: 0 36rpx 36rpx;
	}
	.menu{
		position: relative;
		z-index: 10;
		.category {
			width: 700rpx;
			height: 50rpx;
			padding-bottom:24rpx;
			margin-left: 50rpx;
			position: relative;
			white-space: nowrap;
			.item {
				position: relative;
				display: inline-block;
				margin-right:112rpx;
				height: 50rpx;
				text-align: left;
				&::after {
					content: "";
					width: 0;
					height: 46rpx;
					position: absolute;
					left: 0;
					bottom: 0;
					transition: 0.3s;
				}
				.text {
					padding-top:6rpx;
					font-size: 28rpx;
					color: #999999;
				}
			}
			.current {
				&::after {
					width: 116rpx;
					background: url(/static/images/activity/curbg.png) no-repeat;
					background-size: 100% 100%;
				}
				.text {
					color: #000000;
				}
			}
		}
	}
	.submenu{
		width: 100%;
		padding-bottom: 24rpx;
		white-space: nowrap;
		.item{
			font-size: 24rpx;
			color:#CCCCCC;
			padding-bottom: 12rpx;
			position: relative;
			text-align: center;
			display: inline-block;
			width: 33.3%;
			&::after {
				content: "";
				width: 0;
				height: 8rpx;
				background: #ffb405;
				border-radius: 50%;
				position: absolute;
				left: 50%;
				bottom: 0;
				transform: translateX(-50%);
				transition: 0.3s;
			}
			&.current {
				color: #FFB405;
				&::after{
					width: 8rpx;
				}
			}
		}
	}
	.emptybox{
		width: 100%;
		height: 400rpx;
		font-size: 24rpx;
	}
	.pbg{
		position: absolute;
		top:0;
		left: 0;
		z-index: 20;
		width: 100%;
	}
	.prolist{
		padding:30rpx 34rpx;
		position: relative;
		&.default{
			padding:0 34rpx 30rpx;
			background: #ffb405;
			min-height: 900rpx;
		}
		.proitem{
			background-color: #ffffff;
			border-radius: 20rpx;
			box-shadow: 0rpx 6rpx 20rpx 0rpx rgba(0,0,0,0.05);
			padding:26rpx 36rpx 26rpx 28rpx;
			margin-bottom: 20rpx;
			position: relative;
			z-index: 50;
			.picwrap{
				width: 222rpx;
				height: 222rpx;
			}
			.info{
				margin-left: 26rpx;
				.tits{
					height: 70rpx;
					overflow: hidden;
				}
				.tag{
					display: inline-block;
					margin-right: 10rpx;
					padding:0 12rpx;
					height: 28rpx;
					line-height: 28rpx;
					font-size: 20rpx;
					color:#FF5027;
					background-color: #ffede9;
					border-radius: 14rpx;
				}
				.title{
					font-size: 24rpx;
					clor:#000000;
				}
				.sale_price{
					padding-top: 20rpx;
					margin-left: 20rpx;
					font-size: 20rpx;
					color:#999999;
					background:url(/static/images/activity/pbg.png) no-repeat center bottom;
					background-size: 100%;
					.small{
						height: 28rpx;
						line-height: 28rpx;
					}
					.txt{
						font-size: 20rpx;
						color: #000000;
						margin-bottom: 8rpx;
						width: 100rpx;
						height: 71rpx;
						background:url(/static/images/activity/down.png) no-repeat;
						background-size: 100%;
					}
				}
				.pricebox{
					font-size: 20rpx;
					color:#999999;
					margin-top: 17rpx;
					.price{
						margin-left: 10rpx;
						font-size: 24rpx;
						color:#000000;
						font-weight: bold;
					}
				}
			}
		}
	}
	.alert_modal{
		position: fixed;
		top:0;
		left: 0;
		z-index: 50;
		width: 100%;
		height: 100%;
		background:rgba(0,0,0,0.5);
		.modalbox{
			width: 100%;
			height: 100%;
		}
	}
	.alertbox{
		width: 600rpx;
		height: 981rpx;
		background: url(/static/images/activity/hym.png) no-repeat;
		background-size: 100% 100%;
		.titbox{
			font-size: 32rpx;
			color:#FF4545;
			font-weight: bold;
			text-align: center;
			margin-bottom: 18rpx;
		}
		.list{
			width: 530rpx;
			height: 475rpx;
			margin: 60rpx 41rpx 0 27rpx;
			overflow: hidden;
			display: flex;
			.scrollbox{
				width: 100%;
				height: 100%;
				flex:1;
			}
			.item{
				padding:10rpx 30rpx 10rpx 22rpx;
				margin-bottom: 10rpx;
				background-color: #ffffff;
				border-radius: 20rpx;
				.info{
					margin-left: 20rpx;
					width: 346rpx;
					.title{
						font-size: 20rpx;
						color:#000000;
						margin-bottom: 10rpx;
					}
					.tag{
						display: inline-block;
						margin-right: 10rpx;
						padding:0 12rpx;
						height: 28rpx;
						line-height: 28rpx;
						font-size: 20rpx;
						color:#FF5027;
						background-color: #ffede9;
						border-radius: 14rpx;
					}
					.price{
						font-size: 24rpx;
						color:#000000;
						&::before{
							content: "¥";
							font-size: 20rpx;
						}
					}
					.qbtn{
						width: 88rpx;
						height: 40rpx;
						line-height: 40rpx;
						text-align: center;
						font-size: 24rpx;
						color:#ffffff;
						background-image:linear-gradient(top,#ff6926,#ffa90a);
						border-radius: 20rpx;
					}
				}
			}
		}
		.ftbtnbox{
			margin-top: 50rpx;
			.cancelbtn{
				width: 167rpx;
				height: 78rpx;
				line-height: 78rpx;
				text-align: center;
				font-size: 28rpx;
				color:#ffffff;
				border:2rpx #ffffff solid;
				border-radius: 39rpx;
				margin-right: 19rpx;
			}
			.confirmbtn{
				width: 290rpx;
				height: 80rpx;
				line-height: 80rpx;
				text-align: center;
				font-size: 28rpx;
				color:#ffffff;
				background: linear-gradient(180deg,#ff6929, #ffb405);
				border-radius: 40rpx;
			}
		}
	}
</style>
