<template>
	<view class="address_wrap">
		<uni-swipe-action v-if="list.length">
			<uni-swipe-action-item v-for="(item,index) in list" :key="item.id">
				<view class="address_list" @click="useAddress(item)">
					<view class="left">
						<view class="top">
							<text class="name">{{item.real_name}}</text>
							<text class="phone">{{item.phone}}</text>
						</view>
						<view class="detail">
							<text class="tag" v-show="item.is_default === 1">默认</text>
							<text>{{item.province}}{{item.city}}{{item.area}}{{item.detail}}</text>
						</view>
					</view>
					<view class="right">
						<u-icon name="arrow-right" size="18" color="#999999"></u-icon>
					</view>
				</view>
				<template v-slot:right>
					<view class="slot-button" @click="bindClick('del',index,item.id)">
						<text class="slot-button-text">删除</text>
					</view>
				</template>
			</uni-swipe-action-item>
		</uni-swipe-action>
		<view class="emptybox u-flex-col u-row-center" v-else>
			<u-empty text="暂无收货地址" color="#999999" icon-size="364" src="/static/images/common/no_data.png"></u-empty>
		</view>
		<u-gap height="140"></u-gap>
		<view class="ftbtn safe-area-inset-bottom">
			<button class="u-reset-button btn_primary" @click="useAddress()">添加收货地址</button>
		</view>
	</view>
</template>

<script>
	import { mapGetters } from 'vuex';
	import {toLogin} from '@/utils/login.js';
	export default{
		data(){
			return{
				list:[],
				from:""
			}
		},
		computed: {
			...mapGetters(["isLogin"])
		},
		methods:{
			getUaddress(){
				this.$http.getAddress().then((res)=>{
					this.list = res.data.data;
				})
			},
			bindClick(e,index,id){
				this.$http.delAddress(id).then((res)=>{
					this.$u.toast("删除成功");
					this.list.splice(index,1);
				})
			},
			useAddress(item){
				if(item){
					uni.setStorageSync("Select_Address",{addressData:JSON.stringify(item)});
					this.from = uni.getStorageSync("oback");
					if(this.from=="order"){
						uni.removeStorageSync("oback");
					}
					uni.navigateBack();
				}else{
					this.$u.route("pages/library/user/address/edit");
				}
			}
		},
		onLoad(option) {
			if(option.from){
				uni.setStorageSync("oback",option.from);
			}
			if (this.isLogin) {
				this.getUaddress();
			}else{
				toLogin();
			}
		}
	}
</script>

<style lang="scss" scoped>
	.address_wrap{
		.address_list{
			background-color:#ffffff;
			padding:30rpx;
			display: flex;
			align-items: center;
			flex:1;
			margin:30rpx 40rpx 0;
			.left{
				flex:1;
				display: flex;
				flex-direction: column;
				.top{
					margin-bottom: 20rpx;
					font-size: 24rpx;
					color:#666666;
					.name{
						color:#000000;
						margin-right: 19rpx;
					}
				}
				.detail{
					font-size: 24rpx;
					color:#666666;
					display: flex;
					align-items: center;
					.tag{
						width: 48rpx;
						height: 24rpx;
						line-height: 24rpx;
						text-align: center;
						background: #f27534;
						border-radius: 4rpx;
						font-size: 16rpx;
						color:#ffffff;
						margin-right: 6rpx;
					}
				}
			}
			.right{
				margin-left: 40rpx;
			}
		}
		.slot-button{
			width:116rpx;
			font-size: 28rpx;
			color:#FFFFFF;
			background-color:#E43E3E;
			border-radius: 8rpx 0 0 8rpx;
			margin-top: 30rpx;
			display: flex;
			align-items: center;
			justify-content: center;
		}
		.emptybox{
			height: calc(100vh - 140rpx);
		}
	}
</style>
