<script lang="ts">
import { Options, Vue } from 'vue-class-component';

@Options({
  props: {
    msg: String
  }
})
export default class Header extends Vue {
  msg!: string
}
</script>

<template>
  <header>

    <div class="header-text-container">
      <img src="@/assets/Logo64.png" alt="">
      <h4>Utilities<br>Manager</h4>

    </div>

    <div class="header-container">
      <img src="@/assets/User32.png" alt="">

    </div>

  </header>
</template>

<style scoped lang="scss">
@import 'Header';
</style>