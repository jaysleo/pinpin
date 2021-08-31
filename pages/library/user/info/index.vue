<template>
	<view class="container">
		<u-cell-group>
			<u-cell-item title="头像" @click="onChooseImg">
				<u-avatar :src="userInfo.avatar" size="100" mode="square" class="avatars"></u-avatar>
			</u-cell-item>
			<u-cell-item title="昵称" :value="userInfo.nickname" @click="jump('pages/library/user/info/edit')"></u-cell-item>
			<u-cell-item title="实名认证" :value="isrealy" @click="jump('pages/library/user/info/vedit',{type:'verify'})"></u-cell-item>
			<u-cell-item title="更换手机号" @click="jump('pages/library/user/info/vedit',{type:'phone'})"></u-cell-item>
			<u-cell-item title="登录密码" @click="jump('pages/library/user/info/vedit',{type:'pwd'})"></u-cell-item>
			<!-- <u-cell-item title="微信换绑" @click="show=true"></u-cell-item> -->
			<u-cell-item title="注销账号" @click="jump('pages/library/user/info/accounts')"></u-cell-item>
		</u-cell-group>
		<u-modal v-model="show" title="确定换绑微信吗？" content="换绑后无法使用原微信登录" confirmText="解绑" :show-cancel-button="true"></u-modal>
		<view class="actionWrap safe-area-inset-bottom" :class="{'active':actionShow}">
			<view class="overlay"></view>
			<view class="action_body u-flex u-flex-col u-row-right">
				<view class="action_con u-flex-col">
					<!-- <view class="action_item u-rela u-flex u-row-center">
						<input type="file" accept="image/*" class="uploader_input" onChange="handleFileChange">
						<text>本地照片</text>
					</view> -->
					<view class="action_item u-flex u-row-center" @click="onAlbum">相册</view>
				</view>
				<view class="action_foot u-flex u-row-center" @click="actionShow=false">取消</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {mapGetters} from 'vuex';
	import {Apiurl} from '@/utils/config';
	import Auth from '@/common/permission/index.js';
	export default{
		computed: {
			...mapGetters(["isLogin","userInfo"]),
			isrealy(){
				return this.userInfo.real_name==""?"未认证":"已认证"
			}
		},
		data(){
			return{
				actionShow:false,
				show:false
			}
		},
		methods:{
			// 路由跳转
			jump(path,parmas){
				this.$u.route({
					url: path,
					params: parmas
				});
			},
			onChooseImg(){
				this.actionShow = true;
			},
			//相册
			async onAlbum(){
				// let authState = 0;
				// authState += await new Auth('writePhotosAlbum').check();
				// if (authState < 1) return;
				// authState += await new Auth('camera').check();
				// if (authState < 2) return;
				const chooseImageRes = await this.chooseImage(1);
				const uploadImageRes = await this.uploadImage(chooseImageRes[0]);
				let fileUrl = uploadImageRes.path;
				this.userInfo.avatar = fileUrl;
				this.$store.commit("setuInfo",{"avatar":fileUrl});
				let pram = {
					avatar:fileUrl
				}
				this.$http.setUserInfo(pram).then((res)=>{
					console.log(res.msg)
					this.actionShow = false;
				})
			},
			// 图片处理-选择图片
			async chooseImage(count = 1) {
				return new Promise((resolve, reject) => {
					uni.chooseImage({
						count: count, //默认9
						sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
						sourceType: ['album'], //从相册选择
						success: res => {
							resolve(res.tempFilePaths);
						}
					});
				}).catch(e => {
					console.log(e);
				});
			},
			// 图片处理-上传图片
			async uploadImage(url) {
				const that = this;
				return new Promise((resolve, reject) => {
					that.$u.toast('上传中...');
					uni.uploadFile({
						url: Apiurl+"/api/user/upload",
						header:{
							"x-token":uni.getStorageSync("token")
						},
						filePath: url,
						name: 'image',
						success: res => {
							res = JSON.parse(res.data);
							if (res.code === 200) {
								that.$u.toast('上传成功');
								resolve(res.data);
							} else {
								that.$u.toast('上传失败');
							}
						},
						complete: e => {
							uni.hideLoading();
						}
					});
				}).catch(e => {
					console.log(e);
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
	.avatars{
		margin-right: 16rpx;
	}
	.uploader_input {
	    position: absolute;
	    top: 0;
	    left: 0;
	    width: 100%;
	    height: 100%;
	    overflow: hidden;
	    cursor: pointer;
	    opacity: 0;
	}
	.actionWrap{
		position: fixed;
		bottom:0;
		left: 0;
		right: 0;
		width: 100%;
		height: 100%;
		z-index: 500;
		visibility: hidden;
		transition: visibility 300ms cubic-bezier(.36,.66,.04,1);
		&.active{
			visibility: visible;
			.overlay{
				opacity: 1;
			}
			.action_body{
				transform: translate3d(0,0,0);
			}
		}
		.overlay{
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			background-color: rgba(0,0,0,.5);
			opacity: 0;
			transition: opacity 300ms ease-in;
		}
		.action_body{
			margin:0 20rpx;
			height: 100%;
			transform: translate3d(0,100%,0);
			transition: transform 300ms cubic-bezier(.36,.66,.04,1),-webkit-transform 300ms cubic-bezier(.36,.66,.04,1);
			.action_con{
				width: 100%;
				background: rgba(237,237,237,0.80);
				border-radius: 24rpx;
				backdrop-filter: blur(60rpx);
				font-size: 34rpx;
				color: #4390df;
				letter-spacing: -1rpx;
				.action_item{
					height: 104rpx;
					text-align: center;
					&:last-child{
						// border-top: 2rpx #999999 solid;
					}
				}
			}
			.action_foot{
				margin:10rpx 0;
				width: 100%;
				height: 104rpx;
				background: rgba(237,237,237,0.80);
				border-radius: 24rpx;
				backdrop-filter: blur(60rpx);
				font-size: 34rpx;
				font-weight: 700;
				color: #4390df;
				letter-spacing: -1rpx;
			}
		}
	}
</style>
