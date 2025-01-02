<script setup lang="ts">
import { ShoppingCartOutlined } from '@ant-design/icons-vue';

</script>

<template>
    <div class="header">
        <ShoppingCartOutlined style="font-size: 20px;" />
    </div>
</template>

<style scoped lang="scss">
.header{
    padding: 20px 40px;
    display: flex;
    justify-content: end;

    .anticon-shopping-cart{
        cursor: pointer;
    }
}
</style>
