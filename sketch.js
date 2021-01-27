var PLAY, END, gamestate;
var player, playerImage;
var bananaImage, bananaGroup;
var obstacleImage, obstacleGroup;
var backgrounds, backgroundImage, invisibleGround; 
var score;74

function preload() {
  
  playerImage = loadAnimation("Monkey go Happy files/Monkey_01.png", "Monkey go Happy files/Monkey_02.png", "Monkey go Happy files/Monkey_03.png", "Monkey go Happy files/Monkey_04.png", "Monkey go Happy files/Monkey_05.png", "Monkey go Happy files/Monkey_06.png", "Monkey go Happy files/Monkey_07.png", "Monkey go Happy files/Monkey_08.png", "Monkey go Happy files/Monkey_09.png", "Monkey go Happy files/Monkey_10.png");
  
  bananaImage = loadImage("Monkey go Happy files/banana.png");
  
  obstacleImage = loadImage("Monkey go Happy files/stone.png");
  
  backgroundImage = loadImage("Monkey go Happy files/jungle.jpg");
}

function setup() {
  
  createCanvas(500, 400);
  
  backgrounds = createSprite(200,180,400,20);
  backgrounds.addImage("ground",backgroundImage);
  backgrounds.x = backgrounds.width /2;
  backgrounds.velocityX = -2;

  player = createSprite(100, 350, 10, 10);
  player.addAnimation("players", playerImage);
  player.scale = 0.10;
  
  invisibleGround = createSprite(200, 378, 600, 5);
  invisibleGround.visible = false;
  
  bananaGroup = new Group();
  obstacleGroup = new Group();
  
  score = 0;
  
  PLAY = 1;
  END = 0;
  gamestate = PLAY;
}

function draw() {
  
  background(210);
  
  drawSprites();
  
  if (gamestate === PLAY) {
    
    if (backgrounds.x < 0) {
    backgrounds.x = backgrounds.width/2;
    }
    
    if (keyDown("space") && player.y  >= 334.85) {
    player.velocityY = -16;
    }
    
    player.velocityY = player.velocityY + 0.6;
          
    player.collide(invisibleGround);
    
    if (bananaGroup.isTouching(player)) {
      bananaGroup.destroyEach();
      score = score+2;
    }
    
    switch(score) {
        
      case 10: player.scale = 0.12;
      break;
      case 20: player.scale = 0.14;
      break;
      case 30: player.scale = 0.16;
      break;
      case 40: player.scale = 0.18;
      break;
      default:break;
    }
    
    if (player.isTouching(obstacleGroup)) {
        player.scale = player.scale - 0.05;   
    }
    
    if (player.scale <= 0.03) {
        gamestate = END;
    }
    
  }else
  if (gamestate === END) {
    
    player.visible = false;
    
    obstacleGroup.setVelocityXEach(0);
    bananaGroup.setVelocityXEach(0);
    
    obstacleGroup.destroyEach(0);
    bananaGroup.destroyEach(0);
    
    backgrounds.velocityX = 0;
    
    text("GAME OVER", 200, 200);
    textSize(20);
    stroke("white");
    fill("white");
  }

  foodGroup();
  obstaclesGroup();
  
  textSize(20);
  stroke("white");
  fill("white");
  text("Score : " + score, 400, 70);
}

function foodGroup(){
  
  if (frameCount % 120 === 0) {

    var banana = createSprite(500,220,40,10);
    banana.y = Math.round(random(220,300));
    banana.addImage("bananas", bananaImage);
    banana.scale = 0.05;
    banana.velocityX = -3;
    
    banana.lifetime = 160;
    
    bananaGroup.add(banana);
  }
}

function obstaclesGroup() {
   
  if (frameCount % 300 === 0) {
    
    var obstacles = createSprite(500,363,40,10);
    obstacles.addImage("obstacler", obstacleImage);
    obstacles.scale = 0.17;
    obstacles.velocityX = -3;
    
    obstacles.lifetime = 160;
    
    obstacleGroup.add(obstacles);
  }
}