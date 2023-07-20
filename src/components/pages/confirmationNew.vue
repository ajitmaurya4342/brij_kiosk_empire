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
                  <br />
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

              <div
                class="checkout-grid-col mb-3 px-3"
                v-if="internet_handling_fees"
              >
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
                    -{{
                      currFormat(
                        getSafe(
                          () => appliedBrijVoucher.BoxOffice.TotalOfferPrice,
                          0
                        )
                      )
                    }}
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
                                v-for="(offerType,
                                offerTypeIndex) in offerTitle"
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
                                      v-for="(offerData,
                                      indx) in offerListDetails"
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
                    visible
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
                  <span class="ar-number"
                    >{{ normal_seats }}
                    {{ `${SeatLable ? `(${SeatLable})` : ""}` }}</span
                  ><br v-if="normal_seats" />
                  <span :style="!normal_seats ? '' : 'margin-left:43px;'"
                    >{{ wc_seats }}
                    {{
                      `${wc_seats ? `(${allLanguageData.WheelChair})` : ""}`
                    }}</span
                  >
                </li>
              </ul>
            </div>
            <div class="vertical-line">
              <hr class="vertical" />
            </div>
            <div :class="['finalTotalDiv', scheduleData.total_ticket_fnb]">
              {{ allLanguageData.Total }} : {{ scheduleData.currency }}
              {{
                +parseFloat(
                  scheduleData.total_ticket_fnb -
                    getSafe(
                      () => appliedBrijVoucher.BoxOffice.TotalOfferPrice,
                      0
                    )
                ).toFixed(2)
              }}
              <br />
              <div
                v-b-tooltip.hover
                :title="appliedPromoName ? appliedPromoName : ''"
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
    <b-modal
      no-close-on-esc
      no-close-on-backdrop
      hide-header-close
      id="errorModal"
      ref="errorModal"
      title="Booking Failed"
      class="ErModal light-red-color"
    >
      <img
        class="mx-auto d-block mt-4"
        src="@/assets/img/svg/alert-icon.svg"
        width="45"
        height="auto"
      />
      <h6 class="pt-3 mb-0 text-center font-weight-bold text-white">
        {{ this.errorMessage }}...
      </h6>

      <b-button
        @click="onClickOk()"
        variant="default"
        class="btn btn-green mt-4 mb-3"
        >{{ allLanguageData.ErrorModal.Btn }}</b-button
      >
    </b-modal>
  </div>
</template>

<script>
import { makeRequest, makeRequestBrij } from "@/helper/internet.js";
import Vue from "vue";
import moment from "moment";
import ReactPixel from "react-facebook-pixel";
import ReactSnapPixel from "react-snapchat-pixel";
import { tiktockCheckout } from "@/helper/events";
import LoginForm from "@/components/pages/login.vue";
import { mapState, mapGetters, mapActions } from "vuex";
import {
  LanguageService,
  CountryService,
  TokenService
} from "@/services/storage.service";
import { metaInfo } from "@/helper/constant.js";

export default {
  data() {
    return {
      step: 0,
      preimere: "",
      cardInputErrorMsg: "",
      errorMessage: "",
      cardInputsuccessMsg: "",
      appliedOfferType: "",
      promoCodeValue: "",
      ReserveID: "",
      appliedPromoName: "",
      wc_seats: "",
      normal_seats: "",
      SeatLable: "",
      Offerindex: "",
      LanguageID: "",
      displayContent: false,
      showOfferLoading: false,
      userDetails: {},
      profileDetails: {},
      showTimer: false,
      selectedSeats: "",
      scheduleData: {
        ScreenName: "",
        Discount: "",
        DiscountRemark: "",
        Fvvtext: "",
        Message: "",
        OfferAmount: "",
        Offeritem: "",
        Status: "",
        TransactionType: "",
        amount: "",
        cinema: "",
        currency: "",
        date: "",
        desc: "",
        exp: "",
        fnb_total: "",
        fnbamount: "",
        fnbvat: "",
        internet_handling_amt: "",
        iscombooffer: "",
        isofferpagedisplay: "",
        movie_image: "",
        movie_name: "",
        time: "",
        screenid: "",
        total_amt: "",
        total_internet_handling_amt: "",
        total_ticket_fnb: "",
        totalfvvamt: "",
        totalseatcount: "",
        cinemaname: "",
        movieid: "",
        scheduleid: ""
      },
      fnbItemDataArry: [],
      offerTitle: [],
      offerListDetails: [],
      headerTitleId: "1",
      showDiscounttag: false,
      selectedPromotionID: "",
      userLoginStatus: true,
      showLoginForm: false,
      timerStartFunction: null,
      timer: {
        TimeoutModal: false,
        minutes: 9,
        seconds: 59,
        stop: false
      },
      isSeatReleased: true,
      internet_handling_fees: false,
      reservationDetails: null,
      appliedBrijVoucher: null
    };
  },
  components: {
    LoginForm
  },
  computed: {
    curr_code() {
      return this.$store.getters.getGlobalCurrency.curr_code || "Sar";
    }
  },
  beforeMount() {
    this.ReserveID = this.$route.params.reserveId;
    this.getReserveInfo(this.ReserveID, "0");
    this.getUserDetailsBrij();
  },
  mounted: function() {
    let token = TokenService.getToken();
    if (token) {
      this.userLoginStatus = true;
      console.log(token, "hjhjh");
    } else {
      this.userLoginStatus = false;
      console.log(token, "jhj");
    }
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

    this.getAllOffers();
    this.$root.$on("bv::collapse::state", (collapseId, isJustShown) => {
      this.showOffersDetails();
      console.log("collapseId:", collapseId);
      console.log("isJustShown:", isJustShown);
      if (collapseId == "accordion1" && isJustShown == true) {
        this.showOffersDetails();
      }
    });
  },
  beforeRouteLeave(to, from, next) {
    if (this.isSeatReleased) {
      this.callSeatReleased();
    }
    next();
  },
  methods: {
    getCinemaTranslatedName(cinema) {
      if (!cinema) return "";

      let name =
        this.getLangSpecificAttribute(
          cinema.translation_data || [],
          this.getCurrentLang().brij_lang_id,
          "cinema_name",
          "langaugeId"
        ) || cinema.cinema_name;

      return name;
    },
    getUserDetailsBrij: function(callback) {
      let token = TokenService.getToken();
      let payload = {};
      makeRequestBrij(
        `/api/external/get-user-details/${token}`,
        "GET",
        null,
        null
      )
        .then(result => {
          const { error, res } = result;
          if (!error && res.data.status) {
            // this.profileDetails = res.data.FirstName;
            this.profileDetails = res.data.EmpireData || {};

            this.userDetails.email = this.profileDetails.Email;
            this.userDetails.phoneNumber = this.profileDetails.Mobile;
            this.userDetails.CountryCode = this.profileDetails.CountryCode;
            this.userDetails.verfiymobile = this.profileDetails.verfiymobile;

            this.hideLoading();
          }
        })
        .catch(error => {
          console.log("Error on vue front", error);
        });
    },

    callSeatReleased() {
      makeRequestBrij("/api/external/release-seat", "POST", null, {
        reservation_id: this.ReserveID
      }).then(result2 => {});
    },
    showContent() {
      this.displayContent = !this.displayContent;
    },
    goBackExpired() {
      this.onClickOk();
    },
    onClickNo: function() {
      this.$refs.quitBooking.hide();
    },
    onClickOk: function() {
      this.$router.go(-1);
      this.$refs.errorModal.hide();
      this.$refs.quitBooking.hide();
      this.$refs.sessionExpired.hide();
    },
    goBackHistory() {
      this.onClickOk();
    },
    startTimer: function() {
      this.timerStartFunction = setInterval(() => {
        this.timer.seconds =
          this.timer.seconds > 0 ? parseFloat(this.timer.seconds) - 1 : 0;

        if (parseFloat(this.timer.seconds) < 10) {
          this.timer.seconds = "0" + this.timer.seconds;
        }

        if (parseFloat(this.timer.seconds) <= 0 && this.timer.minutes > 0) {
          this.timer.seconds = 59;
          this.timer.minutes =
            this.timer.minutes > 0 ? parseFloat(this.timer.minutes) - 1 : "00";
        }
        if (
          parseFloat(this.timer.minutes) == 0 &&
          parseFloat(this.timer.seconds) == 0
        ) {
          this.timer.seconds = "00";
          this.$refs["sessionExpired"].show();
          // this.$root.$emit("bv::show::modal", "sessionTimeOut");
          clearInterval(this.timerStartFunction);
          return false;
        } else {
        }
      }, 1000);
    },

    ChangeLoginStatus(isLogin) {
      if (isLogin) {
        this.$store.commit("storeLoginS");

        this.showLoginForm = false;
        this.$router.push({
          path: "/select-payment/" + this.ReserveID
        });
      } else {
        console.log("token not found");
      }
    },
    linkMobile(userDetail) {
      this.showLoading();
      const payload = {
        change_number: userDetail.phoneNumber
          .trim()
          .split(" ")
          .join(""),
        resend_otp: "",
        verification_id: localStorage.getItem("verification_id")
      };
      makeRequestBrij("/api/cinema/verify-user", "POST", null, payload)
        .then(result => {
          const { error, res } = result;
          if (res.data.status) {
            this.$router.push({
              path: `/phoneotp?reserveId=${this.ReserveID}`
            });
          }
          this.hideLoading();
        })
        .catch(error => {});
    },
    onFinalCheckOut() {
      this.isSeatReleased = false;
      // localStorage.setItem('isChangeNumber', 0)
      // ReactPixel.track('InitiateCheckout', {})
      // ReactSnapPixel.track('InitiateCheckout', {})
      // this.$ga.event({
      //   eventCategory: 'begin_checkout',
      // })
      // tiktockCheckout()
      if (this.userLoginStatus == true) {
        if (!this.userDetails.verfiymobile) {
          localStorage.setItem("signinuserReserveId", this.ReserveID);

          window.localStorage.setItem("MIN", this.timer.minutes);
          window.localStorage.setItem("SEC", this.timer.seconds);
          localStorage.setItem("sheduleidphone", this.scheduleData.scheduleid);
          localStorage.setItem("checkPhone", 2);
          localStorage.setItem("reservedId", "");
          this.linkMobile(this.userDetails);
        } else {
          this.$router.push({
            path: "/select-payment/" + this.ReserveID
          });
        }
      } else {
        this.showLoginForm = true;
      }
    },
    reserveSelectedOffer(data, id, indx) {
      this.appliedBrijVoucher = null;
      this.cardInputErrorMsg = "";
      this.errorMessage = "";
      this.cardInputsuccessMsg = "";

      this.Offerindex = indx;
      let payload = {};
      if (data) {
        // this.appliedPromoName = data.Name
        // this.selectedPromotionID = data.ShowbizzVoucherID
        // payload = {
        //   PromotionName: data.Name,
        //   ReserveID: this.ReserveID,
        //   PromotionID: data.ShowbizzVoucherID,
        //   isPromoCode: 0,
        //   TransactionType: 'Normal',
        // }
      } else {
        this.appliedPromoName = this.promoCodeValue;
        this.appliedOfferType = "4";
        payload = {
          ReserveID: this.ReserveID,
          isPromoCode: 1,
          LanguageID: 2,
          CountryID: 230,
          TransactionType: "Normal",
          promoCode: this.promoCodeValue,
          CouponType: 4
        };
      }

      let voucher = {
        cinema_id: this.reservationDetails.cinema_id,
        cinema_name: this.reservationDetails.cine_name,
        isTicket: true,
        md_id: this.reservationDetails.md_id,
        net_amount: this.reservationDetails.net_amount,
        total_amount: this.reservationDetails.amount, // + getRateCardAddonsTotal(add_ons_array),
        total_ticket: this.reservationDetails.selectedSeats.length,
        voucher_title: this.promoCodeValue,
        voucher_code: this.promoCodeValue
      };

      if (
        this.reservationDetails.fnb_data &&
        this.reservationDetails.fnb_data.selected_fnb_items &&
        this.reservationDetails.fnb_data.selected_fnb_items.length
      ) {
        voucher.isComboApplied = true;

        voucher.fnb_total_amount = this.reservationDetails.fnb_data.fnb_price.total_price;

        voucher.fnb_total_item = this.reservationDetails.fnb_data.selected_fnb_items.length;

        voucher.fnb_net_amount =
          this.reservationDetails.fnb_data.fnb_price.total_price -
          this.reservationDetails.fnb_data.fnb_price.total_tax;
      }

      this.showLoading();
      console.log({ payload, voucher });

      makeRequestBrij(`/api/external/v2/verify-voucher`, "POST", null, voucher)
        .then(result => {
          const { error, res } = result;
          console.log({ data: res.data });
          if (res.data.status) {
            // this.getReserveInfo(this.ReserveID, '1')
            this.appliedBrijVoucher = res.data;
            this.showDiscounttag = true;
            this.cardInputsuccessMsg = res.data.message;
            return voucher.voucher_code;
          } else {
            this.appliedBrijVoucher = null;
            this.cardInputErrorMsg = res.data.message;
            this.showDiscounttag = false;
            return false;
          }
        })
        .then(result => {
          if (result) {
            return makeRequestBrij(`/api/external/save-voucher`, "POST", null, {
              reservation_id: this.ReserveID,
              voucher_code: result
            })
              .then(result => ({}))
              .catch(e => ({}));
          } else {
            return Promise.resolve();
          }
        })
        .catch(error => {
          this.appliedBrijVoucher = null;
          this.showDiscounttag = false;
          console.log("error", error);
        })
        .finally(() => {
          this.hideLoading();
        });
    },
    removeAddedOffer() {
      let payload = {
        ReserveID: this.ReserveID,
        PromotionID: this.selectedPromotionID,
        TransactionType: "Normal"
      };
      this.showLoading();

      Promise.resolve(this.promoCodeValue)
        .then(result => {
          return makeRequestBrij(`/api/external/save-voucher`, "POST", null, {
            reservation_id: this.ReserveID,
            voucher_code: result
          })
            .then(result => ({}))
            .catch(e => ({}));
        })
        .then(() => {
          this.cardInputErrorMsg = "";
          this.cardInputsuccessMsg = "";
          this.promoCodeValue = "";
          this.appliedBrijVoucher = null;
          this.showDiscounttag = false;
          this.hideLoading();
        });
    },
    showOffersDetails(data) {
      this.showOfferLoading = true;
      // this.hideLoading();
      // this.showLoading();
      this.offerListDetails = [];
      if (data && data.OfferID) {
        this.headerTitleId = data.OfferID;
      }

      let payload = {
        OfferID: this.headerTitleId,
        ReserveID: this.ReserveID
      };

      makeRequest("/OfferMaster", "POST", null, payload)
        .then(result => {
          const { error, res } = result;
          const { data } = res.data;
          this.showOfferLoading = false;
          if (!error) {
            console.log(res.data);

            if (
              res.data.hasOwnProperty("OfferList") &&
              res.data.OfferList.length > 0
            ) {
              this.offerListDetails = res.data.OfferList;
            }
          } else {
            console.log("object");
          }
          this.showOfferLoading = false;
          this.hideLoading();
        })
        .catch(error => {
          this.showOfferLoading = false;
          this.hideLoading();

          console.log("error", error);
        });
    },
    goBack() {
      this.$refs["quitBooking"].show();

      // this.$router.go(-1);
    },
    getReserveInfo(ReserveID) {
      this.hideLoading();
      let payload = {};
      this.showLoading();
      makeRequestBrij(
        `/api/external/reservation-detail/${ReserveID}`,
        "GET",
        null,
        null
      )
        .then(result => {
          const { error, res } = result;
          const { data } = res.data;

          if (!error) {
            if (res.data && res.data.status) {
              let schedule_detail = res.data.Records[0];
              this.reservationDetails = res.data.Records[0];

              this.scheduleData.fnb_total = 0;
              if (
                schedule_detail.hasOwnProperty("fnb_data") &&
                schedule_detail.fnb_data &&
                schedule_detail.fnb_data.hasOwnProperty("selected_fnb_items") &&
                schedule_detail.fnb_data.selected_fnb_items.length > 0
              ) {
                console.log(
                  schedule_detail.fnb_data.selected_fnb_items,
                  "FNBBB"
                );
                this.fnbItemDataArry =
                  schedule_detail.fnb_data.selected_fnb_items;

                this.fnbItemDataArry.map(z => {
                  z["qty"] = z.Quantity;
                  z["title"] = z.item_name;
                  this.scheduleData.fnb_total = +parseFloat(
                    this.scheduleData.fnb_total + z.fp_total_amount * z.Quantity
                  ).toFixed(2);
                });
              } else {
                console.log("res.datares.datares.datares.datares.data");
              }

              this.scheduleData.movie_name =
                this.getLangSpecificAttribute(
                  schedule_detail.altMovieContent,
                  this.getCurrentLang().brij_lang_id,
                  "mc_title"
                ) ||
                schedule_detail.movie_title ||
                schedule_detail.original_title_of_movie;
              this.scheduleData.ScreenName = schedule_detail.screen_name;
              this.scheduleData.exp = schedule_detail.mf_name;
              this.scheduleData.cinemaname =
                this.getCinemaTranslatedName(schedule_detail) ||
                schedule_detail.cine_name;
              this.scheduleData.time = moment(
                schedule_detail.ss_start_show_time,
                "HH:mm"
              )
                .locale(this.getCurrentLang().iso_2 || "en")
                .format("hh:mm A");
              this.scheduleData.date = moment(
                schedule_detail.ss_actual_start_date
              )
                .locale(this.getCurrentLang().iso_2 || "en")
                .format("ddd, DD MMM YYYY");
              this.scheduleData.totalseatcount =
                schedule_detail.selectedSeats.length;
              this.scheduleData.currency =
                this.$store.getters.getGlobalCurrency.curr_code || "Sar";
              this.scheduleData.amount = +parseFloat(
                schedule_detail.amount
              ).toFixed(2);
              this.scheduleData.total_internet_handling_amt = +parseFloat(
                schedule_detail.internet_handling_fee
              ).toFixed(2);

              this.internet_handling_fees =
                res.data.is_internet_handling_fee_applied == "Y" &&
                this.scheduleData.total_internet_handling_amt > 0;

              if (
                schedule_detail.hasOwnProperty("selectedSeats") &&
                schedule_detail.selectedSeats.length > 0
              ) {
                this.selectedSeatsNew = schedule_detail.selectedSeats;

                this.selectedSeatsNew.map(z => {
                  if (!this.SeatLable) {
                    this.SeatLable = z.sst_seat_type;
                  }
                  if (z.seat_reserve_type_id == 3) {
                    this.wc_seats += z.sl_seat_name + ", ";
                  } else {
                    this.normal_seats += z.sl_seat_name + ", ";
                  }
                });
                if (this.normal_seats) {
                  this.normal_seats = this.normal_seats.substring(
                    0,
                    this.normal_seats.length - 2
                  );
                }
                if (this.wc_seats) {
                  this.wc_seats = this.wc_seats.substring(
                    0,
                    this.wc_seats.length - 2
                  );
                }

                if (schedule_detail.amount) {
                  this.totalAmount = schedule_detail.amount.toFixed(2);
                }
                this.showTimer = true;
                this.timer.minutes = schedule_detail.timer_minutes;
                this.timer.seconds = schedule_detail.timer_second;
                this.startTimer();
              }

              this.scheduleData.total_ticket_fnb = +parseFloat(
                this.scheduleData.fnb_total +
                  this.scheduleData.amount +
                  schedule_detail.internet_handling_fee
              ).toFixed(2);
              this.hideLoading();
            } else {
              setTimeout(() => {
                this.$refs["errorModal"].show();
                this.errorMessage = res.data.message;
                this.hideLoading();
              });
            }
          } else {
            console.log("object");
          }
        })
        .then(() => {
          return makeRequestBrij(`/api/external/save-voucher`, "POST", null, {
            reservation_id: ReserveID
          })
            .then(result => ({}))
            .catch(e => ({}));
        })
        .catch(error => {
          this.hideLoading();

          console.log("error", error);
        });
    },

    getReserveInfoOld(ReserveID, id) {
      let payload = {
        ReserveID: ReserveID,
        CategoryID: "1",
        TransactionType: "Normal"
      };
      this.showLoading();
      makeRequestBrij(
        `/api/external/reservation-detail/${ReserveID}`,
        "GET",
        null,
        null
      )
        .then(result => {
          const { error, res } = result;
          const { data } = res.data;
          if (!error) {
            if (res.data) {
              if (
                res.data.hasOwnProperty("fnb_data") &&
                res.data.fnb_data.hasOwnProperty("selected_fnb_items") &&
                res.data.fnb_data.selected_fnb_items > 0
              ) {
                console.log(res.data);
                this.fnbItemDataArry = res.data.fnb_data.selected_fnb_items;
                this.fnbItemDataArry.map(z => {
                  z["qty"] = z.Quantity;
                  z["title"] = z.item_name;
                });
              }

              let obj = {
                reserveData: res.data
              };

              Object.keys(this.scheduleData).map(x => {
                this.scheduleData[x] = obj.reserveData[x] || "";
              });
              if (
                res.data.hasOwnProperty("seats") &&
                res.data.seats.length > 0
              ) {
                this.selectedSeats = res.data.seats[0].cat_seats;
                if (
                  res.data.seats[0].normal_seats &&
                  res.data.seats[0].normal_seats.length > 0
                ) {
                  this.normal_seats = res.data.seats[0].normal_seats.join(",");
                  this.SeatLable = res.data.seats[0].SeatLable;
                }
                if (
                  res.data.seats[0].normal_seats &&
                  res.data.seats[0].wc_seats.length > 0
                ) {
                  this.wc_seats = res.data.seats[0].wc_seats.join(",");
                }
              }
              if (id == "0") {
                if (
                  window.localStorage.getItem("MIN") &&
                  window.localStorage.getItem("SEC")
                ) {
                  this.timer.minutes = window.localStorage.getItem("MIN");
                  this.timer.seconds = window.localStorage.getItem("SEC");
                  this.startTimer();
                } else if (window.localStorage.getItem("SKPFNB") == "Y") {
                  this.startTimer();
                } else {
                  this.$router.push({
                    path: "/seatLayout/" + this.scheduleData.scheduleid
                  });
                }
              }
            }
          } else {
            console.log("object");
          }

          this.showTimer = true;
          window.localStorage.setItem("MIN", "");
          window.localStorage.setItem("SEC", "");
          window.localStorage.setItem("SKPFNB", "");

          this.hideLoading();
        })
        .catch(error => {
          this.showTimer = true;
          window.localStorage.setItem("MIN", "");
          window.localStorage.setItem("SEC", "");
          window.localStorage.setItem("SKPFNB", "");
          this.hideLoading();

          console.log("error", error);
        });
    },
    getAllOffers() {
      // this.showLoading();
      this.offerTitle = [];
      makeRequest("/OfferMaster", "POST", null, null)
        .then(result => {
          const { error, res } = result;
          const { data } = res.data;
          if (!error) {
            if (
              res.data.hasOwnProperty("OfferMaster") &&
              res.data.OfferMaster.length > 0
            ) {
              console.log(res.data.OfferMaster);
              res.data.OfferMaster.map(x => {
                if (
                  x.OfferID != "2" &&
                  x.OfferID != "4" &&
                  x.OfferID != "7" &&
                  x.OfferID != "8"
                ) {
                  this.offerTitle.push(x);
                }
              });
              this.showOffersDetails();
              // this.getOfferDetails();
            }
          } else {
            console.log("object");
          }
          this.hideLoading();
        })
        .catch(error => {
          this.hideLoading();

          console.log("error", error);
        });
    },
    getUserDetails: function() {
      let token = TokenService.getToken();
      let payload = {};
      makeRequest("/ProfileDataNew", "POST", token, payload)
        .then(result => {
          const { error, res } = result;
          this.userDetails.email = res.data.Email;
          this.userDetails.phoneNumber = res.data.Mobile;
          this.userDetails.CountryCode = res.data.CountryCode;
          this.userDetails.verfiymobile = res.data.verfiymobile;

          this.hideLoading();
        })
        .catch(error => {
          console.log("Error on vue front", error);
        });
      setTimeout(() => {
        this.hideLoading();
      }, 5000);
    }
  }
};
</script>
<style></style>
