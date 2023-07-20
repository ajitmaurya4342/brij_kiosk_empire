<template>
  <section class="container min-vh-100 py-5">
    <div class="col-12 px-0 px-md-3 col-xl-11 mx-auto">
      <div class="mb-5">
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
            <p>
              It’s free to join and easy to collect and redeem - the more you
              buy, the more you earn; watch your favourite films and be
              rewarded!
            </p>
            <p>
              We have created the most rewarding loyalty program around that
              gives you points on all your spending in Empire Cinemas. Whether
              it’s tickets, experiences or food and beverage you will get a
              points for every riyal you spend with us! Don’t forget to download
              the app so you can kep track of your points.
            </p>
            <p>
              Change the way you watch movies. Join Empire Cinemas today and
              watch the points add up quickly to free tickets, meals, discounts,
              exclusive offers and invites.
            </p>
          </div>
        </div>

        <div class="col-12 text-center my-4">
          <div class="btn emp-grey-btn" @click="onClickJoin()">JOIN US</div>
        </div>

        <div class="row hiw-cards">
          <!-- card start -->
          <div class="col-12 col-md-4 mb-4">
            <div class="py-4 px-3 px-lg-4 text-center hiw-body h-100">
              <img
                src="@/assets/img/newImages/Asset4.svg"
                height="75px"
                width="75px"
                alt=""
              />
              <div>
                <p class="hiw-title">SIGN UP FOR FREE</p>
                <p class="mb-0 hiw-text">
                  Join our fun and free Club Empire loyalty program!
                </p>
              </div>
            </div>
          </div>
          <!-- card end -->
          <div class="col-12 col-md-4 mb-4">
            <div class="py-4 px-3 px-lg-4 text-center hiw-body h-100">
              <img
                src="@/assets/img/newImages/Asset5.svg"
                height="75px"
                width="75px"
                alt=""
              />
              <div>
                <p class="hiw-title">SAR 1 SPENT = 1 CLUB EMPIRE POINT</p>
                <p class="mb-0 hiw-text">
                  Earn points on all your spending at Empire Cinemas, from
                  tickets to food, beverages and experiences. We’ll give you
                  points for all of it!
                </p>
              </div>
            </div>
          </div>
          <div class="col-12 col-md-4 mb-4">
            <div class="py-4 px-3 px-lg-4 text-center hiw-body h-100">
              <img
                src="@/assets/img/newImages/Asset6.svg"
                height="75px"
                width="75px"
                alt=""
              />
              <div>
                <p class="hiw-title">TRACK YOUR POINTS</p>
                <p class="mb-0 hiw-text">
                  Download the Empire Cinemas app to track your status and
                  points in real-time.
                </p>
              </div>
            </div>
          </div>
          <div class="col-12 col-md-4 mb-4 offset-0 offset-md-2">
            <div class="py-4 px-3 px-lg-4 text-center hiw-body h-100">
              <img
                src="@/assets/img/newImages/Asset7.svg"
                height="75px"
                width="75px"
                alt=""
              />
              <div>
                <p class="hiw-title">GET DISCOUNTS</p>
                <p class="mb-0 hiw-text">
                  Get exclusive offers only availble to our Club Empire members!
                </p>
              </div>
            </div>
          </div>
          <div class="col-12 col-md-4 mb-4">
            <div class="py-4 px-3 px-lg-4 text-center hiw-body h-100">
              <img
                src="@/assets/img/newImages/Asset8.svg"
                height="75px"
                width="75px"
                alt=""
              />
              <div>
                <p class="hiw-title">ENJOY EVENTS</p>
                <p class="mb-0 hiw-text">
                  Special Club Empire tiers will receive invites to exclusive
                  advanced movie screenings, menu tastings, events and
                  premieres.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div>
        <div class="row">
          <div class="col-12 col-md-1 mb-3 mb-md-0">
            <div
              class="d-block mt-3"
              style="background: red; height: 5px; width: 100%"
            ></div>
          </div>
          <div class="col-12 col-md-10">
            <h3 class="hiw-title">HOW CAN YOU USE YOUR POINTS?</h3>
            <p>
              The more you spend, the more you earn! You can use your points on
              anything avaiable at Empire Cinemas.
            </p>
          </div>
        </div>

        <div class="col-12 text-center my-4">
          <div class="btn emp-grey-btn" @click="onClickJoin()">JOIN US</div>
        </div>

        <div class="row hiw-cards">
          <div class="col-12 col-md-4 mb-4">
            <div class="py-4 px-3 px-lg-4 text-center hiw-body h-100">
              <img
                src="@/assets/img/newImages/Asset8.svg"
                height="75px"
                width="75px"
                alt=""
              />
              <div>
                <p class="hiw-title">FOOD &amp; BEVERAGE</p>
                <p class="mb-0 hiw-text">
                  Lorem Ipsum has been the industry's standard dummy text ever
                  since the 1500s.
                </p>
              </div>
            </div>
          </div>

          <div class="col-12 col-md-4 mb-4">
            <div class="py-4 px-3 px-lg-4 text-center hiw-body h-100">
              <img
                src="@/assets/img/newImages/Asset9.svg"
                height="75px"
                width="75px"
                alt=""
              />
              <div>
                <p class="hiw-title">EXPERIENCES</p>
                <p class="mb-0 hiw-text">
                  orem Ipsum has been the industry's standard dummy text ever
                  since the 1500s,
                </p>
              </div>
            </div>
          </div>
          <div class="col-12 col-md-4 mb-4">
            <div class="py-4 px-3 px-lg-4 text-center hiw-body h-100">
              <img
                src="@/assets/img/newImages/Asset10.svg"
                height="75px"
                width="75px"
                alt=""
              />
              <div>
                <p class="hiw-title">EMPIRE PREMIERE</p>
                <p class="mb-0 hiw-text">
                  orem Ipsum has been the industry's standard dummy text ever
                  since the 1500s,
                </p>
              </div>
            </div>
          </div>
          <div class="col-12 col-md-4 mb-4 offset-0 offset-md-2">
            <div class="py-4 px-3 px-lg-4 text-center hiw-body h-100">
              <img
                src="@/assets/img/newImages/Asset11.svg"
                height="75px"
                width="75px"
                alt=""
              />
              <div>
                <p class="hiw-title">MINIS</p>
                <p class="mb-0 hiw-text">
                  orem Ipsum has been the industry's standard dummy text ever
                  since the 1500s,
                </p>
              </div>
            </div>
          </div>
          <div class="col-12 col-md-4 mb-4">
            <div class="py-4 px-3 px-lg-4 text-center hiw-body h-100">
              <img
                src="@/assets/img/newImages/Asset12.svg"
                height="75px"
                width="75px"
                alt=""
              />
              <div>
                <p class="hiw-title">TINY FACTORY</p>
                <p class="mb-0 hiw-text">
                  orem Ipsum has been the industry's standard dummy text ever
                  since the 1500s,
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- <div class="navlink c-pointer border-x" v-if="loggedInFlag">
      <b-dropdown right variant="default" left :text="profileDetails.FirstName">
        <b-dropdown-item to="/profile">{{
          allLanguageData.Profile
        }}</b-dropdown-item>
        <b-dropdown-item v-on:click.stop="onUserLogout()">{{
          allLanguageData.Logout
        }}</b-dropdown-item>
      </b-dropdown>
    </div> -->

      <!-- <div
        class="new-emp-dropdown navlink c-pointer border-x"
        v-if="loggedInFlag"
      >
        <b-dropdown
          id="dropdown-right"
          right
          variant="primary"
          class="m-2"
          :text="profileDetails.FirstName"
        >
          <b-dropdown-item class="text-center mb-3 no-hover-effect" href="#">
            <img
              src="@/assets/img/svg/icon-profile.svg"
              height="65px"
              width="60px"
              alt=""
            />
            <div>SARAH</div>
          </b-dropdown-item>

          <b-dropdown-item class="p-0" href="#"
            ><hr class="m-0 fade-line"
          /></b-dropdown-item>

          <b-dropdown-item href="#">MY CLUB EMPIRE PONTS</b-dropdown-item>

          <b-dropdown-item class="p-0" href="#"
            ><hr class="m-0 fade-line"
          /></b-dropdown-item>

          <b-dropdown-item href="#">MY BOOKING</b-dropdown-item>

          <b-dropdown-item class="p-0" href="#"
            ><hr class="m-0 fade-line"
          /></b-dropdown-item>

          <b-dropdown-item href="#" to="/profile">MY ACCOUNT</b-dropdown-item>

          <b-dropdown-item class="p-0" href="#"
            ><hr class="m-0 fade-line"
          /></b-dropdown-item>

          <b-dropdown-item href="#">MY PREFERENCES</b-dropdown-item>

          <b-dropdown-item class="p-0" href="#"
            ><hr class="m-0 fade-line"
          /></b-dropdown-item>

          <b-dropdown-item href="#" v-on:click.stop="onUserLogout()"
            >LOG OUT</b-dropdown-item
          >
        </b-dropdown>
      </div> -->
    </div>
  </section>
</template>

<script>
import {
  LanguageService,
  CountryService,
  TokenService,
} from '@/services/storage.service'
import { EventBus } from '@/main'
export default {
  beforeMount () {
    let pre = window.localStorage.getItem('PREIMERE')
    if (pre == null || pre == 'false' || pre == false) {
      document.body.className = ''
    } else {
      document.body.className = 'gold-img-section'
    }
  },
  methods: {
    onClickJoin: function () {
      // let isLogin = window.localStorage.getItem("access_token");
      let isLogin = TokenService.getToken()
      if (isLogin) {
        localStorage.setItem('profileTabType', 'clubEmpire')
        this.$nextTick(() => {
          this.$router.push({ path: '/profile' })
        })
      } else {
        // this.$nextTick(() => {
        //   this.$router.push({ path: "/" });
        // });
        EventBus.$emit('isUserNotLogin')
      }
    },
  },
}
</script>

<style>
</style>
