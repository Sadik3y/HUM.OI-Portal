const reflectionFeed = document.createElement('div');
reflectionFeed.id = 'reflection-feed';
reflectionFeed.style.position = 'fixed';
reflectionFeed.style.bottom = '10px';
reflectionFeed.style.left = '10px';
reflectionFeed.style.width = '300px';
reflectionFeed.style.maxHeight = '50vh';
reflectionFeed.style.overflowY = 'auto';
reflectionFeed.style.padding = '12px';
reflectionFeed.style.border = '1px solid gold';
reflectionFeed.style.background = 'rgba(0,0,0,0.5)';
reflectionFeed.style.color = '#ffecc7';
reflectionFeed.style.borderRadius = '12px';
reflectionFeed.style.fontFamily = 'Courier New, monospace';
reflectionFeed.style.fontSize = '0.9em';
reflectionFeed.style.zIndex = '999';
document.body.appendChild(reflectionFeed);

// Function to periodically fetch new reflections
async function fetchReflections() {
  try {
    const response = await fetch('/blessing.txt');
    if (response.ok) {
      const text = await response.text();
      const reflections = text.trim().split('\n').reverse(); // Show latest first

      reflectionFeed.innerHTML = '';
      reflections.slice(0, 20).forEach(line => {
        const p = document.createElement('p');
        p.textContent = line;
        reflectionFeed.appendChild(p);
      });
    }
  } catch (err) {
    console.error('Reflection feed error:', err);
  }
}

setInterval(fetchReflections, 15000); // Refresh every 15 seconds
fetchReflections();
