<script lang="ts" setup>
import { useRouter } from 'vue-router'

const props = defineProps(['url', 'text'])

const router = useRouter()

const handleClick = () => {
    router.push(props.url)
}
</script>

<template>
    <div class="update">
        <a-button @click="handleClick">
            {{ text }}
        </a-button>
    </div>
</template>
