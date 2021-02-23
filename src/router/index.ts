import { createRouter,createWebHashHistory} from "vue-router";

const home = () => import('../pages/home.vue');
const about = () => import('../pages/about.vue');

const routes = [
    {
        path: '/', redirect: '/home',
    },
    {
        path: '/home', name: 'home', component: home
    },
    {
        path: '/about', name: 'about', component: about
    }
]

export const router = createRouter({
    history: createWebHashHistory(),
    routes
})