<template>
  <div>
    <BannerSlider simpleBanner="true"  />

    <div class="container custom-container mb-4">
      <QuickBook />
      <div class="mx-0">
        <div
          class="main-heading
            d-flex
            align-items-center
            justify-content-center
            mt-4
            pt-4 pb-2
          "
        >
          <div>
            <hr class="primary-line" />
          </div>
          <div class="title">LIVE EMPIRE EXPERIENCES</div>
        </div>
        <div class="row">
          <div
            v-for="(data, index) in 8"
            class="col-md-3 col-6 px-1 mb-1 animate__animated animate__bounce"
            :key="index"
          >
            <div class="exp-cinema-card mt-2">
              <div class="card-overlay">
                <img
                :src="require('@/assets/img/new-img/png-img/cinema-1' + (index+1) + '.png')"
                  class="cinema-image img-fluid"
                />
                <div class="cinema-logo">
                  <img
                    :src="require('@/assets/img/new-img/svg-img/logo-' + (index+1) + '.svg')"
                    class="logo-image img-fluid"
                  />

                </div>
                <div class="bottom-text d-flex align-items-center justify-content-center">
                  <div class="pr-3">Take a look</div>
                  <div>
                    <img src="@/assets/img/new-img/svg-img/left-white-arrow.svg" width="20px" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import QuickBook from '@/components/partials/newQuickBook.vue'
import BannerSlider from '@/components/partials/bannerSlider.vue'

export default {
  components: {
    QuickBook,
    BannerSlider,
  },
  data () {
    return {
    }
  },
  methods: {

  },
}
</script>
<style>
</style>
