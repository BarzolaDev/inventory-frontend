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
    if (Array.isArray(data)) {
      setMovements(data)
    }
  }

const handleSave = async (e) => {
  e.preventDefault()
  setError("")

  if (isNew) {
    const data = await createProduct(product)
    if (data.id) {
      navigate("/products")
    } else {
      setError("Error al crear el producto")
    }
  } else {
    const { stock, ...productData } = product
    const data = await updateProduct(id, productData)
    if (data.id) {
      navigate("/products")
    } else {
      setError("Error al actualizar el producto")
    }
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

  if (loading) return <p>Cargando...</p>
  if (error) return <p>{error}</p>

  return (
    <div>
      <button onClick={() => navigate("/products")}>← Volver</button>

      <h1>{isNew ? "Crear producto" : "Editar producto"}</h1>

      <form onSubmit={handleSave}>
  <input
    type="text"
    placeholder="Nombre"
    value={product.name}
    onChange={(e) => setProduct({ ...product, name: e.target.value })}
  />
  <input
    type="text"
    placeholder="Unidad (ej: kg, unidad, litro)"
    value={product.unit}
    onChange={(e) => setProduct({ ...product, unit: e.target.value })}
  />
  <input
    type="number"
    placeholder="Precio de compra"
    value={product.purchase_price}
    onChange={(e) => setProduct({ ...product, purchase_price: Number(e.target.value) })}
  />
  <input
    type="number"
    placeholder="Precio de venta"
    value={product.sale_price}
    onChange={(e) => setProduct({ ...product, sale_price: Number(e.target.value) })}
  />
  <input
    type="number"
    placeholder="Stock inicial"
    value={product.stock}
    onChange={(e) => setProduct({ ...product, stock: Number(e.target.value) })}
  />
  {error && <p>{error}</p>}
  <button type="submit">{isNew ? "Crear" : "Guardar cambios"}</button>
</form>

      {!isNew && (
        <div>
          <h2>Stock actual: {product.stock}</h2>
          <form onSubmit={handleStockUpdate}>
            <input
              type="number"
              placeholder="Cantidad (negativo para restar)"
              value={stockAmount}
              onChange={(e) => setStockAmount(e.target.value)}
            />
            <button type="submit">Actualizar stock</button>
          </form>

          <h2>Movimientos</h2>
          {movements.length === 0 ? (
            <p>Sin movimientos</p>
          ) : (
            <ul>
              {movements.map((m, i) => (
                <li key={i}>
                  {m.quantity} - {m.created_at}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  )
}

export default ProductDetail