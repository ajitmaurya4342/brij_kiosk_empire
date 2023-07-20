<template>
  <div class="emp-footer">
    <!--Desktop Footer-->
    <div class="container custom-container d-none d-md-block">
      <div class="mb-3 d-flex flex-wrap">
        <div class="d-flex align-items-center pb-2">
          <div>
            <img
              src="@/assets/img/new-img/svg-img/phone-icon.svg"
              class="f-icon"
            />
          </div>
          <div
            v-bind:class="langName == 'ar' ? 'pr-2' : 'pl-2'"
            role="button"
            href="tel:+9002 000 000"
          >
          9200009531
          </div>
        </div>
        <hr class="vertical" />
        <div class="d-flex align-items-center pb-2">
          <div class="pr-4">{{ allLanguageData.FollowUs }}</div>
          <div class="pr-3">
            <a href="https://www.instagram.com/empirecinemas.sa/">
              <img
                src="@/assets/img/new-img/svg-img/insta-icon.svg"
                class="f-icon"
              />
            </a>
          </div>
          <div class="pr-3">
            <a
              href="https://www.facebook.com/Empire-Cinemas-SA-1879495692363400"
            >
              <img
                src="@/assets/img/new-img/svg-img/facebook-icon.svg"
                class="f-icon"
              />
            </a>
          </div>
          <div class="pr-3">
            <a href="https://www.snapchat.com/add/empirecinemassa">
              <img
                src="@/assets/img/new-img/svg-img/snapchat-icon.svg"
                class="f-icon"
              />
            </a>
          </div>
          <div class="pr-3">
            <a href="https://twitter.com/EmpireCinemasSA">
              <img
                src="@/assets/img/new-img/svg-img/twitter-icon.svg"
                class="f-icon"
              />
            </a>
          </div>
        </div>
        <hr class="vertical" />
        <!-- <div class="d-flex align-items-center pb-2">
          <div class="pr-4">{{ allLanguageData.OurPartners }}</div>
          <div class="pr-3">
            <img
              src="@/assets/img/new-img/svg-img/partner-1.svg"
              class="f-icon"
            />
          </div>
          <div class="pr-3">
            <img
              src="@/assets/img/new-img/svg-img/partner-2.svg"
              class="f-icon"
            />
          </div>
          <div class="pr-3">
            <img
              src="@/assets/img/new-img/svg-img/partner-3.svg"
              class="f-icon"
            />
          </div>
        </div> -->
        <!-- <hr class="vertical" /> -->
        <div class="d-flex align-items-center">
          <div class="pr-4">{{ allLanguageData.DownloadApp }}</div>
          <div class="pr-3">
            <a href="https://apps.apple.com/in/app/empire-cinemas/id1459864736">
              <img
                src="@/assets/img/new-img/svg-img/apple-icon.svg"
                class="f-icon"
              />
            </a>
          </div>
          <div class="pr-3">
            <a
              href="https://play.google.com/store/apps/details?id=com.binary.empirecinema"
            >
              <img
                src="@/assets/img/new-img/svg-img/playstore-icon.svg"
                class="f-icon"
              />
            </a>
          </div>
        </div>
      </div>
      <div class="pages-items d-flex justify-content-center mb-3">
        <ul class="list-inline mb-0 d-flex flex-wrap">
          <li class="list-inline-item">
            <router-link to="/about-us" class="text-white">{{
              allLanguageData.FooterLinks[0].title
            }}</router-link>
          </li>
          <li class="list-inline-item">
            <router-link to="/contact-us" class="text-white">{{
              allLanguageData.FooterLinks[1].title
            }}</router-link>
          </li>
          <li class="list-inline-item">
            <router-link
              :to="
                CountryID == 230 || CountryID == '230'
                  ? '/ksa-terms-condition'
                  : '/terms-condition'
              "
              class="text-white"
              >{{ allLanguageData.FooterLinks[2].title }}</router-link
            >
          </li>
          <li class="list-inline-item">
            <router-link
              :to="
                CountryID == 230 || CountryID == '230' ? '/privacy-policy' : ''
              "
              class="text-white"
              >{{ allLanguageData.FooterLinks[3].title }}</router-link
            >
          </li>
        </ul>
      </div>
      <div class="copyright d-flex justify-content-center align-items-center">
        <div>
          <img src="@/assets/img/svg/footer-white-logo.svg" />
        </div>
        <div v-bind:class="langName == 'ar' ? 'mr-2' : 'ml-2'">
          {{ allLanguageData.Copyright }} 2021 &copy;
          {{ allLanguageData.EMPIRECINEMAS }}.
          {{ allLanguageData.RightsReserved }}
        </div>
      </div>
    </div>
    <!--End Desktop Footer-->
    <!--Mobile Footer-->
    <div class="container mobile-footer custom-container d-block d-md-none">
      <div class="mb-3">
        <!-- <div class="d-flex align-items-center pb-2">
          <div>
            <img
              src="@/assets/img/new-img/svg-img/phone-icon.svg"
              class="f-icon"
            />
          </div>
          <div class="pl-2">9002 000 000</div>
        </div> -->
        <div class="pb-3 d-flex">
          <div>
            <label class="footer-follow-us">{{
              allLanguageData.FollowUs
            }}</label>

            <ul class="footer-social-list">
              <li>
                <a href="https://www.instagram.com/empirecinemas.sa/">
                  <img
                    src="@/assets/img/new-img/svg-img/insta-icon.svg"
                    class="f-icon"
                  />
                </a>
              </li>

              <li>
                <a href="https://www.facebook.com/Empire-Cinemas-SA-1879495692363400">
                  <img
                    src="@/assets/img/new-img/svg-img/facebook-icon.svg" class="f-icon"/>
                </a>
              </li>
              <li>
                <a href="https://www.snapchat.com/add/empirecinemassa">
                  <img src="@/assets/img/new-img/svg-img/snapchat-icon.svg" class="f-icon" />
                </a>
              </li>
              <li>
                <a href="https://twitter.com/EmpireCinemasSA">
                  <img src="@/assets/img/new-img/svg-img/twitter-icon.svg" class="f-icon" />
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div class="mb-3">
          <ul class="list-inline mb-0">
            <li class="list-inline-item pb-2">
              <router-link to="/about-us" class="text-white">{{
                allLanguageData.FooterLinks[0].title
              }}</router-link>
            </li>
            <li class="list-inline-item pb-2">
              <router-link to="/contact-us" class="text-white">{{
                allLanguageData.FooterLinks[1].title
              }}</router-link>
            </li>
            <li class="list-inline-item pb-2">
              <router-link
                :to="
                  CountryID == 230 || CountryID == '230'
                    ? '/ksa-terms-condition'
                    : '/terms-condition'
                "
                class="text-white"
                >{{ allLanguageData.FooterLinks[2].title }}</router-link
              >
            </li>
            <li class="list-inline-item">
              <router-link
                :to="
                  CountryID == 230 || CountryID == '230'
                    ? '/privacy-policy'
                    : ''
                "
                class="text-white"
                >{{ allLanguageData.FooterLinks[3].title }}</router-link
              >
            </li>
          </ul>
        </div>
        <!-- <div class="d-flex align-items-center py-3">
          <div class="pr-4">{{ allLanguageData.OurPartners }}</div>
          <div class="pr-3">
            <img
              src="@/assets/img/new-img/svg-img/partner-1.svg"
              class="f-icon"
            />
          </div>
          <div class="pr-3">
            <img
              src="@/assets/img/new-img/svg-img/partner-2.svg"
              class="f-icon"
            />
          </div>
          <div class="pr-3">
            <img
              src="@/assets/img/new-img/svg-img/partner-3.svg"
              class="f-icon"
            />
          </div>
        </div> -->
        <div class="d-flex align-items-center">
          <div class="pr-4">{{ allLanguageData.DownloadApp }}</div>
          <div class="pr-3">
            <a href="https://apps.apple.com/in/app/empire-cinemas/id1459864736">
              <img
                src="@/assets/img/new-img/svg-img/apple-icon.svg"
                class="f-icon"
              />
            </a>
          </div>
          <div class="pr-3">
            <a
              href="https://play.google.com/store/apps/details?id=com.binary.empirecinema"
            >
              <img
                src="@/assets/img/new-img/svg-img/playstore-icon.svg"
                class="f-icon"
              />
            </a>
          </div>
        </div>
      </div>

      <div class="copyright d-flex align-items-center">
        <div>
          <img src="@/assets/img/svg/footer-white-logo.svg" />
        </div>
        <div v-bind:class="langName == 'ar' ? 'mr-2' : 'ml-2'">
          {{ allLanguageData.Copyright }} 2021 &copy;
          {{ allLanguageData.EMPIRECINEMAS }}.
          {{ allLanguageData.RightsReserved }}
        </div>
      </div>
    </div>
    <!--End Mobile Footer Footer-->
    <!----------- CONTACT US MODAL ---------->
    <b-modal
      id="contactUs"
      :title="allLanguageData.ContactUsModal.Title"
      ref="contact_us"
      class="contactus text-danger"
      hide-footer
    >
      <!-- IRAQ -->
      <div v-if="CountryID == 102 || CountryID == '102'">
        <p class="mb-0 text-center text-white">
          Family Mall -100 M Street -Erbil - Iraq
          <br />T: 0750 2 100 100 - 075 2 200 200
        </p>
      </div>

      <!-- KSA -->
      <div v-else-if="CountryID == 230 || CountryID == '230'">
        <p class="mb-0 text-center text-white">
          KSA: 2663 Imam Saud Bin Abdulaziz Bin Mohammed Road, Al Muhammadiyah ,
          Riyadh 12364
          <!-- <br />T: +966 55 932 0170 -->
        </p>

        <!-- LEBANON -->
      </div>

      <div v-else>
        <p class="mb-0 text-center text-white">
          Sodeco Square, Block A, 3rd floor, Damascus Road, Beirut, Lebanon
          <br />P.O.BOX 4680 T: +961 1 616 600
        </p>
      </div>

      <p class="pt-2 mb-0 text-center text-white">
        {{ allLanguageData.ContactUsModal.Content }}
      </p>
      <div class="row my-4">
        <div class="col-md-8 mx-auto">
          <label class="popup-label mt-4 mb-0">{{
            allLanguageData.CommonModalInputs.Name
          }}</label>
          <b-form-input
            v-model="contactUsDeatils.Name"
            type="text"
            class="popup-input"
          />
          <label class="popup-label mt-4 mb-0">{{
            allLanguageData.CommonModalInputs.Mobile
          }}</label>

          <b-form-input
            v-model="contactUsDeatils.Mobile"
            type="number"
            class="popup-input"
          />
          <label class="popup-label mt-4 mb-0">{{
            allLanguageData.CommonModalInputs.Email
          }}</label>

          <b-form-input
            v-model="contactUsDeatils.Email"
            type="email"
            class="popup-input"
          />
          <div class="d-flex flex-column">
            <label class="popup-label mt-4 mb-0">Select Cinema</label>

            <b-dropdown
              id="dropdown-1"
              :text="SelectedCinema"
              variant="default"
              class="
                mt-3
                mr-auto
                w-100
                custom-dropdown
                popup-input
                cinema-dropdown
              "
            >
              <b-dropdown-item
                v-for="(cinema, cinemaKey) in cinemasList"
                :key="cinemaKey"
                v-on:click="onSelectCinema(cinema)"
                class="text-truncate"
                >{{ cinema.CinemaName }}</b-dropdown-item
              >
            </b-dropdown>
          </div>
          <label class="popup-label mt-4 mb-0">{{
            allLanguageData.CommonModalInputs.Message
          }}</label>
          <textarea
            v-model="contactUsDeatils.Message"
            class="popup-input form-control"
            cols="20"
            rows="4"
          ></textarea>

          <div class="text-center mx-auto cus-margin-both mt-3">
            <span class="pr-2 upload-btn">
              <svg
                aria-hidden="true"
                fill="#dc3545"
                height="auto"
                width="20px"
                data-prefix="fas"
                data-icon="file-upload"
                class="svg-inline--fa fa-file-upload fa-w-12"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 384 512"
              >
                <path
                  d="M224 136V0H24C10.7 0 0 10.7 0 24v464c0 13.3 10.7 24 24 24h336c13.3 0 24-10.7 24-24V160H248c-13.2 0-24-10.8-24-24zm65.18 216.01H224v80c0 8.84-7.16 16-16 16h-32c-8.84 0-16-7.16-16-16v-80H94.82c-14.28 0-21.41-17.29-11.27-27.36l96.42-95.7c6.65-6.61 17.39-6.61 24.04 0l96.42 95.7c10.15 10.07 3.03 27.36-11.25 27.36zM377 105L279.1 7c-4.5-4.5-10.6-7-17-7H256v128h128v-6.1c0-6.3-2.5-12.4-7-16.9z"
                />
              </svg>
            </span>
            <label class="custom-file-upload btn">
              <input
                type="file"
                id="resume"
                v-on:change="uploadImage($event)"
                accept="image/jpeg, image/png, image/gif"
                class="d-none"
                name="resume"
              />
              {{ allLanguageData.UploadFile }}
            </label>
            <div class="text-center">
              <input
                id="uploadFile"
                :placeholder="FileName"
                disabled="disabled"
              />
            </div>
          </div>
        </div>
      </div>
      <div class="my-2 errorMessage text-center">
        {{ contactUsDeatils.errorMessage }}
      </div>
      <div class="text-center">
        <b-button @click="onSubmitContactForm()" class="btn popup-btn mt-3">{{
          allLanguageData.ContactUsModal.Btn
        }}</b-button>
      </div>
      <!-- <div class="text-center mt-2 last-text">
              * {{ allLanguageData.CommonModalFooter.RequiredFields }}
            </div> -->
      <div class="text-center mt-2 last-text">{{ SuccessMessage }}</div>
    </b-modal>
  </div>
</template>
<script>
import { LanguageService, CountryService } from '@/services/storage.service'
import { MODE } from '@/helper/constant.js'
import { makeRequest } from '@/helper/internet.js'
import axios from 'axios'

export default {
  data () {
    return {
      contactUsDeatils: {
        Name: '',
        Mobile: '',
        Email: '',
        Message: '',
        errorMessage: '',
      },
      SuccessMessage: '',
      SelectedCinema: 'Select Cinema',
      FileName: 'No File',
      ImageURL: '',
      cinemasList: [],
      preimere: false,
      selectedCountry: '',
      ksa: false,
      CountryIDNew: JSON.parse(window.localStorage.getItem('country'))[
        'CountryID'
      ],
    }
  },
  beforeMount () {
    if (window.location.host != 'empirecinemas.com') {
      this.fetchCinemasList()
    }
  },
  mounted: function () {
    if (this.$route.path == '/ksa' || this.$route.path == '/iraq') {
      this.ksa = true
    }
    this.selectedCountry =
      window.localStorage.getItem('CountryName') || 'LEBANON'

    if (window.location.hostname == 'lb.empirecinemas.com') {
      this.CountryName = 'Lebanon'
    } else if (window.location.hostname == 'empirecinemas.me') {
      this.CountryName = 'Iraq'
    }

    this.preimere = window.localStorage.getItem('PREIMERE')
    //  this.CountryIDNew = JSON.parse(window.localStorage.getItem("country"));

    // console.log(this.CountryIDNew);
    // this.fbSocialLink =
    //   CountryID == "119" ? "fgdsf" : CountryID == "102" ? "fdsf" : "fsdfdsfds";
  },
  computed: {
    facebookLink () {
      var url = 'http://www.facebook.com/'
      if (this.CountryIDNew == '119') {
        url += 'EmpireCinemas'
      } else if (this.CountryIDNew == '102') {
        url += 'empirecinemaskurdistan'
      } else if (this.CountryIDNew == '230') {
        url += 'empirecinemasksa'
      }
      return url
    },

    twitterLink () {
      var url = 'http://www.twitter.com/'
      if (this.CountryIDNew == '119') {
        url += 'EmpireCinema_lb'
      } else if (this.CountryIDNew == '102') {
        url += ''
      } else if (this.CountryIDNew == '230') {
        url += 'empirecinemaksa'
      }
      return url
    },

    instagramLink () {
      var url = 'http://www.instagram.com/'
      if (this.CountryIDNew == '119') {
        url += 'empirecinemas_lb'
      } else if (this.CountryIDNew == '102') {
        url += 'empire_cinemas_kurdistan'
      } else if (this.CountryIDNew == '230') {
        url += 'empirecinemasksa'
      }
      return url
    },
  },

  methods: {
    changeCountry: function (countryName, CountryID) {
      window.localStorage.setItem('CountryName', countryName)
      let CountryJSON = {
        CountryID: CountryID,
      }
      window.localStorage.setItem('PREIMERE', false)
      CountryService.saveCountry(CountryJSON)
      console.log('countryName::: :', countryName)
      // if (MODE == "dev") {
      //   window.location.pathname = "/landingpage/";
      // } else {
      if (
        window.location.host == 'dev.empirecinemas.net' ||
        window.location.host == 'localhost:8082' ||
        window.location.host == 'empireksadev.binarynumbers.io'
      ) {
        window.location.pathname = '/'
      } else if (countryName == 'Iraq') {
        // window.localStorage.removeItem("CountryName");
        window.location.replace('https://empirecinemas.me/landingpage')
        // window.location.pathname = "/landingpage/";
      } else if (countryName == 'Saudi Arabia') {
        // window.location.replace("http://empirecinemas.net/landingpage");
        window.location.replace('https://empirecinemas.com.sa/landingpage')
      } else {
        window.location.replace('https://lb.empirecinemas.com/landingpage')
        // window.location.pathname = "/landingpage/";
      }
      // }
    },
    fetchCinemasList: function () {
      let payload = {}
      // GetAllCinemasList
      // makeRequest('/GetCinemas/', 'POST', null, payload)
      //   .then(result => {
      //     const { error, res } = result
      //     const { data } = res.data
      //     if (!error) {
      //       this.cinemasList = res.data.Data
      //     }
      //   })
      //   .catch(error => {
      //     // console.log("Error on vue front", error);
      //   })
    },
    onSelectCinema (cinema) {
      this.SelectedCinema = cinema.CinemaName
    },
    uploadImage: function (e) {
      let self = this
      var image = e.target.files[0]
      // image = image[0];
      var url =
        this.CountryIDNew == '230'
          ? //  ? "https://empireksaapi.binarynumbers.io/commonUploadFiles"
        //  : "https://empireapi.binarynumbers.io/commonUploadFiles";

          'https://apiksa.empirecinemas.com.sa/commonUploadFiles'
          : 'https://apiksa.empirecinemas.com.sa/commonUploadFiles'

      this.FileName = image.name
      var formdata = new FormData()
      formdata.append('assets/images/Support', image)
      axios
        .post(url, formdata, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        .then(function (response) {
          const { data } = response
          if (data.Status) {
            self.ImageURL = data.Path
          } else {
            self.$root.$emit('bv::show::modal', 'errorModal')
          }
        })
        .catch(function (error) {
          self.$root.$emit('bv::show::modal', 'errorModal')
          console.log(error)
        })
      // makeRequest("/commonUploadFiles", "POST", null, formdata)
      //   .then(response => {
      //     const { data } = response;
      //     console.log("data :", data);
      //   })
      //   .catch(error => {
      //     console.log("error :", error);
      //   });
    },
    validateForm () {
      let value = true
      this.contactUsDeatils.errorMessage = ''
      if (this.contactUsDeatils.Name == '') {
        this.contactUsDeatils.errorMessage = 'Contact Name Cannot be Empty'
        return false
      } else if (this.contactUsDeatils.Mobile == '') {
        this.contactUsDeatils.errorMessage = 'Mobile Number Cannot be Empty'
        return false
      } else if (this.SelectedCinema === 'Select Cinema') {
        this.contactUsDeatils.errorMessage = 'Cinema Cannot be Empty'
        return false
      }
      // else if (this.ImageURL == "" || this.ImageURL == null) {
      //   this.contactUsDeatils.errorMessage = "Image Cannot be Empty";
      //   return false;
      // }
      else if (this.contactUsDeatils.Email == '') {
        this.contactUsDeatils.errorMessage = 'Email Address Cannot be Empty'
        return false
      } else if (this.contactUsDeatils.Message == '') {
        this.contactUsDeatils.errorMessage = 'Message Cannot be Empty'
        return false
      } else {
        return true
      }
    },
    onSubmitContactForm: function () {
      if (this.validateForm()) {
        this.showLoading()
        let payload = {
          Contact_name: this.contactUsDeatils.Name,
          Contact_mobile: this.contactUsDeatils.Mobile,
          Contact_email: this.contactUsDeatils.Email,
          Contact_message: this.contactUsDeatils.Message,
          Cinemaname: this.SelectedCinema,
          attachment: this.ImageURL,
        }
        makeRequest('/ContactUs', 'POST', null, payload)
          .then(response => {
            const { error, res } = response
            this.hideLoading()
            if (!error) {
              if (res.data.Status) {
                // this.contactUsDeatils.errorMessage = res.data.Message;
                this.contactUsDeatils.Name = ''
                this.contactUsDeatils.Mobile = ''
                this.contactUsDeatils.Email = ''
                this.contactUsDeatils.Message = ''
                this.FileName = 'No File'
                this.SelectedCinema = 'SELECT CINEMA'
                this.SuccessMessage = res.data.Message
                setTimeout(() => {
                  this.$refs.contact_us.hide()
                }, 3000)
              } else {
                this.contactUsDeatils.errorMessage = res.data.Message
              }
              // handle if error
            }
          })
          .catch(error => {
            console.log('Error', error)
            //   resolve(null);
            this.contactUsDeatils.errorMessage =
              'Please Fill in all the fields'
          })
      }
    },
  },
}
</script>

<style>
.emp-footer {
  background-color: #ce1f2e;
  color: #fff;
  width: 100%;
  position: static !important;
  text-transform: uppercase;
  font-size: 14px;
  font-weight: 500;
  padding: 35px 0;
}
.emp-footer .vertical {
  border-top: 2px solid #fff;
  width: 15px;
  margin-top: 0.7rem;
  margin-bottom: 0px;
  transform: rotate(90deg);
}
.emp-footer .pages-items .list-inline-item a {
  color: #fff;
}
.rtl-class .emp-footer .pages-items .list-inline-item a {
  padding: 0 10px;
}
.emp-footer .pages-items .list-inline-item {
  margin-right: 0px;
}
.emp-footer .pages-items .list-inline-item:not(:last-child):after {
  content: "";
  height: 4px;
  width: 4px;
  top: -2px;
  border-radius: 50%;
  position: relative;
  display: inline-block;
  background-color: white;
  margin: 0px 10px;
}
.rtl-class .emp-footer .pages-items .list-inline-item:not(:last-child):after {
      content: "";
    height: 4px;
    width: 4px;
    top: -18px;
    border-radius: 50%;
    position: relative;
    display: inline-block;
    background-color: white;
    margin: 0px 12px;
    right: 16px;
}
.emp-footer .copyright {
  text-transform: initial;
  font-weight: 300;
}
.emp-footer .f-icon {
  height: 25px;
}
.mobile-footer .list-inline {
  /* display: flex;
  flex-direction: column;
  align-items: center; */
  display: grid;
  grid-template-columns: 50% 50%;
  align-items: center;
}
.emp-footer .cinema-dropdown .dropdown-menu {
  width: 100% !important;
}
</style>
