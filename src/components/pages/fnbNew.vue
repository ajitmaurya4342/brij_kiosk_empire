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
                          :src="dataItems.ThumbnailImage"
                          class="image img-fluid"
                        />
                      </div>
                      <div class="fnb-content pt-2">
                        <p class="main-title ar-number">
                          {{ dataItems.ItemName }}
                        </p>
                        <div class="grid-half">
                          <div class="fnb-amt ar-number">
                            {{ dataItems.Currency }} {{ currFormat(dataItems.Amount) }}
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
              >{{ scheduleData.Currency }} {{ currFormat(totalAmount) }}</span
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
              {{ currFormat(totalAmount) }}
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
import { makeRequest, makeRequestBrij} from '@/helper/internet.js'
import { groupBy } from 'lodash'
import { EventBus } from '@/main'
import axios from 'axios'
import moment from 'moment'
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
      FNbPrice: {total_price: 0, total_tax: 0},
      isSeatReleased: true,
      reservationDetails: null,
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
    this.ReserveID = this.$route.params.reserveId
    this.getReserveInfo()
  },
  beforeRouteLeave (to, from, next) {
    if (this.isSeatReleased) {
      this.callSeatReleased()
    }
    next()
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
    getCinemaTranslatedName (cinema) {
      if (!cinema) return ''

      let name = this.getLangSpecificAttribute(
        cinema.translation_data || [],
        this.getCurrentLang().brij_lang_id,
        'cinema_name',
        'langaugeId',
      ) || cinema.cinema_name

      return name
    },
    selectedItems () {
      let selectedItem = []
      this.fnbItemData.map(z => {
        z.items.map(_it => {
          if (_it.Qty > 0) {
            let TotalPrice = +parseFloat(_it.FnbDetail.fp_total_amount).toFixed(4) * _it.Qty
            let TotalTax = +parseFloat(_it.FnbDetail.fp_total_amount - _it.FnbDetail.fp_amount).toFixed(4) * _it.Qty

            this.FNbPrice['total_price'] = +parseFloat(this.FNbPrice['total_price'] + TotalPrice).toFixed(4)
            this.FNbPrice['total_tax'] = +parseFloat(this.FNbPrice['total_tax'] + TotalTax).toFixed(4)
            let obj = {
              ..._it.FnbDetail,
              Quantity: _it.Qty,
              quantity: _it.Qty,
              total_price: TotalPrice,
              total_tax: TotalTax,
            }
            selectedItem.push(obj)
          }
        })
      })

      return selectedItem
    },
    getTitleIndex (id) {
      this.FnbSelected = id
    },
    goBackExpired () {
      this.onClickOk()
    },
    handleReInit (e, s) {
      console.log('handleReInit', e, s)
      this.$refs.fnbSlider.forEach(item => {
        item.slick('unslick')
        item.slick(this.fnbSliderOptions())
      })
    },
    getReserveInfo () {
      this.hideLoading()
      let payload = {
      }
      this.showLoading()
      makeRequestBrij(`/api/external/reservation-detail/${this.ReserveID}`, 'GET', null, null)
        .then(result => {
          const { error, res } = result
          const { data } = res.data

          if (!error) {
            if (res.data && res.data.status) {
              let schedule_detail = res.data.Records[0]
              this.reservationDetails = res.data.Records[0]
              console.log('schedule_detail')
              this.scheduleData = {
                CinameName: this.getCinemaTranslatedName(schedule_detail) || schedule_detail.cine_name,
                MovieTitle:
                  this.getLangSpecificAttribute(schedule_detail.altMovieContent, this.getCurrentLang().brij_lang_id, 'mc_title') ||
                  schedule_detail.movie_title ||
                  schedule_detail.original_title_of_movie,
                ScreenName: schedule_detail.screen_name,
                ShowDate: moment(schedule_detail.ss_actual_start_date).locale(this.getCurrentLang().iso_2 || 'en').format('ddd, DD MMM YYYY'),
                ShowTime: moment(schedule_detail.ss_start_show_time, 'HH:mm').locale(this.getCurrentLang().iso_2 || 'en').format('hh:mm A'),
                Location: schedule_detail.cine_address,
                Experience: schedule_detail.mf_name,
                Currency: this.$store.getters.getGlobalCurrency.curr_code || 'Sar',
                SeatName: '',
                SchID: schedule_detail.ss_id,
              }
              if (schedule_detail.hasOwnProperty('cinema_id') && schedule_detail.cinema_id) {
                this.cinemaID = schedule_detail.cinema_id
              }
              if (
                schedule_detail.hasOwnProperty('selectedSeats') &&
                schedule_detail.selectedSeats.length > 0
              ) {
                this.selectedSeatsNew = schedule_detail.selectedSeats

                this.selectedSeatsNew.map(z => {
                  if (!this.SeatLable) {
                    this.SeatLable = z.sst_seat_type
                  }
                  if (z.seat_reserve_type_id == 3) {
                    this.wc_seats += z.sl_seat_name + ', '
                  } else {
                    this.normal_seats += z.sl_seat_name + ', '
                  }
                })
                if (this.normal_seats) {
                  this.normal_seats = this.normal_seats.substring(0, this.normal_seats.length - 2)
                }
                if (this.wc_seats) {
                  this.wc_seats = this.wc_seats.substring(0, this.wc_seats.length - 2)
                }

                if (schedule_detail.amount) {
                  this.totalAmount = +schedule_detail.amount.toFixed(4)
                }

                this.timer.minutes = schedule_detail.timer_minutes
                this.timer.seconds = schedule_detail.timer_second
                this.startTimer()
              }
              this.hideLoading()

              this.getfnbDataBrij()
            } else {
              setTimeout(() => {
                this.$refs['errorModal'].show()
                this.errorMessage = res.data.message
                this.hideLoading()
              })
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
            this.totalAmount = +parseFloat(
              parseFloat(this.totalAmount) + parseFloat(selecteditem[0].Amount)
            ).toFixed(4)
          }
        }
      }

      if (type == 'sub') {
        let selecteditem = this.fnbItemData[index].items.filter(x => {
          return x.Id == foodItem.Id
        })
        if (selecteditem.length > 0 && selecteditem[0].Qty != 0) {
          this.fnbItemData[index].items[lowerIndex].Qty -= 1

          this.totalAmount = +parseFloat(
            parseFloat(this.totalAmount) - parseFloat(selecteditem[0].Amount)
          ).toFixed(4)
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

      console.log(this.fnbItemData, 'onCLic')
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

    getfnbDataBrij () {
      this.showLoading()
      let payloadNew = {'category': null, 'aggregator_cinema_id': this.cinemaID, 'cinema_id': this.cinemaID, 'isCombo': false, 'isEgg': '', 'isVeg': '', 'search': '', 'subCategory': null, 'reservation_id': null}
      makeRequestBrij(`/api/external/fnb-items`, 'POST', null, payloadNew)
        .then((responseFnb) => {
          this.hideLoading()
          if (responseFnb.res.data.Records.Records.length > 0) {
            let dataFnb = responseFnb.res.data.Records.Records
            let FNBItem = []
            dataFnb.map(z => {
              let check = FNBItem.findIndex(_fnb => {
                return _fnb.Id == z.fc_id
              })
              if (check >= 0) {
                FNBItem[check]['itemcount'] = FNBItem[check]['itemcount'] + 1
                let obj = {
                  'Category': z.fc_id,
                  'ItemName': z.item_name,
                  'Amount': z.fp_total_amount,
                  'Currency': this.$store.getters.getGlobalCurrency.curr_code || 'Sar',
                  'Description': z.item_description,
                  'ThumbnailImage': z.item_image_url,
                  'Qty': 0,
                  'Id': z.item_id,
                  'TotalAmount': z.fp_total_amount,
                  'FnbDetail': {...z}
                }

                FNBItem[check]['items'].push(obj)
              } else {
                let obj = {
                  'Id': z.fc_id,
                  'Title': z.fc_category,
                  'items': [{
                    'Category': z.fc_id,
                    'ItemName': z.item_name,
                    'Amount': z.fp_total_amount,
                    'Currency': this.$store.getters.getGlobalCurrency.curr_code || 'Sar',
                    'Description': z.item_description,
                    'ThumbnailImage': z.item_image_url,
                    'Qty': 0,
                    'Id': z.item_id,
                    'TotalAmount': z.fp_total_amount,
                    'FnbDetail': {...z}
                  }],
                  'itemcount': 1
                }
                FNBItem.push(obj)
              }
            })

            this.fnbItemData = FNBItem
            this.fnbItemDataTemp = FNBItem
          }
        })
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
                this.totalAmount = +res.data.scheduleData.Amount.toFixed(4)
              }
            }
          }
        })
        .catch(error => {
          console.log('Error on vue front', error)
        })
    },
    skipFNB () {
      this.isSeatReleased = false
      window.localStorage.setItem('MIN', this.timer.minutes)
      window.localStorage.setItem('SEC', this.timer.seconds)
      this.$router.replace({
        path: '/ticket-confirmation/' + this.ReserveID,
      })
    },
    onSubmitfnbCheckOut: function () {
      this.showLoading()
      let payload = {
        reservation_id: this.ReserveID,
        selected_fnb_items: this.selectedItems(),
        fnb_price: this.FNbPrice,
        category_id: 2,
      }

      makeRequestBrij('/api/external/save-fnb-items', 'POST', null, payload)
        .then(result => {
          const { error, res } = result
          const { data } = res.data
          if (!error && res.data.status) {
            this.hideLoading()

            this.skipFNB()
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
      this.onClickOk()
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

          this.totalAmount = +parseFloat(
            parseFloat(this.totalAmount) + parseFloat(foodItem.Amount)
          ).toFixed(4)
        }
      }
      if (
        type == 'subtract' &&
        this.foodAndBeverages.listing[foodItem.Category.Title][index].Qty != 0
      ) {
        this.foodAndBeverages.listing[foodItem.Category.Title][index].Qty -= 1

        this.totalAmount = +parseFloat(
          parseFloat(this.totalAmount) - parseFloat(foodItem.Amount)
        ).toFixed(4)
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

    getFoodAndBeverages: function () {
      let payload = {
        SchID: this.scheduleID,

        TransactionType: 'Normal',
      }

      makeRequest('/GetFnBItems', 'POST', null, payload)

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
          }
        })
        .catch(error => {
          console.log('Error on vue front', error)
        })
    },

    callSeatReleased () {
      makeRequestBrij('/api/external/release-seat', 'POST', null, {'reservation_id': this.ReserveID})
        .then(result2 => {

        })
    },

    onClickOk: function () {
      this.$router.go(-1)
      this.$refs.errorModal.hide()
      this.$refs.quitBooking.hide()
      this.$refs.sessionExpired.hide()
    },

    onClickModalOk: function () {
      this.$refs.warningModal.hide()
      this.$refs.warningModalNew.hide()
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

  },
}
</script>
<style scoped></style>
