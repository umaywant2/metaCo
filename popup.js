document.getElementById('toggle').addEventListener('click', async () => {
  const { enabled } = await chrome.storage.local.get('enabled');
  const newState = !enabled;
  await chrome.storage.local.set({ enabled: newState });
  chrome.runtime.sendMessage({ type: 'TOGGLE', enabled: newState });
});
