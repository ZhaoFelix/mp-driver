/*
 * @Author: Felix
 * @Email: felix@qingmaoedu.com
 * @Date: 2020-12-11 09:17:51
 * @LastEditTime: 2020-12-13 20:48:36
 * @FilePath: /mp-driver/src/pages/index/ongoing.js
 * @Copyright © 2019 Shanghai Qingmao Network Technology Co.,Ltd All rights reserved.
 */

import { mapState } from "vuex";
export default {
    data() {
      return {
        fileList: [
          {
            url: "https://img.yzcdn.cn/vant/leaf.jpg",
            name: "图片1",
          },
          {
            url: "https://img.yzcdn.cn/vant/leaf.jpg",
            name: "图片1",
          },
          {
            url: "https://img.yzcdn.cn/vant/leaf.jpg",
            name: "图片1",
          },
          {
            url: "https://img.yzcdn.cn/vant/leaf.jpg",
            name: "图片1",
          },
        ],
        maxCount: 4,
        isLogin:false,// 是否登录
        orderInfo:null
      };
    },
    computed:{
      ...mapState(["isLogin","openID", "userID"]),
    },
    methods: {
      bindGetUserInfo(e, id) {
        console.log("测试")
        this.openID = this.$store.state.openID;
        
        if (this.$store.state.isLogin) {
          return;
        }
        if (e.mp.detail.userInfo) {
          let { encryptedData, userInfo, iv } = e.mp.detail;
          let data = {
            user_type: id,
            openId: this.openID,
            avatarUrl: userInfo.avatarUrl,
            gender: userInfo.gender,
            nickName: userInfo.nickName,
            province: userInfo.province,
            country: userInfo.country,
          };
          this.$wxRequest
            .post({
              url: "/Dmobile/wxauth/wechat",
              data: data,
            })
            .then((res) => {
              if (res.data.code == 20000) {
                console.log(res.data.data[0]);
                this.$store.commit("setUserID",res.data.data[0].user_id)
                this.$store.commit("changeLogin");
                this.isLogin = true
                // 前往认证
                  const url = "../checkPage/main";
                  mpvue.navigateTo({ url });
              } else {
                console.log("获取失败");
              }
            });
        } else {
          console.log("用户点击了拒绝按钮");
        }
      },
      getUserInfo() {
        this.openID = this.$store.state.openID;
        this.$wxRequest
          .post({
            url: "/Dmobile/wxauth/getUserInfo",
            data: { openId: this.openID },
          })
          .then((res) => {
            if (res.data.code == 20000) {
              let dataArr = res.data.data;
              console.log(dataArr)
              if (dataArr.length == 0) {
                return
              }
                // 判断是否已认证
              else  if (dataArr[0].user_type === null || dataArr[0].user_type == 0) {
                  //  存储用户ID和用户类型
                  this.$store.commit("setUserID",dataArr[0].user_id)
                  this.$store.commit("setUserType",dataArr[0].user_type)
                  this.$store.commit("changeLogin")
                  this.isLogin = true
                  // 未认证，前往认证页面
                  const url = "../checkPage/main";
                  mpvue.navigateTo({ url });
                } else {
                    //  存储用户ID和用户类型
                  this.$store.commit("setUserID",dataArr[0].user_id)
                  this.$store.commit("setUserType",dataArr[0].user_type)
                  this.$store.commit("changeLogin")
                  this.isLogin = true
                  console.log(this.$store.state.isLogin)
                }
            } else {
              console.log("查询失败", res.data.data);
            }
          });
      },
    },
  
    mounted(){
      var _this = this;
      // 登录获取openID
      wx.login({
        success(res) {
          // console.log(res);
          if (res.code) {
            console.log(res);
            _this.$wxRequest
              .post({
                url: "/Dmobile/wxauth/wxauth",
                data: {
                  code: res.code,
                },
              })
              .then((res) => {
                if (res.data.code == 20000) {
                  _this.$store.commit("setOpenID", 
                  res.data.data.openid,
                  );
                  //根据openID判断用户是否是首次使用小程序
                  _this.getUserInfo();
                } else {
                  console.log("获取openId失败");
                }
              });
          }
        },
      });
    }
  };