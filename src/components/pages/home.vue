<template>
  <div class="bg-white">
    <BannerSlider
      v-if="bannersBrij && bannersBrij.length > 0"
      :BannerData="bannersBrij"
      :key="componentKeyBanner"
    />
    <div v-if="CountryIDNew != '102'" class="container-fluid px-xl-5 ">
      <QuickBook />
    </div>
    <div class="container section-home px-md-0">

      <div class="theme-tabs-swicher">
        <ul>
          <li>
            <header>
              <span class="mx-2">{{ allLanguageData.Movie }}</span>
            </header>
          </li>
          <li>
            <a @click="getNowPlayingCommingSoon('onmovies1')"
            :class="showOnMovie ? 'is-active' : ''"
            >{{ allLanguageData.whatsOn }}</a>
          </li>
          <li>
            <span class="tabs-divider">|</span>
          </li>
          <li>
            <a @click="getNowPlayingCommingSoon('commingmovies2')" :class="showComingMovie ? 'is-active' : ''">{{ allLanguageData.whatsCom }}</a>
          </li>
        </ul>
      </div>

      <div class="col-md-12 px-0 mb-4">

        <!-- <div class="main-heading pt-3 mt-4 pb-3">
          <div>
            <hr class="primary-line" />
          </div>
          <div class="title">{{ allLanguageData.Movie }} -</div>
          <div class="sub-titles d-flex pl-1">
            <div
              @click="getNowPlayingCommingSoon('onmovies1')"
              :class="showOnMovie ? 'heading-active' : ''"
            >
              {{ allLanguageData.whatsOn }}
            </div>
            <div><hr class="vertical" /></div>
            <div
              @click="getNowPlayingCommingSoon('commingmovies2')"
              :class="showComingMovie ? 'heading-active' : ''"
            >
              {{ allLanguageData.whatsCom }}
            </div>
          </div>
        </div> -->

        <MovieSlider
          :key="componentKeySlider"
          v-if="showOnMovie && getNowShowing.data.length > 0"
          bgcolor="emp-bgsecondary"
          oppbgcolor="emp-bgprimary"
          booknow="true"
          :moviesArray="getNowShowing.data"
        />
        <div
          v-if="
            showComingMovie && getUpcoming && getUpcoming.data.length > 0
          "
        >
          <MovieSlider
            :key="componentKeySlider"
            v-if="
              showComingMovie && getUpcoming && getUpcoming.data.length > 0
            "
            bgcolor="emp-bgprimary"
            oppbgcolor="emp-bgsecondary"
            movieIndex="showmovies"
            booknow="false"
            :moviesArray="getUpcoming.data"
          />
        </div>
        <div
          v-if="showOnMovie && getNowShowing && getNowShowing.data.length == 0"
          class="border-top text-center font-weight-bold pt-3"
        >
          {{ noNowPlay }}
        </div>
        <div
          v-if="
            showComingMovie && getUpcoming && getUpcoming.data.length == 0
          "
          class="border-top text-center font-weight-bold pt-3"
        >
          {{ noCommingSoon }}
        </div>
      </div>

      <div class="col-md-12 px-0 mb-4" v-if="getExperiencesBrij.length > 0">
        <div class="main-heading mt-lg-4 pt-4 pb-3">
          <div>
            <hr class="primary-line" />
          </div>
          <div class="title">{{ allLanguageData.LIVEEMPEXP }}</div>
        </div>
        <div class="row mx-0 justify-content-center">
          <div
            v-for="(experience, index) in getExperiencesBrij"
            class="col-md-3 col-6 mb-1 px-0 exp-card animate__animated animate__fadeInDown"
            :key="index"
          >
            <div
              class="exp-cinema-card mt-2 px-lg-1"
              @click="onShowExperience(experience)"
            >
              <div class="card-overlay">
                <!-- (index + 1) + -->
                <img
                  :src="checkBaseUrl(experience.image_path)"
                  class="cinema-image img-fluid"
                />
                <!-- (index + 1) + -->
                <div class="cinema-logo">
                  <!-- <img
                    :src="
                      require('@/assets/img/new-img/svg-img/logo-1' + '.svg')
                    "
                    class="logo-image img-fluid"
                  /> -->
                </div>
                <div
                  class="
                    bottom-text
                    d-flex
                    align-items-center
                    justify-content-center
                  "
                >
                  <div v-bind:class="langName == 'ar' ? 'pr-3' : 'pr-3'">
                    {{ allLanguageData.Takealook }}
                  </div>
                  <div>
                    <img
                      src="@/assets/img/new-img/svg-img/left-white-arrow.svg"
                      width="20px"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>


    <b-modal
      v-if="showMoviePopUp == true"
      ref="fnbadvertisementmodal"
      id="fnbadvertisementmodal"
      hide-header
      hide-footer
      size="md"
      class="advertisement-modal"
    >
      <button class="btn-close" @click="closeFNBAdPopup">&times;</button>
      <div
        v-if="PopupdetailsArray && PopupdetailsArray.length > 0"
        class="text-center"
      >
        <!-- <img
          v-if="PopupdetailsArray && PopupdetailsArray.length > 0"
          :src="URL_BASE + PopupdetailsArray[0].image"
          class="img-fluid"
        /> -->
        <FnbAdSlider
          :BannerData="PopupdetailsArray"
          :key="componentKeyBanner"
        />
        <!-- <p v-if="Popupdetails[0].content" v-html="Popupdetails[0].content"></p>  -->
      </div>
    </b-modal>


    <b-alert
      v-model="showTopAlert"
      class="position-fixed fixed-top m-0 rounded-0"
      style="z-index: 1000"
      variant="light"
      dismissible
      id="toastAlert"
    >
      <p class="mb-0 small text-black">
        {{ allLanguageData.cookiesText1 }}<br />{{
          allLanguageData.cookiesText2
        }}
        <router-link class="new-emp-red" to="/privacy-policy"
          ><u>{{ allLanguageData.privacyPolicy }}</u></router-link
        >.
      </p>
    </b-alert>
  </div>
</template>
<script>
import QuickBook from '@/components/partials/newQuickBook.vue'
import { makeRequestBrij } from '@/helper/internet.js'
import MovieSlider from '@/components/partials/movieSlider.vue'
import BannerSlider from '@/components/partials/bannerSlider.vue'
import FnbAdSlider from '@/components/partials/fnbAdSlider.vue'
import { makeRequest } from '@/helper/internet.js'
import { mapState, mapGetters, mapActions } from 'vuex'
import {
  LanguageService,
  CountryService,
  TokenService,
} from '@/services/storage.service'
import { error } from 'util'
import { metaInfo, URL_BASE } from '@/helper/constant.js'

var VueScrollTo = require('vue-scrollto')

var options = {
  container: '#leftVideoSlider',
  easing: 'ease-in',
  offset: -100,
  force: true,
  cancelable: true,
  onStart: function (element) {
    // scrolling started
  },
  onDone: function (element) {
    // scrolling is done
  },
  onCancel: function () {
    // scrolling has been interrupted
  },
  x: false,
  y: true,
}
export default {
  components: {
    QuickBook,
    MovieSlider,
    BannerSlider,
    FnbAdSlider,
  },
  metaInfo: metaInfo,

  data () {
    return {
      CountryIDNew: JSON.parse(window.localStorage.getItem('country'))[
        'CountryID'
      ],
      URL_BASE: URL_BASE + '/',
      cinemaImages: [
        'cinema-1',
        'cinema-2',
        'cinema-3',
        'cinema-4',
        'cinema-5',
        'cinema-6',
        'cinema-7',
        'cinema-8',
      ],
      showOnMovie: true,
      showComingMovie: false,
      errorImage: '@/assets/img/logo_p_hori.png',
      preimere: false,
      selectedExp: '',
      showTopAlert: false,
      show4dxData: false,
      isloadmoreItem: true,
      pageNumber: 1,
      TotalpageData: [],
      dropDowns: {
        currentSelected: '',
        languages: {
          selected: {
            LanguageName: 'ALL LANGUAGES',
          },
          list: [],
        },
        cinemaChain: {
          selected: {
            OrganizationName: 'All Cinemas',
          },
          list: [],
        },
        genre: {
          selected: {
            Genre: 'ALL GENRES',
          },
          list: [],
        },
        experience: {
          selected: {
            ExperienceName: 'ALL EXPERIENCES',
            Metacritic: 'ALL EXPERIENCES',
          },
          list: [],
        },
        // cities: {
        //   selected: {
        //     Title: "All Cities"
        //   },
        //   cities: {
        //     selected: {
        //       Title: "All Cities"
        //     },
        //     list: []
        //   }
        // }
      },
      shows: [],
      // With All Data
      AllLatestReleases: [],
      AllComingSoonShows: [],
      AllOperaShows: [],
      AllGERMANFILMWEEK: [],
      PMenu: [],
      // For Bind Data
      visibleShows: {
        show: [],
      },
      comingSoonShows: {
        show: [],
      },
      advanceBookingShows: {
        show: [],
      },
      nowShowingShows: {
        show: [],
      },
      latestReleases: {
        show: [],
      },
      comingSoonCount: 0,
      latestReleaseCount: 0,
      advertisementList: [],
      youTubeList: [],
      currentMovieDetails: {
        format: [],
        title: '',
        language: '',
      },
      currentPosition: 0,
      currentYoutube: '',

      Promotionsfnb: {
        image: '',
        content: '',
        showpromtionpopup: false,
      },

      homeSlider: {
        arrows: false,
        slidesToShow: 1,
        // rtl: true,
        // centerMode: true,
        centerPadding: '8.5%',
        slidesToScroll: 1,
        autoplay: true,
        dots: false,
        responsive: [
          {
            breakpoint: 1400,
            settings: {
              centerPadding: '8%',
            },
          },
          {
            breakpoint: 1024,
            settings: {
              centerPadding: '13%',
            },
          },
          {
            breakpoint: 600,
            settings: {
              centerPadding: '8%',
            },
          },
          {
            breakpoint: 480,
            settings: {
              centerPadding: '0%',
            },
          },
        ],
      },

      movies: {
        dots: true,
        infinite: false,
        speed: 300,
        slidesToShow: 4,
        slidesToScroll: 4,
        dots: false,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 3,
              infinite: true,
              dots: false,
            },
          },
          {
            breakpoint: 992,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 3,
            },
          },
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 2,
            },
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 1,
            },
          },
        ],
      },

      sliderFor: {
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        fade: true,
        dots: false,
        asNavFor: '.sliderNav',
      },

      selectedTab: 'Coming Soon',

      sliderNav: {
        slidesToShow: 3,
        slidesToScroll: 2,
        asNavFor: '.sliderFor',
        dots: false,
        centerMode: true,
        verticalSwiping: true,
        draggble: true,
        vertical: true,
        arrows: true,
        focusOnSelect: true,
      },
      filterSelectedLang: '',
      filterSelectedGenre: '',
      filterSelectedExp: '',
      langName: 'eng',
      // new variables
      noCommingSoon: '',
      noNowPlay: '',
      nowPlayingMovies: [],
      homeBanners: [],
      componentKeyBanner: 0,
      componentKeySlider: 0,
      experienceListData: [],
      PopupdetailsArray: [],
    }
  },
  computed: {
    bannersBrij () {
      return this.$store.getters.getBanners
    },
    getExperiencesBrij () {
      return this.$store.getters.getExperiences
    },
    headerCinemaId () {
      return this.$store.state.headerCinemaStore.headerCinemaId
    },
    showMoviePopUp () {
      return this.$store.state.headerCinemaStore.homeMoviePopup
    },

    isMobile () {
      if (
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          navigator.userAgent
        )
      ) {
        return true
      } else {
        return false
      }
    },

    getNowShowing () {
      return this.$store.getters.getNowShowing
    },
    getUpcoming () {
      return this.$store.getters.getUpcoming
    },
  },
  watch: {
    headerCinemaId: {
      handler: function (newVal, oldVal) {
        this.getNowPlayingCommingSoon('onmovies1')
        this.getBannerList()
      },
      deep: true,
    },
  },
  beforeMount () {
    window.localStorage.setItem('EXPE', '')
    // this.hideLoading();
    this.getBannerList()
    this.getNowPlayingCommingSoon('onmovies1')
    this.getExperienceList()
    this.getPopups()
  },
  beforeCreate: function () {
    let pre = window.localStorage.getItem('PREIMERE')
    if (pre == null || pre == 'false' || pre == false) {
      document.body.className = 'img-section'
    } else {
      document.body.className = 'gold-img-section'
      // if (this.$route.path === "/") {
      //   document.body.style.backgroundImage =
      //     "url('/static/img/desktop-gold-bg.jpg')";
      // }
    }
    if (
      (localStorage.getItem('english') == 1 ||
        !localStorage.getItem('english')) &&
      window.location.pathname != '/ar'
    ) {
      let language = {
        lang: 'eng',
        lang_id: 2,
      }
      localStorage.removeItem('arabic')
      LanguageService.saveLanguage(language)
      localStorage.setItem('english', 2)
      window.location.reload(true)
    }
  },
  mounted: function () {
    // this.hideLoading();

    let activeCountryPop = window.localStorage.getItem('isCookiesPopup')

    if (!activeCountryPop || activeCountryPop == undefined) {
      this.showTopAlert = true
      setTimeout(function () {
        window.localStorage.setItem('isCookiesPopup', '1')
      }, 3000)
    } else {
      this.showTopAlert = false
    }

    // this.$root.$emit("bv::show::modal", "advtModal");
    this.preimere = window.localStorage.getItem('PREIMERE')
    let selectedCountry =
      window.localStorage.getItem('CountryName') || 'LEBANON'
    // if (selectedCountry === "Iraq") {
    //   window.location.pathname = "/iraq";
    // }
    // else
    // if (selectedCountry === "Saudi Arabia") {
    //   window.location.pathname = "/ksa";
    // }
    let lang = LanguageService.getLanguage()

    if (lang == null) {
      this.langName = 'eng'
    } else {
      this.langName = lang['lang']
    }
    this.$refs.fnbadvertisementmodal.show()
  },
  beforeUpdate () {
    if (this.$refs.slick) {
      this.$refs.slick.destroy()
    }
  },

  updated () {
    this.$nextTick(function () {
      if (this.$refs.slick) {
        this.$refs.slick.create()
      }
    })
  },

  methods: {
    getPopups () {
      makeRequestBrij(`/homepage_popup`, 'GET', null, {})
        .then(response => {
          const {res} = response
          if (res && res.data && res.data.Records && res.data.Records.length > 0) {
            const popData = res.data.Records
            console.log(popData, 'Popup data:')
            this.PopupdetailsArray = popData
              .map(obj => ({...obj, image: obj.pp_banner, TargetUrl: obj.pp_image_url}))
              .filter(p => p.pp_lang_id == this.getCurrentLang().brij_lang_id)
          }
        }).catch(err => {
          console.log(err)
        })
    },
    closeFNBAdPopup () {
      this.$store.commit('showHomeMoviePopUp')
      this.$refs.fnbadvertisementmodal.hide()
    },
    onShowExperience (data) {
      // console.log({ onShowExperience: data })

      if (data) {
        this.$router.push({
          path:
            `/screenx/${data.ID}/${data.name.toLowerCase().replace(/ /g, '-')}`,
        })
      }
    },

    getBannerList () {
      this.homeBanners = []
      let payload = {
        CinemaID: this.headerCinemaId,
      }
      // makeRequest('/GetBanners/', 'POST', null, payload)
      //   .then(response => {
      //     const { error, res } = response
      //     if (
      //       res.data.Status &&
      //       res.data.Banners &&
      //       res.data.Banners.length > 0
      //     ) {
      //       this.homeBanners = res.data.Banners
      //     }
      //   })
      //   .catch(error => {
      //     console.log('Error', error)
      //   })
    },
    getExperienceList () {
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
        })
        .catch(error => {
          console.log('Error', error)
        })
    },

    getNowPlayingCommingSoon: function (value) {
      this.showLoading()
      this.componentKeySlider += 1
      this.nowPlayingMovies = []
      let payload = {
        CategoryID: value == 'commingmovies2' ? '2' : '1',
        CinemaID: this.headerCinemaId ? this.headerCinemaId : '',
        // pageNo: 1
      }

      if (value === 'onmovies1') {
        this.showComingMovie = false
        this.showOnMovie = true
      } else {
        this.showComingMovie = true
        this.showOnMovie = false
      }

      Promise.resolve().finally(() => { this.hideLoading() })
      /* makeRequest('/GetDataByCategory/', 'POST', null, payload)
        .then(response => {
          this.hideLoading()
          const { error, res } = response
          if (res.data.hasOwnProperty('Shows') && res.data.Shows.length > 0) {
            this.nowPlayingMovies = res.data.Shows[0].show
            if (value == 'onmovies1') {
              this.$store.state.headerCinemaStore.nowPlayingMovies = this.nowPlayingMovies
            }
          } else {
            this.noNowPlay = 'No Now Showing Shows Found'
            this.noCommingSoon = 'No Coming Shows Found'
          }
          if (
            res.data.hasOwnProperty('Popupdetails') &&
            res.data.Popupdetails.length > 0
          ) {
            this.PopupdetailsArray = res.data.Popupdetails
            this.$refs.fnbadvertisementmodal.show()
          }

          this.hideLoading()
        })
        .catch(error => {
          this.hideLoading()
          console.log('Error', error)
        }) */
    },
  },
}
</script>
