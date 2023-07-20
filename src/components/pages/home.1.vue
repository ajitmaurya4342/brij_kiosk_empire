<template>
  <div>

    <!-- MAIN SLIDER END-->
    <section class="container-fluid">
      <div class="col-12 col-md-11 px-0 mx-auto mt-3 mt-md-5">
        <div class="row mx-0 ">
          <div class="col-md-none col-lg-none  col-xl-4"></div>

          <div v-if="!show4dxData" class="col-md-4 col-xl-4 text-lg-left text-xl-center eTitle text-center">
            <img src="@/assets/img/svg/nowShowing-icon.svg" class="pr-2 pb-1">NOW SHOWING<span></span>
          </div>
          <div v-if="show4dxData" class="col-md-4 col-xl-4 text-lg-left text-xl-center eTitle eTitleTr"><img
              src="@/assets/img/svg/nowShowing-icon.svg" class="pr-2 pb-1">NOW SHOWING IN {{selectedExp}}</div>

          <div class="col-md-8 col-lg-8 col-xl-4">
            <ul class="list-inline mb-0 text-md-right text-center filter-list mt-3 mt-md-0">
              <li class="list-inline-item d-block d-md-inline font-weight-bold">FILTER BY</li>
              <li class="list-inline-item">
                <b-dropdown id="ddown1" text="GENRE" variant="none" class>
                  <b-dropdown-item
                  v-if="dropDowns.genre.list.length > 0"
                  v-for="(genre ,genreListIndex) in dropDowns.genre.list"
                  :key="genreListIndex"
                   v-on:click="filterData(genre, 'genre')"
                  >{{genre.Genre}}
                  </b-dropdown-item>
                  <!-- <b-dropdown-item>COMEDY</b-dropdown-item>
                  <b-dropdown-item>ACTION</b-dropdown-item>
                  <b-dropdown-item>DRAMA</b-dropdown-item> -->
                </b-dropdown>
              </li>
              <li class="list-inline-item">
                <b-dropdown id="ddown1" text="FORMAT" variant="none" class>
                  <b-dropdown-item
                  v-if="dropDowns.experience.list.length > 0"
                   v-for="(exp ,expListIndex) in dropDowns.experience.list"
                  :key="expListIndex"
                   v-on:click="filterData(exp, 'experience')"
                  >{{ exp.Metacritic }}
                  </b-dropdown-item>
                  <!-- <b-dropdown-item> 2D </b-dropdown-item>
                  <b-dropdown-item> 3D </b-dropdown-item>
                  <b-dropdown-item> 4D </b-dropdown-item>
                  <b-dropdown-item v-on:click="onselect()"> 4DX </b-dropdown-item> -->
                </b-dropdown>
              </li>
              <li class="list-inline-item cusFilter-drop">
                <b-dropdown id="ddown1" right text="LANGUAGE" variant="none" class>
                  <b-dropdown-item v-for="(lang ,languageListIndex) in dropDowns.languages.list"
                    :key="languageListIndex" v-on:click="filterData(lang, 'language')">{{lang.LanguageName}}
                  </b-dropdown-item>
                  <!-- <b-dropdown-item>ARABIC</b-dropdown-item>
                  <b-dropdown-item>ENGLISH</b-dropdown-item>
                  <b-dropdown-item>HINDI</b-dropdown-item>
                  <b-dropdown-item>MARATHI</b-dropdown-item> -->

                </b-dropdown>
              </li>
            </ul>
          </div>
        </div>
        <div>
          <img src="@/assets/img/svg/dotted-line.svg" class="w-100" alt="">
        </div>

        <div v-if="show4dxData" class="experience4d">
          <div>EXPERIENCE THESE FILMS IN <span class="font-weight-bold">4DX</span>, WITH</div>
          <div class="d-flex">
            <img src="@/assets/img/svg/icon-bubble.svg">
            <div class="font-weight-bold">BUBBLES</div>
          </div>

          <div class="d-flex">
            <img src="@/assets/img/svg/icon-wind.svg">
            <div class="font-weight-bold">WIND</div>
          </div>

          <div class="d-flex">
            <img src="@/assets/img/svg/icon-lightning.svg">
            <div class="font-weight-bold">LIGHTNING</div>
          </div>

          <div class="d-flex">
            <img src="@/assets/img/svg/icon-rain.svg">
            <div class="font-weight-bold">RAIN</div>
          </div>

          <div class="d-flex">
            <img src="@/assets/img/svg/icon-fog.svg" alt="">
            <div class="font-weight-bold">FOG</div>
          </div>

          <div class="d-flex">
            <img src="@/assets/img/svg/icon-scents.svg" alt="">
            <div class="font-weight-bold">SCENTS</div>
          </div>

          <div>
            <router-link to="#" class="text-white"> LEARN MORE</router-link>
          </div>

        </div>

        <div>

          <!-- <carousel-3d :display="9" :autoplay="false" :height="426" :width="300" :inverse-scaling="10" :space="220" :perspective="0" class="hp-slider">
            <slide :index="0">
              <div>
                <router-link to="/movie/29">
                  <img src="@/assets/img/captain-marvel.jpg" class="img-fluid" style="border-radius:15px;">
                </router-link>
              </div>
            </slide>

            <slide :index="1">
              <div>
                <router-link to="/movie/29">
                  <img src="@/assets/img/aladdin.jpg" class="img-fluid" style="border-radius:15px;">.
                </router-link>
              </div>
            </slide>

            <slide :index="2">
              <div>
                <router-link to="/movie/29">
                  <img src="@/assets/img/all-is-true.jpg" class="img-fluid" style="border-radius:15px;">
                </router-link>
              </div>
            </slide>

            <slide :index="3">
              <div>
                <router-link to="/movie/29">
                  <img src="@/assets/img/Avengers.jpg" class="img-fluid" style="border-radius:15px;">
                </router-link>
              </div>
            </slide>

            <slide :index="4">
              <div>
                <router-link to="/movie/29">
                  <img src="@/assets/img/captain-marvel.jpg" class="img-fluid" style="border-radius:15px;">
                </router-link>
              </div>
            </slide>

            <slide :index="5">
              <div>
                <router-link to="/movie/29">
                  <img src="@/assets/img/dumbo.jpg" class="img-fluid" style="border-radius:15px;">
                </router-link>
              </div>
            </slide>

            <slide :index="6">
              <div>
                <router-link to="/movie/29">
                  <img src="@/assets/img/godzilla.jpg" class="img-fluid" style="border-radius:15px;">
                </router-link>
              </div>
            </slide>

            <slide :index="7">
              <div>
                <router-link to="/movie/29">
                  <img src="@/assets/img/hustle.jpg" class="img-fluid" style="border-radius:15px;">
                </router-link>
              </div>
            </slide>

            <slide :index="8">
              <div>
                <router-link to="/movie/29">
                  <img src="@/assets/img/mr.link.jpg" class="img-fluid" style="border-radius:15px;">
                </router-link>
              </div>
            </slide>

            <slide :index="9">
              <div>
                <router-link to="/movie/29">
                  <img src="@/assets/img/pikachu.jpg" class="img-fluid" style="border-radius:15px;">
                </router-link>
              </div>
            </slide>

            <slide :index="10">
              <div>
                <router-link to="/movie/29">
                  <img src="@/assets/img/shazam.jpg" class="img-fluid" style="border-radius:15px;">
                </router-link>
              </div>
            </slide>

            <slide :index="11">
              <div>
                <router-link to="/movie/29">
                  <img src="@/assets/img/souvenier.jpg" class="img-fluid" style="border-radius:15px;">
                </router-link>
              </div>
            </slide>

            <slide :index="12">
              <div>
                <router-link to="/movie/29">
                  <img src="@/assets/img/the-beach-bum.jpg" class="img-fluid" style="border-radius:15px;">
                </router-link>
              </div>
            </slide>

            <slide :index="13">
              <div>
                <router-link to="/movie/29">
                  <img src="@/assets/img/tolkien.jpg" class="img-fluid" style="border-radius:15px;">
                </router-link>
              </div>
            </slide>

            <slide :index="14">
              <div>
                <router-link to="/movie/29">
                  <img src="@/assets/img/us.jpg" class="img-fluid" style="border-radius:15px;">
                </router-link>
              </div>
            </slide>

            <slide :index="15">
              <div>
                <router-link to="/movie/29">
                  <img src="@/assets/img/wonder-park.jpg" class="img-fluid" style="border-radius:15px;">
                </router-link>
              </div>
            </slide>

          </carousel-3d> -->

           <div v-if="visibleShows && nowShowingShows.show.length > 0">
             <!-- {{ visibleShows.show.length }} -->

           <carousel-3d  @after-slide-change="onAfterSlideChange" :display="9" :height="470" :width="330" :autoplay="false" :autoplayHoverPause="false" :controlsVisible="true"
            :inverse-scaling="10" :space="220" :perspective="0" class="hp-slider">

            <slide v-for="(singleShow, i) in visibleShows.show" :index="i" :key="i" style="border-radius:15px;">

                  <div>
                    <div class="">
                      <router-link class="movieDetails" :to="{ name: 'movieDetails', params: { movieId: singleShow.id }}">
                      <img :src="singleShow.movie_card_img" class="img-fluid" style="border-radius:15px;">
                      </router-link>
                    </div>
                    <div class="back backSite">
                      <img :src="singleShow.movie_card_img" class="img-fluid" style="border-radius:15px; position: relative">
                      <div class="card-container">

                        <div>
                          <p class="mb-0 title">{{singleShow.title}}</p>
                          <p class="text">
                          </p>
                        </div>

                        <div class="d-flex justify-content-around align-items-end flip-btns">
                          <button class="btn bookNow-btn"><img src="@/assets/img/svg/ticket-icon-red.svg" class="red" width="15px" height="15px">
                          <img src="@/assets/img/svg/ticket-icon-white.svg" class="white" width="15px" height="15px">BOOK NOW</button>
                          <div class="mx-1">&nbsp;</div>
                          <button class="btn bookNow-btn"><img src="@/assets/img/svg/small-play-iconRed.svg" class="red" width="15px" height="15px"><img src="@/assets/img/svg/small-play-icon.svg" class="white" width="15px" height="15px">TRAIER</button>
                        </div>

                      </div>
                    </div>
                  </div>
            </slide>
          </carousel-3d>
           </div>


          <!-- <div class="text-center text-white small mb-3">
            <span>AVENGERS: ENDGAME</span>
            <span>&bull;</span>
            <span class="badge badge-light">2D</span>
            <span class="badge badge-light">3D</span>
            <span>&bull;</span>
            <span>English</span>
          </div> -->
          <div class="text-center text-white small mb-3">
            <span>{{ currentMovieDetails.title }}</span>
            <span>&bull;</span>
            <span  v-for="(format, formatKey) in currentMovieDetails.format" :key="formatKey" class="badge badge-light">
              {{format}}</span>
            <!-- <span class="badge badge-light">3D</span> -->
            <span>&bull;</span>
            <span>{{currentMovieDetails.lang}}</span>
          </div>

          <!-- <div class="mb-0 s-movieName eTitle pb-3"><span class="font-weight-normal">2018</span>
            <ul class="list-inline d-inline">
              <li class="list-inline-item">Action</li>
              <li class="list-inline-item">Drama</li>
            </ul>
          </div> -->
        </div>
      </div>

    </section>
    <!-- MAIN SLIDER END-->


    <!-- QUICKBOOK -->
    <section class="bg-white d-none d-md-block">
      <QuickBook />
    </section>
    <!-- QUICKBOOK -->

    <!-- ADD SLIDER -->
    <section class="bg-white py-4 py-md-5">
      <div class="col-md-10 mx-auto">
        <slick :options="homeSlider">
          <div v-for="(homeSlider, a) in 5" :key="a">
            <img src="@/assets/img/ad-space.png" class="img-fluid w-100">
          </div>
        </slick>
      </div>
    </section>
    <!-- ADD SLIDER END -->

    <!-- LATEST RELEASES -->
    <section ref="latestMovie" class="container-fluid homeMovieSection bg-white pb-5" id="latestMovie">
      <div class="col-md-11 px-0 mx-auto">
        <p class="text-center eTitle text-dark">LATEST RELEASES</p>
        <div class="row mx-0">

          <!-- <div class="col-12 col-md-6 col-lg-4 col-xl-3 mb-3 pl-md-0 px-0 pr-md-3" v-for="(latestShow, index) in 8" :key="index">
            <div class="movieBox tras">
              <span class="font-weight-bold">NEW</span>
              <img src="@/assets/img/movie-box/avengers.jpg" class="img-fluid w-100 home-movie-img">
              <div class="content p-3 p-lg-2 p-xl-3">
                <div class="w-100">
                  <p class="mb-0">Avengers: Endgame</p>
                  <ul class="list-inline format-list">
                    <li class="list-inline-item">2D</li>
                    <li class="list-inline-item">English</li>
                  </ul>
                  <div class="d-flex justify-content-between align-items-center ">
                    <div>
                      <button class="btn btn-white font-weight-bold">BOOK NOW</button>
                    </div>
                    <a class="text-white float-right" data-fancybox
                      href="https://www.youtube.com/embed/TcMBFSGVi1c">WATCH TRAILER <img
                        src="@/assets/img/svg/small-play-icon.svg" class="pl-2" height="10px" whidth="20px"> </a>
                  </div>
                </div>
              </div>
            </div>
          </div> -->
          <div v-if="visibleShows && visibleShows.show.length > 0" class="col-12 col-md-6 col-lg-4 col-xl-3 mb-3 pl-md-0 px-0 pr-md-3" v-for="(latestShow, index) in visibleShows.show" :key="index">
            <div class="movieBox tras">
              <span class="font-weight-bold">NEW</span>
              <img :src="latestShow.movie_card_img" class="img-fluid w-100 home-movie-img">
              <div class="content p-3 p-lg-2 p-xl-3">
                <div class="w-100">
                  <p class="mb-0">{{ latestShow.title }}</p>
                  <ul class="list-inline format-list">
                    <li class="list-inline-item" v-for="(format, formatKey) in latestShow.format" :key="formatKey" >{{ format }}</li>
                    <li class="list-inline-item">{{ latestShow.lang }}</li>
                  </ul>
                  <div class="d-flex justify-content-between align-items-center ">
                    <div>
                      <button class="btn btn-white font-weight-bold">BOOK NOW</button>
                    </div>
                    <a class="text-white float-right" data-fancybox
                      :href="'https://www.youtube.com/embed/'+latestShow.Youtube">WATCH TRAILER <img
                        src="@/assets/img/svg/small-play-icon.svg" class="pl-2" height="10px" whidth="20px"> </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
        <p class="text-center loadBtn mb-0">
          <router-link to="#">VIEW ALL</router-link>
        </p>
      </div>
    </section>
    <!-- LATEST RELEASES END -->


    <!-- TRAILERS & VIDEOS -->
    <!-- <section class="container-fluid py-5 mvSection px-0">
      <div class="col-md-11 mx-auto">
        <p class="text-center eTitle">TRAILERS &amp; VIDEOS</p>
        <div class="row mx-0">
          <div class="col-md-4 order-2 order-md-1 text-center">
            <div class="leftVideoSlider" id="leftVideoSlider">
              <div class="mb-md-4 st-box"  v-for="(singleShow, i) in visibleShows.show" :index="i" :key="i" v-on:click="switchYoutubeURL(`https://www.youtube.com/embed/${singleShow.video[0]}?autoplay=1`)">
                <img :src="singleShow.movie_card_img" class="img-fluid st-img">
              </div>
            </div>
          </div>

          <div class="col-md-8 mb-4 mb-md-0 order-1 order-md-2">
            <div class="h-100 rightVideoSlider">
              <vue-friendly-iframe :src="currentYoutube"></vue-friendly-iframe>
            </div>
          </div>
        </div>
      </div>
    </section> -->
    <!-- TRAILERS & VIDEOS END -->



    <section class="container-fluid mvSection px-0 py-4 py-md-5">
      <div class="col-md-11 mx-auto">
        <p class="text-center eTitle">TRAILERS &amp; VIDEOS</p>
        <div class="row mx-0">
          <div class="col-md-4 order-2 order-md-1">
            <ul class="leftVideoSlider" id="leftVideoSlider">
              <!-- <li class="mt-3 mt-md-0 mb-md-4 st-box" v-for="(loop, key) in  5" :key="key" v-on:click="switchYoutubeURL('https://www.youtube.com/embed/VML6rQWssSk')">
                <div>
                  <img src="@/assets/img/video-img/wonder-park.jpg" class="img-fluid st-img"
                  v-bind:class="{ active: currentYoutube === 'https://www.youtube.com/embed/VML6rQWssSk' }">
                </div>
              </li> -->
              <li class="mt-3 mt-md-0 mb-md-4 st-box" v-for="(youtube, index) in  youTubeList" :key="index" v-on:click="switchYoutubeURL(youtube)">
                <div>
                  <img :src="youtube.Poster" class="img-fluid st-img"
                  v-bind:class="{ active: currentYoutube == 'https://www.youtube.com/embed/'+youtube.Link }">
                </div>
              </li>
            </ul>
          </div>

          <div class="col-md-8 order-1 order-md-2 ">
            <div class="h-100 rightVideoSlider">
              <vue-friendly-iframe :src="currentYoutube"></vue-friendly-iframe>
            </div>
          </div>
        </div>
      </div>
    </section>


     <!-- ADD SLIDER -->
    <section class="bg-white py-4 py-md-5">
      <div class="col-md-10 mx-auto">
        <slick :options="homeSlider">
          <div v-for="(homeSlider, a) in 5" :key="a">
            <img src="@/assets/img/ad-space.png" class="img-fluid w-100">
          </div>
        </slick>
      </div>
    </section>
    <!-- ADD SLIDER END -->


    <!-- COMING SOON -->
    <section class="container-fluid homeMovieSection bg-white pb-4 pb-md-5" id="comimgSoon">
      <div class="col-md-11 px-0 mx-auto">
        <p class="text-center eTitle text-dark">COMING SOON</p>
        <div class="row mx-0">
          <!-- <div class="col-12 col-md-6 col-lg-4 col-xl-3 mb-3 pl-md-0 px-0 pr-md-3" v-for="(loop , index) in 8" :key="index">
            <div class="movieBox tras">
              <span class="font-weight-bold">NEW</span>
              <img src="@/assets/img/movie-box/mr.link.jpg" class="img-fluid w-100 home-movie-img">
              <div class="content p-md-3 p-lg-2 p-xl-3">
                <div class="w-100">
                  <p class="mb-0 name">MISSING LINK</p>
                  <ul class="list-inline format-list">
                    <li class="list-inline-item">English</li>
                    <li class="list-inline-item">Sci-Fi</li>
                  </ul>
                  <div class="d-flex justify-content-between align-items-center ">
                    <a class="text-white float-right" data-fancybox
                      href="https://www.youtube.com/embed/-6jCNhebfg8">WATCH TRAILER <img
                        src="@/assets/img/svg/small-play-icon.svg" class="pl-2" height="10px" whidth="20px"> </a>
                  </div>
                </div>
              </div>
            </div>
          </div> -->
          <div v-if="comingSoonShows && comingSoonShows.show.length > 0" class="col-12 col-md-6 col-lg-4 col-xl-3 mb-3 pl-md-0 px-0 pr-md-3" v-for="(comingShow , index) in comingSoonShows.show" :key="index">
            <div class="movieBox tras">
              <span class="font-weight-bold">NEW</span>
              <img :src="comingShow.movie_card_img" class="img-fluid w-100 home-movie-img">
              <div class="content p-md-3 p-lg-2 p-xl-3">
                <div class="w-100">
                  <p class="mb-0 name">{{ comingShow.title }}</p>
                  <ul class="list-inline format-list">
                    <li class="list-inline-item">{{ comingShow.lang }}</li>
                    <li class="list-inline-item">Sci-Fi</li>
                  </ul>
                  <div class="d-flex justify-content-between align-items-center ">
                    <a class="text-white float-right" data-fancybox
                      :href="'https://www.youtube.com/embed/'+comingShow.Youtube">
                        WATCH TRAILER
                      <img src="@/assets/img/svg/small-play-icon.svg" class="pl-2" height="10px" whidth="20px">
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <p class="text-center loadBtn mb-0">
          <router-link to="#">VIEW ALL</router-link>
        </p>
      </div>
    </section>
    <!-- COMING SOON END -->

  </div>
</template>

<script>
import QuickBook from '@/components/partials/quickBook.vue'
import { makeRequest } from '@/helper/internet.js'

var VueScrollTo = require('vue-scrollto')

var options = {
  container: '#leftVideoSlider',
  easing: 'ease-in',
  offset: -100,
  force: true,
  cancelable: true,
  onStart: function (element) {
    // scrolling started
  },
  onDone: function (element) {
    // scrolling is done
  },
  onCancel: function () {
    // scrolling has been interrupted
  },
  x: false,
  y: true,
}
export default {
  components: {
    QuickBook,
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
      selectedExp: '',
      show4dxData: false,
      dropDowns: {
        languages: {
          selected: {
            LanguageName: 'All Languages',
          },
          list: [],
        },
        cinemaChain: {
          selected: {
            OrganizationName: 'All Cinemas',
          },
          list: [],
        },
        genre: {
          selected: {
            Genre: 'All Genre',
          },
          list: [],
        },
        experience: {
          selected: {
            ExperienceName: 'All Experience',
          },
          list: [],
        },
        // cities: {
        //   selected: {
        //     Title: "All Cities"
        //   },
        //   cities: {
        //     selected: {
        //       Title: "All Cities"
        //     },
        //     list: []
        //   }
        // }
      },
      shows: [],
      visibleShows: {
        show: [],
      },
      comingSoonShows: {
        show: [],
      },
      nowShowingShows: {
        show: [],
      },
      youTubeList: [],
      currentMovieDetails: [],
      currentPosition: 0,
      currentYoutube: 'https://www.youtube.com/embed/VML6rQWssSk',

      homeSlider: {
        arrows: false,
        slidesToShow: 1,
        // centerMode: true,
        centerPadding: '8.5%',
        slidesToScroll: 1,
        autoplay: true,
        dots: false,
        responsive: [
          {
            breakpoint: 1400,
            settings: {
              centerPadding: '8%',
            },
          },
          {
            breakpoint: 1024,
            settings: {
              centerPadding: '13%',
            },
          },
          {
            breakpoint: 600,
            settings: {
              centerPadding: '8%',
            },
          },
          {
            breakpoint: 480,
            settings: {
              centerPadding: '0%',
            },
          },
        ],
      },

      sliderFor: {
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        fade: true,
        dots: false,
        asNavFor: '.sliderNav',
      },

      sliderNav: {
        slidesToShow: 3,
        slidesToScroll: 2,
        asNavFor: '.sliderFor',
        dots: false,
        centerMode: true,
        verticalSwiping: true,
        draggble: true,
        vertical: true,
        arrows: true,
        focusOnSelect: true,
      },
    }
  },
  beforeMount () {
    this.getNowShowingData()
    this.getAllFilters()
    // this.getLanguages();
  },

  methods: {
    playTrailer: function () {
      this.$router.push('/https://www.youtube.com/watch?v=TcMBFSGVi1c')
    },
    onselect () {
      (this.selectedExp = '4DX'), (this.show4dxData = true)
    },
    switchYoutubeURL: function (movieObject) {
      // VueScrollTo.scrollTo(movieObject.ID, 500, options);
      // this.currentYoutube = movieObject;
      this.currentYoutube = `https://www.youtube.com/embed/${movieObject.Link}`
    },
    filterData: function (data, filter) {
      if (filter == 'language') {
        this.dropDowns.languages.selected = data
      }
      if (filter == 'genre') {
        this.dropDowns.genre.selected = data
      }
      if (filter == 'experience') {
        this.dropDowns.experience.selected = data
      }
      console.log('this.dropDowns :', this.dropDowns)
      this.getNowShowingData()
    },

    getAllFilters: function () {
      makeRequest('/GetAllFilter', 'POST', null, null)
        .then(response => {
          const { error, res } = response
          if (!error) {
            this.dropDowns.languages.list = []
            this.dropDowns.languages.list.push({
              LanguageName: 'All Languages',
            })
            if (res.data.List.Language.length > 0) {
              this.dropDowns.languages.list = this.dropDowns.languages.list.concat(
                res.data.List.Language
              )
            }
            this.dropDowns.genre.list = []
            this.dropDowns.genre.list.push({
              Genre: 'All Genre',
            })
            if (res.data.List.Genre.length > 0) {
              this.dropDowns.genre.list = this.dropDowns.genre.list.concat(
                res.data.List.Genre
              )
            }
            this.dropDowns.experience.list = []
            this.dropDowns.experience.list.push({
              Metacritic: 'All Experience',
            })
            if (res.data.List.Experince.length > 0) {
              this.dropDowns.experience.list = this.dropDowns.experience.list.concat(
                res.data.List.Experince
              )
            }
          } else {
            console.log('Response Error ')
          }
        })
        .catch(error => {
          console.log('Error', error)
        })
    },
    getNowShowingData: function () {
      let payload = {}
      // if(dropDowns.language.selected !="All Languages"){
      //   payload.LanguageID = dropDowns.selected.LanguageID;
      // }
      if (this.dropDowns.languages.selected.LanguageName != 'All Languages') {
        payload.MovieLanguageID = this.dropDowns.languages.selected.LanguageName
      }
      if (this.dropDowns.genre.selected.Genre != 'All Genre') {
        payload.Genre = this.dropDowns.genre.selected.Genre
      }
      if (
        this.dropDowns.experience.selected.ExperienceName != 'All Experience'
      ) {
        payload.Metacritic = this.dropDowns.experience.selected.Metacritic
      }
      makeRequest('/GetAllShow/', 'POST', null, payload)
        .then(response => {
          const { error, res } = response
          if (res.data.Status && res.data.Shows.length > 0) {
            this.shows = res.data.Shows
            let nowShowing = res.data.Shows.filter(x => x.cat_id == 1)
            let comingSoon = res.data.Shows.filter(x => x.cat_id == 2)
            // let artHouse = res.data.Shows.filter(x => x.cat_id == 3);
            // let publicScreening = res.data.Shows.filter(x => x.cat_id == 4);
            // let popUpScreening = res.data.Shows.filter(x => x.cat_id == 5);

            // this.shows.map(show => {
            //   show.show.map(x => {
            //     x.url = "/movie/" + x.id;
            //   });
            // });
            if (res.data.YouTubeList.length > 0) {
              this.youTubeList = res.data.YouTubeList
              this.currentYoutube = `https://www.youtube.com/embed/${
                this.youTubeList[0].Link
              }`
              //  `https://www.youtube.com/embed/${
              //   this.youTubeList[0].Link
              // }?autoplay=1`;
            }

            // Now Showing
            if (nowShowing.length > 0) {
              this.nowShowingShows = nowShowing[0]
            }
            if (comingSoon.length > 0) {
              this.comingSoonShows = comingSoon[0]
            }
            this.visibleShows = this.shows[0]
            this.onAfterSlideChange(0)
            // this.comingSoonShows = this.shows[1];
          }
        })
        .catch(error => {
          console.log('Error', error)
        })
    },
    onAfterSlideChange (index) {
      let payload = {
        MovieID: this.visibleShows.show[index].id,
      }
      makeRequest('/GetShowDetails/', 'POST', null, payload)
        .then(response => {
          const { error, res } = response
          if (res.data.Status) {
            this.currentMovieDetails = res.data.Show[0]
          } else {
            console.log('Response Error ')
          }
        })
        .catch(error => {
          console.log('Error', error)
        })
    },
  },
}
</script>
