<template>
  <div class="header-space container contactus">
    <!-- IRAQ -->
    <div
      id="contactUs"
      :title="allLanguageData.ContactUsModal.Title"
      ref="contact_us"
      class="contactus text-danger py-4 my-4"
    >
      <h3 align="center" class="mb-4 font-weight-bold">
        {{ allLanguageData.ContactUs }}
      </h3>

      <!-- IRAQ -->
      <div v-if="CountryID == 102 || CountryID == '102'">
        <p class="mb-0 text-center">
          Family Mall -100 M Street -Erbil - Iraq
          <br />
          T: 0750 2 100 100 - 075 2 200 200
        </p>
      </div>

      <!-- KSA -->
      <div v-else-if="CountryID == 230 || CountryID == '230'">
        <p class="mb-0 text-center">
          KSA: 2663 Imam Saud Bin Abdulaziz Bin Mohammed Road, Al Muhammadiyah ,
          Riyadh 12364
          <!-- <br />T: +966 55 932 0170 -->
        </p>

        <!-- LEBANON -->
      </div>

      <div v-else>
        <p class="mb-0 text-center">
          Sodeco Square, Block A, 3rd floor, Damascus Road, Beirut, Lebanon
          <br />
          P.O.BOX 4680 T: +961 1 616 600
        </p>
      </div>

      <div align="center" class="mt-3 ar-number">
       <span class="margin-right:20px;"> <b>Email:</b> <a href="mailto:care@empirecinemas.com.sa" class="a-link">care@empirecinemas.com.sa </a></span>
       <br/>
       <span>
         <b>Twitter:</b>  <a href="https://twitter.com/EmpireCinemasSA" target="_blank" class="a-link">@EmpireCinemasSA</a></span>
      </div>

      <div class="row my-1">
        <div class="col-md-8 mx-auto px-5 contact-mobile-number">
          <div class="mb-3">
            <p class="pt-2 mb-0 text-center">
              {{ allLanguageData.ContactUsModal.Content }}
            </p>
            <p class="pt-3 mb-0 text-center">
              {{ allLanguageData.ContactUsModal.SubContent }}
            </p>
          </div>
          <label class="popup-label mt-4 mb-0">
            {{ allLanguageData.CommonModalInputs.Name }}
          </label>
          <b-form-input
            v-model="contactUsDeatils.Name"
            type="text"
            class="popup-input"
          />
          <label class="popup-label mt-4 mb-0">
            {{ allLanguageData.CommonModalInputs.Mobile }}
          </label>
          <!-- <vue-tel-input
            defaultCountry="SA"
            v-model="contactUsDeatils.Mobile"
            placeholder=""
            :autoFormat="false"
            @validate="validatePhone"
            class="form-control grid-emp-tel"
          ></vue-tel-input> -->
          <vue-phone-number-input
            color	="#cf1f2e"
              default-country-code="SA"
              @update="resultsExample = $event"
              v-model="contactUsDeatils.Mobile"
            />
          <!-- <b-form-input
            v-model="contactUsDeatils.Mobile"
            type="number"
            class="popup-input"
          /> -->
          <label class="popup-label mt-4 mb-0">
            {{ allLanguageData.CommonModalInputs.Email }}
          </label>

          <b-form-input
            v-model="contactUsDeatils.Email"
            type="email"
            class="popup-input"
          />

          <!-- <div class="col-12 col-md-6 mb-4">
            <small class="d-block fw-500">
              Country
            </small>
            <b-form-select
              v-validate="'required'"
              id="CountryID"
              name="CountryID"
              :options="contryOptions"
              v-model="contactUsDeatils.CountryID"
            ></b-form-select>
          </div>
          <div class="col-12 col-md-6 mb-4">
            <small class="d-block fw-500">
              City
            </small>
            <b-form-select
              v-validate="'required'"
              id="CityID"
              name="CityID"
              :options="cityOptions"
              v-model="contactUsDeatils.CityID"
            ></b-form-select>
          </div> -->

          <div class="d-flex flex-column">
            <label class="popup-label mt-4 mb-0">
              <!-- {{ allLanguageData.QuickBook.selectCinema }} -->
            </label>

            <b-dropdown
              id="dropdown-1"
              :text="SelectedCinema"
              variant="default"
              class="mt-3 mr-auto w-100 custom-dropdown custom-dropdown-2 popup-input"
            >
              <b-dropdown-item
                v-for="(cinema, cinemaKey) in cinemasList"
                :key="cinemaKey"
                v-on:click="onSelectCinema(cinema)"
                class="text-truncate"
              >
                {{ cinema.CinemaName }}
              </b-dropdown-item>
            </b-dropdown>
          </div>
          <label class="popup-label mt-4 mb-0">
            {{ allLanguageData.CommonModalInputs.Message }}
          </label>
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
                accept="image/jpeg, image/png, image/gif , application/pdf"
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
      <div class="my-2 errorMessage text-center" style="color:red;">
        {{ contactUsDeatils.errorMessage }}
      </div>
      <div class="text-center">
        <b-button @click="onSubmitContactForm()" class="btn popup-btn mt-3">
          {{ allLanguageData.ContactUsModal.Btn }}
        </b-button>
      </div>
      <!-- <div class="text-center mt-2 last-text">
              * {{ allLanguageData.CommonModalFooter.RequiredFields }}
            </div> -->
      <div class="text-center mt-2 last-text">{{ SuccessMessage }}</div>
    </div>
  </div>
</template>
<script>
import { LanguageService, CountryService } from '@/services/storage.service'
import { MODE } from '@/helper/constant.js'
import { URL_BASE } from '@/helper/constant'

import { makeRequest } from '@/helper/internet.js'
import axios from 'axios'

export default {
  data () {
    return {
      resultsExample: null,
      isValidNumber: false,
      load: false,
      contryOptions: [
        { value: null, text: 'Please select Country', disabled: true },
      ],
      cityOptions: [
        { value: null, text: 'Please select City', disabled: true },
      ],
      contactUsDeatils: {
        Name: '',
        Mobile: '',
        Email: '',
        Message: '',
        CountryID: null,
        CityID: null,
        errorMessage: '',
      },
      isNumberValid: false,
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
    this.fetchContries()
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

  watch: {
    'contactUsDeatils.CountryID': {
      handler (newCountry, oldCountry) {
        console.log('hdhdh')
        this.contactUsDeatils.CountryID = newCountry
        if (this.load) {
          this.contactUsDeatils.CityID = this.contactUsDeatils.CityID
            ? this.contactUsDeatils.CityID
            : null
        } else {
          this.contactUsDeatils.CityID = null
        }
        this.cityOptions = []
        this.fetchCities(newCountry)
        this.cityOptions.push({
          value: null,
          text: 'Please select City',
          disabled: true,
        })
      },
    },
    // resultsExample: {
    //   handler(value) {
    //     console.log(value)
    //     this.isValidNumber = value.isValid
    //     if (this.isValidNumber) {
    //       this.phoneNumberError = false
    //     } else {
    //       this.phoneNumberError = true
    //     }
    //   },
    // },
  },

  methods: {
    fetchContries () {
      makeRequest('/GetCountries/', 'POST', null, {})
        .then((result) => {
          const { error, res } = result
          // const { data } = res.data
          console.log(res.data)
          this.contryOptions = Object.entries(
            res.data.Countries
          ).map(([key, value ]) => ({ value: value, text: key }))
          this.contryOptions.push({
            value: null,
            text: 'Please select Country',
            disabled: true,
          })
        })
        .catch((err) => console.log(err))
    },
    fetchCities (countryId) {
      const payload = {
        LanguageID: 2,
        CountryID: countryId,
        countryid: countryId,
      }
      var config = {
        method: 'POST',
        url: `${URL_BASE}/GetCities`,
        headers: {
          'Content-Type': 'application/json',
        },
        data: JSON.stringify(payload),
      }
      axios(config).then((result) => {
        const { error, data } = result
        if (data.Cities && data.Cities.length) {
          this.cityOptions = data.Cities.map((val) => ({
            value: val.CityID || '',
            text: val.CityName || '',
          }))
          this.cityOptions.push({
            value: null,
            text: 'Please select City',
            disabled: true,
          })
          console.log(this.cityOptions)
        }
      })
    },
    validatePhone (country) {
      if (country && country.valid && country.valid == true) {
        this.isNumberValid = true
      } else {
        this.isNumberValid = false
      }
      console.log(this.isNumberValid)
    },
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
      makeRequest('/GetCinemas/', 'POST', null, payload)
        .then((result) => {
          const { error, res } = result
          const { data } = res.data
          if (!error) {
            this.cinemasList = res.data.Categories
            // console.log(this.cinemasList, "daadad", res.data.Categories);
          }
        })
        .catch((error) => {
          // console.log("Error on vue front", error);
        })
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

      // console.log(/^\d{10}$/.test(this.contactUsDeatils.Mobile));

      if (this.contactUsDeatils.Name == '') {
        this.contactUsDeatils.errorMessage = 'Contact Name Cannot be Empty'
        return false
      } else if (this.contactUsDeatils.Mobile == '') {
        this.contactUsDeatils.errorMessage = 'Mobile Number Cannot be Empty'
        return false
      } else if (this.resultsExample.isValid == false) {
        // alert();
        this.contactUsDeatils.errorMessage = 'Mobile Number is Invalid'
        return false
      }
      // else if (
      //         /^\d{10}$/.test(this.contactUsDeatils.Mobile) == false &&
      //         this.dialCode == "964"
      //       ) {
      //         this.contactUsDeatils.errorMessage = "Mobile Number is Invalid";
      //         return false;
      //       } else if (
      //         /^\d{9}$/.test(this.contactUsDeatils.Mobile) == false &&
      //         this.dialCode == "961"
      //       ) {
      //         this.contactUsDeatils.errorMessage = "Mobile Number is Invalid";
      //         return false;
      //       }
      else if (this.SelectedCinema === 'Select Cinema') {
        this.contactUsDeatils.errorMessage = 'Cinema Cannot be Empty'
        return false
      }

      // else if (this.ImageURL == "" || this.ImageURL == null) {
      //   this.contactUsDeatils.errorMessage = "Image Cannot be Empty";
      //   return false;
      // }
      else if (
        this.contactUsDeatils.Email == '' ||
        /\S+@\S+\.\S+/.test(this.contactUsDeatils.Email) == false
      ) {
        this.contactUsDeatils.errorMessage =
          'Email Address Cannot be Empty / Invalid Email'
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
        // this.showLoading()
        let payload = {
          Contact_name: this.contactUsDeatils.Name,
          Contact_mobile: this.contactUsDeatils.Mobile,
          Contact_email: this.contactUsDeatils.Email,
          Contact_message: this.contactUsDeatils.Message,
          Cinemaname: this.SelectedCinema,
          attachment: this.ImageURL,
        }
        // makeRequest('/ContactUsData', 'POST', null, payload)
        //   .then((response) => {
        //     const { error, res } = response
        //     this.hideLoading()
        //     if (!error) {
        //       if (res.data.Status) {
        //         // this.contactUsDeatils.errorMessage = res.data.Message;
        //         this.contactUsDeatils.Name = ''
        //         this.contactUsDeatils.Mobile = ''
        //         this.contactUsDeatils.Email = ''
        //         this.contactUsDeatils.Message = ''
        //         this.FileName = 'No File'
        //         this.SelectedCinema = 'SELECT CINEMA'
        //         this.SuccessMessage = res.data.Message
        //         setTimeout(() => {
        //           this.$refs.contact_us.hide()
        //         }, 3000)
        //       } else {
        //         this.contactUsDeatils.errorMessage = res.data.Message
        //       }
        //       // handle if error
        //     }
        //   })
        //   .catch((error) => {
        //     console.log('Error', error)
        //     //   resolve(null);
        //     this.contactUsDeatils.errorMessage = 'Please Fill in all the fields'
        //   })
      }
    },
  },
}
</script>
<style>
#contactUs {
  background-color: #e4e4e4;
  color: #434345 !important;
}
#contactUs .popup-label {
  color: #434345 !important;
}
#contactUs .popup-input {
  border-bottom: 1px solid #434345 !important;
  color: #434345 !important;
}
#contactUs #uploadFile {
  color: #434345 !important;
}
#contactUs input::placeholder {
  color: #434345 !important;
}
#contactUs .popup-btn {
  background-color: #5a6268 !important;
  color: white;
}
.contact-mobile-number .form-control {
  border-bottom: 1px solid #434345 !important;
  border-top: 1px solid transparent !important;
  border-left: 1px solid transparent !important;
  border-right: 1px solid transparent !important;
  color: #434345 !important;
}
.contact-mobile-number .vti__input {
  color: #434345 !important;
  opacity: 1;
}
.contact-mobile-number .vti__input::placeholder {
  background: #e4e4e4;
  opacity: 0;
}
.contactus .custom-dropdown-2 .dropdown-toggle {
  padding-left: 0;
}

#contactUs .vue-phone-number-input {
   border-bottom: 1px solid #434345 !important;
}

#contactUs .cinema-one-dropdown .dropdown-toggle::after {
  position: absolute;
    right: 0;
    top: 13px;
    text-align: left;
}
#contactUs .cinema-one-dropdown .dropdown-toggle {
  text-align: left;
}
</style>
