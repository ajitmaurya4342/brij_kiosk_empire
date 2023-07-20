<template>
  <div class="header-space">
    <div v-if="showLoginForm == true">
      <LoginForm
        isFromBooking="Yes"
        @changeUserLoginStatus="ChangeLoginStatus($event)"
      />
    </div>
    <div v-else>
      <section
        class="
          container
          header-space
          min-vh-100
          py-5
          emp_new_modal
          mb-5
          px-md-3
        "
      >
        <div class="mb-3 seatlayout-timer">
          <div class="centerTitle">
            <span class="red-dotl"></span>
            <div
              class="d-flex justify-content-center align-items-center"
              v-if="showTimer == true"
            >
              <p class="title ar-number">
                {{ this.timer.minutes }}:{{ this.timer.seconds }}
              </p>
              <p class="text ml-1 ml-md-3">
                <span class="d-block">{{ allLanguageData.Timer[0] }}</span>
                {{ allLanguageData.Timer[1] }}
              </p>
            </div>
            <span class="red-dotr"></span>
          </div>
        </div>
        <div
          class="
            col-12 col-md-12
            mx-auto
            px-0
            bg-white
            mb-5
            new-checkout-box
            confirmation-box
          "
        >
          <div
            class="
              newCheckoutHeader
              p-3
              bg-danger
              font-weight-bold
              text-white
              newEmpRedBG
            "
          >
            {{ allLanguageData.Confirmation }}
            <!-- <span class="text-right"> {{ scheduleData.cinemaname }}</span> -->
          </div>
          <div class="col-12 col-md-11 col-lg-9 mx-auto pt-4">
            <h5 class="pb-2 font-weight-bold text-center">
              {{ scheduleData.cinemaname }}
            </h5>
            <div class="new-ticket-section my-4">
              <div class="checkout-grid-col mb-3 px-3">
                <div
                  class="first-col font-weight-bold"
                  :class="
                    LanguageID == '1' && LanguageID == 1 ? 'text-right' : ''
                  "
                >
                  {{ allLanguageData.Tickets }}
                  <br />
                  <small>( {{ scheduleData.movie_name }} )<br /></small>
                </div>
                <div class="second-col text-center ar-number">
                 <br/>
                  X {{ scheduleData.totalseatcount }}
                </div>
                <div
                  class="third-col font-weight-bold"
                  :class="
                    LanguageID == '1' && LanguageID == 1
                      ? 'text-left'
                      : 'text-right'
                  "
                >
                  <span class="font-weight-normal mr-1 ar-number">
                    {{ scheduleData.currency }} {{ scheduleData.amount }}
                  </span>
                </div>
              </div>
              <div
                v-if="fnbItemDataArry.length > 0"
                class="checkout-grid-col mb-3 px-3"
              >
                <div
                  class="first-col"
                  :class="
                    LanguageID == '1' && LanguageID == 1 ? 'text-right' : ''
                  "
                >
                  <span class="font-weight-bold"> FOOD AND BEVERAGES </span
                  ><br />
                  <small v-for="(data, idx) in fnbItemDataArry" :key="idx"
                    >( {{ data.qty }} X {{ data.title }} )<br
                  /></small>
                </div>
                <div class="second-col text-center">
                  <!-- X {{ fnbItemDataArry.length }} -->
                </div>
                <div
                  class="third-col"
                  :class="
                    LanguageID == '1' && LanguageID == 1
                      ? 'text-left'
                      : 'text-right'
                  "
                >
                  <span class="font-weight-normal mr-1 ar-number">
                    {{ scheduleData.currency }} {{ scheduleData.fnb_total }}
                  </span>
                </div>
              </div>
              <div class="checkout-grid-col mb-3 px-3">
                <div
                  class="first-col font-weight-bold"
                  :class="
                    LanguageID == '1' && LanguageID == 1 ? 'text-right' : ''
                  "
                >
                  {{ allLanguageData.InternetHF }}
                </div>
                <div class="second-col text-center ar-number">
                  X {{ scheduleData.totalseatcount }}
                </div>
                <div
                  class="third-col"
                  :class="
                    LanguageID == '1' && LanguageID == 1
                      ? 'text-left'
                      : 'text-right'
                  "
                >
                  <span class="font-weight-normal mr-1 ar-number">
                    {{ scheduleData.currency }}
                    {{ scheduleData.total_internet_handling_amt }}
                  </span>
                </div>
              </div>
              <div
                v-if="showDiscounttag == true"
                class="checkout-grid-col mb-3 px-3"
              >
                <div
                  class="first-col font-weight-bold"
                  :class="
                    LanguageID == '1' && LanguageID == 1 ? 'text-right' : ''
                  "
                >
                  {{ allLanguageData.appliedOffers }}

                  <br />
                  <span
                    ><small>( {{ appliedPromoName }} )</small></span
                  >
                </div>
                <div class="second-col text-center"></div>
                <div
                  class="third-col"
                  :class="
                    LanguageID == '1' && LanguageID == 1
                      ? 'text-left'
                      : 'text-right'
                  "
                >
                  <span class="font-weight-normal mr-1 ar-number">
                    {{ scheduleData.currency }}
                    -{{ scheduleData.Discount }}
                  </span>
                </div>
              </div>
              <hr class="border-top border-dark" />
            </div>
            <!-- ********************************* ACCORION - TABS ************************************* -->

            <div
              class="
                col-12 col-md-11 col-lg-12
                px-0
                mx-auto
                my-4
                offer-accordion
                md-accordion
              "
            >
              <div class="accordion" role="tablist">
                <b-card no-body class="mb-3">
                  <b-card-header header-tag="header" role="tab">
                    <b-button block v-b-toggle.accordion1 variant="none">
                      {{ allLanguageData.OFFERS }}
                    </b-button>
                  </b-card-header>
                  <b-collapse
                    visible
                    id="accordion1"
                    accordion="my-accordion"
                    role="tabpanel"
                    @click="showOffersDetails"
                  >
                    <b-card-body>
                      <div class="offer-box-shadow h-100">
                        <div class="p-2 text-center">
                          <!-- <h4 class="font-weight-bold text-uppercase">{{ allLanguageData.OFFERS }}</h4> -->
                          <p class="mb-0">
                            {{ allLanguageData.SelectOffersTxt }}
                          </p>
                          <router-link
                            class="new-emp-red small font-weight-bold"
                            to="/offers"
                          >
                            ({{ allLanguageData.TermsConditions }})</router-link
                          >.
                        </div>
                        <div class="checkout-offers-box mt-2">
                          <b-card no-body>
                            <b-tabs card v-model="step">
                              <!-- BANK OFFERS TAB START -->
                              <b-tab
                                v-for="(
                                  offerType, offerTypeIndex
                                ) in offerTitle"
                                :key="offerTypeIndex"
                                :title="offerType.OfferName"
                                @click="showOffersDetails(offerType)"
                                class="offer-scroll-box"
                              >
                                <div
                                  class=""
                                  v-if="offerListDetails.length > 0"
                                >
                                  <div class="row mx-0 pt-3">
                                    <div
                                      v-for="(
                                        offerData, indx
                                      ) in offerListDetails"
                                      :key="indx"
                                      class="
                                        col-12 col-md-6 col-lg-4
                                        h-100
                                        mb-3
                                      "
                                    >
                                      <div
                                        class="offer-card"
                                        @click="
                                          showDiscounttag == false
                                            ? reserveSelectedOffer(
                                                offerData,
                                                '',
                                                indx
                                              )
                                            : ''
                                        "
                                        :class="
                                          showDiscounttag == true &&
                                          indx == Offerindex
                                            ? 'show-applied'
                                            : 'remove-applied'
                                        "
                                      >
                                        <!-- <b-button
                                        :disabled="
                                          showDiscounttag == true ? true : false
                                        "
                                        variant="outline-info"
                                      > -->
                                        <div class="offer-card-txt py-3">
                                          {{ offerData.Name }}
                                        </div>
                                        <div class="applied-text">✓</div>
                                        <!-- </b-button> -->
                                      </div>
                                    </div>
                                  </div>
                                </div>

                                <div
                                  v-else
                                  class="
                                    offer-scroll-box
                                    d-flex
                                    align-items-center
                                    justify-content-center
                                  "
                                >
                                  <h6
                                    v-if="showOfferLoading == true"
                                    class="text-center text-muted my-5"
                                  >
                                    {{ allLanguageData.FetchingOffers }}
                                    <div class="spinner-border"></div>
                                  </h6>
                                  <h6
                                    v-else
                                    class="text-center text-muted my-5"
                                  >
                                    {{ allLanguageData.NoOffers }}
                                  </h6>
                                </div>
                              </b-tab>
                              <!-- BANK OFFERS TAB END -->
                            </b-tabs>
                          </b-card>
                        </div>
                      </div>
                    </b-card-body>
                  </b-collapse>
                </b-card>
                <b-card no-body class="mb-3">
                  <b-card-header header-tag="header" role="tab">
                    <b-button block v-b-toggle.accordion-2 variant="none">
                      {{ allLanguageData.VoucherCode }}
                      <span class="small d-block">{{
                        allLanguageData.EnterCode
                      }}</span>
                    </b-button>
                  </b-card-header>
                  <b-collapse
                    id="accordion-2"
                    accordion="my-accordion"
                    role="tabpanel"
                  >
                    <b-card-body>
                      <div class="px-3 col-md-10 mx-auto my-5">
                        <h5
                          class="
                            mb-3
                            font-weight-bold
                            text-center text-uppercase
                          "
                        >
                          {{ allLanguageData.AddVoucherCode }}
                        </h5>
                        <input
                          type="text"
                          :placeholder="allLanguageData.EnterVoucherCode"
                          v-model="promoCodeValue"
                          class="offer-input"
                        />
                        <!-- IF RESPONSE IS SUCCESS USE 'text-success' / 'text-danger' -->
                        <div
                          class="offer-error-msg font-weight-bold text-danger"
                          v-if="cardInputErrorMsg && appliedOfferType == '4'"
                        >
                          {{ cardInputErrorMsg }}
                        </div>
                        <div
                          class="offer-error-msg text-success font-weight-bold"
                          v-if="cardInputsuccessMsg && appliedOfferType == '4'"
                        >
                          {{ cardInputsuccessMsg }}
                        </div>

                        <div class="text-center mx-auto mt-3">
                          <div
                            :class="promoCodeValue ? '' : 'disabled'"
                            class="btn emp-grey-btn"
                            @click="reserveSelectedOffer(null, 4, '0')"
                          >
                            {{ allLanguageData.ApplyOffer }}
                          </div>
                        </div>
                      </div>
                    </b-card-body>
                  </b-collapse>
                </b-card>
              </div>
            </div>

            <!----End Accordion Tabs------>
          </div>
          <div class="newEmpGreyBG py-2 new-checkout-box-footer">
            <div class="col-12 col-md-10 col-lg-9 mx-auto">
              <div class="row emp_new_modal">
                <div
                  class="col-9 col-md-7 mb-3 mb-md-0"
                  :class="
                    LanguageID == '1' && LanguageID == 1 ? 'text-right' : ''
                  "
                >
                  <p class="mb-1 font-weight-bold">
                    {{ allLanguageData.TotalPayable }}
                  </p>
                  <small class="tax-text d-block">
                    ({{ allLanguageData.IncludesTaxesFees }})
                  </small>
                </div>
                <div
                  class="col-3 col-md-5 align-self-center"
                  :class="
                    LanguageID == '1' && LanguageID == 1
                      ? 'text-left'
                      : 'text-right'
                  "
                >
                  <p class="mb-0 font-weight-bold">
                    <span class="font-weight-normal mr-1 ar-number">
                      {{ scheduleData.currency }}
                    </span>
                    <span class="font-weight-bold ar-number">
                      {{ scheduleData.total_ticket_fnb }}</span
                    >
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="seat-section-txt pt-4">
          <h5
            class="
              font-weight-bold
              text-center text-uppercase
              mt-3
              pb-2
              pt-3
              px-2
              mt-md-5
              pt-md-5
            "
          >
            {{ allLanguageData.ReturnsPolicy }}
          </h5>
          {{ allLanguageData.ReturnsPolicyContent }}
        </div>
      </section>
      <!--Desktop Checkout Grid-->
      <div class="container-fluid checkout-fixed py-4 d-none d-md-block">
        <div class="col-lg-12 mx-auto">
          <div class="align-items-center checkout-grid">
            <div class="text-right" @click="goBack()">
              <img
                src="@/assets/img/new-img/svg-img/back-arrow.svg"
                class=""
                width="40px"
              />
            </div>
            <div class="vertical-line">
              <!-- <hr class="vertical" /> -->
            </div>
            <div class="grid-half">
              <ul class="mb-0 px-0 checkout-list">
                <li class="pb-2">
                  {{ allLanguageData.Movie }}: {{ scheduleData.movie_name }}
                </li>
                <li class="pb-2">
                  {{ allLanguageData.Screen }}: {{ scheduleData.ScreenName }}
                </li>
                <li class="pb-2">
                  {{ allLanguageData.Date }}: {{ scheduleData.date }}
                </li>
                <li class="pb-2">
                  {{ allLanguageData.Time }}: {{ scheduleData.time }}
                </li>
              </ul>
              <ul class="mb-0 px-0 checkout-list">
                <li class="pb-2">
                  {{ allLanguageData.Location }}: {{ scheduleData.cinemaname }}
                </li>
                <li class="pb-2">
                  {{ allLanguageData.Experience }}: {{ scheduleData.exp }}
                </li>
                <li class="pb-2">
                  {{ allLanguageData.Seats }}:
                  <span class="ar-number">{{ normal_seats }} {{`${SeatLable ? `(${SeatLable})` : ''}`}}</span><br v-if="normal_seats">
                  <span :style="!normal_seats ? '' : 'margin-left:43px;'">{{ wc_seats }} {{`${wc_seats ? `(${allLanguageData.WheelChair})` : ''}`}}</span>
                </li>
              </ul>
            </div>
            <div class="vertical-line">
              <hr class="vertical" />
            </div>
            <div>
              {{ allLanguageData.Total }} : {{ scheduleData.currency }}
              {{ scheduleData.total_ticket_fnb }} <br />
              <div
                v-b-tooltip.hover
                title="offerName"
                class="text-center small offerTxt px-1"
                v-if="showDiscounttag == true"
              >
                {{ allLanguageData.OfferApplied }}

                <!-- {{ scheduleData.Discount }} -->

                <span class="removeOffer" @click="removeAddedOffer"
                  ><img
                    src="@/assets/img/svg/close-icon.svg"
                    height="10px"
                    width="10px"
                /></span>
              </div>
              <!-- <div v-if="showDiscounttag == true">
              <b-button disabled variant="outline-info"
                >OFFER APPLIED : {{ scheduleData.Discount }}
              </b-button>
              <b-button
                size="sm"
                @click="removeAddedOffer"
                variant="outline-danger"
                >remove</b-button
              >
            </div> -->
            </div>
            <div class="vertical-line">
              <hr class="vertical" />
            </div>
            <div>
              <button class="btn btn-checkout" @click="onFinalCheckOut">
                {{ allLanguageData.Checkout }}
              </button>
            </div>
          </div>
        </div>
      </div>
      <!--Mobile Checkout Grid-->
      <div class="container-fluid checkout-fixed py-4 d-block d-md-none">
        <div class="col-lg-12 px-0 mx-auto">
          <div
            class="align-items-center pt-3 animate__animated animate__pulse"
            :class="displayContent ? 'd-block' : 'd-none'"
          >
            <div class="mt-5">
              <ul class="mb-0 px-0 checkout-list">
                <li class="pb-3">
                  <span class="font-weight-bold">MOVIE:</span>
                  {{ scheduleData.movie_name }}
                </li>
                <li class="pb-2">SCREEN: {{ scheduleData.ScreenName }}</li>
                <li class="pb-3">
                  <span class="font-weight-bold">DATE:</span>
                  {{ scheduleData.date }}
                </li>
                <li class="pb-3">
                  <span class="font-weight-bold">TIME:</span>
                  {{ scheduleData.time }}
                </li>
              </ul>
              <ul class="mb-0 px-0 checkout-list">
                <li class="pb-3">
                  <span class="font-weight-bold">LOCATION: </span>
                  {{ scheduleData.cinemaname }}
                </li>
                <li class="pb-3">
                  <span class="font-weight-bold">EXPERIENCE:</span>
                  {{ scheduleData.exp }}
                </li>
                <hr class="m-0 fade-line no-hover-effect" />
                <li class="py-3 seating-tick">
                  <span class="font-weight-bold">SEATS: </span
                  >{{ selectedSeats }}
                </li>
                <hr class="m-0 mb-3 fade-line no-hover-effect" />
              </ul>
            </div>
          </div>
          <div class="d-flex justify-content-between align-items-center">
            <div class="d-flex align-items-center details-header">
              <div @click="goBack">
                <img
                  src="@/assets/img/new-img/svg-img/back-arrow.svg"
                  class=""
                  width="30px"
                />
              </div>
              <div @click="showContent()" class="ml-3">
                <h6 class="mb-0">INFO</h6>
              </div>
            </div>
            <div
              :class="displayContent ? 'd-block arrow-down' : 'd-none'"
              @click="showContent()"
            >
              <img
                src="@/assets/img/new-img/svg-img/arrow-down.svg"
                class=""
                width="30px"
              />
            </div>
            <div
              class="d-flex align-items-center w-100"
              :class="displayContent ? '' : 'justify-content-end'"
            >
              <h6 class="font-weight-bold mb-0 mr-2">
                TOTAL : {{ scheduleData.currency }}
                {{ scheduleData.total_ticket_fnb }}
              </h6>
              <div :class="displayContent ? 'ml-auto' : ''">
                <button class="btn btn-checkout" @click="onFinalCheckOut">
                  CHECKOUT
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <b-modal
      no-close-on-esc
      no-close-on-backdrop
      hide-header-close
      id="quitBooking"
      ref="quitBooking"
      :title="allLanguageData.QuitBooking.title"
      class="ErModal light-red-color"
    >
      <img
        class="mx-auto d-block mt-4"
        src="@/assets/img/svg/alert-icon.svg"
        width="45"
        height="auto"
      />
      <h6 class="pt-3 mb-0 text-center font-weight-bold text-white">
        {{ allLanguageData.QuitBooking.Content1 }}
      </h6>
      <!-- <h6 class="pt-2 text-center font-weight-bold text-white">{{allLanguageData.ErrorModal.Content2}}!</h6> -->
      <div class="d-flex justify-content-center align-items-center">
        <div class>
          <b-button
            v-on:click="goBackHistory()"
            variant="default"
            :class="preimere == 'true' ? 'btn-proceed' : 'btn-green'"
            class="btn mt-4 mb-3"
            >{{ allLanguageData.QuitBooking.Btn }}</b-button
          >
        </div>
        <div class="px-2"></div>
        <div class>
          <b-button
            v-on:click="onClickNo()"
            variant="default"
            :class="preimere == 'true' ? 'btn-proceed' : 'btn-green'"
            class="btn mt-4 mb-3"
            >{{ allLanguageData.QuitBooking.Btn1 }}</b-button
          >
        </div>
      </div>
    </b-modal>
    <b-modal
      no-close-on-esc
      no-close-on-backdrop
      hide-header-close
      id="sessionExpired"
      ref="sessionExpired"
      title="Session Expired"
      class="ErModal light-red-color"
    >
      <img
        class="mx-auto d-block mt-4"
        src="@/assets/img/svg/alert-icon.svg"
        width="45"
        height="auto"
      />
      <h6 class="pt-3 mb-0 text-center font-weight-bold text-white">
        Session Expired Please try again.!
      </h6>
      <!-- <h6 class="pt-2 text-center font-weight-bold text-white">{{allLanguageData.ErrorModal.Content2}}!</h6> -->
      <div class="d-flex justify-content-center align-items-center">
        <div class>
          <b-button
            v-on:click="goBackExpired()"
            variant="default"
            :class="preimere == 'true' ? 'btn-proceed' : 'btn-green'"
            class="btn mt-4 mb-3"
            >OK</b-button
          >
        </div>
      </div>
    </b-modal>
  </div>
</template>

<script>
import { makeRequest } from '@/helper/internet.js'
import Vue from 'vue'
import ReactPixel from 'react-facebook-pixel'
import ReactSnapPixel from 'react-snapchat-pixel'
import { tiktockCheckout } from '@/helper/events'
import LoginForm from '@/components/pages/login.vue'
import { mapState, mapGetters, mapActions } from 'vuex'
import {
  LanguageService,
  CountryService,
  TokenService,
} from '@/services/storage.service'
import { metaInfo } from '@/helper/constant.js'

export default {
  data () {
    return {
      step: 0,
      preimere: '',
      cardInputErrorMsg: '',
      cardInputsuccessMsg: '',
      appliedOfferType: '',
      promoCodeValue: '',
      ReserveID: '',
      appliedPromoName: '',
      wc_seats: '',
      normal_seats: '',
      SeatLable: '',
      Offerindex: '',
      LanguageID: '',
      displayContent: false,
      showOfferLoading: false,
      userDetails: {},
      showTimer: false,
      selectedSeats: '',
      scheduleData: {
        ScreenName: '',
        Discount: '',
        DiscountRemark: '',
        Fvvtext: '',
        Message: '',
        OfferAmount: '',
        Offeritem: '',
        Status: '',
        TransactionType: '',
        amount: '',
        cinema: '',
        currency: '',
        date: '',
        desc: '',
        exp: '',
        fnb_total: '',
        fnbamount: '',
        fnbvat: '',
        internet_handling_amt: '',
        iscombooffer: '',
        isofferpagedisplay: '',
        movie_image: '',
        movie_name: '',
        time: '',
        screenid: '',
        total_amt: '',
        total_internet_handling_amt: '',
        total_ticket_fnb: '',
        totalfvvamt: '',
        totalseatcount: '',
        cinemaname: '',
        movieid: '',
        scheduleid: '',
      },
      fnbItemDataArry: [],
      offerTitle: [],
      offerListDetails: [],
      headerTitleId: '1',
      showDiscounttag: false,
      selectedPromotionID: '',
      userLoginStatus: true,
      showLoginForm: false,
      timerStartFunction: null,
      timer: {
        TimeoutModal: false,
        minutes: 9,
        seconds: 59,
        stop: false,
      },
    }
  },
  components: {
    LoginForm,
  },
  beforeMount () {
    this.ReserveID = this.$route.params.reserveId
    this.getReserveInfo(this.ReserveID, '0')
    this.getUserDetails()
  },
  mounted: function () {
    let token = TokenService.getToken()
    if (token) {
      this.userLoginStatus = true
      console.log(token, 'hjhjh')
    } else {
      this.userLoginStatus = false
      console.log(token, 'jhj')
    }
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

    this.getAllOffers()
    this.$root.$on('bv::collapse::state', (collapseId, isJustShown) => {
      this.showOffersDetails()
      console.log('collapseId:', collapseId)
      console.log('isJustShown:', isJustShown)
      if (collapseId == 'accordion1' && isJustShown == true) {
        this.showOffersDetails()
      }
    })
  },
  methods: {
    showContent () {
      this.displayContent = !this.displayContent
    },
    goBackExpired () {
      this.$router.push({
        path: '/seatLayout/' + this.scheduleData.scheduleid,
      })
    },
    onClickNo: function () {
      this.$refs.quitBooking.hide()
    },
    goBackHistory () {
      // this.showLoading();
      // let payload = {
      //   CategoryID: "1",
      //   ReserveID: this.ReserveID,
      // };
      // makeRequest("/ReleaseReserveSeat/", "POST", null, payload)
      //   .then((result) => {
      //     const { error, res } = result;
      //     const { data } = res.data;
      //     if (!error && res.data.Status) {
      //       console.log(res.data);
      //       window.localStorage.setItem("RID", "");
      //       this.$router.push({
      //         path: "/seatLayout/" + this.scheduleData.scheduleid,
      //       });
      //       // console.log("res.dataPratik", res.data);
      //     } else {
      //       //show error modal
      //       // this.$root.$emit("bv::show::modal", "errorModal");
      //     }
      //     this.hideLoading();
      //   })
      //   .catch((error) => {
      //     this.hideLoading();
      //     console.log("Error on vue front", error);
      //   });

      // this.$router.go(-1);
    },
    startTimer: function () {
      this.timerStartFunction = setInterval(() => {
        this.timer.seconds =
          this.timer.seconds > 0 ? parseFloat(this.timer.seconds) - 1 : 0

        if (parseFloat(this.timer.seconds) < 10) {
          this.timer.seconds = '0' + this.timer.seconds
        }

        if (parseFloat(this.timer.seconds) <= 0 && this.timer.minutes > 0) {
          this.timer.seconds = 59
          this.timer.minutes =
            this.timer.minutes > 0 ? parseFloat(this.timer.minutes) - 1 : '00'
        }
        if (
          parseFloat(this.timer.minutes) == 0 &&
          parseFloat(this.timer.seconds) == 0
        ) {
          this.timer.seconds = '00'
          this.$refs['sessionExpired'].show()
          // this.$root.$emit("bv::show::modal", "sessionTimeOut");
          clearInterval(this.timerStartFunction)
          return false
        } else {
        }
      }, 1000)
    },

    ChangeLoginStatus (isLogin) {
      if (isLogin) {
        this.$store.commit('storeLoginS')

        this.showLoginForm = false
        this.$router.push({
          path: '/select-payment/' + this.ReserveID,
        })
      } else {
        console.log('token not found')
      }
    },
    onFinalCheckOut () {
      localStorage.setItem('isChangeNumber', 0)
      ReactPixel.track('InitiateCheckout', {})
      ReactSnapPixel.track('InitiateCheckout', {})
      this.$ga.event({
        eventCategory: 'begin_checkout',
      })
      tiktockCheckout()
      if (this.userLoginStatus == true) {
        if (!this.userDetails.verfiymobile) {
          localStorage.setItem('signinuserReserveId', this.ReserveID)

          window.localStorage.setItem('MIN', this.timer.minutes)
          window.localStorage.setItem('SEC', this.timer.seconds)
          localStorage.setItem('sheduleidphone', this.scheduleData.scheduleid)
          localStorage.setItem('checkPhone', 2)
          localStorage.setItem('reservedId', '')

          this.$router.push({
            path: `/phoneotp`,
          })
        } else {
          this.$router.push({
            path: '/select-payment/' + this.ReserveID,
          })
        }
      } else {
        this.showLoginForm = true
      }
    },
    reserveSelectedOffer (data, id, indx) {
      this.Offerindex = indx
      let payload = {}
      if (data) {
        this.appliedPromoName = data.Name
        this.selectedPromotionID = data.ShowbizzVoucherID
        payload = {
          PromotionName: data.Name,
          ReserveID: this.ReserveID,
          PromotionID: data.ShowbizzVoucherID,
          isPromoCode: 0,
          TransactionType: 'Normal',
        }
      } else {
        this.appliedOfferType = '4'
        payload = {
          ReserveID: this.ReserveID,
          isPromoCode: 1,
          LanguageID: 2,
          CountryID: 230,
          TransactionType: 'Normal',
          promoCode: this.promoCodeValue,
          CouponType: 4,
        }
      }

      this.showLoading()
      makeRequest('/ReserveOffer', 'POST', null, payload)
        .then((result) => {
          const { error, res } = result
          const { data } = res.data
          this.hideLoading()
          if (!error) {
            console.log(res.data)
            if (res.data.hasOwnProperty('Status') && res.data.Status == true) {
              this.showDiscounttag = true
            }
          } else {
            console.log('object')
          }
          this.getReserveInfo(this.ReserveID, '1')
        })
        .catch((error) => {
          this.hideLoading()

          console.log('error', error)
        })
    },
    removeAddedOffer () {
      let payload = {
        ReserveID: this.ReserveID,
        PromotionID: this.selectedPromotionID,
        TransactionType: 'Normal',
      }
      this.showLoading()
      makeRequest('/ReleaseOffer', 'POST', null, payload)
        .then((result) => {
          this.hideLoading()
          const { error, res } = result
          const { data } = res.data
          if (!error) {
            console.log(res.data)
            if (res.data.hasOwnProperty('Status') && res.data.Status == true) {
              this.showDiscounttag = false
            }
          } else {
            console.log('object')
          }
          this.getReserveInfo(this.ReserveID, '1')
        })
        .catch((error) => {
          this.hideLoading()

          console.log('error', error)
        })
    },
    showOffersDetails (data) {
      this.showOfferLoading = true
      // this.hideLoading();
      // this.showLoading();
      this.offerListDetails = []
      if (data && data.OfferID) {
        this.headerTitleId = data.OfferID
      }

      let payload = {
        OfferID: this.headerTitleId,
        ReserveID: this.ReserveID,
      }

      makeRequest('/OfferMaster', 'POST', null, payload)
        .then((result) => {
          const { error, res } = result
          const { data } = res.data
          this.showOfferLoading = false
          if (!error) {
            console.log(res.data)

            if (
              res.data.hasOwnProperty('OfferList') &&
              res.data.OfferList.length > 0
            ) {
              this.offerListDetails = res.data.OfferList
            }
          } else {
            console.log('object')
          }
          this.showOfferLoading = false
          this.hideLoading()
        })
        .catch((error) => {
          this.showOfferLoading = false
          this.hideLoading()

          console.log('error', error)
        })
    },
    goBack () {
      this.$refs['quitBooking'].show()

      // this.$router.go(-1);
    },
    getReserveInfo (ReserveID, id) {
      let payload = {
        ReserveID: ReserveID,
        CategoryID: '1',
        TransactionType: 'Normal',
      }
      this.showLoading()
      makeRequest('/ReserveInfo', 'POST', null, payload)
        .then((result) => {
          const { error, res } = result
          const { data } = res.data
          if (!error) {
            if (res.data) {
              if (
                res.data.hasOwnProperty('f_and_b') &&
                res.data.f_and_b.length > 0
              ) {
                this.fnbItemDataArry = res.data.f_and_b
              }

              let obj = {
                reserveData: res.data,
              }

              Object.keys(this.scheduleData).map((x) => {
                this.scheduleData[x] = obj.reserveData[x] || ''
              })
              if (
                res.data.hasOwnProperty('seats') &&
                res.data.seats.length > 0
              ) {
                this.selectedSeats = res.data.seats[0].cat_seats
                if (res.data.seats[0].normal_seats && res.data.seats[0].normal_seats.length > 0) {
                  this.normal_seats = res.data.seats[0].normal_seats.join(',')
                  this.SeatLable = res.data.seats[0].SeatLable
                }
                if (res.data.seats[0].normal_seats && res.data.seats[0].wc_seats.length > 0) {
                  this.wc_seats = res.data.seats[0].wc_seats.join(',')
                }
              }
              if (id == '0') {
                if (
                  window.localStorage.getItem('MIN') &&
                  window.localStorage.getItem('SEC')
                ) {
                  this.timer.minutes = window.localStorage.getItem('MIN')
                  this.timer.seconds = window.localStorage.getItem('SEC')
                  this.startTimer()
                } else if (window.localStorage.getItem('SKPFNB') == 'Y') {
                  this.startTimer()
                } else {
                  this.$router.push({
                    path: '/seatLayout/' + this.scheduleData.scheduleid,
                  })
                }
              }
            }
          } else {
            console.log('object')
          }

          this.showTimer = true
          window.localStorage.setItem('MIN', '')
          window.localStorage.setItem('SEC', '')
          window.localStorage.setItem('SKPFNB', '')

          this.hideLoading()
        })
        .catch((error) => {
          this.showTimer = true
          window.localStorage.setItem('MIN', '')
          window.localStorage.setItem('SEC', '')
          window.localStorage.setItem('SKPFNB', '')
          this.hideLoading()

          console.log('error', error)
        })
    },
    getAllOffers () {
      // this.showLoading();
      this.offerTitle = []
      makeRequest('/OfferMaster', 'POST', null, null)
        .then((result) => {
          const { error, res } = result
          const { data } = res.data
          if (!error) {
            if (
              res.data.hasOwnProperty('OfferMaster') &&
              res.data.OfferMaster.length > 0
            ) {
              console.log(res.data.OfferMaster)
              res.data.OfferMaster.map((x) => {
                if (
                  x.OfferID != '2' &&
                  x.OfferID != '4' &&
                  x.OfferID != '7' &&
                  x.OfferID != '8'
                ) {
                  this.offerTitle.push(x)
                }
              })
              this.showOffersDetails()
              // this.getOfferDetails();
            }
          } else {
            console.log('object')
          }
          this.hideLoading()
        })
        .catch((error) => {
          this.hideLoading()

          console.log('error', error)
        })
    },
    getUserDetails: function () {
      let token = TokenService.getToken()
      let payload = {}
      makeRequest('/ProfileDataNew', 'POST', token, payload)
        .then((result) => {
          const { error, res } = result
          this.userDetails.email = res.data.Email
          this.userDetails.phoneNumber = res.data.Mobile
          this.userDetails.CountryCode = res.data.CountryCode
          this.userDetails.verfiymobile = res.data.verfiymobile

          this.hideLoading()
        })
        .catch((error) => {
          console.log('Error on vue front', error)
        })
      setTimeout(() => {
        this.hideLoading()
      }, 5000)
    },
  },
}
</script>
<style>
</style>
