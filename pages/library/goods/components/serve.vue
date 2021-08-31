<template>
	<view class="serverbox">
		<view class="server u-flex" @click="showModal = true">
			<text>保障承诺</text>
			<text class="txt">晚发必赔·假一赔三·七天退换</text>
			<u-icon name="arrow-right" size="20" color="#cccccc"></u-icon>
		</view>
		<u-popup v-model="showModal" mode="bottom" :closeable="true" close-icon-pos="top-right">
			<view class="server_modal">
				<view class="server_modal_box">
					<view class="modal_head u-flex u-row-center u-col-center"><text class="head-title">服务保障</text></view>
					<view class="modal_content">
						<view class="serve_list" v-for="serve in serveList" :key="serve.title">
							<view class="title_box u-flex">
								<u-icon name="checkmark-circle" size="38" color="#ff6929"></u-icon>
								<text class="serve_title">{{serve.name}}</text>
							</view>
							<view class="serve_detail">{{serve.desc}}</view>
						</view>
					</view>
					<view class="modal_foot u-flex u-row-center u-col-center">
						<button type="default" class="u-reset-button serve_btn" @click="showModal = false">确定</button>
					</view>
				</view>
			</view>
		</u-popup>
	</view>
</template>

<script>
	export default {
		components: {},
		data() {
			return {
				showModal: false,
				serveList:[
					{
						name:"极速退款",
						desc:"超快无审核退款流程"
					},
					{
						name:"退货保障",
						desc:"卖家投保退货运费险"
					},
					{
						name:"七天退换",
						desc:"满足相应条件(吊牌缺失，洗涤后不支持)时，消费者可申请“七天无理由退货”"
					}
				]
			};
		},
	}
</script>

<style lang="scss">
	.serverbox{
		.server{
			font-size: 24rpx;
			color:#000000;
			height: 66rpx;
			.txt{
				color:#999999;
				margin-left: 44rpx;
				flex:1;
			}
		}
		.server_modal_box{
			width: 750rpx;
			height: 100%;
			border-radius: 30rpx 30rpx 0 0;
			background: #fff;
			padding: 30rpx;
			.serve_btn{
				width:100%;
				line-height: 80rpx;
				background: linear-gradient(0deg,#ffb405, #ff6929 95%);
				border-radius: 40rpx;
				font-size: 30rpx;
				color: #ffffff;
			}
			.modal_head{
				margin-bottom: 30rpx;
				position: relative;
				.head_title{
					font-size: 32rpx;
					font-weight: bold;
				}
			}
			.modal_content{
				overflow-y: auto;
				.serve_list{
					padding-bottom: 40rpx;
					.title_tag{
						width: 38rpx;
						height: 38rpx;
					}
					.serve_title{
						margin-left: 20rpx;
						font-size: 28rpx;
						font-weight: bold;
					}
					.serve_detail{
						text-align: left;
						font-size: 26rpx;
						color: #999;
						line-height: 42rpx;
						padding-left: 58rpx;
						margin-top: 20rpx;
					}
				}
			}
		}
	}
</style>
