<script setup lang="ts">
import { ShoppingCartOutlined } from '@ant-design/icons-vue'
import { useI18n } from 'vue3-i18n'
import * as Img from '@/assets/imgs'
import { getToken } from '@/helpers'

const { t } = useI18n()

const handleLogout = () => {
    localStorage.clear()
    window.location.reload()
}
</script>

<template>
    <div class="header">
        <div class="left-header">
            <router-link to="/" class="logo">
                <img :src="Img.Logo" alt="Logo" />
                <span class="logo-text">{{ t('header.logo') }}</span>
            </router-link>
            <router-link to="/">{{ t('header.home') }}</router-link>
            <router-link to="/product">{{ t('header.menu') }}</router-link>
            <router-link to="/">{{ t('header.contact') }}</router-link>
        </div>
        <div class="right-header">
            <div v-if="!getToken()" class="auth">
                <router-link to="/login">{{ t('header.login') }}</router-link>
                <router-link to="/signup">{{ t('header.signup') }}</router-link>
            </div>
            <div v-else class="auth">
                <div class="logout" @click="handleLogout">{{ t('header.logout') }}</div>
            </div>
            <ShoppingCartOutlined v-if="getToken()" style="font-size: 24px" />
        </div>
    </div>
</template>

<style scoped lang="scss">
.header {
    background-color: var(--vt-c-gray-4);
    color: var(--vt-c-text-header);
    position: fixed;
    width: 100%;
    padding: 20px 40px;
    z-index: 10;
    display: flex;
    justify-content: space-between;

    .left-header,
    .right-header {
        font-size: 18px;
        display: flex;
        align-items: center;
        gap: 30px;

        .auth {
            display: flex;
            align-items: center;
            gap: 30px;

            .logout {
                cursor: pointer;
                &:hover {
                    color: var(--vt-c-main);
                }
            }
        }
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
