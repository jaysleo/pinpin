<script>
	export default {
		onLaunch: function() {
			console.log('App Launch');
		},
		onShow: function() {
			console.log('App Show');
		},
		onHide: function() {
			console.log('App Hide');
		}
	}
</script>

<style lang="scss">
	@import "uview-ui/index.scss";
	page{
		background:#FAFBFF;
		font-family: PingFang SC,PingFang SC-Bold,PingFang SC-Regular,-apple-system,Helvetica,sans-serif;
		-webkit-tap-highlight-color:rgba(0,0,0,0);
	}
	button::after {
	  border: none;
	  content: none;
	}
	.state-hack {
		width: 100%;
		height: var(--status-bar-height);
	}
	.combtn{
		background: linear-gradient(90deg,#ffb405, #ff6929);
		box-shadow: 0rpx 6rpx 12rpx 0rpx rgba(226,123,85,0.21);
	}
	.ftbtn{
		width: 100%;
		height: 140rpx;
		background: #ffffff;
		box-shadow: 0rpx 8rpx 28rpx 0rpx rgba(166,179,194,0.30);
		position: fixed;
		bottom:0;
		left:0;
		z-index: 50;
		.btn_primary{
			margin:30rpx 20rpx;
			height: 84rpx;
			line-height: 84rpx;
			text-align: center;
			font-size: 28rpx;
			color:#ffffff;
			font-weight: bold;
			background: linear-gradient(135deg,#fcd050, #fd9e3d 52%, #ff6929 100%);
			border-radius: 42rpx;
			box-shadow: 0rpx 6rpx 12rpx 0rpx rgba(226,123,85,0.21);
			&.disable{
				background: #f5f5f5;
				color:#CCCCCC;
				box-shadow: none;
			}
		}
	}
</style>