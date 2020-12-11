import { requestUrl } from "../../config/options"
const host = process.env.NODE_ENV == "development" ? "http://localhost:3000/v1.0" : requestUrl;
function request(url, method, data, header = {}) {
  wx.showLoading({
    title: "加载中",
  });
  return new Promise((resolve, reject) => {
    wx.request({
      url: host + url,
      method: method,
      data: data,
      headers: {
        "content-type": "application/json",
      },
      success: function (res) {
        wx.hideLoading();
        resolve(res, data);
      },
      fail: function (res) {
        wx.hideLoading();
      },
      complete: function () {
        wx.hideLoading();
      },
    });
  });
}

function get(obj) {
  return request(obj.url, "GET", obj.data);
}

function post(obj) {
  return request(obj.url, "POST", obj.data);
}

export default {
  request,
  get,
  post,
  host,
};
