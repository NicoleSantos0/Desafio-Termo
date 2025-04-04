
const palavraSecreta = "timao"; // Palavra fixa
const grid = document.getElementById("grid");
const message = document.getElementById("message");

let tentativaAtual = 0;
let celulas = [];


function criarGrid() {
    for (let linha = 0; linha < 6; linha++) {
        for (let coluna = 0; coluna < 5; coluna++) {
            const celula = document.createElement("div");
            celula.className = "cell";
            celula.dataset.linha = linha;
            celula.dataset.coluna = coluna;
            celula.contentEditable = linha === 0;
            celula.addEventListener("input", verificarEntrada);
            celula.addEventListener("keydown", verificarTecla);
            grid.appendChild(celula);
            celulas.push(celula);
        }
    }
}


function verificarEntrada(e) {
    e.target.textContent = e.target.textContent.slice(-1).toUpperCase();
    const proximaCelula = document.querySelector(
        `[data-linha="${e.target.dataset.linha}"][data-coluna="${parseInt(e.target.dataset.coluna) + 1}"]`
    );
    if (proximaCelula) proximaCelula.focus();
}


function verificarTecla(e) {
    if (e.key === "Enter") verificarPalavra();
    if (e.key === "Backspace" && e.target.textContent === "") {
        const celulaAnterior = document.querySelector(
            `[data-linha="${e.target.dataset.linha}"][data-coluna="${parseInt(e.target.dataset.coluna) - 1}"]`
        );
        if (celulaAnterior) celulaAnterior.focus();
    }
}


function verificarPalavra() {
    const linhaCelulas = celulas.slice(tentativaAtual * 5, (tentativaAtual + 1) * 5);
    const palavra = linhaCelulas.map(c => c.textContent.toLowerCase()).join("");

    if (palavra.length !== 5) {
        message.textContent = "Preencha todas as letras!";
        return;
    }

    linhaCelulas.forEach((celula, i) => {
        if (palavra[i] === palavraSecreta[i]) {
            celula.classList.add("correct");
        } else if (palavraSecreta.includes(palavra[i])) {
            celula.classList.add("present");
        } else {
            celula.classList.add("absent");
        }
    });

    if (palavra === palavraSecreta) {
        message.textContent = "Parabéns! Você acertou!";
        desativarJogo();
    } else if (tentativaAtual === 5) {
        message.textContent = `Fim de jogo! A palavra era ${palavraSecreta.toUpperCase()}`;
        desativarJogo();
    } else {
        tentativaAtual++;
        ativarLinha(tentativaAtual);
    }
}


function ativarLinha(linha) {
    celulas.forEach((celula, i) => {
        celula.contentEditable = Math.floor(i / 5) === linha;
    });
    const primeiraCelula = celulas[linha * 5];
    if (primeiraCelula) primeiraCelula.focus();
}


function desativarJogo() {
    celulas.forEach(celula => {
        celula.contentEditable = false;
    });
}


criarGrid();
ativarLinha(0);