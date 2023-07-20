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
          <div class="header-img d-none d-md-block">
            <img :src="URL_BASE + ticketObject.Image" class="image img-fluid" />
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
                    :src="URL_BASE + ticketObject.Image"
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
                  {{ ticketObject.Currency }} {{ ticketObject.TicketAmount }}
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
                <div>{{ ticketObject.Currency }} {{ ticketObject.tfnb }}</div>
              </div>
              <!--Seat Type -->
               <div class="font-sm pb-1" v-if="ticketObject.wc_seats && ticketObject.wc_seats.length > 0">
                <div>
                  <span v-if="ticketObject.wc_seats.length == 1" class="font-weight-bold"> {{ticketObject.wc_seats.length}} X Wheel Chair</span>
                  <span v-else class="font-weight-bold"> {{ticketObject.wc_seats.length}} X Inclusive Wheel Chair</span>
                  <!-- <div>
                    <div v-for="(item, indx) in fnbItemDataArry" :key="indx">
                      ({{ item.qty }} X {{ item.title }})
                    </div>
                  </div> -->
                </div>
                <!-- <div>{{ ticketObject.Currency }} {{ ticketObject.tfnb }}</div> -->
              </div>

              <div class="font-sm pb-1">
                <div class="font-weight-bold">
                  {{ allLanguageData.InternetHF }}
                </div>
                <div>
                  {{ ticketObject.Currency }} {{ ticketObject.BookingFee }}
                </div>
              </div>
            </div>
          </div>
          <div class="table-f px-5 py-3">
            <div>AMOUNT PAID</div>
            <div>{{ ticketObject.Currency }} {{ ticketObject.Total }}</div>
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
              <div class="font-weight-bold">F&B ID</div>
              <div>{{ ticketObject.FnbBookingId }}</div>
            </div>
            <div>
            <div class="font-weight-bold">Order ID</div>
              <div>{{ ticketObject.OrderID }}</div>
            </div>
            <div>
              <div class="font-weight-bold">Booking ID</div>
              <div>{{ ticketObject.ShowBizzBookingID }}</div>
            </div>

            <div>
              <div class="font-weight-bold">Pickup Code</div>
              <div>{{ ticketObject.pickupcode }}</div>
            </div>
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
import { makeRequest } from '@/helper/internet.js'
import Vue from 'vue'
import ReactPixel from 'react-facebook-pixel'
import ReactSnapPixel from 'react-snapchat-pixel'
import {tiktokCompletePayment } from '@/helper/events'
import { mapState, mapGetters, mapActions } from 'vuex'
import {
  LanguageService,
  CountryService,
  TokenService,
} from '@/services/storage.service'
import { metaInfo, URL_BASE } from '@/helper/constant.js'
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
        FnbBookingId: '',
      },
    }
  },
  components: {},
  beforeMount () {
    if (window.localStorage.getItem('RID')) {
      this.ReserveID = this.$route.params.reserveId
      this.getTicketDetails()
    } else {
      window.location.pathname = '/'
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
              useremail: this.friendemail,
              bookingid: this.ticketObject.QRID,
              CinemaType: 'normal',
            }
            let position = JSON.parse(
              window.localStorage.getItem('Geolocation')
            )
            console.log('position :', position)
            if (position) {
              payload['Latitude'] = position.latitude
              payload['Longitude'] = position.longitude
            } else {
              payload['Latitude'] = -1
              payload['Longitude'] = -1
            }

            makeRequest('/ShareUserTicket', 'POST', null, payload)
              .then(response => {
                const { error, res } = response
                this.hideLoading()

                if (!error && res.data.Status) {
                  this.errorMessage =
                    "Ticekt has been sent to your friend's email address"
                } else {
                  this.errorMessage = 'Something went wrong'
                }
                setTimeout(() => {
                  this.$refs.invitemodal.hide()
                }, 3000)
              })
              .catch(error => {
                console.log('Error', error)
              })
          }
        })
      }
    },
    getTicketDetails () {
      window.localStorage.setItem('RID', '')
      this.ticketData = []
      let payload = {
        ReserveID: this.ReserveID,
      }
      this.showLoading()
      makeRequest('/TicketInfo', 'POST', null, payload)
        .then(result => {
          const { error, res } = result
          const { data } = res.data
          // if (!error) {

          if (res.data && res.data.hasOwnProperty('BookingID')) {
            Object.keys(this.ticketObject).map(x => {
              this.ticketObject[x] = res.data[x] || ''
            })
          }

          if (
            res.data.hasOwnProperty('f_and_b') &&
            res.data.f_and_b.length > 0
          ) {
            this.fnbItemDataArry = res.data.f_and_b
          }
          ReactPixel.track('Purchase', {
            value: this.ticketObject.Total,
            currency: this.ticketObject.Currency,
          })
          ReactSnapPixel.track('Purchase', {
            price: this.ticketObject.Total,
            currency: this.ticketObject.Currency,
          })
          this.$ga.event({
            eventCategory: 'purchase',
            eventAction: 'action',
            eventLabel: 'Purchase value',
            eventValue: `${this.ticketObject.Currency} ${this.ticketObject.Total}`,
          })
          const tikdata = {content_type: '', quantity: this.ticketObject.SeatsBooked, description: '', content_id: '', currency: this.ticketObject.Currency, value: this.ticketObject.Total }
          tiktokCompletePayment(tikdata)
          // } else {
          //   console.log("object");
          // }
          this.hideLoading()
        })
        .catch(error => {
          this.hideLoading()

          console.log('error', error)
        })
    },
  },
}
</script>
