<script setup lang="ts">
import { ref, watch } from 'vue'
import { getToken } from './helpers'
import LayoutVue from './components/common/LayoutVue.vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const isLogin = ref(!!getToken())
watch(
    () => route.fullPath,
    () => (isLogin.value = !!getToken())
)
</script>

<template>
    <a-config-provider :autoInsertSpaceInButton="false">
        <LayoutVue v-if="isLogin">
            <router-view />
        </LayoutVue>
        <template v-else>
            <router-view />
        </template>
    </a-config-provider>
</template>

<style lang="scss" scoped></style>
