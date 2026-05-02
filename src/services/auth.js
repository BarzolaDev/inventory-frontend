import { API_URL } from './api'

export async function login(email, password) {

    const formData = new URLSearchParams()
    formData.append('username', email)
    formData.append('password', password)

    const response = await fetch(`${API_URL}/users/login`, {
        method: 'POST',
        headers: { 'Content-Type' : 'application/x-www-form-urlencoded'},
        body: formData
    })

    if (!response.ok) throw new Error('Credenciales inválidas')
    return response.json()        
}


