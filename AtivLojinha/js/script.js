const precos = [1000, 9000, 9000];

function atualizarCarrinho() {

    let subtotal = 0;

    const linhas = document.querySelectorAll("table tr");

    for (let i = 1; i < linhas.length; i++) {

        const qtd = Number(
            linhas[i].querySelector(".qtd").textContent
        );

        const total = qtd * precos[i - 1];

        linhas[i].querySelector(".total").textContent =
            `R$ ${total}`;

        subtotal += total;
    }

    document.querySelector(".subtotal").textContent =
        `SUBTOTAL: R$ ${subtotal}`;
}

document.querySelectorAll(".mais").forEach((botao) => {

    botao.addEventListener("click", () => {

        const span = botao.parentElement.querySelector(".qtd");

        span.textContent = Number(span.textContent) + 1;

        atualizarCarrinho();
    });

});

document.querySelectorAll(".menos").forEach((botao) => {

    botao.addEventListener("click", () => {

        const span = botao.parentElement.querySelector(".qtd");

        if (Number(span.textContent) > 0) {

            span.textContent = Number(span.textContent) - 1;

            atualizarCarrinho();
        }

    });

});

atualizarCarrinho();