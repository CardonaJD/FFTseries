let y = [];
let x = [];
let fourierY;
let fourierX;

let time = 0;
let path = [];
let angle;

function setup(){
  createCanvas(600, 400);
  for (let i = 0; i < 100; i++){
    angle = map(i , 0, 100, 0, TWO_PI)
    x[i] = 100 * cos(angle);
    y[i] = 100 * sin(angle);
  }

  fourierX = dft(x);
  fourierY = dft(y);
}

function epiCycles(x, y, rotation, fourier){
  for (let i = 0; i < fourier.length; i++){
    let prevx = x;
    let prevy = y;

    let freq = fourier[i].freq;
    let radius = fourier[i].amp;
    let phase = fourier[i].phase;

    x += radius * cos(freq * time + phase + rotation );
    y += radius * sin(freq * time + phase + rotation );
    // wave.unshift(y);

    stroke(255, 100);
    noFill();
    ellipse(prevx,prevy, radius*2);
    stroke(255);
    line(prevx,prevy, x , y);
  }
  return createVector(x , y);
}

function draw(){
  background(0);

  let vx = epiCycles(400, 50, 0, fourierX);
  let vy = epiCycles(50, 200, HALF_PI, fourierY);
  let v = createVector(vx.x, vy.y)
  path.unshift(v);
  line(vx.x, vx.y, v.x, v.y);
  line(vy.x, vy.y, v.x, v.y);

  // translate(200 , 0);
  // line(x-200, y, 0, y );
  beginShape();
  noFill();
  for (let i = 0; i < path.length; i++) {
    vertex(path[i].x, path[i].y);
  }
  endShape()

  const dt = TWO_PI/fourierY.length;
  time += dt;

  // if(wave.length > 250 ){
  //   wave.pop();
  // }
}
