<template>
  <div>
    <van-button type="primary" :disabled="isClick > 1">主要</van-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isClick: 1,
    };
  },
};
</script>

<style scoped></style>
