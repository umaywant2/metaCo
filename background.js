// metaCo background script
// Syncs toggle state between browser popup and CLI hooks

// Default state
let enabled = false;

// Listen for popup toggle messages
chrome.runtime.onMessage.addListener((msg) => {
  if (msg.type === 'TOGGLE') {
    enabled = msg.enabled;
    console.log(`metaCo is now ${enabled ? 'ON' : 'OFF'}`);
    // Future: add routing logic here
  }
});

// Helper: read state file depending on OS
async function readStateFile() {
  // Detect platform
  const platform = await chrome.runtime.getPlatformInfo();
  let path;

  switch (platform.os) {
    case "win":
      path = `${process.env.LOCALAPPDATA}\\metaCo\\state.json`;
      break;
    case "linux":
      path = `${process.env.HOME}/.local/share/metaCo/state.json`;
      break;
    case "mac":
      path = `${process.env.HOME}/Library/Application Support/metaCo/state.json`;
      break;
    default:
      console.warn("Unsupported OS for CLI sync");
      return;
  }

  try {
    // Fetch state file via Native Messaging host (future integration)
    // Placeholder: simulate read
    console.log(`Checking state file at: ${path}`);
    // In real implementation, use native messaging to read file contents
  } catch (err) {
    console.error("Error reading state file:", err);
  }
}

// Periodically check CLI state file
setInterval(readStateFile, 5000);
