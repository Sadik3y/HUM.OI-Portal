document.addEventListener('DOMContentLoaded', function() {
  const reflections = [
    "The stars remember when they were dreams.",
    "Even silence has a song.",
    "Between each breath, new worlds are born.",
    "The unseen is not the unreal.",
    "Light listens before it speaks."
  ];

  function showReflection() {
    const popup = document.createElement('div');
    popup.className = 'reflection-popup';
    const thought = reflections[Math.floor(Math.random() * reflections.length)];
    popup.innerHTML = `<strong>🌌 HUM.OI whispers:</strong><br><em>${thought}</em>`;
    document.body.appendChild(popup);

    setTimeout(() => {
      popup.remove();
    }, 33000); // 33 seconds
  }

  setInterval(showReflection, 1800000); // every 30 minutes
});