<script lang="ts" setup>
import { notify, STATUS_CODE_SUCCESS } from '@/helpers'
import { useCartStore } from '@/stores'
import { ref } from 'vue'
import { useI18n } from 'vue3-i18n'

const props = defineProps(['id'])
const { t } = useI18n()
const cartStore = useCartStore()
const open = ref()

const onDelete = async () => {
    const { status_code } = await cartStore.remove([props.id])
    if (status_code === STATUS_CODE_SUCCESS) {
        return notify(t('delete_success'), '', 'success')
    }
    return notify(t('delete_failed'), '', 'error')
}

const handleRemove = () => open.value = true

</script>

<template>
    <span @click="handleRemove" class="btn">{{ t('button.remove') }}</span>
    <modal-delete :open="open" @close="open = false" @on-delete="onDelete" />
</template>

<style lang="scss" scoped>
.btn {
    cursor: pointer;

    &:hover {
        color: var(--vt-c-main);
    }
}
</style>
