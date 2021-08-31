<template>
	<view class="container">
		<u-navbar back-icon-size="31" back-icon-color="#2E2E2E" back-text="消息" :back-text-style="{'color':'#000000'}">
			<view class="slotwrap" @click="goRead">
				<text>全部已读</text>
			</view>
		</u-navbar>
		<view class="notice_list">
			<view class="item u-flex" v-for="(item,index) in navlist" :key="index" @click="goMsg(item.list,index)">
				<view class="u-rela">
					<u-icon :name="item.icon" size="72"></u-icon>
					<view class="bradge" v-if="item.read_status==0"></view>
				</view>
				<view class="info u-flex-col">
					<view class="title u-flex-1">{{item.name}}</view>
					<block v-if="item.list.length">
						<view class="con" v-for="ditem in item.list" :key="ditem.id">
							<view class="time">{{ditem.add_time}}</view>
							<view class="u-line-1">{{ditem.content}}</view>
						</view>
					</block>
					<view class="con" v-else>暂无消息提醒</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				navlist:[
					{
						type:1,
						icon:"/static/images/notice/tz.png",
						name:"通知消息",
						list:[]
					},
					{
						type:2,
						icon:"/static/images/notice/pt.png",
						name:"拼团消息",
						list:[]
					},
					{
						type:3,
						icon:"/static/images/notice/sy.png",
						name:"收益助手",
						list:[]
					},
					{
						type:4,
						icon:"/static/images/notice/fs.png",
						name:"粉丝消息",
						list:[]
					},
					{
						type:5,
						icon:"/static/images/notice/other.png",
						name:"其他消息",
						list:[]
					}
				]
			}
		},
		methods:{
			goMsg(data,index){
				this.$u.route("pages/library/notice/msg",{data:data,index:index});
			},
			getList(){
				this.navlist.forEach((item,index)=>{
					this.$http.getNoticelist(item.type).then((res)=>{
						this.$set(this.navlist[index],"list",res.data.data);
						this.navlist.forEach((item,index)=>{
							item.list.forEach((ditem,sindex)=>{
								this.$set(this.navlist[index],"read_status",ditem.read_status);
							})
						})
					})
				})
			},
			goRead(){
				let ids = [];
				let sid = "";
				this.navlist.forEach((item)=>{
					item.list.forEach((ditem)=>{
						ids.push(ditem.id);
					})
				})
				sid = ids.join(",");
				this.$http.noticeReaded(sid).then((res)=>{
					this.navlist.forEach((item,index)=>{
						item.list.forEach((ditem,sindex)=>{
							ditem.read_status = 1;
						})
					})
				})
			}
		},
		onLoad(){
			this.getList();
		}
	}
</script>

<style lang="scss" scoped>
	.slotwrap{
		display: flex;
		flex:1;
		justify-content: flex-end;
		align-items: center;
		font-size: 24rpx;
		color:#2E2E2E;
		margin-right: 20rpx;
	}
	.notice_list{
		background-color: #ffffff;
		.item{
			padding:38rpx 0 34rpx 64rpx;
			position: relative;
			.bradge{
				width: 12rpx;
				height: 12rpx;
				background: #ff6929;
				border-radius: 50%;
				position: absolute;
				top:16rpx;
				right:0;
			}
			.info{
				margin-left: 33rpx;
				width: 100%;
				position: relative;
				overflow: hidden;
				.title{
					font-size: 28rpx;
					color:#2E2E2E;
				}
				.time{
					font-size: 20rpx;
					color:#999999;
					padding-right: 36rpx;
					position: absolute;
					top:0;
					right: 0;
				}
				.con{
					font-size: 24rpx;
					color:#999999;
				}
			}
			&::before{
				content:"";
				position: absolute;
				bottom:0;
				right:0;
				z-index: 20;
				width: 580rpx;
				height: 2rpx;
				background-color:#f5f5f5;
			}
			&:last-child{
				&::before{
					content:none;
				}
			}
		}
	}
</style>
