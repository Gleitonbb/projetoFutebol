const txtUsuario = document.querySelector("#txtUsuario")
const txtSenha = document.querySelector("#txtSenha")
const botaoEnviar= document.querySelector("#botaoEnviar")
const botaoLogin = document.querySelector("#botaoLogin")


const fazerLogin = async () =>{
const usuario = txtUsuario.value
const senha = txtSenha.value 
try{
  const endPoint = "http://localhost:3000/login"
  const response = await fetch(endPoint, {
    method: "POST",
    headers: {"Content-Type":"application/json"},
    body: JSON.stringify({usuario, senha})
  })
  if(!response.ok) {
    throw new Error("erro ao fazer login")
  }
  const { token } = await response.json()
  // Armazenar o token JWT no localStorage
  localStorage.setItem("token", token)
  
  window.location.href = "jogador.html"
}catch(error){
    console.error('Erro:', error.message);
    alert('Usuário ou senha incorretos.');
}
}



botaoLogin.addEventListener("click",()=>{
    window.location.href = 'cadastroUsuario.html'
})
botaoEnviar.addEventListener("click",(evt)=>{
   evt.preventDefault()
   fazerLogin()
})
