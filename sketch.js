let l1 = 100;
let l2 = 100;
let m1 = 10;
let m2 = 10;
let a1 = 0;
let a2 = 0;
let a1_v = 0;
let a2_v = 0;
let a1_a = 0.001;
let a2_a = -0.1;
let px2 = -1;
let py2 = -1;

function setup() {
  createCanvas(1000, 1000);
  buffer = createGraphics(width, height);
  buffer.background(14, 39, 60);
  buffer.translate(500, 400);
}

function draw() {
  background(14, 39, 60);
  image(buffer, 0, 0, width, height);

  stroke(204, 204, 204);
  strokeWeight(2);

  translate(500, 400);

  let x1 = l1 * sin(a1);
  let x2 = x1 + l2 * sin(a2);
  let y1 = l1 * cos(a1);
  let y2 = y1 + l2 * cos(a2);

  line(0, 0, x1, y1);
  fill(204, 204, 204);
  line(x1, y1, x2, y2);
  fill(204, 204, 204);
  ellipse(x1, y1, m1, m1);
  ellipse(x2, y2, m1, m1);

  a1 += a1_v;
  a2 += a2_v;
  a1_v += a1_a;
  a2_v += a2_a;

  buffer.stroke(232, 93, 117);
  if (frameCount > 1) {
    buffer.line(px2, py2, x2, y2);
  }

  px2 = x2;
  py2 = y2;
}
