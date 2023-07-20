<template>
  <div>
    <!--Start Banner Slider--->
    <section class="section-banner simple-banner">
      <slick
        v-if="showExpBanners.length > 0"
        ref="bannerSlider"
        :options="bannerSlider"
      >
        <div
          v-for="(data, index) in headerExpArry"
          :key="index"
          class="w-100 banner-slider"
        >
          <div class="banner-img">
            <div>
              <img :src="URL_BASE + data.banner" class="image" />
            </div>
          </div>
        </div>
      </slick>
    </section>
    <!--End Banner Slider--->
    <div
      class="container custom-container screen-navigation py-4 mt-n1 px-lg-5"
    >
      <div class="screen-header mx-0" @click="setActive(true)">
        <div class="heading">
          <span class="d-none d-md-block">{{
            allLanguageData.Experiences
          }}</span>
          <span class="d-block d-md-none">{{ selectedExpName }}</span>
        </div>
        <div class="d-block d-xl-none">
          <div
            class="open"
            :class="showContent ? 'd-none d-xl-block' : 'd-block'"
          >
            <img
              src="@/assets/img/new-img/svg-img/left-white-arrow.svg"
              width="20px"
              class="open-icon"
            />
          </div>
          <div
            class="close"
            :class="showContent ? 'd-block' : 'd-none d-xl-block'"
          >
            <img
              src="@/assets/img/new-img/svg-img/left-white-arrow.svg"
              width="20px"
              class="close-icon"
            />
          </div>
        </div>
      </div>
      <div
        class="screen-tabs pt-4 pt-xl-0 animate__animated animate__pulse"
        :class="showContent ? 'd-block' : 'd-none d-lg-block'"
      >
        <ul class="list-inline my-0 py-0">
          <li
            v-for="(data, Index) in ExpHeader"
            :key="Index"
            class="list-inline-item"
          >
            <a
              :style="expSelected == data.ID ? 'color:red' : ''"
              @click="passExpId(data.ID, data.name)"
              class="screen-link"
              >{{ data.name }}</a
            >
          </li>
          <!-- <li class="list-inline-item">
            <router-link class="screen-link" :to="{ name: 'Minis' }"
              >Minis</router-link
            >
          </li>
          <li class="list-inline-item">
            <router-link class="screen-link" :to="{ name: 'screenxexp' }"
              >ScreenX</router-link
            >
          </li>
          <li class="list-inline-item">
            <router-link class="screen-link" :to="{ name: '4DX' }"
              >4DX</router-link
            >
          </li>
          <li class="list-inline-item">
            <router-link class="screen-link" :to="{ name: 'Dolby' }"
              >DOLBY ATMOS</router-link
            >
          </li>
          <li class="list-inline-item">
            <router-link class="screen-link" :to="{ name: 'Sphera' }"
              >SPHERA</router-link
            >
          </li> -->
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import { makeRequest } from '@/helper/internet.js'
import { mapState, mapGetters, mapActions } from 'vuex'
import {
  LanguageService,
  CountryService,
  TokenService,
} from '@/services/storage.service'
import { metaInfo, URL_BASE } from '@/helper/constant.js'
export default {
  props: {
    headerExpArry: Array,
    isHeaderId: String,
  },
  beforeMount () {
    this.getShowTimeBanners()
    this.expSelected = this.isHeaderId
      ? this.isHeaderId
      : this.$route.params.expID
    this.$emit('changeHeaderExp', this.expSelected)
    if (this.headerExpArry && this.headerExpArry.length > 0) {
      this.ExpHeader = this.headerExpArry
    }
  },
  mounted: function () {
    // let language = LanguageService.getLanguage();
    // if (!language) {
    //   this.LanguageID = 2;
    // } else {
    //   this.LanguageID = language.lang_id;
    // }
    // // this.handleResize();
    // let lang = LanguageService.getLanguage();
    // if (lang == null) {
    //   this.langName = "eng";
    // } else {
    //   this.langName = lang["lang"];
    // }
    if (this.langName == 'ar') {
      document.body.classList.add('rtl-class')
      document.documentElement.setAttribute('lang', 'ar')
    } else if (this.langName == 'eng') {
      document.documentElement.setAttribute('lang', 'en')
      document.body.classList.remove('rtl-class')
    }
  },
  components: {},
  data () {
    return {
      URL_BASE: URL_BASE + '/',
      ExpHeader: [],
      showExpBanners: [],
      showContent: false,
      expSelected: '',
      selectedExpName: 'EXPERIENCES',
      bannerSlider: {
        arrows: false,
        dots: true,
        infinite: true,
        slidesToScroll: 1,
        slidesToShow: 1,
        autoplay: true,
        autoplaySpeed: 2000,
      },
    }
  },
  beforeCreate: function () {
    document.body.className = 'light-section'
  },
  methods: {
    getShowTimeBanners () {
      let payload = {
        PageName: 'expe',
      }

      makeRequest('/PageData/', 'POST', null, payload)
        .then(response => {
          const { error, res } = response // console.log("Show details", res);

          this.hideLoading()

          if (res.data.hasOwnProperty('banner') && res.data.banner.length > 0) {
            this.showExpBanners = res.data.banner
          }

          this.hideLoading()
          console.log('jitu')
        })
        .catch(error => {
          this.hideLoading()
          console.log('Error', error)
        })
    },
    passExpId (ID, name) {
      this.showLoading()
      this.expSelected = ID
      this.selectedExpName = name
      this.hideLoading()
      this.$emit('changeHeaderExp', ID)
    },
    setActive: function (data) {
      this.showContent = !this.showContent
    },
  },
}
</script>
