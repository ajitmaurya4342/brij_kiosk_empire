import Api from "./ApiKiosk";

export default {
  checkDevice(payload) {
    return Api().post("/checkDevice", payload);
  },
  makeTranscation(payload) {
    return Api().post("/payDevice", payload);
  },
  buyTicket(payload) {
    return Api().post("/payDevice", payload);
  },
  printTicket(payload) {
    return Api().post("/print", payload);
  },
  dynamicApiExe(payload) {
    return Api().post("/dynamicURL", payload);
  },
};
