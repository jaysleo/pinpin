<template>
	<view class="container">
		<block v-if="pageShow">
			<view class="veditwrap">
				<block v-if="isVerify">
					<view class="cell u-flex-col">
						<view class="item u-flex">
							<view class="label">手机号</view>
							<input type="text" v-model="ophone" class="ipt" placeholder="请输入手机号" placeholder-style="color:#999999" />
						</view>
						<view class="item u-flex">
							<view class="label">验证码</view>
							<view class="u-flex-1 u-m-r-10">
								<input type="text" v-model="vcode" class="ipt" placeholder="请输入验证码" placeholder-style="color:#999999" />
							</view>
							<view class="send" @click="getVerifyCode">{{verifyText}}</view>
						</view>
					</view>
				</block>
				<view v-else>
					<block v-if="type=='phone'">
						<view class="cell">
							<view class="item u-flex">
								<view class="label">原手机号</view>
								<view class="con">+86 {{userInfo.phone}}</view>
							</view>
						</view>
						<view class="cell u-flex-col">
							<view class="item u-flex">
								<view class="label u-flex" @click="pickerShow = true">
									<text class="code">{{pcode}}</text>
									<u-icon name="arrow-down-fill" size="10" color="#000000" class="icon"></u-icon>
								</view>
								<input type="text" v-model="phone" class="ipt" placeholder="请输入新手机号" placeholder-style="color:#999999" />
							</view>
							<view class="item u-flex">
								<view class="label">验证码</view>
								<view class="u-flex-1 u-m-r-10">
									<input type="text" v-model="code" class="ipt" placeholder="请输入验证码" placeholder-style="color:#999999" />
								</view>
								<view class="send" @click="getVerifyCode">{{verifyText}}</view>
							</view>
						</view>
					</block>
					<block v-if="type=='pwd'">
						<view class="cell">
							<view class="item u-flex">
								<view class="label">原密码</view>
								<view class="u-flex-1 u-m-r-20">
									<input :type="pwdtype" v-model="pwd" class="ipt" />
								</view>
								<view @click="pwdChange(1)">
									<u-icon name="/static/images/user/eyeoff.png" size="36" v-if="ispwd"></u-icon>
									<u-icon name="/static/images/user/eye.png" size="37" v-else></u-icon>
								</view>
							</view>
						</view>
						<view class="cell u-flex-col">
							<view class="item u-flex">
								<view class="label">新密码</view>
								<view class="u-flex-1 u-m-r-20">
									<input :type="pwdtype2" v-model="npwd" class="ipt" placeholder="请输入新密码" placeholder-style="color:#999999" />
								</view>
								<view @click="pwdChange(2)">
									<u-icon name="/static/images/user/eye.png" size="37" v-if="ispwd2"></u-icon>
									<u-icon name="/static/images/user/eyeoff.png" size="36" v-else></u-icon>
								</view>
							</view>
							<view class="item u-flex">
								<view class="label">确认密码</view>
								<input type="password" v-model="respwd" class="ipt" placeholder="请再次输入密码" placeholder-style="color:#999999" />
							</view>
						</view>
					</block>
					<block v-if="type=='verify'">
						<view class="cell u-flex-col">
							<view class="item u-flex">
								<view class="label">真实姓名</view>
								<input type="text" v-model="realname" class="ipt" placeholder="请输入真实姓名" placeholder-style="color:#999999" />
							</view>
							<view class="item u-flex">
								<view class="label">身份证号</view>
								<input type="text" v-model="sfzcode" class="ipt" placeholder="请输入您的身份证号码" placeholder-style="color:#999999" />
							</view>
						</view>
					</block>
				</view>
			</view>
			<u-gap height="140"></u-gap>
			<view class="ftbtn safe-area-inset-bottom">
				<block v-if="isVerify">
					<button class="u-reset-button btn_primary" :class="{'disable':isDisable}" :disabled="isDisable" @click="nextPage">下一步</button>
				</block>
				<block v-else>
					<button class="u-reset-button btn_primary" :class="{'disable':disabled}" :disabled="disabled" @click="onVerify" v-if="type=='verify'">立即认证</button>
					<button class="u-reset-button btn_primary" :class="{'disable':disabled}" :disabled="disabled" @click="onSubmit" v-else>完成</button>
				</block>
			</view>
		</block>
		<modal-tip v-if="show" :modshow="false" :tip="tip"></modal-tip>
		<u-modal v-model="mshow" content="信息填写有误，请确认后重新提交" @confirm="confirm"></u-modal>
		<u-picker mode="selector" v-model="pickerShow" cancel-color="#6F7070" confirm-color="#FF6929" :default-selector="dselector" :range="selectorObj" range-key="cateName" @confirm="confirmVal"></u-picker>
	</view>
</template>

<script>
	import {mapGetters} from 'vuex';
	import modalTip from "../../components/modalTip/modalTip.vue";
	export default{
		components:{
			modalTip
		},
		data(){
			return{
				ophone:"", //原手机号
				phone:"", //手机号
				code:"", //验证码
				pwd:"123456", //密码
				npwd:"", //新密码
				respwd:"", //确认密码
				realname:"", //真实姓名
				sfzcode:"", //身份证号
				//新密码
				pwdtype:"password",
				ispwd:true,
				//确认密码
				pwdtype2:"text",
				ispwd2:true,
				//验证码
				second: 0,
				clockTimer: null,
				//验证手机号
				isVerify:true,
				vcode:"",
				//page类型
				type:"",
				//提示弹框
				show:false,
				tip:"",
				mshow:false, //验证弹框
				pageShow:true,
				//电话选择
				pcode:"+86",
				dselector:[2],
				pickerShow:false,
				selectorObj: [
					{
						cateName: "中国澳门",
						value: "+853"
					},
					{
						cateName: "中国香港",
						value: "+852"
					},
					{
						cateName: "中国",
						value: "+86"
					},
					{
						cateName: "新加坡",
						value: "+65"
					}
				]
			}
		},
		computed:{
			...mapGetters(["isLogin","userInfo"]),
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
			},
			//下一步
			isDisable(){
				if(this.ophone!=""&&this.vcode!=""){
					return false;
				}else{
					return true;
				}
			},
			//提交
			disabled(){
				if(this.type=="phone"){
					if(this.phone!=""&&this.code!=""){
						return false;
					}
				}else if(this.type=="pwd"){
					if(this.npwd!=""&&this.respwd!=""){
						return false;
					}
				}else{
					if(this.realname!=""&&this.sfzcode!=""){
						return false;
					}
				}
				return true;
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
				let phone = "";
				if(this.isVerify){
					phone = this.ophone;
				}else{
					phone = this.phone;
				}
				this.$http.sendSms(phone,"updatemobile").then((res)=>{
					if(res.code==200){
						this.$u.toast("发送成功");
					}else{
						this.$u.toast(res.msg);
					}
				})
			},
			//电话类型选择
			confirmVal(val){
				this.pcode = this.selectorObj[val].value;
				this.dselector = [val];
			},
			//明文密码切换
			pwdChange(index){
				if(index==1){
					if(this.ispwd){
						this.pwdtype = "text";
						this.ispwd = false;
					}else{
						this.pwdtype = "password";
						this.ispwd = true;
					}
				}else{
					if(this.ispwd2){
						this.pwdtype2 = "password";
						this.ispwd2 = false;
					}else{
						this.pwdtype2 = "text";
						this.ispwd2 = true;
					}
				}
			},
			nextPage(){
				this.$u.toast("验证通过");
				this.isVerify = false;
				this.uptitle();
			},
			onSubmit(){
				if(this.type=="phone"){
					if(this.phone==""){
						this.$u.toast("请输入新手机号");
						return false;
					}
					if(this.code==""){
						this.$u.toast("请输入验证码");
						return false;
					}
					this.$http.updatePhone(this.phone,this.code).then((res)=>{
						if(res.code==200){
							this.pageShow = false;
							this.mshow = false;
							this.show = true;
						}else{
							this.$u.toast(res.msg);
						}
					})
				}else{
					if(this.npwd==""){
						this.$u.toast("请输入新密码");
						return false;
					}
					if(this.respwd==""){
						this.$u.toast("请再次输入密码");
						return false;
					}
					if(this.respwd!==this.npwd){
						this.$u.toast("密码不一致，请重新输入");
						return false;
					}
				}
			},
			onVerify(){
				if(this.realname==""){
					this.$u.toast("请输入真实姓名");
					return false;
				}
				if(this.sfzcode==""){
					this.$u.toast("请输入您的身份证号码");
					return false;
				}
				this.mshow = true;
			},
			//更新标题
			uptitle(){
				let title = "";
				if(this.type=="pwd"){
					title = "修改密码";
					this.tip = "密码修改成功";
				}else if(this.type=="phone"){
					title = "更换手机号";
					this.tip = "手机号更换成功";
				}else if(this.type=="verify"){
					title = "实名认证";
					this.tip = "实名认证成功";
				}
				uni.setNavigationBarTitle({
					title: title
				});
			}
		},
		onLoad(option){
			this.type = option.type;
			this.isVerify = this.userInfo.real_name==""?true:false;
			let title = "";
			if(this.isVerify){
				title = "验证手机号";
				uni.setNavigationBarTitle({
					title: title
				});
			}else{
				this.uptitle();
			}
			this.ophone = this.userInfo.phone;
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
	.veditwrap{
		padding-top:20rpx;
		.cell{
			background: #ffffff;
			margin-bottom: 20rpx;
			font-size: 24rpx;
			color: #000000;
			.item{
				padding:0 36rpx 0 48rpx;
				height: 110rpx;
				.label{
					min-width: 120rpx;
					.code{
						padding-right: 25rpx;
					}
				}
				.send{
					color:#FF6929;
				}
				.ipt{
					font-size: 24rpx;
					color: #000000;
				}
			}
		}
	}
</style>
