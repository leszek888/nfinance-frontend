import { createRouter, createWebHistory } from 'vue-router'
import Accounts from '@/views/Accounts.vue'
import LoginView from '@/views/LoginView.vue'
import LogoutView from '@/views/LogoutView.vue'
import Transactions from '@/views/Transactions.vue'

const routes = [
    {
        path: '/',
        redirect: '/transactions',
    },
    {
        path: '/logout',
        component: LogoutView,
    },
    {
        path: '/login',
        component: LoginView,
    },
    {
        path: '/transactions',
        name: 'Transactions',
        component: Transactions,
    },
    {
        path: '/accounts',
        name: 'Accounts',
        component: Accounts,
    },
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL), routes
});

export default router;
