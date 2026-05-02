import { useState, useEffect } from 'react'

function Dashboard({ token }) {
  const [products, setProducts] = useState([])

  useEffect(() => {
    fetch('http://localhost:8000/products/', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => setProducts(data))
  }, [token])

  return (
    <div className="bg-gray-950 min-h-screen text-white p-8">
      <h1 className="text-cyan-400 text-3xl font-bold mb-8">Dashboard</h1>
      <pre>{JSON.stringify(products, null, 2)}</pre>
    </div>
  )
}

export default Dashboard