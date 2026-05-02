import {useState, useEffect } from 'react'
import { getProducts } from '../services/products'

function Dashboard({ token }) {
    const [products, setProducts] = useState([])

    useEffect(()=>{
        getProducts().then(setProducts)
    }, [])

    return (
        <div className="bg-gray-950 min-h-screen text-white p-8">
      <h1 className="text-cyan-400 text-3xl font-bold mb-8">Dashboard</h1>
      <p>{products.length} productos</p>
       </div>
    )
}

export default Dashboard