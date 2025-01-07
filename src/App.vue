<script setup lang="ts">
import LayoutVue from './components/common/LayoutVue.vue'
import { useRoute } from 'vue-router'

const route = useRoute()
</script>

<template>
    <a-config-provider :autoInsertSpaceInButton="false">
        <LayoutVue v-if="route.name !== 'login'">
            <router-view />
        </LayoutVue>
        <template v-else>
            <router-view />
        </template>
    </a-config-provider>
</template>

<style lang="scss" scoped></style>
