<template>
	<view class="container">
		<view class="codebg"><image src="/static/images/user/codebg.png" mode="aspectFill"></image></view>
		<view class="codewrap">
			<view class="buydata u-flex u-row-right" @click="goBuylist">
				<view class="tit">购买记录</view>
			</view>
			<view class="titbox u-flex u-flex-col u-col-center">
				<image src="/static/images/user/ctits.png" mode="aspectFit" class="icon"></image>
				<view class="numbox u-flex">
					<text class="txt">我的邀请码</text>
					<view class="num">{{userInfo.uniqid}}</view>
				</view>
			</view>
			<view class="codelist u-flex u-flex-wrap">
				<view class="code_item" v-for="(item,index) in list" :key="index" @click="goBuy(item)">
					<view class="hd u-flex u-row-center">
						<view class="tit">{{item.uniqid_num}}</view>
					</view>
					<view class="ft">立即抢购</view>
				</view>
			</view>
			<view class="u-flex u-row-center" v-if="list.length">
				<view class="code_refresh" @click="refresh">
					<text>换一批</text>
				</view>
			</view>
		</view>
		<tab-bar current="index"></tab-bar>
	</view>
</template>

<script>
	import {mapGetters} from 'vuex';
	import tabBar from '../components/tabbar/tabbar.vue';
	export default{
		components:{
			tabBar
		},
		computed: {
			...mapGetters(["userInfo"])
		},
		data(){
			return {
				list:[]
			}
		},
		methods:{
			loadData(){
				uni.showLoading({
					mask:true
				})
				this.$http.getUniqid().then((res)=>{
					uni.hideLoading();
					this.list = res.data.data;
				})
			},
			goBuylist(){
				this.$u.route('pages/library/code/buylist');
			},
			goBuy(data){
				this.$u.route('pages/library/code/buy', {
					id: data.id,
					number:data.uniqid_num
				});
			},
			//换一批
			refresh(){
				uni.showLoading({
					mask:true
				})
				setTimeout(()=>{
					if(this.list.length){
						this.list = this.$u.randomArray(this.list);
					}
					uni.hideLoading();
				},1000);
			}
		},
		onLoad(){
			this.loadData();
		}
	}
</script>

<style lang="scss" scoped>
	.container{position: relative;}
	.codebg{
		position: absolute;
		top:0;
		left:0;
		z-index: 20;
		width: 100%;
		height: 100vh;
		image{
			width: 100%;
			height: 100%;
		}
	}
	.codewrap{
		position: relative;
		z-index: 50;
		.buydata{
			padding:32rpx 0;
			.tit{
				width: 188rpx;
				height: 60rpx;
				line-height: 60rpx;
				text-align: center;
				font-size: 24rpx;
				color:#ffffff;
				background:rgba(0,0,0,0.5);
				border-radius: 30rpx 0 0 30rpx;
			}
		}
		.titbox{
			.icon{
				width:551rpx;
				height: 107rpx;
			}
			.numbox{
				margin-top:14rpx;
				width:352rpx;
				height: 60rpx;
				line-height: 60rpx;
				font-size: 24rpx;
				color:#8D6FFA;
				background:#ffffff;
				border-radius: 30rpx;
				.txt{
					flex:1;
					text-align: center;
				}
				.num{
					width:188rpx;
					height: 60rpx;
					background:#8D6FFA;
					border-radius: 30rpx;
					color:#FFFFFF;
					text-align: center;
				}
			}
		}
		.codelist{
			margin:60rpx 65rpx 42rpx;
			.code_item{
				width:299rpx;
				margin-right: 24rpx;
				margin-bottom: 36rpx;
				.hd{
					width:100%;
					height: 142rpx;
					background:url(../../../static/images/user/cbg.png) no-repeat;
					background-size: 100% 100%;
					.tit{
						font-size: 40rpx;
						color:#FFFFFF;
						position: relative;
						&::before{
							content: "";
							position: absolute;
							left:50%;
							bottom: -2rpx;
							transform: translateX(-50%);
							width: 156rpx;
							height: 2rpx;
							background:url(../../../static/images/user/ctit.png) no-repeat center bottom;
							background-size: 100% 100%;
						}
					}
				}
				.ft{
					width: 100%;
					height: 54rpx;
					line-height: 54rpx;
					text-align: center;
					font-size: 24rpx;
					color:#8D6FFA;
					font-weight: bold;
					background: #f6f3ff;
					border-radius: 0rpx 0rpx 10rpx 10rpx;
				}
				&:nth-child(2n){
					margin-right: 0;
				}
			}
		}
		.code_refresh{
			width: 206rpx;
			height: 66rpx;
			line-height: 66rpx;
			text-align: center;
			font-size: 24rpx;
			color: #ffffff;
			border:2rpx #ffffff solid;
			border-radius: 66rpx;
		}
	}
</style>
