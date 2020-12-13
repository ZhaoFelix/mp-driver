/*
 * @Author: Felix
 * @Email: felix@qingmaoedu.com
 * @Date: 2020-10-26 09:55:40
 * @LastEditTime: 2020-12-13 19:31:08
 * @FilePath: /mp-driver/src/main.js
 * @Copyright © 2019 Shanghai Qingmao Network Technology Co.,Ltd All rights reserved.
 */
import Vue from 'vue'
import App from './App'
import WXRequest from "./utils/wx-request";

Vue.config.productionTip = false
App.mpType = 'app'
import store from "./store/store";
//加载到原型
Vue.prototype.$store = store;
Vue.prototype.$wxRequest = WXRequest;
const app = new Vue({
    ...App,
    store
})
app.$mount()
