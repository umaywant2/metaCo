chrome.runtime.onMessage.addListener((msg) => {
  if (msg.type === 'TOGGLE') {
    console.log(`metaCo is now ${msg.enabled ? 'ON' : 'OFF'}`);
    // Future: add routing logic here
  }
});
