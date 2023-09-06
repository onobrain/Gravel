// -=> background.js

class Layer {
    constructor(game , width, height , speedModifier , image) {
        this.game = game;
        this.width = width;
        this.height = height;
        this.speedModifier = speedModifier;
        this.image = image;
        this.x = 0;
        this.y = 0;
    }

    // -lu
    update(){
        // reset the background to create infinite scrolling illusion
        if (this.x <= -this.width) this.x = 0;
        else if(this.x >= this.width) this.x = 0
        else this.x -= (this.game.speed * this.speedModifier);
    }

    // -ld
    draw(context){
        context.drawImage(this.image , this.x , this.y , this.width, this.height)
        context.drawImage(this.image , this.x + this.width, this.y , this.width ,this.height)
        context.drawImage(this.image , this.x - this.width, this.y , this.width ,this.height)
    }
}



export class Background1 {
    constructor(game) {
        this.game = game;
        this.width = 928
        this.height = 793;
        // identifying layers
        this.layer1image = layer1;
        this.layer2image = layer2;
        this.layer3image = layer3;
        this.layer4image = layer4
        this.layer5image = layer5 
        this.layer6image = layer6
        this.layer7image = layer7 
        this.layer8image = layer8 
        this.layer9image = layer9;
        this.layer10image = layer10;
        // instatnciating every layer.
        this.layer1 = new Layer(this.game , this.width , this.height , 0 ,this.layer1image)
        this.layer2 = new Layer(this.game , this.width  ,this.height , .15 , this.layer2image )
        this.layer3 = new Layer(this.game , this.width ,this.height , .2 , this.layer3image)
        this.layer4 = new Layer(this.game , this.width ,this.height , .3 , this.layer4image)
        this.layer5 = new Layer(this.game , this.width ,this.height , .4 , this.layer5image)
        this.layer6 = new Layer(this.game , this.width ,this.height , .5 , this.layer6image)
        this.layer7 = new Layer(this.game , this.width ,this.height , .7 , this.layer7image)
        this.layer8 = new Layer(this.game , this.width ,this.height , .8 , this.layer8image)
        this.layer9 = new Layer(this.game , this.width ,this.height , 1 , this.layer9image)
        this.layer10 = new Layer(this.game , this.width ,this.height , 2 , this.layer10image)
        // background layers array
        this.backgroundLayers = [this.layer1 , this.layer2 , this.layer3 , this.layer4 , this.layer5 , this.layer6 , this.layer7 , this.layer8 ,this.layer9]
    }
    // -b1 update
    update() {
        this.backgroundLayers.forEach(layer => layer.update())
    }
    // -b1 draw
    draw(context) {
        this.backgroundLayers.forEach(layer => layer.draw(context))
    }
}