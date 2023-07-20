<template>
  <div
    class="text-center py-5 min-vh-100 d-flex align-items-center justify-content-center flex-column"
  >
    <!-- <h2 class="">Welcome to Empire Cinemas!</h2> -->
    <p class="text-success font-weight-bold mt-3 mb-5">Redirecting....</p>

    <router-link to="/" class="btn-save text-white">HOME</router-link>
  </div>
</template>

<script>
import { makeRequest } from "@/helper/internet.js";
import { makeRequestBrij } from "@/helper/internet.js";
import Vue from "vue";

export default {
  data() {
    return {
      movieDetailsPage: {},
      QrCodeData: "",
      url_data: ""
    };
  },
  beforeMount() {
    let pre = window.localStorage.getItem("PREIMERE");
    if (pre == null || pre == "false" || pre == false) {
      document.body.className = "";
    } else {
      document.body.className = "gold-img-section";
    }

    this.url_data = this.$route.params.qrName;
    // this.QrCodeData = this.$route.fullPath;
    this.autoRedirect(this.url_data);
  },
  methods: {
    autoRedirect: function(QrCodeData) {
      this.showLoading();
      let langData = window.localStorage.getItem("language")
        ? window.localStorage.getItem("language")
        : 2;
      let langId = JSON.parse(langData);
      let QrCodeData_New = QrCodeData.split("-");

      makeRequestBrij(
        `/api/qr/get-qrcodes?QRcodeID=${QrCodeData_New[1]}`,
        "GET",
        null
      )
        .then(response => {
          const { error, res } = response;
          if (!error) {
            const { data } = res;

            if (data && data.Records.length > 0) {
              this.movieDetailsPage = data.Records[0];

              if (this.movieDetailsPage.movieid) {
                this.$nextTick(() => {
                  this.$router.replace({
                    name: "cinemashowtimes",
                    params: {
                      cat_id: "1",
                      movieId: this.movieDetailsPage.movieid,
                      movieName: (this.movieDetailsPage.movie_title || "")
                        .toLowerCase()
                        .replace(" ", "-")
                    }
                  });
                });
              } else {
                this.$nextTick(() => {
                  this.$router.replace({
                    path: "/"
                  });
                });
              }
            } else {
              this.$nextTick(() => {
                this.$router.replace({
                  path: "/"
                });
              });
            }
          } else {
            this.$nextTick(() => {
              this.$router.replace({
                path: "/"
              });
            });
          }
          this.hideLoading();
        })
        .catch(error => {
          this.$nextTick(() => {
            this.$router.push({
              path: "/"
            });
          });
          this.hideLoading();
        });
    }
  }
};
</script>

<style scoped></style>
