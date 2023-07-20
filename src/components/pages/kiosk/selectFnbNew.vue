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
          @click="closeModal"
          class="text-center mx-auto mt-3 btn-danger"
          >CLOSE</b-button
        >
      </div>
    </b-modal>
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
    <!-- ERROR MODAL ENDS-->
    <div>
      <div class="h4 mt-3">{{ $tc("SomethingToSnackOn") }}</div>
      <div class="mt-4 mb-5" v-if="fnbItemDataTemp.length">
        <ul class="list-inline fb-list mb-2">
          <li
            @click="getTitleIndex('all')"
            class="list-inline-item mx-2"
            :class="FnbSelected == 'all' ? 'active' : ''"
          >
            All
          </li>
          <li
            @click="getTitleIndex(data.Id)"
            class="list-inline-item mx-2"
            :class="FnbSelected == data.Id ? 'active' : ''"
            v-for="(data, index) in fnbItemDataTemp"
            :key="index"
          >
            {{ data.Title }}
          </li>
        </ul>
        <p class="h4">
          {{ fnbItems && fnbItems.length ? fnbItems.length : 0 }}
          Items
        </p>
      </div>
    </div>

    <section class="select-fnb">
      <div class="row mt-4">
        <div class="col-3 mb-5" v-for="(fbBox, box) in fnbItems" :key="box">
          <div class="text-center fb-img-box mb-3">
            <img :src="fbBox.item_image_url" alt width="164" />
          </div>
          <div class="text-center">
            <div class="height-60px">
              <p class="mb-0">{{ fbBox.item_name }}</p>
              <p class="mb-0 small">
                {{ curr_code }} {{ fbBox.fp_total_amount }}
              </p>
            </div>
            <div class="counter-box">
              <button
                :class="fbBox['ItemQty'] == 0 ? 'disabled' : ''"
                v-on:click="storeFnbItems(fbBox, 'sub', box)"
                id="decrease"
                type="button"
                data-inc="-1"
                class="decrease"
              >
                -
              </button>
              <div id="output" class="output">
                {{ fbBox["ItemQty"] ? fbBox.ItemQty : 0 }}
              </div>
              <button
                v-on:click="storeFnbItems(fbBox, 'add', box)"
                id="increase"
                :class="fbBox['ItemQty'] == 10 ? 'disabled' : ''"
                type="button"
                data-inc="1"
                class="increase"
              >
                +
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <router-link
      to
      @click.native="onSubmitfnbCheckOut()"
      class="d-table mx-auto"
    >
      <div class="btn-round">
        <div class="btn-content">
          <div>
            <div class="h2 font-weight-bold text-red">{{ $tc("Next") }}</div>
            <div class="h3 font-weight-bold">{{ $tc("ConfirmOrder") }}</div>
          </div>
        </div>
      </div>
    </router-link>

    <div class="mx-auto text-center">
      <ul class="list-inline mt-5">
        <li class="list-inline-item">
          <div class="d-flex align-items-center justify-content-center mx-auto">
            <div class="mr-3">
              <img src="@/assets/img/cart-icon.png" alt />
            </div>
            <div>
              <p class="mb-0 h4">
                {{ userSelectedFnBItems.length }} ITEM,
                <strong>{{ curr_code }} {{ FNbPrice.total_price }}</strong>
              </p>
              <!-- <p class="mb-0 text-left">+ a</p>
               -->
              <div class="d-flex flex-wrap pt-2">
                <div
                  v-for="(datafnb, indexf) in userSelectedFnBItems"
                  :key="indexf"
                  class="pb-2 food-list"
                >
                  ( {{ datafnb.Qty }} X {{ datafnb.ItemName }} )
                </div>
              </div>
            </div>
          </div>
        </li>
        <li class="list-inline-item font-weight-bold mx-5">OR</li>
        <li class="list-inline-item">
          <router-link :to="'/conf-booking/' + reserve_id" class="text-white h4"
            >{{ $tc("SkipToSummary") }}
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import fnbService from "@/services/fnbService.js";
import { BASEURL } from "@/config/index.js";
import { groupBy } from "lodash";
import { makeRequest, makeRequestBrij } from "@/helper/internet.js";
import moment from "moment";
import { EventBus } from "@/main";

export default {
  name: "Select Fnb",
  data() {
    return {
      reserve_id: null,
      total: 0,
      count: 0,
      URL_BASE: BASEURL,
      FnbSelected: "all",
      ErrorMessage: "Something went wrong",
      fnbItems: [],
      selectedName: "All",
      SelctedFnBArray: [],
      allFnbItems: [],
      selectedFbItem: {
        name: "All"
      },
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
        SchID: ""
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
      userSelectedFnBItems: []
    };
  },
  mounted() {},
  beforeMount() {
    const { reserve_id } = this.$route.params;
    this.reserve_id = reserve_id;
    this.ReserveID = this.$route.params.reserve_id;
    this.getReserveInfo();
    // this.getFnbItems(reserve_id);
  },
  computed: {
    curr_code() {
      return this.$store.getters.getGlobalCurrency.curr_code || "Sar";
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
    skipFNB() {
      this.$router.replace({
        path: "/conf-booking/" + this.ReserveID
      });
    },
    onSubmitfnbCheckOut: function() {
      if (this.userSelectedFnBItems.length == 0) {
        this.skipFNB();
        return false;
      }
      let loader = this.$loading.show();

      let payload = {
        reservation_id: this.ReserveID,
        selected_fnb_items: this.selectedItems(),
        fnb_price: this.FNbPrice,
        category_id: 2
      };

      makeRequestBrij("/api/external/save-fnb-items", "POST", null, payload)
        .then(result => {
          const { error, res } = result;
          const { data } = res.data;
          if (!error && res.data.status) {
            loader.hide();

            this.skipFNB();
          } else {
            // show error modal
            this.$root.$emit("bv::show::modal", "errorModal");
          }
          this.hideLoading();
        })
        .catch(error => {
          this.hideLoading();
          console.log("Error on vue front", error);
        });
    },
    storeFnbItems(foodItem, type) {
      let index = this.fnbItemData.findIndex(z => {
        return z.Id == foodItem.fc_id;
      });
      let lowerIndex = -1;
      if (index >= 0) {
        lowerIndex = this.fnbItemData[index].items.findIndex(z => {
          return z.Id == foodItem.item_id;
        });
      }
      console.log(index, lowerIndex);
      if (index >= 0 && lowerIndex >= 0) {
        if (type == "add") {
          foodItem.ItemQty = foodItem.ItemQty + 1;
          let selecteditem = this.fnbItemData[index].items.filter(x => {
            return x.Id == foodItem.item_id;
          });
          if (selecteditem.length > 0) {
            if (selecteditem[0].Qty < 10) {
              this.fnbItemData[index].items[lowerIndex].Qty += 1;
              this.totalAmount = +parseFloat(
                parseFloat(this.totalAmount) +
                  parseFloat(selecteditem[0].Amount)
              ).toFixed(4);
            }
          }
        }

        if (type == "sub") {
          foodItem.ItemQty = foodItem.ItemQty - 1;
          let selecteditem = this.fnbItemData[index].items.filter(x => {
            return x.Id == foodItem.item_id;
          });
          if (selecteditem.length > 0 && selecteditem[0].Qty != 0) {
            this.fnbItemData[index].items[lowerIndex].Qty -= 1;

            this.totalAmount = +parseFloat(
              parseFloat(this.totalAmount) - parseFloat(selecteditem[0].Amount)
            ).toFixed(4);
            console.log(selecteditem, "ki");
          }
        }

        this.userSelectedFnBItems = [];
        // this.fnbQty = 0;
        this.fnbItemData.map(category => {
          if (category.items) {
            category.items.map(item => {
              if (item.Qty != 0) {
                let obj = {
                  Id: item.Id,
                  Qty: item.Qty,
                  ItemName: item.ItemName
                };
                this.userSelectedFnBItems.push(obj);
              }
            });
          }
        });
      }

      console.log(this.fnbItemData, "onCLic");
      this.selectedItems();
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
    selectedItems() {
      let selectedItem = [];
      this.FNbPrice["total_price"] = 0;
      this.FNbPrice["total_tax"] = 0;
      this.fnbItemData.map(z => {
        z.items.map(_it => {
          if (_it.Qty > 0) {
            let TotalPrice =
              +parseFloat(_it.FnbDetail.fp_total_amount).toFixed(4) * _it.Qty;
            let TotalTax =
              +parseFloat(
                _it.FnbDetail.fp_total_amount - _it.FnbDetail.fp_amount
              ).toFixed(4) * _it.Qty;

            this.FNbPrice["total_price"] = +parseFloat(
              this.FNbPrice["total_price"] + TotalPrice
            ).toFixed(4);
            this.FNbPrice["total_tax"] = +parseFloat(
              this.FNbPrice["total_tax"] + TotalTax
            ).toFixed(4);
            let obj = {
              ..._it.FnbDetail,
              Quantity: _it.Qty,
              quantity: _it.Qty,
              total_price: TotalPrice,
              total_tax: TotalTax
            };
            selectedItem.push(obj);
          }
        });
      });

      return selectedItem;
    },
    getTitleIndex(id) {
      this.FnbSelected = id;
      if (this.FnbSelected == "all") {
        this.fnbItems = this.TempFnbItem;
      } else {
        this.fnbItems = this.TempFnbItem.filter(z => {
          return z.fc_id == id;
        });
      }
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
    getfnbDataBrij() {
      let loader = this.$loading.show();
      let payloadNew = {
        category: null,
        aggregator_cinema_id: this.cinemaID,
        cinema_id: this.cinemaID,
        isCombo: false,
        isEgg: "",
        isVeg: "",
        search: "",
        subCategory: null,
        reservation_id: null
      };
      makeRequestBrij(`/api/external/fnb-items`, "POST", null, payloadNew).then(
        responseFnb => {
          loader.hide();
          if (responseFnb.res.data.Records.Records.length > 0) {
            let dataFnb = responseFnb.res.data.Records.Records;
            let FNBItem = [];
            dataFnb.map(z => {
              z["ItemQty"] = 0;
            });
            this.fnbItems = dataFnb;
            this.TempFnbItem = dataFnb;
            dataFnb.map(z => {
              let check = FNBItem.findIndex(_fnb => {
                return _fnb.Id == z.fc_id;
              });
              if (check >= 0) {
                FNBItem[check]["itemcount"] = FNBItem[check]["itemcount"] + 1;
                let obj = {
                  Category: z.fc_id,
                  ItemName: z.item_name,
                  Amount: z.fp_total_amount,
                  Currency:
                    this.$store.getters.getGlobalCurrency.curr_code || "Sar",
                  Description: z.item_description,
                  ThumbnailImage: z.item_image_url,
                  Qty: 0,
                  Id: z.item_id,
                  TotalAmount: z.fp_total_amount,
                  FnbDetail: { ...z }
                };

                FNBItem[check]["items"].push(obj);
              } else {
                let obj = {
                  Id: z.fc_id,
                  Title: z.fc_category,
                  items: [
                    {
                      Category: z.fc_id,
                      ItemName: z.item_name,
                      Amount: z.fp_total_amount,
                      Currency:
                        this.$store.getters.getGlobalCurrency.curr_code ||
                        "Sar",
                      Description: z.item_description,
                      ThumbnailImage: z.item_image_url,
                      Qty: 0,
                      Id: z.item_id,
                      TotalAmount: z.fp_total_amount,
                      FnbDetail: { ...z }
                    }
                  ],
                  itemcount: 1
                };
                FNBItem.push(obj);
              }
            });

            this.fnbItemData = FNBItem;
            this.fnbItemDataTemp = FNBItem;
            console.log(this.fnbItemDataTemp, "fnbItemDataTemp", this.fnbItems);
          }
        }
      );
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
              this.reservationDetails = res.data.Records[0];
              console.log("schedule_detail");

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
                Experience: schedule_detail.mf_name,
                Currency:
                  this.$store.getters.getGlobalCurrency.curr_code || "Sar",
                SeatName: "",
                SchID: schedule_detail.ss_id
              };
              if (
                schedule_detail.hasOwnProperty("cinema_id") &&
                schedule_detail.cinema_id
              ) {
                this.cinemaID = schedule_detail.cinema_id;
              }
              if (
                schedule_detail.hasOwnProperty("selectedSeats") &&
                schedule_detail.selectedSeats.length > 0
              ) {
                this.selectedSeatsNew = schedule_detail.selectedSeats;

                if (schedule_detail.amount) {
                  this.totalAmount = +schedule_detail.amount.toFixed(4);
                }
                this.timer.minutes = schedule_detail.timer_minutes;
                this.timer.seconds = schedule_detail.timer_second;
                this.startTimer();
              }
              this.getfnbDataBrij();
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
    }
  }
};
</script>

<style>
.select-fnb {
  height: 56vh;
  overflow-y: scroll;
  margin-bottom: 40px;
}

.fb-list {
  overflow-x: scroll;
  white-space: nowrap;
}

.fb-list {
  overflow: -moz-scrollbars-none;
}

.fb-list {
  -ms-overflow-style: none;
}

.fb-list li {
  color: #fff;
  font-size: 12px;
  cursor: pointer;
  border-radius: 15px;
  padding: 10px 15px;
  min-width: 140px;
  font-weight: bold;
  background: #e78785;
  text-align: center;
}

.fb-list li:hover,
.fb-list li.active {
  color: #000;
  background: #fff;
}

.counter-box {
  background-color: #fff;
  overflow: hidden;
  margin-top: 10px;
  border-radius: 15px;
  display: inline-flex;
}

.counter-box .decrease {
  font-size: 20px;
  height: 40px;
  width: 40px;
  outline: 0;
  box-shadow: none;
  border: none;
  cursor: pointer;
  color: #cc202e;
  font-weight: bolder;
  background-color: #ffffff;
  border-top-left-radius: 15px;
  border-bottom-left-radius: 15px;
  border-right: 0.5px dotted #000;
}

.counter-box .output {
  width: 40px;
  color: #000;
  display: flex;
  font-size: 18px;
  font-weight: bold;
  text-align: center;
  align-items: center;
  justify-content: center;
  background-color: #ffffff;
}

.counter-box .increase {
  height: 40px;
  width: 40px;
  outline: 0;
  border: none;
  font-size: 25px;
  cursor: pointer;
  color: #87c03f;
  box-shadow: none;
  font-weight: bolder;
  background-color: #ffffff;
  border-top-right-radius: 15px;
  border-bottom-right-radius: 15px;
  border-left: 0.5px dotted #000;
}

.fb-img-box {
  border-bottom: 5px solid #fff;
}
/* ::-webkit-scrollbar {
  width: 10px !important;
} */
.select-fnb::-webkit-scrollbar,
.fb-list::-webkit-scrollbar {
  width: 10px !important;
}
</style>
