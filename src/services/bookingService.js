import Api from "./Api";

export default {
  getBookingDetails(payload) {
    return Api().post("/getBookingDetails", payload);
  },
  getDeliverOnlineTicket(payload) {
    return Api().post("/getDeliverOnlineTicket", payload);
  },
  reserveSeat(payload) {
    return Api().post("/reserveSeats", payload);
  },
  updateReserve(payload) {
    return Api().post("/updateReserve", payload);
  },
  getReserveDetails(payload) {
    return Api().post("/getReserveDetails", payload);
  },
  buyTicket(payload) {
    return Api().post("/buyTicket", payload);
  },
  checkDevice() {
    return Api().get("/checkDevice");
  },
  makeTranscation(payload) {
    return Api().post("/payDevice", payload);
  },
  payDeviceStatus() {
    return Api().get("getPayDeviceStatus");
  }
};
