import Vue from 'vue';
import Router from 'vue-router';
import MainPage from '@/components/MainPage';
import CommitChart from '@/components/CommitChart';

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
      name: 'Commit Chart',
      component: CommitChart,
    },
  ],
});
