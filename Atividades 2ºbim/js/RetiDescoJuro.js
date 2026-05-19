var valor = document.querySelector('#valor');
var resultadoR = document.querySelector('#resultadoR');

function retirar(){
    resultadoR.innerHTML = Number(valor.value) - (Number(valor.value) * 0.1)
}

function lucro(){
    resultadoR.innerHTML = Number(valor.value) + (Number(valor.value) * 0.15)
}

function desconto(){
    resultadoR.innerHTML = Number(valor.value) - (Number(valor.value) * 0.3)
}

function boas(){

    if(Number(n1.value) > 1000){
        resultadoR.innerHTML = Number(valor.value) - (Number(valor.value) * 0.07)
    }

    else if(Number(n1.value) > 200 && Number(n1.value) <= 500){
        resultadoR.innerHTML = Number(valor.value) + (Number(valor.value) * 0.05)
    }

    else if(Number(valor.value) < 200){
        resultadoR.innerHTML = 'Boas Compras!!'
    }

    else{
        resultadoR.innerHTML = 'Nada acontece'
    }
}