<script setup lang="ts">
import type { MenuProps, ItemType } from 'ant-design-vue'
import { useRoute, useRouter } from 'vue-router'
import { reactive, ref, VueElement, onMounted, watchEffect } from 'vue'
import { SIDE_MENU_ADMIN } from '@/helpers'
import { useAuthStore } from '@/stores'

const authStore = useAuthStore()
const router = useRouter()
const route = useRoute()
const selectedKeys = ref<string[]>([])
const items: ItemType[] = reactive([])
const sidebar = ref()

const handleRoute = async () => {
    for (const key in sidebar.value) {
        const item = sidebar.value[key]
        items.push(getItem(item.label, String(item.order)))
        if (route.name === item.name) selectedKeys.value.push(String(item.order))
    }
}

const getItem = (
    label: VueElement | string,
    key: string,
    icon?: any,
    children?: ItemType[],
    type?: 'group'
): ItemType => {
    return {
        key,
        icon,
        children,
        label,
        type,
    } as ItemType
}

const handleClick: MenuProps['onClick'] = (e) => {
    const side: any = Object.values(sidebar.value).find((item: any) => String(item.order) === e.key)
    if (side) router.push(side.route)
    if (side.route === route.fullPath) {
        selectedKeys.value.splice(0, 1, String(side?.order))
    }
}

const getSidebar = async () => {
    sidebar.value = SIDE_MENU_ADMIN
}

const logout = async () => {
    const data = await authStore.logout()
    if (data) router.push({ name: 'login', replace: true })
}

onMounted(async () => {
    await router.isReady()
    await getSidebar()
    await handleRoute()
})

watchEffect(() => {
    if (sidebar.value) {
        for (const key in sidebar.value) {
            const item = sidebar.value[key]
            const getFirstNameRoute = String(route.name).replace(/(create|update|-|list|\/)/g, '')
            if (getFirstNameRoute === item.name || route.name === item.name) {
                selectedKeys.value = [String(item.order)]
            }
        }
    }
})
</script>

<template>
    <a-menu
        id="sidebar"
        mode="inline"
        :items="items"
        :selectedKeys="selectedKeys"
        @click="handleClick"
    />
</template>
