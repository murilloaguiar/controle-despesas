window.onload = ()=>{

    let modal = new bootstrap.Modal(document.querySelector('#modalWarning'))

    if (localStorage.getItem('permission')==0) {
        modal.show()
    }

    const button = document.querySelectorAll('button.permission')
    
    const permission = (id)=>{
        
        if (id==1) {
            localStorage.setItem('permission', 1)
        }
    }
    
    button.forEach(element=>{
        
        element.addEventListener('click',()=>{
            let id = element.getAttribute('permission')
            permission(id)
        })
    })
    
}