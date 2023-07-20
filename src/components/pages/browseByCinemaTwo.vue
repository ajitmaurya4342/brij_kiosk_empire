<template>
  <div>
    <section class="container-fluid">
      <div class="col-12 col-md-11 px-0 mx-auto">
        <div class="my-4 text-center cus-list">
          <p
            v-if="preimere == true || preimere == 'true'"
            class="eTitle eTitlewhite eTitleblack mb-0"
          >
            <img
              src="@/assets/img/svg/nowShowing-icon-gold.svg"
              height="auto"
              width="35px"
              class="pr-2 pb-1"
            />
            {{ allLanguageData.BookByCinema }}
          </p>
          <p v-else class="eTitle eTitlewhite eTitleblack mb-0">
            <img src="@/assets/img/svg/nowShowing-icon.svg" class="pr-2 pb-1" />
            {{ allLanguageData.BookByCinema }}
          </p>
        </div>

        <div class="blackdotline-box whitedotline-box">
          <hr class="white-dotline black-dotline" />
        </div>

        <div
          class="text-center col-12 col-md-12 col-lg-10 col-xl-9 mx-auto browse-cinema"
        >
          <div class="row">
            <!-- CINEMA -->
            <div class="col-12 col-md">
              <!-- <b-dropdown  v-for="(cinema, cinemaKey) in AllCinemasList" :key="cinemaKey" id="ddown1" :text="selectCinema" variant="default" class="emp-dropdown">
                <b-dropdown-item>{{ cinema.CinemaName }}</b-dropdown-item>
              </b-dropdown>-->
              <b-dropdown
                id="ddown1"
                :text="selectCinema"
                variant="default"
                class="emp-dropdown"
              >
                <b-dropdown-item
                  v-on:click="onSelectCinema(cinema)"
                  v-for="(cinema, cinemaKey) in cinemasList"
                  :key="cinemaKey"
                  >{{ cinema.CinemaName }}</b-dropdown-item
                >
              </b-dropdown>
            </div>

            <!-- FORMAT -->
            <div class="col-12 col-md">
              <b-dropdown
                id="ddown2"
                :text="selectedExp"
                variant="default"
                class="emp-dropdown"
              >
                <b-dropdown-item v-on:click="onSelectFormat(null, 'All')">
                  All
                </b-dropdown-item>
                <b-dropdown-item
                  v-on:click="onSelectFormat(format, 'Normal')"
                  v-for="(format, index) in formats"
                  :key="index"
                  >{{ format.Metacritic }}</b-dropdown-item
                >
              </b-dropdown>
            </div>

            <!-- DATE -->
            <div class="col-12 col-md">
              <b-dropdown
                id="ddown3"
                :text="selectedDate"
                variant="default"
                class="emp-dropdown cal"
              >
                <b-dropdown-item
                  v-on:click="OnSelectDate(cinemaDate)"
                  v-for="(cinemaDate, cinemaDateListKey) in movieDates"
                  :key="cinemaDateListKey"
                  >{{ cinemaDate.Shoedatedp }}</b-dropdown-item
                >
              </b-dropdown>
            </div>

            <!-- LANGUAGE -->
            <div class="col-12 col-md">
              <b-dropdown
                id="ddown3"
                :text="langVal"
                variant="default"
                class="emp-dropdown cal"
              >
                <b-dropdown-item v-on:click="onSelectLanguage(null, 'All')">
                  All
                </b-dropdown-item>
                <b-dropdown-item
                  v-on:click="onSelectLanguage(lang, 'Normal')"
                  v-for="(lang, index) in languages"
                  :key="index"
                  >{{ lang.LanguageName }}</b-dropdown-item
                >
              </b-dropdown>
            </div>
          </div>
        </div>

        <div class="my-3" v-if="preimere == true || preimere == 'true'">
          <img
            src="@/assets/img/svg/dotted-black-line.svg"
            class="w-100 d-none d-lg-block"
            alt
          />
          <img
            src="@/assets/img/svg/drop-line-black-mobile.svg"
            class="w-100 d-lg-none"
            alt
          />
        </div>
        <div v-else>
          <img src="@/assets/img/svg/dotted-line.svg" class="w-100" alt />
        </div>
      </div>

      <div v-if="AllMovieDetails.length > 0">
        <div
          class="col-12 col-md-11 col-lg-11 col-xl-8 mx-auto my-4 my-lg-5"
          v-for="(showtimeDiv, z) in AllMovieDetails"
          :key="z"
        >
          <!-- v-if="showtimeDiv.currentFormat == selectedExp" -->
          <div class="row">
            <!-- align-self-center -->
            <div class="col-md-4 pl-0">
              <!-- <div class="h-100"> -->
              <img
                v-lazy="showtimeDiv.movie_card_img"
                class="img-fluid w-100 br-movie-img pt-3"
              />
              <!-- <div v-if="showtimeDiv.IsNew" class="new-movies">
                <span>NEW</span>
              </div>-->
              <!-- <div v-if="showtimeDiv.tag" class="new-movies">
                <span>NEW</span>
              </div>-->
              <div
                class="new-movies"
                v-if="
                  showtimeDiv.tag == 'Advance Booking' ||
                    showtimeDiv.tag == 'New'
                "
              >
                <span>{{ showtimeDiv.tag }}</span>
              </div>
              <!-- </div> -->
            </div>

            <div class="col-md-8 align-self-start">
              <div
                class="d-flex justify-content-sm-between justify-content-xl-around flex-column h-100"
              >
                <div class="brCinema py-2 mb-lg-0">
                  <p class="eTitle eTitleblack mb-0">
                    {{ showtimeDiv.title }}
                    <span>({{ showtimeDiv.format.join(" , ") }})</span>
                  </p>

                  <span class="yr">
                    <span class="eTitleNew"
                      >{{ allLanguageData.Releasing }}:</span
                    >
                    {{ showtimeDiv.release }}
                  </span>
                  <ul class="list-inline d-inline">
                    <li class="list-inline-item">{{ showtimeDiv.genre }}</li>
                    <!-- <li class="list-inline-item">Drama</li> -->
                  </ul>
                </div>

                <div class="brCinemaBox">
                  <ul
                    class="cinemaShowtime text-left pl-0 mb-0"
                    :class="
                      CountryID == '102' || CountryID == 102
                        ? 'pointer-none'
                        : ''
                    "
                  >
                    <li
                      class="fill-height mx-0 mr-1 mr-md-3"
                      v-for="(time, index) in showtimeDiv.moviedates"
                      :key="index"
                      :class="[
                        'fill-height ',
                        showActiveTime == index && time.openstatus > 55
                          ? 'fill-green active'
                          : time.openstatus > 55
                          ? 'fill-green'
                          : showActiveTime == index && time.openstatus > 20
                          ? 'fill-yellow active'
                          : time.openstatus > 20
                          ? 'fill-yellow'
                          : showActiveTime == index && time.openstatus > 0
                          ? 'fill-red active'
                          : time.openstatus > 0
                          ? 'fill-red'
                          : ''
                      ]"
                      v-on:click="onTimeSelect(time, showtimeDiv, index)"
                    >
                      <!-- <div class="timing-slot">
                      <p class="time">{{ time.time }}</p>
                      </div>-->
                      <div class="timing-slot">
                        <p class="time">{{ time.time }}</p>
                        <p v-if="time.openstatus > 55" class="pt-3">
                          {{ allLanguageData.ShowTypes[0] }}
                          <!-- &nbsp;{{ time.openstatus }}% -->
                        </p>
                        <p
                          v-if="time.openstatus > 20 && time.openstatus < 54"
                          class="pt-3"
                        >
                          {{ allLanguageData.ShowTypes[1] }}
                          <!-- &nbsp;{{ time.openstatus }}% -->
                        </p>
                        <p
                          v-if="time.openstatus > 0 && time.openstatus < 19"
                          class="pt-3"
                        >
                          {{ allLanguageData.ShowTypes[2] }}
                          <!-- &nbsp;{{ time.openstatus }}% -->
                        </p>
                      </div>
                      <div
                        class="filling"
                        :style="{
                          height: parseFloat(time.openstatus) - 50 + '%'
                        }"
                      ></div>
                    </li>
                  </ul>
                </div>
                <p class="pt-2 eTitle eTitleblack mb-0">
                  {{ allLanguageData.Synopsis }}
                </p>
                <div class="eTitle font-weight-normal pt-2">
                  {{ showtimeDiv.plot }}
                </div>
                <p class="pt-2 eTitle eTitleblack mb-0">
                  {{ allLanguageData.Rated }}
                </p>
                <div class="eTitle font-weight-normal pt-2">
                  {{ showtimeDiv.rated }}
                </div>
                <p class="pt-2 eTitle eTitleblack mb-0">
                  {{ allLanguageData.Language }}
                </p>
                <div class="eTitle font-weight-normal pt-2">
                  {{ showtimeDiv.language }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        v-else-if="AllMovieDetails.length == 0"
        class="text-center font-weight-bold text-white"
      >
        No Shows Found
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
    -->
  </div>
</template>

<script>
import { makeRequest } from '@/helper/internet.js'
import moment from 'moment'
import { EventBus } from '@/main'

import {
  getArrayListByKey,
  getMovieDateList,
  dateSort,
} from '@/helper/collection'

export default {
  name: 'browseByCinema',
  metaInfo: {
    title: 'Browse By Cinema',
  },

  beforeCreate: function () {
    let pre = window.localStorage.getItem('PREIMERE')
    if (pre == null || pre == 'false' || pre == false) {
      document.body.className = 'img-section'
    } else {
      document.body.className = 'gold-img-section'
    }
  },

  data () {
    return {
      ShowTerms: [],
      AllMovieDetails: [],
      preimere: false,
      showActiveTime: null,
      cinemaId: '',
      shows: [],
      nowShowingMovies: [],
      allShows: [],
      cinemaDateList: [],
      cinemaFormatList: [],
      cinemaTimeList: [],
      allCinemaTimeList: [],
      cinemasList: [],
      AllCinemasList: [],
      selectCinema: 'Select Cinema',
      isCinemaChange: false,
      languageList: [
        {
          id: '10000',
          Title: 'All',
          Code: 'All',
        },
      ],
      langVal: 'All Languages',
      selectedExp: 'All Experience',
      selectedDate: 'Select Date',
      formats: [],
      movieDates: [],
      languages: [],
      moviesCategoryTitle: '',
      firstDate: '',
      selectedTimeID: '',
      selectedMovieId: '',
    }
  },
  // beforeDestroy() {
  //   window.localStorage.removeItem("cinemaD");
  // },
  beforeMount () {
    const { cinemaId } = this.$route.params
    console.log(this.$route.params)

    // this.fetchCinemasList(cinemaId);
    // this.getAllShowsOnLoad(cinemaId);

    // EventBus.$on("DATA_PUBLISHED", (e) => {
    //   alert("b");
    //   this.firstDate = e;
    // });
    // this.selectedDate = window.localStorage.getItem("cinemaD");
    // console.log(
    //   'window.localStorage.getItem("cinemaD"); :>> ',
    //   window.localStorage.getItem("cinemaD")
    // );
    // const { CinamaD } = window.localStorage.getItem("cinemaD");
    this.getAllShows(cinemaId)
    this.fetchCinemasList(cinemaId)
  },
  mounted: function () {
    this.preimere = window.localStorage.getItem('PREIMERE')
  },
  computed: {
    // currentSelectedDate(){
    //   return moment(selectedDate).format("DD-MM-YYYY");
    // }
  },
  methods: {
    onSelectCinema: function (cinema) {
      this.AllMovieDetails = []
      this.formats = []
      this.languages = []
      this.movieDates = []
      this.langVal = 'All Languages'
      this.selectedExp = 'All Experience'
      this.selectedDate = cinema.cinemashowdate
      this.isCinemaChange = true
      this.selectCinema = cinema.CinemaName
      this.cinemaId = cinema.CinemaID
      this.getAllShows(this.cinemaId)
    },

    onSelectFormat: function (format, type) {
      if (type === 'All') {
        this.selectedExp = 'All Experience'
      } else if (type === 'Normal') {
        this.selectedExp = format.Metacritic
      }
      this.getAllShows(this.cinemaId)
    },
    OnSelectDate: function (cinemaDate) {
      this.selectedDate = cinemaDate.Shoedatedp
      this.getAllShows(this.cinemaId)
    },
    onSelectLanguage: function (lang, type) {
      if (type === 'All') {
        this.langVal = 'All Languages'
      } else if (type === 'Normal') {
        this.langVal = lang.LanguageName
      }
      this.getAllShows(this.cinemaId)
    },
    fetchCinemasList: function (cinemaId) {
      let payload = {}
      // GetAllCinemasList
      makeRequest('/GetCinemas/', 'POST', null, payload)
        .then(result => {
          const { error, res } = result
          const { data } = res.data
          if (!error) {
            this.cinemasList = res.data.Data
            this.cinemasList.map(cinema => {
              if (cinema.CinemaID == cinemaId) {
                this.selectCinema = cinema.CinemaName
                this.cinemaId = cinema.CinemaID
              }
            })
          }
        })
        .catch(error => {
          // console.log("Error on vue front", error);
        })
    },

    getAllShows: function (cinemaId) {
      this.showLoading()

      if (this.selectedDate == 'Select Date') {
        if (
          this.isCinemaChange == false &&
          window.localStorage.getItem('cinemaD')
        ) {
          this.selectedDate = window.localStorage.getItem('cinemaD')
        } else {
          var currentDate = new Date()
          var formatted_date = new Date()
            .toJSON()
            .slice(0, 10)
            .replace(/-/g, '-')
          let dArrNew = formatted_date.split('-')
          this.selectedDate = dArrNew[2] + '-' + dArrNew[1] + '-' + dArrNew[0]
        }
      }

      this.AllMovieDetails = []
      let dArr = (this.selectedDate || '').split('-')

      let payload = {
        CinemaID: cinemaId || this.cinemaId,
        Metacritic:
          this.selectedExp == 'All Experience' ? '' : this.selectedExp,
        SearchShowdate:
          this.selectedDate == 'Select Date'
            ? this.selectedDate
            : dArr[2] + '-' + dArr[1] + '-' + dArr[0],
        MovieLanguagename: this.langVal == 'All Languages' ? '' : this.langVal,
      }
      // this.showLoading();
      makeRequest('/GetAllShowByBranch', 'POST', null, payload)
        .then(async response => {
          const { error, res } = response
          if (res.data.Status) {
            this.AllMovieDetails = res.data.Shows[0].show
            this.moviesCategoryTitle = res.data.Shows[0].title
            // this.cinemasList = res.data.Cinemas;
            // this.cinemasList.map((cinema) => {
            //   if (cinema.id == cinemaId) {
            //     this.selectCinema = cinema.title;
            //     this.cinemaId = cinema.id;
            //   }
            // });
            this.formats = res.data.Allformate
            this.movieDates = res.data.AllShowDates
            this.languages = res.data.Alllanaguge
            // this.selectedDate = this.movieDates[0].Shoedatedp;

            if (this.selectedDate === 'Select Date') {
              this.selectedDate = this.movieDates[0].Shoedatedp
            }
          }
          this.hideLoading()
        })
        .catch(error => {
          this.hideLoading()

          console.log('Error', error)
        })
    },

    // *****
    onTimeSelect: function (time, movie, index) {
      console.log('moviemoviemoviemoviemoviemovie', movie)
      this.ShowTerms = movie.ShowTerms
      console.log('ShowTermsShowTermsShowTermsShowTerms', this.ShowTerms[0])
      console.log('timetimetimetimetimetimetimetime', time)
      this.selectedTimeID = time.ID
      this.selectedMovieId = movie.id
      this.showActiveTime = index
      this.showRatingTermsPopup()
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
          this.onLetsSelect()
        }
      } else {
        this.onLetsSelect()
      }
    },

    onClickOk: function () {
      this.$refs.ruleOfCountryForShows.hide()
      this.onLetsSelect()
    },

    onClickCancel: function () {
      this.$refs.ruleOfCountryForShows.hide()
    },
    onLetsSelect: function () {
      console.log(
        'String(this.selectedTimeID).length > 0',
        String(this.selectedTimeID).length > 0
      )
      if (String(this.selectedTimeID).length > 0) {
        console.log('this.selectedMovieId', this.selectedMovieId)
        console.log('this.selectedTimeID', this.selectedTimeID)

        this.$router.push({
          name: 'checkout',
          params: {
            movieID: this.selectedMovieId,
            scheduleID: this.selectedTimeID,
            seatLayout: 1,
          },
        })
        // window.location.reload();
      } else {
        this.message =
          this.langName == 'ar'
            ? 'يرجى تحديد وقت العرض الخاص بك'
            : 'Please Select Show time'
      }
    },
    // *****

    // getAllShowsOnLoad: function (cinemaId) {
    //   var currentDate = new Date();
    //   var formatted_date = new Date().toJSON().slice(0, 10).replace(/-/g, "-");
    //   // var formatted_dateNew = moment(formatted_date).format("L");
    //   // var today = moment(formatted_date).format("DD-MM-YYYY");
    //   // this.selectedDate = today;

    //   let payload = {
    //     CinemaID: cinemaId || this.cinemaId,
    //     Metacritic:
    //       this.selectedExp == "Select Experience" ? "2D" : this.selectedExp,
    //     SearchShowdate:
    //       this.selectedDate == "Select Date"
    //         ? formatted_date
    //         : this.selectedDate,
    //     MovieLanguagename:
    //       this.langVal == "Select Language" ? "" : this.langVal,
    //   };
    //   makeRequest("/GetAllShowByBranch", "POST", null, payload)
    //     .then(async (response) => {
    //       const { error, res } = response;
    //       if (res.data.Status) {
    //         this.AllMovieDetails = res.data.Shows[0].show;
    //         this.moviesCategoryTitle = res.data.Shows[0].title;
    //         this.cinemasList = res.data.Cinemas;
    //         this.cinemasList.map((cinema) => {
    //           if (cinema.id == cinemaId) {
    //             this.selectCinema = cinema.title;
    //             this.cinemaId = cinema.id;
    //           }
    //         });

    //         this.formats = await getArrayListByKey(res.data, "format");
    //         this.languages = await getArrayListByKey(
    //           res.data,
    //           "formatlanagugename"
    //         );
    //         const _movieDates = await getMovieDateList(res.data, "disdate");
    //         this.movieDates = await dateSort(_movieDates, '"DD-MM-YYYY"');
    //         this.selectedDate = this.movieDates[0];

    //         // console.log("formatsformats :>> ", this.formats);
    //         // console.log("formatlanguageName :>> ", this.languages);
    //         // console.log("_movieDates_movieDates :>> ", _movieDates);
    //         // console.log("movieDatesmovieDates :>> ", this.movieDates);
    //       }
    //     })
    //     .catch((error) => {
    //       console.log("Error", error);
    //     });
    // },

    // onSelectLanguage: function (lang) {
    //   // this.selectedExp = format;
    //   this.langVal = lang.Title;
    //   if (this.langVal == "All") {
    //     this.nowShowingMovies = this.allShows;
    //   } else {
    //     this.nowShowingMovies = this.allShows.filter((singleMovie) => {
    //       // singleMovie["allCinemaTimeList"] = singleMovie.cinemaTimeList.filter(
    //       //   singleShow => {
    //       //     console.log(
    //       //       singleShow.LanguageName == this.langVal,
    //       //       singleShow,
    //       //       singleShow.LanguageName,
    //       //       this.langVal
    //       //     );
    //       //     return singleShow.LanguageName == this.langVal;
    //       //   }
    //       // );
    //       if (
    //         singleMovie.language.toLowerCase() == this.langVal.toLowerCase()
    //       ) {
    //         return singleMovie;
    //       }
    //     });
    //   }
    // },

    // fetchCinemasList: function (cinemaId) {
    //   let payload = {};
    //   makeRequest("/GetAllCinemasList/", "POST", null, payload)
    //     .then((result) => {
    //       const { error, res } = result;
    //       const { data } = res.data;
    //       if (!error) {
    //         this.cinemasList = res.data.Data;
    //         this.AllCinemasList = res.data.Data;
    //         this.cinemasList.map((cinema) => {
    //           if (cinema.CinemaID == cinemaId) {
    //             this.selectCinema = cinema.CinemaName;
    //             this.cinemaId = cinema.CinemaID;
    //           }
    //         });
    //       }
    //     })
    //     .catch((error) => {
    //       // console.log("Error on vue front", error);
    //     });
    // },

    // getDateList: function (CinemaID, MovieID) {
    //   makeRequest("/GetCinemaDates/", "POST", null, {
    //     CinemaID,
    //     MovieID,
    //   })
    //     .then((response) => {
    //       const { error, res } = response;
    //       if (res.data.Status) {
    //         if (res.data.Dates.length > 0) {
    //           this.cinemaDateList = res.data.Dates;
    //           this.selectedDate = res.data.Dates[0].disdate;

    //           this.languageList = res.data.Language;
    //           this.languageList.push({
    //             id: "10000",
    //             Title: "All",
    //             Code: "All",
    //           });
    //           // this.langVal = res.data.Language[0].Title;
    //           this.cinemaDateList = this.cinemaDateList.filter((x, index) => {
    //             return index < 7;
    //           });
    //           this.getFormatAndTimeList(
    //             res.data.Dates[0].ID,
    //             MovieID,
    //             CinemaID
    //           );
    //         }
    //       }
    //     })
    //     .catch((error) => {
    //       console.log("Error", error);
    //     });
    // },

    // getFormatAndTimeList: function (DateID, MovieID, CinemaID) {
    //   makeRequest("/GetCinemaSchedule/", "POST", null, {
    //     DateID,
    //     MovieID,
    //     CinemaID,
    //   })
    //     .then((response) => {
    //       const { error, res } = response;
    //       if (res.data.Status) {
    //         if (
    //           res.data.Data.length > 0 &&
    //           res.data.Data[0].timings.length > 0
    //         ) {
    //           this.selectedExp = res.data.Data[0].Formats[0];
    //           this.cinemaFormatList.push(res.data.Data[0].Formats[0]);
    //           this.nowShowingMovies.map((x, index) => {
    //             if (x.id == MovieID) {
    //               x["cinemaTimeList"] = [];
    //               x["cinemaTimeList"] = res.data.Data[0].timings;
    //               x["currentFormat"] = this.selectedExp;
    //             }
    //             return x;
    //           });
    //           this.cinemaFormatList = [...new Set(this.cinemaFormatList)];
    //         }

    //         // this.nowShowingMovies.filter(x => {
    //         //   x["currentFormat"] = this.selectedExp;
    //         //   return x;
    //         // });

    //         this.nowShowingMovies.map((singleMovie) => {
    //           if (singleMovie.hasOwnProperty("cinemaTimeList")) {
    //             singleMovie[
    //               "allCinemaTimeList"
    //             ] = singleMovie.cinemaTimeList.filter((singleShow) => {
    //               return singleShow.format == this.selectedExp;
    //             });
    //           }
    //         });
    //       }

    //       this.hideLoading();
    //     })
    //     .catch((error) => {
    //       console.log("Error", error);
    //     });
    // },
    // onTimeSelect: function (time, movie, index) {
    //   this.showActiveTime = index;
    //   this.$router.push({
    //     name: "checkout",
    //     params: {
    //       movieID: movie.id,
    //       scheduleID: time.id,
    //       seatLayout: 1,
    //     },
    //   });
    // },
  },
}
</script>

<style scoped>
.browse-cinema .emp-dropdown .dropdown-menu.show::after {
  top: -5px;
  content: "";
  left: 10px;
  z-index: -1;
  width: 20px;
  height: 20px;
  display: block;
  position: absolute;
  background-color: #fff;
  transform: rotate(-45deg);
}

.browse-cinema .dropdown-menu {
  transform: translate3d(0px, 40px, 0px) !important;
}
.pointer-none {
  pointer-events: none;
}
</style>
