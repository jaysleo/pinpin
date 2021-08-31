<template>
	<view class="buildwrap u-flex-col u-col-center u-row-center">
		<image src="/static/images/common/build.png" mode="aspectFit" style="width: 312rpx;height: 258rpx;"></image>
		<text class="tit">正在努力开发，敬请期待！</text>
	</view>
</template>

<script>
	export default{
		name:"build-modal",
		props:{},
		data(){
			return{}
		}
	}
</script>

<style lang="scss" scoped>
	.buildwrap{
		background-color: #ffffff;
		height: 500rpx;
		.tit{
			font-size: 28rpx;
			color:#000000;
			margin:50rpx 0;
		}
	}
</style>
