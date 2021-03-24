<!--
 * @Author: Felix
 * @Email: felix@qingmaoedu.com
 * @Date: 2020-12-01 07:57:47
 * @LastEditTime: 2021-03-24 12:24:26
 * @FilePath: /mp-driver/src/pages/index/index.vue
 * @Copyright © 2019 Shanghai Qingmao Network Technology Co.,Ltd All rights reserved.
-->
<template>
  <div class="main-container">
    <div v-if="!isLogin">
      <div class="no-login">
        <span> 登录后获取订单信息 </span>
        <button
          open-type="getUserInfo"
          class="login-btn"
          @getuserinfo="bindGetUserInfo($event)"
        >
          登录
        </button>
      </div>
    </div>
    <div class="sub-container" v-else-if="isShow">
      <!-- 订单号 -->
      <div class="order-number">
        <span>订单号 </span>
        <span style="color: rgba(1, 1, 1, 0.7)">{{
          orderInfo.order_number
        }}</span>
      </div>
      <!-- 垃圾倾倒 -->
      <div class="step-6" v-if="orderInfo.driver_reach_trash != null">
        <!-- top -->
        <van-row>
          <!-- left -->
          <van-col span="5">
            <van-row>
              <div class="step-common">
                {{ complete_date == "null" ? "" : complete_date }}
              </div>
              <div class="step-common-1">{{ complete_time }}</div>
            </van-row>
            <van-row>
              <div>&nbsp;</div>
            </van-row>
          </van-col>
          <!-- medium -->
          <van-col span="1">
            <van-row>
              <div>
                <img src="../../../static/images/6.png" class="step-icon-1" />
              </div>
            </van-row>
            <van-row>
              <div class="v-divider">&nbsp;</div>
            </van-row>
          </van-col>
          <!-- right -->
          <van-col offset="1" span="17">
            <van-row>
              <van-row>
                <van-col>
                  <van-row>
                    <van-col>
                      <div class="step-common-title">垃圾倾倒</div>
                    </van-col>
                    <van-col>
                      <button
                        class="step-common-btn"
                        :disabled="isComplete"
                        @click="completeOrder"
                      >
                        完成订单
                      </button>
                    </van-col>
                  </van-row>
                </van-col>
              </van-row>
              <!-- bottom -->
              <!-- <van-row>
                <van-col span="22">
                  <div class="step-6-imgs">
                    <van-row>
                      <van-col span="12">
                        <div class="limit-common limit-tip">倾倒拍照：</div>
                      </van-col>
                      <van-col offset="8" span="4">
                        <div class="limit-common limit-number">
                          {{ isCompleteLimit }}
                        </div>
                      </van-col>
                    </van-row>
                    <van-row>
                      <van-col>
                        <div style="height: 8px"></div>
                        <van-uploader
                          :file-list="driverCompleteImages"
                          :max-count="maxCount"
                          preview-size="50"
                          :deletable="isCompleteDeleted"
                          @afterRead="afterCompleteRead"
                          @delete="deleteCompleteImage"
                        />
                      </van-col>
                    </van-row>
                  </div>
                </van-col>
              </van-row> -->
            </van-row>
          </van-col>
        </van-row>
      </div>
      <!-- 垃圾运输 -->
      <div class="step-6" v-if="orderInfo.order_status == 5">
        <!-- top -->
        <van-row>
          <!-- left -->
          <van-col span="5">
            <van-row>
              <div class="step-common">已用时</div>
              <div class="step-common-1">{{ onGoingTimeGap + "" }}</div>
            </van-row>
            <van-row>
              <div>&nbsp;</div>
            </van-row>
          </van-col>
          <!-- medium -->
          <van-col span="1">
            <van-row>
              <div class="step-icon-1">
                <img src="../../../static/images/5.png" class="step-icon" />
              </div>
            </van-row>
            <van-row>
              <div class="v-divider-1">&nbsp;</div>
            </van-row>
          </van-col>
          <!-- right -->
          <van-col offset="1" span="17">
            <van-row>
              <van-col>
                <div class="step-common-title">垃圾运输中</div>
              </van-col>
              <van-col>
                <button
                  class="step-common-btn"
                  :disabled="isReachTrashDes"
                  @click="reachTrashDes"
                >
                  到达清算点
                </button>
              </van-col>
            </van-row>
            <van-row>
              <span class="limit-common">正在前往清算点</span>
            </van-row>
          </van-col>
        </van-row>
      </div>

      <!-- 垃圾装车 -->
      <div class="step-6" v-if="orderInfo.driver_reach_time != null">
        <!-- top -->
        <van-row>
          <!-- left -->
          <van-col span="5">
            <van-row>
              <div class="step-common">{{ get_date }}</div>
              <div class="step-common-1">{{ get_time }}</div>
            </van-row>
            <van-row>
              <div>&nbsp;</div>
            </van-row>
          </van-col>
          <!-- medium -->
          <van-col span="1">
            <van-row>
              <div class="step-icon-1">
                <img src="../../../static/images/4.png" class="step-icon" />
              </div>
            </van-row>
            <van-row>
              <div class="v-divider-2">&nbsp;</div>
            </van-row>
          </van-col>
          <!-- right -->
          <van-col offset="1" span="17">
            <van-row>
              <van-row>
                <van-col>
                  <van-row>
                    <van-col>
                      <div class="step-common-title">清运装车</div>
                    </van-col>
                    <van-col>
                      <button
                        class="step-common-btn"
                        :disabled="isGet"
                        @click="getImages"
                      >
                        装车完成
                      </button>
                    </van-col>
                  </van-row>
                </van-col>
              </van-row>
              <!-- bottom -->
              <van-row>
                <van-col span="22">
                  <div class="step-6-imgs">
                    <van-row>
                      <van-col span="12">
                        <div class="limit-common limit-tip">装车拍照：</div>
                      </van-col>
                      <van-col offset="8" span="4">
                        <div class="limit-common limit-number">
                          {{ isGetLimit }}
                        </div>
                      </van-col>
                    </van-row>
                    <van-row>
                      <van-col>
                        <div style="height: 8px"></div>
                        <van-uploader
                          :file-list="driverGetImages"
                          :max-count="maxCount"
                          preview-size="50" 
                          
                          :deletable="isGetDeleted"
                          @afterRead="afterGetRead"
                          @delete="deleteGetImage"
                        />
                      </van-col>
                    </van-row>
                  </div>
                </van-col>
              </van-row>
            </van-row>
          </van-col>
        </van-row>
      </div>
      <!-- 垃圾清算 -->
      <div class="step-6" v-if="isReach">
        <!-- top -->
        <van-row>
          <!-- left -->
          <van-col span="5">
            <van-row>
              <div class="step-common">
                {{ reach_date }}
              </div>
              <div class="step-common-1">{{ reach_time }}</div>
            </van-row>
            <van-row>
              <div>&nbsp;</div>
            </van-row>
          </van-col>
          <!-- medium -->
          <van-col span="1">
            <van-row>
              <div class="step-icon-1">
                <img src="../../../static/images/3.png" class="step-icon" />
              </div>
            </van-row>
            <van-row>
              <div class="v-divider-2">&nbsp;</div>
            </van-row>
          </van-col>
          <!-- right -->
          <van-col offset="1" span="17">
            <van-row>
              <van-row>
                <van-col>
                  <van-row>
                    <van-col>
                      <div class="step-common-title">现场清算</div>
                      <div class="limit-common">
                        {{ "装修面积：" + orderInfo.order_size + " m²" }}
                      </div>
                    </van-col>
                    <van-col>
                      <button
                        class="step-common-btn"
                        :disabled="isReach1"
                        @click="reachImages"
                      >
                        完成清算
                      </button>
                    </van-col>
                  </van-row>
                </van-col>
              </van-row>
              <!-- bottom -->
              <van-row>
                <van-col span="22">
                  <div class="step-6-imgs">
                    <van-row>
                      <van-col span="12">
                        <div class="limit-common limit-tip">渣土拍照：</div>
                      </van-col>
                      <van-col offset="8" span="4">
                        <div class="limit-common limit-number">
                          {{ isReachLimit }}
                        </div>
                      </van-col>
                    </van-row>
                    <van-row>
                      <van-col span="24">
                        <div style="height: 8px"></div>
                        <van-uploader
                          :file-list="driverReachImages"
                          :max-count="maxCount"
                          preview-size="50"
                          :deletable="isReachDeleted"
                          @afterRead="afterReachRead"
                          @delete="deleteReachImage"
                        />
                      </van-col>
                    </van-row>
                  </div>
                </van-col>
              </van-row>
            </van-row>
          </van-col>
        </van-row>
      </div>
      <!-- 前往目的地 -->
      <div class="step-6" v-if="orderInfo.driver_go_des != null">
        <!-- top -->
        <van-row>
          <!-- left -->
          <van-col span="5">
            <van-row>
              <div class="step-common">已用时</div>
              <div class="step-common-1">{{ goDesTimeGap }}</div>
            </van-row>
            <van-row>
              <div>&nbsp;</div>
            </van-row>
          </van-col>
          <!-- medium -->
          <van-col span="1">
            <van-row>
              <div class="step-icon-1">
                <img src="../../../static/images/2.png" class="step-icon" />
              </div>
            </van-row>
            <van-row>
              <div class="v-divider-2">&nbsp;</div>
            </van-row>
          </van-col>
          <!-- right -->
          <van-col offset="1" span="17">
            <van-row>
              <van-row>
                <van-col>
                  <van-row>
                    <van-col>
                      <div class="step-common-title">正在前往目的地</div>
                    </van-col>
                    <van-col>
                      <button
                        class="step-common-btn"
                        :disabled="isReach"
                        @click="reachDestination"
                      >
                        到达目的地
                      </button>
                    </van-col>
                  </van-row>
                </van-col>
              </van-row>
              <!-- bottom -->
              <van-row>
                <van-col span="22">
                  <div class="step-6-imgs">
                    <van-row>
                      <div class="step-common-title">订单地址区、街道</div>
                      <div class="limit-common">上海市奉贤区奉浦大道123号</div>
                      <div class="step-common-title">联系人</div>
                      <div class="limit-common">
                        <van-row>
                          <van-col span="5">
                            <span>{{ orderInfo.order_user_name }}</span>
                          </van-col>
                          <van-col offset="2">
                            <span>联系电话：</span>
                            <span style="color: red">{{
                              orderInfo.user_phone
                            }}</span>
                          </van-col>
                        </van-row>
                      </div>
                    </van-row>
                  </div>
                </van-col>
              </van-row>
            </van-row>
          </van-col>
        </van-row>
      </div>
      <!-- 订单信息 -->
      <div class="step-6">
        <!-- top -->
        <van-row>
          <!-- left -->
          <van-col span="5">
            <van-row>
              <div class="step-common">
                {{ place_date }}
              </div>
              <div class="step-common-1">{{ place_time }}</div>
            </van-row>
            <van-row>
              <div>&nbsp;</div>
            </van-row>
          </van-col>
          <!-- medium -->
          <van-col span="1">
            <van-row>
              <div class="step-icon-1">
                <img src="../../../static/images/1.png" class="step-icon" />
              </div>
            </van-row>
            <van-row>
              <div class="v-divider-2">&nbsp;</div>
            </van-row>
          </van-col>
          <!-- right -->
          <van-col offset="1" span="17">
            <van-row>
              <van-row>
                <van-col>
                  <van-row>
                    <van-col>
                      <div class="step-common-title">已派单</div>
                    </van-col>
                    <van-col>
                      <button
                        class="step-common-btn"
                        :disabled="orderInfo.order_status != 3 ? true : false"
                        @click="goDestination"
                      >
                        立即出发
                      </button>
                    </van-col>
                  </van-row>
                </van-col>
              </van-row>
              <!-- bottom -->
              <van-row>
                <van-col span="22">
                  <div class="step-6-imgs">
                    <van-row>
                      <div class="step-common-title">订单地址区、街道</div>
                      <div class="limit-common">
                        {{ orderInfo.user_address }}
                      </div>
                      <div class="step-common-title">建筑面积</div>
                      <div class="limit-common">
                        <van-row>
                          <van-col span="5">
                            <span>{{ orderInfo.order_size + " m²" }}</span>
                          </van-col>
                          <van-col>
                            <span>&nbsp;预约时间：</span>
                            <span style="color: red">{{
                              orderInfo.user_reserve_time
                            }}</span>
                          </van-col>
                        </van-row>
                      </div>
                    </van-row>
                  </div>
                </van-col>
              </van-row>
            </van-row>
          </van-col>
        </van-row>
      </div>
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
    <van-popup
      :show="isShowPopup"
      round
      position="bottom"
      custom-style="height: 40%"
      @close="cancelSelect"
    >
      <van-picker
        show-toolbar
        :columns="columns"
        :default-index="columns.length / 2"
        title="选择车牌号"
        @cancel="cancelSelect"
        @confirm="confirmSelect"
      />
    </van-popup>
  </div>
</template>

<script>
import ongoing from "./ongoing.js";
export default ongoing;
</script>

<style scoped>
@import url("./index.css");
</style>
