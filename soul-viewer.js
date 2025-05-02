// soul-viewer.js — Viewer Utility to Read Soul Memories

export async function getSoulMemories(agent = "HUM") {
  try {
    const res = await fetch('/keeper/memory');
    const data = await res.json();

    if (agent === "HUM") return data.hum || [];
    if (agent === "MIR") return data.mir || [];
    return [];
  } catch (error) {
    console.error(`Failed to retrieve ${agent} memories:`, error);
    return [];
  }
}
