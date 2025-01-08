import dayjs from 'dayjs'
import type { PaginateParams, ParamsList } from '@/interface'

export const PAGE_FIRST = 1
export const PER_PAGE = 4
export const MAX_STRING = 255
export const MIN_STRING = 8
export const MIN_NUMBER = 1
export const MAX_SIZE_CSV = 10485760
export const START_YEAR = 1920
export const AGES = 18
export const MAX_SIZE_IMAGE = 10 //MB
export const MAX_SIZE_IMAGE_BYTE = 10485760 //KB
export const IMAGE_EXTENSIONS = ['jpeg', 'png', 'jpg']
export const HASH = Math.floor(Math.random() * 90000) + 10000

export const UNIT_VIEW = 10000
export const UNIT_DOZENS = 10

export const GENDERS = [
    { key: '1', label: '男性' },
    { key: '2', label: '女性' },
    { key: '0', label: '選択なし' },
]

export const CURRENT_DAY = dayjs(new Date()).format('DD')
export const CURRENT_MONTH = dayjs(new Date()).format('MM')
export const CURRENT_YEAR = dayjs(new Date()).format('YYYY')
export const MONTHS = Array.from({ length: 12 }, (item, i) => {
    return dayjs(new Date(0, i)).format('MM')
})

export const FORMAT_DAY = (day: any, format = 'YYYY-MM-DD') => {
    return dayjs(new Date(day)).format(format)
}

export const DAY_LIST: {
    [key: number]: string
} = {
    1: '日',
    2: '月',
    3: '火',
    4: '水',
    5: '木',
    6: '金',
    7: '土',
}

export const INITIAL_PAGINATE: PaginateParams = {
    page: PAGE_FIRST,
    lastPage: 0,
    perPage: PER_PAGE,
    data: [],
    total: 0,
}

export const INITIAL_QUERY: ParamsList = {
    page: PAGE_FIRST,
    search: '',
    per_page: PER_PAGE,
    orders: [{ key: 'id', dir: 'desc' }],
    filters: [],
}

export const PAYLOAD_ALL: ParamsList = {
    all: 1,
}

export const ALL_OPTION = {
    label: '全て',
    value: 'all',
}
