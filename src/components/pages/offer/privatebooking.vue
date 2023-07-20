<template>
  <div v-if="offerTitle.length > 0">
    <Navigation
      :headerTitleArry="offerTitle"
      @changeHeaderOffer="ChangeH($event)"
    />
    <div
      v-for="(data, index) in privateBookingData"
      :key="index"
      class="container custom-container py-4 mb-4 private-booking"
    >
      <div class="main-heading mb-2">
        <div>
          <hr class="primary-line" />
        </div>
        <div class="title">{{ data.header }}</div>
      </div>
      <div class="content mb-4 mt-3">
        <div class="content-desc">
          <div class="grid-half mb-3 mb-lg-0">
            <div>
              <p>{{ data.header1 }}</p>
              <p>
                {{ data.description }}
              </p>
            </div>
          </div>
        </div>
        <!-- <div>
            <p>Q. Do you take special requests?</p>
            <p>
              For any special request, please get in touch with us by email
              mentioning your preferred location, date and time as well as the
              number of people you would like to invite and your choice from the
              movies playing: (our email address).
            </p>
          </div>
          <div>
            <p>Q. Do you take special requests?</p>
            <p>
              For any special request, please get in touch with us by email
              mentioning your preferred location, date and time as well as the
              number of people you would like to invite and your choice from the
              movies playing: (our email address).
            </p>
          </div>
          <div>
            <p>Q. Are food and drinks included in the ticket?</p>
            <p>
              The Premiere Package comes with a Food and drinks package that
              includes : Your choice of regular-sized soft drink Your choice of
              Regular sized popcorn An item from the cinema classics in the VIP
              Menu The VIP Seats Package comes with a Food and drinks package
              that includes : Your choice of regular-sized soft drink Your
              choice of Regular sized popcorn
            </p>
          </div>
          <div>
            <p>Q. For how long the cinema can be booked?</p>
            <p>
              Each booking is for the duration of the movie session. Guests can
              book more than one session in a day.
            </p> -->
        <!-- <div>
              <table class="table">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">First</th>
                    <th scope="col">Last</th>
                    <th scope="col">Handle</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1</td>
                    <td>Mark</td>
                    <td>Otto</td>
                    <td>@mdo</td>
                  </tr>
                  <tr>
                    <td>2</td>
                    <td>Jacob</td>
                    <td>Thornton</td>
                    <td>@fat</td>
                  </tr>
                  <tr>
                    <td>3</td>
                    <td>Larry</td>
                    <td>the Bird</td>
                    <td>@twitter</td>
                  </tr>
                </tbody>
              </table>
            </div> -->
        <!-- </div>
          <div>
            <p>Q. What are the age restrictions?</p>
            <p>
              The age rating of the movie you’ve selected will apply (as
              stipulated by the National Media Council). Guests of all ages are
              permitted at Family & Friends Private Cinema. Guests between 13
              and 18 years should be accompanied by a guardian.
            </p>
          </div>
          <div>
            <p>
              Q. I booked a Friends and Family session and was not able to make
              it. Can I get a refund?
            </p>
            <p>
              As per our T&C, our private bookings are made on a non-refundable
              basis. Please note that after you submit your payment, your
              booking will be confirmed and we will not be able to change/edit
              it.
            </p>
          </div> -->
      </div>
      <div>
        <button @click="goToBookEvent" class="btn btn-primary btn-email">
          <a style="color:white;">EMAIL US</a>
        </button>
      </div>
    </div>
  </div>
</template>
<script>
import Navigation from '@/components/pages/offer/offernavigation.vue'
import { makeRequest } from '@/helper/internet.js'
import { mapState, mapGetters, mapActions } from 'vuex'
import {
  LanguageService,
  CountryService,
  TokenService,
} from '@/services/storage.service'
import { metaInfo } from '@/helper/constant.js'
export default {
  components: {
    Navigation,
  },
  data () {
    return {
      privateBookingData: [],
      offerTitle: [],
      offerListDetails: [],
      offerTitleDetails: {
        CouponTypeID: '',
        Description: '',
        OfferID: '',
        OfferName: '',
        Title: '',
      },
      headerTitleId: '1',
      offerObject: {
        ApplicableDays: '',
        CouponTypeID: '',
        Description: '',
        EndDate: '',
        ID: '',
        Image: '',
        IsActive: '',
        LanguageID: '',
        Name: '',
        ShowbizzVoucherID: '',
        StartDate: '',
        TNC: '',
      },
      showContent: false,
      offerId: null,
      bannerSlider: {
        arrows: false,
        dots: true,
        infinite: true,
        slidesToScroll: 1,
        slidesToShow: 1,
        autoplay: true,
        autoplaySpeed: 2000,
      },
      offerSlider: {
        arrows: true,
        dots: false,
        infinite: true,
        slidesToScroll: 3,
        slidesToShow: 4,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 3,
            },
          },
          {
            breakpoint: 700,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 1,
              adaptiveHeight: true,
            },
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
              adaptiveHeight: true,
            },
          },
        ],
      },
    }
  },
  beforeMount () {
    this.getAllOffers()
    this.getShowTimeBanners()
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
    goToBookEvent () {
      this.$router.push({
        path: '/book-event',
      })
    },
    getShowTimeBanners () {
      let payload = {
        PageName: 'privateBooking',
      }

      makeRequest('/PageData/', 'POST', null, payload)
        .then(response => {
          const { error, res } = response // console.log("Show details", res);

          this.hideLoading()

          if (res.data.hasOwnProperty('data') && res.data.data.length > 0) {
            this.privateBookingData = res.data.data
          }

          this.hideLoading()
        })
        .catch(error => {
          this.hideLoading()
          console.log('Error', error)
        })
    },
    ChangeH (headerTitleId) {
      this.headerTitleId = headerTitleId
      this.getOfferDetails()
    },
    getAllOffers () {
      this.offerListDetails = []
      this.showLoading()
      makeRequest('/OfferMaster', 'POST', null, null)
        .then(result => {
          const { error, res } = result
          const { data } = res.data
          if (!error) {
            if (
              res.data.hasOwnProperty('OfferMaster') &&
              res.data.OfferMaster.length > 0
            ) {
              this.offerTitle = res.data.OfferMaster
              this.getOfferDetails()
            }
          } else {
            console.log('object')
          }
          this.hideLoading()
        })
        .catch(error => {
          this.hideLoading()

          console.log('error', error)
        })
    },
    getOfferDetails () {
      let payload = {
        OfferID: this.headerTitleId,
      }
      // this.showLoading();
      makeRequest('/OfferMaster', 'POST', null, payload)
        .then(result => {
          const { error, res } = result
          const { data } = res.data
          if (!error) {
            console.log(res.data)
            if (res.data.hasOwnProperty('OfferMaster')) {
              Object.keys(this.offerTitleDetails).map(x => {
                this.offerTitleDetails[x] = res.data.OfferMaster[x] || ''
              })
            }

            if (
              res.data.hasOwnProperty('OfferList') &&
              res.data.OfferList.length > 0
            ) {
              this.offerListDetails = res.data.OfferList
            }
          } else {
            console.log('object')
          }
          this.hideLoading()
        })
        .catch(error => {
          this.hideLoading()

          console.log('error', error)
        })
    },
    getOfferId: function (index) {
      this.offerId = index
      this.checkOfferId(index)
    },
    checkOfferId: function (index) {
      if (index == this.offerId) {
        this.showContent = true
        return true
      }
    },
  },
}
</script>
<style>
.private-booking .table {
  border: 1px solid #000 !important;
}
.private-booking .table thead th {
  border: 1px solid #000;
}
.private-booking .table th,
.private-booking .table td {
  border-right: 1px solid #000;
  border-top: 1px solid #fff;
}
.private-booking .table thead {
  background-color: #ce1f2e;
  color: #fff;
  border: 1px solid #000 !important;
}
.private-booking .table th,
.private-booking .table td {
  /* border-left: 1px solid #000;
 border-right: 1px solid #000;
 border-left: 1px solid #000; */
}
.private-booking .content-desc {
  font-weight: 700;
  padding-left: 60px;
}
.private-booking .grid-half .btn-email {
  width: 160px;
  font-size: 14px;
  font-weight: 600;
  border-radius: 0px;
}
@media (min-width: 1400px) {
  .private-booking .grid-half {
    display: grid;
    grid-template-columns: 60% 25%;
    align-items: center;
    grid-column-gap: 10%;
  }
}
@media (max-width: 767px) {
  .private-booking .content-desc {
    padding-left: 10px;
  }
}
</style>
