<template>
	<view>
		<view class="state-hack"></view>
		<view class="navbarbox u-flex" :style="{'color':fontColor,'background-color':bgColor,'border-color':borderColor}">
			<view class="u-flex" @click="goBack">
				<u-icon name="arrow-left" size="34" :color="iconColor"></u-icon>
			</view>
			<text class="title">{{title}}</text>
			<view class="slot_right" @click="eventClick">{{subtitle}}</view>
		</view>
		<u-gap height="120"></u-gap>
	</view>
</template>

<script>
	export default{
		props:{
			title:{
				type:String,
				default:""
			},
			subtitle:{
				type:String,
				default:""
			},
			iconColor:{
				type:String,
				default:"#ffffff"
			},
			bgColor:{
				type:String,
				default:"#000000"
			},
			borderColor:{
				type:String,
				default:"#1a1a1a"
			},
			fontColor:{
				type:String,
				default:"#ffffff"
			},
			// 自定义返回逻辑
			customBack: {
				type: Function,
				default: null
			}
		},
		data(){
			return{}
		},
		computed: {
			navbarHeight() {
				let height = uni.getSystemInfoSync().platform == 'ios' ? 44 : 48;
				return height;
			}
		},
		methods:{
			goBack() {
				// 如果自定义了点击返回按钮的函数，则执行，否则执行返回逻辑
				if (typeof this.customBack === 'function') {
					// 在微信，支付宝等环境(H5正常)，会导致父组件定义的customBack()函数体中的this变成子组件的this
					// 通过bind()方法，绑定父组件的this，让this.customBack()的this为父组件的上下文
					this.customBack.bind(this.$u.$parent.call(this))();
				} else {
					uni.navigateBack();
				}
			},
			eventClick(){
				this.$emit("eventClick");
			}
		}
	}
</script>

<style lang="scss" scoped>
	.navbarbox{
		position: fixed;
		top:0;
		left: 0;
		z-index: 999;
		width: 100%;
		padding:120rpx 30rpx 0;
		border-bottom-width: 2px;
		border-style: solid;
		.title{
			font-size: 34rpx;
			flex:1;
			text-align: center;
		}
		.slot_right{
			font-size: 24rpx;
		}
	}
</style>
