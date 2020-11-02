<template>
  <div class="main-container">
    
    <div class="course-list">
      <div v-for="i in 4" :key="i" class="course-card">
        <div class="course-content" @click="courseDetail">
          <van-row class="card-top" gutter="10">
            <van-col span="8">
              <van-image
                src="../../../static/images/leader.png"
                width="100%"
                radius="8px"
                height="72px"
                fit="cover"
                @click="articleDetail"
              />
            </van-col>
            <van-col span="16">
              <van-row>
                <span class="course-name"> 垃圾倾倒 </span>
              </van-row>
              <van-row>
                <span class="course-time">
                  倾倒拍照
                </span>
              </van-row>
              <van-row class="course-price" gutter="20">
               
                <van-col span="8">
                  <span class="course-viewed"> 3/4 </span>
                </van-col>
              </van-row>
            </van-col>
          </van-row>
          <van-row class="card-bottom">
            <span>
              垃圾处置地点：地址地址地址地址地址地址地址地址地址地址地址
            </span>
          </van-row>
        </div>
      </div>
    </div>
    <div style="height: 5px; width: 100%"></div>
    
    
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

.course-content {
  padding: 10px;
}
.course-list {
  width: 100%;
  height: auto;
}
.course-name {
  font-weight: bold;
}
.course-time {
  font-size: 13px;
  color: rgba(1, 1, 1, 0.5);
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
  box-shadow: 1px 1px 1px 1px rgba(0, 0, 0, 0.05);
  margin: 5px 2% 5px 2%;
  background-color: white;
  border-radius: 10px;
}
.course-viewed {
  color: rgba(0, 0, 0, 0.5);
  font-size: 11px;
  text-align: right;
}
.card-bottom span {
  color: rgba(0, 0, 0, 0.5);
  font-size: 13px;
}
.service {
  position: fixed;
  width: 80px;
  height: 60px;
  bottom: 10px;
  right: 10px;
}
</style>
