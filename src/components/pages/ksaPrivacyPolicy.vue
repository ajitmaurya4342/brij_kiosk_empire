<template>
  <section class="terms-section">
    <div v-if="langName == 'eng'" class="container">
      <h3 align="center">Privacy Policy</h3>
      <p class="font-weight-bold">
        {{ allLanguageData.OperatorsandConsumersCodeofConduct }}
      </p>
      <p>{{ allLanguageData.TermsAndConditionContent }}</p>
      <p class="font-weight-bold">
        {{ allLanguageData.CinemaViewersObligations }}
      </p>
      <p class="font-weight-bold">{{ allLanguageData.Talking }}</p>
      <p>{{ allLanguageData.TalkingContent }}</p>
      <p class="font-weight-bold">{{ allLanguageData.Eatingsmoking }}</p>

      <ol type="1">
        <li>{{ allLanguageData.EatingSmokingContent[0] }}</li>
        <li>{{ allLanguageData.EatingSmokingContent[1] }}</li>
      </ol>

      <p class="font-weight-bold">{{ allLanguageData.MovieRecording }}</p>
      <p>{{ allLanguageData.MovieRecordingContent }}</p>

      <p class="font-weight-bold">{{ allLanguageData.SeatingTicketing }}</p>

      <ol type="1">
        <li>{{ allLanguageData.SeatingTicketingContent[0] }}</li>
        <li>{{ allLanguageData.SeatingTicketingContent[1] }}</li>
      </ol>

      <p class="font-weight-bold">{{ allLanguageData.Clothing }}</p>
      <p>{{ allLanguageData.ClothingContent }}</p>

      <p class="font-weight-bold">{{ allLanguageData.Parenting }}</p>
      <ol type="1">
        <li>{{ allLanguageData.ParentingContent[0] }}</li>
        <li>{{ allLanguageData.ParentingContent[1] }}</li>
      </ol>

      <p class="font-weight-bold">{{ allLanguageData.Security }}</p>
      <ol type="1">
        <li>{{ allLanguageData.SecurityContent }}</li>
      </ol>
      <p class="font-weight-bold">{{ allLanguageData.other }}</p>
      <ol type="1">
        <li>{{ allLanguageData.otherContent[0] }}</li>
        <li>{{ allLanguageData.otherContent[1] }}</li>
        <li>{{ allLanguageData.otherContent[2] }}</li>
      </ol>

      <p class="font-weight-bold">
        {{ allLanguageData.Operatorsobligationstowardsviewers }}
      </p>
      <p>
        {{ allLanguageData.Venuecondition }}
        <span class>{{ allLanguageData.VenueconditionContent }}</span>
      </p>

      <p class="font-weight-bold">
        {{ allLanguageData.Staffing }}
        <span class="font-weight-normal">{{
          allLanguageData.StaffingContent
        }}</span>
      </p>
      <p class="font-weight-bold">
        {{ allLanguageData.MovieSelection }}
        <span class="font-weight-normal">{{
          allLanguageData.MovieSelectionContent
        }}</span>
      </p>
      <p class="font-weight-bold">
        {{ allLanguageData.Tickettypeavailability }}
        <span class="font-weight-normal">{{
          allLanguageData.TickettypeavailabilityContent
        }}</span>
      </p>
      <p class="font-weight-bold">
        {{ allLanguageData.FoodBeverage }}
        <span class="font-weight-normal">{{
          allLanguageData.FoodBeverageContent
        }}</span>
      </p>
      <p class="font-weight-bold">{{ allLanguageData.MovieExperience }}</p>
      <ol type="1">
        <li>{{ allLanguageData.MovieExperienceContent[0] }}</li>
        <li>{{ allLanguageData.MovieExperienceContent[1] }}</li>
      </ol>

      <p class="font-weight-bold">
        {{ allLanguageData.OperatorsobligationstowardGCAM }}
      </p>
      <p class="font-weight-bold">{{ allLanguageData.Licensing }}</p>
      <ol type="1">
        <li>{{ allLanguageData.LicensingContent[0] }}</li>
        <li>{{ allLanguageData.LicensingContent[1] }}</li>
      </ol>

      <p class="font-weight-bold">{{ allLanguageData.MovieRating }}</p>
      <ol type="1">
        <li>{{ allLanguageData.MovieRatingContent[0] }}</li>
        <li>{{ allLanguageData.MovieRatingContent[1] }}</li>
      </ol>

      <p class="font-weight-bold">
        {{ allLanguageData.Localproductionsupport }}
        <span class="font-weight-normal">{{
          allLanguageData.LocalproductionsupportContent
        }}</span>
      </p>

      <p class="font-weight-bold">
        {{ allLanguageData.Informationprovision }}
        <span class="font-weight-normal">{{
          allLanguageData.InformationprovisionContent
        }}</span>
      </p>
      <p class="font-weight-bold">
        {{ allLanguageData.Fieldmonitoringandsupport }}
        <span class="font-weight-normal">{{
          allLanguageData.FieldmonitoringandsupportContent
        }}</span>
      </p>
      <p class="font-weight-bold">
        {{ allLanguageData.Complaintmanagement }}
        <span class="font-weight-normal">{{
          allLanguageData.ComplaintmanagementContent
        }}</span>
      </p>
      <p class="font-weight-bold">
        {{ allLanguageData.Movietermination }}
        <span class="font-weight-normal">{{
          allLanguageData.MovieterminationContent
        }}</span>
      </p>

      <p class="font-weight-bold">
        {{ allLanguageData.GeneralTermsandConditions }}
      </p>
      <p class="font-weight-bold">{{ allLanguageData.ReturnsPolicy }}</p>
      <p>{{ allLanguageData.ReturnsPolicyContent }}</p>
      <p class="font-weight-bold">{{ allLanguageData.IntellectualProperty }}</p>
      <ol type="1">
        <li>{{ allLanguageData.IntellectualPropertyContent[0] }}</li>
        <li>{{ allLanguageData.IntellectualPropertyContent[1] }}</li>
        <li>{{ allLanguageData.IntellectualPropertyContent[2] }}</li>
        <li>{{ allLanguageData.IntellectualPropertyContent[3] }}</li>
        <li>{{ allLanguageData.IntellectualPropertyContent[4] }}</li>
        <li>{{ allLanguageData.IntellectualPropertyContent[5] }}</li>
        <li>{{ allLanguageData.IntellectualPropertyContent[6] }}</li>
        <li>{{ allLanguageData.IntellectualPropertyContent[7] }}</li>
        <li>{{ allLanguageData.IntellectualPropertyContent[8] }}</li>
        <li>{{ allLanguageData.IntellectualPropertyContent[9] }}</li>
        <li>{{ allLanguageData.IntellectualPropertyContent[10] }}</li>
        <li>{{ allLanguageData.IntellectualPropertyContent[11] }}</li>
        <li>{{ allLanguageData.IntellectualPropertyContent[12] }}</li>
      </ol>

      <p class="font-weight-bold">{{ allLanguageData.Linking }}</p>
      <p>{{ allLanguageData.LinkingContent }}</p>
      <p class="font-weight-bold">{{ allLanguageData.Conduct }}</p>
      <p class="font-weight-bold">{{ allLanguageData.ConductContent[0] }}</p>
      <ol type="1">
        <li>{{ allLanguageData.ConductContent[1] }}</li>
        <li>{{ allLanguageData.ConductContent[2] }}</li>
        <li>{{ allLanguageData.ConductContent[3] }}</li>
        <li>{{ allLanguageData.ConductContent[4] }}</li>
        <li>{{ allLanguageData.ConductContent[5] }}</li>
        <li>{{ allLanguageData.ConductContent[6] }}</li>
        <li>{{ allLanguageData.ConductContent[7] }}</li>
      </ol>

      <p class="font-weight-bold">
        {{ allLanguageData.SecurityandAccuracyofInformation }}
      </p>
      <ol type="1">
        <li>{{ allLanguageData.SecurityandAccuracyofInformationContent }}</li>
      </ol>

      <p class="font-weight-bold">{{ allLanguageData.Thirdpartysites }}</p>
      <p>{{ allLanguageData.ThirdpartysitesContent }}</p>
      <p class="font-weight-bold">{{ allLanguageData.Password }}</p>
      <p>{{ allLanguageData.PasswordContent }}</p>
      <p class="font-weight-bold">{{ allLanguageData.General }}</p>
      <p>{{ allLanguageData.GeneralContent }}</p>
      <p class="font-weight-bold">{{ allLanguageData.Disputes }}</p>
      <p>{{ allLanguageData.DisputesContnt }}</p>
      <p class="font-weight-bold">{{ allLanguageData.Allrightsreserved }}</p>
    </div>

    <div v-else>
      <div class="container text-right rtl-class">
        <h3 class="text-center">الشروط والاحكام</h3>
        <p>
          عند استخدام الموقع الإلكتروني، يجب أن تمتثل لشروط وأحكام الاستخدام.
          وقد نُغير الشروط والأحكام من وقت لآخر؛ لذا يرجى قراءة الشروط والأحكام
          في كل مرة تستخدم الموقع الإلكتروني لضمان اطلاعك على مستجدات الشروط
          والأحكام. وباستمرار استخدام الموقع الإلكتروني، فأنت تقبل شروط وأحكام
          الاستخدام الحالية. وإذا لم توافق على الشروط والأحكام، فيجب عليك عدم
          استخدام الموقع الإلكتروني.
        </p>
        <p>اتصلوا على: 920009531 او اتواصلوا معانا على الايميل:</p>
        <p>complaints@empirecinemas.com.sa</p>

        <h3>مدونة قواعد السلوك الخاصة بالمشغل والمُشاهد</h3>
        <h4>التزامات المشاهد</h4>
        <p>
          الصوت المرتفع: المحافظة على الهدوء وتجنب الكلام بصوت مرتفع مما قد يسبب
          من إزعاج للمشاهدين الآخرين
        </p>
        <h4>تناول الطعام والتدخين</h4>
        <ul>
          <li>
            الحرص على تناول الطعام بصوت منخفض ومن دون إحداث فوضى مما قد يثير
            ازعاج المشاهدين الآخرين
          </li>
          <li>التدخين ممنوع منعاً باتاً في قاعة السينما</li>
        </ul>

        <p>
          يمنع منعاّ باتاّ تسجيل أو تصوير مقاطع الأفلام المعروضة أو الدعايات
          تسجيل الأفلام:
        </p>
        <p>
          الحضور في الوقت المحدد: الوصول المتأخر إلى صالة العرض غير محبّذ وذلك
          لتفادي ازعاج للمشاهدين الآخرين
        </p>
        <p>المقاعد والتذاكر</p>
        <ol type="1">
          <li>يجب على المشاهد عدم وضع الأحذية أو الأقدام على المقاعد</li>
          <li>
            على المشاهد الحفاظ على التذكرة الخاصة به؛ وإبرازها في حين طلبت منه،
            ويمنع له الجلوس في مقعد غير مخصص له
          </li>
        </ol>

        <p>
          الالتزام بالملابس والأحذية التي تتماشى مع مبادئ وثقافة المملكة الزي
        </p>
        <p>الأهالي</p>

        <ul>
          <li>
            يتعين على المشاهد ملازمة أطفاله ومحاولة التقليل من الإزعاج قدر
            الإمكان (مثل البكاء، والكلام بصوت مرتفع، والركض، وما نحوه)
          </li>
          <li>يمنع اصطحاب الأطفال الرضع داخل دور السينما.</li>
        </ul>

        <h4>الأمن والسلامة</h4>
        <ul>
          <li>
            يحظّر إحضار أو إظهار أو استخدام أي أسلحة حقيقية أو غير حقيقية مهما
            كان نوعها
          </li>
          <li>
            لدى مشغل السينما حق التحقق من الحقائب التي يتم إدخالها إلى صالة
            العرض
          </li>
        </ul>

        <h4>غير ذلك</h4>
        <p>
          الابتعاد عن استخدام أي أجهزة الكترونية (بما في ذلك الهواتف، أو الأجهزة
          اللوحية، أو أجهزة الألعاب، أو الليزر) أثناء عرض الفيلم
        </p>

        <p>
          يجب التقيد بالتعليمات ويمنع تماماً التعرض لأي من موظفي دور العرض سواء
          شفهياً أو جسدياً
        </p>

        <h3>التزامات المشغل تجاه المشاهد</h3>
        <h4>تجربة مشاهدة الأفلام</h4>
        <p>
          حالة صالة العرض: التأكد من ان الصالات تكون في حالة جيدة وصالحة للخدمة،
          وذلك يشمل النظافة، ودرجة الحرارة، وتيسير دخول ذوي الإحتياجات الخاصة
          والصيانة الملائمة وعمل المعدات بشكل سليم
        </p>

        <p>
          الموظفين: توفير موظفين حاصلين على التدريب اللازم والقادرين على خدمة
          العملاء والإجابة على جميع الاستفسارات والطلبات والشكاوى
        </p>

        <p>
          اختيار الأفلام: توفير مجموعة واسعة من الأفلام والتي تناسب جميع أنواع
          المشاهدين ذوي الخلفيات والأعمار والأذواق المختلفة
        </p>
        <p>
          توفير أنوع التذاكر المختلفة: الحرص على توفير أسعار وتصنيفات مختلفة
          للتذاكر التي تلبي مختلف احتياجات المشاهد
        </p>
        <p>
          المأكولات والمشروبات: تقديم كافة الخيارات من المأكولات والمشروبات التي
          تلبي مختلف أذواق واحتياجات المشاهد
        </p>

        <h3>التزامات المشغل تجاه الهيئة العامة للإعلام المرئي والمسموع</h3>
        <h4>الترخيص</h4>
        <ul>
          <li>
            الامتثال للمعايير، والقواعد، والأنظمة المنصوص عليها في التراخيص مما
            تشمل الأنشطة والفترة الزمنية وما نحوه
          </li>
          <li>
            في حال حدوث أي تغييرات على المعلومات الواردة في الترخيص بعد إصدارها،
            يتعين على المشغل المعني تبليغ الهيئة العام للإعلام المرئي والمسموع
            بهذا التغيير
          </li>
        </ul>

        <h4>تصنيف الأفلام</h4>

        <ul>
          <li>
            التقيد بالتصنيف الصادر من الهيئة العامة للإعلام المرئي والمسموع ويجب
            أن يكون التصنيف موضح على التذاكر، وشاشات جداول عرض الأفلام، وغيرها
            من الدعايات ذات الصلة
          </li>
          <li>يحب على كل مشغل امتلاك نسخة من شهادة تصنيف الفيلم من الموزع</li>
          <li>
            دعم الإنتاج المحلي: الحرص على أن يتم عرض عدد كاف من الأفلام المنتجة
            محلياً في صالات العرض التابعة له لتعزيز صناعة الأفلام المحلية
            وتطويرها
          </li>
        </ul>

        <p>
          توفير المعلومات: تزويد الهيئة العامة للإعلام المرئي والمسموع بكافة
          المعلومات المتعلقة بالسينما في أي وقت كان وأي معلومات أخرى متعلقة
          بصالات العرض
        </p>

        <p>
          الدعم والرقابة الميداننية: على المشغل التعاون مع مسؤولي الراقبة والرصد
          الميداني التابعين للهيئة العامة للإعلام المرئي والمسموع وتسهيل عملهم
          أثناء الزيارات الميدانية
        </p>
        <p>
          إدارة الشكاوى: إحالة أي شكوى ذات صلة بالهيئة العامة للإعلام المرئي
          والمسموع إلى إدارة خدمة العملاء في الهيئة وذلك لاتخاذ الإجراءات
          اللازمة
        </p>

        <p>
          وقف عرض الأفلام: يحق لمسؤولي الرقابة الورصد التابعين للهيئة العامة
          للإعلام المرئي والمسموع إيقاف أي عرض غير خاضع للرقابة المرخصة من قبل
          الهيئة
        </p>

        <h3>الشروط والأحكام العامة</h3>
        <h4>سياسة الارجاع</h4>
        <p>
          تذاكر الأفلام التي يتم بيعها عبر الإنترنت لامبير سينما، غير قابلة
          للاسترجاع، الاستبدال أو الإلغاء. لن يتم رد أي مبالغ خاصة بالحجز أو
          إصدار تذاكر مجانية بسبب اختيار غير صحيح لأوقات العرض، التواريخ، أنواع
          التذاكر (عائلات أو أفراد)، تصنيف الأفلام أو الأفلام. يرجى مراجعة ملخص
          الحجز الخاص بك بعناية والتحقق من أن معلومات العرض والتذكرة المضمنة تحت
          عنوان "اختر التذاكر" صحيحة، قبل المتابعة إلى الدفع والخروج. عند إكمال
          المعاملة الخاصة بك والنقر فوق زر "الشراء الآن"، فأنت توافق على قبول
          هذه السياسة.
        </p>

        <h4>التسجيل</h4>
        <p>
          عند التسجيل، سنطلب منك بعض التفاصيل الشخصية. قد نطلب من وقت لآخر
          معلومات إضافية للمسابقات وما إلى ذلك إن خصوصيتك تهمنا ولن نمرر أي
          معلومات عنك مع أي طرف ثالث ما لم تعطنا تصريح كتابي للقيام بذلك.
        </p>

        <h3>الملكية الفكرية</h3>

        <p>ما نسمح لك القيام به / عدم القيام به</p>
        <p>
          نحن نملك كل محتوى هذا الموقع. وهذا يشمل جميع النصوص والتصاميم
          والشعارات والرسوم البيانية وبرامج الكمبيوتر والصوت والفيديو والكود
          (بما في ذلك HTML) في أي شكل. إلا في حال نص على خلاف ذلك في الشروط
          والأحكام المذكورة، لا يجوز إعادة إنتاج أي من المواد الموجودة على هذا
          الموقع أو تنزيلها أو توزيعها أو نسخها أو إعادة نشرها أو عرضها أو نقلها
          بأي شكل من الأشكال دون تصريح كتابي منا. نحن نمنحك الإذن بعرض هذا
          الموقع من خلال متصفحات الانترنت بشرط ألا تقوم بما يلي:
        </p>

        <ul>
          <li>تعديل المواد على هذا الموقع</li>
          <li>إعادة بيع المواد على هذا الموقع</li>
          <li>إنشاء أعمال مشتقة من المواد الموجودة على هذا الموقع</li>
        </ul>
        <p>يجوز لنا سحب هذا الإذن في أي وقت دون إشعارك.</p>
        <p>
          يجوز لنا حسب تقديرنا المطلق نشر المواد أو المعلومات التي ترسلها إلينا
          على موقع الويب هذا من أجل:
        </p>

        <ul>
          <li>المشاركة في المسابقات</li>
          <li>آراء شخصية حول الأفلام</li>
          <li>أي سبب آخر</li>
        </ul>

        <p>
          من خلال تقديم معلومات أو مواد لنا، فإنك تمنحنا ترخيصاً عالمياً لا رجعة
          عنه، دائماً، خالياً من الإتاوات وغير حصري، من أجل:
        </p>

        <ul>
          <li>
            إعادة إنتاج أو تعديل أو إعادة ترخيص أو إعادة توزيع أو تكييف أو إرسال
            أو نشر أو عرض هذه المعلومات
          </li>
          <li>المواد وإنشاء أعمال مشتقة منها</li>
          <li>إعادة ترخيص أي من الحقوق المنتهية صلاحيتها لأي طرف ثالث</li>
        </ul>

        <h4>الربط</h4>
        <p>لا يمكنك إنشاء رابط ثانوي للموقع ما لم نمنحك تصريح كتابي بذلك.</p>

        <h4>سلوك</h4>
        <p>في استخدام هذا الموقع الإلكتروني، يجب ألا:</p>
        <ul>
          <li>
            تقوم بتعطيل تشغيل أو أمان هذا الموقع أو أي حسابات أو خوادم أو شبكات
            متصلة أو يمكن الوصول إليها من خلال هذا الموقع
          </li>
          <li>
            استخدام موقع الويب هذا بطريقة قد تضايق أو تزعج أو تعطل أي شخص ثالث،
            بما في ذلك شخص ثالث قد يتلقى رسائل نتيجة لاستخدامك لهذا الموقع
          </li>
          <li>
            تقديم أي معلومات أو مواد غير قانونية من أي نوع، سواء كانت غير
            قانونية أو تهديدية أو مسيئة أو تشهيرية أو فاحشة أو فاضحة أو إباحية
            أو دنيئة أو غير لائقة، بما في ذلك على سبيل المثال بلا حصر، أي مادة
            تشكل سلوكاً مشجعاً أو تشجيعياً من شأنه أن يشكل جريمة جنائية أو يؤدي
            إلى مسؤولية مدنية أو غير ذلك تنتهك أي قانون معمول به؛ تقديم أي مواد
            من أي نوع تنتهك حقوق أي شخص آخر، بما في ذلك المواد التي تعد انتهاكاً
            لأي من حقوق الخصوصية المحمية بموجب حق المؤلف أو العلامة التجارية أو
            أي حقوق ملكية أخرى دون الحصول أولاً على إذن من المالك أو صاحب الحق
            المعني
          </li>
          <li>تقديم مواد من أي نوع تحتوي على فيروس أو أي مكون ضار آخر</li>
          <li>
            تعديل أو حذف أي محتوى على هذا الموقع أو إضافة أي محتوى إلى هذا
            الموقع؛
          </li>
          <li>محاولة الوصول بشكل غير مصرح به إلى أي جزء من هذا الموقع.</li>
        </ul>

        <p>
          نحن نحتفظ بالحق في التعاون الكامل مع أي سلطة قانونية في أي اختصاص
          قضائي فيما يتعلق بأي توجيه قانوني أو طلب الكشف عن الهوية أو أي معلومات
          أخرى تتعلق بأي شخص ينشر أي مواد تنتهك أي قانون سارٍ أو ذو صلة.
        </p>

        <h3>أمن ودقة المعلومات</h3>
        <p>قد يختلف الموقع من وقت لآخر.</p>
        <p>
          قد تتمكن من الوصول إلى مواقع الأطراف الثالثة من هذا الموقع. نحن لا
          نقدم أي إقرارات أو دعاوى فيما يتعلق بمحتوى هذه المواقع أو جودتها أو
          موثوقيتها، كما أن تضميننا لهذه الروابط لا يعني أننا نملك أي علاقة أو
          ارتباط بها.
        </p>

        <h4>كلمه السر</h4>
        <p>
          إذا قمت بالتسجيل في هذا الموقع، فقد يتم تزويدك بكلمة مرور. إذا تم
          تزويدك بكلمة مرور، فيجب عليك الحفاظ على سريتها وأمانها.
        </p>

        <h4>عام</h4>
        <p>
          واجب القانون المشترك للرعاية. نحن لا نفترض أي واجب قانوني مشترك
          للرعاية تجاهك في تقديم المعلومات على هذا الموقع.
        </p>

        <h4>النزاعات</h4>
        <p>
          أي نزاع بينك وبيننا سيتم تحديده بموجب قوانين المملكة العربية السعودية
          من قبل محاكم المملكة العربية السعودية.
        </p>
      </div>
    </div>
  </section>
</template>




<script>
export default {
  beforeCreate: function () {
    console.log('this,.langName :', this.langName)
    let pre = window.localStorage.getItem('PREIMERE')
    if (pre == null || pre == 'false' || pre == false) {
      document.body.className = 'img-section'
    } else {
      document.body.className = 'gold-img-section'
    }
  },
  mounted () {
    console.log('this.langName :', this.langName)
  },
}
</script>


<style scoped>
.footer {
  background-image: none !important;
}
</style>
