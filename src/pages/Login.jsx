import { useState, useEffect, useCallback } from "react"
import { useNavigate, Link } from "react-router-dom"
import { motion } from "framer-motion"
import Particles from "react-tsparticles"
import { loadSlim } from "tsparticles-slim"
import { login } from "../services/api"

function TypingText({ text }) {
  const [displayed, setDisplayed] = useState("")

  useEffect(() => {
    let i = 0
    const interval = setInterval(() => {
      setDisplayed(text.slice(0, i + 1))
      i++
      if (i === text.length) clearInterval(interval)
    }, 60)
    return () => clearInterval(interval)
  }, [text])

  return (
    <h1 style={{ fontFamily: "'Fira Code', monospace" }} className="relative z-10 text-xl md:text-3xl font-bold text-green-400 mb-12 text-center px-4 font-mono">
      {displayed}<span className="animate-pulse">_</span>
    </h1>
  )
}

function Login() {
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
    const data = await login(email, password)
    if (data.access_token) {
      localStorage.setItem("token", data.access_token)
      navigate("/products")
    } else {
      setError("Email o contraseña incorrectos")
    }
  }

  return (
     <div className="min-h-screen bg-black flex flex-col items-center justify-center relative">
      <Particles
        init={particlesInit}
        options={{
          background: { color: { value: "#000000" } },
          particles: {
            number: { value: 80 },
            color: { value: "#00ff00" },
            opacity: { value: 0.5 },
            size: { value: 3 },
            move: { enable: true, speed: 1 },
            links: {
              enable: true,
              color: "#00ff00",
              opacity: 0.2
            }
          }
        }}
        className="absolute inset-0"
      />

      <TypingText text="THE FUTURE IS NOW FKN OLD MAN" />

      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="relative z-10 bg-black border border-green-500 p-8 rounded-2xl w-full max-w-sm shadow-lg shadow-green-500/20"
      >
        <h1 className="text-2xl font-bold text-green-400 mb-1">Bienvenido</h1>
        <p className="text-green-600 text-sm mb-6">Iniciá sesión para continuar</p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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
            Entrar
          </button>
        </form>

        <p className="text-center text-sm text-green-800 mt-4">
          ¿No tenés cuenta?{" "}
          <Link to="/register" className="text-green-500 hover:underline">
            Registrate
          </Link>
        </p>
      </motion.div>
    </div>
  )
}

export default Login