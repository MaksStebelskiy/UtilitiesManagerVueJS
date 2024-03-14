<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import { Store } from 'vuex';

@Options({
  props: {
    msg: String
  }
})
export default class Home extends Vue {
  msg!: string;

  $store!: Store<any>;

  selectMenuItem(menuItem: string) {
    this.$store.commit('setSelectedMenuItem', menuItem);
  }
}
</script>

<template>

  <div class="info-container">

    <div class="text-container">
      <h3>Відстеження витрат та оплата</h3>
      <h1>КОМУНАЛЬНИХ ПОСЛУГ</h1>
      <p>Веб-застосунок Utilities Manager робить процес контролю <br> за витратами на комунальні послуги зручним,
        швидким та
        приємним.</p>
      <button>
        Детальніше
      </button>
    </div>

    <div class="logo-container">
      <img src="@/assets/HomeLogo.png" alt="">
    </div>

  </div>

  <div class="card-container">
    <div class="card" @click="selectMenuItem('expenses')">
      <p>Переглядайте наявні витрати за комунальні послуги</p>
    </div>
    <div class="card" @click="selectMenuItem('management')">
      <p>Додавайте нові витрати, редагуйте чи видаляйте існуючі</p>
    </div>
    <div class="card" @click="selectMenuItem('payments')">
      <p>Оплачуйте комунальні послуги легко та зручно</p>
    </div>
  </div>

</template>

<style scoped lang="scss">
@import '../../../../styles/mixins.scss';
@import 'Home';

.card,
button {
  @include shadow;
}
</style>