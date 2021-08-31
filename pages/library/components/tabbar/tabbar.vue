<template>
	<view class="tabbar_foot">
		<u-gap height="104"></u-gap>
		<view class="tabbar_footbox safe-area-inset-bottom u-flex">
			<view class="tools_item u-flex-col u-row-center u-col-center" v-for="(item,index) in tabbarlist" :key="index" :class="{'active': current == item.path}" @click="jump(item.url)">
				<image class="tool_img" :src="item.image" mode="aspectFit"></image>
				<text class="tool_title">{{item.name}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		props:{
			current:{
				type:String,
				default:"index"
			}
		},
		data(){
			return {
				tabbarlist:[
					{
						name:"靓码",
						image:"/static/images/user/tab_code.png",
						url:"pages/library/code/index",
						path:"index"
					},
					{
						name:"竞价靓码",
						image:"/static/images/user/tab_code2.png",
						url:"pages/library/code/bidde",
						path:"bidde"
					}
				]
			}
		},
		methods:{
			jump(url){
				this.$u.route(url);
			}
		}
	}
</script>

<style lang="scss" scoped>
	.tabbar_footbox{
		width: 100%;
		height: 104rpx;
		background:#ffffff;
		position: fixed;
		bottom: 0;
		left:0;
		right: 0;
		z-index: 50;
		.tools_item{
			font-size: 20rpx;
			color:#999999;
			flex:1;
			.tool_img{
				width: 49rpx;
				height: 49rpx;
			}
			.tool_title{
				margin-top:4rpx;
			}
			&.active{
				color:#000000;
			}
		}
	}
</style>
