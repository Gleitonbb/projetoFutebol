const express = require('express')
const mysql = require('mysql2/promise')
const cors = require('cors')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { v4: uuidv4 } = require('uuid')

const porta = process.env.PORT || 3000

const app = express()
app.use(cors())
app.use(express.json())

const conectar = async () => {
    if (global.conexao && global.conexao.state != 'disconnected')
        return global.conexao
    const con = await mysql.createConnection('mysql://root:123456@localhost:3306/jogomamute')
    console.log('Conectou ao banco de dados')
    global.conexao = con

    return con
}
conectar()

// Middleware para verificar o token JWT
const verificarToken = (req, res, next) => {
    const token = req.headers['authorization']
    if (!token) {
        return res.status(403).json({ message: 'Token não fornecido' })
    }
    jwt.verify(token.split(' ')[1], 'your_secret_key', (err, decoded) => {
        if (err) {
            return res.status(500).json({ message: 'Falha ao autenticar token' })
        }
        req.tenantId = decoded.tenantId // Adiciona o tenantId ao request
        next()
    })
}

// Rota de cadastro de usuário
const inserirUsuario = async (usuario) => {
    try {
        const conexao = await conectar()
        const tenantId = uuidv4() // Gera um identificador único para o tenantId
        const senhaHashed = await bcrypt.hash(usuario.senha, 10) // Hash da senha
        const sql = 'INSERT INTO cadastro (nome, tenantid, telefone, email, usuario, senha) VALUES (?, ?, ?, ?, ?, ?)'
        const valores = [usuario.nome, tenantId, usuario.telefone, usuario.email, usuario.usuario, senhaHashed]
        await conexao.execute(sql, valores)

        const authSql = 'INSERT INTO autenticacao (tenantid, usuario, senha) VALUES (?, ?, ?)'
        const authValores = [tenantId, usuario.usuario, senhaHashed]
        await conexao.execute(authSql, authValores)

        return tenantId
    } catch (erro) {
        console.error(erro)
        throw erro
    }
}

app.post('/cadastro', async (req, res) => {
    try {
        const usuario = req.body
        const tenantId = await inserirUsuario(usuario)
        res.status(201).json({ message: 'Usuário cadastrado com sucesso no banco de dados' })
    } catch (erro) {
        res.status(500).json({ message: 'Erro ao cadastrar usuário no banco de dados' })
    }
})

// Rota de autenticação de usuário
const autenticarUsuario = async (usuario, senha) => {
    try {
        const conexao = await conectar()
        const sql = "SELECT * FROM cadastro WHERE usuario = ?"
        const [rows] = await conexao.execute(sql, [usuario])
        const user = rows[0]

        if (user && await bcrypt.compare(senha, user.senha)) {
            const token = jwt.sign({ tenantId: user.tenantid }, 'your_secret_key', { expiresIn: '1h' })
            return { token, tenantId: user.tenantid } // Incluindo tenantId na resposta
        } else {
            throw new Error('Credenciais inválidas')
        }
    } catch (erro) {
        console.error(erro)
        throw erro
    }
}

app.post('/login', async (req, res) => {
    const { usuario, senha } = req.body

    try {
        const authData = await autenticarUsuario(usuario, senha)
        res.json(authData)
    } catch (erro) {
        res.status(401).json({ message: erro.message })
    }
})

// Rota para gerenciar time ganhador
const inserirTimeGanhador = async (time) => {
    try {
        const conexao = await conectar()
        const sql = "INSERT INTO timeganhador (tenantid, time01, time02, time03, time04) VALUES (?, ?, ?, ?, ?)"
        const valores = [time.tenantId, time.time01, time.time02, time.time03, time.time04]
        await conexao.execute(sql, valores)
    } catch (erro) {
        console.error(erro)
        throw erro
    }
}

app.post('/timeganhador', verificarToken, async (req, res) => {
    try {
        const time = req.body
        time.tenantId = req.tenantId // Adiciona o tenantId ao time
        await inserirTimeGanhador(time)
        res.status(201).json({ message: 'Time ganhador inserido com sucesso no banco de dados' })
    } catch (erro) {
        res.status(500).json({ message: 'Erro ao inserir dados no banco de dados' })
    }
})

app.listen(porta, () => {
    console.log(`Servidor rodando na porta ${porta}`)
})