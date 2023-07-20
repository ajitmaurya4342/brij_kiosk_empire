<template>
  <div class="white-grey-section header-space">
    <div v-if="ShowOTPPage == true">
      <OtpPage
        :otpPayLoadData="otpPayLoadArray"
        :ShowWelcomeText="ShowWelcomeText"
      />
    </div>
    <div class="container my-5" v-else>
      <div class="row">
        <div class="col-lg-12 mx-auto justify-content-center">
          <!-- TAB SECTION START-->
          <div>
            <ul class="list-inline mx-auto mb-0 newProfileTabs loginTabs">
              <li class="list-inline-item">
                <div
                  class="btn emp-grey-btn"
                  :class="loginTab ? 'active' : ''"
                  @click="switchPopupTab('login')"
                >
                  {{
                    checkoutTabClicked == "Yes"
                      ? "Checkout as Guest"
                      : allLanguageData.CommonModalInputs.Login
                  }}
                  <!-- {{ allLanguageData.Login }} -->
                </div>
              </li>
              <li class="list-inline-item">
                <div
                  v-if="!isFromBooking"
                  class="btn emp-grey-btn"
                  :class="signupTab ? 'active' : ''"
                  @click="switchPopupTab('signup')"
                >
                  {{ allLanguageData.CommonModalInputs.SignUp }}
                </div>
              </li>
              <!-- <li class="list-inline-item">
                <div
                  v-if="!isFromBooking"
                  class="btn emp-grey-btn"
                  :class="guestTab ? 'active' : ''"
                  @click="switchPopupTab('guest')"
                >
                  Guest

                </div>
              </li> -->
            </ul>
          </div>
          <!-- TAB SECTION END-->
          <div
            class="mx-auto auth-form-box px-lg-5 my-lg-5 py-3"
            :class="loginTab ? 'col-12' : 'col-12'"
          >
            <div class="row ">
              <!-- LOGIN SECTION START -->
              <div class="col-12 col-md-7 mb-3 mb-md-0 auth-form">
                <!-- LOGIN FORM  -->
                <div v-if="loginTab">
                  <div class="title pt-3">
                    {{ allLanguageData.LoginTabTitle }}
                  </div>
                  <b-form
                    @submit.prevent="validateBeforeSubmit('signIn')"
                    data-vv-scope="signIn"
                    class="mt-5"
                  >
                    <div
                      class="
                        text-center text-danger
                        small
                        mb-2
                        font-weight-bold
                      "
                    >
                      {{ errorMessage.login }}
                    </div>
                    <div class="mb-5">
                      <b-form-input
                        v-validate="'required|email'"
                        name="username"
                        v-model="userDetails.email"
                        type="text"
                        :placeholder="allLanguageData.EMAIL"
                      ></b-form-input>
                      <div
                        v-show="errors.has('signIn.username')"
                        class="errorMessage text-danger"
                      >
                        {{ errors.first("signIn.username") }}
                      </div>
                    </div>

                    <div class="mb-5">
                      <b-form-input
                        name="password"
                        v-model="userDetails.password"
                        v-validate="'required'"
                        type="password"
                        :placeholder="allLanguageData.PASSWORD"
                      ></b-form-input>
                      <div
                        v-show="errors.has('signIn.password')"
                        class="errorMessage text-danger"
                      >
                        {{ errors.first("signIn.password") }}
                      </div>
                    </div>

                    <div
                      class="d-flex justify-content-between align-items-center"
                    >
                        <div>
                          <input
                            type="submit"
                            class="btn emp-red-btn custom-login-btn"
                            :value="allLanguageData.Login"
                          />
                        </div>
                        <div>
                      <router-link
                        to="/forgot-password"
                        v-if="!isFromBooking"
                        class="f-pass-text"
                      >
                        {{ allLanguageData.CommonModalFooter.ForgotPassword }}
                      </router-link>
                      <div>
                        <button
                          v-if="isFromBooking == 'Yes'"
                          class="btn emp-red-btn"
                          @click="switchPopupTab('guest')"
                        >
                          CHECKOUT AS GUEST
                        </button>
                      </div>
                    </div>


                      <!-- <div
                  v-if="!isFromBooking"
                  class="btn emp-grey-btn"
                  :class="guestTab ? 'active' : ''"

                >
                  Guest

                </div> -->
                      <!-- to="/forgot-password" -->
                    </div>
                    <!-- <p class="text-center">OR</p> -->


                  </b-form>
                </div>
                <!-- LOGIN FORM END -->
                <!-- SIGNUP SECTION START -->
                <div v-if="signupTab" class="signup-form">
                  <!-- SIGNUP FORM  -->
                  <b-form
                    v-if="modal.signUp.info"
                    @submit.prevent="validateBeforeSubmit('signUp')"
                    data-vv-scope="signUp"
                  >
                    <div
                      class="
                        text-center text-danger
                        small
                        mb-2
                        font-weight-bold
                      "
                    >
                      {{ errorMessage.signUp }}
                    </div>
                    <div class="address-grid-half">
                      <div class="mb2_5">
                        <b-form-input
                          type="text"
                          v-validate="'required'"
                          v-model="userDetails.firstName"
                          :placeholder="allLanguageData.FName"
                          name="firstname"
                        ></b-form-input>
                        <div
                          v-show="errors.has('signUp.firstname')"
                          class="errorMessage text-danger"
                        >
                          {{ errors.first("signUp.firstname") }}
                        </div>
                      </div>
                      <div class="mb2_5">
                        <b-form-input
                          type="text"
                          v-validate="'required'"
                          v-model="userDetails.lastName"
                          :placeholder="allLanguageData.LName"
                          name="lastname"
                        ></b-form-input>
                        <div
                          v-show="errors.has('signUp.lastname')"
                          class="errorMessage text-danger"
                        >
                          {{ errors.first("signUp.lastname") }}
                        </div>
                      </div>
                    </div>
                    <div class="mb2_5">
                      <b-form-input
                        type="text"
                        v-validate="'required|email'"
                        name="email"
                        v-model="userDetails.email"
                        :placeholder="allLanguageData.EMAIL"
                        ref="email"
                      ></b-form-input>
                      <div
                        v-show="errors.has('signUp.email')"
                        class="errorMessage text-danger"
                      >
                        {{ errors.first("signUp.email") }}
                      </div>
                    </div>
                    <div class="address-grid-half">
                      <div class="mb2_5">
                        <b-form-input
                          type="password"
                          v-validate="'required'"
                          v-model="userDetails.password"
                          name="password"
                          :placeholder="allLanguageData.CreatePassword"
                          ref="password"
                        ></b-form-input>
                        <div
                          v-show="errors.has('signUp.password')"
                          class="errorMessage text-danger"
                        >
                          {{ errors.first("signUp.password") }}
                        </div>
                      </div>

                      <div class="mb2_5">
                        <b-form-input
                          type="password"
                          v-validate="'required|confirmed:password'"
                          v-model="userDetails.confirmedPassword"
                          :placeholder="allLanguageData.confirmPassword"
                          name="confirmpassword"
                        ></b-form-input>
                        <div
                          v-show="errors.has('signUp.confirmpassword')"
                          class="errorMessage text-danger"
                        >
                          {{ errors.first("signUp.confirmpassword") }}
                        </div>
                      </div>
                    </div>
                    <div class="col-12 px-0 col-md-12 my-4">
                      <label class="address-label font-weight-bold">
                        {{ allLanguageData.ADDRESSDETAILS }}
                      </label>
                      <div class="country-city-grid">
                        <div>
                          <!-- <small class="d-block fw-500"> Country </small>
                        <b-form-select
                          v-validate="'required'"
                          id="CountryID"
                          name="CountryID"
                          :options="contryOptions"
                          v-model="userDetails.CountryID"
                        ></b-form-select> -->

                          <multiselect
                            v-model="userDetails.CountryID"
                            :options="contryOptions"
                            label="text"
                            track-by="value"
                            class="custom-multiselect address-grid-dropdown"
                            :select-label="''"
                            :deselect-label="''"
                            :placeholder="allLanguageData.SELECTCOUNTRY"
                            :selectedLabel="''"
                          >
                          </multiselect>
                          <div
                            v-if="countryIdError"
                            class="errorMessage text-danger"
                          >
                            The Contry field is required
                          </div>
                        </div>
                        <div>
                          <multiselect
                            v-model="userDetails.CityID"
                            :options="cityOptions"
                            label="text"
                            track-by="value"
                            class="custom-multiselect address-grid-dropdown"
                            :select-label="''"
                            :deselect-label="''"
                            :placeholder="allLanguageData.SELECTSTATE"
                            :selectedLabel="''"
                          >
                          </multiselect>
                          <div
                            v-if="cityIdError"
                            class="errorMessage text-danger"
                          >
                            The State field is required
                          </div>
                        </div>

                        <!-- :placeholder="allLanguageData.country" -->
                      </div>
                    </div>

                    <div class="mb2_5 grid-half">
                      <div
                        class="login_title d-none d-md-block font-weight-bold"
                      >
                        {{ allLanguageData.MobileNumber }}
                      </div>
                      <!-- {{ userDetails.countryCode }} -->
                      <vue-phone-number-input
                        default-country-code="SA"
                        color="red"
                        @update="resultsExample = $event"
                        v-model="userDetails.phoneNumber"
                      />
                      <!-- <vue-tel-input
                        defaultCountry="SA"
                        v-model="userDetails.phoneNumber"
                        :inputOptions="{
                          maxlength: 10,
                          name: 'phonenumber',
                        }"
                        mode="national"
                        :autoFormat="false"
                        placeholder=""
                        @input="onPhoneNumberInput"
                        class="form-control grid-emp-tel"
                      ></vue-tel-input> -->

                      <!-- <small class="d-block fs-10 text-right"
                        >{{ allLanguageData.CommonModalInputs.Example }}:
                        711231233</small
                      > -->
                    </div>
                    <div
                      v-if="phoneNumberError"
                      class="errorMessage text-danger mb-2 pt-0"
                    >
                      {{ phoneNumberErrorMsg }}
                    </div>
                    <!-- <div class="row mb-2">
                  <div class="col-7 pr-0">
                    <b-form-input
                      v-model="text"
                      placeholder="Enter your name"
                    ></b-form-input>
                  </div>
                  <div class="col-5 pl-0">
                    <vue-tel-input
                      v-model="phone"
                      class="pl-0 form-control"
                    ></vue-tel-input>
                  </div>
                </div> -->
                    <div class="my-4">
                      <div class="emp_new_checkbox mb-2">
                        <input
                          type="checkbox"
                          id="checkboxnew"
                          v-model="
                            userDetails.newslatteremempirecinemanotification1
                          "
                        />
                        <label for="checkboxnew" class="check"></label>
                        <label for="checkboxnew" class="check_text">
                          {{ allLanguageData.signupagree1 }}
                        </label>
                      </div>

                      <div class="emp_new_checkbox">
                        <input
                          v-validate="'required'"
                          :required="true"
                          name="terms"
                          v-model="userDetails.acceptedTerms"
                          id="checkboxNew"
                          type="checkbox"
                        />
                        <label for="checkboxNew" class="check mb-0"></label>
                        <label for="checkboxNew" class="check_text">
                          {{ allLanguageData.signupagree2 }}
                          <!-- <router-link
                        to="/terms-condition"
                        target="_blank"
                        class="font-weight-bold"
                      >
                        <span class="font-weight-bold text-newRed">*</span></router-link
                      > -->
                        </label>
                      </div>
                      <div class="errorMessage text-danger">
                        {{
                          userDetails.acceptedTerms
                            ? ""
                            : "Please accept Terms and Conditions"
                        }}
                      </div>
                    </div>
                    <div
                      class="d-flex justify-content-between align-items-center"
                    >
                      <input
                        type="submit"
                        class="btn emp-red-btn"
                        :value="allLanguageData.CommonModalInputs.SignUp"
                      />
                      <div
                        v-if="isFromBooking == 'Yes'"
                        class="title f-pass-text"
                        @click="switchPopupTab('guest')"
                      >
                        CHECKOUT AS GUEST
                      </div>
                    </div>
                  </b-form>

                  <b-form
                    v-if="modal.signUp.OTP"
                    @submit.prevent="validateBeforeSubmit('signUpVerifyOTP')"
                    data-vv-scope="signUpVerifyOTP"
                  >
                    <div class="row my-2 mx-0">
                      <b-form-input
                        type="number"
                        v-validate="'required'"
                        v-model="userDetails.OTP"
                        placeholder="Please enter the code sent to your email address"
                        class="my-3"
                      />
                    </div>
                    <input
                      type="submit"
                      class="btn emp-red-btn"
                      :value="submitText"
                    />
                  </b-form>
                  <!-- SIGNUP FORM END -->
                  <div class="mt-3">
                    <!-- <div
                    class="btn emp-grey-btn px-0 min-w-auto"
                    @click="switchPopupTab('login')"
                  >
                    BACK TO SIGN IN
                  </div> -->
                  </div>
                </div>
                <!-- SIGNUP SECTION END -->
                <div v-if="guestTab" class="guest-form">
                  <!-- GUEST FORM  -->
                  <div class="title pt-3">
                    Your ticket(s) will be sent to you on your email address and
                    mobile number!
                  </div>
                  <b-form
                    @submit.prevent="validateBeforeSubmit('checkoutGuest')"
                    data-vv-scope="checkoutGuest"
                    class="mt-5"
                  >
                    <div
                      class="
                        text-center text-danger
                        small
                        mb-2
                        font-weight-bold
                      "
                    ></div>
                    <div class="mb-5">
                      <b-form-input
                        v-validate="'required|email'"
                        name="checkOutUserEmail"
                        v-model="checkOutUserEmail"
                        type="text"
                        placeholder="EMAIL"
                      ></b-form-input>
                      <div
                        v-show="errors.has('checkoutGuest.checkOutUserEmail')"
                        class="errorMessage text-danger"
                      >
                        {{ errors.first("checkoutGuest.checkOutUserEmail") }}
                      </div>
                    </div>
                    <!-- <div class="col-12 col-md-6 mb-4">
                      <small class="d-block fw-500"> Country </small>
                      <b-form-select
                        v-validate="'required'"
                        id="CountryID"
                        name="CountryID"
                        :options="contryOptions"
                        v-model="userDetails.CountryID"
                      ></b-form-select>
                      <div
                        v-if="!userDetails.CountryID"
                        class="errorMessage text-danger"
                      >
                        The Country field is required
                      </div>
                      :placeholder="allLanguageData.country"
                    </div>
                    <div class="col-12 col-md-6 mb-4">
                      <small class="d-block fw-500"> City </small>
                      <b-form-select
                        v-validate="'required'"
                        id="CityID"
                        name="CityID"
                        :options="cityOptions"
                        v-model="userDetails.CityID"
                      ></b-form-select>
                      <div
                        v-if="!userDetails.CityID"
                        class="errorMessage text-danger"
                      >
                        The City field is required
                      </div>
                      :placeholder="allLanguageData.country"
                    </div> -->
                    <div class="col-12 px-0 col-md-12 my-4">
                      <label class="address-label font-weight-bold">
                        ADDRESS DETAILS
                      </label>
                      <div class="country-city-grid">
                        <div>
                          <!-- <small class="d-block fw-500"> Country </small>
                        <b-form-select
                          v-validate="'required'"
                          id="CountryID"
                          name="CountryID"
                          :options="contryOptions"
                          v-model="userDetails.CountryID"
                        ></b-form-select> -->

                          <multiselect
                            v-model="userDetails.CountryID"
                            :options="contryOptions"
                            label="text"
                            track-by="value"
                            class="custom-multiselect address-grid-dropdown"
                            :select-label="''"
                            :deselect-label="''"
                            placeholder="Select Country"
                            :selectedLabel="''"
                          >
                          </multiselect>
                          <div
                            v-if="countryIdError"
                            class="errorMessage text-danger"
                          >
                            The Contry field is required
                          </div>
                        </div>
                        <div>
                          <multiselect
                            v-model="userDetails.CityID"
                            :options="cityOptions"
                            label="text"
                            track-by="value"
                            class="custom-multiselect address-grid-dropdown"
                            :select-label="''"
                            :deselect-label="''"
                            placeholder="Select State"
                            :selectedLabel="''"
                          >
                          </multiselect>
                          <div
                            v-if="cityIdError"
                            class="errorMessage text-danger"
                          >
                            The State field is required
                          </div>
                        </div>

                        <!-- :placeholder="allLanguageData.country" -->
                      </div>
                    </div>
                    <div class="mb2_5 grid-half">
                      <div class="login_title">MOBILE NUMBER</div>
                      <!-- <vue-tel-input
                        defaultCountry="SA"
                        v-model="checkOutUserPhone"
                        :autoFormat="false"
                        :inputOptions="{
                          maxlength: 9,
                          name: 'checkOutUserPhone',
                        }"
                        :placeholder="allLanguageData.AddMobileNo"
                        class="form-control grid-emp-tel"
                      ></vue-tel-input> -->
                      <vue-phone-number-input
                        color="#cf1f2e"
                        default-country-code="SA"
                        @update="resultsExample = $event"
                        v-model="checkOutUserPhone"
                      />

                      <!-- <small class="d-block fs-10 text-right"
                        >{{ allLanguageData.CommonModalInputs.Example }}:
                        711231233</small
                      > -->
                    </div>

                    <div
                      v-if="phoneNumberError"
                      class="errorMessage text-danger mb-2 pt-0"
                    >
                      {{ phoneNumberErrorMsg }}
                    </div>

                    <div class="pt-4 pb-2">
                      <input
                        type="submit"
                        class="btn emp-red-btn"
                        value="CHECKOUT"
                      />
                    </div>
                  </b-form>
                  <!-- <div class="d-flex justify-conter-center text-center">
                    <fb-signin-button
                      :params="fbSignInParams"
                      @success="onSignFBInSuccess"
                      @error="onSignFBInError"
                      class="mr-3"
                    >
                      <div class="new_social_btn fb_btn">
                        <img
                          src="@/assets/img/new-img/svg-img/facebook-icon.svg"
                          class="pr-2"
                          width="30px"
                        />JOIN WITH FACEBOOK
                      </div>
                    </fb-signin-button>
                    <g-signin-button
                      :params="googleSignInParams"
                      @success="onGoogleSignInSuccess"
                      @error="onGoogleSignInError"
                    >
                      <div class="new_social_btn g_btn">
                        <img
                          src="@/assets/img/new-img/svg-img/google-icon-1.svg"
                          class="pr-2"
                          width="30px"
                        />
                        JOIN WITH GOOGLE
                      </div>
                    </g-signin-button>
                  </div> -->
                  <div class="title small-text pt-3">
                    ALREADY HAVE AN ACCOUNT?
                    <span class="f-pass-text" @click="switchPopupTab('login')">
                      LOGIN
                    </span>
                    • BECOME A LOYAL MEMBER!
                    <span class="f-pass-text" @click="switchPopupTab('signup')">
                      SIGN UP
                    </span>
                  </div>

                  <!-- GUEST FORM END -->
                </div>

                <div class="mt-3">
                  <div class="row">
                    <div class="col-6">
                      <!-- <div
                        class="btn emp-grey-btn px-0 min-w-auto"
                        @click="switchPopupTab('signup')"
                      >
                        GO TO SIGNUP
                      </div> -->
                    </div>
                    <div class="col-6">
                      <div
                        v-if="handleCheckout"
                        class="btn emp-grey-btn px-0 min-w-auto"
                        v-b-modal.guest
                      >
                        {{
                          allLanguageData.CommonModalFooter.CheckoutAsGuestOnly
                        }}
                      </div>

                      <!-- <p class="text-center mt-4" v-if="handleCheckout">
          {{ allLanguageData.CommonModalFooter.CheckoutAsGuest }}
          <router-link to class="text-white text-gold" v-b-modal.guest
            >GUEST</router-link
          >
        </p> -->
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-12 col-md-1 mb-3 mb-md-0">
                <div class="emp_new_orText">
                  <span class="py-3 mx-3 mx-md-0">OR</span>
                </div>
              </div>
              <div class="
                col-12 col-md-4
                mb-3 mb-md-0
                align-self-center
                text-center
              ">
                <div class="mobile-social-icons">
                  <fb-signin-button
                    :params="fbSignInParams"
                    @success="onSignFBInSuccess"
                    @error="onSignFBInError"
                    class="mb-3"
                  >
                    <div class="new_social_btn fb_btn">
                      <img
                        src="@/assets/img/new-img/svg-img/facebook-icon.svg"
                        v-bind:class="langName == 'ar' ? 'pl-2' : 'pr-2'"
                        width="30px"
                      />JOIN WITH FACEBOOK
                    </div>
                  </fb-signin-button>
                  <g-signin-button
                    :params="googleSignInParams"
                    @success="onGoogleSignInSuccess"
                    @error="onGoogleSignInError"
                  >
                    <div class="new_social_btn g_btn">
                      <img
                        src="@/assets/img/new-img/svg-img/google-icon-1.svg"
                        v-bind:class="langName == 'ar' ? 'pl-2' : 'pr-2'"
                        width="30px"
                      />
                      JOIN WITH GOOGLE
                    </div>
                  </g-signin-button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { makeRequest, makeRequestBrij } from '@/helper/internet.js'
import axios from 'axios'
import $ from 'jquery'
import OtpPage from '@/components/pages/otp.vue'
import { URL_BASE } from '@/helper/constant'
import contryCodes from '@/helper/contryCodes.js'
import {
  LanguageService,
  CountryService,
  TokenService,
} from '@/services/storage.service'
import { EventBus } from '@/main'
import { countries } from '../../helper/collection'
export default {
  props: {
    isFromBooking: String,
  },
  components: {
    OtpPage,
  },
  data () {
    return {
      isValidNumber: false,
      resultsExample: null,
      checkOutUserPhone: '',
      load: false,
      contryOptions: [
        // { value: null, text: "Please select Country", disabled: true },
      ],
      SelectedCountry: 'Select Country',

      cityOptions: [
        // { value: null, text: "Please select City", disabled: true },
      ],
      SelectedCity: 'Select City',
      otpPayLoadArray: [],
      otp: null,
      isDisabled: false,
      checkoutTabClicked: 'No',
      ShowOTPPage: false,
      ShowWelcomeText: false,
      isError: false,
      shouldResetOTP: false,
      isProfileDropdownActive: false,
      isMobileMenu: false,
      submitText: 'SUBMIT',
      signupTab: false,
      guestTab: false,
      isSendOtpClicked: false,
      isCheckOtpValid: false,
      isResendOtp: false,
      otpResponse: '',
      phoneNumberErr: false,
      countryIdError: false,
      cityIdError: false,
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
      phoneNumberError: false,
      phoneNumberErrorMsg: 'The mobile number field is required.',
      fbSignInParams: {
        scope: 'email,public_profile',
        return_scopes: true,
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
        CountryID: null,
        CityID: null,
        OTP: '',
        isVerfiymobile: false,
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
      emailReg:
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/,
      handleCheckout: false,
      errorDob: '',
      errorGender: '',

      // new
      cinemaList: [],
      selectedCinema: window.localStorage.getItem('headerCinema'),
      selectedCinemaID: window.localStorage.getItem('headerCinemaID'),
      checkOutUserEmail: '',
      checkOutUser: '',
      verification_id: ''
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
    // phoneNumberError: {
    //   handler(value) {
    //     if (value === true) {
    //       setTimeout(() => {
    //         this.phoneNumberError = false
    //       }, 5000)
    //     }
    //   },
    // },
    resultsExample: {
      handler (value) {
        console.log(value)
        this.isValidNumber = value.isValid
        if (this.isValidNumber) {
          this.phoneNumberError = false
        } else {
          this.phoneNumberError = true
        }
      },
    },
    'userDetails.CountryID': {
      handler (newCountry, oldCountry) {
        // console.log(newCountry,"hdhdh");
        this.userDetails.CountryID = newCountry
        if (this.load) {
          this.userDetails.CityID = this.userDetails.CityID
            ? this.userDetails.CityID
            : null
        } else {
          this.userDetails.CityID = null
        }
        this.cityOptions = []
        this.SelectedCity = 'Select City'
        console.log('newcontyr,', newCountry.value)

        this.fetchCities(newCountry.value)
        // this.cityOptions.push({
        //   value: null,
        //   text: "Please select City",
        //   disabled: true,
        // });
      },
    },
  },
  ChangeLoginStatusount () {
    this.fetchContries()
    console.log(token, 'dhdhdhdh')
    let token = TokenService.getToken()
    if (token) {
      this.getUserDetailsBrij()
    }
    this.countryCode = JSON.parse(
      window.localStorage.getItem('country')
    ).CountryID
    this.CountryName =
      window.localStorage.getItem('CountryName') || 'Select Country'
    this.getGeoLocation()
    // get lang token, set value in data
    // let token = TokenService.getToken()

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
    // this.fetchCinemaList();
    console.log(this.country_id)
    // this.fetchContries()
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

    this.fetchContries()
    // EventBus.$on("hideGuestCheckout", () => {
    //   this.handleCheckout = false;
    // });
  },
  computed: {},
  methods: {
    onDropdownCountry (country) {
      this.SelectedCountry = country.text
      this.userDetails.CountryID = country.value
    },
    onDropdownCity (city) {
      console.log(city)
      this.SelectedCity = city.text
      this.userDetails.CityID = city.value
    },
    fetchContries () {
      makeRequestBrij('/api/external/countries/', 'GET', null, null)
        .then((result) => {
          const { error, res } = result
          // const { data } = res.data
          console.log(res.data, 'res.data')

          this.contryOptions = res.data.data.map(z => {
            return {value: z.country_id, text: z.country_name}
          })

          console.log(this.contryOptions)

          let countryJson = localStorage.getItem('brij_country')
          if (countryJson) {
            countryJson = JSON.parse(countryJson)
          } else {
            countryJson = JSON.parse(localStorage.getItem('country'))
          }

          this.userDetails.CountryID = {
            value: countryJson.country_id,
            text: countryJson.country_name,

          }
          console.log(this.userDetails.CountryID, 'country_id')
          // this.contryOptions.push({
          //   value: null,
          //   text: "Please select Country",
          //   disabled: true,
          // });
        })
        .catch((err) => console.log(err))
    },
    fetchCities (countryId) {
      var config = {
        method: 'get',
        url: `${this.BrijBaseUrl}/api/admin/tablelist/ms_states?state_is_active=Y&country_id=${countryId}`,

      }

      axios(config)
        .then((result) => {
          const { error, data } = result
          if (data.Records && data.Records.length) {
            this.cityOptions = data.Records.map(val => {
              return {
                value: val.state_id || '',
                text: val.state_name || '',
              }
            })
          }
        })
        .catch(function (error) {
          console.log(error)
        })
    },

    onChangeOTP (otp) {
      this.otp = otp
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
      if (value == 'guest') {
        this.checkoutTabClicked = 'Yes'
      } else {
        this.checkoutTabClicked = 'No'
      }
      console.log(value)
      if (value == 'signup') {
        this.signupTab = true
        this.loginTab = false
        this.guestTab = false
        this.modal.signUp.info = true
        this.modal.signUp.OTP = false
      } else if (value == 'login') {
        this.signupTab = false
        this.loginTab = true
        this.guestTab = false
      } else if (value == 'guest') {
        console.log(value)
        this.signupTab = false
        this.loginTab = false
        this.guestTab = true
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
    onPhoneNumberInput (formattedNumber, { number, valid, country }) {
      this.userDetails.countryCode = country.dialCode
    },
    // switchPopupTab: function (value) {
    //   if (value == "signup") {
    //     this.signupTab = true;
    //     this.loginTab = false;
    //     this.modal.signUp.info = true;
    //     this.modal.signUp.OTP = false;
    //   } else if (value == "login") {
    //     this.signupTab = false;
    //     this.loginTab = true;
    //   }
    // },
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
            this.otp.value = null;
            // this.isResendOtp = true;
            (this.verified.phoneNumber = this.userDetails.phoneNumber),
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
        this.getUserDetailsBrij()
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
      let profile = googleUser.getBasicProfile()
      let authResponse = googleUser.getAuthResponse()
      let id_token = authResponse.id_token

      let user = {
        provider: 'Google',
        name: profile.getName(),
        email: profile.getEmail(),
      }

      console.log('ID: ' + profile.getId()) // Do not send to your backend! Use an ID token instead.
      console.log('Name: ' + profile.getName())
      console.log('Image URL: ' + profile.getImageUrl())
      console.log('Email: ' + profile.getEmail()) // This is null if the 'email' scope is not present.

      console.log('Google Response >>>>>>>>>>>>>', googleUser)
      console.log('Works >>>>>>>>', profile)
      makeRequestBrij(`/api/cinema/social-login`, 'POST', null, {
        FireBaseID: '',
        TokenFrom: 'Google',
        stoken: id_token,
        user,
      })
        .then((result) => {
          console.log('onGoogleSignInSuccess', { ...result })

          if (result.res.data.verification_id) {
            this.verification_id = result.res.data.verification_id
            localStorage.setItem('verification_id', result.res.data.verification_id)
          }

          if (result.res.data.access_token) {
            this.loginUser(result.res.data.access_token)
          } else {
            console.log('Google Login Error', result.res.data.message || 'Oops, Something went wrong')
            this.socialLoginError.error = result.res.data.message || 'Oops, Something went wrong'
            setTimeout(() => {
              this.socialLoginError.error = ''
            }, 5000)
          }
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

      new Promise(resolve => {
        FB.api('/me/?fields=id,name,email',
          (data) => {
            console.log('Facebook Data ', data)
            resolve(data)
          })
      })
        .then((user) => {
          let userData = {
            ...user,
            provider: 'Facebook',
          }
          return makeRequestBrij(`/api/cinema/social-login`, 'POST', null, {
            FireBaseID: '',
            TokenFrom: 'Facebook',
            stoken: response.authResponse.accessToken,
            user: userData,
          })
            .then((result) => {
              console.log('onSignFBInSuccess', { ...result })

              if (result.res.data.verification_id) {
                this.verification_id = result.res.data.verification_id
                localStorage.setItem('verification_id', result.res.data.verification_id)
              }

              if (result.res.data.access_token) {
                this.loginUser(result.res.data.access_token)
              } else {
                console.log('FB Login Error', result.res.data.message || 'Oops, Something went wrong')
                this.socialLoginError.error = result.res.data.message || 'Oops, Something went wrong'
                setTimeout(() => {
                  this.socialLoginError.error = ''
                }, 5000)
              }
            })
            .catch((error) => {
              console.log('FB Login Error', error)
            })
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
              email: this.userDetails.email,
              password: this.userDetails.password,
              // Mobile: this.userDetails.phoneNumber,
              // CountryCode: this.userDetails.countryCode || "91"
            }
            makeRequestBrij('/api/cinema/sign-in', 'POST', null, payload)
              .then((response) => {
                const { error, res } = response
                if (!error && res.data.status) {
                  this.handleCheckout = false
                  this.loginUser(res.data.Records[0].cust_id)
                  // this.$emit('changeUserLoginStatus',res.data.Records[0].cust_id)
                  this.modal.signIn.info = false
                } else {
                  this.errorMessage.login = res.data.message
                }
                this.hideLoading()
              })
              .catch((error) => {
                this.hideLoading()
                console.log('Error', error)
                //   resolve(null);
              })
          } else {
            this.hideLoading()
          }
        })
      }
      if (scope == 'signUp') {
        console.log('signup')
        this.otpPayLoadArray = []
        this.showLoading()
        // this.errorDob = "";
        // this.errorGender = "";
        // let count = 0;
        if (!this.isValidNumber) {
          this.hideLoading()
          this.phoneNumberError = true
        }
        if (!this.userDetails.CountryID) {
          this.hideLoading()
          this.countryIdError = true
        } else {
          this.hideLoading()
          this.countryIdError = false
        }
        if (!this.userDetails.CityID) {
          this.hideLoading()
          this.cityIdError = true
        } else {
          this.hideLoading()
          this.cityIdError = false
        }

        this.$validator
          .validateAll(scope)
          .then((result) => {
            if (!this.isValidNumber) {
              this.hideLoading()
              this.phoneNumberError = true
              return
            }
            if (!this.userDetails.CountryID) {
              this.hideLoading()
              this.countryIdError = true
              return
            } else {
              this.hideLoading()
              this.countryIdError = false
            }
            if (!this.userDetails.CityID) {
              this.hideLoading()
              this.cityIdError = true
              return
            } else {
              this.hideLoading()
              this.cityIdError = false
            }
            if (result) {
              console.log('dhhdd', this.userDetails.phoneNumber)
              if (this.userDetails.phoneNumber != '') {
                this.phoneNumberError = false
                let payload = {
                  Email: this.userDetails.email,
                  Mobile: this.userDetails.phoneNumber
                    .trim()
                    .split(' ')
                    .join(''),
                  Password: this.userDetails.password,
                  RePassword: this.userDetails.confirmedPassword,
                  FirstName: this.userDetails.firstName,
                  LastName: this.userDetails.lastName,
                  newslatteremempirecinemanotification1: this.userDetails.newslatteremempirecinemanotification1 == true
                    ? 1
                    : 0,
                  FireBaseID: '',
                  CountryCode: this.resultsExample.countryCallingCode,
                  countryid: this.userDetails.CountryID.value,
                  CityID: this.userDetails.CityID.value,
                }

                let payloadNew = {
                  'email': this.userDetails.email,
                  'first_name': this.userDetails.firstName,
                  'last_name': this.userDetails.lastName,
                  'password': this.userDetails.password,
                  'phone_no': this.userDetails.phoneNumber
                    .trim()
                    .split(' ')
                    .join(''),
                  'country_id': this.userDetails.CountryID.value,
                  'dob': '',
                  'preferred_lang_id': 1,
                  state_id: this.userDetails.CityID.value,
                  CountryCode: this.resultsExample.countryCallingCode,
                  personalnotification: this.userDetails.newslatteremempirecinemanotification1 == true
                    ? 1
                    : 0
                }

                console.log(this.userDetails)
                this.otpPayLoadArray.push(payloadNew)

                if (this.userDetails.acceptedTerms) {
                  // this.showLoading();
                  makeRequestBrij('/api/cinema/verify-user', 'POST', null, payloadNew)
                    .then((response) => {
                      console.log('response :', response)
                      const { error, res } = response
                      if (!error && res.data.status) {
                        this.ShowOTPPage = true
                        this.ShowWelcomeText = true
                        this.verification_id = res.data.verification_id
                        localStorage.setItem('checkPhone', 2)
                        localStorage.setItem('verification_id', this.verification_id)
                      } else {
                        this.errorMessage.signUp = res.data.message
                      }
                      this.hideLoading()
                    })
                    .catch((error) => {
                      this.hideLoading()
                      console.log('Error', error)
                      //   resolve(null);
                    })
                }
              } else {
                // this.hideLoading();
                // alert("Form Submitted!");
                console.log('hdhdh')
                this.phoneNumberError = true
                this.hideLoading()
              }
              // return
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
            return;
            ``
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
      if (scope == 'checkoutGuest') {
        this.showLoading()
        if (!this.userDetails.CountryID) {
          this.hideLoading()
          this.countryIdError = true
        } else {
          this.hideLoading()
          this.countryIdError = false
        }
        if (!this.userDetails.CityID) {
          this.hideLoading()
          this.cityIdError = true
        } else {
          this.hideLoading()
          this.cityIdError = false
        }

        this.$validator.validateAll(scope).then((result) => {
          console.log('result :', result, this.checkOutUserPhone)

          if (this.isValidNumber == false) {
            this.phoneNumberError = true
            this.hideLoading()
            return
          }
          if (result) {
            if (!this.userDetails.CountryID) {
              this.hideLoading()
              this.countryIdError = true
              return
            } else {
              this.hideLoading()
              this.countryIdError = false
            }
            if (!this.userDetails.CityID) {
              this.hideLoading()
              this.cityIdError = true
              return
            } else {
              this.hideLoading()
              this.cityIdError = false
            }
            this.hideLoading()

            let guest_detail = {'guest_email': this.checkOutUserEmail,
              'guest_first_name': '-',
              'guest_last_name': '-',
              'guest_mobile': this.checkOutUserPhone.trim()
                .split(' ')
                .join(''),
              'guest_country_code': this.resultsExample.countryCallingCode,
              'guest_user_id': localStorage.getItem('guest_user_id'),
              'isUpdateLang': false,
              'selected_lang_id': 1,
              reservation_id: this.$route.params.reserveId}

            localStorage.setItem('guest_detail', JSON.stringify(guest_detail))
            makeRequestBrij('/api/cinema/verify-user', 'POST', null, guest_detail)
              .then((response) => {
                console.log('response :', response)
                const { error, res } = response
                if (!error && res.data.status) {
                  this.verification_id = res.data.verification_id
                  localStorage.setItem('checkPhone', 2)
                  localStorage.setItem('verification_id', this.verification_id)
                  if (this.$route.params.reserveId) {
                    this.$router.push('/phoneotp?reserveId=' + this.$route.params.reserveId)
                  }
                } else {
                  this.errorMessage.signUp = res.data.message
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
        this.hideLoading()
      }
    },

    verifyUser: function () {
      console.log('Inside the Verify')
      let payload = {
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
          const { error, res } = response
          if (!error) {
            if (res.data.Status) {
              this.handleCheckout = false
              if (
                res.data.LoyaltyCustomerVerfiy == 0 ||
                res.data.LoyaltyCustomerVerfiy == '0'
              ) {
                localStorage.setItem('LoyaltyCustomerVerfiy', 0)
                // EventBus.$emit("openLyoyaltyprogrampopup", true);
              } else {
                localStorage.setItem('LoyaltyCustomerVerfiy', 1)
                // EventBus.$emit("getCheckLoyality", true);
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
    loginUser: function (token) {
      TokenService.saveToken(token)
      // this.hideSignIn();
      // this.hideSignUp();
      // this.loggedInFlag = true;
      let payload = {}
      makeRequestBrij(`/api/external/get-user-details/${token}`, 'GET', null, null)
        .then(result => {
          const { error, res } = result
          if (!error && res.status) {
            this.userDetails.isVerfiymobile = res.data.EmpireData.verfiymobile
          }
          if (this.$route.params.reserveId) {
            if (this.userDetails.isVerfiymobile) {
              localStorage.setItem('reservedId', '')
              this.$router.push({
                path: '/select-payment/' + this.$route.params.reserveId,
              })
            } else {
              localStorage.setItem('reservedId', this.$route.params.reserveId)
              if (this.$route.params.reserveId) {
                this.$router.push({
                  path: `/phoneotp?reserveId=${this.$route.params.reserveId}`,
                })
              }
            }
            window.location.reload()
          } else {

          }
          this.getUserDetailsBrij()
          return token
        })
        // .then(token => {
        //   if (token) {
        //     this.$store.dispatch('fetchUserHistory', token)
        //   }
        // })

      // if (this.handleCheckout) {
      //   this.$refs.checkoutModal.show();
      // }

      // fetch token, do api call for profile details save
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

    getUserDetailsBrij: function (callback) {
      let token = TokenService.getToken()
      let payload = {}
      makeRequestBrij(`/api/external/get-user-details/${token}`, 'GET', null, null)
        .then(result => {
          const { error, res } = result
          if (!error && res.data.status) {
            // this.profileDetails = res.data.FirstName;
            this.profileDetails = res.data.EmpireData || {}
            this.userDetails.userID = this.profileDetails.UserID
            this.userDetails.email = this.profileDetails.Email
            this.userDetails.phoneNumber = this.profileDetails.Mobile
            this.userDetails.userName = this.profileDetails.UserName

            if (res.data.CountryISOCode) {
              let CountryISOText = res.data.CountryISOCode.toUpperCase()
              this.selectedCountry = CountryISOText
                ? CountryISOText.toString()
                : ''
            }
            localStorage.setItem('profile_detail', JSON.stringify(this.profileDetails))
            this.loggedInFlag = true

            if (!this.$route.params.reserveId) {
              if (this.$route.path == '/login') {
                this.$router.push({
                  path: '/',
                })
                window.location.reload()
              }
            }

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
        .catch(error => {
          console.log('Error on vue front', error)
        })
    },

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
              this.$router.push({
                path: '/',
              })
            }
            console.log(this.$route, 'hjhj')

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
      window.localStorage.removeItem('verification_id')
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
