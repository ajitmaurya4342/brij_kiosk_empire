<template>
  <div class="white-grey-section">
    <div class="container final-ticket header-space">
      <div class="text-center my-4">
        <span class="font-weight-bold">
          Your ticket(s) are confirmed! <br />
          BOOKING ID:
        </span>
        <span>{{ ticketObject.ShowBizzBookingID }}</span>
      </div>
      <div class="ticket">
        <div class="ticket-header px-3 py-2 px-lg-5 pt-lg-5">
          <div class="header-img d-none d-md-block" style="width: 59%;">
            <img
              :src="checkBaseUrl(ticketObject.Image)"
              class="image img-fluid"
              style="width: 100%;"
            />
          </div>
          <div class="header-desc">
            <div class="title pb-3">{{ ticketObject.Title }}</div>
            <div class="pt-3 small-desc">
              {{ ticketObject.MovieTiming }} | {{ ticketObject.MovieDate }} |
              {{ ticketObject.CinemaName }}
            </div>
            <div class="d-flex align-items-center justify-content-between pt-3">
              <div>
                <div>No of Tickets:</div>
                <div>{{ ticketObject.SeatsBooked }}</div>
              </div>
              <div>
                <div>{{ allLanguageData.Screen }}</div>
                <div>{{ ticketObject.ScreenName }}</div>
              </div>
              <div>
                <div>{{ allLanguageData.Seats }}</div>
                <div>{{ ticketObject.SeatsList }}</div>
              </div>
            </div>
          </div>
        </div>
        <div class="ticket-body">
          <div class="font-weight-bold py-3 title d-none d-md-block">
            PAYMENT SUMMARY
          </div>
          <div class="table-b px-3 pb-3 mt-5 mt-lg-0 px-md-5 py-md-5">
            <div class="d-block d-md-none pb-3">
              <div class="grid-half">
                <div class="font-weight-bold pt-3">PAYMENT SUMMARY</div>
                <div class="mt-n5" style="text-align:right">
                  <img
                    v-if="false"
                    :src="checkBaseUrl(ticketObject.Image)"
                    class="image img-fluid"
                  />
                </div>
              </div>
            </div>
            <div class="flex-between">
              <div class="pb-1">
                <div class="font-weight-bold">
                  TICKET X <span>{{ ticketObject.SeatsBooked }}</span>
                </div>
                <div>
                  {{ ticketObject.Currency }} {{ currFormat(ticketObject.TicketAmount) }}
                </div>
              </div>
              <!-- <div class="font-sm">
                <div>Quantity</div>
                <div>{{ ticketObject.SeatsBooked }} No(s)</div>
              </div> -->
              <div class="font-sm pb-1" v-if="fnbItemDataArry.length > 0">
                <div>
                  <span class="font-weight-bold"> Food and Beverages</span>
                  <div>
                    <div v-for="(item, indx) in fnbItemDataArry" :key="indx">
                      ({{ item.qty }} X {{ item.title }})
                    </div>
                  </div>
                </div>
                <div>{{ ticketObject.Currency }} {{ currFormat(getFnbTotal(bookingDetails)) }}</div>
              </div>
              <!--Seat Type -->
              <div
                class="font-sm pb-1"
                v-if="ticketObject.wc_seats && ticketObject.wc_seats.length > 0"
              >
                <div>
                  <span
                    v-if="ticketObject.wc_seats.length == 1"
                    class="font-weight-bold"
                  >
                    {{ ticketObject.wc_seats.length }} X Wheel Chair</span
                  >
                  <span v-else class="font-weight-bold">
                    {{ ticketObject.wc_seats.length }} X Inclusive Wheel
                    Chair</span
                  >
                  <!-- <div>
                    <div v-for="(item, indx) in fnbItemDataArry" :key="indx">
                      ({{ item.qty }} X {{ item.title }})
                    </div>
                  </div> -->
                </div>
                <!-- <div>{{ ticketObject.Currency }} {{ ticketObject.tfnb }}</div> -->
              </div>

              <div class="font-sm pb-1" v-if="ticketObject.BookingFee">
                <div class="font-weight-bold">
                  {{ allLanguageData.InternetHF }}
                </div>
                <div>
                  {{ ticketObject.Currency }} {{ currFormat(ticketObject.BookingFee) }}
                </div>
              </div>

              <div class="font-sm pb-1" v-if="ticketObject.OfferDiscount">
                <div class="font-weight-bold">
                  {{ allLanguageData.appliedOffers }} - {{ ticketObject.OfferText }}
                </div>
                <div>
                  {{ ticketObject.Currency }} -{{ currFormat(ticketObject.OfferDiscount) }}
                </div>
              </div>
            </div>
          </div>
          <div class="table-f px-5 py-3">
            <div>AMOUNT PAID</div>
            <div>{{ ticketObject.Currency }} {{ currFormat(ticketObject.Total - ticketObject.OfferDiscount) }}</div>
          </div>
        </div>
        <div class="ticket-footer px-lg-5 pt-3 px-3">
          <div class="grid-half pb-4">
            <div>
              <div class="font-weight-bold">Booking Date & Time</div>
              <div>{{ ticketObject.BookingDate }}</div>
            </div>
            <div>
              <div class="font-weight-bold">Payment Type</div>
              <div>{{ ticketObject.PaymentType }}</div>
            </div>
            <div>
              <div class="font-weight-bold">F&B Order ID</div>
              <div>{{ ticketObject.FnbBookingId || "-" }}</div>
            </div>
            <!-- <div>
            <div class="font-weight-bold">Order ID</div>
              <div>{{ ticketObject.OrderID }}</div>
            </div> -->
            <div>
              <div class="font-weight-bold">Booking ID</div>
              <div>{{ ticketObject.ShowBizzBookingID }}</div>
            </div>

            <!-- <div>
              <div class="font-weight-bold">Pickup Code</div>
              <div>{{ ticketObject.pickupcode }}</div>
            </div> -->
          </div>
          <div>
            <div class="font-weight-bold text-center pt-3 pb-4">
              SCAN THE QR CODE & ENTER THE CINEMA
            </div>
            <div class="pb-3 text-center">
              <img :src="ticketObject.QRCode" height="200px" />
            </div>
            <!-- https://apinew-dev.empirecinemas.com/GetQRCode/?data=EMPR0000040192|9415-ET00010781,17675,29-Aug-2021,22:00 -->
          </div>
          <div class="text-center pb-5">
            <button @click="shareTicket" class="btn btn-primary btn-proceed">
              SHARE TICKET
            </button>
          </div>
        </div>
      </div>
    </div>
    <b-modal
      ref="invitemodal"
      id="invite"
      :title="allLanguageData.InviteModal.title"
      class="loginModal text-red"
    >
      <p class="pt-2 mb-0 text-center text-white">
        {{ allLanguageData.InviteModal.Content }}
      </p>
      <div class="row my-4">
        <div class="col-md-8 col-lg-7 mx-auto">
          <b-form
            @submit.prevent="validateBeforeSubmit('inviteFriend')"
            data-vv-scope="inviteFriend"
          >
            <b-form-input
              type="text"
              v-validate="'required|email'"
              name="email"
              v-model="friendemail"
              :placeholder="allLanguageData.InviteModal.Input"
            />
            <span
              v-if="preimere == true || preimere == 'true'"
              class="text-white errorMessage"
              >{{ errors.first("inviteFriend.email") }}</span
            >
            <span v-else class="errorMessage">{{
              errors.first("inviteFriend.email")
            }}</span>
            <div class="text-center small">{{ errorMessage }}</div>
            <input
              type="submit"
              class="btn btn-green mt-3 w-50 mx-auto"
              :value="allLanguageData.InviteModal.Btn"
            />
          </b-form>
        </div>
      </div>
    </b-modal>
  </div>
</template>
<script>
import { makeRequest, makeRequestBrij } from '@/helper/internet.js'
import Vue from 'vue'
import ReactPixel from 'react-facebook-pixel'
import ReactSnapPixel from 'react-snapchat-pixel'
import { tiktokCompletePayment } from '@/helper/events'
import { mapState, mapGetters, mapActions } from 'vuex'
import {
  LanguageService,
  CountryService,
  TokenService
} from '@/services/storage.service'
import { metaInfo, URL_BASE } from '@/helper/constant.js'
import moment from 'moment'
export default {
  beforeCreate: function () {
    document.body.className = 'light-section'
  },
  data () {
    return {
      URL_BASE: URL_BASE + '/',
      fnbItemDataArry: [],
      ticketData: [],
      ReserveID: '',
      friendemail: '',

      ticketObject: {
        Address: '',
        BookingDate: '',
        BookingID: '',
        BookingStatus: '',
        wc_seats: [],
        CinemaName: '',
        Currency: '',
        Format: '',
        HeaderImage: '',
        Image: '',
        IsLoyaltybooking: '',
        Language: '',
        Message: '',
        MovieDate: '',
        MovieDateDate: '',
        MovieDateDay: '',
        MovieDateMonth: '',
        MovieDateYear: '',
        MovieTiming: '',
        MovieTimingFormat: '',
        MovieTimingTime: '',
        MoviedetailID: '',
        OrderID: '',
        MoviedetailformateID: '',
        Offer: '',
        OfferDiscount: '',
        OfferImage: '',
        OfferText: '',
        QRCode: '',
        QRID: '',
        Rated: '',
        Released: '',
        Runtime: '',
        ScreenName: '',
        SeatsBooked: '',
        SeatsList: '',
        ShowBizzBookingID: '',
        ShowBizzBookingID1212: '',
        ShowType: '',
        Status: '',
        Title: '',
        Total: '',
        bookingid: '',
        is_loading: '',
        pickupcode: '',
        tfnb: '',
        TicketAmount: '',
        BookingFee: '',
        PaymentType: '',
        FnbBookingId: ''
      },
      BookingID: '',
      bookingDetails: null,
    }
  },
  components: {},
  beforeMount () {
    if (this.$route.params.bookingId) {
      this.BookingID = this.$route.params.bookingId
      this.getTicketDetails()
    }
    // let token = TokenService.getToken();
    // if (token) {
    // } else {
    //   window.location.pathname = "/";
    // }
  },
  mounted: function () {
    let language = LanguageService.getLanguage()
    if (!language) {
      this.LanguageID = 2
    } else {
      this.LanguageID = language.lang_id
    }
    // this.handleResize();
    let lang = LanguageService.getLanguage()
    if (lang == null) {
      this.langName = 'eng'
    } else {
      this.langName = lang['lang']
    }
  },
  methods: {
    getFnbTotal (bookingDetails) {
      let total = 0

      if (bookingDetails.fnb_items && bookingDetails.fnb_items.length) {
        bookingDetails.fnb_items.forEach(f => {
          total += (f.fp_total_amount_before_offer || 0)
        })
      }

      // return bookingDetails?.ft_total_amount || 0
      return total
    },
    getOfferTotal (bookingDetails) {
      let total = 0
      total += this.getSafe(() => bookingDetails.offer_price, 0)

      if (bookingDetails.fnb_items && bookingDetails.fnb_items.length) {
        bookingDetails.fnb_items.forEach(f => {
          total += ((f.fp_offer_price * f.fst_quantity) || 0)
        })
      }

      return total
    },
    shareTicket () {
      this.$refs.invitemodal.show()
    },
    validateBeforeSubmit (scope) {
      if (scope == 'inviteFriend') {
        this.$validator.validateAll(scope).then(result => {
          if (result) {
            this.showLoading()
            // let token = TokenService.getToken();
            let payload = {
              email: this.friendemail,
              sb_booking_code: this.ticketObject.BookingID,
              currency_code: this.$store.getters.getGlobalCurrency.curr_code || 'Sar',
            }
            makeRequestBrij(`/api/external/email`, 'POST', null, payload)
              .then(response => {
                const { error, res } = response
                this.hideLoading()

                if (!error && res.data.status) {
                  this.errorMessage =
                    "Ticekt has been sent to your friend's email address"
                } else {
                  this.errorMessage = res.data.error || 'Something went wrong'
                }

                this.$forceUpdate()

                // setTimeout(() => {
                //   this.$refs.invitemodal.hide()
                // }, 3300)
              })
              .catch(error => {
                console.log('Error', error)
              })
          }
        })
      }
    },
    getTicketDetails () {
      this.ticketData = []

      this.showLoading()
      makeRequestBrij(
        `/api/cinema/booking-details/${this.BookingID}`,
        'GET',
        null,
        null
      )
        .then(result => {
          const { error, res } = result
          const { data } = res
          this.bookingDetails = data.Records[0]

          console.log(data, '  }')
          // if (!error) {

          let obj = {
            MoviedetailID: 623,
            MoviedetailformateID: 4025,
            Title: data.Records[0].movie_title,
            Format: data.Records[0].mf_name,
            Image: data.Records[0].md_thumbnail_url,
            HeaderImage: '',
            Language: data.Records[0].lang_name,
            CinemaName: data.Records[0].cine_name,
            MovieDate: moment(data.Records[0].show_date).format(
              'DD MMMM, YYYY'
            ),
            MovieDateDate: moment(data.Records[0].show_date).format('DD'),
            MovieDateDay: moment(data.Records[0].show_date).format('dddd'),
            MovieDateMonth: moment(data.Records[0].show_date).format('MMMM'),
            MovieDateYear: moment(data.Records[0].show_date).format('YYYY'),
            MovieTiming: moment(data.Records[0].show_time, 'HH:mm').format(
              'hh:mm A'
            ),
            MovieTimingTime: moment(data.Records[0].show_time, 'HH:mm').format(
              'hh:mm'
            ),
            MovieTimingFormat: moment(
              data.Records[0].show_time,
              'HH:mm'
            ).format('A'),
            Address: data.Records[0].cine_address,
            OrderID: '824194',
            Rated: data.Records[0].rating,
            Released: moment(data.Records[0].original_release_date).format(
              'DD MMM, YYYY'
            ),
            Runtime: '105',
            QRCode: data.Records[0].qrcode,
            QRID: 'EMPR0000041060|8365-ET00010435,52894,01-Jul-2022,17:00',
            ShowType: 'Ticket',
            tfnb: data.Records[0].ft_total_amount || 0,
            ScreenName: data.Records[0].screen_name,
            BookingStatus: 'SUCCESS',
            FnbBookingId: '',
            ShowBizzBookingId: data.Records[0].sb_booking_code,
            ShowBizzBookingID: data.Records[0].sb_booking_code,
            ShowBizzBookingID1212: data.Records[0].sb_booking_code,
            pickupcode: 8365,
            f_and_b: [],
            SeatsList: data.Records[0].seats.join(', '),
            wc_seats: [],
            normal_seats: data.Records[0].seats,
            SeatLable: null,
            BookingID: data.Records[0].sb_booking_code,
            Offer: `${data.Records[0].voucher_code || data.Records[0].voucher_code_fallback || ''}`,
            OfferDiscount: this.getOfferTotal(data.Records[0]) || 0,
            OfferText: `${data.Records[0].voucher_code || data.Records[0].voucher_code_fallback || ''}`,
            OfferImage: '',
            SeatsBooked: data.Records[0].seats.length,
            TicketAmount: data.Records[0].sb_total_amount,
            BookingFee: data.Records[0].internet_handling_fee,
            PaymentType: data.Records[0].pm_payment_mode,
            Currency: this.$store.getters.getGlobalCurrency.curr_code || 'Sar',
            Total:
              data.Records[0].sb_total_amount +
              this.getFnbTotal(data.Records[0]) +
              data.Records[0].internet_handling_fee,
            BookingDate: moment(data.Records[0].transaction_date_time).format(
              'YYYY-MM-DD hh:mm A'
            ),
            Status: true,
            Message: '',
            is_loading: true,
            BaseURL: 'https://apinew-dev.empirecinemas.com/'
          }

          console.log(obj, 'dsaadas')
          Object.keys(this.ticketObject).map(x => {
            this.ticketObject[x] = obj[x] || ''
          })

          if (
            data.Records[0].hasOwnProperty('fnb_items') &&
            data.Records[0].fnb_items.length > 0
          ) {
            this.ticketObject.FnbBookingId =
              data.Records[0].fnb_items[0]['order_code']
            this.fnbItemDataArry = data.Records[0].fnb_items.map(z => {
              return {
                title: z.fst_item_name,
                qty: z.fst_quantity,
                total: z.fp_total_amount
              }
            })
          }
          // ReactPixel.track('Purchase', {
          //   value: this.ticketObject.Total,
          //   currency: this.ticketObject.Currency,
          // })
          // ReactSnapPixel.track('Purchase', {
          //   price: this.ticketObject.Total,
          //   currency: this.ticketObject.Currency,
          // })
          // this.$ga.event({
          //   eventCategory: 'purchase',
          //   eventAction: 'action',
          //   eventLabel: 'Purchase value',
          //   eventValue: `${this.ticketObject.Currency} ${this.ticketObject.Total}`,
          // })
          // const tikdata = {content_type: '', quantity: this.ticketObject.SeatsBooked, description: '', content_id: '', currency: this.ticketObject.Currency, value: this.ticketObject.Total }
          // tiktokCompletePayment(tikdata)
          // } else {
          //   console.log("object");
          // }
          this.hideLoading()
        })
        .catch(error => {
          this.hideLoading()

          console.log('error', error)
        })
    }
  }
}
</script>
