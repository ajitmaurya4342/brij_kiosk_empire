<template>
  <div>
    <section class="container-fluid">
      <div class="col-12 col-md-11 px-0 mx-auto mt-5 ">
        <div class="centerTitle">
          <div class="d-flex justify-content-center align-items-center centerTitledot">
            <p class="title">10:00</p>
            <p class="text ml-1 ml-md-3"><span class="d-block">TILL YOUR</span> BOOKING EXPIRES</p>
          </div>
        </div>

        <div class="my-4 text-center cus-list mb-5">
          <p class="eTitle eTitlewhite"><img src="@/assets/img/svg/fb-icon.svg" class="img-fluid mr-2 pb-2">GRAB A BITE! <span class="selected-items">18 ITEMS</span></p>
          <!-- separator -->
          <div class="whitedotline-box w-100">
            <hr class="white-dotline"><span class="d-none"></span>
          </div>
          <!-- separator  END -->
          <ul class="list-inline fbCat">
            <li class="list-inline-item">ALL</li>
            <li class="list-inline-item active">BEST SELLERS</li>
            <li class="list-inline-item">NACHOS</li>
            <li class="list-inline-item">FRIES</li>
            <li class="list-inline-item">COLA</li>
            <li class="list-inline-item">BURGERS</li>
            <li class="list-inline-item">PIZZA</li>
            <li class="list-inline-item">BEVERAGES</li>
            <li class="list-inline-item mr-0">COFFEE</li>
          </ul>
          <!-- separator -->
            <div class="whitedotline-box w-100">
              <hr class="white-dotline"><span class="d-none"></span>
            </div>
            <!-- separator  END -->
        </div>

        <div class="row mx-0 foodBevrage">
          <div class="col-md-6 col-lg-4 col-xl-3 mb-3 mb-md-4" v-for="(fbBox, fb) in 10" :index="fb"  :key="fb">
            <div class="d-flex h-100">
              <div class="d-flex align-items-center">
                <img src="@/assets/img/Layer.png" alt="">
              </div>
              <div class="fbDetails">
                <div>
                  <p class="fb-name">BUTTER POPCORN<small class="text-lowercase ml-1">330 ml</small> </p>
                  <p class="fb-price">SR 12.00</p>
                </div>
                <div class="d-flex justify-content-end pr-0 pr-xl-3">
                  <!-- <div>
                    <img src="@/assets/img/svg/veg-icon.svg" class="img-fluid">
                    <img src="@/assets/img/svg/nonVeg-icon.svg" class="img-fluid d-none">
                  </div> -->
                  <div>
                    <div>
                      <div class="d-flex counter-box mr-0 mr-md-3" v-bind:class="langName == 'ar' ? 'ar-counter-box':''">
                        <button class="decrease" id="decrease" type="button" data-inc="-1">-</button>
                        <div class="output" id="output">0</div>
                        <button class="increase" id="increase" type="button" data-inc="1">+</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>


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
  components: {},

  beforeCreate: function () {
    let pre = window.localStorage.getItem('PREIMERE')
    if (pre == null || pre == 'false' || pre == false) {
      document.body.className = 'img-section'
    } else {
      document.body.className = 'gold-img-section'
    }
  },
  data () {
    return {}
  },
  beforeMount () {
    this.getAllFoodBeverage()
  },
  methods: {
    getAllFoodBeverage: function () {
      makeRequest('/GetFnBItems', 'POST', null, null)
        .then(response => {
          const { error, res } = response
          if (!error) {
            console.log('res', res)
          } else {
            console.log('Response Error ')
          }
        })
        .catch(error => {
          console.log('Error', error)
        })
    },
  },
}
</script>
