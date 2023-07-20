<template>
  <!--Start Banners Sliders--->
  <section class="section-banner header-space-40">
    <slick
      v-if="BannerData.length > 0"
      ref="bannerslider"
      :options="bannerSlider"
    >
      <div v-for="(data, index) in BannerData" :key="index">
        <div class="banner-img">
          <div :class="[data.TargetUrl]">
            <a :href="data.TargetUrl" :style="data.TargetUrl ? 'cursor:pointer;' : 'pointer-events:none;'">
              <!-- <img :src="data.web_banner_img" class="banner-movie-img" /> -->
              <img :src="BrijBaseUrl + data.image" class="img-fluid" />
            </a>
          </div>
          <!-- <div class="banner-content">
            <div class="content">
              <div class="heading">{{ data.title }}</div>
              <div class="desc">
                <read-more
                  class="mb-0"
                  :text="data.description"
                  :max-chars="100"
                ></read-more>

              </div>
              <div class="mt-3">
                <button
                  v-if="data.movie == true"
                  v-on:click="goToMovieDetails(data, '1')"
                  class="btn emp-button px-4"
                >
                  {{ allLanguageData.BookNow }}
                </button>
              </div>
            </div>
          </div> -->
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
  },
  mounted: function () {
    // console.log(this.BannerData, "hh");
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
      this.$router.push({
        name: 'cinemashowtimes',
        params: {
          cat_id: cat_id,
          movieId: data.MovieID,
          movieName:
            this.LanguageID == '1'
              ? data.title.replace(/ /g, '-')
              : data.title
                .toLowerCase()
                .replace(/[^\w\s]/gi, '')
                .replace(/ /g, '-'),

          // movieName: data.title.toLowerCase().replace(/ /g, "-")
        },
      })
    },
  },
}
</script>
<style></style>
