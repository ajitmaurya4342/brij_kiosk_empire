<template>
  <div class="header-space">
    <!-- NEW PROFILE SECTION START -->
    <section class="container-fluid bg-white min-vh-100 py-2 header-space">
      <!-- TAB SECTION START-->
      <div class="mt-4 mb-4 text-center">
        <ul class="list-inline mx-auto mb-0 newProfileTabs">
          <!-- <li class="list-inline-item">
            <div
              class="btn emp-grey-btn"
              :class="clubEmpire ? 'active' : ''"
              @click="ChangeProfileTabs('clubEmpire', 1)"
            >
              {{ allLanguageData.MyClubEmpire }}
            </div>
          </li> -->
          <li class="list-inline-item">
            <div
              class="btn emp-grey-btn"
              :class="account ? 'active' : ''"
              @click="ChangeProfileTabs('account', 1)"
            >
              {{ allLanguageData.MyAccount }}
            </div>
          </li>
          <li class="list-inline-item">
            <div
              class="btn emp-grey-btn"
              :class="booking ? 'active' : ''"
              @click="ChangeProfileTabs('booking', 1)"
            >
              {{ allLanguageData.MyBooking }}
            </div>
          </li>

          <li class="list-inline-item">
            <div
              class="btn emp-grey-btn"
              :class="preferencess ? 'active' : ''"
              @click="ChangeProfileTabs('preferencess', 1)"
            >
              {{ allLanguageData.MyPreferencess }}
            </div>
          </li>
        </ul>
      </div>
      <!-- TAB SECTION END-->

      <!-- MY CLUB EMPIRE START -->
      <section v-if="clubEmpire" class="">
        <!-- BEFORE VERIFY FOR CLUB EMPIRE START -->
        <div
          class="col-12"
          v-if="LoyaltyCustomerVerfiy == 0 || LoyaltyCustomerVerfiy == '0'"
        >
          <div
            class="
              col-12 col-md-12 col-lg-8 col-xl-8
              newEmpGreyBG
              py-5
              mx-auto
              mb-4
            "
          >
            <h5 class="text-center">Hello, {{ profileDetails.FirstName }}</h5>
            <p class="text-center mb-0">{{ allLanguageData.WelcomeTo }}</p>
            <h5 class="text-center mb-5">
              {{ allLanguageData.CELoyaltyProgram }}
            </h5>

            <div class="row">
              <!-- <div class="col-12 col-md-5 order-2 order-md-1">
                <div class="border p-4">
                  <h6 class="text-center">
                    {{ allLanguageData.ClubEmpireCard }}
                  </h6>
                  <p class="fs-12 text-justify">
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industry's
                    standard dummy text ever since the 1500s, when an unknown
                    printer took a galley of type and scrambled it to make a
                    type specimen book. It has survived not only five centuries
                  </p>
                </div>
              </div> -->
              <div class="col-12 emp_new_modal text-center">
                <h6 class="text-center">
                  {{ allLanguageData.VerifyMobileNumber }}
                </h6>
                <!-- <h6 class="py-3">{{ allLanguageData.CELoyaltyProgram }}</h6> -->
                <div
                  class="
                    col-12 col-md-6 col-lg-4
                    px-0
                    my-3
                    mx-auto
                    newInput-container
                  "
                >
                  <!-- :defaultCountry="profileDetails.CountryISOCode" -->
                  <vue-tel-input
                    @input="onInput"
                    :value="profileDetails.Mobile"
                    :valid-characters-only="true"
                    placeholder="Mobile"
                    id="fMobileNum"
                    name="Mobile No"
                    :inputOptions="{
                      maxlength: 9
                    }"
                    :autoDefaultCountry="false"
                    :autoFormat="false"
                    :disabled="isEdit"
                    :defaultCountry="selectedCountry"
                    class="form-control emp_tel d-flex"
                  ></vue-tel-input>
                  <span @click="editUserNumber">
                    <label for="fMobileNum"></label>
                  </span>
                </div>
                <div
                  class="btn emp-red-btn"
                  @click="verifyUserForLp('vallidate')"
                >
                  {{ allLanguageData.VerifyNow }}
                </div>

                <!--Start Modal-->
                <b-modal
                  no-close-on-esc
                  no-close-on-backdrop
                  id="verifyAccount"
                  ref="verifyAccount"
                  title="VERIFY YOUR OTP"
                  class="ErModal light-red-color"
                >
                  <div class="col-md-8 col-lg-7 px-0 mx-auto py-2">
                    <h5 class="text-white text-left">
                      {{ allLanguageData.VerifyOtp }}
                    </h5>
                  </div>

                  <div class="row py-4">
                    <div class="col-md-8 col-lg-7 mx-auto">
                      <OtpInput
                        @focus="resetVerifyUserErrors"
                        @on-change="
                          value => {
                            userOtp = value;
                          }
                        "
                        ref="otpInput"
                        :is-input-num="true"
                        :num-inputs="6"
                        :should-auto-focus="true"
                      />
                      <p class="mb-0 small text-white text-center">
                        {{ errorMsg }}
                      </p>

                      <div
                        class="
                          d-flex
                          align-items-center
                          justify-content-between
                          mt-4
                        "
                      >
                        <div>
                          <input
                            type="button"
                            value="RESEND OTP"
                            @click.prevent="verifyUserForLp('ResendOtp')"
                            class="btn emp-grey-btn mw-auto w-100"
                          />
                        </div>
                        <div>
                          <input
                            type="submit"
                            value="VERIFY"
                            class="btn emp-grey-btn mw-auto w-100"
                            @click.prevent="finalVerifyUserForLp"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <!-- <div class="py-3">
                    <b-form-input
                      type="text"
                      placeholder="Enter OTP"
                      name="email"
                      v-model="userOtp"
                    />

                    <div class="my-1">
                      <a
                        href=""
                        @click.prevent="verifyUserForLp('ResendOtp')"
                        class="small font-weight-bold"
                        >Resend OTP</a
                      >
                      <p class="mb-0 small text-white text-center">
                        {{ errorMsg }}
                      </p>
                    </div>
                  </div>
                  <b-button
                    variant="default"
                    @click="finalVerifyUserForLp"
                    class="btn btn-green"
                    >VERIFY</b-button
                  > -->
                </b-modal>

                <b-modal
                  no-close-on-backdrop
                  id="updatedPopup"
                  ref="updatedPopup"
                  title="Updated"
                  class="ErModal light-red-color"
                >
                  <h6 class="py-5 mb-0 text-center font-weight-bold text-white">
                    {{ msg }}
                  </h6>
                  <b-button
                    @click="verifiedAccount()"
                    variant="default"
                    class="btn btn-green mt-4 mb-3"
                  >
                    {{ allLanguageData.ErrorModal.Btn }}
                  </b-button>
                </b-modal>
              </div>
            </div>
          </div>
          <!-- HOW IT WORKS  -->
          <div
            class="
              col-12 col-md-12 col-lg-8 col-xl-8
              px-0
              mx-auto
              my-4
              offer-accordion
              md-accordion
            "
          >
            <div class="accordion" role="tablist">
              <b-card no-body class="mb-3">
                <b-card-header header-tag="header" role="tab">
                  <b-button block v-b-toggle.accordion-1 variant="none">
                    HOW IT WORKS?
                  </b-button>
                </b-card-header>

                <b-collapse
                  id="accordion-1"
                  accordion="my-accordion"
                  role="tabpanel"
                >
                  <b-card-body>
                    <div class="px-3 pt-4 h-100">
                      <div class="row">
                        <div class="col-12 col-md-1 mb-3 mb-md-0">
                          <div
                            class="d-block mt-3"
                            style="background: red; height: 5px; width: 100%"
                          ></div>
                        </div>
                        <div class="col-12 col-md-10">
                          <h3 class="hiw-title">HOW IT WORKS?</h3>
                          <!-- <p class="font-weight-bold"></p> -->
                          <p class="fs-14">
                            It’s free to join and easy to collect and redeem -
                            the more you buy, the more you earn; watch your
                            favourite films and be rewarded!
                          </p>
                          <p class="fs-14">
                            We have created the most rewarding loyalty program
                            around that gives you points on all your spending in
                            Empire Cinemas. Whether it’s tickets, experiences or
                            food and beverage you will get a points for every
                            riyal you spend with us! Don’t forget to download
                            the app so you can kep track of your points.
                          </p>
                          <p class="fs-14">
                            Change the way you watch movies. Join Empire Cinemas
                            today and watch the points add up quickly to free
                            tickets, meals, discounts, exclusive offers and
                            invites.
                          </p>
                        </div>
                      </div>

                      <div class="row hiw-cards">
                        <!-- card start -->
                        <div class="col-12 col-md-4 mb-4">
                          <div
                            class="py-4 px-3 px-lg-3 text-center hiw-body h-100"
                          >
                            <img
                              src="@/assets/img/newImages/Asset4.svg"
                              height="50px"
                              width="50px"
                              alt=""
                            />
                            <div>
                              <p class="hiw-title">SIGN UP FOR FREE</p>
                              <p class="mb-0 hiw-text">
                                Join our fun and free Club Empire loyalty
                                program!
                              </p>
                            </div>
                          </div>
                        </div>
                        <!-- card end -->
                        <div class="col-12 col-md-4 mb-4">
                          <div
                            class="py-4 px-3 px-lg-4 text-center hiw-body h-100"
                          >
                            <img
                              src="@/assets/img/newImages/Asset5.svg"
                              height="75px"
                              width="75px"
                              alt=""
                            />
                            <div>
                              <p class="hiw-title">
                                SAR 1 SPENT = 1 CLUB EMPIRE POINT
                              </p>
                              <p class="mb-0 hiw-text">
                                Earn points on all your spending at Empire
                                Cinemas, from tickets to food, beverages and
                                experiences. We’ll give you points for all of
                                it!
                              </p>
                            </div>
                          </div>
                        </div>
                        <div class="col-12 col-md-4 mb-4">
                          <div
                            class="py-4 px-3 px-lg-4 text-center hiw-body h-100"
                          >
                            <img
                              src="@/assets/img/newImages/Asset6.svg"
                              height="75px"
                              width="75px"
                              alt=""
                            />
                            <div>
                              <p class="hiw-title">TRACK YOUR POINTS</p>
                              <p class="mb-0 hiw-text">
                                Download the Empire Cinemas app to track your
                                status and points in real-time.
                              </p>
                            </div>
                          </div>
                        </div>
                        <div class="col-12 col-md-4 mb-4 offset-0 offset-md-2">
                          <div
                            class="py-4 px-3 px-lg-4 text-center hiw-body h-100"
                          >
                            <img
                              src="@/assets/img/newImages/Asset7.svg"
                              height="75px"
                              width="75px"
                              alt=""
                            />
                            <div>
                              <p class="hiw-title">GET DISCOUNTS</p>
                              <p class="mb-0 hiw-text">
                                Get exclusive offers only availble to our Club
                                Empire members!
                              </p>
                            </div>
                          </div>
                        </div>
                        <div class="col-12 col-md-4 mb-4">
                          <div
                            class="py-4 px-3 px-lg-4 text-center hiw-body h-100"
                          >
                            <img
                              src="@/assets/img/newImages/Asset8.svg"
                              height="75px"
                              width="75px"
                              alt=""
                            />
                            <div>
                              <p class="hiw-title">ENJOY EVENTS</p>
                              <p class="mb-0 hiw-text">
                                Special Club Empire tiers will receive invites
                                to exclusive advanced movie screenings, menu
                                tastings, events and premieres.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </b-card-body>
                </b-collapse>
              </b-card>

              <b-card no-body class="mb-1">
                <b-card-header header-tag="header" role="tab">
                  <b-button block v-b-toggle.accordion-2 variant="none">
                    HOW CAN YOU USE YOUR POINTS?
                  </b-button>
                </b-card-header>

                <b-collapse
                  id="accordion-2"
                  accordion="my-accordion"
                  role="tabpanel"
                >
                  <b-card-body>
                    <div class="px-3 pt-4 h-100">
                      <div>
                        <div class="row">
                          <div class="col-12 col-md-1 mb-3 mb-md-0">
                            <div
                              class="d-block mt-3"
                              style="background: red; height: 5px; width: 100%"
                            ></div>
                          </div>
                          <div class="col-12 col-md-10">
                            <h3 class="hiw-title">
                              HOW CAN YOU USE YOUR POINTS?
                            </h3>
                            <p class="fs-14">
                              The more you spend, the more you earn! You can use
                              your points on anything avaiable at Empire
                              Cinemas.
                            </p>
                          </div>
                        </div>

                        <div class="row hiw-cards">
                          <div class="col-12 col-md-4 mb-4">
                            <div
                              class="
                                py-4
                                px-3 px-lg-4
                                text-center
                                hiw-body
                                h-100
                              "
                            >
                              <img
                                src="@/assets/img/newImages/Asset8.svg"
                                height="50px"
                                width="50px"
                                alt=""
                              />
                              <div>
                                <p class="hiw-title">FOOD &amp; BEVERAGE</p>
                                <p class="mb-0 hiw-text">
                                  Lorem Ipsum has been the industry's standard
                                  dummy text ever since the 1500s.
                                </p>
                              </div>
                            </div>
                          </div>

                          <div class="col-12 col-md-4 mb-4">
                            <div
                              class="
                                py-4
                                px-3 px-lg-4
                                text-center
                                hiw-body
                                h-100
                              "
                            >
                              <img
                                src="@/assets/img/newImages/Asset9.svg"
                                height="75px"
                                width="75px"
                                alt=""
                              />
                              <div>
                                <p class="hiw-title">EXPERIENCES</p>
                                <p class="mb-0 hiw-text">
                                  Lorem Ipsum has been the industry's standard
                                  dummy text ever since the 1500s,
                                </p>
                              </div>
                            </div>
                          </div>
                          <div class="col-12 col-md-4 mb-4">
                            <div
                              class="
                                py-4
                                px-3 px-lg-4
                                text-center
                                hiw-body
                                h-100
                              "
                            >
                              <img
                                src="@/assets/img/newImages/Asset10.svg"
                                height="75px"
                                width="75px"
                                alt=""
                              />
                              <div>
                                <p class="hiw-title">EMPIRE PREMIERE</p>
                                <p class="mb-0 hiw-text">
                                  Lorem Ipsum has been the industry's standard
                                  dummy text ever since the 1500s,
                                </p>
                              </div>
                            </div>
                          </div>
                          <div
                            class="col-12 col-md-4 mb-4 offset-0 offset-md-2"
                          >
                            <div
                              class="
                                py-4
                                px-3 px-lg-4
                                text-center
                                hiw-body
                                h-100
                              "
                            >
                              <img
                                src="@/assets/img/newImages/Asset11.svg"
                                height="75px"
                                width="75px"
                                alt=""
                              />
                              <div>
                                <p class="hiw-title">MINIS</p>
                                <p class="mb-0 hiw-text">
                                  Lorem Ipsum has been the industry's standard
                                  dummy text ever since the 1500s,
                                </p>
                              </div>
                            </div>
                          </div>
                          <div class="col-12 col-md-4 mb-4">
                            <div
                              class="
                                py-4
                                px-3 px-lg-4
                                text-center
                                hiw-body
                                h-100
                              "
                            >
                              <img
                                src="@/assets/img/newImages/Asset12.svg"
                                height="75px"
                                width="75px"
                                alt=""
                              />
                              <div>
                                <p class="hiw-title">TINY FACTORY</p>
                                <p class="mb-0 hiw-text">
                                  Lorem Ipsum has been the industry's standard
                                  dummy text ever since the 1500s,
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </b-card-body>
                </b-collapse>
              </b-card>
            </div>
          </div>
        </div>
        <!-- BEFORE VERIFY FOR CLUB EMPIRE END -->

        <!-- AFTER VERIFY FOR CLUB EMPIRE START -->
        <div v-if="LoyaltyCustomerVerfiy == 1 || LoyaltyCustomerVerfiy == '1'">
          <div
            class="
              col-12 col-md-12 col-lg-10 col-xl-8
              newEmpGreyBG
              py-5
              mx-auto
              mb-md-4
            "
          >
            <div class="row">
              <div
                class="
                  col-12 col-md-7
                  mb-3 mb-md-0
                  d-flex
                  flex-column
                  justify-content-between
                  order-2 order-md-1
                "
              >
                <!-- <range-slider
                class="slider"
                min="1"
                max="5"
                step="1"
                v-model="sliderValue"
              >
              </range-slider> -->
                <!-- <div class="px-4 mb-5 mb-md-0">

                  <div class="membership-bar mb-5">
                    <div
                      class="membership-progress"
                      :style="{ width: mProgressBar + '%' }"
                    >
                      <span
                        class="membership-progress-endPoint"
                        v-b-tooltip.hover
                        :title="LoyaltyMemberinfo.TotalEarnedPoints"
                      ></span>
                    </div>
                    <span
                      class="m-point red-point"
                      :class="
                        LoyaltyMemberinfo.TierType == 'RED' ? 'active' : ''
                      "
                      v-b-tooltip.hover
                      :title="'0 - ' + LoyaltyMemberinfo.RedPoints"
                    ></span>
                    <span
                      class="m-point bronze-point"
                      :class="
                        LoyaltyMemberinfo.TierType == 'BRONZE' ? 'active' : ''
                      "
                      v-b-tooltip.hover
                      :title="
                        LoyaltyMemberinfo.RedPoints +
                          ' - ' +
                          LoyaltyMemberinfo.BronzPoints
                      "
                    ></span>
                    <span
                      class="m-point silver-point"
                      :class="
                        LoyaltyMemberinfo.TierType == 'SILVER' ? 'active' : ''
                      "
                      v-b-tooltip.hover
                      :title="
                        LoyaltyMemberinfo.BronzPoints +
                          ' - ' +
                          LoyaltyMemberinfo.SliverPoints
                      "
                    ></span>
                    <span
                      class="m-point gold-point"
                      :class="
                        LoyaltyMemberinfo.TierType == 'GOLD' ? 'active' : ''
                      "
                      v-b-tooltip.hover
                      :title="LoyaltyMemberinfo.SliverPoints + '+'"
                    ></span>
                  </div>

                </div> -->

                <div class="emp_new_modal">
                  <b-form>
                    <div class="row">
                      <div class="col-12 col-md-6 mb-3 mb-md-0">
                        <small class="d-block fw-500">
                          {{ allLanguageData.MemberId }}
                        </small>
                        <b-form-input
                          name="Card Number"
                          type="text"
                          disabled=""
                          :value="LoyaltyMemberinfo.MemberID"
                        ></b-form-input>
                      </div>
                      <div class="col-12 col-md-6">
                        <small class="d-block fw-500">
                          {{ allLanguageData.MemberSince }}
                        </small>
                        <b-form-input
                          name="Member Since"
                          type="text"
                          disabled=""
                          :value="
                            (LoyaltyMemberinfo.LoyaltyStartDate || '')
                              .split(' ')
                              .join(' / ')
                          "
                        ></b-form-input>
                      </div>
                    </div>
                  </b-form>
                </div>
              </div>
              <div class="col-12 col-md-5 order-1 order-md-2 mb-5 mb-md-0">
                <!-- MEMBERSHIP CARD START -->
                <div class="clubempire-card" :class="CurrentCard">
                  <h6 class="text-right card_cat">
                    <!-- {{ LoyaltyMemberinfo.TierType }} -->
                  </h6>
                  <!-- <div class="text-right">
                    <img
                      src="@/assets/img/newImages/clubEmpireLogo.svg"
                      class="img-fluid"
                      height="100%"
                      width="60%"
                      alt=""
                    />
                  </div> -->

                  <div class="d-flex justify-content-between">
                    <div class="card_name">
                      {{ LoyaltyMemberinfo.FullName }}
                    </div>
                    <div>
                      <p class="mb-0 card_text">
                        {{ allLanguageData.AvailablePoints }}
                      </p>
                      <p class="mb-0 card_point">
                        {{ LoyaltyMemberinfo.BalancePoint }}
                      </p>
                    </div>
                  </div>
                </div>
                <!-- MEMBERSHIP CARD END -->
              </div>
            </div>
          </div>

          <!-- LEVEL BENEFITS START -->
          <div class="col-12 px-0 col-md-10 col-lg-8 mx-auto mb-4">
            <h6 class="my-3 font-weight-bold">
              {{ allLanguageData.LevelBenefits }}
            </h6>
            <div class="accordion clubEmpire-accordion" role="tablist">
              <!-- CARD INFO -->
              <b-card
                no-body
                class="mb-1"
                v-for="(levelData, levelIndex) in LoyaltyMemberinfo.leveldata"
                :key="levelIndex"
              >
                <b-card-header
                  header-tag="header"
                  :class="
                    levelData.levelname == 'RED'
                      ? 'red-header'
                      : levelData.levelname == 'BRONZE'
                      ? 'bronze-header'
                      : levelData.levelname == 'SILVER'
                      ? 'silver-header'
                      : 'gold-header'
                  "
                  role="tab"
                  v-b-toggle="'accordion-' + levelIndex"
                >
                  <div
                    class="
                      d-flex
                      align-items-center
                      justify-content-between
                      py-1
                      cursor-pointer
                    "
                  >
                    <h6 class="mb-0">{{ levelData.levelname }}</h6>
                    <div>
                      <img
                        src="@/assets/img/svg/chevron-down.svg"
                        height="10px"
                        width="10px"
                        alt=""
                      />
                    </div>
                  </div>
                </b-card-header>
                <b-collapse
                  :id="'accordion-' + levelIndex"
                  :visible="levelIndex == 0"
                  accordion="my-accordion"
                  role="tabpanel"
                >
                  <b-card-body>
                    <div class="row">
                      <div
                        class="col-12 col-md-2 mb-3 mb-md-0 align-self-center"
                      >
                        <img
                          :src="levelData.levelimage"
                          class="img-fluid"
                          alt=""
                        />
                      </div>
                      <div class="col-12 col-md-10">
                        <ol class="mb-0 pl-3 pl-md-4">
                          <li
                            v-for="(levelContent,
                            levelContentIndex) in levelData.content"
                            :key="levelContentIndex"
                          >
                            {{ levelContent.levelpoints }}
                          </li>
                        </ol>
                      </div>
                    </div>
                  </b-card-body>
                </b-collapse>
              </b-card>
              <!-- CARD INFO END-->
            </div>
          </div>
          <!-- LEVEL BENEFITS END -->
        </div>
        <!-- AFTER VERIFY FOR CLUB EMPIRE END -->
      </section>
      <!-- MY CLUB EMPIRE END -->

      <!-- MY BOOKING START -->
      <section v-if="booking" class="">
        <div class="col-12 col-md-12 col-lg-8 py-4 mx-auto mb-4 px-0 px-md-0">
          <div class="col-12 col-md-11 mx-auto">
            <h6 class="my-3 font-weight-bold">
              <img
                src="@/assets/img/newImages/hb-menu-icon.svg"
                class="mr-2"
                height="23px"
                width="23px"
                alt=""
              />
              {{ allLanguageData.YourSummary }}
            </h6>
          </div>

          <div class="table-responsive tableFixHead">
            <table class="table table-borderless newMyBooking-table">
              <thead>
                <tr>
                  <th class="lrPadding">
                    <img
                      src="@/assets/img/newImages/location-pin.svg"
                      :class="langName == 'ar' ? 'ml-2' : 'mr-2'"
                      height="25px"
                      width="25px"
                      alt=""
                    />
                    {{ allLanguageData.Location }}
                  </th>
                  <th class="lrPadding">
                    <img
                      src="@/assets/img/newImages/play-tv.svg"
                      :class="langName == 'ar' ? 'ml-2' : 'mr-2'"
                      height="25px"
                      width="25px"
                      alt=""
                    />
                    {{ allLanguageData.Movie }}
                  </th>
                  <th class="lrPadding">
                    <img
                      src="@/assets/img/newImages/clock-icon.svg"
                      :class="langName == 'ar' ? 'ml-2' : 'mr-2'"
                      height="25px"
                      width="25px"
                      alt=""
                    />
                    {{ allLanguageData.Time }}
                  </th>
                  <th class="lrPadding">
                    <img
                      src="@/assets/img/newImages/calender-icon.svg"
                      :class="langName == 'ar' ? 'ml-2' : 'mr-2'"
                      height="25px"
                      width="25px"
                      alt=""
                    />
                    {{ allLanguageData.Date }}
                  </th>
                  <th class="lrPadding">
                    <img
                      src="@/assets/img/newImages/invoice-icon.svg"
                      :class="langName == 'ar' ? 'ml-2' : 'mr-2'"
                      height="25px"
                      width="25px"
                      alt=""
                    />
                    {{ allLanguageData.Invoice }}
                  </th>
                </tr>
              </thead>
              <tbody>
                <template>
                  <tr>
                    <td class="Btitle lrPadding" colspan="5">
                      <img
                        src="@/assets/img/newImages/right-red-arrow.svg"
                        :class="langName == 'ar' ? 'ml-1' : 'mr-1'"
                        height="15px"
                        width="15px"
                        alt=""
                      />
                      {{ allLanguageData.UpComingBookings }}
                    </td>
                  </tr>
                  <template v-if="getUserHistory && getUserHistory.length > 0">
                    <tr
                      class="bTableRows"
                      v-for="(upComingBooking,
                      upComingBookingIndex) in getUserHistory"
                      :key="upComingBookingIndex"
                    >
                      <td class="lrPadding">
                        <span :class="langName == 'ar' ? 'ml-2' : 'mr-2'">
                          {{ upComingBookingIndex + 1 }}.
                        </span>
                        {{ upComingBooking.cine_name }}
                      </td>
                      <td
                        class="lrPadding c-pointer"
                        @click="openBookedTicket(upComingBooking, 'upComing')"
                      >
                        {{
                          getLangSpecificAttribute(
                            upComingBooking.movieTranslations,
                            getCurrentLang().brij_lang_id,
                            "mc_title"
                          ) ||
                            upComingBooking.movie_title ||
                            upComingBooking.original_title_of_movie ||
                            upComingBooking.movie_name
                        }}
                      </td>
                      <td class="lrPadding">
                        {{
                          moment(
                            upComingBooking.ss_start_show_time,
                            "HH:mm"
                          ).format("HH:mm") || upComingBooking.MovieTiming
                        }}
                      </td>
                      <td class="lrPadding">
                        {{
                          moment(upComingBooking.show_date).format(
                            "DD MMM YYYY"
                          ) || upComingBooking.MovieDate
                        }}
                      </td>
                      <td>
                        {{ upComingBooking.bookingid }}
                      </td>
                    </tr>
                  </template>

                  <tr v-else>
                    <td
                      class="Btitle text-md-center"
                      :class="
                        langName == 'ar' ? 'pr-5 pr-md-0' : 'pl-5 pl-md-0'
                      "
                      colspan="5"
                    >
                      {{ allLanguageData.NoDataFound }}
                    </td>
                  </tr>
                </template>

                <template>
                  <tr>
                    <td class="Btitle lrPadding" colspan="5">
                      <img
                        src="@/assets/img/newImages/left-red-arrow.svg"
                        :class="langName == 'ar' ? 'ml-1' : 'mr-1'"
                        height="15px"
                        width="15px"
                        alt=""
                      />
                      {{ allLanguageData.ExpiredBookings }}
                    </td>
                  </tr>
                  <template
                    v-if="Object.keys(expeirdBookings || {}).length > 0"
                  >
                    <tr
                      class="bTableRows"
                      v-for="(expeirdBooking,
                      expeirdBookingIndex) in expeirdBookings"
                      :key="expeirdBookingIndex"
                    >
                      <td class="lrPadding">
                        <span :class="langName == 'ar' ? 'ml-2' : 'mr-2'">
                          {{ expeirdBookingIndex + 1 }}.
                        </span>
                        {{ expeirdBooking.CinemaName }}
                      </td>
                      <td
                        class="lrPadding c-pointer"
                        @click="openBookedTicket(expeirdBooking, 'expeird')"
                      >
                        {{ expeirdBooking.Title }}
                      </td>
                      <td class="lrPadding">
                        {{ expeirdBooking.MovieTiming }}
                      </td>
                      <td class="lrPadding">{{ expeirdBooking.MovieDate }}</td>
                      <td>
                        {{ expeirdBooking.bookingid }}
                      </td>
                    </tr>
                  </template>
                  <tr v-else>
                    <td
                      class="Btitle text-md-center"
                      :class="
                        langName == 'ar' ? 'pr-5 pr-md-0' : 'pl-5 pl-md-0'
                      "
                      colspan="5"
                    >
                      {{ allLanguageData.NoDataFound }}
                    </td>
                  </tr>
                </template>
              </tbody>
            </table>
          </div>
        </div>
      </section>
      <!-- MY BOOKING END -->

      <!-- MY ACCOUNT START -->
      <section v-if="account" class="">
        <div class="emp_new_modal">
          <b-form>
            <div
              class="
                col-12 col-md-12 col-lg-9
                px-md-5
                newEmpGreyBG
                py-5
                mx-auto
                mb-4
              "
            >
              <p
                class="text-center bold"
                style="color:red"
                v-if="
                  !profileDetails.Gender ||
                    !profileDetails.Profileimage ||
                    !profileDetails.Birthdate
                "
              >
                {{ allLanguageData.UPDATEYOURPROFILE }}
              </p>
              <div class="row">
                <div class="col-12 col-md-3 mb-3 mb-md-0 text-center">
                  <div class="new-user-profile">
                    <img
                      v-if="profileDetails.Profileimage"
                      :src="BrijBaseUrl + profileDetails.Profileimage"
                      alt=""
                    />
                    <img
                      src="@/assets/img/newImages/profile-placeholder.svg"
                      v-else
                      alt=""
                    />
                  </div>
                  <!-- {{aaa}} -->
                  <label for="newProfile" class="upload-user-profile mt-2">
                    <input
                      type="file"
                      id="newProfile"
                      class="d-none"
                      @change="uploadFile($event)"
                    />
                    {{ allLanguageData.UploadPicture }}
                  </label>
                </div>
                <div class="col-12 col-md-9 col-lg-8">
                  <div class="row">
                    <div class="col-12 col-md-6 mb-4">
                      <small class="d-block fw-500">
                        {{ allLanguageData.FName }}
                      </small>
                      <b-form-input
                        type="text"
                        id="fName"
                        v-validate="'required'"
                        name="First-Name"
                        v-model="profileDetails.FirstName"
                        class="text-capitalize"
                        :placeholder="allLanguageData.FName"
                      ></b-form-input>
                      <div
                        v-show="errors.has('updateProfile.First-Name')"
                        class="errorMessage"
                      >
                        {{ errors.first("updateProfile.First-Name") }}
                      </div>
                    </div>
                    <div class="col-12 col-md-6 mb-4">
                      <small class="d-block fw-500">
                        {{ allLanguageData.LName }}
                      </small>
                      <b-form-input
                        type="text"
                        id="sName"
                        name="Last-Name"
                        v-validate="'required'"
                        v-model="profileDetails.LastName"
                        class="text-capitalize"
                        :placeholder="allLanguageData.LName"
                      ></b-form-input>
                      <div
                        v-show="errors.has('updateProfile.Last-Name')"
                        class="errorMessage"
                      >
                        {{ errors.first("updateProfile.Last-Name") }}
                      </div>
                    </div>
                    <div class="col-12 col-md-6 mb-4">
                      <small class="d-block fw-500">
                        {{ allLanguageData.EmailId }}
                      </small>
                      <b-form-input
                        type="email"
                        v-validate="'required|email'"
                        id="userEmail"
                        name="email"
                        v-model="profileDetails.Email"
                        disabled
                        :placeholder="allLanguageData.Email"
                      ></b-form-input>
                    </div>
                    <div class="col-12 col-md-6 mb-4 profile-mobile">
                      <small class="d-block fw-500">
                        {{ allLanguageData.MobileNumber }}
                      </small>
                      <!-- {{ profileDetails.Mobile }} -->
                      <!-- v-model="profileDetails.Mobile" -->
                      <!-- :disabled="profileDetails.isLoyaltyMember || true" -->
                      <!-- :disabled="isLoyaltyMemebrValue" -->
                      <div class="d-flex align-items-center">
                        <!-- disabled = mobileVerified -->
                        <vue-phone-number-input
                          color="red"
                          :default-country-code="
                            contryList.find(
                              o => o.phonecode == profileDetails.CountryCode
                            ) &&
                              contryList.find(
                                o => o.phonecode == profileDetails.CountryCode
                              ).isoCode
                          "
                          @update="resultsExample = $event"
                          v-model="profileDetails.Mobile"
                        />
                        <div class="cursor-pointer">
                          <img
                            src="@/assets/img/svg/edit-black-icon.svg"
                            alt=""
                            width="15px"
                          />
                        </div>
                      </div>

                      <!-- <vue-tel-input
                        @input="onInput"
                        :value="profileDetails.Mobile"
                        :valid-characters-only="true"
                        :placeholder="allLanguageData.MobileNumber"
                        name="phonenumber"
                        :inputOptions="{
                          maxlength: 10,
                          disabled: mobileVerified ? false : true,
                        }"
                        :autoDefaultCountry="false"
                        :autoFormat="false"
                        :defaultCountry="selectedCountry"
                        class="form-control emp_tel d-flex"
                        @validate="onChangeMobileNum(profileDetails.Mobile)"
                      ></vue-tel-input> -->
                      <!-- :defaultCountry="profileDetails.CountryCode" -->
                      <div
                        v-show="errors.has('updateProfile.email')"
                        class="errorMessage"
                      >
                        {{ errors.first("updateProfile.email") }}
                      </div>
                      <router-link
                        @click.native="linkMobile"
                        style="color: red; cursor: pointer;font-size:12px;"
                        v-if="!mobileVerified"
                        to
                      >
                        <!-- Verify Mobile Number -->
                        {{ allLanguageData.MOBILENUMBERNOTVERIFIED }}
                      </router-link>
                      <p
                        v-else
                        style="color: green; cursor: pointer;font-size:12px;"
                      >
                        {{ allLanguageData.MOBILEVERIFIED }}
                      </p>
                    </div>
                    <div class="col-12 col-md-6 mb-3">
                      <small class="d-block fw-500">
                        {{ allLanguageData.Gender }}
                      </small>
                      <div class="d-flex align-items-center">
                        <div>
                          <b-form-radio
                            v-model="profileDetails.Gender"
                            v-on:change="onGenderChange('Male')"
                            value="Male"
                            name="some-radios "
                            class="small fw-500 lh-input"
                          >
                            {{ allLanguageData.Male }}
                          </b-form-radio>
                        </div>
                        <div>
                          <b-form-radio
                            v-model="profileDetails.Gender"
                            v-on:change="onGenderChange('Female')"
                            value="Female"
                            name="some-radios"
                            class="small fw-500 lh-input"
                          >
                            {{ allLanguageData.Female }}
                          </b-form-radio>
                        </div>
                      </div>
                    </div>
                    <!-- <div class="col-12 col-md-6 mb-4">
                      <small class="d-block fw-500">
                        {{ allLanguageData.Nationality }}
                      </small>
                      <b-form-input
                        name="Member Since"
                        type="text"
                        v-model="profileDetails.Nationality"
                      ></b-form-input>
                    </div> -->
                    <div class="col-12 col-md-6 mb-4">
                      <!-- {{ profileDetails }} -->
                      <!-- {{ profileDetails.Birthdate }} -->
                      <small class="d-block fw-500">
                        {{ allLanguageData.DOB }}
                      </small>
                      <b-form-input
                        name="Birth Date"
                        type="date"
                        v-model="profileDetails.Birthdate"
                        placeholder="dd/mm/yyyy"
                      ></b-form-input>
                      <!-- <b-form-datepicker
                        id="example-datepicker"
                        v-model="profileDetails.Birthdate"
                        class="mb-2"
                      ></b-form-datepicker> -->
                    </div>
                    <div class="col-12 px-0 col-md-12 my-4">
                      <label class="address-label font-weight-bold">
                        {{ allLanguageData.ADDRESSDETAILS }}
                      </label>
                      <div class="country-city-grid">
                        <div>
                          <multiselect
                            v-model="profileDetails.countryid"
                            :options="contryOptions"
                            label="text"
                            track-by="value"
                            class="custom-multiselect address-grid-dropdown"
                            :select-label="''"
                            :deselect-label="''"
                            :placeholder="allLanguageData.SELECTCOUNTRY"
                            :selectedLabel="''"
                          >
                          </multiselect>
                        </div>
                        <div>
                          <multiselect
                            v-model="profileDetails.City"
                            :options="cityOptions"
                            label="text"
                            track-by="value"
                            class="custom-multiselect address-grid-dropdown"
                            :select-label="''"
                            :deselect-label="''"
                            :placeholder="allLanguageData.SELECTSTATE"
                            :selectedLabel="''"
                          >
                          </multiselect>
                        </div>
                      </div>
                    </div>

                    <!-- <div
                      class="col-12 col-md-6 mb-4"
                      v-if="
                        profileDetails.countryid && contryOptions.length > 0
                      "
                    >
                      <small class="d-block fw-500"> Country </small>
                      <b-form-select
                        v-if="contryOptions.length > 0"
                        v-validate="'required'"
                        id="country"
                        name="country"
                        :options="contryOptions"
                        v-model="profileDetails.countryid"
                      ></b-form-select>
                    </div>
                    <div class="col-12 col-md-6 mb-4">
                      <small class="d-block fw-500"> City </small>
                      <b-form-select
                        v-validate="'required'"
                        id="CityID"
                        name="CityID"
                        :options="cityOptions"
                        v-model="profileDetails.City"
                      ></b-form-select>
                    </div> -->
                  </div>
                </div>
              </div>
            </div>

            <div
              v-if="false"
              class="
                col-12 col-md-12 col-lg-9
                px-md-5
                newEmpGreyBG
                pt-5
                mx-auto
                mb-4
              "
              :class="isPasswordCorrect ? 'pb-4' : 'pb-5'"
            >
              <h6 class="font-weight-bold mb-3 pl-md-5">
                <img
                  src="@/assets/img/newImages/lock.svg"
                  class="mr-1"
                  height="23px"
                  width="23px"
                  alt=""
                />
                {{ allLanguageData.ChangePassword }}
              </h6>
              <div class="col-12 col-md-9 col-lg-8 offset-md-3">
                <div class="row">
                  <div class="col-12 col-md-6 mb-3 mb-md-0">
                    <small class="d-block fw-500">
                      {{ allLanguageData.OldPassword }}
                    </small>
                    <b-form-input
                      name="Old Password"
                      type="text"
                      v-model="OldPasswordType"
                      @change="changePassword()"
                    ></b-form-input>
                  </div>
                  <div class="col-12 col-md-6">
                    <small class="d-block fw-500">
                      {{ allLanguageData.NewPassword }}
                    </small>
                    <b-form-input
                      name="New Password"
                      type="text"
                      :disabled="isPasswordIncorrect"
                      v-model="NewPasswordType"
                      class="disabled"
                    ></b-form-input>
                  </div>
                </div>
              </div>
              <div class="mt-3 text-center">
                <!-- <div class="bg-info">
                  isPasswordCorrect : {{ isPasswordCorrect }}
                </div>
                <div class="bg-warning">
                  OldPasswordType : {{ OldPasswordType }}
                </div>
                <div class="text-danger">errorMessage : {{ errorMessage }}</div>
                <div class="text-info">
                  {{ isPasswordCorrect && OldPasswordType }}
                </div> -->
                <p
                  class="text-danger font-weight-bold"
                  v-if="isPasswordCorrect && OldPasswordType"
                >
                  {{ errorMessage }}
                </p>
                <p
                  class="text-success font-weight-bold"
                  v-if="!isPasswordCorrect && !NewPasswordType"
                >
                  {{ message }}
                </p>
                <!-- <div class="text-danger">message: {{ message }}</div>
                <div class="bg-info">
                  !isPasswordCorrect : {{ !isPasswordCorrect }}
                </div>
                <div class="bg-warning">
                  !OldPasswordType : {{ !OldPasswordType }}
                </div>
                <div class="text-info">
                  {{ !isPasswordCorrect && !NewPasswordType }}
                </div> -->
              </div>
            </div>

            <div
              class="
                col-12 col-md-12 col-lg-9
                px-md-5
                newEmpGreyBG
                py-5
                mx-auto
                mb-4
              "
            >
              <h6 class="font-weight-bold mb-3 pl-md-5">
                <img
                  src="@/assets/img/newImages/bell-icon.svg"
                  class="mr-1"
                  height="23px"
                  width="23px"
                  alt=""
                />
                {{ allLanguageData.Notifications }}
              </h6>
              <div class="col-12 col-md-9 col-lg-8 offset-md-3">
                <div class="emp_new_checkbox mb-3">
                  <input
                    type="checkbox"
                    id="checkboxnew"
                    v-model="profileDetails.personalnotification"
                  />
                  <!-- <input type="checkbox" id="checkboxnew" v-model="aaa" /> -->
                  <label for="checkboxnew" class="check"></label>
                  <label for="checkboxnew" class="check_text">
                    {{ allLanguageData.RecievePersonalisedNotification }}
                  </label>
                </div>
                <div class="emp_new_checkbox">
                  <input
                    type="checkbox"
                    id="checkboxnewTwo"
                    v-model="profileDetails.movienotification"
                  />
                  <label for="checkboxnewTwo" class="check"></label>
                  <label for="checkboxnewTwo" class="check_text">
                    {{ allLanguageData.ReceiningInformation }}
                  </label>
                </div>
              </div>
            </div>

            <div class="text-center my-4">
              <div
                class="btn emp-grey-btn"
                @click.prevent="UpdateProfileDetails(0)"
              >
                <!-- :style="mobileVerified ? '' : 'pointer-events: none;'" -->
                SAVE
              </div>
            </div>
            <h6
              class="text-success small font-weight-bold text-center my-3"
              v-if="isPasswordCorrect && !errorMessage"
            >
              {{ FinalMessage }}
            </h6>
            <h6
              class="text-danger small font-weight-bold text-center my-3"
              v-if="errorMessage"
            >
              {{ errorMessage }}
            </h6>
          </b-form>
        </div>
      </section>
      <!-- MY ACCOUNT END -->

      <!-- MY PREFERENCESS START -->
      <section v-if="preferencess" class="mb-4">
        <div class="col-12 col-md-12 col-lg-7 py-4 mx-auto px-0 px-md-3">
          <div class="mb-5 d-flex w-100">
            <div class="">
              <img
                src="@/assets/img/newImages/location-pin.svg"
                :class="langName == 'ar' ? 'ml-2' : 'mr-2'"
                height="25px"
                width="25px"
                alt=""
              />
            </div>
            <div
              class="w-100"
              :class="langName == 'ar' ? 'text-right' : 'text-left'"
            >
              <h6 class="font-weight-bold mb-4">
                {{ allLanguageData.FavouriteCinemas }}
              </h6>
              <ul class="list-inline mb-0 pl-0 preferencessList">
                <li
                  class="list-inline-item"
                  v-for="(preferenceCinema,
                  preferenceCinemaIndex) in getPreferencesOptions.cinema_list"
                  :key="preferenceCinemaIndex"
                >
                  <div class="d-flex align-items-center w-100">
                    <div
                      class="newProfileFavIcon"
                      :class="langName == 'ar' ? 'ml-2' : 'mr-2'"
                    >
                      <input
                        type="checkbox"
                        name=""
                        v-model="preferenceCinema.selected"
                        :id="'Cinema' + preferenceCinemaIndex"
                        class="d-none"
                        @change="
                          AddPreference(
                            preferenceCinema.ID,
                            preferenceCinema.selected,
                            'Cinema',
                            preferenceCinema
                          )
                        "
                      />
                      <label
                        :for="'Cinema' + preferenceCinemaIndex"
                        class="check mb-0"
                      >
                        <svg
                          height="20px"
                          width="20px"
                          aria-hidden="true"
                          focusable="false"
                          data-prefix="fas"
                          data-icon="heart"
                          class="svg-inline--fa fa-heart fa-w-16"
                          role="img"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 512 512"
                        >
                          <path
                            fill="currentColor"
                            d="M462.3 62.6C407.5 15.9 326 24.3 275.7 76.2L256 96.5l-19.7-20.3C186.1 24.3 104.5 15.9 49.7 62.6c-62.8 53.6-66.1 149.8-9.9 207.9l193.5 199.8c12.5 12.9 32.8 12.9 45.3 0l193.5-199.8c56.3-58.1 53-154.3-9.8-207.9z"
                          ></path>
                        </svg>
                      </label>
                    </div>
                    <div>
                      {{
                        getLangSpecificAttribute(
                          preferenceCinema.translation_data,
                          getCurrentLang().brij_lang_id,
                          "cinema_name",
                          "langaugeId"
                        ) || preferenceCinema.cine_name
                      }}
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          <div class="mb-5 d-flex w-100">
            <div>
              <img
                src="@/assets/img/newImages/play-tv.svg"
                :class="langName == 'ar' ? 'ml-2' : 'mr-2'"
                height="25px"
                width="25px"
                alt=""
              />
            </div>
            <div
              class="w-100"
              :class="langName == 'ar' ? 'text-right' : 'text-left'"
            >
              <h6 class="font-weight-bold mb-4">
                {{ allLanguageData.FavouriteExperiences }}
              </h6>
              <ul class="list-inline mb-0 pl-0 preferencessList">
                <li
                  class="list-inline-item mr-4"
                  v-for="(preferenceExperience,
                  preferenceExperienceIndex) in getPreferencesOptions.format_list"
                  :key="preferenceExperienceIndex"
                >
                  <div class="d-flex align-items-center w-100">
                    <div
                      class="newProfileFavIcon"
                      :class="langName == 'ar' ? 'ml-2' : 'mr-2'"
                    >
                      <input
                        type="checkbox"
                        name=""
                        v-model="preferenceExperience.selected"
                        :id="'exp' + preferenceExperienceIndex"
                        class="d-none"
                        @change="
                          AddPreference(
                            preferenceExperience.ID,
                            preferenceExperience.selected,
                            'expeience',
                            preferenceExperience
                          )
                        "
                      />
                      <label
                        :for="'exp' + preferenceExperienceIndex"
                        class="check mb-0"
                      >
                        <svg
                          height="20px"
                          width="20px"
                          aria-hidden="true"
                          focusable="false"
                          data-prefix="fas"
                          data-icon="heart"
                          class="svg-inline--fa fa-heart fa-w-16"
                          role="img"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 512 512"
                        >
                          <path
                            fill="currentColor"
                            d="M462.3 62.6C407.5 15.9 326 24.3 275.7 76.2L256 96.5l-19.7-20.3C186.1 24.3 104.5 15.9 49.7 62.6c-62.8 53.6-66.1 149.8-9.9 207.9l193.5 199.8c12.5 12.9 32.8 12.9 45.3 0l193.5-199.8c56.3-58.1 53-154.3-9.8-207.9z"
                          ></path>
                        </svg>
                      </label>
                    </div>
                    <div>{{ preferenceExperience.mf_name }}</div>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          <div class="mb-5 d-flex w-100">
            <div>
              <img
                src="@/assets/img/newImages/popcorn.svg"
                :class="langName == 'ar' ? 'ml-2' : 'mr-2'"
                height="25px"
                width="25px"
                alt=""
              />
            </div>
            <div
              class="w-100"
              :class="langName == 'ar' ? 'text-right' : 'text-left'"
            >
              <h6 class="font-weight-bold mb-4">
                {{ allLanguageData.FavouriteMovieSnack }}
              </h6>
              <ul class="list-inline mb-0 pl-0 preferencessList">
                <li
                  class="list-inline-item mr-4"
                  v-for="(preferenceFood,
                  preferenceFoodIndex) in getPreferencesOptions.fnb_items"
                  :key="preferenceFoodIndex"
                >
                  <div class="d-flex align-items-center w-100">
                    <div
                      class="newProfileFavIcon"
                      :class="langName == 'ar' ? 'ml-2' : 'mr-2'"
                    >
                      <input
                        type="checkbox"
                        name=""
                        v-model="preferenceFood.selected"
                        :id="'Food' + preferenceFoodIndex"
                        class="d-none"
                        @change="
                          AddPreference(
                            preferenceFood.ID,
                            preferenceFood.selected,
                            'Food',
                            preferenceFood
                          )
                        "
                      />
                      <label
                        :for="'Food' + preferenceFoodIndex"
                        class="check mb-0"
                      >
                        <svg
                          height="20px"
                          width="20px"
                          aria-hidden="true"
                          focusable="false"
                          data-prefix="fas"
                          data-icon="heart"
                          class="svg-inline--fa fa-heart fa-w-16"
                          role="img"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 512 512"
                        >
                          <path
                            fill="currentColor"
                            d="M462.3 62.6C407.5 15.9 326 24.3 275.7 76.2L256 96.5l-19.7-20.3C186.1 24.3 104.5 15.9 49.7 62.6c-62.8 53.6-66.1 149.8-9.9 207.9l193.5 199.8c12.5 12.9 32.8 12.9 45.3 0l193.5-199.8c56.3-58.1 53-154.3-9.8-207.9z"
                          ></path>
                        </svg>
                      </label>
                    </div>
                    <div>{{ preferenceFood.item_name }}</div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <!-- <div class="col-12 text-center my-4">
            <div class="btn emp-grey-btn">SAVE</div>
          </div> -->

          <h6 class="text-success font-weight-bold text-center">
            {{ AddPreferenceMessage }}
          </h6>
        </div>
      </section>
      <!-- MY PREFERENCESS END -->

      <!-- INVOICE DETAIL MODAL -->
      <!-- <b-modal
        no-close-on-esc
        id="upComingBookingDetails"
        ref="upComingBookingDetails"
        :title="allLanguageData.BookingDetails"
        class="ErModal light-red-color"
      >
        <div class="mb-5">
          {{ upComingBookingData.Title }}
        </div>
      </b-modal> -->

      <!-- INVOICE DETAIL MODAL -->
      <!-- <b-modal
        no-close-on-esc
        id="expeirdBookingDetails"
        ref="expeirdBookingDetails"
        :title="allLanguageData.BookingDetails"
        class="ErModal light-red-color"
      >
        <div class="mb-5">
          {{ expeirdBookingData.Title }}
        </div>
      </b-modal> -->

      <!-- INVOICE DETAIL MODAL -->
      <!-- <b-modal
        no-close-on-esc
        id="upComingBookingDetails"
        ref="upComingBookingDetails"
        title="Booking Details"
        class="ErModal light-red-color"
      >
        <div class="mb-5">
          {{ upComingBookingData.Title }}
        </div>
      </b-modal> -->

      <!-- TICKET DETAIL MODAL -->
      <b-modal
        no-close-on-esc
        id="TicketDetailsModal"
        ref="TicketDetailsModal"
        size="lg"
        :title="allLanguageData.TicketDetails"
        class="ticketPopup light-red-color"
      >
        <div class="my-4">
          <div class="col-12 d-none d-md-block">
            <div class="ticket-container">
              <span class="ticket-cutter-1"></span>
              <span class="ticket-cutter-2"></span>
              <div class="row mx-0">
                <div
                  class="col-md-3"
                  :class="langName == 'ar' ? 'pr-0' : 'pl-0'"
                >
                  <!--                  <img
                    v-if="
                      TicketBookingDetails.Image !=
                        'https://api-dev.empirecinemas.com/' &&
                      TicketBookingDetails.Image
                    "
                    :src="TicketBookingDetails.Image"
                    class="img-fluid"
                    v-bind:alt="TicketBookingDetails.Title"
                  />-->
                  <img
                    v-if="
                      checkBaseUrl(
                        getLangSpecificAttribute(
                          TicketBookingDetails.movieTranslations,
                          getCurrentLang().brij_lang_id,
                          'artwork'
                        ) || TicketBookingDetails.artwork
                      )
                    "
                    :src="
                      checkBaseUrl(
                        getLangSpecificAttribute(
                          TicketBookingDetails.movieTranslations,
                          getCurrentLang().brij_lang_id,
                          'artwork'
                        ) || TicketBookingDetails.artwork
                      )
                    "
                    class="img-fluid"
                    v-bind:alt="TicketBookingDetails.Title"
                  />
                  <img
                    v-else
                    v-lazy="TicketBookingDetails.Image"
                    class="img-fluid"
                    v-bind:alt="TicketBookingDetails.Title"
                  />
                </div>
                <div class="col-md-6 py-2">
                  <div class="row">
                    <div class="col-12 px-0">
                      <div class="font-weight-bold">
                        {{
                          getLangSpecificAttribute(
                            TicketBookingDetails.movieTranslations,
                            getCurrentLang().brij_lang_id,
                            "mc_title"
                          ) ||
                            TicketBookingDetails.movie_title ||
                            TicketBookingDetails.original_title_of_movie ||
                            TicketBookingDetails.movie_name
                        }}
                      </div>
                      <div>
                        {{
                          TicketBookingDetails.cinema_name ||
                            TicketBookingDetails.cine_name
                        }}
                        {{
                          TicketBookingDetails.movie_format
                            ? `(${TicketBookingDetails.movie_format})`
                            : ""
                        }}
                        {{
                          movieLanguagesWithSubs(
                            TicketBookingDetails.movie_lang_name,
                            TicketBookingDetails.sub_1_iso_2,
                            TicketBookingDetails.sub_2_iso_2
                          )
                        }}
                      </div>
                    </div>
                    <div class="col-12 px-0">
                      <hr class="bg-danger bg-gold my-2" />
                    </div>
                    <div class="col-4 mb-3 pl-0">
                      <div class="font-weight-bold">
                        {{ allLanguageData.Screen }}
                      </div>
                      <div>{{ TicketBookingDetails.screen_name }}</div>
                    </div>
                    <div class="col-4 pl-0">
                      <div class="font-weight-bold">
                        {{ allLanguageData.Time }}
                      </div>
                      <div>
                        {{
                          moment(
                            TicketBookingDetails.ss_start_show_time,
                            "HH:mm"
                          ).format("HH:mm") || TicketBookingDetails.MovieTiming
                        }}
                      </div>
                    </div>
                    <div class="col-4">
                      <div class="font-weight-bold">
                        {{ allLanguageData.Date }}
                      </div>
                      <div>
                        {{
                          moment(TicketBookingDetails.show_date).format(
                            "DD MMM YYYY"
                          ) || TicketBookingDetails.MovieDate
                        }}
                      </div>
                    </div>
                    <div class="col-6 col-md-10 pl-0">
                      <div class="font-weight-bold">
                        {{ allLanguageData.Seats }}
                      </div>
                      <div>
                        <ul class="seat-list">
                          <li>{{ TicketBookingDetails.seat_names }}</li>
                        </ul>
                      </div>
                    </div>

                    <div
                      class="col-12 py-1 final-offer-text"
                      :class="
                        TicketBookingDetails.ticketdata.IsLoyaltybooking
                          ? 'red'
                          : 'green'
                      "
                      v-if="TicketBookingDetails.Offer"
                    >
                      <div
                        class="mr-2"
                        v-if="!TicketBookingDetails.ticketdata.IsLoyaltybooking"
                      >
                        <img src="@/assets/img/offer-icon.svg" alt="" />
                      </div>
                      <div>
                        {{ TicketBookingDetails.Offer }}
                        <span v-if="TicketBookingDetails.OfferDiscount > 0">
                          : {{ TicketBookingDetails.Currency }}
                          {{ TicketBookingDetails.OfferDiscount }}
                        </span>
                      </div>
                    </div>

                    <div
                      class="col-6 pl-0 pt-2"
                      v-if="TicketBookingDetails.ft_total_amount > 0"
                    >
                      <div class="font-weight-bold">
                        {{ allLanguageData.FnB }}
                      </div>
                      <div>
                        {{ TicketBookingDetails.fnb_items[0].ft_currency_name }}
                        {{ TicketBookingDetails.ft_total_amount }}
                      </div>
                    </div>

                    <div class="col-6 col-sm-4 col-md pt-2 pl-0">
                      <div class="font-weight-bold">&nbsp;</div>
                      <div>&nbsp;</div>
                    </div>
                  </div>
                </div>
                <div class="col-md-3 d-flex justify-content-around py-3">
                  <div class="d-md-none">
                    <img
                      v-lazy="TicketBookingDetails.Image"
                      class="rounded"
                      height="auto"
                      width="100px"
                    />
                  </div>
                  <div
                    class="
                      d-flex
                      h-100
                      align-items-center
                      flex-column
                      justify-content-around
                    "
                  >
                    <img
                      :src="TicketBookingDetails.qrcode"
                      height="auto"
                      width="100px"
                    />
                    <div class="text-center">
                      <div class="font-weight-bold">
                        {{ allLanguageData.BookingId }}
                      </div>
                      <div>{{ TicketBookingDetails.sb_booking_code }}</div>
                    </div>
                    <div
                      v-if="TicketBookingDetails.hasOwnProperty('FnbBookingId')"
                      class="text-center"
                    >
                      <div class="font-weight-bold">F&amp;B BOOKING ID</div>
                      <div>{{ TicketBookingDetails.FnbBookingId }}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- MOBILE TICKET -->
          <div class="d-md-none">
            <div class="col-12 mt-4 mb-4">
              <div class="m-ticket">
                <div class="row pt-4 pb-3 mx-0">
                  <div
                    v-if="preimere == true || preimere == 'true'"
                    class="col-6"
                    v-bind:class="langName == 'ar' ? 'text-right' : 'text-left'"
                  >
                    <img
                      src="@/assets/img/svg/emp-gold-bg-logo.svg"
                      class="img-fluid"
                    />
                  </div>
                  <div
                    v-else
                    class="col-6"
                    v-bind:class="langName == 'ar' ? 'text-right' : 'text-left'"
                  >
                    <img
                      src="@/assets/img/svg/ticket-logo.svg"
                      class="img-fluid"
                    />
                  </div>

                  <div
                    class="col-6 font-weight-bold lh-1_3 profile-mob-ticket"
                    v-bind:class="langName == 'ar' ? 'text-left' : 'text-right'"
                  >
                    {{ TicketBookingDetails.CinemaName }}
                  </div>
                </div>

                <img
                  v-lazy="TicketBookingDetails.HeaderImage"
                  class="img-fluid"
                  v-bind:alt="TicketBookingDetails.Title"
                />

                <div class="p-3">
                  <div class="row">
                    <div
                      class="col-7"
                      v-bind:class="langName == 'ar' ? 'pl-0' : 'pr-0'"
                    >
                      <span class="film-text">{{ allLanguageData.Film }}</span>
                      <p class="movie-n mb-0">
                        {{ TicketBookingDetails.Title }}
                      </p>
                      <div>
                        <span class="box-d px-1">
                          {{ TicketBookingDetails.Format }}
                        </span>
                        <span class="lang-s pl-1">
                          {{ TicketBookingDetails.Language }}
                        </span>
                      </div>

                      <div class="row py-3">
                        <div class="col-md-6 col-6">
                          <span class="film-text">
                            {{ allLanguageData.Screen }}
                          </span>
                          <p class="movie-n mb-0">
                            {{ TicketBookingDetails.ScreenName }}
                          </p>
                        </div>

                        <div class="col-6 px-0">
                          <span class="film-text">
                            {{ allLanguageData.Time }}
                          </span>
                          <p class="movie-n mb-0">
                            {{ TicketBookingDetails.MovieTiming }}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div class="col-5 text-right">
                      <img
                        :src="TicketBookingDetails.QRCode"
                        height="auto"
                        width="100px"
                      />
                    </div>
                  </div>

                  <div class="row">
                    <div class="col-7">
                      <span class="film-text">{{ allLanguageData.Seats }}</span>
                      <div class="movie-n">
                        <p class="movie-n mb-0">
                          {{ TicketBookingDetails.Seats }}
                        </p>
                      </div>
                    </div>

                    <div class="col-5">
                      <div class="float-right">
                        <span class="film-text">
                          {{ allLanguageData.BookingId }}
                        </span>
                        <p class="movie-n mb-0">
                          {{ TicketBookingDetails.bookingid }}
                        </p>
                      </div>
                    </div>
                    <div class="row">
                      <div
                        class="col-12 py-1 final-offer-text"
                        :class="
                          TicketBookingDetails.ticketdata.IsLoyaltybooking
                            ? 'red'
                            : 'green'
                        "
                        v-if="TicketBookingDetails.Offer"
                      >
                        <div
                          class="mr-2"
                          v-if="
                            !TicketBookingDetails.ticketdata.IsLoyaltybooking
                          "
                        >
                          <img src="@/assets/img/offer-icon.svg" alt="" />
                        </div>
                        <div>
                          {{ TicketBookingDetails.Offer }}
                          <span v-if="TicketBookingDetails.OfferDiscount > 0">
                            : {{ TicketBookingDetails.Currency }}
                            {{ TicketBookingDetails.OfferDiscount }}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div
                      v-if="TicketBookingDetails.hasOwnProperty('FnbBookingId')"
                      class="col-10"
                    >
                      <div class>
                        <span class="film-text">F&amp;B BOOKING ID</span>
                        <p class="movie-n mb-0">
                          {{ TicketBookingDetails.FnbBookingId }}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div class="row">
                    <div class="col-7">
                      <span class="film-text">
                        {{ allLanguageData.PicupCode }}
                      </span>
                      <div class="movie-n">
                        <p class="movie-n mb-0">
                          {{ TicketBookingDetails.pickupcode }}
                        </p>
                      </div>
                    </div>

                    <div class="col-5">
                      <div
                        v-if="TicketBookingDetails.FNB_amount > 0"
                        class="float-right"
                      >
                        <span class="film-text">{{ allLanguageData.FnB }}</span>
                        <p class="movie-n mb-0">
                          {{ TicketBookingDetails.FNB_amount }}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <span class="half-c"></span>
              </div>
            </div>
          </div>

          <!-- LOYALTY DATA -->
          <!-- <div class="mt-3 loyaltyData">
            <div class="table-responsive">
              <table class="table small mb-0 table-bordered w-100 text-white">
                <thead>
                  <tr>
                    <th scope="col">{{ allLanguageData.Earnedpoint }}</th>
                    <th scope="col">{{ allLanguageData.Redeempoints }}</th>
                    <th scope="col">{{ allLanguageData.Redeempointsvalue }}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{{ loyaltyData.Earenedpoint || 0 }}</td>
                    <td>{{ loyaltyData.redeempoint || 0 }}</td>
                    <td>{{ loyaltyData.redeempointvalue || 0 }}</td>
                  </tr>
                </tbody>
              </table>
            </div>

          </div> -->
        </div>
      </b-modal>
    </section>

    <b-modal
      no-close-on-esc
      no-close-on-backdrop
      id="updateProfileReminder"
      ref="updateProfileReminder"
      title="Update Profile"
      class="ErModal light-red-color"
    >
      <h6 class="pt-3 mb-0 text-center font-weight-bold text-white">
        {{ allLanguageData.updateProfileText }}
      </h6>
      <b-button
        @click="redirectToMyaccount('account')"
        variant="default"
        class="btn btn-green mt-4 mb-3"
      >
        Update
      </b-button>
    </b-modal>
  </div>
</template>
<script>
import { makeRequest, makeRequestBrij } from "@/helper/internet.js";
import { TokenService, UserService } from "@/services/storage.service";
import { EventBus } from "@/main";
import RangeSlider from "vue-range-slider";
import { URL_BASE } from "@/helper/constant";
import OtpInput from "@/components/OTP/OtpInput.vue";
import contryCodes from "@/helper/contryCodes.js";
import axios from "axios";

// you probably need to import built-in style
import "vue-range-slider/dist/vue-range-slider.css";
import { countries } from "../../helper/collection";
import moment from "moment";

export default {
  components: {
    RangeSlider,
    OtpInput
  },
  data() {
    return {
      contryList: contryCodes,
      resultsExample: null,
      mobileVerified: true,
      contryOptions: [
        // { value: null, text: 'Please select Country', disabled: true },
      ],
      cityOptions: [
        // { value: null, text: 'Please select City', disabled: true },
      ],
      selectedCountry: "966",
      selectedCountryCode: "966",

      SelectedCity: "Select City",
      citySelect: null,
      countrySelect: null,
      bindProps: {
        mode: "auto",

        // defaultCountry: "SA",
        disabledFetchingCountry: false,
        disabled: false,
        disabledFormatting: true,
        placeholder: "Enter a phone number",
        required: false,
        enabledCountryCode: true,
        enabledFlags: true,
        preferredCountries: ["SA", "LB", "IQ"],
        onlyCountries: [],
        ignoredCountries: [],
        autocomplete: "off",
        name: "telephone",
        maxLen: 9,
        wrapperClasses: "",
        inputClasses: "",
        dropdownOptions: {
          disabledDialCode: false
        },
        inputOptions: {
          showDialCode: false
        }
      },
      URL_BASEImg: URL_BASE + "/",
      isMobileChange: false,
      errorMessage: "",
      FinalMessage: "",
      uplodedUserPic: "",
      OldPasswordType: "",
      NewPasswordType: "",
      imageee: "",
      aaa: true,
      isCheckPassword: 0,
      selected: "",
      isPasswordIncorrect: true,
      isPasswordCorrect: false,
      sliderValue: 50,
      clubEmpire: false,
      booking: true,
      account: false,
      preferencess: false,
      tabLocate: 0,
      tabMember: 0,
      loyalityPopUpMessage: "",
      title: "My Profile Page",
      preimere: false,
      userOtp: null,
      isEdit: true,
      msg: "",
      errorMsg: "",
      UserNewNumber: "",
      LoyaltyMemberinfo: [],
      LoyaltyMemberHistoryLog: [],
      TicketBookingDetails: [],
      loyaltyData: [],
      profileDetails: {},
      genreList: [],
      cinemaList: [],
      languageList: [],
      bookingDetails: [],
      expeirdBookings: [],
      upComingBookings: [],
      preferenceCinemaList: [],
      preferenceExperiencesList: [],
      preferenceFoodList: [],
      AddPreferenceMessage: "",
      upComingBookingData: [],
      expeirdBookingData: [],
      birthDate: "",
      OldMobileNumber: "",
      // birthDate: {
      //   date1: "01",
      //   month: "Jan",
      //   year: "2019",
      // },
      months: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "June",
        "July",
        "Aug",
        "Sept",
        "Oct",
        "Nov",
        "Dec"
      ],
      years: [],
      age: "",
      message: "",
      selectedCountry: "SA"
    };
  },

  watch: {
    "profileDetails.countryid": {
      handler(newCountry, oldCountry) {
        console.log(this.profileDetails.countryid, "bfgfd");
        this.profileDetails.countryid = newCountry;
        // this.profileDetails.City = this.profileDetails.City
        //   ? this.profileDetails.City
        //   : null;
        this.fetchCities(newCountry.value);
        // this.cityOptions.push({
        //   value: null,
        //   text: "Please select City",
        //   disabled: true,
        // });
      }
    },
    resultsExample: {
      handler(value) {
        console.log(value);
        this.isValidNumber = value.isValid;
        this.selectedCountryCode = value.countryCallingCode;
        console.log(this.selectedCountryCode, "hdhdhsksksh");
      }
    }
  },

  computed: {
    getSelectedBrijCinemas() {
      return this.$store.getters.getSelectedBrijCinemas;
    },
    getPreferencesOptions() {
      return this.$store.getters.getPreferencesOptions;
    },
    getBrijCinemas() {
      return this.$store.getters.getBrijCinemas;
    },
    getUserHistory() {
      return this.$store.getters.getUserHistory;
    },
    // selectedCountry() {
    //   // let ISOcode = .toString();
    //   this.$forceUpdate();
    //   return this.profileDetails && this.profileDetails.CountryISOCode
    //     ? this.profileDetails.CountryISOCode.toString()
    //     : "";
    // },
    isLoyaltyMemebrValue() {
      return !(
        this.profileDetails.isLoyaltyMember == "1" ||
        this.profileDetails.isLoyaltyMember == 1
      );
    },
    CurrentCard() {
      if (this.LoyaltyMemberinfo.TierType === "RED") {
        return "red-card";
      } else if (this.LoyaltyMemberinfo.TierType === "BRONZE") {
        return "bronze-card";
      } else if (this.LoyaltyMemberinfo.TierType === "SILVER") {
        return "silver-card";
      } else if (this.LoyaltyMemberinfo.TierType === "GOLD") {
        return "gold-card";
      }
    },
    mProgressBar() {
      let percentage = 33.33;
      if (
        this.LoyaltyMemberinfo.TotalEarnedPoints <=
        this.LoyaltyMemberinfo.RedPoints
      ) {
        let value = this.LoyaltyMemberinfo.RedPoints / percentage;
        return this.LoyaltyMemberinfo.TotalEarnedPoints / value;
      } else if (
        this.LoyaltyMemberinfo.TotalEarnedPoints <=
        this.LoyaltyMemberinfo.BronzPoints
      ) {
        let value =
          (this.LoyaltyMemberinfo.BronzPoints -
            this.LoyaltyMemberinfo.RedPoints) /
          percentage;
        return (
          (this.LoyaltyMemberinfo.TotalEarnedPoints -
            this.LoyaltyMemberinfo.RedPoints) /
            value +
          percentage
        );
      } else if (
        this.LoyaltyMemberinfo.TotalEarnedPoints <=
        this.LoyaltyMemberinfo.SliverPoints
      ) {
        let value =
          (this.LoyaltyMemberinfo.SliverPoints -
            this.LoyaltyMemberinfo.BronzPoints) /
          percentage;
        return (
          (this.LoyaltyMemberinfo.TotalEarnedPoints -
            this.LoyaltyMemberinfo.BronzPoints) /
            value +
          percentage * 2
        );
      } else {
        return 100;
      }
    },
    LoyaltyCustomerVerfiy() {
      return localStorage.getItem("LoyaltyCustomerVerfiy");
    }
  },
  metaInfo() {
    return {
      title: this.title
    };
  },
  beforeCreate: function() {
    let pre = window.localStorage.getItem("PREIMERE");
    if (pre == null || pre == "false" || pre == false) {
      // document.body.className = "img-section";
    } else {
      // document.body.className = "gold-img-section";
    }
  },

  updated: function() {
    // console.log('parameter check', this.profileDetails.countryid, this.contryOptions)
    // this.profileDetails.countryid = this.contryOptions.find(option => option.value === this.profileDetails.countryid);
    // console.log('mouted contry',this.profileDetails.countryid)
    // EventBus.$on("pTabChange", payload => {
    // });
    // setTimeout(() => {
    //   if (this.profileDetails.Nationality && this.profileDetails.Gender) {
    //     //do something
    //   } else {
    //     this.$refs.updateProfileReminder.show();
    //   }
    // }, 1000);

    let getTab = localStorage.getItem("changeTabProfile");
    if (getTab > 0) {
      this.tabLocate = 3;
    }
    if (this.langName == "ar") {
      this.title = "ملفي الشخصي الصفحة";
    }
    this.preimere = window.localStorage.getItem("PREIMERE");
    // sessionTimeOut
  },

  beforeDestroy() {
    localStorage.removeItem("profileTabType");
    localStorage.setItem("changeTabProfile", 0);
  },

  beforeMount() {
    let tabType = localStorage.getItem("profileTabType");
    this.ChangeProfileTabs(tabType, 0);
    this.fetchProfileDetails();
    this.$store.dispatch("fetchBrijPrefOptions");
    // this.fetchGenreList()
    // this.fetchLanguageList()
    // this.fetchBookingHistoryDetails()
    // this.fetchCinemaList()
    // this.fetchPreferenceCinemaList()
    // this.fetchPreferenceExperiencesList()
    // this.fetchPreferenceFoodList()
    for (var i = new Date().getFullYear(); i > 1900; i--) {
      this.years.push(i);
    }

    let user = UserService.getUserProfile();
    console.log({ user });
    if (user && user.UserID) {
      this.$store.dispatch("fetchUserHistory", user.UserID);
    }
  },
  methods: {
    moment,
    linkMobile() {
      this.showLoading();
      const payload = {
        change_number: this.profileDetails.Mobile.trim()
          .split(" ")
          .join(""),
        resend_otp: "",
        verification_id: localStorage.getItem("verification_id")
      };
      makeRequestBrij("/api/cinema/verify-user", "POST", null, payload)
        .then(result => {
          const { error, res } = result;
          console.log(res.data, "Records");
          if (res.data.status) {
            this.$router.push({
              path: "/phoneOtp"
            });
          }
          this.hideLoading();
        })
        .catch(error => {});
    },
    // onChangeMobileNum: function ({ number, isValid, country }) {
    //   this.isMobileChange = true;
    // },
    onDropdownCountry(country) {
      this.SelectedCountry = country.text;
      this.profileDetails.CountryID = country.value;
    },
    onDropdownCity(city) {
      console.log(city);
      this.SelectedCity = city.text;
    },
    fetchContries() {
      makeRequestBrij("/api/external/countries/", "GET", null, null)
        .then(result => {
          const { error, res } = result;
          // const { data } = res.data
          // console.log(res.data, 'res.data')

          this.contryOptions = res.data.data.map(z => {
            return { value: z.country_id, text: z.country_name };
          });

          // console.log('parameter check', this.profileDetails.countryid, this.contryOptions)
          this.profileDetails.countryid = this.contryOptions.find(
            option => option.value === this.profileDetails.countryid
          );
          // console.log('mouted contry', this.profileDetails.countryid)
          // this.contryOptions.push({
          //   value: null,
          //   text: 'Please select Country',
          //   disabled: true,
          // })
        })
        .catch(err => console.log(err));
    },
    fetchCities(countryId) {
      var config = {
        method: "get",
        url: `${
          this.BrijBaseUrl
        }/api/admin/tablelist/ms_states?state_is_active=Y&country_id=${countryId}`
      };
      this.cityOptions = [];

      axios(config).then(result => {
        const { error, data } = result;
        if (data.Records && data.Records.length) {
          console.log(this.cityOptions, "hdhdhdhd", this.profileDetails.City);
          this.cityOptions = data.Records.map(val => {
            return {
              value: val.state_id || "",
              text: val.state_name || ""
            };
          });
          this.profileDetails.City = this.cityOptions.find(
            option => option.value === this.profileDetails.City
          );

          // console.log(this.cityOptions, 'dasdasd')
        }
      });
    },

    redirectToMyaccount(type) {
      this.$refs.updateProfileReminder.hide();
      localStorage.setItem("profileTabType", type);
      this.$nextTick(() => {
        this.ChangeProfileTabs(type, 1);
      });
      localStorage.setItem("changeTabProfile", 3);
    },

    onChangeMobileNum: function(newNumber) {
      if (newNumber == this.OldMobileNumber) {
        this.isMobileChange = false;
      } else {
        this.isMobileChange = true;
      }
    },
    onOTPValue: ({ ...payload }) => {
      // this.NewOTP = payload.value;
    },
    resetVerifyUserErrors(event) {},
    openBookingDetails(value, type) {
      if (type == "upComing") {
        this.upComingBookingData = this.upComingBookings[value];
        // this.$refs.expeirdBookingDetails.hide();
        // this.$refs.upComingBookingDetails.show();
      } else if (type == "expeird") {
        this.expeirdBookingData = this.expeirdBookings[value];
        // this.$refs.upComingBookingDetails.hide();
        // this.$refs.expeirdBookingDetails.show();
      }
    },

    openBookedTicket(val, type) {
      this.TicketBookingDetails = [];

      this.$nextTick(() => {
        this.$refs.TicketDetailsModal.show();
        this.TicketBookingDetails = val;
        this.loyaltyData = val.loyaltydata;
      });
    },
    onInput(formattedNumber, { number, valid, country }) {
      this.UserNewNumber = formattedNumber;
      console.log(this.UserNewNumber);
      this.profileDetails.CountryCode = country.dialCode;
    },
    // onInputVerify(formattedNumber, { number, valid, country }) {
    //   // this.profileDetails.Mobile = formattedNumber;
    //   this.profileDetails.CountryCode = country.dialCode;
    // },

    filesChange(file, path) {
      console.log(
        "name, filename, filename, filename, file :>> ",
        file[0].name
      );
    },
    ChangeProfileTabs(value, type) {
      if (type == 1 || type == "1") {
        localStorage.setItem("profileTabType", value);
      }
      if (value === "clubEmpire") {
        this.clubEmpire = true;
        this.booking = false;
        this.account = false;
        this.preferencess = false;
      } else if (value === "booking") {
        this.clubEmpire = false;
        this.booking = true;
        this.account = false;
        this.preferencess = false;
      } else if (value === "account") {
        this.clubEmpire = false;
        this.booking = false;
        this.account = true;
        this.preferencess = false;
      } else if (value === "preferencess") {
        this.clubEmpire = false;
        this.booking = false;
        this.account = false;
        this.preferencess = true;
      }
    },
    changeTabMember() {
      this.tabMember = 2;
    },
    verifiedAccount() {
      localStorage.setItem("LoyaltyCustomerVerfiy", 1);
      window.location.reload(true);
    },
    successClosed() {
      // this.$refs.successPopup.hide();
      this.$refs.loyalityPopup.hide();
    },
    editUserNumber: function() {
      this.isEdit = false;
    },
    verifyUserForLp: function(value) {
      // if (data == "ResendOtp") {
      //   this.$refs.resendOtpPoup.show();
      // }

      let token = TokenService.getToken();
      let payload = {
        Email: this.profileDetails.Email,
        Mobile: this.UserNewNumber
          ? this.UserNewNumber.trim()
              .split(" ")
              .join("")
          : this.profileDetails.Mobile,
        // CountryCode: this.profileDetails.Default.CountryCode,
        CountryCode: this.profileDetails.CountryCode,
        CinemaType: "normal",
        LanguageID: this.profileDetails.LanguageID,
        CountryID: this.profileDetails.Default.CountryID,
        // CountryID: this.profileDetails.CountryID,
        Action: value,
        FirstName: this.profileDetails.FirstName,
        LastName: this.profileDetails.LastName,
        Birthdate: this.profileDetails.Birthdate,
        Gender: this.profileDetails.Gender,
        UserID: this.profileDetails.UserID,
        TheatreId: 3,
        OTP: ""
      };

      // console.log("payload :>> 1111111111", payload);
      // 2
      makeRequest("/LoyaltyCustomer/", "POST", null, payload)
        .then(result => {
          const { error, res } = result;
          const { data } = res.data;
          if (!error && res.data.Status) {
            this.$refs.verifyAccount.show();
            if (value == "ResendOtp") {
              this.errorMsg = res.data.vallidateuserdata[0].ErrMessage;
            }
          } else {
            this.loyalityPopUpMessage = res.data.Message;
            this.$refs.loyalityPopup.show();
          }
        })
        .catch(error => {
          this.message = "Something went wrong";
        });
    },
    // 1
    finalVerifyUserForLp: function() {
      this.errorMsg = "";
      let token = TokenService.getToken();
      let payload = {
        Email: this.profileDetails.Email,
        Mobile: (this.UserNewNumber || "")
          .trim()
          .split(" ")
          .join(""),
        CountryCode: this.profileDetails.Default.CountryCode,
        CinemaType: "normal",
        LanguageID: this.profileDetails.LanguageID,
        CountryID: this.profileDetails.Default.CountryID,
        Action: "NewUser",
        FirstName: this.profileDetails.FirstName,
        LastName: this.profileDetails.LastName,
        Birthdate: this.profileDetails.Birthdate,
        // Birthdate:
        //   this.birthDate.date1 +
        //   "-" +
        //   this.birthDate.month +
        //   "-" +
        //   this.birthDate.year,

        Gender: this.profileDetails.Gender,
        UserID: this.profileDetails.UserID,
        TheatreId: 3,
        OTP: this.userOtp
      };

      console.log("payload :>> ", payload);
      // 1
      makeRequest("/LoyaltyCustomer/", "POST", null, payload)
        .then(result => {
          const { error, res } = result;
          const { data } = res.data;
          if (!error && res.data.Status) {
            this.msg =
              res.data.Message == ""
                ? "Account Verified. You are join for loyality program."
                : res.data.Message;
            this.$refs.verifyAccount.hide();
            this.$refs.updatedPopup.show();
          } else {
            this.errorMsg = res.data.Message;
          }
        })
        .catch(error => {
          this.errorMsg = "Something went wrong";
        });
    },
    LoyaltyMemberDetails: function() {
      let token = TokenService.getToken();
      let payload = {
        CinemaType: "normal",
        LanguageID: this.profileDetails.LanguageID,
        CountryID: this.profileDetails.Default.CountryID,
        TheatreId: 3
      };
      console.log("payloadpayload :>> ", payload);
      makeRequest("/LoyaltyMemberDetails", "POST", token, payload)
        .then(result => {
          const { error, res } = result;
          const { data } = res.data;
          if (!error) {
            console.log(" res.data res.data :>> ", res.data);
            this.LoyaltyMemberinfo = res.data;
            // this.LoyaltyMemberinfo.TotalEarnedPoints = 15000;
            this.LoyaltyMemberinfo.TierType = this.LoyaltyMemberinfo.TierType.toUpperCase();

            // this.redLevel = res.data.filter(x =>{
            //   return x.
            // })
          }
        })
        .catch(error => {
          console.log("Error on vue front", error);
        });
    },

    LoyaltyMemberHistory: function() {
      let token = TokenService.getToken();
      this.LoyaltyMemberHistoryLog = [];
      let payload = {
        CinemaType: "normal",
        LanguageID: this.profileDetails.LanguageID,
        CountryID: this.profileDetails.Default.CountryID,
        TheatreId: 3,
        Type: "ALL"
      };
      console.log("LoyaltyMemberHistory :>> ", payload);
      makeRequest("/LoyaltyMemberHistory", "POST", token, payload)
        .then(result => {
          const { error, res } = result;
          const { data } = res.data;
          if (!error) {
            console.log(" LoyaltyMemberHistory ", res.data);
            if (res.data.hasOwnProperty("PointsList")) {
              let obj = {
                title: "All",
                dataNew: res.data.PointsList
              };

              this.LoyaltyMemberHistoryLog.push(obj);

              let type_ar = ["All"];
              res.data.PointsList.map(x => {
                let checkIndex = type_ar.indexOf(x.points_type);
                if (checkIndex >= 0) {
                  this.LoyaltyMemberHistoryLog[checkIndex]["dataNew"].push(x);
                } else {
                  let obj1 = {
                    title: x.TrnTypedisplay,
                    dataNew: [x]
                  };
                  type_ar.push(x.points_type);
                  this.LoyaltyMemberHistoryLog.push(obj1);
                }
              });
              // console.log(object);
            }
          }
        })
        .catch(error => {
          console.log("Error on vue front", error);
        });
    },

    onGenderChange: function(value) {
      this.profileDetails.Gender = value;
    },
    selectPreference: function(item, selectedPreference) {
      let payload = {
        ID: item.ID,
        PreferenceType: selectedPreference
      };
      if (item.selected == false) {
        payload.Active = 1;
      } else {
        payload.Active = 0;
      }
      makeRequest("/AddPreferences", "POST", null, payload)
        .then(result => {
          const { error, res } = result;
          const { data } = res.data;
          if (!error) {
            // Thank you pop up!
          }
        })
        .catch(error => {
          console.log("Error on vue front", error);
        });
    },
    onSelectDate: function(value, type) {
      if (type == "date") {
        this.birthDate.date1 = value;
      } else if (type == "month") {
        this.birthDate.month = value;
      } else if (type == "year") {
        this.birthDate.year = value;
      }
      this.getAge(
        this.birthDate.year +
          "/" +
          this.birthDate.month +
          "/" +
          this.birthDate.date1
      );
    },
    getAge: function(dateString) {
      var today = new Date();
      var birthDate = new Date(dateString);
      this.age = today.getFullYear() - birthDate.getFullYear();
      var m = today.getMonth() - birthDate.getMonth();
      // console.log('m,age,birthDate :', m,age,birthDate);
      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        this.age = this.age--;
      }
    },
    fetchProfileDetails: function() {
      this.showLoading();
      let token = TokenService.getToken();
      makeRequestBrij(
        `/api/external/get-user-details/${token}`,
        "GET",
        null,
        null
      )
        .then(result => {
          const { error, res } = result;
          res.data.EmpireData = res.data.EmpireData || {};
          const { data } = res.data;
          if (!error) {
            const details = { ...res.data };
            console.log("details:::: :>> ", details);
            this.profileDetails = { ...res.data.EmpireData };

            this.profileDetails.countryid =
              res.data.EmpireData.countryid == 230
                ? 194
                : res.data.EmpireData.countryid;
            localStorage.setItem(
              "profile_detail",
              JSON.stringify(this.profileDetails)
            );
            localStorage.setItem(
              "verification_id",
              this.profileDetails.verification_id
            );
            this.fetchContries();

            this.OldMobileNumber = res.data.EmpireData.Mobile;
            // console.log('profile', this.profileDetails)
            // const a = this.contryList.find(
            //   (o) => o.phonecode == this.profileDetails.CountryCode,
            // ).isoCode
            // console.log(a, 'kkjhhh')

            this.profileDetails["personalnotification"] =
              res.data.EmpireData.personalnotification == "1";
            this.profileDetails["movienotification"] =
              res.data.EmpireData.movienotification == "1";

            if (res.data.EmpireData.verfiymobile) {
              this.mobileVerified = true;
            } else {
              this.mobileVerified = false;
            }

            let CountryISOText = res.data.EmpireData.CountryISOCode
              ? res.data.EmpireData.CountryISOCode.toUpperCase()
              : null;
            this.profileDetails.CountryISOCode = CountryISOText
              ? CountryISOText.toString()
              : null;
            this.selectedCountry = CountryISOText
              ? CountryISOText.toString()
              : "";
            this.hideLoading();

            // this.$nextTick(() => {
            //   this.$forceUpdate();
            // });

            this.UserNewNumber = res.data.EmpireData.Mobile;
            this.LoyaltyMemberDetails();
            this.LoyaltyMemberHistory();
            if (this.profileDetails.Nationality && this.profileDetails.Gender) {
              // do something
            } else {
              this.$refs.updateProfileReminder.show();
            }
            // if (this.profileDetails.Birthdate.length > 0) {
            //   this.birthDate.date1 = this.profileDetails.Birthdate.split(
            //     "-"
            //   )[0];
            //   this.birthDate.month = this.profileDetails.Birthdate.split(
            //     "-"
            //   )[1];
            //   this.birthDate.year = this.profileDetails.Birthdate.split("-")[2];
            //   this.getAge(
            //     this.birthDate.year +
            //       "/" +
            //       this.birthDate.month +
            //       "/" +
            //       this.birthDate.date1
            //   );
            // }
          }
        })
        .catch(error => {
          console.log("Error on vue front", error);
        });
    },

    fetchGenreList: function() {
      let token = TokenService.getToken();
      makeRequest("/GenrePrefList", "POST", token, null)
        .then(result => {
          const { error, res } = result;
          const { data } = res.data;
          if (!error) {
            this.genreList = res.data.GenreList;
          }
        })
        .catch(error => {
          console.log("Error on vue front", error);
        });
    },
    fetchLanguageList: function() {
      makeRequest("/LanguagePrefList", "POST", null, null)
        .then(result => {
          const { error, res } = result;
          const { data } = res.data;
          if (!error) {
            this.languageList = res.data.LanguageList;
          }
        })
        .catch(error => {
          console.log("Error on vue front", error);
        });
    },
    fetchCinemaList: function() {
      makeRequest("/CinemaPrefList", "POST", null, null)
        .then(result => {
          const { error, res } = result;
          const { data } = res.data;
          if (!error) {
            this.cinemaList = res.data.CinemaList;
          }
        })
        .catch(error => {
          console.log("Error on vue front", error);
        });
    },
    fetchPreferenceCinemaList: function() {
      // this.showLoading();
      makeRequest("/CinemaPrefList", "POST", null, null)
        .then(result => {
          const { error, res } = result;
          const { data } = res.data;
          if (!error) {
            this.preferenceCinemaList = res.data.CinemaList;
            // this.hideLoading();
          }
        })
        .catch(error => {
          console.log("Error on vue front", error);
        });
    },
    fetchPreferenceExperiencesList: function() {
      makeRequest("/ExperiencePrefList", "POST", null, null)
        .then(result => {
          const { error, res } = result;
          const { data } = res.data;
          if (!error) {
            this.preferenceExperiencesList = res.data.ExpList;
          }
        })
        .catch(error => {
          console.log("Error on vue front", error);
        });
    },
    fetchPreferenceFoodList: function() {
      makeRequest("/FoodPrefList", "POST", null, null)
        .then(result => {
          const { error, res } = result;
          const { data } = res.data;
          if (!error) {
            this.preferenceFoodList = res.data.GenreList;
          }
        })
        .catch(error => {
          console.log("Error on vue front", error);
        });
    },

    AddPreference: function(id, active, type, itemSelected) {
      let cust_id = itemSelected.cust_id;
      let user = UserService.getUserProfile();
      if (user && user.UserID && !cust_id) {
        cust_id = user.UserID;
      }

      let payload = {
        cust_id,
        active,
        pref_id: itemSelected.pref_id,
        pref_type:
          itemSelected.pref_type ||
          (type == "Cinema" ? 1 : type == "expeience" ? 2 : 3),
        selection_id:
          type == "Cinema"
            ? itemSelected.cine_id
            : type == "expeience"
            ? itemSelected.mf_id
            : itemSelected.item_id
      };

      makeRequestBrij(`/api/cinema/user-prefs`, "POST", null, payload).then(
        result => {
          // console.log({result})
        }
      );
    },

    uploadFile(event) {
      let that = this;
      let formData = new FormData();
      let token = TokenService.getToken();
      formData.append("image", event.target.files[0]);
      axios
        .post(this.BrijBaseUrl + "/upload-profile/" + token, formData, {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        })
        .then(res => {
          console.log(res, "function");
          this.profileDetails.Profileimage = res.data.path;
        })
        .catch(function(err) {
          console.log("err :>> ", err);
        });
    },

    // uploadFile(e) {
    //   var files = e.target.files || e.dataTransfer.files;
    //   if (!files.length) return;
    //   this.createImage(files[0]);
    // },
    // createImage(file) {
    //   var imageee = new Image();
    //   var reader = new FileReader();
    //   var vm = this;

    //   reader.onload = (e) => {
    //     vm.imageee = e.target.result;
    //   };
    //   reader.readAsDataURL(file);
    // },
    changePassword: function() {
      this.UpdateProfileDetails(1);
    },
    UpdateProfileDetails: function(value) {
      this.showLoading();

      this.isCheckPassword = value;
      console.log(
        "this.profileDetails.CountryCode ",
        this.profileDetails.CountryCode
      );
      // let payload = {
      //   FirstName: this.profileDetails.FirstName,
      //   LastName: this.profileDetails.LastName,
      //   Email: this.profileDetails.Email,
      //   CountryCode: this.selectedCountryCode || '966',
      //   // Mobile: this.profileDetails.Mobile,
      //   Mobile: this.UserNewNumber
      //     ? this.UserNewNumber.trim().split(' ').join('')
      //     : this.profileDetails.Mobile,
      //   Gender: this.profileDetails.Gender,
      //   Birthdate: this.profileDetails.Birthdate,
      //   checkpassword: this.isCheckPassword,
      //   Nationality: this.profileDetails.Nationality,
      //   personalnotification:
      //     this.profileDetails.personalnotification == true ? 1 : 0,
      //   movienotification:
      //     this.profileDetails.movienotification == true ? 1 : 0,
      //   Oldpassword: this.OldPasswordType,
      //   Newpassword: this.NewPasswordType,
      //   Profileimage: this.profileDetails.Profileimage,
      //   CountryID: this.profileDetails.CountryID,
      //   countryid: this.profileDetails.countryid.value,
      //   CityID: this.profileDetails.City.value,
      //   City: this.profileDetails.City.value,
      //   alert: 'on',
      // }

      console.log(this.profileDetails.Mobile, this.UserNewNumber);
      if (!this.resultsExample.isValid) {
        this.errorMessage = `Enter Valid Mobile Detail`;
        this.hideLoading();
        return;
      }
      let payloadNew = {
        email: this.profileDetails.Email,
        first_name: this.profileDetails.FirstName,
        last_name: this.profileDetails.LastName,
        phone_no: this.profileDetails.Mobile.trim()
          .split(" ")
          .join(""),
        country_id: this.profileDetails.countryid.value,
        dob: this.profileDetails.Birthdate,
        preferred_lang_id: 1,
        state_id: this.profileDetails.City.value,
        CountryCode: this.selectedCountryCode,
        personalnotification:
          this.profileDetails.personalnotification == true ? 1 : 0,
        movienotification:
          this.profileDetails.movienotification == true ? 1 : 0,
        gender: this.profileDetails.Gender,
        checkNumberChanged: this.UserNewNumber != this.profileDetails.Mobile
      };

      if (!this.isValidNumber) {
        this.errorMessage = `Mobile Number is invalid.`;
        this.hideLoading();
        return;
      }
      let token = TokenService.getToken();
      makeRequestBrij(
        `/api/external/update-user/${token}`,
        "POST",
        null,
        payloadNew
      )
        .then(result => {
          const { error, res } = result;
          const { data } = res.data;
          this.hideLoading();

          if (!error && res.data.status) {
            // this.profileDetails = res.data;
            // newData: {
            //   profileName: this.profileDetails.FirstName;
            //   profilePic: this.profileDetails.Profileimage;
            // }

            EventBus.$emit("updateProfile", this.profileDetails.FirstName);
            this.fetchProfileDetails();

            if (value == 0 || value == "0") {
              this.FinalMessage = res.data.messafe;
              this.isPasswordCorrect = true;
            } else {
              this.message = res.data.message;
              this.FinalMessage = "";
            }
            // this.successMessage = res.data.Message;

            if (value == 1) {
              this.isPasswordIncorrect = false;
              this.isPasswordCorrect = false;
            }
            if (value == 0) {
              this.NewPasswordType = "";
              this.OldPasswordType = "";
              this.message = "";
            }
          } else {
            if (value == 1) {
              this.isPasswordIncorrect = true;
              this.isPasswordCorrect = true;
            }
            this.errorMessage = res.data.Message;
          }

          // setTimeout(() => {
          //   this.hideLoading();
          // }, 10000);
        })
        .catch(error => {
          this.hideLoading();
          this.message = "Something went wrong";
          console.log("Error on vue front", error);
        });
      // 3
      makeRequest("/LoyaltyCustomer/", "POST", null, payload).then(result => {
        console.log(result);
      });
    },
    fetchBookingHistoryDetails: function() {
      let token = TokenService.getToken();
      makeRequest("/UserBookingHistory/", "POST", token, null)
        .then(result => {
          const { error, res } = result;
          const { data } = res.data;
          if (!error) {
            this.hideLoading();
            // this.bookingDetails = res.data.List;
            // this.bookingDetails.map(singleBooking1 => {
            //   singleBooking1.Seats = singleBooking1.Seats.split(",");
            // });
            // this.boookingDetails.ShowTime = this.boookingDetails.ShowTimeShowcategory
            this.expeirdBookings = res.data.List.filter(x => {
              return x.Showcategory == "Expeird Booking";
            });
            this.upComingBookings = res.data.List.filter(x => {
              return x.Showcategory !== "Expeird Booking";
            });
          }
          this.hideLoading();
        })
        .catch(error => {
          // this.hideLoading();
          console.log("Error on vue front", error);
        });
    }
  }
};
</script>

<style scoped>
body {
  border: none;
}
ul:focus {
  outline: none;
}
.footer {
  background-image: none !important;
}
.fs-12 {
  font-size: 12px;
}
.fs-13 {
  font-size: 13px;
}
.fs-14 {
  font-size: 14px;
}
.cursor-pointer {
  cursor: pointer;
}
.bg-gold {
  background: #e6be8a;
  color: black;
}
.points-tabs {
  display: block !important;
}
.lh-5 {
  line-height: 05px;
}
.lh-22 {
  line-height: 20px;
}
.bg-success-circle {
  border-radius: 50%;
  width: 36px;
  height: 36px;
  padding: 8px;
  background: #dbf5d9;
  border: 2px solid #dbf5d9;
  color: #666;
  text-align: center;
  line-height: 16px;
}
.bg-danger-circle {
  border-radius: 50%;
  width: 36px;
  height: 36px;
  padding: 8px;
  background: #fae7ec;
  border: 2px solid #fae7ec;
  color: red;
  text-align: center;
  line-height: 16px;
}
.accordian-box a[aria-expanded="true"]:after {
  content: "↑";
  font-size: 22px;
  float: right;
  transition: all 0.5s;
}
.accordian-box a[aria-expanded="false"]:after {
  content: "↓";
  font-size: 22px;
  float: right;
  transition: all 0.5s;
}

/*

  .profile-tabs .nav-tabs {
    justify-content: center;
    border-top: 1px dotted #fff;
    border-bottom: 1px dotted #fff;
  }

  .preference-tabs .nav-tabs {
    border-bottom: none;
  }

  .profile-tabs .nav-link,
  .preference-tabs .nav-tabs .nav-link {
    color: #810c13;
    font-weight: bold;
    border: none !important;
  }

  .profile-tabs .nav-link:hover,
  .profile-tabs .nav-link.active,
  .preference-tabs .nav-tabs .nav-link:hover,
  .preference-tabs .nav-tabs .nav-link.active {
    color: #fff;
    position: relative;
    background-color: transparent;
  } */

/* .profile-tabs .nav-link.active::after {
    left: 50%;
    content: "";
    height: 15px;
    width: 15px;
    display: block;
    bottom: -13px;
    position: absolute;
    border-right: 1px dotted #fff;
    border-bottom: 1px dotted #fff;
    transform: rotate(45deg) translateX(-50%);
    background: url("../../assets/img/svg/red-bg.svg") no-repeat center center;
    background-size: cover;
  }

  .profile-tabs .nav-link:focus,
  .profile-tabs .nav-link:hover {
    white-space: nowrap;
    border: none !important;
  } */

@media (max-width: 767px) {
  body {
    font-size: 14px;
  }

  .preference-tabs .tabs {
    display: flex;
    flex-wrap: wrap;
  }

  .profile-container {
    padding: 30px 20px;
    margin-bottom: 175px;
  }

  .profile-container .dotted-border-x {
    border-left: 0;
    border-right: 0;
  }

  /* .profile-tabs .nav {
    overflow-x: auto;
    overflow-y: hidden;
    display: flex;
    flex-wrap: nowrap;
    white-space: nowrap;
    justify-content: flex-start;
  } */

  .profile-container .form-row {
    margin-bottom: 25px;
  }

  .profile-container .content {
    width: 95%;
    padding-top: 0;
  }

  /* .fixed-save {
      padding: 0;
      display: flex;
      min-height: 100px;
      align-items: center;
    } */
}

@media (max-width: 576px) {
  .profile-container {
    padding: 25px 0;
  }

  .preference-tabs .nav {
    overflow-x: auto;
    flex-wrap: nowrap;
    margin-left: 10px;
    overflow-y: hidden;
    margin-right: 10px;
    white-space: nowrap;
  }
}

@media (max-width: 576px) {
  .lang-list li,
  .genre-list li,
  .prefCinema-list li {
    min-width: 85px;
  }

  .lang-list li label,
  .genre-list li label,
  .prefCinema-list li label {
    font-size: 10px;
  }
}
.ticket-container .ticket-cutter-1,
.ticket-container .ticket-cutter-2 {
  background: #cf1f2e;
}
</style>
