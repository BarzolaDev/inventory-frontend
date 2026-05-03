import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { getProduct, updateProduct, updateStock, getMovements, createProduct } from "../services/api"

function ProductDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const isNew = id === "new"

  const [product, setProduct] = useState({ name: "", stock: 0, unit: "", purchase_price: 0, sale_price: 0 })
  const [movements, setMovements] = useState([])
  const [stockAmount, setStockAmount] = useState("")
  const [loading, setLoading] = useState(!isNew)
  const [error, setError] = useState("")

  useEffect(() => {
    if (!isNew) {
      fetchProduct()
      fetchMovements()
    }
  }, [id])

  const fetchProduct = async () => {
    const data = await getProduct(id)
    if (data.id) {
      setProduct(data)
    } else {
      setError("Producto no encontrado")
    }
    setLoading(false)
  }

  const fetchMovements = async () => {
    const data = await getMovements(id)
    if (Array.isArray(data)) setMovements(data)
  }

  const handleSave = async (e) => {
    e.preventDefault()
    setError("")
    if (isNew) {
      const data = await createProduct(product)
      if (data.id) navigate("/products")
      else setError("Error al crear el producto")
    } else {
      const { stock, ...productData } = product
      const data = await updateProduct(id, productData)
      if (data.id) navigate("/products")
      else setError("Error al actualizar el producto")
    }
  }

  const handleStockUpdate = async (e) => {
    e.preventDefault()
    const data = await updateStock(id, { quantity: Number(stockAmount) })
    if (data.id) {
      setStockAmount("")
      fetchProduct()
      fetchMovements()
    } else {
      setError("Error al actualizar el stock")
    }
  }

  if (loading) return <p className="text-center mt-10 text-gray-400">Cargando...</p>
  if (error) return <p className="text-center mt-10 text-red-400">{error}</p>

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-2xl mx-auto px-4 py-8">

        <button
          onClick={() => navigate("/products")}
          className="text-sm text-gray-400 hover:text-gray-600 mb-6 flex items-center gap-1 transition"
        >
          ← Volver
        </button>

        <h1 className="text-2xl font-bold text-gray-800 mb-6">
          {isNew ? "Crear producto" : "Editar producto"}
        </h1>

        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <form onSubmit={handleSave} className="flex flex-col gap-4">
            <input
              type="text"
              placeholder="Nombre"
              value={product.name}
              onChange={(e) => setProduct({ ...product, name: e.target.value })}
              className="border border-gray-200 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-blue-400 transition"
            />
            <input
              type="text"
              placeholder="Unidad (ej: kg, unidad, litro)"
              value={product.unit}
              onChange={(e) => setProduct({ ...product, unit: e.target.value })}
              className="border border-gray-200 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-blue-400 transition"
            />
            <div className="flex gap-3">
              <input
                type="number"
                placeholder="Precio de compra"
                value={product.purchase_price}
                onChange={(e) => setProduct({ ...product, purchase_price: Number(e.target.value) })}
                className="border border-gray-200 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-blue-400 transition w-full"
              />
              <input
                type="number"
                placeholder="Precio de venta"
                value={product.sale_price}
                onChange={(e) => setProduct({ ...product, sale_price: Number(e.target.value) })}
                className="border border-gray-200 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-blue-400 transition w-full"
              />
            </div>
            {isNew && (
              <input
                type="number"
                placeholder="Stock inicial"
                value={product.stock}
                onChange={(e) => setProduct({ ...product, stock: Number(e.target.value) })}
                className="border border-gray-200 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-blue-400 transition"
              />
            )}
            {error && <p className="text-red-400 text-sm">{error}</p>}
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white rounded-lg py-2.5 text-sm font-medium transition"
            >
              {isNew ? "Crear producto" : "Guardar cambios"}
            </button>
          </form>
        </div>

        {!isNew && (
          <>
            <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-semibold text-gray-800">Stock actual</h2>
                <span className="text-2xl font-bold text-blue-500">{product.stock} {product.unit}</span>
              </div>
              <form onSubmit={handleStockUpdate} className="flex gap-3">
                <input
                  type="number"
                  placeholder="Cantidad (negativo para restar)"
                  value={stockAmount}
                  onChange={(e) => setStockAmount(e.target.value)}
                  className="border border-gray-200 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-blue-400 transition w-full"
                />
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-600 text-white rounded-lg px-4 py-2.5 text-sm font-medium transition whitespace-nowrap"
                >
                  Actualizar
                </button>
              </form>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="font-semibold text-gray-800 mb-4">Movimientos</h2>
              {movements.length === 0 ? (
                <p className="text-gray-400 text-sm">Sin movimientos</p>
              ) : (
                <div className="flex flex-col gap-2">
                  {movements.map((m, i) => (
                    <div key={i} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
                      <span className="text-sm text-gray-400">
                        {new Date(m.created_at).toLocaleString()}
                      </span>
                      <span className={`text-sm font-medium ${m.quantity > 0 ? "text-green-500" : "text-red-400"}`}>
                        {m.quantity > 0 ? "+" : ""}{m.quantity}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </>
        )}

      </div>
    </div>
  )
}

export default ProductDetail