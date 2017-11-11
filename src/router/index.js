import Vue from 'vue';
import Router from 'vue-router';
import MainPage from '@/components/MainPage';
import BarChart from '@/components/BarChart';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Main Page',
      component: MainPage,
    },
    {
      path: '/chart',
      name: 'BarChart',
      component: BarChart,
    },
  ],
});
