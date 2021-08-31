<template>
	<view class="codewrap">
		<view class="cardbox">
			<view class="tits">
				<view class="name">
					<text>YOUXIANG VIP</text>
					<u-icon name="/static/images/user/ti.png" size="48" class="icon"></u-icon>
				</view>
				<text class="small">有效期：3天</text>
			</view>
		</view>
		<view class="codebox">
			<view class="tit">兑换码</view>
			<input type="text" v-model="code" class="ipt" placeholder="请输入兑换码" />
			<button class="u-reset-button codebtn" @click="onSubmit">立即兑换</button>
		</view>
		<view class="ntice">
			<view class="tit">兑换条件</view>
			<view>1.仅未开通/为兑换/未被平台赠送过会员的用户享有兑换权益</view>
			<view>2.兑换码每位用户仅可使用一次，不叠加。</view>
		</view>
		<view class="hr"></view>
		<view class="rulecon">
			<view class="tits u-text-center">活动规则</view>
			<view>1.兑换码仅限未开通过优享会员的用户使用，每人仅且能兑换一次，无法叠加，体验有效期自兑换时间起72小时。</view>
			<view>2.优享会员权益请进入会员中心查看。</view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				code:""
			}
		},
		methods:{
			onSubmit(){
				if(this.code==""){
					this.$u.toast("请输入兑换码");
					return false;
				}
				this.$u.toast("兑换失败");
			}
		}
	}
</script>

<style lang="scss" scoped>
	.codewrap{
		padding-top: 24rpx;
		font-size: 24rpx;
		color:#999999;
		.cardbox{
			width: 678rpx;
			height: 198rpx;
			margin:0 auto;
			background: linear-gradient(226deg,#e3c993 6%, #faeac8 22%, #e8cd92 65%, #e3c993 98%);
			border-radius: 40rpx 40rpx 0rpx 0rpx;
			.tits{
				padding:52rpx 56rpx 0;
				font-size: 40rpx;
				color:#000000;
				.name{
					display: flex;
					align-items: flex-end;
				}
				.small{
					font-size: 20rpx;
				}
			}
			.icon{
				margin-left: 20rpx;
			}
		}
		.tit{
			font-size: 32rpx;
			color:#000000;
			margin-bottom: 26rpx;
		}
		.codebox{
			width: 730rpx;
			height: 350rpx;
			margin:-30rpx auto 0;
			padding:40rpx 55rpx;
			background-color: #ffffff;
			border-radius: 20rpx;
			box-shadow: 0rpx 6rpx 20rpx 0rpx rgba(0,0,0,0.05);
			.ipt{
				width: 100%;
				height: 90rpx;
				line-height: 90rpx;
				padding:0 24rpx;
				font-size: 24rpx;
				color:#000000;
				background-color: #fafbff;
				border-radius: 20rpx;
			}
			.codebtn{
				margin-top: 28rpx;
				width: 370rpx;
				height: 80rpx;
				line-height: 80rpx;
				text-align: center;
				font-size: 32rpx;
				color:#000000;
				background: linear-gradient(to right,#f9eed8 25%, #e4cb97);
				border-radius: 40rpx;
			}
		}
		.ntice{
			margin:18rpx 18rpx 0;
			padding:38rpx 44rpx;
			background-color: #ffffff;
			border-radius: 20rpx;
			box-shadow: 0rpx 6rpx 20rpx 0rpx rgba(0,0,0,0.05);
		}
		.hr{
			width: 670rpx;
			height: 2rpx;
			background-color: #f5f5f5;
			margin:50rpx 0;
		}
		.rulecon{
			margin:0 62rpx;
			.tits{
				margin-bottom: 20rpx;
			}
		}
	}
</style>
