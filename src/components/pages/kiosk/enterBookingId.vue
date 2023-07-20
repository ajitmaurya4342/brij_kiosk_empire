<template>
  <div>
    <div class="kiosk-welcome">
      <!-- ERROR MODAL -->
      <b-modal
        ref="modal"
        id="modal-1"
        no-close-on-esc
        no-close-on-backdrop
        hide-header-close
        hide-footer
        hide-header
      >
        <p class="my-4 black text-center">{{ ErrorMessage }}</p>
        <div class="text-center">
          <b-button
            @click="$refs.modal.hide()"
            class="text-center mx-auto mt-3 btn-danger"
            >CLOSE</b-button
          >
        </div>
      </b-modal>
      <!-- ERROR MODAL ENDS-->
      <div>
        <div class="h3 mb-5">
          <div class="mb-2">
            <div>{{ $tc("LetsGetYouYourTickets") }}</div>
          </div>
          <div>{{ $tc("PleaseEnterYourBookingId") }}</div>
        </div>

        <div>
          <div class="input-wrapper">
            <input
              @click="
                showKeyboard = true;
                type = 'receipt_no';
                input = '';
              "
              v-model="receipt_no"
              type="text"
              :placeholder="$tc('Booking ID')"
              class="input-kiosk"
            />
          </div>

          <div class="input-wrapper" v-if="false">
            <input
              @click="
                showKeyboard = true;
                type = 'pickup_code';
                input = '';
              "
              v-model="pickup_code"
              type="text"
              :placeholder="$tc('PickupCode')"
              class="input-kiosk"
            />
          </div>
          <input
            v-on:click="onClickProceedButton()"
            type="submit"
            class="btn-success btn-lg"
            :value="$tc('Proceed')"
          />
          <input
            v-on:click="onClickHome()"
            type="submit"
            class="btn-success btn-lg ml-4"
            :value="$tc('Home')"
          />
        </div>
      </div>
    </div>
    <SimpleKeyboard
      v-if="showKeyboard"
      @onChange="onChange"
      @onKeyPress="onKeyPress"
      :input="input"
      :type="type"
    />
  </div>
</template>

<script>
import SimpleKeyboard from "./SimpleKeyboard";

export default {
  name: "Enter Booking Id",
  components: {
    SimpleKeyboard
  },
  data() {
    return {
      showKeyboard: false,
      bookingId: "",
      pickup_code: null,
      receipt_no: null,
      input: "",
      ErrorMessage: "",
      type: "receipt_no"
    };
  },
  mounted() {},
  methods: {
    onChange(input) {
      if (this.type == "receipt_no") {
        this.receipt_no = input;
      } else if (this.type == "pickup_code") {
        this.pickup_code = input;
      }
    },
    onClickHome: function() {
      this.$router.push({
        path: "/"
      });
    },
    onKeyPress(button) {
      console.log("button", button);
    },
    onInputChange(input) {
      if (this.type == "receipt_no") {
        this.receipt_no = input;
      } else if (this.type == "pickup_code") {
        this.pickup_code = input;
      }
    },
    onClickProceedButton: function() {
      this.ErrorMessage = "";
      if (
        this.receipt_no == null /* || this.receipt_no.length == 0 */
        // && (this.pickup_code == null || this.pickup_code.length == 0)
      ) {
        this.ErrorMessage = "Please Enter Ticket Details";
        this.$refs.modal.show();
      } else if (this.receipt_no == null || this.receipt_no.length == 0) {
        this.ErrorMessage = "Please Enter Receipt Number";
        this.$refs.modal.show();
      }
      // else if (this.pickup_code == null || this.pickup_code.length == 0) {
      //   this.ErrorMessage = 'Please Enter Pickup Code'
      //   this.$refs.modal.show()
      // }
      else if (this.receipt_no !== null && this.receipt_no.length > 0) {
        this.$router.push({
          path: "/final-ticket/" + this.receipt_no + "/2",
          query: { pickup_code: this.pickup_code, receipt_no: this.receipt_no }
        });
      } else {
      }
    }
  }
};
</script>

<style></style>
