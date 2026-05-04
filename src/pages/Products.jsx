import { useState, useEffect } from "react"
import { useNavigate, Link } from "react-router-dom"
import { getProducts, deleteProduct } from "../services/api"
import ParticlesBackground from "../components/ParticlesBackground"

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

  if (loading) return <p className="text-center mt-10 text-green-400 font-mono">Cargando...</p>
  if (error) return <p className="text-center mt-10 text-red-400">{error}</p>

  return (
    <div className="min-h-screen bg-black relative">
      <ParticlesBackground />
      <div className="relative z-10 max-w-4xl mx-auto px-4 py-8">

        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-green-400 font-mono">Productos</h1>
          <button
            onClick={handleLogout}
            className="text-sm text-green-800 hover:text-red-400 transition cursor-pointer font-mono"
          >
            Cerrar sesión
          </button>
        </div>

        <Link
          to="/products/new"
          className="inline-block mb-6 border border-green-500 text-green-400 hover:bg-green-500 hover:text-black text-sm font-mono font-medium px-4 py-2.5 rounded-lg transition"
        >
          + Crear producto
        </Link>

        {products.length === 0 ? (
          <p className="text-green-800 text-sm font-mono">No hay productos</p>
        ) : (
          <div className="flex flex-col gap-3">
            {products.map((product) => (
              <div
                key={product.id}
                className="bg-black border border-green-900 hover:border-green-500 rounded-xl px-5 py-4 flex items-center justify-between transition"
              >
                <div>
                  <Link
                    to={`/products/${product.id}`}
                    className="font-medium text-green-400 hover:text-green-300 font-mono transition"
                  >
                    {product.name}
                  </Link>
                  <p className="text-sm text-green-800 font-mono">Stock: {product.stock} {product.unit}</p>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-sm font-mono text-green-400">${product.sale_price}</span>
                  <button
                    onClick={() => handleDelete(product.id)}
                    className="text-sm text-red-500 hover:text-red-400 transition cursor-pointer font-mono"
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