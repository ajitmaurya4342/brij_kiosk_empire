import moment from 'moment'
import Vue from 'vue'
import CryptoJS from 'crypto-js'

export const getOptions = (url, method, token, payload, direct) => {
  // if((url.search('ticketak') == -1 || url.search('gogo') == -1) && direct){
  //     url = 'http://api.ticketak.com' + url
  // }

  let options = {
    method: method || 'GET',
    url: url,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  }
  if (token) {
    options.headers.Authorization = token
  }

  // if (token) {
  //     options.headers['Authorization'] = `Bearer ${token}`
  // }

  if (method == 'GET' && payload) {
    options['params'] = payload
  }

  if (payload) {
    options['method'] = method || 'POST'
    options['data'] = payload
  }
  return options
}

export const getCurrentDate = () => {
  const dateTime = new Date()
  const date = dateTime.getDate()
  const month = dateTime.getMonth() + 1 // increment month by 1
  const year = dateTime.getFullYear()
  return year + '/' + month + '/' + date
}

export const formatDate = Vue.filter('formatDate', function (value) {
  if (value) {
    return moment(String(value)).format('MMMM Do YYYY, h:mm:ss a')
  }
})

export const decodeFrontUserToken = (token) => {
  // console.log("here Front token >>", token)
  return JSON.parse(
    CryptoJS.AES.decrypt(token, 'HereIsTheMyEncryptedCryptoSecretLOL').toString(
      CryptoJS.enc.Utf8
    )
  )
}

// Pratik

export const getListByKeyName = async (list = [], key = null) => {
  let promises = list.map((x) => {
    return key ? x[key] : x
  })
  return Promise.all(promises)
}

export const getUniques = (list) =>
  new Promise((resolve, reject) => resolve([...new Set(list) ]))

export const getArrayListByKey = (response = null, key = null) => {
  return new Promise(async (resolve, reject) => {
    if (
      response &&
      response['Shows'] &&
      Array.isArray(response['Shows']) &&
      response['Shows'].length
    ) {
      let list = await getListByKeyName(response.Shows[0].show, key)
      resolve(await getUniques(list.length ? list.flat() : []))
    } else {
      resolve([])
    }
  })
}

export const dateSort = (dateList, dateFormat) => {
  let promises = dateList.sort(function (a, b) {
    return moment(b).format(dateFormat) - moment(a).format(dateFormat)
  })
  return Promise.all(promises)
}

export const getMovieDateList = (response = null, key = null) => {
  return new Promise(async (resolve, reject) => {
    if (
      response &&
      response['Shows'] &&
      Array.isArray(response['Shows']) &&
      response['Shows'].length
    ) {
      if (response.Shows[0]['show'] && response.Shows[0].show.length) {
        let array = []
        let promises = response.Shows[0].show.map(async (x) => {
          let moviedates = await getListByKeyName(x.moviedates, key)
          array = array.concat(moviedates.length ? moviedates.flat() : [])
          return x
        })
        await Promise.all(promises)
        resolve(await getUniques(array))
      }
    } else {
      resolve([])
    }
  })
}

export const countries = {
  DEFAULT: {
    min: 0,
    max: 11,
  },
  IN: {
    dialCode: 91,
    min: 10,
    max: 10,
  },
  SA: {
    dialCode: 966,
    min: 9,
    max: 9,
  },
  LEB: {
    dialCode: 961,
    min: 7,
    max: 7,
  },
  IR: {
    dialCode: 964,
    min: 10,
    max: 10,
  },
}
