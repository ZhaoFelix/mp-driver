<!--
 * @Author: Felix
 * @Email: felix@qingmaoedu.com
 * @Date: 2020-12-01 07:57:47
 * @LastEditTime: 2021-05-12 08:20:21
 * @FilePath: /mp-driver/src/pages/index/index.vue
 * @Copyright © 2019 Shanghai Qingmao Network Technology Co.,Ltd All rights reserved.
-->
<template>
  <div class="main-container">
      <div v-if="!isLogin">
      <div class="no-login">
        <span> 登录后获取订单信息 </span>
        <button
        v-if="!canUseGetUserProfile"
          open-type="getUserInfo"
          class="login-btn"
          @getuserinfo="bindGetUserInfo($event)"
        >
          登录
        </button>
        <!-- 高版本库 -->
        <button
        v-else
          open-type="getUserInfo"
          class="login-btn"
          @click="getUserProfile($event)"
        >
          登录
        </button>
      </div>
    </div>
  <div v-else-if="isShow" style="padding-bottom:40px;">
    <van-row>
      <div class="custom-style" v-for="(item, index) in list" :key="index">
        <div class="top-divider"></div>
        <!-- 顶部 -->
        <van-row>
          <div style="height: 8px"></div>
          <van-col span="1" offset="1">
            <div class="v-line">
              <span class="v-line-span"></span>
            </div>
          </van-col>
          <van-col span="16">
            <div class="order-number common">
              {{ "订单编号：" + item.order_number }}
            </div>
          </van-col>
          <van-col offset="1" span="4">
            <div v-if="item.order_status == '3'" class="order-status common">
              已接单
            </div>
            <div v-if="item.order_status == '4'" class="order-status common">
              正在前往
            </div>
            <div v-if="item.order_status == '5'" class="order-status common">
              运输中
            </div>
            <div v-if="item.order_status == '6'" class="order-status common">
              已完成
            </div>
          </van-col>
        </van-row>
        <van-row>
          <van-col offset="1" span="22">
            <div class="divider"></div>
          </van-col>
        </van-row>
        <!-- 中间 -->
        <van-row>
          <van-row>
            <van-col offset="1" span="9">
              <span class="address-title">订单地区、街道</span>
            </van-col>
            <van-col offset="4" span="8" v-if="item.order_type  == 1 ">
              <span class="price-title">装修面积：</span>
              <span class="price">{{ item.order_size }}</span>
              <span class="price-end"> 平方米</span>
            </van-col>
              <van-col offset="4" span="8" v-else-if="item.order_type  == 2 ">
              <span class="price-title">商业装修</span>
              <!-- <span class="price">{{ item.order_size }}</span>
              <span class="price-end"> 平方米</span> -->
            </van-col>
              <van-col offset="4" span="8" v-else-if="item.order_type  == 3 ">
              <span class="price-title">垃圾箱数量：</span>
              <span class="price">{{ item.box_number }}</span>
              <span class="price-end"> 箱</span>
            </van-col>
          </van-row>
          <van-row>
            <van-col offset="1">
              <span class="common">{{ item.user_address }}</span>
            </van-col>
          </van-row>
        </van-row>
        <van-row>
          <van-col offset="1">
            <span class="time-title">预约时间：</span>
            <span class="time">{{ item.reserve_time }}</span>
          </van-col>
        </van-row>
        <!-- 底部 -->
        <van-row>
          <van-col offset="1" span="16"   >
            <div class="driver-info" v-if="item.order_status == '6'">
              {{
                "&nbsp;&nbsp;完成时间：" +
                item.driver_reach_trash +
                "&nbsp;&nbsp;"
              }}
            </div>
          </van-col>
          <van-col offset='1' span="4">
            <span>详情</span>
          </van-col>
        </van-row>
      </div>
    </van-row>
  </div>
  <div v-else>
      <div class="no-login">
        <span> 暂无订单 </span>
      </div>
    </div>
    <van-sticky class="refresh">
      <img
        class="refresh-img"
        src="../../../static/images/refresh.png"
        alt=""
        @click="fetchData"
      />
    </van-sticky>
  </div>
</template>
<script>
import index from "./order.js";
export default index;
</script>

<style scoped>
@import "./order.css";
</style>
