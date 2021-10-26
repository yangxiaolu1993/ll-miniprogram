// logs.ts
// const util = require('../../utils/util.js')
import { formatTime } from '../../utils/util'

const app = getApp<IAppOption>()

Page({
  data: {
    logs: [],
  },
  onLoad() {
    this.setData({
      logs: (wx.getStorageSync('logs') || []).map((log: string) => {
        return {
          date: formatTime(new Date(log)),
          timeStamp: log
        }
      }),
    })

    // 触发 changeStatus 事件
    app.globalData.event.emit('changeStatus', 111)
  },
})
