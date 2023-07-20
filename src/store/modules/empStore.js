import Vue from 'vue'

import { makeRequest, makeRequestBrij } from '@/helper/internet.js'
import moment from 'moment'
import {CountryService, UserService} from '../../services/storage.service'

const state = {
  movieDetails: null,
  global_options: [],
  currency: {},
  kiosk_language: [],
  banners: [],
  brij_cinemas: [],
  brij_cinema: Vue.localStorage.get('brij_cinema') ? JSON.parse(Vue.localStorage.get('brij_cinema')) : {},
  brij_countries: [],

  nowShowing: {
    data: [],
  },
  upcoming: {
    data: [],
  },

  /* QUICK_BOOK */
  quickBookMovies: [],
  filteredQuickBookMovies: [],
  quickBookCinemas: [],
  quickBookDates: [],
  quickBookTimes: [],
  filteredQuickBookCinemas: [],

  /* Experience */
  experiences: [],

  /* user data */
  userHistory: [],
  userUnpaidHistory: [],
  userReservations: [],
  preferencesOptions: {
    cinema_list: [],
    fnb_items: [],
    format_list: [],
    language_list: [],
  },
}

const getters = {
  getFilterMovieDetails: state => state.movieDetails,
  getGlobalOptions: state => state.global_options,
  getGlobalCurrency: state => state.currency,
  getKiosLanguage: state => state.kiosk_language,
  getBanners: state => state.banners,
  getBrijCinemas: state => {
    let country = CountryService.getCountry()

    if (!country) return state.brij_cinemas

    return state.brij_cinemas.filter(c => c.country_id == country.country_id)
  },
  getSelectedBrijCinemas: state => state.brij_cinema,
  getBrijCountries: state => state.brij_countries,

  getNowShowing: state => state.nowShowing,
  getUpcoming: state => state.upcoming,

  getQuickBookMovies: state => state.quickBookMovies,
  getFilteredQuickBookMovies: state => state.filteredQuickBookMovies,
  getQuickBookDates: state => state.quickBookDates,
  getQuickBookTimes: state => state.quickBookTimes,
  // getQuickBookCinemas: state => state.quickBookCinemas,
  // getFilteredQuickBookCinemas: state => state.filteredQuickBookCinemas,,

  getExperiences: state => state.experiences,

  getUserHistory: state => state.userHistory,
  getUserUnpaidHistory: state => state.userUnpaidHistory,
  getUserReservations: state => state.userReservations,
  getPreferencesOptions: state => state.preferencesOptions,
}

const actions = {
  async onFilterSelect ({ commit }, { ...payload }) {
    await commit('ON_FILTER_SELECT', payload)
  },

  async fetchGlobalOptions ({ commit, dispatch }, payload) {
    try {
      let response = await makeRequestBrij('/global_options', 'GET', null, null)
      const { error, res } = response

      if (res.data.status) {
        await commit('SET_GLOBAL_OPTIONS', res.data.Records)
        await commit('SET_KIOSK_LANGUAGE', res.data.kiosk_language)

        const currency = res.data.Records.find(go => go.go_key === 'CURRENCY')
        if (currency) {
          dispatch('fetchCurrency', { curr_id: currency.go_value })
        }
      }
    } catch (error) {
      console.log('fetchGlobalOptions', { error })
      await commit('SET_GLOBAL_OPTIONS', [])
      await commit('SET_KIOSK_LANGUAGE', [])
    }
  },
  async fetchCurrency ({ commit, dispatch }, payload) {
    const { curr_id } = payload
    let response = await makeRequestBrij(`/api/external/currency/${curr_id}`, 'GET', null, null)
    const { error, res } = response

    if (res.data && res.data.status && res.data.Records) {
      commit(`SET_GLOBAL_CURRENCY`, res.data.Records)
    }
  },

  async fetchBrijBanners ({ commit }, payload) {
    try {
      let response = await makeRequestBrij('/api/cinema/banners', 'GET', null, null)
      const { error, res } = response

      if (res.data.status) {
        await commit('SET_BANNERS', res.data.Records)
      }
    } catch (error) {
      console.log('fetchBrijBanners', { error })
      await commit('SET_BANNERS', [])
    }
  },

  async fetchBrijCinemasAndCountries ({ commit }, payload) {
    try {
      let response = await makeRequestBrij('/api/external/cinemas', 'POST', null, {})
      const { error, res } = response

      if (res.data.status) {
        let { data } = res

        data.Records.forEach((c, i) => {
          c.view_url = c.map_view_url // ? c.map_view_url : `https://mapview.empirecinemas.com/Arar?v=${i}`
          c.gmap_url = c.google_map_embedded_url ? c.google_map_embedded_url : `https://maps.google.com/maps?q=${c.cinema_latitude},${c.cinema_longitude},${c.cinema_name}&t=&z=12&ie=UTF8&iwloc=&output=embed`
        })

        await commit('SET_BRIJ_COUNTRIES', data.country_list_array)
        await commit('SET_BRIJ_CINEMAS', data.Records)

        return data.Records
      }
    } catch (error) {
      console.log('fetchBrijCinemasAndCountries', { error })
      await commit('SET_BRIJ_COUNTRIES', [])
      await commit('SET_BRIJ_CINEMAS', [])

      return []
    }
  },

  async fetchNowShowing ({ commit }, payload) {
    let uniqueTodaysScreeningMovies = { data: [] }

    let req = { limit: 1000, currentPage: 1, skipToken: true }

    let cinema = JSON.parse(localStorage.getItem(`brij_cinema`))
    if (cinema) req.cinema_id = cinema.cinema_id

    let country = JSON.parse(localStorage.getItem(`brij_country`))
    if (country) req.country_id = country.country_id

    let city = JSON.parse(localStorage.getItem(`brij_city`))
    if (city) req.city_id = city.city_id

    try {
      let response = await makeRequestBrij('/api/cinema/admin/now-showing-confirmed-list', 'GET', null, req)
      const { error, res } = response

      if (res.data.status) {
        let { data } = res

        uniqueTodaysScreeningMovies = {
          ...data.Records,
          data: [
            ...new Map(
              data.Records.data.map((item) => [item['movie_id'], item])
            ).values(),
          ]
            .sort((a, b) => {
            // Turn your strings into dates, and then subtract them to get a value that is either negative, positive, or zero.
              let comparison =
              new Date(b.mrrdr_release_date || b.original_release_date) -
              new Date(a.mrrdr_release_date || a.original_release_date)

              if (comparison === 0) { comparison = b.ss_count - a.ss_count }

              return comparison
            })
        }

        await commit('SET_NOW_SHOWING', uniqueTodaysScreeningMovies)
      }

      return uniqueTodaysScreeningMovies
    } catch (error) {
      console.log('Erorr fetchNowShowing', { error })
      await commit('SET_NOW_SHOWING', uniqueTodaysScreeningMovies)

      return uniqueTodaysScreeningMovies
    }
  },

  async fetchUpcoming ({ commit }, payload) {
    let uniqueComingSoonMovies = { data: [] }

    let req = { limit: 1000, currentPage: 1, skipToken: true }

    let cinema = JSON.parse(localStorage.getItem(`brij_cinema`))
    if (cinema) req.cinema_id = cinema.cinema_id

    let country = JSON.parse(localStorage.getItem(`brij_country`))
    if (country) req.country_id = country.country_id

    let city = JSON.parse(localStorage.getItem(`brij_city`))
    if (city) req.city_id = city.city_id

    try {
      let response = await makeRequestBrij('/api/cinema/admin/upcoming-show-list', 'GET', null, req)
      const { error, res } = response

      if (res.data.status) {
        let { data } = res

        const uniqueComingSoonMovies = {
          ...data.Records,
          data: [
            ...new Map(
              data.Records.data.map((item) => [item['movie_id'], item])
            ).values(),
          ].reverse()
        }

        await commit('SET_UPCOMING', uniqueComingSoonMovies)
      }

      return uniqueComingSoonMovies
    } catch (error) {
      console.log('Erorr fetchUpcoming', { error })
      await commit('SET_UPCOMING', uniqueComingSoonMovies)

      return uniqueComingSoonMovies
    }
  },

  async QuickBook ({ commit, dispatch, state }, payload) {
    try {
      let response = await makeRequestBrij('/api/external/quick-book', 'POST', null, payload)

      const { error, res } = response

      if (res.data.status) {
        let { data } = res

        data.movies.forEach(m => {
          m.Title = m.movie_title
        })

        commit('SET_QUICK_BOOK_MOVIES', data.movies)
        commit('SET_FILTERED_QUICK_BOOK_MOVIES', data.movies)
        if (data.cinemas) {
          data.cinemas.forEach(c => {
            c.CinemaName = c.cinema_name
            c.CinemaID = c.cinema_id
          })

          commit('SET_QUICK_BOOK_CINEMAS', data.cinemas)
          commit('SET_FILTERED_QUICK_BOOK_CINEMAS', data.cinemas)
        }
        if (data.dates) {
          data.dates.forEach(d => {
            d.Title = d.movie_title
            d.CinemaName = d.cine_name
            d.ShowDate = moment(d.ss_start_date).format('DD-MM-YYYY')
          })

          commit('SET_QUICK_BOOK_DATES', data.dates)
        }
        if (data.times) {
          data.times.forEach(d => {
            d.Title = d.movie_title
            d.CinemaName = d.cine_name
            d.ShowDate = moment(d.ss_start_date).format('DD-MM-YYYY')
            d.ShowTime = d.ss_start_show_time
          })

          commit('SET_QUICK_BOOK_TIMES', data.times)
        }
      }
    } catch (error) {
      console.error(error)
    }
  },

  async fetchExperienceFormat ({ commit, dispatch, state }, payload) {
    try {
      let response = await makeRequestBrij('/api/admin/experience-format', 'GET', null, { limit: 1000, currentPage: 1 })

      const { error, res } = response

      if (res.data.status) {
        let { data } = res

        data.Records.data.forEach(e => {
          e.ID = e.movie_experience_id
          e.name = e.movie_experience

          try {
            e.translation_data = JSON.parse(e.translation_data)
          } catch (e) {
            console.log('translation_data parse error', e)
            e.translation_data = []
          }
        })

        commit('SET_EXPERIENCES', data.Records.data)
      }
    } catch (error) {
      console.error(error)
    }
  },

  async fetchUserHistory ({ commit, dispatch, state }, payload) {
    try {
      let response = await makeRequestBrij(`/api/cinema/user-history`, 'POST', null, { customer_id: payload })
      const { error, res } = response

      if (res.data.status) {
        let { data: resData } = res

        let { reserves, reservedUnpaidBookings, Records } = resData
        commit('SET_USER_HISTORY', Records || [])
        commit('SET_USER_UNPAID_BOOKINGS', reservedUnpaidBookings || [])
        commit('SET_USER_RESERVATIONS', reserves || [])
      }
    } catch (error) {
      console.error(error)
    }
  },

  async fetchBrijPrefOptions ({ commit, dispatch, state }, payload) {
    try {
      let payload = {}
      let user = UserService.getUserProfile()
      if (user && user.UserID) {
        payload.cust_id = user.UserID
      }
      let response = await makeRequestBrij(`/api/external/preferences-options`, 'POST', null, payload)
      const { error, res } = response

      if (res.data.status) {
        commit('SET_PREFERENCES_OPTIONS', {
          cinema_list: res.data.cinema_list,
          fnb_items: res.data.fnb_items,
          format_list: res.data.format_list,
          language_list: res.data.language_list,
        })
      }
    } catch (error) {
      console.error(error)

      commit('SET_PREFERENCES_OPTIONS', {
        cinema_list: [],
        fnb_items: [],
        format_list: [],
        language_list: [],
      })
    }
  },
}

const mutations = {
  ON_FILTER_SELECT: (state, payload) => {
    state.movieDetails = payload
  },
  SET_GLOBAL_OPTIONS: (state, payload) => {
    state.global_options = payload
  },

  SET_GLOBAL_CURRENCY: (state, payload) => (state.currency = payload),

  SET_BRIJ_COUNTRIES: (state, payload) => {
    state.brij_countries = payload
  },
  SET_BRIJ_CINEMAS: (state, payload) => {
    state.brij_cinemas = payload
  },
  SET_BRIJ_SELECTED_CINEMA: (state, payload) => {
    state.brij_cinema = payload
  },
  SET_BANNERS: (state, payload) => {
    state.banners = payload
  },
  SET_KIOSK_LANGUAGE: (state, payload) => {
    state.kiosk_language = payload
  },

  SET_NOW_SHOWING: (state, payload) => {
    state.nowShowing = payload
  },
  SET_UPCOMING: (state, payload) => {
    state.upcoming = payload
  },

  /* QUICK_BOOK */
  SET_QUICK_BOOK_MOVIES: (state, payload) => (state.quickBookMovies = payload),
  SET_FILTERED_QUICK_BOOK_MOVIES: (state, payload) => (state.filteredQuickBookMovies = payload),
  SET_QUICK_BOOK_CINEMAS: (state, payload) => (state.quickBookCinemas = payload),
  SET_QUICK_BOOK_DATES: (state, payload) => (state.quickBookDates = payload),
  SET_QUICK_BOOK_TIMES: (state, payload) => (state.quickBookTimes = payload),
  SET_FILTERED_QUICK_BOOK_CINEMAS: (state, payload) => (state.filteredQuickBookCinemas = payload),

  SET_EXPERIENCES: (state, payload) => (state.experiences = payload),

  SET_USER_HISTORY: (state, payload) => (state.userHistory = payload),
  SET_USER_UNPAID_BOOKINGS: (state, payload) => (state.userUnpaidHistory = payload),
  SET_USER_RESERVATIONS: (state, payload) => (state.userReservations = payload),
  SET_PREFERENCES_OPTIONS: (state, payload) => (state.preferencesOptions = payload),
}

export default { state, getters, actions, mutations }
