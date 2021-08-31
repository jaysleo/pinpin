<template>
	<view class="ntabbar u-flex safe-area-inset-bottom">
		<view class="item u-flex-col u-flex-1 u-col-center" :class="{'active':current==index}" v-for="(item,index) in list" :key="index" @click="navTo(item)">
			<image :src="current==index?item.selectedIconPath:item.iconPath" mode="aspectFit"></image>
			<text class="title">{{item.text}}</text>
		</view>
	</view>
</template>

<script>
	export default{
		props: {
			current: {
				type: Number,
				default: 0
			}
		},
		data(){
			return{
				list:[
					{
						pagePath:"/pages/index/index",
						iconPath:"/static/images/common/tab_home.png",
						selectedIconPath: "/static/images/common/tab_homes.png",
						text:"首页"
					},
					{
						pagePath:"/pages/index/category",
						iconPath:"/static/images/common/tab_category.png",
						selectedIconPath: "/static/images/common/tab_categorys.png",
						text:"分类"
					},
					{
						pagePath:"/pages/index/user",
						iconPath:"/static/images/common/tab_user.png",
						selectedIconPath: "/static/images/common/tab_users.png",
						text:"我的"
					}
				]
			}
		},
		methods: {
			navTo(item) {
				uni.switchTab({
					url: item.pagePath
				})
			}
		},
		created() {
			uni.hideTabBar();
		}
	}
</script>

<style lang="scss" scoped>
	.ntabbar{
		width: 100%;
		height: 100rpx;
		background: #ffffff;
		box-shadow: 0rpx 8rpx 28rpx 0rpx rgba(166,179,194,0.30); 
		position: fixed;
		bottom: 0;
		left:0;
		z-index: 50;
		.item{
			font-size: 20rpx;
			color:#999999;
			image{
				width: 50rpx;
				height: 50rpx;
			}
			.title{
				margin-top: 6rpx;
			}
			&.active{
				color:#FF6929;
				image{
					margin-top:-18rpx;
					width: 74rpx;
					height: 74rpx;
				}
			}
		}
	}
</style>
