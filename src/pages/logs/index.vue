<template>
  <div class="main-container">
    <van-tabs :active="active" bind:change="onChange">
  <van-tab title="全部">
    <div>
      <van-image
            src="../../../static/images/leader.png"
           width="100%"
            height="1000"
            fit="cover"
            @click="articleDetail"
          />
      </div>
  </van-tab>
  <van-tab title="已完成">
    <div>
      <van-image
            src="../../../static/images/leader.png"
            width="70"
            radius="35px"
            height="70px"
            fit="cover"
            @click="articleDetail"
          />
    </div>
  </van-tab>
  <van-tab title="已取消">
    <div>
      <van-image
            src="../../../static/images/leader.png"
            width="70"
            radius="35px"
            height="70px"
            fit="cover"
            @click="articleDetail"
          />
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

</style>
