<template>
  <div>
    <div class="container-fluid mt-5 mb-5 pb-5 emp-seatlayout header-space">
      <div class="col-md-12">
        <div class="mb-3 seatlayout-timer">
          <div class="centerTitle">
            <span class="red-dotl"></span>
            <div class="d-flex justify-content-center align-items-center">
              <p class="title ar-number">9:59</p>
              <p class="text ml-1 ml-md-3">
                <span class="d-block">{{ allLanguageData.Timer[0] }}</span>
                {{ allLanguageData.Timer[1] }}
              </p>
            </div>
            <span class="red-dotr"></span>
          </div>
        </div>
        <!-- <div class="mx-auto my-4 seatlayout-tabs">
          <div>
            <img
            src="@/assets/img/new-img/svg-img/profile.svg"
            class=""
            width="30px"
            />
          </div>
          <div>
            <hr class="horizontal" />
          </div>
          <div>
            <img
            src="@/assets/img/new-img/svg-img/profile.svg"
            class=""
            width="30px"
            />
          </div>
          <div>
            <hr class="horizontal" />
          </div>
          <div>
            <img
            src="@/assets/img/new-img/svg-img/profile.svg"
            class=""
            width="30px"
            />
          </div>
        </div> -->
        <div class="col-md-7 px-0 mx-auto seatlayout-screen">
          <div>
            <img
              src="@/assets/img/new-img/svg-img/desktop-screen.svg"
              class="img-fluid"
            />
          </div>
          <div class="movie-name">
            {{ scheduleData.MovieTitle }}<br />
            <div>{{ scheduleData.ScreenName }}</div>
          </div>
          <!-- <div class="screen"></div> -->
        </div>
        <div class="main-heading offset-md-2 col-md-8 pb-2">
          <div>
            <hr class="primary-line" />
          </div>
          <div class="title">
            {{ allLanguageData.ChooseYourSeats }}
          </div>
        </div>
        <!--Start SeatLayout Table--->
        <div class="row">
          <div class="col-md-12 px-0">
            <table class="mx-auto">
              <tr>
                <td class="inline-table">
                  <div
                    class="table-responsive seat-table ar-number"
                    v-if="seatTypes.length > 0"
                  >
                    <table
                      v-for="(data, index) in seatTypes"
                      :key="index"
                      class="mb-3"
                      v-if="data.SeatType != 'NS'"
                    >
                      <tr>
                        <td align="center" colspan="3">
                          <div class="seat-title pb-1">
                            {{ data.SeatType }} ({{ data.Price }} SAR)
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <table>
                            <tr
                              v-for="(dataNew, indexNew) in data.seatLayout"
                              :key="indexNew"
                              class="ar-number"
                            >
                              <td>
                                <div class="emp-seat-alpha">
                                  {{
                                    dataNew.filter(x => x.SeatName != "")
                                      .length > 0
                                      ? dataNew
                                          .filter(x => x.SeatName != "")[0]
                                          .SeatName.replace(/[0-9]/g, "")
                                      : ""
                                  }}
                                </div>
                              </td>
                            </tr>
                          </table>
                        </td>
                        <td>
                          <table>
                            <tr
                              v-for="(seatLayoutData,
                              index1) in data.seatLayout"
                              :key="index1"
                              class="ar-number"
                            >
                              <td
                                v-for="(seatName, index2) in seatLayoutData"
                                :key="index2"
                                @click="
                                  newHandlerSeatSelected(
                                    index,
                                    index1,
                                    index2,
                                    seatName
                                  )
                                "
                              >
                                <div
                                  class="emp-seat full-seat"
                                  v-if="seatName.SelectStatusFlag"
                                >
                                  {{ seatName.WheelChair == false ? seatName.SeatName : ''}}

                                  <img width="18" height="20" v-if="seatName.WheelChair == true" src="@/assets/img/new-img/svg-img/wheelchairwhite.svg"/>
                                </div>
                                <div
                                  class="non-empty-seat"
                                  v-else-if="seatName.Status == 0"
                                  style="height: 27px; width: 27px"
                                ></div>

                                <div
                                  class="emp-seat"
                                  v-else-if="seatName.Status == 1"
                                >
                                {{ seatName.WheelChair == false ? seatName.SeatName : ''}}
                                  <img width="18" height="20" v-if="seatName.WheelChair == true" src="@/assets/img/new-img/svg-img/wheelchair.svg" />
                                </div>
                                <div
                                  class="emp-seat disabled"
                                  v-else-if="
                                    seatName.Status == 2 || seatName.Status == 4
                                  "
                                >
                                  <img width="18" height="20" v-if="seatName.WheelChair == true" src="@/assets/img/new-img/svg-img/wheelchair.svg" />
                                </div>
                              </td>
                            </tr>
                            <!--  <tr v-for="(data, index) in 2" :key="index">
                <td v-for="(data, index) in 10" :key="index">
                  <div class="emp-seat full-seat"></div>
                </td>
              </tr>
              <tr v-for="(data, index) in 2" :key="index">
                <td v-for="(data, index) in 10" :key="index">
                  <div class="emp-seat wheelchair-seat"></div>
                </td>
              </tr>
              <tr v-for="(data, index) in 2" :key="index">
                <td v-for="(data, index) in 10" :key="index">
                  <div class="emp-seat wheelchair-seat"></div>
                </td>
              </tr>
              <tr v-for="(data, index) in 1" :key="index">
                <td v-for="(data, index) in 10" :key="index">
                  <div class="emp-seat cross-seat">X</div>
                </td>
              </tr> -->
                          </table>
                        </td>
                      </tr>
                    </table>
                  </div>
                </td>
              </tr>
              <tr>
                <td align="center" colspan="3">
                  <ul class="list-inline demo-seat-list">
                    <li class="list-inline-item">
                      <div class="d-flex aling-items-center">
                        <span class="emp-seat ">
                          <img width="18" height="20" src="@/assets/img/new-img/svg-img/wheelchair.svg" />
                        </span>
                        <small style="top:5px">{{
                          allLanguageData.SeatTypes[4]
                        }}</small>
                      </div>
                    </li>
                    <li class="list-inline-item">
                      <div class="d-flex aling-items-center">
                        <span class="demo-seat-icon your-selection"></span>
                        <small style="top:5px">{{
                          allLanguageData.SeatTypes[0]
                        }}</small>
                      </div>
                    </li>
                    <li class="list-inline-item">
                      <div class="d-flex align-items-center">
                        <span class="demo-seat-icon "></span>
                        <small>{{ allLanguageData.SeatTypes[1] }}</small>
                      </div>
                    </li>
                    <li class="list-inline-item">
                      <div class="d-flex align-items-center">
                        <span class="demo-seat-icon unavailable"></span>
                        <small>{{ allLanguageData.SeatTypes[2] }}</small>
                      </div>
                    </li>
                  </ul>

                  <!-- <div class="seat-desc pt-4">
                    <div>
                      <div
                        class="emp-seat full-seat mb-0"
                        style="width: 20px; height: 20px"
                      ></div>
                      <div class="pr-1">{{ allLanguageData.SeatTypes[0] }}</div>
                    </div>
                    <div>
                      <div
                        class="emp-seat mb-0"
                        style="width: 20px; height: 20px"
                      ></div>
                      <div class="pr-1">{{ allLanguageData.SeatTypes[1] }}</div>
                    </div>

                    <div>
                      <div
                        class="emp-seat disabled mb-0"
                        style="width: 20px; height: 20px"
                      ></div>
                      <div class="pr-1">{{ allLanguageData.SeatTypes[2] }}</div>
                    </div>
                  </div> -->
                </td>
              </tr>
            </table>
          </div>
          <div class="seat-section-txt col-md-12 pt-4">
            {{ allLanguageData.PleaseNote }}
          </div>
        </div>
      </div>
    </div>
    <!-- <b-button v-b-modal="'selectSeat'">Select Seat</b-button> -->
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
                {{ allLanguageData.Experience }}: {{ scheduleData.Experience }}
              </li>
              <li class="pb-2">
                {{ allLanguageData.Seats }}:
                <span class="ar-number">{{ seatNameShow }} </span>
                <br v-if="seatNameShow.trim() != ''">
                <span :style="seatNameShow.trim() == '' ? '' : 'margin-left:43px;'">{{ wcSeatNameShow }}</span>

              </li>
            </ul>
          </div>
          <div class="vertical-line">
            <hr class="vertical" />
          </div>
          <div>
            {{ allLanguageData.Total }} : {{ currency }}
            <span class="ar-number">{{ totalAmount }}</span>
          </div>
          <div class="vertical-line">
            <hr class="vertical" />
          </div>
          <div v-if="selectedSeats.length > 0">
            <button class="btn btn-checkout" @click="openFnbPop">
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
                  <strong>{{ allLanguageData.Seats }}: </strong>
                  <span>{{ seatNameShow }}</span>
                </div>
                <hr class="m-0 mb-3 fade-line no-hover-effect" />
              </li>
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
            <div
              @click="showContent()"
              v-bind:class="langName == 'ar' ? 'mr-3' : 'ml-3'"
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
              {{ allLanguageData.Total }} :
              <span class="ar-number">{{ totalAmount }}</span> {{ currency }}
            </h6>
            <div
              :class="displayContent ? 'ml-auto' : ''"
              v-if="selectedSeats.length > 0"
            >
              <button class="btn btn-checkout" @click="openFnbPop">
                {{ allLanguageData.Checkout }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!----Food and Drinks Popup--->
    <div class="emp_new_modal emp-loyalty-modal showtimes-popup">
      <b-modal
        hide-header-close
        hide-footer
        ref="foodanddrinks"
        id="foodanddrinks"
        size="lg"
        class="food-and-drinks-popup"
      >
        <template slot="modal-header">
          <div class="row w-100 align-items-center">
            <div class="pr-0 col-1 mb-3 mb-md-0">
              <div
                class="d-block bg-emp-red"
                style="height: 3px; width: 100%"
              ></div>
            </div>
            <div class="col-10">
              <h6 class="hiw-title font-weight-bold mb-0 text-center">
                {{ allLanguageData.FoodDrinks }}
              </h6>
            </div>
            <span @click="closeFnbPop" class="new-closeBtn">X</span>
          </div>
        </template>
        <div class="emp_new_modal_body px-3 py-lg-5 py-4">
          <div class="grid-half">
            <div class="text-width">
              <h1 class="mb-lg-5 mb-4" v-if="langName !== 'ar'">
                WOULD <br/>YOU LIKE TO<br/> GRAB <b>A BITE</b>
                <!-- {{ allLanguageData.wouldlike }} <b>{{ allLanguageData.GrabABite }}</b> -->
              </h1>
              <h1 class="mb-5" v-if="langName == 'ar'">
                    هل ترغب في <br/>وجبـة خفيفة
                <!-- {{ allLanguageData.wouldlike }} <b>{{ allLanguageData.GrabABite }}</b> -->
              </h1>
            </div>
            <div
              class="d-flex mb-4"
            >
              <b-button
                class="btn btn-yes"
                @click="skipFNB('N')"
                v-bind:class="langName == 'ar' ? 'ml-3' : 'mr-3'"
                >{{ allLanguageData.Yes }}</b-button
              >
              <b-button class="btn btn-no" @click="skipFNB('Y')">{{
                allLanguageData.noThank
              }}</b-button>
            </div>
          </div>
        </div>
      </b-modal>

      <b-modal
        id="selectSeat"
        no-close-on-backdrop
        :title="allLanguageData.SeatSelection"
        class="loginModal text-red"
        ref="selectSeat"
      >
        <div class="py-4 popup-desc">
          <p>{{ alertContent }}</p>
          <button class="btn popup-btn mt-3" @click="hideSeatModal()">
            {{ allLanguageData.Okay }}
          </button>
        </div>
      </b-modal>
    </div>
  </div>
</template>

<script>
import { makeRequest } from '@/helper/internet.js'
import { groupBy } from 'lodash'
import { EventBus } from '@/main'
import axios from 'axios'
import languageData from '@/languageData.json'
import { URL_BASE } from '@/helper/constant'
import OtpInput from '@/components/OTP/OtpInput.vue'

import {
  LanguageService,
  CountryService,
  TokenService,
} from '@/services/storage.service'
import selectpaymentVue from './selectpayment.vue'
let langToken = LanguageService.getLanguage() || {
  lang: 'eng',
  lang_id: 2,
}

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
      allLanguageDataAll: languageData[langToken['lang']],
      step: 0,
      isOfferAppliedId: null,
      displayContent: false,
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
      totalAmount: 0,
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
      fnbQty: 0,
      amount: 0,
      total_internet_handling_amt: 0,
      internethandling: 0,
      total_ticket_fnb: 0,
      currency: '',
      ReserveID: '',
      bookingID: '',
      reserveID: '',
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
      getSeatLayoutArrayNew: [],
      scheduleData: {
        CinameName: '',
        MovieTitle: '',
        ScreenName: '',
        ShowDate: '',
        ShowTime: '',
        Location: '',
        Experience: '',
      },
      setSeatTypeID: 0,
      RID: window.localStorage.getItem('RID'),
      alertContent: '',
    }
  },
  computed: {
    seatNameShow () {
      if (this.selectedSeats.length > 0) {
        let seatName = ''
        this.selectedSeats.map((x, index) => {
          seatName +=
            index == this.selectedSeats.length - 1
              ? `${x.SeatName && x.WheelChair == false && x.SeatName}`
              : `${x.SeatName && x.WheelChair == false && x.SeatName}, `
        })

        seatName = seatName.split(', ').filter(v => v != 'false').sort()
        seatName = `${seatName.join(', ')} ${seatName && seatName.length > 0 ? `(${this.selectedSeats[0].SeatType})` : ''}`

        // let test = seatName.split(',');
        // console.log(test);

        return seatName
      } else {
        return ''
      }
    },
    wcSeatNameShow () {
      if (this.selectedSeats.length > 0) {
        let seatName = ''
        this.selectedSeats.map((x, index) => {
          seatName +=
            index == this.selectedSeats.length - 1
              ? `${x.SeatName && x.WheelChair == true && `${x.SeatName} `}`
              : `${x.SeatName && x.WheelChair == true && `${x.SeatName} `}, `
        })

        seatName = seatName.split(', ').filter(v => v != 'false').sort()
        seatName = `${seatName.join(', ')} ${seatName && seatName.length > 0 ? `(${this.allLanguageDataAll.WheelChair})` : ''}`

        // let test = seatName.split(',');
        // console.log(test);

        return seatName
      } else {
        return ''
      }
    },
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
    this.showLoading()
    this.editNumberOfSeats(this.maxNumberofSeats)
    // this.MovieID = this.$route.params.movieId;
    // this.CategoryID = this.$route.params.categoryId;
    this.scheduleID = this.$route.params.scheduleID
    // if (this.RID) {
    //   let payload = {
    //     CategoryID: "1",
    //     ReserveID: this.RID
    //   };
    //   makeRequest("/ReleaseReserveSeat/", "POST", null, payload)
    //     .then(result => {
    //       const { error, res } = result;
    //       const { data } = res.data;
    //       if (!error && res.data.Status) {
    //         console.log(res.data);
    //         window.localStorage.setItem("RID", "");
    //       } else {
    //         //show error modal
    //       }
    //       this.getSeatLayoutNew();
    //     })
    //     .catch(error => {
    //       this.getSeatLayoutNew();
    //       console.log("Error on vue front", error);
    //     });
    // } else {
    //   this.getSeatLayoutNew();
    // }
    this.getSeatLayoutNew()
    // if(res.data.hasOwnProperty("isapplicableloyalty")){

    // }

    // this.fetchMovieDetails();
    this.ConfirmationURL = window.location.origin + '/confirmation'
    this.FailedURL = window.location.origin + '/failedPayment'
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
    hideSeatModal () {
      this.$refs['selectSeat'].hide()
    },
    openFnbPop () {
      this.$refs['foodanddrinks'].show()
    },
    closeFnbPop () {
      this.$refs['foodanddrinks'].hide()
    },
    skipFNB (fnbStatus) {
      this.bookingRequestConfirmSeats(fnbStatus)
    },
    goBack () {
      // this.$router.push({
      //   name: "cinemashowtimes",
      //   params: {
      //     movieId: "313",
      //     cat_id: "1",
      //     movieName: this.scheduleData.MovieTitle.replace(/ /g, "-")
      //   }
      // });

      this.$router.go(-1)
    },
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
    goBackHistory () {
      console.log('here :')
      this.$router.go(-1)
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
    bookingRequestConfirmSeats (fnbStatus) {
      this.showLoading()
      let seatLayoutId = []
      this.selectedSeats.map(x => {
        seatLayoutId.push(x)
      })
      let payload = {
        SchID: this.scheduleID,
        RequiredSeats: 0,
        BookingType: '',
        SelectedSeats: seatLayoutId,
      }

      makeRequest('/ReserveSeatBySeatID/', 'POST', null, payload)
        .then(result => {
          const { error, res } = result
          const { data } = res.data
          if (!error && res.data.Status) {
            console.log(res.data)
            if (res.data.hasOwnProperty('ReserveID') && res.data.ReserveID) {
              this.ReserveID = res.data.ReserveID
              window.localStorage.setItem('RID', res.data.ReserveID)
              if (fnbStatus == 'N') {
                window.localStorage.setItem('SKPFNB', 'N')
                window.localStorage.setItem('MIN', 1)
                window.localStorage.setItem('SEC', 0)
                this.$router.push({
                  path: '/food-and-drinks/' + res.data.ReserveID,
                })
              } else {
                window.localStorage.setItem('SKPFNB', 'Y')
                this.$router.push({
                  path: '/ticket-confirmation/' + this.ReserveID,
                })
              }
            } else {
              console.log('ReservId missing')
            }
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
      let payload = {
        SchID: this.scheduleID, /// /this.scheduleID,
        RequiredSeats: 1,
        BookingFrom: '',
        RequestFrom: 'web',
      }

      makeRequest('/GetSeatLayoutBySchedule', 'POST', null, payload)
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
              console.log(res.data, 'fssfsfsdf')
              if (res.data.hasOwnProperty('scheduleData')) {
                console.log('fsdfsdf')
                Object.keys(this.scheduleData).map(x => {
                  this.scheduleData[x] = res.data.scheduleData[x] || ''
                })
              }
              console.log(this.scheduleData)

              let SeatTypeArray = []
              this.seatLayout.map(x => {
                if (SeatTypeArray.length > 0) {
                  if (
                    SeatTypeArray[SeatTypeArray.length - 1]['SeatType'] !=
                    x[0].SeatType
                  ) {
                    let SeatTypeFilterCheck = res.data.SeatTypes.findIndex(
                      st => {
                        return st.ID == x[0].SeatPriceID
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
                    return st.ID == x[0].SeatPriceID
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
              // let newSeatLayout=[];
              this.seatTypes.map(x => {
                x.seatLayout = []
                if (x.SeatType != 'NS') {
                  this.seatLayout.map(y => {
                    // console.log(y, x.ID);
                    if (y[0].SeatPriceID == x.ID) {
                      x.seatLayout.push(y)
                    }
                  })
                } else {
                  this.seatLayout.map(y => {
                    // console.log(y, x.ID);
                    if (!y[0].SeatPriceID) {
                      x.seatLayout.push(y)
                    }
                  })
                }
              })

              console.log('seatTypesseatTypes :>> ', this.seatTypes)
              console.log('seatLayoutseatLayout :>> ', this.seatLayout)

              this.currency =
                res.data.Currency == 'AED' ? 'LBP' : res.data.Currency
              return false
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
    resetLayout () {
      if (this.setSeatTypeID != 0) {
        this.alertContent = this.allLanguageData.SeatSelectionText
        this.$refs['selectSeat'].show()
      }
      this.selectedSeats = []
      this.seatTypes.map(x => {
        x.seatLayout.map(y => {
          y.map(z => {
            // console.log(z);
            z.SelectStatusFlag = false
          })
        })
      })
    },
    newHandlerSeatSelected (index, index1, index2, seat) {
      if (seat.Status == 1) {
        // console.log(seat, "sdfsf");
        // console.log(this.setSeatTypeID, seat.ScreenSeatTypeID);
        if (this.setSeatTypeID != seat.ScreenSeatTypeID) {
          // console.log(seat.ScreenSeatTypeID);

          this.resetLayout()
          this.setSeatTypeID = seat.ScreenSeatTypeID
        }
        let findIndexNew = this.selectedSeats.findIndex(x => {
          return x.SeatlayoutID == seat.SeatlayoutID
        })
        if (findIndexNew >= 0) {
          this.selectedSeats.splice(findIndexNew, 1)
        } else if (this.selectedSeats.length == this.maxNumberofSeats) {
          this.alertContent = this.allLanguageData.SeatSelectedLimit
          console.log(this.alertContent)
          this.$refs['selectSeat'].show()
          return false
        } else {
          this.selectedSeats.push(seat)
        }
        seat.SelectStatusFlag = !seat.SelectStatusFlag

        if (this.selectedSeats.length > 0) {
          this.totalAmount = 0
          this.selectedSeats.map(x => {
            this.totalAmount = parseFloat(this.totalAmount) + x.SeatPrice
          })
        } else {
          this.setSeatTypeID = 0
          this.totalAmount = 0
        }
      }
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
          this.$root.$emit('bv::show::modal', 'sessionTimeOut')
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
<style scoped>
.emp-seat.disabled {
  color: transparent;
  background-color: rgba(65, 64, 66, 0.5);
  user-select: none;
  cursor: not-allowed;
}
</style>
