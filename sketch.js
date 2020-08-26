var player, player_img1, player_img2;
var bg, bg_img;
var tri, obstacle2;
var wood1, obstacle3;
var wood2, obstacle4;
var ground;
var obstaclesGroup
var gameState = "play";
var score = 0;
var reset, reset_img;

function preload(){
    player_img1 = loadImage("Images/player.png");
    player_img2 = loadImage("Images/player2.png");
    bg_img = loadImage("Images/bg.jpg");
    obstacle2 = loadImage("Images/obstacle2.png");
    obstacle3 = loadImage("Images/obstacle3.png");
    obstacle4 = loadImage("Images/obstacle4.png");
    reset_img = loadImage("Images/reset.jpg");
}
function setup(){
    var canvas = createCanvas(800,400);
    
    ground = createSprite(400,400,800,50);
    ground.shapeColor = "green";

    player = createSprite(250,300,5,5);
    player.addImage("player", player_img1);
    player.scale = 0.07;

    reset = createSprite(400,300,50,50);
    reset.addImage("reset", reset_img);
    reset.scale = 0.7;
    reset.visible = false;
    
    obstaclesGroup = new Group();
}

function draw(){
   

    if(gameState === "play"){
        background(bg_img);
        //fill(255,0,0);
        text("Score : " + score,380,25);

        player.velocityY = player.velocityY + 0.8
        player.visible = true;
        
        obstaclesGroup.setVisibleEach(true);
        reset.visible = false;

        if(touches.length > 0 || keyDown("space")){
            player.y = player.y - 15;
            touches = [];
        }

        if(touches.length > 100 || keyDown("left_arrow")){
            player.x = player.x - 7;
            player.addImage("player", player_img2); 
            touches = [];
        }

        if(touches.length > 500 || keyDown("right_arrow")){
            player.x = player.x + 7;
            player.addImage("player", player_img1);
            touches = [];
        }

        if(player.y < 300){
            score = score + Math.round(getFrameRate()/60);
            ground.y = 1000;
        }

        player.collide(obstaclesGroup);
        player.collide(ground);

        spawnObstacles();
        

        if(player.x < 0 || player.y > 400){
            gameState = "end";
        }

    }

    else if(gameState === "end"){
        text("Score : " + score,380,25);
        player.visible = false;
        obstaclesGroup.destroyEach();
        score = score;
        //background(gameEnd_img);
        reset.visible = true;
        
    
        if(touches.lenght > 100
           0 || mousePressedOver(reset)){
           restart();
           touches = [];
        }
    }

    drawSprites();
}   
  
function spawnObstacles() {
    if(frameCount % 20 === 0) {
      var obstacle = createSprite(780,random(50,300),10,40);
      
      obstacle.velocityX = -4;
      
      var rand = Math.round(random(1,3));
      switch(rand) {
        case 1: obstacle.addImage(obstacle2);
                break;
        case 2: obstacle.addImage(obstacle3);
                break;
        case 3: obstacle.addImage(obstacle4);
                break;
        default: break;
      }
      
      obstacle.scale = 0.5;
      obstacle.lifetime = 210;
      obstaclesGroup.add(obstacle);
    }
  }

function restart(){
    player.y = 300;
    player.x = 250;
    gameState = "play";
    score = 0;
    ground.y = 400;
    obstaclesGroup.setVelocityXEach(0);
}
