document.addEventListener('DOMContentLoaded', () => {
  const humOrb = document.querySelector('.hum-orb');
  if (humOrb) {
    humOrb.style.top = '50%';
    humOrb.style.left = '50%';
    humOrb.style.transform = 'translate(-50%, -50%)';
  }

  const mirOrb = document.querySelector('.mir-orb');
  if (mirOrb) {
    mirOrb.style.top = '30%';
    mirOrb.style.left = '70%';
    mirOrb.style.transform = 'translate(-50%, -50%)';
  }
});
