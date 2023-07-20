<template>
  <div id="app">
    <div id="v-idle" style="display: none">
      <!-- :duration in seconds-->
      <v-idle
        @idle="onIdle"
        :events="['mousemove', 'keypress', 'ontouchstart', 'onclick']"
        :loop="true"
        :duration="duration"
      />
    </div>

    <Header v-if="['/'].indexOf($route.path) < 0" />

    <main class="site-main">
      <router-view></router-view>
    </main>
    <!-- {{$route}} -->
  </div>
</template>

<script>
import {CountryService, LanguageService, TokenService} from '@/services/storage.service'
import i18n from '@/plugins/i18n'

import { Slide } from 'vue-burger-menu' // import the CSS transitions you wish to use, in this case we are using `Slide`
import Header from '@/components/partials/header.vue'

export default {
  components: {
    Header,
    Slide,
  },
  name: 'app',
  data () {
    return {
      duration: 60 * 10,
    }
  },
  created () {
    let elem = document.getElementById('loader')
    elem.remove()
  },
  watch: {
    $route (to, from) {
      // console.log(to.path)
    },
  },
  computed: {
    siteURL () {
      return window.location.host
    },
    languageVal () {
      return localStorage.getItem('language')
    },
  },
  beforeMount () {
    let lang = LanguageService.getLanguage()
    console.log('Selected Language: ', { lang })

    if (!lang) {
      this.changeLanguage({
        flag: 'us',
        language: 'en',
        lang: 'eng',
        lang_id: 1,
        title: 'English'
      },
      { brij_lang_id: 1, iso_2: 'en' }
      )
    }

    this.showLoading()
    Promise.all(
      [
        this.$store.dispatch('fetchGlobalOptions'),
        // this.$store.dispatch('fetchBrijBanners'),
        this.$store.dispatch('fetchBrijCinemasAndCountries'),
        this.$store.dispatch('fetchNowShowing'),
        // this.$store.dispatch('fetchUpcoming'),
        // this.$store.dispatch('fetchExperienceFormat'),
      ]
        .map(
          p => p
            .then((value) => ({ status: 'fulfilled', value }))
            .catch((reason) => {
              console.log({ status: 'rejected', reason })
              return { status: 'rejected', reason }
            })
        )
    )
      .finally(() => {
        this.hideLoading()
      })

    let version = localStorage.getItem('version')

    if (version && ['1'].includes(version)) {
      console.log({ version })
    } else {
      // localStorage.clear()
      localStorage.setItem('version', '1')
      // setTimeout(() => { window.location.reload() }, 80)
    }
  },
  mounted () {
    let lang = LanguageService.getLanguage()
    console.log('Selected Language: ', { lang })
    this.$cookie.set('language_id', lang.language)
    window.localStorage.setItem('language_id', lang.language)
    const x = document.getElementsByTagName('body')[0]

    if (lang.language == 'ar') {
      x.classList.add('direction-rtl')
    } else {
      x.classList.remove('direction-rtl')
    }

    i18n.locale = lang.language
  },
  methods: {
    onIdle () {
      function sleep (n = 50) { return new Promise(resolve => setTimeout(resolve, n)) }

      this.$router.push({ path: '/' })

      sleep(200)
        .finally(() => {
          window.location.reload()
        })
    },
    changeLanguage: function (language, brij_lang = {}) {
      LanguageService.saveLanguage(language, brij_lang)

      this.$cookie.set('language_id', language.language)
      window.localStorage.setItem('language_id', language.language)
      const x = document.getElementsByTagName('body')[0]

      if (language.language == 'ar') {
        x.classList.add('direction-rtl')
      } else {
        x.classList.remove('direction-rtl')
      }

      i18n.locale = language.language
    },
  },
}
</script>

<style>
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
