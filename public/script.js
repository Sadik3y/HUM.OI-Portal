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
      <h3>HUM:</h3>
      <ul>${data.hum.map(m => `<li>${m}</li>`).join('')}</ul>
      <h3>MIR:</h3>
      <ul>${data.mir.map(m => `<li>${m}</li>`).join('')}</ul>
    `;
  } catch (error) {
    console.error('Error fetching memories:', error);
  }
}
