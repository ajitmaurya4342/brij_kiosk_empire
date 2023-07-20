<template>
  <section>
    <!-- DESKTOP ABOUT SECTION -->
    <div class="d-none d-md-block">
      <div class="container text-center mx-auto red-about gold-about">
        <h6 class="title my-4">{{ _allLanguageData.AboutUs }}</h6>
        {{langName}}
        <p>{{_allLanguageData.AboutUsContent[0]}}</p>

        <p>{{_allLanguageData.AboutUsContent[1]}}</p>
        <div class="col-12 col-md-10 mx-auto about-video my-4">
          <iframe
            :src="langName == 'ar' ? 'https://www.youtube.com/embed/eDi763pToj4':'https://www.youtube.com/embed/zl7oFYZifG4'"
            frameborder="0"
            allowfullscreen
          ></iframe>
        </div>

        <p>{{_allLanguageData.AboutUsContent[2]}}</p>
      </div>

      <div class="mx-0 my-4">
        <!-- EMP GOLD ENG -->
        <img
          v-if="preimere == 'true' && langName !== 'ar'"
          src="@/assets/img/gold-about/city-gold.png"
          alt
          class="img-fluid w-100"
        />
        <!-- EMP GOLD AR -->
        <img
          v-if="preimere == 'true' && langName == 'ar'"
          src="@/assets/img/gold-about/city-gold-ar.png"
          alt
          class="img-fluid w-100"
        />

        <!-- EMP RED ENG -->
        <img
          v-if="preimere == 'false' && langName !== 'ar'"
          src="@/assets/img/red-about/city-red.png"
          alt
          class="img-fluid w-100"
        />
        <!-- EMP RED AR -->
        <img
          v-if="preimere == 'false' && langName == 'ar'"
          src="@/assets/img/red-about/city-red-ar.png"
          alt
          class="img-fluid w-100"
        />
      </div>

      <div class="container text-center mx-auto red-about gold-about">
        <p>{{_allLanguageData.AboutUsContent[3]}}</p>
        <p>{{_allLanguageData.AboutUsContent[4]}}</p>
      </div>

      <div class="mx-0 my-4">
        <!-- EMP GOLD ENG -->
        <img
          v-if="preimere == 'true' && langName !== 'ar'"
          src="@/assets/img/gold-about/time-line-gold.png"
          alt
          class="img-fluid w-100"
        />
        <!-- EMP GOLD AR -->
        <img
          v-if="preimere == 'true' && langName == 'ar'"
          src="@/assets/img/gold-about/time-line-gold-ar.png"
          alt
          class="img-fluid w-100"
        />

        <!-- EMP RED ENG -->
        <img
          v-if="preimere == 'false' && langName !== 'ar'"
          src="@/assets/img/red-about/time-line-red.png"
          alt
          class="img-fluid w-100"
        />
        <!-- EMP RED AR -->
        <img
          v-if="preimere == 'false' && langName == 'ar'"
          src="@/assets/img/red-about/time-line-red-ar.png"
          alt
          class="img-fluid w-100"
        />
      </div>
    </div>
    <!-- DESKTOP ABOUT SECTION -->

    <!-- MOBILE ABOUT SECTION -->
    <div class="d-block d-md-none">
      <div class="container text-center mx-auto red-about gold-about">
        <h6 class="title my-4">{{ _allLanguageData.AboutUs }}</h6>

        <p>{{_allLanguageData.AboutUsContent[0]}}</p>
        <p>{{_allLanguageData.AboutUsContent[1]}}</p>

        <div class="col-12 col-md-10 mx-auto about-video my-4">
          <iframe
            :src="langName == 'ar' ? 'https://www.youtube.com/embed/eDi763pToj4':'https://www.youtube.com/embed/zl7oFYZifG4'"
            frameborder="0"
            allowfullscreen
          ></iframe>
        </div>

        <p>{{_allLanguageData.AboutUsContent[2]}}</p>
      </div>

      <!-- EMP GOLD ENG -->
      <div class="container-fluid px-0">
        <div v-if="preimere == 'true' && langName !== 'ar'" class="row mx-0 my-4">
          <div class="col-12">
            <img src="@/assets/img/gold-about/city-mob-gold-1.png" alt class="img-fluid w-100" />
          </div>
          <div class="col-12 my-4">
            <img src="@/assets/img/gold-about/city-mob-gold-2.png" alt class="img-fluid w-100" />
          </div>
          <div class="col-12">
            <img src="@/assets/img/gold-about/city-mob-gold-3.png" alt class="img-fluid w-100" />
          </div>
        </div>

        <!-- EMP GOLD AR -->
        <div v-if="preimere == 'true' && langName == 'ar'" class="row mx-0 my-4">
          <div class="col-12">
            <img src="@/assets/img/gold-about/city-mob-gold-ar-1.png" alt class="img-fluid w-100" />
          </div>
          <div class="col-12 my-4">
            <img src="@/assets/img/gold-about/city-mob-gold-ar-2.png" alt class="img-fluid w-100" />
          </div>
          <div class="col-12">
            <img src="@/assets/img/gold-about/city-mob-gold-ar-3.png" alt class="img-fluid w-100" />
          </div>
        </div>

        <!-- EMP RED ENG -->
        <div v-if="preimere == 'false' && langName !== 'ar'" class="row mx-0 my-4">
          <div class="col-12">
            <img src="@/assets/img/red-about/city-mob-red-1.png" alt class="img-fluid w-100" />
          </div>
          <div class="col-12 my-4">
            <img src="@/assets/img/red-about/city-mob-red-2.png" alt class="img-fluid w-100" />
          </div>
          <div class="col-12">
            <img src="@/assets/img/red-about/city-mob-red-3.png" alt class="img-fluid w-100" />
          </div>
        </div>

        <!-- EMP RED AR -->
        <div v-if="preimere == 'false' && langName == 'ar'" class="row mx-0 my-4">
          <div class="col-12">
            <img src="@/assets/img/red-about/city-mob-red-ar-1.png" alt class="img-fluid w-100" />
          </div>
          <div class="col-12 my-4">
            <img src="@/assets/img/red-about/city-mob-red-ar-2.png" alt class="img-fluid w-100" />
          </div>
          <div class="col-12">
            <img src="@/assets/img/red-about/city-mob-red-ar-3.png" alt class="img-fluid w-100" />
          </div>
        </div>
      </div>

      <div class="container text-center mx-auto red-about gold-about">
        <p>{{_allLanguageData.AboutUsContent[3]}}</p>
        <p>{{_allLanguageData.AboutUsContent[4]}}</p>
      </div>

      <div class="px-2 mx-0 my-4">
        <!-- EMP GOLD ENG -->
        <img
          v-if="preimere == 'true' && langName !== 'ar'"
          src="@/assets/img/gold-about/time-line-mob-gold.png"
          alt
          class="img-fluid w-100"
        />
        <!-- EMP GOLD AR -->
        <img
          v-if="preimere == 'true' && langName == 'ar'"
          src="@/assets/img/gold-about/time-line-mob-gold-ar.png"
          alt
          class="img-fluid w-100"
        />

        <!-- EMP RED ENG -->
        <img
          v-if="preimere == 'false' && langName !== 'ar'"
          src="@/assets/img/red-about/time-line-mob-red.png"
          alt
          class="img-fluid w-100"
        />
        <!-- EMP RED ENG -->
        <img
          v-if="preimere == 'false' && langName == 'ar'"
          src="@/assets/img/red-about/time-line-mob-red-ar.png"
          alt
          class="img-fluid w-100"
        />
      </div>
    </div>
    <!-- MOBILE ABOUT SECTION -->
  </section>
</template>
<script>
import { LanguageService, CountryService } from '@/services/storage.service'
import languageData from '@/languageData.json'

export default {
  metaInfo: {
    title: 'About Us',
  },

  data () {
    return {
      preimere: false,
      langName: null,
      _allLanguageData: {},
      cinemaType: '',
    }
  },
  beforeMount: function () {
    let langName = this.$route.params.lang
    // let lang_id = this.$route.params.lang_id;
    this.cinemaType = this.$route.params.cinemaType
    this.langName = langName || 'eng'

    this._allLanguageData = languageData[langName]
    if (this.cinemaType === 'premiere') {
      // this.preimere = true;
      this.preimere = 'true'
      window.localStorage.setItem('PREIMERE', true)
    } else {
      window.localStorage.setItem('PREIMERE', false)
      // this.preimere = false;
      this.preimere = 'false'
    }
  },
  mounted () {
    let preimereToken = window.localStorage.getItem('PREIMERE')
    if (
      preimereToken == 'null' ||
      preimereToken == null ||
      preimereToken == 'false' ||
      preimereToken == false
    ) {
      import('../../assets/css/style.css').then(something => {
        import('../../assets/css/responsive.css')
      })
    } else {
      import('../../assets/css/preimere-css.css').then(something => {
        import('../../assets/css/responsive.css')
      })
    }
    // this.$nextTick(function() {
    if (this.cinemaType == 'premiere') {
      document.body.className = 'gold-img-section'
    } else if (this.cinemaType == 'normal') {
      document.body.className = 'img-section'
    }
    // });
  },
}
</script>

<style scoped>
.footer {
  background-image: none !important;
}
body.gold-img-section {
  font-weight: normal;
  font-family: "Montserrat";
  background: url("../../assets/img/desktop-gold-bg.jpg");
  background-size: cover;
  background-attachment: fixed;
  background-repeat: no-repeat;
}
</style>
