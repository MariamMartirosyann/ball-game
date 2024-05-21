const canvas = document.getElementById("canvas");
const context = canvas.getContext(`2d`);

const gravity = 1;
const friction = 0.98;
const colors = ["red", "blue", "orange"];
let deltaTime = 0;
let lastUpdate = 0;

const generateRendomIntiger = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
const generateRendomColor = (colors) => {
  return colors[Math.floor(Math.random() * colors.length)];
};



class Circle {
  constructor(x, y, dx, dy, radius, startAngle, endAngle, color, dY) {
    (this.x = x),
      (this.y = y),
      (this.dx = dx),
      (this.dy = dy),
      (this.radius = radius),
      (this.startAngle = startAngle),
      (this.endAngle = endAngle),
      (this.color = color),
      (this.dY = dY);
  }

  draw() {
    context.beginPath();
    context.arc(
      this.x,
      this.y,
      this.radius,
      this.startAngle,
      this.endAngle,
      this.counterClockwise
    );

    context.fillStyle = this.color;
    context.stroke();
    context.fill();
    context.closePath();
  }

  update() {
    if (this.y + this.radius + this.dy > canvas.height) {
      this.dy = -this.dy * friction;
    } else {
      this.dy += gravity;
    }

    if (
      this.x + this.radius + this.dx > canvas.width ||
      this.x - this.radius <= 0
    ) {
      this.dx = -this.dx;
    }
    this.x += this.dx;
    this.y += this.dy;
    this?.draw();
  }
}

const clear = () => {
  context.clearRect(0, 0, canvas.width, canvas.height);
};

var circle;
const circlesArray = [];
const numOfCircles = 100;

function init() {
  for (let i = 0; i < numOfCircles; i++) {
    let radius = generateRendomIntiger(10, 40);
    let x = generateRendomIntiger(radius, canvas.width - radius);
    let y = generateRendomIntiger(0, canvas.height - radius);
    let dx = generateRendomIntiger(-2, 2);
    let dy = generateRendomIntiger(-2, 2);
    let color = generateRendomColor(colors);
    circlesArray.push(new Circle(x, y, dx, dy, radius, 0, 360, color, 2));
  }
}

const animate = (currentTime=0) => {
  requestAnimationFrame(animate);
  clear();
  deltaTime = currentTime - lastUpdate;
  circlesArray.forEach((c) => c.update());
  
};
requestAnimationFrame(animate);
window.addEventListener("click", () => {
  init();
});
