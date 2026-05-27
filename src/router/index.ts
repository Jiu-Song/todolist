import { createRouter, createWebHistory } from 'vue-router'
import TodoList from '../views/TodoList.vue'

function isAuthenticated(): boolean {
  return !!localStorage.getItem('token')
}


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {path: '/', name: 'home', component: TodoList},
    {path: '/login', name: 'login', component: () => import('../views/Login.vue')},
    {path: '/register', name: 'register', component: () => import('../views/Register.vue')}
  ],
})

router.beforeEach((to, from, next) => {
  const loggedIn=isAuthenticated()
  if(!loggedIn && to.path !=='/login' && to.path!=='/register'){
    next('/login')
  }else if(loggedIn && (to.path ==='/login' || to.path==='/register')){
    next('/')
  }else{
    next()
  }

})
export default router