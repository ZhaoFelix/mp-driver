<template>
  <div class="main-container">
    <div class="course-list">
      <div v-for="i in 3" :key="i" class="course-card">
        <div class="course-content" @click="courseDetail">
          <van-row>
            <van-col span="7">
              <van-row>
                <span class="course-yearTime">20-11-09</span>
              </van-row>
              <van-row>
                <span class="course-time">14:34:24</span>
              </van-row>
            </van-col>
            <van-col span="1">
              <van-image
                src="../../../static/images/user.png"
                width="30%"
                radius="8px"
                height="72px"
                fit="cover"
                @click="articleDetail"
              />
            </van-col>

            <van-col span="16">
              <van-col span="17">
                <span class="course-map">垃圾运输中</span>
              </van-col>
              <van-col>
                <span class="course-pushBut">提交订单</span>
              </van-col>
              <van-row>
                <van-uploader>
                  <van-button
                    icon="photo"
                    type="primary"
                    custom-class="upImage"
                  ></van-button>
                </van-uploader>
                <van-uploader>
                  <van-button
                    icon="photo"
                    type="primary"
                    custom-class="upImage"
                  ></van-button>
                </van-uploader>
                <van-uploader>
                  <van-button
                    icon="photo"
                    type="primary"
                    custom-class="upImage"
                  ></van-button>
                </van-uploader>
                <van-uploader>
                  <van-button
                    icon="photo"
                    type="primary"
                    custom-class="upImage"
                  ></van-button>
                </van-uploader>
              </van-row>
              <span class="course-map">垃圾运输中</span>
            </van-col>
          </van-row>
        </div>
      </div>
      <div class="course-list">
        <div class="course-card">
          <div class="course-content" @click="courseDetail">
            <van-row>
              <van-col span="7">
                <van-row>
                  <span class="course-yearTime">20-11-09</span>
                </van-row>
                <van-row>
                  <span class="course-time">14:34:24</span>
                </van-row>
              </van-col>
              <van-col span="1">
                <van-image
                  src="../../../static/images/user.png"
                  width="30%"
                  radius="8px"
                  height="72px"
                  fit="cover"
                  @click="articleDetail"
                />
              </van-col>

              <van-col span="16">
                <van-col span="17">
                  <span  class="course-order">正在前往目的地</span>
                </van-col>
                <van-col>
                  <span class="course-pushBut">提交订单</span>
                </van-col>
               
                <van-col span="24" >
                <div class="course-bottomcolor">
                <div>
                 <van-col class="course-orderinformation" span="16">订单地址：区、街道</van-col>
                 <van-col class="course-ordermap" sapn="16">上海市奉贤区南桥镇环城东路664号</van-col>
                </div>
                <div style="height: 2px; width: 100%"></div>
                <div class="course-bottomcolorline">
                 <van-col class="course-orderinformation" span="16">联系人</van-col>
                 <van-col class="course-ordermap" sapn="16">李二狗<span class="course-ordermap">电话；联系：176****0276</span></van-col>
                 </div>
                </div>
                </van-col>
                
              </van-col>
            </van-row>
          </div>
        </div>
      </div>
    </div>
    <div style="height: 2px; width: 100%"></div>
  </div>
</template>

<script>
import card from "@/components/card";

export default {
  data() {
    return {};
  },

  components: {
    card,
  },

  methods: {
    articleDetail() {},
    courseDetail() {
      let url = "../courseDetail/main";
      mpvue.navigateTo({ url });
    },
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
  background-color: rgba(0, 0, 0, 0.05);
}
.article {
  width: 100%;
  height: 180px;
}
.img {
  position: absolute;
  width: 100%;
}
.title {
  padding: 0px 0px 10px 2%;
}
.title span {
  font-size: 15px;
  font-weight: bold;
}
.divider {
  width: 100%;
  height: 8px;
  background-color: rgba(0, 0, 0, 0.05);
}

.course-content {
  padding: 20px;
}
.course-list {
  width: 100%;
  height: auto;
}
.course-name {
  font-weight: bold;
}
.course-map {
  width: 100%;
  font-size: 13px;
  color: rgba(1, 1, 1, 0.5);
}
.course-ordermap{
   width: 100%;
  font-size: 9px;
  color: rgba(1, 1, 1, 0.5);
}
.course-order {
  width: 100%;
  font-size: 15px;
  color: rgba(1, 1, 1, 0.9);
}
.course-orderinformation{
  
  width: 100%;
  font-size: 11px;
  color: rgba(1, 1, 1, 0.7);
}
.course-mapBottom {
  width: 100%;
  padding-left: 70px;
  font-size: 13px;
  color: rgba(1, 1, 1, 0.5);
}
.course-time {
  width: 100%;
  font-size: 10px;
}
.course-yearTime {
  width: 100%;
  font-size: 14px;
}
.course-pushBut {
  padding: 4px;

  color: aliceblue;
  font-size: 12px;
  background-color: sienna;
}

.discount-price {
  color: red;
}
.raw-price {
  text-decoration: line-through;
  color: rgba(0, 0, 0, 0.5);
  font-size: 13px;
  margin-left: 10px;
}
.course-card {
  background-color: rgba(255, 255, 255, 0.883);
  border-radius: 15px;
}
 >>>.upImage {
  background-color: gainsboro;
  border-color: white;
  width: 50px;
  margin-right: 5px;
  margin-top: 7px;
}
.course-bottomcolor{
  padding-top: 5px;
  padding-left: 5px;
  border-radius: 5px;
  height: 60px;
  width: 95%;
  background-color: #f3f3f3e8;
}
.course-bottomcolorline{
  padding-top: 10px;
  height: 100%;
  width: 100%;
  background-color: #f3f3f3e8;
}
</style>
