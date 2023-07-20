<template>
  <section class="terms-section">
    <div v-if="langName == 'eng'" class="container">
      <h3 class="text-center">Empire Cinema Rules</h3>
      <p>In the cinema:</p>
      <p>All customers must have a valid cinema ticket for their movie screening. Children under 3 years are not permitted in the cinema.</p>
      <p>The following is not permitted in the cinema complex:</p>
      <ul>
        <li>Smoking of cigarettes or e-cigarettes.</li>
        <li>Filming and/or photographing inside the auditorium</li>
      </ul>
      <p>In the auditorium:</p>
      <ul>
        <li>Do not use your mobile phone</li>
        <li>Do not put your feet on the seats</li>
        <li>The cinema has the right</li>
        <li>To ask for an ID of a customer if the movie rating has established a certain age limit or to determine whether the customer is eligible for a discount ticket</li>
        <li>To refuse to sell cinema tickets to a person whose age is under the limit established by the movie rating, even if the person is accompanied by an adult;</li>
        <li>To reject the admit of children below the age of 3 years old to family films, even if they sit on the lap of a parent or guardian who has a valid adult ticket during the entire screening</li>
        <li>All show times are subject to change without prior notice</li>
        <li>All movie ratings are subject to censorship and rated by GCAM</li>
      </ul>
      <p>© 2019. All rights reserved.</p>
    </div>

    <div v-else class="container text-right rtl-class">
      <h3 class="text-center">الأنظمة الخاصة امباير سينما</h3>
      <p>الأنظمة والسياسات الداخلية للسينما</p>
      <p>داخل السينما:</p>
      <ul>
        <li>يجب أن يكون لدى الجميع تذكرة سينما سارية المفعول لمشاهدة أفلامهم. لا يُسمح للأطفال الذين تقل أعمارهم عن 3 سنوات بالدخول إلى السينما.</li>
      </ul>
      <p>لا يُسمح بما يلي في مجمع السينما:</p>
      <ul>
        <li>المأكولات والمشروبات التي تم شراؤها خارج مجمع السينما</li>
        <li>تدخين السجائر أو السجائر الإلكترونية.</li>
        <li>التصوير داخل صالة العرض</li>
      </ul>
      <p>داخل صالة العرض السينمائية</p>
      <ul>
        <li>لا تستخدم هاتفك المحمول.</li>
        <li>يمنع وضع القدم على المقاعد.</li>
      </ul>
      <p>السينما لديها الحق:</p>
      <ul>
        <li>طلب بطاقة هوية الزائر في حال تم تصنيف الفيلم تحت حدًا عمريًا معينًا أو لتحديد ما إذا كان الزائر مؤهلاً للحصول على تذكرة خصم</li>
        <li>رفض بيع تذاكر السينما لشخص يكون عمره أقل من الحد المحدد في تصنيف الفيلم، حتى لو كان الشخص برفقة شخص بالغ.</li>
        <li>رفض قبول الأطفال دون سن الثالثة في الأفلام العائلية، حتى وإن كانوا جالسين على حِجْر أحد الوالدين أو الوصي الذي لديه تذكرة دخول صالحة للبالغين خلال العرض بأكمله.</li>
        <li>تخضع جميع أوقات العرض للتغيير دون إشعار مسبق.</li>
        <li>تخضع جميع تقييمات الأفلام للرقابة ويتم تصنيفها من قبل الهيئة العامة للإعلام المرئي والمسموع.</li>
      </ul>
      <p>© 2019. كل الحقوق محفوظة. .</p>
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
      import('../../assets/css/style.css').then(something => {
        import('../../assets/css/responsive.css')
      })
    } else {
      import('../../assets/css/preimere-css.css').then(something => {
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
</style>
