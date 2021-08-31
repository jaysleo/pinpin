export default {
	/**
	 * 图片处理-预览图片
	 * @param {Array} urls - 图片列表
	 * @param {Number} current - 首个预览下标
	 */
	previewImage(urls = [], current = 0) {
		uni.previewImage({
			urls: urls,
			current: current,
			indicator: 'default',
			loop: true,
			fail(err) {
				console.log('previewImage出错', urls, err)
			},
		})
	},

	/**
	 * 数据分组
	 * @param {Array} oArr - 原数组列表
	 * @param {Number} length - 单个数组长度
	 * @return {Array}  arr - 分组后的新数组
	 */
	splitData(oArr = [], length = 1) {
		let arr = [];
		let minArr = [];
		oArr.forEach(c => {
			if (minArr.length === length) {
				minArr = [];
			}
			if (minArr.length === 0) {
				arr.push(minArr);
			}
			minArr.push(c);
		});
		return arr;
	},
	/**
	 * 剩余时间格式化
	 * @param {Number} t - 剩余多少秒
	 * @return {Object}  format - 格式后的天时分秒对象
	 */
	format(t) {
		let format = {
			d: '00',
			h: '00',
			m: '00',
			s: '00'
		};
		if (t > 0) {
			let d = Math.floor(t / 86400);
			let h = Math.floor((t / 3600) % 24);
			let m = Math.floor((t / 60) % 60);
			let s = Math.floor(t % 60);
			format.d = d < 10 && d > 0 ? '0' + d : d;
			format.h = h < 10 && h > 0 ? '0' + h : h;
			format.m = m < 10 && m > 0 ? '0' + m : m;
			format.s = s < 10 && s > 0 ? '0' + s : s;
		}
		return format;
	},
	/**
	 * 打电话
	 * @param {String<Number>} phoneNumber - 数字字符串
	 */
	callPhone(phoneNumber = '') {
		let num = phoneNumber.toString();
		uni.makePhoneCall({
			phoneNumber: num,
			fail(err) {
				console.log('makePhoneCall出错', err)
			},
		});
	},
	//菜单跳转
	menuJump(item) {
		const {is_tab,link,link_type} = item;
		switch (link_type) {
			case 1:
				// 本地跳转
				if (is_tab) {
					uni.switchTab({
						url: link
					});
					return;
				}
				uni.navigateTo({
					url: link
				});
			break;
			case 2:
				// webview
				uni.navigateTo({
					url: "/pages/webview/webview?url=" + link
				});
			break;
		}
	},
	//复制
	copyCode(str) {
		// #ifdef H5
		let aux = document.createElement("input");
		aux.setAttribute("value", str);
		document.body.appendChild(aux);
		aux.select();
		document.execCommand("copy");
		document.body.removeChild(aux);
		uni.showToast({
			title: "复制成功",
		})
		// #endif
	
		// #ifndef H5
		uni.setClipboardData({
			data: str.toString(),
			success: () => {
				uni.showToast({
					title:"已复制到剪切板",
					icon:"none"
				})
			}
		})
		// #endif
	},
	//判断是否为安卓环境
	isAndroid() {
		let u = navigator.userAgent;
		return u.indexOf('Android') > -1 || u.indexOf('Adr') > -1;
	},
	//获取url后的参数  以对象返回
	strToParams(str) {
		var newparams = {}
		for (let item of str.split('&')) {
			newparams[item.split('=')[0]] = item.split('=')[1]
		}
		return newparams
	},
	//重写encodeURL函数
	urlencode(str) {
		str = (str + '').toString();
		return encodeURIComponent(str).replace(/!/g, '%21').replace(/'/g, '%27').replace(/\(/g, '%28').
		replace(/\)/g, '%29').replace(/\*/g, '%2A').replace(/%20/g, '+');
	},
	//一维数组截取为二维数组
	arraySlice(data, array = [], optNum = 10) {
		data = JSON.parse(JSON.stringify(data))
		if (data.length <= optNum) {
			data.length > 0 && array.push(data);
			return array;
		}
		array.push(data.splice(0, optNum));
		return arraySlice(data, array, optNum);
	},
	//分页加载
	async loadingFun(fun, page, dataList = [], status, params) {
		const loadingType = {
		  LOADING: 'loading',
		  FINISHED: 'finished',
		  ERROR: 'error',
		  EMPTY: 'empty'
		};
		// 拷贝对象
		dataList = Object.assign([], dataList)
		if (status == loadingType.FINISHED) return false
		const {
			code,
			data
		} = await fun({
			page_no: page,
			...params
		})
		uni.stopPullDownRefresh()
		if (code == 1) {
			let {
				list,
				more
			} = data
			dataList.push(...list)
			page = ++page
			if (!more) {
				status = loadingType.FINISHED
			}
			if (dataList.length <= 0) {
				status = loadingType.EMPTY
			}
		} else {
			status = loadingType.ERROR
		}
		return {
			page,
			dataList,
			status
		}
	},
	//上传
	uploadFile(path) {
		return new Promise((resolve, reject) => {
			uni.uploadFile({
				url: baseURL + 'file/formimage',
				filePath: path,
				name: 'file',
				header: {token: uni.getStorageSync("token")},
				fileType: 'image',
				cloudPath: '',
				success: res => {
					console.log('uploadFile res ==> ', res)
					let data = JSON.parse(res.data);
	
					if (data.code == 1) {
						resolve(data.data);
					} else {
						reject()
					}
				},
				fail: (err) => {
					console.log(err)
					reject()
				}
			});
		});
	},
	//当前页面
	currentPage(){
		let pages = getCurrentPages();
		let currentPage = pages[pages.length - 1];
		return currentPage || {};
	}
}
