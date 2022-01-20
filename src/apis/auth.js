import axios from "@/apis/axios";
import qs from "qs";
import store from "../store";

export default {
  login: (username, password) => {
    return axios.post(
      "/authentication/login",
      qs.stringify({
        user: {
          login: username,
          password: password,
        },
      })
    );
  },

  logout: () => {
    return axios.post("/authentication/logout");
  },

  checkUserLogged: () => {
    return axios.get("/authentication/auth_verify").then(function (response) {
      store.commit("setCurrentUser", response.data);
    });
  },
};
