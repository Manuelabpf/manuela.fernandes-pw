var numero = document.querySelector('#numero');
var resultadoP = document.querySelector('#resultadoP');
var resultadoI = document.querySelector('#resultadoI');


function ParImpar() {

    var valor = Number(numero.value)

    if(valor % 2 === 0) {
        resultadoP.innerHTML = valor + " é Par.";
    }
    else {
        resultadoI.innerHTML = valor + " é Ímpar.";
    }
}