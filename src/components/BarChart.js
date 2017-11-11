import { Line, mixins } from 'vue-chartjs';

const options = {
  responsive: true,
  maintainAspectRatio: false,
  elements: {
    line: {
      tension: 0,
    },
  },
};

const BarChart = {
  extends: Line,
  mixins: [mixins.reactiveProp],
  mounted() {
    this.renderChart(this.chartData, options);
  },
};

export default BarChart;
