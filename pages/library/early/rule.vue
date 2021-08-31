<template>
	<view class="container">
		<view class="u-rela">
			<image src="/static/images/early/tbbg2.png" mode="aspectFit" class="bgbox"></image>
		</view>
		<view class="rulewrap">
			<u-gap height="120"></u-gap>
			<view class="u-flex u-row-center">
				<u-image src="/static/images/early/titbg.png" width="328" height="184" class="tbg"></u-image>
			</view>
			<view class="ruleinfo">
				<view class="topt u-flex">
					<view class="tit">活动规则</view>
				</view>
				<u-image src="/static/images/early/bg2.png" width="634" height="224"></u-image>
				<u-gap height="50"></u-gap>
				<view class="content">
					<u-parse :html="gzcon"></u-parse>
				</view>
				<view class="topt u-flex">
					<view class="tit">常见问题</view>
				</view>
				<view class="content">
					<u-parse :html="wtcon"></u-parse>
				</view>
				<view class="topt u-flex">
					<view class="tit">特殊说明</view>
				</view>
				<view class="content">
					<u-parse :html="smcon"></u-parse>
				</view>
				<u-gap height="50"></u-gap>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				gzcon:`<p><span style="font-weight:bold;">【第1步】</span>用户支付10元报名早起打卡</p>
				<p><span style="font-weight:bold;">【第2步】</span>在规定挑战时间内(当天05:00-08:00)进入活动页面完成打卡，视为挑战成功。</p>
				<p><span style="font-weight:bold;">【第3步】</span>挑战成功的用户获得>保证金的奖励(可提现至银行卡)。</p>
				<p><span style="font-weight:bold;">【第4步】</span>每日打卡成功后发放奖金，需要手动领取，领取后可报名参加下一期早起打卡。</p>`,
				wtcon:`<p>Q:如何完成早起打卡?<br/>
				A:每天08:00-第二天凌晨04:00前报名，挑战打卡时间为第二天05:00-08:00。挑战时间内回到活动页面打卡，系统会提示打卡成功。时间以北京时间为准。<br/>
				Q:如何获得早起奖励金?<br/>
				A:成功完成打卡的用户，可获得的奖励为“本人保证金+瓜分本期未达标用户保证金”，“本期用户”指同一天报名的所有用户。奖励将在挑战时间结束后当日12:00后发放，奖励金自动发放无需领取。奖励金将放入余额中可进行提现。<br/>
				Q:如何提现?<br/>
				A:用户进入我的余额可将奖励金提现。提现中的金额会暂时冻结，直到成功到账。如因用户“输错银行卡账号”等主观原因造成的提现失败，本公司概不负责。
				Q:如果没有完成打卡保证金退还吗?<br/>
				A:若未在规定时间完成打卡，视为挑战失败，保证金不予退还，作为同组挑战成功用户的奖励被瓜分。</p>`,
				smcon:`<p>本活动仅适用于中国大陆，app中所有的时间以服务器同步的标准北京时间为准，同期同一个手机同一个人只允许参加一次打卡。</p>
				<p>请您在使用本app提供的服务之前仔细阅读该规则，由于用户未仔细阅读或未阅读该规则而造成的一切损失或争议，本公司概不负责，请您知晓!该活动最终解释权归拼拼有礼所有，与苹果公司无关。</p>`
			}
		}
	}
</script>
<style lang="scss">
	page{background: #ffd574;}
</style>
<style lang="scss" scoped>
	.bgbox{
		width: 750rpx;
		height: 770rpx;
		position: absolute;
		top:0;
		left: 0;
		right: 0;
		z-index: 20;
	}
	.rulewrap{
		position: relative;
		z-index: 50;
		padding: 0 32rpx;
	}
	.ruleinfo{
		background-color: #ffffff;
		border-radius: 20rpx;
		padding:0 25rpx;
		margin:32rpx 0;
		.topt{
			padding:50rpx 0 40rpx;
			.tit{
				width: 210rpx;
				height: 52rpx;
				margin:0 auto;
				line-height: 52rpx;
				font-size: 24rpx;
				color:#ffffff;
				font-weight: bold;
				text-align: center;
				background: linear-gradient(90deg,#ffac08,#ff9314,#ff7324);
				border-radius: 26rpx;
			}
		}
		.content{
			font-size: 24rpx;
			color:#000000;
		}
	}
</style>
