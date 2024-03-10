<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import { ApiService } from '@/services/apiService';

@Options({
  props: {
    msg: String
  }
})
export default class Expenses extends Vue {
  expenses: any[] = [];

  async fetchExpenses() {
    try {
      this.expenses = await ApiService.getAllExpense();
    } catch (error) {
      console.error('Error fetching expenses:', error);
    }
  }

  clearExpenses() {
    this.expenses = [];
  }

}
</script>

<template>

  <select id="year">
    <option value="">Рік</option>
  </select>

  <select id="month">
    <option value="">Місяць</option>
  </select>




  <p>Expenses</p>
  <ul v-if="expenses.length">
    <li v-for="expense in expenses" :key="expense.id">
      Year: {{ expense.year }}, Month: {{ expense.month }}, Service: {{ expense.utility_name }}, Amount: {{ expense.amount }}
    </li>
  </ul>
  <button @click="fetchExpenses">Load Expenses</button>
  <button @click="clearExpenses">Clear Expenses</button>
</template>

<style scoped lang="scss">

select {
  font-size: 25px;
  background: rgba(0, 128, 0, 0.54);
  border: none;
  border-radius: 20px;
  padding: 5px 20px;

  

}

</style>