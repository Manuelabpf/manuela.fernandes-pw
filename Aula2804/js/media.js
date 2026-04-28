var media = parseInt(prompt("Digite sua média: "));
var nome = prompt("Digite um nome: ");
console.log(typeof nome);
console.log(typeof media);
if(media > 7){
    console.log(nome, " aprovado(a)!")
}
else if ((media > 5) && (media <= 7)){
    console.log(nome, " recuperação!")
}
else if(isNaN(media)){
    console.log(nome, " não é um número")
}
else{
    console.log("reprovado(a)!")
}