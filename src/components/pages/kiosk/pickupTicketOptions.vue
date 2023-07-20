<template>
  <div class="kiosk-welcome">
    <div>
      <div class="h3 mb-5">
        <div>
          LET’S GET YOU
          <span class="font-weight-bold">YOUR TICKETS!</span>
        </div>
      </div>
      <div class="d-flex align-items-center">
        <router-link to="enter-booking-id">
          <div class="btn-round">
            <div class="btn-content">
              <div>
                <div>ENTER</div>
                <div>BOOKING</div>
                <div>ID</div>
              </div>
            </div>
          </div>
        </router-link>

        <div class="m-5 h4">OR</div>

        <router-link to="enter-booking-id">
          <div class="btn-round">
            <div class="btn-content">
              <div>
                <div>SCAN QR</div>
                <div>CODE ON</div>
                <div>PHONE</div>
              </div>
            </div>
          </div>
        </router-link>

        <div class="m-5 h4">OR</div>

        <router-link to="enter-booking-id">
          <div class="btn-round">
            <div class="btn-content">
              <div>
                <div>LOGIN</div>
                <div>& PRINT</div>
                <div>TICKETS</div>
              </div>
            </div>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>