<script setup lang="ts">
import {type Todo} from '@/stores/todo'
const props = defineProps<{todo:Todo}>()
const emit =defineEmits<{
    toggle:[todo:Todo],
    delete:[id:number]
}>()
</script>
<template>
    <li class="todo-item" :class="{ completed: props.todo.completed }">
  <span class="todo-text">{{ props.todo.text }}</span>
  <div class="todo-actions">
    <button class="toggle-btn" @click="emit('toggle', props.todo)"></button>
    <button class="delete-btn" @click="emit('delete', props.todo.id)">✕</button>
  </div>
</li>

</template>

<style scoped>
.todo-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 16px;
  margin-bottom: 8px;
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  transition: background 0.3s, border-color 0.3s;
}

.todo-item:hover {
  background: rgba(255, 255, 255, 0.12);
  border-color: rgba(255, 255, 255, 0.2);
}

.todo-item.completed .todo-text {
  text-decoration: line-through;
  opacity: 0.45;
}

.todo-text {
  color: rgba(255, 255, 255, 0.85);
  font-size: 15px;
  flex: 1;
  word-break: break-all;
}

.todo-actions {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-shrink: 0;
  margin-left: 12px;
}

/* 勾选按钮 */
.toggle-btn {
  width: 22px;
  height: 22px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  background: transparent;
  cursor: pointer;
  transition: all 0.25s;
}

.toggle-btn:hover {
  border-color: rgba(255, 255, 255, 0.6);
}

.todo-item.completed .toggle-btn {
  background: #6bcb77;
  border-color: #6bcb77;
  position: relative;
}

.todo-item.completed .toggle-btn::after {
  content: '✓';
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  color: #fff;
  font-weight: bold;
}

/* 删除按钮 */
.delete-btn {
  width: 26px;
  height: 26px;
  border: none;
  background: transparent;
  color: rgba(255, 255, 255, 0.35);
  font-size: 16px;
  cursor: pointer;
  border-radius: 6px;
  transition: all 0.2s;
}

.delete-btn:hover {
  color: #ff6b6b;
  background: rgba(255, 107, 107, 0.15);
}

</style>
