// Global variable to store the classifier
let classifier;

// Label (start by showing listening)
let label = "listening";

// Teachable Machine model URL:
let soundModelURL = 'https://teachablemachine.withgoogle.com/models/KCoAO1AXn/';


function preload() {
  // Load the model
  classifier = ml5.soundClassifier(soundModelURL+'model.json');
}


let snake;
let rez = 20;
let food;
let w;
let h;

function setup() {
  classifier.classify(gotResult);
  createCanvas(400, 400);
  w = floor(width / rez);
  h = floor(height / rez);
  frameRate(5);
  snake = new Snake();
  foodLocation();
  
}

function foodLocation() {
  let x = floor(random(w));
  let y = floor(random(h));
  food = createVector(x, y);

}

function controlSnake(){
  if (label === "Left") {
    snake.setDir(-1, 0);
  } else if (label === "Right") {
    snake.setDir(1, 0);
  } else if (label === "Down") {
    snake.setDir(0, 1);
  } else if (label === "Up") {
    snake.setDir(0, -1);
  } 

}

function draw() {
  scale(rez);
  background(255, 0, 0);
  if (snake.eat(food)) {
    foodLocation();
  }
  snake.update();
  snake.show();


  if (snake.endGame()) {
    print("END GAME");
    background(0, 255, 0);
    noLoop();
  }

  noStroke();
  fill(0, 255, 0);
  rect(food.x, food.y, 1, 1);
  
  fill(0,0,255);
  textSize(32);
  textAlign(CENTER, CENTER);
  text(label, width / 2, height / 2);
}

// The model recognizing a sound will trigger this event
function gotResult(error, results) {
  if (error) {
    console.error(error);
    return;
  }
  
  // The results are in an array ordered by confidence.
  // console.log(results[0]);
  label = results[0].label;
  controlSnake();
}
