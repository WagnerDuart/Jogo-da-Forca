const { match } = require('assert');
const readline = require('readline');

// Palavras disponíveis para o jogo
const palavras = ['javascript', 'nodejs', 'express', 'mongodb', 'react', 'angular', 'vue'];
const animais = ['gato','abelha','cachorro','galinha','ovelha','peixe']
const objetos = ['cadeira','lapis','caderno','mouse','caneca','controle']

const aleatorios = ['palavras', 'animais', 'objetos']
const alvo = aleatorios[Math.floor(Math.random() * aleatorios.length)];


console.log('============JOGO DA FORCA============ \n')

// Seleciona uma palavra aleatória do vetor
const palavraAlvo = [alvo][Math.floor(Math.random() * [alvo].length)];

// Vetor para armazenar as letras adivinhadas
const letrasAdivinhadas = new Array(palavraAlvo.length).fill('_');

// Número máximo de tentativas
const maxTentativas = 10;

// Vetor para armazenar as letras erradas
const letrasErradas = [];

// Número de tentativas restantes
let tentativasRestantes = maxTentativas;

// Interface para entrada e saída de dados
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Função para exibir o estado atual do jogo
function exibirJogo() {
  console.log(`Dicas: `, alvo)
  console.log(`Palavra: ${letrasAdivinhadas.join(' ')}`);
  console.log(`Letras erradas: ${letrasErradas.join(', ')}`);
  console.log(`Tentativas restantes: ${tentativasRestantes}`);
}

// // Lê uma letra digitada pelo jogador e atualiza o estado do jogo
function jogar() {
  rl.question('Digite uma letra: ', (letra) => {
    // Valida a entrada do usuário
    if (letra.length !== 1 || !letra.match(/[a-z]/i)) {
        console.log('Por favor, digite uma única letra.');
        jogar();
        return
    }

    // Verifica se a letra já foi adivinhada ou está errada
    if (letrasAdivinhadas.includes(letra) || letrasErradas.includes(letra)) {
        console.log(`A letra "${letra}" já foi testada. Tente outra.`);
        jogar();
        return;
      }
    // Verifica se a letra está presente na palavra alvo
    if (palavraAlvo.includes(letra)) {
        for (let i = 0; i < palavraAlvo.length; i++) {
        if (palavraAlvo[i] === letra) {
          letrasAdivinhadas[i] = letra;
        }
      }

      console.log(`Boa! A letra ${letra} está na palavra.`);

    } else {
      letrasErradas.push(letra);
      tentativasRestantes--;
      console.log(`Que pena! A letra ${letra} não está na palavra.`);
    }

    exibirJogo();

    // Verifica se o jogo terminou
    if (tentativasRestantes === 0) {
      console.log('Você foi enforcado!');
      console.log(`A palavra era: ${palavraAlvo}`);
      rl.question('Deseja jogar novamente? (s/n) ', (resposta) => {
        if (resposta.toLowerCase() === 's') {
          reiniciarJogo();
        } else {
          rl.close();
        }
      });
    } else if (!letrasAdivinhadas.includes('_')) {
      console.log('Parabéns, você salvou o boneco!');
      rl.question('Deseja jogar novamente? (s/n) ', (resposta) => {
        if (resposta.toLowerCase() === 's') {
          reiniciarJogo();
        } else {
          rl.close();
        }
      });
    } else {
      jogar();
    }
  });
}

// Função para reiniciar o jogo
function reiniciarJogo() {
    const palavraAlvo = palavras[Math.floor(Math.random() * palavras.length)];
    letrasAdivinhadas.fill('_');
    letrasErradas.length = 0;
    tentativasRestantes = maxTentativas;
    exibirJogo();
    jogar();
}
    
    // Exibe o estado inicial do jogo
    exibirJogo();
    
    // Inicia o jogo
    jogar();
