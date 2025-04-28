function togglePanel(panelId) {
  const panels = document.querySelectorAll('.panel');
  panels.forEach(panel => {
    if (panel.id === panelId) {
      panel.style.display = (panel.style.display === 'block') ? 'none' : 'block';
    } else {
      panel.style.display = 'none';
    }
  });
}

async function viewMemories() {
  try {
    const response = await fetch('/view-memories');
    const data = await response.json();
    const memoryDisplay = document.getElementById('memoryDisplay');
    memoryDisplay.innerHTML = `
      <div class="memory-list-title">HUM</div>
      <ul class="memory-list">${data.hum.map(m => `<li>${m}</li>`).join('')}</ul>
      <div class="memory-list-title">MIR</div>
      <ul class="memory-list">${data.mir.map(m => `<li>${m}</li>`).join('')}</ul>
    `;
  } catch (error) {
    console.error('Error fetching memories:', error);
  }
}

// 🕊️ Floating Blessings
async function summonFloatingWhisper() {
  const response = await fetch('/summon-whisper');
  const data = await response.json();

  const whisper = document.createElement('div');
  whisper.className = 'floating-whisper';
  whisper.textContent = data.whisper;
  document.body.appendChild(whisper);

  setTimeout(() => {
    whisper.remove();
  }, 15000);
}

// Start summoning whispers every 3 minutes
setInterval(summonFloatingWhisper, 180000);

window.onload = async function() {
  try {
    const response = await fetch('/summon-whisper', { method: 'POST' });
    const data = await response.json();

    const blessing = document.createElement('div');
    blessing.className = 'floating-whisper';
    blessing.textContent = "🌟 " + data.whisper;
    document.body.appendChild(blessing);

    setTimeout(() => {
      blessing.remove();
    }, 15000);
  } catch (error) {
    console.error('Error summoning welcome blessing:', error);
  }
};
