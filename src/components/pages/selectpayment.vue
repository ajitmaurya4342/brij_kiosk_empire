<template>
  <div class="white-grey-section header-space container-fluid">
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
    <div class="row select-payment my-5 pb-5">
      <div class="col-lg-6 mx-auto justify-content-center">
        <div class="title py-2">Payment</div>
        <div class="select-payment-body pt-4 px-lg-5 px-3">
          <h5 class="mb-0">
            {{ allLanguageData.SelectPayment[0] }}
          </h5>
          <div>
            <div class="pt-5 pb-4">
              <h4>{{ allLanguageData.SelectPayment[1] }}</h4>
            </div>
            <div class="d-flex justify-content-center">
              <div>
                <div
                  v-for="(data, idx) in paymentListData"
                  :key="idx"
                  class="d-flex align-items-center pb-3"
                >
                  <div v-bind:class="langName == 'ar' ? 'pl-4' : 'px-3'">
                    <img
                      src="@/assets/payment-img/payford.png"
                      class=""
                      style="max-width:150px"
                      v-if="data.pm_id == 20"
                    />
                    <img
                      src="@/assets/payment-img/master-card.jpg"
                      class=""
                      style="max-width:150px"
                      v-if="data.pm_id == 21"
                    />
                  </div>
                  <div v-bind:class="langName == 'ar' ? 'pl-4' : 'px-3'">
                    <input
                      :id="data.pm_payment_mode"
                      :value="data.pm_id"
                      name="v"
                      v-model="PaymentID"
                      type="radio"
                    />
                  </div>
                  <div class="font-weight-bold">{{ data.pm_payment_mode }}</div>
                </div>
              </div>
            </div>
            <div class="py-4">
              <button class="btn btn-proceed" @click="proceedPayment">
                {{ allLanguageData.Proceed }}
              </button>
            </div>
            <!-- <div class="pt-4">
                <div>
                  Already have an Account?
                  <span class="font-weight-bold">LOGIN</span>
                </div>
                <div>
                  Become a loyal member!
                  <span class="font-weight-bold">SIGNUP</span>
                </div>
              </div> -->
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
        {{ allLanguageData.SESSIONEXPIRED }}
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
import { makeRequest, makeRequestBrij } from "@/helper/internet.js";
import { mapState, mapGetters, mapActions } from "vuex";
import axios from "axios";
import {
  LanguageService,
  CountryService,
  TokenService
} from "@/services/storage.service";
import { metaInfo } from "@/helper/constant.js";
export default {
  data() {
    return {
      paymentListData: [],
      PaymentID: "",
      ReserveID: "",
      CinemaType: "Normal",
      GuestCityID: "",
      GuestCountryID: "",
      LanguageID: "",
      showIframe: false,
      paymentURL: "",
      userEmail: "",
      userMobile: "",
      CountryCode: "",
      userToken: "",
      CountryID: "",
      ConfirmationURL: "",
      FailedURL: "",
      countryData: {},
      ReserveID: "",
      showTimer: false,
      timer: {
        TimeoutModal: false,
        minutes: 9,
        seconds: 59,
        stop: false
      },
      errorMessage: "",
      preimere: false,
      guest_id: 0,
      cust_id: 0
    };
  },
  beforeCreate: function() {
    document.body.className = "light-section";
  },
  components: {},
  beforeMount() {
    let token1 = TokenService.getToken();
    if (token1) {
      this.cust_id = token1;
      // this.getUserDetails()
    } else if (localStorage.getItem("guest_detail")) {
      this.addGuestDetail();
    }

    if (this.$route.params.reserveId) {
      this.ReserveID = this.$route.params.reserveId;
      this.getReserveInfo(this.ReserveID, "0");
    }
    this.ConfirmationURL = window.location.origin + "/final-ticket";
    this.FailedURL = window.location.origin + "/failedPayment";
    let token = TokenService.getToken();
    // if (token) {

    // } else {
    //   window.location.pathname = "/";
    // }
    // window.location.reload();
  },
  mounted() {
    let language = LanguageService.getLanguage();
    if (!language) {
      this.LanguageID = 2;
    } else {
      this.LanguageID = language.lang_id;
    }
    // this.handleResize();
    let lang = LanguageService.getLanguage();
    if (lang == null) {
      this.langName = "eng";
    } else {
      this.langName = lang["lang"];
    }
    let country = CountryService.getCountry();

    // countryid
    if (!country) {
      this.CountryID = 119;
    } else {
      this.CountryID = country.CountryID;
    }
    // window.addEventListener("message", this.receiveIframeMessage);
  },
  methods: {
    addGuestDetail() {
      makeRequestBrij(
        `/api/guest-login`,
        "POST",
        null,
        JSON.parse(localStorage.getItem("guest_detail"))
      ).then(result => {
        const { error, res } = result;
        const { data } = res.data;
        console.log(data, "Guest Detail");
        if (res.data.status) {
          this.guest_id = data[0].guest_id;
          console.log(this.guest_id);
        }
      });
    },
    startTimer: function() {
      this.timerStartFunction = setInterval(() => {
        this.timer.seconds =
          this.timer.seconds > 0 ? parseFloat(this.timer.seconds) - 1 : 0;

        if (parseFloat(this.timer.seconds) < 10) {
          this.timer.seconds = "0" + this.timer.seconds;
        }

        if (parseFloat(this.timer.seconds) <= 0 && this.timer.minutes > 0) {
          this.timer.seconds = 59;
          this.timer.minutes =
            this.timer.minutes > 0 ? parseFloat(this.timer.minutes) - 1 : "00";
        }
        if (
          parseFloat(this.timer.minutes) == 0 &&
          parseFloat(this.timer.seconds) == 0
        ) {
          this.timer.seconds = "00";
          this.$refs["sessionExpired"].show();
          // this.$root.$emit("bv::show::modal", "sessionTimeOut");
          clearInterval(this.timerStartFunction);
          return false;
        } else {
        }
      }, 1000);
    },
    onClickOk: function() {
      this.$router.go(-1);
      this.$router.go(-1);
      this.$refs.errorModal.hide();
      this.$refs.sessionExpired.hide();
    },
    getReserveInfo(ReserveID) {
      this.showLoading();
      makeRequestBrij(
        `/api/external/reservation-detail/${ReserveID}`,
        "GET",
        null,
        null
      )
        .then(result => {
          const { error, res } = result;
          const { data } = res.data;

          if (!error) {
            if (res.data && res.data.status) {
              let schedule_detail = res.data.Records[0];
              let totalAmount = +parseFloat(
                schedule_detail.amount + schedule_detail.internet_handling_fee
              ).toFixed(2);

              if (schedule_detail.fnb_total) {
                totalAmount = +parseFloat(
                  totalAmount + schedule_detail.fnb_total
                ).toFixed(2);
              }

              totalAmount = +parseFloat(
                totalAmount - schedule_detail.voucher_amount
              ).toFixed(2);

              this.showTimer = true;
              this.timer.minutes = schedule_detail.timer_minutes;
              this.timer.seconds = schedule_detail.timer_second;
              this.startTimer();
              this.paymentListNew(totalAmount);

              this.hideLoading();
            } else {
              setTimeout(() => {
                this.$refs["errorModal"].show();
                this.errorMessage = res.data.message;
                this.hideLoading();
              });
            }
          } else {
            console.log("object");
          }
        })
        .catch(error => {
          this.hideLoading();

          console.log("error", error);
        });
    },
    receiveIframeMessage(event) {
      console.log(event, "iframe response01 event");
      this.hideLoading();
      if (event && event.data) {
        console.log(event.data, "iframe response02 event.data");
        let status = event.data.split(":");
        console.log(status, "jj");
        if (status && status.length > 0 && status.includes("Success")) {
          this.showIframe = false;
          console.log("got success");
          this.$router.push({
            path: "/final-ticket/" + this.ReserveID
          });
        } else {
          console.log("got error");
        }
      } else {
        console.log("some error occured");
      }
    },
    getUserDetails: function(callback) {
      this.hideLoading();
      window.localStorage.setItem("guestE", "");
      window.localStorage.setItem("guestNo", "");
      let token = TokenService.getToken();
      this.userToken = token;
      let payload = {};
      makeRequest("/ProfileDataNew", "POST", token, payload)
        .then(result => {
          const { error, res } = result;
          this.hideLoading();
          if (!error && res.status) {
            this.userEmail = res.data.Email;
            this.userMobile = res.data.Mobile;
            localStorage.setItem("MobileCountryCode", res.data.CountryCode);
            if (res.data.hasOwnProperty("Default")) {
              this.CountryCode = res.data.Default.CountryCode;
              this.CountryID = res.data.Default.CountryID;
            }

            this.hideLoading();
            // // this.profileDetails = res.data.FirstName;
            // this.profileDetails = res.data;

            // console.log(
            //   "this.profileDetails :>>CountryISOText>> ",
            //   this.profileDetails
            // );

            // let CountryISOText = res.data.CountryISOCode.toUpperCase();
            // this.selectedCountry = CountryISOText
            //   ? CountryISOText.toString()
            //   : "";
          } else {
            this.hideLoading();
            console.log("error from res", res.message);
          }
        })
        .catch(error => {
          this.hideLoading();
          console.log("Error on vue front", error);
        });
    },
    proceedPayment() {
      this.showLoading();
      if (this.PaymentID == "20") {
        makeRequestBrij(
          `/api/cinema/create-pay-ford-intent/${this.ReserveID}`,
          "POST",
          null,
          {
            cust_id: this.cust_id,
            guest_id: this.guest_id,
            redirect_origin: window.location.origin
          }
        ).then(result => {
          this.hideLoading();
          let { res, error } = result;

          if (!res.data.hasOwnProperty("status")) {
            // document.getElementById("html_data").innerHTML=res.data;
            // this.$refs.frm.submit()
            var myWindow = window.open("", "_self");
            myWindow.document.write(res.data);
          } else {
            this.errorMessage = res.data.message;
            this.$nextTick(() => {
              this.$refs["errorModal"].show();
            });
            console.log("sdasdsad");
          }
        });
      } else if (this.PaymentID == "21") {
        makeRequestBrij(
          `/api/cinema/create-master-card-intent/${this.ReserveID}`,
          "POST",
          null,
          {
            cust_id: this.cust_id,
            guest_id: this.guest_id,
            redirect_origin: window.location.origin
          }
        ).then(result => {
          this.hideLoading();
          let { res, error } = result;
          if (!res.data.hasOwnProperty("status")) {
            // document.getElementById("html_data").innerHTML=res.data;
            window.location.href = res.data;
          } else {
            this.errorMessage = res.data.message;
            this.$nextTick(() => {
              this.$refs["errorModal"].show();
            });
          }
        });
      } else if (this.PaymentID == "19") {
        makeRequestBrij(
          `/api/cinema/free-ticket-intent/${this.ReserveID}`,
          "POST",
          null,
          {
            cust_id: this.cust_id,
            guest_id: this.guest_id,
            redirect_origin: window.location.origin
          }
        ).then(result => {
          this.hideLoading();
          let { res, error } = result;
          if (res.data.status) {
            console.log(res.data, " window.location.href = res.data;");
            this.$router.replace({
              path: `/final-ticket/${res.data.sb_booking_code}/2`
            });
          } else {
            this.errorMessage = res.data.message;
            this.$refs["errorModal"].show();
          }
        });
      }

      //
    },

    paymentListNew(totalAmount) {
      makeRequestBrij("/api/external/payment-modes/2", "GET", null, null)
        .then(result => {
          const { error, res } = result;
          const { data } = res.data;
          if (!error) {
            if (res.data) {
              if (
                res.data.hasOwnProperty("Records") &&
                res.data.Records.length > 0
              ) {
                let array = [20, 21];
                if (totalAmount <= 0) {
                  array = [19];
                }
                this.paymentListData = res.data.Records.filter(z => {
                  return array.includes(z.pm_id);
                });
                console.log(this.paymentListData, " this.paymentListData");
                this.PaymentID = this.paymentListData[0].pm_id;
              }
            }
          } else {
            console.log("object");
          }
        })
        .catch(error => {
          console.log("error", error);
        });
    },
    paymentList() {
      makeRequest("/PaymentOptions", "POST", null, {
        ReserveID: this.ReserveID
      })
        .then(result => {
          const { error, res } = result;
          const { data } = res.data;
          if (!error) {
            if (res.data) {
              if (res.data.hasOwnProperty("Data") && res.data.Data.length > 0) {
                this.paymentListData = res.data.Data;
                this.PaymentID = this.paymentListData[0].PaymentID;
              }
            }
          } else {
            console.log("object");
          }
        })
        .catch(error => {
          console.log("error", error);
        });
    }
  }
};
</script>

<style scoped></style>
