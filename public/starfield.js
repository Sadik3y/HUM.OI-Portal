// starfield.js — Fully Synced Through Phase 40: Multi-Depth Cosmic Motion

const canvas = document.createElement('canvas');
canvas.id = 'starfield';
Object.assign(canvas.style, {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  zIndex: -1,
  pointerEvents: 'none'
});
document.body.appendChild(canvas);

const ctx = canvas.getContext('2d');
let stars = [];
const numStars = 150;

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

function createStars() {
  stars = [];
  for (let i = 0; i < numStars; i++) {
    stars.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 1.5 + 0.3,
      speed: Math.random() * 0.4 + 0.1,
      depth: Math.random() * 1.5 + 0.5
    });
  }
}

function updateStars() {
  for (let star of stars) {
    star.y += star.speed * star.depth;
    if (star.y > canvas.height) {
      star.y = 0;
      star.x = Math.random() * canvas.width;
    }
  }
}

function drawStars() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let star of stars) {
    const glow = star.radius * 4;
    ctx.beginPath();
    ctx.fillStyle = `rgba(255, 255, 255, ${0.3 + 0.4 * Math.random()})`;
    ctx.shadowBlur = glow;
    ctx.shadowColor = '#ffffff';
    ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
    ctx.fill();
  }
}

function animate() {
  updateStars();
  drawStars();
  requestAnimationFrame(animate);
}

window.addEventListener('resize', () => {
  resizeCanvas();
  createStars();
});

resizeCanvas();
createStars();
animate();
