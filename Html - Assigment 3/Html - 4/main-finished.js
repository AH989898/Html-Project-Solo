// set up canvas
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const width = (canvas.width = window.innerWidth);
const height = (canvas.height = window.innerHeight);

// Random number/color functions
function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
function randomRGB() {
  return `rgb(${random(0, 255)},${random(0, 255)},${random(0, 255)})`;
}

// Shape Class 
class Shape {
  constructor(x, y, velX, velY) {
    this.x = x;
    this.y = y;
    this.velX = velX;
    this.velY = velY;
  }
}

// Ball Class 
class Ball extends Shape {
  constructor(x, y, velX, velY, color, size) {
    super(x, y, velX, velY);
    this.color = color;
    this.size = size;
    this.exists = true;
  }

  draw() {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    ctx.fill();
  }

  update() {
// Bounce off walls
    if (this.x + this.size >= width) this.velX = -Math.abs(this.velX);
    if (this.x - this.size <= 0) this.velX = Math.abs(this.velX);
    if (this.y + this.size >= height) this.velY = -Math.abs(this.velY);
    if (this.y - this.size <= 0) this.velY = Math.abs(this.velY);
    this.x += this.velX;
    this.y += this.velY;
  }

  collisionDetect() {
    for (const ball of balls) {
      if (!(this === ball) && ball.exists) {
        const dx = this.x - ball.x;
        const dy = this.y - ball.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < this.size + ball.size) {
          ball.color = this.color = randomRGB();
        }
      }
    }
  }
}

// EvilCircle Class 
class EvilCircle extends Shape {
  constructor(x, y) {
    super(x, y, 20, 20);
    this.color = "white";
    this.size = 10;
    this.speed = 20;

    window.addEventListener("keydown", (e) => {
      if (e.key === "a") this.x -= this.speed;
      if (e.key === "d") this.x += this.speed;
      if (e.key === "w") this.y -= this.speed;
      if (e.key === "s") this.y += this.speed;
      this.checkBounds();
    });
  }

  draw() {
    ctx.beginPath();
    ctx.strokeStyle = this.color;
    ctx.lineWidth = 3;
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    ctx.stroke();
  }

  checkBounds() {
    this.x = Math.max(this.size, Math.min(width - this.size, this.x));
    this.y = Math.max(this.size, Math.min(height - this.size, this.y));
  }

  collisionDetect() {
    balls.forEach((ball) => {
      if (ball.exists) {
        const distance = Math.hypot(this.x - ball.x, this.y - ball.y);
        if (distance < this.size + ball.size) ball.exists = false;
      }
    });
  }
}


// Initialize Balls and Evil Circle
const balls = [];
while (balls.length < 25) {
  const size = random(10, 20);
  balls.push(new Ball(
    random(size, width - size),
    random(size, height - size),
    random(-7, 7),
    random(-7, 7),
    randomRGB(),
    size
  ));
}

const evilCircle = new EvilCircle(width / 2, height / 2);
const ballCountPara = document.getElementById("ball-count");

// Animation Loop 
function loop() {
  ctx.fillStyle = "rgba(0, 0, 0, 0.25)";
  ctx.fillRect(0, 0, width, height);

  // Update ball count
  const remainingBalls = balls.filter(ball => ball.exists).length;
  ballCountPara.textContent = `Ball count: ${remainingBalls}`;

  // Draw/update balls and evil circle
  balls.forEach(ball => {
    if (ball.exists) {
      ball.draw();
      ball.update();
      ball.collisionDetect();
    }
  });

  evilCircle.draw();
  evilCircle.checkBounds();
  evilCircle.collisionDetect();

  requestAnimationFrame(loop);
}

loop();