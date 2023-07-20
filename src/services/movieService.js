import Api from './Api'

export default {
  getMovieDetails (payload) {
    return Api().post('/getMovieDetails', payload)
  },
  getMoviesList (payload) {
    return Api().post('/getSchedules', payload)
  }
}
