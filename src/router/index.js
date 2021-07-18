import { createRouter, createWebHistory } from 'vue-router'
import Accounts from '@/views/Accounts.vue'
import CreateBalance from '@/views/CreateBalance.vue'
import LoginView from '@/views/LoginView.vue'
import LogoutView from '@/views/LogoutView.vue'
import Transactions from '@/views/Transactions.vue'

const routes = [
    {
        path: '/',
        redirect: '/accounts',
        meta: {
            requiresAuth: true,
        },
    },
    {
        path: '/logout',
        component: LogoutView,
        meta: {
            requiresAuth: true,
        },
    },
    {
        path: '/login',
        component: LoginView,
        name: 'Login',
    },
    {
        path: '/create',
        component: CreateBalance,
        name: 'CreateBalance',
    },
    {
        path: '/transactions',
        name: 'Transactions',
        component: Transactions,
        meta: {
            requiresAuth: true,
        },
    },
    {
        path: '/accounts',
        name: 'Accounts',
        component: Accounts,
        meta: {
            requiresAuth: true,
        },
    },
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
});
export default router;
