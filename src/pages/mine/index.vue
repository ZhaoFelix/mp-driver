<!--
 * @Author: Felix
 * @Email: felix@qingmaoedu.com
 * @Date: 2020-12-01 07:57:47
 * @LastEditTime: 2020-12-11 14:33:26
 * @FilePath: /mp-driver/src/pages/mine/index.vue
 * @Copyright © 2019 Shanghai Qingmao Network Technology Co.,Ltd All rights reserved.
-->
<template>
  <div class="main-container">
    <div class="user-info">
      <van-row>
        <van-col offset="1" span="6">
          <van-image
            src="../../../static/images/user.png"
            width="70"
            radius="35px"
            height="70px"
            fit="cover"
            @click="articleDetail"
          />
        </van-col>
        <van-col span="16">
          <div class="user-nickname">老司机</div>
          <div class="wechat">手机号</div>
        </van-col>
      </van-row>
    </div>
    <div class="user-identer"></div>

    <div class="info-table">
      <van-cell
        is-link
        title="服务协议"
        link-type="navigateTo"
        url="../../pages/index/index"
      />
    </div>
    <div class="info-table">
      <van-cell
        is-link
        title="意见反馈"
        link-type="navigateTo"
        url="../../pages/index/index"
      />
    </div>
    <div class="info-table">
      <van-cell
        is-link
        title="联系客服"
        link-type="navigateTo"
        url="../../pages/index/index"
      />
    </div>

    <div class="version-info">v 2.3.1</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableList: [
        {
          title: "我的订单",
          url: "/pages/orders/main",
        },
        {
          title: "服务协议",
          url: "/pages/protocol/main",
        },
        {
          title: "分享",
          url: "",
        },
        {
          title: "意见反馈",
          url: "/pages/feedback/main",
        },
      ],
    };
  },
};
</script>

<style scoped>
@import url("./mine.css");
</style>
