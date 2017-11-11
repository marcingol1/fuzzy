import { Line, mixins } from 'vue-chartjs';

const BarChart = {
  extends: Line,
  mixins: [mixins.reactiveProp],
  props: ['options'],
  mounted() {
    this.renderChart(this.chartData, this.options);
  },
};

export default BarChart;
