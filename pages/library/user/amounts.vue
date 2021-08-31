<template>
	<view class="container u-rela">
		<view class="pure_top"></view>
		<view class="amountbox">
			<view class="hd u-flex">
				<view class="u-flex-1">
					<view class="gold u-flex">
						<u-icon name="/static/images/user/gold.png" size="54"></u-icon>
						<text class="num">1282</text>
						<u-icon name="arrow-right" size="21" color="#e9ae89"></u-icon>
					</view>
				</view>
				<text>可抵12.82元</text>
			</view>
			<view class="con">
				<view class="top u-flex">
					<view class="left u-flex u-flex-1">已连续签到<text class="num">3</text>天</view>
					<view class="right u-flex">
						<text>签到提醒</text>
						<view class="iswitch" :class="{'close':ischeck}" @click="onCheck"></view>
					</view>
				</view>
				<view class="signlist u-flex">
					<view class="sign_item active u-flex-col u-col-center u-row-center">
						<view class="check">
							<u-icon name="/static/images/common/icheck.png" size="58"></u-icon>
						</view>
						<text>周一</text>
					</view>
					<view class="sign_item u-flex-col u-col-center u-row-center">
						<view class="check">
							<text>+1</text>
						</view>
						<text>周一</text>
					</view>
				</view>
				<button class="u-reset-button signbtn">今日签到</button>
			</view>
		</view>
		<view class="taskbox">
			<view class="title">礼金任务</view>
			<view class="cell u-flex" v-for="item in taskdata" :key="index">
				<u-image :src="item.icon" width="74" height="74"></u-image>
				<view class="info u-flex-col u-flex-1">
					<view class="t">{{item.name}}</view>
					<view class="desc">{{item.desc}}</view>
				</view>
				<button class="u-reset-button btn">{{item.btntext}}</button>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				cur:0,
				ischeck:false,
				taskdata:[
					{
						type:"ptuan",
						icon:"/static/images/user/jf2.png",
						name:"拼团获得礼金",
						desc:"参与拼团即可获得礼金",
						btntext:"去拼团"
					},
					{
						type:"store",
						icon:"/static/images/user/jf3.png",
						name:"看小说获得礼金",
						desc:"看小说即可获得礼金",
						btntext:"看小说"
					}
				]
			}
		},
		methods:{
			onCheck(){
				this.ischeck = !this.ischeck;
			}
		}
	}
</script>

<style lang="scss" scoped>
	.pure_top{
		width: 100%;
		height: 375rpx;
		position: absolute;
		top:0;
		left:0;
		z-index: 20;
		overflow: hidden;
		&::after{
			content: '';
			width: 140%;
			height: 360rpx;
			position: absolute;
			left: -20%;
			top: 0;
			z-index: -1;
			border-radius: 0 0 30% 30%;
			background: #ff6929;
		}
	}
	.amountbox{
		position: relative;
		z-index: 20;
		padding:0 20rpx;
		.hd{
			font-size: 24rpx;
			color:#ffffff;
			font-weight: bold;
			padding-top:38rpx;
			.gold{
				width: 172rpx;
				height: 54rpx;
				padding-right: 6rpx;
				background: rgba(0,0,0,0.21);
				border-radius: 27rpx;
				.num{
					padding:0 23rpx 0 10rpx;
				}
			}
		}
		.con{
			margin:32rpx 0 22rpx 0;
			padding:30rpx;
			background: linear-gradient(#ffebe1,#fff0e8,#fffaf8);
			border-radius: 10rpx;
			position: relative;
			z-index: 20;
			.top{
				font-size: 24rpx;
				color:#333333;
				font-weight: bold;
				.num{
					color:#F27534;
				}
				.iswitch{
					margin-left: 12rpx;
					position: relative;
					width: 64rpx;
					height: 34rpx;
					background: #f27534;
					border-radius: 34rpx;
					transition: border 0.4s, box-shadow 0.2s, background 1.2s;
					&::after{
						content: "";
						display: block;
						width: 32rpx;
						height: 32rpx;
						border-radius: 50%;
						background: #FFFFFF;
						position: absolute;
						right: 2rpx;
						top: 2rpx;
						box-shadow: 0 0 2rpx rgba(0,0,0,0.8);
					}
					&.close{
						background: #e6e6e6;
						&::after{
							right: auto;
							left: 2rpx;
							box-shadow: 0 0 2rpx rgba(0,0,0,0.2);
						}
					}
				}
			}
			.signlist{
				margin-top: 24rpx;
				margin-bottom: 36rpx;
				.sign_item{
					width: 80rpx;
					height: 122rpx;
					background: #ffffff;
					border-radius: 10rpx;
					font-size: 20rpx;
					color:#999999;
					margin-right: 16rpx;
					.check{
						width: 58rpx;
						height: 58rpx;
						line-height: 58rpx;
						font-size: 24rpx;
						color:#333333;
						text-align: center;
						background: #f5f5f5;
						border-radius: 50%;
						margin-bottom: 8rpx;
					}
					&.active{
						color:#ffffff;
						background: linear-gradient(134deg,#ff965e 0%, #ff7d37 98%);
						box-shadow: 0rpx 10rpx 30rpx 0rpx rgba(255,180,142,0.41); 
						.check{
							background: rgba(255,255,255,0.2);
						}
					}
					&:last-child{
						margin-right: 0;
					}
				}
			}
			.signbtn{
				width: 170rpx;
				height: 70rpx;
				line-height: 70rpx;
				font-size: 24rpx;
				color: #ffffff;
				font-weight: 700;
				text-align: center;
				background: #ff8f54;
				border-radius: 35rpx;
				&.on{
					background: #d3d3d3;
				}
			}
		}
	}
	.taskbox{
		background: #ffffff;
		border-radius: 10rpx;
		margin:0 20rpx;
		padding: 30rpx;
		.title{
			margin-bottom: 40rpx;
			font-size: 28rpx;
			color: #333333;
			font-weight: 700;
			text-align: center;
		}
		.cell{
			.info{
				padding-left: 16rpx;
				font-size: 24rpx;
				.t{
					color: #333333;
					font-weight: 700;
					margin-bottom: 6rpx;
				}
				.desc{
					color: #999999;
				}
			}
			.btn{
				width: 132rpx;
				height: 52rpx;
				line-height: 52rpx;
				font-size: 24rpx;
				color: #f27534;
				text-align: center;
				border:1rpx #f27534 solid;
				border-radius: 27rpx;
			}
			&:last-child{
				margin-top: 38rpx;
			}
		}
	}
</style>
