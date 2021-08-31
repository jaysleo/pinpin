<template v-if="showAuth">
	<view class="container">
		<view class="login_wrap u-flex-col">
			<u-icon name="/static/images/common/close.png" size="25" class="close" @click="close"></u-icon>
			<u-gap height="336"></u-gap>
			<view class="logobox u-flex-col u-col-center u-row-center">
				<u-image src="/static/images/common/logo.png" width="120" height="120" style="margin-bottom: 16rpx;"></u-image>
				<u-image src="/static/images/common/logo_s.png" width="120" height="52"></u-image>
			</view>
			<u-gap height="190"></u-gap>
			<button class="u-reset-button combtn loginbtn" @click="jump('pages/library/login/index')">手机号登录</button>
			<button class="u-reset-button loginbtn wxin" v-if="wshow" @click="GetUserInfo">微信号登录</button>
			<button class="u-reset-button loginbtn wxin" open-type="getPhoneNumber" @getphonenumber="getPhoneNumber" v-if="show">一键绑定手机号码</button>
			<view class="other" @click="jump('pages/library/login/region')">注册账号</view>
			<view class="lint u-flex-wrap">
				登陆即代表同意<view class="txt" @click="jump('pages/library/user/privacy')">《拼拼有礼用户协议》</view>和<view class="txt" @click="jump('pages/library/user/privacy',{type:2})">《拼拼有礼隐私协议》</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	name: 'AuthModal',
	data() {
		return {
			show:false,
			wshow:false
		}
	},
	computed: {},
	watch: {},
	methods: {
		close() {
			this.showAuth = false;
			this.$store.dispatch('showAuthModal', '');
		},
		getPhoneNumber(e){
			console.log(e.detail.errMsg);
			console.log(e.detail.iv);
			console.log(e.detail.encryptedData);
		},
		GetUserInfo(){
			let infoRes = "";
			if(uni.getUserProfile){
				uni.getUserProfile({
					desc:'登录',
					success:(res)=>{
						infoRes = res;
						uni.login({
							provider: 'weixin',
							success:(loginres)=> {
								console.log(loginres)
								console.log(infoRes)
								this.show = true;
								this.wshow = false;
								// uni.request({
								//     url: 'http://xiehui.kaiyikeji.com/api/account/mnplogin',
								//     data: {
								//         code: loginres.code,
								// 		iv:infoRes.iv,
								// 		encrypted_data:infoRes.encryptedData
								//     },
								//     success: (res) => {
								//         console.log(res.data);
								// 		uni.setStorage({key:"token",data:res.data.token});
								//     }
								// });
							}
						});
					},
					fail:(err)=>{
						console.log(err);
					}
				})
			}
		},
		jump(path,parmas){
			this.close();
			this.$u.route({
				url: path,
				params: parmas
			});
		}
	},
	mounted(){}
};
</script>

<style lang="scss" scoped>

</style>
