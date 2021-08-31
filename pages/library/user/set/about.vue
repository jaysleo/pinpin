<template>
	<view class="container">
		<view class="logobox u-flex-col u-col-center u-row-center">
			<image src="/static/images/common/logo.png" mode="aspectFit" class="logo"></image>
			<view class="txt u-flex-col u-col-center">
				<text>团小团</text>
				<text class="small">V{{version}}</text>
			</view>
		</view>
		<view class="menubox">
			<view class="item" v-for="item in list" :key="item.name" @click="jump(item.url)">
				<text>{{item.name}}</text>
				<u-icon name="arrow-right" size="18" color="#999999"></u-icon>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				list:[
					{
						name:"用户协议",
						url:"pages/library/user/privacy"
					},
					{
						name:"隐私协议",
						url:"pages/library/user/privacy?type=2"
					}
				],
				version:"1.0.0"
			}
		},
		methods:{
			jump(path,parmas){
				this.$u.route({
					url: path,
					params: parmas
				});
			}
		},
		onLoad(){
			let version = uni.getAccountInfoSync().miniProgram.version;
			this.version = version==""?"1.0.0":version;
		}
	}
</script>

<style lang="scss" scoped>
	.logobox{
		width: 100%;
		height: 438rpx;
		.logo{
			width: 120rpx;
			height: 120rpx;
		}
		.txt{
			font-size: 34rpx;
			color:#2E2E2E;
			font-weight: bold;
			margin-top:30rpx;
			.small{
				font-size: 28rpx;
				color:#333333;
				font-weight: normal;
			}
		}
	}
	.menubox{
		margin:0 20rpx;
		.item{
			background-color: #ffffff;
			border-radius: 12rpx;
			margin-bottom: 16rpx;
			padding:24rpx 24rpx 24rpx 30rpx;
			font-size: 28rpx;
			color:#333333;
			display: flex;
			align-items: center;
			justify-content: space-between;
		}
	}
</style>
