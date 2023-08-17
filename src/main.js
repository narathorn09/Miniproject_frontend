import { createApp } from 'vue';
import App from './App.vue';
import routes from './routes';
import { createRouter, createWebHistory } from 'vue-router'; 
import Antd from "ant-design-vue";
import "./main.css";

const app = createApp(App);

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  document.title = to.meta.title;
  next();
});

app.use(Antd);
app.use(router);
app.mount('#app');
