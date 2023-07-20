import Api from './Api'

export default {
  getSeatLayout (payload) {
    return Api().post('/getSeatLayout', payload)
  }
}
