<script lang="ts" setup>
const props = defineProps(['url', 'width'])
</script>

<template>
    <a-image :src="props.url" :width="width" />
</template>
