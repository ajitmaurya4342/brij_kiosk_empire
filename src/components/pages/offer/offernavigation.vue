<template>
  <div>
    <!--Start Banner Slider--->
    <section
      class="section-banner simple-banner"
      v-if="this.$route.path === '/cinema-offer'"
    >
      <slick
        v-if="pagesList.length > 0"
        ref="banner-slider"
        :options="bannerSlider"
      >
        <div class="w-100 banner-slider">
          <div
            class="banner-img"
            v-for="(data, index) in pagesList"
            :key="index"
          >
            <div
              v-for="(dataImg, dataImgIndex) in data.banner.split(',')"
              :key="dataImgIndex"
            >
              <img :src="URL_BASE + dataImg" class="image" />
            </div>
          </div>
        </div>
      </slick>
    </section>
    <!--End Banner Slider--->
    <section
      class="section-banner pri-book-slider"
      v-if="this.$route.path === '/private-booking'"
    >
      <slick
        v-if="privateBookingData.length > 0"
        ref="bannerslider"
        :options="bannerSlider"
      >
        <div
          v-for="(data, index) in privateBookingData"
          :key="index"
          class="w-100 banner-slider"
        >
          <div class="banner-img">
            <div>
              <!-- <img :src="data.web_banner_img" class="banner-movie-img" /> -->
              <img :src="URL_BASE + data" class="image" />
            </div>
          </div>
        </div>
      </slick>
    </section>
    <div
      class="container custom-container screen-navigation py-4 mt-n1 px-lg-5"
    >
      <div class="screen-header mx-0" @click="setActive">
        <div class="heading">
          <span class="d-none d-md-block">{{ allLanguageData.Offers }}</span>
          <span class="d-block d-md-none">{{ selectedOfferName }} </span>
        </div>
        <div class="d-block d-lg-none">
          <div
            class="open"
            :class="showContent ? 'd-none d-lg-block' : 'd-block'"
          >
            <img
              src="@/assets/img/new-img/svg-img/left-white-arrow.svg"
              width="20px"
              class="open-icon"
            />
          </div>
          <div
            class="close"
            :class="showContent ? 'd-block' : 'd-none d-lg-block'"
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
        class="screen-tabs pt-4 pt-md-0 animate__animated animate__pulse"
        :class="showContent ? 'd-block' : 'd-none d-lg-block'"
      >
        <ul v-if="OfferHeader.length > 0" class="list-inline my-0 py-0">
          <li
            v-for="(dataTitle, index) in OfferHeader"
            :key="index"
            class="list-inline-item"
          >
            <a
              :style="expSelected == dataTitle.OfferID ? 'color:red' : ''"
              @click="passHeaderId(dataTitle.OfferID, dataTitle.OfferName)"
              class="screen-link"
              >{{ dataTitle.OfferName }}
            </a>
          </li>
          <!-- <li class="list-inline-item">
            <router-link class="screen-link" :to="{ name: 'Minis' }"
              >Promotion</router-link
            >
          </li>
          <li class="list-inline-item">
            <router-link class="screen-link" :to="{ name: 'screenXExp' }"
              >Bank offer</router-link
            >
          </li> -->
          <!-- <li class="list-inline-item">
            <router-link class="screen-link" :to="{ name: 'privatebooking' }"
              >Private Booking</router-link
            >
          </li> -->
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import { makeRequest } from "@/helper/internet.js";
import { mapState, mapGetters, mapActions } from "vuex";
import {
  LanguageService,
  CountryService,
  TokenService
} from "@/services/storage.service";
import { metaInfo, URL_BASE } from "@/helper/constant.js";
import { makeRequestBrij } from "../../../helper/internet";
import _ from "lodash";

export default {
  props: {
    headerTitleArry: Array
  },
  beforeMount() {
    if (this.$route.path != "/private-booking") {
      this.expSelected = "1";
    } else {
      this.expSelected = "";
    }

    // this.getShowTimeBanners();
    // this.getShowTimeBannersPrivate();
    if (this.headerTitleArry && this.headerTitleArry.length > 0) {
      this.OfferHeader = this.headerTitleArry;
    }
    this.getListOfPages();
  },
  mounted: function() {
    if (this.langName == "ar") {
      document.body.classList.add("rtl-class");
      document.documentElement.setAttribute("lang", "ar");
    } else if (this.langName == "eng") {
      document.documentElement.setAttribute("lang", "en");
      document.body.classList.remove("rtl-class");
    }
  },
  // mounted: function() {
  //   let language = LanguageService.getLanguage();
  //   if (!language) {
  //     this.LanguageID = 2;
  //   } else {
  //     this.LanguageID = language.lang_id;
  //   }
  //   // this.handleResize();
  //   let lang = LanguageService.getLanguage();
  //   if (lang == null) {
  //     this.langName = "eng";
  //   } else {
  //     this.langName = lang["lang"];
  //   }
  // },
  components: {},
  data() {
    return {
      URL_BASE: "https://api-empire.brij.tech",
      OfferHeader: [],
      showExpBanners: [],
      privateBookingData: [],
      showContent: true,
      expSelected: "",
      selectedOfferName: "OFFERS",
      bannerSlider: {
        arrows: false,
        dots: true,
        infinite: true,
        slidesToScroll: 1,
        slidesToShow: 1,
        autoplay: true,
        autoplaySpeed: 2000
      },
      pagesList: []
    };
  },
  beforeCreate: function() {
    document.body.className = "light-section";
  },
  methods: {
    passHeaderId(ID, name) {
      this.expSelected = ID;
      this.selectedOfferName = name;

      this.$emit("changeHeaderOffer", ID);
    },
    setActive: function(data) {
      this.showContent = !this.showContent;
    },
    getShowTimeBannersPrivate() {
      let payload = {
        PageName: "privateBooking"
      };

      makeRequest("/PageData/", "POST", null, payload)
        .then(response => {
          const { error, res } = response; // console.log("Show details", res);

          this.hideLoading();

          if (res.data.hasOwnProperty("banner") && res.data.banner.length > 0) {
            this.privateBookingData = res.data.banner;
          }
        })
        .catch(error => {
          this.hideLoading();
          console.log("Error", error);
        });
    },
    getShowTimeBanners() {
      let payload = {
        PageName: "cinemaOffer"
      };

      makeRequest("/PageData/", "POST", null, payload)
        .then(response => {
          const { error, res } = response; // console.log("Show details", res);

          this.hideLoading();

          if (res.data.hasOwnProperty("banner") && res.data.banner.length > 0) {
            this.showExpBanners = res.data.banner;
          }

          this.hideLoading();
          console.log("jitu");
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
            mpm_name: "cinemaOffer",
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
            if (records.length > 0) {
              records.map((x, index) => {
                let get_index = newRecords.findIndex(y => {
                  return y.main_name == x.mpm_name;
                });
                console.log({ get_index });
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
                        o_status: x.mpm_d_is_active,
                        order: x.mpm_d_order ? parseInt(x.mpm_d_order) : null
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
                    o_status: x.mpm_d_is_active,
                    order: x.mpm_d_order ? parseInt(x.mpm_d_order) : null
                  };
                  newRecords[get_index].otherData.push(obj);
                }
              });
            }

            this.pagesList = _.orderBy(newRecords, ["order", "DESC"]);
            if (
              newRecords.length > 0 &&
              newRecords[0] &&
              newRecords[0]["otherData"] &&
              newRecords[0]["otherData"][0]
            ) {
              let other_data = _.orderBy(newRecords[0].otherData, [
                "order",
                "ASC"
              ]);
              newRecords[0]["otherData"] = other_data;
              this.pagesList = newRecords;
              console.log("newRecords2", newRecords);

              this.passHeaderId(
                newRecords[0]["otherData"][0].mpm_d_id,
                newRecords[0]["otherData"][0].main_name
              );
            }
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
.pri-book-slider .banner-content .content {
  width: 45%;
}
</style>
