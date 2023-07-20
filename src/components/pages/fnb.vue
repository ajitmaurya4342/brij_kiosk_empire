<template>
  <div>
    <div class="container mt-5 mb-5 pb-5 emp-seatlayout header-space">
      <div class="col-md-12 px-0">
        <div class="mb-3 seatlayout-timer">
          <div class="centerTitle">
            <span class="red-dotl"></span>
            <div class="d-flex justify-content-center align-items-center">
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
        <div class="text-center font-weight-bold mt-4 mb-3">
          {{ allLanguageData.GrabABite }}
        </div>
        <div class="fnb-section">
          <div class="screen-header fnb-header mx-0 py-4 px-2 px-lg-5 mt-n1">
            <div class="screen-tabs mx-auto">
              <ul class="list-inline my-0 py-0" @click="filterFnbItems">
                <li class="list-inline-item">
                  <a
                    class="item-link"
                    id="slick-0"
                    @click="getTitleIndex('all')"
                    :style="FnbSelected == 'all' ? 'color:red !important' : ''"
                    >All</a
                  >
                </li>
                <li
                  v-for="(data, index) in fnbItemDataTemp"
                  :key="index"
                  class="list-inline-item"
                >
                  <a
                    class="item-link ar-number"
                    :id="`slick-${index + 1}`"
                    @click="getTitleIndex(data.Id)"
                    :style="
                      FnbSelected == data.Id ? 'color:red !important' : ''
                    "
                    >{{ data.Title }}
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div class="fnb-content">
            <div
              v-for="(data, index) in fnbItemData"
              :key="index"
              class="my-4 pt-2"
              ref="fnbSliderWrapper"
            >
              <div class="fnb-title py-3 pl-3 ar-number">
                {{ data.Title }} ( {{ data.itemcount }} )
              </div>

              <div class="fnb-items empire-slider fnb-slider mt-4">
                <!--Start Offer Slider-->
                <!-- {{data.Id}} -->
                <slick
                  @reInit="handleReInit"
                  :ref="'fnbSlider' + index"
                  :options="fnbSliderOptions()"
                  :id="'fnbSlider' + data.Id"
                  class="fnbSlider"
                >
                  <div
                    v-for="(dataItems, indexitems) in data.items"
                    :key="indexitems"
                  >
                    <div class="fnb-card py-3">
                      <div class="fnb-img d-flex justify-content-center">
                        <img
                          :src="URL_BASE_IMG + dataItems.ThumbnailImage"
                          class="image img-fluid"
                        />
                      </div>
                      <div class="fnb-content pt-2">
                        <p class="main-title ar-number">
                          {{ dataItems.ItemName }}
                        </p>
                        <div class="grid-half">
                          <div class="fnb-amt ar-number">
                            {{ dataItems.Currency }} {{ dataItems.Amount }}
                          </div>
                          <div class="qty">
                            <div
                              class="icon"
                              @click="
                                storeFnbItems(
                                  dataItems,
                                  'sub',
                                  index,
                                  indexitems
                                )
                              "
                            >
                              <a> -</a>
                            </div>
                            <div class="num ar-number">{{ dataItems.Qty }}</div>
                            <div
                              class="icon"
                              @click="
                                storeFnbItems(
                                  dataItems,
                                  'add',
                                  index,
                                  indexitems
                                )
                              "
                            >
                              <a> +</a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </slick>
                <!--End Offer Slider-->
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

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
            <hr class="vertical" />
          </div>
          <div>
            <div class="grid-half">
              <ul class="mb-0 px-0 checkout-list">
                <li class="pb-2">
                  {{ allLanguageData.Movie }}: {{ scheduleData.MovieTitle }}
                </li>
                <li class="pb-2">
                  {{ allLanguageData.Screen }}: {{ scheduleData.ScreenName }}
                </li>
                <li class="pb-2">
                  {{ allLanguageData.Date }}: {{ scheduleData.ShowDate }}
                </li>
                <li class="pb-2">
                  {{ allLanguageData.Time }}: {{ scheduleData.ShowTime }}
                </li>
              </ul>
              <ul class="mb-0 px-0 checkout-list">
                <li class="pb-2">
                  {{ allLanguageData.Location }}: {{ scheduleData.CinameName }}
                </li>
                <li class="pb-2">
                  {{ allLanguageData.Experience }}:
                  {{ scheduleData.Experience }}
                </li>
                <li class="pb-2">
                  {{ allLanguageData.Seats }}:
                  <span class="ar-number">{{ normal_seats }} {{`${SeatLable ? `(${SeatLable})` : ''}`}} </span><br v-if="normal_seats">
                  <span :style="!normal_seats ? '' : 'margin-left:43px;'">{{ wc_seats }} {{`${wc_seats ? `(${allLanguageData.WheelChair})` : ''}`}}</span>

                </li>
              </ul>
            </div>
            <div class="fnb-half">
              <ul class="mb-0 px-0 checkout-list">
                <li v-if="userSelectedFnBItems.length > 0" class="pb-1">
                  {{ allLanguageData.FoodDrinks }}: &nbsp;
                </li>
              </ul>
              <div class="d-flex flex-wrap">
                <div
                  v-for="(datafnb, indexf) in userSelectedFnBItems"
                  :key="indexf"
                  class="pb-1 food-list"
                >
                  ( {{ datafnb.Qty }} X {{ datafnb.ItemName }} )
                </div>
              </div>
            </div>
          </div>
          <div class="vertical-line">
            <hr class="vertical" />
          </div>
          <div>
            {{ allLanguageData.Total }} :
            <span class="ar-number"
              >{{ scheduleData.Currency }} {{ totalAmount }}</span
            >
          </div>
          <div class="vertical-line">
            <hr class="vertical" />
          </div>
          <div>
            <button
              v-if="userSelectedFnBItems.length > 0"
              class="btn btn-checkout"
              @click="onSubmitfnbCheckOut"
            >
              {{ allLanguageData.Proceed }}
            </button>
            <button v-else class="btn btn-checkout" @click="skipFNB">
              {{ allLanguageData.Skip }}
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
            <ul class="info-list">
              <li>
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M10.2492 0.703125L4.75078 7.95234L1.5 4.70391L0 6.20391L4.99922 11.2031L12 2.20312L10.2492 0.703125Z"
                    fill="#5CC82A"
                  />
                </svg>
                <strong>{{ allLanguageData.Movie }}:</strong>
                <span>{{ scheduleData.MovieTitle }}</span>
              </li>

              <li>
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M10.2492 0.703125L4.75078 7.95234L1.5 4.70391L0 6.20391L4.99922 11.2031L12 2.20312L10.2492 0.703125Z"
                    fill="#5CC82A"
                  />
                </svg>
                <strong>{{ allLanguageData.Screen }}:</strong>
                <span>{{ scheduleData.ScreenName }}</span>
              </li>

              <li>
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M10.2492 0.703125L4.75078 7.95234L1.5 4.70391L0 6.20391L4.99922 11.2031L12 2.20312L10.2492 0.703125Z"
                    fill="#5CC82A"
                  />
                </svg>
                <strong>{{ allLanguageData.Date }}:</strong>
                <span>{{ scheduleData.ShowDate }}</span>
              </li>

              <li>
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M10.2492 0.703125L4.75078 7.95234L1.5 4.70391L0 6.20391L4.99922 11.2031L12 2.20312L10.2492 0.703125Z"
                    fill="#5CC82A"
                  />
                </svg>
                <strong>{{ allLanguageData.Time }}:</strong>
                <span>{{ scheduleData.ShowTime }}</span>
              </li>
            </ul>

            <ul class="info-list">
              <li>
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M10.2492 0.703125L4.75078 7.95234L1.5 4.70391L0 6.20391L4.99922 11.2031L12 2.20312L10.2492 0.703125Z"
                    fill="#5CC82A"
                  />
                </svg>
                <strong>{{ allLanguageData.Location }}:</strong>
                <span>{{ scheduleData.CinameName }}</span>
              </li>

              <li>
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M10.2492 0.703125L4.75078 7.95234L1.5 4.70391L0 6.20391L4.99922 11.2031L12 2.20312L10.2492 0.703125Z"
                    fill="#5CC82A"
                  />
                </svg>
                <strong>{{ allLanguageData.Experience }}:</strong>
                <span>{{ scheduleData.Experience }}</span>
              </li>

              <li>
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M10.2492 0.703125L4.75078 7.95234L1.5 4.70391L0 6.20391L4.99922 11.2031L12 2.20312L10.2492 0.703125Z"
                    fill="#5CC82A"
                  />
                </svg>
                <strong>{{ allLanguageData.Seats }}: </strong>
                  <span class="ar-number">{{ normal_seats }} {{`${SeatLable ? `(${SeatLable})` : ''}`}} </span><br v-if="normal_seats">
                  <span :style="!normal_seats ? '' : 'margin-left:43px;'">{{ wc_seats }} {{`${wc_seats ? `(${allLanguageData.WheelChair})` : ''}`}}</span>

              </li>

              <li class="seating-tick">
                <hr class="m-0 fade-line no-hover-effect" />
                <div class="py-3">
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 12 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M10.2492 0.703125L4.75078 7.95234L1.5 4.70391L0 6.20391L4.99922 11.2031L12 2.20312L10.2492 0.703125Z"
                      fill="#5CC82A"
                    />
                  </svg>
                  <span>{{ allLanguageData.FoodDrinks }}: </span>
                  <div class="d-flex flex-wrap pt-2">
                    <div
                      v-for="(datafnb, indexf) in userSelectedFnBItems"
                      :key="indexf"
                      class="pb-2 food-list"
                    >
                      ( {{ datafnb.Qty }} X {{ datafnb.ItemName }} )
                    </div>
                  </div>
                </div>
                <hr class="m-0 mb-3 fade-line no-hover-effect" />
              </li>
            </ul>
          </div>
          <div class="d-flex justify-content-between align-items-center"></div>
        </div>
        <div class="d-flex justify-content-between align-items-center">
          <div class="d-flex align-items-center details-header">
            <div @click="goBack()">
              <img
                src="@/assets/img/new-img/svg-img/back-arrow.svg"
                class=""
                width="30px"
              />
            </div>

            <div
              @click="showContent()"
              v-bind:class="langName == 'ar' ? 'mr-1' : 'ml-1'"
            >
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
            <h6
              class="font-weight-bold mb-0"
              v-bind:class="langName == 'ar' ? 'ml-2' : 'mr-2'"
            >
              {{ allLanguageData.Total }} : {{ scheduleData.Currency }}
              {{ totalAmount }}
            </h6>
            <div :class="displayContent ? 'ml-auto' : ''">
              <button
                v-if="userSelectedFnBItems.length > 0"
                class="btn btn-checkout"
                @click="onSubmitfnbCheckOut"
              >
                {{ allLanguageData.Proceed }}
              </button>
              <button v-else class="btn btn-checkout" @click="skipFNB">
                {{ allLanguageData.Skip }}
              </button>
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
import { groupBy } from 'lodash'
import { EventBus } from '@/main'
import axios from 'axios'
import $ from 'jquery'
import { URL_BASE } from '@/helper/constant'
import OtpInput from '@/components/OTP/OtpInput.vue'

import {
  LanguageService,
  CountryService,
  TokenService,
} from '@/services/storage.service'

export default {
  beforeCreate: function () {
    let pre = window.localStorage.getItem('PREIMERE')
    if (pre == null || pre == 'false' || pre == false) {
      document.body.className = 'seatlayout-section'
    } else {
      document.body.className = 'gold-black-bg'
    }
  },

  name: 'seatlayout',
  components: {
    OtpInput,
  },
  metaInfo: {
    title: 'Seatlayout',
    titleTemplate: null,
  },
  data () {
    return {
      URL_BASE_IMG: URL_BASE + '/',
      step: 0,
      isOfferAppliedId: null,
      displayContent: false,
      FnbSelected: 'all',
      offerDetailsSection: [],
      normalOfferApplied: false,
      bankOfferApplied: false,
      normalOfferAppliedIndex: null,
      bankOfferAppliedIndex: null,
      cardInputErrorMsg: '',
      cardInputsuccessMsg: '',
      offerAppliedDetails: [],
      offerName: '',
      offerAppliedSuccessfully: false,
      promoAppliedSuccessfully: false,
      isRedeemSuccessfully: false,
      CheckLoyaltyIfNotLogin: '',
      appliedOfferType: null,
      otherOfferCards: false,
      isNewOfferClick: false,
      offerNotApplied: null,
      wc_seats: '',
      normal_seats: '',
      SeatLable: '',
      promoCodeValue: '',
      Discountmark: '',
      offerAmount: 0,
      redeemDiscount: 0,
      comboOfferAmount: 0,
      firstCardValue: '',
      lastCardValue: '',
      newfvvTest: '',
      FvvText: '',
      TotalfvvAmt: 0,
      discountedAmount: 0,
      IscomboOffer: null,
      offerData: [],
      preimere: false,
      BASEURL: URL_BASE,
      ConfirmationURL: '',
      FailedURL: '',
      userDetails: {},
      show: false,
      cinemaDetails: {},
      // Timer
      timerStartFunction: null,
      timer: {
        TimeoutModal: false,
        minutes: 9,
        seconds: 59,
        stop: false,
      },
      alpha: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L' ],
      seatLayout: [],
      seatTypes: [],
      countryData: {},
      sectionName: {
        selectNoOfSeats: true,
        seatLayout: true,
        foodAndBeverages: false,
        checkout: false,
        showFooter: true,
        offerSectionShow: false,
      },

      paymentModal: {
        editContactDetails: false,
        viewContactDetails: true,
        wallet: false,
      },
      numberOfSeatsSelected: 0,
      totalNumberOfSeats: 0,
      errorMessage: '',
      selectedSeats: [],
      selectedSeatsNew: '',

      discount: 0,
      movieDetails: {},
      foodAndBeverages: {
        listing: [],
        status: false,
        selected: [],
        allListing: [],
        selectedCategory: 'All',
      },
      //  selectedCategory: LanguageID == '1' && LanguageID == 1 ? 'الكل' : 'All',
      days: [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
      ],
      months: [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sept',
        'Oct',
        'Nov',
        'Dec',
      ],
      isofferTabDisplay: 0,
      isCancelledSuccessfully: false,
      FoodNAMessage: '',
      FoodNAStatus: true,
      fnbtotal: 0,

      amount: 0,
      total_internet_handling_amt: 0,
      internethandling: 0,
      total_ticket_fnb: 0,
      currency: '',
      ReserveID: '',
      bookingID: '',
      reserveID: '',
      cinemaID: '',
      LanguageID: '',
      CountryID: '',
      CinemaType: '',
      FnbUrl: '',
      maxNumberofSeats: 10,
      offerPopInfo: [],
      numberOfRowArr: 0,
      BankOffersList: [],
      offerFilterTabs: [{ Type: 'All', CouponID: 0 } ],
      Alloffers: [],
      VoucherAllData: [],
      newAllOffers: [],
      isOfferDetails: false,
      newOfferSelected: [],
      userAlredyLogin: true,
      otpVerifyLoyalty: '',
      otpVerifyLoyaltyError: '',
      CheckLoyaltyApplicable: [],
      PointsRedeem: '',
      showMobileEnable: true,
      showOTPLoality: false,
      loyalityPopUpMessage: '',
      successLoyality: '',
      otpVerifyMobile: '',
      showSuccessRedeemtion: false,

      // New Starts here
      fnbItemData: [],
      fnbItemDataTemp: [],
      userSelectedFnBItems: [],
      totalAmount: 0,
      scheduleData: {
        CinameName: '',
        MovieTitle: '',
        ScreenName: '',
        ShowDate: '',
        ShowTime: '',
        Location: '',
        Experience: '',
        Currency: '',
        SeatName: '',
        SchID: '',
      },
    }
  },

  computed: {
    PointsRedeemRound () {
      let round =
        this.PointsRedeem / this.CheckLoyaltyApplicable[0].conversionpointvalue
      return round
    },

    isMaximumPointRedeem () {
      let pointTotal =
        this.total_ticket_fnb *
        this.CheckLoyaltyApplicable[0].conversionpointvalue
      if (this.PointsRedeem > pointTotal) {
        return true
      } else {
        return false
      }
    },

    isMaximumCurrentPointRedeem () {
      console.log(
        'this.CheckLoyaltyApplicable[0].BalancePoint',
        this.CheckLoyaltyApplicable[0].BalancePoint
      )
      console.log('this.PointsRedeem', this.PointsRedeem)
      console.log(
        'this.CheckLoyaltyApplicable[0].BalancePoint < this.PointsRedeem',
        this.CheckLoyaltyApplicable[0].BalancePoint < this.PointsRedeem
      )
      if (this.CheckLoyaltyApplicable[0].BalancePoint < this.PointsRedeem) {
        return true
      } else {
        return false
      }
    },

    PointsRedeemRoundTotal () {
      let round = this.CheckLoyaltyApplicable[0].PointsRedeem
      return round
    },
    checKApplyDisable () {
      if (this.CheckLoyaltyApplicable.length > 0) {
        if (
          parseInt(this.PointsRedeem) >=
            parseInt(this.CheckLoyaltyApplicable[0].MinPoints) &&
          parseInt(this.PointsRedeem) <=
            parseInt(this.CheckLoyaltyApplicable[0].BalancePoint)
        ) {
          return false
        } else {
          return true
        }
      } else {
        return true
      }
    },
    offerTabDisable () {
      return this.promoAppliedSuccessfully && this.appliedOfferType == 3
    },

    voucherTabDisable () {
      return this.offerAppliedSuccessfully && this.appliedOfferType == 0
    },

    // loyaltyTabDisable() {
    //   return (
    //     (!this.promoAppliedSuccessfully || !this.offerAppliedSuccessfully) &&
    //     this.isRedeemSuccessfully
    //   );
    // },
    isCardNumCorrect () {
      if (
        String(this.firstCardValue).length == 6 &&
        String(this.lastCardValue).length == 4
      ) {
        return false
      } else {
        return true
      }
    },
  },
  destroyed () {
    clearInterval(this.timerStartFunction)
  },
  beforeMount () {
    if (
      window.localStorage.getItem('MIN') &&
      window.localStorage.getItem('SEC')
    ) {
      this.startTimer()
      this.ReserveID = this.$route.params.reserveId
      this.getReserveInfo()
    } else {
      this.$router.go(-1)
    }
  },
  mounted: function () {
    let token = TokenService.getToken()
    if (token) {
      this.userAlredyLogin = false
    } else {
      this.userAlredyLogin = true
    }
    EventBus.$on('getCheckLoyality', e => {
      this.getCheckLoyalityApplicable(this.reserveID, this.theatreID)
    })
    let language = LanguageService.getLanguage()
    let country = CountryService.getCountry()

    // countryid
    if (!country) {
      this.CountryID = 119
    } else {
      this.CountryID = country.CountryID
    }
    // languageid
    if (!language) {
      this.LanguageID = 2
    } else {
      this.LanguageID = language.lang_id
    }

    this.preimere = window.localStorage.getItem('PREIMERE')
    // premiere type
    if (this.preimere == true || this.preimere == 'true') {
      this.CinemaType = 'premiere'
    } else {
      this.CinemaType = 'normal'
    }
    EventBus.$on('paymentCompletionEvent', user => {
      this.paymentConfirmation()
    })
    EventBus.$on('checkOutEvent', userDetails => {
      this.checkout(userDetails)
    })
    window.addEventListener('message', function (e) {
      if (e.data === 'sb:bn:loaded') {
        EventBus.$emit('paymentCompletionEvent', e)
      }
    })
  },

  methods: {
    getTitleIndex (id) {
      this.FnbSelected = id
    },
    goBackExpired () {
      this.$router.push({
        path: '/seatLayout/' + this.scheduleData.SchID,
      })
    },
    handleReInit (e, s) {
      console.log('handleReInit', e, s)
      this.$refs.fnbSlider.forEach(item => {
        item.slick('unslick')
        item.slick(this.fnbSliderOptions())
      })
    },
    getReserveInfo (ReserveID, id) {
      this.hideLoading()
      let payload = {
        ReserveID: this.ReserveID,
        CategoryID: '1',
        TransactionType: 'Normal',
      }
      this.showLoading()
      makeRequest('/ReserveInfo', 'POST', null, payload)
        .then(result => {
          const { error, res } = result
          const { data } = res.data
          window.localStorage.setItem('MIN', '')
          window.localStorage.setItem('SEC', '')
          if (!error) {
            if (res.data) {
              if (res.data.hasOwnProperty('cinemaid') && res.data.cinemaid) {
                this.cinemaID = res.data.cinemaid
              }
              if (
                res.data.hasOwnProperty('seats') &&
                res.data.seats.length > 0
              ) {
                this.selectedSeatsNew = res.data.seats[0].cat_seats
                if (res.data.seats[0].normal_seats && res.data.seats[0].normal_seats.length > 0) {
                  this.normal_seats = res.data.seats[0].normal_seats.join(',')
                  this.SeatLable = res.data.seats[0].SeatLable
                }
                if (res.data.seats[0].normal_seats && res.data.seats[0].wc_seats.length > 0) {
                  this.wc_seats = res.data.seats[0].wc_seats.join(',')
                }
              }
              this.hideLoading()
              this.getFnbData()
            }
          } else {
            console.log('object')
          }
        })
        .catch(error => {
          this.hideLoading()

          console.log('error', error)
        })
    },
    fnbSliderOptions () {
      return {
        arrows: true,
        dots: false,
        infinite: true,
        slidesToScroll: 3,
        slidesToShow: 4,
        lazyLoad: 'ondemand',
        setPosition: 0,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 3,
            },
          },
          {
            breakpoint: 700,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 1,
              adaptiveHeight: true,
            },
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 1,
              adaptiveHeight: true,
              arrows: false,
            },
          },
        ],
      }
    },
    handleSetPosition (event, slick) {
      console.log(event, slick)
    },
    storeFnbItems (foodItem, type, index, lowerIndex) {
      if (type == 'add') {
        let selecteditem = this.fnbItemData[index].items.filter(x => {
          return x.Id == foodItem.Id
        })
        if (selecteditem.length > 0) {
          if (selecteditem[0].Qty < 10) {
            this.fnbItemData[index].items[lowerIndex].Qty += 1
            this.totalAmount = parseFloat(
              parseFloat(this.totalAmount) + parseFloat(selecteditem[0].Amount)
            ).toFixed(2)
          }
        }
      }

      if (type == 'sub') {
        let selecteditem = this.fnbItemData[index].items.filter(x => {
          return x.Id == foodItem.Id
        })
        if (selecteditem.length > 0 && selecteditem[0].Qty != 0) {
          this.fnbItemData[index].items[lowerIndex].Qty -= 1

          this.totalAmount = parseFloat(
            parseFloat(this.totalAmount) - parseFloat(selecteditem[0].Amount)
          ).toFixed(2)
          console.log(selecteditem, 'ki')
        }
      }

      this.userSelectedFnBItems = []
      // this.fnbQty = 0;
      this.fnbItemData.map(category => {
        if (category.items) {
          category.items.map(item => {
            if (item.Qty != 0) {
              let obj = {
                Id: item.Id,
                Qty: item.Qty,
                ItemName: item.ItemName,
              }
              this.userSelectedFnBItems.push(obj)
            }
          })
        }
      })
    },

    filterFnbItems (e) {
      this.showLoading()
      this.$refs.fnbSliderWrapper &&
        this.$refs.fnbSliderWrapper.map((item, index) => {
          const elementId = e.target.id
          const elementIdLastChar = elementId.slice(
            elementId.length - 1,
            elementId.length
          )
          if (elementIdLastChar != 0) {
            if (elementIdLastChar != index + 1) {
              item.style.display = 'none'
            } else {
              item.style.display = 'block'
            }
          } else {
            item.style.display = 'block'
          }
        })

      setTimeout(() => {
        this.hideLoading()
      }, 600)

      // if (selectedCat != "All") {
      //   let filteredFnbList = this.fnbItemDataTemp.filter(x => {
      //     return x.Id == data.Id;
      //   });

      //   if (filteredFnbList.length > 0) {
      //     this.fnbItemData = filteredFnbList;
      //   } else {
      //     this.fnbItemData = [];
      //   }
      // } else {
      //   this.fnbItemData = this.fnbItemDataTemp;
      // }
    },

    getFnbData () {
      this.showLoading()
      this.fnbItemData = []
      this.fnbItemDataTemp = []
      let payload = {
        ReserveID: this.ReserveID,
        CategoryID: '1',
        TransactionType: 'Normal',
        CinemaID: this.cinemaID,
      }

      makeRequest('/GetFNBDetails', 'POST', null, payload)
        .then(result => {
          const { error, res } = result
          const { data } = res.data
          this.hideLoading()
          if (!error) {
            console.log(res.data, 'jitu')
            if (
              res.data.hasOwnProperty('AllItems') &&
              res.data.AllItems.length > 0
            ) {
              this.fnbItemDataTemp = res.data.AllItems
              this.fnbItemData = res.data.AllItems
            }
            if (res.data.hasOwnProperty('scheduleData')) {
              console.log('fsdfsdf')
              Object.keys(this.scheduleData).map(x => {
                this.scheduleData[x] = res.data.scheduleData[x] || ''
              })

              if (res.data.scheduleData.Amount) {
                this.totalAmount = res.data.scheduleData.Amount.toFixed(2)
              }
            }
          }
        })
        .catch(error => {
          console.log('Error on vue front', error)
        })
    },
    skipFNB () {
      window.localStorage.setItem('MIN', this.timer.minutes)
      window.localStorage.setItem('SEC', this.timer.seconds)
      this.$router.push({
        path: '/ticket-confirmation/' + this.ReserveID,
      })
    },
    onSubmitfnbCheckOut: function () {
      this.showLoading()
      let payload = {
        CategoryID: '1',
        TransactionType: 'Normal',
        CinemaID: this.cinemaID,
        ReserveID: this.ReserveID,
        FNB: this.userSelectedFnBItems,
      }

      makeRequest('/ReserveFNBItems/', 'POST', null, payload)
        .then(result => {
          const { error, res } = result
          const { data } = res.data
          if (!error && res.data.Status) {
            console.log(res.data)
            this.hideLoading()
            if (res.data.hasOwnProperty('ReserveID') && res.data.ReserveID) {
              this.ReserveID = res.data.ReserveID
              window.localStorage.setItem('MIN', this.timer.minutes)
              window.localStorage.setItem('SEC', this.timer.seconds)
              this.$router.push({
                path: '/ticket-confirmation/' + res.data.ReserveID,
              })
            }

            // if (res.data.hasOwnProperty("ReserveID") && res.data.ReserveID) {
            //   this.ReserveID = res.data.ReserveID;
            //   this.$router.push({
            //     path: "/food-and-drinks/" + res.data.ReserveID
            //   });
            // } else {
            //   console.log("ReservId missing");
            // }
            // this.offerData = res.data;
            // this.theatreID = res.data.Cinema.CinemaID;

            // this.getCheckLoyalityApplicable(
            //   this.reserveID,
            //   res.data.Cinema.CinemaID
            // );
            // console.log("res.dataPratik", res.data);
          } else {
            // show error modal
            this.$root.$emit('bv::show::modal', 'errorModal')
          }
          this.hideLoading()
        })
        .catch(error => {
          this.hideLoading()
          console.log('Error on vue front', error)
        })
    },
    // old Flow
    userLogin () {
      EventBus.$emit('isUserNotLogin')
    },
    showContent () {
      this.displayContent = !this.displayContent
    },
    // loyalty
    onOTPValue: ({ ...payload }) => {
      // console.log("payload..pratz-1 :>> ", payload);
      // console.log("payload..pratz-2 :>> ", payload.value);
      // this.NewOTP = payload.value;
      // console.log("payload..pratz-3 :>> ", this.NewOTP);
    },
    resetVerifyUserErrors (event) {},
    successClosed () {
      this.$refs.successPopup.hide()
      this.$refs.loyalityPopup.hide()
      this.showSuccessRedeemtion = false
    },
    cancelReedemtion (id) {
      if (id == '1') {
        let payload = {
          ReserveID: this.reserveID,
          TransactionType: 'Normal',
          LanguageID: this.LanguageID,
          CountryID: this.CountryID,
          TheatreId: this.theatreID,
          OTP: '',
          PointsRedeemcancel: this.CheckLoyaltyApplicable[0].PointsRedeem,
          // CinemaType: "normal",
        }
        makeRequest('/Loyaltycancelrdeempoint/', 'POST', null, payload)
          .then(result => {
            this.hideLoading()
            const { error, res } = result
            const { data } = res
            // console.log(res)
            this.showSuccessRedeemtion = false
            if (!error && res.data.Status) {
              this.loyalityPopUpMessage =
                res.data.Message == ''
                  ? 'Your redeemtion is canceled.'
                  : res.data.Message
              this.$refs.loyalityPopup.show()
              if (id == 1 || id == '1') {
                this.isRedeemSuccessfully = false
              }
              this.isCancelledSuccessfully = false
              this.PointsRedeem = ''
              this.$root.$emit('bv::toggle::collapse', 'accordion-1')
              this.CheckLoyaltyApplicable[0].afterSuccess = false
              this.ReserveDetails()
              // this.voucherTabDisable = false;
              // this.offerTabDisable = false;
            } else {
              // this.successLoyality=true;
              this.loyalityPopUpMessage = res.data.Message
              this.$refs.loyalityPopup.show()
              //  this.PointsRedeem="";
              //   this.$root.$emit('bv::toggle::collapse', 'accordion-1');
              //   this.CheckLoyaltyApplicable[0].afterSuccess=false;
            }
          })
          .catch(error => {
            this.hideLoading()
            console.log('Error on vue front', error)
          })
      } else {
        this.showSuccessRedeemtion = true
        this.loyalityPopUpMessage = 'Do you want to cancel redeemtion?'
        this.$refs.loyalityPopup.show()
      }
    },
    verifyLoyalityMob (id) {
      let payload = {
        ...this.CheckLoyaltyApplicable[0].userdetail[0],
        ReserveID: this.reserveID,
        TransactionType: 'Normal',
        LanguageID: this.LanguageID,
        CountryID: this.CountryID,
        TheatreId: this.theatreID,
        OTP: this.otpVerifyMobile,
        CinemaType: 'normal',
      }
      if (id == 'NewUser') {
        payload['Action'] = id
      } else if (id == 'ResendOtp') {
        payload['Action'] = id
        payload['OTP'] = ''
      } else if (id == 'vallidate') {
        payload['Action'] = id
        payload['OTP'] = ''
      }

      makeRequest('/LoyaltyCustomer/', 'POST', null, payload)
        .then(result => {
          this.hideLoading()
          const { error, res } = result
          const { data } = res
          // console.log(res)
          if (!error && res.data.Status) {
            if (id == 'NewUser') {
              this.successLoyality = true
              this.$refs.loyalityPopup.show()
            } else if (id == 'ResendOtp') {
              this.loyalityPopUpMessage =
                res.data.vallidateuserdata[0].ErrMessage
              this.$refs.loyalityPopup.show()
            } else if (id == 'vallidate') {
              this.showOTPLoality = true
              this.loyalityPopUpMessage =
                res.data.vallidateuserdata[0].ErrMessage
              this.$refs.loyalityPopup.show()
            }
          } else {
            // this.successLoyality=true;
            this.loyalityPopUpMessage = res.data.Message
            this.$refs.loyalityPopup.show()
          }
        })
        .catch(error => {
          this.hideLoading()
          console.log('Error on vue front', error)
        })
    },
    otpApplyvalidate (id) {
      this.otpVerifyLoyaltyError = ''
      let payload = {
        ReserveID: this.reserveID,
        TransactionType: 'Normal',
        LanguageID: this.LanguageID,
        CountryID: this.CountryID,
        TheatreId: this.theatreID,
        Action: id,
        PointsRedeem: this.PointsRedeem,
        OTP: this.otpVerifyLoyalty,
      }
      makeRequest('/RedeemPoint/', 'POST', null, payload)
        .then(result => {
          this.hideLoading()
          const { error, res } = result
          const { data } = res
          // console.log(res)
          if (!error && res.data.Status) {
            if (id == 'redeem') {
              this.$refs.redeemOTP.hide()
              this.CheckLoyaltyApplicable[0]['afterSuccess'] = true
              this.CheckLoyaltyApplicable[0]['SARFinal'] = res.data.PointsValue
              this.CheckLoyaltyApplicable[0]['PointsRedeem'] =
                res.data.PointsRedeem
              // this.offerAppliedSuccessfully = false;
              // this.promoAppliedSuccessfully = false;

              this.isCancelledSuccessfully = true
              this.ReserveDetails()
              // Success Pop up
              this.$refs.successPopup.show()
              // this.voucherTabDisable = false;
              // this.offerTabDisable = false;
              this.isRedeemSuccessfully = true
              console.log(
                'this.isRedeemSuccessfullythis.isRedeemSuccessfully',
                this.isRedeemSuccessfully
              )
            } else {
              this.otpVerifyLoyaltyError =
                res.data.Message == ''
                  ? 'OTP sent to your mobile'
                  : res.data.Message

              // this.offerAppliedSuccessfully = true;
              // this.promoAppliedSuccessfully = true;
              // this.$refs.loyalityPopup.show();
            }

            // console.log(res.data);
          } else {
            if (id == 'redeem') {
              // this.isRedeemSuccessfully = false;
              this.otpVerifyLoyaltyError = res.data.Message
              //   this.$refs.redeemOTP.hide();
              // this.CheckLoyaltyApplicable[0]["afterSuccess"]=true;
              // this.CheckLoyaltyApplicable[0]["SARFinal"]=50;
              // this.CheckLoyaltyApplicable[0]["PointsRedeem"]=50;
              // this.ReserveDetails();
              //  this.$refs.successPopup.show();
            } else {
              this.otpVerifyLoyaltyError = res.data.Message
              // this.$refs.loyalityPopup.show();
            }
          }
          // this.isRedeemSuccessfully = false;
        })
        .catch(error => {
          this.hideLoading()
          this.isRedeemSuccessfully = false
          console.log('Error on vue front', error)
        })
    },
    showApplyvalidate () {
      let payload = {
        ReserveID: this.reserveID,
        TransactionType: 'Normal',
        LanguageID: this.LanguageID,
        CountryID: this.CountryID,
        TheatreId: this.theatreID,
        Action: 'vallidate',
        PointsRedeem: this.PointsRedeem,
      }
      makeRequest('/RedeemPoint/', 'POST', null, payload)
        .then(result => {
          this.hideLoading()
          const { error, res } = result
          const { data } = res
          // console.log(res)
          if (!error && res.data.Status) {
            this.$refs.redeemOTP.show()
            // this.isRedeemSuccessfully = true;

            // res.data["afterSuccess"]=false
            // if(res.data.hasOwnProperty("isapplicableloyalty")){
            // this.CheckLoyaltyApplicable.push(res.data);
            //  }
            // console.log(res.data);
          } else {
            // show error modal
            // this.isRedeemSuccessfully = true;
            //  this.offerAppliedSuccessfully = true;
            //   this.promoAppliedSuccessfully = true;
            this.$root.$emit('bv::show::modal', 'errorModal')
          }
        })
        .catch(error => {
          this.hideLoading()
          console.log('Error on vue front', error)
        })

      // this.$refs.redeemOTP.show();
    },

    getCheckLoyalityApplicable (reserveid, CinemaId) {
      // this.showLoading();
      // let newTheatreId = this.fromQrCode ? this.newCinemaIdValue :  CinemaId;
      let payload = {
        ReserveID: reserveid,
        TransactionType: 'Normal',
        LanguageID: this.LanguageID,
        CountryID: this.CountryID,
        TheatreId: CinemaId,
      }
      makeRequest('/CheckLoyaltyApplicable/', 'POST', null, payload)
        .then(result => {
          const { error, res } = result
          const { data } = res
          // console.log(res)
          if (!error && res.data.Status) {
            res.data['afterSuccess'] = false
            res.data['SARFinal'] = 0
            res.data['PointsRedeem'] = 0
            if (res.data.hasOwnProperty('isapplicableloyalty')) {
              this.CheckLoyaltyApplicable.push(res.data)
            }

            this.CheckLoyaltyIfNotLogin = res.data.Message
          } else {
            // show error modal
            this.$root.$emit('bv::show::modal', 'errorModal')
          }
          // this.hideLoading();
          let token = TokenService.getToken()
          if (token) {
            this.userAlredyLogin = false
          } else {
            this.userAlredyLogin = true
          }
        })
        .catch(error => {
          // this.hideLoading();
          console.log('Error on vue front', error)
        })
    },
    // loyalty
    onClickRetry: function () {
      this.$refs.FoodNA.hide()
      this.FoodNAStatus = true
    },
    onClickProceed: function () {
      this.$refs.FoodNA.hide()
      this.ReserveDetails()
    },
    changeNumberFormat (number) {
      return String(number).replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    },
    onClickNo: function () {
      this.$refs.quitBooking.hide()
    },
    FromSubmit: function () {
      console.log('FromSubmit FromSubmit')
    },
    checkoutPopUp: function () {
      this.checkSignIn()
    },
    goBack () {
      this.$refs['quitBooking'].show()
    },

    goBackHistory () {
      // this.showLoading();
      // let payload = {
      //   CategoryID: "1",
      //   ReserveID: this.ReserveID
      // };
      // makeRequest("/ReleaseReserveSeat/", "POST", null, payload)
      //   .then(result => {
      //     const { error, res } = result;
      //     const { data } = res.data;
      //     if (!error && res.data.Status) {
      //       console.log(res.data);
      //       window.localStorage.setItem("RID", "");
      //       this.$router.push({
      //         path: "/seatLayout/" + this.scheduleData.SchID
      //       });
      //       // console.log("res.dataPratik", res.data);
      //     } else {
      //       //show error modal
      //       // this.$root.$emit("bv::show::modal", "errorModal");
      //     }
      //     this.hideLoading();
      //   })
      //   .catch(error => {
      //     this.hideLoading();
      //     console.log("Error on vue front", error);
      //   });

      // this.$router.go(-1);
    },
    checkSignIn: function () {
      EventBus.$emit('getUserDetailsAndCheckout')
    },
    checkout: function (userDetails) {
      // Call payment function
      this.userDetails = userDetails
      // this.updateBookUser();
      this.$forceUpdate()
      this.$nextTick(() => {
        this.updateBookUser()
      })
      // this.processPayment();
    },
    bookingRequestConfirmSeats: function () {
      this.showLoading()
      let payload = {
        SchID: this.scheduleID,
        SelectedSeats: this.selectedSeats,
      }
      makeRequest('/BookingReserve/', 'POST', null, payload)
        .then(result => {
          const { error, res } = result
          const { data } = res.data
          if (!error && res.data.Status) {
            this.reserveID = res.data.ReserveID
            this.offerData = res.data
            this.theatreID = res.data.Cinema.CinemaID

            this.getCheckLoyalityApplicable(
              this.reserveID,
              res.data.Cinema.CinemaID
            )
            // console.log("res.dataPratik", res.data);
          } else {
            // show error modal
            this.$root.$emit('bv::show::modal', 'errorModal')
          }
          this.hideLoading()
        })
        .catch(error => {
          this.hideLoading()
          console.log('Error on vue front', error)
        })
    },
    //* ******************** CHECKOUT OFFER SECTION START *************************

    checkCardNumber: function (val, vname) {
      let name = String(this[vname])
      if (name.length >= 1) {
        this.cardInputErrorMsg = ''
        if (name.length >= val) {
          this[vname] = parseInt(name.substring(0, val))
          this.cardInputErrorMsg = ''
        } else {
          this.cardInputErrorMsg =
            'Please enter first ' + val + ' digits of card'
        }
      } else {
        this.cardInputErrorMsg = 'You must complete both fields'
      }
    },
    offerApply (offerData, offerID, type) {
      this.isOfferAppliedId = offerID
      this.offerName = offerData
      this.appliedOfferType = type
      console.log(
        'this.appliedOfferType)))this.appliedOfferType',
        this.appliedOfferType
      )
      console.log('offerID, type', offerID, type)
      this.showLoading()
      this.cardInputErrorMsg = ''
      let payload = {}
      if (type == 1) {
        payload = {
          PromotionName: offerData,
          ReserveID: this.reserveID,
          PromotionID: offerID,
          isPromoCode: 0,
          CardNumber: String(this.firstCardValue).concat(
            String(this.lastCardValue)
          ),
        }
      } else if (type == 0) {
        payload = {
          PromotionName: offerData,
          ReserveID: this.reserveID,
          PromotionID: offerID,
          isPromoCode: 0,
          // promoCode: this.promoCodeValue || ""
        }
      } else if (type == 3) {
        payload = {
          ReserveID: this.reserveID,
          isPromoCode: 1,
          promoCode: this.promoCodeValue || '',
        }
      }

      makeRequest('/Applyoffer', 'POST', null, payload)
        .then(result => {
          const { error, res } = result
          const { data } = res.data
          console.log('res.data', res.data)
          if (res.data && res.data.Status) {
            this.offerAppliedDetails = res.data
            this.offerAmount = parseFloat(res.data.DiscountValue).toFixed(2)
            if (this.offerAppliedDetails.Promotionapplied == 'Yes') {
              this.offerAppliedSuccessfully = true
              this.promoAppliedSuccessfully = true
              this.otherOfferCards = true
            }
            this.cardInputsuccessMsg = res.data.Message
            this.ReserveDetails()
          } else {
            this.offerNotApplied = true
            this.cardInputErrorMsg = res.data.Message
          }

          this.isNewOfferClick = false
          this.hideLoading()
        })
        .catch(error => {
          this.hideLoading()
          // this.cardInputErrorMsg = res.error.Message
          console.log('error', error)
        })
    },

    // OFFER PAGE OFFER REMOVE MODAL
    showOfferPageRemoveModal: function () {
      this.$root.$emit('bv::show::modal', 'offerPageRemoved')
    },

    // CHECKOUT OFFER REMOVE MODAL
    showOfferRemoveModal: function () {
      this.$root.$emit('bv::show::modal', 'offerRemoved')
    },

    closeOfferRemoveModal: function () {
      this.$root.$emit('bv::hide::modal', 'offerRemoved')
      this.$root.$emit('bv::hide::modal', 'offerPageRemoved')
    },

    removeAppliedOffer: function (type) {
      console.log('id12', this.isOfferAppliedId)
      console.log('id22', this.reserveID)
      this.showLoading()

      this.$root.$emit('bv::hide::modal', 'offerRemoved')
      this.$root.$emit('bv::hide::modal', 'offerPageRemoved')

      let payload = {
        ReserveID: this.reserveID,
        PromotionID: this.isOfferAppliedId,
      }

      makeRequest('/Canceloffer', 'POST', null, payload)
        .then(result => {
          const { error, res } = result
          const { data } = res.data
          console.log('res.data', res.data)
          if (!error && res.data.Status) {
            this.offerAmount = 0
            if (type == 'check') {
              this.offerAppliedSuccessfully = false
              this.otherOfferCards = false
              this.isNewOfferClick = true
            } else if (type == 'offer') {
              this.offerAppliedSuccessfully = false
              this.otherOfferCards = false
            }
            this.ReserveDetails()
          } else {
          }
          this.hideLoading()
        })
        .catch(error => {
          this.hideLoading()
          console.log('error', error)
        })
    },

    applyNewOffer: function () {
      // this.sectionName.offerSectionShow = true;
      // this.sectionName.checkout = false;
      this.sectionName.foodAndBeverages = false
      this.ReserveDetails()
    },

    getAllOffers (cinemaId, reserveId) {
      this.showLoading()
      console.log('cinemaId, reserveId', cinemaId, reserveId)
      let payload = {
        CinemaID: cinemaId,
        ReserveID: reserveId,
      }
      makeRequest('/Offerlist', 'POST', null, payload)
        .then(result => {
          const { error, res } = result
          const { data } = res.data
          console.log('res.data', res.data)
          if (!error && res.data.Status) {
            this.newAllOffers = res.data
            if (res.data.VoucherData[0]) {
              this.VoucherAllData = res.data.VoucherData[0]
            }
            this.Alloffers = res.data.Offer
            // let array = ["All"];
            // this.offerFilterTabs = [...array, ...res.data.OfferType];
            res.data.OfferType.map(x => {
              this.offerFilterTabs.push(x)
            })
            // this.handleResize();
          } else {
            console.log('error')
          }
          this.hideLoading()
        })
        .catch(error => {
          this.hideLoading()

          console.log('error', error)
        })
    },
    getFilterOffers (typeID, index) {
      this.step = index
      // this.normalOfferAppliedIndex = -1;
      this.cardInputErrorMsg = ''
      this.cardInputErrorMsg = ''
      // this.offerDetailsBox = true;
      this.Alloffers = []
      this.newAllOffers.Offer.map(x => {
        if (typeID == x.CouponID) {
          this.Alloffers.push(x)
        } else if (typeID == 0 || typeID == '0') {
          this.Alloffers.push(x)
        }
      })
      // this.handleResize();
    },
    showOfferDetails (value, index) {
      this.cardInputErrorMsg = ''
      this.cardInputErrorMsg = ''
      this.offerDetailsSection = []
      if (value.IsBin == 1) {
        this.isOfferDetails = true
        this.offerDetailsSection = value
        this.bankOfferApplied = true
        this.bankOfferAppliedIndex = index
      } else if (value.IsBin == 0) {
        this.normalOfferApplied = true
        this.normalOfferAppliedIndex = index
        this.offerApply(value.Name, value.ID, value.IsBin)
      }
    },

    closeOfferDetails () {
      this.cardInputErrorMsg = ''
      this.firstCardValue = ''
      this.lastCardValue = ''
      this.isOfferDetails = false
    },
    //* ******************** CHECKOUT OFFER SECTION END *************************

    ReserveDetailsFnb: function () {
      let payload = {
        ReserveID: this.reserveID,
        TransactionType: 'Normal',
      }

      makeRequest('/ReserveDetails', 'POST', null, payload)
        .then(result => {
          const { error, res } = result
          const { data } = res.data
          if (!error && res.data.Status) {
            console.log('res.data&&&', res.data)
            this.sectionName.foodAndBeverages = false
            this.fnbtotal = res.data.fnbamount
            this.internethandling =
              res.data.total_internet_handling_amt + res.data.fnbvat
            this.total_ticket_fnb = res.data.total_ticket_fnb
            this.amount = res.data.amount
            this.total_internet_handling_amt =
              res.data.total_internet_handling_amt
            this.fnbQty = 0
            this.totalSeats = res.data.totalseatcount
            this.IscomboOffer = res.data.iscombooffer
            this.TotalfvvAmt = res.data.totalfvvamt
            this.FvvText = res.data.Fvvtext
            this.discountedAmount = res.data.Discount
            // this.totalAmount = res.data.total_amt;

            // reserve
            res.data.f_and_b.map(fb => {
              this.fnbQty = parseInt(this.fnbQty) + parseInt(fb.qty)
            })
            this.getCountryCode()
          } else {
            this.$root.$emit('bv::show::modal', 'errorModal')
            // show error modal
          }
        })
        .catch(error => {
          console.log('Error on vue front', error)
        })
    },
    ReserveDetails: function () {
      this.sectionName.offerSectionShow = false
      let payload = {
        ReserveID: this.reserveID,
        TransactionType: 'Normal',
      }
      makeRequest('/ReserveDetails', 'POST', null, payload)
        .then(result => {
          const { error, res } = result
          const { data } = res.data
          if (!error && res.data.Status) {
            this.sectionName.checkout = true
            this.sectionName.foodAndBeverages = false
            this.fnbtotal = res.data.fnbamount
            this.internethandling =
              res.data.total_internet_handling_amt + res.data.fnbvat
            this.total_ticket_fnb = res.data.total_ticket_fnb
            this.amount = res.data.amount
            this.total_internet_handling_amt =
              res.data.total_internet_handling_amt
            this.fnbQty = 0
            this.totalSeats = res.data.totalseatcount
            this.IscomboOffer = res.data.iscombooffer
            this.TotalfvvAmt = res.data.totalfvvamt
            this.FvvText = res.data.Fvvtext
            this.discountedAmount = res.data.Discount
            this.Discountmark = res.data.DiscountRemark
            this.isofferTabDisplay = res.data.isofferpagedisplay
            this.comboOfferAmount = res.data.OfferAmount
            this.redeemDiscount = res.data.Discount
            // this.totalAmount = res.data.total_amt;

            // reserve
            res.data.f_and_b.map(fb => {
              this.fnbQty = parseInt(this.fnbQty) + parseInt(fb.qty)
            })
            this.getCountryCode()
          } else {
            this.$root.$emit('bv::show::modal', 'errorModal')
            // show error modal
          }
        })
        .catch(error => {
          console.log('Error on vue front', error)
        })
    },
    getCountryCode: function () {
      let self = this
      //
      axios
        .get('https://ipapi.co/json')
        .then(function (response) {
          // handle success
          self.countryData = response.data
          console.log(response)
        })
        .catch(function (error) {
          // handle error
          console.log(error)
        })
    },
    updateBookUser: function () {
      let payload = {
        ReserveID: this.reserveID,
        Email: this.userDetails.email,
        Mobile: this.userDetails.phoneNumber,
        CountryCode: this.userDetails.countryCode,
      }
      makeRequest('/UpdateBookUser', 'POST', null, payload)
        .then(result => {
          const { error, res } = result
          const { data } = res.data
          if (res.data.Status) {
            this.$nextTick(() => {
              // this.sessionStore.set("EMRID", this.reserveID);
              this.$refs.submitForm.submit()
            })

            // setTimeout(() => {
            //     this.$refs.submitForm.submit();
            //   }, 500);
          } else {
            this.$root.$emit('bv::show::modal', 'checkoutModal')
            this.userDetails.errorMessage = res.data.Message
            console.log('Error Rrom Res', res.data.message)
          }
        })
        .catch(error => {
          this.$root.$emit('bv::show::modal', 'checkoutModal')
          this.userDetails.errorMessage = 'Something went wrong!'
          console.log('Error on vue front', error)
        })

      // let payload = {
      //   ReserveID: this.reserveID,
      //   PaymentID: 2,
      //   ApiCallURL: URL_BASE,
      //   SucessUrl: `${window.location.origin}/confirmation`,
      //   FailUrl: `${window.location.origin}/failedPayment`,
      //   email: this.userDetails.email,
      //   mobile: this.userDetails.phoneNumber,
      //   countrycode: 91
      // };
      // makeRequest("/RedirectPayment", "POST", null, payload)
      //   .then(result => {
      //     const { error, res } = result;
      //     const { data } = res.data;
      //     if (!error) {
      //       window.location.href = "http://google.com";

      //       console.log("Here result >>>", res);
      //       // this.getPaymentOptions();
      //       // this.processPayment();
      //     } else {
      //       console.log("Error Rrom Res", res.message);
      //     }
      //   })
      //   .catch(error => {
      //     console.log("Error on vue front", error);
      //   });
    },
    // updateBookUser: function() {
    // let payload = {
    //   ReserveID: this.reserveID,
    //   Email: this.userDetails.email,
    //   Mobile: this.userDetails.phoneNumber,
    //   CountryCode: 91
    // };
    // makeRequest("/UpdateBookUser", "POST", null, payload)
    //   .then(result => {
    //     const { error, res } = result;
    //     const { data } = res.data;
    //     if (!error) {
    //       // this.getPaymentOptions();
    //       this.processPayment();
    //     } else {
    //       console.log("Error Rrom Res", res.message);
    //     }
    //   })
    //   .catch(error => {
    //     console.log("Error on vue front", error);
    //   });
    // },
    processPayment: function () {
      let payload = {
        ReserveID: this.reserveID,
        PaymentID: 2,
        ApiCallURL: URL_BASE,
        SucessUrl: `${window.location.origin}/confirmation`,
        FailUrl: `${window.location.origin}/failedPayment`,
        // cardtransID: "9867855964"
      }
      makeRequest('/ProcessPayment', 'POST', null, payload)
        .then(result => {
          const { error, res } = result
          const { data } = res.data
          if (!error && data.Status) {
            console.log('processpayment', res.data)
          }
        })
        .catch(error => {
          console.log('Error on vue front', error)
        })
    },
    newConfirmBooking: function () {
      let payload = {
        ReserveID: this.reserveID,
        PaymentID: 2,
        cardtranID: '9867855964',
        PaymentToken: 0,
      }
      if (!this.bookingID) {
        makeRequest('/ConfirmBooking', 'POST', null, payload)
          .then(result => {
            const { error, res } = result
            const { data } = res.data
            if (!error) {
              console.log('confirmbooking', res.data)
              this.bookingID = res.data.BookingID
              this.finalConfirmation()
              // this.getBookingDetails();
            }
          })
          .catch(error => {
            console.log('Error on vue front', error)
          })
      }
    },
    // getBookingDetails: function() {
    //   let payload = {
    //     BookingID: this.bookingID
    //   };
    //   makeRequest("/GetBookingDetails", "POST", null, payload)
    //     .then(result => {
    //       const { error, res } = result;
    //       const { data } = res.data;
    //       if (!error) {
    //         this.bookingDetails = res.data;
    //       }
    //     })
    //     .catch(error => {
    //       console.log("Error on vue front", error);
    //     });
    // },
    getReservationDetails: function () {
      let payload = {
        ReserveID: this.reserveID,
      }
      makeRequest('/ReserveDetails/', 'POST', null, payload)
        .then(result => {
          const { error, res } = result
          const { data } = res.data
          if (!error) {
            this.reserveID = res.data.ReserveID
            this.getPaymentOptions()
          }
        })
        .catch(error => {
          console.log('Error on vue front', error)
        })
    },
    getPaymentOptions: function () {
      let payload = {
        ReserveID: this.reserveID,
      }
      makeRequest('/GetPaymentOptions/', 'POST', null, payload)
        .then(result => {
          const { error, res } = result
          if (!error && res.status) {
            //   console.log(" pay Options res ", res);
            this.newConfirmBooking()
            console.log(' pay Options Data ', res.data)
            // res.data.Paymentoptions.forEach(singlePaymentOption => {
            //   if (singlePaymentOption.PaymentID == 3) {
            //     singlePaymentOption.Cards = singlePaymentOption.Cards.forEach(
            //       x => {
            //         console.log("singleCard", x);
            //         x["CVV"] = "";
            //         console.log("singleCard", x);
            //         this.savedCreditCards.push(x);
            //       }
            //     );
            //     //   this.savedCreditCards = singlePaymentOption.Cards;
            //     // console.log('test1', this.savedCreditCards,singlePaymentOption.Cards )
            //   }
            // });
            //   this.savedCreditCards = res.data.Paymentoptions[1];
            //  this.paymentOptions = data.paymentOptions.Paymentoptions;
          } else {
            console.log('error from res', res.message)
          }
        })
        .catch(error => {
          console.log('Error on vue front', error)
        })
    },
    editNumberOfSeats: function (number) {
      this.totalNumberOfSeats = number
      this.sectionName.seatLayout = true
      // deselect all
      this.selectedSeats.map(x => {
        this.seatLayout[x.rowIndex][x.seatIndex].SelectStatus = false
        this.seatLayout[x.rowIndex][x.seatIndex].SelectStatusFlag = false
      })
      this.selectedSeats = []
    },
    onSelectCategory: function (value) {
      this.foodAndBeverages.selectedCategory = value
    },
    onSelectFoodItem (foodItem, type, index) {
      if (type == 'add') {
        if (
          this.foodAndBeverages.listing[foodItem.Category.Title][index].Qty < 10
        ) {
          this.foodAndBeverages.listing[foodItem.Category.Title][
            index
          ].Qty += 1

          this.totalAmount = parseFloat(
            parseFloat(this.totalAmount) + parseFloat(foodItem.Amount)
          ).toFixed(2)
        }
      }
      if (
        type == 'subtract' &&
        this.foodAndBeverages.listing[foodItem.Category.Title][index].Qty != 0
      ) {
        this.foodAndBeverages.listing[foodItem.Category.Title][index].Qty -= 1

        this.totalAmount = parseFloat(
          parseFloat(this.totalAmount) - parseFloat(foodItem.Amount)
        ).toFixed(2)
      }

      this.foodAndBeverages.selected = []
      this.fnbQty = 0
      Object.keys(this.foodAndBeverages.listing).map(category => {
        this.foodAndBeverages.listing[category].map(item => {
          if (item.Qty != 0) {
            this.foodAndBeverages.selected.push(item)
          }
        })
      })
      this.foodAndBeverages.selected.map(fb => {
        this.fnbQty = parseInt(this.fnbQty) + parseInt(fb.Qty)
      })
    },
    fetchMovieDetails () {
      let token = null
      let payload = {
        MovieID: this.$route.params.movieID || 32,
      }
      // if (this.$persistStore.get("accessToken")) {
      //   token = this.$persistStore.get("accessToken");
      //   payload["access_token"] = token;
      // }
      makeRequest('/GetShowDetails/', 'POST', null, payload)
        .then(response => {
          const { error, res } = response
          if (!error && res.data) {
            if (!error) {
              this.movieDetails = res.data.Show[0]
              // this.movieDetails.IMDBRating = Math.round(
              //   parseFloat(this.movieDetails.IMDBRating)
              // );
              // if (this.movieDetails.Trailers && this.movieDetails.Trailers[0]) {
              //   this.youtube =
              //     "https://www.youtube.com/embed/" +
              //     this.movieDetails.Trailers[0].URI;
              // }
              // this.userRatingDetails.user = this.movieDetails.YourRating;
              // console.log("y", this.youtube);
            }
          } else {
            console.log('Response Error ')
          }
        })
        .catch(error => {
          console.log('Error', error)
        })
    },
    // getSeatLayoutOld: function() {
    //   let payload = {
    //     SchID: 11,
    //     RequiredSeats: 1
    //   };

    //   makeRequest("/SNGetSeatLayout", "POST", null, payload)
    //     .then(result => {
    //       const { error, res } = result;
    //       //   const { data } = res.data;
    //       console.log("booking seat data", res.data);
    //       if (!error) {
    //         // this.seatLayout = res.data.SeatLayouts;
    //         this.cinemaDetails = res.data.Cinema;
    //         // let d = new Date(0); // The 0 there is the key, which sets the date to the epoch
    //         // d.setUTCSeconds(this.cinemaDetails.Time);
    //         // this.showDetails.month = d;

    //         if (res.data.FNB) {
    //           this.foodAndBeverages.status = true;
    //           this.getFoodAndBeverages();
    //         }
    //         // if (this.getSeatLayout == "1") {
    //         this.seatLayout = res.data.SeatLayouts;
    //         this.seatLayout.map(seatRow => {
    //           seatRow.map(seat => {
    //             seat.SelectStatusFlag = false;
    //             seat.SelectStatus = false;
    //           });
    //         });
    //         this.SeatTypes = res.data.SeatTypes;
    //         // } else {
    //         //   this.selectedSeats = res.data.BookSeatsID;
    //         //   this.sectionName.noOfSeats = false;
    //         //   this.sectionName.checkout = true;
    //         // }
    //       } else {
    //         console.log("error from res", res.message);
    //       }
    //     })
    //     .catch(error => {
    //       console.log("Error on vue front", error);
    //     });
    // },
    getFoodAndBeverages: function () {
      // let payload = {
      //   // SchID: this.scheduleID,
      //   CinemaID: 6,
      //   ShowDate: "2019-04-02",
      //   ShowTime: '14:00',
      //   TransactionType: 'OnlyFB'
      // };
      let payload = {
        SchID: this.scheduleID,
        // CountryID: 230,
        // LanguageID: 2,
        // CinemaID: 6,
        // ShowDate: "2019-04-03",
        // ShowTime: "22:00",
        TransactionType: 'Normal',
      }

      console.log('country =', this.CountryID)

      //  if(this.CountryID==230){
      //       this.FnbUrl = "https://empireksaapi.binarynumbers.io/GetFnBItems";
      //  }else{
      //       this.FnbUrl = "https://empireapi.binarynumbers.io/GetFnBItems";
      //  }

      makeRequest('/GetFnBItems', 'POST', null, payload)
        // makeRequest(
        //   "https://empireapi.binarynumbers.io/GetFnBItems",
        //   "POST",
        //   null,
        //   payload
        // )
        .then(result => {
          const { error, res } = result
          const { data } = res.data
          if (!error) {
            this.foodAndBeverages.listing = res.data.List
            this.foodAndBeverages.allListing = res.data.List
            this.foodAndBeverages.listing = groupBy(
              this.foodAndBeverages.listing,
              'Category.Title'
            )
            // this.foodAndBeverages.listing = Object.keys(this.foodAndBeverages.listing).map(function(key) {
            //   return [Number(key), this.foodAndBeverages.listing[key]];
            // });

            // this.foodAndBeverages.listing = Object.assign(All, this.foodAndBeverages.listing);
            // this.object
          }
        })
        .catch(error => {
          console.log('Error on vue front', error)
        })
    },
    bookFoodAndBeverages: function () {
      if (this.foodAndBeverages.selected.length > 0) {
        this.showLoading()
        let payload = {
          ReserveID: this.reserveID,
          FNB: this.foodAndBeverages.selected,
          TransactionType: 'Normal',
          CinemaID: this.cinemaDetails.CinemaID,
        }
        makeRequest('/BookingFNBItem', 'POST', null, payload)
          .then(result => {
            const { error, res } = result
            const { data } = res.data
            this.hideLoading()
            if (!error && res.data.Status) {
              this.FoodNAStatus = true
              this.sectionName.foodAndBeverages = false
              this.sectionName.offerSectionShow = true
              this.getAllOffers(this.cinemaDetails.CinemaID, this.reserveID)
              this.ReserveDetails()
            } else {
              this.FoodNAStatus = false
              this.FoodNAMessage = res.data.Message
              this.$refs.FoodNA.show()
            }
          })
          .catch(error => {
            console.log('Error on vue front', error)
          })
      } else {
        this.getAllOffers(this.cinemaDetails.CinemaID, this.reserveID)
        this.sectionName.foodAndBeverages = false
        this.FoodNAStatus = false
        this.sectionName.offerSectionShow = true

        // offer Methods
        this.ReserveDetails()
      }
    },

    onClickOk: function () {
      this.$router.go(-1)
      this.$refs.seatFullModal.hide()
    },

    onClickModalOk: function () {
      this.$refs.warningModal.hide()
      this.$refs.warningModalNew.hide()
    },
    getSeatLayoutNew: function () {
      this.showLoading()
      let payload = {
        SchID: this.scheduleID,
        RequiredSeats: 1,
      }

      makeRequest('/SNGetSeatLayout', 'POST', null, payload)
        .then(result => {
          const { error, res } = result
          //   const { data } = res.data;
          this.hideLoading()
          if (!error) {
            if (res.data.ShowSeats_AllClasses_Open == 0) {
              this.$root.$emit('bv::show::modal', 'seatFullModal')
            } else if (
              res.data.hasOwnProperty('SeatTypes') &&
              res.data.hasOwnProperty('SeatLayouts') &&
              res.data.SeatLayouts.length > 0
            ) {
              this.seatLayout = res.data.SeatLayouts
              this.newfvvTest = res.data.Fvvtext

              let SeatTypeArray = []
              this.seatLayout.map(x => {
                if (SeatTypeArray.length > 0) {
                  if (
                    SeatTypeArray[SeatTypeArray.length - 1]['SeatType'] !=
                    x[0].SeatType
                  ) {
                    let SeatTypeFilterCheck = res.data.SeatTypes.findIndex(
                      st => {
                        return st.SeatType == x[0].SeatType
                      }
                    )

                    let obj = {}
                    if (SeatTypeFilterCheck >= 0) {
                      obj = {
                        ...res.data.SeatTypes[SeatTypeFilterCheck],
                        key: SeatTypeArray.length,
                      }
                    } else {
                      obj = {
                        key: SeatTypeArray.length,
                        SeatType: 'NS',
                      }
                    }
                    SeatTypeArray.push(obj)
                  }
                } else {
                  let SeatTypeFilter = res.data.SeatTypes.findIndex(st => {
                    return st.SeatType == x[0].SeatType
                  })
                  let obj = {}
                  if (SeatTypeFilter >= 0) {
                    obj = {
                      ...res.data.SeatTypes[SeatTypeFilter],
                      key: 0,
                    }
                  } else {
                    obj = {
                      key: 0,
                      SeatType: 'NS',
                    }
                  }

                  SeatTypeArray.push(obj)
                }
                x.map(y => {
                  y['key'] = SeatTypeArray.length - 1
                  y['SelectStatusFlag'] = false
                  y['SelectStatus'] = false
                })
              })
              this.seatTypes = SeatTypeArray

              console.log('seatTypesseatTypes :>> ', this.seatTypes)
              console.log('seatLayoutseatLayout :>> ', this.seatLayout)

              this.currency =
                res.data.Currency == 'AED' ? 'LBP' : res.data.Currency
              this.cinemaDetails = res.data.Cinema
              let parts = this.cinemaDetails.ShowDate.split('-'),
                year = parseInt(parts[0], 10),
                month = parseInt(parts[1], 10) - 1, // NB: month is zero-based!
                day = parseInt(parts[2], 10)
              let date1 = new Date(year, month, day)
              var date = new Date(this.cinemaDetails.Time * 1000)
              // var date1 = date.getDate();
              // var month = this.months[date.getMonth()];
              // var year = date.getFullYear();
              // var day = this.days[date.getDay()];
              var bookingDate =
                this.days[date1.getDay()].substring(0, 3) +
                ', ' +
                date1.getDate() +
                ' ' +
                this.months[date1.getMonth()] +
                ' ' +
                year
              // Hours part from the timestamp
              var hours = date.getHours()
              // Minutes part from the timestamp
              var minutes = '0' + date.getMinutes()
              // Seconds part from the timestamp
              var seconds = '0' + date.getSeconds()
              this.cinemaDetails.BookingDate = bookingDate
              this.cinemaDetails.BookingTime = hours + ':' + minutes.substr(-2)
              // this.seatLayout.map(seatRow => {
              //   seatRow.map(seat => {
              //     seat.SelectStatusFlag = false;
              //     seat.SelectStatus = false;
              //   });
              // });
              this.getFoodAndBeverages()
              this.cinemaDetails.BookingTime = res.data.SchTime

              // this.seatTypes = res.data.SeatTypes;
              // this.seatTypes = this.seatTypes.reverse();
            } else {
              this.$root.$emit('bv::show::modal', 'errorModal')
              console.log('error from res', res.message)
            }
          } else {
            this.$root.$emit('bv::show::modal', 'errorModal')
          }
        })
        .catch(error => {
          console.log('Error on vue front', error)
        })
    },
    handlerSeatSelected: function (
      seat,
      rowIndex,
      seatIndex,
      originalIndex,
      backward,
      e
    ) {
      // console.log('e', e)
      // if(e){ e.preventDefault()}
      // this.events.splice(this.events.indexOf(event), 1);
      seat.seatIndex = seatIndex
      seat.rowIndex = rowIndex
      // seat.classIndex = classIndex;
      let firstTime = 0
      if (originalIndex === null) {
        firstTime = 1
        originalIndex = seatIndex
      } else if (this.totalNumberOfSeats != this.selectedSeats.length) {
        this.seatLayout[rowIndex][seatIndex].SelectStatusFlag = true
      }
      if (this.seatLayout[rowIndex][seatIndex].SelectStatusFlag == false) {
        if (this.totalNumberOfSeats != this.selectedSeats.length) {
          this.seatLayout[rowIndex][seatIndex].SelectStatusFlag = true
        }
      }
      if (
        this.selectedSeats.length > 0 &&
        this.selectedSeats[0].SeatType != seat.SeatType
      ) {
        // alert("Change of Seat Class");
        this.$refs.warningModalNew.show()

        // deselect all
        this.selectedSeats.map(x => {
          this.seatLayout[x.rowIndex][x.seatIndex].SelectStatus = false
          this.seatLayout[x.rowIndex][x.seatIndex].SelectStatusFlag = false
        })
        this.selectedSeats = []
      }
      let findindexNew = this.selectedSeats.findIndex(x => {
        return x.SeatlayoutID == seat.SeatlayoutID
      })
      console.log('selected', findindexNew)
      if (findindexNew >= 0) {
        this.seatLayout[rowIndex][seatIndex].SelectStatus = false
        this.seatLayout[rowIndex][seatIndex].SelectStatusFlag = false
        this.selectedSeats.splice(findindexNew, 1)
        this.totalAmount =
          parseFloat(this.totalAmount) -
          this.seatLayout[rowIndex][seatIndex].SeatPrice

        return false
      }
      if (
        this.totalNumberOfSeats == this.selectedSeats.length &&
        firstTime == 1
      ) {
        // alert("You can only select 10 seats");
        this.$refs.warningModal.show()
        return false
        // deselect all
        // this.selectedSeats.map((x) => {
        //   this.seatLayout[x.rowIndex][x.seatIndex].SelectStatus = false;
        //   this.seatLayout[x.rowIndex][x.seatIndex].SelectStatusFlag = false;
        // });
        // this.selectedSeats = [];
      }
      if (this.seatLayout[rowIndex][seatIndex].SelectStatus == false) {
        // console.log("1", this.totalNumberOfSeats, this.selectedSeats.length);
        // check if seat is selected, if yes, do nothing else
        // check how many selected
        if (
          parseFloat(this.totalNumberOfSeats) - this.selectedSeats.length >
          0
        ) {
          this.seatLayout[rowIndex][seatIndex].SelectStatus = true
          this.seatLayout[rowIndex][seatIndex].SelectStatusFlag = true
          this.selectedSeats.push(seat)
          // check on right if available, if yes, select
          // console.log(
          //   "test1",
          //   this.seatLayout[rowIndex][parseFloat(seatIndex) + 1]
          // );
          // if (
          //   this.seatLayout[rowIndex][parseFloat(seatIndex) + 1] &&
          //   backward != "backward" &&
          //   this.seatLayout[rowIndex][parseFloat(seatIndex) + 1].Status == 1
          // ) {
          //   // console.log("3");
          //   //                        this.selectedSeats.push(seat);
          //   //                        this.seatData.SeatLayouts[classIndex].Seats[rowIndex][parseFloat(seatIndex) + 1].SelectStatus = true;
          //   this.handlerSeatSelected(
          //     this.seatLayout[rowIndex][parseFloat(seatIndex) + 1],
          //     rowIndex,
          //     seatIndex + 1,
          //     originalIndex
          //   );
          //   //check on left if available, if yes, select
          // } else if (
          //   this.seatLayout[rowIndex][parseFloat(originalIndex) - 1] &&
          //   this.seatLayout[rowIndex][parseFloat(originalIndex) - 1].Status == 1
          // ) {
          //   // console.log("4");
          //   //                        this.selectedSeats.push(seat);
          //   //                        this.seatData.SeatLayouts[classIndex].Seats[rowIndex][parseFloat(originalIndex) - 1].SelectStatus = true;
          //   this.handlerSeatSelected(
          //     this.seatLayout[rowIndex][parseFloat(originalIndex) - 1],
          //     rowIndex,
          //     originalIndex - 1,
          //     originalIndex - 1,
          //     "backward"
          //   );
          // }
        } else {
          // console.log("5");
          if (firstTime == 1) {
            this.selectedSeats = []
            // this.handlerSeatSelected(
            //   this.seatLayout[rowIndex][parseFloat(seatIndex)],
            //   rowIndex,
            //   seatIndex
            // );
          }
        }
      }
      // compare with total
      // if total > selected
      // check on right if available, if yes, select
      // check on left if available, if yes, select
      // if total == selected
      // if seat selected is selected, do nothing
      // if seat selected is not selected, remove all selected and start again
      //          let isInArray = 0;
      //          this.selectedSeats.map((x, index)=>{
      //              if(x.SeatName == seat.SeatName ){
      //                  this.$delete(this.selectedSeats, index);
      //                  isInArray = 1;
      //              }
      //          });
      //          if(isInArray == 0){
      //              this.selectedSeats.push(seat);
      //          }
      this.totalAmount = 0
      this.selectedSeats.map((x, index) => {
        this.totalAmount =
          parseFloat(this.totalAmount) + parseFloat(x.SeatPrice)
      })
    },
    onCheckout: function () {
      // this.checkSignIn();
      this.sectionName.foodAndBeverages = false
      this.sectionName.checkout = true
      // open singin modal using Event bus
    },
    confirmBooking: function () {
      this.bookFoodAndBeverages()
    },
    confirmSeatsSelect: function () {
      // console.log("confirm Number", this.getSeatLayout);
      // if (this.totalNumberOfSeats < 1) {
      //   //   vm.$snack.metodo('Please Pick Number of Seats') // Displays a snackbar without action button
      //   return;
      // }
      // if (this.getSeatLayout == true) {
      //   this.sectionName.noOfSeats = false;
      //   this.sectionName.seatLayout = true;
      //   this.sectionName.showFooter = false;

      //   this.getSeatLayoutNew();
      // } else {
      //   this.getSeatLayoutNew();
      // }
      this.startTimer()
      this.sectionName.selectNoOfSeats = false
      this.sectionName.seatLayout = false
      this.sectionName.showFooter = false

      this.sectionName.foodAndBeverages = true
      this.bookingRequestConfirmSeats()
      // this.onCheckout();
    },
    onconfirm: function () {
      this.bookFoodAndBeverages()
    },
    finalConfirmation: function () {
      this.$router.push('/confirmation/' + this.bookingID)
    },
    // this.$root.$emit("bv::show::modal", "sessionTimeOut");

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
          // this.$router.push({
          //   name: "cinemashowtimes",
          //   params: {
          //     movieId: "313",
          //     cat_id: "1",
          //     movieName: this.scheduleData.MovieTitle.replace(/ /g, "-")
          //   }
          // });
          // this.$root.$emit("bv::show::modal", "sessionTimeOut");
          clearInterval(this.timerStartFunction)
          return false
        } else {
        }
      }, 1000)
    },

    // startTimer: function () {
    //   // alert("1");
    //   this.timerStartFunction = setInterval(() => {
    //     if (parseFloat(this.timer.seconds) < 0) {
    //       this.timer.seconds = 0;
    //     }
    //     if (parseFloat(this.timer.minutes) < 0) {
    //       this.timer.minutes = 0;
    //     }
    //     if (this.timer.stop == true) {
    //       return;
    //     }
    //     if (
    //       parseFloat(this.timer.seconds) == 0 &&
    //       parseFloat(this.timer.minutes) == 0 &&
    //       this.$route.path.includes("/checkout")
    //     ) {
    //       // alert("2");
    //       // this.timer.seconds = 60;
    //       this.timer.stop = false;
    //       this.$root.$emit("bv::show::modal", "sessionTimeOut");
    //       // this.$refs.sessionTimeOut.show();
    //       clearTimeout(self.timerStartFunction);
    //       return false;
    //     }
    //     if (parseFloat(this.timer.seconds) <= 0) {
    //       this.timer.seconds = 60;
    //     }
    //     this.timer.seconds = parseFloat(this.timer.seconds) - 1;
    //     if (this.timer.seconds < 10) {
    //       this.timer.seconds = "0" + this.timer.seconds;
    //       // alert("3");
    //     }
    //   }, 1000);
    //   setInterval(() => {
    //     // alert("4");
    //     if (this.timer.stop == true) {
    //       return;
    //     }
    //     if (
    //       this.timer.minutes == 0 &&
    //       this.timer.seconds == 0 &&
    //       this.$route.path.includes("/checkout")
    //     ) {
    //       // alert("5");
    //       // this.$refs.sessionTimeOut.show();
    //       this.$root.$emit("bv::show::modal", "sessionTimeOut");

    //       // this.$root.$emit("bv::show::modal", "sessionTimeOut");
    //       //TODO Show timeout message and a redirect button
    //       this.timer.TimeoutModal = true;
    //       this.timer.minutes = 0;
    //       this.timer.seconds = 0;
    //       this.timer.stop = true;
    //     }
    //     this.timer.minutes = parseFloat(this.timer.minutes) - 1;
    //   }, 60000);
    // },
  },
}
</script>
<style scoped></style>
