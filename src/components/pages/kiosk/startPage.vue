<template>
  <div>
    <h2 class="thankyou">Please Wait Initializing Server...</h2>

    <aside
      @dblclick="gotoSettingLogin"
      id="hidden-aside"
      class="hidden-block"
    />
  </div>
</template>
<script>

export default {
  name: 'StartPage',
  data () {
    return {
      shows: [],
      ErrorMessage: 'Something went wrong'
    }
  },
  computed: {
    getNowShowing () {
      return this.$store.getters.getNowShowing
    }
  },
  beforeMount () {
    this.goToHome()
  },
  methods: {
    goToHome () {
      let instance = this

      Promise.all(
        [
          this.$store.dispatch('fetchNowShowing'),
        ]
          .map(
            p => p
              .then((value) => ({ status: 'fulfilled', value }))
              .catch((reason) => {
                console.log({ status: 'rejected', reason })
                return { status: 'rejected', reason }
              })
          )
      )

      if (instance.getNowShowing.data && instance.getNowShowing.data.length) {
        this.$router.push({
          path: '/home'
        })
      } else {
        setTimeout(function () {
          instance && instance.goToHome && instance.goToHome()
        }, 1000)
      }
    },
    gotoSettingLogin: function () {
      this.$router.push({
        path: '/settingsLogin',
      })
    }
  }
}
</script>

<style></style>
