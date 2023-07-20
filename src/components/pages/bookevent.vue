<template>
  <div>
    <!--Start Banner Slider--->
    <section class="section-banner">
      <slick
        v-if="showExpBanners.length > 0"
        ref="banner-slider"
        :options="bannerSlider"
      >
        <div
          v-for="(data, index) in showExpBanners"
          :key="index"
          class="w-100 banner-slider"
        >
          <div class="banner-img">
            <div>
              <img :src="URL_BASE1 + data" class="image" />
            </div>
          </div>
        </div>
      </slick>
    </section>
    <!--End Banner Slider--->
    <div class="container book-event mb-5">
      <div class="mt-4">
        <div class="main-heading">
          <div>
            <hr class="primary-line" />
          </div>
          <div class="title">BOOK an event</div>
        </div>
        <!-- <div class="content">
          <div class="small-content mt-3">
            Add flare to your business event, or treat your friends, colleagues
            or students to a private screening. We offer endless possibilities.
            Whatever the occasion, we will tailor the perfect package for you!
            To organize an event, host a private screening, or make a group
            booking, contact us today.
          </div>
        </div> -->
      </div>
      <div class="row justify-content-center mb-4">
        <div class="col-md-8 px-lg-0">
          <!-- <div class="grid-btns my-lg-5 mt-4 mb-3">
            <div>
              <b-dropdown
                variant="default"
                class="custom-dropdown quickbook-dropdown"
                text="Select Location"
              >
                <b-dropdown-item v-for="(data, Index) in 10" :key="Index"
                  >Cinema One</b-dropdown-item
                >
              </b-dropdown>
            </div>
            <div>
              <button class="btn btn-primary w-100">LOG IN</button>
            </div>
            <div>
              <button class="btn btn-primary w-100">sign up</button>
            </div>
            <div>
              <button class="btn btn-primary w-100">continue as a guest</button>
            </div>
          </div> -->
          <div class="event-form px-3 pt-4 pb-5 mt-4">
            <div class="px-lg-5 mr-lg-3">
              <div class="d-flex align-items-center">
                <div class="icon">
                  <img
                    src="@/assets/img/new-img/svg-img/profile.svg"
                    style="width: 18px"
                  />
                </div>
                <div class="mb-0 heading">Contact info</div>
              </div>
              <div class="pl-lg-5 ml-lg-5 py-4">
                <div class="grid-half pb-4">
                  <div class="px-lg-4 pr-4">
                    <label>{{ allLanguageData.FirstName }}</label>
                    <input
                      v-model="eventDetails.firstName"
                      type="text"
                      class="form-control"
                    />
                  </div>
                  <div class="px-lg-4 pl-4">
                    <label>{{ allLanguageData.LastName }}</label>
                    <input
                      v-model="eventDetails.lastName"
                      type="text"
                      class="form-control"
                    />
                  </div>
                </div>
                <div class="grid-half pb-4">
                  <div class="px-lg-4 pr-4">
                    <label>{{ allLanguageData.NewEmail }}</label>
                    <input
                      v-model="eventDetails.email"
                      type="text"
                      class="form-control"
                    />
                  </div>
                  <div class="px-lg-4 pl-4">
                    <label>{{ allLanguageData.MobileNumber }}</label>
                    <input
                      v-model="eventDetails.mobile"
                      type="text"
                      class="form-control"
                    />
                  </div>
                </div>
                <div class="d-flex align-items-center pb-4 px-lg-4">
                  <div class="form-check mr-3">
                    <input
                      v-model="eventDetails.gender"
                      class="form-check-input custom-radio"
                      type="radio"
                      name="gender"
                      value="male"
                      id="male"
                    />
                    <label class="form-check-label" for="male">
                      {{ allLanguageData.Male }}
                    </label>
                  </div>
                  <div class="form-check mr-3">
                    <input
                      v-model="eventDetails.gender"
                      class="form-check-input custom-radio"
                      type="radio"
                      name="gender"
                      value="female"
                      id="female"
                    />
                    <label class="form-check-label" for="female">
                      {{ allLanguageData.Female }}
                    </label>
                  </div>
                </div>
                <div class="grid-half">
                  <div class="px-lg-4 d-flex align-items-center">
                    <label>D.O.B</label>

                    <input
                      v-model="eventDetails.dob"
                      type="date"
                      class="form-control ml-3"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div class="px-lg-5">
              <div class="d-flex align-items-center">
                <div class="icon">
                  <img
                    src="@/assets/img/new-img/svg-img/calendar.svg"
                    style="width: 18px"
                  />
                </div>
                <div class="mb-0 heading">
                  {{ allLanguageData.EVENTINFO }}
                </div>
              </div>
              <div class="pl-lg-5 ml-lg-5 py-4">
                <div class="grid-half">
                  <div class="px-lg-4 pr-4">
                    <label>{{ allLanguageData.EventType }}</label>
                    <input
                      v-model="eventDetails.type"
                      type="text"
                      class="form-control"
                    />
                  </div>
                  <div class="px-lg-4 pl-4">
                    <label>{{ allLanguageData.PurposeofEvent }}</label>
                    <input
                      v-model="eventDetails.purpose"
                      type="text"
                      class="form-control"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div class="px-lg-5 mr-3 d-flex align-items-center">
              <div class="d-flex align-items-center">
                <div class="icon">
                  <img
                    src="@/assets/img/new-img/svg-img/location.svg"
                    style="width: 18px"
                  />
                </div>
                <div class="mb-0 heading">Branches*</div>
              </div>
              <div class="w-100">
                <b-dropdown
                  id="dropdown-1"
                  :text="eventDetails.SelectedCinema"
                  variant="default"
                  class="
                mt-3
                mr-auto
                w-100
                custom-dropdown
                popup-input
                cinema-dropdown
                cinema-one-dropdown
              "
                >
                  <b-dropdown-item
                    v-for="(cinema, cinemaKey) in cinemasList"
                    :key="cinemaKey"
                    v-on:click="onSelectCinema(cinema)"
                    class="text-truncate"
                    >{{ cinema.CinemaName }}</b-dropdown-item
                  >
                </b-dropdown>
              </div>
            </div>

            <div class="text-center mt-5">
              <div class="text-center mt-2 last-text">
                {{ eventDetails.errorMessage }}
              </div>
              <button class="btn btn-submit" @click="onSubmitForm()">
                SUBMIT
              </button>
            </div>
            <div class="text-center mt-2 last-text">{{ SuccessMessage }}</div>
          </div>
        </div>
      </div>
      <!-- <div class="mt-3 content">
        <div class="content-title">filter by</div>
        <div class="filter-dropdown row my-3">
          <div class="col-6 col-md-2 pr-0">
            <b-dropdown
              variant="default"
              class="quickbook-dropdown"
              text="Select a Hall"
            >
              <b-dropdown-item v-for="(data, Index) in 10" :key="Index"
                >Cinema One</b-dropdown-item
              >
            </b-dropdown>
          </div>
          <div class="col-6 col-md-2">
            <b-dropdown
              variant="default"
              class="quickbook-dropdown"
              text="Select a Movie"
            >
              <b-dropdown-item v-for="(data, Index) in 10" :key="Index"
                >Cinema One</b-dropdown-item
              >
            </b-dropdown>
          </div>
        </div>
        <div class="mt-4">
          <MovieSlider
            bgcolor="emp-bgsecondary"
            oppbgcolor="emp-bgprimary"
            booknow="true"
            :moviesArray="[1, 2, 3, 4, 5, 6, 7, 8]"
          />
        </div>
      </div> -->
    </div>
  </div>
</template>
<script>
import MovieSlider from '@/components/partials/movieSlider.vue'
import { makeRequest } from '@/helper/internet.js'
import { URL_BASE } from '@/helper/constant.js'
export default {
  components: { MovieSlider },
  data () {
    return {
      SuccessMessage: '',
      URL_BASE1: URL_BASE + '/',
      eventDetails: {
        SelectedCinema: '',
        errorMessage: '',
        firstName: '',
        lastName: '',
        email: '',
        mobile: '',
        gender: '',
        dob: '',
        type: '',
        purpose: '',
        branch: '',
      },
      showExpBanners: [],
      cinemasList: [],
      bannerSlider: {
        arrows: false,
        dots: true,
        infinite: true,
        slidesToScroll: 1,
        slidesToShow: 1,
        autoplay: true,
        autoplaySpeed: 2000,
      },
      movieSlider: {
        arrows: true,
        dots: false,
        infinite: true,
        slidesToScroll: 3,
        slidesToShow: 6,
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
              slidesToShow: 2,
              slidesToScroll: 1,
              adaptiveHeight: true,
            },
          },
        ],
      },
    }
  },
  beforeMount () {
    this.fetchCinemasList()
    this.getShowTimeBanners()
  },
  mounted () {
    // this.hideLoading();
  },

  methods: {
    onSelectCinema (cinema) {
      this.eventDetails.SelectedCinema = cinema.CinemaName
    },
    fetchCinemasList: function () {
      let payload = {}
      // GetAllCinemasList
      makeRequest('/GetCinemas/', 'POST', null, payload)
        .then(result => {
          const { error, res } = result
          const { data } = res.data
          if (!error) {
            this.cinemasList = res.data.Categories
            console.log(this.cinemasList, 'daadad', res.data.Categories)
          }
        })
        .catch(error => {
          // console.log("Error on vue front", error);
        })
    },
    validateForm () {
      let value = true
      this.eventDetails.errorMessage = ''
      if (this.eventDetails.firstName == '') {
        this.eventDetails.errorMessage = 'First Name Cannot be Empty'
        return false
      } else if (this.eventDetails.lastName == '') {
        this.eventDetails.errorMessage = 'Last Name Cannot be Empty'
        return false
      } else if (this.eventDetails.SelectedCinema === '') {
        this.eventDetails.errorMessage = 'Branch Cannot be Empty'
        return false
      } else if (this.eventDetails.email == '') {
        this.eventDetails.errorMessage = 'Email Address Cannot be Empty'
        return false
      } else if (this.eventDetails.type == '') {
        this.eventDetails.errorMessage = 'Event Type Cannot be Empty'
        return false
      } else {
        return true
      }
    },
    onSubmitForm: function () {
      if (this.validateForm()) {
        this.showLoading()
        let payload = {
          fname: this.eventDetails.firstName,
          lname: this.eventDetails.lastName,
          Email: this.eventDetails.email,
          Mobile: this.eventDetails.mobile,
          DOB: this.eventDetails.dob,
          Event_type: this.eventDetails.type,
          purpose: this.eventDetails.purpose,
          branches: this.eventDetails.SelectedCinema,
        }

        makeRequest('/EventBooking', 'POST', null, payload)
          .then(response => {
            const { error, res } = response
            this.hideLoading()
            if (!error) {
              if (res.data.Status) {
                // this.contactUsDeatils.errorMessage = res.data.Message;
                this.eventDetails.firstName = ''
                this.eventDetails.lastName = ''
                this.eventDetails.email = ''
                this.eventDetails.mobile = ''
                this.eventDetails.dob = ''
                this.eventDetails.type = ''
                this.eventDetails.purpose = ''
                this.eventDetails.SelectedCinema = ''
                this.SuccessMessage = res.data.Message
                setTimeout(() => {
                  this.$refs.contact_us.hide()
                }, 3000)
              } else {
                this.eventDetails.errorMessage = res.data.Message
              }
              // handle if error
            }
          })
          .catch(error => {
            console.log('Error', error)
            //   resolve(null);
            this.eventDetails.errorMessage = 'Please Fill in all the fields'
          })
      }
    },

    getShowTimeBanners () {
      this.hideLoading()
      // this.showLoading();
      let payload = {
        PageName: 'bookEventBanner',
      }

      makeRequest('/PageData/', 'POST', null, payload)
        .then(response => {
          this.hideLoading()
          const { error, res } = response // console.log("Show details", res);

          if (res.data.hasOwnProperty('banner') && res.data.banner.length > 0) {
            this.showExpBanners = res.data.banner
          }

          this.hideLoading()
        })
        .catch(error => {
          this.hideLoading()
          console.log('Error', error)
        })
    },
  },
}
</script>
<style>
.book-event .event-form {
  background: #e5e6e7;
  color: #434345;
}
.book-event .event-form .heading {
  font-weight: bold;
  text-transform: uppercase;
  font-size: 14px;
  padding-left: 10px;
}
.book-event .event-form label {
  font-weight: 500;
  text-transform: uppercase;
  font-size: 14px;
  margin-bottom: 0px;
}
.book-event .event-form .form-control {
  border-bottom: 1px solid #434345;
  color: #434345 !important;
}
.book-event .btn-primary {
  text-align: left;
  text-transform: uppercase;
  font-size: 12px;
}
/* .book-event .grid-btns {
  display: grid;
  grid-template-columns: 22% 22% 22% 22%;
  grid-column-gap: 1%;
  align-items: center;
  justify-content: center;
} */
.event-form .grid-half {
  display: grid;
  grid-template-columns: 50% 50%;
}
.event-form label {
  text-transform: uppercase;
}
.event-form .custom-radio:after {
  width: 14px;
  height: 14px;
  border-radius: 14px;
  top: -4px;
  position: relative;
  background-color: #e5e6e7;
  content: "";
  display: inline-block;
  visibility: visible;
  border: 2px solid #434345;
}
.event-form .custom-radio:checked:after {
  width: 14px;
  height: 14px;
  border-radius: 14px;
  top: -4px;
  position: relative;
  background-color: #434345;
  content: "";
  display: inline-block;
  visibility: visible;
  border: 2px solid #434345;
}
.book-event .quickbook-dropdown {
  border: 1px solid #434345 !important;
}
.book-event .quickbook-dropdown .dropdown-toggle {
  color: #434345;
  font-weight: 500;
}
.event-form .btn-submit {
  background-color: #5a6268 !important;
  color: white;
  width: 136px;
  border-radius: 0px;
  font-weight: 600;
}
@media screen and (min-width: 1024px) {
  .book-event .grid-btns {
    display: grid;
    grid-template-columns: 22% 22% 22% 22%;
    grid-column-gap: 1%;
    align-items: center;
    justify-content: center;
  }
}
@media screen and (max-width: 768px) {
  .book-event .grid-btns {
    display: grid;
    grid-row-gap: 14px;
  }
}
</style>
