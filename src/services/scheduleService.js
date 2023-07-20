import Api from './Api'

export default {
  getShowDates (payload) {
    return Api().post('/getDateList', payload)
  },
  getShowTimings (payload) {
    return Api().post('/getTimeList', payload)
  }
}
