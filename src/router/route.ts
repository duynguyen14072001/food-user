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
                path: '',
                name: 'home',
                component: Page.Home,
            },
            {
                path: 'product',
                children: [
                    {
                        path: '',
                        name: 'product-list',
                        component: Page.ProductList,
                    },
                    {
                        path: ':slug',
                        name: 'product-detail',
                        component: Page.ProductDetail,
                    },
                ],
            },
            {
                path: 'cart',
                children: [
                    {
                        path: '',
                        name: 'cart-list',
                        component: Page.CartList,
                        beforeEnter: ifAuthenticated,
                    },
                ],
            },
            {
                path: 'login',
                name: 'login',
                component: Page.Login,
                beforeEnter: ifNotAuthenticated,
            },
            {
                path: 'signup',
                name: 'signup',
                component: Page.Signup,
                beforeEnter: ifNotAuthenticated,
            },
            {
                path: 'change-password',
                name: 'change-password',
                component: Page.ChangePassword,
                beforeEnter: ifAuthenticated,
            },
            {
                path: 'profile',
                name: 'profile',
                component: Page.ProfileView,
                beforeEnter: ifAuthenticated,
            },
            {
                path: 'orders',
                children: [
                    {
                        name: 'orders',
                        path: '',
                        component: Page.OrderView,
                        beforeEnter: ifAuthenticated,
                    },
                    {
                        path: 'vn-pay-return',
                        name: 'vn-pay-return',
                        component: Page.VNPayReturnView,
                        beforeEnter: ifAuthenticated,
                    },
                    {
                        path: 'order-success/:id',
                        name: 'order-success',
                        component: Page.OrderSuccess,
                        beforeEnter: ifAuthenticated,
                    },
                ],
            },
            {
                path: 'forgot-password',
                name: 'forgot-password',
                component: Page.ForgotPassword,
                beforeEnter: ifNotAuthenticated,
            },
            {
                path: 'reset-password',
                name: 'reset-password',
                component: Page.ResetPassword,
                beforeEnter: ifNotAuthenticated,
            },
            {
                path: ':pathMatch(.*)*',
                component: Page.NotFound,
                name: 'page-not-found',
            },
        ],
    },
]
