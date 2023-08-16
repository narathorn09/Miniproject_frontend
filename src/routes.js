import HomePage from './pages/Home.vue';

const routes = [
  { path: '/', component: HomePage, meta: { title: 'Home - BoardGame' } },
  { path: '/adminmenu', component: null, meta: { title: 'Admin Menu - BoardGame' } },
];

export default routes;
