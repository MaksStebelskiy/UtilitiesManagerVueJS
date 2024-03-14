<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import { useStore } from 'vuex';

interface User {
  id: number;
  username: string;
}

@Options({
  props: {
    msg: String
  }
})
export default class Header extends Vue {
  msg!: string;
  user: User | null = null;

  mounted() {
    const store = useStore();
    this.user = store.state.user;
  }

  get currentUser(): User | null {
    return this.user;
  }

}
</script>

<template>
  <header>

    <div class="header-logo-container">
      <img src="@/assets/Logo64.png" alt="">
      <h5>Utilities<br>Manager</h5>

    </div>

    <div class="header-text-container">
      <h5>{{ currentUser ? currentUser.username : 'Anonymous' }}</h5>
      <img src="@/assets/User32.png" alt="">
    </div>

  </header>
</template>

<style scoped lang="scss">
@import 'Header';
</style>