<template>
  <div class="main-container">
    <van-tabs :active="active" bind:change="onChange">
  <van-tab title="全部">
    <div>
      <div class="course-list">
      <div v-for="i in 4" :key="i" class="course-card">
        <div class="course-content" @click="courseDetail">
          
              <van-row >
                <span class="course-map">｜｜｜订单编号：20201113-15</span>
                <span class="course-map">未完成</span>
              </van-row>
           <van-row> 
                <span class="course-name"> 订单地址：地区、街道 </span>
           </van-row>
          <van-row >
            <span class="course-map">
              上海市奉贤区奉浦大道123号
            </span>
          </van-row>
          <van-row >
            <span class="course-time">上海市奉贤区奉浦大道123号</span>
            <span class="course-mapBottom">实际付款：450</span>
          </van-row>
        </div>
      </div>
    </div>
      </div>
  </van-tab>
  <van-tab title="已完成">
    <div>
       <div>
      <div class="course-list">
      <div v-for="i in 4" :key="i" class="course-card">
        <div class="course-content" @click="courseDetail">
          
              <van-row >
                <span class="course-map">｜｜｜订单编号：20201113-15</span>
                <span class="course-map">未完成</span>
             
              </van-row>

           <van-row> 
              
                <span class="course-name"> 订单地址：地区、街道 </span>
           </van-row>
          <van-row >
            <span class="course-map">
              上海市奉贤区奉浦大道123号
            </span>
          </van-row>
          <van-row >
            <span class="course-time">上海市奉贤区奉浦大道123号</span>
            <span class="course-mapBottom">实际付款：450</span>
          </van-row>
        </div>
      </div>
    </div>
      </div>
    </div>
  </van-tab>
  <van-tab title="已取消">
    <div>
       <div>
      <div class="course-list">
      <div v-for="i in 4" :key="i" class="course-card">
        <div class="course-content" @click="courseDetail">
          
              <van-row >
                <span class="course-map">｜｜｜订单编号：20201113-15</span>
                <span class="course-map">已取消</span>
             
              </van-row>

           <van-row> 
              
                <span class="course-name"> 订单地址：地区、街道 </span>
           </van-row>
          <van-row  >
            <van-col class="course-map">
              上海市奉贤区奉浦大道123号
            </van-col>
            <van-col class="course-time">取消日期2020年11月20</van-col>
                <van-col class="course-backGroudColor">
                <van-row><span class="course-mapBottom"> 取消原因</span></van-row>
                <van-row><span class="course-mapBottom">调度员后台操作</span></van-row>
            </van-col>
            
          </van-row>
          
          
        </div>
      </div>
    </div>
      </div>
    </div>
  </van-tab>
</van-tabs>
      
  </div>
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

<style scoped>
.top-1,
.top-2,
.top-3 {
  padding: 3px 5px;
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
  padding-right:100px;
  font-size: 13px;
  color: rgba(1, 1, 1, 0.5);
}
.course-mapBottom {
  width: 100%;
  padding-left:70px;
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
  box-shadow: 5px 5px 5px 5px rgba(0, 0, 0, 0.05);
  margin: 5px 2% 5px 2%;
  background-color: rgba(255, 255, 255, 0.883);
  border-radius: 15px;
  
}
.course-backGroudColor{
  
  height: 100%;
  width: 100%;
  background-color: #f3f3f346;
}
</style>
