<template>
  <div>
    <section class="container-fluid px-0">
      <slick
        ref="MovieSlider"
        :options="langName == 'ar' ? ArmovieSlider : movieSlider"
        class="movieDetail-slider"
        v-bind:class="langName == 'ar' ? 'er-movieDetail-slider' : ''"
      >
        <div
          style="position: relative"
          v-for="(item, index) in movieDetails.Headers"
          :key="index"
          v-if="index == 0"
        >
          <div class="mdImg">
            <img
              :src="item.MainBanner"
              lazy="loading"
              class="lazy-load-class img-fluid mx-auto w-100 md-img d-none d-lg-block"
              v-bind:alt="item.title"
            />
            <img
              :src="item.AppHeaderBanner"
              lazy="loading"
              class="lazy-load-class-mob img-fluid mx-auto w-100 md-img d-lg-none"
              v-bind:alt="item.title"
            />
            <div class="movie-tiitle text-center">
              <h2 class="text-uppercase">
                {{ movieDetails.title.replace(/\([^.]+$/, "") }}
                <span class="small">({{ movieDetails.rated }})</span>
              </h2>
              <div class="mb-3">{{ movieDetails.lang }}</div>
            </div>
          </div>
        </div>
      </slick>
    </section>
    <section>
      <!-- Movie Description -->
      <div class="movieDesBox pb-1">
        <div class="col-md-11 mx-auto mt-5">
          <p class="movie-desc" v-html="movieDetails.plot"></p>
          <div class="row my-4">
            <div
              class="col-md-6 mov-det red-LB mb-3"
              v-bind:class="langName == 'ar' ? 'ar-ml' : 'm-l'"
            >
              <h5>{{ allLanguageData.Starring }}</h5>
              <p>{{ movieDetails.Starring }}</p>
            </div>
            <div
              class="col-md-6 mov-det"
              v-bind:class="langName == 'ar' ? 'ar-m-r' : 'm-r'"
            >
              <div class="col-12">
                <div class="row">
                  <div class="red-LB col-4 col-lg mb-3">
                    <h5>{{ allLanguageData.Genre }}</h5>
                    <p>{{ movieDetails.genre }}</p>
                  </div>
                  <div class="red-LB col-4 col-lg mb-3">
                    <h5>{{ allLanguageData.Runtime }}</h5>
                    <p>{{ movieDetails.runtime }}</p>
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
                    <p>{{ movieDetails.lang }}</p>
                  </div>
                  <!-- <div class="red-LB col-4 col-lg mb-3">
                    <h5>SUBTITLES</h5>
                    <p>Arabic, French</p>
                  </div>-->
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <div class="col-md-11 mx-auto text-center">
      <!-- CHOOSE YOUR CINEMA SECTION -->
      <section class="my-4">
        <h3 class="CYC">1. {{ allLanguageData.ChooseCinema }}</h3>
        <ul
          class="list-inline mb-0"
          v-bind:class="langName == 'ar' ? 'pr-0' : ''"
        >
          <li
            v-for="(cinema, index) in cinemaList"
            :key="index"
            class="list-inline-item mb-2"
            v-on:click="onSelectCinema(cinema)"
          >
            <button
              v-bind:class="{ active: selectedCinema === cinema.ID }"
              class="btn btn-light-grey"
            >
              {{ cinema.Name }}
            </button>
          </li>
        </ul>
      </section>
      <div class="d-none d-md-block">
        <img
          v-if="preimere == true || preimere == 'true'"
          src="@/assets/img/svg/dotted-black-line.svg"
          class="img-fluid w-100"
        />
        <img
          v-else
          src="@/assets/img/svg/drop-line.svg"
          class="img-fluid w-100"
        />
      </div>
      <div class="d-md-none">
        <img
          v-if="preimere == true || preimere == 'true'"
          src="@/assets/img/svg/drop-line-black-mobile.svg"
          class="img-fluid w-100 d-md-none"
        />
        <img
          v-else
          src="@/assets/img/svg/drop-line-mobile.svg"
          class="img-fluid w-100 d-md-none"
        />
      </div>
      <!-- SHOW DATE SECTION -->
      <section class="my-4">
        <h3 class="CYC">
          2. {{ allLanguageData.ShowDate }} ({{
            cinemaDateList.length > 0
              ? cinemaDateList[0]["MonthYear"].toUpperCase()
              : ""
          }})
        </h3>
        <ul class="select-date">
          <li
            class="list-inline-item"
            v-for="(date, a) in cinemaDateList"
            :key="a"
            v-on:click="OnSelectDate(date)"
          >
            <div
              class="date-container"
              v-bind:class="{ active: selectedDate === date.ID }"
            >
              <div class="date">{{ date.DateOnly }}</div>
              <div class="day">{{ date.Day.substring(0, 3) }}</div>
            </div>
          </li>
        </ul>
      </section>
      <div class="d-none d-md-block">
        <img
          v-if="preimere == true || preimere == 'true'"
          src="@/assets/img/svg/dotted-black-line.svg"
          class="img-fluid w-100"
        />
        <img
          v-else
          src="@/assets/img/svg/drop-line.svg"
          class="img-fluid w-100"
        />
      </div>
      <div class="d-md-none">
        <img
          v-if="preimere == true || preimere == 'true'"
          src="@/assets/img/svg/drop-line-black-mobile.svg"
          class="img-fluid w-100 d-md-none"
        />
        <img
          v-else
          src="@/assets/img/svg/drop-line-mobile.svg"
          class="img-fluid w-100 d-md-none"
        />
      </div>
      <!-- EXPERIENCE SECTION -->
      <section class="my-4">
        <h3 class="CYC">3. {{ allLanguageData.Experience }}</h3>
        <ul
          v-if="cinemaFormatList.length > 0"
          class="Cexpirence list-inline mb-0"
          v-bind:class="langName == 'ar' ? 'pr-0' : ''"
        >
          <li
            v-for="(format, index) in cinemaFormatList"
            v-on:click="OnSelectExp(format)"
            class="list-inline-item mb-2"
            :key="index"
          >
            <button
              class="btn btn-light-grey"
              v-bind:class="{
                active: selectedExp === format,
              }"
            >
              {{ format }}
            </button>
          </li>
        </ul>
        <div v-else>No Show Format Available</div>
      </section>
      <!-- LAGUAGE SECTION -->
      <div v-if="formatLanguageList.length > 1">
        <div class="d-none d-md-block">
          <img
            v-if="preimere == true || preimere == 'true'"
            src="@/assets/img/svg/dotted-black-line.svg"
            class="img-fluid w-100"
          />
          <img
            v-else
            src="@/assets/img/svg/drop-line.svg"
            class="img-fluid w-100"
          />
        </div>
        <div class="d-md-none">
          <img
            v-if="preimere == true || preimere == 'true'"
            src="@/assets/img/svg/drop-line-black-mobile.svg"
            class="img-fluid w-100 d-md-none"
          />
          <img
            v-else
            src="@/assets/img/svg/drop-line-mobile.svg"
            class="img-fluid w-100 d-md-none"
          />
        </div>

        <section class="my-4">
          <h3 class="CYC">4. {{ allLanguageData.Language }}</h3>
          <ul
            v-if="formatLanguageList.length > 0"
            class="Cexpirence list-inline mb-0"
            v-bind:class="langName == 'ar' ? 'pr-0' : ''"
          >
            <li
              v-for="(language, Langindex) in formatLanguageList"
              v-on:click="OnSelectLang(language)"
              class="list-inline-item mb-2"
              :key="Langindex"
            >
              <button
                class="btn btn-light-grey"
                v-bind:class="selectedLang === language ? 'active' : ''"
              >
                {{ formatLanguageName[Langindex] }}
              </button>
              <!-- <button
                class="btn btn-light-grey"
                v-bind:class="{ active: selectedLang === language }"
                v-if="language == 1"
              >English</button>
              <button
                class="btn btn-light-grey"
                v-bind:class="{ active: selectedLang === language }"
                v-if="language == 2"
              >Arabic</button>
                <button
                class="btn btn-light-grey"
                v-bind:class="{ active: selectedLang === language }"
                v-if="language == 3"
              >French</button>-->
            </li>
          </ul>
        </section>
      </div>
      <!-- LANGUGAE SECTION ENDS -->
      <div class="d-none d-md-block">
        <img
          v-if="preimere == true || preimere == 'true'"
          src="@/assets/img/svg/dotted-black-line.svg"
          class="img-fluid w-100"
        />
        <img
          v-else
          src="@/assets/img/svg/drop-line.svg"
          class="img-fluid w-100"
        />
      </div>
      <div class="d-md-none">
        <img
          v-if="preimere == true || preimere == 'true'"
          src="@/assets/img/svg/drop-line-black-mobile.svg"
          class="img-fluid w-100 d-md-none"
        />
        <img
          v-else
          src="@/assets/img/svg/drop-line-mobile.svg"
          class="img-fluid w-100 d-md-none"
        />
      </div>
      <!-- SHOWTIME SECTION -->
      <section class="my-4">
        <h3 v-if="formatLanguageList.length > 1" class="CYC">
          5. {{ allLanguageData.ShowTime }}
        </h3>
        <h3 v-else class="CYC">4. {{ allLanguageData.ShowTime }}</h3>
        <ul v-if="cinemaTimeList.length > 0" class="showtime py-3 mb-0">
          <!-- <li class="fill-height" v-for="(time,index) in cinemaTimeList"
          v-if="selectedTimeID != time.id"
           v-on:click="onTimeSelect(time, index)"
            :key="index">
            <div class="timing-slot">
              <p class="time">{{ time.time }}</p>
              <p v-if="time.openstatus > 95" class="pt-3 color-text">
                AVAILABLE
                &nbsp;{{ time.openstatus }}%
              </p>
              <p v-if="time.openstatus <= 1" class="pt-3 color-text">
                SOLD OUT
                &nbsp;{{ time.openstatus }}%
              </p>
              <p v-if="time.openstatus < 55" class="pt-3 color-text">
                SELLING FAST
                &nbsp;{{ time.openstatus }}%
              </p>
            </div>
            <div class="filling" :style="{'height': time.openstatus+'%'}"/>
          </li>-->
          <li
            v-for="(time, index) in cinemaTimeList"
            :key="index"
            :class="[
              'fill-height ',
              showActiveTime == index && time.openstatus > 55
                ? 'fill-green active'
                : time.openstatus > 55
                ? 'fill-green'
                : showActiveTime == index && time.openstatus > 1
                ? 'fill-yellow active'
                : time.openstatus > 1
                ? 'fill-yellow'
                : showActiveTime == index &&
                  time.openstatus >= 0 &&
                  time.openstatus < 1
                ? 'fill-red active timeslot-diabled'
                : time.openstatus >= 0 && time.openstatus < 1
                ? 'fill-red'
                : '',
            ]"
            v-on:click="onTimeSelect(time, index)"
          >
            <!-- showActiveTime != null ? -->
            <div class="timing-slot">
              <p class="time">{{ time.time }}</p>
              <p v-if="time.openstatus > 55" class="pt-4 color-text">
                {{ allLanguageData.ShowTypes[0] }}
                <!-- &nbsp;{{ time.openstatus }}% -->
              </p>
              <p
                v-if="time.openstatus >= 1 && time.openstatus <= 54"
                class="pt-4 color-text"
              >
                {{ allLanguageData.ShowTypes[1] }}
                <!-- &nbsp;{{ time.openstatus }}% -->
              </p>
              <p
                v-if="time.openstatus >= 0 && time.openstatus < 1"
                class="pt-4 color-text"
              >
                {{ allLanguageData.ShowTypes[2] }}
                <!-- &nbsp;{{ time.openstatus }}% -->
              </p>
            </div>
            <div
              class="filling"
              :style="{ height: parseFloat(time.openstatus) - 150 + '%' }"
            />
          </li>
          <!-- <li class="fill-height fill-green">
            <div class="timing-slot">
              <p class="time">12:00 PM</p>
              <p class="pt-3 color-text">AVAILABLE</p>
            </div>
            <div class="filling" style="height:95%;" />
          </li>
          <li class="fill-height fill-red">
            <div class="timing-slot">
              <p class="time">12:00 PM</p>
              <p class="pt-3 color-text">SOLD OUT</p>
            </div>
            <div class="filling" style="height:1%;" />
          </li>
          <li class="fill-height fill-yellow">
            <div class="timing-slot">
              <p class="time">12:00 PM</p>
              <p class="pt-3 color-text">SELLING FAST</p>
            </div>
            <div class="filling" style="height:55%;" />
          </li>
          <li class="fill-height">
            <div class="timing-slot">
              <p class="time">12:00 PM</p>
              <p class="pt-3 color-text">AVAILABLE</p>
            </div>
            <div class="filling" style="height:55%;" />
          </li>-->
        </ul>
        <div v-else>No Show Time Available</div>
      </section>
      <div>{{ message }}</div>
      <section class="my-4">
        <p v-if="checkVisibleSeat" class="font-weight-bold">
          {{ allLanguageData.CallUSON }} 01616707
          {{ allLanguageData.toBookSeat }}
        </p>
        <p
          class="font-weight-bold"
          v-else-if="CountryID == 102 || CountryID == '102'"
        >
          {{ allLanguageData.CallUSON }} 07502100100 or 07502200200
          {{ allLanguageData.toBookSeat }}
        </p>
        <p
          class="font-weight-bold"
          v-else-if="CountryID == 190 || CountryID == '190'"
        >
          {{ allLanguageData.Address1 }} : {{ allLanguageData.KSAAddress }}
        </p>
        <b-button
          v-else
          v-on:click="showRatingTermsPopup()"
          variant="transparent"
          class="btn-proceed"
          >{{ allLanguageData.SelectSeat }}</b-button
        >
      </section>
    </div>
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
      preimere: false,
      showActiveTime: null,
      MovieID: null,
      FormatID: null,
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
    if (movieId && formatId) {
      this.getMovieDetails(movieId, formatId)
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
    onTimeSelect: function (time, index) {
      this.selectedTimeID = time.id
      this.showActiveTime = index
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
      if (this.selectedCinema == '6' || this.selectedCinema == 6) {
        window.localStorage.setItem('PREIMERE', true)
      }
      if (String(this.selectedTimeID).length > 0) {
        this.$router.push({
          name: 'checkout',
          params: {
            movieID: this.MovieID,
            scheduleID: this.selectedTimeID,
            seatLayout: 1,
          },
        })
        window.location.reload()
      } else {
        this.message =
          this.langName == 'ar'
            ? 'يرجى تحديد وقت العرض الخاص بك'
            : 'Please Select Show time'
      }
    },
    getMovieDetails: function (MovieID, FormatID) {
      // this.selectedExp = this.getFilterMovieDetails.filterfomateID;

      let payload = {
        MovieID: MovieID,
        FormatID: FormatID,
        filtercinemaids: this.getFilterMovieDetails
          ? this.getFilterMovieDetails.filtercinemaids
          : '',
        filterfomateID: this.getFilterMovieDetails
          ? this.getFilterMovieDetails.filterfomateID
          : '',
        filtergenreid: this.getFilterMovieDetails
          ? this.getFilterMovieDetails.filtergenreid
          : '',
        filterlangid: this.getFilterMovieDetails
          ? this.getFilterMovieDetails.filterlangid
          : '',
      }

      this.showLoading()
      makeRequest('/GetShowDetails/', 'POST', null, payload)
        .then((response) => {
          const { error, res } = response // console.log("Show details", res);
          if (res.data.Status && res.data.Show.length > 0) {
            Object.assign(this.movieDetails, res.data.Show[0])
            this.title = this.movieDetails.title
            this.ShowTerms = res.data.ShowTerms
            // console.log("Show Ters", this.ShowTerms[0].CountryID);
            if (res.data.Cinema.length > 0) {
              this.cinemaList = res.data.Cinema
              this.selectedCinema = res.data.Cinema[0].ID
              this.getDateList(res.data.Cinema[0].ID, this.MovieID)
            }
            this.$refs.MovieSlider.destroy()
            this.$nextTick(() => {
              this.$refs.MovieSlider.create()
              this.$refs.MovieSlider.goTo(1, true) // if (this.langName == "ar") { //   this.movieSlider.rtl = true; // } else { //   this.movieSlider.rtl = false; // }
            })
          }
        })
        .catch((error) => {
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

              if (this.getFilterMovieDetails) {
                if (this.getFilterMovieDetails.filterfomateID == '') {
                  this.selectedExp = res.data.Data[0].Formats[0]
                } else {
                  this.selectedExp = this.getFilterMovieDetails.filterfomateID
                }
                // ****
                if (this.getFilterMovieDetails.filterlangid == '') {
                  this.selectedLang = res.data.Data[0].formatlanaguges[0]
                } else {
                  this.selectedLang = this.getFilterMovieDetails.filterlangid
                }
              } else {
                this.selectedExp = res.data.Data[0].Formats[0]
                this.selectedLang = res.data.Data[0].formatlanaguges[0]
              }
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
      this.selectedDate = data.ID
      this.getFormatAndTimeList(data.ID, this.MovieID, this.selectedCinema)
    },
  },
}
</script>

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
</style>
