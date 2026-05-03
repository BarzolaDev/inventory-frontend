const API_URL = import.meta.env.VITE_API_URL 

const getToken = () => localStorage.getItem("token")

const headers = () => ({
  "Content-Type": "application/json",
  Authorization: `Bearer ${getToken()}`
})

// AUTH
export const login = (email, password) =>
  fetch(`${API_URL}/users/login`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ username: email, password })
  }).then(res => res.json())

export const register = (username, email, password) =>
  fetch(`${API_URL}/users/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, email, password })
  }).then(res => res.json())

// PRODUCTS
export const getProducts = () =>
  fetch(`${API_URL}/products/`, { headers: headers() }).then(res => res.json())

export const getProduct = (id) =>
  fetch(`${API_URL}/products/${id}`, { headers: headers() }).then(res => res.json())

export const createProduct = (data) =>
  fetch(`${API_URL}/products/`, {
    method: "POST",
    headers: headers(),
    body: JSON.stringify(data)
  }).then(res => res.json())

export const updateProduct = (id, data) =>
  fetch(`${API_URL}/products/${id}`, {
    method: "PATCH",
    headers: headers(),
    body: JSON.stringify(data)
  }).then(res => res.json())

export const deleteProduct = (id) =>
  fetch(`${API_URL}/products/${id}`, {
    method: "DELETE",
    headers: headers()
  }).then(res => res.json())

export const updateStock = (id, data) =>
  fetch(`${API_URL}/products/${id}/stock`, {
    method: "POST",
    headers: headers(),
    body: JSON.stringify({ quantity: data.quantity })
  }).then(res => res.json())

export const getMovements = (id) =>
  fetch(`${API_URL}/products/${id}/movements`, { headers: headers() }).then(res => res.json())