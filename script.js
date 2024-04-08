const html = document.querySelector('html');
const focoBt = document.querySelector('.app__card-button--foco');
const curtoBt = document.querySelector('.app__card-button--curto');
const longoBt = document.querySelector('.app__card-button--longo');
const banner = document.querySelector('.app__image');
const titulo = document.querySelector('.app__title');
const botoes = document.querySelectorAll('.app__card-button');
const musicaFocoInput = document.querySelector('#alternar-musica');
const musica = new Audio('/sons/luna-rise-part-one.mp3');
const startPauseBt = document.querySelector('#start-pause');

let intervaloId = null;
let tempoDecorridoEmSegundos = 5;
musica.loop = true;



musicaFocoInput.addEventListener('change', () => {
    if (musica.paused) {
        musica.play();
        musica.currentTime = 0;
    } else {
        musica.pause();
    }
})

// passando o evento click no modo Foco
focoBt.addEventListener('click', () => {
    alterarContexto('foco');
    focoBt.classList.add('active');
});

// passando o evento click no modo Descanso Curto
curtoBt.addEventListener('click', () => {
    alterarContexto('descanso-curto');
    curtoBt.classList.add('active');
});

// passando o evento click no modo Descanso Longo
longoBt.addEventListener('click', () => {
    alterarContexto('descanso-longo');
    longoBt.classList.add('active');
});

function alterarContexto(contexto) {
    botoes.forEach(function (contexto) {
        contexto.classList.remove('active')
    });

    html.setAttribute('data-contexto', contexto);
    banner.setAttribute('src', `/imagens/${contexto}.png`)
    switch (contexto) {
        case "foco":
            titulo.innerHTML = `Otimize sua produtividade,<br>
            <strong class="app__title-strong">mergulhe no que importa.</strong>`
            break;
        case "descanso-curto":
            titulo.innerHTML = `Que tal dar uma respirada?,<br>
            <strong class="app__title-strong">Faça uma pausa curta!.</strong>`
            break;
        case "descanso-longo":
            titulo.innerHTML = `Hora de voltar à superficie,<br>
            <strong class="app__title-strong">Faça uma pausa Longa!.</strong>`
            break;
        default:
            break;
    }
}

// faz a lógica da contagem regressiva e zerando quando bater o tempo no if
const contagemRegressiva = () =>{
    if(tempoDecorridoEmSegundos <= 0){
        zerar();
        alert('tempo finalizado!');
        return 

    };
    tempoDecorridoEmSegundos -= 1;
    console.log('temporizador ' + tempoDecorridoEmSegundos);
};

startPauseBt.addEventListener('click', iniciarOuPausar);

// inicia o contador dando a variável um set e dentro do if zera o valor do intervalor para sempre poder pausar e continuar
function iniciarOuPausar(){
    if(intervaloId){
        zerar();
        return;
    };
    intervaloId = setInterval(contagemRegressiva, 1000)
}
 
// zerar o intervaloId para que não fique em looping o alert
function zerar(){
    clearInterval(intervaloId);
    intervaloId = null;
}