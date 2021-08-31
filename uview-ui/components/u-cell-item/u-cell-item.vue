<template>
	<view @tap="click" class="u-cell" hover-stay-time="150" :hover-class="hoverClass">
		<view class="u-cell_title">
			<block v-if="title !== ''">{{ title }}</block>
		</view>
		<view class="u-cell_right">
			<view class="u-cell_value">
				<block v-if="value !== ''">{{ value }}</block>
				<slot v-else></slot>
			</view>
			<u-icon v-if="arrow" name="arrow-right" size="18" color="#999999"></u-icon>
		</view>
	</view>
</template>

<script>
/**
 * cellItem 单元格Item
 * @description cell单元格一般用于一组列表的情况，比如个人中心页，设置页等。搭配u-cell-group使用
 * @tutorial https://www.uviewui.com/components/cell.html
 * @property {String} title 左侧标题
 * @property {String} icon 左侧图标名，只支持uView内置图标，见Icon 图标
 * @property {Object} icon-style 左边图标的样式，对象形式
 * @property {String} value 右侧内容
 * @property {String} label 标题下方的描述信息
 * @property {Boolean} border-bottom 是否显示cell的下边框（默认true）
 * @property {Boolean} border-top 是否显示cell的上边框（默认false）
 * @property {Boolean} center 是否使内容垂直居中（默认false）
 * @property {String} hover-class 是否开启点击反馈，none为无效果（默认true）
 * // @property {Boolean} border-gap border-bottom为true时，Cell列表中间的条目的下边框是否与左边有一个间隔（默认true）
 * @property {Boolean} arrow 是否显示右侧箭头（默认true）
 * @property {Boolean} required 箭头方向，可选值（默认right）
 * @property {Boolean} arrow-direction 是否显示左边表示必填的星号（默认false）
 * @property {Object} title-style 标题样式，对象形式
 * @property {Object} value-style 右侧内容样式，对象形式
 * @property {Object} label-style 标题下方描述信息的样式，对象形式
 * @property {String} bg-color 背景颜色（默认transparent）
 * @property {String Number} index 用于在click事件回调中返回，标识当前是第几个Item
 * @property {String Number} title-width 标题的宽度，单位rpx
 * @example <u-cell-item icon="integral-fill" title="会员等级" value="新版本"></u-cell-item>
 */
export default {
	name: 'u-cell-item',
	props: {
		// 左侧标题
		title: {
			type: [String, Number],
			default: ''
		},
		// 右侧内容
		value: {
			type: [String, Number],
			default: ''
		},
		// 多个cell中，中间的cell显示下划线时，下划线是否给一个到左边的距离
		// 1.4.0版本废除此参数，默认边框由border-top和border-bottom提供，此参数会造成干扰
		// borderGap: {
		// 	type: Boolean,
		// 	default: true
		// },
		// 是否开启点击反馈，即点击时cell背景为灰色，none为无效果
		hoverClass: {
			type: String,
			default: 'u-cell-hover'
		},
		// 是否显示右侧箭头
		arrow: {
			type: Boolean,
			default: true
		},
		// 用于识别被点击的是第几个cell
		index: {
			type: [String, Number],
			default: ''
		}
	},
	data() {
		return {};
	},
	methods: {
		click() {
			this.$emit('click', this.index);
		}
	}
};
</script>

<style lang="scss" scoped>
@import "../../libs/css/style.components.scss";
.u-cell {
	/* #ifndef APP-NVUE */
	box-sizing: border-box;
	/* #endif */
	background-color: #ffffff;
	border-radius: 12rpx;
	margin-bottom:16rpx;
	padding:24rpx 24rpx 24rpx 30rpx;
	display: flex;
	align-items: center;
	justify-content: space-between;
	&_title {
		font-size: 28rpx;
		color:#333333;
	}
	&_value{
		color:#999999;
		margin-right: 16rpx;
	}
	&_right{
		display: flex;
		align-items: center;
	}
}
</style>
