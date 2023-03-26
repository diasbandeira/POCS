const pergunta = document.createElement('p');
pergunta.textContent = "sim ou não?";

const botaoSim = document.createElement('button');
botaoSim.textContent = "Sim";
botaoSim.addEventListener('click', () =>{
        console.log('Clicou no sim');
    }
);

const botaoNao = document.createElement('button');
botaoNao.textContent = "Não";
botaoNao.addEventListener('click', () =>{
    console.log('Clicou no não');
});

const opcoes = document.createElement('div');
opcoes.appendChild(botaoSim);
opcoes.appendChild(botaoNao);

document.body.appendChild(pergunta);
document.body.appendChild(opcoes);