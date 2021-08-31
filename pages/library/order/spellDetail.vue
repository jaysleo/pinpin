<template>
	<view class="container u-rela">
		<view class="pure_top"></view>
		<view class="spelld_wrap">
			<view class="hdtit">等待开团，预计<text class="num">{{porderInfo.team_stop_time | date('hh:MM:ss')}}</text>进行开团</view>
			<view class="userwrap u-flex-col u-col-top u-row-center">
				<view class="userbox">
					<view class="item u-flex-col u-col-center u-row-center" v-for="(item,index) in porderInfo.avatar_list" :key="index">
						<u-avatar :src="item.avatar" size="114"></u-avatar>
						<text class="name">{{item.name.substr(0,3) + '***'}}</text>
					</view>
				</view>
				<button class="u-reset-button ptbtn" @click="onPink">继续拼团</button>
			</view>
		</view>
		<shop-recommend :list="recomend"></shop-recommend>
	</view>
</template>

<script>
	import {mapGetters,mapState} from 'vuex';
	import shopRecommend from '../components/shop-recommend/shop-recommend.vue';
	export default{
		components:{
			shopRecommend
		},
		computed: {
			...mapGetters(["isLogin","porderInfo"])
		},
		data(){
			return{
				count:0,
				recomend:[] //商品推荐
			}
		},
		methods:{
			loadData(){
				this.$http.getProlist(3,1,10).then((res)=>{
					this.recomend = res.data.data;
				})
			},
			onPink(){
				this.$u.route("/pages/index/index");
			}
		},
		onLoad(){
			this.loadData();
		}
	}
</script>

<style lang="scss" scoped>
	.pure_top{
		width: 100%;
		height: 390rpx;
		position: absolute;
		top:0;
		left:0;
		z-index: 20;
		overflow: hidden;
		&::after{
			content: '';
			width: 140%;
			height: 370rpx;
			position: absolute;
			left: -20%;
			top: 0;
			z-index: -1;
			border-radius: 0 0 50% 50%;
			background: #ff6929;
		}
	}
	.spelld_wrap{
		position: relative;
		z-index: 50;
		.hdtit{
			padding-top:50rpx;
			padding-bottom: 15rpx;
			font-size: 28rpx;
			text-align: center;
			color: #ffffff;
			.num{
				font-weight: bold;
			}
		}
		.userwrap{
			margin:0 30rpx;
			.userbox{
				width: 100%;
				padding:0 60rpx 90rpx;
				background: #ffffff;
				border-radius: 20rpx;
				display: flex;
				flex-wrap: wrap;
				.item{
					width: 33.33%;
					font-size: 24rpx;
					color: #707071;
					margin-top: 64rpx;
					.name{
						margin-top: 10rpx;
					}
				}
			}
			.ptbtn{
				width: 448rpx;
				height: 70rpx;
				line-height: 70rpx;
				font-size: 34rpx;
				color: #ffffff;
				text-align: center;
				background: linear-gradient(90deg,#ffb405, #ff6929);
				border-radius: 35rpx;
				margin-top: -35rpx;
			}
		}
	}
</style>
