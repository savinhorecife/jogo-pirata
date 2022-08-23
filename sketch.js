const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
var ball;
var grupodebolas=[]

var world, engine;

var solo;
var bgImg;
var torre, torreImg;
var angle=20,canhao;

//na function preload carregamos imagem, animações e sons
function preload() {
  bgImg = loadImage("./assets/background.gif");
  torreImg = loadImage("./assets/tower.png");
}

function setup() {
  canvas = createCanvas(1200, 600);
  engine = Engine.create();
  world = engine.world;

  //deixa os corpos static (parados)
  var options = {
    isStatic: true
  }

  //criando e adicionando o solo no mundo
  solo = Bodies.rectangle(0,height-1,width*2,1, options);
  World.add(world,solo);

  //criando e adicionando a torre no mundo
  torre = Bodies.rectangle(160,350,160,310, options);
  World.add(world, torre);

  angleMode(DEGREES);
  angle=15

  canhao = new Cannon(180,110,130,100,angle);
  
}

function draw() {
  background(0);
  Engine.update(engine);

  //mostrar a imagem do fundo(background)
  image(bgImg,0,0,1200,600);

  //mostrar o solo
  rect(solo.position.x, solo.position.y, width*2, 1);

  //push e pop limita configurações somente para a torre
  push();
  imageMode(CENTER);
  image(torreImg, torre.position.x, torre.position.y, 160, 310);
  pop();

  canhao.display();
  
  for(var i = 0;i<grupodebolas.length;i=i+1){
     showballs(grupodebolas[i],i)
  }
  
}


function keyPressed(){
  if(keyCode===DOWN_ARROW){
    ball = new Cannonball(canhao.x,canhao.y);
  grupodebolas.push(ball);
  }
}

function keyReleased(){
  if(keyCode===DOWN_ARROW){
  grupodebolas[grupodebolas.length-1].lancar();
  }
}

function showballs(ball,i){
  if (ball){
    ball.display()
  }
}