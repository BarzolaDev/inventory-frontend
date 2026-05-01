import { useState } from 'react'

function Login({ onLogin }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  async function handleLogin() {
    setError('')
    const formData = new URLSearchParams()
    formData.append('username', email)
    formData.append('password', password)

    const response = await fetch('http://localhost:8000/users/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: formData
    })

    if (!response.ok) {
      setError('Credenciales inválidas')
      return
    }

    const data = await response.json()
    onLogin(data.access_token)
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="bg-gray-900 p-8 rounded-lg w-full max-w-md">
        <h2 className="text-cyan-400 text-2xl font-bold mb-6">Login</h2>
        <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} className="w-full bg-gray-800 text-white rounded p-3 mb-4 outline-none" />
        <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} className="w-full bg-gray-800 text-white rounded p-3 mb-6 outline-none" />
        {error && <p className="text-red-400 mb-4">{error}</p>}
        <button onClick={handleLogin} className="w-full bg-cyan-500 hover:bg-cyan-600 text-black font-bold rounded p-3">Iniciar sesión</button>
      </div>
    </div>
  )
}

export default Login