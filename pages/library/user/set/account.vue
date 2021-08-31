<template>
	<view class="container">
		<view class="account_wrap">
			<view class="item u-flex u-row-between">
				<view class="left u-flex">
					<view class="avatar_box">
						<image :src="userInfo.avatar||avatar" mode="aspectFit" class="img"></image>
						<image src="/static/images/user/levels.png" mode="aspectFit" class="level_img"></image>
					</view>
					<view class="info">
						<view class="u-flex">
							<text class="name">{{userInfo.nickname}}</text>
							<view class="level" v-if="userInfo.is_vip==1">
								<text class="num">Lv{{userInfo.level}}</text>
							</view>
						</view>
						<text>{{userInfo.phone}}</text>
					</view>
				</view>
				<u-icon name="/static/images/common/checked.png" size="40"></u-icon>
			</view>
		</view>
		<u-gap height="126"></u-gap>
		<button class="u-reset-button combtn btn_primary" @click="logout">退出当前账号</button>
	</view>
</template>

<script>
	import {mapGetters} from 'vuex';
	export default{
		data(){
			return{
				avatar:"/static/images/user/avatar.png"
			}
		},
		computed: {
			...mapGetters(["isLogin","userInfo"])
		},
		methods:{
			logout(){
				uni.clearStorageSync();
				this.$u.route({
					type:"switchTab",
					url:"pages/user/index"
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
	.account_wrap{
		.item{
			padding:42rpx 42rpx 42rpx 48rpx;
			background-color: #ffffff;
			.avatar_box{
				position: relative;
				width: 78rpx;
				height: 78rpx;
				.img{
					width: 78rpx;
					height: 78rpx;
					border-radius: 50%;
				}
				.level_img{
					width: 24rpx;
					height: 24rpx;
					position: absolute;
					bottom: 0;
					right: 0;
					z-index: 20;
				}
			}
			.info{
				margin-left: 16rpx;
				font-size: 24rpx;
				color:#707071;
				.name{
					font-size: 28rpx;
					color:#000000;
					font-weight: bold;
				}
				.level{
					margin-left: 16rpx;
					width:72rpx;
					height: 29rpx;
					background:url(/static/images/user/level.png) no-repeat;
					background-size: 100% 100%;
					font-size: 20rpx;
					color:#ffffff;
					font-weight: bold;
					text-align: center;
					display: flex;
					align-items: flex-end;
					.num{
						padding-left: 36rpx;
					}
				}
			}
		}
	}
	.btn_primary{
		width:630rpx;
		height: 90rpx;
		line-height: 90rpx;
		border-radius: 45rpx;
		text-align: center;
		font-size: 28rpx;
		color:#ffffff;
		font-weight: bold;
	}
</style>
