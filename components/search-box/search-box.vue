<template>
	<view class="searchbox" :style="{'background':bgcolor}" @click="eventClick">
		<u-icon name="/static/images/common/icon_search.png" size="22" class="icon_sea"></u-icon>
		<text class="text">{{placehoder}}</text>
	</view>
</template>

<script>
	export default {
		props:{
			placehoder:{
				type:String,
				default:"搜索商品名称"
			},
			bgcolor:{
				type:String,
				default:"#FFFFFF"
			}
		},
		methods:{
			eventClick(){
				this.$emit("eventClick");
			}
		}
	}
</script>

<style lang="scss" scoped>
	.searchbox{
		width:100%;
		height: 64rpx;
		border-radius: 32rpx;
		font-size: 24rpx;
		color:#CCCCCC;
		display: flex;
		align-items: center;
		.icon_sea{
			display: flex;
			margin-left: 36rpx;
		}
		.text{
			flex:1;
			text-align: center;
		}
	}
</style>
