const API_URL = import.meta.env.VITE_API_URL

export async function login(email, password) {

    const formData = new URLSearchParams()
    formData.append('username', email)
    formData.append('password', password)

    const res = await fetch(`${API_URL}/users/login`, {
        method: 'POST',
        headers: { 'Content-Type' : 'application/x-www-form-urlencoded'},
        body: formData
    })

    if (!res.ok) throw new Error('Credenciales inválidas')
    return res.json()        
}


