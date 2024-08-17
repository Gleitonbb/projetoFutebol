const time01 = document.querySelector("#time01")
const time02 = document.querySelector("#time02")
const time03 = document.querySelector("#time03")
const time04 = document.querySelector("#time04")
const time05 = document.querySelector("#time05")
const time06 = document.querySelector("#time06")
const time07 = document.querySelector("#time07")
const time08 = document.querySelector("#time08")

const CaixaTimeEscolhido01 = document.querySelector("#CaixaTimeEscolhido01")
const CaixaTimeEscolhido02 = document.querySelector("#CaixaTimeEscolhido02")
const CaixaTimeEscolhido03 = document.querySelector("#CaixaTimeEscolhido03")
const CaixaTimeEscolhido04 = document.querySelector("#CaixaTimeEscolhido01")

const BotaoEscolher01 = document.querySelector("#BotaoEscolher01")

const confronto01 = [time01,time02]
confronto01.map((upu)=>{
    upu.addEventListener("click", (evt)=>{
        const tiClicado01 = evt.target

         // Evita que o clique na imagem propague para a div
         if (tiClicado01.tagName.toLowerCase() === 'img') {
            evt.stopPropagation();
            return;
        }
        tiClicado01.classList.toggle("destacar01")
        console.log(tiClicado01)
    })
})
 BotaoEscolher01.addEventListener("click", (evt)=>{
  const timeAdd = [...document.querySelectorAll(".destacar01")]
  timeAdd.map((umum)=>{
    const TimeEscolhido01 = umum
    CaixaTimeEscolhido01.appendChild(TimeEscolhido01)
  })
 })