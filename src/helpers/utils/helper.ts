import dayjs from 'dayjs'
import { ALL_OPTION } from '..'

export const formatDay = (day: any, format = 'YYYY-MM-DD') => {
    if (!day) return ''
    return dayjs(new Date(day)).format(format)
}

export const formatDate = (day: any, format = 'YYYY-MM-DD') => {
    if (!day) return ''
    return dayjs(day).format(format)
}

export const formatDateTime = (day: any, format = 'YYYY-MM-DD HH:mm') => {
    if (!day) return ''
    return dayjs(day).format(format)
}

export const formatDayJS = (day: any, format = 'YYYY-MM-DD') => {
    if (!day) return ''
    return dayjs(day, format)
}

export const emptyObj = (object: Object) => {
    return !Object.keys(object).length
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
