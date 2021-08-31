<template>
	<view class="container">
		<seaBox :searchVal="searchVal" @onSearch="onSearch"></seaBox>
		<view class="content_box">
			<view class="search_history" v-if="historyTag.length">
				<view class="title_box">
					<view class="title">热门搜索</view>
					<view class="clear_history" @click="showModal = true">
						<u-icon name="trash" size="40" color="#cccccc"></u-icon>
					</view>
				</view>
				<view class="content u-flex u-flex-wrap">
					<view class="reset_btn" v-for="(item,index) in historyTag" :key="index" @click="goSearch(item)">{{item.keyword}}</view>
				</view>
			</view>
		</view>
		<u-modal v-model="showModal" :show-cancel-button="true"  @confirm="clearSearchHistory" confirm-text="清除" cancel-text="取消" content="是否清除历史搜索记录？" title="提示"></u-modal>
	</view>
</template>

<script>
	import seaBox from '../components/search-box/search.vue'
	export default{
		components:{
			seaBox
		},
		data(){
			return{
				seastyle:{
					"width":"132rpx",
					"height": "64rpx",
					"line-height": "64rpx",
					"font-size": "24rpx",
					"color":"#ffffff",
					"background-color":"#FF6929",
					"border-radius":"64rpx",
					"margin-left": "20rpx"
				},
				searchVal: "",
				historyTag: [],
				showModal:false,
				type:"product"
			}
		},
		methods:{
			// 搜索
			onSearch(e) {
				if(e==""){
					this.$u.toast("请输入商品关键词");
					return false;
				}
				if (e && !this.historyTag.includes(e)) {
					let searchHistoryArr = JSON.stringify(this.getArr(this.historyTag, e));
				}
				this.$u.route(`/pages/library/search/list?keywords=${e}&type=${this.type}`);
			},
			//热门词
			goSearch(e) {
				if(e==undefined&&e==""){
					this.$u.toast("关键词有误，请重新输入");
					return false;
				}
				if (e && !this.historyTag.includes(e)) {
					let searchHistoryArr = JSON.stringify(this.getArr(this.historyTag, e));
					// uni.setStorageSync("searchHistoryArr", searchHistoryArr);
				}
				this.$u.route(`/pages/library/search/list?keywords=${e.keyword}&type=${e.type}`);
			},
			// 队列
			getArr(list, item) {
				let arr = list;
				let length = 10; //队列长度
				arr.length < length ? arr.unshift(item) : arr.pop();
				return arr;
			},
			// 清除历史记录
			clearSearchHistory() {
				this.historyTag = [];
				uni.removeStorageSync("searchHistoryArr");
			},
			gethot(){
				this.$http.hotSearch().then((res)=>{
					this.historyTag = res.data;
				})
			}
		},
		onLoad(option){
			if(option.type){
				this.type = option.type;
			}
			this.gethot();
			// this.historyTag = uni.getStorageSync("searchHistoryArr");
		}
	}
</script>

<style lang="scss" scoped>
	
	.content_box{
		margin: 40rpx;
		.search_history{
			.title_box{
				font-size: 24rpx;
				color:#000000;
				margin-bottom: 24rpx;
				display: flex;
				justify-content: space-between;
			}
			.content{
				.reset_btn{
					padding-left: 47rpx;
					padding-right: 47rpx;
					line-height: 60rpx;
					border: 0;
					height: 60rpx;
					background-color: #ffffff;
					border-radius: 30rpx;
					font-size: 24rpx;
					color:#6F7070;
					margin:0 24rpx 24rpx 0;
				}
			}
		}
	}
</style>
