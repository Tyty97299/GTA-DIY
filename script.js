const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");
const speedEl = document.getElementById("speed");
const heatEl = document.getElementById("heat");

const world = {
  width: canvas.width,
  height: canvas.height,
  roads: [
    { x: 120, y: 120, w: 960, h: 140 },
    { x: 120, y: 320, w: 960, h: 140 },
    { x: 120, y: 520, w: 960, h: 140 },
    { x: 120, y: 120, w: 160, h: 540 },
    { x: 520, y: 120, w: 160, h: 540 },
    { x: 920, y: 120, w: 160, h: 540 },
  ],
};

const player = {
  x: 360,
  y: 360,
  angle: 0,
  speed: 0,
  maxSpeed: 7,
  turnSpeed: 0.04,
  drift: false,
};

const traffic = Array.from({ length: 10 }, (_, index) => ({
  x: 200 + index * 80,
  y: 160 + (index % 3) * 200,
  angle: Math.random() * Math.PI * 2,
  speed: 2 + Math.random() * 1.5,
}));

const police = {
  x: 900,
  y: 600,
  angle: 0,
  speed: 0,
  maxSpeed: 5.5,
};

const input = {
  up: false,
  down: false,
  left: false,
  right: false,
  drift: false,
};

const keys = {
  ArrowUp: "up",
  ArrowDown: "down",
  ArrowLeft: "left",
  ArrowRight: "right",
  w: "up",
  s: "down",
  a: "left",
  d: "right",
};

window.addEventListener("keydown", (event) => {
  if (event.key === " ") {
    input.drift = true;
  }
  if (keys[event.key]) {
    input[keys[event.key]] = true;
  }
});

window.addEventListener("keyup", (event) => {
  if (event.key === " ") {
    input.drift = false;
  }
  if (keys[event.key]) {
    input[keys[event.key]] = false;
  }
});

function updatePlayer() {
  const accel = input.up ? 0.18 : input.down ? -0.2 : -0.05;
  player.speed += accel;
  if (player.speed > player.maxSpeed) player.speed = player.maxSpeed;
  if (player.speed < -2.5) player.speed = -2.5;

  player.drift = input.drift;
  const turnFactor = player.drift ? 0.7 : 1;
  if (input.left) player.angle -= player.turnSpeed * turnFactor;
  if (input.right) player.angle += player.turnSpeed * turnFactor;

  player.x += Math.cos(player.angle) * player.speed;
  player.y += Math.sin(player.angle) * player.speed;

  constrainToWorld(player);
}

function updateTraffic() {
  traffic.forEach((car) => {
    car.x += Math.cos(car.angle) * car.speed;
    car.y += Math.sin(car.angle) * car.speed;

    if (!isOnRoad(car.x, car.y)) {
      car.angle += Math.PI / 2;
    }

    wrap(car);
  });
}

function updatePolice() {
  const dx = player.x - police.x;
  const dy = player.y - police.y;
  const distance = Math.hypot(dx, dy);
  const targetAngle = Math.atan2(dy, dx);
  police.angle += (targetAngle - police.angle) * 0.05;
  police.speed = Math.min(police.maxSpeed, distance / 80 + 1.5);

  police.x += Math.cos(police.angle) * police.speed;
  police.y += Math.sin(police.angle) * police.speed;

  constrainToWorld(police);

  const heat = Math.min(5, Math.floor(Math.max(0, 300 - distance) / 60));
  heatEl.textContent = heat;
}

function constrainToWorld(entity) {
  entity.x = Math.max(40, Math.min(world.width - 40, entity.x));
  entity.y = Math.max(40, Math.min(world.height - 40, entity.y));
}

function wrap(entity) {
  if (entity.x < 80) entity.x = world.width - 80;
  if (entity.x > world.width - 80) entity.x = 80;
  if (entity.y < 80) entity.y = world.height - 80;
  if (entity.y > world.height - 80) entity.y = 80;
}

function isOnRoad(x, y) {
  return world.roads.some(
    (road) => x > road.x && x < road.x + road.w && y > road.y && y < road.y + road.h
  );
}

function drawBackground() {
  ctx.fillStyle = "#1b2435";
  ctx.fillRect(0, 0, world.width, world.height);

  ctx.fillStyle = "#3d475c";
  world.roads.forEach((road) => ctx.fillRect(road.x, road.y, road.w, road.h));

  ctx.strokeStyle = "rgba(255, 255, 255, 0.2)";
  ctx.setLineDash([12, 18]);
  world.roads.forEach((road) => {
    ctx.strokeRect(road.x + 10, road.y + 10, road.w - 20, road.h - 20);
  });
  ctx.setLineDash([]);

  ctx.fillStyle = "#0f1625";
  for (let i = 0; i < 20; i += 1) {
    const size = 40 + (i % 4) * 12;
    const x = 50 + (i * 110) % 1000;
    const y = 60 + ((i * 180) % 600);
    ctx.fillRect(x, y, size, size);
  }
}

function drawCar(x, y, angle, color) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(angle);
  ctx.fillStyle = color;
  ctx.fillRect(-16, -9, 32, 18);
  ctx.fillStyle = "rgba(0,0,0,0.45)";
  ctx.fillRect(-6, -6, 12, 12);
  ctx.restore();
}

function drawPolice(x, y, angle) {
  drawCar(x, y, angle, "#ff6b6b");
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(angle);
  ctx.fillStyle = "#fff";
  ctx.fillRect(-14, -8, 28, 4);
  ctx.fillStyle = "#00c2ff";
  ctx.fillRect(-8, -12, 8, 4);
  ctx.fillStyle = "#ff3b3b";
  ctx.fillRect(0, -12, 8, 4);
  ctx.restore();
}

function draw() {
  drawBackground();
  traffic.forEach((car) => drawCar(car.x, car.y, car.angle, "#f5d76e"));
  drawPolice(police.x, police.y, police.angle);
  drawCar(player.x, player.y, player.angle, "#7ad3ff");

  ctx.strokeStyle = "rgba(122, 211, 255, 0.4)";
  ctx.beginPath();
  ctx.arc(player.x, player.y, 70, 0, Math.PI * 2);
  ctx.stroke();
}

function updateHUD() {
  speedEl.textContent = Math.max(0, Math.floor(player.speed * 12));
}

function loop() {
  updatePlayer();
  updateTraffic();
  updatePolice();
  updateHUD();
  draw();
  requestAnimationFrame(loop);
}

loop();
