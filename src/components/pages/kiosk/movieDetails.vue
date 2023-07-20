<template>
  <div>
    <!----------- RULES OF ENTRY MODAL ---------->

    <div class="ruleofcountrymodal">
      <b-modal
        hide-header
        hide-footer
        hide-header-close
        ref="ruleOfCountry"
        id="ruleOfCountry"
        title=" "
        centered
        size="lg"
      >
        <div class="direction-ltr ruleofcountry px-3 py-2 text-dark">
          <h2 class="title h1">{{ $tc("RulesOfEntry") }}</h2>
          <div class="row py-4 mx-auto align-items-center">
            <div class="col-3 text-center text-md-right pr-md-0">
              <img
                :src="checkBaseUrl(showTerms.RatingImage)"
                height="60px"
                width="60px"
                alt="img"
              />
            </div>
            <div class="col-8">
              <h4 class="rule-warning mb-0 h4">{{ showTerms.Title }}</h4>
            </div>
          </div>

          <div
            class="rules-list w-75 mx-auto my-4"
            v-html="showTerms.Description"
          ></div>

          <div class="text-center mt-5">
            <div v-if="language_id == 'en'">
              <h6 class="title mb-0 h3">I agree to comply with the</h6>

              <div class="d-flex justify-content-center">
                <h5
                  class="p-2 text-danger font-weight-bold"
                  v-on:click="termsDetails = true"
                >
                  Terms & Conditions
                </h5>
                <h5 class="py-2">and</h5>
                <h5
                  class="p-2 text-danger font-weight-bold"
                  v-on:click="rulesDetail = true"
                >
                  House Rules
                </h5>
              </div>
            </div>
            <div v-else>
              <h6 class="title mb-0 h3">أوافق على الامتثال ل</h6>
              <p arabiccc class="h4 mt-2 mb-4">الشروط والأحكام وقواعد المنزل</p>

              <div class="d-flex justify-content-center">
                <h5
                  class="p-2 text-danger font-weight-bold"
                  v-on:click="termsDetailArabic = true"
                >
                  الشروط والأحكام
                </h5>
                <h5 class="py-2">و</h5>
                <h5
                  class="p-2 text-danger font-weight-bold"
                  v-on:click="rulesDetailArabic = true"
                >
                  قواعد المنزل
                </h5>
              </div>
            </div>

            <div class="col-10 mx-auto text-center">
              <div class="row">
                <div class="col-6">
                  <b-button
                    @click="onClickAgree()"
                    variant="default"
                    class="btn btn-green py-4"
                    >{{ $tc("IAgree") }}
                  </b-button>
                </div>

                <div class="col-6">
                  <b-button
                    @click="onClickCancel()"
                    variant="default"
                    class="btn btn-green py-4"
                    >{{ $tc("Cancel") }}
                  </b-button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </b-modal>
    </div>
    <!-- ERROR MODAL -->
    <b-modal
      ref="modal"
      id="modal-1"
      no-close-on-esc
      no-close-on-backdrop
      hide-header-close
      hide-footer
      hide-header
    >
      <p class="my-4 black text-center">{{ ErrorMessage }}</p>
      <div class="text-center">
        <b-button
          @click="$refs.modal.hide()"
          class="text-center mx-auto mt-3 btn-danger"
          >CLOSE</b-button
        >
      </div>
    </b-modal>
    <!-- ERROR MODAL ENDS-->

    <!-- SELECTED MOVIE INFO -->
    <div class="col-12 pb-4 mt-4" style="border-bottom: 2px solid #fff">
      <div class="row" v-if="Object.keys(movieDetails).length">
        <div class="col-4">
          <!-- <img src="@/assets/img/4.jpg" class="img-fluid rounded" /> -->
          <img
            v-lazy="
              checkBaseUrl(
                getLangSpecificAttribute(
                  movieDetails.altMovieContent,
                  getCurrentLang().brij_lang_id,
                  'artwork'
                ) || movieDetails.artwork
              )
            "
            class="img-fluid rounded"
          />
        </div>
        <div class="col-8" :class="language_id == 'ar' ? 'text-right' : ''">
          <h5 class="movie-name mb-3">
            {{
              getLangSpecificAttribute(
                movieDetails.altMovieContent,
                getCurrentLang().brij_lang_id,
                "mc_title"
              ) ||
                movieDetails.movie_title ||
                movieDetails.original_title_of_movie
            }}
            <span
              v-if="
                confirmedMovie.FormatArray.filter((x) => x.mf_id != '')
                  .map((x) => x.mf_name)
                  .join(', ').length
              "
              class="mFormat"
            >
              ({{
                confirmedMovie.FormatArray.filter((x) => x.mf_id != "")
                  .map((x) => x.mf_name)
                  .join(", ")
              }})
            </span>
          </h5>
          <div class="d-flex direction-ltr">
            <div class="h4">{{ movieDetails.rating }}</div>
            <div class="mx-3">&bull;</div>
            <div class="h4" v-if="movieDetails.genres_with_translations">
              {{
                movieDetails.genres_with_translations
                  .map((g) => g[getCurrentLang().iso_2.toLowerCase()] || g.key)
                  .join(", ")
              }}
            </div>
            <div class="mx-3">&bull;</div>
            <div class="h4">{{ movieDetails.mrrdr_runtime }} minutes</div>
            <div class="mx-3">&bull;</div>
            <div class="h4">{{ movieDetails.lang_name }}</div>
          </div>

          <div class="mb-4">
            <h4>{{ $tc("Synopsis") }}:</h4>
            <h5>
              {{
                getLangSpecificAttribute(
                  movieDetails.altMovieContent,
                  getCurrentLang().brij_lang_id,
                  "mc_plot"
                ) || movieDetails.mc_plot
              }}.
            </h5>
          </div>

          <div class="mb-4" v-if="cast">
            <h4>{{ $tc("Actors") }}:</h4>
            <h5>{{ cast }}</h5>
          </div>

          <div class="mb-4" v-if="director">
            <h4>{{ $tc("DirectedBy") }}</h4>
            <h5>{{ director }}</h5>
          </div>

          <div v-if="movieDetails.mrrdr_release_date">
            <h4>{{ $tc("ReleaseDate") }}</h4>
            <h5>{{ movieDetails.mrrdr_release_date }}</h5>
          </div>
        </div>
      </div>
    </div>

    <!-- SELECT DATE OPTION  -->
    <div class="col-12 py-4">
      <div class="h3 text-center font-weight-bold mb-4">
        {{ $tc("PICKADATE") }}
      </div>
      <!-- :dir="language_id === 'en' ? 'ltr' : 'rtl'" -->
      <div class="direction-ltr">
        <slick
          @afterChange="handleAfterChange"
          ref="dateSlider"
          :options="introSlide"
        >
          <div v-for="(date, dateIndex) in showDates" :key="dateIndex">
            <div @click="onSelectDate(date)">
              <div class="d-table mx-auto opacity">
                <div class="d-flex align-items-center">
                  <div class="date-number">
                    {{ moment(date.ss_actual_start_date).format("DD") }}
                  </div>
                  <div class="ml-3">
                    <div class="month">
                      {{ date.momthName }}
                      {{ moment(date.ss_actual_start_date).format("YYYY") }}
                    </div>
                    <div class="day">{{ date.dayName }}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </slick>
      </div>
    </div>

    <!-- SELECT FORMAT -->
    <div class="col-12 py-4" v-if="Object.keys(confirmedMovie).length">
      <div class="h3 text-center font-weight-bold mb-4">
        {{ $tc("FORMAT") }}
      </div>
      <ul class="format-list d-flex justify-content-center">
        <li
          v-for="(format, formatIndex) in confirmedMovie.FormatArray.filter(
            (x) => x.mf_id != ''
          )"
          :key="formatIndex"
          class="format"
          @click="onSelectFormat(format)"
          :class="
            selectedFormat && format.mf_name == selectedFormat.mf_name
              ? 'active'
              : ''
          "
        >
          {{ format.mf_name }}
        </li>
      </ul>
    </div>

    <!-- SELECT SHOW -->
    <!-- <div class="col-10 mx-auto py-5 dateSlide-arrow"> -->
    <div
      class="h3 text-center font-weight-bold"
      v-if="filteredFlattenedSchedule[0]"
    >
      {{ $tc("CHOOSEYOURSHOWTIME") }}
    </div>
    <!-- <slick ref="timeSlider" :options="dateSlide"> -->
    <div class="d-flex flex-wrap overflow_class">
      <div
        v-for="(schedule, showTimeIndex) in filteredFlattenedSchedule"
        :key="showTimeIndex"
        :class="
          selectedTime && selectedTime.ss_id == schedule.ss_id ? 'active' : ''
        "
        class="time-box"
        @click="onSelectShowTime(schedule)"
      >
        <div>
          <div class="text-center">
            <h4 class="font-weight-bold">
              {{ moment(schedule.showTime, ["HH.mm"]).format("hh:mm A") }}
            </h4>
            <div>
              {{ $tc("Available") }}<br /><span>{{
                schedule.screen_name
              }}</span>
            </div>
          </div>
        </div>
      </div>
      <template v-if="filteredFlattenedMidNightSchedule.length > 0">
        <div
          v-for="(schedule, showTimeIndex) in filteredFlattenedMidNightSchedule"
          :key="showTimeIndex"
          :class="
            selectedTime && selectedTime.ss_id == schedule.ss_id ? 'active' : ''
          "
          class="time-box"
          @click="onSelectShowTime(schedule)"
        >
          <div>
            <div class="text-center">
              <h4 class="font-weight-bold">
                {{ moment(schedule.showTime, ["HH.mm"]).format("hh:mm A") }}
                <span class="" style="font-size: 18px">({{ "Midnight" }})</span>
              </h4>
              <!-- <div class="text-center" style="font-size: 20px">
                {{ "After Midnight" }}
              </div> -->
              <div>
                {{ $tc("Available") }}<br /><span>{{
                  schedule.screen_name
                }}</span>
              </div>
            </div>
          </div>
        </div>
      </template>
    </div>
    <!-- </slick> -->

    <!-- </div> -->

    <router-link
      to
      @click.native="onClickProceed()"
      class="fixed-next"
      v-if="selectedTime"
    >
      <div class="btn-square-round">
        <div class="btn-content">
          <div>
            <div class="h2 font-weight-bold text-red">{{ $tc("Next") }}</div>
            <!-- <div class="h3 font-weight-bold">{{ $tc("SelectSeat") }}</div> -->
          </div>
        </div>
      </div>
    </router-link>

    <div>
      <div class="terms-modal" v-if="termsDetails">
        <div class="header">TERMS & CONDITIONS</div>
        <div class="btn-close" v-on:click="termsDetails = !termsDetails">
          &times;
        </div>
        <div class="content">
          <p class="font-weight-bold">
            Operator's and Consumer's Code of Conduct
          </p>
          <p>
            When using our website you must comply with the terms and conditions
            of use. We may change these terms and conditions over time, so
            please read them every time you use this website. By continuing to
            use this website, you accept the current terms and conditions of
            use. If you don't agree with these terms and conditions please
            refrain from using this website.
          </p>
          <p class="font-weight-bold">Cinema viewers obligations</p>
          <p class="font-weight-bold">Talking</p>
          <p>
            Viewers must refrain from talking or communicating in any manner
            that is disruptive to other viewers whilst the movie in playing.
            Please be considerate to your neighbor
          </p>
          <p class="font-weight-bold">Eating &amp; smoking</p>
          <ol type="1">
            <li>Eat and drink quietly to avoid disturbing other viewers</li>
            <li>Smoking is strictly prohibited within cinema complex</li>
            <li>
              Movie Recording&nbsp;Viewers are strictly prohibited from video
              recording or taking pictures of any trailer or movie within the
              cinema
            </li>
            <li>
              Movie Attendance&nbsp;Viewers are required to arrive on time to
              avoid disturbing other viewers
            </li>
          </ol>
          <p class="font-weight-bold">Seating &amp; Ticketing</p>
          <ol type="1">
            <li>
              Viewers are not allowed to place their feet or shoes on cinema
              seats
            </li>
            <li>
              Viewers must retain their ticket stub; failing to show a ticket
              upon request or sitting in an unassigned seat is prohibited
            </li>
            <li>
              Clothing&nbsp;Viewers must wear appropriate clothing and footwear
              that are aligned with KSA values and culture
            </li>
          </ol>
          <p class="font-weight-bold">Parenting</p>
          <ol type="1">
            <li>
              Viewers should ensure their children are not left unattended and
              should try to minimize noise and disruption
            </li>
            <li>Infants are not permitted inside theatres</li>
          </ol>
          <p class="font-weight-bold">Security</p>
          <ol type="1">
            <li>
              Cinema operator reserves the right to check your bags brought into
              the theatre
            </li>
          </ol>
          <p class="font-weight-bold">Other</p>
          <ol type="1">
            <li>
              Viewers should refrain from using any electronic devices
              (including phones, tablets or gaming devices and laser) during the
              movie
            </li>
            <li>Failing to follow instructions employees, is prohibited</li>
            <li>
              Viewers are not allowed to verbally or physically harass
              operator's employees
            </li>
          </ol>
          <p class="font-weight-bold">Operator's obligations towards viewers</p>
          <p>
            Venue condition
            <span
              >shall ensure their venues are maintained and in good
              condition</span
            >
          </p>
          <p class="font-weight-bold">
            Staffing
            <span class="font-weight-normal"
              >shall provide highly trained staff that are capable to manage and
              handle client inquiries, requests and complaints</span
            >
          </p>
          <p class="font-weight-bold">
            Movie selection
            <span class="font-weight-normal"
              >shall provide a variety of movies that cater to different
              consumers backgrounds, ages and preferences</span
            >
          </p>
          <p class="font-weight-bold">
            Ticket type availability
            <span class="font-weight-normal"
              >should aim to have different ticket pricing and that matches
              consumer needs</span
            >
          </p>
          <p class="font-weight-bold">
            Food &amp; Beverage
            <span class="font-weight-normal"
              >shall have for sale various food &amp; beverages</span
            >
          </p>
          <p class="font-weight-bold">Movie Experience</p>
          <ol type="1">
            <li>
              Operator should aim to provide quality experience by having cinema
              screens, seating, projectors and sound systems in line with
              international cinema standards
            </li>
            <li>
              Operator should start movies on time without any prolonged delays
            </li>
          </ol>
          <p class="font-weight-bold">Operator's obligations toward GCAM</p>
          <p class="font-weight-bold">Licensing</p>
          <ol type="1">
            <li>
              Operator shall abide by the standards, rules &amp; regulations
              mentioned in the licenses covering activity, duration etc.
            </li>
            <li>
              If any of the information contained in the license have changed
              after the issuance of the license, the related operator must
              inform GCAM of this change
            </li>
          </ol>
          <p class="font-weight-bold">Movie Rating</p>
          <ol type="1">
            <li>
              Operator shall abide by the rating set by GCAM for the related
              movies; rating must be showcased on the tickets, scheduling
              screens and any related advertising material
            </li>
            <li>
              Each cinema operator should have a copy of the film rating
              certificate from the distributor
            </li>
          </ol>
          <p class="font-weight-bold">
            Local production support
            <span class="font-weight-normal"
              >Operator shall ensure that sufficient locally produced movies are
              broadcasted within their venues to ensure the promotion and
              development of the local production industry</span
            >
          </p>
          <p class="font-weight-bold">
            Information provision
            <span class="font-weight-normal"
              >Operator shall at any time provide GCAM with any cinema related
              information and any other cinema related</span
            >
          </p>
          <p class="font-weight-bold">
            <span class="font-weight-normal"
              >Operator should cooperate with and facilitate the work of the
              field monitoring and control officers during their site
              visits</span
            >
          </p>
          <p class="font-weight-bold">
            Complaint management
            <span class="font-weight-normal"
              >Operator should channel any GCAM related complaint to GCAM
              customer service department in order to take the necessary
              actions</span
            >
          </p>
          <p class="font-weight-bold">
            Movie termination&nbsp;
            <span class="font-weight-normal"
              >Operator must terminate the exhibition of any movie deemed
              inappropriate by GCAM monitoring and control officers</span
            >
          </p>
          <p class="font-weight-bold">General Terms and Conditions</p>
          <p class="font-weight-bold">Returns Policy</p>
          <p>
            Movie tickets sold online for Empire Cinemas are done so on a no
            returns, exchange or cancellation basis. Refunds or complimentary
            passes will not be issued for incorrect selection of showtimes,
            dates, screening types (families or singles) ratings or movies.
            Please review your booking summary carefully and double check that
            the session and ticket information contained under the you have
            selected heading is correct, before proceeding to checkout. By
            completing your transaction and by clicking on the Purchase Now
            button, you agree to accept this policy.
          </p>
          <p class="font-weight-bold">Intellectual Property</p>
          <ol type="1">
            <li>
              Empire own all of the material on this website. This includes all
              text, designs, logos, graphics, computer programs, audio, video
              and code (including HTML) in any form. Unless stated otherwise in
              these terms and conditions of use, none of the material on this
              website may be reproduced, downloaded, distributed, copied,
              republished, displayed or transmitted in any form whatsoever
              without our written permission. We grant you permission to view
              this website with a web browser provided that you do not:
            </li>
            <li>Modify the material on this website;</li>
            <li>Resell the material on this website; or</li>
            <li>Create derivative works from the material on this website.</li>
            <li>
              We may withdraw this permission at any time without notice to you.
            </li>
            <li>
              We may in our absolute discretion publish on this website material
              or information that you submit to us for:
            </li>
            <li>Participation in competitions</li>
            <li>A personal film review</li>
            <li>Any other reason</li>
            <li>
              By submitting information or material to us you grant to us an
              irrevocable, perpetual, royalty-free, non-exclusive, worldwide
              license to:
            </li>
            <li>
              Use, reproduce, modify, sublicense, redistribute, adapt, transmit,
              publish, broadcast and display that information or
            </li>
            <li>Material and create derivative works from it;</li>
            <li>Sublicense any of the forgoing rights to third parties.</li>
          </ol>
          <p class="font-weight-bold">Linking</p>
          <p>
            You must not create a hyperlink to this web site unless we give you
            our express permission in writing.
          </p>
          <p class="font-weight-bold">Conduct</p>
          <p class="font-weight-bold">In using this web site, you must not:</p>
          <ol type="1">
            <li>
              Disrupt the operation or security of this website or any accounts,
              servers, or networks connected or accessible through this website;
            </li>
            <li>
              Use this website in a way that may harass, annoy or disrupt any
              third person, including a third person who may receive messages as
              a result of your use of this website;
            </li>
            <li>
              Submit any unlawful, threatening, abusive, defamatory, obscene,
              vulgar, pornographic, profane or indecent information or material
              of any kind, including without limitation any material
              constituting or encouraging conduct that would constitute a
              criminal offence, give rise to civil liability or otherwise
              violate any applicable law; submit any material of any kind which
              violates or infringes the rights of any other person, including
              material which is an invasion of any privacy rights, which is
              protected by copyright, trade mark or any other proprietary right
              without first obtaining the permission of the owner or relevant
              right holder;
            </li>
            <li>
              Submit any material of any kind which contains a virus or other
              harmful component;
            </li>
            <li>
              Modify or delete any content on this website or add any content to
              this website; or
            </li>
            <li>
              Attempt to gain unauthorised access to any part of this web site.
            </li>
            <li>
              We reserve the right to cooperate fully with any law enforcement
              authority in any jurisdiction in respect of any lawful direction
              or request to disclose the identity or other information in
              respect of anyone posting any materials which violate any
              applicable or relevant law.
            </li>
          </ol>
          <p class="font-weight-bold">Security and Accuracy of Information</p>
          <ol type="1">
            <li>This web site may vary from time to time.</li>
          </ol>
          <p class="font-weight-bold">Third party sites</p>
          <p>
            You may be able to access third party sites from this website. We do
            not make any representations or claims in relation to the content,
            quality, or reliability of these sites, and our inclusion of a link
            to them does not imply that we have any relationship or affiliation
            with them.
          </p>
          <p class="font-weight-bold">Password</p>
          <p>
            If you register with this website, you may be provided with a
            password. If you are provided with a password, you must keep it
            secret and secure.
          </p>
          <p class="font-weight-bold">General</p>
          <p>
            Common law duty of care. We do not assume any common law duty of
            care towards you in providing the information on this website.
          </p>
          <p class="font-weight-bold">Disputes</p>
          <p>
            Any dispute between you and us will be determined under the laws of
            the Kingdom of Saudi Arabia by the courts of the Kingdom of Saudi
            Arabia.
          </p>
          <p class="font-weight-bold">© 2019. All rights reserved.</p>
        </div>
      </div>

      <div
        class="terms-modal"
        v-if="termsDetailArabic"
        :style="termsDetailArabic ? 'text-align:right' : ''"
      >
        <div class="header">الشروط والاحكام</div>
        <div
          class="btn-close"
          v-on:click="termsDetailArabic = !termsDetailArabic"
        >
          &times;
        </div>
        <div class="content">
          <p class="font-weight-bold">
            مدونة قواعد السلوك الخاصة بالمشغل والمُشاهد
          </p>
          <p>
            عند استخدام الموقع الإلكتروني، يجب أن تمتثل لشروط وأحكام الاستخدام.
            وقد نُغير الشروط والأحكام من وقت لآخر؛ لذا يرجى قراءة الشروط
            والأحكام في كل مرة تستخدم الموقع الإلكتروني لضمان اطلاعك على مستجدات
            الشروط والأحكام. وباستمرار استخدام الموقع الإلكتروني، فأنت تقبل شروط
            وأحكام الاستخدام الحالية. وإذا لم توافق على الشروط والأحكام، فيجب
            عليك عدم استخدام الموقع الإلكتروني.
          </p>
          <p class="font-weight-bold">التزامات المشاهد</p>
          <p>
            الصوت المرتفع: المحافظة على الهدوء وتجنب الكلام بصوت مرتفع مما قد
            يسبب من إزعاج للمشاهدين الآخرين
          </p>
          <p>تناول الطعام والتدخين</p>
          <p>
            الحرص على تناول الطعام بصوت منخفض ومن دون إحداث فوضى مما قد يثير
            ازعاج المشاهدين الآخرين
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
            يتعين على المشاهد ملازمة أطفاله ومحاولة التقليل من الإزعاج قدر
            الإمكان (مثل البكاء، والكلام بصوت مرتفع، والركض، وما نحوه.)
          </p>
          <p>يمنع اصطحاب الأطفال الرضع داخل دور السينما.</p>
          <p>الأمن والسلامة</p>
          <p>
            يحظّر إحضار أو إظهار أو استخدام أي أسلحة حقيقية أو غير حقيقية مهما
            كان نوعها
          </p>
          <p>
            لدى مشغل السينما حق التحقق من الحقائب التي يتم إدخالها إلى صالة
            العرض
          </p>
          <p>غير ذلك</p>
          <p>
            الابتعاد عن استخدام أي أجهزة الكترونية (بما في ذلك الهواتف، أو
            الأجهزة اللوحية، أو أجهزة الألعاب، أو الليزر) أثناء عرض الفيلم
          </p>
          <p>
            يجب التقيد بالتعليمات ويمنع تماماً التعرض لأي من موظفي دور العرض
            سواء شفهياً أو جسدياً
          </p>
          <p class="font-weight-bold">التزامات المشغل تجاه المشاهد</p>
          <p>تجربة مشاهدة الأفلام</p>
          <p>
            توفير تجربة نوعية للمشاهد من خلال توفير أنظمة صوتية، وأجهزة عرض،
            ومقاعد، وشاشات تتماشى مع المعايير الدولية للسينما
          </p>
          <p>عرض الأفلام بالوقت المحدد من دون أي تأخير رئيسي</p>
          <p class="font-weight-bold">
            التزامات المشغل تجاه الهيئة العامة للإعلام المرئي والمسموع
          </p>
          <p>الترخيص</p>
          <p>
            الامتثال للمعايير، والقواعد، والأنظمة المنصوص عليها في التراخيص مما
            تشمل الأنشطة والفترة الزمنية وما نحوه
          </p>
          <p>
            في حال حدوث أي تغييرات على المعلومات الواردة في الترخيص بعد إصدارها،
            يتعين على المشغل المعني تبليغ الهيئة العام للإعلام المرئي والمسموع
            بهذا التغيير
          </p>
          <p>تصنيف الأفلام</p>
          <p>
            التقيد بالتصنيف الصادر من الهيئة العامة للإعلام المرئي والمسموع ويجب
            أن يكون التصنيف موضح على التذاكر، وشاشات جداول عرض الأفلام، وغيرها
            من الدعايات ذات الصلة
          </p>
          <p>يحب على كل مشغل امتلاك نسخة من شهادة تصنيف الفيلم من الموزع</p>
          <p class="font-weight-bold">الشروط والأحكام العامة</p>
          <p class="font-weight-bold">سياسة الارجاع</p>
          <p>
            تذاكر الأفلام التي يتم بيعها عبر الإنترنت لامبير سينما، غير قابلة
            للاسترجاع، الاستبدال أو الإلغاء. لن يتم رد أي مبالغ خاصة بالحجز أو
            إصدار تذاكر مجانية بسبب اختيار غير صحيح لأوقات العرض، التواريخ،
            أنواع التذاكر (عائلات أو أفراد)، تصنيف الأفلام أو الأفلام. يرجى
            مراجعة ملخص الحجز الخاص بك بعناية والتحقق من أن معلومات العرض
            والتذكرة المضمنة تحت عنوان "اختر التذاكر" صحيحة، قبل المتابعة إلى
            الدفع والخروج. عند إكمال المعاملة الخاصة بك والنقر فوق زر "الشراء
            الآن"، فأنت توافق على قبول هذه السياسة.
          </p>
          <p class="font-weight-bold">التسجيل</p>
          <p>
            عند التسجيل، سنطلب منك بعض التفاصيل الشخصية. قد نطلب من وقت لآخر
            معلومات إضافية للمسابقات وما إلى ذلك. إن خصوصيتك تهمنا ولن نمرر أي
            معلومات عنك مع أي طرف ثالث ما لم تعطنا تصريح كتابي للقيام بذلك.
          </p>
          <p class="font-weight-bold">الملكية الفكرية</p>
          <p>ما نسمح لك القيام به / عدم القيام به</p>
          <p>
            نحن نملك كل محتوى هذا الموقع. وهذا يشمل جميع النصوص والتصاميم
            والشعارات والرسوم البيانية وبرامج الكمبيوتر والصوت والفيديو والكود
            (بما في ذلك HTML) في أي شكل. إلا في حال نص على خلاف ذلك في الشروط
            والأحكام المذكورة، لا يجوز إعادة إنتاج أي من المواد الموجودة على هذا
            الموقع أو تنزيلها أو توزيعها أو نسخها أو إعادة نشرها أو عرضها أو
            نقلها بأي شكل من الأشكال دون تصريح كتابي منا. نحن نمنحك الإذن بعرض
            هذا الموقع من خلال متصفحات الانترنت بشرط ألا تقوم بما يلي:
          </p>
          <p>تعديل المواد على هذا الموقع؛</p>
          <p>إعادة بيع المواد على هذا الموقع؛ أو</p>
          <p>إنشاء أعمال مشتقة من المواد الموجودة على هذا الموقع.</p>
          <p>يجوز لنا سحب هذا الإذن في أي وقت دون إشعارك.</p>
          <p>
            يجوز لنا حسب تقديرنا المطلق نشر المواد أو المعلومات التي ترسلها
            إلينا على موقع الويب هذا من أجل:
          </p>
          <p>المشاركة في المسابقات</p>
          <p>آراء شخصية حول الأفلام</p>
          <p>أي سبب آخر</p>
          <p>
            من خلال تقديم معلومات أو مواد لنا، فإنك تمنحنا ترخيصاً عالمياً لا
            رجعة عنه، دائماً، خالياً من الإتاوات وغير حصري، من أجل:
          </p>
          <p>
            إعادة إنتاج أو تعديل أو إعادة ترخيص أو إعادة توزيع أو تكييف أو إرسال
            أو نشر أو عرض هذه المعلومات أو
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
            استخدام موقع الويب هذا بطريقة قد تضايق أو تزعج أو تعطل أي شخص ثالث،
            بما في ذلك شخص ثالث قد يتلقى رسائل نتيجة لاستخدامك لهذا الموقع؛
          </p>
          <p>
            تقديم أي معلومات أو مواد غير قانونية من أي نوع، سواء كانت غير
            قانونية أو تهديدية أو مسيئة أو تشهيرية أو فاحشة أو فاضحة أو إباحية
            أو دنيئة أو غير لائقة، بما في ذلك على سبيل المثال بلا حصر، أي مادة
            تشكل سلوكاً مشجعاً أو تشجيعياً من شأنه أن يشكل جريمة جنائية أو يؤدي
            إلى مسؤولية مدنية أو غير ذلك تنتهك أي قانون معمول به؛ تقديم أي مواد
            من أي نوع تنتهك حقوق أي شخص آخر، بما في ذلك المواد التي تعد انتهاكاً
            لأي من حقوق الخصوصية المحمية بموجب حق المؤلف أو العلامة التجارية أو
            أي حقوق ملكية أخرى دون الحصول أولاً على إذن من المالك أو صاحب الحق
            المعني؛
          </p>
          <p>تقديم مواد من أي نوع تحتوي على فيروس أو أي مكون ضار آخر؛</p>
          <p>
            تعديل أو حذف أي محتوى على هذا الموقع أو إضافة أي محتوى إلى هذا
            الموقع؛ أو
          </p>
          <p>محاولة الوصول بشكل غير مصرح به إلى أي جزء من هذا الموقع.</p>
          <p>
            نحن نحتفظ بالحق في التعاون الكامل مع أي سلطة قانونية في أي اختصاص
            قضائي فيما يتعلق بأي توجيه قانوني أو طلب الكشف عن الهوية أو أي
            معلومات أخرى تتعلق بأي شخص ينشر أي مواد تنتهك أي قانون سارٍ أو ذو
            صلة.
          </p>
          <p class="font-weight-bold">أمن ودقة المعلومات</p>
          <p>قد يختلف الموقع من وقت لآخر.</p>
          <p class="font-weight-bold">مواقع الطرف الثالث</p>
          <p>
            قد تتمكن من الوصول إلى مواقع الأطراف الثالثة من هذا الموقع. نحن لا
            نقدم أي إقرارات أو دعاوى فيما يتعلق بمحتوى هذه المواقع أو جودتها أو
            موثوقيتها، كما أن تضميننا لهذه الروابط لا يعني أننا نملك أي علاقة أو
            ارتباط بها.
          </p>
          <p class="font-weight-bold">كلمه السر</p>
          <p>
            إذا قمت بالتسجيل في هذا الموقع، فقد يتم تزويدك بكلمة مرور. إذا تم
            تزويدك بكلمة مرور، فيجب عليك الحفاظ على سريتها وأمانها.
          </p>
          <p class="font-weight-bold">عام</p>
          <p>
            واجب القانون المشترك للرعاية. نحن لا نفترض أي واجب قانوني مشترك
            للرعاية تجاهك في تقديم المعلومات على هذا الموقع.
          </p>
          <p class="font-weight-bold">النزاعات</p>
          <p>
            أي نزاع بينك وبيننا سيتم تحديده بموجب قوانين المملكة العربية
            السعودية من قبل محاكم المملكة العربية السعودية.
          </p>
        </div>
      </div>

      <div class="rulesDetail-modal" v-if="rulesDetail">
        <div class="header">Empire Cinema Rules</div>
        <div class="btn-close" v-on:click="rulesDetail = !rulesDetail">
          &times;
        </div>
        <div class="content">
          <p>In the cinema:</p>
          <p>
            All customers must have a valid cinema ticket for their movie
            screening. Children under 3 years are not permitted in the cinema.
          </p>
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
            <li>
              To ask for an ID of a customer if the movie rating has established
              a certain age limit or to determine whether the customer is
              eligible for a discount ticket
            </li>
            <li>
              To refuse to sell cinema tickets to a person whose age is under
              the limit established by the movie rating, even if the person is
              accompanied by an adult;
            </li>
            <li>
              To reject the admit of children below the age of 3 years old to
              family films, even if they sit on the lap of a parent or guardian
              who has a valid adult ticket during the entire screening
            </li>
            <li>All show times are subject to change without prior notice</li>
            <li>
              All movie ratings are subject to censorship and rated by GCAM
            </li>
          </ul>
          <p>© 2019. All rights reserved.</p>
        </div>
      </div>

      <div class="terms-modal" v-if="rulesDetailArabic">
        <div class="header">الأنظمة الخاصة امباير سينما</div>
        <div
          class="btn-close"
          v-on:click="rulesDetailArabic = !rulesDetailArabic"
        >
          &times;
        </div>
        <div class="content text-right">
          <p>الأنظمة والسياسات الداخلية للسينما</p>
          <p>داخل السينما:</p>
          <ul>
            <li>
              يجب أن يكون لدى الجميع تذكرة سينما سارية المفعول لمشاهدة أفلامهم.
              لا يُسمح للأطفال الذين تقل أعمارهم عن 3 سنوات بالدخول إلى السينما.
            </li>
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
            <li>
              طلب بطاقة هوية الزائر في حال تم تصنيف الفيلم تحت حدًا عمريًا
              معينًا أو لتحديد ما إذا كان الزائر مؤهلاً للحصول على تذكرة خصم
            </li>
            <li>
              رفض بيع تذاكر السينما لشخص يكون عمره أقل من الحد المحدد في تصنيف
              الفيلم، حتى لو كان الشخص برفقة شخص بالغ.
            </li>
            <li>
              رفض قبول الأطفال دون سن الثالثة في الأفلام العائلية، حتى وإن كانوا
              جالسين على حِجْر أحد الوالدين أو الوصي الذي لديه تذكرة دخول صالحة
              للبالغين خلال العرض بأكمله.
            </li>
            <li>تخضع جميع أوقات العرض للتغيير دون إشعار مسبق.</li>
            <li>
              تخضع جميع تقييمات الأفلام للرقابة ويتم تصنيفها من قبل الهيئة
              العامة للإعلام المرئي والمسموع.
            </li>
          </ul>
          <p>© 2019. كل الحقوق محفوظة. .</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { makeRequestBrij } from "@/helper/internet.js";
import movieService from "@/services/movieService.js";
import scheduleService from "@/services/scheduleService.js";
import moment from "moment";
import { BASEURL } from "@/config/index.js";

export default {
  data() {
    return {
      termsDetails: false,
      termsDetailArabic: false,
      rulesDetail: false,
      rulesDetailArabic: false,
      modalJson: [],

      paraJson: "",
      URLBASE: BASEURL,
      movieId: null,
      ErrorMessage: "Something went wrong",
      movieDetails: {},
      showDates: [],
      showTimings: [],
      selectedDate: {},
      selectedTime: null,
      selectedFormat: null,
      ar_daysInWeek: [
        "الأحد",
        "الاثنین",
        "الثلاثاء",
        "الاربعاء",
        "الخمیس",
        "الجمعة",
        "السبت",
      ],
      daysInWeek: [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ],
      ar_months: [
        "ینایر",
        "فبرایر",
        "مارس",
        "أبریل",
        "مایو",
        "یونیو",
        "یولیو",
        "أغسطس",
        "سبتمبر",
        "أكتوبر",
        "نوفمبر",
        "دیسمبر",
      ],
      months: [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ],

      get language_id() {
        return localStorage.getItem("language_id") || "en";
      },

      introSlide: {
        infinite: false,
        fade: false,
        centerMode: true,
        centerPadding: "20%",
        slidesToShow: 1,
        slidesToScroll: 1,
        dots: false,
        arrows: true,
      },

      dateSlide: {
        infinite: false,
        arrows: true,
        slidesToShow: 5,
      },
      // language_id:'en',
      selectedExpValues: [],
      confirmedMovie: {
        status: true,
        message: "Records Fetched",
        Records: { data: [], pagination: {} },
        VersionNameArray: [],
        sessions: [],
        MovieListArray: [{ CinemaList: [] }],
        MovieListArrayNew: [{ CinemaList: [] }],
        FormatArray: [],
        CinemaArray: [],
        LanguageArray: [],
        dateList: [],
        disable_date_list: [],
        isShowScreening: true,
        TypeList: [],
        FilterData: [],
      },
      BrijDates: [],
      dateList: [],
      BrijScheduled: [],
      BrijMidNightScheduled: [],
      flattenSchedule: [],
      flattenMidNightSchedule: [],
      cast: "",
      director: "",
      screen_id: "",
      md_id: "",
      ss_id: "",
      showTerms: {
        Description: "",
        Title: "",
        rated: "",
        RatingImage: "",
      },
    };
  },
  computed: {
    filteredFlattenedSchedule() {
      let filtered = JSON.parse(JSON.stringify(this.BrijScheduled));
      let mf_ids = this.selectedFormat ? [this.selectedFormat.mf_id] : [];

      filtered = filtered
        .filter((x) => {
          if (
            mf_ids.length === 0 ||
            x.schedules.length === 0 ||
            x.mf_ids.length === 0
          )
            return true;

          return x.mf_ids.some((x) => mf_ids.includes(x));
        })
        .filter((x) => x.schedules.length > 0);

      filtered.forEach((s) => {
        let { mf_ids, mf_names, movie_ids } = s;
        s.schedules.forEach((sch) => {
          sch.mf_ids = mf_ids;
          sch.mf_names = mf_names;
          sch.movie_ids = movie_ids;
        });
      });

      return filtered.flatMap((x) => x.schedules);
    },
    filteredFlattenedMidNightSchedule() {
      let filtered = JSON.parse(JSON.stringify(this.BrijMidNightScheduled));
      let mf_ids = this.selectedFormat ? [this.selectedFormat.mf_id] : [];

      filtered = filtered
        .filter((x) => {
          if (
            mf_ids.length === 0 ||
            x.schedules.length === 0 ||
            x.mf_ids.length === 0
          )
            return true;

          return x.mf_ids.some((x) => mf_ids.includes(x));
        })
        .filter((x) => x.schedules.length > 0);

      filtered.forEach((s) => {
        let { mf_ids, mf_names, movie_ids } = s;
        s.schedules.forEach((sch) => {
          sch.mf_ids = mf_ids;
          sch.mf_names = mf_names;
          sch.movie_ids = movie_ids;
        });
      });

      return filtered.flatMap((x) => x.schedules);
    },
  },
  beforeMount() {
    this.language_id = window.localStorage.getItem("language_id");
    const { FilmCommonCode } = this.$route.params;
    // this.getMovieDetails(FilmCommonCode)
    this.getAllMovieDetailsBrij();
    this.getShowDates().then((date) => {
      this.getConfirmedList(date ? date.ss_actual_start_date : undefined);
    });
  },
  methods: {
    moment,
    /* transpiled from, Ref: https://stackoverflow.com/a/64489535
    const groupByToMap = <T, Q>(array: T[], predicate: (value: T, index: number, array: T[]) => Q) =>
      array.reduce((map, value, index, array) => {
        const key = predicate(value, index, array);
        map.get(key)?.push(value) ?? map.set(key, [value]);
        return map;
      }, new Map<Q, T[]>());
    */
    groupByToMap(arr = [], predicate = (x) => x) {
      // magic starts :)

      let grouped = arr.reduce((map, value, index, array) => {
        const key = predicate(value, index, array);
        // var _a, _b
        // (_b = (_a = map.get(key)) === null || _a === void 0 ? void 0 : _a.push(value)) !== null && _b !== void 0 ? _b : map.set(key, [value])
        if (map.get(key)) {
          map.get(key).push(value);
        } else {
          map.set(key, [value]);
        }

        return map;
      }, new Map());
      return grouped;
    },
    handleAfterChange(event, slick, currentSlide) {
      // console.log("handleAfterChange", event, slick, currentSlide);
      // console.log('this.showDates :', this.showDates[currentSlide]);
      this.selectedDate = this.showDates[currentSlide];
      // this.getShowTimings(this.selectedDate)
      this.getConfirmedList(
        this.showDates[currentSlide]
          ? this.showDates[currentSlide].ss_actual_start_date
          : undefined
      );
    },
    getAllMovieDetailsBrij() {
      const { FilmCommonCode } = this.$route.params;
      localStorage.setItem("director", "");
      makeRequestBrij(
        `/api/cinema/movie-detail/${FilmCommonCode}/1/`,
        "GET",
        null,
        null
      )
        .then((response) => {
          const { error, res } = response;
          if (res.data.status && res.data.Records.length > 0) {
            this.movieDetails = res.data.Records[0];

            this.$forceUpdate();
            if (
              this.movieDetails &&
              this.movieDetails.castCrewDetails &&
              this.movieDetails.castCrewDetails.length > 0
            ) {
              let director = this.movieDetails.castCrewDetails
                .filter((c) => c.crew_title == "Director")
                .flatMap((c) => c.Crew.flatMap((x) => x.mcc_cast_name));

              if (director.length > 0) {
                console.log({ director });
                this.director = director.join(", ");
                localStorage.setItem("director", this.director);
              }
              let cast = this.movieDetails.castCrewDetails
                .filter((c) => c.crew_title == "Actor")
                .flatMap((c) => c.Crew.flatMap((x) => x.mcc_cast_name));

              if (cast.length > 0) {
                console.log({ cast });
                this.cast = cast.join(", ");
              }
            }
          }

          if (error) {
            this.$refs.modal.show();
          }
        })
        .catch(() => {
          this.$refs.modal.show();
        });
    },
    getConfirmedList(fromDate = null) {
      const { FilmCommonCode: movie_id } = this.$route.params;

      if (fromDate) this.showLoading();
      let payload = {};

      if (fromDate && moment(fromDate).isValid()) {
        payload.fromDate = moment(fromDate).format("YYYY-MM-DD");
      }

      this.BrijDates = [];

      makeRequestBrij(
        `/api/cinema/admin/movie-confirmed-list/${movie_id}`,
        "GET",
        null,
        payload
      )
        .then((response) => {
          const { error, res } = response;

          if (res.data.status) {
            this.confirmedMovie = res.data;
            this.selectedFormat = this.confirmedMovie.FormatArray.filter(
              (x) => x.mf_id != ""
            )[0];

            let confirmedMovie = res.data;
            let flattenSchedule = [];
            let flattenMidNightSchedule = [];
            // let flattenScheduleEntries = null
            let flattenSchedulegroupByToMap = null;
            let flattenMidNightSchedulegroupByToMap = null;

            confirmedMovie.MovieListArrayNew.forEach((m) => {
              m.CinemaList.forEach((c) => {
                let { format_list = [], ...cinema } = c;

                format_list.forEach((f) => {
                  let { screens = [], ...movieversion } = f;

                  screens.forEach((scr) => {
                    let {
                      schedule_list = [],
                      midnight_schedule_array = [],
                      ...screen
                    } = scr;

                    schedule_list.forEach((sh) => {
                      flattenSchedule.push({
                        ...cinema,
                        ...movieversion,
                        ...screen,
                        cinema,
                        movieversion,
                        screen,
                        ...sh,
                      });
                    });

                    midnight_schedule_array.forEach((sh) => {
                      flattenMidNightSchedule.push({
                        ...cinema,
                        ...movieversion,
                        ...screen,
                        cinema,
                        movieversion,
                        screen,
                        ...sh,
                      });
                    });
                  });
                });
              });
            });

            flattenSchedulegroupByToMap = new Map(
              this.groupByToMap(flattenSchedule, (x) =>
                JSON.stringify({ cinema_id: x.cinema_id, md_id: x.md_id })
              )
            );

            flattenMidNightSchedulegroupByToMap = new Map(
              this.groupByToMap(flattenMidNightSchedule, (x) =>
                JSON.stringify({ cinema_id: x.cinema_id, md_id: x.md_id })
              )
            );
            // flattenScheduleEntries = new Map(this.groupByToMap(flattenSchedule, x => (JSON.stringify({cinema: x.cinema_id, md_id: x.md_id})))).entries()
            this.flattenSchedule = flattenSchedulegroupByToMap;
            this.flattenMidNightSchedule = flattenMidNightSchedulegroupByToMap;

            let groupedShowsByMd = [];
            let groupedMidNightShowsByMd = [];
            for (const [key, value] of flattenSchedulegroupByToMap) {
              let cinema = JSON.parse(String(key));
              let shows = [...value];
              // console.log({cinema, shows})
              groupedShowsByMd.push({
                ...cinema,
                schedules: shows,
              });
            }

            for (const [key, value] of flattenMidNightSchedulegroupByToMap) {
              let cinema = JSON.parse(String(key));
              let shows = [...value];
              // console.log({cinema, shows})
              groupedMidNightShowsByMd.push({
                ...cinema,
                schedules: shows,
              });
            }

            groupedShowsByMd.map((x) => {
              x.mf_names = [...new Set(x.schedules.map((m) => m.mf_name))]
                .filter((x) => !!x)
                .join(",");
              x.mf_ids = [...new Set(x.schedules.map((m) => m.mf_id))].filter(
                (x) => !!x
              );
              x.movie_ids = [
                ...new Set(x.schedules.map((m) => m.movie_id)),
              ].filter((x) => !!x);
              return x;
            });

            groupedMidNightShowsByMd.map((x) => {
              x.mf_names = [...new Set(x.schedules.map((m) => m.mf_name))]
                .filter((x) => !!x)
                .join(",");
              x.mf_ids = [...new Set(x.schedules.map((m) => m.mf_id))].filter(
                (x) => !!x
              );
              x.movie_ids = [
                ...new Set(x.schedules.map((m) => m.movie_id)),
              ].filter((x) => !!x);
              return x;
            });

            // console.log({
            //   flattenSchedule,
            //   flattenSchedulegroupByToMap,
            //   flattenScheduleEntries,
            //   groupedShowsByMd
            // })
            this.BrijScheduled = groupedShowsByMd;
            this.BrijMidNightScheduled = groupedMidNightShowsByMd;
          }

          this.$forceUpdate();
        })
        .catch(() => {
          this.$refs.modal.show();
          this.confirmedMovie = {};
          if (this.showDates.length === 0) {
            this.showDates = [];
          }
        })
        .finally(() => {
          if (fromDate) this.hideLoading();
        });
    },
    getShowDates() {
      const { FilmCommonCode: movie_id } = this.$route.params;
      this.BrijDates = [];

      return makeRequestBrij(
        `/api/cinema/admin/movie-confirmed-list/${movie_id}`,
        "GET",
        null,
        {}
      )
        .then((response) => {
          const { error, res } = response;
          if (res.data.status) {
            this.showDates = response.res.data.dateList;

            this.$refs.dateSlider.destroy();
            this.$nextTick(() => {
              this.$refs.dateSlider.create();
              this.$refs.dateSlider.goTo(0, true);
            });
          }

          return this.showDates[0];
        })
        .catch(() => {
          if (this.showDates.length === 0) {
            this.showDates = [];
          }

          return null;
        });
    },
    getMovieDetails: function(FilmCommonCode) {
      let payload = {
        movie_id: FilmCommonCode,
      };
      movieService
        .getMovieDetails(payload)
        .then((response) => {
          const { data } = response;
          if (data && data.status) {
            this.movieDetails = data.data;
            this.language_id = window.localStorage.getItem("language_id"); // this.$cookie.get("language_id");
            console.log("language_id :", this.language_id);
            if (this.movieDetails && this.movieDetails.formatList.length > 0) {
              // ENG DATA
              if (this.language_id == "en") {
                if (this.movieDetails.Certificate == "G") {
                  this.modalJson = [
                    "I understand this movie is rated G.",
                    "All ages allowed to watch the movie.",
                    "Outside food and drink is not allowed in the cinema.",
                  ];
                  this.paraJson =
                    "The following content is suitable for all age groups";
                } else if (this.movieDetails.Certificate == "PG") {
                  this.modalJson = [
                    "I understand this movie is rated PG.",
                    "Children under the age of 3 will not be permitted into the cinema.",
                    "Outside food and drink is not allowed in the cinema.",
                  ];
                  this.paraJson =
                    "Parental guidance is advised for viewers below the age of 12";
                } else if (
                  this.movieDetails.Certificate == "PG12" ||
                  this.movieDetails.Certificate == "PG-12"
                ) {
                  this.modalJson = [
                    "I understand this movie is rated PG12.",
                    "Guests under the age of 12 must be accompanied by a guardian.",
                    "Children under the age of 3 will not be permitted into the cinema.",
                    "Outside food and drink is not allowed in the cinema.",
                  ];
                  this.paraJson =
                    "Parental guidance is must for viewers under the age of 12";
                } else if (
                  this.movieDetails.Certificate == "R12" ||
                  this.movieDetails.Certificate == "R-12"
                ) {
                  this.modalJson = [
                    "I understand this movie is rated R12.",
                    "No one below the age of 12 will be permitted.",
                    "You must show your I.D.",
                    "Outside food and drink is not allowed in the cinema.",
                  ];
                  this.paraJson =
                    "The following content is prohibited for viewers below the age of 12";
                } else if (
                  this.movieDetails.Certificate == "R15" ||
                  this.movieDetails.Certificate == "R-15"
                ) {
                  this.modalJson = [
                    "I understand this movie is rated R15.",
                    "No one below the age of 15 will be permitted.",
                    "You must show your I.D.",
                    "Outside food and drink is not allowed in the cinema",
                  ];
                  this.paraJson =
                    "The following content is prohibited for viewers below the age of 12";
                } else if (
                  this.movieDetails.Certificate == "R18" ||
                  this.movieDetails.Certificate == "R-18"
                ) {
                  this.modalJson = [
                    "I understand this movie is rated R18.",
                    "No one below the age of 18 will be permitted.",
                    "You must show your I.D.",
                    "Outside food and drink is not allowed in the cinema.",
                  ];
                  this.paraJson =
                    "The following content is prohibited for viewers below the age of 18";
                }
              } else if (this.language_id == "ar") {
                if (this.movieDetails.Certificate == "G") {
                  this.modalJson = [
                    "Gاتفهم ان التصنيف العمري للفيلم هو",
                    "لن يُسمح بدخول الأطفال تحت سن ال3 الى السينما.",
                    "لا يسمح بإدخال الأطعمة والمشروبات المشتراة من الخارج الى داخل السينما.",
                    "أوافق على الشروط والاحكام & السياسة الداخلية للسينما.",
                  ];
                  this.paraJson = " مناسب لجميع الاعمارG";
                } else if (this.movieDetails.Certificate == "PG") {
                  this.modalJson = [
                    " ينصح بالإشراف العائلي لمن هم تحت سن ال12PG",
                    "لن يُسمح بدخول الأطفال تحت سن ال3 الى السينما.",
                    "لا يسمح بإدخال الأطعمة والمشروبات المشتراة من الخارج الى داخل السينما.",
                    "أوافق على الشروط والاحكام & السياسة الداخلية للسينما.",
                  ];
                  this.paraJson = " ينصح بالإشراف العائلي لمن هم تحت سن ال12PG";
                } else if (
                  this.movieDetails.Certificate == "PG12" ||
                  this.movieDetails.Certificate == "PG-12"
                ) {
                  this.modalJson = [
                    " يجب مرافقة الوالدين لمن هم تحت سن ال12PG12 اتفهم ان التقييم العمري هو ",
                    "لا يسمح بدخول أي شخص تحت سن ال 3 الى صالة العرض",
                    "لن يُسمح بدخول الأطفال تحت سن ال3 الى السينما",
                    "لا يسمح بإدخال الأطعمة والمشروبات المشتراة من الخارج الى داخل السينما",
                  ];
                  this.paraJson =
                    " يتطلب الاشراف العائلي لمن من هم تحت سن ال12PG12";
                } else if (
                  this.movieDetails.Certificate == "R12" ||
                  this.movieDetails.Certificate == "R-12"
                ) {
                  this.modalJson = [
                    "لا يسمح بدخول أي شخص تحت سن ال 12 R12 اتفهم ان التقييم العمري هو",
                    "لا يسمح بدخول أي شخص تحت سن ال 3 الى صالة العرض",
                    "لن يُسمح بدخول الأطفال تحت سن ال3 الى السينما",
                    "لا يسمح بإدخال الأطعمة والمشروبات المشتراة من الخارج الى داخل السينما",
                  ];
                  this.paraJson =
                    "يعد المحتوى التالي محظورًا لمن هم تحت سن ال12R12";
                } else if (
                  this.movieDetails.Certificate == "R15" ||
                  this.movieDetails.Certificate == "R-15"
                ) {
                  this.modalJson = [
                    "لا يسمح بدخول أي شخص تحت سن ال15  R15 اتفهم ان التقييم العمري هو لا يسمح بإدخال",
                    "الاطعمة والمشروبات المشتراة من الخارج الى داخل السينما",
                  ];
                  this.paraJson =
                    " يعد المحتوى لمن محظورا لمن هم تحت سن ال15R15";
                } else if (
                  this.movieDetails.Certificate == "R18" ||
                  this.movieDetails.Certificate == "R-18"
                ) {
                  this.modalJson = [
                    "لا يسمح بدخول أي شخص تحت سن ال 18 R18 اتفهم ان التقييم العمري هو لا يسمح بإدخال",
                    "الاطعمة والمشروبات المشتراة من الخارج الى داخل السينما",
                  ];
                  this.paraJson =
                    "يعد المحتوى لمن محظورا لمن هم تحت سن ال18R18";
                }
              }
              this.selectedFormat = this.movieDetails.formatList[0];
            }
            this.$nextTick(() => {
              this.getDateList(
                this.selectedFormat.MovieID,
                this.selectedFormat.Format
              );
            });
          } else {
            this.$refs.modal.show();
            this.ErrorMessage = data.Message || data.message;
          }
        })
        .catch((err) => {
          this.$refs.modal.show();
          // this.$swal({
          //   icon: "error",
          //   title: "Oops...",
          //   text: "Something went wrong!"
          // });
        });
    },
    onSelectFormat(format) {
      console.log("onSelectFormat", { format });

      this.selectedTime = null;
      this.selectedFormat = format;
      // this.getDateList(format.MovieID, format.Format)
    },
    getDateList: function(movieId, format) {
      let payload = {
        movie_id: movieId,
        format: format,
      };
      scheduleService
        .getShowDates(payload)
        .then((response) => {
          const { data } = response;
          if (data && data.status) {
            this.showDates = data.data;
            this.showDates = this.showDates.map((singleDate) => {
              let date = moment(singleDate.date);
              singleDate.day =
                this.language_id == "ar"
                  ? this.ar_daysInWeek[date.day()]
                  : this.daysInWeek[date.day()];
              singleDate._date = date.date();
              singleDate.month =
                this.language_id == "ar"
                  ? this.ar_months[date.month()]
                  : this.months[date.month()];
              singleDate.year = date.year();
              return singleDate;
            });

            this.$refs.dateSlider.destroy();
            if (this.showDates.length > 0) {
              this.$nextTick(() => {
                this.$refs.dateSlider.create();
                this.$refs.dateSlider.goTo(0, true);
                this.getShowTimings(this.showDates[0]);
              });
            }
          } else {
            this.$refs.modal.show();
            this.ErrorMessage = data.Message || data.message;
          }
        })
        .catch((err) => {
          this.$refs.modal.show();
          // this.$swal({
          //   icon: "error",
          //   title: "Oops...",
          //   text: "Something went wrong in!"
          // });
        });
    },
    onSelectDate: function(date) {
      console.log(date);
      this.selectedDate = date;
    },
    getShowTimings: function(showDate) {
      let loader = this.$loading.show();
      this.showTimings = [];
      let payload = {
        movie_id: this.selectedFormat.MovieID,
        show_date: showDate.date,
      };
      scheduleService
        .getShowTimings(payload)
        .then((response) => {
          loader.hide();
          const { data } = response;
          if (data && data.status) {
            this.showTimings = data.data;
          } else {
            this.$refs.modal.show();
            this.ErrorMessage = data.Message || data.message;
          }
          this.$refs.timeSlider.destroy();
          this.$nextTick(() => {
            this.$refs.timeSlider.create();
            this.$refs.timeSlider.goTo(0, true);
          });
        })
        .catch((err) => {
          loader.hide();
          this.$refs.modal.show();
          // this.$swal({
          //   icon: "error",
          //   title: "Oops...",
          //   text: "Something went wrong in!"
          // });
        });
    },
    onSelectShowTime(schedule) {
      let scheduleCheck = !this.selectedTime
        ? true
        : this.selectedTime.ss_id != schedule.ss_id;
      if (scheduleCheck) {
        this.selectedTime = schedule;
        console.log({ schedule });

        this.ss_id = schedule.ss_id;
        this.md_id = schedule.md_id;
        this.screen_id = schedule.screen_id;
        let rating_id = this.movieDetails.rating_id
          ? this.movieDetails.rating_id
          : null;
        this.showTerms = {
          Description: "",
          Title: "",
          rated: "",
          RatingImage: "",
        };

        if (rating_id) {
          makeRequestBrij(
            `/rating_popup/?rating_id=${rating_id}`,
            "GET",
            null,
            null
          )
            .then((response) => {
              const { res } = response;
              if (
                res &&
                res.data &&
                res.data.Records &&
                res.data.Records.length > 0
              ) {
                const popData = res.data.Records.filter(
                  (p) => p.pp_lang_id == this.getCurrentLang().brij_lang_id
                ).length
                  ? res.data.Records.filter(
                      (p) => p.pp_lang_id == this.getCurrentLang().brij_lang_id
                    )[0]
                  : res.data.Records[0];
                console.log(popData);
                this.showTerms.RatingImage = popData.pp_banner;
                this.showTerms.Description = popData.pp_description;
                this.showTerms.rated = popData.rating_name;
                this.showTerms.Title = popData.pp_title;

                // this.ShowTermsPopup()
                // this.onClickAgree()
              } else {
                // this.onClickAgree()
              }
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
          this.showTerms = {
            Description: "",
            Title: "",
            rated: "",
            RatingImage: "",
          };
        }
      } else {
        this.selectedTime = null;
      }
    },
    onClickAgree() {
      this.$router.push({
        path: `/seatLayout/${this.ss_id}/${this.md_id}/${this.screen_id}`,
      });
    },
    ShowTermsPopup() {
      this.$refs["ruleOfCountry"].show();
    },
    HideTermsPopup() {
      this.$refs["ruleOfCountry"].hide();
    },
    onClickCancel: function() {
      this.$refs.ruleOfCountry.hide();
    },
    onClickProceed() {
      if (this.selectedTime == null || this.selectedTime.length == 0) {
        // this.$swal({
        //   icon: "error",
        //   title: "Hey...",
        //   text: "Please Select a Show Time!"
        // });
        this.$refs.modal.show();
        this.ErrorMessage = "Please Select a Show Time!";
      } else if (this.showTerms.RatingImage) {
        this.$refs.ruleOfCountry.show();
      } else {
        this.onClickAgree();
      }
    },
  },
};
</script>

<style scoped>
/*
          .showtime-list-new{
            display: inline;
            overflow-x: auto;
            list-style: none;
            align-items: center;
            padding-top: 20px;
            padding-bottom: 20px;
            justify-content: center;
          } */

/*
          .showtime-list-new li:first-child{
            padding-left: 20px;;
          }

          .showtime-list-new li:not(:last-child){
            margin-right: 20px;
          } */

.time-box {
  transform: scale(0.8);
  width: 130px;
  height: 130px;
  display: flex;
  margin: 0 auto;
  align-items: center;
  border-radius: 15px;
  justify-content: center;
  margin-top: 25px;
  margin-bottom: 25px;
  border: 3px solid #fff;
  flex-basis: calc(33.33% - 62px);
}

.time-box.active {
  color: #fff;
  background-color: #86bf3f;
  border: 5px solid #86bf3f;
}

.movie-name {
  font-size: 35px;
  font-weight: bold;
  margin-right: 30px;
}

.opacity {
  opacity: 0.4;
  transition: 0.3s ease-in;
}

.slick-center .opacity {
  opacity: 1;
}

.date-number {
  line-height: 1;
  font-size: 100px;
}

.month {
  font-size: 40px;
  line-height: 1;
  margin-bottom: 10px;
  font-weight: lighter;
}

.day {
  font-size: 50px;
  line-height: 1;
}

.showtime,
.format-list {
  padding: 0;
  text-align: center;
  list-style: none;
}

.format {
  padding: 0px 15px;
  display: flex;
  border-radius: 5px;
  align-items: center;
  justify-content: center;
  margin-left: 15px;
  font-size: 30px;
  border: 2px solid #fff;
}

.format.active {
  border: 2px solid #d3d3d3;
  background-color: #86bf3f;
}

.showtime .fill-green {
  border: 2px solid #86bf3f;
}

.showtime li {
  margin: 0 15px;
  width: 108px;
  height: 108px;
  border-radius: 15px;
  background: #fff;
  border: 2px solid #e6e6e6;
  display: inline-block;
  color: #e6e6e6;
  padding-top: 12px;
  font-size: 14px;
  position: relative;
  overflow: hidden;
  cursor: pointer;
  transform: scale(1);
  transition: 0.3s ease;
}

.timing-slot {
  position: absolute;
  left: 0;
  right: 0;
  z-index: 1;
}

.fill-green .filling {
  color: #000;
  background: #86bf3f;
  border: 2px solid #86bf3f;
}

.fill-height .filling {
  height: 40%;
  -webkit-transition: 0.4s;
  -o-transition: 0.4s;
  transition: 0.4s;
}

.filling {
  position: absolute;
  background: #e6e6e6;
  width: 100%;
  display: table;
  bottom: 0;
  -webkit-transition: 0.4s;
  -o-transition: 0.4s;
  transition: 0.4s;
}

.showtime .fill-green .time,
.showtime .fill-red .time,
.showtime .fill-yellow .time {
  color: #434345;
  font-size: 14px;
}

.showtime li.active,
.showtime li:hover {
  transform: scale(1.3);
  transition: 0.3s ease;
}

.movie-details-wrapper {
  width: 95%;
  margin: 0 auto;
  position: relative;
  height: calc(100vh - 220px);
}

.terms-modal,
.rulesDetail-modal {
  top: 2.5vh;
  left: 2.5%;
  border-radius: 15px;
  z-index: 99999;
  position: fixed;
  width: 95%;
  height: 95vh;
  padding: 13% 3% 5% 5%;
  color: #000;
  background-color: #fff;
  overflow: hidden;
}

.terms-modal .header,
.rulesDetail-modal .header {
  position: absolute;
  top: 20px;
  padding-left: 70px;
  font-size: 40px;
  font-weight: bold;
  text-align: center;
  left: 0;
  width: calc(100% - 75px);
}

.terms-modal .btn-close,
.rulesDetail-modal .btn-close {
  position: absolute;
  top: 15px;
  padding-left: 15px;
  padding-right: 15px;
  line-height: 1;
  font-weight: bold;
  font-size: 75px;
  right: 15px;
}

.terms-modal .content,
.rulesDetail-modal .content {
  width: 100%;
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
}

.terms-modal p,
.terms-modal li,
.rulesDetail-modal p {
  font-size: 18px;
}
.overflow_class {
  overflow-y: scroll;
  height: 700px;
  scroll-margin: 10px;
  align-content: flex-start;
}

::-webkit-scrollbar {
  width: 10px !important;
}
.btn-square-round {
  width: 250px;
  padding: 5px;
  height: 86px;
  color: #000;
  font-size: 30px;
  font-weight: bold;
  border-radius: 8%;
  text-decoration: none;
  background-color: #fff;
  box-shadow: 5px 5px 10px 10px #0000002b;
}

.btn-square-round .btn-content {
  width: 100%;
  height: 100%;
  display: flex;
  text-align: center;
  line-height: 1.2;
  align-items: center;
  border-radius: inherit;
  justify-content: center;
  text-transform: uppercase;
  border: 3px dotted #d3d3d3;
}
</style>
