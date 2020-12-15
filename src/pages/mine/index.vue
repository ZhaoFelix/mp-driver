<!--
 * @Author: Felix
 * @Email: felix@qingmaoedu.com
 * @Date: 2020-12-01 07:57:47
 * @LastEditTime: 2020-12-15 14:52:53
 * @FilePath: /mp-driver/src/pages/mine/index.vue
 * @Copyright © 2019 Shanghai Qingmao Network Technology Co.,Ltd All rights reserved.
-->
<template>
  <div class="main-container">
    <div class="user-info">
      <van-row>
        <van-col offset="1" span="6">
          <van-image
            :src="avatar"
            width="60"
            radius="30px"
            height="60px"
            fit="cover"
            @click="articleDetail"
          />
        </van-col>
        <van-col span="16">
          <div class="user-nickname">{{ nickname }}</div>
        </van-col>
      </van-row>
    </div>
    <div class="user-identer">
      <van-cell-group title="详细信息">
        <van-cell title="司机姓名" :value="driverInfo.driver_name" />
        <van-cell title="司机手机号" :value="driverInfo.driver_phone" />
        <van-cell title="路线说明" :value="driverInfo.router_note" />
      </van-cell-group>
    </div>
    <div class="info-table">
      <van-cell
        is-link
        v-for="(item, index) in tableList"
        :key="index"
        :title="item.title"
        link-type="navigateTo"
        :url="item.url"
      />
    </div>
    <div class="version-info">v 2.3.1</div>
  </div>
</template>

<script>
import index from "./mine.js";
export default index;
</script>

<style scoped>
@import url("./mine.css");
</style>
