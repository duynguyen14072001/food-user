<script lang="ts" setup>
import { DeleteOutlined } from '@ant-design/icons-vue'

defineProps(['item', 'hasDelete'])
const emits = defineEmits(['onDelete'])
</script>

<template>
    <div class="container">
        <img class="image" :src="item.image_url" alt="" />
        <div class="category">
            <div v-for="(item, index) in item.productCategories" :key="index" class="category-item">
                {{ item.category.name }}
            </div>
        </div>
        <div class="info">
            <div class="text">
                <div class="name">{{ item.name }}</div>
                <div class="price">{{ item.price }}</div>
                <div class="description">{{ item.description }}</div>
            </div>
            <DeleteOutlined
                v-if="hasDelete"
                style="font-size: 16px; color: #26b7bc"
                @click="emits('onDelete')"
            />
        </div>
    </div>
</template>

<style lang="scss" scoped>
.container {
    cursor: pointer;
    width: 100%;
    height: fit-content;
    border-radius: 20px;

    .category {
        padding: 10px 10px 0;
        display: flex;
        flex-wrap: wrap;
        gap: 5px;
        .category-item {
            border: 1px solid var(--vt-c-gray-3);
            border-radius: 10px;
            padding: 0 8px;
            color: var(--vt-c-gray-2);
        }
    }
    .image {
        height: 400px;
        border-radius: 20px;
    }
    .info {
        width: 100%;
        display: flex;
        justify-content: space-between;
        padding: 10px;
        .text {
            width: 100%;
            .name {
                font-weight: bold;
                font-size: 18px;
                overflow-wrap: break-word;
                overflow: hidden;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;
            }

            .price {
                font-size: 12px;
            }

            .description {
                font-size: 15px;
                overflow-wrap: break-word;
                overflow: hidden;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;
            }
        }
        .anticon-delete {
            cursor: pointer;
        }
    }
}
</style>
