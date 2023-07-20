<template>
  <section class="terms-section">
    <div class="container">
      <h3 align="center">{{ _allLanguageData.TermsAndCondition }}</h3>

      <p>{{ _allLanguageData.TermsAndConditionContent[0] }}</p>

      <p>{{ _allLanguageData.TermsAndConditionContent[1] }}</p>

      <h4>{{ _allLanguageData.ReturnsPolicy }}</h4>
      <p>{{ _allLanguageData.ReturnsPolicyContent }}</p>

      <h4>{{ _allLanguageData.Joining }}</h4>
      <p>{{ _allLanguageData.JoiningContent }}</p>

      <h4>{{ _allLanguageData.IntellectualProperty }}</h4>
      <p>{{ _allLanguageData.IntellectualPropertyContent[0] }}</p>
      <p>{{ _allLanguageData.IntellectualPropertyContent[1] }}</p>
      <ul class="ar-tc-list">
        <li>{{ _allLanguageData.IntellectualPropertyContent[2] }}</li>
        <li>{{ _allLanguageData.IntellectualPropertyContent[3] }}</li>
        <li>{{ _allLanguageData.IntellectualPropertyContent[4] }}</li>
        <li>{{ _allLanguageData.IntellectualPropertyContent[5] }}</li>
        <li>{{ _allLanguageData.IntellectualPropertyContent[6] }}</li>
        <li>{{ _allLanguageData.IntellectualPropertyContent[7] }}</li>
        <li>{{ _allLanguageData.IntellectualPropertyContent[8] }}</li>
        <li>{{ _allLanguageData.IntellectualPropertyContent[9] }}</li>
      </ul>

      <h4>{{ _allLanguageData.Linking }}</h4>
      <p>{{ _allLanguageData.LinkingContent }}</p>

      <h4>{{ _allLanguageData.Conduct }}</h4>
      <p>{{ _allLanguageData.ConductContent[0] }}</p>
      <ul class="ar-tc-list">
        <li>{{ _allLanguageData.ConductContent[1] }}</li>
        <li>{{ _allLanguageData.ConductContent[2] }}</li>
        <li>{{ _allLanguageData.ConductContent[3] }}</li>
        <li>{{ _allLanguageData.ConductContent[4] }}</li>
        <li>{{ _allLanguageData.ConductContent[5] }}</li>

        <li>{{ _allLanguageData.ConductContent[6] }}</li>
        <li>{{ _allLanguageData.ConductContent[7] }}</li>
        <li>{{ _allLanguageData.ConductContent[8] }}</li>
      </ul>

      <h4>{{ _allLanguageData.SecurityandAccuracyofInformation }}</h4>
      <p>{{ _allLanguageData.SecurityandAccuracyofInformationContent }}</p>

      <h4>{{ _allLanguageData.Thirdpartysites }}</h4>
      <p>{{ _allLanguageData.ThirdpartysitesContent }}</p>

      <h4>{{ _allLanguageData.Password }}</h4>
      <p>{{ _allLanguageData.PasswordContent }}</p>

      <h4>{{ _allLanguageData.General }}</h4>
      <p>{{ _allLanguageData.GeneralContent }}</p>

      <h4>{{ _allLanguageData.Disputes }}</h4>
      <p>{{ _allLanguageData.DisputesContnt }}</p>
    </div>
  </section>
</template>
<script>
import languageData from '@/languageData.json'

export default {
  data () {
    return {
      preimere: false,
      langName: null,
      _allLanguageData: {},
      cinemaType: '',
    }
  },
  beforeMount: function () {
    let langName = this.$route.params.lang
    // let lang_id = this.$route.params.lang_id;
    this.cinemaType = this.$route.params.cinemaType
    this.langName = langName || 'eng'

    this._allLanguageData = languageData[langName]
    if (this.cinemaType === 'premiere') {
      // this.preimere = true;
      this.preimere = 'true'
      window.localStorage.setItem('PREIMERE', true)
    } else {
      window.localStorage.setItem('PREIMERE', false)
      // this.preimere = false;
      this.preimere = 'false'
    }
  },
  mounted () {
    let preimereToken = window.localStorage.getItem('PREIMERE')
    if (
      preimereToken == 'null' ||
      preimereToken == null ||
      preimereToken == 'false' ||
      preimereToken == false
    ) {
      import('../../assets/css/style.css').then((something) => {
        import('../../assets/css/responsive.css')
      })
    } else {
      import('../../assets/css/preimere-css.css').then((something) => {
        import('../../assets/css/responsive.css')
      })
    }
    // this.$nextTick(function() {
    if (this.cinemaType == 'premiere') {
      document.body.className = 'gold-img-section'
    } else if (this.cinemaType == 'normal') {
      document.body.className = 'img-section'
    }
    // });
  },
}
</script>


<style scoped>
.footer {
  background-image: none !important;
}
footer {
  display: none !important;
}

header {
  display: none !important;
}
</style>
