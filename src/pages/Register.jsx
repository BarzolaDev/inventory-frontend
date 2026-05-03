import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { register } from "../services/api"

function Register() {
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    const data = await register(username, email, password)
    if (data.id) {
      navigate("/login")
    } else {
      setError("Error al registrarse, intentá de nuevo")
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-2xl shadow-sm w-full max-w-sm">
        <h1 className="text-2xl font-bold text-gray-800 mb-1">Crear cuenta</h1>
        <p className="text-gray-400 text-sm mb-6">Completá los datos para registrarte</p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Usuario"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="border border-gray-200 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-blue-400 transition"
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border border-gray-200 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-blue-400 transition"
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border border-gray-200 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-blue-400 transition"
          />
          {error && <p className="text-red-400 text-sm">{error}</p>}
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white rounded-lg py-2.5 text-sm font-medium transition"
          >
            Registrarse
          </button>
        </form>

        <p className="text-center text-sm text-gray-400 mt-4">
          ¿Ya tenés cuenta?{" "}
          <Link to="/login" className="text-blue-500 hover:underline">
            Iniciá sesión
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Register