<template>
  <div class="white-grey-section otp-screen header-space">
    <div class="container min-height-100 mt-5 pt-5">
      <div class="row">
        <div class="col-lg-7 mx-auto justify-content-center">
          <div class="text-center">
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
            <h1 class="mb-0 font-weight-bold text-center">
              {{allLanguageData.VERIFYMOBILENUMBER}}
            </h1>
            <div class="pt-3 px-lg-5" v-if="userDetails.phoneNumber != ''">
              {{allLanguageData.OTPSENTON}} <b>+{{userDetails.CountryCode}}</b>{{ userDetails.phoneNumber }}</b>
            </div>
            <div>
              <span v-on:click="onClickChange" class="phone-otp-title" v-if="userDetails.phoneNumber != ''">
                {{allLanguageData.CHANGEMOBILENUMBER}}
              </span>
            </div>
            <div v-if="mobileNumberChangeClick || userDetails.phoneNumber == ''" class="otp-grid-half">
              <vue-phone-number-input
              id="phone_otp_number"

                :default-country-code="
                  contryList.find(
                    (o) => o.phonecode == userDetails.CountryCode,
                  ) &&
                  contryList.find((o) => o.phonecode == userDetails.CountryCode)
                    .isoCode
                "
                @update="resultsExample = $event"
                v-model="changedNumber"

              />

              <!-- <input type="Number" v-model="changedNumber" /> -->
              <button
                v-on:click="onChangeMobileNumber"
                :disabled="!isValidNumber"
                class="btn btn-block btn-submit"
              >
                 {{allLanguageData.SUBMIT}}
              </button>
            </div>
            <!-- <span v-if="mobileNumberChanged">Number Changed</span> -->
          </div>
          <div
            v-if="userDetails.phoneNumber != ''"
            class="auth-form-box text-center px-lg-5 px-3 mt-3 my-lg-5 py-lg-5 py-4"
          >
            <div class="px-lg-5">
              <OTPInput
                :isDisabled="isDisabled"
                :isError="isError"
                :onChangeOTP="onChangeOTP"
                :shouldResetOTP="shouldResetOTP"
                :numberOfInput="4"
              />
              <div class="px-lg-5 mx-lg-3">
                <button
                  v-on:click="validateOTP()"
                  type="submit"
                  class="btn btn-block btn-submit mt-3 mb-4"
                >
                  {{allLanguageData.SUBMIT}}
                </button>
                <div v-if="mobileNumberChanged" style="color:green">{{messageOtp}}</div>
                <span v-on:click="onChangeMobileNumber"
                  :style="
                    timerTwo ? 'pointer-events:none;' : 'cursor: pointer;'
                  "

                >
                  {{allLanguageData.ResendOTP}}
                </span>
                <br />
                <span v-if="errMessage" style="color: red;">
                  {{ errMessage }}
                </span>
              </div>
            </div>
            <div class="text-center small-text mt-lg-5 mt-3" v-if="showTimer == true && needTimer == true">
              {{allLanguageData.GOBACKTOPREVIOUSSCREEN}}
            </div>
            <div class="text-center small-text mt-lg-5 mt-3" v-else>
              <router-link class="text-secondary" to="/forgot-password">{{allLanguageData.GOTORESETPASS}}</router-link> , <router-link class="text-secondary" to="/login">{{allLanguageData.GOTOSIGNIN}}</router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
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
        {{allLanguageData.SESSIONEXPIRED}}
      </h6>
      <!-- <h6 class="pt-2 text-center font-weight-bold text-white">{{allLanguageData.ErrorModal.Content2}}!</h6> -->
      <div class="d-flex justify-content-center align-items-center">
        <div class>
          <b-button
            v-on:click="onClickOk()"
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
import axios from 'axios'
import $ from 'jquery'
import { URL_BASE } from '@/helper/constant'
import contryCodes from '@/helper/contryCodes.js'
import {
  LanguageService,
  CountryService,
  TokenService,
} from '@/services/storage.service'
import { EventBus } from '@/main'
export default {
  props: {
    otpPayLoadData: Array,
    ShowWelcomeText: Boolean,
  },
  beforeMount () {
    // this.sendOTP()
    this.showPhoneOtp = localStorage.getItem('checkPhone')
    if (!this.showPhoneOtp || (this.showPhoneOtp && this.showPhoneOtp != 2)) {
      this.$router.push('/profile')
    }
    if (this.$route.query.reserveId) {
      this.ReserveID = this.$route.query.reserveId
      this.getReserveInfo(this.ReserveID, '0')
    } else {
      this.showLoading()
    }

    this.getUserDetailsBrij()
    // setTimeout(() => {
    //   this.sendOTP()
    // }, 10000)
  },
  data () {
    return {
      preimere: '',
      needTimer: true,
      guestMode: false,
      reserveId: '',
      guestOtpFBG: false,
      showPhoneOtp: false,
      contryList: contryCodes,
      otp: null,
      timerTwo: false,
      scheduleid: localStorage.getItem('sheduleidphone'),
      isValidNumber: false,
      resultsExample: null,
      isDisabled: false,
      isError: false,
      changedNumber: '',
      prevRoute: null,
      errMessage: '',
      mobileNumberChanged: false,
      mobileNumberChangeClick: false,
      shouldResetOTP: false,
      showTimer: false,
      timer: {
        TimeoutModal: false,
        minutes: 9,
        seconds: 59,
        stop: false,
      },
      messageOtp: '',
      userDetails: {
        email: '',
        phoneNumber: '',
        CountryCode: '',
        CountryID: localStorage.getItem('country'),
        LanguageID: localStorage.getItem('language'),
      },
      ReserveID: '',
      errorMessage: ''
    }
  },
  watch: {
    otp: {
      handler (value) {
        this.errMessage = ''
      },
    },
    resultsExample: {
      handler (value) {
        console.log(value)
        this.isValidNumber = value.isValid
      },
    },
  },
  mounted: function () {},
  computed: {},
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.prevRoute = from.path
    })
  },
  methods: {
    onClickOk: function () {
      this.$router.go(-1)
      this.$router.go(-1)
      this.$refs.errorModal.hide()
      this.$refs.sessionExpired.hide()
    },
    getReserveInfo (ReserveID) {
      let payload = {
      }
      this.showLoading()
      makeRequestBrij(`/api/external/reservation-detail/${ReserveID}`, 'GET', null, null)
        .then(result => {
          const { error, res } = result
          const { data } = res.data

          if (!error) {
            if (res.data && res.data.status) {
              let schedule_detail = res.data.Records[0]
              this.showTimer = true
              this.timer.minutes = schedule_detail.timer_minutes
              this.timer.seconds = schedule_detail.timer_second
              this.startTimer()

              this.hideLoading()
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
    goBackExpired () {
      const getChangeNumber = localStorage.getItem('isChangeNumber')
      if (getChangeNumber == 1) {
        this.$router.push({
          path: '/profile',
        })
      } else {
        this.$router.push({
          path: '/seatLayout/' + this.scheduleid,
        })
      }
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
    sendOTP () {
      this.errMessage = ''
      const payload = {
        Mobile: this.userDetails.phoneNumber,
        CountryCode: this.userDetails.CountryCode,
        LanguageID: JSON.parse(this.userDetails.LanguageID).lang_id,
        CountryID: JSON.parse(this.userDetails.CountryID).CountryID,
        ReserveID: this.guestOtpFBG ? '' : this.reserveId,
      }
      console.log(payload)
      let token = TokenService.getToken()
      if (this.guestMode == true && !this.guestOtpFBG) {
        token = this.reserveId
      }
      var config = {
        method: 'POST',
        url: `${URL_BASE}/MobileOTP`,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${token}`,
        },
        data: JSON.stringify(payload),
      }
      axios(config).then((result) => {
        const { error, data } = result
        if (data.Status) {
          this.timerTwo = true
          setTimeout(() => {
            this.timerTwo = false
          }, 50000)

          this.hideLoading()
        } else {
          this.errMessage = data.Message
          this.hideLoading()
        }
      })
      setTimeout(() => {
        this.hideLoading()
      }, 5000)
    },
    onChangeOTP (otp) {
      this.otp = otp
      console.log(this.otp)
    },
    onClickChange () {
      this.mobileNumberChangeClick = true
    },
    onChangeMobileNumber () {
      this.mobileNumberChangeClick = false
      this.mobileNumberChanged = false
      this.errMessage = ''
      this.showLoading()
      const payload = {
        change_number: this.changedNumber ? this.changedNumber
          .trim()
          .split(' ')
          .join('') : this.userDetails.phoneNumber,
        resend_otp: '',
        verification_id: localStorage.getItem('verification_id')
      }
      makeRequestBrij('/api/cinema/verify-user', 'POST', null, payload)
        .then((result) => {
          const { error, res } = result
          console.log(res.data, 'Records')
          if (res.data.status) {
            this.mobileNumberChanged = true
            this.messageOtp = res.data.message
            if (localStorage.getItem('guest_detail')) {
              let guest_detail = JSON.parse(localStorage.getItem('guest_detail'))
              guest_detail['guest_mobile'] = this.changedNumber ? this.changedNumber
                .trim()
                .split(' ')
                .join('') : this.userDetails.phoneNumber
              console.log('STTITMEEEE', guest_detail)
              localStorage.setItem('guest_detail', JSON.stringify(guest_detail))
            }
            this.changedNumber = ''

            this.getUserDetailsBrij()
          }
          this.hideLoading()
        })
        .catch((error) => {

        })
    },
    validateOTP () {
      console.log('phone verified')
      if (!this.otp) {
        this.errMessage = 'Please enter otp'
        return
      }
      if (this.otp && this.otp.toString().length != 4) {
        this.errMessage = 'Please enter otp'
        return
      }
      this.showLoading()
      let payload = {
      }
      payload['otp_sms'] = this.otp
      payload['verification_id'] = localStorage.getItem('verification_id')
      makeRequestBrij('/api/cinema/verify-user', 'POST', null, payload)
        .then((result) => {
          const { error, res } = result
          const { data } = res.data
          this.hideLoading()
          if (res.data.status) {
            if (this.$route.query.reserveId) {
              this.$router.replace({
                path: '/select-payment/' + this.$route.query.reserveId,
              })
              window.location.reload()
            } else {
              this.$router.push('/profile')
            }
          } else {
            this.errMessage = res.data.message
          }
        })
        .catch((error) => {
          console.log('Error on vue front', error)
        })
    },
    getUserDetailsBrij: function () {
      let payload = {
        onlydetail: '',
        verification_id: localStorage.getItem('verification_id')
      }
      makeRequestBrij('/api/cinema/verify-user', 'POST', null, payload)
        .then((result) => {
          const { error, res } = result
          console.log(res.data, 'Records')
          if (res.data.Records.length) {
            let userDetail = JSON.parse(res.data.Records[0].user_detail)
            if (localStorage.getItem('guest_detail')) {
              let guest_detail = JSON.parse(localStorage.getItem('guest_detail'))
              console.log(guest_detail, 'guest_detail')
              this.userDetails = {
                email: guest_detail.guest_email,
                phoneNumber: guest_detail.guest_mobile,
                CountryCode: guest_detail.guest_country_code,
                CountryID: localStorage.getItem('country'),
                LanguageID: localStorage.getItem('language'),
              }
            } else {
              this.userDetails = {
                email: userDetail.email,
                phoneNumber: userDetail.phone_no,
                CountryCode: userDetail.CountryCode,
                CountryID: localStorage.getItem('country'),
                LanguageID: localStorage.getItem('language'),
              }
            }

            console.log(this.userDetails, ' this.userDetails')
          }

          this.hideLoading()
        })
        .catch((error) => {

        })
      setTimeout(() => {
        this.hideLoading()
      }, 5000)
    },
  },
}
</script>
<style>
#phone_otp_number .select-country-container{
pointer-events: none
}


</style>
