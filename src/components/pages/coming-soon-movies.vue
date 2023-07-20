<template>
  <div>
    <section class="container-fluid">
      <div class="col-12 col-md-11 px-0 mx-auto">
        <div class="my-4 text-center cus-list">
          <p
            v-if="preimere == true || preimere == 'true'"
            class="eTitle eTitlewhite eTitleblack mb-0"
          >
            <img
              src="@/assets/img/svg/nowShowing-icon-gold.svg"
              height="auto"
              width="35px"
              class="pr-2 pb-1"
            />
            {{allLanguageData.ComingSoon}}
          </p>
          <p v-else class="eTitle eTitlewhite eTitleblack mb-0">
            <img src="@/assets/img/svg/nowShowing-icon.svg" class="pr-2 pb-1" />
            {{allLanguageData.ComingSoon}}
          </p>
        </div>

        <div class="blackdotline-box whitedotline-box">
          <hr class="white-dotline black-dotline" />
        </div>

        <div
          v-if="preimere == true || preimere == 'true'"
          class="text-center col-12 col-md-4 col-lg-3 col-xl-2 mx-auto browse-cinema"
        >
          <div class="row">
            <!-- MOVIE -->
            <div class="col-12 col-md">
              <b-dropdown
                id="ddown1"
                :text="selectedDropDown"
                variant="default"
                class="emp-dropdown"
              >
                <b-dropdown-item
                  v-for="(dd, ddKey) in dropDown"
                  v-on:click="onSelectDropDown(dd)"
                  :key="ddKey"
                >{{ dd }}</b-dropdown-item>
                <!-- <b-dropdown-item>salsalskalks</b-dropdown-item>
                <b-dropdown-item>qqqqq</b-dropdown-item>-->
              </b-dropdown>
            </div>
          </div>
        </div>

        <div
          v-if="preimere == false || preimere == 'false'"
          class="text-center col-12 col-md-4 col-lg-3 col-xl-2 mx-auto browse-cinema"
        >
          <div class="row">
            <!-- MOVIE -->
            <div class="col-12 col-md">
              <b-dropdown
                id="ddown1"
                :text="selectedDropDownNormal"
                variant="default"
                class="emp-dropdown"
              >
                <b-dropdown-item
                  v-for="(dd, ddKey) in dropDownNormal"
                  v-on:click="onSelectDropDownNormal(dd)"
                  :key="ddKey"
                >{{ dd }}</b-dropdown-item>
                <!-- <b-dropdown-item>salsalskalks</b-dropdown-item>
                <b-dropdown-item>qqqqq</b-dropdown-item>-->
              </b-dropdown>
            </div>
          </div>
        </div>
      </div>

      <div
        v-if="nowShowingMovies.length > 0 && selectedDropDown == 'Movies' && selectedDropDownNormal!='GERMAN FILM WEEK'"
      >
        <div
          class="col-12 col-md-11 col-lg-11 col-xl-8 mx-auto my-4 my-lg-5"
          v-for="(showtimeDiv, z) in nowShowingMoviesList"
          :key="z"
        >
          <div class="row">
            <div class="col-md-4 align-self-center pl-0">
              <!-- <div class="h-100"> -->
              <img :src="showtimeDiv.movie_card_img" class="img-fluid w-100 br-movie-img" />
              <div v-if="showtimeDiv.IsNew" class="new-movies">
                <span>NEW</span>
              </div>
              <div class="new-movies" v-else-if="showtimeDiv.tag=='Advance Booking'">
                <span>{{showtimeDiv.tag}}</span>
              </div>

              <!-- </div> -->
            </div>

            <div class="col-md-8 align-self-start">
              <div
                class="d-flex justify-content-sm-between justify-content-xl-around flex-column h-100"
              >
                <div class="brCinema pb-2 mb-lg-0 mt-4 mt-md-0">
                  <p class="eTitle eTitleblack mb-0">{{ showtimeDiv.title }}</p>
                  <span class="yr">
                    <span class="eTitleNew">{{ allLanguageData.Releasing }}:</span>
                    {{ showtimeDiv.release }}
                  </span>
                  <ul class="list-inline d-inline">
                    <li class="list-inline-item">{{ showtimeDiv.genre }}</li>
                    <!-- <li class="list-inline-item">Drama</li> -->
                  </ul>
                </div>

                <div
                  v-if="(CountryID!=190 || CountryID!='190') && showtimeDiv.tag=='Advance Booking'"
                  class="col-6 col-md-3 col-lg-3 px-0"
                >
                  <b-button
                    variant="default"
                    :class="preimere == 'true' ? 'btn-proceed':'btn-green'"
                    class="btn mt-3 mb-3"
                    @click="onClickBookNow(showtimeDiv)"
                  >Book Now</b-button>
                </div>

                <p class="pt-2 eTitle eTitleblack mb-0">{{allLanguageData.Synopsis}}</p>
                <div>
                  <div
                    :class="showtimeDiv.showDiv==false?'eTitle font-weight-normal pt-2 ellipsis':'eTitle font-weight-normal pt-2'"
                  >{{ showtimeDiv.plot }}</div>
                </div>
                <div v-if="showtimeDiv.plot.length>250">
                  <a
                    @click="removeclassTitle(z)"
                    style="color:#fff;cursor:pointer;"
                    class="eTitle"
                  >Read {{showtimeDiv.showDiv==false?'more':'less'}}</a>
                </div>

                <p class="pt-2 eTitle eTitleblack mb-0">{{allLanguageData.Rated}}</p>
                <div class="eTitle font-weight-normal pt-2">{{ showtimeDiv.Rated }}</div>

                <p class="pt-2 eTitle eTitleblack mb-0">{{allLanguageData.Actors}}</p>
                <div class="eTitle font-weight-normal pt-2">{{ showtimeDiv.Actors }}</div>

                <p class="pt-2 eTitle eTitleblack mb-0">{{allLanguageData.Director}}</p>
                <div class="eTitle font-weight-normal pt-2">{{ showtimeDiv.Director }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        v-else-if="nowShowingMovies.length == 0 && selectedDropDown == 'Movies'"
        class="text-center font-weight-bold text-white mt-5"
      >No Shows Found</div>

      <div v-if="AllOperaShows.length > 0 && selectedDropDown == 'Opera & Ballet'">
        <div
          class="col-12 col-md-11 col-lg-11 col-xl-8 mx-auto my-4 my-lg-5"
          v-for="(showtimeDiv, z) in AllOperaShows"
          :key="z"
        >
          <div class="row">
            <div class="col-md-4 align-self-center pl-0">
              <!-- <div class="h-100"> -->
              <img :src="showtimeDiv.movie_card_img" class="img-fluid w-100 br-movie-img" />
              <!-- <div v-if="showtimeDiv.IsNew" class="new-movies">
                <span>NEW</span>
              </div>
              <div class="new-movies" v-else-if="showtimeDiv.tag=='Advance Booking'">
                <span>{{showtimeDiv.tag}}</span>
              </div>-->

              <!-- </div> -->
            </div>

            <div class="col-md-8 align-self-start">
              <div
                class="d-flex justify-content-sm-between justify-content-xl-around flex-column h-100"
              >
                <div class="brCinema pb-2 mb-lg-0 mt-4 mt-md-0">
                  <p class="eTitle eTitleblack mb-0">{{ showtimeDiv.title }}</p>
                  <span class="yr">
                    <span class="eTitleNew">{{ allLanguageData.Releasing }}:</span>
                    {{ showtimeDiv.release }}
                  </span>
                  <ul class="list-inline d-inline">
                    <li class="list-inline-item">{{ showtimeDiv.genre }}</li>
                    <!-- <li class="list-inline-item">Drama</li> -->
                  </ul>
                </div>

                <div
                  v-if="(CountryID!=190 || CountryID!='190') && showtimeDiv.tag=='Advance Booking'"
                  class="col-6 col-md-3 col-lg-3 px-0"
                >
                  <!-- <b-button
                    variant="default"
                    :class="preimere == 'true' ? 'btn-proceed':'btn-green'"
                    class="btn mt-3 mb-3"
                    @click="onClickBookNow(showtimeDiv)"
                  >Book Now</b-button>-->
                </div>

                <div>
                  <div
                    :class="showtimeDiv.showDiv==false?'eTitle font-weight-normal pt-2 ellipsis':'eTitle font-weight-normal pt-2'"
                  >{{ showtimeDiv.plot }}</div>
                </div>
                <div v-if="showtimeDiv.plot.length>180">
                  <a
                    @click="removeclassTitleOpera(z)"
                    style="color:#fff;cursor:pointer;"
                    class="eTitle"
                  >Read {{showtimeDiv.showDiv==false?'more':'less'}}</a>
                </div>
                <p class="pt-2 eTitle eTitleblack mb-0">{{allLanguageData.Rated}}</p>
                <div class="eTitle font-weight-normal pt-2">{{ showtimeDiv.Rated }}</div>
                <p class="pt-2 eTitle eTitleblack mb-0">{{allLanguageData.Actors}}</p>
                <div class="eTitle font-weight-normal pt-2">{{ showtimeDiv.Actors }}</div>
                <p class="pt-2 eTitle eTitleblack mb-0">{{allLanguageData.Director}}</p>
                <div class="eTitle font-weight-normal pt-2">{{ showtimeDiv.Director }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- AllGERMANFILMWEEK -->

      <div v-if="AllGERMANFILMWEEK.length > 0 && selectedDropDownNormal == 'GERMAN FILM WEEK'">
        <div
          class="col-12 col-md-11 col-lg-11 col-xl-8 mx-auto my-4 my-lg-5"
          v-for="(showtimeDiv, z) in AllGERMANFILMWEEK"
          :key="z"
        >
          <div class="row">
            <div class="col-md-4 align-self-center pl-0">
              <!-- <div class="h-100"> -->
              <img :src="showtimeDiv.movie_card_img" class="img-fluid w-100 br-movie-img" />
              <!-- <div v-if="showtimeDiv.IsNew" class="new-movies">
                <span>NEW</span>
              </div>
              <div class="new-movies" v-else-if="showtimeDiv.tag=='Advance Booking'">
                <span>{{showtimeDiv.tag}}</span>
              </div>-->
              <!-- </div> -->
            </div>

            <div class="col-md-8 align-self-start">
              <div
                class="d-flex justify-content-sm-between justify-content-xl-around flex-column h-100"
              >
                <div class="brCinema pb-2 mb-lg-0 mt-4 mt-md-0">
                  <p class="eTitle eTitleblack mb-0">{{ showtimeDiv.title }}</p>
                  <span class="yr">
                    <span class="eTitleNew">{{ allLanguageData.Releasing }}:</span>
                    {{ showtimeDiv.release }}
                  </span>
                  <ul class="list-inline d-inline">
                    <li class="list-inline-item">{{ showtimeDiv.genre }}</li>
                    <!-- <li class="list-inline-item">Drama</li> -->
                  </ul>
                </div>

                <div
                  v-if="(CountryID!=190 || CountryID!='190') && showtimeDiv.tag=='Advance Booking'"
                  class="col-6 col-md-3 col-lg-3 px-0"
                >
                  <!-- <b-button
                    variant="default"
                    :class="preimere == 'true' ? 'btn-proceed':'btn-green'"
                    class="btn mt-3 mb-3"
                    @click="onClickBookNow(showtimeDiv)"
                  >Book Now</b-button>-->
                </div>

                <p class="pt-2 eTitle eTitleblack mb-0">{{allLanguageData.Synopsis}}</p>
                <div>
                  <div
                    :class="showtimeDiv.showDiv==false?'eTitle font-weight-normal pt-2 ellipsis':'eTitle font-weight-normal pt-2'"
                  >{{ showtimeDiv.plot }}</div>
                </div>
                <div v-if="showtimeDiv.plot.length>180">
                  <a
                    @click="removeclassTitleGerman(z)"
                    style="color:#fff;cursor:pointer;"
                    class="eTitle"
                  >Read {{showtimeDiv.showDiv==false?'more':'less'}}</a>
                </div>
                <p class="pt-2 eTitle eTitleblack mb-0">{{allLanguageData.Rated}}</p>
                <div class="eTitle font-weight-normal pt-2">{{ showtimeDiv.Rated }}</div>
                <p class="pt-2 eTitle eTitleblack mb-0">{{allLanguageData.Actors}}</p>
                <div class="eTitle font-weight-normal pt-2">{{ showtimeDiv.Actors }}</div>
                <p class="pt-2 eTitle eTitleblack mb-0">{{allLanguageData.Director}}</p>
                <div class="eTitle font-weight-normal pt-2">{{ showtimeDiv.Director }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- end AllGERMANFILMWEEK -->

      <div
        v-else-if="AllOperaShows.length == 0 && (preimere==true || preimere=='true') && showVal"
        class="text-center font-weight-bold text-white mt-5"
      >No Shows Found</div>
      <div
        v-else-if="AllGERMANFILMWEEK.length == 0 && (preimere==false || preimere=='false') && showVal && selectedDropDownNormal == 'GERMAN FILM WEEK'"
        class="text-center font-weight-bold text-white mt-5"
      >No Shows Found</div>

      <!-- <div v-else class="text-center font-weight-bold text-white mt-5">No Shows Found</div> -->
    </section>
  </div>
</template>

<script>
import { makeRequest } from '@/helper/internet.js'

export default {
  name: 'comingSoonMovies',
  metaInfo: {
    title: 'Browse By Cinema',
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
      showDiv: false,
      showDivid: [],
      preimere: false,
      showActiveTime: null,
      cinemaId: '',
      shows: [],
      nowShowingMovies: [],
      AllOperaShows: [],
      AllGERMANFILMWEEK: [],
      cinemaDateList: [],
      selectedDate: '',
      cinemaFormatList: [],
      cinemaTimeList: [],
      allCinemaTimeList: [],
      selectedExp: '',
      cinemasList: [],
      AllCinemasList: [],
      selectCinema: '',
      // dropDown: ["Movies", "Opera & Ballet","GERMAN FILM WEEK"],
      // dropDownNormal: ["Movies", "GERMAN FILM WEEK"],
      dropDownNormal: ['Movies' ],
      dropDown: ['Movies', 'Opera & Ballet' ],
      selectedDropDown: 'Movies',
      selectedDropDownNormal: 'Movies',
      showVal: false,
    }
  },
  computed: {
    nowShowingMoviesList () {
      return this.nowShowingMovies
    },
  },
  beforeMount () {
    this.getAllShows()
  },
  mounted: function () {
    this.preimere = window.localStorage.getItem('PREIMERE')
  },
  methods: {
    removeclassTitle (id1) {
      let d = !this.nowShowingMovies[id1]['showDiv']
      let newVal = ''
      this.nowShowingMovies[id1]['showDiv'] = d
      if (this.nowShowingMovies[id1]['showDiv'] == true) {
        newVal += this.nowShowingMovies[id1]['Rated'] + ' '
      } else {
        newVal += this.nowShowingMovies[id1]['Rated'] + '   '
      }

      this.nowShowingMovies[id1]['Rated'] = newVal
      console.log(this.nowShowingMovies)
    },
    removeclassTitleOpera (id1) {
      let d = !this.AllOperaShows[id1]['showDiv']
      let newVal = ''
      this.AllOperaShows[id1]['showDiv'] = d
      if (this.AllOperaShows[id1]['showDiv'] == true) {
        newVal += this.AllOperaShows[id1]['Rated'] + ' '
      } else {
        newVal += this.AllOperaShows[id1]['Rated'] + '   '
      }

      this.AllOperaShows[id1]['Rated'] = newVal
      console.log(this.nowShowingMovies)
    },
    removeclassTitleGerman (id1) {
      let d = !this.AllGERMANFILMWEEK[id1]['showDiv']
      let newVal = ''
      this.AllGERMANFILMWEEK[id1]['showDiv'] = d
      if (this.AllGERMANFILMWEEK[id1]['showDiv'] == true) {
        newVal += this.AllGERMANFILMWEEK[id1]['Rated'] + ' '
      } else {
        newVal += this.AllGERMANFILMWEEK[id1]['Rated'] + '   '
      }

      this.AllGERMANFILMWEEK[id1]['Rated'] = newVal
      // console.log(this.nowShowingMovies);
    },

    addclassTitle (id) {
      this.showDiv = false
    },
    onClickBookNow: function (nowShowing) {
      this.$router.push({
        name: 'movieDetails',
        params: {
          movieId: nowShowing.id,
          formatId: nowShowing.FormatID,
        },
      })
    },
    onSelectDropDown: function (value) {
      this.selectedDropDown = value
    },
    onSelectDropDownNormal: function (value) {
      this.selectedDropDownNormal = value
    },
    getAllShows: function (cinemaId) {
      this.showLoading()
      makeRequest('/GetAllComingsoon', 'POST', null, null)
        .then(response => {
          const { error, res } = response

          if (res.data.Status) {
            this.showVal = true
            this.shows = res.data.Shows
            // this.shows = res.data.Shows.filter(x => {
            //   return x.cat_id == "6" || x.cat_id == "2";
            // });

            let array = this.shows[0]['show'].concat(this.shows[1]['show'])

            // this.AllOperaShows.push(
            //   this.shows.filter(x=>{
            //     return x.cat_id=='6'
            //   })
            // );

            // console.log("66669999",res.data.Shows[1]["show"]);

            array.map(x => {
              let i = x.format.indexOf('Opera & Ballet')
              let j = x.format.indexOf('German Film Week 2019')

              if (i >= 0) {
                x['showDiv'] = false
                this.AllOperaShows.push(x)
              } else if (j >= 0) {
                x['showDiv'] = false
                this.AllGERMANFILMWEEK.push(x)
              } else {
                x['showDiv'] = false
                this.nowShowingMovies.push(x)
              }
            })
          }

          this.hideLoading()
        })
        .catch(error => {
          console.log('Error', error)
        })
    },
  },
}
</script>

<style scoped>
.browse-cinema .emp-dropdown .dropdown-menu.show::after {
  top: -5px;
  content: "";
  left: 10px;
  z-index: -1;
  width: 20px;
  height: 20px;
  display: block;
  position: absolute;
  background-color: #fff;
  transform: rotate(-45deg);
}

.browse-cinema .dropdown-menu {
  transform: translate3d(0px, 40px, 0px) !important;
}

.pointer-none {
  pointer-events: none;
}
</style>
