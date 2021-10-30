class Expense{
    constructor(day, month, year, category, description, value){
        this.day = day
        this.month = month
        this.year = year
        this.category = category
        this.description = description
        this.value = value
    }

    validate(){
        let mesage = 'Existem erros, corrijá-os antes de enviar novamente'

        for(let i in this){

			if(this[i] == undefined || this[i] == null || this[i] == ''){
                inputs.forEach(element=>{
                    if (element.value == "" || element.value == undefined || element.value == null) {
                        focusOutline(element, 2)
                    }
                })
                createDivAlert("Existem campos para serem preenchidos. Complete-os e envie novamente",'erro')
                
				return false

			}else if (i == 'day' && (!(Number(this[i])) || this[i] <= 0 || this[i] >31)) {
                
                createDivAlert(mesage,'erro')
                return false
                        
            }else if (i == 'description' && this[i].length <=3) {
                
                createDivAlert(mesage,'erro')
                return false
                        
            }else if (i == 'value' && (!(Number(this[i])) || this[i] <=0)) {
                
                createDivAlert(mesage,'erro')
                return false
                        
            }

		}

        return true   
    }
}// ------- /Expense

class Data{
    constructor(){
        let id = localStorage.getItem('id')

        if (id == null) {
            localStorage.setItem('id', 0)
        }
    }

    nextId(){
        let next_id = localStorage.getItem('id') 
        next_id = parseInt(next_id)
        next_id+=1
        return next_id
    }

    insert(expense){
        let id = this.nextId()
        localStorage.setItem(id, JSON.stringify(expense))
        localStorage.setItem('id', id)
    }

    getAllExpenses(){
        let id = localStorage.getItem('id')
        let expense = []
        

        for (let i = 1; i <= id; i++) {
            let item = JSON.parse(localStorage.getItem(i))
            //console.log(item)

            if (item == null) {
                continue
            }

            item.id = i

            expense.push(item)
            
        }

        return expense
    }

    searchExpense(expense){
        let filteredExpense = []

        filteredExpense = this.getAllExpenses()

        console.log(filteredExpense)
    }


}// ------ /Data

const inputs = document.querySelectorAll('.focus')

let data = new Data()
let date = new Date()

//body onload
function viewExpense(expense = [], filter = false){
    console.log(expense.length)
    if (expense.length == 0 && filter == false) {
        expense = data.getAllExpenses()
    }

    let tBody = document.querySelector('#tbody')

    expense.forEach(element =>{
        //console.log(element)
        let row = tBody.insertRow()

        //date
        row.insertCell(0).innerHTML = `${element.day}/${element.month}/${date.getFullYear()}`

        switch (element.category) {
            case '1':
                element.category = 'Alimentação'
                break;
        
            case '2':
                element.category = 'Casa'
                break;
            case '3':
                element.category = 'Lazer'
                break;
            case '4':
                element.category = 'Transporte'
                break;
        }

        // category
        row.insertCell(1).innerHTML = `${element.category}`

        // description
        row.insertCell(2).innerHTML = `${element.description}`

        // value
        row.insertCell(3).innerHTML = `R$ ${element.value}`
    })
}

// button onclick index page
function submit(){

    let day = document.querySelector("#day")
    let month = document.querySelector("#month")
    let category = document.querySelector("#category")
    let description = document.querySelector("#description")
    let value = document.querySelector("#value")
    
    let expense = new Expense(
        day.value, 
        month.value,
        date.getFullYear(), 
        category.value, 
        description.value, 
        Number(value.value)
    )

    console.log()

    if (expense.validate()) {

        inputs.forEach(element=>{
            focusOutline(element, 3)
            element.value = ""
        })

        deleteDivAlert('erro')

        data.insert(expense)
        
        alert('produtos cadastrados')
    }
}

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

function focusOutline(element, id){
    if (id==1) {
        element.style.border = '2px solid #22b070'
    }else if(id==2){
        element.style.border = '2px solid #df6464'
    }else if(id==3){
        element.style.border = ''
    }
}

inputs.forEach(element =>{
    element.addEventListener('focusout', ()=>{

        if (element.value != "") {
    
            if (element.id == 'day' && (!(Number(element.value)) || element.value <= 0 || element.value >31)){
                focusOutline(element, 2)
                createDivAlert("Digite um dia entre 1 e 31", element.id)

            }else if(element.id == 'value' && (!(Number(element.value)) || element.value <=0)) {
                focusOutline(element, 2)
                createDivAlert("Digite um valor válido", element.id)

            }else if(element.id == 'description' && element.value.length <=3){
                focusOutline(element, 2)
                createDivAlert("Escreva uma descrição com mais de 3 caracteres", element.id)
            
            }else{
                focusOutline(element, 1)
                deleteDivAlert(element.id)     
            }

        }else{
            focusOutline(element, 3)
            deleteDivAlert(element.id)
            
        }
    }) 
})


