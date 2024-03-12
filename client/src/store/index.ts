import { createStore } from "vuex";



export default createStore({
  state: {
    isAuthenticated: localStorage.getItem("user") !== null,
    user: localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user")!)
      : null,
    selectedMenuItem: localStorage.getItem("selectedMenuItem") || "home", // Ініціалізуємо значення стану з local storage або встановлюємо значення за замовчуванням
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
      localStorage.setItem("selectedMenuItem", menuItem); // Зберігаємо значення в local storage при зміні
    },
  },
  actions: {},
  modules: {},
});
