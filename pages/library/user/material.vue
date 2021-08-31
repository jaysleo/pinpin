<template>
	<view class="material_wrap">
		<view class="material_item" v-for="(item,index) in list" :key="index">
			<view class="hd u-flex">
				<u-avatar :src="avatar" size="66"></u-avatar>
				<view class="info u-flex-col">
					<text>发圈小助手</text>
					<text class="time">{{$u.timeFrom(item.time)}}</text>
				</view>
			</view>
			<view class="content" v-if="item.content">
				<u-parse :html="item.content"></u-parse>
			</view>
			<view class="imglist u-flex u-flex-wrap">
				<block v-if="item.imglist.length>1">
				<u-image :src="items" width="196" height="196" border-radius="12" class="img" @click="previewImage(item.imglist, indexs)" v-for="(items,indexs) in item.imglist" :key="indexs"></u-image>
				</block>
				<block v-else>
					<u-image :src="items" width="240" height="330" border-radius="12" class="img" @click="previewImage(item.imglist, indexs)" v-for="(items,indexs) in item.imglist" :key="indexs"></u-image>
				</block>
			</view>
			<view class="ft u-flex u-col-center">
				<button class="share_f sharebtn u-reset-button u-flex u-flex-1 u-row-center" open-type="share">
					<u-icon name="moments" color="#333333" size="27"></u-icon>
					<text class="txt">分享到朋友圈</text>
				</button>
				<view class="sharebtn u-flex u-flex-1 u-row-center" @click="saveImage(item.imglist)">
					<u-icon name="download" color="#333333" size="24"></u-icon>
					<text class="txt">一键保存</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import Auth from '@/common/permission/index.js';
	export default{
		data(){
			return{
				avatar:"/static/images/user/avatar.png",
				list:[
					{
						id:1,
						time:1626160736,
						content:"<p>拼拼有礼<br/>不管怎么玩都有收入<br/>每天动动手指坐等免费快递到家<br/>天天拆快递美滋滋</p>",
						imglist:["https://img1.baidu.com/it/u=2728776560,2236636365&fm=26&fmt=auto&gp=0.jpg","https://img1.baidu.com/it/u=1605489254,3208869051&fm=26&fmt=auto&gp=0.jpg","https://img1.baidu.com/it/u=2346282507,2171850944&fm=26&fmt=auto&gp=0.jpg"]
					},
					{
						id:2,
						time:1626160736,
						content:"<p>拼拼有礼<br/>不管怎么玩都有收入<br/>每天动动手指坐等免费快递到家<br/>天天拆快递美滋滋</p>",
						imglist:["https://img1.baidu.com/it/u=2728776560,2236636365&fm=26&fmt=auto&gp=0.jpg"]
					}
				]
			}
		},
		methods:{
			previewImage(src,index){
				this.$tools.previewImage(src,index);
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
	.material_wrap{
		padding:30rpx 40rpx;
		.material_item{
			margin-bottom: 16rpx;
			padding:30rpx 22rpx 26rpx 20rpx;
			background-color: #ffffff;
			border-radius: 12rpx;
			.hd{
				.info{
					font-size: 24rpx;
					color: #333333;
					font-weight: bold;
					margin-left: 14rpx;
					.time{
						font-size: 20rpx;
						color:#999999;
						font-weight: normal;
					}
				}
			}
			.content{
				margin-top:30rpx;
				font-size: 24rpx;
				color:#333333;
			}
			.imglist{
				margin-top:30rpx;
				.img{
					margin:0 20rpx 20rpx 0;
					&:nth-child(3n){
						margin-right: 0;
					}
				}
			}
			.ft{
				padding-top:16rpx;
				.sharebtn{
					height: 34rpx;
					line-height: 34rpx;
					font-size: 24rpx;
					color:#666666;
					.txt{
						margin-left: 13rpx;
					}
					&:first-child{
						border-right: 2rpx #999999 dashed;
					}
				}
			}
		}
	}
</style>
