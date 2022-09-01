class CannonBall {
  constructor(x, y) {
    var options = {
      isStatic: true
    };
    this.r = 30;
    this.body = Bodies.circle(x, y, this.r, options);
    this.image = loadImage("./assets/cannonball.png");
    World.add(world, this.body);
  }

  remove(i) {
    Matter.Body.setVelocity(this.body, {x:0,y:0});
    
    setTimeout(() => {
      Matter.World.remove(world, this.body);
      delete grupodebolas[i];
    },1000);
  }

  lancar() {
     var nemangle = canhao.angle - 28;
    nemangle = nemangle *(3.14/180)
    var velocity = p5.Vector.fromAngle(nemangle);
    velocity.mult(0.5);
    Matter.Body.setStatic(this.body, false);
    Matter.Body.setVelocity(this.body, {
      x: velocity.x *(180/3.14), y: velocity.y * (180/3.14)});
  }

  display() {
    push();
    translate(this.body.position.x, this.body.position.y);
    rotate(this.body.angle);
    imageMode(CENTER);
    image(this.image, 0, 0, this.r, this.r);
    pop();
  }
}
