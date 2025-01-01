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
        component: Page.Home,
        name: 'home',
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
                path: ':pathMatch(.*)*',
                component: Page.NotFound,
                name: 'page-not-found',
                beforeEnter: ifAuthenticated,
            },
        ],
    },
]
