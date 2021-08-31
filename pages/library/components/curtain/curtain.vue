<template>
	<view class="at_curtain" v-if="visible">
		<view class="curtain_content">
			<slot />
			<view class="curtain_btnclose" @click="onClose">
				<u-image src="/static/images/common/pclose.png" width="63" height="63"></u-image>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		props:{
			visible:{
				type:Boolean,
				default:false
			}
		},
		data(){
			return{}
		},
		methods:{
			onClose(){
				this.$emit("update:visible",false);
			}
		}
	}
</script>

<style lang="scss" scoped>
	.at_curtain{
		position: fixed;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		background-color: rgba(0,0,0,.5);
		z-index: 900;
		.curtain_content{
			position: relative;
			width: 100%;
			height: 100%;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			.curtain_btnclose{
				width: 63rpx;
				height: 63rpx;
				margin-top: 50rpx;
			}
		}
	}
</style>
