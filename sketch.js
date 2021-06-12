const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var engine, world;
var ground; 
var polygon, polygonImg;
var score = 0; 
var bg = "white"; 

function preload(){
    polygonImg = loadImage("polygon.png"); 
}

function setup() {
    var canvas = createCanvas(800, 700); 

    engine = Engine.create(); 
    world = engine.world; 

    //Ground and stand
    ground = new Ground(400, 700, 800, 20); 
    stand = new Ground(390, 250, 175, 30);

    //Level 3
    box1 = new Block(330, 235, 30, 40); 
    box2 = new Block(360, 235, 30,  40); 
    box3 = new Block(390, 235, 30, 40); 
    box4 = new Block(420, 235, 30, 40);     
    box5 = new Block(450, 235, 30, 40); 

    //Level 2
    box6 = new Block(360, 195, 30, 40); 
    box7 = new Block(390, 195, 30, 40); 
    box8 = new Block(420, 195, 30, 40); 

    //Level 1
    box9 = new Block(390, 155, 30, 40); 

    //Block holder with slings
    polygon = Bodies.circle(100, 200, 50, {'density': 1.0});
    World.add(world, polygon); 
    
    //Attaching slingshot
    slingShot = new SlingShot(this.polygon, {x: 100, y: 200});
    
    fetchTime();
}

function draw() {
    if(bg)
    
    background(bg); 

    //Updating engine
    Engine.update(engine); 
    strokeWeight(4); 

    text("SCORE: " + score, 700, 40); 

    imageMode(CENTER); 
    image(polygonImg, polygon.position.x, polygon.position.y, 50, 50);

    //Displaying all objects
    ground.display(); 
    stand.display(); 

    box1.display(); 
    box2.display(); 
    box3.display(); 
    box4.display(); 
    box5.display(); 
    box6.display(); 
    box7.display(); 
    box8.display(); 
    box9.display(); 

    slingShot.display(); 

    box1.score(); 
    box2.score(); 
    box3.score(); 
    box4.score(); 
    box5.score(); 
    box6.score(); 
    box7.score(); 
    box8.score(); 
    box9.score(); 
    
    drawSprites(); 
}

function mouseDragged() {
    Matter.Body.setPosition(this.polygon, {x: mouseX , y: mouseY});
}

function mouseReleased() {
    slingShot.fly(this.polygon); 
}

async function fetchTime() {
    var response = await fetch('http://worldtimeapi.org/api/timezone/Asia/Kolkata');
    var responseJSON = await response.json(); 

    var time = responseJSON.datetime;
    var hour = time.slice(11, 13);

    if (hour > 6 && hour < 18) {
        bg = "white"; 
    } else {
        bg = "cyan"; 
    }
}
