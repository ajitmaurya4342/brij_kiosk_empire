export const API_VERSION = "v1.0";
const HOST_URL = `brij-kiosk-gdc-3.brij.tech`;
// const LIVEBASEURL = `https://cinematic-server-gdc-3.brij.tech`;
const LIVEBASEURL = `https://api-stussihof.brij.tech`;

let DEVBASEURL = `http://localhost:3800`;
let IMG_URL = `https://api-stuessihof-dev.brij.tech`;

// LIVE LIVE LIVE LIVE
// DEVBASEURL = `https://api-stussihof.brij.tech`;

// DEVBASEURL = `https://cinematic-server-gdc-3.brij.tech`;
// DEVBASEURL = `http://shringar.brij.tech:3950`;
// DEVBASEURL = `https://api-ch-8730-rex.brij.tech`;
// DEVBASEURL = `https://api-stuessihof-stg.brij.tech`
// DEVBASEURL = `https://api-stuessihof-dev.brij.tech`;
// DEVBASEURL = `https://demo-api.brij.tech`;
// DEVBASEURL = `https://cinema-akil-api-2.brij.tech`;
// DEVBASEURL = `https://api-imaculix-1.brij.tech`;
// DEVBASEURL = `https://api-stussihof.brij.tech`;
// DEVBASEURL = `http://localhost:9999`;
// DEVBASEURL = `https://stg-api.wanasatime.com`;
DEVBASEURL = `https://api-empire.brij.tech`;

export const IMG_BASEURL = IMG_URL;
export const BASEURL_KIOSK = `http://localhost:3001`;
export const PAYMENT_PORT = `4`;

export const BASEURL_BRIJ =
  window.location.host === HOST_URL ? "LIVEBASEURL" : DEVBASEURL;

export const ARENA_TOKEN = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6ImVjYWFlZDFlLTllZTQtNGM0Yy04NzYxLWMyYjc3NWMwZDM3ZCIsImlhdCI6MTYxMjQzNzQzOSwiZXhwIjoxNzE1MDI5NDM5fQ.rc0ybaQWDLFMfU6WA1gmXy2RbtKtPldh3ZtVeZycLyY`;

export let BING_TOKEN = "";
BING_TOKEN = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6ImVjYWFlZDFlLTllZTQtNGM0Yy04NzYxLWMyYjc3NWMwZDM3ZCIsImlhdCI6MTYxMjQzNzQzOSwiZXhwIjoxNzE1MDI5NDM5fQ.rc0ybaQWDLFMfU6WA1gmXy2RbtKtPldh3ZtVeZycLyY`;
// BING_TOKEN = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6IjlhZWVjY2U0LWUzZDYtNDBiNy1hZDZkLTE1YWM0NmQ5ZGQxYiIsImlhdCI6MTYyMzA2NDA5NywiZXhwIjoxNjI1NjU2MDk3fQ.lo1G5lWDb6eIy-WIkZnbGedr00ClFm5D8HWujRJxxyc`;

//
export const ARENA_TOKEN2 = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6IjYwN2VkY2MwLTNjODQtNGRhZC1hY2VmLTBjN2FhYjNmMzU1MyIsImlhdCI6MTYwNjg5MzA0MCwiZXhwIjoxNjA5NDg1MDQwfQ.3dkWIqaDYXjJ0Eayq_nL8Q0rbmqfYcyI3NLZbcbKh8Y`;
export const BING_TOKEN2 = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6IjIwNTE5ZGM2LTNkODktNDViMi04OTM5LWM2Yjg4YmM2NmExNSIsImlhdCI6MTYxMjQzNzQzOSwiZXhwIjoxNjE1MDI5NDM5fQ.jMjwQUqQopck_eOQga-zTig3DDhuhnRLMpgSRo2_5s4`;
export const Imaculix = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6IjRkMDE4OGIyLTdhNzctNDIzMy1iMjM5LTNlNTkyMmJmYTk3MyIsImlhdCI6MTYxMzIwODE4MSwiZXhwIjoxNjE1ODAwMTgxfQ.ZbFgp541YdJqRvR3P7BrZlLwN2Bv73bdgixWyaIMeBE`;
export const CINEMA_AKIL = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6ImU0YmMxZmMzLWYyZmYtNDdiYy05OTQyLWQxZTE5NzZhYjZiOSIsImlhdCI6MTYyMjQ2ODQ2NCwiZXhwIjoxNjg1NTIwNjY1fQ.EYaseltsTkWgUbkW3ug0qPgoYb0yneodvYWS0deGbvo`;
export const CINEMA_AKIL_2 = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6IjlhZWVjY2U0LWUzZDYtNDBiNy1hZDZkLTE1YWM0NmQ5ZGQxYiIsImlhdCI6MTYyMzA2NDA5NywiZXhwIjoxNjI1NjU2MDk3fQ.lo1G5lWDb6eIy-WIkZnbGedr00ClFm5D8HWujRJxxyc`;
export const Stussiof = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6IjAzNmNhYTcyLWU5YWQtNGM0ZC05MzFkLTVlMjY1Mjg0NzI3YSIsImlhdCI6MTYyNDg3OTU2MCwiZXhwIjoxNjI3NDcxNTYwfQ.1oZqMj1Q66krvo0qNWAhQE8ML5azR6hQH_02zQmQSji4`;
export const Rex = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6ImVmNDQzZWFkLTIyNDAtNGRlMy1iMTE2LWM3NjQwNWVmODY5OSIsImlhdCI6MTYzMjY1MTYzOCwiZXhwIjoxNjM1MjQzNjM4fQ.aFOMB7QJZgPS4qWbQa7JXa8HCqBo4N9IitaYwxd-spY`;

export const Petro = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6IjgwMjQxYjUwLTI5NDEtNDVkOC04ZWZhLWM1MzExZDMyMTBkYSIsImlhdCI6MTYyODUwMDk2MiwiZXhwIjoxNjMxMDkyOTYyfQ.b9KxLL21OMsyk8ScGtc4VmMD-UN91Ezo14V_X-w3fnY`;

export const Stuss = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6IjAzNmNhYTcyLWU5YWQtNGM0ZC05MzFkLTVlMjY1Mjg0NzI3YSIsImlhdCI6MTYyNDg3OTU2MCwiZXhwIjoxNjI3NDcxNTYwfQ.1oZqMj1Q66krvo0qNWAhQE8ML5azR6hQH_02zQmQSji4`;

export const CINEMA_AKIL_DEV = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6ImMzZjYwN2EzLTIzN2ItNGRjZi1iMWM4LWFmYjg4NTk1YzMxYSIsImlhdCI6MTYzNzc2Mjg3NSwiZXhwIjoxNjQwMzU0ODc1fQ.lyS6TWpkEXpA6yWHaSk6gclEyIQUtkxYR3wmbkP7Msc`;

export const wanasa = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6ImZmYmM1OWRkLWE1MWItNGRkMi1iNjEwLWFhNDUyMDc5Njc1MyIsImlhdCI6MTYyNDg3OTU2MCwiZXhwIjoxNzI3NDcxNTYwfQ.oQk-U01vKsyA1Bx7NrI8_rqiRrU7xSd7odw2QPNVHRs`;

export const demo = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6IjAzNmNhYTcyLWU5YWQtNGM0ZC05MzFkLTVlMjY1Mjg0NzI3YSIsImlhdCI6MTYyNDg3OTU2MCwiZXhwIjoxNjI3NDcxNTYwfQ.1oZqMj1Q66krvo0qNWAhQE8ML5azR6hQH_02zQmQSji4`;

export const Empire = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6IjFkMGQ1ZGFkLThjYWUtNDkwMy04NzE3LWNiNGViMTg1ODVkMiIsImlhdCI6MTY1NDc1NTU4MSwiZXhwIjoxNzU3MzQ3NTgxfQ.dqHVooeRSr_TT1_d9aEyqPzZ_ZLX04C40Kaws-Nb3ng`;

export const TOKEN = Empire;

// export const TOKEN = CINEMA_AKIL_DEV;
