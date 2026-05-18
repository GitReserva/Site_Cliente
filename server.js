import express from 'express'
import cors from 'cors'
import mysql from 'mysql2/promise'

const app = express()
const PORT = process.env.PORT || 3000 // porta local onde o backend ficará disponível

const DB_CONFIG = {
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT || 3306),
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '12345678',
  database: process.env.DB_NAME || 'bd_SiteCliente',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  /* Configuração de conexão com o MySQL para a tabela ItemsCardapio */
}

app.use(cors({ origin: ['http://localhost:5173'] })) // permite requisições do frontend Vite rodando localmente
app.use(express.json())

app.get('/api/cardapio', async (req, res) => {
  let connection

  try {
    connection = await mysql.createConnection(DB_CONFIG)
    const [rows] = await connection.execute(
      'SELECT ItemId, Nome, Preço AS Preco, ServePessoas, LinkImagem FROM ItemsCardapio ORDER BY ItemId',
    )

    return res.json(rows) // retorna os registros do banco como JSON para o frontend
  } catch (error) {
    console.error('Erro ao buscar cardápio:', error)
    return res.status(500).json({ error: 'Erro ao buscar itens do cardápio.' })
  } finally {
    if (connection) {
      await connection.end() // garante que a conexão com o banco seja liberada
    }
  }
})

// Rota de login: verifica se o usuário existe e se a senha confere
app.post('/api/login', async (req, res) => {
  const { nome, senha } = req.body
  if (!nome || !senha) {
    return res.status(400).json({ error: 'Nome e senha são obrigatórios.' })
  }

  let connection
  try {
    connection = await mysql.createConnection(DB_CONFIG)
    const [rows] = await connection.execute(
      'SELECT ClienteId, Nome, Senha FROM Cliente WHERE Nome = ? LIMIT 1',
      [nome],
    )

    if (rows.length === 0) {
      return res.status(404).json({ error: 'Usuário não encontrado.' })
    }

    const user = rows[0]
    // comparação simples — a senha no banco é armazenada em texto neste projeto
    if (user.Senha !== senha) {
      return res.status(401).json({ error: 'Senha incorreta.' })
    }

    // autenticação bem-sucedida — retorna apenas id e nome
    return res.json({ ClienteId: user.ClienteId, Nome: user.Nome })
  } catch (error) {
    console.error('Erro na autenticação:', error)
    return res.status(500).json({ error: 'Erro interno no servidor.' })
  } finally {
    if (connection) await connection.end()
  }
})

app.get('/api/cliente/:id', async (req, res) => {
  const { id } = req.params
  let connection

  try {
    connection = await mysql.createConnection(DB_CONFIG)
    const [rows] = await connection.execute(
      'SELECT ClienteId, Nome, Cpf, Senha FROM Cliente WHERE ClienteId = ? LIMIT 1',
      [id],
    )

    if (rows.length === 0) {
      return res.status(404).json({ error: 'Cliente não encontrado.' })
    }

    return res.json(rows[0])
  } catch (error) {
    console.error('Erro ao buscar cliente:', error)
    return res.status(500).json({ error: 'Erro interno no servidor.' })
  } finally {
    if (connection) await connection.end()
  }
})

app.listen(PORT, () => {
  console.log(`API do cardápio rodando em http://localhost:${PORT}`) // inicia o servidor backend
})
