var n1= document.querySelector('#n1');
    var n2= document.querySelector('#n2');
    var resultado = document.querySelector('#resultado');

    function desconto10() {
      resultado.innerHTML = Number(n1.value) - Number((n1.value)*0.1);
    }