<template>
  <div id="pdfvuer" class="ksa">
    <!-- <div id="myBtn" class="download">
      <a :href="url" download>
        <img width="50px" src="@/assets/img/download-flat.png">
      </a>
    </div>-->
    <pdf
      :src="pdfdata"
      v-for="i in numPages"
      :key="i"
      :id="i"
      :page="i"
      :scale.sync="scale"
      style="width:100%;overflow:hidden"
    >
      <template slot="loading">loading content here...</template>
    </pdf>
  </div>
</template>

<script>
import pdfvuer from 'pdfvuer'

export default {
  components: {
    pdf: pdfvuer,
  },
  data () {
    return {
      page: 1,
      numPages: 0,
      pdfdata: undefined,
      url: '',
      //   errors: [],
      scale: 'page-width',
    }
  },
  computed: {
    formattedZoom () {
      return Number.parseInt(this.scale * 100)
    },
  },
  mounted () {
    this.getPdf()
  },
  watch: {
    show: function (s) {
      if (s) {
        this.getPdf()
      }
    },
    page: function (p) {
      if (
        window.pageYOffset <= this.findPos(document.getElementById(p)) ||
        (document.getElementById(p + 1) &&
          window.pageYOffset >= this.findPos(document.getElementById(p + 1)))
      ) {
        // window.scrollTo(0,this.findPos(document.getElementById(p)));
        document.getElementById(p).scrollIntoView()
      }
    },
  },
  methods: {
    getPdf () {
      var self = this
      self.url = '/static/pdf/ksa.pdf'
      self.pdfdata = pdfvuer.createLoadingTask('static/pdf/ksa.pdf')
      self.pdfdata.then(pdf => {
        self.numPages = pdf.numPages
        window.onscroll = function () {
          changePage()
        }

        function changePage () {
          var i = 1,
            count = Number(pdf.numPages)
          do {
            if (
              window.pageYOffset >= self.findPos(document.getElementById(i)) &&
              window.pageYOffset <= self.findPos(document.getElementById(i + 1))
            ) {
              self.page = i
            }
            i++
          } while (i < count)
          if (window.pageYOffset >= self.findPos(document.getElementById(i))) {
            self.page = i
          }
        }
      })
    },
    findPos (obj) {
      return obj.offsetTop
    },
  },
}
</script>

<style lang="css" scoped>
#buttons {
  margin-left: 0 !important;
  margin-right: 0 !important;
}
/* Page content */
.content {
  padding: 16px;
}
.download {
  position: fixed;
  bottom: 42px;
  right: 30px;
  z-index: 99;
  font-size: 18px;
  border: none;
  outline: none;
  cursor: pointer;
  padding: 15px;
  border-radius: 4px;
}
@media (max-width: 767px) {
  .ksa {
    margin-top: 35%;
  }
}
</style>
