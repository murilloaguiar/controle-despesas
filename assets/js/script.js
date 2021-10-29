const body = document.querySelector("body")

/*teste
body.onload = () =>{
    console.log('carregado')
    fetch('https://jsonplaceholder.typicode.com/comments')
                .then(resposta => resposta.text())
                .then(dados => console.log('comentarios: ',dados))
}*/

class Expense{
    constructor(day, month, category, description, value){
        this.day = day
        this.month = month
        this.category = category
        this.description = description
        this.value = value
    }

    validate(){
       
        for(let i in this){

			if(this[i] == undefined || this[i] == null || this[i] == ''){
                inputs.forEach(element=>{
                    if (element.value == "" || element.value == undefined || element.value == null) {
                        focusOutline(element, 0)
                        
                    }
               
                })
                createDivAlert("Existem campos para serem preenchidos")
                
				return false

			}else if (i == 'day' && (this[i] <= 0 || this[i] >31)) {
                
                createDivAlert("Existem erros corrija-os")
                return false
                        
            }else if (i == 'description' && this[i].length <=3) {
                
                createDivAlert("Existem erros corrija-os")
                return false
                        
            }else if (i == 'value' && (!(Number(this[i])) || this[i] <=0)) {
                
                createDivAlert("Existem erros corrija-os")
                return false
                        
            }
               
            
            
                
            
		}

        return true
    
        
    }
}


const inputs = document.querySelectorAll('.focus')
let button = document.querySelector("#insert")


button.addEventListener('click', insert)

function deleteDivAlert(id){

    let div_alert = document.querySelector(`div.div${id}`)

    if (div_alert != null) {

        div_alert.parentNode.removeChild(div_alert)

    }
    
 
}

function createDivAlert(message, id){

    deleteDivAlert(id)


    let div = document.createElement('div')
    div.className = `alert alert-danger mt-2 div${id}`
    div.innerHTML = message
    div.setAttribute("role", "alert") 

    let section = document.querySelector(".content")
    
    section.appendChild(div)

    
}

function insert(){

    let expense = new Expense(
        document.querySelector("#day").value,
        document.querySelector("#month").value,
        document.querySelector("#category").value,
        document.querySelector("#description").value,
        document.querySelector("#value").value,
    )

    console.log(expense)

    if (expense.validate()) {
        alert('produtos cadastrados')
    }
}

function focusOutline(element, id){
    if (id) {
        element.style.border = '2px solid #22b070'
    }else{
        element.style.border = '2px solid #df6464'
    }
}


inputs.forEach(element =>{
    element.addEventListener('focusout', ()=>{
        if (element.value != "") {
    
            if (element.id == 'day' && (element.value <= 0 || element.value >31)){
                focusOutline(element, 0)
                createDivAlert("Digite um dia entre 1 e 31", element.id)

            }else if(element.id == 'value' && (!(Number(element.value)) || element.value <=0)) {
                focusOutline(element, 0)
                createDivAlert("Digite um valor válido", element.id)

            }else if(element.id == 'description' && element.value.length <=3){
                focusOutline(element, 0)
                createDivAlert("Escreva uma descrição com mais de 3 caracteres", element.id)
                

            }else{
                focusOutline(element, 1)
                deleteDivAlert(element.id)
                
            }

        }else{
            element.style.border = ''
            deleteDivAlert(element.id)
        }
    })
})

