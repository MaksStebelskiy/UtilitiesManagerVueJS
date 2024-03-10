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

#app {
  font-family: "Montserrat", sans-serif;
  font-optical-sizing: auto;
  font-weight: 500;
  font-style: normal;

  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  
  text-align: center;
  color: #2c3e50;
  padding: 40px;
  height: 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;

}
</style>
