<template>
  <div v-if="experienceListData.length > 0">
    <Navigation
      :isHeaderId="headerExpId"
      :headerExpArry="experienceListData"
      @changeHeaderExp="ChangeExp($event)"
      :key="componentKeyBanner"
    />
    <div class="container cinema-exp">
      <div class="content-box pt-4">
        <div class="main-heading">
          <div>
            <hr class="primary-line" />
          </div>
          <div class="title">
            {{ allLanguageData.WhatIs }} {{ headerExpName }}
          </div>
        </div>
        <div class="content mb-4">
          <div class="content-title my-3">
            {{ headerHeadingName }}
          </div>
          <div v-html="headerDescName" class="content-desc"></div>
        </div>
        <div class="row content video-box mx-0 pt-1">
          <div class="col-md-8 px-0 order-2 order-md-1 emp-bgblack">
            <iframe
              width="100%"
              height="315"
              :src="
                'https://www.youtube.com/embed/' +
                  headerTrailName +
                  '?controls=0'
              "
              title="YouTube video player"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
            ></iframe>
          </div>
          <div class="col-md-4 px-0 video-content py-4 px-3 order-1 order-md-2">
            <div class="px-lg-5">
              <div class="mb-lg-4 quote-start">
                <img
                  src="@/assets/img/new-img/svg-img/quote.svg"
                  width="50px"
                />
              </div>
              <div class="mb-0 text" style="line-height:1.25;">
                {{ allLanguageData.ExpCinemaSpace }}
              </div>
              <div class="mt-lg-4 quote-end">
                <img
                  src="@/assets/img/new-img/svg-img/quote.svg"
                  width="50px"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="content-box pt-4">
        <div class="content mb-4">
          <div class="content-desc mt-2 pt-1">
            <!-- <div class="mt-3">
              <ul class="px-3">
                <li>
                  when an unknown printer took a galley of type and scrambled it
                  to make a type specimen book.
                </li>
                <li>
                  when an unknown printer took a galley of type and scrambled it
                  to make a type specimen book.
                </li>
                <li>
                  when an unknown printer took a galley of type and scrambled it
                  to make a type specimen book.
                </li>
                <li>
                  when an unknown printer took a galley of type and scrambled it
                  to make a type specimen book.
                </li>
              </ul>
            </div> -->
            <div class="mt-3" v-if="experienceMovieListData.length > 0">
              <div class="content-title">filter by</div>
              <div class="filter-dropdown row mx-0 my-3">
                <div
                  v-if="selectedCinemaValues.length > 0"
                  class="col-md-3 col-lg-3 px-0 pr-md-2 mb-3"
                >
                  <multiselect
                    disabled
                    v-model="selectedCinemaValues"
                    :options="cinemaList"
                    :multiple="true"
                    :close-on-select="false"
                    :clear-on-select="false"
                    :preserve-search="true"
                    placeholder="Select Cinema"
                    label="CinemaName"
                    track-by="CinemaID"
                    class="custom-multiselect screen-multiselect"
                    :select-label="''"
                    :deselect-label="''"
                    :selectedLabel="''"
                  >
                    <template
                      slot="selection"
                      slot-scope="{ values, search, isOpen }"
                    >
                      <span
                        class="multiselect__single"
                        v-if="values.length>1 && values.length &amp;&amp; !isOpen"
                        >{{ values.length }} Cinemas</span
                      >
                      <span
                        class="multiselect__single"
                        v-else-if=" values.length &amp;&amp; !isOpen"
                        >{{ values[0].CinemaName }}</span
                      >
                    </template>
                  </multiselect>
                  <!-- <b-dropdown
                    variant="default"
                    class="quickbook-dropdown"
                    text="Select Location"
                  >
                    <b-dropdown-item v-for="(data, Index) in 10" :key="Index"
                      >Cinema One</b-dropdown-item
                    >
                  </b-dropdown> -->
                </div>
                <div class="col-md-3 col-lg-3 px-0 pr-md-2 mb-3">
                  <multiselect
                    class="custom-multiselect scroll-dropdown screen-multiselect"
                    v-model="selectedExpValues"
                    :options="AllGenresArray"
                    :multiple="true"
                    :close-on-select="false"
                    :clear-on-select="false"
                    :preserve-search="true"
                    placeholder="Select Genre"
                    label="Genre"
                    track-by="GenreID"
                    :select-label="''"
                    :deselect-label="''"
                    :selectedLabel="''"
                  >
                    <template
                      slot="selection"
                      slot-scope="{ values, search, isOpen }"
                      ><span
                        class="multiselect__single"
                        v-if="values.length &amp;&amp; !isOpen"
                        >{{ values.length }} Genre</span
                      ></template
                    >
                  </multiselect>
                  <!-- <b-dropdown
                    variant="default"
                    class="quickbook-dropdown"
                    text="Genre"
                  >
                    <b-dropdown-item v-for="(data, Index) in 10" :key="Index"
                      >Cinema One</b-dropdown-item
                    >
                  </b-dropdown> -->
                </div>
                <div class="col-md-3 col-lg-3 px-0 pr-md-2">
                  <multiselect
                    v-model="selectedShowTimes"
                    :options="All_languagesArray"
                    :multiple="true"
                    :close-on-select="false"
                    :clear-on-select="false"
                    :preserve-search="true"
                    placeholder="Select Language"
                    label="LanguageName"
                    track-by="LanguageID"
                    class="custom-multiselect scroll-dropdown screen-multiselect"
                    :select-label="''"
                    :deselect-label="''"
                    :selectedLabel="''"
                  >
                    <template
                      slot="selection"
                      slot-scope="{ values, search, isOpen }"
                      ><span
                        class="multiselect__single"
                        v-if="values.length &amp;&amp; !isOpen"
                        >{{ values.length }} Language</span
                      ></template
                    >
                  </multiselect>
                  <!-- <b-dropdown
                    variant="default"
                    class="quickbook-dropdown"
                    text="Language"
                  >
                    <b-dropdown-item v-for="(data, Index) in 10" :key="Index"
                      >Cinema One</b-dropdown-item
                    >
                  </b-dropdown> -->
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="content">
        <MovieSlider
          class="my-4"
          bgcolor="emp-bgsecondary"
          oppbgcolor="emp-bgprimary"
          movieIndex="showmovies"
          booknow="true"
          :key="componentKeySlider"
          v-if="experienceMovieListData && experienceMovieListData.length > 0"
          :moviesArray="experienceMovieListData"
        />
      </div>
    </div>
  </div>
</template>
<script>
import MovieSlider from '@/components/partials/movieSlider.vue'
import Navigation from '@/components/pages/experience/expnavigation.vue'
import { makeRequest } from '@/helper/internet.js'
import { mapState, mapGetters, mapActions } from 'vuex'
import {
  LanguageService,
  CountryService,
  TokenService,
} from '@/services/storage.service'
import { metaInfo, URL_BASE } from '@/helper/constant.js'

export default {
  components: {
    MovieSlider,
    Navigation,
  },
  mounted () {
    let language = LanguageService.getLanguage()
    if (!language) {
      this.LanguageID = 2
    } else {
      this.LanguageID = language.lang_id
    }
    // this.handleResize();
    let lang = LanguageService.getLanguage()
    if (lang == null) {
      this.langName = 'eng'
    } else {
      this.langName = lang['lang']
    }
  },
  beforeMount () {
    // this.headerExpId = this.$route.params.expID;
    // this.headerExpName = this.$route.params.expName;
    this.componentKeyBanner = this.componentKeyBanner + 1
    this.getExperienceList()
    this.fetchCinemaList()
  },
  data () {
    return {
      componentKeyBanner: 0,
      URL_BASE: URL_BASE + '/',
      showExpBanners: [],
      filteredExpArray: [],
      selectedExpValues: [],
      selectedShowTimes: [],
      filteredTimesArray: [],
      All_languagesArray: [],
      AllGenresArray: [],
      filteredCinamaArray: [],
      selectedCinemaValues: [],
      cinemaList: [],
      experienceListData: [],
      experienceMovieListData: [],
      headerExpId: '',
      headerExpName: '',
      headerHeadingName: '',
      headerDescName: '',
      headerTrailName: '',
      componentKeySlider: 0,
      hideCinemaFilter: false,
    }
  },
  watch: {
    selectedCinemaValues: {
      handler: function (newVal, oldVal) {
        this.hideLoading()
        if (this.selectedCinemaValues.length > 0) {
          this.filteredCinamaArray = []
          for (let p = 0; p < this.selectedCinemaValues.length; p++) {
            if (this.selectedCinemaValues[p].CinemaID == 'ALL') {
              this.filteredCinamaArray = []
              this.selectedCinemaValues = []
            } else {
              this.filteredCinamaArray.push(
                this.selectedCinemaValues[p].CinemaID
              )
            }

            console.log('jiyu')
          }
          this.getMoviesByFormat()
        } else {
          this.filteredCinamaArray = []
          this.getMoviesByFormat()
        }
      },
      deep: true,
    },
    selectedExpValues: {
      handler: function (newVal, oldVal) {
        this.hideLoading()
        if (this.selectedExpValues.length > 0) {
          this.filteredExpArray = []
          for (let p = 0; p < this.selectedExpValues.length; p++) {
            this.filteredExpArray.push(this.selectedExpValues[p].GenreID)
          }
          this.getMoviesByFormat()
        } else {
          this.filteredExpArray = []

          this.getMoviesByFormat()
        }
      },
      deep: true,
    },
    selectedShowTimes: {
      handler: function (newVal, oldVal) {
        this.hideLoading()
        if (this.selectedShowTimes.length > 0) {
          this.filteredTimesArray = []
          for (let p = 0; p < this.selectedShowTimes.length; p++) {
            this.filteredTimesArray.push(this.selectedShowTimes[p].LanguageID)
          }
          this.getMoviesByFormat()
        } else {
          this.filteredTimesArray = []

          this.getMoviesByFormat()
        }
      },
      deep: true,
    },
    headerCinemaId: {
      handler: function (newVal, oldVal) {
        // let obj = this.cinemaList.filter(y => {
        //   return y.CinemaID == this.headerCinemaId;
        // });

        // if (obj.length > 0) {
        //   this.filteredCinamaArray = [];

        // }
        this.selectedCinemaValues = []

        let obj = this.cinemaList.filter(y => {
          return y.CinemaID == this.headerCinemaId
        })
        if (obj.length > 0) {
          this.selectedCinemaValues.push(...obj)
          this.hideCinemaFilter = true
        } else {
          this.hideCinemaFilter = false
        }
      },
      deep: true,
    },
  },
  computed: {
    headerCinemaId () {
      return this.$store.state.headerCinemaStore.headerCinemaId
    },
  },
  methods: {
    fetchCinemaList: function () {
      makeRequest('/GetCinemas', 'POST', null, null)
        .then(result => {
          const { error, res } = result
          const { data } = res.data
          if (res.data) {
            this.cinemaList = res.data.Categories

            let objcinemaAll = {
              CinemaName: 'ALL CINEMAS',
              CinemaID: 'ALL',
            }

            this.cinemaList.unshift(objcinemaAll)

            let obj = this.cinemaList.filter(y => {
              return y.CinemaID == this.headerCinemaId
            })
            if (obj.length > 0) {
              this.selectedCinemaValues.push(...obj)
              this.hideCinemaFilter = true
            }
          }
        })
        .catch(error => {
          console.log('Error on vue front', error)
        })
    },
    getMoviesByFormat () {
      this.hideLoading()
      this.showLoading()
      this.componentKeySlider += 1
      this.experienceMovieListData = []
      let payload = {
        Experience: this.headerExpName,
        ExperienceID: this.headerExpId,
        CinemaID: this.filteredCinamaArray,
        GenreID: this.filteredExpArray,
        MovieLanguageID: this.filteredTimesArray,
      }

      makeRequest('/GetMoviesByExperience/', 'POST', null, payload)
        .then(response => {
          const { error, res } = response
          this.hideLoading()
          if (res.data.hasOwnProperty('Shows') && res.data.Shows.length > 0) {
            this.experienceMovieListData = res.data.Shows[0].show
          }

          if (
            res.data.hasOwnProperty('AllGenres') &&
            res.data.AllGenres.length > 0
          ) {
            this.AllGenresArray = res.data.AllGenres
          }

          if (
            res.data.hasOwnProperty('All_languages') &&
            res.data.All_languages.length > 0
          ) {
            this.All_languagesArray = res.data.All_languages
          }

          this.hideLoading()
        })

        .catch(error => {
          this.hideLoading()
          console.log('Error', error)
        })
    },

    ChangeExp (headerExpId) {
      this.headerExpId = headerExpId
      let experienceDetailsAr = this.experienceListData.filter(x => {
        return x.ID == headerExpId
      })

      if (experienceDetailsAr.length > 0) {
        this.headerExpName = experienceDetailsAr[0].name
        this.headerHeadingName = experienceDetailsAr[0].heading
        this.headerDescName = experienceDetailsAr[0].description
        this.headerTrailName = experienceDetailsAr[0].trailer
        window.localStorage.setItem('EXPE', this.headerExpName)
        this.getMoviesByFormat()
      }
    },
    getExperienceList () {
      this.showLoading()
      this.experienceListData = []
      makeRequest('/GetExperience/', 'POST', null, null)
        .then(response => {
          const { error, res } = response
          if (
            res.data.hasOwnProperty('Categories') &&
            res.data.Categories.length > 0
          ) {
            this.experienceListData = res.data.Categories

            this.headerExpId = this.experienceListData[0].ID
            this.headerExpName = this.experienceListData[0].name
          }
          this.getMoviesByFormat()
          this.hideLoading()
        })

        .catch(error => {
          this.hideLoading()
          console.log('Error', error)
        })
    },
  },
}
</script>
<style></style>
