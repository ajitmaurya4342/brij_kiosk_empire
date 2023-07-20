<template>
    <section style="min-height:calc( 100vh - 230px );">
      <div class="container">
        <div class="error-container">
          <img src="@/assets/img/svg/error-404.svg">
        </div>
      </div>
    </section>
</template>

<script>
export default {
  beforeCreate: function () {
    let pre = window.localStorage.getItem('PREIMERE')
    if (pre == null || pre == 'false' || pre == false) {
      document.body.className = 'img-section'
    } else {
      document.body.className = 'gold-img-section'
    }
  },
}
</script>


<style scoped>
.footer{
   background-image: none !important;
 }
</style>
