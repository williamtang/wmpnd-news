//index.js
//获取应用实例
const app = getApp()

const newsTypeMap = ["gn","gj","cj","yl","js","ty","other"]

Page({
  data: {
    winWidth: 0,
    winHeight: 0,
    currentTab: 0,
    firstImage: "",
    newsItems:[1,2,3,4],
    newsType: "gn",
    navBar: ['国内', '国际', '财经', '娱乐', '军事', '体育', '其他']
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

    this.getNewsLists()
  },
  onPullDownRefresh() {
    this.getNewsLists(() => {
      wx.stopPullDownRefresh()
    })
  },

  /* 点击tab切换页面 */
  changeTabBar: function(e) {
    var that = this;
    if (this.data.currentTab === e.target.dataset.current) {
      // console.log(this.data.currentTab)
      that.setData({
        newsType: newsTypeMap[this.data.currentTab]
      })
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current,
        newsType: newsTypeMap[e.target.dataset.current]
      })

      // console.log(newsTypeMap[this.data.currentTab])
    }

    this.getNewsLists()
  },

  /* 获得国内头条新闻背景图片 */
  getNewsLists(callback) {
    console.log(newsTypeMap[this.data.currentTab])
    wx.request({
      url: 'https://test-miniprogram.com/api/news/list',
      data: {
        type: this.data.newsType
      },
      success: res => {
        let result = res.data.result
        this.setNews(result)
      },
      complete: () => {
        callback && callback()
      }
    })
  },
  setNews(result) {
    // console.log(result)

    let firstImage = result[0].firstImage
    // console.log(firstImage)

    let newsItems = []
    for (let i = 0; i < result.length; i++) {
      let strDate = new Date(result[i].date);
      newsItems.push({
        date: `${strDate.getHours()}:${strDate.getMinutes()}`,
        title: result[i].title,
        source: result[i].source || "未知来源",
        picPath: result[i].firstImage,
        id: result[i].id
      })
    }

    this.setData({
      firstImage,
      newsItems
    })
  },

  /* 打开新闻详细内容 */
  onTapDetailContent: function(event) {
    console.log(event.currentTarget.dataset.newsid)
    wx.navigateTo({
      url: '/pages/detail/detail?id=' + event.currentTarget.dataset.newsid
    })
  }
})
