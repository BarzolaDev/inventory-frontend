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
    if (!confirm("¿Seguro que querés eliminar este producto?")) return
    await deleteProduct(id)
    fetchProducts()
  }

  const handleLogout = () => {
    localStorage.removeItem("token")
    navigate("/login")
  }

  if (loading) return <p className="text-center mt-10 text-gray-400">Cargando...</p>
  if (error) return <p className="text-center mt-10 text-red-400">{error}</p>

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">

        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Productos</h1>
          <button
            onClick={handleLogout}
            className="text-sm text-gray-400 hover:text-red-400 transition"
          >
            Cerrar sesión
          </button>
        </div>

        <Link
          to="/products/new"
          className="inline-block mb-6 bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium px-4 py-2.5 rounded-lg transition"
        >
          + Crear producto
        </Link>

        {products.length === 0 ? (
          <p className="text-gray-400 text-sm">No hay productos</p>
        ) : (
          <div className="flex flex-col gap-3">
            {products.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-xl shadow-sm px-5 py-4 flex items-center justify-between"
              >
                <div>
                  <Link
                    to={`/products/${product.id}`}
                    className="font-medium text-gray-800 hover:text-blue-500 transition"
                  >
                    {product.name}
                  </Link>
                  <p className="text-sm text-gray-400">Stock: {product.stock} {product.unit}</p>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-sm font-medium text-gray-700">${product.sale_price}</span>
                  <button
                    onClick={() => handleDelete(product.id)}
                    className="text-sm text-red-400 hover:text-red-600 transition"
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Products