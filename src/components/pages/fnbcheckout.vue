<template>
  <div>
    <div v-if="false" class="d-none">
      <b-modal
        no-close-on-esc
        no-close-on-backdrop
        hide-header-close
        id="seatFullModal"
        ref="seatFullModal"
        :title="allLanguageData.ErrorModal.title"
        class="ErModal light-red-color"
      >
        <img
          class="mx-auto d-block mt-4"
          src="@/assets/img/svg/alert-icon.svg"
          width="45"
          height="auto"
        />
        <h6 class="pt-3 mb-0 text-center font-weight-bold text-white">
          Something went wrong!
        </h6>
        <!-- <h6
        class="pt-2 text-center font-weight-bold text-white"
      >{{allLanguageData.ErrorModal.Content2}}!</h6>-->
        <b-button
          @click="onClickOk()"
          variant="default"
          class="btn btn-green mt-4 mb-3"
          >{{ allLanguageData.ErrorModal.Btn }}</b-button
        >
      </b-modal>

      <!-- SESSION COUNTDOWN TIMER -->
      <div class="col-md-11 mx-auto d-none">
        <div class="centerTitle">
          <span class="red-dotl"></span>
          <div class="d-flex justify-content-center align-items-center">
            <p class="title">
              {{ this.timer.minutes }}:{{ this.timer.seconds }}
            </p>
            <p
              class="text"
              v-bind:class="langName == 'ar' ? 'mr-1 mr-md-3' : 'ml-1 ml-md-3'"
            >
              <span class="d-block">{{ allLanguageData.Timer[0] }}</span>
              {{ allLanguageData.Timer[1] }}
            </p>
          </div>
          <span class="red-dotr"></span>
        </div>
      </div>

      <!-- SEATLAYOUT SECTION -->

      <section
        v-if="sectionName.seatLayout"
        class="container-fluid mb-5 pb-5 d-none"
      >
        <div class="col-md-11 mx-auto py-4 px-0 seatLayoutSection">
          <div v-if="sectionName.selectNoOfSeats" class="text-center mx-auto">
            <div class="my-md-4 my-3">
              <p class="txt">{{ allLanguageData.SeatsSelection }}</p>
              <div class="row justify-content-center">
                <ul
                  class="list-inline seatNumList mb-0"
                  v-bind:class="langName == 'ar' ? 'pr-0 ar-seatNumList' : ''"
                >
                  <li
                    v-for="(number, numberOfSeatsIndex) in 10"
                    :key="numberOfSeatsIndex"
                    class="list-inline-item"
                    v-on:click="editNumberOfSeats(number)"
                    :class="{ active: number == totalNumberOfSeats }"
                  >
                    {{ number }}
                  </li>
                </ul>
              </div>
            </div>

            <div class="whitedotline-box w-50 w100">
              <hr class="white-dotline" />
            </div>
          </div>
        </div>

        <div
          class="col-lg-12 px-0 mx-auto abox mb-5"
          :class="['', totalNumberOfSeats == 0 ? 'disable' : '']"
        >
          <div>
            <div class="screen text-center">
              <img
                v-if="preimere == true || preimere == 'true'"
                src="@/assets/img/svg/premier-screen-desk.svg"
                class="img-fluid gold-screen-img"
                style="z-index: -1"
              />
              <img
                v-else
                src="@/assets/img/svg/activeScreen.svg"
                class="img-fluid"
                style="z-index: -1"
              />
              <h2 class="movieName text-uppercase">
                {{ cinemaDetails.MovieTitle }}
                <span
                  class="d-block font-weight-bold"
                  style="font-size: 10px"
                  >{{ cinemaDetails.ScreenName }}</span
                >
              </h2>

              <p class="userSelection" v-if="selectedSeats[0]">
                {{ allLanguageData.YourSelection }}:
                <span class="text-uppercase">
                  {{ selectedSeats[0].SeatType }} x {{ selectedSeats.length }},
                  {{ currency }}
                  {{ changeNumberFormat(totalAmount) }} SAR
                </span>
              </p>
            </div>

            <div class="table-responsive">
              <table class="mx-auto master">
                <tr class="seat-alignment">
                  <td></td>
                  <td></td>
                  <td>
                    <table>
                      <tr class="text-center"></tr>
                    </table>
                  </td>
                  <td>
                    <div class="blank-div"></div>
                  </td>
                </tr>

                <template
                  v-if="sectionName.seatLayout"
                  v-for="seatType in seatTypes"
                >
                  <tr
                    class="last-t"
                    :key="seatType.ID + '-label'"
                    style="border-bottom: 20px solid transparnt"
                  >
                    <td
                      class="seat-cat"
                      v-bind:class="
                        langName == 'ar'
                          ? 'ar-seat-cat text-left'
                          : 'text-right'
                      "
                    >
                      <p>
                        {{ seatType.SeatType }}
                        <span class="d-block"
                          >{{ currency }}
                          {{ changeNumberFormat(seatType.Price) }}</span
                        >
                      </p>
                    </td>
                    <td
                      class="seat-range"
                      v-bind:class="
                        langName == 'ar' ? 'ar-seat-range pr-4' : 'pl-4'
                      "
                    >
                      <span>&nbsp;</span>
                    </td>
                    <td>
                      <div
                        class="text-center text-white d-md-none font-weight-bold text-upppercase my-1"
                      >
                        {{ seatType.SeatType }} {{ currency }}
                        {{ seatType.Price }}
                      </div>
                      <table>
                        <tr
                          v-for="(seatArray, seatArrayIndexMain) in seatLayout"
                          :key="seatArrayIndexMain"
                        >
                          <td
                            v-for="(singleSeat, singleSeatIndex) in seatArray"
                            :key="singleSeatIndex"
                          >
                            <div
                              v-on:click="
                                handlerSeatSelected(
                                  singleSeat,
                                  seatArrayIndexMain,
                                  singleSeatIndex,
                                  null,
                                  null,
                                  $event
                                )
                              "
                              v-if="
                                singleSeat.SeatType == seatType.SeatType &&
                                  singleSeat.Status == 1
                              "
                              class="seat"
                              :class="{ active: singleSeat.SelectStatusFlag }"
                            >
                              {{ singleSeat.SeatName }}
                            </div>
                            <div
                              v-else-if="
                                singleSeat.SeatType == seatType.SeatType &&
                                  singleSeat.Status == 2
                              "
                              class="seat disable"
                            >
                              {{ singleSeat.SeatName }}
                            </div>
                            <div v-else class style="width: 42px"></div>
                          </td>

                          <!-- <td
                          v-for="(singleSeat, singleSeatIndex) in seatArray"
                          :key="singleSeatIndex"
                          v-if="singleSeat.SeatType == seatType.SeatType && singleSeat.Status != 1"
                        >
                          <div class="seat disable">{{singleSeat.SeatName}}</div>
                        </td>-->
                        </tr>
                      </table>
                    </td>
                  </tr>
                  <div :key="seatType.ID + '-separator'" class="mb-3"></div>
                </template>
              </table>
            </div>

            <ul
              class="list-inline seat-info text-center"
              v-bind:class="langName == 'ar' ? 'ar-seat-info' : ''"
            >
              <li class="list-inline-item mr-3">
                <span class="selec"></span>
                {{ allLanguageData.SeatTypes[0] }}
              </li>
              <li class="list-inline-item mr-3">
                <span class="avail"></span>
                {{ allLanguageData.SeatTypes[1] }}
              </li>
              <li class="list-inline-item mr-3">
                <span class="unavail"></span>
                {{ allLanguageData.SeatTypes[2] }}
              </li>
            </ul>
          </div>
          <div class="seat-section-txt pt-4">
            {{ allLanguageData.PleaseNote }}
          </div>
          <div class="seat-section-txt" v-if="preimere == 'true'">
            {{ allLanguageData.PleaseNoteNew }}
          </div>
          <div class="seat-section-txt" v-if="preimere == 'true'">
            {{ allLanguageData.PleaseNoteNew2 }}
          </div>
        </div>
      </section>
      <!-- MODAL POP ON BACK -->
      <b-modal
        no-close-on-esc
        no-close-on-backdrop
        hide-header-close
        id="quitBooking"
        ref="quitBooking"
        :title="allLanguageData.QuitBooking.title"
        class="ErModal light-red-color"
      >
        <img
          class="mx-auto d-block mt-4"
          src="@/assets/img/svg/alert-icon.svg"
          width="45"
          height="auto"
        />
        <h6 class="pt-3 mb-0 text-center font-weight-bold text-white">
          {{ allLanguageData.QuitBooking.Content1 }}
        </h6>
        <!-- <h6 class="pt-2 text-center font-weight-bold text-white">{{allLanguageData.ErrorModal.Content2}}!</h6> -->
        <div class="d-flex justify-content-center align-items-center">
          <div class>
            <b-button
              v-on:click="goBackHistory()"
              variant="default"
              :class="preimere == 'true' ? 'btn-proceed' : 'btn-green'"
              class="btn mt-4 mb-3"
              >{{ allLanguageData.QuitBooking.Btn }}</b-button
            >
          </div>
          <div class="px-2"></div>
          <div class>
            <b-button
              v-on:click="onClickNo()"
              variant="default"
              :class="preimere == 'true' ? 'btn-proceed' : 'btn-green'"
              class="btn mt-4 mb-3"
              >{{ allLanguageData.QuitBooking.Btn1 }}</b-button
            >
          </div>
        </div>
      </b-modal>

      <b-modal
        no-close-on-esc
        no-close-on-backdrop
        hide-header-close
        id="FoodNA"
        ref="FoodNA"
        :title="allLanguageData.FoodNAModal.title"
        class="ErModal light-red-color"
      >
        <img
          class="mx-auto d-block mt-4"
          src="@/assets/img/svg/alert-icon.svg"
          width="45"
          height="auto"
        />
        <h6 class="pt-3 mb-0 text-center font-weight-bold text-white">
          {{ FoodNAMessage }}
        </h6>
        <!-- <h6 class="pt-2 text-center font-weight-bold text-white">{{allLanguageData.ErrorModal.Content2}}!</h6> -->
        <div class="d-flex justify-content-center align-items-center">
          <div class>
            <b-button
              v-on:click="onClickRetry()"
              variant="default"
              :class="preimere == 'true' ? 'btn-proceed' : 'btn-green'"
              class="btn mt-4 mb-3"
              >{{ allLanguageData.FoodNAModal.Btn }}</b-button
            >
          </div>
          <div class="px-2"></div>
          <div class>
            <b-button
              v-on:click="onClickProceed()"
              variant="default"
              :class="preimere == 'true' ? 'btn-proceed' : 'btn-green'"
              class="btn mt-4 mb-3"
              >{{ allLanguageData.FoodNAModal.Btn1 }}</b-button
            >
          </div>
        </div>
      </b-modal>

      <!-- SEATLAYOUT DESKTOP FOOTER -->
      <section
        v-if="sectionName.showFooter"
        class="fixed-footer d-none d-lg-block"
      >
        <div class="row w-100 mx-0">
          <!-- BACK BUTTON -->
          <div
            class="col-lg-1 d-flex justify-content-center align-items-center border-right"
          >
            <div
              v-b-modal.quitBooking
              class="arrow-svg"
              v-bind:class="langName == 'ar' ? 'ar-arrow-svg' : ''"
            >
              <svg width="50.279" height="50.279" viewBox="0 0 50.279 50.279">
                <g
                  id="Group_691"
                  data-name="Group 691"
                  transform="translate(-100 -970.061)"
                >
                  <g id="Group_690" data-name="Group 690">
                    <path
                      id="Path_2173"
                      data-name="Path 2173"
                      d="M125.14,1020.34h0A25.139,25.139,0,0,1,100,995.2h0a25.139,25.139,0,0,1,25.14-25.14h0a25.139,25.139,0,0,1,25.139,25.14h0A25.139,25.139,0,0,1,125.14,1020.34Z"
                    />
                    <g id="Group_689" data-name="Group 689">
                      <g id="Group_688" data-name="Group 688">
                        <path
                          id="Path_2174"
                          data-name="Path 2174"
                          d="M127.736,1002.572l2.688-2.688-4.648-4.648,4.683-4.684-2.723-2.723-7.372,7.372Z"
                          fill="#fff"
                        />
                      </g>
                    </g>
                  </g>
                </g>
              </svg>
            </div>
          </div>

          <!-- SELECTED DETAILS -->
          <div class="col-lg-7 border-right">
            <div class="d-flex align-items-center h-100">
              <ol class="list-inline font-weight-bold mb-0 text-uppercase">
                <li class="list-inline-item mr-0">
                  <span>{{ cinemaDetails.MovieTitle }}</span>
                </li>
                <li class="list-inline-item mr-0">
                  <span class="text-dark">&bull;</span>
                  <span>{{ cinemaDetails.Name }}</span>
                </li>
                <li class="list-inline-item mr-0">
                  <span class="text-dark">&bull;</span>
                  <span>{{ cinemaDetails.BookingDate }}</span>
                </li>
                <li class="list-inline-item mr-0">
                  <span class="text-dark">&bull;</span>
                  <span
                    >{{ cinemaDetails.Format }} ({{
                      cinemaDetails.Language
                    }})</span
                  >
                </li>
                <li class="list-inline-item mr-0">
                  <span class="text-dark">&bull;</span>
                  <span>{{ cinemaDetails.BookingTime }}</span>
                </li>
                <li
                  class="list-inline-item mr-0"
                  v-if="selectedSeats.length != 0"
                  v-bind:class="langName == 'ar' ? 'd-none' : ''"
                >
                  <span class="text-dark">&bull;</span>
                </li>
                <li
                  v-if="selectedSeats.length != 0"
                  class="list-inline-item mr-0"
                >
                  <ul class="seat-list">
                    <li
                      v-for="(seat, seatsSelectedIndex) in selectedSeats"
                      :key="seatsSelectedIndex"
                    >
                      {{ seat.SeatName }}
                    </li>
                  </ul>
                </li>
              </ol>
            </div>
          </div>

          <!-- TOTAL AMOUNT  -->
          <div
            class="col-lg-2 d-flex justify-content-center align-items-center border-right"
          >
            <div class="font-weight-bold text-center SMALL">
              {{ allLanguageData.Total }}: {{ currency }}
              {{
                changeNumberFormat(
                  parseInt(totalAmount) + parseInt(total_internet_handling_amt)
                )
              }}
            </div>
          </div>

          <!-- BUTTON  -->
          <div
            v-if="preimere == true || preimere == 'true'"
            class="col-lg-2 col-xl-2 align-self-center text-center"
          >
            <button
              class="btn-checkout"
              v-if="
                selectedSeats.length == totalNumberOfSeats &&
                  selectedSeats.length > 0
              "
              v-on:click="confirmSeatsSelect()"
            >
              <img
                src="@/assets/img/svg/fnb-gold-icon.svg"
                class="mr-2"
                height="auto"
                width="20px"
              />
              {{ allLanguageData.GrabABite }}
              <!-- GRAB A
            BITE-->
            </button>
          </div>
          <div v-else class="col-lg-2 col-xl-2 align-self-center text-center">
            <button
              class="btn-checkout"
              v-if="
                selectedSeats.length == totalNumberOfSeats &&
                  selectedSeats.length > 0
              "
              v-on:click="confirmSeatsSelect()"
            >
              <img
                src="@/assets/img/svg/fb-icon.svg"
                class="mr-2"
                height="auto"
                width="20px"
              />
              {{ allLanguageData.GrabABite }}
              <!-- GRAB A
            BITE-->
            </button>
          </div>
        </div>
      </section>

      <!-- SEATLAYOUT MOBILE FOOTER -->
      <section
        class="fixed-footer-mob bg-white d-block d-lg-none"
        v-if="sectionName.seatLayout"
      >
        <div class="p-3">
          <div class="row">
            <div class="col-5 align-self-center info-section">
              <div class="d-flex justify-content-start">
                <div class v-bind:class="langName == 'ar' ? 'pl-2' : 'pr-2'">
                  <router-link
                    v-if="preimere == true || preimere == 'true'"
                    to="#"
                    id="movieInfo"
                  >
                    <img
                      src="@/assets/img/svg/infoAssetBlack.svg"
                      class="img-fluid"
                      height="auto"
                      width="30px;"
                    />
                  </router-link>
                  <router-link v-else to="#" id="movieInfo">
                    <img
                      src="@/assets/img/svg/infoAssetRed.svg"
                      class="img-fluid"
                      height="auto"
                      width="30px;"
                    />
                  </router-link>
                </div>
                <div class="txt">
                  <span>
                    {{ allLanguageData.BookingInfo[0] }}
                    <br />
                    {{ allLanguageData.BookingInfo[1] }}
                  </span>
                </div>
              </div>
            </div>
            <div class="col-7 border-left">
              <div class="d-flex align-items-center justify-content-start">
                <strong
                  class="text-dark small font-weight-bold"
                  v-bind:class="langName == 'ar' ? 'pl-2' : 'pr-2'"
                >
                  {{ allLanguageData.SeatInfo[0] }}
                  <br />
                  {{ allLanguageData.SeatInfo[1] }}:
                </strong>
                <ul class="seat-list lh-1">
                  <li
                    class="small font-weight-bold"
                    v-for="(seat, seatsSelectedIndex) in selectedSeats"
                    :key="seatsSelectedIndex"
                  >
                    {{ seat.SeatName }}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div class="p-3 border-top">
          <div class="row" v-bind:class="langName == 'ar' ? 'mr-0' : 'ml-0'">
            <div v-b-modal.quitBooking class="col-1 px-0">
              <img
                src="@/assets/img/svg/cheveron-circle-left.svg"
                class="img-fluid mob-arrow-svg"
                height="auto"
                width="40px"
              />
            </div>
            <div class="col col-sm-4 align-self-center">
              <div class="small font-weight-bold text-center">
                {{ allLanguageData.Total }}: {{ currency }}
                {{ changeNumberFormat(totalAmount) }} SAR
              </div>
            </div>
            <div v-if="preimere == true || preimere == 'true'" class="col">
              <b-button
                class="btn btn-danger btn-red mw-150 ml-auto"
                v-if="
                  selectedSeats.length == totalNumberOfSeats &&
                    selectedSeats.length > 0
                "
                v-on:click="confirmSeatsSelect()"
              >
                <img
                  src="@/assets/img/svg/fnb-gold-icon.svg"
                  class
                  height="auto"
                  width="20px"
                  v-bind:class="langName == 'ar' ? 'ml-2' : 'mr-2'"
                />
                {{ allLanguageData.GrabABite }}
              </b-button>
            </div>
            <div v-else class="col">
              <b-button
                class="btn btn-danger btn-red mw-150 ml-auto"
                v-if="
                  selectedSeats.length == totalNumberOfSeats &&
                    selectedSeats.length > 0
                "
                v-on:click="confirmSeatsSelect()"
              >
                <img
                  src="@/assets/img/svg/fb-icon.svg"
                  class
                  height="auto"
                  width="20px"
                  v-bind:class="langName == 'ar' ? 'ml-2' : 'mr-2'"
                />
                {{ allLanguageData.GrabABite }}
              </b-button>
            </div>
          </div>
        </div>

        <div class="moviePopover">
          <b-popover :show.sync="show" target="movieInfo" placement="top">
            <div class="popmovie-info p-1">
              <router-link
                v-if="preimere == true || preimere == 'true'"
                to
                class="closeBtn"
              >
                <img
                  src="@/assets/img/svg/close-icon-black.svg"
                  class="img-fluid"
                  height="auto"
                  width="10px"
                />
              </router-link>
              <router-link v-else to class="closeBtn">
                <img
                  src="@/assets/img/svg/close-icon.svg"
                  class="img-fluid"
                  height="auto"
                  width="10px"
                />
              </router-link>

              <ol class="list-inline small font-weight-bold mb-0">
                <li
                  class="list-inline-item"
                  v-bind:class="langName == 'ar' ? 'ml-0' : 'mr-0'"
                >
                  <span class="text-uppercase">{{
                    cinemaDetails.MovieTitle
                  }}</span>
                </li>
                <li
                  class="list-inline-item"
                  v-bind:class="langName == 'ar' ? 'ml-0' : 'mr-0'"
                >
                  <span class="text-dark">&bull;</span>
                  <span class="text-uppercase">{{ cinemaDetails.Name }}</span>
                </li>
                <li
                  class="list-inline-item"
                  v-bind:class="langName == 'ar' ? 'ml-0' : 'mr-0'"
                >
                  <span class="text-dark">&bull;</span>
                  <span class="text-uppercase">{{
                    cinemaDetails.BookingDate
                  }}</span>
                </li>
                <li
                  class="list-inline-item"
                  v-bind:class="langName == 'ar' ? 'ml-0' : 'mr-0'"
                >
                  <span class="text-dark">&bull;</span>
                  <span class="text-uppercase"
                    >{{ cinemaDetails.Format }} ({{
                      cinemaDetails.Language
                    }})</span
                  >
                </li>
                <li
                  class="list-inline-item"
                  v-bind:class="langName == 'ar' ? 'ml-0' : 'mr-0'"
                >
                  <span class="text-dark">&bull;</span>
                  <span class="text-uppercase">{{
                    cinemaDetails.BookingTime
                  }}</span>
                </li>
              </ol>
            </div>
          </b-popover>
        </div>
      </section>

      <!-- -------------------------------------------------------------------------------------------------------------------------------------------- -->

      <!-- FOOD AND BEVERAGES SELECTION -->
      <section
        v-if="sectionName.foodAndBeverages"
        class="container-fluid mb-5 pb-5"
      >
        <div class="col-12 col-md-11 px-0 mx-auto mt-5">
          <div class="my-4 text-center cus-list mb-5 fnb-sticky-header">
            <p class="eTitle eTitlewhite">
              <img
                src="@/assets/img/svg/fb-icon.svg"
                class="img-fluid pb-2"
                v-bind:class="langName == 'ar' ? 'ml-2' : 'mr-2'"
              />
              {{ allLanguageData.GrabABite }}!
              <span class="selected-items"
                >{{ foodAndBeverages.allListing.length }} ITEMS</span
              >
            </p>
            <!-- separator -->
            <div class="whitedotline-box w-100">
              <hr class="white-dotline" />
              <span class="d-none"></span>
            </div>
            <!-- separator  END -->
            <ul class="list-inline fbCat">
              <li
                class="list-inline-item"
                :class="{ active: foodAndBeverages.selectedCategory == 'All' }"
                v-on:click="onSelectCategory('All')"
              >
                All
              </li>
              <li
                v-for="(category,
                foodCategoryIndex) in foodAndBeverages.listing"
                :key="foodCategoryIndex"
                class="list-inline-item"
                v-on:click="onSelectCategory(category[0].Category.Title)"
                :class="{
                  active:
                    foodAndBeverages.selectedCategory ==
                    category[0].Category.Title
                }"
              >
                {{ category[0].Category.Title }}
              </li>
            </ul>
            <!-- separator -->
            <div class="whitedotline-box w-100">
              <hr class="white-dotline" />
              <span class="d-none"></span>
            </div>
            <!-- separator  END -->
          </div>

          <!-- ALL FNB -->
          <div
            v-if="foodAndBeverages.allListing.length > 0"
            class="row mx-0 foodBevrage"
          >
            <template
              v-if="foodAndBeverages.selectedCategory == 'All'"
              v-for="(categories, fb) in foodAndBeverages.listing"
            >
              <div
                class="col-md-6 col-lg-4 col-xl-3 mb-4 mb-md-5 sub-box"
                :index="fb"
                v-for="(fbBox, fbIndex) in categories"
                :key="fbIndex + fbBox.ItemName"
              >
                <div class="d-flex h-100 premiere-fb-box red-fb-box">
                  <div class="d-flex align-items-center text-white small">
                    <img
                      v-if="fbBox.ThumbnailImage.includes('/assets/')"
                      :src="fbBox.ThumbnailImage"
                      v-bind:alt="fbBox.ItemName"
                    />
                    <img
                      v-else-if="preimere == true || preimere == 'true'"
                      src="https://empireapi.binarynumbers.io/assets/images/white-icon.png"
                      class="demo-img"
                      v-bind:alt="fbBox.ItemName"
                    />
                    <img
                      v-else
                      src="https://empireapi.binarynumbers.io/assets/images/black-icon.png"
                      class="demo-img"
                      v-bind:alt="fbBox.ItemName"
                    />
                  </div>
                  <div class="fbDetails">
                    <div>
                      <p class="fb-name">
                        {{ fbBox.ItemName }}
                        <!-- <small class="text-lowercase ml-1">{{fbBox.Qty}}</small> -->
                      </p>
                      <p class="fb-price">Qty: {{ fbBox.Qty }}</p>
                      <p class="fb-price">
                        {{ fbBox.Currency }}
                        {{ changeNumberFormat(fbBox.Amount) }}
                      </p>
                    </div>
                    <div class="d-flex justify-content-end pr-0 pr-xl-3">
                      <!-- <div>
                      <img src="@/assets/img/svg/veg-icon.svg" class="img-fluid">
                      <img src="@/assets/img/svg/nonVeg-icon.svg" class="img-fluid d-none">
                    </div>-->
                      <div>
                        <div>
                          <div
                            class="d-flex counter-box mr-0 mr-md-3"
                            v-bind:class="
                              langName == 'ar' ? 'ar-counter-box' : ''
                            "
                          >
                            <button
                              class="decrease"
                              v-on:click="
                                onSelectFoodItem(fbBox, 'subtract', fbIndex)
                              "
                              id="decrease"
                              type="button"
                              data-inc="-1"
                            >
                              -
                            </button>
                            <div class="output" id="output">
                              {{ fbBox.Qty }}
                            </div>
                            <button
                              class="increase"
                              v-on:click="
                                onSelectFoodItem(fbBox, 'add', fbIndex)
                              "
                              id="increase"
                              type="button"
                              data-inc="1"
                            >
                              +
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </template>
            <!-- ALL FNB ENDS -->

            <!-- SELECTED FNB -->
            <div
              v-if="foodAndBeverages.selectedCategory != 'All'"
              class="col-md-6 col-lg-4 col-xl-3 mb-4 mb-md-5"
              v-for="(fbBox, fb2) in foodAndBeverages.listing[
                foodAndBeverages.selectedCategory
              ]"
              :key="fb2"
            >
              <div class="d-flex h-100 premiere-fb-box red-fb-box">
                <div class="d-flex align-items-center">
                  <img
                    v-if="fbBox.ThumbnailImage.includes('/assets/')"
                    :src="fbBox.ThumbnailImage"
                    v-bind:alt="fbBox.ItemName"
                  />
                  <img
                    v-else-if="preimere == true || preimere == 'true'"
                    src="https://empireapi.binarynumbers.io/assets/images/white-icon.png"
                    class="demo-img"
                    v-bind:alt="fbBox.ItemName"
                  />
                  <img
                    v-else
                    src="https://empireapi.binarynumbers.io/assets/images/black-icon.png"
                    class="demo-img"
                    v-bind:alt="fbBox.ItemName"
                  />
                  <!-- <img
                  v-else
                  src="@/assets/img/demo-img.png"
                  class="demo-img"
                  v-bind:alt="fbBox.ItemName"
                />-->
                  <!-- <img src="@/assets/img/Layer.png"> -->
                </div>
                <div class="fbDetails">
                  <div>
                    <p class="fb-name">
                      {{ fbBox.ItemName }}
                      <!-- <small class="text-lowercase ml-1">{{fbBox.Qty}}</small> -->
                    </p>
                    <p class="fb-price">Qty: {{ fbBox.Qty }}</p>
                    <p class="fb-price">
                      {{ fbBox.Currency }}
                      {{ changeNumberFormat(fbBox.Amount) }}
                    </p>
                  </div>
                  <div class="d-flex justify-content-end pr-0 pr-xl-3">
                    <!-- <div>
                    <img src="@/assets/img/svg/veg-icon.svg" class="img-fluid">
                    <img src="@/assets/img/svg/nonVeg-icon.svg" class="img-fluid d-none">
                  </div>-->
                    <div>
                      <div>
                        <div
                          class="d-flex counter-box mr-0 mr-md-3"
                          v-bind:class="
                            langName == 'ar' ? 'ar-counter-box' : ''
                          "
                        >
                          <button
                            class="decrease"
                            v-on:click="
                              onSelectFoodItem(fbBox, 'subtract', fb2)
                            "
                            id="decrease"
                            type="button"
                            data-inc="-1"
                          >
                            -
                          </button>
                          <div class="output" id="output">{{ fbBox.Qty }}</div>
                          <button
                            class="increase"
                            v-on:click="onSelectFoodItem(fbBox, 'add', fb2)"
                            id="increase"
                            type="button"
                            data-inc="1"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!-- SELECTED FNB ENDS -->
          </div>
          <div v-else class="eTitle eTitlewhite text-center">
            No FNB Data Found
          </div>
        </div>
      </section>

      <!-- FOOD AND BEVERAGES DESKTOP FOOTER -->
      <section
        class="fixed-footer d-none d-lg-block aaa"
        v-if="!sectionName.showFooter"
      >
        <div class="row w-100 mx-0">
          <!-- BACK BUTTON -->
          <div
            class="col-lg-1 d-flex justify-content-center align-items-center border-right"
          >
            <div
              v-b-modal.quitBooking
              class="arrow-svg"
              v-bind:class="langName == 'ar' ? 'ar-arrow-svg' : ''"
            >
              <svg width="50.279" height="50.279" viewBox="0 0 50.279 50.279">
                <g
                  id="Group_691"
                  data-name="Group 691"
                  transform="translate(-100 -970.061)"
                >
                  <g id="Group_690" data-name="Group 690">
                    <path
                      id="Path_2173"
                      data-name="Path 2173"
                      d="M125.14,1020.34h0A25.139,25.139,0,0,1,100,995.2h0a25.139,25.139,0,0,1,25.14-25.14h0a25.139,25.139,0,0,1,25.139,25.14h0A25.139,25.139,0,0,1,125.14,1020.34Z"
                    />
                    <g id="Group_689" data-name="Group 689">
                      <g id="Group_688" data-name="Group 688">
                        <path
                          id="Path_2174"
                          data-name="Path 2174"
                          d="M127.736,1002.572l2.688-2.688-4.648-4.648,4.683-4.684-2.723-2.723-7.372,7.372Z"
                          fill="#fff"
                        />
                      </g>
                    </g>
                  </g>
                </g>
              </svg>
            </div>
          </div>

          <!-- I BUTTON INFO -->
          <!-- <div
          class="col-lg-1 col-xl-1 justify-content-center align-items-center deskinfoBox"
          :class="['',sectionName.seatLayout ? 'd-none':'d-flex' ]"
        >
          <div class="d-flex justify-content-start">
            <router-link to="#" id="deskMovieInfo" class="info-icon-svg pr-3">
              <svg width="50.279" height="50.279" viewBox="0 0 50.279 50.279">
                <g id="Group_1358" data-name="Group 1358" transform="translate(-223.328 -970.061)">
                  <path
                    id="Path_2180"
                    data-name="Path 2180"
                    d="M248.468,1020.34h0A25.139,25.139,0,0,1,223.329,995.2h0a25.139,25.139,0,0,1,25.139-25.14h0a25.14,25.14,0,0,1,25.14,25.14h0A25.14,25.14,0,0,1,248.468,1020.34Z"
                  ></path>
                  <g id="Group_768" data-name="Group 768">
                    <path
                      id="Path_2181"
                      data-name="Path 2181"
                      d="M244.979,1003.514v-1.077q1.666,0,1.668-1.361v-4.925q0-1.823-1.489-1.822v-.95l4.875-.847v8.646q0,1.26,1.925,1.259v1.077Zm3.181-13.343a1.451,1.451,0,0,1-1.129-.4,1.908,1.908,0,0,1-.359-1.3,1.407,1.407,0,0,1,1.591-1.591q1.488,0,1.488,1.591a1.745,1.745,0,0,1-.41,1.3A1.63,1.63,0,0,1,248.16,990.171Z"
                      fill="#fff"
                    ></path>
                  </g>
                </g>
              </svg>
            </router-link>
            <div class="txt">
              <span>
                BOOKING
                <br>INFO
              </span>
            </div>
          </div>
        </div>-->

          <div class="col-lg-7 border-right align-self-center">
            <div>
              <ul
                class="food-list lh-2"
                v-bind:class="langName == 'ar' ? 'd-none' : 'd-block'"
              >
                <li
                  class="font-weight-bold"
                  v-for="(foodAndBeveragesSingle,
                  foodAndBeveragesSelectedIndex) in foodAndBeverages.selected"
                  :key="foodAndBeveragesSelectedIndex"
                >
                  {{ foodAndBeveragesSingle.Qty }} x
                  {{ foodAndBeveragesSingle.ItemName }}
                </li>
              </ul>

              <ul
                class="food-list lh-2"
                v-bind:class="langName == 'ar' ? 'd-block' : 'd-none'"
              >
                <li
                  class="font-weight-bold"
                  v-for="(foodAndBeveragesSingle,
                  foodAndBeveragesSelectedIndex) in foodAndBeverages.selected"
                  :key="foodAndBeveragesSelectedIndex"
                >
                  {{ foodAndBeveragesSingle.ItemName }} x
                  {{ foodAndBeveragesSingle.Qty }}
                </li>
              </ul>
            </div>
          </div>

          <!-- SELECTED FOOD DETAIL -->
          <!-- <div class="col-lg-5 border-left border-right d-flex align-items-center">
        </div>-->

          <!-- TOTAL AMOUNT  -->
          <div
            class="col-lg-2 d-flex justify-content-center align-items-center px-2 border-right"
          >
            <div
              class="font-weight-bold text-center SMALL"
              v-if="CheckLoyaltyApplicable.length > 0"
            >
              {{ allLanguageData.Total }}: {{ currency }}
              {{
                //dddd
                changeNumberFormat(
                  CheckLoyaltyApplicable[0].afterSuccess
                    ? parseInt(totalAmount) +
                        parseInt(total_internet_handling_amt) -
                        CheckLoyaltyApplicable[0].SARFinal
                    : parseInt(totalAmount) +
                        parseInt(total_internet_handling_amt)
                )
              }}
              sasasas
            </div>
            <div class="font-weight-bold text-center SMALL" v-else>
              {{ allLanguageData.Total }}: {{ currency }}
              {{
                //dddd
                changeNumberFormat(
                  parseInt(totalAmount) + parseInt(total_internet_handling_amt)
                )
              }}
            </div>
          </div>

          <!-- BUTTON  -->
          <div class="col-lg-2 col-xl-2 align-self-center text-center">
            <button
              v-if="foodAndBeverages.selected.length == 0"
              v-on:click="onconfirm()"
              class="btn-checkout"
            >
              {{ allLanguageData.Skip }}
            </button>
            <button
              v-if="foodAndBeverages.selected.length != 0"
              v-on:click="onconfirm()"
              class="btn-checkout"
            >
              {{ allLanguageData.Checkout }}
            </button>
          </div>

          <div
            v-if="sectionName.checkout"
            class="col-lg-2 col-xl-2 align-self-center text-center"
          >
            <button v-on:click="checkoutPopUp()" class="btn-checkout">
              {{ allLanguageData.Checkout }}
            </button>
          </div>
        </div>

        <div class="deskMoviePopover">
          <b-popover
            :show.sync="show"
            target="deskMovieInfo"
            placement="top"
            class="popMenu"
          >
            <div class="deskPopmovie-info pt-3">
              <router-link
                v-if="preimere == true || preimere == 'true'"
                to
                class="deskCloseBtn"
              >
                <img
                  src="@/assets/img/svg/close-icon-black.svg"
                  class="img-fluid"
                  height="auto"
                  width="15px"
                />
              </router-link>

              <router-link v-else to class="deskCloseBtn">
                <img
                  src="@/assets/img/svg/close-icon.svg"
                  class="img-fluid"
                  height="auto"
                  width="15px"
                />
              </router-link>

              <ol class="list-inline font-weight-bold mb-0 lh-2">
                <li class="list-inline-item mr-0">
                  <span class="text-uppercase">{{
                    cinemaDetails.MovieTitle
                  }}</span>
                </li>
                <li class="list-inline-item mr-0">
                  <span class="text-dark">&bull;</span>
                  <span class="text-uppercase">{{ cinemaDetails.Name }}</span>
                </li>
                <li class="list-inline-item mr-0">
                  <span class="text-dark">&bull;</span>
                  <span class="text-uppercase">{{
                    cinemaDetails.BookingDate
                  }}</span>
                </li>
                <li class="list-inline-item mr-0">
                  <span class="text-dark">&bull;</span>
                  <span class="text-uppercase"
                    >{{ cinemaDetails.Format }} ({{
                      cinemaDetails.Language
                    }})</span
                  >
                </li>
                <li class="list-inline-item mr-0">
                  <span class="text-dark">&bull;</span>
                  <span class="text-uppercase">{{
                    cinemaDetails.BookingTime
                  }}</span>
                </li>
                <li class="list-inline-item mr-0">
                  <span class="text-dark">&bull;</span>
                </li>
                <li class="list-inline-item">
                  <ul class="seat-list lh-1">
                    <li
                      v-for="(seat, seatsSelectedIndex) in selectedSeats"
                      :key="seatsSelectedIndex"
                    >
                      {{ seat.SeatName }}
                    </li>
                  </ul>
                </li>
              </ol>
            </div>
          </b-popover>
        </div>
      </section>

      <!-- FOOD AND BEVERAGES MOBILE FOOTER -->
      <section class="fixed-footer-mob bg-white d-block d-lg-none">
        <div class="p-3">
          <div class="row">
            <div
              class="col-5 align-self-center info-section"
              v-if="fromQrCode !== true"
            >
              <div class="d-flex justify-content-start align-items-center">
                <div class v-bind:class="langName == 'ar' ? 'pl-2' : 'pr-2'">
                  <router-link
                    v-if="preimere == true || preimere == 'true'"
                    to="#"
                    id="movieInfo"
                    >fff
                    <img
                      src="@/assets/img/svg/infoAssetBlack.svg"
                      class="img-fluid"
                      height="auto"
                      width="30px;"
                    />
                  </router-link>

                  <router-link v-else to="#" id="movieInfo">
                    <img
                      src="@/assets/img/svg/infoAssetRed.svg"
                      class="img-fluid"
                      height="auto"
                      width="30px;"
                    />
                  </router-link>
                </div>
                <div class="small font-weight-bold">
                  {{ allLanguageData.BookingInfo[0] }}
                  <br />
                  {{ allLanguageData.BookingInfo[1] }}
                </div>
              </div>
            </div>

            <div class="col-7 border-left">
              <div class="d-flex justify-content-start align-items-center">
                <div class v-bind:class="langName == 'ar' ? 'pl-2' : 'pr-2'">
                  <router-link
                    v-if="preimere == true || preimere == 'true'"
                    to="#"
                    id="fbInfo"
                  >
                    <img
                      src="@/assets/img/svg/infoAssetBlack.svg"
                      class="img-fluid"
                      height="auto"
                      width="30px;"
                    />
                  </router-link>

                  <router-link v-else to="#" id="fbInfo">
                    <img
                      src="@/assets/img/svg/infoAssetRed.svg"
                      class="img-fluid"
                      height="auto"
                      width="30px;"
                    />
                  </router-link>
                </div>
                <div class="small font-weight-bold">
                  {{ allLanguageData.FNB[0] }}
                  <br />
                  {{ allLanguageData.FNB[1] }}
                </div>
                <h4
                  class="font-weight-bold lh-1 mb-0"
                  v-bind:class="langName == 'ar' ? 'pr-1' : 'pl-1'"
                >
                  X {{ fnbQty }}
                </h4>
              </div>
            </div>
          </div>
        </div>

        <div v-if="sectionName.foodAndBeverages" class="p-3 border-top">
          <div class="row" v-bind:class="langName == 'ar' ? 'mr-0' : 'ml-0'">
            <div v-b-modal.quitBooking class="col-1 px-0">
              <img
                src="@/assets/img/svg/cheveron-circle-left.svg"
                class="img-fluid mob-arrow-svg"
                height="auto"
                width="40px"
              />
            </div>
            <div class="col align-self-center">
              <div class="small font-weight-bold text-center">
                {{ allLanguageData.Total }}: {{ currency }}
                {{ changeNumberFormat(totalAmount) }} SAR
              </div>
            </div>
            <div class="col">
              <button
                v-if="
                  foodAndBeverages.selected.length == 0 && fromQrCode !== true
                "
                v-on:click="onconfirm()"
                class="btn btn-danger px-4 btn-red mw-150 ml-auto"
              >
                {{ allLanguageData.Skip }}
              </button>
              <button
                v-if="
                  fromQrCode == true && foodAndBeverages.selected.length == 0
                "
                disabled
                class="btn btn-danger px-4 btn-red mw-150 ml-auto"
              >
                {{ allLanguageData.Checkout }}
              </button>

              <button
                v-if="foodAndBeverages.selected.length != 0"
                v-on:click="onconfirm()"
                class="btn btn-danger px-4 btn-red mw-150 ml-auto"
              >
                {{ allLanguageData.Checkout }}
              </button>
            </div>
          </div>
        </div>

        <div v-if="sectionName.checkout" class="p-3 border-top">
          <div class="row" v-bind:class="langName == 'ar' ? 'mr-0' : 'ml-0'">
            <div v-b-modal.quitBooking class="col-1 px-0">
              <img
                src="@/assets/img/svg/cheveron-circle-left.svg"
                class="img-fluid mob-arrow-svg"
                height="auto"
                width="40px"
              />
            </div>
            <div class="col align-self-center">
              <div class="small font-weight-bold text-center">
                {{ allLanguageData.Total }}: {{ currency }}
                {{ changeNumberFormat(totalAmount) }} SAR
              </div>
            </div>
            <div class="col">
              <button
                v-on:click="checkoutPopUp()"
                class="btn btn-danger px-4 btn-red mw-150 ml-auto"
              >
                {{ allLanguageData.Checkout }}
              </button>
            </div>
          </div>
        </div>

        <div class="moviePopover">
          <b-popover target="movieInfo" placement="top">
            <div class="popmovie-info py-2">
              <router-link
                v-if="preimere == true || preimere == 'true'"
                to
                class="closeBtn"
              >
                <img
                  src="@/assets/img/svg/close-icon-black.svg"
                  class="img-fluid"
                  height="auto"
                  width="10px"
                />
              </router-link>

              <router-link v-else to class="closeBtn">
                <img
                  src="@/assets/img/svg/close-icon.svg"
                  class="img-fluid"
                  height="auto"
                  width="10px"
                />
              </router-link>

              <ol class="list-inline small font-weight-bold mb-0 lh-2">
                <li class="list-inline-item mr-0">
                  <span class="text-uppercase">{{
                    cinemaDetails.MovieTitle
                  }}</span>
                </li>
                <li class="list-inline-item mr-0">
                  <span class="text-dark">&bull;</span>
                  <span class="text-uppercase">{{ cinemaDetails.Name }}</span>
                </li>
                <li class="list-inline-item mr-0">
                  <span class="text-dark">&bull;</span>
                  <span class="text-uppercase">{{
                    cinemaDetails.BookingDate
                  }}</span>
                </li>
                <li class="list-inline-item mr-0">
                  <span class="text-dark">&bull;</span>
                  <span class="text-uppercase"
                    >{{ cinemaDetails.Format }} ({{
                      cinemaDetails.Language
                    }})</span
                  >
                </li>
                <li class="list-inline-item mr-0">
                  <span class="text-dark">&bull;</span>
                  <span class="text-uppercase">{{
                    cinemaDetails.BookingTime
                  }}</span>
                </li>
                <li class="list-inline-item mr-0">
                  <span class="text-dark">&bull;</span>
                </li>
                <li class="list-inline-item">
                  <ul class="seat-list lh-1">
                    <li
                      v-for="(seat, seatsSelectedIndex) in selectedSeats"
                      :key="seatsSelectedIndex"
                    >
                      {{ seat.SeatName }}
                    </li>
                  </ul>
                </li>
              </ol>
            </div>
          </b-popover>
        </div>

        <div class="fbPopover">
          <b-popover target="fbInfo" placement="top" class="popMenu">
            <div class="popmovie-info py-2 pr-2">
              <router-link
                v-if="preimere == true || preimere == 'true'"
                to
                class="closeBtn"
              >
                <img
                  src="@/assets/img/svg/close-icon-black.svg"
                  class="img-fluid"
                  height="auto"
                  width="10px"
                />
              </router-link>

              <router-link v-else to class="closeBtn">
                <img
                  src="@/assets/img/svg/close-icon.svg"
                  class="img-fluid"
                  height="auto"
                  width="10px"
                />
              </router-link>
              <div v-if="foodAndBeverages.selected.length == 0">
                {{ allLanguageData.NoItems }}
              </div>
              <ul v-if="FoodNAStatus" class="food-list lh-2">
                <li
                  class="font-weight-bold small"
                  v-for="(foodAndBeveragesSingle,
                  foodAndBeveragesSelectedIndex) in foodAndBeverages.selected"
                  :key="foodAndBeveragesSelectedIndex"
                >
                  {{ foodAndBeveragesSingle.Qty }} x
                  {{ foodAndBeveragesSingle.ItemName }}
                </li>
              </ul>
            </div>
          </b-popover>
        </div>
      </section>

      <!-- -------------------------------------------------------------------------------------------------------------------------------------------- -->

      <!-- CONFIRMATION SECTION -->
      <section v-if="sectionName.checkout" class="container-fluid mb-5 pb-5">
        <div class="col-12 col-md-11 mx-auto px-0 mt-5">
          <div
            class="col-12 col-sm-10 col-md-8 col-lg-6 col-xl-6 fticket-container"
          >
            <div class="fticket-title">{{ allLanguageData.Confirmation }}</div>
            <div class="col-12 p-3">
              <!-- <div class="d-flex justify-content-between mb-3">
              <div class="font-weight-bold">SUB-TOTAL</div>
              <div class="font-weight-bold">{{currency}} 345.00</div>
            </div>-->
              <!-- <div class="d-flex justify-content-between mb-2">
              <div v-if="parseInt(totalNumberOfSeats) == 1">
                {{ allLanguageData.Ticket }} X {{ totalNumberOfSeats }}
              </div>
              <div v-if="parseInt(totalNumberOfSeats) > 1">
                {{ allLanguageData.Tickets }} X {{ totalNumberOfSeats }}
              </div>
              <div>{{ currency }} {{ changeNumberFormat(amount) }}</div>
            </div> -->
              <div
                v-if="FoodNAStatus && foodAndBeverages.selected.length > 0"
                class="d-flex justify-content-between mb-2"
              >
                <div>
                  {{ allLanguageData.FNB[0] }} {{ allLanguageData.FNB[1] }} X
                  {{ fnbQty }}
                </div>
                <div>{{ currency }} {{ changeNumberFormat(fnbtotal) }}</div>
              </div>
              <!-- <div class="d-flex justify-content-between mb-2">
              <div>
                {{ allLanguageData.BookingFee }} X {{ totalNumberOfSeats }}
              </div>
              <div>
                {{ currency }}
                {{ changeNumberFormat(total_internet_handling_amt) }}
              </div>
            </div> -->
              <div class="border-dotted-bottom"></div>
              <div class="d-flex justify-content-between mb-2 pt-2">
                <div>Total Amount</div>
                <div>
                  {{ currency }}
                  {{ changeNumberFormat(total_AmountNew) }}
                </div>
              </div>

              <!-- <div class="d-flex justify-content-between">
              <div class="font-weight-bold">{{allLanguageData.InterntHandling}}</div>
              <div class="font-weight-bold">{{currency}} {{internethandling}}</div>
            </div>-->
            </div>

            <div class="border-dotted-bottom"></div>

            <!-- <div class="col-12 p-3">
            <div class="d-flex justify-content-between">
              <div class="offer-collapse" v-b-toggle="'offers'">UNLOCK OFFFERS & PROMOTION</div>
              <div>
                <img src="@/assets/img/svg/icon-gift.svg" height="auto" width="18px" alt="">
              </div>
            </div>


            <b-collapse id="offers">

              <div class="row">
                <div class="col-md-8 col-lg-9">
                  <ul class="list-unstyled mt-4 mb-0">
                    <li class="mb-2" v-for="(index, key) in 4" :key="key">
                      <div class="row">
                        <div class="col-md-3">

                          <div class="offer-title">OFFER 1</div>
                        </div>
                        <div class="col-md-9">
                          <a href="#" class="text-white small" v-b-modal.offer-terms-condition>Offers terms &
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
                  <div class="font-weight-bold ">- SR 36.00</div>
                </div>
              </div>
            </b-collapse>
          </div>-->

            <!-- <div class="border-dotted-bottom"></div> -->

            <!-- section 1 -->
            <div class="col-12 my-3" v-if="CheckLoyaltyApplicable.length > 0">
              <div
                class="accordion accordian-box"
                v-if="
                  CheckLoyaltyApplicable[0].isapplicableloyalty == 1 &&
                    CheckLoyaltyApplicable[0].TierType.toLowerCase() != 'red'
                "
              >
                <div class="border fs-13 d-flex justify-content-between p-2">
                  <a class="fs-12 pt-1"
                    >Do you want to Redeem Club Empire Loyalty points ?</a
                  >

                  <div class="d-flex">
                    <button
                      class="btn btn-white font-weight-bold mr-2"
                      @click="toggleTwo = true"
                    >
                      YES
                    </button>
                    <button
                      class="btn btn-white font-weight-bold"
                      @click="toggleTwo = false"
                    >
                      NO
                    </button>
                  </div>
                </div>
                <div class="p-2 border" v-show="toggleTwo">
                  <div class="row">
                    <div class="col-md-8">
                      <h6>Apply for Loyalty Program</h6>
                    </div>
                    <div class="col-md-4">
                      <h6 class="fs-12 text-right">
                        {{ CheckLoyaltyApplicable[0].TierType }} Tier Member
                      </h6>
                      <h6 class="fs-12 text-right">
                        Total Points:
                        {{ CheckLoyaltyApplicable[0].BalancePoint }}
                      </h6>
                    </div>
                  </div>
                  <div
                    class="row py-2"
                    v-if="CheckLoyaltyApplicable[0].afterSuccess == false"
                  >
                    <div class="col-md-7">
                      <label class="fs-12"
                        >Please enter points you want to reedem for this
                        transaction</label
                      >
                      <input
                        type="number"
                        class="form-control"
                        placeholder
                        v-model="PointsRedeem"
                      />
                    </div>
                    <div
                      class="col-md-5 justify-content-center align-self-center"
                    >
                      <button
                        class="btn btn-white px-5"
                        @click="showApplyvalidate"
                        :disabled="checKApplyDisable"
                      >
                        APPLY
                      </button>
                    </div>
                  </div>
                  <div class="row">
                    <div
                      class="col-md-12 d-flex font-weight-bold fs-14 justify-content-between"
                    >
                      <div>
                        <small
                          v-if="CheckLoyaltyApplicable[0].afterSuccess == false"
                          >(Minimum point redeem
                          {{ CheckLoyaltyApplicable[0].MinPoints }} & maximum
                          point redeem
                          {{ CheckLoyaltyApplicable[0].BalancePoint }})</small
                        ><br />
                        {{
                          CheckLoyaltyApplicable[0].afterSuccess == false
                            ? CheckLoyaltyApplicable[0].pointscontext
                            : ""
                        }}
                        <br
                          v-if="CheckLoyaltyApplicable[0].afterSuccess == false"
                        />
                        {{
                          CheckLoyaltyApplicable[0].afterSuccess
                            ? "POINTS USED = " +
                              CheckLoyaltyApplicable[0].PointsRedeem +
                              " points"
                            : ""
                        }}
                      </div>
                      <div v-if="CheckLoyaltyApplicable[0].afterSuccess">
                        SAR {{ CheckLoyaltyApplicable[0].SARFinal }}
                      </div>
                    </div>

                    <div
                      class="col-md-12 d-flex font-weight-bold fs-14 justify-content-between"
                    >
                      <div></div>
                      <div
                        v-if="CheckLoyaltyApplicable[0].afterSuccess"
                        @click="cancelReedemtion('2')"
                        style="cursor: pointer"
                      >
                        Cancel Redeemtion
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- FORGOT PASSWORD MODAL OTP-->

            <b-modal
              no-close-on-esc
              no-close-on-backdrop
              id="redeemOTP"
              ref="redeemOTP"
              title="Loyalty Program"
              class="ErModal light-red-color"
            >
              <h6 class="pt-3 mb-0 text-center font-weight-bold text-white">
                Verify OTP
              </h6>
              <b-form-input
                type="number"
                v-validate="'required'"
                name="otp"
                placeholder="OTP *"
                v-model="otpVerifyLoyalty"
              />
              <span v-if="otpVerifyLoyaltyError != ''">{{
                otpVerifyLoyaltyError
              }}</span>
              <br />
              <span
                class="small pointer-cus mt-1 text-white"
                @click="otpApplyvalidate('resendotp')"
                >Resend OTP</span
              >

              <b-button
                @click="otpApplyvalidate('redeem')"
                variant="default"
                class="btn btn-green mt-4 mb-3"
                >Verify</b-button
              >
            </b-modal>

            <b-modal
              no-close-on-esc
              no-close-on-backdrop
              id="successPopup"
              ref="successPopup"
              title="Loyalty Program"
              class="ErModal light-red-color"
            >
              <h6 class="pt-3 mb-0 text-center font-weight-bold text-white">
                OTP Verified Succesfully!
              </h6>

              <b-button
                @click="successClosed()"
                variant="default"
                class="btn btn-green mt-4 mb-3"
                >ok</b-button
              >
            </b-modal>

            <b-modal
              no-close-on-esc
              no-close-on-backdrop
              id="loyalityPopup"
              ref="loyalityPopup"
              title="Loyalty Program"
              class="ErModal light-red-color"
            >
              <h6 class="pt-3 mb-0 text-center font-weight-bold text-white">
                {{ this.loyalityPopUpMessage }}
              </h6>

              <div v-if="showSuccessRedeemtion == false">
                <b-button
                  @click="successClosed()"
                  variant="default"
                  class="btn btn-green mt-4 mb-3"
                  >ok</b-button
                >
              </div>
              <div v-if="showSuccessRedeemtion">
                <b-button
                  @click="cancelReedemtion('1')"
                  variant="default"
                  class="btn btn-green mt-4 mb-3"
                  >Yes</b-button
                >
                <b-button
                  @click="successClosed()"
                  variant="default"
                  class="btn btn-green mt-4 mb-3"
                  >No</b-button
                >
              </div>
            </b-modal>

            <!-- FORGOT PASSWORD MODAL ENDS -->

            <!-- section 2 -->
            <div class="col-12" v-if="CheckLoyaltyApplicable.length > 0">
              <div
                class="row border m-1 p-2"
                v-if="
                  CheckLoyaltyApplicable[0].isapplicableloyalty == 1 &&
                    CheckLoyaltyApplicable[0].TierType.toLowerCase() == 'red'
                "
              >
                <div class="col-md-8 justify-content-center align-self-center">
                  <h6 class="fs-12">
                    You can reedem points once you reached bronze tier
                  </h6>
                </div>
                <div class="col-md-4 text-right">
                  <h6 class="fs-13">
                    {{ CheckLoyaltyApplicable[0].TierType }} Tier
                  </h6>
                  <h6 class="fs-13">
                    Total Points: {{ CheckLoyaltyApplicable[0].BalancePoint }}
                  </h6>
                </div>
              </div>
            </div>

            <!-- section 3 -->

            <div
              class="col-12"
              v-if="
                CheckLoyaltyApplicable.length > 0 && successLoyality == false
              "
            >
              <div
                class="row border m-1 p-2"
                v-if="CheckLoyaltyApplicable[0].isapplicableloyalty == 0"
              >
                <h6 class="fs-13">
                  Would you like to register club empire?
                  <button
                    @click="toggleOne = true"
                    class="btn btn-proceed btn-transparent"
                  >
                    YES
                  </button>
                  <button
                    @click="toggleOne = false"
                    class="btn btn-proceed btn-transparent"
                  >
                    NO
                  </button>
                </h6>
                <div v-show="toggleOne">
                  <h6 class="fs-13">
                    To register club empire, verify your mobile number.
                  </h6>
                  <h6 class="fs-13" v-if="false">
                    Would you like to use same mobile number or change?
                    <!-- <a @click="toggleTwo = false">SAME</a> | -->
                    <a @click="toggleThree = true">CHANGE</a>
                  </h6>
                  <div v-show="showOTPLoality == false">
                    <div class="input-container mb-2">
                      <input
                        type="text"
                        id="fName"
                        name="First-Name"
                        class="form-control"
                        v-model="
                          CheckLoyaltyApplicable[0].userdetail[0]['Mobile']
                        "
                        :disabled="showMobileEnable"
                        placeholder="Mobile"
                      />
                      <span @click="showMobileEnable = false">
                        <label for="fMobileNum"></label
                      ></span>
                    </div>
                    <button
                      class="btn btn-white w-25 font-weight-bold"
                      @click="verifyLoyalityMob('validateUser')"
                    >
                      VERIFY
                    </button>
                  </div>
                  <div class="mt-3" v-if="showOTPLoality">
                    <!-- show after OTP verified -->
                    <h6 class="fs-13">
                      Kindly verify your OTP number to become member of the
                      loyalty
                    </h6>
                    <div class="col-md-7">
                      <label class="fs-12">OTP</label>
                      <input
                        type="text"
                        class="form-control"
                        placeholder
                        v-model="otpVerifyMobile"
                      />
                      <span
                        class="small pointer-cus mt-1"
                        @click="verifyLoyalityMob('ResendOtp')"
                        >Resend OTP</span
                      >
                    </div>
                    <div
                      class="col-md-5 justify-content-center align-self-center"
                    >
                      <button
                        class="btn btn-white mt-2 font-weight-bold"
                        @click="verifyLoyalityMob('NewUser')"
                      >
                        create new
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="border-dotted-bottom"></div>
            <div class="col-12 p-3">
              <div class="d-flex justify-content-between">
                <div class="font-weight-bold">
                  {{ allLanguageData.TotalPayable }}
                </div>
                <div class="font-weight-bold">
                  {{ currency }} {{ changeNumberFormat(total_ticket_fnb) }}
                </div>
              </div>
              <small>(includes all taxes and fees)</small>
            </div>
          </div>
        </div>

        <div class="col-12 col-md-11 mx-auto px-0 pt-3">
          <!-- <div class="col-12 col-sm-10 col-md-8 col-lg-6 col-xl-6 fticket-container checkout-tc">
        <b-button v-b-toggle.collapse-3 variant="default" class="m-1">{{allLanguageData.TermsAndCondition}}</b-button>
        <b-collapse visible id="collapse-3">
           <b-card>
          <ul v-bind:class="langName == 'ar' ? 'text-right':'text-left'">
            <li v-for="(tnc,tnckey) in allLanguageData.TicketsTnC" :key="tnckey">{{tnc}}</li>
          </ul>
           </b-card>
        </b-collapse>
        </div>-->
          <p
            class="etc-text text-center text-uppercase mt-3 pt-3 mt-md-5 pt-md-5"
          >
            {{ allLanguageData.ReturnsPolicy }}
          </p>
          <p class="etc-text ftw pb-4">
            {{ allLanguageData.ReturnsPolicyContent }}
          </p>
        </div>
      </section>

      <form
        style="display: none"
        ref="submitForm"
        :action="BASEURL + userDetails.redirectURL"
        method="POST"
      >
        <!-- <form style="display:none" ref="submitForm" action="http://empireapi.binarynumbers.io/sbapi/paymentgateway/processpayment.php" method="POST">  -->
        <input type="text" name="ReserveID" v-bind:value="reserveID" />
        <input type="text" name="PaymentID" v-bind:value="'2'" />
        <input type="text" name="ApiCallURL" v-bind:value="BASEURL + '/'" />

        <input type="text" name="SucessUrl" v-bind:value="ConfirmationURL" />
        <input type="text" name="FailUrl" v-bind:value="FailedURL" />
        <input type="text" name="email" v-bind:value="userDetails.email" />
        <input
          type="text"
          name="mobile"
          v-bind:value="userDetails.phoneNumber"
        />

        <input type="text" name="LanguageID" v-bind:value="LanguageID" />
        <input type="text" name="CountryID" v-bind:value="CountryID" />
        <input type="text" name="CinemaType" v-bind:value="CinemaType" />

        <input
          type="text"
          name="countrycode"
          v-bind:value="userDetails.countryCode"
        />
        <input type="submit" value="Submit" />
      </form>

      <!-- TOTAL AMOUNT FOOTER -->
    </div>

    <!-- <pdf src="https://bitcoin.org/bitcoin.pdf"></pdf> -->
    <!-- <h4 class="my-4 text-white text-center">PDF Preview</h4> -->
    <!-- <div
      class="text-center my-5 d-flex align-items-center justify-content-center"
      @click="onClickOpenModal()"
    >
      <img src="@/assets/img/pdfshow.png" alt="" />
    </div> -->

    <div
      class="my-5 d-flex align-items-center justify-content-center"
      style="min-height: 82vh"
    >
      {{ count }}
      <div class="holds-the-iframe h-100 w-100" v-if="showIframe == true">
        <vue-pdf-embed :source="PDFurl" @rendered="handleDocumentRender" />
        <!-- <iframe
          name="iframe"
          src="https://docs.google.com/gview?url=https://apiksa.empirecinemas.com.sa/VipFnBPdf/2/S2715VPA6&embedded=true"
          width="100%"
          height="600px"
          frameborder="0"
        ></iframe> -->
      </div>
    </div>
<div v-show="displayPopup">
    <b-modal
      no-close-on-esc
      no-close-on-backdrop
      id="selectLang"
      ref="selectLang"
      centered
      title="SELECT LANGUAGE FOR FOOD AND BEVERAGE"
      class="ErModal light-red-color"
    >
      <div class="col-12 py-4">
        <div class="row">
          <div class="col-6">
            <b-button
              @click="onClickRedirect('2')"
              variant="default"
              class="btn btn-green w-100"
              >English</b-button
            >
          </div>
          <div class="col-6">
            <b-button
              @click="onClickRedirect('1')"
              variant="default"
              class="btn btn-green w-100"
              >Arabic</b-button
            >
          </div>
        </div>
      </div>
    </b-modal>
    </div>
  </div>
</template>

<script>
import { makeRequest } from '@/helper/internet.js'
import { groupBy } from 'lodash'
import { EventBus } from '@/main'
import axios from 'axios'
import { URL_BASE } from '@/helper/constant'
import {
  LanguageService,
  CountryService,
  TokenService,
} from '@/services/storage.service'
// import pdf from "vue-pdf";
// import VuePDFViewer from "vue-pdf-viewer";

import VuePdfEmbed from 'vue-pdf-embed/dist/vue2-pdf-embed'

export default {
  beforeCreate: function () {
    let pre = window.localStorage.getItem('PREIMERE')
    if (pre == null || pre == 'false' || pre == false) {
      document.body.className = 'img-section'
    } else {
      document.body.className = 'gold-black-bg'
    }
  },

  name: 'seatlayout',
  components: {
    VuePdfEmbed,
    // pdf,
    // "vue-pdf-viewer": VuePDFViewer,
  },
  computed: {
    checKApplyDisable () {
      if (this.CheckLoyaltyApplicable.length > 0) {
        if (
          parseInt(this.PointsRedeem) >=
            parseInt(this.CheckLoyaltyApplicable[0].MinPoints) &&
          parseInt(this.PointsRedeem) <=
            parseInt(this.CheckLoyaltyApplicable[0].BalancePoint)
        ) {
          return false
        } else {
          return true
        }
      } else {
        return true
      }
    },
  },
  metaInfo: {
    title: 'Seatlayout',
    titleTemplate: null,
  },
  data () {
    return {
      count: 1,
      currentPage: 0,
      PDFurl: '',
      pageCount: 0,
      cinemaData: '',
      displayPopup: '',
      defaultLang: '',
      newCinemaIdValue: '',
      isQrCodeData: false,
      toggleTwo: false,
      total_AmountNew: 0,
      preimere: false,
      BASEURL: URL_BASE,
      ConfirmationURL: '',
      FailedURL: '',
      toggleOne: false,
      userDetails: {},
      show: false,
      cinemaDetails: {},
      // Timer
      timerStartFunction: null,
      timer: {
        TimeoutModal: false,
        minutes: 9,
        seconds: 59,
        stop: false,
      },
      seatLayout: [],
      seatTypes: [],
      countryData: {},
      sectionName: {
        selectNoOfSeats: true,
        seatLayout: true,
        foodAndBeverages: false,
        checkout: false,
        showFooter: true,
      },
      paymentModal: {
        editContactDetails: false,
        viewContactDetails: true,
        wallet: false,
      },
      numberOfSeatsSelected: 0,
      totalNumberOfSeats: 0,
      errorMessage: '',
      selectedSeats: [],
      totalAmount: 0,
      discount: 0,
      movieDetails: {},
      foodAndBeverages: {
        listing: [],
        status: false,
        selected: [],
        allListing: [],
        selectedCategory: 'All',
      },
      days: [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
      ],
      months: [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sept',
        'Oct',
        'Nov',
        'Dec',
      ],
      URLlink: '',
      FoodNAMessage: '',
      FoodNAStatus: true,
      fnbtotal: 0,
      fnbQty: 0,
      amount: 0,
      total_internet_handling_amt: 0,
      internethandling: 0,
      total_ticket_fnb: 0,
      currency: '',
      ReserveID: '',
      bookingID: '',
      reserveID: '',
      theatreID: '',
      otpVerifyLoyalty: '',
      otpVerifyLoyaltyError: '',
      LanguageID: '',
      CountryID: '',
      CinemaType: '',
      FnbUrl: '',
      CheckLoyaltyApplicable: [],
      PointsRedeem: '',
      showMobileEnable: true,
      showOTPLoality: false,
      loyalityPopUpMessage: '',
      successLoyality: '',
      otpVerifyMobile: '',
      showSuccessRedeemtion: false,
      isLoading: true,
      showIframe: false,
      QrCodeData: '',
    }
  },
  beforeMount () {
    this.MovieID = this.$route.params.movieId
    this.QrCodeData = this.$route.fullPath
    // this.CategoryID = this.$route.params.categoryId;
    this.scheduleID = this.$route.params.scheduleID

    // this.getSeatLayoutNew();
    // this.fetchMovieDetails();
    this.sectionName.seatLayout = false
    this.sectionName.foodAndBeverages = true
    this.FoodNAStatus = true
    this.ConfirmationURL = window.location.origin + '/confirmation'
    this.FailedURL = window.location.origin + '/failedPayment'
  },
  mounted: async function () {
    this.onClickOpenModal()
    // this.PDFurl = "https://docs.google.com/gview?url=" +
    //               apiksa.empirecinemas.com.sa/VipFnBPdf/LangID/1 +
    //               "&embedded=true"
    // this.onClickRedirect();

    // if (window.localStorage.getItem("isQrCodeKey") == "InCinemaFB") {
    //   this.isQrCodeData = true;
    // } else {
    //   this.isQrCodeData = false;
    // }
    await this.getFoodAndBeverages()

    EventBus.$on('getCheckLoyalityFnb', e => {
      //  if(this.CheckLoyaltyApplicable.length==0){
      this.getCheckLoyalityApplicable(this.reserveID, this.theatreID)
      // }
    })
    let language = LanguageService.getLanguage()
    let country = CountryService.getCountry()

    // countryid
    if (!country) {
      this.CountryID = 119
    } else {
      this.CountryID = country.CountryID
    }
    // languageid
    if (!language) {
      this.LanguageID = 2
    } else {
      this.LanguageID = language.lang_id
    }
    this.preimere = window.localStorage.getItem('PREIMERE')
    // premiere type
    if (this.preimere == true || this.preimere == 'true') {
      this.CinemaType = 'premiere'
    } else {
      this.CinemaType = 'normal'
    }
    EventBus.$on('paymentCompletionEvent', user => {
      this.paymentConfirmation()
    })
    EventBus.$on('checkOutEvent', userDetails => {
      this.checkout(userDetails)
    })
    window.addEventListener('message', function (e) {
      if (e.data === 'sb:bn:loaded') {
        EventBus.$emit('paymentCompletionEvent', e)
      }
    })
  },
  methods: {
    onClickOpenModal: function () {
      this.$refs.selectLang.show()
    },
    handleDocumentRender () {
      this.hideLoading()
    },
    onClickRedirect: function (value) {
      this.showIframe = false
      let objHtml = ''
      let urlQrCode = (this.QrCodeData || '').split('lets-eat/')
      let qrCodeNewData = this.$route.params.code
      this.showLoading()
      console.log(
        'this.$route.params.codethis.$route.params.code',
        this.$route.params.code
      )

      if (qrCodeNewData == undefined) {
        qrCodeNewData = urlQrCode[1]
      }
      const d = new Date().getTime()
      this.$refs.selectLang.hide()
      this.PDFurl =
        'https://apinew.empirecinemas.com/VipFnBPdf/' +
        value +
        '/' +
        qrCodeNewData +
        '?CountryID=230'
      let newVar = localStorage.getItem('qrCount')
        ? localStorage.getItem('qrCount')
        : 1

      //       objHtml = `

      // <object data="${this.PDFurl}" width="600" height="400">
      //     <embed src="${this.PDFurl}" width="600" height="400"> </embed>
      //     Error: Embedded data could not be displayed.
      // </object>
      // `;
      // <iframe
      //           name="abc${d}"
      //           src="${this.PDFurl}"
      //           width="100%"
      //           height="600px"
      //           frameborder="0"
      //           seamless
      //         ></iframe>
      // document.getElementById("showPdf").innerHTML = objHtml;
      // this.count = this.count + 1;
      localStorage.setItem('qrCount', newVar + 1)

      console.log('this.count this.count', this.count)

      this.showIframe = true

      console.log('object :>> PDFurl', this.PDFurl)
      // this.$refs.selectLang.hide();
      // let payload = {
      //   LangID: value,
      // };

      // makeRequest("/VipFnBPdf", "POST", null, payload)
      //   .then((response) => {
      //     const { error, res } = response;
      //     if (!error) {
      //       const { data } = res;
      //       if (data && data.Status) {
      //         console.log("data :>> ", data);
      //         console.log("data.data :>> ", data.data);
      //         // this.PDFurl = data.data;
      //         // window.location.href = data.Path;
      //         // window.open(data.Path, "_blank");
      //         // window.open(
      //         //   "https://docs.google.com/gview?url=" +
      //         //     data.Path +
      //         //     "&embedded=true"
      //         // );

      //         this.PDFurl = "https://docs.google.com/gview?url=" +
      //             data.Path +
      //             "&embedded=true"
      //         //  ("https://docs.google.com/gview?url=YOUR_API_KEY&embedded=true&url=http://trafficpolice.gov.np/traffic/uploadfiles/56a0e8156d4ea.pdf");

      //         // this.URLlink = data.Path;
      //         this.$refs.selectLang.hide();
      //       } else {
      //         console.log("data.message :>> ", data);
      //       }
      //     } else {
      //     }
      //   })
      //   .catch((error) => {});
    },
    successClosed () {
      this.$refs.successPopup.hide()
      this.$refs.loyalityPopup.hide()
      this.showSuccessRedeemtion = false
    },
    cancelReedemtion (id) {
      if (id == '1') {
        let payload = {
          ReserveID: this.reserveID,
          TransactionType: 'Normal',
          LanguageID: this.LanguageID,
          CountryID: this.CountryID,
          TheatreId: this.theatreID,
          OTP: '',
          PointsRedeemcancel: this.CheckLoyaltyApplicable[0].PointsRedeem,
          // CinemaType: "normal",
        }
        makeRequest('/Loyaltycancelrdeempoint/', 'POST', null, payload)
          .then(result => {
            this.hideLoading()
            const { error, res } = result
            const { data } = res
            // console.log(res)
            this.showSuccessRedeemtion = false
            if (!error && res.data.Status) {
              this.loyalityPopUpMessage =
                res.data.Message == ''
                  ? 'Your redeemtion is canceled.'
                  : res.data.Message
              this.$refs.loyalityPopup.show()

              this.PointsRedeem = ''
              this.$root.$emit('bv::toggle::collapse', 'accordion-1')
              this.CheckLoyaltyApplicable[0].afterSuccess = false
              this.ReserveDetails()
            } else {
              // this.successLoyality=true;
              this.loyalityPopUpMessage = res.data.Message
              this.$refs.loyalityPopup.show()
              //  this.PointsRedeem="";
              //   this.$root.$emit('bv::toggle::collapse', 'accordion-1');
              //   this.CheckLoyaltyApplicable[0].afterSuccess=false;
            }
          })
          .catch(error => {
            this.hideLoading()
            console.log('Error on vue front', error)
          })
      } else {
        this.showSuccessRedeemtion = true
        this.loyalityPopUpMessage = 'Do you want to cancel redeemtion?'
        this.$refs.loyalityPopup.show()
      }
    },
    verifyLoyalityMob (id) {
      let payload = {
        ...this.CheckLoyaltyApplicable[0].userdetail[0],
        ReserveID: this.reserveID,
        TransactionType: 'Normal',
        LanguageID: this.LanguageID,
        CountryID: this.CountryID,
        TheatreId: this.theatreID,
        OTP: this.otpVerifyMobile,
        CinemaType: 'normal',
      }
      if (id == 'NewUser') {
        payload['Action'] = id
      } else if (id == 'ResendOtp') {
        payload['Action'] = id
        payload['OTP'] = ''
      } else if (id == 'validateUser') {
        payload['Action'] = id
        payload['OTP'] = ''
      }

      makeRequest('/LoyaltyCustomer/', 'POST', null, payload)
        .then(result => {
          this.hideLoading()
          const { error, res } = result
          const { data } = res
          // console.log(res)
          if (!error && res.data.Status) {
            if (id == 'NewUser') {
              this.successLoyality = true
              this.$refs.loyalityPopup.show()
            } else if (id == 'ResendOtp') {
              this.loyalityPopUpMessage =
                res.data.vallidateuserdata[0].ErrMessage
              this.$refs.loyalityPopup.show()
            } else if (id == 'validateUser') {
              this.showOTPLoality = true
              this.loyalityPopUpMessage =
                res.data.vallidateuserdata[0].ErrMessage
              this.$refs.loyalityPopup.show()
            }
          } else {
            // this.successLoyality=true;
            this.loyalityPopUpMessage = res.data.Message
            this.$refs.loyalityPopup.show()
          }
        })
        .catch(error => {
          this.hideLoading()
          console.log('Error on vue front', error)
        })
    },
    otpApplyvalidate (id) {
      this.otpVerifyLoyaltyError = ''
      let payload = {
        ReserveID: this.reserveID,
        TransactionType: 'Normal',
        LanguageID: this.LanguageID,
        CountryID: this.CountryID,
        TheatreId: this.theatreID,
        Action: id,
        PointsRedeem: this.PointsRedeem,
        OTP: this.otpVerifyLoyalty,
      }
      makeRequest('/RedeemPoint/', 'POST', null, payload)
        .then(result => {
          this.hideLoading()
          const { error, res } = result
          const { data } = res
          // console.log(res)
          if (!error && res.data.Status) {
            if (id == 'redeem') {
              this.$refs.redeemOTP.hide()
              this.CheckLoyaltyApplicable[0]['afterSuccess'] = true
              this.CheckLoyaltyApplicable[0]['SARFinal'] = res.data.PointsValue
              this.CheckLoyaltyApplicable[0]['PointsRedeem'] =
                res.data.PointsRedeem
              this.ReserveDetails()
              // Success Pop up
              this.$refs.successPopup.show()
            } else {
              this.otpVerifyLoyaltyError =
                res.data.Message == ''
                  ? 'OTP sent to your mobile'
                  : res.data.Message
              // this.$refs.loyalityPopup.show();
            }

            // console.log(res.data);
          } else {
            if (id == 'redeem') {
              this.otpVerifyLoyaltyError = res.data.Message
              //   this.$refs.redeemOTP.hide();
              // this.CheckLoyaltyApplicable[0]["afterSuccess"]=true;
              // this.CheckLoyaltyApplicable[0]["SARFinal"]=50;
              // this.CheckLoyaltyApplicable[0]["PointsRedeem"]=50;
              // this.ReserveDetails();
              //  this.$refs.successPopup.show();
            } else {
              this.otpVerifyLoyaltyError = res.data.Message
              // this.$refs.loyalityPopup.show();
            }
          }
        })
        .catch(error => {
          this.hideLoading()
          console.log('Error on vue front', error)
        })
    },
    showApplyvalidate () {
      let payload = {
        ReserveID: this.reserveID,
        TransactionType: 'Normal',
        LanguageID: this.LanguageID,
        CountryID: this.CountryID,
        TheatreId: this.theatreID,
        Action: 'vallidate',
        PointsRedeem: this.PointsRedeem,
      }
      makeRequest('/RedeemPoint/', 'POST', null, payload)
        .then(result => {
          this.hideLoading()
          const { error, res } = result
          const { data } = res
          // console.log(res)
          if (!error && res.data.Status) {
            this.$refs.redeemOTP.show()
            // res.data["afterSuccess"]=false
            // if(res.data.hasOwnProperty("isapplicableloyalty")){
            // this.CheckLoyaltyApplicable.push(res.data);
            //  }
            // console.log(res.data);
          } else {
            // show error modal
            this.$root.$emit('bv::show::modal', 'errorModal')
          }
        })
        .catch(error => {
          this.hideLoading()
          console.log('Error on vue front', error)
        })

      this.$refs.redeemOTP.show()
    },
    onClickRetry: function () {
      this.$refs.FoodNA.hide()
      this.FoodNAStatus = true
    },
    onClickProceed: function () {
      this.$refs.FoodNA.hide()
      this.ReserveDetails()
    },
    changeNumberFormat (number) {
      return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    },
    onClickNo: function () {
      this.$refs.quitBooking.hide()
    },
    FromSubmit: function () {
      console.log('FromSubmit FromSubmit')
    },
    checkoutPopUp: function () {
      if (this.CheckLoyaltyApplicable.length > 0) {
        if (
          parseInt(this.PointsRedeem) >=
            parseInt(this.CheckLoyaltyApplicable[0].MinPoints) &&
          parseInt(this.PointsRedeem) <=
            parseInt(this.CheckLoyaltyApplicable[0].BalancePoint) &&
          this.CheckLoyaltyApplicable[0].afterSuccess == false
        ) {
          this.PointsRedeem = ''
          this.loyalityPopUpMessage =
            'Please complete your Redeemtion procees by click on Apply.'
          this.$refs.loyalityPopup.show()
          return false
        }
      }
      this.checkSignIn()
    },
    goBackHistory () {
      console.log('here :')
      this.$router.go(-1)
    },
    checkSignIn: function () {
      EventBus.$emit('getUserDetailsAndCheckout')
    },
    checkout: function (userDetails) {
      // Call payment function
      this.userDetails = userDetails
      // this.updateBookUser();
      this.$forceUpdate()
      this.$nextTick(() => {
        this.updateBookUser()
      })
      // this.processPayment();
    },
    getCheckLoyalityApplicable (reserveid, CinemaId) {
      // let newTheatreId = this.fromQrCode ? this.newCinemaIdValue : CinemaId;
      let payload = {
        ReserveID: reserveid,
        TransactionType: 'Normal',
        LanguageID: this.LanguageID,
        CountryID: this.CountryID,
        TheatreId: CinemaId,
      }
      makeRequest('/CheckLoyaltyApplicable/', 'POST', null, payload)
        .then(result => {
          this.hideLoading()
          const { error, res } = result
          const { data } = res
          // console.log(res)
          if (!error && res.data.Status) {
            res.data['afterSuccess'] = false
            res.data['SARFinal'] = 0
            res.data['PointsRedeem'] = 0
            if (res.data.hasOwnProperty('isapplicableloyalty')) {
              this.CheckLoyaltyApplicable.push(res.data)
            }
            console.log(res.data)
          } else {
            // show error modal
            this.$root.$emit('bv::show::modal', 'errorModal')
          }
        })
        .catch(error => {
          this.hideLoading()
          console.log('Error on vue front', error)
        })
    },
    bookingRequestConfirmSeats: function () {
      this.showLoading()
      let payload = {
        SchID: this.scheduleID,
        SelectedSeats: this.selectedSeats,
      }
      makeRequest('/BookingReserve/', 'POST', null, payload)
        .then(result => {
          this.hideLoading()
          const { error, res } = result
          const { data } = res.data
          if (!error && res.data.Status) {
            this.reserveID = res.data.ReserveID
            this.theatreID = res.data.Cinema.CinemaID
            this.getCheckLoyalityApplicable(
              this.reserveID,
              res.data.Cinema.CinemaID
            )
          } else {
            // show error modal
            this.$root.$emit('bv::show::modal', 'errorModal')
          }
        })
        .catch(error => {
          this.hideLoading()
          console.log('Error on vue front', error)
        })
    },
    ReserveDetails: function () {
      let TransactionTypeValue = this.fromQrCode ? 'InCinemaFB' : 'Normal'
      let payload = {
        ReserveID: this.reserveID,
        TransactionType: TransactionTypeValue,
      }
      makeRequest('/ReserveDetails', 'POST', null, payload)
        .then(result => {
          const { error, res } = result
          const { data } = res.data
          if (!error && res.data.Status) {
            this.sectionName.checkout = true
            this.sectionName.foodAndBeverages = false
            this.fnbtotal = res.data.fnbamount
            this.total_AmountNew =
              parseInt(res.data.total_amt) + parseInt(this.fnbtotal)
            this.internethandling =
              res.data.total_internet_handling_amt + res.data.fnbvat
            this.total_ticket_fnb = res.data.total_ticket_fnb
            this.amount = res.data.amount
            this.total_internet_handling_amt =
              res.data.total_internet_handling_amt
            this.fnbQty = 0
            // reserve
            res.data.f_and_b.map(fb => {
              this.fnbQty = parseInt(this.fnbQty) + parseInt(fb.qty)
            })
            this.getCountryCode()
          } else {
            this.$root.$emit('bv::show::modal', 'errorModal')
            // show error modal
          }
        })
        .catch(error => {
          console.log('Error on vue front', error)
        })
    },
    getCountryCode: function () {
      let self = this
      //
      axios
        .get('https://ipapi.co/json')
        .then(function (response) {
          // handle success
          self.countryData = response.data
          console.log(response)
        })
        .catch(function (error) {
          // handle error
          console.log(error)
        })
    },
    updateBookUser: function () {
      let payload = {
        ReserveID: this.reserveID,
        Email: this.userDetails.email,
        Mobile: this.userDetails.phoneNumber,
        CountryCode: this.userDetails.countryCode,
      }
      makeRequest('/UpdateBookUser', 'POST', null, payload)
        .then(result => {
          const { error, res } = result
          const { data } = res.data
          if (res.data.Status) {
            this.$nextTick(() => {
              // this.sessionStore.set("EMRID", this.reserveID);
              this.$refs.submitForm.submit()
            })
          } else {
            this.$root.$emit('bv::show::modal', 'checkoutModal')
            this.userDetails.errorMessage = res.data.Message
            console.log('Error Rrom Res', res.data.message)
          }
        })
        .catch(error => {
          this.$root.$emit('bv::show::modal', 'checkoutModal')
          this.userDetails.errorMessage = 'Something went wrong!'
          console.log('Error on vue front', error)
        })

      // let payload = {
      //   ReserveID: this.reserveID,
      //   PaymentID: 2,
      //   ApiCallURL: URL_BASE,
      //   SucessUrl: `${window.location.origin}/confirmation`,
      //   FailUrl: `${window.location.origin}/failedPayment`,
      //   email: this.userDetails.email,
      //   mobile: this.userDetails.phoneNumber,
      //   countrycode: 91
      // };
      // makeRequest("/RedirectPayment", "POST", null, payload)
      //   .then(result => {
      //     const { error, res } = result;
      //     const { data } = res.data;
      //     if (!error) {
      //       window.location.href = "http://google.com";

      //       console.log("Here result >>>", res);
      //       // this.getPaymentOptions();
      //       // this.processPayment();
      //     } else {
      //       console.log("Error Rrom Res", res.message);
      //     }
      //   })
      //   .catch(error => {
      //     console.log("Error on vue front", error);
      //   });
    },
    // updateBookUser: function() {
    // let payload = {
    //   ReserveID: this.reserveID,
    //   Email: this.userDetails.email,
    //   Mobile: this.userDetails.phoneNumber,
    //   CountryCode: 91
    // };
    // makeRequest("/UpdateBookUser", "POST", null, payload)
    //   .then(result => {
    //     const { error, res } = result;
    //     const { data } = res.data;
    //     if (!error) {
    //       // this.getPaymentOptions();
    //       this.processPayment();
    //     } else {
    //       console.log("Error Rrom Res", res.message);
    //     }
    //   })
    //   .catch(error => {
    //     console.log("Error on vue front", error);
    //   });
    // },
    processPayment: function () {
      let payload = {
        ReserveID: this.reserveID,
        PaymentID: 2,
        ApiCallURL: URL_BASE,
        SucessUrl: `${window.location.origin}/confirmation`,
        FailUrl: `${window.location.origin}/failedPayment`,
        // cardtransID: "9867855964"
      }
      makeRequest('/ProcessPayment', 'POST', null, payload)
        .then(result => {
          const { error, res } = result
          const { data } = res.data
          if (!error && data.Status) {
            console.log('processpayment', res.data)
          }
        })
        .catch(error => {
          console.log('Error on vue front', error)
        })
    },
    newConfirmBooking: function () {
      let payload = {
        ReserveID: this.reserveID,
        PaymentID: 2,
        cardtranID: '9867855964',
        PaymentToken: 0,
      }
      if (!this.bookingID) {
        makeRequest('/ConfirmBooking', 'POST', null, payload)
          .then(result => {
            const { error, res } = result
            const { data } = res.data
            if (!error) {
              console.log('confirmbooking', res.data)
              this.bookingID = res.data.BookingID
              this.finalConfirmation()
              // this.getBookingDetails();
            }
          })
          .catch(error => {
            console.log('Error on vue front', error)
          })
      }
    },
    // getBookingDetails: function() {
    //   let payload = {
    //     BookingID: this.bookingID
    //   };
    //   makeRequest("/GetBookingDetails", "POST", null, payload)
    //     .then(result => {
    //       const { error, res } = result;
    //       const { data } = res.data;
    //       if (!error) {
    //         this.bookingDetails = res.data;
    //       }
    //     })
    //     .catch(error => {
    //       console.log("Error on vue front", error);
    //     });
    // },
    getReservationDetails: function () {
      let payload = {
        ReserveID: this.reserveID,
      }
      makeRequest('/ReserveDetails/', 'POST', null, payload)
        .then(result => {
          const { error, res } = result
          const { data } = res.data
          if (!error) {
            this.reserveID = res.data.ReserveID
            this.getPaymentOptions()
          }
        })
        .catch(error => {
          console.log('Error on vue front', error)
        })
    },
    getPaymentOptions: function () {
      let payload = {
        ReserveID: this.reserveID,
      }
      makeRequest('/GetPaymentOptions/', 'POST', null, payload)
        .then(result => {
          const { error, res } = result
          if (!error && res.status) {
            //   console.log(" pay Options res ", res);
            this.newConfirmBooking()
            console.log(' pay Options Data ', res.data)
            // res.data.Paymentoptions.forEach(singlePaymentOption => {
            //   if (singlePaymentOption.PaymentID == 3) {
            //     singlePaymentOption.Cards = singlePaymentOption.Cards.forEach(
            //       x => {
            //         console.log("singleCard", x);
            //         x["CVV"] = "";
            //         console.log("singleCard", x);
            //         this.savedCreditCards.push(x);
            //       }
            //     );
            //     //   this.savedCreditCards = singlePaymentOption.Cards;
            //     // console.log('test1', this.savedCreditCards,singlePaymentOption.Cards )
            //   }
            // });
            //   this.savedCreditCards = res.data.Paymentoptions[1];
            //  this.paymentOptions = data.paymentOptions.Paymentoptions;
          } else {
            console.log('error from res', res.message)
          }
        })
        .catch(error => {
          console.log('Error on vue front', error)
        })
    },
    editNumberOfSeats: function (number) {
      this.totalNumberOfSeats = number
      this.sectionName.seatLayout = true
      // deselect all
      this.selectedSeats.map(x => {
        this.seatLayout[x.rowIndex][x.seatIndex].SelectStatus = false
        this.seatLayout[x.rowIndex][x.seatIndex].SelectStatusFlag = false
      })
      this.selectedSeats = []
    },
    onSelectCategory: function (value) {
      this.foodAndBeverages.selectedCategory = value
    },
    onSelectFoodItem (foodItem, type, index) {
      if (type == 'add') {
        if (
          this.foodAndBeverages.listing[foodItem.Category.Title][index].Qty < 10
        ) {
          this.foodAndBeverages.listing[foodItem.Category.Title][
            index
          ].Qty += 1
          this.totalAmount =
            parseInt(this.totalAmount) + parseInt(foodItem.Amount)
        }
      }
      if (
        type == 'subtract' &&
        this.foodAndBeverages.listing[foodItem.Category.Title][index].Qty != 0
      ) {
        this.foodAndBeverages.listing[foodItem.Category.Title][index].Qty -= 1
        this.totalAmount =
          parseInt(this.totalAmount) - parseInt(foodItem.Amount)
      }

      this.foodAndBeverages.selected = []
      this.fnbQty = 0
      Object.keys(this.foodAndBeverages.listing).map(category => {
        this.foodAndBeverages.listing[category].map(item => {
          if (item.Qty != 0) {
            this.foodAndBeverages.selected.push(item)
          }
        })
      })
      console.log(
        'this.foodAndBeverages.selected',
        this.foodAndBeverages.selected
      )
      this.foodAndBeverages.selected.map(fb => {
        this.fnbQty = parseInt(this.fnbQty) + parseInt(fb.Qty)
      })
    },
    fetchMovieDetails () {
      let token = null
      let payload = {
        MovieID: this.$route.params.movieID || 32,
      }
      // if (this.$persistStore.get("accessToken")) {
      //   token = this.$persistStore.get("accessToken");
      //   payload["access_token"] = token;
      // }
      makeRequest('/GetShowDetails/', 'POST', null, payload)
        .then(response => {
          const { error, res } = response
          if (!error && res.data) {
            if (!error) {
              this.movieDetails = res.data.Show[0]
              // this.movieDetails.IMDBRating = Math.round(
              //   parseFloat(this.movieDetails.IMDBRating)
              // );
              // if (this.movieDetails.Trailers && this.movieDetails.Trailers[0]) {
              //   this.youtube =
              //     "https://www.youtube.com/embed/" +
              //     this.movieDetails.Trailers[0].URI;
              // }
              // this.userRatingDetails.user = this.movieDetails.YourRating;
              // console.log("y", this.youtube);
            }
          } else {
            console.log('Response Error ')
          }
        })
        .catch(error => {
          console.log('Error', error)
        })
    },
    // getSeatLayoutOld: function() {
    //   let payload = {
    //     SchID: 11,
    //     RequiredSeats: 1
    //   };

    //   makeRequest("/SNGetSeatLayout", "POST", null, payload)
    //     .then(result => {
    //       const { error, res } = result;
    //       //   const { data } = res.data;
    //       console.log("booking seat data", res.data);
    //       if (!error) {
    //         // this.seatLayout = res.data.SeatLayouts;
    //         this.cinemaDetails = res.data.Cinema;
    //         // let d = new Date(0); // The 0 there is the key, which sets the date to the epoch
    //         // d.setUTCSeconds(this.cinemaDetails.Time);
    //         // this.showDetails.month = d;

    //         if (res.data.FNB) {
    //           this.foodAndBeverages.status = true;
    //           this.getFoodAndBeverages();
    //         }
    //         // if (this.getSeatLayout == "1") {
    //         this.seatLayout = res.data.SeatLayouts;
    //         this.seatLayout.map(seatRow => {
    //           seatRow.map(seat => {
    //             seat.SelectStatusFlag = false;
    //             seat.SelectStatus = false;
    //           });
    //         });
    //         this.SeatTypes = res.data.SeatTypes;
    //         // } else {
    //         //   this.selectedSeats = res.data.BookSeatsID;
    //         //   this.sectionName.noOfSeats = false;
    //         //   this.sectionName.checkout = true;
    //         // }
    //       } else {
    //         console.log("error from res", res.message);
    //       }
    //     })
    //     .catch(error => {
    //       console.log("Error on vue front", error);
    //     });
    // },
    getFNBItems: function (CinemaID, TransactionTypeValue) {
      let payload = {
        CinemaID: CinemaID,
        TransactionType: TransactionTypeValue,
        CinemaType: 'normal',
      }
      // GetFnBItems
      makeRequest('/GetFnBItems', 'POST', null, payload)
        .then(result => {
          const { error, res } = result
          const { data } = res.data
          if (!error) {
            this.foodAndBeverages.listing = res.data.List
            this.foodAndBeverages.allListing = res.data.List
            this.foodAndBeverages.listing = groupBy(
              this.foodAndBeverages.listing,
              'Category.Title'
            )
          }
        })
        .catch(error => {
          console.log('Error on vue front', error)
        })
    },
    getFoodAndBeverages: function () {
      let allData = this.$route.params.cinemaId // alldata
      let arr = allData.split('|')
      let TransactionTypeValue = this.fromQrCode ? 'InCinemaFB' : 'Normal'
      this.cinemaData = this.$route.params.cinemaId
      console.log('Arr', arr, arr.length)
      if (arr.length > 1) {
        this.getFNBItems(arr[arr.length - 1], TransactionTypeValue)
      } else {
        let payload = {
          QRCode: this.cinemaData,
        }

        makeRequest('/GetScreenDetails', 'POST', null, payload)
          .then(response => {
            const { error, res } = response
            if (!error) {
              console.log('res', res)
              const { data } = res
              if (data && data.Status) {
                this.displayPopup = data.DisplayFnBPopup
                this.defaultLang = data.DefaultLanguage
                console.log('data :>> ', data)
                console.log(data.ScreenData[0].ScreenId)
                let alldata =
                  data.ScreenData[0].ScreenId +
                  '|' +
                  data.ScreenData[0].Rowno +
                  '|' +
                  data.ScreenData[0].columnno +
                  '|' +
                  data.ScreenData[0].classID +
                  '|' +
                  data.ScreenData[0].seatName +
                  '|' +
                  data.ScreenData[0].Type +
                  '|' +
                  data.ScreenData[0].CinemaID
                window.localStorage.setItem(
                  'isQrCodeKey',
                  data.ScreenData[0].Bookingpagetype
                )

                this.cinemaData = alldata
                this.getFNBItems(
                  data.ScreenData[0].CinemaID,
                  TransactionTypeValue
                )
                this.displayPopup == false ? this.onClickRedirect(this.defaultLang) : ''
              } else {
                console.log('data.message :>> ', data)
              }
            } else {
              console.log('Response Error ')
            }
          })
          .catch(error => {
            console.log('Error', error)
          })
      }
    },
    bookFoodAndBeverages: function () {
      if (this.foodAndBeverages.selected.length > 0) {
        this.showLoading()
        let allData = this.cinemaData
        let arr = allData.split('|')
        let TransactionTypeValue = this.fromQrCode ? 'InCinemaFB' : 'Normal'
        let payload = {
          FNB: this.foodAndBeverages.selected,
          TransactionType: TransactionTypeValue,
          CinemaID: arr[6],
          CinemaType: 'normal',
          ScreenId: arr[0],
          classID: arr[3],
          Rowno: arr[1],
          columnno: arr[2],
          Type: arr[5],
          seatName: arr[4],
        }
        makeRequest('/BookingFNBItem', 'POST', null, payload)
          .then(result => {
            const { error, res } = result
            const { data } = res.data
            this.hideLoading()
            if (!error && res.data.Status) {
              this.FoodNAStatus = true
              this.reserveID = res.data.ReserveID
              this.theatreID = res.data.CinemaID
              this.getCheckLoyalityApplicable(
                this.reserveID,
                res.data.CinemaID
              )
              //   console.log('data.CinemaIDdata.CinemaID :>>fnb ', data.CinemaID);
              // console.log('data.CinemaIDdata.CinemaID 2data :>>fnb ', data.data.CinemaID);
              // this.newCinemaIdValue = data.CinemaID;
              this.ReserveDetails()
            } else {
              this.FoodNAStatus = false
              this.FoodNAMessage = res.data.Message + ' bookFoodAndBeverages'
              this.$refs.FoodNA.show()
            }
          })
          .catch(error => {
            console.log('bookFoodAndBeverages', error)
          })
      } else {
        this.FoodNAStatus = false
        this.ReserveDetails()
      }
    },
    onClickOk: function () {
      this.$router.go(-1)
      this.$refs.seatFullModal.hide()
    },
    getSeatLayoutNew: function () {
      this.showLoading()
      let payload = {
        SchID: this.scheduleID,
        RequiredSeats: 1,
      }

      makeRequest('/SNGetSeatLayout', 'POST', null, payload)
        .then(result => {
          const { error, res } = result
          //   const { data } = res.data;
          this.hideLoading()
          if (!error) {
            if (res.data.ShowSeats_AllClasses_Open == 0) {
              // this.
              this.$root.$emit('bv::show::modal', 'seatFullModal')
            } else if (
              res.data.hasOwnProperty('SeatTypes') &&
              res.data.hasOwnProperty('SeatLayouts') &&
              res.data.SeatLayouts.length > 0
            ) {
              this.seatLayout = res.data.SeatLayouts
              this.currency =
                res.data.Currency == 'AED' ? 'LBP' : res.data.Currency
              this.cinemaDetails = res.data.Cinema
              let parts = this.cinemaDetails.ShowDate.split('-'),
                year = parseInt(parts[0], 10),
                month = parseInt(parts[1], 10) - 1, // NB: month is zero-based!
                day = parseInt(parts[2], 10)
              let date1 = new Date(year, month, day)
              var date = new Date(this.cinemaDetails.Time * 1000)
              // var date1 = date.getDate();
              // var month = this.months[date.getMonth()];
              // var year = date.getFullYear();
              // var day = this.days[date.getDay()];
              var bookingDate =
                this.days[date1.getDay()].substring(0, 3) +
                ', ' +
                date1.getDate() +
                ' ' +
                this.months[date1.getMonth()] +
                ' ' +
                year
              // Hours part from the timestamp
              var hours = date.getHours()
              // Minutes part from the timestamp
              var minutes = '0' + date.getMinutes()
              // Seconds part from the timestamp
              var seconds = '0' + date.getSeconds()
              this.cinemaDetails.BookingDate = bookingDate
              this.cinemaDetails.BookingTime = hours + ':' + minutes.substr(-2)
              this.seatLayout.map(seatRow => {
                seatRow.map(seat => {
                  seat.SelectStatusFlag = false
                  seat.SelectStatus = false
                })
              })
              this.getFoodAndBeverages()
              this.cinemaDetails.BookingTime = res.data.SchTime

              this.seatTypes = res.data.SeatTypes
              // this.seatTypes = this.seatTypes.reverse();
            } else {
              this.$root.$emit('bv::show::modal', 'errorModal')
              console.log('error from res', res.message)
            }
          } else {
            this.$root.$emit('bv::show::modal', 'errorModal')
          }
        })
        .catch(error => {
          console.log('Error on vue front', error)
        })
    },
    handlerSeatSelected: function (
      seat,
      rowIndex,
      seatIndex,
      originalIndex,
      backward,
      e
    ) {
      // console.log('e', e)
      // if(e){ e.preventDefault()}
      // this.events.splice(this.events.indexOf(event), 1);
      seat.seatIndex = seatIndex
      seat.rowIndex = rowIndex
      // seat.classIndex = classIndex;

      let firstTime = 0
      if (originalIndex === null) {
        firstTime = 1
        originalIndex = seatIndex
      } else if (this.totalNumberOfSeats != this.selectedSeats.length) {
        this.seatLayout[rowIndex][seatIndex].SelectStatusFlag = true
      }
      if (this.seatLayout[rowIndex][seatIndex].SelectStatusFlag == false) {
        if (this.totalNumberOfSeats != this.selectedSeats.length) {
          this.seatLayout[rowIndex][seatIndex].SelectStatusFlag = true
        }
      }

      if (
        this.totalNumberOfSeats == this.selectedSeats.length &&
        firstTime == 1
      ) {
        // deselect all
        this.selectedSeats.map(x => {
          this.seatLayout[x.rowIndex][x.seatIndex].SelectStatus = false
          this.seatLayout[x.rowIndex][x.seatIndex].SelectStatusFlag = false
        })
        this.selectedSeats = []
      }
      if (
        this.selectedSeats.length > 0 &&
        this.selectedSeats[0].SeatType != seat.SeatType
      ) {
        // deselect all
        this.selectedSeats.map(x => {
          this.seatLayout[x.rowIndex][x.seatIndex].SelectStatus = false
          this.seatLayout[x.rowIndex][x.seatIndex].SelectStatusFlag = false
        })
        this.selectedSeats = []
      }
      if (this.seatLayout[rowIndex][seatIndex].SelectStatus == false) {
        // console.log("1", this.totalNumberOfSeats, this.selectedSeats.length);
        // check if seat is selected, if yes, do nothing else
        // check how many selected
        if (parseInt(this.totalNumberOfSeats) - this.selectedSeats.length > 0) {
          this.seatLayout[rowIndex][seatIndex].SelectStatus = true
          this.seatLayout[rowIndex][seatIndex].SelectStatusFlag = true
          this.selectedSeats.push(seat)
          // check on right if available, if yes, select
          // console.log(
          //   "test1",
          //   this.seatLayout[rowIndex][parseInt(seatIndex) + 1]
          // );
          if (
            this.seatLayout[rowIndex][parseInt(seatIndex) + 1] &&
            backward != 'backward' &&
            this.seatLayout[rowIndex][parseInt(seatIndex) + 1].Status == 1
          ) {
            // console.log("3");
            //                        this.selectedSeats.push(seat);
            //                        this.seatData.SeatLayouts[classIndex].Seats[rowIndex][parseInt(seatIndex) + 1].SelectStatus = true;
            this.handlerSeatSelected(
              this.seatLayout[rowIndex][parseInt(seatIndex) + 1],
              rowIndex,
              seatIndex + 1,
              originalIndex
            )

            // check on left if available, if yes, select
          } else if (
            this.seatLayout[rowIndex][parseInt(originalIndex) - 1] &&
            this.seatLayout[rowIndex][parseInt(originalIndex) - 1].Status == 1
          ) {
            // console.log("4");
            //                        this.selectedSeats.push(seat);
            //                        this.seatData.SeatLayouts[classIndex].Seats[rowIndex][parseInt(originalIndex) - 1].SelectStatus = true;
            this.handlerSeatSelected(
              this.seatLayout[rowIndex][parseInt(originalIndex) - 1],
              rowIndex,
              originalIndex - 1,
              originalIndex - 1,
              'backward'
            )
          }
        } else {
          // console.log("5");
          if (firstTime == 1) {
            this.selectedSeats = []
            this.handlerSeatSelected(
              this.seatLayout[rowIndex][parseInt(seatIndex)],
              rowIndex,
              seatIndex
            )
          }
        }
      }

      // compare with total

      // if total > selected

      // check on right if available, if yes, select

      // check on left if available, if yes, select

      // if total == selected

      // if seat selected is selected, do nothing

      // if seat selected is not selected, remove all selected and start again

      //          let isInArray = 0;
      //          this.selectedSeats.map((x, index)=>{
      //              if(x.SeatName == seat.SeatName ){
      //                  this.$delete(this.selectedSeats, index);
      //                  isInArray = 1;
      //              }
      //          });
      //          if(isInArray == 0){
      //              this.selectedSeats.push(seat);
      //          }
      this.totalAmount = 0
      this.selectedSeats.map((x, index) => {
        this.totalAmount = parseInt(this.totalAmount) + parseInt(x.SeatPrice)
      })
    },
    onCheckout: function () {
      // this.checkSignIn();
      this.sectionName.foodAndBeverages = false
      this.sectionName.checkout = true
      // open singin modal using Event bus
    },
    confirmBooking: function () {
      this.bookFoodAndBeverages()
    },
    confirmSeatsSelect: function () {
      // console.log("confirm Number", this.getSeatLayout);
      // if (this.totalNumberOfSeats < 1) {
      //   //   vm.$snack.metodo('Please Pick Number of Seats') // Displays a snackbar without action button
      //   return;
      // }
      // if (this.getSeatLayout == true) {
      //   this.sectionName.noOfSeats = false;
      //   this.sectionName.seatLayout = true;
      //   this.sectionName.showFooter = false;

      //   this.getSeatLayoutNew();
      // } else {
      //   this.getSeatLayoutNew();
      // }
      this.startTimer()
      this.sectionName.selectNoOfSeats = false
      this.sectionName.seatLayout = false
      this.sectionName.showFooter = false

      this.sectionName.foodAndBeverages = true
      this.bookingRequestConfirmSeats()
      // this.onCheckout();
    },
    onconfirm: function () {
      console.log('bookFoodAndBeverages')
      this.bookFoodAndBeverages()
    },
    finalConfirmation: function () {
      this.$router.push('/confirmation/' + this.bookingID)
    },
    // this.$root.$emit("bv::show::modal", "sessionTimeOut");

    startTimer: function () {
      this.timerStartFunction = setInterval(() => {
        if (parseInt(this.timer.seconds) < 0) {
          this.timer.seconds = 0
        }
        if (parseInt(this.timer.minutes) < 0) {
          this.timer.minutes = 0
        }
        if (this.timer.stop == true) {
          return
        }
        if (
          parseInt(this.timer.seconds) == 0 &&
          parseInt(this.timer.minutes) == 0 &&
          this.$route.path.includes('/checkout')
        ) {
          // this.timer.seconds = 60;
          this.timer.stop = false
          this.$root.$emit('bv::show::modal', 'sessionTimeOut')
          // this.$refs.sessionTimeOut.show();
          clearTimeout(self.timerStartFunction)
          return false
        }
        if (parseInt(this.timer.seconds) <= 0) {
          this.timer.seconds = 60
        }
        this.timer.seconds = parseInt(this.timer.seconds) - 1
        if (this.timer.seconds < 10) {
          this.timer.seconds = '0' + this.timer.seconds
        }
      }, 1000)
      setInterval(() => {
        if (this.timer.stop == true) {
          return
        }
        if (
          this.timer.minutes == 0 &&
          this.timer.seconds == 0 &&
          this.$route.path.includes('/checkout')
        ) {
          // this.$refs.sessionTimeOut.show();
          this.$root.$emit('bv::show::modal', 'sessionTimeOut')

          // this.$root.$emit("bv::show::modal", "sessionTimeOut");
          // TODO Show timeout message and a redirect button
          this.timer.TimeoutModal = true
          this.timer.minutes = 0
          this.timer.seconds = 0
          this.timer.stop = true
        }
        this.timer.minutes = parseInt(this.timer.minutes) - 1
      }, 60000)
    },
  },
}
</script>
<style scoped>
footer {
  display: none;
}
.fs-12 {
  font-size: 12px;
}

.holds-the-iframe {
  background: rgba(0, 0, 0, 0.1) url(../../assets/img/Rolling.gif) center center
    no-repeat;
}
</style>
