 <template>
  <div>
    <section class="container d-md-none" style="min-height: 82vh">
      <div class="mx-auto">
        <h6 class="text-center my-4">
          Scan QR code to
          <br />access services
        </h6>
        <div class="qr-scan-box my-5">
          <qrcode-stream @decode="onDecode"></qrcode-stream>
        </div>

        <div class="or-txt my-4 text-center">OR</div>

        <!-- css: flex: 0.30 1 -->
        <div class="text-center my-4">
          <input
            v-model="qrcode"
            @click="onClicked"
            @blur="onBlur"
            type="text"
            class="emp-input qr-code-input"
            placeholder="Enter code"
          />
        </div>
      </div>
      <div
        class="btn-proceed rounded shadow-sm d-flex align-items-center justify-content-center w-100 py-4 mb-4"
        @click="onProccedToLogin(qrcode)"
      >
        Proceed
      </div>

      <!-- MODAL -->
      <b-modal
        id="qrModal"
        v-model="qrModal"
        centered
        title="QR code"
        :hide-header="true"
        :hide-footer="true"
      >
        <div class="tl-modal">
          <div class="text-center bg-white">
            <p class="mb-0 modal-title">Title</p>
            <p class="mb-0 modal-text my-3">message</p>
          </div>
          <button class="tl-modal-close" @click="closeModal">
            <!-- <img src="@/assets/img/icons/close-icon-black.svg" alt /> -->
          </button>
        </div>
      </b-modal>
    </section>
    <!-- FOR DESKTOP -->
    <section class="container d-none d-md-block vh-100">
      <h2 class="text-center text-danger py-5">Go to Mobilesite</h2>
    </section>
    <!--
    <b-modal
      no-close-on-esc
      no-close-on-backdrop
      id="selectLang"
      ref="selectLang"
      title="Select Language"
      class="ErModal light-red-color"
    >
      <div class="col-12 py-3">
        <h5 class="mb-4 text-white">Select Language</h5>
        <div class="row">
          <div class="col-6">
            <b-button
              @click="onClickRedirect('2')"
              variant="default"
              class="btn btn-green w-100"
              >English</b-button
            >
          </div>
          <div class="col-6">
            <b-button
              @click="onClickRedirect('1')"
              variant="default"
              class="btn btn-green w-100"
              >Arabic</b-button
            >
          </div>
        </div>
      </div>
    </b-modal> -->
  </div>
</template>

<script>
import { makeRequest } from '@/helper/internet.js'
import Vue from 'vue'

export default {
  data () {
    return {
      isClicked: false,
      qrModal: false,
      qrcode: '',
      displayPopup: '',
      defaultLang: '',
    }
  },
  beforeMount () {
    let pre = window.localStorage.getItem('PREIMERE')
    if (pre == null || pre == 'false' || pre == false) {
      document.body.className = ''
    } else {
      document.body.className = 'gold-img-section'
    }
  },
  // mounted: function () {
  //   this.$root.$emit("bv::hide::modal", "advtModal");
  // },
  methods: {
    onClicked: function () {
      this.isClicked = true
    },
    onBlur: function () {
      this.isClicked = false
    },
    showModal: function () {
      this.wifiDiconnected = true
    },
    closeModal: function () {
      this.wifiDiconnected = false
    },
    onDecode (decodedString) {
      this.onProccedToLogin(decodedString)
    },
    onProccedToLogin: function (qr_data) {
      if (qr_data) {
        // this.$loading.show();
        this.showLoading()

        // let arr = qr_data.split("?");
        // if (arr.length == 2) {
        //   let data1 = arr[1];
        //   let arr1 = data1.split("=");
        //   if (arr1.length == 2) {
        //     qr_data = arr1[1];
        //   }
        // }
        // let payload = {
        //   QRCode: qr_data,
        // };
        let fulldata = qr_data.split('lets-eat/')
        var code = qr_data
        if (fulldata.length == 2) {
          code = fulldata[1]
        }

        let payload = {
          QRCode: code,
        }

        makeRequest('/GetScreenDetails', 'POST', null, payload)
          .then((response) => {
            const { error, res } = response
            if (!error) {
              console.log('res', res)
              const { data } = res
              if (data && data.Status) {
                this.displayPopup = data.DisplayFnBPopup
                this.defaultLang = data.DefaultLanguage
                let alldata =
                  data.ScreenData[0].ScreenId +
                  '|' +
                  data.ScreenData[0].Rowno +
                  '|' +
                  data.ScreenData[0].columnno +
                  '|' +
                  data.ScreenData[0].classID +
                  '|' +
                  data.ScreenData[0].seatName +
                  '|' +
                  data.ScreenData[0].Type +
                  '|' +
                  data.ScreenData[0].CinemaID
                window.localStorage.setItem(
                  'isQrCodeKey',
                  data.ScreenData[0].Bookingpagetype
                )
                this.hideLoading()

                // this.$refs.selectLang.show();

                this.$router.push({
                  name: 'foodBeverage',
                  params: { code: qr_data, cinemaId: alldata },
                })
              } else {
                console.log('data.message :>> ', data)
              }
            } else {
              console.log('Response Error ')
              this.hideLoading()
            }
          })
          .catch((error) => {
            this.$refs.selectLang.show()

            console.log('Error', error)
            this.hideLoading()
          })

        // UserService.SendQRInfo({ qr_data })
        //   .then((response) => {
        //     const { data } = response;
        //     if (data && data.status) {
        //       this.$router.push({
        //         name: "Landing Component",
        //         params: { code: qr_data },
        //       });
        //     } else {
        //       console.log("data.message :>> ", data.message);
        //     }
        //   })
        //   .catch((error) => {
        //     // Catch Error:
        //     console.log("Error Catch on on Procced Login :>> ", error);
        //   });
      } else {
        alert('Please insert code')
      }
    },

    onClickRedirect: function (value) {
      let payload = {
        LanguageID: value || this.defaultLang,
      }
      makeRequest('/VipFnBPdf', 'POST', null, payload)
        .then((response) => {
          const { error, res } = response
          if (!error) {
            const { data } = res
            if (data && data.Status) {
              // window.location.href = data.Path;
              window.open(data.Path, '_blank')
            } else {
              console.log('data.message :>> ', data)
            }
          } else {
            this.hideLoading()
          }
        })
        .catch((error) => {
          this.hideLoading()
        })
    },
  },
}
</script>

<style scoped>
.qr-scan-box {
  height: 265px;
  width: 265px;
  text-align: center;
  display: block;
  margin: 0 auto;
  background: #f9f9f9;
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
}

.qr-code-input:focus {
  border-color: none !important;
  box-shadow: none !important;
  border: 1px solid #ced4da !important;
}

.emp-input {
  display: block;
  width: 95%;
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  line-height: 1.5;
  margin: 0 auto;
  color: #000;
  background-clip: padding-box;
  border: 1px solid #ced4da;
  border-radius: 0.25rem;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}

.emp-input:focus {
  color: #495057;
  background-color: #fff;
  border-color: #80bdff;
  outline: 0;
  box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
}

.emp-input::placeholder {
  color: darkgray;
}
</style>
