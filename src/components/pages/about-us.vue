<template>
  <!-- <section class="aboutUs-section">
    <div class="container" style="min-height: calc(100vh - 200px)">
      <h3 align="center">{{ allLanguageData.AboutUs }}</h3>
      <p>{{allLanguageData.AboutUsContent[0]}}</p>
      <p>{{allLanguageData.AboutUsContent[1]}}</p>
      <p>{{allLanguageData.AboutUsContent[2]}}</p>
      <p>{{allLanguageData.AboutUsContent[3]}}</p>
    </div>
  </section>-->
  <!-- <section>
    <div class v-if="preimere == 'true'">
      <img
        src="@/assets/img/EMPIRE-WEBSITE-DESKTOP-GOLD.jpg"
        alt
        class="img-fluid w-100 d-none d-md-block"
      >
      <img src="@/assets/img/EMPIRE-MOBILE-DESKTOP-GOLD.jpg" alt class="img-fluid w-100 d-md-none">
    </div>

    <div class v-else>
      <img
        src="@/assets/img/EMPIRE-WEBSITE-DESKTOP.jpg"
        alt
        class="img-fluid w-100 d-none d-md-block"
      >
      <img src="@/assets/img/EMPIRE-MOBILE-DESKTOP.jpg" alt class="img-fluid w-100 d-md-none">
    </div>
  </section>-->

  <section>
    <!-- DESKTOP ABOUT SECTION -->
    <div class="d-none d-md-block">
      <div class="container text-center mx-auto red-about gold-about">
        <h6 class="title my-4">{{ allLanguageData.AboutUs }}</h6>

        <h5 class="border-bottom pb-3">{{    allLanguageData.datetoend }} </h5>

        <p class="pt-3">{{ allLanguageData.AboutUsContent[0] }}</p>

        <p>{{ allLanguageData.AboutUsContent[1] }}</p>

        <div class="col-12 col-md-10 mx-auto about-video my-4">
          <iframe
            :src="
              langName == 'ar'
                ? 'https://www.youtube.com/embed/eDi763pToj4'
                : 'https://www.youtube.com/embed/zl7oFYZifG4'
            "
            frameborder="0"
            allowfullscreen
          ></iframe>
        </div>

        <p>{{ allLanguageData.AboutUsContent[2] }}</p>
        <!-- <div class="border-top pt-3">
          <div v-for="(index, data) in 12" class="grid-half align-items-center">
            <h6 style="text-align: right">
              {{ allLanguageData.year_timeline[index] }} -
            </h6>
            <h6 style="text-align: left">
              {{ allLanguageData.cinema_timeline[index] }}
            </h6>
          </div>
        </div> -->
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
        <p>{{ allLanguageData.AboutUsContent[3] }}</p>
        <p>{{ allLanguageData.AboutUsContent[4] }}</p>
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
          src="@/assets/img/Info website-En.png"
          alt
          class="img-fluid w-100"
        />
        <!-- EMP RED AR -->
        <img
          v-if="preimere == 'false' && langName == 'ar'"
          src="@/assets/img/Info website-Ar.png"
          alt
          class="img-fluid w-100"
        />
      </div>
    </div>
    <!-- DESKTOP ABOUT SECTION -->

    <!-- MOBILE ABOUT SECTION -->
    <div class="d-block d-md-none">
      <div class="container text-center mx-auto red-about gold-about">
        <h6 class="title my-4">{{ allLanguageData.AboutUs }}</h6>

        <p>{{ allLanguageData.AboutUsContent[0] }}</p>
        <p>{{ allLanguageData.AboutUsContent[1] }}</p>

        <div class="col-12 col-md-10 mx-auto about-video my-4">
          <iframe
            src="https://www.youtube.com/embed/zl7oFYZifG4"
            frameborder="0"
            allowfullscreen
          ></iframe>
        </div>

        <p>{{ allLanguageData.AboutUsContent[2] }}</p>
      </div>

      <!-- <div class="border-top pt-3">
          <div v-for="(index, data) in 12" class="grid-half align-items-center">
            <h6 style="text-align: right">
              {{ allLanguageData.year_timeline[index] }} -
            </h6>
            <h6 style="text-align: left">
              {{ allLanguageData.cinema_timeline[index] }}
            </h6>
          </div>
        </div> -->

      <!-- EMP GOLD ENG -->
      <div class="container-fluid px-0">
        <div
          v-if="preimere == 'true' && langName !== 'ar'"
          class="row mx-0 my-4"
        >
          <div class="col-12">
            <img
              src="@/assets/img/gold-about/city-mob-gold-1.png"
              alt
              class="img-fluid w-100"
            />
          </div>
          <div class="col-12 my-4">
            <img
              src="@/assets/img/gold-about/city-mob-gold-2.png"
              alt
              class="img-fluid w-100"
            />
          </div>
          <div class="col-12">
            <img
              src="@/assets/img/gold-about/city-mob-gold-3.png"
              alt
              class="img-fluid w-100"
            />
          </div>
        </div>

        <!-- EMP GOLD AR -->
        <div
          v-if="preimere == 'true' && langName == 'ar'"
          class="row mx-0 my-4"
        >
          <div class="col-12">
            <img
              src="@/assets/img/gold-about/city-mob-gold-ar-1.png"
              alt
              class="img-fluid w-100"
            />
          </div>
          <div class="col-12 my-4">
            <img
              src="@/assets/img/gold-about/city-mob-gold-ar-2.png"
              alt
              class="img-fluid w-100"
            />
          </div>
          <div class="col-12">
            <img
              src="@/assets/img/gold-about/city-mob-gold-ar-3.png"
              alt
              class="img-fluid w-100"
            />
          </div>
        </div>

        <!-- EMP RED ENG -->
        <div
          v-if="preimere == 'false' && langName !== 'ar'"
          class="row mx-0 my-4"
        >
          <div class="col-12">
            <img
              src="@/assets/img/red-about/city-mob-red-1.png"
              alt
              class="img-fluid w-100"
            />
          </div>
          <div class="col-12 my-4">
            <img
              src="@/assets/img/red-about/city-mob-red-2.png"
              alt
              class="img-fluid w-100"
            />
          </div>
          <div class="col-12">
            <img
              src="@/assets/img/red-about/city-mob-red-3.png"
              alt
              class="img-fluid w-100"
            />
          </div>
        </div>

        <!-- EMP RED AR -->
        <div
          v-if="preimere == 'false' && langName == 'ar'"
          class="row mx-0 my-4"
        >
          <div class="col-12">
            <img
              src="@/assets/img/red-about/city-mob-red-ar-1.png"
              alt
              class="img-fluid w-100"
            />
          </div>
          <div class="col-12 my-4">
            <img
              src="@/assets/img/red-about/city-mob-red-ar-2.png"
              alt
              class="img-fluid w-100"
            />
          </div>
          <div class="col-12">
            <img
              src="@/assets/img/red-about/city-mob-red-ar-3.png"
              alt
              class="img-fluid w-100"
            />
          </div>
        </div>
      </div>

      <div class="container text-center mx-auto red-about gold-about">
        <p>{{ allLanguageData.AboutUsContent[3] }}</p>
        <p>{{ allLanguageData.AboutUsContent[4] }}</p>
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
export default {
  metaInfo: {
    title: 'About Us',
    titleTemplate: null,
    preimere: false,
  },

  beforeCreate: function () {
    this.preimere = window.localStorage.getItem('PREIMERE')

    if (
      this.preimere == null ||
      this.preimere == 'false' ||
      this.preimere == false
    ) {
      document.body.className = 'img-section'
    } else {
      document.body.className = 'gold-img-section'
    }
  },
}
</script>

<style scoped>
.footer {
  background-image: none !important;
}
.grid-half {
  display: grid;
  grid-template-columns: 15% 70%;
  grid-column-gap: 10px;
  color: #f3dada;
}
</style>
