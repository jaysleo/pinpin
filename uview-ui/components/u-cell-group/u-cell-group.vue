<template>
	<view class="u-cell-box">
		<view class="u-cell-title" v-if="title">{{title}}</view>
		<view class="u-cell-item-box">
			<slot />
		</view>
	</view>
</template>

<script>
	/**
	 * cellGroup 单元格父组件Group
	 * @description cell单元格一般用于一组列表的情况，比如个人中心页，设置页等。搭配u-cell-item
	 * @tutorial https://www.uviewui.com/components/cell.html
	 * @property {String} title 分组标题
	 * @example <u-cell-group title="设置喜好">
	 */
	export default {
		name: "u-cell-group",
		props: {
			// 分组标题
			title: {
				type: String,
				default: ''
			}
		},
		data() {
			return {
				index: 0,
			}
		},
	}
</script>

<style lang="scss" scoped>
	@import "../../libs/css/style.components.scss";
	
	.u-cell-box {
		width: 100%;
		padding:24rpx 20rpx;
	}
	.u-cell-title {
		padding: 30rpx 32rpx 10rpx 32rpx;
		font-size: 30rpx;
		text-align: left;
		color: #000000;
	}
</style>
