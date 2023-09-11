const form = document.getElementById("novoItem");
const lista = document.getElementById('lista');

//array de objetos inicializado para poder salvar todos os elementos criados nesta lista
const itens = JSON.parse(localStorage.getItem("itens")) || []; 
// itens vai pegar os dados no localStorage, se nao inicializara uma array vazia;

itens.forEach( (elemento) => { 
    criaElemento(elemento);
} );

form.addEventListener("submit", (evento) => {
    evento.preventDefault();

    const nome = evento.target.elements['nome'];
    const quantidade = evento.target.elements['quantidade']

    const existe = itens.find( elemento => elemento.nome === nome.value);


    const itemAtual = {
        "nome": nome.value,
        "quantidade": quantidade.value
    };

    if (existe) {
        itemAtual.id = existe.id;

        AtualizaElemento(itemAtual);

        itens[itens.findIndex(elemento => elemento.id === existe.id)] = itemAtual


    } else {
      itemAtual.id =  itens[itens.length -1] ? (itens[itens.length -1]).id + 1 : 0;

      criaElemento(itemAtual);
      
      itens.push(itemAtual);  
    }

    localStorage.setItem("itens", JSON.stringify(itens));
      // a funcao JSON.stringify transforma objeto js em uma string

    nome.value = "";
    quantidade.value = "";
});

function criaElemento(item){

    const novoItem = document.createElement('li'); //cria novo elemento numa tag li
    novoItem.classList.add("item");//set a classe item para o novo elemento

    const numeroItem = document.createElement('strong'); //cria um elemento com tag strong
    numeroItem.innerHTML = item.quantidade;
    numeroItem.dataset.id = item.id;
    
    novoItem.appendChild(numeroItem);

    novoItem.innerHTML += item.nome;

    novoItem.appendChild(criarBotaoDelete(item.id));

    lista.appendChild(novoItem);
}

function AtualizaElemento(item){
    
    document.querySelector("[data-id='" + item.id + "']").innerHTML = item.quantidade;
}


function criarBotaoDelete(id){
    const elementoBotao = document.createElement("button");
    elementoBotao.innerText = 'X';

    elementoBotao.addEventListener("click", function() {
        deletarElemento(this.parentNode, id);
    });

    return elementoBotao;
}

function deletarElemento(tag, id){
    tag.remove(); 

    itens.splice(itens.findIndex(elemento => elemento.id === id), 1);

    localStorage.setItem("itens", JSON.stringify(itens));

}