// pages/chest/chest.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    loading: true,
    tag: '',
    tagInInput: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '宝箱查询'
    })
    wx.showLoading({
      title: '加载中',
    })
    wx.getStorage({
      key: 'tag',
      success: (res) => {
        console.log(res);
        this.setData({
          tag: res.data
        });
        this.getChest();
      },
      fail: () => {
        this.setData({
          loading: false
        });
        wx.hideLoading();
      }
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  confirmTag: function() {
    wx.setStorage({
      key: 'tag',
      data: this.data.tagInInput
    });
    this.setData({
      tag: this.data.tagInInput
    });
    this.getChest();
  },

  tagInput: function(e) {
    this.setData({
      tagInInput: e.detail.value
    });
    console.log(this.data);
  },

  changeTag: function() {
    this.setData({
      tag: ''
    });
  },

  getChest: function() {
    this.setData({
      loading: true
    });
    wx.showLoading({
      title: '玩命加载中...',
    });
    wx.request({
      method: 'GET',
      url: `https://crapi.xysdavid.cn/crapi/player/${this.data.tag}/chests`,
      dataType: 'json',
      success: (response) => {
        var data = response.data;

        console.log(data);
        wx.hideLoading();

        var futureChest = [{
          type: 'epic',
          count: data.epic
        }, {
          type: 'giant',
          count: data.giant
        }, {
          type: 'legendary',
          count: data.legendary
        }, {
          type: 'magical',
          count: data.magical
        }, {
          type: 'supermagical',
          count: data.superMagical
        }].sort((a, b) => {
          if (a.count == 0) return 1;
          if (b.count == 0) return 0;
          return a.count - b.count;
        });

        console.log(futureChest);

        this.setData({
          chest: data.upcoming,
          futureChest: futureChest,
          loading: false
        });
      }
    })
  }
})