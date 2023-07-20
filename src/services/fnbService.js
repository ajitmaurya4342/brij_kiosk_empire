import Api from './Api'

export default {
  getFnbDetails (payload) {
    return Api().post('/getFNBItems', payload)
  },
  bookfnb (payload) {
    return Api().post('/bookFNB', payload)
  }
}
