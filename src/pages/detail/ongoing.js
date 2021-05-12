/*
 * @Author: Felix
 * @Email: felix@qingmaoedu.com
 * @Date: 2020-12-11 09:17:51
 * @LastEditTime: 2021-05-12 09:52:26
 * @FilePath: /mp-driver/src/pages/detail/ongoing.js
 * @Copyright © 2019 Shanghai Qingmao Network Technology Co.,Ltd All rights reserved.
 */

import { mapState } from "vuex";
import {
  uploadUrl,
  downloadUrl,
  processImage,
  previewImage,
  bucket,
} from "../../../config/options.js";
let OSS = {};
export default {
  data() {
    return {
      maxCount: 4,
      limitNumber: 2,
      orderInfo: {},
      OSS,
      isShowPopup: false,
      columns: [],
      canUseGetUserProfile: false,
      orderId:0,
      
    };
  },
  computed: {
    ...mapState(["isLogin", "openID", "userID","userType"]),
    // TODO:定义过滤器替换重复内容
    place_date: function () {
      return (this.orderInfo.user_place_order_time == null
        ? ""
        : this.orderInfo.user_place_order_time + ""
      ).slice(0, 10);
    },
    place_time: function () {
      return (this.orderInfo.user_place_order_time + "").slice(11, 19);
    },
    reach_date: function () {
      return (this.orderInfo.driver_reach_time == null
        ? ""
        : this.orderInfo.driver_reach_time + ""
      ).slice(0, 10);
    },
    reach_time: function () {
      return (this.orderInfo.driver_reach_time + "").slice(11, 19);
    },
    get_date: function () {
      return (this.orderInfo.driver_get_time == null
        ? ""
        : this.orderInfo.driver_get_time + ""
      ).slice(0, 10);
    },
    get_time: function () {
      return (this.orderInfo.driver_get_time + "").slice(11, 19);
    },
    complete_date: function () {
      return (this.orderInfo.driver_complete_time == null
        ? ""
        : this.orderInfo.driver_complete_time + ""
      ).slice(0, 10);
    },
    complete_time: function () {
      return (this.orderInfo.driver_complete_time + "").slice(11, 19);
    },
    // 计算前往目的地花费的时间
    goDesTimeGap() {
      return this.timeGap(
        this.orderInfo.driver_go_des,
        this.orderInfo.driver_reach_des != null
          ? this.orderInfo.driver_reach_des
          : new Date()
      );
    },
    isShow() {
      if (
        this.orderInfo === {} ||
        this.orderInfo == undefined ||
        JSON.stringify(this.orderInfo) == "{}"
      ) {
        return false;
      } else {
        return true;
      }
    },
    // 计算运输过程中的时间
    onGoingTimeGap() {
      return this.timeGap(
        this.orderInfo.driver_get_time,
        this.orderInfo.driver_reach_trash != null
          ? this.orderInfo.driver_reach_trash
          : new Date()
      );
    },
    isReach() {
      return this.orderInfo.driver_reach_des !== null ? true : false;
    },
    // 是否可以进行清算
    isReach1() {
      if (
        this.orderInfo.driver_reach_img === null ||
        this.orderInfo.driver_reach_img === undefined
      ) {
        return true;
      } else if (this.orderInfo.driver_reach_img instanceof Array) {
        return !(this.orderInfo.driver_reach_img.length >= this.limitNumber);
      } else {
        return true;
      }
    },
    // 是否装车完成
    isGet() {
      if (
        this.orderInfo.driver_get_img === null ||
        this.orderInfo.driver_get_img === undefined
      ) {
        return true;
      } else if (this.orderInfo.driver_get_img instanceof Array) {
        return !(this.orderInfo.driver_get_img.length >= this.limitNumber);
      } else {
        return true;
      }
    },
    isComplete() {
      console.log(this.orderInfo.driver_complete_time == null);
      if (
        this.orderInfo.driver_complete_time == null ||
        this.orderInfo.driver_complete_time === undefined
      ) {
        return false;
      }
      // else if (this.orderInfo.driver_complete_img instanceof Array) {
      //   return !(this.orderInfo.driver_complete_img.length >= this.limitNumber);
      // }
      else {
        return true;
      }
    },
    isCompleteDeleted() {
      if (
        this.orderInfo.driver_complete_img === null ||
        this.orderInfo.driver_complete_img === undefined
      ) {
        return false;
      } else if (this.orderInfo.driver_complete_img instanceof Array) {
        return true;
      } else {
        return false;
      }
    },
    isReachDeleted() {
      if (
        this.orderInfo.driver_reach_img === null ||
        this.orderInfo.driver_reach_img === undefined
      ) {
        return false;
      } else if (this.orderInfo.driver_reach_img instanceof Array) {
        return true;
      } else {
        return false;
      }
    },
    isGetDeleted() {
      if (
        this.orderInfo.driver_get_img === null ||
        this.orderInfo.driver_get_img === undefined
      ) {
        return false;
      } else if (this.orderInfo.driver_get_img instanceof Array) {
        return true;
      } else {
        return false;
      }
    },
    isReachLimit() {
      // console.log(this.orderInfo.driver_reach_img)
      if (
        this.orderInfo.driver_reach_img === null ||
        this.orderInfo.driver_reach_img === undefined
      ) {
        return "0/" + this.maxCount;
      } else if (this.orderInfo.driver_reach_img instanceof Array) {
        return this.orderInfo.driver_reach_img.length + "/" + this.maxCount;
      } else {
        return (
          JSON.parse(this.orderInfo.driver_reach_img).length +
          "/" +
          this.maxCount
        );
      }
    },
    isGetLimit() {
      // console.log(this.orderInfo.driver_reach_img)
      if (
        this.orderInfo.driver_get_img === null ||
        this.orderInfo.driver_get_img === undefined
      ) {
        return "0/" + this.maxCount;
      } else if (this.orderInfo.driver_get_img instanceof Array) {
        return this.orderInfo.driver_get_img.length + "/" + this.maxCount;
      } else {
        return (
          JSON.parse(this.orderInfo.driver_get_img).length + "/" + this.maxCount
        );
      }
    },
    isCompleteLimit() {
      // console.log(this.orderInfo.driver_reach_img)
      if (
        this.orderInfo.driver_complete_img === null ||
        this.orderInfo.driver_complete_img === undefined
      ) {
        return "0/" + this.maxCount;
      } else if (this.orderInfo.driver_complete_img instanceof Array) {
        return this.orderInfo.driver_complete_img.length + "/" + this.maxCount;
      } else {
        return (
          JSON.parse(this.orderInfo.driver_complete_img).length +
          "/" +
          this.maxCount
        );
      }
    },
    driverReachImages() {
      if (this.orderInfo.driver_reach_img != null) {
        if (this.orderInfo.driver_reach_img instanceof Array) {
          return this.orderInfo.driver_reach_img;
        } else {
          return JSON.parse(this.orderInfo.driver_reach_img);
        }
      } else {
        return this.orderInfo.driver_reach_img;
      }
    },
    driverGetImages() {
      if (this.orderInfo.driver_get_img != null) {
        if (this.orderInfo.driver_get_img instanceof Array) {
          return this.orderInfo.driver_get_img;
        } else {
          return JSON.parse(this.orderInfo.driver_get_img);
        }
      } else {
        return this.orderInfo.driver_get_img;
      }
    },
    driverCompleteImages() {
      if (this.orderInfo.driver_complete_img != null) {
        if (this.orderInfo.driver_complete_img instanceof Array) {
          return this.orderInfo.driver_complete_img;
        } else {
          return JSON.parse(this.orderInfo.driver_complete_img);
        }
      } else {
        return this.orderInfo.driver_complete_img;
      }
    },
    isReachTrashDes() {
      return this.orderInfo.driver_reach_trash == null ? false : true;
    },
    userPlaceOrderImages() {
      if (this.orderInfo.user_place_order_img != null) {
        if (this.orderInfo.user_place_order_img instanceof Array) {
          return this.orderInfo.user_place_order_img;
        } else {
          return JSON.parse(this.orderInfo.user_place_order_img);
        }
      } else {
        return this.orderInfo.user_place_order_img;
      }
    }
    
  },
  methods: {
    timeGap(startTimeStr, endTimeStr) {
      let endTime = new Date(endTimeStr);
      let startTime = new Date(startTimeStr);
      return Math.floor((endTime - startTime) / 1000 / 60 / 60) >= 1
        ? Math.floor((endTime - startTime) / 1000 / 60 / 60) +
            "小时" +
            (Math.floor((endTime - startTime) / 1000 / 60) -
              Math.floor((endTime - startTime) / 1000 / 60 / 60) * 60) +
            "分钟"
        : Math.floor((endTime - startTime) / 1000 / 60) + "分钟";
    },
    bindGetUserInfo(e, id) {
      this.openID = this.$store.state.openID;

      if (this.$store.state.isLogin) {
        return;
      }
      if (e.mp.detail.userInfo) {
        let { userInfo } = e.mp.detail;
        let data = {
          user_type: id,
          openId: this.openID,
          avatarUrl: userInfo.avatarUrl,
          gender: userInfo.gender,
          nickName: userInfo.nickName,
          province: userInfo.province,
          country: userInfo.country,
        };
        this.addUserInfoToDB(data, id);
      } else {
        console.log("用户点击了拒绝按钮");
      }
    },
    getUserProfile(e,id) {
      wx.getUserProfile({
        desc: "用于完善会员资料", // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
        success: (res) => {
          let { userInfo } = res;
          let data = {
            user_type: id,
            openId: this.openID,
            avatarUrl: userInfo.avatarUrl,
            gender: userInfo.gender,
            nickName: userInfo.nickName,
            province: userInfo.province,
            country: userInfo.country,
          };
          this.addUserInfoToDB(data, id);
        },
        fail: (error) => {},
      });
    },
      // 将用户信息写入数据库
      addUserInfoToDB(data) {
        this.$store.commit("setNickname", data.nickName);
        this.$store.commit("setAvatar", data.avatarUrl);
        this.$wxRequest
          .post({
            url: "/Dmobile/wxauth/wechat",
            data: data,
          })
          .then((res) => {
            if (res.data.code == 20000) {
              this.$store.commit("setUserID", res.data.data[0].user_id);
              // this.$store.commit("changeLogin");
              // this.isLogin = true;
              if (res.data.data[0].user_type != 2) {
                // 前往认证
                const url = "../verify/main";
                mpvue.navigateTo({ url });
              } else {
                this.getUserInfo();
              }
            } else {
              console.log("获取失败");
            }
          });
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
            if (dataArr.length == 0) {
              return;
            }
            // 判断是否已认证
            else if (
              dataArr[0].user_type === null ||
              dataArr[0].user_type == 0
            ) {
              //  存储用户ID和用户类型
              this.$store.commit("setUserID", dataArr[0].user_id);
              this.$store.commit("setUserType", dataArr[0].user_type);
              // this.$store.commit("changeLogin", true);
              this.$store.commit("setNickname", dataArr[0].wechat_nickname);
              this.$store.commit("setAvatar", dataArr[0].wechat_avatar);
              this.isLogin = true;

              // 未认证，前往认证页面
              const url = "../verify/main";
              mpvue.navigateTo({ url });
            } else {
              //  存储用户ID和用户类型
              this.$store.commit("setUserID", dataArr[0].user_id);
              this.$store.commit("setUserType", dataArr[0].user_type);
              this.$store.commit("changeLogin", true);
              this.$store.commit("setNickname", dataArr[0].wechat_nickname);
              this.$store.commit("setAvatar", dataArr[0].wechat_avatar);
              this.isLogin = true;
              // 获取订单信息
              this.fetchData();
            }
          } else {
            console.log("查询失败", res.data.data);
          }
        });
    },
   
    // 获取实时订单
    fetchData() {
      var _this = this;
      // TODO:用户ID写死
      this.$wxRequest
        .get({
          // url: "/Dmobile/order/query?userId=" + this.userID + '&orderId='+this.orderId,
          url: "/Dmobile/order/query?userId=315" + '&orderId='+this.orderId,
        })
        .then((res) => {
          if (res.data.code == 20000) {
            if (res.data.data.length == 0) {
              wx.showToast({
                title: "暂无订单",
                icon: "none",
              });
            } else {
              console.log("测试")
              _this.orderInfo = res.data.data[0];
              _this.userPlaceOrderImages = _this.orderInfo.user_place_order_img
              console.log(_this.userPlaceOrderImages)
              // _this.orderInfo = [..._this.orderInfo];
            }
          } else {
            console.log("查询失败");
          }
        });
    },
    // 选择车牌号
    confirmSelect(event) {
      console.log(this.columns[0]);
      let index = event.mp.detail.index;
      let car_id = this.columns[index].id;
      let order_id = this.orderInfo.order_id;
      if (order_id != undefined) {
        this.$wxRequest
          .get({
            url:
              "/Dmobile/order/update/status4?orderId=" +
              order_id +
              "&carId=" +
              car_id,
          })
          .then((res) => {
            if (res.data.code == 20000) {
              this.isShowPopup = false;
              this.fetchData();
            } else {
            }
          });
      }
    },
    cancelSelect() {
      console.log('测试')
      this.isShowPopup = false;
    },
    // 前往目的地
    goDestination() {
      this.isShowPopup = true;
      this.$wxRequest
        .get({
          url: "/Dmobile/driver/carnumber",
        })
        .then((res) => {
          if (res.data.code == 20000) {
            this.columns = res.data.data;
          }
        });
    },
    // 到达目的地
    reachDestination() {
      let order_id = this.orderInfo.order_id;
      if (order_id != undefined) {
        this.$wxRequest
          .get({
            url: "/Dmobile/order/update/reachDes?orderId=" + order_id,
          })
          .then((res) => {
            if (res.data.code == 20000) {
              this.fetchData();
            } else {
            }
          });
      }
    },
    // 获取云对象存储的token
    getOssToken() {
      this.$wxRequest
        .get({
          url: "/public/ossToken/getOssToken",
        })
        .then((res) => {
          if (res.data.code == 20000) {
            this.OSS = res.data.data;
          }
        });
    },
    afterReachRead(event) {
      console.log("图片上传");
      const { file } = event.mp.detail;
      let fileName = bucket + new Date().getTime() + ".png";
      var _this = this;
      wx.uploadFile({
        url: uploadUrl, // 接口地址
        filePath: file.url,
        name: "file",
        formData: {
          key: fileName,
          policy: this.OSS.policy,
          OSSAccessKeyId: this.OSS.OSSAccessKeyId,
          signature: this.OSS.signature,
        },
        success(res) {
          if (_this.orderInfo.driver_reach_img == undefined) {
            _this.orderInfo.driver_reach_img = [];
          }
          _this.orderInfo.driver_reach_img.push({
            url: downloadUrl + fileName + previewImage,
            name: "",
            thumb: downloadUrl + fileName + processImage,
          });

          _this.orderInfo.driver_reach_img = [
            ..._this.orderInfo.driver_reach_img,
          ];
        },
        fail(error) {
          console.log(error);
        },
      });
    },
    // 删除图片
    deleteReachImage(event) {
      this.orderInfo.driver_reach_img.pop(
        this.orderInfo.driver_reach_img[event.mp.detail.index]
      );
      this.orderInfo.driver_reach_img = [...this.orderInfo.driver_reach_img];
    },
    reachImages() {
      let _this = this;
      this.$wxRequest
        .post({
          url: "/Dmobile/order/update/reachimage",
          data: {
            orderId: this.orderInfo.order_id,
            reachImageList: this.orderInfo.driver_reach_img,
          },
        })
        .then((res) => {
          if (res.data.code == 20000) {
            _this.fetchData();
          } else {
            console.log("更新失败");
          }
        });
    },
    // 装车完成的函数
    afterGetRead(event) {
      const { file } = event.mp.detail;
      let fileName = bucket + new Date().getTime() + ".png";
      var _this = this;
      wx.uploadFile({
        url: uploadUrl, // 接口地址
        filePath: file.url,
        name: "file",
        formData: {
          key: fileName,
          policy: this.OSS.policy,
          OSSAccessKeyId: this.OSS.OSSAccessKeyId,
          signature: this.OSS.signature,
        },
        success(res) {
          if (_this.orderInfo.driver_get_img == undefined) {
            _this.orderInfo.driver_get_img = [];
          }
          _this.orderInfo.driver_get_img.push({
            url: downloadUrl + fileName + previewImage,
            name: "",
            thumb: downloadUrl + fileName + processImage,
          });
          _this.orderInfo.driver_get_img = [..._this.orderInfo.driver_get_img];
        },
        fail(error) {
          console.log(error);
        },
      });
    },
    // 删除图片
    deleteGetImage(event) {
      this.orderInfo.driver_get_img.pop(
        this.orderInfo.driver_get_img[event.mp.detail.index]
      );
      this.orderInfo.driver_get_img = [...this.orderInfo.driver_get_img];
    },
    getImages() {
      let _this = this;
      this.$wxRequest
        .post({
          url: "/Dmobile/order/update/getimage",
          data: {
            orderId: this.orderInfo.order_id,
            getImageList: this.orderInfo.driver_get_img,
          },
        })
        .then((res) => {
          if (res.data.code == 20000) {
            _this.fetchData();
          } else {
            console.log("更新失败");
          }
        });
    },
    // 到达垃圾处理点
    reachTrashDes() {
      let _this = this;
      this.$wxRequest
        .post({
          url: "/Dmobile/order/update/reachdes",
          data: {
            orderId: this.orderInfo.order_id,
          },
        })
        .then((res) => {
          if (res.data.code == 20000) {
            _this.fetchData();
          } else {
            console.log("更新失败");
          }
        });
    },

    // 订单完成
    /*
    afterCompleteRead(event) {
      console.log("图片上传");
      const { file } = event.mp.detail;
      let fileName = bucket + new Date().getTime() + ".png";
      var _this = this;
      wx.uploadFile({
        url: uploadUrl, // 接口地址
        filePath: file.url,
        name: "file",
        formData: {
          key: fileName,
          policy: this.OSS.policy,
          OSSAccessKeyId: this.OSS.OSSAccessKeyId,
          signature: this.OSS.signature,
        },
        success(res) {
          if (_this.orderInfo.driver_complete_img == undefined) {
            _this.orderInfo.driver_complete_img = [];
          }
          _this.orderInfo.driver_complete_img.push({
            url: downloadUrl + fileName + previewImage,
            name: "",
            thumb: downloadUrl + fileName + processImage,
          });

          _this.orderInfo.driver_complete_img = [
            ..._this.orderInfo.driver_complete_img,
          ];
        },
        fail(error) {
          console.log(error);
        },
      });
    },
    // 删除图片
    deleteCompleteImage(event) {
      this.orderInfo.driver_complete_img.pop(
        this.orderInfo.driver_get_img[event.mp.detail.index]
      );
      this.orderInfo.driver_complete_img = [
        ...this.orderInfo.driver_complete_img,
      ];
    },
    */
    completeOrder() {
      this.$wxRequest
        .post({
          url: "/Dmobile/order/update/complete",
          data: {
            orderId: this.orderInfo.order_id,
            completeImageList: this.orderInfo.driver_complete_img,
          },
        })
        .then((res) => {
          if (res.data.code == 20000) {
            wx.showToast({
              title: "订单已完成",
              icon: "none",
            });
            this.isComplete = true;
            this.orderInfo = {};
            this.fetchData();
          } else {
            console.log("更新失败");
          }
        });
    },
  },
  mounted() {
    let params = this.$root.$mp.query;
    this.orderId = params.orderId;
    if (this.orderId != 0) {
      this.fetchData()
    }
    // var _this = this;
    // if (wx.getUserProfile) {
    //   this.canUseGetUserProfile = true;
    // }
    // // 登录获取openID
    // wx.login({
    //   success(res) {
    //     // console.log(res);
    //     if (res.code) {
    //       // console.log(res);
    //       _this.$wxRequest
    //         .post({
    //           url: "/Dmobile/wxauth/wxauth",
    //           data: {
    //             code: res.code,
    //           },
    //         })
    //         .then((res) => {
    //           if (res.data.code == 20000) {
    //             _this.$store.commit("setOpenID", res.data.data.openid);
    //             //根据openID判断用户是否是首次使用小程序
    //             _this.getUserInfo();
    //             _this.getOssToken();
    //           } else {
    //             console.log("获取openId失败");
    //           }
    //         });
    //     }
    //   },
    // });
  },
};
