<template>
    <p>Payments</p>
  </template>
  
  
  <script lang="ts">
  import { Options, Vue } from 'vue-class-component';
  
  @Options({
    props: {
      msg: String
    }
  })
  export default class Payments extends Vue {
    msg!: string
  }
  </script>