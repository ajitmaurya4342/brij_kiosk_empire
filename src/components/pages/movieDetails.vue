<template>
  <div>
    <!-- MOVIE BANNER/VIDEO -->
    <section class="container-fluid px-0 bg-success">
      <slick
        ref="MovieSlider"
        :options="langName == 'ar' ? ArmovieSlider : movieSlider"
        class="movieDetail-slider"
        v-bind:class="langName == 'ar' ? 'er-movieDetail-slider' : ''"
      >
        <!-- v-for="(item, index) in movieDetails"
          :key="index"
          v-if="index == 0" -->
        <div style="position: relative">
          <div class="mdImg">
            <img
              :src="movieDetails.movie_poster_img"
              lazy="loading"
              class="lazy-load-class img-fluid mx-auto w-100 md-img d-none d-lg-block"
              v-bind:alt="movieDetails.title"
            />
            <img
              :src="movieDetails.movie_poster_img"
              lazy="loading"
              class="lazy-load-class-mob img-fluid mx-auto w-100 md-img d-lg-none"
              v-bind:alt="movieDetails.title"
            />
          </div>

          <div class="md-playBtn">
            <a
              to
              data-fancybox
              :href="'https://youtu.be/' + movieDetails.Youtube"
              v-if="movieDetails.Youtube"
              ><img
                src="@/assets/img/play-circle-regular.svg"
                height="50"
                width="50"
                alt=""
            /></a>
          </div>
        </div>
      </slick>
    </section>

    <!-- MOVIE INFORMATION -->
    <!-- <section class="newEmpGreyBG py-3 mt-md-5">
      <div class="col-md-11 mx-auto">
        <div class="row">
          <div class="col-md-6 mb-4 mb-md-0">
            <div class="movie-tiitle">
              <h2 class="text-uppercase mb-2">
                {{ movieDetails.title.replace(/\([^.]+$/, "") }}
                <span class="small">({{ movieDetails.rated }})</span>
              </h2>
              <div class="row mb-3">
                <div class="col-6">
                  <p class="mb-1">{{ movieDetails.genre }}</p>
                  <p class="mb-1">{{ movieDetails.release }}</p>
                </div>

                <div class="col-6 red-LB">
                  <p class="mb-1">{{ movieDetails.runtime }}</p>
                  <p class="mb-1">{{ movieDetails.lang }}</p>
                </div>
              </div>

              <div>
                <ul class="list-inline mb-0 md-format-list">
                  <li
                    class="list-inline-item p-1 mb-2"
                    v-for="(format, formatKey) in movieDetails.format"
                    :key="formatKey"
                  >
                    {{ format }}
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div class="col-md-6">
            <p
              class="movie-desc mb-0 d-none d-md-block"
              v-html="movieDetails.plot"
            ></p>
            <div class="movie-plot d-md-none" v-b-toggle.collapse-2>
              See more <span class="md-arrow"></span>
            </div>
            <b-collapse id="collapse-2">
              <b-card>
                <p class="movie-desc mb-0" v-html="movieDetails.plot"></p
              ></b-card>
            </b-collapse>
          </div>
        </div>
      </div>
    </section> -->

    <div class="movieDesBox pb-1">
      <div class="col-md-11 pb-2 mx-auto my-3">
        <div class="row">
          <div class="col-md-6 mb-3 mb-md-0 mov-det">
            <div class="movie-tiitle mb-2">
              <h2 class="text-uppercase">
                {{ movieDetails.title.replace(/\([^.]+$/, "") }}
                <span class="small" v-if="movieDetails.rated"
                  >({{ movieDetails.rated }})</span
                >
              </h2>
            </div>
            <div>
              <ul class="list-inline mb-2 md-format-list">
                <li
                  class="list-inline-item px-1 mb-1"
                  v-for="(format, formatKey) in movieDetails.Movieformate"
                  :key="formatKey"
                >
                  {{ format }}
                </li>
              </ul>
            </div>
            <div class="row pl-3">
              <div class="red-LB col-4 col-lg mb-3">
                <h5>{{ allLanguageData.Genre }}</h5>
                <p>{{ movieDetails.genre }}</p>
              </div>
              <div class="red-LB col-4 col-lg mb-3">
                <h5>{{ allLanguageData.Runtime }}</h5>
                <p>{{ movieDetails.runtime }} mins</p>
              </div>
              <div class="red-LB col-4 col-lg mb-3">
                <h5>{{ allLanguageData.Releasing }}</h5>
                <p>{{ movieDetails.release }}</p>
              </div>
              <div
                class="red-LB col-4 col-lg mb-3"
                v-bind:class="langName == 'ar' ? 'mr-auto' : ''"
              >
                <h5>{{ allLanguageData.Language }}</h5>
                <p>{{ movieDetails.language }}</p>
              </div>
            </div>
          </div>
          <div class="col-md-6 align-self-center read-more-text">
            <div class="d-none d-md-block">
              <read-more
                class="mb-0"
                more-str="read more"
                less-str="read less"
                :text="movieDetails.plot"
                :max-chars="120"
                link="#"
              ></read-more>
            </div>

            <div class="movie-plot d-md-none" v-b-toggle.collapse-2>
              Show more info <span class="md-arrow"></span>
            </div>
            <b-collapse id="collapse-2">
              <b-card>
                <p class="movie-desc mb-0" v-html="movieDetails.plot"></p
              ></b-card>
            </b-collapse>
          </div>
        </div>
      </div>
    </div>
    <!-- MD - CINEMA AND TIME SELECTION -->
    <section class="py-3 mt-md-2">
      <div class="col-md-8 col-lg-6 ml-auto md-multiselectSelect">
        <div class="row">
          <div class="col-12 col-md-6 mb-3 mb-md-0 MDlocation">
            <!-- <label class="typo__label font-weight-bold">Location</label> -->
            <multiselect
              v-model="locationValue"
              :options="locationDrop"
              deselect-label="Select"
              :allow-empty="false"
              placeholder="Location"
              @input="updateValueAction()"
              openDirection="below"
              :searchable="false"
            ></multiselect>
          </div>

          <div class="col-12 col-md-6 MDexp">
            <!-- <label class="typo__label font-weight-bold">Experience</label> -->
            <multiselect
              @input="updateValueAction()"
              v-model="expValue"
              :options="expDrop"
              :allow-empty="false"
              deselect-label="Select"
              placeholder="Experience"
              openDirection="below"
              :searchable="false"
            ></multiselect>
          </div>
        </div>
      </div>
    </section>

    <!-- MD - DATE SELECTION -->
    <section class="newEmpGreyBG py-4 mt-md-2">
      <div class="col-md-11 mx-auto">
        <div>
          <ul class="select-date pb-2">
            <li
              class="list-inline-item"
              v-for="(dateInfo, dateKey) in showAllDateList"
              :key="dateKey"
              v-on:click="scheduleDate(dateInfo.Showdatedp)"
            >
              <!-- this.finalSelectedDate -->
              <div
                class="date-container d-flex align-items-center text-left"
                :class="
                  finalSelectedDate == dateInfo.Showdatedp ? 'active' : ''
                "
              >
                <!-- v-bind:class="{ active: selectedDate === dateInfo.ID }" -->
                <div class="date">{{ dateInfo.DateOnly }}</div>
                <div style="line-height: 1">
                  <div class="day">{{ dateInfo.MonthYear }}</div>
                  <div class="day">{{ dateInfo.Day }}</div>
                  <span
                    class="fs-11 pl-1 font-weight-bold"
                    v-if="finalSelectedDate == dateInfo.Showdatedp"
                    >Selected</span
                  >
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </section>

    <!-- MD - CINEMA LIST AND SHOWTIMING ACCORDING -->

    <!-- {{ allCinemas }} -->
    <section
      class="py-3 mt-md-5 md-accordion"
      v-if="Object.keys(ShowCinemaData).length > 0"
    >
      <div class="col-md-11 mx-auto">
        <div
          class="accordion mb-3"
          role="tablist"
          v-for="(cinemaData, cinemaKey) in ShowCinemaData"
          :key="cinemaKey"
        >
          <b-card no-body class="mb-1">
            <b-card-header header-tag="header" class="p-1" role="tab">
              <b-button
                block
                v-b-toggle="'accordion-' + cinemaKey"
                variant="none"
                >{{ cinemaData.CinemaName }}</b-button
              >
            </b-card-header>
            <b-collapse
              :id="'accordion-' + cinemaKey"
              accordion="my-accordion"
              role="tabpanel"
              :visible="ShowCinemaData.length == 1"
            >
              <b-card-body class="pb-0">
                <div
                  class="mb-4 border-bottom"
                  v-for="(showData, showDataKey) in cinemaData.languageArray"
                  :key="showDataKey"
                >
                  <h5 class="md-lang text-uppercase">{{ showData.ID }}</h5>
                  <div
                    v-for="(format, formatKey) in showData.formatArray"
                    :key="formatKey"
                  >
                    <span class="md-exp">{{ format.title }}</span>
                    <h6 class="font-weight-bold font-italic mt-2">
                      Select Time >>
                    </h6>
                    <ul class="list-inline md-date-list mb-0">
                      <li
                        class="list-inline-item"
                        v-for="(showDT, showDTKey) in format.Showtimearray"
                        :key="showDTKey"
                      >
                        <div
                          class="time-box mb-2"
                          :class="showDT.ID == selectedTimeID ? 'active' : ''"
                          @click="
                            onTimeSelect(
                              showDT,
                              cinemaKey,
                              showDataKey,
                              formatKey,
                              showDTKey
                            )
                          "
                        >
                          <p class="mb-0">{{ showDT.time }}</p>
                          <p
                            class="mb-0 time-status"
                            v-if="parseInt(showDT.openstatus) > 55"
                          >
                            available
                          </p>
                          <p
                            class="mb-0 time-status"
                            v-if="
                              parseInt(showDT.openstatus) < 55 &&
                              parseInt(showDT.openstatus) > 1
                            "
                          >
                            filling fast
                          </p>
                          <p
                            class="mb-0 time-status"
                            v-if="
                              parseInt(showDT.openstatus) >= 0 &&
                              parseInt(showDT.openstatus) < 1
                            "
                          >
                            closed
                          </p>
                        </div>
                        <div
                          class="offer-avil-text"
                          v-b-tooltip.hover
                          :title="showDT.offername"
                        >
                          <div v-if="showDT.combotext">
                            <img
                              src="@/assets/img/svg/infoAssetRed.svg"
                              height="15px"
                              width="15px"
                              alt=""
                            />
                            {{ showDT.combotext }}
                          </div>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </b-card-body>
            </b-collapse>
          </b-card>
        </div>
      </div>
    </section>

    <section v-else>
      <h5 class="text-center font-weight-bold py-5 my-5">No Shows available</h5>
    </section>

    <!----------- RULES OF ENTRY MODAL ---------->
    <!-- <button  v-b-modal.ruleOfCountry> click</button> -->
    <div class="ruleofcountrymodal" v-if="ShowTerms[0].RatingImage == true">
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
import { mapState, mapGetters, mapActions } from 'vuex'

export default {
  beforeCreate: function () {
    let pre = window.localStorage.getItem('PREIMERE')
    if (pre == null || pre == 'false' || pre == false) {
      document.body.className = 'non-img'
    } else {
      document.body.className = 'gold-non-img'
    }
  },
  computed: {
    ...mapGetters(['getFilterMovieDetails' ]),
    ShowCinemaData () {
      let array = []
      if (this.allCinemas.length > 0) {
        if (
          this.locationValue != 'All Location' &&
          this.expValue != 'All Experience'
        ) {
          this.allCinemas.map((x) => {
            if (this.locationValue == x.location) {
              let obj = {
                CinemaID: x.CinemaID,
                CinemaName: x.CinemaName,
                location: x.location,
                languageArray: [],
              }

              let count = 0

              x.languageArray.map((lan) => {
                let filterFormat = lan.formatArray.filter((f) => {
                  return f.title == this.expValue
                })

                if (filterFormat.length > 0) {
                  count = 1
                  obj['languageArray'].push({
                    ID: lan.ID,
                    title: lan.title,
                    formatArray: filterFormat,
                  })
                }
              })
              if (count == 1) {
                array.push(obj)
              }
            }
          })
        } else if (this.locationValue != 'All Location') {
          this.allCinemas.map((x) => {
            if (this.locationValue == x.location) {
              array.push(x)
            }
          })
        } else if (this.expValue != 'All Experience') {
          this.allCinemas.map((x) => {
            let obj = {
              CinemaID: x.CinemaID,
              CinemaName: x.CinemaName,
              location: x.location,
              languageArray: [],
            }
            let count = 0
            x.languageArray.map((lan) => {
              let filterFormat = lan.formatArray.filter((f) => {
                return f.title == this.expValue
              })
              if (filterFormat.length > 0) {
                let count = 1
                obj['languageArray'].push({
                  ID: lan.ID,
                  title: lan.title,
                  formatArray: filterFormat,
                })
                array.push(obj)
              }
            })
            if (count == 1) {
              array.push(obj)
            }
          })
        } else {
          array = this.allCinemas
        }
      }
      return array
    },

    checkVisibleSeat () {
      if (
        (this.cinemaFormatList.indexOf('Opera & Ballet') >= 0 &&
          (this.preimere == 'true' || this.preimere == true)) ||
        this.cinemaFormatList.indexOf('German Film Week 2019') >= 0
      ) {
        return true
      } else {
        return false
      }
    },
  },
  data () {
    return {
      finalSelectedDate: '',
      onclickSelectedDate: '',
      tempAllShowData: [],
      locationValue: 'All Location',
      expValue: 'All Experience',
      locationDrop: [],
      expDrop: [],
      preimere: false,
      showActiveTime: null,
      MovieID: null,
      FormatID: null,
      allCinemas: [],
      ShowTerms: [],
      ArmovieSlider: {
        arrows: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        dots: true,
        rtl: true,
      },
      movieSlider: {
        arrows: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        dots: true,
        rtl: false,
      },
      movieDetails: {
        id: null,
        title: '',
        lang: '',
        release: '',
        rated: '',
        runtime: '',
        genre: '',
        Starring: '',
        movie_card_img: '',
        movie_card_banner: '',
        IMDBRating: '',
        favourite: false,
        plot: '',
        format: [],
        youtube: [],
        Headers: [],
        cast: [],
      },
      message: '',
      movieCinemaList: [],
      formatLanguageList: [],
      formatLanguageName: [],
      cinemaList: [],
      showAllDateList: [],
      cinemaDateList: [],
      cinemaFormatList: [],
      cinemaTimeList: [],
      allCinemaTimeList: [],
      expArray: [
        {
          experience: '2D',
        },
        {
          experience: '3D',
        },
        {
          experience: '4DX',
        },
      ],
      newData: [
        {
          cinema_id: 1,
          cinema_title: 'PVR',
          languageArray: [
            {
              title: 'English',
              formatArray: [
                {
                  title: '2D',
                  showTime: [
                    {
                      Time: '2:00 PM',
                    },
                    {
                      Time: '3:00 PM',
                    },
                  ],
                },
                {
                  title: '3D',
                  showTime: [
                    {
                      Time: '12:00 PM',
                    },
                    {
                      Time: '1:00 PM',
                    },
                  ],
                },
              ],
            },
            {
              title: 'Arabic',
              formatArray: [
                {
                  title: '2D',
                  showTime: [
                    {
                      Time: '2:00 PM',
                    },
                    {
                      Time: '3:00 PM',
                    },
                  ],
                },
                {
                  title: '3D',
                  showTime: [
                    {
                      Time: '12:00 PM',
                    },
                    {
                      Time: '1:00 PM',
                    },
                  ],
                },
              ],
            },
          ],
        },

        {
          cinema_id: 1,
          cinema_title: 'PVR',
          languageArray: [
            {
              title: 'English',
              formatArray: [
                {
                  title: '2D',
                  showTime: [
                    {
                      Time: '2:00 PM',
                    },
                    {
                      Time: '3:00 PM',
                    },
                  ],
                },
                {
                  title: '3D',
                  showTime: [
                    {
                      Time: '12:00 PM',
                    },
                    {
                      Time: '1:00 PM',
                    },
                  ],
                },
              ],
            },
            {
              title: 'Arabic',
              formatArray: [
                {
                  title: '2D',
                  showTime: [
                    {
                      Time: '2:00 PM',
                    },
                    {
                      Time: '3:00 PM',
                    },
                  ],
                },
                {
                  title: '3D',
                  showTime: [
                    {
                      Time: '12:00 PM',
                    },
                    {
                      Time: '1:00 PM',
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],

      dateArray: [
        {
          date: '12',
          day: 'SUN',
        },
        {
          date: '13',
          day: 'MON',
        },
        {
          date: '14',
          day: 'TUE',
        },
        {
          date: '15',
          day: 'WED',
        },
        {
          date: '16',
          day: 'THU',
        },
        {
          date: '17',
          day: 'FRI',
        },
      ],
      selectedCinema: '',
      selectedDate: '',
      selectedExp: '',
      selectedLang: '',
      selectedTimeID: '',
      selectedMovieId: '',
      title: 'Movie Details Page',
    }
  },
  metaInfo () {
    return {
      title: this.title,
    }
  },
  beforeMount () {
    const { movieId, formatId } = this.$route.params
    if (movieId) {
      this.MovieID = movieId
      this.getAllMovieDetails(movieId)
    } else {
      this.$router.go(-1)
    }
    if (movieId && formatId) {
      this.getMovieDetails(movieId, formatId)
      // this.getAllMovieDetails(movieId);
      this.MovieID = movieId
      this.FormatID = formatId
    } else {
      this.$router.go(-1)
    }
  },
  watch: {
    $route (to, from) {
      const { movieId, formatId } = this.$route.params
      if (movieId && formatId) {
        this.getMovieDetails(movieId, formatId)
        this.MovieID = movieId
        this.FormatID = formatId
      } else {
        this.$router.go(-1)
      }
    },
  },
  mounted: function () {
    if (this.langName == 'ar') {
      this.title = 'صفحة تفاصيل الفيلم'
    }
    this.preimere = window.localStorage.getItem('PREIMERE')
  },
  methods: {
    updateValueAction: function () {
      this.showLoading()
      setTimeout(() => {
        this.hideLoading()
      }, 500)
    },
    scheduleDate: function (showDate) {
      this.showLoading()
      try {
        this.finalSelectedDate = showDate
        console.log('this.te', this.tempAllShowData)
        console.log('showDateshowDateshowDate', showDate)
        let array = []
        this.tempAllShowData.map((x) => {
          let obj = {
            CinemaID: x.CinemaID,
            CinemaName: x.CinemaName,
            location: x.location,
            languageArray: [],
          }
          let count = 0
          x.languageArray.map((lan, lan_index) => {
            obj['languageArray'].push({
              ID: lan.ID,
              title: lan.title,
              formatArray: [],
            })
            lan.formatArray.map((f, f_index) => {
              let filterNweww = f.Showtimearray.filter((sd) => {
                return sd.disdate == showDate
              })
              if (filterNweww.length > 0) {
                count = 1
                obj['languageArray'][lan_index]['formatArray'].push({
                  title: f.title,
                  Showtimearray: filterNweww,
                })
              }
            })
            if (count == 1) {
              array.push(obj)
            }
          })
        })
        // this.hideLoading();
        setTimeout(() => {
          this.hideLoading()
        }, 500)

        this.allCinemas = array
        // this.hideLoading();
      } catch (error) {
        console.log('error', error)
      }
      // if (showDate) {
      //   this.showLoading();
      // }
      // this.showLoading();
    },

    // ******************************************************
    onTimeSelect: function (time, cindex, langIndex, fIndex, index) {
      // this.allCinemas[cindex].languageArray[langIndex].formatArray.map((x) => {
      //      this.allCinemas.map((x) => {

      //   x.Showtimearray.map((y) => {
      //     y.status = false;
      //   });
      // });

      // this.allCinemas[cindex].languageArray[langIndex].formatArray[
      //   fIndex
      // ].Showtimearray[index].status = this.allCinemas[cindex].languageArray[
      //   langIndex
      // ].formatArray[fIndex].Showtimearray[index].status
      //   ? false
      //   : true;
      console.log('this.CountryID', this.CountryID)
      if (this.CountryID == 102 || this.CountryID == '102') {
        console.log('object111')
      } else {
        console.log('object222')
        this.selectedTimeID = time.ID
        this.selectedMovieId = this.MovieID
        this.showRatingTermsPopup()
      }
    },
    showRatingTermsPopup: function () {
      // console.log('this.ShowTerms', this.ShowTerms)
      if (this.ShowTerms.length > 0) {
        if (
          this.ShowTerms[0].CountryID == 230 ||
          this.ShowTerms[0].CountryID == '230'
        ) {
          this.$root.$emit('bv::show::modal', 'ruleOfCountryForShows')
          // this.$ref.ruleOfCountryForShows.show();
          // this.$refs['ruleOfCountryForShows'].show();
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
      if (String(this.selectedTimeID).length > 0) {
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
    // ************************************************
    // onTimeSelect: function (time, index) {
    //   this.selectedTimeID = time.id;
    //   this.showActiveTime = index;
    // },
    // showRatingTermsPopup: function () {
    //   if (this.ShowTerms.length > 0) {
    //     if (
    //       this.ShowTerms[0].CountryID == 230 ||
    //       this.ShowTerms[0].CountryID == "230"
    //     ) {
    //       this.$root.$emit("bv::show::modal", "ruleOfCountryForShows");
    //       //this.$ref.ruleOfCountry.show();
    //     } else {
    //       this.onLetsSelect();
    //     }
    //   } else {
    //     this.onLetsSelect();
    //   }
    // },

    // onClickOk: function () {
    //   this.$refs.ruleOfCountryForShows.hide();
    //   this.onLetsSelect();
    // },

    // onClickCancel: function () {
    //   this.$refs.ruleOfCountryForShows.hide();
    // },
    // onLetsSelect: function () {
    //   window.localStorage.setItem("isQrCodeKey", "normal");
    //   if (this.selectedCinema == "6" || this.selectedCinema == 6) {
    //     window.localStorage.setItem("PREIMERE", true);
    //   }
    //   if (String(this.selectedTimeID).length > 0) {
    //     this.$router.push({
    //       name: "checkout",
    //       params: {
    //         movieID: this.MovieID,
    //         scheduleID: this.selectedTimeID,
    //         seatLayout: 1,
    //       },
    //     });
    //     window.location.reload();
    //   } else {
    //     this.message =
    //       this.langName == "ar"
    //         ? "يرجى تحديد وقت العرض الخاص بك"
    //         : "Please Select Show time";
    //   }
    // },
    getMovieDetails: function (MovieID, FormatID) {
      // this.showLoading();
      // makeRequest("/GetShowDetails/", "POST", null, { MovieID, FormatID })
      //   .then((response) => {
      //     const { error, res } = response; // console.log("Show details", res);
      //     if (res.data.Status && res.data.Show.length > 0) {
      //       Object.assign(this.movieDetails, res.data.Show[0]);
      //       this.title = this.movieDetails.title;
      //       this.ShowTerms = res.data.ShowTerms;
      //       // console.log("Show Ters", this.ShowTerms[0].CountryID);
      //       if (res.data.Cinema.length > 0) {
      //         this.cinemaList = res.data.Cinema;
      //         this.selectedCinema = res.data.Cinema[0].ID;
      //         this.getDateList(res.data.Cinema[0].ID, this.MovieID);
      //       }
      //       this.$refs.MovieSlider.destroy();
      //       this.$nextTick(() => {
      //         this.$refs.MovieSlider.create();
      //         this.$refs.MovieSlider.goTo(1, true); // if (this.langName == "ar") { //   this.movieSlider.rtl = true; // } else { //   this.movieSlider.rtl = false; // }
      //       });
      //     }
      //   })
      //   .catch((error) => {
      //     console.log("Error", error);
      //   });
    },

    getAllMovieDetails: function (movieIdValue) {
      let payload = {
        SearchMovieID: movieIdValue,
      }
      this.showLoading()
      makeRequest('/GetmovieData/', 'POST', null, payload)
        .then((response) => {
          const { error, res } = response // console.log("Show details", res);
          if (res.data.Status && res.data.ShowData.length > 0) {
            this.hideLoading()
            // this.allCinemas = res.data.ShowData;
            // console.log("this.allCinemas", this.allCinemas);

            this.ShowTerms = res.data.MovieData[0].ShowTerms

            this.showAllDateList = res.data.all_available_dates
            this.showAllDateList = this.showAllDateList.filter((x, index) => {
              return index < 7
            })

            let locationArry = ['All Location' ]
            let exparray = ['All Experience' ]

            res.data.ShowData.map((x) => {
              let findIndex1 = locationArry.indexOf(x.location)
              if (findIndex1 < 0) {
                locationArry.push(x.location)
              }
              x.languageArray.map((lan) => {
                console.log('lanlanlanlan', lan)
                lan.formatArray.map((f) => {
                  let findIndex2 = exparray.indexOf(f.title)
                  if (findIndex2 < 0) {
                    exparray.push(f.title)
                  }

                  f.Showtimearray.map((time1) => {
                    time1['status'] = false
                  })
                })
              })
              this.tempAllShowData.push(x)
            })

            console.log('this.tempAllShowData', this.tempAllShowData)
            this.locationDrop = locationArry
            this.expDrop = exparray

            if (this.getFilterMovieDetails) {
              if (this.getFilterMovieDetails.filterfomateID != '') {
                this.expValue = this.getFilterMovieDetails.filterfomateID
              }
            }

            // if (this.locationDrop.length < 2) {
            //   this.locationValue = this.locationDrop[1];
            // }

            this.scheduleDate(res.data.all_available_dates[0].Showdatedp)

            this.movieDetails = res.data.MovieData[0]

            this.$refs.MovieSlider.destroy()
            this.$nextTick(() => {
              this.$refs.MovieSlider.create()
              this.$refs.MovieSlider.goTo(1, true) // if (this.langName == "ar") { //   this.movieSlider.rtl = true; // } else { //   this.movieSlider.rtl = false; // }
            })
          }
          // this.hideLoading();
        })
        .catch((error) => {
          this.hideLoading()
          console.log('Error', error)
        })
    },

    OnSelectExp (data) {
      this.selectedExp = data
      this.cinemaTimeList = this.allCinemaTimeList.filter((x) => {
        return (
          x.format === this.selectedExp && x.LanguageID === this.selectedLang
        )
      })
    },
    OnSelectLang (lang) {
      this.selectedLang = lang
      this.cinemaTimeList = this.allCinemaTimeList.filter((x) => {
        return x.format === this.selectedExp && x.LanguageID == lang
      })
    },
    onSelectCinema (data) {
      // if (data.ID == 6 || data.ID == "6") {
      //   window.localStorage.setItem("PREIMERE", true);
      //   window.location.reload();
      // } else {
      this.selectedCinema = data.ID
      this.getDateList(data.ID, this.MovieID) // }
    },
    getDateList: function (CinemaID, MovieID) {
      makeRequest('/GetCinemaDates/', 'POST', null, {
        CinemaID,
        MovieID,
      })
        .then((response) => {
          const { error, res } = response
          if (res.data.Status) {
            if (res.data.Dates.length > 0) {
              this.cinemaDateList = res.data.Dates
              this.selectedDate = res.data.Dates[0].ID
              this.cinemaDateList = this.cinemaDateList.filter((x, index) => {
                return index < 7
              })
              this.getFormatAndTimeList(
                res.data.Dates[0].ID,
                this.MovieID,
                CinemaID
              )
            } else {
              this.cinemaDateList = []
              this.cinemaFormatList = []
              this.allCinemaTimeList = []
              this.cinemaTimeList = []
            } // if (res.data.Format.length > 0) { //   this.cinemaFormatList = res.data.Format; // }
          }
        })
        .catch((error) => {
          console.log('Error', error)
        })
    },
    getFormatAndTimeList: function (DateID, MovieID, CinemaID) {
      makeRequest('/GetCinemaSchedule/', 'POST', null, {
        DateID,
        MovieID,
        CinemaID,
      })
        .then((response) => {
          const { error, res } = response
          if (res.data.Status) {
            if (
              res.data.Data.length > 0 &&
              res.data.Data[0].timings.length > 0
            ) {
              this.cinemaFormatList = res.data.Data[0].Formats // console.log(this.cinemaFormatList,"fsdfsd");
              this.formatLanguageList = res.data.Data[0].formatlanaguges
              this.formatLanguageName = res.data.Data[0].formatlanagugename
              this.cinemaTimeList = res.data.Data[0].timings
              this.allCinemaTimeList = res.data.Data[0].timings
              this.selectedExp = res.data.Data[0].Formats[0]
              this.selectedLang = res.data.Data[0].formatlanaguges[0]
            }
            this.cinemaTimeList = this.allCinemaTimeList.filter((x) => {
              return (
                x.format === this.selectedExp &&
                x.LanguageID == this.selectedLang
              )
            })
          }
          this.hideLoading()
        })
        .catch((error) => {
          console.log('Error', error)
        })
    },
    OnSelectDate (data) {
      console.log('data%%%%%%%%%%%%%%%', data)
      // this.onclickSelectedDate = data.Showdatedp;
      // this.selectedDate = data.ID;
      // this.getFormatAndTimeList(data.ID, this.MovieID, this.selectedCinema);
    },
  },
}
</script>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style>
.slick-prev,
.slick-next {
   box-shadow: none;
}
.timeslot-diabled {
   pointer-events: none;
}
.ruleofcountrymodal .ruleofcountry {
  border-left: 4px dashed #810c13;
  border-right: 4px dashed #810c13;
}

.ruleofcountrymodal .ruleofcountry .title {
  color: #810c13;
  font-weight: bold;
  text-align: center;
}

.ruleofcountrymodal .ruleofcountry .rule-warning {
  font-size: 12px;
  font-weight: bold;
  color: #d13d48;
}

.ruleofcountrymodal .ruleofcountry .rules-list {
  text-align: center;
  font-size: 14px;
  color: #000;
  font-weight: 600;
}

.btn-green {
  width: 100%;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  line-height: 1;
  font-size: 14px;
  color: #ffffff;
  border-radius: 15px;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  background-color: #87c03f;
}

.btn-green svg {
  fill: #ffffff;
}

.btn-green:hover {
  color: #ffffff;
  background-color: #87c03f;
}
.offer-avil-text {
  font-size: 11px;
  text-align: center;
  line-height: 1;
  font-weight: bold;
  cursor: pointer;
  width: 110px;
  height: 20px;
  overflow-y: auto;
}
</style>
