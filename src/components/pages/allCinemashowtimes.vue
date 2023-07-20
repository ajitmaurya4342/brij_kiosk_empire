<template>
  <div class="section-showtime">
    <!--Start Banner Slider--->
    <section class="section-banner simple-banner">
      <slick
        v-if="all_fetched_movies.length > 0"
        ref="bannerSlider"
        :options="bannerSlider"
      >
        <div
          v-for="(data, index) in [
            ...bannerFromPagesCMS,
            ...all_fetched_movies.map(data => ( getLangSpecificAttribute((data.movie_poster || []).filter(p => p.image_setting_width == 1520 && p.image_setting_height == 500), getCurrentLang().brij_lang_id, 'mp_poster_url' ) || getSafe( () => (data.movie_poster || []).filter(p => p.image_setting_width == 1520 && p.image_setting_height == 500)[0].mp_poster_url ) )).filter(p => !!p),
          ]"
          :key="index"
          class="w-100 banner-slider"
        >
          <div class="banner-img">
            <div>
              <img
                :alt="data"
                :src="
                checkBaseUrl(data)
                "
                class="image"
              />
            </div>
          </div>
        </div>
      </slick>
    </section>
    <!--End Banner Slider--->

    <div class="container">
      <div class="mt-lg-4 mt-3">
        <div class="main-heading">
          <div>
            <hr class="primary-line" />
          </div>
          <div class="title">{{ header }}</div>
        </div>
        <div class="content mb-4">
          <div class="content-title my-3">{{ header1 }}</div>
          <div class="content-desc">
            {{ description }}
          </div>
        </div>
      </div>
    </div>
    <div class="container px-0">
      <div class="mb-4 pb-2">
        <!--Start date Slider
        <div class="date-slider empire-slider px-md-4 py-3">
          <slick ref="dateSlider" :options="dateSlider">
            <div
              v-for="(dateInfo, dateKey) in showAllDateList"
              :key="dateKey"
              v-on:click="scheduleDateMovie(dateInfo.showdate, '1')"
            >
              <div
                class="date-card"
                :class="
                  finalSelectedDate == dateInfo.showdate
                    ? 'date-card-active'
                    : ''
                "
              >
                <div class="month">{{ dateInfo.month }}</div>
                <div class="date py-1">{{ dateInfo.date }}</div>
                <div class="day">{{ dateInfo.day }}</div>
              </div>
            </div>
          </slick>
        </div>
        -->
        <div class="date-slider empire-slider px-md-4 py-3">
          <slick ref="dateSlider2" :options="dateSlider">
            <div
              v-for="(dateInfo, dateKey) in dateList"
              :key="dateKey"
              v-on:click="scheduleDateMovie(dateInfo.ss_actual_start_date, '1')"
            >
              <div
                class="date-card"
                :class="
                      finalSelectedDate == '' && dateKey == 0
                        ? 'date-card-active'
                        : finalSelectedDate == dateInfo.ss_actual_start_date
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
        </div>
        <!--End date Slider-->
        <!--Start QuickBook--->
        <div class="row emp-quickbook mx-0">
          <div class="col-md-10">
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
              <div class="col-xl-3 col-lg-6 col-md-6 px-1 mb-2 mb-xl-0">
                <multiselect
                  v-model="selectedCinemaValues"
                  :options="confirmedMovie.CinemaArray"
                  :multiple="true"
                  :close-on-select="true"
                  :clear-on-select="false"
                  :preserve-search="true"
                  :placeholder="allLanguageData.QuickBook.selectCinema"
                  :custom-label="getCinemaTranslatedName"
                  track-by="cinema_id"
                  :select-label="''"
                  :deselect-label="''"
                  :selectedLabel="''"
                  class="custom-multiselect no-scroll"
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
                      >{{ getCinemaTranslatedName(values[0]) || values[0].cinema_name }}</span
                    >
                  </template>
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

              <div class="col-xl-3 col-lg-6 col-md-6 px-1 mb-2 mb-xl-0">
                <multiselect
                  v-model="selectedMovie"
                  :options="all_fetched_movies"
                  :multiple="true"
                  :close-on-select="false"
                  :clear-on-select="false"
                  :preserve-search="true"
                  :placeholder="allLanguageData.QuickBook.selectMovie"
                  label="movie_title"
                  track-by="movie_id"
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
                      >{{ values.length }} Movie</span
                    >
                    <span
                      class="multiselect__single"
                      v-else-if="values.length &amp;&amp; !isOpen"
                      >{{ values[0].movie_title }}</span
                    >
                  </template>
                </multiselect>
                <!-- <b-dropdown
                  variant="default"
                  class="quickbook-dropdown scroll-dropdown"
                  text="Select Movie"
                >
                  <b-dropdown-item v-for="(data, Index) in 10" :key="Index"
                    >Movie One</b-dropdown-item
                  >
                </b-dropdown> -->
              </div>
              <div class="col-xl-3 col-lg-6 col-md-6 px-1 mb-2 mb-xl-0">
                <multiselect
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
                  class="custom-multiselect scroll-dropdown experience-dropdown"
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
                <!-- <b-dropdown
                  variant="default"
                  class="quickbook-dropdown"
                  text="Select Experience"
                >
                  <b-dropdown-item v-for="(data, Index) in 10" :key="Index"
                    >Experience One</b-dropdown-item
                  >
                </b-dropdown> -->
              </div>
              <div class="col-xl-3 col-lg-6 col-md-6 px-1">
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
                      v-if="values.length > 1&amp;&amp; !isOpen"
                      >{{ values.length }} Time</span
                    >
                    <span
                      class="multiselect__single"
                      v-else-if="values.length &amp;&amp; !isOpen"
                      >{{ values[0].label }}</span
                    >
                  </template>
                </multiselect>
                <!-- <b-dropdown
                  variant="default"
                  class="quickbook-dropdown"
                  text="ShowTimes"
                >
                  <b-dropdown-item v-for="(data, Index) in 10" :key="Index"
                    >09th June</b-dropdown-item
                  >
                </b-dropdown> -->
              </div>
            </div>
          </div>
          <div class="col-md-2 mb-3 mb-md-0 show-view" v-if="false">
            <div
              v-on:click="showView('list')"
              v-bind:class="
                langName == 'ar' ? 'border-left pl-2' : 'border-right pr-2'
              "
            >
              <div :class="listView ? 'view-active' : ''">
                <svg viewBox="0 0 18.23 21.56">
                  <line
                    class="cls-1"
                    x1="18.23"
                    y1="1.54"
                    x2="5.04"
                    y2="1.54"
                  />
                  <line
                    class="cls-1"
                    x1="18.23"
                    y1="7.98"
                    x2="5.04"
                    y2="7.98"
                  />
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
            </div>
            <div
              v-bind:class="langName == 'ar' ? 'pr-2' : 'pl-2'"
              v-on:click="showView('grid')"
            >
              <div :class="gridView ? 'view-active' : ''">
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
            </div>
          </div>
        </div>
        <!---End QuickBook--->
      </div>
    </div>
    <div class="container px-lg-0">
      <!--Desktop View--->
      <div
        class="row emp-showtimes mx-0 mb-5 d-none d-md-block"
        v-if="listView"
      >
        <div
          class="col-md-12 showtime-list mx-0"
          v-for="(data, index) in filteredFlattenedSchedule"
          :key="index"
        >
          <div class="row mx-0 d-flex align-items-center pt-4 pb-3">
            <div class="col-md-2 px-0">{{ getCinemaTranslatedName(data.schedules[0].cinema) || data.schedules[0].cinema_name }}</div>
            <div class="col-md-3 grid-half align-items-center">
              <div class="movie-img">
                <img
                  v-if="getMovieData(data, 'artwork')"
                  :src="getMovieData(data, 'artwork')"
                  class="image img-fluid"
                />
                <img
                  v-else
                  src="@/assets/img/new-img/png-img/default-Img.png"
                  class="image img-fluid"
                />
              </div>
              <div v-bind:class="langName == 'ar' ? 'pr-4' : 'pl-3'">
                {{ getMovieData(data, 'movie_title') }}
              </div>
            </div>
            <div class="col-md-2 ar-number">
              <div>{{ data.mf_names }}</div>
            </div>
            <div class="col-md-5 px-0">
              <ul class="list-inline-item showtimes__time-tag">
                <li
                  class="time-tag list-inline-item"
                  :class="[schedule.showTime]"
                  v-for="(schedule, indexTime) in data.schedules"
                  :key="indexTime"
                  @click="seatLayoutShowBrij(schedule, data)"
                  v-b-tooltip.hover
                  :title="`${schedule.screen_name}${schedule.mf_name ? ` - ${schedule.mf_name}` : '' }${schedule.show_timing_label ? ` - ${schedule.show_timing_label}` : '' }`"
                >
                  <router-link to>{{ moment(schedule.showTime, ["HH.mm"]).locale(getCurrentLang().iso_2 || 'en').format("hh:mm A") }}</router-link>
                </li>
              </ul>

              <!-- <ul class="d-flex flex-wrap showtimes__time-tag ">
                <li
                  class="time-tag"
                  v-for="(dataTime, indexTime) in data.show_time"
                  :key="indexTime"
                  @click="seatLayoutShow(dataTime, data)"
                  v-b-tooltip.hover
                  :title="dataTime.ScreenName"
                >
                  <router-link to class="text-white">{{
                    dataTime.time
                  }}</router-link>
                </li>
              </ul> -->
            </div>
          </div>
          <div class="row showtime-line">
            <img
              src="@/assets/img/new-img/svg-img/vertical-line.svg"
              class="image img-fluid"
            />
          </div>
        </div>
        <div v-if="allCinemas.length <= 0">
          <div class="no-shows-found">
            {{ isMovies }}
          </div>
        </div>
        <b-button
          v-if="loadPageNo < paginationCountdata && allCinemas.length > 0"
          @click="onLoadMore"
          class="btn-load-more mt-3"
          >{{ allLanguageData.LoadMore }}</b-button
        >
      </div>
      <div class="emp-showtimes mx-0 mb-5" v-if="gridView">
        <MovieSlider
          isShowTime="Yes"
          :key="componentKeySlider"
          bgcolor="emp-bgsecondary"
          oppbgcolor="emp-bgprimary"
          booknow="true"
          :moviesArray="getMovieGrid()"
          @changeMviFilter="ChangeM($event)"
        />
      </div>
      <!--End Desktop View-->
      <!--Start Mobile View--->
      <div
        class="row emp-showtimes mx-0 mb-5 d-block d-md-none"
        v-if="listView"
      >
        <div
          v-if="listView && filteredFlattenedSchedule.length > 0"
          class="col-md-12 showtime-list mx-0"
          v-for="(data, index) in filteredFlattenedSchedule"
          :key="index"
        >
          <div class="row mx-0 py-3">
            <div class="col-12 title pl-0">{{ data.schedules[0].mf_name }}</div>
            <!-- <div class="col-4">
              <div class="movie-img">
                <img
                  src="@/assets/img/new-img/jpg-img/movieimg.jpg"
                  class="img-fluid"
                />
              </div>
            </div> -->
            <div class="col-12 pl-0">
              <div class="title pb-1">{{ getMovieData(data, 'movie_title') }}</div>
              <div>{{ getCinemaTranslatedName(data.schedules[0].cinema) || data.schedules[0].cinema_name }}</div>
              <div class="pt-2">
                <ul class="list-inline">
                  <li
                    class="list-inline-item time-tag"
                    :class="[schedule.showTime]"
                    v-for="(schedule, indexTime) in data.schedules"
                    :key="indexTime"
                    @click="seatLayoutShowBrij(schedule, data)"
                  >
                    <router-link to>{{ moment(schedule.showTime, ["HH.mm"]).locale(getCurrentLang().iso_2 || 'en').format("hh:mm A") }}</router-link>
                  </li>
                </ul>
                <!-- <div class="d-flex flex-wrap">
                  <div
                    class="time-tag"
                    v-for="(dataTime, indexTime) in data.show_time"
                    :key="indexTime"
                    @click="seatLayoutShow(dataTime, data)"
                  >
                    <router-link to class="text-white">{{
                      dataTime.time
                    }}</router-link>
                  </div>
                </div> -->
              </div>
            </div>
          </div>

          <div
            class="row emp-showtimes mx-0 mb-5 d-block d-md-none"
            v-if="gridView"
          >
            <!-- <MovieSlider
              isShowTime="Yes"
              :key="componentKeySlider"
              bgcolor="emp-bgsecondary"
              oppbgcolor="emp-bgprimary"
              booknow="true"
              :moviesArray="movieGridData"
              @changeMviFilter="ChangeM($event)"
            /> -->
          </div>
          <hr class="showtime-line" />
        </div>
        <div v-if="allCinemas.length <= 0" class="no-shows-found">
          {{ isMovies }}
        </div>
      </div>
      <!--End Mobile View-->
    </div>
    <div class="emp_new_modal emp-loyalty-modal showtimes-popup">
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
              <img :src="showTerms.RatingImage" class="image img-fluid" />
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
</template>
<script>
import { makeRequest, makeRequestBrij } from '@/helper/internet.js'
import { mapState, mapGetters, mapActions } from 'vuex'
import Multiselect from 'vue-multiselect'
import MovieSlider from '@/components/partials/movieSlider.vue'
import moment from 'moment'
import { URL_BASE } from '@/helper/constant.js'
import {LanguageService} from '../../services/storage.service'
export default {
  data () {
    return {
      URL_BASE: URL_BASE + '/',
      componentKeySlider: 0,
      showContent: false,
      offerId: null,
      listView: true,
      gridView: false,
      bannerSlider: {
        arrows: false,
        dots: true,
        infinite: true,
        slidesToScroll: 1,
        slidesToShow: 1,
        autoplay: true,
        autoplaySpeed: 2000,
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
      CategoryID: null,
      showAllDateList: [],
      tempAllShowData: [],
      allCinemas: [],
      movieGridData: [],
      finalSelectedDate: '',

      AllFormatsArray: [],
      cinemaList: [],
      SchID: '',
      showTerms: {
        Description: '',
        Title: '',
        rated: '',
        RatingImage: '',
      },
      filteredCinamaArray: [],
      MovieID: [],
      filteredExpArray: [],
      filteredMovieArray: [],
      selectedCinemaValues: [],
      selectedExpValues: [],
      selectedShowTimes: [],
      selectedMovie: [],
      filteredTimesArray: [],
      AllTimesArray: [],
      nowPlayingMovies: [],
      showTimeBanners: [],
      header: '',
      header1: '',
      description: '',
      refreshMovies: true,
      loadPageNo: 1,
      paginationCountdata: 0,
      isMovies: '',
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
      // selectedDate: null,
      ss_id: null,
      md_id: null,
      screen_id: null,
      dateList: [],
      BrijDates: [],
      BrijScheduled: [],
      current_movie_ids: [],
      all_fetched_movie_ids: [],
      current_movies: [],
      all_fetched_movies: [],
      pagesList: [],
      bannerFromPagesCMS: [],
    }
  },
  beforeCreate: function () {
    document.body.className = 'light-section'
  },
  mounted () {
    // this.fetchCinemaList()
    // this.fetchMovieList()

    // this.fetchExperienceList();
  },
  beforeMount () {
    this.getConfirmedList()
    // this.showLoading();
    //  const { movieId, cat_id } = this.$route.params;
    // if (movieId && cat_id) {
    //   // this.MovieID = movieId.toString().split(",");

    //   // this.CategoryID = cat_id;

    // this.getShowTimeBanners()

    if (!this.headerCinemaId) {
      // this.getAllMovieDetails()
    }

    // } else {
    //   console.log(this.$route.params, "jitu");
    //   // this.$router.go(-1);
    // }

    this.getListOfPages()
  },

  beforeUpdate () {
    if (this.$refs.dateSlider) {
      this.$refs.dateSlider.destroy()
    }
    if (this.$refs.dateSlider2) {
      this.$refs.dateSlider2.destroy()
    }
    if (this.$refs.bannerSlider) {
      this.$refs.bannerSlider.destroy()
    }
  },
  updated () {
    this.$nextTick(function () {
      if (this.$refs.dateSlider) {
        this.$refs.dateSlider.create(this.slickOptions)
      }
      if (this.$refs.dateSlider2) {
        this.$refs.dateSlider2.create(this.dateSlider)
      }
    })
    this.$nextTick(function () {
      if (this.$refs.bannerSlider) {
        this.$refs.bannerSlider.create(this.bannerSlider)
      }
    })
  },
  computed: {
    headerCinemaId () {
      return this.$store.state.headerCinemaStore.headerCinemaId
    },
    bannersBrij () {
      return this.$store.getters.getBanners
    },

    filteredFlattenedSchedule () {
      let filtered = JSON.parse(JSON.stringify(this.BrijScheduled))

      let isAllCinemaSelected = this.selectedCinemaValues.some(c => c.cinema_id === '')
      let isAllMoviesSelected = this.selectedMovie.some(c => c.movie_id === '')
      let isAllFormatSelected = this.selectedExpValues.some(c => c.mf_id === '')
      let isAllSessionsSelected = this.selectedShowTimes.length === 4 // some(c => c.label === 'All')

      if (isAllCinemaSelected && isAllFormatSelected && isAllSessionsSelected && isAllMoviesSelected) return filtered

      if (isAllCinemaSelected) this.selectedCinemaValues = []
      if (isAllFormatSelected) this.selectedExpValues = []
      if (isAllSessionsSelected) this.selectedShowTimes = []
      if (isAllMoviesSelected || (this.selectedMovie.length === this.all_fetched_movies.length)) this.selectedMovie = []

      let cinema_ids = this.selectedCinemaValues.map(c => c.cinema_id).filter(x => !!x)
      let mf_ids = this.selectedExpValues.map(c => c.mf_id).filter(x => !!x)
      let sessions = this.selectedShowTimes.map(c => c.label).filter(x => !!x)
      let movie_ids = this.selectedMovie.map(c => c.movie_id).filter(x => !!x)

      filtered = filtered
        .filter(x => {
          if (isAllCinemaSelected || cinema_ids.length === 0) return true

          return cinema_ids.includes(x.cinema_id)
        })
        .filter(x => {
          if (isAllFormatSelected || mf_ids.length === 0 || x.schedules.length === 0 || x.mf_ids.length === 0) return true

          return x.mf_ids.some(x => mf_ids.includes(x))
        })
        .filter(x => {
          if (isAllMoviesSelected || movie_ids.length === 0) return true

          return movie_ids.includes(x.movie_ids[0])
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
  components: {
    Multiselect,
    MovieSlider,
  },
  watch: {
    headerCinemaId: {
      handler: function (newVal, oldVal) {
        this.refreshMovies = true
        this.loadPageNo = 1
        this.gridView = false
        this.listView = true
        this.selectedCinemaValues = []

        let obj = this.cinemaList.filter(y => {
          return y.CinemaID == this.headerCinemaId
        })
        if (obj.length > 0) {
          this.selectedCinemaValues.push(...obj)
        }

        // if (obj.length > 0) {
        //   this.filteredCinamaArray = [];

        // }
        // this.filteredCinamaArray = [];
        // this.finalSelectedDate = "";
        // this.filteredCinamaArray.push(this.headerCinemaId);
        // this.getAllMovieDetails();
      },
      deep: true,
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
    getMovieGrid () {
      return [
        ...new Map(
          this.BrijScheduled.map(x => ({ ...x, ...x.movie})).map((item) => [item['movie_id'], item])
        ).values(),
      ]
    },
    /* transpiled from, Ref: https://stackoverflow.com/a/64489535
        const groupByToMap = <T, Q>(array: T[], predicate: (value: T, index: number, array: T[]) => Q) =>
          array.reduce((map, value, index, array) => {
            const key = predicate(value, index, array);
            map.get(key)?.push(value) ?? map.set(key, [value]);
            return map;
          }, new Map<Q, T[]>());
    */
    getMovieData (schedule, type = 'movie_title') {
      let data = ''

      let movie_id = schedule.movie_ids[0]
      let movie = this.all_fetched_movies.filter(x => x.movie_id == movie_id)[0] || {}

      switch (type) {
        case 'movie_title':
          data = movie.movie_title
          break

        case 'artwork':
          data = movie.artwork
          break

        default:
          break
      }

      return data
    },
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

    async getAllMovieDetailsBrij (movie_id) {
      if (!movie_id) return Promise.resolve({})

      return makeRequestBrij(`/api/cinema/movie-detail/${movie_id}/1/`, 'GET', null, null)
        .then((response) => {
          const { error, res } = response
          if (error) return {}

          return res.data.Records[0] || {}
        })
        .catch(error => {
          console.log(`error fetching movie ${movie_id}`, error)
          return {}
        })
    },
    getConfirmedList (fromDate = null) {
      this.showLoading()

      // if (fromDate) this.showLoading()
      let payload = {}
      if (fromDate && moment(fromDate).isValid()) {
        payload.fromDate = moment(fromDate).format('YYYY-MM-DD')
      }

      this.BrijDates = []

      var timer = -performance.now()
      makeRequestBrij(`/api/cinema/admin/movie-confirmed-list-all`, 'GET', null, payload)
        .then(response => {
          const { error, res } = response

          if (res.data.status) {
            this.confirmedMovie = res.data

            if (!this.finalSelectedDate) {
              this.dateList = response.res.data.dateList
            }

            let confirmedMovie = res.data
            let flattenSchedule = []
            let flattenScheduleEntries = null
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
            // flattenScheduleEntries = new Map(this.groupByToMap(flattenSchedule, x => (JSON.stringify({cinema_id: x.cinema_id, md_id: x.md_id})))).entries()

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

            this.current_movie_ids = [...new Set(groupedShowsByMd.flatMap(s => s.schedules.map(s => s.movie_id)))]
          }

          this.$forceUpdate()
          return { res, groupedShowsByMd: this.BrijScheduled }
        })
        .then(({ res, groupedShowsByMd }) => {
          let filteredCurrentMovieIds = [...new Set([
            ...this.all_fetched_movie_ids,
            ...this.current_movie_ids
          ])].filter(x => {
            if (this.all_fetched_movie_ids.length === 0) return true

            return !this.all_fetched_movie_ids.includes(x)
          })

          return Promise.all(filteredCurrentMovieIds.map(x => this.getAllMovieDetailsBrij(x).then(m => ({ movie_id: x, movie: m, ...m }))))
        })
        .then((allMovies) => {
          allMovies.forEach(m => {
            m.movie_title = this.getLangSpecificAttribute(
              m.altMovieContent,
              this.getCurrentLang().brij_lang_id,
              'mc_title'
            ) || m.movie_title || m.original_title_of_movie

            m.mc_plot = this.getLangSpecificAttribute(
              m.altMovieContent,
              this.getCurrentLang().brij_lang_id,
              'mc_plot'
            ) || m.mc_plot

            m.artwork = this.checkBaseUrl(this.getLangSpecificAttribute(
              m.altMovieContent,
              this.getCurrentLang().brij_lang_id,
              'artwork'
            ) || m.artwork)

          //
          })

          this.current_movies = allMovies

          this.all_fetched_movie_ids = [...new Set([...this.all_fetched_movie_ids, ...this.current_movie_ids])]
          this.all_fetched_movies = [...this.all_fetched_movies, ...this.current_movies]

          this.$forceUpdate()
          return allMovies
        })
        .then(() => {
          this.BrijScheduled.forEach(s => {
            let movie_id = s.movie_ids[0]
            let movie = this.all_fetched_movies.filter(x => x.movie_id == movie_id)[0]
            s.movie = movie || {}
          })
          this.$forceUpdate()
        })
        .catch(error => {
          if (!this.finalSelectedDate) {
            this.dateList = []
          }
          console.log('Error', error)
        })
        .finally(() => {
          this.hideLoading()

          timer += performance.now()
          console.log(`getConfirmedList Time: ${(timer / 1000).toFixed(5)} sec`)
        })
    },
    onLoadMore () {
      this.refreshMovies = false
      this.loadPageNo = this.loadPageNo + 1
      this.getAllMovieDetails()
    },
    scheduleDateMovie (showDate, id) {
      this.finalSelectedDate = showDate
      if (id == '1') {
        this.loadPageNo = 1
        this.refreshMovies = true
      }

      this.getConfirmedList(showDate)
    },
    next () {
      this.$refs.bannerSlider.next()
    },

    prev () {
      this.$refs.bannerSlider.prev()
    },

    reInit () {},
    ChangeM (mviId) {
      this.selectedMovie = []
      this.gridView = false
      let arry = this.nowPlayingMovies.filter(p => {
        return p.movie_id == mviId
      })
      if (arry.length > 0) {
        this.selectedMovie = arry
      }
      this.listView = true
    },
    seatLayoutShow (data, dataShowTerms) {
      if (
        this.CountryID == 102 ||
        this.CountryID == '102' ||
        this.CountryID == 119 ||
        this.CountryID == '119'
      ) {
        this.$refs['bookScreen'].show()
        return false
      }
      console.log(data)
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
      // this.$router.push({
      //   path: "/seatLayout/" + data.SchID
      // });
    },
    seatLayoutShowBrij (schedule, data) {
      console.log({ schedule, data })
      if (
        this.CountryID == 102 ||
        this.CountryID == '102' ||
        this.CountryID == 119 ||
        this.CountryID == '119'
      ) {
        this.$refs['bookScreen'].show()
        return false
      }

      this.ss_id = schedule.ss_id
      this.md_id = schedule.md_id
      this.screen_id = schedule.screen_id

      // this.showTerms.RatingImage = 'https://apinew.empirecinemas.com//assets/images/Support/61446b8aaafbe.jpg'
      // this.showTerms.Description = '<p>I understand this movie is rated R18. </p><p>No one below the age of 18 will be permitted.</p><p>You must show your I.D.</p><p><strong>Food &amp; drinks from outside are not allowed in the cinema.</strong></p>'
      // this.showTerms.rated = 'R18'
      // this.showTerms.Title = 'The following content is prohibited for viewers below the age of 18'

      let rating_id = this.all_fetched_movies.filter(m => m.movie_id == schedule.movie_id).length
        ? this.all_fetched_movies.filter(m => m.movie_id == schedule.movie_id)[0].rating_id
        : null
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
            }
          }).catch(err => {
            console.log(err)
          })
      }

      this.ShowTermsPopup()
    },
    onClickAgree () {
      // this.$router.push({
      //   path: '/seatLayout/' + this.SchID,
      // })
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
    getShowTimeBanners () {
      // this.hideLoading();

      let payload = {
        PageName: 'showtime',
      }

      makeRequest('/PageData/', 'POST', null, payload)
        .then(response => {
          const { error, res } = response // console.log("Show details", res);

          // this.hideLoading();

          if (res.data.hasOwnProperty('banner') && res.data.banner.length > 0) {
            this.showTimeBanners = res.data.banner
          }

          if (res.data.hasOwnProperty('data') && res.data.data.length > 0) {
            this.header = res.data.data[0].header
            this.header1 = res.data.data[0].header1
            this.description = res.data.data[0].description
          }

          // this.hideLoading();
          console.log('jitu')
        })
        .catch(error => {
          // this.hideLoading();
          console.log('Error', error)
        })
    },
    getAllMovieDetails: function (movieIdValue, cat_id) {
      this.isMovies = ''
      this.componentKeySlider += 1
      return false
      // this.showLoading()
      let payload = {
        MovieID: this.MovieID,
        CategoryID: '1',
        CinemaID: this.filteredCinamaArray,
        Format: this.filteredExpArray,
        ShowTimes: this.filteredTimesArray,
        MovieID: this.filteredMovieArray,
        pageNo: this.loadPageNo,
        // ShowDate: "2021-09-02"
      }
      if (this.finalSelectedDate) {
        payload['ShowDate'] = this.finalSelectedDate
          ? this.finalSelectedDate
          : ''
      }
      this.tempAllShowData = []
      if (this.refreshMovies == true) {
        this.allCinemas = []
      }
      if (this.finalSelectedDate) {
      } else {
        this.showAllDateList = []
      }

      makeRequest('/GetShowtimesByMovie/', 'POST', null, payload)
        .then(response => {
          const { error, res } = response // console.log("Show details", res);
          if (res.data.Status && res.data.AllShowdates.length > 0) {
            this.hideLoading()

            if (
              res.data.hasOwnProperty('MovieData') &&
              res.data.MovieData.length > 0
            ) {
              this.tempAllShowData = res.data.MovieData
              // if (
              //   this.tempAllShowData.length > 0 &&
              //   this.tempAllShowData[0].Showdates.length > 0
              // ) {
              //   this.paginationCountdata = this.tempAllShowData[0].Showdates[0].TotalpageData[0].Totalpages;
              // }
            } else {
            }
            if (res.data.hasOwnProperty('TotalpageData')) {
              this.paginationCountdata = res.data.TotalpageData.Totalpages
            }
            if (this.finalSelectedDate) {
              this.scheduleDate(this.finalSelectedDate)
            } else {
              if (
                res.data.hasOwnProperty('AllShowdates') &&
                res.data.AllShowdates.length > 0
              ) {
                this.showAllDateList = res.data.AllShowdates
                this.scheduleDate(this.showAllDateList[0].showdate)
                if (
                  res.data.hasOwnProperty('AllTimes') &&
                  res.data.AllTimes.length > 0
                ) {
                  this.AllTimesArray = res.data.AllTimes
                  let objMviAll = {
                    title: 'ALL TIMINGS',
                    ID: 'ALL',
                  }

                  this.AllTimesArray.unshift(objMviAll)
                }
              }
              if (
                res.data.hasOwnProperty('AllFormats') &&
                res.data.AllFormats.length > 0
              ) {
                this.AllFormatsArray = res.data.AllFormatsNew
                let objMviAll = {
                  Metascore: 'ALL FORMATS',
                  MetascoreID: 'ALL',
                }

                this.AllFormatsArray.unshift(objMviAll)
              }
            }
          } else {
            this.isMovies = 'NO SHOWS FOUND'
          }

          this.hideLoading()
        })
        .catch(error => {
          this.hideLoading()
          console.log('Error', error)
        })
    },
    scheduleDate: function (showDate) {
      if (this.refreshMovies == true) {
        this.allCinemas = []
      }
      this.componentKeySlider += 1
      this.showLoading()

      try {
        this.finalSelectedDate = showDate
        if (this.tempAllShowData.length > 0) {
          for (let p = 0; p < this.tempAllShowData.length; p++) {
            let selectedDateShowTimes = this.tempAllShowData[
              p
            ].Showdates.filter(x => {
              return x.showdate == showDate
            })

            if (selectedDateShowTimes.length > 0) {
              for (let q = 0; q < selectedDateShowTimes.length; q++) {
                this.allCinemas.push(...selectedDateShowTimes[q].times)
              }
            }
          }
        }

        if (this.allCinemas.length <= 0) {
          this.isMovies = 'NO SHOWS FOUND'
        }
        this.movieGridData = []
        const key = 'movie_name'

        const arrayUniqueByKey = [
          ...new Map(this.allCinemas.map(item => [item[key], item ])).values(),
        ]

        if (arrayUniqueByKey.length > 0) {
          for (let t = 0; t < arrayUniqueByKey.length; t++) {
            let getSliderMovie = this.nowPlayingMovies.filter(p => {
              return p.movie_title == arrayUniqueByKey[t].movie_name
            })
            if (getSliderMovie.length > 0) {
              this.movieGridData.push(...getSliderMovie)
            }
          }
        }

        setTimeout(() => {
          this.hideLoading()
        }, 500)
      } catch (error) {
        console.log('error', error)
      }
      // if (showDate) {
      //   this.showLoading();
      // }
      // this.showLoading();
    },
    fetchMovieList: function (value) {
      this.nowPlayingMovies = []
      let payload = {
        CategoryID: '1',
        // CinemaID: this.headerCinemaId ? this.headerCinemaId : ""
      }
      makeRequest('/GetDataByCategory/', 'POST', null, payload)
        .then(response => {
          const { error, res } = response
          if (res.data.hasOwnProperty('Shows') && res.data.Shows.length > 0) {
            this.nowPlayingMovies = res.data.Shows[0].show
            let objMviAll = {
              movie_title: 'ALL MOVIES',
              movie_id: 'ALL',
            }

            this.nowPlayingMovies.unshift(objMviAll)
          }
        })
        .catch(error => {
          console.log('Error', error)
        })
    },
    // fetchCinemaList: function () {
    //   this.cinemaList = []
    //   makeRequest('/GetCinemas', 'POST', null, null)
    //     .then(result => {
    //       const { error, res } = result
    //       const { data } = res.data
    //       if (res.data) {
    //         this.cinemaList = res.data.Categories
    //       }
    //       let objcinemaAll = {
    //         CinemaName: this.allLanguageData.AllCinemas,
    //         CinemaID: 'ALL',
    //       }
    //
    //       this.cinemaList.unshift(objcinemaAll)
    //
    //       let obj = this.cinemaList.filter(y => {
    //         return y.CinemaID == this.headerCinemaId
    //       })
    //       if (obj.length > 0) {
    //         this.selectedCinemaValues.push(...obj)
    //       }
    //     })
    //
    //     .catch(error => {
    //       console.log('Error on vue front', error)
    //     })
    // },
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
      // this.showLoading();
      this.getAllMovieDetails()
      if (data == 'grid') {
        (this.gridView = true), (this.listView = false)
      } else {
        (this.gridView = false), (this.listView = true)
      }
      // setTimeout(() => {
      //   this.hideLoading();
      // }, 500);
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
    getListOfPages () {
      const pagesFunction = async () => {
        try {
          let payload = {
            mpm_name: 'showTimes',
            mpm_lang_id: this.getCurrentLang().brij_lang_id
          }
          let response = await makeRequestBrij(
            `/api/admin/list-of-pages?mpm_name=${payload.mpm_name}&mpm_lang_id=${payload.mpm_lang_id}`,
            'GET',
            null,
            null
          )
          const { error, res } = response

          if (res.data.status) {
            let { data } = res
            let records = data.Records
            let newRecords = []
            records.map((x, index) => {
              let get_index = newRecords.findIndex(y => {
                return y.main_name == x.mpm_name
              })
              console.log({ get_index })
              if (get_index < 0) {
                let obj = {
                  mpm_id: x.mpm_id,
                  main_name: x.mpm_name,
                  lang_id: x.mpm_lang_id,
                  banner: x.mpm_banner,
                  status: x.is_active,
                  otherData: [
                    {
                      mpm_d_id: x.mpm_d_id,
                      main_name: x.mpm_d_main_name,
                      header_name: x.mpm_d_header_name,
                      description: x.mpm_d_description,
                      images: x.mpm_d_images,
                      cover_image: x.mpm_d_cover_image,
                      o_status: x.mpm_d_is_active
                    }
                  ]
                }
                newRecords.push(obj)
              } else {
                let obj = {
                  mpm_d_id: x.mpm_d_id,
                  main_name: x.mpm_d_main_name,
                  header_name: x.mpm_d_header_name,
                  description: x.mpm_d_description,
                  images: x.mpm_d_images,
                  cover_image: x.mpm_d_cover_image,
                  o_status: x.mpm_d_is_active
                }
                newRecords[get_index].otherData.push(obj)
              }
            })
            console.log('newRecords', newRecords)
            this.pagesList = newRecords
            let otherData = this.getSafe(() => this.pagesList[0].otherData[0], {})
            this.bannerFromPagesCMS = this.getSafe(() => this.pagesList[0], { banner: '' }).banner.split(',')

            this.header = otherData.main_name
            this.header1 = otherData.header_name
            this.description = otherData.description
          }
        } catch (error) {
          console.log('getPagesList', { error })
        }
      }
      pagesFunction()
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
.no-shows-found {
  background: #e5e6e7;
  padding: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
}
</style>
