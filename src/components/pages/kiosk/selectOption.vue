<template>
  <div class="kiosk-welcome">
    <div>
      <div class="h3 mb-5">
        <div class="mb-4">{{ $tc("WelcomeToEmpireCinemas") }}</div>
      </div>

      <div class="d-flex align-items-center">
        <router-link to="enter-booking-id">
          <div class="btn-round">
            <div class="btn-content p-3">
              <div class="text-uppercase">{{ $tc("PickUpYourTicket") }}</div>
            </div>
          </div>
        </router-link>

        <div class="m-5 h4"><u>OR</u></div>

        <router-link to="select-movie">
          <div class="btn-round">
            <div class="btn-content p-3">
              <div class="text-uppercase">{{ $tc("BookYourShow") }}</div>
            </div>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>
