<template>
	<view class="container">
		<view class="bindwrap">
			<view class="item u-flex">
				<text class="label">姓名</text>
				<input type="text" v-model="name" class="ipt" placeholder="请输入银行卡的真实姓名" />
			</view>
			<view class="item u-flex">
				<text class="label">银行卡号</text>
				<input type="text" v-model="banknumber" class="ipt" placeholder="请输入银行卡号" />
			</view>
			<view class="item u-flex">
				<text class="label">手机号</text>
				<input type="number" v-model="phone" class="ipt" placeholder="请输入手机号" />
			</view>
			<view class="item u-flex">
				<text class="label">验证码</text>
				<input type="text" v-model="code" class="ipt" placeholder="请输入验证码" />
				<view class="send" @click="getVerifyCode">{{verifyText}}</view>
			</view>
		</view>
		<u-gap height="140"></u-gap>
		<view class="ftbtn safe-area-inset-bottom">
			<button class="u-reset-button btn_primary" @click="onSubmit">确认绑定</button>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				form:{
					name:"",
					banknumber:"",
					phone:"",
					code:""
				},
				second: 0,
				clockTimer: null
			}
		},
		computed:{
			verifyText() {
				if (this.second == 0) {
					return '发送验证码';
				} else {
					if (this.second < 10) {
						return '重新发送('+'0' + this.second +'s)';
					} else {
						return '重新发送('+ this.second +'s)';
					}
				}
			}
		},
		methods:{
			//获取验证码
			getVerifyCode() {
				let that = this;
				if (this.second > 0) {
					return;
				}
				this.second = 60;
				this.clockTimer = setInterval(()=> {
					that.second--;
					if (that.second == 0) {
						clearInterval(this.clockTimer);
					}
				}, 1000)
			},
			onSubmit(){
				if(this.form.name==""){
					this.$u.toast("请输入银行卡的真实姓名");
					return false;
				}
				if(this.form.banknumber==""){
					this.$u.toast("请输入银行卡号");
					return false;
				}
				if(this.form.phone==""){
					this.$u.toast("请输入手机号");
					return false;
				}
				if(this.form.code==""){
					this.$u.toast("请输入验证码");
					return false;
				}
			}
		},
		onUnload() {
			clearInterval(this.clockTimer);
			this.clockTimer = null;
			this.second = 0;
		},
		onHide(){
			clearInterval(this.clockTimer);
			this.clockTimer = null;
			this.second = 0;
		}
	}
</script>

<style lang="scss" scoped>
	.bindwrap{
		margin: 30rpx 20rpx;
		background: #ffffff;
		border-radius: 10rpx;
		.item{
			margin:0 37rpx;
			height: 97rpx;
			font-size: 28rpx;
			color:#333333;
			border-bottom: 2rpx solid #f6f6f6;
			.label{
				margin-right: 20rpx;
			}
			.ipt{
				flex:1;
				font-size: 28rpx;
				color:#333333;
				text-align: right;
			}
			.send{
				color:#F27534;
				margin-left: 20rpx;
			}
			&:last-child{
				border-bottom: 0;
			}
		}
	}
</style>
