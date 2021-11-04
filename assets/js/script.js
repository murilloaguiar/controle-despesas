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

        let permission = localStorage.getItem('permission')

        if (permission == null) {
            localStorage.setItem('permission', 0)
        }

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
        if (localStorage.getItem('permission')==1) {
            let id = this.nextId()
            localStorage.setItem(id, JSON.stringify(expense))
            localStorage.setItem('id', id) 
        }
        
    }

    getAllExpenses(){
        let id = localStorage.getItem('id')
        let expense = []
        

        for (let i = 1; i <= id; i++) {
            let item = JSON.parse(localStorage.getItem(i))
            
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
        console.log(expense)

       if (expense.day != "") {
            filteredExpense = filteredExpense.filter(value => value.day == expense.day)
        }

        if (expense.month != "") {
            filteredExpense = filteredExpense.filter(value => value.month == expense.month)
        }

        if (expense.category != "") {
            filteredExpense = filteredExpense.filter(value => value.category == expense.category)
        }

        if (expense.description != "") {
            filteredExpense = filteredExpense.filter(value => value.description == expense.description)
        }

        if (expense.value != "") {
            filteredExpense = filteredExpense.filter(value => value.value == expense.value)
        }

        return filteredExpense
    }

    removeExpense(key){
        alert('removendo a despesa '+key)
        localStorage.removeItem(key)
    }

    removeAllExpenses(){
        localStorage.clear()
        localStorage.setItem('permission', 0)
    }


}// ------ /Data

const inputs = document.querySelectorAll('.focus')

let data = new Data()
let date = new Date()

//body onload
function viewExpense(expense = [], filter = false){
    
    if (expense.length == 0 && filter == false) {
        expense = data.getAllExpenses()
    }

    let id = localStorage.getItem('id')

    if (id == 0) {
        createP("Ainda não existem despesas cadastradas")
    }

    let tBody = document.querySelector('#tbody')
    tBody.innerHTML = ""
 
    expense.forEach(element =>{
    
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

        buttonRemove = document.createElement('i')
        buttonRemove.className = "btn btn-danger far fa-trash-alt"
        buttonRemove.id = element.id
        
        buttonRemove.onclick = ()=>{
            data.removeExpense(event.target.id)
            window.location.reload()
        }

        row.insertCell(4).append(buttonRemove)
    })
}

// button onclick index page
const submit = ()=>{

    if (localStorage.getItem('permission')==1) {
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

        if (expense.validate()) {

            inputs.forEach(element=>{
                focusOutline(element, 3)
                element.value = ""
            })

            deleteDivAlert('erro')

            data.insert(expense)
            
            let modal = new bootstrap.Modal(document.querySelector('#modalSuccess'))

            modal.show()
        }
    }else{

        inputs.forEach(element=>{
            focusOutline(element, 3)
            element.value = ""
        })
        createDivAlert('Você optou por não salvar os dados', 'permission0')
    }

    
}

// button onclick view page
const filter = ()=>{
    let day = document.querySelector("#day").value
    let month = document.querySelector("#month").value
    let category = document.querySelector("#category").value
    let description = document.querySelector("#description").value
    let value = document.querySelector("#value").value

    let expense = new Expense(
        day,
        month,
        date.getFullYear(), 
        category,
        description,
        Number(value)
    )
    
    let expenses = data.searchExpense(expense)
    console.log(expenses)
    
    if (expenses.length == 0) {
        createP("Não encontramos nenhuma depesa para o filtro")
    }else{
        deleteP()
    }
    
    viewExpense(expenses,true)
}

const deleteAll = (load = false)=>{
    data.removeAllExpenses()
    if (load) {
        window.location.reload()
    }
}

const createP = (mesage)=>{

    deleteP()

    let header = document.querySelector('header.header-table')

    let p = document.createElement('p')
    p.innerHTML = mesage
    p.className = "text-danger"

    header.appendChild(p)
}

const deleteP = ()=>{
    let p = document.querySelector('header.header-table p')

    if (p != null) {
        p.parentNode.removeChild(p)
    }
    
    
}

const deleteDivAlert = id=>{

    let div_alert = document.querySelector(`div.div${id}`)

    if (div_alert != null) {

        div_alert.parentNode.removeChild(div_alert)
    }
}

const createDivAlert = (message, id)=>{

    deleteDivAlert(id)

    let div = document.createElement('div')
    div.className = `alert alert-danger mt-2 div${id}`
    div.innerHTML = message
    div.setAttribute("role", "alert") 

    let section = document.querySelector(".content")
    
    section.appendChild(div)
}

const focusOutline = (element, id)=>{
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


