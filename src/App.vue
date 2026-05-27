<script setup lang="ts">
import {useAuthStore} from '@/stores/auth'
const authStore=useAuthStore()
function handleLogout(){
    authStore.logout()
}
</script>

<template>
  <!--导航栏：仅登陆时候显示-->
 <header v-if="authStore.isAuthenticated" class="navbar">
  <span class="nav-user">欢迎你，{{ authStore.username }}</span>
  <button class="nav-logout" @click="handleLogout">退出</button>
 </header>
  <RouterView />
</template>

<style scoped>
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 24px;
  height: 52px;
  background: rgba(255, 255, 255, 0.06);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.nav-user {
  color: rgba(255, 255, 255, 0.85);
  font-size: 14px;
}

.nav-logout {
  padding: 6px 16px;
  background: rgba(255, 107, 107, 0.2);
  color: #ff6b6b;
  border: 1px solid rgba(255, 107, 107, 0.3);
  border-radius: 8px;
  font-size: 13px;
  cursor: pointer;
  transition: background 0.2s;
}

.nav-logout:hover {
  background: rgba(255, 107, 107, 0.35);
}

</style>
