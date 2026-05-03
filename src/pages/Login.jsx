import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { login } from "../services/api"

function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    const data = await login(email, password)
    if (data.access_token) {
      localStorage.setItem("token", data.access_token)
      navigate("/products")
    } else {
      setError("Email o contraseña incorrectos")
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-2xl shadow-sm w-full max-w-sm">
        <h1 className="text-2xl font-bold text-gray-800 mb-1">Bienvenido</h1>
        <p className="text-gray-400 text-sm mb-6">Iniciá sesión para continuar</p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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
            Entrar
          </button>
        </form>

        <p className="text-center text-sm text-gray-400 mt-4">
          ¿No tenés cuenta?{" "}
          <Link to="/register" className="text-blue-500 hover:underline">
            Registrate
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Login