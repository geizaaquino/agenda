let buttonNovoEvento = document.getElementById('buttonNovoEvento');
let buttonCancelar = document.getElementById('buttonCancelar');
let novoEvento = document.getElementById('novoEvento');
let formNovoEvento = document.getElementById('formNovoEvento');
let inputNomeEvento = document.getElementById('nomeEvento');
let inputDataEvento = document.getElementById('dataEvento');
let divMensagemErro = document.getElementById('mesagemErro');
let tabelaEventos = document.getElementById('tabelaEventos');

let listaEventos = [];

function removerEvento(event){
    let posicao = event.target.getAttribute('data-evento');
    listaEventos.splice(posicao, 1);
    atulaizaTabelaEventos();
}

function atulaizaTabelaEventos(){
    console.log('Chamar atualizar tabela eventos!!!');
    if(listaEventos.length ===0){
        tabelaEventos.innerHTML = '<tr><td colspan="3">Nenhum evento</td></tr>';
        return;
    }
    tabelaEventos.innerHTML ='';
    for(let i = 0; i < listaEventos.length; i++) {
        let evento = listaEventos[i];
        let linha = document.createElement('tr');
        let celulaNome = document.createElement('td');
        let celulaData = document.createElement('td');
        let celulaAcoes = document.createElement('td');
        let botaoExcluir = document.createElement('button');
        botaoExcluir.setAttribute('data-evento',i);
        botaoExcluir.classList.add('btn');
        botaoExcluir.classList.add('btn-danger');
        botaoExcluir.classList.add('btn-sm');
        botaoExcluir.addEventListener('click', removerEvento);
        celulaNome.innerText = evento.nome;
        celulaData.innerText = evento.data;
        botaoExcluir.innerHTML = "Remover";
        celulaAcoes.appendChild(botaoExcluir); 
        linha.appendChild(celulaNome);
        linha.appendChild(celulaData);
        linha.appendChild(celulaAcoes);
        tabelaEventos.appendChild(linha);
    }
}

function limparEvento() {
    inputNomeEvento.value = '';
    inputDataEvento.value = '';
    inputNomeEvento.classList.remove('is-invalid');
    inputDataEvento.classList.remove('is-invalid');
    mensagemErro.classList.add('d-none');
    mensagemErro.innerHTML = '';
}

function mostrarNovoEvento(){ 
   novoEvento.classList.remove('d-none');
}

function ocultarNovoEvento(){ 
    novoEvento.classList.add('d-none');
    limparEvento();
}

function novoEventoValido(nomeEvento, dataEvento){
    let validacaoOk = true;
    var erro = '';
    if(nomeEvento.trim().length === 0) {
        erro = 'O nome do evento é obrigatório!';
        inputNomeEvento.classList.add('is-invalid');
        validacaoOk = false;
    }else{
        
    }
    let timestampEvento = Date.parse(dataEvento);
    let timestampAtual = (new Date()).getTime();
    if(isNaN(timestampEvento) || timestampEvento < timestampAtual){
        if(erro.length > 0) {
            erro += '<BR> '
        }
        erro += 'A data do evento é obrigatório e deve estar no futuro!';
        inputDataEvento.classList.add('is-invalid');
        validacaoOk = false;
    } else{
        
    }

    if(!validacaoOk){
        mensagemErro.innerHTML = erro;
        mensagemErro.classList.remove('d-none');
    } else {
        
    }
    
    return validacaoOk; 
}
 
function salvarNovoEvento(event){
    event.preventDefault();
    let nomeEvento = inputNomeEvento.value;
    let dataEvento = inputDataEvento.value;
    if(novoEventoValido(nomeEvento, dataEvento)){
        console.log('Evento é valido!');
        listaEventos.push({
            nome: nomeEvento,
            data: new Date(dataEvento)
        });
        atulaizaTabelaEventos();
        ocultarNovoEvento();
    } else{
        console.log('Evento é inválido!');
    }
}

buttonNovoEvento.addEventListener('click', mostrarNovoEvento);
buttonCancelar.addEventListener('click', ocultarNovoEvento);
formNovoEvento.addEventListener('submit', salvarNovoEvento);
window.addEventListener('load', atulaizaTabelaEventos);