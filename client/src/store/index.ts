import { createStore } from 'vuex'

export default createStore({
  state: {
    selectedMenuItem: ''
  },
  getters: {
  },
  mutations: {
    setSelectedMenuItem(state, menuItem){
      state.selectedMenuItem = menuItem;
    }
  },
  actions: {
  },
  modules: {
  }
})
