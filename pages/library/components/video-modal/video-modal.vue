<template>
	<view class="videowrap" v-if="vshow">
		<video id="video_play" :src="videosrc" @play="playVideo" :duration="30" :controls="false" object-fit="fill" :poster-for-crawler="poster" style="width: 100%;height: 100vh;"></video>
		<view class="time">{{verifyText}}</view>
		<!-- <view class="vplay" v-if="isPlay" @click="playVideo">
			<u-image src="/static/images/early/play.png" width="107" height="107"></u-image>
		</view> -->
	</view>
</template>

<script>
	export default{
		props:{
			vshow:{
				type:Boolean,
				default:false
			}
		},
		data(){
			return{
				videosrc:"http://bpic.588ku.com/video_listen/588ku_video/21/06/29/13/59/00/video60dab6a447463.mp4",
				poster:"/static/images/early/vbg.jpeg",
				second: 0,
				timer:null,
				isPlay:true
			}
		},
		computed:{
			verifyText(){
				if(this.second == 0){
					return '广告剩余：30s';
				}else{
					return '广告剩余：('+ this.second +'s)';
				}
			}
		},
		methods:{
			//倒计时
			timeStart() {
				if (this.second > 0) {
					return;
				}
				this.second = 30;
				this.timer = setInterval(()=> {
					this.second--;
					if (this.second == 0) {
						clearInterval(this.timer);
						this.$emit("end",1);
					}
				}, 1000)
			},
			//播放视频
			playVideo(){
				this.isPlay = false;
				this.timeStart();
				// 获取 video 上下文 videoContext 对象
				this.videoContext = uni.createVideoContext('video_play');
				// 进入全屏状态
				this.videoContext.requestFullScreen();
			}
		},
		beforeDestroy() {
			clearInterval(this.timer);
			this.timer = null;
			this.second = 0;
		}
	}
</script>

<style lang="scss" scoped>
	.videowrap{
		position: relative;
		width: 100%;
		height: 100vh;
		.time{
			width: 208rpx;
			height: 58rpx;
			line-height: 58rpx;
			text-align: center;
			font-size: 24rpx;
			color:#ffffff;
			background: rgba(0,0,0,0.5);
			border-radius: 29rpx 0 0 29rpx;
			position: absolute;
			top:222rpx;
			right: 0;
			z-index: 50;
		}
		.vplay{
			position: absolute;
			top:50%;
			left: 50%;
			z-index: 50;
			transform: translate(-50%,-50%);
		}
	}
</style>
