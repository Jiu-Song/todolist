import { ref} from 'vue'
import { defineStore } from 'pinia'
import { fetchTodos as fetchTodosApi, createTodo, updateTodo, toggleTodo as toggleTodoApi, deleteTodo } from '@/api/todos'
export interface Todo {
  id: number
  text: string
  completed: boolean
}
export const useTodoStore = defineStore('todo', () => {
const todos = ref<Todo[]>([])
const newTodoText = ref('')
const errorMsg=ref('')


async function addTodo(){
    const text = newTodoText.value.trim()
    if(text){
        try{
            const newTodo=await createTodo({text})
            todos.value.push(newTodo)
            newTodoText.value = ''
        }catch(err){
            errorMsg.value='Failed to create todo'
        }
      
    }
}

async function removeTodo(id: number){
    try{
        await deleteTodo(id)
        todos.value = todos.value.filter(todo => todo.id !== id)
    }catch(err){
        errorMsg.value='Failed to delete todo'
    }
}
async function toggleTodo(todo:Todo){
    const updated=await toggleTodoApi(todo.id)
    const index=todos.value.findIndex(t=>t.id==todo.id)
    if(index !== -1){
        todos.value[index] = updated
    }
}
async function fetchTodos(){
    try{
        todos.value=await fetchTodosApi()
    }catch(err){
        errorMsg.value='Failed to fetch todos'
    }
}
return {todos, newTodoText, addTodo, removeTodo, toggleTodo, fetchTodos,errorMsg}
})