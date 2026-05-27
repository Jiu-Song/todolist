<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const authStore = useAuthStore()

// ==================== 你需要写的部分 ====================

// 1. 定义表单数据：username, password, confirmPassword 三个 ref，初始值空字符串
const username=ref('')
const password=ref('')
const confirmPassword=ref('')
// 2. 定义 errorMsg ref，用于显示错误信息
const errorMsg=ref('')
// 3. 定义 loading ref，防止重复提交
const loading=ref(false)
// 4. 定义 register 函数：
//    - 设置 loading = true，清空 errorMsg
//    - 校验：如果 password !== confirmPassword → errorMsg = '两次密码输入不一致'，return
//    - try: await authStore.register(username.value, password.value)
//    - 成功后 router.push('/')
//    - catch: errorMsg.value = 错误信息（如"注册失败，请重试"）
//    - finally: loading = false
async function register(){
    loading.value=true
    errorMsg.value=''
    if(password.value!==confirmPassword.value){
        errorMsg.value='两次密码输入不一致'
        loading.value=false
        return
}
    try{
      await authStore.register(username.value,password.value)
    } catch  {
      errorMsg.value = '注册失败，请重试'
    } finally {
      loading.value = false
    }
}
// ==================== 提示 ====================
// authStore.register() 内部已经做了：
//   - 调 API
//   - 存 localStorage
//   - 更新 Pinia state
//   - 跳转首页
// 所以这里只需要：
//   1. 前端校验两次密码是否一致
//   2. try-catch 处理失败情况

</script>

<template>
  <!-- 渐变背景 -->
  <div class="gradient-bg"></div>

  <!-- 注册卡片 -->
  <div class="glass-card">
    <h1 class="title">注册</h1>

    <!-- 表单 -->
    <div class="form-group">
      <input
        v-model="username"
        class="form-input"
        type="text"
        placeholder="用户名"
        @keyup.enter="register"
      />
    </div>
    <div class="form-group">
      <input
        v-model="password"
        class="form-input"
        type="password"
        placeholder="密码"
        @keyup.enter="register"
      />
    </div>
    <div class="form-group">
      <input
        v-model="confirmPassword"
        class="form-input"
        type="password"
        placeholder="确认密码"
        @keyup.enter="register"
      />
    </div>

    <!-- 错误提示 -->
    <p v-if="errorMsg" class="error-msg">{{ errorMsg }}</p>

    <!-- 注册按钮 -->
    <button class="submit-btn" :disabled="loading" @click="register">
      {{ loading ? '注册中...' : '注册' }}
    </button>

    <!-- 跳转登录 -->
    <p class="switch-link">
      已有账号？
      <router-link to="/login">去登录</router-link>
    </p>
  </div>
</template>

<style scoped>
/* ========== 渐变背景 ========== */
.gradient-bg {
  position: fixed;
  inset: 0;
  z-index: -2;
  background: linear-gradient(-45deg, #0f0c29, #302b63, #24243e, #1a1a2e, #16213e);
  background-size: 400% 400%;
  animation: gradient 20s ease infinite;
}

@keyframes gradient {
  0%, 100% { background-position: 0% 50%; }
  25% { background-position: 100% 0%; }
  50% { background-position: 100% 100%; }
  75% { background-position: 0% 100%; }
}

/* ========== 玻璃拟态卡片 ========== */
.glass-card {
  position: relative;
  z-index: 1;
  width: 420px;
  max-width: 90vw;
  margin: 120px auto 0;
  padding: 36px 32px;
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 20px;
  box-shadow: 0 8px 40px rgba(0, 0, 0, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.1);
}

.title {
  margin: 0 0 28px;
  text-align: center;
  font-size: 28px;
  font-weight: 700;
  color: rgba(255, 255, 255, 0.9);
  letter-spacing: 2px;
}

/* ========== 输入框 ========== */
.form-group {
  margin-bottom: 16px;
}

.form-input {
  width: 100%;
  padding: 12px 16px;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 12px;
  color: #fff;
  font-size: 15px;
  outline: none;
  transition: border-color 0.3s, box-shadow 0.3s;
  box-sizing: border-box;
}

.form-input::placeholder {
  color: rgba(255, 255, 255, 0.35);
}

.form-input:focus {
  border-color: rgba(255, 255, 255, 0.5);
  box-shadow: 0 0 0 3px rgba(255, 255, 255, 0.08);
}

/* ========== 提交按钮 ========== */
.submit-btn {
  width: 100%;
  padding: 12px 24px;
  margin-top: 8px;
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: #fff;
  border: none;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s, opacity 0.2s;
}

.submit-btn:hover:not(:disabled) {
  transform: translateY(-1px);
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
}

.submit-btn:active:not(:disabled) {
  transform: translateY(0);
}

.submit-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

/* ========== 错误提示 ========== */
.error-msg {
  margin: 8px 0 0;
  color: #ff6b6b;
  font-size: 14px;
  text-align: center;
}

/* ========== 底部跳转链接 ========== */
.switch-link {
  margin: 20px 0 0;
  text-align: center;
  color: rgba(255, 255, 255, 0.5);
  font-size: 14px;
}

.switch-link a {
  color: #667eea;
  text-decoration: none;
  font-weight: 600;
}

.switch-link a:hover {
  text-decoration: underline;
}
</style>
