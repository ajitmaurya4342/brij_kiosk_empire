<template>
  <div>
    <div>
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
            @click="onClick()"
            class="text-center mx-auto mt-3 btn-danger"
            >CLOSE</b-button
          >
        </div>
      </b-modal>
    </div>

    <div v-if="bookingDetails && Object.keys(bookingDetails).length > 0">
      <div class="d-flex justify-content-center align-items-center vh-90">
        <div>
          <div class="bg-ticket d-none">
            <span class="curve-cut"></span>
            <div class="pad-lr">
              <div class="row">
                <div class="col-md-6">
                  <img
                    src="@/assets/img/logo/ticket-logo.svg"
                    alt
                    width="230"
                    height="150"
                  />
                </div>

                <!-- <div class="col-md-6   pl-5 ">
                  <div class="text-right">
                  <h1 class="text-dark font-weight-bold mb-0"> FARMAGEDON  FARMAGEDON </h1>
                  <div class="text-dark mt-1 float-right font-weight-bold">
                    <span class="format-movie rounded-sm">3D</span>

                  </div>
                   </div>

                </div>-->
              </div>
            </div>

            <div class="movie-image-ticket">
              <img
                src="https://empireapi.binarynumbers.io/assets/images/movies/MainBanner/5d761bb5bb7ef.jpg"
                class="img-fluid"
              />
              <div class="bg"></div>
              <!-- <img src="@/assets/img/4.jpg" alt /> -->
            </div>

            <div class="pad-space text-dark">
              <div class="row">
                <div class="col-12">
                  <h2 class="font-weight-bold">
                    {{ bookingDetails.MovieName }} (({{
                      bookingDetails.FilmCert
                    }}))
                  </h2>

                  <div class="mb-3">
                    <span class="fz-22">{{ bookingDetails.Language }}</span>
                    <span class="format-movie rounded-sm">{{
                      bookingDetails.Format
                    }}</span>
                  </div>
                </div>
                <div class="col-md-7">
                  <div class="row">
                    <div class="col-md-12 mb-4">
                      <h4 class="font-weight-bold mb-0">{{ $tc("Cinema") }}</h4>
                      <h2 class="mb-0">{{ bookingDetails.cinema_name }}</h2>
                      <!-- <h2 class="mb-0">JEDDAH</h2> -->
                    </div>

                    <div class="col-md-6">
                      <h4 class="font-weight-bold mb-0">SCREEN</h4>
                      <h2 class="mb-0">{{ bookingDetails.ScreenId }}</h2>
                    </div>

                    <div class="col-md-6">
                      <h4 class="font-weight-bold mb-0">TIME</h4>
                      <h2 class="mb-0">{{ bookingDetails.show_time }}</h2>
                    </div>

                    <div class="col-md-12 mt-4">
                      <h4 class="font-weight-bold mb-0">SEATS</h4>
                      <h2 class="mb-0">{{ bookingDetails.seats_name }}</h2>
                    </div>
                  </div>
                </div>

                <!-- <div class="col-md-5">
                  <div class="text-center d-table ml-auto">
                    <img
                      src="@/assets/img/background/qr-code2.png"
                      width="185"
                      height="194"
                      alt
                    />
                    <h4 class="font-weight-bold mb-0 mt-3">BOOKING ID</h4>
                    <h2 class="mb-0">{{ bookingDetails.booking_id }}</h2>
                  </div>
                </div> -->
              </div>
              <div class="mt-4">
                <h4 class="font-weight-bold">{{ $tc("FoodAndDrinks") }}</h4>
                <h3
                  v-for="(fnb, fnbKey) in fnbItemDataArry"
                  :key="fnbKey"
                  class="text-truncate"
                >
                  {{ fnb.title }}
                  <span class="font-weight-bold">x {{ fnb.qty }}</span>
                </h3>
              </div>
            </div>
          </div>

          <div class="bg-ticket text-dark p-3">
            <div class="col-12">
              <div class="row">
                <div class="col-6">
                  <img
                    src="@/assets/img/logo/ticket-logo.svg"
                    alt
                    width="230"
                    height="150"
                  />
                </div>
                <div class="col-6"></div>
              </div>
            </div>
            <div class="col-12">
              <div class="row">
                <div class="col-4">
                  <img
                    :src="checkBaseUrl(ticketObject.Image)"
                    class="img-fluid"
                  />
                </div>
                <div class="col-8">
                  <div class="row">
                    <!-- MOVIE NAME -->
                    <div class="col-12 mb-4">
                      <h2 class="font-weight-bold">{{ ticketObject.Title }}</h2>
                      <div>
                        <span class="font-weight-bold fz-22">{{
                          ticketObject.Language
                        }}</span>
                        <span class="format-movie rounded-sm">{{
                          ticketObject.Format
                        }}</span>
                      </div>
                    </div>

                    <div class="col-12 mb-4">
                      <h4 class="font-weight-bold mb-0">{{ $tc("Cinema") }}</h4>
                      <h2 class="mb-0">{{ ticketObject.CinemaName }}</h2>
                    </div>

                    <div class="col-md-6">
                      <h4 class="font-weight-bold mb-0">{{ $tc("Screen") }}</h4>
                      <h2 class="mb-0">{{ ticketObject.ScreenName }}</h2>
                    </div>

                    <div class="col-md-6">
                      <h4 class="font-weight-bold mb-0">{{ $tc("Seats") }}</h4>
                      <h2 class="mb-0">{{ ticketObject.SeatsList }}</h2>
                    </div>

                    <div class="col-md-6 mt-4">
                      <h4 class="font-weight-bold mb-0">{{ $tc("Time") }}</h4>
                      <h2 class="mb-0">{{ bookingDetails.show_time }}</h2>
                    </div>

                    <div class="col-md-6 mt-4">
                      <h4 class="font-weight-bold mb-0">{{ $tc("Date") }}</h4>
                      <h2 class="mb-0">{{ bookingDetails.show_date }}</h2>
                    </div>
                  </div>
                </div>

                <div
                  class="col-12 mt-4 border-top py-4"
                  v-if="fnbItemDataArry.length > 0"
                >
                  <h4 class="font-weight-bold text-uppercase">
                    {{ $tc("FoodAndDrinks") }}
                  </h4>
                  <h3
                    v-for="(fnb, fnbKey) in fnbItemDataArry"
                    :key="fnbKey"
                    class="text-truncate"
                  >
                    {{ fnb.title }}
                    <span class="font-weight-bold">x {{ fnb.qty }}</span>
                  </h3>
                </div>
                <div class="col-8 offset-4 my-4">
                  <!-- <img src="@/assets/img/background/qr-code2.png" width="185" height="194" alt /> -->
                  <h4 class="font-weight-bold mb-0 mt-3">BOOKING ID</h4>
                  <h2 class="mb-0">{{ booking_id }}</h2>
                </div>
              </div>
            </div>
          </div>

          <div class="btn-round mt-5 mx-auto">
            <div class="btn-content">
              <div>
                <div @click="print()" class="h2 font-weight-bold text-red">
                  {{ $tc("PrintTickets") }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="something-went-wrong" v-else-if="isError">
      <p class="my-4 text-center">{{ ErrorMessage }}</p>
      <div class="text-center">
        <b-button
          @click="onClick()"
          class="text-center mx-auto mt-3 btn-success btn-lg"
          >BACK</b-button
        >
      </div>
    </div>

    <!-- PRINT TICKET -->
    <div ref="printthis" id="div1" v-if="false" class="d-none mt-5">
      <table
        style="width:302px;background:#FFF;color:#000;margin:0 auto;border:1px solid;"
      >
        <tr>
          <td
            colspan="3"
            style="text-align:center;font-size:13px;padding:15px 5px 15px 5px;border-bottom:1px solid #D3D3D3;"
          >
            <span style="display:block">Empire Cinemas - Gizan</span>
            <span style="display:block">Bright Minds For Education Co.</span>
            <span style="display:block">شركة برايت مايندز للتعليم</span>
            <span style="display:block">Al Rashid Mall</span>
            <span style="display:block">Prince Mohammad Bin Naser Road</span>
            <span style="display:block">Jazan - 82723 Saudi Arbia</span>
          </td>
        </tr>

        <tr>
          <td colspan="3" style="font-size:12px;padding:15px 5px 10px 5px;">
            <span>Theatre :&nbsp;</span>
            <span style="font-weight:bold">{{ ticketObject.ScreenName }}</span>

            <span style="padding-left:40px;">Rating</span>
            <span style="font-weight:bold">{{ bookingDetails.rating }}</span>
          </td>
        </tr>
        <tr>
          <td colspan="3" style="padding:5px 5px 20px 5px;vertical-align:top;">
            <span style="font-size:12px;">Movie:&nbsp;</span>
            <span style="font-size:14px;font-weight:bold;">{{
              ticketObject.Title
            }}</span>
            <span style="font-size:14px;padding-left:45px;display:block;">{{
              bookingDetails.MovieNameAR
            }}</span>
          </td>
        </tr>
        <tr style="text-align:center">
          <td style="width:33.33%;vertical-align:top;padding-bottom:20px">
            <span style="display:block;font-size:12px">Transaction ID</span>
            <span style="display:block;font-weight:bold;font-size:13px;">{{
              booking_id
            }}</span>
          </td>
          <td style="width:33.33%;padding-bottom:15px">
            <span style="display:block;font-size:12px">Date</span>
            <span style="display:block;font-weight:bold;font-size:13px;">{{
              bookingDetails.show_date
            }}</span>
          </td>
          <td style="width:33.33%;padding-bottom:15px">
            <span style="display:block;font-size:12px">Time</span>
            <span style="display:block;font-weight:bold;font-size:13px;">{{
              bookingDetails.show_time
            }}</span>
          </td>
        </tr>
        <tr style="text-align:center;">
          <td style="width:33.33%;vertical-align:top;">
            <span style="display:block;font-size:12px">Class</span>
            <span style="display:block;font-size:12px">نوع المقعد</span>
            <span style="display:block;font-weight:bold;font-size:13px;">{{
              ticketObject.SeatsList
            }}</span>
          </td>
          <td style="width:33.33%;vertical-align:top;">
            <span style="display:block;font-size:12px">Seat</span>
            <span style="display:block;font-size:12px">المقعد</span>
            <span style="display:block;font-weight:bold;font-size:13px;">{{
              getSafe(() => bookingDetails.seats_types[0].seatType, "")
            }}</span>
          </td>
          <td style="width:33.33%;vertical-align:top;">
            <span style="display:block;font-size:12px">Ticket Qty</span>
            <span style="display:block;font-size:12px">عدد التذاكر</span>
            <span style="display:block;font-weight:bold;font-size:13px;">{{
              bookingDetails.selectedSeats.length
            }}</span>
          </td>
        </tr>
        <!-- <tr>
          <td style="font-size:12px;padding:5px 5px 10px 5px;text-align:center">3D Glass</td>
          <td style="padding-bottom:10px;"></td>
          <td style="font-size:12px;text-align:center;font-weight:bold;padding-bottom:10px;">5</td>
        </tr>-->
        <tr style="text-align:center;">
          <td
            style="width:33.33%;vertical-align:top;padding-bottom:15px;padding-top:10px;"
          >
            <span style="display:block;font-size:12px">Base Amount</span>
            <span style="display:block;font-size:12px"
              >المبلغ من دون الضريبة</span
            >
            <span style="display:block;font-weight:bold;font-size:13px;">
              {{
                currFormat(
                  getSafe(() => ticketObject.Total, 0) -
                    getSafe(
                      () =>
                        bookingDetails.chargeTypeArray.filter(t =>
                          String(t.ct_name)
                            .toLowerCase()
                            .includes("vat")
                        )[0].tax_amount,
                      0
                    )
                )
              }}</span
            >
          </td>
          <td
            style="width:33.33%;vertical-align:top;padding-bottom:15px;padding-top:10px;"
          >
            <span style="display:block;font-size:11px;margin-bottom:2px;"
              >Added Value Tax:</span
            >
            <span style="display:block;font-size:12px"
              >ضريبة القيمة المضافة</span
            >
            <span style="display:block;font-weight:bold;font-size:13px;">
              {{
                currFormat(
                  getSafe(
                    () =>
                      bookingDetails.chargeTypeArray.filter(t =>
                        String(t.ct_name)
                          .toLowerCase()
                          .includes("vat")
                      )[0].tax_amount,
                    0
                  )
                )
              }}
            </span>
          </td>
          <td
            style="width:33.33%;vertical-align:top;padding-bottom:15px;padding-top:10px;"
          >
            <span style="display:block;font-size:12px">Total</span>
            <span style="display:block;font-size:12px">المحموع</span>
            <span style="display:block;font-weight:bold;font-size:13px;">{{
              ticketObject.TicketAmount
            }}</span>
          </td>
        </tr>
        <tr>
          <td colspan="3" style="font-size:12px;padding:5px 5px 0 5px;">
            <span>{{ bookingDetails.label_1 }}</span>
            <span style="padding-left:10px;">{{ bookingDetails.tax }}</span>
          </td>
        </tr>
        <tr>
          <td colspan="3" style="font-size:12px;padding:0px 5px 10px 5px;">
            <!--            <span>ضريبة القيمة المضافة 5%</span>-->
          </td>
        </tr>
        <tr>
          <td colspan="3" style="font-size:12px;padding:5px 5px 0px 5px;">
            <span>VAT Numbers:</span>
            <span style="padding-left:10px;">{{
              bookingDetails.vat_number
            }}</span>
          </td>
        </tr>
        <tr>
          <td colspan="3" style="font-size:12px;padding:0px 5px 10px 5px;">
            <span>الرقم الضريبي</span>
          </td>
        </tr>
        <tr>
          <td colspan="3" style="padding:5px;font-size:12px">
            <span style="display:block;"
              >Empire Cinemas - Gizan-82723 Saudi Arbia</span
            >
            <span style="display:block;">Sales Info</span>
            <span>IT-Showbizz</span>
            <span style="padding-left:45px">03:45 PM</span>
          </td>
        </tr>
        <tr style="text-align:center">
          <td style="vertical-align:top;padding-bottom:10px;">
            <span style="display:block;font-size:11px">Invoice No:</span>
            <span style="display:block;font-size:11px">رقم الفاتورة</span>
            <span style="display:block;font-size:11px;padding-top:5px">{{
              bookingDetails.reservation_id
            }}</span>
          </td>
          <td style="vertical-align:top;padding-bottom:10px;">
            <span style="display:block;font-size:11px">Date</span>
            <span style="display:block;font-size:11px">تاريخ</span>
            <span style="display:block;font-size:11px;padding-top:5px">{{
              bookingDetails.transaction_date_time
            }}</span>
          </td>
          <td style="vertical-align:top;padding-bottom:10px;">
            <span style="display:block;font-size:11px">Time</span>
            <span style="display:block;font-size:11px">زمن</span>
            <span style="display:block;font-size:11px;padding-top:5px">{{
              bookingDetails.transaction_date_time
            }}</span>
          </td>
        </tr>
      </table>
    </div>
    <!--    <div v-html="getHtml()">-->
    <!--    </div>-->
    <!-- PRINT TICKET -->
    <div ref="printthis2" id="div2" v-if="false" class="d-none_ mt-5">
      <table
        style="width:302px;background:#FFF;color:#000;margin:0 auto;font-weight:bold;"
      >
        <tr>
          <td style="text-align:center;font-size:20px;width:100%;">
            <p style="width:100%;text-align:center;margin:0;">
              Empire Cinemas - Jazan
            </p>
          </td>
        </tr>
        <tr style="text-align:center">
          <td style="width:100%;text-align:center;">
            <p style="width:100%;text-align:center;margin:0;font-size:14px;">
              Bright Minds For Education Co.
            </p>
          </td>
        </tr>

        <tr style="text-align:center">
          <td style="width:100%;text-align:center;">
            <p style="width:100%;text-align:center;margin:0;">
              شركة برايت مايندز للتعليم
            </p>
          </td>
        </tr>

        <tr style="text-align:center">
          <td style="width:100%;text-align:center;">
            <p style="width:100%;text-align:center;margin:0;">Al Rashid Mall</p>
          </td>
        </tr>

        <tr style="text-align:center">
          <td style="width:100%;text-align:center;">
            <p style="width:100%;text-align:center;margin:0;">
              Prince Mohammad Bin Naser Road
            </p>
          </td>
        </tr>
        <tr>
          <td
            style="width:100%;border-bottom: 2px solid #d3d3d3;padding-bottom: 5px;"
          >
            <p style="width:100%;text-align:center;margin:0;">
              Jazan - 82723 Saudi Arbia
            </p>
          </td>
        </tr>
      </table>

      <table
        style="width:302px;background:#FFF;color:#000;margin:0 auto;font-weight:bold;"
      >
        <tr>
          <td colspan="3" style="font-size:15px;padding:15px 0px 10px 0px;">
            <span>Theatre :&nbsp;</span>
            <span style="font-weight:bold">{{ ticketObject.ScreenName }}</span>

            <span style="padding-left:40px;">Rating</span>
            <span style="font-weight:bold">{{ bookingDetails.rating }}</span>

            <span style="padding-left:40px;">Format</span>
            <span style="font-weight:bold">{{ bookingDetails.mf_name }}</span>
          </td>
        </tr>
        <tr>
          <td colspan="3" style="padding:5px 0px 20px 0px;vertical-align:top;">
            <span style="font-size:15px;">Movie:&nbsp;</span>
            <span style="font-size:15px;font-weight:bold;">{{
              ticketObject.Title
            }}</span>
            <span style="font-size:15px;padding-left:45px;display:block;">{{
              bookingDetails.ArabicMovieName
            }}</span>
          </td>
        </tr>
        <tr style="text-align:center">
          <td style="width:33.33%;vertical-align:top;padding-bottom:20px">
            <span style="display:block;font-size:14px">Transaction ID</span>
            <span style="display:block;font-weight:bold;font-size:13px;">{{
              booking_id
            }}</span>
          </td>
          <td style="width:33.33%;padding-bottom:15px">
            <span style="display:block;font-size:14px">Date</span>
            <span style="display:block;font-weight:bold;font-size:13px;">{{
              bookingDetails.show_date
            }}</span>
          </td>
          <td style="width:33.33%;padding-bottom:15px">
            <span style="display:block;font-size:14px">Time</span>
            <span style="display:block;font-weight:bold;font-size:13px;">{{
              bookingDetails.show_time
            }}</span>
          </td>
        </tr>
        <tr style="text-align:center;">
          <td style="width:33.33%;vertical-align:top;">
            <span style="display:block;font-size:14px">Class</span>
            <span style="display:block;font-size:14px">نوع المقعد</span>
            <span style="display:block;font-weight:bold;font-size:13px;">{{
              getSafe(() => bookingDetails.seats_types[0].seatType, "")
            }}</span>
          </td>
          <td style="width:33.33%;vertical-align:top;">
            <span style="display:block;font-size:14px">Seat</span>
            <span style="display:block;font-size:14px">المقعد</span>
            <span style="display:block;font-weight:bold;font-size:13px;">{{
              ticketObject.SeatsList
            }}</span>
          </td>
          <td style="width:33.33%;vertical-align:top;">
            <span style="display:block;font-size:14px">Ticket Qty</span>
            <span style="display:block;font-size:14px">عدد التذاكر</span>
            <span style="display:block;font-weight:bold;font-size:13px;">{{
              bookingDetails.selectedSeats.length
            }}</span>
          </td>
        </tr>
        <tr style="text-align:center;">
          <td
            style="width:33.33%;vertical-align:top;padding-bottom:15px;padding-top:10px;"
          >
            <span style="display:block;font-size:14px;min-height: 35px;"
              >Base Amount &nbsp;&nbsp;&nbsp;</span
            >
            <span style="display:block;font-size:14px;min-height: 40px;"
              >المبلغ من دون الضريبة</span
            >
            <span style="display:block;font-weight:bold;font-size:13px;">{{
              currFormat(
                getSafe(() => ticketObject.Total, 0) -
                  getSafe(
                    () =>
                      bookingDetails.chargeTypeArray.filter(t =>
                        String(t.ct_name)
                          .toLowerCase()
                          .includes("vat")
                      )[0].tax_amount,
                    0
                  )
              )
            }}</span>
          </td>
          <td
            style="width:33.33%;vertical-align:top;padding-bottom:15px;padding-top:10px;"
          >
            <span
              style="display:block;font-size:14px;margin-bottom:2px;min-height: 35px;"
              >Added Value Tax:</span
            >
            <span style="display:block;font-size:14px;min-height: 40px;"
              >ضريبة القيمة المضافة</span
            >
            <span style="display:block;font-weight:bold;font-size:13px;">
              {{
                currFormat(
                  getSafe(
                    () =>
                      bookingDetails.chargeTypeArray.filter(t =>
                        String(t.ct_name)
                          .toLowerCase()
                          .includes("vat")
                      )[0].tax_amount,
                    0
                  )
                )
              }}</span
            >
          </td>
          <td
            style="width:33.33%;vertical-align:top;padding-bottom:15px;padding-top:10px;"
          >
            <span style="display:block;font-size:14px;min-height: 35px;"
              >Total
            </span>
            <span style="display:block;font-size:14px;min-height: 40px;"
              >المحموع</span
            >
            <span style="display:block;font-weight:bold;font-size:13px;">{{
              ticketObject.TicketAmount
            }}</span>
          </td>
        </tr>
        <tr v-if="fnbItemDataArry && fnbItemDataArry.length">
          <td colspan="2" style="font-size:15px;">
            <span style="display: block;padding-bottom: 5px;"
              >FNB Booking ID : {{ ticketObject.FnbBookingId }}</span
            >
          </td>
        </tr>
        <!-- FNB TOTAL AMOUNT  -->
        <tr v-if="fnbItemDataArry && fnbItemDataArry.length">
          <td colspan="2" style="font-size: 15px;">
            <span style="display: block;padding-bottom: 5px;"
              >FNB Total Amount</span
            >
          </td>
          <td colspan="1" style="text-align: right;">
            <span style="display: block;padding-bottom: 5px;">
              {{ ticketObject.tfnb }}
            </span>
          </td>
        </tr>

        <tr>
          <td colspan="3">
            <hr style="margin:3px 0;" />
          </td>
        </tr>
        <!-- FNB end       -->

        <tr>
          <td colspan="3" style="padding-top: 5px;">
            <span>Total Amount (Inclusive of Taxes)</span>
          </td>
        </tr>
        <tr>
          <td colspan="2" style="font-size:15px;padding:0 0 5px 0;">
            <span style="display: block;">المبلغ الإجمالي (شامل الضرائب)</span>
            <!-- <span style="padding-left:10px;">${bookingDetails.tax}</span> -->
          </td>
          <td style="text-align: right;vertical-align: bottom;">
            <span>{{ ticketObject.Total }}</span>
          </td>
        </tr>
        <!-- <tr>
          <td colspan="3" style="font-size:15px;padding:0px 0px 10px 0px;">
            <span>ضريبة القيمة المضافة 5%</span>
          </td>
        </tr> -->
        <tr>
          <td colspan="3" style="font-size:15px;padding:0px 5px 0px 0px;">
            <span>VAT Numbers:</span>
            <span style="padding-left:10px;">{{
              bookingDetails.vat_number
            }}</span>
          </td>
        </tr>
        <tr>
          <td colspan="3" style="font-size:14px;padding:0px 5px 10px 0px;">
            <span>الرقم الضريبي</span>
          </td>
        </tr>

        <tr>
          <td colspan="3">
            <hr style="margin:3px 0;" />
          </td>
        </tr>
        <tr>
          <td colspan="3" style="padding:5px 0px 5px 0px;font-size:14px">
            <span style="display:block;"
              >Empire Cinemas - Jazan-82723 Saudi Arbia</span
            >
            <span style="display:block;">Sales Info</span>
          </td>
        </tr>
        <tr style="text-align:center">
          <td style="vertical-align:top;padding-bottom:10px;">
            <span style="display:block;font-size:14px">Invoice No:</span>
            <span style="display:block;font-size:14px">رقم الفاتورة</span>
            <span style="display:block;font-size:14px;padding-top:5px">{{
              bookingDetails.reservation_id
            }}</span>
          </td>
          <td style="vertical-align:top;padding-bottom:10px;">
            <span style="display:block;font-size:14px">Date</span>
            <span style="display:block;font-size:14px">تاريخ</span>
            <span style="display:block;font-size:14px;padding-top:5px">{{
              moment(bookingDetails.transaction_date_time).format("YYYY-MM-DD")
            }}</span>
          </td>
          <td style="vertical-align:top;padding-bottom:10px;">
            <span style="display:block;font-size:14px">Time</span>
            <span style="display:block;font-size:14px">زمن</span>
            <span style="display:block;font-size:14px;padding-top:5px">{{
              moment(bookingDetails.transaction_date_time).format("HH:mm a")
            }}</span>
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
import bookingService from "@/services/bookingService.js";
import bookingServiceKiosk from "@/services/bookingServiceKiosk.js";

import Printd from "printd";
import { makeRequest, makeRequestBrij } from "@/helper/internet.js";
import moment from "moment";
import axios from "axios";
import { BASEURL_BRIJ } from "@/config";

function getHtml(bookingDetails = {}) {
  return `
<!DOCTYPE html>
<html>
  <head>
    <title>Page Title</title>
  </head>
  <body>
  <table style="width:302px;background:#FFF;color:#000;margin:0 auto;font-weight:bold;">
    <tr>
      <td style="text-align:center;font-size:20px;width:100%;">
        <p style="width:100%;text-align:center;margin:0;">Empire Cinemas - Jazan</p>
      </td>
    </tr>
    <tr style="text-align:center">
      <td style="width:100%;text-align:center;">
        <p
        style="width:100%;text-align:center;margin:0;font-size:14px;"
        >Bright Minds For Education Co.</p>
      </td>
    </tr>

    <tr style="text-align:center">
      <td style="width:100%;text-align:center;">
        <p style="width:100%;text-align:center;margin:0;">شركة برايت مايندز للتعليم</p>
      </td>
    </tr>

    <tr style="text-align:center">
      <td style="width:100%;text-align:center;">
        <p style="width:100%;text-align:center;margin:0;">Al Rashid Mall</p>
      </td>
    </tr>

    <tr style="text-align:center">
      <td style="width:100%;text-align:center;">
        <p style="width:100%;text-align:center;margin:0;">Prince Mohammad Bin Naser Road</p>
      </td>
    </tr>
    <tr>
      <td style="width:100%;border-bottom: 2px solid #d3d3d3;padding-bottom: 5px;">
        <p style="width:100%;text-align:center;margin:0;">Jazan - 82723 Saudi Arbia</p>
      </td>
    </tr>
  </table>
  <table style="width:302px;background:#FFF;color:#000;margin:0 auto;font-weight:bold;">
    <tr>
      <td colspan="3" style="font-size:15px;padding:15px 0px 10px 0px;">
        <span>Theatre :&nbsp;</span>
        <span style="font-weight:bold">${bookingDetails.ScreenId}</span>

        <span style="padding-left:40px;">Rating</span>
        <span style="font-weight:bold">${bookingDetails.FilmCert}</span>

        <span style="padding-left:40px;">Format</span>
        <span style="font-weight:bold">${bookingDetails.SelectedFormat}</span>
      </td>
    </tr>
    <tr>
      <td colspan="3" style="padding:5px 0px 20px 0px;vertical-align:top;">
        <span style="font-size:15px;">Movie:&nbsp;</span>
        <span style="font-size:15px;font-weight:bold;">${
          bookingDetails.MovieName
        }</span>
        <span style="font-size:15px;padding-left:45px;display:block;">${
          bookingDetails.ArabicMovieName
        }</span>
      </td>
    </tr>
    <tr style="text-align:center">
      <td style="width:33.33%;vertical-align:top;padding-bottom:20px">
        <span style="display:block;font-size:14px">Transaction ID</span>
        <span style="display:block;font-weight:bold;font-size:13px;">${
          bookingDetails.TransactionID
        }</span>
      </td>
      <td style="width:33.33%;padding-bottom:15px">
        <span style="display:block;font-size:14px">Date</span>
        <span style="display:block;font-weight:bold;font-size:13px;">${
          bookingDetails.show_date
        }</span>
      </td>
      <td style="width:33.33%;padding-bottom:15px">
        <span style="display:block;font-size:14px">Time</span>
        <span style="display:block;font-weight:bold;font-size:13px;">${
          bookingDetails.show_time
        }</span>
      </td>
    </tr>
    <tr style="text-align:center;">
      <td style="width:33.33%;vertical-align:top;">
        <span style="display:block;font-size:14px">Class</span>
        <span style="display:block;font-size:14px">نوع المقعد</span>
        <span style="display:block;font-weight:bold;font-size:13px;">${
          bookingDetails.ticket_standard
        }</span>
      </td>
      <td style="width:33.33%;vertical-align:top;">
        <span style="display:block;font-size:14px">Seat</span>
        <span style="display:block;font-size:14px">المقعد</span>
        <span style="display:block;font-weight:bold;font-size:13px;">${
          bookingDetails.seat_name
        }</span>
      </td>
      <td style="width:33.33%;vertical-align:top;">
        <span style="display:block;font-size:14px">Ticket Qty</span>
        <span style="display:block;font-size:14px">عدد التذاكر</span>
        <span style="display:block;font-weight:bold;font-size:13px;">${
          bookingDetails.ticket_count
        }</span>
      </td>
    </tr>
    <tr style="text-align:center;">
      <td style="width:33.33%;vertical-align:top;padding-bottom:15px;padding-top:10px;">
        <span style="display:block;font-size:14px;min-height: 35px;">Base Amount &nbsp;&nbsp;&nbsp;</span>
        <span style="display:block;font-size:14px;min-height: 40px;">المبلغ من دون الضريبة</span>
        <span style="display:block;font-weight:bold;font-size:13px;">${
          bookingDetails.basic
        }</span>
      </td>
      <td style="width:33.33%;vertical-align:top;padding-bottom:15px;padding-top:10px;">
        <span style="display:block;font-size:14px;margin-bottom:2px;min-height: 35px;">Added Value Tax:</span>
        <span style="display:block;font-size:14px;min-height: 40px;">ضريبة القيمة المضافة</span>
        <span style="display:block;font-weight:bold;font-size:13px;">${
          bookingDetails.tax
        }</span>
      </td>
      <td style="width:33.33%;vertical-align:top;padding-bottom:15px;padding-top:10px;">
        <span style="display:block;font-size:14px;min-height: 35px;">Total </span>
        <span style="display:block;font-size:14px;min-height: 40px;">المحموع</span>
        <span style="display:block;font-weight:bold;font-size:13px;">${
          bookingDetails.ticketFinalPrice
        }</span>
      </td>
    </tr>
    ${
      bookingDetails.fnbItems && bookingDetails.fnbItems.length > 0
        ? `
    <tr>
      <td colspan="2" style="font-size:15px;">
        <span style="display: block;padding-bottom: 5px;">FNB Booking ID : ${
          bookingDetails.ItemReceiptNo
        }</span>

      </td>
    </tr>
    <!-- <tr>
      <td colspan="3">
        <hr style="margin:3px 0;">
      </td>
    </tr> -->
    <!-- FNB TOTAL AMOUNT  -->
    <tr>
      <td colspan="2" style="font-size: 15px;">
        <span style="display: block;padding-bottom: 5px;">FNB Total Amount</span>
      </td>
      <td colspan="1" style="text-align: right;">
        <span style="display: block;padding-bottom: 5px;">${
          bookingDetails.FnbItemPrice
        }</span>
      </td>
    </tr>

    <!-- <tr>
      <td colspan="3">
        <hr style="margin:3px 0;">
      </td>
    </tr> -->

    <!-- <tr style="text-align:center;">
      <td style="width:33.33%;vertical-align:top;padding-bottom:15px;padding-top:10px;">
        <span style="display:block;font-size:14px;min-height: 35px;">FNB Base Amount</span>
        <span style="display:block;font-size:14px;min-height: 40px;">المبلغ من دون الضريبة</span>
        <span style="display:block;font-weight:bold;font-size:13px;">${
          bookingDetails.fnbbasic
        }</span>
      </td>
      <td style="width:33.33%;vertical-align:top;padding-bottom:15px;padding-top:10px;">
        <span style="display:block;font-size:14px;margin-bottom:2px;min-height: 35px;">Added Value Tax:</span>
        <span style="display:block;font-size:14px;min-height: 40px;">ضريبة القيمة المضافة</span>
        <span style="display:block;font-weight:bold;font-size:13px;">${
          bookingDetails.fnbtax
        }</span>
      </td>
      <td style="width:33.33%;vertical-align:top;padding-bottom:15px;padding-top:10px;">
        <span style="display:block;font-size:14px;min-height: 35px;">FNB Total</span>
        <span style="display:block;font-size:14px;min-height: 40px;">المحموع</span>
        <span style="display:block;font-weight:bold;font-size:13px;">${
          bookingDetails.FnbItemPrice
        }</span>
      </td>
    </tr> -->
    <tr>
    <td colspan="3">
      <hr style="margin:3px 0;">
    </td>
  </tr> `
        : ``
    }

    <tr>
      <td colspan="3" style="padding-top: 5px;">
        <span>Total Amount (Inclusive of Taxes)</span>
      </td>
    </tr>
    <tr>
      <td colspan="2" style="font-size:15px;padding:0 0 5px 0;">

        <span style="display: block;">المبلغ الإجمالي (شامل الضرائب)</span>
        <!-- <span style="padding-left:10px;">${bookingDetails.tax}</span> -->
      </td>
      <td style="text-align: right;vertical-align: bottom;">
        <span>${bookingDetails.finalPrice}</span>
      </td>
    </tr>
    <!-- <tr>
      <td colspan="3" style="font-size:15px;padding:0px 0px 10px 0px;">
        <span>ضريبة القيمة المضافة 5%</span>
      </td>
    </tr> -->
    <tr>
      <td colspan="3" style="font-size:15px;padding:0px 5px 0px 0px;">
        <span>VAT Numbers:</span>
        <span style="padding-left:10px;">${bookingDetails.vat}</span>
      </td>
    </tr>
    <tr>
      <td colspan="3" style="font-size:14px;padding:0px 5px 10px 0px;">
        <span>الرقم الضريبي</span>
      </td>
    </tr>

    <tr>
      <td colspan="3">
        <hr style="margin:3px 0;">
      </td>
    </tr>
    <tr>
      <td colspan="3" style="padding:5px 0px 5px 0px;font-size:14px">
        <span style="display:block;">Empire Cinemas - Jazan-82723 Saudi Arbia</span>
        <span style="display:block;">Sales Info</span>
      </td>
    </tr>
    <tr style="text-align:center">
      <td style="vertical-align:top;padding-bottom:10px;">
        <span style="display:block;font-size:14px">Invoice No:</span>
        <span style="display:block;font-size:14px">رقم الفاتورة</span>
        <span style="display:block;font-size:14px;padding-top:5px">${
          bookingDetails.invoice
        }</span>
      </td>
      <td style="vertical-align:top;padding-bottom:10px;">
        <span style="display:block;font-size:14px">Date</span>
        <span style="display:block;font-size:14px">تاريخ</span>
        <span style="display:block;font-size:14px;padding-top:5px">${
          bookingDetails.trans_date
        }</span>
      </td>
      <td style="vertical-align:top;padding-bottom:10px;">
        <span style="display:block;font-size:14px">Time</span>
        <span style="display:block;font-size:14px">زمن</span>
        <span style="display:block;font-size:14px;padding-top:5px">${
          bookingDetails.trans_time
        }</span>
      </td>
    </tr>
  </table>
  </body>
  </html>`;
}

export default {
  name: "FinalTicket",
  data() {
    return {
      booking_id: "",
      bookingDetails: null,
      pickup_code: null,
      receipt_no: null,
      isError: false,
      ErrorMessage: "Something went wrong",
      fnbItemDataArry: [],
      ticketData: [],
      ReserveID: "",
      friendemail: "",

      ticketObject: {
        Address: "",
        BookingDate: "",
        BookingID: "",
        BookingStatus: "",
        wc_seats: [],
        CinemaName: "",
        Currency: "",
        Format: "",
        HeaderImage: "",
        Image: "",
        IsLoyaltybooking: "",
        Language: "",
        Message: "",
        MovieDate: "",
        MovieDateDate: "",
        MovieDateDay: "",
        MovieDateMonth: "",
        MovieDateYear: "",
        MovieTiming: "",
        MovieTimingFormat: "",
        MovieTimingTime: "",
        MoviedetailID: "",
        OrderID: "",
        MoviedetailformateID: "",
        Offer: "",
        OfferDiscount: "",
        OfferImage: "",
        OfferText: "",
        QRCode: "",
        QRID: "",
        Rated: "",
        Released: "",
        Runtime: "",
        ScreenName: "",
        SeatsBooked: "",
        SeatsList: "",
        ShowBizzBookingID: "",
        ShowBizzBookingID1212: "",
        ShowType: "",
        Status: "",
        Title: "",
        Total: "",
        bookingid: "",
        is_loading: "",
        pickupcode: "",
        tfnb: "",
        TicketAmount: "",
        BookingFee: "",
        PaymentType: "",
        FnbBookingId: ""
      },
      BookingID: "",
      isPrint: true,
      cinemaData: localStorage.getItem("brij_cinema")
        ? JSON.parse(localStorage.getItem("brij_cinema"))
        : ""
    };
  },
  beforeMount() {
    const { booking_id } = this.$route.params;
    this.booking_id = booking_id;
    this.pickup_code = this.$route.query.pickup_code;
    this.receipt_no = this.$route.query.receipt_no;
    // this.getBookingDetails()
    this.getTicketDetails();
  },
  computed: {
    getBrijCinemas() {
      return this.$store.getters.getBrijCinemas
        ? this.$store.getters.getBrijCinemas
        : [];
    },
    getSelectedBrijCinemas() {
      return this.$store.getters.getSelectedBrijCinemas;
    },
    cinemaTranslationData() {
      let translatedData = "";
      if (
        Object.keys(this.cinemaData).length > 0 &&
        this.cinemaData.translation_data
      ) {
        translatedData = this.cinemaData.translation_data.filter(lang => {
          return lang.langaugeId == 3;
        })[0].company_name;
      }
      return translatedData;
    }
  },
  methods: {
    moment,
    getHtml() {
      return getHtml(this.bookingDetails ? this.bookingDetails : {});
    },
    getFnbTotal(bookingDetails) {
      let total = 0;

      if (bookingDetails.fnb_items && bookingDetails.fnb_items.length) {
        bookingDetails.fnb_items.forEach(f => {
          total += f.fp_total_amount_before_offer || 0;
        });
      }

      // return bookingDetails?.ft_total_amount || 0
      return total;
    },
    getOfferTotal(bookingDetails) {
      let total = 0;
      total += this.getSafe(() => bookingDetails.offer_price, 0);

      if (bookingDetails.fnb_items && bookingDetails.fnb_items.length) {
        bookingDetails.fnb_items.forEach(f => {
          total += f.fp_offer_price * f.fst_quantity || 0;
        });
      }

      return total;
    },
    onClick: function() {
      this.$router.push({
        path: "/enter-booking-id"
      });
    },
    getBookingDetails: function() {
      let loader = this.$loading.show();
      let payload = {
        // booking_id: booking_id
        // language_id: 0
        pickup_code: parseInt(this.pickup_code),
        receipt_no: parseInt(this.receipt_no)
      };
      bookingService
        .getDeliverOnlineTicket(payload)
        .then(response => {
          loader.hide();
          const { data } = response;
          if (data && data.status) {
            this.bookingDetails = data.data;
          } else {
            // this.$refs.modal.show();
            this.isError = true;
            this.ErrorMessage = data.Message || data.message;
          }
        })
        .catch(err => {
          loader.hide();
          this.isError = true;
          // this.$refs.modal.show();
          // this.ErrorMessage = err;
        });
    },

    print() {
      let loader = this.$loading.show();
      if (this.isPrint) {
        this.isPrint = false;
        let payload = {
          sb_id: this.bookingDetails.sb_id,
          baseurl: BASEURL_BRIJ,
          cinema_id: this.bookingDetails.cine_id,
          ft_id: this.bookingDetails.ft_id
        };
        let addOnsArr = this.bookingDetails.final_addon_gross_charges
          ? this.bookingDetails.final_addon_gross_charges[0]
          : [];

        let arabic_company_name = this.cinemaTranslationData;

        let cinema_id = this.bookingDetails.cine_id;
        let overallPrice = 0;

        bookingServiceKiosk.printTicket(payload).then(response1 => {
          console.log({ response1 });
        });

        console.log(addOnsArr, "addOnsArr");

        if (addOnsArr && addOnsArr.length) {
          addOnsArr.map((z, index) => {
            console.log({ z });
            overallPrice += z.final_price;
            setTimeout(() => {
              let addonsPayload = {
                addOns: JSON.stringify(z),
                bookingDetails: JSON.stringify({
                  template_id: 28,
                  pos_user_name: this.bookingDetails.pos_user_name,
                  translationData: arabic_company_name,
                  cine_name: this.cinemaData.cine_name,
                  cine_address: this.cinemaData.cine_address,
                  company_name: this.cinemaData.company_name,
                  vat_number: this.cinemaData.vat_number,
                  sb_id: this.bookingDetails.sb_id,
                  sb_booking_code: this.bookingDetails.sb_booking_code,
                  og_show_date: this.bookingDetails.show_date,
                  og_show_time: this.bookingDetails.show_time,
                  sb_booking_date: this.bookingDetails.sb_booking_date_time,
                  sb_booking_time: this.bookingDetails.sb_booking_date_time
                }),
                isReprint: false,
                baseurl: BASEURL_BRIJ,
                isRefund: "N"
              };
              let dataPayload = {
                dataURL: `${
                  addonsPayload.baseurl
                }/api/pos/generate-addon-ticket?isReprint=${
                  addonsPayload.isReprint
                }&addOns=${addonsPayload.addOns}&bookingDetails=${
                  addonsPayload.bookingDetails
                }&isRefund=${addonsPayload.isRefund}`
              };

              bookingServiceKiosk.dynamicApiExe(dataPayload).then(response2 => {
                console.log({ response2 });
              });
            }, 2000);

            // index * setTimeoutvalue);
          });
        }

        setTimeout(z => {
          loader.hide();

          this.$router.replace({
            path: "/"
          });
          window.location.reload();
        }, 10000);
      }
    },
    print_old: function() {
      console.log("Printing");
      let self = this;

      const p = new Printd();
      p.print(this.$refs.printthis2, []);
    },
    __print: function() {
      const p = new Printd();
      p.print(this.$refs.printthis2, []);
    },
    getTicketDetails() {
      this.ticketData = [];

      this.showLoading();
      makeRequestBrij(
        `/api/cinema/booking-details/${this.booking_id}`,
        "GET",
        null,
        null
      )
        .then(result => {
          const { error, res } = result;
          const { data } = res;
          if (!data.status) {
            console.log({ data });
            this.hideLoading();

            this.ErrorMessage = data.message || data.error || this.ErrorMessage;
            this.$nextTick(() => {
              this.$refs.modal.show();
            });

            return;
          }
          this.bookingDetails = data.Records[0];

          console.log(data, "  }");
          // if (!error) {

          let obj = {
            MoviedetailID: 623,
            MoviedetailformateID: 4025,
            Title:
              this.getLangSpecificAttribute(
                data.Records[0].languageSpecificImages,
                this.getCurrentLang().brij_lang_id,
                "mc_title"
              ) ||
              data.Records[0].movie_title ||
              data.Records[0].original_title_of_movie,

            Format: data.Records[0].mf_name,
            Image: data.Records[0].md_thumbnail_url,
            HeaderImage: "",
            Language: data.Records[0].lang_name,
            CinemaName: data.Records[0].cine_name,
            MovieDate: moment(data.Records[0].show_date).format(
              "DD MMMM, YYYY"
            ),
            MovieDateDate: moment(data.Records[0].show_date).format("DD"),
            MovieDateDay: moment(data.Records[0].show_date).format("dddd"),
            MovieDateMonth: moment(data.Records[0].show_date).format("MMMM"),
            MovieDateYear: moment(data.Records[0].show_date).format("YYYY"),
            MovieTiming: moment(data.Records[0].show_time, "HH:mm").format(
              "hh:mm A"
            ),
            MovieTimingTime: moment(data.Records[0].show_time, "HH:mm").format(
              "hh:mm"
            ),
            MovieTimingFormat: moment(
              data.Records[0].show_time,
              "HH:mm"
            ).format("A"),
            Address: data.Records[0].cine_address,
            OrderID: "824194",
            Rated: data.Records[0].rating,
            Released: moment(data.Records[0].original_release_date).format(
              "DD MMM, YYYY"
            ),
            Runtime: "105",
            QRCode: data.Records[0].qrcode,
            QRID: "EMPR0000041060|8365-ET00010435,52894,01-Jul-2022,17:00",
            ShowType: "Ticket",
            tfnb: data.Records[0].ft_total_amount || 0,
            ScreenName: data.Records[0].screen_name,
            BookingStatus: "SUCCESS",
            FnbBookingId: "",
            ShowBizzBookingId: data.Records[0].sb_booking_code,
            ShowBizzBookingID: data.Records[0].sb_booking_code,
            ShowBizzBookingID1212: data.Records[0].sb_booking_code,
            pickupcode: 8365,
            f_and_b: [],
            SeatsList: data.Records[0].seats.join(", "),
            wc_seats: [],
            normal_seats: data.Records[0].seats,
            SeatLable: null,
            BookingID: data.Records[0].sb_booking_code,
            Offer: `${data.Records[0].voucher_code ||
              data.Records[0].voucher_code_fallback ||
              ""}`,
            OfferDiscount: this.getOfferTotal(data.Records[0]) || 0,
            OfferText: `${data.Records[0].voucher_code ||
              data.Records[0].voucher_code_fallback ||
              ""}`,
            OfferImage: "",
            SeatsBooked: data.Records[0].seats.length,
            TicketAmount: data.Records[0].sb_total_amount,
            BookingFee: data.Records[0].internet_handling_fee,
            PaymentType: data.Records[0].pm_payment_mode,
            Currency: this.$store.getters.getGlobalCurrency.curr_code || "Sar",
            BaseTotal: data.Records[0].sb_total_amount,
            Total:
              data.Records[0].sb_total_amount +
              this.getFnbTotal(data.Records[0]) +
              data.Records[0].internet_handling_fee,
            BookingDate: moment(data.Records[0].transaction_date_time).format(
              "YYYY-MM-DD hh:mm A"
            ),
            Status: true,
            Message: "",
            is_loading: true,
            BaseURL: "https://apinew-dev.empirecinemas.com/",
            FnbItemPrice: this.getFnbTotal(data.Records[0])
          };

          console.log(obj, "dsaadas");
          Object.keys(this.ticketObject).map(x => {
            this.ticketObject[x] = obj[x] || "";
          });

          if (
            data.Records[0].hasOwnProperty("fnb_items") &&
            data.Records[0].fnb_items.length > 0
          ) {
            this.ticketObject.FnbBookingId =
              data.Records[0].fnb_items[0]["order_code"];
            this.fnbItemDataArry = data.Records[0].fnb_items.map(z => {
              return {
                title: z.fst_item_name,
                qty: z.fst_quantity,
                total: z.fp_total_amount
              };
            });
          }
          // ReactPixel.track('Purchase', {
          //   value: this.ticketObject.Total,
          //   currency: this.ticketObject.Currency,
          // })
          // ReactSnapPixel.track('Purchase', {
          //   price: this.ticketObject.Total,
          //   currency: this.ticketObject.Currency,
          // })
          // this.$ga.event({
          //   eventCategory: 'purchase',
          //   eventAction: 'action',
          //   eventLabel: 'Purchase value',
          //   eventValue: `${this.ticketObject.Currency} ${this.ticketObject.Total}`,
          // })
          // const tikdata = {content_type: '', quantity: this.ticketObject.SeatsBooked, description: '', content_id: '', currency: this.ticketObject.Currency, value: this.ticketObject.Total }
          // tiktokCompletePayment(tikdata)
          // } else {
          //   console.log("object");
          // }
          this.hideLoading();
        })
        .catch(error => {
          this.hideLoading();

          console.log("error", error);
        });
    }
  }
};
</script>

<style scoped>
.vh-90 {
  height: 90vh;
}

.pad-space {
  padding: 30px;
}

.pad-lr {
  padding-left: 20px;
  padding-right: 20px;
}

.fz-22 {
  font-size: 22px;
}

.format-movie {
  padding-left: 5px;
  padding-right: 5px;
  border: 2px solid black;
  font-size: 20px;
}

.fnb-table {
  width: 100%;
  font-size: 28px;
  max-width: 740px;
}

.fnb-table td:nth-child(2) {
  width: 140px;
}

.bg-ticket:after {
  content: "";
  left: 50%;
  top: -60px;
  width: 120px;
  height: 120px;
  position: absolute;
  border-radius: 50%;
  background-color: #c1152d;
  transform: translateX(-50%);
}

.bg-ticket {
  background-color: #ffffff;
  width: 800px;
  height: auto;
  border-radius: 40px;
  position: relative;
  overflow: hidden;
}

.movie-image-ticket {
  height: 320px;
  background-color: pink;
}

.movie-image-ticket img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
