<template>
	<view class="container">
		<view class="search_wrap">
			<searchBox bgcolor="#FAFBFF" @eventClick="goSearch"></searchBox>
		</view>
		<view class="aslide">
			<view class="aslide_left">
				<scroll-view class="scrollbox" enable-back-to-top scroll-y>
					<view class="type_item ellipsis" :class="{'on':listId == index}" v-for="(item,index) in categoryData" :key="index" @click="onType(index,item)">
						{{item.cate_name}}
					</view>
					<view class="hack-tabbar"></view>
				</scroll-view>
			</view>
			<view class="aslide_right">
				<scroll-view class="scrollbox" enable-back-to-top scroll-y>
					<image class="type_img" src="/static/images/index/mad.png" mode="aspectFill"></image>
					<view class="item_list">
						<view class="item_box">
							<view class="cate_item" v-for="pitem in cList" :key="pitem.id" @click="jump('pages/library/goods/detail',{id:pitem.id,type:0})">
								<u-image :src="pitem.pic" width="168" height="168"></u-image>
								<view class="title u-line-1">{{pitem.cate_name}}</view>
								<view class="progress" v-if="pitem.start_time"></view>
								<view class="desc">
									<block v-if="isend">
										<view v-if="pitem.start_time && pitem.time">{{pitem.time.d}}天{{pitem.time.h}}小时结束</view>
									</block>
									<block v-else>{{timetit}}</block>
								</view>
							</view>
						</view>
					</view>
				</scroll-view>
			</view>
		</view>
		<ntabBar current="1"></ntabBar>
	</view>
</template>

<script>
	import searchBox from '@/components/search-box/search-box.vue'
	import ntabBar from "@/components/tabbar/ntabbar.vue";
	export default{
		components:{
			searchBox,
			ntabBar
		},
		data(){
			return{
				categoryData:[],
				cList:[],
				listId:0,
				pic:"",
				timer: null ,// 定时器
				isend:false,
				timetit:"0天0小时结束"
			}
		},
		methods:{
			loadData(){
				this.$http.getCategory().then((res)=>{
					if(res.data.length){
						this.categoryData = res.data;
						this.pic = this.categoryData[this.listId].pic;
						if(this.categoryData[this.listId].children.length){
							this.cList = this.categoryData[this.listId].children;
							this.start();
						}else{
							this.cList = [];
						}
					}
				})
			},
			goSearch(){
				this.$u.route('pages/library/search/index',{type:"avtivity"});
			},
			onType(index,data){
				this.listId = index;
				if(data.children.length){
					this.cList = data.children;
				}else{
					this.cList = [];
				}
			},
			// 路由跳转
			jump(path,parmas){
				this.$u.route({
					url: path,
					params: parmas
				});
			},
			// 倒计时
			start() {
				// 避免可能出现的倒计时重叠情况
				this.clearTimer();
				this.timer = setInterval(() => {
					this.cList.forEach((item, index) => {
						let nowTime = new Date().getTime();
						let starttime = item.start_time;
						let endTime = item.stop_time * 1000;
						let t = (endTime - nowTime) / 1000;
						if (nowTime < starttime) {
							this.isend = false;
							this.timetit = "未开始";
							return false;
						}
						if (nowTime > starttime && nowTime < endTime) {
							let time = this.$tools.format(t);
							this.$set(this.cList[index], 'time', time);
							this.isend = true;
							return false;
						}
						if (nowTime > endTime) {
							this.isend = false;
							this.timetit = "已结束";
						}
					});
				}, 1000);
			},
			// 停止倒计时
			end() {
				this.clearTimer();
			},
			// 清除定时器
			clearTimer() {
				if(this.timer) {
					// 清除定时器
					clearInterval(this.timer);
					this.timer = null;
				}
			}
		},
		onLoad() {
			this.loadData();
		},
		onUnload(){
			clearInterval(this.timer);
			this.timer = null;
		},
		onHide() {
			clearInterval(this.timer);
			this.timer = null;
		}
	}
</script>

<style lang="scss">
	.search_wrap{
		background:#ffffff;
		padding:0 32rpx 16rpx;
	}
	// .hack-tabbar {
	// 	height: calc(100rpx + env(safe-area-inset-bottom) / 2);
	// 	width: 100%;
	// }
	.aslide{
		background:#FAFBFF;
		width:100%;
		display: flex;
		.scrollbox{
			width: 100%;
			height: 100%;
			flex:1;
		}
		.aslide_left{
			flex:1;
			width:170rpx;
			height: calc(100vh - 80rpx);
			background: #FFFFFF;
			.type_item{
				width:100%;
				height: 122rpx;
				display: flex;
				align-items: center;
				justify-content: center;
				font-size: 24rpx;
				color:#000000;
				position: relative;
				&.on{
					color:#FF6929;
					background:#fafbff;
					&::after{
						content:"";
						width:8rpx;
						height: 100%;
						background:#FF6929;
						border-radius: 8rpx;
						position: absolute;
						top:0;
						left:0;
					}
				}
			}
		}
		.aslide_right{
			padding:0 24rpx;
			flex:1;
			height: 100%;
			.type_img{
				width: 532rpx;
				height: 188rpx;
				margin: 24rpx 0 20rpx;
			}
			.item_list{
				.item_box{
					display: flex;
					flex-wrap: wrap;
					width: 100%;
					.cate_item{
						display: flex;
						flex-direction:column;
						align-items: center;
						justify-content: center;
						margin-right: 14rpx;
						margin-bottom: 20rpx;
						background: #ffffff;
						border-radius: 4rpx;
						box-shadow: 0rpx 6rpx 20rpx 0rpx rgba(0,0,0,0.05);
						&:nth-child(3n) {
							margin-right: 0;
						}
						.img{
							width: 168rpx;
							height: 168rpx;
							image{
								width:100%;
								height: 100%;
							}
						}
						.title{
							font-size: 24rpx;
							color:#000000;
							line-height: 34rpx;
							margin: 14rpx 0;
						}
						.progress{
							width: 124rpx;
							height: 2rpx;
							background: #f5f7ff;
							margin:0 auto;
							position: relative;
							&::before{
								content:"";
								width: 6rpx;
								height: 6rpx;
								background: #ff6929;
								border-radius: 50%;
								position: absolute;
								top:-2rpx;
								left:50%;
								z-index: 20;
								margin-left:-3rpx;
							}
						}
						.desc{
							font-size: 20rpx;
							color: #707071;
							margin:16rpx 0;
						}
					}
				}
			}
		}
	}
</style>
