<template>
  <div>
    <section class="container-fluid">
      <div class="col-12 col-lg-12 col-xl-11 mx-auto px-0 mt-5">
        <div
          v-if="bookingDetails.BookingStatus == 'SUCCESS'"
          class="col-lg-10 mx-auto d-none d-md-block"
        >
          <div class="ticket-container">
            <span class="ticket-cutter-1"></span>
            <span class="ticket-cutter-2"></span>
            <div class="row mx-0">
              <div class="col-md-3 pl-0">
                <img
                  v-lazy="bookingDetails.Image"
                  class="img-fluid w-100 ticket-image-final"
                  v-bind:alt="bookingDetails.Title"
                />
              </div>
              <div class="col-md-6 py-2">
                <div class="row">
                  <div class="col-12 px-0">
                    <div class="font-weight-bold text-uppercase">
                      {{ bookingDetails.Title }}
                    </div>
                    <div>
                      {{ bookingDetails.CinemaName }} ({{
                        bookingDetails.Format
                      }}) {{ bookingDetails.Language }}
                    </div>
                  </div>
                  <div class="col-12 px-0">
                    <hr class="bg-danger" />
                  </div>
                  <div class="col-4 mb-3 pl-0">
                    <div class="font-weight-bold">SCREEN</div>
                    <div>{{ bookingDetails.ScreenName }}</div>
                  </div>
                  <div class="col-4 pl-0">
                    <div class="font-weight-bold">TIME</div>
                    <div>{{ bookingDetails.MovieTiming }}</div>
                  </div>
                  <div class="col-4 px-0">
                    <div class="font-weight-bold">DATE</div>
                    <div>{{ bookingDetails.MovieDate }}</div>
                  </div>
                  <div class="col-4 pl-0">
                    <div class="font-weight-bold">TOTAL AMOUNT</div>
                    <div>
                      {{ bookingDetails.Currency }} {{ bookingDetails.Total }}
                    </div>
                  </div>
                  <div class="col-4 px-0">
                    <div class="font-weight-bold">TICKET AMOUNT</div>
                    <div>
                      {{ bookingDetails.Currency }} {{ bookingDetails.Total }}
                    </div>
                  </div>
                  <div class="col-6 col-md-10 pl-0">
                    <div class="font-weight-bold">SEATS</div>
                    <div>
                      <ul class="seat-list">
                        <li
                          v-for="(seat, seatIndex) in bookingDetails.SeatsList"
                          :key="seatIndex"
                        >
                          {{ seat }}
                        </li>
                      </ul>
                    </div>
                  </div>

                  <!-- <div class="col-6 pl-0 pt-2 pt-xl-4">
                    <div class="font-weight-bold">TOTAL AMOUNT</div>
                    <div>{{bookingDetails.Currency}} {{bookingDetails.Total}}</div>
                  </div>

                   <div class="col-6 pl-0 pt-2 pt-xl-4">
                    <div class="font-weight-bold">TICKET AMOUNT</div>
                    <div>{{bookingDetails.Currency}} {{bookingDetails.Total}}</div>
                  </div>-->
                  <div
                    class="col-12 py-1 final-offer-text"
                    :class="bookingDetails.IsLoyaltybooking ? 'red' : 'green'"
                    v-if="bookingDetails.Offer"
                  >
                    <div class="mr-2" v-if="!bookingDetails.IsLoyaltybooking">
                      <img src="@/assets/img/offer-icon.svg" alt="" />
                    </div>
                    <div>
                      {{ bookingDetails.Offer }}
                      <span v-if="bookingDetails.OfferDiscount > 0"
                        >: {{ bookingDetails.Currency }}
                        {{ bookingDetails.OfferDiscount }}</span
                      >
                    </div>
                  </div>

                  <div class="col-6 pl-0 pt-2 pt-xl-4">
                    <div class="font-weight-bold">PICKUP CODE</div>
                    <div>{{ bookingDetails.pickupcode }}</div>
                  </div>
                  <!--  -->
                  <div
                    v-if="bookingDetails.tfnb > 0"
                    class="col-6 pl-0 pt-2 pt-xl-4"
                  >
                    <div class="font-weight-bold">FOOD &amp; BEV</div>
                    <div>
                      {{ bookingDetails.Currency }} {{ bookingDetails.tfnb }}
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-md-3 d-flex justify-content-around py-3">
                <div class="d-md-none">
                  <img
                    v-lazy="bookingDetails.Image"
                    class="rounded"
                    height="auto"
                    width="100px"
                    v-bind:alt="bookingDetails.Title"
                  />
                </div>
                <div
                  class="d-flex h-100 align-items-center flex-column justify-content-around"
                >
                  <!-- v-if="String(CountryID) != '230'" -->
                  <img
                    :src="bookingDetails.QRCode"
                    height="auto"
                    width="100px"
                  />
                  <div class="text-center">
                    <div class="font-weight-bold">BOOKING ID</div>
                    <div>{{ bookingDetails.ShowBizzBookingID }}</div>
                  </div>
                  <div
                    v-if="bookingDetails.hasOwnProperty('FnbBookingId')"
                    class="text-center"
                  >
                    <div class="font-weight-bold">F&amp;B BOOKING ID</div>
                    <div>{{ bookingDetails.FnbBookingId }}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          class="col-lg-10 mx-auto d-none d-md-block"
          v-else-if="bookingDetails.BookingStatus == 'FAIL'"
        >
          Something Went Wrong!
        </div>
        <!-- <div class="col-lg-8 mx-auto">
            <p align="center" class="eTitle">IT'S SHOWTIME</p>
          <div class="ticket-container">
            <span class="ticket-cutter-1"></span>
            <span class="ticket-cutter-2"></span>
            <div class="row mx-0">
              <div class="col-md-3 poster pl-0 d-none d-md-block">
                <img src="@/assets/img/poster5.jpg" class="img-fluid">
              </div>
              <div class="col-md-6 py-3">
                <div class="row">
                  <div class="col-12">
                    <div class="font-weight-bold">AVENGERDS: Endgame</div>
                    <div>DUBAIL MALL SC (3D) ENGLISH</div>
                  </div>
                  <div class="col-12">
                    <hr class="bg-danger">
                  </div>
                  <div class="col-4 mb-3">
                    <div class="font-weight-bold">SCREEN</div>
                    <div>3</div>
                  </div>
                  <div class="col-4">
                    <div class="font-weight-bold">TIME</div>
                    <div>3:00 PM</div>
                  </div>
                  <div class="col-4">
                    <div class="font-weight-bold">DATE</div>
                    <div>14 FEB 2019</div>
                  </div>

                  <div class="col-6 col-md-4">
                    <div class="font-weight-bold">SEATS</div>
                    <div>
                        <ul class="seat-list">
                            <li>J1</li>
                            <li>J2</li>
                            <li>J3</li>
                            <li>J4</li>
                            <li>J5</li>
                        </ul>
                    </div>
                  </div>
                  <div class="col-6 col-sm-4 col-md-6">
                    <div class="font-weight-bold">FOOD & BEV</div>
                    <div>SAR 36.00</div>
                  </div>
                </div>
              </div>
              <div class="col-md-3 d-flex justify-content-around">
                <div class="d-md-none">
                  <img src="@/assets/img/poster5.jpg" class="rounded" height="auto" width="100px">
                </div>


                <div class="d-flex  h-100 align-items-center flex-column justify-content-between">
                  <img src="@/assets/img/qr.png" height="auto" width="100px">
                  <div class="text-center">
                    <div class="font-weight-bold ">BOOKING ID</div>
                    <div>123456789</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>-->

        <div v-if="bookingDetails.BookingStatus == 'SUCCESS'" class="d-md-none">
          <div class="col-md-10 mx-auto mt-4 mb-4">
            <div class="m-ticket">
              <div class="row pt-4 pb-3 mx-0">
                <div
                  v-if="preimere == true || preimere == 'true'"
                  class="col-6"
                >
                  <img
                    src="@/assets/img/svg/emp-gold-bg-logo.svg"
                    class="img-fluid"
                  />
                </div>
                <div v-else class="col-6">
                  <img
                    src="@/assets/img/svg/ticket-logo.svg"
                    class="img-fluid"
                  />
                </div>

                <div
                  class="col-6 text-right font-weight-bold lh-1_3 profile-mob-ticket"
                >
                  {{ bookingDetails.CinemaName }}
                </div>
              </div>
              <div v-if="bookingDetails.TransactionType !== 'InCinemaFB'">
                <img
                  v-lazy="bookingDetails.HeaderImage"
                  class="img-fluid"
                  v-bind:alt="bookingDetails.Title"
                />
              </div>

              <div class="p-3">
                <div class="row">
                  <div class="col-7 pr-0">
                    <span
                      v-if="bookingDetails.TransactionType !== 'InCinemaFB'"
                      class="film-text"
                      >{{ allLanguageData.Film }}</span
                    >
                    <p
                      v-if="bookingDetails.TransactionType !== 'InCinemaFB'"
                      class="movie-n mb-0"
                    >
                      {{ bookingDetails.Title }}
                    </p>
                    <div v-if="bookingDetails.TransactionType !== 'InCinemaFB'">
                      <span class="box-d px-1">{{
                        bookingDetails.Format
                      }}</span>
                      <span class="lang-s pl-1">{{
                        bookingDetails.Language
                      }}</span
                      >.
                    </div>

                    <div class="row py-2">
                      <div class="col">
                        <span class="film-text">{{
                          allLanguageData.Screen
                        }}</span>
                        <p class="movie-n mb-0">
                          {{ bookingDetails.ScreenName }}
                        </p>
                      </div>
                    </div>

                    <div class="row py-2">
                      <div class="col-6">
                        <span class="film-text">TOTAL AMOUNT</span>
                        <p class="movie-n mb-0">
                          {{ bookingDetails.Currency }}
                          {{ bookingDetails.Total }}
                        </p>
                      </div>
                      <div
                        class="col-6"
                        v-if="bookingDetails.TransactionType !== 'InCinemaFB'"
                      >
                        <span class="film-text">TICKET AMOUNT</span>
                        <p class="movie-n mb-0">
                          {{ bookingDetails.Currency }}
                          {{ bookingDetails.Total }}
                        </p>
                      </div>
                    </div>

                    <div class="row py-2">
                      <div class="col-6">
                        <span class="film-text">{{
                          allLanguageData.Date
                        }}</span>
                        <p class="movie-n mb-0">
                          {{ bookingDetails.MovieDate }}
                        </p>
                      </div>
                      <div
                        class="col-6"
                        v-if="bookingDetails.TransactionType !== 'InCinemaFB'"
                      >
                        <span class="film-text">{{
                          allLanguageData.Time
                        }}</span>
                        <p class="movie-n mb-0">
                          {{ bookingDetails.MovieTiming }}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div class="col-5 text-right">
                    <img
                      v-if="String(CountryID) != '230'"
                      :src="bookingDetails.QRCode"
                      height="auto"
                      width="100px"
                      v-bind:alt="bookingDetails.Title"
                    />
                  </div>
                </div>

                <div class="row py-2">
                  <div class="col-7">
                    <span class="film-text">{{ allLanguageData.Seats }}</span>
                    <div class="movie-n">
                      <!-- <p class="movie-n mb-0">{{bookingDetails.Seats}}</p> -->
                      <ul
                        class="seat-list"
                        v-if="bookingDetails.TransactionType !== 'InCinemaFB'"
                      >
                        <li
                          v-for="(seat, seatIndex) in bookingDetails.SeatsList"
                          :key="seatIndex"
                        >
                          {{ seat }}
                        </li>
                      </ul>

                      <div
                        v-if="bookingDetails.TransactionType == 'InCinemaFB'"
                      >
                        {{ bookingDetails.Seatinfo }}
                      </div>
                    </div>
                  </div>

                  <div class="col-5">
                    <div class="float-right">
                      <span class="film-text">{{
                        allLanguageData.BookingId
                      }}</span>
                      <p
                        class="movie-n mb-0"
                        v-if="bookingDetails.TransactionType !== 'InCinemaFB'"
                      >
                        {{ bookingDetails.bookingid }}
                      </p>
                      <p
                        class="movie-n mb-0"
                        v-if="bookingDetails.TransactionType == 'InCinemaFB'"
                      >
                        {{ bookingDetails.ShowBizzBookingID }}
                      </p>
                    </div>
                  </div>
                  <div
                    v-if="
                      bookingDetails.hasOwnProperty('FnbBookingId') ||
                      bookingDetails.TransactionType !== 'InCinemaFB'
                    "
                    class="col-5"
                  >
                    <div class="float-right">
                      <span class="film-text">F&amp;B BOOKING ID</span>
                      <p class="movie-n mb-0">
                        {{ bookingDetails.FnbBookingId }}
                      </p>
                    </div>
                  </div>
                </div>

                <div
                  class="col-12 py-1 final-offer-text"
                  :class="bookingDetails.IsLoyaltybooking ? 'red' : 'green'"
                  v-if="bookingDetails.Offer"
                >
                  <div class="mr-2" v-if="!bookingDetails.IsLoyaltybooking">
                    <img src="@/assets/img/offer-icon.svg" alt="" />
                  </div>
                  <div>
                    {{ bookingDetails.Offer }}
                    <span v-if="bookingDetails.OfferDiscount > 0"
                      >: {{ bookingDetails.Currency }}
                      {{ bookingDetails.OfferDiscount }}</span
                    >
                  </div>
                </div>

                <div class="row">
                  <div class="col-5">
                    <span class="film-text">{{
                      allLanguageData.PicupCode
                    }}</span>
                    <div class="movie-n">
                      <p class="movie-n mb-0">
                        {{ bookingDetails.pickupcode }}
                      </p>
                    </div>
                  </div>
                  <!--  -->
                  <div class="col-7">
                    <div
                      v-if="
                        bookingDetails.tfnb > 0 ||
                        bookingDetails.TransactionType !== 'InCinemaFB'
                      "
                      class="float-right"
                    >
                      <span class="film-text">{{ allLanguageData.FnB }}</span>
                      <p class="movie-n mb-0">{{ bookingDetails.tfnb }}</p>
                    </div>
                  </div>
                  <div
                    class="col-12 mt-3"
                    v-if="bookingDetails.TransactionType == 'InCinemaFB'"
                  >
                    <ul class="list-unstyled">
                      <li
                        v-for="(
                          fnb_items, fnb_items_Index
                        ) in bookingDetails.f_and_b"
                        :key="fnb_items_Index"
                      >
                        <div class="mb-2">
                          <p class="film-text d-block mb-0">Title</p>
                          <p class="movie-n mb-0">{{ fnb_items.title }}</p>
                        </div>

                        <div
                          class="d-flex align-items-center justify-content-between"
                        >
                          <div>
                            <span class="film-text">QTY</span>
                            <p class="movie-n mb-0">
                              {{ fnb_items.qty }}
                            </p>
                          </div>
                          <div>
                            <span class="film-text">Total</span>
                            <p class="movie-n mb-0">
                              {{ fnb_items.total }}
                            </p>
                          </div>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <span class="half-c"></span>
            </div>
          </div>
        </div>
        <div
          class="d-md-none"
          v-else-if="bookingDetails.BookingStatus == 'FAIL'"
        >
          Something Went Wrong!
        </div>

        <!-- <div class="col-lg-10 bg-light py-1 d-flex align-items-center">

        </div> -->

        <div
          class="col-12 py-2 col-md-6 mx-auto align-self-center d-flex align-items-center justify-content-center"
        >
          <div class="font-weight-bold text-white mr-3">
            {{ bookingDetails.OfferText }}
          </div>
          <div class="">
            <img :src="bookingDetails.OfferImage" class="sponsor-img" alt="" />
          </div>
        </div>

        <div class="fixed-container bg-transparent" style="box-shadow: none">
          <!-- <button class="btn-split mr-2">SPLIT TICKETS</button> -->
          <button v-b-modal.invite class="btn-share"></button>
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

      <!-- <div class="invite-pop">
                <b-modal ref="invitemodal" title="Invite Friend" id="invite" hide-footer>
                    <div class="p-4">
                      <div class="invite-section">
                        <p class="invite-txt mb-3"> Send ticket to a friend</p>
                       <form data-vv-scope="inviteFriend" class="d-md-flex w-100">
                        <input v-model="friendemail" v-validate="'required|email'" type="text" name="email" class="form-control py-4 w-100" placeholder="Enter Your Friend's Email Address">
                      </form>
                      <div v-show="errors.has('inviteFriend.email')" class="py-1 text-danger font-weight-bold small">
                                  {{ errors.first('inviteFriend.email') }}</div>
                      </div>
                      <div class="text-danger mt-3 small font-weight-bold ">{{errorMessage}}</div>
                      <div class="mt-3">
                        <input @click.stop="validateBeforeSubmit('inviteFriend')" type="submit" class="gogo-btn btn btn-danger" value="Send" />
                      </div>
                    </div>
                </b-modal>
      </div>-->
    </section>
  </div>
</template>

<script>
import { makeRequest } from '@/helper/internet.js'

export default {
  metaInfo: {
    title: 'Booking Confirmation',
    titleTemplate: null,
  },

  data () {
    return {
      bookingDetails: {},
      bookingID: '',
      friendemail: '',
      errorMessage: '',
      reserveID: '',
      preimere: '',
    }
  },
  beforeCreate: function () {
    let pre = window.localStorage.getItem('PREIMERE')
    if (pre == null || pre == 'false' || pre == false) {
      document.body.className = 'img-section'
    } else {
      document.body.className = 'gold-img-section'
    }
  },
  mounted: function () {
    this.preimere = window.localStorage.getItem('PREIMERE')
  },
  beforeMount () {
    const { reserveID } = this.$route.params
    this.reserveID = this.$route.params.reserveID
    if (reserveID) {
      this.getBookingID(reserveID)

      // this.getBookingDetails(bookingID);
    }
    // console.log(
    //   "-------this.sessionStore.get-------",
    //   this.sessionStore.get("EMRID")
    // );
    // if (this.sessionStore.get("EMRID")) {
    //   this.getBookingID(this.sessionStore.get("EMRID"));
    // } else {
    //   // Send Back page again
    // }
  },
  methods: {
    validateBeforeSubmit (scope) {
      if (scope == 'inviteFriend') {
        this.$validator.validateAll(scope).then((result) => {
          if (result) {
            this.showLoading()
            // let token = TokenService.getToken();
            let payload = {
              useremail: this.friendemail,
              bookingid: this.bookingDetails.QRID,
            }
            makeRequest('/Shareticket', 'POST', null, payload)
              .then((response) => {
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
              .catch((error) => {
                console.log('Error', error)
              })
          }
        })
      }
    },
    getBookingID: function (ReserveID) {
      let payload = {
        ReserveID,
        // ReserveID: 1551544000
      }
      makeRequest('/GetBookingID/', 'POST', null, payload)
        .then((response) => {
          const { error, res } = response
          if (!error && res.data.Status) {
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
      // let payload = {
      //   BookingID: this.bookingID || 1
      // };
      // let TransactionTypeValue = this.fromQrCode ? "InCinemaFB" : "Normal";
      let payload = {
        BookingID,
        TransactionType: 'Normal',
      }
      makeRequest('/GetBookingDetails/', 'POST', null, payload)
        .then((response) => {
          const { error, res } = response
          if (!error && res.data) {
            this.bookingDetails = res.data
            this.bookingID = res.data.pickupcode
            this.bookingDetails.SeatsList = this.bookingDetails.SeatsList.split(
              ','
            )
            this.bookingDetails.NewBookingID = this.bookingDetails.QRID.split(
              '|'
            )
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

<style scoped>
.sponsor-img {
  height: auto;
  width: auto;
  max-width: 165px;
  max-height: 175px;
  object-fit: contain;
  object-position: center;
}
.ticket-image-final {
  height: 100%;
  object-fit: cover;
  object-position: center;
}
.poster {
  width: 100%;
  height: 320px;
  background-size: 100% 100%;
}

ul:focus {
  outline: none;
}

.dotted-border-x {
  border-left: 1px dotted #fff;
  border-right: 1px dotted #fff;
}

/* PREFERENCE TAB SECTION  */
.preference-tabs {
  width: 100%;
}

.preference-tabs .tabs {
  display: flex;
  flex-wrap: wrap;
}

.preference-tabs .tab-content {
  padding-left: 15px;
  padding-right: 15px;
}

@media (max-width: 767px) {
  body {
    font-size: 14px;
  }

  .profile-container {
    padding: 30px 20px;
    margin-bottom: 175px;
  }

  .profile-container .dotted-border-x {
    border-left: 0;
    border-right: 0;
  }

  .profile-tabs .nav {
    overflow-x: auto;
    overflow-y: hidden;
    flex-wrap: nowrap;
    white-space: nowrap;
    justify-content: flex-start;
  }

  .profile-container .form-row {
    margin-bottom: 25px;
  }

  .profile-container .content {
    width: 95%;
    padding-top: 0;
  }

  .fixed-save {
    padding: 0;
    display: flex;
    min-height: 100px;
    align-items: center;
  }
}

@media (max-width: 576px) {
  .profile-container {
    padding: 25px 0;
  }

  .preference-tabs .nav {
    overflow-x: auto;
    flex-wrap: nowrap;
    margin-left: 10px;
    overflow-y: hidden;
    margin-right: 10px;
    white-space: nowrap;
  }

  .lang-list li,
  .genre-list li,
  .prefCinema-list li {
    min-width: 85px;
  }

  .lang-list li label,
  .genre-list li label,
  .prefCinema-list li label {
    font-size: 10px;
  }
}
</style>
