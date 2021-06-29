//template for topP5 sketch
var sketchTop = function(p) {

  p.width = p.windowWidth;
  p.height = p.windowHeight/5;

  p.x = p.windowWidth/2;
  p.y = p.windowHeight/4;

  p.screen1 = true;
  p.screen2 = false;
  p.UserEnter = false;

  p.web = false;
  p.sea = false;
  p.song = false;
  p.webSong = false;
  p.soundLevel = 0;
  p.soundLevelMapped;
  p.soundHistory = [];

  p.mapMouseSpeed = 3;

  //arrays of generated text
  p.callGenerated = [];
  p.responseGenerated = [];
  p.webSeaCallGenerated = [];
  p.webSeaResponseGenerated = [];
  p.textXLength;
  p.canvasGrowing = false;
  p.textboxWidth;
  p.callCOuntX = 0;

  p.font2;

  p.preload = function() {
    p.font2 = p.loadFont("assets/LTC Fournier Le Jeune W00 Reg copy.ttf");
    // p.font2 = p.loadFont("assets/Bitmgothic copy.otf");

  }
  p.setup = function() {
    var canvas = p.createCanvas(p.windowWidth+p.windowWidth/4, p.windowHeight/5);
    canvas.parent("topSketch");
    p.setDimensions();
    canvas.mousePressed(p.topClick);
    p.textSize(48);

    p.textBoxWidth = (p.windowWidth/4);

  }
  p.windowResized = function() {
    p.setDimensions();
    if (p.screen1) {
      p.resizeCanvas(p.windowWidth+p.windowWidth/4, p.windowHeight/5);
    } else if (p.screen2) {
      p.resizeCanvas(p.windowWidth, p.windowHeight/5);
    }
  }
  p.setDimensions = function() {
    p.width = p.windowWidth;
    p.height = p.windowHeight/5;
    p.textBoxWidth = (p.width/4);

  }

  p.draw = function() {
    p.background(255, 0, 255);

    if (p.screen1) {
      //Mic levels, mapped, array
      p.soundLevelMapped = p.map(p.soundLevel, 0, 1, 0, 0.1);
      p.soundHistory.push(p.int(p.soundLevelMapped));

      p.push();
        p.fill(0);
        p.noStroke();
        p.textAlign(p.LEFT, p.TOP);
        p.textSize(13.5);
        p.textLeading(15);

        p.text("I pay my respects to the traditional owners of the Land, Skies and Waters on which this work was created, the Bidjigal people of the Eora Nation, and all those it may reach.", 10, 12, p.textBoxWidth*2/1.3, p.height-24);

        p.text("Sail, Sail, for a Shared Myth is a generative text work that plays with the pirate as the bastard agent of the seas and the web. As figures with a rich inventory of language and materiality, their mythos becomes a means to reimagine our digital terrain.\n\nSail forth into this interactive sea/webscape, where you can generate a network of pirate speech and song in collaboration with your browser.", p.textBoxWidth*2, 12, p.textBoxWidth-20, p.height-24);

        p.text("This site was created with p5.js, with the added functionality of the p5.Speech and RiTa.js libraries. The linguistic traits of pirate and web speak are mimicked as text is multiplied and scrambled using markov chains, a structure that models probability. The seed text was produced through a process of writing and text generation with the AI neural network tool Talk 2 Transformer.", p.textBoxWidth*3, 12, p.textBoxWidth-20, p.height-24);

        p.text("Janey Li is a designer and creative coder interested in the margins of possibility. Her work plays with collaborative technologies to strategise for new myths of body and space. You can see more of her work at janeyli.com.\n\nThis work was commissioned by the 4A Centre for Contemporary Asian Art for the 2021 4A Digital programme.", p.textBoxWidth*4, 12, p.textBoxWidth-20, p.height-24);

      p.pop();

    } else if (p.screen2) {
        //starting instruction
        if (p.UserEnter==true) {
          p.push();
            p.textAlign(p.LEFT, p.CENTER);
            p.textFont(p.font2);
            p.textSize(40);
            p.stroke(0);
            p.strokeWeight(4.5);
            p.text("0", 5, 10);
          p.pop();
            p.textSize(14);
            p.textLeading(14);
            p.noStroke();
            p.text("Click below to generate myth;", 30, 20);
        }
      for (let i=0; i<p.callGenerated.length; i++) {

          p.fill(0);
            p.push();
              p.push();
                p.textAlign(p.LEFT, p.CENTER);
                p.textFont(p.font2);
                p.textSize(40);
                p.stroke(0);
                p.strokeWeight(4.5);
                if (i>9) {
                    p.callCountX = -10;
                } else {
                    p.callCountX = 0;
                }
                p.text(i+1, 5+(p.textBoxWidth*i)+p.callCountX, 10);
              p.pop();

              p.textSize(14);
              p.textLeading(14);
              p.noStroke();
              p.text(p.webSeaCallGenerated[i] +p.callGenerated[i], 30+(p.textBoxWidth*i), 10, p.textBoxWidth-30);

            p.pop();

            //RESPONSE
            for (let j=0; j<p.responseGenerated.length; j++) {

                    p.push();
                      p.noStroke();
                      p.fill(255, 0, 255);
                      p.rect(30+(p.textBoxWidth*j), p.height/2, p.textBoxWidth-30, p.height/2);
                    p.pop();

                    p.push();
                      p.noStroke();
                      p.textSize(14);
                      p.textLeading(14);
                      p.text(p.webSeaResponseGenerated[j] +p.responseGenerated[j], 30+(p.textBoxWidth*j), p.height/2, p.textBoxWidth-30);
                    p.pop();

                  //nested for loops because we want the lines to draw to both
                  p.push();
                    p.strokeWeight(1);
                    p.stroke(0);
                    p.line(10+(p.textBoxWidth*(p.callGenerated.length-1)), 10, 30+(p.textBoxWidth*(p.responseGenerated.length-1)), p.height/2);
                  p.pop();

                  //all call[i] text boxes added up
                  p.textXLength = p.textBoxWidth*i;

            }
      }
    }

    if (p.canvasGrowing) {
        p.push();
          console.log("arrow");
          p.textFont(p.font2);
          p.textSize(40);
          p.fill(0);
          p.stroke(0);
          p.strokeWeight(4.5);
          p.rightArrow = p.text('-->', p.width-60, 30);
        p.pop();
    }

  }

  //mousePressed WITHIN top sketch
  p.topClick = function() {
    //console.log('topCLik');
  }

}

//creating an INSTANCE of the top canvas
var sketchTop = new p5(sketchTop);

var width, height;
var newTopWidth;
let growCounter = 0;
let growSwitch = 0;
let mouseSpeed;
let screen = 1;
let backToShoreHover = false;
let font2;

//SPEECH VARIABLES
let voice;
let responseVoice;
let monoSynth;
let monoSynth2;
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
let onGridClick = false;

let clearSeasClick = false;
let webSongClick = false;
let webSpeechClick = false;
let seaSongClick = false;
let seaSpeechClick = false;

// rita markov text scramble
let rm, rmResponse;
let sentences = "";
let tags = "";
let response = "";
let odd = false;

//new tokens OOP VARIABLES
let currentTokenise = [];
let concordance = [];

// array for speech token objects
let speechTokens = [];
let t;

//colHeight and numRows to make responsive list of tokens
let columnHeight;
let numRows;

function preload() {
  //ocean = loadSound("assets/szegvari__ship-ambient.wav");
  //ocean = loadSound("assets/gkillhour_underwater-ocean-bubbling.wav");
  font2 = loadFont("assets/LTC Fournier Le Jeune W00 Reg copy.ttf");

}

//MAIN SKETCH: BOTTOM GRID, WILL CALL SPEECH AND TEXT AND SOUND HERE.
function setup() {
  setDimensions();
  var canvas = createCanvas(windowWidth, windowHeight/5*4);
  canvas.parent = ("bottomSketch");
  canvas.mousePressed(mouseBottom);
  background(255, 0, 255);


  voice = new p5.Speech();
  voice.setPitch(0);
  voice.setVoice("Karen");
  responseVoice = new p5.Speech();
  responseVoice.setVoice("Karen");
  responseVoice.setPitch(0);
  mic = new p5.AudioIn();
  mic.start();
  osc = new p5.Oscillator();
  strokeCap(ROUND);
  t = new SpeechTokens();

  //fill(255, 0, 255);
  //textFont(sketchTop.font2);

  // button = createButton('Set Sail -->');
  // button.position(10, height/2+50);
  // button.mousePressed(screen2);

    fill(0);
    stroke(0);
    textFont(font2);
    textAlign(LEFT, TOP);
    textSize(75);
    textLeading(74);
    strokeWeight(7.5);

}

function windowResized() {
  background(255, 0, 255);
  setDimensions();
  resizeCanvas(width, height);

  //grow canvas on every new call and response pair
  if (sketchTop.textXLength>=width-sketchTop.textBoxWidth) {
      let addWidth = growCounter*(2*sketchTop.textBoxWidth);
      newTopWidth = 70+ sketchTop.windowWidth+addWidth;
      sketchTop.resizeCanvas(newTopWidth, sketchTop.height);
      sketchTop.canvasGrowing = true;
  }
}

function setDimensions() {
  background(255, 0, 255);
  width = window.innerWidth;
  height = window.innerHeight/5*4;
}

function draw() {
  background(255, 0, 255);
  monoSynth = new p5.MonoSynth();
  monoSynth2 = new p5.MonoSynth();

  //check where mouseY is
  //mouse is OUTSIDE the grid, web false, sea false
  if (mouseY<height/3*2-10) {
      web = false;
      sea = false;
      onGrid = false;
      osc.stop();
      monoSynth.dispose();
  } else if (mouseY>height/3*2-10) {
      //mouse in ON the grid, either web or sea is true
      onGrid = true;
      //clearSeas = false;
      if (mouseY>height/3*2-10 && mouseY<height/6*5) {
          web = true;
          sea = false;
      } else if (mouseY>height/6*5) {
          sea = true;
          web = false;
      }
  }
  console.log("onGrid = "+onGrid)
  //mapping wave with mic input and mousespeed
  soundLevel = mic.getLevel();
  soundLevelMapped = map(soundLevel, 0, 1, 0, 0.02);
  soundHistory.push(int(soundLevelMapped));
  mouseSpeed = dist(mouseX, mouseY, pmouseX, pmouseY);
  mapMouseSpeed = 5+map(mouseSpeed, 0, width, 0, 5);
  mapVoiceSpeed = map(mouseSpeed, 0, width, 0.5, 5);
  increment = 0.001+soundLevelMapped;

  //drawing perlin noise + sound + mouseSpeed wave
    push();
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
    push();
      fill(0);
      stroke(0);
      textFont(sketchTop.font2);
      textAlign(LEFT, TOP);
      textSize(75);
      textLeading(74);
      strokeWeight(7.5);
      text("Sail, Sail, for a", 10, -10, width/2);
      text("Shared Myth", 165, 70, width/4+200);
    pop();

    push();
    if (mouseX>width/2 && mouseX<width/2+250 && mouseY>5 &&mouseY<60) {
        textSize(40);
        strokeWeight(4);
        stroke(0);
        monoSynth2.amp(0.1);
        monoSynth2.play("C#4", 0.3, 0, 1);
        //for if pressed, go to screen==2 see mouse released()
    } else {
        monoSynth2.dispose();
        textSize(32);
        strokeWeight(3.25);
    }
        fill(0);
        stroke(0);
        textFont(sketchTop.font2);
        textAlign(LEFT, CENTER);
        text("Set Sail -->", width/2, 25, width/2);
    pop();

} else if (screen==2) {
    t.display();
    synthGrid();

    push();
      stroke(0);
      fill(0);
      textFont(sketchTop.font2);
      textAlign(RIGHT, CENTER);
      if (mouseX>width-220 && mouseX<width-10 && mouseY>5 && mouseY<40) {
          backToShoreHover = true;
          textSize(24);
          strokeWeight(2.3);
          text("<-- Back to shore", width-10, 15);
          // if (mouseIsPressed) {
          //     restart();
          // }
      } else {
          backToShoreHover = false;
          strokeWeight(2.2);
          textSize(22);
          text("<-- Back to shore", width-10, 15);
      }
    pop();

    rm = RiTa.markov(2);
    rmResponse = RiTa.markov(2);

    // if statements and text for each eigth of the quadrant
    if (onGrid && web) {
        // WE ARE IN THE TOP ROW

        //assign markov text according to which eighth you're in
        //1(WEB, SONG)
        if (mouseX<width/4){
            rm.addText("Oscillator: ♫ \Oscillator: ♫♬ \Oscillator: ♯♩♫");
            rmResponse.addText("bebopp bee bop \ Bop bop bop \ boop boop bOooOOOoopp");
          //2(WEB, SONG)
        } else if (mouseX>width/4 && mouseX<width/2) {
            rm.addText("Oscillator: ♫ \Oscillator: ♫♬ \Oscillator: ♯♩♫");
            rm.addText("bubbleBop \ bub bbub \ b b b ");
            rmResponse.addText("bebopp bee bop \ Bop bop bop \ be beeee booobebeboboebOOP");
          //3(WEB, SPEECH)
        } else if (mouseX>width/2 && mouseX<width/4*3) {
            rm.addText("HTML: seas \HTML: terrain \HTML: horizon \HTML: futures \ cybernetic chorus \cybernetic choir \digital myth \ browser:: utterance \ browser:: song \ browser:: connection");
            rm.addText("Smirk \ Smirk\ Smirk \ Smirk! \S-M-I-R-K ");
            rm.addText("lace-up; dial-up;\ up; up; \loop; loop; \ thru; thru; \'round; 'round; \calibrate; calibrate;\Looping; Looping;\LOOP; LOOP;\ L-A-C-E-U-P L-A-C-E-U-P \the rigging; the rigging;");

            rmResponse.addText("Practictioners of for loops and lace-up worlds \lace-up myths, lace-up bodices \laced-up thru opportunistic eyelets of HTML");
            rmResponse.addText("choir --> chorus \b\pirates --> crew \b\ browsers --> web \b\ sites --> gatherings \b\"line(horizon, x, y) \b\ location(x, y) \b\ crew++;\b\ text(sing, sing) \b\  ;  ;  \b\ ");
            rmResponse.addText("connect \ con.net.ing \ con-nect-ting \ connnect \ co n net \connectconnect \ con...con... \ . . . ..web \ .web \ w.e.b. \ w-e-b \ ... \ w.w.w. \ www \ WWW \ W, W, W,\(web) \ {web} \ @webe- \ e. \ e: \ e, e, \ e \ e");
            rmResponse.addText("Threshold: (x, y)\ Threshold: horizon\ Threshold: skin\ Threshold: sea, sky,\ Threshold: radius\ Threshold: touch\Threshold: song\ Threshold: possibility\ Threshold: body");
          //4(WEB, SPEECH)
        } else if (mouseX>width/4*3) {
            rm.addText("Web trash, shiny mirages\ Pixel coins in Pixel chests\ Corrupted files and torrents buried \DOWNLOAD the filth! \DOWNLOAD the F-I-L-T-H! \DOWNLOAD the eyeliner! \DOWNLOAD the rotting carcass of mp3,4, \Or dvd rip rip rip rip bytes like paper! \Or dvd RIP RIP RIP RIP bytes like paper! \Then get the rascals! Scrubbing grimy hardrives... plucking mangled digital bones from clawed digital flesh! \Damn corrupt bits! Blending demo so demo sounds worse than the real demo! \Shiny, sparkling garbage, trawling thru the synths. \Turn me back into ASCII, I am growing weary.\Eeeeeeville. Online piracy's sick toothless grin \Simply ... Sick. \ ...Ahoy! ...Ahoy!");

            rm.addText("Practictioners of for loops and lace-up worlds \lace-up myths, lace-up bodices \laced-up thru opportunistic eyelets of HTML");
            rm.addText("lace-up; dial-up;\ up; up; \loop; loop; \ thru; thru; \'round; 'round; \calibrate; calibrate;\Looping; Looping;\LOOP; LOOP;\ L-A-C-E-U-P L-A-C-E-U-P \the rigging; the rigging;");

            rmResponse.addText("Yearning for reworlding, \Sail to lace up these pixels, pixels, pixels\ File Corrupt Protocol is-->flirting over the cut and paste:: \File Transfer Protocol is-->yearning across time and space:: \ Web --> ENTER; Web --> ENTER; \Transfer heart emoticon, sailing, sailing. \Transfer --> we can offer billowing ruffled blouses, \We can deal in the dramatic brandishing of cutlasses \Speak to ‘Commandeer'!");

            rmResponse.addText("The algorithm has spoilt! Cries of who thought… who thought... \ But look! Data, the data, is done for, poisoning the webfloor. \Rotting, rotting, swelling of the firewall. Swell out; out; out; out; \ We pirates, stinking lot of the cut and paste! We gather to enact the cut and paste! \The ACSII, fraying, fraying, glyphs decaying \There, there, spyglass to the spoils of the search engines ! ! ! \But, fickle is the roguish grin is the writing of this song \So, we calibrate again again again \We make for the swelling of RGB horizons \Download to the rigging, no, Upload to the rigging \decay! decay! decay!\ Ships, the pixel vessels that inch across the axes, inch across the webfloor \ Initialise rerouting \ initialise reworlding");

            rmResponse.addText("choir --> chorus \b\pirates --> crew \b\ browsers --> web \b\ sites --> gatherings \song --> myth \b\"line(horizon, x, y) \b\ location(x, y) \b\ crew++;\b\ text(sing, sing) \b\  ;  ;  \b\ flirt(with );\ decay( , , ); ");
            rmResponse.addText("Threshold: (x, y)\ Threshold: horizon\ Threshold: skin\ Threshold: sea, sky,\ Threshold: radius\ Threshold: touch\Threshold: song\ Threshold: possibility\ Threshold: body");
        }

    } else if (onGrid && sea) {
        // WE ARE IN THE BOTTOM ROW

        //check p-EIGHTHS
        //5(SEA, SONG)
        if (mouseX<width/4){
              rm.addText("Synth: ♫ \Synth: ♫♬ \Synth: ♯♩♫\ Hover for pentatonic song");
              rmResponse.addText("la ah laaa laaa \ Minor Synth: A-C-D-E-G-A");
            //6(SEA, SONG)
          } else if (mouseX>width/4 && mouseX<width/2) {
              rm.addText("Move to compose\ Ooh Ooh Ooh \ Synth, ");
              rm.addText("♫♪♬ \♫♪♬ \♯♩♫♫♮\♩♫♫♭♩♫♫");
              rmResponse.addText("la la laaah la la \ OOoooooOOOh OOoohhoohhh \ oooohoooh ho ho\ daadaaa da da da\ aaaAAhha, a, a, a");
            //7(SEA, SPEECH)
          } else if (mouseX>width/2 && mouseX<width/4*3) {
              rm.addText("Where s = sea \Where s = sail \ Where s = scurvy\ Where s = scum \Where s = speak \ Where s = song \So s = sea \So s = sail \ So s = scurvy\ So s = squeal \So s = see \ So s = scroll \Such that s = shout \Such that s = sword \ Such that s = siren\ Such that s = spit \Such that s = soup \ Such that s = seafarer \Such that s = SOS");
              rm.addText("A larynx’s offerings o song \A larynx’s offering o stories \A larynx’s offering o pleasure \ A larynx’s offering o reworlding");

              rmResponse.addText("Our communion with the swelling of speech. \Our labour is the sea and sky. \Our ship is the vessel of the threshold \ Our survival is hard hot pink futures.\Our ship sails into Hard Hot Pink Futures. \Raging, raging, of the Hot Pink ");
              rmResponse.addText("Gather at x . \ Gather in the . \Gather at xx:xx. \Gather , \Gather , \Gathering, 2nite. \Gathering, the songs . \Gathering, the words. \Find x, Found x. \Lace up X. ");
            //8(SEA, SPEECH)
          } else if (mouseX>width/4*3) {
              rm.addText("Engineering a chorus for cross my heart survival, \song notes to sail us out out out. \Generating lore to power a web \Deal in the wording of our world \Shiver, Shiver, at the thresholds of possibility. \Sail to the dawn edges of the browser, out of reach of known horizons. \Sail to gather in the unknown terrains");
              rm.addText("Flirt, smirk, thru the eyelets and skin \ Lacing up touch and longing \Flirt, flirt, with thine own unbridled future \ Press upon this sea floor synth-pad \Find me a dagger \To the throat of the threshold \Surface skin tension against the blade");

              rmResponse.addText("Smirk \ Smirk\ Smirk \Smirk \Smirk \ Smirk! ");
              rmResponse.addText("Black and Hot Pink for a combo that steals into the night, \ For speak borne of the web, Uncharted, Uncharted. \Lace lace together black sails and hot pink rigging for a New Bastard Myth. \Scrub our souls \Pixelate, Corrupt, SkullScrub, Crossbones,");
              rmResponse.addText("\in communion with the sea and sky \ constant; boundary line, surface tension, tangent, skin \ these margins, these boundaries, liminal possibilities \labour is the collaborative wording \ labour is the collaborating worlding \ worlding, the myth making, the imagining, the singing, the writing \ negotiating —> rigging, contingency planes \ material agents of the threshold \ negotiating as collective practice... \ ...lacing/unlacing...rigging/rigging...worlding / reworlding");
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
    stroke(0);
    strokeWeight(1);
      for (let i=10; i<width-10; i=i+10) {
        for (let j=height/3*2; j<height-10; j=j+10) {
            //grid is closed
            push();
              noFill();
              rect(10, height/3*2, width-20, height/3-10);
            pop();

            //dividing wave line
            line(0, (height/3*2)-10, width-10, (height/3*2)-10);
            //base grid
            line(i, height/3*2, i, height-10);
            line(10, j, width-10, j);

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
pop();

      push();
          strokeWeight(20);
          stroke(0);
          //DRAWING THE CROSS AXES of the synthpad
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

      //little word bubbles
      push();
        fill(0);
        //noFill();
        strokeWeight(3);
        stroke(255, 0, 255);
        ellipse(50, height/6*5, 90, 40);
        ellipse(width-70, height/6*5, 130, 40);
        ellipse(width/2, (height/3*2)+35, 80, 40);
        ellipse(width/2, height-35, 80, 40);
      pop();

      //axes words
      push();
        fill(255, 0, 255);
        textFont(sketchTop.font2);
        stroke(255, 0, 255);
        strokeWeight(2.5);
        textSize(30);
        textAlign(CENTER, CENTER);
        text('Song', 50, (height/6*5)-5);
        text('Speech', width-70, (height/6*5)-5);
        text('Web', width/2, (height/3*2)+30);
        text('Sea', width/2, height-40);
      pop();

      push();
        textFont(sketchTop.font2);
        stroke(0);
        strokeWeight(3);
        textSize(26);
        textLeading(26);
        textAlign(LEFT, TOP);
        fill(0);

        if (onGridClick==true) {
            if (webSongClick) {
                text("(Web, Song)", 5, 5);
            } else if (webSpeechClick) {
                text("(Web, Speech)", 5, 5);
            } else if (seaSongClick) {
                text("(Sea, Song)", 5, 5);
            } else if (seaSpeechClick) {
                text("(Sea, Speech)", 5, 5);
            }
        } else if (onGridClick==false && sketchTop.UserEnter==true) {
            text("> Web, Sea\n>Song, Speech", 5, 5);
        } else if (onGridClick==false && clearSeasClick==true) {
            if (backToShoreClick==false){
                text("(Seafloor Synthpad \n~Interlude", 5, 5);
            }
        }
      pop();

}

function mouseReleased() {
  //SAIL AND BACK BUTTON EXECUTE COMMANDS: screen +/-, reset top width
  //rect(width/2, )
  if (screen==1) {
    if (mouseX>width/2 && mouseX<width/2+250 && mouseY>5 &&mouseY<40) {
        screen=2;
        sketchTop.screen1=false;
        sketchTop.screen2=true;
        sketchTop.resizeCanvas(sketchTop.width, sketchTop.height);
        sketchTop.UserEnter = true;
    } else {
      screen=1;
      sketchTop.screen2=false;
      sketchTop.screen1=true;
    }
  }
}

//refresh --> back to shore
function restart() {
  console.log("restart");
  window.location.reload();
}

function mouseBottom() {
    //sort this out
    userStartAudio();

    //clear array of tokens everytime mouse is clicked, if clicked NOT on grid, then nothing new is pushed into the call/response generated array therefore nothing in the currentTokenise array therefore clearSeas:synthpad interlude
    currentTokenise = [];
    concordance = [];
    console.log("CLICK");

if (screen==1){
} else if (screen==2) {
    sketchTop.UserEnter = false;
    //grow canvas on every new call and response pair
    if (sketchTop.textXLength>=width-sketchTop.textBoxWidth && odd==false) {
        console.log("textXLength has exceeded");
        if (growSwitch<1) {
          if (growSwitch==0) {
              growCounter++;
              let addWidth = growCounter*(2*sketchTop.textBoxWidth);
              newTopWidth = 70+sketchTop.windowWidth+addWidth;
              sketchTop.resizeCanvas(newTopWidth, sketchTop.height);
              sketchTop.canvasGrowing = true;
          }
          growSwitch++;
        } else {
          growSwitch = 0;
        }
    }

    //if CLICKED INSIDE THE GRID, check for which eighth, check if odd/even/call response
    if (mouseY>height/3*2-10) {
        console.log("————> clicked on grid");
        onGridClick = true;
        clearSeasClick = false;
        clearSeasON = false;

        //if clicked on TOP ROW,
        if (mouseY>height/3*2-10 && mouseY<height/6*5) {
            //WEB, SONG
            if (mouseX<width/2) {
                webSpeechClick = false;
                seaSongClick = false;
                seaSpeechClick = false;
                webSongClick = true;
                //console.log("mouse clicked into webSong:"+webSongClick);
                  if (odd==false) {
                    sketchTop.webSeaCallGenerated.push("(Web, Song): ");
                  } else if (odd==true) {
                    sketchTop.webSeaResponseGenerated.push("(Web, Song): ");
                  }
              //WEB, SPEECH
            } else if (mouseX>width/2) {
                webSongClick = false;
                seaSongClick = false;
                seaSpeechClick = false;
                webSpeechClick = true;
                //console.log("mouse clicked into webSpeech:"+webSpeechClick);
                  if (odd==false) {
                    sketchTop.webSeaCallGenerated.push("(Web, Speech): ");
                  } else if (odd==true) {
                    sketchTop.webSeaResponseGenerated.push("(Web, Speech): ");
                  }
            }
          //if clicked on BOTTOM ROW,
        } else if (mouseY>height/6*5) {
            //SEA, SONG
            if (mouseX<width/2) {
                webSongClick = false;
                webSpeechClick = false;
                seaSpeechClick = false;
                seaSongClick = true;
                //console.log("mouse clicked into seaSong"+seaSongClick);
                  if (odd==false) {
                    sketchTop.webSeaCallGenerated.push("(Sea, Song): ");
                  } else if (odd==true) {
                    sketchTop.webSeaResponseGenerated.push("(Sea, Song): ");
                  }
              //SEA, SPEECH
            } else if (mouseX>width/2) {
                webSongClick = false;
                webSpeechClick = false;
                seaSongClick = false;
                seaSpeechClick = true;
                //console.log("mouseClicked into seaSpeech:"+seaSpeechClick);
                  if (odd==false) {
                    sketchTop.webSeaCallGenerated.push("(Sea, Speech): ");
                  } else if (odd==true) {
                    sketchTop.webSeaResponseGenerated.push("(Sea, Speech): ");
                  }
              }

        }

      //changing speed for singing beebopps
      if (mouseX<width/2) {
          responseVoice.setRate(2);
      } else {
          responseVoice.setRate(1);
      }

      //GENERATING ALTERNATING CALL AND RESPONSE SPEECH + TEXT
      if (odd==false) {
          //generate call
          voice.cancel();
          voice.setRate(1);
          sentences = rm.generate(1, {temperature:500, minLength:10, maxLength: 100, allowDuplicates:false});
          voice.speak(sentences);
          sketchTop.callGenerated.push(sentences);
          currentTokenise.push(RiTa.tokenize(sentences[0]));
          concordance.push(RiTa.concordance(currentTokenise[0]));
          odd = true;
      } else if (odd==true) {
          //generate response
          responseVoice.cancel();
          responseVoice.setRate(1);
          response = rmResponse.generate(1, {temperature:500, minLength:10, maxLength: 100, allowDuplicates:false});
          responseVoice.speak(response);
          sketchTop.responseGenerated.push(response);
          currentTokenise.push(RiTa.tokenize(response[0]));
          concordance.push(RiTa.concordance(currentTokenise[0]));
          odd = false;
      }

      //if you have CLICKED OUTSIDE THE GRID; clear the decks.
    } else if (mouseY<height/3*2-10) {
        console.log("————> clicked off grid");
        onGridClick = false;
        clearSeasClick = true;

        seaSpeechClick = false;
        webSongClick = false;
        webSpeechClick = false;
        seaSongClick = false;

        //if back to shore button has been clicked
        if (mouseX>width-220 && mouseX<width-10 && mouseY>5 && mouseY<40) {
            backToShoreClick = true;
            //then refresh the page
            window.location.reload();
            voice.cancel();
            responseVoice.cancel();
        } else {
            backToShoreClick = false;
            if (odd==false) {
                voice.cancel();
                sketchTop.callGenerated.push("The decks --> seafloor synthpad interlude;");
                sketchTop.webSeaCallGenerated.push("(CLEAR): ");
                voice.speak("CLEAR: The decks --> seafloor synthpad interlude;");
                odd=true;
            } else if (odd==true) {
                responseVoice.cancel();
                sketchTop.responseGenerated.push("The decks --> seafloor synthpad interlude;");
                sketchTop.webSeaResponseGenerated.push("(CLEAR): ");
                responseVoice.speak("CLEAR: The decks --> seafloor synthpad interlude;");
                odd=false;
            }
        }

        if (clearSeasClick && clearSeasON==false) {
            clearSeasON = true;
        }

    }

    //generating each token from the tokenised sentences as an object
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
            textFont('Helvetica');
            textSize(22);
            textLeading(22);

            //checking how many rows can fit into different window heights
            columnHeight = (height/3*2);
            numRows = (int(columnHeight/18))-4;
            textAlign(LEFT, TOP);

            //making list responsive to window height
            //where 50+(18*) is the top margin + the leading
            if (j<numRows) {
                text(j+1+"."+currentTokenise[i][j], 30+sketchTop.textBoxWidth/2*0, 50+(18*(j)));
            } else if (j>=numRows && j<numRows*2) {
                text(j+1+"."+currentTokenise[i][j], 30+sketchTop.textBoxWidth/2*1, 50+(18*(j-numRows)));
            } else if (j>=numRows*2 && j<numRows*3) {
                text(j+1+"."+currentTokenise[i][j], 30+sketchTop.textBoxWidth/2*2, 50+(18*(j-numRows*2)));
            } else if (j>=numRows*3 && j<numRows*4) {
                text(j+1+"."+currentTokenise[i][j], 30+sketchTop.textBoxWidth/2*3, 50+(18*(j-numRows*3)));
            } else if (j>=numRows*4 && j<numRows*5) {
                text(j+1+"."+currentTokenise[i][j], 30+sketchTop.textBoxWidth/2*4, 50+(18*(j-numRows*4)));
            } else if (j>=numRows*5 && j<numRows*6) {
                text(j+1+"."+currentTokenise[i][j], 30+sketchTop.textBoxWidth/2*5, 50+(18*(j-numRows*5)));
            } else if (j>=numRows*6 && j<numRows*7) {
                text(j+1+"."+currentTokenise[i][j], 30+sketchTop.textBoxWidth/2*5, 50+(18*(j-numRows*6)));
            } else if (j>=numRows*7 && j<numRows*8) {
                text(j+1+"."+currentTokenise[i][j], 30+sketchTop.textBoxWidth/2*5, 50+(18*(j-numRows*7)));
            }

            //token and rect network
            push();
              fill(255, 0, 255);
              stroke(0);
              strokeWeight(1);
              rect(this.x[j], this.y[j], 100, 12);
              for (let k=0; k<=currentTokenise[i].length; k++) {
                   line(this.x[k], this.y[k], this.x[k], this.y[k]);
              }
            pop();
              //textFont('Helvetica');
              textSize(14);
              text(j+"."+currentTokenise[i][j], this.x[j], this.y[j], 50);
      }
    }

    //console.log(concordance[0]);
    //console.log(concordance.concat([12]));
  }

}
