import {client} from './client'
export async function login(username:string,password:string){
        const response=await client.post('/api/auth/login', { username, password })
        return response.data.data
}

export async function register(username:string,password:string){
        const response=await client.post('/api/auth/register', { username, password })
        return response.data.data
}