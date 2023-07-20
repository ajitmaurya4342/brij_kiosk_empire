<template>
  <div>
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
          @click="paymentFailed"
          class="text-center mx-auto mt-3 btn-danger"
          >CLOSE</b-button
        >
      </div>
    </b-modal>
    <div>
      <h2 class="something-went-wrong">{{ Message }}</h2>
      <button
        class="something-went-wrong"
        style="top:55%;width:30%;cursor:pointer"
        v-if="showWhenError"
        @click="paymentFailed"
      >
        Go to Home
      </button>
    </div>
    <!-- <h2 class="thankyou">{{ Message }}</h2> -->
    <!-- <h2 v-else-if="isError" class="thankyou">{{ Message }}</h2>
  <h2 v-else class="thankyou">{{ Message }}</h2>-->
  </div>
</template>

<script>
import bookingServiceKiosk from "@/services/bookingServiceKiosk.js";
import { makeRequestBrij } from "../../../helper/internet";
import { PAYMENT_PORT } from "@/config/index";
import { LanguageService } from "@/services/storage.service";

export default {
  data() {
    return {
      isStarted: true,
      isError: false,
      showWhenError: false,
      reserve_id: "",
      count: 0,
      Message: "Please Wait Checking Device...",
      isCheckDevice: false,
      guest_id: 0,
      ReserveID: null,
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
      ErrorMessage: "",
      errorMessage: "",
      add_ons_total: 0
    };
  },
  beforeMount() {
    const { reserve_id } = this.$route.params;
    this.reserve_id = reserve_id;
    this.ReserveID = reserve_id;
    console.log("reserve_id :", reserve_id);
    this.getReserveInfo();
    // this.getReserveDetails(reserve_id);
  },
  mounted() {
    // this.MakeTransaction();
    // setTimeout(() => {
    //   this.$router.push({
    //     path: "/select-option"
    //   });
    // }, 20000);
  },
  methods: {
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

              this.reservationDetails = res.data.Records[0];
              this.scheduleData = {
                fnb_total: 0,
                amount: schedule_detail.amount
              };

              if (schedule_detail.add_ons_array.length) {
                this.add_ons_total =
                  schedule_detail.add_ons_array[0].BoxOfficeFinal.TotalAddons;
                // quantity //addons_name //final_price
              }

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
                this.totalAmount = +parseFloat(
                  this.totalAmount + this.add_ons_total
                ).toFixed(4);
                this.checkDevice();
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

    paymentFailed() {
      this.$router.replace({
        path: "/select-option"
      });
      window.location.reload();
    },
    MakeTransaction: function() {
      makeRequestBrij(
        `/api/guest-login`,
        "POST",
        null,
        JSON.parse(localStorage.getItem("guest_detail"))
      ).then(guest_result => {
        const { error, res } = guest_result;
        const { data } = res.data;
        console.log(data, "Guest Detail");
        if (res.data.status) {
          this.guest_id = data[0].guest_id;
          console.log(this.guest_id);
        }
        makeRequestBrij(
          `/api/external/reset-timer/${this.ReserveID}`,
          "GET",
          null,
          null
        ).then(result222 => {
          // var payload = {
          //     port: "4",
          //     ECR_Rcptno: "0123456789",
          //     Amtstr: "0.01",
          //   };
          let payload = {
            port: PAYMENT_PORT,
            ECR_Rcptno: this.reserve_id,
            Amtstr: parseFloat(this.totalAmount).toFixed(2)
          };

          bookingServiceKiosk
            .makeTranscation(payload)
            .then(response1 => {
              console.log(response1, "Make Transaction Response");
              const { data } = response1;
              if (data && data.status) {
                this.Message = data.message;
                if (data.hasOwnProperty("purchase")) {
                  this.buyTickets(data.purchase);
                } else {
                  this.buyTickets(null);
                }
              } else {
                this.Message = "Payment Cancelled Please try again...";
                this.showWhenError = false; // data.Message;
                setTimeout(() => {
                  this.paymentFailed();
                }, 3000);
              }
            })
            .catch(error => {
              this.Message = "Payment Cancelled Please try again.....";
              this.showWhenError = false;
              setTimeout(() => {
                this.paymentFailed();
              }, 3000);
            });
        });
      });
    },
    buyTickets: function(purchase) {
      let obj = {};
      console.log(purchase, "purchase22");
      if (purchase) {
        let purchaseNew = purchase.split("|");

        let cardDetails = {
          StatusCode: "00",
          download_phone: "",
          MerchantID: purchaseNew[7] || "",
          TransactionDateTime: purchaseNew[3] || "",
          TransacitonRequestDateTime: purchaseNew[3] || "",
          TransactionResponseDateTime: purchaseNew[3] || "",
          BankId: "",
          CardAcceptorTerminalId: purchaseNew[9] || "",
          TransactionSTAN: "",
          RetrievalReferenceNumber: purchaseNew[6] || "",
          CardNameEnglish: purchaseNew[2] || "",
          CardScheme: purchaseNew[2] || "",
          PrimaryAccountNumber: purchaseNew[1] || "",
          TransactionTypeEnglish: "PURCHASE",
          TransactionAmount: purchaseNew[8] || "",
          TransactionResponseEnglish: "APPROVED",
          TransactionResponseArabic: "",
          TransactionResultReasonEnglish: "APPROVED",
          TransactionResultReasonArabic: "",
          ResponseCodeDescription: "",
          TransactionAuthCode: purchaseNew[4] || "",
          POSEntryMode: "MANUAL",
          TransactionResponse: purchaseNew[5] || "",
          AID: "",
          TVR: "",
          FullResponse: purchase
        };

        obj = {
          card_gateway_service: "NEOLEAP",
          nl_credit_card_name: purchaseNew[2],
          card_trx_details: {
            ...cardDetails
          }
        };
      }

      makeRequestBrij(
        `/api/cinema/kiosk-intent/${this.ReserveID}`,
        "POST",
        null,
        {
          cust_id: 0,
          guest_id: this.guest_id,
          redirect_origin: window.location.origin,
          ...obj
        }
      ).then(result => {
        this.hideLoading();
        let { res, error } = result;
        if (res.data.status) {
          console.log(res.data, " window.location.href = res.data;");
          this.$router.replace({
            path: `/final-ticket/${res.data.sb_booking_code}/2`
          });
          // window.location.reload();
        } else {
          this.errorMessage = res.data.message;
          this.ErrorMessage = res.data.message;
          this.$refs["modal"].show();
        }
      });
    },
    checkDevice: function() {
      let loader = this.$loading.show();
      let payload = {
        port: PAYMENT_PORT
      };
      let LanguageCheck = "eng";
      let lang = LanguageService.getLanguage();
      if (lang == null) {
        LanguageCheck = "eng";
      } else {
        LanguageCheck = lang["lang"];
      }
      console.log(LanguageCheck);
      bookingServiceKiosk
        .checkDevice(payload)
        .then(response => {
          loader.hide();
          const { data } = response;
          if (data && data.status) {
            if (LanguageCheck == "ar") {
              this.Message = "جاري عملية الدفع ... ادخل او مرر بطاقتك للدفع";
            } else {
              this.Message =
                "Processing your payment ...Insert or Tap your card for payment.";
            }

            this.MakeTransaction();
          } else {
            this.Message = data.message || `Payment Device Not Activated..`; // "There is a device error";

            this.showWhenError = true;
            setTimeout(() => {
              this.paymentFailed();
            }, 3000);
          }
        })
        .catch(err => {
          this.Message = `Payment Device Not Activated..`;
          this.showWhenError = true;
          setTimeout(() => {
            this.paymentFailed();
          }, 3000);
          loader.hide();
          //   this.$refs.modal.show();
        });
    }
  }
};
</script>

<style></style>
