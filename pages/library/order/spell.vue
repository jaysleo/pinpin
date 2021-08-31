<template>
	<view class="container">
		<view class="spellwrap">
			<view class="tabbox">
				<tab-box :list="tablist" :cur="cur" @change="tabchange"></tab-box>
			</view>
			<view class="packetbox u-flex" v-if="list.length && take==1">
				<text class="u-flex-1">尊敬的优享会员，您当前有{{list.length}}个红包待领取</text>
				<button class="u-reset-button hbtn" @click="onPacket">一键领取</button>
			</view>
			<view class="order_list comorder" v-if="list.length">
				<block v-if="status!=2">
					<view class="order_item othitem u-rela" v-for="(item,index) in list" :key="index">
						<view class="hd u-flex">
							<view class="u-flex u-flex-1">
								<u-icon name="/static/images/common/slogo.png" size="28"></u-icon>
								<text class="time small">{{item.add_time}}</text>
							</view>
							<view class="status">{{getStatus(item.status)}}</view>
						</view>
						<view class="bd u-flex u-col-top">
							<u-image :src="item.product.image" width="130" height="130" border-radius="10"></u-image>
							<view class="info u-flex-col u-flex-1">
								<view class="title">{{item.product.name}}</view>
								<view class="u-flex">
									<text class="price">¥{{item.product.price}}</text>
									<text class="sprice small">¥{{item.product.ot_price}}</text>
								</view>
							</view>
						</view>
						<view class="orderno u-flex" v-if="item.trade_no">
							<text>拼团编号：{{item.trade_no}}</text>
							<view class="icopy" @click="copyCode(item.trade_no)">复制</view>
						</view>
						<view class="ft u-flex-col" v-if="status==1">
							<view class="ptnum u-flex">
								<text v-if="item.need_people==0">已满员等待开团</text>
								<text v-else>当前拼团人数{{item.total_people-item.need_people}}/{{item.total_people}}</text>
								<view class="avatar_group u-flex u-flex-1">
									<u-avatar :src="ditem" size="34" class="cu_avatar" v-for="(ditem,dindex) in item.avatar_list" :key="dindex"></u-avatar>
									<view class="dot" v-if="item.avatar_list.length>5">...</view>
								</view>
								<view class="more" @click="goDetail(item)">
									<text>查看详情</text>
									<u-icon name="arrow-right" size="21" color="#F27534" class="icon"></u-icon>
								</view>
							</view>
							<view class="time small">开奖剩余时间：{{item.team_stop_time|date('hh:MM:ss')}}</view>
						</view>
						<view class="redpacket" @click="onPacket(item.id)" v-if="take==1">
							<u-image src="/static/images/user/redpaper.png" width="66" height="70"></u-image>
						</view>
					</view>
				</block>
				<block v-else>
					<view class="oitem u-flex-col" v-for="(item,index) in plist" :key="index">
						<view class="hd u-flex">
							<view class="left u-flex-col">
								<view class="title">【{{item.title}}】已拼中{{item.count}}件</view>
								<view class="timebox u-flex-col">
									<text>起：{{item.start_time||'-'}}</text>
									<text>止：{{item.end_time||'-'}}</text>
								</view>
							</view>
							<view class="picbox u-flex u-flex-wrap">
								<u-image :src="ditem" width="80" height="80" class="img" v-for="(ditem,dindex) in item.img" :key="dindex"></u-image>
							</view>
						</view>
						<view class="ft u-flex">
							<view class="left u-flex u-flex-1">
								<text>寄售：{{item.sell_num}}</text>
								<text class="last">发货：{{item.deliver_num}}</text>
							</view>
							<view class="btnbox u-flex">
								<button class="u-reset-button toolbtn detail_btn" @click="allDelivery(item)">全部发货</button>
								<button class="u-reset-button toolbtn save_btn" @click="gopDetail(item)">查看商品</button>
							</view>
						</view>
					</view>
				</block>
			</view>
			<view class="emptybox u-flex-col u-row-center" v-else>
				<u-empty text="暂无数据" color="#999999" icon-size="364" src="/static/images/common/no_data.png"></u-empty>
			</view>
			<u-loadmore v-if="empty" height="80rpx" :status="loadStatus" icon-type="flower" color="#ccc" />
		</view>
		<view class="at_curtain" v-if="packetShow">
			<view class="curtain_content">
				<view class="u-rela">
					<view class="bg">
						<u-image src="/static/images/index/packet.png" width="496" height="622"></u-image>
					</view>
					<view class="curtain_body u-flex-col u-col-center">
						<u-gap height="256"></u-gap>
						<view class="text">拼团获现金奖励红包 点击领取</view>
						<view class="open" @click="packetOpen">
							<u-image src="/static/images/common/popen.png" width="118" height="118"></u-image>
						</view>
						<view class="small">红包奖励金额与广告推荐内容、观看行为有关</view>
					</view>
				</view>
				<view class="curtain_btnclose" @click="packetShow=false">
					<u-image src="/static/images/common/pclose.png" width="63" height="63"></u-image>
				</view>
			</view>
		</view>
		<curtain :visible.sync="pshow">
			<view class="u-rela">
				<view class="bg">
					<u-image src="/static/images/index/packed.png" width="496" height="545"></u-image>
				</view>
				<view class="packetcon">
					<u-gap height="65"></u-gap>
					<view class="titbox u-flex-col">
						<view class="text">恭喜您获得</view>
						<text class="small">现金红包</text>
					</view>
					<view class="price">{{money}}</view>
					<view class="stip">可在【我的-收益中心】中查看</view>
					<u-gap height="94"></u-gap>
					<button class="u-reset-button savebtn" @click="onSave">
						<text class="u-rela">开心收下</text>
					</button>
				</view>
			</view>
		</curtain>
	</view>
</template>

<script>
	import tabBox from "../components/tabbox/tabbox.vue"
	import curtain from '../components/curtain/curtain.vue';
	export default{
		components:{
			tabBox,
			curtain
		},
		data(){
			return{
				tablist:[
					{
						id:1,
						name:"拼团中"
					},
					{
						id:3,
						name:"未成团"
					},
					{
						id:2,
						name:"拼团成功"
					},
					{
						id:4,
						name:"拼团失败"
					},
					{
						id:0,
						name:"待领取"
					}
				],
				money:0,
				packetShow:false,
				pshow:false,
				status:0,
				cur:0,
				take:0,
				list:[],
				plist:[],
				empty:false,
				loadStatus:'loadmore',
				currentPage: 1,
				lastPage: 1
			}
		},
		methods:{
			getStatus(status){
				let val = this.tablist.filter(item=>item.id==status);
				return val[0].name;
			},
			loadData(){
				this.getOrderList();
			},
			tabchange(val){
				this.status = val;
				this.list = [];
				this.plist = [];
				this.currentPage = 1;
				this.lastPage = 1;
				if(val==0){
					this.take = 1;
				}
				if(val==2){
					this.getsucOrder();
					return false;
				}
				this.getOrderList();
			},
			//订单
			getOrderList(){
				this.loadStatus = 'loading';
				this.$http.pinorderlist(this.status,this.take,this.currentPage,10).then((res)=>{
					this.list = [...this.list, ...res.data.data];
					this.empty = this.list.length?true:false;
					this.lastPage = res.data.last_page;
					this.loadStatus = this.currentPage < res.data.last_page ? 'loadmore' : 'nomore';
				})
			},
			//拼成功订单
			getsucOrder(){
				this.$http.getPinksuc().then((res)=>{
					this.plist = [...this.plist, ...res.data];
					this.list.length = this.plist.length;
					this.empty = this.plist.length?true:false;
				})
			},
			//复制
			copyCode(num){
				this.$tools.copyCode(num);
			},
			//订单详情
			goDetail(data){
				this.$store.commit("setpDetail",data);
				this.$u.route("pages/library/order/spellDetail");
			},
			//拼详情
			gopDetail(data){
				this.$store.commit("setpGoods",data);
				this.$u.route("pages/library/order/spellGoods");
			},
			allDelivery(data){
				let ids = [];
				if(data.img.length){
					this.$http.getPinksucdetail(data.tag,this.currentPage,10).then((res)=>{
						if(res.data){
							this.list = [...this.list, ...res.data.data];
							this.lastPage = res.data.last_page;
							if(this.list.length){
								this.list.forEach((item)=>{
									ids.push(item.id);
								})
								let nids = ids.join(",");
								this.$http.deliveryOrder(nids,1,data.tag).then((res)=>{
									if(res.code==200){
										this.$u.toast("发货成功");
									}else{
										this.$u.toast(res.msg);
									}
								})
							}
						}
					})
				}else{
					this.$u.toast("没有商品，暂时不能发货");
				}
			},
			//加载更多
			loadMore() {
				if (this.currentPage < this.lastPage) {
					this.currentPage += 1;
					if(this.status==2){
						this.getsucOrder();
					}else{
						this.getOrderList();
					}
				}
			},
			//领取红包
			onPacket(id){
				this.$http.getOrder_redbag(id).then((res)=>{
					if(res.code==200){
						this.money = res.data.money;
						this.packetShow = true;
					}else{
						this.$u.toast(res.msg);
					}
				})
			},
			//打开红包
			packetOpen(){
				this.packetShow = false;
				this.pshow = true;
			},
			//收下
			onSave(){
				this.pshow = false;
			}
		},
		onLoad(option){
			if(option.type){
				this.cur = option.type;
				this.status = option.type;
				if(this.status==2){
					this.getsucOrder();
				}else{
					this.getOrderList();
				}
			}
		},
		onShow(){
			this.list = [];
			this.currentPage = 1;
			this.lastPage = 1;
			this.loadData();
		},
		// 下拉刷新
		onPullDownRefresh() {
			this.list = [];
			this.currentPage = 1;
			this.lastPage = 1;
			this.loadData();
			uni.stopPullDownRefresh();
		},
		// 上拉加载
		onReachBottom(){
			this.loadMore();
		}
	}
</script>

<style lang="scss" scoped>
	@import "common/css/list.scss";
	.spellwrap{
		padding:0 20rpx;
		.tabbox{
			padding-left: 20rpx;
		}
		.packetbox{
			margin:6rpx 0 20rpx 0;
			padding:0 8rpx 0 30rpx;
			height: 74rpx;
			background: #333333;
			border-radius: 37rpx;
			font-size: 24rpx;
			color:#FFF4D4;
			.hbtn{
				width: 152rpx;
				height: 58rpx;
				line-height: 58rpx;
				text-align: center;
				font-size: 24rpx;
				color:#8B5401;
				font-weight: bold;
				background: #fff4d4;
				border-radius: 29rpx;
			}
		}
		.order_list{
			.order_item{
				.ft{
					border-top: 1rpx solid #f6f6f6;
					margin-top: 25rpx;
					padding-top: 27rpx;
					.ptnum{
						font-size: 20rpx;
						color:#333333;
					}
					.avatar_group{
						margin-left: 10rpx;
						font-size: 24rpx;
						color:#333333;
						.cu_avatar{
							margin-right: 6rpx;
						}
						.dot{
							margin-bottom: 10rpx;
						}
					}
					.more{
						color:#F27534;
						.icon{
							margin-left: 8rpx;
						}
					}
					.time{
						margin-top: 10rpx;
						padding-bottom: 10rpx;
					}
				}
				.redpacket{
					position: absolute;
					right: 20rpx;
					bottom:18rpx;
					z-index: 100;
				}
			}
			.oitem{
				height: 298rpx;
				padding:0 30rpx 30rpx;
				margin-bottom: 16rpx;
				background: #ffffff;
				border-radius: 10rpx;
				.hd{
					.left{
						margin-top:30rpx;
						margin-right:40rpx;
						.title{
							font-size: 24rpx;
							font-weight: 700;
							color: #333333;
							margin-bottom: 20rpx;
						}
						.timebox{
							width: 340rpx;
							height: 88rpx;
							padding: 16rpx;
							background: #fbfbfb;
							border-radius: 10rpx;
							font-size: 20rpx;
							color:rgba(102,102,102,0.5);
						}
					}
					.picbox{
						padding-top: 10rpx;
						.img{
							margin:10rpx 0 0 10rpx;
						}
					}
				}
				.ft{
					margin-top: 30rpx;
					.left{
						font-size: 24rpx;
						color: #f27534;
						.last{
							margin-left: 20rpx;
						}
					}
				}
			}
		}
	}
	.at_curtain{
		position: fixed;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		background-color: rgba(0,0,0,.5);
		z-index: 1080;
		.curtain_content{
			position: relative;
			width: 100%;
			height: 100%;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			.bg{
				position: absolute;
				top:0;
				left:50%;
				z-index: 20;
				transform: translateX(-50%);
			}
			.curtain_body{
				.text{
					width: 252rpx;
					height: 80rpx;
					font-size: 28rpx;
					color: #fff4d6;
					text-align: center;
				}
				.open{
					margin-top: 78rpx;
					margin-bottom: 46rpx;
					animation: open 0.3s linear 0.5s infinite alternate;
				}
				.small{
					width: 320rpx;
					height: 22rpx;
					opacity: 0.39;
					font-size: 16rpx;
					text-align: center;
					color: #fff4d6;
				}
			}
			.curtain_body,.packetcon{position: relative;z-index: 50;}
			.packetcon{
				width: 432rpx;
				height: 545rpx;
				position: relative;
				.titbox{
					font-size: 30rpx;
					color: #7b4006;
					font-weight: 700;
					text-align: center;
					margin:0 50rpx 40rpx;
					.text{
						background: url(/static/images/index/tbgs.png) no-repeat center center;
						background-size: 100%;
					}
					.small{
						font-size: 20rpx;
						opacity: 0.5;
					}
				}
				.price{
					height: 102rpx;
					font-size: 102rpx;
					color: #ce1628;
					text-align: center;
					margin-bottom: 35rpx;
					&::before{
						content:"￥";
						font-size: 34rpx;
					}
				}
				.stip{
					font-size: 16rpx;
					color: #7b4006;
					text-align: center;
				}
				.savebtn{
					font-size: 28rpx;
					color: #7b4006;
					font-weight: 700;
					text-align: center;
					width: 324rpx;
					height: 96rpx;
					line-height: 96rpx;
					background: linear-gradient(180deg,#ffefc5, #ffbf23);
					border-radius: 48rpx;
					box-shadow: 0rpx 6rpx 12rpx 0rpx rgba(109,0,0,0.16);
					position: relative;
					&::before{
						content: "";
						position: absolute;
						top:10rpx;
						left:12rpx;
						width: 300rpx;
						height: 76rpx;
						background: linear-gradient(180deg,#ffcc3a, #ffe294);
						border-radius: 38rpx;
					}
				}
			}
		}
		.curtain_btnclose{
			width: 63rpx;
			height: 63rpx;
			margin-top: 50rpx;
		}
	}
	.emptybox{
		width: 100%;
		height:500rpx;
	}
	@keyframes open {
		0% {
			-webkit-transform: scale(1);
		}
		100% {
			-webkit-transform: scale(0.9);
		}
	}
</style>
