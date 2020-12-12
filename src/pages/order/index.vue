<!--
 * @Author: Felix
 * @Email: felix@qingmaoedu.com
 * @Date: 2020-12-01 07:57:47
 * @LastEditTime: 2020-12-12 14:03:44
 * @FilePath: /mp-driver/src/pages/order/index.vue
 * @Copyright © 2019 Shanghai Qingmao Network Technology Co.,Ltd All rights reserved.
-->
<template>
  <div class="main-container">
    <!-- 登录获取历史订单 -->
    <div v-if="isLogin"></div>
    <div v-else>
      <div class="no-login">
        <span>登录后获取订单信息</span>
        <button class="login-btn">登录</button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      active: 0,
      isLogin: false, // 是否登录
    };
  },
  methods: {
    onChange(event) {
      console.log(event.mp);
    },
  },
};
</script>

<style scoped>
@import url("./order.css");
</style>
