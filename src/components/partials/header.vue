<template>
  <div class="sticky-top">
    <header class="kiosk-header">
      <router-link to="/home" @click.native="reload">
        <!-- ENABLE THIS LOGO WHEN ARABIC LANGUAGE IS SELECTED -->
        <!-- ADD DIRECTION-RTL CLASS TO BODY WHILE SWITCHING TO ARABIC/ -->
        <img
          v-if="language_id == 'ar'"
          src="@/assets/img/logo/ecarabic.png"
          alt="Empire-Arabic-logo"
          class="ml-4"
          height="auto"
          width="250"
        />
        <img
          v-if="language_id == 'en'"
          src="@/assets/img/logo/logo2.svg"
          alt="Empire-English-logo"
          height="auto"
          width="250"
        />
      </router-link>
      <nav class="kiosk-nav">
        <div class="d-flex justify-content-between">
          <div class="d-flex">
            <!-- <div class="font-weight-bold text-nowrap">12:00 AM</div> -->
            <!-- <div class="mx-3 h2 mb-0">&bull;</div> -->
            <div class="text-nowrap">
              {{ getCinemaTranslatedData(getSelectedBrijCinemas) }}
            </div>
          </div>
          <div style="display: flex;flex-direction: row-reverse;gap: 35px;">
            <div style="display: none;">
              <div
                @click="
                  changeLanguage(
                    {
                      flag: 'us',
                      language: 'en',
                      lang: 'eng',
                      lang_id: 1,
                      title: 'English'
                    },
                    { brij_lang_id: 1, iso_2: 'en' }
                  )
                "
              >
                ENGLISH
              </div>

              <div
                @click="
                  changeLanguage(
                    {
                      flag: 'ar',
                      language: 'ar',
                      lang: 'ar',
                      lang_id: 3,
                      title: 'عربى'
                    },
                    { brij_lang_id: 3, iso_2: 'ar' }
                  )
                "
              >
                {{ "عربى" }}
              </div>
            </div>

            <router-link class="change-lang" to="/home">{{
              $tc("ChangeLanguage")
            }}</router-link>
          </div>
        </div>
      </nav>
    </header>
    <div v-if="routeCheck($route.path)" class="d-flex bg-texture py-4">
      <div class="col-3 align-self-center">
        <router-link class="btn-back" to @click.native.prevent="onRouterBack()">
          <!-- show this image if EN -->
          <img
            v-if="language_id == 'en'"
            src="@/assets/img/logo/back-arrow.svg"
            alt="Back-EN"
            height="40"
            width="40"
          />
          <div class="mx-3 text-white">{{ $tc("Back") }}</div>
          <!-- Show this img if AR -->
          <img
            v-if="language_id == 'ar'"
            src="@/assets/img/logo/back-arrow.svg"
            alt
            height="40"
            width="40"
          />
        </router-link>
      </div>
      <div class="col-6 align-self-center text-center">
        <!-- <h3 class="mb-0 font-weight-bold text-white text-uppercase">{{ $tc("SelectMovie")}}</h3> -->
      </div>
      <div class="col-3 d-flex justify-content-end">
        <!-- @click.native="onRouterBack()" -->
        <router-link class="btn-exit" to @click.native="onClickExit()">
          <!-- Show this img of AR -->
          <img
            v-if="language_id == 'ar'"
            src="@/assets/img/logo/exit.svg"
            alt="Exit-icon-arabic"
            height="40"
            width="40"
          />
          <span class="mx-3 text-white">{{ $tc("Exit") }}</span>
          <!-- show this img if EN  -->
          <img
            v-if="language_id == 'en'"
            src="@/assets/img/logo/exit.svg"
            alt="Exit-icon-english"
            height="40"
            width="40"
          />
        </router-link>
      </div>
    </div>

    <div v-if="routeCheckNew($route.path)" class="d-flex bg-texture py-4">
      <div class="col-3 align-self-center">
        <router-link class="btn-back" to @click.native="onClickExit()">
          <img
            src="@/assets/img/logo/back-arrow.svg"
            alt
            height="40"
            width="40"
          />
          <div class="ml-3 text-white">{{ $tc("Back") }}</div>
        </router-link>
      </div>
      <div class="col-6 align-self-center text-center">
        <!-- <h3 class="mb-0 font-weight-bold text-white text-uppercase">{{ $tc("SelectMovie")}}</h3> -->
      </div>
      <div class="col-3 d-flex justify-content-end">
        <!-- @click.native="onRouterBack()" -->
        <router-link class="btn-exit" to @click.native="onClickExit()">
          <span class="mr-3 text-white">{{ $tc("Exit") }}</span>
          <img src="@/assets/img/logo/exit.svg" height="40" width="40" />
        </router-link>
      </div>
    </div>

    <!-- SESSION TIMEOUT MODAL -->
    <b-modal
      id="sessionTimeOut"
      ref="sessionTimeOut"
      centered
      hide-footer
      hide-header
      hide-header-close
      no-close-on-backdrop
      no-close-on-esc
    >
      <p class="mb-1 black text-center">Your booking has timed out!</p>
      <p class="black text-center">Click Here to restart the booking</p>
      <div class="text-center">
        <b-button
          class="text-center mx-auto mt-3 btn-danger"
          v-on:click="goBackHistory()"
          >RELOAD</b-button
        >
      </div>
    </b-modal>
    <!-- SESSION TIMEOUT MODAL ENDS-->

    <!-- SESSION COUNTDOWN TIMER -->
    <div v-if="timerCheck($route.path)" class="col-md-11 mx-auto">
      <div class="centerTitle">
        <span class="red-dotl"></span>
        <div class="d-flex justify-content-center align-items-center">
          <p class="title">{{ this.timer.minutes }}:{{ this.timer.seconds }}</p>
          <p
            class="text"
            v-bind:class="language_id == 'ar' ? 'mr-1 mr-md-3' : 'ml-1 ml-md-3'"
          >
            <span class="d-block">Till Your Booking Expires</span>
            <!-- {{allLanguageData.Timer[1]}} -->
          </p>
        </div>
        <span class="red-dotr"></span>
      </div>
    </div>

    <b-modal
      id="modal-1"
      ref="modal-1"
      centered
      hide-footer
      hide-header
      title="Exit Booking"
    >
      <div class="py-4">
        <h3 class="text-dark font-weight-bold text-center mb-4">
          Are you sure you want to cancel booking ?
        </h3>

        <div class="text-center">
          <button
            v-if="routeCheckNew($route.path)"
            class="btn-danger btn-lg mr-2 px-4"
            @click="onClickYesNew()"
          >
            Yes
          </button>
          <button
            v-if="routeCheck($route.path)"
            class="btn-danger btn-lg mr-2 px-4"
            @click="onClickYes()"
          >
            Yes
          </button>
          <button
            class="btn btn-lg btn-light border ml-2 px-4"
            @click="onClickNo()"
          >
            No
          </button>
        </div>
      </div>
    </b-modal>
  </div>
</template>

<script>
import {
  CountryService,
  LanguageService,
  TokenService
} from "@/services/storage.service";
import i18n from "@/plugins/i18n";

import { BASEURL } from "@/config/index.js";
import { EventBus } from "@/main";

export default {
  name: "App",
  data() {
    return {
      pageName: "",
      timerStartFunction: null,
      URL_BASE: BASEURL,
      termsDetails: false,
      rulesDetail: false,
      timer: {
        TimeoutModal: false,
        minutes: 9,
        seconds: 59,
        stop: false
      },
      get language_id() {
        return localStorage.getItem("language_id") || "en";
      }
    };
  },
  computed: {
    getBrijCinemas() {
      return this.$store.getters.getBrijCinemas
        ? this.$store.getters.getBrijCinemas
        : [];
    },
    getSelectedBrijCinemas() {
      return this.$store.getters.getSelectedBrijCinemas;
    }
  },
  mounted() {
    this.pageName = this.$route.name;
    EventBus.$on("startTimer", () => {
      this.startTimer();
    });
  },
  beforeMount() {},

  watch: {
    $route(to, from) {
      this.pageName = to.name;
    }
  },

  methods: {
    reload() {
      window.location.reload();
    },
    changeLanguage: function(language, brij_lang = {}) {
      console.log({ language, brij_lang });

      LanguageService.saveLanguage(language, brij_lang);

      this.$cookie.set("language_id", language.language);
      window.localStorage.setItem("language_id", language.language);
      const x = document.getElementsByTagName("body")[0];

      if (language.language == "ar") {
        x.classList.add("direction-rtl");
      } else {
        x.classList.remove("direction-rtl");
      }
      i18n.locale = language.language;
      this.$forceUpdate();
    },
    getCinemaTranslatedData(cinema, attr = "cinema_name") {
      if (!cinema) return "";

      let name =
        this.getLangSpecificAttribute(
          cinema.translation_data || [],
          this.getCurrentLang().brij_lang_id,
          attr || "cinema_name",
          "langaugeId"
        ) || attr == "cinema_name"
          ? cinema.cinema_name
          : attr == "cinema_address"
          ? cinema.cinema_address
          : "";

      return name;
    },
    onClickExit: function() {
      this.$refs["modal-1"].show();
    },
    onClickYes: function() {
      console.log("object1");
      this.$refs["modal-1"].hide();
      clearTimeout(this.timerStartFunction);
      clearInterval(this.timerStartFunction);
      this.timerStartFunction = null;
      this.timer.stop = true;
      this.$router.push({
        path: "/home"
      });
    },
    onClickYesNew: function() {
      console.log("object");
      this.$refs["modal-1"].hide();
      clearTimeout(this.timerStartFunction);
      clearInterval(this.timerStartFunction);
      this.timerStartFunction = null;
      this.$router.replace({
        path: "/select-movie"
      });
    },
    onClickNo: function() {
      this.$refs["modal-1"].hide();
    },
    onRouterBack: function() {
      window.history.back();
      // this.$router.go(-1);
      // this.$router.push({
      //   path:'select-option'
      // });
    },
    routeCheck: function(routes) {
      let headerRouteNames = [
        "/select-movie",
        "/movie-details",
        "/select-seats",
        "/select-fnb"
      ];
      return headerRouteNames.filter(x => routes.includes(x)).length > 0;
      // return headerRouteNames.includes(routes);
    },
    routeCheckNew: function(routes) {
      let headerRouteNames = ["/conf-booking", "/confirmDetails"];
      return headerRouteNames.filter(x => routes.includes(x)).length > 0;
    },
    timerCheck: function(routes) {
      let headerRouteNames = [];
      return headerRouteNames.filter(x => routes.includes(x)).length > 0;
    },
    goBackHistory() {
      this.$root.$emit("bv::hide::modal", "sessionTimeOut");
      this.timer = {
        TimeoutModal: false,
        minutes: 9,
        seconds: 59,
        stop: false
      };
      this.timerStartFunction = null;
      this.$router.push({
        path: "/select-movie"
      });
    },
    startTimer: function() {
      this.timerStartFunction = setInterval(() => {
        if (parseInt(this.timer.seconds) < 0) {
          this.timer.seconds = 0;
        }
        if (parseInt(this.timer.minutes) < 0) {
          this.timer.minutes = 0;
        }
        if (this.timer.stop == true) {
          return;
        }
        if (
          parseInt(this.timer.seconds) == 0 &&
          parseInt(this.timer.minutes) == 0
          // this.$route.path.includes("/checkout")
        ) {
          // this.timer.seconds = 60;
          this.timer.stop = false;
          this.$root.$emit("bv::show::modal", "sessionTimeOut");
          // this.$refs.sessionTimeOut.show();
          clearTimeout(self.timerStartFunction);
          return false;
        }
        if (parseInt(this.timer.seconds) <= 0) {
          this.timer.seconds = 60;
        }
        this.timer.seconds = parseInt(this.timer.seconds) - 1;
        if (this.timer.seconds < 10) {
          this.timer.seconds = "0" + this.timer.seconds;
        }
      }, 1000);
      setInterval(() => {
        if (this.timer.stop == true) {
          return;
        }
        if (this.timer.minutes == 0 && this.timer.seconds == 0) {
          // this.$refs.sessionTimeOut.show();
          this.$root.$emit("bv::show::modal", "sessionTimeOut");

          // this.$root.$emit("bv::show::modal", "sessionTimeOut");
          // TODO Show timeout message and a redirect button
          this.timer.TimeoutModal = true;
          this.timer.minutes = 0;
          this.timer.seconds = 0;
          this.timer.stop = true;
        }
        this.timer.minutes = parseInt(this.timer.minutes) - 1;
      }, 60000);
    }
  }
};
</script>

<style></style>
