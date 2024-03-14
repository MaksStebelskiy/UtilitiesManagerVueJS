<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import { ApiService } from '@/services/apiService';
import { useStore } from 'vuex';

@Options({
  components: {

  },
})

export default class RegisterView extends Vue {
  store = useStore();
  username: string = '';
  login: string = '';
  password: string = '';
  confirmPassword: string = '';
  usernameIsValid: boolean = false;
  loginIsValid: boolean = false;
  passwordIsValid: boolean = false;
  confirmPasswordIsValid: boolean = false;
  usernameIsInvalid: boolean = false;
  loginIsInvalid: boolean = false;
  passwordIsInvalid: boolean = false;
  confirmPasswordIsInvalid: boolean = false;
  isValidForm: boolean = false;

  validateInput(value: string): boolean {
    const forbiddenCharsRegex = /[$\[\]{}()*+?,\\^$|#\s~`!%&\-=><':;"\/]/g;
    return !forbiddenCharsRegex.test(value);
  }

  validateName() {
    this.usernameIsValid = this.validateInput(this.username);
    this.usernameIsInvalid = !this.usernameIsValid;
    this.updateFormValidity();
  }

  validateLogin() {
    this.loginIsValid = this.validateInput(this.login);
    this.loginIsInvalid = !this.loginIsValid;
    this.updateFormValidity();
  }

  validatePassword() {
    this.passwordIsValid = this.validateInput(this.password);
    this.passwordIsInvalid = !this.passwordIsValid;
    this.validateConfirmPassword();
    this.updateFormValidity();
  }

  validateConfirmPassword() {
    this.confirmPasswordIsValid = this.validateInput(this.confirmPassword) && this.password === this.confirmPassword;
    this.confirmPasswordIsInvalid = !this.confirmPasswordIsValid;
    this.updateFormValidity();
  }

  clearValidation() {
    if (!this.username.trim()) {
      this.usernameIsValid = false;
      this.usernameIsInvalid = false;
    }
    if (!this.login.trim()) {
      this.loginIsValid = false;
      this.loginIsInvalid = false;
    }
    if (!this.password) {
      this.passwordIsValid = false;
      this.passwordIsInvalid = false;
    }
    if (!this.confirmPassword) {
      this.confirmPasswordIsValid = false;
      this.confirmPasswordIsInvalid = false;
    }

    this.updateFormValidity();
  }

  updateFormValidity() {
    this.isValidForm = this.usernameIsValid && this.loginIsValid && this.passwordIsValid && this.confirmPasswordIsValid;
  }

  register() {
    if (this.isValidForm) {
      ApiService.postUsersRegister(this.username, this.login, this.password)
        .then(response => {
          console.log('User registered successfully', response);
          const user = { username: this.username, login: this.login };
          this.store.commit('login', user);
          this.$router.push('/');
        })
        .catch(error => {
          if (error.response && error.response.status === 409) {
            alert('Користувач з такими даними вже існує');
          }
        });
    }
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
      <h2>Реєстрація</h2>

      <input type="text" placeholder="Ім'я" v-model="username" @input="validateName" @change="clearValidation"
        :class="{ 'valid': usernameIsValid, 'invalid': usernameIsInvalid }">
      <input type="text" placeholder="Логін" v-model="login" @input="validateLogin" @change="clearValidation"
        :class="{ 'valid': loginIsValid, 'invalid': loginIsInvalid }">
      <input type="password" placeholder="Пароль" v-model="password" @input="validatePassword" @change="clearValidation"
        :class="{ 'valid': passwordIsValid, 'invalid': passwordIsInvalid }">
      <input type="password" placeholder="Повторіть пароль" v-model="confirmPassword" @input="validateConfirmPassword"
        @change="clearValidation" :class="{ 'valid': confirmPasswordIsValid, 'invalid': confirmPasswordIsInvalid }">

      <button @click="register" :disabled="!isValidForm">Зареєструватись</button>

      <a @click="$router.push('/login')" style="cursor: pointer;">Маєте акаунт? Вхід</a>

    </div>
  </div>

</template>

<style lang="scss">
@import 'Auth';
</style>
