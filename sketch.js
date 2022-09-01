const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var engine, world, bgImg, ball;
var canvas, angle, torre, solo, canhao;
var grupodebolas = [];
var grupodenavios = [];

var score = 0;

var navioAnimation = [];
var navioSpriteData, navioSpriteSheet;

var brokenAnimation = [];
var brokenSpriteData, brokenSpriteSheet;


function preload() {
  bgImg = loadImage("./assets/background.gif");
  torreImg = loadImage("./assets/tower.png");

  //carregar os dados e as imagens do navio
  navioSpriteData = loadJSON("./assets/boat/boat.json");
  navioSpriteSheet = loadImage("./assets/boat/boat.png");

  //carregar os dados e as imagens do navio quebrando
  brokenSpriteData=loadJSON("./assets/boat/brokenBoat.json")
  brokenSpriteSheet=loadImage("./assets/boat/brokenBoat.png")
}

function setup() {
  canvas = createCanvas(1200, 600);
  engine = Engine.create();
  world = engine.world;
  angleMode(DEGREES)
  angle = 15


  solo = Bodies.rectangle(0, height - 1, width * 2, 1, { isStatic: true });
  World.add(world, solo);

  torre = Bodies.rectangle(160, 350, 160, 310, { isStatic: true });
  World.add(world, torre);

  canhao = new Cannon(180, 110, 130, 100, angle);

  //acessando as imagens do navio
  var navioFrames = navioSpriteData.frames;
  for(var i=0; i<navioFrames.length; i=i+1){
    var pos = navioFrames[i].position;
    var img = navioSpriteSheet.get(pos.x, pos.y, pos.w, pos.h);
    navioAnimation.push(img);
  }

  //acessando as imagens do navio quabrando
var brokenframes= brokenSpriteData.frames;
for(var i=0;i<brokenframes;i=i+1){
  var pos=brokenframes[i].position;
  var img=brokenSpriteSheet.get(pos.x,pos.y,pos.w,pos.h)
  brokenAnimation.push(img)
}
}

function draw() {
  background(189);
  image(bgImg, 0, 0, width, height);

  Engine.update(engine);

  //mostrar o solo
  rect(solo.position.x, solo.position.y, width*2, 1);


  //push e pop limita configurações somente para a torre
  push();
  imageMode(CENTER);
  image(torreImg, torre.position.x, torre.position.y, 160, 310);
  pop();

  showNavio();

  //for é a repetição para percorrer 
  //e mostrar todos os elementos de uma matriz(um grupo)
  for (var i = 0; i < grupodebolas.length; i++) {
    showballs(grupodebolas[i], i);
    colisaonavio(i);
  }

  canhao.display();


}

function colisaonavio(index) {
  for (var i = 0; i < grupodenavios.length; i++) {
    if (grupodebolas[index] !== undefined && grupodenavios[i] !== undefined) {
      var colisao = Matter.SAT.collides(grupodebolas[index].body, grupodenavios[i].body);

      if (colisao.collided) {
        grupodenavios[i].remove(i);

        Matter.World.remove(world, grupodebolas[index].body);
        delete grupodebolas[index];
      }
    }
  }
}

function keyPressed() {
  if (keyCode === DOWN_ARROW) {
    var ball = new CannonBall(canhao.x, canhao.y);
    grupodebolas.push(ball);
  }
}

function keyReleased() {
  if (keyCode === DOWN_ARROW) {
    grupodebolas[grupodebolas.length - 1].lancar();
  }
}

function showballs(ball, i) {
  if (ball) {
    ball.display();
    if(ball.body.position.x>=width || ball.body.position.y>= height-80){
      ball.remove(i)
    }
  }
}

function showNavio() {
  if (grupodenavios.length > 0) {
    if (
      grupodenavios[grupodenavios.length - 1] === undefined ||
      grupodenavios[grupodenavios.length - 1].body.position.x < width - 300
    ) {
      var positions = [-40, -60, -70, -20];
      var position = random(positions);
      var navio = new Boat(width, height - 100, 170, 170, position, navioAnimation);

      grupodenavios.push(navio);
    }

    for (var i = 0; i < grupodenavios.length; i=i+1) {
      if (grupodenavios[i]) {
        Matter.Body.setVelocity(grupodenavios[i].body, {
          x: -0.9,
          y: 0
        });

        grupodenavios[i].display();
        grupodenavios[i].animate();
      } 
    }
  } else {
    var navio = new Boat(width, height - 60, 170, 170, -60, navioAnimation);
    grupodenavios.push(navio);
  }
}

