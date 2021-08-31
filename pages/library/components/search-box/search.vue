<template>
	<view class="isearch">
		<view class="seabox">
			<u-search v-model="seaval" input-align="center" bg-color="#fafbff" search-icon-color="#cccccc" placeholder-color="#cccccc" color="#000000" :action-style="seastyle" :show-action="true" action-text="搜索" :animation="true" height="64" :placeholder="placehoder" @search="onSearch" @custom="onSearch" @clear="clearSearch"></u-search>
		</view>
	</view>
</template>

<script>
	export default {
		props:{
			placehoder:{
				type:String,
				default:"搜索商品名称"
			},
			searchVal:{
				type:String,
				default:""
			}
		},
		watch:{
			searchVal(val){
				this.seaval = val;
			}
		},
		data(){
			return{
				seastyle:{
					"width":"132rpx",
					"height": "64rpx",
					"line-height": "64rpx",
					"font-size": "24rpx",
					"color":"#ffffff",
					"background-color":"#FF6929",
					"border-radius":"64rpx",
					"margin-left": "20rpx"
				},
				seaval:""
			}
		},
		methods:{
			onSearch(){
				this.$emit("onSearch",this.seaval);
				this.seaval = "";
			},
			clearSearch(){
				this.seaval = "";
			}
		}
	}
</script>

<style lang="scss">
	.isearch{
		background: #ffffff;
		padding:16rpx 30rpx 16rpx 45rpx;
		display: flex;
		align-items: center;
		.seabox{
			flex:1;
		}
	}
</style>
