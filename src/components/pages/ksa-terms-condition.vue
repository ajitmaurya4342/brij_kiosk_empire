<template>
  <section class="terms-section header-space">
    <div v-html="content" class="container">

    </div>
  </section>
</template>




<script>
import { URL_BASE } from '@/helper/constant'
import {
  TokenService,
} from '@/services/storage.service'
import axios from 'axios'
import { makeRequest, makeRequestBrij } from '@/helper/internet.js'

export default {
  beforeCreate: function () {
    document.body.className = 'dark-section'
  },
  mounted () {
    console.log('this.langName :', this.langName)
  },
  beforeMount: function () {
    console.log('reach')
    // this.getTermsAndConditions()
    this.getMSPage()
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
          let content = res.data.Records.filter(x => x.lang_id == this.getCurrentLang().brij_lang_id)[0] || { page_content: '' }
          this.content = content.page_content
        })
        .catch(error => {
          console.log(`error fetching`, error)
        })
    },
    getTermsAndConditions: function () {
      let langData = JSON.parse(localStorage.getItem('language'))
      let token = TokenService.getToken()
      let payload = {
        LanguageID: langData.lang_id,
      }
      var config = {
        method: 'POST',
        url: `${URL_BASE}/getTermsAndCond`,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${token}`,
        },
        data: JSON.stringify(payload),
      }
      axios(config).then((result) => {
        const {data } = result
        if (data.termsAndConditions && data.termsAndConditions.length > 0 && data.termsAndConditions[0]) {
          this.content = data.termsAndConditions[0].content
          console.log(this.content)
        }
      })
    },
  },
}
</script>


<style>
.ql-align-center {
   text-align: center !important;
}
.footer {
  background-image: none !important;
}
</style>
