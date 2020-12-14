/*
 * @Author: Felix
 * @Email: felix@qingmaoedu.com
 * @Date: 2020-12-11 09:17:51
 * @LastEditTime: 2020-12-14 09:56:01
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
        orderInfo:{
          
        }
      };
    },
    computed:{
      ...mapState(["isLogin","openID", "userID"]),
      place_date:function(){
        return (this.orderInfo.user_place_order_time + "").slice(0,10)
      },
      place_time:function(){
        return (this.orderInfo.user_place_order_time + "").slice(11,19)
      },
      // 计算前往目的地花费的时间
      goDesTimeGap(){
       return this.timeGap(this.orderInfo.driver_go_des)
      },
      isReach(){
       return this.orderInfo.driver_reach_des !== null ? true : false
      }
    },
    methods: {
      timeGap(startTimeStr){
        let endTime = new Date()
        let startTime = new Date(startTimeStr)
        return Math.floor((endTime - startTime) / 1000 / 60 /60) >= 1 
        ? Math.floor((endTime - startTime) / 1000 / 60 /60) + "小时" + Math.floor((endTime - startTime) / 1000 / 60) + "分钟" :
        Math.floor((endTime - startTime) / 1000 / 60) + "分钟"
      },
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
                  // 获取订单信息
                  this.fetchData()
                }
            } else {
              console.log("查询失败", res.data.data);
            }
          });
      },
       // 获取实时订单
      fetchData(){
        // TODO:待添加具体ID
        this.$wxRequest
        .get({
          url:'/Dmobile/order/query',
        })
        .then((res) => {
          if (res.data.code == 20000) {
            console.log("测试")
            this.orderInfo = res.data.data[0]
            console.log(this.orderInfo.car_id)
          } 
          else {
            console.log("查询失败")
          }
        })
      },
      // 前往目的地
      goDestination(){
        let order_id = this.orderInfo.order_id
        if (order_id != undefined) {
          this.$wxRequest
          .get({
            url:'/Dmobile/order/update/status4?orderId='+order_id,
          })
          .then((res) => {
            if (res.data.code == 20000){
                this.fetchData()
            } else {

            }
          })
        }
      },
      // 到达目的地
      reachDestination(){
        let order_id = this.orderInfo.order_id
        if (order_id != undefined) {
          this.$wxRequest
          .get({
            url:'/Dmobile/order/update/reachDes?orderId='+order_id,
          })
          .then((res) => {
            if (res.data.code == 20000){
                this.fetchData()
            } else {
              
            }
          })
        }
      }
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