let agrinho;
let plantas = [];
let árvoresCampo = [];
let árvoresCidade = [];
let cena = 'campo';  // Inicia no campo
let qualidadeAr = 50;  // Qualidade do ar na cidade (de 0 a 100)

function setup() {
  createCanvas(800, 400);
  agrinho = new Agrinho(100, height - 50);  // Posição inicial do Agrinho
}

function draw() {
  if (cena === 'campo') {
    drawCampo();
  } else if (cena === 'cidade') {
    drawCidade();
  }

  // Desenhando o Agrinho
  agrinho.display();
  agrinho.move();

  // Criar novas plantas no campo
  if (cena === 'campo' && frameCount % 60 === 0) {
    let novaPlanta = new Planta(random(100, width - 100), height - 120);
    plantas.push(novaPlanta);
  }

  // Desenhando as plantas no campo
  for (let i = 0; i < plantas.length; i++) {
    plantas[i].display();
    plantas[i].grow();
  }

  // Desenhando árvores no campo e na cidade
  for (let i = 0; i < árvoresCampo.length; i++) {
    árvoresCampo[i].display();
  }

  for (let i = 0; i < árvoresCidade.length; i++) {
    árvoresCidade[i].display();
  }

  // Impacto das ações do Agrinho: qualidade do ar na cidade
  if (qualidadeAr < 0) qualidadeAr = 0;
  if (qualidadeAr > 100) qualidadeAr = 100;

  // Mostrar o nível de qualidade do ar
  textSize(16);
  fill(0);
  text(`Qualidade do Ar: ${qualidadeAr}%`, 600, 30);
}

// Função para desenhar o cenário do campo
function drawCampo() {
  background(200, 255, 200);  // Fundo claro, representando o campo

  // Desenhando o chão
  fill(34, 139, 34);
  rect(0, height - 100, width, 100);

  // Céu
  fill(135, 206, 235);
  noStroke();
  rect(0, 0, width, height - 100);

  // Árvores do campo
  fill(34, 139, 34);
  ellipse(150, height - 150, 60, 60);  // Árvore 1
  ellipse(300, height - 180, 60, 60);  // Árvore 2

  // Mudando para a cidade se o Agrinho atravessar o limite
  if (agrinho.x > width / 2) {
    cena = 'cidade';
  }

  // Interação no campo
  if (keyIsDown(32)) {  // Espaço para plantar árvore no campo
    let novaÁrvore = new Árvore(random(100, width - 100), height - 150);
    árvoresCampo.push(novaÁrvore);
    qualidadeAr += 5;  // Plantando árvores melhora o ar
  }
}

// Função para desenhar o cenário da cidade
function drawCidade() {
  background(200, 200, 255);  // Fundo mais cinza, representando a cidade

  // Desenhando o chão
  fill(169, 169, 169);  // Cor de asfalto
  rect(0, height - 100, width, 100);

  // Céu da cidade
  fill(135, 206, 235);
  noStroke();
  rect(0, 0, width, height - 100);

  // Desenhando prédios
  fill(200, 200, 200);
  rect(500, height - 200, 60, 200);  // Prédio 1
  rect(600, height - 250, 80, 250);  // Prédio 2
  rect(700, height - 150, 50, 150);  // Prédio 3

  // Desenhando carros
  fill(255, 0, 0);
  rect(200, height - 80, 50, 30);  // Carro 1
  fill(0, 0, 255);
  rect(300, height - 80, 50, 30);  // Carro 2

  // Mudando para o campo se o Agrinho atravessar o limite
  if (agrinho.x < width / 2) {
    cena = 'campo';
  }

  // Interação na cidade
  if (keyIsDown(32)) {  // Espaço para plantar árvore na cidade
    let novaÁrvore = new Árvore(random(500, width - 100), height - 150);
    árvoresCidade.push(novaÁrvore);
    qualidadeAr -= 10;  // Plantar árvores na cidade reduz a poluição
  }
}

// Classe do Agrinho
class Agrinho {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = 40;
  }

  display() {
    fill(255, 165, 0);  // Cor do Agrinho (laranja)
    ellipse(this.x, this.y, this.size);  // Corpo do Agrinho

    // Cabeça do Agrinho
    fill(255, 224, 189);
    ellipse(this.x, this.y - 25, this.size / 2);
    
    // Braços
    line(this.x - 25, this.y, this.x - 50, this.y - 25);
    line(this.x + 25, this.y, this.x + 50, this.y - 25);
    
    // Olhos
    fill(0);
    ellipse(this.x - 10, this.y - 30, 5);
    ellipse(this.x + 10, this.y - 30, 5);
  }

  move() {
    if (keyIsDown(LEFT_ARROW)) {
      this.x -= 2;
    }
    if (keyIsDown(RIGHT_ARROW)) {
      this.x += 2;
    }
  }
}

// Classe das plantas
class Planta {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = 10;  // Tamanho inicial da planta
  }

  display() {
    fill(34, 139, 34);  // Cor verde da planta
    ellipse(this.x, this.y, this.size);
  }

  grow() {
    if (this.size < 40) {
      this.size += 0.2;  // Cresce lentamente
    }
  }
}

// Classe das árvores
class Árvore {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = 50;  // Tamanho da árvore
  }

  display() {
    fill(34, 139, 34);  // Cor verde da árvore
    ellipse(this.x, this.y - 20, this.size, this.size);  // Folhas da árvore
    fill(139, 69, 19);  // Cor do tronco
    rect(this.x - 10, this.y, 20, 40);  // Tronco
  }
}
