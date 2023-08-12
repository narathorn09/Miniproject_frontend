import { createApp } from 'vue';
import App from './App.vue'; // Your root component
import routes from './routes'; // A file containing your route configurations
import { createRouter, createWebHistory } from 'vue-router';
import Antd from "ant-design-vue";
import "./main.css";


// Create a new VueRouter instance
const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Create a new Vue app instance
const app = createApp(App);

// Use Vue Router as a plugin
app.use(router);
// app.use(Antd);
// Mount the app
app.use(Antd).mount("#app");
