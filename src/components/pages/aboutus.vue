<template>
  <div class="about-us">
    <!--Start Banner Slider--->
    <section class="section-banner simple-banner">
      <slick ref="banner-slider" :options="bannerSlider">
        <div
          v-for="(data, index) in 1"
          :key="index"
          class="w-100 banner-slider"
        >
          <div class="banner-img">
            <div>
              <img src="@/assets/img/new-img/png-img/offer.png" class="image" />
            </div>
          </div>
        </div>
      </slick>
    </section>
    <!--End Banner Slider--->
    <div class="container custom-container mb-5">
      <div class="my-5">
        <div class="main-heading pb-2">
          <div>
            <hr class="primary-line" />
          </div>
          <div class="title">{{ allLanguageData.datetoend }}</div>
        </div>
        <div class="content">
          <div class="content-desc">
            {{ allLanguageData.AboutUsContent[0] }} <br /><br />
            {{ allLanguageData.AboutUsContent[1] }}<br /><br />
            {{ allLanguageData.AboutUsContent[2] }}
          </div>
        </div>
      </div>
      <div class="my-5">
        <!-- <div class="main-heading pb-2">
          <div>
            <hr class="primary-line" />
          </div>
          <div class="title">BUILDS 1ST CINEMA IN LEBANON - 1919</div>
        </div> -->
        <div class="content">
          <div class="content-desc">
            {{ allLanguageData.AboutUsContent[3] }}
            {{ allLanguageData.AboutUsContent[4] }}
          </div>
        </div>
      </div>
    </div>
    <div>
      <img src="@/assets/img/new-img/svg-img/about-1.svg" class="image" />
    </div>
    <div class="container mt-5">
      <div class="row">
        <div class="col-md-8 p-0 about-video order-2 order-md-1">
          <iframe
            :src="
              langName == 'ar'
                ? 'https://www.youtube.com/embed/eDi763pToj4'
                : 'https://www.youtube.com/embed/zl7oFYZifG4'
            "
            frameborder="0"
            allowfullscreen
            width="100%"
            height="100%"
          ></iframe>
        </div>
        <div class="col-md-4 p-0 order-1 order-md-2">
          <img
            src="@/assets/img/new-img/svg-img/about-2.svg"
            class="image"
            height="100%"
          />
        </div>
      </div>
      <!-- <div class="my-4 my-lg-5 d-block d-md-none">

        <div class="content-desc">
          <p class="mb-0" v-if="langName != 'ar'">
            Congratulations! You just found it and now you have a chance to win
            2 VIP tickets to see “Uncharted” movie at Empire Cinemas.
            <br />Please email us a screenshot of this page along with your full
            name and mobile number to <a href="">care@empirecinemas.com.sa</a>
            <br /><br />
            Goodluck!
          </p>
          <p class="mb-0" v-if="langName == 'ar'">
            مبررروك !! لقيتها, الحين عندك فرصة لربح تذكرتين بريمير لمشاهدة فيلم
            انشارتد في #امباير_سينما كل اللي عليك بس تصور الشاشة وترسلها لنا عبر
            الايميل ولا تنسى تكتب اسمك كامل و رقم جوالك
            care@empirecinemas.com.sa ورونا مواهبكم

            <br/><br/>
            ورّونا مواهبكم

          </p>
        </div>
        <div>
           <img
            src="@/assets/img/about-us-en.jpg"
            class="image"
            height="100%"
            v-if="langName != 'ar'"
          />
          <img
            src="@/assets/img/about-us-ar.jpg"
            class="image"
            height="100%"
            v-if="langName == 'ar'"
          />
        </div>
      </div> -->
      <div class="my-4 my-lg-5">
        <div class="main-heading pb-2">
          <div>
            <hr class="primary-line" />
          </div>
          <div class="title">OUR HISTORY</div>
        </div>
        <div class="content">
          <div class="content-desc">
            {{ allLanguageData.AboutUsContent[5] }}
          </div>
        </div>
        <div class="mt-5">
          <img
            src="@/assets/img/new-img/svg-img/desk-about.svg"
            class="image d-none d-md-block"
          />
          <img
            src="@/assets/img/new-img/svg-img/mobile-about.svg"
            class="image d-block d-md-none"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  beforeCreate: function () {
    document.body.className = 'light-section'
  },
  components: {},
  data () {
    return {
      bannerSlider: {
        arrows: false,
        dots: true,
        infinite: true,
        slidesToScroll: 1,
        slidesToShow: 1,
        autoplay: true,
        autoplaySpeed: 2000,
      },
    }
  },
}
</script>
<style>
.about-us .content-desc {
  font-weight: bold;
  padding-left: 60px;
}
@media (max-width: 767px) {
  .about-us .content-desc {
    font-weight: bold;
    padding-left: 10px;
  }
}
</style>
