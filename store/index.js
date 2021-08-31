import Vue from 'vue';
import Vuex from 'vuex';
import Cache from '../utils/cache';
Vue.use(Vuex);

const store = new Vuex.Store({
	state: {
		token: uni.getStorageSync("token") || false,
		userInfo: uni.getStorageSync("userInfo") || {is_new:0,is_vip:0,nickname:"",real_name:"",uniqid:"",avatar:""},
		activity:{},
		proInfo:{},
		pink:{},
		orderInfo:{},
		porderInfo:{},
		spellGoods:{},
		refundGoods:{}
	},
	getters:{
		token: state => state.token,
		isLogin: state => !!state.token,
		userInfo: state => state.userInfo,
		activity: state => state.activity || {},
		proInfo: state => state.proInfo || {},
		pink: state => state.pink || {},
		orderInfo: state => state.orderInfo || {},
		porderInfo: state => state.porderInfo || {},
		spellGoods: state => state.spellGoods || {},
		refundGoods: state => state.refundGoods || {}
	},
	mutations: {
		Login(state, opt) {
			state.token = opt.token;
			// Cache.set("token", opt.token);
			uni.setStorageSync("token",opt.token);
		},
		logOut(state) {
			state.token = undefined;
			state.uid = undefined;
			// Cache.clear("token");
			// Cache.clear("uid");
			uni.clearStorageSync();
		},
		updateUserinfo(state, userInfo) {
			state.userInfo = userInfo;
			// Cache.set("userInfo", userInfo);
			uni.setStorageSync("userInfo",userInfo);
		},
		sethclist(state, data){
			state.activity = data;
		},
		setDetail(state,data){
			state.proInfo = data;
		},
		setPink(state,data){
			let adata = data.data;
			let ndata = {
				type:data.type,
				once_num:adata.once_num,
				unit_name:adata.unit_name,
				id:adata.id,
				name:adata.name,
				is_postage:adata.is_postage,
				postage:adata.postage,
				people:adata.people,
				pick_people:adata.pick_people,
				proSelect:adata.proSelect
			};
			state.pink = ndata;
		},
		setuInfo(state,data){
			state.userInfo.avatar = data.avatar;
			state.userInfo.nickname = data.nickname;
		},
		setoDetail(state,data){
			state.orderInfo = data;
		},
		setpDetail(state,data){
			state.porderInfo = data;
		},
		setpGoods(state,data){
			state.spellGoods = data;
		},
		setrGoods(state,data){
			state.refundGoods = data;
		}
	},
	actions:{}
})

export default store
