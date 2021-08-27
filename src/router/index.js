import { createRouter, createWebHistory } from 'vue-router'
import Reports from '@/views/Reports.vue'
import LoadBalance from '@/views/LoadBalance.vue'
import LoginView from '@/views/LoginView.vue'
import LogoutView from '@/views/LogoutView.vue'
import Transactions from '@/views/Transactions.vue'

const routes = [
    {
        path: '/',
        redirect: '/reports',
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
        path: '/load',
        component: LoadBalance,
        name: 'LoadBalance',
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
        path: '/reports/:report_type?',
        name: 'Reports',
        component: Reports,
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
