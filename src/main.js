// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import BarChart from './components/BarChart';
import ProjectName from './components/ProjectName';

Vue.config.productionTip = false;
Vue.component('bar-chart', BarChart);
Vue.component('project-name', ProjectName);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App },
});
