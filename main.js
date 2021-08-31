import Vue from 'vue';
import App from './App';

Vue.config.productionTip = false;

App.mpType = 'app';

// 引入全局uView
import uView from 'uview-ui';
Vue.use(uView);

import store from '@/store';

// 挂载工具函数
import tools from '@/utils/tools';
Vue.prototype.$tools = tools;

// 挂载请求
import http from './api/index';
Vue.prototype.$http = http;

import Cache from '@/utils/cache';
Vue.prototype.$Cache = Cache;

// 引入uView对小程序分享的mixin封装
let mpShare = require('uview-ui/libs/mixin/mpShare.js');
Vue.mixin(mpShare);

const app = new Vue({
	store,
	...App
});

app.$mount();
