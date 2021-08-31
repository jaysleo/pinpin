<template>
	<view class="modaltip u-flex-col u-col-center u-row-center">
		<u-image :lazy-load="false" :fade="false" src="/static/images/user/tipsuc.png" width="134" height="254"></u-image>
		<view class="notice u-flex-col u-col-center">
			<block v-if="modshow">
				<text>该账号已失效</text>
				<view>请<text class="light">重新登陆({{second}}s后将自动返回登陆页)</text></view>
			</block>
			<block v-else>
				<text>{{tip}}</text>
				<view><text class="light">({{second}}s后将自动返回)</text></view>
			</block>
		</view>
	</view>
</template>

<script>
	export default{
		props:{
			modshow:{
				type:Boolean,
				default:true
			},
			tip:{
				type:String,
				default:""
			}
		},
		data(){
			return{
				clockTimer: null,
				second: 0
			}
		},
		mounted(){
			this.second = 5;
			this.clockTimer = setInterval(()=> {
				this.second--;
				if (this.second == 0) {
					clearInterval(this.clockTimer);
					this.clockTimer = null;
					if(this.modshow){
						uni.clearStorageSync();
						uni.redirectTo({
							url:"/pages/login/login"
						})
					}else{
						uni.navigateBack();
					}
				}
			}, 1000)
		},
		beforeDestroy() {
			this.second = 0;
			clearInterval(this.clockTimer);
			this.clockTimer = null;
		}
	}
</script>

<style lang="scss" scoped>
	.modaltip{
		width: 100%;
		height: 624rpx;
		position: fixed;
		top:0;
		left:0;
		right:0;
		z-index: 9999;
		background:#ffffff;
		.notice{
			margin-top: 50rpx;
			font-size: 28rpx;
			color:#000000;
			.light{
				color:#FF6929;
			}
		}
	}
</style>
