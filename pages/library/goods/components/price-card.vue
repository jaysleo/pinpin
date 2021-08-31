<template>
	<view>
		<!-- 正常商品 -->
		<view class="nomal_price_boxs">
			<view class="nomal_price_box u-flex u-col-center" :class="{'jhs':type == 1||type==3||type==4}">
				<view class="original_price u-flex">
					<text>原价</text>
					<view class="pricebox">
						<text class="small">￥</text>
						<text class="line">{{detail.ot_price}}</text>
					</view>
				</view>
				<view class="pricebg" v-if="type == 0">
					<view class="notice_price">
						<text class="notice">折扣价</text>
						<view class="pricebox">
							<text class="small">￥</text>
							<text>{{detail.price}}</text>
						</view>
					</view>
					<view class="sale" v-if="detail.discount>0">{{parseFloat(detail.discount)}}折</view>
					<view class="right">
						<view class="timebox">
							<text class="txt">{{activityRule.title}}</text>
							<u-count-down :timestamp="activityRule.timer" separator-color="#ffffff" font-size="24" bg-color="#FFFFFF" color="#FF6929" height="44"></u-count-down>
						</view>
					</view>
				</view>
				<view class="pricebg couple" v-if="type == 2">
					<view class="notice_price on">
						<text class="notice">新人价</text>
						<view class="pricebox">
							<text class="small">￥</text>
							<text>{{detail.price}}</text>
						</view>
					</view>
					<view class="alt">{{detail.people}}人成团</view>
				</view>
				<block v-if="type == 1||type == 3||type == 4">
					<view class="pricebg" :class="[type==4?'xinr':'jhs',type==3?'pink':'jhs']">
						<view class="notice_price jhs">
							<view class="pricebox">
								<text class="small">￥</text>
								<text>{{detail.price}}</text>
							</view>
						</view>
					</view>
					<view class="artle">{{detail.people}}人成团</view>
				</block>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		components: {},
		data() {
			return {
				activityRule:{
					title:"",
					timer:""
				},
				isend:false,
				timer:null
			}
		},
		props: {
			detail: Object,
			type: ''
		},
		computed: {
			// 百分比
			percent() {
				let unit = 0;
				if (this.detail.id) {
					unit = this.detail.stock + this.detail.sales > 0 ? ((this.detail.sales / (this.detail.sales + this.detail.stock)) * 100).toFixed(2) : 0;
				}
				return Number(unit);
			}
		},
		methods: {
			// 计算倒计时
			getTimes() {
				let nowTime = parseInt(new Date().getTime()/1000);
				let starttime = this.detail.start_time;
				let endtime = this.detail.stop_time;
				// 当前时间小于开始时间，未开始
				if (nowTime < starttime) {
					this.activityRule.title = '距开始';
					this.activityRule.timer = starttime - nowTime;
				}
				// 当前时间大于开始时间，小于结束时间，进行中
				if (nowTime > starttime && nowTime < endtime) {
					this.activityRule.title = '距结束';
					this.activityRule.timer = endtime - nowTime;
				}
				// 当前时间大于结束时间，已结束
				if (nowTime > endtime) {
					this.activityRule.title = '已结束';
					this.activityRule.timer = 0;
					this.isend = false;
					this.$emit("actRule",true);
				}
			}
		},
		mounted(){
			this.getTimes();
		}
	}
</script>

<style lang="scss">
	.nomal_price_boxs{
		width: 100%;
		height: 132rpx;
		position: absolute;
		bottom:0;
		left:0;
		z-index: 20;
	}
	.nomal_price_box{
		width: 100%;
		height: 132rpx;
		background: #ffffff;
		border-radius: 40rpx 40rpx 0rpx 0rpx;
		box-shadow: 0rpx -6rpx 6rpx 0rpx rgba(0,0,0,0.06);
		&.jhs{
			width: 340rpx;
		}
		.original_price{
			width:197rpx;
			padding-top: 12rpx;
			font-size: 28rpx;
			color: #CCCCCC;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			.pricebox{
				font-size: 40rpx;
				height: 56rpx;
				line-height: 56rpx;
				.small{
					font-size: 30rpx;
				}
				.line{
					text-decoration: line-through;
				}
			}
		}
		.pricebg{
			background:url(/static/images/index/d_bg.png) no-repeat;
			background-size: 100% 100%;
			height: 100%;
			flex: 1;
			display: flex;
			position: relative;
			&.couple{
				background:url(/static/images/index/nbg.png) no-repeat;
				.alt{
					width: 157rpx;
					height: 80rpx;
					line-height: 80rpx;
					background:url(/static/images/index/alert.png) no-repeat;
					background-size: 100% 100%;
					font-size: 24rpx;
					color:#CF1313;
					font-weight: bold;
					text-align: center;
					position: absolute;
					top:-34rpx;
					right: 23rpx;
				}
			}
			&.jhs{
				flex:0 0 188rpx;
				background:url(/static/images/index/jhsbg.png) no-repeat;
				background-size: cover;
				right: -20rpx;
			}
			&.xinr{
				flex:0 0 188rpx;
				background:url(/static/images/index/zkjbg.png) no-repeat;
				background-size: cover;
				right: -20rpx;
			}
			&.pink{
				flex:0 0 188rpx;
				background:url(/static/images/index/ptjbg.png) no-repeat;
				background-size: cover;
				right: -20rpx;
			}
		}
		.artle{
			width: 172rpx;
			height: 50rpx;
			line-height: 50rpx;
			background-image: linear-gradient(#ff7324,#ffa60b);
			border-radius:25rpx 0 0 25rpx;
			font-size: 24rpx;
			color:#ffffff;
			font-weight: bold;
			text-align: center;
			position: absolute;
			top:0rpx;
			right:0;
		}
		.notice_price{
			flex:1;
			display: flex;
			justify-content: center;
			flex-direction: column;
			font-size: 28rpx;
			color:#ffffff;
			.notice{
				margin-top:15rpx;
				margin-left: 77rpx;
			}
			.pricebox{
				font-size: 50rpx;
				margin-left: 28rpx;
				height: 68rpx;
				line-height: 68rpx;
				.small{
					font-size: 30rpx;
				}
			}
			&.other{
				align-items: center;
			}
			&.on{
				align-items: center;
				.notice{
					margin-left: 0;
					margin-top:0;
				}
			}
			&.jhs{
				.pricebox{
					margin-top:30rpx;
					margin-left:20rpx;
				}
			}
		}
		.sale{
			background:url(/static/images/index/d_sale.png) no-repeat;
			background-size: 100% 100%;
			width: 112rpx;
			height: 52rpx;
			line-height: 52rpx;
			text-align: center;
			font-size: 24rpx;
			color:#FF6929;
			position: absolute;
			right:30rpx;
			top:0;
			z-index: 20;
		}
		.right{
			padding-bottom: 14rpx;
			padding-right: 30rpx;
			display: flex;
			align-items: flex-end;
			.timebox{
				font-size: 24rpx;
				color:#FFFFFF;
				.txt{
					margin-right: 16rpx;
				}
			}
		}
	}
</style>
