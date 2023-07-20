<template>
  <section class="terms-section header-space">
    <div v-if="langName == 'eng'" class="container">
      <h3 class="text-center">Empire Cinema Rules</h3>
      <p class="font-weight-bold">In the cinema:</p>
      <p>
        All customers must have a valid cinema ticket for their movie screening. Children under 3 years
        are not permitted in the cinema
      </p>
      <p>The following is not permitted in the cinema complex:</p>
      <ul>
        <li>Food and drinks from outside the cinema complex.</li>
        <li>Smoking of cigarettes or e-cigarettes.</li>
        <li>Filming and/or photographing inside the auditorium</li>
      </ul>
      <p class="font-weight-bold">In the auditorium:</p>
      <ul>
        <li>
          Do not use your mobile phone; this includes but not limited to: Flashlight, texting, phone calls,
          mobile apps, etc…
        </li>
        <li>Do not put your feet on the seats</li>
      </ul>

      <p class="font-weight-bold">The cinema has the right to:</p>

      <ul>
        <li>
          Ask for ID if a customer is attending a movie that has established a certain age limit or rating; or
          to determine whether the customer is eligible for a discount ticket
        </li>
        <li>
          Refuse to sell cinema tickets to a person whose age is under the limit established by the movie
          rating, even if the person is accompanied by an adult
        </li>
        <li>
          Reject the admission of children below the age of 3 years to family films, even if they sit on the
          lap of a parent or guardian who has a valid adult ticket during the entire screening
        </li>
        <li>Change show times without prior notice or subject to change</li>
        <li>Subject movies to censorship and ratings by GCAM</li>
      </ul>
      <p>© 2019. All rights reserved.</p>
    </div>

    <div v-else class="container text-right rtl-class">
      <h3 class="text-center">الأنظمة الخاصة امباير سينما</h3>
      <p class="font-weight-bold">الأنظمة والسياسات الداخلية للسينما</p>
      <p>داخل السينما:</p>

      <p>يجب أن يكون لدى الجميع تذكرة سينما سارية المفعول لمشاهدة أفلامهم. لا يُسمح للأطفال الذين تقل أعمارهم عن 3 سنوات بالدخول إلى السينما</p>

      <p class="font-weight-bold">لا يُسمح بما يلي في مجمع السينما:</p>

      <ul>
        <li>المأكولات والمشروبات التي تم شراؤها خارج مجمع السينما</li>
        <li>تدخين السجائر أو السجائر الإلكترونية</li>
        <li>التصوير داخل صالة العرض</li>
      </ul>

      <p class="font-weight-bold">داخل صالة العرض السينمائية:</p>
      <ul>
        <li>لا تستخدم هاتفك المحمول</li>
        <li>يمنع وضع القدم على المقاع</li>
      </ul>

      <p class="font-weight-bold">السينما لديها الحق:</p>

      <ul>
        <li>طلب بطاقة هوية الزائر في حال تم تصنيف الفيلم تحت حدًا عمريًا معينًا أو لتحديد ما إذا كان الزائر مؤهلاً للحصول على تذكرة خصم</li>
        <li>رفض بيع تذاكر السينما لشخص يكون عمره أقل من الحد المحدد في تصنيف الفيلم، حتى لو كان الشخص برفقة شخص بالغ</li>
        <li>رفض قبول الأطفال دون سن الثالثة في الأفلام العائلية، حتى وإن كانوا جالسين على حِجْر أحد الوالدين أو الوصي الذي لديه تذكرة دخول صالحة للبالغين خلال العرض بأكمله</li>
        <li>تخضع جميع أوقات العرض للتغيير دون إشعار مسبق</li>
        <li>تخضع جميع تقييمات الأفلام للرقابة ويتم تصنيفها من قبل الهيئة العامة للإعلام المرئي والمسموع</li>
      </ul>
      <p>© 2019. كل الحقوق محفوظة</p>
    </div>
  </section>
</template>




<script>
export default {
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
.footer {
  background-image: none !important;
}
</style>
