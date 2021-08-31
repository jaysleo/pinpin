import httpRequest from "@/utils/request.js"

module.exports = {
	/*首页轮播图*/
	getBanner: function() {
		return httpRequest.get("banner",{},{noAuth:true})
	},
	/*注册*/
	register: function(data){
		return httpRequest.post("register",data,{noAuth:true});
	},
	/*登陆*/
	login: function(data){
		return httpRequest.post("login/mobile",data,{noAuth:true});
	},
	/*发送短信验证码*/
	sendSms: function(phone,event){
		return httpRequest.post("send_sms",{phone:phone,event:event},{noAuth:true});
	},
	/*获取用户信息*/
	getUserInfo: function(){
		return httpRequest.get("user/info");
	},
	/*修改用户信息*/
	setUserInfo: function(data){
		return httpRequest.post("user/update_info",data);
	},
	/*收货地址列表*/
	getAddress: function(){
		return httpRequest.get("address/list");
	},
	/*添加收货地址*/
	saveAddress: function(data){
		return httpRequest.post("address/save",data);
	},
	/*删除收货地址*/
	delAddress: function(id){
		return httpRequest.post("address/del",{id:id});
	},
	/*网站配置信息*/
	getwebConfig: function(){
		return httpRequest.get("web_config",{},{noAuth:true});
	},
	/*商品分类*/
	getCategory: function(){
		return httpRequest.get("category",{},{noAuth:true});
	},
	/*商品详情*/
	getProdetail: function(id){
		return httpRequest.get("product/detail",{id:id},{noAuth:true});
	},
	/*商品列表 type:2一分拼团 3热门拼团 4新人专享 5最新拼团*/
	getProlist: function(type,page,limit){
		return httpRequest.get("product/list",{type:type,page:page,limit:limit},{noAuth:true});
	},
	/*创建订单*/
	createOrder: function(data){
		return httpRequest.post("order/create",data);
	},
	/*支付*/
	pay: function(order_no,pay_type){
		return httpRequest.post("order/pay",{order_no:order_no,pay_type:pay_type});
	},
	/*正在拼团的列表*/
	getPink: function(cid){
		return httpRequest.get("pintuan/list",{cid:cid},{noAuth:true});
	},
	/*拼团列表里的用户列表*/
	getPinkuser: function(id){
		return httpRequest.get("pintuan/user_list",{id:id});
	},
	/*特卖会场列表*/
	getActivity: function(type,page,limit){
		return httpRequest.get("activity/list",{type:type,page:page,limit:limit},{noAuth:true});
	},
	/*特卖会场商品列表*/
	getActivityProlist: function(activity_id,field,sort,page,limit){
		return httpRequest.get("activity/product_list",{activity_id:activity_id,field:field,sort:sort,page:page,limit:limit},{noAuth:true});
	},
	/*商品所属卖场活动信息*/
	belongActivity: function(id){
		return httpRequest.get("product/belong_activity",{id:id},{noAuth:true});
	},
	/*会员价格列表*/
	getVip: function(){
		return httpRequest.get("vip/list");
	},
	/*购买vip*/
	buyVip: function(pay_type,member_type){
		return httpRequest.post("user/buy_vip",{pay_type:pay_type,member_type:member_type});
	},
	/*早起打卡参加*/
	early: function(pay_type){
		return httpRequest.post("user/early",{pay_type:pay_type});
	},
	/*早起打卡详情*/
	earlyIndex: function(){
		return httpRequest.get("user/early_index");
	},
	/*早起打卡签到*/
	earlySign: function(){
		return httpRequest.post("user/early_sign");
	},
	/*早起打卡排名*/
	earlySort: function(){
		return httpRequest.get("user/early_sort");
	},
	/*打卡签到*/
	qiandao: function(){
		return httpRequest.post("user/qiandao");
	},
	/*各种文字协议内容*/
	getArticle: function(tag){
		return httpRequest.get("article",{tag:tag},{noAuth:true});
	},
	/*拼团有礼列表*/
	getGift: function(){
		return httpRequest.get("gift",{},{noAuth:true});
	},
	/*拼团有礼分类下的商品*/
	giftProduct: function(category_id){
		return httpRequest.get("gift_product",{category_id:category_id},{noAuth:true});
	},
	/*确认收货*/
	orderTake: function(id){
		return httpRequest.post("order/take",{id:id});
	},
	/*用户消息列表页*/
	getNotice: function(){
		return httpRequest.get("user/notice");
	},
	/*消息已读*/
	noticeReaded: function(id){
		return httpRequest.post("user/notice_readed",{notice_id:id});
	},
	/*用户消息首页*/
	getNoticelist: function(notice_type){
		return httpRequest.get("user/notice_list",{notice_type:notice_type});
	},
	/*靓号列表*/
	getUniqid: function(){
		return httpRequest.get("uniqid/list");
	},
	/*购买靓号*/
	buyUniqid: function(uniqid_id,pay_type){
		return httpRequest.post("uniqid/buy",{uniqid_id:uniqid_id,pay_type:pay_type});
	},
	/*收益中心*/
	getEaring: function(){
		return httpRequest.get("earings_index");
	},
	/*收益中心-列表*/
	getEarlist: function(today){
		return httpRequest.get("earings_list",{today:today});
	},
	/*收益中心-拼团数据*/
	getEardata: function(){
		return httpRequest.get("earings_data");
	},
	/*全部订单列表*/
	orderlist: function(status,page,limit){
		return httpRequest.get("all_order",{status:status,page:page,limit:limit});
	},
	/*拼团订单*/
	pinorderlist: function(status,take,page,limit){
		return httpRequest.get("pintuan_order",{status:status,take:take,page:page,limit:limit});
	},
	/*领取订单红包*/
	getOrder_redbag: function(id){
		return httpRequest.get("get_order_redbag",{pintuan_id:id});
	},
	/*拼团进行中人数*/
	getPink_peopleCount: function(){
		return httpRequest.get("pintuan_people_count",{},{noAuth:true});
	},
	/*拼团成功订单首页*/
	getPinksuc: function(){
		return httpRequest.get("pintuan_success");
	},
	/*拼团成功订单详情列表*/
	getPinksucdetail: function(tag,page,limit){
		return httpRequest.get("pintuan_success_detail",{tag:tag,page:page,limit:limit});
	},
	/*寄售*/
	sellOrder: function(reward_id){
		return httpRequest.post("sell_order",{reward_id:reward_id});
	},
	/*发货*/
	deliveryOrder: function(reward_id,type,tag){
		return httpRequest.post("delivery_order",{reward_id:reward_id,type:type,tag:tag});
	},
	/*取消订单*/
	cancelOrder: function(order_id,mark){
		return httpRequest.post("order/cancel_order",{order_id:order_id,mark:mark});
	},
	/*注销用户*/
	delUser: function(){
		return httpRequest.post("del_user");
	},
	/*修改手机号码*/
	updatePhone: function(phone,captch){
		return httpRequest.post("update_phone",{phone:phone,captch:captch});
	},
	/*申请退款*/
	applyRefund: function(order_id,refund_mark,refund_express){
		return httpRequest.post("apply_refund",{order_id:order_id,refund_mark:refund_mark,refund_express:refund_express});
	},
	/*商品搜索*/
	search: function(keyword,type,way,sort,page,limit){
		return httpRequest.get("search",{keyword:keyword,type:type,way:way,sort:sort,page:page,limit:limit},{noAuth:true});
	},
	/*热门搜索关键*/
	hotSearch: function(){
		return httpRequest.get("search_word",{},{noAuth:true});
	},
	/*用户资金变动明细*/
	billList: function(pm,page,limit){
		return httpRequest.get("bill_list",{pm,page:page,limit:limit});
	},
	orderDetail: function(uni){
		return httpRequest.get("/order/detail/",{uni:uni});
	}
}