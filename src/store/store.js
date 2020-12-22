/*
 * @Author: Felix
 * @Email: felix@qingmaoedu.com
 * @Date: 2020-12-13 19:29:28
 * @LastEditTime: 2020-12-22 14:44:27
 * @FilePath: /mp-driver/src/store/store.js
 * @Copyright © 2019 Shanghai Qingmao Network Technology Co.,Ltd All rights reserved.
 */
import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    openID: "",
    isLogin: false,
    userID: 0,
    userType: null,
    avatar: "",
    nickname: "",
  },
  mutations: {
    setOpenID(state, v) {
      state.openID = v;
    },
    setUserID(state, v) {
      state.userID = v;
    },
    changeLogin(state, v) {
      state.isLogin = v;
    },
    setUserType(state, v) {
      state.userType = v;
    },
    setAvatar(state, v) {
      state.avatar = v;
    },
    setNickname(state, v) {
      state.nickname = v;
    },
  },
});
