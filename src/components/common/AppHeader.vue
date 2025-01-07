<script setup lang="ts">
import { ShoppingCartOutlined } from '@ant-design/icons-vue'
import { useI18n } from 'vue3-i18n'
import * as Img from '@/assets/imgs'

const { t } = useI18n()
</script>

<template>
    <div class="header">
        <div class="left-header">
            <router-link to="/" class="logo">
                <img :src="Img.Logo" alt="Logo" />
                <span class="logo-text">{{ t('header.logo') }}</span>
            </router-link>
            <router-link to="/">{{ t('header.home') }}</router-link>
            <router-link to="/">{{ t('header.menu') }}</router-link>
            <router-link to="/">{{ t('header.contact') }}</router-link>
        </div>
        <div class="right-header">
            <router-link to="/login">{{ t('header.login') }}</router-link>
            <router-link to="/">{{ t('header.signup') }}</router-link>
            <ShoppingCartOutlined style="font-size: 24px" />
        </div>
    </div>
</template>

<style scoped lang="scss">
.header {
    padding: 20px 40px;
    display: flex;
    justify-content: space-between;

    .left-header,
    .right-header {
        font-size: 18px;
        display: flex;
        align-items: center;

        gap: 30px;
    }

    .left-header {
        .logo {
            display: flex;
            align-items: center;
            img {
                width: 60px;
                height: 60px;
            }

            .logo-text {
                font-size: 10px;
                white-space: break-spaces;
            }
        }
    }

    .anticon-shopping-cart {
        cursor: pointer;
    }
}
</style>
