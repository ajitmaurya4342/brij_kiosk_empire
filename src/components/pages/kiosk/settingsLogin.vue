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
            <div>{{ "Login Set selected Cinema" }}</div>
          </div>
          <div></div>
        </div>

        <div>
          <div class="input-wrapper">
            <input
              @click="
                showKeyboard = true;
                type = 'user_name';
                input = '';
              "
              v-model="user_name"
              type="text"
              :placeholder="$tc('User Name')"
              class="input-kiosk"
            />
          </div>

          <div class="input-wrapper d-flex">
            <input
              @click="
                showKeyboard = true;
                type = 'password';
                input = '';
              "
              v-model="password"
              :type="passwordInputType"
              :placeholder="$tc('Password')"
              class="input-kiosk"
            />

            <input
              v-on:click="togglePasswordVisibility()"
              type="submit"
              class="btn-success btn-lg ml-4"
              :value="passwordInputType === 'password' ? 'Show' : 'Hide'"
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
import { makeRequestBrij } from "@/helper/internet.js";

export default {
  name: "Enter Booking Id",
  components: {
    SimpleKeyboard
  },
  data() {
    return {
      showKeyboard: false,
      bookingId: 123,
      user_name: null,
      password: null,
      passwordInputType: "password",
      input: "",
      ErrorMessage: "",
      type: "receipt_no"
    };
  },
  mounted() {},
  methods: {
    togglePasswordVisibility() {
      if (this.passwordInputType == "password") this.passwordInputType = "text";
      else this.passwordInputType = "password";
    },
    onChange(input) {
      if (this.type == "user_name") {
        this.user_name = input;
      } else if (this.type == "password") {
        this.password = input;
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
      if (this.type == "user_name") {
        this.user_name = input;
      } else if (this.type == "password") {
        this.password = input;
      }
    },
    onClickProceedButton: function() {
      this.ErrorMessage = "";
      if (
        (this.user_name == null || this.user_name.length == 0) &&
        (this.password == null || this.password.length == 0)
      ) {
        this.ErrorMessage = "Please Enter Login Details";
        this.$refs.modal.show();
      } else if (this.user_name == null || this.user_name.length == 0) {
        this.ErrorMessage = "Please User Name";
        this.$refs.modal.show();
      } else if (this.password == null || this.password.length == 0) {
        this.ErrorMessage = "Please Enter Password";
        this.$refs.modal.show();
      } else if (this.user_name !== null && this.password.length > 0) {
        // this.$router.push({
        //   path: '/final-ticket/' + this.bookingId,
        //   query: {pickup_code: this.pickup_code, receipt_no: this.receipt_no}
        // })
        // api call

        makeRequestBrij(`/api/external/checkCinemaManagerAuth`, "POST", null, {
          username: this.user_name,
          password: this.password
        })
          .then(response => {
            const { error, res } = response;
            if (res.data.status) {
              this.$router.push({
                path: "/settings"
              });
            } else {
              this.ErrorMessage = res.data.message;
              this.$refs.modal.show();
            }

            if (error) {
              this.ErrorMessage = "Something went wrong!";
              this.$refs.modal.show();
            }
          })
          .catch(() => {
            this.ErrorMessage = "Something went wrong!";
            this.$refs.modal.show();
          });
      } else {
        this.ErrorMessage = "Something went wrong!";
        this.$refs.modal.show();
      }
    }
  }
};
</script>

<style></style>
