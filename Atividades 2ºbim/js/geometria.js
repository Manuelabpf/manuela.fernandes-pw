var baseT = document.querySelector('#baseT');
var alturaT = document.querySelector('#alturaT');
var resultadoT = document.querySelector('#resultadoT');


function areaTriangulo() {
    resultadoT.innerHTML = ( Number(baseT.value) * Number(alturaT.value) ) / 2;
}

var ladoQuadrado = document.querySelector('#ladoQuadrado');
var resultadoQ = document.querySelector('#resultadoQ');

function areaQuadrado() {
    resultadoQ.innerHTML = Number(ladoQuadrado.value) ** 2;
}