import {client} from './client'
export interface Todo{
    id:number
    text:string
    completed:boolean
}
export interface CreateTodoParams{
    text:string
}
export interface UpdateTodoParams{
    text?:string
    completed?:boolean
}
export async function fetchTodos():Promise<Todo[]>{
    const response=await client.get('/api/todos')
    return response.data.data
}
export async function createTodo(params:CreateTodoParams):Promise<Todo>{
    const response=await client.post('/api/todos', params)
    return response.data.data
}
export async function updateTodo(id:number,params:UpdateTodoParams):Promise<Todo>{
    const response=await client.put(`/api/todos/${id}`, params)
    return response.data.data
}
export async function toggleTodo(id:number):Promise<Todo>{
    const response=await client.put(`/api/todos/${id}/toggle`)//注意
    return response.data.data
}
export async function deleteTodo(id:number):Promise<void>{
    await client.delete(`/api/todos/${id}`)
}