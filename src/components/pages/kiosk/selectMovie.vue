<template>
  <div class="select-movie">
    <!-- ERROR MODAL -->
    <b-modal
      ref="modal"
      id="modal-1"
      no-close-on-esc
      no-close-on-backdrop
      hide-header-close
      hide-footer
      hide-header
    >
      <p class="my-4 black text-center">{{ ErrorMessage }}</p>
      <div class="text-center">
        <b-button @click="$router.go(-1)" class="text-center mx-auto mt-3 btn-danger">CLOSE</b-button>
      </div>
    </b-modal>
    <!-- ERROR MODAL ENDS-->

    <div class="row mx-0">
      <div class="col-4 px-0" v-for="(movie , movieIndex) in shows" :key="movieIndex">
        <router-link :to="`movie-details/${movie.movie_id}`">
          <div class="kiosk-movie-card">
            <div class="pos-image-div">
              <img
                v-lazy="
                  checkBaseUrl(
                    getLangSpecificAttribute(
                      movie.altMovieContent,
                      getCurrentLang().brij_lang_id,
                      'artwork'
                      ) ||
                      movie.artwork
                  )
                "
              />
              <span v-if="movie.hasOwnProperty('isNew') && movie.isNew">New</span>
              <span v-if="isAdvanced(movie)">Advance Booking</span>
            </div>

            <h4 class="text-truncate">
              {{
                getLangSpecificAttribute(
                  movie.altMovieContent,
                  getCurrentLang().brij_lang_id,
                  'mc_title'
                ) || movie.movie_title || movie.original_title_of_movie || "MOVIE NAME"
              }}
            </h4>
            <div class="text-white h4 mb-3">{{ movie.format_name }}
            </div>
            <div class="text-white h4 mb-0">
              {{ movie.lang_name }}
            </div>
            <div class="text-left">
              <span class="rating">{{ movie.rating }}</span>
            </div>

            <div class="btn-success text-center rounded mt-3 py-2">{{ $tc("SelectShowTimes") }}</div>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'

export default {
  name: 'Select Movie',
  data () {
    return {
      shows: [],
      ErrorMessage: 'Something went wrong'
    }
  },
  beforeMount () {
    this.showLoading()

    this.shows = []
    this.$store.dispatch('fetchNowShowing')
      .then((response) => {
        console.log({ response })
        this.shows = response.data
      })
      .catch(() => {
        this.$refs.modal.show()
      })
      .finally(() => {
        this.hideLoading()
      })
  },
  computed: {
    getNowShowing () {
      return this.$store.getters.getNowShowing
    },
  },
  methods: {
    moment,
    isAdvanced (movie) {
      return false
      // return !(
      //   !movie.original_release_date ||
      //   (!!movie.original_release_date && moment(movie.original_release_date).isSameOrBefore(moment()))
      // )
    },
  }
}
</script>


<style>
.movie-listing-wrapper {
  display: flex;
  flex-wrap: wrap;
  margin-left: -2.5%;
  margin-right: -2.5%;
}

.kiosk-movie-card {
  padding: 15px;
  margin-bottom: 15px;
}

.kiosk-movie-card img {
  max-width: 100%;
  border-radius: 5px;
  /* margin-bottom: 20px; */
}

.kiosk-movie-card h4 {
  color: #fff;
  height: 28px;
  font-weight: bold;
}

.kiosk-movie-card .rating {
  color: #fff;
  padding: 0 10px;
  font-size: 20px;
  font-weight: bold;
  margin-right: 15px;
  border-radius: 5px;
  border: 2px solid #fff;
}
</style>
