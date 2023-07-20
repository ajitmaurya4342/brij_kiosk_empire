import Vue from "vue";
import Router from "vue-router";
import HomePage from "@/components/pages/home";
import landingPg from "@/components/pages/landingPage";
import movieDetails from "@/components/pages/movieDetails";
import quickMovie from "@/components/pages/quickMovieDetails";
import failedPayment from "@/components/pages/failedBookingNew";
// import checkout from "@/components/pages/checkout";
import fb from "@/components/pages/foodBeverage";
import iraq from "@/components/pages/iraq";
import ksa from "@/components/pages/ksa";
import seatlayout from "@/components/pages/seatLayout";
import seatlayoutNew from "@/components/pages/seatLayoutNew";
import fnb from "@/components/pages/fnb";
import fnbNew from "@/components/pages/fnbNew";
import test from "@/components/pages/testnew";
import fnbcheckout from "@/components/pages/fnbcheckout";
import error404 from "@/components/pages/error404";
import profile from "@/components/pages/profile";
import browseByCinemaTwo from "@/components/pages/browseByCinemaTwo";
import bookanevent from "@/components/pages/bookanevent";
import ticketconfirmation from "@/components/pages/ticket-confirmation";
import foodticket from "@/components/pages/fticket";
import browsebycinema from "@/components/pages/browseByCinema";
import mobaboutUs from "@/components/pages/mob-about-us";
import termsAndCondition from "@/components/pages/terms-and-condition";
import ksaPrivacyPolicy from "@/components/pages/ksaPrivacyPolicy";
import mobTnc from "@/components/pages/mob-tnc";
import getApp from "@/components/pages/getapp";
import scanQr from "@/components/pages/scanQr";
import comingSoonMovies from "@/components/pages/coming-soon-movies";
import ksaTermsAndConditions from "@/components/pages/ksa-terms-condition.vue";
import theatreRules from "@/components/pages/theatre-rules.vue";
import Offers from "@/components/pages/offers.vue";
import langChange from "@/components/pages/langChange.vue";
import langEngChange from "@/components/pages/langEngChange.vue";
import howItWorks from "@/components/pages/howItWorks";

import privacyPolicy from "@/components/pages/privacypolicy.vue";

import experience from "@/components/pages/experience-list.vue";
import experienceDetails from "@/components/pages/experience-detail.vue";
import letsMovie from "@/components/pages/letsMovie.vue";

import mobKsaTnc from "@/components/pages/mob-ksa-tnc.vue";
import theatreRulesMob from "@/components/pages/theatre-rules-mob.vue";

/** ***NEW WEBSITE ROUTES */

import home from "@/components/pages/home.vue";
import screenxexp from "@/components/pages/experience/screenxcinema.vue";
import experienceScreen from "@/components/pages/experience/experienceScreen.vue";
import cinemaoffer from "@/components/pages/offer/cinemaoffers.vue";
import privatebooking from "@/components/pages/offer/privatebooking.vue";

import aboutus from "@/components/pages/aboutus.vue";
import foodmenus from "@/components/pages/food-drinks/foodmenus.vue";
import foodpremiere from "@/components/pages/food-drinks/foodpremiere.vue";
import orderonline from "@/components/pages/food-drinks/orderonline.vue";

import bookevent from "@/components/pages/bookevent.vue";
import login from "@/components/pages/login.vue";
import forgotpassword from "@/components/pages/forgotpassword.vue";
import otp from "@/components/pages/otp.vue";
import phoneOtp from "@/components/pages/phoneOtp.vue";
import hometwo from "@/components/pages/hometwo.vue";
import cinemalocation from "@/components/pages/cinemalocation.vue";
import cinemashowtimes from "@/components/pages/cinemashowtimes.vue";
import allCinemashowtimes from "@/components/pages/allCinemashowtimes.vue";

import contactus from "@/components/pages/contactus.vue";
import finalticket from "@/components/pages/finalticket.vue";
import finalticketNew from "@/components/pages/finalticketNew.vue";
import selectpayment from "@/components/pages/selectpayment.vue";
import confirmation from "@/components/pages/confirmationNew.vue";

import { LanguageService } from "@/services/storage.service";
import kioskhome from "../components/pages/kiosk/index";
import settingsPage from "../components/pages/kiosk/settings";
import settingsLogin from "../components/pages/kiosk/settingsLogin";
import selectOption from "../components//pages/kiosk/selectOption";
import pickupTicketOptions from "../components/pages/kiosk/pickupTicketOptions";
import enterBookingId from "../components/pages/kiosk/enterBookingId";

import selectMovie from "../components/pages/kiosk/selectMovie";
import kioskmovieDetails from "../components/pages/kiosk/movieDetails";
import selectSeats from "../components/pages/kiosk/selectSeats";
import selectSeatsNew from "../components/pages/kiosk/selectSeatsNew";
import selectFnb from "../components/pages/kiosk/selectFnb";
import selectFnbNew from "../components/pages/kiosk/selectFnbNew";
import kioskFinalTicket from "../components/pages/kiosk/kioskFinalTicket";
import kioskTicket from "../components/pages/kiosk/kioskTicket";
import confBooking from "../components/pages/kiosk/confBooking";
import confirmDetails from "../components/pages/kiosk/confirmDetails";
import printTicket from "../components/pages/kiosk/printTicket";
import thankyou from "../components/pages/kiosk/thankyou";
import paymentPage from "../components/pages/kiosk/paymentPage";
import startPage from "../components/pages/kiosk/startPage";

Vue.use(Router);

const router = new Router({
  mode: `hash`, // mode: 'history',
  scrollBehavior: function() {
    return {
      x: 0,
      y: 0
    };
  },
  routes: [
    {
      path: "/",
      name: "start",
      component: startPage
    },
    {
      path: "/home",
      name: "home",
      component: kioskhome
    },
    {
      path: "/settings",
      name: "settings",
      component: settingsPage
    },
    {
      path: "/settingsLogin",
      name: "settingsLogin",
      component: settingsLogin
    },
    {
      path: "/select-option",
      name: "selectOption",
      component: selectOption
    },
    {
      path: "/pickup-ticket-options",
      name: "enterBookingId",
      component: pickupTicketOptions
    },
    {
      path: "/payment/:reserve_id",
      name: "payment",
      component: paymentPage
    },
    {
      path: "/select-movie",
      name: "Select Movie",
      component: selectMovie
    },

    {
      path: "/movie-details/:FilmCommonCode",
      name: "movieDetails",
      component: kioskmovieDetails
    },
    {
      path: "/select-seats/:schedule_id",
      name: "selectSeats",
      component: selectSeats
    },
    {
      path: "/seatlayout/:ss_id/:md_id/:screen_id",
      name: "seatlayout",
      component: selectSeatsNew
    },
    {
      path: "/select-fnb/:reserve_id",
      name: "selectFnb2",
      component: selectFnb
    },
    {
      path: "/food-and-drinks/:reserve_id",
      name: "selectFnb",
      component: selectFnbNew
    },
    {
      path: "/conf-booking/:reserve_id",
      name: "confBooking",
      component: confBooking
    },

    {
      path: "/enter-booking-id",
      name: "enterBookingId",
      component: enterBookingId
    },

    {
      path: "/confirmDetails/:reserve_id",
      name: "confirmDetails",
      component: confirmDetails
    },
    {
      path: "/print-ticket",
      name: "Print Ticket",
      component: printTicket
    },
    {
      path: "/thank-you",
      name: "thank-you",
      component: thankyou
    },
    {
      path: "/final-ticket/:booking_id/:categoryId",
      name: "kioskFinalTicket",
      component: kioskFinalTicket
    },

    {
      path: "/kiosk-ticket/:booking_id",
      name: "kioskTicket",
      component: kioskTicket
    }
  ]
});

router.beforeEach((to, from, next) => {
  let lang = window.localStorage.getItem('language')
  let country = window.localStorage.getItem('country')
  let cinema = Vue.localStorage.get('brij_cinema', null)

  console.log('beforeEach', Object.assign({}, { to, from, lang, country, cinema }))

  if (cinema) {
    try {
      cinema = JSON.parse(cinema)
    } catch (e) {
      cinema = null
    }
  }

  if (!cinema && to.fullPath != '/settings') {
    return next({ path: '/settings' })
  }

  return next()
})

export default router
