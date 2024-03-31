<template>
  <div class="data-container">
    <div class="title-text">
      <h4>Оберіть адресу</h4>
      <el-select v-model="value.selectedAddress" placeholder="Оберіть адресу" size="large" style="width: 280px" @change="updateYearOptions">
        <el-option v-for="option in addressOptions" :key="option.value" :label="option.label" :value="option.value" />
      </el-select>

      <h4>Оберіть рік</h4>
      <el-select v-model="value.selectedYear" placeholder="Оберіть рік" size="large" style="width: 280px"
        :disabled="!value.selectedAddress" @change="updateFilteredExpenses">
        <el-option v-for="option in yearOptions" :key="option.value" :label="option.label" :value="option.value" />
      </el-select>
    </div>
    
    <div  class="expense-cards">
      <div class="expense-card" v-for="(expenses, key) in filteredExpenses" :key="key">
        <div class="card-header">
          <h3>{{ key }}</h3>
        </div>
        <div class="card-body">
          <div class="expense-item" v-for="(expense, index) in expenses.amounts" :key="index">
            <p class="utility-name">{{ expenses.utility_names[index] }}</p>
            <p class="amount">{{ expense }}</p>
          </div>
          <p class="total-amount">Загальна сума: {{ expenses.total_amount }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import { ElSelect, ElOption } from 'element-plus';
import { ApiService } from '@/services/apiService';
import { reactive } from 'vue';

interface Expense {
  city: string;
  street: string;
  house_number: string;
  apartment_number: string;
  month: string;
  year: number;
  utility_names: string;
  amounts: string;
  total_amount: number;
}

@Options({
  components: {
    ElSelect,
    ElOption,
  },
})

export default class Payments extends Vue {
  originalExpenses: Expense[] = [];
  yearOptions: { value: number; label: string }[] = [];
  addressOptions: { value: string; label: string }[] = [];
  filteredExpenses: Record<string, any> = {};
  value = reactive({
    selectedAddress: null as string | null,
    selectedYear: null as number | null,
  });

  async created() {
    try {
      this.originalExpenses = await ApiService.getAllExpense();
      this.addressOptions = this.getUniqueAddresses();

      console.log('Original expenses:', this.originalExpenses);
      console.log('Address options:', this.addressOptions);

    } catch (error) {
      console.error('Error fetching expenses:', error);
    }
  }

  getUniqueAddresses(): { value: string; label: string }[] {
    const uniqueAddresses: { value: string; label: string }[] = [];
    const addressSet = new Set<string>();
    this.originalExpenses.forEach(expense => {
      const address = `${expense.city}, ${expense.street}, ${expense.house_number}, ${expense.apartment_number}`;
      if (!addressSet.has(address)) {
        uniqueAddresses.push({ value: address, label: address });
        addressSet.add(address);
      }
    });
    return uniqueAddresses;
  }

  async updateYearOptions() {
    if (!this.value.selectedAddress) return;
    this.yearOptions = this.getUniqueYears(this.value.selectedAddress);
    console.log('Year options:', this.yearOptions);
  }

  getUniqueYears(address: string): { value: number; label: string }[] {
    const uniqueYears: number[] = Array.from(new Set(this.originalExpenses
      .filter(expense => {
        const fullAddress = `${expense.city}, ${expense.street}, ${expense.house_number}, ${expense.apartment_number}`;
        return fullAddress === address;
      })
      .map(expense => expense.year)));
    return uniqueYears.map(year => ({ value: year, label: year.toString() }));
  }

  async updateFilteredExpenses() {
    if (!this.value.selectedAddress || !this.value.selectedYear) return;

    const { selectedAddress, selectedYear } = this.value;
    this.filteredExpenses = {};

    const expenses = this.originalExpenses.filter(expense => {
      const fullAddress = `${expense.city}, ${expense.street}, ${expense.house_number}, ${expense.apartment_number}`;
      return fullAddress === selectedAddress && expense.year === selectedYear;
    });

    expenses.forEach(expense => {
      const key = `${expense.month} ${expense.year}`;
      if (!this.filteredExpenses[key]) {
        this.filteredExpenses[key] = {
          utility_names: expense.utility_names.split(','),
          amounts: expense.amounts.split(',').map(amount => parseFloat(amount)),
          total_amount: expense.total_amount
        };
      }
      console.log('Filtered expenses:', this.filteredExpenses);
    });
  }
}
</script>

<style scoped lang="scss">
@import '../../../../styles/mixins.scss';
@import 'Payments';
</style>
