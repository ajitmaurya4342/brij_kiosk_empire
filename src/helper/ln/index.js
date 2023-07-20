const files = require.context('.', false, /\.js$/)
const languagesList = {}

files.keys().forEach(key => {
  if (key === './index.js') return
  languagesList[key.replace(/(\.\/|\.js)/g, '')] = files(key).default
})

export default languagesList
