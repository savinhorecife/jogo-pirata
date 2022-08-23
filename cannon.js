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
        console.log(this.angle);
        
        if(keyIsDown(LEFT_ARROW) && this.angle>-30 ){
            this.angle=this.angle-1;
        }
         
        if(keyIsDown(RIGHT_ARROW) && this.angle<70){
            this.angle=this.angle+1;
        }

        push();
        translate(this.x,this.y)
        rotate(this.angle)
        imageMode(CENTER)
        image(this.cannonimage,0,0,this.w,this.h);
       pop()

       image(this.cannonbase,70,20,200,200)
    }

}