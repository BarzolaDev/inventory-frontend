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
    <div>
      <h1>Registro</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Usuario"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <p>{error}</p>}
        <button type="submit">Registrarse</button>
      </form>
      <Link to="/login">¿Ya tenés cuenta? Iniciá sesión</Link>
    </div>
  )
}

export default Register