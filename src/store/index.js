import { createStore } from "vuex";
import userMgt from "./modules/use_mgt";

export default createStore({
  modules: {
    user: userMgt,
  },
  state() {
    return {
      test: "hello world",
      currentUser: null,
    };
  },
  getters: {},
  mutations: {
    setCurrentUser(state, user) {
      console.log("test");
      console.log(user);
      state.currentUser = user;
    },
  },
  actions: {
    // fetchCurrentUser.
  },
});
