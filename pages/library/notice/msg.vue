<template>
	<view class="msgwrap">
		<block v-for="(item,index) in list" :key="index">
			<view class="time">{{item.add_time}}</view>
			<view class="u-flex u-col-top">
				<u-image :src="navlist[item.notice_type-1].icon" width="72" height="72"></u-image>
				<view class="con">
					<view class="title">{{item.title}}</view>
					<view class="desc">{{item.content}}</view>
				</view>
			</view>
		</block>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				navlist:[
					{
						type:1,
						icon:"/static/images/notice/tz.png",
						name:"通知消息"
					},
					{
						type:2,
						icon:"/static/images/notice/pt.png",
						name:"拼团消息"
					},
					{
						type:3,
						icon:"/static/images/notice/sy.png",
						name:"收益助手"
					},
					{
						type:4,
						icon:"/static/images/notice/fs.png",
						name:"粉丝消息"
					},
					{
						type:5,
						icon:"/static/images/notice/other.png",
						name:"其他消息"
					}
				],
				list:[]
			}
		},
		onLoad(e){
			let title = this.navlist[e.index].name;
			if(e.data){
				this.list = e.data;
			}
			uni.setNavigationBarTitle({
				title: title
			});
		}
	}
</script>

<style lang="scss" scoped>
	.msgwrap{
		padding:0 32rpx 0 52rpx;
		.time{
			font-size: 24rpx;
			color:#999999;
			padding:24rpx 0;
			text-align: center;
		}
		.con{
			background: #ffffff;
			border-radius: 16rpx;
			padding:22rpx 24rpx 27rpx 34rpx;
			margin-left: 32rpx;
			position: relative;
			.title{
				font-size: 28rpx;
				color:#000000;
				margin-bottom: 40rpx;
			}
			.desc{
				font-size: 24rpx;
				color:#999999;
				word-wrap: break-word;
				word-break: break-all;
			}
			&::before {
				position: absolute;
				top: 38rpx;
				left: -6rpx;
				display: block;
				width: 16rpx;
				height: 12rpx;
				content: '\00a0';
				transform: rotate(29deg) skew(-35deg);
				background-color: #ffffff;
			}
		}
	}
</style>
