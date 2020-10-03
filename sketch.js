
var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var bananaGroup, obstacleGroup;
var score = 0;
var ground;
var survivalTime = 0;
var gameState = PLAY;
var PLAY = 1;
var END = 0;


function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  createCanvas(400,400);
  monkey = createSprite(80,315,20,20);
  monkey.addAnimation("running",monkey_running);
  monkey.scale = 0.1;
  
  ground = createSprite(200,350,400,5);
  ground.velocityX = -3;
  console.log(ground.x);
  
  bananaGroup = new Group();
  obstacleGroup = new Group();
}


function draw() {
  background("lime");
  
  monkey.collide(ground);
  
  if (gameState === PLAY){
    
    if (keyDown("space") && monkey.y >= 300){
    monkey.velocityY = -12; 
  }
    
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
 
    monkey.velocityY = monkey.velocityY + 0.8; 
    
    bananas();
    
    obstacles();
    
    score = score + Math.round(getFrameRate()/60);
    text("Score: "+score,300,20);
    
    survivalTime=Math.ceil(frameCount/frameRate());
    text("Survival Time: "+survivalTime,300,50);
    
    if (monkey.isTouching(obstacle)){
      gameState = END;
    }
  }
  
  else if (gameState === END){
    ground.velocityX = 0;
    monkey.velocityY = 0;
    bananaGroup.destroyEach();
    obstacle.velocity = 0;
    obstacleGroup.setLifetimeEach(-1);
  }
 

  drawSprites();
  
}

function bananas(){
  if (frameCount%80 === 0){
    banana = createSprite(400,10,10,10);
    banana.addImage("banana",bananaImage);
    banana.scale = 0.125;
    banana.y = Math.round(random(200,350));
    banana.velocityX = -2;
    banana.lifetime = 200;
    bananaGroup.add(banana);
  }
}

function obstacles(){
  if (frameCount%300 === 0){
    obstacle = createSprite(400,10,10,10);
    obstacle.addImage("obstacle",obstacleImage);
    obstacle.scale = 0.125;
    obstacle.y = Math.round(random(200,350));
    obstacle.velocityX = -2;
    obstacle.lifetime = 200;
    obstacleGroup.add(obstacle);
    }
}
