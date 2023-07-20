<template>
  <div>
    <section class="container-fluid d-none">
      <div
        class="col-md-11 col-lg-10 col-lg-12 col-xl-10 mx-auto quickbook d-none d-lg-block px-1 py-lg-3 py-xl-4"
      >
        <div class="row mx-0 align-items-center">
          <!-- QUICKBOOK -->
          <div class="col-lg text-center">
            <div class="qb-text eightpx font-weight-bold">
              {{ allLanguageData.QuickBook.title }}
            </div>
          </div>

          <!-- CINEMA -->
          <!-- <div class="col-lg">
            <b-dropdown
              id="ddown1"
              :text="quickBook.cinemaSelected.CinemaName"
              variant="default"
              class="emp-dropdown"
              :disabled="quickBook.movieSelected.Title =='Select Movie'"
          >-->
          <div class="col-lg">
            <b-dropdown
              variant="default"
              class="emp-dropdown"
              :disabled="quickBook.movieSelected.Title == 'Select Movie'"
            >
              <template slot="button-content">
                <span class="text-truncate">{{
                  quickBook.cinemaSelected.CinemaName
                }}</span>
              </template>
              <b-dropdown-item
                v-for="(cinema, Index) in quickBook.cinemas"
                :key="Index"
                v-on:click="quickBookFilters(cinema, 'cinema', $event)"
                >{{ cinema.CinemaName }}</b-dropdown-item
              >
            </b-dropdown>
          </div>

          <!-- MOVIE -->
          <div class="col-lg">
            <!-- <b-dropdown id="ddown1" :text="quickBook.movieSelected.Title" variant="default" class="emp-dropdown">
              <b-dropdown-item v-for="(movie, Index) in quickBook.movies" :key="Index"
                v-on:click="quickBookFilters(movie, 'movie', $event)" class="text-truncate">{{movie.Title}}
              </b-dropdown-item>
            </b-dropdown>-->
            <b-dropdown
              id="ddown1"
              :text="quickBook.movieSelected.Title"
              variant="default"
              class="emp-dropdown"
            >
              <template slot="button-content">
                <span class="text-truncate d-block">{{
                  quickBook.movieSelected.Title
                }}</span>
              </template>
              <b-dropdown-item
                v-for="(movie, Index) in quickBook.movies"
                :key="Index"
                v-on:click="quickBookFilters(movie, 'movie', $event)"
                class="text-truncate"
                >{{ movie.Title }}</b-dropdown-item
              >
            </b-dropdown>
          </div>

          <!-- DATE -->
          <div class="col-lg">
            <b-dropdown
              id="ddown1"
              :text="quickBook.dateSelected.ShowDate"
              variant="default"
              class="emp-dropdown cal"
              :disabled="quickBook.cinemaSelected.CinemaName == 'Select Cinema'"
            >
              <b-dropdown-item
                v-for="(date, Index) in quickBook.dates"
                :key="Index"
                v-on:click="quickBookFilters(date, 'date', $event)"
                >{{ date.ShowDate }}</b-dropdown-item
              >
            </b-dropdown>
          </div>

          <div class="col-lg">
            <b-dropdown
              id="ddown1"
              :text="quickBook.timeSelected.ShowTime"
              variant="default"
              class="emp-dropdown cal"
              :disabled="quickBook.dateSelected.ShowDate == 'Select Date'"
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

          <!-- BOOK NOW -->
          <div class="col-lg">
            <b-button
              :disabled="quickBook.selectButtonStatus"
              class="qb-btn py-1"
              v-on:click="showRatingTermsPopup()"
            >
              <!-- :to="{ name: 'checkout', params: { movieID: quickBook.timeSelected.MovieID, scheduleID: quickBook.timeSelected.SchID, seatLayout: quickBook.timeSelected.CinemaID }}" -->
              <svg viewBox="0 0 18.15 18.15">
                <g id="Layer_2" data-name="Layer 2">
                  <g id="Layer_1-2" data-name="Layer 1">
                    <path
                      class="icon-ticket"
                      d="M6.76,18H6.67c-.56-.57-1.12-1.14-1.69-1.7a.41.41,0,0,1-.11-.56,1.79,1.79,0,0,0-1.36-2.56,6.84,6.84,0,0,0-1.57.16L.18,11.48s0-.06,0-.09a4.46,4.46,0,0,0,.37-.3L7.36,4.27l.44-.41.77.93.72-.72-1-.77c.7-.7,1.34-1.33,2-2C10.67,1,11,.56,11.39.18h.09L13.41,2c-.6,1.21-.56,2,.09,2.64s1.41.69,2.62.1L18,6.67v.09L15.59,9.07c-.24.23-.46.49-.77.83l-.81-1-.73.7,1.05.84a5,5,0,0,0-.48.36L7.06,17.6A4.36,4.36,0,0,0,6.76,18ZM9.62,5.71l.84.93L11,6.08l-.85-.92Zm2.49,1.37-.56.49.8,1L13,7.95Z"
                    />
                  </g>
                </g>
              </svg>
            </b-button>
          </div>
        </div>
      </div>
    </section>

    <section class="quickbook-container">
      <div class="col-md-10 mx-auto">
        <div class="quickbook-content">
          <div class="row align-items-center mx-0">
            <!-- TEXT -->
            <div class="col-12 col-md-8 col-lg-2 px-md-2 mb-3 mb-lg-0 mx-auto">
              <span>{{ allLanguageData.QuickBook.title }}</span>
            </div>
            <!-- SELECT CINEMA  -->
            <div class="col-12 col-md-8 col-lg-2 px-md-2 mb-3 mb-lg-0 mx-auto">
              <b-dropdown
                variant="default"
                :text="quickBook.cinemaSelected.CinemaName"
              >
                <!-- <b-dropdown-item>First Action</b-dropdown-item> -->

                <b-dropdown-item
                  v-for="(cinema, Index) in quickBook.cinemas"
                  :key="Index"
                  v-on:click="quickBookFilters(cinema, 'cinema', $event)"
                  >{{ removeChar(cinema.CinemaName) }}</b-dropdown-item
                >
              </b-dropdown>
            </div>

            <!-- SELECT MOVIE -->
            <div class="col-12 col-md-8 col-lg-2 px-md-2 mb-3 mb-lg-0 mx-auto">
              <b-dropdown
                variant="default"
                :text="quickBook.movieSelected.Title"
                :disabled="
                  quickBook.cinemaSelected.CinemaName == 'Select Cinema' ||
                    quickBook.cinemaSelected.CinemaName == 'اختر السینما'
                "
              >
                <!-- <b-dropdown-item>First ActionActionActionActionActionActionAction</b-dropdown-item> -->
                <b-dropdown-item
                  v-for="(movie, Index) in quickBook.movies"
                  :key="Index"
                  v-on:click="quickBookFilters(movie, 'movie', $event)"
                  >{{ movie.Title }}</b-dropdown-item
                >
              </b-dropdown>
            </div>

            <!-- SELECT SHOW DATE -->
            <div class="col-12 col-md-8 col-lg-2 px-md-2 mb-3 mb-lg-0 mx-auto">
              <b-dropdown
                variant="default"
                :text="quickBook.dateSelected.ShowDate"
                :disabled="
                  quickBook.movieSelected.Title == 'Select Movie' ||
                    quickBook.movieSelected.Title == 'اختر الفیلم'
                "
              >
                <b-dropdown-item
                  v-for="(date, Index) in quickBook.dates"
                  :key="Index"
                  v-on:click="quickBookFilters(date, 'date', $event)"
                  >{{ date.ShowDate }}</b-dropdown-item
                >
              </b-dropdown>
              <!-- </b-dropdown> -->
            </div>

            <!-- SELECT SHOW TIME -->
            <div class="col-12 col-md-8 col-lg-2 px-md-2 mb-3 mb-lg-0 mx-auto">
              <b-dropdown
                variant="default"
                :text="quickBook.timeSelected.ShowTime"
                :disabled="
                  quickBook.dateSelected.ShowDate == 'Select Date' ||
                    quickBook.dateSelected.ShowDate == 'اختر التاریخ'
                "
              >
                <!-- <b-dropdown-item>First Action</b-dropdown-item> -->
                <b-dropdown-item
                  v-for="(time, Index) in quickBook.times"
                  :key="Index"
                  class="cal"
                  v-on:click="quickBookFilters(time, 'time', $event)"
                  >{{ time.ShowTime }}</b-dropdown-item
                >
              </b-dropdown>
            </div>

            <!-- BOOK NOW BUTTON -->

            <div
              class="col-8 col-lg-2 px-md-2 d-flex justify-content-center mx-auto"
            >
              <b-button
                :class="langName == 'ar' ? 'book-tickets-svg' : ''"
                class="btn-showTickets justify-content-center"
                :disabled="quickBook.selectButtonStatus"
                v-on:click="showRatingTermsPopup()"
              >
                <!-- :to="{ name: 'checkout', params: { movieID: quickBook.timeSelected.MovieID, scheduleID: quickBook.timeSelected.SchID, seatLayout: quickBook.timeSelected.CinemaID }}" -->
                <svg viewBox="0 0 18.15 18.15">
                  <g id="Layer_2" data-name="Layer 2">
                    <g id="Layer_1-2" data-name="Layer 1">
                      <path
                        class="icon-ticket"
                        d="M6.76,18H6.67c-.56-.57-1.12-1.14-1.69-1.7a.41.41,0,0,1-.11-.56,1.79,1.79,0,0,0-1.36-2.56,6.84,6.84,0,0,0-1.57.16L.18,11.48s0-.06,0-.09a4.46,4.46,0,0,0,.37-.3L7.36,4.27l.44-.41.77.93.72-.72-1-.77c.7-.7,1.34-1.33,2-2C10.67,1,11,.56,11.39.18h.09L13.41,2c-.6,1.21-.56,2,.09,2.64s1.41.69,2.62.1L18,6.67v.09L15.59,9.07c-.24.23-.46.49-.77.83l-.81-1-.73.7,1.05.84a5,5,0,0,0-.48.36L7.06,17.6A4.36,4.36,0,0,0,6.76,18ZM9.62,5.71l.84.93L11,6.08l-.85-.92Zm2.49,1.37-.56.49.8,1L13,7.95Z"
                      />
                    </g>
                  </g>
                </svg>
                {{ allLanguageData.QuickBook.Button }}
              </b-button>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!----------- RULES OF ENTRY MODAL ---------->
    <!-- <button  v-b-modal.ruleOfCountry> click</button> -->
    <div class="ruleofcountrymodal">
      <b-modal
        no-close-on-esc
        no-close-on-backdrop
        hide-header
        hide-footer
        hide-header-close
        ref="ruleOfCountryForShows"
        id="ruleOfCountryForShows"
        title=" "
        class
      >
        <div class="ruleofcountry px-3 py-2">
          <h5 class="title">{{ allLanguageData.PopupTerms.Heading }}</h5>
          <div class="row py-4 mx-auto align-items-center">
            <div
              v-if="ShowTerms && ShowTerms.length > 0"
              class="col-3 text-center text-md-right pr-md-0"
            >
              <img
                :src="ShowTerms[0].RatingImage"
                height="60px"
                width="60px"
                alt="img"
              />
            </div>
            <div v-if="ShowTerms && ShowTerms.length > 0" class="col-8">
              <p class="rule-warning mb-0">{{ ShowTerms[0].Title }}</p>
            </div>
          </div>

          <div
            v-if="ShowTerms && ShowTerms.length > 0"
            class="rules-list"
            v-html="ShowTerms[0].Description"
          ></div>

          <div class="text-center">
            <h6 class="title mb-0">
              {{ allLanguageData.PopupTerms.AgreeText }}
            </h6>
            <p class="small">
              <router-link
                class="font-weight-bold text-danger"
                to="/ksa-terms-condition"
                target="_blank"
              >
                <u>{{ allLanguageData.PopupTerms.TnC }}</u>
              </router-link>
              &nbsp;{{ allLanguageData.PopupTerms.And }}
              <router-link
                class="font-weight-bold text-danger"
                to="/theatre-rules"
                target="_blank"
              >
                <u>{{ allLanguageData.PopupTerms.HouseRules }}</u>
              </router-link>
            </p>
            <div class="mx-auto text-center direction-class">
              <div class="row">
                <div class="col-6 col-md-4 offset-md-2 pr-1">
                  <b-button
                    variant="default"
                    @click="onClickOk()"
                    class="btn btn-green"
                    >{{ allLanguageData.PopupTerms.AgreeButton }}</b-button
                  >
                </div>

                <div class="col-6 col-md-4 pl-1">
                  <b-button
                    variant="default"
                    @click="onClickCancel()"
                    class="btn btn-green"
                    >{{ allLanguageData.PopupTerms.CancelButton }}</b-button
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
      </b-modal>
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
  metaInfo: {
    // title: "Empire Cinemas: View listings and book tickets now!m",
    titleTemplate: null,
  },
  data () {
    return {
      allLanguageDataQuickBook: languageData[langToken['lang']].QuickBook,
      ShowTerms: [],
      quickBook: {
        selectButtonStatus: true,
        movies: [],
        cinemaSelected: {
          CinemaName: '',
        },
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
      //     border: '1px solid transparent',
      //   },
      // },
    }
  },
  beforeMount () {
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
    this.getQuickBookDetails()
    // this.getLanguages();
  },
  methods: {
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
      makeRequest('/GetAllCinemasSch', 'POST', null, payload)
        .then(response => {
          const { error, res } = response
          if (!error && res.data) {
            if (!error) {
              this.quickBook.allData = res.data.Data
              this.quickBook.filteredData = res.data.Data
              this.setValuesQuickBook('movies', true)
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
        this.quickBook.cinemas = aaa.sort(dynamicSort('CinemaName'))

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
        that.quickBook.cinemaSelected = data
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
