import { produtosDeServicos } from "./services/produtos-services.js";


const containerDosCards = document.querySelector(".cards__container");
//primeiro, selecionei o container onde os cards serão criados de forma dinamica.
const formulario = document.querySelector(".formulario");


//agora, precisamos criar uma função que criar o cartão, dentro dessa função, criamos um elemento div e o atribuimos a uma constante chamada card; depois à esse card adicionamos uma classe que ja possui nome e estilização no css; Depois temos que adicionar um trecho de código a esse card usando o innerhtml

function criarCard (nome, preco, imagem, id) {
    const card = document.createElement("div");
    card.classList.add("card");

    card.innerHTML = `
        <img class="stormtrooper__card" src="${imagem}" alt="${id}">
        <p class="img__nome">${nome}</p>
            <div class="preco-e-icone" 
            <div class="game-box--preco-e-icone">
                <p class="preco">$${preco}</p>
                <img class="icone" src="./imgs/trash.png" alt=""> 
            </div>
        </div>`;

    //agora precisamos adicionar o card dentro do container com o appendChild.



    containerDosCards.appendChild(card);

    //aqui se criará a função de excluir os cards ao clicar na lixeira.
    //pegou-se o cartão, selecionou o icone da lixeira dentro do cartão e atibuiu a uma constante; Depois se adicionou o click e também a função de deletar o cartão vinda da api.
    const excluirCard = card.querySelector(".icone");
    excluirCard.addEventListener("click", () => produtosDeServicos.deletarProduto(id));
    
    return card;
}


//agora precisamos trazer os produtos do json para ca.
const mostrarCardsNaTela = async () => {
    try {
        const listaDeProdutos = await produtosDeServicos.listaDeProdutos();
        // console.log(listaDeProdutos);
        //mostrou no console, mas precisamos mostra-los na tela.
        //Para isso, é preciso fazer um loop que percorra todo o array e mostre esse array na tela.

        //

        listaDeProdutos.forEach((produto) => {
            containerDosCards.appendChild(criarCard(produto.nome, produto.preco, produto.imagem, produto.id));
        });
    } catch (error) {
        console.log(error)
    }

};

//tem que pegar a tag form e, dentro da função, pegar os campos também; Depois fazemos a requisição(post) trazendo a função que criamos para postar no produtos-services, junto com os parametros que são as constantes aqui dentro definidas.
formulario.addEventListener("submit", (evento) => {
    evento.preventDefault();
    const nome = document.querySelector("[form-nome]").value;
    const preco = document.querySelector("[form-valor]").value;
    const imagem = document.querySelector("[form-imagem]").value;

    //trazemos o export (produtosDeServicos), junto com a função que tem o metodo post que vai criar um novo produto (.criarProduto), seus parametros que são os valores dos campos, que criarão um novo card; então, pedimos a resposta [.then((res) => console.log(res)]; e caso tenh algum erro [.catch((error) => console.log(error))] 
    produtosDeServicos.criarProduto(nome, preco, imagem).then((res) => console.log(res)).catch((error) => console.log(error))
});

    mostrarCardsNaTela();