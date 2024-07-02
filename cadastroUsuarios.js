const txtNome = document.querySelector("#txtNome")
const txtFone = document.querySelector("#txtFone")
const txtEmail = document.querySelector("#txtEmail")
const txtUsuario = document.querySelector("#txtUsuario")
const txtSenha = document.querySelector("#txtSenha")
const botaoEnviar = document.querySelector("#botaoEnviar")
const botaoLogin = document.querySelector("#botaoLogin")

const cadastrarUsuario = async ()=>{
    const nome = txtNome.value
    const telefone = txtFone.value
    const email = txtEmail.value
    const usuario = txtUsuario.value
    const senha = txtSenha.value
    console.log(`nome-${nome}, Telefone-${telefone}, Email-${email}, Usuario${usuario}, Senha-${senha}`)
    const dados = {
        nome,
        telefone,
        email,
        usuario,
        senha
     }
    try{
       const endPoint = "http://localhost:3000/cadastro"
       const response = await fetch(endPoint, {
        method: "POST",
        headers: {"Content-Type":"application/json"},
        body:JSON.stringify(dados)
       })
       if(response.ok) {
       const resultado = await response.json()
    //    console.log("Usuario cadastrado com sucesso! tenant ID: " + resultado.tenantid)
       }else{
        const erro = await response.json()
       console.log("erro ao cadastrar usuário:" +erro.message)
       }
       
    }catch(error){ 
        console.error('Erro:', error)
        alert('Erro ao cadastrar usuário.')
    }
}
botaoEnviar.addEventListener("click",(evt)=>{
    evt.preventDefault()
    cadastrarUsuario()
})
botaoLogin.addEventListener("click",()=>{
     window.location.href = 'telaDeLogin.html'
})
