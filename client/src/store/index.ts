import { createStore } from "vuex";

export default createStore({
  state: {
    isAuthenticated: localStorage.getItem("user") !== null,
    user: localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user")!)
      : null,
    selectedMenuItem: localStorage.getItem("selectedMenuItem") || "home",
    currentPaginationPage: parseInt(
      localStorage.getItem("currentPaginationPage") || "1"
    ),
  },
  getters: {},
  mutations: {
    login(state, user) {
      state.isAuthenticated = true;
      state.user = user;
      localStorage.setItem("user", JSON.stringify(user));
    },

    logout(state) {
      state.isAuthenticated = false;
      state.user = null;
      localStorage.removeItem("user");
    },

    setSelectedMenuItem(state, menuItem) {
      state.selectedMenuItem = menuItem;
      localStorage.setItem("selectedMenuItem", menuItem);
    },
    setCurrentPaginationPage(state, page) {
      state.currentPaginationPage = page;
      localStorage.setItem("currentPaginationPage", page.toString());
    },
  },
  actions: {},
  modules: {},
});
