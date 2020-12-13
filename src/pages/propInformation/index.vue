<!--
 * @Author: Felix
 * @Email: felix@qingmaoedu.com
 * @Date: 2020-12-01 07:58:34
 * @LastEditTime: 2020-12-13 20:17:06
 * @FilePath: /mp-driver/src/pages/propInformation/index.vue
 * @Copyright © 2019 Shanghai Qingmao Network Technology Co.,Ltd All rights reserved.
-->
<template>
  <div>
    <div class="card" v-for="(item, index) in list" :key="index">
      <van-cell-group title="详细信息">
        <van-cell
          value-class="info"
          title-width="90px"
          title="姓名"
          :value="item.driver_name"
        />
        <van-cell
          value-class="info"
          title-width="90px"
          title="手机号"
          :value="item.driver_phone"
        />
        <van-cell
          value-class="info"
          title-width="90px"
          title="身份证号"
          :value="item.driver_card_id"
        />
        <van-cell
          value-class="info"
          title-width="90px"
          title="路线类型"
          :value="item.router_note"
        />
      </van-cell-group>
    </div>
    <button class="changeButton" @click="changePages">确认</button>
  </div>
</template>
<script>
import { mapState } from "vuex";
import Toast from "@vant/weapp/dist/toast/toast";
export default {
  data() {
    return {
      phone: "",
      list: [],
    };
  },
  computed: {
    ...mapState(["openID", "userID"]),
  },
  methods: {
    changePages() {
      this.$wxRequest
        .post({
          url: "/public/Dverify/auth",
          data: {
            phone: this.phone,
            userId: this.userID,
          },
        })
        .then((res) => {
          if (res.data.code == "20000") {
            Toast.success("认证成功");
            //  认证成功，返回首页
            let url = "../index/main";
            mpvue.switchTab({ url });
          } else {
            Toast.fail(res.data.messgae);
          }
        });
    },
  },
  mounted() {
    let params = this.$root.$mp.query;
    this.phone = params.phone;
    this.$wxRequest
      .get({
        url: "/public/Dverify/driver?phone=" + this.phone,
      })
      .then((res) => {
        this.list = res.data.data;
      });
  },
};
</script>
<style scoped>
.card {
  box-shadow: 5px 5px 5px 5px rgba(0, 0, 0, 0.05);
  margin: 5% 10% 5% 10%;
  background-color: rgba(255, 255, 255, 0.883);
  border-radius: 15px;
}

.changeButton {
  background-color: #07c160;
  color: white;
  align-content: center;
  margin: 10% 20%;
}

van-cell >>> .info {
  padding-right: 20px;
  text-align: left;
}
</style>
