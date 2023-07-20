<template>
  <div>
    <!---Desktop Slider--->
    <div class="row mx-0 empire-slider emp-movie-slider d-none d-xl-block">
      <div class="col-lg-12 px-0" v-if="showSlider == true">
        <slick ref="movie-slider" :options="movieSlider" class="row mx-0">
          <div
            v-for="(movie, index) in moviesArray"
            :key="index"
            class="movie-card col-6 mb-4 mb-lg-0"
            @click="setActive(movie, index)"
            :id="'movie-card' + index"
          >
            <div class="movie-img">
              <!-- <img :src="movie.movie_card_img" class="image img-fluid" /> -->
              <img
                v-if="
                  checkBaseUrl(
                    getLangSpecificAttribute(
                      movie.altMovieContent,
                      getCurrentLang().brij_lang_id,
                      'artwork'
                      ) ||
                      movie.artwork
                  )
                "
                :src="
                  checkBaseUrl(
                    getLangSpecificAttribute(
                      movie.altMovieContent,
                      getCurrentLang().brij_lang_id,
                      'artwork'
                      ) ||
                      movie.artwork
                  )
                "
                class="image img-fluid"
              />
              <img
                v-else
                src="@/assets/img/new-img/png-img/default-Img.png"
                class="image img-fluid"
              />
            </div>

            <div
              class="movie-text-bottom"
              :class="
                `${showMovieDetails && isActive(movie) ? oppbgcolor : bgcolor}`
              "
            >
              <!-- :class="`${bgcolor} ${
            showMovieDetails && newmovieIndex == movie ? bgcolor : oppbgcolor
          }`" -->
              <!-- ${
             showMovieDetails && newmovieIndex == index + movieIndex
               ? bgcolor
               : oppbgcolor
           }`" -->
              <div
                class="title text-truncate"
                v-b-tooltip.hover
                :title="
                  getLangSpecificAttribute(
                    movie.altMovieContent,
                    getCurrentLang().brij_lang_id,
                    'mc_title'
                  ) || movie.movie_title || movie.original_title_of_movie
                "
              >
                {{
                  getLangSpecificAttribute(
                    movie.altMovieContent,
                    getCurrentLang().brij_lang_id,
                    'mc_title'
                  ) || movie.movie_title || movie.original_title_of_movie || "MOVIE NAME"
                }}
              </div>
              <div class="tags yellow-tag ar-number">{{ movie.rated || movie.rating }}</div>
            </div>
            <div v-if="isAdvanced(movie)" class="movie-text-top">
              <div class="title">{{ allLanguageData['ADVANCE'] }}</div>
            </div>
          </div>
        </slick>
        <div v-if="activeMovieData">
        <div
          v-for="(activeMovieData, index) in activeMovieData"
          :key="activeMovieData.movie_id"
          id="movie"
          :class="
            showMovieDetails && isActive(activeMovieData) ? 'd-none d-md-block +' : 'd-none'
          "

        >
        <div :class="`animate__animated ${activeMovieData.className}`" id="movie-animation">
          <div
            class="movie-content animate__animated mt-lg-3"
            v-bind:class="langName == 'ar' ? 'text-right' : 'text-left'"
            :id="'movie' + index"
          >
            <div class="movie-detail" :class="oppbgcolor">
              <div class="heading mb-3">
                <div class="title ">{{
                    getLangSpecificAttribute(
                      activeMovieData.altMovieContent,
                      getCurrentLang().brij_lang_id,
                      'mc_title'
                    ) || activeMovieData.movie_title || activeMovieData.original_title_of_movie || "MOVIE NAME"
                  }}
                </div>

                <div class="tags yellow-tag pt-1 ar-number">
                  {{ activeMovieData.rating }}
                </div>
              </div>
              <div
                class="features mb-3"
                v-if="activeMovieData.genres_with_translations
                  .map(g => g[getCurrentLang().iso_2 || 'en']).filter(x => !!x).join(', ').length"
              >
                {{
                  activeMovieData.genres_with_translations
                  .map(g => g[getCurrentLang().iso_2 || 'en']).filter(x => !!x).join(', ')
                }}
              </div>
              <div class="sub-features mb-3">
                <div class="sub d-flex align-items-center" v-if="activeMovieData.mrrdr_runtime">
                  <div v-bind:class="langName == 'ar' ? 'ml-1' : 'mr-1'">
                    <img
                      src="@/assets/img/new-img/svg-img/time-icon.svg"
                      width="20px"
                    />
                  </div>
                  {{ activeMovieData.mrrdr_runtime }} MIN
                </div>
                <div class="sub ar-number" v-if="activeMovieData.lang_name">{{ activeMovieData.lang_name }}</div>
                <div v-if="activeMovieData.subtitle" class="sub">{{ activeMovieData.subtitle }}</div>
              </div>
              <div class="desc-content mb-3">
                <!-- <div class="d-flex">
                <div class="mb-3">
                  <h6 class="heading mb-0">Release Date</h6>
                  <p class="desc mb-0">{{ activeMovieData.released }}</p>
                </div>

                </div> -->
                <div class="mb-3 m-format" v-if="activeMovieData.format_name_array && activeMovieData.format_name_array.join(', ').length">
                  <h6 class="heading mb-0">{{ allLanguageData.Format }}</h6>
                  <p class="desc mb-0">{{ activeMovieData.format_name_array.join(', ') }}</p>
                </div>

                <div class="mb-3" v-if="activeMovieData.director">
                  <h6 class="heading mb-0">{{ allLanguageData.Direction }}</h6>
                  <p class="desc mb-0">{{ activeMovieData.director }}</p>
                </div>

                <div class="mb-3" v-if="activeMovieData.mrrdr_release_date || activeMovieData.original_release_date">
                  <h6 class="heading mb-0">
                    {{ allLanguageData.ReleaseDate }}
                  </h6>
                  <p class="desc mb-0">{{ activeMovieData.mrrdr_release_date || activeMovieData.original_release_date }}</p>
                </div>

                <div class="mb-3" v-if="activeMovieData.cast_crew && activeMovieData.cast_crew.join(', ').length">
                  <h6 class="heading mb-0">{{ allLanguageData.LeadCast }}</h6>
                  <read-more
                    class="mb-0 desc read-more-text"
                    more-str="read more"
                    less-str="read less"
                    :text="activeMovieData.cast_crew.join(', ')"
                    :max-chars="80"
                    link="#"
                  ></read-more>
                </div>
                <div
                  v-if="
                      getLangSpecificAttribute(
                        activeMovieData.altMovieContent,
                        getCurrentLang().brij_lang_id,
                        'mc_plot'
                      ) || activeMovieData.mc_plot
                  "
                >
                  <h6 class="heading mb-0">
                    {{ allLanguageData.Synopsis }}
                  </h6>
                  <!-- <p class="desc mb-0">
                    {{ activeMovieData.synopsis }}
                  </p> -->
                  <read-more
                    class="mb-0 desc read-more-text"
                    more-str="read more"
                    less-str="read less"
                    :text="
                      getLangSpecificAttribute(
                        activeMovieData.altMovieContent,
                        getCurrentLang().brij_lang_id,
                        'mc_plot'
                      ) || activeMovieData.mc_plot
                    "
                    :max-chars="80"
                    link="#"
                  ></read-more>
                </div>
              </div>
              <div class="book-btn" v-if="booknow == 'true'">
                <!-- <button
                  v-if="isShowTime == 'Yes'"
                  v-on:click="onclickShowtimeBookMvi(activeMovieData.movie_id)"
                  class="btn btn-book-now"
                >
                  BOOK NOW
                </button> -->
                <button
                  v-on:click="goToMovieDetails(activeMovieData, '1')"
                  class="btn btn-book-now"
                >
                  {{ allLanguageData.BookNow }}
                </button>
              </div>
            </div>

            <div
              v-if="showMovieDetails == true"
              class="movie-video ytp-cued-thumbnail-overlay-image"
            >

              <!-- <img src="@/assets/img/banner3.jpg" class="image img-fluid h-100" /> -->
              <div class="video h-100 position-relative " :class="[
                        getLangSpecificAttribute(
                          activeMovieData.trailer_array,
                          getCurrentLang().brij_lang_id,
                          'mt_link',
                          'lang_id',
                          )
                ]">
                <iframe
                  width="560"
                  height="315"
                  :src="
                    `https://www.youtube.com/embed/${
                      (
                        getLangSpecificAttribute(
                          activeMovieData.trailer_array,
                          getCurrentLang().brij_lang_id,
                          'mt_link',
                          'lang_id',
                          ) || getSafe(() => activeMovieData.trailer_array[0].mt_link) || ''
                      ).split('v=')[1]
                    }?controls=0`
                  "
                  title="YouTube video player"
                  frameborder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowfullscreen
                ></iframe>
                <!-- <div class="video-icon">
                <img
                  src="@/assets/img/new-img/svg-img/video-icon.svg"
                  class="image"
                />
              </div> -->
                <div class="close-video-icon">
                  <img
                    @click="closeMviDetails"
                    src="@/assets/img/new-img/svg-img/cross-video.svg"
                    class="image"
                  />
                </div>
              </div>
            </div>
          </div>
          </div>
        </div>
        </div>
      </div>
    </div>

    <!--Mobile Slider--->
    <div class="d-block d-md-block d-lg-block d-xl-none">
      <div class="row mx-0">
        <div
          v-for="(movie, index) in moviesArrayPaginated"
          :key="index"
          v-on:click="
            booknow == 'true'
              ? goToMovieDetails(movie, '1')
              : goToMovieDetails(movie, '2')
          "
          class="movie-card col-6 col-md-3 mb-4 mb-lg-0"
        >
          <div class="movie-img">
            <!-- <img :src="movie.movie_card_img" class="image img-fluid" /> -->
            <img
              v-if="
                  checkBaseUrl(
                    getLangSpecificAttribute(
                      movie.altMovieContent,
                      getCurrentLang().brij_lang_id,
                      'artwork'
                      ) ||
                      movie.artwork
                  )
                "
              :src="
                  checkBaseUrl(
                    getLangSpecificAttribute(
                      movie.altMovieContent,
                      getCurrentLang().brij_lang_id,
                      'artwork'
                      ) ||
                      movie.artwork
                  )
                "
              class="image img-fluid"
            />
            <img
              v-else
              src="@/assets/img/new-img/png-img/default-Img.png"
              class="image img-fluid"
            />
          </div>

          <div
            class="movie-text-bottom"
            :class="
              `${showMovieDetails && isActive(movie) ? oppbgcolor : bgcolor}`
            "
          >
            <!-- :class="`${bgcolor} ${
            showMovieDetails && newmovieIndex == movie ? bgcolor : oppbgcolor
          }`" -->
            <!-- ${
             showMovieDetails && newmovieIndex == index + movieIndex
               ? bgcolor
               : oppbgcolor
           }`" -->
            <div
              class="title text-truncate"
              v-b-tooltip.hover
              :title="
                getLangSpecificAttribute(
                  movie.altMovieContent,
                  getCurrentLang().brij_lang_id,
                  'mc_title'
                ) || movie.movie_title || movie.original_title_of_movie
              "
            >
              {{
                getLangSpecificAttribute(
                  movie.altMovieContent,
                  getCurrentLang().brij_lang_id,
                  'mc_title'
                ) || movie.movie_title || movie.original_title_of_movie
                  ? getLangSpecificAttribute(
                      movie.altMovieContent,
                      getCurrentLang().brij_lang_id,
                      'mc_title'
                    ) || movie.movie_title || movie.original_title_of_movie
                  : "MOVIE NAME"
              }}
            </div>
            <div class="tags yellow-tag ar-number">{{ movie.rating }}</div>
          </div>
          <div
            v-if="isAdvanced(movie)"
            class="movie-text-top"
          >
            <div class="title">{{ allLanguageData['ADVANCE'] }}</div>
          </div>
        </div>
      </div>

      <b-button
        v-if="moviesArrayPaginated.length < moviesArray.length"
        class="btn-load-more"
        @click="onLoadMore"
        >Load More
      </b-button>
    </div>
  </div>
</template>
<script>
import { URL_BASE } from '@/helper/constant.js'
import {
  LanguageService,
  CountryService,
  TokenService,
} from '@/services/storage.service'
import moment from 'moment'

export default {
  props: {
    bgcolor: String,
    oppbgcolor: String,
    movieIndex: String,
    moviesArray: Array,
    booknow: String,
    isShowTime: String,
  },
  data () {
    return {
      LanguageID: '',
      moviesArrayPaginated: [],
      activeMovieData: [],

      pageNo: 1,
      showMovieDetails: false,
      URL_BASE: URL_BASE + '/',
      showSlider: false,
      activeItem: '1',
      oldIndex: '',
      newmovieIndex: null,
      slickIndex: null,
      movieSlider: {
        // autoplay: true,
        // autoplaySpeed: 2500,
        arrows: true,
        dots: false,
        infinite: true,
        slidesToScroll: 6,
        slidesToShow: 6,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 6,
              slidesToScroll: 1,
            },
          },
        ],
      },
    }
  },
  mounted () {
    let language = LanguageService.getLanguage()
    if (!language) {
      this.LanguageID = 2
    } else {
      this.LanguageID = language.lang_id
    }
    // this.hideLoading();
  },
  beforeMount () {
    // this.showLoading();

    if (this.moviesArray.length > 0) {
      this.moviesArrayPaginated = this.paginate(
        this.moviesArray,
        6,
        this.pageNo
      )
    }
    let showTimeMoviesArrySlider = []
    if (this.isShowTime == 'Yes') {
      this.showSlider = true
    } else {
      this.showSlider = true
    }
  },
  methods: {
    moment,
    isAdvanced (movie) {
      if (this.booknow == 'false') return false

      let result = !(
        !movie.original_release_date ||
        (!!movie.original_release_date && moment(movie.original_release_date).isSameOrBefore(moment()))
      )

      return result
    },
    onLoadMore () {
      this.pageNo = this.pageNo + 1

      let paginateArry = this.paginate(this.moviesArray, 6, this.pageNo)
      console.log(paginateArry)
      this.moviesArrayPaginated.push(...paginateArry)

      console.log(this.moviesArrayPaginated, 'hg')
    },
    paginate (array, page_size, page_number) {
      // human-readable page numbers usually start with 1, so we reduce 1 in the first argument
      return array.slice(
        (page_number - 1) * page_size,
        page_number * page_size
      )
    },

    onclickShowtimeBookMvi (ID) {
      this.$emit('changeMviFilter', ID)
    },
    goToMovieDetails: function (movie, cat_id) {
      console.log('goToMovieDetails', { movie, cat_id })
      this.$router.push({
        name: 'cinemashowtimes',
        params: {
          cat_id: cat_id,
          movieId: movie.movie_id,
          movieName:
            this.LanguageID == '1'
              ? movie.movie_title.replace(/ /g, '-')
              : movie.movie_title
                .toLowerCase()
                .replace(/[^\w\s]/gi, '')
                .replace(/ /g, '-'),
        },
      })
    },
    setActive: function (item, index) {
      this.activeMovieData = []
      let array = this.moviesArray.filter(x => {
        return x.movie_id == item.movie_id
      })

      if (array.length > 0) {
        this.activeMovieData = array
        this.activeMovieData[0].className = 'animate__pulse'
        window.scrollTo(0, 950)
        console.log(this.activeMovieData)
      }

      // console.log("Byee", item, index);
      if (window.matchMedia('(max-width: 767px)').matches) {
        $('#movie' + this.oldIndex).remove()
        const htmlCode = $('#movie' + index).html()
        if (index % 2 == 0) {
          $(htmlCode).insertAfter('#movie-card' + (index + 1))
        } else {
          $(htmlCode).insertAfter('#movie-card' + index)
        }
        this.oldIndex = index
      }
      this.showMovieDetails = true

      // window.scrollTo(0, 950);
      this.activeItem = item
    },
    closeMviDetails () {
      this.showMovieDetails = false
      // window.scrollTo(0, 400);
    },
    isActive: function (item) {
      if (this.activeItem === item) {
        // console.log("set", item);
        return true
      }
    },

    getMovieDetails: function (index) {
      // console.log(index);
      console.log(this.moviesArray)
      this.newmovieIndex = index
      // console.log(this.newmovieIndex, this.movieIndex);
      // this.slickIndex = index;
      this.showMovieDetails = !this.showMovieDetails
    },
  },
}
</script>
<style>
/* .ytp-cued-thumbnail-overlay-image {
  background-size: contain !important;
  -webkit-background-size: contain !important;
} */
.ytp-cued-thumbnail-overlay-image {
background-size: contain !important;
 -moz-background-size: contain !important;
 -webkit-background-size: contain !important;
}
.emp-movie-slider .slick-track {
  margin-left: 0 !important;
}
/* .animate__pulse {
  window.scrollTo(0, 950)
} */
</style>
