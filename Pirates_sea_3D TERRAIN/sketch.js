let width, height;
let scale = 25;

//rotate variables
let angle = 0;
let radius;
let radiusX, radiusY;
let topHalf = false;
let bottomHalf = false;

let cols;
let rows;
// let terrain = [];
// //let terrain = [][];

function setup() {

  createCanvas(windowWidth, windowHeight, WEBGL);
  setDimensions();
  textAlign(LEFT);
  angleMode(DEGREES);

  translate(-width/2, -height/2);

  cols = windowWidth/scale;
  rows = windowHeight/2/scale;

  //terrain = new [][];
  // for (let y=0; y<rows; y++) {
  //   for (let x=0; x<cols; x++) {
  //     terrain[x][y] = random(-5, 5);
  //   }
  //}
  // cols = windowWidth;
  // rows = windowHeight/2;

}

function windowResized() {
    setDimensions();
    resizeCanvas(width, height);
    createCanvas(width, height);
    angleMode(DEGREES);
    translate(-width/2, -height/2);

    cols = windowWidth/scale;
    rows = windowHeight/2/scale;
}

function setDimensions() {
    width = window.innerWidth;
    height = window.innerHeight;
    angleMode(DEGREES);
    translate(-width/2, -height/2);
    cols = windowWidth/scale;
    rows = windowHeight/2/scale;
}


function draw() {
  background(0);
  //fill(150, 0, 150);
  noFill();
  stroke(255, 0, 255);

  radiusX = map(mouseX, 0, width, -width/2, width/2);
  radiusY = map(mouseY, 0, height, -height/2, height/2);

  console.log(radiusX, radiusY);
  //centre of sketch to mouseX,Y
  push();
  line(0, 0, radiusX, radiusY);
  pop();

  //checking quadrants
  push();
  noStroke();
  if (radiusY<0) {
      topHalf = true;
      bottomHalf = false;
  } else if (radiusY>0) {
      topHalf = false;
      bottomHalf = true;
  }
  pop();

  rotateX(angle);


push();
translate(-width/2, -height/2);
  for (let y=0; y<rows-1; y++) {
    beginShape(TRIANGLE_STRIP);
    for (let x=0; x<cols; x++) {
      vertex(x*scale, y*scale, map(mouseX, 0, width, 0, random(-10, 5)));
      vertex(x*scale, (y+1)*scale, map(mouseY, 0, width, 0, random(-5, 5)));

    }
    endShape();
  }
pop();

  // for(let i=radiusX-width/4; i<=radiusX+width/4; i=i+20) {
  //   for (let j=radiusY-height/4; j<=radiusY+height/4; j=j+20) {
  //     //where i = x points for vertical lines
  //     //where k = y points for horizontal lines
  //     //where positive/negative combo of x/y needs to be accomodated
  //     if (quad2==true){
  //       line(i, -radiusY-height/4, i, -radiusY+height/4);
  //       line(radiusX-width/4, -j, radiusX+width/4, -j);
  //     } else if (quad3==true) {
  //       line(i, radiusY-height/4, i, radiusY+height/4);
  //       line(radiusX-width/4, j, radiusX+width/4, j);
  //     } else if (quad1==true) {
  //       line(i, -radiusY-height/4, i, -radiusY+height/4);
  //       line(radiusX-width/4, -j, radiusX+width/4, -j);
  //     } else {
  //       line(i, radiusY-height/4, i, radiusY+height/4);
  //       line(radiusX-width/4, j, radiusX+width/4, j);
  //     }
  //
  //   }
  // }


}


function mouseDragged() {

  // radiusX/Y mapped to translation of origin at (width/2, height/2)
  // radiusX = map(mouseX, 0, width, -width/2, width/2);
  // radiusY = map(mouseY, 0, height, -height/2, height/2);

  radius = dist(0, 0, mouseX, mouseY);
  angle = map(radius, 0, width/2, -360, 360);

}
