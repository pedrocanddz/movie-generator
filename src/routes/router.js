import {createRouter, createWebHashHistory} from 'vue-router';
import LandingPage from '../components/LandingPage.vue';
import FavoritesList from '../components/FavoritesList.vue';


const routes =[
    {path: '/', component: LandingPage},
    {path: '/favoritos', component: FavoritesList},
];

const router = createRouter({
    history: createWebHashHistory(),
    routes
});

export default router;