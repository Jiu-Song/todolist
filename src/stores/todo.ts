import { ref} from 'vue'
import { defineStore } from 'pinia'
export interface Todo {
  id: number
  text: string
  completed: boolean
}
export const useTodoStore = defineStore('todo', () => {
const todos = ref<Todo[]>([])
const newTodoText = ref('')
let nextId = 1

function addTodo(){
    const text = newTodoText.value.trim()
    if(text){
        todos.value.push({
            id: nextId++,
            text:text,
            completed: false
        })
        newTodoText.value = ''
    }
}

function removeTodo(id: number){
    todos.value = todos.value.filter(todo => todo.id !== id)
}
function toggleTodo(todo:Todo){
    todo.completed = !todo.completed
}
return {todos, newTodoText, addTodo, removeTodo, toggleTodo}
})