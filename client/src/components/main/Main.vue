<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import { mapState } from 'vuex';
import { Store } from 'vuex';
import Home from './content/home/Home.vue';
import Expenses from './content/expenses/Expenses.vue';
import Management from './content/management/Management.vue';
import Payments from './content/payments/Payments.vue';
import Settings from './content/settings/Settings.vue';
import Support from './content/support/Support.vue';
import store from '../../store/index';

@Options({
  props: {
    msg: String,
  },

  computed: {
    ...mapState(['selectedMenuItem'])
  }

})

export default class Main extends Vue {
  msg!: string;
  selectedMenuItem!: string;
  $store!: Store<{ selectedMenuItem: string }>;
  
  mounted() {
    this.$store.commit('setSelectedMenuItem', this.selectedMenuItem); // При монтуванні компоненти оновлюємо стан, щоб відображення було коректним при перезавантаженні сторінки
  }
  

  get currentComponent() {
    switch (this.selectedMenuItem) {
      case 'home':
        return Home;
      case 'expenses':
        return Expenses;
      case 'management':
        return Management;
      case 'payments':
        return Payments;
      case 'settings':
        return Settings;
      case 'support':
        return Support;
      default:
        return Home;
    }
  }
}

</script>

<template>
  <main>
    <component :is="currentComponent" />
  </main>
</template>

<style scoped lang="scss">
main {
  background: #e9e9e9;
  border-radius: 20px;
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px 20px;
  
}

a {
  color: #42b983;
}
</style>