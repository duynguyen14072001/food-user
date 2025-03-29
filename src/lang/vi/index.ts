import auth from './auth'
import base from './base'
import validation from './validation'
import products from './products'
import header from './header'
import footer from './footer'
import home from './home'
import cart from './cart'
import profile from './profile'
import order from './order'
import vnpay_return from './vnpay_return'

export const vi = {
    ...base,
    auth,
    validation,
    products,
    header,
    footer,
    home,
    cart,
    profile,
    order,
    vnpay_return,
}
