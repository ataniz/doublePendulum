let l1 = 100;
let l2 = 100;
let m1 = 10;
let m2 = 10;
let a1 = 0;
let a2 = 0;
let a1_v = 0;
let a2_v = 0;

let px2 = -1;
let py2 = -1;
let g = 9.81 / (60 * 60); //at 60fps

function setup() {
  createCanvas(1000, 1000);
  frameRate(60);
  g = g * 2; //double the gravity so it looks nicer
  a1 = PI / 2;
  a2 = PI / 2;

  buffer = createGraphics(width, height);
  buffer.background(14, 39, 60);
  buffer.translate(500, 400);
}

function draw() {
  // https://www.myphysicslab.com/pendulum/double-pendulum-en.html
  let num1 =
    -g * (2 * m1 + m2) * sin(a1) -
    m2 * g * sin(a1 - 2 * a2) -
    2 * sin(a1 - a2) * m2 * (a2_v ** 2 * l2 + a1_v ** 2 * l1 * cos(a1 - a2));
  let den1 = l1 * (2 * m1 + m2 - m2 * cos(2 * a1 - 2 * a2));
  let a1_a = num1 / den1;

  let num2 =
    2 *
    sin(a1 - a2) *
    (a1_v ** 2 * l1 * (m1 + m2) +
      g * (m1 + m2) * cos(a1) +
      a2_v ** 2 * l2 * m2 * cos(a1 - a2));
  let den2 = l2 * (2 * m1 + m2 - m2 * cos(2 * a1 - 2 * a2));
  let a2_a = num2 / den2;

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

  a1_v += a1_a;
  a2_v += a2_a;
  a1 += a1_v;
  a2 += a2_v;

  buffer.stroke(232, 93, 117);
  if (frameCount > 1) {
    buffer.line(px2, py2, x2, y2);
  }

  px2 = x2;
  py2 = y2;
}
