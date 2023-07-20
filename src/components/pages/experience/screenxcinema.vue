<template>
  <div v-if="getExperiencesBrij.length > 0">
    <Navigation
      :headerExpArry="getExperiencesBrij"
      @changeHeaderExp="getExperience($event)"
    />
    <div class="container cinema-exp">
      <div class="content-box pt-4">
        <div class="main-heading">
          <div>
            <hr class="primary-line" />
          </div>
          <div v-if="experience" class="title">{{ allLanguageData.WhatIs}} {{ experience.movie_experience }}</div>
        </div>
        <div class="content mb-4">
<!--          <div class="content-title my-3">-->
<!--            {{ experience.movie_experience }}-->
<!--          </div>-->
          <div v-html="experienceDesc" class="content-desc"></div>
        </div>
        <div class="row content video-box mx-0 pt-1 justify-content-center">
          <div class="col-md-8 px-0 order-2 order-md-1 emp-bgblack">
            <iframe
              width="100%"
              height="315"
              :src="
                'https://www.youtube.com/embed/' +
                  videoID +
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
              <div class="mb-0 text">{{allLanguageData.ExpCinemaSpace}}</div>
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
            <div
              class="mt-3"
            >
              <div class="content-title">filter by</div>
              <div class="filter-dropdown row mx-0 my-3">
                <div class="col-md-3 col-lg-3 px-0 pr-md-2 mb-3">
                  <multiselect
                    v-model="selectedCinemaValues"
                    :options="getBrijCinemas"
                    :multiple="true"
                    :close-on-select="true"
                    :clear-on-select="false"
                    :preserve-search="true"
                    placeholder="Select Cinema"
                    :custom-label="getCinemaTranslatedName"
                    track-by="CinemaID"
                    class="custom-multiselect scroll-dropdown screen-multiselect"
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
                        >{{ getCinemaTranslatedName(values[0]) || values[0].CinemaName }}</span
                      ></template
                    >
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
                    :options="getNowShowingGenre"
                    :multiple="true"
                    :close-on-select="true"
                    :clear-on-select="false"
                    :preserve-search="true"
                    placeholder="Select Genre"
                    label="GenreName"
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
                    v-model="selectedLang"
                    :options="getNowShowingLanguages"
                    :multiple="true"
                    :close-on-select="true"
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
        bgcolor="emp-bgprimary"
        oppbgcolor="emp-bgsecondary"
        movieIndex="showmovies"
        booknow="true"
        :key="componentKeySlider"
        v-if="getMovies && getMovies.length > 0"
        :moviesArray="getMovies"
      />
      </div>
    </div>
  </div>
</template>
<script>
import MovieSlider from '@/components/partials/movieSlider.vue'
import Navigation from '@/components/pages/experience/expnavigation.vue'
import {makeRequest, makeRequestBrij} from '@/helper/internet.js'
import {LanguageService} from '@/services/storage.service'
import Vue from 'vue'

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
    this.headerExpId = this.$route.params.expID
    this.headerExpName = this.$route.params.expName
    this.getExperience(this.headerExpId)

    // this.getExperienceList()
    // this.fetchCinemaList()
  },
  data () {
    return {
      experience: null,
      experienceDesc: '',
      videoID: '',
      showExpBanners: [],
      filteredExpArray: [],
      selectedExpValues: [],
      selectedLang: [],
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
  computed: {
    getNowShowingLanguages () {
      let nowShowing = this.$store.getters.getNowShowing.data || []
      // let upcoming = this.$store.getters.getUpcoming.data || []
      let langs = [
        ...nowShowing.map(n => ({ LanguageName: n.lang_name, LanguageID: n.lang_id })),
        // ...upcoming.map(n => ({ LanguageName: n.lang_name, LanguageID: n.lang_id }))
      ]

      return [...new Set(
        langs.map(n => (JSON.stringify(n)))
      )]
        .map(s => JSON.parse(s))
    },
    getNowShowingGenre () {
      let nowShowing = this.$store.getters.getNowShowing.data || []
      // let upcoming = this.$store.getters.getUpcoming.data || []

      let genres = [
        ...nowShowing.flatMap(n => n.genres_with_translations),
        // ...upcoming.map(n => ({ LanguageName: n.lang_name, LanguageID: n.lang_id }))
      ]

      genres.forEach(g => {
        g.GenreID = g.genre_id
        g.GenreName = g.key
      })

      // return genres.map(n => ({ Genre: n, GenreID: n }))
      // return [
      //   ...new Map(
      //     genres.map((item) => [item["GenreID"], item])
      //   ).values(),
      // ]
      return [...new Set(
        genres.map(n => (JSON.stringify(n)))
      )]
        .map(s => JSON.parse(s))
    },
    getBrijCinemas () {
      return [
        {
          'cinema_id': '',
          'cinema_name': 'All',
          'cinema_code': 'All',
          CinemaName: 'ALL CINEMAS',
          CinemaID: 'ALL',
        },
        ...(this.$store.getters.getBrijCinemas ? this.$store.getters.getBrijCinemas : [])
      ]
    },
    getNowShowing () {
      return this.$store.getters.getNowShowing
    },
    getUpcoming () {
      return this.$store.getters.getUpcoming
    },
    getExperiencesBrij () {
      return this.$store.getters.getExperiences
    },
    headerCinemaId () {
      return this.$store.state.headerCinemaStore.headerCinemaId
    },

    getMovies () {
      let filtered = JSON.parse(JSON.stringify(this.getNowShowing.data))

      let isAllCinemaSelected = this.selectedCinemaValues.some(c => c.cinema_id === '')
      if (isAllCinemaSelected) this.selectedCinemaValues = []

      let cinema_ids = this.selectedCinemaValues.map(c => c.cinema_id).filter(x => !!x)
      let genre_ids = this.selectedExpValues.map(c => c.GenreID).filter(x => !!x)
      let lang_ids = this.selectedLang.map(c => c.LanguageID).filter(x => !!x)

      filtered = filtered
        .filter(x => {
          if (isAllCinemaSelected || cinema_ids.length === 0) return true

          let cine_ids = x.cine_ids.split(',').filter(x => !!x).map(x => parseInt(x, 10))

          return cinema_ids.some(x => cine_ids.includes(x))
        })
        .filter(x => {
          if (genre_ids.length === 0) return true

          return genre_ids.includes(x.genre_id)
        })
        .filter(x => {
          if (lang_ids.length === 0) return true

          return lang_ids.includes(x.lang_id)
        })

      return filtered
    }
  },
  watch: {
    // selectedCinemaValues: {
    //   handler: function (newVal, oldVal) {
    //     this.hideLoading()
    //
    //     // if (this.selectedCinemaValues.length > 0) {
    //     //   let isAllSelected = this.selectedCinemaValues.some(x => x.cinema_id == '')
    //     //   if (isAllSelected) {
    //     //     this.$nextTick(() => {
    //     //       this.selectedCinemaValues = []
    //     //     })
    //     //   }
    //     // }
    //
    //     // if (this.selectedCinemaValues.length > 0) {
    //     //   this.filteredCinamaArray = []
    //     //   for (let p = 0; p < this.selectedCinemaValues.length; p++) {
    //     //     if (this.selectedCinemaValues[p].CinemaID == 'ALL') {
    //     //       this.filteredCinamaArray = []
    //     //       this.selectedCinemaValues = []
    //     //     } else {
    //     //       this.filteredCinamaArray.push(
    //     //         this.selectedCinemaValues[p].CinemaID
    //     //       )
    //     //     }
    //     //
    //     //     console.log('jiyu')
    //     //   }
    //     //   this.getMoviesByFormat()
    //     // } else {
    //     //   this.filteredCinamaArray = []
    //     //   this.getMoviesByFormat()
    //     // }
    //   },
    //   deep: true,
    //   immediate: true,
    // },
    // selectedExpValues: {
    //   handler: function (newVal, oldVal) {
    //     this.hideLoading()
    //     // if (this.selectedExpValues.length > 0) {
    //     //   this.filteredExpArray = []
    //     //   for (let p = 0; p < this.selectedExpValues.length; p++) {
    //     //     this.filteredExpArray.push(this.selectedExpValues[p].GenreID)
    //     //   }
    //     //   this.getMoviesByFormat()
    //     // } else {
    //     //   this.filteredExpArray = []
    //     //
    //     //   this.getMoviesByFormat()
    //     // }
    //   },
    //   deep: true,
    //   immediate: true,
    // },
    // selectedLang: {
    //   handler: function (newVal, oldVal) {
    //     this.hideLoading()
    //     // if (this.selectedShowTimes.length > 0) {
    //     //   this.filteredTimesArray = []
    //     //   for (let p = 0; p < this.selectedShowTimes.length; p++) {
    //     //     this.filteredTimesArray.push(this.selectedShowTimes[p].LanguageID)
    //     //   }
    //     //   this.getMoviesByFormat()
    //     // } else {
    //     //   this.filteredTimesArray = []
    //     //
    //     //   this.getMoviesByFormat()
    //     // }
    //   },
    //   deep: true,
    //   immediate: true,
    // },
    // headerCinemaId: {
    //   handler: function (newVal, oldVal) {
    //     // let obj = this.cinemaList.filter(y => {
    //     //   return y.CinemaID == this.headerCinemaId;
    //     // });
    //
    //     // if (obj.length > 0) {
    //     //   this.filteredCinamaArray = [];
    //
    //     // }
    //     this.selectedCinemaValues = []
    //
    //     let obj = this.cinemaList.filter(y => {
    //       return y.CinemaID == this.headerCinemaId
    //     })
    //     if (obj.length > 0) {
    //       this.selectedCinemaValues.push(...obj)
    //       this.hideCinemaFilter = true
    //     } else {
    //       this.hideCinemaFilter = false
    //     }
    //   },
    //   deep: true,
    // },
  },
  methods: {
    getCinemaTranslatedName (cinema) {
      if (!cinema) return ''

      let name = this.getLangSpecificAttribute(
        cinema.translation_data || [],
        this.getCurrentLang().brij_lang_id,
        'cinema_name',
        'langaugeId',
      ) || cinema.cinema_name
      return name
    },
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
      console.log('ChangeExp', { headerExpId })
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
          }
          this.getMoviesByFormat()
          this.hideLoading()
        })

        .catch(error => {
          this.hideLoading()
          console.log('Error', error)
        })
    },

    async getExperience (headerExpId = null) {
      this.hideLoading()
      this.showLoading()
      this.ChangeExp(headerExpId)
      if (headerExpId) { this.headerExpId = headerExpId }

      try {
        let response = await makeRequestBrij(`/api/admin/experience-format/${this.headerExpId}`, 'GET', null, null)
        const { error, res } = response

        if (res.data.status) {
          let { data } = res

          data.Records.forEach(e => {
            e.ID = e.movie_experience_id
            e.name = e.movie_experience

            try {
              e.translation_data = JSON.parse(e.translation_data)
            } catch (e) {
              console.log('translation_data parse error', e)
              e.translation_data = []
            }
          })

          this.experience = data.Records[0] ? data.Records[0] : null

          if (data.Records[0]) {
            this.videoID = this.getLangSpecificAttribute(
              this.experience.translation_data,
              this.getCurrentLang().brij_lang_id,
              'movie_experience_link',
              'langaugeId',
            )

            console.log(`${this.videoID}`)
            if (this.videoID.includes('http')) {
              this.videoID = this.videoID.slice(this.videoID.lastIndexOf('v=')).split('v=')[1]
            }
            console.log(`${this.videoID}`)

            this.experienceDesc = this.getLangSpecificAttribute(
              this.experience.translation_data,
              this.getCurrentLang().brij_lang_id,
              'movie_experience_description',
              'langaugeId',
            ).split('&lt;').join('<')
          }
          this.$forceUpdate()
        }
      } catch (error) {
        console.error(error)
      } finally {
        this.hideLoading()
      }
    },
  },
}
</script>
<style>

</style>
