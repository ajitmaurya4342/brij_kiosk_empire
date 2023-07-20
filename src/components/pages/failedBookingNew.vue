<template>
  <section class="white-grey-section min-height-90 d-flex align-items-center">
    <div class="container header-space">
      <div class="row justify-content-center position-relative">
        <div class="failed-payment col-lg-6">
          <div class="border my-3">
            <h1 class="font-weight-bold py-5 mb-0 my-5 text">
              BOOKING FAILED

              <div>{{ message }}</div>
            </h1>
          </div>
        </div>
        <div class="semi-circle">
          <!-- <img
            src="@/assets/img/new-img/svg-img/booking-failed.svg"
            class="image img-fluid"
          /> -->
        </div>
      </div>
      <!-- <small>{{ $route.query.message }}</small> -->
    </div>
  </section>
</template>

<script>
export default {
  beforeMount() {
    if (this.$route.query.message) {
      this.message = this.$route.query.message;
    }
  },
  data() {
    return {
      message: ""
    };
  },
  beforeCreate: function() {
    let pre = window.localStorage.getItem("PREIMERE");
    if (pre == null || pre == "false" || pre == false) {
      document.body.className = "img-section";
    } else {
      document.body.className = "gold-img-section";
    }
  }
};
</script>

<style scoped>
.failed-payment {
  background-color: #ce1f2e;
  color: #fff;
  text-align: center;
  position: relative;
}
.failed-payment .text {
  position: relative;
  z-index: 10;
}
.semi-circle {
  height: 250px;
  width: 250px;
  border-radius: 50%;
  /* border-top-right-radius: 100px;
    border-top-left-radius: 100px; */
  background-color: #ce1f2e;
  position: absolute;
  top: -100px;
}
</style>
