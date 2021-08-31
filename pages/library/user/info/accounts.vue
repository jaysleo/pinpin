<template>
	<view class="container">
		<view class="accoount_con" v-for="(item,index) in list" :key="index">
			<view class="title">{{item.title}}</view>
			<view class="desc" v-if="item.content">
				<u-parse :html="item.content"></u-parse>
			</view>
		</view>
		<u-gap height="180"></u-gap>
		<view class="ft_tip u-flex safe-area-inset-bottom">
			<view class="icon" @click="isChecks" v-if="!ischeck"></view>
			<view class="icon checked" @click="isChecks" v-else>
				<u-icon name="checkmark-circle-fill" size="24" color="#ff6929"></u-icon>
			</view>
			<text>若您已阅读完以上内容仍选择销户，请点击申请注销</text>
		</view>
		<view class="ftbtn safe-area-inset-bottom">
			<button class="u-reset-button btn_primary disable" v-if="!ischeck">申请注销</button>
			<button class="u-reset-button btn_primary" @click="logout" v-else>申请注销</button>
		</view>
		<modal-tip v-if="show"></modal-tip>
		<u-modal v-model="mshow" :content="tip" confirmText="我知道了"></u-modal>
	</view>
</template>

<script>
	import modalTip from "../../components/modalTip/modalTip.vue";
	export default{
		components:{
			modalTip
		},
		data(){
			return{
				list:[
					{
						title:"注销条件",
						content:"<p>1、账号60天内有订单产生，将不支持注销账号操作。<br/>2、账户存在可提取收益金额。<br/>3、账号下有粉丝，不支持注册账号操作。</p>"
					},
					{
						title:"注销后将失去以下权益",
						content:"<p>1、身份、账户信息、会员权益等将清空且无法恢复。<br/>2、已获得的所有相关佣金和优惠卷等将被清空且无法恢复。<br/>3、已完成的交易将无法处理售后。<br/>4、将无法便捷的查询账号历史交易记录。</p>"
					}
				],
				ischeck:false,
				show:false,
				mshow:false,
				tip:"60天内存在订单交易，无法销户"
			}
		},
		methods:{
			isChecks(){
				this.ischeck = !this.ischeck;
			},
			logout(){
				this.$http.delUser().then((res)=>{
					if(res.code==200){
						this.$u.toast(res.msg);
					}else{
						this.tip = res.msg;
						this.mshow = true;
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.accoount_con{
		background-color: #ffffff;
		padding:40rpx 48rpx;
		margin-top: 20rpx;
		.title{
			font-size: 28rpx;
			color:#000000;
			margin-bottom: 24rpx;
		}
		.desc{
			font-size: 24rpx;
			color:#999999;
		}
	}
	.ft_tip{
		font-size: 24rpx;
		color:#999999;
		position: fixed;
		bottom:180rpx;
		left:0;
		z-index: 50;
		width: 100%;
		.icon{
			margin-left: 48rpx;
			margin-right: 12rpx;
			width: 24rpx;
			height: 24rpx;
			background-color: #ffffff;
			border:2rpx #707070 solid;
			border-radius: 50%;
			&.checked{
				border:0;
				background:none;
			}
		}
	}
</style>
