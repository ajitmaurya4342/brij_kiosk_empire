import axios from 'axios'
import { getOptions } from './collection'
import { URL_BASE } from './constant'
import {BASEURL_BRIJ } from '../config'

import {
  LanguageService,
  CountryService,
  TokenService,
} from '@/services/storage.service'

export const makeRequest = (
  endpoint,
  method = null,
  token = null,
  data = {}
) => {
  if (!token) {
    token = TokenService.getToken()
  }
  let payload = {}
  Object.assign(payload, data)
  let url = URL_BASE + endpoint
  let language = LanguageService.getLanguage()
  let country = CountryService.getCountry()
  if (language == null) {
    language = {
      lang_id: 2,
    }
  }
  if (!country) {
    country = {}
    country['CountryID'] = 230
  }
  let position = JSON.parse(window.localStorage.getItem('Geolocation'))
  if (position) {
    payload['Latitude'] = position.latitude
    payload['Longitude'] = position.longitude
  } else {
    payload['Latitude'] = -1
    payload['Longitude'] = -1
  }

  let preimere = window.localStorage.getItem('PREIMERE')
  // premiere type
  if (preimere == true || preimere == 'true') {
    payload['CinemaType'] = 'premiere'
  } else {
    payload['CinemaType'] = 'normal'
  }
  payload['LanguageID'] = language.lang_id || 2
  payload['CountryID'] = country.CountryID
  // console.log('payload :', payload);
  // if (endpoint == '/SNGetSeatLayout') {
  //   url = 'http://api2.ticketak.com/SNGetSeatLayout'
  //   payload = { SchID: 493, RequiredSeats: 2, LanguageID: 2, CountryID: 230 }
  // }

  if (country['CountryID'] == 190) {
    url = 'https://api-ksa.lb.empirecinemas.com' + endpoint
  }
  if (endpoint == '/Payment') {
    url = 'http://empireapi.binarynumbers.io/ProcessPayment'
    payload = {
      ReserveID: '1551543665',
      PaymentID: '2',
      ApiCallURL: '',
      SucessUrl: '',
      FailUrl: '',
    }
  }
  if (endpoint == 'https://empireapi.binarynumbers.io/GetFnBItems') {
    url = 'https://empireapi.binarynumbers.io/GetFnBItems'
  }
  const options = getOptions(url, method, token, payload)
  return new Promise((resolve, reject) => {
    axios(options)
      .then((res) =>
        resolve({
          error: false,
          res: res,
        })
      )
      .catch((error) => {
        reject({
          error: error,
          res: null,
        })
      })
  })
}

export const makeRequestBrij = (
  endpoint,
  method = null,
  token = null,
  data = {}
) => {
  if (!token) {
    token = TokenService.getBrijToken()
  }
  let payload = {}
  Object.assign(payload, data)
  let url = BASEURL_BRIJ + endpoint
  let country = CountryService.getCountry()

  if (country) {
    payload['country_id'] = country.country_id
  }

  let cinema = JSON.parse(localStorage.getItem(`brij_cinema`))
  if (cinema && endpoint != '/api/external/cinemas') payload.cinema_id = cinema.cinema_id

  const options = getOptions(
    url,
    method,
    !!payload && payload.hasOwnProperty('skipToken') && payload.skipToken === true
      ? null
      : token,
    payload,
  )

  return new Promise((resolve, reject) => {
    axios(options)
      .then((res) =>
        resolve({
          error: false,
          res: res,
        })
      )
      .catch((error) => {
        reject({
          error: error,
          res: null,
        })
      })
  })
}

// export const makeRequestDirect = (endpoint, method = null, token = null, data = null) => {
//   // const url = URL_BASE + endpoint;
//   const url = 'http://api.ticketak.com' + endpoint
//   const options = getOptions(url, method, token, data)
//   return new Promise((resolve, reject) => {
//     axios(options)
//       .then(res => resolve({ error: false, res: res }))
//       .catch(error => {
//         reject({ error: true, res: null })
//       })
//   })
// }
