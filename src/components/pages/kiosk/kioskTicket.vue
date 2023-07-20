<template>
  <div>
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
          <b-button @click="onClick()" class="text-center mx-auto mt-3 btn-danger">CLOSE</b-button>
        </div>
      </b-modal>
    </div>

    <div v-if="bookingDetails && Object.keys(bookingDetails).length > 0">
      <div class="d-flex justify-content-center align-items-center vh-90">
        <div>
          <div class="bg-ticket d-none">
            <span class="curve-cut"></span>
            <div class="pad-lr">
              <div class="row">
                <div class="col-md-6">
                  <img src="@/assets/img/logo/ticket-logo.svg" alt width="230" height="150"/>
                </div>

                <!-- <div class="col-md-6   pl-5 ">
                  <div class="text-right">
                  <h1 class="text-dark font-weight-bold mb-0"> FARMAGEDON  FARMAGEDON </h1>
                  <div class="text-dark mt-1 float-right font-weight-bold">
                    <span class="format-movie rounded-sm">3D</span>

                  </div>
                   </div>

                </div>-->
              </div>
            </div>

            <div class="movie-image-ticket">
              <img
                src="https://empireapi.binarynumbers.io/assets/images/movies/MainBanner/5d761bb5bb7ef.jpg"
                class="img-fluid"
              />
              <div class="bg"></div>
              <!-- <img src="@/assets/img/4.jpg" alt /> -->
            </div>

            <div class="pad-space text-dark">
              <div class="row">
                <div class="col-12">
                  <h2 class="font-weight-bold">{{ bookingDetails.MovieName }} ({{ bookingDetails.FilmCert }})</h2>

                  <div class="mb-3">
                    <span class="fz-22">{{ bookingDetails.Language }}</span>
                    <span class="format-movie rounded-sm">{{ bookingDetails.SelectedFormat }}</span>
                  </div>
                </div>
                <div class="col-md-7">
                  <div class="row">
                    <div class="col-md-12 mb-4">
                      <h4 class="font-weight-bold mb-0">{{ $tc("Cinema") }}</h4>
                      <h2 class="mb-0">{{ bookingDetails.cinema_name }}</h2>
                      <!-- <h2 class="mb-0">JEDDAH</h2> -->
                    </div>

                    <div class="col-md-6">
                      <h4 class="font-weight-bold mb-0">SCREEN</h4>
                      <h2 class="mb-0">{{ bookingDetails.ScreenId }}</h2>
                    </div>

                    <div class="col-md-6">
                      <h4 class="font-weight-bold mb-0">TIME</h4>
                      <h2 class="mb-0">{{ bookingDetails.show_time }}</h2>
                    </div>

                    <div class="col-md-12 mt-4">
                      <h4 class="font-weight-bold mb-0">SEATS</h4>
                      <h2 class="mb-0">{{ bookingDetails.seats_name }}</h2>
                    </div>
                  </div>
                </div>

                <!-- <div class="col-md-5">
                  <div class="text-center d-table ml-auto">
                    <img
                      src="@/assets/img/background/qr-code2.png"
                      width="185"
                      height="194"
                      alt
                    />
                    <h4 class="font-weight-bold mb-0 mt-3">BOOKING ID</h4>
                    <h2 class="mb-0">{{ bookingDetails.booking_id }}</h2>
                  </div>
                </div>-->
              </div>
              <div class="mt-4">
                <h4 class="font-weight-bold">{{ $tc("FoodAndDrinks") }}</h4>
                <h3 v-for="(fnb,fnbKey) in bookingDetails.fnb" :key="fnbKey" class="text-truncate">
                  {{ fnb.name }}
                  <span class="font-weight-bold">x {{ fnb.count }}</span>
                </h3>
                <!-- <h3 class="text-truncatecol-md-6 d-flex align-items-center">
                Burger
                <span class="font-weight-bold">x 3</span>
                </h3>-->
              </div>
            </div>
          </div>

          <div class="bg-ticket text-dark p-3">
            <div class="col-12">
              <div class="row">
                <div class="col-6">
                  <img src="@/assets/img/logo/ticket-logo.svg" alt width="230" height="150"/>
                </div>
                <div class="col-6"></div>
              </div>
            </div>
            <div class="col-12">
              <div class="row">
                <div class="col-4">
                  <img :src="bookingDetails.image" class="img-fluid"/>
                </div>
                <div class="col-8">
                  <div class="row">
                    <!-- MOVIE NAME -->
                    <div class="col-12 mb-4">
                      <h2 class="font-weight-bold">{{ bookingDetails.MovieName }}</h2>
                      <div>
                        <span class="font-weight-bold fz-22">{{ bookingDetails.Language }}</span>
                        <span class="format-movie rounded-sm">{{ bookingDetails.SelectedFormat }}</span>
                      </div>
                    </div>

                    <div class="col-12 mb-4">
                      <h4 class="font-weight-bold mb-0">{{ $tc("Cinema") }}</h4>
                      <h2 class="mb-0">{{ bookingDetails.cinema_name }}</h2>
                    </div>

                    <div class="col-md-6">
                      <h4 class="font-weight-bold mb-0">{{ $tc("Screen") }}</h4>
                      <h2 class="mb-0">{{ bookingDetails.screen_name }}</h2>
                    </div>

                    <div class="col-md-6">
                      <h4 class="font-weight-bold mb-0">{{ $tc("Seats") }}</h4>
                      <h2 class="mb-0">{{ bookingDetails.seat_name }}</h2>
                    </div>

                    <div class="col-md-6 mt-4">
                      <h4 class="font-weight-bold mb-0">{{ $tc("Time") }}</h4>
                      <h2 class="mb-0">{{ bookingDetails.show_time }}</h2>
                    </div>

                    <div class="col-md-6 mt-4">
                      <h4 class="font-weight-bold mb-0">{{ $tc("Date") }}</h4>
                      <h2 class="mb-0">{{ bookingDetails.show_date }}</h2>
                    </div>
                  </div>
                </div>

                <!-- <div class="col-12 mt-4 border-top py-4">
                  <h4 class="font-weight-bold text-uppercase">{{$tc("FoodAndDrinks")}}</h4>
                  <h3
                    v-for="(fnb,fnbKey) in bookingDetails.fnb"
                    :key="fnbKey"
                    class="text-truncate"
                  >
                    {{ fnb.name }}
                    <span class="font-weight-bold">x {{ fnb.count }}</span>
                  </h3>
                </div>-->

                <div class="col-8 offset-4 my-4">
                  <!-- <img src="@/assets/img/background/qr-code2.png" width="185" height="194" alt /> -->
                  <h4 class="font-weight-bold mb-0 mt-3">BOOKING ID</h4>
                  <h2 class="mb-0">{{ bookingDetails.booking_id }}</h2>
                </div>
              </div>
            </div>
          </div>

          <div class="btn-round mt-5 mx-auto">
            <div class="btn-content">
              <div>
                <div @click="print()" class="h2 font-weight-bold text-red">{{ $tc("PrintTickets") }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="something-went-wrong" v-else-if="isError">
      <p class="my-4 text-center">{{ ErrorMessage }}</p>
      <div class="text-center">
        <b-button @click="onClick()" class="text-center mx-auto mt-3 btn-success btn-lg">BACK</b-button>
      </div>
    </div>
    <!-- PRINT TICKET -->
    <div
      ref="printthis"
      id="div1"
      v-if="bookingDetails && Object.keys(bookingDetails).length > 0"
      class="d-none"
    >
      <table style="width:302px;background:#FFF;color:#000;margin:0 auto;border:1px solid;">
        <tr>
          <td
            colspan="3"
            style="text-align:center;font-size:13px;padding:15px 5px 15px 5px;border-bottom:1px solid #D3D3D3;"
          >
            <span style="display:block">Empire Cinemas - Gizan</span>
            <span style="display:block">Bright Minds For Education Co.</span>
            <span style="display:block">شركة برايت مايندز للتعليم</span>
            <span style="display:block">Al Rashid Mall</span>
            <span style="display:block">Prince Mohammad Bin Naser Road</span>
            <span style="display:block">Jazan - 82723 Saudi Arbia</span>
          </td>
        </tr>

        <tr>
          <td colspan="3" style="font-size:12px;padding:15px 5px 10px 5px;">
            <span>Theatre :&nbsp;</span>
            <span style="font-weight:bold">{{ bookingDetails.ScreenId }}</span>

            <span style="padding-left:40px;">Rating</span>
            <span style="font-weight:bold">{{ bookingDetails.FilmCert }}</span>
          </td>
        </tr>
        <tr>
          <td colspan="3" style="padding:5px 5px 20px 5px;vertical-align:top;">
            <span style="font-size:12px;">Movie:&nbsp;</span>
            <span style="font-size:14px;font-weight:bold;">{{ bookingDetails.MovieName }}</span>
            <span
              style="font-size:14px;padding-left:45px;display:block;"
            >{{ bookingDetails.MovieNameAR }}</span>
          </td>
        </tr>
        <tr style="text-align:center">
          <td style="width:33.33%;vertical-align:top;padding-bottom:20px">
            <span style="display:block;font-size:12px">Transaction ID</span>
            <span
              style="display:block;font-weight:bold;font-size:13px;"
            >{{ bookingDetails.TransactionID }}</span>
          </td>
          <td style="width:33.33%;padding-bottom:15px">
            <span style="display:block;font-size:12px">Date</span>
            <span
              style="display:block;font-weight:bold;font-size:13px;"
            >{{ bookingDetails.show_date }}</span>
          </td>
          <td style="width:33.33%;padding-bottom:15px">
            <span style="display:block;font-size:12px">Time</span>
            <span
              style="display:block;font-weight:bold;font-size:13px;"
            >{{ bookingDetails.show_time }}</span>
          </td>
        </tr>
        <tr style="text-align:center;">
          <td style="width:33.33%;vertical-align:top;">
            <span style="display:block;font-size:12px">Class</span>
            <span style="display:block;font-size:12px">نوع المقعد</span>
            <span
              style="display:block;font-weight:bold;font-size:13px;"
            >{{ bookingDetails.ticket_standard }}</span>
          </td>
          <td style="width:33.33%;vertical-align:top;">
            <span style="display:block;font-size:12px">Seat</span>
            <span style="display:block;font-size:12px">المقعد</span>
            <span
              style="display:block;font-weight:bold;font-size:13px;"
            >{{ bookingDetails.seat_name }}</span>
          </td>
          <td style="width:33.33%;vertical-align:top;">
            <span style="display:block;font-size:12px">Ticket Qty</span>
            <span style="display:block;font-size:12px">عدد التذاكر</span>
            <span
              style="display:block;font-weight:bold;font-size:13px;"
            >{{ bookingDetails.ticket_count }}</span>
          </td>
        </tr>
        <!-- <tr>
          <td style="font-size:12px;padding:5px 5px 10px 5px;text-align:center">3D Glass</td>
          <td style="padding-bottom:10px;"></td>
          <td style="font-size:12px;text-align:center;font-weight:bold;padding-bottom:10px;">5</td>
        </tr>-->
        <tr style="text-align:center;">
          <td style="width:33.33%;vertical-align:top;padding-bottom:15px;padding-top:10px;">
            <span style="display:block;font-size:12px">Base Amount</span>
            <span style="display:block;font-size:12px">المبلغ من دون الضريبة</span>
            <span style="display:block;font-weight:bold;font-size:13px;">{{ bookingDetails.basic }}</span>
          </td>
          <td style="width:33.33%;vertical-align:top;padding-bottom:15px;padding-top:10px;">
            <span style="display:block;font-size:11px;margin-bottom:2px;">Added Value Tax:</span>
            <span style="display:block;font-size:12px">ضريبة القيمة المضافة</span>
            <span style="display:block;font-weight:bold;font-size:13px;">{{ bookingDetails.tax }}</span>
          </td>
          <td style="width:33.33%;vertical-align:top;padding-bottom:15px;padding-top:10px;">
            <span style="display:block;font-size:12px">Total</span>
            <span style="display:block;font-size:12px">المحموع</span>
            <span
              style="display:block;font-weight:bold;font-size:13px;"
            >{{ bookingDetails.ticket_price }}</span>
          </td>
        </tr>
        <tr>
          <td colspan="3" style="font-size:12px;padding:5px 5px 0 5px;">
            <span>VAT is charged at 5%</span>
            <span style="padding-left:10px;">{{ bookingDetails.tax }}</span>
          </td>
        </tr>
        <tr>
          <td colspan="3" style="font-size:12px;padding:0px 5px 10px 5px;">
            <span>ضريبة القيمة المضافة 5%</span>
          </td>
        </tr>
        <tr>
          <td colspan="3" style="font-size:12px;padding:5px 5px 0px 5px;">
            <span>VAT Numbers:</span>
            <span style="padding-left:10px;">{{ bookingDetails.vat }}</span>
          </td>
        </tr>
        <tr>
          <td colspan="3" style="font-size:12px;padding:0px 5px 10px 5px;">
            <span>الرقم الضريبي</span>
          </td>
        </tr>
        <tr>
          <td colspan="3" style="padding:5px;font-size:12px">
            <span style="display:block;">Empire Cinemas - Gizan-82723 Saudi Arbia</span>
            <span style="display:block;">Sales Info</span>
            <span>IT-Showbizz</span>
            <span style="padding-left:45px">03:45 PM</span>
          </td>
        </tr>
        <tr style="text-align:center">
          <td style="vertical-align:top;padding-bottom:10px;">
            <span style="display:block;font-size:11px">Invoice No:</span>
            <span style="display:block;font-size:11px">رقم الفاتورة</span>
            <span style="display:block;font-size:11px;padding-top:5px">{{ bookingDetails.invoice }}</span>
          </td>
          <td style="vertical-align:top;padding-bottom:10px;">
            <span style="display:block;font-size:11px">Date</span>
            <span style="display:block;font-size:11px">تاريخ</span>
            <span
              style="display:block;font-size:11px;padding-top:5px"
            >{{ bookingDetails.trans_date }}</span>
          </td>
          <td style="vertical-align:top;padding-bottom:10px;">
            <span style="display:block;font-size:11px">Time</span>
            <span style="display:block;font-size:11px">زمن</span>
            <span
              style="display:block;font-size:11px;padding-top:5px"
            >{{ bookingDetails.trans_time }}</span>
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
import bookingService from '@/services/bookingService.js'
import Printd from 'printd'

export default {
  name: 'Final Ticket',
  data () {
    return {
      booking_id: '',
      bookingDetails: null,
      pickup_code: null,
      receipt_no: null,
      isError: false,
      ErrorMessage: 'Something went wrong'
    }
  },
  beforeMount () {
    const {booking_id} = this.$route.params
    console.log('booking_id::::::: :', booking_id)
    this.pickup_code = this.$route.query.pickup_code
    this.receipt_no = this.$route.query.receipt_no
    this.getBookingDetails(booking_id)
  },
  methods: {
    onClick: function () {
      this.$router.push({
        path: '/'
      })
    },
    getBookingDetails: function (booking_id) {
      let loader = this.$loading.show()
      let payload = {
        booking_id: booking_id,
        // pickup_code: parseInt(this.pickup_code),
        // receipt_no: parseInt(this.receipt_no)
      }
      bookingService
        .getBookingDetails(payload)
        .then(response => {
          loader.hide()
          const {data} = response
          if (data && data.status) {
            this.bookingDetails = data.data
          } else {
          // this.$refs.modal.show();
            this.isError = true
            this.ErrorMessage = data.Message || data.message
          }
        })
        .catch(err => {
          loader.hide()
          this.isError = true
        // this.$refs.modal.show();
        // this.ErrorMessage = err;
        })
    },
    print: function () {
      let self = this
    },
    __print: function () {
      const p = new Printd()
      p.print(this.$refs.printthis, [])
    }
  }
}
</script>

<style scoped>
.vh-90 {
  height: 90vh;
}

.pad-space {
  padding: 30px;
}

.pad-lr {
  padding-left: 20px;
  padding-right: 20px;
}

.fz-22 {
  font-size: 22px;
}

.format-movie {
  padding-left: 5px;
  padding-right: 5px;
  border: 2px solid black;
  font-size: 20px;
}

.fnb-table {
  width: 100%;
  font-size: 28px;
  max-width: 740px;
}

.fnb-table td:nth-child(2) {
  width: 140px;
}

.bg-ticket:after {
  content: "";
  left: 50%;
  top: -60px;
  width: 120px;
  height: 120px;
  position: absolute;
  border-radius: 50%;
  background-color: #c1152d;
  transform: translateX(-50%);
}

.bg-ticket {
  background-color: #ffffff;
  width: 800px;
  height: auto;
  border-radius: 40px;
  position: relative;
  overflow: hidden;
}

.movie-image-ticket {
  height: 320px;
  background-color: pink;
}

.movie-image-ticket img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
