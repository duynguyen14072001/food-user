<script lang="ts" setup>
import i18n from '@/lang'

const { t } = i18n
const props = defineProps(['status'])
</script>

<template>
    <div :class="props.status === 1 ? 'active' : 'inactive'">
        {{ props.status === 1 ? t('staff.list.case.active') : t('staff.list.case.inactive') }}
    </div>
</template>

<style scoped lang="scss">
div {
    padding: 2px 0;
    max-width: 70px;
    margin: 0 auto;
}
</style>
