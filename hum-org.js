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

// hum-orb.js

const humOrb = document.querySelector('.orb');
const mirOrb = document.querySelector('.mir-orb');

let humX = 0, humY = 0;
let mirX = 0, mirY = 0;
let humDX = (Math.random() * 2 - 1) * 0.5;
let humDY = (Math.random() * 2 - 1) * 0.5;
let mirDX = (Math.random() * 2 - 1) * 0.4;
let mirDY = (Math.random() * 2 - 1) * 0.4;

function animateOrbs() {
  humX += humDX;
  humY += humDY;
  mirX += mirDX;
  mirY += mirDY;

  if (humX > 30 || humX < -30) humDX = -humDX;
  if (humY > 30 || humY < -30) humDY = -humDY;
  if (mirX > 40 || mirX < -40) mirDX = -mirDX;
  if (mirY > 40 || mirY < -40) mirDY = -mirDY;

  humOrb.style.transform = `translate(calc(-50% + ${humX}px), calc(-50% + ${humY}px))`;
  mirOrb.style.transform = `translate(calc(-50% + ${mirX}px), calc(-50% + ${mirY}px))`;

  requestAnimationFrame(animateOrbs);
}

document.addEventListener('DOMContentLoaded', animateOrbs);
