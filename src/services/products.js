import { API_URL } from './api'

export async function getProducts() {
  const res = await fetch(`${API_URL}/products/`)
  if (!res.ok) throw new Error('Error al obtener productos')
  return res.json()
}


