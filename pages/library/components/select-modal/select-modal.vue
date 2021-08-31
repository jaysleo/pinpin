<template>
	<u-popup mode="bottom" v-model="cshow" :safe-area-inset-bottom="true" :closeable="false" border-radius="10">
		<view class="reapopcon">
			<view class="toptit u-flex-col u-col-center u-rela">
				<text>取消订单</text>
				<text class="desc">请选择原因</text>
				<view class="iclose" @click="close">
					<u-icon name="/static/images/common/iclose.png" size="45"></u-icon>
				</view>
			</view>
			<view class="content">
				<view class="item u-flex u-col-top" v-for="(item,index) in olist" :key="index" @click="otab(index,item.name)">
					<view class="icon checked" v-if="cur==index">
						<u-icon name="/static/images/common/checkeds.png" size="40"></u-icon>
					</view>
					<view class="icon" v-else></view>
					<view class="u-flex-col">
						<text>{{item.name}}</text>
						<input type="text" class="ipt" v-if="index==2" placeholder-style="color:#999999" v-model="reason" placeholder="请填写" />
					</view>
				</view>
			</view>
			<u-gap height="140"></u-gap>
			<view class="ftbtn">
				<button class="u-reset-button btn_primary" @click="onCancel">确认取消</button>
			</view>
		</view>
	</u-popup>
</template>

<script>
	export default{
		props:{
			value:{
				type:Boolean,
				default:false
			}
		},
		data(){
			return{
				olist:[
					{
						id:1,
						name:"买错/多买"
					},
					{
						id:2,
						name:"不想要了"
					},
					{
						id:3,
						name:"其他原因"
					}
				],
				cshow:false,
				cur:0,
				reason:"",
				cureason:"买错/多买"
			}
		},
		watch: {
			value(val) {
				if (val) {
					this.open();
				}
			}
		},
		methods:{
			open(){
				this.cshow = true;
			},
			close(){
				this.cshow = false;
				this.$emit("input",false);
			},
			onCancel(){
				if(this.cur==2 && this.reason==""){
					this.$u.toast("请填写原因");
					return false;
				}
				let value = this.cur==2?this.reason:this.cureason;
				this.$emit("cancel",value);
				this.close();
			},
			otab(index,value){
				this.cur = index;
				this.cureason = this.cur==2?this.reason:value;
				this.$emit("cancel",this.cureason);
			}
		}
	}
</script>

<style lang="scss" scoped>
	.reapopcon{
		padding:0 20rpx;
		.toptit{
			padding:30rpx 0;
			font-size: 28rpx;
			color:#333333;
			font-weight: bold;
			.desc{
				font-size: 24rpx;
				color:#999999;
				font-weight: normal;
			}
			.iclose{
				position: absolute;
				top:19rpx;
				right:19rpx;
				z-index: 999;
			}
		}
		.content{
			.item{
				padding:30rpx 0;
				font-size: 28rpx;
				color:#333333;
				.icon{
					margin-right: 24rpx;
					width: 40rpx;
					height: 40rpx;
					border: 1rpx solid #999999;
					border-radius: 50%;
					&.checked{
						border:0;
					}
				}
				.ipt{
					font-size: 28rpx;
					color:#333333;
					margin-top: 24rpx;
				}
			}
		}
	}
</style>
