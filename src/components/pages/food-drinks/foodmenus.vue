<template>
  <div>
    <!--Start Banner Slider--->
    <section class="section-banner simple-banner">
      <slick
        v-if="pagesList.length > 0"
        ref="banner-slider"
        :options="bannerSlider"
      >
        <div v-for="(data, index) in pagesList.flatMap(p => p.banner).flatMap(b => b.split(','))" :key="index">
          <div class="w-100 banner-slider">
            <div class="banner-img">
              <img
                v-if="data"
                :src="checkBaseUrl(data)"
                class="image" />
            </div>
          </div>
        </div>
      </slick>
    </section>
    <!--End Banner Slider--->
    <div class="container px-0">
      <!-- <QuickBook /> -->
    </div>
    <div class="container custom-container my-3 cinema-menus">
      <div
        class="accordion pt-3"
        v-for="(item, indexArray) in pagesList"
        :key="indexArray"
      >
        <div
          v-for="(records, recordIndex) in item.otherData"
          :key="recordIndex"
        >
          <div class="cinema-accordion offer-accordion">
            <div
              v-b-toggle="'menu' + recordIndex"
              variant="info"
              class="accordion-title"
            >
              <div class="main-heading">
                <div>
                  <hr class="primary-line" />
                </div>
                <div class="title">{{ records.main_name }}</div>
              </div>
            </div>
            <b-collapse :id="'menu' + index" visible>
              <div class="content mb-3">
                <div class="content-title my-3">{{ records.header_name }}</div>
                <div class="content-desc">
                  {{ records.description }}
                </div>
                <div class="offer-imgs empire-slider mx-0 mt-3">
                  <slick ref="food-1" :options="foodSlider1">
                    <div
                      class=""
                      v-for="(data, img_index) in records.images.split(',')"
                      :key="img_index"
                    >
                      <div v-b-modal="'offer-modal' + img_index + indexArray">
                        <img
                          class="offer-img"
                          :src="checkBaseUrl(data)"
                          alt="image-1"
                        />
                      </div>

                      <!-- <img :src="URL_BASE + data" class="offer-img" /> -->
                    </div>
                  </slick>
                  <div
                    class=""
                    v-for="(data, index) in records.images.split(',')"
                    :key="index"
                  >
                    <b-modal
                      :id="'offer-modal' + index + indexArray"
                      hide-footer
                      size="sm"
                      class="food-modal-content"
                      :ref="'offerpopup' + index"
                    >
                      <div>
                        <img
                          class="food-popup-img"
                          :src="checkBaseUrl(data)"
                          alt="img-fluid w-100"
                        />
                      </div>
                    </b-modal>
                  </div>
                </div>
              </div>
            </b-collapse>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import QuickBook from '@/components/partials/newQuickBook.vue'
import {makeRequest} from '@/helper/internet.js'
import {LanguageService} from '@/services/storage.service'
import {makeRequestBrij} from '../../../helper/internet'

export default {
  components: {
    QuickBook
  },
  mounted () {
    let language = LanguageService.getLanguage()
    if (!language) {
      this.LanguageID = 2
    } else {
      this.LanguageID = language.lang_id
    }
    // this.handleResize();
    let lang = LanguageService.getLanguage()
    if (lang == null) {
      this.langName = 'eng'
    } else {
      this.langName = lang['lang']
    }
  },
  data () {
    return {
      // URL_BASE: URL_BASE,
      URL_BASE: 'https://api-empire.brij.tech',
      menuBanners: [],
      menuDataArray: [],
      bannerSlider: {
        arrows: false,
        dots: true,
        infinite: true,
        slidesToScroll: 1,
        slidesToShow: 1,
        autoplay: true,
        autoplaySpeed: 2000
      },
      foodSlider1: {
        arrows: true,
        dots: false,
        infinite: true,
        slidesToScroll: 3,
        slidesToShow: 6,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 4,
              slidesToScroll: 1
            }
          },
          {
            breakpoint: 700,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 1,
              adaptiveHeight: true
            }
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 1,
              adaptiveHeight: true,
              arrows: false
            }
          }
        ]
      },
      pagesList: []
    }
  },
  beforeCreate: function () {
    document.body.className = 'light-section'
  },
  beforeMount () {
    this.getListOfPages()
    //  const { movieId, cat_id } = this.$route.params;
    // if (movieId && cat_id) {
    //   // this.MovieID = movieId.toString().split(",");
    //   // this.CategoryID = cat_id;

    // this.getShowTimeBanners();
    // } else {
    //   console.log(this.$route.params, "jitu");
    //   // this.$router.go(-1);
    // }
  },
  methods: {
    getShowTimeBanners () {
      this.showLoading()
      let payload = {
        PageName: 'foodMenu'
      }

      makeRequest('/PageData/', 'POST', null, payload)
        .then(response => {
          const { error, res } = response // console.log("Show details", res);

          console.log(res.data, 'uu')
          if (res.data.hasOwnProperty('banner') && res.data.banner.length > 0) {
            this.menuBanners = res.data.banner
          }

          if (res.data.hasOwnProperty('data') && res.data.data.length > 0) {
            this.menuDataArray = res.data.data
          }

          // if (res.data.hasOwnProperty("data") && res.data.data.length > 0) {
          //   this.header = res.data.data[0].header;
          //   this.header1 = res.data.data[0].header1;
          //   this.description = res.data.data[0].description;
          // }

          this.hideLoading()
          console.log('jitu')
        })
        .catch(error => {
          this.hideLoading()
          console.log('Error', error)
        })
    },
    getListOfPages () {
      const pagesFunction = async () => {
        try {
          let payload = {
            mpm_name: 'foodMenu',
            mpm_lang_id: this.getCurrentLang().brij_lang_id
          }
          let response = await makeRequestBrij(
            `/api/admin/list-of-pages?mpm_name=${
              payload.mpm_name ? payload.mpm_name : ''
            }&mpm_lang_id=${payload.mpm_lang_id ? payload.mpm_lang_id : ''}`,
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
            this.menuBanners = this.getSafe(() => this.pagesList[0], {banner: ''})
          }
        } catch (error) {
          console.log('getPagesList', { error })
        }
      }
      pagesFunction()
    }
  }
}
</script>
<style>
.offer-imgs .offer-img {
  border: 1px solid #b40a28;
  width: 95%;
  cursor: pointer;
}
@media (max-width: 767px) {
  /* .offer-imgs .offer-img {
    width: 100%;
  } */
}
.offer-imgs .slick-track {
  margin-left: 0 !important;
}
</style>
