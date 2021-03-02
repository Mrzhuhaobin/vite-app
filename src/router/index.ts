import { createRouter,createWebHashHistory} from "vue-router";

const home = () => import('../pages/home.vue');
const about = () => import('../pages/about.vue');
const list = () => import('../pages/list/index.vue');
const profile = () => import('../pages/list/components/profile.vue')

const routes = [
    {
        path: '/', redirect: '/home',
    },
    {
        path: '/home', name: 'home', component: home
    },
    {
        path: '/about', name: 'about', component: about
    },
    {
        path: '/list', name: 'list', component: list, children: [
            {
                path: 'profile', component: profile, name: 'profile'
            }
        ]
    }
]

export const router = createRouter({
    history: createWebHashHistory(),
    routes
})