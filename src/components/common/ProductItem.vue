<script lang="ts" setup>
import { DeleteOutlined } from '@ant-design/icons-vue'
import { useI18n } from 'vue3-i18n'

defineProps(['item', 'hasDelete'])
const { t } = useI18n()
const emits = defineEmits(['onDelete', 'handleAddCart'])
</script>

<template>
    <div class="container">
        <router-link :to="{ name: 'product-detail', params: { slug: item.slug } }" class="item">
            <img class="image" :src="item.image_url" alt="" />
            <div class="name">
                <span>{{ item.name }}</span>
                <span class="price">{{ item.price }}{{ t('unit_price') }}</span>
            </div>
            <div class="category">
                <div
                    v-for="(item, index) in item.productCategories"
                    :key="index"
                    class="category-item"
                >
                    {{ item.category.name }}
                </div>
            </div>
            <div class="info">
                <div class="text">
                    <div class="description">{{ item.description }}</div>
                </div>
                <DeleteOutlined
                    v-if="hasDelete"
                    style="font-size: 16px; color: #26b7bc"
                    @click="emits('onDelete')"
                />
            </div>
        </router-link>
        <a-button type="primary" @click="emits('handleAddCart')">{{
            t('products.btn_cart')
        }}</a-button>
    </div>
</template>

<style lang="scss" scoped>
.container {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .item {
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
            height: 200px;
            width: 100%;
            border-radius: 20px;
        }
        .name {
            padding: 10px 10px 0;
            display: flex;
            justify-content: space-between;
            font-weight: bold;
            font-size: 18px;
        }

        .info {
            width: 100%;
            display: flex;
            justify-content: space-between;
            padding: 10px;

            .text {
                width: 100%;
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
}
</style>
