<script lang="ts">
import { Options, Vue } from 'vue-class-component';

@Options({
  props: {
    msg: String
  }
})
export default class Home extends Vue {
  msg!: string
}
</script>


<template>

  <div class="info-container">

    <div class="text-container">
      <h3>Відстеження витрат та оплата</h3>
      <h1>КОМУНАЛЬНИХ ПОСЛУГ</h1>
      <p>Веб-застосунок Utilities Manager робить процес контролю <br> за витратами на комунальні послуги зручним, швидким та
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
    <div class="card">
      Картка 1
    </div>
    <div class="card">
      Картка 2
    </div>
    <div class="card">
      Картка 3
    </div>
  </div>

</template>

<style scoped lang="scss">
@import 'Home';
</style>