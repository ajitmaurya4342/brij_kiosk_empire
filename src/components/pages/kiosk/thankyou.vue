<template>
  <h2 class="thankyou">Please Wait while your ticket is printing...</h2>
</template>

<script>
export default {
  data () {
    return {}
  },
  mounted () {
    setTimeout(() => {
      this.$router.push({
        path: '/select-option'
      })
    }, 7000)
  }

}
</script>

<style>

</style>
