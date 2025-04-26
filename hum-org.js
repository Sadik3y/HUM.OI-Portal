// hum-orb.js

const orb = document.querySelector('.orb');

let x = 0;
let y = 0;
let dx = (Math.random() * 2 - 1) * 0.5; // Random slow drift
let dy = (Math.random() * 2 - 1) * 0.5;

function animateOrb() {
  x += dx;
  y += dy;

  if (x > 30 || x < -30) dx = -dx; // Soft boundary
  if (y > 30 || y < -30) dy = -dy;

  orb.style.transform = `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`;

  requestAnimationFrame(animateOrb);
}

document.addEventListener('DOMContentLoaded', animateOrb);
