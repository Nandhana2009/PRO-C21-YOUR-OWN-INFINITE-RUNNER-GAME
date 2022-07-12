var rocket,rocketImg;
var comet,cometImg,cometsGroup;
var sky,skyImg;
var gameOverImg;
var x,y;

var PLAY;
var END;
var gameState = PLAY;
var score;

function preload(){

rocketImg = loadAnimation("rocket.png");
skyImg = loadImage("sky.jpg");
cometImg = loadImage("comet.png");
gameOverImg = loadImage("gameOver.png");

}

function setup() {
createCanvas(600,600);

sky = createSprite(300,300);
sky.addImage(skyImg);

rocket = createSprite(300,500,50,50);
rocket.addAnimation("flying",rocketImg);
rocket.scale = 0.3

gameOver = createSprite(300,300);
gameOver.addImage(gameOverImg);
gameOver.scale = 0.5

cometsGroup = new Group();

score = 0

}

function draw() {

    

    if(gameState===PLAY){

        background(0);
        rocket.x = World.mouseX;

        gameOver.visible = false;
        sky.velocityY = 4;

        score = score + Math.round(frameCount/60);

        edges= createEdgeSprites();
        rocket.collide(edges);

    if(sky.y > 400 ){
        sky.y = height/2;
        }

          createComets();


    if(cometsGroup.isTouching(rocket)){
        gameState = END;
    }


    }

    if(gameState===END){
        gameOver.visible = true;
        cometsGroup.destroyEach();
        cometsGroup.setVelocityEach(0);
        sky.velocityY = 0;
        rocket.velocityX = 0;

    }

 
drawSprites();
textSize(30);
fill("white");
text("Score"+score,400,80);
}



function createComets(){
if (World.frameCount % 180 == 0) {
    var x = Math.round(random(100,600))
    var y = Math.round(random(100,600))
    var comet = createSprite(Math.round(random(x,y)));
    comet.addImage(cometImg);
    comet.scale=0.5;
    comet.velocityY = 3;
    comet.lifetime = 200;
    cometsGroup.add(comet);
}
}