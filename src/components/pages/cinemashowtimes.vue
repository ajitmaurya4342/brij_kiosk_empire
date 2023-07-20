<template>
  <div class="section-showtime">
    <!--Start Desktop Banner Slider--->
    <section class="section-banner simple-banner d-none d-md-block">
      <slick v-if="movieBanner" ref="banner-slider" :options="bannerSlider">
        <div class="w-100 banner-slider">
          <div class="banner-img">
            <div>
              <img :src="movieBanner" class="image" />
            </div>
          </div>
        </div>
      </slick>
    </section>
    <!--End Desktop Banner Slider--->

    <!--Start Mobile View-->
    <MobileMovieDetails v-if="movieDetails[0]" :movieData="movieDetails" :categoryId="CategoryID" :confirmedMovie="confirmedMovie" />

    <!--End Mobile View-->

    <div class="container" :class="!movieBanner ? 'pt-lg-5 mt-lg-3': ''">
      <div class="mt-lg-4 mt-3 d-none d-md-block">
        <div class="content mb-4">
          <div class="content-title my-3">
            {{ movieName }}
          </div>
          <div class="content-desc">
            {{ movieDescrip }}
          </div>
        </div>
      </div>
    </div>
    <div class="container-fluid" v-if="CategoryID != '2'">
      <div class="row justify-content-center">
        <div class="col-lg-10">
          <div class="mb-4 pb-2">
            <!--Start date Slider-->
            <div class="date-slider empire-slider px-md-4 py-3">
              <slick
                v-if="dateList.length > 0"
                ref="dateSlider"
                :options="dateSlider"
              >
                <div
                  v-for="(dateInfo, dateKey) in dateList"
                  :key="dateKey"
                  v-on:click="setSelectedDate(dateInfo.ss_actual_start_date, dateInfo)"
                >
                  <div
                    class="date-card"
                    :class="
                      selectedDate == null && dateKey == 0
                        ? 'date-card-active'
                        : selectedDate == dateInfo.ss_actual_start_date
                          ? 'date-card-active'
                          : ''
                    "
                  >
                    <div class="month">{{ moment(dateInfo.ss_actual_start_date).locale(getCurrentLang().iso_2 ? getCurrentLang().iso_2 : 'en').format('MMM') }}</div>
                    <div class="date py-1">{{ moment(dateInfo.ss_actual_start_date).locale(getCurrentLang().iso_2 ? getCurrentLang().iso_2 : 'en').format('DD') }}</div>
                    <div class="day">{{moment(dateInfo.ss_actual_start_date).locale(getCurrentLang().iso_2 ? getCurrentLang().iso_2 : 'en').format('ddd') }}</div>
                  </div>
                </div>
              </slick>
              <div v-else>NO SHOWS FOUND</div>
            </div>
            <!--End date Slider-->
            <!--Start QuickBook--->
            <div
              class="row emp-quickbook mx-0"
              v-if="BrijScheduled.length > 0"
            >
              <div class="col-md-2"></div>
              <div class="col-md-8">
                <div
                  class="
                    row
                    align-items-center
                    mt-n1
                    mx-0
                    px-0
                    py-3
                    animate__animated animate__fadeInDown
                  "
                >
                  <div class="col-xl-4 col-lg-6 col-md-6 px-1 mb-2 mb-xl-0">
                    <multiselect
                      :disabled="hideCinemaFilter == true ? true : false"
                      v-model="selectedCinemaValues"
                      :options="confirmedMovie.CinemaArray"
                      :multiple="true"
                      :close-on-select="true"
                      :clear-on-select="false"
                      :preserve-search="true"
                      :placeholder="allLanguageData.QuickBook.selectCinema"
                      :custom-label="getCinemaTranslatedName"
                      track-by="cinema_id"
                      class="custom-multiselect no-scroll"
                      :select-label="''"
                      :deselect-label="''"
                      :selectedLabel="''"
                    >
                      <template
                        slot="selection"
                        slot-scope="{ values, search, isOpen }"
                        ><span
                          class="multiselect__single"
                          v-if="values.length>1 && values.length &amp;&amp; !isOpen"
                          >{{ values.length }} Cinemas</span
                        >
                        <span
                          class="multiselect__single"
                          v-else-if=" values.length &amp;&amp; !isOpen"
                          >{{ getCinemaTranslatedName(values[0]) }}</span
                        ></template
                      >
                    </multiselect>
                    <!-- <b-dropdown
                  variant="default"
                  class="quickbook-dropdown"
                  text="Select Cinema"
                >
                  <b-dropdown-item v-for="(data, Index) in 10" :key="Index"
                    >Cinema One</b-dropdown-item
                  >
                </b-dropdown> -->
                  </div>

                  <div class="col-xl-4 col-lg-6 col-md-6 px-1 mb-2 mb-xl-0">
                    <multiselect
                      class="
                        custom-multiselect
                        scroll-dropdown
                        experience-dropdown
                      "
                      v-model="selectedExpValues"
                      :options="confirmedMovie.FormatArray"
                      :multiple="true"
                      :close-on-select="true"
                      :clear-on-select="false"
                      :preserve-search="true"
                      :placeholder="allLanguageData.QuickBook.selectExp"
                      label="mf_name"
                      track-by="mf_id"
                      :select-label="''"
                      :deselect-label="''"
                      :selectedLabel="''"
                    >
                      <template
                        slot="selection"
                        slot-scope="{ values, search, isOpen }"
                        ><span
                          class="multiselect__single"
                          v-if="values.length > 1 &amp;&amp; !isOpen"
                          >{{ values.length }} Experience</span
                        >
                        <span
                          class="multiselect__single"
                          v-else-if="values.length &amp;&amp; !isOpen"
                          >{{ values[0].mf_name }}</span
                        >
                      </template>
                    </multiselect>
                  </div>
                  <div class="col-xl-4 col-lg-6 col-md-6 px-1">
                    <multiselect
                      v-model="selectedShowTimes"
                      :options="confirmedMovie.sessions"
                      :multiple="true"
                      :close-on-select="true"
                      :clear-on-select="false"
                      :preserve-search="true"
                      :placeholder="allLanguageData.QuickBook.selectShowTimes"
                      label="label"
                      track-by="label"
                      class="custom-multiselect scroll-dropdown"
                      :select-label="''"
                      :deselect-label="''"
                      :selectedLabel="''"
                    >
                      <template
                        slot="selection"
                        slot-scope="{ values, search, isOpen }"
                        ><span
                          class="multiselect__single"
                          v-if="values.length > 1 &amp;&amp; !isOpen"
                          >{{ values.length }} Time</span
                        >
                        <span
                          class="multiselect__single"
                          v-else-if="values.length &amp;&amp; !isOpen"
                          >{{ values[0].label }}</span
                        >
                      </template>
                    </multiselect>
                  </div>
                </div>
              </div>
              <!--  <div class="col-md-2 mb-3 mb-md-0 show-view">
           <div
              class="border-right pr-2"
              v-on:click="showView('list')"
              :class="listView ? 'view-active' : ''"
            >
              <svg viewBox="0 0 18.23 21.56">
                <line class="cls-1" x1="18.23" y1="1.54" x2="5.04" y2="1.54" />
                <line class="cls-1" x1="18.23" y1="7.98" x2="5.04" y2="7.98" />
                <line
                  class="cls-1"
                  x1="18.23"
                  y1="13.47"
                  x2="5.04"
                  y2="13.47"
                />
                <line
                  class="cls-1"
                  x1="18.23"
                  y1="19.92"
                  x2="5.04"
                  y2="19.92"
                />
                <ellipse
                  class="cls-1"
                  cx="1.74"
                  cy="1.78"
                  rx="1.24"
                  ry="1.28"
                />
                <ellipse
                  class="cls-1"
                  cx="1.74"
                  cy="7.78"
                  rx="1.24"
                  ry="1.28"
                />
                <ellipse
                  class="cls-1"
                  cx="1.74"
                  cy="13.78"
                  rx="1.24"
                  ry="1.28"
                />
                <ellipse
                  class="cls-1"
                  cx="1.74"
                  cy="19.77"
                  rx="1.24"
                  ry="1.28"
                />
              </svg>
            </div>
            <div
              class="pl-2"
              v-on:click="showView('grid')"
              :class="gridView ? 'view-active' : ''"
            >
              <svg viewBox="0 0 18.3 19.62">
                <rect
                  class="cls-1"
                  x="0.25"
                  y="0.25"
                  width="7.25"
                  height="7.25"
                />
                <rect
                  class="cls-1"
                  x="0.25"
                  y="12.12"
                  width="7.25"
                  height="7.25"
                />
                <rect
                  class="cls-1"
                  x="10.8"
                  y="0.25"
                  width="7.25"
                  height="7.25"
                />
                <rect
                  class="cls-1"
                  x="10.8"
                  y="12.12"
                  width="7.25"
                  height="7.25"
                />
              </svg>
            </div>
          </div> -->
            </div>
            <!---End QuickBook--->
          </div>
        </div>
      </div>
    </div>
    <div class="container-fluid">
      <div class="row justify-content-center">
        <div class="col-lg-10">
          <!--Desktop View--->
          <div
            class="row emp-showtimes mx-0 mb-5 d-none d-md-block"
            v-if="listView && movieDetails[0]"
          >
            <div
              v-if="filteredFlattenedSchedule"
              class="col-md-12 showtime-list mx-0"
              v-for="(data, index) in filteredFlattenedSchedule"
              :key="index"
            >
              <div class="row mx-0 d-flex align-items-center pt-4 pb-3">
                <div class="col-md-2 px-0">{{ getCinemaTranslatedName(data.schedules[0].cinema) || data.schedules[0].cinema_name }}</div>
                <div class="col-md-3 grid-half align-items-center">
                  <div class="movie-img">
                    <img
                      :src="
                        checkBaseUrl(
                          getLangSpecificAttribute(
                            movieDetails[0].altMovieContent,
                            getCurrentLang().brij_lang_id,
                            'artwork'
                          ) ||
                          movieDetails[0].artwork
                        )
                      "
                      class="image img-fluid"
                    />
                  </div>
                  <div v-bind:class="langName == 'ar' ? 'pr-3' : 'pl-3'">
                    {{ movieName  }}
                  </div>
                </div>
                <div class="col-md-2 ar-number">
                  <div>{{ data.mf_names }}</div>
                </div>
                <div class="col-md-5 px-0">
                  <ul class="list-inline showtimes__time-tag">
                    <li
                      class="list-inline-item time-tag"
                      :class="[schedule.showTime]"
                      v-for="(schedule, indexschedule) in data.schedules"
                      :key="indexschedule"
                      v-b-tooltip.hover
                      :title="`${schedule.screen_name}${schedule.mf_name ? ` - ${schedule.mf_name}` : '' }${schedule.show_timing_label ? ` - ${schedule.show_timing_label}` : '' }`"
                      @click="seatLayoutShowBrij(schedule, data)"
                    >
                      <a class="text-white">
                        {{ moment(schedule.showTime, ["HH.mm"]).locale(getCurrentLang().iso_2 || 'en').format("hh:mm A") }}
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <div class="row showtime-line">
                <img
                  src="@/assets/img/new-img/svg-img/vertical-line.svg"
                  class="image img-fluid"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <!--End Desktop View-->
      <!--Start Mobile View--->
      <div
        class="row emp-showtimes mx-0 mb-5 d-block d-md-none"
        v-if="listView && movieDetails[0]"
      >
        <div
          v-if="filteredFlattenedSchedule"
          class="col-md-12 showtime-list mx-0 px-0"
          v-for="(data, index) in filteredFlattenedSchedule"
          :key="index"
        >
          <div class="row mx-0 py-3">
            <div class="col-12 title">{{ data.mf_names }}</div>
            <!-- <div class="col-4">
              <div class="movie-img">
                <img :src="URL_BASE + data.header_banner" class="img-fluid" />
              </div>
            </div> -->
            <div class="col-12">
              <div class="title pb-1">{{ movieName }}</div>
              <div>{{ getCinemaTranslatedName(data.schedules[0].cinema) || data.schedules[0].cinema_name }}</div>
              <div class="pt-2">
                <ul class="list-inline showtimes__time-tag">
                  <template
                    v-for="(schedule, indexschedule) in data.schedules"
                    class="d-flex"
                  >
                    <li
                      class="time-tag list-inline-item"
                      :class="[schedule.showTime]"
                      :key="indexschedule"
                      @click="seatLayoutShowBrij(schedule, data)"
                    >
                      <router-link to class="text-white">
                        {{
                          moment(schedule.showTime, ["HH.mm"]).locale(getCurrentLang().iso_2 || 'en').format("hh:mm A")
                        }}
                      </router-link>
                    </li>
                  </template>
                </ul>
              </div>
            </div>
          </div>
          <hr class="showtime-line" />
        </div>
      </div>
      <div v-if="filteredFlattenedSchedule && filteredFlattenedSchedule.length <= 0">{{ isMovies }}</div>
      <b-button
        v-if="filteredFlattenedSchedule && loadPageNo < paginationCountdata && filteredFlattenedSchedule.length > 0"
        @click="onLoadMore"
        class="btn-load-more"
        >Load More
      </b-button>
      <!--End Mobile View-->
      <!-- <b-button v-b-modal="'ruleOfCountryForShows'"
        >Rules of Entry Popup</b-button
      > -->
      <!-- <b-button v-b-modal="'foodanddrinks'">Food and Drinks Popup</b-button> -->
      <!----------- RULES OF ENTRY MODAL ---------->
      <!-- <button  v-b-modal.bookScreen> click</button> -->
      <div class="emp_new_modal emp-loyalty-modal showtimes-popup" v-if="showTerms.RatingImage">
        <b-modal
          hide-header-close
          hide-footer
          ref="ruleOfCountryForShows"
          id="ruleOfCountryForShows"
          size="lg"
          class="rules-country-popup"
        >
          <template slot="modal-header">
            <div class="row w-100 align-items-center">
              <div class="pr-0 col-1 mb-3 mb-md-0">
                <div
                  class="d-block bg-emp-red"
                  style="height: 3px; width: 100%"
                ></div>
              </div>
              <div class="col-10">
                <h6 class="hiw-title text-center font-weight-bold mb-0">
                  {{ allLanguageData.PopupTerms.Heading }}
                </h6>
              </div>
              <span @click="HideTermsPopup" class="new-closeBtn">X</span>
            </div>
          </template>
          <div class="emp_new_modal_body px-3 py-3">
            <div class="grid-half">
              <div class="text-center">
                <img :src="`${BrijBaseUrl}${showTerms.RatingImage}`" class="image img-fluid" />
              </div>
              <div>
                <h5 class="mb-0 title">
                  {{ showTerms.Title }}
                </h5>
              </div>
            </div>
            <div
              class="rules-list offset-lg-3 mt-3"
              v-html="showTerms.Description"
            ></div>
            <div class="mb-3 offset-lg-3">
              <span>
                {{ allLanguageData.PopupTerms.AgreeText }}
              </span>
              <span>
                <router-link
                  class="font-weight-bold"
                  to="/ksa-terms-condition"
                  target="_blank"
                >
                  <u>{{ allLanguageData.PopupTerms.TnC }}</u>
                </router-link>
                &nbsp;{{ allLanguageData.PopupTerms.And }}
                <router-link
                  class="font-weight-bold"
                  to="/theatre-rules"
                  target="_blank"
                >
                  <u>{{ allLanguageData.PopupTerms.HouseRules }}</u>
                </router-link>
              </span>
            </div>
            <div class="mx-auto text-center direction-class mt-4">
              <div class="row">
                <div class="col-6 col-md-4 offset-md-2 pr-1">
                  <b-button
                    variant="default"
                    @click="onClickAgree()"
                    class="btn btn-yes"
                    >{{ allLanguageData.PopupTerms.AgreeButton }}</b-button
                  >
                </div>
                <div class="col-6 col-md-4 pl-1">
                  <b-button
                    variant="default"
                    @click="HideTermsPopup()"
                    class="btn btn-no"
                    >{{ allLanguageData.PopupTerms.CancelButton }}</b-button
                  >
                </div>
              </div>
            </div>
          </div>
        </b-modal>
        <b-modal
          hide-footer
          ref="bookScreen"
          id="bookScreen"
          size="md"
          class="rules-country-popup"
          title="Booking Information"
        >
          <div class="emp_new_modal_body py-3 px-3">
            <h5 class="font-weight-bold">Contact the cinema</h5>
          </div>
        </b-modal>
      </div>
    </div>
  </div>
</template>
<script>
import { makeRequest, makeRequestBrij } from '@/helper/internet.js'
import { mapState, mapGetters, mapActions } from 'vuex'
import Multiselect from 'vue-multiselect'
import MobileMovieDetails from '@/components/partials/mobilemoviedetails'
import moment from 'moment'
import { URL_BASE } from '@/helper/constant.js'
import { LanguageService } from '../../services/storage.service'

export default {
  data () {
    return {
      selectedDate: null,
      ss_id: null,
      md_id: null,
      screen_id: null,
      dateList: [],
      BrijScheduled: [],
      confirmedMovie: {
        'status': true,
        'message': 'Records Fetched',
        'Records': { 'data': [], 'pagination': {} },
        'VersionNameArray': [],
        'sessions': [],
        'MovieListArray': [ { 'CinemaList': [] } ],
        'MovieListArrayNew': [ { 'CinemaList': [] } ],
        'FormatArray': [],
        'CinemaArray': [],
        'LanguageArray': [],
        'dateList': [],
        'disable_date_list': [],
        'isShowScreening': true,
        'TypeList': [],
        'FilterData': []
      },
      flattenSchedule: [],
      URL_BASE: URL_BASE + '/',
      showContent: false,
      offerId: null,
      listView: true,
      gridView: false,
      bannerSlider: {
        arrows: false,
        dots: true,
        infinite: true,
        autoplay: true,
        autoplaySpeed: 2000,
        slidesToScroll: 1,
        slidesToShow: 1,
      },
      dateSlider: {
        draggable: true,
        accessibility: false,
        slidesToShow: 7,
        arrows: true,
        dots: false,
        swipeToSlide: true,
        infinite: false,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 5,
              slidesToScroll: 3,
            },
          },
          {
            breakpoint: 700,
            settings: {
              slidesToShow: 5,
              slidesToScroll: 1,
              adaptiveHeight: true,
            },
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 5,
              slidesToScroll: 1,
            },
          },
        ],

        // new
      },
      MovieID: [],
      CategoryID: '',
      showAllDateList: [],
      AllTimesArray: [],
      movieDetails: [],
      tempAllShowData: [],
      allCinemas: [],
      AllFormatsArray: [],
      isMovies: '',
      cinemaList: [],
      finalSelectedDate: '',
      filteredCinamaArray: [],
      filteredExpArray: [],
      selectedCinemaValues: [],
      selectedExpValues: [],
      selectedShowTimes: [],
      filteredTimesArray: [],
      hideCinemaFilter: false,
      isLoadmoreActivated: false,
      refreshMovies: true,
      loadPageNo: 1,
      paginationCountdata: 0,
      SchID: '',
      showTerms: {
        Description: '',
        Title: '',
        rated: '',
        RatingImage: '',
      },
      movieBanner: '',
      movieName: '',
      movieDescrip: '',
    }
  },
  destroyed () {
    window.localStorage.setItem('EXPE', '')
  },
  beforeCreate: function () {
    document.body.className = 'light-section'
  },
  mounted () {
    this.fetchCinemaList()
    // this.fetchExperienceList();
  },
  beforeMount () {
    console.log(this.BrijBaseUrl, 'BrijBaseUrl')
    if (window.localStorage.getItem('EXPE')) {
      let EXP = window.localStorage.getItem('EXPE')

      console.log(EXP, 'EXP')

      this.filteredExpArray.push(EXP)
      // this.selectedExpValues.push(EXP);
    }
    if (this.headerCinemaId) {
      this.finalSelectedDate = ''
      this.filteredCinamaArray.push(this.headerCinemaId)
    }
    const { movieId } = this.$route.params

    if (movieId) {
      this.MovieID = movieId.toString().split(',')

      this.CategoryID = this.$route.params.cat_id
      this.getAllMovieDetails(this.MovieID)
    } else {
      console.log(this.$route.params, 'jitu')
      // this.$router.go(-1);
    }
  },

  beforeUpdate () {
    if (this.$refs.dateSlider) {
      this.$refs.dateSlider.destroy()
    }
  },
  updated () {
    this.$nextTick(function () {
      if (this.$refs.dateSlider) {
        this.$refs.dateSlider.create(this.slickOptions)
      }
    })
  },
  components: {
    Multiselect,
    moment,
    MobileMovieDetails,
  },
  watch: {
    headerCinemaId: {
      handler: function (newVal, oldVal) {
        this.refreshMovies = true
        this.loadPageNo = 1
        // let obj = this.cinemaList.filter(y => {
        //   return y.CinemaID == this.headerCinemaId;
        // });

        // if (obj.length > 0) {
        //   this.filteredCinamaArray = [];

        // }
        this.selectedCinemaValues = []

        let obj = this.cinemaList.filter((y) => {
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
    filteredFlattenedSchedule () {
      let filtered = JSON.parse(JSON.stringify(this.BrijScheduled))

      let isAllCinemaSelected = this.selectedCinemaValues.some(c => c.cinema_id === '')
      let isAllFormatSelected = this.selectedExpValues.some(c => c.mf_id === '')
      let isAllSessionsSelected = this.selectedShowTimes.length === 4 // some(c => c.label === 'All')

      if (isAllCinemaSelected && isAllFormatSelected && isAllSessionsSelected) return filtered

      if (isAllCinemaSelected) this.selectedCinemaValues = []
      if (isAllFormatSelected) this.selectedExpValues = []
      if (isAllSessionsSelected) this.selectedShowTimes = []

      let cinema_ids = this.selectedCinemaValues.map(c => c.cinema_id).filter(x => !!x)
      let mf_ids = this.selectedExpValues.map(c => c.mf_id).filter(x => !!x)
      let sessions = this.selectedShowTimes.map(c => c.label).filter(x => !!x)

      filtered = filtered
        .filter(x => {
          if (isAllCinemaSelected || cinema_ids.length === 0) return true

          return cinema_ids.includes(x.cinema_id)
        })
        .filter(x => {
          if (isAllFormatSelected || mf_ids.length === 0 || x.schedules.length === 0 || x.mf_ids.length === 0) return true

          return x.mf_ids.some(x => mf_ids.includes(x))
        })
        .map(x => {
          if (sessions.length > 0) {
            x.schedules = x.schedules.filter(s => sessions.includes(s.show_timing_label))
          }

          return x
        })

      return filtered.filter(x => x.schedules.length > 0)
    },
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
    moment,
    /* transpiled from, Ref: https://stackoverflow.com/a/64489535
    const groupByToMap = <T, Q>(array: T[], predicate: (value: T, index: number, array: T[]) => Q) =>
      array.reduce((map, value, index, array) => {
        const key = predicate(value, index, array);
        map.get(key)?.push(value) ?? map.set(key, [value]);
        return map;
      }, new Map<Q, T[]>());
*/
    groupByToMap (arr = [], predicate = x => x) {
      // magic starts :)

      let grouped = arr.reduce((map, value, index, array) => {
        const key = predicate(value, index, array)
        // var _a, _b
        // (_b = (_a = map.get(key)) === null || _a === void 0 ? void 0 : _a.push(value)) !== null && _b !== void 0 ? _b : map.set(key, [value])
        if ((map.get(key))) {
          map.get(key).push(value)
        } else {
          map.set(key, [value])
        }

        return map
      }, new Map())
      return grouped
    },
    onLoadMore () {
      this.refreshMovies = false
      this.loadPageNo = this.loadPageNo + 1
      this.getAllMovieDetails()
    },
    seatLayoutShowBrij (schedule, data) {
      console.log({ schedule, data })
      console.log(this.movieDetails)
      if (this.CountryID == 102 || this.CountryID == '102' ) {
        this.$refs['bookScreen'].show()
        return false
      }
      this.ss_id = schedule.ss_id
      this.md_id = schedule.md_id
      this.screen_id = schedule.screen_id
      let rating_id = this.movieDetails.length > 0 && this.movieDetails[0].rating_id ? this.movieDetails[0].rating_id : null
      if (rating_id) {
        makeRequestBrij(`/rating_popup/?rating_id=${rating_id}`, 'GET', null, null)
          .then(response => {
            const {res} = response
            if (res && res.data && res.data.Records && res.data.Records.length > 0) {
              const popData = res.data.Records.filter(p => p.pp_lang_id == this.getCurrentLang().brij_lang_id).length
                ? res.data.Records.filter(p => p.pp_lang_id == this.getCurrentLang().brij_lang_id)[0]
                : res.data.Records[0]
              console.log(popData)
              this.showTerms.RatingImage = popData.pp_banner
              this.showTerms.Description = popData.pp_description
              this.showTerms.rated = popData.rating_name
              this.showTerms.Title = popData.pp_title
              
              this.ShowTermsPopup()
            } else {
              this.onClickAgree()
            }
          }).catch(err => {
            console.log(err)
          })
      }
    },
    seatLayoutShow (data, dataShowTerms) {
      if (this.CountryID == 102 || this.CountryID == '102') {
        this.$refs['bookScreen'].show()
        return false
      }
      this.SchID = data.SchID
      if (
        dataShowTerms &&
        dataShowTerms.ShowTerms &&
        dataShowTerms.ShowTerms.length > 0
      ) {
        this.showTerms.Title = dataShowTerms.ShowTerms[0].Title
        this.showTerms.Description = dataShowTerms.ShowTerms[0].Description
        this.showTerms.rated = dataShowTerms.ShowTerms[0].rated
        this.showTerms.RatingImage = dataShowTerms.ShowTerms[0].RatingImage
        this.ShowTermsPopup()
      } else {
        this.$router.push({
          path: '/seatLayout/' + data.SchID,
        })
      }
    },
    onClickAgree () {
      this.$router.push({
        path: `/seatLayout/${this.ss_id}/${this.md_id}/${this.screen_id}`,
      })
    },
    ShowTermsPopup () {
      this.$refs['ruleOfCountryForShows'].show()
    },
    HideTermsPopup () {
      this.$refs['ruleOfCountryForShows'].hide()
    },
    getAllMovieDetailsBrij () {
      let movie_id = this.MovieID[0]
      makeRequestBrij(`/api/cinema/movie-detail/${movie_id}/1/`, 'GET', null, null)
        .then((response) => {
          let language = LanguageService.getLanguage()

          const { error, res } = response
          if (res.data.status && res.data.Records.length > 0) {
            this.movieDetails = res.data.Records
            this.$forceUpdate()

            // this.movieBanner = this.checkBaseUrl(this.movieDetails[0].artwork)
            // this.movieName = this.getLanguageDetail(this.movieDetails[0].altMovieContent, 'iso_2', 'mc_title') || this.movieDetails[0].mc_title
            // this.movieDescrip = this.getLanguageDetail(this.movieDetails[0].altMovieContent, 'iso_2', 'mc_plot') || this.movieDetails[0].mc_plot
            // console.log(this.movieName, this.movieDescrip, 'this.movieBanner')

            if (this.movieDetails.length) {
              // this.movieBanner = this.checkBaseUrl(
              //   this.getLangSpecificAttribute(
              //     this.movieDetails[0].altMovieContent,
              //     language.brij_lang_id,
              //     'artwork'
              //   ) ||
              //   this.movieDetails[0].artwork
              // )
              this.movieBanner = this.checkBaseUrl(
                this.getLangSpecificAttribute(
                  (this.movieDetails[0].movie_poster || []).filter(p => p.image_setting_width == 1520 && p.image_setting_height == 500),
                  this.getCurrentLang().brij_lang_id,
                  'mp_poster_url'
                ) ||
                this.getSafe(
                  () => (this.movieDetails[0].movie_poster || []).filter(p => p.image_setting_width == 1520 && p.image_setting_height == 500)[0].mp_poster_url
                )
              )

              this.movieName = this.getLangSpecificAttribute(
                this.movieDetails[0].altMovieContent,
                this.getCurrentLang().brij_lang_id,
                'mc_title'
              ) || this.movieDetails[0].movie_title || this.movieDetails[0].original_title_of_movie

              this.movieDescrip = this.getLangSpecificAttribute(
                this.movieDetails[0].altMovieContent,
                this.getCurrentLang().brij_lang_id,
                'mc_plot'
              ) || this.movieDetails[0].mc_plot
            }
          }
        })
    },
    getConfirmedList (movie_id, fromDate = null) {
      if (fromDate) this.showLoading()
      let payload = {}

      if (fromDate && moment(fromDate).isValid()) {
        payload.fromDate = moment(fromDate).format('YYYY-MM-DD')
      }

      this.BrijDates = []

      makeRequestBrij(`/api/cinema/admin/movie-confirmed-list/${movie_id}`, 'GET', null, payload)
        .then((response) => {
          const { error, res } = response

          if (res.data.status) {
            this.confirmedMovie = res.data

            if (!this.selectedDate) {
              this.dateList = response.res.data.dateList
            }

            let confirmedMovie = res.data
            let flattenSchedule = []
            // let flattenScheduleEntries = null
            let flattenSchedulegroupByToMap = null

            confirmedMovie.MovieListArrayNew.forEach(m => {
              m.CinemaList.forEach(c => {
                let { format_list = [], ...cinema } = c

                format_list.forEach(f => {
                  let { screens = [], ...movieversion } = f

                  screens.forEach(scr => {
                    let { schedule_list = [], ...screen } = scr

                    schedule_list.forEach(sh => {
                      flattenSchedule.push({
                        ...cinema,
                        ...movieversion,
                        ...screen,
                        cinema,
                        movieversion,
                        screen,
                        ...sh,
                      })
                    })
                  })
                })
              })
            })

            flattenSchedulegroupByToMap = new Map(this.groupByToMap(flattenSchedule, x => (JSON.stringify({cinema_id: x.cinema_id, md_id: x.md_id}))))
            // flattenScheduleEntries = new Map(this.groupByToMap(flattenSchedule, x => (JSON.stringify({cinema: x.cinema_id, md_id: x.md_id})))).entries()
            this.flattenSchedule = flattenSchedulegroupByToMap

            let groupedShowsByMd = []
            for (const [key, value] of flattenSchedulegroupByToMap) {
              let cinema = JSON.parse(String(key))
              let shows = [...value]
              // console.log({cinema, shows})
              groupedShowsByMd.push({
                ...cinema,
                schedules: shows
              })
            }

            groupedShowsByMd
              .map(x => {
                x.mf_names = [...new Set(x.schedules.map(m => m.mf_name))].filter(x => !!x).join(',')
                x.mf_ids = [...new Set(x.schedules.map(m => m.mf_id))].filter(x => !!x)
                x.movie_ids = [...new Set(x.schedules.map(m => m.movie_id))].filter(x => !!x)
                return x
              })

            // console.log({
            //   flattenSchedule,
            //   flattenSchedulegroupByToMap,
            //   flattenScheduleEntries,
            //   groupedShowsByMd
            // })
            this.BrijScheduled = groupedShowsByMd
          }

          this.$forceUpdate()
        })
        .catch(() => {
          this.confirmedMovie = {}
          if (!this.selectedDate) {
            this.dateList = []
          }
        })
        .finally(() => {
          if (fromDate) this.hideLoading()
        })
    },
    getAllMovieDetails: function (movieIdValue) {
      this.getAllMovieDetailsBrij()
      this.getConfirmedList(this.MovieID[0], this.selectedDate)
      this.isMovies = ''
      let payload = {
        MovieID: this.MovieID,
        CategoryID: this.CategoryID,
        CinemaID: this.filteredCinamaArray,
        Format: this.filteredExpArray,
        pageNo: this.loadPageNo,
        ShowTimes: this.filteredTimesArray,
      }

      if (this.finalSelectedDate) {
        payload['ShowDate'] = this.finalSelectedDate
          ? this.finalSelectedDate
          : ''
      }

      console.log(payload, 'payload')

      this.tempAllShowData = []
      this.allCinemas = []
      if (this.refreshMovies == true) {
        this.allCinemas = []
      }

      if (this.finalSelectedDate) {
      } else {
        this.showAllDateList = []
      }
      // this.showLoading()
      // makeRequest('/GetShowtimesByMovie/', 'POST', null, payload)
      //   .then((response) => {
      //     const { error, res } = response // console.log("Show details", res);
      //     if (res.data.Status && res.data.AllShowdates.length > 0) {
      //       this.hideLoading()
      //       if (
      //         res.data.hasOwnProperty('MovieData') &&
      //         res.data.MovieData.length > 0
      //       ) {
      //         this.tempAllShowData = res.data.MovieData
      //         if (!this.finalSelectedDate) {
      //           if (this.tempAllShowData.length > 0) {
      //             // this.movieDetails = this.tempAllShowData
      //             // this.movieBanner = this.movieDetails[0].banner_image
      //             // this.movieName = this.movieDetails[0].movie_name
      //             // this.movieDescrip = this.movieDetails[0].synopsis
      //           }
      //         } else {
      //         }
      //
      //         // if (
      //         //   this.tempAllShowData.length > 0 &&
      //         //   this.tempAllShowData[0].Showdates.length > 0
      //         // ) {
      //         //   this.paginationCountdata = this.tempAllShowData[0].Showdates[0].TotalpageData[0].Totalpages;
      //         // }
      //       }
      //
      //       if (this.finalSelectedDate) {
      //         this.scheduleDate(this.finalSelectedDate)
      //       } else {
      //         if (
      //           res.data.hasOwnProperty('AllShowdates') &&
      //           res.data.AllShowdates.length > 0
      //         ) {
      //           this.showAllDateList = res.data.AllShowdates
      //
      //           this.scheduleDate(this.showAllDateList[0].showdate)
      //           if (
      //             res.data.hasOwnProperty('AllTimes') &&
      //             res.data.AllTimes.length > 0
      //           ) {
      //             this.AllTimesArray = res.data.AllTimes
      //             let objMviAll = {
      //               title: 'ALL TIMES',
      //               ID: 'ALL',
      //             }
      //
      //             this.AllTimesArray.unshift(objMviAll)
      //           }
      //         } else {
      //           this.isMovies = 'NO SHOWS FOUND'
      //         }
      //         if (
      //           res.data.hasOwnProperty('AllFormats') &&
      //           res.data.AllFormats.length > 0
      //         ) {
      //           this.AllFormatsArray = res.data.AllFormats
      //           let objMviAll = {
      //             Metascore: 'ALL FORMATS',
      //             MetascoreID: 'ALL',
      //           }
      //
      //           this.AllFormatsArray.unshift(objMviAll)
      //         }
      //
      //         if (res.data.hasOwnProperty('TotalpageData')) {
      //           this.paginationCountdata = res.data.TotalpageData.Totalpages
      //         }
      //         // if (res.data.hasOwnProperty("countdata") && res.data.countdata) {
      //         //   this.paginationCountdata = res.data.countdata;
      //         // }
      //         // if (
      //         //   res.data.hasOwnProperty("TotalpageData") &&
      //         //   res.data.TotalpageData.length > 0
      //         // ) {
      //         //   alert();
      //         //   this.paginationCountdata = res.data.TotalpageData[0].Totalpages;
      //         // }
      //       }
      //     } else {
      //       this.isMovies = 'NO SHOWS FOUND'
      //     }
      //
      //     this.hideLoading()
      //   })
      //   .catch((error) => {
      //     this.hideLoading()
      //     console.log('Error', error)
      //   })
    },
    setSelectedDate (fromDate = new Date(), dateInfo = {}) {
      console.log({fromDate, dateInfo})

      if (fromDate && moment(fromDate).isValid()) {
        let date = moment(fromDate).format('YYYY-MM-DD')
        this.selectedDate = date
        this.getConfirmedList(this.MovieID[0], date)
      }
      this.$forceUpdate()
    },
    scheduleDateMovie (showDate, id) {
      this.finalSelectedDate = showDate
      if (id == '1') {
        this.loadPageNo = 1
        this.refreshMovies = true
      }
      this.getAllMovieDetails()
    },

    scheduleDate: function (showDate) {
      // this.allCinemas = [];
      if (this.refreshMovies == true) {
        this.allCinemas = []
      }
      this.showLoading()
      try {
        this.finalSelectedDate = showDate
        if (
          this.tempAllShowData.length > 0 &&
          this.tempAllShowData[0].Showdates.length > 0
        ) {
          let selectedDateShowTimes = this.tempAllShowData[0].Showdates.filter(
            (x) => {
              return x.showdate == showDate
            }
          )

          if (selectedDateShowTimes.length > 0) {
            for (let q = 0; q < selectedDateShowTimes.length; q++) {
              this.allCinemas.push(...selectedDateShowTimes[q].times)
            }
          }
        }
        console.log(this.allCinemas, 'uu')
        // this.hideLoading();
        setTimeout(() => {
          this.hideLoading()
        }, 500)

        // this.hideLoading();
      } catch (error) {
        console.log('error', error)
      }
      // if (showDate) {
      //   this.showLoading();
      // }
      // this.showLoading();
    },
    fetchCinemaList: function () {
      // makeRequest('/GetCinemas', 'POST', null, null)
      //   .then((result) => {
      //     const { error, res } = result
      //     const { data } = res.data
      //     if (res.data) {
      //       this.cinemaList = res.data.Categories
      //
      //       let objcinemaAll = {
      //         CinemaName: 'ALL CINEMAS',
      //         CinemaID: 'ALL',
      //       }
      //
      //       this.cinemaList.unshift(objcinemaAll)
      //
      //       let obj = this.cinemaList.filter((y) => {
      //         return y.CinemaID == this.headerCinemaId
      //       })
      //       if (obj.length > 0) {
      //         this.selectedCinemaValues.push(...obj)
      //         this.hideCinemaFilter = true
      //       }
      //     }
      //   })
      //   .catch((error) => {
      //     console.log('Error on vue front', error)
      //   })
    },
    // fetchExperienceList: function() {
    //   makeRequest("/GetExperience", "POST", null, null)
    //     .then(result => {
    //       const { error, res } = result;
    //       const { data } = res.data;
    //       if (res.data) {
    //         this.AllFormatsArray = res.data.Categories;
    //       }
    //     })
    //     .catch(error => {
    //       console.log("Error on vue front", error);
    //     });
    // },

    showView: function (data) {
      if (data == 'grid') {
        (this.gridView = true), (this.listView = false)
      } else {
        (this.gridView = false), (this.listView = true)
      }
    },
    getOfferId: function (index) {
      this.offerId = index
      this.checkOfferId(index)
      // console.log(index);
    },
    checkOfferId: function (index) {
      console.log(index)
      if (index == this.offerId) {
        console.log('ruchi')
        this.showContent = true
        return true
      }
    },
  },
}
</script>
<style>
#bookScreen .close {
  margin-top: -7px;
  margin-right: -10px;
}
#bookScreen .modal-body {
  background: white !important;
  color: black;
}
#bookScreen .modal-title {
  color: black !important;
  margin: initial !important;
}
#bookScreen .emp_new_modal_body {
  color: black !important;
}
</style>
