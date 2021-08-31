<template>
	<view class="container">
		<view class="editwrap">
			<u-input type="text" v-model="value" height="88" class="ipt" placeholder="请输入昵称" />
		</view>
		<u-gap height="140"></u-gap>
		<view class="ftbtn safe-area-inset-bottom">
			<button class="u-reset-button btn_primary" @click="onSumbit">提交</button>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				value:""
			}
		},
		methods:{
			onSumbit(){
				if(this.value==""){
					this.$u.toast("请输入内容");
					return false;
				}
				this.$store.commit("setuInfo",{"nickname":this.value});
				let pram = {
					nickname:this.value
				}
				this.$http.setUserInfo(pram).then((res)=>{
					this.$u.toast("提交成功");
				})
				uni.navigateBack();
			}
		}
	}
</script>

<style lang="scss" scoped>
	.editwrap{
		padding:18rpx 20rpx;
		.ipt{
			/deep/.u-input{
				background-color: #ffffff;
				border-radius: 12rpx;
			}
			/deep/.u-input__input{
				padding-left:30rpx;
			}
		}
	}
</style>
