import store from "../store";
import Cache from '../utils/cache';

function prePage() {
	let pages = getCurrentPages();
	let prePage = pages[pages.length - 1];
	return prePage.route;
}

export function toLogin() {
	// store.commit("logOut");
	let pages = getCurrentPages();
	let currentPage = pages[pages.length - 1];
	uni.setStorageSync("backurl",currentPage.$page.fullPath);
	uni.redirectTo({
		url: '/pages/login/login'
	})
}

export function checkLogin() {
	let token = uni.getStorageSync("token");
	let expiresTime = Cache.get("expires_time");
	let newTime = Math.round(new Date() / 1000);
	if (expiresTime < newTime || !token) {
		Cache.clear("token");
		Cache.clear("expires_time");
		Cache.clear("user_info");
		uni.clearStorageSync();
		return false;
	} else {
		store.commit('updateLogin', token);
		let userInfo = uni.getStorageSync("userInfo");
		if (userInfo) {
			store.commit('updateUserinfo', userInfo);
		}
		return true;
	}
}