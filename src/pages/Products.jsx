import { useState, useEffect } from "react"
import { useNavigate, Link } from "react-router-dom"
import { getProducts, deleteProduct } from "../services/api"

function Products() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const navigate = useNavigate()

  const fetchProducts = async () => {
    const data = await getProducts()
    if (Array.isArray(data)) {
      setProducts(data)
    } else {
      setError("Error al cargar los productos")
    }
    setLoading(false)
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  const handleDelete = async (id) => {
    await deleteProduct(id)
    fetchProducts()
  }

  const handleLogout = () => {
    localStorage.removeItem("token")
    navigate("/login")
  }

  if (loading) return <p>Cargando...</p>
  if (error) return <p>{error}</p>

  return (
    <div>
      <div>
        <h1>Productos</h1>
        <button onClick={handleLogout}>Cerrar sesión</button>
      </div>

      <Link to="/products/new">Crear producto</Link>

      {products.length === 0 ? (
        <p>No hay productos</p>
      ) : (
        <ul>
          {products.map((product) => (
            <li key={product.id}>
              <Link to={`/products/${product.id}`}>{product.name}</Link>
              <span> - Stock: {product.stock}</span>
              <button onClick={() => handleDelete(product.id)}>Eliminar</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default Products