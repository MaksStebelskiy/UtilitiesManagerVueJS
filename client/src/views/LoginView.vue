<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import { ApiService } from '@/services/apiService';
import { useStore } from 'vuex';

@Options({
  components: {

  },
})
export default class LoginView extends Vue {
  store = useStore();

  async login() {
    const login = (document.querySelector('input[type="text"]') as HTMLInputElement).value;
    const password = (document.querySelector('input[type="password"]') as HTMLInputElement).value;
    
    try {
      const users = await ApiService.getUsersAuth();
      const user = users.find((u: any) => u.login === login && u.password === password);
      
      if (user) {
        console.log('Login and password are correct');
        this.store.commit('login', user); 
        this.$router.push('/');
      } else {
        console.log('Incorrect login or password');
        alert('Неправильний логін або пароль');
      }
    } catch (error) {
      console.error('Error logging in:', error);
      alert('Помилка під час входу');
    }
  }

  mounted() {
    console.log('Authenticated:', this.store.state.isAuthenticated);
  }
}

</script>

<template>

  <div class="page-container">
    <div class="logo-container">
      <img src="@/assets/MyLogo.png" alt="">
      <h1>Utilities Manager</h1>
    </div>

    <div class="form-container">
      <h2>Вхід</h2>
      <input type="text" placeholder="Логін">
      <input type="password" placeholder="Пароль">
      <button @click="login">Увійти</button>
      <a @click="$router.push('/register')" style="cursor: pointer;">Немає акаунту? Зареєструйтесь</a>
    </div>
  </div>

</template>

<style lang="scss">
@import 'Auth';
</style>
