<template>
  <div v-if="offerTitle.length > 0">
    <Navigation
      :headerTitleArry="offerTitle"
      @changeHeaderOffer="ChangeH($event)"
    />
    <div class="container custom-container py-4 mb-4">
      <div class="main-heading">
        <div>
          <hr class="primary-line" />
        </div>
        <div class="title">{{ offerTitleDetails.OfferName }}</div>
      </div>
      <div class="content mb-4">
        <!-- <div class="content-title my-3">{{ offerTitleDetails.Title }}</div> -->
        <div class="content-desc">
          {{ offerTitleDetails.Description }}
        </div>
      </div>

      <div class="pt-2" v-if="false">
        <div class="row mx-0 empire-slider offer-slider">
          <!--Start Desktop Slider-->
          <div class="col-lg-12 px-0 d-none d-md-block">
            <!--Start Offer Slider-->
            <slick
              ref="offerSlider"
              :options="offerSlider"
              class="px-md-3 px-lg-0"
            >
              <div
                v-for="(data, index) in offerListDetails"
                :key="index"
                class="offer-card mb-3"
                @click="setActive(data, index)"
                :id="'offer-card' + index"
                :class="offerId == index ? 'opacity' : ''"
              >
                <div class="offer-img">
                  <img
                    v-if="data.Image"
                    :src="URL_BASE1 + data.Image"
                    class="image img-fluid"
                  />
                  <img
                    v-else
                    src="@/assets/img/new-img/png-img/offer1.c65f47e.png"
                    class="image img-fluid"
                  />
                </div>
              </div>
            </slick>
            <!--End Offer Slider-->
            <!--Start Offer Content-->
            <div
              v-for="(data, index) in offerListDetails"
              :key="index"
              :id="'offer-content' + index"
              :class="
                showContent == true && isActive(index)
                  ? 'd-none d-md-block'
                  : 'd-none'
              "
            >
              <div class="offer-content row mx-0 mb-3">
                <div
                  class="
                  col-md-5 content-card
                    px-4
                    py-3
                    pl-lg-5
                    pr-lg-4
                    py-lg-4
                  "
                >
                  <div class="title pb-3 ml-n3">{{ offerObject.Name }}</div>
                  <div class="content">
                    <div class="heading ml-n3 pb-1">
                      {{ allLanguageData.PopupTerms.TnC }}
                    </div>
                    <div
                      class="px-0 py-0 mb-0 list-items"
                      v-html="offerObject.TNC"
                    ></div>
                    <!-- <ul class="px-0 py-0 mb-0 list-items">
                      <li>Applicable at any Empire Cinemas in KSA ONLY.</li>
                      <li>Valid on Tuesdays ONLY.</li>
                      <li>
                        This combo includes 1 ticket, 1 Regular drink and 1
                        Regular popcorn.
                      </li>
                      <li>
                        This combo is a females only combo. The cinema has the
                        right to ask for identification.
                      </li>
                      <li>Movies are NOT shown in female only auditoriums.</li>
                      <li>
                        It is up to the direction of the cinema to limit this
                        offer to specific movies.
                      </li>
                      <li>
                        Bookable on the Empire Cinemas website, application and
                        box office.
                      </li>
                      <li>
                        Not valid in conjunction with any other offer, combo or
                        promotion.
                      </li>
                      <li>
                        Loyalty program points (bank or otherwise) can not be
                        used on this combo.
                      </li>
                      <li>Not valid on Empire Premiere.</li>
                    </ul> -->
                    <!-- <div class="read-more-text">Read more...</div> -->
                    <div class="pt-4 ml-n3">
                      <button class="btn offer-btn" @click="goToShowTimes">
                        BOOK NOW
                      </button>
                    </div>
                  </div>
                </div>
                <div class="col-md-7 video-card px-0">
                  <div class="video h-100 position-relative">
                    <img
                      v-if="offerObject.BannerImage"
                      :src="URL_BASE1 + offerObject.BannerImage"
                      class="image img-fluid"
                    />
                    <img
                      v-else
                      src="@/assets/img/new-img/png-img/demmmuy.jpg"
                      class="image img-fluid"
                    />
                    <!-- <img
                     v-else
                      :src="URL_BASE1 + data.Image"
                      class="image img-fluid"
                    /> -->
                    <!-- <img
                      src="@/assets/img/new-img/png-img/Capture.jpg"
                      class="image img-fluid"
                    /> -->
                    <!-- <iframe
                      width="560"
                      height="315"
                      src="https://www.youtube.com/embed/Hg6UtBstzTM?controls=0"
                      title="YouTube video player"
                      frameborder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowfullscreen
                    ></iframe> -->
                    <!-- <div class="video-icon">
                      <img
                        src="@/assets/img/new-img/svg-img/video-icon.svg"
                        class="image"
                      />
                    </div> -->
                    <!-- <div class="close-video-icon">
                      <img
                        src="@/assets/img/new-img/svg-img/cross-video.svg"
                        class="image"
                      />
                    </div> -->
                  </div>
                </div>
              </div>
            </div>
            <!--End Offer Content--->
          </div>
          <!--End Desktop Slider-->

          <!--Start Mobile Offers--->
          <div class="d-block d-md-none">
            <div class="row">
              <div
                v-for="(data, index) in offerListDetails"
                :key="index"
                class="col-6 px-1 mb-3"
                v-b-modal="'offerpopup' + index"
              >
                <div class="offer-card">
                  <div class="offer-img">
                    <img
                      v-if="data.Image"
                      :src="URL_BASE1 + data.Image"
                      class="image img-fluid"
                    />
                    <img
                      v-else
                      src="@/assets/img/new-img/png-img/offer1.c65f47e.png"
                      class="image img-fluid"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div
              v-for="(data, index) in offerListDetails"
              :key="index"
              class="
                emp_new_modal emp-loyalty-modal
                showtimes-popup
                offer-popup
              "
            >
              <b-modal
                :id="'offerpopup' + index"
                hide-footer
                :ref="'offerpopup'"
                size="lg"
                title="CINEMA OFFER"
                class="cinema-offer-popup"
              >
                <!-- <template slot="modal-header">
                  <div class="row w-100 align-items-center">
                    <div class="pr-0 col-1 mb-3 mb-md-0">
                      <div
                        class="d-block bg-emp-red"
                        style="height: 3px; width: 100%"
                      ></div>
                    </div>
                    <div class="col-10">
                      <h6 class="hiw-title font-weight-bold mb-0 text-center">
                        CINEMA OFFER
                      </h6>
                    </div>
                    <span @click="closeOfferPop(index)" class="new-closeBtn"
                      >X</span
                    >
                  </div>
                </template> -->
                <div class="row mx-0 mb-3">
                  <div class="px-5 py-3 pl-lg-5 pr-lg-4 py-lg-4">
                    <div class="title pb-3 ml-n3">{{ offerObject.Name }}</div>
                    <div class="content">
                      <div class="heading ml-n3 pb-1">TERMS AND CONDITIONS</div>
                      <div v-html="offerObject.TNC"></div>
                      <!-- <ul class="px-0 py-0 mb-0 list-items">
                        <li>Applicable at any Empire Cinemas in KSA ONLY.</li>
                        <li>Valid on Tuesdays ONLY.</li>
                        <li>
                          This combo includes 1 ticket, 1 Regular drink and 1
                          Regular popcorn.
                        </li>
                        <li>
                          This combo is a females only combo. The cinema has the
                          right to ask for identification.
                        </li>
                        <li>
                          Movies are NOT shown in female only auditoriums.
                        </li>
                        <li>
                          It is up to the direction of the cinema to limit this
                          offer to specific movies.
                        </li>
                        <li>
                          Bookable on the Empire Cinemas website, application
                          and box office.
                        </li>
                        <li>
                          Not valid in conjunction with any other offer, combo
                          or promotion.
                        </li>
                        <li>
                          Loyalty program points (bank or otherwise) can not be
                          used on this combo.
                        </li>
                        <li>Not valid on Empire Premiere.</li>
                      </ul> -->
                      <!-- <div class="read-more-text">Read more...</div> -->
                      <div class="pt-4 ml-n3">
                        <button class="btn offer-btn" @click="goToShowTimes">
                          BOOK NOW
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </b-modal>
            </div>
          </div>
          <!--End Mobile Offers--->
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Navigation from "@/components/pages/offer/offernavigation.vue";
import { makeRequest } from "@/helper/internet.js";
import { makeRequestBrij } from "../../../helper/internet";

import { mapState, mapGetters, mapActions } from "vuex";
import {
  LanguageService,
  CountryService,
  TokenService
} from "@/services/storage.service";
import { metaInfo, URL_BASE } from "@/helper/constant.js";
export default {
  components: {
    Navigation
  },
  data() {
    return {
      URL_BASE1: URL_BASE + "/",
      showContent: false,
      showMovieDetails: false,
      offerId: 0,
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
        slidesToScroll: 3,
        slidesToShow: 4,
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
              slidesToShow: 1,
              slidesToScroll: 1,
              adaptiveHeight: true
            }
          }
        ]
      },
      // new

      offerTitle: [],
      offerListDetails: [],
      offerTitleDetails: {
        CouponTypeID: "",
        Description: "",
        OfferID: "",
        OfferName: "",
        Title: ""
      },
      headerTitleId: "1",
      offerObject: {
        ApplicableDays: "",
        CouponTypeID: "",
        Description: "",
        EndDate: "",
        ID: "",
        Image: "",
        IsActive: "",
        LanguageID: "",
        Name: "",
        ShowbizzVoucherID: "",
        StartDate: "",
        TNC: "",
        BannerImage: "",
        pagesList: []
      }
    };
  },
  beforeMount() {
    // this.getAllOffers()
    this.getListOfPages();
  },
  //  mounted: function() {
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

  beforeUpdate() {
    if (window.matchMedia("(min-width: 1024px)").matches) {
      if (this.$refs.offerSlider) {
        this.$refs.offerSlider.destroy();
      }
    }
  },
  updated() {
    if (window.matchMedia("(min-width: 1024px)").matches) {
      this.$nextTick(function() {
        if (this.$refs.offerSlider) {
          this.$refs.offerSlider.create(this.offerOptions);
        }
      });
    }
  },
  methods: {
    goToShowTimes() {
      this.$router.push({
        path: "/allCinemashowtimes"
      });
    },
    closeOfferPop(index) {
      console.log(index);
      this.$refs.offerpopup.hide();
    },
    ChangeH(headerTitleId) {
      this.headerTitleId = headerTitleId;
      // this.getAllOffers();
      this.pagesList.map(x => {
        let tempArr = x.otherData.filter(y => {
          return y.mpm_d_id == headerTitleId;
        });
        console.log(tempArr, "tempArr");
        tempArr.map(z => {
          this.offerTitleDetails["Description"] = z.description;
          this.offerTitleDetails["OfferName"] = z.main_name;
        });
      });
    },
    getAllOffers() {
      this.offerListDetails = [];
      this.showLoading();
    },

    setActive: function(item, index) {
      console.log(item, index, "jitu");
      this.offerId = index;
      if (window.matchMedia("(max-width: 767px)").matches) {
        $("#offer-content" + this.oldIndex).remove();
        const htmlCode = $("#offer-content" + index).html();
        $(htmlCode).insertAfter("#offer-card" + index);
        this.oldIndex = index;
      }

      Object.keys(this.offerObject).map(x => {
        this.offerObject[x] = item[x] || "";
      });
      this.showContent = true;
    },
    isActive: function(item) {
      if (this.offerId === item) {
        console.log("set", item);
        return true;
      }
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
            console.log("newRecords", newRecords);
            let offerObj = [];
            newRecords.map(x => {
              if (x.otherData.length > 0) {
                _.orderBy(x.otherData, ["order", "ASC"]).map((y, index) => {
                  let obj = { OfferID: y.mpm_d_id, OfferName: y.main_name };
                  offerObj = [...offerObj, obj];
                });
              }
            });
            this.offerTitle = offerObj;
            this.pagesList = newRecords;
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
              console.log("newRecords23", newRecords);
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
.offer-slider .slick-prev {
  left: -3.5%;
}
.offer-slider .slick-next {
  right: -3.5%;
}
.offer-card .offer-img .image {
  width: 100%;
  filter: grayscale(1);
  cursor: pointer;
}
.offer-card .show-opacity .image {
  filter: grayscale(0);
}
.offer-slider .slick-active .offer-img .image {
  padding-right: 05px;
  padding-left: 05px;
}
.offer-content .content-card {
  background-color: #e5e6e7;
  color: #434345;
}
.offer-content .content-card .title {
  font-weight: 600;
  font-size: 22px;
}
.offer-content .content-card .heading {
  font-weight: 600;
  font-size: 14px;
}
.offer-content .content-card .list-items {
  font-size: 13px;
  font-weight: 500;
}
.offer-content .offer-btn {
  background-color: #ce1f2e;
  font-size: 13px;
  color: #fff;
  font-weight: 500;
  padding: 05px 25px;
}

.offer-card.opacity .image {
  filter: grayscale(0) !important;
}
.offer-popup {
  color: #fff;
}
</style>
