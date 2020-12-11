<!--
 * @Author: Felix
 * @Email: felix@qingmaoedu.com
 * @Date: 2020-12-01 07:57:47
 * @LastEditTime: 2020-12-11 09:43:42
 * @FilePath: /mp-driver/src/pages/order/index.vue
 * @Copyright © 2019 Shanghai Qingmao Network Technology Co.,Ltd All rights reserved.
-->
<template>
  <div class="main-container"></div>
</template>
<script>
export default {
  data() {
    return {
      active: 0,
    };
  },
  methods: {
    onChange(event) {
      console.log(event.mp);
    },
    clickBuy() {
      // TODO: 免费课程直接领取，付费课程进入购买页面
      let url = "../order/main";
      mpvue.navigateTo({ url });
    },
  },
};
</script>

<style scoped></style>
