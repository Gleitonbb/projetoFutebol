const express = require('express')
const mysql = require('mysql2/promise')
const cors = require('cors')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {v4: uuidv4} = require('uuid')

const porta = process.env.PORT || 3000

const app = express()
app.use(cors())
app.use(express.json())

const conectar = async () =>{
    if(global.conexao && global.conexao.state != 'disconnected')
        return global.conexao
    const con = await mysql.createConnection('mysql://root:123456@localhost:3306/jogomamute')
    console.log('Conectou ao banco de dados')
    global.conexao = con

    return con
}
conectar()

//------------rota de cadastro de usuario----------------
const inserirUsuario = async (usuario) =>{
    try{
        const conexao = await conectar()
        const tenantId = uuidv4() //gera um indentificados unico para o tenantId
        const senhaHashed = await bcrypt.hash(usuario.senha, 10) // hash da senha
        const sql = 'INSERT INTO cadastro (nome, tenantid, telefone, email, usuario, senha) VALUES (?, ?, ?, ?, ?, ?)'
        const valores = [usuario.nome, tenantId, usuario.telefone, usuario.email, usuario.usuario, senhaHashed]
        await conexao.execute(sql, valores)

        const authSql = 'INSERT INTO autenticacao (tenantid, usuario, senha) VALUES (?, ?, ?)'
        const authValores = [tenantId, usuario.usuario, senhaHashed]
        await conexao.execute(authSql, authValores)

        return tenantId
  }catch (erro){
        console.error(erro)
        throw erro
    }
}

app.post('/cadastro', async (req, res)=>{
       try {
       const usuario = req.body
       const tenantId = await inserirUsuario(usuario)
       res.status(201).json({message: 'Usuario cadastrado com sucesso no banco de dados'})
       }catch(erro){
       res.status(500).json({message: 'erro ao cadastrar usuario no banco de dados'})
       }
})

//-----------rota de autenticação de usuario-----------

const autenticarUsuario = async (usuario, senha)=>{
  try{
   const conexao = await conectar()
   const sql = "SELECT * FROM cadastro WHERE usuario = ?"
   const [rows] = await conexao.execute(sql, [usuario])
   const user = rows[0]

   if(user && await bcrypt.compare(senha, user.senha)){
    const token = jwt.sign({ tenantId: user.tenantid}, 'your_secret_key', {expiresIn: '1h'})
    return {token}
   }else{
    throw new error('Credenciais invalidas')
   }
  }catch(erro){
    console.error(erro)
    throw erro
  }
}

app.post('/login', async(req, res) =>{
    const {usuario, senha} = req.body

    try{
        const authData = await autenticarUsuario(usuario, senha)
        res.json(authData)
    }catch(erro){
        res.status(401).json({message: erro.message})
    }
})

app.listen(porta, ()=>{
    console.log(`servidor rodando na porta ${porta}`)
})