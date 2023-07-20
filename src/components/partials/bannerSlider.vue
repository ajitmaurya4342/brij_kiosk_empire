<template>
  <!--Start Banners Sliders--->
  <section class="section-banner header-space">
    <slick ref="bannerslider" :options="bannerSlider">
      <div
        v-for="(data, index) in bannersBrij"
        :key="index"
        class="w-100 banner-slider"
      >
        <div class="banner-img">
          <div>
            <!-- <img :src="data.web_banner_img" class="banner-movie-img" /> -->
            <img
              :alt="data.banner_image_url"
              :src="checkBaseUrl(data.banner_image_url)"
              class="banner-movie-img d-block d-md-none"
            />
            <img
              :alt="data.banner_image_url"
              :src="checkBaseUrl(data.banner_image_url)"
              class="banner-movie-img d-none d-md-block"
            />
            <!-- <div v-if="data.movie == true" class="banner-overlay">
              <img
                src="@/assets/img/new-img/jpg-img/banner-overlay.png"
                class="banner-overlay-img"
              />
            </div> -->
          </div>
          <div class="banner-content" :style="data.banner_type_id !== 2 && data.banner_generic_url?'width:30%':''">
            <div class="content">
              <!-- <div class="heading">{{ data.title }}</div>
              <div class="desc">
                <read-more
                  class="mb-0"
                  :text="data.description"
                  :max-chars="100"
                ></read-more>
                <span class="desc-small-text">Learn More</span>
              </div> -->
              <div class="">
                <button
                  v-if="data.banner_type_id === 1 || (!data.banner_type_id !== 2 && data.banner_generic_url)"
                  v-on:click="goToMovieDetails(data, '1')"
                  class="btn-cta-primary"
                >
                  {{ allLanguageData.BookNow }}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </slick>
  </section>
  <!--End Banners Sliders--->
</template>
<script>
import {
  LanguageService,
  CountryService,
  TokenService,
} from '@/services/storage.service'
import { URL_BASE } from '@/helper/constant.js'
export default {
  props: {
    BannerData: Array,
  },

  beforeMount () {
    this.hideLoading()
    // if (this.BannerData.length > 0) {
    //   // alert();
    //   // console.log("jitu");
    // }
    // this.bannerArray = this.BannerData;
  },

  computed: {
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
    bannersBrij () {
      return this.$store.getters.getBanners
    },
  },
  mounted: function () {
    let language = LanguageService.getLanguage()
    if (!language) {
      this.LanguageID = 2
    } else {
      this.LanguageID = language.lang_id
    }

    // let lang = LanguageService.getLanguage();

    // console.log(lang, "lang");

    // if (lang == null) {
    //   this.langName = "eng";
    // } else {
    //   this.langName = lang["lang"];
    // }

    // if (this.langName == "ar") {
    //   // this.bannerSlider.rtl = true;
    //   // this.movies.rtl = true;
    // } else {
    //   // this.homeSlider.rtl = false;
    // }
  },
  data () {
    return {
      LanguageID: '',
      bannerArray: [],
      URL_BASE: URL_BASE + '/',
      bannerSlider: {
        autoplay: true,
        autoplaySpeed: 2000,
        arrows: false,
        dots: true,
        infinite: true,
        slidesToScroll: 1,
        slidesToShow: 1,
      },
    }
  },
  methods: {
    goToMovieDetails: function (data, cat_id) {
      console.log({ data, cat_id })

      if (data.banner_type_id === 1) {
        this.$router.push({
          name: 'cinemashowtimes',
          params: {
            cat_id: cat_id,
            movieId: data.movie_id,
            movieName:
            this.LanguageID == '1'
              ? String(data.movie_id || data.banner_header || data.banner_name).replace(/ /g, '-')
              : String(data.movie_id || data.banner_header || data.banner_name)
                .toLowerCase()
                .replace(/[^\w\s]/gi, '')
                .replace(/ /g, '-'),

          // movieName: data.title.toLowerCase().replace(/ /g, "-")
          },
        })
      } else {
        window.open(data.banner_generic_url)
      }
    },
  },
}
</script>
<style></style>
