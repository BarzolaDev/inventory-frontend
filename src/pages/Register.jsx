import { useState, useCallback } from "react"
import { useNavigate, Link } from "react-router-dom"
import { motion } from "framer-motion"
import ParticlesBackground from "../components/ParticlesBackground"
import Particles from "react-tsparticles"
import { loadSlim } from "tsparticles-slim"
import { register } from "../services/api"

function Register() {
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const navigate = useNavigate()

  const particlesInit = useCallback(async (engine) => {
    await loadSlim(engine)
  }, [])

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
    <div className="min-h-screen bg-black flex items-center justify-center relative">
      <ParticlesBackground />

      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="relative z-10 bg-black border border-green-500 p-8 rounded-2xl w-full max-w-sm shadow-lg shadow-green-500/20"
      >
        <h1 className="text-2xl font-bold text-green-400 mb-1">Crear cuenta</h1>
        <p className="text-green-600 text-sm mb-6">Completá los datos para registrarte</p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Usuario"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="bg-black border border-green-800 rounded-lg px-4 py-2.5 text-sm text-green-400 placeholder-green-900 outline-none focus:border-green-400 transition"
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-black border border-green-800 rounded-lg px-4 py-2.5 text-sm text-green-400 placeholder-green-900 outline-none focus:border-green-400 transition"
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-black border border-green-800 rounded-lg px-4 py-2.5 text-sm text-green-400 placeholder-green-900 outline-none focus:border-green-400 transition"
          />
          {error && <p className="text-red-400 text-sm">{error}</p>}
          <button
            type="submit"
            className="bg-green-500 hover:bg-green-400 text-black rounded-lg py-2.5 text-sm font-bold transition"
          >
            Registrarse
          </button>
        </form>

        <p className="text-center text-sm text-green-800 mt-4">
          ¿Ya tenés cuenta?{" "}
          <Link to="/login" className="text-green-500 hover:underline">
            Iniciá sesión
          </Link>
        </p>
      </motion.div>
    </div>
  )
}

export default Register