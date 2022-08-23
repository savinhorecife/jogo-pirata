class Cannonball{
 constructor(x,y) {
    var opitions={
        isStatic:true
    }
    this.r=30;
    this.ball=Bodies.circle(x,y,this.r,opitions);
    World.add(world,this.ball);
    this.image=loadImage("./assets/cannonball.png")
 } 

 lancar(){
    var newangle = canhao.angle -28;
    newangle = newangle *(3.14/180);
    var velocidade = p5.Vector.fromAngle(newangle);
    velocidade.mult(0.5)
Matter.Body.setStatic(this.ball,false);
Matter.Body.setVelocity(this.ball,{
    x:velocidade.x*(180/3.14),
    y:velocidade.y*(180/3.14)})
 }
 
 display(){
    push()
    imageMode(CENTER);
    image(this.image,this.ball.position.x,this.ball.position.y,this.r,this.r)
    pop()
 }
}