<script lang="ts" setup>
import { AppFooterVue, AppHeaderVue } from '.'
</script>

<template>
    <a-layout>
        <a-layout-content>
            <AppHeaderVue />
            <div class="main">
                <router-view />
            </div>
            <AppFooterVue />
        </a-layout-content>
    </a-layout>
</template>

<style lang="scss" scoped>
.ant-layout {
    display: flex;
    .ant-menu {
        max-width: 200px;
    }

    .ant-layout-content {
        .main {
            min-height: calc(100vh - 184px);
            margin: 100px 0 0;
            padding: 20px 60px 60px;
            max-width: 100vw;
            background-color: var(--vt-c-white);
        }
    }
}
</style>
