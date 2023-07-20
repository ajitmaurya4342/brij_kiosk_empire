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
              {{ movie_name }}
              <span class="d-block font-weight-bold" style="font-size: 10px;">{{
                screen_id
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

          <div class="table-responsive direction-ltr">
            <table
              v-for="(seatType, index) in seatTypes"
              :key="index + 'sjansjna'"
              class="mx-auto master"
            >
              <template>
                <tr class="last-t" style="border-bottom:20px solid transparnt">
                  <td
                    v-for="(count, countIndex) in seatType.List"
                    :key="countIndex + 'sjas'"
                    :colspan="count.count"
                  >
                    <div
                      v-if="String(count.price) != '0'"
                      class="text-center text-white font-weight-bold text-upppercase my-1"
                    >
                      {{
                        count.name && /_1/.test(count.name)
                          ? count.name.replace(/_1/g, "")
                          : count.name
                      }}
                      {{ count.price }}
                    </div>
                  </td>
                </tr>

                <tr
                  v-for="(seatArray, seatArrayIndexMain) in seatLayout"
                  class="last-t"
                  :key="seatArrayIndexMain + 'sasansnjnjnhb'"
                  style="border-bottom:20px solid transparnt"
                >
                  <td
                    v-for="(singleSeat, singleSeatIndex) in seatArray"
                    :key="singleSeatIndex"
                  >
                    <div
                      v-on:click="
                        handlerSeatSelected(
                          singleSeat,
                          seatArrayIndexMain,
                          singleSeatIndex
                        )
                      "
                      v-if="
                        seatType.nameList.includes(singleSeat.seattype) &&
                          singleSeat.status == 1
                      "
                      class="seat"
                      :data-y="singleSeat.seattype"
                      :class="[
                        singleSeat.seattype == 'LO' ? 'lo-border' : '',
                        singleSeat.SelectStatusFlag ? 'active' : ''
                      ]"
                    >
                      {{ singleSeat.seatname }}
                    </div>
                    <div
                      v-else-if="
                        seatType.nameList.includes(singleSeat.seattype) &&
                          singleSeat.status == 2
                      "
                      class="seat disable"
                      :class="singleSeat.seattype == 'LO' ? 'lo-border' : ''"
                      :data-y="singleSeat.seattype"
                    >
                      {{ singleSeat.seatname }}
                    </div>
                    <div v-else class style="width: 42px;"></div>
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

    <router-link to @click.native="onSelectSeats()" class="fixed-next">
      <div class="btn-round">
        <div class="btn-content">
          <div>
            <div class="h2 font-weight-bold text-red">{{ $tc("Next") }}</div>
            <div class="h3 font-weight-bold">{{ $tc("FoodAndDrinks") }}</div>
          </div>
        </div>
      </div>
    </router-link>
  </div>
</template>

<script>
import seatLayoutService from "@/services/seatLayoutService.js";
import bookingService from "@/services/bookingService.js";

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
      selectedFormat: ""
    };
  },
  beforeMount() {
    const { schedule_id } = this.$route.params;
    console.log("this.$route :", this.$route);
    this.selectedFormat = this.$route.query.Format;
    this.schedule_id = schedule_id;
    this.getSeatLayout(schedule_id);
  },
  methods: {
    onClickClose: function() {
      // this.selectedSeats = [];
      // this.seatLayout.map(seatRow => {
      //   seatRow.map(seat => {
      //     seat.SelectStatusFlag = false;
      //   });
      // });
      this.$refs.modal.hide();
      this.$router.go(-1);
      // this.$forceUpdate();
    },
    getSeatLayout: function(schedule_id) {
      let self = this;
      let loader = this.$loading.show();
      let payload = {
        schedule_id: schedule_id
      };
      seatLayoutService
        .getSeatLayout(payload)
        .then(response => {
          loader.hide();
          const { data } = response;
          if (data && data.status) {
            // this.seatLayout = data.seatlayout;
            // this.seatTypes = data.seattype;
            let startSeatLayout = data.seatlayout;
            this.screen_id = data.screenname;
            this.movie_name = data.movie_name;
            let counter = 0;
            let array = [];
            startSeatLayout.map((row, rowIndex) => {
              row.map((singleSeat, singleSeatIndex) => {
                let arrayIndex = array.indexOf(singleSeat.seattype);
                if (arrayIndex > -1 && arrayIndex !== array.length - 1) {
                  singleSeat.seattype = singleSeat.seattype + "_1";
                  if (array.indexOf(singleSeat.seattype) === -1) {
                    array.push(singleSeat.seattype);
                  }
                } else if (arrayIndex === -1) {
                  array.push(singleSeat.seattype);
                }
                console.log("array :", array);
              });
            });
            console.log("startSeatLayout :", startSeatLayout);
            this.seatLayout = startSeatLayout;

            let seatRowType = "";
            this.seatLayout.map(seatRow => {
              let temp = [
                ...new Set(seatRow.map(({ seattype }) => seattype))
              ].join("&$");
              let arr = temp.split("&$").map(c => {
                let obj = {};
                let d = seatRow.filter(({ seattype }) => seattype === c);
                obj["name"] = c;
                obj["count"] = d.length;
                obj["price"] = c.length > 0 && d.length > 0 ? d[0].price : "";
                return obj;
              });

              if (
                this.seatTypes.filter(({ name }) => name === temp).length == 0
              ) {
                this.seatTypes.push({
                  name: temp,
                  List: arr, // temp.split('&$'),
                  nameList: temp.split("&$")
                });
              }
              // seatRow.map(singleSeat => {
              // if (seatRowType != singleSeat.seattype) {
              //   seatRowType = singleSeat.seattype;
              //   this.seatTypes.push({
              //     seatid: seatRowType,
              //     price: singleSeat.price,
              //     seattype: seatRowType
              //   });
              // }
              // });
            });
            console.log("this.seatTypes :", this.seatTypes);
            this.seatLayout.map(seatRow => {
              seatRow.map(seat => {
                seat.SelectStatusFlag = false;
              });
            });
            console.log("this.seatLayout :", this.seatLayout);
          } else {
            this.$refs.modal.show();
            this.ErrorMessage = data.Message || data.message;
          }
        })
        .catch(err => {
          loader.hide();
          self.$refs.modal.show();
        });
    },
    handlerSeatSelected: function(
      singleSeat,
      seatArrayIndexMain,
      singleSeatIndex
    ) {
      let _index = this.selectedSeats.findIndex(
        x => x.seatname == singleSeat.seatname
      );
      let selected_seattype = "";
      if (this.selectedSeats.length > 0) {
        selected_seattype = this.selectedSeats.map(y => {
          return y.seattype;
        })[0];
      }
      console.log("selected_seattype :", selected_seattype);
      console.log("this.singleSeat :", singleSeat);
      if (_index > -1) {
        this.seatLayout[seatArrayIndexMain][
          singleSeatIndex
        ].SelectStatusFlag = false;
        this.selectedSeats.splice(_index, 1);
      } else if (
        this.selectedSeats.length > 0 &&
        singleSeat.seattype !== selected_seattype
      ) {
        this.selectedSeats = [];
        this.seatLayout.map(seatRow => {
          seatRow.map(seat => {
            seat.SelectStatusFlag = false;
          });
        });
        this.selectedSeats.push(singleSeat);
        this.seatLayout[seatArrayIndexMain][
          singleSeatIndex
        ].SelectStatusFlag = true;
      } else {
        this.selectedSeats.push(singleSeat);
        this.seatLayout[seatArrayIndexMain][
          singleSeatIndex
        ].SelectStatusFlag = true;
      }

      this.$forceUpdate();
    },
    onSelectSeats: function() {
      if (this.selectedSeats.length > 0) {
        let loader = this.$loading.show();
        this.selectedSeats = this.selectedSeats.map(x => {
          if (x.seattype && /_1/.test(x.seattype)) {
            x.seattype = x.seattype.replace(/_1/g, "");
          } else {
            x.seattype = x.seattype;
          }
          return x;
        });
        console.log("this.selectedSeats :", this.selectedSeats);
        let payload = {
          seats: this.selectedSeats,
          booking_id: this.schedule_id,
          selectedFormat: this.selectedFormat
        };
        bookingService
          .reserveSeat(payload)
          .then(response => {
            const { data } = response;
            loader.hide();
            if (data && data.status) {
              this.$router.push({
                path: "/select-fnb/" + data.reserve_id
              });
            } else {
              this.ErrorMessage = data.Message || data.message;
              this.$refs.modal.show();
            }
          })
          .catch(err => {
            loader.hide();
            this.$refs.modal.show();
          });
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
