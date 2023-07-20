<template>
  <div>
    <!--Start Banner Slider--->
    <section class="section-banner simple-banner">
      <slick
        v-if="cinemaLocationBanners.length > 0"
        ref="banner-slider"
        :options="bannerSlider"
      >
        <!-- <div class="w-100 banner-slider">
          <div class="banner-img">
            <div>
              <img src="@/assets/img/location-slider.jpg" alt class="image" />
            </div>
          </div>
        </div> -->

        <div
          v-for="(data, index) in cinemaLocationBanners"
          :key="index"
          class="w-100 banner-slider"
        >
          <div class="banner-img">
            <div>
              <img
                :src="checkBaseUrl(data)"
                class="image"
              />
            </div>
          </div>
        </div>
      </slick>
    </section>
    <!--End Banner Slider--->
    <div class="container px-lg-0 pt-lg-3 mb-5">
      <div class="cinema-accordion offer-accordion my-4">
        <div v-b-toggle.menu-1 variant="info" class="accordion-title">
          <div class="main-heading">
            <div>
              <hr class="primary-line" />
            </div>
            <div class="title">{{ header }}</div>
            <!-- <div class="sub-titles pl-1">LOCATION</div> -->
          </div>
        </div>
        <b-collapse id="menu-1" visible>
          <div class="content mb-5">
            <div class="content-title my-3">{{ header1 }}</div>
            <div class="content-desc">
              {{ description }}
            </div>
            <div class="location-tabs mt-4">
              <b-tabs>
                <b-tab
                  class="mt-4 pt-lg-2"
                  v-for="(cinema, index) in getBrijCinemas"
                  :key="index"
                >
                  <template #title>
                    <div @click="GetLocationData(cinema)" class="tab-img">
                      <img
                        :src="checkBaseUrl(cinema.cine_image_url)"
                        class="loc-img"
                      />
                    </div>
                    <div class="tab-title pt-2">
                      {{ getCinemaTranslatedData(cinema) }}
                    </div>
                  </template>
                </b-tab>
              </b-tabs>
            </div>
            <div
              v-if="getBrijCinemas.length > 0"
              class="tab-content row mx-0 cine-addr"
            >
              <div class="col-md-6 col-lg-4 mx-0 px-0 addr-loc">
                <div class="pt-2 pt-lg-5 px-4 pb-4">
                  <div class="text-center mb-4 pt-3">
                    <img
                      src="@/assets/img/new-img/svg-img/quote.svg"
                      width="50px"
                    />
                  </div>
                  <div class="name text-center pb-2">
                    {{ CName }}
                  </div>
                  <div class="desc mb-5 pb-4 px-5">
                    <div class="pb-2">
                      {{ CAddress }}
                    </div>
                    <!-- {{ data.Phone }} -->
                    <!-- <div>To get touch, please call {{ CPhone }}</div> -->
                  </div>
                  <div
                    class="
                      text-center
                      addr-direction
                      d-flex
                      align-items-center
                      justify-content-center
                    "
                  >
                    <button
                      class="btn addr-btn"
                      v-bind:class="langName == 'ar' ? 'ml-2' : 'mr-3'"
                      @click="addrloc('map')"
                    >
                      {{ allLanguageData.GetDir }}
                    </button>
                    <button
                      class="btn addr-btn"
                      @click="addrloc('video')"
                      v-if="CountryID != 102 || CountryID != '102'"
                    >
                      {{ allLanguageData.View360 }}
                    </button>
                  </div>
                </div>
              </div>
              <div class="col-md-6 col-lg-8 mx-0 px-0 addr-map">
                <div v-if="setMap == true">
                  <iframe
                    :key="gmap_url"
                    class="gmap_iframe"
                    width="100%"
                    frameborder="0"
                    scrolling="no"
                    marginheight="0"
                    marginwidth="0"
                    height="400px"
                    :src="gmap_url"
                  ></iframe>
                </div>
                <div v-if="setMap == true && false">
                  <!-- <gmap-map
                    ref="gmap"
                    :center="center"
                    :zoom="7"
                    style="width: 100%; height: 63vh"
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
                  </gmap-map> -->
                  <iframe
                    class="gmap_iframe"
                    width="100%"
                    frameborder="0"
                    scrolling="no"
                    marginheight="0"
                    marginwidth="0"
                    height="400px"
                    v-if="CId == 4"
                    src="https://maps.google.com/maps?width=760&amp;height=454&amp;hl=en&amp;q=Abha, 'Asir Region, Saudi Arabia&amp;t=&amp;z=20&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
                  ></iframe>
                  <iframe
                    class="gmap_iframe"
                    width="100%"
                    frameborder="0"
                    scrolling="no"
                    marginheight="0"
                    marginwidth="0"
                    height="400px"
                    v-if="CId == 3"
                    src="https://maps.google.com/maps?width=760&amp;height=454&amp;hl=en&amp;q=Jazan, Jazan Region, 45142, Saudi Arabia&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
                  ></iframe>
                  <iframe
                    class="gmap_iframe"
                    width="100%"
                    frameborder="0"
                    scrolling="no"
                    marginheight="0"
                    marginwidth="0"
                    height="400px"
                    v-if="CId == 5"
                    src="https://maps.google.com/maps?width=760&amp;height=454&amp;hl=en&amp;q=Jeddah, Makkah Region, Saudi Arabia&amp;t=&amp;z=20&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
                  ></iframe>

                  <!-- <iframe
                    v-if="CId == 8"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3539.839937030769!2d41.679613715010085!3d27.47424208288909!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x157647563aaa0231%3A0xb984807c68286c8c!2sKing%20Saud%20Rd%2C%20An%20Nuqrah%2C%20Hail%20Saudi%20Arabia!5e0!3m2!1sen!2sin!4v1639051171227!5m2!1sen!2sin"
                    width="100%"
                    height="450"
                    style="border: 0"
                    allowfullscreen=""
                    loading="lazy"
                  ></iframe> -->
                  <!-- <iframe
                    v-if="CId == 8"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3539.839937030769!2d41.679613715010085!3d27.47424208288909!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x157647563aaa0231%3A0xb984807c68286c8c!2sKing%20Saud%20Rd%2C%20An%20Nuqrah%2C%20Hail%20Saudi%20Arabia!5e0!3m2!1sen!2sin!4v1639123555637!5m2!1sen!2sin"
                    width="100%"
                    height="450"
                    style="border: 0"
                    allowfullscreen=""
                    loading="lazy"
                  ></iframe> -->
                  <iframe
                    v-if="CId == 8"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1769.9199685153844!2d41.680708056344926!3d27.474242082889095!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x157647563aaa0231%3A0xb984807c68286c8c!2sKing%20Saud%20Rd%2C%20An%20Nuqrah%2C%20Hail%20Saudi%20Arabia!5e0!3m2!1sen!2sin!4v1639131290408!5m2!1sen!2sin"
                    width="100%"
                    height="450"
                    style="border: 0"
                    allowfullscreen=""
                    loading="lazy"
                  ></iframe>
                  <!-- <iframe
                                      v-if="CId == 8"

                    width="100%"
                    height="450"
                    frameborder="0"
                    scrolling="no"
                    marginheight="0"
                    marginwidth="0"
                    src="https://maps.google.com/maps?q=27.523647,41.696632&hl=es&z=14&amp;output=embed"
                  >
                  </iframe> -->

                  <iframe
                    class="gmap_iframe"
                    width="100%"
                    frameborder="0"
                    scrolling="no"
                    marginheight="0"
                    marginwidth="0"
                    height="400px"
                    v-if="CId == 7 && CountryID != '102'"
                    src="https://maps.google.com/maps?width=760&amp;height=454&amp;hl=en&amp;q=Khobar , Eastern Region, Saudi Arabia&amp;t=&amp;z=18&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
                  ></iframe>

                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13687.19969376503!2d40.99897408170473!3d30.948152004999475!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x156c1265ba83b8a1%3A0x24ca9f52a7b9cc17!2sAljawharah%2C%20Arar%2073551%2C%20Saudi%20Arabia!5e0!3m2!1sen!2sin!4v1646301801586!5m2!1sen!2sin"
                    width="100%"
                    height="450"
                    style="border: 0"
                    allowfullscreen=""
                    loading="lazy"
                    v-if="CId == 10"
                  ></iframe>
                  <iframe
                    class="gmap_iframe"
                    width="100%"
                    frameborder="0"
                    scrolling="no"
                    marginheight="0"
                    marginwidth="0"
                    height="450"
                    v-if="CId == 7 && CountryID == '102'"
                    src="https://maps.google.com/maps?width=600&amp;height=400&amp;hl=en&amp;q=Family Mall -100Erbil&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
                  ></iframe>
                </div>
                <!-- :src="data.view_url" -->
                <div v-if="setVideo == true">
                  <iframe
                    :key="CName"
                    width="100%"
                    height="400px"
                    frameborder="0"
                    :src="C360URL"
                    allowfullscreen
                  ></iframe>
                </div>
              </div>
            </div>
          </div>
        </b-collapse>
      </div>

      <!-- <div class="cinema-accordion my-4">
        <div v-b-toggle.combo variant="info" class="accordion-title">
          <div class="main-heading">
            <div>
              <hr class="primary-line" />
            </div>
            <div class="title">LEBANON -</div>
            <div class="sub-titles pl-1">LOCATION</div>
          </div>
        </div>
        <b-collapse id="combo">
          <div class="content mb-5">
            <div class="content-title my-3">ENJOY THE PLACE</div>
            <div class="content-desc">
              Lorem Ipsum has been the industry's standard dummy text ever since
              the 1500s, when an unknown printer took a galley of type and
              scrambled it to make a type specimen book. It has survived not
              only five centuries, but also the leap into electronic
              typesetting, remaining essentially unchanged. It was popularised
              in the 1960s with the release of Letraset sheets containing Lorem
              Ipsum passages, and more recently with desktop publishing software
              like Aldus PageMaker including versions of Lorem Ipsum.
            </div>
            <div class="location-tabs mt-4">
              <b-tabs>
                <b-tab
                  class="mt-4 pt-2"
                  v-for="(index, data) in 6"
                  :key="index"
                >
                  <template #title>
                    <div class="tab-img">
                      <img
                        src="@/assets/img/new-img/png-img/cinema-loc.png"
                        class="loc-img"
                      />
                    </div>
                    <div class="tab-title pt-2">
                      {{ tabsdata[index - 1] }}
                    </div>
                  </template>
                  <div class="tab-content row mx-0 cine-addr">
                    <div class="col-md-4 mx-0 px-0 addr-loc">
                      <div class="pt-2 pt-lg-5 px-5 pb-4">
                        <div class="text-center mb-4 pt-3">
                          <img
                            src="@/assets/img/new-img/svg-img/quote.svg"
                            width="50px"
                          />
                        </div>
                        <div class="name text-center pb-2">
                          AlRASHID MALL - JAZAN
                        </div>
                        <div class="desc mb-5 pb-4 px-5">
                          <div class="pb-2">
                            Level 2, AlRashid Mall Prince Mohammad bin Nader
                            road, Jazan 82723 Saudi Arabia
                          </div>
                          <div>To get touch, please call 9200000000000</div>
                        </div>
                        <div class="text-center addr-direction">
                          <button class="btn addr-btn px-4">
                            Get Direction
                          </button>
                        </div>
                      </div>
                    </div>
                    <div class="col-md-8 mx-0 px-0 addr-map">
                      <img
                        src="@/assets/img/new-img/png-img/map.png"
                        class="image"
                      />
                    </div>
                  </div>
                </b-tab>
              </b-tabs>
            </div>
          </div>
        </b-collapse>
      </div> -->
      <!-- <div class="cinema-accordion my-4">
        <div v-b-toggle.location-3 variant="info" class="accordion-title">
          <div class="main-heading">
            <div>
              <hr class="primary-line" />
            </div>
            <div class="title">IRAQ -</div>
            <div class="sub-titles pl-1">LOCATION</div>
          </div>
        </div>
        <b-collapse
          id="location-3"
          accordion="cinema-accordion"
          role="tabpanel"
        >
          <div class="content mb-5">
            <div class="content-title my-3">ENJOY THE PLACE</div>
            <div class="content-desc">
              Lorem Ipsum has been the industry's standard dummy text ever since
              the 1500s, when an unknown printer took a galley of type and
              scrambled it to make a type specimen book. It has survived not
              only five centuries, but also the leap into electronic
              typesetting, remaining essentially unchanged. It was popularised
              in the 1960s with the release of Letraset sheets containing Lorem
              Ipsum passages, and more recently with desktop publishing software
              like Aldus PageMaker including versions of Lorem Ipsum.
            </div>
            <div class="location-tabs mt-4">
              <b-tabs>
                <b-tab
                  class="mt-4 pt-2"
                  v-for="(index, data) in 6"
                  :key="index"
                >
                  <template #title>
                    <div class="tab-img">
                      <img
                        src="@/assets/img/new-img/png-img/cinema-loc.png"
                        class="loc-img"
                      />
                    </div>
                    <div class="tab-title pt-2">
                      {{ tabsdata[index - 1] }}
                    </div>
                  </template>
                  <div class="tab-content row mx-0 cine-addr">
                    <div class="col-md-4 mx-0 px-0 addr-loc">
                      <div class="pt-2 pt-lg-5 px-5 pb-4">
                        <div class="text-center mb-4 pt-3">
                          <img
                            src="@/assets/img/new-img/svg-img/quote.svg"
                            width="50px"
                          />
                        </div>
                        <div class="name text-center pb-2">
                          AlRASHID MALL - JAZAN
                        </div>
                        <div class="desc mb-5 pb-4 px-5">
                          <div class="pb-2">
                            Level 2, AlRashid Mall Prince Mohammad bin Nader
                            road, Jazan 82723 Saudi Arabia
                          </div>
                          <div>To get touch, please call 9200000000000</div>
                        </div>
                        <div class="text-center addr-direction">
                          <button class="btn addr-btn px-4">
                            Get Direction
                          </button>
                        </div>
                      </div>
                    </div>
                    <div class="col-md-8 mx-0 px-0 addr-map">
                      <img
                        src="@/assets/img/new-img/png-img/map.png"
                        class="image"
                      />
                    </div>
                  </div>
                </b-tab>
              </b-tabs>
            </div>
          </div>
        </b-collapse>
      </div> -->
    </div>
  </div>
</template>
<script>
import { makeRequest, makeRequestBrij } from '@/helper/internet.js'
import { mapState, mapGetters, mapActions } from 'vuex'
import {
  LanguageService,
  CountryService,
  TokenService,
} from '@/services/storage.service'
import { error } from 'util'
import { metaInfo, URL_BASE } from '@/helper/constant.js'
export default {
  data () {
    return {
      C360URL: '',
      gmap_url: '',
      CName: '',
      CId: '',
      CAddress: '',
      CPhone: '',
      description: '',
      header: '',
      header1: '',
      URL_BASE: URL_BASE + '/',
      cinemaLocationBanners: [],
      setMap: true,
      setVideo: false,
      bannerSlider: {
        arrows: false,
        dots: true,
        infinite: true,
        slidesToScroll: 1,
        slidesToShow: 1,
        autoplay: true,
        autoplaySpeed: 2000,
      },
      tabsdata: ['JAZAN', 'ABHA', 'JEDDAH', 'KHURES', 'RIYADH', 'DAMAM' ],
      cinemaList: [],
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
      pagesList: [],
    }
  },
  computed: {
    getBrijCinemas () {
      return this.$store.getters.getBrijCinemas
    },
  },
  beforeCreate: function () {
    document.body.className = 'light-section'
  },
  mounted () {
    // window.scrollTo({
    //   top: 100,
    //   left: 100,
    //   behavior: "smooth"
    // });
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

    this.$refs.gmap && this.$refs.gmap.$mapPromise.then((map) => {
      const bounds = new google.maps.LatLngBounds()
      for (let m of this.markers) {
        bounds.extend(m.position)
      }
      map.fitBounds(bounds)
    })
  },
  beforeMount () {
    this.hideLoading()
    this.showLoading()

    this.$store.dispatch('fetchBrijCinemasAndCountries')
      .then(() => Promise.resolve())
      .then(() => {
        this.getBrijCinemas.map((cinema, index) => {
          let center = {
            lat: parseFloat(cinema.cinema_latitude),
            lng: parseFloat(cinema.cinema_longitude),
          }
          let marker = {
            name: this.getCinemaTranslatedData(cinema),
            description: this.getCinemaTranslatedData(cinema, 'cinema_address'),
            position: {
              lat: parseFloat(cinema.cinema_latitude),
              lng: parseFloat(cinema.cinema_longitude),
            },
          }

          if (index == 0) this.center = center
          this.markers.push(marker)
        })

        if (this.getBrijCinemas.length > 0) {
          this.GetLocationData(this.getBrijCinemas[0])
        }
      })
      .finally(() => {
        this.hideLoading()
      })
    // this.fetchCinemaBanners()
    this.getListOfPages()
    // this.fetchCinemaList()
  },
  methods: {
    getCinemaTranslatedData (cinema, attr = 'cinema_name') {
      if (!cinema) return ''

      let name = this.getLangSpecificAttribute(
        cinema.translation_data || [],
        this.getCurrentLang().brij_lang_id,
        attr || 'cinema_name',
        'langaugeId',
      ) || cinema.cinema_name

      return name
    },
    GetLocationData (data) {
      if (data) {
        this.CName = this.getCinemaTranslatedData(data)
        this.CId = data.cinema_id || data.CinemaID
        this.CAddress = this.getCinemaTranslatedData(data, 'cinema_address')
        this.CPhone = data.cinema_phone_number || data.Phone
        this.C360URL = data.view_url
        this.gmap_url = data.gmap_url
      }
    },
    getListOfPages () {
      const pagesFunction = async () => {
        try {
          let payload = {
            mpm_name: 'branches',
            mpm_lang_id: this.getCurrentLang().brij_lang_id
          }
          let response = await makeRequestBrij(
            `/api/admin/list-of-pages?mpm_name=${payload.mpm_name}&mpm_lang_id=${payload.mpm_lang_id}`,
            'GET',
            null,
            null
          )
          const { error, res } = response

          if (res.data.status) {
            let { data } = res
            let records = data.Records
            let newRecords = []
            records.map((x, index) => {
              let get_index = newRecords.findIndex(y => {
                return y.main_name == x.mpm_name
              })
              console.log({ get_index })
              if (get_index < 0) {
                let obj = {
                  mpm_id: x.mpm_id,
                  main_name: x.mpm_name,
                  lang_id: x.mpm_lang_id,
                  banner: x.mpm_banner,
                  status: x.is_active,
                  otherData: [
                    {
                      mpm_d_id: x.mpm_d_id,
                      main_name: x.mpm_d_main_name,
                      header_name: x.mpm_d_header_name,
                      description: x.mpm_d_description,
                      images: x.mpm_d_images,
                      cover_image: x.mpm_d_cover_image,
                      o_status: x.mpm_d_is_active
                    }
                  ]
                }
                newRecords.push(obj)
              } else {
                let obj = {
                  mpm_d_id: x.mpm_d_id,
                  main_name: x.mpm_d_main_name,
                  header_name: x.mpm_d_header_name,
                  description: x.mpm_d_description,
                  images: x.mpm_d_images,
                  cover_image: x.mpm_d_cover_image,
                  o_status: x.mpm_d_is_active
                }
                newRecords[get_index].otherData.push(obj)
              }
            })
            console.log('newRecords', newRecords)
            this.pagesList = newRecords
            this.cinemaLocationBanners = this.getSafe(() => this.pagesList[0], { banner: '' }).banner.split(',')
            let otherData = this.getSafe(() => this.pagesList[0].otherData[0], {})

            this.header = otherData.main_name
            this.header1 = otherData.header_name
            this.description = otherData.description
          }
        } catch (error) {
          console.log('getPagesList', { error })
        }
      }
      pagesFunction()
    },
    fetchCinemaBanners () {
      let payload = {
        PageName: 'branches',
      }

      makeRequest('/PageData/', 'POST', null, payload)
        .then((response) => {
          const { error, res } = response // console.log("Show details", res);

          this.hideLoading()
          console.log(res.data, 'uu')
          if (res.data.hasOwnProperty('banner') && res.data.banner.length > 0) {
            this.cinemaLocationBanners = res.data.banner
          }

          // if (res.data.hasOwnProperty("data") && res.data.data.length > 0) {
          //   this.menuDataArray = res.data.data;
          // }

          if (res.data.hasOwnProperty('data') && res.data.data.length > 0) {
            this.header = res.data.data[0].header
            this.header1 = res.data.data[0].header1
            this.description = res.data.data[0].description
          }

          this.hideLoading()
          console.log('jitu')
        })
        .catch((error) => {
          this.hideLoading()
          console.log('Error', error)
        })
    },
    fetchCinemaList: function () {
      this.showLoading()
      makeRequest('/GetCinemas', 'POST', null, null)
        .then((result) => {
          const { error, res } = result
          const { data } = res.data
          if (res.data) {
            this.hideLoading()
            if (
              res.data.hasOwnProperty('Categories') &&
              res.data.Categories.length > 0
            ) {
              this.cinemaList = res.data.Categories
              this.cinemaList.map((cinema, index) => {
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

              if (this.cinemaList.length > 0) {
                this.GetLocationData(this.cinemaList[0])
              }
            }

            // if (window.localStorage.getItem("headerCinemaID")) {
            //   let hederCineId = window.localStorage.getItem("headerCinemaID");
            //   let selectedCineAry = this.cinemaList.filter(x => {
            //     return x.CinemaID == hederCineId;
            //   });
            //   if (selectedCineAry.length > 0) {
            //     this.selectedCinemaValues = selectedCineAry;
            //   }
            // }
          }
          this.hideLoading()
        })
        .catch((error) => {
          this.hideLoading()
          console.log('Error on vue front', error)
        })
    },
    // fetchCinemaList: function() {
    //   makeRequest("/GetCinemas", "POST", null, null)
    //     .then(result => {
    //       const { error, res } = result;
    //       const { data } = res.data;
    //       if (res.data) {
    //         if (
    //           res.data.hasOwnProperty("Categories") &&
    //           res.data.Categories.length > 0
    //         ) {
    //           this.cinemaList = res.data.Categories;
    //           this.cinemaList.map((cinema, index) => {
    //             if (index == 0) {
    //               this.center = {
    //                 lat: parseInt(cinema.Latitude),
    //                 lng: parseInt(cinema.Longitude)
    //               };
    //             }
    //             this.markers.push({
    //               name: cinema.CinemaName,
    //               description: cinema.Address,
    //               position: {
    //                 lat: parseFloat(cinema.Latitude),
    //                 lng: parseFloat(cinema.Longitude)
    //               }
    //             });
    //           });
    //         }

    //         // if (window.localStorage.getItem("headerCinemaID")) {
    //         //   let hederCineId = window.localStorage.getItem("headerCinemaID");
    //         //   let selectedCineAry = this.cinemaList.filter(x => {
    //         //     return x.CinemaID == hederCineId;
    //         //   });
    //         //   if (selectedCineAry.length > 0) {
    //         //     this.selectedCinemaValues = selectedCineAry;
    //         //   }
    //         // }
    //       }
    //     })
    //     .catch(error => {
    //       console.log("Error on vue front", error);
    //     });
    // },
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
    addrloc (data) {
      if (data === 'map') {
        this.setVideo = false
        this.setMap = true
      } else {
        this.setMap = false
        this.setVideo = true
      }
      console.log(this.cinemaList, 'uyiu')
    },
  },
}
</script>
<style>
.cinema-accordion .title,
.cinema-accordion .sub-titles {
  font-size: 18px;
}

.cinema-accordion .tab-title {
  font-weight: bold;
  font-size: 11px;
  color: #000;
  text-align: center;
  text-transform: uppercase;
}
.cinema-accordion .accordion-title {
  cursor: pointer;
}
.cinema-accordion .tab-img {
  filter: grayscale(1);
}
.cinema-accordion .tab-img:not(:last-child) {
  padding-right: 05px;
}
.cinema-accordion .nav-link.active .tab-img {
  filter: grayscale(0);
}
.cinema-accordion .nav-link.active .tab-title {
  color: #ce1f2e;
}
.cinema-accordion .nav-link {
  padding: 0 0 10px 0;
  border: 1px solid #fff;
}
.cinema-accordion .nav-tabs {
  border-bottom: 1px solid #fff;
  display: flex;
  flex-wrap: nowrap;
  overflow-x: auto;
  overflow-y: hidden;
}
.cinema-accordion .nav-tabs .nav-link.active,
.cinema-accordion .nav-tabs .nav-item.show .nav-link,
.cinema-accordion .nav-tabs .nav-link:hover,
.cinema-accordion .nav-tabs .nav-link:focus {
  border-color: #fff;
}
.cinema-accordion .cine-addr .addr-loc {
  background-color: #e5e6e7;
}
.cinema-accordion .cine-addr .name {
  color: #434345;
  font-weight: bold;
  font-size: 21px;
}
.cinema-accordion .addr-map {
  background-color: #f8f9fa;
}
.cinema-accordion .addr-map .image {
  height: 100%;
  width: 100%;
}
.cinema-accordion .loc-img {
  width: 278px;
}
.cinema-accordion .cine-addr .desc {
  text-align: center;
  font-weight: 600;
  font-size: 13px;
}
.cinema-accordion .cine-addr .addr-btn {
  background-color: #ce1f2e;
  color: #fff;
  text-transform: uppercase;
  font-weight: 500;
  font-size: 13px;
  /* width: 140px; */
  border-radius: 0px;
  /* position: absolute;
  bottom: 05%;
  transform: translate(-50%, -50%); */
}

.cinema-accordion .accordion-title[aria-expanded="true"] .sub-titles {
  color: #ce1f2e;
  font-weight: bold;
}
</style>
