var width, height;

var s = "";
var r;
var sounds= "";
let font2;

// rita markov text scramble
let rm, rm2;
let sentences = "";
let tags = "";
let rmResponse;
let response = "";
let phones = "";
let callAnalyse, responseAnalyse;

//network of phones —— OOP CLASS
let phonemes = [];
let phonesTokens = "";
let p;
let phonesSpeaking = false;

let callGenerated = [];
let responseGenerated = [];

// fake HTML tags
let openTags = ["<seas>", "<user>", "<chorus>", "<digitalMyth>", "<CyberRealm>"];
let closeTags = ["</seas>", "</user>", "</chorus>", "</digitalMyth>", "</CyberRealm>"];
let index = 0;
let voice;
let callbackVoice;
let reverb;
let voiceVariable;

let odd = false;

//variables for canvas ++
let mouseCounter = 0;
let newWidth;
let canvasGrowing = false;

function preload() {
  font2 = loadFont("assets/LTC Fournier Le Jeune W00 Reg copy.ttf");
}

function setup() {
  setDimensions();
  createCanvas(windowWidth, windowHeight);
  //textFont(font2);
  textSize(15);
  textAlign(LEFT, TOP);

  //p = new PhonesMove();

  newWidth = width;

  voice = new p5.Speech();
  voice.setPitch(0);

  reverb = new p5.Reverb();

  callbackVoice = new p5.Speech();
  callbackVoice.setPitch(0);
  callbackVoice.setVoice('Ting-ting');
  //callbackVoice.setRate(1.5);
}

function windowResized() {
    setDimensions();
    resizeCanvas(width, height);
    createCanvas(width, height);
    newWidth = width;

    textSize(15);

}

function setDimensions() {
    width = window.innerWidth;
    height = window.innerHeight;
    newWidth = width;

    textSize(15);

}

function draw() {
  background(0);
  fill(255, 0, 255);

  rm = RiTa.markov(2);
    rm.addText("Speak, speak, for a shared myth \Speak, speak, pass the story round \‘rround the circle ‘rround the web \A choir! A choir! \A HOLLER! A HOLLER! \ You; H-O-L-L-E-R! You; H-O-L-L-E-R! \Sail, sail, 2nite! Sail, sail, 2nite! \2nite 2nite 2nite \Sing, Sing, for a shared world \Sing! We sing!");
    rm.addText("lace-up; dial-up;\ up; up; \loop; loop; \ thru; thru; \'round; 'round; \calibrate; calibrate;\Looping; Looping;\LOOP; LOOP;\ L-A-C-E-U-P L-A-C-E-U-P");
    rm.addText("HTML:seas \HTML:terrain \HTML:horizon \HTML:futures \cybernetic chorus \cybernetic choir \digital myth \ browser:: utterance \ browser:: song \ browser:: connection");
    rm.addText("Mine Browser, utters \ Mine Network, chorus");
    rm.addText("connect \ con.net.ing \ con-nect-ting \ connnect \ co n net \connectconnect \ con...con... \ . . . ..");
    rm.addText("web \ .web \ w.e.b. \ w-e-b \ ... \ w.w.w. \ www \ WWW \ W, W, W,\(web) \ {web} \ @web");
    rm.addText("e- \ e. \ e: \ e, e, \ e \ e");

  rmResponse = RiTa.markov(2);
    rmResponse.addText(": Run the speech \ : Run the ship \ : Run the song \ : Run the seas \ : Run the browsers, \ : Run the networks, \ : Run the decks \ : Run the code \ : Run the night");
    rmResponse.addText("choir --> chorus \b\pirates --> crew \b\ browsers --> web \b\ sites --> gatherings \b\ ");
    rmResponse.addText("line(horizon, x, y) \b\ location(x, y) \b\ crew++;\b\ text(sing, sing) \b\  ;  ;  \b\ ");
    rmResponse.addText("To deal in possibility \To deal in probability");
    rmResponse.addText("plane, \ field, \ space, \ margins, \ page, \ locale, \ dimension, \ canvas, \ bounds, \ territory, \ arena, \ realm, \ theatre, \ scene, \ domain, \ zone, \ ground, \ SITE, \ haunt, \ haunting, \ multiplicity, \ plural, ");
    rmResponse.addText(" bounds(); \ edge(); \ limits(); \ periphery(); \ beyond(); \ threshold(); \ site(); ");

    rmResponse.addText("Threshold: (x, y)\Threshold: horizon\Threshold: skin\Threshold: sea, sky,\Threshold: radius\Threshold: touch\Threshold: song\Threshold: possibility\Threshold: body");

    rmResponse.addText("\in communion with the sea and sky \ constant; boundary line, surface tension, tangent, skin \ these margins, these boundaries, liminal possibilities \labour is the collaborative wording \ labour is the collaborating worlding \ worlding, the myth making, the imagining, the singing, the writing \ negotiating —> rigging, contingency planes \ material agents of the threshold \ negotiating as collective practice... \ ...lacing/unlacing...knotting/unknotting...worlding/reworlding");

    rmResponse.addText("multiply{abundance} \ generate{abundance} \ counterfeit{collaboration} \ copy/paste{shared} \ piracy{possibility} ");
    rmResponse.addText("     --> — --> \--> — -->     \>>>>> >>>> \ , 2,");
    //rmResponse.addText("User=Pirate \User=Sail \User=Sing \User=here, here, here \Find us in the browser \ Find us in the logs");
    //rmResponse.addText("Lacing thru \Looping thru \Heaving thru the speech \Lace, Unlace \Haul, Haul \Enter, Enter");

  // HALF SCREEN GRID
  push();
    fill(255, 0, 255);
    stroke(0);
    rect(0, height/3, newWidth, height/3*2);
    for (let i=0; i<newWidth; i=i+10) {
      for (let j=height/3; j<height; j=j+10) {
          line(i, height/3, i, height);
          line(0, j, newWidth, j);
      }
    }
  pop();

  //HALF SCREEN GRID LACEUP TEXT
  push();
    // fill(0);
    // textFont(font2);
    // stroke(0);
    // strokeWeight(5);
    // textSize(64);
    // textAlign(CENTER, CENTER);
    // textLeading(56);
    // // p.display();
    // // p.move();
    //
    //   if (odd==true) {
    //     text("("+callAnalyse+")", width/2, 200, width/2);
    //
    //   } else if (odd==false) {
    //       text("("+responseAnalyse+")", width/2, 200, width/2);
    //   }
  pop();


  // sentences = rm.generate(1);

  //text(sentences, 60, 80, 200);
  //console.log(callAnalyse);
  //callAnalyse = RiTa.analyze(sentences);

  //cumulative call and response, writing markov text down the page
  for (let i=0; i<callGenerated.length; i++) {

      //text(callGenerated[i], 40, 80+(120*i), 200);
      push();
      textSize(17);
      textFont(font2);
      stroke(255, 0, 255);
      strokeWeight(1.225);
        push();
        noStroke();
        fill(0);
        rect(40+(300*i), 50, 200, 100);
        pop();
      text(callGenerated[i], 40+(300*i), 50, 200);
      pop();

      //RESPONSE
      for (let j=0; j<responseGenerated.length; j++) {
          push();
            fill(0);
            rect(240+(260*j), 190, 250, 50);
          pop();

          push();
            textAlign(LEFT, TOP)
            text(responseGenerated[j], 240+(260*j), 190, 250);
          pop();

          push();
          stroke(255, 0, 255);
          //.line(0, 150+150*j, width/2, 150+150*j);
          line(40+(300*i), 60, 240+(260*j), 190);
          pop();
      }

  }

  //markov for dummy HTML tags
  // rm2 = RiTa.markov(1);
  // rm2.addText("<><><>");
  text(openTags[index], 20, 15, 400);
  text(closeTags[index], 20, height/3-25, 400);
  if (canvasGrowing==true) {
    push();
    textSize(20);
    text('-->', newWidth-50, 15);
    pop();
  }

  for (let l=0; l<phonemes.length; l++) {
      phonemes[l].display();
      phonemes[l].move();

  }

}



function mousePressed() {
  index = int(random(0, 5));
  mouseCounter++;
  voice.cancel();


  if (odd==false) {
    //generate call
    sentences = rm.generate(1);
    callGenerated.push(sentences);
    voice.setRate(1);
    voice.speak(sentences);

    //analyse call and pull out phones/tokens
    callAnalyse = RiTa.phones(sentences[0]);
    voice.setRate(2);
    voice.speak(callAnalyse);
    //theoretically...clear token array for incoming tokens
    phonesTokens = [];
    phonesTokens = RiTa.tokenize(callAnalyse);
    console.log(phonesTokens);

    //CONSTRUCTING OBJECTS FOR EACH TOKEN...
    for (let k=0; k<phonesTokens.length; k++) {
        phonemes.push(new PhonesMove());
    }

    odd = true;

  } else if (odd==true) {
      odd = false;
      //generate response
      response = rmResponse.generate(1);
      responseGenerated.push(response);
      callbackVoice.speak(response);

      //analyse response
      responseAnalyse = RiTa.phones(response[0]);

  }
    //trying to add height to sketch, make cumulative scroll
    mouseCounter++;
    if (mouseCounter>9) {
        newWidth = width+(20*(mouseCounter-9));
        resizeCanvas(newWidth, height);
        canvasGrowing=true;
    }
    console.log(newWidth);
}


class PhonesMove {
  constructor() {
    this.x = 0;
    this.y = height/3;
  }

  display() {
    push();
      fill(0);
      textFont(font2);
      stroke(0);
      strokeWeight(5);
      textSize(96);
      textAlign(LEFT, TOP);
      textLeading(56);

      //display each TOKEN PHONEMES at all the different this.x and this.y
      //WHICH IT'S NOT DOING... it's putting every token at every xy
      for (let i=0; i<phonesTokens.length; i++) {
        this.x = i*20;
        this.y = height/3+(i*50);
        text(phonesTokens[i], this.x, this.y, width, height/2);
      }
    pop();
  }

  move() {
    this.x = this.x+random(-50, 50);
    this.y = this.y+random(-50, 50);
  }
}
