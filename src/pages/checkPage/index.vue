<template>
  <div>
    <div class="fieldSize">
      <div>
        <van-field
          type="number"
          :value="phoneNumber"
          label="联系电话"
          placeholder="输入您的手机号"
          maxlength="11"
          :error-message="phoneMessage"
          @change="onchangePhoneNumber"
          @blur="getValue"
          required
        >
        </van-field>
        <span class="tip">* 手机号将用于进行司机身份的认证</span>
      </div>
    </div>
    <div>
      <van-col offset="8" span="8">
        <van-button type="primary" size="large" @click="estateVerify"
          >认 证</van-button
        >
      </van-col>
    </div>
    <van-toast id="van-toast" />
  </div>
</template>

<script>
import { mapState } from "vuex";
import Toast from "@vant/weapp/dist/toast/toast";
export default {
  data() {
    return {
      phoneNumber: "",
      checkCode: "",
      phoneMessage: "",
    };
  },
  computed: {
    ...mapState(["openID", "userID"]),
  },
  methods: {
    changePage() {
      let url = "../propInformation/main";
      mpvue.navigateTo({ url });
    },
    getValue(event) {
      console.log("失去光标");
      this.phoneNumber = event.mp.detail.value;
    },
    getCheckCode(event) {
      this.checkCode = event.mp.detail;
    },
    onchangePhoneNumber(event) {
      const phone = event.mp.detail || event;
      // 失去光标后进行判断
      if (event.mp.detail.value != undefined) {
        return;
      }
      if (phone) {
        if (/^1(3|4|5|7|8)\d{9}$/.test(phone)) {
          this.phoneMessage = "";
          this.phoneNumber = phone;
        } else {
          this.phoneMessage = "您输入的手机号码有误";
        }
      } else {
        this.phoneMessage = "输入的手机号不能为空";
      }
    },
    // 根据手机号进行身份认证
    estateVerify() {
      if (this.phoneNumber == "") {
        Toast.fail("请输入手机号");
        return;
      }
      let _this = this;
      console.log(this.phoneNumber);
      this.$wxRequest
        .post({
          url: "/public/Dverify/checked",
          data: {
            phone: _this.phoneNumber,
            userId: this.userID == undefined ? "6" : this.userID,
          },
        })
        .then((res) => {
          if (res.data.code == "20001") {
            Toast.fail(res.data.message);
          } else if (res.data.code == "20000") {
            Toast.success(res.data.message);
            let url = "../propInformation/main?phone=" + this.phoneNumber;
            mpvue.navigateTo({ url });
          }
        });
    },
  },
};
</script>

<style scoped>
.fieldSize {
  margin: 20% 5% 20%;
}
.tip {
  color: red;
  font-size: 12px;
  padding: 8px;
}
</style>
>
