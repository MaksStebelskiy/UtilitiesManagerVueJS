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
    const username = (document.querySelector('input[type="text"]') as HTMLInputElement).value;
    const password = (document.querySelector('input[type="password"]') as HTMLInputElement).value;
    
    try {
      const users = await ApiService.getUsersAuth();
      const user = users.find((u: any) => u.username === username && u.password === password);
      
      if (user) {
        console.log('Username and password are correct');
        this.store.commit('login', user); 
        this.$router.push('/');
      } else {
        console.log('Incorrect username or password');
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
      <Button @click="login">Увійти</Button>
      <a @click="$router.push('/register')" style="cursor: pointer;">Немає акаунту? Зареєструйтесь</a>
    </div>
  </div>

</template>

<style lang="scss">
@import 'Auth';
</style>
