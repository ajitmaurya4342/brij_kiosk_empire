<template>
  <div
    class="text-center d-flex align-items-center justify-content-center"
    style="height: calc(100vh - 250px)"
  >
    <div>
      <h3 v-if="reasonId == 1" class="mb-4 text-white">
        This transaction has been declined. Kindly contact credit card issuer
        bank.
      </h3>
      <h3 v-if="reasonId == 2" class="mb-4 text-white">
        Sorry, something went wrong!<br />
        Please retry in sometime<br />
        If your payment has been deducted it will be refunded in sometime
      </h3>
      <router-link
        :to="{
          name: 'movieDetails',
          params: {
            movieId: bookingDetails.MoviedetailID,
            formatId: bookingDetails.MoviedetailformateID,
          },
        }"
        class="btn-save text-white"
        >Retry</router-link
      >
    </div>
  </div>
</template>

<script>
import { makeRequest } from '@/helper/internet.js'

export default {
  metaInfo: {
    title: 'Payment Failed',
    titleTemplate: null,
  },
  beforeCreate: function () {
    let pre = window.localStorage.getItem('PREIMERE')
    if (pre == null || pre == 'false' || pre == false) {
      document.body.className = 'img-section'
    } else {
      document.body.className = 'gold-img-section'
    }
  },
  data () {
    return {
      bookingDetails: {},
      reasonId: '1',
    }
  },
  beforeMount () {
    const { reserveId } = this.$route.params
    this.reasonId = this.$route.params.reasonId
    if (reserveId) {
      this.getBookingID(reserveId)
    }
  },
  methods: {
    getBookingID: function (ReserveID) {
      let payload = {
        ReserveID,
      }
      makeRequest('/GetBookingID/', 'POST', null, payload)
        .then((response) => {
          const { error, res } = response
          if (!error && res.data) {
            this.getBookingDetails(res.data.BookingID)
          } else {
            console.log('Response Error ')
          }
        })
        .catch((error) => {
          console.log('Error', error)
        })
    },
    getBookingDetails: function (BookingID) {
      let payload = {
        BookingID,
      }
      makeRequest('/GetBookingDetails/', 'POST', null, payload)
        .then((response) => {
          const { error, res } = response
          if (!error && res.data) {
            this.bookingDetails = res.data
          } else {
            console.log('Response Error ')
          }
        })
        .catch((error) => {
          console.log('Error', error)
        })
    },
  },
}
</script>
