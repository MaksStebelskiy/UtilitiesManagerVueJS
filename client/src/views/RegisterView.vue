<script lang="ts">
import { Options, Vue } from 'vue-class-component';


@Options({
  components: {

  },
})
export default class RegisterView extends Vue { }
</script>

<template>

  <div class="page-container">
    <div class="logo-container">
      <img src="@/assets/MyLogo.png" alt="">
      <h1>Utilities Manager</h1>
    </div>

    <div class="form-container">
      <h2>Реєстрація</h2>
      <input type="text" placeholder="Ім'я">
      <input type="text" placeholder="Логін">
      <input type="text" placeholder="Пароль">
      <input type="password" placeholder="Повторіть пароль">
      <Button>Зареєструватись</Button>
      <a @click="$router.push('/login')" style="cursor: pointer;">Маєте акаунт? Вхід</a>

    </div>
  </div>

</template>

<style lang="scss">
@import 'Auth';
</style>
