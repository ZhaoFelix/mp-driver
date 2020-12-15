<!--
 * @Author: Felix
 * @Email: felix@qingmaoedu.com
 * @Date: 2020-12-01 07:57:47
 * @LastEditTime: 2020-12-15 09:03:55
 * @FilePath: /mp-driver/src/pages/order/index.vue
 * @Copyright © 2019 Shanghai Qingmao Network Technology Co.,Ltd All rights reserved.
-->

<template>
  <div class="main-container">
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
            <div v-if="item.order_status == '1'" class="order-status common">
              待指派司机
            </div>
            <div v-if="item.order_status == '3'" class="order-status common">
              已指派司机
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
            <van-col offset="1" span="10">
              <span class="address-title">订单地区、街道</span>
            </van-col>
            <van-col offset="4" span="7" v-if="item.order_status != 0">
              <span class="price-title">实付款：</span>
              <span class="price">{{ item.order_final_price }}</span>
              <span class="price-end"> 元</span>
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
            <span class="time">{{ item.user_reserve_time }}</span>
          </van-col>
        </van-row>
        <!-- 底部 -->
        <van-row>
          <van-col offset="1" span="11">
            <div class="driver-info" v-if="item.order_status == '3'">
              {{
                "车牌号：" + item.Info.car_number + " " + item.Info.driver_name
              }}
            </div>
          </van-col>
          <van-col :offset="item.order_status == '3' ? '1' : '13'" span="10">
            <div class="btn-groups">
              <van-row>
                <van-col span="11" v-if="item.order_status == '3'"
                  ><button class="driver-btn" @click="contactDriver(item.Info)">
                    联系司机
                  </button>
                </van-col>
                <van-col
                  :offset="item.order_status == '3' ? '2' : '13'"
                  span="11"
                >
                  <button class="service-btn" @click="contactService">
                    联系客服
                  </button>
                </van-col>
              </van-row>
            </div>
          </van-col>
        </van-row>
      </div>
    </van-row>
  </div>
</template>
<script>
import index from "./order.js";
export default index;
</script>

<style scoped>
@import "./order.css";
</style>
