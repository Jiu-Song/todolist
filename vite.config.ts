import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
  server: {
    proxy: {
      // 所有以 /api 开头的请求，都会被 Vite 转发到 localhost:8080
      '/api': {
        target: 'http://localhost:8080',  // 后端地址
        changeOrigin: true,                // 伪装请求头里的 Host，让后端以为请求来自自己
      },
    },
  },
})
