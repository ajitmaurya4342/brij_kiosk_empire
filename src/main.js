// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import "@babel/polyfill";
import Vue from "vue";
import App from "./App";
import router from "./router";
import BootstrapVue from "bootstrap-vue";
import store from "@/store/index";
import Slick from "vue-slick";
import Meta from "vue-meta";
import VueHead from "vue-head";
import VueLocalStorage from "vue-localstorage";
import GSignInButton from "vue-google-signin-button";
import FBSignInButton from "vue-facebook-signin-button";
import Carousel3d from "vue-carousel-3d";
import VueFriendlyIframe from "vue-friendly-iframe";
import VueScrollTo from "vue-scrollto";
import VeeValidate from "vee-validate";
import * as VueGoogleMaps from "vue2-google-maps";
import languageData from "@/languageData.json";
import languageDataksa from "@/languageDataksa.json";
// import VueTelInput from "vue-tel-input";
import VueTelInput from "../src/components/telinput";
import { CountryService, LanguageService } from "@/services/storage.service";
import VCalendar from "v-calendar";
import VueFacebookPixel from "vue-facebook-pixel";

import "v-calendar/lib/v-calendar.min.css";
import VueQrcodeReader from "vue-qrcode-reader";
import Multiselect from "vue-multiselect";
import VueLazyload from "vue-lazyload";
import ReadMore from "vue-read-more";
import OTPInput from "vue-otp-input";
import { BASEURL_BRIJ } from "@/config/index";
// LOADER COMPONENT
// Import component
import Loading from "vue-loading-overlay";
import VuePhoneNumberInput from "vue-phone-number-input";

import LightBox from "lightbox2";
// Import stylesheet
import "vue-loading-overlay/dist/vue-loading.css";
// import "intl-tel-input/build/css/intlTelInput.css";
import "@/assets/css/fancybox.css";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
// import './assets/css/header.css'
// import 'slick-carousel/slick/slick.css'
// import './assets/css/slick-theme.css'
// import './assets/css/ar.css'
// import "./assets/css/responsive.css"
import "animate.css";
import "vue-phone-number-input/dist/vue-phone-number-input.css";
// import './assets/css/newstyle.css'

import CryptoJS from "crypto-js";

import VueCookie from "vue-cookie";
import _ from "lodash";
import i18n from "@/plugins/i18n";
import "./assets-kios/css/slick-theme.css";
import "slick-carousel/slick/slick.css";
import "@/assets-kios/css/style.css";
import "@/assets-kios/css/animate.css";
import Vidle from "v-idle";

Vue.use(Vidle);
Vue.use(BootstrapVue);
Vue.use(LightBox);

Vue.use(VueLazyload, {
  preLoad: 1.3,
  error: "/static/img/logo_p_ver.png",
  loading: "/static/img/logo_p_ver.png",
  attempt: 1
});
Vue.use(VueTelInput);
Vue.use(VueScrollTo);
Vue.use(VCalendar);
Vue.use(VeeValidate);
Vue.component("slick", Slick);
Vue.use(Carousel3d);
Vue.use(GSignInButton);
Vue.use(FBSignInButton);
Vue.use(VueHead);
Vue.use(Meta);
Vue.use(Loading);
Vue.use(VueQrcodeReader);
Vue.component("multiselect", Multiselect);
Vue.use(ReadMore);
Vue.use(VueCookie);

Vue.use(VueFacebookPixel);
Vue.component("vue-phone-number-input", VuePhoneNumberInput);

Vue.use(VueGoogleMaps, {
  load: {
    key: "AIzaSyDTN4bmtcbXEqjsv8B0cx2zG15TIz6-03w" // "AIzaSyDpx-CIzu0s5C-gd8Ntp1t3fCldYbo7ccw"//"AIzaSyACDkTbwhQBjD6Ml9fJYEx35ZunrKh8KHQ"
  }
});
Vue.use(VueLocalStorage, {
  name: "persistStore"
});
Vue.config.productionTip = false;
Vue.component("vue-friendly-iframe", VueFriendlyIframe);
Vue.component("v-otp-input", OTPInput);

export const EventBus = new Vue();

var secretKey = "HereIsTheMySecretKey_LOL";
let preimereToken = window.localStorage.getItem("PREIMERE");
console.log("window.location.host", window.location.host);
console.log({
  language: LanguageService.getLanguage(),
  country: CountryService.getCountry()
});

let langToken = LanguageService.getLanguage() || {
  lang: "eng",
  lang_id: 2
};
let countryId;
let country = CountryService.getCountry();

let languageCheck = window.localStorage.getItem("language");

if (languageCheck) {
  let language_check1 = JSON.parse(window.localStorage.getItem("language"));
  if (language_check1.lang_id == 1) {
    document.title = "دور سينما إمباير: شاهد القوائم وحجز التذاكر الآن!";
  }
}

if (
  !country &&
  !window.localStorage.getItem("country") &&
  window.location.host != "empirepremiere.com" &&
  !window.location.pathname.includes("/mob") &&
  !window.location.pathname.includes("/theatre")
) {
  if (
    window.location.host == "empirepremiere.com" ||
    window.location.host == "lb.empirecinemas.com"
  ) {
    console.log("CountryName", "Lebanon");
    window.localStorage.setItem("CountryName", "Lebanon");
    countryId = 119;
  } else if (window.location.host == "ksa.empirecinemas.com") {
    console.log("CountryName", "Saudi Arabia");
    countryId = 230;
  } else if (
    window.location.host == "irq.empirecinemas.com" ||
    (languageCheck && window.location.host == "localhost:8082")
  ) {
    console.log("CountryName", "Iraq");
    window.localStorage.setItem("CountryName", "Iraq");
    countryId = 102;
  } else if (
    window.location.host == "empirecinemas.com" ||
    window.location.host == "localhost:8082"
  ) {
  } else {
    countryId = 230;
  }
} else if (
  window.location.host == "empirepremiere.com" ||
  window.location.host == "lb.empirecinemas.com"
) {
  console.log("CountryName", "Lebanon");
  window.localStorage.setItem("CountryName", "Lebanon");
  countryId = 119;
} else if (
  window.location.host == "ksa.empirecinemas.com" ||
  window.location.host == "localhost:8082"
) {
  console.log("CountryName", "Saudi Arabia");
  window.localStorage.setItem("CountryName", "Saudi Arabia");
  countryId = 230;
} else if (window.location.host == "irq.empirecinemas.com") {
  console.log("CountryName", "Iraq");
  window.localStorage.setItem("CountryName", "Iraq");
  countryId = 102;
}

Vue.mixin({
  data: function() {
    return {
      fromQrCode: "",
      langName: langToken["lang"],
      BrijBaseUrl: BASEURL_BRIJ, // default,
      content_languages: [],
      preimereToken: preimereToken,
      CountryID: country ? country["CountryID"] : countryId,
      LOADING: null,
      pr: true,
      allLanguageData:
        country && country["CountryID"] == 230
          ? languageDataksa[langToken["lang"]]
          : languageData[langToken["lang"]],
      secureStore: {
        set: function(key, value) {
          let setEncryptedData = CryptoJS.AES.encrypt(
            JSON.stringify(value),
            secretKey
          ).toString();
          window.localStorage.setItem(key, setEncryptedData);
        },
        get: function(key) {
          let getEncryptedData = window.localStorage.getItem(key);
          if (!_.isNull(getEncryptedData)) {
            return JSON.parse(
              CryptoJS.AES.decrypt(getEncryptedData, secretKey).toString(
                CryptoJS.enc.Utf8
              )
            );
          }
          return null;
        },
        remove: function(key) {
          window.localStorage.removeItem(key);
        }
      },
      sessionStore: {
        set: function(key, value) {
          let setEncryptedData = CryptoJS.AES.encrypt(
            JSON.stringify(value),
            secretKey
          ).toString();
          window.sessionStorage.setItem(key, setEncryptedData);
        },
        get: function(key) {
          let getEncryptedData = window.sessionStorage.getItem(key);
          if (!_.isNull(getEncryptedData)) {
            return JSON.parse(
              CryptoJS.AES.decrypt(getEncryptedData, secretKey).toString(
                CryptoJS.enc.Utf8
              )
            );
          }
          return null;
        },
        remove: function(key) {
          window.sessionStorage.removeItem(key);
        }
      }
    };
  },
  mounted() {
    let isQrCodeKeyValue = window.localStorage.getItem("isQrCodeKey");
    if (isQrCodeKeyValue === "InCinemaFB") {
      this.fromQrCode = true;
    } else {
      this.fromQrCode = false;
    }
  },
  computed: {
    languageChange() {
      console.log("object" < "Adasasdas");
      return window.localStorage.getItem("language");
    },
    getContentLanguages() {
      return this.$store.getters.getKiosLanguage;
    }
  },
  methods: {
    showLoading: function() {
      this.hideLoading(true);
      this.$nextTick(() => {
        this.LOADING = this.$loading.show({
          color: preimereToken == "true" ? "#EDD088" : "#e70d00",
          loader: "dots",
          width: 150,
          height: 150,
          class: "css-loader",
          backgroundColor: "rgba(0, 0, 0, 0.5);",
          opacity: 0.5,
          zIndex: 99999
        });
        document.body.classList.add("modal-open");
      });
    },

    hideLoading: function(immediate = false) {
      if (!immediate) {
        this.$nextTick(() => {
          if (this.LOADING) this.LOADING.hide();
          document.body.classList.remove("modal-open");
        });
      } else {
        if (this.LOADING) this.LOADING.hide();
        document.body.classList.remove("modal-open");
      }
    },

    /**
     * How to use Ref: [https://github.com/vuejs/vue/issues/11088#issuecomment-630287153]
     *  <template>
     *    <div>
     *      {{ getSafe(() => obj.foo.bar) }}          <!-- returns 'baz' -->
     *      {{ getSafe(() => obj.foo.doesNotExist) }} <!-- returns undefined -->
     *    </div>
     *  </template>
     */
    getSafe(fn, fallbackValue = undefined) {
      try {
        return fn();
      } catch (e) {
        return fallbackValue;
      }
    },
    currFormat(value = 0) {
      let val = value || 0;
      if (typeof val === "string") {
        val = +parseFloat(val).toFixed(4) || 0;
      }

      let cFormat;
      let precision;

      let global_options_latest = this.$store.getters.getGlobalOptions || [];

      cFormat = global_options_latest.find(x => x.go_key == "CURR_FORMAT");
      precision = global_options_latest.find(
        x => x.go_key == "MIN_FRACTION_DIGITS"
      );

      cFormat = cFormat && cFormat.go_value ? cFormat.go_value : "en-US";
      precision = precision && precision.go_value ? precision.go_value : 2;

      // console.log({
      //   cFormat,
      //   precision,
      //   value,
      //   val,
      // })

      return val.toLocaleString(cFormat, {
        minimumFractionDigits: precision,
        maximumFractionDigits: precision
      });
    },

    checkBaseUrl(data = "") {
      if (!data) return undefined;

      if (data && data.includes("http")) {
        return data;
      } else if (data && data.includes("S3")) {
        return `https://images.brijimages.com/` + data;
      } else {
        let url = `${this.BrijBaseUrl}/${data}`;
        if (String(url).trim() === String(this.BrijBaseUrl).trim())
          return undefined;

        return url;
      }
    },

    getCurrentLang() {
      return LanguageService.getLanguage() || { brij_lang_id: 1, iso_2: "en" };
    },

    movieLanguagesWithSubs(
      lang_name = "",
      sub_lang_1_iso_2 = "",
      sub_lang_2_iso_2 = ""
    ) {
      return `${lang_name || ""}${
        sub_lang_1_iso_2 ? `/${sub_lang_1_iso_2}` : ""
      }${
        !!sub_lang_1_iso_2 && !!sub_lang_2_iso_2 ? `-${sub_lang_2_iso_2}` : ""
      }`;
    },

    getLangSpecificObject(arr, language = "") {
      if (arr && arr.length > 0) {
        let obj = arr.find(
          x =>
            x.lang_name && x.lang_name.toLowerCase() === language.toLowerCase()
        );

        if (obj) return obj;
        else return null;
      } else {
        return null;
      }
    },

    getLangSpecificAttribute(
      languageSpecificImages,
      target_lang_id,
      attr,
      lang_id_attr = "content_lang_id",
      isObject = false,
      nestedKey = null,
      skip_content_langs_fallback = false
    ) {
      if (typeof languageSpecificImages === "string") {
        languageSpecificImages = this.getSafe(
          () => JSON.parse(languageSpecificImages),
          []
        );
      }
      if (!languageSpecificImages || languageSpecificImages.length === 0) {
        return null;
      }

      let target_obj = languageSpecificImages.find(
        x => x[lang_id_attr] == target_lang_id
      );

      if (
        target_obj &&
        target_obj[attr] &&
        (!Array.isArray(target_obj[attr]) ||
          (Array.isArray(target_obj[attr]) && target_obj[attr].length > 0)) &&
        (!isObject || (isObject && target_obj[attr][nestedKey]))
      ) {
        return target_obj[attr];
      }

      let content_langs = this.getContentLanguages;

      if (
        content_langs &&
        !skip_content_langs_fallback &&
        content_langs.length > 0
      ) {
        for (let content_lang of content_langs) {
          let lang_obj = this.getLangSpecificObject(
            languageSpecificImages,
            content_lang.lang_name
          );
          if (lang_obj && lang_obj[attr] && attr !== "mc_title") {
            return lang_obj[attr];
          } else {
            return null;
          }
        }
      } else {
        return null;
      }

      return null;
    }
  }
});

/* eslint-disable no-new */
let app = new Vue({
  i18n,
  el: "#app",
  router,
  store,
  template: "<App/>",
  components: {
    App
  }
});
