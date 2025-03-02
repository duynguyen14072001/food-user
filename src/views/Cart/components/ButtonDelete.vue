<script lang="ts" setup>
import { useCartStore } from '@/stores'
import { useI18n } from 'vue3-i18n'

const props = defineProps(['id'])
const { t } = useI18n()
const cartStore = useCartStore()

const handleRemove = async () => await cartStore.remove([props.id])
</script>

<template>
    <span @click="handleRemove" class="btn">{{ t('button.remove') }}</span>
</template>

<style lang="scss" scoped>
.btn {
    cursor: pointer;

    &:hover {
        color: var(--vt-c-main);
    }
}
</style>
