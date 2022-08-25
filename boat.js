class Boat {
    constructor(x, y, w, h, boatPos){
        this.w = w;
        this.h = h;
        this.boatPos = boatPos;
        
        this.body= Bodies.rectangle(x,y,w,h);
        World.add(world, this.body);
        this.image = loadImage("./assets/boat.png");
    }

    remove(i){
        setTimeout(()=>{
            Matter.World.remove(world,grupodenavios[i].body);
            delete grupodenavios[i];
        },2000)
    }

    display(){
        push();
        translate(this.body.position.x,this.body.position.y);
        rotate(this.body.angle)
        imageMode(CENTER);
        image(this.image,0,this.boatPos,this.w, this.h);
        pop();
    }
}