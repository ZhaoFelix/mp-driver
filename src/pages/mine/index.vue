<!--
 * @Author: Felix
 * @Email: felix@qingmaoedu.com
 * @Date: 2020-12-01 07:57:47
 * @LastEditTime: 2021-04-25 14:13:18
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
          <div class="user-nickname">{{ isLogin ? nickname : "未登录" }}</div>
           <div class="user-type">
            {{ userType == 2 ? "物业经理人" : "普通用户" }}
          </div>
        </van-col>
      </van-row>
    </div>
    <div class="user-identer">
      <van-cell-group v-if="isLogin" title="详细信息">
        <van-cell title="司机姓名" :value="driverInfo[0].driver_name" />
        <van-cell title="司机手机号" :value="driverInfo[0].driver_phone" />
        <!-- <van-cell title="路线说明" :value="driverInfo[0].router_note" /> -->
      </van-cell-group>
      <div v-else class="no-login">登录后获取信息</div>
    </div>
    <div class="info-table">
      <van-cell
        is-link
        v-for="(item, index) in tableList"
        :key="index"
        :title="item.title"
        link-type="navigateTo"
        :url="item.url"
        @click="onClick(index)"
      />
    </div>
    <div class="version-info">{{ VERSION }}</div>
    <van-dialog
      use-slot
      title="反馈内容"
      :show="isFeedback"
      show-cancel-button
      @close="isFeedback = false"
      @confirm="feedbackContent"
    >
      <van-field
        :model="feedback"
        placeholder="请输入反馈信息"
        @blur="onblurFeedback"
        @change="onchangeFeedback"
      />
    </van-dialog>
  </div>
</template>

<script>
import index from "./mine.js";
export default index;
</script>

<style scoped>
@import url("./mine.css");
</style>
