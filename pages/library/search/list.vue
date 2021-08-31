<template>
	<view class="container">
		<searchBox :searchVal="seaval" @onSearch="onSearch"></searchBox>
		<view class="tabbox">
			<view class="item" :class="{'on':current==index}" v-for="(item,index) in list" :key="index" @click="tab(index)">
				<text>{{item.name}}</text>
			</view>
		</view>
		<u-sticky offset-top="120" bg-color="#fafbff" h5-nav-height="0" v-if="show">
			<view class="filter" :class="{'on':scrolltop>120}">
				<view class="txt" :class="{'on':cur==index}" v-for="(item,index) in filterlist" :key="index" @click="tabfilter(index,item)">
					<text>{{item.name}}</text>
					<u-icon name="/static/images/index/filetype.png" size="14" class="icon" v-if="index>0"></u-icon>
				</view>
			</view>
		</u-sticky>
		<view class="plist" v-if="show">
			<block v-if="plist.length">
				<view class="item" v-for="(pitem,dindex) in plist" :key="pitem.id" @click="goPdetail(pitem)">
					<view class="picwrap">
						<u-image :src="pitem.image" width="100%" height="324"></u-image>
						<view class="sale" v-if="pitem.discount>0">{{pitem.discount}}折</view>
					</view>
					<view class="title">{{pitem.name}}</view>
					<view class="numberbox">
						<view class="number">
							<u-icon name="/static/images/index/ico_huos.png" size="16" class="icon"></u-icon>
							<text>{{pitem.browse||0}}</text>
						</view>
					</view>
					<view class="price">
						<text>¥{{pitem.price||'0.00'}}</text>
						<text class="old">¥{{pitem.ot_price||'0.00'}}</text>
					</view>
				</view>
			</block>
			<view class="tip u-flex u-row-center" v-else>暂无数据</view>
		</view>
		<view class="slist" v-if="hcshow">
			<block v-if="plist.length">
				<shopList :list="plist" @goDetail="goDetail" @goShop="goShop"></shopList>
			</block>
			<view class="tip u-flex u-row-center" v-else>暂无数据</view>
		</view>
	</view>
</template>

<script>
	import searchBox from '../components/search-box/search.vue';
	import shopList from '@/components/shoplist/shoplist.vue';
	export default{
		components:{
			searchBox,
			shopList
		},
		data(){
			return{
				seaval:"",
				type:"product",//product|商品avtivity|会场
				list: [
					{
						name: '商品'
					},
					{
						name: '会场'
					}
				],
				scrolltop:0,
				current: 0,
				cur:0,
				field:"",//price|价格discount|折扣
				sort:"",//asc升序desc降序
				filterlist:[
					{
						name:"综合",
						show:true
					},
					{
						name:"价格",
						show:true
					},
					{
						name:"折扣",
						show:true
					}
				],
				show:true,
				hcshow:false,
				plist:[],
				currentPage: 1,
				lastPage: 1
			}
		},
		methods:{
			onSearch(val){
				this.seaval = val;
				this.getProlist();
			},
			tab(index) {
				this.current = index;
				if(index==1){
					this.type = "avtivity";
					this.hcshow = true;
					this.show = false;
				}else{
					this.type = "product";
					this.show = true;
					this.hcshow = false;
				}
				this.plist = [];
				this.currentPage = 1;
				this.lastPage = 1;
				this.getProlist();
			},
			tabfilter(index,item){
				this.cur = index;
				this.plist = [];
				if(index==1){
					item.show = !item.show;
					this.field = item.show?"discount":"price";
				}
				if(index==2){
					item.show = !item.show;
					this.sort = item.show?"desc":"asc";
				}
				this.getProlist();
			},
			getProlist(){
				this.$http.search(this.seaval,this.type,this.field,this.sort,this.currentPage,10).then((res)=>{
					this.plist = [...this.plist, ...res.data.data];
					this.lastPage = res.data.last_page;
				})
			},
			//进入会场
			goShop(id){
				this.$u.route('pages/library/index/venue',{id:id,type:1});
			},
			//产品详情
			goPdetail(item){
				let id = item.id;
				if(item.is_cheap==1){
					this.$u.route("pages/library/goods/detail",{id:id,type:2});
					return;
				}
				if(item.is_hot==1){
					this.$u.route("pages/library/goods/detail",{id:id,type:3});
					return;
				}
				if(item.is_new_user==1){
					this.$u.route("pages/library/goods/detail",{id:id,type:4});
					return;
				}
				if(item.from!=""){
					this.$u.route("pages/library/goods/detail",{id:id,type:0});
				}else{
					this.$u.route("pages/library/goods/detail",{id:id,type:1});
				}
			},
			goDetail(id){
				this.$u.route('pages/library/goods/detail',{id:id,type:0});
			},
			//加载更多
			loadMore() {
				if (this.currentPage < this.lastPage) {
					this.currentPage += 1;
					this.getProlist();
				}
			}
		},
		onLoad(option){
			this.seaval = option.keywords;
			this.type = option.type;
			if(option.type=="product"){
				this.current = 0;
				this.show = true;
				this.hcshow = false;
			}else{
				this.current = 1;
				this.show = false;
				this.hcshow = true;
			}
			this.getProlist();
		},
		// 下拉刷新
		onPullDownRefresh() {
			this.plist = [];
			this.currentPage = 1;
			this.lastPage = 1;
			this.getProlist();
			uni.stopPullDownRefresh();
		},
		// 上拉加载
		onReachBottom(){
			this.loadMore();
		}
	}
</script>

<style lang="scss">
	page{background:#ffffff;}
</style>
<style lang="scss" scoped>
	.tabbox{
		padding:42rpx 0 12rpx;
		display: flex;
		.item{
			flex:1;
			display: flex;
			align-items: center;
			justify-content: center;
			font-size: 28rpx;
			color:#cccccc;
			position: relative;
			&.on{
				color:#333333;
				font-weight: bold;
				&::before{
					content:"";
					width: 56rpx;
					height: 4rpx;
					background: #ffcc3a;
					border-radius: 2rpx;
					position: absolute;
					bottom:-10rpx;
					left:50%;
					margin-left: -28rpx;
				}
			}
		}
	}
	.filter{
		width: 100%;
		height: 90rpx;
		background-color:#FAFBFF;
		display: flex;
		align-items: center;
		justify-content: flex-end;
		.txt{
			font-size: 24rpx;
			color:#999999;
			margin-right: 64rpx;
			display: flex;
			align-items: center;
			.icon{
				display: flex;
				margin-left: 10rpx;
			}
			&.on{
				color:#FF6929;
			}
		}
	}
	.plist{
		background:#ffffff;
		padding:36rpx;
		display: flex;
		flex-wrap: wrap;
		.item{
			width: 324rpx;
			display: flex;
			flex-direction: column;
			margin-bottom: 20rpx;
			margin-right: 28rpx;
			background:#ffffff;
			border-radius: 22rpx;
			box-shadow: 0rpx 6rpx 20rpx 0rpx rgba(0,0,0,0.05);
			.picwrap{
				width:324rpx;
				height: 324rpx;
				position: relative;
				.sale{
					width: 92rpx;
					height: 46rpx;
					line-height: 46rpx;
					text-align: center;
					background: url(/static/images/index/salebgs.png) no-repeat;
					background-size: 100% 100%;
					font-size: 22rpx;
					color:#ffffff;
					position: absolute;
					right:26rpx;
					top:0;
					z-index: 20;
				}
			}
			.title{
				margin:16rpx 22rpx 18rpx 20rpx;
				height: 50rpx;
				font-size: 20rpx;
				color:#000000;
			}
			.numberbox{
				display: flex;
				justify-content: flex-end;
				.number{
					display: flex;
					align-items: center;
					margin-bottom: 14rpx;
					background:#FFF0E9;
					border-radius: 16rpx 0rpx 0rpx 16rpx;
					font-size: 24rpx;
					color:#FF6929;
					padding-right: 10rpx;
					.icon{
						display: flex;
						margin:0 7rpx 0 12rpx;
					}
				}
			}
			.price{
				padding:0 0 18rpx 20rpx;
				display: flex;
				align-items: center;
				font-size: 24rpx;
				color:#000000;
				.old{
					color:#CCCCCC;
					margin-left: 20rpx;
					text-decoration:line-through;
				}
			}
			&:nth-child(2n){
				margin-right: 0;
			}
		}
	}
	.slist{
		padding:36rpx 0;
		background: #fafbff;
	}
	.tip{
		width: 100%;
		height: 400rpx;
		font-size: 24rpx;
		color: #000000;
	}
</style>