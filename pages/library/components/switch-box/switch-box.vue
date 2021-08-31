<template>
	<view class="switchbox u-flex u-row-center" :class="[value == true ? 'on' : '', disabled ? 'disabled' : '']" @tap="onClick">
		<block v-if="value==false">
			<view class="icon"></view>
			<text>关</text>
		</block>
		<block v-else>
			<text>开</text>
			<view class="icon"></view>
		</block>
	</view>
</template>

<script>
	/**
	 * switch 开关选择器
	 * @description 选择开关一般用于只有两个选择，且只能选其一的场景。
	 * @tutorial https://www.uviewui.com/components/switch.html
	 * @property {Boolean} loading 是否处于加载中（默认false）
	 * @property {Boolean} disabled 是否禁用（默认false）
	 * @property {String Number} size 开关尺寸，单位rpx（默认50）
	 * @property {String} active-color 打开时的背景色（默认#2979ff）
	 * @property {Boolean} inactive-color 关闭时的背景色（默认#ffffff）
	 * @property {Boolean | Number | String} active-value 打开选择器时通过change事件发出的值（默认true）
	 * @property {Boolean | Number | String} inactive-value 关闭选择器时通过change事件发出的值（默认false）
	 * @event {Function} change 在switch打开或关闭时触发
	 * @example <u-switch v-model="checked" active-color="red" inactive-color="#eee"></u-switch>
	 */
	export default {
		name: "switch-box",
		props: {
			// 是否为禁用装填
			disabled: {
				type: Boolean,
				default: false
			},
			// 通过v-model双向绑定的值
			value: {
				type: Boolean,
				default: false
			},
			// 是否使手机发生短促震动，目前只在iOS的微信小程序有效(2020-05-06)
			vibrateShort: {
				type: Boolean,
				default: false
			},
			// 打开选择器时的值
			activeValue: {
				type: [Number, String, Boolean],
				default: true
			},
			// 关闭选择器时的值
			inactiveValue: {
				type: [Number, String, Boolean],
				default: false
			},
		},
		data() {
			return {}
		},
		methods: {
			onClick() {
				if (!this.disabled) {
					// 使手机产生短促震动，微信小程序有效，APP(HX 2.6.8)和H5无效
					if(this.vibrateShort) uni.vibrateShort();
					this.$emit('input', !this.value);
					// 放到下一个生命周期，因为双向绑定的value修改父组件状态需要时间，且是异步的
					this.$nextTick(() => {
						this.$emit('change', this.value ? this.activeValue : this.inactiveValue);
					})
				}
			}
		}
	};
</script>

<style lang="scss" scoped>
	.switchbox{
		width: 86rpx;
		height: 42rpx;
		background: #ffffff;
		border-radius: 21rpx;
		box-shadow: 0rpx 0rpx 10rpx 0rpx rgba(0,0,0,0.16);
		font-size: 24rpx;
		color: #000000;
		.switch_node {
			position: absolute;
			top: 0;
			left: 0;
			transition: transform 0.3s cubic-bezier(0.3, 1.05, 0.4, 1.05);
		}
		.icon{
			width: 30rpx;
			height: 30rpx;
			border-radius: 30rpx;
			margin-right: 8rpx;
			background: #cccccc;
		}
		&.on{
			.icon{
				background: #e3c993;
				background-image: linear-gradient(#ff7e47, #ffbc9f);
				margin-left:8rpx;
				margin-right: 0;
			}
		}
	}

	.switch--disabled {
		opacity: 0.4;
	}
</style>
