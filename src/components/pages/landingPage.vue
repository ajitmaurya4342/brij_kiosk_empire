<template>
  <div>
    <div class="landingpage-top-line d-md-none pt-4">
      <div class="line-1 mb-3"></div>
      <div class="line-2"></div>
    </div>

    <section class="container-fluid">
      <span class="landingpage-left-line d-none d-md-block">
        <img src="@/assets/img/left.png" class="img-fluid" alt="" />
      </span>

      <div
        class="d-flex align-items-center justify-content-center min-vh-100 my-0"
      >
        <div
          class="px-0 px-md-3 col-md-12 text-center my-5 py-4 my-md-0 py-md-0"
        >
          <img
            v-if="preimere == true || preimere == 'true'"
            src="@/assets/img/svg/EmpirePremierLogo1.svg"
            class="img-fluid main-logo2"
          />
          <img
            v-else
            src="@/assets/img/new-logo.png"
            class="img-fluid main-logo2"
          />

          <!-- Using slots -->
          <!-- <b-input-group class="col-lg-4 col-xl-3 mt-5 mx-auto">
          <b-form-input />
          <b-input-group-text class="pr-0" slot="append">
            <router-link to="#"> AUTO DETECT</router-link>
            <span v-if="preimere == true || preimere == 'true'" class="ml-1"><img src="@/assets/img/svg/location-pin-black.svg" height="13" width="13"
                style="margin-top:6px;"></span>
                <span v-else class="ml-1"><img src="@/assets/img/svg/location-pin.svg" height="13" width="13"
                style="margin-top:6px;"></span>
          </b-input-group-text>
        </b-input-group>-->

          <!-- NEW UI { -->

          <div class="my-5">
            <h4 class="mb-3 d-md-none">CHOOSE YOUR COUNTRY</h4>
            <h5 class="mb-3 d-none d-md-block">CHOOSE YOUR COUNTRY</h5>
            <h6 class="d-none d-md-block">
              PLEASE SELECT YOUR PREFERRED COUNTRY BELOW:
            </h6>
            <p class="d-md-none">PLEASE SELECT YOUR PREFERRED COUNTRY BELOW:</p>

            <div class="my-4 px-0 px-md-3 col-12 col-md-12 mx-auto">
              <ul class="list-inline country-selection-list mb-0">
                <li
                  v-for="(country, index) in country_list_array"
                  :key="index"
                  class="
                    list-inline-item
                    mb-4 mb-md-3
                    d-block d-md-inline-block
                  "
                >
                  <div class="d-flex align-items-center justify-content-center">
                    <div class="mr-2 d-none d-md-block">
                      <img v-if="country.country_name == 'Saudi Arabia'" src="@/assets/img/SaudiArabiaFlag.png" alt="" />
                      <img v-if="country.country_name == 'Iraq'" src="@/assets/img/IraqFlag.png" alt="" />
                      <img v-if="country.country_name == 'Lebanon'" src="@/assets/img/LebanonFlag.png" alt="" />
                    </div>
                    <div class="d-flex align-items-center w-100">
                      <div
                        class="Item flex-1"
                        @click="onSelectCountry(
                          country.country_name,
                          countryData[country.country_name].CountryID,
                          'eng',
                           2, country,
                            { brij_lang_id: 1, iso_2: 'en' }
                        )"
                      >
                        {{ country.country_name }}
                      </div>
                      <div class="mx-2 no-hover-effect d-none d-md-block">
                        /
                      </div>
                      <div class="no-hover-effect d-md-none flex-2">
                        <img
                          v-if="country.country_name == 'Saudi Arabia'"
                          class="img-fluid"
                          src="@/assets/img/SaudiArabiaFlag.png"
                          alt=""
                        />
                        <img
                          v-if="country.country_name == 'Iraq'"
                          class="img-fluid"
                          src="@/assets/img/IraqFlag.png"
                          alt=""
                        />
                        <img
                          v-if="country.country_name == 'Lebanon'"
                          class="img-fluid"
                          src="@/assets/img/LebanonFlag.png"
                          alt=""
                        />
                      </div>
                      <div
                        class="Item flex-3"
                        @click="onSelectCountry(
                          country.country_name,
                          countryData[country.country_name].CountryID,
                          'ar',
                          1,
                          country,
                          { brij_lang_id: 3, iso_2: 'ar' },
                        )"
                      >
                        {{ countryData[country.country_name].arabic }}
                      </div>
                    </div>
                  </div>
                </li>

                <li
                  v-if="false"
                  class="
                    list-inline-item
                    mb-4 mb-md-3
                    d-block d-md-inline-block
                  "
                >
                  <div class="d-flex align-items-center justify-content-center">
                    <div class="mr-2 d-none d-md-block">
                      <img src="@/assets/img/SaudiArabiaFlag.png" alt="" />
                    </div>
                    <div class="d-flex align-items-center w-100">
                      <div
                        class="Item flex-1"
                        @click="onSelectCountry('Saudi Arabia', 230, 'eng', 2)"
                      >
                        Saudi Arabia
                      </div>
                      <div class="mx-2 no-hover-effect d-none d-md-block">
                        /
                      </div>
                      <div class="no-hover-effect d-md-none flex-2">
                        <img
                          src="@/assets/img/SaudiArabiaFlag.png"
                          class="img-fluid"
                          alt=""
                        />
                      </div>
                      <div
                        class="Item flex-3"
                        @click="onSelectCountry('Saudi Arabia', 230, 'ar', 1)"
                      >
                        المملكة العربية السعودية
                      </div>
                    </div>
                  </div>
                </li>
                <!-- <li
                class="list-inline-item mb-4 mb-md-3"
                @click="onSelectCountry('Saudi Arabia', 230, 'ar', 1)"
              >
                <div class="d-flex align-items-center">
                  <div class="mr-2">
                    <img src="@/assets/img/SaudiArabiaFlag.png" alt="" />
                  </div>

                </div>
              </li> -->

                <li
                  v-if="false"
                  class="
                    list-inline-item
                    mb-4 mb-md-3
                    d-block d-md-inline-block
                  "
                >
                  <div class="d-flex align-items-center justify-content-center">
                    <div class="mr-2 d-none d-md-block">
                      <img src="@/assets/img/IraqFlag.png" alt="" />
                    </div>
                    <div class="d-flex align-items-center w-100">
                      <div
                        class="Item flex-1"
                        @click="onSelectCountry('Iraq', 102, 'eng', 2)"
                      >
                        Iraq
                      </div>

                      <div class="mx-2 no-hover-effect d-none d-md-block">
                        /
                      </div>
                      <div class="no-hover-effect d-md-none flex-2">
                        <img
                          src="@/assets/img/IraqFlag.png"
                          class="img-fluid"
                          alt=""
                        />
                      </div>
                      <div
                        class="Item flex-3"
                        @click="onSelectCountry('Iraq', 102, 'ar', 1)"
                      >
                        ٱلْعِرَاق
                      </div>
                    </div>
                  </div>
                </li>
                <!-- <li
                class="list-inline-item mb-4 mb-md-3"
                @click="onSelectCountry('Iraq', 102, 'ar', 1)"
              >
                <div class="d-flex align-items-center">
                  <div class="mr-2">
                    <img src="@/assets/img/IraqFlag.png" alt="" />
                  </div>
                  <div>ٱلْعِرَاق‎</div>
                </div>
              </li> -->

                <li
                  v-if="false"
                  class="
                    list-inline-item
                    mb-4 mb-md-3
                    d-block d-md-inline-block
                  "
                >
                  <div class="d-flex align-items-center justify-content-center">
                    <div class="mr-2 d-none d-md-block">
                      <img src="@/assets/img/LebanonFlag.png" alt="" />
                    </div>
                    <div class="d-flex align-items-center w-100">
                      <div
                        class="Item flex-1"
                        @click="onSelectCountry('Lebanon', 119, 'eng', 2)"
                      >
                        Lebanon
                      </div>
                      <div class="mx-2 no-hover-effect d-none d-md-block">
                        /
                      </div>
                      <div class="no-hover-effect d-md-none flex-2">
                        <img
                          src="@/assets/img/LebanonFlag.png"
                          class="img-fluid"
                          alt=""
                        />
                      </div>
                      <div
                        class="Item flex-3"
                        @click="onSelectCountry('Lebanon', 119, 'ar', 1)"
                      >
                        لبنان
                      </div>
                    </div>
                  </div>
                </li>
                <!-- <li
                class="list-inline-item mb-4 mb-md-3"
                @click="onSelectCountry('Lebanon', 119, 'ar', 1)"
              >
                <div class="d-flex align-items-center">
                  <div class="mr-2">
                    <img src="@/assets/img/LebanonFlag.png" alt="" />
                  </div>
                  <div>لبنان</div>
                </div>
              </li> -->
              </ul>
            </div>

            <div class="col-12 col-md-8 mx-auto landingpage-text">
              On your next visit, through the use of cookies, you will be
              automatically directed to your preferred countries website. <br />
              By continuing to the Empire Cinemas website, you will be agreeing
              to the <a href="/ksa-terms-condition" style="color:#ce1f2e;">terms and conditions</a>, privacy policy and terms of use.
            </div>
          </div>

          <!-- NEW UI } -->

          <div v-if="false" class="my-3 landing-dropdown-div">
            <b-dropdown
              id="dropdown-1"
              :text="CountryName"
              variant="default"
              class="m-md-2 landing-dropdown"
            >
              <b-dropdown-item v-on:click="onSelectCountryName('Lebanon', 119)"
                >Lebanon</b-dropdown-item
              >
              <b-dropdown-item
                v-on:click="onSelectCountryName('Saudi Arabia', 230)"
                >Saudi Arabia</b-dropdown-item
              >
              <b-dropdown-item v-on:click="onSelectCountryName('Iraq', 102)"
                >Iraq</b-dropdown-item
              >
            </b-dropdown>
            <div v-if="IsCountrySelected" class="landing-text small">
              Please Select Country
            </div>
          </div>

          <div v-if="false" class="col-md-12 lan mb-3">
            <b-button
              variant="default"
              v-on:click="saveLangToken('eng', 2)"
              :class="langName == 'eng' ? 'active' : ''"
              >ENGLISH</b-button
            >
            <b-button
              variant="default"
              v-on:click="saveLangToken('ar', 1)"
              :class="langName == 'ar' ? 'active' : ''"
              >عربي</b-button
            >
            <div v-if="IsLanguageSelected" class="landing-text small">
              Please Select Language
            </div>
          </div>

          <div v-if="false" class="col-md-12">
            <router-link
              v-on:click.native="onClickNext()"
              v-if="preimere == true || preimere == 'true'"
              to
            >
              <img
                src="@/assets/img/svg/next-icon-black.svg"
                class="img-fluid"
                width="40"
                height="40"
              />
            </router-link>
            <router-link v-on:click.native="onClickNext()" v-else to>
              <img
                src="@/assets/img/svg/next-icon.svg"
                class="img-fluid"
                width="40"
                height="40"
              />
            </router-link>
          </div>

          <!-- <div v-if="langName == 'ar'" class="landing-text mt-4 small">يرجى ملاحظة أنك قد تواجه
         انقطاعًا في الخدمة ، فنحن نقوم بتحديث موقعنا وتطبيقات الجوال لتحسين تجربة المستخدم ، نعتذر عن أي إزعاج.</div>
       <div v-else class="landing-text mt-4 small">
          Kindly note that you might experience service interruptions, we are upgrading our Website and Mobile Apps
          to enhance user experience, we apologize for any inconvenience.</div>
        </div>-->
        </div>
        <b-modal
          no-close-on-esc
          no-close-on-backdrop
          id="NoHostDataModal"
          ref="NoHostDataModal"
          title="Redirect"
          class="ErModal light-red-color"
        >
          <!-- <img class="mx-auto d-block mt-4" src="@/assets/img/svg/alert-icon.svg" width="45" height="auto"> -->
          <h6 class="pt-3 mb-0 text-center font-weight-bold">
            {{ allLanguageData.RedirectText }} {{ RedirectURL }}
          </h6>
          <b-button
            @click="onClickOk()"
            variant="default"
            class="btn btn-green mt-4 mb-3"
            >{{ allLanguageData.ErrorModal.Btn }}</b-button
          >
        </b-modal>
      </div>

      <span class="landingpage-right-line d-none d-md-block">
        <img src="@/assets/img/right.png" class="img-fluid" alt="" />
      </span>
    </section>

    <div class="landingpage-bottom-line d-md-none pb-4">
      <div class="line-1 mb-3"></div>
      <div class="line-2"></div>
    </div>
  </div>
</template>

<script>
import { LanguageService, CountryService } from '@/services/storage.service'
import { MODE } from '@/helper/constant.js'
import { makeRequest, makeRequestBrij } from '@/helper/internet.js'

// let preimereToken = window.localStorage.getItem("PREIMERE");
// if (
//   preimereToken == "null" ||
//   preimereToken == null ||
//   preimereToken == "false" ||
//   preimereToken == false
// ) {
//   import("../../assets/css/style.css").then(something => {
//     import("../../assets/css/responsive.css");
//   });
// } else {
//   import("../../assets/css/preimere-css.css").then(something => {
//     import("../../assets/css/responsive.css");
//   });
// }

export default {
  data () {
    return {
      preimere: false,
      langName: '',
      CountryName: 'Select Country',
      IsCountrySelected: false,
      IsLanguageSelected: false,
      RedirectURL: '',
      country_list_array: [],
      cinema_array: [],
      selectedCountry: {},
      countryData: {
        'Saudi Arabia': {
          'CountryID': 230,
          'arabic': 'المملكة العربية السعودية',
        },
        'Lebanon': {
          'CountryID': 119,
          'arabic': 'لبنان',
        },
        'Iraq': {
          'CountryID': 102,
          'arabic': 'ٱلْعِرَاق',
        },
        'Switzerland': {
          'CountryID': 230,
          'arabic': 'Switzerland',
        },
      }
    }
  },
  beforeCreate: function () {
    let pre = window.localStorage.getItem('PREIMERE')
    if (pre == null || pre == 'false' || pre == false) {
      document.body.className = 'landing-bg-img'
    } else {
      document.body.className = 'gold-img-section'
    }
  },
  beforeMount () {
    this.getBrijCinemas()
    let languageCheck = window.localStorage.getItem('language')
    let path = window.location.pathname
    if (languageCheck && path != '/countries') {
      let CountryName =
        window.localStorage.getItem('CountryName') || 'Select Country'

      let language_check = JSON.parse(window.localStorage.getItem('language'))

      let lang_id = language_check.lang == 'ar' ? 'ar' : ''
      // window.location.replace(`http://localhost:8082/${lang_id}`);
      // return false;

      console.log('beforeMount landing page')
      console.log({ CountryName }, `https://${window.location.host}`)

      if (CountryName == 'Lebanon') {
        window.location.replace(window.location.host == 'localhost:8082' ? `http://localhost:8082/${lang_id}` : `https://${window.location.host}/${lang_id}`)
      } else if (CountryName == 'Iraq') {
        window.location.replace(window.location.host == 'localhost:8082' ? `http://localhost:8082/${lang_id}` : `https://${window.location.host}/${lang_id}`)
      } else if (CountryName == 'Saudi Arabia') {
        window.location.replace(window.location.host == 'localhost:8082' ? `http://localhost:8082/${lang_id}` : `https://${window.location.host}/${lang_id}`)
      }
    }
  },
  mounted: function () {
    this.CountryName =
      window.localStorage.getItem('CountryName') || 'Select Country'

    if (this.CountryName == 'Lebanon') {
      this.CountryName = 'Lebanon'
      let CountryJSON = { CountryID: 119, ...this.selectedCountry }
      CountryService.saveCountry(CountryJSON, this.selectedCountry)
    } else if (this.CountryName == 'Iraq') {
      let CountryJSON = { CountryID: 102, ...this.selectedCountry }
      CountryService.saveCountry(CountryJSON, this.selectedCountry)
      this.CountryName = 'Iraq'
    } else if (this.CountryName == 'Saudi Arabia') {
      let CountryJSON = { CountryID: 230, ...this.selectedCountry }
      CountryService.saveCountry(CountryJSON, this.selectedCountry)
      this.CountryName = 'Saudi Arabia'
    }

    this.preimere = window.localStorage.getItem('PREIMERE')
    let lang = LanguageService.getLanguage()
    if (lang == null) {
      this.langName = ''
    } else {
      this.langName = lang['lang']
    }
  },
  methods: {
    getBrijCinemas: function () {
      this.showLoading()
      makeRequestBrij('/api/external/cinemas', 'POST', null, {})
        .then((response) => {
          const { error, res } = response
          if (res.data.status) {
            let { data } = res

            this.country_list_array = data.country_list_array
            this.cinema_array = data.Records
          }

          this.hideLoading()
        })
        .catch((error) => {
          this.hideLoading()
          console.log('Error', error)
        })
    },
    onSelectCountry: function (CountryName, CountryID, lang, id, brij_country, brij_lang) {
      console.log({ CountryName, CountryID, lang, id, brij_country })

      this.selectedCountry = brij_country
      this.CountryName = CountryName
      let CountryJSON = { CountryID: CountryID, ...brij_country }
      CountryService.saveCountry(CountryJSON, brij_country)
      this.saveLangToken(lang, id, brij_lang)
    },
    // onSelectCountryName: function (CountryName, CountryID) {
    //   this.CountryName = CountryName;
    //   let CountryJSON = { CountryID: CountryID };
    //   CountryService.saveCountry(CountryJSON);
    //   if (this.CountryName == "Lebanon") {
    //     //window.location.replace("http://lb.empirecinemas.com");
    //   }
    // },
    onClickOk () {
      this.$refs.NoHostDataModal.hide()
      window.location.href = this.RedirectURL
    },

    saveLangToken: function (lang, id, brij_lang = {}) {
      console.log('lang, id', lang, id)
      this.langName = lang
      let language = {
        lang: lang,
        lang_id: id,
        ...brij_lang,
      }
      LanguageService.saveLanguage(language, brij_lang)
      this.onClickNext(lang)
    },
    onClickNext (langname) {
      // let lang_id = "";
      // if (langname != "eng" || langname !== "eng") {
      // }

      let lang_id = langname == 'ar' ? 'ar' : ''

      console.log('this.CountryName', this.CountryName)
      window.localStorage.setItem('CountryName', this.CountryName)
      //  window.location.replace(`http://localhost:8082/${lang_id}`);
      // return false;
      if (
        window.location.host == 'dev.empirecinemas.net' ||
        window.location.host == 'empireksadev.binarynumbers.io'
      ) {
        console.log('Local executed')
        window.location.pathname = '/'
      } else {
        console.log('Else executed')
        // if (this.CountryName != "") {
        //   this.RedirectURL = `https://${window.location.host}/${lang_id}`;
        //   window.location.replace(window.location.host == 'localhost:8082' ? `http://localhost:8082/${lang_id}` : `https://${window.location.host}/${lang_id}`);
        //   window.localStorage.setItem("PREIMERE", false);
        // } else {
        //   window.location.pathname = "/";
        // }
        if (this.CountryName == 'Lebanon') {
          if (window.location.host == 'lb.empirecinemas.com') {
            window.location.replace(window.location.host == 'localhost:8082' ? `http://localhost:8082/${lang_id}` : `https://${window.location.host}/${lang_id}`)
          } else if (window.location.host == 'empirepremiere.com') {
            window.location.replace(window.location.host == 'localhost:8082' ? `http://localhost:8082/${lang_id}` : `https://${window.location.host}/${lang_id}`)
          } else if (
            window.location.host != 'lb.empirecinemas.com' ||
            window.location.host != 'empirepremiere.com'
          ) {
            this.RedirectURL = `https://${window.location.host}/${lang_id}`
            window.location.replace(window.location.host == 'localhost:8082' ? `http://localhost:8082/${lang_id}` : `https://${window.location.host}/${lang_id}`)
          }
        } else if (this.CountryName == 'Iraq') {
          if (window.location.host == 'irq.empirecinemas.com') {
            window.location.replace(window.location.host == 'localhost:8082' ? `http://localhost:8082/${lang_id}` : `https://${window.location.host}/${lang_id}`)
            window.localStorage.setItem('PREIMERE', false)
          } else if (window.location.host != 'irq.empirecinemas.com') {
            this.RedirectURL = `https://${window.location.host}/${lang_id}`
            window.location.replace(window.location.host == 'localhost:8082' ? `http://localhost:8082/${lang_id}` : `https://${window.location.host}/${lang_id}`)
          }
        } else if (this.CountryName === 'Saudi Arabia') {
          if (window.location.host == 'ksa.empirecinemas.com') {
            window.location.replace(window.location.host == 'localhost:8082' ? `http://localhost:8082/${lang_id}` : `https://${window.location.host}/${lang_id}`)
            window.localStorage.setItem('PREIMERE', false)
          } else if (window.location.host != 'ksa.empirecinemas.com') {
            this.RedirectURL = `https://${window.location.host}/${lang_id}`
            window.location.replace(window.location.host == 'localhost:8082' ? `http://localhost:8082/${lang_id}` : `https://${window.location.host}/${lang_id}`)
          }
        } else {
          window.location.pathname = '/'
        }
      }
    },
  },
  computed: {
    getContentLanguages () {
      return this.$store.getters.getKiosLanguage
    },
  },
}
</script>

<style scoped>
.header {
  display: none !important;
}

.footer {
  display: none !important;
}

.country-selection-list {
  color: #000;
  font-size: 14px;
  /* font-size: 18px; */
}

.country-selection-list .Item {
  cursor: pointer;
}

.country-selection-list .Item:hover {
  text-decoration: underline;
}
.country-selection-list .list-inline-item:not(:last-child) {
  margin-right: 2rem;
}

.country-selection-list li img {
  height: 50px;
  width: 50px;
  border-radius: 50%;
  object-fit: cover;
  object-position: center;
  image-rendering: pixelated;
}

@media (max-width: 767px) {
  .main-logo2 {
    height: auto;
    max-width: 85%;
  }
  .country-selection-list .list-inline-item:not(:last-child) {
    margin-right: 0rem;
  }
  .flex-1 {
    flex: 0.4;
    /* flex: 0.3; */
    text-align: right;
  }
  .flex-2 {
    flex: 0.2;
    text-align: center;
  }
  .flex-3 {
    flex: 0.5;
    text-align: left;
  }

  .landingpage-top-line .line-1 {
    display: block;
    height: 15px;
    width: 80%;
    background-color: #cf1f2e;
  }

  .landingpage-top-line .line-2 {
    display: block;
    height: 15px;
    width: 65%;
    margin-left: auto;
    background-color: #cf1f2e;
  }

  .landingpage-bottom-line .line-1 {
    display: block;
    height: 15px;
    width: 50%;
    background-color: #cf1f2e;
  }

  .landingpage-bottom-line .line-2 {
    display: block;
    height: 15px;
    width: 90%;
    margin-left: auto;
    background-color: #cf1f2e;
  }
}
</style>
