<template>
  <div class="main-container">
    
    <div class="course-list">
      <div v-for="i in 4" :key="i" class="course-card">
        <div class="course-content" @click="courseDetail">
          <van-row>
            <van-col span="8">
              <van-image
                src="../../../static/images/user.png"
                width="60%"
                radius="8px"
                height="72px"
                fit="cover"
                @click="articleDetail"
              />
             </van-col>
  
             <van-col span="16">
               <span class="course-map">垃圾运输中</span>
                 <van-row>      
                  <span class="course-name"> 垃圾倾倒 、垃圾清理</span>
                 </van-row>
                  <span class="course-map">垃圾运输中</span>
              </van-col>
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
  padding-right: 100px;
  font-size: 13px;
  color: rgba(1, 1, 1, 0.5);
}
.course-mapBottom {
  width: 100%;
  padding-left: 70px;
  font-size: 13px;
  color: rgba(1, 1, 1, 0.5);
}
.course-time {
  width: 100%;
  font-size: 13px;
  background-color: rgba(206, 146, 50, 0.5);
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
</style>
