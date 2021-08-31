<template>
	<view class="tabbox u-flex u-row-left">
		<scroll-view class="scrollbox" :scroll-x="true" :scroll-with-animation="true" :scroll-into-view="scroll_status">
			<view class="item" :id="'ostatus-' + index" :class="{'active':ocur==item.id}" v-for="(item,index) in list" :key="index" @click="tabChange(item,index)">{{item.name}}</view>
		</scroll-view>
	</view>
</template>

<script>
	export default{
		name:"tab-box",
		props:{
			list:{
				type:Array,
				default: () => []
			},
			cur:{
				type:Number,
				default:0
			}
		},
		watch:{
			cur(val){
				this.ocur = val;
			}
		},
		data(){
			return{
				ocur:0,
				scroll_status:""
			}
		},
		methods:{
			/*切换导航*/
			tabChange(data,index) {
				this.$emit("tabChange",data);
				this.ocur = data.id;
				var nextIndex = index - 1;
				nextIndex = nextIndex <= 0 ? 0 : nextIndex;
				this.scroll_status = `ostatus-${nextIndex}`; //动画滚动,滚动至中心位置
				this.$emit("change",data.id);
			}
		}
	}
</script>

<style lang="scss" scoped>
	.scrollbox{
		flex:1;
		width: 100%;
	}
	.tabbox{
		padding-left: 20rpx;
		margin:30rpx 0;
		width: 100%;
		white-space: nowrap;
		.item{
			display: inline-block;
			font-size: 24rpx;
			color:#999999;
			margin-right: 62rpx;
			padding-bottom: 4rpx;
			position: relative;
			&.active{
				color: #333333;
				font-weight: bold;
				&::before{
					content:"";
					width: 100%;
					height: 2rpx;
					background: #FF6929;
					position: absolute;
					bottom: 0;
					left: 0;
				}
			}
			&:last-child{
				margin-right: 0;
			}
		}
	}
</style>
