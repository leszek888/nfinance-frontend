import { createRouter, createWebHistory } from 'vue-router'
import Transactions from '../views/Transactions.vue'

const routes = [
    {
        path: '/',
        redirect: '/transactions',
    },
    {
        path: '/transactions',
        name: 'Transactions',
        component: Transactions,
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL), routes
});

export default router;
