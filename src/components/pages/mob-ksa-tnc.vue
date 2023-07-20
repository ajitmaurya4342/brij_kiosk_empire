<template>
  <section class="terms-section">
    <div v-if="langName == 'eng'" class="container">
      <h3 align="center">{{ _allLanguageData.TermsAndCondition }}</h3>
      <p class="font-weight-bold">
        {{ _allLanguageData.OperatorsandConsumersCodeofConduct }}
      </p>
      <p>{{ _allLanguageData.TermsAndConditionContent }}</p>
      <p class="font-weight-bold">
        {{ _allLanguageData.CinemaViewersObligations }}
      </p>
      <p class="font-weight-bold">{{ _allLanguageData.Talking }}</p>
      <p>{{ _allLanguageData.TalkingContent }}</p>
      <p class="font-weight-bold">{{ _allLanguageData.Eatingsmoking }}</p>

      <ol type="1">
        <li>{{ _allLanguageData.EatingSmokingContent[0] }}</li>
        <li>{{ _allLanguageData.EatingSmokingContent[1] }}</li>
        <li>{{ _allLanguageData.EatingSmokingContent[2] }}</li>
        <li>{{ _allLanguageData.EatingSmokingContent[3] }}</li>
      </ol>

      <p class="font-weight-bold">{{ _allLanguageData.SeatingTicketing }}</p>

      <ol type="1">
        <li>{{ _allLanguageData.SeatingTicketingContent[0] }}</li>
        <li>{{ _allLanguageData.SeatingTicketingContent[1] }}</li>
        <li>{{ _allLanguageData.SeatingTicketingContent[2] }}</li>
      </ol>

      <p class="font-weight-bold">{{ _allLanguageData.Parenting }}</p>
      <ol type="1">
        <li>{{ _allLanguageData.ParentingContent[0] }}</li>
        <li>{{ _allLanguageData.ParentingContent[1] }}</li>
      </ol>

      <p class="font-weight-bold">{{ _allLanguageData.Security }}</p>
      <ol type="1">
        <li>{{ _allLanguageData.SecurityContent }}</li>
      </ol>
      <p class="font-weight-bold">{{ _allLanguageData.other }}</p>
      <ol type="1">
        <li>{{ _allLanguageData.otherContent[0] }}</li>
        <li>{{ _allLanguageData.otherContent[1] }}</li>
        <li>{{ _allLanguageData.otherContent[2] }}</li>
      </ol>

      <p class="font-weight-bold">
        {{ _allLanguageData.Operatorsobligationstowardsviewers }}
      </p>
      <p>
        {{ _allLanguageData.Venuecondition }}
        <span class>{{ _allLanguageData.VenueconditionContent }}</span>
      </p>

      <p class="font-weight-bold">
        {{ _allLanguageData.Staffing }}
        <span class="font-weight-normal">{{
          _allLanguageData.StaffingContent
        }}</span>
      </p>
      <p class="font-weight-bold">
        {{ _allLanguageData.MovieSelection }}
        <span class="font-weight-normal">{{
          _allLanguageData.MovieSelectionContent
        }}</span>
      </p>
      <p class="font-weight-bold">
        {{ _allLanguageData.Tickettypeavailability }}
        <span class="font-weight-normal">{{
          _allLanguageData.TickettypeavailabilityContent
        }}</span>
      </p>
      <p class="font-weight-bold">
        {{ _allLanguageData.FoodBeverage }}
        <span class="font-weight-normal">{{
          _allLanguageData.FoodBeverageContent
        }}</span>
      </p>
      <p class="font-weight-bold">{{ _allLanguageData.MovieExperience }}</p>
      <ol type="1">
        <li>{{ _allLanguageData.MovieExperienceContent[0] }}</li>
        <li>{{ _allLanguageData.MovieExperienceContent[1] }}</li>
      </ol>

      <p class="font-weight-bold">
        {{ _allLanguageData.OperatorsobligationstowardGCAM }}
      </p>
      <p class="font-weight-bold">{{ _allLanguageData.Licensing }}</p>
      <ol type="1">
        <li>{{ _allLanguageData.LicensingContent[0] }}</li>
        <li>{{ _allLanguageData.LicensingContent[1] }}</li>
      </ol>

      <p class="font-weight-bold">{{ _allLanguageData.MovieRating }}</p>
      <ol type="1">
        <li>{{ _allLanguageData.MovieRatingContent[0] }}</li>
        <li>{{ _allLanguageData.MovieRatingContent[1] }}</li>
      </ol>

      <p class="font-weight-bold">
        {{ _allLanguageData.Localproductionsupport }}
        <span class="font-weight-normal">{{
          _allLanguageData.LocalproductionsupportContent
        }}</span>
      </p>

      <p class="font-weight-bold">
        {{ _allLanguageData.Informationprovision }}
        <span class="font-weight-normal">{{
          _allLanguageData.InformationprovisionContent
        }}</span>
      </p>
      <p class="font-weight-bold">
        {{ _allLanguageData.Fieldmonitoringandsupport }}
        <span class="font-weight-normal">{{
          _allLanguageData.FieldmonitoringandsupportContent
        }}</span>
      </p>
      <p class="font-weight-bold">
        {{ _allLanguageData.Complaintmanagement }}
        <span class="font-weight-normal">{{
          _allLanguageData.ComplaintmanagementContent
        }}</span>
      </p>
      <p class="font-weight-bold">
        {{ _allLanguageData.Movietermination }}
        <span class="font-weight-normal">{{
          _allLanguageData.MovieterminationContent
        }}</span>
      </p>

      <p class="font-weight-bold">
        {{ _allLanguageData.GeneralTermsandConditions }}
      </p>
      <p class="font-weight-bold">{{ _allLanguageData.ReturnsPolicy }}</p>
      <p>{{ _allLanguageData.ReturnsPolicyContent }}</p>
      <p class="font-weight-bold">
        {{ _allLanguageData.IntellectualProperty }}
      </p>
      <ol type="1">
        <li>{{ _allLanguageData.IntellectualPropertyContent[0] }}</li>
        <li>{{ _allLanguageData.IntellectualPropertyContent[1] }}</li>
        <li>{{ _allLanguageData.IntellectualPropertyContent[2] }}</li>
        <li>{{ _allLanguageData.IntellectualPropertyContent[3] }}</li>
        <li>{{ _allLanguageData.IntellectualPropertyContent[4] }}</li>
        <li>{{ _allLanguageData.IntellectualPropertyContent[5] }}</li>
        <li>{{ _allLanguageData.IntellectualPropertyContent[6] }}</li>
        <li>{{ _allLanguageData.IntellectualPropertyContent[7] }}</li>
        <li>{{ _allLanguageData.IntellectualPropertyContent[8] }}</li>
        <li>{{ _allLanguageData.IntellectualPropertyContent[9] }}</li>
        <li>{{ _allLanguageData.IntellectualPropertyContent[10] }}</li>
        <li>{{ _allLanguageData.IntellectualPropertyContent[11] }}</li>
        <li>{{ _allLanguageData.IntellectualPropertyContent[12] }}</li>
      </ol>

      <p class="font-weight-bold">{{ _allLanguageData.Linking }}</p>
      <p>{{ _allLanguageData.LinkingContent }}</p>
      <p class="font-weight-bold">{{ _allLanguageData.Conduct }}</p>
      <p class="font-weight-bold">{{ _allLanguageData.ConductContent[0] }}</p>
      <ol type="1">
        <li>{{ _allLanguageData.ConductContent[1] }}</li>
        <li>{{ _allLanguageData.ConductContent[2] }}</li>
        <li>{{ _allLanguageData.ConductContent[3] }}</li>
        <li>{{ _allLanguageData.ConductContent[4] }}</li>
        <li>{{ _allLanguageData.ConductContent[5] }}</li>
        <li>{{ _allLanguageData.ConductContent[6] }}</li>
        <li>{{ _allLanguageData.ConductContent[7] }}</li>
      </ol>

      <p class="font-weight-bold">
        {{ _allLanguageData.SecurityandAccuracyofInformation }}
      </p>
      <ol type="1">
        <li>{{ _allLanguageData.SecurityandAccuracyofInformationContent }}</li>
      </ol>

      <p class="font-weight-bold">{{ _allLanguageData.Thirdpartysites }}</p>
      <p>{{ _allLanguageData.ThirdpartysitesContent }}</p>
      <p class="font-weight-bold">{{ _allLanguageData.Password }}</p>
      <p>{{ _allLanguageData.PasswordContent }}</p>
      <p class="font-weight-bold">{{ _allLanguageData.General }}</p>
      <p>{{ _allLanguageData.GeneralContent }}</p>
      <p class="font-weight-bold">{{ _allLanguageData.Disputes }}</p>
      <p>{{ _allLanguageData.DisputesContnt }}</p>
      <p class="font-weight-bold">{{ _allLanguageData.Allrightsreserved }}</p>
    </div>

    <div v-else class="container text-right rtl-class">
      <h3 class="text-center">الشروط والاحكام</h3>
      <p class="font-weight-bold">
        مدونة قواعد السلوك الخاصة بالمشغل والمُشاهد
      </p>
      <p>
        عند استخدام الموقع الإلكتروني، يجب أن تمتثل لشروط وأحكام الاستخدام. وقد
        نُغير الشروط والأحكام من وقت لآخر؛ لذا يرجى قراءة الشروط والأحكام في كل
        مرة تستخدم الموقع الإلكتروني لضمان اطلاعك على مستجدات الشروط والأحكام.
        وباستمرار استخدام الموقع الإلكتروني، فأنت تقبل شروط وأحكام الاستخدام
        الحالية. وإذا لم توافق على الشروط والأحكام، فيجب عليك عدم استخدام الموقع
        الإلكتروني.
      </p>
      <p class="font-weight-bold">التزامات المشاهد</p>
      <p>
        الصوت المرتفع: المحافظة على الهدوء وتجنب الكلام بصوت مرتفع مما قد يسبب
        من إزعاج للمشاهدين الآخرين
      </p>
      <p>تناول الطعام والتدخين</p>
      <p>
        الحرص على تناول الطعام بصوت منخفض ومن دون إحداث فوضى مما قد يثير ازعاج
        المشاهدين الآخرين
      </p>
      <p>التدخين ممنوع منعاً باتاً في قاعة السينما</p>
      <p>
        : يمنع منعاّ باتاّ تسجيل أو تصوير مقاطع الأفلام المعروضة أو الدعايات
        تسجيل الأفلام
      </p>
      <p>
        الحضور في الوقت المحدد: الوصول المتأخر إلى صالة العرض غير محبّذ وذلك
        لتفادي ازعاج للمشاهدين الآخرين
      </p>
      <p>المقاعد والتذاكر</p>
      <p>يجب على المشاهد عدم وضع الأحذية أو الأقدام على المقاعد</p>
      <p>
        على المشاهد الحفاظ على التذكرة الخاصة به؛ وإبرازها في حين طلبت منه،
        ويمنع له الجلوس في مقعد غير مخصص له
      </p>
      <p>
        الالتزام بالملابس والأحذية التي تتماشى مع مبادئ وثقافة المملكة الزي:
      </p>
      <p class="font-weight-bold">الأهالي</p>
      <p>
        يتعين على المشاهد ملازمة أطفاله ومحاولة التقليل من الإزعاج قدر الإمكان
        (مثل البكاء، والكلام بصوت مرتفع، والركض، وما نحوه.)
      </p>
      <p>يمنع اصطحاب الأطفال الرضع داخل دور السينما.</p>
      <p>الأمن والسلامة</p>
      <p>
        يحظّر إحضار أو إظهار أو استخدام أي أسلحة حقيقية أو غير حقيقية مهما كان
        نوعها
      </p>
      <p>
        لدى مشغل السينما حق التحقق من الحقائب التي يتم إدخالها إلى صالة العرض
      </p>
      <p>غير ذلك</p>
      <p>
        الابتعاد عن استخدام أي أجهزة الكترونية (بما في ذلك الهواتف، أو الأجهزة
        اللوحية، أو أجهزة الألعاب، أو الليزر) أثناء عرض الفيلم
      </p>
      <p>
        يجب التقيد بالتعليمات ويمنع تماماً التعرض لأي من موظفي دور العرض سواء
        شفهياً أو جسدياً
      </p>
      <p class="font-weight-bold">التزامات المشغل تجاه المشاهد</p>
      <p>تجربة مشاهدة الأفلام</p>
      <p>
        توفير تجربة نوعية للمشاهد من خلال توفير أنظمة صوتية، وأجهزة عرض، ومقاعد،
        وشاشات تتماشى مع المعايير الدولية للسينما
      </p>
      <p>عرض الأفلام بالوقت المحدد من دون أي تأخير رئيسي</p>
      <p class="font-weight-bold">
        التزامات المشغل تجاه الهيئة العامة للإعلام المرئي والمسموع
      </p>
      <p>الترخيص</p>
      <p>
        الامتثال للمعايير، والقواعد، والأنظمة المنصوص عليها في التراخيص مما تشمل
        الأنشطة والفترة الزمنية وما نحوه
      </p>
      <p>
        في حال حدوث أي تغييرات على المعلومات الواردة في الترخيص بعد إصدارها،
        يتعين على المشغل المعني تبليغ الهيئة العام للإعلام المرئي والمسموع بهذا
        التغيير
      </p>
      <p>تصنيف الأفلام</p>
      <p>
        التقيد بالتصنيف الصادر من الهيئة العامة للإعلام المرئي والمسموع ويجب أن
        يكون التصنيف موضح على التذاكر، وشاشات جداول عرض الأفلام، وغيرها من
        الدعايات ذات الصلة
      </p>
      <p>يحب على كل مشغل امتلاك نسخة من شهادة تصنيف الفيلم من الموزع</p>
      <p class="font-weight-bold">الشروط والأحكام العامة</p>
      <p class="font-weight-bold">سياسة الارجاع</p>
      <p>
        تذاكر الأفلام التي يتم بيعها عبر الإنترنت لامبير سينما، غير قابلة
        للاسترجاع، الاستبدال أو الإلغاء. لن يتم رد أي مبالغ خاصة بالحجز أو إصدار
        تذاكر مجانية بسبب اختيار غير صحيح لأوقات العرض، التواريخ، أنواع التذاكر
        (عائلات أو أفراد)، تصنيف الأفلام أو الأفلام. يرجى مراجعة ملخص الحجز
        الخاص بك بعناية والتحقق من أن معلومات العرض والتذكرة المضمنة تحت عنوان
        "اختر التذاكر" صحيحة، قبل المتابعة إلى الدفع والخروج. عند إكمال المعاملة
        الخاصة بك والنقر فوق زر "الشراء الآن"، فأنت توافق على قبول هذه السياسة.
      </p>
      <p class="font-weight-bold">التسجيل</p>
      <p>
        عند التسجيل، سنطلب منك بعض التفاصيل الشخصية. قد نطلب من وقت لآخر معلومات
        إضافية للمسابقات وما إلى ذلك. إن خصوصيتك تهمنا ولن نمرر أي معلومات عنك
        مع أي طرف ثالث ما لم تعطنا تصريح كتابي للقيام بذلك.
      </p>
      <p class="font-weight-bold">الملكية الفكرية</p>
      <p>ما نسمح لك القيام به / عدم القيام به</p>
      <p>
        نحن نملك كل محتوى هذا الموقع. وهذا يشمل جميع النصوص والتصاميم والشعارات
        والرسوم البيانية وبرامج الكمبيوتر والصوت والفيديو والكود (بما في ذلك
        HTML) في أي شكل. إلا في حال نص على خلاف ذلك في الشروط والأحكام المذكورة،
        لا يجوز إعادة إنتاج أي من المواد الموجودة على هذا الموقع أو تنزيلها أو
        توزيعها أو نسخها أو إعادة نشرها أو عرضها أو نقلها بأي شكل من الأشكال دون
        تصريح كتابي منا. نحن نمنحك الإذن بعرض هذا الموقع من خلال متصفحات
        الانترنت بشرط ألا تقوم بما يلي:
      </p>
      <p>تعديل المواد على هذا الموقع؛</p>
      <p>إعادة بيع المواد على هذا الموقع؛ أو</p>
      <p>إنشاء أعمال مشتقة من المواد الموجودة على هذا الموقع.</p>
      <p>يجوز لنا سحب هذا الإذن في أي وقت دون إشعارك.</p>
      <p>
        يجوز لنا حسب تقديرنا المطلق نشر المواد أو المعلومات التي ترسلها إلينا
        على موقع الويب هذا من أجل:
      </p>
      <p>المشاركة في المسابقات</p>
      <p>آراء شخصية حول الأفلام</p>
      <p>أي سبب آخر</p>
      <p>
        من خلال تقديم معلومات أو مواد لنا، فإنك تمنحنا ترخيصاً عالمياً لا رجعة
        عنه، دائماً، خالياً من الإتاوات وغير حصري، من أجل:
      </p>
      <p>
        إعادة إنتاج أو تعديل أو إعادة ترخيص أو إعادة توزيع أو تكييف أو إرسال أو
        نشر أو عرض هذه المعلومات أو
      </p>
      <p>المواد وإنشاء أعمال مشتقة منها؛</p>
      <p>إعادة ترخيص أي من الحقوق المنتهية صلاحيتها لأي طرف ثالث</p>
      <p class="font-weight-bold">الربط</p>
      <p>لا يمكنك إنشاء رابط ثانوي للموقع ما لم نمنحك تصريح كتابي بذلك.</p>
      <p class="font-weight-bold">سلوك</p>
      <p>في استخدام هذا الموقع الإلكتروني، يجب ألا:</p>
      <p>
        تقوم بتعطيل تشغيل أو أمان هذا الموقع أو أي حسابات أو خوادم أو شبكات
        متصلة أو يمكن الوصول إليها من خلال هذا الموقع؛
      </p>
      <p>
        استخدام موقع الويب هذا بطريقة قد تضايق أو تزعج أو تعطل أي شخص ثالث، بما
        في ذلك شخص ثالث قد يتلقى رسائل نتيجة لاستخدامك لهذا الموقع؛
      </p>
      <p>
        تقديم أي معلومات أو مواد غير قانونية من أي نوع، سواء كانت غير قانونية أو
        تهديدية أو مسيئة أو تشهيرية أو فاحشة أو فاضحة أو إباحية أو دنيئة أو غير
        لائقة، بما في ذلك على سبيل المثال بلا حصر، أي مادة تشكل سلوكاً مشجعاً أو
        تشجيعياً من شأنه أن يشكل جريمة جنائية أو يؤدي إلى مسؤولية مدنية أو غير
        ذلك تنتهك أي قانون معمول به؛ تقديم أي مواد من أي نوع تنتهك حقوق أي شخص
        آخر، بما في ذلك المواد التي تعد انتهاكاً لأي من حقوق الخصوصية المحمية
        بموجب حق المؤلف أو العلامة التجارية أو أي حقوق ملكية أخرى دون الحصول
        أولاً على إذن من المالك أو صاحب الحق المعني؛
      </p>
      <p>تقديم مواد من أي نوع تحتوي على فيروس أو أي مكون ضار آخر؛</p>
      <p>
        تعديل أو حذف أي محتوى على هذا الموقع أو إضافة أي محتوى إلى هذا الموقع؛
        أو
      </p>
      <p>محاولة الوصول بشكل غير مصرح به إلى أي جزء من هذا الموقع.</p>
      <p>
        نحن نحتفظ بالحق في التعاون الكامل مع أي سلطة قانونية في أي اختصاص قضائي
        فيما يتعلق بأي توجيه قانوني أو طلب الكشف عن الهوية أو أي معلومات أخرى
        تتعلق بأي شخص ينشر أي مواد تنتهك أي قانون سارٍ أو ذو صلة.
      </p>
      <p class="font-weight-bold">أمن ودقة المعلومات</p>
      <p>قد يختلف الموقع من وقت لآخر.</p>
      <p class="font-weight-bold">مواقع الطرف الثالث</p>
      <p>
        قد تتمكن من الوصول إلى مواقع الأطراف الثالثة من هذا الموقع. نحن لا نقدم
        أي إقرارات أو دعاوى فيما يتعلق بمحتوى هذه المواقع أو جودتها أو
        موثوقيتها، كما أن تضميننا لهذه الروابط لا يعني أننا نملك أي علاقة أو
        ارتباط بها.
      </p>
      <p class="font-weight-bold">كلمه السر</p>
      <p>
        إذا قمت بالتسجيل في هذا الموقع، فقد يتم تزويدك بكلمة مرور. إذا تم تزويدك
        بكلمة مرور، فيجب عليك الحفاظ على سريتها وأمانها.
      </p>
      <p class="font-weight-bold">عام</p>
      <p>
        واجب القانون المشترك للرعاية. نحن لا نفترض أي واجب قانوني مشترك للرعاية
        تجاهك في تقديم المعلومات على هذا الموقع.
      </p>
      <p class="font-weight-bold">النزاعات</p>
      <p>
        أي نزاع بينك وبيننا سيتم تحديده بموجب قوانين المملكة العربية السعودية من
        قبل محاكم المملكة العربية السعودية.
      </p>
    </div>
  </section>
</template>
<script>
import languageDataksa from '@/languageDataksa.json'

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

    if (langName == 2 || langName == '2') {
      this.langName = 'eng'
    } else {
      this.langName = 'ar'
    }
    // console.log("languageDataksa[langName]", languageDataksa[langName]);
    // this._allLanguageData = languageDataksa[langName];

    this._allLanguageData = this.allLanguageData

    // console.log("this._allLanguageData", this._allLanguageData);
    // console.log("this._allLanguageData111", this.allLanguageData);

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
