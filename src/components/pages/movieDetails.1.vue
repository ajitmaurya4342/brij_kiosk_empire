<template>
  <div>
    <section class="container-fluid px-0">
      <slick :options="movieSlider" class="movieDetail-slider">
        <div style="position:relative" v-for="(loop, key) in 3" :key="key">
          <div class="mdImg">
            <img src="@/assets/img/Avengers-Endgame-banner-poster.jpg" class="img-fluid mx-auto w-100 md-img">
            <div class="movie-tiitle text-center">
              <h2>AVENGERS: ENDGAME</h2>
              <div class="mb-3">English</div>
            </div>
          </div>
        </div>
      </slick>
    </section>


    <section>
      <!-- Movie Description -->
      <div class="movieDesBox pb-1">
        <div class="col-md-11 mx-auto mt-5">
          <p class="movie-desc">Life has become a balancing act for Adonis Creed. Between personal obligations and
            training
            for his next big fight, he is up against the challenge of his life. Facing an opponent with ties to his
            family’s past only intensifies his impending battle in the ring. Rocky Balboa is there by his side through
            it
            all and, together, Rocky and Adonis will confront their shared legacy, question what’s worth fighting for,
            and
            discover that nothing’s more important than family. Creed II is about going back to basics to rediscover
            what
            made you a champion in the first place, and remembering that, no matter where you go, you can’t escape your
            history. </p>

          <div class="row my-4">
            <div class="col-md-6 mov-det red-LB m-l mb-3">
              <h5>STARRING</h5>
              <p>Tessa Thompson, Michael B. Jordan, Dolph Lundgren, Sylvester Stallone</p>
            </div>
            <div class="col-md-6 mov-det m-r">

              <div class=" col-12">
                <div class="row">
                  <div class="red-LB col-4 col-lg mb-3">
                    <h5>GENRE</h5>
                    <p>Action</p>
                  </div>
                  <div class="red-LB col-4 col-lg mb-3">
                    <h5>RUNTIME</h5>
                    <p>135 Minutes</p>
                  </div>
                  <div class="red-LB col-4 col-lg mb-3">
                    <h5>RELEASING</h5>
                    <p>29 Nov 2018</p>
                  </div>
                  <div class="red-LB col-4 col-lg mb-3">
                    <h5>LANGUAGE</h5>
                    <p>English</p>
                  </div>
                  <div class="red-LB col-4 col-lg mb-3">
                    <h5>SUBTITLES</h5>
                    <p>Arabic, French</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>


    <div class="col-md-11 mx-auto text-center">
      <!-- CHOOSE YOUR CINEMA SECTION -->
      <section class="my-4">
        <h3 class="CYC">1. CHOOSE YOUR CINEMA:</h3>
        <ul class=" list-inline mb-0">
          <li class="list-inline-item mb-3" v-on:click="onSelectCinema('JEDDAH SC')"><button
              v-bind:class="{ active: selectedCinema === 'JEDDAH SC' }" class="btn btn-light-grey"> JEDDAH SC</button>
          </li>
          <li class="list-inline-item mb-3" v-on:click="onSelectCinema('MALL OF ARABIA')"><button
              v-bind:class="{ active: selectedCinema === 'MALL OF ARABIA' }" class="btn btn-light-grey"> MALL OF
              ARABIA</button> </li>
          <li class="list-inline-item mb-3" v-on:click="onSelectCinema('M.O.E')"><button
              v-bind:class="{ active: selectedCinema === 'M.O.E' }" class="btn btn-light-grey">M.O.E</button> </li>
          <li class="list-inline-item mb-3" v-on:click="onSelectCinema('FREEDOM CINEPLEX')"><button
              v-bind:class="{ active: selectedCinema === 'FREEDOM CINEPLEX' }" class="btn btn-light-grey"> FREEDOM
              CINEPLEX</button> </li>
          <li class="list-inline-item mb-3" v-on:click="onSelectCinema('DRIVE IN, SA')"><button
              v-bind:class="{ active: selectedCinema === 'DRIVE IN, SA' }" class="btn btn-light-grey"> DRIVE IN,
              SA</button> </li>
          <li class="list-inline-item mb-3" v-on:click="onSelectCinema('BIG SP-LASH')"><button
              v-bind:class="{ active: selectedCinema === 'BIG SP-LASH' }" class="btn btn-light-grey">BIG
              SP-LASH</button> </li>
          <li class="list-inline-item mb-3" v-on:click="onSelectCinema('LIBERTY STREET')"><button
              v-bind:class="{ active: selectedCinema === 'LIBERTY STREET' }" class="btn btn-light-grey"> LIBERTY
              STREET</button> </li>
          <li class="list-inline-item mb-3" v-on:click="onSelectCinema('S.A.R.')"><button
              v-bind:class="{ active: selectedCinema === 'S.A.R.' }" class="btn btn-light-grey">S.A.R.</button> </li>
        </ul>
      </section>

      <div class="d-none d-md-block">
        <img src="@/assets/img/svg/drop-line.svg" class="img-fluid w-100">
      </div>

      <div class="d-md-none">
        <img src="@/assets/img/svg/drop-line-mobile.svg" class="img-fluid w-100 d-md-none">
      </div>

      <!-- SHOW DATE SECTION -->
      <section class="my-4">
        <h3 class="CYC">2. SHOW DATE (APRIL 2019)</h3>
        <ul class="select-date">
          <li class="list-inline-item" v-for="(timing, a) in dateArray" :key="a" v-on:click="OnSelectDate(timing.date)">
            <div class="date-container" v-bind:class="{ active: selectedDate === timing.date }">
              <div class="date">{{timing.date}}</div>
              <div class="day">{{timing.day}}</div>
            </div>
          </li>
        </ul>
      </section>

      <div class="d-none d-md-block">
        <img src="@/assets/img/svg/drop-line.svg" class="img-fluid w-100">
      </div>

      <div class="d-md-none">
        <img src="@/assets/img/svg/drop-line-mobile.svg" class="img-fluid w-100 d-md-none">
      </div>

      <!-- EXPERIENCE SECTION -->
      <section class="my-4">
        <h3 class="CYC">3. EXPERIENCE</h3>
        <ul class="Cexpirence list-inline mb-0">
          <li class="list-inline-item mb-3" v-on:click="OnSelectExp(exp.experience)" v-for="( exp , key) in expArray"
            :key="key">
            <button class="btn btn-light-grey"
              v-bind:class="{ active: selectedExp === exp.experience }">{{exp.experience}}</button>
          </li>
        </ul>
      </section>

      <div class="d-none d-md-block">
        <img src="@/assets/img/svg/drop-line.svg" class="img-fluid w-100">
      </div>

      <div class="d-md-none">
        <img src="@/assets/img/svg/drop-line-mobile.svg" class="img-fluid w-100 d-md-none">
      </div>

      <!-- SHOWTIME SECTION -->
      <section class="my-4">
        <h3 class="CYC">5. SHOW TIME:</h3>
        <ul class="showtime py-3 mb-0">
          <li class="fill-height fill-green">
            <div class="timing-slot">
              <p class="time">12:00 PM</p>
              <p class="pt-3 color-text">AVAILABLE</p>
            </div>
            <div class="filling" style="height:95%;" />
          </li>
          <li class="fill-height fill-red">
            <div class="timing-slot">
              <p class="time">12:00 PM</p>
              <p class="pt-3 color-text">SOLD OUT</p>
            </div>
            <div class="filling" style="height:1%;" />
          </li>
          <li class="fill-height fill-yellow">
            <div class="timing-slot">
              <p class="time">12:00 PM</p>
              <p class="pt-3 color-text">SELLING FAST</p>
            </div>
            <div class="filling" style="height:55%;" />
          </li>
          <li class="fill-height">
            <div class="timing-slot">
              <p class="time">12:00 PM</p>
              <p class="pt-3 color-text">AVAILABLE</p>
            </div>
            <div class="filling" style="height:55%;" />
          </li>
        </ul>
      </section>

      <section class="my-5">
        <b-button to="/checkout" class="btn-proceed" >LET’S SELECT <br> YOUR SEATS!</b-button>
      </section>
    </div>


  </div>

</template>

<script>
  export default {
    beforeCreate: function () {
      let pre = window.localStorage.getItem('PREIMERE')
      if (pre == null || pre == 'false' || pre == false) {
        document.body.className = 'img-section'
      } else {
        document.body.className = 'gold-non-img'
      }
    },
    data () {
      return {
        movieSlider: {
          arrows: true,
          slidesToShow: 1,
          slidesToScroll: 1,
          autoplay: true,
          dots: true,
        },

        expArray: [{
          experience: '2D',
        },
        {
          experience: '3D',
        },
        {
          experience: '4DX',
        },

        ],
        dateArray: [{
          date: '12',
          day: 'SUN',
        },
        {
          date: '13',
          day: 'MON',
        },
        {
          date: '14',
          day: 'TUE',
        },
        {
          date: '15',
          day: 'WED',
        },
        {
          date: '16',
          day: 'THU',
        },
        {
          date: '17',
          day: 'FRI',
        },

        ],
        selectedCinema: '',
        selectedDate: '',
        selectedExp: '',
      }
    },
    methods: {
      OnSelectExp (data) {
        this.selectedExp = data
      },
      onSelectCinema (data) {
        this.selectedCinema = data
      },
      OnSelectDate (data) {
        this.selectedDate = data
      },
    },
  }
</script>


<style>
  .slick-prev,
  .slick-next {
    box-shadow: none;
  }

</style>
