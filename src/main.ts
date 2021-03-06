import { createApp } from 'vue';
import App from './App.vue';
import { router } from './router';
// import './assets/flexible.js';
import './style/mixins.scss';
import './style/reset.css';

const app = createApp(App);
app.use(router);
app.mount('#app');
