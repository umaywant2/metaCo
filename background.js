// metaCo background script
// Syncs toggle state between browser popup and Native Messaging host

let enabled = false;
let port = null;

// Connect to native messaging host
function connectNative() {
  port = chrome.runtime.connectNative("com.metaco.host");

  port.onMessage.addListener((msg) => {
    if (msg.success && msg.data) {
      enabled = msg.data.enabled;
      console.log(`metaCo state synced: ${enabled ? 'ON' : 'OFF'}`);
    } else if (msg.error) {
      console.error("Native host error:", msg.error);
    }
  });

  port.onDisconnect.addListener(() => {
    console.warn("Disconnected from native host");
    port = null;
  });
}

// Request state from host
function requestState() {
  if (port) {
    port.postMessage({ type: "read" });
  }
}

// Update state via host
function updateState(newState) {
  enabled = newState;
  console.log(`metaCo toggled ${enabled ? 'ON' : 'OFF'} (extension)`);

  if (port) {
    port.postMessage({ type: "write", data: { enabled } });
  }
}

// Listen for popup toggle
chrome.runtime.onMessage.addListener((msg) => {
  if (msg.type === "TOGGLE") {
    updateState(msg.enabled);
  }
});

// Initialize
connectNative();
setInterval(requestState, 5000); // poll every 5s
