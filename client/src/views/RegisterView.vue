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
  name: string = '';
  login: string = '';
  password: string = '';
  confirmPassword: string = '';
  nameIsValid: boolean = false;
  loginIsValid: boolean = false;
  passwordIsValid: boolean = false;
  confirmPasswordIsValid: boolean = false;
  nameIsInvalid: boolean = false;
  loginIsInvalid: boolean = false;
  passwordIsInvalid: boolean = false;
  confirmPasswordIsInvalid: boolean = false;
  isValidForm: boolean = false;

  validateInput(value: string): boolean {
    const forbiddenCharsRegex = /[$\[\]{}()*+?,\\^$|#\s~`!%&\-=><':;"\/]/g;
    return !forbiddenCharsRegex.test(value);
  }

  validateName() {
    this.nameIsValid = this.validateInput(this.name);
    this.nameIsInvalid = !this.nameIsValid;
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
    this.validateConfirmPassword(); // Додаткова перевірка паролів при зміні пароля
    this.updateFormValidity();
  }

  validateConfirmPassword() {
    this.confirmPasswordIsValid = this.validateInput(this.confirmPassword) && this.password === this.confirmPassword;
    this.confirmPasswordIsInvalid = !this.confirmPasswordIsValid;
    this.updateFormValidity();
  }

  clearValidation() {
    if (!this.name.trim()) {
      this.nameIsValid = false;
      this.nameIsInvalid = false;
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
    this.isValidForm = this.nameIsValid && this.loginIsValid && this.passwordIsValid && this.confirmPasswordIsValid;
  }

  register() {
    if (this.isValidForm) {
      ApiService.postUsersRegister(this.name, this.login, this.password)
        .then(response => {
          // Обробка успішної відповіді від сервера
          console.log('User registered successfully', response);
          const user = { username: this.name, login: this.login };
          this.store.commit('login', user); // Передача користувача до Store
          this.$router.push('/');
        })
        .catch(error => {
          // Обробка помилки від сервера
          console.error('Error registering user:', error);
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

      <input type="text" placeholder="Ім'я" v-model="name" @input="validateName" @change="clearValidation"
        :class="{ 'valid': nameIsValid, 'invalid': nameIsInvalid }">
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
