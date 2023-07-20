<template>
  <div class="white-grey-section otp-screen header-space">
    <div class="container min-height-100 mt-5 pt-5">
      <div class="row">
        <div class="col-lg-7 mx-auto justify-content-center">
          <div class="text-center">
            <h1 class="mb-0 font-weight-bold text-center">
              PASSWORD ASSISTANCE
            </h1>
            <div class="pt-3 px-lg-5" v-if="!ShowWelcomeText">
              Please enter the e-mail address below to receive a
              <span class="font-weight-bold">
                password reset link and a code
              </span>
            </div>
            <div class="pt-3 px-lg-5" v-if="ShowWelcomeText">
              Thank you for registering with Empire Cinemas, please check your
              email to enter the 4 digits security code.
            </div>
            <div>
              {{ welcomeText }}
            </div>
          </div>
          <div
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
                <div
                      class="
                        text-center text-danger
                        small
                        mb-2
                        font-weight-bold
                      "
                    >
                      {{ errorMessageOtp }}
                    </div>
              <div class="px-lg-5 mx-lg-3">
                <button
                  v-on:click="validateOTP()"
                  type="submit"
                  class="btn btn-block btn-submit mt-3 mb-4"
                >
                  {{ allLanguageData.ForgotPasswordModal.Btn }}
                </button>
              </div>
            </div>
            <div class="text-center small-text mt-3 mt-lg-5">
              Havent received the code yet?
              <router-link to="/login" class="f-text-primary">
                Sign Up
              </router-link>
            </div>
            <div class="text-center small-text mt-lg-5 mt-3">
              Go back to the pervious screen to sign in if you have already
              reset your password.
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { makeRequest,makeRequestBrij } from '@/helper/internet.js'
import axios from 'axios'
import $ from 'jquery'

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
  data () {
    return {
      otp: null,
      isDisabled: false,
      isError: false,
      shouldResetOTP: false,
      isProfileDropdownActive: false,
      isMobileMenu: false,
      submitText: 'SUBMIT',
      signupTab: false,
      isSendOtpClicked: false,
      isCheckOtpValid: false,
      isResendOtp: false,
      otpResponse: '',
      phoneNumberErr: false,
      emailErr: false,
      otpErr: false,
      checkoutShow: false,
      otp: {
        value: null,
      },
      verified: {
        phoneNumber: null,
        Email: null,
        countryCode: null,
      },
      loginTab: true,
      text: '',
      newmodalShow: true,
      languageData: {},
      country_id: '',
      lang: 'eng',
      showCards: true,
      hideCards: false,
      profileDetails: {},
      overlay: false,
      countryCode: '',
      openAside: '-320px',
      hideSearch: '-100vh',
      fbSignInParams: {
        scope: 'email',
        return_scopes: false,
      },
      googleSignInParams: {
        client_id:
          // "608518206441-vmd0dou7gia9nsq9vkc7ps38bccsc1so.apps.googleusercontent.com"
          // "193276772057-94fl0er49a467hjm0m1jmpnm7ondunjf.apps.googleusercontent.com"
          // "556054411694-g74ogb6nm2p0257ri8ci4i8an7064ct8.apps.googleusercontent.com"
          '778651711885-p2be0lt57lnk6gfsl5hoo57u11er94la.apps.googleusercontent.com',
      },
      birthDate: {
        date1: 'Date',
        month: 'Month',
        year: 'Year',
      },
      contactUsDeatils: {
        Name: '',
        Mobile: '',
        Email: '',
        Message: '',
        errorMessage: '',
      },
      months: [
        'Jan',
        'Febr',
        'Mar',
        'Apr',
        'May',
        'June',
        'July',
        'Aug',
        'Sept',
        'Oct',
        'Nov',
        'Dec',
      ],
      years: [],
      selectedCountry: '',
      loggedInFlag: false,
      countries: [],
      country: '',
      city: '',
      countrySelected: '',
      citySelected: '',
      onScroll: true,
      forgotPasswordSection: 0,
      page: '',
      cityDropDown: false,
      searchValue: '',
      movieListSearch: [],
      mobileSearch: false,
      searchQuery: '',
      options: {
        placeholder: 'Search',
        inputClass: 'header-input-box form-control',
        inputMainClass: 'header-input-box form-control',
      },
      mobileOptions: {
        placeholder: 'Search',
        inputClass: 'sb-search-input',
        inputMainClass: '',
      },
      resErrorMessage: {
        signUpError: '',
        signInError: '',
      },
      loginErrorMessage: 'Please Enter Your Credentials',
      registerErrorMessage: 'ENTER CONTACT INFORMATION',
      errorMessageStatus: {
        userName: false,
        email: false,
        phoneNumber: false,
        password: false,
        conditions: false,
      },
      classFlag: {
        onSignUp: '',
        onOTP: '',
        otpComplete: '',
        onSignIn: '',
      },
      // User Details
      userDetails: {
        selectedCard: 'VisaMaster',
        redirectURL: '/RedirectPayment',
        termsAndConditions: true,
        acceptedTerms: true,
        errorMessage: '',
        confirmEmail: '',
        username: '',
        password: '',
        firstName: '',
        gender: 'Gender',
        lastName: '',
        email: '',
        phoneNumber: '',
        confirmedPassword: '',
        countryCode: '966',
        OTP: '',
        newslatteremempirecinemanotification1: 0,
        Status: true,
        userID: null,
      },
      offerFilterTabs: [],
      NewOTP: '',
      promotionData: {},
      modal: {
        signUp: {
          info: true,
          OTP: false,
        },
        signIn: {
          info: true,
          OTP: false,
        },
      },
      errorMessage: {
        login: '',
        forgotpassword: '',
        signUp: '',
        checkout: '',
      },
      socialLoginError: {
        error: '',
      },
      IsActivedrop: false,
      loginData: {
        loginInput: {
          email: '',
          password: '',
          conditions: false,
        },
        errorMessageStatus: {
          email: false,
          password: false,
          conditions: false,
        },
        button: true,
      },
      langName: 'eng',
      preimere: false,
      emailReg: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/,
      handleCheckout: false,
      errorDob: '',
      errorGender: '',

      // new
      cinemaList: [],
      selectedCinema: window.localStorage.getItem('headerCinema'),
      selectedCinemaID: window.localStorage.getItem('headerCinemaID'),
      errorMessageOtp:""
    }
  },
  watch: {
    $route (to, from) {
      let lang = LanguageService.getLanguage()
      let langName = 'eng'
      if (lang == null) {
        langName = 'eng'
      } else {
        langName = lang['lang']
      }
      if (langName == 'ar') {
        document.body.classList.add('rtl-class')
      } else {
        document.body.classList.remove('rtl-class')
      }
    },
  },
  beforeMount () {
    this.countryCode = JSON.parse(
      window.localStorage.getItem('country')
    ).CountryID
    this.CountryName =
      window.localStorage.getItem('CountryName') || 'Select Country'
    this.getGeoLocation()
    // get lang token, set value in data
    let token = TokenService.getToken()
    if (token) {
      this.getUserDetails()
    }
    this.checkToken()
    for (var i = new Date().getFullYear(); i > 1900; i--) {
      this.years.push(i)
    }
    let lang = LanguageService.getLanguage()
    let langName = 'eng'
    if (window.location.host.includes('premiere')) {
      window.localStorage.setItem('PREIMERE', true)
    }
    if (lang == null) {
      // langName = "eng";
      // window.location.pathname = "/landingpage"1;
    } else {
      langName = lang['lang']
    }
    this.langName = langName
    if (
      window.location.host == 'empirepremiere.com' ||
      window.location.host == 'lb.empirecinemas.com'
    ) {
      this.country_id = 119
    } else if (window.location.host == 'ksa.empirecinemas.com') {
      this.country_id = 230
    } else if (window.location.host == 'irq.empirecinemas.com') {
      this.country_id = 102
    }
    this.fetchCinemaList()
    console.log(this.country_id)
  },
  mounted: function () {
    // this.getAllOffers();
    // this.getPromotionList();
    this.preimere = window.localStorage.getItem('PREIMERE')
    this.selectedCountry =
      window.localStorage.getItem('CountryName') || 'LEBANON'

    if (this.langName == 'ar') {
      document.body.classList.add('rtl-class')
      document.documentElement.setAttribute('lang', 'ar')
    } else if (this.langName == 'eng') {
      document.documentElement.setAttribute('lang', 'en')
      document.body.classList.remove('rtl-class')
    }
    EventBus.$on('getUserDetailsAndCheckout', (user) => {
      this.checkoutFlag = true
      this.handleCheckout = true
      this.checkoutProcess()
      this.getCountryCode()
    })
    EventBus.$on('UserLogin', () => {
      this.checkToken()
    })
    EventBus.$on('isUserNotLogin', () => {
      //  this.$bvModal.show('login')
      this.$refs.signInModal.show()
    })
    // sessionTimeOut
    EventBus.$on('updateProfile', (userName) => {
      this.profileDetails.FirstName = userName
    })
    // EventBus.$on("hideGuestCheckout", () => {
    //   this.handleCheckout = false;
    // });
  },
  computed: {},
  methods: {
    onChangeOTP (otp) {
      this.otp = otp
      this.errorMessageOtp='';
      console.log(this.otp)
    },
    validateOTP () {
      let payload = {}
      console.log(this.otp)
     
      if (this.otp && String(this.otp).length > 3 ) {
        payload['otp_email'] = this.otp
        payload['verification_id'] = localStorage.getItem('verification_id')
      }else{
        this.errorMessageOtp= "Please Enter Otp"
      }
       this.showLoading();
      makeRequestBrij('/api/cinema/verify-user', 'POST', null, payload)
        .then((result) => {
          const { error, res } = result
          const { data } = res.data
           this.hideLoading();
         if (res.data.status) {
          
             localStorage.setItem('isSignupLogin', 1)
             localStorage.setItem('access_token', res.data.Records.cust_id)
             localStorage.setItem('profile_detail',JSON.stringify( res.data.Records.userDetail))
             if(this.$route.params.reserveId){
              this.$router.push('/phoneotp?reserveId='+ this.$route.params.reserveId)

             }else{
                this.$router.push('/phoneotp')
             }
              window.location.reload()
          }else{
            this.errorMessageOtp=res.data.message
          }
        })
        .catch((error) => {
          console.log('Error on vue front', error)
        })
    },
    loginUser: function (token) {
      TokenService.saveToken(token)
      // this.hideSignIn();
      // this.hideSignUp();
      // this.loggedInFlag = true;
      this.getUserDetails()

      // if (this.handleCheckout) {
      //   this.$refs.checkoutModal.show();
      // }

      // fetch token, do api call for profile details save
    },
    saveSelectedCinema (data) {
      this.showLoading()
      window.localStorage.setItem('headerCinemaID', data.CinemaID)
      window.localStorage.setItem('headerCinema', data.CinemaName)
      this.$store.commit('increment')
      this.selectedCinema = data.CinemaName
      this.selectedCinemaID = data.CinemaID
      setTimeout(() => {
        this.hideLoading()
      }, 500)
    },
    fetchCinemaList: function () {
      makeRequest('/GetCinemas', 'POST', null, null)
        .then((result) => {
          const { error, res } = result
          const { data } = res.data
          if (res.data) {
            this.cinemaList = res.data.Categories
          }
        })
        .catch((error) => {
          console.log('Error on vue front', error)
        })
    },
    onSelectCountry: function (CountryName, CountryID, lang, id) {
      this.CountryName = CountryName
      let CountryJSON = { CountryID: CountryID }
      CountryService.saveCountry(CountryJSON)
      this.saveLangToken(lang, id)
    },
    saveLangToken: function (lang, id) {
      this.langName = lang
      let language = {
        lang: lang,
        lang_id: id,
      }
      LanguageService.saveLanguage(language)
      this.onClickNext(lang)
    },
    onClickNext (langname) {
      // let lang_id = "";
      // if (langname != "eng" || langname !== "eng") {
      // }

      let lang_id = langname == 'ar' ? 'ar' : ''

      console.log('this.CountryName', this.CountryName)
      window.localStorage.setItem('CountryName', this.CountryName)
      if (
        window.location.host == 'dev.empirecinemas.net' ||
        window.location.host == 'empireksadev.binarynumbers.io'
      ) {
        console.log('Local executed')
        window.location.pathname = '/'
      } else {
        console.log('Else executed')
        // if (this.CountryName != "") {
        //   this.RedirectURL = `https://${window.location.host}/${lang_id}`;
        //   window.location.replace(`https://${window.location.host}/${lang_id}`);
        //   window.localStorage.setItem("PREIMERE", false);
        // } else {
        //   window.location.pathname = "/";
        // }

        window.location.replace(`https://dev.empirecinemas.com/${lang_id}`)

        // if (this.CountryName == "Lebanon") {
        //   if (window.location.host == "lb.empirecinemas.com") {
        //     window.location.replace(`https://lb.empirecinemas.com/${lang_id}`);
        //   } else if (window.location.host == "empirepremiere.com") {
        //     window.location.replace(`https://lb.empirecinemas.com/${lang_id}`);
        //   } else if (
        //     window.location.host != "lb.empirecinemas.com" ||
        //     window.location.host != "empirepremiere.com"
        //   ) {
        //     this.RedirectURL = `https://lb.empirecinemas.com/${lang_id}`;
        //     window.location.replace(`https://lb.empirecinemas.com/${lang_id}`);
        //   }
        // } else if (this.CountryName == "Iraq") {
        //   if (window.location.host == "irq.empirecinemas.com") {
        //     window.location.replace(`https://irq.empirecinemas.com/${lang_id}`);
        //     window.localStorage.setItem("PREIMERE", false);
        //   } else if (window.location.host != "irq.empirecinemas.com") {
        //     this.RedirectURL = `https://irq.empirecinemas.com/${lang_id}`;
        //     window.location.replace(`https://irq.empirecinemas.com/${lang_id}`);
        //   }
        // } else if (this.CountryName === "Saudi Arabia") {
        //   if (window.location.host == "ksa.empirecinemas.com") {
        //     window.location.replace(`https://ksa.empirecinemas.com/${lang_id}`);
        //     window.localStorage.setItem("PREIMERE", false);
        //   } else if (window.location.host != "ksa.empirecinemas.com") {
        //     this.RedirectURL = `https://ksa.empirecinemas.com/${lang_id}`;
        //     window.location.replace(`https://ksa.empirecinemas.com/${lang_id}`);
        //   }
        // } else {
        //   window.location.pathname = "/";
        // }
      }
    },

    showMenu: function () {
      this.isMobileMenu = true
    },
    hideMenu: function () {
      this.isMobileMenu = false
    },
    switchPopupTab: function (value) {
      if (value == 'signup') {
        this.signupTab = true
        this.loginTab = false
        this.modal.signUp.info = true
        this.modal.signUp.OTP = false
      } else if (value == 'login') {
        this.signupTab = false
        this.loginTab = true
      }
    },

    hideLoginModal: function () {
      this.$refs['signInModal'].hide()
    },
    onGenderChange: function (value) {
      this.userDetails.gender = value
    },
    profileDropdownActive () {
      this.isProfileDropdownActive = !this.isProfileDropdownActive
    },
    homeCallRoute () {
      let getLang = JSON.parse(localStorage.getItem('language'))
      if (getLang.lang_id == 1) {
        this.$router.replace({
          path: '/ar',
        })
      } else {
        this.$router.replace({
          path: '/',
        })
      }
    },
    openLandingpage: function () {
      window.location.href = 'https://empirecinemas.com'
    },
    showMobileOfferType: function () {
      this.IsActivedrop = !this.IsActivedrop
    },
    getAllOffers () {
      makeRequest('/Offerlist', 'POST', null, null)
        .then((result) => {
          const { error, res } = result
          const { data } = res.data
          if (!error && res.data.Status) {
            this.offerFilterTabs = res.data.OfferType
          } else {
            console.log('object')
          }
        })
        .catch((error) => {
          console.log('error', error)
        })
    },
    isClickedOnNowShowing: function () {
      window.localStorage.removeItem('cinemaD')
    },
    changeProfileTabs: function (type) {
      //  EventBus.$emit("pTabChange", type);
      localStorage.setItem('profileTabType', type)
      this.isProfileDropdownActive = false
      this.$nextTick(() => {
        this.$router.push({ path: '/profile' })
      })
      // this.$router.push({ path: "/profile" });
    },
    onOTPValue: ({ ...payload }) => {
      // console.log("payload..pratz-1 :>> ", payload);
      // console.log("payload..pratz-2 :>> ", payload.value);
      // this.NewOTP = payload.value;
      // console.log("payload..pratz-3 :>> ", this.NewOTP);
    },
    resetVerifyUserErrors (event) {},
    onInput (formattedNumber, { number, valid, country }) {
      this.userDetails.phoneNumber = formattedNumber
      this.userDetails.CountryCode = country.dialCode
      console.log(
        'object :>>this.userDetails.CountryCode',
        this.userDetails.CountryCode
      )
    },
    switchPopupTab: function (value) {
      if (value == 'signup') {
        this.signupTab = true
        this.loginTab = false
        this.modal.signUp.info = true
        this.modal.signUp.OTP = false
      } else if (value == 'login') {
        this.signupTab = false
        this.loginTab = true
      }
    },
    checkVerified (e) {
      console.log('Change mobile no =>', e)
      if (this.verified.phoneNumber && this.verified.phoneNumber == e) {
        this.isCheckOtpValid = true
      } else {
        this.isCheckOtpValid = false
      }
      this.isCheckOtpValid = false
    },

    showOTPBOx () {
      // this.getUserDetails();

      if (this.userDetails.phoneNumber === '') {
        this.phoneNumberErr = true
        console.log('mobile err => ', this.phoneNumberErr)
      }
      if (this.userDetails.email === '') {
        this.emailErr = true
        console.log('Email err => ', this.emailErr)
      }

      if (!this.emailErr && !this.phoneNumberErr) {
        this.checkoutShow = true

        console.log(this.emailErr + ' : ' + this.emailErr)

        console.log('User id =>', localStorage.getItem('UserID'))

        if (
          this.verified.phoneNumber &&
          this.verified.phoneNumber != this.userDetails.phoneNumber
        ) {
          this.userDetails.phoneNumber = this.verified.phoneNumber
          this.isCheckOtpValid = false
        }

        let payload = {
          MobileNo: this.userDetails.phoneNumber,
          ReserveID: localStorage.getItem('ReserveID'),
          UserID: this.userDetails.userID,
          CountryCode: this.userDetails.countryCode,
          Email: this.userDetails.email,
        }

        console.log('send OTP payload => ', payload)
        makeRequest('/CheckoutOtp', 'POST', null, payload)
          .then((result) => {
            const { error, res } = result
            const { data } = res.data
            if (!error && res.data.Status) {
              console.log('otp response => ', result)
              this.checkoutShow = false
              this.otp.value = null
              this.isSendOtpClicked = true
              this.isResendOtp = true
              this.otpResponse = res.data.Message
            } else {
              // this.$root.$emit("bv::show::modal", "errorModal");
              // show error modal
              console.log('Error => ', error)
              this.checkoutShow = false
              this.otpResponse = res.data.Message
              if (res.data.MaxAttempt) {
                this.isSendOtpClicked = false
              }
            }
            setTimeout(() => (this.otpResponse = ''), 5000)
          })
          .catch((error) => {
            this.checkoutShow = false
            console.log('Error on vue front', error)
          })
      } else {
        setTimeout(() => {
          this.phoneNumberErr = false
          this.emailErr = false
        }, 5000)
        console.log('All fields are required')
      }
    },
    checkoutOtpVerify () {
      console.log('OTP value => ', this.otp.value)
      this.isSendOtpClicked = true
      let payload = {
        Mobile: this.userDetails.phoneNumber,
        ReserveID: localStorage.getItem('ReserveID'),
        UserID: this.userDetails.userID,
        OTP: this.otp.value,
      }
      console.log('verify OTP payload => ', payload)
      makeRequest('/VerifyCheckoutOtp', 'POST', null, payload)
        .then((result) => {
          const { error, res } = result
          const { data } = res.data
          if (!error && res.data.Status) {
            console.log('otp response => ', result)
            this.otpResponse = res.data.Message
            this.isCheckOtpValid = true
            this.isSendOtpClicked = false
            this.otp.value = null
            // this.isResendOtp = true;
            ;(this.verified.phoneNumber = this.userDetails.phoneNumber),
            (this.verified.Email = this.userDetails.Email),
            (this.verified.countryCode = this.userDetails.countryCode)

            console.log('Verified user => ', this.verified)
          } else {
            // this.$root.$emit("bv::show::modal", "errorModal");
            // show error modal
            console.log('Error => ', error)
            if (res.data.MaxAttempt) {
              this.isSendOtpClicked = false
            }
            this.otpResponse = res.data.Message
          }

          setTimeout(() => (this.otpResponse = ''), 5000)
        })
        .catch((error) => {
          console.log('Error on vue front', error)
        })
    },
    checkCard: function (card) {
      this.userDetails.selectedCard = card
    },
    getCountryIsActive () {
      // CountryID != '230' && CountryID != 190 &&  CountryID != 102 && CountryID != '102'
      let array = ['190', '102' ]
      return array.indexOf(String(this.CountryID)) === -1
    },
    getGeoLocation: function () {
      axios
        .get(
          'https://api.ipapi.com/check?access_key=229c548dcafb9cff13041d9544ac60af'
        )
        .then(function (response) {
          console.log(response.data.latitude, response.data.longitude)
          // handle success
          // self.countryData = response.data;
          // self.userDetails.countryCode = response.data.country_calling_code.substr(
          //   1
          // );

          showPosition(response.data.latitude, response.data.longitude)
          console.log(
            'country data from getgeolocation',
            response.data.country_name
          )
        })
        .catch(function (error) {
          // handle error
          console.log(error)
        })

      // let self = this;
      // if (navigator.geolocation) {
      //   navigator.geolocation.getCurrentPosition(showPosition, showError);
      // } else {
      //   x.innerHTML = "Geolocation is not supported by this browser.1";
      // }

      // function showError(error) {
      //   self.$router.push({
      //     name: "LandingPage"
      //   });
      // }

      function showPosition (lat, long) {
        let _position = {
          latitude: lat,
          longitude: long,
        }

        if (
          (window.localStorage.getItem('Geolocation') == '' ||
            window.localStorage.getItem('Geolocation') == undefined ||
            window.localStorage.getItem('Geolocation') == null) &&
          window.location.host != 'empirepremiere.com'
        ) {
          window.localStorage.setItem('Geolocation', JSON.stringify(_position))
          let payload = {
            userLatitude: lat,
            userLongitude: long,
          }

          if (
            window.localStorage.getItem('CountryName') == '' ||
            window.localStorage.getItem('CountryName') == null ||
            window.localStorage.getItem('CountryName') == undefined
          ) {
            makeRequest('/api/GetCountryCityBylatitude', 'POST', null, payload)
              .then((response) => {
                const { error, res } = response
                console.log('country data', res.data)

                self.CountryName == res.data.LocationInfo.country

                window.localStorage.setItem(
                  'CountryName',
                  res.data.LocationInfo.country
                )
                if (window.localStorage.getItem('language') == '') {
                  window.localStorage.setItem(
                    'language',
                    JSON.stringify({
                      lang: 'eng',
                      lang_id: 2,
                    })
                  )
                }
                window.localStorage.setItem(
                  'country',
                  JSON.stringify({
                    CountryID: res.data.LocationInfo.CountryID,
                  })
                )

                // if (MODE == "dev") {
                //   window.location.pathname = "/";
                // } else {
                if (res.data.LocationInfo.country === 'Saudi Arabia') {
                  window.localStorage.setItem(
                    'language',
                    JSON.stringify({
                      lang: 'ar',
                      lang_id: 1,
                    })
                  )
                }
                res.data.LocationInfo.country == 'Lebanon'
                  ? window.location.replace('https://lb.empirecinemas.com')
                  : res.data.LocationInfo.country == 'Iraq'
                    ? (window.location.replace('https://irq.empirecinemas.com'),
                    window.localStorage.setItem('PREIMERE', false))
                    : res.data.LocationInfo.country === 'Saudi Arabia'
                      ? (window.location.replace('https://ksa.empirecinemas.com'),
                      window.localStorage.setItem('PREIMERE', false))
                      : ((window.location.href = 'https://empirecinemas.com'),
                      window.localStorage.setItem('CountryName', ''))
              })
              .catch((error) => {
                console.log('Error', error)
              })
          }
        } else if (
          window.location.host == 'empirepremiere.com' ||
          window.location.host == 'lb.empirecinemas.com'
        ) {
          console.log('CountryName', 'Lebanon')
          window.localStorage.setItem('CountryName', 'Lebanon')
          window.localStorage.setItem(
            'country',
            JSON.stringify({
              CountryID: 119,
            })
          )

          if (window.localStorage.getItem('language') == '') {
            window.localStorage.setItem(
              'language',
              JSON.stringify({
                lang: 'eng',
                lang_id: 2,
              })
            )
          }

          if (window.location.host == 'empirepremiere.com') {
            window.localStorage.setItem('PREIMERE', true)
          } else if (window.location.host == 'lb.empirecinemas.com') {
            window.localStorage.setItem('PREIMERE', false)
          }

          if (
            window.localStorage.getItem('footer') == null ||
            window.localStorage.getItem('footer') == '' ||
            window.localStorage.getItem('footer') == undefined
          ) {
            window.localStorage.setItem('footer', '1')
            window.location.reload()
          }
        } else if (window.location.host == 'ksa.empirecinemas.com') {
          console.log('CountryName', 'Saudi Arabia')
          window.localStorage.setItem('CountryName', 'Saudi Arabia')
          window.localStorage.setItem(
            'country',
            JSON.stringify({
              CountryID: 230,
            })
          )
          if (window.localStorage.getItem('language') == '') {
            window.localStorage.setItem(
              'language',
              JSON.stringify({
                lang: 'eng',
                lang_id: 2,
              })
            )
          }

          window.localStorage.setItem('PREIMERE', false)

          if (
            window.localStorage.getItem('footer') == null ||
            window.localStorage.getItem('footer') == '' ||
            window.localStorage.getItem('footer') == undefined
          ) {
            window.localStorage.setItem('footer', '1')
            window.location.reload()
          }
        } else if (window.location.host == 'irq.empirecinemas.com') {
          console.log('CountryName', 'Iraq')
          window.localStorage.setItem('CountryName', 'Iraq')
          window.localStorage.setItem(
            'country',
            JSON.stringify({
              CountryID: 102,
            })
          )
          if (window.localStorage.getItem('language') == '') {
            window.localStorage.setItem(
              'language',
              JSON.stringify({
                lang: 'eng',
                lang_id: 2,
              })
            )
          }

          window.localStorage.setItem('PREIMERE', false)

          if (
            window.localStorage.getItem('footer') == null ||
            window.localStorage.getItem('footer') == '' ||
            window.localStorage.getItem('footer') == undefined
          ) {
            window.localStorage.setItem('footer', '1')
            window.location.reload()
          }
        }
      }
    },
    goBackHistory () {
      this.$root.$emit('bv::hide::modal', 'sessionTimeOut')
      this.$router.go(-1)
    },
    onClickChange () {
      window.location.href = 'https://empirecinemas.com'
    },
    onClickOk: function () {
      this.$router.go(-1)
      this.$refs.errorModal.hide()
    },
    onclickpremiere: function (type) {
      this.showLoading()
      let value = false

      if (window.location.host == 'empirepremiere.com') {
        window.location.replace('http://lb.empirecinemas.com')
      } else {
        window.location.replace('http://empirepremiere.com')
      }
      // if (type == "pre") {
      //   value = true;
      // } else {
      //   value = false;
      // }
      // window.localStorage.setItem("PREIMERE", value);
      // // window.location.reload();
      // window.location.pathname = "/";
      // this.hideLoading();
    },

    onSelectDate: function (value, type) {
      if (type == 'date') {
        this.birthDate.date1 = value
      } else if (type == 'month') {
        this.birthDate.month = value
      } else if (type == 'year') {
        this.birthDate.year = value
      }
      // this.getAge(
      //   this.birthDate.year +
      //     "/" +
      //     this.birthDate.month +
      //     "/" +
      //     this.birthDate.date1
      // );
    },
    closeAdvt: function () {
      this.$root.$emit('bv::hide::modal', 'advtModal')
    },
    hideLoginModal: function () {
      this.$refs['signInModal'].hide()
    },
    onChangeGender: function (gender) {
      this.userDetails.gender = gender
      if (this.userDetails.gender != 'Gender') {
        this.errorGender = ''
      }
    },
    openSidenav: function () {
      if (window.localStorage.getItem('cinemaD')) {
        this.isClickedOnNowShowing()
      }
      this.openAside = this.openAside == '0px' ? '-300px' : '0px'
      let el = document.body
      if (this.openAside == '0px') {
        el.classList.add('oh')
        this.overlay = true
      } else {
        el.classList.remove('oh')
        this.overlay = false
      }
    },
    onClickComingSoon () {
      this.openAside = this.openAside == '0px' ? '-300px' : '0px'
      let el = document.body
      el.classList.remove('oh')
      this.overlay = false
      $('html,body').animate(
        {
          // scrollTop: $("#comimgSoon").offset().top,
        },
        'slow'
      )
      this.IsActivedrop = false
    },
    topNavHandler: function () {
      this.openSearch(false)
    },
    openSearch: function (status) {
      // this.hideSearch = this.hideSearch == "0vh" ? "-100vh" : '0vh';
      if (status) {
        if (this.hideSearch == '0vh') {
          this.hideSearch = '-100vh'
        } else {
          this.hideSearch = '0vh'
        }
      } else if (!status) {
        this.hideSearch = '-100vh'
      }
    },
    searchData: function () {
      if (this.searchValue.length > 0) {
        this.searchAPI()
      } else {
        this.movieListSearch = []
      }
    },
    searchAPI: function () {
      // makeRequest(
      //     `/bnapi/searchresult.php?term=` + this.searchValue,
      //     "GET",
      //     null,
      //     null
      //   )
      makeRequest(`/Search?term=` + this.searchValue, 'GET', null, null)
        .then((result) => {
          this.movieListSearch = result.res.data
        })
        .catch((error) => {
          console.log('Google Login Error', error)
        })
    },
    callCheckoutEvent: function () {
      console.log('this.userDetails >>>>>>><<<<<<:', this.userDetails)
      // this.$refs.checkoutModal.hide();
      if (this.userDetails.selectedCard === 'VisaMaster') {
        this.userDetails.redirectURL = '/RedirectPayment'
      } else if (this.userDetails.selectedCard === 'AmericanExpress') {
        this.userDetails.redirectURL = '/RedirectPaymentamax'
      }
      EventBus.$emit('checkOutEvent', this.userDetails)
    },
    checkoutProcess: function () {
      this.handleCheckout = true
      let token = TokenService.getToken()
      // if (token) {
      if (token && this.loggedInFlag) {
        this.getUserDetails()
        this.$refs.checkoutModal.show()
      } else {
        this.$refs.signInModal.show()
      }
    },
    getCountryCode: function () {
      let self = this
      //
      axios
        .get('https://ipapi.co/json')
        .then(function (response) {
          // handle success
          self.countryData = response.data
          // self.userDetails.countryCode = response.data.country_calling_code.substr(
          //   1
          // );
          console.log(response)
        })
        .catch(function (error) {
          // handle error
          console.log(error)
        })
    },
    onGoogleSignInSuccess (googleUser) {
      console.log('Google Response >>>>>>>>>>>>>', googleUser)
      // makeRequest(`/app/SocialLogins`, "POST", null, {
      //     socialType: "Google",
      //     socialToken: googleUser.Zi.id_token
      // })
      //     .then(result => {
      //     console.log("Check Socal Google response From here ", result);
      //     const { error, res } = result;
      //     const { data } = res.data;
      //     if (!error && res.data.status && data.result.Status) {
      //         console.log("Social Response >>>>>>", data);
      //         $("#signin-page").modal("hide");
      //         $("#signup-page").modal("hide");
      //         this.userName = data.result.UserName;
      //         EventBus.$emit("UserLogged", {
      //         status: true,
      //         userName: data.result.UserName
      //         });
      //     } else {
      //         this.socialLoginError.error = data.result.Message;
      //         setTimeout(() => {
      //         this.socialLoginError.error = "";
      //         }, 5000);
      //     }
      //     })
      //     .catch(error => {
      //     console.log("Google Login Error", error);
      //     });

      const profile = googleUser.getBasicProfile()
      console.log('Works >>>>>>>>', profile)
      makeRequest(`/SocialLogins`, 'POST', null, {
        FireBaseID: '',
        TokenFrom: 'Google',
        stoken: googleUser.wc
          ? googleUser.wc.id_token
          : googleUser.Zi
            ? googleUser.Zi.id_token
            : googleUser.uc
              ? googleUser.uc.id_token
              : googleUser.xc
                ? googleUser.xc.id_token
                : null,
        // stoken: googleUser.Zi.id_token
      })
        .then((result) => {
          // console.log("Check Socal Google response From here ", result);
          // TokenService.saveToken(res.data.access_token);
          this.loginUser(result.res.data.access_token)
          // this.loggedInFlag = true;
          // window.location = "/";
        })
        .catch((error) => {
          console.log('Google Login Error', error)
        })
    },
    onGoogleSignInError (error) {
      // `error` contains any error occurred.
      console.log('OH NOES', error)
      this.socialLoginError.error = 'Oops, Something went wrong'
      setTimeout(() => {
        this.socialLoginError.error = ''
      }, 5000)
    },
    onSignFBInSuccess (response) {
      console.log(`onSignFBInSuccess`, response)
      // makeRequest(`/app/SocialLogins`, "POST", null, {
      //     socialType: "Facebook",
      //     socialToken: response.authResponse.accessToken
      // })
      //     .then(result => {
      //     console.log("Check Socal Google response From here ", result);
      //     const { error, res } = result;
      //     const { data } = res.data;
      //     if (!error && res.data.status && data.result.Status) {
      //         console.log("Social Response >>>>>>", data);
      //         this.userName = data.result.UserName;
      //         $("#signin-page").modal("hide");
      //         $("#signup-page").modal("hide");
      //         EventBus.$emit("UserLogged", {
      //         status: true,
      //         userName: data.result.UserName
      //         });
      //     } else {
      //         this.socialLoginError.error = data.result.Message;
      //         setTimeout(() => {
      //         this.socialLoginError.error = "";
      //         }, 5000);
      //     }
      //     })
      //     .catch(error => {
      //     console.log("Google Login Error", error);
      //     });

      makeRequest(`/SocialLogins`, 'POST', null, {
        FireBaseID: '',
        TokenFrom: 'Facebook',
        stoken: response.authResponse.accessToken,
      })
        .then((result) => {
          console.log('Check Socal Facebook response From here ', result)
          // send token to loginuser
          this.loginUser(result.res.data.access_token)
          // result has
        })
        .catch((error) => {
          console.log('Face book Login Error', error)
        })
      FB.api('/me', (data) => {
        console.log('Facebook Data ', data)
      })
    },
    onSignFBInError (error) {
      console.log('OH NOES', error)
      this.socialLoginError.error = 'Whoops, !Something went wrong'
      setTimeout(() => {
        this.socialLoginError.error = ''
      }, 5000)
    },
    reloadWindow: function () {
      window.location.reload()
    },
    hideSignIn: function () {
      this.$refs.signInModal.hide()
    },
    hideSignUp: function () {
      this.$refs.signUpModal.hide()
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
    validateBeforeSubmit (scope) {
      if (scope == 'signIn') {
        this.showLoading()
        this.$validator.validateAll(scope).then((result) => {
          if (result) {
            let payload = {
              username: this.userDetails.email,
              password: this.userDetails.password,
              // Mobile: this.userDetails.phoneNumber,
              // CountryCode: this.userDetails.countryCode || "91"
            }
            makeRequest('/UserLoginNew', 'POST', null, payload)
              .then((response) => {
                const { error, res } = response
                if (!error && res.data.Status) {
                  this.handleCheckout = false
                  this.loginUser(res.data.access_token)
                  this.modal.signIn.info = false
                  // this.modal.signIn.OTP = true;
                  if (res.data.hasOwnProperty('LoyaltyCustomerVerfiy')) {
                    localStorage.setItem(
                      'LoyaltyCustomerVerfiy',
                      res.data.LoyaltyCustomerVerfiy
                    )

                    if (
                      res.data.LoyaltyCustomerVerfiy == 0 ||
                      res.data.LoyaltyCustomerVerfiy == '0'
                    ) {
                      EventBus.$emit('openLyoyaltyprogrampopup', true)
                    } else {
                      console.log('object')
                    }
                    EventBus.$emit('getCheckLoyality', true)
                  }
                } else {
                  this.errorMessage.login = res.data.Message
                }
                this.hideLoading()
              })
              .catch((error) => {
                this.hideLoading()
                console.log('Error', error)
                //   resolve(null);
              })
          }
        })
      }
      if (scope == 'signUp') {
        this.showLoading()
        // this.errorDob = "";
        // this.errorGender = "";
        // let count = 0;
        this.$validator
          .validateAll(scope)
          .then((result) => {
            // if (
            //   this.birthDate.date1 == "Date" ||
            //   this.birthDate.month == "Month" ||
            //   this.birthDate.year == "Year"
            // ) {
            //   this.errorDob = "show";
            //   count = 1;
            // }
            // if (this.userDetails.gender == "Gender") {
            //   this.errorGender = "Please Select Gender";
            //   count = 1;
            // }

            // if (count > 0) {
            //   return false;
            // }

            if (result) {
              let payload = {
                Verify_Type: 'Email',
                Email: this.userDetails.email,
                Mobile: this.userDetails.phoneNumber.trim().split(' ').join(''),
                Password: this.userDetails.password,
                RePassword: this.userDetails.confirmedPassword,
                FirstName: this.userDetails.firstName,
                LastName: this.userDetails.lastName,
                Birthdate: this.userDetails.birthDate,
                Gender: this.userDetails.gender,
                newslatteremempirecinemanotification1:
                  this.userDetails.newslatteremempirecinemanotification1 == true
                    ? 1
                    : 0,
                FireBaseID: '',
                // Gender: this.userDetails.gender,
                CountryCode: this.userDetails.CountryCode || '91',
                // Birthdate:
                //   this.birthDate.date1 +
                //   "-" +
                //   this.birthDate.month +
                //   "-" +
                //   this.birthDate.year,
              }
              // console.log("payloadpayloadpayloadpayload EMPNEW :>> ", payload);
              if (this.userDetails.acceptedTerms) {
                makeRequest('/UserRegistrationNew', 'POST', null, payload)
                  .then((response) => {
                    console.log('response :', response)
                    const { error, res } = response
                    if (!error && res.data.Status) {
                      // Switch to OTP section
                      this.modal.signUp.info = false
                      this.modal.signUp.OTP = true
                      // this.verifyUser();
                    } else {
                      this.errorMessage.signUp = res.data.Message
                    }
                  })
                  .catch((error) => {
                    console.log('Error', error)
                    //   resolve(null);
                  })
              } else {
                // Show Message
              }
              this.hideLoading()
              // alert("Form Submitted!");
            } else {
              this.hideLoading()
            }
          })
          .catch((error) => {
            this.hideLoading()
            console.log('on Validation Error', error)
          })
      }
      if (scope == 'forgotPasswordEmail') {
        this.$validator.validateAll(scope).then((result) => {
          if (result) {
            this.errorMessage.forgotpassword = ''
            let payload = {
              email: this.userDetails.email,
            }
            makeRequest('/EmailVerification', 'POST', null, payload)
              .then((response) => {
                const { error, res } = response
                if (!error && res.data.Status) {
                  this.$refs.forgotpaswordotp.show()
                  this.userDetails.ResetToken = res.data.Data[0].token
                } else {
                  this.errorMessage.forgotpassword = res.data.Message
                }
              })
              .catch((error) => {
                console.log('Error', error)
                this.errorMessage.forgotpassword = error

                //   resolve(null);
              })
            // alert("Form Submitted!");
          }
        })
      }
      if (scope == 'forgotPasswordOTP') {
        this.$validator.validateAll(scope).then((result) => {
          if (result) {
            this.errorMessage.forgotpassword = ''
            let payload = {
              OTP: this.userDetails.OTP,
              ResetToken: this.userDetails.ResetToken,
            }
            makeRequest('/ResetPassOTPVerify', 'POST', null, payload)
              .then((response) => {
                const { error, res } = response
                if (!error && res.data.Status) {
                  this.$refs.forgotpaswordreset.show()
                } else {
                  this.errorMessage.forgotpassword = res.data.Message
                }
              })
              .catch((error) => {
                console.log('Error', error)
                this.errorMessage.forgotpassword = error

                //   resolve(null);
              })
            // alert("Form Submitted!");
            return
            ;``
          }
        })
      }
      if (scope == 'forgotPasswordreset') {
        this.$validator.validateAll(scope).then((result) => {
          if (result) {
            this.errorMessage.forgotpassword = ''
            let payload = {
              NewPassword: this.userDetails.password,
              ConfirmPassword: this.userDetails.confirmedPassword,
              ResetToken: this.userDetails.ResetToken,
            }
            makeRequest('/ResetPassword', 'POST', null, payload)
              .then((response) => {
                const { error, res } = response
                if (!error && res.data.Status) {
                  this.$refs.forgotpaswordreset.hide()
                } else {
                  this.errorMessage.forgotpassword = res.data.Message
                }
              })
              .catch((error) => {
                console.log('Error', error)
                this.errorMessage.forgotpassword = error

                //   resolve(null);
              })
            // alert("Form Submitted!");
          }
        })
      }
      if (scope == 'signUpVerifyOTP') {
        this.verifyUser()
      }
      if (scope == 'checkoutUser') {
        this.$validator.validateAll(scope).then((result) => {
          console.log('result :', result)
          // if (result) {
          //   this.callCheckoutEvent();
          // }
          if (result) {
            if (this.countryCode != '230' || this.countryCode != 230) {
              this.userDetails.selectedCard = 'VisaMaster'
              this.userDetails.redirectURL = '/RedirectPayment'
              // this.callCheckoutEvent();
            } else {
              this.showCards = false
              this.hideCards = true
            }
          }
        })
      }
    },

    verifyUser: function () {
      console.log('Inside the Verify')
      let payload = {
        Verify_Type: 'Email',
        Email: this.userDetails.email,
        Mobile: this.userDetails.phoneNumber.trim().split(' ').join(''),
        Password: this.userDetails.password,
        RePassword: this.userDetails.confirmedPassword,
        FirstName: this.userDetails.firstName,
        LastName: this.userDetails.lastName,
        // CountryCode: 91,
        // OTP: "1234", // this.userDetails.OTP,
        OTP: this.userDetails.OTP,
        FireBaseID: '',
        UserName: this.userDetails.email,
      }
      makeRequest('/api/Account/Verifyme', 'POST', null, payload)
        .then((response) => {
          console.log('Inside the Verify response', response)
          const { error, res } = response
          if (!error) {
            if (res.data.Status) {
              localStorage.setItem('LoyaltyCustomerVerfiy', 0)
              this.handleCheckout = false
              if (
                res.data.LoyaltyCustomerVerfiy == 0 ||
                res.data.LoyaltyCustomerVerfiy == '0'
              ) {
                EventBus.$emit('openLyoyaltyprogrampopup', true)
              } else {
                EventBus.$emit('getCheckLoyality', true)
              }
              this.loginUser(res.data.access_token)
            }
            // handle if error
          }
        })
        .catch((error) => {
          console.log('Error', error)
          //   resolve(null);
        })
      // alert("Form Submitted!");
    },

    getPromotionList: function () {
      makeRequest('/promotion', 'POST', null, {})
        .then((result) => {
          const { error, res } = result
          if (!error && res.status) {
            if (
              res.data &&
              res.data.Advertisement &&
              res.data.Advertisement.length > 0
            ) {
              this.promotionData = res.data.Advertisement[0]
              if (window.location.pathname == '/') {
                this.$root.$emit('bv::show::modal', 'advtModal')
              }

              if (this.promotionData) {
                if (
                  sessionStorage.getItem('MODAL') == undefined ||
                  sessionStorage.getItem('MODAL') == null ||
                  sessionStorage.getItem('MODAL') == ''
                ) {
                  sessionStorage.setItem('MODAL', '1')
                  this.$root.$emit('bv::show::modal', 'advtModal')
                }
              }
            }
          } else {
            console.log('error from res', res.message)
          }
        })
        .catch((error) => {
          console.log('Error on vue front', error)
        })
    },

    // getUserDetails: function (callback) {
    //   let token = TokenService.getToken();
    //   let payload = {};
    //   makeRequest("/ProfileData", "POST", token, payload)
    //     .then((result) => {
    //       const { error, res } = result;
    //       if (!error && res.status) {
    //         this.userDetails.email = res.data.Email;
    //         this.userDetails.phoneNumber = res.data.Mobile;
    //         this.userDetails.userName = res.data.UserName;
    //         this.profileDetails = res.data;
    //         this.loggedInFlag = true;
    //         if (callback) {
    //           callback();
    //         }
    //         //   this.userDetails.profilePic =
    //         //       data.userDetails.ProfileURl.length > 0
    //         //           ? data.userDetails.ProfileURl
    //         //           : "/images/svg/icon-profile.svg";
    //         //   this.loginData.loginInput.email = data.userDetails.Email;
    //       } else {
    //         console.log("error from res", res.message);
    //       }
    //     })
    //     .catch((error) => {
    //       console.log("Error on vue front", error);
    //     });
    // },

    getUserDetails: function (callback) {
      let token = TokenService.getToken()
      let payload = {}
      makeRequest('/ProfileDataNew', 'POST', token, payload)
        .then((result) => {
          const { error, res } = result
          if (!error && res.status) {
            this.userDetails.userID = res.data.UserID
            this.userDetails.email = res.data.Email
            this.userDetails.phoneNumber = res.data.Mobile
            this.userDetails.userName = res.data.UserName
            // this.profileDetails = res.data.FirstName;
            this.profileDetails = res.data
            this.$store.commit('storeLoginS')

            console.log(
              'this.profileDetails :>>CountryISOText>> ',
              this.profileDetails
            )
            if (res.data.CountryISOCode) {
              let CountryISOText = res.data.CountryISOCode.toUpperCase()
              this.selectedCountry = CountryISOText
                ? CountryISOText.toString()
                : ''
            }

            this.loggedInFlag = true
            console.log(
              'profileDetailsprofileDetails 4444444444444444:>> ',
              this.profileDetails
            )
            if (this.$route.path == '/login') {
              // this.$router.go(-1)
              localStorage.setItem('isSignupLogin', 1)
              this.$router.push('/phoneotp')
            }
            // console.log(this.$route, "hjhj");

            if (callback) {
              callback()
            }
            //   this.userDetails.profilePic =
            //       data.userDetails.ProfileURl.length > 0
            //           ? data.userDetails.ProfileURl
            //           : "/images/svg/icon-profile.svg";
            //   this.loginData.loginInput.email = data.userDetails.Email;
          } else {
            console.log('error from res', res.message)
          }
        })
        .catch((error) => {
          console.log('Error on vue front', error)
        })
    },
    onUserLogout () {
      window.localStorage.removeItem('access_token')
      window.localStorage.removeItem('LoyaltyCustomerVerfiy')
      window.localStorage.setItem('changeTabProfile', 0)
      window.location.pathname = '/'
      this.loggedInFlag = false
      this.isProfileDropdownActive = false
    },
    checkToken: function () {
      let token = TokenService.getToken()
      if (token) {
        this.loggedInFlag = true
      }
    },
  },
}
</script>
<style></style>
