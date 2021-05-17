/*
 * @Author: Felix
 * @Email: felix@qingmaoedu.com
 * @Date: 2020-12-15 14:07:29
 * @LastEditTime: 2021-05-17 14:08:50
 * @FilePath: /mp-driver/src/pages/mine/mine.js
 * @Copyright © 2019 Shanghai Qingmao Network Technology Co.,Ltd All rights reserved.
 */
import { mapState } from "vuex";
import { servicePhone,VERSION } from "../../../config/options";
export default {
  data() {
    return {
      tableList: [
        // {
        //   title: "服务协议",
        //   url: "",
        // },
        {
          title: "意见反馈",
          url: "",
        },
        {
          title: "联系客服",
          url: "",
        },
      ],
      driverInfo: [],
      isFeedback: false,
      feedback: null,
      VERSION
    };
  },
  computed: {
    ...mapState(["isLogin", "openID", "userID", "avatar", "nickname","userType"]),
  },
  methods: {
    fetchData() {
      var _this = this;
      this.$wxRequest
        .get({
          url: "/Dmobile/user/info?userId=" + this.userID,
        })
        .then((res) => {
          if (res.data.code == 20000) {
            _this.driverInfo = res.data.data;
            _this.driverInfo = [..._this.driverInfo];
          } else {
            console.log("获取司机信息失败");
          }
        });
    },
    onClick(index) {
      if (index == 0) {
        let url = "../protocol/main";
        mpvue.navigateTo({ url });
      } else if (index == 1) {
        this.isFeedback = true;
      } else {
        wx.makePhoneCall({
          phoneNumber: servicePhone,
        });
      }
    },
    onblurFeedback(event) {
      this.feedback = event.mp.detail.value;
    },
    feedbackContent() {
      if (this.feedback == null) {
        wx.showToast({
          title: "请输入反馈信息",
          icon: "none",
        });
      } else {
        this.$wxRequest
          .post({
            url: "/Dmobile/feedback",
            data: {
              userId: this.userID,
              feedback: this.feedback,
            },
          })
          .then((res) => {
            if (res.data.code == "20001") {
              wx.showToast({
                title: res.data.message,
                icon: "none",
              });
            } else if (res.data.code == "20000") {
              wx.showToast({
                title: res.data.message,
                icon: "none",
              });
            }
          });
      }
    },
  },
  mounted() {
    this.fetchData();
  },
};
