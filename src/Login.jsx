import { useState } from 'react'
import './Login.css'
import logo from './assets/logo_cliente.png'

const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:3000'

function Login({ onLogin }) {
  const [nome, setNome] = useState('')
  const [senha, setSenha] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    // não limpar imediatamente o erro anterior para evitar renderização vazia
    if (!nome || !senha) {
      setError('Nome e senha são obrigatórios.')
      return
    }

    setLoading(true)
    try {
      const resp = await fetch(`${API_URL}/api/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome, senha }),
      })

      if (resp.status === 404) {
        setError('Usuário não encontrado.')
        return
      }

      if (resp.status === 401) {
        setError('Senha incorreta.')
        return
      }

      if (!resp.ok) {
        const data = await resp.json().catch(() => ({}))
        setError(data.error || 'Erro ao autenticar.')
        return
      }

      const data = await resp.json()
      // sucesso
      onLogin?.(data)
    } catch (err) {
      setError('Erro ao conectar com o servidor.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="login-page">
      <div className="login-card">
        <img src={logo} alt="Logo" className="login-logo" />
        <h2>Login</h2>
        <form className="login-form" onSubmit={handleSubmit}>
          <label>
            Nome
            <input
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              placeholder="Seu nome"
              required
            />
          </label>

          <label>
            Senha
            <input
              type="password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              placeholder="Senha"
              required
            />
          </label>

          <p className="login-error" aria-live="polite">{error || '\u00A0'}</p>

          <button type="submit" className="btn btn-login" disabled={loading}>
            {loading ? 'Verificando...' : 'Entrar'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default Login
