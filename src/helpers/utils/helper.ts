import dayjs from 'dayjs'
import { ALL_OPTION, DAY_LIST, PAGE_FIRST } from '..'
import { formatter } from './helperUI'
import type { ParamsList } from '@/interface'

export const formatDay = (day: any, format = 'YYYY-MM-DD') => {
    if (!day) return ''
    return dayjs(new Date(day)).format(format)
}

export const formatDayJS = (day: any, format = 'YYYY-MM-DD') => {
    if (!day) return ''
    return dayjs(day, format)
}

export const formatDateJP = (date: Date | string) => {
    const day = dayjs(date).format('D')
    const month = dayjs(date).format('M')
    const dayOfWeek = formatDay(date, 'd')
    return month + '月' + day + '日' + ` (${DAY_LIST[parseInt(dayOfWeek) + 1]})`
}

export const formatMoney = (value: string) => {
    if (!value) return '0'
    return formatter(value) + '円'
}

export const emptyObj = (object: Object) => {
    return !Object.keys(object).length
}

export const findData = (arr: any, id: any) => {
    if (arr.length) return arr.find((item: any) => item.id == id)
    return []
}

export const findIndex = (arr: any, index: number): number => {
    return arr.findIndex((item: any) => item.index === index)
}

export const getOptions = (array: any[] | undefined, name = 'name') => {
    return array?.map((item) => ({ label: item[name], value: item.id }))
}

export const getObjOptions = (obj: Record<number, string>, hasAll = true, end = true) => {
    const options = Object.entries(obj).map(([value, label]) => ({
        label,
        value: +value,
    }))

    if (hasAll && end) return [...options, ALL_OPTION]
    if (hasAll) return [ALL_OPTION, ...options]

    return options
}

export const mapKeyToData = (value: any) => {
    return Object.entries(value).map(([k, v]) => {
        return Object.fromEntries([
            ['key', k],
            ['data', Array.isArray(v) ? JSON.stringify((v as Array<string>).map((i) => +i)) : v],
        ])
    })
}

export const getFirstErrorMessage = (errors: Record<string, any>) => {
    return Object.values(errors).flat().shift() as string
}

export const partition = (arr: any[], fn: any) =>
    arr.reduce(
        (acc, val, i, arr) => {
            acc[fn(val, i, arr) ? 0 : 1].push(val)
            return acc
        },
        [[], []]
    )

export const convertToSlug = (str: string) => {
    return str
        .toLowerCase()
        .trim()
        .replace(/\s\s+/g, ' ')
        .replace(/ /g, '-')
        .replace(/[^\w-]+/g, '')
}

export const formatBytes = (bytes: number = 0, decimals = 2, indexUnit = 2) => {
    const units = ['B', 'KB', 'MB', 'GB', 'TB', 'PB']

    let i = 0
    for (i; i < indexUnit; i++) {
        bytes /= 1024
    }

    return parseFloat(bytes.toFixed(decimals)) + ' ' + units[i]
}

export const mapSortQuery = (query: ParamsList, key: string, dir?: string) => ({
    ...query.value,
    page: PAGE_FIRST,
    orders: [{ key, dir: dir ? `${dir}ing` : 'descending' }],
})
