<template>
  <div v-if="dataLoaded" class="example">
    <apexcharts width="500" height="350" type="bar" :options="chartOptions" :series="series"></apexcharts>
    <apexcharts width="500" height="350" type="line" :options="chartOptions" :series="series"></apexcharts>
  </div>
 
</template>

<script>
import VueApexCharts from 'vue3-apexcharts';
import { ApiService } from '@/services/apiService';

export default {
  name: 'Chart',
  components: {
    apexcharts: VueApexCharts,
  },
  data: function () {
    return {
      chartOptions: {
        chart: {
          id: 'basic-bar',
        },
        xaxis: {
          type: 'category',
          categories: [],
        },
        colors: ['#00800080'],

      },
      series: [{
        name: 'Витрати за рік',
        data: []
      }],
      dataLoaded: false, 
    }
  },



  async created() {
    try {
      const expenses = await ApiService.getAllExpense();

      this.uniqueYears = [...new Set(expenses.map(expense => expense.year))];

      const dataByYear = this.uniqueYears.reduce((acc, year) => {
        const totalAmount = expenses
          .filter(expense => expense.year === year)
          .reduce((total, expense) => total + expense.amount, 0);
        acc[year] = totalAmount;
        return acc;
      }, {});

      
      this.chartOptions.xaxis.categories = this.uniqueYears.map(year => year.toString()).reverse();
      this.series = [{
        name: 'Витрати за рік',
        data: Object.values(dataByYear)
      }];

      this.dataLoaded = true;

    } catch (error) {
      console.error('Error fetching expenses:', error);
    }
  }
}
</script>