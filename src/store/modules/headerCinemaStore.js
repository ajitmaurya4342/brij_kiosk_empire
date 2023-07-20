const state = {
  headerCinemaId: window.localStorage.getItem('headerCinemaID')
    ? window.localStorage.getItem('headerCinemaID')
    : '',
  userLogedIn: false,
  homeMoviePopup: true,
  nowPlayingMovies: [],
}
const mutations = {
  increment (state) {
    state.headerCinemaId = window.localStorage.getItem('headerCinemaID')
  },
  storeLoginS (state) {
    state.userLogedIn = true
  },

  showHomeMoviePopUp (state) {
    state.homeMoviePopup = false
  },
}

const getters = {
  // getFilterMovieDetails: state => state.movieDetails
}

const actions = {
  //   async onFilterSelect({ commit }, { ...payload }) {
  //     await commit("ON_FILTER_SELECT", payload);
  //   }
}

export default { state, getters, actions, mutations }
