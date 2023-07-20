<template>
  <div>
    <section>
      <div class="col-md-11 mx-auto mb-5">
        <div class="my-4 text-center cus-list">
          <p class="eTitle eTitlewhite mb-0">
            <img src="@/assets/img/svg/nowShowing-icon.svg" class="pr-2 pb-1" />
            {{ allLanguageData.BookByCinema }}
          </p>
          <div class="whitedotline-box w-100">
            <hr class="white-dotline mt-1" />
            <span></span>
          </div>
        </div>

        <b-modal
          id="contactModal"
          :title="allLanguageData.ContactUsModal.Title"
          ref="contactModal"
          class="contactus text-danger iraq-contact-modal"
          hide-footer
        >
          <!-- IRAQ -->
          <div v-if="CountryID == 102 || CountryID == '102'">
            <p class="mb-0 text-center text-white d-none d-md-block">
              Family Mall -100 M Street -Erbil - Iraq
              <br />T: 0750 2 100 100 - 075 2 200 200
            </p>

            <div class="d-md-none">
              <p class="mb-0 text-center text-white">
                T: 0750 2 100 100 - 075 2 200 200
              </p>
              <div
                class="d-flex align-itens-center justify-content-between iraq-contact w-100"
              >
                <div v-on:click="onCancel()" class="cancel">Cancel</div>
                <a href="tel:+07502100100" class="call text-white">Call</a>
              </div>
            </div>
          </div>
        </b-modal>

        <div class="map-container">
          <div class="row">
            <div class="col-md-4 col-lg-4 col-xl-3 mb-5 mb-md-0 color-filter">
              <div class="filter-box">
                <div class="cinema-card pr-2">
                  <!-- <b-card class="mb-3"  header="CINEMA NAME #1" v-for="(cinema , cinemaKey) in 10" :key="cinemaKey">
                     <p class="mb-0">Cinema address line #1</p>
                     <p class="mb-0">then comes Cinema address line #2</p>
                     <p class="mb-0">address line #3</p>
                     <div class="mt-3 mb-2">
                         <b-button class="font-weight-bold"><img class="mr-2" width="15" height="auto" src="@/assets/img/svg/ticket.svg">BOOK TICKETS!</b-button>
                     </div>
                  </b-card>-->
                  <b-card
                    class="mb-3"
                    :class="cinema.CinemaID == 6 ? 'cinema-card-gold' : ''"
                    v-for="(cinema, cinemaKey) in cinemasList"
                    :header="cinema.CinemaName"
                    v-on:click="cinemaLocationHandler(cinema)"
                    :key="cinemaKey"
                  >
                    <!-- <p :class="langName == 'ar' ? 'ltr' : ''" class="mb-0">
                      {{ cinema.Tel }}
                    </p>
                    <p class="mb-0">{{ cinema.Email }}</p>
                    <p class="mb-0">{{ cinema.Address }}</p> -->

                    <div class="text-center mx-auto py-2">
                      <div
                        v-html="cinema.Address.replace(/\n/g, '<br />')"
                      ></div>
                    </div>
                    <!-- <p class="mb-0">then comes Cinema address line #2</p>
                    <p class="mb-0">address line #3</p>-->
                    <div
                      v-if="cinema.bookingopen == 1"
                      class="mt-3 mb-2 col-11 col-xl-10 mx-auto cus-br-cinema"
                    >
                      <b-button
                        v-if="preimere == true || preimere == 'true'"
                        class="btn btn-green font-weight-bold"
                        @click="
                          onClickBookingTicket(
                            cinema.CinemaID,
                            cinema.cinemashowdate
                          )
                        "
                        to="#"
                      >
                        <!-- :to="cinema.CinemaID == 6 ? {name:'LandingPage'} :  { name: 'browseByCinema',params:{cinemaId: cinema.CinemaID}}" -->
                        <img
                          class="mr-2"
                          width="15"
                          height="auto"
                          src="@/assets/img/svg/ticket-gold.svg"
                        />
                        {{ allLanguageData.BookTicket }}
                      </b-button>

                      <b-button
                        v-else-if="CountryID != 190 || CountryID != '190'"
                        @click="
                          onClickBookingTicket(
                            cinema.CinemaID,
                            cinema.cinemashowdate
                          )
                        "
                        class="btn btn-green font-weight-bold"
                        to="#"
                      >
                        <img
                          class="mr-2"
                          width="15"
                          height="auto"
                          src="@/assets/img/svg/ticket.svg"
                        />
                        {{ allLanguageData.BookTicket }}!
                      </b-button>
                    </div>
                  </b-card>
                </div>
              </div>
            </div>

            <div class="col-md-8 col-lg-8 col-xl-9 col-mt-3">
              <div class="map-box">
                <gmap-map
                  ref="gmap"
                  :center="center"
                  :zoom="7"
                  style="width: 100%; height: 100vh"
                >
                  <gmap-marker
                    :key="index"
                    v-for="(m, index) in markers"
                    :position="m.position"
                    @click="toggleInfoWindow(m, index)"
                  ></gmap-marker>

                  <gmap-info-window
                    :options="infoOptions"
                    :position="infoWindowPos"
                    :opened="infoWinOpen"
                    @closeclick="infoWinOpen = false"
                  >
                    <div v-html="infoContent"></div>
                  </gmap-info-window>
                </gmap-map>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { makeRequest } from '@/helper/internet.js'
import { parse } from 'querystring'
import { EventBus } from '@/main'

export default {
  name: 'bookByCinema',
  metaInfo: {
    title: 'Book By Cinema',
  },

  beforeCreate: function () {
    let pre = window.localStorage.getItem('PREIMERE')
    if (pre == null || pre == 'false' || pre == false) {
      document.body.className = 'img-section'
    } else {
      document.body.className = 'gold-black-bg'
    }
  },

  data () {
    return {
      cinemasList: [],
      center: {
        lat: 25.2048,
        lng: 55.2708,
      }, // {lat: 1.38, lng: 103.8},
      map: null,
      infoContent: '',
      infoWindowPos: {
        lat: 0,
        lng: 0,
      },
      infoWinOpen: false,
      currentMidx: null,
      // optional: offset infowindow so it visually sits nicely on top of our marker
      infoOptions: {
        pixelOffset: {
          width: 0,
          height: -35,
        },
      },
      markers: [
        {
          name: '',
          description: '',
          position: {},
        },
      ],
      preimere: false,
    }
  },
  beforeMount () {
    this.fetchCinemasList()
  },
  mounted () {
    this.preimere = window.localStorage.getItem('PREIMERE')
    this.$refs.gmap.$mapPromise.then(map => {
      const bounds = new google.maps.LatLngBounds()
      for (let m of this.markers) {
        bounds.extend(m.position)
      }
      map.fitBounds(bounds)
    })
  },
  methods: {
    onCancel: function () {
      this.$refs.contactModal.hide()
    },
    onClickBookingTicket: function (cinemaId, cinemaD) {
      if (cinemaId == 6 && this.preimere == 'false') {
        window.localStorage.setItem('PREIMERE', true)
        this.$router.push({
          name: 'LandingPage',
          params: { cinemaId: cinemaId },
        })
        window.location.reload()
      } else if (
        cinemaId == 7 &&
        (this.CountryID != 230 || this.CountryID != '230')
      ) {
        this.$refs.contactModal.show()
      } else {
        window.localStorage.setItem('cinemaD', cinemaD)
        this.$router.push({
          name: 'browseByCinema',
          params: { cinemaId: cinemaId },
        })
      }

      // if (cinemaId == 6) {
      //   window.localStorage.setItem("PREMIERE", true);
      // }
    },
    toggleInfoWindow: function (marker, idx) {
      this.infoWindowPos = marker.position
      this.infoContent = this.getInfoWindowContent(marker)

      // check if its the same marker that was selected if yes toggle
      if (this.currentMidx == idx) {
        this.infoWinOpen = !this.infoWinOpen
      } else {
        // if different marker set infowindow to open and reset current marker index
        this.infoWinOpen = true
        this.currentMidx = idx
      }
    },
    getInfoWindowContent: function (marker) {
      return `<div class="card">
              <div class="card-image">
              </div>
              <div class="card-content">
                <div class="media">
                  <div class="media-content">
                    <p class="title is-4">${marker.name}</p>
                  </div>
                </div>
                <div class="content">
                  ${marker.description}
                  <br>
                </div>
              </div>
            </div>`
    },
    fetchCinemasList: function () {
      let payload = {}
      // GetAllCinemasList
      makeRequest('/GetCinemas/', 'POST', null, payload)
        .then(result => {
          const { error, res } = result
          const { data } = res.data
          if (!error) {
            this.cinemasList = res.data.Data
            this.cinemasList.map((cinema, index) => {
              if (index == 0) {
                this.center = {
                  lat: parseInt(cinema.Latitude),
                  lng: parseInt(cinema.Longitude),
                }
              }
              this.markers.push({
                name: cinema.CinemaName,
                description: cinema.Address,
                position: {
                  lat: parseFloat(cinema.Latitude),
                  lng: parseFloat(cinema.Longitude),
                },
              })
            })
          }
        })
        .catch(error => {
          // console.log("Error on vue front", error);
        })
    },
    cinemaLocationHandler: function (cinema) {
      this.center = {
        lat: parseInt(cinema.Latitude),
        lng: parseInt(cinema.Longitude),
      }
    },
  },
}
</script>
