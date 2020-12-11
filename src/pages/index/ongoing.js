/*
 * @Author: Felix
 * @Email: felix@qingmaoedu.com
 * @Date: 2020-12-11 09:17:51
 * @LastEditTime: 2020-12-11 09:18:02
 * @FilePath: /mp-driver/src/pages/index/ongoing.js
 * @Copyright © 2019 Shanghai Qingmao Network Technology Co.,Ltd All rights reserved.
 */
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
        maxCount: 4,
      };
    },
    methods: {
      articleDetail() {},
      courseDetail() {},
    },
  
    created() {
      // let app = getApp()
    },
  };