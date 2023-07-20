<template>
  <footer class="footer" v-bind:class="{ 'footer-ksa': ksa }">
    <div class="col-md-11 mx-auto p-3">
      <!-- MOBILE FOOTER -->
      <div class="d-md-none">
        <div class="d-flex align-items-end justify-content-between">
          <!-- GOLDEN EN -->
          <div v-if="preimere == 'true' && langName !== 'ar'">
            <img
              src="@/assets/img/Premiere-Black.png"
              height="auto"
              width="150px"
              alt="Empire-logo"
            />
          </div>

          <!-- GOLDEN AR -->
          <div v-else-if="preimere == 'true' && langName == 'ar'">
            <img
              src="@/assets/img/ar-desk-black-logo.png"
              height="auto"
              width="150px"
              alt="Empire-logo"
            />
          </div>

          <!-- RED AR -->
          <div v-else-if="preimere !== 'true' && langName === 'ar'">
            <img
              src="@/assets/img/ar-desk-red-logo.png"
              height="auto"
              width="150px"
              alt="Empire-logo"
            />
          </div>

          <!-- RED EN -->
          <div v-else-if="preimere != 'true' && langName !== 'ar'">
            <img
              src="@/assets/img/svg/empire-logo.svg"
              height="auto"
              width="150px"
              alt="Empire-logo"
            />
          </div>

          <div>
            <ul
              class="list-inline mb-0"
              v-bind:class="langName == 'ar' ? 'cus-social' : ''"
            >
              <li class="list-inline-item">
                <router-link to="#">
                  <img
                    src="@/assets/img/svg/icon-facebook.svg"
                    height="15px"
                    width="15px"
                    alt="Facebook-icon"
                  />
                </router-link>
              </li>
              <li class="list-inline-item">
                <router-link to="#">
                  <img
                    src="@/assets/img/svg/icon-twitter.svg"
                    height="15px"
                    width="15px"
                    alt="Twitter-icon"
                  />
                </router-link>
              </li>
              <li class="list-inline-item">
                <router-link to="#">
                  <img
                    src="@/assets/img/svg/icon-instagram.svg"
                    height="15px"
                    width="15px"
                    alt="Instagram-icon"
                  />
                </router-link>
              </li>
              <li class="list-inline-item">
                <router-link to="#">
                  <img
                    src="@/assets/img/svg/icon-youtube.svg"
                    height="15px"
                    width="15px"
                    alt="Youtube-icon"
                  />
                </router-link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <!-- EMPIRE LOGO -->
      <div class="d-none d-md-block">
        <div class="d-flex align-items-center">
          <!-- GOLDEN EN -->
          <div v-if="preimere == 'true' && langName !== 'ar'">
            <img
              src="@/assets/img/Premiere-Black.png"
              height="auto"
              width="150px"
              alt="Empire-logo"
            />
          </div>

          <!-- GOLDEN AR -->
          <div v-else-if="preimere == 'true' && langName == 'ar'">
            <img
              src="@/assets/img/ar-desk-black-logo.png"
              height="auto"
              width="150px"
              alt="Empire-logo"
            />
          </div>

          <!-- RED AR -->
          <div v-else-if="preimere !== 'true' && langName === 'ar'">
            <img
              src="@/assets/img/ar-desk-red-logo.png"
              height="auto"
              width="150px"
              alt="Empire-logo"
            />
          </div>

          <!-- RED EN -->
          <div v-else-if="preimere != 'true' && langName !== 'ar'">
            <img
              src="@/assets/img/svg/empire-logo.svg"
              height="auto"
              width="150px"
              alt="Empire-logo"
            />
          </div>

          <div class="d-flex align-items-center w-100 mt-3">
            <hr
              v-if="preimere == true || preimere == 'true'"
              class="bg-black w-100"
              v-bind:class="langName == 'ar' ? 'mr-3' : 'ml-3'"
            />
            <hr
              v-else
              class="bg-white w-100"
              v-bind:class="langName == 'ar' ? 'mr-3' : 'ml-3'"
            />
          </div>
        </div>
      </div>

      <div>
        <ul
          class="list-inline my-3 d-none d-md-block"
          v-bind:class="langName == 'ar' ? 'cus-social' : ''"
        >
          <li class="list-inline-item">
            <a :href="facebookLink" target="_blank">
              <img
                v-if="preimere == true || preimere == 'true'"
                src="@/assets/img/svg/icon-facebook-black.svg"
                height="15px"
                width="15px"
                alt="Facebook-icon"
              />

              <img
                v-else
                src="@/assets/img/svg/icon-facebook.svg"
                height="15px"
                width="15px"
                alt="Facebook-icon"
              />
            </a>
          </li>
          <li class="list-inline-item">
            <a :href="twitterLink">
              <img
                v-if="preimere == true || preimere == 'true'"
                src="@/assets/img/svg/icon-twitter-black.svg"
                height="15px"
                width="15px"
                alt="Twitter-icon"
              />
              <img
                v-else
                src="@/assets/img/svg/icon-twitter.svg"
                height="15px"
                width="15px"
                alt="Twitter-icon"
              />
            </a>
          </li>
          <li class="list-inline-item">
            <a :href="instagramLink" target="_blank">
              <img
                v-if="preimere == true || preimere == 'true'"
                src="@/assets/img/svg/icon-instagram-black.svg"
                height="15px"
                width="15px"
                alt="Instagram-icon"
              />
              <img
                v-else
                src="@/assets/img/svg/icon-instagram.svg"
                height="15px"
                width="15px"
                alt="Instagram-icon"
              />
            </a>
          </li>
          <li class="list-inline-item">
            <a
              :href="'http://www.youtube.com/c/EmpireCinemaslbME'"
              target="_blank"
            >
              <img
                v-if="preimere == true || preimere == 'true'"
                src="@/assets/img/svg/icon-youtube-black.svg"
                height="15px"
                width="15px"
                alt="Youtube-icon"
              />
              <img
                v-else
                src="@/assets/img/svg/icon-youtube.svg"
                height="15px"
                width="15px"
                alt="Youtube-icon"
              />
            </a>
          </li>
        </ul>

        <div
          class="d-md-flex justify-content-center justify-content-md-between align-items-end"
        >
          <ul
            class="list-inline font-weight-bold mb-0 small my-3 my-md-0 footer-list"
          >
            <li class="list-inline-item">
              <router-link to="/about-us" class="text-white">{{
                allLanguageData.FooterLinks[0].title
              }}</router-link>
            </li>
            <li class="list-inline-item text-white">&bull;</li>
            <li class="list-inline-item">
              <router-link to="#" class="text-white" v-b-modal.contactUs>{{
                allLanguageData.FooterLinks[1].title
              }}</router-link>
            </li>
            <li class="list-inline-item text-white">&bull;</li>
            <li class="list-inline-item">
              <router-link to="/terms-condition" class="text-white">{{
                allLanguageData.FooterLinks[2].title
              }}</router-link>
            </li>
          </ul>

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
            <div v-else-if="CountryID == 190 || CountryID == '230'">
              <p class="mb-0 text-center text-white">
                KSA: 2663 Imam Saud Bin Abdulaziz Bin Mohammed Road, Al
                Muhammadiyah , Riyadh 12364
                <br />T: +966-11-4646111
              </p>

              <!-- LEBANON -->
            </div>

            <div v-else>
              <p class="mb-0 text-center text-white">
                Sodeco Square, Block A, 3rd floor, Damascus Road, Beirut,
                Lebanon
                <br />P.O.BOX 4680 T: +961 1 616 600
              </p>
            </div>

            <p class="pt-2 mb-0 text-center text-white">
              {{ allLanguageData.ContactUsModal.Content }}
            </p>
            <div class="row my-4">
              <div class="col-md-8 mx-auto">
                <b-form-input
                  v-model="contactUsDeatils.Name"
                  type="text"
                  :placeholder="allLanguageData.CommonModalInputs.Name"
                />
                <b-form-input
                  v-model="contactUsDeatils.Mobile"
                  type="number"
                  :placeholder="allLanguageData.CommonModalInputs.Mobile"
                  class="my-3"
                />
                <b-form-input
                  v-model="contactUsDeatils.Email"
                  type="email"
                  :placeholder="allLanguageData.CommonModalInputs.Email"
                />

                <b-dropdown
                  id="dropdown-1"
                  :text="SelectedCinema"
                  variant="default"
                  class="mt-3 contactUS-drop"
                >
                  <b-dropdown-item
                    v-for="(cinema, cinemaKey) in cinemasList"
                    :key="cinemaKey"
                    v-on:click="onSelectCinema(cinema)"
                    >{{ cinema.CinemaName }}</b-dropdown-item
                  >
                </b-dropdown>

                <textarea
                  v-model="contactUsDeatils.Message"
                  class="form-control rounded"
                  cols="20"
                  :placeholder="allLanguageData.CommonModalInputs.Message"
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
            <b-button
              @click="onSubmitContactForm()"
              class="btn btn-green mt-3"
              >{{ allLanguageData.ContactUsModal.Btn }}</b-button
            >
            <div class="text-center mt-2 last-text">
              * {{ allLanguageData.CommonModalFooter.RequiredFields }}
            </div>
          </b-modal>

          <div class="d-none d-md-block">
            <b-dropdown
              id="dropdown-left"
              variant="default"
              :text="selectedCountry"
              class="py-0 text-white"
            >
              <b-dropdown-item v-on:click="changeCountry('Lebanon', 119)"
                >LEBANON</b-dropdown-item
              >
              <b-dropdown-item v-on:click="changeCountry('Saudi Arabia', 0)"
                >SAUDI ARABIA</b-dropdown-item
              >
              <b-dropdown-item v-on:click="changeCountry('Iraq', 102)"
                >IRAQ</b-dropdown-item
              >
              <!-- <b-dropdown-item></b-dropdown-item> -->
            </b-dropdown>
          </div>
        </div>
      </div>
    </div>
  </footer>
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
    // this.fetchCinemasList();
  },
  mounted: function () {
    if (this.$route.path == '/ksa' || this.$route.path == '/iraq') {
      this.ksa = true
    }
    this.selectedCountry =
      window.localStorage.getItem('CountryName') || 'LEBANON'

    if (window.location.hostname == 'empire.com.lb') {
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
      } else if (this.CountryIDNew == '0') {
        url += 'EmpireCinemasKSA'
      }
      return url
    },

    twitterLink () {
      var url = 'http://www.twitter.com/'
      if (this.CountryIDNew == '119') {
        url += 'EmpireCinema_lb'
      } else if (this.CountryIDNew == '102') {
        url += ''
      } else if (this.CountryIDNew == '0') {
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
      } else if (this.CountryIDNew == '0') {
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
      // if (MODE == "dev") {
      //   window.location.pathname = "/landingpage/";
      // } else {
      if (countryName == 'Iraq') {
        // window.localStorage.removeItem("CountryName");
        window.location.replace('https://empirecinemas.me/landingpage')
        // window.location.pathname = "/landingpage/";
      } else if (countryName === 'Saudi Arabia') {
        // window.location.replace("http://empirecinemas.net/landingpage");
        window.location.pathname = '/ksa'
      } else {
        window.location.replace('https://empire.com.lb/landingpage')
        // window.location.pathname = "/landingpage/";
      }
      // }
    },
    // fetchCinemasList: function () {
    //   let payload = {};
    //   // GetAllCinemasList
    //   makeRequest("/GetAllCinemas/", "POST", null, payload)
    //     .then((result) => {
    //       const { error, res } = result;
    //       const { data } = res.data;
    //       if (!error) {
    //         this.cinemasList = res.data.Data;
    //       }
    //     })
    //     .catch((error) => {
    //       // console.log("Error on vue front", error);
    //     });
    // },
    onSelectCinema (cinema) {
      this.SelectedCinema = cinema.CinemaName
    },
    uploadImage: function (e) {
      let self = this
      var image = e.target.files[0]
      // image = image[0];
      this.FileName = image.name
      var formdata = new FormData()
      formdata.append('assets/images/Support', image)
      axios
        .post(
          //  "https://empireapi.binarynumbers.io/commonUploadFiles",
          'https://apiksa.empirecinemas.com.sa/commonUploadFiles',
          formdata,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          }
        )
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
      } else if (this.ImageURL == '' || this.ImageURL == null) {
        this.contactUsDeatils.errorMessage = 'Image Cannot be Empty'
        return false
      } else if (this.contactUsDeatils.Email == '') {
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
          .then((response) => {
            const { error, res } = response
            this.hideLoading()
            if (!error) {
              if (res.data.Status) {
                // this.contactUsDeatils.errorMessage = res.data.Message;
                this.contactUsDeatils.Name = ''
                this.contactUsDeatils.Mobile = ''
                this.contactUsDeatils.Email = ''
                this.contactUsDeatils.Message = ''
                setTimeout(() => {
                  this.$refs.contact_us.hide()
                }, 3000)
              } else {
                this.contactUsDeatils.errorMessage = res.data.Message
              }
              // handle if error
            }
          })
          .catch((error) => {
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
