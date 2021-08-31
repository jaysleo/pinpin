<template>
	<view class="address_wrap">
		<view class="cell">
			<view class="item">
				<text>收货人</text>
				<input type="text" placeholder="请输入收货人姓名" class="input" v-model="form.name" />
			</view>
			<view class="item">
				<text>手机号码</text>
				<input type="number" placeholder="请输入收货人手机号" class="input" v-model="form.phone" />
			</view>
		</view>
		<view class="cell">
			<view class="item" @click="show=true">
				<text>所在地区</text>
				<view class="input">
					<block v-if="form.province">
						{{form.province}}{{form.city}}{{form.area}}
					</block>
					<block v-else>
						<text style="color:#999999;margin-right:13rpx;">请选择地区</text>
					</block>
					<u-icon name="arrow-right" size="23" color="#CCCCCC"></u-icon>
				</view>
			</view>
			<view class="item">
				<text>详细地址</text>
				<input type="text" placeholder="请输入详细地址信息" class="input" v-model="form.address" />
			</view>
		</view>
		<view class="cells u-flex">
			<view class="left">
				<text class="txt">设置为默认地址</text>
				<text class="tip">注：每次下单会默认使用改地址</text>
			</view>
			<view class="right">
				<view @click="onCheck">
					<view class="switchbox on u-flex u-row-center" v-if="isCheck">
						<text>开</text>
						<view class="icon"></view>
					</view>
					<view class="switchbox u-flex u-row-center" v-else>
						<view class="icon"></view>
						<text>关</text>
					</view>
				</view>
			</view>
		</view>
		<u-picker mode="region" ref="uPicker" :safe-area-inset-bottom="true" confirm-color="#FF6929" v-model="show" @confirm="confirm" />
		<u-gap height="140"></u-gap>
		<view class="ft">
			<button type="default" class="btn_primary disable" v-if="isShow">保存</button>
			<button type="default" class="btn_primary" @click="onSubmit" v-else>保存</button>
		</view>
	</view>
</template>

<script>
	import { mapGetters } from 'vuex';
	export default{
		data(){
			return {
				form:{
					name:"",
					phone:"",
					province:"",
					city:"",
					area:"",
					address:"",
					is_default:1
				},
				show:false,
				isCheck:true,
				addressId:0
			}
		},
		computed:{
			...mapGetters(["userInfo"]),
			isShow(){
				if(this.form.name!=""){
					return false;
				}else{
					return true;
				}
			}
		},
		methods:{
			//地址确认
			confirm(e){
				this.form.province = e.province.label;
				this.form.city = e.city.label;
				this.form.area = e.area.label;
			},
			onCheck(){
				this.isCheck = !this.isCheck;
				this.form.is_default = this.isCheck?1:0;
			},
			onSubmit(){
				if(this.form.name==""){
					this.$u.toast("请填写收货人姓名");
					return false;
				}
				if(this.form.phone==""){
					this.$u.toast("请填写联系方式");
					return false;
				}
				if(this.form.province==""){
					this.$u.toast("请选择所在地区");
					return false;
				}
				if(this.form.address==""){
					this.$u.toast("请填写详细地址");
					return false;
				}
				let prams = {
					real_name:this.form.name,
					phone:this.form.phone,
					detail:this.form.address,
					province:this.form.province,
					city:this.form.city,
					area:this.form.area,
					is_default:this.form.is_default
				}
				this.$http.saveAddress(prams).then((res)=>{
					this.$u.toast("添加成功");
					setTimeout(()=>{
						// this.$u.route("pages/library/user/address/index");
						uni.navigateBack();
					},800)
				}).catch(err => {
					this.$u.toast("添加失败");
				});
			}
		},
		onLoad(e){
			this.addressId = e.id ? e.id : 0;
			this.form.phone = this.form.phone==""?this.userInfo.phone:this.form.phone;
			uni.setNavigationBarTitle({
				title: this.addressId ? '编辑收货地址' : '添加收货地址'
			});
			if(e.type=='edit'){
				uni.getStorage({
					key:'address',
					success: ((e) => {
						this.addressId = e.data.id;
						this.form.name = e.data.real_name;
						this.form.phone = e.data.phone;
						this.form.province = e.data.province;
						this.form.city = e.data.city;
						this.form.area = e.data.area;
						this.form.address = e.data.detail;
						this.isCheck = e.data.is_default==0?false:true;
					})
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.address_wrap{
		.cell{
			margin-top:20rpx;
			.item{
				background:#ffffff;
				padding:46rpx 32rpx 30rpx 48rpx;
				font-size: 24rpx;
				color:#000000;
				display: flex;
				align-items: center;
				.input{
					flex:1;
					text-align: right;
					font-size: 24rpx;
					color:#000000;
					padding-left: 20rpx;
				}
				&:last-child{
					padding:30rpx 32rpx 44rpx 48rpx;
				}
			}
		}
		.cells{
			margin-top:20rpx;
			padding:34rpx 32rpx 44rpx 48rpx;
			background-color:#ffffff;
			.left{
				display: flex;
				flex-direction: column;
				flex:1;
				font-size: 24rpx;
				.txt{
					color:#000000;
					font-weight: bold;
				}
				.tip{
					margin-top:16rpx;
					color:#C90404;
				}
			}
			.right{
				.switchbox{
					width: 118rpx;
					height: 60rpx;
					background: #ffffff;
					border-radius: 30rpx;
					box-shadow: 0rpx 0rpx 10rpx 0rpx rgba(0,0,0,0.16);
					font-size: 24rpx;
					color: #000000;
					.icon{
						width: 30rpx;
						height: 30rpx;
						border-radius: 30rpx;
						margin-right: 28rpx;
						background: #cccccc;
					}
					&.on{
						.icon{
							background: #ff6929;
							margin-left:28rpx;
							margin-right: 0;
						}
					}
				}
			}
		}
		.ft{
			width: 100%;
			height: 140rpx;
			background: #ffffff;
			box-shadow: 0rpx 8rpx 28rpx 0rpx rgba(166,179,194,0.30);
			position: fixed;
			bottom:0;
			left:0;
			z-index: 50;
			.btn_primary{
				margin:30rpx 10rpx;
				height: 84rpx;
				line-height: 84rpx;
				text-align: center;
				font-size: 28rpx;
				color:#ffffff;
				font-weight: bold;
				background: linear-gradient(90deg,#ffb405, #ff6929);
				border-radius: 42rpx;
				box-shadow: 0rpx 6rpx 12rpx 0rpx rgba(226,123,85,0.21);
				&.disable{
					background: #f5f5f5;
					color:#CCCCCC;
					box-shadow: none;
				}
			}
		}
	}
</style>
