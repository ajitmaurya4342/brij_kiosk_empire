<template>
  <div class="kiosk-welcome" style="flex-direction: column">
    <div>
      <!-- <button v-b-modal.ruleOfCountry>click</button> -->
      <div class="h3 mb-5">
        <div class="mb-4">
          <span class="font-weight-bold">{{ $tc('welcome') }}</span>
        </div>
        <div>
          PLEASE SELECT YOUR
          <span class="font-weight-bold">PREFERRED LANGUAGE</span>
        </div>
      </div>

      <div class="d-flex align-items-center justify-content-between">
        <router-link
          to="select-option"
          @click.native="changeLanguage({
              flag: 'us',
              language: 'en',
              lang: 'eng',
              lang_id: 1,
              title: 'English'
          },
          { brij_lang_id: 1, iso_2: 'en' }
          )"
        >
          <div class="btn-round">
            <div class="btn-content">
              <div>ENGLISH</div>
            </div>
          </div>
        </router-link>
        <router-link
          to="select-option"
          @click.native="changeLanguage({
              flag: 'ar',
              language: 'ar',
              lang: 'ar',
              lang_id: 3,
              title: 'عربى'
          },
          { brij_lang_id: 3, iso_2: 'ar' }
          )"
        >
          <div class="btn-round">
            <div class="btn-content">
              <div>عربى</div>
            </div>
          </div>
        </router-link>
      </div>
    </div>

    <aside
      @dblclick="gotoSettingLogin"
      id="hidden-aside"
      class="hidden-block"
    />
  </div>
</template>
<script>

import {CountryService, LanguageService, TokenService} from '@/services/storage.service'
import languages from '@/helper/Languages'
import i18n from '@/plugins/i18n'
import Vue from 'vue'

export default {
  data () {
    return {
      languages,
    }
  },
  mounted () {
    let cinema = JSON.parse(localStorage.getItem(`brij_cinema`))

    if (!cinema && this.getBrijCinemas && this.getBrijCinemas[0]) {
      this.saveSelectedCinemaBrij(this.getBrijCinemas[0])
    }
  },
  computed: {
    getBrijCinemas () {
      return this.$store.getters.getBrijCinemas ? this.$store.getters.getBrijCinemas : []
    },
    getSelectedBrijCinemas () {
      return this.$store.getters.getSelectedBrijCinemas
    },
  },
  methods: {
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

      this.$forceUpdate()
    },

    saveSelectedCinemaBrij (cinema) {
      console.log(cinema.cinema_name, {cinema})
      if (cinema && cinema.cinema_id == '') {
        Vue.localStorage.remove('brij_cinema')
      } else {
        Vue.localStorage.set('brij_cinema', JSON.stringify(cinema))
        this.$store.commit('SET_BRIJ_SELECTED_CINEMA', cinema)
      }
    },
    gotoSettingLogin: function () {
      this.$router.push({
        path: '/settingsLogin',
      })
    }
  },
}
</script>
