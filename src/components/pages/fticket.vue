<template>
  <div>
    <section class="container-fluid">
      <div class="col-12 col-md-11 mx-auto px-0 mt-5">
        <div class="centerTitle">
          <div class="d-flex justify-content-center align-items-center">
            <p class="title">10:00</p>
            <p class="text ml-3"><span class="d-block">TILL YOUR</span> BOOKING EXPIRES</p>
          </div>
        </div>

        <div class="col-12 col-sm-10 col-md-8 col-lg-6 col-xl-6 fticket-container">
          <div class="fticket-title">CONFIRMATION</div>
          <div class="col-12 p-3">
            <div class="d-flex justify-content-between mb-3">
              <div class="font-weight-bold">SUB-TOTAL</div>
              <div class="font-weight-bold">LBP 345.00</div>
            </div>
            <div class="d-flex justify-content-between">
              <div>Food & Bevrages X 27</div>
              <div>LBP 247.00</div>
            </div>
            <div class="d-flex justify-content-between mb-3">
              <div>Tickets X 2</div>
              <div>LBP 9.00</div>
            </div>
            <!-- <div class="d-flex justify-content-between">
              <div class="font-weight-bold">
                <b-form-checkbox id="checkbox-1" v-model="status" name="checkbox-1" value="accepted"
                  unchecked-value="not_accepted">
                  PAY VIA WALLET!
                </b-form-checkbox>
              </div>
              <div class="font-weight-bold">- SR 9.00</div>
            </div> -->
          </div>

          <!-- <div class="border-dotted-bottom"></div> -->



          <div class="col-12 p-3">
            <!-- <div class="d-flex justify-content-between">
              <div class="offer-collapse" v-b-toggle="'offers'">UNLOCK OFFFERS &amp; PROMOTION</div>
              <div>
                <img src="@/assets/img/svg/icon-gift.svg" height="auto" width="18px" alt="">
              </div>
            </div> -->


            <b-collapse id="offers">

              <div class="row">
                <div class="col-md-8 col-lg-9">
                  <ul class="list-unstyled mt-4 mb-0">
                    <li class="mb-2" v-for="(index, key) in 4" :key="key">
                      <div class="row">
                        <div class="col-md-3">
                          <!-- ADD CLASS SELECTED WHEN USER SELECTS AN OFFER -->
                          <div class="offer-title">OFFER 1</div>
                        </div>
                        <div class="col-md-9">
                          <!-- v-b-modal.offer-terms-condition -->
                          <a href="#" class="text-white small" >Offers terms &
                            conditions.</a>
                          <b-modal id="offer-terms-condition" title="Offfer Name Here">
                            <ul class="text-dark">
                              <li>condition 1</li>
                              <li>condition 2</li>
                              <li>condition 3</li>
                              <li>condition 4</li>
                            </ul>
                          </b-modal>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
                <div class="col-md-4 col-lg-3 d-flex flex-column justify-content-center text-right">
                  <div class="font-weight-bold ">- LBP 36.00</div>
                </div>
              </div>
            </b-collapse>
          </div>

          <div class="border-dotted-bottom"></div>

          <div class="col-12 p-3">
            <div class="d-flex justify-content-between">
              <div class="font-weight-bold">TOATAL PAYABLE</div>
              <div class="font-weight-bold">LBP 345.00</div>
            </div>
          </div>

        </div>
      </div>
    </section>

    <!-- FIXED FOOTER BOTTOM -->
    <section class="fixed-footer">
      <div class="col-lg-1 col-xl-1 d-flex justify-content-center align-items-center border-right">
        <router-link to="#">
          <img src="@/assets/img/svg/cheveron-circle-left.svg" class="img-fluid">
        </router-link>
      </div>
      <div class="col-lg-8 col-xl-8 border-right">
        <div class="d-flex align-items-center h-100">
          <div class="">
            <ol class="list-inline font-weight-bold">
              <li class="list-inline-item mr-xl-3">
                <span class="text-dark">1.</span>
                <span>AVENGERS: Endgame</span>
              </li>
              <li class="list-inline-item mr-xl-3">
                <span class="text-dark">2.</span>
                <span>DUBAI MALL</span>
              </li>
              <li class="list-inline-item mr-xl-3">
                <span class="text-dark">3.</span>
                <span>MON, 11 APRIL 2019</span>
              </li>
              <li class="list-inline-item mr-xl-3">
                <span class="text-dark">4.</span>
                <span>EXPERIENCE</span>
              </li>
              <li class="list-inline-item">
                <span class="text-dark">4.</span>
                <span>3:00 (2D)</span>
              </li>
            </ol>
            <div class="d-flex font-weight-bold">
              <div class="d-flex mr-5">
                <div class="text-dark mr-2">SEAT INFO :</div>
                <ul class="seat-list">
                  <li>J5</li>
                  <li>J6</li>
                  <li>J7</li>
                  <li>J8</li>
                </ul>
              </div>
              <div class="d-flex">
                <div class="text-dark mr-2">FOOD & BEVERAGES :</div>
                <ul class="food-list">
                  <li>
                    <span>1 x</span>
                    <span>Cola Cola</span>
                  </li>
                  <li>
                    <span>2 x</span>
                    <span>Chees Popcorn</span>
                  </li>
                  <li>
                    <span>2 x</span>
                    <span>Chees Popcorn</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-xl-1 d-flex justify-content-center align-items-center border-right">
        <div class="font-weight-bold text-center">TOTAL: <br> LBP 345.00</div>
      </div>
      <div class="col-xl-2 align-self-center text-center">
        <button v-on:click="redirectFunction('/confirmation')" class="btn-checkout">CHECKOUT</button>

        <!-- <router-linK to="/confirmation" class="btn-checkout">CHECKOUT</router-link> -->
      </div>
    </section>
  </div>
</template>



<script>
import { makeRequest } from '@/helper/internet.js'

export default {
  name: 'foodBeverage',
  components: {},
  metaInfo: {
    title: 'Food and Beverage',
    titleTemplate: null,
  },
  data () {
    return {

    }
  },
  methods: {
    redirectFunction: function (pathName) {
      this.$router.push({
        path: pathName,

      })
    },
    checkouttest: function () {
      makeRequest('/Payment', 'POST', null, null)
        .then(response => {
          const { error, res } = response
          if (!error) {

            //    window.location = res.data.links.requestUrl;

          } else {
            console.log('Response Error ')
          }
        })
    },
  },
}
</script>




<style scoped>
  footer {
    display: none;
  }

</style>
