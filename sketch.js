let y = 100;

function setup() {
  createCanvas(windowWidth, windowHeight);

  // I tried this code to fix it make it as a background for the slider but i could not
  // canvas.position(0, 0);
  // canvas.style("z-index", "-1");
  stroke(255);
  frameRate(30);
}

function draw() {
  background(0); // making the background black
  //creating the loop
  y = y - 1;
  if (y < 0) {
    y = height;
  }
  line(0, y, width, y);
}

// this function it will resize the canvas based on the browser

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
