<template>
  <div class="container mt-3">
    <p class="eTitle eTitleblack mb-0 text-center mb-0">
      <img
        v-if="preimere == true || preimere == 'true'"
        src="@/assets/img/svg/book-event-icon-black.svg"
        class="pr-2 pb-1"
      />
      <img v-else src="@/assets/img/svg/book-event-icon.svg" class="pr-2 pb-1" />
      {{allLanguageData.BOOKANEVENT}}
    </p>

    <!-- <div class="whitedotline-box">
      <hr class="white-dotline mt-2">
      <span></span>
    </div>-->
    <div v-if="preimere == true || preimere == 'true'">
      <img src="@/assets/img/svg/dotted-black-line.svg" class="w-100" alt />
    </div>
    <div v-else>
      <img src="@/assets/img/svg/dotted-line.svg" class="w-100" alt />
    </div>

    <p class="mb-0 pt-4 text-white text-black">
      {{allLanguageData.BOOKANEVENTContent}}
      <!-- Add flare to your business event, or treat your friends, colleagues or students to a
      private screening. We offer endless possibilities. Whatever the occasion, we will tailor the perfectpackage for
      you! To organize an event, host a private screening, or make a group booking,-->
      <span class="border-bottom-dotted c-pointer" v-b-modal.contactUs>{{allLanguageData.contactus}}</span>
      {{allLanguageData.today}}.
    </p>

    <div class="col-md-10 mx-auto">
      <div class="row text-center mt-5">
        <div class="col-md-4">
          <b-button
            class="btn-empire mb-3 mb-mb-0"
            v-b-modal.modal1
          >{{allLanguageData.SCHOOLBOOKINGS}}</b-button>
        </div>

        <div class="col-md-4">
          <b-button
            class="btn-empire mb-3 mb-md-0"
            v-b-modal.corporateBooking
          >{{allLanguageData.PRIVATEEVENTS}}</b-button>
        </div>

        <div class="col-md-4">
          <b-button class="btn-empire" v-b-modal.modal3>{{allLanguageData.SEMINARSANDTRAINING}}</b-button>
        </div>
      </div>
    </div>

    <div class="row justify-content-center text-center mt-4">
      <div class="col-md-4">
        <b-button
          class="btn-empire mb-3 mb-md-0"
          v-b-modal.modal4
        >{{allLanguageData.EVENTSANDPREMIERES}}</b-button>
      </div>
      <div class="col-md-4">
        <b-button class="btn-empire" v-b-modal.modal5>{{allLanguageData.BIRTHDAYS}}</b-button>
      </div>
    </div>

    <div class="section-space"></div>
    <form @submit.prevent="onSubmitEventInfo()" data-vv-scope="eventInfo">
      <div class="contact-info">
        <div class="text-center">
          <p class="font-weight-bold text-white text-black">{{allLanguageData.CONTACTINFO}}</p>
        </div>
        <div class="row">
          <div class="col-md-6">
            <b-form-input
              v-model="bookEventContact.Organization"
              v-validate="'required'"
              name="Organization"
              type="text"
              :placeholder="allLanguageData.Organization"
              class="my-3"
            />
            <div
              v-show="errors.has('eventInfo.Organization')"
              class="errorMessage"
            >{{ errors.first('eventInfo.Organization') }}</div>
          </div>
          <div class="col-md-6">
            <b-form-input
              v-model="bookEventContact.Mobile"
              v-validate="'required'"
              name="Mobile"
              type="text"
              :placeholder="allLanguageData.PhoneNumber"
              class="my-3"
            />
            <div
              v-show="errors.has('eventInfo.Mobile')"
              class="errorMessage"
            >{{ errors.first('eventInfo.Mobile') }}</div>
          </div>
        </div>

        <div class="row">
          <div class="col-md-4">
            <b-form-input
              v-model="bookEventContact.FirstName"
              v-validate="'required'"
              name="FirstName"
              type="text"
              :placeholder="allLanguageData.FirstName"
              class="my-3"
            />
            <div
              v-show="errors.has('eventInfo.FirstName')"
              class="errorMessage"
            >{{ errors.first('eventInfo.FirstName') }}</div>
          </div>

          <div class="col-md-4">
            <b-form-input
              v-model="bookEventContact.LastName"
              v-validate="'required'"
              name="LastName"
              type="text"
              :placeholder="allLanguageData.LastName"
              class="my-3"
            />
            <div
              v-show="errors.has('eventInfo.LastName')"
              class="errorMessage"
            >{{ errors.first('eventInfo.LastName') }}</div>
          </div>

          <div class="col-md-4">
            <b-form-input
              v-model="bookEventContact.Email"
              v-validate="'required|email'"
              name="Email"
              type="text"
              :placeholder="allLanguageData.NewEmail"
              class="my-3"
            />
            <div
              v-show="errors.has('eventInfo.Email')"
              class="errorMessage"
            >{{ errors.first('eventInfo.Email') }}</div>
          </div>
        </div>

        <div>
          <!-- <b-form-input v-model="bookEventContact.Address" v-validate="'required'" name="Address" type="text" placeholder="Address *" class="my-3" /> -->

          <b-form-textarea
            class="my-3"
            id="textarea"
            v-model="bookEventContact.Address"
            v-validate="'required'"
            name="Address"
            :placeholder="allLanguageData.Address"
            rows="3"
            max-rows="6"
          ></b-form-textarea>
          <div
            v-show="errors.has('eventInfo.Address')"
            class="errorMessage"
          >{{ errors.first('eventInfo.Address') }}</div>
        </div>

        <!-- <div>
        <b-form-input v-model="text1" type="text" placeholder="" class="my-3" />
        </div>-->

        <div class="section-space"></div>

        <div class="text-center">
          <p class="font-weight-bold text-white text-black">{{allLanguageData.EVENTINFO}}</p>
        </div>

        <div class="row">
          <div class="col-md-6">
            <b-form-input
              v-model="bookEventInfo.EventType"
              v-validate="'required'"
              name="EventType"
              type="text"
              :placeholder="allLanguageData.EventType"
              class="my-2"
            />
            <div
              v-show="errors.has('eventInfo.EventType')"
              class="errorMessage"
            >{{ errors.first('eventInfo.EventType') }}</div>
          </div>

          <div class="col-md-6">
            <b-form-input
              v-model="bookEventInfo.PurposeOfEvent"
              v-validate="'required'"
              name="PurposeOfEvent"
              type="text"
              :placeholder="allLanguageData.PurposeofEvent"
              class="my-2"
            />
            <div
              v-show="errors.has('eventInfo.PurposeOfEvent')"
              class="errorMessage"
            >{{ errors.first('eventInfo.PurposeOfEvent') }}</div>
          </div>
        </div>

        <div class="row">
          <div class="col-md-6">
            <b-form-input
              v-model="bookEventInfo.Theatre"
              v-validate="'required'"
              name="Theatre"
              type="text"
              :placeholder="allLanguageData.Theatre"
              class="my-2"
            />
            <div
              v-show="errors.has('eventInfo.Theatre')"
              class="errorMessage"
            >{{ errors.first('eventInfo.Theatre') }}</div>
          </div>

          <div class="col-md-6">
            <div class="mt-4">
              <span class="text-white text-black">{{allLanguageData.DoyouneedMultipleLocations}}</span>
              <input
                class
                v-model="bookEventInfo.MultipleLocation"
                type="radio"
                name="locations"
                :value="allLanguageData.Yes"
                v-bind:class="langName == 'ar' ? 'mr-2':'ml-2'"
              />
              <span class="text-white text-black">Yes</span>
              <input
                class
                v-model="bookEventInfo.MultipleLocation"
                type="radio"
                name="locations"
                :value="allLanguageData.No"
                v-bind:class="langName == 'ar' ? 'mr-2':'ml-2'"
              />
              <span class="text-white text-black">No</span>
            </div>
          </div>
        </div>

        <!-- removed section as mentioned in pdf -->
        <!-- <div class="row">
          <div class="col-md-4">
            <b-form-input
              v-model="bookEventInfo.GroupSize"
              v-validate="'required'"
              name="GroupSize"
              type="text"
              :placeholder="allLanguageData.GroupSize"
              class="my-2"
            />
            <div
              v-show="errors.has('eventInfo.GroupSize')"
              class="errorMessage"
            >{{ errors.first('eventInfo.GroupSize') }}</div>
          </div>

          <div class="col-md-4">
            <b-form-input
              v-model="bookEventInfo.TypeOfFilm"
              v-validate="'required'"
              name="TypeOfFilm"
              type="text"
              :placeholder="allLanguageData.TypeofFilm"
              class="my-2"
            />
            <div
              v-show="errors.has('eventInfo.TypeOfFilm')"
              class="errorMessage"
            >{{ errors.first('eventInfo.TypeOfFilm') }}</div>
          </div>

          <div class="col-md-4">
            <b-form-input
              v-model="bookEventInfo.Date"
              v-validate="'required'"
              name="Date"
              type="text"
              :placeholder="allLanguageData.Date"
              class="my-2"
            />
            <div
              v-show="errors.has('eventInfo.Date')"
              class="errorMessage"
            >{{ errors.first('eventInfo.Date') }}</div>
          </div>
        </div>

        <div class="row">
          <div class="col-md-3">
            <b-form-input
              v-model="bookEventInfo.AccessStart"
              v-validate="'required'"
              name="AccessStart"
              type="text"
              :placeholder="allLanguageData.AccessStart"
              class="my-2"
            />
            <div
              v-show="errors.has('eventInfo.AccessStart')"
              class="errorMessage"
            >{{ errors.first('eventInfo.AccessStart') }}</div>
          </div>

          <div class="col-md-3">
            <b-form-input
              v-model="bookEventInfo.PresentationStart"
              v-validate="'required'"
              name="PresentationStart"
              type="text"
              :placeholder="allLanguageData.PresentationStart"
              class="my-2"
            />
            <div
              v-show="errors.has('eventInfo.PresentationStart')"
              class="errorMessage"
            >{{ errors.first('eventInfo.PresentationStart') }}</div>
          </div>

          <div class="col-md-3">
            <b-form-input
              v-model="bookEventInfo.FilmStart"
              v-validate="'required'"
              name="FilmStart"
              type="text"
              :placeholder="allLanguageData.FilmStart"
              class="my-2"
            />
            <div
              v-show="errors.has('eventInfo.FilmStart')"
              class="errorMessage"
            >{{ errors.first('eventInfo.FilmStart') }}</div>
          </div>

          <div class="col-md-3">
            <b-form-input
              v-model="bookEventInfo.Terms"
              v-validate="'required'"
              name="Terms"
              type="text"
              :placeholder="allLanguageData.TermsneededafterFilm"
              class="my-2"
            />
            <div
              v-show="errors.has('eventInfo.Terms')"
              class="errorMessage"
            >{{ errors.first('eventInfo.Terms') }}</div>
          </div>
        </div>

        <div class="section-space"></div>

        <div class="text-center">
          <p class="font-weight-bold text-white text-black">{{allLanguageData.EXTRAS}}</p>
        </div>

        <div class="mb-5">
          <b-form-input
            v-model="bookEventExtraInfo.Equipment"
            v-validate="'required'"
            name="Equipment"
            type="text"
            :placeholder="allLanguageData.AvandEquipment"
            class="my-2"
          />
          <div
            v-show="errors.has('eventInfo.Equipment')"
            class="errorMessage"
          >{{ errors.first('eventInfo.Equipment') }}</div>
        </div>

        <div class="mb-5">
          <b-form-input
            v-model="bookEventExtraInfo.Concession"
            v-validate="'required'"
            name="Concession"
            type="text"
            :placeholder="allLanguageData.Concessions"
            class="my-2"
          />
          <div
            v-show="errors.has('eventInfo.Concession')"
            class="errorMessage"
          >{{ errors.first('eventInfo.Concession') }}</div>
        </div>

        <div class="mb-5">
          <b-form-input
            v-model="bookEventExtraInfo.Note"
            v-validate="'required'"
            name="Note"
            type="text"
            :placeholder="allLanguageData.Notes"
            class="my-2"
          />
          <div
            v-show="errors.has('eventInfo.Note')"
            class="errorMessage"
          >{{ errors.first('eventInfo.Note') }}</div>
        </div>-->

        <div class="mx-auto text-center mt-4">
          <button class="btn-checkout">{{allLanguageData.SUBMIT}}</button>
        </div>

        <div class="section-space"></div>
        <div class="section-space"></div>
      </div>
    </form>

    <!-- SCHOOL BOOKINGS MODAL -->
    <b-modal
      id="modal1"
      :title="allLanguageData.SCHOOLBOOKINGS"
      hide-footer
      class="bookevent text-danger"
    >
      <p class="text-center text-white p-4 mb-0">{{allLanguageData.SCHOOLBOOKINGSContent}}</p>
    </b-modal>

    <!-- CORPORATE BOOKINGS MODAL-->
    <b-modal
      id="thankyou"
      title="Thank You"
      class="bookevent text-danger"
      hide-footer
      ref="thankyou"
    >
      <p class="text-center text-white p-4 mb-0">
        Thank You.
        <br />Your Request Has been sent.
      </p>
    </b-modal>

    <b-modal
      id="corporateBooking"
      :title="allLanguageData.PRIVATEEVENTS"
      class="bookevent text-danger"
      hide-footer
    >
      <p class="text-center text-white p-4 mb-0">{{allLanguageData.PRIVATEEVENTSContent}}</p>
    </b-modal>

    <!-- SEMINARS AND TRAINING MODAL-->
    <b-modal
      id="modal3"
      :title="allLanguageData.SEMINARSANDTRAINING"
      class="bookevent text-danger"
      hide-footer
    >
      <p class="text-center text-white p-4 mb-0">{{allLanguageData.SEMINARSANDTRAININGContent}}</p>
    </b-modal>

    <!-- EVENTS AND PREMIERES MODAL -->
    <b-modal
      id="modal4"
      :title="allLanguageData.EVENTSANDPREMIERES"
      class="bookevent text-danger"
      hide-footer
    >
      <p class="text-center text-white p-4 mb-0">{{allLanguageData.EVENTSANDPREMIERESContents}}</p>
    </b-modal>

    <!-- BIRTHDAY MODAL -->
    <b-modal
      id="modal5"
      :title="allLanguageData.BIRTHDAYS"
      class="bookevent text-danger"
      hide-footer
    >
      <p class="text-center text-white p-4 mb-0">{{allLanguageData.BIRTHDAYSContent}}</p>
    </b-modal>
  </div>
</template>


<script>
import { makeRequest } from '@/helper/internet.js'

export default {
  name: 'bookanevent',
  metaInfo: {
    title: 'Bookanevent',
  },
  data () {
    return {
      text1: '',
      bookEventContact: {
        Organization: '',
        Mobile: '',
        FirstName: '',
        LastName: '',
        Email: '',
        Address: '',
      },
      bookEventInfo: {
        EventType: '',
        PurposeOfEvent: '',
        Theatre: '',
        MultipleLocation: 'Yes',
        GroupSize: 0,
        TypeOfFilm: '',
        Date: '',
        AccessStart: '',
        PresentationStart: '',
        FilmStart: '',
        Terms: '',
      },
      preimere: false,
      bookEventExtraInfo: {
        Equipment: '',
        Concession: '',
        Note: '',
      },
    }
  },
  components: {},

  beforeCreate: function () {
    let pre = window.localStorage.getItem('PREIMERE')
    if (pre == null || pre == 'false' || pre == false) {
      document.body.className = 'img-section'
    } else {
      document.body.className = 'gold-img-section'
    }
  },
  mounted: function () {
    this.preimere = window.localStorage.getItem('PREIMERE')
  },
  beforeMount () {},
  methods: {
    sendBookEvent: function (event) {
      let payload = {
        bookEventContact: this.bookEventContact,
        bookEventInfo: this.bookEventInfo,
        bookEventExtraInfo: this.bookEventExtraInfo,
      }
      makeRequest('/BookEvent', 'POST', null, payload)
        .then(result => {
          const { error, res } = result
          const { data } = res.data
          if (!error && res.data.Status) {
            this.$refs.thankyou.show()
            // Thank you pop up!
            this.bookEventContact = {}
            this.bookEventInfo = {}
            this.bookEventExtraInfo = {}
            event.reset()
          }
        })
        .catch(error => {
          console.log('Error on vue front', error)
        })
    },
    onSubmitEventInfo: function (event) {
      console.log(
        '>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>',
        this.bookEventContact,
        this.bookEventInfo,
        this.bookEventExtraInfo
      )
      // bookEventExtraInfo
      this.$validator
        .validateAll('eventInfo')
        .then(result => {
          console.log('check Validation result', result)
          if (result) {
            this.sendBookEvent(event)
          }
        })
        .catch(error => {
          console.log('Catch Error on Validation', error)
        })
    },
  },
}
</script>


<style scoped>
.footer {
  background-image: none !important;
}
</style>
