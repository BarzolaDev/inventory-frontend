import { API_URL } from './api'

export async function getProducts(token) {
    const response = await fetch (`${API_URL}/products/`, {
        headers: { Authorization: `Bearer ${token}` }
    })
    if(!response.ok) throw new Error('Error al obtener productos')
    return response.json()
}


