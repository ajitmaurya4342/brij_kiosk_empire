import Vue from 'vue'
import VueLocalStorage from 'vue-localstorage'
import {TOKEN} from '../config'

Vue.use(VueLocalStorage)

const TOKEN_KEY = 'access_token'
const COUNTRY = 'country'
const LANGUAGE = 'language'
/**
 * Manage the how Access Tokens are being stored and retreived from storage.
 *
 * Current implementation stores to localStorage. Local Storage should always be
 * accessed through this instace.
 **/
const TokenService = {
  getBrijToken () {
    return TOKEN
  },

  getToken () {
    return Vue.localStorage.get(TOKEN_KEY)
  },

  saveToken (accessToken) {
    Vue.localStorage.set(TOKEN_KEY, accessToken)
  },

  removeToken () {
    Vue.localStorage.remove(TOKEN_KEY)
  },
}

const LanguageService = {
  getLanguage () {
    let lang = JSON.parse(Vue.localStorage.get(LANGUAGE))
    if (!lang) return lang // intended dont change

    let brij_lang = JSON.parse(Vue.localStorage.get('brij_lang'))

    return Object.assign({}, lang, brij_lang)
  },

  saveLanguage (language, brij_lang = {}) {
    let brij_lang_local = JSON.parse(Vue.localStorage.get('brij_lang'))

    if (Object.keys(brij_lang).length === 0 && brij_lang_local) {
      Vue.localStorage.set('brij_lang', JSON.stringify(brij_lang_local))
    } else {
      Vue.localStorage.set('brij_lang', JSON.stringify(brij_lang))
    }

    Vue.localStorage.set(LANGUAGE, JSON.stringify(language))
  },

  removeLanguage () {
    Vue.localStorage.remove(LANGUAGE)
    Vue.localStorage.remove('brij_lang')
  },
}

const CountryService = {
  getCountry () {
    let country = JSON.parse(Vue.localStorage.get(COUNTRY))
    if (!country) return country // intended dont change

    let brij_country = JSON.parse(Vue.localStorage.get('brij_country'))

    return Object.assign({}, country, brij_country)
  },

  saveCountry (country, brij_country = {}) {
    let brij_country_local = JSON.parse(Vue.localStorage.get('brij_country'))

    if (Object.keys(brij_country).length === 0 && brij_country_local) {
      Vue.localStorage.set('brij_country', JSON.stringify(brij_country_local))
    } else {
      Vue.localStorage.set('brij_country', JSON.stringify(brij_country))
    }

    Vue.localStorage.set(COUNTRY, JSON.stringify(country))
  },

  removeCountry () {
    Vue.localStorage.remove(COUNTRY)
  },
}

const UserService = {

  getUserProfile () {
    try {
      return JSON.parse((Vue.localStorage.get('profile_detail')))
    } catch (e) {
      console.log('user parsing error', e)
      return null
    }
  },
}

export { TokenService, LanguageService, CountryService, UserService }
