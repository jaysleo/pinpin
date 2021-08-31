<template>
	<view class="spellgoods_wrap">
		<view class="ghd comorder">
			<view class="title">【{{spellGood.title}}】已拼中{{spellGood.count}}件</view>
			<view class="timebox u-flex">
				<text class="u-flex-1">起：{{spellGood.start_time||'-'}}</text>
				<text class="u-flex-1">止：{{spellGood.end_time||'-'}}</text>
			</view>
			<view class="ft u-flex">
				<view class="allcheck u-flex u-flex-1" @click="onAllSel">
					<u-icon name="checkmark-circle-fill" size="24" color="#f27534" class="u-m-r-16" v-if="isAllSel"></u-icon>
					<view class="ckicon" v-else></view>
					<text>全选</text>
				</view>
				<view class="btnbox u-flex">
					<button class="u-reset-button toolbtn detail_btn" @click="consignment">寄售</button>
					<button class="u-reset-button toolbtn save_btn" @click="delivery">发货</button>
				</view>
			</view>
		</view>
		<view class="order_list">
			<view class="order_item othitem" v-for="(item,index) in list" :key="index">
				<view class="hd u-flex">
					<view class="u-flex u-flex-1">
						<u-icon name="/static/images/common/slogo.png" size="28"></u-icon>
						<text class="time small">{{item.add_time}}</text>
					</view>
					<view class="status" v-if="item.status==9">已寄售</view>
					<view class="status" v-if="item.status==8">已发货</view>
				</view>
				<view class="bd u-flex">
					<view class="u-flex" @click="checkChange(item)">
						<u-icon name="checkmark-circle-fill" size="24" color="#f27534" class="u-m-r-16" v-if="item.checked"></u-icon>
						<view class="ckicon" v-else></view>
					</view>
					<u-image :src="item.image" width="130" height="130" border-radius="10"></u-image>
					<view class="info u-flex-col u-flex-1">
						<view class="title">{{item.name}}</view>
						<view class="u-flex">
							<text class="price">¥{{item.price||'0.00'}}</text>
							<text class="sprice small">¥{{item.ot_price||'0.00'}}</text>
						</view>
					</view>
				</view>
				<view class="orderno u-flex" v-if="item.trade_no">
					<text>拼团编号：{{item.trade_no||0}}</text>
					<view class="icopy" @click="copyCode(item.trade_no)">复制</view>
				</view>
			</view>
		</view>
		<u-modal v-model="mshow" :content="mcontent" :title="mtitle" :show-cancel-button="true" @confirm="confirm"></u-modal>
		<view class="alertip" v-if="ashow">还未中6次无法进行寄售操作，您可以选择商品进行发货</view>
	</view>
</template>

<script>
	import {mapGetters,mapState} from 'vuex';
	export default{
		computed: {
			...mapGetters(["isLogin"]),
			...mapState({
				spellGood: (state) => state.spellGoods
			})
		},
		data(){
			return{
				mshow:false,
				mcontent:"",
				mtitle:"",
				ashow:false,
				isAllSel: false, //是否全选
				selList: [],
				total:0,
				list:[],
				currentPage: 1,
				lastPage: 1,
				tag:"",
				ids:"",
				ftype:0,
				bradge:0 //0寄1发
			}
		},
		methods:{
			// 单选
			checkChange(e) {
				if(e.checked){
					e.checked = false;
				}else{
					e.checked = true;
					this.selList = e;
				}
				this.isAllSel = this.list.every(item => item.checked);
				let ids = "";
				let val = this.list.filter(item=>item.checked);
				val.forEach(item=>{
					ids.push(item.id);
				})
				this.ftype = this.isAllSel?1:0;
				this.ids = ids.join(",");
			},
			// 全选
			onAllSel() {
				let value = false;
				if(this.isAllSel){
					value = false;
				}else{
					value = true;
				}
				this.isAllSel = value;
				this.selList = [];
				this.list.forEach(item => {
					value && this.selList.push(item.id);
					this.$set(item, 'checked', value);
				});
				this.ftype = this.isAllSel?1:0;
				this.ids = this.selList.join(",");
			},
			//列表
			getList(){
				this.tag = this.spellGood.tag;
				this.$http.getPinksucdetail(this.tag,this.currentPage,10).then((res)=>{
					if(res.data){
						this.list = [...this.list, ...res.data.data];
						this.lastPage = res.data.last_page;
						if(this.list.length){
							this.list.map(item => {
								this.$set(item, 'checked', false);
							});
						}
					}
				})
			},
			//加载更多
			loadMore() {
				if (this.currentPage < this.lastPage) {
					this.currentPage += 1;
					this.getList();
				}
			},
			//复制
			copyCode(code) {
				let that = this;
				uni.setClipboardData({
					data: code,
					success: () => {
						that.$u.toast('已复制到剪切板');
					}
				});
			},
			//寄售
			consignment(){
				if(this.total<6){
					this.ashow = true;
					setTimeout(()=>{
						this.ashow = false;
					},2000)
					return false;
				}
				this.bradge = 0;
				this.mtitle = "确认寄售";
				this.mcontent = "是否确认将选中的商品寄售？";
				this.mshow = true;
			},
			//发货
			delivery(){
				if(this.selList.length==0){
					this.$u.toast("请选择商品");
					return;
				}
				this.bradge = 1;
				this.mtitle = "确认发货";
				this.mcontent = "是否确认将选中的商品发货？";
				this.mshow = true;
			},
			confirm(){
				console.log(this.ids)
				console.log(this.ftype)
				if(this.bradge==1){
					this.$http.deliveryOrder(this.ids,this.ftype,this.tag).then((res)=>{
						if(res.code==200){
							this.$u.toast("发货成功");
							this.getList();
						}else{
							this.$u.toast(res.msg);
						}
					})
				}else{
					this.$http.sellOrder(this.ids).then((res)=>{
						if(res.code==200){
							this.$u.toast("寄售成功");
							this.getList();
						}else{
							this.$u.toast(res.msg);
						}
					})
				}
			}
		},
		onShow(){
			this.getList();
		},
		// 下拉刷新
		onPullDownRefresh() {
			this.list = [];
			this.currentPage = 1;
			this.lastPage = 1;
			this.getList();
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
	.spellgoods_wrap{
		padding:30rpx 20rpx;
		.ckicon{
			width: 24rpx;
			height: 24rpx;
			border: 1rpx solid #d2d2d2;
			border-radius: 50%;
			margin-right: 16rpx;
		}
		.ghd{
			padding:30rpx 20rpx 22rpx;
			margin-bottom: 16rpx;
			background: #ffffff;
			border-radius: 10rpx;
			.title{
				margin-bottom: 20rpx;
				font-size: 24rpx;
				color: #333333;
				font-weight: 700;
			}
			.timebox{
				width: 630rpx;
				height: 60rpx;
				padding: 16rpx;
				background: #fbfbfb;
				border-radius: 10rpx;
				font-size: 20rpx;
				color:rgba(102,102,102,0.5);
			}
			.ft{
				margin-top: 24rpx;
				.allcheck{
					font-size: 24rpx;
					color: #999999;
				}
			}
		}
		.alertip{
			position: fixed;
			bottom:96rpx;
			left: 50%;
			z-index: 100;
			transform: translateX(-50%);
			width: 644rpx;
			height: 74rpx;
			line-height: 74rpx;
			font-size: 24rpx;
			color: #ffffff;
			text-align: center;
			background: #565657;
			border-radius: 10rpx;
		}
	}
</style>
