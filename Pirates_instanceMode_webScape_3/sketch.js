//template for topP5 sketch
var sketchTop = function(p) {

  p.width = p.windowWidth;
  p.height = p.windowHeight/5;

  p.x = p.windowWidth/2;
  p.y = p.windowHeight/4;

  p.screen1 = true;
  p.screen2 = false;

  p.web = false;
  p.sea = false;
  p.song = false;
  p.webSong = false;
  p.webSongSyllab;
  //p.pink = (255, 0, 255);
  p.voice;
  p.mic;
  p.soundLevel = 0;
  p.soundLevelMapped;
  p.soundHistory = [];

  p.mapMouseSpeed = 3;

  //arrays of generated text
  p.callGenerated = [];
  p.responseGenerated = [];
  p.textXLength;
  p.canvasGrowing = false;
  p.movingY;
  p.movingTopY;

  // perlin Noise variables
  p.start = -200;
  p.increment = 0.01;
  p.xOff;

  p.font2;

  p.preload = function() {
    p.font2 = p.loadFont("assets/LTC Fournier Le Jeune W00 Reg copy.ttf");
  }
  p.setup = function() {
    var canvas = p.createCanvas(p.windowWidth, p.windowHeight/5);
    canvas.parent("topSketch");
    p.setDimensions();
    canvas.mousePressed(p.topClick);
    //p.noCursor();
    //p.textFont(p.font2);
    p.voice = new p5.Speech();
    // p.mic = new p5.AudioIn();
    // p.mic.start();
  }
  p.windowResized = function() {
    p.setDimensions();
    p.resizeCanvas(p.windowWidth, p.windowHeight/5);
  }
  p.setDimensions = function() {
    p.width = p.windowWidth;
    p.height = p.windowHeight/5;
  }

  p.draw = function() {
    p.background(255, 0, 255);

    if (p.screen1) {
      //Mic levels, mapped, array
      p.soundLevelMapped = p.map(p.soundLevel, 0, 1, 0, 0.1);
      p.soundHistory.push(p.int(p.soundLevelMapped));
      //console.log(p.soundLevelMapped);

      p.push();
        p.textFont(p.font2);
        p.textAlign(LEFT, TOP);
        p.textSize(72);
        p.textLeading(70);
        p.fill(0);
        p.stroke(0);
        // fill(255, 0, 255);
        // stroke(255, 0, 255);
        p.strokeWeight(8);
        p.text("Sail, Sail, for a Shared Myth", 10, 0, 600);
      p.pop();

    } else if (p.screen2) {

      for (let i=0; i<p.callGenerated.length; i++) {
          p.fill(0);
            p.push();
              p.noStroke();
              p.fill(255, 0, 255);
              p.rect(30+(420*i), 20, 400, 80);
            p.pop();

            p.push();
              // p.textFont(p.font2);
              // p.textSize(18);
              // p.textLeading(16);
              // p.textFont(p.font2);
              // p.stroke(0);
              // p.strokeWeight(2);
              p.push();
                p.textAlign(LEFT, CENTER);
                p.textFont(p.font2);
                p.textSize(36);
                p.stroke(0);
                p.strokeWeight(4);
                p.text(i, 10+(420*i), 20);
              p.pop();

              p.textSize(14);
              p.textLeading(14);
              p.text(p.callGenerated[i], 30+(420*i), 20, 390);
              //trying to split up into syllables:
              if(p.webSong) {
                 //console.log(p.CallGenerated[i]);
                 //p.webSongSyllab = RiTa.syllables(p.CallGenerated[i]);
                 //p.text(p.webSongSyllab, 40+(300*i), 50, 200);

              }
            p.pop();

            //RESPONSE
            for (let j=0; j<p.responseGenerated.length; j++) {
              p.movingTopY = 50;

                    p.push();
                      p.noStroke();
                      p.fill(255, 0, 255);
                      p.rect(30+(420*j), p.height/2, 400, p.height/2);
                    p.pop();

                    p.push();
                      // p.textFont(p.font2);
                      // p.textSize(18);
                      // p.textLeading(16);
                      // p.textFont(p.font2);
                      // p.stroke(0);
                      // p.strokeWeight(2);
                      // //p.textSize(15);
                      p.textSize(14);
                      p.textLeading(14);
                      p.text(p.responseGenerated[j], 30+(420*j), p.height/2, 390);
                    p.pop();

                  //nested for loops because we want the lines to draw to both
                  p.push();
                    p.strokeWeight(1);
                    p.stroke(0);
                    p.line(10+(420*(p.callGenerated.length-1)), 20, 30+(420*(p.responseGenerated.length-1)), p.height/2);
                  p.pop();

                  //all call[i] text boxes added + final 180
                  p.textXLength = 400+(i)*440;

            }
      }
    }

    if (p.canvasGrowing) {
        p.push();
          console.log("arrow");
          p.textFont(p.font2);
          p.textSize(36);
          p.fill(255, 0, 255);
          p.stroke(255, 0, 255);
          p.strokeWeight(3);
          p.rightArrow = p.text('-->', p.width-70, 30);
        p.pop();
    }

  }

  //mousePressed WITHIN top sketch
  p.topClick = function() {
    console.log('topCLik');
  }

}

//creating an INSTANCE of the top canvas
var sketchTop = new p5(sketchTop);

var width, height;
var newTopWidth;
let mouseCounter = 0;
let mouseSpeed;
let screen = 1;
let button;

//sound effect
let ocean;
let distort;
let osc;
let oceanPlayed = 0;

//SPEECH VARIABLES
let voice;
let responseVoice;
let monoSynth;
let noteSelect;
let mapVoiceSpeed;
//MIC listen, wave variables & array
let mic;
let start = 200;
let increment = 0.01;
let xOff, mapMouseSpeed;
let soundLevel = 0;
let soundLevelMapped;
let soundHistory = [];

//quadrant checks
let onGrid = false;
let p1st = false;
let p2nd = false;
let p3rd = false;
let p4th = false;
let p5th = false;
let p6th = false;
let p7th = false;
let p8th = false;
let web = false;
let sea = false;

let webSong = false;
let webSpeech = false;
let seaSong = false;
let seaSpeech = false;

// rita markov text scramble
let rm, rmResponse;
let sentences = "";
let tags = "";
let response = "";
//let callAnalyse, responseAnalyse;
let odd = false;
let markovNum = 2;
let markovReponseNum = 2;
let generateNum = 2;
let generateResponseNum = 3;

//new tokens OOP VARIABLES
let currentTokenise = [];
let concordance = [];

// array for speech token objects
let speechTokens = [];
let t;

function preload() {
  //ocean = loadSound("assets/szegvari__ship-ambient.wav");
  //ocean = loadSound("assets/gkillhour_underwater-ocean-bubbling.wav");
}

//MAIN SKETCH: BOTTOM GRID, WILL CALL SPEECH AND TEXT AND SOUND HERE.
function setup() {
  setDimensions();
  var canvas = createCanvas(windowWidth, windowHeight/5*4);
  canvas.parent = ("bottomSketch");
  canvas.mousePressed(mouseBottom);

  voice = new p5.Speech();
  voice.setPitch(0);
  voice.setVoice("Karen");
  responseVoice = new p5.Speech();
  responseVoice.setVoice("Karen");
  responseVoice.setPitch(0);
  mic = new p5.AudioIn();
  mic.start();
  osc = new p5.Oscillator();

  t = new SpeechTokens();

  fill(255, 0, 255);
  //textFont(sketchTop.font2);
  stroke(255, 0, 255);
  strokeWeight(3);
  textSize(30);

  button = createButton('Set Sail -->');
  button.position(10, height/2+50);
  button.mousePressed(screen2);
}

function windowResized() {
  background(255, 0, 255);
  setDimensions();
  resizeCanvas(width, height);
  //createCanvas(width, height);
}

function setDimensions() {
  background(255, 0, 255);
  width = window.innerWidth;
  height = window.innerHeight/5*4;
}

function draw() {
  background(255, 0, 255);
  monoSynth = new p5.MonoSynth();
  // console.log("onGrid"+onGrid);
  // console.log("web"+web);

  //check where mouseY is
  if (mouseY<height/3*2) {
      web = false;
      sea = false;
      onGrid = false;
      osc.stop();
      monoSynth.dispose();
      //console.log("onGrid"+onGrid);
  } else if (mouseY>height/3*2 && mouseY<height/6*5){
      onGrid = true;
      web = true;
      sea = false;
  } else if (mouseY>height/6*5){
      onGrid = true;
      sea = true;
      web = false;
  }

  //sound levels and mouse speed for wave ocean
  // sketchTop.soundLevel = mic.getLevel();
  // sketchTop.mapMouseSpeed = 3+map(mouseSpeed, 0, width, 0, 10);

  soundLevel = mic.getLevel();
  soundLevelMapped = map(soundLevel, 0, 1, 0, 0.02);
  soundHistory.push(int(soundLevelMapped));
  mouseSpeed = dist(mouseX, mouseY, pmouseX, pmouseY);
  mapMouseSpeed = 5+map(mouseSpeed, 0, width, 0, 5);
  mapVoiceSpeed = map(mouseSpeed, 0, width, 0.5, 5);
  increment = 0.001+soundLevelMapped;
  //drawing perlin noise + sound + mouseSpeed wave
    push();
      //translate(0, 100);
      frameRate(5);
      fill(0);
      stroke(0);

      beginShape(TRIANGLE_STRIP);
      xOff = start;
        for (let i=0; i<width; i++) {
             vertex(i, noise(xOff)*180*mapMouseSpeed);
             vertex(i, (height/3*2)-10);
             xOff += increment;
        }
             start += increment;
      endShape();
    pop();


if (screen==1) {
    synthGrid();
    // fill(0);
    // rect(0, 0, width, height/3*2-10);

    // push();
    // textFont(sketchTop.font2);
    // textAlign(LEFT, TOP);
    // textSize(100);
    // textLeading(96);
    // fill(0);
    // stroke(0);
    // // fill(255, 0, 255);
    // // stroke(255, 0, 255);
    // strokeWeight(10);
    // text("Sail, Sail, for a Shared Myth", 10, 10, width/2);
    // pop();

    push();
      textAlign(LEFT, TOP);
      textSize(16);
      textLeading(18);
      fill(0);
      // fill(255, 0, 255);
      text("Pirates are the bastard agents of the seas and the web, operating in open networks of possibility to challenge and extend boundaries. As figures with a rich inventory of language and materiality, their mythos becomes a means to reimagine our digital terrain.\n\nSail forth into this interactive sea/webscape, where you can generate a narrative of pirate speech and song in collaboration with your browser.", 10, 18, 400);
    pop();

} else if (screen==2) {
    t.display();
    synthGrid();
    rm = RiTa.markov(markovNum);
    rmResponse = RiTa.markov(markovReponseNum);

    // if statements and text for each eigth of the quadrant
    if (mouseY>height/3*2 && mouseY<height/6*5) {
        // WE ARE IN THE TOP ROW
        p5th = false;
        p6th = false;
        p7th = false;
        p8th = false;
        if (mouseX<width/4){
            p1st = true;
            p2nd = false;
            p3rd = false;
            p4th = false;
            markovNum = 2;
            markovReponseNum = 2;
            generateNum = 0.5;
            generateResponseNum = 3;
              rm.addText("Oscillator: ♫ \Oscillator: ♫♬ \Oscillator: ♯♩♫");
              rmResponse.addText("bebopp bee bop \ Bop bop bop \ boop boop bOooOOOoopp");

        } else if (mouseX>width/4 && mouseX<width/2) {
            p2nd = true;
            p1st = false;
            p3rd = false;
            p4th = false;
            markovNum = 2;
            markovReponseNum = 2;
            generateNum = 1;
            generateResponseNum = 3;
            rm.addText("Oscillator: ♫ \Oscillator: ♫♬ \Oscillator: ♯♩♫");
            rm.addText("bubbleBop \ bub bbub \ b b b ");
            rmResponse.addText("bebopp bee bop \ Bop bop bop \ be beeee booobebeboboebOOP");

        } else if (mouseX>width/2 && mouseX<width/4*3) {
            p2nd = false;
            p1st = false;
            p3rd = true;
            p4th = false;

            markovNum = 2;
            markovReponseNum = 2;
            generateNum = 1;
            generateResponseNum = 2;

            rm.addText("HTML: seas \HTML: terrain \HTML: horizon \HTML: futures \ cybernetic chorus \cybernetic choir \digital myth \ browser:: utterance \ browser:: song \ browser:: connection");
            rm.addText("Smirk \ Smirk\ Smirk \ Smirk! \S-M-I-R-K ");
            rm.addText("lace-up; dial-up;\ up; up; \loop; loop; \ thru; thru; \'round; 'round; \calibrate; calibrate;\Looping; Looping;\LOOP; LOOP;\ L-A-C-E-U-P L-A-C-E-U-P");

            rmResponse.addText("Practictioners of for loops and lace-up worlds \lace-up myths, lace-up bodices \laced-up thru opportunistic eyelets of HTML");
            rmResponse.addText("choir --> chorus \b\pirates --> crew \b\ browsers --> web \b\ sites --> gatherings \b\"line(horizon, x, y) \b\ location(x, y) \b\ crew++;\b\ text(sing, sing) \b\  ;  ;  \b\ ");
            rmResponse.addText("connect \ con.net.ing \ con-nect-ting \ connnect \ co n net \connectconnect \ con...con... \ . . . ..web \ .web \ w.e.b. \ w-e-b \ ... \ w.w.w. \ www \ WWW \ W, W, W,\(web) \ {web} \ @webe- \ e. \ e: \ e, e, \ e \ e");
            rmResponse.addText("Threshold: (x, y)\ Threshold: horizon\ Threshold: skin\ Threshold: sea, sky,\ Threshold: radius\ Threshold: touch\Threshold: song\ Threshold: possibility\ Threshold: body");

        } else if (mouseX>width/4*3) {
            p2nd = false;
            p1st = false;
            p3rd = false;
            p4th = true;
            markovNum = 2;
            markovReponseNum = 2;
            generateNum = 2;
            generateResponseNum = 2;

            rm.addText("Web trash, shiny mirages\ Pixel coins in Pixel chests\ Corrupted files and torrents buried\DOWNLOAD the filth! \DOWNLOAD the F-I-L-T-H! \DOWNLOAD the eyeliner! \DOWNLOAD the rotting carcass of mp3,4, \Or dvd rip rip rip rip bytes like paper! \Or dvd RIP RIP RIP RIP bytes like paper! \Then get the rascals! Scrubbing grimy hardrives... plucking mangled digital bones from clawed digital flesh! \Damn corrupt bits! Blending demo so demo sounds worse than the real demo! \Shiny, sparkling garbage, trawling thru the synths. \Turn me back into ASCII, I am growing weary.\Eeeeeeville. Online piracy's sick toothless grin \Simply ... Sick. \ Ahoy!");

            rm.addText("Practictioners of for loops and lace-up worlds \lace-up myths, lace-up bodices \laced-up thru opportunistic eyelets of HTML");

            rmResponse.addText("Yearning for HTTP connections \Click to lace up these pixels, pixels, pixels \File Transfer Protocol is-->yearning across time and space \ Hit ENTER; Hit ENTER; \Transfer heart emoticon, sailing, sailing \Ruffles billowing, Cutlasses drawn,\ Press ‘Command'");

        }

    } else if (mouseY>height/6*5) {
        // WE ARE IN THE BOTTOM ROW
        p1st = false;
        p2nd = false;
        p3rd = false;
        p4th = false;
        if (mouseX<width/4){
              p5th = true;
              p6th = false;
              p7th = false;
              p8th = false;
              markovNum = 2;
              markovReponseNum = 2;
              generateNum = 0.5;
              generateResponseNum = 3;
                rm.addText("Synth: ♫ \Synth: ♫♬ \Synth: ♯♩♫\ Hover for pentatonic song");
                rmResponse.addText("la ah laaa laaa \ Minor Synth: A-C-D-E-G-A");

          } else if (mouseX>width/4 && mouseX<width/2) {
            p5th = false;
            p6th = true;
            p7th = false;
            p8th = false;
            markovNum = 2;
            markovReponseNum = 2;
            generateNum = 1;
            generateResponseNum = 3;
              rm.addText("Move to compose\ Ooh Ooh Ooh \ Synth, ");

              rm.addText("♫♪♬ \♫♪♬ \♯♩♫♫♮\♩♫♫♭♩♫♫");
              rmResponse.addText("la la laaah la la \ OOoooooOOOh OOoohhoohhh \ oooohoooh ho ho\ daadaaa da da da\ aaaAAhha, a, a, a");

        } else if (mouseX>width/2 && mouseX<width/4*3) {
            //console.log('seaSpeech.2');
            p5th = false;
            p6th = false;
            p7th = true;
            p8th = false;
            markovNum = 2;
            markovReponseNum = 2;
            generateNum = 1;
            generateResponseNum = 2;
              rm.addText("Where s = sea \Where s = sail \ Where s = scurvy\ Where s = scum \Where s = speak \ Where s = song \So s = sea \So s = sail \ So s = scurvy\ So s = squeal \So s = see \ So s = scroll \Such that s = shout \Such that s = sword \ Such that s = siren\ Such that s = spit \Such that s = soup \ Such that s = seafarer \Such that s = SOS");
              rm.addText("A larynx’s offerings o song \A larynx’s offering o stories \A larynx’s offering o pleasure \ A larynx’s offering o reworlding");

              rmResponse.addText("Our communion with the swelling of speech. \Our labour is the sea and sky. \Our ship is the vessel of the threshold \ Our survival is hard hot pink futures.\Our ship sails into Hard Hot Pink Futures. ");
              rmResponse.addText("Gather at x . \ Gather in the . \Gather at xx:xx. \Gather , \Gather , \Gathering, 2nite. \Gathering, the songs . \Gathering, the words. \Find x, Found x. \Lace up X. ");

        } else if (mouseX>width/4*3) {
            p5th = false;
            p6th = false;
            p7th = false;
            p8th = true;
            markovNum = 2;
            markovReponseNum = 2;
            generateNum = 3;
            generateResponseNum = 3;
              rm.addText("Engineering a chorus for hellbent survival, \song notes to sail us out out out. \Generating lore to power a web \Deal in the wording of our world \Shiver, Shiver, at the thresholds of possibility. \Sail to the dawn edges of the browser, out of reach of known horizons.");
              rm.addText("Flirt, smirk, thru the eyelets and skin \ Lacing up touch and longing \Flirt, flirt, with thine own unbridled future \ Press upon this sea floor synth-pad \Find me a dagger \To the throat of the threshold \Surface skin tension against the blade");

              rmResponse.addText("Smirk \ Smirk\ Smirk \Smirk \Smirk \ Smirk! ");

              rmResponse.addText("Black and Hot Pink for a combo that steals into the night, \ For speak borne of the web, Uncharted, Uncharted. \Lace lace together black sails and hot pink rigging for a New Bastard Myth. \Scrub our souls \Pixelate, Corrupt, SkullScrub, Crossbones,");
              rmResponse.addText("\in communion with the sea and sky \ constant; boundary line, surface tension, tangent, skin \ these margins, these boundaries, liminal possibilities \labour is the collaborative wording \ labour is the collaborating worlding \ worlding, the myth making, the imagining, the singing, the writing \ negotiating —> rigging, contingency planes \ material agents of the threshold \ negotiating as collective practice... \ ...lacing/unlacing...knotting/unknotting...worlding / reworlding");
        }
    }

  }
}

function synthGrid() {
  fill(255, 0, 255);
  noStroke();
  rect(0, height/3*2-10, width, height/3+10);

  //BOTTOM GRID
  push();
      for (let i=10; i<width-10; i=i+10) {
        for (let j=height/3*2; j<height-10; j=j+10) {
          stroke(0);
          strokeWeight(1);

          line(0, (height/3*2)-10, width-10, (height/3*2)-10);
          //base grid
          line(i, height/3*2, i, height-15);
          line(10, j, width-20, j);

            //SOUNDS
            if (mouseX>i && mouseX<i+10 && mouseY>j && mouseY<j+10) {
                fill(0);
                //synthpad square and values
                rect(i, j-10, 20, 20);
                let mapOsc = map(mouseX, 0, width, 200, 500);
                let mapNote = int(map(mouseX, 0, width, 0, 5));
                let mapVol = int(map(mouseX, 0, width, 0, 0.5));
                let noteSelect = ["A4", "C4", "D4", "E4", "G4", "A5"];

                  if (web && !sea) {
                      monoSynth.dispose();
                      osc.start();
                      osc.amp(0.2);
                      osc.freq(mapOsc);
                      osc.freq(60, 1);
                  } else if (sea && ! web) {
                      osc.stop();
                      monoSynth.play(noteSelect[mapNote], 0, mapVol, 1);
                  } else {
                      osc.stop();
                      monoSynth.dispose();
                  }
              }

          }
      }



      push();
          strokeWeight(10);
          stroke(0);
          //CROSS AXES
          line(0, height/6*5, width, height/6*5);
          line(width/2, height/3*2, width/2, height);
          //little arrow ends
          //left
          line(0, height/6*5, 40, (height/6*5)-40);
          line(0, height/6*5, 40, (height/6*5)+40);
          //right
          line(width, height/6*5, width-40, (height/6*5)-40);
          line(width, height/6*5, width-40, (height/6*5)+40);
          //top
          line(width/2, height/3*2, width/2-40, (height/3*2)+40);
          line(width/2, height/3*2, width/2+40, (height/3*2)+40);
          //bottom
          line(width/2, height, width/2-40, height-40);
          line(width/2, height, width/2+40, height-40);
      pop();


  pop();
  //little word bubbles
  push();
    fill(0);
    //noFill();
    strokeWeight(2);
    stroke(255, 0, 255);
    ellipse(50, height/6*5, 80, 40);
    ellipse(width-60, height/6*5, 110, 40);
    ellipse(width/2, (height/3*2)+30, 80, 40);
    ellipse(width/2, height-30, 80, 40);
  pop();
  //axes words
  push();
    fill(255, 0, 255);
    textFont(sketchTop.font2);
    stroke(255, 0, 255);
    strokeWeight(3);
    textSize(30);
    textAlign(CENTER, CENTER);
    text('Song', 50, (height/6*5)-5);
    text('Speech', width-60, (height/6*5)-5);
    text('Web', width/2, (height/3*2)+25);
    text('Sea', width/2, height-35);
  pop();

  push();
  textFont(sketchTop.font2);
  stroke(0);
  strokeWeight(3);
  textSize(26);
  textAlign(LEFT, CENTER);
  fill(0);
  if (webSong) {
      text("(Web, Song)", 10, 25);
  } else if (webSpeech) {
      text("(Web, Speech)", 10, 25);
  } else if (seaSong) {
      text("(Sea, Song)", 10, 25);
  } else if (seaSpeech) {
      text("(Sea, Speech)", 10, 25);
  }
  pop();

}

function screen2() {
  screen = 2;
  sketchTop.screen1 = false;
  sketchTop.screen2 = true;
  button.remove();
}

function mouseBottom() {
    userStartAudio();
    currentTokenise = [];
    concordance = [];

if (screen==1){

} else if (screen==2) {

    //grow canvas on every new call and response pair
    if (sketchTop.textXLength>width && odd==true) {
        mouseCounter++;
        let addWidth = mouseCounter*220;
        newTopWidth = sketchTop.windowWidth+addWidth;
        sketchTop.resizeCanvas(newTopWidth, sketchTop.height);
        sketchTop.canvasGrowing = true;
    }

    if (p1st || p2nd) {
        webSong = true;
        webSpeech = false;
        seaSong = false;
        seaSpeech = false;
    } else if (p3rd || p4th) {
        webSpeech = true;
        webSong = false;
        seaSong = false;
        seaSpeech = false;
    } else if (p5th || p6th) {
        seaSong = true;
        webSong = false;
        webSpeech = false;
        seaSpeech = false;
    } else if (p7th || p8th) {
        seaSpeech = true;
        webSong = false;
        webSpeech = false;
        seaSong = false;
    }

  //call and response(even and odd) to alternately generate sentences and feed to voice
  if (onGrid && odd==false) {
    //generate call
      voice.cancel();
      voice.setRate(1);
      sentences = rm.generate(1, {temperature:200, minLength:10, maxLength: 100, allowDuplicates:false});
      sketchTop.callGenerated.push(sentences);
      currentTokenise.push(RiTa.tokenize(sentences[0]));
      concordance.push(RiTa.concordance(currentTokenise[0]));
      odd = true;
        //no voice for websong
        if (!p1st && !p2nd && !p5th && !p6th) {
            voice.speak(sentences);
        }

  } else if (onGrid && odd==true) {
      //generate response
      responseVoice.cancel();
      responseVoice.setRate(1);
      response = rmResponse.generate(1, {temperature:200, maxLength: 100, allowDuplicates:false});
      responseVoice.speak(response);
      sketchTop.responseGenerated.push(response);
      currentTokenise.push(RiTa.tokenize(response[0]));
      concordance.push(RiTa.concordance(currentTokenise[0]));
      odd = false;
      //changing speed for singing beebopps
      if (p1st || p2nd || p5th || p6th) {
          responseVoice.setRate(2);
      } else {
          responseVoice.setRate(1);
      }
  }

    for (let i=0; i<currentTokenise.length; i++) {
      for (let j=0; j<currentTokenise[i].length; j++) {
           speechTokens.push(new SpeechTokens());
      }
    }

  }
}


class SpeechTokens {
  constructor() {
    this.x = [];
    this.y = [];
  }
  display() {
    //let this.y generate new random values
    this.x.length = 0;
    this.y.length = 0;

    for (let i=0; i<currentTokenise.length; i++) {
      for (let j=0; j<currentTokenise[i].length; j++) {
            push();
              frameRate(0.5);
              this.x.push(random(50, width));
              this.y.push(random(height/3*2));
            pop();

            //first col generated text
            fill(0);
            textSize(22);
            textAlign(LEFT, TOP);
            // text(j+"."+currentTokenise[i][j], 10+80*i, 40+(18*j));
            if (j<23) {
                text(j+"."+currentTokenise[i][j], 20+80*i, 50+(18*j));
            } else if (j>=23 && j<46) {
                text(j+"."+currentTokenise[i][j], 200, 50+(18*(j-23)));
            } else if (j>=46 && j<69) {
                text(j+"."+currentTokenise[i][j], 400, 50+(18*(j-46)));
            } else if (j>=69) {
                text(j+"."+currentTokenise[i][j], 600, 50+(18*(j-69)));
            }
            //let tokensLength = currentTokenise[i].length-1;
              //2nd col
              // if (tokensLength>23) {
              //     push();
              //        textAlign(LEFT, TOP);
              //        fill(255, 0, 255);
              //        rect(220, 40, 200, (height/3*2)-40);
              //     pop();
              //     for (let l=24; l<currentTokenise[i].length; l++) {
              //          text(l+"."+currentTokenise[i][l], 220, 40+(18*(l-24)));
              //     }
              // }
              // //3rd col
              // if (tokensLength>39) {
              //     push();
              //        textAlign(LEFT, TOP);
              //        textSize(22);
              //        fill(255, 0, 255);
              //        rect(440, 40, 200, (height/3*2)-40);
              //     pop();
              //     for (let m=46; m<tokensLength; m++) {
              //          text(m+"."+currentTokenise[i][m], 440, 40+(18*(m-46)));
              //     }
              // }

            //token and rect network
            push();
              fill(255, 0, 255);
              stroke(0);
              strokeWeight(1);
              rect(this.x[j], this.y[j], 100, 12);
              for (let k=0; k<=currentTokenise[i].length; k++) {
                   line(this.x[k], this.y[k], this.x[k-1], this.y[k-1]);
              }
            pop();
              textSize(14);
              text(j+"."+currentTokenise[i][j], this.x[j], this.y[j], 50);
      }
    }

    //console.log(concordance[0]);
    console.log(concordance.concat([12]));
  }

}
