<template>
  <div
    class="movie-details-mobile-banner d-block d-md-none movie-content"
    v-bind:class="langName == 'ar' ? 'text-right' : 'text-left'"
    v-if="movieData.length > 0"
  >
    <div class="video-banner">
      <div class="video-iframe">
        <iframe
          width="100%"
          height="315"
          :src="
                    `https://www.youtube.com/embed/${
                      (
                        getLangSpecificAttribute(
                          movieData[0].trailer_array,
                          getCurrentLang().brij_lang_id,
                          'mt_link',
                          'lang_id',
                          ) || getSafe(() => movieData[0].trailer_array[0].mt_link) || ''
                      ).split('v=')[1]
                    }?controls=0`
          "
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></iframe>
      </div>
      <div class="video-content pl-3">
        <div class="heading">
          <div class="title">
            {{
              getLangSpecificAttribute(
                movieData[0].altMovieContent,
                getCurrentLang().brij_lang_id,
                'mc_title'
              ) || movieData[0].movie_title || movieData[0].original_title_of_movie
            }}
          </div>
        </div>
        <div class="sub-features">
          <div class="sub d-flex align-items-center">
            {{ movieData[0].mrrdr_runtime }} mins
          </div>
          <div class="sub">
            {{ movieData[0].lang_name }}
          </div>
        </div>
      </div>
      <div class="video-overlay">
        <img
          src="@/assets/img/new-img/svg-img/mobile-showtimes.svg"
          alt
          class="img-fluid w-100 d-md-none"
        />
      </div>
    </div>
    <div class="mx-1">
      <div
        v-b-toggle.collapse-1
        class="movie-detail custom-collapse"
        :class="categoryId == 1 ? 'emp-bgprimary' : 'emp-bgsecondary'"
      >
        <div class="mb-3 sub-features">
          <div class="yellow-tag sub" v-if="movieData[0].rating">
            {{ movieData[0].rating }}
          </div>
          <div class="pl-2" v-if="movieData[0].genre">
            {{ movieData[0].genre }}
          </div>
        </div>

        <div class="mb-3" v-if="movieData[0].mrrdr_release_date">
          <h6 class="heading mb-0">{{ allLanguageData.ReleaseDate }}</h6>
          <p class="desc mb-0">{{ movieData[0].mrrdr_release_date }}</p>
        </div>
        <div v-if="confirmedMovie.FormatArray.filter(x => x.mf_id != '').map(x => x.mf_name).join(', ').length">
          <h6 class="heading mb-0">{{ allLanguageData.Format }}</h6>
          <p class="desc mb-0 m-format">
            {{ confirmedMovie.FormatArray.filter(x => x.mf_id != '').map(x => x.mf_name).join(', ') }}
          </p>
        </div>
      </div>
      <b-collapse id="collapse-1">
        <div
          class="movie-detail"
          :class="categoryId == 1 ? 'emp-bgprimary' : 'emp-bgsecondary'"
        >
          <div class="desc-content mb-3">
            <div class="mb-3" v-if="director">
              <h6 class="heading mb-0">{{ allLanguageData.Direction }}</h6>
              <p class="desc mb-0">
                <!-- {{ data.director }} -->
                {{ director }}
              </p>
            </div>
            <div class="mb-3" v-if="cast">
              <h6 class="heading mb-0">{{ allLanguageData.LeadCast }}</h6>
              <p class="desc mb-0">
                <!-- {{ data.actor }} -->
                {{ cast }}
              </p>
            </div>
            <div
              v-if="
                  getLangSpecificAttribute(
                    movieData[0].altMovieContent,
                    getCurrentLang().brij_lang_id,
                    'mc_plot'
                  ) || movieData[0].mc_plot
              "
            >
              <h6 class="heading mb-0">{{ allLanguageData.Synopsis }}</h6>
              <read-more
                class="mb-0 desc read-more-text"
                more-str="read more"
                less-str="read less"
                :text="
                  getLangSpecificAttribute(
                    movieData[0].altMovieContent,
                    getCurrentLang().brij_lang_id,
                    'mc_plot'
                  ) || movieData[0].mc_plot
                "
                :max-chars="120"
                link="#"
              ></read-more>
            </div>
          </div>
        </div>
      </b-collapse>
    </div>
  </div>
</template>
<script>
import {LanguageService} from '../../services/storage.service'

export default {
  props: {
    movieData: Array,
    confirmedMovie: Object,
    categoryId: String,
  },
  data () {
    return {
      director: '',
      cast: '',
    }
  },
  watch: {
    $props: {
      handler () {
        this.castCrewDetails()
      },
      // deep: true,
      immediate: true,
    },
  },
  methods: {
    castCrewDetails () {
      if (this.movieData[0] && this.movieData[0].castCrewDetails && this.movieData[0].castCrewDetails.length > 0) {
        let director = this.movieData[0].castCrewDetails.filter(c => c.crew_title == 'Director').flatMap(c => c.Crew.flatMap(x => x.mcc_cast_name))

        if (director.length > 0) {
          console.log({director})
          this.director = director.join(', ')
        }
        let cast = this.movieData[0].castCrewDetails.filter(c => c.crew_title == 'Actor').flatMap(c => c.Crew.flatMap(x => x.mcc_cast_name))

        if (cast.length > 0) {
          console.log({cast})
          this.cast = cast.join(', ')
        }
      }
    },
  }
}
</script>
