<template>
	<view class="container">
		<u-navbar back-icon-size="31" back-icon-color="#2E2E2E" back-text="我的好友">
			<view class="slotwrap" @click="invite">
				<text>邀请人</text>
			</view>
		</u-navbar>
		<u-sticky offset-top="120" bg-color="#FAFBFF">
			<view class="tabbox u-flex">
				<view class="item u-flex-1 u-flex u-row-center" :class="{'cur':cur==index}" v-for="(item,index) in tablist" :key="index" @click="tab(index)">{{item.name}}</view>
			</view>
		</u-sticky>
		<view class="fanslist">
			<view class="fitem u-flex" v-for="(item,index) in list" :key="index">
				<view class="left u-flex u-flex-1">
					<view class="picwrap u-rela">
						<u-avatar :src="item.avatar" size="100"></u-avatar>
						<view class="status" v-if="item.is_default==0">未激活</view>
					</view>
					<view class="info u-flex-col">
						<view class="u-flex">
							<text class="name">{{item.name}}</text>
							<view class="level">Lv.{{item.level}}</view>
						</view>
						<text class="time">{{item.time}}</text>
					</view>
				</view>
				<view class="right u-flex">
					<button class="u-reset-button btn" v-if="item.is_default==0">邀请激活</button>
					<u-icon name="arrow-right" size="20" color="#999999"></u-icon>
				</view>
			</view>
		</view>
		<u-gap height="110"></u-gap>
		<view class="fanfoot u-flex u-col-top u-row-center safe-area-inset-bottom">
			<view class="setbtn u-flex u-row-center" @click="onSetinfo">
				<u-icon name="weixin-fill" size="42" color="#ffffff" class="icon"></u-icon>
				<text>设置微信号</text>
			</view>
		</view>
		<curtain :visible.sync="show">
			<view class="umodbox u-flex-col u-col-center">
				<u-avatar src="/static/images/user/avatar.png" size="108" class="avatar"></u-avatar>
				<view class="uname">王建国</view>
				<view class="level">Lv.0</view>
				<block v-if="uinfo">
					<view class="ewmbox u-flex-col">
						<image :src="uinfo.ewmurl" mode="aspectFit" class="ewm"></image>
						<view class="numbox">
							<text class="name">微信号</text>
							<text>wjg666666</text>
						</view>
					</view>
					<view class="btnbox u-flex">
						<button class="u-reset-button tbtn dbtn" @click="saveImage(uinfo.ewmurl)">保存二维码</button>
						<button class="u-reset-button tbtn cbtn" @click="copyCode">复制微信号</button>
					</view>
				</block>
				<view class="tip" v-else>ta还未增加社交信息</view>
				<button class="u-reset-button sbtn" @click="onSetinfo">设置我的社交信息 >></button>
			</view>
		</curtain>
	</view>
</template>

<script>
	import Auth from '@/common/permission/index.js';
	import curtain from '../../components/curtain/curtain.vue';
	export default{
		components:{
			curtain
		},
		data(){
			return{
				cur:0,
				show:false,
				uinfo:{
					ewmurl:""
				},
				tablist:[
					{
						id:1,
						name:"密友"
					},
					{
						id:2,
						name:"好友"
					},
					{
						id:3,
						name:"未激活密友"
					}
				],
				list:[
					{
						avatar:"",
						is_default:0,
						name:"王建国",
						level:0,
						time:"2021-07-06 10:55:30"
					},
					{
						avatar:"",
						is_default:1,
						name:"王建国",
						level:0,
						time:"2021-07-06 10:55:30"
					}
				]
			}
		},
		methods:{
			tab(index){
				this.cur = index;
			},
			invite(){
				this.show = true;
			},
			onSetinfo(){
				this.$u.route("pages/library/user/fans/set");
			},
			copyCode(code) {
				let that = this;
				uni.setClipboardData({
					data: code,
					success: () => {
						that.$u.toast('已复制到剪切板');
					}
				});
			},
			// 保存图片
			async saveImage(path) {
				let that = this;
				let authState = await new Auth('writePhotosAlbum').check();
				if (authState) {
					const res = await uni.downloadFile({
						url: path
					});
					res[1].statusCode === 200 && this.saveImageToPhotosAlbum(res[1].tempFilePath);
				}
			},
			saveImageToPhotosAlbum(path) {
				uni.saveImageToPhotosAlbum({
					filePath: path,
					success: res => {
						this.$u.toast('保存成功');
					},
					fail: err => {
						console.log(`图片保存失败:`, err);
						this.$u.toast('保存失败');
					}
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
	.slotwrap{
		display: flex;
		flex:1;
		justify-content: flex-end;
		font-size: 24rpx;
		color:#000000;
		padding-right: 30rpx;
	}
	.tabbox{
		width: 100%;
		height: 100rpx;
		background: #FAFBFF;
		.item{
			font-size: 28rpx;
			color: #999999;
			position: relative;
			&.cur{
				font-size: 28rpx;
				color: #333333;
				font-weight: 700;
				&::before{
					content:"";
					position: absolute;
					bottom: 0;
					left: 50%;
					transform: translateX(-50%);
					width: 56rpx;
					height: 2rpx;
					background: #ff6929;
					border-radius: 2rpx;
				}
			}
		}
	}
	.fanslist{
		margin:0 20rpx;
		.fitem{
			background: #ffffff;
			border-radius: 10rpx;
			padding: 24rpx 30rpx;
			margin-bottom: 20rpx;
			.picwrap{
				.status{
					position: absolute;
					left:50%;
					bottom: 0;
					z-index: 20;
					transform: translateX(-50%);
					width: 60rpx;
					height: 26rpx;
					line-height: 26rpx;
					background: #dedada;
					border-radius: 14rpx;
					font-size: 16rpx;
					color: #666666;
					font-weight: 800;
					text-align: center;
				}
			}
			.info{
				padding-left: 24rpx;
				.name{
					font-size: 28rpx;
					color: #333333;
					font-weight: 700;
				}
				.level{
					margin-left: 8rpx;
					padding: 0 18rpx;
					height: 32rpx;
					line-height: 32rpx;
					font-size: 20rpx;
					color: #ffffff;
					text-align: center;
					background: linear-gradient(244deg,#ff6929 21%, #ff851c 46%, #ffb405 100%);
					border-radius: 24rpx;
				}
				.time{
					font-size: 24rpx;
					color: #999999;
					margin-top: 10rpx;
				}
			}
			.btn{
				margin-right: 10rpx;
				width: 128rpx;
				height: 48rpx;
				line-height: 48rpx;
				background: linear-gradient(244deg,#ff6929 21%, #ff851c 46%, #ffb405 100%);
				border-radius: 24rpx;
				font-size: 22rpx;
				color: #ffffff;
				text-align: center;
			}
		}
	}
	.fanfoot{
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		z-index: 500;
		width: 100%;
		height: 110rpx;
		background:#ffffff;
		.setbtn{
			width: 240rpx;
			height: 70rpx;
			background: #0fa838;
			border-radius: 35rpx;
			line-height: 70rpx;
			font-size: 24rpx;
			color: #ffffff;
			.icon{
				margin-right: 15rpx;
			}
		}
	}
	.umodbox{
		width: 540rpx;
		padding-bottom: 50rpx;
		background: #ffffff;
		border-radius: 20rpx;
		.avatar{
			margin-top: -54rpx;
		}
		.uname{
			margin:16rpx 0;
			font-size: 28rpx;
			color: #333333;
			font-weight: 700;
		}
		.level{
			margin-bottom: 40rpx;
			padding: 0 18rpx;
			height: 32rpx;
			line-height: 32rpx;
			font-size: 20rpx;
			color: #ffffff;
			text-align: center;
			background: linear-gradient(244deg,#ff6929 21%, #ff851c 46%, #ffb405 100%);
			border-radius: 24rpx;
		}
		.tip{
			font-size: 24rpx;
			color: #999999;
			text-align: center;
			margin-bottom: 56rpx;
		}
		.ewmbox{
			.ewm{
				width: 260rpx;
				height: 260rpx;
			}
			.numbox{
				margin:16rpx 0;
				font-size: 24rpx;
				font-weight: 700;
				text-align: center;
				color: #333333;
				.name{
					color: #999999;
					font-weight: normal;
					margin-right: 12rpx;
				}
			}
		}
		.btnbox{
			margin:40rpx 0;
			.tbtn{
				width: 160rpx;
				height: 56rpx;
				line-height: 56rpx;
				font-size: 22rpx;
				text-align: center;
				border-radius: 28rpx;
			}
			.dbtn{
				color: #f27534;
				border:2rpx #f27534 solid;
				margin-right: 20rpx;
			}
			.cbtn{
				color: #FFFFFF;
				background: #f27534;
			}
		}
		.sbtn{
			width: 452rpx;
			height: 48rpx;
			line-height: 48rpx;
			text-align: center;
			font-size: 22rpx;
			color: #ffffff;
			background: linear-gradient(244deg,#ff6929 21%, #ff851c 46%, #ffb405 100%);
			border-radius: 24rpx;
		}
	}
</style>
