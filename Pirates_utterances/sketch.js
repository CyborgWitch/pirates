//syllable test
var s = '';
var r;
var sounds= '';

//markov sentence generation experiment
var rm;
var sentences = "";
var sentenceList = [];
var font1;
var indivWords;

var testSentence = "Hellow, hello, pirates of the bay, lagoon."

var testReplace;

//variable for compass
var angle = 0.01;
var voiceCompass;

//p5 speech
var voice;
var voiceList;
var voice = new p5.Speech();
voice.interrupt = false;
var voice2 = new p5.Speech();
voice2.interrupt = true;
var voiceSentence;

pitch = 0.01;
voiceRate = 0.1;
opacity = 0;

//reverb = new p5.Reverb();

//var sentenceAnalyse

var font1, font2;

var mousePressedCounter = 0;
// OOP variables
let p;
var mouseXpos = [];
var mouseYpos = [];

// perlin Noise variables
var start = 0;
var increment = 0.01;


function preload() {
   font1 = loadFont("assets/LTC Fournier Le Jeune W00 Reg copy.ttf");
   font2 = loadFont("assets/FavoritStd-Regular.otf");
}

function windowResized() {
    setDimensions();
    resizeCanvas(width, height);

}

function setDimensions() {
    width = window.innerWidth;
    height = window.innerHeight;
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  p = new placement();
  angleMode(DEGREES);
  textFont(font1);
  textSize(28);
  textAlign(CENTER, TOP);
  //stroke(0);
  //strokeWeight(2);

  voice.setVoice("Google UK English Female");

  voice2.setVoice('Ting-Ting');
  voice2.setRate(1);
  //voice2.listVoices();

}

function draw() {
  background(0);
  fill(255, 0, 255);
  stroke(255, 0, 255);
  //line(0, 100, width, 100);
  rect(0, 100, width, height);
  //text(s, width/2, 150);

  p.display();
  p.clickPlace();
  voice.setRate(voiceRate);
  voice.setPitch(pitch);

  pitch = random(0.01);
  voiceRate = random(0.1, 2);

  opacity = map(voiceRate, 0.1, 2, 220, 255);

  // drawing grid where a=x and b=y
  push();
  stroke(0);
  for(let a=0; a<=width; a=a+20) {
    for (let b=100; b<=height; b=b+20) {
      line(a, 100, a, height);
      line(0, b, width, b);
    }
  }
  pop();
  //drawing perlin noise wave
  beginShape();
  //noFill();
  let xOff = start;
    for (let i=0; i<width; i++) {
         vertex(i, noise(xOff)*100);
         xOff += increment;

    }
  start += increment;
  endShape();

  p.display();
  p.clickPlace();
  p.move();

  rm = RiTa.markov(2);

  rm.addText("Speak, speak, for a shared myth \Speak, speak, pass the story round \‘rround the circle ‘rround the web \A choir! A choir! \Sail, sail, 2nite! Sail, sail, 2nite! \Sing, Sing, for a shared world \Sing! We sing!");

  rm.addText("Chorus, chorus \ us, us\ Add to the chorus")

  // rm.addText("Lacing and unLacing", "Lacing and Lacing", "Looping, Looping", "unLacing, unLacing");
  // rm.addText("Looping and looping \Lacing and unlacing \lacing and lacing \unlacing and unlacing");
  // rm.addText("Looping, Looping\ Lacing, unlacing \Lacing, Lacing \ un and un \Lace-up, lace-up \ Lace, Up\ Up and Up \Unlacing, unlaced \ um, um \ eyelet, eyelet");
    //
    // rm.addText("Lace-Up worlds \Lace-Up terrains \Lace-Up myths \Lace-Up songs \Lace-Up bodices \Lace-Up words \Lace-Up flags \Lace-Up seas \Lace-Up virtual \Lace-Up futures \Lace-Up bodies \Lace-Up code \Lace-Up browsers \Lace-Up signals \Lace-Up");

  // rm.addText("e-\e+\e:");
  rm.addText("Through the eyelet \ Through the storm \ Through the song \ Through the myth \ Through the screen \ Through the web");
  // rm.addText("Bodices, speech, terrains, Hands, tongues, code");
  // rm.addText("for \un \re  \ing ");

  // rm.addText("A larynx’s offerings o song \A larynx’s offering o stories \A larynx’s offering o plunder \ A larynx’s offering o reworlding");
  rm.addText("Gather at x . \ Gather in the . \Gather at xx:xx. \Gather , \Gather , \Gather 2nite. \Gather the web . \Find x, Found x. \Lace up X. \Gather all Xs ");

  // STUPID LITTLE COMPASS
  voiceCompass = map(voiceRate, 0.1, 2, 1, 2);

  if (angle<=7200 && angle>=-7200) {
      angle = angle*voiceCompass;

      if (voiceRate<=1) {
          angle = -angle*voiceRate;
      }
  } else {
    angle  = 0.01;
  }

  push();
    stroke(0);
    strokeWeight(1);
    ellipse(width-50, 120, 50);

    line(width-75, 120, width-25, 120);
    line(width-50, 95, width-50, 145);

        push();
        translate(width-50, 120);
        rotate(angle);
        line(0, -25, 0, 25);
        pop();

    // if (mouseX<width-25 && mouseX>width-75 && mouseY<145 && mouseY>95) {
    //     push();
    //     translate(width-50, 120);
    //     rotate(angle);
    //     line(0, -25, 0, 25);
    //     pop();
    // }
  pop();

  push();
    stroke(0);
    rect(0, 100, 300, 40);
    textFont(font2);
    textAlign(LEFT);
    textSize(18);
    fill(0);
    noStroke();
    text('CLICK TO +SONG: '+ mousePressedCounter, 3, 102, 400);
    text('CLICK TO +CREW: '+ mousePressedCounter, 3, 122, 400);
  pop();

}

function mousePressed() {
  mousePressedCounter++;
  voice.cancel();

  //each time mouse is pressed, add x and y coordinates to array
  mouseXpos.push(mouseX);
  mouseYpos.push(mouseY);

  // // each time mouse is pressed, generate that number of sentences and add them all to the sentenceList array
  // for(let i=0; i<=mousePressedCounter; i++) {
  //     sentences = rm.generate(i);
  //     sentenceList.push(sentences);
  // }

    sentences = rm.generate(1);
    sentenceList.push(sentences);
    voice.speak(sentenceList[mousePressedCounter-1]);
  // VOICES R NOW SPEAKING
  // for (let j=0; j<mousePressedCounter; j++) {
  //     j*voice.speak(sentenceList[mousePressedCounter-1]);
  //
  // }

  // testReplace = RiTa.soundsLike(sentences, { matchSpelling: true, minDistance: 5 });
  // console.log(testReplace);
  //voice.speak(sentenceList[mousePressedCounter-1]);

}

// class to place sentences based on mouse clicked positions
class placement {
  constructor() {
    this.x = mouseX;
    this.y = mouseY;
  }

  display() {
    for (let i=0; i<mouseXpos.length; i++) {
      //for (let k=0; i<mouseYpos.length; k++) {
        push();
          fill(0);
          stroke(0);
          strokeWeight(2);

          text(sentenceList[i], mouseXpos[i], mouseYpos[i], 350, opacity);

          ellipse(mouseXpos[i], mouseYpos[i], 10, 10);

          line(mouseXpos[i], mouseYpos[i], mouseXpos[i-1], mouseYpos[i-1]);
        pop();

        indivWords = RiTa.tokens(testSentence);
        //console.log(sentenceList[1]);
        //console.log(indivWords);
      //}
    }
  }

  move() {
    // this.x = this.x+random(-10, 10);
    // this.y = this.y+random(-10, 10);
  }
  clickPlace() {
    //this.x = mouseXpos
  }
}
