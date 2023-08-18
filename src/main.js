import { createApp } from 'vue';
import App from './App.vue';
import router from './routes/router'; // Import your router configuration

createApp(App).use(router).mount('#app');
