<template>
	<view class="container">
		<view class="servlist">
			<view class="serv_item">
				<image src="/static/images/common/icon_wechat.png" mode="aspectFit" style="width: 41rpx;height: 41rpx;" class="icon"></image>
				<text class="title">微信联系方式</text>
				<text class="desc">{{wxinNum}}</text>
				<view class="foot" @click="onCopy">
					<text>复制</text>
					<image src="/static/images/common/icon_copy.png" mode="aspectFit" style="width: 24rpx;height: 24rpx;"></image>
				</view>
			</view>
			<view class="serv_item">
				<image src="/static/images/common/icon_phones.png" mode="aspectFit" style="width: 41rpx;height: 41rpx;" class="icon"></image>
				<text class="title">电话号码方式</text>
				<text class="desc">{{phone}}</text>
				<view class="foot" @click="goCall">
					<text>点击拨号</text>
					<u-icon name="phone-fill" size="24" color="#ff6929"></u-icon>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return {
				wxinNum:"",
				phone:""
			}
		},
		methods:{
			async loadData(){
				await this.$http.getwebConfig().then((res)=>{
					this.wxinNum = res.data.kefu_weixin;
					this.phone = res.data.kefu_num;
				})
			},
			//复制
			onCopy(){
				this.$tools.copyCode(this.wxinNum);
			},
			//拨号
			goCall(){
				this.$tools.callPhone(this.phone);
			}
		},
		onLoad(){
			this.loadData();
		}
	}
</script>

<style lang="scss">
	.servlist{
		padding:22rpx 24rpx;
		display: flex;
		.serv_item{
			flex:1;
			display: flex;
			flex-direction: column;
			align-items: center;
			padding:0 46rpx;
			height: 351rpx;
			background: #ffffff;
			border-radius: 18rpx;
			box-shadow: 0rpx 2rpx 4rpx 0rpx rgba(0,0,0,0.16);
			margin-right: 18rpx;
			.icon{
				margin-top:51rpx;
			}
			.title{
				font-size: 24rpx;
				color:#000000;
				font-weight: bold;
				margin-top:16rpx;
			}
			.desc{
				font-size: 24rpx;
				color:#707070;
				margin-top:20rpx;
				margin-bottom: 57rpx;
			}
			.foot{
				border-top: 2rpx solid #e5e5e5;
				display: flex;
				align-items: center;
				justify-content: center;
				width:100%;
				font-size: 24rpx;
				color:#707070;
				padding-top:39rpx;
				image{
					margin-left:19rpx;
				}
			}
			&:last-child{
				margin-right: 0;
			}
		}
	}
</style>