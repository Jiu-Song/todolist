<script setup lang="ts">
import{useTodoStore,type Todo} from '@/stores/todo'//为什么要引入type
import TodoItem from '@/components/TodoItem.vue'
import { useParticles } from '@/composables/useParticles'
import { useConfetti } from '@/composables/useConfetti'
import {onMounted} from 'vue'
const todoStore = useTodoStore()
const { particleCanvas } = useParticles()
const { confettiCanvas, triggerConfetti } = useConfetti() //8-9这两段代码什么意思



//toggleTodo 现在是 async 的，调 API 需要时间。
// if (todo.completed) 在 API 返回之前就执行了，判断的是旧值。
// 实际效果是反的——勾选完成时不放彩带，取消完成时反而放。
//修复： 等 API 返回后再判断：
// function handleToggle(todo:Todo){
//     todoStore.toggleTodo(todo)
//         if(todo.completed){
//             triggerConfetti()
//         }
//     }
async function handleToggle(todo:Todo){
    await todoStore.toggleTodo(todo)
    const updated=todoStore.todos.find(t=>t.id===todo.id)
        if(updated&&updated.completed){
            triggerConfetti()
        }
    }

function handleDelete(id:number){
    todoStore.removeTodo(id)
}

// ==================== 生命周期 ====================
onMounted(() => {
  // 组件挂载后执行的逻辑
  todoStore.fetchTodos() // 获取待办事项列表
})

</script>

<template>
  <!-- 渐变背景 -->
  <div class="gradient-bg"></div>

  <!-- 粒子层 -->
  <canvas ref="particleCanvas" class="particle-canvas"></canvas>

  <!-- 彩带层 -->
  <canvas ref="confettiCanvas" class="confetti-canvas"></canvas>

  <!-- 主界面卡片 -->
  <div class="glass-card">
    <h1 class="title">TodoList</h1>

    <!-- 输入区 -->
    <div class="input-row">
      <input
        v-model="todoStore.newTodoText"
        class="todo-input"
        type="text"
        placeholder="写点什么..."
        @keyup.enter="todoStore.addTodo"
      />
      <button class="add-btn" @click="todoStore.addTodo">添加</button>
    </div>
    <p v-if="todoStore.errorMsg" class="error-msg">{{ todoStore.errorMsg }}</p>
    <!-- 待办列表 -->
    <ul class="todo-list">
      <TransitionGroup name="todo">
        <TodoItem v-for="todo in todoStore.todos" :key="todo.id" :todo="todo" @toggle="handleToggle" 
        @delete="handleDelete"/>
      </TransitionGroup>
    </ul>
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
  0%,
  100% {
    background-position: 0% 50%;
  }
  25% {
    background-position: 100% 0%;
  }
  50% {
    background-position: 100% 100%;
  }
  75% {
    background-position: 0% 100%;
  }
}

/* ========== 粒子画布 ========== */
.particle-canvas {
  position: fixed;
  inset: 0;
  z-index: -1;
  pointer-events: none;
}

/* ========== 彩带画布 ========== */
.confetti-canvas {
  position: fixed;
  inset: 0;
  z-index: 10;
  pointer-events: none;
}

/* ========== 玻璃拟态卡片 ========== */
.glass-card {
  position: relative;
  z-index: 1;
  width: 480px;
  max-width: 90vw;
  margin: 80px auto 0;
  padding: 32px 28px;
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 20px;
  box-shadow: 0 8px 40px rgba(0, 0, 0, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.1);
}

.title {
  margin: 0 0 24px;
  text-align: center;
  font-size: 28px;
  font-weight: 700;
  color: rgba(255, 255, 255, 0.9);
  letter-spacing: 2px;
}

/* ========== 输入区 ========== */
.input-row {
  display: flex;
  gap: 10px;
  margin-bottom: 24px;
}

.todo-input {
  flex: 1;
  padding: 12px 16px;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 12px;
  color: #fff;
  font-size: 15px;
  outline: none;
  transition: border-color 0.3s, box-shadow 0.3s;
}

.todo-input::placeholder {
  color: rgba(255, 255, 255, 0.35);
}

.todo-input:focus {
  border-color: rgba(255, 255, 255, 0.5);
  box-shadow: 0 0 0 3px rgba(255, 255, 255, 0.08);
}

.add-btn {
  padding: 12px 24px;
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: #fff;
  border: none;
  border-radius: 12px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
}

.add-btn:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
}

.add-btn:active {
  transform: translateY(0);
}

/* ========== 错误提示 ========== */
.error-msg {
  margin: 0 0 16px;
  color: #ff6b6b;
  font-size: 14px;
  text-align: center;
}

/* ========== 待办列表 ========== */
.todo-list {
  list-style: none;
  margin: 0;
  padding: 0;
}


/* ========== 列表转场动画 ========== */
.todo-enter-active {
  transition: all 0.4s ease;
}

.todo-leave-active {
  transition: all 0.3s ease;
}

.todo-enter-from {
  opacity: 0;
  transform: translateX(-20px);
}

.todo-leave-to {
  opacity: 0;
  transform: translateX(20px);
}

/* 让删除动画更流畅 */
.todo-move {
  transition: transform 0.3s ease;
}
</style>