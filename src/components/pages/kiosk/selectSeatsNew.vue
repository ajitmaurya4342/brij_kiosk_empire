<template>
  <div>
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
          @click="onClickClose()"
          class="text-center mx-auto mt-3 btn-danger"
          >CLOSE</b-button
        >
      </div>
    </b-modal>
    <!-- ERROR MODAL ENDS-->
    <b-modal
      ref="modal1"
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
          @click="$refs.modal1.hide()"
          class="text-center mx-auto mt-3 btn-danger"
          >CLOSE</b-button
        >
      </div>
    </b-modal>
    <h1 class="text-center">{{ $tc("SelectYourSeat") }}</h1>
    <!-- SEATLAYOUT SECTION -->
    <section class="container-fluid mb-5 pb-5">
      <div class="col-md-11 mx-auto py-4 px-0 seatLayoutSection">
        <div class="text-center mx-auto">
          <div class="whitedotline-box w-50 w100">
            <hr class="white-dotline" />
          </div>
        </div>
      </div>
      <div class="col-lg-12 px-0 mx-auto abox mb-5">
        <div>
          <div class="screen text-center">
            <img
              src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iODc4IiBoZWlnaHQ9IjIwNy44MzgiIHZpZXdCb3g9IjAgMCA4NzggMjA3LjgzOCI+DQogIDxkZWZzPg0KICAgIDxjbGlwUGF0aCBpZD0iY2xpcC1wYXRoIj4NCiAgICAgIDxwYXRoIGlkPSJQYXRoXzE5MjkiIGRhdGEtbmFtZT0iUGF0aCAxOTI5IiBkPSJNMTI1NS4zNTYsMzM0LjkyNGE0MTEwLjk2Niw0MTEwLjk2NiwwLDAsMC01OTQuMTE4LTEuMzEyYy05LjA2NS42NjQtMTguMjgxLS41MzQtMjAuNjE4LTIuNzE5bC0xMTAtMTAyLjgyOWMtMi4zMzctMi4xODUsNS45MzUtNC43NTIsMTguNTI0LTUuNjc0YTU2NDYuMTkzLDU2NDYuMTkzLDAsMCwxLDgyNS4wNDYsMS44MjJjMTIuNTQ0Ljk3OSwyMC42NzEsMy41ODMsMTguMiw1Ljc1N0wxMjc2LjE1NiwzMzIuM0MxMjczLjY4NiwzMzQuNDcyLDEyNjQuMzg5LDMzNS42MjksMTI1NS4zNTYsMzM0LjkyNFoiIGZpbGw9IiNmZmYiIHN0cm9rZT0iIzgxMTEyMiIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIiBzdHJva2Utd2lkdGg9IjAuNzYiLz4NCiAgICA8L2NsaXBQYXRoPg0KICAgIDxsaW5lYXJHcmFkaWVudCBpZD0ibGluZWFyLWdyYWRpZW50IiB4MT0iMC41IiB5MT0iMS4wODQiIHgyPSIwLjUiIHkyPSItMC41MTQiIGdyYWRpZW50VW5pdHM9Im9iamVjdEJvdW5kaW5nQm94Ij4NCiAgICAgIDxzdG9wIG9mZnNldD0iMCIgc3RvcC1jb2xvcj0iIzU4Mzg0ZiIgc3RvcC1vcGFjaXR5PSIwIi8+DQogICAgICA8c3RvcCBvZmZzZXQ9IjAuMjM5IiBzdG9wLWNvbG9yPSIjNTgzODRmIiBzdG9wLW9wYWNpdHk9IjAuMDM5Ii8+DQogICAgICA8c3RvcCBvZmZzZXQ9IjAuNDQ1IiBzdG9wLWNvbG9yPSIjNTgzODRmIiBzdG9wLW9wYWNpdHk9IjAuMTU3Ii8+DQogICAgICA8c3RvcCBvZmZzZXQ9IjAuNjM4IiBzdG9wLWNvbG9yPSIjNTgzODRmIiBzdG9wLW9wYWNpdHk9IjAuMzYxIi8+DQogICAgICA8c3RvcCBvZmZzZXQ9IjAuODIyIiBzdG9wLWNvbG9yPSIjNTgzODRmIiBzdG9wLW9wYWNpdHk9IjAuNjQzIi8+DQogICAgICA8c3RvcCBvZmZzZXQ9IjEiIHN0b3AtY29sb3I9IiM1ODM4NGYiLz4NCiAgICA8L2xpbmVhckdyYWRpZW50Pg0KICA8L2RlZnM+DQogIDxnIGlkPSJHcm91cF81ODMiIGRhdGEtbmFtZT0iR3JvdXAgNTgzIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtODUxIC03NDYuMDU0KSI+DQogICAgPGcgaWQ9Ikdyb3VwXzU4MiIgZGF0YS1uYW1lPSJHcm91cCA1ODIiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDMzMCA1MzkuODAyKSI+DQogICAgICA8ZyBpZD0iR3JvdXBfNTgxIiBkYXRhLW5hbWU9Ikdyb3VwIDU4MSI+DQogICAgICAgIDxnIGlkPSJHcm91cF81ODAiIGRhdGEtbmFtZT0iR3JvdXAgNTgwIj4NCiAgICAgICAgICA8ZyBpZD0iR3JvdXBfNTc5IiBkYXRhLW5hbWU9Ikdyb3VwIDU3OSI+DQogICAgICAgICAgICA8ZyBpZD0iR3JvdXBfNTc0IiBkYXRhLW5hbWU9Ikdyb3VwIDU3NCI+DQogICAgICAgICAgICAgIDxwYXRoIGlkPSJQYXRoXzE5MjYiIGRhdGEtbmFtZT0iUGF0aCAxOTI2IiBkPSJNMTI1NS4zNTYsMzM0LjkyNGE0MTEwLjk2Niw0MTEwLjk2NiwwLDAsMC01OTQuMTE4LTEuMzEyYy05LjA2NS42NjQtMTguMjgxLS41MzQtMjAuNjE4LTIuNzE5bC0xMTAtMTAyLjgyOWMtMi4zMzctMi4xODUsNS45MzUtNC43NTIsMTguNTI0LTUuNjc0YTU2NDYuMTkzLDU2NDYuMTkzLDAsMCwxLDgyNS4wNDYsMS44MjJjMTIuNTQ0Ljk3OSwyMC42NzEsMy41ODMsMTguMiw1Ljc1N0wxMjc2LjE1NiwzMzIuM0MxMjczLjY4NiwzMzQuNDcyLDEyNjQuMzg5LDMzNS42MjksMTI1NS4zNTYsMzM0LjkyNFoiIGZpbGw9IiNmZmYiIHN0cm9rZT0iI2ZmZiIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIiBzdHJva2Utd2lkdGg9IjAuNzYiLz4NCiAgICAgICAgICAgIDwvZz4NCiAgICAgICAgICAgIDxnIGlkPSJHcm91cF81NzciIGRhdGEtbmFtZT0iR3JvdXAgNTc3Ij4NCiAgICAgICAgICAgICAgPHBhdGggaWQ9IlBhdGhfMTkyNyIgZGF0YS1uYW1lPSJQYXRoIDE5MjciIGQ9Ik0xMjU1LjM1NiwzMzQuOTI0YTQxMTAuOTY2LDQxMTAuOTY2LDAsMCwwLTU5NC4xMTgtMS4zMTJjLTkuMDY1LjY2NC0xOC4yODEtLjUzNC0yMC42MTgtMi43MTlsLTExMC0xMDIuODI5Yy0yLjMzNy0yLjE4NSw1LjkzNS00Ljc1MiwxOC41MjQtNS42NzRhNTY0Ni4xOTMsNTY0Ni4xOTMsMCwwLDEsODI1LjA0NiwxLjgyMmMxMi41NDQuOTc5LDIwLjY3MSwzLjU4MywxOC4yLDUuNzU3TDEyNzYuMTU2LDMzMi4zQzEyNzMuNjg2LDMzNC40NzIsMTI2NC4zODksMzM1LjYyOSwxMjU1LjM1NiwzMzQuOTI0WiIgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwKSIvPg0KICAgICAgICAgICAgICA8ZyBpZD0iR3JvdXBfNTc2IiBkYXRhLW5hbWU9Ikdyb3VwIDU3NiIgY2xpcC1wYXRoPSJ1cmwoI2NsaXAtcGF0aCkiPg0KICAgICAgICAgICAgICAgIDxnIGlkPSJfOG9aTGV1IiBkYXRhLW5hbWU9IjhvWkxldSI+DQogICAgICAgICAgICAgICAgICA8ZyBpZD0iR3JvdXBfNTc1IiBkYXRhLW5hbWU9Ikdyb3VwIDU3NSI+DQogICAgICAgICAgICAgICAgICAgIDxwYXRoIGlkPSJQYXRoXzE5MjgiIGRhdGEtbmFtZT0iUGF0aCAxOTI4IiBkPSJNMzU0LjQ4MiwyNDAuMjZjMTk2LjYzNC0yMS45MTgsMzk1LjMyOC0zMi4wOTMsNTk0Ljg3MS0zMi41MjIsMTk5LjU0OS40MSwzOTguMjUzLDEwLjU2Nyw1OTQuOSwzMi40NjRoMGwtODYuNiw1NS4yNzYtODYuNiw1NS4yNzZoMGMtMTM5LjQ4LTE1LjQwNy0yODAuMTItMjIuNjExLTQyMS42MjctMjMuMDA4LTE0MS41LjQxLTI4Mi4xMzMsNy42MjgtNDIxLjYsMjMuMDQ5aDBsLTg2LjY3My01NS4yNjdMMzU0LjQ4MiwyNDAuMjZaIiBmaWxsPSJub25lIiBzdHJva2U9IiMzMzMiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIgc3Ryb2tlLXdpZHRoPSIwLjc2Ii8+DQogICAgICAgICAgICAgICAgICA8L2c+DQogICAgICAgICAgICAgICAgPC9nPg0KICAgICAgICAgICAgICA8L2c+DQogICAgICAgICAgICAgIDxwYXRoIGlkPSJQYXRoXzE5MzAiIGRhdGEtbmFtZT0iUGF0aCAxOTMwIiBkPSJNMTI1NS4zNTYsMzM0LjkyNGE0MTEwLjk2Niw0MTEwLjk2NiwwLDAsMC01OTQuMTE4LTEuMzEyYy05LjA2NS42NjQtMTguMjgxLS41MzQtMjAuNjE4LTIuNzE5bC0xMTAtMTAyLjgyOWMtMi4zMzctMi4xODUsNS45MzUtNC43NTIsMTguNTI0LTUuNjc0YTU2NDYuMTkzLDU2NDYuMTkzLDAsMCwxLDgyNS4wNDYsMS44MjJjMTIuNTQ0Ljk3OSwyMC42NzEsMy41ODMsMTguMiw1Ljc1N0wxMjc2LjE1NiwzMzIuM0MxMjczLjY4NiwzMzQuNDcyLDEyNjQuMzg5LDMzNS42MjksMTI1NS4zNTYsMzM0LjkyNFoiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzgxMTEyMiIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIiBzdHJva2Utd2lkdGg9IjAuNzYiLz4NCiAgICAgICAgICAgIDwvZz4NCiAgICAgICAgICAgIDxnIGlkPSJHcm91cF81NzgiIGRhdGEtbmFtZT0iR3JvdXAgNTc4Ij4NCiAgICAgICAgICAgICAgPHBhdGggaWQ9IlBhdGhfMTkzMSIgZGF0YS1uYW1lPSJQYXRoIDE5MzEiIGQ9Ik01MzMuNzI2LDIyOC4wNjRjLTIuMzIxLTIuMTg1LDUuODkyLTQuNzUyLDE4LjM5LTUuNjc0YTU1NjUuMjc4LDU1NjUuMjc4LDAsMCwxLDgxOS4xLDEuODIyYzEyLjQ1NC45NzksMjAuNTIzLDMuNTgzLDE4LjA3LDUuNzU3IiBmaWxsPSJub25lIiBzdHJva2U9IiM4MTExMjIiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIgc3Ryb2tlLXdpZHRoPSIzLjc5OCIvPg0KICAgICAgICAgICAgPC9nPg0KICAgICAgICAgIDwvZz4NCiAgICAgICAgICA8cGF0aCBpZD0iUGF0aF8xOTMyIiBkYXRhLW5hbWU9IlBhdGggMTkzMiIgZD0iTTUyMSw0MTQuMDkxaDg3OEwxMjkwLjYsMzQzLjYzcy05NS43NDktMTIuNzA2LTMzNC4yMTgtMTIuNzA2UzYyOS40LDM0My42Myw2MjkuNCwzNDMuNjNaIiBmaWxsPSJ1cmwoI2xpbmVhci1ncmFkaWVudCkiLz4NCiAgICAgICAgPC9nPg0KICAgICAgPC9nPg0KICAgIDwvZz4NCiAgPC9nPg0KPC9zdmc+DQo="
              class="img-fluid"
              style="z-index: -1;"
            />
            <h2 class="movieName text-uppercase">
              {{ scheduleData.MovieTitle }}
              <span class="d-block font-weight-bold" style="font-size: 10px;">{{
                scheduleData.ScreenName
              }}</span>
            </h2>
            <!---->
          </div>

          <!-- PLEASE PICK A SEAT CATEGORY -->
          <!-- <div>
            <p class="text-center">PLEASE PICK A SEAT CATEGORY:</p>
            <ul class="list-inline text-center mx-auto">
              <li
                v-for="(seatType, seatTypeIndex) in seatTypes"
                :key="seatTypeIndex"
                class="list-inline-item"
              >
                <div class="seat-rows">{{ seatType.seattype }}</div>
                <p>SR {{ seatType.price }}</p>
              </li>
            </ul>
          </div>-->

          <!-- SEAT LAYOUT SECTION -->

          <div class="table-responsive " dir="ltr">
            <table
              v-for="(data, index) in seatTypesNew"
              :key="index + 'sjansjna'"
              class="mx-auto master"
            >
              <template>
                <tr class="last-t" style="border-bottom:20px solid transparnt">
                  <td :colspan="data.seatsFinal[0].length" align="center">
                    <div
                      v-if="String(data.price) != '0'"
                      class="text-center text-white font-weight-bold text-upppercase my-1"
                    >
                      {{ data.seatType }}
                      ({{ currFormat(data.seat_price) }} {{ curr_code }})
                    </div>
                  </td>
                </tr>

                <tr
                  v-for="(seatArray, seatArrayIndexMain) in data.seatsFinal"
                  class="last-t"
                  :key="seatArrayIndexMain + 'sasansnjnjnhb'"
                  style="border-bottom:20px solid transparnt"
                >
                  <td
                    v-for="(singleSeat, singleSeatIndex) in seatArray"
                    :key="singleSeatIndex"
                  >
                    <div
                      v-if="singleSeat.seat_reserve_type_id == 8 || singleSeat.seat_reserve_type_id == 4"
                      class="seat disable"
                    >
                      {{ singleSeat.sl_seat_name }}
                    </div>
                    <div
                      class
                      style="width: 42px;"
                      v-else-if="
                        singleSeat.srt_id == 2 ||
                          singleSeat.srt_id == 12 ||
                          singleSeat.srt_id == 13
                      "
                    ></div>
                    <div
                      v-else
                      @click="
                        newHandlerSeatSelected(
                          index,
                          seatArrayIndexMain,
                          singleSeatIndex,
                          singleSeat
                        )
                      "
                      class="seat"
                      :class="[singleSeat.SelectStatusFlag ? 'active' : '']"
                    >
                      {{ singleSeat.sl_seat_name }}
                    </div>
                  </td>
                </tr>
              </template>
            </table>
          </div>

          <ul class="list-inline seat-info text-center mt-4">
            <li class="list-inline-item mr-3">
              <span class="selec"></span>
              {{ $tc("YourSelection") }}
            </li>
            <li class="list-inline-item mr-3">
              <span class="avail"></span>
              {{ $tc("Available") }}
            </li>
            <li class="list-inline-item mr-3">
              <span class="unavail"></span>
              {{ $tc("Unavailable") }}
            </li>
          </ul>
        </div>
      </div>
    </section>

    <router-link to @click.native="onFinalCheckOut()" class="fixed-next">
      <div class="btn-round">
        <div class="btn-content">
          <div>
            <div class="h2 font-weight-bold text-red">{{ $tc("Next") }}</div>
            <div class="h3 font-weight-bold" v-if="isFnbExist">
              {{ $tc("FoodAndDrinks") }}
            </div>
          </div>
        </div>
      </div>
    </router-link>
  </div>
</template>

<script>
import seatLayoutService from "@/services/seatLayoutService.js";
import bookingService from "@/services/bookingService.js";
import { groupBy } from "lodash";
import { makeRequest, makeRequestBrij } from "@/helper/internet.js";
import moment from "moment";

export default {
  name: "Select Seats",

  data() {
    return {
      ErrorMessage: "Something went wrong",
      seatLayout: [],
      seatTypes: [],
      selectedSeats: [],
      screen_id: "",
      movie_name: "",
      schedule_id: null,
      selectedFormat: "",

      ss_id: "",
      md_id: "",
      screen_id: "",
      screen_name: "",
      seatTypesNew: [],
      maxNumberofSeats: 10,
      setSeatTypeID: 0,
      alertContent: "",
      bookingError: false,
      isFnbExist: false,
      scheduleDetails: null,
      scheduleData: {
        CinameName: "",
        MovieTitle: "",
        ScreenName: "",
        ShowDate: "",
        ShowTime: "",
        Location: "",
        Experience: ""
      }
    };
  },
  computed: {
    curr_code() {
      return this.$store.getters.getGlobalCurrency.curr_code || "Sar";
    }
  },
  beforeMount() {
    const { schedule_id } = this.$route.params;
    console.log("this.$route :", this.$route);
    this.selectedFormat = this.$route.query.Format;
    this.ss_id = this.$route.params.ss_id;
    this.md_id = this.$route.params.md_id;
    this.screen_id = this.$route.params.screen_id;
    this.schedule_id = schedule_id;
    this.getSeatLayoutNew();

    this.getScheduleDetail();
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
    getScheduleDetail() {
      makeRequestBrij(
        `/api/cinema/schedule-details/${this.ss_id}`,
        "GET",
        null,
        null
      ).then(response => {
        const { error, res } = response;
        if (res.data.status && res.data.Records.length) {
          //  alert("Seat Reserveds")
          //  console.log("Seat Re",res.data)
          let schedule_detail = res.data.Records[0];
          this.scheduleDetails = res.data.Records[0];
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
              .format("ddd, DD MMM YYYY"),
            ShowTime: moment(schedule_detail.ss_start_show_time, "HH:mm")
              .locale(this.getCurrentLang().iso_2 || "en")
              .format("hh:mm A"),
            Location: schedule_detail.cine_address,
            Experience: schedule_detail.mf_name
          };
          let payloadNew = {
            category: null,
            aggregator_cinema_id: schedule_detail.cine_id,
            cinema_id: schedule_detail.cine_id,
            isCombo: false,
            isEgg: "",
            isVeg: "",
            search: "",
            subCategory: null,
            reservation_id: null
          };
          makeRequestBrij(
            `/api/external/fnb-items`,
            "POST",
            null,
            payloadNew
          ).then(responseFnb => {
            if (responseFnb.res.data.Records.Records.length > 0) {
              this.isFnbExist = true;
            }
          });
        } else {
          this.alertContent = res.data.message;
          this.$refs["selectSeat"].show();
        }
      });
    },
    resetLayout() {
      console.log(this.allLanguageData, "Language Array");
      if (this.setSeatTypeID != 0) {
        this.alertContent = this.allLanguageData.SeatSelectionText;
        this.ErrorMessage = this.alertContent;

        this.$refs.modal1.show();
      }
      this.selectedSeats = [];
      this.seatTypesNew.map(x => {
        x.seatsFinal.map(y => {
          y.map(z => {
            // console.log(z);
            z.SelectStatusFlag = false;
          });
        });
      });
    },
    newHandlerSeatSelected(index, index1, index2, seat) {
      console.log(seat);

      if (
        seat.seat_reserve_type_id == 8 ||
        seat.seat_reserve_type_id == 4 ||
        seat.srt_id == 2 ||
        seat.srt_id == 13 ||
        seat.srt_id == 12
      ) {
        console.log("No Seatt Selection");
        return;
      }
      seat["seat_price"] = this.seatTypesNew[index].seat_price;
      // if (this.setSeatTypeID != seat.screen_seat_type_id) {
      //   // console.log(seat.ScreenSeatTypeID);

      //   this.resetLayout();
      //   this.setSeatTypeID = seat.screen_seat_type_id;
      // }
      let findIndexNew = this.selectedSeats.findIndex(x => {
        return x.sl_id == seat.sl_id;
      });
      if (findIndexNew >= 0) {
        this.selectedSeats.splice(findIndexNew, 1);
      } else if (this.selectedSeats.length == this.maxNumberofSeats) {
        this.alertContent = this.allLanguageData.SeatSelectedLimit;
        this.ErrorMessage = this.alertContent;

        this.$refs.modal1.show();
        return false;
      } else {
        this.selectedSeats.push(seat);
      }
      seat.SelectStatusFlag = !seat.SelectStatusFlag;

      if (this.selectedSeats.length > 0) {
        this.totalAmount = 0;
        this.selectedSeats.map(x => {
          this.totalAmount = parseFloat(this.totalAmount) + x.seat_price;
        });
      } else {
        this.setSeatTypeID = 0;
        this.totalAmount = 0;
      }
    },
    create_seat_layout_dynamic(payload) {
      console.log(payload.seatType.Records, "dsdsaad", payload);

      let seatData = [];
      let seatData1 = groupBy(payload.seats.Records, "sst_seat_type");
      payload.seatType.Records = payload.seatType.Records.sort(function(a, b) {
        return a.sst_order - b.sst_order;
      });

      payload.seatType.Records.map(type => {
        for (var key in seatData1) {
          if (seatData1.hasOwnProperty(key)) {
            // console.log(key + " -> " + seatData1[key]);
            if (key == type.sst_seat_type) {
              seatData[key] = seatData1[key];
            }
          }
        }
        // seatData.seat
      });
      let tempArray = [];
      for (let key in seatData) {
        if (seatData.hasOwnProperty(key)) {
          let seat_price = 0;
          let seat_net_price = 0;
          let seat_price_obj = seatData[key].filter(x => {
            return x;
          });
          // console.log('seat_price_obj :', seat_price_obj);
          if (seat_price_obj) {
            seat_price = seat_price_obj[0].seat_price;
            seat_net_price = seat_price_obj[0].seat_net_price;
          }
          // console.log('seat_price :', seat_price);
          tempArray.push({
            seatType: key,
            seat_price: seat_price,
            seat_net_price: seat_net_price,
            seats: seatData[key]
          });
        }
      }
      // let finalTempArray = [];
      // tempArray.map(item=>{
      //   let tempArray1 = [];
      //   let newtempArray =groupBy(item,"")
      // })
      let finalArray = [];

      // [{
      //   seatType: 'gold',
      //   seats: []
      // }]

      for (let i = 0; i < tempArray.length; i++) {
        let singleSeatType = tempArray[i];

        let seatData_1 = groupBy(singleSeatType.seats, "sl_row_num");
        // seatData_1 = {
        //   0: [],
        //   1: []
        // }
        let tempArray_1 = [];
        for (let key in seatData_1) {
          if (seatData_1.hasOwnProperty(key)) {
            let seatData_2 = seatData_1[key].map(singleSeat => {
              singleSeat.selectStatus = false;
              singleSeat.SelectStatusFlag = false;
              return singleSeat;
            });
            seatData_2 = seatData_2.sort(function(a, b) {
              return a.sl_col_num - b.sl_col_num;
            });

            tempArray_1.push(seatData_2);
          }
        }
        // console.log('tempArray_1 before', tempArray_1)

        // console.log('tempArray_1 after', tempArray_1)
        // tempArray_1 = [[], []]
        tempArray[i].seatsFinal = tempArray_1;
        // finalArray.push({ seatType: tempArray, seats: tempArray_1 })
      }

      // set default number of seats to 1
      return tempArray;
    },
    getSeatLayoutNew() {
      let loader = this.$loading.show();
      let payload = {
        screen_id: this.screen_id,
        ss_id: this.ss_id,
        md_id: this.md_id,
        type_seat_show: 1
      };
      makeRequestBrij("/api/external/seat-layout", "POST", null, payload).then(
        response => {
          console.log(response, "aaaa");
          const { error, res } = response;
          if (res.data.Records.length > 0) {
            let create_seat_layout_dynamic_new = this.create_seat_layout_dynamic(
              {
                seats: res.data,
                seatType: {
                  Records: res.data.screen_seat_type,
                  status: true
                }
              }
            );
            this.seatTypesNew = create_seat_layout_dynamic_new;
            console.log(this.seatTypesNew, "console.log(");

            loader.hide();
          } else {
            this.alertContent = res.data.message;
            this.ErrorMessage = this.alertContent;
            this.$refs.modal.show();
          }
        }
      );

      //  this.editNumberOfSeats(this.maxNumberofSeats)
    },
    onClickClose: function() {
      // this.selectedSeats = [];
      // this.seatLayout.map(seatRow => {
      //   seatRow.map(seat => {
      //     seat.SelectStatusFlag = false;
      //   });
      // });
      this.$refs.modal.hide();
      this.$refs.modal1.hide();
      this.$router.go(-1);
      // this.$forceUpdate();
    },

    onFinalCheckOut() {
      let isFnbSkip = this.isFnbExist ? "N" : "Y";
      isFnbSkip = "N";
      if (this.selectedSeats.length > 0) {
        let seat_layout_id = [];
        let seat_type_id = [];
        let rate_card_group_array = [];
        let reservation_id = Math.floor(Math.random() * 9000000000);
        this.selectedSeats.map(z => {
          let ratecardGroup = z.rate_card_group[0];
          let obj = {
            rate_card_id: ratecardGroup.rc_id,
            tt_id: ratecardGroup.tt_id,
            rc_g_id: ratecardGroup.rc_g_id,
            rcg_c_id: ratecardGroup.rcg_c_id,
            tt_name: ratecardGroup.tt_name,
            seat_type_id: z.screen_seat_type_id,
            status: false
          };
          rate_card_group_array.push(obj);
          seat_layout_id.push(z.sl_id);
          seat_type_id.push(z.screen_seat_type_id);
        });

        let payload = {
          groupRateCard: true,
          seat_layout_id: seat_layout_id,
          seat_type_id: seat_type_id,
          newSeatLayout: rate_card_group_array,
          schedule_show_id: this.ss_id,
          reservation_id: reservation_id,
          isVipOrBlockSeats: false,
          cinema_id: this.cinemaId,
          gogo_ss_id: 0,
          gogo_booking_type_id: 0,
          specialRequest: "",
          is_website: true
        };
        // console.log(payload)
        let loader = this.$loading.show();
        makeRequestBrij("/api/cinema/reserve-seat", "POST", null, payload).then(
          response => {
            const { error, res } = response;
            loader.hide();
            if (res.data.status) {
              if (isFnbSkip == "Y") {
                this.$router.push({
                  path: "/conf-booking/" + reservation_id
                });
              } else {
                this.$router.push({
                  path: "/food-and-drinks/" + reservation_id
                });
              }
              //  alert("Seat Reserveds")
            } else {
              this.alertContent = res.data.message;
              this.$refs["selectSeat"].show();
            }
          }
        );
      } else {
        this.ErrorMessage = "Please Select atleast one seat.";
        this.$refs.modal1.show();
      }
    }
  }
};
</script>

<style>
/* SEATLAYOUT SECTION */
.seatLayoutSection .txt {
  font-size: 18px;
  font-weight: bold;
  color: #ffffff;
}

.seatLayoutSection .seatNumList li {
  height: 30px;
  width: 30px;
  color: #cc202e;
  cursor: pointer;
  font-size: 14px;
  font-weight: bold;
  text-align: center;
  border-radius: 50%;
  align-items: center;
  display: inline-flex;
  justify-content: center;
  background-color: #810c13;
  margin-bottom: 5px;
}

.seatLayoutSection .seatNumList li.active,
.seatLayoutSection .seatNumList li:hover {
  background-color: #ffffff;
}

.screen {
  position: relative;
}

.userSelection {
  bottom: 10px;
  left: 0;
  right: 0;
  color: #ffffff;
  font-size: 18px;
  font-weight: bold;
  position: absolute;
}

.movieName {
  top: 25%;
  left: 0;
  right: 0;
  font-size: 18px;
  color: #810c13;
  font-weight: bold;
  position: absolute;
  /* transform: translateY(-50%); */
}

.table-responsive {
  display: block;
  width: 100%;
  overflow-x: auto;
  max-height: 40vh;
  -webkit-overflow-scrolling: touch;
  -ms-overflow-style: -ms-autohiding-scrollbar;
}

.abox.disable {
  opacity: 0.4;
  pointer-events: none;
}

.seat {
  height: 30px;
  width: 30px;
  margin: 5px;
  display: flex;
  cursor: pointer;
  align-items: center;
  border-radius: 5px;
  color: #000;
  font-size: 12px;
  font-weight: bold;
  justify-content: center;
  background-color: #ffffff;
}

.seat.active {
  background: linear-gradient(to right, #ffd817, #f5aa40);
}

.blank-div {
  width: 130px;
}

.seat.disable {
  color: transparent;
  background-color: rgba(65, 64, 66, 0.5);
  user-select: none;
  cursor: not-allowed;
}

.seat-range {
  border-left: 1px dotted #cacaca;
}

.seat-numbers {
  /* height: 30px; */
  width: 30px;
  background-color: transparent;
  border-radius: 5px;
  margin: 5px;
  /* background-color: aqua; */
}

.seat-cat p {
  margin-right: 20px;
}

.seat-cat p,
.seat-cat span {
  color: #cacaca;
  font-size: 14px;
}

.seat-range {
  position: relative;
}

.seat-range span {
  margin-right: 35px;
  height: 100%;
}

.seat-range::before {
  content: "";
  top: 0;
  left: 0;
  width: 20px;
  position: absolute;
  border-top: 1px dotted #cacaca;
}

.seat-range::after {
  content: "";
  bottom: 0;
  left: 0;
  width: 20px;
  position: absolute;
  border-bottom: 1px dotted #cacaca;
}

.seat-range span::before {
  content: "\2022";
  top: -0.1px;
  left: 19px;
  line-height: 0;
  font-size: 15px;
  position: absolute;
  color: #ffffff;
}

.seat-range span::after {
  content: "\2022";
  bottom: 1.2px;
  left: 19px;
  line-height: 0;
  font-size: 15px;
  position: absolute;
  color: #ffffff;
}

.seat-info li {
  font-size: 30px;
  color: #ffffff;
  font-weight: lighter;
}

.seat-info li .selec {
  width: 25px;
  height: 25px;
  margin-right: 6px;
  border-radius: 5px;
  display: inline-block;
  background: linear-gradient(to right, #ffd817, #f5aa40);
}

.seat-info li .avail {
  width: 25px;
  height: 25px;
  margin-right: 6px;
  border-radius: 5px;
  display: inline-block;
  background-color: #ffffff;
}

.seat-info li .unavail {
  width: 25px;
  height: 25px;
  margin-right: 6px;
  border-radius: 5px;
  display: inline-block;
  background-color: rgba(65, 64, 66, 0.5);
}

.seat-cat,
.seat-range,
.seat-alignment {
  display: none;
}

@media (max-width: 767px) {
  .seatLayoutSection .seatNumList li {
    height: 25px;
    width: 25px;
    margin-bottom: 5px;
  }

  .seatLayoutSection .txt {
    font-size: 14px;
  }
}

/* SEATLAYOUT SECTION END*/

.seat-rows {
  background: #fff;
  border-radius: 20px;
  color: #000;
  font-weight: bold;
  font-size: 18px;
  padding: 5px 15px;
  min-width: 135px;
  margin-bottom: 5px;
}

.seat-rows:hover,
.seat-rows.active {
  background: #e78785;
  color: #fff;
}

.movie-cat {
  background: #811122;
  border-radius: 15px;
  color: #fff;
  font-weight: bold;
  font-size: 14px;
  padding: 5px 10px;
  min-width: 135px;
  margin-bottom: 5px;
}
</style>
