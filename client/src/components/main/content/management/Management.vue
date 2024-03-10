<template>
    <p>Management</p>
  </template>
  
  
  <script lang="ts">
  import { Options, Vue } from 'vue-class-component';
  
  @Options({
    props: {
      msg: String
    }
  })
  export default class Management extends Vue {
    msg!: string
  }
  </script>