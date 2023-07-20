<template>
  <div>
    <section>
      <div class="container-fluid experience-detail px-0">
        <div class="exp-header d-flex justify-content-between py-3 px-5">
          <div>
            <!-- <h6>Back Button</h6> -->
          </div>
          <ul>
            <li>
              <a href="">NOVO IMAX</a>
            </li>
            <li>
              <a href="">NOVO IMAX</a>
            </li>
            <li>
              <a href="">NOVO IMAX</a>
            </li>
            <li>
              <a href="">NOVO IMAX</a>
            </li>
            <li>
              <a href="">NOVO IMAX</a>
            </li>
          </ul>
        </div>
        <!--End exp-header-->
        <div class="banner">
          <figure>
            <img
              src="https://cdn-api.novocinemas.com/Files/Experience/637231630028857012cc3f0d5f-9d36-4a1a-b8f5-cd924db2dd17.jpg"
              class="img-fluid"
            />
          </figure>
          <div class="desc">
            <h1>MOVIE-MAGIC EVERY TIME THE LIGHTS GO DOWN</h1>
          </div>
        </div>
        <!--End Banner-->
        <div class="exp-content">
          <div class="content detail-about py-5">
            <div class="col-lg-10 mx-auto">
              <div class="custom-border">
                <hr class="border-1" />
                <hr class="border-2" />
                <hr class="border-1" />
              </div>
              <div class="title">
                <h1>Participate <b>in the action</b></h1>
              </div>
              <div class="desc px-xl-5">
                <p>
                  IMAX Is Believing®, whether it’s out in an alternate universe
                  or down in the deep blue sea. We’ve architectured and
                  positioned everything in our IMAX® theatres to create the most
                  intense colour, contrast and sound you could possibly
                  encounter. So real you’ll forget you’re in a theatre. Go
                  beyond watching a movie to The IMAX® Experience®—the world’s
                  most immersive movie impression.
                </p>
              </div>
              <div class="button">
                <button class="btn btn-green btn-secondary py-3 px-5">
                  VIEW GALLERY
                </button>
              </div>
            </div>
          </div>
          <div class="content detail-enjoy py-5">
            <div class="col-lg-10 mx-auto">
              <div class="custom-border">
                <hr class="border-1" />
                <hr class="border-1" />
              </div>
              <div class="title">
                <h1>You'll Enjoy</h1>
              </div>
              <div class="list-enjoy">
                <div class="row">
                  <div class="col-lg-3" v-for="(index, data) in 4">
                    <div class="enjoy-box">
                      <figure>
                        <img
                          src="https://cmsapi-uae.novocinemas.com/Files/Experience/screenfeature/technology.svg"
                          class="img-fluid"
                        />
                      </figure>
                      <h3>Seating</h3>
                      <p>
                        Feel immersed in the world's most innovative cinema
                        experience with heightened realism, dual projection, and
                        remastering.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="content detail-movie py-5">
            <div class="col-lg-11 mx-auto">
              <div class="custom-border">
                <hr class="border-1" />
                <hr class="border-1" />
              </div>
              <div class="title">
                <h1>Movies Showing @ <b>NOVO IMAX</b></h1>
              </div>
              <div class="filter mb-5">
                <ul class="list-inline mb-0 text-right mt-3 mt-md-0">
                  <li
                    class="list-inline-item d-block d-md-inline font-weight-bold ar-flt-txt"
                  >
                    Filter
                  </li>
                  <li class="list-inline-item">
                    <b-dropdown :text="'GENRE'" variant="none" class>
                      <b-dropdown-item
                        v-for="(genre, genreListIndex) in 3"
                        :key="genreListIndex"
                      >
                        <span class="text-capitalize">Hi</span>
                      </b-dropdown-item>
                    </b-dropdown>
                  </li>
                  <li class="list-inline-item">
                    <b-dropdown :text="'LOCATION'" variant="none" class>
                      <b-dropdown-item
                        v-for="(genre, genreListIndex) in 3"
                        :key="genreListIndex"
                      >
                        <span class="text-capitalize">Horror</span>
                      </b-dropdown-item>
                    </b-dropdown>
                  </li>
                  <li class="list-inline-item">
                    <b-dropdown :text="'EXPERIENCE'" variant="none" class>
                      <b-dropdown-item
                        v-for="(genre, genreListIndex) in 3"
                        :key="genreListIndex"
                      >
                        <span class="text-capitalize">Hi</span>
                      </b-dropdown-item>
                    </b-dropdown>
                  </li>
                </ul>
              </div>
              <div class="movie-list">
                <div class="row">
                  <div
                    class="col-6 col-md-4 col-lg-3"
                    v-for="(index, data) in 4"
                    :key="data"
                  >
                    <div>
                      <img
                        src="https://cdn-api.novocinemas.com/Files//Movie/220x322/music-250x366.jpg"
                        class="img-fluid w-100"
                      />
                      <div class="d-flex justify-content-between">
                        <div>
                          <h4>Music</h4>
                          <p class="text-left">English</p>
                        </div>
                        <div>
                          <span>PG 13</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!--End Exp-content-->
      </div>
    </section>
  </div>
</template>

<script>
</script>

<style>
.experience-detail .banner {
  position: relative;
}

.experience-detail .banner .desc {
  position: absolute;
  bottom: 200px;
  width: 100%;
  color: white;
  text-align: center;
}

.experience-detail .content {
  display: block;
  margin-left: auto;
  margin-right: auto;
  text-align: center;
  /* padding: 30px 0 15px 0; */
}

.experience-detail .content .title {
  padding: 20px 0;
  margin-bottom: 10px;
}

.experience-detail .content .desc {
  padding: 20px 0;
  margin-bottom: 10px;
}

.experience-detail .content .button {
  display: inline-block;
}

.experience-detail .content .custom-border hr {
  width: 10%;
  margin: 2px auto;
}

.experience-detail .content .custom-border .border-1 {
  border-top: 6px solid #c9192e;
}

.experience-detail .content .custom-border .border-2 {
  border-top: 10px solid #c9192e;
}

.experience-detail .list-enjoy .enjoy-box {
  border: 1px dotted #c9192e;
  padding: 20px;
  border-radius: 05px;
}

.experience-detail .detail-enjoy {
  background-color: lavender;
}

.experience-detail .list-enjoy {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.experience-detail .list-enjoy img {
  width: 50%;
  display: block;
  margin-left: auto;
  margin-right: auto;
}

.experience-detail .exp-header ul {
  display: inline-flex;
  list-style-type: none;
}

.experience-detail .exp-header ul li {
  padding-left: 20px;
}

.experience-detail .exp-header ul li a {
  color: black;
}

.experience-detail .detail-movie figure {
  margin: revert;
}

.experience-detail .filter .filter-list li .btn {
  color: black !important;
}
</style>
