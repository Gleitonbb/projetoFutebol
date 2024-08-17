const tenantId = localStorage.getItem('tenantId')

const Time01 = document.querySelector("#Time01")
const Time02 = document.querySelector("#Time02")
const Time03 = document.querySelector("#Time03")
const Time04 = document.querySelector("#Time04")
const Time05 = document.querySelector("#Time05")
const Time06 = document.querySelector("#Time06")
const Time07 = document.querySelector("#Time07")
const Time08 = document.querySelector("#Time08")
const CaixaEscolhido01 = document.querySelector("#CaixaEscolhido01")
const CaixaEscolhido02 = document.querySelector("#CaixaEscolhido02")
const CaixaEscolhido03 = document.querySelector("#CaixaEscolhido03")
const CaixaEscolhido04 = document.querySelector("#CaixaEscolhido04")
const caixaTime01 = document.querySelector("#caixaTime01")
const caixaTime02 = document.querySelector("#caixaTime02")
const caixaTime03 = document.querySelector("#caixaTime03")
const caixaTime04 = document.querySelector("#caixaTime04")

const botaoEnviar01 = document.querySelector("#botaoEnviar01")
const botaoEnviar02 = document.querySelector("#botaoEnviar02")
const botaoEnviar03 = document.querySelector("#botaoEnviar03")
const botaoEnviar04 = document.querySelector("#botaoEnviar04")
const botaoCancelar01 = document.querySelector("#botaoCancelar01")
const botaoCancelar02 = document.querySelector("#botaoCancelar02")
const botaoCancelar03 = document.querySelector("#botaoCancelar03")
const botaoCancelar04 = document.querySelector("#botaoCancelar04")

const BotaoEnviarTimes = document.querySelector("#BotaoEnviarTimes")

const txtTime = document.querySelector("#txtTime")

// -----------Primeiro Jogo -------------------------

    const timeEscolhido = [Time01, Time02];
    timeEscolhido.map((upu)=>{
        upu.addEventListener("click",(evt)=>{
            const timeClicado = evt.target
            timeClicado.classList.toggle("destacar01")
         timeEscolhido.forEach(Div =>{
            if(Div !== timeClicado){
                Div.classList.remove("destacar01")
            }
         })
        })
    })
    botaoEnviar01.addEventListener("click",(evt)=>{
        const pegarTime = [...document.querySelectorAll(".destacar01")]
        pegarTime.map((upu)=>{
            if(CaixaEscolhido01.innerHTML === ""){
                 CaixaEscolhido01.appendChild(upu)
                 upu.classList.remove("destacar")
            }
        })
    })
    botaoCancelar01.addEventListener("click",(evt)=>{
        const retornarTime = [...document.querySelectorAll(".destacar01")]
        retornarTime.map((upu)=>{
            caixaTime01.appendChild(upu)
        })
})

    
// -----------Segundo Jogo -------------------------

const timeEscolhido02 = [Time03, Time04];
timeEscolhido02.map((upu)=>{
    upu.addEventListener("click",(evt)=>{
        const timeClicado02 = evt.target
        timeClicado02.classList.toggle("destacar02")
     timeEscolhido02.forEach(Div =>{ 
        if(Div !== timeClicado02){
            Div.classList.remove("destacar02")
        }
     })
    })
})
botaoEnviar02.addEventListener("click",(evt)=>{
    const pegarTime02 = [...document.querySelectorAll(".destacar02")]
    pegarTime02.map((upu)=>{
        if(CaixaEscolhido02.innerHTML === ""){
             CaixaEscolhido02.appendChild(upu)
             upu.classList.remove("destacar02")
        }
    })
  
})
botaoCancelar02.addEventListener("click",(evt)=>{
    const retornarTime02 = [...document.querySelectorAll(".destacar02")]
    retornarTime02.map((upu)=>{
        caixaTime02.appendChild(upu)
    })

})

// -----------Terceiro Jogo -------------------------

const timeEscolhido03 = [Time05, Time06];
timeEscolhido03.map((upu)=>{
    upu.addEventListener("click",(evt)=>{
        const timeClicado03 = evt.target
        timeClicado03.classList.toggle("destacar03")
     timeEscolhido03.forEach(Div =>{ 
        if(Div !== timeClicado03){
            Div.classList.remove("destacar03")
        }
     })
    })
})
botaoEnviar03.addEventListener("click",(evt)=>{
    const pegarTime03 = [...document.querySelectorAll(".destacar03")]
    pegarTime03.map((upu)=>{
        if(CaixaEscolhido03.innerHTML === ""){
             CaixaEscolhido03.appendChild(upu)
             upu.classList.remove("destacar03")
        }
    })
  
})
botaoCancelar03.addEventListener("click",(evt)=>{
    const retornarTime03 = [...document.querySelectorAll(".destacar03")]
    retornarTime03.map((upu)=>{
        caixaTime03.appendChild(upu)
    })

})

// -----------quarta Jogo -------------------------

const timeEscolhido04 = [Time07, Time08];
timeEscolhido04.map((upu)=>{
    upu.addEventListener("click",(evt)=>{
        const timeClicado04 = evt.target
        timeClicado04.classList.toggle("destacar04")
     timeEscolhido04.forEach(Div =>{ 
        if(Div !== timeClicado04){
            Div.classList.remove("destacar04")
        }
     })
    })
})
botaoEnviar04.addEventListener("click",(evt)=>{
    const pegarTime04 = [...document.querySelectorAll(".destacar04")]
    pegarTime04.map((upu)=>{
        if(CaixaEscolhido04.innerHTML === ""){
             CaixaEscolhido04.appendChild(upu)
             upu.classList.remove("destacar04")
        }
    })
  
})
botaoCancelar04.addEventListener("click",(evt)=>{
    const retornarTime04 = [...document.querySelectorAll(".destacar04")]
    retornarTime04.map((upu)=>{
        caixaTime04.appendChild(upu)
    })

})

const pegarTimeEscolhido = async () =>{//função para pegar vincular nome de times com a imagem
    const time01 = CaixaEscolhido01.textContent
    const time02 = CaixaEscolhido02.textContent
    const time03 = CaixaEscolhido03.textContent
    const time04 = CaixaEscolhido04.textContent

    console.log(time01)
    console.log(time02)
    console.log(Time03)
    console.log(time04)
    console.log(tenantId)
    
    const dados = {
        tenantId,
        time01,
        time02,
        time03,
        time04
    }
    try{
      const endPoint = "http://localhost:3000/timeganhador"
      const response = await fetch(endPoint, {
        method: "POST",
        headers: {
            "Content-Type":"application/json",
            "Authorization":`Bearer ${localStorage.getItem("token")}`// enviando o token de autorização
       },
       body: JSON.stringify(dados) // Adicionando o corpo da requisição
   })
      if(!response.ok){
        throw new error("erro ao enviar dados para o banco  de dados")
      }

      const result = await response.json()
      alert(result.message)
    } catch(error){
        console.error('Erro:', error.message)
        alert('Erro ao enviar os dados dos times.')
    }
}

BotaoEnviarTimes.addEventListener("click",(evt)=>{
    evt.preventDefault()
    pegarTimeEscolhido()
   
})