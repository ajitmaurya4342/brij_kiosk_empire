<template>
  <div class="sticky-header">
    <!-- DARK OVERLAY -->
    <div class="overlay" v-if="overlay" v-on:click="openSidenav()"></div>

    <!-- MOBILE SIDEBAR -->
    <aside
      :style="langName == 'ar' ? { left: openAside } : { right: openAside }"
    >
      <header>
        <div class="d-flex justify-content-between">
          <img
            v-if="preimere == true || preimere == 'true'"
            src="@/assets/img/svg/Empire-logo-e-gold.svg"
          />
          <img v-else src="@/assets/img/svg/Empire-logo-e.svg" />

          <img
            v-if="preimere == true || preimere == 'true'"
            src="@/assets/img/svg/aside-back-black.svg"
            class="pl-3"
            v-bind:class="langName == 'ar' ? 'mob-aside-back' : ''"
            v-on:click="openSidenav()"
          />
          <img
            v-else
            src="@/assets/img/svg/aside-back.svg"
            class="pl-3"
            v-on:click="openSidenav()"
            v-bind:class="langName == 'ar' ? 'mob-aside-back' : ''"
          />
        </div>

        <img
          v-if="preimere == true || preimere == 'true'"
          src="@/assets/img/svg/dotted-line-light-black.svg"
          class="img-fluid"
        />
        <img
          v-else
          src="@/assets/img/svg/dotted-line-light.svg"
          class="img-fluid w-100"
        />
      </header>

      <div class="profile" v-if="loggedInFlag">
        <div>{{ allLanguageData.WelcomeBack }}</div>
        <div class="mb-2 user-name">{{ profileDetails.FirstName }}</div>
        <router-link
          to="/profile"
          class="btn-viewProfile"
          v-on:click.native="openSidenav()"
          >{{ allLanguageData.ViewProfile }}</router-link
        >
      </div>
      <div class="profile" v-if="!loggedInFlag">
        <div>{{ allLanguageData.WelcomeToEmpireCinemas[0] }}</div>
        <div class="mb-2">{{ allLanguageData.WelcomeToEmpireCinemas[1] }}</div>
        <router-link
          to
          class="btn-viewProfile"
          v-b-modal.login
          :class="CountryID == 102 || CountryID == '102' ? 'd-none' : ''"
        >
          <span v-on:click="openSidenav()">{{ allLanguageData.Login }}</span>
        </router-link>
      </div>

      <ul class="mob-side-list" v-bind:class="langName == 'ar' ? 'pr-0' : ''">
        <li>
          <img
            v-if="preimere == true || preimere == 'true'"
            src="@/assets/img/svg/dotted-line-light-black.svg"
            class="img-fluid"
          />
          <img
            v-else
            src="@/assets/img/svg/dotted-line-light.svg"
            class="img-fluid"
          />
        </li>
        <li>
          <router-link to v-on:click.native="openSidenav()">{{
            allLanguageData.Home
          }}</router-link>
        </li>
        <li>
          <router-link to="/book-by-cinema" v-on:click.native="openSidenav()">{{
            allLanguageData.Cinemas
          }}</router-link>
          <!-- <router-link to="/#latestMovie" v-on:click.native="openSidenav()" :class="['']">{{allLanguageData.LatestMovies}}</router-link> -->
        </li>
        <li>
          <router-link
            to="/comingSoonMovies"
            v-on:click.native="onClickComingSoon()"
            >{{ allLanguageData.ComingSoon }}</router-link
          >
        </li>
        <li
          v-if="
            CountryID == 102 ||
              CountryID == '102' ||
              CountryID == '230' ||
              CountryID == 190
          "
        >
          <router-link
            :to="
              CountryID == 102 || CountryID == '102'
                ? '/browse-by-cinema/3/'
                : '/browse-by-cinema/2/'
            "
            v-on:click.native="openSidenav()"
            >{{ allLanguageData.NowShowing }}</router-link
          >
        </li>
        <li v-else>
          <router-link to="/" v-on:click.native="openSidenav()">{{
            allLanguageData.NowShowing
          }}</router-link>
        </li>
        <li>
          <router-link to="/getApp" v-on:click.native="onClickComingSoon()">{{
            allLanguageData.GetApp
          }}</router-link>
        </li>
        <li>
          <router-link to="/scanQr" v-on:click.native="onClickComingSoon()">{{
            allLanguageData.ScanQr
          }}</router-link>
        </li>
        <li>
          <router-link to="/offers" v-on:click.native="onClickComingSoon()">{{
            allLanguageData.Offers
          }}</router-link>
        </li>
        <!-- <li
          class="d-flex align-items-center justify-content-between px-4"
          v-on:click="showMobileOfferType()"
        >
          <router-link to="/offers">{{ allLanguageData.Offers }}</router-link>
          <span class="">
            <img
              style="width: auto !important"
              src="@/assets/img/svg/chevron-down.svg"
              height="15px"
              width="auto"
              alt=""
            />
          </span>
        </li>
        <div class="m-3 border-white">
          <li v-if="IsActivedrop">
            <router-link
              v-for="(offerType, offerTypeIndex) in offerFilterTabs"
              :key="offerTypeIndex"
              to="/offers"
              v-on:click.native="onClickComingSoon()"
              >{{ offerType }}</router-link
            >
          </li>
        </div> -->

        <!-- <li>
          <router-link to="/browse-by-cinema" :class="['', $route.path == '/browseByCinema' ? 'active' : '']"
            v-on:click.native="openSidenav()">CINEMAS</router-link>
        </li>-->
        <!-- <li>
          <router-link
            to="/fb"
            :class="['', $route.path == '/fb' ? 'active' : '']"
            v-on:click.native="openSidenav()"
          >LETS EAT</router-link>
        </li>-->
        <li
          v-if="
            CountryID != '230' &&
              CountryID != 190 &&
              CountryID != 102 &&
              CountryID != '102'
          "
        >
          <router-link
            to="/bookanevent"
            :class="[
              '',
              CountryID == 102 ||
              CountryID == '102' ||
              CountryID == '230' ||
              CountryID == 190
                ? 'd-none'
                : $route.path == '/bookanevent'
                ? 'active'
                : ''
            ]"
            v-on:click.native="openSidenav()"
            >{{ allLanguageData.BookAnEvent[0] }}
            {{ allLanguageData.BookAnEvent[1] }}</router-link
          >
        </li>
        <li>
          <router-link
            to="../../assets/pdf/opera-brochure-french30-8.pdf"
            target="_blank"
            :class="CountryID == '230' || CountryID == 190 ? 'd-none' : ''"
            >{{ allLanguageData.Opera }}</router-link
          >
        </li>
        <li
          :class="
            CountryID == 102 ||
            CountryID == '102' ||
            CountryID == '230' ||
            CountryID == 230
              ? 'd-none'
              : ''
          "
        >
          <router-link
            v-if="preimere == true || preimere == 'true'"
            v-on:click.native="onclickpremiere('vip')"
            to
            class="pre-btn"
            >EMPIRE CINEMAS</router-link
          >
          <router-link
            v-else
            v-on:click.native="onclickpremiere('pre')"
            to
            class="pre-btn"
            >PREMIERE</router-link
          >
        </li>
        <li>
          <img
            v-if="preimere == true || preimere == 'true'"
            src="@/assets/img/svg/dotted-line-light-black.svg"
            class="img-fluid"
          />
          <img
            v-else
            src="@/assets/img/svg/dotted-line-light.svg"
            class="img-fluid"
          />
        </li>
        <li>
          <b-button
            class="btn-signOut"
            variant="default"
            v-on:click.stop="onUserLogout()"
            v-if="loggedInFlag"
            >{{ allLanguageData.CommonModalInputs.SignOut }}</b-button
          >
        </li>
      </ul>
      <!-- <div class=" lang-selection">
                  <ul v-bind:class="langName == 'ar' ? 'p-0':''" class="list-inline mb-0">
                    <li :class="langName == 'eng' ? 'active mr-2':''" v-on:click="saveLangToken('eng',2)" title="ENGLISH">EN</li>
                    <li :class="langName == 'ar' ? 'active mr-2':''" v-on:click="saveLangToken('ar',1)" title="ARABIC">AR</li>
                  </ul>
                </div>

      <footer>
        <img v-if="preimere == true || preimere == 'true'" src="@/assets/img/svg/emp-gold-bg-logo.svg" alt="logo" class="img-fluid aside-emp-logo">
        <img v-else src="@/assets/img/svg/Empire-logo-aside.svg" alt="logo">
        <p>&copy; EMPIRE CINEMAS WORLDWIDE</p>
      </footer>-->

      <div
        class="d-flex justify-content-between align-items-center px-4 cl-sel pt-5 pb-4"
      >
        <div>
          <p class="mb-0 font-weight-bold ftw">COUNTRY</p>
          <p class="mb-0 small text-uppercase text-center">
            {{ selectedCountry }}
          </p>
        </div>
        <div>
          <p class="mb-0 font-weight-bold ftw">LANGUAGE</p>
          <p v-if="langName == 'ar'" class="mb-0 text-center">عربي</p>
          <p v-else class="mb-0 small text-center">ENGLISH</p>
        </div>
      </div>
      <div class="mx-auto text-center my-2">
        <b-button
          @click="openLandingpage()"
          class="btn-signOut"
          variant="default"
          >CHANGE</b-button
        >
      </div>
    </aside>

    <!-- DESKTOP HEADER -->

    <header class="header">
      <div
        class="col-12 col-xl-11 mx-auto px-3 px-md-3 emp-header"
        v-bind:class="langName == 'ar' ? 'er-emp-header er-emp-red-header' : ''"
      >
        <b-navbar class="align-md-items-end px-0" toggleable="lg">
          <!-- GOLDEN EN -->

          <b-navbar-brand
            to=""
            @click.prevent="homeCallRoute"
            v-if="preimere == 'true' && langName !== 'ar'"
          >
            <img
              style="width: 194px; height: 34px"
              src="@/assets/img/EmpirePremierLogo2.png"
              class="img-fluid d-none d-md-block"
            />
            <img
              style="width: 194px; height: 34px"
              src="@/assets/img/Empire-logo-aside-gold.png"
              class="img-fluid d-md-none aside-gold-logo"
            />
          </b-navbar-brand>

          <!-- GOLDEN AR -->
          <b-navbar-brand
            to=""
            @click.prevent="homeCallRoute"
            v-else-if="preimere == 'true' && langName == 'ar'"
          >
            <img
              style="width: 194px; height: 34px"
              src="@/assets/img/ar-desk-gold-logo.png"
              class="img-fluid d-none d-md-block"
            />
            <img
              style="width: 194px; height: 34px"
              src="@/assets/img/ar-mob-gold-logo.png"
              class="img-fluid d-md-none aside-gold-logo"
            />
          </b-navbar-brand>

          <!-- RED AR -->
          <b-navbar-brand
            v-else-if="
              preimere !== 'true' && langName === 'ar' && CountryID != 230
            "
            to=""
            @click.prevent="homeCallRoute"
            class="red-logo"
          >
            <img
              style="width: 194px; height: 34px"
              src="@/assets/img/ar-desk-red-logo.png"
              class="img-fluid d-none d-md-block"
            />
            <img
              style="width: 194px; height: 34px"
              src="@/assets/img/ar-mob-red-logo.png"
              class="img-fluid d-md-none aside-gold-logo"
            />
          </b-navbar-brand>

          <!-- KSA RED AR -->
          <b-navbar-brand
            v-else-if="
              preimere !== 'true' && langName === 'ar' && CountryID == 230
            "
            to=""
            @click.prevent="homeCallRoute"
            class="red-logo"
          >
            <img
              src="@/assets/img/ksa-arabic-red-logo.png"
              class="img-fluid d-none d-md-block"
            />
            <!-- <img style="width:194px;height:34px" src="@/assets/img/ksa-arabic-red-logo.png"
            class="img-fluid d-md-none aside-gold-logo" />-->
          </b-navbar-brand>

          <!-- RED EN -->
          <b-navbar-brand
            to=""
            @click.prevent="homeCallRoute"
            v-else-if="preimere != 'true' && langName !== 'ar'"
            class="red-logo pointer-cus"
          >
            <img
              style="width: 194px; height: 34px"
              src="@/assets/img/svg/empire-logo.svg"
              class="img-fluid d-none d-md-block"
            />
            <img
              style="width: 194px; height: 34px"
              src="@/assets/img/svg/empire-logo2.svg"
              class="img-fluid d-md-none aside-gold-logo"
            />
          </b-navbar-brand>

          <div class="d-flex align-items-center d-lg-none">
            <img
              src="@/assets/img/svg/search-asset-gold.svg"
              v-on:click="openSearch(true)"
              width="30px"
              height="auto"
              v-bind:class="langName == 'ar' ? 'ml-3' : 'mr-3'"
              v-if="preimere == true || preimere == 'true'"
            />

            <img
              v-else
              src="@/assets/img/svg/search-asset.svg"
              v-on:click="openSearch(true)"
              width="30px"
              height="auto"
              v-bind:class="langName == 'ar' ? 'ml-3' : 'mr-3'"
            />
            <button class="btn-toggler" v-on:click="openSidenav()"></button>
          </div>

          <b-collapse class="align-items-md-end" is-nav id="nav_collapse">
            <!-- Center aligned nav items -->

            <b-navbar-nav
              class="mx-auto center-menu"
              v-bind:class="langName == 'ar' ? 'ar-center-nav' : ''"
            >
              <b-nav-item
                :class="langName == 'ar' ? 'left-dot' : ''"
                href="/"
                >{{ allLanguageData.Home }}</b-nav-item
              >

              <b-nav-item
                :class="langName == 'ar' ? 'left-dot' : ''"
                @click="isClickedOnNowShowing()"
                :href="
                  CountryID == '102' || CountryID == 102
                    ? '/browse-by-cinema/7'
                    : '/browse-by-cinema/3'
                "
                v-if="
                  CountryID == '102' ||
                    CountryID == 102 ||
                    CountryID == '230' ||
                    CountryID == 230
                "
                >{{ allLanguageData.NowShowing }}</b-nav-item
              >
              <b-nav-item
                v-for="(menu, menuKey) in allLanguageData.menu"
                v-bind:class="
                  menuKey == 1 && (CountryID == '230' || CountryID == 230)
                    ? langName == 'ar'
                      ? 'left-dot'
                      : ''
                    : langName == 'ar'
                    ? 'left-dot'
                    : ''
                "
                :key="menuKey"
                v-on:click.native="topNavHandler()"
                :href="menu.path"
                >{{ menu.title }}</b-nav-item
              >
              <!-- <b-nav-item href="/#comimgSoon">COMING SOON</b-nav-item> -->
              <!-- <b-nav-item  v-bind:class="langName == 'ar' ? 'left-dot':''" v-on:click.stop="topNavHandler()" :to="{ name: 'bookByCinema'}">CINEMAS</b-nav-item> -->
              <!-- <b-nav-item v-on:click.stop="topNavHandler()" to="/fb">LET'S EAT</b-nav-item> -->
              <!-- preimere -->
              <!-- // /static/pdf/erbil.pdf -->

              <b-nav-item
                href="/static/pdf/opera-brochure-french30-8.pdf"
                target="_blank"
                :class="
                  langName == 'ar'
                    ? CountryID == 230 || CountryID == '230'
                      ? 'no-dot d-none'
                      : 'left-dot'
                    : CountryID == 102 || CountryID == '102'
                    ? 'no-dot d-none'
                    : CountryID == 230 || CountryID == '230'
                    ? 'no-dot d-none'
                    : ''
                "
                >{{ allLanguageData.Opera }}</b-nav-item
              >

              <b-nav-item
                href="/getApp"
                target="_blank"
                :class="
                  langName == 'ar'
                    ? CountryID == 230 || CountryID == '230'
                      ? 'left-dot'
                      : 'no-dot'
                    : CountryID == 102 || CountryID == '102'
                    ? 'no-dot left-dot'
                    : CountryID == 230 || CountryID == '230'
                    ? ''
                    : 'no-dot'
                "
                >{{ allLanguageData.GetApp }}</b-nav-item
              >

              <div
                class="offerType-Drop"
                v-if="CountryID == 230 || CountryID == '230'"
              >
                <b-nav-item
                  href="/offers"
                  target="_blank"
                  class="dropbtn"
                  :class="
                    langName == 'ar'
                      ? CountryID == 230 || CountryID == '230'
                        ? 'no-dot'
                        : 'left-dot'
                      : CountryID == 102 || CountryID == '102'
                      ? 'no-dot left-dot'
                      : CountryID == 230 || CountryID == '230'
                      ? ''
                      : 'no-dot'
                  "
                  >{{ allLanguageData.Offers }}
                  <span class="ml-1">
                    <img
                      src="@/assets/img/svg/chevron-down.svg"
                      height="10px"
                      width="10px"
                      alt=""
                    />
                  </span>
                  <!-- <div v-if="IsActivedrop" class="offerType-Drop">
                  <b-dropdown-item
                    to="/offers"
                    v-for="(offerType, offerTypeIndex) in offerFilterTabs"
                    :key="offerTypeIndex"
                    >{{ offerType }}</b-dropdown-item
                  >
                </div> -->
                  <div class="dropdown-content">
                    <a
                      v-for="(offerType, offerTypeIndex) in offerFilterTabs"
                      :key="offerTypeIndex"
                      href="/offers"
                      >{{ offerType.Type }}</a
                    >
                  </div>
                </b-nav-item>
              </div>

              <!-- <b-nav-item
                href="/offers"
                target="_blank"
                :class="
                  langName == 'ar'
                    ? CountryID == 230 || CountryID == '230'
                      ? 'no-dot'
                      : 'left-dot'
                    : CountryID == 102 || CountryID == '102'
                    ? 'no-dot left-dot'
                    : CountryID == 230 || CountryID == '230'
                    ? ''
                    : 'no-dot'
                "
                >{{ allLanguageData.Offers }}</b-nav-item
              > -->

              <b-nav-item
                v-if="
                  (preimere == true || preimere == 'true') &&
                    (country_id == '119' || country_id == 119)
                "
                v-on:click.stop="onclickpremiere('vip')"
                href="#"
              >
                <span v-if="langName == 'ar'" class="pre-btn cus-pre-btn"
                  >EMPIRE CINEMAS</span
                >
                <span v-else class="pre-btn">EMPIRE CINEMAS</span>
              </b-nav-item>
              <!-- :class="CountryID == 102 || CountryID == '102' ||  CountryID == '230' || CountryID == 230? 'd-none' : ''" -->
              <b-nav-item
                v-else-if="country_id == '119' || country_id == 119"
                v-on:click.stop="onclickpremiere('pre')"
                href="#"
              >
                <span v-if="langName == 'ar'" class="pre-btn cus-pre-btn"
                  >PREMIERE</span
                >
                <span v-else class="pre-btn">PREMIERE</span>
              </b-nav-item>
            </b-navbar-nav>

            <!-- Right aligned nav items -->
            <div class="header-rightMenu">
              <div
                class="navlink"
                v-if="preimere == true || preimere == 'true'"
              >
                <img
                  src="@/assets/img/svg/search-asset-gold.svg"
                  class="c-pointer"
                  width="30px"
                  height="auto"
                  v-on:click="openSearch(true)"
                />
              </div>
              <div class="navlink" v-else>
                <img
                  src="@/assets/img/svg/search-asset.svg"
                  class="c-pointer"
                  width="30px"
                  height="auto"
                  v-on:click="openSearch(true)"
                />
              </div>
              <div
                class="navlink"
                :class="langName == 'ar' ? 'border-r' : 'border-l'"
                v-if="getCountryIsActive()"
              >
                <!-- CountryID != '230' && CountryID != 190 &&  CountryID != 102 && CountryID != '102' -->
                <router-link to="/bookanevent" class="d-flex text-white">
                  <img
                    src="@/assets/img/svg/book-event-icon.svg"
                    width="22px"
                    height="auto"
                  />
                  <div :class="langName == 'ar' ? 'pr-2' : 'pl-2'">
                    {{ allLanguageData.BookAnEvent[0] }}
                    <div>{{ allLanguageData.BookAnEvent[1] }}</div>
                  </div>
                </router-link>
              </div>

              <div
                :class="CountryID == 102 || CountryID == '102' ? 'd-none' : ''"
                class="navlink c-pointer border-x"
                v-if="!loggedInFlag"
                v-b-modal.login
              >
                {{ allLanguageData.Login }}
                <!-- <div>OR SIGNUP</div> -->
              </div>
              <!-- <div class="navlink c-pointer border-x" v-if="loggedInFlag">
                <b-dropdown variant="default" :text="profileDetails.FirstName">
                  <b-dropdown-item to="/profile">{{
                    allLanguageData.Profile
                  }}</b-dropdown-item>
                  <b-dropdown-item v-on:click.stop="onUserLogout()">{{
                    allLanguageData.Logout
                  }}</b-dropdown-item>
                </b-dropdown>
              </div> -->
              <div
                class="navlink c-pointer border-x"
                v-if="loggedInFlag"
                @click="profileDropdownActive()"
              >
                <div class="text-uppercase" style="user-select: none">
                  {{ profileDetails.FirstName }}
                  <span class=""
                    ><img
                      src="@/assets/img/svg/sort-down-solid.svg"
                      height="10px"
                      width="10px"
                      style="margin-bottom: 6px"
                      alt=""
                  /></span>
                </div>
              </div>
              <div class="navlink">
                <div class="d-flex align-items-center lang-selection">
                  <ul
                    v-bind:class="langName == 'ar' ? 'p-0' : ''"
                    class="list-inline mb-0"
                  >
                    <li
                      :class="langName == 'eng' ? 'active mr-2' : ''"
                      v-on:click="saveLangToken('eng', 2)"
                      title="ENGLISH"
                    >
                      EN
                    </li>
                    <li
                      :class="langName == 'ar' ? 'active mr-2' : ''"
                      v-on:click="saveLangToken('ar', 1)"
                      title="ARABIC"
                    >
                      AR
                    </li>
                  </ul>
                </div>
              </div>
              <div class="navlink">
                <router-link @click.native="openLandingpage()" to>
                  <img
                    src="@/assets/img/map-marker-alt-solid.svg"
                    height="20"
                    width="20"
                    data-toggle="tooltip"
                    data-placement="bottom"
                    title="Change Country"
                  />
                </router-link>
                <router-link
                  @click.native="openLandingpage()"
                  to=""
                  class="flag-box ml-1"
                >
                  <img
                    data-toggle="tooltip"
                    data-placement="bottom"
                    title="Saudi Arabia"
                    v-if="CountryName == 'Saudi Arabia'"
                    src="@/assets/img/SaudiArabiaFlag.png"
                    height="auto"
                    width="35"
                    alt
                  />
                  <img
                    data-toggle="tooltip"
                    data-placement="bottom"
                    title="Lebanon"
                    v-if="CountryName == 'Lebanon'"
                    src="@/assets/img/LebanonFlag.png"
                    height="auto"
                    width="35"
                    alt
                  />
                  <img
                    data-toggle="tooltip"
                    data-placement="bottom"
                    title="Iraq"
                    v-if="CountryName == 'Iraq'"
                    src="@/assets/img/IraqFlag.png"
                    height="auto"
                    width="35"
                    alt
                  />
                </router-link>
              </div>
            </div>
          </b-collapse>
        </b-navbar>
      </div>

      <div class="d-none d-lg-block">
        <div
          class="new-emp-dropdown"
          :class="isProfileDropdownActive ? 'active' : ''"
        >
          <ul class="list-unstyled mb-0">
            <li class="text-center pb-0 no-hover-effect">
              <img
                v-if="profileDetails.ProfileImage"
                :src="profileDetails.ProfileImage"
                height="65px"
                width="60px"
                class="rounded-circle"
                alt=""
              />
              <img
                v-else
                src="@/assets/img/newImages/profile-placeholder-white.svg"
                height="65px"
                width="60px"
                alt=""
              />
              <h6 class="py-3 my-0 text-uppercase">
                {{ profileDetails.FirstName }}
              </h6>
            </li>

            <li class="no-hover-effect p-0">
              <hr class="m-0 fade-line no-hover-effect" />
            </li>

            <li @click.prevent="changeProfileTabs('clubEmpire')">
              {{ allLanguageData.profileTab.MyClubEmpirePonts }}
            </li>

            <li class="no-hover-effect p-0">
              <hr class="m-0 fade-line no-hover-effect" />
            </li>

            <li @click.prevent="changeProfileTabs('booking')">
              {{ allLanguageData.profileTab.MyBooking }}
            </li>

            <li class="no-hover-effect p-0">
              <hr class="m-0 fade-line no-hover-effect" />
            </li>

            <li @click.prevent="changeProfileTabs('account')">
              {{ allLanguageData.profileTab.MyAccount }}
            </li>

            <li class="no-hover-effect p-0">
              <hr class="m-0 fade-line no-hover-effect" />
            </li>

            <li @click.prevent="changeProfileTabs('preferencess')">
              {{ allLanguageData.profileTab.MyPreferences }}
            </li>

            <li class="no-hover-effect p-0">
              <hr class="m-0 fade-line no-hover-effect" />
            </li>

            <li class="" v-on:click.stop="onUserLogout()">
              {{ allLanguageData.profileTab.LogOut }}
            </li>
          </ul>
        </div>
      </div>
    </header>

    <!-- SEARCH BAR SECTION -->
    <section class="search-section" :style="{ bottom: hideSearch }">
      <div class="container">
        <div class="d-flex">
          <input
            type="text"
            v-on:keyup="searchData()"
            v-model="searchValue"
            :placeholder="allLanguageData.SearchPlaceHolder"
            autofocus
            autocomplete="autocomplete"
          />
          <button
            class="close-search search-close-btn"
            v-on:click="openSearch(true)"
          >
            <img src="@/assets/img/svg/icon-close.svg" class="img-fluid" />
          </button>
        </div>
        <div class="search-results">
          <ul class="mt-3">
            <li
              v-on:click="movieListSearch = []"
              v-for="(movie, movieListIndex) in movieListSearch"
              :key="movieListIndex"
            >
              <router-link
                v-on:click.native="openSearch(true)"
                :to="{
                  name: 'movieDetails',
                  params: { movieId: movie.MovieID, formatId: movie.value }
                }"
                >{{ movie.label }}</router-link
              >
            </li>
          </ul>
        </div>
      </div>
    </section>

    <!-- ALL POPUP -->
    <div class="all-popup">
      <!-- FORGOT PASSWORD MODAL ENTER EMAIL-->
      <b-modal
        id="forgotpaswordemail"
        no-close-on-backdrop
        :title="allLanguageData.ForgotPasswordModal.title"
        class="loginModal text-red"
        ref="forgotpaswordemail"
      >
        <p class="pt-2 mb-0 text-center text-white">
          {{ allLanguageData.ForgotPasswordModal.Content }}
        </p>
        <div class="row my-4">
          <div class="col-md-8 col-lg-7 mx-auto">
            <b-form
              @submit.prevent="validateBeforeSubmit('forgotPasswordEmail')"
              data-vv-scope="forgotPasswordEmail"
            >
              <div class="text-center small">
                {{ errorMessage.forgotpassword }}
              </div>
              <b-form-input
                type="text"
                v-validate="'required|email'"
                name="email"
                v-model="userDetails.email"
                :placeholder="allLanguageData.CommonModalInputs.Email"
              />
              <span
                v-if="preimere == true || preimere == 'true'"
                class="text-white errorMessage"
                >{{ errors.first("forgotPasswordEmail.email") }}</span
              >
              <span v-else class="errorMessage">{{
                errors.first("forgotPasswordEmail.email")
              }}</span>
              <input
                type="submit"
                class="btn btn-green mt-3"
                :value="allLanguageData.ForgotPasswordModal.Btn"
              />
            </b-form>
          </div>
        </div>

        <div class="end-link text-center mt-3" v-if="!loggedInFlag">
          <router-link
            to
            class="text-gold font-weight-bold border-bottom-dotted"
            v-b-modal.login
            >{{ allLanguageData.login }}</router-link
          >
          <router-link
            to
            class="text-gold font-weight-bold border-bottom-dotted"
            v-b-modal.signup
            >{{ allLanguageData.SignUp }}</router-link
          >
        </div>
        <div class="text-center mt-2 last-text">
          {{ allLanguageData.CommonModalFooter.RequiredFields }}
        </div>
      </b-modal>
      <!-- FORGOT PASSWORD MODAL ENDS -->

      <!-- FORGOT PASSWORD MODAL OTP-->
      <b-modal
        id="forgotpaswordotp"
        :title="allLanguageData.OTPModal.title"
        class="loginModal text-red"
        ref="forgotpaswordotp"
      >
        <p class="pt-2 mb-0 text-center text-white">
          {{ allLanguageData.OTPModal.Content }}
        </p>
        <div class="row my-4">
          <div class="col-md-8 col-lg-7 mx-auto">
            <b-form
              @submit.prevent="validateBeforeSubmit('forgotPasswordOTP')"
              data-vv-scope="forgotPasswordOTP"
            >
              <div class="text-center small">
                {{ errorMessage.forgotpassword }}
              </div>
              <b-form-input
                type="text"
                v-validate="'required'"
                name="otp"
                v-model="userDetails.OTP"
                placeholder="OTP *"
              />
              <span
                v-if="preimere == true || preimere == 'true'"
                class="text-white errorMessage"
                >{{ errors.first("forgotPasswordOTP.otp") }}</span
              >
              <span v-else class="errorMessage">{{
                errors.first("forgotPasswordOTP.otp")
              }}</span>
              <input
                type="submit"
                class="btn btn-green mt-3"
                :value="allLanguageData.OTPModal.Btn"
              />
            </b-form>
          </div>
        </div>

        <!-- <div class="end-link text-center mt-3" v-if="!loggedInFlag">
          {{allLanguageData.AlreadyAccount}}?
          <router-link to class="text-white font-weight-bold border-bottom-dotted" v-b-modal.login>{{allLanguageData.Login}}</router-link>
          &bull; {{allLanguageData.BecomeMember}}!
          <router-link to class="text-white font-weight-bold border-bottom-dotted" v-b-modal.signup>{{allLanguageData.SignUp}}!
          </router-link>
        </div>-->
        <div class="text-center mt-2 last-text">
          {{ allLanguageData.CommonModalFooter.RequiredFields }}
        </div>
      </b-modal>
      <!-- FORGOT PASSWORD MODAL ENDS -->

      <!-- FORGOT PASSWORD MODAL reset-->
      <b-modal
        id="forgotpaswordreset"
        title="allLanguageData.ResetPasswordModal.title"
        class="loginModal text-red"
        ref="forgotpaswordreset"
      >
        <p class="pt-2 mb-0 text-center text-white">
          {{ allLanguageData.ResetPasswordModal }}
        </p>
        <div class="row my-4">
          <div class="col-md-8 col-lg-7 mx-auto">
            <b-form
              @submit.prevent="validateBeforeSubmit('forgotPasswordreset')"
              data-vv-scope="forgotPasswordreset"
            >
              <div class="text-center small">
                {{ errorMessage.forgotpassword }}
              </div>
              <b-form-input
                type="password"
                v-validate="'required'"
                name="password"
                v-model="userDetails.password"
                :placeholder="allLanguageData.CommonModalInputs.Password"
              />
              <span>{{ errors.first("forgotPasswordreset.password") }}</span>
              <b-form-input
                type="password"
                v-validate="'required'"
                name="confirmpassword"
                v-model="userDetails.confirmedPassword"
                :placeholder="allLanguageData.CommonModalInputs.ConfirmPassword"
              />
              <span>{{
                errors.first("forgotPasswordreset.confirmpassword")
              }}</span>
              <input
                type="submit"
                class="btn btn-green mt-3"
                value="allLanguageData.ResetPasswordModal.Btn"
              />
            </b-form>
          </div>
        </div>

        <div class="end-link text-center mt-3" v-if="!loggedInFlag">
          {{ allLanguageData.AlreadyAccount }}?
          <router-link
            to
            class="text-white font-weight-bold border-bottom-dotted"
            v-b-modal.login
            >{{ allLanguageData.Login }}</router-link
          >
          &bull; {{ allLanguageData.BecomeMember }}!
          <router-link
            to
            class="text-white font-weight-bold border-bottom-dotted"
            v-b-modal.signup
            >{{ allLanguageData.SignUp }}!</router-link
          >
        </div>
        <div class="text-center mt-2 last-text">
          * {{ allLanguageData.CommonModalFooter.RequiredFields }}
        </div>
      </b-modal>
      <!-- FORGOT PASSWORD MODAL ENDS -->

      <!-- CHECKOUT AS A GUEST MODAL -->
      <b-modal
        id="guest"
        :title="allLanguageData.GuestCheckoutModal.title"
        class="loginModal text-red guest-modal"
        ref="checkoutModal"
      >
        <p class="pt-2 mb-0 text-center text-white">
          {{ allLanguageData.GuestCheckoutModal.Content }}
        </p>
        <div class="row my-4 checkout-form">
          <div class="col-md-12 mx-auto">
            <b-form
              @submit.prevent="validateBeforeSubmit('checkoutUser')"
              data-vv-scope="checkoutUser"
            >
              <!-- NEW CHECKOUT DESIGN START -->
              <div v-if="showCards">
                <div class="col-9 mx-auto">
                  <div class="col-12 mb-3">
                    <small class="d-block fw-500 text-white">EMAIL ID</small>
                    <b-form-input
                      type="email"
                      v-validate="'required|email'"
                      id="email"
                      name="email"
                      v-model="userDetails.email"
                    ></b-form-input>
                    <div class="errorMessage">
                      {{ errors.first("checkoutUser.email") }}
                    </div>
                  </div>
                  <div class="col-12 mb-3 white-color-telInput">
                    <small class="d-block fw-500 text-white"
                      >MOBILE NUMBER</small
                    >
                    <vue-tel-input
                      @input="onInput"
                      :value="userDetails.phoneNumber"
                      :valid-characters-only="true"
                      name="phonenumber"
                      :inputOptions="{
                        maxlength: 10
                      }"
                      :autoDefaultCountry="false"
                      :autoFormat="false"
                      :defaultCountry="selectedCountry"
                      class="form-control emp_tel"
                    ></vue-tel-input>
                    <div class="errorMessage">
                      {{ errors.first("updateProfile.email") }}
                    </div>
                  </div>
                </div>

                <div class="col-10 mx-auto">
                  <div class="row align-items-center">
                    <div class="col-7 text-uppercase">
                      <div class="emp_new_checkbox">
                        <input
                          v-validate="'required'"
                          :required="true"
                          type="checkbox"
                          id="checkbox1"
                          name="terms"
                          v-model="userDetails.termsAndConditions"
                        />
                        <label for="checkbox1" class="check"></label>
                        <label for="checkbox1" class="check_text text-white">
                          I AGREE TO THE
                          <router-link
                            to="/ksa-terms-condition"
                            target="_blank"
                            class="text-white font-weight-bold text-uppercase"
                          >
                            TERM AND CONDITIONS</router-link
                          >*
                        </label>
                      </div>
                      <div
                        class="errorMessage text-dark font-weight-bold"
                        style="font-size: 10px"
                      >
                        {{
                          userDetails.termsAndConditions
                            ? ""
                            : "Please accept Terms and Conditions"
                        }}
                      </div>
                    </div>
                    <div class="col-5">
                      <input
                        type="submit"
                        value="CHECK OUT"
                        class="btn emp-grey-btn mw-auto w-100"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <!-- NEW CHECKOUT DESIGN END -->
              <!-- SELECT CARD -->
              <div v-if="hideCards">
                <h5 class="text-white text-center">Select Card Type</h5>
                <div class="row">
                  <div class="col-6 px-2">
                    <div
                      class="text-center pl-2 p-1 text-white small d-flex align-items-center justify-content-center w-100"
                      @click="checkCard('VisaMaster')"
                    >
                      <div
                        class="CusRadioBtn mr-1"
                        :class="
                          userDetails.selectedCard == 'VisaMaster'
                            ? 'active'
                            : ''
                        "
                      ></div>
                      <div class="c-pointer">Visa/Master</div>
                    </div>
                    <div
                      class="pb-3 px-4 pt-1"
                      :class="
                        userDetails.selectedCard == 'VisaMaster'
                          ? 'selectedImg'
                          : ''
                      "
                    >
                      <img
                        src="@/assets/img/VisaMC.jpg"
                        alt="Visa/Master Card"
                        class="img-fluid"
                      />
                    </div>
                  </div>
                  <div class="col-6 px-2">
                    <div
                      class="text-center pl-2 p-1 text-white small d-flex align-items-center justify-content-center w-100"
                      @click="checkCard('AmericanExpress')"
                    >
                      <div
                        class="CusRadioBtn mr-1"
                        :class="
                          userDetails.selectedCard == 'AmericanExpress'
                            ? 'active'
                            : ''
                        "
                      ></div>
                      <div class="c-pointer">AmericanExpress</div>
                    </div>
                    <div
                      class="pb-3 px-4 pt-1"
                      :class="
                        userDetails.selectedCard == 'AmericanExpress'
                          ? 'selectedImg'
                          : ''
                      "
                    >
                      <img
                        src="@/assets/img/American-Express.jpg"
                        alt="American Express"
                        class="img-fluid"
                      />
                    </div>
                  </div>
                </div>
                <button
                  @click="callCheckoutEvent"
                  type="btn"
                  class="btn btn-green mt-3 font-weight-bold"
                  value="PROCEED"
                >
                  PROCEED
                </button>
              </div>
            </b-form>
            <!-- </b-overlay> -->
          </div>
        </div>
        <!-- SELECT CARD -->
        <div class="end-link text-center mt-3" v-if="!loggedInFlag">
          {{ allLanguageData.AlreadyAccount }}?
          <router-link
            to
            class="text-white text-gold font-weight-bold border-bottom-dotted"
            v-b-modal.login
            >{{ allLanguageData.CommonModalInputs.Login }}</router-link
          >
          &bull; {{ allLanguageData.BecomeMember }}!
          <router-link
            to
            class="text-white text-gold font-weight-bold border-bottom-dotted"
            v-b-modal.signup
            >{{ allLanguageData.CommonModalInputs.SignUp }}</router-link
          >
        </div>
        <div v-if="!hideCards" class="text-center mt-2 last-text">
          * {{ allLanguageData.RequiredFields }}
        </div>
      </b-modal>

      <b-modal
        id="loginOld"
        :title="allLanguageData.Login"
        class="login2Modal light-red-color"
        ref="signInModalOld"
        v-bind:class="langName == 'ar' ? 'ar-login2Modal' : ''"
      >
        <div class="pt-2 mb-0 text-center font-weight-bold text-white">
          {{ allLanguageData.WelcomeBack }}
        </div>
        <!-- <div class="text-center mt-2 last-text">Learn more about your wallet »</div> -->
        <div class="row my-4">
          <div class="col-md-8 col-lg-7 mx-auto">
            <!-- @submit.prevent="validateBeforeSubmit('signIn')"
              data-vv-scope="signIn" -->
            <b-form>
              <div class="text-center small">{{ errorMessage.login }}</div>
              <b-form-input
                v-validate="'required|email'"
                name="username"
                v-model="userDetails.email"
                type="text"
                :placeholder="allLanguageData.CommonModalInputs.Email"
                class="my-2"
              />
              <div v-show="errors.has('signIn.username')" class="errorMessage">
                {{ errors.first("signIn.username") }}
              </div>

              <b-form-input
                name="password"
                v-model="userDetails.password"
                v-validate="'required'"
                type="password"
                :placeholder="allLanguageData.CommonModalInputs.Password"
              />
              <div
                v-show="errors.has('signIn.password')"
                class="errorMessage mt-2"
              >
                {{ errors.first("signIn.password") }}
              </div>
              <!-- <b-form-checkbox id="checkbox2" class="checkbox-m last-text mt-2" name="checkbox2" value="accepted"
              unchecked-value="not_accepted">Remember me</b-form-checkbox>-->

              <div class="my-2">
                <!-- <b-form-checkbox>Remember me</b-form-checkbox> -->
                <router-link
                  to
                  v-b-modal.forgotpaswordemail
                  class="last-text"
                  >{{
                    allLanguageData.CommonModalFooter.ForgotPassword
                  }}</router-link
                >
              </div>

              <input
                type="submit"
                class="btn btn-green font-weight-bold"
                :value="allLanguageData.Login"
              />
            </b-form>
          </div>
        </div>

        <div>
          <p class="mb-1 text-center">{{ allLanguageData.LoginWith }}</p>
          <div class="d-flex justify-content-center text-center">
            <fb-signin-button
              :params="fbSignInParams"
              @success="onSignFBInSuccess"
              @error="onSignFBInError"
              class="m-2 c-pointer"
            >
              <img
                v-if="preimere == true || preimere == 'true'"
                src="@/assets/img/svg/facebook-gold.svg"
                height="auto"
                width="10px"
                alt="Facebook-icon"
              />
              <img
                v-else
                src="@/assets/img/svg/facebook.svg"
                height="auto"
                width="10px"
                alt="Facebook-icon"
              />
            </fb-signin-button>
            <g-signin-button
              :params="googleSignInParams"
              @success="onGoogleSignInSuccess"
              @error="onGoogleSignInError"
              class="m-2 c-pointer"
            >
              <img
                v-if="preimere == true || preimere == 'true'"
                src="@/assets/img/svg/google-gold.svg"
                height="auto"
                width="19px"
                alt="Google-icon"
              />
              <img
                v-else
                src="@/assets/img/svg/google.svg"
                height="auto"
                width="19px"
                alt="Google-icon"
              />
            </g-signin-button>
          </div>
        </div>

        <p class="text-center mt-4">
          {{ allLanguageData.CommonModalFooter.DontHaveAccount }}
          <router-link to class="text-white text-gold" v-b-modal.signup>{{
            allLanguageData.CommonModalInputs.SignUp
          }}</router-link>
        </p>
        <p class="text-center mt-4" v-if="handleCheckout">
          {{ allLanguageData.CommonModalFooter.CheckoutAsGuest }}
          <router-link to class="text-white text-gold" v-b-modal.guest
            >GUEST</router-link
          >
        </p>

        <div class="text-center mt-1 last-text">
          * {{ allLanguageData.CommonModalFooter.RequiredFields }}
        </div>
      </b-modal>

      <!---------- SIGNUP MODAL ---------->
      <b-modal
        id="signupOLD"
        :title="allLanguageData.CommonModalInputs.SignUp"
        no-close-on-backdrop
        class="signupModal red-text"
        ref="signUpModalOLD"
      >
        <!-- v-if="modal.signUp.info"
          @submit.prevent="validateBeforeSubmit('signUp')"
          data-vv-scope="signUp" -->
        <b-form>
          <section class="signUpForm">
            <div class="row">
              <div class="col-12 errorMessage text-center h2 my-2">
                {{ errorMessage.signUp }}
              </div>
              <div class="col-md-6">
                <b-form-input
                  type="text"
                  v-validate="'required'"
                  v-model="userDetails.firstName"
                  :placeholder="allLanguageData.CommonModalInputs.FirstName"
                  name="firstname"
                />
                <div
                  v-show="errors.has('signUp.firstname')"
                  class="errorMessage"
                >
                  {{ errors.first("signUp.firstname") }}
                </div>
              </div>

              <div class="col-md-6">
                <b-form-input
                  type="text"
                  v-validate="'required'"
                  v-model="userDetails.lastName"
                  :placeholder="allLanguageData.CommonModalInputs.LastName"
                  name="lastname"
                />
                <div
                  v-show="errors.has('signUp.lastname')"
                  class="errorMessage"
                >
                  {{ errors.first("signUp.lastname") }}
                </div>
              </div>

              <div class="col-md-6">
                <b-form-input
                  type="text"
                  v-validate="'required|email'"
                  name="email"
                  v-model="userDetails.email"
                  :placeholder="allLanguageData.CommonModalInputs.Email"
                  ref="email"
                />
                <div v-show="errors.has('signUp.email')" class="errorMessage">
                  {{ errors.first("signUp.email") }}
                </div>
              </div>

              <!-- <div class="col-md-6">
                <b-form-input type="text" v-validate="'required|confirmed:email'" name="confirmemail"
                  v-model="userDetails.confirmEmail" placeholder="Confirm Email *" />
                <div v-show="errors.has('signUp.confirmemail')" class="errorMessage">
                  {{ errors.first('signUp.confirmemail') }}</div>
              </div>-->

              <div class="col-md-6">
                <!-- <div class="row align-items-center"> -->
                <!-- <div class="col-3 pr-0 country-code">
                    <b-dropdown id="dropdown-1" variant="tranparent" text="+91" class="mob-num-drop">
                      <b-dropdown-item>+91</b-dropdown-item>
                      <b-dropdown-item>+91</b-dropdown-item>
                      <b-dropdown-item>+91</b-dropdown-item>
                    </b-dropdown>
                </div>-->

                <!-- <div class="col-9"> -->
                <b-form-input
                  type="text"
                  v-validate="'required|numeric|min:8|max:10'"
                  v-model="userDetails.phoneNumber"
                  :placeholder="allLanguageData.CommonModalInputs.MobileNumber"
                  name="phonenumber"
                />
                <small class="d-block"
                  >{{ allLanguageData.CommonModalInputs.Example }}:
                  71123123</small
                >
                <!-- :placeholder="allLanguageData.CommonModalInputs.Mobile" -->
                <!-- </div> -->
                <div
                  v-show="errors.has('signUp.phonenumber')"
                  class="errorMessage"
                >
                  {{ errors.first("signUp.phonenumber") }}
                </div>
                <!-- </div>             -->
              </div>

              <div class="col-md-6">
                <b-form-input
                  type="password"
                  v-validate="'required'"
                  v-model="userDetails.password"
                  name="password"
                  :placeholder="allLanguageData.CommonModalInputs.Password"
                  ref="password"
                />
                <div
                  v-show="errors.has('signUp.password')"
                  class="errorMessage mb-2"
                >
                  {{ errors.first("signUp.password") }}
                </div>
              </div>

              <div class="col-md-6">
                <b-form-input
                  type="password"
                  v-validate="'required|confirmed:password'"
                  v-model="userDetails.confirmedPassword"
                  :placeholder="
                    allLanguageData.CommonModalInputs.ConfirmPassword
                  "
                  name="confirmpassword"
                />
                <div
                  v-show="errors.has('signUp.confirmpassword')"
                  class="errorMessage mb-2"
                >
                  {{ errors.first("signUp.confirmpassword") }}
                </div>
              </div>

              <div class="quickbook bg-transparent col-md-6">
                <div class="row">
                  <div class="col-4 pr-1">
                    <b-dropdown
                      variant="default"
                      class="emp-dropdown mr-1"
                      :text="birthDate.date1"
                    >
                      <b-dropdown-item
                        v-on:click="onSelectDate(number, 'date')"
                        v-for="(number, a) in 31"
                        :key="a"
                        >{{ number }}</b-dropdown-item
                      >
                    </b-dropdown>
                  </div>
                  <div class="col-4 px-0">
                    <b-dropdown
                      id="ddown1"
                      variant="default"
                      class="emp-dropdown mr-1"
                      :text="birthDate.month"
                    >
                      <b-dropdown-item
                        v-on:click="onSelectDate(month, 'month')"
                        v-for="(month, m) in months"
                        :key="m"
                        >{{ month }}</b-dropdown-item
                      >
                    </b-dropdown>
                  </div>
                  <div class="col-4 pl-1">
                    <b-dropdown
                      id="dropdown-right"
                      variant="default"
                      class="emp-dropdown"
                      :text="birthDate.year"
                    >
                      <b-dropdown-item
                        v-on:click="onSelectDate(year, 'year')"
                        v-for="(year, y) in years"
                        :key="y"
                        >{{ year }}</b-dropdown-item
                      >
                    </b-dropdown>
                  </div>
                </div>
              </div>
              <!-- <div class="col-md-6">
                <b-form-input type="number" v-validate="'required'" v-model="userDetails.phoneNumber"
                  placeholder="Mobile *" name="phonenumber" />
                <div v-show="errors.has('signUp.phonenumber')" class="errorMessage">
                  {{ errors.first('signUp.phonenumber') }}</div>
              </div>-->

              <div class="col-md-6">
                <div class="row align">
                  <div
                    class="col-6 form-drop quickbook bg-transparent d-flex align-items-end"
                  >
                    <b-dropdown
                      id="ddown12"
                      variant="default"
                      class="emp-dropdown mr-1"
                      :text="userDetails.gender"
                    >
                      <b-dropdown-item v-on:click="onChangeGender('Male')"
                        >Male</b-dropdown-item
                      >
                      <b-dropdown-item v-on:click="onChangeGender('Female')"
                        >Female</b-dropdown-item
                      >
                    </b-dropdown>
                  </div>
                  <!-- <div class="col-6">
                    <b-form-input type="number" v-validate="'required'" v-model="userDetails.age" name="age"
                      placeholder="Age" />
                  </div>-->
                  <div class="col-12 errorMessage text-right">
                    {{ errors.first("signUp.age") }}
                  </div>
                </div>
              </div>

              <div class="col-12 my-4 text-center">
                <b-form-checkbox
                  v-validate="'required'"
                  :required="true"
                  name="terms"
                  v-model="userDetails.acceptedTerms"
                  id="checkbox3"
                >
                  {{ allLanguageData.CommonModalFooter.TnC[0] }}
                  <router-link
                    to="/terms-condition"
                    target="_blank"
                    class="text-white font-weight-bold text-gold"
                  >
                    <span class="text-white text-gold font-weight-bold">{{
                      allLanguageData.CommonModalFooter.TnC[1]
                    }}</span> </router-link
                  >*
                </b-form-checkbox>
                <div class="errorMessage">
                  {{
                    userDetails.acceptedTerms
                      ? ""
                      : "Please accept Terms and Conditions"
                  }}
                </div>
              </div>

              <div class="col-12">
                <input
                  type="submit"
                  class="btn btn-green font-weight-bold"
                  :value="allLanguageData.CommonModalInputs.SignUp"
                />
              </div>

              <div class="col-12 errorMessage text-center my-3">
                {{ allLanguageData.AlreadyAccount }}?
                <span v-b-modal.login class="text-white c-pointer text-gold">{{
                  allLanguageData.Login
                }}</span>
              </div>
            </div>
          </section>
        </b-form>
        <!-- v-if="modal.signUp.OTP"
          @submit.prevent="validateBeforeSubmit('signUpVerifyOTP')"
          data-vv-scope="signUpVerifyOTP" -->
        <b-form>
          <div class="row my-2 mx-0">
            <!-- v-model="userDetails.OTP" -->
            <b-form-input
              type="number"
              v-validate="'required'"
              placeholder="Please enter the code sent to your email address"
              class="my-3"
            />
          </div>
          <input type="submit" class="btn btn-green mt-2" value="SUBMIT" />
        </b-form>

        <div class="text-center mt-2 last-text">Log in with</div>

        <div class="text-center" style="display: flex; justify-content: center">
          <fb-signin-button
            :params="fbSignInParams"
            @success="onSignFBInSuccess"
            @error="onSignFBInError"
            class="m-2 c-pointer"
          >
            <img
              v-if="preimere == true || preimere == 'true'"
              src="@/assets/img/svg/facebook-gold.svg"
              height="auto"
              width="10px"
              alt="Facebook-icon"
            />
            <img
              v-else
              src="@/assets/img/svg/facebook.svg"
              height="auto"
              width="10px"
              alt="Facebook-icon"
            />
          </fb-signin-button>

          <g-signin-button
            :params="googleSignInParams"
            @success="onGoogleSignInSuccess"
            @error="onGoogleSignInError"
            class="m-2 c-pointer"
          >
            <img
              v-if="preimere == true || preimere == 'true'"
              src="@/assets/img/svg/google-gold.svg"
              height="auto"
              width="19px"
              alt="Google-icon"
            />
            <img
              v-else
              src="@/assets/img/svg/google.svg"
              height="auto"
              width="19px"
              alt="Google-icon"
            />
          </g-signin-button>
          <!-- <router-link to="">
            <img src="@/assets/img/svg/facebook.svg" width="11px" height="auto" class="mr-3"></router-link>

          <router-link to=""><img src="@/assets/img/svg/google.svg" width="21px" height="auto"></router-link>-->
        </div>

        <div class="text-center last-text">
          * {{ allLanguageData.CommonModalFooter.RequiredFields }}
        </div>
      </b-modal>

      <!----------- SESSION TIMEOUT MODAL ---------->
      <b-modal
        no-close-on-esc
        no-close-on-backdrop
        hide-header-close
        ref="sessionTimeOut"
        id="sessionTimeOut"
        :title="allLanguageData.SessionTimeOutModal.title"
        class="huModal light-red-color"
      >
        <p class="pt-2 mb-0 text-center font-weight-bold text-white">
          {{ allLanguageData.SessionTimeOutModal.Content1 }}!
        </p>
        <!-- <h4 class="pt-2 mb-0 text-center font-weight-bold text-white">02:00 minutes</h4> -->
        <p class="pt-2 text-center font-weight-bold text-white">
          {{ allLanguageData.SessionTimeOutModal.Content2 }}
        </p>
        <b-button class="btn btn-green" v-on:click="goBackHistory()">{{
          allLanguageData.SessionTimeOutModal.Btn
        }}</b-button>
      </b-modal>

      <!----------- RULES OF ENTRY MODAL ---------->
      <!-- <button  v-b-modal.ruleOfCountry> click</button> -->
      <div class="ruleofcountrymodal">
        <b-modal
          no-close-on-esc
          no-close-on-backdrop
          hide-header
          hide-footer
          hide-header-close
          ref="ruleOfCountry"
          id="ruleOfCountry"
          title=" "
          class
        >
          <div class="ruleofcountry px-3 py-2">
            <h5 class="title">Rules of Entry</h5>
            <div class="row py-4 mx-auto align-items-center">
              <div class="col-3 text-center text-md-right pr-md-0">
                <img
                  src="@/assets/img/R15.svg"
                  height="60px"
                  width="60px"
                  alt="img"
                />
              </div>
              <div class="col-8">
                <p class="rule-warning mb-0">
                  The following content is prohibited for viewers below the age
                  of 15.
                </p>
              </div>
            </div>

            <div class="rules-list">
              <p>
                <span>.</span> No children under 3 years of age are permitted to
                any screenings.
              </p>
              <p>
                <span>.</span> Please note tickets once purchased, it can't be
                refunded or exchanged.
              </p>
              <p>
                <span>.</span> Outside food and drink are not allowed in the
                cinema.
              </p>
              <p>
                <span>.</span> No admission will be allowed without ID as proof
                of age.
              </p>
            </div>

            <div class="text-center">
              <h6 class="title mb-0">I agree to comply with the</h6>
              <p>Terms & Conditions and House Rules</p>
              <div class="mx-auto text-center direction-class">
                <div class="row">
                  <div class="col-6 col-md-4 offset-md-2 pr-1">
                    <b-button variant="default" class="btn btn-green"
                      >I Agree</b-button
                    >
                  </div>

                  <div class="col-6 col-md-4 pl-1">
                    <b-button variant="default" class="btn btn-green"
                      >Cancel</b-button
                    >
                  </div>
                </div>
              </div>
            </div>
          </div>
        </b-modal>
      </div>
      <!----------- ERROR MODAL ---------->
      <b-modal
        no-close-on-esc
        no-close-on-backdrop
        hide-header-close
        id="errorModal"
        ref="errorModal"
        :title="allLanguageData.ErrorModal.title"
        class="ErModal light-red-color"
      >
        <img
          class="mx-auto d-block mt-4"
          src="@/assets/img/svg/alert-icon.svg"
          width="45"
          height="auto"
        />
        <h6 class="pt-3 mb-0 text-center font-weight-bold text-white">
          {{ allLanguageData.ErrorModal.Content1 }}...
        </h6>
        <h6 class="pt-2 text-center font-weight-bold text-white">
          {{ allLanguageData.ErrorModal.Content2 }}!
        </h6>
        <b-button
          @click="onClickOk()"
          variant="default"
          class="btn btn-green mt-4 mb-3"
          >{{ allLanguageData.ErrorModal.Btn }}</b-button
        >
      </b-modal>

      <!----------- ADVRT MODAL ---------->
      <!-- <b-modal
        no-close-on-esc
        no-close-on-backdrop
        hide-header-close
        id="advtModal"
        ref="advtModal"
        title="allLanguageData.ErrorModal.title"
        class="ErModal light-red-color"
      >
        <img
          class="mx-auto d-block mt-4"
          src="@/assets/img/svg/alert-icon.svg"
          width="45"
          height="auto"
        />
        <h6
          class="pt-3 mb-0 text-center font-weight-bold text-white"
        >{{allLanguageData.ErrorModal.Content1}}...</h6>
        <h6
          class="pt-2 text-center font-weight-bold text-white"
        >{{allLanguageData.ErrorModal.Content2}}!</h6>
        <b-button
          @click="onClickOk()"
          variant="default"
          class="btn btn-green mt-4 mb-3"
        >{{allLanguageData.ErrorModal.Btn}}</b-button>
      </b-modal>-->

      <div class="advt-modal">
        <b-modal
          id="advtModal"
          hide-footer
          hide-header
          ref="advtModal"
          centered
          title="BootstrapVue"
        >
          <div class="p-3 advt-box text-center">
            <img
              src="@/assets/img/svg/close-icon-black.svg"
              alt
              class="close-icon"
              v-on:click="closeAdvt()"
            />
            <!-- <img
              v-if="CountryID == 102 || CountryID == '102'"
              src="@/assets/img/ab2.jpg"
              class="img-fluid"
            />
            <img v-else src="@/assets/img/bala_hyba.jpg" class="img-fluid" />-->
            <img
              :src="promotionData.AdvertisementImage"
              alt
              class="img-fluid"
            />
            <!-- <p
              v-if="CountryID == 102 || CountryID == '102'"
              class="text-center font-weight-bold my-2"
              style="font-size:15px"
            >
              Call us and book your tickets in advance
              <br />for #AngryBirdsMovie2!
              <br />0750 2 100 100 | 0750 2 200 200
            </p>
            <p
              v-else
              class="text-center font-weight-bold my-2"
            >Book your tickets in advance for #BalaHayba</p>-->
            <p
              v-html="promotionData.Title"
              class="fs-14 text-center font-weight-bold my-2"
            ></p>

            <b-button
              v-if="promotionData.isBook != 0 || promotionData.isBook != '0'"
              variant="default"
              class="btn-showTickets active w-50 mx-auto justify-content-center"
              v-on:click="
                onClickBookNow(promotionData.MovieID, promotionData.formatID)
              "
            >
              <!-- :to="{ name: 'movieDetails', params: { movieId: 58, formatId: 121}}" -->
              <svg viewBox="0 0 18.15 18.15">
                <g id="Layer_2" data-name="Layer 2">
                  <g id="Layer_1-2" data-name="Layer 1">
                    <path
                      class="icon-ticket"
                      d="M6.76,18H6.67c-.56-.57-1.12-1.14-1.69-1.7a.41.41,0,0,1-.11-.56,1.79,1.79,0,0,0-1.36-2.56,6.84,6.84,0,0,0-1.57.16L.18,11.48s0-.06,0-.09a4.46,4.46,0,0,0,.37-.3L7.36,4.27l.44-.41.77.93.72-.72-1-.77c.7-.7,1.34-1.33,2-2C10.67,1,11,.56,11.39.18h.09L13.41,2c-.6,1.21-.56,2,.09,2.64s1.41.69,2.62.1L18,6.67v.09L15.59,9.07c-.24.23-.46.49-.77.83l-.81-1-.73.7,1.05.84a5,5,0,0,0-.48.36L7.06,17.6A4.36,4.36,0,0,0,6.76,18ZM9.62,5.71l.84.93L11,6.08l-.85-.92Zm2.49,1.37-.56.49.8,1L13,7.95Z"
                    />
                  </g>
                </g>
              </svg>
              {{ allLanguageData.QuickBook.Button }}
            </b-button>
          </div>
        </b-modal>
      </div>

      <!-- ******************************************************************************************************* -->

      <!----------- NEW LOGIN/SIGNUP MODAL ---------->
      <div class="emp_new_modal emp-loyalty-modal">
        <b-modal
          hide-footer
          id="login"
          centered
          ref="signInModal"
          size="lg"
          v-bind:class="langName == 'ar' ? 'ar-login2Modal' : ''"
        >
          <template slot="modal-header">
            <div class="row w-100 align-items-center">
              <div class="pr-0 col-1 mb-3 mb-md-0">
                <div
                  class="d-block bg-emp-red"
                  style=" height: 3px; width: 100%"
                ></div>
              </div>
              <div class="col-10">
                <h6
                  v-if="loginTab"
                  class="hiw-title text-light mb-0 font-weight-bold"
                >
                  {{ allLanguageData.LoginToEnjoy }}
                </h6>
                <h6
                  v-if="signupTab"
                  class="hiw-title text-light mb-0 font-weight-bold"
                >
                  {{ allLanguageData.SignUpToEnjoy }}
                </h6>
              </div>
              <span class="new-closeBtn" @click="hideLoginModal">X</span>
            </div>
          </template>

          <div class="emp_new_modal_body py-md-4 py-4">
            <div class="mx-auto" :class="loginTab ? 'col-10' : 'col-11'">
              <div class="row">
                <!-- LOGIN SECTION START -->
                <div v-if="loginTab" class="col-12 col-md-6 mb-3 mb-md-0">
                  <!-- LOGIN FORM  -->
                  <b-form
                    @submit.prevent="validateBeforeSubmit('signIn')"
                    data-vv-scope="signIn"
                  >
                    <div
                      class="text-center text-danger small mb-2 font-weight-bold"
                    >
                      {{ errorMessage.login }}
                    </div>
                    <div class="mb2_5">
                      <b-form-input
                        v-validate="'required|email'"
                        name="username"
                        v-model="userDetails.email"
                        type="text"
                        :placeholder="allLanguageData.EMAIL"
                      ></b-form-input>
                      <div
                        v-show="errors.has('signIn.username')"
                        class="errorMessage text-danger"
                      >
                        {{ errors.first("signIn.username") }}
                      </div>
                    </div>

                    <div class="mb2_5">
                      <b-form-input
                        name="password"
                        v-model="userDetails.password"
                        v-validate="'required'"
                        type="password"
                        :placeholder="allLanguageData.PASSWORD"
                      ></b-form-input>
                      <div
                        v-show="errors.has('signIn.password')"
                        class="errorMessage text-danger"
                      >
                        {{ errors.first("signIn.password") }}
                      </div>
                    </div>

                    <div class="my-2 text-right">
                      <router-link
                        to
                        v-b-modal.forgotpaswordemail
                        class="last-text text-danger"
                        >{{
                          allLanguageData.CommonModalFooter.ForgotPassword
                        }}</router-link
                      >
                    </div>

                    <input
                      type="submit"
                      class="btn emp-red-btn mt-1"
                      :value="allLanguageData.Login"
                    />
                  </b-form>
                  <!-- LOGIN FORM END -->

                  <div class="mt-3">
                    <div class="row">
                      <div class="col-6">
                        <div
                          class="btn emp-grey-btn px-0 min-w-auto"
                          @click="switchPopupTab('signup')"
                        >
                          {{ allLanguageData.GoToSignup }}
                        </div>
                      </div>
                      <div class="col-6">
                        <div
                          v-if="handleCheckout"
                          class="btn emp-grey-btn px-0 min-w-auto"
                          v-b-modal.guest
                        >
                          {{
                            allLanguageData.CommonModalFooter
                              .CheckoutAsGuestOnly
                          }}
                        </div>

                        <!-- <p class="text-center mt-4" v-if="handleCheckout">
          {{ allLanguageData.CommonModalFooter.CheckoutAsGuest }}
          <router-link to class="text-white text-gold" v-b-modal.guest
            >GUEST</router-link
          >
        </p> -->
                      </div>
                    </div>
                  </div>
                </div>
                <!-- LOGIN SECTION END -->
                <!-- ************************************************************* -->
                <!-- SIGNUP SECTION START -->
                <div v-if="signupTab" class="col-12 col-md-6 mb-3 mb-md-0">
                  <!-- SIGNUP FORM  -->
                  <b-form
                    v-if="modal.signUp.info"
                    @submit.prevent="validateBeforeSubmit('signUp')"
                    data-vv-scope="signUp"
                  >
                    <div
                      class="text-center text-danger small mb-2 font-weight-bold"
                    >
                      {{ errorMessage.signUp }}
                    </div>
                    <div class="mb2_5">
                      <b-form-input
                        type="text"
                        v-validate="'required'"
                        v-model="userDetails.firstName"
                        placeholder="FIRST NAME"
                        name="firstname"
                      ></b-form-input>
                      <div
                        v-show="errors.has('signUp.firstname')"
                        class="errorMessage text-danger"
                      >
                        {{ errors.first("signUp.firstname") }}
                      </div>
                    </div>
                    <div class="mb2_5">
                      <b-form-input
                        type="text"
                        v-validate="'required'"
                        v-model="userDetails.lastName"
                        placeholder="LAST NAME"
                        name="lastname"
                      ></b-form-input>
                      <div
                        v-show="errors.has('signUp.lastname')"
                        class="errorMessage text-danger"
                      >
                        {{ errors.first("signUp.lastname") }}
                      </div>
                    </div>
                    <div class="mb2_5">
                      <b-form-input
                        name="Birth Date"
                        type="date"
                        v-model="userDetails.birthDate"
                        placeholder="DD/MM/YYYY"
                      ></b-form-input>
                      <div
                        v-show="errors.has('signUp.Birth Date')"
                        class="errorMessage text-danger"
                      >
                        {{ errors.first("signUp.Birth Date") }}
                      </div>
                    </div>
                    <div class="mb2_5">
                      <div class="d-flex mt-2 align-items-center">
                        <div>
                          <b-form-radio
                            v-model="userDetails.gender"
                            v-on:change="onGenderChange('Male')"
                            value="Male"
                            name="some-radios "
                            class="small fw-500 lh-input"
                            >{{ allLanguageData.Male }}</b-form-radio
                          >
                        </div>
                        <div>
                          <b-form-radio
                            v-model="userDetails.gender"
                            v-on:change="onGenderChange('Female')"
                            value="Female"
                            name="some-radios"
                            class="small fw-500 lh-input"
                            >{{ allLanguageData.Female }}</b-form-radio
                          >
                        </div>
                      </div>
                    </div>
                    <div class="mb2_5">
                      <b-form-input
                        type="text"
                        v-validate="'required|email'"
                        name="email"
                        v-model="userDetails.email"
                        placeholder="EMAIL"
                        ref="email"
                      ></b-form-input>
                      <div
                        v-show="errors.has('signUp.email')"
                        class="errorMessage text-danger"
                      >
                        {{ errors.first("signUp.email") }}
                      </div>
                    </div>

                    <div class="mb2_5">
                      <b-form-input
                        type="password"
                        v-validate="'required'"
                        v-model="userDetails.password"
                        name="password"
                        placeholder="CREATE PASSWORD"
                        ref="password"
                      ></b-form-input>
                      <div
                        v-show="errors.has('signUp.password')"
                        class="errorMessage text-danger"
                      >
                        {{ errors.first("signUp.password") }}
                      </div>
                    </div>

                    <div class="mb2_5">
                      <b-form-input
                        type="password"
                        v-validate="'required|confirmed:password'"
                        v-model="userDetails.confirmedPassword"
                        placeholder="CONFIRM PASSWORD"
                        name="confirmpassword"
                      ></b-form-input>
                      <div
                        v-show="errors.has('signUp.confirmpassword')"
                        class="errorMessage text-danger"
                      >
                        {{ errors.first("signUp.confirmpassword") }}
                      </div>
                    </div>

                    <div class="mb2_5">
                      <!-- v-validate="'required|numeric|min:8|max:10'" -->
                      <!-- <vue-tel-input
                    :enabledCountryCode="true"
                    v-model="userDetails.phoneNumber"
                    :placeholder="
                      allLanguageData.CommonModalInputs.MobileNumber
                    "
                    name="phonenumber"
                    class="form-control emp_tel"
                  ></vue-tel-input> -->
                      <!-- :valid-characters-only="true" -->
                      <vue-tel-input
                        @input="onInput"
                        name="phonenumber"
                        :inputOptions="{
                          maxlength: 10
                        }"
                        placeholder="MOBILE NUMBER"
                        defaultCountry="SA"
                        :autoDefaultCountry="false"
                        :autoFormat="false"
                        class="form-control emp_tel"
                      ></vue-tel-input>

                      <small class="d-block fs-10 text-right"
                        >{{ allLanguageData.CommonModalInputs.Example }}:
                        711231233</small
                      >
                      <div
                        v-show="errors.has('signUp.phonenumber')"
                        class="errorMessage text-danger mb-2 pt-0"
                      >
                        {{ errors.first("signUp.phonenumber") }}
                      </div>
                    </div>
                    <!-- <div class="row mb-2">
                  <div class="col-7 pr-0">
                    <b-form-input
                      v-model="text"
                      placeholder="Enter your name"
                    ></b-form-input>
                  </div>
                  <div class="col-5 pl-0">
                    <vue-tel-input
                      v-model="phone"
                      class="pl-0 form-control"
                    ></vue-tel-input>
                  </div>
                </div> -->
                    <div class="my-4">
                      <div class="emp_new_checkbox mb-2">
                        <input
                          type="checkbox"
                          id="checkboxnew"
                          v-model="
                            userDetails.newslatteremempirecinemanotification1
                          "
                        />
                        <label for="checkboxnew" class="check"></label>
                        <label for="checkboxnew" class="check_text"
                          >I am interested in receiving information about new
                          movies and promotions.
                        </label>
                      </div>

                      <div class="emp_new_checkbox">
                        <input
                          v-validate="'required'"
                          :required="true"
                          name="terms"
                          v-model="userDetails.acceptedTerms"
                          id="checkboxNew"
                          type="checkbox"
                        />
                        <label for="checkboxNew" class="check mb-0"></label>
                        <label for="checkboxNew" class="check_text"
                          >By accepting and providing my personal information I
                          am consenting to Empire Cinemas Privacy Policy, as
                          well as the applicable data protection laws.
                          <!-- <router-link
                        to="/terms-condition"
                        target="_blank"
                        class="font-weight-bold"
                      >
                        <span class="font-weight-bold text-newRed">*</span></router-link
                      > -->
                        </label>
                      </div>
                      <div class="errorMessage text-danger">
                        {{
                          userDetails.acceptedTerms
                            ? ""
                            : "Please accept Terms and Conditions"
                        }}
                      </div>
                    </div>

                    <input
                      type="submit"
                      class="btn emp-red-btn"
                      :value="allLanguageData.CommonModalInputs.SignUp"
                    />
                  </b-form>

                  <b-form
                    v-if="modal.signUp.OTP"
                    @submit.prevent="validateBeforeSubmit('signUpVerifyOTP')"
                    data-vv-scope="signUpVerifyOTP"
                  >
                    <div class="row my-2 mx-0">
                      <b-form-input
                        type="number"
                        v-validate="'required'"
                        v-model="userDetails.OTP"
                        placeholder="Please enter the code sent to your email"
                        class="my-3"
                      />
                    </div>
                    <input
                      type="submit"
                      class="btn emp-red-btn"
                      :value="submitText"
                    />
                  </b-form>
                  <!-- SIGNUP FORM END -->
                  <div class="mt-3">
                    <div
                      class="btn emp-grey-btn px-0 min-w-auto"
                      @click="switchPopupTab('login')"
                    >
                      BACK TO SIGN IN
                    </div>
                  </div>
                </div>
                <!-- SIGNUP SECTION END -->

                <div class="col-12 col-md-1 mb-3 mb-md-0">
                  <div class="emp_new_orText">
                    <span class="py-3 mx-3 mx-md-0">OR</span>
                  </div>
                </div>

                <div
                  class="col-12 col-md-5 mb-3 mb-md-0 align-self-center text-center"
                >
                  <div class="">
                    <fb-signin-button
                      :params="fbSignInParams"
                      @success="onSignFBInSuccess"
                      @error="onSignFBInError"
                    >
                      <div class="new_social_btn fb_btn mb-3">
                        JOIN WITH FACEBOOK
                      </div>
                    </fb-signin-button>
                    <g-signin-button
                      :params="googleSignInParams"
                      @success="onGoogleSignInSuccess"
                      @error="onGoogleSignInError"
                    >
                      <div class="new_social_btn g_btn">JOIN WITH GOOGLE</div>
                    </g-signin-button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </b-modal>
      </div>
    </div>
  </div>
</template>

<script>
import { Slide } from 'vue-burger-menu' // import the CSS transitions you wish to use, in this case we are using `Slide`
import { makeRequest } from '@/helper/internet.js'
import axios from 'axios'
import $ from 'jquery'
import OtpInput from '@/components/OTP/OtpInput.vue'

import {
  LanguageService,
  CountryService,
  TokenService,
} from '@/services/storage.service'
import { EventBus } from '@/main'

// import language json

export default {
  components: {
    Slide, // Register your component
    OtpInput, // Register your component
  },
  data () {
    return {
      isProfileDropdownActive: false,
      submitText: 'SUBMIT',
      signupTab: false,
      isSendOtpClicked: false,
      isCheckOtpValid: false,
      isResendOtp: false,
      otpResponse: '',
      phoneNumberErr: false,
      emailErr: false,
      otpErr: false,
      checkoutShow: false,
      otp: {
        value: null,
      },
      verified: {
        phoneNumber: null,
        Email: null,
        countryCode: null,
      },
      loginTab: true,
      text: '',
      newmodalShow: true,
      languageData: {},
      country_id: '',
      lang: 'eng',
      showCards: true,
      hideCards: false,
      profileDetails: {},
      overlay: false,
      countryCode: '',
      selectedCountry: 'SA',
      openAside: '-320px',
      hideSearch: '-100vh',
      fbSignInParams: {
        scope: 'email',
        return_scopes: false,
      },
      googleSignInParams: {
        client_id:
          // "608518206441-vmd0dou7gia9nsq9vkc7ps38bccsc1so.apps.googleusercontent.com"
          // "193276772057-94fl0er49a467hjm0m1jmpnm7ondunjf.apps.googleusercontent.com"
          // "556054411694-g74ogb6nm2p0257ri8ci4i8an7064ct8.apps.googleusercontent.com"
          '778651711885-p2be0lt57lnk6gfsl5hoo57u11er94la.apps.googleusercontent.com',
      },
      birthDate: {
        date1: 'Date',
        month: 'Month',
        year: 'Year',
      },
      contactUsDeatils: {
        Name: '',
        Mobile: '',
        Email: '',
        Message: '',
        errorMessage: '',
      },
      months: [
        'Jan',
        'Febr',
        'Mar',
        'Apr',
        'May',
        'June',
        'July',
        'Aug',
        'Sept',
        'Oct',
        'Nov',
        'Dec',
      ],
      years: [],
      selectedCountry: '',
      loggedInFlag: false,
      countries: [],
      country: '',
      city: '',
      countrySelected: '',
      citySelected: '',
      onScroll: true,
      forgotPasswordSection: 0,
      page: '',
      cityDropDown: false,
      searchValue: '',
      movieListSearch: [],
      mobileSearch: false,
      searchQuery: '',
      options: {
        placeholder: 'Search',
        inputClass: 'header-input-box form-control',
        inputMainClass: 'header-input-box form-control',
      },
      mobileOptions: {
        placeholder: 'Search',
        inputClass: 'sb-search-input',
        inputMainClass: '',
      },
      resErrorMessage: {
        signUpError: '',
        signInError: '',
      },
      loginErrorMessage: 'Please Enter Your Credentials',
      registerErrorMessage: 'ENTER CONTACT INFORMATION',
      errorMessageStatus: {
        userName: false,
        email: false,
        phoneNumber: false,
        password: false,
        conditions: false,
      },
      classFlag: {
        onSignUp: '',
        onOTP: '',
        otpComplete: '',
        onSignIn: '',
      },
      // User Details
      userDetails: {
        selectedCard: 'VisaMaster',
        redirectURL: '/RedirectPayment',
        termsAndConditions: true,
        acceptedTerms: true,
        errorMessage: '',
        confirmEmail: '',
        username: '',
        password: '',
        firstName: '',
        gender: 'Male',
        lastName: '',
        email: '',
        birthDate: '',
        phoneNumber: '',
        confirmedPassword: '',
        countryCode: '966',
        OTP: '',
        newslatteremempirecinemanotification1: 0,
        Status: true,
        userID: null,
      },
      offerFilterTabs: [],
      NewOTP: '',
      promotionData: {},
      modal: {
        signUp: {
          info: true,
          OTP: false,
        },
        signIn: {
          info: true,
          OTP: false,
        },
      },
      errorMessage: {
        login: '',
        forgotpassword: '',
        signUp: '',
        checkout: '',
      },
      socialLoginError: {
        error: '',
      },
      IsActivedrop: false,
      loginData: {
        loginInput: {
          email: '',
          password: '',
          conditions: false,
        },
        errorMessageStatus: {
          email: false,
          password: false,
          conditions: false,
        },
        button: true,
      },
      langName: 'eng',
      preimere: false,
      emailReg: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/,
      handleCheckout: false,
      errorDob: '',
      errorGender: '',
    }
  },
  watch: {
    $route (to, from) {
      let lang = LanguageService.getLanguage()
      let langName = 'eng'
      if (lang == null) {
        langName = 'eng'
      } else {
        langName = lang['lang']
      }
      if (langName == 'ar') {
        document.body.classList.add('rtl-class')
      } else {
        document.body.classList.remove('rtl-class')
      }
    },
  },
  beforeMount () {
    this.countryCode = JSON.parse(
      window.localStorage.getItem('country')
    ).CountryID
    this.CountryName =
      window.localStorage.getItem('CountryName') || 'Select Country'
    this.getGeoLocation()
    // get lang token, set value in data
    let token = TokenService.getToken()
    if (token) {
      this.getUserDetails()
    }
    this.checkToken()
    for (var i = new Date().getFullYear(); i > 1900; i--) {
      this.years.push(i)
    }
    let lang = LanguageService.getLanguage()
    let langName = 'eng'
    if (window.location.host.includes('premiere')) {
      window.localStorage.setItem('PREIMERE', true)
    }
    if (lang == null) {
      // langName = "eng";
      // window.location.pathname = "/landingpage"1;
    } else {
      langName = lang['lang']
    }
    this.langName = langName
    if (
      window.location.host == 'empirepremiere.com' ||
      window.location.host == 'lb.empirecinemas.com'
    ) {
      this.country_id = 119
    } else if (window.location.host == 'ksa.empirecinemas.com') {
      this.country_id = 230
    } else if (window.location.host == 'irq.empirecinemas.com') {
      this.country_id = 102
    }
    console.log(this.country_id)
  },
  mounted: function () {
    this.getAllOffers()
    this.getPromotionList()
    this.preimere = window.localStorage.getItem('PREIMERE')
    this.selectedCountry =
      window.localStorage.getItem('CountryName') || 'LEBANON'

    if (this.langName == 'ar') {
      document.body.classList.add('rtl-class')
      document.documentElement.setAttribute('lang', 'ar')
    } else if (this.langName == 'eng') {
      document.documentElement.setAttribute('lang', 'en')
      document.body.classList.remove('rtl-class')
    }
    EventBus.$on('getUserDetailsAndCheckout', user => {
      this.checkoutFlag = true
      this.handleCheckout = true
      this.checkoutProcess()
      this.getCountryCode()
    })
    EventBus.$on('UserLogin', () => {
      this.checkToken()
    })
    EventBus.$on('isUserNotLogin', () => {
      //  this.$bvModal.show('login')
      this.$refs.signInModal.show()
    })
    // sessionTimeOut
    EventBus.$on('updateProfile', userName => {
      this.profileDetails.FirstName = userName
    })
    // EventBus.$on("hideGuestCheckout", () => {
    //   this.handleCheckout = false;
    // });
  },

  methods: {
    onGenderChange: function (value) {
      this.userDetails.gender = value
    },
    profileDropdownActive () {
      this.isProfileDropdownActive = !this.isProfileDropdownActive
    },
    homeCallRoute () {
      let getLang = JSON.parse(localStorage.getItem('language'))
      if (getLang.lang_id == 1) {
        this.$router.replace({
          path: '/ar',
        })
      } else {
        this.$router.replace({
          path: '/',
        })
      }
    },
    openLandingpage: function () {
      window.location.href = 'https://empirecinemas.com'
    },
    showMobileOfferType: function () {
      this.IsActivedrop = !this.IsActivedrop
    },
    getAllOffers () {
      makeRequest('/Offerlist', 'POST', null, null)
        .then(result => {
          const { error, res } = result
          const { data } = res.data
          if (!error && res.data.Status) {
            this.offerFilterTabs = res.data.OfferType
          } else {
            console.log('object')
          }
        })
        .catch(error => {
          console.log('error', error)
        })
    },
    isClickedOnNowShowing: function () {
      window.localStorage.removeItem('cinemaD')
    },
    changeProfileTabs: function (type) {
      //  EventBus.$emit("pTabChange", type);
      localStorage.setItem('profileTabType', type)
      this.isProfileDropdownActive = false
      this.$nextTick(() => {
        this.$router.push({ path: '/profile' })
      })
      // this.$router.push({ path: "/profile" });
    },
    onOTPValue: ({ ...payload }) => {
      // console.log("payload..pratz-1 :>> ", payload);
      // console.log("payload..pratz-2 :>> ", payload.value);
      // this.NewOTP = payload.value;
      // console.log("payload..pratz-3 :>> ", this.NewOTP);
    },
    resetVerifyUserErrors (event) {},
    onInput (formattedNumber, { number, valid, country }) {
      this.userDetails.phoneNumber = formattedNumber
      this.userDetails.CountryCode = country.dialCode
      console.log(
        'object :>>this.userDetails.CountryCode',
        this.userDetails.CountryCode
      )
    },
    switchPopupTab: function (value) {
      if (value == 'signup') {
        this.signupTab = true
        this.loginTab = false
        this.modal.signUp.info = true
        this.modal.signUp.OTP = false
      } else if (value == 'login') {
        this.signupTab = false
        this.loginTab = true
      }
    },
    checkVerified (e) {
      console.log('Change mobile no =>', e)
      if (this.verified.phoneNumber && this.verified.phoneNumber == e) {
        this.isCheckOtpValid = true
      } else {
        this.isCheckOtpValid = false
      }
      this.isCheckOtpValid = false
    },

    showOTPBOx () {
      // this.getUserDetails();

      if (this.userDetails.phoneNumber === '') {
        this.phoneNumberErr = true
        console.log('mobile err => ', this.phoneNumberErr)
      }
      if (this.userDetails.email === '') {
        this.emailErr = true
        console.log('Email err => ', this.emailErr)
      }

      if (!this.emailErr && !this.phoneNumberErr) {
        this.checkoutShow = true

        console.log(this.emailErr + ' : ' + this.emailErr)

        console.log('User id =>', localStorage.getItem('UserID'))

        if (
          this.verified.phoneNumber &&
          this.verified.phoneNumber != this.userDetails.phoneNumber
        ) {
          this.userDetails.phoneNumber = this.verified.phoneNumber
          this.isCheckOtpValid = false
        }

        let payload = {
          MobileNo: this.userDetails.phoneNumber,
          ReserveID: localStorage.getItem('ReserveID'),
          UserID: this.userDetails.userID,
          CountryCode: this.userDetails.countryCode,
          Email: this.userDetails.email,
        }

        console.log('send OTP payload => ', payload)
        makeRequest('/CheckoutOtp', 'POST', null, payload)
          .then(result => {
            const { error, res } = result
            const { data } = res.data
            if (!error && res.data.Status) {
              console.log('otp response => ', result)
              this.checkoutShow = false
              this.otp.value = null
              this.isSendOtpClicked = true
              this.isResendOtp = true
              this.otpResponse = res.data.Message
            } else {
              // this.$root.$emit("bv::show::modal", "errorModal");
              // show error modal
              console.log('Error => ', error)
              this.checkoutShow = false
              this.otpResponse = res.data.Message
              if (res.data.MaxAttempt) {
                this.isSendOtpClicked = false
              }
            }
            setTimeout(() => (this.otpResponse = ''), 5000)
          })
          .catch(error => {
            this.checkoutShow = false
            console.log('Error on vue front', error)
          })
      } else {
        setTimeout(() => {
          this.phoneNumberErr = false
          this.emailErr = false
        }, 5000)
        console.log('All fields are required')
      }
    },
    checkoutOtpVerify () {
      console.log('OTP value => ', this.otp.value)
      this.isSendOtpClicked = true
      let payload = {
        Mobile: this.userDetails.phoneNumber,
        ReserveID: localStorage.getItem('ReserveID'),
        UserID: this.userDetails.userID,
        OTP: this.otp.value,
      }
      console.log('verify OTP payload => ', payload)
      makeRequest('/VerifyCheckoutOtp', 'POST', null, payload)
        .then(result => {
          const { error, res } = result
          const { data } = res.data
          if (!error && res.data.Status) {
            console.log('otp response => ', result)
            this.otpResponse = res.data.Message
            this.isCheckOtpValid = true
            this.isSendOtpClicked = false
            this.otp.value = null;
            // this.isResendOtp = true;
            (this.verified.phoneNumber = this.userDetails.phoneNumber),
            (this.verified.Email = this.userDetails.Email),
            (this.verified.countryCode = this.userDetails.countryCode)

            console.log('Verified user => ', this.verified)
          } else {
            // this.$root.$emit("bv::show::modal", "errorModal");
            // show error modal
            console.log('Error => ', error)
            if (res.data.MaxAttempt) {
              this.isSendOtpClicked = false
            }
            this.otpResponse = res.data.Message
          }

          setTimeout(() => (this.otpResponse = ''), 5000)
        })
        .catch(error => {
          console.log('Error on vue front', error)
        })
    },
    checkCard: function (card) {
      this.userDetails.selectedCard = card
    },
    getCountryIsActive () {
      // CountryID != '230' && CountryID != 190 &&  CountryID != 102 && CountryID != '102'
      let array = ['190', '102' ]
      return array.indexOf(String(this.CountryID)) === -1
    },
    getGeoLocation: function () {
      axios
        .get(
          'https://api.ipapi.com/check?access_key=229c548dcafb9cff13041d9544ac60af'
        )
        .then(function (response) {
          console.log(response.data.latitude, response.data.longitude)
          // handle success
          // self.countryData = response.data;
          // self.userDetails.countryCode = response.data.country_calling_code.substr(
          //   1
          // );

          showPosition(response.data.latitude, response.data.longitude)
          console.log(
            'country data from getgeolocation',
            response.data.country_name
          )
        })
        .catch(function (error) {
          // handle error
          console.log(error)
        })

      // let self = this;
      // if (navigator.geolocation) {
      //   navigator.geolocation.getCurrentPosition(showPosition, showError);
      // } else {
      //   x.innerHTML = "Geolocation is not supported by this browser.1";
      // }

      // function showError(error) {
      //   self.$router.push({
      //     name: "LandingPage"
      //   });
      // }

      function showPosition (lat, long) {
        let _position = {
          latitude: lat,
          longitude: long,
        }

        if (
          (window.localStorage.getItem('Geolocation') == '' ||
            window.localStorage.getItem('Geolocation') == undefined ||
            window.localStorage.getItem('Geolocation') == null) &&
          window.location.host != 'empirepremiere.com'
        ) {
          window.localStorage.setItem('Geolocation', JSON.stringify(_position))
          let payload = {
            userLatitude: lat,
            userLongitude: long,
          }

          if (
            window.localStorage.getItem('CountryName') == '' ||
            window.localStorage.getItem('CountryName') == null ||
            window.localStorage.getItem('CountryName') == undefined
          ) {
            makeRequest('/api/GetCountryCityBylatitude', 'POST', null, payload)
              .then(response => {
                const { error, res } = response
                console.log('country data', res.data)

                self.CountryName == res.data.LocationInfo.country

                window.localStorage.setItem(
                  'CountryName',
                  res.data.LocationInfo.country
                )
                if (window.localStorage.getItem('language') == '') {
                  window.localStorage.setItem(
                    'language',
                    JSON.stringify({
                      lang: 'eng',
                      lang_id: 2,
                    })
                  )
                }
                window.localStorage.setItem(
                  'country',
                  JSON.stringify({
                    CountryID: res.data.LocationInfo.CountryID,
                  })
                )

                // if (MODE == "dev") {
                //   window.location.pathname = "/";
                // } else {
                if (res.data.LocationInfo.country === 'Saudi Arabia') {
                  window.localStorage.setItem(
                    'language',
                    JSON.stringify({
                      lang: 'ar',
                      lang_id: 1,
                    })
                  )
                }
                res.data.LocationInfo.country == 'Lebanon'
                  ? window.location.replace('https://lb.empirecinemas.com')
                  : res.data.LocationInfo.country == 'Iraq'
                    ? (window.location.replace('https://irq.empirecinemas.com'),
                    window.localStorage.setItem('PREIMERE', false))
                    : res.data.LocationInfo.country === 'Saudi Arabia'
                      ? (window.location.replace('https://ksa.empirecinemas.com'),
                      window.localStorage.setItem('PREIMERE', false))
                      : ((window.location.href = 'https://empirecinemas.com'),
                      window.localStorage.setItem('CountryName', ''))
              })
              .catch(error => {
                console.log('Error', error)
              })
          }
        } else if (
          window.location.host == 'empirepremiere.com' ||
          window.location.host == 'lb.empirecinemas.com'
        ) {
          console.log('CountryName', 'Lebanon')
          window.localStorage.setItem('CountryName', 'Lebanon')
          window.localStorage.setItem(
            'country',
            JSON.stringify({
              CountryID: 119,
            })
          )

          if (window.localStorage.getItem('language') == '') {
            window.localStorage.setItem(
              'language',
              JSON.stringify({
                lang: 'eng',
                lang_id: 2,
              })
            )
          }

          if (window.location.host == 'empirepremiere.com') {
            window.localStorage.setItem('PREIMERE', true)
          } else if (window.location.host == 'lb.empirecinemas.com') {
            window.localStorage.setItem('PREIMERE', false)
          }

          if (
            window.localStorage.getItem('footer') == null ||
            window.localStorage.getItem('footer') == '' ||
            window.localStorage.getItem('footer') == undefined
          ) {
            window.localStorage.setItem('footer', '1')
            window.location.reload()
          }
        } else if (window.location.host == 'ksa.empirecinemas.com') {
          console.log('CountryName', 'Saudi Arabia')
          window.localStorage.setItem('CountryName', 'Saudi Arabia')
          window.localStorage.setItem(
            'country',
            JSON.stringify({
              CountryID: 230,
            })
          )
          if (window.localStorage.getItem('language') == '') {
            window.localStorage.setItem(
              'language',
              JSON.stringify({
                lang: 'eng',
                lang_id: 2,
              })
            )
          }

          window.localStorage.setItem('PREIMERE', false)

          if (
            window.localStorage.getItem('footer') == null ||
            window.localStorage.getItem('footer') == '' ||
            window.localStorage.getItem('footer') == undefined
          ) {
            window.localStorage.setItem('footer', '1')
            window.location.reload()
          }
        } else if (window.location.host == 'irq.empirecinemas.com') {
          console.log('CountryName', 'Iraq')
          window.localStorage.setItem('CountryName', 'Iraq')
          window.localStorage.setItem(
            'country',
            JSON.stringify({
              CountryID: 102,
            })
          )
          if (window.localStorage.getItem('language') == '') {
            window.localStorage.setItem(
              'language',
              JSON.stringify({
                lang: 'eng',
                lang_id: 2,
              })
            )
          }

          window.localStorage.setItem('PREIMERE', false)

          if (
            window.localStorage.getItem('footer') == null ||
            window.localStorage.getItem('footer') == '' ||
            window.localStorage.getItem('footer') == undefined
          ) {
            window.localStorage.setItem('footer', '1')
            window.location.reload()
          }
        }
      }
    },
    goBackHistory () {
      this.$root.$emit('bv::hide::modal', 'sessionTimeOut')
      this.$router.go(-1)
    },
    onClickChange () {
      window.location.href = 'https://empirecinemas.com'
    },
    onClickOk: function () {
      this.$router.go(-1)
      this.$refs.errorModal.hide()
    },
    onclickpremiere: function (type) {
      this.showLoading()
      let value = false

      if (window.location.host == 'empirepremiere.com') {
        window.location.replace('http://lb.empirecinemas.com')
      } else {
        window.location.replace('http://empirepremiere.com')
      }
      // if (type == "pre") {
      //   value = true;
      // } else {
      //   value = false;
      // }
      // window.localStorage.setItem("PREIMERE", value);
      // // window.location.reload();
      // window.location.pathname = "/";
      // this.hideLoading();
    },
    saveLangToken: function (lang, id) {
      if (this.langName === lang) {
        // do nothing
      } else {
        let language = {
          lang: lang,
          lang_id: id,
        }
        LanguageService.saveLanguage(language)
      }
      this.showLoading()

      if (
        window.location.pathname == '/' ||
        window.location.pathname == '/ar'
      ) {
        let lang_url = id == 1 ? '/ar' : ''
        // if (id == 1) {
        let htt =
          window.location.host == 'localhost:8082' ? 'http://' : 'https://'
        window.location.href = htt + window.location.host + lang_url
        // }
      } else {
        window.location.reload()
      }
      this.hideLoading()
    },
    onSelectDate: function (value, type) {
      if (type == 'date') {
        this.birthDate.date1 = value
      } else if (type == 'month') {
        this.birthDate.month = value
      } else if (type == 'year') {
        this.birthDate.year = value
      }
      // this.getAge(
      //   this.birthDate.year +
      //     "/" +
      //     this.birthDate.month +
      //     "/" +
      //     this.birthDate.date1
      // );
    },
    closeAdvt: function () {
      this.$root.$emit('bv::hide::modal', 'advtModal')
    },
    hideLoginModal: function () {
      this.$refs['signInModal'].hide()
    },
    onChangeGender: function (gender) {
      this.userDetails.gender = gender
      if (this.userDetails.gender != 'Gender') {
        this.errorGender = ''
      }
    },
    openSidenav: function () {
      if (window.localStorage.getItem('cinemaD')) {
        this.isClickedOnNowShowing()
      }
      this.openAside = this.openAside == '0px' ? '-300px' : '0px'
      let el = document.body
      if (this.openAside == '0px') {
        el.classList.add('oh')
        this.overlay = true
      } else {
        el.classList.remove('oh')
        this.overlay = false
      }
    },
    onClickComingSoon () {
      this.openAside = this.openAside == '0px' ? '-300px' : '0px'
      let el = document.body
      el.classList.remove('oh')
      this.overlay = false
      $('html,body').animate(
        {
          // scrollTop: $("#comimgSoon").offset().top,
        },
        'slow'
      )
      this.IsActivedrop = false
    },
    topNavHandler: function () {
      this.openSearch(false)
    },
    openSearch: function (status) {
      // this.hideSearch = this.hideSearch == "0vh" ? "-100vh" : '0vh';
      if (status) {
        if (this.hideSearch == '0vh') {
          this.hideSearch = '-100vh'
        } else {
          this.hideSearch = '0vh'
        }
      } else if (!status) {
        this.hideSearch = '-100vh'
      }
    },
    searchData: function () {
      if (this.searchValue.length > 0) {
        this.searchAPI()
      } else {
        this.movieListSearch = []
      }
    },
    searchAPI: function () {
      // makeRequest(
      //     `/bnapi/searchresult.php?term=` + this.searchValue,
      //     "GET",
      //     null,
      //     null
      //   )
      makeRequest(`/Search?term=` + this.searchValue, 'GET', null, null)
        .then(result => {
          this.movieListSearch = result.res.data
        })
        .catch(error => {
          console.log('Google Login Error', error)
        })
    },
    callCheckoutEvent: function () {
      console.log('this.userDetails >>>>>>><<<<<<:', this.userDetails)
      // this.$refs.checkoutModal.hide();
      if (this.userDetails.selectedCard === 'VisaMaster') {
        this.userDetails.redirectURL = '/RedirectPayment'
      } else if (this.userDetails.selectedCard === 'AmericanExpress') {
        this.userDetails.redirectURL = '/RedirectPaymentamax'
      }
      EventBus.$emit('checkOutEvent', this.userDetails)
    },
    checkoutProcess: function () {
      this.handleCheckout = true
      let token = TokenService.getToken()
      // if (token) {
      if (token && this.loggedInFlag) {
        this.getUserDetails()
        this.$refs.checkoutModal.show()
      } else {
        this.$refs.signInModal.show()
      }
    },
    getCountryCode: function () {
      let self = this
      //
      axios
        .get('https://ipapi.co/json')
        .then(function (response) {
          // handle success
          self.countryData = response.data
          // self.userDetails.countryCode = response.data.country_calling_code.substr(
          //   1
          // );
          console.log(response)
        })
        .catch(function (error) {
          // handle error
          console.log(error)
        })
    },
    onGoogleSignInSuccess (googleUser) {
      console.log('Google Response >>>>>>>>>>>>>', googleUser)
      // makeRequest(`/app/SocialLogins`, "POST", null, {
      //     socialType: "Google",
      //     socialToken: googleUser.Zi.id_token
      // })
      //     .then(result => {
      //     console.log("Check Socal Google response From here ", result);
      //     const { error, res } = result;
      //     const { data } = res.data;
      //     if (!error && res.data.status && data.result.Status) {
      //         console.log("Social Response >>>>>>", data);
      //         $("#signin-page").modal("hide");
      //         $("#signup-page").modal("hide");
      //         this.userName = data.result.UserName;
      //         EventBus.$emit("UserLogged", {
      //         status: true,
      //         userName: data.result.UserName
      //         });
      //     } else {
      //         this.socialLoginError.error = data.result.Message;
      //         setTimeout(() => {
      //         this.socialLoginError.error = "";
      //         }, 5000);
      //     }
      //     })
      //     .catch(error => {
      //     console.log("Google Login Error", error);
      //     });

      const profile = googleUser.getBasicProfile()
      console.log('Works >>>>>>>>', profile)
      makeRequest(`/SocialLogins`, 'POST', null, {
        FireBaseID: '',
        TokenFrom: 'Google',
        stoken: googleUser.wc
          ? googleUser.wc.id_token
          : googleUser.Zi
            ? googleUser.Zi.id_token
            : googleUser.uc
              ? googleUser.uc.id_token
              : googleUser.xc
                ? googleUser.xc.id_token
                : null,
        // stoken: googleUser.Zi.id_token
      })
        .then(result => {
          // console.log("Check Socal Google response From here ", result);
          // TokenService.saveToken(res.data.access_token);
          this.loginUser(result.res.data.access_token)
          // this.loggedInFlag = true;
          // window.location = "/";
        })
        .catch(error => {
          console.log('Google Login Error', error)
        })
    },
    onGoogleSignInError (error) {
      // `error` contains any error occurred.
      console.log('OH NOES', error)
      this.socialLoginError.error = 'Oops, Something went wrong'
      setTimeout(() => {
        this.socialLoginError.error = ''
      }, 5000)
    },
    onSignFBInSuccess (response) {
      console.log(`onSignFBInSuccess`, response)
      // makeRequest(`/app/SocialLogins`, "POST", null, {
      //     socialType: "Facebook",
      //     socialToken: response.authResponse.accessToken
      // })
      //     .then(result => {
      //     console.log("Check Socal Google response From here ", result);
      //     const { error, res } = result;
      //     const { data } = res.data;
      //     if (!error && res.data.status && data.result.Status) {
      //         console.log("Social Response >>>>>>", data);
      //         this.userName = data.result.UserName;
      //         $("#signin-page").modal("hide");
      //         $("#signup-page").modal("hide");
      //         EventBus.$emit("UserLogged", {
      //         status: true,
      //         userName: data.result.UserName
      //         });
      //     } else {
      //         this.socialLoginError.error = data.result.Message;
      //         setTimeout(() => {
      //         this.socialLoginError.error = "";
      //         }, 5000);
      //     }
      //     })
      //     .catch(error => {
      //     console.log("Google Login Error", error);
      //     });

      makeRequest(`/SocialLogins`, 'POST', null, {
        FireBaseID: '',
        TokenFrom: 'Facebook',
        stoken: response.authResponse.accessToken,
      })
        .then(result => {
          console.log('Check Socal Facebook response From here ', result)
          // send token to loginuser
          this.loginUser(result.res.data.access_token)
          // result has
        })
        .catch(error => {
          console.log('Face book Login Error', error)
        })
      FB.api('/me', data => {
        console.log('Facebook Data ', data)
      })
    },
    onSignFBInError (error) {
      console.log('OH NOES', error)
      this.socialLoginError.error = 'Whoops, !Something went wrong'
      setTimeout(() => {
        this.socialLoginError.error = ''
      }, 5000)
    },
    reloadWindow: function () {
      window.location.reload()
    },
    hideSignIn: function () {
      this.$refs.signInModal.hide()
    },
    hideSignUp: function () {
      this.$refs.signUpModal.hide()
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
    validateBeforeSubmit (scope) {
      // if (scope == "signIn") {
      //   this.$validator.validateAll(scope).then((result) => {
      //     if (result) {
      //       let payload = {
      //         username: this.userDetails.email,
      //         password: this.userDetails.password,
      //         // Mobile: this.userDetails.phoneNumber,
      //         // CountryCode: this.userDetails.countryCode || "91"
      //       };
      //       makeRequest("/UserLogin", "POST", null, payload)
      //         .then((response) => {
      //           const { error, res } = response;
      //           if (!error && res.data.Status) {
      //             this.loginUser(res.data.access_token);

      //             this.modal.signIn.info = false;
      //             // this.modal.signIn.OTP = true;
      //           } else {
      //             this.errorMessage.login = res.data.Message;
      //           }
      //         })
      //         .catch((error) => {
      //           console.log("Error", error);
      //           //   resolve(null);
      //         });
      //       // alert("Form Submitted!");
      //       return;
      //     }
      //   });
      // }
      if (scope == 'signIn') {
        this.showLoading()
        this.$validator.validateAll(scope).then(result => {
          if (result) {
            let payload = {
              username: this.userDetails.email,
              password: this.userDetails.password,
              // Mobile: this.userDetails.phoneNumber,
              // CountryCode: this.userDetails.countryCode || "91"
            }
            makeRequest('/UserLoginNew', 'POST', null, payload)
              .then(response => {
                const { error, res } = response
                if (!error && res.data.Status) {
                  this.handleCheckout = false
                  this.loginUser(res.data.access_token)
                  this.modal.signIn.info = false
                  // this.modal.signIn.OTP = true;
                  if (res.data.hasOwnProperty('LoyaltyCustomerVerfiy')) {
                    localStorage.setItem(
                      'LoyaltyCustomerVerfiy',
                      res.data.LoyaltyCustomerVerfiy
                    )

                    if (
                      res.data.LoyaltyCustomerVerfiy == 0 ||
                      res.data.LoyaltyCustomerVerfiy == '0'
                    ) {
                      EventBus.$emit('openLyoyaltyprogrampopup', true)
                    } else {
                      console.log('object')
                    }
                    EventBus.$emit('getCheckLoyality', true)
                  }
                } else {
                  this.errorMessage.login = res.data.Message
                }
                this.hideLoading()
              })
              .catch(error => {
                this.hideLoading()
                console.log('Error', error)
                //   resolve(null);
              })
          }
        })
      }

      // if (scope == "signUp") {
      //   this.$validator
      //     .validateAll(scope)
      //     .then((result) => {
      //       if (result) {
      //         let payload = {
      //           Email: this.userDetails.email,
      //           Mobile: this.userDetails.phoneNumber,
      //           Password: this.userDetails.password,
      //           RePassword: this.userDetails.confirmedPassword,
      //           FirstName: this.userDetails.firstName,
      //           LastName: this.userDetails.lastName,
      //           newslatteremempirecinemanotification1:
      //             this.userDetails.newslatteremempirecinemanotification1 == true
      //               ? 1
      //               : 0,
      //           FireBaseID: "",
      //           // Gender: this.userDetails.gender,
      //           CountryCode: this.userDetails.CountryCode || "966",
      //           // Birthdate:
      //           //   this.birthDate.date1 +
      //           //   "-" +
      //           //   this.birthDate.month +
      //           //   "-" +
      //           //   this.birthDate.year,
      //         };
      //         if (this.userDetails.acceptedTerms) {
      //           makeRequest("/UserRegistration", "POST", null, payload)
      //             .then((response) => {
      //               console.log("response :", response);
      //               const { error, res } = response;
      //               if (!error && res.data.Status) {
      //                 // Switch to OTP section
      //                 this.modal.signUp.info = false;
      //                 this.modal.signUp.OTP = true;
      //                 // this.verifyUser();
      //                 // this.modal.signUp.OTP = true;
      //               } else {
      //                 this.errorMessage.signUp = res.data.Message;
      //               }
      //             })
      //             .catch((error) => {
      //               console.log("Error", error);
      //               //   resolve(null);
      //             });
      //         } else {
      //           // Show Message
      //         }
      //         // alert("Form Submitted!");
      //         return;
      //       }
      //     })
      //     .catch((error) => {
      //       console.log("on Validation Error", error);
      //     });
      // }
      if (scope == 'signUp') {
        this.showLoading()
        // this.errorDob = "";
        // this.errorGender = "";
        // let count = 0;
        this.$validator
          .validateAll(scope)
          .then(result => {
            // if (
            //   this.birthDate.date1 == "Date" ||
            //   this.birthDate.month == "Month" ||
            //   this.birthDate.year == "Year"
            // ) {
            //   this.errorDob = "show";
            //   count = 1;
            // }
            // if (this.userDetails.gender == "Gender") {
            //   this.errorGender = "Please Select Gender";
            //   count = 1;
            // }

            // if (count > 0) {
            //   return false;
            // }

            if (result) {
              let payload = {
                Email: this.userDetails.email,
                Mobile: this.userDetails.phoneNumber
                  .trim()
                  .split(' ')
                  .join(''),
                Password: this.userDetails.password,
                RePassword: this.userDetails.confirmedPassword,
                FirstName: this.userDetails.firstName,
                LastName: this.userDetails.lastName,
                Birthdate: this.userDetails.birthDate,
                Gender: this.userDetails.gender,
                newslatteremempirecinemanotification1:
                  this.userDetails.newslatteremempirecinemanotification1 == true
                    ? 1
                    : 0,
                FireBaseID: '',
                // Gender: this.userDetails.gender,
                CountryCode: this.userDetails.CountryCode || '91',
                // Birthdate:
                //   this.birthDate.date1 +
                //   "-" +
                //   this.birthDate.month +
                //   "-" +
                //   this.birthDate.year,
              }
              // console.log("payloadpayloadpayloadpayload EMPNEW :>> ", payload);
              if (this.userDetails.acceptedTerms) {
                makeRequest('/UserRegistrationNew', 'POST', null, payload)
                  .then(response => {
                    console.log('response :', response)
                    const { error, res } = response
                    if (!error && res.data.Status) {
                      // Switch to OTP section
                      this.modal.signUp.info = false
                      this.modal.signUp.OTP = true
                      // this.verifyUser();
                    } else {
                      this.errorMessage.signUp = res.data.Message
                    }
                  })
                  .catch(error => {
                    console.log('Error', error)
                    //   resolve(null);
                  })
              } else {
                // Show Message
              }
              this.hideLoading()
              // alert("Form Submitted!");
            } else {
              this.hideLoading()
            }
          })
          .catch(error => {
            this.hideLoading()
            console.log('on Validation Error', error)
          })
      }
      if (scope == 'forgotPasswordEmail') {
        this.$validator.validateAll(scope).then(result => {
          if (result) {
            this.errorMessage.forgotpassword = ''
            let payload = {
              email: this.userDetails.email,
            }
            makeRequest('/EmailVerification', 'POST', null, payload)
              .then(response => {
                const { error, res } = response
                if (!error && res.data.Status) {
                  this.$refs.forgotpaswordotp.show()
                  this.userDetails.ResetToken = res.data.Data[0].token
                } else {
                  this.errorMessage.forgotpassword = res.data.Message
                }
              })
              .catch(error => {
                console.log('Error', error)
                this.errorMessage.forgotpassword = error

                //   resolve(null);
              })
            // alert("Form Submitted!");
          }
        })
      }
      if (scope == 'forgotPasswordOTP') {
        this.$validator.validateAll(scope).then(result => {
          if (result) {
            this.errorMessage.forgotpassword = ''
            let payload = {
              OTP: this.userDetails.OTP,
              ResetToken: this.userDetails.ResetToken,
            }
            makeRequest('/ResetPassOTPVerify', 'POST', null, payload)
              .then(response => {
                const { error, res } = response
                if (!error && res.data.Status) {
                  this.$refs.forgotpaswordreset.show()
                } else {
                  this.errorMessage.forgotpassword = res.data.Message
                }
              })
              .catch(error => {
                console.log('Error', error)
                this.errorMessage.forgotpassword = error

                //   resolve(null);
              })
            // alert("Form Submitted!");
            return;
            ``
          }
        })
      }
      if (scope == 'forgotPasswordreset') {
        this.$validator.validateAll(scope).then(result => {
          if (result) {
            this.errorMessage.forgotpassword = ''
            let payload = {
              NewPassword: this.userDetails.password,
              ConfirmPassword: this.userDetails.confirmedPassword,
              ResetToken: this.userDetails.ResetToken,
            }
            makeRequest('/ResetPassword', 'POST', null, payload)
              .then(response => {
                const { error, res } = response
                if (!error && res.data.Status) {
                  this.$refs.forgotpaswordreset.hide()
                } else {
                  this.errorMessage.forgotpassword = res.data.Message
                }
              })
              .catch(error => {
                console.log('Error', error)
                this.errorMessage.forgotpassword = error

                //   resolve(null);
              })
            // alert("Form Submitted!");
          }
        })
      }
      if (scope == 'signUpVerifyOTP') {
        this.verifyUser()
      }
      if (scope == 'checkoutUser') {
        this.$validator.validateAll(scope).then(result => {
          console.log('result :', result)
          // if (result) {
          //   this.callCheckoutEvent();
          // }
          if (result) {
            if (this.countryCode != '230' || this.countryCode != 230) {
              this.userDetails.selectedCard = 'VisaMaster'
              this.userDetails.redirectURL = '/RedirectPayment'
              // this.callCheckoutEvent();
            } else {
              this.showCards = false
              this.hideCards = true
            }
          }
        })
      }
    },
    // verifyUser: function () {
    //   console.log("Inside the Verify");
    //   let payload = {
    //     Email: this.userDetails.email,
    //     Mobile: this.userDetails.phoneNumber,
    //     Password: this.userDetails.password,
    //     RePassword: this.userDetails.confirmedPassword,
    //     FirstName: this.userDetails.firstName,
    //     LastName: this.userDetails.lastName,
    //     // CountryCode: 91,
    //     // OTP: "1234", // this.userDetails.OTP,
    //     OTP: this.userDetails.OTP,
    //     FireBaseID: "",
    //     UserName: this.userDetails.email,
    //   };
    //   makeRequest("/api/Account/Verifyme", "POST", null, payload)
    //     .then((response) => {
    //       console.log("Inside the Verify response", response);
    //       const { error, res } = response;
    //       if (!error) {
    //         if (res.data.Status) {
    //           this.loginUser(res.data.access_token);
    //         }
    //         //handle if error
    //       }
    //     })
    //     .catch((error) => {
    //       console.log("Error", error);
    //       //   resolve(null);
    //     });
    //   // alert("Form Submitted!");
    //   return;
    // },
    verifyUser: function () {
      console.log('Inside the Verify')
      let payload = {
        Email: this.userDetails.email,
        Mobile: this.userDetails.phoneNumber
          .trim()
          .split(' ')
          .join(''),
        Password: this.userDetails.password,
        RePassword: this.userDetails.confirmedPassword,
        FirstName: this.userDetails.firstName,
        LastName: this.userDetails.lastName,
        // CountryCode: 91,
        // OTP: "1234", // this.userDetails.OTP,
        OTP: this.userDetails.OTP,
        FireBaseID: '',
        UserName: this.userDetails.email,
      }
      makeRequest('/api/Account/Verifyme', 'POST', null, payload)
        .then(response => {
          console.log('Inside the Verify response', response)
          const { error, res } = response
          if (!error) {
            if (res.data.Status) {
              localStorage.setItem('LoyaltyCustomerVerfiy', 0)
              this.handleCheckout = false
              if (
                res.data.LoyaltyCustomerVerfiy == 0 ||
                res.data.LoyaltyCustomerVerfiy == '0'
              ) {
                EventBus.$emit('openLyoyaltyprogrampopup', true)
              } else {
                EventBus.$emit('getCheckLoyality', true)
              }
              this.loginUser(res.data.access_token)
            }
            // handle if error
          }
        })
        .catch(error => {
          console.log('Error', error)
          //   resolve(null);
        })
      // alert("Form Submitted!");
    },
    loginUser: function (token) {
      TokenService.saveToken(token)
      this.hideSignIn()
      // this.hideSignUp();
      // this.loggedInFlag = true;
      this.getUserDetails()
      if (this.handleCheckout) {
        this.$refs.checkoutModal.show()
      }

      // fetch token, do api call for profile details save
    },
    getPromotionList: function () {
      makeRequest('/promotion', 'POST', null, {})
        .then(result => {
          const { error, res } = result
          if (!error && res.status) {
            if (
              res.data &&
              res.data.Advertisement &&
              res.data.Advertisement.length > 0
            ) {
              this.promotionData = res.data.Advertisement[0]
              if (window.location.pathname == '/') {
                this.$root.$emit('bv::show::modal', 'advtModal')
              }

              if (this.promotionData) {
                if (
                  sessionStorage.getItem('MODAL') == undefined ||
                  sessionStorage.getItem('MODAL') == null ||
                  sessionStorage.getItem('MODAL') == ''
                ) {
                  sessionStorage.setItem('MODAL', '1')
                  this.$root.$emit('bv::show::modal', 'advtModal')
                }
              }
            }
          } else {
            console.log('error from res', res.message)
          }
        })
        .catch(error => {
          console.log('Error on vue front', error)
        })
    },

    // getUserDetails: function (callback) {
    //   let token = TokenService.getToken();
    //   let payload = {};
    //   makeRequest("/ProfileData", "POST", token, payload)
    //     .then((result) => {
    //       const { error, res } = result;
    //       if (!error && res.status) {
    //         this.userDetails.email = res.data.Email;
    //         this.userDetails.phoneNumber = res.data.Mobile;
    //         this.userDetails.userName = res.data.UserName;
    //         this.profileDetails = res.data;
    //         this.loggedInFlag = true;
    //         if (callback) {
    //           callback();
    //         }
    //         //   this.userDetails.profilePic =
    //         //       data.userDetails.ProfileURl.length > 0
    //         //           ? data.userDetails.ProfileURl
    //         //           : "/images/svg/icon-profile.svg";
    //         //   this.loginData.loginInput.email = data.userDetails.Email;
    //       } else {
    //         console.log("error from res", res.message);
    //       }
    //     })
    //     .catch((error) => {
    //       console.log("Error on vue front", error);
    //     });
    // },

    getUserDetails: function (callback) {
      let token = TokenService.getToken()
      let payload = {}
      makeRequest('/ProfileDataNew', 'POST', token, payload)
        .then(result => {
          const { error, res } = result
          if (!error && res.status) {
            this.userDetails.userID = res.data.UserID
            this.userDetails.email = res.data.Email
            this.userDetails.phoneNumber = res.data.Mobile
            this.userDetails.userName = res.data.UserName
            // this.profileDetails = res.data.FirstName;
            this.profileDetails = res.data

            console.log(
              'this.profileDetails :>>CountryISOText>> ',
              this.profileDetails
            )

            let CountryISOText = res.data.CountryISOCode.toUpperCase()
            this.selectedCountry = CountryISOText
              ? CountryISOText.toString()
              : ''

            this.loggedInFlag = true
            console.log(
              'profileDetailsprofileDetails 4444444444444444:>> ',
              this.profileDetails
            )
            if (callback) {
              callback()
            }
            //   this.userDetails.profilePic =
            //       data.userDetails.ProfileURl.length > 0
            //           ? data.userDetails.ProfileURl
            //           : "/images/svg/icon-profile.svg";
            //   this.loginData.loginInput.email = data.userDetails.Email;
          } else {
            console.log('error from res', res.message)
          }
        })
        .catch(error => {
          console.log('Error on vue front', error)
        })
    },
    onUserLogout () {
      window.localStorage.removeItem('access_token')
      window.localStorage.removeItem('LoyaltyCustomerVerfiy')
      window.localStorage.setItem('changeTabProfile', 0)
      window.location.pathname = '/'
      this.loggedInFlag = false
      this.isProfileDropdownActive = false
    },
    checkToken: function () {
      let token = TokenService.getToken()
      if (token) {
        this.loggedInFlag = true
      }
    },
  },
}
</script>
<style>
.new-emp-dropdown {
  position: absolute;
  right: 0%;
  top: auto;
  text-align: center;
  border-radius: 0px;
  z-index: 9999;
  /* overflow-y: auto; */
  transform: scale(0);
  /* transform-origin: top left; */
  /* transform-origin: 50px 50px; */
  transform-origin: 30px 0;
  /* transform: translate(-100%, 50%) rotate(45deg) translate(100%, -50%); */
  transition: 0.2s ease-in-out;
  background-color: #434345;
}

.new-emp-dropdown.active {
  transform: scale(1);
}

.new-emp-dropdown ul::after {
  content: "";
  width: 0;
  height: 0;
  position: absolute;
  top: -9px;
  left: 25px;
  z-index: 99;
  border-left: 10px solid transparent;
  border-right: 10px solid transparent;
  border-bottom: 10px solid #434345;
}

.new-emp-dropdown ul li {
  color: #fff;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
  width: 100%;
  height: 100%;
  display: block;
  padding: 0.8rem 3rem;
  cursor: pointer;
  /* padding: 10px 10px; */
  background: transparent;
}

.new-emp-dropdown ul li.active,
.new-emp-dropdown ul li:hover {
  color: #fff;
  background: #cf1f2e;
}

.fs-14 {
  font-size: 14px;
}
.fs-10 {
  font-size: 10px;
}

.advertisement-modal .modal-content {
  color: #fff;
  background-color: transparent !important;
}
.advertisement-modal .modal-backdrop.show {
  opacity: 0.75;
}
.advertisement-modal .btn-close {
  position: fixed;
  top: 25px;
  right: 25px;
  line-height: 1;
  font-size: 60px;
  color: #fff;
  cursor: pointer;
  border: none;
  line-height: 1;
  z-index: 99;
  background-color: transparent;
}
/* OFFER DROPDOWN START */
.offerType-Drop {
  /* background-color: #4CAF50;
  color: white;
  padding: 16px;
  font-size: 16px; */
  border: none;
}

.offerType-Drop {
  position: relative;
  display: inline-block;
}

.dropdown-content {
  display: none;
  position: absolute;
  background-color: #e6e7e8;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
}

.dropdown-content a {
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
  text-transform: uppercase;
}

.dropdown-content a:hover {
  color: #fff;
  background-color: #cf1f2e;
}

.offerType-Drop:hover .dropdown-content {
  display: block;
}
/* OFFER DROPDOWN END*/
</style>
