<template>
  <div>
    <!--Start Banner Slider--->
    <section class="section-banner simple-banner">
      <slick
        v-if="pagesList.length > 0"
        ref="banner-slider"
        :options="bannerSlider"
      >
        <div
          v-for="(data, index) in pagesList"
          :key="index"
          class="w-100 banner-slider"
        >
          <div
            v-for="(dataBanner, indexBanner) in data.banner.split(',')"
            :key="indexBanner"
          >
            <div v-if="dataBanner" class="banner-img">
              <div>
                <img :src="URL_BASE + dataBanner" class="image" />
              </div>
            </div>
          </div>
        </div>
      </slick>
    </section>
    <!--End Banner Slider--->
    <div class="container px-0 pb-5">
      <!-- <QuickBook /> -->
    </div>
    <div v-for="(records, recordsIndex) in pagesList" :key="recordsIndex">
      <div
        class="container cinema-menus"
        v-for="(item, index) in records.otherData"
        :key="index"
      >
        <div v-if="item.main_name" class="main-heading">
          <div>
            <hr class="primary-line" />
          </div>
          <div class="title">{{ item.main_name }}</div>
        </div>
        <div v-if="item.header_name" class="content">
          <div class="content-title my-3">{{ item.header_name }}</div>
          <div v-if="item.description" class="content-desc">
            {{ item.description }}
          </div>
        </div>
        <div class="py-3 content">
          <!--Start Offer Slider-->
          <div class="premiere-slider empire-slider">
            <slick
              ref="offer-slider"
              :options="offerSlider"
              class="px-md-3 px-lg-0"
            >
              <div
                v-for="(data, indexImg) in item.images.split(',')"
                :key="indexImg"
                class="premier-card"
              >
                <div v-if="data" class="premiere-img">
                  <img :src="URL_BASE + data" class="image" />
                </div>
              </div>
            </slick>
          </div>
          <!--End Offer Slider-->
          <div
            v-if="item.cover_image"
            class="menu-card d-flex justify-content-center pt-2"
          >
            <img :src="URL_BASE + item.cover_image" class="img-fluid" />
          </div>
        </div>
        <!-- <div class="pt-2">

        <div class="premiere-slider empire-slider">
          <slick
            ref="offer-slider"
            :options="offerSlider"
            class="px-md-3 px-lg-0"
          >
            <div v-for="(data, index) in 6" :key="index" class="premier-card">
              <div class="premiere-img">
                <img
                  src="@/assets/img/new-img/png-img/food-1.png"
                  class="image"
                />
              </div>
            </div>
          </slick>
        </div>

        <div class="menu-card d-flex justify-content-center py-2">
          <img
            src="@/assets/img/new-img/png-img/menu-card.png"
            class="img-fluid"
          />
        </div>
      </div> -->
      </div>
    </div>
  </div>
</template>
<script>
import QuickBook from "@/components/partials/newQuickBook.vue";
import { makeRequest } from "@/helper/internet.js";
import { mapState, mapGetters, mapActions } from "vuex";
import {
  LanguageService,
  CountryService,
  TokenService
} from "@/services/storage.service";
import { metaInfo, URL_BASE } from "@/helper/constant.js";
import { makeRequestBrij } from "../../../helper/internet";

export default {
  components: {
    QuickBook
  },
  data() {
    return {
      URL_BASE: "https://api-empire.brij.tech/",
      premeireBanners: [],
      premeireDataArray: [],
      bannerSlider: {
        arrows: false,
        dots: true,
        infinite: true,
        slidesToScroll: 1,
        slidesToShow: 1,
        autoplay: true,
        autoplaySpeed: 2000
      },
      offerSlider: {
        arrows: true,
        dots: false,
        infinite: true,
        slidesToScroll: 1,
        slidesToShow: 2,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 3
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
    };
  },
  beforeCreate: function() {
    document.body.className = "light-section";
  },
  mounted() {
    let language = LanguageService.getLanguage();
    if (!language) {
      this.LanguageID = 2;
    } else {
      this.LanguageID = language.lang_id;
    }
    // this.handleResize();
    let lang = LanguageService.getLanguage();
    if (lang == null) {
      this.langName = "eng";
    } else {
      this.langName = lang["lang"];
    }
  },
  beforeMount() {
    //  const { movieId, cat_id } = this.$route.params;
    // if (movieId && cat_id) {
    //   // this.MovieID = movieId.toString().split(",");
    //   // this.CategoryID = cat_id;
    // this.getShowTimeBanners();
    this.getListOfPages();
    // } else {
    //   console.log(this.$route.params, "jitu");
    //   // this.$router.go(-1);
    // }
  },
  methods: {
    getShowTimeBanners() {
      this.showLoading();
      let payload = {
        PageName: "premiere"
      };

      makeRequest("/PageData/", "POST", null, payload)
        .then(response => {
          const { error, res } = response; // console.log("Show details", res);

          console.log(res.data, "uu");
          if (res.data.hasOwnProperty("banner") && res.data.banner.length > 0) {
            this.premeireBanners = res.data.banner;
          }

          if (res.data.hasOwnProperty("data") && res.data.data.length > 0) {
            this.premeireDataArray = res.data.data;
          }
          console.log(this.premeireDataArray);
          // if (res.data.hasOwnProperty("data") && res.data.data.length > 0) {
          //   this.header = res.data.data[0].header;
          //   this.header1 = res.data.data[0].header1;
          //   this.description = res.data.data[0].description;
          // }

          this.hideLoading();
        })
        .catch(error => {
          this.hideLoading();
          console.log("Error", error);
        });
    },
    getListOfPages() {
      const pagesFunction = async () => {
        try {
          let payload = {
            mpm_name: "premiere",
            mpm_lang_id: this.getCurrentLang().brij_lang_id
          };
          let response = await makeRequestBrij(
            `/api/admin/list-of-pages?mpm_name=${
              payload.mpm_name ? payload.mpm_name : ""
            }&mpm_lang_id=${payload.mpm_lang_id ? payload.mpm_lang_id : ""}`,
            "GET",
            null,
            null
          );
          const { error, res } = response;

          if (res.data.status) {
            let { data } = res;
            let records = data.Records;
            let newRecords = [];
            records.map((x, index) => {
              let get_index = newRecords.findIndex(y => {
                return y.main_name == x.mpm_name;
              });
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
                };
                newRecords.push(obj);
              } else {
                let obj = {
                  mpm_d_id: x.mpm_d_id,
                  main_name: x.mpm_d_main_name,
                  header_name: x.mpm_d_header_name,
                  description: x.mpm_d_description,
                  images: x.mpm_d_images,
                  cover_image: x.mpm_d_cover_image,
                  o_status: x.mpm_d_is_active
                };
                newRecords[get_index].otherData.push(obj);
              }
            });
            console.log("newRecords", newRecords);
            this.pagesList = newRecords;
          }
        } catch (error) {
          console.log("getPagesList", { error });
        }
      };
      pagesFunction();
    }
  }
};
</script>
<style>
.premiere-slider .slick-prev {
  left: -3.5%;
}
.premiere-slider .slick-next {
  right: -3.5%;
}
.premiere-slider .slick-active .premiere-img .image {
  padding-right: 05px;
  padding-left: 05px;
}
.premiere-img .image {
  width: 100%;
}
</style>
