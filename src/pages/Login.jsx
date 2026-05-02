import { useState } from "react"
import { login } from "../services/auth"

function Login({ onLogin }) {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    async function handleLogin() {
        setError('')
        try {
            const data = await login(email, password)
            onLogin(data.access_token)
        } catch {
            setError('Credenciales inválidas')
        }
    }

    return (
  <div className="flex flex-col items-center justify-center min-h-screen">
    <div className="bg-gray-900 p-8 rounded-lg w-full max-w-md">
      <h2 className="text-cyan-400 text-2xl font-bold mb-6">Login</h2>
      <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} className="w-full bg-gray-800 text-white rounded p-3 mb-4 outline-none" />
      <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} className="w-full bg-gray-800 text-white rounded p-3 mb-6 outline-none" />
      {error && <p className="text-red-400 mb-4">{error}</p>}
      <button onClick={handleLogin} className="w-full bg-cyan-500 hover:bg-cyan-600 text-black font-bold rounded p-3">
        Iniciar sesión
      </button>
    </div>
  </div>
)
}

export default Login