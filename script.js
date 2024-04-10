let cv;
let ctx;
let block1;
let block2;
let collisions = 0;
const ground = {};
const w1 = 50;
const m1 = 1;
const d = 4;

const setup = function() {
  cv = document.querySelector('canvas');
  ctx = cv.getContext('2d');
  ground.x = 0;
  ground.y = 600;
  ground.w = cv.width;
  ground.h = 30;
  block1 = new Block(300, ground.y - w1, 1, w1, w1, 'green');
  block2 = new Block(700, ground.y - w1, m1 * Math.pow(100, d), w1, w1, 'blue', -0.005);
  draw();
};

window.onload = setup;

const draw = function() {
  background(cv, 'black');
  ctx.fillStyle = 'white';
  ctx.fillRect(ground.x, ground.y, ground.w, ground.h);
  for (let i = 0; i < 1000; i++) {
    if (block1.collide(block2)) {
      collisions++;
      const m1 = block1.m;
      const m2 = block2.m;
      const v1 = block1.vel;
      const v2 = block2.vel;
      block1.vel = v1 * (m1 - m2) / (m1 + m2) + 2 * m2 * v2 / (m1 + m2);
      block2.vel = v2 * (m2 - m1) / (m1 + m2) + 2 * m1 * v1 / (m1 + m2);
    };
    block1.x = block1.x < 0 ? 0 : block1.x;
    // block1.x = constrain(block1.x, 0, Infinity);
    block2.x = constrain(block2.x, block1.w, Infinity);
    block1.update();
    block2.update();
  };
  document.getElementById('collisions').innerHTML = 'Collision: ' + collisions;
  setTimeout(draw, 10);
}

class Block {
  constructor(x, y, m, w, h, cor = 'white', vel = 0) {
    this.x = x;
    this.y = y;
    this.m = m;
    this.w = w;
    this.h = h;
    this.color = cor;
    this.vel = vel;
  }

  show() {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.w, this.h);
  }

  move() {
    if (this.x <= 0) {
      collisions++;
      this.vel *= -1;
    }
    this.x += this.vel;
  }

  collide(other) {
    return other.x < this.x + this.w;
  }

  update() {
    this.move();
    this.show();
  }
}