<template>
  <div>
    <div class="col-md-11 mx-auto">
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
    <div class="kiosk-welcome">
      <!-- ERROR MODAL -->
      <b-modal
        ref="modal"
        id="modal-1"
        no-close-on-esc
        no-close-on-backdrop
        hide-header-close
        hide-footer
        hide-header
      >
        <p class="my-4 black text-center">{{ ErrorMessage }}</p>
        <div class="text-center">
          <b-button
            @click="closeModal"
            class="text-center mx-auto mt-3 btn-danger"
            >CLOSE</b-button
          >
        </div>
      </b-modal>

      <b-modal
        ref="modal1"
        id="modal-11"
        no-close-on-esc
        no-close-on-backdrop
        hide-header-close
        hide-footer
        hide-header
      >
        <p class="my-4 black text-center">{{ ErrorMessage }}</p>
        <div class="text-center">
          <b-button
            @click="$refs.modal1.hide()"
            class="text-center mx-auto mt-3 btn-danger"
            >CLOSE</b-button
          >
        </div>
      </b-modal>

      <!-- ERROR MODAL ENDS-->
      <div style="min-width:767px;">
        <h2 class="mb-5 w-75 mx-auto">
          {{ $tc("AlmostDoneSignInToConfirmYourBooking") }}
        </h2>

        <div>
          <form action>
            <div class="input-wrapper w-75">
              <input
                @click="
                  showKeyboard = true;
                  type = 'user_email';
                  input = '';
                "
                v-model="user_email"
                type="email"
                required
                :placeholder="$tc('YourEmail')"
                class="input-kiosk"
              />
            </div>
            <div class="input-wrapper w-75">
              <input
                v-model="user_mobile"
                @click="
                  showKeyboard = true;
                  type = 'user_mobile';
                  input = '';
                "
                type="number"
                required
                :placeholder="$tc('YourContactNo')"
                class="input-kiosk"
              />
            </div>
          </form>
        </div>
        <router-link
          to
          @click.native="onClickProceed()"
          class="d-table mx-auto"
        >
          <div class="btn-round">
            <div class="btn-content">
              <div>
                <div class="h2 font-weight-bold text-red">
                  {{ $tc("Proceed") }}
                </div>
              </div>
            </div>
          </div>
        </router-link>
      </div>
    </div>
    <SimpleKeyboard
      v-if="showKeyboard"
      @onChange="onChange"
      @onKeyPress="onKeyPress"
      :input="input"
      :type="type"
    />
  </div>
</template>

<script>
import bookingService from "@/services/bookingService.js";
import SimpleKeyboard from "./SimpleKeyboard";
import { makeRequest, makeRequestBrij } from "@/helper/internet.js";
import moment from "moment";

export default {
  name: "Confirm booking",
  components: {
    SimpleKeyboard
  },
  data() {
    return {
      showKeyboard: false,
      ErrorMessage: "Something went wrong",
      reserve_id: "",
      user_email: "",
      user_mobile: "",
      input: "",
      type: "email_id",
      timer: {
        TimeoutModal: false,
        minutes: 9,
        seconds: 59,
        stop: false
      },
      ReserveID: null
    };
  },
  computed: {
    language_id() {
      let lang_name = "en";
      if (localStorage.getItem("language")) {
        lang_name = JSON.parse(localStorage.getItem("language")).language;
      }
      return lang_name;
    }
  },
  beforeMount() {
    const { reserve_id } = this.$route.params;
    this.reserve_id = reserve_id;
    this.ReserveID = this.$route.params.reserve_id;
    this.getReserveInfo();
  },
  methods: {
    callSeatReleased() {
      makeRequestBrij("/api/external/release-seat", "POST", null, {
        reservation_id: this.ReserveID
      }).then(result2 => {});
    },
    closeModal() {
      this.callSeatReleased();
      this.$refs.modal.hide();
      this.$router.go(-1);
    },
    getReserveInfo() {
      let payload = {};
      let loader = this.$loading.show();
      makeRequestBrij(
        `/api/external/reservation-detail/${this.ReserveID}`,
        "GET",
        null,
        null
      )
        .then(result => {
          const { error, res } = result;
          const { data } = res.data;
          loader.hide();
          if (!error) {
            if (res.data && res.data.status) {
              let schedule_detail = res.data.Records[0];
              this.timer.minutes = schedule_detail.timer_minutes;
              this.timer.seconds = schedule_detail.timer_second;
              this.startTimer();
            } else {
              // setTimeout(() => {
              this.$nextTick(() => {
                setTimeout(() => {
                  this.ErrorMessage = res.data.message;
                  this.$refs.modal.show();
                }, 1000);
              });

              // });
            }
          } else {
            this.ErrorMessage = res.data.message;
            this.$refs.modal.show();
            console.log("object");
          }
        })
        .catch(error => {
          this.ErrorMessage = "Something Went Wrong";
          this.$refs.modal.show();
          console.log("error", error);
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
          this.ErrorMessage = "Session Expired";
          this.$refs["modal"].show();
          // this.$router.push({
          //   name: "cinemashowtimes",
          //   params: {
          //     movieId: "313",
          //     cat_id: "1",
          //     movieName: this.scheduleData.MovieTitle.replace(/ /g, "-")
          //   }
          // });
          // this.$root.$emit("bv::show::modal", "sessionTimeOut");
          clearInterval(this.timerStartFunction);
          return false;
        } else {
        }
      }, 1000);
    },
    onChange(input) {
      if (this.type == "user_email") {
        this.user_email = input;
      } else if (this.type == "user_mobile") {
        this.user_mobile = input;
      }
    },
    onKeyPress(button) {
      console.log("button", button);
    },
    onClickProceed: function() {
      var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      if (this.user_email == "") {
        this.$refs.modal1.show();
        this.ErrorMessage = "Please Enter Email Address";
      } else if (!this.user_email.match(mailformat)) {
        this.$refs.modal1.show();
        this.ErrorMessage = "You have entered an invalid email address!";
      } else if (this.user_mobile == "") {
        this.$refs.modal1.show();
        this.ErrorMessage = "Please Enter Mobile Number";
      } else {
        let loader = this.$loading.show();
        let guest_detail = {
          guest_email: this.user_email,
          guest_first_name: "-",
          guest_last_name: "-",
          guest_mobile: this.user_mobile,
          guest_country_code: "966",
          guest_user_id: this.reserve_id,
          isUpdateLang: false,
          selected_lang_id: 1,
          country_id: 191
        };
        localStorage.setItem("guest_detail", JSON.stringify(guest_detail));
        loader.hide();
        this.$router.replace({
          path: "/confirmDetails/" + this.reserve_id
        });
      }
    }
  }
};
</script>

<style></style>
