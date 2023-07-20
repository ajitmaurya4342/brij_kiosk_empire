<template>
  <div>
    <div
      class="row emp-quickbook mx-0 px-3 py-4 mt-n1 align-items-center animate__animated animate__fadeInDown"
    >
      <div
        @click="setActive(true)"
        class="col-xl-2 col-lg-12 text pr-0 d-flex align-items-center justify-content-between"
      >
        <div>
          {{ allLanguageData.QuickBook.title }}
        </div>
        <div class="d-block d-lg-none">
          <div
            class="open"
            :class="showContent ? 'd-none d-lg-block' : 'd-block'"
          >
            <img
              src="@/assets/img/new-img/svg-img/left-white-arrow.svg"
              width="20px"
              class="open-icon"
            />
          </div>
          <div
            class="close"
            @click="setActive(false)"
            :class="showContent ? 'd-block' : 'd-none d-lg-block'"
          >
            <img
              src="@/assets/img/new-img/svg-img/left-white-arrow.svg"
              width="20px"
              class="close-icon"
            />
          </div>
        </div>
      </div>
      <div
        class="col-xl-10 animate__animated animate__pulse"
        :class="showContent ? 'd-block' : 'd-none d-lg-block'"
      >
        <div class="grid-quickbox mt-4 mt-xl-0">
          <div class="px-1 mb-2 mb-xl-0">
            <b-dropdown
              :disabled="headerCinemaId ? true : false"
              variant="default"
              class="quickbook-dropdown no-scroll"

            >
              <template slot="button-content" >
                <span class="text-truncate pr-2"  v-b-tooltip.hover :title="quickBook.cinemaSelected.CinemaName
                    ? quickBook.cinemaSelected.CinemaName
                    : 'Select Cinema'">{{
                  quickBook.cinemaSelected.CinemaName
                    ? quickBook.cinemaSelected.CinemaName
                    : "Select Cinema"
                }}</span>
              </template>
              <b-dropdown-item
                v-for="(cinema, Index) in quickBook.cinemas"
                :key="Index"
                class="white-space"
                v-on:click="quickBookFilters(cinema, 'cinema', $event)"
                >{{ cinema.CinemaName }}</b-dropdown-item
              >
            </b-dropdown>
          </div>
          <div class="px-1 mb-2 mb-xl-0">
            <b-dropdown
              variant="default"
              class="quickbook-dropdown"
              :text="quickBook.movieSelected.Title"
              :disabled="
                quickBook.cinemaSelected.CinemaName ==
                  allLanguageDataQuickBook.selectCinema
              "
            >
              <template slot="button-content">
                <span class=" text-truncate d-block pr-2" v-b-tooltip.hover :title="quickBook.movieSelected.Title">{{
                  quickBook.movieSelected.Title
                }}</span>
              </template>
              <b-dropdown-item
                v-for="(movie, Index) in quickBook.movies"
                :key="Index"
                v-on:click="quickBookFilters(movie, 'movie', $event)"
                class="white-space"
                >{{ movie.Title }}</b-dropdown-item
              >
            </b-dropdown>
          </div>
          <div class="px-1 mb-2 mb-xl-0">
            <b-dropdown
              variant="default"
              class="quickbook-dropdown"
              :text="quickBook.dateSelected.ShowDate"
              :disabled="
                quickBook.movieSelected.Title ==
                  allLanguageDataQuickBook.selectMovie
              "
            >
              <b-dropdown-item
                v-for="(date, Index) in quickBook.dates"
                :key="Index"
                v-on:click="quickBookFilters(date, 'date', $event)"
                >{{ date.ShowDate }}</b-dropdown-item
              >
            </b-dropdown>
          </div>
          <div class="px-1 mb-2 mb-xl-0">
            <b-dropdown
              variant="default"
              class="quickbook-dropdown"
              :text="quickBook.timeSelected.ShowTime"
              :disabled="
                quickBook.dateSelected.ShowDate ==
                  allLanguageDataQuickBook.selectDate
              "
            >
              <b-dropdown-item
                v-for="(time, Index) in quickBook.times"
                :key="Index"
                class="cal"
                v-on:click="quickBookFilters(time, 'time', $event)"
                >{{ time.ShowTime }}</b-dropdown-item
              >
            </b-dropdown>
          </div>
          <div class="">
            <!-- v-on:click="showRatingTermsPopup()" -->
            <button
              :disabled="quickBook.selectButtonStatus"
              v-on:click="onQuickBook()"
              class="btn quickbook-btn px-5"
            >
              {{ allLanguageData.BOOK }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { makeRequest } from '@/helper/internet.js'
import { uniqBy, filter } from 'lodash'
import languageData from '@/languageData.json'
import { LanguageService } from '@/services/storage.service'
let langToken = LanguageService.getLanguage() || {
  lang: 'eng',
  lang_id: 2,
}
export default {
  name: 'quickbook',
  components: {},
  computed: {
    headerCinemaId () {
      return this.selectedCinemaID
        ? this.selectedCinemaID
        : this.$store.state.headerCinemaStore.headerCinemaId
    },
  },
  watch: {
    headerCinemaId: {
      handler: function (newVal, oldVal) {
        console.log(this.headerCinemaId, 'ghgjh')
        this.quickBook.cinemaSelected.CinemaID = ''
        this.quickBook.cinemaSelected.CinemaName = ''
        let obj = this.quickBook.cinemas.filter(y => {
          return y.CinemaID == this.headerCinemaId
        })

        if (obj.length > 0) {
          this.quickBook.cinemaSelected.CinemaID = obj[0].CinemaID
          this.quickBook.cinemaSelected.CinemaName = obj[0].CinemaName
          this.quickBookFilters(obj[0], 'cinema', null)
        } else {
          this.fetchCinemaList()
        }
      },
      deep: true,
    },
  },
  metaInfo: {
    // title: "Empire Cinemas: View listings and book tickets now!m",
    titleTemplate: null,
  },
  data () {
    return {
      showContent: false,
      allLanguageDataQuickBook: languageData[langToken['lang']].QuickBook,
      ShowTerms: [],
      quickBook: {
        selectButtonStatus: true,
        movies: [],
        cinemaSelected: {
          CinemaName: '',
        },
        selectedCinemaID: window.localStorage.getItem('headerCinemaID'),
        movieSelected: {
          Title: 'Select Movie',
        },
        dateSelected: {
          ShowDate: 'Select Date',
        },
        timeSelected: {
          ShowTime: 'Select Time',
        },
        cinemas: [],
        dates: [],
        times: [],
        allData: [],
        filteredData: [],
      },
      cinemaList: [],
      //     border: '1px solid transparent',
      //   },
      // },
    }
  },
  beforeMount () {
    this.showLoading()
    Promise.all(
      [
        this.$store.dispatch('QuickBook'),
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

    // this.hideLoading();
    this.quickBook.cinemaSelected = {
      CinemaName: this.allLanguageDataQuickBook.selectCinema,
    }
    this.quickBook.movieSelected = {
      Title: this.allLanguageDataQuickBook.selectMovie,
    }
    this.quickBook.dateSelected = {
      ShowDate: this.allLanguageDataQuickBook.selectDate,
    }
    this.quickBook.timeSelected = {
      ShowTime: this.allLanguageDataQuickBook.selectTime,
    }
    // this.getNowShowingData();
    this.fetchCinemaList()
    this.getQuickBookDetails()

    // this.getLanguages();
  },
  methods: {
    onQuickBook () {
      if (this.quickBook.timeSelected.SchID) {
        this.$router.push({
          path: '/seatLayout/' + this.quickBook.timeSelected.SchID,
        })
      }
    },
    fetchCinemaList: function () {
      this.cinemaList = []
      this.quickBook.cinemas = []

      makeRequest('/GetCinemas', 'POST', null, null)
        .then(result => {
          const { error, res } = result
          const { data } = res.data
          if (res.data) {
            this.cinemaList = res.data.Categories
            this.quickBook.cinemas = this.cinemaList
          }
          if (window.localStorage.getItem('headerCinemaID')) {
            let obj = this.quickBook.cinemas.filter(y => {
              return y.CinemaID == this.headerCinemaId
            })

            if (obj.length > 0) {
              this.quickBook.cinemaSelected.CinemaID = obj[0].CinemaID
              this.quickBook.cinemaSelected.CinemaName = obj[0].CinemaName
              this.quickBookFilters(obj[0], 'cinema', null)
            }
          }
          this.getQuickBookDetails()
        })
        .catch(error => {
          console.log('Error on vue front', error)
        })
    },
    setActive: function (data) {
      this.showContent = !this.showContent
    },
    showRatingTermsPopup: function () {
      if (this.ShowTerms.length > 0) {
        if (
          this.ShowTerms[0].CountryID == 230 ||
          this.ShowTerms[0].CountryID == '230'
        ) {
          this.$root.$emit('bv::show::modal', 'ruleOfCountryForShows')
          // this.$ref.ruleOfCountry.show();
        } else {
          this.onClickBookNow()
        }
      } else {
        this.onClickBookNow()
      }
    },
    onClickOk: function () {
      this.$refs.ruleOfCountryForShows.hide()
      this.onClickBookNow()
    },

    onClickCancel: function () {
      this.$refs.ruleOfCountryForShows.hide()
    },
    onClickBookNow: function () {
      console.log(this.quickBook)
      return false
      if (this.quickBook.timeSelected.CinemaID == 6) {
        window.localStorage.setItem('PREIMERE', true)
        window.location.href =
          'https://empirepremiere.com/checkout/' +
          this.quickBook.timeSelected.MovieID +
          '/' +
          this.quickBook.timeSelected.SchID +
          '/' +
          this.quickBook.timeSelected.CinemaID
      } else {
        this.$router.push({
          name: 'checkout',
          params: {
            movieID: this.quickBook.timeSelected.MovieID,
            scheduleID: this.quickBook.timeSelected.SchID,
            seatLayout: this.quickBook.timeSelected.CinemaID,
          },
        })
        window.location.reload()
      }
    },
    removeChar: function (string) {
      var ret = string.replace(/EMPIRE/g, '')
      return ret
    },
    getQuickBookDetails: function () {
      let token = null
      let payload = {}
      makeRequest('/Quickbook', 'POST', null, payload)
        .then(response => {
          const { error, res } = response
          if (!error && res.data) {
            if (!error) {
              this.quickBook.allData = res.data.Data
              this.quickBook.filteredData = res.data.Data
              this.setValuesQuickBook('movies', true)
              if (this.quickBook.cinemaSelected.CinemaID) {
                this.quickBookFilters(this.quickBook.cinemaSelected, 'cinema', null)
              }
              // this.setValuesQuickBook("cinemas");
              // this.setValuesQuickBook("dates");
              // this.setValuesQuickBook("times");
            }
          } else {
            console.log('Response Error ')
          }
        })
        .catch(error => {
          console.log('Error', error)
        })
    },

    setValuesQuickBook: function (filter, allFlag) {
      if (allFlag) {
        // this.quickBook.cinemas = uniqBy(this.quickBook.allData, "CinemaName");
        let aaa = []
        aaa = uniqBy(this.quickBook.allData, 'CinemaName')
        function dynamicSort (property) {
          var sortOrder = 1

          if (property[0] === '-') {
            sortOrder = -1
            property = property.substr(1)
          }

          return function (a, b) {
            if (sortOrder == -1) {
              return b[property].localeCompare(a[property])
            } else {
              return a[property].localeCompare(b[property])
            }
          }
        }
        // this.quickBook.cinemas = aaa;
        // aaa.sort(dynamicSort("CinemaName"));
        // this.quickBook.cinemas = aaa.sort(dynamicSort("CinemaName"));

        this.quickBook.movies = uniqBy(this.quickBook.filteredData, 'Title')
        this.quickBook.dates = uniqBy(this.quickBook.filteredData, 'ShowDate')
        this.quickBook.times = uniqBy(this.quickBook.filteredData, 'ShowTime')
      }
      // this.quickBook.movies = uniqBy(this.quickBook.filteredData, "Title");

      if (filter == 'movies') {
        this.quickBook.movies = uniqBy(this.quickBook.filteredData, 'Title')
      }

      // if (filter == "cinemas") {
      //   this.quickBook.cinemas = uniqBy(
      //     this.quickBook.filteredData,
      //     "CinemaName"
      //   );
      // }
      if (filter == 'dates') {
        this.quickBook.dates = uniqBy(this.quickBook.filteredData, 'ShowDate')
      }
      if (filter == 'times') {
        this.quickBook.times = uniqBy(this.quickBook.filteredData, 'ShowTime')
      }
    },
    quickBookFilters: function (data, filter, event) {
      console.log('data, filter, event :', data, filter, event)
      // event.preventDefault();
      var that = this
      if (filter == 'cinema') {
        this.quickBook.filteredData = this.quickBook.allData
        this.quickBook.cinemaSelected = data
        this.quickBook.movieSelected = {
          Title: this.allLanguageDataQuickBook.selectMovie,
        }
        this.quickBook.dateSelected = {
          ShowDate: this.allLanguageDataQuickBook.selectDate,
        }
        this.quickBook.timeSelected = {
          ShowTime: this.allLanguageDataQuickBook.selectTime,
        }
      }

      if (filter == 'movie') {
        this.quickBook.movieSelected = data
        console.log('data', data)
        this.ShowTerms = data.ShowTerms
        this.quickBook.dateSelected = {
          ShowDate: this.allLanguageDataQuickBook.selectDate,
        }
        this.quickBook.timeSelected = {
          ShowTime: this.allLanguageDataQuickBook.selectTime,
        }
      }

      if (filter == 'date') {
        that.quickBook.dateSelected = data
        this.quickBook.timeSelected = {
          ShowTime: this.allLanguageDataQuickBook.selectTime,
        }
      }
      if (filter == 'time') {
        that.quickBook.timeSelected = data
      }
      // if (date) {
      //   that.quickBook.dateSelected = date;
      // }

      let data1 = _.filter(that.quickBook.allData, function (schedule) {
        if (
          that.quickBook.cinemaSelected.CinemaName !=
            that.allLanguageDataQuickBook.selectCinema &&
          that.quickBook.cinemaSelected.CinemaName == schedule.CinemaName
        ) {
          return true
        }
      })
      data1 = _.filter(data1, function (schedule) {
        if (
          that.quickBook.movieSelected.Title !=
            that.allLanguageDataQuickBook.selectMovie &&
          that.quickBook.movieSelected.Title == schedule.Title
        ) {
          return true
        } else if (
          that.quickBook.movieSelected.Title ==
          that.allLanguageDataQuickBook.selectMovie
        ) {
          return true
        }

        // if (
        //   that.quickBook.cinemaSelected.CinemaName != this.allLanguageDataQuickBook.selectCinema &&
        //   that.quickBook.cinemaSelected.CinemaName == schedule.CinemaName
        // ) {
        //   return true;
        // } else if (
        //   that.quickBook.cinemaSelected.CinemaName == this.allLanguageDataQuickBook.selectCinema
        // ) {
        //   return true;
        // }
      })
      console.log(this.quickBook.movies)

      data1 = _.filter(data1, function (schedule) {
        if (
          that.quickBook.dateSelected.ShowDate !=
            that.allLanguageDataQuickBook.selectDate &&
          that.quickBook.dateSelected.ShowDate == schedule.ShowDate
        ) {
          return true
        } else if (
          that.quickBook.dateSelected.ShowDate ==
          that.allLanguageDataQuickBook.selectDate
        ) {
          return true
        }
      })
      this.quickBook.filteredData = data1
      console.log(this.quickBook.movies)
      if (filter == 'cinema') {
        this.setValuesQuickBook('movies', false)
      }
      if (filter == 'movie') {
        this.setValuesQuickBook('dates', false)
      }
      if (filter == 'date') {
        this.setValuesQuickBook('times', false)
      }
      if (
        this.quickBook.timeSelected.ShowTime !=
        this.allLanguageDataQuickBook.selectTime
      ) {
        this.quickBook.selectButtonStatus = false
      } else {
        this.quickBook.selectButtonStatus = true
      }
    },
    selectTime: function (schedule, event) {
      event.preventDefault()
      this.$router.push({
        name: 'checkout',
        params: {
          movieID: schedule.movieID,
          scheduleID: schedule.SchID,
          seatLayout: schedule.seatlayout,
        },
      })
    },
  },
}
</script>
<style></style>
