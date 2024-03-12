<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import { Store } from 'vuex';

@Options({
  props: {
    msg: String,
  },
})
export default class Aside extends Vue {
  msg!: string;
  $store!: Store<any>;

  selectMenuItem(menuItem: string) {
    this.$store.commit('setSelectedMenuItem', menuItem);
  }

  logout() {
    this.$store.commit('logout');
    localStorage.removeItem('isAuthenticated');
    this.$router.push('/login');
  }

}
</script>

<template>
  <aside>

    <div class="aside-container-start">
      <button class="aside-button" @click="selectMenuItem('home')">Головна</button>
      <button class="aside-button" @click="selectMenuItem('expenses')">Витрати</button>
      <button class="aside-button" @click="selectMenuItem('management')">Керування</button>
      <button class="aside-button" @click="selectMenuItem('payments')">Платежі</button>
    </div>

    <div class="aside-container-end">
      <hr />
      <button class="aside-end-button">
        <img src="@/assets/Settings32.png" alt="Налаштування" />
        Параметри
      </button>
      <button class="aside-end-button">
        <img src="@/assets/Support32.png" alt="Підтримка" />
        Підтримка
      </button>

      <button class="aside-end-button" @click="logout">
        <img src="@/assets/Logout32.png" alt="Вихід" />
        Вихід
      </button>

    </div>

  </aside>
</template>

<style scoped lang="scss">
@import 'Aside';
</style>