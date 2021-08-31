/**
 * 权限入口文件
 * @param {String}  authType -权限种类
 */
// #ifdef MP
import MpAuth from './mp.js' //微信小程序
// #endif


export default class Auth {

	constructor(authType) {
		this.authType = authType
	}

	async check() {
		let state = 0
		// #ifdef MP
		state = await new MpAuth(this.authType).checkAuth()
		// #endif
		return Promise.resolve(state)
	}

}
