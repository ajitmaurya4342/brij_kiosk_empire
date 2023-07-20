import Vue from 'vue'
import VueI18n from 'vue-i18n'
import languagesList from '@/helper/ln'

Vue.use(VueI18n)

const messages = {
  ...languagesList,
}

const i18n = new VueI18n({
  locale: 'en', // set locale
  fallbackLocale: 'en', // set fallback locale
  messages, // set locale messages,
  // silentTranslationWarn: true
})

export default i18n
