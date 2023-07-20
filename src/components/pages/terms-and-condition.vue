<template>
  <section class="terms-section">
    <div class="container" v-html="content">

    </div>
  </section>
</template>




<script>
import { makeRequest, makeRequestBrij } from '@/helper/internet.js'

export default {
  beforeCreate: function () {
    let pre = window.localStorage.getItem('PREIMERE')
    if (pre == null || pre == 'false' || pre == false) {
      document.body.className = 'img-section'
    } else {
      document.body.className = 'gold-img-section'
    }
    console.log('reach')
    // this.getTermsAndConditions()
  },
  beforeMount: function () {
    // console.log('reach')
    // this.getTermsAndConditions()
  },
  data () {
    return {
      content: '',
    }
  },
  methods: {
    getMSPage () {
      return makeRequestBrij(`/api/external/ms_page?page_id=${2}`, 'GET', null, null)
        .then((response) => {
          const { error, res } = response

          console.log('res.data', res.data)
        })
        .catch(error => {
          console.log(`error fetching`, error)
        })
    },
    getTermsAndConditions: function () {
      let langData = localStorage.getItem('language')
      console.log('Terms And Conditions', langData)
    },
  },
}
</script>


<style scoped>
.footer {
  background-image: none !important;
}
</style>
