<!--
 * @Author: Felix
 * @Email: felix@qingmaoedu.com
 * @Date: 2020-12-01 07:57:47
 * @LastEditTime: 2020-12-10 20:47:21
 * @FilePath: /mp-driver/src/pages/index/index.vue
 * @Copyright © 2019 Shanghai Qingmao Network Technology Co.,Ltd All rights reserved.
-->
<template>
  <div class="main-container">
    <div class="sub-container">
      <!-- 订单号 -->
      <div class="order-number">
        <span>订单号 </span>
        <span style="color: rgba(1, 1, 1, 0.7)">5678203948756543456</span>
      </div>
      <!-- 垃圾倾倒 -->
      <div v-for="i in 4" :key="i" class="step-6">
        <!-- top -->
        <van-row>
          <!-- left -->
          <van-col span="6">
            <van-row>
              <div class="step-common">2020/11/11 14:32:23</div>
            </van-row>
            <van-row>
              <div>&nbsp;</div>
            </van-row>
          </van-col>
          <!-- medium -->
          <van-col span="1">
            <van-row>
              <img src="../../../static/images/user.png" class="step-icon" />
            </van-row>
            <van-row>
              <div class="v-divider">&nbsp;</div>
            </van-row>
          </van-col>
          <!-- right -->
          <van-col offset="1" span="16">
            <van-row>
              <van-row>
                <van-col>
                  <van-row>
                    <van-col>
                      <div class="step-common-title">垃圾倾倒</div>
                    </van-col>
                    <van-col>
                      <button class="step-common-btn">完成订单</button>
                    </van-col>
                  </van-row>
                </van-col>
              </van-row>
              <!-- bottom -->
              <van-row>
                <van-col>
                  <div class="step-6-imgs">
                    <van-row>
                      <van-col span="12">
                        <div class="limit-common limit-tip">倾倒拍照：</div>
                      </van-col>
                      <van-col offset="8" span="4">
                        <div class="limit-common limit-number">2/4</div>
                      </van-col>
                    </van-row>
                    <van-row>
                      <van-col>
                        <div style="height: 8px"></div>
                        <van-uploader
                          :file-list="fileList"
                          max-count="4"
                          preview-size="45"
                          :deletable="false"
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
      <!-- 垃圾运输 -->
      <!-- 垃圾装车 -->
      <!-- 垃圾清算 -->
      <!-- 前往目的地 -->
      <!-- 订单信息 -->
    </div>
  </div>
</template>

<script>
import card from "@/components/card";

export default {
  data() {
    return {
      fileList: [
        {
          url: "https://img.yzcdn.cn/vant/leaf.jpg",
          name: "图片1",
        },
        {
          url: "https://img.yzcdn.cn/vant/leaf.jpg",
          name: "图片1",
        },
        {
          url: "https://img.yzcdn.cn/vant/leaf.jpg",
          name: "图片1",
        },
        {
          url: "https://img.yzcdn.cn/vant/leaf.jpg",
          name: "图片1",
        },
      ],
    };
  },

  components: {
    card,
  },

  methods: {
    articleDetail() {},
    courseDetail() {},
  },

  created() {
    // let app = getApp()
  },
};
</script>

<style scoped>
.main-container {
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.01);
  position: absolute;
}
.sub-container {
  width: 96%;
  background-color: white;
  position: absolute;
  margin: 8px 2% 0 8px;
  border-radius: 20px;
}

.order-number {
  font-size: 12px;
  background-color: rgba(0, 0, 0, 0.01);
  color: rgba(1, 1, 1, 0.5);
  padding: 6px 10px;
}

.step-common {
  font-size: 12px;
  text-align: center;
}
.step-icon {
  width: 30px;
  height: 30px;
}
.step-common-title {
  height: 30px;
  line-height: 30px;
  margin-left: 4px;
  color: rgba(1, 1, 1, 0.8);
  font-size: 14px;
}
.step-common-btn {
  margin-top: 4px;
  position: absolute;
  right: 10px;
  height: 22px;
  width: 80px;
  font-size: 10px;
}
.step-6-imgs {
  background-color: rgba(0, 0, 0, 0.01);
  padding: 8px;
  border-radius: 8px;
}

.limit-common {
  color: rgba(1, 1, 1, 0.5);
  font-size: 12px;
}
.limit-number {
  text-align: right;
}

.v-divider {
  background-color: rgba(0, 0, 0, 0.01);
  width: 2px;
  float: right;
  height: 90px;
}
</style>
