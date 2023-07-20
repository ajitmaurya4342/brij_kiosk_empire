<template>
  <div></div>
</template>

<script>
import { LanguageService, CountryService } from '@/services/storage.service'
import { MODE } from '@/helper/constant.js'

export default {
  data () {
    return {}
  },
  components: {
    // Home,
  },
  beforeMount: function () {
    let language = {
      lang: 'eng',
      lang_id: 2,
    }
    LanguageService.saveLanguage(language)
    let htt = window.location.host == 'localhost:8082' ? 'http://' : 'https://'
    window.location.href = htt + window.location.host
  },
}
</script>

<style scoped>
</style>
