/*
 * @Author: Felix
 * @Email: felix@qingmaoedu.com
 * @Date: 2020-12-15 09:00:54
 * @LastEditTime: 2021-05-12 21:02:24
 * @FilePath: /mp-driver/src/pages/index/order.js
 * @Copyright © 2019 Shanghai Qingmao Network Technology Co.,Ltd All rights reserved.
 */
import { mapState } from "vuex";
import { servicePhone } from "../../../config/options";
export default {
  data() {
    return {
      // active: 0,
      list: [],
      canUseGetUserProfile: false,
    };
  },
  computed: {
    ...mapState(["isLogin", "openID", "userID","userType"]),
    isShow() {
      return this.list.length != 0
    }
  },
  methods: {
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
    contactDriver(info) {
      console.log(info.driver_phone);
      wx.makePhoneCall({
        phoneNumber: info.driver_phone,
      });
    },
    contactService() {
      // TODO:待添加客服电话
      console.log("联系客服");
      wx.makePhoneCall({
        phoneNumber: servicePhone,
      });
    },
    fetchData() {
      var _this = this;
      // TODO:测试ID写死
      this.$wxRequest
        .get({
          url: "/Dmobile/order/query/ongoing?userId=" + this.userID,
          // url: "/Dmobile/order/query/ongoing?userId=315"
        })
        .then((res) => {
          if (res.data.code == "20000") {
            _this.list = res.data.data;
            _this.list = [..._this.list];
          } else {
            wx.showToast({
              title: "数据获取失败",
              icon: "none",
            });
          }
        })
        .catch((error) => {
          console.log("获取订单列表失败");
        });
    },
    moreInfo(id){
      console.log(id)
       // 前往认证
       const url = "../detail/main?orderId="+id;
       mpvue.navigateTo({ url });
    }
  },
  mounted() {
    var _this = this;
    if (wx.getUserProfile) {
      this.canUseGetUserProfile = true;
    }
    // 登录获取openID
    wx.login({
      success(res) {
        // console.log(res);
        if (res.code) {
          // console.log(res);
          _this.$wxRequest
            .post({
              url: "/Dmobile/wxauth/wxauth",
              data: {
                code: res.code,
              },
            })
            .then((res) => {
              if (res.data.code == 20000) {
                _this.$store.commit("setOpenID", res.data.data.openid);
                //根据openID判断用户是否是首次使用小程序
                _this.getUserInfo();
              } else {
                console.log("获取openId失败");
              }
            });
        }
      },
    });
  },
  onShow() {
    console.log("页面显示");
    this.fetchData();
  },
};
