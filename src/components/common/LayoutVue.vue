<script lang="ts" setup>
import { AppFooterVue, AppHeaderVue } from '.'
</script>

<template>
    <a-layout>
        <a-layout-content>
            <AppHeaderVue />
            <div class="main"><router-view /></div>
            <AppFooterVue />
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

    .ant-layout-content {
        .main {
            min-height: calc(100vh - 184px);
            margin: 130px 0 30px;
        }
    }
}
</style>
