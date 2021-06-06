let sparkles = [];
let numObjects = 0

let numOfCrew = 0;
let mousePressedCounter = 0;


let pirateCoordinateX = [''];
let pirateCoordinateY = '';

let pirateXCoordinates = [];
let pirateYCoordinates = [];

//pirate worlding
// let entanglement = ["futures", "terrains", "crew", "depths", "histories", "myths", "possibilities", "seas", "time", "routes", "systems", "sites", "browsers", "users", "virtuality", "constructs", "archives", "realms", "worlds", "ideals", "ownership", "screens", "data", "information", "knowledge", "bonds", "fates", "web", "channels", "convention", "rules", "maps", "desire", "dreams", "stories"];
// let entangleIndex = 0;


let coordinateXPlacement = 125;
let coordinateYPlacement;

// perlin Noise variables
let start = 0;
let increment = 0;


function setup() {

  createCanvas(600, 600);
  textAlign(CENTER, CENTER);
  frameRate(5);

}

function mouseReleased() {

  //# of times mouse is clicked, adding to graph increment
  mousePressedCounter++;
  increment = 0.01
  if (mousePressedCounter>1) {
      increment = increment+0.001;
  }

  //constructing the sparkles
  for (let i=0; i<mousePressedCounter; i++) {
       sparkles.push(new Sparkle(300, 300));
  }

  // entangleIndex = int(random(0, entanglement.length));

  console.log(mousePressedCounter);
  console.log(sparkles.length);

}

function draw() {

  background(220);

  noStroke();
  fill(255, 0, 0);

  push();
  noFill();
  stroke(255, 0, 0);
  rect(140, -10, width, 38);
  pop();

  push();
  //fill(220);
  beginShape();
  let xOff = start;
    for (let i=140; i<width; i++) {
         vertex(i, noise(xOff)*30);
         xOff += increment;
    }
  start += increment;
  endShape();
  pop();


  //paratext data log
  push();
    textAlign(LEFT, TOP);
    text('click = hands on deck++', 4, 5);

    text('# of crew: '+ mousePressedCounter, 4, 20);
    text('x location of pirateCrew: ', 4, 35);

  pop();

  //calling on all properties and actions of the sparkles
  for (let i=0; i<mousePressedCounter; i++) {
      sparkles[i].display();
      sparkles[i].move();
      sparkles[i].blink();
      sparkles[i].edges();


      let pirateCoordinateX = int(sparkles[i].x);
      let pirateCoordinateY = int(sparkles[i].y);

      pirateXCoordinates = int(sparkles[i].x);
      pirateYCoordinates = int(sparkles[i].y);

      for (let j=0; j<sparkles.length; j++){
          line(sparkles[j].x, sparkles[j].y, sparkles[i].x, sparkles[i].y);

      }

      push();
        fill(255, 0, 0);
        noStroke();
        textAlign(LEFT, TOP);
        text(pirateCoordinateX+',', 140+i*30, 35);

      pop();
  }

  //map grid
  for(let i=0; i<width; i=i+10) {
    for (let j=50; j<height; j=j+10) {
      push();
        stroke(255, 0, 0);
        strokeWeight(0.02);
        line(i, 50, i, height);
        line(0, j, width, j);
      pop();
    }
  }

}


class Sparkle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.opacity = 255;

  }

  display() {
    noFill();
    stroke(255, 0, 0, this.opacity);

      //BIG RED X
      push();
        fill(255, 0, 0);
        textSize(64);
        text('x', this.x+50, this.y)
      pop();

//       //PIRATE_ text
      push();
        //strokeWeight();
        textSize(20);
        noStroke();
        fill(255, 0, 0, this.opacity);
        text('pirate_', this.x, this.y);
      pop();


      //entanglement text
      // push();
      //   //strokeWeight();
      //   textSize(20);
      //   noStroke();
      //   fill(255, 0, 0);
      //   text(entanglement[entangleIndex], this.x, this.y);
      // pop();

  }

  move() {
    if (mouseIsPressed) {
        this.x = this.x;
        this.y = this.y;
    } else {
        this.x = this.x + random(-50, 50);
        this.y = this.y + random(-50, 50);
    }
  }

  blink() {
    if (mouseIsPressed) {
      this.opacity = 255;
    } else {
      this.opacity = random(0, 255);
    }
  }

  edges() {
    if(this.x>=width || this.x<=0 || this.y>=height || this.y<=0) {
      this.x = 300;
      this.y = 300;
    }
  }
}
