<template>
  <div>
    <section>
      <div class="container-fluid experience-list">
        <div class="text-center pt-5 pb-3 px-3 heading">
          <h5>CINEMA EXPERIENCE</h5>
        </div>
        <div class="col-md-11 px-0 mx-auto">
          <div class="exp-content">
            <slick :options="expSlider">
              <div v-for="(data, a) in 5" :key="a">
                <div class="exp-box">
                  <figure>
                    <img
                      src="https://cdn-api.novocinemas.com/Files/Experience/63723163002917443712328983-e07c-4095-9945-9f4fdfd9e01f.png"
                      class="img-fluid"
                    />
                  </figure>
                  <div class="exp-logo">
                    <figure>
                      <img
                        src="https://cdn-api.novocinemas.com/Files/Experience/637231630028755437047c05e9-88ee-49a2-bc10-bd535c8d628a.png"
                        class="img-fluid"
                      />
                    </figure>
                  </div>
                  <div class="content">
                    <!-- <figure>
                    <img
                      src="https://cdn-api.novocinemas.com/Files/Experience/637231630028755437047c05e9-88ee-49a2-bc10-bd535c8d628a.png"
                      class="img-fluid"
                    />
                  </figure> -->
                    <div class="mx-3">
                      <button class="btn btn-explore active">Explore</button>
                    </div>
                  </div>
                  <!-- <div class="exp-overlay"></div> -->
                </div>
              </div>
            </slick>
          </div>
        </div>

        <div class="exp-footer py-4">
          <div class="col-lg-4 mx-auto text-center">
            <h6>EXPERIENCES</h6>
            <div class="exp-footer-logo">
              <figure v-for="(data, a) in 5" :key="a">
                <img
                  src="https://cdn-api.novocinemas.com/Files/Experience/637231630028755437047c05e9-88ee-49a2-bc10-bd535c8d628a.png"
                  class="img-fluid"
                />
              </figure>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  data () {
    return {
      expSlider: {
        arrows: true,
        slidesToShow: 5,
        // centerMode: true,
        centerPadding: '8.5%',
        slidesToScroll: 1,
        autoplay: true,
        dots: false,
        responsive: [
          {
            breakpoint: 1400,
            // settings: {
            //   centerPadding: "8%"
            // }
          },
          {
            breakpoint: 1024,
            // settings: {
            //   centerPadding: "13%"
            // }
          },
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 3,
              infinite: true,
              dots: true,
            },
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
              dots: true,
            },
          },
        ],
      },
    }
  },
}
</script>

<style>
.experience-list .heading h5 {
  color: #c2162e;
}

figure {
  margin: 0 0 0rem;
}

.experience-list .exp-content .exp-box {
  /* width: 16.666%; */
  position: relative;
  float: left;
  text-align: center;
  cursor: pointer;
  overflow: hidden;
}

.experience-list .exp-content .exp-box .exp-logo {
  position: absolute;
  top: 30px;
  z-index: 10;
  top: 50%;
  left: 50%;
  -webkit-transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
}

.experience-list .exp-content .exp-box .exp-logo img {
  width: 80%;
  display: block;
  margin-left: auto;
  margin-right: auto;
}

.experience-list .exp-content .exp-box::before {
  content: " ";
  background: linear-gradient(0deg, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5));
  position: absolute;
  display: block;
  width: 100%;
  top: 0px;
  left: 0;
  height: 100%;
  border-radius: 10px;
  z-index: 10;
  transition: 0.5s ease;
}

.experience-list .exp-content .exp-box:hover::before {
  content: "";
  display: none;
}

.experience-list .exp-content .exp-box .content {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  overflow: hidden;
  width: 100%;
  height: 0;
  transition: 0.5s ease;
}

.experience-list .exp-box:hover .content {
  height: 40%;
  /* top: 50%; */
}

.experience-list .slick-dots {
  position: relative !important;
  bottom: 10px;
}

.experience-list .exp-content .slick-dots li button {
  width: 30px;
  height: 05px;
  border-radius: 0px;
}

.experience-list .exp-footer .exp-footer-logo {
  display: flex;
  justify-content: space-between;
}

.experience-list .exp-footer .exp-footer-logo figure {
  padding: 10px;
}

.experience-list .btn-explore {
  width: 100%;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  height: 52px;
  line-height: 1;
  font-size: 20px;
  color: #b5b7b9;
  border-radius: 0px;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  background-color: #cc202e;
}
</style>
