<script>

export default {
  name: 'App',
  components: {
  },
  render() {
    return null;
  }
};
</script>
<template>
  <router-view />
</template>

<style lang="scss">
@import './assets/fonts/fonts.scss';
@import './styles/mixins.scss';

Header,
Main,
Aside {
  @include shadow;
}

#app {
  font-family: "Montserrat", sans-serif;
  font-style: normal;
  text-align: center;
  color: #2c3e50;

  height: 100vh;
  padding: 40px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;

}
</style>
