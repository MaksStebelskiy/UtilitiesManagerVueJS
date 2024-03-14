<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import { mapState } from 'vuex';
import { Store } from 'vuex';

@Options({
  props: {
    msg: String,
  },

  computed: {
    ...mapState(['selectedMenuItem'])
  }
})
export default class Aside extends Vue {
  msg!: string;
  $store!: Store<any>;
  selectedMenuItem!: string;

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
      <button class="aside-button" :class="{ 'active': selectedMenuItem === 'home' }"
        @click="selectMenuItem('home')">Головна</button>
      <button class="aside-button" :class="{ 'active': selectedMenuItem === 'expenses' }"
        @click="selectMenuItem('expenses')">Витрати</button>
      <button class="aside-button" :class="{ 'active': selectedMenuItem === 'management' }"
        @click="selectMenuItem('management')">Керування</button>
      <button class="aside-button" :class="{ 'active': selectedMenuItem === 'payments' }"
        @click="selectMenuItem('payments')">Платежі</button>
    </div>

    <div class="aside-container-end">
      <hr />
      <button class="aside-end-button" :class="{ 'active': selectedMenuItem === 'settings' }"
        @click="selectMenuItem('settings')">
        <img src="@/assets/Settings32.png" alt="Налаштування" />
        Параметри
      </button>

      <button class="aside-end-button" :class="{ 'active': selectedMenuItem === 'support' }"
        @click="selectMenuItem('support')">
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
@import '../../styles/mixins.scss';
@import 'Aside';


</style>