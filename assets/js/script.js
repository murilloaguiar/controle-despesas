//teste
body.onload = () =>{
    console.log('carregado')
    fetch('https://jsonplaceholder.typicode.com/comments')
                .then(resposta => resposta.text())
                .then(dados => console.log('comentarios: ',dados))
}