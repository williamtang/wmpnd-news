//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    winWidth: 0,
    winHeight: 0,
    currentTab: 0
  },

  onLoad: function() {
    var that = this;

    wx.getSystemInfo({
      success: function(res) {
        that.setData({
          winWidth: res.windowWidth, 
          winHeight: res.windowHeight
        })
      },
    })
  },

  /* 点击tab切换页面 */
  changeTabBar: function(e) {
    var that = this;
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current
      })
    }
  }
})
