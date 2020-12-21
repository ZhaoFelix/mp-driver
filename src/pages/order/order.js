/*
 * @Author: Felix
 * @Email: felix@qingmaoedu.com
 * @Date: 2020-12-15 09:00:54
 * @LastEditTime: 2020-12-21 14:44:52
 * @FilePath: /mp-driver/src/pages/order/order.js
 * @Copyright © 2019 Shanghai Qingmao Network Technology Co.,Ltd All rights reserved.
 */
import { mapState } from "vuex";
import { servicePhone } from "../../../config/options";
export default {
  data() {
    return {
      // active: 0,
      list: [],
    };
  },
  computed: {
    ...mapState(["userID"]),
  },
  methods: {
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
  },
  mounted() {
    var _this = this;
    this.$wxRequest
      .get({
        url: "/Dmobile/order/queryall?userId=" + this.userID,
      })
      .then((res) => {
        if (res.data.code == "20000") {
          _this.list = res.data.data;
          _this.list = [..._this.list];
          console.log(_this.list);
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
  created() {},
};
