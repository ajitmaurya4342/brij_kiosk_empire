<template>
  <div>
    <!--Start Banner Slider--->
    <section class="section-banner simple-banner">
      <slick ref="banner-slider" :options="bannerSlider">
        <div
          v-for="(data, index) in 10"
          :key="index"
          class="w-100 banner-slider"
        >
          <div class="banner-img">
            <div>
              <img
                src="@/assets/img/new-img/png-img/menu-offer.png"
                class="image"
              />
            </div>
          </div>
        </div>
      </slick>
    </section>
    <!--End Banner Slider--->
    <div class="container px-0">
       <!-- <QuickBook /> -->
    </div>
    <div class="container custom-container pb-4 mb-4 order-online-page">
      <div class="col-md-12 px-0">
        <div class="pt-4">
          <div class="main-heading">
            <div>
              <hr class="primary-line" />
            </div>
            <div class="title">EMPIRE PREMIERE</div>
          </div>
          <div class="content">
            <div class="content-title my-3">ENJOY EMPIRE PREMIERE</div>
            <div class="content-desc">
              Lorem Ipsum has been the industry's standard dummy text ever since
              the 1500s, when an unknown printer took a galley of type and
              scrambled it to make a type specimen book. It has survived not
              only five centuries, but also the leap into electronic
              typesetting, remaining essentially unchanged. It was popularised
              in the 1960s with the release of Letraset sheets containing Lorem
              Ipsum passages, and more recently with desktop publishing software
              like Aldus PageMaker including versions of Lorem Ipsum.
            </div>
          </div>
        </div>
        <div class="pt-4">
          <div class="main-heading pb-2">
            <div>
              <hr class="primary-line" />
            </div>
            <div class="title">Select Cinema</div>
          </div>
          <div class="content">
            <div>
              <p class="mb-0 font-weight-bold">
                Select your cinema location and order your favourite food and
                drinks.
              </p>
            </div>
            <div class="row my-3">
              <div class="col-md-2 pr-0">
                <b-dropdown
                  variant="default"
                  class="custom-dropdown quickbook-dropdown"
                  text="Select Location"
                >
                  <b-dropdown-item v-for="(data, Index) in 10" :key="Index"
                    >Cinema One</b-dropdown-item
                  >
                </b-dropdown>
              </div>
              <div class="col-md-2 pr-0">
                <button class="btn btn-primary w-100">LOG IN</button>
              </div>
              <div class="col-md-2 pr-0">
                <button class="btn btn-primary w-100">sign up</button>
              </div>
              <div class="col-md-2">
                <button class="btn btn-primary w-100">continue as guest</button>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div class="pt-4">
            <div class="main-heading">
              <div>
                <hr class="primary-line" />
              </div>
              <div class="title">Online order</div>
            </div>
            <div class="content">
              <div class="content-title my-3">Al RASHED MALL - KHOBAR</div>
              <div>
                <p class="mb-0 font-weight-bold">
                  Login or Sign-Up now for a quicker order with all your contact
                  and payment details saved.
                </p>
              </div>
            </div>
          </div>
          <div class="fnb-section mt-5">
            <div class="screen-header fnb-header mx-0 py-4 px-5 mt-n1">
              <div class="screen-tabs mx-auto">
                <ul class="list-inline my-0 py-0">
                  <li class="list-inline-item">
                    <router-link class="screen-link" :to="{ name: 'Minis' }"
                      >popcorn</router-link
                    >
                  </li>
                  <li class="list-inline-item">
                    <router-link class="screen-link" :to="{ name: 'Minis' }"
                      >hot food</router-link
                    >
                  </li>
                  <li class="list-inline-item">
                    <router-link
                      class="screen-link"
                      :to="{ name: 'screenXExp' }"
                      >combos</router-link
                    >
                  </li>
                  <li class="list-inline-item">
                    <router-link class="screen-link" :to="{ name: '4DX' }"
                      >ice & cream</router-link
                    >
                  </li>
                </ul>
              </div>
            </div>
            <div class="fnb-content">
             <div v-for="(data, index) in 2" :key="index" class="my-4 pt-2">
              <div class="fnb-title py-3 pl-5">Popcorn</div>
              <div class="fnb-items empire-slider fnb-slider mt-4">
                <!--Start Offer Slider-->
                <slick ref="fnbSlider" :options="fnbSlider">
                  <div v-for="(data, index) in 6" :key="index" class="fnb-card py-3">
                    <div class="fnb-img d-flex justify-content-center">
                      <img
                        src="@/assets/img/new-img/png-img/popcorn.png"
                        class="image img-fluid"
                      />
                    </div>
                    <div class="fnb-content pt-2">
                      <div class="title">salt popcorn quantity</div>
                      <div class="qty">
                        <div class="icon">+</div>
                        <div class="num">7</div>
                        <div class="icon">-</div>
                      </div>
                    </div>
                  </div>
                </slick>
                <!--End Offer Slider-->
              </div>
             </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="container-fluid checkout-fixed py-5">
      <div class="col-lg-12 mx-auto">
        <div class="align-items-center checkout-grid">
          <div class="text-right">
             <img
              src="@/assets/img/new-img/svg-img/back-arrow.svg"
              class=""
              width="40px"
            />
          </div>
          <div class="vertical-line">
          <hr class="vertical" />
          </div>
          <div class="d-flex justify-content-between">
            <ul class="mb-0 px-0 checkout-list">
              <li class="pb-2">MOVIE: THE CONJURING: THE DEVIL MADE ME DO IT</li>
              <li class="pb-2">DATE: WED, 28 OCT 2020</li>
              <li class="pb-2">TIME: 04:00 PM </li>
            </ul>
              <ul class="mb-0 px-0 checkout-list">
              <li class="pb-2">LOCATION: EMPIRE CINEMA, JAZAN</li>
              <li class="pb-2">EXPERIENCE: 2D (ARABIC)</li>
              <li class="pb-2">SEATS: F3,F4 </li>
            </ul>
          </div>
          <div class="vertical-line">
          <hr class="vertical" />
          </div>
          <div>
            TOTAL : SAR 96
          </div>
          <div class="vertical-line">
          <hr class="vertical" />
          </div>
          <div>
            <button class="btn btn-checkout">CHECKOUT</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import QuickBook from '@/components/partials/newQuickBook.vue'

export default {
  components: {
    QuickBook,
  },
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
      fnbSlider: {
        arrows: true,
        dots: false,
        infinite: true,
        slidesToScroll: 3,
        slidesToShow: 4,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 3,
            },
          },
          {
            breakpoint: 700,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 1,
              adaptiveHeight: true,
            },
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 1,
              adaptiveHeight: true,
              arrows: false,
            },
          },
        ],
      },
    }
  },
  beforeCreate: function () {
    document.body.className = 'light-section'
  },
  methods: {
    next () {
      this.$refs.fnbSlider.next()
    },

    prev () {
      this.$refs.fnbSlider.prev()
    },

    reInit () {
      this.$nextTick(() => {
        this.$refs.fnbSlider.reSlick()
      })
    },
  },
}
</script>
<style>
.order-online-page .btn-primary {
  text-align: left;
  text-transform: uppercase;
  font-size: 12px;
}

.custom-dropdown  {
  border: 1px solid #434345;
}
</style>
