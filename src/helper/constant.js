// export const URL_BASE = 'http://empireapidev.binarynumbers.io';
// export const URL_BASE = 'http://api.empirecinemas.net';
// export const MODE = 'dev';

// export const URL_BASE = 'https://empireapi.binarynumbers.io';
// export const URL_BASE = 'http://empireksaapi.binarynumbers.io';
var meta_info = "";
let languageCheck = window.localStorage.getItem("language");
let Title = "Empire Cinemas: View listings and book tickets now! 1";
if (languageCheck) {
  let language_check1 = JSON.parse(window.localStorage.getItem("language"));
  if (language_check1.lang_id == 1) {
    Title = "دور سينما إمباير: شاهد القوائم وحجز التذاكر الآن!";
  }
}
let url = window.location.hostname;

let urlBase = "";
if (
  url == "lb.empirecinemas.com" ||
  url == "empirepremiere.com" ||
  url == "empirecinemas.me" ||
  url == "lb.empirecinemas.com" ||
  url == "localhost:8082"
) {
  meta_info = {
    // Result: My Page Title ← My Site
    title: Title,
    // If a child changes the title to "My Other Page Title",
    // it will become: My Other Page Title ← My Site
    titleTemplate: null,
    // Define meta tags here.
    meta: [
      {
        "http-equiv": "Content-Type",
        content: "text/html; charset=utf-8"
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1"
      },
      {
        name: "description",
        content:
          "Find out what are the latest movies at Empire Cinemas. Watch trailers, check movie schedules, book cinema tickets and food online!"
      },
      {
        name: "keywords",
        content:
          "lb, lebanon, empire cinemas lb, empire cinemas lebanon, movies in empire cinemas lebanon"
      }
    ]
  };
  // urlBase = 'https://api-lbir.empirecinemas.com';
  urlBase = "https://apinew.empirecinemas.com";
} else if (url == "empirecinemas.me" || url == "irq.empirecinemas.com") {
  meta_info = {
    title: Title,
    titleTemplate: null,
    meta: [
      {
        "http-equiv": "Content-Type",
        content: "text/html; charset=utf-8"
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1"
      },
      {
        name: "description",
        content:
          "Find out what are the latest movies at Empire Cinemas. Watch trailers, check movie schedules, book cinema tickets and food online!"
      },
      {
        name: "keywords",
        content:
          "iraq, erbil, empire cinemas iraq, empire cinemas erbil, movies in empire cinemas iraq"
      }
    ]
  };
  // urlBase = 'https://api-lbir.empirecinemas.com';
  urlBase = "https://apinew.empirecinemas.com";
} else if (
  url == "empirecinemas.com.sa" ||
  url == "ksa.empirecinemas.com" ||
  url == "dev.empirecinemas.net" ||
  url == "empireksadev.binarynumbers.io" ||
  url == "localhost" ||
  url == "localhost:8082" ||
  url == "empirevip.binarynumbers.io" ||
  url == "dev.empirecinemas.com"
) {
  meta_info = {
    title: Title,
    titleTemplate: null,
    meta: [
      {
        "http-equiv": "Content-Type",
        content: "text/html; charset=utf-8"
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1"
      },
      {
        name: "description",
        content:
          "Find out what are the latest movies at Empire Cinemas. Watch trailers, check movie schedules, book cinema tickets and food online!"
      },
      {
        name: "keywords",
        content:
          "sa, ksa, saudi arabia, kingdom of saudi arabia, empire cinemas ksa, empire cinemas saudi arabia, empire cinemas kingdom of saudi arabia, movies in ksa, movies in empire cinemas ksa, movies in empire saudi"
      }
    ]
  };
  // console.log('meta_info :>> ', meta_info);
  // Dev API
  urlBase = "https://apinew.empirecinemas.com";
  // OLD
  // urlBase = 'https://empireksadevapi.binarynumbers.io';

  // Live API
  // urlBase = 'https://api.empirecinemas.com';
  // OLDhea
  // urlBase = 'https://apiksa.empirecinemas.com.sa';
} else if (url == "empirecinemas.net") {
  urlBase = "https://apinew.empirecinemas.com";
} else {
  // urlBase = 'https://empireapi.binarynumbers.io';
  // urlBase = 'https://empireksaapi.binarynumbers.io';
  urlBase = "https://apinew.empirecinemas.com";
  // urlBase = 'https://apiksa.empirecinemas.com.sa';
  // urlBase = 'https://empireapi.binarynumbers.io';
}
// if same for all
urlBase = "https://apinew.empirecinemas.com";
// urlBase = 'https://apinew-dev.empirecinemas.com'
// urlBase = "http://localhost:3800";
export const metaInfo = meta_info;
export const URL_BASE = urlBase;
