export const STATUS: Record<number, string> = {
    1: 'Đang chờ',
    2: 'Đang giao',
    3: 'Giao hàng thành công',
    4: 'Giao hàng thất bại',
}

export const STATUS_PAYMENT: Record<number, string> = {
    1: 'Đã thanh toán',
    2: 'Chưa thanh toán',
    3: 'Thanh toán thất bại',
}

export const STATUS_METHOD: Record<number, string> = {
    1: 'Thanh toán khi giao hàng',
    2: 'Thanh toán online',
}

export const PER_PAGE_ORDER = 10
