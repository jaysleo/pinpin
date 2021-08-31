<template>
	<view class="container">
		<view class="biddewrap">
			<view class="buydata u-flex u-row-right" @click="goBuylist">
				<view class="tit">购买记录</view>
			</view>
			<build-modal></build-modal>
			<tabBar current="bidde"></tabBar>
		</view>
	</view>
</template>

<script>
	import buildModal from '../components/buildModal/build-modal.vue';
	import tabBar from '../components/tabbar/tabbar.vue';
	export default{
		components:{
			buildModal,
			tabBar
		},
		data(){
			return {}
		},
		methods:{
			goBuylist(){
				this.$u.route('pages/library/code/buylist');
			}
		}
	}
</script>

<style lang="scss" scoped>
	.biddewrap{
		background-color: #ffffff;
	}
	.buydata{
		padding:32rpx 0;
		.tit{
			width: 188rpx;
			height: 60rpx;
			line-height: 60rpx;
			text-align: center;
			font-size: 24rpx;
			color:#ffffff;
			background:rgba(0,0,0,0.5);
			border-radius: 30rpx 0 0 30rpx;
		}
	}
</style>
