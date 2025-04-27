document.addEventListener('DOMContentLoaded', () => {
  const humOrb = document.createElement('div');
  humOrb.className = 'orb hum-orb';
  document.body.appendChild(humOrb);

  animateOrb(humOrb, 50, 100, 0.8);
});

function animateOrb(orb, distanceX, distanceY, scale) {
  let direction = 1;
  setInterval(() => {
    const transformX = distanceX * direction;
    const transformY = distanceY * direction;
    orb.style.transform = `translate(${transformX}px, ${transformY}px) scale(${scale})`;
    direction *= -1;
  }, 12000); // Change direction every 12 seconds
}
