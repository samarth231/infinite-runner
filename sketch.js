var path,boy,gold,diamonds,emerald,sword;
var pathImg,boyImg,emeraldImg,diamondImg,goldImg,swordImg;
var treasureCollection = 0;
var diamondGroup,emeraldGroup,goldGroup,swordGroup;
var PLAY=1;
var END=0;
var gameState=1;

function preload(){
    pathImg = loadImage("Road.png");
    boyImg = loadAnimation("Runner-1.png","Runner-2.png");
    diamondImg = loadImage("diamond.jpg");
    goldImg = loadImage("gold.png");
    emeraldImg = loadImage("emerald.jpg");
    swordImg = loadImage("sword.png");
    endImg =loadAnimation("gameOver.png");
}

function setup() {
   
    createCanvas(windowWidth,windowHeight);
    
    path=createSprite(width/2,200);
    path.addImage(pathImg);
    path.velocityY = 4;
    
    
    
    boy = createSprite(width/2,height-20,20,20);
    boy.addAnimation("SahilRunning",boyImg);
    boy.scale=0.08;
      
      
    diamondGroup=new Group();
    goldGroup=new Group();
    emeraldGroup=new Group();
    swordGroup=new Group();
}

function draw() {
    if(gameState===PLAY){
        background(0);
        boy.x = World.mouseX;
        
        edges= createEdgeSprites();
        boy.collide(edges);
        
        
        if(path.y > height ){
          path.y = height/2;
        }
        
          createDiamonds();
          createEmeralds();
          createGold();
          createSword();
      
          if (goldGroup.isTouching(boy)) {
            cashG.destroyEach();
            treasureCollection=treasureCollection+50;
          }
          else if (emeraldGroup.isTouching(boy)) {
            diamondsG.destroyEach();
            treasureCollection=treasureCollection+100;
            
          }else if(diamondGroup.isTouching(boy)) {
            diamondGroup.destroyEach();
            treasureCollection= treasureCollection + 150;
            
          }else{
            if(swordGroup.isTouching(boy)) {
              gameState=END;
              
              boy.addAnimation("SahilRunning",endImg);
              boy.x=200;
              boy.y=300;
              boy.scale=0.6;
              
              diamondGroup.destroyEach();
              goldGroup.destroyEach();
              emeraldGroup.destroyEach();
              swordGroup.destroyEach();
              
              diamondGroup.setVelocityYEach(0);
              goldGroup.setVelocityYEach(0);
              emeraldGroup.setVelocityYEach(0);
              swordGroup.setVelocityYEach(0);
           
          }
        }
        
        drawSprites();
        textSize(20);
        fill(255);
        text("Treasure: "+ treasureCollection,150,30);
        }
}

function createDiamonds() {
    if (World.frameCount % 200 == 0) {
    var diamond = createSprite(Math.round(random(50, width-50),40, 10, 10));
    diamond.addImage(diamondImg);
    diamond.scale=0.3;
    diamond.velocityY = 3;
    diamond.lifetime = 250;
    diamondGroup.add(diamond);
    }
  }
  
  function createEmeralds() {
    if (World.frameCount % 320 == 0) {
    var emeralds = createSprite(Math.round(random(50, width-50),40, 10, 10));
    emeralds.addImage(emeraldImg);
    emeralds.scale=0.3;
    emeralds.velocityY = 3;
    emeralds.lifetime = 250;
    emeraldGroup.add(emeralds);
  }
  }
  
  function createGold() {
    if (World.frameCount % 410 == 0) {
    var gold = createSprite(Math.round(random(50, width-50),40, 10, 10));
    gold.addImage(goldImg);
    gold.scale=0.05;
    gold.velocityY = 3;
    gold.lifetime = 250;
    goldGroup.add(gold);
    }
  }
  
  function createSword(){
    if (World.frameCount % 530 == 0) {
    var sword = createSprite(Math.round(random(50, width-50),40, 10, 10));
    sword.addImage(swordImg);
    sword.scale=0.1;
    sword.velocityY = 3;
    sword.lifetime = 250;
    swordGroup.add(sword);
    }
  }