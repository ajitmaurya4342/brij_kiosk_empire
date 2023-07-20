<template>
  <div class="kiosk-welcome" style="flex-direction: column">
    <div class="mt-5">
      <div class="h3 mb-5">
        <div class="mb-4">
        </div>
        <div>
          <span class="font-weight-bold">PLEASE SELECT CINEMA</span>
        </div>
      </div>

      <div class="d-flex align-items-center justify-content-between" style="flex-wrap: wrap;">
        <div
          v-for="(cinema, Index) in getBrijCinemas"
          :key="Index"
          class="btn-round m-4"
          @click="saveSelectedCinemaBrij(cinema)"
        >
          <div class="btn-content" style="cursor: pointer">
            <div>
              <span :style="{
                color: getSelectedBrijCinemas && cinema.cinema_name == getSelectedBrijCinemas.cinema_name
                ? '#c0112e'
                : undefined
              }">
                {{ cinema.cinema_name }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <input v-on:click="onClickHome()" type="submit" class="btn-success btn-lg ml-4" :value="$tc('Confirm')"/>
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
    saveSelectedCinemaBrij (cinema) {
      console.log(cinema.cinema_name, {cinema})
      if (cinema && cinema.cinema_id == '') {
        Vue.localStorage.remove('brij_cinema')
      } else {
        Vue.localStorage.set('brij_cinema', JSON.stringify(cinema))
        this.$store.commit('SET_BRIJ_SELECTED_CINEMA', cinema)
      }
    },
    onClickHome: function () {
      this.$router.push({
        path: '/'
      })
    },
  },
}
</script>
