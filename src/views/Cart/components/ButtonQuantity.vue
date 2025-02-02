<script lang="ts" setup>
import { useCartStore } from '@/stores'
import { ref, watch } from 'vue'

const props = defineProps(['item'])
const quantity = ref()
const cartStore = useCartStore()

const handleChange = () =>
    cartStore.update({ ...props.item, quantity: quantity.value }, props.item.id)

watch(
    () => props.item,
    () => (quantity.value = props.item.quantity)
)
</script>

<template>
    <a-input-number :min="1" :max="100000" v-model:value="quantity" @change="handleChange" />
</template>

<style lang="scss" scoped></style>
