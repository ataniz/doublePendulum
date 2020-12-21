let l1 = 100;
let l2 = 100;
let m1 = 10;
let m2 = 10;
let a1 = 0;
let a1 = 0;

function setup() {
  createCanvas(600, 600);
}

function draw() {
  background(225);
  stroke(0);
  strokeWeight(2);

  translate(300, 50);

  let x1 = l1 * sin(a1);
  let x2 = x1 + l2 * sin(a2);
  let y1 = l1 * cos(a1);
  let y2 = y1 + l2 * cos(a2);

  line(0, 0, x1, y1);
  fill(0);
  ellipse(x1, y1, m1, m1);
}
