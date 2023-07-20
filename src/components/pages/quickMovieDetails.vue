<template>
  <div class="container-fluid px-0">
    <slick :options="movieSlider" class="movieDetail-slider">
      <div v-for="(movieSlider, a) in 5" :key="a" style="position:relative">
        <div class="mdImg">
          <img src="@/assets/img/movie-poster.jpg" class="img-fluid mx-auto w-100">
          <div class="movie-tiitle text-center">
            <h2>CREED II</h2>
            <ul class="list-inline mb-2">
              <li class="list-inline-item">Biography</li>
              <li class="list-inline-item">Drama</li>
            </ul>
            <div class="pb-2">IMDB 9.1</div>
          </div>
        </div>
      </div>
    </slick>

    <!-- Movie Description -->
    <div class="col-md-11 mx-auto mt-5">
      <p class="movie-desc">Life has become a balancing act for Adonis Creed. Between personal obligations and training
        for his next big fight, he is up against the challenge of his life. Facing an opponent with ties to his
        family’s past only intensifies his impending battle in the ring. Rocky Balboa is there by his side through it
        all and, together, Rocky and Adonis will confront their shared legacy, question what’s worth fighting for, and
        discover that nothing’s more important than family. Creed II is about going back to basics to rediscover what
        made you a champion in the first place, and remembering that, no matter where you go, you can’t escape your
        history.
        <router-link to="#" class="small font-weight-bold text-danger"><u>VIEW FULL SYNOPSIS</u></router-link>
        </p>
    </div>

    <div class="col-md-11 mx-auto mt-5 text-center">
      <ul class="list-inline quickSelectedDetails">
        <li class="list-inline-item"><span>1. MOVIE</span>CREED II</li>
        <li class="list-inline-item"><span>2. CINEMA NAME</span>JEDDAH SC</li>
        <li class="list-inline-item"><span>3. DATE</span>MONDAY, 14 FEB 2019</li>
        <li class="list-inline-item">
          <router-link to="#" class="text-danger"><u>EDIT</u></router-link>
        </li>
      </ul>
    </div>

    <!-- separator -->
    <div class="dotline-box">
        <hr class="dot-line"><span class=""></span>
    </div>
    <!-- separator  END -->

    <section class="my-5">
      <div class="col-md-12 col-lg-12 col-xl-8 mx-auto my-5 text-center">
        <h3 class="CYC">4. EXPERIENCE</h3>
        <div>
          <ul class="Cexpirence list-inline my-3">
            <li class="list-inline-item mb-3"><button class="btn btn-light-grey">REGULAR</button> </li>
            <!-- <li class="list-inline-item mb-3"><button class="btn btn-light-grey"> VIP</button> </li> -->
            <li class="list-inline-item mb-3"><button class="btn btn-light-grey">PREMIERE</button> </li>
          </ul>
        </div>
      </div>
    </section>

    <!-- separator -->
    <div class="dotline-box">
      <hr class="dot-line"><span class="d-none"></span>
    </div>
    <!-- separator  END -->

    <section class="my-5">
      <div class="col-md-12 col-lg-12 col-xl-8 mx-auto my-5 text-center">
        <h3 class="CYC">5. SHOW TIME:</h3>
        <ul class="showtime my-3 ">
          <li class="fill-height fill-green" v-for="(showtime, a) in 5" :key="a">
            <div class="timing-slot">
              <p class="time">12:00 PM</p> <span class="format">(IMAX) </span>
              <p class="pt-3 color-text">AVAILABLE</p>
            </div>
            <div class="filling" />
          </li>
        </ul>
      </div>
    </section>

    <!-- separator -->
    <div class="dotline-box">
      <hr class="dot-line"><span class="d-none"></span>
    </div>
    <!-- separator  END -->


    <!-- button -->
    <div class="text-center my-5">
      <button class="let-g0 btn btn-light-grey">LET’S SELECT YOUR SEATS!</button>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        movieSlider: {
          arrows: true,
          slidesToShow: 1,
          slidesToScroll: 1,
          autoplay: true,
          dots: true,
        },
      }
    },
  }
</script>
<style scoped>
  body {
    background: #fff;
  }

  .slick-prev,
  .slick-next {
    box-shadow: none;
  }

</style>
