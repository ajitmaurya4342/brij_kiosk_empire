<template>
  <div>
    <!-- MAIN SLIDER END-->
    <section class="container-fluid mainslider-bg">
      <div class="col-12 col-md-11 px-0 mx-auto mt-3 mt-md-5">
        <div class="row mx-0">
          <div class="col-md-none col-lg-none col-xl-4"></div>

          <div
            v-if="!show4dxData"
            class="col-md-4 col-xl-4 text-lg-left text-xl-center eTitle eTitleblack text-center"
          >
            <img
              v-if="preimere == true || preimere == 'true'"
              src="@/assets/img/svg/nowShowing-icon-gold.svg"
              class="pb-1"
              height="auto"
              width="35px"
              v-bind:class="langName == 'ar' ? 'pl-2' : 'pr-2'"
            />
            <img
              v-else
              src="@/assets/img/svg/nowShowing-icon.svg"
              class="pb-1"
              v-bind:class="langName == 'ar' ? 'pl-2' : 'pr-2'"
            />
            {{ allLanguageData.NowShowing }}
            <span></span>
          </div>
          <div
            v-if="show4dxData"
            class="col-md-4 col-xl-4 text-xl-center eTitle eTitleblack"
            v-bind:class="langName == 'ar' ? 'text-lg-right' : 'text-lg-left'"
          >
            <img
              v-if="preimere == true || preimere == 'true'"
              src="@/assets/img/svg/nowShowing-icon-gold.svg"
              class="img-fluid pb-1"
              height="auto"
              width="30px"
              v-bind:class="langName == 'ar' ? 'pl-2' : 'pr-2'"
            />
            <img
              v-else
              src="@/assets/img/svg/nowShowing-icon.svg"
              class="pb-1"
              v-bind:class="langName == 'ar' ? 'pl-2' : 'pr-2'"
            />
            NOW SHOWING IN {{ selectedExp }}
          </div>

          <div
            class="col-md-8 col-lg-8 col-xl-4 px-0"
            v-if="preimere != 'true'"
          >
            <ul
              class="list-inline mb-0 text-center filter-list mt-3 mt-md-0"
              v-bind:class="
                langName == 'ar' ? ' text-md-left pr-0' : 'text-md-right'
              "
            >
              <li
                class="list-inline-item d-block d-md-inline font-weight-bold ar-flt-txt"
              >
                {{ allLanguageData.Filters[0].title }}
              </li>
              <li class="list-inline-item">
                <b-dropdown
                  :text="
                    dropDowns.genre.selected.Genre == 'ALL GENRES'
                      ? allLanguageData.Genre
                      : dropDowns.genre.selected.Genre
                  "
                  variant="none"
                  class
                >
                  <b-dropdown-item
                    v-if="dropDowns.genre.list.length > 0"
                    v-for="(genre, genreListIndex) in dropDowns.genre.list"
                    :key="genreListIndex"
                    v-on:click="filterData(genre, 'genre')"
                  >
                    <span class="text-capitalize">{{ genre.Genre }}</span>
                  </b-dropdown-item>
                </b-dropdown>
              </li>
              <li class="list-inline-item">
                <b-dropdown
                  id="ddown1"
                  :text="
                    dropDowns.experience.selected.Metacritic ==
                    'ALL EXPERIENCES'
                      ? allLanguageData.Experience
                      : dropDowns.experience.selected.Metacritic
                  "
                  variant="none"
                  class
                >
                  <b-dropdown-item
                    v-if="dropDowns.experience.list.length > 0"
                    v-for="(exp, expListIndex) in dropDowns.experience.list"
                    :key="expListIndex"
                    v-on:click="filterData(exp, 'experience')"
                  >
                    <span class="text-uppercase">{{ exp.Metacritic }}</span>
                  </b-dropdown-item>
                </b-dropdown>
              </li>
              <li class="list-inline-item cusFilter-drop">
                <b-dropdown
                  id="ddown1"
                  right
                  :text="
                    dropDowns.languages.selected.LanguageName == 'ALL LANGUAGES'
                      ? allLanguageData.Language
                      : dropDowns.languages.selected.LanguageName
                  "
                  variant="none"
                  class
                >
                  <b-dropdown-item
                    v-for="(lang, languageListIndex) in dropDowns.languages
                      .list"
                    :key="languageListIndex"
                    v-on:click="filterData(lang, 'language')"
                  >
                    <span class="text-uppercase">{{ lang.LanguageName }}</span>
                  </b-dropdown-item>
                </b-dropdown>
              </li>
            </ul>
          </div>
        </div>
        <!-- NO FILTER DATA MODAL -->
        <b-modal
          no-close-on-esc
          no-close-on-backdrop
          hide-header-close
          id="NoFilterDataModal"
          ref="NoFilterDataModal"
          title="Something went wrong!"
          class="ErModal light-red-color"
        >
          <!-- <img class="mx-auto d-block mt-4" src="@/assets/img/svg/alert-icon.svg" width="45" height="auto"> -->
          <h6 class="pt-3 mb-0 text-center font-weight-bold text-white">
            No Movie found for {{ dropDowns.currentSelected }}
          </h6>
          <b-button
            @click="onClickOk()"
            variant="default"
            class="btn btn-green mt-4 mb-3"
            >{{ allLanguageData.ErrorModal.Btn }}</b-button
          >
        </b-modal>

        <!-- {{PMenu}} -->
        <div>
          <img
            v-if="preimere == true || preimere == 'true'"
            src="@/assets/img/svg/dotted-black-line.svg"
            class="w-100"
            alt
          />
          <img
            v-else
            src="@/assets/img/svg/dotted-line.svg"
            class="w-100"
            alt
          />
        </div>

        <div class="d-none d-lg-block">
          <div v-if="show4dxData" class="experience4d">
            <div>
              EXPERIENCE THESE FILMS IN
              <span class="font-weight-bold">4DX</span>
              , WITH
            </div>
            <div class="d-flex">
              <img src="@/assets/img/svg/icon-bubble.svg" />
              <div class="font-weight-bold">BUBBLES</div>
            </div>

            <div class="d-flex">
              <img src="@/assets/img/svg/icon-wind.svg" />
              <div class="font-weight-bold">WIND</div>
            </div>

            <div class="d-flex">
              <img src="@/assets/img/svg/icon-lightning.svg" />
              <div class="font-weight-bold">LIGHTNING</div>
            </div>

            <div class="d-flex">
              <img src="@/assets/img/svg/icon-rain.svg" />
              <div class="font-weight-bold">RAIN</div>
            </div>

            <div class="d-flex">
              <img src="@/assets/img/svg/icon-fog.svg" alt />
              <div class="font-weight-bold">FOG</div>
            </div>

            <div class="d-flex">
              <img src="@/assets/img/svg/icon-scents.svg" alt />
              <div class="font-weight-bold">SCENTS</div>
            </div>

            <div>
              <router-link to="#" class="text-white">LEARN MORE</router-link>
            </div>
          </div>
        </div>
        <!-- <img src="@/assets/img/announcement.jpg" class="img-fluid my-4" alt /> -->

        <div>
          <div v-if="nowShowingShows && nowShowingShows.show.length > 0" class>
            <!-- {{ nowShowingShows.show.length }} -->
            <carousel-3d
              @after-slide-change="onAfterSlideChange"
              :display="nowShowingShows.show.length"
              :height="470"
              :width="330"
              :autoplay="true"
              :autoplayHoverPause="false"
              :controlsVisible="true"
              :inverse-scaling="10"
              :space="200"
              :perspective="0"
              :dir="'ltr'"
              class="hp-slider"
              v-bind:class="langName == 'ar' ? 'transform-arrow' : ''"
            >
              <slide
                v-for="(singleShow, i) in nowShowingShows.show"
                :index="i"
                :key="i"
                style="border-radius: 15px"
              >
                <div>
                  <router-link
                    class="movieDetails"
                    to=""
                    @click.native="onClickFilterData(singleShow)"
                  >
                    <img
                      v-if="singleShow.movie_card_img.includes('assets/images')"
                      :src="singleShow.movie_card_img"
                      class="img-fluid"
                      style="border-radius: 15px"
                      v-bind:alt="singleShow.title"
                    />
                    <img
                      v-else-if="preimere == true || preimere == 'true'"
                      src="@/assets/img/pre_logo_ver.png"
                      class="img-fluid"
                      style="border-radius: 15px"
                      v-bind:alt="singleShow.title"
                    />
                    <img
                      v-else
                      src="@/assets/img/logo_p_ver.png"
                      class="img-fluid"
                      style="border-radius: 15px"
                      v-bind:alt="singleShow.title"
                    />
                  </router-link>
                  <!--  -->
                  <div
                    v-if="singleShow.tag && singleShow.tag.length > 0"
                    class="new-movies"
                  >
                    <span>{{ singleShow.tag }}</span>
                  </div>
                </div>
              </slide>
            </carousel-3d>
          </div>

          <!-- carousel-3d -->
          <div v-else class="text-lg-left text-xl-center eTitle eTitleTr">
            <carousel-3d
              @after-slide-change="onAfterSlideChange"
              :display="50"
              :height="470"
              :width="330"
              :autoplay="true"
              :autoplayHoverPause="true"
              :controlsVisible="true"
              :inverse-scaling="10"
              :space="200"
              :perspective="0"
              class="hp-slider"
              v-bind:class="langName == 'ar' ? 'transform-arrow' : ''"
            >
              <slide
                v-for="(singleShow, i) in 100"
                :index="i"
                :key="i"
                style="border-radius: 15px"
              >
                <div>
                  <div class>
                    <router-link class="movieDetails" to="#">
                      <img
                        v-if="preimere == true || preimere == 'true'"
                        src="@/assets/img/pre_logo_ver.png"
                        class="img-fluid"
                        style="border-radius: 15px"
                        v-bind:alt="singleShow.title"
                      />
                      <img
                        v-else
                        src="@/assets/img/logo_p_ver.png"
                        class="img-fluid"
                        style="border-radius: 15px"
                        v-bind:alt="singleShow.title"
                      />
                    </router-link>
                  </div>
                </div>
              </slide>
            </carousel-3d>
          </div>

          <!-- carousel-3d -->

          <div
            v-if="currentMovieDetails"
            :class="preimere === 'true' ? '' : 'text-white'"
            class="text-center small mb-3 rate-div"
          >
            <span class="text-uppercase font-weight-bold">
              {{ currentMovieDetails.title }}
              <!-- ({{currentMovieDetails.rated}}) -->
            </span>
            <br />
            <span
              v-for="(format, formatKey) in currentMovieDetails.format"
              :key="formatKey"
              class="badge badge-light mr-1"
              >{{ format }}</span
            >
            <span>&bull;</span>
            <span>{{ currentMovieDetails.language }}</span>
          </div>
        </div>
      </div>
    </section>
    <!-- MAIN SLIDER END-->

    <!-- QUICKBOOK -->

    <section
      class="bg-white"
      :class="CountryID == 102 || CountryID == '102' ? 'd-none' : ''"
      v-if="CountryID != 190 || CountryID != '190'"
    >
      <QuickBook />
    </section>
    <!-- QUICKBOOK -->

    <!-- ADD SLIDER DESK -->
    <section id="latestMovie" class="bg-white py-4 py-md-5 d-none d-md-block">
      <div class="col-md-10 mx-auto">
        <slick ref="AdvertisementListMob" :options="homeSlider">
          <div
            v-for="(banner, bannerKey) in advertisementList"
            :key="bannerKey"
          >
            <img
              @click="offerAdvertisement(banner)"
              class="img-fluid add-img w-100"
              :src="banner.AdvertisementImage"
              :alt="banner.AdvertisementID"
            />
          </div>
        </slick>
      </div>
    </section>

    <!-- ADD SLIDER MOB -->
    <section id="latestMovie" class="bg-white py-4 py-md-5 d-md-none">
      <div class="col-md-10 mx-auto">
        <slick ref="AdvertisementList" :options="homeSlider">
          <div
            v-for="(banner, MobbannerKey) in advertisementList"
            :key="MobbannerKey"
          >
            <img
              @click="offerAdvertisement(banner)"
              :src="banner.MobileImage"
              :alt="banner.AdvertisementID"
              class="img-fluid add-img w-100"
            />
          </div>
        </slick>
      </div>
    </section>
    <!-- ADD SLIDER END -->

    <!-- ********************* -->
    <!-- OFFERS AND PROMOTIONS SLIDER START-->

    <!-- OFFERS AND PROMOTIONS SLIDER END -->
    <!-- ********************* -->

    <!-- LATEST RELEASES -->
    <section
      ref="latestMovie"
      class="container-fluid homeMovieSection bg-white pb-5 d-none"
    >
      <div class="col-md-11 px-0 mx-auto">
        <p class="text-center eTitle text-dark font-weight-bold">
          {{ allLanguageData.LatestReleases }}
        </p>
        <div class="row mx-0">
          <div
            v-if="visibleShows && visibleShows.show.length > 0"
            v-for="(latestShow, index) in visibleShows.show"
            :key="index"
            class="col-12 col-md-6 col-lg-4 col-xl-3 mb-3 pl-md-0 px-0 pr-md-3"
          >
            <div class="movieBox-container">
              <div class="movieBox tras">
                <span class="font-weight-bold">NEW</span>
                <img
                  v-if="latestShow.movie_poster_img.includes('assets/images')"
                  v-lazy="latestShow.movie_poster_img"
                  class="img-fluid w-100 home-movie-img"
                  v-bind:alt="latestShow.title"
                />
                <img
                  v-else-if="preimere == true || preimere == 'true'"
                  src="@/assets/img/gold_logo_hori.png"
                  class="img-fluid w-100 home-movie-img"
                  v-bind:alt="latestShow.title"
                />
                <img
                  v-else
                  src="@/assets/img/logo_p_hori.png"
                  class="img-fluid w-100 home-movie-img"
                  v-bind:alt="latestShow.title"
                />
                <div class="content p-3 p-lg-2 p-xl-3">
                  <div class="w-100">
                    <p class="mb-0 small font-weight-bold text-uppercase lh-1">
                      {{ latestShow.title }}
                    </p>
                    <div class="mb-2 mt-1">
                      <ul
                        class="list-inline format-list d-inline mr-2 mb-5"
                        v-bind:class="
                          langName == 'ar' ? 'pr-0 pl-3 ar-format-list' : ''
                        "
                      >
                        <li
                          class="list-inline-item badge badge-light"
                          v-for="(format, formatKey) in latestShow.format"
                          :key="formatKey"
                        >
                          {{ format }}
                        </li>
                      </ul>
                      <ul
                        class="list-inline lang-format-list d-inline"
                        v-bind:class="langName == 'ar' ? 'pr-0 pl-3' : ''"
                      >
                        <li class="list-inline-item">
                          {{ latestShow.language }}
                        </li>
                      </ul>
                    </div>

                    <div
                      class="d-flex justify-content-between align-items-center"
                    >
                      <div>
                        <button
                          v-on:click="goToMovieDetails(latestShow)"
                          class="btn btn-white font-weight-bold"
                        >
                          BOOK NOW
                        </button>
                      </div>
                      <a
                        class="text-white float-right watch-tr"
                        data-fancybox
                        :href="
                          'https://www.youtube.com/embed/' + latestShow.Youtube
                        "
                      >
                        WATCH TRAILER
                        <img
                          src="@/assets/img/svg/small-play-icon.svg"
                          class="pl-2"
                          height="10px"
                          whidth="20px"
                        />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <p class="text-center loadBtn mb-0">
          <!-- <router-link to="#">VIEW ALL</router-link> -->
          <a
            class="pointer-cus"
            v-if="visibleShows.show.length != AllLatestReleases.length"
            v-on:click.stop.prevent="
              onChangeLatestReleaseView(latestReleaseCount)
            "
            >{{ allLanguageData.VIEWALL }}</a
          >
          <!--  -->
        </p>
      </div>
    </section>
    <!-- LATEST RELEASES END -->

    <!-- TRAILERS & VIDEOS -->
    <section class="container-fluid mvSection px-0 py-4 py-md-5">
      <div class="col-md-11 mx-auto">
        <p class="text-center eTitle text-white">
          {{ allLanguageData.TrailerAndVideos }}
        </p>
        <div class="row mx-0">
          <div class="col-md-4 order-2 order-md-1">
            <ul class="leftVideoSlider" id="leftVideoSlider">
              <li
                class="mt-3 mt-md-0 mb-md-4 st-box"
                v-for="(youtube, index) in youTubeList"
                :key="index"
                v-on:click="switchYoutubeURL(youtube)"
              >
                <!-- <div
                  class="video-movie-box"
                  :style="{'background': 'url('+youtube.Poster+')'}"
                  v-bind:class="{ active: currentYoutube == 'https://www.youtube.com/embed/'+youtube.Link }"
                >-->
                <img
                  v-lazy="youtube.Poster"
                  class="img-fluid st-img"
                  v-bind:class="{
                    active:
                      currentYoutube ==
                      'https://www.youtube.com/embed/' + youtube.Link,
                  }"
                  v-bind:alt="youtube.Title"
                />
                <!-- </div> -->
              </li>
            </ul>
          </div>

          <div class="col-md-8 order-1 order-md-2">
            <div class="h-100 rightVideoSlider">
              <!-- <vue-friendly-iframe v-if="currentYoutube.length > 0" :src="currentYoutube"></vue-friendly-iframe> -->
              <iframe
                v-if="currentYoutube.length > 0"
                :src="currentYoutube"
                frameborder="0"
                allowfullscreen
              ></iframe>
              <!-- Hitesh add css here -->
              <div v-else class="row">
                <div class="text-center eTitle text-white">
                  <h3>No Youtube Trailer Found</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ADD SLIDER DESK -->
    <section id="latestMovie" class="bg-white py-4 py-md-5 d-none d-md-block">
      <div class="col-md-10 mx-auto">
        <slick ref="AdvertisementListMob1" :options="homeSlider">
          <div
            v-for="(banner, bannerKey) in advertisementList"
            :key="bannerKey"
          >
            <img
              @click="offerAdvertisement(banner)"
              class="img-fluid add-img w-100"
              :src="banner.AdvertisementImage"
              :alt="banner.AdvertisementID"
            />
          </div>
        </slick>
      </div>
    </section>

    <!-- ADD SLIDER MOB -->
    <section id="latestMovie" class="bg-white py-4 py-md-5 d-md-none">
      <div class="col-md-10 mx-auto">
        <slick ref="AdvertisementListOne" :options="homeSlider">
          <div
            v-for="(banner, MobbannerKey) in advertisementList"
            :key="MobbannerKey"
          >
            <img
              @click="offerAdvertisement(banner)"
              :src="banner.MobileImage"
              :alt="banner.AdvertisementID"
              class="img-fluid add-img w-100"
            />
          </div>
        </slick>
      </div>
    </section>
    <!-- ADD SLIDER END -->

    <!-- COMING SOON -->
    <section
      class="container-fluid homeMovieSection bg-white pb-4 pb-md-5"
      id="comimgSoon"
    >
      <div class="col-md-11 px-0 mx-auto">
        <p class="text-black eTitle eTitleblack text-center">
          {{ allLanguageData.ComingSoon }}
        </p>
        <div class="d-flex justify-content-center new-tabs">
          <p
            v-on:click="onClickTab('Coming Soon')"
            :class="selectedTab == 'Coming Soon' ? 'active' : ''"
            class="text-center eTitle text-dark font-weight-bold mr-2"
          >
            {{ allLanguageData.Movie }}
          </p>
          <p
            v-on:click="onClickTab('Advance Booking')"
            :class="selectedTab == 'Advance Booking' ? 'active' : ''"
            class="d-none text-center eTitle text-dark font-weight-bold"
          >
            {{ allLanguageData.AdvanceBooking }}
          </p>

          <p
            v-if="preimere == true || preimere == 'true'"
            v-on:click="onClickTab('Opera')"
            :class="selectedTab == 'Opera' ? 'active' : ''"
            class="text-center eTitle text-dark font-weight-bold ml-2"
          >
            {{ allLanguageData.Opera }}
          </p>

          <!-- <p
            v-if="(preimere==false || preimere=='false')"
            v-on:click="onClickTab('GERMAN')"
            :class="selectedTab == 'GERMAN' ? 'active':''"
            class="text-center eTitle text-dark font-weight-bold ml-2"
          >{{allLanguageData.GERMAN}}</p>-->
        </div>

        <!-- <div class="row mx-0">
          <div
            v-if="comingSoonShows && comingSoonShows.show.length > 0"
            class="col-12 col-md-6 col-lg-4 col-xl-3 mb-3 pl-md-0 px-0 pr-md-3"
            v-for="(comingShow , index) in comingSoonShows.show"
            :key="index"
          >
            <div class="movieBox-container">
              <div class="movieBox tras">
                  <img
                  v-if="comingShow.movie_poster_img.includes('assets/images')"
                  :src="comingShow.movie_card_img"
                  class="img-fluid w-100 home-movie-img"
                >
                <img
                  v-else-if="preimere == true || preimere == 'true'"
                  src="@/assets/img/gold_logo_hori.png"
                  class="img-fluid w-100 home-movie-img"
                >
                <img
                  v-else
                  src="@/assets/img/logo_p_hori.png"
                  class="img-fluid w-100 home-movie-img"
                >

                <div class="content p-md-3 p-lg-2 p-xl-3">
                  <div class="w-100">
                    <p
                      class="mb-0 small lh-1 font-weight-bold text-uppercase"
                    >{{ comingShow.title }}</p>
                    <ul class="list-inline lang-format-list d-inline">
                      <li class="list-inline-item">{{ comingShow.language }}</li>
                    </ul>
                    <div class="d-flex justify-content-between align-items-center">
                      <a
                        class="text-white float-right"
                        data-fancybox
                        :href="'https://www.youtube.com/embed/'+comingShow.Youtube"
                      >
                        WATCH TRAILER
                        <img
                          src="@/assets/img/svg/small-play-icon.svg"
                          class="pl-2"
                          height="10px"
                          whidth="20px"
                        >
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>-->
        <!-- <div v-if="selectedTab == 'Coming Soon'" class="tab-1">
          <slick
            ref="ComingSoonSlider"
            :options="movies"
            v-if="
              (comingSoonShows && comingSoonShows.show.length > 0) ||
              (advanceBookingShows && advanceBookingShows.show.length > 0)
            "
          >
            <div
              class="movieBox-container"
              v-for="(comingShow, index) in [
                ...advanceBookingShows.show,
                ...comingSoonShows.show,
              ]"
              :key="index"
            >
              <div class="movieBox tras">
                <img
                  v-if="comingShow.movie_poster_img.includes('assets/images')"
                  v-lazy="comingShow.movie_card_img"
                  class="img-fluid w-100 home-movie-img"
                  v-bind:alt="comingShow.title"
                />
                <img
                  v-else-if="preimere == true || preimere == 'true'"
                  src="@/assets/img/pre_logo_ver.png"
                  class="img-fluid w-100 home-movie-img"
                  v-bind:alt="comingShow.title"
                />
                <img
                  v-else
                  src="@/assets/img/logo_p_ver.png"
                  class="img-fluid w-100 home-movie-img"
                />

                <div class="content">
                  <div class="w-100">
                    <p
                      class="mb-0 hslider-moviename lh-1 font-weight-bold text-uppercase"
                    >
                      {{ comingShow.title }}
                    </p>
                    <ul
                      class="list-inline lang-format-list d-inline mt-2 hslider-text"
                    >
                      <li class="list-inline-item">
                        {{ comingShow.language }}
                      </li>
                    </ul>
                    <div
                      class="d-flex justify-content-between align-items-center mt-2"
                    >
                      <div
                        class
                        v-if="comingShow.tag && comingShow.tag.length > 0"
                      >
                        <button
                          v-on:click="goToMovieDetails(comingShow)"
                          class="btn btn-white font-weight-bold cs-btn"
                        >
                          BOOK NOW
                        </button>
                      </div>
                      <div>
                        <a
                          class="text-white hslider-text wt-text"
                          data-fancybox
                          :href="
                            'https://www.youtube.com/embed/' +
                            comingShow.Youtube
                          "
                        >
                          WATCH TRAILER
                          <img
                            src="@/assets/img/svg/small-play-icon.svg"
                            class="pl-2"
                            height="10px"
                            whidth="20px"
                          />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div
                v-if="comingShow.tag && comingShow.tag.length > 0"
                class="new-movies"
              >
                <span>{{ comingShow.tag }}</span>
              </div>
            </div>
          </slick>
          <div class="text-center mx-auto" v-else>No Movie Found</div>
        </div> -->

        <div v-if="selectedTab == 'Coming Soon'" class="tab-1">
          <div
            class="row"
            v-if="
              (comingSoonShows && comingSoonShows.show.length > 0) ||
              (advanceBookingShows && advanceBookingShows.show.length > 0)
            "
          >
            <div
              class="col-6 col-md-4 col-lg-3 mb-3 movieBox-container cs-container"
              v-for="(comingShow, index) in [
                ...advanceBookingShows.show,
                ...comingSoonShows.show,
              ]"
              :key="index"
            >
              <div class="movieBox tras">
                <img
                  v-if="comingShow.movie_poster_img.includes('assets/images')"
                  v-lazy="comingShow.movie_card_img"
                  class="img-fluid w-100 home-movie-img"
                  v-bind:alt="comingShow.title"
                />
                <img
                  v-else-if="preimere == true || preimere == 'true'"
                  src="@/assets/img/pre_logo_ver.png"
                  class="img-fluid w-100 home-movie-img"
                  v-bind:alt="comingShow.title"
                />
                <img
                  v-else
                  src="@/assets/img/logo_p_ver.png"
                  class="img-fluid w-100 home-movie-img"
                />

                <div class="content">
                  <div class="w-100">
                    <p
                      class="mb-0 hslider-moviename lh-1 font-weight-bold text-uppercase"
                    >
                      {{ comingShow.title }}
                    </p>
                    <ul
                      class="list-inline lang-format-list d-inline mt-2 hslider-text"
                    >
                      <li class="list-inline-item">
                        {{ comingShow.language }}
                      </li>
                    </ul>
                    <div
                      class="d-flex justify-content-between align-items-center mt-2"
                    >
                      <div
                        class
                        v-if="comingShow.tag && comingShow.tag.length > 0"
                      >
                        <button
                          v-on:click="goToMovieDetails(comingShow)"
                          class="btn btn-white font-weight-bold cs-btn"
                        >
                          BOOK NOW
                        </button>
                      </div>
                      <div>
                        <a
                          class="text-white hslider-text wt-text"
                          data-fancybox
                          :href="
                            'https://www.youtube.com/embed/' +
                            comingShow.Youtube
                          "
                        >
                          WATCH TRAILER
                          <img
                            src="@/assets/img/svg/small-play-icon.svg"
                            class="pl-2"
                            height="10px"
                            whidth="20px"
                          />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div
                v-if="comingShow.tag && comingShow.tag.length > 0"
                class="new-movies"
              >
                <span>{{ comingShow.tag }}</span>
              </div>
            </div>
          </div>

          <div class="text-center mx-auto" v-else>
            {{ allLanguageData.NoDataFound }}
          </div>
          <div class="mx-auto text-center">
            <div
              v-if="isloadmoreItem"
              class="btn emp-grey-btn px-3 mt-4 min-w-auto"
              @click="loadmoreItem(1)"
            >
              {{ allLanguageData.LoadMore }}
            </div>
          </div>
        </div>

        <div v-if="selectedTab == 'Advance Booking'" class="d-none tab-2">
          <slick
            ref="ComingSoonSlider"
            :options="movies"
            v-if="advanceBookingShows && advanceBookingShows.show.length > 0"
          >
            <div
              class="movieBox-container"
              v-for="(advance, indexNew) in advanceBookingShows.show"
              :key="indexNew"
            >
              <div class="movieBox tras">
                <router-link
                  class="movieDetails"
                  :to="{
                    name: 'movieDetails',
                    params: { movieId: advance.id, formatId: advance.FormatID },
                  }"
                >
                  <img
                    :src="advance.movie_card_img"
                    class="img-fluid w-100 home-movie-img"
                    v-bind:alt="advance.title"
                  />
                  <!-- v-if="advance.movie_poster_img.includes('assets/images')" -->
                  <!-- <img
                  v-else-if="preimere == true || preimere == 'true'"
                  src="@/assets/img/pre_logo_ver.png"
                  class="img-fluid w-100 home-movie-img"
                  v-bind:alt="advance.title"
                />
                <img
                  v-else
                  src="@/assets/img/logo_p_ver.png"
                  class="img-fluid w-100 home-movie-img"
                  />-->

                  <div class="content">
                    <div class="w-100">
                      <p
                        class="mb-0 hslider-moviename lh-1 font-weight-bold text-uppercase"
                      >
                        {{ advance.title }}
                      </p>
                      <ul
                        class="list-inline lang-format-list d-inline mt-2 hslider-text"
                      >
                        <li class="list-inline-item">{{ advance.language }}</li>
                      </ul>
                      <div
                        class="d-flex justify-content-between align-items-center mt-2"
                      >
                        <div>
                          <button
                            v-on:click="goToMovieDetails(advance)"
                            class="btn btn-white font-weight-bold"
                          >
                            BOOK NOW
                          </button>
                        </div>
                        <a
                          class="text-white float-right hslider-text"
                          data-fancybox
                          :href="
                            'https://www.youtube.com/embed/' + advance.Youtube
                          "
                        >
                          WATCH TRAILER
                          <img
                            src="@/assets/img/svg/small-play-icon.svg"
                            class="pl-2 float-right"
                            height="10px"
                            whidth="20px"
                          />
                        </a>
                      </div>
                    </div>
                  </div>
                </router-link>
              </div>
              <!-- <div v-if="advance.tag && advance.tag.length > 0" class="new-movies">
                <span>{{advance.tag}}</span>
              </div>-->
            </div>
          </slick>
          <div class="text-center mx-auto" v-else>No Movie Found</div>
        </div>

        <div v-if="selectedTab == 'Opera'" class="tab-2">
          <slick
            ref="ComingSoonSlider"
            :options="movies"
            v-if="AllOperaShows.length > 0"
          >
            <div
              class="movieBox-container"
              v-for="(advance, indexNew) in AllOperaShows"
              :key="indexNew"
            >
              <div class="movieBox tras">
                <router-link
                  class="movieDetails"
                  :to="{
                    name: 'movieDetails',
                    params: { movieId: advance.id, formatId: advance.FormatID },
                  }"
                >
                  <img
                    :src="advance.movie_card_img"
                    class="img-fluid w-100 home-movie-img"
                    v-bind:alt="advance.title"
                  />

                  <div class="content">
                    <div class="w-100">
                      <p
                        class="mb-0 hslider-moviename lh-1 font-weight-bold text-uppercase"
                      >
                        {{ advance.title }}
                      </p>
                      <ul
                        class="list-inline lang-format-list d-inline mt-2 hslider-text"
                      >
                        <li class="list-inline-item">{{ advance.language }}</li>
                      </ul>
                      <div
                        class="d-flex justify-content-between align-items-center mt-2"
                      >
                        <!-- <div>
                          <button
                            v-on:click="goToMovieDetails(advance)"
                            class="btn btn-white font-weight-bold"
                          >
                            BOOK
                            NOW
                          </button>
                        </div>-->
                        <a
                          class="text-white float-right hslider-text"
                          data-fancybox
                          :href="
                            'https://www.youtube.com/embed/' + advance.Youtube
                          "
                        >
                          <!-- WATCH TRAILER
                          <img
                            src="@/assets/img/svg/small-play-icon.svg"
                            class="pl-2 float-right"
                            height="10px"
                            whidth="20px"
                          />-->
                        </a>
                      </div>
                    </div>
                  </div>
                </router-link>
              </div>
              <!-- <div v-if="advance.tag && advance.tag.length > 0" class="new-movies">
                <span>{{advance.tag}}</span>
              </div>-->
            </div>
          </slick>
          <div class="text-center mx-auto" v-else>No Movie Found</div>
        </div>

        <div v-if="selectedTab == 'GERMAN'" class="tab-2">
          <slick
            ref="ComingSoonSlider"
            :options="movies"
            v-if="AllGERMANFILMWEEK.length > 0"
          >
            <div
              class="movieBox-container"
              v-for="(advance, indexNew) in AllGERMANFILMWEEK"
              :key="indexNew"
            >
              <div class="movieBox tras">
                <router-link
                  class="movieDetails"
                  :to="{
                    name: 'movieDetails',
                    params: { movieId: advance.id, formatId: advance.FormatID },
                  }"
                >
                  <img
                    :src="advance.movie_card_img"
                    class="img-fluid w-100 home-movie-img"
                    v-bind:alt="advance.title"
                  />

                  <div class="content">
                    <div class="w-100">
                      <p
                        class="mb-0 hslider-moviename lh-1 font-weight-bold text-uppercase"
                      >
                        {{ advance.title }}
                      </p>
                      <ul
                        class="list-inline lang-format-list d-inline mt-2 hslider-text"
                      >
                        <li class="list-inline-item">{{ advance.language }}</li>
                      </ul>
                      <div
                        class="d-flex justify-content-between align-items-center mt-2"
                      >
                        <!-- <div>
                          <button
                            v-on:click="goToMovieDetails(advance)"
                            class="btn btn-white font-weight-bold"
                          >
                            BOOK
                            NOW
                          </button>
                        </div>-->
                        <a
                          class="text-white float-right hslider-text"
                          data-fancybox
                          :href="
                            'https://www.youtube.com/embed/' + advance.Youtube
                          "
                        >
                          <!-- WATCH TRAILER
                          <img
                            src="@/assets/img/svg/small-play-icon.svg"
                            class="pl-2 float-right"
                            height="10px"
                            whidth="20px"
                          />-->
                        </a>
                      </div>
                    </div>
                  </div>
                </router-link>
              </div>
              <!-- <div v-if="advance.tag && advance.tag.length > 0" class="new-movies">
                <span>{{advance.tag}}</span>
              </div>-->
            </div>
          </slick>
          <div class="text-center mx-auto" v-else>No Movie Found</div>
        </div>
      </div>
    </section>
    <!-- COMING SOON END -->
    <!-- FNB Modal -->
    <b-modal
      ref="fnbadvertisementmodal"
      id="fnbadvertisementmodal"
      hide-header
      hide-footer
      centered
      class="advertisement-modal"
    >
      <button class="btn-close" @click="closeFNBAdPopup">&times;</button>
      <div class="text-center">
        <img
          :src="
            Promotionsfnb.image != ''
              ? Promotionsfnb.image
              : '@/assets/img/fries-coke-en.jpg'
          "
          class="img-fluid d-block mx-auto mb-4"
        />
        <p v-html="Promotionsfnb.content"></p>
      </div>
    </b-modal>

    <b-alert
      v-model="showTopAlert"
      class="position-fixed fixed-top m-0 rounded-0"
      style="z-index: 1000"
      variant="light"
      dismissible
      id="toastAlert"
    >
      <p class="mb-0 small text-black">
        {{ allLanguageData.cookiesText1 }}<br />{{
          allLanguageData.cookiesText2
        }}
        <router-link class="new-emp-red" to="/privacy-policy"
          ><u>{{ allLanguageData.privacyPolicy }}</u></router-link
        >.
      </p>
    </b-alert>

    <b-modal
      no-close-on-esc
      no-close-on-backdrop
      id="verifyLyoyaltyprogram"
      ref="verifyLyoyaltyprogram"
      title="Loyalty Program"
      class="ErModal light-red-color"
    >
      <h6 class="pt-3 mb-0 text-center font-weight-bold text-white">
        Please verify your mobile number for Club Empire Loyalty Program
      </h6>
      <b-button
        @click="redirectToProfile('clubEmpire')"
        variant="default"
        class="btn btn-green mt-4 mb-3"
        >Verify</b-button
      >
    </b-modal>
  </div>
</template>

<script>
import QuickBook from '@/components/partials/quickBook.vue'
import { makeRequest } from '@/helper/internet.js'
import { mapState, mapGetters, mapActions } from 'vuex'
import {
  LanguageService,
  CountryService,
  TokenService,
} from '@/services/storage.service'
import { error } from 'util'
import { metaInfo } from '@/helper/constant.js'
import { setTimeout } from 'timers'
import { EventBus } from '@/main'

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
  metaInfo: metaInfo,

  data () {
    return {
      errorImage: '@/assets/img/logo_p_hori.png',
      preimere: false,
      selectedExp: '',
      showTopAlert: false,
      show4dxData: false,
      isloadmoreItem: true,
      pageNumber: 1,
      TotalpageData: [],
      dropDowns: {
        currentSelected: '',
        languages: {
          selected: {
            LanguageName: 'ALL LANGUAGES',
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
            Genre: 'ALL GENRES',
          },
          list: [],
        },
        experience: {
          selected: {
            ExperienceName: 'ALL EXPERIENCES',
            Metacritic: 'ALL EXPERIENCES',
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
      // With All Data
      AllLatestReleases: [],
      AllComingSoonShows: [],
      AllOperaShows: [],
      AllGERMANFILMWEEK: [],
      PMenu: [],
      // For Bind Data
      visibleShows: {
        show: [],
      },
      comingSoonShows: {
        show: [],
      },
      advanceBookingShows: {
        show: [],
      },
      nowShowingShows: {
        show: [],
      },
      latestReleases: {
        show: [],
      },
      comingSoonCount: 0,
      latestReleaseCount: 0,
      advertisementList: [],
      youTubeList: [],
      currentMovieDetails: {
        format: [],
        title: '',
        language: '',
      },
      currentPosition: 0,
      currentYoutube: '',

      Promotionsfnb: {
        image: '',
        content: '',
        showpromtionpopup: false,
      },

      homeSlider: {
        arrows: false,
        slidesToShow: 1,
        // rtl: true,
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

      movies: {
        dots: true,
        infinite: false,
        speed: 300,
        slidesToShow: 4,
        slidesToScroll: 4,
        dots: false,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 3,
              infinite: true,
              dots: false,
            },
          },
          {
            breakpoint: 992,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 3,
            },
          },
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 2,
            },
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 1,
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

      selectedTab: 'Coming Soon',

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
      filterSelectedLang: '',
      filterSelectedGenre: '',
      filterSelectedExp: '',
      langName: 'eng',
    }
  },
  beforeMount () {
    // this.showLoading();
    this.getNowShowingData()
    this.getComingSoonData()
    this.getAllFilters()
    this.getLatestRelease()
    this.getAdvertisement()
    // this.getLanguages();
  },
  beforeCreate: function () {
    let pre = window.localStorage.getItem('PREIMERE')
    if (pre == null || pre == 'false' || pre == false) {
      document.body.className = 'img-section'
    } else {
      document.body.className = 'gold-img-section'
      // if (this.$route.path === "/") {
      //   document.body.style.backgroundImage =
      //     "url('/static/img/desktop-gold-bg.jpg')";
      // }
    }
    if (
      (localStorage.getItem('english') == 1 ||
        !localStorage.getItem('english')) &&
      window.location.pathname != '/ar'
    ) {
      let language = {
        lang: 'eng',
        lang_id: 2,
      }
      localStorage.removeItem('arabic')
      LanguageService.saveLanguage(language)
      localStorage.setItem('english', 2)
      window.location.reload(true)
    }
  },

  mounted: function () {
    EventBus.$on('openLyoyaltyprogrampopup', (e) => {
      if (window.location.pathname == '/') {
        this.$refs.verifyLyoyaltyprogram.show()
      }
    })
    let activeCountryPop = window.localStorage.getItem('isCookiesPopup')
    if (!activeCountryPop || activeCountryPop == undefined) {
      this.showTopAlert = true
      setTimeout(function () {
        window.localStorage.setItem('isCookiesPopup', '1')
      }, 1000)
      // ;
    } else {
      this.showTopAlert = false
    }
    setTimeout((x) => {
      this.hideLoading()
    }, 4000)

    // this.$root.$emit("bv::show::modal", "advtModal");
    this.preimere = window.localStorage.getItem('PREIMERE')
    let selectedCountry =
      window.localStorage.getItem('CountryName') || 'LEBANON'
    // if (selectedCountry === "Iraq") {
    //   window.location.pathname = "/iraq";
    // }
    // else
    // if (selectedCountry === "Saudi Arabia") {
    //   window.location.pathname = "/ksa";
    // }
    let lang = LanguageService.getLanguage()

    if (lang == null) {
      this.langName = 'eng'
    } else {
      this.langName = lang['lang']
    }

    if (this.langName == 'ar') {
      this.homeSlider.rtl = true
      this.movies.rtl = true
    } else {
      this.homeSlider.rtl = false
    }

    document.addEventListener(
      'DOMContentLoaded',
      function () {
        var head = document.getElementsByTagName('head')[0]

        var style = document.createElement('link')
        style.rel = 'stylesheet'
        style.href =
          'https://cdnjs.cloudflare.com/ajax/libs/fancybox/3.5.7/jquery.fancybox.css'
        head.appendChild(style)

        var script = document.createElement('script')
        script.src =
          'https://cdnjs.cloudflare.com/ajax/libs/fancybox/3.5.7/jquery.fancybox.js'
        head.appendChild(script)

        var googleScript = document.createElement('script')
        googleScript.src = 'https://apis.google.com/js/api:client.js'
        // head.appendChild(googleScript);
      },
      false
    )
  },

  methods: {
    redirectToProfile (type) {
      localStorage.setItem('profileTabType', type)
      this.$nextTick(() => {
        this.$router.push({ path: '/profile' })
      })
      localStorage.setItem('changeTabProfile', 3)
    },
    closeLpPopup () {
      this.$refs.verifyLyoyaltyprogram.hide()
    },
    onClickBookNow (movieId, formatId) {
      this.$root.$emit('bv::hide::modal', 'advtModal')
      this.$router.push({
        name: 'movieDetails',
        params: {
          movieId: movieId,
          formatId: formatId,
        },
      })
    },
    ...mapActions(['onFilterSelect' ]),
    onClickFilterData (data) {
      let payload = {
        filterfomateID: this.filterSelectedExp,
        filtercinemaids: data.CinemaIDfil.toString() || '',
        filtergenreid: this.filterSelectedGenre || '',
        filterlangid: this.filterSelectedLang || '',
      }

      this.onFilterSelect(payload)
      this.$router.push({
        name: 'movieDetails',
        params: { movieId: data.id, formatId: data.FormatID },
      })
    },
    closeFNBAdPopup () {
      this.$refs.fnbadvertisementmodal.hide()
    },
    getUrl (url) {
      if (url != '' && url != null) {
        window.open(url)
      }
    },
    offerAdvertisement (value) {
      // console.log("object-value", value);
      if (value.isBook == 1) {
        this.$router.push({
          name: 'movieDetails',
          params: {
            movieId: value.MovieID,
            formatId: value.formatID,
          },
        })
      } else if (value.adLink != '' && value.adLink != null) {
        window.open(url)
      }
    },
    onClickTab: function (value) {
      this.selectedTab = value
      this.$refs.ComingSoonSlider.destroy()
      this.$nextTick(() => {
        //
        this.$refs.ComingSoonSlider.create()
        this.$refs.ComingSoonSlider.goTo(1, true)
      })
    },
    onClickOk () {
      this.$refs.NoFilterDataModal.hide()
      this.dropDowns.currentSelected = ''
    },
    playTrailer: function () {
      this.$router.push('/https://www.youtube.com/watch?v=TcMBFSGVi1c')
    },
    onselect () {
      this.selectedExp = '4DX'
      this.show4dxData = true
    },
    onChangeLatestReleaseView: function (count) {
      for (let i = count; i < count + 4; i++) {
        if (
          this.visibleShows['show'].length !== this.AllLatestReleases.length
        ) {
          this.visibleShows['show'].push(this.AllLatestReleases[i])
          this.latestReleaseCount++
        }
      }
    },
    onChangeComingSoonView: function (count) {
      for (let i = count; i < count + 4; i++) {
        if (
          this.comingSoonShows['show'].length !== this.AllComingSoonShows.length
        ) {
          this.comingSoonShows['show'].push(this.AllComingSoonShows[i])
          this.comingSoonCount++
        }
      }
    },

    goToMovieDetails: function (latestShow) {
      this.$router.push({
        name: 'movieDetails',
        params: {
          movieId: latestShow.id,
          formatId: latestShow.FormatID,
        },
      })
    },
    switchYoutubeURL: function (movieObject) {
      console.log('movieObject :>> ', movieObject)
      // VueScrollTo.scrollTo(movieObject.ID, 500, options);
      // // this.currentYoutube = movieObject;
      if (
        movieObject &&
        movieObject.Link &&
        String(movieObject.Link).length > 0
      ) {
        this.currentYoutube = `https://www.youtube.com/embed/${movieObject.Link}`
      } else {
        this.currentYoutube = ''
      }
    },
    filterData: function (data, filter) {
      if (filter == 'language') {
        this.filterSelectedLang = data.LanguageID
        this.dropDowns.languages.selected = data
        this.dropDowns.currentSelected = data.LanguageName
      }
      if (filter == 'genre') {
        this.filterSelectedGenre = data.GenreID
        this.dropDowns.genre.selected = data
        this.dropDowns.currentSelected = data.Genre
      }
      if (filter == 'experience') {
        this.filterSelectedExp = data.Metacritic
        this.dropDowns.experience.selected = data
        this.dropDowns.currentSelected = data.Metacritic
      }
      // this.dropDowns.currentSelected = data;
      this.getNowShowingData()
    },

    getAllFilters: function () {
      makeRequest('/GetAllFilter', 'POST', null, null)
        .then((response) => {
          const { error, res } = response
          // alert("fsdf343434");
          // this.$refs.advtModal.show();
          // if (this.CountryID !== 102) {
          // }
          if (!error) {
            this.dropDowns.languages.list = []
            this.dropDowns.languages.list.push({
              LanguageName: 'ALL LANGUAGES',
            })
            if (res.data.List.Language.length > 0) {
              this.dropDowns.languages.list = this.dropDowns.languages.list.concat(
                res.data.List.Language
              )
              this.dropDowns.languages.list = this.dropDowns.languages.list.filter(
                (x) => {
                  return x.LanguageName != null
                }
              )
            }
            this.dropDowns.genre.list = []
            this.dropDowns.genre.list.push({
              Genre: 'ALL GENRES',
              GenreEnglish: 'ALL GENRES',
            })
            if (res.data.List.Genre.length > 0) {
              this.dropDowns.genre.list = this.dropDowns.genre.list.concat(
                res.data.List.Genre
              )
              this.dropDowns.genre.list = this.dropDowns.genre.list.filter(
                (x) => {
                  return x.GenreEnglish != null
                }
              )
            }
            this.dropDowns.experience.list = []
            this.dropDowns.experience.list.push({
              Metacritic: 'ALL EXPERIENCES',
            })
            if (res.data.List.Experince.length > 0) {
              this.dropDowns.experience.list = this.dropDowns.experience.list.concat(
                res.data.List.Experince
              )
              this.dropDowns.experience.list = this.dropDowns.experience.list.filter(
                (x) => {
                  return x.Metacritic != null
                }
              )
              // Metacritic
            }
          } else {
            console.log('Response Error ')
          }
        })
        .catch((error) => {
          console.log('Error', error)
        })
    },
    getNowShowingData: function () {
      // this.hideLoading();

      let payload = {}
      // if(dropDowns.language.selected !="All Languages"){
      //   payload.LanguageID = dropDowns.selected.LanguageID;
      // }
      if (this.dropDowns.languages.selected.LanguageName != 'ALL LANGUAGES') {
        payload.MovieLanguageID = this.dropDowns.languages.selected.LanguageName
      }
      if (this.dropDowns.genre.selected.Genre != 'ALL GENRES') {
        payload.Genre = this.dropDowns.genre.selected.GenreID
      }
      if (this.dropDowns.experience.selected.Metacritic != 'ALL EXPERIENCES') {
        payload.Metacritic = this.dropDowns.experience.selected.Metacritic
      }
      // if (payload.Metacritic == "ALL EXPERIENCES") {
      //   delete payload["Metacritic"];
      // }
      // if (payload.MovieLanguageID == "ALL LANGUAGES") {
      //   delete payload["MovieLanguageID"];
      // }
      // if (payload.Genre == "ALL GENRES") {
      //   delete payload["Genre"];
      // }
      makeRequest('/GetAllShow/', 'POST', null, payload)
        .then((response) => {
          const { error, res } = response
          if (res.data.Status && res.data.Shows.length > 0) {
            // debugger;
            this.shows = res.data.Shows
            this.PMenu = res.data.PMenu
            this.Promotionsfnb = res.data.Promotionsfnb

            if (this.Promotionsfnb.showpromtionpopup) {
              this.$refs.fnbadvertisementmodal.show()
            }

            let nowShowing = res.data.Shows.filter((x) => x.cat_id == 1)
            let comingSoon = res.data.Shows.filter((x) => x.cat_id == 2)
            // let artHouse = res.data.Shows.filter(x => x.cat_id == 3);
            // let publicScreening = res.data.Shows.filter(x => x.cat_id == 4);
            // let popUpScreening = res.data.Shows.filter(x => x.cat_id == 5);

            if (res.data.YouTubeList.length > 0) {
              this.youTubeList = res.data.YouTubeList
              this.currentYoutube = `https://www.youtube.com/embed/${this.youTubeList[0].Link}`
            }
            if (nowShowing[0].show.length == 0) {
              this.$refs.NoFilterDataModal.show()
            }
            // Now Showing
            if (nowShowing.length > 0 && nowShowing[0].show.length > 0) {
              // this.latestReleases = nowShowing[0];
              // this.loadLatestReleaseData(nowShowing[0]);
              this.loadCarouselData(nowShowing[0])
            }

            this.onAfterSlideChange(0)
          }
        })
        .catch((error) => {
          console.log('Error', error)
        })
    },
    getComingSoonData: function () {
      let payload = {
        isWeb: 1,
        pageNo: this.pageNumber,
      }
      makeRequest('/GetAllComingsoon', 'POST', null, payload)
        .then((response) => {
          const { error, res } = response
          if (res.data.Status && res.data.Shows.length > 0) {
            let advanceBooking = res.data.Shows.filter((x) => x.cat_id == 1)
            let comingSoon = res.data.Shows.filter((x) => x.cat_id == 2)
            let operaBallet = res.data.Shows.filter((x) => x.cat_id == 6)

            this.pageData = res.data.TotalpageData[0]
            // console.log("this.pageData ", this.pageData);

            if (
              this.pageData.Totalpages == 1 ||
              comingSoon[0].show.length < 0
            ) {
              this.isloadmoreItem = false
            }

            if (comingSoon.length > 0 && comingSoon[0].show.length > 0) {
              comingSoon[0].show.map((x) => {
                let i = x.format.indexOf('Opera & Ballet')
                let j = x.format.indexOf('German Film Week 2019')

                if (i >= 0) {
                  this.AllOperaShows.push(x)
                } else if (j >= 0) {
                  this.AllGERMANFILMWEEK.push(x)
                } else {
                  this.AllComingSoonShows.push(x)
                }
              })

              this.loadComingSoonData(comingSoon[0], this.AllComingSoonShows)
            }

            if (operaBallet.length > 0 && operaBallet[0].show.length > 0) {
              operaBallet[0].show.map((x) => {
                let i = x.format.indexOf('Opera & Ballet')
                let j = x.format.indexOf('German Film Week 2019')

                if (i >= 0) {
                  this.AllOperaShows.push(x)
                } else if (j >= 0) {
                  this.AllGERMANFILMWEEK.push(x)
                } else {
                  this.AllComingSoonShows.push(x)
                }
              })

              console.log('german', this.AllGERMANFILMWEEK)
              this.loadComingSoonData(comingSoon[0], this.AllComingSoonShows)
            }

            if (
              advanceBooking.length > 0 &&
              advanceBooking[0].show.length > 0
            ) {
              let arrayBooking = []
              advanceBooking[0].show.map((x) => {
                let i = x.format.indexOf('Opera & Ballet')
                let j = x.format.indexOf('German Film Week 2019')

                if (i >= 0) {
                  this.AllOperaShows.push(x)
                } else if (j >= 0) {
                  this.AllGERMANFILMWEEK.push(x)
                } else {
                  arrayBooking.push(x)
                  this.AllComingSoonShows.push(x)
                }
              })
              // console.log(this.AllOperaShows, "fsdf");
              // this.AllComingSoonShows = advanceBooking[0].show;
              this.loadAdvanceBookingData(advanceBooking[0], arrayBooking)
              console.log('germanadv', this.AllGERMANFILMWEEK)
            }
          }
          this.hideLoading()
        })
        .catch((error) => {
          this.hideLoading()
          console.log('Error', error)
        })
    },
    getAdvertisement: function () {
      let payload = {}
      makeRequest('/Advertisement', 'POST', null, payload)
        .then((response) => {
          const { res } = response
          if (res.data.Advertisement.length > 0) {
            this.advertisementList = res.data.Advertisement
            // ComingSoonSlider

            this.$refs.AdvertisementList.destroy()
            this.$refs.AdvertisementListOne.destroy()
            this.$refs.AdvertisementListMob.destroy()
            this.$refs.AdvertisementListMob1.destroy()
            this.$nextTick(() => {
              //
              this.$refs.AdvertisementList.create()
              this.$refs.AdvertisementList.goTo(1, true)
              //
              this.$refs.AdvertisementListMob.create()
              this.$refs.AdvertisementListMob.goTo(1, true)
              //
              this.$refs.AdvertisementListMob1.create()
              this.$refs.AdvertisementListMob1.goTo(1, true)
              //
              this.$refs.AdvertisementListOne.create()
              this.$refs.AdvertisementListOne.goTo(1, true)
            })
          }
        })
        .catch((error) => {
          console.log('Error In Advertisement')
        })
    },

    getLatestRelease: async function () {
      let payload = {}
      makeRequest('/GetAllShow/', 'POST', null, payload)
        .then((response) => {
          const { error, res } = response
          if (res.data.Status && res.data.Shows.length > 0) {
            this.comingSoonCount = 0
            this.latestReleaseCount = 0
            let nowShowing = res.data.Shows.filter((x) => x.cat_id == 1)
            // let comingSoon = res.data.Shows.filter(x => x.cat_id == 2);

            // Now Showing
            if (nowShowing.length > 0 && nowShowing[0].show.length > 0) {
              this.AllLatestReleases = nowShowing[0].show
              this.loadLatestReleaseData(nowShowing[0])
            }
            // if (comingSoon.length > 0 && comingSoon[0].show.length > 0) {
            //   this.AllComingSoonShows = comingSoon[0].show;
            //   //  this.$refs.ComingSoonSlider.destroy();
            //   //  this.$nextTick(() => {
            //   //   this.$refs.ComingSoonSlider.create();
            //   //   this.$refs.ComingSoonSlider.goTo(1, true);
            //   //  })
            //   this.loadComingSoonData(comingSoon[0]);
            // }
          }
        })
        .catch((error) => {
          console.log('Error', error)
        })
    },
    loadCarouselData: function (data) {
      const { title, cat_id, show } = data
      // Object.assign(this.nowShowingShows, data);
      this.nowShowingShows['title'] = title
      this.nowShowingShows['cat_id'] = cat_id
      this.nowShowingShows['show'] = show

      for (let i = data.show.length; i < 100;) {
        for (let y = 0; y < data.show.length; y++) {
          if (i < 100) {
            if (
              data.show[y].genre != 'Opera' &&
              data.show[y].genre != 'Ballet'
            ) {
              this.nowShowingShows.show.push(data.show[y])
              i++
            }
          }
        }
      }
    },
    loadAdvanceBookingData: function (data, arrayBooking) {
      this.advanceBookingShows['cat_id'] = data.cat_id
      this.advanceBookingShows['title'] = data.title
      this.advanceBookingShows['show'] = arrayBooking
    },
    loadComingSoonData: function (data, allShow) {
      this.comingSoonShows['cat_id'] = data.cat_id
      this.comingSoonShows['title'] = data.title
      this.comingSoonShows['show'] = allShow
      // for (let i = 0; i < 16; i++) {
      //   data.show.map(x => {
      //     this.comingSoonShows["show"].push(x);

      //     i++;
      //   });
      // }
      // if (data["show"].length < 4) {
      //   this.comingSoonShows["cat_id"] = data.cat_id;
      //   this.comingSoonShows["title"] = data.title;
      //   for (let i = 0; i < data["show"].length; i++) {
      //     this.comingSoonShows["show"].push(data.show[i]);
      //     this.comingSoonCount++;
      //   }
      // }
      // else {
      //   this.comingSoonShows["cat_id"] = data.cat_id;
      //   this.comingSoonShows["title"] = data.title;
      //   for (let i = 0; i < data["show"].length; i++) {
      //     this.comingSoonShows["show"].push(data.show[i]);
      //     this.comingSoonCount++;
      //   }
      // }
    },
    loadLatestReleaseData: function (data) {
      // console.log("data", data);
      // this.visibleShows = data;
      if (data['show'].length < 4) {
        this.visibleShows['cat_id'] = data.cat_id
        this.visibleShows['title'] = data.title
        for (let i = 0; i < data['show'].length; i++) {
          this.visibleShows['show'].push(data.show[i])
          this.latestReleaseCount++
        }
      } else {
        this.visibleShows['cat_id'] = data.cat_id
        this.visibleShows['title'] = data.title
        for (let i = 0; i < 4; i++) {
          this.visibleShows['show'].push(data.show[i])
          this.latestReleaseCount++
        }
      }
    },

    loadmoreItem (val) {
      this.showLoading()
      this.pageNumber = this.pageNumber + val

      if (this.pageData.Totalpages >= this.pageNumber) {
        this.getComingSoonData()
      } else {
        this.hideLoading()
      }

      if (this.pageData.Totalpages == this.pageNumber) {
        this.isloadmoreItem = false
        this.hideLoading()
      }
      console.log('this.pageNumber', this.pageNumber)
    },

    onAfterSlideChange (index) {
      this.currentMovieDetails = this.nowShowingShows.show[index]

      // let payload = {
      //   MovieID: this.nowShowingShows.show[index].id
      // };
      // makeRequest("/GetShowDetails/", "POST", null, payload)
      //   .then(response => {
      //     const { error, res } = response;
      //     if (res.data.Status) {
      //       this.currentMovieDetails = res.data.Show[0];
      //     } else {
      //       console.log("Response Error ");
      //     }
      //   })
      //   .catch(error => {
      //     console.log("Error", error);
      //   });
    },
  },
}
</script>

<style>
.alert-dismissible {
  padding-right: 3rem !important;
}

.alert {
  padding: 0.75rem 1rem !important;
}
</style>
