// frame rate
let frate = 60;
// length of the ropes
let l1 = 100;
let l2 = 100;
// mass of the balls
let m1 = 10;
let m2 = 10;
// angles
let a1, a2;
// angles first derivative
let a1_ddt = 0;
let a2_ddt = 0;
//  variabels to keep 2nd balls previous state for drawing
let px2, py2;
// gravity!
let g = 9.81 / (60 * frate); //at 60fps

function setup() {
  createCanvas(1100, 1100);
  frameRate(frate);
  // we dont have the whole day, increase gravity
  g = g * 10;
  // starting from 90  degrees
  a1 = PI / 2;
  a2 = PI;
  // buffer created for drawing
  buffer = createGraphics(width, height);
  buffer.background(14, 39, 60);
  buffer.translate(width / 2, (height * 1) / 3);
}

function draw() {
  // add the buffer to the background
  background(14, 39, 60);
  image(buffer, 0, 0, width, height);
  // set the color and thickness of the lines
  stroke(204, 204, 204);
  strokeWeight(2);
  // shift (0,0)
  translate(width / 2, (height * 1) / 3);

  // https://www.myphysicslab.com/pendulum/double-pendulum-en.html
  // calculate secound derivatives of angles
  let num1 =
    -g * (2 * m1 + m2) * sin(a1) -
    m2 * g * sin(a1 - 2 * a2) -
    2 *
      sin(a1 - a2) *
      m2 *
      (a2_ddt ** 2 * l2 + a1_ddt ** 2 * l1 * cos(a1 - a2));
  let den1 = l1 * (2 * m1 + m2 - m2 * cos(2 * a1 - 2 * a2));
  let a1_d2dt2 = num1 / den1;

  let num2 =
    2 *
    sin(a1 - a2) *
    (a1_ddt ** 2 * l1 * (m1 + m2) +
      g * (m1 + m2) * cos(a1) +
      a2_ddt ** 2 * l2 * m2 * cos(a1 - a2));
  let den2 = l2 * (2 * m1 + m2 - m2 * cos(2 * a1 - 2 * a2));
  let a2_d2dt2 = num2 / den2;

  // calculate coordinates of the balls
  let x1 = l1 * sin(a1);
  let x2 = x1 + l2 * sin(a2);
  let y1 = l1 * cos(a1);
  let y2 = y1 + l2 * cos(a2);

  // draw ropes and balls
  line(0, 0, x1, y1);
  fill(204, 204, 204);
  line(x1, y1, x2, y2);
  fill(204, 204, 204);
  ellipse(x1, y1, m1, m1);
  ellipse(x2, y2, m2, m2);

  // calculate the angles
  a1_ddt += a1_d2dt2;
  a2_ddt += a2_d2dt2;
  a1 += a1_ddt;
  a2 += a2_ddt;

  // draw the movement trace of the secound ball
  buffer.stroke(232, 93, 117);
  if (frameCount > 1) {
    buffer.line(px2, py2, x2, y2);
  }
  //update start locations for the trace drawing
  px2 = x2;
  py2 = y2;
}
