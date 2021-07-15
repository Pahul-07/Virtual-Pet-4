var food
var gameState="hungry"

var bedroomImg, gardenImg, washroomImg;

function preload(){
  dogHappy= loadImage("images/boy2.png");
  dogSad= loadImage("images/boy1.png");  
  bedroomImg= loadImage("images/bedroom.png");
  gardenImg= loadImage("images/garden.png");
  paintingImg= loadImage("images/kitchen.png")
}

function setup() {
	createCanvas(800, 700);
  
  database =firebase.database();

  dog= createSprite(700,300,50,50);
  dog.addImage(dogSad);
  dog.scale=0.6

  paintButton= createButton("I want to do Painting");
  paintButton.position(400,200);
  
  sleepButton= createButton("I want to Sleep");
  sleepButton.position(580,200);

  playButton= createButton("Let's play");
  playButton.position(735,200);

  hungryButton= createButton("I am hungry");
  hungryButton.position(850,200);

  database.ref('food').on("value",readPosition);

  milk1=new Food();
  milk1.getfeedTime();
  
  database.ref('gameState').on("value",(data)=>{
    gameState=data.val();
  })
}


function draw() {  
  background(0);

  textSize(20);
  fill("white");
  text("Fedtime: "+milk1.feedTime,200,50);

  milk1.buttons();
  milk1.milkImg();

  paintButton.mousePressed(()=>{
    gameState="painting"
  })

  sleepButton.mousePressed(()=>{
    gameState="sleeping"
  })

  playButton.mousePressed(()=>{
    gameState="playing"
  })

  hungryButton.mousePressed(()=>{
    gameState="hungry"
  })

  currentTime= hour();

  if(gameState === "playing"){
    milk1.updateState("playing");
    milk1.garden();
    dog.remove();
  }
  else if(gameState === "sleeping"){
    milk1.updateState("sleeping");
    milk1.bedroom();
    dog.remove();
  }
  else if(gameState === "painting"){
    milk1.updateState("painting");
    milk1.painting();
    dog.remove();
  }
  else if(gameState === "hungry"){
    milk1.updateState("hungry");
  }
console.log(gameState)

  if(gameState!=="hungry"){
    milk1.button1.hide();
    milk1.button2.hide();
  }
  else{
    milk1.button1.show();
    milk1.button2.show();

    dog.addImage(dogSad);
    dog.scale=0.6; 
  }

  if(food===0){
    dog.addImage(dogHappy);
    dog.scale=0.214
  }

  //if(food>0){
   // dog.addImage(dogSad);
    //dog.scale=0.6
  //}

  drawSprites();
}

function readPosition(data){
  food= data.val();
}

function writeStock(data){
  database.ref('/').set({
    food:data,
    feedtime:hour()
  })
}
//get feedtime= myhour frustration()json valure= 26*26 !@my wth why is he not going 
//function currentTime(lala)lalisa manovan ASAP plz go dude