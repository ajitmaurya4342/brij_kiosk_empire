<template>
  <section class="terms-section bg-white pt-5 header-space">
    <div class="container header-space">
      <!-- vh-100 -->
      <div class="get-app d-flex align-items-end justify-content-center" style="height: auto;">
        <div class="row">
          <div class="col-md-7 align-self-center mb-5 mb-md-0">
            <h1 v-if="langName == 'eng'" class="text-dark mb-4 text-center text-md-left">
              Stay connected to our theaters
              <br />Download our APP
            </h1>

            <h1 v-else class="text-dark mb-4 text-center text-md-left">
              تابع كل جديد في صالاتنا
              <br />قم بتنزيل التطبیق
            </h1>

            <div class="row">
              <div class="col-6 col-md-4">
                <a href="https://apps.apple.com/in/app/empire-cinemas/id1459864736">
                  <img src="@/assets/img/Apple+Store.png" class="img-fluid" alt />
                </a>
              </div>
              <div class="col-6 col-md-4">
                <a
                  href="https://play.google.com/store/apps/details?id=com.binary.empirecinema&hl=en"
                >
                  <img src="@/assets/img/Google+Play.png" class="img-fluid" alt />
                </a>
              </div>
              <div class="col-6 col-md-5 mt-4">
                <button class="btn btn-primary btn-view" v-if="langName != 'ar'" data-fancybox
              href="https://mapview.empirecinemas.com/empirecinema-app-video/english/en-video.mp4"
              data-caption="video" >{{allLanguageData.ViewNow}}</button>
               <button class="btn btn-primary btn-view" v-if="langName == 'ar'" data-fancybox
              href="https://mapview.empirecinemas.com/empirecinema-app-video/arabic/ar-video.mp4"
              data-caption="video" >{{allLanguageData.ViewNow}}</button>
              </div>
            </div>
          </div>

          <div class="col-md-5">
            <img
              src="@/assets/img/hero-fit-gold.png"
              class="img-fluid"
              alt
              v-if="preimereToken == true || preimereToken == 'true'"
            />
            <img v-else src="@/assets/img/hero-fit-red.png" class="img-fluid" alt />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
export default {
  data () {
    return {
      preimere: 'false',
    }
  },
  beforeCreate: function () {
    let pre = window.localStorage.getItem('PREIMERE')
    if (pre == null || pre == 'false' || pre == false) {
      document.body.className = 'img-section'
    } else {
      document.body.className = 'gold-img-section'
    }
  },
}
</script>


<style scoped>
.btn-view {
  width: 160px;
  font-size: 13px;
  font-weight: bold;
  border-radius: 0px !important;
}


@media (min-width: 992px) {
  .get-app {
    height: calc(100vh - 300px);
  }
}
</style>
