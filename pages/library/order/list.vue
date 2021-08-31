<template>
	<view class="container">
		<view class="order_wrap comorder">
			<tab-box :list="tablist" :cur="cur" @change="tabchange"></tab-box>
			<view class="order_list" v-if="list.length">
				<view class="order_item" v-for="(item,index) in list" :key="index" @click="goDetail(item)">
					<view class="hd u-flex">
						<view class="u-flex u-flex-1">
							<u-icon name="/static/images/common/slogo.png" size="28"></u-icon>
							<text class="time small">{{item.add_time}}</text>
						</view>
						<view class="status">{{getStatus(item.status)}}</view>
					</view>
					<view class="bd u-flex u-col-top">
						<u-image :src="item.info.product_detail.image" width="130" height="130" border-radius="10"></u-image>
						<view class="info u-flex-1">
							<view class="u-flex">
								<view class="title">{{item.info.product_detail.name}}</view>
								<view class="u-flex-col u-text-right">
									<text class="price">¥{{item.info.price}}</text>
									<text class="small">x{{item.info.buy_num}}</text>
								</view>
							</view>
							<view class="small">{{item.info.product_detail.attr_info.suk}}</view>
						</view>
					</view>
					<view class="orderno u-flex">
						<text>订单编号：{{item.trade_no}}</text>
						<view class="icopy" @click="copyCode(item.trade_no)">复制</view>
					</view>
					<view class="total u-flex u-row-right">
						<view class="u-flex">
							<text class="small">总价</text>
							<text class="num bold">¥{{item.total_price}}</text>
						</view>
						<view class="tprice u-flex">
							<text>付款</text>
							<text class="num bold">¥{{item.pay_price}}</text>
						</view>
					</view>
					<view class="u-flex">
						<view class="u-flex-1"></view>
						<view class="u-flex" v-if="item.status==1">
							<button class="u-reset-button toolbtn detail_btn" @click.stop="cancelOrder(item.id)">取消订单</button>
							<button class="u-reset-button toolbtn save_btn" @click.stop="goPay(item.trade_no,item.pay_price)">去支付</button>
						</view>
						<view class="u-flex" v-if="item.status==2">
							<button class="u-reset-button toolbtn detail_btn" @click="cfhuo">催发货</button>
							<button class="u-reset-button toolbtn save_btn" @click.stop="againbuy(item)">再次购买</button>
						</view>
						<view class="u-flex" v-if="item.status==3">
							<button class="u-reset-button toolbtn detail_btn">查看物流</button>
							<button class="u-reset-button toolbtn save_btn" @click.stop="receipt(item.id)">确认收货</button>
							<button class="u-reset-button toolbtn save_btn" @click.stop="againbuy(item)">再次购买</button>
						</view>
						<view class="u-flex" v-if="item.status==4">
							<button class="u-reset-button toolbtn detail_btn">查看物流</button>
							<button class="u-reset-button toolbtn save_btn" @click.stop="againbuy(item)">再次购买</button>
						</view>
						<view class="u-flex" v-if="item.status==5">
							<button class="u-reset-button toolbtn detail_btn">删除订单</button>
							<button class="u-reset-button toolbtn save_btn" @click.stop="againbuy(item)">再次购买</button>
						</view>
					</view>
				</view>
			</view>
			<view class="emptybox u-flex-col u-row-center" v-else>
				<u-empty text="暂无数据" color="#999999" icon-size="364" src="/static/images/common/no_data.png"></u-empty>
			</view>
			<u-loadmore v-if="list.length" height="80rpx" :status="loadStatus" icon-type="flower" color="#ccc" />
		</view>
		<select-modal v-model="selshow" @cancel="onCancel"></select-modal>
	</view>
</template>

<script>
	import tabBox from "../components/tabbox/tabbox.vue";
	import selectModal from "../components/select-modal/select-modal.vue";
	export default{
		components:{
			tabBox,
			selectModal
		},
		data(){
			return{
				id:0,
				selshow:false,
				tablist:[
					{
						id:0,
						name:"全部"
					},
					{
						id:1,
						name:"待支付"
					},
					{
						id:2,
						name:"待发货"
					},
					{
						id:3,
						name:"待收货"
					},
					{
						id:4,
						name:"交易成功"
					},
					{
						id:6,
						name:"交易关闭"
					},
					{
						id:7,
						name:"售后"
					}
				],
				status:0,
				cur:0,
				list:[],
				loadStatus:'loadmore',
				currentPage: 1,
				lastPage: 1
			}
		},
		filters:{
			getStatus(status){
				switch(status){
					case 1:
						return "待支付";
					break;
					case 2:
						return "待发货";
					break;
					case 3:
						return "待收货";
					break;
					case 4:
						return "交易成功";
					break;
					case 5:
						return "已取消";
					break;
					case 6:
						return "交易关闭";
					break;
					case 7:
						return "退款中";
					break;
					case 8:
						return "寄售中";
					break;
					case 9:
						return "寄售完成";
					break;
				}
			}
		},
		methods:{
			loadData(){
				this.getOrderList();
			},
			tabchange(val){
				this.status = val;
				this.list = [];
				this.currentPage = 1;
				this.lastPage = 1;
				this.getOrderList();
			},
			getOrderList(){
				this.loadStatus = 'loading';
				this.$http.orderlist(this.status,this.currentPage,10).then((res)=>{
					this.list = [...this.list, ...res.data.data];
					this.lastPage = res.data.last_page;
					this.loadStatus = this.currentPage < res.data.last_page ? 'loadmore' : 'nomore';
				})
			},
			copyCode(num){
				this.$tools.copyCode(num);
			},
			goDetail(data){
				this.$store.commit("setoDetail",data);
				this.$u.route("pages/library/order/detail");
			},
			//取消
			cancelOrder(id){
				this.selshow = true;
				this.id = id;
			},
			onCancel(val){
				this.selshow = false;
				this.$http.cancelOrder(this.id,val).then((res)=>{
					this.$u.toast(res.msg)
				})
			},
			receipt(id){
				this.$http.orderTake(id).then((res)=>{
					this.loadData();
				})
			},
			goPay(orderno,price){
				uni.redirectTo({
					url:"/pages/library/payment/pay?no="+orderno+"&price="+price+"&mtype=1&type=order"
				})
			},
			//催发货
			cfhuo(){
				this.$u.toast("已通知商家发货");
			},
			//再次购买
			againbuy(item){
				let id = item.id;
				let info = item.info.product_detail;
				if(info.is_cheap==1){
					this.$u.route("pages/library/goods/detail",{id:id,type:2});
					return;
				}
				if(info.is_hot==1){
					this.$u.route("pages/library/goods/detail",{id:id,type:3});
					return;
				}
				if(info.is_new_user==1){
					this.$u.route("pages/library/goods/detail",{id:id,type:4});
					return;
				}
				if(item.info.from!=""){
					this.$u.route("pages/library/goods/detail",{id:id,type:0});
				}else{
					this.$u.route("pages/library/goods/detail",{id:id,type:1});
				}
			},
			//加载更多
			loadMore() {
				if (this.currentPage < this.lastPage) {
					this.currentPage += 1;
					this.getOrderList();
				}
			}
		},
		onLoad(option){
			if(option.type){
				this.cur = option.type;
				this.status = option.type;
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
	.order_wrap{
		padding: 0 20rpx;
	}
	.emptybox{
		width: 100%;
		height:500rpx;
	}
</style>
