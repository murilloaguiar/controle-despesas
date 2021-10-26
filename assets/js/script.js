const body = document.querySelector("body")

/*teste
body.onload = () =>{
    console.log('carregado')
    fetch('https://jsonplaceholder.typicode.com/comments')
                .then(resposta => resposta.text())
                .then(dados => console.log('comentarios: ',dados))
}*/

let button = document.querySelector("#insert")
let inputs = document.querySelectorAll('.focus')

button.addEventListener('click', validate)

function createDivAlert(message){
    let div_alert = document.querySelectorAll("div.alert")
    div_alert.forEach(div=>{
        div.classList.add("d-none")
    })

    let div = document.createElement('div')
    div.className = "alert alert-danger mt-2"
    div.innerHTML = message
    div.setAttribute("role", "alert") 

    let section = document.querySelector(".content")
    
    section.appendChild(div)
}

function validate(){
    inputs.forEach(element=>{
        if (element.value == "" || element.value == undefined || element.value == null) {
            element.style.border = '2px solid #df6464'
            createDivAlert("Existem campos para serem preenchidos")
        }
        
        if (element.id == 'day' && (element.value <= 0 || element.value >31)) {
            console.log('entramos')
            createDivAlert("Digite um dia entre 1 e 31")
        }
    })

}


inputs.forEach(element =>{
    element.addEventListener('focusout', ()=>{
        if (element.value != "") {
            if (element.id == 'day' && (element.value <= 0 || element.value >31)) {
                element.style.border = '2px solid #df6464'
            }else{
                element.style.border = '2px solid #22b070'
            }
            
        }else{
            element.style.border = ''
        }
    })
})