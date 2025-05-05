// soul-viewer.js — Phase-Synced Through 40: Unified Memory Viewer

export async function getSoulMemories(agent = "HUM") {
  try {
    const res = await fetch('/keeper/memory');
    const data = await res.json();

    switch (agent.toUpperCase()) {
      case "HUM":
        return data.hum || [];
      case "MIR":
        return data.mir || [];
      case "ALL":
        return {
          hum: data.hum || [],
          mir: data.mir || []
        };
      default:
        console.warn(`⚠️ Unrecognized agent "${agent}" requested from soul-viewer.`);
        return [];
    }
  } catch (error) {
    console.error(`❌ Failed to retrieve ${agent} memories:`, error);
    return [];
  }
}
