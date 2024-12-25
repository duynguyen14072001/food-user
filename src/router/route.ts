import * as Page from '@/views'
import { getToken } from '@/helpers'

const ifAuthenticated = (to: any, from: any, next: any) => {
    if (getToken()) {
        next()
        return
    }
    next('/login')
}

const ifNotAuthenticated = (to: any, from: any, next: any) => {
    if (!getToken()) {
        next()
        return
    }
    next('/')
}

export const routes: any = [
    {
        path: '/',
        children: [
            {
                path: 'login',
                name: 'login',
                component: Page.Login,
                beforeEnter: ifNotAuthenticated,
            },
            {
                path: 'change-password',
                name: 'change-password',
                component: Page.ChangePassword,
                beforeEnter: ifAuthenticated,
            },
            {
                path: 'forgot-password',
                name: 'forgot-password',
                component: Page.ForgotPassword,
            },
            {
                path: 'reset-password',
                name: 'reset-password',
                component: Page.ResetPassword,
            },
            {
                path: 'products',
                children: [
                    {
                        path: '',
                        name: 'products-list',
                        component: Page.ProductsView,
                        beforeEnter: ifAuthenticated,
                    },
                ],
            },
            {
                path: 'users',
                children: [
                    {
                        path: '',
                        name: 'users-list',
                        component: Page.UsersView,
                        beforeEnter: ifAuthenticated,
                    },
                ],
            },
            {
                path: 'orders',
                children: [
                    {
                        path: '',
                        name: 'orders-list',
                        component: Page.OrdersView,
                        beforeEnter: ifAuthenticated,
                    },
                ],
            },
            {
                path: 'coupons',
                children: [
                    {
                        path: '',
                        name: 'coupons-list',
                        component: Page.CouponsView,
                        beforeEnter: ifAuthenticated,
                    },
                ],
            },
            {
                path: 'categories',
                children: [
                    {
                        path: '',
                        name: 'categories-list',
                        component: Page.CategoriesView,
                        beforeEnter: ifAuthenticated,
                    },
                ],
            },
            {
                path: ':pathMatch(.*)*',
                component: Page.NotFound,
                name: 'page-not-found',
                beforeEnter: ifAuthenticated,
            },
        ],
    },
]
