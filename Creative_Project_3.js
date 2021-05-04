var mySound, fft;
var osc, fft;//oscillator 
var mic, fft;//adding mic 

function preload() {
  mySound = loadSound('marcus_kellis_theme.mp3');
}

function setup() {
  createCanvas(400, 400);
  background(0);
  fft = new p5.FFT(); //define fft analysis on the ocs
  fft.setInput(mic);
  osc = new p5.Oscillator();//define osc 
  osc.start();//start osc 
  mic = new p5.AudioIn();
  mic.start();
  mySound.setVolume(0.5);
  mySound.play();
  mySound.loop();
}

function draw() {
  background(0);
  fft.analyze();
  
  //shape of waves
  var waveform = fft.waveform();
  stroke(255);
  strokeWeight(5);//thick 
  noFill();
  beginShape(); //vertex points to create the wave form
  for (var i = 0; i < waveform.length; i++) { //loop
    var x = map(i, 0, waveform.length, 0, width);
    var y = map(waveform[i], -1, 1, 0, height);//data we getting in wave form
    vertex(x, y); 
  }
  endShape();
  
  //lines frequency
  var fftLin = fft.linAverages(20);//adding more lines 20 data points only 
  noStroke();
  fill(0,255, 0);
  for (var i = 2; i < fftLin.length; i++) { //start at 2 instead of 0 
    var x = map(i, 0, fftLin.length, 2, width); // change 0 for 2 
    var h = map(fftLin[i], -1, 255, 0, height);
    fill(fftLin[i], 2, 10);
    rect(x, 0, width/ fftLin.length, h);
    
  //waves frequency  
  var modFreq = map(mouseX, 0, width, 20, 900);
  var modAmp = map(mouseY, 0, height, 0, 1);
  osc.freq(modFreq);// apply frequency to the osc
  osc.amp(modAmp);// apply amplitude to the osc 
    
  
  mic.connect();
  }
}
