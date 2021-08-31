<template>
	<view class="modalbox" :class="{'active':showModal}" hover-stop-propagation @touchmove.stop.prevent @tap.stop.prevent>
		<view class="overlay"></view>
		<view class="shop_modal safe-area-inset-bottom" :class="[goodsType==2?'couple':'']">
			<view class="close" @click="close">
				<u-icon name="close" size="27" color="#999999"></u-icon>
			</view>
			<view class="top u-flex">
				<image class="shop_img" :src="goodsInfo.proSelect.image?goodsInfo.image:goodsInfo.proSelect.image" mode="aspectFill"></image>
				<view class="goods_box u-flex-col u-row-between">
					<view class="price_box u-flex">
						<text>卷后价</text>
						<text class="unit">￥{{goodsInfo.proSelect.price||0}}</text>
					</view>
					<view class="stock">库存{{goodsInfo.proSelect.stock||0}}件</view>
					<view class="goods_title">{{goodsInfo.proSelect.suk}}</view>
				</view>
			</view>
			<!-- 规格选项 -->
			<view class="u-rela">
				<scroll-view scroll-y class="content_box">
					<view class="select_box u-flex-col u-row-left" v-for="(item, indexw) in goodsInfo.attr" :key="indexw">
						<view class="type_title">{{item.attr_name }}</view>
						<view class="tagbox">
							<view class="itag" v-for="(itemn, indexn) in item.attr_values" :key="indexn" :class="item.index === itemn ? 'tag-active' : ''" @click="tapAttr(indexw, indexn)">
								{{itemn}}
							</view>
						</view>
					</view>
					<!-- 计步器 -->
					<view class="buynum_box u-flex u-row-between">
						<view class="num_title u-flex">
							<text>购买数量</text>
							<block v-if="goodsType!=0">
								<text class="xgnum" v-if="goodsInfo.once_num!=0">（仅限{{goodsInfo.once_num}}件）</text>
							</block>
						</view>
						<number-box v-model="cartNum" :min="1" :step="1" :max="maxNum" @minus="ChangeCartNum(false)" @plus="ChangeCartNum(true)"></number-box>
					</view>
				</scroll-view>
				<block v-if="goodsType!=0">
					<view class="ptauto u-flex">
						<view class="u-flex u-flex-1">
							<text class="tit">开启自动拼团</text>
							<u-image src="/static/images/user/memtq.png" width="158" height="34"></u-image>
						</view>
						<view class="switchbox u-flex u-row-center" :class="[is_vip == 1 ? 'on' : '']">
							<block v-if="is_vip == 0">
								<view class="icon"></view>
								<text>关</text>
							</block>
							<block v-else>
								<text>开</text>
								<view class="icon"></view>
							</block>
						</view>
						<switch-box v-model="isCheck"></switch-box>
					</view>
				</block>
			</view>
			<!-- 功能按钮 -->
			<u-gap height="120"></u-gap>
			<view class="ftbtn safe-area-inset-bottom">
				<button class="u-reset-button btn_primary" v-if="goodsType==0" @click="onPink(0)">确定</button>
				<block v-if="goodsType!=0">
					<button class="u-reset-button btn_primary" v-if="grouponBuyType=='alone'&&goodsInfo.proSelect.stock>0" @click="onPink(1)">我要开团</button>
					<button class="u-reset-button btn_primary" v-if="grouponBuyType=='ing'&&goodsInfo.proSelect.stock>0" @click="onPink(1,uid)">一键拼团</button>
					<button class="u-reset-button btn_primary" v-if="grouponBuyType=='ings'&&goodsInfo.proSelect.stock>0" @click="onPink(2,uid)">拼团</button>
				</block>
			</view>
		</view>
	</view>
</template>

<script>
/**
 * 多规格组件
 * @property {Object} goodsInfo - 商品数据
 * @property {Boolean} value = showModal - 显隐
 * @property {String} buyType  - 购买方式
 * @property {String} goodsType - 商品类别
 * @property {String} grouponBuyType -拼团商品购买方式
 */
import { mapMutations, mapActions, mapState } from 'vuex';
import numberBox from '../numberbox/numberbox.vue'
export default {
	components: {
		numberBox
	},
	props: {
		goodsInfo: {
			type: Object,
			default() {
				return {};
			}
		},
		value: {
			type: Boolean,
			default: false
		},
		goodsType:{
			type:String,
			default:""
		},
		grouponBuyType:{
			type:String,
			default:""
		},
		is_vip:{
			type:Number,
			value:0
		},
		uid:{
			type:Number,
			value:0
		}
	},
	watch: {
		value(val) {
			if (val) {
				this.open();
			}
		}
	},
	computed: {},
	data() {
		return {
			cartNum:1,
			maxNum:0,
			isCheck:false,
			showModal:false
		}
	},
	methods: {
		open(){
			this.showModal = true;
		},
		close(){
			this.showModal = false;
			this.$emit("input",false);
		},
		jump(path, parmas) {
			this.$u.route({
				url: path,
				params: parmas
			});
		},
		//是否自动拼团
		change(status){
			console.log(status)
			this.isCheck = status;
		},
		// 数量
		ChangeCartNum(changeValue) {
			//changeValue:是否 加|减
			//获取当前变动属性
			let productSelect = this.goodsInfo.proSelect;
			this.maxNum = this.goodsInfo.once_num == 0?this.goodsInfo.proSelect.stock:this.goodsInfo.once_num;
			//如果没有属性,赋值给商品默认库存
			if (productSelect === undefined && !this.goodsInfo.value.length) productSelect = this.goodsInfo.proSelect;
			//无属性值即库存为0；不存在加减；
			if (productSelect === undefined) return;
			let stock = this.goodsInfo.proSelect.stock || 0;
			let num = this.cartNum;
			if (changeValue) {
				num++;
				if(num>this.maxNum){
					this.$u.toast("已超出最大购买量"+this.goodsInfo.once_num+this.goodsInfo.unit_name);
					num--;
				}
				if (num > stock) {
					this.$set(this.goodsInfo.proSelect,"cart_num",stock ? stock : 1);
					this.cartNum = stock ? stock : 1;
				}
				this.cartNum = num;
				this.$set(this.goodsInfo.proSelect,"cart_num",this.cartNum);
			} else {
				num--;
				if (num < 1) {
					this.cartNum = 1;
					num++;
					this.$set(this.goodsInfo.proSelect,"cart_num",1);
				}
				this.cartNum = num;
				this.$set(this.goodsInfo.proSelect,"cart_num",this.cartNum);
			}
		},
		tapAttr(indexw, indexn) {
			let that = this;
			that.$emit("attrVal", {
				indexw: indexw,
				indexn: indexn
			});
			this.$set(this.goodsInfo.attr[indexw], 'index', this.goodsInfo.attr[indexw].attr_values[indexn]);
			let value = that.getCheckedValue().join(",");
			that.$emit("ChangeAttr", value);
		},
		//获取被选中属性；
		getCheckedValue(){
			let productAttr = this.goodsInfo.attr;
			let value = [];
			for (let i = 0; i < productAttr.length; i++) {
				for (let j = 0; j < productAttr[i].attr_values.length; j++) {
					if (productAttr[i].index === productAttr[i].attr_values[j]) {
						value.push(productAttr[i].attr_values[j]);
					}
				}
			}
			return value;
		},
		//0单1拼
		onPink(index,uid){
			this.close();
			this.$set(this.goodsInfo.proSelect,"cart_num",this.cartNum);
			this.$store.commit("setPink",{"data":this.goodsInfo,"type":this.goodsType});
			if(index==2){
				this.$u.route("pages/library/order/confirm",{way:1,type:"pink",uid:uid});
				return;
			}
			if(index==0){
				this.$u.route("pages/library/order/confirm",{way:0,type:"order",uid:0});
				return;
			}
			if(index==1){
				if(uid){
					this.$u.route("pages/library/order/confirm",{way:1,type:"pink",uid:uid});
				}else{
					this.$u.route("pages/library/order/confirm",{way:1,type:"pink",uid:0});
				}
			}
		}
	},
	created() {},
	mounted() {
		this.value && this.open();
	}
}
</script>

<style lang="scss" scoped>
	.modalbox{
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		z-index: 900;
		width: 100%;
		height: 100%;
		visibility: hidden;
		transition: visibility 300ms cubic-bezier(.36,.66,.04,1);
		.overlay{
			width: 100%;
			height: 100%;
			background: rgba(0,0,0,0.5);
			position: fixed;
			bottom: 0;
			left: 0;
			right: 0;
			z-index: 500;
			opacity: 0;
		}
		&.active{
			visibility: visible;
			.overlay{
				opacity: 1;
			}
			.shop_modal{
				transform: translate3d(0,0,0);
			}
		}
	}

// 规格
.shop_modal {
	width: 100%;
	height: 845rpx;
	background: #ffffff;
	padding: 22rpx 40rpx 22rpx 44rpx;
	border-radius: 20rpx;
	position: absolute;
	bottom: 0;
	left: 0;
	z-index: 500;
	transform: translate3d(0,100%,0);
	transition: transform 800ms cubic-bezier(.36,.66,.04,1),-webkit-transform 800ms cubic-bezier(.36,.66,.04,1);
	.close{
		width: 27rpx;
		height: 27rpx;
		position: absolute;
		top:40rpx;
		right: 40rpx;
		z-index: 500;
	}
	// 商品卡片
	.top {
		.shop_img {
			width: 182rpx;
			height: 182rpx;
			border-radius: 6rpx;
			margin-right: 36rpx;
			margin-top:-42rpx;
		}
		.goods_box {
			align-items: flex-start;
			.goods_title {
				font-size: 24rpx;
				font-weight: 500;
				color: #000000;
				line-height: 34rpx;
				text-align: left;
			}
			.goods-bottom {
				width: 100%;
			}
			.price_box{
				font-size: 24rpx;
				color: #FF6929;
				margin-bottom: 16rpx;
				.unit{
					font-size: 28rpx;
					font-weight: bold;
				}
			}
			.stock {
				font-size: 24rpx;
				color: #999999;
				margin-bottom: 16rpx;
			}
		}
	}

.content_box{
	height: 480rpx;
}
	// 规格选项
	.select_box {
		margin-top:30rpx;
		.type_title {
			font-size: 28rpx;
			color:#000000;
			font-weight: 400;
			margin-bottom: 28rpx;
		}
		.tagbox {
			display: flex;
			.itag {
				display: inline-block;
				line-height: 62rpx;
				background:#fafbff;
				border:2rpx #fafbff solid;
				border-radius: 30rpx;
				font-size: 24rpx;
				font-weight: 400;
				color:#000000;
				padding: 0 30rpx;
				margin-bottom: 20rpx;
				margin-right: 20rpx;
				margin-left: 0;
			}
			.tag-active {
				background: #fff8f5;
				border-color:#ff6929;
				color: #FF6929;
			}
			.tag-disabled {
				background: #f8f8f8;
				color: #cacaca;
			}
		}
	}

	.buynum_box {
		margin-top:50rpx;
		margin-bottom: 38rpx;
		.num_title {
			font-size: 28rpx;
			color:#000000;
			font-weight: 500;
			.xgnum{
				font-size: 24rpx;
				color:#FF6929;
			}
		}
	}
	.ptauto{
		width: 100%;
		height: 60rpx;
		font-size: 24rpx;
		color:#000000;
		.tit{
			margin-right: 20rpx;
		}
	}
	.switchbox{
		width: 86rpx;
		height: 42rpx;
		background: #ffffff;
		border-radius: 21rpx;
		box-shadow: 0rpx 0rpx 10rpx 0rpx rgba(0,0,0,0.16);
		font-size: 24rpx;
		color: #000000;
		.switch_node {
			position: absolute;
			top: 0;
			left: 0;
			transition: transform 0.3s cubic-bezier(0.3, 1.05, 0.4, 1.05);
		}
		.icon{
			width: 30rpx;
			height: 30rpx;
			border-radius: 30rpx;
			margin-right: 8rpx;
			background: #cccccc;
		}
		&.on{
			.icon{
				background: #e3c993;
				background-image: linear-gradient(#ff7e47, #ffbc9f);
				margin-left:8rpx;
				margin-right: 0;
			}
		}
	}
	&.couple{
		.price_box{
			color: #C90404 !important;
		}
		.tag-active {
			border-color:#C90404 !important;
			color: #C90404 !important;
		}
		.xgnum{
			color: #C90404 !important;
		}
		.btn_primary{
			background: linear-gradient(135deg,#fb8b8b, #ea5e5e 52%, #d01919 100%);
		}
	}
}
</style>
