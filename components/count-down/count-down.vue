<template>
	<view class="timebox">
		<text class="txt">{{timeRtitle}}</text>
		<u-count-down v-if="isend" :timestamp="timer" font-size="24" bg-color="#FF6929" color="#FFFFFF" height="44"></u-count-down>
	</view>
</template>

<script>
	export default{
		props:{
			start:{
				type:Number,
				default:0
			},
			end:{
				type:Number,
				default:0
			}
		},
		data(){
			return{
				timeRtitle:"",
				timer:0,
				isend:true
			}
		},
		methods:{
			// 计算倒计时
			getTimes() {
				let nowTime = parseInt(new Date().getTime()/1000);
				let starttime = this.start;
				let endtime = this.end;
				// 当前时间小于开始时间，未开始
				if (nowTime < starttime) {
					this.timeRtitle = '距本场开始';
					this.timer = starttime - nowTime;
					this.isend = false;
				}
				// 当前时间大于开始时间，小于结束时间，进行中
				if (nowTime > starttime && nowTime < endtime) {
					this.timeRtitle = '距本场结束';
					this.timer = endtime - nowTime;
				}
				// 当前时间大于结束时间，已结束
				if (nowTime > endtime) {
					this.timeRtitle = '已结束';
					this.timer = 0;
					this.isend = false;
				}
			}
		},
		mounted(){
			this.getTimes();
		}
	}
</script>

<style lang="scss" scoped>
	.timebox{
		font-size: 24rpx;
		color:#000000;
		margin-left: 30rpx;
		.txt{
			margin-right: 20rpx;
		}
	}
</style>
