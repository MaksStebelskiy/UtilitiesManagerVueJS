<template>
    <p>Settings</p>
  </template>
  
  
  <script lang="ts">
  import { Options, Vue } from 'vue-class-component';
  
  @Options({
    props: {
      msg: String
    }
  })
  export default class Settings extends Vue {
    msg!: string
  }
  </script>