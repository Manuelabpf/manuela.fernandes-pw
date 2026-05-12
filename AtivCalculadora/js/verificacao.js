var idade = document.querySelector('#idade');
var resultadoV = document.querySelector('#resultadoV');

function verificar() {

    var valorIdade = Number(idade.value);

    if (valorIdade < 18) {
    resultadoV.innerHTML = 'O indivíduo é Menor de Idade.'
    }
    else {
    resultadoV.innerHTML = 'O indivíduo é Maior de Idade.'
    }
}