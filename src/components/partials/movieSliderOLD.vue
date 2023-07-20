<template>
  <div>
    <!---Desktop Slider--->
    <div class="row mx-0 empire-slider emp-movie-slider d-none d-xl-block">
      <div class="col-lg-12 px-0" v-if="showSlider == true">
        <slick ref="movie-slider" :options="movieSlider" class="row mx-0">
          <div
            v-for="(data, index) in moviesArray"
            :key="index"
            class="movie-card col-6 mb-4 mb-lg-0"
            @click="setActive(data, index)"
            :id="'movie-card' + index"
          >
            <div class="movie-img">
              <!-- <img :src="data.movie_card_img" class="image img-fluid" /> -->
              <img
                v-if="data.image"
                :src="URL_BASE + data.image"
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
                `${showMovieDetails && isActive(data) ? oppbgcolor : bgcolor}`
              "
            >
              <!-- :class="`${bgcolor} ${
            showMovieDetails && newmovieIndex == data ? bgcolor : oppbgcolor
          }`" -->
              <!-- ${
             showMovieDetails && newmovieIndex == index + movieIndex
               ? bgcolor
               : oppbgcolor
           }`" -->
              <div
                class="title text-truncate"
                v-b-tooltip.hover
                :title="data.movie_title"
              >
                {{ data.movie_title ? data.movie_title : "MOVIE NAME" }}
              </div>
              <div class="tags yellow-tag ar-number">{{ data.rated }}</div>
            </div>
            <div v-if="data.is_advance" class="movie-text-top">
              <div class="title">{{ allLanguageData[data.tag] }}</div>
            </div>
          </div>
        </slick>
        <div v-if="youtubeMovieData">
        <div
          v-for="(data, index) in youtubeMovieData"
          :key="data.movie_id"
          id="movie"
          :class="
            showMovieDetails && isActive(data) ? 'd-none d-md-block +' : 'd-none'
          "

        >
        <div :class="`animate__animated ${data.className}`" id="movie-animation">
          <div
            class="movie-content animate__animated mt-lg-3"
            v-bind:class="langName == 'ar' ? 'text-right' : 'text-left'"
            :id="'movie' + index"
          >
            <div class="movie-detail" :class="oppbgcolor">
              <div class="heading mb-3">
                <div class="title ">{{ data.movie_title }} </div>

                <div class="tags yellow-tag pt-1 ar-number">{{ data.rated }}</div>
              </div>
              <div class="features mb-3">{{ data.genre }}</div>
              <div class="sub-features mb-3">
                <div class="sub d-flex align-items-center">
                  <div v-bind:class="langName == 'ar' ? 'ml-1' : 'mr-1'">
                    <img
                      src="@/assets/img/new-img/svg-img/time-icon.svg"
                      width="20px"
                    />
                  </div>
                  {{ data.runtime }}
                </div>
                <div class="sub ar-number">{{ data.lang }}</div>
                <div v-if="data.subtitle" class="sub">{{ data.subtitle }}</div>
              </div>
              <div class="desc-content mb-3">
                <!-- <div class="d-flex">
                <div class="mb-3">
                  <h6 class="heading mb-0">Release Date</h6>
                  <p class="desc mb-0">{{ data.released }}</p>
                </div>

                </div> -->
                <div class="mb-3 m-format">
                  <h6 class="heading mb-0">{{ allLanguageData.Format }}</h6>
                  <p class="desc mb-0">{{ data.format }}</p>
                </div>
                <div class="mb-3">
                  <h6 class="heading mb-0">{{ allLanguageData.Direction }}</h6>
                  <p class="desc mb-0">{{ data.director }}</p>
                </div>
                <div class="mb-3">
                  <h6 class="heading mb-0">
                    {{ allLanguageData.ReleaseDate }}
                  </h6>
                  <p class="desc mb-0">{{ data.released }}</p>
                </div>
                <div class="mb-3">
                  <h6 class="heading mb-0">{{ allLanguageData.LeadCast }}</h6>
                  <read-more
                    class="mb-0 desc read-more-text"
                    more-str="read more"
                    less-str="read less"
                    :text="data.actor"
                    :max-chars="80"
                    link="#"
                  ></read-more>
                </div>
                <div>
                  <h6 class="heading mb-0">
                    {{ allLanguageData.Synopsis }}
                  </h6>
                  <!-- <p class="desc mb-0">
                    {{ data.synopsis }}
                  </p> -->
                  <read-more
                    class="mb-0 desc read-more-text"
                    more-str="read more"
                    less-str="read less"
                    :text="data.synopsis"
                    :max-chars="80"
                    link="#"
                  ></read-more>
                </div>
              </div>
              <div class="book-btn" v-if="booknow == 'true'">
                <!-- <button
                  v-if="isShowTime == 'Yes'"
                  v-on:click="onclickShowtimeBookMvi(data.movie_id)"
                  class="btn btn-book-now"
                >
                  BOOK NOW
                </button> -->
                <button
                  v-on:click="goToMovieDetails(data, '1')"
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
              <div class="video h-100 position-relative ">
                <iframe
                  width="560"
                  height="315"
                  :src="
                    'https://www.youtube.com/embed/' +
                      data.trailer +
                      '?controls=0'
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
          v-for="(data, index) in moviesArrayPaginated"
          :key="index"
          v-on:click="
            booknow == 'true'
              ? goToMovieDetails(data, '1')
              : goToMovieDetails(data, '2')
          "
          class="movie-card col-6 col-md-3 mb-4 mb-lg-0"
        >
          <div class="movie-img">
            <!-- <img :src="data.movie_card_img" class="image img-fluid" /> -->
            <img
              v-if="data.image"
              :src="URL_BASE + data.image"
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
              `${showMovieDetails && isActive(data) ? oppbgcolor : bgcolor}`
            "
          >
            <!-- :class="`${bgcolor} ${
            showMovieDetails && newmovieIndex == data ? bgcolor : oppbgcolor
          }`" -->
            <!-- ${
             showMovieDetails && newmovieIndex == index + movieIndex
               ? bgcolor
               : oppbgcolor
           }`" -->
            <div
              class="title text-truncate"
              v-b-tooltip.hover
              :title="data.movie_title"
            >
              {{ data.movie_title ? data.movie_title : "MOVIE NAME" }}
            </div>
            <div class="tags yellow-tag ar-number">{{ data.rated }}</div>
          </div>
          <div v-if="data.is_advance" class="movie-text-top">
            <div class="title">{{ data.tag }}</div>
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
      youtubeMovieData: [],

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

    console.log(this.paginate(this.moviesArray, 2, 1), 'kk')
  },
  methods: {
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
    goToMovieDetails: function (data, cat_id) {
      this.$router.push({
        name: 'cinemashowtimes',
        params: {
          cat_id: cat_id,
          movieId: data.movie_id,
          movieName:
            this.LanguageID == '1'
              ? data.movie_title.replace(/ /g, '-')
              : data.movie_title
                .toLowerCase()
                .replace(/[^\w\s]/gi, '')
                .replace(/ /g, '-'),
        },
      })
    },
    setActive: function (item, index) {
      this.youtubeMovieData = []
      let array = this.moviesArray.filter(x => {
        return x.movie_id == item.movie_id
      })

      if (array.length > 0) {
        this.youtubeMovieData = array
        this.youtubeMovieData[0].className = 'animate__pulse'
        window.scrollTo(0, 950)
        console.log(this.youtubeMovieData)
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
