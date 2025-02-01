<script setup lang="ts">
import LayoutVue from './components/common/LayoutVue.vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const routeNoLayout = ['login', 'signup']
</script>

<template>
    <a-config-provider :autoInsertSpaceInButton="false">
        <LayoutVue v-if="!routeNoLayout.includes(route.name as string)" />
        <template v-else>
            <router-view />
        </template>
    </a-config-provider>
</template>

<style lang="scss" scoped></style>
