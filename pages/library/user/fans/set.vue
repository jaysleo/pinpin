<template>
	<view class="container">
		<view class="wsetwrap">
			<view class="wsetgroup">
				<view class="cell u-flex u-row-between">
					<text>微信二维码</text>
					<u-upload ref="uUpload" :action="action" :auto-upload="false" width="142" height="142" max-count="1" uploadText=""></u-upload>
				</view>
				<view class="cell u-flex u-row-between">
					<text>微信号</text>
					<input type="text" v-model="wxnum" class="ipt" placeholder-style="color:#999999" placeholder="请输入微信号" />
				</view>
			</view>
			<view class="wsetcon">
				<view class="tit">微信二维码获取教程</view>
				<image src="/static/images/user/wxinfo_1.png" mode="widthFix"></image>
				<image src="/static/images/user/wxinfo_2.png" mode="widthFix"></image>
			</view>
		</view>
		<u-gap height="140"></u-gap>
		<view class="ftbtn safe-area-inset-bottom">
			<button class="u-reset-button btn_primary" @click="onSubmit">提交</button>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				action: 'http://www.example.com/upload',
				wxnum:""
			}
		},
		methods:{
			onSubmit(){
				let list = this.$refs.uUpload.lists;
				if(list.length==0){
					this.$u.toast("请上传图片");
					return false;
				}
				if(this.wxnum==""){
					this.$u.toast("请输入微信号");
					return false;
				}
				this.$refs.uUpload.upload();
			}
		}
	}
</script>

<style lang="scss" scoped>
	.wsetwrap{
		margin:24rpx 20rpx;
		.wsetgroup{
			.cell{
				margin-bottom: 16rpx;
				background: #ffffff;
				border-radius: 10rpx;
				padding:24rpx 30rpx;
				font-size: 28rpx;
				color: #333333;
				.ipt{
					font-size: 28rpx;
					color: #333333;
					text-align: right;
				}
			}
		}
		.wsetcon{
			background: #ffffff;
			border-radius: 10rpx;
			padding:34rpx 0;
			text-align: center;
			.tit{
				font-size: 28rpx;
				color: #333333;
				font-weight: 700;
				margin-bottom: 40rpx;
				text-align: center;
				position: relative;
				&::before{
					content: "";
					position: absolute;
					bottom: 0;
					left: 50%;
					transform: translateX(-50%);
					width: 252rpx;
					height: 16rpx;
					opacity: 0.3;
					background: #ff6929;
				}
			}
		}
	}
</style>
