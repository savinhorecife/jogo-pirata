class Cannon {
    //função para criar o canhão
    constructor(x,y,w,h,angle){
    this.x=x;
    this.y=y;
    this.w=w;
    this.h=h;
    this.angle=angle;
    this.cannonimage=loadImage("./assets/canon.png");
    this.cannonbase=loadImage("./assets/cannonBase.png");
    }

    //função para mostrar o canhão
    display(){
        push();
        imageMode(CENTER)
        image(this.cannonimage,this.x,this.y,this.w,this.h);
       pop()

       image(this.cannonbase,70,20,200,200)
    }

}