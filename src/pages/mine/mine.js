/*
 * @Author: Felix
 * @Email: felix@qingmaoedu.com
 * @Date: 2020-12-15 14:07:29
 * @LastEditTime: 2020-12-20 20:49:31
 * @FilePath: /mp-driver/src/pages/mine/mine.js
 * @Copyright © 2019 Shanghai Qingmao Network Technology Co.,Ltd All rights reserved.
 */
import { mapState } from "vuex";
import { servicePhone } from "../../../config/options";
export default {
  data() {
    return {
      tableList: [
        {
          title: "服务协议",
          url: "/pages/protocol/main",
        },
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
    };
  },
  computed: {
    ...mapState(["isLogin", "openID", "userID", "avatar", "nickname"]),
  },
  methods: {
    fetchData() {
      this.$wxRequest
        .get({
          url: "/Dmobile/user/info?userId=" + this.userID,
        })
        .then((res) => {
          if (res.data.code == 20000) {
            this.driverInfo = res.data.data[0];
          } else {
            console.log("获取司机信息失败");
          }
        });
    },
    navigateClick(index) {
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
        console.log(this.feedback);
      }
    },
  },
  mounted() {
    this.fetchData();
  },
};
