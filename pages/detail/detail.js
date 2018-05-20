// pages/detail/detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      id: options.id
    })

    this.getNewsDetail()
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {
    this.getNewsDetail(() => {
      wx.stopPullDownRefresh()
    })
  },

  /* 获取新闻详细页面 */
  getNewsDetail(callback) {
    wx.request({
      url: 'https://test-miniprogram.com/api/news/detail',
      data: {
        id: this.data.id
      },
      success: res => {
        let result = res.data.result
        this.setNewsDetail(result)
      },
      complete: () => {
        callback && callback()
      }
    })
  },

  /* 设置新闻详细页面的内容 */
  setNewsDetail(result) {
    console.log(result)
  }
})