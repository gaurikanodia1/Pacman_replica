var pelletGroup
var vel = 2
var dir;
var life=3;
var gamestate="ready"

function preload(){

  // Loading all the images in the game


  pacmanImgR = loadImage("pictures/pcmRight.png");
  pacmanImgL = loadImage("pictures/pcmLeft.png");
  pacmanImgU = loadImage("pictures/pcmUp.png");
  pacmanImgD = loadImage("pictures/pcmDown.png");
  
  ghostImg1R =  loadImage("pictures/ghostie1R.png")
  ghostImg1L =  loadImage("pictures/ghostie1L.png")
  ghostImg1U =  loadImage("pictures/ghostie1U.png")
  ghostImg1D =  loadImage("pictures/ghostie1D.png")

  ghostImg2R =  loadImage("pictures/ghostie2R.png")
  ghostImg2L =  loadImage("pictures/ghostie2L.png")
  ghostImg2U =  loadImage("pictures/ghostie2U.png")
  ghostImg2D =  loadImage("pictures/ghostie2D.png")

  ghostImg3R =  loadImage("pictures/ghostie3R.png")
  ghostImg3L =  loadImage("pictures/ghostie3L.png")
  ghostImg3U =  loadImage("pictures/ghostie3U.png")
  ghostImg3D =  loadImage("pictures/ghostie3D.png")
}
function setup() {

  // creating canvas  
  createCanvas(500,500);

  //creating game architechture
  //this is a rough design, it can be improved accordingly

  //the outer boundary walls
  wall1 = createSprite(250,20,460,10);
  wall2 = createSprite(250,480,460,10);
  wall3 = createSprite(20,250,10,460);
  wall4 = createSprite(480,250,10,460);

  //the vertical columns
  Vbar1=createSprite(60,150,10,150)
  Vbar2=createSprite(60,350,10,150)
  Vbar3=createSprite(440,150,10,150)
  Vbar4=createSprite(440,350,10,150)

  //the horizontal columns
  Hbar1=createSprite(110,280,100,10)
  Hbar2=createSprite(110,220,100,10)
  Hbar3=createSprite(390,280,100,10)
  Hbar4=createSprite(390,220,100,10)

  //the ghost container
  box1WD=createSprite(250,280,100,10)
  box1WL=createSprite(200,250,10,70)
  box1WR=createSprite(300,250,10,70)

  //the boxes in upper section
  Ubox1=createSprite(140,100,80,40)
  Ubox2=createSprite(310,100,170,40)
  Ubox3=createSprite(250,170,290,20)

  //the boxes in lower section
  Lbox1=createSprite(140,400,80,40)
  Lbox2=createSprite(310,400,170,40)
  Lbox3=createSprite(250,330,290,20)

  //goup to contain all the pallete sprites
  pelletGroup = new Group();

  //function call for creating all horizontal pallets
  createPelletsHor(40,465,45);
  createPelletsHor(40,465,455);
  createPelletsHor(80,425,195);
  createPelletsHor(80,425,140);
  createPelletsHor(80,425,300);
  createPelletsHor(80,425,360);

  //function call for creating vertical pallets
  createPelletsVer(62,442,40);
  createPelletsVer(62,442,460);  

  //creating the pacman sprite
  pacman = createSprite(455,455,25,25)
  pacman.shapeColor= "yellow"
  pacman.addImage(pacmanImgL)
  pacman.scale=0.5
  // pacman.debug=true;
  pacman.setCollider("circle",0,0,25)
  // pacman.mirrorY(pacman.mirrorY()*-1)


//creating all the ghost sprites
  ghost1 =createSprite(220,250,25,25)
  ghost1.shapeColor="red"
  ghost1.addImage(ghostImg1U)
 // ghost1.debug=true
  ghost1.setCollider("circle",0,0,50)
  ghost1.scale = 0.3
 
  ghost2 =createSprite(250,250,25,25)
  ghost2.shapeColor="blue"
  ghost2.addImage(ghostImg2U)
  //ghost2.debug=true
  ghost2.setCollider("circle",0,0,50)
  ghost2.scale = 0.3
  

  ghost3 =createSprite(280,250,25,25)
  ghost3.shapeColor="green"
  ghost3.addImage(ghostImg3U)
  //ghost3.debug=true
  ghost3.setCollider("circle",0,0,50)
  ghost3.scale = 0.3
  
  //function call to make the ghosties move
  restart();

}


//main function of the programme
function draw() {

  background(0);

  //commands to make the pacman collide all the walls
  pacman.collide(wall1)
  pacman.collide(wall2)
  pacman.collide(wall3)
  pacman.collide(wall4)

  pacman.collide(Vbar1)
  pacman.collide(Vbar2)
  pacman.collide(Vbar3)
  pacman.collide(Vbar4)

  pacman.collide(Hbar1)
  pacman.collide(Hbar2)
  pacman.collide(Hbar3)
  pacman.collide(Hbar4)

  pacman.collide(box1WD)
  pacman.collide(box1WL)
  pacman.collide(box1WR)

  pacman.collide(Ubox1)
  pacman.collide(Ubox2)
  pacman.collide(Ubox3)

  pacman.collide(Lbox1)
  pacman.collide(Lbox2)
  pacman.collide(Lbox3)

  //function to make the ghosts collide the wall
  //creating a function helped reduce the lines of code
  collision(ghost1);
  collision(ghost2);
  collision(ghost3);

  //function to check the directions of the ghost
  knowDirection(ghost1,ghostImg1R,ghostImg1L,ghostImg1U,ghostImg1D);
  knowDirection(ghost2,ghostImg2R,ghostImg2L,ghostImg2U,ghostImg2D);
  knowDirection(ghost3,ghostImg3R,ghostImg3L,ghostImg3U,ghostImg3D);

  //command to eat pallets when pacman touches them
  pacman.isTouching(pelletGroup,eatPellet)

  //commands to be followed when pacman touches ghosties
  pacman.isTouching(ghost1,touchGhosties)
  pacman.isTouching(ghost2,touchGhosties)
  pacman.isTouching(ghost3,touchGhosties)

  //displaying all game sprites
  drawSprites();  
  
  //displaying life left
text("Life left :"+life,420,11)

//display text for game over
if(life===0){

  textSize(20)
  strokeWeight(10)
  text("GAME OVER", 200,200)
}

//display text and function for game won
if(!pelletGroup[0]){
  textSize(20)
  strokeWeight(10)
  text("You win!!", 200,200)
  pacman.velocityX=0;
  pacman.velocityY=0;

  ghost1.velocityX=0;
  ghost1.velocityY=0;

  ghost2.velocityX=0;
  ghost2.velocityY=0;

  ghost3.velocityX=0;
  ghost3.velocityY=0;

}


}

//function to restart game after loosing a life
function restart(){
  gamestate="ready";
  ghost1.velocityY=-4;

  setTimeout(function() {
    ghost2.velocityY=-4
  }, 3000);

  setTimeout(function() {
    ghost3.velocityY=-4
  }, 6000);


}

//function to be executed when pacman touches the ghosts
function touchGhosties(){
  life-=1;
  pacman.velocityX=0;
  pacman.velocityY=0;

  ghost1.velocityX=0;
  ghost1.velocityY=0;

  ghost2.velocityX=0;
  ghost2.velocityY=0;

  ghost3.velocityX=0;
  ghost3.velocityY=0;

  if(life<=0){
    gameState="end"

    textSize(20)
    strokeWeight(10)
    text("GAME OVER", 200,200)

    pacman.destroy()
    
  }
  else if(life>0)
  {
    gameState="stop"
    pacman.x=455;
    pacman.y=455;

    ghost1.x=220;
    ghost1.y=250;

    ghost2.x=250;
    ghost2.y=250;

    ghost3.x=280;
    ghost3.y=250;

    setTimeout(function(){
      restart();
    },1000)

  }
  

}

//function to change direction of the ghost when it collides with the walls

function collision(ghost){
  ghost.collide(wall1,changeDirection)
  ghost.collide(wall2,changeDirection)
  ghost.collide(wall3,changeDirection)
  ghost.collide(wall4,changeDirection)

  ghost.collide(Vbar1,changeDirection)
  ghost.collide(Vbar2,changeDirection)
  ghost.collide(Vbar3,changeDirection)
  ghost.collide(Vbar4,changeDirection)

  ghost.collide(Hbar1,changeDirection)
  ghost.collide(Hbar2,changeDirection)
  ghost.collide(Hbar3,changeDirection)
  ghost.collide(Hbar4,changeDirection)

  ghost.collide(box1WD,changeDirection)
  ghost.collide(box1WR,changeDirection)
  ghost.collide(box1WL,changeDirection)

  ghost.collide(Ubox1,changeDirection)
  ghost.collide(Ubox2,changeDirection)
  ghost.collide(Ubox3,changeDirection)
}

//function to create horzontal palllets
function createPelletsHor(start,end,y){
  for(var i=start;i<=end;i+=16)
  {      
    var pellete=createSprite(i,y,4,4) 
    pelletGroup.add(pellete)     
  }
}

//function to create vertical palllets
function createPelletsVer(start,end,x){
  for(var i=start;i<=end;i+=16)
  {      
    var pellete=createSprite(x,i,4,4)  
    pelletGroup.add(pellete)     
  }
}

//function to make the pacman move
function keyPressed(){
  
  if(keyCode===RIGHT_ARROW){
    pacman.velocityX=4;
    pacman.velocityY=0;
    pacman.addImage(pacmanImgR)
  }
  if(keyCode===LEFT_ARROW){
    pacman.velocityX=-4;
    pacman.velocityY=0;
    pacman.addImage(pacmanImgL)
  }
  if(keyCode===UP_ARROW){
    pacman.velocityX=0;
    pacman.velocityY=-4;
    pacman.addImage(pacmanImgU)
  }
  if(keyCode===DOWN_ARROW){
    pacman.velocityX=0;
    pacman.velocityY=4;
    pacman.addImage(pacmanImgD)
  }

 
}


//function to eat the pallets
function eatPellet(pacman,pellete){
  pellete.remove();

}

//function to actually change the ghost directions
function changeDirection(ghost)
{
  
   if(dir==="ver" && ghost.velocityY===0)
   {
    
    rand=Math.round(random(1,2))
    switch(rand)
    {
      case 1: ghost.velocityX=-4;break;
      case 2: ghost.velocityX=4;break;    

    }    
     
   }
    
    if(ghost.velocityX===0 && dir==="hor")
     {
      rand=Math.round(random(1,2))
      switch(rand)
      {
        case 1: ghost.velocityY=-4;break;
        case 2: ghost.velocityY=4;break;
      }
      
    }   
        
}

//function to find the current ghost direction
function knowDirection(ghost,R,L,U,D){
  if(ghost.velocityX!==0)
  {
     dir="hor"

     if(ghost.velocityX<0){
       ghost.addImage(L)
     }
     else if(ghost.velocityX>0){
       ghost.addImage(R)
     }
  }
  else if(ghost.velocityY!==0){
    dir="ver"

    if(ghost.velocityY<0){
      ghost.addImage(U)
    }
    else if(ghost.velocityY>0){
      ghost.addImage(D)
    }
  }
}



