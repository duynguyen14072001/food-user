<script lang="ts" setup>
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { VN_PAY_STATUS_CODE_SUCCESS } from './shared'

const { query } = useRoute()

onMounted(() => {
    console.log('query.vnp_ResponseCode :>> ', query.vnp_ResponseCode)
    if (query.vnp_ResponseCode?.toString() === VN_PAY_STATUS_CODE_SUCCESS) {
        console.log('2 :>> ', 2)
    }
})
</script>

<template>321321312</template>

<style lang="scss" scoped></style>
