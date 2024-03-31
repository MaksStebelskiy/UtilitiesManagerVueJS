<template>
  <p>Management</p>
  <Chart />
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import Chart from './Chart.component.vue'; 

@Options({
  components: {
    Chart 
  },
  props: {
    msg: String
  }
})
export default class Management extends Vue {
  
}
</script>
