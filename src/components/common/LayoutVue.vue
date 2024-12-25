<script lang="ts" setup>
import { AppHeaderVue, AppSidebarVue } from '.'
</script>

<template>
    <a-layout>
        <AppSidebarVue />
        <a-layout-content>
            <AppHeaderVue />
            <router-view />
        </a-layout-content>
    </a-layout>
</template>

<style lang="scss" scoped>
.ant-layout {
    display: flex;
    flex-direction: row;
    .ant-menu {
        max-width: 200px;
    }
}
</style>
