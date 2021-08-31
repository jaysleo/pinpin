<template>
	<view class="container">
		<view class="scorewrap">
			<view class="numberbox u-flex-col u-col-center">
				<text>我的积分</text>
				<text class="number">20</text>
			</view>
			<view class="info">
				<view class="tit">积分玩法</view>
				<view class="item u-flex" v-for="item in jfdata" :key="index">
					<u-image :src="item.icon" width="100" height="100"></u-image>
					<view class="right u-flex-col u-flex-1">
						<view class="title">{{item.name}}</view>
						<view class="desc">{{item.desc}}</view>
					</view>
				</view>
			</view>
			<view class="con">
				<view class="hd u-flex">
					<view class="tit u-flex-1">积分明细</view>
					<view class="tabbox u-flex">
						<view class="tabitem" :class="{'cur':cur==index}" v-for="(item,index) in tablist" :key="index" @click="tab(index)">{{item.name}}</view>
					</view>
				</view>
				<view class="list" v-if="list.length">
					<view class="item u-flex">
						<view class="u-flex-col u-flex-1">
							<text class="name">邀请好友</text>
							<text class="time">2021-07-06 10:55:30</text>
						</view>
						<view class="num">+1</view>
					</view>
				</view>
				<view class="emptybox u-flex-col u-col-center u-row-center" v-else>
					<u-image src="/static/images/common/nodata2.png" width="110" height="122"></u-image>
					<text class="txt">暂无记录</text>
				</view>
			</view>
		</view>
		<u-gap height="140"></u-gap>
		<view class="ftbtn safe-area-inset-bottom">
			<button class="u-reset-button btn_primary" @click="onSubmit">邀请好友</button>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				cur:0,
				jfdata:[
					{
						icon:"/static/images/user/jf1.png",
						name:"如何获取",
						desc:"邀请1名好友激活可获1积分，无上限"
					},
					{
						icon:"/static/images/user/jf2.png",
						name:"如何使用",
						desc:"达到拼团上限时1积分可兑换1次拼团机会"
					}
				],
				tablist:[
					{
						type:"",
						name:"全部"
					},
					{
						type:"",
						name:"收入"
					},
					{
						type:"",
						name:"支出"
					}
				],
				list:[]
			}
		},
		methods:{
			tab(index){
				this.cur = index;
			},
			onSubmit(){}
		}
	}
</script>

<style lang="scss" scoped>
	.scorewrap{
		.numberbox{
			width: 100%;
			height: 300rpx;
			position: relative;
			z-index: -1;
			overflow: hidden;
			font-size: 24rpx;
			color:#ffffff;
			font-weight: bold;
			padding-top: 60rpx;
			.number{
				font-size: 72rpx;
				margin-top: 24rpx;
			}
			&::after{
				content: '';
				width: 140%;
				height: 275rpx;
				position: absolute;
				left: -20%;
				top: 0;
				z-index: -1;
				border-radius: 0 0 30% 30%;
				background: #ff6929;
			}
		}
		.info{
			background-color: #ffffff;
			border-radius: 10rpx;
			padding:30rpx 40rpx 0;
			margin:0 20rpx;
			margin-top: -70rpx;
			position: relative;
			z-index: 50;
			.tit{
				margin-bottom: 40rpx;
				font-size: 28rpx;
				color:#333333;
				font-weight: bold;
			}
			.item{
				padding-bottom: 30rpx;
				.right{
					padding-left: 40rpx;
					.title{
						font-size: 28rpx;
						color:#333333;
						font-weight: bold;
						margin-bottom: 10rpx;
					}
					.desc{
						font-size: 24rpx;
						color:#999999;
					}
				}
			}
		}
		.con{
			margin:20rpx 20rpx 0;
			padding:0 40rpx;
			background: #ffffff;
			border-radius: 10rpx;
			.hd{
				padding:30rpx 0 18rpx;
				.tit{
					font-size: 28rpx;
					color: #333333;
					font-weight: 700;
				}
				.tabbox{
					.tabitem{
						margin-right: 60rpx;
						padding-bottom: 4rpx;
						font-size: 24rpx;
						color:#999999;
						position: relative;
						&.cur{
							color: #333333;
							font-weight: bold;
							&::before{
								content:"";
								width: 100%;
								height: 2rpx;
								background: #ffcc3a;
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
			}
			.list{
				.item{
					padding:22rpx 0;
					border-bottom: 1rpx solid #f6f6f6;
					font-size: 24rpx;
					color: #000000;
					font-weight: 400;
					.name{
						margin-bottom: 12rpx;
					}
					.time{
						font-size: 20rpx;
						color: #999999;
					}
					&:last-child{
						border-bottom: 0;
					}
				}
			}
			.emptybox{
				width: 100%;
				height: 280rpx;
				background-color: #ffffff;
				.txt{
					margin-top: 24rpx;
					font-size: 24rpx;
					color:#999999;
				}
			}
		}
	}
</style>
