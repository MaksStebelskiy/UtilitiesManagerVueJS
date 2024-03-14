<template>
    <p>Support</p>
  </template>
  
  
  <script lang="ts">
  import { Options, Vue } from 'vue-class-component';
  
  @Options({
    props: {
      msg: String
    }
  })
  export default class Support extends Vue {
    msg!: string
  }
  </script>