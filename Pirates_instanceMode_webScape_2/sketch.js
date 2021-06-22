//template for topP5 sketch
var sketchTop = function(p) {

  p.width = p.windowWidth;
  p.height = p.windowHeight/5*3;

  p.x = p.windowWidth/2;
  p.y = p.windowHeight/4;

  p.web = false;
  p.sea = true;
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
    var canvas = p.createCanvas(p.windowWidth, p.windowHeight/5*3);
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
    p.resizeCanvas(p.windowWidth, p.windowHeight/5*3);
  }
  p.setDimensions = function() {
    p.width = p.windowWidth;
    p.height = p.windowHeight/5*3;
  }

  p.draw = function() {
    p.background(0);

    p.soundLevelMapped = p.map(p.soundLevel, 0, 1, 0, 0.1);
    p.soundHistory.push(p.int(p.soundLevelMapped));
    //console.log(p.soundLevelMapped);

    p.increment = 0.001+p.soundLevelMapped;
    //drawing perlin noise wave
    p.push();
      p.translate(0, p.height-150);
      p.frameRate(5);
      p.fill(0);
      p.stroke(255, 0, 255);
      // p.beginShape();
      //     for (let i=0; i<p.soundHistory.length; i++) {
      //          p.vertex(i*p.mapMouseSpeed, p.soundHistory[i]);
      //          //p.point(i, p.soundHistory[i]);
      //          //p.vertex(i*p.mapMouseSpeed, p.height);
      //     }
      //     if (p.soundHistory.length*p.mapMouseSpeed>p.width) {
      //         p.soundHistory.splice(0, 1);
      //     }
      // p.endShape();
      p.beginShape(p.TRIANGLE_STRIP);
      p.xOff = p.start;
        for (let i=0; i<p.width; i++) {
             //console.log('hello');
             p.vertex(i, p.noise(p.xOff)*50*p.mapMouseSpeed);
             p.vertex(i, p.height);

             p.xOff += p.increment;
        }
        // if (p.soundHistory.length*p.mapMouseSpeed>p.width) {
        //     p.soundHistory.splice(0, 1);
        // }
            p.start += p.increment;
      p.endShape();
    p.pop();

    //for loop drawing arrays of speech
    //p.push();
    // if (p.web) {
    // } else if (p.sea) {
    // }

    for (let i=0; i<p.callGenerated.length; i++) {
        p.fill(255, 0, 255);
          p.push();
            //p.noStroke();
            p.fill(0);
            p.rect(40+(220*i), 50, 150, 80);
          p.pop();

          p.push();
            //p.textSize(14);

            p.textFont(p.font2);
            // p.stroke(255, 0, 255);
            // p.strokeWeight(1.225);
            // p.movingY = p.height/2;
            p.textSize(20);
            p.textLeading(22);
            p.textFont(p.font2);
            p.stroke(255, 0, 255);
            p.strokeWeight(1.7);
            p.text(p.callGenerated[i], 40+(220*i), 50, 200);
            //p.text(p.callGenerated[i], 240+(200*i), p.height/2, 200);

            //console.log(p.CallGenerated[i]);

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
                    p.fill(0);
                    //p.stroke(255, 0, 255);
                    p.rect(40+(220*j), p.height/2, 220, 120);

                  p.pop();

                  p.push();
                    p.textSize(15);
                    //p.textAlign(CENTER, TOP)
                    // p.textSize(18);
                    // p.textLeading(20);
                    // p.textFont(p.font2);
                    // p.stroke(255, 0, 255);
                    // p.strokeWeight(1.5);
                    p.text(p.responseGenerated[j], 40+(220*j), p.height/2, 220);
                    //p.text(p.responseGenerated[j], 40+(200*j), 50, 200);
                    //p.line(240+(200*j), 0, 240+(200*j), p.height);
                  p.pop();

                //nested for loops because we want the lines to draw to both
                p.push();
                  p.strokeWeight(1);
                  p.stroke(255, 0, 255);
                  p.line(40+(220*i), 50, 40+(220*j), p.height/2);
                p.pop();

                //all call[i] text boxes added + final 180
                //p.textXLength = 40+(200*i)+180;
                p.textXLength = 400+(i)*220;

          }
        //p.pop();
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
    p.movingTopY = random(50, 100);
    p.movingY = random(p.height/2, p.height);

  }

}

//creating an INSTANCE of the top canvas
var sketchTop = new p5(sketchTop);

var width, height;
var newTopWidth;
let mouseCounter = 0;
let mouseSpeed;

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
//MIC listen
let mic;

//quadrant checks
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
//rita / text variables !!! MAKE WAY !!!
// let callGenerated = [];
// let responseGenerated = [];

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

function preload() {
  //ocean = loadSound("assets/szegvari__ship-ambient.wav");
  ocean = loadSound("assets/gkillhour_underwater-ocean-bubbling.wav");
}

//MAIN SKETCH: BOTTOM GRID, WILL CALL SPEECH AND TEXT AND SOUND HERE.
function setup() {
  setDimensions();
  var canvas = createCanvas(windowWidth, windowHeight/5*2);
  canvas.parent = ("bottomSketch");
  canvas.mousePressed(mouseBottom);

  voice = new p5.Speech();
  voice.setPitch(0);
  voice.setVoice(1);
  responseVoice = new p5.Speech();
  responseVoice.setPitch(0);
  // monoSynth = new p5.MonoSynth();
  mic = new p5.AudioIn();
  mic.start();
  osc = new p5.Oscillator();
}

function windowResized() {
  setDimensions();
  resizeCanvas(width, height);
  createCanvas(width, height);

}

function setDimensions() {
  width = window.innerWidth;
  height = window.innerHeight/5*2;
}

function draw() {
  background(255, 0, 255);
  monoSynth = new p5.MonoSynth();

  if (mouseY<0) {
      web = false;
      sea = false;
      let onGrid = false;
      console.log(onGrid);
  } else{
      onGrid = true;

  }

  sketchTop.soundLevel = mic.getLevel();
  mouseSpeed = dist(mouseX, mouseY, pmouseX, pmouseY);
  sketchTop.mapMouseSpeed = 3+map(mouseSpeed, 0, width, 0, 10);
  mapVoiceSpeed = map(mouseSpeed, 0, width, 0.5, 2);

    rm = RiTa.markov(markovNum);
    rmResponse = RiTa.markov(markovReponseNum);

  push();
    noFill();

    if (mouseY<height/2) {
        // WE ARE IN THE TOP ROW
        p5th = false;
        p6th = false;
        p7th = false;
        p8th = false;
        web = true;
        sea = false;

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

            // rmResponse.addText("Sing, sing, for a shared myth \A choir! A choir! \A HOLLER! A HOLLER! \ You; H-O-L-L-E-R! You; H-O-L-L-E-R! \Sail, sail, 2nite! Sail, sail, 2nite! \2nite 2nite 2nite \Sing, Sing, for a shared world \Sing! We sing!");

        } else if (mouseX>width/2 && mouseX<width/4*3) {
            p2nd = false;
            p1st = false;
            p3rd = true;
            p4th = false;

            markovNum = 2;
            markovReponseNum = 2;
            generateNum = 1;
            generateResponseNum = 2;

            rm.addText("HTML:seas \HTML:terrain \HTML:horizon \HTML:futures \ cybernetic chorus \cybernetic choir \digital myth \ browser:: utterance \ browser:: song \ browser:: connection");
            rm.addText("Smirk \ Smirk\ Smirk \ Smirk! \S-M-I-R-K ");
            rm.addText("lace-up; dial-up;\ up; up; \loop; loop; \ thru; thru; \'round; 'round; \calibrate; calibrate;\Looping; Looping;\LOOP; LOOP;\ L-A-C-E-U-P L-A-C-E-U-P");

            rmResponse.addText("Practictioners of for loops and lace-up worlds \lace-up myths, lace-up bodices \laced-up thru opportunistic eyelets of HTML");
            rmResponse.addText("choir --> chorus \b\pirates --> crew \b\ browsers --> web \b\ sites --> gatherings \b\"line(horizon, x, y) \b\ location(x, y) \b\ crew++;\b\ text(sing, sing) \b\  ;  ;  \b\ ");
            rmResponse.addText("connect \ con.net.ing \ con-nect-ting \ connnect \ co n net \connectconnect \ con...con... \ . . . ..web \ .web \ w.e.b. \ w-e-b \ ... \ w.w.w. \ www \ WWW \ W, W, W,\(web) \ {web} \ @webe- \ e. \ e: \ e, e, \ e \ e");


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

    } else if (mouseY>height/2) {
        // WE ARE IN THE BOTTOM ROW
        p1st = false;
        p2nd = false;
        p3rd = false;
        p4th = false;
        web = false;
        sea = true;

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
            generateNum = 2;
            generateResponseNum = 1;
              rm.addText("Where s = sea \Where s = sail \ Where s = scurvy\ Where s = scum \Where s = speak \ Where s = song \So s = sea \So s = sail \ So s = scurvy\ So s = squeal \So s = see \ So s = scroll \Such that s = shout \Such that s = sword \ Such that s = siren\ Such that s = spit \Such that s = soup \ Such that s = seafarer \Such that s = SOS");

              rmResponse.addText("In communion with the imagining. \Our labour is the sea and sky. \Our ship is the vessel of the threshold \Continued survival is hard hot pink futures.\Our ship is Hard Hot Pink Futures.\Our waters breed Hard Hot Pink Futures.\Our labour is Hot Pink strategy");

        } else if (mouseX>width/4*3) {
            p5th = false;
            p6th = false;
            p7th = false;
            p8th = true;

            markovNum = 2;
            markovReponseNum = 2;
            generateNum = 3;
            generateResponseNum = 3;
              rm.addText("Engineering a chorus for hellbent survival, \songNotes to sail us out out out. \Generating lore to power a web \Deal in the wording of our world \Shiver, Shiver, at the thresholds of possibility. \Sail to the dawn edges of the browser, out of reach of known horizons.");
              rm.addText("Flirt, smirk, thru the eyelets and skin \ Lacing up touch and longing \Flirt, flirt, with thine own unbridled future \ Press upon this sea floor synth-pad \Find me a dagger \To the throat of the threshold \Surface skin tension against the blade");

              rmResponse.addText("Smirk \ Smirk\ Smirk \Smirk \Smirk \ Smirk! ");

              rmResponse.addText("Black and Hot Pink for a combo that steals into the night, \ For speak borne of the web, Uncharted, Uncharted. \Lace lace together black sails and hot pink rigging for a New Bastard Myth. \Scrub our souls \Pixelate, Corrupt, SkullScrub, Crossbones,");

        }
    }
  pop();

    //BOTTOM GRID
    push();
        for (let i=0; i<width; i=i+10) {
          for (let j=0; j<height; j=j+10) {
            stroke(0);
            strokeWeight(2);
            line(i, 0, i, height);
            line(0, j, width, j);
              if (mouseX>i && mouseX<i+10 && mouseY>j &&mouseY<j+10) {
                  fill(0);
                  rect(i, j, 20, 20);
                //if (mouseIsPressed) {
                    //ocean.pause();
                    let mapNote = int(map(i, 0, width/2, 0, 5));
                    let mapVol = int(map(i, 0, width/2, 0, 1));
                    //let mapOsc = map(i, 0, width/2, 0, 1);
                    let mapOsc = map(i, 0, width/2, 200, 500);

                    if (web && mouseX<width/2) {
                      // let noteSelect = ["C4", "D4", "E4", "G4", "A4", "C5"];
                      // monoSynth.play(noteSelect[mapNote], 0, mapVol, 1);
                        osc.start();
                        osc.amp(0.2);
                        //osc.freq(mapOsc);
                        osc.freq(mapOsc);
                        osc.freq(60, 1);
                    } else if (sea && mouseX<width/2) {
                      osc.stop();
                      let noteSelect = ["A4", "C4", "D4", "E4", "G4", "A5"];
                      monoSynth.play(noteSelect[mapNote], 0, 0.8, 1);
                    }

                    if (mouseX>width/2 || onGrid==false){
                      console.log('dispose');
                      monoSynth.dispose();
                    }
                  }
              //}

            }
            noFill();
            strokeWeight(60);
            stroke(255, 0, 255);
            rect(0, 0, width, height);
        }

        push();
            strokeWeight(60);
            stroke(0);
            //CROSS AXES
            push();
              strokeWeight(60);
              line(0, height/2, width, height/2);
            pop();
            line(width/2, 0, width/2, height);
            //little arrow ends
            //left
            line(0, height/2, 80, (height/2)-80);
            line(0, height/2, 80, (height/2)+80);
            //right
            line(width, height/2, width-80, (height/2)-80);
            line(width, height/2, width-80, (height/2)+80);
            //top
            line(width/2, 0, width/2-80, 80);
            line(width/2, 0, width/2+80, 80);
            //bottom
            line(width/2, height, width/2-80, height-80);
            line(width/2, height, width/2+80, height-80);
          pop();


    pop();
    //little word bubbles
    push();
      fill(0);
      //noFill();
      strokeWeight(2);
      stroke(255, 0, 255);
      ellipse(50, height/2, 80, 40);
      ellipse(width-60, height/2, 110, 40);
      ellipse(width/2, 30, 80, 40);
      ellipse(width/2, height-30, 80, 40);
    pop();

    fill(255, 0, 255);
    textSize(30);
    textAlign(CENTER, CENTER);
    text('song', 50, (height/2));
    text('speech', width-60, (height/2));
    text('web', width/2, 30);
    text('sea', width/2, height-30);

    plotMouse();

}

function plotMouse() {
  // push();
  //   fill(0);
  //   if (mouseIsPressed) {
  //       textSize(30);
  //   } else {
  //       textSize(24);
  //   }
  //   //textFont(sketchTop.font2);
  //   textAlign(LEFT, TOP);
  //   ellipse(mouseX, mouseY, 10, 10);
  //
  //   //strokeWeight(3);
  //   //stroke(0);
  //   if (p1st || p2nd) {
  //       bgBox = 180;
  //       text("(Web, Song)", mouseX+10, mouseY);
  //   } else if (p3rd || p4th) {
  //       bgBox = 200;
  //       text("(Web, Speech)", mouseX+10, mouseY);
  //   } else if (p5th || p6th) {
  //       bgBox = 170;
  //       text("(Sea, Song)", mouseX+10, mouseY);
  //   } else if (p7th || p8th) {
  //       bgBox = 200;
  //       text("(Sea, Speech)", mouseX+10, mouseY);
  //   }
  //
  // pop();
}

function mouseBottom() {
    userStartAudio();

    if (!ocean.isPlaying()) {
        oceanPlayed++;
        ocean.setVolume(1);
        ocean.loop();
    }
    console.log(oceanPlayed);
    //console.log(oceanisPlaying);

    //grow canvas on every new call and response pair
    if (sketchTop.textXLength>width && odd==true) {
        mouseCounter++;
        let addWidth = mouseCounter*220;
        newTopWidth = sketchTop.windowWidth+addWidth;
        sketchTop.resizeCanvas(newTopWidth, sketchTop.height);
        console.log(sketchTop.width, addWidth);

        sketchTop.canvasGrowing = true;
    }

  if (odd==false) {
    //generate call
    voice.cancel();
    sentences = rm.generate(generateNum);
    if (!p1st && !p2nd && !p5th && !p6th) {
      // if (p3rd || p4th) {
      //     voice.setRate(2);
      // } else if (p7th || p8th) {
      //     voice.setRate(0);
      // }
        voice.setRate(1);
        voice.speak(sentences);
    }
    //voice.speak(sentences);
    // if (p1st==true || p2nd==true){
    //     let webSongSyllab = RiTa.syllables(sentences);
    //     console.log(webSongSyllab);
    //     sketchTop.callGenerated.push(webSongSyllab);
    // } else {
    //   sketchTop.callGenerated.push(sentences);
    // }
    sketchTop.callGenerated.push(sentences);

    odd = true;

    text(sentences, 100, 100);
    //console.log(sentences);

  } else if (odd==true) {
      //generate response
      responseVoice.cancel();
      response = rmResponse.generate(generateResponseNum);
      responseVoice.speak(response);

      // if (!p1st && !p2nd && !p5th && !p6th) {
      //     responseVoice.speak(response);
      // }

      // if (p1st==true || p2nd==true){
      //     let webSongSyllab = RiTa.syllables(sentences);
      //     console.log(webSongSyllab);
      //     sketchTop.responseGenerated.push(webSongSyllab);
      // } else {
      //   sketchTop.responseGenerated.push(sentences);
      // }

      sketchTop.responseGenerated.push(response);

      //console.log(response);
      odd = false;

  }
}
