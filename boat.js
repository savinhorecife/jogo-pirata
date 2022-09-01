class Boat {
  constructor(x, y, width, height, boatPos, boatAnimation) {
  
    this.body = Bodies.rectangle(x, y, width, height);
    this.width = width;
    this.height = height;
    this.boatPos = boatPos;
    this.animation = boatAnimation;
    this.speed = 0.05;
    this.image = loadImage("./assets/boat.png");
    this.isbroken=false;

    World.add(world, this.body);
  }

  remove(i) {
    this.animation=brokenAnimation;
    this.speed=0.05;
    this.width=300;
    this.height=300;
    this.isbroken=true
  
    setTimeout(() => {
      Matter.World.remove(world, grupodenavios[i].body);
      delete grupodenavios[i];
    },2000);
  }

  animate(){
    this.speed = this.speed+0.05;
  }

  display() {
    var index = floor(this.speed%this.animation.length);

    push();
    translate(this.body.position.x, this.body.position.y);
    rotate(this.body.angle);
    imageMode(CENTER);
    image(this.animation[index], 0, this.boatPos, this.width, this.height);
    pop();
  }
}
