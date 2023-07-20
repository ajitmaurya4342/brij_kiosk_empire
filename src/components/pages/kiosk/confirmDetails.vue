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
    <!-- ERROR MODAL ENDS-->
    <div class="col-12 pb-4 mt-5">
      <div class="row">
        <div class="col-4">
          <img
            :src="
              checkBaseUrl(
                getLangSpecificAttribute(
                  scheduleData.altMovieContent,
                  getCurrentLang().brij_lang_id,
                  'artwork'
                ) || scheduleData.artwork
              )
            "
            class="img-fluid rounded"
          />
        </div>
        <div class="col-8">
          <h5 class="movie-name mb-3">
            {{ scheduleData.MovieTitle }} ({{ scheduleData.SelectedFormat }})
            ({{ scheduleData.Language }})
          </h5>

          <div class="d-flex mb-4">
            <div class="h4">{{ scheduleData.Certificate }}</div>
            <div class="mx-3">&bull;</div>
            <div class="h4">{{ scheduleData.Genre }}</div>
            <div class="mx-3">&bull;</div>
            <div class="h4">{{ scheduleData.runtime }} minutes</div>
          </div>

          <div class="mb-4" v-if="director">
            <h4>{{ $tc("DirectedBy") }}</h4>
            <h5>{{ director }}</h5>
          </div>
          <div class="mb-4">
            <p class="h1">
              {{ scheduleData.ShowDate }}&nbsp;&nbsp;&nbsp;&nbsp;{{
                scheduleData.ShowTime
              }}
            </p>
          </div>
          <div>
            <ul class="list-inline ticket-details">
              <li class="list-inline-item">
                <span class="format ml-0">{{
                  scheduleData.SelectedFormat || "2D"
                }}</span>
              </li>
              <li class="list-inline-item">
                <div class="mt-1">
                  x {{ scheduleData.ticket_count || 2 }}
                  {{ $tc("Tickets") }}
                </div>
              </li>

              <br />
              <li class="list-inline-item">
                <div class="mt-1">Seats: {{ scheduleData.SeatName }}</div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-12">
          <div class="extra-ticket-details my-4">
            <!-- ADD COLLAPSE  -->
            <div class="mb-2">{{ $tc("Tickets") }}</div>
            <div>
              <div class="d-flex align-items-center justify-content-between">
                <div>
                  {{ scheduleData.MovieTitle }} x
                  <span class="ticket-count">{{
                    scheduleData.ticket_count
                  }}</span>
                </div>
                <div>
                  {{ curr_code }}
                  {{ currFormat(scheduleData.amount) }}
                </div>
              </div>
            </div>
            <div class="mb-2" v-if="add_ons_array.length">
              {{ $tc("Addons") }}
            </div>
            <div>
              <div
                class="d-flex align-items-center justify-content-between"
                v-if="add_ons_array.length"
                v-for="(data, idx) in add_ons_array"
                :key="idx"
              >
                <div>
                  {{ data.addons_name }} x
                  <span class="ticket-count">{{ data.quantity }}</span>
                </div>
                <div>
                  {{ curr_code }}
                  {{ currFormat(data.single_add_ons_price) }}
                </div>
              </div>
            </div>
          </div>

          <div v-if="fnbItemDataArry.length" class="extra-ticket-details mb-4">
            <!-- ADD COLLAPSE  -->
            <div class="mb-2">{{ $tc("FoodAndDrinks") }}</div>
            <div>
              <div
                v-for="(fnb, fnbKey) in fnbItemDataArry"
                :key="fnbKey"
                class="d-flex align-items-center justify-content-between"
              >
                <div>{{ fnb.title }} x {{ fnb.qty }}</div>
                <div>
                  {{ curr_code }}
                  {{
                    currFormat(
                      parseFloat(fnb.fp_total_amount) * parseInt(fnb.qty)
                    )
                  }}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="ticket-total my-4">
          <div>{{ $tc("SubTotal") }}</div>
          <div>{{ curr_code }} {{ currFormat(totalAmount) }}</div>
        </div>
      </div>
    </div>

    <router-link to @click.native="onClickProceed()" class="fixed-next">
      <div class="btn-round">
        <div class="btn-content">
          <div>
            <div class="h2 font-weight-bold text-red">{{ $tc("Next") }}</div>
            <div class="h3 font-weight-bold">{{ $tc("Checkout") }}</div>
          </div>
        </div>
      </div>
    </router-link>
  </div>
</template>
<script>
import bookingService from "@/services/bookingService.js";
import { BASEURL } from "@/config/index.js";
import { groupBy } from "lodash";
import { makeRequest, makeRequestBrij } from "@/helper/internet.js";
import moment from "moment";

export default {
  name: "Confirm booking",
  data() {
    return {
      reserve_id: "",
      reserveDetails: {},
      ErrorMessage: "Something went wrong",
      scheduleData: {
        CinameName: "",
        MovieTitle: "",
        ScreenName: "",
        ShowDate: "",
        ShowTime: "",
        Location: "",
        Experience: "",
        Currency: "",
        SeatName: "",
        SchID: "",
        //extra
        MovieImage: "",
        runtime: "",
        Genre: "",
        Certificate: "",
        SelectedFormat: "",
        Language: "",
        director: "",
        ticket_count: "",
        amount: 0,
        fnb_total: 0,
        artwork: "",
        altMovieContent: ""
      },
      totalAmount: 0,
      reservationDetails: null,
      cinemaID: 0,
      selectedSeatsNew: [],
      fnbItemData: [],
      fnbItemDataTemp: [],
      ReserveID: null,
      FNbPrice: { total_price: 0, total_tax: 0 },
      fnbItems: [],
      timer: {
        TimeoutModal: false,
        minutes: 9,
        seconds: 59,
        stop: false
      },
      fnbItemDataArry: [],
      addonsAmount: 0,
      add_ons_array: [],
      add_ons_array_on_final_price: [],
      add_ons_total: 0
    };
  },
  beforeMount() {
    const { reserve_id } = this.$route.params;
    this.reserve_id = reserve_id;
    this.ReserveID = reserve_id;
  },
  mounted() {
    this.getReserveInfo();
  },
  computed: {
    curr_code() {
      return this.$store.getters.getGlobalCurrency.curr_code || "Sar";
    },
    director() {
      return localStorage.getItem("director");
    },
    language_id() {
      let lang_name = "en";
      if (localStorage.getItem("language")) {
        lang_name = JSON.parse(localStorage.getItem("language")).language;
      }
      return lang_name;
    }
  },
  methods: {
    getCinemaTranslatedName(cinema) {
      if (!cinema) return "";

      let name =
        this.getLangSpecificAttribute(
          cinema.translation_data || [],
          this.getCurrentLang().brij_lang_id,
          "cinema_name",
          "langaugeId"
        ) || cinema.cinema_name;

      return name;
    },
    closeModal() {
      this.callSeatReleased();
      this.$refs.modal.hide();
      this.$router.go(-1);
    },

    callSeatReleased() {
      makeRequestBrij("/api/external/release-seat", "POST", null, {
        reservation_id: this.ReserveID
      }).then(result2 => {});
    },
    getReserveInfo() {
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
              if (schedule_detail.add_ons_array.length) {
                this.add_ons_array =
                  schedule_detail.add_ons_array[0].gross_amount_addons;
                console.log(
                  schedule_detail.add_ons_array[0].gross_amount_addons
                );

                this.add_ons_array_on_final_price = schedule_detail
                  .add_ons_array[0].gross_amount_addons_on_ticket
                  ? schedule_detail.add_ons_array[0]
                      .gross_amount_addons_on_ticket
                  : [];
                this.add_ons_total =
                  schedule_detail.add_ons_array[0].BoxOfficeFinal.TotalAddons;
                // quantity //addons_name //final_price
              }

              this.reservationDetails = res.data.Records[0];
              this.scheduleData = {
                CinameName:
                  this.getCinemaTranslatedName(schedule_detail) ||
                  schedule_detail.cine_name,
                MovieTitle:
                  this.getLangSpecificAttribute(
                    schedule_detail.altMovieContent,
                    this.getCurrentLang().brij_lang_id,
                    "mc_title"
                  ) ||
                  schedule_detail.movie_title ||
                  schedule_detail.original_title_of_movie,
                ScreenName: schedule_detail.screen_name,
                ShowDate: moment(schedule_detail.ss_actual_start_date)
                  .locale(this.getCurrentLang().iso_2 || "en")
                  .format("DD-MM-YYYY"),
                ShowTime: moment(schedule_detail.ss_start_show_time, "HH:mm")
                  .locale(this.getCurrentLang().iso_2 || "en")
                  .format("hh:mm A"),
                Location: schedule_detail.cine_address,
                Experience: schedule_detail.mf_name,
                Currency:
                  this.$store.getters.getGlobalCurrency.curr_code || "Sar",
                SeatName: schedule_detail.seat_name,
                SchID: schedule_detail.ss_id,
                //
                MovieImage: schedule_detail.md_thumbnail_url,
                runtime: schedule_detail.mrrdr_runtime,
                Genre: schedule_detail.all_genre,
                Certificate: schedule_detail.rating,
                SelectedFormat: schedule_detail.mf_name,
                Language: schedule_detail.lang_name,
                director: "",
                ticket_count: schedule_detail.seat_name.split(",").length,
                amount: schedule_detail.amount,
                fnb_total: 0,
                artwork: schedule_detail.artwork,
                altMovieContent: schedule_detail.altMovieContent
              };

              this.scheduleData.fnb_total = 0;
              if (
                schedule_detail.hasOwnProperty("fnb_data") &&
                schedule_detail.fnb_data &&
                schedule_detail.fnb_data.hasOwnProperty("selected_fnb_items") &&
                schedule_detail.fnb_data.selected_fnb_items.length > 0
              ) {
                console.log(
                  schedule_detail.fnb_data.selected_fnb_items,
                  "FNBBB"
                );
                this.fnbItemDataArry =
                  schedule_detail.fnb_data.selected_fnb_items;

                this.fnbItemDataArry.map(z => {
                  z["qty"] = z.Quantity;
                  z["title"] = z.item_name;
                  this.scheduleData.fnb_total = +parseFloat(
                    this.scheduleData.fnb_total + z.fp_total_amount * z.Quantity
                  ).toFixed(2);
                });
              } else {
                console.log("res.datares.datares.datares.datares.data");
              }
              console.log(this.scheduleData.fnb_total, "scheduleData");

              if (
                schedule_detail.hasOwnProperty("selectedSeats") &&
                schedule_detail.selectedSeats.length > 0
              ) {
                this.selectedSeatsNew = schedule_detail.selectedSeats;

                if (schedule_detail.amount) {
                  this.totalAmount = +parseFloat(
                    this.scheduleData.amount
                  ).toFixed(4);
                }
                if (this.scheduleData.fnb_total) {
                  this.totalAmount = +parseFloat(
                    this.totalAmount + this.scheduleData.fnb_total
                  ).toFixed(4);
                }

                console.log(this.add_ons_array, "add_ons_array_on_final_price");

                this.totalAmount = +parseFloat(
                  this.totalAmount + this.add_ons_total
                ).toFixed(4);
                this.timer.minutes = schedule_detail.timer_minutes;
                this.timer.seconds = schedule_detail.timer_second;
                this.startTimer();
              }
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

          clearInterval(this.timerStartFunction);
          return false;
        } else {
        }
      }, 1000);
    },
    getReserveDetails: function(reserve_id) {
      let loader = this.$loading.show();
      let payload = {
        reserve_id: reserve_id
      };
      bookingService
        .getReserveDetails(payload)
        .then(response => {
          loader.hide();
          const { data } = response;
          if (data && data.status) {
            this.reserveDetails = data.data;
          } else {
            this.$refs.modal.show();
            this.ErrorMessage = data.Message || data.message;
          }
        })
        .catch(err => {
          loader.hide();
          this.$refs.modal.show();
        });
    },
    onClickProceed: function() {
      this.$router.push({
        path: "/payment/" + this.reserve_id
      });
    }
  }
};
</script>
<style>
.extra-ticket-details {
  font-size: 24px;
}

.ticket-total {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  font-size: 32px;
  border-top: 2px solid;
  border-bottom: 2px solid;
  padding: 10px;
}

.font-50 {
  font-size: 50px;
}

.movie-name {
  font-size: 35px;
  font-weight: bold;
  margin-right: 30px;
}

.rtl {
  direction: rtl;
}

.opacity {
  opacity: 0.4;
  transition: 0.3s ease-in;
}

.slick-center .opacity {
  opacity: 1;
}

.date-number {
  line-height: 1;
  font-size: 125px;
}

.month {
  font-size: 40px;
  line-height: 1;
  margin-bottom: 10px;
  font-weight: lighter;
}

.day {
  font-size: 50px;
  line-height: 1;
}

.showtime,
.format-list {
  padding: 0;
  text-align: center;
  list-style: none;
}

.format {
  padding: 0px 15px;
  display: flex;
  border-radius: 5px;
  align-items: center;
  justify-content: center;
  margin-left: 15px;
  font-size: 30px;
  border: 2px solid #fff;
}

.format.active {
  border: 2px solid #d3d3d3;
  background-color: #86bf3f;
}

.showtime .fill-green {
  border: 2px solid #86bf3f;
}

.showtime li {
  margin: 0 15px;
  width: 108px;
  height: 108px;
  border-radius: 15px;
  background: #fff;
  border: 2px solid #e6e6e6;
  display: inline-block;
  color: #e6e6e6;
  padding-top: 12px;
  font-size: 14px;
  position: relative;
  overflow: hidden;
  cursor: pointer;
  transform: scale(1);
  transition: 0.3s ease;
}

.timing-slot {
  position: absolute;
  left: 0;
  right: 0;
  z-index: 1;
}

.fill-green .filling {
  color: #000;
  background: #86bf3f;
  border: 2px solid #86bf3f;
}

.fill-height .filling {
  height: 40%;
  -webkit-transition: 0.4s;
  -o-transition: 0.4s;
  transition: 0.4s;
}

.filling {
  position: absolute;
  background: #e6e6e6;
  width: 100%;
  display: table;
  bottom: 0;
  -webkit-transition: 0.4s;
  -o-transition: 0.4s;
  transition: 0.4s;
}

.showtime .fill-green .time,
.showtime .fill-red .time,
.showtime .fill-yellow .time {
  color: #434345;
  font-size: 14px;
}

.showtime li.active,
.showtime li:hover {
  transform: scale(1.3);
  transition: 0.3s ease;
}

.fixed-next {
  position: fixed;
  bottom: 8%;
  left: calc(50% - 125px);
}

.ticket-details {
  font-size: 40px;
}
</style>
