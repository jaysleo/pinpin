<template>
	<view class="alertbox" v-if="showModal">
		<view class="alert_modal">
			<view class="bgs"></view>
			<view class="modconbox u-flex-col u-col-center">
				<u-image :lazy-load="false" :fade="false" src="/static/images/common/avatar2.png" width="215" height="208" class="avatar"></u-image>
				<view class="modal_con">
					<block v-if="content">{{content}}</block>
					<block v-else>
						<slot></slot>
					</block>
				</view>
				<button class="u-reset-button btn_primary" @click="confirm">{{btntext}}</button>
				<block v-if="btnClose">
					<u-gap height="110"></u-gap>
					<view class="u-flex u-col-center" @click="close">
						<u-image src="/static/images/common/close2.png" width="50" height="50"></u-image>
					</view>
				</block>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		props:{
			showModal:{
				type:Boolean,
				default:false
			},
			content:{
				type:String,
				default:""
			},
			btntext:{
				type:String,
				default:"立即开通"
			},
			btnClose:{
				type:Boolean,
				default:false
			}
		},
		data(){
			return{}
		},
		methods:{
			close(){
				this.$emit("close");
			},
			confirm(){
				this.$emit("confirm");
			}
		}
	}
</script>

<style lang="scss" scoped>
	.alertbox{
		background: rgba(0,0,0,0.5);
		width: 100%;
		height: 100%;
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		z-index: 999;
		.alert_modal{
			width:586rpx;
			position: fixed;
			top:50%;
			left:50%;
			transform: translate(-50%, -50%);
			z-index: 50;
			.bgs{
				width: 100%;
				height: 320rpx;
				background:#ffffff;
				border-radius: 40rpx;
				position: absolute;
				top:0;
				left: 0;
				z-index: 20;
			}
			.modconbox{
				position: relative;
				z-index: 50;
			}
			.avatar{
				margin-top:-102rpx;
			}
			.modal_con{
				font-size: 28rpx;
				color:#000000;
				padding:30rpx 68rpx 50rpx;
				text-align: left;
			}
			.btn_primary{
				width: 370rpx;
				height: 86rpx;
				line-height: 86rpx;
				text-align: center;
				font-size: 28rpx;
				color:#ffffff;
				background-image: linear-gradient(#ff7124, #ffa60b);
				border-radius: 43rpx;
			}
		}
	}
</style>
