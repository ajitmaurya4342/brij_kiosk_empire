<template>
  <div>
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
        <b-button @click="$refs.modal.hide()" class="text-center mx-auto mt-3 btn-danger">CLOSE</b-button>
      </div>
    </b-modal>
    <!-- ERROR MODAL ENDS-->
    <div>
      <div class="h4 mt-3">{{ $tc("SomethingToSnackOn") }}</div>
      <div class="mt-4 mb-5">
        <ul class="list-inline fb-list mb-2">
          <li
            @click="onSelectfbItem(fbItem)"
            class="list-inline-item mx-2"
            :class="selectedName == fbItem.name ? 'active':''"
            v-for="(fbItem, num) in fnbItems"
            :key="num"
          >{{ fbItem.name }}
          </li>
        </ul>
        <p
          class="h4"
        >{{ selectedFbItem && selectedFbItem['items'] ? selectedFbItem.items.length : 0 }} Items</p>
      </div>
    </div>

    <section class="select-fnb">
      <div class="row mt-4">
        <div class="col-3 mb-5" v-for="(fbBox, box) in getArray()" :key="box">
          <div class="text-center fb-img-box mb-3">
            <img :src="URL_BASE+fbBox.image" alt width="164"/>
          </div>
          <div class="text-center">
            <div class="height-60px">
              <p class="mb-0">{{ fbBox.name }}</p>
              <p class="mb-0 small">SAR {{ fbBox.price }}</p>
            </div>
            <div class="counter-box">
              <button
                :class="fbBox['ItemQty'] == 0 ? 'disabled':''"
                v-on:click="onSelectFoodItem(fbBox,'subtract',box)"
                id="decrease"
                type="button"
                data-inc="-1"
                class="decrease"
              >-
              </button>
              <div id="output" class="output">{{ fbBox['ItemQty'] ? fbBox.ItemQty : 0 }}</div>
              <button
                v-on:click="onSelectFoodItem(fbBox,'add',box)"
                id="increase"
                :class="fbBox['ItemQty'] == 10 ? 'disabled':''"
                type="button"
                data-inc="1"
                class="increase"
              >+
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <router-link to @click.native="onBookFnb()" class="d-table mx-auto">
      <div class="btn-round">
        <div class="btn-content">
          <div>
            <div class="h2 font-weight-bold text-red">{{ $tc("Next") }}</div>
            <div class="h3 font-weight-bold">{{ $tc("ConfirmOrder") }}</div>
          </div>
        </div>
      </div>
    </router-link>

    <div class="mx-auto text-center">
      <ul class="list-inline mt-5">
        <li class="list-inline-item">
          <div class="d-flex align-items-center justify-content-center mx-auto">
            <div class="mr-3">
              <img src="@/assets/img/cart-icon.png" alt/>
            </div>
            <div>
              <p class="mb-0 h4">
                {{ count }} ITEM,
                <strong>SAR {{ total }}</strong>
              </p>
              <p class="mb-0 text-left">+ a</p>
            </div>
          </div>
        </li>
        <li class="list-inline-item font-weight-bold mx-5">OR</li>
        <li class="list-inline-item">
          <router-link
            :to="'/conf-booking/'+reserve_id"
            class="text-white h4"
          >{{ $tc("SkipToSummary") }}
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import fnbService from '@/services/fnbService.js'
import {BASEURL} from '@/config/index.js'

import {EventBus} from '@/main'

export default {
  name: 'Select Fnb',
  data () {
    return {
      reserve_id: null,
      total: 0,
      count: 0,
      URL_BASE: BASEURL,
      ErrorMessage: 'Something went wrong',
      fnbItems: [],
      selectedName: 'All',
      SelctedFnBArray: [],
      allFnbItems: [],
      selectedFbItem: {
        name: 'All'
      }
    }
  },
  mounted () {
    EventBus.$emit('startTimer')
  },
  beforeMount () {
    const {reserve_id} = this.$route.params
    this.reserve_id = reserve_id
    this.getFnbItems(reserve_id)
  },
  methods: {
    getArray () {
      let array = this.fnbItems.filter(x => x.name === this.selectedName)
      return array.length > 0 ? array[0].items : []
    },
    getFnbItems: function (reserve_id) {
      let loader = this.$loading.show()
      let payload = {
        reserve_id: reserve_id
      }
      fnbService
        .getFnbDetails(payload)
        .then(response => {
          loader.hide()
          const {data} = response
          if (data && data.status) {
            this.fnbItems = data.data
            let obj = {
              name: 'All',
              items: []
            }
            this.fnbItems.map(x => {
              x.items.map(y => {
                obj.items.push(y)
              })
            })
            this.fnbItems.push(obj)
            this.fnbItems = this.fnbItems.reverse()
            this.selectedFbItem = obj
          } else {
            this.$refs.modal.show()
            this.ErrorMessage = data.Message || data.message
          }
        })
        .catch(err => {
          loader.hide()
          this.$refs.modal.show()
        })
    },
    onSelectfbItem: function (fnbItem) {
      // this.selectedFbItem = fnbItem;
      this.selectedName = fnbItem.name
    },
    __onSelectFoodItem (foodItem, type, index) {
      // let obj = {
      //   ...foodItem,
      //   ItemQty: 1
      // };
      // this.SelctedFnBArray.push(obj);
      this.selectedFbItem.items[index]['key'] = true
      if (type == 'add') {
        this.selectedFbItem.items[index].hasOwnProperty('ItemQty') &&
        !isNaN(this.selectedFbItem.items[index].ItemQty)
          ? this.selectedFbItem.items[index].ItemQty++
          : (this.selectedFbItem.items[index]['ItemQty'] = 1)
      } else if (type == 'subtract') {
        this.selectedFbItem.items[index].hasOwnProperty('ItemQty') &&
        !isNaN(this.selectedFbItem.items[index].ItemQty)
          ? this.selectedFbItem.items[index].ItemQty--
          : this.selectedFbItem.items[index]['ItemQty']--
        this.selectedFbItem.items[index].ItemQty == 0
          ? delete this.selectedFbItem.items[index].key
          : ''
      }
      console.log(
        'this.selectedFbItem.items[index] :',
        this.selectedFbItem.items[index]
      )
      this.total = 0
      this.count = 0
      this.selectedFbItem.items.filter(x => {
        if (x.ItemQty > 0) {
          this.count += 1
          this.total += parseFloat(x.price) * parseInt(x.ItemQty)
        } else {
          // this.count -= 1;
          this.total = this.total
        }
      })
      console.log('total :', this.total)

      this.$forceUpdate()
      // if (type == "add") {
      // }
      // if (
      //   type == "subtract" &&
      //   this.foodAndBeverages.listing[foodItem.Category.Title][index].ItemQty != 0
      // ) {
      //   this.foodAndBeverages.listing[foodItem.Category.Title][index].ItemQty -= 1;
      //   this.totalAmount =
      //     parseInt(this.totalAmount) - parseInt(foodItem.Amount);
      // }

      // this.foodAndBeverages.selected = [];
      // this.fnbQty = 0;
      // Object.keys(this.foodAndBeverages.listing).map(category => {
      //   this.foodAndBeverages.listing[category].map(item => {
      //     if (item.ItemQty != 0) {
      //       this.foodAndBeverages.selected.push(item);
      //     }
      //   });
      // });
      // this.foodAndBeverages.selected.map(fb => {
      //   this.fnbQty = parseInt(this.fnbQty) + parseInt(fb.ItemQty);
      // });
    },
    onSelectFoodItem (foodItem, type, index) {
      // let obj = {
      //   ...foodItem,
      //   ItemQty: 1
      // };
      // this.SelctedFnBArray.push(obj);
      let SelectedIndex = this.fnbItems.findIndex(
        x => x.name === this.selectedName
      )

      this.fnbItems[SelectedIndex].items[index]['key'] = true
      if (type == 'add') {
        this.fnbItems[SelectedIndex].items[index].hasOwnProperty('ItemQty') &&
        !isNaN(this.fnbItems[SelectedIndex].items[index].ItemQty)
          ? this.fnbItems[SelectedIndex].items[index].ItemQty++
          : (this.fnbItems[SelectedIndex].items[index]['ItemQty'] = 1)
      } else if (type == 'subtract') {
        this.fnbItems[SelectedIndex].items[index].hasOwnProperty('ItemQty') &&
        !isNaN(this.fnbItems[SelectedIndex].items[index].ItemQty)
          ? this.fnbItems[SelectedIndex].items[index].ItemQty--
          : this.fnbItems[SelectedIndex].items[index]['ItemQty']--
        this.fnbItems[SelectedIndex].items[index].ItemQty == 0
          ? delete this.fnbItems[SelectedIndex].items[index].key
          : ''
      }
      console.log(
        'this.fnbItems[SelectedIndex].items[index] :',
        this.fnbItems[SelectedIndex].items[index]
      )
      this.total = 0
      this.count = 0
      // this.fnbItems[SelectedIndex].items.filter(x => {
      //   if (x.ItemQty > 0) {
      //     this.count += 1;
      //     this.total += parseFloat(x.price) * parseInt(x.ItemQty);
      //   } else {
      //     // this.count -= 1;
      //     this.total = this.total;
      //   }
      // });
      this.fnbItems.map(y => {
        if (y.name != 'All') {
          y.items.map(x => {
            if (x.ItemQty > 0) {
              this.count++
              this.total += parseFloat(x.price) * parseInt(x.ItemQty)
            } else {
              // this.count -= 1;
              this.total = this.total
            }
          })
        }
      })
      console.log('total :', this.total)

      this.$forceUpdate()
      // if (type == "add") {
      // }
      // if (
      //   type == "subtract" &&
      //   this.foodAndBeverages.listing[foodItem.Category.Title][index].ItemQty != 0
      // ) {
      //   this.foodAndBeverages.listing[foodItem.Category.Title][index].ItemQty -= 1;
      //   this.totalAmount =
      //     parseInt(this.totalAmount) - parseInt(foodItem.Amount);
      // }

      // this.foodAndBeverages.selected = [];
      // this.fnbQty = 0;
      // Object.keys(this.foodAndBeverages.listing).map(category => {
      //   this.foodAndBeverages.listing[category].map(item => {
      //     if (item.ItemQty != 0) {
      //       this.foodAndBeverages.selected.push(item);
      //     }
      //   });
      // });
      // this.foodAndBeverages.selected.map(fb => {
      //   this.fnbQty = parseInt(this.fnbQty) + parseInt(fb.ItemQty);
      // });
    },
    onBookFnb: function () {
      let payload = {
        items: this.selectedFbItem.items.filter(
          ({ItemQty}) => ItemQty && !isNaN(ItemQty) && ItemQty > 0
        ),
        reserve_id: this.reserve_id
      }
      if (payload.items.length > 0) {
        fnbService
          .bookfnb(payload)
          .then(response => {
            const {data} = response
            if (data && data.status) {
              this.$router.push({
                path: '/conf-booking/' + this.reserve_id
              })
            } else {
              this.$refs.modal.show()
              this.ErrorMessage = data.Message || data.message
            }
          })
          .catch(err => {
            this.$refs.modal.show()
          })
      } else {
        this.$router.push({
          path: '/conf-booking/' + this.reserve_id
        })
      }
    }
  }
}
</script>

<style>
.select-fnb {
  height: 56vh;
  overflow-y: auto;
  margin-bottom: 40px;
  overflow-x: hidden;
}

.fb-list {
  overflow-x: scroll;
  white-space: nowrap;
}

.fb-list {
  overflow: -moz-scrollbars-none;
}

.fb-list {
  -ms-overflow-style: none;
}

.fb-list li {
  color: #fff;
  font-size: 12px;
  border-radius: 15px;
  padding: 10px 15px;
  min-width: 140px;
  font-weight: bold;
  background: #e78785;
  text-align: center;
}

.fb-list li:hover,
.fb-list li.active {
  color: #000;
  background: #fff;
}

.counter-box {
  background-color: #fff;
  overflow: hidden;
  margin-top: 10px;
  border-radius: 15px;
  display: inline-flex;
}

.counter-box .decrease {
  font-size: 20px;
  height: 40px;
  width: 40px;
  outline: 0;
  box-shadow: none;
  border: none;
  cursor: pointer;
  color: #cc202e;
  font-weight: bolder;
  background-color: #ffffff;
  border-top-left-radius: 15px;
  border-bottom-left-radius: 15px;
  border-right: 0.5px dotted #000;
}

.counter-box .output {
  width: 40px;
  color: #000;
  display: flex;
  font-size: 18px;
  font-weight: bold;
  text-align: center;
  align-items: center;
  justify-content: center;
  background-color: #ffffff;
}

.counter-box .increase {
  height: 40px;
  width: 40px;
  outline: 0;
  border: none;
  font-size: 25px;
  cursor: pointer;
  color: #87c03f;
  box-shadow: none;
  font-weight: bolder;
  background-color: #ffffff;
  border-top-right-radius: 15px;
  border-bottom-right-radius: 15px;
  border-left: 0.5px dotted #000;
}

.fb-img-box {
  border-bottom: 5px solid #fff;
}
</style>
