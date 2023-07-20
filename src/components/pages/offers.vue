<template>
  <div>
    <div class="offer-main-box min-vh-100 col-md-11 mx-auto my-4" v-if="true">
      <b-card no-body>
        <b-tabs card>
          <b-tab
            v-for="(offerType, offerTypeIndex) in offerFilterTabs"
            :key="offerTypeIndex"
            class=""
            :title="offerType.Type"
            @click="getFilterOffers(offerType.CouponID)"
          >
            <div
              v-if="numberOfRowArr > 0"
              class=""
              :class="isOfferSelected ? 'addFadeEffect' : ''"
            >
              <div
                class="row position-relative"
                v-for="(a, b) in numberOfRowArr"
                :key="b"
              >
                <div
                  :id="'offerList' + b"
                  class="col-12 col-md-6 col-lg-4 mb-3"
                  v-for="(x, y) in offerRowNumber"
                  v-if="b * offerRowNumber + y < Alloffers.length"
                  :key="y"
                >
                  <div
                    class="offers-box"
                    @click="showNewOffers(b * offerRowNumber + y, b)"
                  >
                    <div
                      class="offers-img"
                      :class="
                        b * offerRowNumber + y == isImageActive
                          ? 'active-img'
                          : ''
                      "
                    >
                      <img
                        v-if="Alloffers[b * offerRowNumber + y].Image"
                        :src="Alloffers[b * offerRowNumber + y].Image"
                        class="img-fluid w-100 offerPageImg"
                        alt=""
                      />
                      <!-- offers-test.jpg -->
                      <img
                        v-else
                        src="@/assets/img/nurserylive-offers.png"
                        alt=""
                        class="img-fluid w-100"
                      />
                    </div>
                    <div class="offers-details">
                      <h6>
                        {{ Alloffers[b * offerRowNumber + y].ShortDescription }}
                      </h6>
                    </div>
                    <div class="offers-btnn"></div>
                  </div>
                </div>
                <div
                  class="offers-popmenu col-12"
                  v-if="offerPopInfo.length > 0"
                  :class="b == isOfferPopActive ? 'd-block' : 'd-none'"
                >
                  <div class="offers-popmenu-body py-5 px-4">
                    <div class="row">
                      <div
                        class="col-md-5"
                        :class="
                          LanguageID == '1' && LanguageID == 1
                            ? 'text-right'
                            : ''
                        "
                      >
                        <h1 class="mb-1">
                          {{ offerPopInfo[0].Name }}
                        </h1>
                        <p class="font-italic">
                          {{ offerPopInfo[0].Expiry }}
                        </p>
                        <p class="">
                          {{ offerPopInfo[0].Description }}
                        </p>
                      </div>

                      <div
                        class="col-md-7 border-left"
                        :class="
                          LanguageID == '1' && LanguageID == 1
                            ? 'text-right'
                            : ''
                        "
                        v-html="offerPopInfo[0].TNC"
                      >
                        <!-- <ul>
                          <li>
                            Lorem, ipsum dolor sit amet consectetur adipisicing
                            elit.
                          </li>
                          <li>
                            Sed est error modi delectus accusamus quis, dicta a
                            fuga? Molestiae
                          </li>
                          <li>
                            laborum maiores obcaecati dolore praesentium
                            incidunt vel temporibus
                          </li>
                          <li>ratione nulla! Nobis?</li>
                        </ul> -->
                      </div>
                    </div>
                    <span class="close-btn" @click="closeNewOffers">X</span>
                  </div>
                  <div class="col-12 mx-auto text-center my-4">
                    <!-- <div
                      v-if="isBookBtn"
                      class="btn emp-grey-btn mt-3"
                      @click="bookNow(movieID, formatID)"
                    >
                      {{ allLanguageData.BookNow }}
                    </div> -->

                    <div @click="bookNow()" class="btn emp-grey-btn mt-3">
                      {{ allLanguageData.BookNow }}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div
              class="d-flex align-items-center justify-content-center"
              v-if="Alloffers.length <= 0"
            >
              <h6 class="text-center text-muted my-5">
                {{ allLanguageData.NoOffers }}
              </h6>
            </div>
          </b-tab>
          <!-- OFFERS SECTION END -->
        </b-tabs>
      </b-card>
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
import { metaInfo } from '@/helper/constant.js'

var VueScrollTo = require('vue-scrollto')

export default {
  components: {},
  metaInfo: metaInfo,

  data () {
    return {
      LanguageID: '',
      isBookBtn: true,
      msg: '',
      isOfferPopActive: null,
      isOfferSelected: false,
      topHeight: 200,
      screenWidth: window.innerWidth,
      numberOfRow: 0,
      isImageActive: null,
      offerPopInfo: [],
      numberOfRowArr: 0,
      BankOffersList: [],
      offerFilterTabs: [{ Type: 'All', CouponID: 0 } ],
      Alloffers: [],
      newAllOffers: [],
      isOfferDetails: false,
    }
  },
  beforeMount () {
    // this.getAdvertisement();
  },
  computed: {
    offerRowNumber () {
      return this.numberOfRow
    },
  },

  beforeCreate: function () {
    let pre = window.localStorage.getItem('PREIMERE')
    if (pre == null || pre == 'false' || pre == false) {
      document.body.className = ''
    } else {
      document.body.className = 'gold-img-section'
    }
  },
  created () {
    window.addEventListener('resize', this.handleResize)
    this.handleResize()
  },
  destroyed () {
    window.removeEventListener('resize', this.handleResize)
  },
  mounted: function () {
    this.getAllOffers()

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

  methods: {
    handleResize () {
      this.screenWidth = window.innerWidth
      if (this.screenWidth > 992) {
        this.numberOfRow = 3
      } else if (this.screenWidth > 768) {
        this.numberOfRow = 2
      } else {
        this.numberOfRow = 1
      }
      this.numberOfRowArr = Math.ceil(this.Alloffers.length / this.numberOfRow)
    },
    showNewOffers (value, index) {
      this.offerPopInfo = []
      this.offerPopInfo = [this.Alloffers[value] ]
      this.isOfferPopActive = index
      this.isOfferSelected = true
      this.isImageActive = value
      console.log('offerPopInfo', this.offerPopInfo)
    },
    closeNewOffers (value, index) {
      this.isOfferPopActive = -1
      this.isImageActive = -1
      this.isOfferSelected = false
    },
    onClickBookNow (movieId, formatId) {
      this.$root.$emit('bv::hide::modal', 'advtModal')
      this.$router.push({
        name: 'movieDetails',
        params: {
          movieId: movieId,
          formatId: formatId,
        },
      })
    },
    ...mapActions(['onFilterSelect' ]),

    offerAdvertisement (value) {
      if (value.isBook == 1) {
        this.$router.push({
          name: 'movieDetails',
          params: {
            movieId: value.MovieID,
            formatId: value.formatID,
          },
        })
      } else if (value.adLink != '' && value.adLink != null) {
        window.open(url)
      }
    },

    // CHECKOUT OFFER SECTION START
    getAllOffers () {
      this.showLoading()
      makeRequest('/Offerlist', 'POST', null, null)
        .then(result => {
          const { error, res } = result
          const { data } = res.data
          if (!error && res.data.Status) {
            this.newAllOffers = res.data
            console.log('this.newAllOffers', this.newAllOffers)

            this.Alloffers = res.data.Offer
            console.log('this.Alloffersthis.Alloffers', this.Alloffers)
            // let array = ["All"];
            // this.offerFilterTabs = [...array, ...res.data.OfferType];
            // let obj = { Type: "All", CouponID: 0 };
            res.data.OfferType.map(x => {
              this.offerFilterTabs.push(x)
            })
          } else {
            console.log('object')
          }
          this.hideLoading()

          this.handleResize()
        })
        .catch(error => {
          this.hideLoading()

          console.log('error', error)
        })
    },

    // getAllOffers() {
    //   makeRequest("/Offerlist", "POST", null, null)
    //   this.Alloffers = this.offerTypeArr.Offer;
    //   let array = ["All"];
    //   this.offerFilterTabs = [...array, ...this.offerTypeArr.OfferType];
    //   console.log("this.offerFilterTabs", this.offerFilterTabs);

    //   this.handleResize();
    // },
    getFilterOffers (typeID) {
      this.Alloffers = []
      if (this.newAllOffers.Offer != undefined || this.newAllOffers.Offer) {
        this.newAllOffers.Offer.map(x => {
          if (typeID == x.CouponID) {
            this.Alloffers.push(x)
          } else if (typeID == 0 || typeID == '0') {
            this.Alloffers.push(x)
          }
        })
      }
      this.handleResize()
    },

    showOfferDetails (value, index) {
      this.isOfferDetails = true
    },
    closeOfferDetails () {
      this.isOfferDetails = false
    },
    // CHECKOUT OFFER SECTION END

    // bookNow(isBook, mId, fId) {
    //   if (mId && fId) {
    //     console.log("mId", mId);
    //     console.log("fId", fId);
    //   } else {
    //     this.$router.push({
    //       name: "browseByCinema",
    //       // params: {
    //       //   cinemaId: this.cinemaId,
    //       // },
    //     });
    //   }
    // },

    bookNow () {
      this.$router.push({
        name: 'browseByCinema',
      })
    },
  },
}
</script>
