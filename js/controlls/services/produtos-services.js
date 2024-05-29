const listaDeProdutos = () => {
    return fetch("http://localhost:3000/Produtos").then((res) => res.json()).catch((error) => console.log(error));
};

//estrutura para "postar" novos cards
const criarProduto = (nome, preco, imagem) => {
    return fetch("http://localhost:3000/Produtos", {
        method: "POST",
        headers: {
            "Content-Type":"application/json",
        },
        body: JSON.stringify({
            nome,
            preco,
            imagem,
        })
    })
    .then((res) => res.json()).catch((error) => console.log(error));
}

//estrutura para excluir cards

async function deletarProduto(id) {
    const produto = await fetch (`http://localhost:3000/Produtos/${id}`, {
        method: "DELETE"
    });
    
}

export const produtosDeServicos = {
    listaDeProdutos,
    criarProduto,
    deletarProduto,
}