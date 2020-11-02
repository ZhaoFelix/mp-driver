<template>
  <div class="main-container">
    <div class="user-info">
      <van-row>
        <van-col offset="1" span="6">
          <van-image
            src="../../../static/images/user.png"
            width="70"
            radius="35px"
            height="70px"
            fit="cover"
            @click="articleDetail"
          />
        </van-col>
        <van-col span="16">
          <div class="user-nickname">老司机</div>
          <div class="wechat">手机号</div>
        </van-col>
      </van-row>
    </div>
     <div class="course-list">
      <div  class="course-card">
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
            
           
          </van-row>
         
        </div>
      </div>
    </div>
    <div class="info-table">
      <van-cell
        v-for="(item, index) in tableList"
        :key="index"
        is-link
        :title="item.title"
        :url="item.url"
      />
    </div>
    <div class="version-info">v 2.3.1</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableList: [
        {
          title: "我的订单",
          url: "/pages/orders/main",
        },
        {
          title: "服务协议",
          url: "/pages/protocol/main",
        },
        {
          title: "分享",
          url: "",
        },
        {
          title: "意见反馈",
          url: "/pages/feedback/main",
        },
      ],
    };
  },
};
</script>


<style scoped>
.main-container {
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.05);
}
.user-info {
  height: 70px;
  width: 100%;
  margin-top: 15px;
  background-color: white;
}
.user-nickname {
  margin-top: 5px;
  height: 30px;
  line-height: 30px;
}
.wechat {
  height: 30px;
  line-height: 30px;
  font-size: 13px;
  color: rgba(1, 1, 1, 0.6);
}
.info-table {
  margin-top: 15px;
}

.version-info {
  width: 100%;
  text-align: center;
  font-size: 12px;
  color: rgba(0, 0, 0, 0.15);
  position: fixed;
  bottom: 10px;
}
.main-container {
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.05);
}
.article {
  width: 100%;
  height: 180px;
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
