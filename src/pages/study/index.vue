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
    <div class="user-identer">
       
       <can-col span="14">
         
         </can-col>
      <van-row>
      <van-col  span="14">
         <span class="course-toptext">详细信息</span>
         
       </van-col>
      
        <van-col span="14">
          <van-col span="14">
         <span class="course-map">司机姓名：周师傅</span>
        </van-col>
        <van-col span="14">
         <span class="course-map">牌照：沪Advaw3</span>
        </van-col>
        <van-col span="14">
        <span class="course-map">车辆型号：P64Gk</span>
        </van-col>
        <van-col span="14">
            <span class="course-map">车辆承重：30KG </span>
        </van-col>
        <van-col span="14">
        <span class="course-map">车辆尺寸：</span>
        </van-col>
        </van-col>
       
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
      
        
      </van-row>
    </div>
  
    <div class="info-table">
      <van-cell 
  is-link
  title="服务协议"
  link-type="navigateTo"
  url="../../pages/index/index"/>
    </div>
    <div class="info-table">
      <van-cell 
  is-link
  title="意见反馈"
  link-type="navigateTo"
  url="../../pages/index/index"/>
    </div>
    <div class="info-table">
      <van-cell 
  is-link
  title="联系客服"
  link-type="navigateTo"
  url="../../pages/index/index"/>
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
  height: 90px;
  width: 100%;
  margin-top: 15px;
  background-color: white;
}
.user-identer {
  height: 170px;
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
  margin-top: 5px;
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
.course-map {
  width: 100%;
 margin-left: 10%;
  font-size: 13px;
  margin-top: -5%;
  color: rgba(1, 1, 1, 0.5);
}
.course-toptext {
  width: 100%;
  margin-left: 5%;
  font-size: 18px;
  color: rgba(1, 1, 1, 0.5);
}
.course-line {
  margin: 0%;
  padding: 0%;

}
</style>
