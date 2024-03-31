<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import { ElPagination, ElDatePicker, ElSelect, ElOption } from 'element-plus';
import { ApiService } from '@/services/apiService';
import { Store } from 'vuex';
import { mapState } from 'vuex';
import { reactive } from 'vue';

const monthsOrder = ['Січень', 'Лютий', 'Березень', 'Квітень', 'Травень', 'Червень', 'Липень', 'Серпень', 'Вересень', 'Жовтень', 'Листопад', 'Грудень'];

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
    ElPagination,
    ElSelect,
    ElOption,
  },
  computed: {
    ...mapState(['currentPaginationPage'])
  }
})
export default class Expenses extends Vue {
  $store!: Store<any>;
  currentPaginationPage!: number;

  originalExpenses: Expense[] = [];
  yearOptions: { value: number; label: string }[] = [];
  addressOptions: { value: string; label: string }[] = [];
  filteredExpenses: Record<string, any> = {};
  value = reactive({
    selectedAddress: null as string | null,
    selectedYear: null as number | null,
  });

  
  handleCurrentChange(page: number) {
    this.$store.commit('setCurrentPaginationPage', page);
  }

  async created() {
    try {
      this.originalExpenses = await ApiService.getAllExpense();
      this.addressOptions = this.getUniqueAddresses();
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
    this.value.selectedYear = null; 
    this.filteredExpenses = {};

    if (!this.value.selectedAddress) return;
    this.yearOptions = this.getUniqueYears(this.value.selectedAddress);
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

    // Сортування витрат за місяцями
    expenses.sort((a, b) => {
      const monthA = monthsOrder.indexOf(a.month);
      const monthB = monthsOrder.indexOf(b.month);
      if (monthA < monthB) return -1;
      if (monthA > monthB) return 1;
      return 0;
    });

    // Групування витрат за місяцями
    expenses.forEach(expense => {
      const key = `${expense.month} ${expense.year}`;
      if (!this.filteredExpenses[key]) {
        this.filteredExpenses[key] = {
          utility_names: expense.utility_names.split(','),
          amounts: expense.amounts.split(',').map(amount => parseFloat(amount)),
          total_amount: expense.total_amount
        };
      }
      
    });
  }

}
</script>

<template>
  <div class="data-container">
    <h4 v-if="currentPaginationPage === 1">Перегляд витрат за адресою</h4>
    <div v-if="currentPaginationPage === 1" class="title-text">
      <h4>Оберіть адресу:</h4>
      <el-select v-model="value.selectedAddress" placeholder="Оберіть адресу" size="large" style="width: 280px"
        @change="updateYearOptions">
        <el-option v-for="option in addressOptions" :key="option.value" :label="option.label" :value="option.value" />
      </el-select>

      <h4>Оберіть рік:</h4>
      <el-select v-model="value.selectedYear" placeholder="Оберіть рік" size="large" style="width: 280px"
        :disabled="!value.selectedAddress" @change="updateFilteredExpenses">
        <el-option v-for="option in yearOptions" :key="option.value" :label="option.label" :value="option.value" />
      </el-select>
    </div>

    <div v-if="currentPaginationPage === 1" class="expense-cards">
      <div class="expense-card" v-for="(expenses, key) in filteredExpenses" :key="key">
        <div class="card-header">
          <h3>{{ key }}</h3>
        </div>
        <div class="card-body">
          <div class="expense-item" v-for="(expense, index) in expenses.amounts" :key="index">
            <p class="utility-name">{{ expenses.utility_names[index] }}</p>
            <p class="amount">{{ expense }}</p>
          </div>
        </div>
        <div class="card-footer">
            <h3 class="total-amount">Сума: {{ expenses.total_amount }}</h3>
          </div>
      </div>
    </div>

    <h4 v-if="currentPaginationPage === 2">Content for page 2</h4>
    <h4 v-if="currentPaginationPage === 3">Content for page 3</h4>
  </div>
  <div class="pagination-container">
    <el-pagination background layout="prev, pager, next" :total="30" @current-change="handleCurrentChange"
      :current-page.sync="currentPaginationPage" />
  </div>
</template>

<style scoped lang="scss">
@import '../../../../styles/mixins.scss';
@import 'Expenses';
</style>