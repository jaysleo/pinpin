import {Apiurl} from './config';
import { toLogin, checkLogin } from './login';
import Cache from './cache';

const HTTP_REQUEST_URL = Apiurl;
const HEADER = {"content-type": "application/json;charset=utf-8"};

/**
 * 发送请求
 */
function baseRequest(url, method, data, {noAuth = false, noVerify = false}){
  let Url = HTTP_REQUEST_URL, header = HEADER;
  
  if (!noAuth) {
    //登录过期自动登录
	if(!uni.getStorageSync("token") && !checkLogin()){
		return toLogin();
		// return Promise.reject({msg:'未登陆'});
	}
  }
  if (uni.getStorageSync("token")) header['x-token'] = uni.getStorageSync("token");
  return new Promise((reslove, reject) => {
	  uni.request({
		  url: Url + '/api/' + url,
		  method: method || 'GET',
		  header: header,
		  data: data || {},
		  success: (res) => {
				if(noVerify){
					reslove(res.data, res);
				}else if (res.data.code == 200){
					reslove(res.data, res);
				}else if ([410].indexOf(res.data.code) !== -1) {
					toLogin();
					reslove(res.data,res);
				}else if(res.data.code == 0){
					reslove(res.data,res);
				}else{
					reject(res.data.msg || '系统错误');
				}
			},fail: (msg) => {
				reject('请求失败');
			}
		})
	}).catch((res)=>{
		console.log(res)
	});
}

const request = {};

['options', 'get', 'post', 'put', 'head', 'delete', 'trace', 'connect'].forEach((method) => {
  request[method] = (api, data, opt) => baseRequest(api, method, data, opt || {})
});

export default request;

// import cache from './cache'
// const APIURL = "https://hii7mo3m.dnat.tech/api/";
// module.exports = {
// 	post: function(url, data, xAuthToken = true) {
// 		url = APIURL+url;
// 		let header = {
//             "content-type": "application/json; charset=utf-8"
//         }
//         if (xAuthToken) {
// 			header = {
// 				"content-type": "application/json; charset=utf-8",
// 				"token": uni.getStorageSync('token')
// 			}
//         }
// 		return new Promise((succ, error) => {
// 			uni.showLoading({
// 				title:'加载中'
// 			});
// 			uni.request({
// 				url: url,
// 				data: data,
// 				method: "POST",
// 				header: header,
// 				success: function(result) {
// 					if(result.statusCode!=200){   //请求失败显示报错信息
// 						uni.hideLoading();
// 						return;
// 					}
// 					setTimeout(()=>{
// 						uni.hideLoading();
// 						succ.call(self, result.data);
// 					},1000);
// 				},
// 				fail: function(e) {
// 					uni.hideLoading();
// 					uni.showToast({
// 						title: "请求超时",
// 						icon: "none"
// 					})
// 					error.call(self, e)
// 				}
// 			})
// 		})
// 	},
// 	get: function(url, data, xAuthToken = true) {
// 		url = APIURL+url;
//         let header = {
//             "content-type": "application/json; charset=utf-8"
//         }
//         if (xAuthToken) {
//             header = {
//                 "content-type": "application/json; charset=utf-8",
//                 "token": uni.getStorageSync('token')
//             }
//         }
// 		return new Promise((succ, error) => {
// 			uni.showLoading({
// 				title:'加载中'
// 			});
// 			uni.request({
// 				url: url,
// 				data: data,
// 				method: "GET",
// 				header: header,
// 				success: function(result) {
// 					if(result.statusCode!=200){   //请求失败显示报错信息
// 						uni.hideLoading();
// 						return;
// 					}
// 					setTimeout(()=>{
// 						uni.hideLoading();
// 						succ.call(self, result.data)
// 					},1000);
// 				},
// 				fail: function(e) {
// 					uni.hideLoading();
// 					uni.showToast({
// 						title: "请求超时",
// 						icon: "none"
// 					})
// 					error.call(self, e)
// 				}
// 			})
// 		})
// 	}
// }