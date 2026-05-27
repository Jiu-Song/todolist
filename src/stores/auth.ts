import { ref,computed } from 'vue'
import { defineStore } from 'pinia'
import { login as loginApi, register as registerApi } from '@/api/auth'
import router from '@/router'
export const useAuthStore=defineStore('auth',()=>{
    const token=ref(localStorage.getItem('token') || '')
    const username=ref(localStorage.getItem('username') || '')
    const isAuthenticated=computed(()=>!!token.value)

async function login(usernameInput:string,password:string){
    const data=await loginApi(usernameInput,password)
    localStorage.setItem('token', data.token)
    localStorage.setItem('username', data.username)
    token.value = data.token
    username.value = data.username
    router.push('/')
}
async function register(usernameInput: string, password: string) {
  const data = await registerApi(usernameInput, password)
  localStorage.setItem('token', data.token)
  localStorage.setItem('username', data.username)
  token.value = data.token
  username.value = data.username
  router.push('/')
}

function logout(){
    localStorage.removeItem('token')
    localStorage.removeItem('username')
    token.value = ''
    username.value = ''
    router.push('/login')
}
return {token, username, isAuthenticated, login, register, logout}
})