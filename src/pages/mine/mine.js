/*
 * @Author: Felix
 * @Email: felix@qingmaoedu.com
 * @Date: 2020-12-15 14:07:29
 * @LastEditTime: 2020-12-17 10:22:44
 * @FilePath: /mp-driver/src/pages/mine/mine.js
 * @Copyright © 2019 Shanghai Qingmao Network Technology Co.,Ltd All rights reserved.
 */
import { mapState } from "vuex";
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
          url: "/pages/feedback/main",
        },
        {
          title: "联系客服",
          url: "/pages/index/index",
        },
      ],
      driverInfo: [],
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
  },
  mounted() {
    this.fetchData();
  },
};
