import i18n from '@/lang'

const { t } = i18n

export const SIDE_MENU_ADMIN = {
    products: {
        order: 1,
        label: t('sidebar.products'),
        route: '/products',
        name: 'products',
        class: '',
        menu_childs: [],
    },
    categories: {
        order: 2,
        label: t('sidebar.categories'),
        route: '/categories',
        name: 'categories',
        class: '',
        menu_childs: [],
    },
    orders: {
        order: 3,
        label: t('sidebar.orders'),
        route: '/orders',
        name: 'orders',
        class: '',
        menu_childs: [],
    },
    coupons: {
        order: 4,
        label: t('sidebar.coupons'),
        route: '/coupons',
        name: 'coupons',
        class: '',
        menu_childs: [],
    },
    users: {
        order: 5,
        label: t('sidebar.users'),
        route: '/users',
        name: 'users',
        class: '',
        menu_childs: [],
    },
}
