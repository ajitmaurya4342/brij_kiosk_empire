<template>
  <div>
    <Home />
  </div>
</template>

<script>
import { LanguageService, CountryService } from '@/services/storage.service'
import { MODE } from '@/helper/constant.js'
import Home from './home'

export default {
  data () {
    return {}
  },
  components: {
    Home,
  },
  beforeMount: function () {
    let language = {
      lang: 'ar',
      lang_id: 1,
    }
    localStorage.removeItem('english')
    LanguageService.saveLanguage(language)
    let htt = window.location.host == 'localhost:8082' ? 'http://' : 'https://'
    if (
      localStorage.getItem('arabic') == 1 ||
      !localStorage.getItem('arabic')
    ) {
      localStorage.setItem('arabic', 2)
      window.location.reload(true)
    }
  },
}
</script>

<style scoped></style>
