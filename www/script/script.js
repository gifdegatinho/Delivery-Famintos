$("#footer").load("components/footer.html", function () {
    $(this).children(':first').unwrap();
});


/*$("#leftmenu").load("..\\Root\\leftmenu.html", function () {
    $(this).children(':first').unwrap();

    let caminho = window.location.pathname.split('/');
    const arquivoAtual = caminho.at(caminho.length - 1);
    console.log(arquivoAtual);

    const menuEsquerdo = document.querySelectorAll('#menuEsquerdo a');

    menuEsquerdo.forEach(element => {
        // console.log(element);

        let caminho = element.href.split('/');
        let arquivoLinkado = caminho.at(caminho.length - 1);
        // console.log(`filho: ${arquivoLinkado}`);

        if (arquivoAtual === arquivoLinkado) {
            element.classList.add('active');
            element.classList.add('text-white-50');
            element.classList.remove('text-white');
            element.setAttribute('aria-current', 'page');
            console.log(`Encontrei: ${arquivoAtual}`)
        } else {
            element.classList.remove('active');
            element.classList.remove('text-white-50');
            element.classList.add('text-white');
            element.removeAttribute('aria-current');
        }

    });
});*/
var localStorage = Window.localStorage;
var objetos = new Array([]);
var current_user;
const KEY_CURRENT_USER = 'usuario_logado';

function gravarProduto() { //Função que grava os dados da interface na LocalStorage

    //Busca os dados na local storage
    let json = localStorage.getItem("produtos") ?? "[]";

    objetos = JSON.parse(json);
    //Adiciona o novo cliente
    var novo = {};
    novo.nomeDoProduto = document.getElementById("nomeDoProduto").value;
    novo.valorDoProduto = document.getElementById("valorDoProduto").value;
    novo.descricaoDoProduto = document.getElementById("descricaoDoProduto").value;
    novo.fotoDoProduto = document.getElementById("fotoDoProduto").value;
    objetos.push(novo);

    //Grava os dados na local storage
    json = JSON.stringify(objetos);
    localStorage.setItem("produtos", json);
}

function gravarUsuario() {

    let json = localStorage.getItem("usuários") ?? "[]";
    let objetos = JSON.parse(json);

    var novo = {};
    novo.nomeUsuario = document.getElementById("nomeUsuario").value;
    novo.emailUsuario = document.getElementById("emailUsuario").value;
    novo.senhaUsuario = document.getElementById("senhaUsuario").value;
    novo.permissaoUsuario = document.getElementById("permissaoUsuario").value;
    objetos.push(novo);

    json = JSON.stringify(objetos);
    localStorage.setItem("usuários", json);
}

function gravarCupom() {

    let json = localStorage.getItem("cupons") ?? "[]";
    let objetos = JSON.parse(json);

    var novo = {};
    novo.tipoCupom = document.getElementById("tipoCupom").value;
    novo.valorCupom = document.getElementById("valorCupom").value;
    novo.descriçãoCupom = document.getElementById("descriçãoCupom").value;
    novo.customFile = document.getElementById("customFile").value;
    objetos.push(novo);

    json = JSON.stringify(objetos);
    localStorage.setItem("cupons", json);
}

// carrega o arquivo menuSuperior e insere no div com id menuSuperiorWrapper
$("#header").load("../templates/components/menuSuperior.html", function () {
    $(this).children(':first').unwrap();

    // marca o item do menuSuperior como ativo
    let caminho = window.location.pathname.split('/');
    const arquivoAtual = caminho.at(caminho.length - 1);
    // console.log(`Arquivo atual: ${arquivoAtual}`);

    const menuSuperior = document.querySelectorAll('#header a');

    menuSuperior.forEach(element => {
        // console.log(`Estou no: ${element}`);

        let caminho = element.href.split('/');
        let arquivoLinkado = caminho.at(caminho.length - 1);
        // console.log(`filho: ${arquivoLinkado}`);

        if (arquivoAtual === arquivoLinkado) {
            element.classList.add('active');
            // element.classList.add('text-white-50');
            // element.classList.remove('text-white');
            element.setAttribute('aria-current', 'page');
            // console.log(`Encontrei: ${arquivoAtual}`)
        } else {
            element.classList.remove('active');
            // element.classList.remove('text-white-50');
            // element.classList.add('text-white');
            element.removeAttribute('aria-current');
        }

    });

    current_user = localStorage.getItem(KEY_CURRENT_USER);
    if (!current_user) {
        document.getElementById('dropdownMenuButton1').hidden = true;
    } else {
        document.getElementById('login_btn').hidden = true;
        document.getElementById('registrar_btn').hidden = true;
    }
});

{
}

function adicionarAoCarrinho(obj) {
    toastList.forEach(item => {
        item.show();
    })
    carrinhoArray = obterCarrinho();
    if (obj.quantidade == undefined) {
        obj.quantidade = 1;
    }

    for (let i = 0; i < carrinhoArray.length; i++) {
        if (carrinhoArray[i].nome === obj.nome) {
            incrementarQuantidade(obj.nome);
            return;
        }
    }

    carrinhoArray.push(obj);
    persistirCarrinho(carrinhoArray);
}

function incrementarQuantidade(nomeProcurado) {
    carrinhoArray = obterCarrinho();
    carrinhoArray.forEach(item => {
        // console.log(`Verificando o item: ${item.nome} enquanto procuro: ${nomeProcurado}`);
        if (item.nome === nomeProcurado) {
            // console.log(`Encontrei o item ${nomeProcurado}`);
            item.quantidade++;
        }
    })
    persistirCarrinho(carrinhoArray);
    // window.alert('incrementei a quantidade');
}

function decrementarQuantidade(nomeProcurado) {
    carrinhoArray = obterCarrinho();
    carrinhoArray.forEach((item, index) => {
        // console.log(`Verificando o item: ${item.nome} enquanto procuro: ${nomeProcurado}`);
        if (item.nome === nomeProcurado) {
            // console.log(`Encontrei o item ${nomeProcurado}`);
            item.quantidade--;
            // console.log(`Novo valor da quantidade: ${item.quantidade}`)
            if (item.quantidade <= 0) {
                // console.log(`Removendo ${item.nome}`)
                carrinhoArray.splice(index, 1);
            }
        }
    })
    persistirCarrinho(carrinhoArray);
    // window.alert('incrementei a quantidade');
}

function obterCarrinho() {
    let json = localStorage.getItem("carrinho") ?? "[]";
    return JSON.parse(json);
}

function persistirCarrinho(array) {
    json = JSON.stringify(array);
    localStorage.setItem("carrinho", json);
}

function obterSomaDoCarrinho() {
    const exibidor = document.getElementById("somaExibidor");

    const arrayCarrinho = obterCarrinho();

    let soma = 0;

    arrayCarrinho.forEach(item => {
        soma += item.preco * item.quantidade;
    });

    exibidor.innerHTML = soma;

}

function obterPerfil(){
    let json = localStorage.getItem("cadastro") ?? "[]";
    return JSON.parse(json); 
}

function obterItemCarrinho() {
    const nome = document.getElementById("nomeItem");
    const arrayCarrinho = obterCarrinho();

    arrayCarrinho.forEach(item => {
        const itemHtml = `
<div class="d-flex justify-content-between">      
<div>${item.quantidade}x ${item.nome}</div> 
</div>`
        nome.innerHTML += itemHtml;
    });

}

function recarregarCarrinho() {
    let arrayCarrinho = obterCarrinho();

    // console.log(arrayCarrinho);
    const divCarrinho = document.getElementById("carrinhoExibicao");
    // console.log(divCarrinho.textContent);

    // limpa
    divCarrinho.textContent = '';

    let soma = 0;

    arrayCarrinho.forEach(item => {
        const itemHtml = `
<div class="d-flex justify-content-between">      
<div>${item.nome}</div> 
<div>
<a class="btn"><i onclick="decrementarQuantidade('${item.nome}'); recarregarCarrinho();" class="fa-solid fa-minus"></i></a>
${item.quantidade} 
<!--<a class="btn btn-secondary" >-->
<a class="btn"><i onclick="incrementarQuantidade('${item.nome}'); recarregarCarrinho();" class="fa-solid fa-plus "></i></a>
<!--</a>-->
</div>
</div>`
        soma += item.preco * item.quantidade;
        // console.log(item);
        // console.log(itemHtml);
        divCarrinho.innerHTML += itemHtml;
    });

    if (arrayCarrinho.length == 0) {
        divCarrinho.innerHTML += `<div class="row justify-content-center mx-5">
    <div class="h4 text-center"><b>Carrinho vazio</b> </div>
    </div>`

    } else {
        divCarrinho.innerHTML += `<div class="row justify-content-center mx-5 btnFinalizar">
    <div class="h4 text-center"><b>Total: R$${soma}</b></div>
    <a class="btn btn-outline-dark" href="checkout.html">Finalizar</a>
    </div>`
    }

    // console.log(divCarrinho.textContent);
}

function salvarCadastro() {
    const velhoJson = localStorage.getItem("cadastro") ?? "[]";
    const cadastros = JSON.parse(velhoJson);

    var novo = {};
    novo.registerName = document.getElementById("registerName").value;
    novo.registerEmail = document.getElementById("registerEmail").value;
    novo.confirmEmail = document.getElementById("confirmEmail").value;
    novo.registerPhone = document.getElementById("registerPhone").value;
    novo.registerPassword = document.getElementById("registerPassword").value;
    novo.registerRepeatPassword = document.getElementById("registerRepeatPassword").value;
    cadastros.push(novo);

    const novoJson = JSON.stringify(cadastros);
    localStorage.setItem("cadastro", novoJson);
}

let toastList;

$(document).ready(function () {
    var toastElList = [].slice.call(document.querySelectorAll('.toast'))
    toastList = toastElList.map(function (toastEl) {
        return new bootstrap.Toast(toastEl, {})
    })
    /*    toastList.forEach(item => console.log(item));
        console.log(`Configurei os toasts: ${toastList}`);*/
});

function logar() {

    var userDB = JSON.parse(localStorage.getItem("cadastro"));

    if (!userDB) {
        userDB = [{
            registerEmail: 'user',
            registerPassword: 'user'
        }];
    }

    var emailInserido = document.getElementById('Email').value;
    var senhaInserida = document.getElementById('Password').value;

    for (let login of userDB) {
        var email = login['registerEmail'];
        var pw = login['registerPassword'];

        if (emailInserido === email && senhaInserida === pw) {
            localStorage.setItem(KEY_CURRENT_USER, email);

            window.location.href = 'index.html';


            return; // finaliza o metodo
        }
    }

    localStorage.removeItem(KEY_CURRENT_USER);

    // nao encontrou a combinacao de login e senha
    alert("email Inserido ou senha inválidos!");
}

function logout() {
    localStorage.removeItem(KEY_CURRENT_USER);
    window.location.href = 'index.html';
}

// function obterDadosPerfil() {
//     const nome = document.getElementById("perfilNome");
//     const tel = document.getElementById("perfilTel");
//     const email = document.getElementById("perfilEmail");
//     const arrayPerfil = obterPerfil();
//     document.getElementById("perfilEmail").value = "teste"

// }