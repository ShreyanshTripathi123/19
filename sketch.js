
var PLAY = 1;
var END = 0;
var gameState = PLAY;

var boy;
var obstacle,obstacleImage,obstaclesGroup;
var ground,invisibleGround,groundImage;


var gameover, restart;


function preload(){
 
   boy =   loadAnimation("boy1.jpg");
    
   obstacle1 = loadImage("obstacle1.png");

   groundImage = loadImage("ground1.png");

   gameoverImg = loadImage("gameover.png");
   restartImg = loadImage("restart.png");
}

function setup() {
createCanvas(windowWidth, windowHeight);


boy = createSprite(50,180,20,50);
  
  boy.addAnimation("boy1.jpg");
   boy.scale = 0.5;
  
  ground = createSprite(200,180,400,20);
  ground.addImage("ground1.png",groundImage);
  ground.x = ground.width /2;
  
  
  gameover = createSprite(300,100);
  gameover.addImage(gameoverImg);
  
  restart = createSprite(300,140);
  restart.addImage(restartImg);
  
  gameover.scale = 0.5;
  restart.scale = 0.5;

  gameover.visible = false;
  restart.visible = false;
  
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
}


function draw() {
   background(250);
     
  
      
     if(touches.length> 0 || keyDown("SPACE") && boy.y >= height-120){
      boy.velocityY= -10;
      touches=[];
     }
     
      if(keyDown("space") && boy.y >= 159) {
        boy.velocityY = -12;
      }
    
      boy.velocityY = boy.velocityY + 0.8
    
      if (ground.x < 0){
        ground.x = ground.width/2;
      }
      boy.collide(invisibleGround);
      spawnObstacles();
      if(obstaclesGroup.isTouching(boy)){
         gameState = END;
   
      }
   
        
   else if (gameState === END) {
      gameOver.visible = true;
      restart.visible = true;

   ground.velocityX = 0;
   boy.velocityY = 0;
   obstaclesGroup.setVelocityXEach(0);

   obstaclesGroup.setLifetimeEach(-1);
    
   if(mousePressedOver(restart)) {
      reset();
   }
  }
   drawSprites();
}