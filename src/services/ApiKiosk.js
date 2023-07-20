import axios from "axios";
import Vue from "vue";
import { BASEURL_KIOSK } from "@/config/index";

export default () => {
  const instance = axios.create({
    // data: { language_id: language_id && language_id == 'ar' ? 1 : 0 },
    baseURL: BASEURL_KIOSK
  });
  // Uncomment to use token if needed
  //   let JWT = window.localStorage.getItem("JWT_TOKEN");
  //   if (JWT) {
  //     instance.defaults.headers.common['Authorization'] = JWT
  //   }

  instance.defaults.headers.common["Content-Type"] =
    "application/json;charset=UTF-8";
  instance.defaults.headers.post["Content-Type"] =
    "application/json;charset=UTF-8";

  instance.defaults.transformRequest = [
    function(data, headers) {
      // Do whatever you want to transform the data
      let language_id = window.localStorage.getItem("language_id");
      console.log("language_id::: :", language_id);
      data = {
        ...data,
        language_id: language_id && language_id == "ar" ? 1 : 0
      };
      return JSON.stringify(data);
    }
  ];
  instance.interceptors.response.use(
    function(response) {
      // Do something with response data
      return response;
    },
    function(error) {
      // Do something with response error
      if (error.response.status == 403) {
      } else if (error.response.status == 401) {
        Vue.$router.push({
          path: "/"
        });
      } else {
        return Promise.reject(error);
      }
    }
  );
  return instance;
};
