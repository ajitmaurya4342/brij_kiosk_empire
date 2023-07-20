<template>
  <div>
    <div class="container-fluid mt-5 mb-5 pb-5 emp-seatlayout header-space">
      <div class="col-md-12">

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

         <div class="row">
          <div class="col-md-12 px-0">
            <table class="mx-auto">
              <tr>
                <td class="inline-table">
                  <div
                    class="table-responsive seat-table ar-number"
                    v-if="seatTypesNew.length > 0"
                  >
                    <table
                      v-for="(data, index) in seatTypesNew"
                      :key="index"
                      class="mb-3"
                    >
                      <tr>
                        <td align="center" colspan="3">
                          <div class="seat-title pb-1">
                            {{ data.seatType }} ({{ currFormat(data.seat_price) }} {{curr_code}})
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <table style="direction: ltr">
                            <tr
                              v-for="(dataNew, indexNew) in data.seatsFinal"
                              :key="indexNew"
                              class="ar-number"
                            >
                              <td>
                                <div class="emp-seat-alpha">
                                  {{
                                    dataNew.filter(x => x.sl_seat_name != "")
                                      .length > 0
                                      ? dataNew
                                          .filter(x => x.sl_seat_name != "")[0]
                                          .sl_seat_name.replace(/[0-9]/g, "")
                                      : ""
                                  }}
                                </div>
                              </td>
                            </tr>
                          </table>
                        </td>
                        <td>
                          <table style="direction: ltr">
                            <tr
                              v-for="(seatLayoutData,
                              index1) in data.seatsFinal"
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
                                  {{ seatName.srt_id == 3 ?'':  seatName.sl_seat_name }}

                                  <img width="18" height="20" v-if="seatName.srt_id == 3" src="@/assets/img/new-img/svg-img/wheelchairwhite.svg"/>
                                </div>
                                <div
                                  class="non-empty-seat"
                                  v-else-if="seatName.srt_id == 2 || seatName.srt_id==12 || seatName.srt_id==13"
                                  style="height: 27px; width: 27px"
                                ></div>
                                <div
                                  class="emp-seat disabled"
                                  v-else-if="
                                    seatName.seat_reserve_type_id == 8
                                  "
                                >
                                  <img width="18" height="20" v-if="seatName.srt_id == 3" src="@/assets/img/new-img/svg-img/wheelchair.svg" />
                                </div>

                                <div
                                  class="emp-seat"
                                  v-else
                                >
                                {{  seatName.srt_id == 3 ? '':seatName.sl_seat_name}}
                                  <img width="18" height="20" v-if="seatName.srt_id == 3" src="@/assets/img/new-img/svg-img/wheelchair.svg" />
                                </div>

                              </td>
                            </tr>

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

                </td>
              </tr>
            </table>
          </div>
          <div class="seat-section-txt col-md-12 pt-4">
            {{ allLanguageData.PleaseNote }}
          </div>
        </div>
        <!--Start SeatLayout Table--->

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
            {{ allLanguageData.Total }} : {{ curr_code }}
            <span class="ar-number">{{ currFormat(totalAmount) }}</span>
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
              <span class="ar-number">{{ currFormat(totalAmount) }}</span> {{ curr_code }}
            </h6>
            <div
              :class="displayContent ? 'ml-auto' : ''"
              v-if="selectedSeats.length > 0"
            >
              <button class="btn btn-checkout"  @click="openFnbPop">
                {{ allLanguageData.Checkout }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!----Food and Drinks Popup--->

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
import { makeRequest, makeRequestBrij } from '@/helper/internet.js'
import { groupBy } from 'lodash'
import { EventBus } from '@/main'
import axios from 'axios'
import moment from 'moment'
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

      seatLayout: [],
      seatTypes: [],
      displayContent: false,

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
      maxNumberofSeats: 10,
      md_id: '',
      ss_id: '',
      screen_id: '',
      seatTypesNew: [],
      cinemaId: 1,
      bookingError: false,
      isFnbExist: false,
      scheduleDetails: null,
    }
  },
  computed: {
    curr_code () {
      return this.$store.getters.getGlobalCurrency.curr_code || 'Sar'
    },
    seatNameShow () {
      if (this.selectedSeats.length > 0) {
        let seatName = ''
        this.selectedSeats.map((x, index) => {
          seatName +=
            index == this.selectedSeats.length - 1
              ? `${x.sl_seat_name && x.srt_id != 3 && x.sl_seat_name}`
              : `${x.sl_seat_name && x.srt_id != 3 && x.sl_seat_name}, `
        })

        seatName = seatName.split(', ').filter(v => v != 'false').sort()
        seatName = `${seatName.join(', ')} ${seatName && seatName.length > 0 ? `(${this.selectedSeats[0].sst_seat_type})` : ''}`

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
              ? `${x.sl_seat_name && x.srt_id == 3 && `${x.sl_seat_name} `}`
              : `${x.sl_seat_name && x.srt_id == 3 && `${x.sl_seat_name} `}, `
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

    // loyaltyTabDisable() {
    //   return (
    //     (!this.promoAppliedSuccessfully || !this.offerAppliedSuccessfully) &&
    //     this.isRedeemSuccessfully
    //   );
    // },

  },

  beforeMount () {
    if (localStorage.getItem('guest_detail')) {
      localStorage.removeItem('guest_detail')
      localStorage.removeItem('verification_id')
    }
    // this.MovieID = this.$route.params.movieId;
    // this.CategoryID = this.$route.params.categoryId;
    this.ss_id = this.$route.params.ss_id
    this.md_id = this.$route.params.md_id
    this.screen_id = this.$route.params.screen_id

    this.getSeatLayoutNew()
    this.getScheduleDetail()
  },
  mounted: function () {
    let token = TokenService.getToken()
    if (token) {
      this.userAlredyLogin = false
    } else {
      this.userAlredyLogin = true
    }

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
    skipFNB (isFnbSkip) {
      this.onFinalCheckOut(isFnbSkip)
    },
    openFnbPop () {
      if (this.isFnbExist) {
        this.$refs['foodanddrinks'].show()
      } else {
        this.onFinalCheckOut('Y')
      }
    },
    closeFnbPop () {
      this.$refs['foodanddrinks'].hide()
    },
    getScheduleDetail () {
      makeRequestBrij(`/api/cinema/schedule-details/${this.ss_id}`, 'GET', null, null)
        .then((response) => {
          const { error, res } = response
          if (res.data.status && res.data.Records.length) {
            //  alert("Seat Reserveds")
            //  console.log("Seat Re",res.data)
            let schedule_detail = res.data.Records[0]
            this.scheduleDetails = res.data.Records[0]
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
            }
            let payloadNew = {'category': null, 'aggregator_cinema_id': schedule_detail.cine_id, 'cinema_id': schedule_detail.cine_id, 'isCombo': false, 'isEgg': '', 'isVeg': '', 'search': '', 'subCategory': null, 'reservation_id': null}
            makeRequestBrij(`/api/external/fnb-items`, 'POST', null, payloadNew)
              .then((responseFnb) => {
                if (responseFnb.res.data.Records.Records.length > 0) {
                  this.isFnbExist = true
                }
              })
          } else {
            this.alertContent = res.data.message
            this.$refs['selectSeat'].show()
          }
        })
    },
    onFinalCheckOut (isFnbSkip) {
      let seat_layout_id = []
      let seat_type_id = []
      let rate_card_group_array = []
      let reservation_id = Math.floor(Math.random() * 9000000000)
      this.selectedSeats.map(z => {
        let ratecardGroup = z.rate_card_group[0]
        let obj = {'rate_card_id': ratecardGroup.rc_id, 'tt_id': ratecardGroup.tt_id, 'rc_g_id': ratecardGroup.rc_g_id, 'rcg_c_id': ratecardGroup.rcg_c_id, 'tt_name': ratecardGroup.tt_name, 'seat_type_id': z.screen_seat_type_id, 'status': false}
        rate_card_group_array.push(obj)
        seat_layout_id.push(z.sl_id)
        seat_type_id.push(z.screen_seat_type_id)
      })

      let payload = {'groupRateCard': true, 'seat_layout_id': seat_layout_id, 'seat_type_id': seat_type_id, 'newSeatLayout': rate_card_group_array, 'schedule_show_id': this.ss_id, 'reservation_id': reservation_id, 'isVipOrBlockSeats': false, 'cinema_id': this.cinemaId, 'gogo_ss_id': 0, 'gogo_booking_type_id': 0, 'specialRequest': '', 'is_website': true}
      // console.log(payload)
      this.showLoading()
      makeRequestBrij('/api/cinema/reserve-seat', 'POST', null, payload)
        .then((response) => {
          const { error, res } = response
          this.hideLoading()
          if (res.data.status) {
            if (isFnbSkip == 'Y') {
              this.$router.push({
                path: '/ticket-confirmation/' + reservation_id,
              })
            } else {
              this.$router.push({
                path: '/food-and-drinks/' + reservation_id
              })
            }
            //  alert("Seat Reserveds")
          } else {
            this.alertContent = res.data.message
            this.$refs['selectSeat'].show()
          }
        })
    },
    resetLayout () {
      if (this.setSeatTypeID != 0) {
        this.alertContent = this.allLanguageData.SeatSelectionText
        this.$refs['selectSeat'].show()
      }
      this.selectedSeats = []
      this.seatTypesNew.map(x => {
        x.seatsFinal.map(y => {
          y.map(z => {
            // console.log(z);
            z.SelectStatusFlag = false
          })
        })
      })
    },
    newHandlerSeatSelected (index, index1, index2, seat) {
      console.log(seat)

      if (seat.seat_reserve_type_id == 8 || seat.srt_id == 2 || seat.srt_id == 13 || seat.srt_id == 12) {
        console.log('No Seatt Selection')
        return
      }
      seat['seat_price'] = this.seatTypesNew[index].seat_price
      if (this.setSeatTypeID != seat.screen_seat_type_id) {
        // console.log(seat.ScreenSeatTypeID);

        this.resetLayout()
        this.setSeatTypeID = seat.screen_seat_type_id
      }
      let findIndexNew = this.selectedSeats.findIndex(x => {
        return x.sl_id == seat.sl_id
      })
      if (findIndexNew >= 0) {
        this.selectedSeats.splice(findIndexNew, 1)
      } else if (this.selectedSeats.length == this.maxNumberofSeats) {
        this.alertContent = this.allLanguageData.SeatSelectedLimit
        this.$refs['selectSeat'].show()
        return false
      } else {
        this.selectedSeats.push(seat)
      }
      seat.SelectStatusFlag = !seat.SelectStatusFlag

      if (this.selectedSeats.length > 0) {
        this.totalAmount = 0
        this.selectedSeats.map(x => {
          this.totalAmount = parseFloat(this.totalAmount) + x.seat_price
        })
      } else {
        this.setSeatTypeID = 0
        this.totalAmount = 0
      }
    },

    editNumberOfSeats: function (number) {
      this.totalNumberOfSeats = number
      // this.sectionName.seatLayout = true
      // deselect all
      this.selectedSeats.map(x => {
        this.seatLayout[x.rowIndex][x.seatIndex].SelectStatus = false
        this.seatLayout[x.rowIndex][x.seatIndex].SelectStatusFlag = false
      })
    },
    hideSeatModal () {
      this.$refs['selectSeat'].hide()
    },

    create_seat_layout_dynamic (payload) {
      console.log(payload.seatType.Records, 'dsdsaad', payload)

      let seatData = []
      let seatData1 = groupBy(payload.seats.Records, 'sst_seat_type')
      payload.seatType.Records = payload.seatType.Records.sort(function (a, b) {
        return a.sst_order - b.sst_order
      })

      payload.seatType.Records.map((type) => {
        for (var key in seatData1) {
          if (seatData1.hasOwnProperty(key)) {
            // console.log(key + " -> " + seatData1[key]);
            if (key == type.sst_seat_type) {
              seatData[key] = seatData1[key]
            }
          }
        }
        // seatData.seat
      })
      let tempArray = []
      for (let key in seatData) {
        if (seatData.hasOwnProperty(key)) {
          let seat_price = 0
          let seat_net_price = 0
          let seat_price_obj = seatData[key].filter((x) => {
            return x
          })
          // console.log('seat_price_obj :', seat_price_obj);
          if (seat_price_obj) {
            seat_price = seat_price_obj[0].seat_price
            seat_net_price = seat_price_obj[0].seat_net_price
          }
          // console.log('seat_price :', seat_price);
          tempArray.push({
            seatType: key,
            seat_price: seat_price,
            seat_net_price: seat_net_price,
            seats: seatData[key],
          })
        }
      }
      // let finalTempArray = [];
      // tempArray.map(item=>{
      //   let tempArray1 = [];
      //   let newtempArray =groupBy(item,"")
      // })
      let finalArray = []

      // [{
      //   seatType: 'gold',
      //   seats: []
      // }]

      for (let i = 0; i < tempArray.length; i++) {
        let singleSeatType = tempArray[i]

        let seatData_1 = groupBy(singleSeatType.seats, 'sl_row_num')
        // seatData_1 = {
        //   0: [],
        //   1: []
        // }
        let tempArray_1 = []
        for (let key in seatData_1) {
          if (seatData_1.hasOwnProperty(key)) {
            let seatData_2 = seatData_1[key].map((singleSeat) => {
              singleSeat.selectStatus = false
              singleSeat.SelectStatusFlag = false
              return singleSeat
            })
            seatData_2 = seatData_2.sort(function (a, b) {
              return a.sl_col_num - b.sl_col_num
            })

            tempArray_1.push(seatData_2)
          }
        }
        // console.log('tempArray_1 before', tempArray_1)

        // console.log('tempArray_1 after', tempArray_1)
        // tempArray_1 = [[], []]
        tempArray[i].seatsFinal = tempArray_1
        // finalArray.push({ seatType: tempArray, seats: tempArray_1 })
      }

      // set default number of seats to 1
      return tempArray
    },

    getSeatLayoutNew () {
      this.showLoading()
      let payload = {'screen_id': this.screen_id, 'ss_id': this.ss_id, 'md_id': this.md_id, 'type_seat_show': 1}
      makeRequestBrij('/api/external/seat-layout', 'POST', null, payload)
        .then((response) => {
          console.log(response)
          const { error, res } = response
          if (res.data.Records.length > 0) {
            let create_seat_layout_dynamic_new = this.create_seat_layout_dynamic({
              seats: res.data,
              seatType: {
                Records: res.data.screen_seat_type,
                status: true,
              },
            })
            this.seatTypesNew = create_seat_layout_dynamic_new

            this.hideLoading()
          } else {
            this.alertContent = res.data.message
            this.$refs['selectSeat'].show()
          }
        })

      //  this.editNumberOfSeats(this.maxNumberofSeats)
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

    resetVerifyUserErrors (event) {},

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
